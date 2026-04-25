"use client";

import { motion } from "framer-motion";
import { Shield, ExternalLink } from "lucide-react";
import { ArabicBackground } from "@/components/ArabicBackground";

const sections = [
  {
    title: "Informations légales",
    content: [
      "Le site et le nom de domaine www.ishes.fr sont la propriété de Mr Riad Latreche et Mme Rachida Latreche.",
      "Le site www.ishes.fr est optimisé pour les navigateurs de génération récente (Mozilla Firefox, MS Explorer, Google Chrome, Safari, Opéra).",
      "Le site est hébergé chez l'entreprise OVH (SIREN 424 761 419), domicilié au 2 rue Kellermann, 59100 Roubaix."
    ]
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "Le présent site constitue une œuvre dont Institut ISHES est l'auteur au sens des articles L.111.1 et suivants du Code de la propriété intellectuelle.",
      "Les photographies, textes, slogans, dessins, images, séquences animées sonores ou non ainsi que toutes œuvres intégrées dans le site sont la propriété de Institut ISHES ou de tiers ayant autorisé Institut ISHES à les utiliser.",
      "Toute reproduction, représentation, utilisation ou modification mise à part à titre informatif, par quelque procédé que ce soit et sur quelque support que ce soit, de tout ou partie du site, de tout ou partie des différentes œuvres qui le composent, sans avoir obtenu l'autorisation préalable de Institut ISHES est strictement interdite et constitue un délit de contrefaçon."
    ]
  },
  {
    title: "Sites liés",
    content: [
      "Institut ISHES autorise tout site Internet ou tout support à mettre en place un lien hypertexte en direction de son contenu à l'exception de ceux diffusant des contenus à caractère polémique, pornographique, xénophobe, contraire à la décence ou aux bonnes mœurs.",
      "Institut ISHES décline toute responsabilité concernant le contenu disponible sur les autres sites Internet vers lesquels il a créé des liens ou qui auraient pu être créés à son insu. L'accès à tous les autres sites Internet liés à ce site Internet se fait aux risques de l'utilisateur.",
      "Institut ISHES décline aussi toute responsabilité pour toutes les informations et matériaux contenus sur des sites tiers où figurent des liens renvoyant au site Internet www.ishes.fr."
    ]
  },
  {
    title: "Caractère des informations dans le site",
    content: [
      "Toutes les informations présentes sur ce site Internet n'ont qu'un caractère informatif. Ces informations n'engagent pas contractuellement Institut ISHES qui décline toute responsabilité sur les décisions qui pourraient être prises à partir de ces informations. Le contenu du site est susceptible de modification sans préavis."
    ]
  },
  {
    title: "Protection des données personnelles",
    content: [
      "L'Institut ISHES enregistre informatiquement toutes les données personnelles des formulaires d'inscription pour une gestion en interne. Dans le cadre du Règlement Général de la Protection des Données (RGPD), ces informations peuvent être consultées, modifiées et supprimées sur demande.",
      "Pour toute demande relative à vos données personnelles, contactez-nous à : contact@ishes.fr"
    ]
  },
  {
    title: "Dysfonctionnement et virus",
    content: [
      "Institut ISHES ne pourra pas être tenu responsable de dommages directs ou indirects, pertes ou frais, résultant de l'utilisation de ce site Internet, ou de l'impossibilité pour un tiers de l'utiliser, ou d'un mauvais fonctionnement, d'une interruption, d'un virus, ou encore d'un problème de ligne ou de système."
    ]
  }
];

export default function MentionsLegales() {
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
            <span className="ishes-label text-ishes-green mb-4 block">Transparence & Conformité</span>
            <h1 className="ishes-heading text-5xl md:text-6xl text-ishes-dark mb-6">
              Mentions<br />
              <span className="text-ishes-green italic">légales.</span>
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
              <Shield className="w-4 h-4 text-ishes-green" />
              <span>Dernière mise à jour : Mars 2025 — Institut ISHES, 41 Boulevard de Thibaud, 31100 Toulouse</span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-2">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-ishes-green/10 transition-colors"
              >
                <h2 className="ishes-label text-ishes-dark mb-6 pb-4 border-b border-gray-100">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-500 font-medium leading-relaxed text-[15px]">
                      {paragraph.includes("contact@ishes.fr") ? (
                        <>
                          Pour toute demande relative à vos données personnelles, contactez-nous à :{" "}
                          <a href="mailto:contact@ishes.fr" className="text-ishes-green font-black hover:underline">
                            contact@ishes.fr
                          </a>
                        </>
                      ) : paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="ishes-label text-[10px] opacity-30">© {new Date().getFullYear()} Institut ISHES — Tous droits réservés</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
