import { Metadata } from 'next';
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { CheckCircle2 } from "lucide-react";

const HADITH_FAQS = [
  {
    question: "Qu'est-ce que la science du hadith ?",
    answer:
      "La science du hadith est la discipline qui étudie la parole du Prophète Muhammad ﷺ : comment elle a été rapportée, enregistrée, classée et authentifiée. Elle répond à une question simple : comment la parole du dernier Messager d'Allah est-elle arrivée jusqu'à nous ? Le cours de sciences du hadith de l'Institut ISHES présente les catégories de hadith et les efforts des savants pour préserver l'authenticité du verbe prophétique.",
  },
  {
    question: "Pourquoi étudier les sciences du hadith en français ?",
    answer:
      "Parce que la Sunnah est, avec le Coran, une source de la pensée et de la législation islamiques, et qu'on la cite souvent sans savoir comment un hadith est jugé authentique, faible ou inventé. Suivre un cours de sciences du hadith en français permet aux francophones de maîtriser la terminologie technique des savants, de comprendre la transmission (isnâd) et de lire les recueils avec méthode plutôt qu'au hasard.",
  },
  {
    question: "Que recouvre le mot Sunnah dans les sciences du hadith ?",
    answer:
      "Comme terme technique, la Sunnah désigne ce qui est rapporté du Prophète ﷺ en trois parties : ses paroles, ses actes avec leurs interprétations, et son approbation tacite, c'est-à-dire ce qu'il a vu faire sans le réprouver. Le cours étudie aussi la définition étymologique du mot, la place de la Sunnah des Compagnons et des gens de la Maison prophétique, et l'enregistrement progressif du hadith.",
  },
  {
    question: "Quel est le rapport entre la Sunnah et le Coran ?",
    answer:
      "La Sunnah explique et précise le Coran de quatre façons principales étudiées dans le cours : elle particularise un énoncé général, restreint un énoncé absolu, explicite un passage global et, dans certains cas, intervient dans les questions d'abrogation. Comprendre ces rapports permet de saisir pourquoi les savants lisent toujours les deux sources ensemble, et comment un hadith éclaire l'application concrète d'un verset.",
  },
  {
    question: "Qu'est-ce que le jarh wa ta'dîl, la critique des rapporteurs ?",
    answer:
      "Le jarh wa ta'dîl est la science qui évalue les rapporteurs de hadith : la « détraction » relève leurs faiblesses, la « défense » établit leur fiabilité. Elle fixe les qualités requises d'un transmetteur, les termes d'accréditation employés par les savants, les moyens par lesquels un rapporteur a reçu le récit, et la méthode pour distinguer les noms homonymes. Le cours montre pourquoi cette science était indispensable pour protéger la parole prophétique.",
  },
  {
    question: "Comment les savants ont-ils classé les hadiths ?",
    answer:
      "Les savants ont classé les hadiths d'abord selon la continuité de la chaîne de transmission : un récit dont la chaîne est interrompue, comme le mursal, n'a pas la même valeur qu'un récit continu. Ils distinguent aussi les récits à source unique et examinent leur validité légale. Le cours explique pourquoi cette classification a été entreprise et comment elle sert à juger la fiabilité d'un hadith.",
  },
  {
    question: "Comment les savants ont-ils lutté contre l'invention de hadiths ?",
    answer:
      "Dès les premières générations, des hadiths ont été inventés pour des motifs politiques, sectaires ou pieux. Les savants ont répondu par l'enregistrement écrit du hadith, l'examen systématique des chaînes de transmission et la critique des rapporteurs. Le cours présente des exemples de hadiths inventés et montre comment les notions d'invention, d'hérésie et d'innovation (bid'ah) ont été définies pour préserver la Sunnah authentique.",
  },
  {
    question: "Que faire quand deux hadiths semblent se contredire ?",
    answer:
      "Les savants ont développé des méthodes de résolution de l'opposition entre récits. Le cours les étudie : définir l'opposition réelle, vérifier si les deux récits sont d'égale valeur, puis appliquer les règles de préférence (tarjîh) ou de conciliation. Ces outils évitent de rejeter un hadith par précipitation et montrent la rigueur avec laquelle la tradition a traité les apparentes contradictions.",
  },
  {
    question: "Le cours de sciences du hadith est-il accessible à un débutant ?",
    answer:
      "Le cours s'adresse à tout étudiant en sciences islamiques désireux de comprendre la transmission de la Sunnah, mais il n'est pas réservé aux spécialistes. Le programme part de la définition de la Sunnah et de ses composantes avant d'aborder la critique des rapporteurs et la classification des récits. Un débutant motivé peut donc le suivre, à condition d'accepter d'apprendre une terminologie technique en français.",
  },
  {
    question: "Comment se déroule le cours de sciences du hadith en ligne et combien coûte-t-il ?",
    answer:
      "La formation en sciences du hadith de l'Institut ISHES dure 10 mois et coûte 349 €. Les cours ont lieu en ligne, en direct sur Zoom, avec un replay vidéo disponible pour chaque séance, et un groupe WhatsApp de classe assure le suivi pédagogique. Le programme académique est complet et structuré, de la définition de la Sunnah jusqu'à la résolution des oppositions entre récits.",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/cours-sciences-hadith") },
  openGraph: {
    url: absoluteUrl("/fr/cours-sciences-hadith"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cours de Sciences du Hadith | Authenticité | ISHES",
  description: "Découvrez comment la parole du Prophète ﷺ a été préservée. Un cursus approfondi sur l'authentification et la transmission des hadiths.",
  keywords: "sciences du hadith, authentification hadith, sunnah, cours islam académique, ishes"
};

export default function CoursSciencesHadithPage() {
  const id = "sciences_hadith";
  const course = PROGRAMS_DATA[id];
  
  const detailedSyllabus = [
    {
      title: "La Sunnah du Prophète (ﷺ)",
      points: ["La définition de la Sunnah", "Le mot Sunnah, comme terme technique"]
    },
    {
      title: "Les parties de la Sunnah",
      points: ["Les paroles du Prophète (ﷺ)", "Les actes du Prophète (ﷺ), leurs interprétations", "L'approbation tacite du Prophète (ﷺ)"]
    },
    {
      title: "Signification & Législation",
      points: [
        "Le mot (signifiant) et les cas de signification",
        "La Sunnah : une source de la pensée et de la législation",
        "La Sunnah des Compagnons (رضي الله عنه)",
        "La Sunnah d'Ahl-ul-bayt (رضي الله عنه)",
        "L'invention des hadiths, quelques exemples",
        "L'enregistrement du hadith",
        "L'invention, l'hérésie, l'innovation al bid'ah"
      ]
    },
    {
      title: "Rapport entre Sunnah et Coran",
      points: ["Particularisation du général", "Restriction de l'absolu", "Explication du global", "Abrogation"]
    },
    {
      title: "Science du rapporteur (Jarh wa Ta'dil)",
      points: [
        "Le besoin d'une science du rapporteur de hadith",
        "Les qualités d’un rapporteur du hadith",
        "La détraction et la défense (al jahr wal ta'dil)",
        "L'interprétation de l'acceptabilité de l'opinion",
        "Les termes qualificatifs de l'accréditation",
        "Les moyens d'accès du rapporteur au récit",
        "Méthode de distinction des noms homonymes"
      ]
    },
    {
      title: "Voies et Divisions",
      points: [
        "Les voies menant vers la Sunnah",
        "La division du hadith",
        "Arguments de la validité légale de l'énoncé informatif",
        "Les divisions de l’énoncé à source unique"
      ]
    },
    {
      title: "Classification & Opposition",
      points: [
        "Pourquoi a-t-on procédé à la classification",
        "Classification selon la continuité de la chaine",
        "Les catégories du récit (morsal)",
        "L'opposition entre les récits et théories de solution",
        "Définition de l'opposition, égalité et préférence",
        "Résolution de l'opposition"
      ]
    }
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(HADITH_FAQS)} />
      <CourseDetailView course={course} id={id} />

      {/* Section Programme Détaillé Supplémentaire */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-ishes-blue mb-4 uppercase tracking-tight">Programme Détaillé</h2>
            <div className="w-20 h-1.5 bg-ishes-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedSyllabus.map((section, idx) => (
              <div key={idx} className="bg-[#FAFAFA] rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-xl transition-all group">
                <h3 className="text-xl font-black text-ishes-blue mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-ishes-blue text-white flex items-center justify-center text-xs">
                    0{idx + 1}
                  </span>
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-ishes-blue shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ Sciences du Hadith"
        title="Questions fréquentes sur les sciences du hadith"
        intro="Sunnah, chaîne de transmission, critique des rapporteurs, classification des récits : l'essentiel à savoir avant de suivre un cours de sciences du hadith en ligne, en français."
        items={HADITH_FAQS}
      />
    </>
  );
}
