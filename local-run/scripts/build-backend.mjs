import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await build({
  entryPoints: [path.join(here, "backend-entry.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  outfile: path.join(here, "backend", "backend.bundle.mjs"),
  alias: {
    "@hatch/space-sdk": path.join(here, "shims", "space-sdk-server.ts"),
  },
  nodePaths: [path.join(here, "node_modules")],
  logLevel: "info",
});
console.log("backend bundle ok");
