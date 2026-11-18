import { Metadata } from 'next';
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import Link from 'next/link';
import { CourseCadenceNote } from "@/components/vitrine/CourseCadenceNote";
import { 
  Calendar, 
  Clock, 
  Monitor, 
  Award, 
  Hourglass,
  Presentation,
  BookOpen,
  Shield,
  Heart,
  CheckCircle2,
  Gift,
  Lock,
  ArrowRight,
  PlayCircle,
  GraduationCap,
  BrainCircuit
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/formation-enseignant-tarbya") },
  openGraph: {
    url: absoluteUrl("/fr/formation-enseignant-tarbya"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Devenir enseignant en Tarbiya Islamiyya — Formation | ISHES",
  description:
    "Devenez enseignant en Tarbiya Islamiyya : pédagogie, gestion de classe et transmission des valeurs de l'islam aux enfants. Formation à distance, certification ISHES.",
  keywords:
    "devenir enseignant tarbiya, enseigner l'islam aux enfants, professeur education islamique, formation enseignant islam, pédagogie islamique",
};

const ENSEIGNANT_TARBYA_FAQS = [
  {
    question: "Qu’apprend-on dans la formation d’enseignant en Tarbiya Islamiyya ?",
    answer:
      "On apprend à concevoir et animer des cours d’éducation islamique pour enfants autour des grands thèmes de la Tarbiya Islamiyya : fondements de la spiritualité, piliers de l’islam, récits des Prophètes, adorations, éthique, adab et calendrier musulman. Un second module, « apprendre à apprendre », couvre la gestion de classe, la motivation, les activités interactives, la gestion des conflits et l’accompagnement personnalisé des élèves.",
  },
  {
    question: "Faut-il déjà avoir des connaissances religieuses pour devenir enseignant en Tarbiya ?",
    answer:
      "La formation s’adresse d’abord à celles et ceux qui possèdent déjà des connaissances religieuses mais ne savent pas comment les transmettre à des enfants. Elle n’est pas un cours de sciences islamiques : elle apprend à passer du savoir à la pédagogie. Un entretien gratuit avec l’équipe de l’Institut ISHES permet de vérifier que ton profil et ton projet correspondent avant de recevoir le devis.",
  },
  {
    question: "Comment se déroule la formation enseignant Tarbiya Islamiyya à distance ?",
    answer:
      "Elle démarre en octobre 2026 et dure 4 à 5 mois, avec deux cours par semaine, le mardi et le vendredi à 19h30, en direct sur Zoom. Les replays sont disponibles si tu manques une séance et tous les supports sont inclus. Le parcours se termine par la certification Formation Enseignant ISHES, après des évaluations régulières de validation.",
  },
  {
    question: "Combien coûte la formation d’enseignant en Tarbiya Islamiyya ?",
    answer:
      "Le tarif est sur devis, avec des facilités de paiement en plusieurs fois. Il s’obtient en demandant un rendez-vous sur le site ou en écrivant à l’équipe sur WhatsApp. Le devis tient compte de ton projet (mosquée, association, école ou famille) et précise les supports inclus et les modalités de paiement avant toute inscription.",
  },
  {
    question: "Quelle différence entre la formation enseignant Tarbiya et la formation enseignant Tajwid ?",
    answer:
      "La formation enseignant Tarbiya prépare à transmettre l’éducation islamique aux enfants : croyance, récits, adorations, valeurs et comportement. La formation enseignant Tajwid prépare à enseigner la lecture du Coran avec Les Clés du Coran. Les deux partagent un module de pédagogie et de gestion de classe, mais le contenu enseigné et les supports diffèrent. Certains suivent les deux pour couvrir un programme complet.",
  },
  {
    question: "Où peut-on enseigner l’éducation islamique après la formation ?",
    answer:
      "Dans une mosquée, une association, une école ou simplement en famille. La formation vise à donner la légitimité, la méthode et l’assurance nécessaires pour tenir une classe d’enfants et répondre aux parents. La certification Formation Enseignant ISHES atteste du parcours suivi auprès d’un institut qui enseigne la Tarbiya aux enfants depuis plus de quinze ans à Toulouse et à distance.",
  },
  {
    question: "Quels supports pédagogiques sont fournis pour enseigner la Tarbiya Islamiyya ?",
    answer:
      "Tous les supports sont inclus : cours, manuels, fiches, activités, modèles de leçons et ressources prêtes à l’emploi, dont un manuel pédagogique sur le Tawhid et la Sîrah pour enfants. L’objectif est une formation clé en main : à la sortie, tu disposes du contenu, des outils et des méthodes pour concevoir et animer des séances captivantes sans repartir de zéro.",
  },
  {
    question: "Comment apprend-on à gérer une classe d’enfants en cours d’éducation islamique ?",
    answer:
      "Le module « apprendre à apprendre » traite concrètement de la gestion de classe : poser un cadre, capter et maintenir l’attention, motiver, proposer des activités interactives, gérer les conflits et accompagner chaque enfant. On y découvre aussi comment un enfant mémorise, comprend et applique ce qu’il apprend, pour adapter ses récits et ses mises en pratique à l’âge du groupe.",
  },
  {
    question: "Y a-t-il un stage pratique ou un suivi après la formation enseignant Tarbiya ?",
    answer:
      "Oui. Un stage pratique au sein de l’Institut ISHES est possible, et un mentorat avec supervision est proposé après la formation pour accompagner les premiers cours. Cette continuité, ajoutée aux évaluations régulières pendant le parcours, vise à ce que chaque participant reparte avec les compétences et la confiance pour enseigner la Tarbiya Islamiyya avec impact.",
  },
];

export default function FormationEnseignantTarbyaPage() {
  const course = PROGRAMS_DATA["formation_enseignante_tarbya"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd data={faqJsonLd(ENSEIGNANT_TARBYA_FAQS)} />

      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-ishes-gold" />
              <span className="text-ishes-dark font-black text-xs tracking-[0.15em] uppercase">
                PROFESSIONNALISATION
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Formation <br />
              Enseignant <br />
              Tarbya Islamiyya
            </h1>
            <p className="text-gray-600 font-medium max-w-md text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Transmettre les valeurs de l'Islam avec pédagogie et former la génération musulmane de demain.
            </p>
            <div className="w-12 h-0.5 bg-transparent my-4"></div>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/fr/rendez-vous" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-dark hover:bg-ishes-dark/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-dark/20 hover:-translate-y-1"
              >
                DEMANDER UN DEVIS <ArrowRight className="w-5 h-5" />
              </Link>
              {videoUrl && (
                <Link 
                  href={videoUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-ishes-gold text-ishes-gold hover:bg-ishes-gold/10 px-8 py-4 rounded-md text-[15px] font-black transition-all hover:-translate-y-1"
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
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image 
                  src="/images/formations/enseignant-tarbya-islamya-1.jpg" 
                  alt="Formation enseignant Tarbiya Islamiyya — Institut ISHES"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>

        {/* ─── INFO BAR ─── */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-ishes-gold" />
            <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">2 cours / semaine<br/><span className="text-gray-500 font-medium">Mardi et vendredi 19H30</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br/><span className="text-gray-500 font-medium">Zoom + Replays</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Hourglass className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br/><span className="text-gray-500 font-medium">4 à 5 mois</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Certification<br/><span className="text-gray-500 font-medium">Formation Enseignant ISHES</span></span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-ishes-gold" />
            <span className="text-xs font-bold text-ishes-dark leading-tight">Tous les supports<br/><span className="text-gray-500 font-medium">inclus</span></span>
          </div>
        </div>
      </section>

      <CourseCadenceNote>
        Dès octobre 2026, deux cours par semaine, le mardi et le vendredi à 19h30, en direct sur
        Zoom, avec les replays. Le parcours dure 4 à 5 mois, tous les supports sont inclus, et il
        se termine par la certification Formation enseignant ISHES.
      </CourseCadenceNote>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Presentation, title: "Tu souhaites enseigner\nl'éducation islamique\naux enfants avec\nméthode et impact." },
            { icon: BookOpen, title: "Tu maîtrises déjà\ndes connaissances\nreligieuses mais tu ne\nsais pas comment les\ntransmettre." },
            { icon: Shield, title: "Tu veux obtenir une\nvéritable légitimité pour\nenseigner dans une\nmosquée, une association\nou une école." },
            { icon: Heart, title: "Tu recherches un\naccompagnement sérieux\npour devenir un enseignant\ncompétent, bienveillant\net structuré." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-20 h-20 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-10 h-10 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ishes-blue whitespace-pre-line leading-relaxed">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LES 2 MODULES ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Les 2 modules de la formation</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Module 1 */}
          <div className="bg-ishes-dark rounded-2xl p-8 md:p-12 shadow-xl flex flex-col sm:flex-row gap-8 relative overflow-hidden group">
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <div className="text-5xl font-black text-white mb-2">01</div>
              <div className="w-10 h-1 bg-ishes-gold"></div>
            </div>
            <div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-ishes-dark">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-black text-white mb-4 leading-tight">Enseigner l'éducation islamique<br/>(Tarbya Islamiyya)</h3>
              <p className="text-gray-300 font-medium text-sm leading-relaxed">
                Découvrez le rôle de l’enseignant et de l’élève dans la tradition islamique. Apprenez à concevoir et à animer des cours complets autour des grands thèmes de la Tarbya Islamiyya : fondements de la spiritualité, piliers de l’islam, récits des Prophètes, adorations, éthique, adab et calendrier musulman. Développez une pédagogie vivante, fondée sur les récits, la transmission des valeurs et des mises en pratique concrètes.
              </p>
            </div>
          </div>

          {/* Module 2 */}
          <div className="bg-[#cdad75] rounded-2xl p-8 md:p-12 shadow-xl flex flex-col sm:flex-row gap-8 relative overflow-hidden group">
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <div className="text-5xl font-black text-white mb-2">02</div>
              <div className="w-10 h-1 bg-white"></div>
            </div>
            <div>
              <div className="w-12 h-12 bg-ishes-dark rounded-full flex items-center justify-center mb-6 shadow-md text-white">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-black text-ishes-blue mb-4 leading-tight">Les méthodologies<br/>d'apprendre à apprendre</h3>
              <p className="text-ishes-dark/80 font-medium text-sm leading-relaxed">
                Découvre des approches efficaces pour aider les enfants à mémoriser, comprendre et appliquer ce qu'ils apprennent. Gestion de classe, motivation, activités interactives, gestion des conflits et accompagnement personnalisé.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Pourquoi cette formation va tout changer ?</h2>
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-100">
             <Image 
               src="/images/formations/enseignant-tarbya-2.jpg" 
               alt="Supports Tarbiya Islamiyya et formation enseignant sur Zoom — ISHES"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="space-y-6">
            {[
              "Prendre conscience de la noblesse et de la responsabilité de sa mission de transmetteur de la religion.",
              "Une pédagogie claire, structurée et adaptée aux enfants d’aujourd’hui.",
              "Des méthodes concrètes pour transmettre les valeurs avec amour, sagesse et bienveillance.",
              "Des outils prêts à l’emploi pour concevoir et animer des cours captivants et interactifs.",
              "Un accompagnement personnalisé par des formateurs expérimentés.",
              "À l’issue de la formation, repartez avec les compétences, l’assurance et la légitimité nécessaires pour enseigner avec impact."
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-7 h-7 text-ishes-gold shrink-0 mt-0.5" />
                <p className="text-[17px] font-bold text-ishes-dark leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO BANNERS BLOCK ─── */}
      <section className="py-6 px-6 max-w-7xl mx-auto mb-8">
        <div className="bg-[#f5f6f8] rounded-[2rem] p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-8 md:gap-16 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-14 h-14 bg-ishes-dark rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-ishes-gold" />
            </div>
            <div>
              <h4 className="font-black text-ishes-blue tracking-widest text-sm uppercase mb-1">FORMATION CLÉ EN MAIN</h4>
              <h3 className="font-bold text-ishes-blue text-xl mb-3 leading-tight">Tous les supports sont inclus</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Cours, manuels, fiches, activités, modèles de leçons et ressources prêtes à utiliser.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start relative">
            {/* Divider line for desktop */}
            <div className="hidden md:block absolute left-[-2rem] top-0 bottom-0 w-px bg-gray-300"></div>
            
            <div className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center shrink-0 shadow-sm text-ishes-gold">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-ishes-blue text-xl mb-3 leading-tight mt-1">TOUT EST PRÊT POUR VOUS</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Contenu, outils, méthodes et accompagnement : vous n'avez plus qu'à enseigner avec confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-ishes-blue mb-6">
          Devenir enseignant en Tarbiya Islamiyya
        </h2>
        <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-[15px]">
          <p>
            <strong>Devenir enseignant en Tarbiya Islamiyya</strong>, c&apos;est apprendre à transmettre l&apos;islam
            aux enfants sans les noyer sous le jargon : Tawhid, Sîrah, invocations, piliers de la foi, avec des
            histoires, des activités et une posture bienveillante. Cette formation prépare au métier d&apos;
            <strong>enseignant d&apos;éducation islamique</strong> pour une mosquée, une association, une école ou
            la famille.
          </p>
          <p>
            Fruit de plus de quinze ans de pratique à l&apos;Institut ISHES : pédagogie, gestion de classe,
            supports prêts à l&apos;emploi, certification. Pour un parcours Coran / lecture, voir aussi comment{" "}
            <Link href="/fr/formation-enseignant-tajwid" className="text-ishes-blue font-bold hover:underline">
              devenir enseignant de Tajwid
            </Link>
            . Vue d&apos;ensemble :{" "}
            <Link href="/formation-enseignant" className="text-ishes-blue font-bold hover:underline">
              devenir enseignant certifié
            </Link>
            . Un{" "}
            <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
              entretien gratuit
            </Link>{" "}
            permet d&apos;obtenir un devis.
          </p>
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ formation enseignant Tarbiya"
        title="Devenir enseignant en Tarbiya Islamiyya : contenu, débouchés et déroulement"
        intro="Les réponses aux questions des futurs enseignants d’éducation islamique pour enfants, en mosquée, en association, à l’école ou en famille."
        items={ENSEIGNANT_TARBYA_FAQS}
      />

      {/* ─── PRICING BANNER ─── */}
      <section className="py-8 px-6 max-w-[80rem] mx-auto mb-10">
        <div className="bg-ishes-dark rounded-[2rem] p-6 md:p-8 shadow-2xl text-white relative overflow-hidden flex flex-wrap md:flex-nowrap items-center gap-6">

          <div className="flex items-center gap-4 flex-1 border-r border-white/10 pr-6 min-w-[250px]">
            <Award className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">Formation complète et diplomante</p>
              <h3 className="text-sm font-black text-white mt-0.5">1ère session octobre 2026</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 border-r border-white/10 px-6 min-w-[200px]">
            <Shield className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">Tarif</p>
              <h3 className="text-sm font-black text-white mt-0.5">Sur devis</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 px-6 min-w-[200px]">
            <Heart className="w-8 h-8 text-ishes-gold shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-300">Paiement</p>
              <h3 className="text-sm font-black text-white mt-0.5">Facilité de paiement</h3>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 pl-6 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 border-white/10 md:border-l pt-4 md:pt-0">
            <p className="text-[13px] font-bold text-center md:text-right text-[#b88c4d] max-w-[280px] leading-snug">
              Veuillez nous contacter via WhatsApp en cliquant sur l'icône en bas à droite
            </p>
          </div>
          
        </div>
      </section>

    </div>
  );
}
