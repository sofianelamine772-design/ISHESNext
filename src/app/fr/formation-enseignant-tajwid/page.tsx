import Link from "next/link";
import Image from "next/image";
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
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
import { PROGRAMS_DATA } from "@/lib/programs-data";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Home,
  MessageCircle,
  Monitor,
  School,
  Users,
} from "lucide-react";

const DEVIS = "/fr/rendez-vous";
const WHATSAPP =
  "https://wa.me/33666033519?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20la%20formation%20enseignant%20de%20Tajwid.";

const FAQS = [
  {
    question: "Faut-il déjà maîtriser le Tajwid pour s'inscrire ?",
    answer:
      "Non. Aucun prérequis n'est exigé pour s'inscrire. La formation accueille celles et ceux qui veulent transmettre, même si la récitation doit encore être travaillée. Le troisième module sert justement à écouter, repérer les points faibles et les corriger avant d'enseigner.",
  },
  {
    question: "Comment obtenir le tarif de la formation enseignant de Tajwid ?",
    answer:
      "Le tarif est sur devis. Il s'obtient en écrivant à l'équipe, par la page de rendez-vous ou sur WhatsApp au 06 66 03 35 19. Le devis précise le rythme, les supports et les facilités de paiement, avant toute inscription.",
  },
  {
    question: "Combien de temps dure la formation et à quels horaires ?",
    answer:
      "Elle dure 4 à 5 mois, à partir d'octobre 2026. Deux cours par semaine, le lundi et le jeudi à 19h30, en direct sur Zoom, avec les replays. La certification Formation enseignant ISHES est remise à la fin du parcours validé.",
  },
  {
    question: "À qui s'adresse la formation ?",
    answer:
      "Aux enseignants déjà en poste qui veulent structurer leurs cours, aux futurs enseignants qui préparent un poste en mosquée, en école ou en association, et aux parents qui transmettent le Coran à la maison. Le point commun : vouloir transmettre, et bien le faire.",
  },
  {
    question: "Une ijaza suffit-elle pour enseigner le Tajwid ?",
    answer:
      "Non. Une ijaza atteste une transmission de la récitation. Elle ne donne pas, à elle seule, la manière de préparer une séance, d'expliquer une règle à un débutant, de gérer un groupe ou de répondre à un parent. Cette formation travaille ces compétences pédagogiques, avec Les Clés du Coran.",
  },
  {
    question: "Quelle est la différence avec le cours de Tajwid pour apprendre à lire ?",
    answer:
      "Le Tajwid standard et le Tajwid intensif apprennent à lire le Coran. La formation enseignant apprend à transmettre cette lecture : progression, explication, correction et accompagnement d'un élève. Le support est le même, Les Clés du Coran, volumes 1 et 2.",
  },
];

export const metadata = buildPageMetadata({
  title: "Formation enseignant de Tajwid en ligne",
  description:
    "Devenir enseignant de Tajwid : Les Clés du Coran, pédagogie et correction. Lundi et jeudi 19h30, 4 à 5 mois, Zoom. Sur devis, ISHES.",
  path: "/fr/formation-enseignant-tajwid",
  keywords: [
    "formation enseignant tajwid",
    "devenir enseignant de tajwid",
    "enseigner le tajwid",
    "professeur de coran",
    "formation professeur tajwid en ligne",
    "les clés du coran",
    "nour al bayan",
    "pédagogie du coran",
    "certification enseignant tajwid",
    "institut ishes",
  ],
  image: "/images/formations/enseignant-tajwid-1.jpg",
});

export default function FormationEnseignantTajwidPage() {
  const videoUrl = PROGRAMS_DATA.formation_enseignante_tajwid?.videoUrl as string | undefined;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#101828]">
      <JsonLd
        data={courseJsonLd({
          name: "Formation enseignant de Tajwid",
          description:
            "Formation en ligne pour apprendre à enseigner le Tajwid avec Les Clés du Coran : pédagogie, correction de la récitation et accompagnement des élèves. 4 à 5 mois, sur devis.",
          path: "/fr/formation-enseignant-tajwid",
          courseMode: "Online",
          workload: "P5M",
          image: "/images/formations/enseignant-tajwid-1.jpg",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/program" },
          { name: "Formation enseignant de Tajwid", path: "/fr/formation-enseignant-tajwid" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Formation enseignant de Tajwid en ligne",
          description:
            "Comment se former pour enseigner le Tajwid : Les Clés du Coran, trois modules, correction de la récitation et certification ISHES.",
          path: "/fr/formation-enseignant-tajwid",
          image: "/images/formations/enseignant-tajwid-1.jpg",
          dateModified: "2026-10-10",
          keywords: ["formation enseignant tajwid", "enseigner le coran", "clés du coran"],
          wordCount: 1600,
          about: ["Tajwid", "Formation d'enseignant", "Les Clés du Coran", "Pédagogie"],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment se former pour enseigner le Tajwid",
          description:
            "Le parcours de la formation enseignant de Tajwid ISHES, de la prise de contact à la certification.",
          path: "/fr/formation-enseignant-tajwid",
          steps: [
            {
              name: "Demander un devis",
              text: "Écrire à l'équipe pour préciser le projet : classe, mosquée, association ou transmission en famille.",
            },
            {
              name: "Apprendre à enseigner avec Les Clés du Coran",
              text: "Suivre la progression des deux volumes, du tahajjî jusqu'aux règles du Tajwid.",
            },
            {
              name: "Travailler la correction",
              text: "Écouter une récitation, choisir le point prioritaire, expliquer, puis faire reprendre.",
            },
            {
              name: "Valider la certification",
              text: "Au bout de 4 à 5 mois, le parcours validé donne la certification Formation enseignant ISHES.",
            },
          ],
        })}
      />

      <section className="relative w-full overflow-hidden bg-white pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-black tracking-[0.22em] text-[11px] uppercase mb-5 text-ishes-gold">
                Se former pour mieux transmettre
              </p>
              <h1 className="text-[36px] sm:text-5xl md:text-[52px] font-black text-ishes-blue leading-[1.12] tracking-tight mb-6">
                Formation enseignant{" "}
                <span className="text-ishes-gold">de Tajwid en ligne</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
                Parce qu&apos;un bon étudiant ne devient pas forcément un bon enseignant.
                Apprends à utiliser Les Clés du Coran, à expliquer les règles et à accompagner
                tes élèves.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={DEVIS}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl shadow-xl shadow-[#c8a063]/30 transition-all"
                >
                  Je veux contacter le formateur <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-[#e6d5b8] text-ishes-blue font-bold text-sm rounded-xl hover:bg-[#f5efe4] transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Demander un devis
                </a>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-ishes-blue">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title="Présentation de la formation enseignant de Tajwid — Institut ISHES"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <Image
                  src="/images/formations/enseignant-tajwid-1.jpg"
                  alt="Formation enseignant de Tajwid en ligne — Institut ISHES"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Calendar, label: "Durée", value: "4 à 5 mois" },
              { icon: Clock, label: "Rythme", value: "Lundi et jeudi, 19h30" },
              { icon: Monitor, label: "Format", value: "Zoom en direct + replays" },
              { icon: Award, label: "Fin", value: "Certification ISHES" },
            ].map((item) => (
              <div key={item.label} className="bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-2xl p-4">
                <item.icon className="w-5 h-5 text-[#c8a063] mb-2" />
                <dt className="text-[10px] font-black uppercase tracking-widest text-[#c8a063] mb-1">
                  {item.label}
                </dt>
                <dd className="text-sm font-bold text-ishes-blue leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CourseCadenceNote>
        Dès octobre 2026, deux cours par semaine, le lundi et le jeudi à 19h30, en direct sur
        Zoom. Si tu rates une séance, le replay est là. En 4 à 5 mois, avec Les Clés du Coran,
        tu valides la certification Formation enseignant ISHES. Le tarif est sur devis.
      </CourseCadenceNote>

      <section className="py-16 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            À qui s&apos;adresse cette formation ?
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Pour toute personne qui souhaite transmettre, et bien le faire. Aucun prérequis
            pour s&apos;inscrire.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: School,
                title: "Enseignants en poste",
                text: "Tu enseignes déjà et tu veux structurer tes cours, ou améliorer ta manière d'expliquer les règles.",
              },
              {
                icon: Users,
                title: "Futurs enseignants",
                text: "Tu prépares un projet d'enseignement dans une école, une association ou une mosquée.",
              },
              {
                icon: Home,
                title: "Transmission en famille",
                text: "Tu souhaites enseigner à tes enfants ou à des proches, avec méthode et bienveillance.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-white border border-gray-100 rounded-3xl p-6">
                <item.icon className="w-6 h-6 text-[#c8a063] mb-4" />
                <h3 className="font-black text-ishes-blue text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={DEVIS} className="inline-flex items-center gap-2 text-ishes-blue font-bold hover:underline">
              Je veux contacter le formateur <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="programme" className="py-16 px-4 sm:px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-ishes-gold mb-3">
            Un parcours complet et progressif
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-10">
            Trois modules pour apprendre à transmettre
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Enseigner avec Les Clés du Coran",
                items: [
                  "Une adaptation française de Nour Al Bayan.",
                  "La progression de lecture, pas à pas.",
                  "Le tahajjî, puis son application.",
                  "Comment expliquer, puis corriger.",
                ],
              },
              {
                n: "02",
                title: "Apprendre à apprendre",
                items: [
                  "Comment un élève mémorise et progresse.",
                  "Adapter la manière d'enseigner au niveau.",
                  "Tenir l'attention et l'engagement.",
                  "Revenir sur l'erreur et sur la réussite.",
                  "Émotions et métacognition.",
                ],
              },
              {
                n: "03",
                title: "Vérifier et perfectionner la récitation",
                items: [
                  "Repérer ce qui doit encore être travaillé dans ta récitation.",
                  "Corriger un élève sans le décourager.",
                  "Ne pas laisser une erreur devenir une habitude.",
                ],
              },
            ].map((mod) => (
              <article key={mod.n} className="bg-[#faf8f4] rounded-3xl border border-[#e6d5b8]/50 p-6">
                <p className="text-[#c8a063] font-black tracking-widest mb-3">{mod.n}</p>
                <h3 className="text-xl font-black text-ishes-blue mb-4">{mod.title}</h3>
                <ul className="space-y-2">
                  {mod.items.map((line) => (
                    <li key={line} className="flex gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/fr/les-cles-du-coran" className="text-ishes-blue font-bold hover:underline">
              Lire la fiche Les Clés du Coran
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-ishes-gold mb-3">
            Un programme structuré
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-10">
            Une progression concrète avec les deux volumes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-white rounded-3xl border border-gray-100 p-7">
              <p className="text-sm font-black text-[#c8a063] mb-2">Volume 1</p>
              <h3 className="text-xl font-black text-ishes-blue mb-4">Installer les bases</h3>
              <p className="text-gray-600 font-medium mb-4">
                Acquérir une lecture correcte et progressive, lettre par lettre, avec des
                explications claires. C&apos;est ce que tu apprendras à faire faire à un débutant.
              </p>
              <ul className="space-y-2 text-sm font-medium text-gray-700">
                {[
                  "Lettres isolées et liées",
                  "Fatha, kasra et damma",
                  "Prolongements et tanwîn",
                  "Soukoun et chaddah",
                  "Exercices, avec des explications claires",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>
            </article>
            <article className="bg-white rounded-3xl border border-gray-100 p-7">
              <p className="text-sm font-black text-[#c8a063] mb-2">Volume 2</p>
              <h3 className="text-xl font-black text-ishes-blue mb-4">Appliquer les règles</h3>
              <p className="text-gray-600 font-medium mb-4">
                Utiliser les règles de Tajwid dans des mots et des versets, avec une
                progression guidée.
              </p>
              <ul className="space-y-2 text-sm font-medium text-gray-700">
                {[
                  "Noun sâkin et tanwîn",
                  "Mîm sâkin et ghounna",
                  "Prolongements",
                  "Idghâm, iqlâb et ikhfâ",
                  "Arrêts, reprises et signes du Moushaf",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a063] shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#101828] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Avoir une ijaza ne donne pas automatiquement les clés pour enseigner
          </h2>
          <p className="text-white/80 font-medium leading-relaxed max-w-3xl mb-10">
            La transmission demande aussi des compétences pédagogiques. Cette formation
            prépare à préparer une séance, à expliquer une règle et à répondre aux questions
            d&apos;un élève ou d&apos;un parent. La certification remise à la fin est celle de
            l&apos;Institut ISHES.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Préparer une classe",
                text: "Fixer un objectif, organiser la progression et choisir des activités adaptées.",
              },
              {
                title: "Gérer une classe",
                text: "Poser un cadre, mobiliser l'attention et faire participer le groupe.",
              },
              {
                title: "Gérer les conflits",
                text: "Intervenir avec discernement et ramener un climat propice à l'apprentissage.",
              },
              {
                title: "Répondre aux parents",
                text: "Expliquer la démarche et communiquer sur les progrès et les difficultés.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-black text-[#c8a063] mb-2">{item.title}</h3>
                <p className="text-sm text-white/80 font-medium leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={DEVIS}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8a063] text-white font-black text-sm rounded-xl"
            >
              Je veux contacter le formateur <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-3">
            Nous prenons le temps d&apos;écouter la récitation et de travailler les points à améliorer
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            En parallèle, tu apprends comment corriger tes propres élèves.
          </p>
          <ol className="grid md:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                title: "Écouter et identifier",
                text: "Repérer précisément la difficulté dans la récitation.",
              },
              {
                n: "02",
                title: "Hiérarchiser les corrections",
                text: "Choisir les priorités et éviter de tout corriger en même temps.",
              },
              {
                n: "03",
                title: "Expliquer et faire reprendre",
                text: "Montrer le geste juste, puis faire reprendre dans un nouvel essai.",
              },
            ].map((step) => (
              <li key={step.n} className="bg-[#faf8f4] rounded-2xl p-6 border border-[#e6d5b8]/40">
                <p className="text-[#c8a063] font-black mb-2">{step.n}</p>
                <h3 className="font-black text-ishes-blue mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="text-center text-sm text-gray-500 font-medium mt-8 max-w-2xl mx-auto">
            Une trop grande quantité de révisions devient vite un apprentissage de la
            confusion. On corrige peu, et on corrige juste.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue text-center mb-10">
            Des situations que tu apprends à accompagner
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Une règle mal expliquée",
                text: "L'élève a récité juste une fois, sans avoir compris la règle. Tu apprends à vérifier la compréhension, pas seulement le résultat.",
              },
              {
                title: "Confusion entre dhâd et dâd",
                text: "Deux lettres proches, un point de sortie différent. Tu apprends à isoler le geste, puis à le remettre dans le mot.",
              },
              {
                title: "Un élève qui décode mal",
                text: "Il devine au lieu de lire. Tu reviens au tahajjî : lettre, voyelle, puis reconstruction du mot.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-white border border-gray-100 rounded-3xl p-6">
                <Heart className="w-5 h-5 text-[#c8a063] mb-3" />
                <h3 className="font-black text-ishes-blue mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-4 text-gray-700 font-medium leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue">
            Devenir enseignant de Tajwid : ce que la formation change
          </h2>
          <p>
            <strong>Devenir enseignant de Tajwid</strong> demande autre chose que de bien
            réciter. Il faut poser une leçon, expliquer une règle à un adulte ou à un enfant,
            corriger sans décourager et tenir une progression sur plusieurs mois. Cette
            formation ISHES travaille cela, avec{" "}
            <Link href="/fr/les-cles-du-coran" className="text-ishes-blue font-bold hover:underline">
              Les Clés du Coran
            </Link>
            , adaptation francophone inspirée de Nour Al Bayan.
          </p>
          <p>
            Le{" "}
            <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold hover:underline">
              cours de Tajwid
            </Link>{" "}
            et le{" "}
            <Link href="/fr/cours-tajwid-intensif" className="text-ishes-blue font-bold hover:underline">
              Tajwid intensif
            </Link>{" "}
            apprennent à lire. Ici, tu apprends à faire lire quelqu&apos;un d&apos;autre. Les
            deux volumes servent de fil : le premier installe les lettres et le tahajjî, le
            second pose les règles que l&apos;élève devra reconnaître dans le Moushaf.
          </p>
          <p>
            Une ijaza, quand on en a une, reste une chaîne de récitation. Elle ne remplace pas
            la préparation d&apos;une séance ni la manière de parler à un parent. La
            certification remise ici est la certification Formation enseignant de
            l&apos;Institut ISHES, au bout de 4 à 5 mois. Le tarif n&apos;est pas affiché : il
            est dans le devis. Tu peux aussi regarder la{" "}
            <Link href="/fr/formation-enseignant-tarbya" className="text-ishes-blue font-bold hover:underline">
              formation enseignant de Tarbiya
            </Link>{" "}
            si le projet est l&apos;éducation islamique des enfants, plutôt que la lecture du
            Coran.
          </p>
        </div>
      </section>

      <VitrineFaq
        eyebrow="Questions fréquentes"
        title="Une question ?"
        items={FAQS}
      />

      <section className="relative w-full bg-[#101828] py-24 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c8a063] mb-4">
            Passer à l&apos;action
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 leading-tight">
            Prépare ton projet de transmission
          </h2>
          <p className="text-white/70 font-medium max-w-2xl mx-auto mb-8">
            Échange avec l&apos;équipe pour obtenir un devis. Formation sur devis, lundi et
            jeudi à 19h30, à partir d&apos;octobre 2026.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={DEVIS}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#c8a063] hover:bg-[#b08b54] text-white font-black text-sm rounded-xl"
            >
              Je veux contacter le formateur <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/10"
            >
              Demander un devis
            </a>
          </div>
          <p className="mt-6 text-sm text-white/50">
            <Link href="/fr/contact" className="hover:text-white underline">
              Consulter la page de contact
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
