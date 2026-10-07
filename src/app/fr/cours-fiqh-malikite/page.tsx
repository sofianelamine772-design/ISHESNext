import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: "Cours de Fiqh Mâlikite | Droit Musulman | ISHES",
  description: "Saches enfin comment réaliser tes actes d'adorations correctement et améliore ta relation avec ALLAH.",
  keywords: "fiqh malikite, droit musulman, ibn achir, cours malikite toulouse, ishes"
};

export default function CoursFiqhMalikitePage() {
  const course = PROGRAMS_DATA["fiqh_malikite"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase">
              Droit Musulman
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Fiqh Mâlikite
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed">
              Saches enfin comment réaliser tes actes d'adorations correctement et améliore ta relation avec ALLAH.
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
                  alt="Fiqh Mâlikite"
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
            <h2 className="text-4xl font-serif text-ishes-blue font-black">Pourquoi apprendre le fiqh ?</h2>
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
               src="/images/formations/ibn-ashir-book.jpg" 
               alt="Livre Al-Murshid al-Mu'in"
               fill
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
          <div className="flex-1 relative w-full h-[400px]">
             {/* Abstract representation of PDFs (use actual images if available in your public folder) */}
             <div className="absolute top-10 left-10 w-[200px] h-[280px] bg-white rounded-lg shadow-2xl transform -rotate-6 p-4">
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div><div className="w-3/4 h-4 bg-gray-200 rounded"></div>
             </div>
             <div className="absolute top-0 left-[30%] w-[200px] h-[280px] bg-white rounded-lg shadow-2xl transform rotate-3 p-4">
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div><div className="w-1/2 h-4 bg-gray-200 rounded"></div>
             </div>
             <div className="absolute top-20 right-10 w-[200px] h-[280px] bg-white rounded-lg shadow-2xl transform 6 p-4 border border-gray-100">
                <div className="w-full h-12 bg-ishes-blue/10 rounded mb-4"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div><div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
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
                 <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, 16vw" />
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

    </div>
  );
}
