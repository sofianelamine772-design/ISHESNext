const fs = require('fs');
const path = require('path');

const nextBinPath = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

if (fs.existsSync(nextBinPath)) {
  let content = fs.readFileSync(nextBinPath, 'utf8');
  
  const originalRequire = 'const _nexttest = require("../cli/next-test.js");';
  const replacement = '// const _nexttest = require("../cli/next-test.js"); // patched by postinstall';
  
  if (content.includes(originalRequire)) {
    content = content.replace(originalRequire, replacement);
    fs.writeFileSync(nextBinPath, content, 'utf8');
    console.log('✅ Next.js CLI successfully patched to avoid circular dependency.');
  } else {
    console.log('ℹ️ Next.js CLI already patched or target code not found.');
  }
} else {
  console.log('⚠️ Next.js CLI not found, skipping patch.');
}
