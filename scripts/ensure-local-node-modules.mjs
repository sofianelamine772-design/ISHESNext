#!/usr/bin/env node
/**
 * Annule les anciens liens node_modules → node_modules.nosync.
 * Ce symlink fait planter Turbopack/PostCSS (timeout loader) en local et sur Vercel.
 */
import { existsSync, lstatSync, renameSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(fileURLToPath(import.meta.url), "..", "..");

function flatten(linkName, nosyncName) {
  const link = join(projectRoot, linkName);
  const real = join(projectRoot, nosyncName);
  try {
    const st = lstatSync(link);
    if (st.isSymbolicLink()) {
      unlinkSync(link);
      if (existsSync(real)) {
        renameSync(real, link);
        console.log(`[dev] ${nosyncName} → ${linkName}`);
      }
      return;
    }
  } catch {
    // pas de lien
  }
  if (!existsSync(link) && existsSync(real)) {
    renameSync(real, link);
    console.log(`[dev] ${nosyncName} → ${linkName}`);
  }
}

flatten("node_modules", "node_modules.nosync");
flatten(".next", ".next.nosync");
