const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace text-[#0a192f] and text-ishes-dark with text-ishes-blue, but only for h1-h6 tags
  content = content.replace(/(<h[1-6][^>]*className="[^"]*)(text-\[\#0a192f\]|text-ishes-dark)([^"]*")([^>]*>)/g, '$1text-ishes-blue$3$4');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log(`Updated headings in ${file}`);
  }
});

console.log(`Finished updating headings in ${changedCount} files.`);
