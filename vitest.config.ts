import path from "node:path";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
  test: {
    globals: true,
    browser: {
      enabled: true,
      provider: "playwright",
      name: "chromium",
      viewport: {
        width: 1280,
        height: 720,
      },
      headless: true,
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  define: {
    global: "window",
  },
});
