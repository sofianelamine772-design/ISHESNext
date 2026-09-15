import fs from 'fs';
const file = fs.readFileSync('ishes_etudiants_distance_15_09_2026_03_26_51 copie.csv', 'utf8');
const lines = file.trim().split('\n').slice(1);
lines.forEach(l => {
  const parts = l.split(',').map(s => s.replace(/"/g, ''));
  console.log(parts[0], parts[1], parts[5]);
});
