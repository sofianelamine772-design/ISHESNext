const fs = require('fs');
const glob = require('glob'); // Not available? We can just use standard fs.
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('/Users/elamine/Desktop/ISHES/src/app/fr', (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Update Hero section padding
    if (content.includes('pt-32 pb-16')) {
      content = content.replace(/pt-32 pb-16/g, 'pt-28 pb-6');
      changed = true;
    }
    
    // Update Pour Qui section padding (py-20 -> pt-12 pb-20)
    if (content.includes('py-20 px-6 max-w-7xl mx-auto')) {
      content = content.replace(/py-20 px-6 max-w-7xl mx-auto/g, 'pt-12 pb-20 px-6 max-w-7xl mx-auto');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log('Updated:', filePath);
    }
  }
});
