import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CheckCircle2, 
  MapPin, 
  Users, 
  Award, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Sparkles, 
  BookOpenCheck, 
  Compass, 
  Calendar, 
  Building2, 
  Play, 
  Zap, 
  ArrowRight, 
  GraduationCap,
  Check
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Cours en Présentiel & Direct | Institut ISHES Toulouse",
  description: "Découvrez nos formations d'excellence à Toulouse et en direct : Tajwid Progressif, Tajwid Accéléré, Tilawa, Hifdh, Sîrah du Prophète ﷺ et langue Arabe. Pédagogie structurée avec supports exclusifs.",
  keywords: "cours islam toulouse, cours tajwid presentiel, apprendre arabe toulouse, memorisation coran toulouse, sirah prophète, nour al bayan francophone, habib haffes arabe, institut ishes",
  openGraph: {
    title: "Cours en Présentiel & Direct | Institut ISHES Toulouse",
    description: "Formations d'excellence à Toulouse et en direct : Tajwid, Coran, Langue Arabe et Sîrah. Supports exclusifs et suivi personnalisé.",
    url: "https://ishes.org/fr/cours-en-presentiel",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584281723351-93e18cd944f2?auto=format&fit=crop&q=80&w=800",
        width: 1200,
        height: 630,
        alt: "Cours en Présentiel & Direct - Institut ISHES"
      }
    ]
  }
};

const coursesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Formations en Présentiel & Direct - Institut ISHES",
  "description": "Découvrez notre catalogue exclusif de cours en présentiel et en direct sur Zoom à Toulouse. Apprentissage du Tajwid, mémorisation du Coran, Sîrah et Arabe.",
  "url": "https://ishes.org/fr/cours-en-presentiel",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "Tajwid Progressif",
        "description": "Apprendre à lire le Coran correctement, même en partant de zéro. Cursus d'une année s'appuyant sur notre support exclusif 'Les Clés du Coran', adapté de Nour Al Bayan.",
        "provider": {
          "@type": "Organization",
          "name": "Institut ISHES",
          "sameAs": "https://ishes.org"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "name": "Tajwid Accéléré",
        "description": "Un cursus intensif de 3 mois pour assimiler les règles essentielles du Tajwid et les appliquer de manière autonome dans le Coran.",
        "provider": {
          "@type": "Organization",
          "name": "Institut ISHES",
          "sameAs": "https://ishes.org"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Course",
        "name": "Tilawa — Lecture & Récitation",
        "description": "Transformer vos connaissances théoriques du Tajwid en une récitation naturelle, fluide et maîtrisée grâce à un suivi en tête-à-tête.",
        "provider": {
          "@type": "Organization",
          "name": "Institut ISHES",
          "sameAs": "https://ishes.org"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Course",
        "name": "Hifdh — Mémorisation du Coran",
        "description": "Construisez une relation quotidienne avec le Coran. Programme individuel en tête-à-tête avec corrections régulières et programme de révision (Mouraja'a) adapté.",
        "provider": {
          "@type": "Organization",
          "name": "Institut ISHES",
          "sameAs": "https://ishes.org"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Course",
        "name": "Sîrah du Prophète ﷺ",
        "description": "Découvrez la vie du Messager d'ALLAH d'une manière vivante, spirituelle et contemporaine pour vous en inspirer au quotidien.",
        "provider": {
          "@type": "Organization",
          "name": "Institut ISHES",
          "sameAs": "https://ishes.org"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Course",
        "name": "Langue Arabe",
        "description": "Apprenez à lire, écrire et comprendre l'arabe pas à pas avec la célèbre méthode de Habib Haffes pensée pour les francophones.",
        "provider": {
          "@type": "Organization",
          "name": "Institut ISHES",
          "sameAs": "https://ishes.org"
        }
      }
    }
  ]
};

export default function CoursPresentielPage() {
  const presentielCourses = [
    {
      id: "tajwid-progressif",
      title: "Tajwid Progressif",
      tagline: "Apprendre à lire le Coran correctement, même en partant de zéro.",
      badge: "Scolarité Annuelle",
      duration: "1 an (Annuel)",
      icon: <BookOpenCheck className="w-6 h-6 text-[#008953]" />,
      colorClass: "border-[#008953]/20 hover:border-[#008953]",
      bgBadge: "bg-green-50 text-green-700 border-green-100",
      slot: "mardi",
      hook: "Tu aimerais mieux lire le Coran… mais tu n’as peut-être jamais réellement appris les bases de la lecture arabe ou les règles du Tajwid. Certaines lettres te semblent encore difficiles, tu hésites sur la prononciation et certains symboles restent flous. Ce cours progressif t'accompagne étape par étape.",
      outcomes: [
        "Les lettres arabes et leur prononciation exacte (Makharij)",
        "Les règles essentielles du Tajwid pour une lecture sereine",
        "Compréhension des symboles présents dans le Moushaf",
        "Gagner en autonomie et corriger sa récitation du Coran"
      ],
      methodology: "Basé sur notre support exclusif 'Les Clés du Coran', une adaptation francophone inspirée de la méthode Nour Al Bayan.",
      practical: [
        "Tous les mardis en direct",
        "Replays accessibles à vie",
        "Suivi pédagogique personnalisé",
        "Support pédagogique physique inclus"
      ],
      priceText: "349 € / an",
      cta: "Découvrir Tajwid Progressif",
      target: "Adultes débutants, personnes ne sachant pas encore lire l'arabe ou souhaitant reprendre les bases correctement."
    },
    {
      id: "tajwid-accelere",
      title: "Tajwid Accéléré",
      tagline: "Vaincre la démotivation et progresser 3 fois plus rapidement.",
      badge: "Intensif Trimestriel",
      duration: "3 Mois (Accéléré)",
      icon: <Zap className="w-6 h-6 text-[#c8a96e]" />,
      colorClass: "border-amber-200 hover:border-[#c8a96e]",
      bgBadge: "bg-amber-50 text-amber-700 border-amber-100",
      slot: "mardi-vendredi",
      hook: "Beaucoup ont commencé à apprendre le Tajwid plusieurs fois... puis ont arrêté par manque de régularité ou de suivi. Conçu pour éviter ce piège, ce programme accéléré permet de maîtriser et appliquer les règles essentielles jusqu'à 3 fois plus vite qu'un cursus classique.",
      outcomes: [
        "Maîtrise complète des règles fondamentales du Tajwid",
        "Reconnaissance fluide de tous les symboles du Moushaf",
        "Reconnaissance et application autonome directe lors de la lecture",
        "Régularité et discipline d'apprentissage renforcées"
      ],
      methodology: "S'appuie sur le support exclusif 'Les Clés du Coran', adapté de la méthode Nour Al Bayan.",
      practical: [
        "2 cours par semaine (mardi & vendredi)",
        "Séances intensives d'une heure",
        "Replays disponibles et suivi rigoureux",
        "Support de formation inclus"
      ],
      priceText: "349 € / session",
      cta: "S'inscrire au Tajwid Accéléré",
      target: "Élèves motivés sachant déjà lire l'arabe, ou débutants très investis prêts à s'engager sérieusement."
    },
    {
      id: "tilawa",
      title: "Tilawa — Récitation",
      tagline: "Transformer la théorie en une récitation naturelle, fluide et maîtrisée.",
      badge: "Suivi Individuel Tête-à-Tête",
      duration: "À la carte",
      icon: <Sparkles className="w-6 h-6 text-[#008953]" />,
      colorClass: "border-[#008953]/20 hover:border-[#008953]",
      bgBadge: "bg-green-50 text-green-700 border-green-100",
      slot: "mercredi-dimanche",
      hook: "Tu connais les règles de Tajwid en théorie... mais au moment de réciter, tu hésites, tu t'arrêtes souvent et des erreurs subsistent ? Le cours de Tilawa est conçu pour automatiser tes acquis et corriger tes imperfections de manière personnalisée.",
      outcomes: [
        "Application fluide et automatique des règles de Tajwid",
        "Correction chirurgicale des défauts de prononciation",
        "Passage d'une lecture mécanique à une récitation vivante",
        "Gain considérable en confiance et en aisance de lecture"
      ],
      methodology: "Cours 100% individuel axé exclusivement sur la pratique et la correction directe de votre récitation.",
      practical: [
        "Séance individuelle en tête-à-tête avec l'enseignant",
        "Créneaux le mercredi soir ou le dimanche matin",
        "Heure précise convenue selon vos disponibilités",
        "Replays et suivi pédagogique sur-mesure"
      ],
      priceText: "349 € / module",
      cta: "S'inscrire au cours de Tilawa",
      target: "Élèves connaissant déjà les règles de Tajwid (indispensable) et souhaitant parfaire leur récitation.",
      badgeCaution: "Nécessite de connaître le Tajwid"
    },
    {
      id: "hifdh",
      title: "Hifdh — Mémorisation",
      tagline: "Construire une relation quotidienne et stable avec le Coran.",
      badge: "Suivi Individuel Tête-à-Tête",
      duration: "Annuel / À la carte",
      icon: <Award className="w-6 h-6 text-[#c8a96e]" />,
      colorClass: "border-amber-200 hover:border-[#c8a96e]",
      bgBadge: "bg-amber-50 text-amber-700 border-amber-100",
      slot: "mercredi-dimanche-hifdh",
      hook: "Mémoriser seul est un défi où la démotivation et l'oubli prennent souvent le dessus. Le programme de Hifdh offre le cadre idéal pour bâtir une routine d'apprentissage stable, préserver les sourates mémorisées et cheminer spirituellement.",
      outcomes: [
        "Mémorisation solide et structurée de nouveaux versets",
        "Programme de révision (Mouraja'a) rigoureux et stable",
        "Correction et vérification de la récitation avant mémorisation",
        "Ancrage quotidien du Coran comme compagnon de vie"
      ],
      methodology: "Suivi individuel rigoureux basé sur la répétition, la correction des erreurs et l'organisation personnalisée.",
      practical: [
        "Cours particulier en tête-à-tête avec votre enseignant",
        "Créneaux le mercredi soir ou le dimanche matin",
        "Rythme et objectifs adaptés à vos capacités",
        "Suivi et révisions régulières"
      ],
      priceText: "349 € / parcours",
      cta: "Rejoindre le programme Hifdh",
      target: "Élèves connaissant les règles de Tajwid et souhaitant mémoriser le Coran dans un cadre structuré et sérieux.",
      badgeCaution: "Nécessite de connaître le Tajwid"
    },
    {
      id: "sirah",
      title: "Sîrah du Prophète ﷺ",
      tagline: "Découvrir sa vie pour l'aimer, le comprendre et le prendre comme modèle.",
      badge: "Storytelling Spirituel",
      duration: "Cursus Vivant",
      icon: <Compass className="w-6 h-6 text-[#008953]" />,
      colorClass: "border-[#008953]/20 hover:border-[#008953]",
      bgBadge: "bg-green-50 text-green-700 border-green-100",
      slot: "samedi-sirah",
      hook: "La Sîrah est trop souvent étudiée comme une simple suite de dates ou de batailles. Ce cours propose une approche vivante et spirituelle pour rapprocher le Prophète ﷺ de votre cœur et comprendre comment son modèle illumine votre vie moderne.",
      outcomes: [
        "Compréhension approfondie de la sagesse et de la spiritualité prophétique",
        "Étude de son comportement exemplaire (Akhlaq) avec son entourage",
        "Leçons concrètes tirées de ses épreuves au quotidien",
        "Renforcement de l'amour et de l'attachement au Messager d'ALLAH ﷺ"
      ],
      methodology: "Pédagogie active alliant récits vivants (storytelling), réflexions contemporaines et leçons spirituelles.",
      practical: [
        "Tous les samedis à 10H30 en direct",
        "Replays accessibles pour révision",
        "Supports pédagogiques complets fournis",
        "Enseignement interactif et accessible à tous"
      ],
      priceText: "349 € / cursus",
      cta: "S'inscrire au cours de Sîrah",
      target: "Hommes et femmes, débutants comme initiés, souhaitant découvrir sa vie et s'en inspirer."
    },
    {
      id: "arabe",
      title: "Langue Arabe",
      tagline: "Apprendre la langue du Coran pas à pas pour gagner en autonomie.",
      badge: "Méthode Francophone",
      duration: "Progressif",
      icon: <BookOpen className="w-6 h-6 text-[#c8a96e]" />,
      colorClass: "border-amber-200 hover:border-[#c8a96e]",
      bgBadge: "bg-amber-50 text-amber-700 border-amber-100",
      slot: "jeudi-arabe",
      hook: "La langue arabe vous semble intimidante ou hors de portée ? Ce cursus a été pensé spécifiquement pour les francophones afin de lever tous les blocages de prononciation et de grammaire, en partant complètement de zéro.",
      outcomes: [
        "Bases solides de lecture et d'écriture de la langue arabe",
        "Acquisition d'un vocabulaire religieux et usuel indispensable",
        "Compréhension des règles de grammaire essentielles (Nahw)",
        "Gagner en autonomie face aux textes sacrés et traductions"
      ],
      methodology: "S'appuie sur la célèbre méthode de Habib Haffes, réputée pour sa clarté et sa progression fluide pour les francophones.",
      practical: [
        "Tous les jeudis à 18H30 en direct",
        "Replays interactifs pour réviser à votre rythme",
        "Support pédagogique complet et inclus",
        "Suivi pédagogique régulier par l'enseignant"
      ],
      priceText: "349 € / niveau",
      cta: "S'inscrire au cours d'Arabe",
      target: "Grands débutants ou francophones souhaitant acquérir des bases académiques et religieuses solides."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#101828] selection:bg-[#008953] selection:text-white pb-24">
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-gradient-to-b from-green-50/50 via-white to-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute top-40 left-[-10%] w-[450px] h-[450px] bg-green-100/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 space-y-8">
              <nav className="flex items-center justify-center lg:justify-start gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                <Link href="/" className="hover:text-[#008953] transition-colors">Accueil</Link>
                <ChevronRight className="w-3 h-3 text-gray-300" />
                <span className="text-[#008953]">Cours en Présentiel & Direct</span>
              </nav>
              
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-amber-200 rounded-full shadow-sm mb-2">
                <MapPin className="w-4 h-4 text-[#c8a96e]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#c8a96e]">
                  Toulouse & Classes en Direct
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#101828] leading-[1.05] tracking-tight">
                Vivez l'excellence <br />
                <span className="text-[#008953] italic">de l'apprentissage.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Rejoignez nos locaux à Toulouse ou nos classes interactives en direct. Bénéficiez d'une pédagogie humaine, d'un accompagnement personnalisé par des enseignants qualifiés et de supports d'apprentissage exclusifs.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a 
                  href="#catalog" 
                  className="w-full sm:w-auto text-center bg-[#008953] hover:bg-[#007044] text-white px-10 py-5 rounded-2xl text-[15px] font-black transition-all shadow-xl shadow-[#008953]/20 hover:-translate-y-0.5 active:scale-95"
                >
                  EXPLORER NOS 6 FORMATIONS
                </a>
                <Link 
                  href="/inscription?plan=presentiel-global" 
                  className="w-full sm:w-auto text-center bg-white border-2 border-gray-100 hover:border-gray-200 text-[#101828] px-8 py-5 rounded-2xl text-[15px] font-black transition-all hover:bg-gray-50 active:scale-95"
                >
                  INSCRIPTION DIRECTE
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-[500px] aspect-square relative lg:block">
               <div className="absolute inset-0 bg-[#c8a96e]/5 rounded-[3rem] rotate-3 -z-10" />
               <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 flex flex-col justify-center items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#c8a96e]" />
                  <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center text-[#c8a96e]">
                     <Building2 className="w-10 h-10 text-[#c8a96e] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-center space-y-4 px-4">
                     <h3 className="text-2xl font-black text-[#101828] italic">"La proximité est la clé de la transmission du cœur."</h3>
                     <p className="text-gray-400 font-medium text-sm">
                       Un environnement d'étude structuré, fraternel et propice à l'élévation spirituelle.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY BENEFITS SECTION ─── */}
      <section className="py-20 bg-[#FAFAFA] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#008953] bg-green-50 px-4 py-2 rounded-full border border-green-100">
              💡 NOTRE ENGAGEMENT QUALITÉ
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#101828] mt-6 tracking-tight">
              Pourquoi étudier à <span className="text-[#008953]">l'Institut ISHES</span> ?
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-base">
              Nous combinons rigueur académique, outils modernes et attention individuelle pour vous mener à la réussite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-6 h-6" />,
                title: "Diplôme d'Institut",
                desc: "À la fin de votre cursus, un diplôme officiel délivré par l'Institut ISHES atteste de la validation de vos compétences."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Pédagogie Progressive",
                desc: "Des cours adaptés aux francophones, progressifs et structurés, parfaits pour les débutants comme pour les initiés."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Corrections Régulières",
                desc: "Profitez d'un retour direct de vos professeurs à chaque séance pour affiner et parfaire votre pratique."
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Replays & Flexibilité",
                desc: "Chaque session en direct est enregistrée. Les replays restent accessibles en ligne pour réviser sereinement."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-50 text-[#008953] rounded-xl flex items-center justify-center mb-6 border border-green-100">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-black text-[#101828] mb-3">{benefit.title}</h3>
                <p className="text-gray-500 font-medium text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSES GRID CATALOG SECTION ─── */}
      <section id="catalog" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c8a96e] bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
              📚 CATALOGUE DES PROGRAMMES
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#101828] mt-6 tracking-tight">
              Choisissez votre <span className="text-[#008953]">cheminement</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 text-lg">
              Six programmes conçus pour répondre précisément à vos besoins de lecture, de compréhension et de spiritualité.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {presentielCourses.map((course) => (
              <div 
                key={course.id}
                className={`bg-white rounded-[2.5rem] border-2 ${course.colorClass} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
              >
                {/* Upper section */}
                <div className="p-8 md:p-10 space-y-6">
                  {/* Badge & Duration */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${course.bgBadge}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#101828] leading-tight">
                        {course.title}
                      </h3>
                      {course.badgeCaution && (
                        <span className="inline-block bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-red-100 mt-1">
                          ⚠️ {course.badgeCaution}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tagline & Hook */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-[#c8a96e] leading-snug">
                      {course.tagline}
                    </h4>
                    <p className="text-gray-500 font-medium text-xs leading-relaxed line-clamp-4">
                      {course.hook}
                    </p>
                  </div>

                  {/* Separator line */}
                  <div className="border-t border-gray-100 pt-6">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-4">
                      ✨ Objectifs de la formation :
                    </h5>
                    <ul className="space-y-2.5">
                      {course.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#008953] mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-bold text-gray-700 leading-snug">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Methodology context */}
                  {course.methodology && (
                    <div className="bg-[#FAFAFA] border border-gray-100 p-4 rounded-2xl">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                        📖 Support & Méthode :
                      </span>
                      <p className="text-xs font-bold text-gray-600 leading-relaxed">
                        {course.methodology}
                      </p>
                    </div>
                  )}

                  {/* Target audience */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">
                      👤 Pour qui ?
                    </span>
                    <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                      {course.target}
                    </p>
                  </div>
                </div>

                {/* Lower Action Section */}
                <div className="bg-[#FAFAFA] border-t border-gray-100 p-8 space-y-6">
                  {/* Practical list */}
                  <div className="grid grid-cols-2 gap-3">
                    {course.practical.map((prac, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                        <span className="w-1.5 h-1.5 bg-[#c8a96e] rounded-full flex-shrink-0"></span>
                        <span className="truncate" title={prac}>{prac}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">
                        TARIF FORMATION
                      </span>
                      <span className="text-xl font-black text-[#101828]">
                        {course.priceText}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/inscription?plan=presentiel-global&slot=${course.slot}`}
                      className="inline-flex items-center gap-2 bg-[#008953] hover:bg-[#007044] text-white px-5 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-[#008953]/10 hover:shadow-lg active:scale-95"
                    >
                      <span>S'inscrire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFORMATION NOTE & GENERAL REGISTRATION ─── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#008953] to-[#005e38] text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Decorative background vectors */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />

          <div className="space-y-6 relative z-10 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                Paiement Souple & Sécurisé
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Prenez votre place <br />
              au sein de la promotion.
            </h2>
            <p className="text-sm md:text-base text-green-100 font-medium max-w-xl leading-relaxed">
              Pour toutes nos formations en présentiel, un acompte initial de <strong>150 €</strong> est demandé lors de l'inscription en ligne pour valider et garantir votre place physique ou votre créneau horaire personnalisé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10 shrink-0">
            <Link 
              href="/inscription?plan=presentiel-global" 
              className="w-full sm:w-auto text-center bg-white hover:bg-gray-50 text-[#008953] px-10 py-5 rounded-2xl text-[14px] font-black tracking-wider transition-all shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              RÉSERVER MA PLACE (150 €)
            </Link>
            <Link 
              href="/fr/contact" 
              className="w-full sm:w-auto text-center bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-8 py-5 rounded-2xl text-[14px] font-black transition-all hover:bg-white/5 active:scale-95"
            >
              POSER UNE QUESTION
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER SEO MARQUEE ─── */}
      <section className="py-8 bg-[#FAFAFA] overflow-hidden opacity-30">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "ishes toulouse", "cours arabe toulouse", "tajwid presentiel toulouse", "institut islamique toulouse", 
            "école arabe toulouse", "coran toulouse", "sciences islamiques toulouse", "hifz toulouse", "apprentissage coran toulouse"
          ].map((kw, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {kw}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
