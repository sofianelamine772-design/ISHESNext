import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  Hourglass,
  Heart,
  UserRound,
  Users,
  BookOpen,
  Mail,
  PenTool,
  CheckCircle2,
  Lock,
  CreditCard,
  ArrowRight,
  PlayCircle,
  Monitor,
  Gift,
  History
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Civilisation Arabo-Musulmane | Héritage & Savoir | ISHES",
  description: "Explorez l'âge d'or des sciences, des arts et de la philosophie arabo-musulmane. Un voyage historique pour comprendre l'héritage universel de cette civilisation.",
  keywords: "civilisation arabo-musulmane, histoire islam, age d'or islam, sciences arabes, ishes"
};

export default function CivilisationPage() {
  const course = PROGRAMS_DATA["civilisation_arabo_musulmane"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase flex items-center gap-2">
              HÉRITAGE & SAVOIR
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Civilisation <br />
              Arabo-Musulmane
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Explorez l'âge d'or des sciences, des arts et de la philosophie arabo-musulmane.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=civilisation_arabo_musulmane&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-blue hover:bg-ishes-blue/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-blue/20 hover:-translate-y-1"
              >
                JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
              </Link>
              {videoUrl && (
                <Link 
                  href={videoUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
                >
                  <PlayCircle className="w-5 h-5" /> Voir le teaser
                </Link>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-ishes-gold" />
                <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">1 cours / semaine<br/><span className="text-gray-500 font-medium">Mercredi de 20h à 21h</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br/><span className="text-gray-500 font-medium">Zoom + Replays</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Hourglass className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br/><span className="text-gray-500 font-medium">2 mois</span></span>
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
                <div className="w-full h-full bg-white rounded-2xl p-8 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-amber-600/5 rounded-[3rem] rotate-3 -z-10" />
                  <div className="absolute top-0 left-0 w-full h-2 bg-amber-600" />
                  <History className="w-32 h-32 text-amber-600/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-center space-y-4 px-6 relative z-10">
                    <h3 className="text-2xl font-black text-ishes-blue">"Celui qui ne connaît pas son passé ne peut construire son futur"</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: UserRound, title: "Tu souhaites connaître", desc: "l'âge d'or de la civilisation arabo-musulmane." },
            { icon: BookOpen, title: "Tu veux découvrir", desc: "les savants qui ont révolutionné les sciences." },
            { icon: History, title: "Tu souhaites comprendre", desc: "comment l'Islam a influencé le monde contemporain." },
            { icon: Users, title: "Tu veux renouer", desc: "avec un héritage riche intellectuel et spirituel." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-8 h-8 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ishes-blue whitespace-pre-line leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-2 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-24 px-6 bg-white my-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 flex items-center justify-center bg-gray-50">
             <History className="w-48 h-48 text-amber-600/20" />
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 to-transparent"></div>
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Thématiques abordées</h2>
            <div className="space-y-6">
              {[
                "L'Âge d'Or des Sciences (Médecine, Mathématiques, Astronomie)",
                "Philosophie, Éthique et place de la raison en Islam",
                "Architecture, Arts et calligraphie",
                "Transmission des savoirs vers l'Occident",
                "Échanges Inter-culturels (Bagdad, Cordoue, Damas)",
                "Héritage contemporain et défis actuels"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0" />
                  <span className="text-lg font-medium text-ishes-dark">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CE QUI EST INCLUS ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-16">Ce qui est inclus</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { image: "/images/tajwid_students.png", title: "En direct sur Zoom\nMercredi de 20h à 21h" },
            { image: "/images/tajwid_exercises.png", title: "Approche culturelle\net historique" },
            { image: "/images/tilawa_quran.png", title: "Supports de cours\net accès aux replays" },
            { image: "/images/tajwid_whatsapp.png", title: "Groupe WhatsApp\nprivé et d'échanges" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col group overflow-hidden relative pb-6 transition-all hover:shadow-md">
              <div className="w-full h-40 relative mb-4">
                 <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <h3 className="font-bold text-ishes-blue text-sm whitespace-pre-line px-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEROULEMENT ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Comment se déroule le programme ?</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-ishes-gold/30 border-dashed"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { num: 1, icon: Calendar, title: "Tu t'inscris", desc: "Sélectionne la formation et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat au groupe WhatsApp dédié." },
              { num: 3, icon: Video, title: "Tu assistes aux cours", desc: "Tous les mercredis de 20h à 21h en direct." },
              { num: 4, icon: BookOpen, title: "Tu parcours l'histoire", desc: "Immersion sur 2 mois dans notre riche héritage." }
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

      {/* ─── PRICING BANNER ─── */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-10 mt-12">
        <div className="bg-ishes-dark rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Section Gauche : Prix */}
          <div className="text-center md:text-left space-y-2 flex-1 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
            <div className="text-5xl md:text-6xl font-black text-ishes-gold flex items-baseline gap-4 justify-center md:justify-start">
              199 €
              <span className="text-2xl text-gray-400 line-through">349 €</span>
            </div>
            <h3 className="text-lg font-medium text-gray-300">Prix de lancement (avant le 15 Septembre) - 2 mois</h3>
          </div>

          {/* Section Milieu : Info */}
          <div className="flex-1 flex items-center justify-center md:justify-start gap-4 px-0 md:px-8 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
            <CreditCard className="w-10 h-10 text-ishes-gold" />
            <span className="text-lg font-medium text-gray-200">Paiement unique <br/> Inscription immédiate</span>
          </div>

          {/* Section Droite : Bouton et sécurité */}
          <div className="flex flex-col items-center md:items-end gap-4 flex-1">
            <Link 
              href="/inscription?plan=civilisation_arabo_musulmane&audience=adulte" 
              className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-5 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1 w-full"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Lock className="w-4 h-4 text-ishes-gold" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
