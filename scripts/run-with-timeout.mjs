#!/usr/bin/env node
import { spawn } from 'node:child_process';

const timeoutMs = Number(process.env.PREPUSH_TIMEOUT_MS || 180000);
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/run-with-timeout.mjs <command> [args...]');
  process.exit(1);
}

const child = spawn(args[0], args.slice(1), {
  stdio: 'inherit',
  env: { ...process.env, CI: 'true' },
  shell: false,
});

const timer = setTimeout(() => {
  console.error(`❌ Commande trop longue (> ${Math.round(timeoutMs / 1000)}s). Push refusé.`);
  child.kill('SIGKILL');
  process.exit(1);
}, timeoutMs);

child.on('exit', (code, signal) => {
  clearTimeout(timer);
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});
