import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Cours d'islam à distance | Sciences religieuses en ligne ISHES",
  description:
    "Institut de sciences religieuses en ligne : arabe, Tajwid, Fiqh mâlikite. Cours en direct, replays et suivi — ISHES, parmi les instituts de science religieuse en français.",
  path: "/fr/cours-a-distance",
  keywords: [
    "cours islam à distance",
    "sciences religieuses en ligne",
    "institut de science religieuse en ligne",
    "meilleurs instituts de science religieuse en ligne",
    "cours arabe en ligne",
    "tajwid en ligne",
    "fiqh malikite distance",
    "institut ishes",
  ],
});

export default function CoursADistanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
