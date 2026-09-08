import { PRESENTIEL_CLASSES } from './src/lib/presentiel-data';
import * as fs from 'fs';

const csvContent = fs.readFileSync('classes_presentiel_final_corrige.csv', 'utf-8');
const csvLines = csvContent.split('\n').filter(l => l.trim() !== '');

const csvClasses = [];
for (let i = 1; i < csvLines.length; i++) {
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

console.log("=== CLASSES FROM CSV (What user expects) ===");
csvClasses.forEach(c => console.log(`[${c.id}] ${c.intitule} | Niveau: ${c.niveau} | Creneau: ${c.creneau}`));

console.log("\n=== CLASSES FROM APP (src/lib/presentiel-data.ts) ===");
PRESENTIEL_CLASSES.forEach(c => console.log(`[${c.id}] ${c.niveau} (${c.horaire}) | Type: ${c.type} | Age: ${c.ageCondition}`));

console.log("\n=== ANALYSIS ===");
let missingInApp = [];
csvClasses.forEach(c => {
  const found = PRESENTIEL_CLASSES.find(appClass => appClass.id === c.id);
  if (!found) {
    missingInApp.push(c);
  }
});

if (missingInApp.length > 0) {
  console.log("Les classes suivantes sont dans le CSV mais MANQUENT dans l'application:");
  missingInApp.forEach(c => console.log(`- [${c.id}] ${c.intitule}`));
} else {
  console.log("Aucune classe manquante. Toutes les classes du CSV sont dans l'application !");
}

let extraInApp = [];
PRESENTIEL_CLASSES.forEach(appClass => {
  const found = csvClasses.find(c => c.id === appClass.id);
  if (!found && appClass.planId === 'presentiel-global') {
    extraInApp.push(appClass);
  }
});

if (extraInApp.length > 0) {
  console.log("\nLes classes suivantes sont dans l'application mais ne sont PAS dans le CSV:");
  extraInApp.forEach(c => console.log(`- [${c.id}] ${c.niveau} (${c.horaire})`));
}
