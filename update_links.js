const fs = require('fs');
const glob = require('glob'); // Note: glob is not guaranteed, let's use standard fs
const path = require('path');

const dir = '/Users/elamine/Desktop/ISHES/src/app/fr';
const getFiles = (dirPath) => {
  let results = [];
  const list = fs.readdirSync(dirPath);
  list.forEach((file) => {
    file = path.join(dirPath, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const files = getFiles(dir);

const audienceMap = {
  'arabe_enfant_distance': 'enfant',
  'fiqh_malikite': 'adulte',
  'sciences_du_coran': 'adulte',
  'as_sirah': 'adulte',
  'arabe_adulte': 'adulte',
  'tarbiya_islamiya': 'enfant',
  'tajwid_standard': 'adulte',
  'tajwid_intensif': 'adulte',
  'memoriser_coran': 'adulte',
  'correction_fatiha': 'adulte',
  'tajwid_enfant_distance': 'enfant',
  'spiritualite_islam': 'adulte',
  'formation_enseignante_tajwid': 'adulte',
  'formation_enseignante_tarbya': 'adulte',
  'al_aqida': 'adulte'
};

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Check all plans
    for (const [plan, audience] of Object.entries(audienceMap)) {
      const regex1 = new RegExp(`href="\\/inscription\\?plan=${plan}"`, 'g');
      if (regex1.test(content)) {
        content = content.replace(regex1, `href="/inscription?plan=${plan}&audience=${audience}"`);
        changed = true;
      }
      
      const regex2 = new RegExp(`href={\\s*["']\\/inscription\\?plan=${plan}["']\\s*}`, 'g');
      if (regex2.test(content)) {
        content = content.replace(regex2, `href="/inscription?plan=${plan}&audience=${audience}"`);
        changed = true;
      }
      
      const regex3 = new RegExp(`href=\\{\`\\/inscription\\?plan=\\$\\{id\\}\`\\}`, 'g');
      if (regex3.test(content)) {
          // If it's a dynamic template literal using ID, we don't know audience unless we fetch it.
          // Wait, in some files I did href={`/inscription?plan=${id}`}
      }
    }
    
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
