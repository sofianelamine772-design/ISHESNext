type VitrineFaqItem = {
  question: string;
  answer: string;
};

type VitrineFaqProps = {
  title?: string;
  eyebrow?: string;
  /** Petite phrase sous le titre (optionnelle), utile pour placer un mot-clé. */
  intro?: string;
  items: VitrineFaqItem[];
};

/**
 * FAQ en `<details>` natif : 100 % visible pour Google, accessible, sans JS.
 * À coupler avec faqJsonLd() sur la page serveur.
 */
export function VitrineFaq({
  title = "Questions fréquentes",
  eyebrow = "FAQ",
  intro,
  items,
}: VitrineFaqProps) {
  return (
    <section className="py-14 md:py-16 bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-ishes-gold font-black uppercase tracking-[0.25em] text-[11px] mb-3 block">
            {eyebrow}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-ishes-blue leading-tight tracking-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-3 text-sm md:text-[15px] text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
              {intro}
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border border-[#e6d5b8]/50 rounded-xl overflow-hidden bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-4 py-3.5 md:px-5 md:py-4 font-bold text-ishes-dark text-[15px] md:text-base leading-snug hover:text-ishes-gold transition-colors [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="text-ishes-gold text-xl leading-none group-open:rotate-45 transition-transform shrink-0">
                  +
                </span>
              </summary>
              <div className="px-4 md:px-5 pb-5 pt-3 text-gray-600 font-medium leading-relaxed text-sm border-t border-[#e6d5b8]/40">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { VitrineFaqItem };
