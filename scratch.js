const fs = require('fs');
const path = require('path');

const csvContent = fs.readFileSync('classes_presentiel_final_corrige.csv', 'utf-8');
const csvLines = csvContent.split('\n').filter(l => l.trim() !== '');

const csvClasses = [];
for (let i = 1; i < csvLines.length; i++) { // Skip header
  const parts = csvLines[i].split(';');
  if (parts.length >= 4) {
    csvClasses.push({
      id: parseInt(parts[0], 10),
      intitule: parts[1].trim(),
      niveau: parts[2].trim(),
      creneau: parts[3].trim()
    });
  }
}

// Quick script to extract from TS
const tsContent = fs.readFileSync('src/lib/presentiel-data.ts', 'utf-8');
const match = tsContent.match(/export const PRESENTIEL_CLASSES: PresentielClass\[\] = (\[[\s\S]*?\]);\n/);

let appClasses = [];
if (match) {
  try {
    // Basic extraction
    const jsonStr = match[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"').replace(/\/\/.*$/gm, '');
    // This might fail if it's complex JS. Let's just run it via node requiring ts-node or transpiling.
  } catch (e) {}
}
