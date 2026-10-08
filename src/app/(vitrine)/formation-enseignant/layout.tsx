import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Devenir enseignant de Tajwid et Tarbiya Islamiyya | Formation ISHES",
  description:
    "Devenez enseignant certifié de Tajwid ou de Tarbiya Islamiyya. Formation pédagogique à distance : enseigner le Coran, gérer une classe, transmettre l'islam aux enfants. Devis et entretien gratuit.",
  path: "/formation-enseignant",
  keywords: [
    "devenir enseignant tajwid",
    "devenir professeur de coran",
    "formation enseignant islam",
    "formation enseignant tarbiya",
    "enseigner le tajwid",
    "professeur education islamique",
    "formation nour al bayan",
    "les clés du coran enseignant",
    "certification enseignant coran",
    "formation pedagogie islamique france",
  ],
});

export default function FormationEnseignantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
