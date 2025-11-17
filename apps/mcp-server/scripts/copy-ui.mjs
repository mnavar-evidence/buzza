import { cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "../src/ui");
const distDir = resolve(__dirname, "../dist/ui");

async function main() {
  await mkdir(distDir, { recursive: true });
  await cp(srcDir, distDir, { recursive: true });
}

main().catch((err) => {
  console.error("Failed to copy UI templates", err);
  process.exit(1);
});
