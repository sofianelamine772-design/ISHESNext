"use client";

import { useState } from "react";
import { Loader2, Mail, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type Preview = {
  productionReady: boolean;
  productionError: string | null;
  redirectUrl: string | null;
  emailCount: number;
  studentCount: number;
  families: { email: string; children: string[] }[];
};

export function ClerkInviteRelaunch() {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadPreview() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/clerk-relaunch");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Impossible de préparer la relance");
      setPreview(data);
    } catch (err: any) {
      setError(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  async function sendInvites() {
    if (!preview?.productionReady) return;
    if (!confirm(`Envoyer ${preview.emailCount} invitations Clerk PRODUCTION ?\nUn seul mail par parent. Chaque famille reste sur son e-mail.`)) {
      return;
    }
    setSending(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/clerk-relaunch", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Envoi impossible");
      setResult(`Envoyées : ${data.sent} · déjà un compte / déjà invité : ${data.already} · échecs : ${data.failed}`);
    } catch (err: any) {
      setError(err.message || "Erreur d'envoi");
    } finally {
      setSending(false);
    }
  }

  const families = preview?.families.filter((f) => f.children.length > 1) || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#086b51]/10 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-[#086b51]" />
        </div>
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#086b51]">Relance accès Clerk</h3>
          <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
            Envoie le lien de création de compte <strong>production</strong> à chaque famille.
            Un parent avec plusieurs enfants reçoit <strong>un seul</strong> mail : en se connectant, il voit uniquement ses enfants.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="ishes-outline"
          className="h-11 rounded-xl font-black uppercase tracking-widest text-[10px]"
          onClick={loadPreview}
          disabled={loading || sending}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Préparer la liste"}
        </Button>
        <Button
          type="button"
          variant="ishes"
          className="h-11 rounded-xl font-black uppercase tracking-widest text-[10px]"
          onClick={sendInvites}
          disabled={sending || !preview?.productionReady}
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Envoyer les liens production"}
        </Button>
      </div>

      {error && <p className="text-sm font-bold text-red-600">{error}</p>}
      {result && <p className="text-sm font-bold text-emerald-700">{result}</p>}

      {preview && (
        <div className="space-y-4 pt-2 border-t border-gray-50">
          {!preview.productionReady && (
            <p className="text-sm font-bold text-amber-700">{preview.productionError}</p>
          )}
          {preview.productionReady && (
            <p className="text-[11px] font-bold text-[#086b51] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Lien : {preview.redirectUrl}
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-700">
            <span>{preview.emailCount} e-mails (1 par famille)</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {preview.studentCount} élèves liés</span>
          </div>
          {families.length > 0 && (
            <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-2xl p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fratries (1 mail)</p>
              {families.map((f) => (
                <p key={f.email} className="text-xs text-gray-600">
                  <span className="font-bold text-gray-800">{f.email}</span> → {f.children.join(" · ")}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
