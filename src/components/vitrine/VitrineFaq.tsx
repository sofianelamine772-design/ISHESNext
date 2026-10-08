type VitrineFaqItem = {
  question: string;
  answer: string;
};

type VitrineFaqProps = {
  title?: string;
  eyebrow?: string;
  items: VitrineFaqItem[];
};

/**
 * FAQ en `<details>` natif : 100 % visible pour Google, accessible, sans JS.
 * À coupler avec faqJsonLd() sur la page serveur.
 */
export function VitrineFaq({
  title = "Questions fréquentes",
  eyebrow = "FAQ",
  items,
}: VitrineFaqProps) {
  return (
    <section className="py-20 md:py-24 bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-4 block">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight tracking-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border border-[#e6d5b8]/50 rounded-2xl overflow-hidden bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 md:p-6 font-black text-ishes-dark text-base md:text-lg hover:text-ishes-gold transition-colors [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="text-ishes-gold text-xl leading-none group-open:rotate-45 transition-transform shrink-0">
                  +
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-6 text-gray-600 font-medium leading-relaxed text-sm border-t border-[#e6d5b8]/40 pt-4">
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
