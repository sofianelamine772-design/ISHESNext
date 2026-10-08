import Link from "next/link";
import { FicheCallout, FicheSection } from "@/components/vitrine/FichePratiqueShell";

export const SCIENCES_GUIDE_TOC = [
  { id: "definition", label: "Que sont les Sciences du Coran ?" },
  { id: "revelation", label: "Révélation & mission" },
  { id: "compagnons", label: "Les Compagnons" },
  { id: "collecte", label: "Collecte du texte" },
  { id: "disciplines", label: "Grandes disciplines" },
  { id: "manuscrits", label: "Manuscrits anciens" },
  { id: "miracle", label: "Miracle du Coran" },
  { id: "relation", label: "Relation au Coran" },
  { id: "ressources", label: "Ressources" },
];

export const SCIENCES_GUIDE_DISCIPLINES: [string, string][] = [
  ["Asbâb an-nuzûl", "Étude des circonstances associées à la révélation de certains versets."],
  ["Makki / Madani", "Classement des révélations avant et après l'Hégire."],
  ["Qirâ'ât", "Lectures coraniques transmises selon des traditions reconnues."],
  ["Rasm al-mushaf", "Graphie consonantique des premiers codex."],
  ["Tafsîr", "Exégèse : méthodes d'explication et d'interprétation du Coran."],
  ["Nâsikh / mansûkh", "Questions d'abrogation dans l'exégèse et le droit."],
  ["Muhkam / mutashâbih", "Versets explicites et ceux qui demandent une interprétation attentive."],
  ["Gharîb al-Qur'ân", "Vocabulaire coranique rare ou difficile."],
  ["I‘jâz al-Qur'ân", "Caractère inimitable et miraculeux du Coran selon la tradition islamique."],
  ["Waqf / ibtidâ’", "Règles et effets des arrêts et reprises dans la récitation."],
  ["Tajwid", "Règles de prononciation et de récitation correcte."],
  ["Langue arabe / balâgha", "Grammaire, lexique et rhétorique indispensables à une lecture approfondie."],
];

export const SCIENCES_GUIDE_FAQS = [
  {
    question: "Que sont les Sciences du Coran (‘Ulûm al-Qur'ân) ?",
    answer:
      "Les Sciences du Coran regroupent les disciplines qui étudient la Révélation : contexte, déroulement, transmission, lectures (qirâ'ât), organisation du texte et méthodes d'interprétation. Ce n'est pas une science unique mais un ensemble complémentaire.",
  },
  {
    question: "Les Sciences du Coran sont-elles réservées aux spécialistes ?",
    answer:
      "Non. Une introduction progressive est accessible aux débutants, à condition d'expliquer le vocabulaire et de distinguer les niveaux de complexité. Le guide ISHES et le cours de 4 mois (399 €) sont conçus pour cela.",
  },
  {
    question: "Faut-il savoir lire l'arabe pour démarrer ?",
    answer:
      "On peut découvrir l'histoire et les notions fondamentales en français. L'arabe devient indispensable pour approfondir les qirâ'ât, le rasm et la rhétorique.",
  },
  {
    question: "Quelle différence entre Sciences du Coran et Tafsîr ?",
    answer:
      "Le Tafsîr cherche à expliquer le sens des versets. Les Sciences du Coran étudient plus largement les conditions, modalités et outils nécessaires à leur compréhension : révélation, transmission, makki/madani, qirâ'ât, etc.",
  },
  {
    question: "Les manuscrits prouvent-ils que chaque détail du texte actuel était identique dès le premier jour ?",
    answer:
      "Les manuscrits sont des témoins historiques précieux. Une telle affirmation dépasse ce qu'un fragment isolé peut démontrer. Il faut articuler documentation, tradition de récitation et foi dans la préservation (Coran 15:9).",
  },
  {
    question: "Que prouvent les manuscrits de Birmingham et de Sanaa ?",
    answer:
      "Birmingham : deux feuillets (sourates 18–20), parchemin daté au radiocarbone entre 568 et 645 (95,4 %) — la fourchette concerne la peau, pas forcément la date d'écriture. Sanaa : palimpseste qui éclaire les premiers états écrits, avec des variations textuelles à étudier, pas à nier.",
  },
  {
    question: "Où suivre un cours de Sciences du Coran en français ?",
    answer:
      "À l'Institut ISHES : formation en ligne de 4 mois, 1 cours par semaine, 399 €, replays et diplôme. Ce guide en est l'introduction gratuite.",
  },
];

export function SciencesDuCoranGuideArticle() {
  return (
    <>
      <p className="text-lg text-gray-700 font-medium leading-relaxed">
        Et si tu découvrais l&apos;histoire extraordinaire du Livre que tu récites ? Plonge au cœur
        de la Révélation et découvre comment le Coran a été transmis, étudié et préservé. Comprendre
        son histoire, c&apos;est apprendre à mesurer sa valeur, à l&apos;aimer davantage et à lui
        donner la place qu&apos;il mérite dans ta vie.
      </p>

      <FicheCallout>
        « En vérité, c&apos;est Nous qui avons fait descendre le Rappel, et c&apos;est Nous qui en
        sommes gardien. » — Coran, 15:9, traduction rapprochée.
      </FicheCallout>
      <p className="text-gray-600 font-medium leading-relaxed">
        Ce guide est une introduction accessible. Il distingue les convictions de la tradition
        musulmane, les récits transmis dans les sources islamiques et ce que permettent d&apos;étudier
        les manuscrits anciens.
      </p>

      <FicheSection id="definition" title="1. Que sont les Sciences du Coran ?">
        <p>
          Les <strong>‘Ulûm al-Qur&apos;ân</strong> (« Sciences du Coran ») regroupent les
          connaissances qui permettent d&apos;étudier la Révélation : son contexte, son déroulement,
          sa transmission, ses modes de récitation, l&apos;organisation du texte et les méthodes qui
          éclairent son interprétation. Elles ne désignent pas une science unique mais un{" "}
          <strong>ensemble de disciplines complémentaires</strong>.
        </p>
        <p>
          Elles répondent à des questions concrètes : pourquoi certains versets ont-ils été
          révélés ? Quelles différences entre sourates mecquoises et médinoises ? Comment les
          premiers musulmans apprenaient-ils le Coran ? Pourquoi existe-t-il plusieurs lectures
          reconnues ? Comment comprendre un verset dans son contexte ?
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Pourquoi cette discipline change-t-elle notre lecture ?
        </h3>
        <p>
          Connaître l&apos;histoire d&apos;un verset permet de mieux saisir sa portée. Étudier la
          vie du Prophète ﷺ aide à comprendre les circonstances de la Révélation. Découvrir le soin
          apporté par les Compagnons à l&apos;apprentissage et à la transmission donne une
          profondeur nouvelle à chaque récitation.
        </p>
      </FicheSection>

      <FicheSection id="revelation" title="2. La Révélation et la mission du Prophète ﷺ">
        <p>
          Selon la tradition musulmane, le début de la Révélation est lié à la grotte de Hirâ&apos;,
          près de La Mecque, et aux premiers versets de la sourate{" "}
          <strong>Al-‘Alaq (96:1-5)</strong>. Le Coran a ensuite été révélé progressivement au
          cours de la mission prophétique, sur une période communément présentée comme environ{" "}
          <strong>23 ans</strong>.
        </p>
        <p>
          Cette progression accompagne des situations humaines et communautaires variées :
          affirmation de la foi, patience face aux épreuves, formation morale, organisation de la
          communauté et enseignements juridiques. La distinction entre périodes mecquoise et
          médinoise est donc essentielle.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Révélation mecquoise et médinoise
        </h3>
        <p>
          Dans la classification traditionnelle la plus courante, « mecquois » désigne ce qui a été
          révélé <strong>avant l&apos;Hégire</strong> et « médinois » ce qui a été révélé{" "}
          <strong>après</strong>, indépendamment du lieu exact. Cette classification aide à
          comprendre l&apos;évolution du contexte, des interlocuteurs et de certaines thématiques.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          La Sîrah éclaire les versets
        </h3>
        <p>
          La biographie prophétique et les circonstances de révélation (<em>asbâb an-nuzûl</em>) se
          complètent : elles permettent d&apos;étudier des événements, des questions adressées au
          Prophète ﷺ et des situations auxquelles certains passages répondent. Toutes les
          circonstances attribuées à un verset n&apos;ont toutefois pas le même degré de fiabilité :
          leur étude nécessite une méthode critique. Voir aussi le{" "}
          <Link href="/fr/cours-as-sirah" className="text-ishes-gold font-bold hover:underline">
            cours de Sîrah ISHES
          </Link>
          .
        </p>
      </FicheSection>

      <FicheSection id="compagnons" title="3. Les Compagnons : apprendre, vivre et transmettre">
        <p>
          La tradition islamique décrit une transmission à la fois <strong>orale et écrite</strong>{" "}
          du Coran. Des Compagnons mémorisaient les versets, les récitaient, les enseignaient et,
          pour certains, les consignaient par écrit. La mémorisation collective, la récitation et
          les supports écrits formaient des voies complémentaires de transmission.
        </p>
        <p>
          Étudier leur rôle, c&apos;est aussi découvrir leur attachement à la Parole d&apos;ALLAH :
          ils ne considéraient pas le Coran comme un texte isolé de leur vie, mais comme une
          guidance qui transformait leur comportement et leurs responsabilités.
        </p>
      </FicheSection>

      <FicheSection id="collecte" title="4. Comment le Coran a-t-il été rassemblé ?">
        <p>
          Selon les récits traditionnels, une collecte des feuillets fut organisée sous le califat
          d&apos;<strong>Abû Bakr</strong>, puis une recension et une diffusion de copies de
          référence furent entreprises sous le califat de <strong>‘Uthmân</strong> afin d&apos;unifier
          le cadre écrit de la récitation dans une communauté en expansion.
        </p>
        <p>
          Il faut distinguer plusieurs notions : la Révélation, la mémorisation et la récitation, la
          mise par écrit, la collecte et la diffusion de codex de référence. Les manuscrits
          matériels et les récits historiques éclairent ces étapes par des méthodes différentes. La{" "}
          <Link
            href="/fr/cours-sciences-coran/frise-chronologique"
            className="text-ishes-gold font-bold hover:underline"
          >
            frise chronologique
          </Link>{" "}
          situe ces périodes.
        </p>
      </FicheSection>

      <FicheSection id="disciplines" title="5. Les grandes disciplines liées au Coran">
        <div className="overflow-x-auto rounded-2xl border border-[#e6d5b8]/50">
          <table className="w-full text-left text-sm min-w-[520px]">
            <caption className="sr-only">
              Disciplines des Sciences du Coran et objet d&apos;étude
            </caption>
            <thead className="bg-ishes-blue text-white">
              <tr>
                <th scope="col" className="px-4 py-3.5 font-black">
                  Discipline
                </th>
                <th scope="col" className="px-4 py-3.5 font-black">
                  Ce qu&apos;elle étudie
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {SCIENCES_GUIDE_DISCIPLINES.map(([name, desc]) => (
                <tr key={name} className="hover:bg-[#faf8f4]">
                  <th
                    scope="row"
                    className="px-4 py-3 font-black text-ishes-blue whitespace-nowrap text-left"
                  >
                    {name}
                  </th>
                  <td className="px-4 py-3 text-gray-600 font-medium">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          D&apos;autres sciences islamiques puisent dans le Coran
        </h3>
        <p>
          Le Coran est une source fondamentale pour le tafsîr, la ‘aqîda (théologie), le fiqh
          (jurisprudence), les usûl al-fiqh (fondements du droit), l&apos;éthique et la spiritualité.
          Cela ne signifie pas que chacune de ces disciplines découle exclusivement du Coran : la
          Sunna, la langue arabe, les méthodes de raisonnement et la tradition savante y occupent
          également une place importante.
        </p>
      </FicheSection>

      <FicheSection id="manuscrits" title="6. Que nous apprennent les manuscrits anciens ?">
        <p>
          Les manuscrits anciens sont des <strong>témoins matériels précieux</strong> de la
          circulation du texte coranique. Leur écriture, leurs variantes orthographiques, leur
          disposition et les analyses scientifiques permettent de mieux connaître l&apos;histoire de
          sa transmission. Ils ne suffisent pas, à eux seuls, à démontrer toutes les affirmations
          théologiques relatives à l&apos;authenticité du Coran.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Le manuscrit de Birmingham
        </h3>
        <p>
          Deux feuillets conservés à l&apos;Université de Birmingham contiennent des parties des
          sourates 18, 19 et 20. Le parchemin a été daté au radiocarbone entre{" "}
          <strong>568 et 645</strong> de notre ère, avec une probabilité annoncée de{" "}
          <strong>95,4 %</strong>. Cette fourchette concerne la peau animale utilisée comme
          support, pas directement la date à laquelle le texte a été écrit. C&apos;est un témoin
          très ancien et remarquable.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Le palimpseste de Sanaa
        </h3>
        <p>
          Des fragments découverts à Sanaa, au Yémen, comprennent un palimpseste : un texte ancien
          effacé, puis un autre texte inscrit sur le même support. L&apos;étude des couches
          textuelles contribue à la recherche sur les premiers états écrits du Coran et sur la
          diversité des témoins anciens. Il serait inexact de présenter ce dossier comme ne
          montrant aucune variation textuelle.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Le codex Parisino-petropolitanus et d&apos;autres témoins
        </h3>
        <p>
          Les premiers fragments en écriture hijâzî conservés dans différentes bibliothèques, dont
          ceux étudiés sous le nom de <strong>codex Parisino-petropolitanus</strong>, permettent de
          comparer des portions du texte, des conventions graphiques et l&apos;évolution des
          manuscrits. Les chercheurs croisent paléographie, codicologie, datations et comparaison
          des textes.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Ce que l&apos;on peut conclure avec rigueur
        </h3>
        <p>
          Ces témoins montrent qu&apos;un texte coranique écrit circulait très tôt dans l&apos;histoire
          de l&apos;islam et rendent possible une étude concrète de sa transmission. Pour expliquer
          l&apos;authenticité du Coran dans la perspective musulmane, il faut articuler cette
          documentation avec la tradition de récitation, les récits de collecte et la foi dans la
          promesse divine de préservation (15:9),{" "}
          <strong>sans confondre preuve historique et affirmation de foi</strong>.
        </p>
      </FicheSection>

      <FicheSection id="miracle" title="7. Pourquoi parle-t-on du miracle du Coran ?">
        <p>
          Dans la foi musulmane, le Coran est la Parole d&apos;ALLAH et un miracle accordé au
          Prophète ﷺ. La tradition savante étudie notamment son défi d&apos;inimitabilité, sa
          langue, sa rhétorique, la portée de son message, sa cohérence et sa transmission.
        </p>
        <p>
          L&apos;<strong>i‘jâz</strong> ne se réduit pas à une liste de coïncidences numériques ou
          de prétendus miracles scientifiques. L&apos;approche la plus solide distingue les
          arguments linguistiques, historiques et théologiques, et prend le temps d&apos;expliquer
          leurs méthodes et leurs limites.
        </p>
      </FicheSection>

      <FicheSection id="relation" title="8. Comment cette connaissance transforme-t-elle ta relation au Coran ?">
        <p>
          En découvrant le contexte de la Révélation, tu lis les versets avec davantage de
          repères. En étudiant le rôle du Prophète ﷺ et des Compagnons, tu prends conscience des
          efforts de transmission. En comprenant les disciplines coraniques, tu apprends à poser
          de meilleures questions et à rechercher des explications fiables.
        </p>
        <FicheCallout variant="blue">
          Parce que connaître l&apos;histoire du Coran, c&apos;est apprendre à mesurer sa valeur, à
          l&apos;aimer davantage et à lui donner la place qu&apos;il mérite dans ta vie.
        </FicheCallout>
      </FicheSection>

      <FicheSection id="ressources" title="10. Ressources gratuites à consulter">
        <p>
          Quatre fiches complémentaires accompagnent ce guide :{" "}
          <Link
            href="/fr/cours-sciences-coran/frise-chronologique"
            className="text-ishes-gold font-bold hover:underline"
          >
            frise chronologique de la Révélation
          </Link>
          , carte des Sciences du Coran, fiche des manuscrits anciens et quiz de découverte. Elles
          sont libres d&apos;accès et peuvent être consultées ou imprimées.
        </p>
        <h3 className="text-xl font-black text-ishes-blue !mt-8 !mb-3">
          Sources et pistes de lecture
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Coran : 15:9 ; 38:29 ; 12:2 ; 96:1-5.</li>
          <li>
            Université de Birmingham, « Birmingham Qur&apos;an manuscript » —{" "}
            <a
              href="https://www.birmingham.ac.uk/facilities/cadbury/birmingham-quran-mingana-collection/birmingham-quran/what-is"
              className="text-ishes-gold font-bold hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              birmingham.ac.uk
            </a>
          </li>
          <li>
            Corpus Coranicum (Académie des sciences de Berlin-Brandebourg) —{" "}
            <a
              href="https://corpuscoranicum.de/"
              className="text-ishes-gold font-bold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              corpuscoranicum.de
            </a>
          </li>
        </ul>
        <p className="text-sm text-gray-500">
          Note éditoriale : ce document est un support de vulgarisation. L&apos;équipe pédagogique
          ISHES valide les formulations doctrinales, les traductions et les références.
        </p>
        <p>
          Prêt à approfondir ?{" "}
          <Link
            href="/inscription?plan=sciences_du_coran&audience=adulte"
            className="text-ishes-gold font-bold hover:underline"
          >
            Formation ISHES — 4 mois, 1 cours / semaine, 399 €
          </Link>
          .
        </p>
      </FicheSection>
    </>
  );
}
