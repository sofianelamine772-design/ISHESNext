import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { FichePratiqueShell } from "@/components/vitrine/FichePratiqueShell";
import { TILAWA_FAQS, TILAWA_RESOURCES, TilawaGuideBody } from "@/components/vitrine/TilawaGuideBody";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
  howToJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Récitation et mémorisation du Coran",
  description:
    "Guide gratuit de Tilawa et de Hifdh : fluidifier sa récitation, réviser le Coran, 12 sourates courtes et 4 fiches PDF. Cours individuels ISHES, 399 €.",
  path: "/fr/guide-tilawa-memorisation-coran",
  keywords: [
    "tilawa",
    "récitation du coran",
    "mémoriser le coran",
    "hifdh",
    "hifz coran",
    "mouraja'a",
    "sourates courtes",
    "améliorer sa récitation",
    "cours de mémorisation du coran",
    "planning mémorisation coran",
    "institut ishes",
  ],
  image: "/images/tilawa_quran.png",
});

export default function GuideTilawaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Fiches pratiques", path: "/fr/fiches-pratiques" },
          { name: "Tilawa et mémorisation", path: "/fr/guide-tilawa-memorisation-coran" },
        ])}
      />
      <JsonLd data={faqJsonLd(TILAWA_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Comment améliorer sa récitation et mémoriser le Coran",
          description:
            "Guide ISHES de Tilawa et de Hifdh : justesse, révision, sourates courtes et fiches gratuites.",
          path: "/fr/guide-tilawa-memorisation-coran",
          image: "/images/tilawa_quran.png",
          dateModified: "2026-10-10",
          keywords: ["tilawa", "hifdh", "mémorisation du coran", "récitation"],
          wordCount: 1600,
          about: ["Tilawa", "Hifdh", "Mémorisation du Coran", "Récitation du Coran"],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment progresser en récitation et en mémorisation du Coran",
          description: "Cinq étapes proposées par l'Institut ISHES pour la Tilawa et le Hifdh.",
          path: "/fr/guide-tilawa-memorisation-coran",
          steps: [
            { name: "Choisir un passage adapté", text: "Un objectif court et régulier, utile à la prière." },
            { name: "Écouter une récitation de référence", text: "Observer l'articulation, les arrêts et les règles." },
            { name: "Lire et répéter avec attention", text: "Privilégier la justesse avant la vitesse." },
            { name: "Faire corriger les erreurs", text: "Un enseignant repère ce que l'oreille seule n'entend pas." },
            { name: "Réviser selon un planning", text: "Distinguer le nouveau, le récent et l'ancien." },
          ],
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Fiches gratuites Tilawa et mémorisation",
          itemListElement: TILAWA_RESOURCES.map((resource, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: resource.title,
            url: absoluteUrl(resource.file),
          })),
        }}
      />

      <FichePratiqueShell
        eyebrow="Guide pédagogique gratuit"
        title={
          <>
            Comment améliorer sa récitation et{" "}
            <span className="text-ishes-gold">mémoriser le Coran ?</span>
          </>
        }
        lead="Tu souhaites réciter avec plus de fluidité, corriger tes erreurs ou mémoriser quelques sourates, voire le Coran entier ? Des conseils pratiques et quatre ressources gratuites pour avancer à ton rythme."
        backHref="/fr/cours-memoriser-coran"
        backLabel="Cours Tilawa et mémorisation"
        primaryCta={{ href: "#ressources", label: "Consulter les ressources gratuites" }}
        secondaryCta={{ href: "/inscription?plan=memoriser_coran&audience=adulte", label: "Découvrir les cours individuels" }}
        readingTime="10 min de lecture"
        toc={[
          { id: "tilawa", label: "La Tilawa" },
          { id: "memorisation", label: "Mémoriser durablement" },
          { id: "methodes", label: "Méthode et 7 conseils" },
          { id: "sourates", label: "Sourates courtes" },
          { id: "ressources", label: "4 fiches gratuites" },
          { id: "cours", label: "Cours individuels" },
        ]}
        related={[
          {
            href: "/fr/cours-memoriser-coran",
            title: "Formation Tilawa et mémorisation",
            desc: "Cours individuels, 4 mois, mercredi 19h30 et dimanche 12h, 399 €.",
          },
          {
            href: "/fr/cours-lecture-tajwid",
            title: "Cours de Tajwid",
            desc: "Pour poser les règles de lecture avant d'intensifier la récitation.",
          },
          {
            href: "/fr/cours-tajwid-intensif",
            title: "Tajwid intensif",
            desc: "Lire le Coran en 3 mois, même en partant de l'alphabet.",
          },
          {
            href: "/fr/fiches-pratiques",
            title: "Toutes les fiches pratiques",
            desc: "Clés du Coran, Sciences du Coran et frise de la Révélation.",
          },
        ]}
      >
        <TilawaGuideBody />
      </FichePratiqueShell>
      <VitrineFaq
        eyebrow="FAQ Tilawa et Hifdh"
        title="Questions fréquentes sur la récitation et la mémorisation"
        items={TILAWA_FAQS}
      />
    </>
  );
}
