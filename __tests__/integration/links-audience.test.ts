import fs from 'fs';
import path from 'path';

describe('Links Audience Test', () => {
  it('should ensure all /inscription?plan= links contain an audience parameter', () => {
    const dir = path.join(process.cwd(), 'src/app/fr');
    const getFiles = (dirPath: string): string[] => {
      let results: string[] = [];
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

    const files = getFiles(dir).filter(f => f.endsWith('.tsx'));
    let errors: string[] = [];

    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Match href with /inscription?plan=...
      const regex = /href=(?:["']|\{`)([^"'}]+)(?:["']|`\})/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const href = match[1];
        if (href.includes('/inscription?plan=') && !href.includes('&audience=')) {
          // Check if it's dynamic like ${program.audience}
          if (!href.includes('${') && !href.includes('audience')) {
            errors.push(`Missing audience parameter in ${file} -> ${href}`);
          }
        }
      }
    });

    expect(errors).toEqual([]);
  });
});
