"use client";

import { motion } from "framer-motion";
import { ScrollText, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

const presentielSections = [
  {
    title: "Article 1 — Objet et acceptation",
    content: [
      "Les présentes conditions générales de vente (CGV) régissent les inscriptions aux cours en présentiel proposés à Toulouse par l'Association Cours Transmettre.",
      "Pour un élève mineur, l'inscription est effectuée par son représentant légal. La validation de l'inscription implique l'acceptation des présentes CGV et du règlement intérieur communiqué par l'association.",
      "Les formations à distance proposées sous le nom Institut ISHES relèvent de CGV distinctes."
    ]
  },
  {
    title: "Article 2 — Inscription",
    content: [
      "L'inscription s'effectue sur ishes.fr ou auprès du secrétariat. Elle est confirmée après réception du dossier complet, paiement du montant demandé et validation de la place par l'association, sous réserve des disponibilités.",
      "Pour les cours destinés aux enfants, les frais d'inscription sont de 30 € par enfant. Ils restent acquis à l'association en cas de désistement après l'expiration du délai légal de rétractation, sous réserve des autres droits applicables au consommateur."
    ]
  },
  {
    title: "Article 3 — Tarifs",
    content: [
      "Pour l'année scolaire 2026/2027, les frais de cours pour enfants sont de 450 € par enfant, auxquels s'ajoutent 30 € de frais d'inscription par enfant.",
      "Une réduction de 50 € sur les frais de cours s'applique au deuxième enfant d'une même famille, puis à chaque enfant supplémentaire. Les frais d'inscription restent dus pour chacun.",
      "• Premier enfant : Frais de cours 450 €, Frais d'inscription 30 €, Total 480 €",
      "• Deuxième enfant et suivants : Frais de cours 400 €, Frais d'inscription 30 €, Total 430 € par enfant",
      "Pour les adultes, le tarif annuel de la formule comprenant deux matières est de 649 €. Le prix total applicable est présenté avant la validation de l'inscription."
    ]
  },
  {
    title: "Article 4 — Modalités de paiement",
    content: [
      "Le règlement peut être effectué en 1, 3, 5 ou 10 fois sans frais via les moyens proposés lors de l'inscription sur le site. Le prix total, le montant des échéances et leurs dates sont indiqués avant la validation du paiement.",
      "Le paiement en plusieurs fois constitue un échelonnement du prix convenu. Les paiements par chèque ne sont pas acceptés.",
      "En cas d'échéance rejetée, l'association contacte le payeur afin de permettre une régularisation."
    ]
  },
  {
    title: "Article 5 — Droit de rétractation",
    content: [
      "Lorsqu'une inscription est conclue à distance, le consommateur dispose en principe de 14 jours à compter de la conclusion du contrat pour exercer son droit de rétractation, sans avoir à justifier sa décision. Il peut adresser une déclaration claire par courriel ou par courrier aux coordonnées indiquées à l'article 10, ou utiliser le formulaire de rétractation mis à sa disposition.",
      "Si les cours n'ont pas commencé, les sommes versées, y compris les 30 € de frais d'inscription, sont remboursées conformément aux règles légales.",
      "Si le consommateur a demandé expressément que les cours commencent avant la fin du délai de rétractation, puis se rétracte, il peut être tenu de payer la part des cours déjà dispensés, calculée conformément à la loi. Le seul démarrage des cours ne supprime pas son droit de rétractation."
    ]
  },
  {
    title: "Article 6 — Absences, désistement et abandon",
    content: [
      "Après l'expiration du délai de rétractation applicable, une absence, un désistement ou un abandon à l'initiative de l'élève ne donne pas lieu à un remboursement des cours non suivis. Les échéances restant à payer demeurent dues.",
      "En cas de force majeure dûment justifiée empêchant l'élève de poursuivre les cours, une demande écrite accompagnée des justificatifs utiles peut être adressée à l'association. Le bureau de l'association examine la situation et détermine les conséquences sur les sommes déjà versées et les échéances restant dues, conformément aux règles applicables.",
      "Si l'association annule définitivement des cours qu'elle ne peut remplacer, elle rembourse la part correspondant aux prestations non fournies."
    ]
  },
  {
    title: "Article 7 — Engagement des familles et règlement intérieur",
    content: [
      "Les élèves et leurs représentants légaux s'engagent à respecter le règlement intérieur de l'association, les enseignants, le personnel et les autres élèves.",
      "Un comportement gravement irrespectueux ou des perturbations répétées peuvent entraîner une mesure adaptée, pouvant aller jusqu'à l'exclusion, après examen de la situation et information de l'élève ou de son représentant légal."
    ]
  },
  {
    title: "Article 8 — Réclamations et médiation",
    content: [
      "Toute réclamation doit d'abord être adressée par écrit à l'association, aux coordonnées indiquées à l'article 10. L'association s'efforce d'y répondre dans un délai de 30 jours.",
      "Si le litige n'est pas résolu après cette réclamation, le consommateur peut saisir gratuitement le médiateur de la consommation dont relève l'association (ci-dessous). Une réclamation écrite préalable est nécessaire ; la demande de médiation doit notamment être présentée dans le délai légal suivant cette réclamation.",
      "Médiateur : CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice",
      "Site internet : www.cm2c.net"
    ]
  },
  {
    title: "Article 9 — Démarchage téléphonique",
    content: [
      "L'association ne procède à aucun démarchage téléphonique commercial. Les personnes souhaitant s'opposer au démarchage téléphonique peuvent s'inscrire gratuitement sur www.bloctel.gouv.fr."
    ]
  },
  {
    title: "Article 10 — Identification de l'association",
    content: [
      "Association Cours Transmettre — Toulouse",
      "Adresse du siège : 41 Boulevard de Thibaud 31100 Tououse",
      "Adresse e-mail pour les demandes et réclamations : ishes.contact@gmail.com",
      "Site internet : ishes.fr",
      "Dernière mise à jour : septembre 2026"
    ]
  }
];

const distanceSections = [
  {
    title: "Article 1 — Objet et identité du vendeur",
    content: [
      "Les présentes CGV régissent les inscriptions aux formations à distance proposées sous le nom Institut ISHES distance sur ishes.fr.",
      "Le vendeur et cocontractant de l'élève est la société identifiée à l'article 9.",
      "Pour un élève mineur, l'inscription est effectuée par son représentant légal. La validation de l'inscription implique l'acceptation des présentes CGV.",
      "Ces CGV ne s'appliquent pas aux cours en présentiel vendus par l'Association Cours Transmettre."
    ]
  },
  {
    title: "Article 2 — Formations et inscription",
    content: [
      "Le contenu, la durée, les horaires, la date de début, les modalités de participation et le prix de chaque formation sont présentés sur sa page d'inscription.",
      "L'inscription s'effectue sur ishes.fr ou auprès du secrétariat, selon les modalités proposées. Elle est confirmée après validation des informations demandées et du paiement prévu lors de la commande."
    ]
  },
  {
    title: "Article 3 — Prix et modalités de paiement",
    content: [
      "Le prix applicable est celui affiché pour la formation choisie avant la validation de la commande. Toute réduction ou tout frais supplémentaire applicable est également indiqué avant le paiement.",
      "Les frais d'inscription de 30 € prévus pour les enfants en présentiel ne s'appliquent pas automatiquement aux formations à distance.",
      "Selon les options affichées pour la formation choisie, le paiement peut être effectué en 1, 3, 5 ou 10 fois sans frais. Le prix total, le montant des échéances et leurs dates sont communiqués avant validation. Les paiements par chèque ne sont pas acceptés.",
      "Le paiement en plusieurs fois constitue un échelonnement du prix total de la formation. En cas d'échéance rejetée, l'Institut contacte le payeur afin de permettre une régularisation."
    ]
  },
  {
    title: "Article 4 — Droit de rétractation",
    content: [
      "Lorsque le droit français de la consommation s'applique au contrat, le consommateur dispose en principe de 14 jours à compter de la conclusion du contrat pour exercer son droit de rétractation, sans avoir à justifier sa décision. Il peut adresser une déclaration claire par courriel ou par courrier aux coordonnées indiquées à l'article 9, ou utiliser le formulaire de rétractation mis à sa disposition.",
      "Si la formation n'a pas commencé, les sommes versées sont remboursées conformément aux règles applicables.",
      "Si le consommateur a demandé expressément que les cours commencent pendant ce délai, puis se rétracte, il sera tenu de payer la part de la formation déjà dispensée (10euros de l'heure). La remise d'identifiants ou le seul début des cours ne supprime pas automatiquement le droit de rétractation."
    ]
  },
  {
    title: "Article 5 — Accès aux cours et à l'espace élève",
    content: [
      "Après confirmation de l'inscription, l'élève reçoit les informations nécessaires pour accéder aux cours et à son espace élève.",
      "Selon la formation choisie, cet espace peut donner accès aux cours en direct, aux supports pédagogiques, à l'emploi du temps, au suivi de la scolarité et aux replays lorsqu'ils sont prévus dans l'offre. Les modalités et la durée d'accès aux replays sont précisées dans la présentation de la formation.",
      "Les identifiants sont personnels. L'élève doit disposer d'un équipement et d'une connexion internet adaptés à la participation aux cours."
    ]
  },
  {
    title: "Article 6 — Absences, désistement et abandon",
    content: [
      "L'inscription engage l'élève, ou son représentant légal, pour la totalité de la formation choisie. Le paiement en plusieurs fois constitue uniquement un échelonnement de son prix.",
      "Après l'expiration du délai de rétractation applicable, toute absence, tout désistement ou tout abandon à l'initiative de l'élève ne donne lieu à aucun remboursement. Les échéances restantes demeurent dues jusqu'au règlement intégral de la formation.",
      "En cas de force majeure dûment justifiée empêchant l'élève de poursuivre la formation, une demande écrite accompagnée des justificatifs utiles peut être adressée à l'Institut. Celui-ci examine la situation au cas par cas et détermine les conséquences sur les sommes déjà versées et les échéances restant dues.",
      "Si le vendeur annule définitivement une formation ou ne peut plus assurer les cours prévus, il propose une solution adaptée ou rembourse la part correspondant aux prestations non fournies."
    ]
  },
  {
    title: "Article 7 — Comportement et utilisation des contenus",
    content: [
      "L'élève s'engage à respecter les enseignants et les autres participants.",
      "Les accès aux cours et les supports pédagogiques sont personnels. Ils ne peuvent être partagés avec une personne non inscrite, diffusés publiquement ou enregistrés sans autorisation.",
      "Un manquement grave ou répété peut entraîner une mesure adaptée après information de l'élève ou de son représentant légal. Les conséquences financières d'une éventuelle exclusion sont appréciées selon les circonstances et les droits applicables."
    ]
  },
  {
    title: "Article 8 — Réclamations et règlement des litiges",
    content: [
      "Toute réclamation doit d'abord être adressée par écrit par email indiqué à l'article 9. Celle-ci s'efforce d'y répondre dans un délai de 30 jours."
    ]
  },
  {
    title: "Article 9 — Identification du vendeur",
    content: [
      "Nom commercial : Institut ISHES distance",
      "Dénomination juridique de l'entreprise vendeuse : RR SERVICES FZE- LLC",
      "Pays et numéro d'immatriculation : 4311125.01 Sharjah",
      "Adresse du siège : Business Centre, Sharjah Publishing City Free Zone, Sharjah, UAE",
      "Adresse e-mail pour les demandes et réclamations : ishesdistance@gmail.com",
      "Site internet : ishes.fr",
      "Dernière mise à jour : septembre 2026"
    ]
  }
];

export default function CGVPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pt-40 pb-24">
      <ArabicBackground />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <span className="ishes-label text-ishes-blue mb-4 block">Conditions de vente</span>
            <h1 className="ishes-heading text-5xl md:text-6xl text-ishes-blue mb-6">
              CGV.<br />
              <span className="text-ishes-blue ">Conditions Générales.</span>
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
              <ScrollText className="w-4 h-4 text-ishes-blue" />
              <span>Dernière mise à jour : Septembre 2026</span>
            </div>
          </div>

          {/* Quick legal note banner */}
          <div className="bg-green-50 border border-green-100 rounded-3xl p-6 mb-10 flex gap-4 items-start">
            <ShieldCheck className="w-6 h-6 text-ishes-blue shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-ishes-blue text-sm mb-1">Garantie & Rétractation de 14 jours</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Conformément à la réglementation, vous bénéficiez de 14 jours pour vous rétracter de votre inscription et obtenir un remboursement intégral. Les paiements récurrents Stripe s'éteignent automatiquement après votre dernière mensualité.
              </p>
            </div>
          </div>

          {/* Présentiel Sections */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-ishes-blue mb-8 text-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              Association Cours Transmettre <br />
              <span className="text-lg text-gray-500 font-medium mt-2 block">Cours en présentiel à Toulouse - Année scolaire 2026/2027</span>
            </h2>
            <div className="space-y-4">
              {presentielSections.map((section, idx) => (
                <motion.div
                  key={`pres-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-ishes-blue/10 transition-colors shadow-sm"
                >
                  <h3 className="ishes-label text-ishes-blue mb-6 pb-4 border-b border-gray-100 font-bold text-lg">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-500 font-medium leading-relaxed text-[15px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Distance Sections */}
          <div>
            <h2 className="text-3xl font-bold text-ishes-blue mb-8 text-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              Institut ISHES <br />
              <span className="text-lg text-gray-500 font-medium mt-2 block">Formations à distance - Année scolaire 2026/2027</span>
            </h2>
            <div className="space-y-4">
              {distanceSections.map((section, idx) => (
                <motion.div
                  key={`dist-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-ishes-blue/10 transition-colors shadow-sm"
                >
                  <h3 className="ishes-label text-ishes-blue mb-6 pb-4 border-b border-gray-100 font-bold text-lg">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-500 font-medium leading-relaxed text-[15px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Help Center CTA */}
          <div className="mt-12 bg-gray-50 border border-gray-100 rounded-3xl p-8 text-center max-w-xl mx-auto">
            <HelpCircle className="w-8 h-8 text-ishes-blue mx-auto mb-4" />
            <h3 className="font-bold text-ishes-blue text-base mb-2">Des questions sur nos conditions ?</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">
              Notre équipe d'assistance administrative est à votre disposition pour vous éclairer sur le règlement ou les facilités de paiement.
            </p>
            <a href="/fr/contact" className="inline-flex items-center gap-2 bg-ishes-blue text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#007044] transition-all">
              Nous contacter
            </a>
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="ishes-label text-[10px] opacity-30">© {new Date().getFullYear()} Institut ISHES — Tous droits réservés.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
