import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const distAssetsDir = resolve("dist/assets");
const cssBundles = readdirSync(distAssetsDir).filter((file) =>
  file.endsWith(".css"),
);

if (cssBundles.length === 0) {
  console.error(
    "No CSS bundle found in dist/assets. Run `npm run build` before size checks.",
  );
  process.exit(1);
}

const cssPath = resolve(distAssetsDir, cssBundles[0]);
const cssContent = readFileSync(cssPath, "utf8");

const rawBytes = Buffer.byteLength(cssContent);
const gzipBytes = gzipSync(cssContent).byteLength;
const MAX_GZIP_BYTES = 30 * 1024;

const toKb = (bytes) => (bytes / 1024).toFixed(2);

console.log(
  `CSS bundle size (${cssBundles[0]}): ${toKb(rawBytes)} KB (raw), ${toKb(gzipBytes)} KB (gzip)`,
);

if (gzipBytes > MAX_GZIP_BYTES) {
  console.error(
    `CSS bundle exceeds gzip budget of ${toKb(MAX_GZIP_BYTES)} KB. Please remove unused utilities or custom layers.`,
  );
  process.exit(1);
}
