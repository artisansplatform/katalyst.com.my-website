import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname);

export default defineConfig({
  root,
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        "404": resolve(root, "404.html"),
        "contact-us": resolve(root, "contact-us.html"),
        "performance-management-agent": resolve(
          root,
          "performance-management-agent.html",
        ),
        "product-portfolio": resolve(root, "product-portfolio.html"),
        solutions: resolve(root, "solutions.html"),
        "succession-planning-agent": resolve(
          root,
          "succession-planning-agent.html",
        ),
        "talent-acquisition": resolve(root, "talent-acquisition.html"),
        "talent-development": resolve(root, "talent-development.html"),
        "talent-intelligence": resolve(root, "talent-intelligence.html"),
        "why-katalyst": resolve(root, "why-katalyst.html"),
      },
    },
  },
});
