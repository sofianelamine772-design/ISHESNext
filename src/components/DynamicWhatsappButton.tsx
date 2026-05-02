"use client";

import dynamic from "next/dynamic";

// On déporte le chargement dynamique ici pour éviter l'erreur de build
export const DynamicWhatsappButton = dynamic(
  () => import("@/components/WhatsappButton").then(mod => mod.WhatsappButton),
  { ssr: false }
);
