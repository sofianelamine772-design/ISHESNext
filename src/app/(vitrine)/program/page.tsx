import Link from "next/link";
import { Suspense } from "react";
import { Loader2, MapPin, Monitor, BookOpen, Users, GraduationCap, ArrowRight } from "lucide-react";
import { ProgramContent } from "@/components/vitrine/ProgramContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
  organizationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Catalogue | Institut de sciences religieuses en ligne — ISHES",
  description:
    "Formations d'un institut de science religieuse en ligne et à Toulouse : arabe, Tajwid, Fiqh mâlikite, Hifz, Aqîda, Sîrah et Tarbiya. Adultes et enfants, présentiel ou distanciel.",
  path: "/program",
  keywords: [
    "formations institut ishes",
    "institut de sciences religieuses en ligne",
    "meilleurs instituts de science religieuse en ligne",
    "cours arabe toulouse",
    "cours arabe en ligne",
    "cours tajwid",
    "fiqh malikite",
    "mémorisation coran",
    "sciences islamiques à distance",
    "cours islam enfant toulouse",
    "apprendre le coran",
    "institut islamique toulouse",
  ],
  image: "/images/quran-coffee.png",
});

const PROGRAM_FAQS = [
  {
    question: "Quelles formations propose l'Institut ISHES ?",
    answer:
      "L'Institut ISHES propose des formations en langue arabe, Tajwid et lecture du Coran, mémorisation (Hifz), Fiqh mâlikite, Aqîda, Sîrah, Tarbiya Islamiyya, civilisation arabo-musulmane, ainsi que des formations d'enseignants. Les parcours existent pour adultes et enfants, en présentiel à Toulouse ou à distance.",
  },
  {
    question: "ISHES est-il un institut de science religieuse en ligne ?",
    answer:
      "Oui. ISHES est un institut de sciences religieuses en ligne et à Toulouse : le catalogue couvre l'arabe, le Tajwid, le Fiqh mâlikite et les sciences islamiques, avec cours en direct, replays et Pack Accompagnement. C'est ce que l'on attend des meilleurs instituts de science religieuse en ligne — un cursus, pas seulement des vidéos.",
  },
  {
    question: "Quelle différence entre présentiel et distanciel ?",
    answer:
      "Le présentiel se déroule à Toulouse, en salle, avec un cadre collectif. Le distanciel se fait en ligne (cours en direct sur Zoom, replays, suivi pédagogique) et reste accessible partout en francophonie. Le catalogue /program permet de filtrer selon le mode choisi.",
  },
  {
    question: "Les cours sont-ils adaptés aux débutants ?",
    answer:
      "Oui. Plusieurs cursus sont conçus pour les débutants : Tajwid Standard, arabe adulte, présentiel femmes débutantes, parcours enfants, etc. Chaque fiche précise le public et le niveau attendu.",
  },
  {
    question: "Comment s'inscrire à une formation ?",
    answer:
      "Choisissez votre formation sur cette page, puis cliquez pour accéder à la fiche et à l'inscription en ligne. Le paiement peut souvent être effectué en plusieurs fois sans frais.",
  },
  {
    question: "Proposez-vous des cours pour enfants ?",
    answer:
      "Oui. L'ISHES propose des cours d'arabe et de Tajwid pour enfants, en distanciel et en présentiel à Toulouse (créneaux mercredi, samedi ou dimanche selon les classes).",
  },
  {
    question: "Je ne sais pas quelle formation choisir : que faire ?",
    answer:
      "Demandez un entretien gratuit (page Contact, WhatsApp ou rendez-vous Zoom de 15 minutes). Un conseiller ISHES vous aide à choisir selon l'âge, le niveau et le mode (Toulouse ou distance), sans engagement.",
  },
  {
    question: "Le cours de Fatiha est-il vraiment 100 % gratuit ?",
    answer:
      "Oui. La correction d'Al-Fatiha (et des 3 dernières sourates) est un cours de Fatiha avec professeur, 100 % gratuit, avec groupe WhatsApp. Inscription sans paiement sur la page Correction al Fatiha.",
  },
];

const COURSE_LINKS = [
  {
    href: "/fr/cours-arabe-adulte",
    title: "Cours d'arabe adulte",
    desc: "Langue arabe littéraire, lecture et compréhension.",
  },
  {
    href: "/fr/cours-lecture-tajwid",
    title: "Cours de Tajwid",
    desc: "Apprendre à lire le Coran avec justesse et méthode.",
  },
  {
    href: "/fr/cours-fiqh-malikite",
    title: "Fiqh mâlikite",
    desc: "Actes d'adoration selon l'école de l'Imam Mâlik.",
  },
  {
    href: "/fr/cours-memoriser-coran",
    title: "Mémorisation du Coran",
    desc: "Parcours de Hifz avec suivi pédagogique.",
  },
  {
    href: "/fr/cours-en-presentiel",
    title: "Cours en présentiel",
    desc: "Formations à Toulouse pour adultes et enfants.",
  },
  {
    href: "/fr/cours-a-distance",
    title: "Cours à distance",
    desc: "Formations en ligne en direct, avec replays.",
  },
  {
    href: "/fr/fiches-pratiques",
    title: "Fiches pratiques gratuites",
    desc: "Les Clés du Coran, Sciences du Coran, frise de la Révélation.",
  },
];

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-ishes-blue selection:text-white overflow-hidden relative">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
        ])}
      />
      <JsonLd data={faqJsonLd(PROGRAM_FAQS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Catalogue de formations — Institut ISHES",
          description:
            "Formations en langue arabe, Tajwid, Fiqh mâlikite et sciences islamiques à Toulouse et en ligne.",
          url: absoluteUrl("/program"),
          numberOfItems: 8,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Course",
                name: "Langue Arabe (Adulte)",
                description: "Apprentissage de la langue arabe pour adultes francophones.",
                url: absoluteUrl("/fr/cours-arabe-adulte"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Course",
                name: "Tajwid Standard",
                description: "Apprendre à lire le Coran avec les règles du Tajwid.",
                url: absoluteUrl("/fr/cours-lecture-tajwid"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Course",
                name: "Fiqh Mâlikite",
                description: "Jurisprudence islamique selon l'école malikite (Matn Ibn Achir).",
                url: absoluteUrl("/fr/cours-fiqh-malikite"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "Course",
                name: "Mémorisation du Coran (Hifz)",
                description: "Parcours de mémorisation du Coran avec suivi.",
                url: absoluteUrl("/fr/cours-memoriser-coran"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 5,
              item: {
                "@type": "Course",
                name: "Tajwid Intensif",
                description: "Apprentissage accéléré des règles du Tajwid en 3 mois.",
                url: absoluteUrl("/fr/cours-tajwid-intensif"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 6,
              item: {
                "@type": "Course",
                name: "Arabe Enfant",
                description: "Cours d'arabe pour enfants, en ligne ou à Toulouse.",
                url: absoluteUrl("/fr/cours-arabe-enfant"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 7,
              item: {
                "@type": "Course",
                name: "Cours en Présentiel Toulouse",
                description: "Formations en présentiel à Toulouse pour adultes et enfants.",
                url: absoluteUrl("/fr/cours-en-presentiel"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
            {
              "@type": "ListItem",
              position: 8,
              item: {
                "@type": "Course",
                name: "Formation Enseignant",
                description: "Devenir enseignant en Tajwid ou Tarbiya Islamiyya.",
                url: absoluteUrl("/formation-enseignant"),
                provider: { "@type": "Organization", name: "Institut ISHES", url: SITE_URL },
              },
            },
          ],
        }}
      />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-ishes-blue animate-spin" />
          </div>
        }
      >
        <ProgramContent />
      </Suspense>

      {/* ─── CONTENU SEO VISIBLE ─── */}
      <section className="bg-[#fafafa] border-t border-gray-100 py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          <div>
            <p className="text-ishes-gold font-black text-xs uppercase tracking-[0.2em] mb-4">
              Catalogue ISHES
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight mb-6">
              Formations d&apos;arabe, de Tajwid et de sciences islamiques à Toulouse et en ligne
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-base md:text-lg">
              <p>
                La page <strong>Formations</strong> de l&apos;Institut ISHES regroupe l&apos;ensemble
                de nos cursus : <strong>cours d&apos;arabe</strong>,{" "}
                <strong>lecture et Tajwid</strong>, <strong>mémorisation du Coran (Hifz)</strong>,{" "}
                <strong>Fiqh mâlikite</strong>, Aqîda, Sîrah, Tarbiya Islamiyya et formations
                d&apos;enseignants. Que vous soyez à Toulouse ou ailleurs dans la francophonie, vous
                pouvez filtrer par <strong>présentiel</strong> ou <strong>distanciel</strong>, et
                par public <strong>adulte</strong> ou <strong>enfant</strong>.
              </p>
              <p>
                Depuis plus de 16 ans, l&apos;ISHES accompagne des milliers d&apos;élèves avec une
                pédagogie adaptée aux francophones, des supports exclusifs (comme{" "}
                <em>Les Clés du Coran</em> pour le Tajwid) et un suivi réel. L&apos;objectif n&apos;est
                pas seulement d&apos;accumuler des connaissances : c&apos;est de comprendre sa religion,
                de progresser dans la lecture du Coran et de cheminer avec un cadre clair.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-ishes-blue flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-ishes-gold" />
                </div>
                <h3 className="text-xl font-black text-ishes-blue">Présentiel à Toulouse</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-4">
                Nos cours en présentiel se déroulent à <strong>Toulouse</strong> : arabe et Tajwid
                pour femmes (débutantes et intermédiaires), parcours enfants selon les créneaux
                (mercredi, samedi, dimanche), et autres formations selon le calendrier de rentrée.
              </p>
              <Link
                href="/fr/cours-en-presentiel"
                className="inline-flex items-center gap-2 text-ishes-gold font-bold text-sm hover:underline"
              >
                Voir les cours en présentiel <ArrowRight className="w-4 h-4" />
              </Link>
            </article>

            <article className="bg-white border border-[#e6d5b8]/40 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-ishes-blue flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-ishes-gold" />
                </div>
                <h3 className="text-xl font-black text-ishes-blue">Distanciel en ligne</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-4">
                Les formations à distance se font en <strong>direct sur Zoom</strong>, avec{" "}
                <strong>replays</strong>, supports pédagogiques et suivi. Idéal pour apprendre
                l&apos;arabe, le Tajwid, le Fiqh ou la Tarbiya où que vous soyez, à votre rythme
                dans un cadre structuré.
              </p>
              <Link
                href="/fr/cours-a-distance"
                className="inline-flex items-center gap-2 text-ishes-gold font-bold text-sm hover:underline"
              >
                Voir les cours à distance <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          </div>

          <div>
            <h3 className="text-2xl font-black text-ishes-blue mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-ishes-gold" />
              Adultes, enfants et futurs enseignants
            </h3>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                <strong>Pour les adultes</strong> : langue arabe, Tajwid standard ou intensif,
                Fiqh mâlikite, sciences islamiques (Aqîda, Sîrah, sciences du Coran), spiritualité
                et Tarbiya. Des parcours débutants jusqu&apos;aux formations avancées.
              </p>
              <p>
                <strong>Pour les enfants</strong> : arabe et Tajwid adaptés à leur âge, en ligne
                ou en présentiel à Toulouse, avec une pédagogie progressive et bienveillante.
              </p>
              <p>
                <strong>Pour transmettre</strong> : formations d&apos;enseignants en Tajwid et en
                Tarbiya Islamiyya, pour ceux qui souhaitent enseigner avec méthode et légitimité.
              </p>
              <Link
                href="/formation-enseignant"
                className="inline-flex items-center gap-2 text-ishes-gold font-bold text-sm hover:underline"
              >
                Découvrir les formations enseignant <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-ishes-blue mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-ishes-gold" />
              Parcours les plus demandés
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COURSE_LINKS.map((course) => (
                <Link
                  key={course.href}
                  href={course.href}
                  className="group bg-white border border-gray-100 hover:border-ishes-gold/40 rounded-2xl p-5 transition-all hover:shadow-md"
                >
                  <h4 className="font-black text-ishes-blue group-hover:text-ishes-gold transition-colors mb-2">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {course.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-ishes-blue rounded-[2rem] p-8 md:p-10 text-white">
            <div className="flex items-start gap-4 mb-4">
              <GraduationCap className="w-8 h-8 text-ishes-gold shrink-0 mt-1" />
              <div>
                <h3 className="text-xl md:text-2xl font-black mb-3">
                  Comment choisir sa formation sur cette page ?
                </h3>
                <ol className="space-y-2 text-white/85 font-medium leading-relaxed list-decimal list-inside">
                  <li>Sélectionnez <strong className="text-white">Présentiel</strong> ou <strong className="text-white">Distanciel</strong>.</li>
                  <li>Choisissez le public : <strong className="text-white">Adulte</strong> ou <strong className="text-white">Enfant</strong>.</li>
                  <li>Parcourez les cartes, ouvrez la fiche détaillée, puis inscrivez-vous en ligne.</li>
                </ol>
                <p className="mt-4 text-white/80 font-medium">
                  Une question sur le niveau, le créneau ou l&apos;inscription d&apos;un enfant&nbsp;? Demandez un{" "}
                  <Link href="/contact" className="text-ishes-gold font-bold underline underline-offset-2">
                    entretien gratuit
                  </Link>{" "}
                  : l&apos;équipe vous oriente vers le parcours adapté, sans engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ Formations"
        title="Questions fréquentes sur nos formations"
        items={PROGRAM_FAQS}
      />

      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-500 font-medium mb-6 max-w-2xl mx-auto">
            Prêt à commencer ? Retrouvez aussi notre{" "}
            <Link href="/institut" className="text-ishes-blue font-bold hover:underline">
              institut présentiel
            </Link>
            , la{" "}
            <Link href="/boutique" className="text-ishes-blue font-bold hover:underline">
              boutique de supports
            </Link>{" "}
            et le{" "}
            <Link href="/pack-accompagnement" className="text-ishes-blue font-bold hover:underline">
              Pack Accompagnement
            </Link>
            .
          </p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 bg-ishes-gold hover:bg-[#b08b54] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all"
          >
            Passer à l&apos;inscription <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
