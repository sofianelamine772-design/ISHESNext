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
  FileText, 
  Users, 
  GraduationCap, 
  Clock, 
  Laptop, 
  Check 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cours de Sciences du Coran | Histoire & Révélation | ISHES",
  description: "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
  keywords: "sciences du coran, histoire coran, révélation, compilation coran, ishes toulouse, sciences islamiques, cours coran",
  openGraph: {
    title: "Cours de Sciences du Coran | Histoire & Révélation | ISHES",
    description: "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
    url: "https://ishes.org/fr/cours-sciences-coran",
    type: "website",
    images: [
      {
        url: "/images/flyer-sciences-du-coran.jpeg",
        width: 1200,
        height: 630,
        alt: "Flyer Sciences du Coran - ISHES"
      }
    ]
  }
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Sciences du Coran",
  "description": "Découvrez l'histoire de la révélation, de la compilation et de la transmission du Livre Saint. Une formation diplômante de l'Institut ISHES.",
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

export default function CoursSciencesCoranPage() {
  const id = "sciences_du_coran";
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

      {/* 1. Voyage au Cœur de la Révélation Section */}
      <section className="pt-24 pb-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              🌙 Un Voyage au Cœur de la Révélation
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Ce que tu vas <span className="text-[#008953]">découvrir</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Ce cours a été conçu pour les étudiants francophones qui souhaitent découvrir les fondements des Sciences du Coran de manière claire, vivante et accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Circumstances of revelation */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Les Circonstances</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Découvrez le contexte historique, les occasions spécifiques et les raisons profondes derrière la descente des versets (Asbab an-Nuzul).
              </p>
            </div>

            {/* Descent on the Prophet */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">La Descente Révélée</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Comprenez la manière dont le Coran descendait sur le Prophète ﷺ, les différentes formes de la Révélation (Wahy) et leur impact physique et spirituel.
              </p>
            </div>

            {/* Role of companions */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Le Rôle des Compagnons</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Explorez le rôle crucial et héroïque des Compagnons (Sahaba) dans la mémorisation, l'écriture immédiate et la transmission fidèle du Livre.
              </p>
            </div>

            {/* Compilation */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">La Compilation du Moushaf</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Suivez les étapes majeures de l'assemblage sous Abou Bakr puis de la standardisation sous 'Othman pour former le Moushaf unique que nous lisons.
              </p>
            </div>

            {/* Preservation stages */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">La Préservation Absolue</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Analysez les différentes époques et étapes de sa préservation infaillible, un miracle sans aucun équivalent dans l'histoire de l'humanité.
              </p>
            </div>

            {/* Oral & Written Transmission */}
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-[#008953] group-hover:bg-[#008953] group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl mb-3 text-[#101828]">Transmission & Miracles</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Saisissez les liens indissociables entre la transmission orale et écrite, ainsi que les sagesses et miracles intrinsèques liés à son agencement.
              </p>
            </div>
          </div>

          {/* Golden Quote */}
          <div className="mt-12 bg-gradient-to-br from-[#c8a96e]/5 to-[#c8a96e]/15 border border-[#c8a96e]/30 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-sm">
            <p className="text-sm md:text-base font-black text-[#8f6d33] italic leading-relaxed">
              "Tu comprendras que le Coran n’est pas seulement préservé dans les livres… mais dans une chaîne humaine ininterrompue reliant notre époque au Prophète ﷺ."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Pour qui Section */}
      <section className="pt-8 pb-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              🎓 Public Cible
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Pour <span className="text-[#008953]">qui</span> est fait ce cours ?
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Aucun niveau avancé en langue arabe n’est requis. Ce cours a été conçu avec méthode et progressivité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Debuts */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🌱</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Débutants</h4>
              <p className="text-xs text-gray-400 font-medium">Souhaitant découvrir l'histoire du Coran</p>
            </div>

            {/* Students */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">📖</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Étudiants</h4>
              <p className="text-xs text-gray-400 font-medium">En sciences islamiques et théologie</p>
            </div>

            {/* Teachers */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">🏫</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Enseignants</h4>
              <p className="text-xs text-gray-400 font-medium">Désirant approfondir leur socle de savoir</p>
            </div>

            {/* Parents */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">👨‍👩‍👧‍👦</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Parents</h4>
              <p className="text-xs text-gray-400 font-medium">Voulant transmettre cette histoire à leurs enfants</p>
            </div>

            {/* All */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl mb-4">✨</span>
              <h4 className="font-black text-base text-[#101828] mb-2">Curieux</h4>
              <p className="text-xs text-gray-400 font-medium">Et toute personne en quête de profondeur spirituelle</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Déroulement Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              💻 Organisation
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Comment se déroule <br /> le <span className="text-[#008953]">cours ?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Cours sur Zoom</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Un cours hebdomadaire en direct et interactif avec les professeurs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Replays à Vie</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Accédez aux enregistrements des cours 24h/24, accessible à vie.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Groupe WhatsApp</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Un groupe dédié aux étudiants pour échanger et poser vos questions.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Structure</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Un enseignement structuré, progressif et adapté pour tout niveau.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#008953] flex items-center justify-center font-black text-xl mb-6 shadow-sm border border-green-100 group-hover:bg-[#008953] group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-[#101828] mb-2">Certificat ISHES</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Délivrance d'une attestation académique en fin de parcours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rencontre avec le Livre Section */}
      <section className="py-24 px-6 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0b3321] to-[#041a10] rounded-[3.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Subtle light effects */}
          <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

          <div className="relative z-10 space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-white/10 text-emerald-400">
              🕌 Plus qu'un cours... Une Rencontre
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
              Une rencontre profonde avec <br className="hidden md:block"/> le Livre d'ALLAH
            </h2>
            <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Comprendre comment le Coran nous est parvenu transforme profondément la manière de le lire, de l’écouter et de le vivre.
            </p>
            <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Car lorsqu’on découvre les efforts de transmission, la rigueur des Compagnons, la mémorisation, les chaînes orales, les manuscrits et la préservation divine… le cœur réalise que ce Livre est véritablement exceptionnel.
            </p>

            <div className="pt-8 flex flex-col items-center gap-4">
              <Link 
                href={`/inscription?plan=${id}`}
                className="px-10 py-5 bg-[#008953] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#008953]/30 hover:bg-[#007044] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                👉 Je m’inscris au cours Sciences du Coran <ArrowRight className="w-5 h-5" />
              </Link>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                Prix total de la formation : {course.price}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
