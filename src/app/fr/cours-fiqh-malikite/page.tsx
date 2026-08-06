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
  ArrowRight
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

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Est-ce que ce cours est fait pour toi ?</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: UserCheck, title: "Tu veux valider\ntes actes d'adoration", desc: "Tu souhaites pratiquer selon les règles authentiques." },
            { icon: BookOpen, title: "Tu débutes\nen fiqh", desc: "Tu veux apprendre sur des bases saines et structurées." },
            { icon: ShieldCheck, title: "Tu veux corriger\ntes erreurs", desc: "Tu veux comprendre et appliquer correctement les règles." }
          ].map((item, i) => (
            <div key={i} className="bg-[#fafafa] rounded-2xl p-10 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-ishes-gold/20">
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <h3 className="text-xl font-black text-ishes-blue whitespace-pre-line">{item.title}</h3>
              <p className="text-gray-600 font-medium text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-24 px-6 bg-ishes-blue text-white my-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
             <Image 
               src="/images/formations/fiqh-distance-2.png" 
               alt="Étudiant en Fiqh"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black">Pourquoi ce programme est différent ?</h2>
            <div className="space-y-6">
              {[
                "Étude du texte de référence : Matn Ibn Achir",
                "Commentaires de savants reconnus (Al-Mayyarah, Shinqiti...)",
                "Accès aux preuves (Dalila) du Coran et de la Sunna",
                "Pédagogie claire, structurée et accessible",
                "Cours 100 % en direct avec un enseignant qualifié"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0" />
                  <span className="text-lg font-medium text-gray-200">{text}</span>
                </div>
              ))}
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
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-ishes-blue rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center md:text-left space-y-4">
              <div className="text-6xl font-black text-ishes-gold">399 €</div>
              <h3 className="text-xl font-bold text-white">Formation complète - 4 mois</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                <Lock className="w-4 h-4 text-ishes-gold" />
                Paiement 100% sécurisé
              </div>
            </div>

            <div className="space-y-4">
              {[
                "4 mois de formation",
                "Cours en direct (mercredi 21h30)",
                "En direct sur Zoom",
                "Replays illimités",
                "Exercices et évaluations",
                "Support pédagogique",
                "Diplôme de fin de parcours",
                "Proposition du Pack Accompagnement (optionnel 49 €/an)"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-300 leading-snug">{text}</span>
                </div>
              ))}
              
              <div className="pt-6">
                <Link 
                  href="/inscription?plan=fiqh_malikite&audience=adulte" 
                  className="w-full flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1"
                >
                  JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10 relative z-10">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
              <CreditCard className="w-4 h-4 text-ishes-gold" />
              Paiement en plusieurs fois sans frais
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
              <Users className="w-4 h-4 text-ishes-gold" />
              Places limitées
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
              <Heart className="w-4 h-4 text-ishes-gold" />
              Accompagnement bienveillant
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
