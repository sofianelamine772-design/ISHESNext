"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function BoutiqueFaq() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: "Quels sont les délais de livraison pour les supports physiques ?",
      a: "Les commandes sont expédiées sous 48h ouvrées. La livraison à domicile (Colissimo) ou en point relais prend généralement 3 à 5 jours ouvrés en France métropolitaine."
    },
    {
      q: "Les manuels achetés sont-ils fournis avec une version numérique ?",
      a: "Oui ! Pour chaque manuel physique acheté sur notre boutique, vous bénéficiez instantanément d'un accès à sa version PDF interactive et aux ressources audio associées directement depuis votre espace élève."
    },
    {
      q: "Puis-je commander depuis l'étranger ou les DOM-TOM ?",
      a: "Tout à fait. Nous livrons dans le monde entier (Europe, Maghreb, Amérique du Nord, DOM-TOM). Les frais de livraison sont calculés automatiquement lors de l'étape de validation de votre panier."
    },
    {
      q: "Les supports sont-ils adaptés à l'apprentissage en autonomie ?",
      a: "Oui. Nos éditions comme 'Les Clés du Coran' ou nos manuels de grammaire ont été conçus spécifiquement pour les francophones avec des repères colorés et des explications simplifiées pour faciliter l'étude en autonomie."
    },
    {
      q: "Puis-je effectuer un retour si l'article ne me convient pas ?",
      a: "Vous disposez d'un délai légal de 14 jours après réception de votre colis pour nous renvoyer l'article dans son emballage d'origine et non utilisé afin d'obtenir un remboursement intégral."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#008953] font-black uppercase tracking-[0.25em] text-xs mb-4 block">Aide & Support</span>
          <h2 className="text-4xl md:text-5xl font-black text-ishes-dark leading-none tracking-tight uppercase">
            Questions sur la <span className="text-[#008953] italic">boutique.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 bg-[#fafafa]"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-black text-ishes-dark text-lg hover:text-[#008953] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronRight 
                    className={`w-5 h-5 text-[#008953] transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
                  />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-gray-100/50 p-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  } bg-white text-gray-500 font-medium leading-relaxed text-sm whitespace-pre-line`}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
