"use client";

import { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { ShieldAlert, ArrowLeft, Mail, Globe, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { linkTypoRegistrationAction } from "@/app/actions/students";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [typoEmail, setTypoEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typoEmail) return;

    setLoading(true);
    setMessage(null);
    try {
      const res = await linkTypoRegistrationAction(typoEmail);
      if (res.success) {
        setMessage({ success: true, text: res.message || "Association réussie !" });
        setTimeout(() => {
          router.push("/app/eleve");
        }, 2000);
      } else {
        setMessage({ success: false, text: res.error || "Une erreur s'est produite." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ success: false, text: "Erreur lors de la communication avec le serveur." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111c29] text-white flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">

      {/* Premium Background Ambient Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#086b51]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#c8a96e]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none">
        <svg className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50,15 L60,40 L85,40 L65,55 L75,80 L50,65 L25,80 L35,55 L15,40 L40,40 Z" />
        </svg>
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Logo/Emblem representation */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#086b51] to-[#064e3b] p-[2px] shadow-xl shadow-[#086b51]/10 flex items-center justify-center border border-white/10">
            <div className="w-full h-full bg-[#111c29]/90 rounded-[1.4rem] flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-[#c8a96e]" />
            </div>
          </div>
        </div>

        {/* Premium Frosted Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-8">
          {/* Top Thin Highlight Border */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8a96e]">
              Contrôle de Sécurité
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Accès Non Autorisé
            </h1>
            <div className="w-16 h-[1px] bg-[#c8a96e]/30 mx-auto my-4" />
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-white/70 font-medium text-left">
            <p className="text-center">
              Assalamou alaykoum. Nous n'avons trouvé **aucune inscription validée** associée à votre adresse email actuelle dans notre registre d'élèves.
            </p>
            <p className="text-xs sm:text-sm bg-white/5 border border-white/5 p-4 rounded-2xl text-left leading-relaxed">
              💡 **Pour accéder à l'école en ligne, vous devez au choix :**<br />
              1. **Avoir acheté et validé** votre formation (Tajwid, Coran, etc.) via notre boutique.<br />
              2. **Être invité par l'administration** (votre dossier doit avoir été saisi manuellement par un secrétaire de l'Institut).
            </p>
          </div>

          {/* Recovery Form */}
          <div className="border-t border-white/10 pt-8 text-left space-y-4">
            <h3 className="text-sm font-black text-[#c8a96e] uppercase tracking-wider">
              Une erreur d'adresse e-mail au paiement ?
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-semibold">
              Si vous avez fait une faute de frappe dans votre adresse e-mail lors de votre paiement, saisissez le mauvais mail utilisé pour lier instantanément votre inscription à ce compte.
            </p>

            <form onSubmit={handleLink} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Adresse e-mail erronée (ex: sofiene@gamil.com)"
                  value={typoEmail}
                  onChange={(e) => setTypoEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs font-semibold focus:outline-none focus:border-[#086b51] transition-all"
                />
              </div>

              {message && (
                <div className={`p-3.5 rounded-xl text-xs font-bold flex items-start gap-2 ${
                  message.success ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {message.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{message.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/15 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Liaison en cours...
                  </>
                ) : (
                  "Lier mon inscription"
                )}
              </button>
            </form>
          </div>

          <div className="pt-6 space-y-4">
            {/* Primary Action - Explore Vitrine / Program catalog */}
            <Link
              href="/"
              className="w-full bg-[#086b51] hover:bg-[#075943] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#086b51]/20 flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <Globe className="w-4 h-4" /> Découvrir nos Formations
            </Link>

            <div className="grid grid-cols-2 gap-4">
              {/* Secondary Action - Sign out and switch Clerk user */}
              <SignOutButton>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-2xl font-black text-[9px] sm:text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Déconnexion
                </button>
              </SignOutButton>

              {/* Secondary Action - Contact Support */}
              <Link
                href="/contact"
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-2xl font-black text-[9px] sm:text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Contacter
              </Link>
            </div>
          </div>

        </div>

        {/* Small branding footer */}
        <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mt-8">
          © {new Date().getFullYear()} ISHES - Institut des Sciences Humaines & Spirituelles
        </p>
      </div>

    </div>
  );
}
