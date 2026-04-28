// SSP Group — source-to-optimized asset pipeline.
//
// Junior-dev workflow:
//   1. Drop a new source image/video somewhere under public/ (NOT public/_optimized/).
//      Example: public/company/new-photo.png
//   2. Reference the source path in code while developing.
//      Example: /company/new-photo.png
//   3. Run:
//        node scripts/optimize-assets.mjs
//   4. The script creates the production asset under public/_optimized/.
//      Example: public/_optimized/company/new-photo.webp
//   5. The script rewrites code references from /company/new-photo.png to
//      /_optimized/company/new-photo.webp.
//
// Important safety rule:
//   This script NEVER walks, rewrites, re-encodes, or deletes existing files inside
//   public/_optimized/. Those files are curated production outputs.
//   If the optimized output already exists, the script skips encoding unless
//   --force is passed.
//
// What it does:
//   1. Walks public/**, excluding public/_optimized/**.
//   2. Images:
//        - Logo/favicon source paths listed in PNG_OUTPUT_PATHS output PNG.
//        - **Opaque** photographic social-preview paths listed in JPG_OUTPUT_PATHS output JPG.
//        - Everything else outputs WebP (including transparent illustrations — do not list those as JPG).
//   3. Videos:
//        - MP4 source files output optimized MP4 with H.264 +faststart.
//   4. Rewrites source references only from the original /public path to the
//      generated /_optimized path. It never rewrites the optimizer script itself.
//
// Requires:  `npm i -D sharp` (already installed), ffmpeg on PATH.

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "_optimized");

const DRY_RUN = process.argv.includes("--dry-run");
const NO_REWRITE = process.argv.includes("--no-rewrite");
const SKIP_VIDEOS = process.argv.includes("--skip-videos");
const SKIP_IMAGES = process.argv.includes("--skip-images");
const FORCE = process.argv.includes("--force");

// Output paths referenced by Open Graph / Twitter / JSON-LD / favicon metadata.
// Social crawlers (Facebook, LinkedIn, X, Slack, Discord) don't reliably render
// WebP, so these paths must stay in a lossy/lossless raster crawlers support.
//
// PNG_OUTPUT_PATHS: transparency-critical or browser-icon assets — stay PNG.
// JPG_OUTPUT_PATHS: **opaque** photographic heroes for OG/crawler use — output JPG.
//     Do NOT list illustrations, maps, or logos with transparency here; JPEG has no
//     alpha and will flatten to white. Those belong in default WebP (or PNG_OUTPUT_PATHS).
const PNG_OUTPUT_PATHS = new Set([
  "/_optimized/brand/SSPlogo.png", // transparent logo used in JSON-LD + OG
  "/_optimized/brand/favicon.png", // PWA/browser icon
]);

// If a new source image is intended for og:image/twitter:image and is a photo,
// add the future /_optimized/*.jpg output path here before running the script.
const JPG_OUTPUT_PATHS = new Set([
  "/_optimized/insights/insights-hero-ssp-containers-topdown.jpg",
  "/_optimized/solution/crossBorder/cross-BorderHeroImg.jpg",
  // Corridor / mode globe illustrations (transparent PNG sources) → WebP, not JPG.
  "/_optimized/industries/automotive-hero-premium.jpg",
  "/_optimized/industries/manufacturing-hero-premium-v1.jpg",
  "/_optimized/industries/retail-hero-premium-v3.jpg",
  "/_optimized/industries/food-hero-premium-v6.jpg",
  "/_optimized/industries/construction-hero-premium-v1.jpg",
  "/_optimized/industries/steel-hero-premium-v1.jpg",
  "/_optimized/industries/chemical-hero-premium-v1.jpg",
  "/_optimized/solution/truckload/truckload-Image.jpg",
  "/_optimized/solution/expedited/expedited-Img.jpg",
  "/_optimized/solution/managedCapacity/managedCapacityHero-Img.jpg",
]);

const JPG_QUALITY = 86;

const RASTER_EXTS = new Set([".png", ".jpg", ".jpeg"]);
const SKIP_NAMES = new Set([".DS_Store", "Thumbs.db"]);

const IMAGE_MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;
const VIDEO_MAX_WIDTH = 1920;
const VIDEO_CRF = 26;

function escapeRegExp(s) {
  return s.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

/**
 * Replace literal `from` (a /public/... path) with `to` without matching
 * `from` when it is only a suffix of a longer path.
 * E.g. "/company/x.png" must not match the middle of "/_optimized/company/x.png"
 * (naive string replace would turn that into "/_optimized/_optimized/...").
 * Rule: a match of `from` is allowed only if the previous character is not
 * a letter, digit, or underscore (so we still catch "/path" in quotes, after =, etc.).
 */
function replacePathRefsInText(text, from, to) {
  if (from === to) return { text, count: 0 };
  const re = new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(from)}`, "g");
  const matchCount = (text.match(re) ?? []).length;
  if (matchCount === 0) return { text, count: 0 };
  return { text: text.replace(re, to), count: matchCount };
}

function fmtBytes(n) {
  if (n == null) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function relFromPublic(absPath) {
  return "/" + absPath.slice(PUBLIC_DIR.length + 1).replaceAll("\\", "/");
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (abs === OUT_DIR || abs.startsWith(`${OUT_DIR}${path.sep}`)) continue;
      yield* walk(abs);
    } else if (!SKIP_NAMES.has(entry.name)) {
      yield abs;
    }
  }
}

function optimizedRelForSource(absInput, targetExt) {
  const sourceRel = relFromPublic(absInput);
  const noExt = sourceRel.slice(0, -path.extname(sourceRel).length);
  return `/_optimized${noExt}${targetExt}`;
}

function optimizedAbsForSource(absInput, targetExt) {
  const sourceRel = relFromPublic(absInput).slice(1);
  const noExt = sourceRel.slice(0, -path.extname(sourceRel).length);
  return path.join(OUT_DIR, `${noExt}${targetExt}`);
}

async function ensureParentDir(absOutput) {
  await fs.mkdir(path.dirname(absOutput), { recursive: true });
}

async function statIfExists(absPath) {
  try {
    return await fs.stat(absPath);
  } catch (err) {
    if (err && err.code === "ENOENT") return null;
    throw err;
  }
}

// -------- IMAGE OPTIMIZATION -----------------------------------------

async function optimizeImage(abs) {
  const ext = path.extname(abs).toLowerCase();
  if (!RASTER_EXTS.has(ext)) return null;

  const rel = relFromPublic(abs);
  const stat = await fs.stat(abs);

  const meta = await sharp(abs, { failOnError: false }).metadata();

  const pipeline = sharp(abs, { failOnError: false }).rotate();
  if (meta.width && meta.width > IMAGE_MAX_WIDTH) {
    pipeline.resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true });
  }

  // Decide target format for this file.
  // Logos & favicons: stay PNG (transparency / browser icon semantics).
  // OG photographic heroes: convert to JPG (crawler-safe) — only for assets without alpha.
  // Everything else: convert to WebP (preserves transparency when present).
  const pngRel = optimizedRelForSource(abs, ".png");
  const jpgRel = optimizedRelForSource(abs, ".jpg");
  const keepPng = PNG_OUTPUT_PATHS.has(pngRel);
  const toJpg = JPG_OUTPUT_PATHS.has(jpgRel);

  if (keepPng) {
    const outAbs = optimizedAbsForSource(abs, ".png");
    const outRel = optimizedRelForSource(abs, ".png");
    if (DRY_RUN) {
      return { rel, newRel: outRel, inBytes: stat.size, outBytes: null, kind: "png-reencode" };
    }
    const existing = FORCE ? null : await statIfExists(outAbs);
    if (existing) {
      return {
        rel,
        newRel: outRel,
        inBytes: stat.size,
        outBytes: existing.size,
        kind: "skipped-existing",
      };
    }
    await ensureParentDir(outAbs);
    const tmp = `${outAbs}.tmp`;
    await pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toFile(tmp);
    const newStat = await fs.stat(tmp);
    await fs.rename(tmp, outAbs);
    return {
      rel,
      newRel: outRel,
      inBytes: stat.size,
      outBytes: newStat.size,
      kind: "png-reencode",
    };
  }

  const targetExt = toJpg ? ".jpg" : ".webp";
  const outAbs = optimizedAbsForSource(abs, targetExt);
  const outRel = optimizedRelForSource(abs, targetExt);

  if (DRY_RUN) {
    return {
      rel,
      newRel: outRel,
      inBytes: stat.size,
      outBytes: null,
      kind: toJpg ? "to-jpg" : "to-webp",
    };
  }

  const existing = FORCE ? null : await statIfExists(outAbs);
  if (existing) {
    return {
      rel,
      newRel: outRel,
      inBytes: stat.size,
      outBytes: existing.size,
      kind: "skipped-existing",
    };
  }

  await ensureParentDir(outAbs);
  if (toJpg) {
    // Flatten any PNG alpha onto white before encoding JPG (safe default).
    await pipeline
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(outAbs);
  } else {
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outAbs);
  }

  const outStat = await fs.stat(outAbs);
  return {
    rel,
    newRel: outRel,
    inBytes: stat.size,
    outBytes: outStat.size,
    kind: toJpg ? "to-jpg" : "to-webp",
  };
}

// -------- VIDEO OPTIMIZATION (ffmpeg) --------------------------------

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}\n${stderr.slice(-2000)}`));
    });
  });
}

async function optimizeVideo(abs) {
  const ext = path.extname(abs).toLowerCase();
  if (ext !== ".mp4") return null;

  const rel = relFromPublic(abs);
  const stat = await fs.stat(abs);
  const outAbs = optimizedAbsForSource(abs, ".mp4");
  const outRel = optimizedRelForSource(abs, ".mp4");

  if (DRY_RUN) {
    return { rel, newRel: outRel, inBytes: stat.size, outBytes: null, kind: "mp4-reencode" };
  }

  const existing = FORCE ? null : await statIfExists(outAbs);
  if (existing) {
    return {
      rel,
      newRel: outRel,
      inBytes: stat.size,
      outBytes: existing.size,
      kind: "skipped-existing",
    };
  }

  await ensureParentDir(outAbs);
  const tmp = `${outAbs}.tmp`;
  // Scale: shrink only if wider than VIDEO_MAX_WIDTH, keep aspect (even dims for H.264).
  const vf = `scale='min(${VIDEO_MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p`;
  const args = [
    "-y",
    "-loglevel",
    "error",
    "-i",
    abs,
    "-vf",
    vf,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    String(VIDEO_CRF),
    "-profile:v",
    "high",
    "-level",
    "4.1",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    "-ac",
    "2",
    tmp,
  ];
  await runFfmpeg(args);
  const newStat = await fs.stat(tmp);

  await fs.rename(tmp, outAbs);
  return {
    rel,
    newRel: outRel,
    inBytes: stat.size,
    outBytes: newStat.size,
    kind: "mp4-reencode",
  };
}

// -------- SOURCE REFERENCE REWRITE -----------------------------------

async function* walkSource(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git" ||
        abs === OUT_DIR ||
        abs.startsWith(`${OUT_DIR}${path.sep}`) ||
        // Never rewrite the optimizer itself. It stores canonical policy paths.
        (dir === ROOT && entry.name === "scripts")
      ) {
        continue;
      }
      yield* walkSource(abs);
    } else {
      yield abs;
    }
  }
}

async function rewriteSourceReferences(renames) {
  const pairs = renames.filter((r) => r.rel !== r.newRel);
  if (!pairs.length) {
    console.log("\nNo path rewrites needed (no extensions changed).");
    return { filesTouched: 0, occurrences: 0 };
  }

  // Sort by descending length so longer paths match before substrings.
  pairs.sort((a, b) => b.rel.length - a.rel.length);

  const REWRITE_EXT = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".css",
    ".md",
    ".mdx",
    ".json",
    ".webmanifest",
  ]);

  let filesTouched = 0;
  let occurrences = 0;

  for await (const abs of walkSource(ROOT)) {
    const ext = path.extname(abs).toLowerCase();
    if (!REWRITE_EXT.has(ext)) continue;
    let text;
    try {
      text = await fs.readFile(abs, "utf8");
    } catch {
      continue;
    }
    let updated = text;
    let fileHits = 0;
    for (const { rel, newRel } of pairs) {
      const { text: after, count } = replacePathRefsInText(updated, rel, newRel);
      if (count === 0) continue;
      fileHits += count;
      updated = after;
    }
    if (fileHits > 0 && updated !== text) {
      if (!DRY_RUN) await fs.writeFile(abs, updated, "utf8");
      filesTouched++;
      occurrences += fileHits;
      console.log(`  rewrote ${fileHits}× in ${path.relative(ROOT, abs)}`);
    }
  }

  return { filesTouched, occurrences };
}

// -------- MAIN -------------------------------------------------------

async function main() {
  const startTs = Date.now();
  console.log(`SSP asset optimizer`);
  console.log(`  root:        ${ROOT}`);
  console.log(`  source dir:  ${PUBLIC_DIR} (excluding /_optimized)`);
  console.log(`  output dir:  ${OUT_DIR}`);
  console.log(`  mode:        ${DRY_RUN ? "DRY-RUN" : "WRITE"}`);
  console.log(`  overwrite:   ${FORCE ? "on (--force)" : "off (existing outputs are skipped)"}`);
  console.log(
    `  img target:  max ${IMAGE_MAX_WIDTH}px | WebP q=${WEBP_QUALITY} | OG JPG q=${JPG_QUALITY} mozjpeg | PNG palette+q90`,
  );
  console.log(`  video tgt:   H.264 crf=${VIDEO_CRF} max ${VIDEO_MAX_WIDTH}px +faststart, AAC 96k`);
  console.log(
    `  og-policy:   ${PNG_OUTPUT_PATHS.size} PNG (transparency/favicon) + ${JPG_OUTPUT_PATHS.size} JPG (crawler-safe)`,
  );
  console.log("");

  const imgResults = [];
  const vidResults = [];

  for await (const abs of walk(PUBLIC_DIR)) {
    const ext = path.extname(abs).toLowerCase();
    try {
      if (RASTER_EXTS.has(ext)) {
        if (SKIP_IMAGES) continue;
        const r = await optimizeImage(abs);
        if (r) {
          imgResults.push(r);
          const tag =
            r.kind === "png-reencode"
              ? "PNG↻"
              : r.kind === "to-jpg"
                ? "→JPG "
                : r.kind === "skipped-existing"
                  ? "SKIP "
                  : "→WebP";
          const savings =
            r.outBytes != null ? ` (${fmtBytes(r.inBytes)}→${fmtBytes(r.outBytes)})` : "";
          console.log(`  ${tag}  ${r.rel}${savings}`);
        }
      } else if (ext === ".mp4") {
        if (SKIP_VIDEOS) continue;
        console.log(`  MP4…  ${relFromPublic(abs)}  (transcoding…)`);
        const r = await optimizeVideo(abs);
        if (r) {
          vidResults.push(r);
          const savings =
            r.outBytes != null ? ` (${fmtBytes(r.inBytes)}→${fmtBytes(r.outBytes)})` : "";
          console.log(
            `  MP4✓  ${r.rel}${savings} ${r.kind === "mp4-skipped-already-small" ? "[kept original]" : ""}`,
          );
        }
      }
    } catch (err) {
      console.error(`  ✗ FAILED ${relFromPublic(abs)}: ${err.message}`);
    }
  }

  // Summary
  const totalInImg = imgResults.reduce((s, r) => s + r.inBytes, 0);
  const totalOutImg = imgResults.reduce((s, r) => s + (r.outBytes ?? r.inBytes), 0);
  const totalInVid = vidResults.reduce((s, r) => s + r.inBytes, 0);
  const totalOutVid = vidResults.reduce((s, r) => s + (r.outBytes ?? r.inBytes), 0);

  console.log("");
  console.log("Summary:");
  console.log(
    `  Images:  ${imgResults.length} files, ${fmtBytes(totalInImg)} → ${fmtBytes(totalOutImg)}  (saved ${fmtBytes(totalInImg - totalOutImg)})`,
  );
  console.log(
    `  Videos:  ${vidResults.length} files, ${fmtBytes(totalInVid)} → ${fmtBytes(totalOutVid)}  (saved ${fmtBytes(totalInVid - totalOutVid)})`,
  );
  console.log(`  Total saved: ${fmtBytes(totalInImg + totalInVid - totalOutImg - totalOutVid)}`);

  // Rewrite code references for renamed files (png/jpg -> webp).
  if (!NO_REWRITE) {
    console.log("");
    console.log(`Rewriting source references…`);
    const { filesTouched, occurrences } = await rewriteSourceReferences(imgResults);
    console.log(`Rewrote ${occurrences} occurrences across ${filesTouched} files.`);
  } else {
    console.log("\n(skipped source rewrite — --no-rewrite)");
  }

  const elapsed = ((Date.now() - startTs) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
