"use client";

import { useRef, useState } from "react";
import { toE164Phone, trackLeadFormSent } from "@/lib/google-ads-lead";

type Status = "idle" | "sending" | "sent" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function send(form: HTMLFormElement) {
    if (status === "sending" || status === "sent") return;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const company_website = String(data.get("company_website") || "");

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, company_website }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; id?: string; error?: string } | null;
      if (!response.ok || !payload?.ok || !payload.id) {
        setStatus("error");
        setError(payload?.error || "L'envoi n'a pas abouti.");
        return;
      }

      trackLeadFormSent(payload.id, {
        email,
        phone: toE164Phone(phone),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("L'envoi n'a pas abouti. Vérifiez votre connexion.");
    }
  }

  if (status === "sent") {
    return (
      <div
        id="demande-envoyee"
        className="mb-16 rounded-[2.5rem] border border-[#e4dccb] bg-[#f7f3ec] p-8 md:p-12 text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e5730]">Demande envoyée</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#101828]">Votre demande a bien été envoyée</h2>
        <p className="mt-4 text-base text-[#344054] max-w-xl mx-auto">
          L&apos;équipe de l&apos;Institut ISHES a reçu votre message et vous répondra par e-mail ou par téléphone.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="envoi-formulaire-lead"
      onSubmit={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        if (event.key !== "Enter" || !(event.target instanceof HTMLInputElement)) return;
        event.preventDefault();
        if (formRef.current) void send(formRef.current);
      }}
      className="mb-16 rounded-[2.5rem] border border-[#e4dccb] bg-white p-6 sm:p-10 md:p-12"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e5730]">Demande écrite</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#101828]">Envoyer une demande</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold text-[#101828]">
          Nom
          <input
            name="name"
            required
            autoComplete="name"
            minLength={2}
            maxLength={80}
            className="mt-2 w-full rounded-2xl border border-[#e4dccb] bg-[#fafafa] px-4 py-3 font-medium text-[#101828] outline-none focus:border-[#c8a96e]"
          />
        </label>
        <label className="block text-sm font-bold text-[#101828]">
          E-mail
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            maxLength={120}
            className="mt-2 w-full rounded-2xl border border-[#e4dccb] bg-[#fafafa] px-4 py-3 font-medium text-[#101828] outline-none focus:border-[#c8a96e]"
          />
        </label>
        <label className="block text-sm font-bold text-[#101828] sm:col-span-2">
          Téléphone
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={30}
            className="mt-2 w-full rounded-2xl border border-[#e4dccb] bg-[#fafafa] px-4 py-3 font-medium text-[#101828] outline-none focus:border-[#c8a96e]"
          />
        </label>
        <label className="block text-sm font-bold text-[#101828] sm:col-span-2">
          Votre demande
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className="mt-2 w-full rounded-2xl border border-[#e4dccb] bg-[#fafafa] px-4 py-3 font-medium text-[#101828] outline-none focus:border-[#c8a96e]"
          />
        </label>
      </div>

      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {error ? <p className="mt-4 text-sm font-bold text-red-700">{error}</p> : null}

      <button
        type="button"
        disabled={status === "sending"}
        onClick={() => {
          if (formRef.current) void send(formRef.current);
        }}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#152233] px-6 py-3.5 text-sm font-black text-white border border-[#c8a96e] hover:bg-[#101828] disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
