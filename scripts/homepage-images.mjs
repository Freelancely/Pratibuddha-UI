import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const repoRoot = process.cwd();
const configPath = path.join(repoRoot, "scripts", "homepage-images.json");

function ensurePosix(p) {
  return p.split(path.sep).join(path.posix.sep);
}

async function mkdirp(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function downloadUnsplash(unsplashId) {
  const url = `https://unsplash.com/photos/${unsplashId}/download?force=true`;
  const headers = {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let lastStatus = "unknown";
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, { redirect: "follow", headers });
    lastStatus = String(res.status);
    if (res.ok) {
      const ab = await res.arrayBuffer();
      return Buffer.from(ab);
    }

    // Retry transient errors from the CDN.
    if ([429, 500, 502, 503, 504].includes(res.status)) {
      await sleep(500 * Math.pow(2, attempt - 1));
      continue;
    }

    break;
  }

  throw new Error(`Download failed (${lastStatus}) for ${unsplashId}`);
}

function kindToResize(kind, width) {
  switch (kind) {
    case "background":
      return { width, height: undefined, fit: "cover" };
    case "tile":
      return { width, height: undefined, fit: "cover" };
    case "square":
      return { width, height: width, fit: "cover" };
    default:
      return { width, height: undefined, fit: "cover" };
  }
}

async function main() {
  const raw = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(raw);
  const quality = Number(config?.defaults?.webpQuality ?? 82);

  const results = [];

  for (const img of config.images) {
    const outDirAbs = path.join(repoRoot, img.outDir);
    await mkdirp(outDirAbs);

    const input = await downloadUnsplash(img.unsplashId);
    const pipeline = sharp(input).rotate();

    for (const w of img.sizes) {
      const { width, height, fit } = kindToResize(img.kind, w);
      const outName = `${img.baseName}-${w}.webp`;
      const outPathAbs = path.join(outDirAbs, outName);

      await pipeline
        .clone()
        .resize({
          width,
          height,
          fit,
          withoutEnlargement: true
        })
        .webp({ quality })
        .toFile(outPathAbs);

      results.push({
        slot: img.slot,
        unsplashId: img.unsplashId,
        output: ensurePosix(path.join(img.outDir, outName))
      });
    }
  }

  const manifestPath = path.join(repoRoot, "scripts", "homepage-images.manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
  console.log(`Wrote ${results.length} files. Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

