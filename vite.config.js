import path from "path";
import { defineConfig, loadEnv } from "vite";
import handlebars from "vite-plugin-handlebars";
import { glob } from "glob";

// Auto-discover all HTML pages in the root directory
const htmlFiles = glob.sync("*.html", { cwd: __dirname });
const input = Object.fromEntries(htmlFiles.map((file) => [file.replace(".html", ""), path.resolve(__dirname, file)]));

// Dev only: serve api/*.js like Vercel does, so the form works under `npm run dev`
const devApi = () => ({
  name: "dev-api",
  configureServer(server) {
    Object.assign(process.env, loadEnv("development", __dirname, ""));
    server.middlewares.use("/api", async (req, res) => {
      const name = req.url.split("?")[0].replace(/^\/|\/$/g, "");
      let raw = "";
      for await (const chunk of req) raw += chunk;
      try {
        req.body = raw ? JSON.parse(raw) : {};
        const { default: handler } = await server.ssrLoadModule(`/api/${name}.js`);
        res.status = (code) => ((res.statusCode = code), res);
        res.json = (data) => (res.setHeader("Content-Type", "application/json"), res.end(JSON.stringify(data)));
        await handler(req, res);
      } catch {
        res.statusCode = 404;
        res.end();
      }
    });
  },
});

export default defineConfig({
  plugins: [
    devApi(),
    handlebars({
      partialDirectory: path.resolve(__dirname, "partials"),
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
