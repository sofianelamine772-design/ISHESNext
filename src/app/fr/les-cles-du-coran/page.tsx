import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
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
  howToJsonLd,
} from "@/lib/seo";

const FAQS = [
  {
    question: "Qu'est-ce que Les Clés du Coran ?",
    answer:
      "Les Clés du Coran est le manuel exclusif de l'Institut ISHES pour apprendre à lire le Coran et le Tajwid en français. En deux volumes, il conduit l'élève des fondations de la lecture (alphabet, tahajjî) à l'étude structurée des règles de récitation, avec une progression inspirée de Nour Al Bayan.",
  },
  {
    question: "Les Clés du Coran ou Nour Al Bayan : quelle différence ?",
    answer:
      "Les Clés du Coran s'inspire de la progression Nour Al Bayan tout en étant conçu pour les francophones : explications en français, exemples adaptés, et un poème didactique de Tajwid rédigé directement en français — pas une simple traduction d'un matn arabe.",
  },
  {
    question: "Que contient le Volume 1 des Clés du Coran ?",
    answer:
      "Le Volume 1 pose les fondations : lettres de l'alphabet, fatha, kasra, damma, tahajjî des phrases, prolongements (alif, yâ, wâw), tanwin, soukoun, chaddah et combinaisons, arrêts et exemples coraniques. Objectif : comprendre ce qui est écrit avant d'automatiser.",
  },
  {
    question: "Que contient le Volume 2 des Clés du Coran ?",
    answer:
      "Le Volume 2 traite l'adab, isti'âdha et basmalah, hamzat wasl, noun sâkina et tanwin, mim sâkina, lâm ta'rîf, moudoud, idgham, nom d'ALLAH et Râ, waqf et ibtidâ, makhârij, sifât, erreurs de récitation, repères du Moushaf, plus le poème Les Clés du Coran.",
  },
  {
    question: "Qu'est-ce que le tahajjî dans Les Clés du Coran ?",
    answer:
      "Le tahajjî consiste à décomposer la lecture : identifier la lettre, sa voyelle ou son signe, puis reconstruire le mot. Cette méthode évite de deviner et crée des automatismes plus sûrs — c'est la particularité pédagogique centrale du Volume 1.",
  },
  {
    question: "Le livre Les Clés du Coran suffit-il sans professeur ?",
    answer:
      "Non. Un support écrit structure et explique, mais le Tajwid se transmet aussi par l'écoute et la correction orale. À ISHES, le manuel accompagne le cours en direct : l'enseignant explique, écoute, corrige et guide.",
  },
  {
    question: "Où apprendre Les Clés du Coran avec un enseignant ?",
    answer:
      "À l'Institut ISHES : cours de Tajwid en ligne (parcours annuel 649 €), Tajwid intensif (3 mois), présentiel à Toulouse, et formation enseignant Tajwid. La fiche pratique présente la méthode ; le cursus apporte la transmission.",
  },
];

const TOC = [
  { id: "pourquoi", label: "Pourquoi cet ouvrage ?" },
  { id: "volume-1", label: "Volume 1 — fondations" },
  { id: "tahajji", label: "Le tahajjî" },
  { id: "volume-2", label: "Volume 2 — Tajwid" },
  { id: "poeme", label: "Le poème didactique" },
  { id: "enseignant", label: "Support + enseignant" },
  { id: "origine", label: "Origine de l'ouvrage" },
];

const VOL2_CHAPTERS: [string, string][] = [
  ["Adab", "Comportement, vénération, écoute et disposition intérieure"],
  ["Isti'âdha & Basmalah", "Demande de protection et règles de liaison"],
  ["Hamzat Wasl", "Lecture de la hamza de liaison"],
  ["Noun sâkina & Tanwin", "Idhâr, idgham, iqlâb et ikhfâ"],
  ["Mim / Noun mouchedded", "Ghounna et renforcement"],
  ["Mim sâkina", "Ikhfâ, idgham et idhâr"],
  ["Lâm ta'rîf", "Lettres solaires et lunaires"],
  ["Moudoud", "Les différents prolongements et leurs durées"],
  ["Idgham", "Les règles de fusion"],
  ["Nom d'ALLAH & Râ", "Lecture épaisse ou fine selon les situations"],
  ["Waqf & Ibtidâ", "Arrêt et reprise en préservant le sens"],
  ["Makhârij", "Zones de sortie des lettres"],
  ["Sifât", "Caractéristiques des lettres"],
  ["Erreurs de récitation", "Distinguer erreurs majeures et mineures"],
  ["Repères du Moushaf", "Comprendre les principaux repères du Coran"],
];

export const metadata = buildPageMetadata({
  title: "Les Clés du Coran : méthode Tajwid francophone (Vol. 1 & 2)",
  description:
    "Guide complet Les Clés du Coran (ISHES) : Volume 1 lecture & tahajjî, Volume 2 règles du Tajwid, poème didactique en français. Alternative francophone à Nour Al Bayan pour apprendre à lire le Coran.",
  path: "/fr/les-cles-du-coran",
  keywords: [
    "les clés du coran",
    "clés du coran pdf",
    "méthode tajwid francophone",
    "nour al bayan français",
    "apprendre à lire le coran français",
    "tahajji coran",
    "règles du tajwid débutant",
    "poème tajwid français",
    "manuel tajwid ishes",
    "volume 1 volume 2 tajwid",
    "makharij sifat tajwid",
    "cours tajwid en ligne",
  ],
  type: "article",
  image: "/images/quran-coffee.png",
});

export default function LesClesDuCoranPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Fiches pratiques", path: "/fr/fiches-pratiques" },
          { name: "Les Clés du Coran", path: "/fr/les-cles-du-coran" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={articleJsonLd({
          headline: "Les Clés du Coran — Volume 1 & Volume 2 : guide complet de la méthode",
          description:
            "Méthode francophone ISHES pour apprendre à lire le Coran et le Tajwid : fondations, tahajjî, règles de récitation et poème didactique.",
          path: "/fr/les-cles-du-coran",
          image: "/images/quran-coffee.png",
          authorName: "Riad Latreche",
          keywords: [
            "Les Clés du Coran",
            "Tajwid",
            "Nour Al Bayan",
            "tahajjî",
            "lecture du Coran",
          ],
          wordCount: 2200,
          about: ["Tajwid", "Lecture du Coran", "Pédagogie islamique francophone"],
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "Comment lire avec le tahajjî (méthode Les Clés du Coran)",
          description:
            "Décomposer puis reconstruire la lecture pour ne plus deviner les mots du Coran.",
          path: "/fr/les-cles-du-coran",
          steps: [
            {
              name: "Identifier la lettre",
              text: "Repère chaque lettre arabe du mot dans le Moushaf.",
            },
            {
              name: "Lire la voyelle ou le signe",
              text: "Note fatha, kasra, damma, soukoun, tanwin ou chaddah associés.",
            },
            {
              name: "Assembler progressivement",
              text: "Reconstruis le mot syllabe par syllabe avant de fluidifier la lecture.",
            },
            {
              name: "Passer aux règles du Volume 2",
              text: "Une fois la lecture solide, applique noun sâkina, moudoud, makhârij et waqf.",
            },
          ],
        })}
      />

      <FichePratiqueShell
        eyebrow="Fiche pratique · Méthode Tajwid"
        title={
          <>
            Les Clés du Coran
            <span className="block text-ishes-gold mt-2">Volume 1 &amp; Volume 2</span>
          </>
        }
        lead="La méthode francophone de l'Institut ISHES pour conduire l'élève des fondations de la lecture à l'étude structurée du Tajwid — inspirée de Nour Al Bayan, conçue pour comprendre, mémoriser et pratiquer."
        backHref="/fr/cours-lecture-tajwid"
        backLabel="Cours de Tajwid"
        pdfHref="/fiches-pratiques/les-cles-du-coran.pdf"
        primaryCta={{
          href: "/inscription?plan=tajwid_standard&audience=adulte",
          label: "Suivre le cursus Tajwid",
        }}
        secondaryCta={{
          href: "/fr/cours-lecture-tajwid",
          label: "Voir le programme",
        }}
        toc={TOC}
        readingTime="12 min de lecture"
        related={[
          {
            href: "/fr/cours-lecture-tajwid",
            title: "Cours de Tajwid en ligne",
            desc: "Parcours annuel avec Les Clés du Coran Vol. 1 & 2 — 649 €.",
          },
          {
            href: "/fr/cours-tajwid-intensif",
            title: "Tajwid intensif (3 mois)",
            desc: "Parcours accéléré avec la même méthode exclusive.",
          },
          {
            href: "/fr/formation-enseignant-tajwid",
            title: "Formation enseignant Tajwid",
            desc: "Apprendre à enseigner avec Les Clés du Coran.",
          },
          {
            href: "/fr/fiches-pratiques",
            title: "Toutes les fiches pratiques",
            desc: "Sciences du Coran, frise chronologique et plus.",
          },
        ]}
        asideExtra={
          <div className="bg-ishes-blue text-white rounded-2xl p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-ishes-gold mb-2">
              En bref
            </p>
            <ul className="space-y-2 text-sm font-medium text-white/85">
              <li>2 volumes progressifs</li>
              <li>Tahajjî + règles Tajwid</li>
              <li>Poème didactique FR</li>
              <li>Cours ISHES recommandé</li>
            </ul>
          </div>
        }
      >
        <FicheSection id="pourquoi" title="Pourquoi Les Clés du Coran ?">
          <p>
            Beaucoup d&apos;apprenants francophones reconnaissent les lettres arabes sans être à
            l&apos;aise devant une page du <strong>Moushaf</strong>. D&apos;autres récitent depuis
            des années mais restent dans le doute : « Est-ce que je prononce correctement ? Quelle
            règle dois-je appliquer ? »
          </p>
          <p>
            <strong>Les Clés du Coran</strong> a été pensé pour ces besoins : comprendre les
            mécanismes de lecture, disposer d&apos;explications accessibles en{" "}
            <strong>français</strong>, et avancer selon une progression cohérente. La méthode
            s&apos;inspire de <strong>Nour Al Bayan</strong> tout en développant un support adapté
            au public francophone et au cursus de l&apos;
            <Link href="/institut" className="text-ishes-gold font-bold hover:underline">
              Institut ISHES
            </Link>
            .
          </p>
          <FicheCallout>
            Objectif : ne plus accumuler des règles isolées, mais savoir identifier ce que tu vois
            dans le Moushaf et corriger progressivement ta récitation.
          </FicheCallout>
        </FicheSection>

        <FicheSection id="volume-1" title="Volume 1 — construire les fondations de la lecture">
          <p>
            Le premier volume pose les mécanismes nécessaires à la lecture. L&apos;élève apprend à{" "}
            <strong>décomposer puis à lire</strong>, plutôt qu&apos;à deviner.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2.5 !mt-6 list-none pl-0">
            {[
              "Lettres de l'alphabet arabe",
              "Fatha, kasra et damma",
              "Tahajjî des phrases",
              "Prolongements (alif, yâ, wâw)",
              "Tanwin",
              "Soukoun",
              "Chaddah et combinaisons",
              "Chaddah avec madd tabi'î",
              "Arrêt et exemples coraniques",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 bg-[#faf8f4] border border-[#e6d5b8]/40 rounded-xl px-3.5 py-3"
              >
                <CheckCircle2 className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-ishes-dark">{item}</span>
              </li>
            ))}
          </ul>
        </FicheSection>

        <FicheSection id="tahajji" title="Le tahajjî : comprendre avant d'automatiser">
          <p>
            Le <strong>tahajjî</strong> est la particularité pédagogique centrale de la méthode.
            Il apprend à décomposer les éléments d&apos;un mot avant de les assembler : lettre,
            voyelle ou signe, puis reconstruction progressive.
          </p>
          <p>
            Cette façon de travailler évite de « deviner » la lecture et permet à l&apos;élève de
            comprendre <em>pourquoi</em> il prononce de telle manière — base indispensable avant
            d&apos;aborder les règles du Tajwid du Volume 2.
          </p>
          <FicheCallout variant="blue">
            Comment lire avec le tahajjî : 1) identifier la lettre · 2) lire la voyelle ou le signe
            · 3) assembler progressivement · 4) fluidifier, puis passer aux règles du Volume 2.
          </FicheCallout>
        </FicheSection>

        <FicheSection id="volume-2" title="Volume 2 — comprendre et appliquer le Tajwid">
          <p>
            Le deuxième volume fait entrer l&apos;élève dans l&apos;étude structurée des{" "}
            <strong>règles de récitation</strong> : de l&apos;adab jusqu&apos;aux makhârij, sifât
            et identification des erreurs.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#e6d5b8]/50 !mt-6">
            <table className="w-full text-left text-sm min-w-[520px]">
              <caption className="sr-only">
                Chapitres du Volume 2 des Clés du Coran et travail réalisé
              </caption>
              <thead className="bg-ishes-blue text-white">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-black">
                    Chapitre
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-black">
                    Travail réalisé
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {VOL2_CHAPTERS.map(([ch, work]) => (
                  <tr key={ch} className="hover:bg-[#faf8f4]">
                    <th scope="row" className="px-4 py-3 font-black text-ishes-blue whitespace-nowrap text-left">
                      {ch}
                    </th>
                    <td className="px-4 py-3 text-gray-600 font-medium">{work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FicheSection>

        <FicheSection id="poeme" title="Le poème didactique « Les Clés du Coran »">
          <div className="flex items-start gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-ishes-gold shrink-0 mt-1" />
            <p>
              Dans la tradition des sciences islamiques, la transmission s&apos;est souvent appuyée
              sur des <strong>textes versifiés</strong>. Le Volume 2 contient ainsi le poème « Les
              Clés du Coran », qui reprend les grandes règles sous une forme mémorisable pour
              francophones.
            </p>
          </div>
          <p>
            À notre connaissance, il s&apos;agit du{" "}
            <strong>
              premier poème didactique de Tajwid conçu sous cette forme directement en langue
              française
            </strong>
            , et non d&apos;une simple traduction d&apos;un matn arabe.
          </p>
          <FicheCallout>
            Une science comprise. Des règles mémorisées. Une récitation mise en pratique.
          </FicheCallout>
          <p>Pourquoi mémoriser les règles en vers ?</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Structure mémorisable d&apos;un ensemble de règles autrement dispersé</li>
            <li>Récitation répétée → ancrage à long terme</li>
            <li>Repère mental : retrouver le vers qui résume une règle</li>
            <li>Lien avec la pédagogie classique des sciences islamiques</li>
            <li>Révision globale sans relire chaque chapitre</li>
          </ul>
          <p>
            Le poème couvre notamment noun sâkina et tanwin, mim sâkina, lâm ta&apos;rîf, moudoud,
            idgham, hamzat wasl, lâm du nom d&apos;ALLAH, Râ, waqf, makhârij, sifât et erreurs de
            récitation.
          </p>
        </FicheSection>

        <FicheSection id="enseignant" title="Pourquoi le support ne remplace pas l'enseignant">
          <p>
            Un manuel peut expliquer une règle et structurer la progression. Mais le{" "}
            <strong>Tajwid</strong> est aussi une science de transmission orale : il faut entendre,
            reproduire, être écouté et corrigé.
          </p>
          <p>
            Le support ne détecte pas toujours une lettre mal articulée, une ghounna insuffisante
            ou un prolongement imprécis. À ISHES,{" "}
            <strong>Les Clés du Coran est un support de cours</strong>, pas un substitut : le
            cursus apporte explication, correction et progression.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 !mt-6">
            <div className="rounded-2xl border border-[#e6d5b8]/50 bg-[#faf8f4] p-5">
              <p className="text-xs font-black uppercase tracking-wider text-ishes-gold mb-2">
                Volume 1 — Fondation
              </p>
              <p className="text-sm font-bold text-ishes-dark leading-relaxed">
                J&apos;apprends à lire ce qui est écrit : lettres, voyelles, signes, tahajjî.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e6d5b8]/50 bg-[#faf8f4] p-5">
              <p className="text-xs font-black uppercase tracking-wider text-ishes-gold mb-2">
                Volume 2 — Approfondissement
              </p>
              <p className="text-sm font-bold text-ishes-dark leading-relaxed">
                J&apos;apprends à réciter avec justesse : règles, articulation, poème.
              </p>
            </div>
          </div>
        </FicheSection>

        <FicheSection id="origine" title="À l'origine des Clés du Coran">
          <p>
            L&apos;ouvrage a été conçu par <strong>Oustadh Riad Latreche</strong>, enseignant et
            cofondateur de l&apos;Institut ISHES, à partir de son expérience auprès d&apos;apprenants
            francophones. Il a également rédigé le poème français du Volume 2 pour transposer la
            pédagogie traditionnelle de mémorisation par le vers.
          </p>
          <p className="italic text-ishes-blue font-bold">
            « Le Coran est une porte vers ALLAH, le Tajwid en est la clé. » — Institut ISHES
          </p>
        </FicheSection>
      </FichePratiqueShell>

      <VitrineFaq
        eyebrow="FAQ Les Clés du Coran"
        title="Questions fréquentes sur la méthode"
        items={FAQS}
      />

      <section className="bg-[#0f2924] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Le support te donne une méthode. Le cours t&apos;apporte la transmission.
          </h2>
          <p className="text-white/70 font-medium mb-8 leading-relaxed">
            Rejoins le cursus progressif de Tajwid ISHES et étudie Les Clés du Coran avec un
            enseignant.
          </p>
          <Link
            href="/inscription?plan=tajwid_standard&audience=adulte"
            className="inline-flex items-center gap-2 bg-ishes-gold hover:bg-[#b8924f] text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider"
          >
            Je m&apos;inscris au Tajwid
          </Link>
        </div>
      </section>
    </>
  );
}
