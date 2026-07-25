const fs = require('fs');

function updateFile(path, target, replacement) {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(path, content, 'utf8');
      console.log('Updated ' + path);
    }
  }
}

const target1 = `<>Durée : {planId === 'tajwid_intensif' ? '3 mois' : 'du 1er octobre au 30 juin'} | Volume : {planId === 'arabe_coran_junior' ? '2h/semaine' : (planId === 'presentiel-global' || (planId || '').includes('presentiel')) ? '3h/semaine' : '1h30/semaine'}</>`;
const replacement1 = `{planId === 'tajwid_intensif' ? (
                        <>Durée 3 mois / Cours en direct: 2h/ semaine + audio 24h/24</>
                      ) : (
                        <>Durée : du 1er octobre au 30 juin | Volume : {planId === 'arabe_coran_junior' ? '2h/semaine' : (planId === 'presentiel-global' || (planId || '').includes('presentiel')) ? '3h/semaine' : '1h30/semaine'}</>
                      )}`;

updateFile('src/app/(vitrine)/inscription/page.tsx', target1, replacement1);

const target2 = `<>Durée : {planId === 'tajwid_intensif' ? '3 mois' : '8 à 9 mois'} | Volume : {planId === 'arabe_coran_junior' ? '2h/semaine' : ((planId === 'presentiel-global' && (planName?.toLowerCase().includes('débutant') || planName?.toLowerCase().includes('interm')) && planName?.toLowerCase().includes('arabe') && planName?.toLowerCase().includes('tajwid')) || planId === 'femme_debutante_presentiel' || planId === 'femme_intermediaire_presentiel' || planId === 'debutante_presentiel' || planId === 'intermediaire_presentiel') ? '3h/semaine' : '1h30/semaine'}</>`;
const replacement2 = `{planId === 'tajwid_intensif' ? (
                        <>Durée 3 mois / Cours en direct: 2h/ semaine + audio 24h/24</>
                      ) : (
                        <>Durée : 8 à 9 mois | Volume : {planId === 'arabe_coran_junior' ? '2h/semaine' : ((planId === 'presentiel-global' && (planName?.toLowerCase().includes('débutant') || planName?.toLowerCase().includes('interm')) && planName?.toLowerCase().includes('arabe') && planName?.toLowerCase().includes('tajwid')) || planId === 'femme_debutante_presentiel' || planId === 'femme_intermediaire_presentiel' || planId === 'debutante_presentiel' || planId === 'intermediaire_presentiel') ? '3h/semaine' : '1h30/semaine'}</>
                      )}`;

updateFile('src/app/fr/plateforme-inscription/page.tsx', target2, replacement2);
