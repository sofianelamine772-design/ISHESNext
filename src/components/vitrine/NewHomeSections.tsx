import Image from "next/image";
import Link from "next/link";
import { BookOpen, Book, Users, GraduationCap, Moon, MapPin, MonitorPlay, ArrowRight, FileText, Gift, Video, Heart, Sparkles, ShieldCheck } from "lucide-react";

export function NewHomeSections() {
  return (
    <>
      {/* ─── POURQUOI CHOISIR ISHES ─── */}
      <section className="py-24 bg-[#f9f5f0] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Pourquoi des milliers d'élèves choisissent ISHES ?</h2>
            <div className="w-16 h-1 bg-[#C69C6D] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Légitimité */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-8 h-8 text-[#C69C6D]" />
                </div>
                <h3 className="font-black text-ishes-blue text-xl leading-tight">Une légitimité reconnue</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-4">
                Plus de 16 ans d'expérience au service de milliers d'élèves
              </p>
              <p className="text-sm text-gray-500 font-bold border-t border-gray-100 pt-4 mt-auto">
                Le seul institut spécialisé dans la formation des enseignants en Tarbiya Islamiyya et Tajwid en France
              </p>
            </div>

            {/* Accompagnement */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-[#C69C6D]" />
                </div>
                <h3 className="font-black text-ishes-blue text-xl leading-tight">Un accompagnement qui dure</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                Avec notre Pack Accompagnement, vous bénéficiez d'une communauté privée, de lives mensuels, d'un programme de spiritualité et d'un suivi qui vous aide à progresser durablement
              </p>
            </div>

            {/* Spiritualité */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                  <Moon className="w-8 h-8 text-[#C69C6D]" />
                </div>
                <h3 className="font-black text-ishes-blue text-xl leading-tight">Une spiritualité vivante</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                Notre objectif est de vous aider à renforcer votre lien avec ALLAH et Son Messager ﷺ, tout en cheminant vers une véritable purification du cœur (tazkiyat an-nafs)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUI SOMMES-NOUS ? ─── */}
      <section className="py-24 bg-[#0a192f] relative z-10 border-t border-[#0a192f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#f2ece4] rounded-3xl sm:rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-stretch shadow-2xl relative">
            <div className="w-full md:w-[45%] flex relative aspect-[4/3] sm:aspect-[2/1] md:aspect-auto md:h-auto min-h-[250px] sm:min-h-[300px]">
              <div className="w-1/2 relative h-full">
                <Image src="/images/oustedhRyad.jpeg" alt="Oustadh Riad, fondateur de l'Institut ISHES — enseignant en sciences islamiques" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="w-1/2 relative h-full">
                <Image src="/images/OustedhaRahida.jpeg" alt="Oustadha Rachida, fondatrice de l'Institut ISHES — enseignante en Tajwid et Tarbiya" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className="p-6 pb-10 sm:p-10 md:p-16 flex-1 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-black text-ishes-blue mb-1 sm:mb-2">Qui sommes-nous ?</h3>
              <h4 className="text-lg sm:text-xl font-bold text-[#C69C6D] mb-4 sm:mb-8 ">Oustadh Riad et Oustadha Rachida</h4>
              <p className="text-[#0a192f]/80 font-medium text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Depuis plus de 16 ans, nous formons des milliers d'élèves francophones à la langue arabe, au Coran et aux sciences islamiques, avec une approche profonde alliant savoir, spiritualité et accompagnement
              </p>
              <p className="text-[#0a192f]/80 font-medium text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                Notre mission est de <a href="https://www.ecoletransmettre.fr/fr/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#C69C6D] hover:underline transition-colors">transmettre</a> une science bénéfique qui transforme les cœurs et élève les générations
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
              votre cheminement commence aujourd'hui
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
            <Link href="/program" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b88c4d] text-white px-8 py-4 rounded-xl text-[15px] font-black transition-all hover:bg-[#a67b3f] shadow-lg shadow-[#C69C6D]/20">
              Je découvre les formations <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://wa.me/33666033519" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0a192f] px-8 py-4 rounded-xl text-[15px] font-black transition-all hover:bg-gray-100 shadow-sm border border-transparent">
              Nous contacter <img src="/images/whatsapp-logo.avif" className="w-5 h-5 rounded-full" alt="Contacter l'Institut ISHES sur WhatsApp" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
