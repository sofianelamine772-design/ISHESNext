"use client";

import dynamic from "next/dynamic";

// On déporte le chargement dynamique ici pour éviter l'erreur dans le Server Component
export const DynamicTestimonials = dynamic(
  () => import("@/components/vitrine/TestimonialsMarquee").then(mod => mod.TestimonialsMarquee),
  { ssr: true }
);
