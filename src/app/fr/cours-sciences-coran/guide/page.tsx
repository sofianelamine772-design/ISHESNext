import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { FichePratiqueShell } from "@/components/vitrine/FichePratiqueShell";
import {
  SciencesDuCoranGuideArticle,
  SCIENCES_GUIDE_FAQS,
  SCIENCES_GUIDE_TOC,
} from "@/components/vitrine/SciencesDuCoranGuideArticle";
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Les Sciences du Coran : la fascinante histoire du Livre d'ALLAH | Institut ISHES",
  description:
    "Guide pédagogique gratuit : Révélation, mission prophétique, Compagnons, préservation, manuscrits (Birmingham, Sanaa) et miracle du Coran. Introduction ‘Ulûm al-Qur'ân — ISHES.",
  path: "/fr/cours-sciences-coran/guide",
  keywords: [
    "sciences du coran",
    "ulum al quran",
    "histoire de la révélation",
    "histoire du livre d'allah",
    "transmission du coran",
    "manuscrit birmingham coran",
    "palimpseste sanaa",
    "codex parisino-petropolitanus",
    "asbab an nuzul",
    "qiraat coran",
    "ijaz al quran",
    "makki madani",
    "collecte coran uthman",
    "guide sciences du coran gratuit",
  ],
  type: "article",
  image: "/images/formations/sc-du-coran-dsita-1.png",
});

export default function GuideSciencesCoranPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Sciences du Coran", path: "/fr/cours-sciences-coran" },
          { name: "Guide pédagogique", path: "/fr/cours-sciences-coran/guide" },
        ])}
      />
      <JsonLd data={faqJsonLd(SCIENCES_GUIDE_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Les Sciences du Coran : la fascinante histoire du Livre d'ALLAH",
          description:
            "Guide pédagogique gratuit sur la révélation, la transmission, les manuscrits et les disciplines des ‘Ulûm al-Qur'ân.",
          path: "/fr/cours-sciences-coran/guide",
          image: "/images/formations/sc-du-coran-dsita-1.png",
          keywords: [
            "Sciences du Coran",
            "Ulum al-Quran",
            "Révélation",
            "Manuscrits coraniques",
          ],
          wordCount: 4200,
          about: [
            "Sciences du Coran",
            "Histoire de l'islam",
            "Transmission du Coran",
          ],
        })}
      />

      <FichePratiqueShell
        eyebrow="Fiche pratique · Sciences du Coran"
        title={
          <>
            Les Sciences du Coran :{" "}
            <span className="text-ishes-gold">la fascinante histoire du Livre d&apos;ALLAH</span>
          </>
        }
        lead="Guide pédagogique gratuit : Révélation, mission prophétique, Compagnons, préservation, manuscrits et miracle du Coran."
        backHref="/fr/cours-sciences-coran"
        backLabel="Cours Sciences du Coran"
        pdfHref="/fiches-pratiques/guide-sciences-du-coran.pdf"
        primaryCta={{
          href: "/inscription?plan=sciences_du_coran&audience=adulte",
          label: "Formation 4 mois — 399 €",
        }}
        secondaryCta={{
          href: "/fr/cours-sciences-coran/frise-chronologique",
          label: "Voir la frise",
        }}
        toc={SCIENCES_GUIDE_TOC}
        readingTime="18 min de lecture"
        related={[
          {
            href: "/fr/cours-sciences-coran",
            title: "Cours Sciences du Coran",
            desc: "Formation diplômante en ligne — 4 mois, 399 €.",
          },
          {
            href: "/fr/cours-sciences-coran/frise-chronologique",
            title: "Frise chronologique",
            desc: "De la Révélation à la codification de l'arabe.",
          },
          {
            href: "/fr/cours-as-sirah",
            title: "Cours de Sîrah",
            desc: "La biographie prophétique éclaire les versets.",
          },
          {
            href: "/fr/les-cles-du-coran",
            title: "Les Clés du Coran",
            desc: "Méthode pour lire et réciter correctement.",
          },
        ]}
      >
        <SciencesDuCoranGuideArticle />
      </FichePratiqueShell>

      <VitrineFaq
        eyebrow="FAQ Sciences du Coran"
        title="Questions fréquentes sur ce guide"
        items={SCIENCES_GUIDE_FAQS}
      />
    </>
  );
}
