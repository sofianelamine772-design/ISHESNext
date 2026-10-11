"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BOUTIQUE_BOOKS } from "@/lib/boutique-catalog";

export function BoutiqueProducts() {
  return (
    <section className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {BOUTIQUE_BOOKS.map((product, idx) => (
            <motion.article
              key={product.id}
              id={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="flex flex-col sm:flex-row gap-6 items-stretch bg-white p-5 sm:p-6 rounded-3xl border border-[#e4dccb] shadow-sm scroll-mt-28"
            >
              <div className="w-full sm:w-44 shrink-0">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#f6f1e8] border border-[#eadfcb]">
                  <Image
                    src={product.image}
                    alt={`${product.title} — ${product.subtitle}`}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 80vw, 180px"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <h2 className="text-xl sm:text-2xl font-black text-[#101828] leading-tight">
                  {product.title}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6e5730]">
                  {product.subtitle}
                </p>
                <p className="mt-4 text-sm text-[#344054] leading-relaxed">
                  {product.lead}
                </p>
                <details className="group mt-3">
                  <summary className="cursor-pointer list-none inline-flex items-center text-sm font-bold text-ishes-blue [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Lire plus</span>
                    <span className="hidden group-open:inline">Réduire</span>
                  </summary>
                  <div className="mt-3 space-y-3 text-sm text-[#344054] leading-relaxed">
                    {product.more.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-5">
                  <span className="text-xl font-black text-ishes-blue whitespace-nowrap">
                    {product.price}
                  </span>
                  <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="ishes-dark-gold" className="w-full sm:w-auto h-11 px-5 gap-2 text-xs shadow-none">
                      Acheter en ligne <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
