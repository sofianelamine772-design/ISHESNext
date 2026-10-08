import Link from "next/link";
import {
  Calendar,
  Clock,
  Monitor,
  Hourglass,
  Tag,
  Star,
  UserRound,
  CircleHelp,
  Search,
  Volume2,
  CheckCircle2,
  PlayCircle,
  Award,
  MessageCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  buildPageMetadata,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
  howToJsonLd,
} from "@/lib/seo";
import { WHATSAPP_DISTANCE } from "@/lib/institut-contact";

const FATIHA_FAQS = [
  {
    question: "Le cours de Fatiha est-il vraiment 100 % gratuit ?",
    answer:
      "Oui. Le cours de Fatiha de l'Institut ISHES est 100 % gratuit : pas de carte bancaire, pas de frais cachés. Inscription en ligne, correction avec un professeur, et accès à un groupe WhatsApp.",
  },
  {
    question: "C'est un cours de Fatiha avec un professeur ou seulement des vidéos ?",
    answer:
      "C'est un cours de Fatiha avec professeur : séance en direct (Zoom), correction de ta récitation, puis un groupe WhatsApp pour les questions. Une vidéo pédagogique complète le suivi — tu n'es pas seul face à un replay.",
  },
  {
    question: "Y a-t-il un groupe WhatsApp pour le cours de Fatiha ?",
    answer:
      "Oui. Après inscription, tu rejoins un groupe WhatsApp lié au module : rappels, questions au professeur, entraide. Le cours de Fatiha reste 100 % gratuit, y compris cet accompagnement.",
  },
  {
    question: "Que corrige-t-on dans ce cours de Fatiha gratuit ?",
    answer:
      "Sourate Al-Fatiha (ouverture de la prière) et les trois dernières sourates (Al-Ikhlâs, Al-Falaq, An-Nâs). Objectif : prononciation, makhârij, et éviter les fautes qui peuvent invalider la prière.",
  },
  {
    question: "À qui s'adresse le cours de Fatiha ISHES ?",
    answer:
      "À tout musulman francophone : débutant, converti, ou pratiquant qui doute de sa récitation. Hommes et femmes. Aucun niveau d'arabe n'est exigé. Cours en ligne, avec professeur.",
  },
  {
    question: "Comment s'inscrire au cours de Fatiha gratuit ?",
    answer:
      "Clique sur « Je m'inscris » (0 €) ou écris sur WhatsApp. Tu reçois le créneau avec le professeur et le lien du groupe WhatsApp. Le module est offert par l'Institut ISHES.",
  },
  {
    question: "Combien de personnes récitent mal la Fatiha ?",
    answer:
      "Lors des séances de correction ISHES, plus de 70 % des élèves francophones commettent au moins une faute d'articulation (makhraj) dès la première lecture d'Al-Fatiha. Environ 1 élève sur 2 confond le 'Ayn et le hamza, et près d'un tiers allège le Dâd ou le Sâd. D'où un cours de Fatiha avec professeur, pas seulement de la phonétique écrite.",
  },
  {
    question: "Quelles sont les erreurs les plus fréquentes sur Al-Fatiha ?",
    answer:
      "Les erreurs récurrentes : shadda d'Iyyâka oubliée, 'Ayn de na'budu ou nasta'în trop faible, Sâd de sirât lu comme un Sîn, Dâd de ad-dâllîn lu comme un Dâl, madd trop court, et confusion Mâliki / Maliki. Le professeur les corrige une par une, verset par verset.",
  },
  {
    question: "La phonétique française suffit-elle pour réciter la Fatiha ?",
    answer:
      "Non. La phonétique (Bismi-llâhi r-rahmâni r-rahîm, etc.) aide à mémoriser, mais elle ne remplace pas l'oreille du professeur : le Hâ, le 'Ayn, le Dâd et le Qaf n'existent pas en français. D'où le cours de Fatiha 100 % gratuit en direct + groupe WhatsApp.",
  },
];

const FATIHA_AYAHS = [
  {
    n: 1,
    ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    ph: "Bismi-llâhi r-rahmâni r-rahîm",
    fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.",
    err: "Erreur fréquente (~60 % des débutants) : avaler le « i » de Bismi, ou lire Allah comme « Alah » sans la lam emphatique. Le Hâ de Ar-Rahmân n'est pas un « r » français.",
  },
  {
    n: 2,
    ar: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
    ph: "Al-hamdu li-llâhi rabbi l-'âlamîn",
    fr: "Louange à Allah, Seigneur des mondes.",
    err: "Le Hâ de al-hamdu se prononce de la gorge, pas comme un « h » muet. Le 'Ayn de al-'âlamîn est la lettre la plus souvent ratée (près d'1 élève sur 2).",
  },
  {
    n: 3,
    ar: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    ph: "Ar-rahmâni r-rahîm",
    fr: "Le Tout Miséricordieux, le Très Miséricordieux.",
    err: "Shadda du Râ (ar-Rahmân) oubliée : on entend « a-rahman ». Le madd de â dans rahmân est trop court chez beaucoup de francophones.",
  },
  {
    n: 4,
    ar: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
    ph: "Mâliki yawmi d-dîn",
    fr: "Maître du Jour de la Rétribution.",
    err: "Confusion Mâliki (avec alif, « possesseur ») et Maliki. Le Yawm n'est pas « yaoum » relâché. Ad-dîn : shadda du Dâl.",
  },
  {
    n: 5,
    ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    ph: "Iyyâka na'budu wa iyyâka nasta'în",
    fr: "C'est Toi que nous adorons, c'est Toi dont nous implorons le secours.",
    err: "Erreur n°1 du verset : shadda du Yâ (Iyyâka). Sans elle, le sens peut changer. 'Ayn de na'budu et nasta'în trop faible. Qalqala du Dâl de na'budu oubliée.",
  },
  {
    n: 6,
    ar: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    ph: "Ihdinâ s-sirâta l-mustaqîm",
    fr: "Guide-nous sur le droit chemin.",
    err: "As-sirât : le Sâd est une lettre lourde, pas un « s » français. Environ 1 débutant sur 3 lit « sirat » au lieu de « ssirât ». Qaf de mustaqîm trop en avant.",
  },
  {
    n: 7,
    ar: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
    ph: "Sirâta lladhîna an'amta 'alayhim ghayri l-maghdûbi 'alayhim wa lâ d-dâllîn",
    fr: "Le chemin de ceux que Tu as comblés de bienfaits, non pas de ceux qui ont encouru Ta colère, ni des égarés.",
    err: "An'amta : 'Ayn. Al-maghdûbi : Ghayn puis Dâd (pas « magdoubi »). Ad-dâllîn : Dâd + madd long + shadda. C'est le verset où l'on passe le plus de temps en correction.",
  },
];

const LAST_SURAHS = [
  {
    name: "Sourate Al-Ikhlâs (112)",
    ar: "قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
    ph: "Qul huwa llâhu ahad. Allâhu s-samad. Lam yalid wa lam yûlad. Wa lam yakun lahû kufuwan ahad.",
    fr: "Dis : Lui, Allah, est Unique. Allah, le Seul à être imploré. Il n'a pas engendré et n'a pas été engendré. Et nul n'est égal à Lui.",
    err: "Qul : qalqala du Qaf. Ahad : Hâ de la gorge. As-samad : Sâd lourd. Kufuwan : waw trop « ou » français.",
  },
  {
    name: "Sourate Al-Falaq (113)",
    ar: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    ph: "Qul a'ûdhu bi-rabbi l-falaq. Min sharri mâ khalaq. Wa min sharri ghâsiqin idhâ waqab. Wa min sharri n-naffâthâti fî l-'uqad. Wa min sharri hâsidin idhâ hasad.",
    fr: "Dis : je cherche protection auprès du Seigneur de l'aube naissante…",
    err: "'Aûdhu : 'Ayn + dhâl (pas « aouzu »). Ghâsiq : Ghayn. Naffâthât : thâ (langue entre les dents). Hâsid : Hâ.",
  },
  {
    name: "Sourate An-Nâs (114)",
    ar: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ ۝ مَلِكِ ٱلنَّاسِ ۝ إِلَٰهِ ٱلنَّاسِ ۝ مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ ۝ ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ ۝ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
    ph: "Qul a'ûdhu bi-rabbi n-nâs. Maliki n-nâs. Ilâhi n-nâs. Min sharri l-waswâsi l-khannâs. Alladhî yuwaswisu fî sudûri n-nâs. Mina l-jinnati wa n-nâs.",
    fr: "Dis : je cherche protection auprès du Seigneur des hommes…",
    err: "An-nâs : madd du alif. Khannâs : khâ + shadda. Sudûr : Sâd. Jinnati : jîm, pas « djinnati » relâché.",
  },
];

export const metadata = buildPageMetadata({
  title: "Cours de Fatiha 100% gratuit avec professeur | Groupe WhatsApp | Institut ISHES",
  description:
    "Cours de Fatiha 100 % gratuit avec professeur : correction d'Al-Fatiha et des 3 dernières sourates, en ligne, groupe WhatsApp. Inscription sans frais — Institut ISHES.",
  path: "/fr/correction-fatiha",
  keywords: [
    "cours de fatiha",
    "cours fatiha gratuit",
    "cours de fatiha avec professeur",
    "cours fatiha 100% gratuit",
    "correction fatiha",
    "correction al fatiha",
    "apprendre la fatiha",
    "réciter la fatiha",
    "fatiha prière",
    "sourate fatiha",
    "groupe whatsapp cours fatiha",
    "cours coran gratuit",
    "tajwid fatiha",
    "apprendre la prière fatiha",
    "fatiha en ligne",
    "professeur fatiha",
    "phonétique fatiha",
    "fatiha en arabe",
    "fatiha phonétique français",
    "erreurs fatiha",
    "réciter al fatiha",
    "apprendre al fatiha en français",
    "sourate al fatiha",
    "ikhlaas falaq nas",
  ],
  image: "/images/ai_quran.png",
});

export default function CorrectionFatihaPage() {
  const course = PROGRAMS_DATA["correction_fatiha"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Cours de Fatiha gratuit", path: "/fr/correction-fatiha" },
        ])}
      />
      <JsonLd
        data={courseJsonLd({
          name: "Cours de Fatiha 100 % gratuit avec professeur — groupe WhatsApp",
          description:
            "Correction d'Al-Fatiha et des 3 dernières sourates avec un professeur, en ligne, groupe WhatsApp. Module 100 % gratuit.",
          path: "/fr/correction-fatiha",
          price: "0",
          courseMode: "Online",
          image: "/images/ai_quran.png",
          isAccessibleForFree: true,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline: "Cours de Fatiha gratuit avec professeur et groupe WhatsApp",
          description:
            "Pourquoi corriger Al-Fatiha avec un professeur, comment rejoindre le groupe WhatsApp, et comment s'inscrire 100 % gratuitement.",
          path: "/fr/correction-fatiha",
          image: "/images/ai_quran.png",
          keywords: [
            "cours de fatiha",
            "cours fatiha gratuit",
            "cours de fatiha avec professeur",
            "groupe whatsapp",
          ],
          about: ["Al-Fatiha", "Prière musulmane", "Tajwid", "Institut ISHES"],
        })}
      />
      <JsonLd data={faqJsonLd(FATIHA_FAQS)} />
      <JsonLd
        data={howToJsonLd({
          name: "Comment suivre le cours de Fatiha gratuit ISHES",
          description:
            "Inscription 100 % gratuite, professeur en direct, groupe WhatsApp.",
          path: "/fr/correction-fatiha",
          steps: [
            {
              name: "S'inscrire gratuitement",
              text: "Inscription en ligne à 0 €, sans carte bancaire.",
            },
            {
              name: "Rejoindre le professeur",
              text: "Séance en direct : tu récites, le professeur corrige Al-Fatiha et les 3 dernières sourates.",
            },
            {
              name: "Entrer dans le groupe WhatsApp",
              text: "Questions, rappels et entraide dans le groupe WhatsApp du module.",
            },
          ],
        })}
      />

      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f2ece4] px-4 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-ishes-gold" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                100 % gratuit · avec professeur · WhatsApp
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Cours de Fatiha
              <br />
              100 % gratuit
            </h1>
            <p className="text-2xl font-black text-ishes-gold leading-tight">
              Avec un professeur, en groupe WhatsApp — Al-Fatiha et les 3 dernières sourates.
            </p>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Un <strong>cours de Fatiha avec professeur</strong>, pas une vidéo seule : tu récites, on
              corrige, tu pries l&apos;esprit tranquille. <strong>Inscription 100 % gratuite</strong>.
            </p>
            <div className="w-12 h-0.5 bg-ishes-gold my-6"></div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/inscription?plan=correction_fatiha&audience=adulte"
                className="inline-flex items-center justify-center gap-2 bg-ishes-blue hover:bg-ishes-blue/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-blue/20 hover:-translate-y-1"
              >
                JE M&apos;INSCRIS GRATUITEMENT <ArrowRightIcon />
              </Link>
              <a
                href={WHATSAPP_DISTANCE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" /> Groupe WhatsApp
              </a>
              {videoUrl && (
                <Link
                  href={videoUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
                >
                  <PlayCircle className="w-5 h-5" /> Voir le teaser
                </Link>
              )}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-ishes-blue">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title="Cours de Fatiha gratuit avec professeur — Institut ISHES"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src="/images/ai_quran.png"
                  alt="Cours de Fatiha 100% gratuit avec professeur — Institut ISHES"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              Professeur
              <br />
              <span className="text-gray-500 font-medium">en direct</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              Groupe
              <br />
              <span className="text-gray-500 font-medium">WhatsApp</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              Début
              <br />
              <span className="text-gray-500 font-medium">Octobre 2026</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              Dimanche
              <br />
              <span className="text-gray-500 font-medium">11h00 (France)</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              En direct
              <br />
              <span className="text-gray-500 font-medium">sur Zoom</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <Award className="w-6 h-6 text-ishes-gold" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-ishes-gold rotate-45"></div>
            </div>
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              Pas de
              <br />
              <span className="text-gray-500 font-medium">diplôme</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              Durée
              <br />
              <span className="text-gray-500 font-medium">Une session</span>
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">
              100 %
              <br />
              <span className="text-gray-500 font-medium">gratuit</span>
            </span>
          </div>
        </div>
      </section>

      <article className="px-6 max-w-4xl mx-auto py-16 space-y-10 text-[15px] leading-relaxed text-gray-700">
        <header className="space-y-4">
          <h2 className="text-3xl font-black text-ishes-blue">
            Cours de Fatiha avec professeur : pourquoi c&apos;est 100 % gratuit
          </h2>
          <p>
            La prière n&apos;est pas valide sans Al-Fatiha. Le Prophète ﷺ a dit : « Pas de prière pour celui
            qui ne récite pas la Fatiha du Livre. » Beaucoup cherchent un{" "}
            <strong>cours de Fatiha avec professeur</strong> plutôt qu&apos;une vidéo. L&apos;Institut ISHES
            offre ce module : <strong>cours de Fatiha 100 % gratuit</strong>, correction en direct,{" "}
            <strong>groupe WhatsApp</strong>.
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-ishes-dark">
            Combien de gens récitent mal la Fatiha ?
          </h3>
          <p>
            Ce n&apos;est pas une statistique d&apos;État : c&apos;est ce que voient les enseignants ISHES à
            chaque session de correction (francophones, tous niveaux) :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Plus de 70 %</strong> commettent au moins une faute d&apos;articulation dès la première
              lecture d&apos;Al-Fatiha.
            </li>
            <li>
              <strong>Environ 50 %</strong> affaiblissent ou sautent le <strong>&apos;Ayn</strong> (na&apos;budu,
              nasta&apos;în, an&apos;amta).
            </li>
            <li>
              <strong>Près de 40 %</strong> oublient la shadda d&apos;<strong>Iyyâka</strong> — faute qui peut
              changer le sens.
            </li>
            <li>
              <strong>Environ 30 %</strong> lisent le <strong>Sâd</strong> de as-sirât comme un « s » français,
              et le <strong>Dâd</strong> de ad-dâllîn comme un « d ».
            </li>
            <li>
              <strong>Plus de 80 %</strong> des débutants complets ont besoin d&apos;une oreille (professeur),
              pas seulement d&apos;une phonétique écrite.
            </li>
          </ul>
          <p>
            D&apos;où ce <strong>cours de Fatiha avec professeur</strong> : tu récites, on corrige, tu
            répètes. La phonétique ci-dessous sert de mémo ; le groupe WhatsApp sert de suivi.
          </p>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-ishes-dark">
            Sourate Al-Fatiha en arabe, en phonétique et en français
          </h3>
          <p>
            Apprendre à <strong>réciter Al-Fatiha</strong>, c&apos;est voir le verset en arabe, le lire en
            phonétique française, comprendre le sens, puis corriger l&apos;erreur récurrente avec un
            professeur.
          </p>
          <div className="space-y-5">
            {FATIHA_AYAHS.map((aya) => (
              <div
                key={aya.n}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-ishes-gold">
                  Verset {aya.n}
                </p>
                <p
                  className="text-2xl md:text-3xl leading-loose text-ishes-blue text-right"
                  dir="rtl"
                  lang="ar"
                >
                  {aya.ar}
                </p>
                <p className="font-bold text-ishes-dark italic">{aya.ph}</p>
                <p className="text-gray-600">{aya.fr}</p>
                <p className="text-sm text-gray-500 border-t border-gray-100 pt-3">
                  <span className="font-black text-ishes-gold">Erreur récurrente : </span>
                  {aya.err}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-ishes-dark">
            Les 3 dernières sourates : arabe, phonétique, fautes fréquentes
          </h3>
          <p>
            Le module gratuit corrige aussi <strong>Al-Ikhlâs, Al-Falaq et An-Nâs</strong> — celles que l&apos;on
            récite le plus souvent après Al-Fatiha.
          </p>
          {LAST_SURAHS.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3"
            >
              <h4 className="font-black text-ishes-blue">{s.name}</h4>
              <p
                className="text-xl md:text-2xl leading-loose text-ishes-blue text-right"
                dir="rtl"
                lang="ar"
              >
                {s.ar}
              </p>
              <p className="font-bold text-ishes-dark italic">{s.ph}</p>
              <p className="text-gray-600">{s.fr}</p>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-3">
                <span className="font-black text-ishes-gold">Erreur récurrente : </span>
                {s.err}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-ishes-dark">Ce que tu apprends en séance</h3>
          <p>
            Chaque verset d&apos;Al-Fatiha, puis les trois dernières sourates. Makhârij, voyelles, shadda,
            madd, qalqala. Tu récites ; le professeur corrige. Le <strong>groupe WhatsApp</strong> sert à
            renvoyer un audio si un verset reste bloqué.
          </p>
        </section>
      </article>

      <section className="pt-4 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">
            Ce cours de Fatiha est fait pour toi si...
          </h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: UserRound, title: "Tu ne connais pas\nton niveau de\nrécitation." },
            { icon: CircleHelp, title: "Tu hésites dans\nta récitation." },
            { icon: Search, title: "Tu ne sais pas si tu\nfais des erreurs\nmajeures ou mineures." },
            { icon: Volume2, title: "Tu as des problèmes\nde prononciations." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20"
            >
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-[17px] font-black text-ishes-blue whitespace-pre-line leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">
            Pourquoi un professeur (et un groupe WhatsApp) change tout
          </h2>
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-100">
            <Image
              src="/images/livre_ramadan.png"
              alt="Cours de Fatiha gratuit avec professeur — correction de récitation ISHES"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-10">
            {[
              {
                title: "Professeur en direct",
                desc: "Tu récites Al-Fatiha ; un enseignant ISHES corrige lettre par lettre. Ce n'est pas un cours de Fatiha « vidéo seule ».",
              },
              {
                title: "Groupe WhatsApp",
                desc: "Questions, rappels, entraide : le groupe WhatsApp du module reste ouvert après la séance.",
              },
              {
                title: "100 % gratuit",
                desc: "Zéro euro. L'institut offre ce cours de Fatiha à la communauté : inscription, professeur, WhatsApp.",
              },
              {
                title: "Orientation Tajwid si besoin",
                desc: "Si les bases manquent, on t'oriente vers un cursus Tajwid payant — le module Fatiha reste offert.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-ishes-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black text-ishes-blue mb-2">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ — Cours de Fatiha gratuit"
        title="Professeur, groupe WhatsApp, inscription 100 % gratuite"
        items={FATIHA_FAQS}
      />
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
