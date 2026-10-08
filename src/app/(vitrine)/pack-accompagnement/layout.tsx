import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/seo";
import { PACK_ACCOMPAGNEMENT_METADATA } from "@/lib/pack-accompagnement-seo";

export const metadata = buildPageMetadata({
  ...PACK_ACCOMPAGNEMENT_METADATA,
  path: "/pack-accompagnement",
  image: "/images/pack-hero.png",
});

export default function PackAccompagnementLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
