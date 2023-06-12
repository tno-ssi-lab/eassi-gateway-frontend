import { defineConfig } from "vite";
// import vue from '@vitejs/plugin-vue' // vue3
import { createVuePlugin as vue } from "vite-plugin-vue2";

// Needed for devServer to prevent dots ('.') in a URL breaking routing
import pluginRewriteAll from "vite-plugin-rewrite-all";

const path = require("path");
export default defineConfig({
  plugins: [vue(), pluginRewriteAll()],
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    cors: {
      origin: [
        ".gitpod.io",
        ".eu.ngrok.io",
        "localhost",
        "authn.io",
        "backend",
        "frontend",
      ],
    },
    proxy: {
      "^/api": {
        target: "http://backend:3000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      // Ensure we don't have to add .vue to imports
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
