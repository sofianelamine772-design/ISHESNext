import Image from "next/image";
import Link from "next/link";
import { BookOpen, Book, Users, GraduationCap, Moon, MapPin, MonitorPlay, ArrowRight, FileText, Gift, Video, Heart, Sparkles, ShieldCheck } from "lucide-react";

export function NewHomeSections() {
  return (
    <>
      {/* ─── QUEL EST VOTRE OBJECTIF ─── */}
      <section className="py-20 bg-[#0a192f] relative z-10 border-t border-[#0a192f]">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white">Quel est votre objectif ?</h2>
            <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {[
              { img: "/images/ai_arabe.png", icon: BookOpen, title: "Apprendre\nl'arabe", desc: "Comprendre, lire, écrire et s'exprimer avec confiance.", link: "/program" },
              { img: "/images/quran-coffee.png", icon: Book, title: "Apprendre à lire\nle Coran", desc: "Maîtriser la lecture, le Tajwid et comprendre les sens profonds.", link: "/program" },
              { img: "/images/ai_enfants.png", icon: Users, title: "Faire apprendre\nmon enfant", desc: "Un cadre bienveillant pour apprendre l'arabe, le Coran et l'éducation islamique.", link: "/program" },
              { img: "/images/ai_pro.png", icon: GraduationCap, title: "Devenir\nenseignant", desc: "Se former pour transmettre avec science, pédagogie et spiritualité.", link: "/formation-enseignant" },
              { img: "/images/ai_spirit.png", icon: Moon, title: "Progresser\nspirituellement", desc: "Des enseignements pour renforcer ta foi et te rapprocher d'ALLAH.", link: "/program" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/60 group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <div className="relative">
                  <div className="relative h-32 sm:h-56 w-full overflow-hidden">
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 20vw" />
                  </div>
                  <div className="absolute -bottom-5 sm:-bottom-6 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-[#0a192f] rounded-full border-2 sm:border-4 border-white flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#C69C6D]" />
                  </div>
                </div>
                <div className="p-4 sm:p-6 pt-8 sm:pt-10 flex-grow flex flex-col">
                  <h3 className="font-black text-[#0a192f] text-sm sm:text-lg whitespace-pre-line leading-tight mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-[10px] sm:text-sm font-medium leading-snug sm:leading-relaxed mb-4 sm:mb-6 flex-grow">{item.desc}</p>
                  <Link href={item.link} className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-black text-[#0a192f] uppercase tracking-widest hover:text-[#C69C6D] transition-colors mt-auto group/link">
                    Découvrir <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI CHOISIR ISHES ─── */}
      <section className="py-24 bg-[#f9f5f0] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a192f]">Pourquoi des milliers d'élèves choisissent ISHES ?</h2>
            <div className="w-16 h-1 bg-[#C69C6D] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Légitimité */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-8 h-8 text-[#C69C6D]" />
                </div>
                <h3 className="font-black text-[#0a192f] text-xl leading-tight">Une légitimité reconnue</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-4">
                Plus de 16 ans d'expérience au service de milliers d'élèves.
              </p>
              <p className="text-sm text-gray-500 font-bold border-t border-gray-100 pt-4 mt-auto">
                Le seul institut spécialisé dans la formation des enseignants en Tarbiya Islamiyya et Tajwid en France.
              </p>
            </div>

            {/* Accompagnement */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-[#C69C6D]" />
                </div>
                <h3 className="font-black text-[#0a192f] text-xl leading-tight">Un accompagnement qui dure</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                Avec notre Pack Accompagnement, vous bénéficiez d'une communauté privée, de lives mensuels, d'un programme de spiritualité et d'un suivi qui vous aide à progresser durablement.
              </p>
            </div>

            {/* Spiritualité */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                  <Moon className="w-8 h-8 text-[#C69C6D]" />
                </div>
                <h3 className="font-black text-[#0a192f] text-xl leading-tight">Une spiritualité vivante</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                Notre objectif est de vous aider à renforcer votre lien avec ALLAH et Son Messager ﷺ, tout en cheminant vers une véritable purification du cœur (tazkiyat an-nafs).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOS FORMATIONS ─── */}
      <section className="py-24 bg-[#fafafa] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a192f]">Nos formations</h2>
            <div className="w-16 h-1 bg-[#C69C6D] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* PRÉSENTIEL */}
            <div className="bg-[#0a192f] rounded-3xl sm:rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row items-stretch shadow-2xl group hover:-translate-y-1 transition-transform duration-300">
              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C69C6D]/20 text-[#C69C6D] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit border border-[#C69C6D]/30">
                  <MapPin className="w-3.5 h-3.5" /> Présentiel
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">À Toulouse</h3>
                <p className="text-gray-300 font-medium leading-relaxed mb-8 text-sm">
                  Suivez nos cours dans un cadre bienveillant à Toulouse avec une ambiance propice à l'apprentissage.
                </p>
                <Link href="/program?type=presentiel" className="inline-flex items-center justify-center gap-2 bg-white text-[#0a192f] px-6 py-3.5 rounded-xl text-sm font-black transition-all hover:bg-gray-100 w-fit group/btn">
                  Découvrir nos formations <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="sm:w-[45%] relative min-h-[300px] sm:min-h-full">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a192f] to-transparent z-10 hidden sm:block"></div>
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a192f] to-transparent z-10 sm:hidden"></div>
                <Image src="/images/campus.png" alt="Campus Toulouse" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>

            {/* À DISTANCE */}
            <div className="bg-[#0a192f] rounded-3xl sm:rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row items-stretch shadow-2xl group hover:-translate-y-1 transition-transform duration-300">
              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C69C6D]/20 text-[#C69C6D] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit border border-[#C69C6D]/30">
                  <MonitorPlay className="w-3.5 h-3.5" /> À distance
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">En ligne</h3>
                <p className="text-gray-300 font-medium leading-relaxed mb-8 text-sm">
                  Apprenez depuis chez vous avec un accompagnement personnalisé et interactif.
                </p>
                <Link href="/program?type=distance" className="inline-flex items-center justify-center gap-2 bg-white text-[#0a192f] px-6 py-3.5 rounded-xl text-sm font-black transition-all hover:bg-gray-100 w-fit group/btn">
                  Découvrir nos formations <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="sm:w-[45%] relative min-h-[300px] sm:min-h-full">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a192f] to-transparent z-10 hidden sm:block"></div>
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a192f] to-transparent z-10 sm:hidden"></div>
                <Image src="/images/ai_pro.png" alt="En ligne" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOUVEAU MUSULMAN ─── */}
      <section className="py-24 bg-white relative z-10 border-t border-gray-100/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a192f] mb-4">Nouveau musulman ? Commencez ici.</h2>
            <p className="text-gray-500 font-medium text-base max-w-2xl mx-auto">
              Découvrez des ressources gratuites pour mieux comprendre l'Islam et avancer sereinement dans votre nouveau chemin.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { icon: BookOpen, title: "Guides pratiques", subtitle: "(5 piliers, invocations,\nablutions...)" },
              { icon: Video, title: "Vidéos explicatives", subtitle: "pour comprendre\nl'essentiel" },
              { icon: FileText, title: "Fiches à télécharger", subtitle: "pour apprendre\nà ton rythme" },
              { icon: Heart, title: "Conseils spirituels", subtitle: "pour nourrir\nton cœur" }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#fcfaf8] border border-gray-100/80 rounded-2xl p-6 flex flex-col items-center text-center flex-1 min-w-[170px] max-w-[210px] hover:-translate-y-1 transition-transform shadow-[0_4px_15px_rgb(0,0,0,0.02)]">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm border border-gray-100/50">
                  <item.icon className="w-7 h-7 text-[#C69C6D]" />
                </div>
                <h4 className="font-black text-[#0a192f] text-[15px] mb-2">{item.title}</h4>
                <p className="text-[12px] font-medium text-gray-500 leading-tight whitespace-pre-line">{item.subtitle}</p>
              </div>
            ))}
            
            <a href="https://www.youtube.com/@institutishes" target="_blank" rel="noopener noreferrer" className="bg-[#0a192f] rounded-2xl p-6 flex flex-col items-center justify-center text-center flex-1 min-w-[170px] max-w-[220px] hover:bg-[#0f2547] transition-all shadow-xl group border-2 border-transparent hover:border-[#C69C6D]/20">
              <Gift className="w-8 h-8 text-[#C69C6D] mb-5 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-white text-[15px] mb-4">Accéder aux ressources gratuites</h4>
              <span className="text-[11px] font-black text-[#C69C6D] flex items-center gap-1.5 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full">
                Maintenant <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── QUI SOMMES-NOUS ? ─── */}
      <section className="py-24 bg-[#0a192f] relative z-10 border-t border-[#0a192f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#f2ece4] rounded-3xl sm:rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-stretch shadow-2xl relative">
            <div className="w-full md:w-[45%] flex relative aspect-[4/3] sm:aspect-[2/1] md:aspect-auto md:h-auto min-h-[250px] sm:min-h-[300px]">
              <div className="w-1/2 relative h-full">
                <Image src="/images/oustedhRyad.jpeg" alt="Oustadh Riad" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="w-1/2 relative h-full">
                <Image src="/images/OustedhaRahida.jpeg" alt="Oustadha Rachida" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className="p-6 pb-10 sm:p-10 md:p-16 flex-1 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-black text-[#0a192f] mb-1 sm:mb-2">Qui sommes-nous ?</h3>
              <h4 className="text-lg sm:text-xl font-bold text-[#C69C6D] mb-4 sm:mb-8 font-serif">Oustadh Riad et Oustadha Rachida</h4>
              <p className="text-[#0a192f]/80 font-medium text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Depuis plus de 16 ans, nous formons des milliers d'élèves francophones à la langue arabe, au Coran et aux sciences islamiques, avec une approche profonde alliant savoir, spiritualité et accompagnement.
              </p>
              <p className="text-[#0a192f]/80 font-medium text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                Notre mission est de <a href="https://www.ecoletransmettre.fr/fr/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#C69C6D] hover:underline transition-colors">transmettre</a> une science bénéfique qui transforme les cœurs et élève les générations.
              </p>
              <Link href="/notre-histoire" className="inline-flex justify-center items-center gap-2 bg-[#0a192f] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-[15px] font-black transition-all hover:bg-gray-900 shadow-md w-full sm:w-fit group">
                Découvrir notre histoire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FOOTER BANNER ─── */}
      <section className="py-12 bg-[#fafafa] relative z-10 px-6">
        <div className="max-w-7xl mx-auto bg-[#0a192f] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C69C6D]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C69C6D]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="flex items-center gap-6 relative z-10 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#C69C6D]/20 flex items-center justify-center shrink-0 border border-[#C69C6D]/30 shadow-inner hidden sm:flex">
              <Sparkles className="w-8 h-8 text-[#C69C6D]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-snug">
              Quel que soit votre niveau,<br className="hidden md:block"/>
              votre cheminement commence aujourd'hui.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
            <Link href="/program" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b88c4d] text-white px-8 py-4 rounded-xl text-[15px] font-black transition-all hover:bg-[#a67b3f] shadow-lg shadow-[#C69C6D]/20">
              Je découvre les formations <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://wa.me/33666033519" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0a192f] px-8 py-4 rounded-xl text-[15px] font-black transition-all hover:bg-gray-100 shadow-sm border border-transparent">
              Nous contacter <img src="/images/whatsapp-logo.avif" className="w-5 h-5 rounded-full" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
