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
    link: "/fr/formation-enseignant-tajwid",
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
    badgeColor: "bg-ishes-blue/10 text-ishes-blue"
  },
  {
    id: "tarbya-islamya",
    link: "/fr/formation-enseignant-tarbya",
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
    badgeColor: "bg-ishes-blue/10 text-ishes-blue"
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
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-blue selection:text-white pb-0">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-32 md:pt-56 md:pb-48 overflow-hidden">
        <ArabicBackground />
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] bg-ishes-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[95px] font-black text-ishes-dark leading-[0.9] tracking-tighter mb-10 uppercase"
            >
              <span className="block text-ishes-gold">DEVENEZ</span>
              <span className="text-ishes-dark italic font-serif whitespace-nowrap">ENSEIGNANT CERTIFIÉ</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-black text-ishes-dark mb-6">
                Transmettre avec légitimité, amour, et pédagogie.
              </h2>
              <div className="space-y-4 text-lg text-gray-500 font-medium leading-relaxed">
                <p>
                  Vous aspirez à enseigner notre noble religion avec amour, légitimité et rigueur ? L'Institut ISHES vous forme à cette noble mission. Seul institut en France spécialisé dans la formation certifiante des enseignants en Tarbya Islamiyya et en Tajwid.
                </p>
                <p>
                  Formation au service des associations, mosquées ou familles
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left relative z-20"
            >
              {formations.map((f, idx) => (
                <div key={f.id} className="bg-ishes-dark rounded-[2.5rem] p-10 border border-ishes-gold/20 shadow-xl hover:shadow-2xl hover:border-ishes-gold/40 hover:-translate-y-2 transition-all duration-500 group relative flex flex-col h-full overflow-hidden items-center text-center">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-gold/5 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>

                  <div className="relative z-10 flex flex-col h-full w-full justify-between gap-12">
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mt-4 group-hover:text-ishes-gold transition-colors uppercase">
                      {f.title}
                    </h3>

                    <div className="flex flex-col items-center gap-6 w-full">
                      <span className="text-xl font-black text-white">{f.pricing}</span>
                      
                      <Link
                        href={f.link}
                        className="w-full py-4 rounded-2xl bg-[#E8DCC4] text-ishes-dark hover:bg-[#D5C6AA] font-black transition-all duration-300 text-sm uppercase tracking-widest text-center shadow-lg hover:-translate-y-1 hover:shadow-xl"
                      >
                        Voir le programme
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
            <h3 className="text-4xl font-black text-ishes-blue mb-2">Méthode</h3>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">exclusive "Les Clés du Coran"</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-100"></div>
          <div className="flex-1 text-center">
            <h3 className="text-4xl font-black text-ishes-dark mb-2">100%</h3>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Accompagnement avant, pendant et après</p>
          </div>
        </div>
      </section>





      {/* --- REASSURANCE --- */}
      <section className="bg-ishes-blue/5 py-24 border-y border-ishes-blue/10 relative overflow-hidden">
        <ArabicBackground />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-ishes-blue/10 text-ishes-blue rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ishes-dark mb-6 tracking-tight uppercase">Besoin de plus d'informations ?</h2>
          <p className="text-xl text-gray-400 font-medium mb-12">
            Nos conseillers pédagogiques sont à votre disposition pour vous guider dans votre projet professionnel.
          </p>
          <div className="flex justify-center">
            <Link href="/contact" className="bg-ishes-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#007044] transition-all hover:shadow-xl shadow-ishes-blue/20 hover:-translate-y-1">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-ishes-blue font-black uppercase tracking-[0.25em] text-xs mb-4 block">Questions Fréquentes</span>
            <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-none tracking-tight uppercase">
              Tout savoir sur la <span className="text-ishes-blue italic">certification.</span>
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
                    className="w-full flex items-center justify-between p-6 text-left font-black text-ishes-dark text-lg hover:text-ishes-blue transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-ishes-blue transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] border-t border-gray-100/50 p-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
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
