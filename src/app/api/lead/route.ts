import { NextResponse } from "next/server";
import { getAdminNotificationEmails, sendEmail } from "@/lib/mail";
import { logSystemError } from "@/lib/error-logger";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Demande illisible." }, { status: 400 });
  }

  if (clean(body.company_website, 200)) {
    return NextResponse.json({ ok: false, error: "Demande refusée." }, { status: 400 });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120).toLowerCase();
  const phone = clean(body.phone, 30);
  const message = String(body.message ?? "").trim().slice(0, 2000);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Indiquez votre nom." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Indiquez un e-mail valide." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Écrivez votre demande (au moins quelques mots)." },
      { status: 400 },
    );
  }

  const ip = clientIp(request);
  if (tooMany(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes. Réessayez un peu plus tard." },
      { status: 429 },
    );
  }

  const id = crypto.randomUUID();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Non indiqué");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const result = await sendEmail({
    to: getAdminNotificationEmails(),
    replyTo: email,
    subject: `Nouvelle demande — ${name}`,
    text: `Demande envoyée depuis ishes.fr/contact\n\nNom : ${name}\nE-mail : ${email}\nTéléphone : ${phone || "Non indiqué"}\n\n${message}\n\nRéf. ${id}`,
    html: `
      <div style="font-family: Helvetica, Arial, sans-serif; color: #101828; line-height: 1.5;">
        <p style="margin: 0 0 12px;">Une demande a été envoyée depuis le formulaire de <strong>ishes.fr/contact</strong>.</p>
        <p style="margin: 0 0 4px;"><strong>Nom :</strong> ${safeName}</p>
        <p style="margin: 0 0 4px;"><strong>E-mail :</strong> ${safeEmail}</p>
        <p style="margin: 0 0 12px;"><strong>Téléphone :</strong> ${safePhone}</p>
        <p style="margin: 0 0 8px;"><strong>Message :</strong></p>
        <p style="margin: 0 0 16px;">${safeMessage}</p>
        <p style="margin: 0; color: #667085; font-size: 12px;">Réf. ${escapeHtml(id)}</p>
      </div>
    `,
    meta: { type: "lead_form" },
  });

  if (!result.success) {
    await logSystemError("Lead form", result.error || "Envoi impossible");
    return NextResponse.json(
      { ok: false, error: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous sur WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id });
}
