import fs from 'fs';
import path from 'path';

const fileContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/programs-data.ts'), 'utf-8');

const keys = [];
const regex = /^\s+"([^"]+)":\s*\{/gm;
let match;
while ((match = regex.exec(fileContent)) !== null) {
  keys.push(match[1]);
}

console.log("Keys found in PROGRAMS_DATA:", keys);
