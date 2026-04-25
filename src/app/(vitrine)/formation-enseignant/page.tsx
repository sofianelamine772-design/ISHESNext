"use client";
 
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Monitor, CreditCard, ChevronRight, FileText, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";
 
const formations = [
  {
    id: "nour-al-bayan",
    title: "Diplôme TAJWID",
    subtitle: "Formation Nour Al Bayan",
    availableRemote: true,
    paymentTerms: "Jusqu'à 10x sans frais",
    tags: ["Arrangement du Coran", "La science du Mecquois"],
    description: "L'enseignement à la méthodologie Nour Al Bayan est destiné aux enseignants et aux adultes qui souhaitent enseigner la lecture et la récitation du Saint Coran suivant cette méthode reconnue. L'Institut dispose de formateurs spécialisés depuis plusieurs années dans l'enseignement de cette méthode.",
    objectifs: [
      "Redéfinir l'intention de devenir enseignant de la méthode Nour Al Bayan",
      "Formation à la méthode d'enseignement Nour Al Bayan Kids à destination des enfants",
      "Formation à la méthode d'enseignement Nour Al Bayan à destination des adultes",
      "Tarbya Bil Houb, éducation à la bienveillance dans la transmission du savoir",
      "Enseignement de la pédagogie niveau 1, 2 et 3 : Fath Rahman, Fath Rabbani / Sifat El Hourous",
      "Maîtrise du Tajwid"
    ],
    pricing: "Devis personnalisé",
    format: "Enseignement à distance",
    badgeColor: "bg-ishes-green/10 text-ishes-green"
  },
  {
    id: "tarbya-islamya",
    title: "Diplôme Tarbya Islamya",
    subtitle: "Formation Tarbya Islamya",
    availableRemote: true,
    paymentTerms: "Jusqu'à 10x sans frais",
    tags: ["Formation Nour Al Bayan", "La science du Mecquois"],
    description: "L'enseignement Tarbya Islamya est destiné aux adultes souhaitant enseigner aux enfants une pédagogie adaptée dont l'objectif est de préserver la \"Fitra\" (la nature saine). La formation se déroulera sur plusieurs semaines (environ 5 mois).",
    deroulement: [
      "20h de formation",
      "Stage pratique dans notre Institut à distance (avec une classe en Tarbya Islamya sur ZOOM)",
      "10h de suivi pratique post-formation (pendant votre mise en pratique) par votre enseignant formateur"
    ],
    objectifs: [
      "Formation théorique (les fondamentaux de la religion)",
      "Formation pratique (méthodologie d'enseignement à destination de jeunes enfants et adolescents)",
      "Accès aux supports pédagogiques des cours (affichages, vidéos, livre de Dou'a, etc.)",
      "Contenus vidéos des cours que nous proposons",
      "Examen final"
    ],
    pricing: "Devis personnalisé",
    format: "Enseignement à distance",
    badgeColor: "bg-[#008953]/10 text-[#008953]"
  }
];
 
export default function FormationEnseignantPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-green selection:text-white">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-20 md:pt-56 md:pb-32 overflow-hidden">
        <ArabicBackground />
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] bg-ishes-green/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-ishes-dark leading-[1.02] tracking-tight mb-10 uppercase"
            >
              Devenez <br />
              <span className="text-ishes-green italic">enseignant</span> certifié.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 font-medium leading-relaxed"
            >
              Transmettez le savoir avec excellence. Nos formations diplômantes vous ouvrent les portes d'une pédagogie moderne et reconnue.
            </motion.p>
          </div>
        </div>
      </section>
 
      {/* --- FORMATIONS SECTION --- */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-24">
            
            {formations.map((f, idx) => (
              <motion.div 
                key={f.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                {/* Visual / Info Left */}
                <div className="space-y-8 bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
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
                    className="flex items-center justify-center gap-3 bg-ishes-dark hover:bg-black text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl shadow-ishes-dark/10 group w-full"
                  >
                    Demander un devis personnalisé
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
 
                {/* Content / Objectives Right */}
                <div className="bg-ishes-dark rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-20 transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <GraduationCap className="w-32 h-32" strokeWidth={1} />
                  </div>
 
                  {f.deroulement && (
                    <div className="mb-12 relative z-10">
                      <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-8">Déroulement</h3>
                      <div className="space-y-6">
                        {f.deroulement.map((item, i) => (
                           <div key={i} className="flex gap-4 items-start">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</div>
                             <p className="text-[15px] font-bold text-white/80 leading-snug">{item}</p>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
 
                  <div className="relative z-10">
                    <h3 className="text-ishes-green font-black uppercase tracking-[0.2em] text-xs mb-8">Objectifs de la formation</h3>
                    <div className="space-y-4">
                      {f.objectifs.map((obj, i) => (
                        <div key={i} className="flex gap-4 items-start py-4 border-b border-white/5 last:border-0 translate-x-0 transition-transform hover:translate-x-2">
                          <CheckCircle2 className="w-5 h-5 text-ishes-green shrink-0 mt-0.5" />
                          <p className="text-base font-black leading-snug">{obj}</p>
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
 
      <Footer />
    </div>
  );
}
