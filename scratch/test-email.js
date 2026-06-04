require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const { data, error } = await resend.emails.send({
    from: 'ISHEECOLE <onboarding@resend.dev>',
    to: 'sofianelamine772@gmail.com',
    subject: "Bienvenue à ISHEECOLE, Test ! 🎉",
    html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <div style="background-color: #086b51; padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
        <h1 style="color: white; margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 800; letter-spacing: 2px;">ISHEECOLE</h1>
      </div>
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0;">Bienvenue à ISHEECOLE, Sofiane ! 🎉</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Votre dossier a bien été créé par notre administration. Nous sommes ravis de vous compter parmi nos élèves !
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Ceci est un test pour vérifier que Resend fonctionne parfaitement sur ton application.
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="https://ishees.vercel.app/app" style="display: inline-block; padding: 14px 28px; background-color: #086b51; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 20px;">Accéder à mon espace</a>
        </div>
      </div>
    </div>
    `
  });

  if (error) {
    console.error("Erreur:", error);
  } else {
    console.log("Succès:", data);
  }
}

test();
