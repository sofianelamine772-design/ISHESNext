import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key_for_build");

// Configuration SMTP facultative (Gmail, etc.)
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

let transporter: any = null;
if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  console.log(`[SMTP] Transporter initialisé pour l'utilisateur : ${smtpUser}`);
}

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  provider?: 'smtp' | 'resend';
}

export async function sendEmail({ to, subject, html, text, from, provider }: SendEmailParams) {
  try {
    // Si SMTP est configuré et :
    // - soit provider est 'smtp'
    // - soit on est en mode développement (pour pouvoir tester sans restriction de domaine sandbox)
    // - soit aucun provider n'est spécifié
    const useSmtp = !!transporter && (
      provider === 'smtp' ||
      process.env.NODE_ENV === 'development' ||
      !provider
    );

    if (useSmtp) {
      const mailOptions = {
        from: from || `ISHEECOLE <${smtpUser}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text: text || '',
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log(`[SMTP] E-mail envoyé avec succès (Nodemailer) :`, info.messageId);
      return { success: true, data: info };
    }

    // Sinon, on utilise Resend
    const data = await resend.emails.send({
      from: from || 'ISHEECOLE <onboarding@resend.dev>', // Remplacer par contact@isheecole.fr quand le domaine est vérifié
      to,
      subject,
      html,
      text: text || '',
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return { success: false, error: data.error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

const emailHeader = `
<div style="background-color: #086b51; padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
  <h1 style="color: white; margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 800; letter-spacing: 2px;">ISHEECOLE</h1>
</div>
`;

const emailFooter = `
<div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; font-family: Helvetica, Arial, sans-serif;">
  <p>Institut des Sciences Humaines et d'Études de l'Éducation</p>
  <p>© ${new Date().getFullYear()} ISHEECOLE. Tous droits réservés.</p>
</div>
`;

const buttonStyle = "display: inline-block; padding: 14px 28px; background-color: #086b51; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 20px;";

export async function sendWelcomeEmail(email: string, firstName: string) {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0; font-size: 24px;">Ahlan wa Sahlan, ${firstName} ! 🎉</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Un immense merci pour votre inscription à <strong>ISHEECOLE</strong>. C'est avec une immense joie que nous vous accueillons au sein de notre institut.
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Nous avons tout préparé pour que votre apprentissage soit exceptionnel. Vous allez passer d'excellents moments en notre compagnie, riches en savoir et en partage. Toute notre équipe pédagogique est là pour vous accompagner pas à pas vers la réussite.
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Pour bien commencer, nous vous invitons à découvrir votre espace personnel. Vous y retrouverez vos cours, votre emploi du temps et tous vos documents.
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="https://ishees.vercel.app/app" style="${buttonStyle}">Accéder à mon espace</a>
        </div>
        <p style="color: #777; font-size: 14px; margin-top: 30px; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
          <em>💡 <strong>Astuce :</strong> Si vous n'avez pas encore défini de mot de passe, cliquez sur "Se connecter", puis inscrivez-vous ou utilisez la connexion sans mot de passe avec cette adresse e-mail.</em>
        </p>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "✨ Bienvenue dans la famille ISHEECOLE ! Votre espace vous attend",
    html,
    provider: 'resend'
  });
}

export async function sendPaymentReminderEmail(email: string, firstName: string) {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0;">Rappel de paiement ⚠️</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Bonjour ${firstName},
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Sauf erreur de notre part, il semblerait que vous ayez un règlement en attente pour votre scolarité à l'Institut.
        </p>
        <div style="background-color: #fff8e1; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; color: #b45309; font-weight: bold;">Action requise</p>
          <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">Afin de garantir votre accès aux cours et à votre espace, merci de bien vouloir régulariser votre situation dans les plus brefs délais.</p>
        </div>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Vous pouvez effectuer ce paiement de manière sécurisée directement depuis votre espace personnel.
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="https://ishees.vercel.app/app" style="${buttonStyle}">Accéder au paiement</a>
        </div>
        <p style="color: #777; font-size: 14px; margin-top: 30px;">
          Si vous avez déjà effectué ce paiement récemment, veuillez ignorer cet e-mail.
        </p>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "ISHEECOLE - Action requise concernant votre paiement",
    html,
    provider: 'resend'
  });
}

export async function sendNewMessageEmail({
  email,
  firstName,
  messageContent,
  title,
}: {
  email: string;
  firstName: string;
  messageContent: string;
  title?: string;
}) {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0; font-size: 20px;">Nouveau message de l'administration ✉️</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Bonjour ${firstName},
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Vous avez reçu un nouveau message de la part de l'administration de l'institut <strong>ISHEECOLE</strong>.
        </p>
        ${title ? `<p style="color: #333; font-weight: bold; font-size: 16px; margin-top: 20px; margin-bottom: 5px;">Sujet : ${title}</p>` : ''}
        <div style="background-color: #f9f9f9; border-left: 4px solid #086b51; padding: 20px; margin: 20px 0; border-radius: 8px; color: #333; font-size: 15px; line-height: 1.6; font-family: Georgia, serif; font-style: italic;">
          ${messageContent.replace(/\n/g, '<br />')}
        </div>
        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://ishees.vercel.app'}/app" style="${buttonStyle}">Consulter mon espace</a>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: email,
    subject: title ? `✉️ ISHEECOLE : ${title}` : "✉️ Nouveau message de l'administration ISHEECOLE",
    html,
    provider: 'smtp'
  });
}

