import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  Hourglass,
  Heart,
  UserRound,
  Users,
  BookOpen,
  Mail,
  PenTool,
  CheckCircle2,
  Lock,
  CreditCard,
  ArrowRight,
  PlayCircle,
  Monitor,
  Gift,
  History
} from 'lucide-react';
import Image from 'next/image';
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { CivilisationCtas } from "@/components/vitrine/CivilisationCtas";
import {
  CIVILISATION_PATH,
  CIVILISATION_PERIODS,
  CIVILISATION_SAVANTS,
  savantPath,
} from "@/lib/civilisation-savants";
import {
  buildPageMetadata,
  courseJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from "@/lib/seo";

const CIV_FAQS = [
  {
    question: "Qu'est-ce que la civilisation arabo-musulmane ?",
    answer:
      "C'est un vaste ensemble historique, culturel, scientifique et artistique, développé dans les sociétés marquées par l'islam, où l'arabe a joué un rôle central. Elle n'est pas exclusivement arabe ni uniquement musulmane : Persans, Berbères, Turcs, savants d'Asie centrale, chrétiens et juifs y ont contribué.",
  },
  {
    question: "Quelles sont les grandes périodes de cette civilisation ?",
    answer:
      "Arabie préislamique, naissance de l'islam (610–632), premiers califats, Omeyyades (Damas), Abbassides (Bagdad et l'âge d'or), grandes dynasties (Xe–XVe s.), puis l'héritage dans le monde moderne.",
  },
  {
    question: "Qui sont les savants étudiés dans le cours ISHES ?",
    answer:
      "Parmi d'autres : Al-Khwārizmī (algèbre), Ibn Sīnā (médecine), Al-Rāzī, Ibn al-Haytham (optique), Al-Bīrūnī, Ibn Khaldūn, Al-Idrīsī, Ibn Rushd (Averroès) et Al-Zahrāwī (chirurgie). Chaque nom a une mini-biographie sur ishes.fr.",
  },
  {
    question: "La formation est-elle en ligne ?",
    answer:
      "Oui. Cours en direct le mercredi 20h–21h, replays, supports, 2 mois. Inscription en ligne. Un entretien WhatsApp est possible via la page contact.",
  },
];

export const metadata = buildPageMetadata({
  title: "Civilisation arabo-musulmane — histoire, âge d'or et savants | ISHES",
  description:
    "Cours en ligne : civilisation arabo-musulmane, de l'Arabie à l'Andalousie. Âge d'or, Bagdad, Cordoue, Al-Khwārizmī, Avicenne, Averroès, Ibn Khaldūn. Formation ISHES 2 mois.",
  path: CIVILISATION_PATH,
  keywords: [
    "civilisation arabo-musulmane",
    "âge d'or islam",
    "histoire civilisation musulmane",
    "savants musulmans",
    "maison de la sagesse bagdad",
    "cordoue andalousie",
    "avicenne",
    "averroes",
    "al khwarizmi",
    "ibn khaldun",
    "cours histoire islam en ligne",
  ],
  image: "/images/formations/civilisation-hero.jpg",
});

export default function CivilisationPage() {
  const course = PROGRAMS_DATA["civilisation_arabo_musulmane"];
  const videoUrl = course?.videoUrl;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-20">
      <JsonLd
        data={courseJsonLd({
          name: "Civilisation arabo-musulmane — histoire, âge d'or et héritage",
          description:
            "Formation ISHES en ligne : de l'Arabie à l'Andalousie, savants, sciences et patrimoine.",
          path: CIVILISATION_PATH,
          price: "199",
          courseMode: "Online",
          workload: "P8W",
          image: "/images/formations/civilisation-hero.jpg",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Civilisation arabo-musulmane", path: CIVILISATION_PATH },
        ])}
      />
      <JsonLd data={faqJsonLd(CIV_FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Civilisation arabo-musulmane : histoire, âge d'or et savants",
          description:
            "Qu'est-ce que la civilisation arabo-musulmane, ses périodes, ses contributions et ses savants.",
          path: CIVILISATION_PATH,
          image: "/images/formations/civilisation-hero.jpg",
          keywords: ["civilisation arabo-musulmane", "âge d'or", "savants musulmans"],
          about: ["Civilisation arabo-musulmane", "Âge d'or islamique", "Bagdad", "Cordoue"],
        })}
      />
      
      {/* ─── HERO SECTION ─── */}
      <section className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-ishes-gold font-black text-sm tracking-[0.2em] uppercase flex items-center gap-2">
              Histoire · âge d&apos;or · savants
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ishes-blue leading-[1.1] tracking-tight">
              Civilisation arabo-musulmane
            </h1>
            <p className="text-gray-600 font-medium max-w-xl text-lg leading-relaxed border-l-2 border-ishes-gold pl-4">
              Histoire, âge d&apos;or, grandes découvertes et héritage dans le monde. Une civilisation qui a
              profondément marqué l&apos;humanité — de l&apos;Arabie à l&apos;Andalousie, du Maghreb à l&apos;Asie
              centrale.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link 
                href="/inscription?plan=civilisation_arabo_musulmane&audience=adulte" 
                className="inline-flex items-center justify-center gap-2 bg-ishes-blue hover:bg-ishes-blue/90 text-white px-8 py-4 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-blue/20 hover:-translate-y-1"
              >
                JE M&apos;INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
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
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-12 mt-12 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-ishes-gold" />
                <span className="text-sm font-bold text-gray-700 leading-tight">Octobre 2026</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">1 cours / semaine<br/><span className="text-gray-500 font-medium">Mercredi de 20h à 21h</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">En direct<br/><span className="text-gray-500 font-medium">Zoom + Replays</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Hourglass className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Durée<br/><span className="text-gray-500 font-medium">2 mois</span></span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-ishes-gold" />
                <span className="text-xs font-bold text-ishes-dark leading-tight">Tous les supports<br/><span className="text-gray-500 font-medium">inclus</span></span>
              </div>
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
                <div className="w-full h-full relative group">
                  <Image 
                    src="/images/formations/civilisation-hero.jpg" 
                    alt="Cours de civilisation arabo-musulmane — Institut ISHES"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 text-center">
                    <h3 className="text-2xl font-black text-white">&quot;Celui qui ne connaît pas son passé ne peut construire son futur&quot;</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── POUR QUI ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Ce cours est fait pour toi si...</h2>
          <div className="w-16 h-1 bg-ishes-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: UserRound, title: "Tu souhaites connaître", desc: "l'âge d'or de la civilisation arabo-musulmane." },
            { icon: BookOpen, title: "Tu veux découvrir", desc: "les savants qui ont révolutionné les sciences." },
            { icon: History, title: "Tu souhaites comprendre", desc: "comment l'Islam a influencé le monde contemporain." },
            { icon: Users, title: "Tu veux renouer", desc: "avec un héritage riche intellectuel et spirituel." }
          ].map((item, i) => (
            <div key={i} className="bg-[#f2ece4] rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow border border-transparent hover:border-ishes-gold/20">
              <div className="w-16 h-16 bg-ishes-dark rounded-full flex items-center justify-center shadow-lg">
                <item.icon className="w-8 h-8 text-ishes-gold" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ishes-blue whitespace-pre-line leading-tight">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm mt-2 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-6">
          Qu&apos;est-ce que la civilisation arabo-musulmane ?
        </h2>
        <div className="space-y-4 text-[16px] text-gray-700 font-medium leading-relaxed">
          <p>
            La <strong>civilisation arabo-musulmane</strong> désigne un vaste ensemble historique, culturel,
            scientifique et artistique, développé dans les sociétés marquées par l&apos;islam et dans lesquelles
            la <strong>langue arabe</strong> a joué un rôle central. Elle ne fut pas exclusivement arabe, ni
            composée uniquement de musulmans : des Persans, des Berbères, des Turcs, des savants d&apos;Asie
            centrale, ainsi que des chrétiens, des juifs et d&apos;autres communautés ont contribué à son
            développement.
          </p>
          <p>
            De l&apos;Arabie à l&apos;Andalousie, du Maghreb à l&apos;Asie centrale, elle a fait rayonner le
            savoir, la science, l&apos;art et la sagesse pendant plusieurs siècles, laissant un héritage qui
            influence encore le monde d&apos;aujourd&apos;hui. Cette diversité est l&apos;une des clés de son
            rayonnement : rassembler des savoirs venus de différentes traditions, les étudier, les enrichir et
            les transmettre.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {[
            "Une histoire fascinante",
            "Des grandes civilisations",
            "Des découvertes qui ont marqué le monde",
            "Des savants d'exception",
            "Un patrimoine culturel unique",
            "Un héritage toujours vivant",
          ].map((t) => (
            <div key={t} className="rounded-2xl bg-[#f9f5f0] border border-ishes-gold/15 p-4 font-black text-ishes-blue text-sm">
              {t}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-3 text-center">
            Les grandes périodes de la civilisation arabo-musulmane
          </h2>
          <p className="text-center text-gray-500 font-medium italic mb-12">
            « Voyage au cœur d&apos;un héritage qui éclaire le présent et inspire l&apos;avenir. »
          </p>
          <ol className="space-y-6">
            {CIVILISATION_PERIODS.map((p, i) => (
              <li key={p.title} className="flex gap-5">
                <span className="w-10 h-10 shrink-0 rounded-full bg-ishes-blue text-white font-black flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-black text-ishes-dark">{p.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed mt-1">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-10 text-center">
          Les grandes contributions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Sciences et savoir", "Mathématiques, astronomie, médecine, optique, chimie, géographie."],
            ["Pensée et philosophie", "Une réflexion sur la raison, la connaissance et la nature."],
            ["Art et architecture", "Calligraphie, art du livre, réalisations architecturales uniques."],
            ["Éducation et institutions", "Bibliothèques, madrasas et hôpitaux : modèles d'enseignement et de recherche."],
            ["Échanges et commerce", "Des réseaux reliant l'Orient, l'Afrique, l'Europe et l'Asie."],
            ["Transmission au monde", "Un héritage qui a influencé durablement l'histoire de l'humanité."],
          ].map(([t, d]) => (
            <div key={t} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-ishes-blue text-lg mb-2">{t}</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="savants" className="py-16 px-6 bg-[#f9f5f0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-3 text-center">
            Des savants qui ont marqué l&apos;histoire
          </h2>
          <p className="text-center text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Découvrez leurs vies, leurs ouvrages et leurs contributions. Chaque fiche propose de vous
            inscrire à la formation ou de nous contacter.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {CIVILISATION_SAVANTS.map((s) => (
              <Link
                key={s.slug}
                href={savantPath(s.slug)}
                className="block bg-white rounded-2xl p-6 border border-gray-100 hover:border-ishes-gold/40 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-black text-ishes-blue">{s.name}</h3>
                {s.latinName ? (
                  <p className="text-ishes-gold text-sm font-bold">{s.latinName}</p>
                ) : null}
                <p className="text-xs text-gray-400 font-bold mt-1">{s.fields.join(" · ")}</p>
                <p className="text-sm text-gray-600 mt-3 font-medium leading-relaxed">{s.summary}</p>
                <span className="inline-block mt-4 text-ishes-blue font-black text-sm">
                  Lire la biographie →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href={`${CIVILISATION_PATH}/savants`}
              className="font-black text-ishes-gold hover:underline"
            >
              Voir toutes les mini-biographies
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <CivilisationCtas className="justify-center" />
      </div>

      {/* ─── POURQUOI DIFFERENT ─── */}
      <section className="py-24 px-6 bg-white my-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 flex items-center justify-center bg-gray-50">
             <Image 
               src="/images/formations/civilisation-details.jpg" 
               alt="Thématiques du cours de civilisation arabo-musulmane ISHES"
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/40 to-transparent"></div>
          </div>
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Thématiques abordées</h2>
            <div className="space-y-6">
              {[
                "L'Âge d'Or des Sciences (Médecine, Mathématiques, Astronomie)",
                "Philosophie, Éthique et place de la raison en Islam",
                "Architecture, Arts et calligraphie",
                "Transmission des savoirs vers l'Occident",
                "Échanges Inter-culturels (Bagdad, Cordoue, Damas)",
                "Héritage contemporain et défis actuels"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-ishes-gold shrink-0" />
                  <span className="text-lg font-medium text-ishes-dark">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CE QUI EST INCLUS ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ishes-blue mb-16">Ce qui est inclus</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { image: "/images/tajwid_students.png", title: "En direct sur Zoom\nMercredi de 20h à 21h" },
            { image: "/images/tajwid_exercises.png", title: "Approche culturelle\net historique" },
            { image: "/images/tilawa_quran.png", title: "Supports de cours\net accès aux replays" },
            { image: "/images/tajwid_whatsapp.png", title: "Groupe WhatsApp\nprivé et d'échanges" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col group overflow-hidden relative pb-6 transition-all hover:shadow-md">
              <div className="w-full h-40 relative mb-4">
                 <Image src={item.image} alt={`${item.title} — Institut ISHES`} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <h3 className="font-bold text-ishes-blue text-sm whitespace-pre-line px-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEROULEMENT ─── */}
      <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue">Comment se déroule le programme ?</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-ishes-gold/30 border-dashed"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { num: 1, icon: Calendar, title: "Tu t'inscris", desc: "Sélectionne la formation et valide ton inscription." },
              { num: 2, icon: Mail, title: "Tu reçois tes accès", desc: "Accès immédiat au groupe WhatsApp dédié." },
              { num: 3, icon: Video, title: "Tu assistes aux cours", desc: "Tous les mercredis de 20h à 21h en direct." },
              { num: 4, icon: BookOpen, title: "Tu parcours l'histoire", desc: "Immersion sur 2 mois dans notre riche héritage." }
            ].map((step, i) => (
               <div key={i} className="relative flex flex-col items-center text-center group">
                 <div className="w-12 h-12 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-xl mb-6 relative z-10 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                   {step.num}
                 </div>
                 <step.icon className="w-10 h-10 text-ishes-gold mb-4" />
                 <h3 className="font-black text-ishes-blue mb-2">{step.title}</h3>
                 <p className="text-sm text-gray-600 font-medium">{step.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING BANNER ─── */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-10 mt-12">
        <div className="bg-ishes-dark rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Section Gauche : Prix */}
          <div className="text-center md:text-left space-y-2 flex-1 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
            <div className="text-5xl md:text-6xl font-black text-ishes-gold flex items-baseline gap-4 justify-center md:justify-start">
              199 €
              <span className="text-2xl text-gray-400 line-through">349 €</span>
            </div>
            <h3 className="text-lg font-medium text-gray-300">Prix de lancement (avant le 15 Septembre) - 2 mois</h3>
          </div>

          {/* Section Milieu : Info */}
          <div className="flex-1 flex items-center justify-center md:justify-start gap-4 px-0 md:px-8 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
            <CreditCard className="w-10 h-10 text-ishes-gold" />
            <span className="text-lg font-medium text-gray-200">Paiement unique <br/> Inscription immédiate</span>
          </div>

          {/* Section Droite : Bouton et sécurité */}
          <div className="flex flex-col items-center md:items-end gap-4 flex-1">
            <Link 
              href="/inscription?plan=civilisation_arabo_musulmane&audience=adulte" 
              className="inline-flex items-center justify-center gap-2 bg-ishes-gold hover:bg-ishes-gold/90 text-white px-8 py-5 rounded-md text-[15px] font-black transition-all shadow-xl shadow-ishes-gold/20 hover:-translate-y-1 w-full"
            >
              JE M&apos;INSCRIS MAINTENANT <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Lock className="w-4 h-4 text-ishes-gold" />
              Paiement 100% sécurisé
            </div>
          </div>
          
        </div>
      </section>

      <VitrineFaq
        eyebrow="FAQ civilisation arabo-musulmane"
        title="Questions fréquentes sur l'histoire, les savants et le cours"
        items={CIV_FAQS}
      />

    </div>
  );
}
