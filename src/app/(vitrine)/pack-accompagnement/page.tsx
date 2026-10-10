import Link from "next/link";
import { PackAccompagnementContent } from "@/components/vitrine/PackAccompagnementContent";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  courseJsonLd,
  faqJsonLd,
  howToJsonLd,
} from "@/lib/seo";
import { PACK_FAQS } from "@/lib/pack-accompagnement-seo";

export default function PackAccompagnementPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Pack Accompagnement", path: "/pack-accompagnement" },
        ])}
      />
      <JsonLd
        data={courseJsonLd({
          name: "Pack Accompagnement ISHES — institut de sciences religieuses en ligne",
          description:
            "Accompagnement annuel d'un institut de science religieuse en ligne : communauté, lives et spiritualité pour réussir arabe, Tajwid et sciences islamiques.",
          path: "/pack-accompagnement",
          price: "49",
          courseMode: "Online",
          image: "/images/pack-hero.png",
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline:
            "Meilleurs instituts de science religieuse en ligne : le Pack Accompagnement ISHES",
          description:
            "Comment choisir un institut de sciences religieuses en ligne en français, et ce que propose ISHES à Toulouse et à distance.",
          path: "/pack-accompagnement",
          image: "/images/pack-hero.png",
          keywords: [
            "meilleurs instituts de science religieuse en ligne",
            "institut de sciences religieuses en ligne",
            "apprendre la religion en ligne",
            "institut islamique en ligne",
            "pack accompagnement ishes",
          ],
          about: [
            "Sciences religieuses en ligne",
            "Apprendre l'islam en ligne",
            "Institut ISHES",
            "Cours de religion musulmane",
          ],
        })}
      />
      <JsonLd data={faqJsonLd(PACK_FAQS)} />
      <JsonLd
        data={howToJsonLd({
          name: "Comment rejoindre un institut de science religieuse en ligne (ISHES)",
          description:
            "Étapes pour s'inscrire dans un institut de sciences religieuses en français, à distance, avec un vrai suivi.",
          path: "/pack-accompagnement",
          steps: [
            {
              name: "Choisir sa formation",
              text: "Arabe, Tajwid, Fiqh mâlikite, sciences islamiques : catalogue ISHES, présentiel Toulouse ou distanciel.",
            },
            {
              name: "S'inscrire en ligne",
              text: "Inscription et paiement sécurisés. Un conseiller WhatsApp peut orienter le niveau.",
            },
            {
              name: "Activer le Pack Accompagnement",
              text: "49 €/an : groupe privé, lives, module de spiritualité, questions aux fondateurs.",
            },
            {
              name: "Cheminer toute l'année",
              text: "Cours en direct, replays, communauté et rappels pour ancrer la pratique.",
            },
          ],
        })}
      />

      <PackAccompagnementContent />

      <article className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10 text-[15px] leading-relaxed text-gray-700">
          <header className="text-center">
            <p className="text-ishes-gold font-black uppercase tracking-[0.25em] text-xs mb-3">
              Sciences religieuses · en ligne
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-ishes-blue leading-tight">
              Meilleurs instituts de science religieuse en ligne : comment choisir
            </h2>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Un institut de sciences religieuses, pas une chaîne sans suivi
            </h3>
            <p>
              Ceux qui cherchent les <strong>meilleurs instituts de science religieuse en ligne</strong>{" "}
              comparent souvent le prix des replays. Un vrai{" "}
              <strong>institut de sciences religieuses en ligne</strong> se juge autrement : enseignants
              nommés, programme (arabe, Coran, Fiqh, Aqîda), cours en direct, communauté, et un lieu physique.
              L&apos;<strong>Institut ISHES</strong> (Institut des Sciences Humaines et Spirituelles) forme
              adultes et enfants à Toulouse et à distance — Tajwid, Fiqh mâlikite, sciences islamiques — avec
              le Pack Accompagnement pour ne pas apprendre seul.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">
              Le Pack Accompagnement : ce qui fait d&apos;ISHES un institut, pas un replay
            </h3>
            <p>
              Une heure de cours par semaine ne suffit pas. Le Pack (49 €/an) donne une communauté privée,
              des lives avec les fondateurs, un module de spiritualité et des rappels. C&apos;est le cadre pour{" "}
              <strong>apprendre l&apos;islam en ligne</strong> sans rester isolé — y compris pour les parents qui
              inscrivent un enfant.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black text-ishes-dark">Par où commencer ?</h3>
            <p>
              Parcourez le{" "}
              <Link href="/program" className="text-ishes-blue font-bold hover:underline">
                catalogue des formations
              </Link>
              , les{" "}
              <Link href="/fr/cours-a-distance" className="text-ishes-blue font-bold hover:underline">
                cours à distance
              </Link>
              , le{" "}
              <Link href="/fr/cours-fiqh-malikite" className="text-ishes-blue font-bold hover:underline">
                Fiqh mâlikite
              </Link>{" "}
              ou le{" "}
              <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold hover:underline">
                Tajwid
              </Link>
              . Une question ?{" "}
              <Link href="/fr/contact" className="text-ishes-blue font-bold hover:underline">
                Contact WhatsApp gratuit
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <VitrineFaq
        eyebrow="FAQ — Institut de science religieuse en ligne"
        title="ISHES, sciences religieuses à distance et Pack Accompagnement"
        items={PACK_FAQS}
      />
    </>
  );
}
