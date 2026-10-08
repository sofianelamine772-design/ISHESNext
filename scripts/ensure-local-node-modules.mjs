#!/usr/bin/env node
/**
 * iCloud « Optimiser le stockage » évince node_modules (dataless → os error 60).
 * Les dossiers *.nosync restent sur le Mac. Turbopack refuse un symlink hors projet.
 */
import { lstatSync, mkdirSync, renameSync, rmSync, symlinkSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const targets = [
  { name: "node_modules", real: join(projectRoot, "node_modules.nosync") },
  { name: ".next", real: join(projectRoot, ".next.nosync") },
];

function lstat(path) {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
}

for (const { name, real } of targets) {
  const link = join(projectRoot, name);
  const current = lstat(link);

  if (current?.isSymbolicLink()) continue;

  if (current) {
    rmSync(real, { recursive: true, force: true });
    renameSync(link, real);
  } else if (!lstat(real)) {
    mkdirSync(real, { recursive: true });
  }

  symlinkSync(name === "node_modules" ? "node_modules.nosync" : ".next.nosync", link);
}
