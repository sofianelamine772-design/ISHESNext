import fs from 'fs';

const backup = JSON.parse(fs.readFileSync('db_backup.json', 'utf8'));
const classes = backup.classes;
const inscriptions = backup.inscriptions;

const csvIds = [
  '2cc22c12-d26d-4b94-99a5-cbf285e84d38',
  '31d083f0-1cfe-424b-aaae-75a5af67a197',
  '377ad04b-5c6b-4058-869c-89daa5bb6943',
  'ca0ede40-fa3d-45ee-a1c4-32939b6efdd9',
  'cb4c6cd6-9321-49cc-bdd2-4ee2b9bf7718',
  '9e910fb2-9ee9-4913-b223-e69015bf9a37',
  '2cb6c193-900b-45a8-90b5-060f2f924414',
  '38167af1-7570-47ac-a688-866bb30067aa',
  'a15c5730-f227-4779-b72e-fc143b1171a5',
  'e7bdb59e-7b11-4080-aa60-693b5028b005',
  'fdacff0b-818e-46aa-9fbb-891317dac92e',
  '7416a6f7-9b78-4175-859f-f94e1b9a5da5',
  'ff01eba2-0880-4398-b58f-e9ad7f71fad5',
  'eefb247b-e251-43ef-b2c0-e76b07bfaa4b',
  'b3972114-e7d7-4f14-b728-1c322d845824',
  'e5bbe06e-6e1f-45a5-9391-82321530c246'
];

for (const eId of csvIds) {
  const i = inscriptions.find(ins => ins.etudiant_id === eId && ins.status === 'valide');
  if (i) {
    const cls = classes.find(c => c.id === i.class_id);
    console.log(`Student ${eId} -> Class: ${cls ? cls.name : 'Unknown'}`);
  }
}
