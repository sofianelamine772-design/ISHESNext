import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import {
  FichePratiqueShell,
  FicheSection,
  FicheCallout,
} from "@/components/vitrine/FichePratiqueShell";
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  articleJsonLd,
} from "@/lib/seo";

const FAQS = [
  {
    question: "Quand a commencé la Révélation du Coran ?",
    answer:
      "Selon la tradition musulmane, vers 610 de notre ère, traditionnellement associée à la grotte de Hirâ’ et aux premiers versets de la sourate Al-‘Alaq.",
  },
  {
    question: "Quelle est la différence entre période mecquoise et médinoise ?",
    answer:
      "Dans la classification traditionnelle, mecquoise = avant l'Hégire (622), médinoise = après. Ce repère aide à comprendre l'évolution du contexte et des thématiques, indépendamment du lieu exact de révélation.",
  },
  {
    question: "Quand le Coran a-t-il été collecté sous forme de codex ?",
    answer:
      "Selon les récits traditionnels : collecte sous le califat d'Abû Bakr (632–634), puis établissement et diffusion de codex de référence sous ‘Uthmân (644–656).",
  },
  {
    question: "Quand sont apparus les signes de vocalisation de l'arabe ?",
    answer:
      "Progressivement après ‘Uthmân : aides à la vocalisation attribuées notamment à Abû al-Aswad ad-Du’alî, points distinctifs des consonnes, puis signes proches de ceux d'aujourd'hui avec Al-Khalîl ibn Ahmad (VIIIe siècle).",
  },
  {
    question: "Qui a présenté les sept lectures (qirâ'ât) ?",
    answer:
      "Ibn Mujâhid (mort en 936) est connu pour sa présentation des sept lectures dans le développement des ouvrages sur les qirâ'ât aux IXe–Xe siècles.",
  },
];

const TOC = [
  { id: "revelation", label: "Révélation & premiers codex" },
  { id: "ecriture", label: "Après ‘Uthmân : l'écriture" },
  { id: "apprentissage", label: "Apprentissage guidé" },
];

const REVELATION_ROWS = [
  {
    periode: "Vers 610",
    evenement: "Premiers versets révélés",
    change:
      "Début de la mission du Prophète Muhammad ﷺ, traditionnellement associé à la grotte de Hirâ’ et à la sourate Al-‘Alaq.",
  },
  {
    periode: "610–622",
    evenement: "Période mecquoise",
    change: "Appel à la foi, à la responsabilité morale et à la patience.",
  },
  {
    periode: "622",
    evenement: "Hégire vers Médine",
    change:
      "Repère pour distinguer, dans la classification traditionnelle, révélations mecquoises et médinoises.",
  },
  {
    periode: "622–632",
    evenement: "Période médinoise",
    change:
      "Enseignements spirituels, sociaux et juridiques dans une communauté en formation.",
  },
  {
    periode: "632",
    evenement: "Décès du Prophète Muhammad ﷺ",
    change: "Fin de la Révélation selon la foi musulmane.",
  },
  {
    periode: "632–634",
    evenement: "Califat d’Abû Bakr",
    change:
      "Collecte du texte selon les récits traditionnels, dans le contexte de la préservation de la récitation.",
  },
  {
    periode: "644–656",
    evenement: "Califat de ‘Uthmân",
    change:
      "Établissement et diffusion de codex de référence ; importance du rasm consonantique.",
  },
];

const ECRITURE_ROWS = [
  {
    periode: "VIIe siècle",
    evenement: "Premières aides à la vocalisation",
    change:
      "Tradition attribuée à Abû al-Aswad ad-Du’alî : système ancien de points pour certaines voyelles (attribution discutée).",
  },
  {
    periode: "Fin VIIe – début VIIIe",
    evenement: "Points distinctifs des consonnes",
    change:
      "Différenciation graphique des lettres de même forme ; traditions citent Nasr ibn ‘Âsim et Yahyâ ibn Ya‘mar.",
  },
  {
    periode: "Fin VIIe – début VIIIe",
    evenement: "Réformes et diffusion",
    change:
      "Sous l’administration omeyyade (notamment al-Hajjâj ibn Yûsuf), développement des pratiques de notation et de copie.",
  },
  {
    periode: "VIIIe siècle",
    evenement: "Al-Khalîl ibn Ahmad",
    change:
      "Signes vocaliques proches de ceux d’aujourd’hui ; apport à la linguistique et à la prosodie.",
  },
  {
    periode: "VIIIe siècle",
    evenement: "Sîbawayh et la grammaire",
    change:
      "Formalisation progressive des règles grammaticales ; l’étude du Coran est un moteur important.",
  },
  {
    periode: "IXe–Xe siècles",
    evenement: "Sciences des lectures",
    change:
      "Développement des ouvrages sur les qirâ’ât ; Ibn Mujâhid (m. 936) et les sept lectures.",
  },
];

function TimelineTable({
  rows,
  caption,
}: {
  rows: typeof REVELATION_ROWS;
  caption: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e6d5b8]/50 shadow-sm">
      <table className="w-full text-left text-sm min-w-[640px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-ishes-blue text-white">
          <tr>
            <th scope="col" className="px-4 py-3.5 font-black w-[22%]">
              Période
            </th>
            <th scope="col" className="px-4 py-3.5 font-black w-[28%]">
              Événement
            </th>
            <th scope="col" className="px-4 py-3.5 font-black">
              Ce qui change
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row) => (
            <tr
              key={`${row.periode}-${row.evenement}`}
              className="hover:bg-[#faf8f4] align-top"
            >
              <th
                scope="row"
                className="px-4 py-4 font-black text-ishes-gold whitespace-nowrap text-left"
              >
                {row.periode}
              </th>
              <td className="px-4 py-4 font-black text-ishes-blue">{row.evenement}</td>
              <td className="px-4 py-4 text-gray-600 font-medium leading-relaxed">
                {row.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const metadata = buildPageMetadata({
  title: "Frise chronologique de la Révélation du Coran (610–Xe s.)",
  description:
    "Frise gratuite : Révélation (610), Hégire, collecte Abû Bakr & ‘Uthmân, vocalisation de l'arabe, qirâ'ât d'Ibn Mujâhid. Chronologie pédagogique ISHES pour comprendre la transmission du Coran.",
  path: "/fr/cours-sciences-coran/frise-chronologique",
  keywords: [
    "frise chronologique coran",
    "histoire révélation islam",
    "chronologie coran 610",
    "califat uthman coran",
    "abu bakr collecte coran",
    "vocalisation arabe coran",
    "qiraat ibn mujahid",
    "période mecquoise médinoise",
    "transmission coran chronologie",
  ],
  type: "article",
  image: "/images/formations/sc-du-coran-distance-2.jpg",
});

export default function FriseChronologiquePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Sciences du Coran", path: "/fr/cours-sciences-coran" },
          {
            name: "Frise chronologique",
            path: "/fr/cours-sciences-coran/frise-chronologique",
          },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "De la Révélation à la codification de l'arabe — Frise chronologique",
          description:
            "Frise pour comprendre la transmission du Coran et l'évolution de son écriture, de 610 aux IXe–Xe siècles.",
          path: "/fr/cours-sciences-coran/frise-chronologique",
          image: "/images/formations/sc-du-coran-distance-2.jpg",
          keywords: [
            "Frise chronologique",
            "Révélation",
            "Uthman",
            "Qiraat",
          ],
          wordCount: 1200,
          about: ["Histoire du Coran", "Révélation", "Langue arabe"],
        })}
      />

      <FichePratiqueShell
        eyebrow="Fiche pratique · Chronologie"
        title={
          <>
            De la Révélation à la{" "}
            <span className="text-ishes-gold">codification de l&apos;arabe</span>
          </>
        }
        lead="Une frise pour comprendre la transmission du Coran et l'évolution de son écriture — des premières révélations aux siècles suivant le califat de ‘Uthmân."
        backHref="/fr/cours-sciences-coran"
        backLabel="Cours Sciences du Coran"
        pdfHref="/fiches-pratiques/frise-chronologique-revelation.pdf"
        primaryCta={{
          href: "/inscription?plan=sciences_du_coran&audience=adulte",
          label: "Étudier en cours",
        }}
        secondaryCta={{
          href: "/fr/cours-sciences-coran/guide",
          label: "Guide complet",
        }}
        toc={TOC}
        readingTime="7 min de lecture"
        related={[
          {
            href: "/fr/cours-sciences-coran/guide",
            title: "Guide Sciences du Coran",
            desc: "Révélation, manuscrits, disciplines et i‘jâz.",
          },
          {
            href: "/fr/cours-sciences-coran",
            title: "Formation 4 mois",
            desc: "Cursus en ligne diplômant — 399 €.",
          },
          {
            href: "/fr/cours-as-sirah",
            title: "Cours de Sîrah",
            desc: "La vie du Prophète ﷺ éclaire la chronologie.",
          },
          {
            href: "/fr/fiches-pratiques",
            title: "Toutes les fiches",
            desc: "Tajwid, Clés du Coran et plus.",
          },
        ]}
      >
        <FicheSection id="revelation" title="1. La Révélation et les premiers codex">
          <p>
            Cette première partie situe les grandes étapes : début de la Révélation, périodes
            mecquoise et médinoise, Hégire, fin de la Révélation, puis collecte et diffusion des
            codex selon la tradition musulmane.
          </p>
          <TimelineTable
            rows={REVELATION_ROWS}
            caption="Chronologie de la Révélation et des premiers codex"
          />
        </FicheSection>

        <FicheSection id="ecriture" title="2. Après ‘Uthmân : rendre l'écriture plus lisible">
          <p>
            Les premiers manuscrits emploient une écriture dont les signes distinctifs et
            vocaliques ne sont pas toujours systématiques. Avec l&apos;expansion de la communauté,
            l&apos;apprentissage par des populations de langues différentes favorise des
            conventions graphiques plus explicites.
          </p>
          <TimelineTable
            rows={ECRITURE_ROWS}
            caption="Évolution de l'écriture arabe après ‘Uthmân"
          />
        </FicheSection>

        <FicheSection id="apprentissage" title="3. Un apprentissage guidé">
          <p>
            Ces points sont contextualisés en cours pour comprendre leur évolution historique et
            leur lien avec la transmission du Coran. Les périodes indiquées sont approximatives.
          </p>
          <FicheCallout>
            La langue et l&apos;écriture arabes existaient avant l&apos;islam ; la transmission et
            l&apos;étude du Coran ont fortement contribué à leur codification.
          </FicheCallout>
          <p>
            Pour le détail des disciplines et des manuscrits, consultez le{" "}
            <Link
              href="/fr/cours-sciences-coran/guide"
              className="text-ishes-gold font-bold hover:underline"
            >
              guide complet des Sciences du Coran
            </Link>
            , ou rejoignez la{" "}
            <Link
              href="/fr/cours-sciences-coran"
              className="text-ishes-gold font-bold hover:underline"
            >
              formation ISHES
            </Link>
            .
          </p>
        </FicheSection>
      </FichePratiqueShell>

      <VitrineFaq
        eyebrow="FAQ Frise"
        title="Questions sur la chronologie de la Révélation"
        items={FAQS}
      />
    </>
  );
}
