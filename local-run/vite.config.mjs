import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(here, "..");
const modulesDir = path.join(here, "node_modules");

// 源码位于 ../client/src，依赖装在 ./node_modules。
// 只映射前端实际使用的运行时依赖；排除 vite 等工具链以免误伤其内部模块。
const FRONTEND_PACKAGES = [
  "react",
  "react-dom",
  "recharts",
  "@tanstack/react-query",
  "zod",
  "clsx",
];
function moduleAliases() {
  return FRONTEND_PACKAGES
    .filter((name) => fs.existsSync(path.join(modulesDir, name)))
    .map((name) => ({ find: name, replacement: path.join(modulesDir, name) }));
}

export default defineConfig({
  root: here,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@hatch/space-sdk/client", replacement: path.join(here, "shims/space-sdk-client.ts") },
      // CSS @import 需指向具体样式文件，否则 Tailwind 会尝试读取目录本身。
      { find: "tailwindcss-safe-area", replacement: path.join(modulesDir, "tailwindcss-safe-area/index.css") },
      { find: "tailwindcss", replacement: path.join(modulesDir, "tailwindcss/index.css") },
      ...moduleAliases(),
    ],
  },
  server: {
    host: "127.0.0.1",
    port: 60000,
    strictPort: true,
    fs: { allow: [project] },
    proxy: {
      "/actions": "http://127.0.0.1:60001",
    },
  },
  build: {
    outDir: path.join(here, "dist-client"),
    emptyOutDir: true,
  },
});
