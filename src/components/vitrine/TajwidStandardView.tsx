"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Play,
  BookOpen,
  ShieldCheck,
  Heart,
  MessageCircle,
  User,
  Award,
  Monitor,
  FileEdit,
  HelpCircle,
  Clock,
  Users,
  Calendar,
  Video,
  CreditCard,
  PhoneCall,
  XCircle,
  ArrowRight,
  Star,
  Eye,
  Target,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

const INSCRIPTION_HREF = "/inscription?plan=tajwid_standard&audience=adulte";

export function TajwidStandardView() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#101828]">
      {/* ----------------- HERO (landing visuel) ----------------- */}
      <section className="relative w-full overflow-hidden bg-white pt-28 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-black tracking-[0.22em] text-[11px] uppercase mb-5 text-ishes-gold">
                Formation en ligne
              </p>
              <h1 className="ishes-heading text-[36px] sm:text-5xl md:text-[52px] font-black text-ishes-blue leading-[1.12] tracking-tight mb-6">
                Apprends à lire le Coran{" "}
                <span className="text-ishes-gold">avec justesse, méthode et compréhension</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
                Un parcours complet, accessible à tous, même si tu pars de zéro. Découvre la
                beauté des lettres arabes, apprends à lire le Coran pas à pas et applique les
                règles du Tajwid, dans un cadre bienveillant et structuré, avec un enseignant
                qualifié.
              </p>
            </div>
            <div className="w-full">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-ishes-blue">
                <iframe
                  src="https://www.youtube.com/embed/y0MCrrbSogY"
                  title="Présentation du cours de Tajwid — Institut ISHES"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <blockquote className="mt-4 bg-[#f7f1e6] border border-[#e6d5b8]/50 rounded-2xl p-5 shadow-sm">
                <p className="text-sm font-medium text-ishes-blue leading-relaxed italic">
                  « Une lecture correcte du Coran est une adoration, une marque de respect et un
                  lien direct avec la parole d&apos;ALLAH. »
                </p>
              </blockquote>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Calendar, label: "Cursus", value: "Sur deux années scolaires" },
              { icon: Monitor, label: "Format", value: "En ligne, en direct" },
              { icon: Clock, label: "Rythme", value: "1h par semaine" },
              { icon: Users, label: "Public", value: "Adultes (hommes et femmes) Débutants acceptés" },
              { icon: Play, label: "Replays", value: "Inclus et illimités" },
              { icon: Award, label: "Diplôme", value: "Remis en fin de formation" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-2xl p-4 shadow-sm"
              >
                <item.icon className="w-5 h-5 text-[#c8a063] mb-2" />
                <dt className="text-[10px] font-black uppercase tracking-widest text-[#c8a063] mb-1">
                  {item.label}
                </dt>
                <dd className="text-sm font-bold text-ishes-blue leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Link
              href={INSCRIPTION_HREF}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl shadow-xl shadow-[#c8a063]/30 transition-all"
            >
              Je m&apos;inscris à la première année de Tajwid <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-10">
            Cette formation est faite pour toi si…
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Eye, text: "Tu veux apprendre à lire le Coran depuis les toutes premières lettres." },
              { icon: Heart, text: "Tu n'as jamais étudié le Tajwid ou tu souhaites reprendre sur des bases solides." },
              { icon: Target, text: "Tu veux lire avec justesse et confiance, à ton rythme." },
              { icon: Lightbulb, text: "Tu ressens le besoin de te rapprocher du Coran et de vivre une relation plus forte avec la parole d'ALLAH." },
              { icon: GraduationCap, text: "Tu souhaites un accompagnement bienveillant, par un enseignant qualifié." },
            ].map((item) => (
              <div key={item.text} className="bg-white border border-[#e6d5b8]/40 rounded-2xl p-5 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-5">
              Pourquoi apprendre le Tajwid ?
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              Lire le Coran comme il a été révélé, en donnant à chaque lettre son droit, est une
              adoration, une préservation de la parole d&apos;ALLAH et une source de récompenses
              immenses. Le Tajwid t&apos;aide à lire de manière juste, fluide et respectueuse, en
              comprenant ce que tu lis et en vivant pleinement la récitation.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Une lecture plus belle",
                "Une meilleure compréhension",
                "Une adoration plus complète",
                "Un lien plus fort avec le Coran",
              ].map((label) => (
                <div key={label} className="bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-xl px-4 py-3 text-sm font-bold text-ishes-blue text-center">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/quran-coffee.png"
                alt="Moushaf ouvert — apprendre à lire le Coran avec le Tajwid"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <blockquote className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-72 bg-white rounded-2xl p-5 shadow-xl border border-[#e6d5b8]/40">
              <p className="text-sm font-medium text-ishes-blue leading-relaxed">
                « Chaque lettre du Coran lue correctement est une lumière dans ta vie. »
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-[#fafafa] mt-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Un cursus en deux années scolaires, inchaAllah
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-12">
            Une progression claire et structurée, pour t&apos;accompagner jusqu&apos;à
            l&apos;application des règles de Tajwid.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#c8a063] mb-1">1</p>
                  <h3 className="text-lg font-black text-ishes-blue">
                    Première année — les bases de la lecture
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Les Clés du Coran, Volume 1</p>
                </div>
                <Image src="/images/livre-ishes.png" alt="Les Clés du Coran Volume 1" width={72} height={100} className="w-16 h-auto rounded shadow-md shrink-0" />
              </div>
              <ul className="space-y-2.5 text-sm font-medium text-gray-700">
                {[
                  "Découverte de l'alphabet arabe (lettres, formes, sons)",
                  "Voyelles et Harakat",
                  "Lecture de mots et de phrases simples",
                  "Madd (allongements) et premières règles",
                  "Lecture de passages coraniques courts",
                  "Exercices progressifs et mises en pratique",
                  "Corrections et suivi par l'enseignant",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#c8a063] mb-1">2</p>
                  <h3 className="text-lg font-black text-ishes-blue">
                    Deuxième année — les règles du Tajwid
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Les Clés du Coran, Volume 2</p>
                </div>
                <Image src="/images/livre-ishes.png" alt="Les Clés du Coran Volume 2" width={72} height={100} className="w-16 h-auto rounded shadow-md shrink-0" />
              </div>
              <ul className="space-y-2.5 text-sm font-medium text-gray-700">
                {[
                  "Application des règles du Tajwid",
                  "Règles essentielles : idgham, iqlab, ikhfa…",
                  "Règles de prolongement (moudoud)",
                  "Lecture fluide dans le Moushaf",
                  "Lecture de sourates choisies",
                  "Perfectionnement de la récitation",
                  "Corrections régulières et suivi personnalisé",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <Image
          src="/images/ai_medina.png"
          alt="Mosquée au coucher du soleil — commencer le Tajwid"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#101828]/55" />
        <div className="relative max-w-3xl mx-auto text-center z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Commence dès maintenant ton apprentissage du Tajwid
          </h2>
          <p className="text-white/85 font-medium mb-8 leading-relaxed">
            Rejoins la première année et fais le premier pas vers une lecture du Coran juste,
            confiante et pleine de sens.
          </p>
          <Link
            href={INSCRIPTION_HREF}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl shadow-xl"
          >
            Je m&apos;inscris à la première année de Tajwid <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-4">
              Le support de la formation : Les Clés du Coran
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              Un support en deux volumes, inspiré de la méthode Nour Al Bayan, spécialement adapté
              aux francophones pour apprendre pas à pas la lecture du Coran, avec les règles du
              Tajwid.
            </p>
            <p className="text-sm font-bold text-ishes-blue mb-6 leading-relaxed">
              Un poème didactique unique en langue française accompagne le Volume 2 : il aide à
              mémoriser les règles du Tajwid. « Le Coran est une porte vers ALLAH, le Tajwid en
              est la clé. »
            </p>
            <Link href="/fr/les-cles-du-coran" className="inline-flex items-center gap-2 text-[#c8a063] font-black text-sm hover:underline">
              Découvrir le support en détail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            <Image src="/images/livre-ishes.png" alt="Les Clés du Coran Volume 1" width={220} height={308} className="w-40 sm:w-52 h-auto rounded-lg shadow-xl -rotate-6" />
            <Image src="/images/livre-ishes.png" alt="Les Clés du Coran Volume 2" width={220} height={308} className="w-40 sm:w-52 h-auto rounded-lg shadow-xl rotate-6 mt-8" />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-black text-ishes-blue mb-3">Un accompagnement personnalisé</h2>
          <p className="text-gray-600 font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Tu avances avec un enseignant qualifié, tu poses tes questions, tu récites, tu es
            corrigé et tu bénéficies d&apos;un suivi tout au long de la formation. Rejoins une
            classe bienveillante et motivante.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle2, t: "Corrections personnalisées" },
              { icon: Target, t: "Suivi de ta progression" },
              { icon: Users, t: "Une communauté qui te soutient" },
            ].map((item) => (
              <div key={item.t} className="bg-white border border-[#e6d5b8]/40 rounded-2xl p-5 flex items-center justify-center gap-3">
                <item.icon className="w-5 h-5 text-[#c8a063]" />
                <span className="text-sm font-bold text-ishes-blue">{item.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- PROGRAMME DÉTAILLÉ + SIDEBAR ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row gap-16 relative">
        {/* --- LEFT COLUMN : CONTENT --- */}
        <div className="flex-1 w-full max-w-3xl space-y-24">
          {/* SEO: Pourquoi ce cursus */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-6">
              Tu sais que le Coran mérite mieux qu&apos;une lecture hésitante
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                Beaucoup de personnes reconnaissent les lettres arabes sans être réellement à
                l&apos;aise devant une page du Coran. D&apos;autres récitent depuis des années mais
                restent dans le doute : est-ce que je prononce correctement ? Pourquoi ce signe
                est-il là ? Quelle règle dois-je appliquer ?
              </p>
              <p>
                L&apos;objectif de ce cursus n&apos;est pas d&apos;accumuler des règles. Il est de
                te donner une méthode pour comprendre ce que tu lis, identifier ce que tu vois dans
                le Moushaf et corriger progressivement ta récitation.
              </p>
              <p className="text-ishes-blue font-bold border-l-4 border-[#c8a063] pl-4">
                Car apprendre à lire correctement le Coran, c&apos;est aussi apprendre à honorer
                la parole d&apos;ALLAH.
              </p>
            </div>
          </section>

          {/* SECTION: Peut-être que tu te reconnais */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">1.</span> Peut-être que tu te reconnais...
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">
                  Tu hésites quand tu lis le Coran.
                </p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-4xl font-arabic text-[#c8a063]">غ</span>
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">
                  Tu confonds certaines lettres.
                </p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">
                  Tu ne comprends pas les symboles du Moushaf.
                </p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">
                  Tu aimerais lire avec plus d&apos;assurance.
                </p>
              </div>
              <div className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#e6d5b8] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#c8a063]" />
                </div>
                <p className="text-xs font-bold text-gray-700 leading-snug">
                  Tu n&apos;as jamais appris les règles du Tajwid.
                </p>
              </div>
            </div>
          </section>

          {/* SEO: Deux volumes */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-4">
              Une progression construite autour de deux volumes
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              Le support pédagogique{" "}
              <strong className="text-ishes-blue">Les Clés du Coran</strong> structure le cursus
              sur l&apos;année : du premier alphabet jusqu&apos;à l&apos;application des règles
              dans le Moushaf.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="bg-white border border-[#e6d5b8]/40 rounded-2xl p-7 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#c8a063] mb-2">
                  Volume 1
                </p>
                <h3 className="text-lg font-black text-ishes-blue mb-3">
                  Construire une lecture solide
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Alphabet, fatha, kasra, damma, tahajjî, prolongements de base, tanwin, soukoun,
                  chaddah et combinaisons. L&apos;élève apprend à décomposer puis à lire.
                </p>
              </article>
              <article className="bg-white border border-[#e6d5b8]/40 rounded-2xl p-7 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#c8a063] mb-2">
                  Volume 2
                </p>
                <h3 className="text-lg font-black text-ishes-blue mb-3">
                  Comprendre et appliquer le Tajwid
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Adab, isti&apos;âdha, basmalah, hamzat wasl, noun sâkina et tanwin, mim sâkina,
                  moudoud, idgham, règles du Râ, waqf, makhârij, sifât, erreurs de récitation et
                  repères du Moushaf.
                </p>
              </article>
            </div>
          </section>

          {/* SEO: Tahajjî */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-6">
              La particularité de la méthode : le tahajjî
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                Le tahajjî consiste à décomposer la lecture : identifier la lettre, sa voyelle ou
                son signe, puis reconstruire progressivement le mot. Cette façon de travailler
                évite de deviner la lecture et permet à l&apos;élève de comprendre pourquoi il
                prononce de telle manière.
              </p>
              <p>
                Le support{" "}
                <Link href="/fr/boutique" className="text-[#c8a063] font-bold underline underline-offset-2">
                  Les Clés du Coran
                </Link>{" "}
                est une adaptation francophone inspirée de la méthode Nour Al Bayan. Il sert de
                fil conducteur au cours et permet de retrouver les notions étudiées, les exemples
                et les exercices.
              </p>
            </div>
          </section>

          {/* Ce que tu vas savoir faire */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">2.</span> Ce que tu vas progressivement savoir faire
            </h2>
            <ul className="space-y-3">
              {[
                "Reconnaître les lettres, voyelles et principaux signes de lecture.",
                "Lire des mots puis des passages sans dépendre uniquement d'une transcription phonétique.",
                "Comprendre les règles essentielles du Tajwid et savoir les repérer dans le Moushaf.",
                "Identifier les prolongements, les règles liées au noun et au mim, les arrêts et reprises.",
                "Mieux maîtriser les points de sortie et les caractéristiques des lettres.",
                "Repérer tes erreurs et développer progressivement une lecture plus autonome.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c8a063] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Enseignant */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-6">
              Un livre ne remplace pas un enseignant
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Le Tajwid est une science qui se transmet aussi par l&apos;écoute et la correction.
              Un support peut expliquer une règle ; il ne peut pas toujours entendre une lettre
              mal articulée, une ghounna insuffisante ou un prolongement incorrect. C&apos;est
              pourquoi le cours associe support écrit, explications en direct, pratique et
              corrections régulières.
            </p>
          </section>

          {/* SECTION: Comment se déroule */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-6 flex items-center gap-4">
              <span className="text-gray-300">3.</span> Comment se déroule le cursus ?
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-10">
              Cours en direct sur Zoom, replays accessibles, suivi pédagogique, support inclus et
              progression adaptée aux francophones. Le travail se fait progressivement, avec une
              place importante donnée à la lecture et à la correction.
            </p>
            <div className="relative flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
              <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 border-t-2 border-dashed border-[#e6d5b8] -z-10" />
              {[
                { icon: Monitor, title: "Cours en direct", desc: "1 h par semaine" },
                { icon: FileEdit, title: "Exercices pratiques", desc: "" },
                { icon: MessageCircle, title: "Corrections personnalisées", desc: "" },
                { icon: CheckCircle2, title: "Évaluation régulière", desc: "" },
                { icon: Award, title: "Diplôme de fin de parcours", desc: "" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center max-w-[120px] bg-[#fafafa] z-10 relative"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#e6d5b8] bg-[#fafafa] flex items-center justify-center mb-4 relative before:absolute before:inset-2 before:border before:border-dashed before:border-[#e6d5b8] before:rounded-full">
                    <Icon className="w-7 h-7 text-[#c8a063] relative z-10" />
                  </div>
                  <h3 className="text-[13px] font-bold text-gray-800 mb-1">{title}</h3>
                  {desc ? <p className="text-[11px] text-gray-500 font-medium">{desc}</p> : null}
                </div>
              ))}
            </div>
          </section>

          {/* Ce qui est inclus */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">4.</span> Ce qui est inclus
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Video, label: "Cours en direct chaque semaine" },
                { icon: Play, label: "Replays accessibles" },
                { icon: BookOpen, label: "Support Les Clés du Coran Vol. 1 & 2" },
                { icon: MessageCircle, label: "Groupe WhatsApp privé" },
                { icon: User, label: "Pack Accompagnement (optionnel)" },
                { icon: Award, label: "Diplôme de fin de parcours" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-white border border-[#e6d5b8]/30 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5 text-[#c8a063]" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-800">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pour qui */}
          <section>
            <h2 className="text-2xl font-black text-ishes-blue mb-8 flex items-center gap-4">
              <span className="text-gray-300">5.</span> Pour qui ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-green-50 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[15px] font-black text-gray-900">
                    Cette formation est faite pour toi si...
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Tu débutes et tu ne sais pas encore lire l'arabe.",
                    "Tu sais lire mais tu veux reprendre les bases proprement.",
                    "Tu récites déjà et tu souhaites comprendre les règles que tu appliques.",
                    "Tu veux avancer avec un cadre, un enseignant et une progression structurée.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-red-50 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-md">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[15px] font-black text-gray-900">
                    Cette formation n&apos;est pas adaptée si...
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">
                      Tu maîtrises déjà parfaitement les règles du Tajwid et souhaites aller plus
                      loin.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA + fiche pratique SEO */}
          <section className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 md:p-10 text-center shadow-sm">
            <h2 className="text-xl md:text-2xl font-black text-ishes-blue mb-4">
              S&apos;inscrire au cours de Tajwid
            </h2>
            <p className="text-gray-600 font-medium mb-8 max-w-lg mx-auto leading-relaxed">
              Tu veux comprendre précisément l&apos;ouvrage étudié ? Consulte la fiche pratique :{" "}
              <strong>Les Clés du Coran</strong> — méthode, Volume 1, Volume 2, tahajjî et poème
              didactique.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={INSCRIPTION_HREF}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-[#c8a063]/30 transition-all"
              >
                Je m&apos;inscris au Tajwid <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/fr/les-cles-du-coran"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#e6d5b8] text-ishes-blue font-bold text-sm rounded-xl hover:bg-[#f5efe4] transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#c8a063]" />
                Fiche pratique — Les Clés du Coran
              </Link>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN : SIDEBAR --- */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="bg-[#101828] rounded-[2rem] p-8 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a063] rounded-full blur-[80px] opacity-20 -z-10" />
              <div className="text-[#c8a063] font-black text-[10px] tracking-widest uppercase mb-4">
                Cours de Tajwid en ligne
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-6xl font-black text-[#c8a063]">649 €</span>
              </div>
              <div className="text-sm font-bold tracking-widest uppercase mb-6">POUR 1 AN</div>
              <p className="text-[13px] text-gray-400 mb-8 max-w-[200px] mx-auto leading-relaxed">
                Paiement en plusieurs fois sans frais
              </p>
              <Link
                href={INSCRIPTION_HREF}
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all mb-6 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#c8a063]/20"
              >
                Je m&apos;inscris maintenant <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
                <span>🔒</span> Paiement 100% sécurisé
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-[13px] font-black text-gray-900 mb-6 uppercase tracking-widest">
                Informations clés
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Monitor className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">
                    Format : en ligne — cours en direct
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">
                    Parcours progressif sur l&apos;année
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">
                    Support : Les Clés du Coran Vol. 1 & 2
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">
                    Public : adultes, y compris débutants
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Play className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Replays accessibles</span>
                </li>
                <li className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Rythme : 1 h par semaine</span>
                </li>
                <li className="flex items-center gap-4">
                  <Award className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">
                    Diplôme de fin de parcours
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <CreditCard className="w-5 h-5 text-[#c8a063]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">
                    Paiement en plusieurs fois sans frais
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#101828] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366] rounded-full blur-[80px] opacity-10 -z-10" />
              <h3 className="text-[13px] font-black mb-3 uppercase tracking-widest text-white">
                Besoin d&apos;aide ?
              </h3>
              <p className="text-[13px] text-gray-300 mb-6 leading-relaxed">
                Notre équipe est là pour t&apos;aider à faire le bon choix.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/33666033519"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20 text-[13px] uppercase tracking-wider"
                >
                  <Image
                    src="/images/whatsapp-logo.avif"
                    alt="Contacter l'Institut ISHES sur WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5 brightness-0 invert"
                  />
                  WhatsApp
                </a>
                <a
                  href="tel:+33666033519"
                  className="flex items-center justify-center gap-3 w-full py-3.5 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl transition-all hover:bg-white/5 text-[13px] uppercase tracking-wider"
                >
                  <PhoneCall className="w-4 h-4" />
                  Appeler
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 text-center shadow-sm">
              <div className="flex justify-center text-[#c8a063] mb-4 gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-800 mb-6 px-2 leading-relaxed">
                Plus de 1000 étudiants nous font confiance chaque année.
              </p>
              <div className="flex justify-center -space-x-3">
                {[10, 11, 12, 13].map((seed, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative z-10"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`}
                      className="w-full h-full object-cover"
                      alt="Portrait illustratif d'un étudiant de l'Institut ISHES"
                    />
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
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <Image
            src="/images/ai_medina.png"
            alt="Cours de Tajwid en ligne — lecture du Coran avec l'Institut ISHES"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/90 to-[#101828]/40" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-10 leading-tight">
            La prochaine fois que tu ouvriras le Coran...{" "}
            <span className="text-[#c8a063] font-bold">
              lis-le avec confiance, précision et sérénité.
            </span>
          </h2>
          <Link
            href={INSCRIPTION_HREF}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-2xl shadow-[#c8a063]/30 transition-all transform hover:scale-105 active:scale-95 mb-12"
          >
            S&apos;inscrire au cours de Tajwid <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#c8a063]" /> Accompagnement bienveillant
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c8a063]" /> Méthode claire et éprouvée
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c8a063]" /> Progression pas à pas
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#c8a063]" /> Pour les grands débutants
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
