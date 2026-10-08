#!/usr/bin/env node
/**
 * Le projet est sur le Bureau iCloud : au redémarrage, « Optimiser le stockage »
 * évince .git, node_modules et .next (fichiers dataless → git push / Turbopack bloqués).
 *
 * Les dossiers *.nosync restent sur le Mac. Un agent LaunchAgent relance la protection au login.
 */
import { spawnSync } from "node:child_process";
import {
  closeSync,
  existsSync,
  lstatSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  readSync,
  renameSync,
  rmSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = join(scriptPath, "..", "..");

// Vercel / CI : ne jamais déplacer node_modules vers *.nosync (casse Turbopack + Edge).
if (process.env.VERCEL || process.env.CI) {
  process.exit(0);
}

function lstat(path) {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
}

function ignoreICloud(path) {
  if (process.platform !== "darwin" || !existsSync(path)) return;
  spawnSync("xattr", ["-w", "com.apple.fileprovider.ignore#P", "1", path], {
    stdio: "ignore",
  });
}

function pinKeepDownloaded(path) {
  if (process.platform !== "darwin" || !existsSync(path)) return;
  spawnSync("brctl", ["download", path], { stdio: "ignore" });
}

function hydrateDataless(dir, budget = 4000) {
  if (process.platform !== "darwin" || !existsSync(dir)) return 0;
  const listed = spawnSync(
    "find",
    [dir, "-type", "f", "-flags", "+dataless"],
    { encoding: "utf8", maxBuffer: 20_000_000 },
  );
  if (listed.status !== 0 || !listed.stdout.trim()) return 0;
  const files = listed.stdout.trim().split("\n").slice(0, budget);
  const buf = Buffer.alloc(1);
  let n = 0;
  for (const file of files) {
    try {
      const fd = openSync(file, "r");
      readSync(fd, buf, 0, 1, 0);
      closeSync(fd);
      n += 1;
    } catch {
      // placeholder encore inaccessible
    }
  }
  return n;
}

function ensureNosyncDir(name, nosyncName) {
  const link = join(projectRoot, name);
  const real = join(projectRoot, nosyncName);
  const current = lstat(link);

  if (current?.isSymbolicLink()) {
    ignoreICloud(real);
    pinKeepDownloaded(real);
    return real;
  }

  if (current?.isDirectory()) {
    if (lstat(real)?.isDirectory()) {
      const linkCount = readdirSync(link).length;
      const realCount = readdirSync(real).length;
      if (linkCount >= realCount) {
        rmSync(real, { recursive: true, force: true });
        renameSync(link, real);
      } else {
        rmSync(link, { recursive: true, force: true });
      }
    } else {
      renameSync(link, real);
    }
  } else if (current) {
    unlinkSync(link);
    if (!lstat(real)) mkdirSync(real, { recursive: true });
  } else if (!lstat(real)) {
    mkdirSync(real, { recursive: true });
  }

  symlinkSync(nosyncName, link);
  ignoreICloud(real);
  pinKeepDownloaded(real);
  return real;
}

function ensureGitNosync() {
  const gitFile = join(projectRoot, ".git");
  const gitNosync = join(projectRoot, ".git.nosync");
  const current = lstat(gitFile);

  if (current?.isFile()) {
    const body = readFileSync(gitFile, "utf8");
    if (!body.includes(".git.nosync")) {
      writeFileSync(gitFile, "gitdir: .git.nosync\n");
    }
    if (!lstat(gitNosync)) mkdirSync(gitNosync, { recursive: true });
    ignoreICloud(gitNosync);
    pinKeepDownloaded(gitNosync);
    return gitNosync;
  }

  if (current?.isSymbolicLink()) {
    ignoreICloud(gitNosync);
    pinKeepDownloaded(gitNosync);
    return gitNosync;
  }

  if (current?.isDirectory()) {
    if (lstat(gitNosync)) {
      rmSync(gitNosync, { recursive: true, force: true });
    }
    renameSync(gitFile, gitNosync);
    writeFileSync(gitFile, "gitdir: .git.nosync\n");
    ignoreICloud(gitNosync);
    pinKeepDownloaded(gitNosync);
    return gitNosync;
  }

  return null;
}

function installLoginAgent() {
  if (process.platform !== "darwin") return;
  const launchDir = join(homedir(), "Library", "LaunchAgents");
  mkdirSync(launchDir, { recursive: true });
  const plistPath = join(launchDir, "com.ishes.keep-local.plist");
  const nodePath = process.execPath;
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.ishes.keep-local</string>
  <key>ProgramArguments</key>
  <array>
    <string>${nodePath}</string>
    <string>${scriptPath}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${projectRoot}</string>
  <key>RunAtLoad</key>
  <true/>
  <key>StartInterval</key>
  <integer>1800</integer>
  <key>StandardOutPath</key>
  <string>${join(homedir(), "Library/Logs/ishes-keep-local.log")}</string>
  <key>StandardErrorPath</key>
  <string>${join(homedir(), "Library/Logs/ishes-keep-local.log")}</string>
</dict>
</plist>
`;
  writeFileSync(plistPath, plist);
  spawnSync("launchctl", ["unload", plistPath], { stdio: "ignore" });
  spawnSync("launchctl", ["load", "-w", plistPath], { stdio: "ignore" });
}

const nm = ensureNosyncDir("node_modules", "node_modules.nosync");
const next = ensureNosyncDir(".next", ".next.nosync");
const git = ensureGitNosync();

ignoreICloud(projectRoot);
installLoginAgent();

const hydrated =
  hydrateDataless(nm) + hydrateDataless(next) + (git ? hydrateDataless(git) : 0);

if (hydrated > 0) {
  console.log(`[icloud] ${hydrated} fichiers Git/cache rechargés en local`);
}
