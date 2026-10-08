import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * En local, iCloud utilise des symlinks *.nosync.
 * Sur Vercel, Next/Turbopack doivent voir un vrai dossier node_modules (pas node_modules.nosync).
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function flattenNosync(linkName, nosyncName) {
  const link = path.join(root, linkName);
  const real = path.join(root, nosyncName);
  try {
    const st = fs.lstatSync(link);
    if (st.isSymbolicLink()) {
      fs.unlinkSync(link);
      if (fs.existsSync(real)) {
        fs.renameSync(real, link);
        console.log(`[prepare-build] ${nosyncName} → ${linkName}`);
      }
      return;
    }
  } catch {
    // pas de lien
  }
  if (!fs.existsSync(link) && fs.existsSync(real)) {
    fs.renameSync(real, link);
    console.log(`[prepare-build] ${nosyncName} → ${linkName}`);
  }
}

flattenNosync("node_modules", "node_modules.nosync");
flattenNosync(".next", ".next.nosync");
