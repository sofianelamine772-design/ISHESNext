import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CIVILISATION_PATH,
  CIVILISATION_SAVANTS,
  savantPath,
} from "@/lib/civilisation-savants";
import { CivilisationCtas } from "@/components/vitrine/CivilisationCtas";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { breadcrumbJsonLd, buildPageMetadata, faqJsonLd, SITE_URL } from "@/lib/seo";

const SAVANTS_FAQS = [
  {
    question: "Pourquoi étudier les biographies des grands savants de l’islam ?",
    answer:
      "Parce qu’une biographie montre une civilisation en acte : une ville, une bibliothèque, un hôpital, un calife qui finance le savoir, des traductions qui circulent. Étudier Al-Khwārizmī, Avicenne ou Ibn Khaldūn permet de voir que la civilisation arabo-musulmane a transformé le savoir et ne l’a pas seulement conservé. Les mini-biographies ISHES replacent chaque savant dans son siècle, loin des slogans, et préparent au cours en ligne.",
  },
  {
    question: "Quels savants musulmans ont marqué l’histoire de la médecine ?",
    answer:
      "Trois figures forment un réseau médical : Al-Rāzī (Rhazès), clinicien des hôpitaux de Rayy et de Bagdad, qui distingue la variole de la rougeole ; Ibn Sīnā (Avicenne), dont le Canon de la médecine reste un manuel des facultés européennes jusqu’aux XVIe–XVIIe siècles ; et Al-Zahrāwī (Abulcasis), chirurgien de Cordoue, auteur du Kitāb al-Tasrīf et de ses planches de plus de deux cents instruments.",
  },
  {
    question: "Quels savants musulmans ont contribué aux mathématiques et à l’astronomie ?",
    answer:
      "Al-Khwārizmī, à la Maison de la Sagesse de Bagdad, systématise l’algèbre et diffuse le calcul indien et le zéro, qui passeront en Europe via Fibonacci et les marchands italiens. Al-Bīrūnī, savant du Khwārazm, conçoit des méthodes pour estimer le rayon terrestre et affine les coordonnées géographiques. Ibn al-Haytham, en optique, articule hypothèse, expérience et contrôle, préfigurant la méthode scientifique.",
  },
  {
    question: "Pourquoi les savants musulmans portent-ils des noms latins comme Avicenne, Averroès ou Alhazen ?",
    answer:
      "Parce que leurs œuvres ont été traduites en latin au Moyen Âge et enseignées dans les universités d’Europe sous une forme latinisée : Ibn Sīnā est devenu Avicenne, Ibn Rushd Averroès, Ibn al-Haytham Alhazen, Al-Zahrāwī Abulcasis, Al-Rāzī Rhazès et Al-Khwārizmī Algoritmi, qui a donné le mot algorithme. Ces doubles noms témoignent de la transmission des savoirs du monde musulman vers l’Occident.",
  },
  {
    question: "Les savants de l’âge d’or de l’islam étaient-ils tous arabes ?",
    answer:
      "Non. Al-Khwārizmī et Al-Bīrūnī viennent du Khwārazm, en Asie centrale ; Ibn Sīnā naît près de Boukhara, dans un monde persan ; Al-Rāzī est de Rayy, en Iran actuel ; Ibn Rushd, Al-Zahrāwī, Al-Idrīsī et Ibn Khaldūn sont d’al-Andalus, du Maghreb ou de Ceuta et Tunis. Tous écrivent en arabe savant, mais la civilisation arabo-musulmane est faite de Persans, de Berbères, de Turcs et d’Andalous.",
  },
  {
    question: "Quels grands savants sont nés en Andalousie ou au Maghreb ?",
    answer:
      "Cordoue a donné Ibn Rushd (Averroès), cadi mâlikite, médecin et commentateur d’Aristote, et Al-Zahrāwī (Abulcasis), chirurgien de Madinat al-Zahrāʾ. Al-Idrīsī, né à Ceuta, a composé sa Tabula Rogeriana à Palerme pour Roger II de Sicile. Ibn Khaldūn, né à Tunis d’une famille andalouse, a écrit la Muqaddima entre Fès, Grenade et Le Caire. L’Occident musulman est un foyer majeur de l’âge d’or.",
  },
  {
    question: "Les savants musulmans étaient-ils aussi des savants en sciences religieuses ?",
    answer:
      "Souvent, oui. Ibn Rushd était cadi et faqīh mâlikite, auteur du Bidāyat al-mujtahid, tout en commentant Aristote. Ibn Khaldūn était juge et ʿālim maghrébin avant d’être l’historien de la Muqaddima. Ibn Sīnā a étudié très tôt le fiqh et la logique. Science, droit et foi cohabitaient dans un même parcours, ce que le cours de civilisation arabo-musulmane ISHES relie au fiqh mâlikite enseigné à l’institut.",
  },
  {
    question: "Quelle période couvrent les biographies de savants proposées par ISHES ?",
    answer:
      "Du VIIIe au XVe siècle : d’Al-Khwārizmī (vers 780 – vers 850) à Ibn Khaldūn (1332–1406), en passant par Al-Rāzī, Al-Zahrāwī, Ibn Sīnā, Ibn al-Haytham et Al-Bīrūnī aux Xe–XIe siècles, puis Al-Idrīsī et Ibn Rushd au XIIe siècle. Neuf fiches couvrent ainsi l’âge d’or abbasside, l’apogée d’al-Andalus et les grandes dynasties, soit l’essentiel des périodes étudiées dans le cours.",
  },
  {
    question: "Comment ces biographies sont-elles utilisées dans le cours de civilisation arabo-musulmane ?",
    answer:
      "Chaque savant illustre une étape ou un thème du cours : Al-Khwārizmī pour Bagdad et la Maison de la Sagesse, Ibn Sīnā et Al-Rāzī pour les hôpitaux, Ibn al-Haytham pour la méthode scientifique, Al-Idrīsī pour les réseaux d’échanges, Averroès et Ibn Khaldūn pour l’héritage maghrébin et andalou. Les fiches se lisent gratuitement en ligne et mènent à la formation ISHES, en direct le mercredi soir à partir de janvier 2027.",
  },
];

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
      <JsonLd data={faqJsonLd(SAVANTS_FAQS)} />
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

        <VitrineFaq
          eyebrow="FAQ savants de l’islam"
          title="Grands savants de la civilisation arabo-musulmane : qui, où, pourquoi les étudier"
          intro="Médecine, mathématiques, optique, histoire, cartographie : les réponses sur les savants musulmans de l’âge d’or et leurs biographies ISHES."
          items={SAVANTS_FAQS}
        />

        <CivilisationCtas />
      </div>
    </div>
  );
}
