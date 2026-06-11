"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, HelpCircle, Mail } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

const sections = [
  {
    title: "1. Introduction et responsable du traitement",
    content: [
      "L'Institut ISHES attache une grande importance à la protection et au respect de votre vie privée. La présente Politique de Confidentialité a pour but de vous informer en toute transparence sur la manière dont nous collectons, utilisons et protégeons vos données personnelles.",
      "Le responsable du traitement des données est l'Institut ISHES, représenté par son bureau administratif."
    ]
  },
  {
    title: "2. Données personnelles collectées",
    content: [
      "Dans le cadre de votre inscription ou de votre navigation sur notre site, nous pouvons collecter les données suivantes :",
      "• Données d'identification : Nom, prénom, civilité (et ceux du représentant légal pour les mineurs).",
      "• Données de contact : Adresse e-mail, numéro de téléphone.",
      "• Informations pédagogiques : Niveau d'arabe/tajwid actuel, créneau horaire souhaité.",
      "• Données de facturation et de paiement : Toutes les transactions financières sont traitées de manière hautement sécurisée par notre prestataire Stripe. L'Institut ISHES ne stocke aucun numéro de carte bancaire."
    ]
  },
  {
    title: "3. Finalités de la collecte",
    content: [
      "Vos données personnelles sont collectées et traitées uniquement pour des finalités explicites et légitimes :",
      "• Gestion administrative des inscriptions, planification des classes et affectation des élèves.",
      "• Création et gestion des accès sécurisés à la plateforme d'apprentissage ISHEECOLE (cours, replays, suivi pédagogique).",
      "• Traitement des paiements (1x, 3x ou 5x sans frais) via notre partenaire Stripe.",
      "• Communication avec les élèves et les parents (informations administratives, alertes de planification, groupes d'échange pédagogique WhatsApp)."
    ]
  },
  {
    title: "4. Durée de conservation des données",
    content: [
      "Nous conservons vos données personnelles uniquement pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées :",
      "• Données d'inscription et de scolarité : Conservées pendant toute la durée de votre parcours au sein de l'institut, puis archivées conformément aux obligations légales de conservation des pièces comptables et administratives.",
      "• Données de contact : Conservées pendant un maximum de 3 ans après votre dernier contact ou activité au sein de l'institut avant d'être définitivement supprimées ou anonymisées."
    ]
  },
  {
    title: "5. Sécurité et destinataires des données",
    content: [
      "Vos données sont hébergées de manière confidentielle et sécurisée sur nos serveurs Supabase situés en Europe.",
      "L'accès aux données personnelles est strictement limité au personnel autorisé de l'Institut ISHES pour des besoins administratifs et pédagogiques.",
      "Aucune donnée personnelle n'est vendue, louée ou cédée à des tiers à des fins publicitaires ou commerciales."
    ]
  },
  {
    title: "6. Vos droits (RGPD)",
    content: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 'Informatique et Libertés', vous disposez des droits suivants :",
      "• Droit d'accès et de rectification de vos données.",
      "• Droit à l'effacement de vos données (droit à l'oubli) sous réserve des obligations légales de conservation.",
      "• Droit à la limitation et d'opposition au traitement de vos données.",
      "Vous pouvez exercer vos droits à tout moment en nous envoyant une demande écrite à l'adresse suivante : contact@ishes.fr."
    ]
  }
];

export default function PolitiqueConfidentialitePage() {
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
            <span className="ishes-label text-ishes-green mb-4 block">Confidentialité & Sécurité</span>
            <h1 className="ishes-heading text-5xl md:text-6xl text-ishes-dark mb-6">
              Politique de<br />
              <span className="text-ishes-green italic">confidentialité.</span>
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
              <Lock className="w-4 h-4 text-ishes-green" />
              <span>Dernière mise à jour : Juin 2026 — Institut ISHES</span>
            </div>
          </div>

          {/* Quick legal note banner */}
          <div className="bg-green-50 border border-green-100 rounded-3xl p-6 mb-10 flex gap-4 items-start">
            <ShieldCheck className="w-6 h-6 text-ishes-green shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-ishes-dark text-sm mb-1">Protection de vos données personnelles</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Vos données sont collectées uniquement pour la gestion de votre scolarité et de vos paiements. Nous appliquons les normes de sécurité les plus strictes en partenariat avec Supabase et Stripe pour protéger vos informations.
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
                          Vous pouvez exercer vos droits à tout moment en nous envoyant une demande écrite à l'adresse suivante :{" "}
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
            <h3 className="font-bold text-ishes-dark text-base mb-2">Des questions sur vos données ?</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">
              Pour toute question concernant notre politique de confidentialité ou vos données personnelles, n'hésitez pas à nous écrire directement par e-mail.
            </p>
            <a href="mailto:contact@ishes.fr" className="inline-flex items-center gap-2 bg-[#008953] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#007044] transition-all">
              <Mail className="w-4 h-4" /> Nous écrire
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
