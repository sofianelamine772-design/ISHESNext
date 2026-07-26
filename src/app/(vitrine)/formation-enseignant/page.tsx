"use client";
 
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Monitor, CreditCard, ChevronRight, FileText, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";
 
const formations = [
  {
    id: "nour-al-bayan",
    title: "Formation Enseignant de Tajwid",
    subtitle: "Méthode Les Clés du Coran",
    availableRemote: true,
    paymentTerms: "Jusqu'à 10x sans frais",
    tags: ["Pédagogie", "Certification", "Accompagnement"],
    description: "Apprendre à enseigner le Tajwid avec une méthode éprouvée et devenir un véritable pédagogue.\n\nTu connais peut-être déjà les règles du Tajwid. Tu récites correctement. Mais lorsqu'il faut transmettre ce savoir, beaucoup réalisent qu'il existe une différence entre connaître une science… et savoir l'enseigner.\n\nC'est précisément pour répondre à ce besoin qu'a été créée la Formation Enseignant de Tajwid. L'objectif est de former des enseignants capables de transmettre le Coran avec rigueur, pédagogie et bienveillance.",
    objectifs: [
      "Construire une progression pédagogique logique",
      "Présenter chaque règle avec simplicité",
      "Gérer une classe et maintenir l'attention",
      "Corriger efficacement sans décourager",
      "S'adapter selon le niveau de chaque élève"
    ],
    deroulement: [
      "Deux cours par semaine : le lundi et le jeudi, en direct sur Zoom",
      "Replays accessibles pendant toute la durée",
      "Formation organisée en trois modules",
      "Vérification de la récitation (Module 3)",
      "Évaluations et examens de validation"
    ],
    modules: [
      {
        title: "Module 1 — Enseigner le Tajwid",
        desc: "Méthode pédagogique exclusive Les Clés du Coran (adaptation francophone inspirée de Nour Al Bayan)."
      },
      {
        title: "Module 2 — « Apprendre à apprendre »",
        desc: "Piliers de l'apprentissage, mémorisation, gestion de classe, psychologie et posture de l'enseignant."
      },
      {
        title: "Module 3 — Perfectionnement de la récitation",
        desc: "Vérification et correction de ta lecture pour t'assurer une parfaite maîtrise des règles à enseigner."
      }
    ],
    pourQui: [
      "Futurs enseignants ou enseignants en poste",
      "Étudiants en sciences islamiques",
      "Responsables d'écoles, mosquées, associations",
      "Parents souhaitant transmettre le Coran"
    ],
    supports: "Tous les supports sont inclus (Méthode Les Clés du Coran, ressources pédagogiques, évaluations).",
    accompagnement: "Accompagnement et supervision possibles même après la certification pour tes premiers pas d'enseignant.",
    pricing: "Devis personnalisé",
    format: "Enseignement à distance",
    badgeColor: "bg-ishes-green/10 text-ishes-green"
  },
  {
    id: "tarbya-islamya",
    title: "Formation Enseignant Tarbya Islamiya",
    subtitle: "Transmettre les valeurs de l'Islam avec pédagogie et former la génération musulmane de demain.",
    availableRemote: true,
    paymentTerms: "Paiement en plusieurs fois possible",
    tags: ["Enfants & Ados", "Pédagogie", "Tarbya"],
    description: "Tu aimes transmettre l'Islam aux enfants. Tu possèdes peut-être déjà des connaissances religieuses. Mais très vite, une réalité apparaît : comment parler d'ALLAH à un enfant ? Comment lui faire aimer son Seigneur plutôt que de lui transmettre uniquement des connaissances ? Comment expliquer des notions abstraites avec des mots adaptés à son âge ?\n\nLa plupart des enseignants n'ont jamais reçu de véritable formation pédagogique. C'est précisément pour répondre à ce besoin qu'a été créée cette formation, fruit de plus de 15 ans d'expérience de l'Institut ISHES.\n\nL'objectif est de former des éducateurs capables d'éveiller les cœurs, de développer l'amour d'ALLAH et d'accompagner les enfants dans leur cheminement spirituel.",
    objectifs: [
      "Maîtriser et transmettre les grands thèmes de l'éducation islamique de manière vivante",
      "Savoir utiliser les histoires et récits pour rendre les enseignements concrets",
      "Capter et maintenir l'attention des élèves",
      "Gérer sereinement une classe, en présentiel comme à distance",
      "Adopter une posture d'enseignant bienveillant et respecté"
    ],
    deroulement: [
      "Deux cours par semaine : le lundi et le jeudi à 19h30, en direct sur Zoom",
      "Formation d'une durée de 4 à 5 mois avec replays accessibles",
      "Alternance de théorie, exercices pratiques et mises en situation",
      "Évaluations et examens réguliers de validation des compétences",
      "Possibilité de stage pratique au sein de l'Institut ISHES"
    ],
    modules: [
      {
        title: "Module 1 — Maîtriser et transmettre la Tarbya Islamiya",
        desc: "Rôle de l'enseignant, fondements de la spiritualité, 5 piliers de l'Islam, 6 piliers de la foi, invocations et calendrier musulman, utilisation des histoires."
      },
      {
        title: "Module 2 — « Apprendre à apprendre »",
        desc: "Piliers de l'apprentissage, mémorisation, gestion de classe, prévention des conflits, création de cours interactifs et accompagnement personnalisé."
      }
    ],
    pourQui: [
      "Aux futurs enseignants en Tarbya Islamiya",
      "Aux enseignants souhaitant professionnaliser leur pédagogie",
      "Aux étudiants en sciences islamiques",
      "Aux responsables d'écoles, de mosquées ou d'associations",
      "Aux parents souhaitant transmettre les valeurs de l'Islam à leurs enfants"
    ],
    supports: "Manuel pédagogique sur le Tawhid, manuel sur la Sîrah pour enfants, livret d'invocations, fiches d'évaluation et supports complets pour animer les cours.",
    accompagnement: "Suivi pédagogique continu, mentorat et supervision post-formation pour vous conseiller si vous rencontrez des difficultés dans vos cours.",
    pricing: "Devis personnalisé",
    format: "Enseignement à distance",
    badgeColor: "bg-[#008953]/10 text-[#008953]"
  }
];
 
export default function FormationEnseignantPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: "À qui s'adressent ces formations diplômantes ?",
      a: "Nos cursus s'adressent à toute personne (enseignant, futur éducateur, parent) souhaitant acquérir des compétences professionnelles et pédagogiques solides pour enseigner la lecture du Coran (Nour Al Bayan) ou l'éducation religieuse bienveillante (Tarbya Islamya)."
    },
    {
      q: "Quels sont les prérequis pour s'inscrire ?",
      a: "Pour la formation diplômante Tajwid (Nour Al Bayan), il est nécessaire de savoir lire le Coran de manière fluide. Pour la formation Tarbya Islamya, aucun prérequis technique n'est imposé, si ce n'est une forte motivation pour la transmission et la pédagogie positive."
    },
    {
      q: "Comment se déroulent l'évaluation et la remise de diplôme ?",
      a: "La validation s'appuie sur un examen théorique écrit en fin de parcours ainsi que sur une mise en situation pratique (stage d'observation ou d'animation d'une classe virtuelle sur Zoom). Un diplôme officiel de l'Institut ISHES est remis aux élèves ayant validé l'évaluation."
    },
    {
      q: "Proposez-vous des facilités de paiement ?",
      a: "Absolument. Nous comprenons que l'investissement dans une formation professionnelle est important. C'est pourquoi nous proposons des options d'étalement de paiement allant jusqu'à 10 mensualités sans aucun frais."
    },
    {
      q: "Quel est le rythme de travail et la durée de la formation ?",
      a: "La formation théorique s'étale sur environ 20 heures de cours en ligne, complétées par des sessions de stage pratique et de suivi personnalisé. Le rythme est conçu pour être parfaitement compatible avec une activité professionnelle ou des études à plein temps."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-green selection:text-white pb-0">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-32 md:pt-56 md:pb-48 overflow-hidden">
        <ArabicBackground />
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] bg-ishes-green/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[95px] font-black text-ishes-dark leading-[0.9] tracking-tighter mb-10 uppercase"
            >
              <span className="block">Devenez</span>
              <span className="text-ishes-green italic whitespace-nowrap">Enseignant certifié.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 font-medium leading-relaxed"
            >
              Transmettez le savoir avec excellence. Nos formations diplômantes vous ouvrent les portes d'une pédagogie moderne et reconnue.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white/60 backdrop-blur-sm relative z-20"
            >
              <iframe 
                className="w-full aspect-video bg-[#101828]"
                src="https://www.youtube.com/embed/8QiflPosqYU?si=TnSm478CtqEXACvl" 
                title="Présentation de la Formation Enseignant" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* --- CHIFFRES CLES --- */}
      <section className="relative z-20 -mt-16 mb-16 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 text-center">
            <h3 className="text-4xl font-black text-ishes-dark mb-2">15+</h3>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">années d'expérience dans la formation d'enseignants</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-100"></div>
          <div className="flex-1 text-center">
            <h3 className="text-4xl font-black text-ishes-green mb-2">Méthode</h3>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">exclusive "Les Clés du Coran"</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-100"></div>
          <div className="flex-1 text-center">
            <h3 className="text-4xl font-black text-ishes-dark mb-2">100%</h3>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Accompagnement avant, pendant et après</p>
          </div>
        </div>
      </section>

      {/* --- STORYTELLING : VOCATION, PROBLÈME, SOLUTION --- */}
      <section className="pt-20 pb-10 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8 md:space-y-12">
            
            {/* Hook Vocation */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-ishes-dark mb-6 tracking-tight leading-tight">
                Transmettre est <span className="text-ishes-green italic">plus qu'un métier</span>,<br/>c'est une vocation.
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
                Apprendre à lire le Coran, éduquer selon les principes islamiques ou transmettre la langue arabe est l'une des missions les plus nobles qui soient.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problème */}
              <div className="bg-[#fcfaf7] p-8 md:p-10 rounded-[2rem] border border-[#f5f0e6] shadow-sm">
                <h3 className="text-2xl font-black text-[#8b7355] mb-4">Savoir ≠ Enseigner</h3>
                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                  Avoir des connaissances est une chose. Savoir les transmettre avec pédagogie, capter l'attention de ses élèves et structurer un cours en est une autre. <strong className="text-ishes-dark">Sans une méthode claire, on risque l'échec et le découragement.</strong>
                </p>
              </div>

              {/* Solution */}
              <div className="bg-[#f2f7f4] p-8 md:p-10 rounded-[2rem] border border-[#e0ece5] shadow-sm">
                <h3 className="text-2xl font-black text-[#4a7c59] mb-4">Méthodologie & Légitimité</h3>
                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                  Nos formations vous apportent des méthodes éprouvées (Nour Al Bayan, Tarbya) pour enseigner avec excellence. À l'issue du cursus, une <strong className="text-ishes-dark">certification asseoit votre légitimité</strong> auprès des instituts et des parents.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FORMATIONS SECTION --- */}
      <section className="pt-20 md:pt-32 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-24">
            
            {formations.map((f, idx) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] grid lg:grid-cols-12 gap-16 items-start"
              >
                  {/* Left Column (span 5) */}
                  <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 self-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-[.25em] px-3 py-1 rounded-md ${f.badgeColor}`}>
                          {f.subtitle}
                        </span>
                        {f.availableRemote && (
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                            <Monitor className="w-3.5 h-3.5" /> En distanciel
                          </div>
                        )}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-ishes-dark tracking-tight leading-tight uppercase">
                        {f.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 pt-2">
                         {f.tags.map(tag => (
                           <span key={tag} className="text-[10px] font-bold text-gray-400 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                         ))}
                      </div>
                    </div>
 
                    <p className="text-gray-500 text-lg leading-relaxed font-medium bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      {f.description}
                    </p>
 
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-white p-5 rounded-2xl border border-gray-100/50 shadow-sm">
                        <CreditCard className="w-6 h-6 text-ishes-green mb-3" strokeWidth={1.5} />
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Flexibilité</div>
                        <div className="text-sm font-black text-ishes-dark">{f.paymentTerms}</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100/50 shadow-sm">
                        <FileText className="w-6 h-6 text-ishes-green mb-3" strokeWidth={1.5} />
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Investissement</div>
                        <div className="text-sm font-black text-ishes-dark uppercase tracking-wide">{f.pricing}</div>
                      </div>
                    </div>
 
                    <Link 
                      href="/contact" 
                      className="flex items-center justify-center gap-3 bg-[#008953] hover:bg-[#007044] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl shadow-[#008953]/20 group w-full"
                    >
                      Demander un devis personnalisé
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
 
                  {/* Right Column (span 7) */}
                  <div className="lg:col-span-7 space-y-12 bg-gray-50/30 p-8 md:p-12 rounded-[2rem] border border-gray-100/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-ishes-green">
                      <GraduationCap className="w-32 h-32" strokeWidth={1} />
                    </div>
 
                    {f.modules && (
                      <div className="mb-12 relative z-10">
                        <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-8">Les 3 Modules de la Formation</h3>
                        <div className="space-y-6">
                          {f.modules.map((m: any, i: number) => (
                             <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                               <h4 className="text-[15px] font-black text-ishes-dark mb-2">{m.title}</h4>
                               <p className="text-sm font-medium text-gray-500 leading-relaxed">{m.desc}</p>
                             </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {f.pourQui && (
                      <div className="mb-12 relative z-10">
                        <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-6">Pour Qui ?</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {f.pourQui.map((item: string, i: number) => (
                            <div key={i} className="flex gap-3 items-center bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm">
                              <CheckCircle2 className="w-4 h-4 text-ishes-green shrink-0" />
                              <p className="text-xs font-bold text-gray-600 leading-snug">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {f.supports && (
                      <div className="mb-12 relative z-10 bg-green-50 p-6 rounded-2xl border border-green-100">
                        <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-2">Supports Inclus</h3>
                        <p className="text-sm font-bold text-ishes-dark">{f.supports}</p>
                      </div>
                    )}

                    {f.accompagnement && (
                      <div className="mb-12 relative z-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h3 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-2">Suivi Post-Formation</h3>
                        <p className="text-sm font-bold text-blue-900">{f.accompagnement}</p>
                      </div>
                    )}

                    {f.deroulement && (
                      <div className="mb-12 relative z-10">
                        <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-8">Déroulement</h3>
                        <div className="space-y-6">
                          {f.deroulement.map((item, i) => (
                             <div key={i} className="flex gap-4 items-start">
                               <div className="w-8 h-8 rounded-xl bg-ishes-green/10 flex items-center justify-center shrink-0 text-xs font-black text-ishes-green">{i + 1}</div>
                               <p className="text-[15px] font-bold text-gray-600 leading-snug">{item}</p>
                             </div>
                          ))}
                        </div>
                      </div>
                    )}
 
                    <div className="relative z-10">
                      <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-8">Objectifs de la formation</h3>
                      <div className="space-y-4">
                        {f.objectifs.map((obj, i) => (
                          <div key={i} className="flex gap-4 items-start py-4 border-b border-gray-100/50 last:border-0">
                            <CheckCircle2 className="w-5 h-5 text-ishes-green shrink-0 mt-0.5" />
                            <p className="text-base font-black text-ishes-dark leading-snug">{obj}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
               </motion.div>
            ))}
 
          </div>
        </div>
      </section>
 
      {/* --- REASSURANCE --- */}
      <section className="bg-ishes-green/5 py-24 border-y border-ishes-green/10 relative overflow-hidden">
        <ArabicBackground />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-ishes-green/10 text-ishes-green rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ishes-dark mb-6 tracking-tight uppercase">Besoin de plus d'informations ?</h2>
          <p className="text-xl text-gray-400 font-medium mb-12">
            Nos conseillers pédagogiques sont à votre disposition pour vous guider dans votre projet professionnel.
          </p>
          <div className="flex justify-center">
            <Link href="/contact" className="bg-[#008953] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#007044] transition-all hover:shadow-xl shadow-[#008953]/20 hover:-translate-y-1">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#008953] font-black uppercase tracking-[0.25em] text-xs mb-4 block">Questions Fréquentes</span>
            <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-none tracking-tight uppercase">
              Tout savoir sur la <span className="text-[#008953] italic">certification.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 bg-[#fafafa]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-black text-ishes-dark text-lg hover:text-[#008953] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronRight 
                      className={`w-5 h-5 text-[#008953] transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t border-gray-100/50 p-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    } bg-white text-gray-500 font-medium leading-relaxed text-sm whitespace-pre-line`}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
