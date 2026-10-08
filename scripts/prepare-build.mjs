import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Si un ancien symlink .next (cache hors projet) est encore là, on le retire
 * avant `next build` pour que PostCSS trouve bien les packages.
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
