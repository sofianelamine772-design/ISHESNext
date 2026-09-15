import fs from 'fs';

const backup = JSON.parse(fs.readFileSync('db_backup.json', 'utf8'));
const classes = backup.classes;
const inscriptions = backup.inscriptions;

// Find "Session Tarbiya Islamiya" vs "Tarbya Islamya - 1ère année"
const tarbiyaClasses = classes.filter(c => c.name.toLowerCase().includes('tarbiya') || c.name.toLowerCase().includes('tarbya'));

console.log("Original student counts in backup (before deletion):");
for (const c of tarbiyaClasses) {
  const count = inscriptions.filter(i => i.class_id === c.id && i.status === 'valide').length;
  console.log(`- ${c.name}: ${count} students`);
}

const arabeClasses = classes.filter(c => c.name.toLowerCase().includes('arabe enfant'));
console.log("\nArabe Enfant counts:");
for (const c of arabeClasses) {
  const count = inscriptions.filter(i => i.class_id === c.id && i.status === 'valide').length;
  console.log(`- ${c.name}: ${count} students`);
}
