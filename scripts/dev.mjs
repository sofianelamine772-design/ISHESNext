import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(os.homedir(), "Library", "Caches", "ishes-next");
const nextDir = path.join(root, ".next");
const nodeModules = path.join(root, "node_modules");

const clean = process.argv.includes("--clean");

if (clean) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  try {
    fs.lstatSync(nextDir);
    fs.rmSync(nextDir, { recursive: true, force: true });
  } catch {
    // nothing to remove
  }
  console.log("[dev] cache Next.js vidé");
  process.exit(0);
}

fs.mkdirSync(cacheDir, { recursive: true });

function alreadyLinked() {
  try {
    if (!fs.lstatSync(nextDir).isSymbolicLink()) return false;
    return fs.realpathSync(nextDir) === fs.realpathSync(cacheDir);
  } catch {
    return false;
  }
}

if (!alreadyLinked()) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
  } catch (error) {
    console.error(
      "[dev] Impossible de remplacer .next. Arrête `npm run dev` puis relance.",
    );
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
  fs.symlinkSync(cacheDir, nextDir);
  console.log(`[dev] .next → ${cacheDir}`);
}

const nextBin = path.join(root, "node_modules", ".bin", "next");
const extraArgs = process.argv.slice(2).filter((arg) => arg !== "--clean");
const child = spawn(nextBin, ["dev", "-p", "3005", ...extraArgs], {
  stdio: "inherit",
  cwd: root,
  env: {
    ...process.env,
    NODE_PATH: nodeModules,
  },
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
