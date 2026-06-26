const fs = require('fs');

// 1. Update mail.ts
const mailPath = '/Users/elamine/Desktop/ISHES/src/lib/mail.ts';
let mailContent = fs.readFileSync(mailPath, 'utf8');

mailContent = mailContent.replace(
  'export async function sendPaymentReminderEmail(email: string, firstName: string) {',
  'export async function sendPaymentReminderEmail(email: string, firstName: string, paymentLink: string) {'
);

mailContent = mailContent.replace(
  '<a href="https://ishees.vercel.app/app" style="${buttonStyle}">Accéder au paiement</a>',
  '<a href="${paymentLink}" style="${buttonStyle}">Régulariser mon paiement</a>'
);

fs.writeFileSync(mailPath, mailContent);
console.log('Updated mail.ts');

// 2. Update students.ts
const studentsPath = '/Users/elamine/Desktop/ISHES/src/app/actions/students.ts';
let studentsContent = fs.readFileSync(studentsPath, 'utf8');

const newAction = `
export async function sendPaymentReminderWithLinkAction(paymentId: string) {
  try {
    const { data: paiement } = await supabaseAdmin.from('paiements').select('*, etudiants(*)').eq('id', paymentId).single();
    if (!paiement) return { success: false, error: "Paiement introuvable" };

    const student = Array.isArray(paiement.etudiants) ? paiement.etudiants[0] : paiement.etudiants;
    if (!student || !student.email) return { success: false, error: "Étudiant ou email introuvable" };

    const amountInCents = Math.round(parseFloat(paiement.amount) * 100);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ishees.vercel.app";
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: paiement.currency || 'eur',
            product_data: {
              name: 'Régularisation de paiement - ISHES',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: \`\${appUrl}/app/eleve?success=true\`,
      cancel_url: \`\${appUrl}/app/eleve?canceled=true\`,
      metadata: {
        clerkUserId: student.id,
        type: 'regularisation',
        originalPaymentId: paiement.id
      },
      customer_email: student.email
    });

    if (!session.url) return { success: false, error: "Erreur lors de la création du lien de paiement" };

    const { sendPaymentReminderEmail } = await import('@/lib/mail');
    const result = await sendPaymentReminderEmail(student.email, student.first_name || 'Élève', session.url);

    if (!result.success) {
      return { success: false, error: String(result.error) };
    }

    return { success: true };
  } catch (error: any) {
    console.error("sendPaymentReminderWithLinkAction error:", error);
    return { success: false, error: String(error) };
  }
}
`;

studentsContent += newAction;
fs.writeFileSync(studentsPath, studentsContent);
console.log('Updated students.ts');
