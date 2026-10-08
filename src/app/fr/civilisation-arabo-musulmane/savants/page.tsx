import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CIVILISATION_PATH,
  CIVILISATION_SAVANTS,
  savantPath,
} from "@/lib/civilisation-savants";
import { CivilisationCtas } from "@/components/vitrine/CivilisationCtas";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Savants de la civilisation arabo-musulmane | Biographies ISHES",
  description:
    "Mini-biographies : Al-Khwārizmī, Ibn Sīnā, Al-Rāzī, Ibn al-Haytham, Al-Bīrūnī, Ibn Khaldūn, Al-Idrīsī, Ibn Rushd, Al-Zahrāwī. Âge d'or, sciences et héritage.",
  path: `${CIVILISATION_PATH}/savants`,
  keywords: [
    "savants musulmans",
    "âge d'or islam",
    "avicenne",
    "averroes",
    "al khwarizmi",
    "ibn khaldun",
    "civilisation arabo-musulmane",
  ],
});

export default function SavantsIndexPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-24 px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Civilisation arabo-musulmane", path: CIVILISATION_PATH },
          { name: "Savants", path: `${CIVILISATION_PATH}/savants` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Savants de la civilisation arabo-musulmane",
          url: `${SITE_URL}${CIVILISATION_PATH}/savants`,
          hasPart: CIVILISATION_SAVANTS.map((s) => ({
            "@type": "Person",
            name: s.name,
            url: `${SITE_URL}${savantPath(s.slug)}`,
          })),
        }}
      />

      <div className="max-w-5xl mx-auto">
        <Link
          href={CIVILISATION_PATH}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-ishes-blue mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la formation
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-ishes-blue mb-4">
          Savants de la civilisation arabo-musulmane
        </h1>
        <p className="text-lg text-gray-600 font-medium max-w-3xl mb-12 leading-relaxed">
          Mathématiques, médecine, optique, histoire, cartographie, philosophie, chirurgie :
          ces figures ont marqué l&apos;humanité. Chaque fiche mène à la formation ISHES et au
          contact de l&apos;institut.
        </p>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {CIVILISATION_SAVANTS.map((s) => (
            <li key={s.slug}>
              <Link
                href={savantPath(s.slug)}
                className="block h-full bg-white rounded-2xl border border-gray-100 p-6 hover:border-ishes-gold/40 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-black text-ishes-blue">{s.name}</h2>
                {s.latinName ? (
                  <p className="text-ishes-gold font-bold text-sm">{s.latinName}</p>
                ) : null}
                <p className="text-xs text-gray-400 font-bold mt-1">{s.dates}</p>
                <p className="text-sm text-gray-600 font-medium mt-3 leading-relaxed">
                  {s.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <CivilisationCtas />
      </div>
    </div>
  );
}
