export type BoutiqueBook = {
  id: string;
  title: string;
  subtitle: string;
  lead: string;
  more: string[];
  image: string;
  price: string;
  priceValue: string;
  amazonUrl: string;
};

export const BOUTIQUE_BOOKS: BoutiqueBook[] = [
  {
    id: "chahada",
    title: "La Chahada, le chemin de son cœur",
    subtitle: "Histoires et morales pour comprendre Lâ ilâha illa Allâh",
    lead: "Des histoires et des morales pour comprendre la première partie de l’attestation de foi, et donner du sens à la relation avec Allah.",
    more: [
      "La Chahada, le chemin de son cœur ouvre la collection Tarbiya islamiya. Le livre s’adresse à l’enfant, et à l’adulte qui lit avec lui. Il traite de Lâ ilâha illa Allâh : nul n’est digne d’adoration en dehors d’Allah.",
      "Chaque récit part d’une situation concrète, puis pose une morale. Le but n’est pas d’apprendre une définition par cœur. C’est de relier cette phrase à la vie de tous les jours : la reconnaissance, la confiance, et le refus de donner à autre qu’Allah ce qui Lui revient.",
      "On le lit à voix haute, en famille. Il prépare le volume suivant, consacré à Muhammad ﷺ, le Messager d’Allah.",
    ],
    image: "/images/livre_chahada.jpg",
    price: "14,98 €",
    priceValue: "14.98",
    amazonUrl: "https://www.amazon.fr/CHAHADA-chemin-son-coeur-comprendre/dp/B0GD7LVTMP",
  },
  {
    id: "mohammed",
    title: "Mohammed ﷺ, le Messager d’Allah",
    subtitle: "Une biographie accessible pour découvrir sa noble vie",
    lead: "La seconde partie de l’attestation de foi, racontée par la Sîrah : Muhammad ﷺ, le Messager d’Allah.",
    more: [
      "Ce volume de la collection Tarbiya islamiya prolonge La Chahada. Après le sens de Lâ ilâha illa Allâh, le lecteur découvre Muhammad ﷺ : sa naissance, son caractère, sa mission, et la manière dont il a transmis le Coran.",
      "La biographie est écrite dans une langue simple. Elle ne suppose pas que l’on connaisse déjà les événements. Elle aide à comprendre pourquoi l’attestation de foi ne s’arrête pas à son premier membre, et à aimer le Prophète ﷺ par ce qu’il a vécu.",
      "Le livre se lit après le premier volume, ou seul, lorsqu’un parent veut raconter la vie du Messager à un enfant.",
    ],
    image: "/images/livre_sirah.png",
    price: "14,98 €",
    priceValue: "14.98",
    amazonUrl: "https://www.amazon.fr/Mohammed-Messager-dALLAH-accessible-découvrir/dp/B0GDF23MZZ",
  },
  {
    id: "invocation",
    title: "Carnet d’invocation",
    subtitle: "Arabe, phonétique et traduction française",
    lead: "Un carnet pour apprendre et revoir les invocations du quotidien, avec un tableau de suivi.",
    more: [
      "Le carnet d’invocation est un support d’apprentissage. Chaque invocation est donnée en arabe, avec une transcription phonétique pour celui qui déchiffre encore, et une traduction française pour comprendre ce que l’on dit.",
      "Le tableau de suivi sert à noter ce qui est mémorisé, ce qui est revu, et ce qui reste à reprendre. On l’utilise à la maison, entre deux cours, ou à côté d’un apprentissage du Coran.",
      "Il convient à l’enfant qui commence les invocations de la journée, et à l’adulte qui veut une révision régulière.",
    ],
    image: "/images/livre_invocation.jpg",
    price: "11,99 €",
    priceValue: "11.99",
    amazonUrl: "https://www.amazon.fr/Carnet-dinvocation-Tableau-suivi-dapprentissage/dp/B0G6WRKNFV",
  },
  {
    id: "ramadan",
    title: "Mon Ramadan Planner",
    subtitle: "30 jours de suivi pour les enfants",
    lead: "Un planner pour aider l’enfant à suivre son Ramadan : Coran, prière, dhikr, invocations et bilan de la journée.",
    more: [
      "Mon Ramadan Planner organise le mois jour après jour. L’enfant note les bonnes actions qu’il a pu faire : lecture du Coran, prière, dhikr, dou‘â, et les autres gestes prévus dans le carnet.",
      "Chaque journée laisse une place pour le bilan. L’enfant voit ce qu’il a tenu et ce qu’il reprend le lendemain. Le Ramadan y est présenté comme un mois d’adoration, pas seulement comme l’absence de nourriture.",
      "Le planner se remplit en famille. Il donne un cadre pendant les trente jours, sans remplacer l’explication d’un parent ou d’un enseignant.",
    ],
    image: "/images/livre_ramadan.png",
    price: "14,98 €",
    priceValue: "14.98",
    amazonUrl: "https://www.amazon.fr/s?k=rachida+reziga+ramadan",
  },
  {
    id: "cles-coran",
    title: "Les Clés du Coran",
    subtitle: "Règles du Tajwid, symboles du Moushaf et poème en français",
    lead: "Le volume des règles du Tajwid : symboles du Moushaf, application sur des sourates, et un poème en français pour retenir les règles.",
    more: [
      "Les Clés du Coran sont l’adaptation francophone de la méthode Nour Al Bayan. C’est le support des cours de Tajwid de l’Institut ISHES. Ce volume travaille les règles essentielles, après les bases de lecture : alphabet, voyelles et tahajjî.",
      "On y reconnaît les symboles du Moushaf, on applique les règles sur des passages, et le poème didactique aide à les mémoriser en français. Le livre montre la règle. La voix d’un enseignant corrige la lecture.",
      "Il accompagne le cours de Tajwid standard, sur deux années, comme le Tajwid intensif, condensé en trois mois.",
    ],
    image: "/images/livre-ishes.png",
    price: "15,81 €",
    priceValue: "15.81",
    amazonUrl: "https://www.amazon.fr/dp/B0HKNDMYJM/",
  },
];

export function boutiqueBookDescription(book: BoutiqueBook): string {
  return [book.lead, ...book.more].join(" ");
}
