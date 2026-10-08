import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Notre Histoire | Institut ISHES Toulouse",
  description:
    "Découvrez l'histoire de l'Institut ISHES : plus de 16 ans d'enseignement de l'arabe, du Coran et des sciences islamiques à Toulouse et en ligne, fondé par Oustadh Riad et Oustadha Rachida.",
  path: "/notre-histoire",
  keywords: [
    "histoire institut ishes",
    "oustadh riad",
    "oustadha rachida",
    "institut arabe toulouse",
  ],
});

export default function NotreHistoireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
