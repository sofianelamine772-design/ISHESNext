const fs = require('fs');
const path = require('path');
const glob = require('glob');

const buttonRegex = /<button[^>]*>\s*<PlayCircle className="w-5 h-5" \/> Voir le teaser\s*<\/button>/s;
const buttonRegex2 = /<button \n\s*className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold\/10 px-8 py-4 rounded-md text-\[15px\] font-black transition-all hover:-translate-y-1"\n\s*>\n\s*<PlayCircle className="w-5 h-5" \/> Voir le teaser\n\s*<\/button>/s;

const replacement = `{videoUrl && (
                <Link 
                  href={videoUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
                >
                  <PlayCircle className="w-5 h-5" /> Voir le teaser
                </Link>
              )}`;

const files = glob.sync('src/app/fr/**/*.tsx');
let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Voir le teaser') && content.includes('<button')) {
        let newContent = content.replace(buttonRegex2, replacement).replace(buttonRegex, replacement);
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
            updatedCount++;
        }
    }
}

// CourseDetailView.tsx
const cdvFile = 'src/components/CourseDetailView.tsx';
let cdvContent = fs.readFileSync(cdvFile, 'utf8');
const cdvRegex = /<button\s*onClick={\(\) => {\s*document\.getElementById\('course-video'\)\?\.scrollIntoView\({ behavior: 'smooth', block: 'center' }\);\s*}}\s*className="px-10 py-5 bg-white border-2 border-gray-100 text-\[#101828\] font-black text-lg rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3 active:scale-95"\s*>\s*<Play className="w-5 h-5 fill-current" \/> Voir le teaser\s*<\/button>/s;
const cdvReplacement = `<Link 
                           href={course.videoUrl}
                           target="_blank"
                           className="px-10 py-5 bg-white border-2 border-gray-100 text-[#101828] font-black text-lg rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3 active:scale-95"
                        >
                           <Play className="w-5 h-5 fill-current" /> Voir le teaser
                        </Link>`;
if (cdvContent.includes('Voir le teaser')) {
    let newCdv = cdvContent.replace(cdvRegex, cdvReplacement);
    if (newCdv !== cdvContent) {
        fs.writeFileSync(cdvFile, newCdv, 'utf8');
        console.log(`Updated ${cdvFile}`);
        updatedCount++;
    }
}

console.log(`Done. Updated ${updatedCount} files.`);
