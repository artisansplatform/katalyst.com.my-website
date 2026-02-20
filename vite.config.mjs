import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

const rootDir = process.cwd();
const htmlFiles = readdirSync(rootDir).filter((name) => name.endsWith(".html"));

const input = Object.fromEntries(
  htmlFiles.map((file) => [
    file.replace(/\.html$/, ""),
    path.resolve(rootDir, file),
  ]),
);

function layoutPartialsPlugin() {
  const headerTemplate = readFileSync(
    path.resolve(rootDir, "partials/header.html"),
    "utf8",
  ).trim();
  const footerTemplate = readFileSync(
    path.resolve(rootDir, "partials/footer.html"),
    "utf8",
  ).trim();

  const defaultFooterClass = "bg-alice-blue";
  const defaultFooterCardClass =
    "bg-white/10 px-6 sm:px-12.5 pt-[50px] sm:pt-16.75 pb-8 sm:pb-[54px]";

  return {
    name: "layout-partials",
    transformIndexHtml(html) {
      let transformed = html.replace(
        /<div\s+data-site-header\s*><\/div>/g,
        headerTemplate,
      );

      transformed = transformed.replace(
        /<div\s+data-site-footer(?:\s+data-footer-class="([^"]*)")?(?:\s+data-footer-card-class="([^"]*)")?\s*><\/div>/g,
        (_, footerClass, footerCardClass) => {
          return footerTemplate
            .replace(/{{FOOTER_CLASS}}/g, footerClass || defaultFooterClass)
            .replace(
              /{{FOOTER_CARD_CLASS}}/g,
              footerCardClass || defaultFooterCardClass,
            );
        },
      );

      return transformed;
    },
  };
}

export default defineConfig({
  plugins: [layoutPartialsPlugin()],
  appType: "mpa",
  build: {
    outDir: "dist",
    rollupOptions: {
      input,
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
