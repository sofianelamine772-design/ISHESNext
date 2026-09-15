import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fs from 'node:fs';
import path from 'node:path';
import ws from 'ws';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
if (!smtpUser || !smtpPass) {
  console.error('SMTP_USER / SMTP_PASS manquants');
  process.exit(1);
}

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  realtime: { transport: ws },
});

const PREPA_PDF = path.join(process.cwd(), 'Fournitures preparatoire_1re_et_2e_annee_2026-2027.pdf');
const ELEM_PDF = path.join(process.cwd(), 'Fournitures_scolaires_elementaire_2026-2027.pdf');

const targets = [
  { email: 'chabbi1444@gmail.com', name: 'ADAM', kind: 'prepa' },
  { email: 'hindsaissi@gmail.com', name: 'KENZA', kind: 'elem' },
  { email: 'mamadou451@hotmail.fr', name: 'Mohamed', kind: 'elem' },
  { email: 'menailia@gmail.com', name: 'Safaa', kind: 'elem' },
  { email: 'safa.taouali@gmail.com', name: 'Zayn', kind: 'prepa' },
  { email: 'meriem.zekkri@gmail.com', name: 'Yakine', kind: 'elem' },
  { email: 'cherifarij@gmail.com', name: 'Taïm', kind: 'prepa' },
  { email: 'laetitia.nair@gmail.com', name: 'Yanis', kind: 'elem' },
  { email: 'mostafa.mansour17@gmail.com', name: 'Salma', kind: 'prepa' },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function htmlFor(name, kind) {
  const niveau = kind === 'prepa' ? 'Préparatoire 1re et 2e année' : 'Élémentaire';
  const safe = (name || 'chers parents').replace(/[<>]/g, '');
  return `
  <div style="max-width:600px;margin:0 auto;font-family:Helvetica,Arial,sans-serif;background:#fff;border:1px solid #eaeaea;border-radius:16px;overflow:hidden;">
    <div style="background:#ffffff;padding:28px;text-align:center;border-bottom:3px solid #C69C6D;">
      <img src="https://www.ishes.fr/logo.png" alt="ISHES" style="height:56px;object-fit:contain;" />
    </div>
    <div style="padding:36px 30px;color:#152233;">
      <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">Assalam alaykoum ${safe},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
        En espérant que vous vous portez tous pour le mieux,
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
        Vous trouverez <strong>ci-joint la liste des fournitures scolaires 2026/2027</strong>
        pour le niveau <strong>${niveau}</strong>.
      </p>
      <div style="background:#fdfaf5;border-left:4px solid #C69C6D;padding:16px 18px;border-radius:8px;margin:22px 0;">
        <p style="margin:0;font-size:14px;line-height:1.7;color:#333;">
          Merci de prévoir ces fournitures pour la rentrée (première semaine d'octobre).
          Cette liste concerne uniquement les élèves dont l'inscription est finalisée.
        </p>
      </div>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#4b5563;">
        Au plaisir de vous retrouver, inchaALLAH.
      </p>
      <p style="margin:18px 0 0;font-size:16px;font-weight:bold;">Institut ISHES</p>
    </div>
    <div style="background:#152233;padding:18px 24px;text-align:center;">
      <p style="margin:0;color:#ead9be;font-size:12px;">© 2026 ISHES · Tous droits réservés</p>
    </div>
  </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: parseInt(process.env.SMTP_PORT || '465', 10) === 465,
  pool: true,
  maxConnections: 1,
  maxMessages: 20,
  auth: { user: smtpUser, pass: smtpPass },
});

const prepaBuf = fs.readFileSync(PREPA_PDF);
const elemBuf = fs.readFileSync(ELEM_PDF);
const subject = 'Fournitures scolaires 2026/2027';
const campaignId = `fournitures-rattrapage-${new Date().toISOString().slice(0, 10)}`;

let sent = 0;
let failed = 0;
for (const t of targets) {
  const pdf = t.kind === 'prepa'
    ? { filename: 'Fournitures_preparatoire_1re_et_2e_annee_2026-2027.pdf', content: prepaBuf, contentType: 'application/pdf' }
    : { filename: 'Fournitures_scolaires_elementaire_2026-2027.pdf', content: elemBuf, contentType: 'application/pdf' };
  const html = htmlFor(t.name, t.kind);
  const text = `Assalam alaykoum,\n\nVous trouverez ci-joint la liste des fournitures scolaires 2026/2027 (${t.kind === 'prepa' ? 'Préparatoire 1re et 2e année' : 'Élémentaire'}).\n\nInstitut ISHES`;
  try {
    const info = await transporter.sendMail({
      from: `"ISHES" <${smtpUser}>`,
      to: t.email,
      replyTo: smtpUser,
      subject,
      html,
      text,
      attachments: [pdf],
    });
    sent += 1;
    console.log(`OK ${t.email} ${info.messageId}`);
    await Promise.race([
      sb.from('messages').insert({
        sender_id: 'email_archive',
        receiver_id: 'email_archive',
        type: 'private',
        title: subject,
        content: JSON.stringify({
          campaign_id: campaignId,
          recipient_email: t.email,
          recipient_name: t.name,
          subject,
          content_text: text,
          type: 'fournitures',
          status: 'sent',
          smtp_message_id: info.messageId,
          created_at: new Date().toISOString(),
        }),
      }),
      sleep(8000),
    ]);
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${t.email}`, err.message || err);
  }
  await sleep(2500);
}

transporter.close();
console.log(`Terminé : ${sent} envoyés, ${failed} échecs`);
process.exit(failed ? 1 : 0);
