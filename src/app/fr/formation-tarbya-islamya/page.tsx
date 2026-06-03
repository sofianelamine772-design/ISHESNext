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
  BookOpenCheck,
  Check
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tarbiya Islamiya | Éducation Spirituelle & Éveil du Cœur | ISHES",
  description: "Un programme complet d'éducation islamique pour les enfants de 6 à 15 ans. Éveil de la fitra, adab et amour d'Allah à travers une pédagogie active.",
  keywords: "tarbya islamya, tarbiya islamiya, éducation islamique, cours islam enfant, fitra, adab, ishes",
  openGraph: {
    title: "Tarbiya Islamiya | Éducation Spirituelle & Éveil du Cœur | ISHES",
    description: "Un programme complet d'éducation islamique pour les enfants de 6 à 15 ans. Éveil de la fitra, adab et amour d'Allah à travers une pédagogie active.",
    url: "https://ishes.org/fr/formation-tarbya-islamya",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584281723351-93e18cd944f2?auto=format&fit=crop&q=80&w=800",
        width: 1200,
        height: 630,
        alt: "Tarbiya Islamiya - Institut ISHES"
      }
    ]
  }
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Tarbiya Islamiya",
  "description": "Un programme complet d'éducation islamique pour les enfants de 6 à 15 ans. Éveil de la fitra, adab et amour d'Allah à travers une pédagogie active.",
  "provider": {
    "@type": "Organization",
    "name": "Institut ISHES",
    "sameAs": "https://ishes.org"
  },
  "offers": {
    "@type": "Offer",
    "price": "249",
    "priceCurrency": "EUR",
    "category": "Paid"
  }
};

export default function FormationTarbyaPage() {
  const id = "tarbiya_islamiya";
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

      {/* 1. Un Enseignement Vivant et Profond Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              ✨ Un Enseignement Vivant et Profond
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Ce que les enfants <span className="text-[#008953]">découvrent</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              À travers des histoires, des échanges, des mises en scène pédagogiques et un enseignement adapté à leur âge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Piliers */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Islam & Foi</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Les piliers fondamentaux de l’Islam et de la foi expliqués avec pédagogie pour ancrer la croyance.
              </p>
            </div>

            {/* Calendrier */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Le Calendrier Musulman</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Compréhension et célébration des grands événements (Ramadan, l'Aïd, le Hajj) qui rythment l'année.
              </p>
            </div>

            {/* Nobles caractères */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Smile className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Les Nobles Caractères</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Apprentissage des vertus musulmanes comme l'honnêteté, le respect, la patience et la gratitude (Akhlaq).
              </p>
            </div>

            {/* Hadiths */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Hadiths & Comportement</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Étude de paroles prophétiques courtes et pratiques pour guider leur comportement au quotidien (Adab).
              </p>
            </div>

            {/* Recits des Prophetes */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Récits des Prophètes</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Découverte de l'histoire des grands Prophètes, des Compagnons héroïques et des étapes clés de la Sîrah.
              </p>
            </div>

            {/* Lumiere de la foi */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Une Lumière de Sens</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Aider l'enfant à vivre sa religion non comme une liste de contraintes, mais comme une force épanouissante.
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50/30 border border-green-100 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <p className="text-xl md:text-2xl font-black text-gray-800 italic leading-relaxed">
              "L’objectif est que l’enfant ne vive pas la religion comme une simple liste de règles, mais comme une lumière qui donne du sens à sa vie."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Apprendre a Aimer ALLAH Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              💛 Objectifs du Cœur
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Apprendre à <span className="text-[#008953]">aimer</span> ALLAH
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Dans ce cours, l’enfant apprend progressivement à connecter son cœur avec Son Créateur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Connaitre son createur */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#008953] flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 font-black" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#101828] mb-1">Connaître son Créateur</h4>
                <p className="text-sm text-gray-500 font-medium">Découvrir Ses beaux noms et Ses bienfaits infinis au quotidien.</p>
              </div>
            </div>

            {/* Aimer Allah & Prophete */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#008953] flex items-center justify-center shrink-0 mt-1">
                <Heart className="w-4 h-4 font-black" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#101828] mb-1">Aimer ALLAH et le Prophète ﷺ</h4>
                <p className="text-sm text-gray-500 font-medium">Créer un attachement affectueux profond à travers leurs histoires.</p>
              </div>
            </div>

            {/* Respecter ses parents */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#008953] flex items-center justify-center shrink-0 mt-1">
                <Smile className="w-4 h-4 font-black" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#101828] mb-1">Respecter ses parents</h4>
                <p className="text-sm text-gray-500 font-medium">Comprendre l'importance de la bonté envers la famille (Birr al-Walidayn).</p>
              </div>
            </div>

            {/* Purifier son comportement */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#008953] flex items-center justify-center shrink-0 mt-1">
                <ShieldCheck className="w-4 h-4 font-black" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#101828] mb-1">Purifier son comportement</h4>
                <p className="text-sm text-gray-500 font-medium">Éviter les mauvais caractères et cultiver la bienveillance active.</p>
              </div>
            </div>

            {/* Satisfaire Allah */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#008953] flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 font-black" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#101828] mb-1">Satisfaire ALLAH</h4>
                <p className="text-sm text-gray-500 font-medium">Donner du sens à ses actions quotidiennes pour plaire à ALLAH.</p>
              </div>
            </div>

            {/* Eveil du coeur */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#008953] flex items-center justify-center shrink-0 mt-1">
                <GraduationCap className="w-4 h-4 font-black" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#101828] mb-1">L'éveil du cœur</h4>
                <p className="text-sm text-gray-500 font-medium">Construire une foi solide par la conscience et l'amour, non la théorie.</p>
              </div>
            </div>
          </div>

          {/* Golden Quote */}
          <div className="mt-12 bg-gradient-to-br from-[#c8a96e]/5 to-[#c8a96e]/15 border border-[#c8a96e]/30 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-sm">
            <p className="text-sm md:text-base font-black text-[#8f6d33] italic leading-relaxed">
              "Car une foi solide ne se construit pas uniquement par des informations… mais par l’éveil du cœur."
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'enseignante Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-gray-50 rounded-[3rem] border border-gray-100 p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-green-50 text-[#008953] rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-xl">
              <Award className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div className="space-y-6 flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                🎓 Profil Enseignante
              </span>
              <h3 className="text-3xl font-black text-[#101828]">Une enseignante formée & expérimentée</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Le cours est enseigné par une professeure diplômée en sciences islamiques, titulaire de l'Ijaza dans l'enseignement de la méthode **Nour Al Bayan** et formée en spiritualité musulmane à l'institut *Arab El Quran* au Caire.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-xs font-black uppercase tracking-wider text-gray-700">
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#008953]" /> Pédagogie active
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#008953]" /> Bienveillance
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#008953]" /> Transmission adaptée
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Une Pédagogie Adaptée Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              🎭 Méthodologie active
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Une pédagogie adaptée <br /> aux <span className="text-[#008953]">enfants</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Chaque séance cherche à faire aimer la religion et à donner envie de progresser sereinement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Pedago 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🗣️</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Récits Vivants</h4>
              <p className="text-xs text-gray-400 font-medium">Histoires et exemples imagés marquants</p>
            </div>

            {/* Pedago 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">💬</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Échanges</h4>
              <p className="text-xs text-gray-400 font-medium">Dialogues interactifs et cadre libre</p>
            </div>

            {/* Pedago 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🎭</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Mises en Scène</h4>
              <p className="text-xs text-gray-400 font-medium">Jeux de rôle pour intégrer la sagesse</p>
            </div>

            {/* Pedago 4 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">💡</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Exemples</h4>
              <p className="text-xs text-gray-400 font-medium">Cas concrets reliés à leur quotidien</p>
            </div>

            {/* Pedago 5 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🌟</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Cadre Positif</h4>
              <p className="text-xs text-gray-400 font-medium">Éducation motivante sans pression</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pour Qui ? Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
                👧 🧒 Pour Qui ?
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-[#101828]">Un enseignement adapté selon les tranches d'âge</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Le cours est accessible à partir de **6 ans**, pour les enfants du primaire et du collège, même sans connaissances religieuses préalables.
              </p>
              <p className="text-gray-500 font-medium leading-relaxed">
                Les groupes sont minutieusement constitués par tranches d'âge et de niveau de maturité, respectant ainsi scrupuleusement le rythme d'assimilation et la compréhension de chaque élève.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100 text-center">
                <span className="text-2xl block mb-2">🎈</span>
                <h4 className="font-black text-base text-[#101828] mb-1">Dès 6 ans</h4>
                <p className="text-xs text-gray-400 font-medium">Primaire & Collège</p>
              </div>
              <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100 text-center">
                <span className="text-2xl block mb-2">🚀</span>
                <h4 className="font-black text-base text-[#101828] mb-1">Zéro prérequis</h4>
                <p className="text-xs text-gray-400 font-medium">Ouvert à tous niveaux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comment se deroule le cours Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              💻 Déroulement Logistique
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Une organisation <br /> souple et <span className="text-[#008953]">suivie</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Deroule 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Direct Zoom</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Cours hebdomadaires en direct, favorisant les échanges et la prise de parole.
              </p>
            </div>

            {/* Deroule 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Replays</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Accès direct aux rediffusions en cas d'absence pour ne jamais perdre le fil.
              </p>
            </div>

            {/* Deroule 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Suivi Parent</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Suivi pédagogique continu pour guider et encourager l'enfant chez lui.
              </p>
            </div>

            {/* Deroule 4 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Progressif</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Enseignement progressif et structuré planifié sur plusieurs années.
              </p>
            </div>

            {/* Deroule 5 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Équilibre</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Une alliance harmonieuse entre instruction et épanouissement spirituel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Fitra Conclusion Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0b3321] to-[#041a10] rounded-[3.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Light effects */}
          <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

          <div className="relative z-10 space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-white/10 text-emerald-400">
              🌱 La Fitra de votre enfant
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
              « Certes, chaque enfant naît selon la Fitra (la nature saine)… »
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest italic">
              (Rapporté par le Sahih Al-Bukhari)
            </p>
            <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Donnez à votre enfant les racines spirituelles nécessaires pour naviguer avec assurance et sérénité dans le monde d'aujourd'hui.
            </p>

            <div className="pt-8 flex flex-col items-center gap-4">
              <Link 
                href={`/inscription?plan=${id}&audience=enfant`}
                className="px-10 py-5 bg-[#008953] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#008953]/30 hover:bg-[#007044] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                👉 Je découvre le cours de Tarbiya Islamiya <ArrowRight className="w-5 h-5" />
              </Link>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                Tarif annuel de la session : {course.price}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
