import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Monitor,
  Ban,
  Hourglass,
  Tag,
  Star,
  UserRound,
  CircleHelp,
  Search,
  Volume2,
  CheckCircle2,
  PlayCircle,
  Award
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Correction de la Fatiha | Module Offert | ISHES",
  description: "Apprenez à réciter correctement la Fatiha et les 3 dernières sourates. Un module entièrement gratuit offert par l'Institut ISHES pour la communauté.",
  keywords: "correction fatiha, cours coran gratuit, apprendre priere, tajwid fatiha, ishes gratuit"
};

export default function CorrectionFatihaPage() {
  const course = PROGRAMS_DATA["correction_fatiha"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f2ece4] px-4 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-ishes-gold" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                FONDAMENTAUX
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Correction <br />
              al Fatiha
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Maîtrisez la récitation de la Fatiha et des 3 dernières sourates pour une prière valide.
            </p>
            <div className="w-12 h-0.5 bg-ishes-gold my-6"></div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/inscription?plan=correction_fatiha&audience=adulte"
                className="inline-flex items-center justify-center gap-2 bg-ishes-blue hover:bg-ishes-blue/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-blue/20 hover:-translate-y-1"
              >
                JE M'INSCRIS MAINTENANT <ArrowRightIcon />
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
                  src="/images/ai_pro.png"
                  alt="Correction al Fatiha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>

        {/* ─── INFccO BAR ─── */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Début<br /><span className="text-gray-500 font-medium">Octobre 2026</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">1 séance<br /><span className="text-gray-500 font-medium">unique</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Dimanche<br /><span className="text-gray-500 font-medium">11h00 (France)</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br /><span className="text-gray-500 font-medium">sur Zoom</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <Award className="w-6 h-6 text-ishes-gold" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-ishes-gold rotate-45"></div>
            </div>
            <span className="text-xs font-bold text-ishes-dark leading-tight">Pas de<br /><span className="text-gray-500 font-medium">diplôme</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br /><span className="text-gray-500 font-medium">Une session</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Gratuit<br /><span className="text-gray-500 font-medium">100% offert</span></span>
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
            { icon: UserRound, title: "Tu ne connais pas\nton niveau de\nrécitation." },
            { icon: CircleHelp, title: "Tu hésites dans\nta récitation." },
            { icon: Search, title: "Tu ne sais pas si tu\nfais des erreurs\nmajeures ou mineures." },
            { icon: Volume2, title: "Tu as des problèmes\nde prononciations." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-ishes-dark whitespace-pre-line leading-snug">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark">Pourquoi ce programme va tout changer ?</h2>
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-100">
            <Image
              src="/images/livre_ramadan.png"
              alt="Livre avec une lanterne"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-10">
            {[
              {
                title: "Écoute attentive et bienveillante",
                desc: "Un espace où tu seras écouté(e) avec attention et bienveillance pour comprendre tes difficultés et t'aider à progresser."
              },
              {
                title: "Conseils personnalisés",
                desc: "Des conseils adaptés à ton niveau et à tes besoins pour améliorer ta récitation de manière concrète."
              },
              {
                title: "Corrections précises",
                desc: "Des retours et corrections en direct sur ta récitation de la Fatiha et des 3 dernières sourates pour t'aider à prier en toute validité."
              },
              {
                title: "Orientation si nécessaire",
                desc: "Si des bases en Tajwid doivent être renforcées, tu seras orienté(e) vers nos cours de Tajwid adaptés à ton niveau."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-ishes-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black text-ishes-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  );
}
