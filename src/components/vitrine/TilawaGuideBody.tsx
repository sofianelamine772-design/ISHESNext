import Link from "next/link";
import { FicheCallout, FicheSection } from "@/components/vitrine/FichePratiqueShell";
import { PdfConsultButton } from "@/components/vitrine/PdfConsultButton";

export const TILAWA_RESOURCES = [
  {
    file: "/fiches-pratiques/tilawa-planning-30-jours.pdf",
    title: "Mon planning de mémorisation — 30 jours",
    desc: "Un tableau à remplir chaque jour : nouveaux versets, révisions, difficultés et bilan. Tu notes aussi le temps quotidien réaliste et le jour de bilan du mois.",
  },
  {
    file: "/fiches-pratiques/tilawa-sourates-courtes.pdf",
    title: "Liste des sourates courtes",
    desc: "Douze sourates pour choisir un point de départ et suivre ce qui est à apprendre ou à réviser. Ce n'est pas un ordre obligatoire.",
  },
  {
    file: "/fiches-pratiques/tilawa-conseils-recitation.pdf",
    title: "7 conseils pour fluidifier ta récitation",
    desc: "Une fiche pour travailler les erreurs, la prononciation, l'enregistrement et la régularité, avec un exercice de la semaine.",
  },
  {
    file: "/fiches-pratiques/tilawa-plan-revision.pdf",
    title: "Mon plan de révision du Coran",
    desc: "Organise les passages nouveaux, récents et anciens sur une semaine, pour consolider ce qui est déjà mémorisé.",
  },
] as const;

export const TILAWA_FAQS = [
  {
    question: "Faut-il connaître le Tajwid pour suivre les cours de Tilawa et de mémorisation ?",
    answer:
      "Oui, une base de lecture et de Tajwid est demandée. Le cours de mémorisation ISHES corrige la récitation et fait réviser, il ne reprend pas l'alphabet depuis zéro. Si le niveau n'est pas encore là, l'enseignant oriente vers le Tajwid standard ou le Tajwid intensif.",
  },
  {
    question: "Dois-je mémoriser le Coran entier ?",
    answer:
      "Non. Tu peux travailler quelques sourates utiles à la prière, consolider ce que tu connais déjà, ou viser la mémorisation complète sur un temps plus long. L'enseignant ajuste la quantité à ta lecture et à tes révisions.",
  },
  {
    question: "Pourquoi apprendre la Tilawa ou le Hifdh avec un enseignant ?",
    answer:
      "Un support écrit et une écoute enregistrée ne repèrent pas toujours une lettre mal articulée, une ghounna trop courte ou un arrêt incorrect. L'enseignant écoute, corrige avant que l'erreur ne devienne une habitude mémorisée, et adapte le planning.",
  },
  {
    question: "Comment savoir si je dois choisir le Tajwid ou la Tilawa ?",
    answer:
      "Le Tajwid apprend les règles et la lecture. La Tilawa les applique dans une récitation suivie, avec fluidité et correction. Le Hifdh (mémorisation) vient quand la lecture est juste. Le choix se fait avec l'enseignant, sur WhatsApp, selon ta fluidité réelle.",
  },
  {
    question: "Comment se déroule le cours Tilawa et mémorisation ISHES ?",
    answer:
      "Formation individuelle de 4 mois, à 399 €, deux séances par semaine : le mercredi à 19h30 et le dimanche à 12h, en direct sur Zoom, avec replays. Le parcours comprend corrections, révisions (mouraja'a) et le diplôme ISHES. Début : octobre 2026.",
  },
  {
    question: "Les fiches de Tilawa et de mémorisation sont-elles gratuites ?",
    answer:
      "Oui. Le planning de 30 jours, la liste des sourates courtes, les 7 conseils de récitation et le plan de révision se lisent sur la page et se téléchargent en PDF, sans formulaire et sans e-mail.",
  },
];

const SOURATES = [
  ["Al-Fâtiha", "1", "7"],
  ["Al-Ikhlâs", "112", "4"],
  ["Al-Falaq", "113", "5"],
  ["An-Nâs", "114", "6"],
  ["Al-Kawthar", "108", "3"],
  ["Al-‘Asr", "103", "3"],
  ["An-Nasr", "110", "3"],
  ["Al-Kâfirûn", "109", "6"],
  ["Al-Masad", "111", "5"],
  ["Quraysh", "106", "4"],
  ["Al-Fîl", "105", "5"],
  ["Al-Mâ‘ûn", "107", "7"],
];

export function TilawaGuideBody() {
  return (
    <>
      <FicheSection id="tilawa" title="Qu'est-ce que la Tilawa ?">
        <p>
          La <strong>Tilawa</strong> est la récitation du Coran. Dans l&apos;apprentissage, elle fait
          passer de la connaissance des règles du Tajwid à leur application réelle et régulière.
          L&apos;objectif est de réciter avec justesse, fluidité et attention.
        </p>
        <p>
          En travaillant la prononciation des lettres, les prolongements, les arrêts et les
          enchaînements, les hésitations diminuent. L&apos;attention peut alors rester sur les versets.
        </p>
        <FicheCallout>
          <p>Pourquoi travailler ta lecture ?</p>
          <p className="font-medium mt-2">
            Pour appliquer les règles du Tajwid, corriger les erreurs persistantes, gagner en
            assurance et construire une base solide avant d&apos;intensifier la mémorisation.
          </p>
        </FicheCallout>
        <blockquote className="border-l-4 border-ishes-gold pl-4 text-ishes-blue">
          <p className="font-black">« Et récite le Coran, lentement et clairement. »</p>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Sourate Al-Muzzammil (73), verset 4 — traduction rapprochée du sens.
          </p>
        </blockquote>
      </FicheSection>

      <FicheSection id="memorisation" title="Comment mémoriser le Coran durablement ?">
        <p>
          Le <strong>Hifdh</strong> peut commencer par quelques sourates utiles à la prière, ou
          s&apos;inscrire dans un projet de mémorisation du Coran entier. Dans les deux cas, trois
          conditions tiennent le parcours : une récitation correcte, des objectifs réalistes, des
          révisions régulières.
        </p>
        <h3 className="text-xl font-black text-ishes-blue pt-2">Commence par la justesse</h3>
        <p>
          Avant de multiplier les nouveaux passages, la lecture doit être sûre. Un enseignant
          corrige les erreurs de prononciation avant qu&apos;elles ne deviennent des habitudes
          mémorisées. Réciter de mémoire et réciter sans erreur sont deux choses différentes.
        </p>
        <h3 className="text-xl font-black text-ishes-blue pt-2">Révise autant que tu apprends</h3>
        <p>
          Distingue trois catégories. Le <strong>nouveau</strong> : les versets du jour. Le{" "}
          <strong>récent</strong> : ce qui a été appris ces derniers jours, encore fragile.
          L&apos;<strong>ancien</strong> : les sourates déjà mémorisées, à entretenir. Si les
          anciennes sourates deviennent fragiles, réduis temporairement le nouveau texte et
          consolide les acquis. C&apos;est la mouraja&apos;a.
        </p>
        <blockquote className="border-l-4 border-ishes-gold pl-4 text-ishes-blue">
          <p className="font-black">
            « Il sera dit au compagnon du Coran : Lis et élève-toi, et récite comme tu récitais
            dans le bas monde, car ta place sera au dernier verset que tu réciteras. »
          </p>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Hadith rapporté par Abû Dâwûd (1464) et At-Tirmidhî (2914) — traduction rapprochée.
          </p>
        </blockquote>
      </FicheSection>

      <FicheSection id="methodes" title="Une méthode simple pour progresser">
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            <strong>Choisis un passage adapté.</strong> Un objectif modeste et régulier tient mieux
            qu&apos;un programme impossible.
          </li>
          <li>
            <strong>Écoute une récitation de référence.</strong> Observe l&apos;articulation, les
            arrêts et les règles déjà étudiées.
          </li>
          <li>
            <strong>Lis et répète avec attention.</strong> La fluidité vient d&apos;une récitation
            posée, qui articule chaque lettre et respecte les signes.
          </li>
          <li>
            <strong>Fais corriger tes erreurs.</strong> L&apos;enseignant entend des difficultés
            que l&apos;enregistrement seul ne suffit pas à corriger.
          </li>
          <li>
            <strong>Révise selon un planning.</strong> Reviens sur les passages anciens pour
            qu&apos;ils restent stables.
          </li>
        </ol>
        <h3 className="text-xl font-black text-ishes-blue pt-4">
          Sept conseils pour fluidifier la récitation
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Lis lentement, sans chercher la vitesse.</li>
          <li>Travaille de courts passages, relus plusieurs fois avant d&apos;avancer.</li>
          <li>Repère une difficulté précise : lettre, prolongement, ghounna ou arrêt.</li>
          <li>Écoute une récitation fiable, puis répète en respectant le rythme.</li>
          <li>Enregistre-toi et compare, sans remplacer la correction d&apos;un enseignant.</li>
          <li>Fais corriger la récitation : certaines erreurs ne s&apos;entendent pas seul.</li>
          <li>Révise les passages déjà fluides pour stabiliser les bonnes habitudes.</li>
        </ol>
      </FicheSection>

      <FicheSection id="sourates" title="Par quelles sourates commencer ?">
        <p>
          Cette sélection de douze sourates courtes aide à choisir un point de départ. Ce n&apos;est
          pas un ordre obligatoire de mémorisation. Commence par les sourates utiles à tes prières
          et adaptées à ta lecture. Si tu en connais déjà plusieurs, fais-les écouter avant d&apos;en
          ajouter.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ishes-gold">
                <th className="py-2 pr-4 font-black">Sourate</th>
                <th className="py-2 pr-4 font-black">N°</th>
                <th className="py-2 font-black">Versets</th>
              </tr>
            </thead>
            <tbody>
              {SOURATES.map(([name, num, verses]) => (
                <tr key={num} className="border-t border-[#e6d5b8]/60">
                  <td className="py-2 pr-4 font-bold text-ishes-blue">{name}</td>
                  <td className="py-2 pr-4">{num}</td>
                  <td className="py-2">{verses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          L&apos;enseignant ajuste le choix et l&apos;ordre selon le niveau. La liste imprimable,
          avec les cases « à apprendre » et « à réviser », est dans la fiche gratuite.
        </p>
      </FicheSection>

      <FicheSection id="ressources" title="Quatre fiches pédagogiques gratuites">
        <p>
          Pas de formulaire, pas d&apos;adresse e-mail. Ouvre la fiche dans la page ou
          télécharge-la pour l&apos;imprimer. Sur mobile, le navigateur peut proposer le
          téléchargement plutôt que l&apos;aperçu.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          {TILAWA_RESOURCES.map((resource, index) => (
            <article key={resource.file} className="border border-[#e6d5b8]/70 rounded-2xl p-5 bg-[#faf8f4]">
              <p className="text-[11px] font-black tracking-widest text-ishes-gold mb-2">
                RESSOURCE GRATUITE {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-black text-ishes-blue mb-2">{resource.title}</h3>
              <p className="text-sm font-medium text-gray-600 mb-4">{resource.desc}</p>
              <div className="flex flex-wrap items-center gap-3">
                <PdfConsultButton href={resource.file} title={resource.title} />
                <a href={resource.file} download className="text-sm font-black text-ishes-blue underline underline-offset-2">
                  Télécharger le PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      </FicheSection>

      <FicheSection id="cours" title="Les cours individuels Tilawa et mémorisation">
        <p>
          Les cours individuels ISHES travaillent la <strong>Tilawa</strong> ou la{" "}
          <strong>mémorisation</strong> selon le niveau et l&apos;objectif. Deux séances par
          semaine, le mercredi à 19h30 et le dimanche à 12h, en direct sur Zoom, avec les replays.
          Le parcours dure 4 mois, les supports sont inclus, et il se conclut par le diplôme ISHES.
          Tarif : <strong>399 €</strong>.
        </p>
        <p>
          Si la lecture n&apos;est pas encore stable, commence par le{" "}
          <Link href="/fr/cours-lecture-tajwid" className="text-ishes-blue font-bold underline underline-offset-2">
            Tajwid standard
          </Link>{" "}
          ou le{" "}
          <Link href="/fr/cours-tajwid-intensif" className="text-ishes-blue font-bold underline underline-offset-2">
            Tajwid intensif
          </Link>
          . Une question de niveau :{" "}
          <a
            href="https://wa.me/33666033519?text=Bonjour%2C%20je%20souhaite%20une%20orientation%20Tilawa%20ou%20m%C3%A9morisation."
            className="text-ishes-blue font-bold underline underline-offset-2"
          >
            l&apos;équipe répond sur WhatsApp
          </a>
          .
        </p>
        <p>
          <Link href="/inscription?plan=memoriser_coran&audience=adulte" className="text-ishes-gold font-black">
            Découvrir la formation Tilawa et mémorisation — 399 €
          </Link>
        </p>
      </FicheSection>
    </>
  );
}
