#!/usr/bin/env node
import { spawn, execSync } from 'node:child_process';

const timeoutMs = Number(process.env.PREPUSH_TIMEOUT_MS || 180000);
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/run-with-timeout.mjs <command> [args...]');
  process.exit(1);
}

function killTree(pid) {
  if (!pid) return;
  try {
    const children = execSync(`pgrep -P ${pid}`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
    for (const childPid of children) killTree(Number(childPid));
  } catch {
    // no children
  }
  try {
    process.kill(pid, 'SIGKILL');
  } catch {
    // already gone
  }
}

const child = spawn(args[0], args.slice(1), {
  stdio: 'inherit',
  env: { ...process.env, CI: 'true' },
  shell: false,
});

const timer = setTimeout(() => {
  console.error(`❌ Commande trop longue (> ${Math.round(timeoutMs / 1000)}s). Push refusé.`);
  killTree(child.pid);
  process.exit(1);
}, timeoutMs);

child.on('exit', (code, signal) => {
  clearTimeout(timer);
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});
