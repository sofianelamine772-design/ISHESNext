"use client";

import { motion } from "framer-motion";
import { Users, Heart, MessageCircle, BookOpen, Gift, CheckCircle2, Wifi, FileCheck, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArabicBackground } from "@/components/ArabicBackground";

export default function PackAccompagnementPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-0">
      {/* HERO SECTION */}
      <section className="relative pt-44 pb-32 md:pt-48 md:pb-40 overflow-hidden bg-[#fafafa]">
        {/* Faded Background Image */}
        <div className="absolute right-0 top-0 w-full lg:w-[65%] h-full z-0 opacity-90">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa]/90 to-transparent z-10 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent z-10" />
          
          <Image 
            src="/images/pack-hero.png" 
            alt="Pack Accompagnement Hero" 
            fill 
            className="object-cover object-right"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl relative">
            <span className="text-ishes-gold font-black uppercase tracking-widest text-xs block mb-4">
              INCLUS AVEC CHAQUE FORMATION
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-ishes-dark leading-[1.05] tracking-tight mb-4">
              Tu ne t'inscris pas seulement à une plateforme. <br />
              <span className="text-ishes-gold italic font-serif">Tu rejoins une communauté qui t'accompagne dans ton cheminement.</span>
            </h1>
            
            <div className="flex items-center gap-2 mb-8 mt-6">
              <div className="w-12 h-px bg-ishes-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
            </div>

            <p className="text-lg text-[#3d4b60] font-medium leading-relaxed max-w-lg mb-10">
              Chez ISHES, nous croyons qu'une heure de cours par semaine ne suffit pas à transformer une vie. C'est pourquoi chaque étudiant bénéficie d'un accompagnement pensé pour l'aider à progresser toute l'année, entouré, soutenu et guidé.
            </p>

            <div className="bg-[#fdfaf5] border border-ishes-gold/20 rounded-[2rem] p-6 flex items-start gap-5 shadow-sm max-w-xl">
              <div className="w-12 h-12 rounded-full bg-ishes-gold/10 flex items-center justify-center shrink-0 text-ishes-gold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-ishes-dark mb-1 leading-tight">OUVERT AUX ÉTUDIANTS ET AUX PARENTS QUI INSCRIVENT UN ENFANT (PRÉSENTIEL OU À DISTANCE)</h3>
                <p className="text-sm text-gray-500 font-medium">Un même accompagnement pour toute la famille ISHES.</p>
              </div>
            </div>

            {/* Floating Price Badge for Desktop */}
            <div className="absolute top-10 -right-24 lg:-right-48 hidden md:flex flex-col items-center justify-center w-64 h-64 bg-ishes-dark rounded-full border border-white/10 shadow-2xl z-20 text-center p-6 hover:scale-105 transition-transform duration-500">
              <div className="text-[10px] font-black uppercase tracking-widest text-ishes-gold mb-2">UNE VALEUR RÉELLE DE</div>
              <div className="text-3xl font-black text-white mb-2 relative">
                <span className="line-through text-white/50">399 €</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white mb-1">POUR SEULEMENT</div>
              <div className="text-5xl font-black text-ishes-gold mb-1">49 €</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-4">POUR 1 AN</div>
              <div className="w-10 h-10 rounded-full border border-ishes-gold/30 flex items-center justify-center text-ishes-gold mt-2">
                <Gift className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-24 bg-[#fcfaf7]">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="absolute -top-10 left-0 text-9xl text-ishes-gold/10 font-serif leading-none">"</div>
          <div className="absolute -bottom-20 right-0 text-9xl text-ishes-gold/10 font-serif leading-none">"</div>
          
          <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight relative z-10">
            Un institut ne doit pas être une plateforme.<br />
            Il doit être <span className="text-ishes-gold italic font-serif">une présence.</span>
          </h2>
        </div>
      </section>

      {/* FEATURES CARDS */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-6">Ce que comprend ton Pack Accompagnement</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-px bg-ishes-gold"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-ishes-gold"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#f9f5f0] rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col relative group">
              <div className="h-56 relative overflow-hidden">
                <Image src="/images/pack-card-1.png" alt="Communauté" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 pt-12 relative flex-1">
                <div className="absolute -top-10 left-8 w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center border-4 border-[#f9f5f0] shadow-md text-ishes-gold">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-ishes-dark mb-6">Une communauté <br />qui t'élève</h3>
                <ul className="space-y-4">
                  {[
                    "Groupe WhatsApp privé",
                    "Rappels & motivation",
                    "Préparation de Ramadan",
                    "Échanges entre étudiants et parents"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-800 leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f9f5f0] rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col relative group">
              <div className="h-56 relative overflow-hidden">
                <Image src="/images/pack-card-2.png" alt="Coran" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 pt-12 relative flex-1">
                <div className="absolute -top-10 left-8 w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center border-4 border-[#f9f5f0] shadow-md text-ishes-gold">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-ishes-dark mb-4">Nourrir ton cœur</h3>
                <div className="text-xs font-bold uppercase tracking-wider text-ishes-gold mb-2">Le module exclusif</div>
                <div className="font-bold text-ishes-dark mb-4">Les Fondamentaux de la Spiritualité</div>
                <div className="text-sm text-gray-600 font-medium mb-4">4 séances essentielles pour :</div>
                <ul className="space-y-4">
                  {[
                    "Purifier ton intention",
                    "Comprendre les niveaux de la religion",
                    "Construire une progression vers Allah"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-800 leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f9f5f0] rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col relative group">
              <div className="h-56 relative overflow-hidden">
                <Image src="/images/pack-card-3.png" alt="Lives" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 pt-12 relative flex-1">
                <div className="absolute -top-10 left-8 w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center border-4 border-[#f9f5f0] shadow-md text-ishes-gold">
                  <Wifi className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-ishes-dark mb-6">Un accès privilégié <br />aux fondateurs</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4">
                  Chaque mois, des lives privés avec Oustedha Rachida et Oustedh Riad.
                </p>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Tes questions, leurs conseils, tes échanges, ta progression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARK SECTION */}
      <section className="py-24 bg-ishes-dark relative overflow-hidden">
        <ArabicBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-ishes-dark via-ishes-dark/95 to-transparent z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-ishes-gold text-xs font-black uppercase tracking-widest mb-4">POURQUOI AVONS-NOUS CRÉÉ CE PACK ?</div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Nous ne voulons pas former des élèves qui suivent des cours.<br />
              <span className="text-ishes-gold italic font-serif">Nous voulons former des hommes et des femmes qui cheminent.</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <Users className="w-10 h-10 text-ishes-gold mb-4 mx-auto sm:mx-0" />
              <p className="text-sm text-white/80 font-medium leading-relaxed">Parce qu'un institut ne devrait pas être une simple plateforme de vidéos.</p>
            </div>
            <div className="text-center sm:text-left">
              <Heart className="w-10 h-10 text-ishes-gold mb-4 mx-auto sm:mx-0" />
              <p className="text-sm text-white/80 font-medium leading-relaxed">Il devrait être une présence. Une communauté.</p>
            </div>
            <div className="text-center sm:text-left">
              <BookOpen className="w-10 h-10 text-ishes-gold mb-4 mx-auto sm:mx-0" />
              <p className="text-sm text-white/80 font-medium leading-relaxed">Un lieu où l'on revient lorsque la motivation baisse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-16">Comment ça fonctionne ?</h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gray-300 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { icon: FileCheck, num: "1", text: "Tu t'inscris à une formation annuelle." },
                { icon: Users, num: "2", text: "Lors de ton inscription, on te propose le Pack Accompagnement." },
                { icon: MessageCircle, num: "3", text: "Tu échanges avec la communauté et reçois des rappels et conseils." },
                { icon: Wifi, num: "4", text: "Tu participes aux lives mensuels avec les fondateurs." },
                { icon: TrendingUp, num: "5", text: "Tu progresses toute l'année, dans un cadre bienveillant." }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center relative">
                  <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-400 mb-6 relative">
                    <step.icon className="w-8 h-8" />
                    <div className="absolute -bottom-3 w-6 h-6 bg-ishes-dark text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border-2 border-white">{step.num}</div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium px-2 leading-relaxed max-w-[150px]">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pb-24 pt-12 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#f9f5f0] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <div className="p-10 md:p-16 flex-1 relative">
              <h3 className="text-2xl md:text-3xl font-black text-ishes-dark mb-8">
                Une valeur réelle <br />de plus de <span className="text-ishes-gold">399 €</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Communauté privée active toute l'année",
                  "Module exclusif : Les Fondamentaux de la Spiritualité",
                  "Lives mensuels privés avec les fondateurs",
                  "Questions & accompagnement",
                  "Un soutien constant pour toi et ta famille"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-gray-800 leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-ishes-dark p-10 md:p-16 flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">PACK ACCOMPAGNEMENT</div>
              <div className="text-5xl font-black text-ishes-gold mb-4">49 € <span className="text-2xl text-white/50">/ AN</span></div>
              <p className="text-sm text-white/80 font-medium leading-relaxed mb-10 max-w-sm">
                Un engagement symbolique pour un accompagnement exceptionnel.
              </p>
              <Link href="/program" className="bg-ishes-gold hover:brightness-95 text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 max-w-fit shadow-lg shadow-ishes-gold/20 hover:scale-105">
                JE DÉCOUVRE LES FORMATIONS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <Gift className="w-48 h-48 text-white" />
              </div>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-500 font-medium">
            Ouvert aux étudiants et aux parents qui inscrivent un enfant en présentiel ou à distance.
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative py-32 overflow-hidden">
        <Image src="/images/pack-footer.png" alt="Etudiants" fill className="object-cover" />
        <div className="absolute inset-0 bg-ishes-dark/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            Tu ne rejoins pas seulement un institut.<br />
            <span className="text-ishes-gold italic font-serif">Tu rejoins une famille qui prie pour ta réussite, répond à tes questions et t'accompagne jusqu'au bout.</span>
          </h2>
          <p className="text-lg text-white/80 font-medium mb-10 max-w-2xl mx-auto">
            Parce que l'objectif n'est pas seulement que tu apprennes.<br />
            L'objectif est que tu progresses durablement dans ta relation avec Allah.
          </p>
          <Link href="/program" className="bg-ishes-gold hover:brightness-95 text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-xl shadow-ishes-gold/20 hover:scale-105">
            JE DÉCOUVRE LES FORMATIONS
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
