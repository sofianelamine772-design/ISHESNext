const fs = require('fs');
const path = './src/app/fr/civilisation-arabo-musulmane/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix unescaped single and double quotes in JSX text nodes
content = content.replace("Explorez l'âge d'or des sciences, des arts et de la philosophie arabo-musulmane.", 
                          "Explorez l&apos;âge d&apos;or des sciences, des arts et de la philosophie arabo-musulmane.");

content = content.replace("JE M'INSCRIS MAINTENANT", "JE M&apos;INSCRIS MAINTENANT");
content = content.replace("JE M'INSCRIS MAINTENANT", "JE M&apos;INSCRIS MAINTENANT");

content = content.replace('"Celui qui ne connaît pas son passé ne peut construire son futur"',
                          '&quot;Celui qui ne connaît pas son passé ne peut construire son futur&quot;');

// Also fix some descriptions in the arrays if they use single quotes in JSX (wait, those are inside strings, they don't trigger the error)

fs.writeFileSync(path, content);
console.log("Fixed quotes in " + path);
