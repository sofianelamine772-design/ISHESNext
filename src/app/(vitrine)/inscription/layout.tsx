import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Inscription aux Formations | Institut ISHES",
  description:
    "Inscrivez-vous aux formations de l'Institut ISHES : arabe, Tajwid, Fiqh et sciences islamiques. Présentiel à Toulouse ou cours à distance.",
  path: "/inscription",
  keywords: [
    "inscription ishes",
    "inscription cours arabe",
    "inscription tajwid",
    "inscription fiqh malikite",
  ],
});

export default function InscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
