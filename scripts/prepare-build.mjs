import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * `npm run dev` remplace `.next` par un symlink vers ~/Library/Caches/ishes-next.
 * Ce symlink casse `next build` (PostCSS ne résout plus @tailwindcss/postcss).
 * On le retire avant le build Vercel / local.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

try {
  const st = fs.lstatSync(nextDir);
  if (st.isSymbolicLink()) {
    fs.unlinkSync(nextDir);
    console.log("[prepare-build] symlink .next retiré");
  }
} catch {
  // pas de .next — ok
}
