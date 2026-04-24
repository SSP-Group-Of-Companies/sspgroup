// SSP Group — asset optimization pipeline.
//
// One command to run:
//   node scripts/optimize-assets.mjs            (execute + rewrite source refs)
//   node scripts/optimize-assets.mjs --dry-run  (report only, touch nothing)
//
// What it does:
//   1. Walks public/_optimized/** and for every raster image:
//        - If the path is in OG_PROTECTED_PATHS -> re-encode in place as PNG
//          at max 1920px wide, sharp max compression (social crawlers need PNG/JPG).
//        - Otherwise -> encode as .webp (q82), delete the original raster.
//   2. Walks every .mp4 in public/_optimized/**:
//        - Re-encodes with H.264 (libx264), CRF 26, yuv420p, scale to max 1920w,
//          +faststart for progressive streaming, AAC 96k stereo audio.
//        - Replaces the original atomically on success.
//   3. If any raster was converted .png|.jpg|.jpeg -> .webp, walks the project
//      source (src/, public/, scripts/, docs/, *.ts/tsx/md/mdx/json/css/mjs)
//      and rewrites every literal occurrence of the old path to the new one.
//   4. Leaves SVGs, .ico, .webm, and already-webp files untouched.
//
// Requires:  `npm i -D sharp` (already installed), ffmpeg on PATH.

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const ASSETS_DIR = path.join(PUBLIC_DIR, "_optimized");

const DRY_RUN = process.argv.includes("--dry-run");
const NO_REWRITE = process.argv.includes("--no-rewrite");
const SKIP_VIDEOS = process.argv.includes("--skip-videos");
const SKIP_IMAGES = process.argv.includes("--skip-images");

// Images referenced by Open Graph / Twitter / JSON-LD / favicon metadata.
// Social crawlers (Facebook, LinkedIn, X, Slack, Discord) don't reliably render
// WebP, so these paths must stay in a lossy/lossless raster crawlers support.
//
// OG_KEEP_PNG: transparency-critical or browser-icon assets — stay PNG.
// OG_TO_JPG:   photographic OG heroes — converted to JPG for dramatic size wins
//              while preserving full crawler compatibility.
const OG_KEEP_PNG = new Set([
  "/_optimized/brand/SSPlogo.png", // transparent logo used in JSON-LD + OG
  "/_optimized/brand/favicon.png", // PWA/browser icon
]);

// Paths listed as their SOURCE extension. On first run these were PNG;
// the script produced JPGs alongside and deleted the PNGs. If a new photographic
// OG hero is added later, drop its PNG path in here to get the same treatment.
const OG_TO_JPG = new Set([
  "/_optimized/insights/insights-hero-ssp-containers-topdown.png",
  "/_optimized/solution/crossBorder/cross-BorderHeroImg.png",
  "/_optimized/solution/crossBorder/mexico-hero-v2.png",
  "/_optimized/solution/crossBorder/ocean-hero-globe.png",
  "/_optimized/solution/crossBorder/air-hero-globe.png",
  "/_optimized/solution/crossBorder/canada-usa-hero-v2.png",
  "/_optimized/industries/automotive-hero-premium.png",
  "/_optimized/industries/manufacturing-hero-premium-v1.png",
  "/_optimized/industries/retail-hero-premium-v3.png",
  "/_optimized/industries/food-hero-premium-v6.png",
  "/_optimized/industries/construction-hero-premium-v1.png",
  "/_optimized/industries/steel-hero-premium-v1.png",
  "/_optimized/industries/chemical-hero-premium-v1.png",
  "/_optimized/solution/truckload/truckload-Image.png",
  "/_optimized/solution/expedited/expedited-Img.png",
  "/_optimized/solution/managedCapacity/managedCapacityHero-Img.png",
]);

const JPG_QUALITY = 86;

const RASTER_EXTS = new Set([".png", ".jpg", ".jpeg"]);
const SKIP_NAMES = new Set([".DS_Store", "Thumbs.db"]);

const IMAGE_MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;
const VIDEO_MAX_WIDTH = 1920;
const VIDEO_CRF = 26;

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

function relPublic(absPath) {
  return "/" + absPath.slice(PUBLIC_DIR.length + 1).replaceAll("\\", "/");
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(abs);
    } else if (!SKIP_NAMES.has(entry.name)) {
      yield abs;
    }
  }
}

// -------- IMAGE OPTIMIZATION -----------------------------------------

async function optimizeImage(abs) {
  const ext = path.extname(abs).toLowerCase();
  if (!RASTER_EXTS.has(ext)) return null;

  const rel = relPublic(abs);
  const stat = await fs.stat(abs);

  const src = sharp(abs, { failOnError: false });
  const meta = await src.metadata();

  const pipeline = sharp(abs, { failOnError: false }).rotate();
  if (meta.width && meta.width > IMAGE_MAX_WIDTH) {
    pipeline.resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true });
  }

  // Decide target format for this file.
  // Logos & favicons: stay PNG (transparency / browser icon semantics).
  // OG photographic heroes: convert to JPG (crawler-safe, 3-5× smaller than PNG).
  // Everything else: convert to WebP.
  const keepPng = OG_KEEP_PNG.has(rel);
  const toJpg = OG_TO_JPG.has(rel);

  if (keepPng) {
    if (DRY_RUN) {
      return { rel, newRel: rel, inBytes: stat.size, outBytes: null, kind: "png-reencode" };
    }
    const tmp = `${abs}.tmp`;
    await pipeline
      .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
      .toFile(tmp);
    const newStat = await fs.stat(tmp);
    await fs.rename(tmp, abs);
    return { rel, newRel: rel, inBytes: stat.size, outBytes: newStat.size, kind: "png-reencode" };
  }

  const targetExt = toJpg ? ".jpg" : ".webp";
  const outAbs = abs.slice(0, -ext.length) + targetExt;
  const outRel = rel.slice(0, -ext.length) + targetExt;

  if (DRY_RUN) {
    return {
      rel,
      newRel: outRel,
      inBytes: stat.size,
      outBytes: null,
      kind: toJpg ? "to-jpg" : "to-webp",
    };
  }

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
  if (outAbs !== abs) {
    await fs.unlink(abs);
  }
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

  const rel = relPublic(abs);
  const stat = await fs.stat(abs);

  if (DRY_RUN) {
    return { rel, newRel: rel, inBytes: stat.size, outBytes: null, kind: "mp4-reencode" };
  }

  const tmp = `${abs}.opt.mp4`;
  // Scale: shrink only if wider than VIDEO_MAX_WIDTH, keep aspect (even dims for H.264).
  const vf = `scale='min(${VIDEO_MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p`;
  const args = [
    "-y",
    "-loglevel", "error",
    "-i", abs,
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", String(VIDEO_CRF),
    "-profile:v", "high",
    "-level", "4.1",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "96k",
    "-ac", "2",
    tmp,
  ];
  await runFfmpeg(args);
  const newStat = await fs.stat(tmp);

  // Only replace when the new file is actually smaller; otherwise keep original.
  if (newStat.size >= stat.size) {
    await fs.unlink(tmp);
    return {
      rel,
      newRel: rel,
      inBytes: stat.size,
      outBytes: stat.size,
      kind: "mp4-skipped-already-small",
    };
  }
  await fs.rename(tmp, abs);
  return {
    rel,
    newRel: rel,
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
        // Never rewrite the optimizer itself — the OG_TO_JPG set stores
        // canonical source paths and must not be mutated by its own run.
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
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".css", ".md", ".mdx", ".json", ".webmanifest",
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
      if (!updated.includes(rel)) continue;
      // Count + replace. Use split/join for exact literal replacement.
      const parts = updated.split(rel);
      fileHits += parts.length - 1;
      updated = parts.join(newRel);
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
  console.log(`  assets dir:  ${ASSETS_DIR}`);
  console.log(`  mode:        ${DRY_RUN ? "DRY-RUN" : "WRITE"}`);
  console.log(`  img target:  max ${IMAGE_MAX_WIDTH}px | WebP q=${WEBP_QUALITY} | OG JPG q=${JPG_QUALITY} mozjpeg | PNG palette+q90`);
  console.log(`  video tgt:   H.264 crf=${VIDEO_CRF} max ${VIDEO_MAX_WIDTH}px +faststart, AAC 96k`);
  console.log(`  og-policy:   ${OG_KEEP_PNG.size} PNG (transparency/favicon) + ${OG_TO_JPG.size} JPG (crawler-safe)`);
  console.log("");

  const imgResults = [];
  const vidResults = [];

  for await (const abs of walk(ASSETS_DIR)) {
    const ext = path.extname(abs).toLowerCase();
    try {
      if (RASTER_EXTS.has(ext)) {
        if (SKIP_IMAGES) continue;
        const r = await optimizeImage(abs);
        if (r) {
          imgResults.push(r);
          const tag =
            r.kind === "png-reencode" ? "PNG↻" : r.kind === "to-jpg" ? "→JPG " : "→WebP";
          const savings =
            r.outBytes != null ? ` (${fmtBytes(r.inBytes)}→${fmtBytes(r.outBytes)})` : "";
          console.log(`  ${tag}  ${r.rel}${savings}`);
        }
      } else if (ext === ".mp4") {
        if (SKIP_VIDEOS) continue;
        console.log(`  MP4…  ${relPublic(abs)}  (transcoding…)`);
        const r = await optimizeVideo(abs);
        if (r) {
          vidResults.push(r);
          const savings =
            r.outBytes != null ? ` (${fmtBytes(r.inBytes)}→${fmtBytes(r.outBytes)})` : "";
          console.log(`  MP4✓  ${r.rel}${savings} ${r.kind === "mp4-skipped-already-small" ? "[kept original]" : ""}`);
        }
      }
    } catch (err) {
      console.error(`  ✗ FAILED ${relPublic(abs)}: ${err.message}`);
    }
  }

  // Summary
  const totalInImg = imgResults.reduce((s, r) => s + r.inBytes, 0);
  const totalOutImg = imgResults.reduce((s, r) => s + (r.outBytes ?? r.inBytes), 0);
  const totalInVid = vidResults.reduce((s, r) => s + r.inBytes, 0);
  const totalOutVid = vidResults.reduce((s, r) => s + (r.outBytes ?? r.inBytes), 0);

  console.log("");
  console.log("Summary:");
  console.log(`  Images:  ${imgResults.length} files, ${fmtBytes(totalInImg)} → ${fmtBytes(totalOutImg)}  (saved ${fmtBytes(totalInImg - totalOutImg)})`);
  console.log(`  Videos:  ${vidResults.length} files, ${fmtBytes(totalInVid)} → ${fmtBytes(totalOutVid)}  (saved ${fmtBytes(totalInVid - totalOutVid)})`);
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
