import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  Monitor,
  Gift,
  BookOpen,
  Hourglass,
  Rocket,
  CheckCircle2,
  Book,
  PlayCircle,
  Mic,
  PenTool,
  Users,
  ClipboardCheck,
  Mail,
  Upload,
  ShieldCheck,
  UserCheck,
  Lock,
  CreditCard,
  Heart,
  ArrowRight,
  Droplet,
  Landmark,
  HandCoins,
  Moon,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { buildPageMetadata, courseJsonLd, breadcrumbJsonLd, faqJsonLd, articleJsonLd, howToJsonLd } from "@/lib/seo";

const FIQH_FAQS = [
  {
    question: "Qu'est-ce que le Fiqh mâlikite ?",
    answer:
      "Le Fiqh mâlikite (ou madhhab malikite) est l'une des quatre écoles de jurisprudence sunnite, fondée par l'imam Mâlik ibn Anas (médine). Il encadre les actes d'adoration et la vie quotidienne. Au Maghreb, en Afrique de l'Ouest et dans une grande partie de la francophonie, c'est l'école de référence. Le cours ISHES s'appuie sur Al-Murshid al-Mu'în (Matn Ibn Âchir).",
  },
  {
    question: "Pourquoi suivre un cours de Fiqh mâlikite en français ?",
    answer:
      "Beaucoup de musulmans francophones prient et jeûnent sans connaître les règles qui valident ou invalident l'adoration. Un cours de Fiqh mâlikite en ligne, en français, permet d'apprendre le wudu, la prière, la zakat, le jeûne et le hajj selon l'école malikite, avec des exemples concrets.",
  },
  {
    question: "Le cours de Fiqh mâlikite est-il adapté aux débutants ?",
    answer:
      "Oui. Aucune formation préalable en sciences islamiques n'est exigée. Le parcours commence par les adab de l'étudiant et une introduction aux écoles juridiques, puis entre dans le fiqh des adorations (ibâdât).",
  },
  {
    question: "Qui est Ibn Âchir et pourquoi étudier Al-Murshid al-Mu'în ?",
    answer:
      "L'imam Abd al-Wahid Ibn Âchir (Fès, 1582–1631) a composé Al-Murshid al-Mu'în, un poème enseigné depuis des siècles au Maghreb. Il condense le fiqh malikite des adorations, l'aqîda ash'arite et la spiritualité. C'est le texte de référence du cours ISHES.",
  },
  {
    question: "Quelle est la différence entre le fiqh malikite et les autres écoles ?",
    answer:
      "Les quatre écoles sunnites (hanafite, malikite, chaféite, hanbalite) sont valides. L'école malikite se distingue notamment par l'importance de la pratique des gens de Médine ('amal ahl al-Madîna) et par sa diffusion au Maghreb. Le cours ISHES enseigne exclusivement le madhhab malikite, sans polémique.",
  },
  {
    question: "Comment se déroule le cours de Fiqh mâlikite en ligne ?",
    answer:
      "Formation de 4 mois, un cours par semaine en direct, replays, supports PDF, exercices et diplôme ISHES. Inscription en ligne. Paiement en plusieurs fois possible. Idéal depuis la France, la Belgique, la Suisse, le Maghreb ou le Canada.",
  },
  {
    question: "Le fiqh malikite concerne-t-il seulement la prière ?",
    answer:
      "Non. Le programme couvre la purification (tahâra, wudu, ghusl, tayammum), la prière (salât), la zakat, le jeûne du Ramadan et les règles de la 'umra et du hajj, plus une introduction aux usûl al-fiqh.",
  },
  {
    question: "Puis-je étudier le Fiqh mâlikite si je vis loin de Toulouse ?",
    answer:
      "Oui. Le cours est 100 % à distance. L'Institut ISHES est à Toulouse pour le présentiel d'autres formations, mais le Fiqh mâlikite se suit en ligne, partout dans le monde francophone.",
  },
];

export const metadata = buildPageMetadata({
  title: "Cours de Fiqh Mâlikite en ligne — Ibn Âchir | Droit musulman",
  description:
    "Cours de Fiqh mâlikite en français : école de l'imam Mâlik, Matn Ibn Âchir (Al-Murshid al-Mu'în). Purification, prière, zakat, jeûne et hajj. Formation en ligne 4 mois, Institut ISHES.",
  path: "/fr/cours-fiqh-malikite",
  keywords: [
    "fiqh malikite",
    "cours fiqh malikite",
    "fiqh mâlikite en ligne",
    "fiqh malikite en français",
    "école malikite",
    "madhhab malik",
    "imam malik",
    "droit musulman malikite",
    "jurisprudence islamique malikite",
    "ibn achir",
    "ibn ashir",
    "al murshid al muin",
    "matn ibn ashir",
    "apprendre le fiqh",
    "cours fiqh en ligne",
    "prière malikite",
    "ablutions malikite",
    "wudu malikite",
    "fiqh des adorations",
    "sciences islamiques fiqh",
  ],
  image: "/images/fiqh_students.png",
});

export default function CoursFiqhMalikitePage() {
  const course = PROGRAMS_DATA["fiqh_malikite"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd
        data={courseJsonLd({
          name: "Cours de Fiqh Mâlikite — Droit Musulman (Matn Ibn Achir)",
          description:
            "Apprenez à réaliser vos actes d'adoration correctement selon l'école malikite : purification, prière, jeûne, zakat et hajj.",
          path: "/fr/cours-fiqh-malikite",
          price: "399",
          courseMode: "Online",
          workload: "P4M",
          image: "/images/fiqh_students.png",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Fiqh Mâlikite", path: "/fr/cours-fiqh-malikite" },
        ])}
      />
      <JsonLd data={faqJsonLd(FIQH_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Cours de Fiqh Mâlikite en ligne : Ibn Âchir et le droit musulman",
          description:
            "Guide et formation ISHES pour apprendre le Fiqh mâlikite en français : madhhab de l'imam Mâlik, Al-Murshid al-Mu'în, purification, prière, zakat, jeûne et hajj.",
          path: "/fr/cours-fiqh-malikite",
          image: "/images/fiqh_students.png",
          keywords: [
            "fiqh malikite",
            "ibn achir",
            "al murshid al muin",
            "école malikite",
            "cours fiqh en ligne",
          ],
          wordCount: 1800,
          about: [
            "Fiqh mâlikite",
            "Imam Mâlik",
            "Ibn Âchir",
            "Al-Murshid al-Mu'în",
            "Droit musulman",
          ],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment apprendre le Fiqh mâlikite en ligne",
          description:
            "Étapes pour suivre le cours de Fiqh mâlikite de l'Institut ISHES, basé sur Ibn Âchir.",
          path: "/fr/cours-fiqh-malikite",
          steps: [
            {
              name: "Comprendre l'école malikite",
              text: "Le madhhab de l'imam Mâlik est l'école de jurisprudence du Maghreb et d'une grande partie de l'Afrique. Le cours pose d'abord ce cadre.",
            },
            {
              name: "Étudier Al-Murshid al-Mu'în (Ibn Âchir)",
              text: "Le matn en vers sert de fil conducteur : tahâra, salât, zakat, sawm, hajj.",
            },
            {
              name: "Suivre le cours en direct et les replays",
              text: "Une séance par semaine pendant 4 mois, supports PDF, exercices corrigés.",
            },
            {
              name: "Pratiquer ses adorations correctement",
              text: "À l'issue du parcours, l'étudiant sait distinguer obligation, sounna et ce qui invalide l'acte.",
            },
          ],
        })}
      />

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase">
              Droit musulman · École malikite · Ibn Âchir
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Cours de Fiqh Mâlikite en ligne
            </h1>
            <p className="text-gray-600 font-medium max-w-xl text-lg leading-relaxed">
              Apprends le <strong>Fiqh mâlikite</strong> en français, selon le Matn Ibn Âchir (
              <em>Al-Murshid al-Mu&apos;în</em>) : purification, prière, zakat, jeûne et hajj. Pratiquer tes
              adorations correctement, selon l&apos;école de l&apos;imam Mâlik.
            </p>
            <div className="pt-4">
              <Link 
                href="/inscription?plan=fiqh_malikite&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1"
              >
                JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-ishes-gold" />
                <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">1 cours / semaine<br/><span className="text-gray-500 font-medium">Samedi à 11h00</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br/><span className="text-gray-500 font-medium">Zoom + Replays</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Hourglass className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br/><span className="text-gray-500 font-medium">4 mois</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Certification<br/><span className="text-gray-500 font-medium">Diplôme ISHES</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Tous les supports<br/><span className="text-gray-500 font-medium">inclus</span></span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-ishes-blue">
              {videoUrl ? (
                <iframe 
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image 
                  src="/images/formations/fiqh-distance-1.png" 
                  alt="Cours de Fiqh mâlikite en ligne — droit musulman Institut ISHES"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── POURQUOI APPRENDRE LE FIQH ─── */}
      <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-serif text-ishes-blue font-black">Pourquoi apprendre le Fiqh mâlikite ?</h2>
            <p className="text-lg text-gray-700 leading-relaxed font-bold">
              Nous prions, nous jeûnons, nous faisons nos ablutions... mais connaissons-nous réellement les règles qui encadrent ces adorations ?
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              L'étude du fiqh te permet de comprendre ce que tu accomplis, de distinguer les obligations, les actes recommandés et ce qui peut affecter la validité d'une adoration.
            </p>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Droplet, label: "Purification", color: "bg-blue-100 text-blue-600" },
              { icon: Landmark, label: "Prière", color: "bg-green-100 text-green-600" },
              { icon: HandCoins, label: "Zakat", color: "bg-yellow-100 text-yellow-600" },
              { icon: Moon, label: "Jeûne", color: "bg-red-100 text-red-600" },
              { icon: MapPin, label: "'Umra\net Hajj", color: "bg-purple-100 text-purple-600" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-gray-800 whitespace-pre-line leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUVRAGE DE REFERENCE ─── */}
      <section className="py-24 px-6 bg-[#EBE7DF]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 relative aspect-[4/3] w-full max-w-md mx-auto">
             <div className="absolute inset-0 bg-black/10 rounded-2xl rotate-3 shadow-2xl"></div>
             <Image 
               src="/images/fiqh_book.png" 
               alt="Livre Al-Murshid al-Mu'in (Matn Ibn 'Ashir) – texte de référence du fiqh malikite"
               fill
               sizes="(max-width: 768px) 100vw, 448px"
               className="object-cover rounded-2xl shadow-xl relative z-10"
             />
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-serif text-ishes-blue font-black">
              Un ouvrage de référence :<br/>
              <span className="text-ishes-gold">Al-Murshid al-Mu'in d'Ibn 'Ashir</span>
            </h2>
            <p className="text-lg text-gray-800 font-bold leading-relaxed">
              Le cours s'appuie sur <strong>Al-Murshid al-Mu'in</strong>, un texte majeur de l'enseignement traditionnel malikite, composé en vers.
            </p>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              Sa forme facilite la mémorisation et condense de nombreuses règles. L'enseignant t'accompagne dans sa compréhension et ses applications concrètes.
            </p>
            
            <div className="pt-4 flex items-start gap-4 p-6 bg-white/60 rounded-xl">
              <BookOpen className="w-8 h-8 text-ishes-gold shrink-0" />
              <p className="text-sm font-bold text-gray-800">
                Un texte étudié depuis plusieurs siècles dans le monde musulman, particulièrement au Maghreb et en Afrique de l'Ouest.
                <br/>
                <Link href="/fr/cours-fiqh-malikite/ibn-ashir" className="text-ishes-gold hover:underline font-black mt-2 inline-block text-[15px]">
                  Découvrir la vie de l'Imam Ibn 'Âshir →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARCOURS PROGRESSIF ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-6">Un parcours complet et progressif</h2>
        <p className="text-lg text-gray-600 font-medium max-w-3xl mb-16">
          Avant d'étudier les règles, nous commençons par t'apprendre comment acquérir la science. Le cursus débute par une introduction aux sciences religieuses, puis entre dans le fiqh des adorations selon l'école malikite.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
          <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-gray-200 -z-10"></div>
          {[
            { num: 1, title: "Introduction aux sciences", color: "text-green-600 bg-green-50", items: ["Les adab de l'étudiant", "La place du savant", "Les écoles de jurisprudence", "Usûl al-Fiqh"] },
            { num: 2, title: "La purification", color: "text-blue-600 bg-blue-50", items: ["Statut des eaux", "Impuretés", "Petites ablutions (Wudû')", "Ablutions sèches (Tayammum)"] },
            { num: 3, title: "La prière", color: "text-emerald-600 bg-emerald-50", items: ["Conditions", "Actes obligatoires", "Sunan", "Prières surérogatoires", "Règles de l'imamat"] },
            { num: 4, title: "La zakat", color: "text-yellow-600 bg-yellow-50", items: ["Zakat al-Mâl", "Zakat al-Fitr", "Conditions et règles"] },
            { num: 5, title: "Le jeûne", color: "text-red-600 bg-red-50", items: ["Jeûne du Ramadan", "Jeûnes surérogatoires", "Règles essentielles"] },
            { num: 6, title: "La 'Umra et le Hajj", color: "text-purple-600 bg-purple-50", items: ["Règles de la 'Umra", "Règles du Hajj", "Visite à Médine"] }
          ].map((step, i) => (
            <div key={i} className="flex flex-col">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-sm border border-white ${step.color}`}>
                {step.num}
              </div>
              <h3 className="text-lg font-black text-ishes-blue mb-4 h-14 leading-tight">{step.title}</h3>
              <ul className="space-y-2">
                {step.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-600 font-medium flex items-start gap-2">
                    <span className="text-ishes-gold font-black mt-0.5">•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SUPPORTS PEDAGOGIQUES ─── */}
      <section className="py-24 px-6 bg-ishes-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-full bg-[#152233] rounded-l-full -z-10 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Plus de 30 supports<br/>pédagogiques</h2>
            <p className="text-lg text-gray-300 font-medium max-w-md leading-relaxed">
              Chaque chapitre est accompagné d'un support clair et structuré pour t'aider à comprendre, réviser et conserver une trace organisée de ton apprentissage.
            </p>
            <div className="inline-flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/20">
              <Lock className="w-6 h-6 text-ishes-gold" />
              <span className="text-sm font-medium text-white">Les supports complets sont réservés<br/>aux étudiants inscrits à la formation.</span>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[400px] group cursor-pointer">
             {/* Support 5: Zakat (Background Left) */}
             <div className="absolute top-20 left-4 w-[180px] h-[250px] bg-white rounded-xl shadow-xl transform -rotate-12 scale-90 opacity-60 overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 ease-out group-hover:-translate-x-16 group-hover:-translate-y-2 group-hover:-rotate-[20deg] group-hover:opacity-90 z-0 hover:!z-50 hover:!scale-110 hover:!opacity-100">
               <div className="h-24 bg-yellow-600 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[url('/images/formations/tarbya-islamya-distance-1.jpg')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-2 left-3 right-3 text-white">
                   <span className="text-[8px] font-bold uppercase tracking-wider opacity-80 mb-0.5 block">Support #4</span>
                   <h4 className="font-black text-[11px] leading-tight">La Zakat<br/>(Az-Zakât)</h4>
                 </div>
               </div>
               <div className="p-3 flex-1 flex flex-col bg-white">
                 <div className="space-y-2 mt-1">
                   <div className="w-full h-1 bg-gray-100 rounded-full"></div>
                   <div className="w-5/6 h-1 bg-gray-100 rounded-full"></div>
                 </div>
               </div>
             </div>

             {/* Support 1: La Purification (Mid Left) */}
             <div className="absolute top-10 left-16 w-[200px] h-[280px] bg-white rounded-xl shadow-2xl transform -rotate-6 overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 ease-out group-hover:-translate-x-8 group-hover:-translate-y-4 group-hover:-rotate-12 z-10 hover:!z-50 hover:!scale-110">
               <div className="h-32 bg-ishes-blue relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[url('/images/formations/fiqh-distance-1.png')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-3 left-4 right-4 text-white">
                   <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 mb-1 block">Support de Cours #1</span>
                   <h4 className="font-black text-sm leading-tight">La Purification<br/>(At-Tahâra)</h4>
                 </div>
               </div>
               <div className="p-4 flex-1 flex flex-col bg-white">
                 <div className="space-y-2.5 mt-2">
                   <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-5/6 h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-4/6 h-1.5 bg-gray-100 rounded-full"></div>
                 </div>
                 <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                   <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                     <Book className="w-3 h-3 text-ishes-gold" />
                   </div>
                   <span className="text-[9px] font-bold text-gray-400">Format PDF • 12 pages</span>
                 </div>
               </div>
             </div>

             {/* Support 2: La Prière (Center) */}
             <div className="absolute top-0 left-[30%] w-[200px] h-[280px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform rotate-0 overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 ease-out group-hover:-translate-y-6 z-20 hover:!z-50 hover:!scale-110">
               <div className="h-32 bg-ishes-gold relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[url('/images/formations/fiqh-distance-2.png')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-3 left-4 right-4 text-white">
                   <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 mb-1 block">Support de Cours #2</span>
                   <h4 className="font-black text-sm leading-tight">La Prière<br/>(As-Salât)</h4>
                 </div>
               </div>
               <div className="p-4 flex-1 flex flex-col bg-white">
                 <div className="space-y-2.5 mt-2">
                   <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-3/4 h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-1/2 h-1.5 bg-gray-100 rounded-full"></div>
                 </div>
                 <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                   <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                     <Book className="w-3 h-3 text-ishes-blue" />
                   </div>
                   <span className="text-[9px] font-bold text-gray-400">Format PDF • 24 pages</span>
                 </div>
               </div>
             </div>

             {/* Support 3: Le Jeûne (Mid Right) */}
             <div className="absolute top-10 right-16 w-[200px] h-[280px] bg-white rounded-xl shadow-2xl transform rotate-6 overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:-translate-y-4 group-hover:rotate-12 z-10 hover:!z-50 hover:!scale-110">
               <div className="h-32 bg-[#0F172A] relative overflow-hidden">
                 <div className="absolute inset-0 opacity-30 bg-[url('/images/formations/civilisation-hero.jpg')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-3 left-4 right-4 text-white">
                   <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 mb-1 block">Support de Cours #3</span>
                   <h4 className="font-black text-sm leading-tight">Le Jeûne<br/>(As-Siyâm)</h4>
                 </div>
               </div>
               <div className="p-4 flex-1 flex flex-col bg-white">
                 <div className="space-y-2.5 mt-2">
                   <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
                   <div className="w-5/6 h-1.5 bg-gray-100 rounded-full"></div>
                 </div>
                 <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                   <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                     <Book className="w-3 h-3 text-ishes-gold" />
                   </div>
                   <span className="text-[9px] font-bold text-gray-400">Format PDF • 18 pages</span>
                 </div>
               </div>
             </div>

             {/* Support 6: Hajj & Umra (Background Right) */}
             <div className="absolute top-20 right-4 w-[180px] h-[250px] bg-white rounded-xl shadow-xl transform rotate-12 scale-90 opacity-60 overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 ease-out group-hover:translate-x-16 group-hover:-translate-y-2 group-hover:rotate-[20deg] group-hover:opacity-90 z-0 hover:!z-50 hover:!scale-110 hover:!opacity-100">
               <div className="h-24 bg-emerald-700 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[url('/images/kaaba.jpg')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-2 left-3 right-3 text-white">
                   <span className="text-[8px] font-bold uppercase tracking-wider opacity-80 mb-0.5 block">Support #5</span>
                   <h4 className="font-black text-[11px] leading-tight">Hajj & 'Umra</h4>
                 </div>
               </div>
               <div className="p-3 flex-1 flex flex-col bg-white">
                 <div className="space-y-2 mt-1">
                   <div className="w-full h-1 bg-gray-100 rounded-full"></div>
                   <div className="w-3/4 h-1 bg-gray-100 rounded-full"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── CE QUI EST INCLUS ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-16">Ce qui est inclus</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { image: "/images/fiqh_book.png", icon: Book, title: "Support\npédagogique" },
            { image: "/images/tajwid_replay.png", icon: PlayCircle, title: "Replays\nillimités" },
            { image: "/images/tajwid_diploma.png", icon: Award, title: "Diplôme de fin\nde parcours" },
            { image: "/images/tajwid_exercises.png", icon: PenTool, title: "Exercices\net évaluations" },
            { image: "/images/tajwid_whatsapp.png", icon: Users, title: "Groupe WhatsApp\nprivé et suivi" }
          ].map((item, i) => (
            <div key={i} className="w-40 md:w-48 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center group overflow-hidden relative pb-6 transition-all hover:shadow-md">
              <div className="w-full h-32 relative mb-8">
                 <Image src={item.image} alt={`${item.title} — Institut ISHES`} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, 16vw" />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-ishes-dark rounded-full flex items-center justify-center text-ishes-gold border-4 border-white shadow-md z-10">
                   <item.icon className="w-5 h-5" />
                 </div>
              </div>
              <h3 className="font-bold text-ishes-blue text-sm whitespace-pre-line text-center px-4">{item.title}</h3>
            </div>
          ))}
        </div>
        <Link 
          href="/inscription?plan=fiqh_malikite&audience=adulte" 
          className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1"
        >
          JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* ─── DEROULEMENT ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Comment se déroule la formation ?</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-ishes-gold/30 border-dashed"></div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { num: 1, icon: ClipboardCheck, title: "Tu t'inscris", desc: "Choisis ton mode de paiement et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat à la plateforme et au groupe WhatsApp." },
              { num: 3, icon: Users, title: "Tu assistes aux cours", desc: "Cours en direct sur Zoom tous les mercredis à 21h30." },
              { num: 4, icon: Upload, title: "Tu envoies tes exercices", desc: "Des exercices pratiques et des questions à envoyer régulièrement." },
              { num: 5, icon: Award, title: "Tu valides ton diplôme", desc: "À la fin des 4 mois après validation de ton parcours." }
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-xl mb-6 relative z-10 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <step.icon className="w-10 h-10 text-ishes-gold mb-4" />
                <h3 className="font-black text-ishes-blue mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── A LA FIN ─── */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-12">À la fin de cette formation, tu sauras :</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: BookOpen, text: "Comprendre les règles\ndu fiqh selon l'école malikite" },
            { icon: CheckCircle2, text: "Corriger tes erreurs\nde pratique" },
            { icon: UserCheck, text: "Être autonome dans\nta pratique" }
          ].map((item, i) => (
            <div key={i} className="bg-[#fafafa] rounded-xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm border border-gray-100">
              <item.icon className="w-10 h-10 text-ishes-gold" />
              <p className="font-bold text-ishes-dark text-sm whitespace-pre-line">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-ishes-blue to-[#112521] rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden border border-[#2a453f]">
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ishes-gold/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Prix & Info */}
            <div className="text-center md:text-left space-y-6">
              <div className="inline-block px-4 py-1.5 bg-ishes-gold/20 border border-ishes-gold/30 text-ishes-gold rounded-full text-xs font-black tracking-widest uppercase mb-2">
                Offre Limitée
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="text-7xl font-black text-white drop-shadow-md">
                  399<span className="text-5xl text-ishes-gold">€</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mt-2">Formation complète - 4 mois</h3>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300 text-sm bg-white/5 w-max mx-auto md:mx-0 px-4 py-2 rounded-full border border-white/10">
                <Lock className="w-4 h-4 text-ishes-gold" />
                <span>Paiement <strong>100% sécurisé</strong></span>
              </div>
            </div>

            {/* Features & CTA */}
            <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                {[
                  "4 mois de formation intensive",
                  "Cours en direct (mercredi 21h30)",
                  "En direct sur Zoom",
                  "Replays illimités disponibles 24/7",
                  "Exercices et évaluations corrigés",
                  "Support pédagogique complet (PDFs)",
                  "Diplôme de fin de parcours",
                  "Proposition du Pack Accompagnement (optionnel 49 €/an)"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(198,168,116,0.5)]" />
                    <span className="text-[15px] font-medium text-gray-200 leading-snug">{text}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-8">
                <Link 
                  href="/inscription?plan=fiqh_malikite&audience=adulte" 
                  className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-ishes-gold to-[#B29255] hover:from-[#C6A874] hover:to-ishes-gold text-white px-8 py-5 rounded-xl text-lg font-black transition-all shadow-[0_0_40px_-10px_rgba(198,168,116,0.6)] hover:shadow-[0_0_60px_-10px_rgba(198,168,116,0.8)] hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shine_1.5s_ease-out] pointer-events-none" />
                  JE M'INSCRIS MAINTENANT <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                  Ne laisse pas passer cette occasion d'améliorer tes adorations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 mt-12 border-t border-white/10 relative z-10">
            <div className="flex items-center justify-center gap-3 text-gray-300 text-sm font-medium">
              <div className="p-2 bg-ishes-gold/10 rounded-full">
                <CreditCard className="w-5 h-5 text-ishes-gold" />
              </div>
              <span>Paiement en<br/><strong className="text-white">plusieurs fois</strong> sans frais</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300 text-sm font-medium">
              <div className="p-2 bg-ishes-gold/10 rounded-full">
                <Users className="w-5 h-5 text-ishes-gold" />
              </div>
              <span>Attention,<br/><strong className="text-white">Places limitées</strong></span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300 text-sm font-medium">
              <div className="p-2 bg-ishes-gold/10 rounded-full">
                <Heart className="w-5 h-5 text-ishes-gold" />
              </div>
              <span>Un accompagnement<br/><strong className="text-white">bienveillant</strong></span>
            </div>
          </div>
        </div>
      </section>

      <article className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10 text-[15px] leading-relaxed text-gray-700">
          <header className="text-center">
            <p className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-3">
              Guide · Fiqh mâlikite
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
              Le Fiqh mâlikite expliqué : école de l&apos;imam Mâlik, Ibn Âchir et adorations
            </h2>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Qu&apos;est-ce que le Fiqh mâlikite ?</h3>
            <p>
              Le <strong>Fiqh mâlikite</strong> est l&apos;une des quatre grandes écoles de{" "}
              <strong>jurisprudence islamique</strong> (hanafite, malikite, chaféite, hanbalite). Fondée à Médine
              par l&apos;<strong>imam Mâlik ibn Anas</strong> (auteur d'<em>al-Muwatta&apos;</em>), elle s&apos;appuie
              sur le Coran, la Sounna, le consensus, et la pratique des gens de Médine. C&apos;est le{" "}
              <strong>madhhab</strong> historique du Maghreb (Maroc, Algérie, Tunisie, Mauritanie), d&apos;une
              large part de l&apos;Afrique de l&apos;Ouest, et de nombreuses familles musulmanes en France.
            </p>
            <p>
              Apprendre le <strong>fiqh malikite en français</strong>, ce n&apos;est pas accumuler des avis
              théoriques : c&apos;est savoir si tes <strong>ablutions (wudu)</strong> sont valides, si ta{" "}
              <strong>prière malikite</strong> comporte les piliers exigés, comment sortir la zakat, comment jeûner
              le Ramadan, comment aborder la &apos;umra et le hajj.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Ibn Âchir et Al-Murshid al-Mu&apos;în : le texte du cours
            </h3>
            <p>
              Le cursus ISHES suit <strong>Al-Murshid al-Mu&apos;în</strong>, le matn en vers d&apos;
              <Link href="/fr/cours-fiqh-malikite/ibn-ashir" className="text-ishes-blue font-bold hover:underline">
                l&apos;imam Ibn Âchir
              </Link>{" "}
              (Fès). Depuis des siècles, les étudiants du fiqh malikite mémorisent ce poème puis le détaillent
              avec un enseignant : tahâra, salât, zakat, sawm, hajj, auxquels s&apos;ajoutent des bases d&apos;aqîda
              et de spiritualité. C&apos;est le fil rouge du{" "}
              <strong>cours de Fiqh mâlikite en ligne</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Un cours de Fiqh mâlikite en ligne, pour francophones
            </h3>
            <p>
              L&apos;<strong>Institut ISHES</strong> propose cette formation à distance (direct + replays), sur 4
              mois, avec supports, exercices et diplôme. Elle s&apos;adresse aux débutants comme à ceux qui
              pratiquent déjà sans avoir jamais étudié le <strong>droit musulman malikite</strong>. Complète-la
              éventuellement par l&apos;
              <Link href="/fr/cours-al-aqida" className="text-ishes-blue font-bold hover:underline">
                aqîda
              </Link>
              , la{" "}
              <Link href="/fr/cours-as-sirah" className="text-ishes-blue font-bold hover:underline">
                sîrah
              </Link>{" "}
              ou le{" "}
              <Link href="/fr/cours-a-distance" className="text-ishes-blue font-bold hover:underline">
                catalogue des cours à distance
              </Link>
              . Question de niveau ?{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                Contacte l&apos;équipe sur WhatsApp
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <VitrineFaq
        eyebrow="FAQ Fiqh mâlikite"
        title="Questions fréquentes : cours, école malikite, Ibn Âchir"
        items={FIQH_FAQS}
      />

    </div>
  );
}
