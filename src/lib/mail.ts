import nodemailer from 'nodemailer';
import { logSystemError } from './error-logger';
import { hasSentEmail } from './email-log';
import fs from 'node:fs';
import {
  PRESENTIEL_RENTREE_EMAIL_TYPE,
  buildPresentielRentreeEmail,
  shouldSendPresentielRentreeEmail,
} from './presentiel-rentree-email';
import {
  FOURNITURES_PDF,
  buildPresentielFournituresEmail,
  fournituresEmailType,
  getFournituresKindsToSend,
  resolveFournituresPdfPath,
  type FournituresKind,
} from './presentiel-fournitures-email';
import {
  DISTANCIEL_RENTREE_EMAIL_TYPE,
  DISTANCIEL_RENTREE_PDF,
  buildDistancielRentreeEmail,
  resolveDistancielRentreePdfPath,
  shouldSendDistancielRentreeEmail,
} from './distanciel-rentree';
export { isPresentielFormationSlug, shouldSendPresentielRentreeEmail } from './presentiel-rentree-email';
export { shouldSendDistancielRentreeEmail } from './distanciel-rentree';

// Envoi SMTP via Gmail (compte dédié : ishesmaill@gmail.com).
const SMTP_SENDER_EMAIL = 'ishesmaill@gmail.com';
const smtpUser = process.env.SMTP_USER || SMTP_SENDER_EMAIL;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
/** From affiché — doit correspondre au compte SMTP Gmail (ishesmaill@gmail.com). */
const smtpFrom =
  process.env.SMTP_FROM ||
  process.env.EMAIL_FROM ||
  `"ISHES" <${smtpUser}>`;
const smtpReplyTo = process.env.SMTP_REPLY_TO || smtpUser || SMTP_SENDER_EMAIL;

let transporter: any = null;
if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    // Gmail coupe les envois massifs en parallèle (erreur 421-4.3.0).
    pool: true,
    maxConnections: 1,
    maxMessages: 20,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  console.log(`[SMTP] Transporter initialisé pour l'utilisateur : ${smtpUser}`);
}

const DEFAULT_ADMIN_INBOX = [
  'sofianelamine772@gmail.com',
  'ishes.contact@gmail.com',
];

export function getAdminNotificationEmails(): string[] {
  const fromEnv = (process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set([...DEFAULT_ADMIN_INBOX.map((email) => email.toLowerCase()), ...fromEnv]));
}

function isTransientSmtpError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error || '');
  return /421|4\.3\.0|Temporary System Problem|try again later/i.test(message);
}

export function getAppBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ishes.fr').replace(/\/$/, '');
}

/** Lien « Répondre » des e-mails de messagerie → conversation dans l’app. */
export function getMessageReplyUrl(role: 'student' | 'admin', chatId?: string | null) {
  const base = getAppBaseUrl();
  if (role === 'admin') {
    const id = chatId ? encodeURIComponent(chatId) : '';
    return id
      ? `${base}/app/admin/communication?chat=${id}`
      : `${base}/app/admin/communication`;
  }
  return `${base}/app/eleve/messagerie?reply=1`;
}

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: any;
    contentType?: string;
  }>;
  meta?: {
    type?: string;
    campaignId?: string;
    studentId?: string;
    recipientName?: string;
  };
}

async function archiveOutgoingEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  status: 'sent' | 'failed';
  smtpMessageId?: string | null;
  error?: unknown;
  meta?: SendEmailParams['meta'];
}) {
  try {
    const { recordEmailLog } = await import('./email-log');
    const recipients = (Array.isArray(params.to) ? params.to : String(params.to).split(','))
      .map((item) => item.trim())
      .filter(Boolean);
    for (const recipient of recipients) {
      if (!recipient) continue;
      await recordEmailLog({
        campaign_id: params.meta?.campaignId || null,
        recipient_email: recipient,
        recipient_name: params.meta?.recipientName || null,
        student_id: params.meta?.studentId || null,
        subject: params.subject,
        content_html: params.html,
        content_text: params.text,
        type: params.meta?.type || 'system',
        status: params.status,
        smtp_message_id: params.smtpMessageId || null,
        error: params.error ? String(params.error instanceof Error ? params.error.message : params.error) : null,
      });
    }
  } catch (e) {
    console.error('[EMAIL_LOG] Failed to archive outgoing email', e);
  }
}

export async function sendEmail({ to, subject, html, text, from, replyTo, attachments, meta }: SendEmailParams) {
  const textFallback = text || html.replace(/<[^>]+>/g, '\n').replace(/\n\s*\n/g, '\n\n').trim();

  try {
    if (!transporter) {
      console.warn("[SMTP] Transporter non initialisé. L'email n'a pas été envoyé.");
      await archiveOutgoingEmail({
        to, subject, html, text: textFallback, status: 'failed', error: 'SMTP non configuré', meta,
      });
      return { success: false, error: "SMTP non configuré" };
    }

    const unsubscribeMailto = smtpReplyTo || smtpUser || SMTP_SENDER_EMAIL;
    const unsubscribeUrl = `${getAppBaseUrl()}/contact?unsubscribe=1`;
    const mailOptions = {
      from: from || smtpFrom,
      to: Array.isArray(to) ? to.join(', ') : to,
      replyTo: replyTo || smtpReplyTo,
      subject,
      html,
      text: textFallback,
      attachments: attachments,
      // Éviter X-Priority "Highest" / X-Mailer "Nodemailer" : signaux spam fréquents.
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:${unsubscribeMailto}?subject=unsubscribe>`,
      },
    };

    let info;
    try {
      info = await transporter.sendMail(mailOptions);
    } catch (firstError) {
      if (!isTransientSmtpError(firstError)) throw firstError;
      await new Promise((resolve) => setTimeout(resolve, 2500));
      info = await transporter.sendMail(mailOptions);
    }
    console.log(`[SMTP] E-mail envoyé avec succès (Nodemailer) :`, info.messageId);

    await archiveOutgoingEmail({
      to, subject, html, text: textFallback, status: 'sent', smtpMessageId: info.messageId, meta,
    });

    return { success: true, data: info };

  } catch (error) {
    console.error("Failed to send email:", error);
    await archiveOutgoingEmail({
      to, subject, html, text: textFallback, status: 'failed', error, meta,
    });
    await logSystemError('Mailing Service', error);
    return { success: false, error };
  }
}

const emailHeader = `
<div style="background-color: #ffffff; padding: 30px; text-align: center; border-radius: 16px 16px 0 0; border-bottom: 3px solid #C69C6D;">
  <img src="${getAppBaseUrl()}/logo.png" alt="ISHES" style="height: 60px; object-fit: contain;" />
</div>
`;

const emailFooter = `
<div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; font-family: Helvetica, Arial, sans-serif;">
  <p>Institut des Sciences Humaines et d'Études de l'Éducation</p>
  <p>© ${new Date().getFullYear()} ISHES. Tous droits réservés.</p>
</div>
`;

const buttonStyle = "display: inline-block; padding: 14px 28px; background-color: #0a192f; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 20px;";

export async function sendWelcomeEmail(email: string, firstName: string) {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0; font-size: 24px;">Ahlan wa Sahlan, ${firstName} ! 🎉</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Un immense merci pour votre inscription à <strong>ISHES</strong>. C'est avec une immense joie que nous vous accueillons au sein de notre institut.
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Nous avons tout préparé pour que votre apprentissage soit exceptionnel. Vous allez passer d'excellents moments en notre compagnie, riches en savoir et en partage. Toute notre équipe pédagogique est là pour vous accompagner pas à pas vers la réussite.
        </p>

        <!-- Instagram Group Block -->
        <div style="background-color: #fdf2f8; border-left: 4px solid #ee2a7b; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <p style="margin: 0 0 10px 0; color: #ee2a7b; font-weight: bold; font-size: 16px;">📸 Rejoignez notre communauté Instagram !</p>
          <p style="margin: 0 0 15px 0; color: #86198f; font-size: 14px; line-height: 1.5;">Pour suivre l'actualité de l'institut, nos conseils quotidiens, nos partages et nos événements en direct, rejoignez dès maintenant notre page officielle Instagram :</p>
          <div style="text-align: center;">
            <a href="https://www.instagram.com/institutishes/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">Rejoindre notre Instagram</a>
          </div>
        </div>

        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Pour bien commencer, nous vous invitons à découvrir votre espace personnel. Vous y retrouverez vos cours, votre emploi du temps et tous vos documents.
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="https://ishees.vercel.app/app" style="${buttonStyle}">Accéder à mon espace</a>
        </div>

        <p style="color: #777; font-size: 14px; margin-top: 30px; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
          <em>💡 <strong>Astuce :</strong> Si vous n'avez pas encore défini de mot de passe, cliquez sur "Se connecter", puis inscrivez-vous ou utilisez la connexion sans mot de passe avec cette adresse e-mail.</em>
        </p>

        <!-- WhatsApp Support Block -->
        <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #eee;">
          <p style="color: #333; font-weight: bold; font-size: 16px; margin: 0 0 10px 0;">💬 Des questions ? Un besoin d'assistance ?</p>
          <p style="color: #555; line-height: 1.6; font-size: 15px; margin: 0 0 15px 0;">
            Notre équipe reste entièrement à votre écoute. Vous pouvez nous écrire directement sur WhatsApp au <strong>+33 6 66 03 35 19</strong> (pour les cours à distance) ou au <strong>+33 7 68 65 20 91</strong> (pour le présentiel).
          </p>
          <div style="text-align: center;">
            <a href="https://wa.me/33666033519" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">Nous écrire sur WhatsApp</a>
          </div>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "✨ Bienvenue dans la famille ISHES ! Votre espace vous attend",
    html,
    meta: { type: 'welcome', recipientName: firstName },
  });
}

export async function sendPaymentReminderEmail(email: string, firstName: string, paymentLink?: string) {
  const link = paymentLink || "https://ishees.vercel.app/app";
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
          <a href="${link}" style="${buttonStyle}">Régulariser mon paiement</a>
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
    subject: "ISHES - Action requise concernant votre paiement",
    html,
    meta: { type: 'reminder', recipientName: firstName },
  });
}

export async function sendNewMessageEmail({
  email,
  firstName,
  messageContent,
  title,
  campaignId,
  studentId,
  attachments,
}: {
  email: string;
  firstName: string;
  messageContent: string;
  title?: string;
  campaignId?: string;
  studentId?: string;
  attachments?: Array<{
    filename: string;
    content: any;
    contentType?: string;
  }>;
}) {
  const { toEmailBodyHtml, htmlToPlainText, escapeHtml } = await import('./email-html');
  const processedContent = toEmailBodyHtml(messageContent).replace(
    /(?<!href=["'])(https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9_-]+)/g,
    '<div style="text-align: center; margin: 20px 0;"><a href="$1" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-family: sans-serif; font-weight: bold; font-style: normal; text-align: center;">💬 Rejoindre le groupe WhatsApp</a></div>'
  );

  const safeTitle = title ? escapeHtml(title) : '';
  const safeName = escapeHtml(firstName || 'Élève');
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #0a192f; margin: 0 0 24px; font-size: 22px; text-align: center; line-height: 1.35;">${safeTitle || "Nouveau message de l'administration"}</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Assalam alaykoum ${safeName},
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Vous avez reçu un nouveau message de la part de l'administration de l'institut <strong>ISHES</strong>.
        </p>
        <div style="background-color: #fdfaf5; border-left: 4px solid #C69C6D; padding: 20px; margin: 20px 0; border-radius: 8px; color: #333; font-size: 15px; line-height: 1.7; font-family: Helvetica, Arial, sans-serif;">
          ${processedContent}
        </div>
        <div style="text-align: center; margin: 35px 0;">
          <a href="${getMessageReplyUrl('student')}" style="${buttonStyle}">Répondre dans ISHEECOLE</a>
        </div>
        <p style="color: #888; font-size: 13px; text-align: center; line-height: 1.5;">
          Cliquez sur le bouton pour ouvrir la conversation et répondre directement à l'administration.
        </p>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: email,
    subject: title ? `✉️ ISHES : ${title}` : "✉️ Nouveau message de l'administration ISHES",
    html,
    text: htmlToPlainText(processedContent),
    attachments,
    meta: {
      type: 'annonce',
      campaignId,
      studentId,
      recipientName: firstName,
    },
  });
}

export async function sendClassAssignmentEmail(email: string, firstName: string, className: string, whatsappLink: string) {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0; font-size: 20px;">Bienvenue à l'institut ISHES ! 🎉</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Bonjour ${firstName},
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Toute l'équipe de l'institut vous souhaite la bienvenue. Votre inscription a été validée avec succès et vous avez été affecté(e) à la classe <strong>${className}</strong>.
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Pour ne rien manquer (annonces, échanges avec le professeur, suivi), <strong>voici le groupe WhatsApp à rejoindre impérativement :</strong>
        </p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${whatsappLink}" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Helvetica, Arial, sans-serif;">💬 Rejoindre mon groupe WhatsApp</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        
        <h3 style="color: #333; font-size: 18px;">Votre Espace Élève</h3>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Vous pouvez dès à présent vous connecter à votre espace personnel pour retrouver vos informations, vos cours et vos paiements :
        </p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://ishees.vercel.app'}/app" target="_blank" style="${buttonStyle}">Accéder à mon espace</a>
        </div>
        
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Nous vous souhaitons une excellente réussite dans votre apprentissage !
        </p>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "✅ ISHES - Votre classe et groupe WhatsApp",
    html,
    meta: { type: 'class_whatsapp', recipientName: firstName },
  });
}

export async function maybeSendPresentielRentreeEmail(
  email: string,
  formationId: string,
  formationType?: string | null,
): Promise<{ success: boolean; skipped: boolean; error?: unknown }> {
  if (!email) return { success: false, skipped: true };
  if (!shouldSendPresentielRentreeEmail(formationId, formationType)) {
    return { success: true, skipped: true };
  }

  try {
    if (await hasSentEmail({ recipientEmail: email, type: PRESENTIEL_RENTREE_EMAIL_TYPE })) {
      return { success: true, skipped: true };
    }
  } catch (e) {
    console.warn('[RENTREE] Impossible de vérifier un envoi précédent, on envoie quand même.', e);
  }

  const result = await sendPresentielRentreeEmail(email);
  return { success: result.success, skipped: false, error: result.error };
}

export async function sendPresentielRentreeEmail(email: string) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ishes.fr').replace(/\/$/, '');
  const { subject, html, text } = buildPresentielRentreeEmail(`${appUrl}/logo.png`);

  return sendEmail({
    to: email,
    subject,
    html,
    text,
    meta: { type: PRESENTIEL_RENTREE_EMAIL_TYPE },
  });
}

export async function maybeSendDistancielRentreeEmail(
  email: string,
  formationId: string,
  formationType?: string | null,
): Promise<{ success: boolean; skipped: boolean; error?: unknown }> {
  if (!email) return { success: false, skipped: true };
  if (!shouldSendDistancielRentreeEmail(formationId, formationType)) {
    return { success: true, skipped: true };
  }

  try {
    if (await hasSentEmail({ recipientEmail: email, type: DISTANCIEL_RENTREE_EMAIL_TYPE })) {
      return { success: true, skipped: true };
    }
  } catch (e) {
    console.warn('[RENTREE_DISTANCIEL] Impossible de vérifier un envoi précédent, on envoie quand même.', e);
  }

  const result = await sendDistancielRentreeEmail(email);
  return { success: result.success, skipped: false, error: result.error };
}

async function loadDistancielRentreePdf(): Promise<Buffer | null> {
  const pdfPath = resolveDistancielRentreePdfPath();
  if (pdfPath) return fs.readFileSync(pdfPath);

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ishes.fr').replace(/\/$/, '');
  try {
    const res = await fetch(`${appUrl}${DISTANCIEL_RENTREE_PDF.href}`);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.error('[RENTREE_DISTANCIEL] Impossible de charger le PDF', e);
    return null;
  }
}

export async function sendDistancielRentreeEmail(email: string) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ishes.fr').replace(/\/$/, '');
  const pdfContent = await loadDistancielRentreePdf();
  if (!pdfContent) {
    const missing = 'PDF rentrée distanciel introuvable';
    console.error(`[RENTREE_DISTANCIEL] ${missing}`);
    return { success: false, error: missing };
  }

  const { subject, html, text } = buildDistancielRentreeEmail(`${appUrl}/logo.png`);

  return sendEmail({
    to: email,
    subject,
    html,
    text,
    attachments: [{
      filename: DISTANCIEL_RENTREE_PDF.filename,
      content: pdfContent,
      contentType: 'application/pdf',
    }],
    meta: { type: DISTANCIEL_RENTREE_EMAIL_TYPE },
  });
}

export async function maybeSendPresentielFournituresEmail(
  email: string,
  params: {
    classRefs?: string[];
    forceKinds?: FournituresKind[];
    recipientName?: string | null;
  } = {},
): Promise<{ success: boolean; skipped: boolean; error?: unknown }> {
  if (!email) return { success: false, skipped: true };
  let kinds = getFournituresKindsToSend(params.classRefs || []);
  if (kinds.length === 0 && params.forceKinds) {
    kinds = params.forceKinds;
  }
  if (kinds.length === 0) return { success: true, skipped: true };

  let sentAny = false;
  for (const kind of kinds) {
    try {
      if (await hasSentEmail({ recipientEmail: email, type: fournituresEmailType(kind) })) {
        continue;
      }
    } catch (e) {
      console.warn('[FOURNITURES] Impossible de vérifier un envoi précédent, on envoie quand même.', e);
    }

    const result = await sendPresentielFournituresEmail(email, kind, params.recipientName);
    if (!result.success) {
      return { success: false, skipped: false, error: result.error };
    }
    sentAny = true;
  }

  return { success: true, skipped: !sentAny };
}

async function loadFournituresPdf(kind: FournituresKind): Promise<Buffer | null> {
  const pdfPath = resolveFournituresPdfPath(kind);
  if (pdfPath) return fs.readFileSync(pdfPath);

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ishes.fr').replace(/\/$/, '');
  try {
    const res = await fetch(`${appUrl}/fournitures/${FOURNITURES_PDF[kind].filename}`);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.error(`[FOURNITURES] Impossible de charger le PDF ${kind}`, e);
    return null;
  }
}

export async function sendPresentielFournituresEmail(
  email: string,
  kind: FournituresKind,
  recipientName?: string | null,
) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ishes.fr').replace(/\/$/, '');
  const pdfContent = await loadFournituresPdf(kind);
  if (!pdfContent) {
    const missing = `PDF fournitures introuvable (${kind})`;
    console.error(`[FOURNITURES] ${missing}`);
    return { success: false, error: missing };
  }

  const { subject, html, text } = buildPresentielFournituresEmail({
    kind,
    recipientName,
    logoUrl: `${appUrl}/logo.png`,
  });

  return sendEmail({
    to: email,
    subject,
    html,
    text,
    attachments: [{
      filename: FOURNITURES_PDF[kind].filename,
      content: pdfContent,
      contentType: 'application/pdf',
    }],
    meta: {
      type: fournituresEmailType(kind),
      recipientName: recipientName || undefined,
    },
  });
}

export async function sendAdminNewMessageEmail({
  studentName,
  studentEmail,
  messageContent,
  chatId,
}: {
  studentName: string;
  studentEmail: string;
  messageContent: string;
  chatId?: string | null;
}) {
  const processedContent = messageContent.replace(/\n/g, '<br />');
  const replyUrl = getMessageReplyUrl('admin', chatId);

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #333; margin-top: 0; font-size: 20px;">Nouveau message d'un élève ✉️</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Bonjour Administrateur,
        </p>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Vous avez reçu un nouveau message de la part de <strong>${studentName}</strong>${studentEmail ? ` (${studentEmail})` : ''}.
        </p>
        <div style="background-color: #f9f9f9; border-left: 4px solid #0a192f; padding: 20px; margin: 20px 0; border-radius: 8px; color: #333; font-size: 15px; line-height: 1.6; font-family: Georgia, serif; font-style: ;">
          ${processedContent}
        </div>
        <div style="text-align: center; margin: 35px 0;">
          <a href="${replyUrl}" style="${buttonStyle}">Répondre dans ISHEECOLE</a>
        </div>
        <p style="color: #888; font-size: 13px; text-align: center; line-height: 1.5;">
          Cliquez sur le bouton pour ouvrir la conversation avec ${studentName} et lui répondre.
        </p>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: getAdminNotificationEmails(),
    subject: `✉️ Nouveau message de ${studentName} - ISHES`,
    html,
    meta: { type: 'admin_internal', recipientName: 'Administration' },
  });
}

function formatBackupEuro(amount?: number) {
  return `${(amount ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

function backupCollectionRate(collected?: number, expected?: number) {
  const c = collected ?? 0;
  const e = expected ?? 0;
  if (e <= 0) return '—';
  return `${Math.round((c / e) * 100)} %`;
}

export async function sendBackupReportEmail(params: {
  date: string;
  signedUrl: string;
  signedUrlSql?: string;
  signedUrlCsvDistance?: string;
  signedUrlCsvPresentiel?: string;
  stats: {
    etudiants: number;
    etudiantsDistance?: number;
    etudiantsPresentiel?: number;
    inscriptions: number;
    paiements: number;
    classes: number;
    messages: number;
    newStudents24h?: number;
    totalCollectedDistance?: number;
    totalCollectedStripeDistance?: number;
    totalCollectedManualDistance?: number;
    totalRemainingDistance?: number;
    totalExpectedDistance?: number;
    totalCollectedPresentiel?: number;
    totalCollectedStripePresentiel?: number;
    totalCollectedManualPresentiel?: number;
    totalRemainingPresentiel?: number;
    totalExpectedPresentiel?: number;
    abandonedCheckouts24h?: number;
  };
  backupJsonString?: string;
  backupSqlString?: string;
  backupCsvStringDistance?: string;
  backupCsvStringPresentiel?: string;
}) {
  const { date, signedUrl, signedUrlSql, signedUrlCsvDistance, signedUrlCsvPresentiel, stats, backupJsonString, backupSqlString, backupCsvStringDistance, backupCsvStringPresentiel } = params;

  const etudiantsDistance = stats.etudiantsDistance ?? 0;
  const etudiantsPresentiel = stats.etudiantsPresentiel ?? 0;
  const totalCollected = (stats.totalCollectedDistance ?? 0) + (stats.totalCollectedPresentiel ?? 0);
  const totalCollectedStripe =
    (stats.totalCollectedStripeDistance ?? 0) + (stats.totalCollectedStripePresentiel ?? 0);
  const totalCollectedManual =
    (stats.totalCollectedManualDistance ?? 0) + (stats.totalCollectedManualPresentiel ?? 0);
  const totalRemaining = (stats.totalRemainingDistance ?? 0) + (stats.totalRemainingPresentiel ?? 0);
  const totalExpected =
    (stats.totalExpectedDistance ?? ((stats.totalCollectedDistance ?? 0) + (stats.totalRemainingDistance ?? 0))) +
    (stats.totalExpectedPresentiel ?? ((stats.totalCollectedPresentiel ?? 0) + (stats.totalRemainingPresentiel ?? 0)));

  const html = `
    <div style="max-width: 640px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #0a192f; margin-top: 0; font-size: 20px;">Sauvegarde ISHES — ${date}</h2>
        <p style="color: #555; line-height: 1.6; font-size: 15px; margin: 0 0 8px;">
          Sauvegarde automatique OK. Ci-dessous : vue utile séparée <strong>distanciel</strong> / <strong>présentiel</strong> (élèves réels uniquement, hors comptes test). Encaissement détaillé <strong>Stripe live</strong> vs <strong>saisie manuelle</strong> (les paiements Stripe test locaux sont exclus).
        </p>

        <h3 style="color: #0a192f; font-size: 15px; margin: 28px 0 10px; border-bottom: 2px solid #086b51; padding-bottom: 6px;">Distanciel</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 0 0 8px; font-size: 14px;">
          <tr style="background-color: #f0faf6;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Élèves</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #086b51;">${etudiantsDistance}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Montant attendu</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(stats.totalExpectedDistance ?? ((stats.totalCollectedDistance ?? 0) + (stats.totalRemainingDistance ?? 0)))}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé Stripe</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(stats.totalCollectedStripeDistance)}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé manuel</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(stats.totalCollectedManualDistance)}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé (total)</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #086b51;">${formatBackupEuro(stats.totalCollectedDistance)}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Reste à encaisser</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #b45309;">${formatBackupEuro(stats.totalRemainingDistance)}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Taux d'encaissement</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${backupCollectionRate(stats.totalCollectedDistance, stats.totalExpectedDistance ?? ((stats.totalCollectedDistance ?? 0) + (stats.totalRemainingDistance ?? 0)))}</td>
          </tr>
        </table>
        <p style="margin: 0 0 18px; font-size: 12px; color: #777;">Fichier détail : CSV « élèves distance » (joint / lien ci-dessous).</p>

        <h3 style="color: #0a192f; font-size: 15px; margin: 8px 0 10px; border-bottom: 2px solid #d97706; padding-bottom: 6px;">Présentiel</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 0 0 8px; font-size: 14px;">
          <tr style="background-color: #fff8ef;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Élèves</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #d97706;">${etudiantsPresentiel}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Montant attendu</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(stats.totalExpectedPresentiel ?? ((stats.totalCollectedPresentiel ?? 0) + (stats.totalRemainingPresentiel ?? 0)))}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé Stripe</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(stats.totalCollectedStripePresentiel)}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé manuel</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(stats.totalCollectedManualPresentiel)}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé (total)</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #086b51;">${formatBackupEuro(stats.totalCollectedPresentiel)}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Reste à encaisser</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #b45309;">${formatBackupEuro(stats.totalRemainingPresentiel)}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Taux d'encaissement</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${backupCollectionRate(stats.totalCollectedPresentiel, stats.totalExpectedPresentiel ?? ((stats.totalCollectedPresentiel ?? 0) + (stats.totalRemainingPresentiel ?? 0)))}</td>
          </tr>
        </table>
        <p style="margin: 0 0 18px; font-size: 12px; color: #777;">Fichier détail : CSV « élèves présentiel » (joint / lien ci-dessous).</p>

        <h3 style="color: #333; font-size: 15px; margin: 8px 0 10px; border-bottom: 1px solid #eaeaea; padding-bottom: 6px;">Synthèse globale</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 0 0 18px; font-size: 14px;">
          <tr style="background-color: #f4f6f8;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Élèves (total)</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #0a192f;">${stats.etudiants} <span style="font-weight: normal; color: #777; font-size: 12px;">(${etudiantsDistance} dist. + ${etudiantsPresentiel} prés.)</span></td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé Stripe</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(totalCollectedStripe)}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Encaissé manuel</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${formatBackupEuro(totalCollectedManual)}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Attendu / encaissé / reste</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f; font-size: 13px;">${formatBackupEuro(totalExpected)} · ${formatBackupEuro(totalCollected)} · <strong style="color:#b45309;">${formatBackupEuro(totalRemaining)}</strong></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Taux global</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; font-weight: bold; color: #0a192f;">${backupCollectionRate(totalCollected, totalExpected)}</td>
          </tr>
          <tr>
            <td style="padding: 9px 10px; border: 1px solid #eaeaea; color: #333;">Inscriptions · Paiements · Classes · Messages</td>
            <td style="text-align: right; padding: 9px 10px; border: 1px solid #eaeaea; color: #0a192f;">${stats.inscriptions} · ${stats.paiements} · ${stats.classes} · ${stats.messages}</td>
          </tr>
        </table>

        <h3 style="color: #333; font-size: 15px; margin: 8px 0 10px; border-bottom: 1px solid #eaeaea; padding-bottom: 6px;">Dernières 24 h</h3>
        <ul style="list-style: none; padding: 0; margin: 0 0 22px; color: #555; font-size: 14px; line-height: 1.8;">
          <li><strong>Nouveaux élèves :</strong> ${stats.newStudents24h ?? 0}</li>
          <li><strong>Paiements abandonnés (checkout) :</strong> ${stats.abandonedCheckouts24h ?? 0}</li>
        </ul>

        <div style="background-color: #f4faf8; border-left: 4px solid #0a192f; padding: 14px 16px; margin: 0 0 28px; border-radius: 8px; color: #334; font-size: 13px; line-height: 1.5;">
          Fichiers inchangés côté contenu : JSON + SQL (base complète), CSV distanciel et CSV présentiel séparés. Stockés dans le bucket privé <strong>backups</strong> (Supabase).
        </div>

        <div style="text-align: center; margin: 0 0 10px;">
          <div style="margin-bottom: 12px;">
            <a href="${signedUrl}" style="${buttonStyle}">Backup JSON (complet)</a>
          </div>
          ${signedUrlSql ? `
          <div style="margin-bottom: 12px;">
            <a href="${signedUrlSql}" style="${buttonStyle} background-color: #1d4ed8;">Backup SQL (complet)</a>
          </div>
          ` : ''}
          ${signedUrlCsvDistance ? `
          <div style="margin-bottom: 12px;">
            <a href="${signedUrlCsvDistance}" style="${buttonStyle} background-color: #086b51;">CSV — Élèves distanciel</a>
          </div>
          ` : ''}
          ${signedUrlCsvPresentiel ? `
          <div style="margin-bottom: 12px;">
            <a href="${signedUrlCsvPresentiel}" style="${buttonStyle} background-color: #d97706;">CSV — Élèves présentiel</a>
          </div>
          ` : ''}
          <p style="font-size: 11px; color: #888; margin-top: 12px;">Liens privés valables 7 jours. Les mêmes fichiers sont aussi joints à ce mail si la taille le permet.</p>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  const attachments: any[] = [];
  const safeDateStr = date.replace(/\//g, '_').replace(/ /g, '_').replace(/:/g, '_');

  if (backupJsonString) {
    attachments.push({
      filename: `ishes_db_backup_${safeDateStr}.json`,
      content: backupJsonString,
      contentType: 'application/json'
    });
  }

  if (backupSqlString) {
    attachments.push({
      filename: `ishes_db_backup_${safeDateStr}.sql`,
      content: backupSqlString,
      contentType: 'application/sql'
    });
  }

  if (backupCsvStringDistance) {
    attachments.push({
      filename: `ishes_etudiants_distance_${safeDateStr}.csv`,
      content: backupCsvStringDistance,
      contentType: 'text/csv'
    });
  }

  if (backupCsvStringPresentiel) {
    attachments.push({
      filename: `ishes_etudiants_presentiel_${safeDateStr}.csv`,
      content: backupCsvStringPresentiel,
      contentType: 'text/csv'
    });
  }

  return sendEmail({
    to: getAdminNotificationEmails(),
    subject: `Sauvegarde ISHES — ${date} · Dist. ${etudiantsDistance} · Prés. ${etudiantsPresentiel}`,
    html,
    attachments: attachments.length > 0 ? attachments : undefined,
    meta: { type: 'admin_internal' },
  });
}

export async function sendAdminNewStudentNotificationEmail(params: {
  studentName: string;
  studentEmail: string;
  phone?: string;
  formation: string;
  className?: string;
  amountStr: string;
}) {
  const { studentName, studentEmail, phone, formation, className, amountStr } = params;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      ${emailHeader}
      <div style="padding: 40px 30px;">
        <h2 style="color: #086b51; margin-top: 0; font-size: 20px;">🎉 Nouvelle Inscription ISHES !</h2>
        <p style="color: #555; line-height: 1.6; font-size: 16px;">
          Un nouvel élève vient de s'inscrire et a effectué son paiement avec succès.
        </p>
        
        <div style="background-color: #f9f9f9; border-left: 4px solid #086b51; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333; font-size: 16px;">👤 Informations de l'élève</h3>
          <ul style="list-style: none; padding: 0; margin: 0; color: #555; font-size: 15px; line-height: 1.8;">
            <li><strong>Nom & Prénom :</strong> ${studentName}</li>
            <li><strong>Email :</strong> ${studentEmail}</li>
            ${phone ? `<li><strong>Téléphone :</strong> ${phone}</li>` : ''}
          </ul>
        </div>

        <div style="background-color: #f0f7ff; border-left: 4px solid #2563eb; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333; font-size: 16px;">📚 Détails de la scolarité</h3>
          <ul style="list-style: none; padding: 0; margin: 0; color: #555; font-size: 15px; line-height: 1.8;">
            <li><strong>Formation :</strong> ${formation}</li>
            ${className ? `<li><strong>Classe :</strong> ${className}</li>` : ''}
            <li><strong>Montant payé :</strong> ${amountStr}</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://ishes.fr'}/app/admin/etudiants" style="${buttonStyle}">Voir dans le tableau de bord</a>
        </div>
      </div>
      ${emailFooter}
    </div>
  `;

  return sendEmail({
    to: getAdminNotificationEmails(),
    subject: `🎉 Nouvelle Inscription - ${studentName}`,
    html,
    meta: { type: 'admin_internal', recipientName: studentName },
  });
}
