import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import type { ReactNode } from "react";

export type FicheTocItem = { id: string; label: string };

export type FicheRelatedLink = {
  href: string;
  title: string;
  desc: string;
};

type FichePratiqueShellProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  backHref: string;
  backLabel: string;
  pdfHref?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  toc: FicheTocItem[];
  related: FicheRelatedLink[];
  readingTime?: string;
  updatedLabel?: string;
  children: ReactNode;
  asideExtra?: ReactNode;
};

/**
 * Coquille visuelle + SEO structurelle pour les fiches pratiques :
 * hero, Sommaire ancré, contenu, maillage interne, CTA.
 */
export function FichePratiqueShell({
  eyebrow,
  title,
  lead,
  backHref,
  backLabel,
  pdfHref,
  primaryCta,
  secondaryCta,
  toc,
  related,
  readingTime = "8 min de lecture",
  updatedLabel = "Mis à jour — octobre 2026",
  children,
  asideExtra,
}: FichePratiqueShellProps) {
  return (
    <div className="min-h-screen bg-[#f7f4ef] font-sans selection:bg-ishes-gold/30 selection:text-ishes-blue">
      {/* Atmosphere hero */}
      <header className="relative pt-28 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#1a3d36_0%,#0f2924_45%,#0a1f1b_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a063' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f7f4ef] to-transparent"
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <nav aria-label="Fil d'Ariane" className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <Link
              href={backHref}
              className="inline-flex items-center text-white/75 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Link>
            <span className="text-white/30">/</span>
            <Link
              href="/fr/fiches-pratiques"
              className="text-white/60 hover:text-white transition-colors font-medium"
            >
              Fiches pratiques
            </Link>
          </nav>

          <p className="text-ishes-gold font-black text-[11px] md:text-xs uppercase tracking-[0.28em] mb-5">
            {eyebrow}
          </p>
          <h1 className="ishes-heading text-4xl sm:text-5xl md:text-[3.4rem] font-black text-white leading-[1.08] tracking-tight max-w-4xl mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-3xl mb-8">
            {lead}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-wider text-white/45 mb-10">
            <span>{readingTime}</span>
            <span className="w-1 h-1 rounded-full bg-ishes-gold/60" aria-hidden />
            <span>{updatedLabel}</span>
            <span className="w-1 h-1 rounded-full bg-ishes-gold/60" aria-hidden />
            <span>Ressource gratuite</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 bg-ishes-gold hover:bg-[#b8924f] text-white px-6 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-ishes-gold/25 transition-all hover:-translate-y-0.5"
              >
                {primaryCta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-white/5"
              >
                {secondaryCta.label}
              </Link>
            )}
            {pdfHref && (
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white/90 px-5 py-3.5 rounded-xl text-sm font-bold hover:bg-white/5 transition-all"
              >
                <Download className="w-4 h-4 text-ishes-gold" />
                PDF
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-20 -mt-4 relative z-10">
        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-10 xl:gap-14">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <nav
                aria-label="Sommaire"
                className="bg-white/90 backdrop-blur border border-[#e6d5b8]/50 rounded-2xl p-5 shadow-sm"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ishes-gold mb-4">
                  Sommaire
                </p>
                <ol className="space-y-1">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex gap-3 py-2 text-[13px] font-bold text-ishes-dark/70 hover:text-ishes-blue transition-colors"
                      >
                        <span className="text-ishes-gold/70 font-black tabular-nums w-5 shrink-0 group-hover:text-ishes-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              {asideExtra}
            </div>
          </aside>

          {/* Mobile TOC */}
          <details className="lg:hidden bg-white border border-[#e6d5b8]/50 rounded-2xl p-4 mb-2 open:shadow-sm">
            <summary className="cursor-pointer font-black text-ishes-blue text-sm list-none flex justify-between items-center [&::-webkit-details-marker]:hidden">
              Sommaire de la fiche
              <span className="text-ishes-gold text-lg leading-none">+</span>
            </summary>
            <ol className="mt-4 space-y-2 border-t border-[#e6d5b8]/40 pt-4">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex gap-2 text-sm font-bold text-ishes-dark/80"
                  >
                    <span className="text-ishes-gold">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <div className="min-w-0 space-y-10">
            <article className="bg-white border border-[#e6d5b8]/40 rounded-[1.75rem] md:rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_-40px_rgba(16,40,34,0.35)]">
              <div className="fiche-prose space-y-12 md:space-y-14">{children}</div>
            </article>

            {/* Related / maillage */}
            <section aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-xl font-black text-ishes-blue mb-5 flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-ishes-gold" />
                Pour aller plus loin
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group bg-white border border-[#e6d5b8]/40 hover:border-ishes-gold/50 rounded-2xl p-5 transition-all hover:shadow-md"
                  >
                    <h3 className="font-black text-ishes-blue group-hover:text-ishes-gold transition-colors mb-1.5 flex items-center gap-2">
                      {link.title}
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bloc de titre de section ancré (H2 SEO). */
export function FicheSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="ishes-heading text-2xl md:text-3xl font-black text-ishes-blue leading-tight mb-5 md:mb-6 pb-3 border-b border-[#e6d5b8]/50">
        {title}
      </h2>
      <div className="space-y-4 text-[16.5px] md:text-[17.5px] text-gray-700 font-medium leading-[1.75]">
        {children}
      </div>
    </section>
  );
}

export function FicheCallout({
  children,
  variant = "gold",
}: {
  children: ReactNode;
  variant?: "gold" | "blue";
}) {
  const styles =
    variant === "gold"
      ? "bg-[#faf6ef] border-ishes-gold/40 text-ishes-dark"
      : "bg-[#0f2924]/[0.04] border-ishes-blue/20 text-ishes-blue";
  return (
    <aside
      className={`border-l-4 rounded-r-2xl px-5 py-4 my-2 font-bold leading-relaxed ${styles}`}
    >
      {children}
    </aside>
  );
}
