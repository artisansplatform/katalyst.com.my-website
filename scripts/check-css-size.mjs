import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const distAssets = resolve(fileURLToPath(new URL("..", import.meta.url)), "dist", "assets");
const cssFiles = readdirSync(distAssets).filter((f) => f.endsWith(".css"));
if (!cssFiles.length) {
  console.error("No CSS file found in dist/assets/. Run `npm run build` first.");
  process.exit(1);
}
const cssPath = resolve(distAssets, cssFiles[0]);
const cssContent = readFileSync(cssPath, "utf8");

const rawBytes = Buffer.byteLength(cssContent);
const gzipBytes = gzipSync(cssContent).byteLength;
const MAX_GZIP_BYTES = 30 * 1024;

const toKb = (bytes) => (bytes / 1024).toFixed(2);

console.log(
  `CSS bundle size: ${toKb(rawBytes)} KB (raw), ${toKb(gzipBytes)} KB (gzip)`,
);

if (gzipBytes > MAX_GZIP_BYTES) {
  console.error(
    `CSS bundle exceeds gzip budget of ${toKb(MAX_GZIP_BYTES)} KB. Please remove unused utilities or custom layers.`,
  );
  process.exit(1);
}
