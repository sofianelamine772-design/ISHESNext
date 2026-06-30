"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Monitor, 
  ChevronRight,
  Globe,
  Wifi,
  Video,
  MousePointer2,
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  PlayCircle,
  Star,
  Award
} from 'lucide-react';
import { ArabicBackground } from '@/components/ArabicBackground';
import { Button } from '@/components/ui/button';

export default function CoursDistancePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-[#008953] selection:text-white pb-20">
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-white border-b border-gray-100">
        <ArabicBackground />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ishes-green/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-ishes-green transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-ishes-green">Cours à Distance</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-ishes-green/5 border border-ishes-green/20 rounded-full shadow-sm mb-2">
                <Globe className="w-4 h-4 text-ishes-green" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ishes-green">
                  L'excellence ISHES partout dans le monde
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-ishes-dark leading-[1.1] tracking-tight">
                Apprenez la science <br />
                <span className="text-ishes-green italic">d'où vous voulez.</span>
              </h1>

              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Profitez de la qualité de nos enseignements sans contrainte géographique. 
                Nos cours en ligne en direct vous offrent une expérience interactive, structurée et profondément humaine, 
                exactement comme si vous étiez en classe.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="#formations" 
                  className="w-full sm:w-auto bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1 active:scale-95 text-center"
                >
                  VOIR NOS COURS
                </Link>
                <div className="flex items-center gap-2 text-sm font-bold text-ishes-dark mt-4 sm:mt-0">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 shadow-sm flex items-center justify-center overflow-hidden`}>
                         {/* Fallback color if image not found handled by css */}
                         <div className="w-full h-full bg-[#c8a96e] text-white flex items-center justify-center text-xs">{i}</div>
                      </div>
                    ))}
                  </div>
                  <span className="pl-4">Rejoignez +500 élèves</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-[500px] relative"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-ishes-green to-[#c8a96e] rounded-[3rem] rotate-3 blur-xl opacity-20" />
               <div className="w-full aspect-[4/3] bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
                  <Image src="/images/institut-ishes-accueil-hero.png" alt="Cours" fill className="object-cover" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-white">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="px-3 py-1 bg-red-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                         <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> EN DIRECT
                       </span>
                    </div>
                    <h3 className="text-2xl font-black mb-1">Cours Interactifs</h3>
                    <p className="text-white/80 text-sm font-medium">Une pédagogie certifiée et adaptée au distanciel.</p>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer group-hover:scale-110 transition-transform shadow-2xl">
                        <PlayCircle className="w-10 h-10 text-white ml-1" />
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE (ZOOM & ESPACE) ─── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-ishes-green font-black uppercase tracking-[0.25em] text-xs mb-4 block">La Technologie au Service du Savoir</span>
            <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-none tracking-tight">
              Une expérience <span className="text-[#008953] italic">immersive.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
             {/* Left: Espace Eleve */}
             <div className="space-y-12">
               
               <div className="flex gap-6">
                 <div className="w-16 h-16 shrink-0 bg-[#0b5cff]/10 rounded-2xl flex items-center justify-center">
                    <img src="/images/Zoom-Logo.png" alt="Zoom" className="w-10 h-10 object-contain" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-ishes-dark mb-2">Des cours 100% en direct sur Zoom</h3>
                   <p className="text-gray-500 font-medium leading-relaxed">
                     L'apprentissage nécessite une interaction. Nos enseignants dispensent leurs cours en direct via Zoom, avec caméra, partage d'écran et tableau blanc virtuel. Vous pouvez lever la main, poser vos questions oralement ou par le chat.
                   </p>
                 </div>
               </div>

               <div className="flex gap-6">
                 <div className="w-16 h-16 shrink-0 bg-ishes-green/10 rounded-2xl flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-ishes-green" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-ishes-dark mb-2">Cours disponibles en replay</h3>
                   <p className="text-gray-500 font-medium leading-relaxed">
                     Vous avez manqué un cours ou vous souhaitez réviser ? Pas de panique. Chaque séance est enregistrée et disponible en replay pour vous permettre de progresser à votre rythme.
                   </p>
                 </div>
               </div>

               <div className="flex gap-6">
                 <div className="w-16 h-16 shrink-0 bg-[#25D366]/10 rounded-2xl flex items-center justify-center">
                    <img src="/images/whatsapp-logo.avif" alt="WhatsApp" className="w-8 h-8 object-contain rounded-full" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-ishes-dark mb-2">Accompagnement continu</h3>
                   <p className="text-gray-500 font-medium leading-relaxed">
                     L'isolement est le plus grand risque de l'apprentissage à distance. C'est pourquoi chaque classe dispose de son groupe WhatsApp exclusif pour échanger avec le professeur et les camarades de classe toute la semaine.
                   </p>
                 </div>
               </div>
               
             </div>

             {/* Right: Visual Mockup */}
             <div className="relative">
                <div className="absolute inset-0 bg-ishes-green/5 rounded-[3rem] -rotate-3 scale-105" />
                <div className="bg-ishes-dark p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border border-gray-800">
                   <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                   </div>
                   
                   <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ishes-green to-[#c8a96e]" />
                         <div>
                            <div className="h-4 w-32 bg-white/20 rounded-full mb-2" />
                            <div className="h-3 w-20 bg-white/10 rounded-full" />
                         </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 w-full bg-white/10 rounded-full" />
                        <div className="h-3 w-[80%] bg-white/10 rounded-full" />
                        <div className="h-3 w-[90%] bg-white/10 rounded-full" />
                      </div>
                   </div>

                   <div className="bg-ishes-green/20 rounded-2xl p-6 border border-ishes-green/30 text-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <Video className="w-6 h-6 text-ishes-green" />
                         <span className="font-bold">Rejoindre le cours</span>
                      </div>
                      <span className="px-3 py-1 bg-ishes-green text-[10px] font-black uppercase tracking-widest rounded-full">En cours</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── NOS FORMATIONS À DISTANCE ─── */}
      <section id="formations" className="py-24 px-6 bg-[#f7f5f0] border-y border-[#eeebe2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-none tracking-tight">
              Nos programmes <span className="text-[#c8a96e] italic">phares</span>
            </h2>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto font-medium text-lg">
              Des cursus complets et structurés pour vous accompagner dans votre cheminement, quel que soit votre niveau.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Carte Arabe */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#c8a96e]/10 text-[#c8a96e] rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform">
                 <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-ishes-dark mb-3">Langue Arabe</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-1">
                 Apprenez à lire, écrire et comprendre l'arabe avec des méthodes reconnues (Méthode de Médine, Al-Arabiya Bayna Yadayk). De l'alphabétisation à la maîtrise, nous avons le niveau qu'il vous faut.
              </p>
              <div className="space-y-2 mb-8 text-sm font-bold text-gray-700">
                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-ishes-green" /> Session annuelle ou intensive</div>
                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-ishes-green" /> Professeurs natifs ou bilingues</div>
              </div>
              <Link href="/program" className="block w-full text-center py-4 rounded-xl bg-ishes-dark text-white font-black hover:bg-black transition-colors">
                 Détails du programme
              </Link>
            </div>

            {/* Carte Sciences Islamiques */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ishes-green/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-ishes-green/10 text-ishes-green rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform relative z-10">
                 <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-ishes-dark mb-3 relative z-10">Sciences Islamiques</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-1 relative z-10">
                 Étudiez la croyance (Aqida), la jurisprudence (Fiqh) et l'éducation spirituelle (Tarbiyya) avec des enseignants certifiés. Un apprentissage structuré basé sur les sources authentiques.
              </p>
              <div className="space-y-2 mb-8 text-sm font-bold text-gray-700 relative z-10">
                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-ishes-green" /> Cursus modulaire ou complet</div>
                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-ishes-green" /> Évaluations continues</div>
              </div>
              <Link href="/program" className="block w-full text-center py-4 rounded-xl bg-ishes-green text-white font-black hover:bg-ishes-green-hover transition-colors relative z-10">
                 Détails du programme
              </Link>
            </div>

            {/* Carte Coran */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
              <div className="w-14 h-14 bg-[#4a7c59]/10 text-[#4a7c59] rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform">
                 <Award className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-ishes-dark mb-3">Coran & Tajwid</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-1">
                 Améliorez votre récitation, apprenez les règles de Tajwid ou entamez un programme de mémorisation (Hifz) avec un suivi personnalisé et une correction précise.
              </p>
              <div className="space-y-2 mb-8 text-sm font-bold text-gray-700">
                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-ishes-green" /> Correction Al-Fatiha</div>
                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-ishes-green" /> Groupes restreints (suivi optimal)</div>
              </div>
              <Link href="/program" className="block w-full text-center py-4 rounded-xl bg-ishes-dark text-white font-black hover:bg-black transition-colors">
                 Détails du programme
              </Link>
            </div>

          </div>
          
          <div className="mt-16 text-center">
             <Link href="/program" className="inline-flex items-center gap-2 text-ishes-green font-black hover:underline underline-offset-4 decoration-2">
                Voir toutes nos formations à distance <ChevronRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* ─── POURQUOI LE DISTANCIEL ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <Image src="/images/institut-ishes-accueil-hero.png" alt="Etudiante" width={600} height={600} className="rounded-[3rem] object-cover aspect-square shadow-2xl" />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl max-w-xs border border-gray-100 hidden md:block">
                   <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-[#c8a96e] fill-current" />)}
                   </div>
                   <p className="text-gray-600 text-sm font-medium italic">"L'organisation est parfaite, les professeurs sont passionnés, on se sent vraiment accompagnés même à travers l'écran."</p>
                   <p className="mt-3 font-bold text-ishes-dark text-xs uppercase">— Sarah M.</p>
                </div>
             </div>

             <div className="space-y-8">
               <h2 className="text-4xl font-black text-ishes-dark leading-tight">
                 Le distanciel sans <span className="text-ishes-green italic">les inconvénients.</span>
               </h2>
               <p className="text-gray-500 font-medium text-lg leading-relaxed">
                 Chez ISHES, nous avons conçu notre plateforme pour pallier les défauts habituels de l'apprentissage en ligne. 
               </p>

               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-ishes-green/10 flex items-center justify-center shrink-0 mt-1">
                       <Users className="w-5 h-5 text-ishes-green" />
                    </div>
                    <div>
                       <h4 className="font-bold text-ishes-dark text-lg">Groupes à taille humaine</h4>
                       <p className="text-gray-500 text-sm">Pas d'amphithéâtres virtuels de 200 personnes. Nos classes sont restreintes pour garantir la participation de chacun.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-ishes-green/10 flex items-center justify-center shrink-0 mt-1">
                       <Calendar className="w-5 h-5 text-ishes-green" />
                    </div>
                    <div>
                       <h4 className="font-bold text-ishes-dark text-lg">Assiduité et suivi</h4>
                       <p className="text-gray-500 text-sm">Un appel est fait à chaque début de cours. Le suivi de présence est rigoureux pour encourager la constance.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-ishes-green/10 flex items-center justify-center shrink-0 mt-1">
                       <MessageCircle className="w-5 h-5 text-ishes-green" />
                    </div>
                    <div>
                       <h4 className="font-bold text-ishes-dark text-lg">Disponibilité du professeur</h4>
                       <p className="text-gray-500 text-sm">Votre enseignant reste accessible via la communauté WhatsApp pour répondre à vos doutes tout au long de la semaine.</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto bg-ishes-dark rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-ishes-green/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Prêt à commencer <br />
              <span className="text-ishes-green italic">votre apprentissage ?</span>
            </h2>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Rejoignez l'Institut ISHES aujourd'hui et donnez à votre foi les bases solides qu'elle mérite.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/program" className="bg-ishes-green hover:bg-ishes-green-hover text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-ishes-green/20 hover:-translate-y-1">
                 PARCOURIR LES FORMATIONS
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-black transition-all border border-white/10 backdrop-blur-sm">
                 NOUS CONTACTER
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
