"use client";

import { useEffect, useMemo, useState } from "react";
import { History, Loader2, Mail, Search, CheckCircle2, AlertCircle, ChevronDown, Copy } from "lucide-react";
import { looksLikeHtml } from "@/lib/email-html";

type EmailLog = {
  id?: string;
  created_at?: string;
  campaign_id?: string | null;
  recipient_email: string;
  recipient_name?: string | null;
  subject: string;
  content_html?: string | null;
  content_text?: string | null;
  type?: string | null;
  status: "sent" | "failed";
  smtp_message_id?: string | null;
  error?: string | null;
};

type Campaign = {
  key: string;
  subject: string;
  createdAt: string;
  type: string;
  sent: number;
  failed: number;
  recipients: EmailLog[];
};

function groupCampaigns(logs: EmailLog[]): Campaign[] {
  const map = new Map<string, Campaign>();
  logs.forEach((log) => {
    const key = log.campaign_id || log.id || `${log.created_at}-${log.recipient_email}`;
    const existing = map.get(key);
    if (existing) {
      existing.recipients.push(log);
      if (log.status === "failed") existing.failed += 1;
      else existing.sent += 1;
    } else {
      map.set(key, {
        key,
        subject: log.subject,
        createdAt: log.created_at || new Date().toISOString(),
        type: log.type || "system",
        sent: log.status === "sent" ? 1 : 0,
        failed: log.status === "failed" ? 1 : 0,
        recipients: [log],
      });
    }
  });
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function typeLabel(type: string) {
  const labels: Record<string, string> = {
    annonce: "Annonce",
    system: "Système",
    welcome: "Bienvenue",
    rentree: "Rentrée",
    reminder: "Rappel",
    class_whatsapp: "WhatsApp classe",
    admin_internal: "Interne admin",
  };
  return labels[type] || type;
}

export function EmailHistory() {
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [copied, setCopied] = useState("");

  async function load(search = query) {
    setLoading(true);
    try {
      const res = await fetch(`/api/email-logs?q=${encodeURIComponent(search)}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load("");
  }, []);

  const campaigns = useMemo(() => groupCampaigns(logs), [logs]);

  function copyProof(log: EmailLog) {
    const text = [
      "Preuve d'envoi — Institut ISHES",
      `Destinataire : ${log.recipient_name || "—"} <${log.recipient_email}>`,
      `Sujet : ${log.subject}`,
      `Date : ${log.created_at ? new Date(log.created_at).toLocaleString("fr-FR") : "—"}`,
      `Statut : ${log.status === "sent" ? "Envoyé" : "Échec"}`,
      `Identifiant SMTP : ${log.smtp_message_id || "non disponible"}`,
      log.error ? `Erreur : ${log.error}` : "",
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(log.recipient_email);
    setTimeout(() => setCopied(""), 2000);
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#086b51]/10 text-[#086b51] flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-ishes-blue">Historique des e-mails</h3>
              <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                Preuve d'envoi pour chaque e-mail parti. Cherchez l'adresse d'un parent pour montrer la date, le destinataire et l'identifiant SMTP.
              </p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load()}
              placeholder="Rechercher un e-mail, un nom, un sujet..."
              className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#086b51]/15"
            />
          </div>
          <button
            onClick={() => load()}
            className="text-[10px] font-black uppercase tracking-widest text-[#086b51]"
          >
            Rechercher
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-7 h-7 animate-spin text-[#086b51]" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center">
            <Mail className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Aucun e-mail archivé pour cette recherche</p>
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map((campaign) => {
              const open = openKey === campaign.key;
              return (
                <div key={campaign.key} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenKey(open ? null : campaign.key)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50/80"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="bg-[#086b51]/10 text-[#086b51] px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                          {typeLabel(campaign.type)}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(campaign.createdAt).toLocaleString("fr-FR")}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-ishes-dark truncate">{campaign.subject}</h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-1">
                        {campaign.recipients.length} destinataire{campaign.recipients.length > 1 ? "s" : ""}
                        {campaign.sent > 0 ? ` · ${campaign.sent} envoyé${campaign.sent > 1 ? "s" : ""}` : ""}
                        {campaign.failed > 0 ? ` · ${campaign.failed} échec${campaign.failed > 1 ? "s" : ""}` : ""}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {campaign.recipients.map((log, idx) => (
                        <div key={log.id || `${log.recipient_email}-${idx}`} className="p-5 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-black text-ishes-dark">
                                {log.recipient_name || "Destinataire"}
                              </p>
                              <p className="text-xs text-gray-500 font-medium">{log.recipient_email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {log.status === "sent" ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" /> Envoyé
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                  <AlertCircle className="w-3 h-3" /> Échec
                                </span>
                              )}
                              <button
                                onClick={() => copyProof(log)}
                                className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#086b51] bg-gray-50 px-2 py-1 rounded-full"
                              >
                                <Copy className="w-3 h-3" />
                                {copied === log.recipient_email ? "Copié" : "Preuve"}
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            SMTP : {log.smtp_message_id || "non disponible"}
                          </p>
                          {log.error && (
                            <p className="text-xs text-red-500 font-medium">{log.error}</p>
                          )}
                          {(log.content_html || log.content_text) && (
                            <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed max-h-56 overflow-y-auto">
                              {log.content_html && looksLikeHtml(log.content_html) ? (
                                <div dangerouslySetInnerHTML={{ __html: log.content_html }} />
                              ) : (
                                <p className="whitespace-pre-wrap">{log.content_text}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
