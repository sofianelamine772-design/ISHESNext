import { Metadata } from 'next';
import Link from 'next/link';
import { CourseDetailView } from "@/components/CourseDetailView";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Compass, 
  MessageSquare, 
  ShieldCheck, 
  Heart, 
  Users, 
  GraduationCap, 
  Clock, 
  Laptop, 
  Smile, 
  Award,
  Check,
  BookOpenCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Spiritualité Musulmane | Éducation de l'Âme & Purification | ISHES",
  description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
  keywords: "spiritualité islam, éducation de l'ame, purification du coeur, tazkiya, paix intérieure islam, cours islam, ishes",
  openGraph: {
    title: "Spiritualité Musulmane | Éducation de l'Âme & Purification | ISHES",
    description: "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
    url: "https://ishes.org/fr/spiritualite-islam",
    type: "website",
    images: [
      {
        url: "/images/spiritualite-musulmane-flyer.jpeg",
        width: 1200,
        height: 630,
        alt: "Spiritualité Musulmane - Institut ISHES"
      }
    ]
  }
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Spiritualité Musulmane",
  "description": "Initiez-vous à l'éducation de l'âme et aux préceptes profonds de l'Islam. Un cursus complet de 4 mois pour nourrir votre cœur et apaiser votre esprit.",
  "provider": {
    "@type": "Organization",
    "name": "Institut ISHES",
    "sameAs": "https://ishes.org"
  },
  "offers": {
    "@type": "Offer",
    "price": "399",
    "priceCurrency": "EUR",
    "category": "Paid"
  }
};

export default function SpiritualiteIslamPage() {
  const id = "spiritualite_islam";
  const course = PROGRAMS_DATA[id];
  
  return (
    <div className="bg-white">
      {/* Google Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Dynamic Base Course detail view */}
      <CourseDetailView course={course} id={id} />

      {/* 1. Un Voyage Intérieur au Cœur de l'Islam Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              ✨ Un Voyage Intérieur au Cœur de l'Islam
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Ce que vous allez <span className="text-[#008953]">découvrir</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Ce cours a été conçu pour toute personne souhaitant approfondir sa compréhension de la religion musulmane au-delà de la simple pratique extérieure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Assises de rappel */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Assises de Rappel</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Découvrez les bienfaits spirituels immenses des assises de rappel (Dhikr) d'ALLAH et leur impact sur le cœur.
              </p>
            </div>

            {/* Science religieuse */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">La Science Religieuse</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Comprenez l'importance vitale et obligatoire de rechercher la science religieuse pour guider notre adoration.
              </p>
            </div>

            {/* Sources authentiques */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Coran & Sunna</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Étudiez les sources authentiques de l'Islam (le Coran et la Sunna) comme fondement de notre cheminement spirituel.
              </p>
            </div>

            {/* Finalites des 5 piliers */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Finalités de l'Islam</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Explorez le sens et les finalités spirituelles profondes derrière la pratique des 5 piliers de l'Islam.
              </p>
            </div>

            {/* Finalites de la foi */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Piliers de la Foi</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Analysez les finalités spirituelles des 6 piliers de la foi pour fortifier votre certitude (Yaqeen).
              </p>
            </div>

            {/* Relation serviteur/Createur */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Serviteur & Créateur</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Approfondissez la relation intime et de soumission confiante qui unit le serviteur à son Créateur.
              </p>
            </div>

            {/* Connaissance de soi */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Smile className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Connaissance de soi</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Apprenez à vous connaître dans votre double dimension, à la fois physique et spirituelle (corps et âme).
              </p>
            </div>

            {/* Travail interieur */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Travail de l'âme</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Découvrez les outils pratiques de purification (Tazkiyat an-Nafs) nécessaires pour améliorer constamment l'âme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Apprendre a Purifier son Coeur Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              💛 Purification Intérieure
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Apprendre à <span className="text-[#008953]">purifier</span> son cœur
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Ce cours ne se limite pas à la théorie. Son but est d'ancrer le travail sur soi au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Objectif 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🤝</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Relation sincère</h4>
              <p className="text-xs text-gray-400 font-medium">Développer un lien sincère et confiant avec ALLAH</p>
            </div>

            {/* Objectif 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🕌</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Sens de l'Adoration</h4>
              <p className="text-xs text-gray-400 font-medium">Saisir le sens profond derrière chaque rite</p>
            </div>

            {/* Objectif 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🍃</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Paix intérieure</h4>
              <p className="text-xs text-gray-400 font-medium">Apaiser l'esprit et calmer les doutes du quotidien</p>
            </div>

            {/* Objectif 4 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">⚙️</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Travailler ses défauts</h4>
              <p className="text-xs text-gray-400 font-medium">Identifier et corriger méthodiquement ses failles</p>
            </div>

            {/* Objectif 5 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🌟</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Devenir meilleur</h4>
              <p className="text-xs text-gray-400 font-medium">Avancer pas à pas vers une meilleure version de soi-même</p>
            </div>
          </div>

          {/* Golden Quote */}
          <div className="mt-12 bg-gradient-to-br from-[#c8a96e]/5 to-[#c8a96e]/15 border border-[#c8a96e]/30 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-sm">
            <p className="text-sm md:text-base font-black text-[#8f6d33] italic leading-relaxed">
              "Car la spiritualité musulmane ne consiste pas à fuir le monde… mais à purifier son cœur tout en vivant dans ce monde."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pour qui Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
                🎓 Pour Qui ?
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-[#101828]">Une formation accessible et ouverte à tous</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Ce cours est ouvert aux débutants, aux étudiants en sciences islamiques, aux personnes en quête de sens, ainsi qu’à toute personne souhaitant nourrir sa foi et son âme.
              </p>
              <p className="text-gray-500 font-medium leading-relaxed">
                **Aucun niveau préalable en théologie ou en langue arabe n’est requis.** L’enseignement est dispensé par une professeure diplômée en Sciences islamiques, disponible pour accompagner les étudiants et répondre à leurs questions tout au long de la formation.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100 text-center">
                <span className="text-2xl block mb-2">🌱</span>
                <h4 className="font-black text-base text-[#101828] mb-1">Tous niveaux</h4>
                <p className="text-xs text-gray-400 font-medium">Débutants bienvenus</p>
              </div>
              <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100 text-center">
                <span className="text-2xl block mb-2">⭐</span>
                <h4 className="font-black text-base text-[#101828] mb-1">Théologie</h4>
                <p className="text-xs text-gray-400 font-medium">Étudiants en sciences islamiques</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Une Approche Equilibree Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] border border-gray-100 p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-green-50 text-[#008953] rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-xl">
              <BookOpenCheck className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div className="space-y-6 flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                📚 Cursus Pédagogique
              </span>
              <h3 className="text-3xl font-black text-[#101828]">Une approche équilibrée</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Le cours allie rigoureusement la **science religieuse**, la **spiritualité**, la **réflexion personnelle** et un **travail concret sur soi**. L’objectif est d’aider l’étudiant à vivre une foi plus consciente, plus profonde et plus apaisée.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-black uppercase tracking-wider text-gray-700">
                <div className="flex items-center gap-2 p-3 bg-[#FAFAFA] rounded-xl border border-gray-100">
                  <Check className="w-4 h-4 text-[#008953] shrink-0" /> Science & Spiritualité
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#FAFAFA] rounded-xl border border-gray-100">
                  <Check className="w-4 h-4 text-[#008953] shrink-0" /> Réflexion & Travail concret
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Informations Pratiques Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              💻 Organisation Logistique
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Informations <span className="text-[#008953]">pratiques</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {/* Info 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">4 Mois</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Une session complète et intensive de 4 mois d'apprentissage.
              </p>
            </div>

            {/* Info 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Samedi 10h30</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Un rendez-vous hebdomadaire stable chaque samedi matin à 10h30.
              </p>
            </div>

            {/* Info 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Direct Zoom</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Des sessions en direct interactives propices à l'apprentissage.
              </p>
            </div>

            {/* Info 4 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Replays</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Les cours enregistrés restent accessibles pour révision.
              </p>
            </div>

            {/* Info 5 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Support inclus</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Accès complet aux supports et résumés de cours après chaque séance.
              </p>
            </div>

            {/* Info 6 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Diplômante</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Remise d'une attestation académique ISHES en fin de parcours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Al-Ghazali Conclusion Section */}
      <section className="py-24 px-6 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0b3321] to-[#041a10] rounded-[3.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Light effects */}
          <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

          <div className="relative z-10 space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-white/10 text-emerald-400">
              🕯️ Sagesse de l'Imam Al-Ghazali
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
              « La science sans purification du cœur est une preuve contre toi, non une lumière pour toi. »
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest italic">
              — Imam Al-Ghazali
            </p>
            <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Rejoignez ce cursus de 4 mois et transformez votre foi en une lumière consciente.
            </p>

            <div className="pt-8 flex flex-col items-center gap-4">
              <Link 
                href={`/inscription?plan=${id}`}
                className="px-10 py-5 bg-[#008953] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#008953]/30 hover:bg-[#007044] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                👉 Je m’inscris au cours de Spiritualité Musulmane <ArrowRight className="w-5 h-5" />
              </Link>
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest flex flex-col items-center gap-1">
                <span>Tarif de la session : {course.price}</span>
                <span className="text-emerald-400 text-xs mt-1">Paiement possible en 4 fois sans frais</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
