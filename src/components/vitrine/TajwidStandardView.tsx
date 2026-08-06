"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, Play, BookOpen, ShieldCheck, Heart, 
  MessageCircle, User, Award, Monitor, FileEdit, 
  HelpCircle, Type, Clock, Users, Calendar, Video, 
  CreditCard, PhoneCall, XCircle, ArrowRight, Star
} from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

export function TajwidStandardView() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#101828]">
      
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative w-full overflow-hidden bg-[#fafafa] pt-32 pb-16 lg:pb-32 border-b border-gray-100">
        {/* Background Image - Right Side */}
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0">
          <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#fafafa] to-transparent z-10 lg:hidden" />
          <Image
            src="/images/quran-coffee.png"
            alt="Apprendre le Tajwid"
            fill
            className="object-cover object-center lg:object-left opacity-30 lg:opacity-100"
            priority
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="max-w-2xl relative pt-10">
            <div className="font-black tracking-widest text-xs uppercase mb-6 text-ishes-gold">
              TAJWID STANDARD
            </div>
            <h1 className="ishes-heading text-[40px] sm:text-5xl md:text-[64px] font-black text-ishes-blue leading-[1.1] tracking-tight mb-6">
              Lis le Coran <br />
              avec assurance, <br />
              <span className="text-ishes-gold font-serif">même si tu pars de zéro.</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium max-w-md leading-relaxed mb-10">
              Un parcours complet et progressif pour apprendre à lire correctement le Coran et appliquer les règles du Tajwid avec confiance.
            </p>
            <Link
              href="/inscription?plan=tajwid_standard&audience=adulte"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-[#c8a063]/30 transition-all transform hover:scale-105 active:scale-95"
            >
              Je m'inscris maintenant <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------- MAIN LAYOUT (Content + Sidebar) ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row gap-16 relative">
        
        {/* --- LEFT COLUMN : CONTENT --- */}
        <div className="flex-1 w-full max-w-3xl space-y-24">
          
          {/* SECTION 1: Peut-être que tu te reconnais */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">1.</span> Peut-être que tu te reconnais...
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Box 1 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">Tu hésites quand tu lis le Coran.</p>
              </div>
              {/* Box 2 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-4xl font-arabic text-[#c8a063]">غ</span>
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">Tu confonds certaines lettres.</p>
              </div>
              {/* Box 3 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">Tu ne comprends pas les symboles du Moushaf.</p>
              </div>
              {/* Box 4 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">Tu aimerais lire avec plus d'assurance.</p>
              </div>
              {/* Box 5 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">Tu n'as jamais appris les règles du Tajwid.</p>
              </div>
            </div>
            <div className="mt-12 text-center relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#e6d5b8]"></div>
              </div>
              <div className="relative bg-[#fafafa] px-6">
                <span className="font-serif text-xl text-[#c8a063] font-bold">Cette formation a été créée pour toi.</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: Ce que tu vas réellement apprendre */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">2.</span> Ce que tu vas réellement apprendre
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Box 1 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#101828] flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-[#c8a063]" />
                </div>
                <p className="text-sm font-bold text-gray-800 leading-tight">Lire correctement le Coran</p>
              </div>
              {/* Box 2 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#101828] flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-[#c8a063]" />
                </div>
                <p className="text-sm font-bold text-gray-800 leading-tight">Prononcer chaque lettre correctement</p>
              </div>
              {/* Box 3 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#101828] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-[#c8a063]" />
                </div>
                <p className="text-sm font-bold text-gray-800 leading-tight">Comprendre les règles essentielles</p>
              </div>
              {/* Box 4 */}
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#101828] flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-[#c8a063]" />
                </div>
                <p className="text-sm font-bold text-gray-800 leading-tight">Retrouver une relation sereine avec le Coran</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: Comment se déroule la formation */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-12 flex items-center gap-4">
              <span className="text-gray-300">3.</span> Comment se déroule la formation ?
            </h2>
            <div className="relative flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 border-t-2 border-dashed border-[#e6d5b8] -z-10"></div>
              
              <div className="flex flex-col items-center text-center max-w-[120px] bg-[#fafafa] z-10 relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#e6d5b8] bg-[#fafafa] flex items-center justify-center mb-4 relative before:absolute before:inset-2 before:border before:border-dashed before:border-[#e6d5b8] before:rounded-full">
                  <Monitor className="w-7 h-7 text-[#c8a063] relative z-10" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 mb-1">Cours en direct</h4>
                <p className="text-[11px] text-gray-500 font-medium">1 h par semaine</p>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[120px] bg-[#fafafa] z-10 relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#e6d5b8] bg-[#fafafa] flex items-center justify-center mb-4 relative before:absolute before:inset-2 before:border before:border-dashed before:border-[#e6d5b8] before:rounded-full">
                  <FileEdit className="w-7 h-7 text-[#c8a063] relative z-10" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 mb-1">Exercices pratiques</h4>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[120px] bg-[#fafafa] z-10 relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#e6d5b8] bg-[#fafafa] flex items-center justify-center mb-4 relative before:absolute before:inset-2 before:border before:border-dashed before:border-[#e6d5b8] before:rounded-full">
                  <MessageCircle className="w-7 h-7 text-[#c8a063] relative z-10" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 mb-1">Corrections personnalisées</h4>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[120px] bg-[#fafafa] z-10 relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#e6d5b8] bg-[#fafafa] flex items-center justify-center mb-4 relative before:absolute before:inset-2 before:border before:border-dashed before:border-[#e6d5b8] before:rounded-full">
                  <CheckCircle2 className="w-7 h-7 text-[#c8a063] relative z-10" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 mb-1">Évaluation régulière</h4>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[120px] bg-[#fafafa] z-10 relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#e6d5b8] bg-[#fafafa] flex items-center justify-center mb-4 relative before:absolute before:inset-2 before:border before:border-dashed before:border-[#e6d5b8] before:rounded-full">
                  <Award className="w-7 h-7 text-[#c8a063] relative z-10" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 mb-1">Diplôme de fin de parcours</h4>
              </div>
            </div>
          </section>

          {/* SECTION 4: Ce qui est inclus */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">4.</span> Ce qui est inclus
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <Video className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">Cours en direct chaque semaine</p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">Replays à vie</p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">Support exclusif Les Clés du Coran</p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <MessageCircle className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">Groupe WhatsApp privé</p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">Pack Accompagnement (optionnel)</p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                  <Award className="w-5 h-5 text-[#c8a063]" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">Diplôme de fin de parcours</p>
              </div>
            </div>
          </section>

          {/* SECTION 5: À qui s'adresse cette formation */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">5.</span> À qui s'adresse cette formation ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Green Box */}
              <div className="bg-white border-2 border-green-50 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[15px] font-black text-gray-900">Cette formation est faite pour toi si...</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">Tu débutes dans la lecture du Coran.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">Tu veux reprendre les bases correctement.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">Tu souhaites apprendre dans un cadre structuré.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">Tu recherches un accompagnement bienveillant.</span>
                  </li>
                </ul>
              </div>
              
              {/* Red Box */}
              <div className="bg-white border-2 border-red-50 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-md">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[15px] font-black text-gray-900">Cette formation n'est pas adaptée si...</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">Tu maîtrises déjà parfaitement les règles du Tajwid et souhaites aller plus loin.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN : SIDEBAR --- */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="sticky top-28 flex flex-col gap-6">
            
            {/* PRICING CARD */}
            <div className="bg-[#101828] rounded-[2rem] p-8 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a063] rounded-full blur-[80px] opacity-20 -z-10"></div>
              <div className="text-[#c8a063] font-black text-[10px] tracking-widest uppercase mb-4">
                Tajwid Standard
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-6xl font-black text-[#c8a063]">649 €</span>
              </div>
              <div className="text-sm font-bold tracking-widest uppercase mb-6">
                POUR 1 AN
              </div>
              <p className="text-[13px] text-gray-400 mb-8 max-w-[200px] mx-auto leading-relaxed">
                Paiement en plusieurs fois sans frais
              </p>
              <Link
                href="/inscription?plan=tajwid_standard&audience=adulte"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all mb-6 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#c8a063]/20"
              >
                Je m'inscris maintenant <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                <span>🔒</span> Paiement 100% sécurisé
              </div>
            </div>

            {/* INFO LIST */}
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-[13px] font-black text-gray-900 mb-6 uppercase tracking-widest">Informations Clés</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Durée : 2 ans</span>
                </li>
                <li className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Public : Adultes débutants</span>
                </li>
                <li className="flex items-center gap-4">
                  <Monitor className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Format : Présentiel ou distanciel</span>
                </li>
                <li className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Rythme : 1 h par semaine</span>
                </li>
                <li className="flex items-center gap-4">
                  <Play className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Replays inclus à vie</span>
                </li>
                <li className="flex items-center gap-4">
                  <Award className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Diplôme de fin de parcours</span>
                </li>
                <li className="flex items-center gap-4">
                  <CreditCard className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Paiement en plusieurs fois sans frais</span>
                </li>
              </ul>
            </div>

            {/* SUPPORT BOX */}
            <div className="bg-[#101828] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366] rounded-full blur-[80px] opacity-10 -z-10"></div>
              <h3 className="text-[13px] font-black mb-3 uppercase tracking-widest text-white">Besoin d'aide ?</h3>
              <p className="text-[13px] text-gray-300 mb-6 leading-relaxed">Notre équipe est là pour t'aider à faire le bon choix.</p>
              <div className="space-y-3">
                <a href="https://wa.me/33666033519" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20 text-[13px] uppercase tracking-wider">
                  <Image src="/images/whatsapp-logo.avif" alt="WhatsApp" width={20} height={20} className="w-5 h-5 brightness-0 invert" />
                  WhatsApp
                </a>
                <a href="tel:+33666033519" className="flex items-center justify-center gap-3 w-full py-3.5 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl transition-all hover:bg-white/5 text-[13px] uppercase tracking-wider">
                  <PhoneCall className="w-4 h-4" />
                  Appeler
                </a>
              </div>
            </div>

            {/* TRUST BOX */}
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 text-center shadow-sm">
              <div className="flex justify-center text-[#c8a063] mb-4 gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-bold text-gray-800 mb-6 px-2 leading-relaxed">
                Plus de 1000 étudiants nous font confiance chaque année.
              </p>
              <div className="flex justify-center -space-x-3">
                {[10,11,12,13].map((seed, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative z-10">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`} className="w-full h-full object-cover" alt="student" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#101828] text-white text-[10px] font-bold flex items-center justify-center relative z-20">
                  +1000
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ----------------- BOTTOM CTA BANNER ----------------- */}
      <section className="relative w-full bg-[#101828] py-24 lg:py-32 overflow-hidden mt-10">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <Image src="/images/quran-coffee.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/90 to-[#101828]/40"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-10 leading-tight">
            La prochaine fois que tu ouvriras le Coran... <br/>
            <span className="font-serif text-[#c8a063] font-bold">lis-le avec confiance, précision et sérénité.</span>
          </h2>
          <Link
            href="/inscription?plan=tajwid_standard&audience=adulte"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-2xl shadow-[#c8a063]/30 transition-all transform hover:scale-105 active:scale-95 mb-12"
          >
            Je commence aujourd'hui <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-[#c8a063]" /> Accompagnement bienveillant</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#c8a063]" /> Méthode claire et éprouvée</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#c8a063]" /> Progression pas à pas</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-[#c8a063]" /> Pour les grands débutants</span>
          </div>
        </div>
      </section>

    </div>
  );
}
