import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Monitor, 
  Award, 
  Hourglass,
  Users,
  BookOpen,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  Gift,
  CreditCard,
  Lock,
  ArrowRight,
  PlayCircle,
  Tag,
  Circle,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Cours de Tajwid pour Enfants | Récitation Junior | ISHES",
  description: "Apprenez à votre enfant à lire le Coran avec excellence. Une pédagogie douce et adaptée pour maîtriser les règles de Tajwid dès le plus jeune âge.",
  keywords: "tajwid enfant, cours coran junior, lecture coran enfant, ishes toulouse"
};

export default function CoursTajwidEnfantPage() {
  const course = PROGRAMS_DATA["tajwid_enfant_distance"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f2ece4] px-4 py-1.5 rounded-full">
              <Circle className="w-3 h-3 text-ishes-dark" fill="currentColor" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                LANGUE & COMMUNICATION
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              TAJWID (Enfant)
            </h1>
            <h2 className="text-xl md:text-2xl text-[#b88c4d] font-bold leading-snug">
              Offrir à votre enfant le plus beau<br/>
              des héritages : une relation durable<br/>
              avec le Livre d'Allah.
            </h2>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed">
              Une formation complète et interactive pour apprendre le Tajwid, réciter le Coran correctement et développer une relation profonde avec le Livre d'Allah.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=tajwid_enfant_distance&audience=enfant" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-dark hover:bg-ishes-dark/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-dark/20 hover:-translate-y-1"
              >
                Je m'inscris maintenant <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
              >
                <PlayCircle className="w-5 h-5" /> Voir le teaser
              </button>
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
                  src="/images/formations/tajwid-enfant-distance-1.jpg" 
                  alt="Cours Tajwid Enfant"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>

        {/* ─── INFO BAR ─── */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-6 pt-12 mt-12 border-t border-gray-200 w-full">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Début<br/><span className="text-gray-500 font-medium capitalize tracking-normal">Octobre 2026</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">1 cours / semaine<br/><span className="text-gray-500 font-medium capitalize tracking-normal">Mardi ou jeudi selon<br/>le niveau à 18h30</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">En direct sur Zoom<br/><span className="text-gray-500 font-medium capitalize tracking-normal">+ Replays à vie</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Durée<br/><span className="text-gray-500 font-medium capitalize tracking-normal">8 mois</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Diplôme reconnu<br/><span className="text-gray-500 font-medium capitalize tracking-normal">ISHES</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-ishes-gold" />
            <span className="text-[11px] font-bold text-ishes-dark leading-tight uppercase tracking-wider">Groupe WhatsApp<br/><span className="text-gray-500 font-medium capitalize tracking-normal">privé par classe</span></span>
          </div>
        </div>
      </section>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: "Tu veux que ton enfant\nrécite le Coran\ncorrectement et avec\nbeauté." },
            { icon: MessageCircle, title: "Tu souhaites lui\ntransmettre les règles\ndu Tajwid dès son plus\njeune âge." },
            { icon: Heart, title: "Tu veux qu'il développe\nun lien fort et durable\navec le Coran et\nAllah." },
            { icon: BarChart3, title: "Tu recherches une méthode\nefficace, progressive et\nadaptée aux enfants\nfrancophones." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ishes-dark whitespace-pre-line leading-relaxed">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Pourquoi ce programme va tout changer ?</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-100">
             <Image 
               src="/images/formations/tajwid-enfant-distance-2.jpg" 
               alt="Livres Tajwid et café"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-6">
            {[
              { 
                title: "Une méthode unique et éprouvée", 
                desc: "Basée sur Les Clés du Coran, adaptée de la méthode Nour al-Bayan, spécialement conçue pour les enfants francophones." 
              },
              { 
                title: "3 niveaux progressifs", 
                desc: "Parcours en 3 niveaux pour acquérir des bases solides et progresser à son rythme." 
              },
              { 
                title: "Des cours interactifs et ludiques", 
                desc: "Apprentissage par le jeu, activités variées, mises en situation et participation active pour maintenir la motivation." 
              },
              { 
                title: "Des enseignants expérimentés et bienveillants", 
                desc: "Spécialisés dans l'enseignement du Tajwid aux enfants, pour un accompagnement avec patience et exigence." 
              },
              { 
                title: "Suivi et corrections personnalisées", 
                desc: "Écoute régulière de chaque élève, corrections audio et conseils adaptés pour progresser sereinement." 
              },
              { 
                title: "Un attachement au Coran dès le plus jeune âge", 
                desc: "Développement de l'amour du Coran, de la fierté de le réciter et de la conscience de sa valeur." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-[16px] font-black text-ishes-dark mb-0.5">{item.title}</h3>
                  <p className="text-[14px] font-medium text-gray-600 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO BANNERS BLOCK ─── */}
      <section className="py-12 px-6 max-w-7xl mx-auto mb-8">
        <div className="bg-[#f5f6f8] rounded-[2rem] p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-8 md:gap-16 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-8 h-8 text-ishes-gold" />
            </div>
            <div>
              <h3 className="font-black text-ishes-dark text-lg mb-4 leading-tight uppercase tracking-wide">UNE PÉDAGOGIE DE QUALITÉ</h3>
              <ul className="text-sm font-medium text-ishes-dark leading-relaxed space-y-2">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Activités et exercices variés</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Approche ludique et interactive</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Évaluations régulières</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Révisions et consolidation</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ishes-gold shrink-0"></span> Accès aux replays pendant toute la formation</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start relative">
            {/* Divider line for desktop */}
            <div className="hidden md:block absolute left-[-2rem] top-0 bottom-0 w-px bg-gray-300"></div>
            
            <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shrink-0 text-ishes-gold">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-black text-ishes-dark text-lg mb-4 leading-tight uppercase tracking-wide">FORMATION CLÉ EN MAIN</h3>
              <p className="text-sm font-medium text-ishes-dark leading-relaxed">
                Nous t'accompagnons à chaque étape pour offrir à ton enfant une expérience d'apprentissage complète, fluide et motivante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-8 px-6 max-w-[80rem] mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-6 md:p-8 shadow-2xl text-white relative overflow-hidden flex flex-wrap md:flex-nowrap items-center gap-6 justify-between">
          
          <div className="flex items-center gap-4 border-r border-white/20 pr-8 md:pr-16">
            <Tag className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-300">Tarif</p>
              <h3 className="text-3xl md:text-4xl font-black text-ishes-gold mt-0.5">399 €</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 pl-4 md:pl-0">
            <CreditCard className="w-10 h-10 text-ishes-gold shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-300">Paiement facilité</p>
              <h3 className="text-lg font-black text-white mt-0.5 leading-snug">5 x 79,80 € sans frais</h3>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <Link 
              href="/inscription?plan=tajwid_enfant_distance&audience=enfant" 
              className="inline-flex items-center justify-center gap-2 bg-[#b88c4d] hover:bg-[#a67b3f] text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-lg hover:-translate-y-1 w-full md:w-auto"
            >
              JE M'INSCRIS MAINTENANT <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <Lock className="w-3 h-3 text-ishes-gold" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}
