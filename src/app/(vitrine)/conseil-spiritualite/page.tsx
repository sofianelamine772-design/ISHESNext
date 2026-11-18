"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Heart, Mail, ShieldCheck, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { faqJsonLd } from "@/lib/seo";

const CONSEIL_SPIRITUALITE_FAQS = [
  {
    question: "Comment poser une question de spiritualité musulmane à un enseignant de l’Institut ISHES ?",
    answer:
      "Il suffit de passer par la page de contact de l’Institut ISHES et d’exposer votre interrogation. Votre demande est transmise aux enseignants en spiritualité musulmane, qui vous répondent pour vous orienter dans votre cheminement. Vous pouvez formuler une question précise ou décrire plus largement une difficulté : doute, perte de sens, pratique à structurer. Aucune connaissance préalable n’est requise pour écrire.",
  },
  {
    question: "Demander un conseil spirituel à l’Institut ISHES est-il gratuit ?",
    answer:
      "La prise de contact avec l’Institut ISHES est gratuite et sans engagement. Vous écrivez via la page de contact, un enseignant en spiritualité prend connaissance de votre demande et vous oriente. Il ne s’agit ni d’une inscription à une formation ni d’un engagement : si vous souhaitez ensuite approfondir avec un cursus (Tarbiya islamique, Fiqh mâlikite), l’équipe vous l’indique, mais rien n’est imposé.",
  },
  {
    question: "Mes questions de spiritualité restent-elles confidentielles ?",
    answer:
      "Oui. Toutes les interrogations adressées aux enseignants de l’Institut ISHES sont traitées avec la plus grande discrétion. Les enseignants respectent une charte éthique de confidentialité pour chaque personne accompagnée. Les informations transmises servent uniquement à répondre à votre demande : elles ne sont ni utilisées ni transmises à des fins de démarchage commercial.",
  },
  {
    question: "Quelles questions peut-on poser à un conseiller en spiritualité islamique ?",
    answer:
      "Toute question liée au cheminement intérieur : mieux comprendre les fondements de l’islam, saisir le sens profond des adorations (prière, jeûne, invocation), donner du sens à sa pratique quotidienne, traverser une période de doute ou de baisse de motivation, ou simplement savoir par où commencer pour approfondir sa foi. Les enseignants de l’Institut ISHES répondent avec bienveillance et savoir, sans jugement.",
  },
  {
    question: "Peut-on demander conseil en spiritualité quand on débute ou que l’on a des doutes ?",
    answer:
      "Oui, c’est même l’une des raisons d’être de cet accompagnement. La spiritualité musulmane est un voyage personnel qui nécessite parfois un éclairage extérieur. À l’Institut ISHES, chaque question mérite une réponse empreinte de bienveillance : celle d’un débutant qui structure sa pratique comme celle d’un pratiquant confronté à des doutes ou à une recherche de profondeur.",
  },
  {
    question: "Un conseil spirituel ISHES remplace-t-il un cours de Fiqh ou de sciences islamiques ?",
    answer:
      "Non. Le conseil spirituel aide à mettre des mots sur un ressenti et à ajuster sa pratique de manière équilibrée ; il ne remplace pas l’étude structurée. Pour les règles détaillées des adorations, l’Institut ISHES propose un cours de Fiqh mâlikite ; pour l’éducation du cœur, la formation de Tarbiya islamique. Le conseil ponctuel et le cursus se complètent : l’un éclaire, l’autre construit.",
  },
  {
    question: "Pourquoi demander conseil à un enseignant plutôt que chercher seul sur internet ?",
    answer:
      "Parce qu’un interlocuteur formé replace votre question dans votre situation réelle, là où une recherche en ligne renvoie des réponses contradictoires et hors contexte. Le cheminement spirituel est un processus continu : avoir un enseignant de l’Institut ISHES comme repère permet d’ajuster sa pratique de façon équilibrée et authentique, en évitant à la fois le relâchement et l’excès.",
  },
  {
    question: "Comment approfondir sa spiritualité musulmane au-delà d’un conseil ponctuel ?",
    answer:
      "L’Institut ISHES propose plusieurs prolongements : la formation de Tarbiya islamique (purification de l’âme, bon comportement), le module Les Fondamentaux de la Spiritualité inclus dans le Pack Accompagnement, les lives avec les fondateurs et les rappels publiés sur la chaîne YouTube de l’institut. Le conseiller peut vous indiquer, selon votre situation, par quelle étape commencer.",
  },
];

export default function ConseilSpiritualitePage() {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-ishes-blue selection:text-white pb-32">
      <JsonLd data={faqJsonLd(CONSEIL_SPIRITUALITE_FAQS)} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <ArabicBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-ishes-blue/[0.03] to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-ishes-gold/10 text-ishes-gold rounded-full mb-8 border border-ishes-gold/20"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Accompagnement Spirituel</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-ishes-dark leading-[1.05] tracking-tight mb-8"
            >
              Éclairez votre <span className="text-ishes-blue ">cheminement</span> intérieur.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-500 font-medium leading-[1.8] max-w-3xl mx-auto"
            >
              L’Institut ISHES vous accompagne dans votre quête de sens. Nos conseillers en spiritualité musulmane sont à votre écoute pour vous aider à approfondir votre foi, peu importe vos interrogations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            
            {/* Left: SEO Text & Context */}
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-black text-ishes-blue mb-6 tracking-tight">Questions relatives à la spiritualité</h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                   La spiritualité musulmane est un voyage personnel qui nécessite parfois un éclairage extérieur. À l'Institut ISHES, nous croyons que chaque question mérite une réponse empreinte de bienveillance et de savoir. 
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-medium mt-4">
                   Que vous soyez confronté à des doutes, à une recherche de profondeur ou simplement au besoin de mieux structurer votre pratique quotidienne, nos enseignants sont présents pour vous orienter.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <BookOpen />, text: "Comment mieux comprendre les fondements de l'Islam ?" },
                  { icon: <Sparkles />, text: "Saisir le sens profond des adorations religieuses." },
                  { icon: <Heart />, text: "Améliorer sa pratique au quotidien pour qu'elle ait un sens." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-14 h-14 rounded-2xl bg-ishes-blue/10 text-ishes-blue flex items-center justify-center shrink-0 group-hover:bg-ishes-blue group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <p className="text-lg font-bold text-ishes-dark leading-tight">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Card */}
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex"
            >
              <div className="bg-ishes-dark rounded-[3rem] p-10 md:p-16 text-white w-full flex flex-col justify-center relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-ishes-blue opacity-10 rounded-full blur-[80px]" />
                
                <h3 className="text-3xl font-black mb-8 relative z-10 leading-tight">Obtenir un conseil <br /> par email</h3>
                
                <p className="text-gray-400 text-lg font-medium mb-10 relative z-10">
                  Vous pouvez contacter nos enseignants en spiritualité musulmane qui essaieront de vous orienter dans votre cheminement.
                </p>

                <Link 
                  href="/fr/contact" 
                  className="inline-flex items-center justify-center gap-3 bg-ishes-blue hover:bg-ishes-blue-hover text-white px-10 py-5 rounded-2xl text-[16px] font-bold transition-all hover:scale-105 shadow-xl shadow-ishes-blue/20 relative z-10 group"
                >
                  Contacter un conseiller
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="mt-12 flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 relative z-10">
                  <ShieldCheck className="w-6 h-6 text-ishes-blue shrink-0 mt-1" />
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    Ces informations servent à répondre aux demandes des utilisateurs et ne sont pas utilisées ni transmises pour du démarchage.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FAQ / SEO BOTTOM --- */}
      <section className="bg-white py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <MessageCircle className="w-12 h-12 text-ishes-blue mx-auto mb-8 opacity-20" strokeWidth={1} />
          <h2 className="text-3xl font-black text-ishes-blue mb-10 tracking-tight">Une écoute bienveillante</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="font-bold text-ishes-blue mb-4">Pourquoi demander conseil ?</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Le cheminement spirituel est un processus continu. Avoir un interlocuteur formé permet de mettre des mots sur ses ressentis et d'ajuster sa pratique de manière équilibrée et authentique.</p>
            </div>
            <div>
              <h4 className="font-bold text-ishes-blue mb-4">Confidentialité</h4>
              <p className="text-gray-500 font-medium leading-relaxed">Toutes vos interrogations sont traitées avec la plus grande discrétion. Nos enseignants respectent une charte éthique de confidentialité absolue pour chaque étudiant.</p>
            </div>
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ Conseil spirituel"
        title="Questions sur l'accompagnement spirituel de l'Institut ISHES"
        intro="Comment demander conseil à un enseignant en spiritualité musulmane, dans quel cadre, et avec quelle confidentialité."
        items={CONSEIL_SPIRITUALITE_FAQS}
      />

    </div>
  );
}
