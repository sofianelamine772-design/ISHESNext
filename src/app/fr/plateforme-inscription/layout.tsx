import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Plateforme d'Inscription | Institut ISHES",
  description:
    "Accédez à la plateforme d'inscription de l'Institut ISHES pour vos formations en arabe, Tajwid et sciences islamiques.",
  path: "/fr/plateforme-inscription",
  keywords: ["inscription ishes", "plateforme inscription"],
});

export default function PlateformeInscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
