"use client";

import { usePathname } from "next/navigation";
import { ContactGratuitCta } from "@/components/vitrine/ContactGratuitCta";

const HIDDEN = new Set(["/contact", "/fr/contact", "/fr/rendez-vous", "/cgv", "/mentions-legales", "/politique-de-confidentialite"]);

export function ContactGratuitCtaGate() {
  const pathname = usePathname() || "";
  if (HIDDEN.has(pathname)) return null;
  return <ContactGratuitCta />;
}
