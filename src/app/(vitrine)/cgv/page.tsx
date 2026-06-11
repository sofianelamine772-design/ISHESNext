"use client";

import { motion } from "framer-motion";
import { ScrollText, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

const sections = [
  {
    title: "1. Objet et acceptation des conditions",
    content: [
      "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre l'élève (ou son représentant légal pour les mineurs) et l'Institut ISHES, dans le cadre de toute inscription à l'une de nos formations proposées en présentiel (à Toulouse) ou à distance (distanciel).",
      "Toute validation d'inscription implique l'adhésion entière et sans réserve de l'élève aux présentes CGV."
    ]
  },
  {
    title: "2. Processus d'inscription et tarifs",
    content: [
      "L'inscription s'effectue via notre plateforme en ligne ou directement auprès de notre secrétariat administratif. Les tarifs de nos formations sont indiqués en Euros nets sur la vitrine du site internet pour chaque programme.",
      "L'élève a le choix d'inscrire un adulte ou des enfants (scolarité junior). Les tarifs des formules enfants sont dégressifs ou calculés selon le nombre d'élèves inscrits de la même famille.",
      "Pour les formations en présentiel, un acompte initial de 150 € est exigé au moment de l'inscription en ligne pour valider et réserver la place physique dans le groupe sélectionné."
    ]
  },
  {
    title: "3. Modalités de paiement (1x, 3x, 5x fois)",
    content: [
      "Le règlement s'effectue de manière sécurisée en ligne via la plateforme Stripe (cartes bancaires acceptées).",
      "L'élève a la possibilité de choisir d'étaler son paiement :",
      "• En 1 fois (règlement unique sans frais).",
      "• En 3 fois (3 mensualités consécutives prélevées automatiquement chaque mois).",
      "• En 5 fois (5 mensualités consécutives prélevées automatiquement chaque mois).",
      "Les options de paiement en 3x et 5x sont disponibles pour tout panier d'un montant égal ou supérieur à 100 €. Les prélèvements récurrents sont gérés automatiquement via Stripe Subscriptions et s'arrêtent dès que l'intégralité de la somme due est réglée."
    ]
  },
  {
    title: "4. Droit de rétractation et modalités de remboursement",
    content: [
      "Conformément aux dispositions de l'article L.221-18 du Code de la consommation, l'élève dispose d'un délai de 14 jours francs à compter de la date de validation de son paiement pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.",
      "Toute demande de rétractation ou de remboursement dans la limite de ces 14 jours doit être adressée par écrit à l'adresse e-mail : contact@ishes.fr.",
      "Passé ce délai légal de 14 jours, aucun remboursement ne pourra être accordé, et l'intégralité des frais de formation reste due à l'institut, sauf cas de force majeure dûment justifié par un document officiel (dossier médical, mutation professionnelle, etc.)."
    ]
  },
  {
    title: "5. Accès aux cours et plateforme ISHEECOLE",
    content: [
      "Dès validation du paiement de l'inscription (ou du premier prélèvement), l'élève reçoit ses identifiants par e-mail afin de créer son mot de passe et d'accéder au logiciel interne ISHEECOLE.",
      "Cette plateforme permet de suivre les cours en direct, de visionner les replays, de consulter l'emploi du temps, de suivre les absences, les notes, d'accéder aux supports et d'échanger avec les enseignants.",
      "En cas d'incident de paiement ou de mensualité rejetée, l'accès à la plateforme ISHEECOLE pourra être temporairement suspendu jusqu'à la régularisation de la situation."
    ]
  },
  {
    title: "6. Responsabilité et règlement intérieur",
    content: [
      "L'élève s'engage à respecter le règlement intérieur de l'Institut ISHES, à faire preuve d'assiduité et de respect envers l'équipe pédagogique et les autres élèves.",
      "L'Institut ISHES met en œuvre tous les moyens nécessaires pour assurer la continuité des cours à distance et en présentiel, mais ne saurait être tenu responsable d'interruptions temporaires dues à des contraintes techniques indépendantes de sa volonté."
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
            <span className="ishes-label text-ishes-green mb-4 block">Conditions de vente</span>
            <h1 className="ishes-heading text-5xl md:text-6xl text-ishes-dark mb-6">
              CGV.<br />
              <span className="text-ishes-green italic">Conditions Générales.</span>
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
              <ScrollText className="w-4 h-4 text-ishes-green" />
              <span>Dernière mise à jour : Juin 2026 — Institut ISHES</span>
            </div>
          </div>

          {/* Quick legal note banner */}
          <div className="bg-green-50 border border-green-100 rounded-3xl p-6 mb-10 flex gap-4 items-start">
            <ShieldCheck className="w-6 h-6 text-ishes-green shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-ishes-dark text-sm mb-1">Garantie & Rétractation de 14 jours</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Conformément à la réglementation, vous bénéficiez de 14 jours pour vous rétracter de votre inscription et obtenir un remboursement intégral. Les paiements récurrents Stripe s'éteignent automatiquement après votre dernière mensualité.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-ishes-green/10 transition-colors shadow-sm"
              >
                <h2 className="ishes-label text-ishes-dark mb-6 pb-4 border-b border-gray-100 font-bold text-lg">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-500 font-medium leading-relaxed text-[15px]">
                      {paragraph.includes("contact@ishes.fr") ? (
                        <>
                          Toute demande de rétractation ou de remboursement dans la limite de ces 14 jours doit être adressée par écrit à l'adresse e-mail :{" "}
                          <a href="mailto:contact@ishes.fr" className="text-ishes-green font-black hover:underline">
                            contact@ishes.fr
                          </a>
                          .
                        </>
                      ) : paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Help Center CTA */}
          <div className="mt-12 bg-gray-50 border border-gray-100 rounded-3xl p-8 text-center max-w-xl mx-auto">
            <HelpCircle className="w-8 h-8 text-ishes-green mx-auto mb-4" />
            <h3 className="font-bold text-ishes-dark text-base mb-2">Des questions sur nos conditions ?</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">
              Notre équipe d'assistance administrative est à votre disposition pour vous éclairer sur le règlement ou les facilités de paiement.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#008953] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#007044] transition-all">
              Nous contacter
            </a>
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="ishes-label text-[10px] opacity-30">© {new Date().getFullYear()} Institut ISHES — Tous droits réservés. Association loi 1901.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
