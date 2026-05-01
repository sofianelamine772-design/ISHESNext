import { Metadata } from 'next';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
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
      <CourseDetailView course={course} id={id} />
      
      {/* Section Programme Détaillé Supplémentaire */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-ishes-dark mb-4 uppercase tracking-tight">Programme Détaillé</h2>
            <div className="w-20 h-1.5 bg-ishes-green mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedSyllabus.map((section, idx) => (
              <div key={idx} className="bg-[#FAFAFA] rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-xl transition-all group">
                <h3 className="text-xl font-black text-ishes-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-ishes-green text-white flex items-center justify-center text-xs">
                    0{idx + 1}
                  </span>
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-ishes-green shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
