export type InviteStudent = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role?: string | null;
  status?: string | null;
};

export type InviteFamily = {
  email: string;
  children: { id: string; name: string; status: string | null }[];
};

const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export function normalizeInviteEmail(raw: string | null | undefined) {
  return String(raw || "").trim().toLowerCase();
}

export function isInvitableEmail(raw: string | null | undefined) {
  return EMAIL_RE.test(normalizeInviteEmail(raw));
}

export function groupStudentsByInviteEmail(
  students: InviteStudent[],
  adminEmails: string[] = [],
): { families: InviteFamily[]; skipped: { id: string; name: string; reason: string }[] } {
  const admins = new Set(adminEmails.map((e) => e.trim().toLowerCase()).filter(Boolean));
  const byEmail = new Map<string, InviteFamily>();
  const skipped: { id: string; name: string; reason: string }[] = [];

  for (const student of students) {
    const name = `${student.first_name || ""} ${student.last_name || ""}`.trim() || student.id;
    const role = String(student.role || "eleve").toLowerCase();
    if (role === "admin") {
      skipped.push({ id: student.id, name, reason: "admin" });
      continue;
    }
    const email = normalizeInviteEmail(student.email);
    if (!email) {
      skipped.push({ id: student.id, name, reason: "sans_email" });
      continue;
    }
    if (!isInvitableEmail(email)) {
      skipped.push({ id: student.id, name, reason: "email_invalide" });
      continue;
    }
    if (admins.has(email)) {
      skipped.push({ id: student.id, name, reason: "email_admin" });
      continue;
    }

    const existing = byEmail.get(email);
    const child = { id: student.id, name, status: student.status || null };
    if (existing) {
      if (!existing.children.some((c) => c.id === student.id)) {
        existing.children.push(child);
      }
    } else {
      byEmail.set(email, { email, children: [child] });
    }
  }

  const families = [...byEmail.values()].sort((a, b) => a.email.localeCompare(b.email));
  return { families, skipped };
}

const PRODUCTION_APP_URL = "https://ishees.vercel.app";

export function resolveProductionAppUrl(rawUrl: string | undefined) {
  const url = String(rawUrl || "").replace(/\/$/, "");
  if (/localhost|127\.0\.0\.1/i.test(url)) {
    return {
      ok: false as const,
      error:
        "Relance bloquée : l’URL de l’app n’est pas la production. NEXT_PUBLIC_APP_URL doit être le site en ligne (pas localhost).",
    };
  }
  return { ok: true as const, url: url || PRODUCTION_APP_URL };
}
