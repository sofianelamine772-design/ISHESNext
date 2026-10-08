export const CIVILISATION_ENROLL =
  "/inscription?plan=civilisation_arabo_musulmane&audience=adulte";

export const CIVILISATION_PATH = "/fr/civilisation-arabo-musulmane";

export type SavantSection = { id: string; title: string; paragraphs: string[] };

export type CivilisationSavant = {
  slug: string;
  name: string;
  latinName?: string;
  dates: string;
  fields: string[];
  cities: string;
  headline: string;
  summary: string;
  works: string[];
  sections: SavantSection[];
  faqs: Array<{ question: string; answer: string }>;
  whyInCourse: string;
  keywords: string[];
};

export const CIVILISATION_SAVANTS: CivilisationSavant[] = [
  {
    slug: "al-khwarizmi",
    name: "Al-Khwārizmī",
    latinName: "Algoritmi",
    dates: "vers 780 – vers 850",
    fields: ["Mathématiques", "Algèbre", "Astronomie"],
    cities: "Bagdad — Maison de la Sagesse",
    headline:
      "Al-Khwārizmī (Algoritmi) : biographie du père de l'algèbre à la Maison de la Sagesse",
    summary:
      "Biographie d'Al-Khwārizmī, mathématicien de Bagdad abbasside : Kitāb al-jabr, chiffres indiens, tables astronomiques et origine du mot algorithme.",
    works: [
      "Kitāb al-jabr wa-l-muqābala (traité d'algèbre)",
      "Ouvrage sur le calcul indien (système décimal)",
      "Tables astronomiques (zīj)",
      "Géographie (Kitāb ṣūrat al-arḍ)",
    ],
    sections: [
      {
        id: "vie",
        title: "Qui était Al-Khwārizmī ?",
        paragraphs: [
          "Muhammad ibn Mūsā al-Khwārizmī (vers 780 – vers 850) est originaire, selon la tradition, de la région du Khwārazm, en Asie centrale. Il s'installe à Bagdad, capitale du califat abbasside, au moment où la Bayt al-Hikma (Maison de la Sagesse) rassemble traducteurs, astronomes et mathématiciens.",
          "Son nom latinisé, Algoritmi ou Algorismus, a donné le mot français « algorithme ». Le titre de son grand traité d'algèbre, al-jabr, a donné « algèbre ». Peu de savants ont laissé une trace aussi directe dans le vocabulaire scientifique mondial.",
          "Al-Khwārizmī n'est pas un compilateur isolé : il travaille dans un milieu où l'on traduit le grec, le sanskrit et le persan, où l'on vérifie les tables du ciel et où le calife finance le savoir comme un outil d'État.",
        ],
      },
      {
        id: "algebre",
        title: "L'algèbre et le calcul indien",
        paragraphs: [
          "Le Kitāb al-jabr wa-l-muqābala pose des méthodes pour résoudre des équations (ce que l'on appellerait du premier et du second degré), avec des exemples concrets : héritages, commerce, arpentage. L'algèbre n'y est pas un jeu abstrait : elle sert la vie sociale et le droit.",
          "Un autre ouvrage, souvent cité pour le « calcul indien », expose le système décimal de position et le zéro tels qu'ils circulaient depuis l'Inde. Al-Khwārizmī n'invente pas à lui seul les « chiffres arabes », mais il les rend utilisables dans le monde islamique, d'où ils passeront vers l'Europe médiévale (Fibonacci, marchands italiens).",
          "C'est là le cœur de l'âge d'or : non pas seulement « sauver » Euclide, mais produire des outils nouveaux et les enseigner.",
        ],
      },
      {
        id: "heritage",
        title: "Astronomie, géographie et héritage européen",
        paragraphs: [
          "Al-Khwārizmī compose des tables astronomiques (zīj) et un ouvrage de géographie qui actualise Ptolémée avec des coordonnées du monde musulman. Mesurer le ciel et la Terre va de pair : calendrier, qibla, fiscalité, routes.",
          "Au XIIe siècle, des traductions latines (notamment via l'Espagne) font d'Algoritmi une autorité des écoles d'Occident. Étudier Al-Khwārizmī aujourd'hui, c'est voir que la civilisation arabo-musulmane a transformé le savoir, pas seulement le conservé.",
        ],
      },
    ],
    faqs: [
      {
        question: "Al-Khwārizmī a-t-il inventé l'algèbre ?",
        answer:
          "Il n'est pas le premier à manipuler des équations, mais son traité Kitāb al-jabr a donné son nom à l'algèbre et a systématisé des méthodes enseignées ensuite dans tout le monde musulman, puis en Europe.",
      },
      {
        question: "Pourquoi dit-on que le mot algorithme vient d'Al-Khwārizmī ?",
        answer:
          "Son nom latinisé, Algoritmi, a désigné les procédés de calcul qu'il exposait. Le français « algorithme » en dérive.",
      },
    ],
    whyInCourse:
      "Le cours ISHES replace Al-Khwārizmī dans Bagdad abbasside, la Maison de la Sagesse et la transmission des mathématiques vers l'Occident.",
    keywords: [
      "al khwarizmi",
      "algèbre",
      "algorithme",
      "maison de la sagesse",
      "mathématiques arabes",
    ],
  },
  {
    slug: "ibn-sina",
    name: "Ibn Sīnā",
    latinName: "Avicenne",
    dates: "980 – 1037",
    fields: ["Médecine", "Philosophie", "Sciences"],
    cities: "Boukhara, Ispahan, Hamadan",
    headline:
      "Ibn Sīnā (Avicenne) : biographie, Canon de la médecine et âge d'or",
    summary:
      "Biographie d'Ibn Sīnā (Avicenne), médecin et philosophe d'Asie centrale : le Canon de la médecine, les hôpitaux islamiques et l'influence en Europe jusqu'à la Renaissance.",
    works: [
      "Al-Qānūn fī al-tibb (Canon de la médecine)",
      "Kitāb al-Shifāʾ (Livre de la guérison — encyclopédie philosophique)",
      "Nombreux traités de logique, physique et métaphysique",
    ],
    sections: [
      {
        id: "vie",
        title: "Vie d'Ibn Sīnā (Avicenne)",
        paragraphs: [
          "Abū ʿAlī al-Husayn ibn Sīnā (980–1037), Avicenne en latin, naît près de Boukhara, dans un monde persan d'Asie centrale intégré à l'espace islamique. Prodige, il étudie très tôt le fiqh, la logique, les sciences naturelles et la médecine.",
          "Sa vie est celle d'un savant de cour : vizirs, voyages, Ispahan, Hamadan. Il écrit souvent la nuit, entre consultations et charges politiques. Le mythe du génie solitaire est faux : Avicenne vit dans des bibliothèques, des hôpitaux et des cercles de débat.",
          "Il incarne un fait essentiel : la civilisation arabo-musulmane n'est pas « seulement arabe ». Persans, Turcs, savants du Khorasan y tiennent un rôle central, en langue arabe savante.",
        ],
      },
      {
        id: "canon",
        title: "Le Canon de la médecine",
        paragraphs: [
          "Al-Qānūn fī al-tibb organise la médecine en un système : anatomie, symptômes, maladies, médicaments, hygiène. Ibn Sīnā s'appuie sur Hippocrate et Galien, mais aussi sur l'expérience des bīmāristān (hôpitaux) du monde musulman.",
          "Traduit en latin au XIIe siècle, le Canon reste un manuel des facultés européennes jusqu'aux XVIe–XVIIe siècles. Des générations de médecins d'Occident ont appris Avicenne avant Paré ou Harvey.",
          "Le Canon n'est pas un grimoire : c'est un effort de classification, de posologie et de diagnostic différentiel — la médecine comme science transmissible.",
        ],
      },
      {
        id: "philosophie",
        title: "Philosophe et héritage",
        paragraphs: [
          "Le Kitāb al-Shifāʾ (Livre de la guérison) est une encyclopédie : logique, physique, mathématiques, métaphysique. Ibn Sīnā discute Aristote et al-Fārābī, et influence plus tard al-Ghazālī et Ibn Rushd, chacun à sa manière.",
          "Pour le lecteur d'aujourd'hui, Avicenne montre que foi, raison et clinique pouvaient cohabiter dans un même parcours. C'est l'un des visages les plus connus de l'âge d'or — à condition de le relire dans son siècle, pas dans les slogans.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pourquoi appelle-t-on Ibn Sīnā Avicenne ?",
        answer:
          "Avicenne est la forme latine médiévale de son nom, utilisée dans les universités d'Europe où le Canon était enseigné.",
      },
      {
        question: "Le Canon de la médecine a-t-il vraiment été enseigné en Europe ?",
        answer:
          "Oui. Des traductions latines ont fait du Canon un ouvrage de référence dans plusieurs facultés de médecine, parfois jusqu'à la Renaissance et au-delà.",
      },
    ],
    whyInCourse:
      "La formation relie Ibn Sīnā aux hôpitaux, à la transmission vers l'Europe et à la place de la médecine dans l'âge d'or.",
    keywords: [
      "ibn sina",
      "avicenne",
      "canon de la medecine",
      "médecine islamique",
      "âge d'or",
    ],
  },
  {
    slug: "al-razi",
    name: "Al-Rāzī",
    latinName: "Rhazès",
    dates: "vers 865 – vers 925",
    fields: ["Médecine", "Chimie", "Hôpitaux"],
    cities: "Rayy, Bagdad",
    headline:
      "Al-Rāzī (Rhazès) : biographie du médecin de Bagdad, variole et chimie",
    summary:
      "Biographie d'Al-Rāzī (Rhazès) : hôpitaux de Rayy et de Bagdad, distinction variole/rougeole, éthique médicale et chimie de laboratoire.",
    works: [
      "Kitāb al-Ḥāwī (continens — vaste compilation médicale)",
      "Traité sur la variole et la rougeole",
      "Écrits de pharmacie, d'éthique et de chimie expérimentale",
    ],
    sections: [
      {
        id: "vie",
        title: "Al-Rāzī, clinicien de Rayy et de Bagdad",
        paragraphs: [
          "Abū Bakr Muhammad ibn Zakariyyā al-Rāzī (vers 865 – vers 925), Rhazès en latin, est né à Rayy (Iran actuel). Musicien et alchimiste dans sa jeunesse, il se tourne vers la médecine et dirige des hôpitaux, d'abord à Rayy, puis à Bagdad.",
          "Son originalité : observer le malade au lit, noter l'évolution, comparer les cas. Il critique ceux qui répètent Galien sans voir le patient. C'est une médecine d'hôpital, pas seulement de bibliothèque.",
        ],
      },
      {
        id: "medecine",
        title: "Variole, rougeole et éthique du médecin",
        paragraphs: [
          "Son traité sur la variole et la rougeole est souvent considéré comme l'une des premières descriptions cliniques claires distinguant les deux maladies. Il décrit boutons, fièvre, pronostic — un regard d'épidémiologiste avant le mot.",
          "Al-Rāzī écrit aussi sur le métier : modestie, attention aux pauvres, refus de l'escroquerie. L'hôpital islamique (bīmāristān) forme, soigne et archive. Rhazès en est une figure emblématique.",
        ],
      },
      {
        id: "chimie",
        title: "Chimie de laboratoire et héritage",
        paragraphs: [
          "Dans ce qu'on appelait alors alchimie, Al-Rāzī décrit substances, cornues, distillations : un pas vers une chimie expérimentale, loin du seul symbolisme. L'Europe le lira sous le nom de Rhazes, aux côtés d'Avicenne, pendant des siècles.",
          "Le relier à Ibn Sīnā et Al-Zahrāwī permet de voir un réseau médical : Perse, Irak, Andalousie — une même civilisation, plusieurs foyers.",
        ],
      },
    ],
    faqs: [
      {
        question: "Al-Rāzī a-t-il vraiment distingué la variole de la rougeole ?",
        answer:
          "Son traité est cité comme l'une des premières descriptions cliniques séparant nettement les deux affections, à partir de l'observation des malades.",
      },
      {
        question: "Où Al-Rāzī a-t-il exercé ?",
        answer:
          "Principalement à Rayy puis à Bagdad, où il a dirigé des hôpitaux (bīmāristān) et formé des médecins.",
      },
    ],
    whyInCourse:
      "Le cours montre le rôle des bīmāristān et d'Al-Rāzī dans l'histoire de la médecine et de la chimie.",
    keywords: ["al razi", "rhazes", "variole", "hopital bagdad", "chimie"],
  },
  {
    slug: "ibn-al-haytham",
    name: "Ibn al-Haytham",
    latinName: "Alhazen",
    dates: "vers 965 – vers 1040",
    fields: ["Optique", "Méthode scientifique", "Mathématiques"],
    cities: "Bassora, Le Caire",
    headline:
      "Ibn al-Haytham (Alhazen) : biographie, Livre d'optique et méthode scientifique",
    summary:
      "Biographie d'Ibn al-Haytham (Alhazen) : Kitāb al-Manāzir, chambre noire, critique des théories grecques de la vision et influence sur l'optique européenne.",
    works: [
      "Kitāb al-Manāzir (Livre d'optique)",
      "Traités de mathématiques, d'astronomie et de scepticisme méthodique",
    ],
    sections: [
      {
        id: "vie",
        title: "De Bassora au Caire",
        paragraphs: [
          "Al-Hasan ibn al-Haytham (vers 965 – vers 1040), Alhazen en latin, naît à Bassora. Il gagne le Caire fatimide, où la tradition raconte un projet (peut-être légendaire) de réguler le Nil, puis une période de retraite consacrée à l'écriture.",
          "Qu'importe le détail romanesque : le fait est qu'au Caire il produit le Kitāb al-Manāzir, l'un des plus grands livres d'optique du Moyen Âge.",
        ],
      },
      {
        id: "optique",
        title: "Le Livre d'optique et la méthode",
        paragraphs: [
          "Ibn al-Haytham étudie la lumière, la réflexion, la réfraction, la chambre noire (camera obscura), les illusions. Il refuse la théorie des « rayons qui sortent de l'œil » héritée de certains Grecs, et privilégie la lumière qui entre dans l'œil.",
          "Surtout, il expose une méthode : ne pas se fier à l'autorité ; formuler, expérimenter, vérifier. Ce n'est pas encore le laboratoire du XVIIe siècle, mais ce n'est plus la seule citation d'Aristote.",
        ],
      },
      {
        id: "europe",
        title: "D'Alhazen à l'Europe",
        paragraphs: [
          "Traduit en latin, Alhazen nourrit Roger Bacon, Witelo, puis, plus tard, le débat optique jusqu'à Kepler. Du Caire vers les universités d'Occident, c'est une chaîne de transmission concrète.",
          "Ibn al-Haytham prouve que la civilisation arabo-musulmane a produit une science de la preuve — pas seulement des compilations de l'Antiquité.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ibn al-Haytham a-t-il inventé la chambre noire ?",
        answer:
          "Il a décrit et utilisé le principe de la camera obscura dans son Livre d'optique, ce qui a marqué l'histoire de la vision et, plus tard, de la photographie.",
      },
      {
        question: "Pourquoi dit-on qu'il a une « méthode scientifique » ?",
        answer:
          "Parce qu'il refuse l'argument d'autorité seul et articule hypothèse, expérience et contrôle — une démarche rare et explicite dans les textes d'optique médiévaux.",
      },
    ],
    whyInCourse:
      "ISHES présente Ibn al-Haytham comme figure de la méthode scientifique et de l'optique, entre Bassora et Le Caire.",
    keywords: [
      "ibn al haytham",
      "alhazen",
      "optique",
      "methode scientifique",
      "livre d'optique",
    ],
  },
  {
    slug: "al-biruni",
    name: "Al-Bīrūnī",
    latinName: "Alberonius",
    dates: "973 – vers 1050",
    fields: ["Astronomie", "Géographie", "Inde", "Mesure de la Terre"],
    cities: "Khwārazm, Ghazna, Inde",
    headline:
      "Al-Bīrūnī : biographie, mesure de la Terre, astronomie et Kitāb al-Hind",
    summary:
      "Biographie d'Al-Bīrūnī, savant du Khwārazm : géodésie, astronomie, minéralogie et description de l'Inde, carrefour entre Iran, Inde et monde islamique.",
    works: [
      "Kitāb al-Hind (description de l'Inde)",
      "Al-Āthār al-bāqiya (chronologie des nations)",
      "Traités d'astronomie, de géodésie et de minéralogie",
    ],
    sections: [
      {
        id: "vie",
        title: "Un savant d'Asie centrale",
        paragraphs: [
          "Abū Rayhān al-Bīrūnī (973 – vers 1050) naît au Khwārazm. Il sert des cours, notamment ghaznavides, et accompagne des campagnes vers l'Inde. Polyglotte, il apprend le sanskrit pour lire les sources, pas seulement pour les résumer de seconde main.",
          "Astronome, géographe, minéralogiste, historien des calendriers et des religions : Al-Bīrūnī refuse la spécialisation étroite. Il veut mesurer et comparer.",
        ],
      },
      {
        id: "inde",
        title: "Le Kitāb al-Hind et la curiosité scientifique",
        paragraphs: [
          "Son livre sur l'Inde décrit croyances, sciences, coutumes, systèmes de calcul avec une honnêteté rare pour l'époque : il distingue ce qu'il a vu, ce qu'on lui a dit, ce qu'il n'a pas compris. C'est une éthique de l'enquête.",
          "Comparer les calendriers, les latitudes, les rites : Al-Bīrūnī traite l'autre civilisation comme un objet de savoir, non comme un décor.",
        ],
      },
      {
        id: "terre",
        title: "Mesurer la Terre",
        paragraphs: [
          "Il propose des méthodes pour estimer le rayon terrestre et travaille les coordonnées. La géographie devient calcul, pas seulement récits de voyageurs.",
          "Al-Bīrūnī incarne le carrefour : monde iranien, Inde, islam. La civilisation arabo-musulmane n'est pas un îlot : c'est une plaque tournante du savoir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Al-Bīrūnī a-t-il mesuré la Terre ?",
        answer:
          "Il a conçu des méthodes géodésiques pour estimer le rayon terrestre et affiner les coordonnées, dans le prolongement d'une tradition astronomique déjà riche.",
      },
      {
        question: "Pourquoi le Kitāb al-Hind est-il important ?",
        answer:
          "Parce qu'il décrit l'Inde (sciences, religions, coutumes) avec une méthode comparative et une prudence de témoin, exceptionnelle au XIe siècle.",
      },
    ],
    whyInCourse:
      "Le programme relie Al-Bīrūnī à l'astronomie, à la géographie et aux échanges avec l'Inde.",
    keywords: [
      "al biruni",
      "astronomie",
      "geographie",
      "mesure de la terre",
      "kitab al hind",
    ],
  },
  {
    slug: "ibn-khaldun",
    name: "Ibn Khaldūn",
    latinName: "Ibn Khaldoun",
    dates: "1332 – 1406",
    fields: ["Histoire", "Sociologie", "Maghreb"],
    cities: "Tunis, Fès, Grenade, Le Caire",
    headline:
      "Ibn Khaldūn : biographie, Muqaddima, ʿasabiyya et naissance de la sociologie",
    summary:
      "Biographie d'Ibn Khaldūn (1332–1406) : Tunis, Maghreb, Le Caire, la Muqaddima, les cycles des États et l'histoire comme science des sociétés.",
    works: [
      "Al-Muqaddima (Introduction à l'histoire universelle)",
      "Kitāb al-ʿIbar (histoire des Arabes, des Berbères et des dynasties)",
    ],
    sections: [
      {
        id: "vie",
        title: "Une vie entre Maghreb, Andalousie et Égypte",
        paragraphs: [
          "Wali al-Dīn ʿAbd al-Rahmān ibn Khaldūn (1332–1406) naît à Tunis, dans une famille d'origine andalouse. Juge, diplomate, professeur, il sert des princes du Maghreb, passe par Fès et Grenade, connaît la prison et l'exil, et termine sa carrière au Caire.",
          "Le XIVe siècle est celui des crises : peste, dynasties fragiles, chute progressive d'al-Andalus. Ibn Khaldūn n'écrit pas depuis un salon : il a vu les États naître et se défaire.",
        ],
      },
      {
        id: "muqaddima",
        title: "La Muqaddima : penser les civilisations",
        paragraphs: [
          "La Muqaddima précède une grande histoire. Ibn Khaldūn y pose l'ʿasabiyya (solidarité du groupe), le passage de la vie bédouine à la vie urbaine, le rôle du luxe dans le déclin, l'impôt, le travail, parfois le climat.",
          "Il refuse l'histoire-anecdote. Il cherche des causes répétables. On y a vu, à raison, un ancêtre de la sociologie et de l'économie politique — sans en faire un « Durkheim du XIVe siècle » : c'est un ʿālim maghrébin, juriste, qui parle d'umran (civilisation, peuplement).",
        ],
      },
      {
        id: "lire",
        title: "Pourquoi le lire aujourd'hui",
        paragraphs: [
          "Pour un public francophone, Ibn Khaldūn relie Tunis, Fès, Grenade et Le Caire à une question actuelle : comment une société se tient, et comment elle se défait. C'est l'un des sommets de la pensée de la civilisation arabo-musulmane au Maghreb.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qu'est-ce que la Muqaddima d'Ibn Khaldūn ?",
        answer:
          "C'est l'introduction théorique à son histoire universelle : une réflexion sur les États, la ʿasabiyya, l'économie et le cycle des civilisations, bien plus qu'une simple préface.",
      },
      {
        question: "Ibn Khaldūn est-il le « père de la sociologie » ?",
        answer:
          "Le titre est anachronique, mais sa recherche de causes sociales et politiques aux événements en fait un précurseur majeur des sciences sociales, particulièrement au Maghreb.",
      },
    ],
    whyInCourse:
      "Le cours ISHES situe Ibn Khaldūn dans l'héritage maghrébin et andalou, et dans l'invention d'une histoire raisonnée.",
    keywords: [
      "ibn khaldun",
      "muqaddima",
      "sociologie",
      "histoire maghreb",
      "asabiyya",
    ],
  },
  {
    slug: "al-idrisi",
    name: "Al-Idrīsī",
    latinName: "Descriptio Nubiensis",
    dates: "1100 – 1165",
    fields: ["Cartographie", "Géographie", "Voyages"],
    cities: "Ceuta, Palerme (Sicile)",
    headline:
      "Al-Idrīsī : biographie, Tabula Rogeriana et cartographie arabo-normande",
    summary:
      "Biographie d'Al-Idrīsī (1100–1165) : Ceuta, Palerme, le Nuzhat al-mushtāq pour Roger II, cartes du monde reliant Afrique, Europe et Orient.",
    works: [
      "Nuzhat al-mushtāq (Tabula Rogeriana) — géographie et cartes",
    ],
    sections: [
      {
        id: "vie",
        title: "D'al-Andalus et du Maghreb à la Sicile",
        paragraphs: [
          "Abū ʿAbd Allāh al-Idrīsī (vers 1100–1165), né à Ceuta, appartient à une lignée liée aux Idrissides. Il voyage, puis s'installe à la cour de Roger II de Sicile, à Palerme — un royaume où coexistent latin, grec et arabe.",
          "Ce choix n'est pas une « trahison » : c'est le XIIe siècle méditerranéen, où les savoirs circulent avec les marchands et les ambassades.",
        ],
      },
      {
        id: "carte",
        title: "La Tabula Rogeriana",
        paragraphs: [
          "Le Nuzhat al-mushtāq fī khtirāq al-āfāq, souvent appelé Tabula Rogeriana, décrit mers, villes, routes, climats. Les planisphères, parfois orientés le sud en haut, ont frappé l'Europe.",
          "Al-Idrīsī croise sources écrites, récits de voyageurs et enquête. La géographie n'est pas un atlas décoratif : c'est un outil de pouvoir, de commerce et de représentation du monde.",
        ],
      },
      {
        id: "reseaux",
        title: "Une civilisation de réseaux",
        paragraphs: [
          "Avec Bagdad, Cordoue, Le Caire et Damas, Palerme rappelle que la civilisation arabo-musulmane se lit aussi sur mer : Afrique, Europe, Asie. Étudier Al-Idrīsī, c'est sortir de l'image d'un monde fermé.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qu'est-ce que la Tabula Rogeriana ?",
        answer:
          "C'est le nom donné en Occident à l'atlas et au traité géographique d'Al-Idrīsī, composés pour le roi Roger II de Sicile au XIIe siècle.",
      },
      {
        question: "Pourquoi Al-Idrīsī a-t-il travaillé en Sicile chrétienne ?",
        answer:
          "La Sicile normande était un carrefour linguistique et savant. Les cours finançaient les géographes ; Al-Idrīsī y a synthétisé le savoir arabe du Maghreb, d'al-Andalus et d'Orient.",
      },
    ],
    whyInCourse:
      "ISHES présente Al-Idrīsī avec les grands foyers (Bagdad, Cordoue, Le Caire, Damas) et les réseaux d'échanges.",
    keywords: [
      "al idrisi",
      "tabula rogeriana",
      "cartographie arabe",
      "geographie medievale",
      "sicile",
    ],
  },
  {
    slug: "ibn-rushd",
    name: "Ibn Rushd",
    latinName: "Averroès",
    dates: "1126 – 1198",
    fields: ["Philosophie", "Droit mâlikite", "Médecine"],
    cities: "Cordoue, Marrakech",
    headline:
      "Ibn Rushd (Averroès) : biographie, Cordoue, Aristote et fiqh mâlikite",
    summary:
      "Biographie d'Ibn Rushd (Averroès, 1126–1198) : cadi mâlikite de Cordoue, commentateur d'Aristote, médecin, débat avec al-Ghazālī et influence sur l'Europe médiévale.",
    works: [
      "Commentaires d'Aristote (grands, moyens, paraphrases)",
      "Faṣl al-maqāl (discours décisif sur philosophie et Révélation)",
      "Tahāfut al-Tahāfut (Incohérence de l'Incohérence)",
      "Bidāyat al-mujtahid (droit comparé mâlikite)",
    ],
    sections: [
      {
        id: "vie",
        title: "Le cadi de Cordoue",
        paragraphs: [
          "Abū al-Walīd Muhammad ibn Rushd (1126–1198) naît à Cordoue dans une lignée de juristes mâlikites. Il devient qādī, médecin, et philosophe au service des Almohades, entre al-Andalus et Marrakech.",
          "Sa disgrâce tardive (livres brûlés, exil) montre que la falsafa n'était pas un consensus : c'était un champ de tensions. Puis l'Europe le canonise sous le nom d'Averroès, « le Commentateur ».",
        ],
      },
      {
        id: "philosophie",
        title: "Raison, Révélation et Aristote",
        paragraphs: [
          "Ibn Rushd commente Aristote avec une ambition systématique. Dans le Faṣl al-maqāl, il soutient que la démonstration philosophique et la Loi ne s'opposent pas, si chacune reste à sa place. Le Tahāfut al-Tahāfut répond à al-Ghazālī.",
          "Le mythe européen de la « double vérité » simplifie trop. Il faut le relire dans le mâlikisme andalou et le contexte almohade, pas dans les querelles parisiennes du XIIIe siècle seulement.",
        ],
      },
      {
        id: "droit",
        title: "Juriste mâlikite et héritage",
        paragraphs: [
          "Le Bidāyat al-mujtahid compare les avis des écoles. Ibn Rushd n'est pas qu'un « philosophe pour l'Occident » : c'est un faqīh du Maghreb et d'al-Andalus. La formation ISHES le relie au fiqh mâlikite enseigné par ailleurs à l'institut.",
          "Médecine, droit, philosophie : Cordoue comme laboratoire d'une civilisation de la rencontre — et parfois du conflit — entre disciplines.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ibn Rushd et Averroès sont-ils la même personne ?",
        answer:
          "Oui. Averroès est la forme latine d'Ibn Rushd, utilisée dans les universités médiévales d'Europe.",
      },
      {
        question: "Ibn Rushd était-il mâlikite ?",
        answer:
          "Oui. Issu d'une famille de cadis mâlikites de Cordoue, il a écrit en fiqh (notamment Bidāyat al-mujtahid) tout en commentant Aristote.",
      },
    ],
    whyInCourse:
      "Le cours relie Averroès à al-Andalus, au mâlikisme et à la transmission de la philosophie vers l'Europe.",
    keywords: [
      "ibn rushd",
      "averroes",
      "cordoue",
      "philosophie islamique",
      "fiqh malikite",
    ],
  },
  {
    slug: "al-zahrawi",
    name: "Al-Zahrāwī",
    latinName: "Abulcasis",
    dates: "vers 936 – 1013",
    fields: ["Chirurgie", "Médecine", "Instruments"],
    cities: "Madinat al-Zahrāʾ, Cordoue",
    headline:
      "Al-Zahrāwī (Abulcasis) : biographie, chirurgie de Cordoue et Kitāb al-Tasrīf",
    summary:
      "Biographie d'Al-Zahrāwī (Abulcasis) : chirurgien d'al-Andalus, encyclopédie Kitāb al-Tasrīf, plus de deux cents instruments illustrés, héritage européen.",
    works: [
      "Kitāb al-Tasrīf (encyclopédie médicale, dont le livre de chirurgie illustré)",
    ],
    sections: [
      {
        id: "vie",
        title: "Le chirurgien de Madinat al-Zahrāʾ",
        paragraphs: [
          "Abū al-Qāsim Khalaf ibn al-ʿAbbās al-Zahrāwī (vers 936–1013), Abulcasis en latin, exerce près de Cordoue, à Madinat al-Zahrāʾ, cité palatine du califat omeyyade d'al-Andalus. Médecin de cour, il soigne et enseigne.",
          "Al-Andalus du Xe siècle est un sommet : bibliothèques, hôpitaux, artisanat du métal. La chirurgie y devient un art écrit, pas un geste méprisé.",
        ],
      },
      {
        id: "tasrif",
        title: "Le Kitāb al-Tasrīf et les instruments",
        paragraphs: [
          "Son encyclopédie, surtout le volume de chirurgie, décrit opérations, cautères, obstétrique, dentisterie, et plus de deux cents instruments dessinés. Ces planches, copiées en latin, formeront des chirurgiens d'Europe pendant des siècles.",
          "Al-Zahrāwī insiste sur l'expérience, la prudence, le respect du patient. Il écrit pour transmettre : c'est un manuel, pas un secret de corporation.",
        ],
      },
      {
        id: "triptyque",
        title: "Avec Avicenne et Rhazès",
        paragraphs: [
          "Ibn Sīnā (Canon), Al-Rāzī (clinique de Bagdad), Al-Zahrāwī (chirurgie andalouse) : trois foyers, une même civilisation médicale. L'ISHES les présente ensemble pour que l'élève voie le réseau, pas des noms isolés.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pourquoi Al-Zahrāwī est-il appelé Abulcasis ?",
        answer:
          "Abulcasis (ou Albucasis) est la forme latine de son nom, utilisée dans les traductions médiévales de son traité de chirurgie.",
      },
      {
        question: "Qu'a-t-il apporté à la chirurgie ?",
        answer:
          "Une somme illustrée d'opérations et d'instruments (Kitāb al-Tasrīf), qui a servi de référence en Orient et en Europe bien après sa mort.",
      },
    ],
    whyInCourse:
      "La formation présente Al-Zahrāwī dans l'âge d'or andalou : hôpitaux, livres, transmission vers l'Europe.",
    keywords: [
      "al zahrawi",
      "abulcasis",
      "chirurgie",
      "kitab al tasrif",
      "cordoue medecine",
    ],
  },
];

export function getSavant(slug: string) {
  return CIVILISATION_SAVANTS.find((s) => s.slug === slug);
}

export function savantPath(slug: string) {
  return `${CIVILISATION_PATH}/savants/${slug}`;
}

export const CIVILISATION_PERIODS = [
  {
    title: "Avant l'islam (jusqu'en 610)",
    text: "L'Arabie, ses peuples, sa culture et son environnement : caravanes, poésie, tribus, et les grandes puissances voisines (Byzance, Perse).",
  },
  {
    title: "Naissance de l'islam (610–632)",
    text: "La mission du Prophète Muhammad ﷺ à La Mecque puis à Médine : Coran, communauté, et un nouveau cadre moral et politique.",
  },
  {
    title: "Les premiers califats (632–661)",
    text: "Unification des territoires, diffusion de l'islam, et les fondations administratives d'un monde en expansion.",
  },
  {
    title: "Le califat omeyyade (661–750)",
    text: "Damas, l'expansion du monde musulman, l'administration, l'arabe comme langue d'empire, al-Andalus naissante.",
  },
  {
    title: "Le califat abbasside (750–1258)",
    text: "Bagdad, la Maison de la Sagesse, traductions, mathématiques, médecine, astronomie : l'âge d'or du savoir.",
  },
  {
    title: "Les grandes dynasties (Xe–XVe siècle)",
    text: "Seldjoukides, Mamelouks, Almohades, Nasrides… des centres de savoir de Cordoue au Caire, de Fès à Samarcande.",
  },
  {
    title: "Héritage et influence (après le XVe siècle)",
    text: "Les contributions de cette civilisation dans le monde moderne : sciences, institutions, arts, mémoire et débats contemporains.",
  },
];
