export const dynamic = 'force-static';

import type { Metadata } from "next";
import HomePage from "../(vitrine)/page";
import { buildPageMetadata } from "@/lib/seo";

// Miroir de l'accueil : canonical unique vers / pour éviter le contenu dupliqué.
export const metadata: Metadata = buildPageMetadata({
  title: "Institut ISHES — Cours d'Arabe, Tajwid & Sciences Islamiques",
  description:
    "Institut des Sciences Humaines et Spirituelles à Toulouse et en ligne. Cours d'arabe, Tajwid, Fiqh mâlikite et sciences islamiques pour adultes et enfants.",
  path: "/",
  keywords: [
    "institut ishes",
    "cours arabe toulouse",
    "cours tajwid",
    "fiqh malikite",
    "sciences islamiques toulouse",
  ],
});

export default function FrHomePage() {
  return <HomePage />;
}
