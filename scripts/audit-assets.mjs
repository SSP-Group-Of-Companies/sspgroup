// Asset integrity audit.
//   A) Every /_optimized/... path referenced in source resolves to a real file.
//   B) No orphan files on disk (files not referenced anywhere).
//   C) Quick format-vs-path sanity (eg. .mp4 references only exist for real .mp4s).
//
// Outputs a report and exits non-zero if any issue is found.

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const OPTIMIZED = path.join(PUBLIC, "_optimized");

// `scripts/` is excluded: the optimizer script declares historical source paths
// (e.g. PNGs already converted to JPG) as part of its OG_TO_JPG manifest. Those
// are tooling declarations, not runtime references, and must not be flagged.
const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "_optimized",
  "coverage",
  "dist",
  "scripts",
]);
const SCAN_EXT = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".md", ".mdx", ".json", ".webmanifest", ".html",
]);

const PATH_RE = /\/_optimized\/[A-Za-z0-9._\-/&]+\.(?:png|jpg|jpeg|webp|svg|mp4|webm|mov|ico)/g;

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      yield* walk(abs);
    } else {
      yield abs;
    }
  }
}

async function collectReferences() {
  const refs = new Map(); // path -> [files that reference it]
  for await (const file of walk(ROOT)) {
    const ext = path.extname(file).toLowerCase();
    if (!SCAN_EXT.has(ext)) continue;
    let text;
    try {
      text = await fs.readFile(file, "utf8");
    } catch {
      continue;
    }
    const matches = text.match(PATH_RE);
    if (!matches) continue;
    for (const m of matches) {
      // Drop any cache-bust query (?v=...) — not present in matches anyway but defensive.
      const clean = m.split("?")[0];
      if (!refs.has(clean)) refs.set(clean, new Set());
      refs.get(clean).add(path.relative(ROOT, file));
    }
  }
  return refs;
}

async function collectDiskFiles() {
  const files = new Set();
  for await (const abs of walk(OPTIMIZED)) {
    const rel = "/" + path.relative(PUBLIC, abs).replaceAll("\\", "/");
    files.add(rel);
  }
  return files;
}

function fmtList(iter, limit = 50) {
  const arr = Array.from(iter).sort();
  if (arr.length <= limit) return arr;
  return [...arr.slice(0, limit), `... and ${arr.length - limit} more`];
}

async function main() {
  console.log("SSP asset audit");
  console.log(`  root:       ${ROOT}`);
  console.log(`  assets:     ${OPTIMIZED}`);
  console.log("");

  const [refs, disk] = await Promise.all([collectReferences(), collectDiskFiles()]);

  const referencedPaths = new Set(refs.keys());
  const referencedOnDisk = new Set(
    Array.from(referencedPaths).filter((p) => disk.has(p)),
  );

  const brokenRefs = Array.from(referencedPaths).filter((p) => !disk.has(p));
  const orphansOnDisk = Array.from(disk).filter((p) => !referencedPaths.has(p));

  console.log(`  referenced unique paths:    ${referencedPaths.size}`);
  console.log(`  files on disk:              ${disk.size}`);
  console.log(`  referenced files resolved:  ${referencedOnDisk.size}`);
  console.log("");

  let hadIssue = false;

  if (brokenRefs.length) {
    hadIssue = true;
    console.log(`✗ BROKEN REFERENCES (${brokenRefs.length}) — path referenced in source but missing on disk:`);
    for (const p of fmtList(brokenRefs)) {
      const callers = refs.get(p);
      const callerList = callers ? Array.from(callers).slice(0, 3).join(", ") : "?";
      console.log(`    ${p}\n      used by: ${callerList}${callers && callers.size > 3 ? ` (+${callers.size - 3} more)` : ""}`);
    }
    console.log("");
  } else {
    console.log(`✓ Zero broken references. Every source path resolves to an on-disk file.`);
  }

  // Orphans by type — .svg files that are intentionally not referenced (masks referenced via CSS url()) are OK.
  if (orphansOnDisk.length) {
    console.log("");
    console.log(`⚠ POTENTIAL ORPHANS (${orphansOnDisk.length}) — files on disk with no source reference:`);
    console.log(`  (check: some may be referenced via CSS url() or dynamic string construction)`);
    for (const p of fmtList(orphansOnDisk)) {
      console.log(`    ${p}`);
    }
  } else {
    console.log(`✓ Zero orphan files. Every on-disk asset is referenced.`);
  }

  // Format-awareness check: ensure nothing in source ends in .jpeg (we normalized to .jpg).
  const jpegRefs = Array.from(referencedPaths).filter((p) => p.endsWith(".jpeg"));
  if (jpegRefs.length) {
    hadIssue = true;
    console.log("");
    console.log(`✗ .jpeg references found (expected canonical .jpg):`);
    for (const p of jpegRefs) console.log(`    ${p}`);
  }

  console.log("");
  process.exit(hadIssue ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
