const fs = require('fs');

const filePath = '/Users/elamine/Desktop/ISHES/src/app/api/webhooks/stripe/route.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. We need the insert to return the id
content = content.replace(
  'const { error } = await supabaseAdmin.from(\'paiements\').insert({',
  'const { data: insertedPayment, error } = await supabaseAdmin.from(\'paiements\').insert({'
);

content = content.replace(
  'error_message: (invoice as any).last_payment_error?.message || null\n        });',
  'error_message: (invoice as any).last_payment_error?.message || null\n        }).select(\'id\').single();'
);

// 2. In the success block, if failed, call the action
const automaticRelanceStr = `
          // Envoi automatique de la relance si échoué
          if (status === 'failed' && insertedPayment?.id) {
            console.log(\`[WEBHOOK] Paiement échoué, envoi automatique de la relance pour \${insertedPayment.id}\`);
            const { sendPaymentReminderWithLinkAction } = await import('@/app/actions/students');
            await sendPaymentReminderWithLinkAction(insertedPayment.id);
          }
`;

content = content.replace(
  '// Mettre à jour toutes les inscriptions actives de la famille',
  automaticRelanceStr + '\n          // Mettre à jour toutes les inscriptions actives de la famille'
);

fs.writeFileSync(filePath, content);
console.log('Updated webhook for automatic relance');
