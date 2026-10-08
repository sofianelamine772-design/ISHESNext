import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ScrollText,
  GraduationCap,
  Download,
  Sparkles,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  absoluteUrl,
} from "@/lib/seo";

const FICHES = [
  {
    href: "/fr/les-cles-du-coran",
    title: "Les Clés du Coran — Volume 1 & 2",
    desc: "Méthode Tajwid francophone ISHES : tahajjî, fondations de lecture, règles de récitation et poème didactique. Alternative pédagogique à Nour Al Bayan.",
    tag: "Tajwid · Méthode",
    pdf: "/fiches-pratiques/les-cles-du-coran.pdf",
    icon: BookOpen,
    image: "/images/quran-coffee.png",
    keywords: "clés du coran, tajwid français",
  },
  {
    href: "/fr/cours-sciences-coran/guide",
    title: "Guide complet — Sciences du Coran",
    desc: "‘Ulûm al-Qur'ân : Révélation, Compagnons, collecte, disciplines coraniques, manuscrits de Birmingham et Sanaa, miracle du Coran.",
    tag: "Sciences du Coran",
    pdf: "/fiches-pratiques/guide-sciences-du-coran.pdf",
    icon: BookOpen,
    image: "/images/formations/sc-du-coran-dsita-1.png",
    keywords: "sciences du coran, ulum al quran",
  },
  {
    href: "/fr/cours-sciences-coran/frise-chronologique",
    title: "Frise chronologique de la Révélation",
    desc: "De 610 à la codification de l'arabe : période mecquoise et médinoise, califats d'Abû Bakr et ‘Uthmân, vocalisation, qirâ'ât.",
    tag: "Chronologie · Histoire",
    pdf: "/fiches-pratiques/frise-chronologique-revelation.pdf",
    icon: ScrollText,
    image: "/images/formations/sc-du-coran-distance-2.jpg",
    keywords: "frise révélation coran",
  },
  {
    href: "/fr/cours-lecture-tajwid",
    title: "Cours de Tajwid en ligne (formation)",
    desc: "Parcours progressif annuel avec Les Clés du Coran Vol. 1 & 2, cours en direct, replays et enseignant — 649 €.",
    tag: "Formation · 649 €",
    pdf: "/fiches-pratiques/cours-tajwid.pdf",
    icon: GraduationCap,
    image: "/images/tajwid_book.png",
    keywords: "cours tajwid en ligne",
  },
];

const FAQS = [
  {
    question: "Que trouve-t-on dans les fiches pratiques ISHES ?",
    answer:
      "Des guides pédagogiques gratuits en texte libre : Les Clés du Coran (méthode Tajwid), le guide des Sciences du Coran, et une frise chronologique de la Révélation. Chaque fiche est lisible en ligne pour le référencement et téléchargeable en PDF.",
  },
  {
    question: "Les fiches remplacent-elles les cours ?",
    answer:
      "Non. Elles introduisent et structurent. Les formations ISHES apportent l'enseignant, la correction orale, les replays et la progression diplômante (Tajwid, Sciences du Coran, etc.).",
  },
  {
    question: "Pour qui sont ces ressources ?",
    answer:
      "Débutants francophones, parents, étudiants en sciences islamiques, futurs enseignants — toute personne qui veut comprendre la lecture du Coran ou l'histoire de sa transmission avec une pédagogie claire.",
  },
];

export const metadata = buildPageMetadata({
  title: "Fiches pratiques gratuites : Tajwid & Sciences du Coran",
  description:
    "Ressources pédagogiques ISHES gratuites : guide Les Clés du Coran, Sciences du Coran (‘Ulûm al-Qur'ân), frise chronologique de la Révélation. Lire en ligne ou PDF — apprendre le Coran en français.",
  path: "/fr/fiches-pratiques",
  keywords: [
    "fiches pratiques coran",
    "ressources pédagogiques islam gratuites",
    "les clés du coran gratuit",
    "guide sciences du coran",
    "frise chronologique révélation",
    "apprendre tajwid francophone",
    "ulum al quran français",
    "méthode lecture coran français",
    "ishes fiches",
  ],
});

export default function FichesPratiquesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Fiches pratiques", path: "/fr/fiches-pratiques" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Fiches pratiques ISHES — Tajwid & Sciences du Coran",
          description:
            "Ressources pédagogiques gratuites sur le Tajwid et les Sciences du Coran.",
          url: absoluteUrl("/fr/fiches-pratiques"),
          isPartOf: { "@type": "WebSite", name: "Institut ISHES", url: "https://www.ishes.fr" },
          about: [
            { "@type": "Thing", name: "Tajwid" },
            { "@type": "Thing", name: "Sciences du Coran" },
            { "@type": "Thing", name: "Lecture du Coran" },
          ],
          hasPart: FICHES.map((f) => ({
            "@type": "LearningResource",
            name: f.title,
            url: absoluteUrl(f.href),
            description: f.desc,
            isAccessibleForFree: true,
            inLanguage: "fr-FR",
          })),
        }}
      />

      <div className="min-h-screen bg-[#f7f4ef] font-sans">
        {/* Hero */}
        <header className="relative pt-28 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,#1a3d36_0%,#0f2924_50%,#0a1f1b_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8a063' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
            aria-hidden
          />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#f7f4ef] to-transparent" aria-hidden />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-ishes-gold" />
              <p className="text-ishes-gold font-black text-[11px] uppercase tracking-[0.28em]">
                Ressources pédagogiques gratuites
              </p>
            </div>
            <h1 className="ishes-heading text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.08] tracking-tight max-w-4xl mb-6">
              Fiches pratiques{" "}
              <span className="text-ishes-gold">ISHES</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-3xl mb-4">
              Guides en texte libre pour apprendre le <strong className="text-white">Tajwid</strong>{" "}
              avec <strong className="text-white">Les Clés du Coran</strong>, comprendre les{" "}
              <strong className="text-white">Sciences du Coran</strong> et situer la{" "}
              <strong className="text-white">Révélation</strong> dans l&apos;histoire — indexables
              par Google, téléchargeables en PDF.
            </p>
            <p className="text-sm text-white/50 font-medium max-w-2xl">
              Contenu pédagogique de l&apos;Institut ISHES (Toulouse &amp; distanciel) — pour
              débutants francophones, parents et étudiants.
            </p>
          </div>
        </header>

        {/* Intro SEO */}
        <section className="max-w-6xl mx-auto px-6 -mt-6 relative z-10 mb-14">
          <div className="bg-white border border-[#e6d5b8]/40 rounded-[2rem] p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-black text-ishes-blue mb-4">
              Apprendre le Coran en français : méthode, histoire et transmission
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                Ces fiches pratiques regroupent le savoir pédagogique de l&apos;
                <Link href="/institut" className="text-ishes-gold font-bold hover:underline">
                  Institut ISHES
                </Link>{" "}
                : comment lire le Coran avec justesse grâce à{" "}
                <Link href="/fr/les-cles-du-coran" className="text-ishes-gold font-bold hover:underline">
                  Les Clés du Coran
                </Link>
                , comment le Coran a été révélé et transmis (
                <Link
                  href="/fr/cours-sciences-coran/guide"
                  className="text-ishes-gold font-bold hover:underline"
                >
                  Sciences du Coran
                </Link>
                ), et comment situer les grandes étapes de la Révélation sur une{" "}
                <Link
                  href="/fr/cours-sciences-coran/frise-chronologique"
                  className="text-ishes-gold font-bold hover:underline"
                >
                  frise chronologique
                </Link>
                .
              </p>
              <p>
                Chaque page est rédigée pour être <strong>lisible, partageable et référencée</strong>{" "}
                : titres clairs, sommaire, FAQ, liens vers les formations Tajwid et Sciences du
                Coran. L&apos;objectif : devenir la référence francophone pour ces sujets — puis
                passer de la fiche au cursus avec un enseignant.
              </p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-8" aria-labelledby="liste-fiches">
          <h2 id="liste-fiches" className="sr-only">
            Liste des fiches pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FICHES.map((fiche) => (
              <article
                key={fiche.href}
                className="group bg-white border border-[#e6d5b8]/40 rounded-[1.75rem] overflow-hidden shadow-sm hover:shadow-lg hover:border-ishes-gold/40 transition-all flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={fiche.image}
                    alt={`${fiche.title} — fiche pratique Institut ISHES`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2924]/80 via-[#0f2924]/20 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[10px] font-black uppercase tracking-[0.2em] text-ishes-gold">
                    {fiche.tag}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <fiche.icon className="w-5 h-5 text-ishes-gold" />
                    <h2 className="text-xl font-black text-ishes-blue leading-snug group-hover:text-ishes-gold transition-colors">
                      <Link href={fiche.href}>{fiche.title}</Link>
                    </h2>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed text-sm flex-1 mb-6">
                    {fiche.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={fiche.href}
                      className="inline-flex items-center gap-2 bg-ishes-gold hover:bg-[#b8924f] text-white px-5 py-3 rounded-xl text-sm font-black transition-all"
                    >
                      Lire en ligne <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={fiche.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[#e6d5b8] text-ishes-blue px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#f5efe4]"
                    >
                      <Download className="w-4 h-4 text-ishes-gold" />
                      PDF
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <div className="bg-[radial-gradient(ellipse_at_top_right,#1a3d36,#0f2924)] rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">
                De la fiche au cursus
              </h2>
              <p className="text-white/75 font-medium max-w-xl leading-relaxed">
                Les fiches introduisent. Les cours ISHES apportent l&apos;enseignant, la correction
                et la progression structurée — en ligne ou à Toulouse.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/fr/cours-lecture-tajwid"
                className="inline-flex items-center justify-center gap-2 bg-ishes-gold text-white px-6 py-3.5 rounded-xl text-sm font-black"
              >
                Cours Tajwid
              </Link>
              <Link
                href="/fr/cours-sciences-coran"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-white/5"
              >
                Sciences du Coran
              </Link>
            </div>
          </div>
        </section>

        <VitrineFaq
          eyebrow="FAQ Ressources"
          title="Questions sur les fiches pratiques ISHES"
          items={FAQS}
        />
      </div>
    </>
  );
}
