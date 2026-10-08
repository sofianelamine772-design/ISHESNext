import Script from "next/script";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Entretien gratuit 15 min — Institut ISHES",
  description:
    "Réservez un rendez-vous Zoom gratuit de 15 minutes pour discuter de l'Institut ISHES, choisir une formation et poser vos questions (adulte, enfant, Toulouse ou distance).",
  path: "/fr/rendez-vous",
  keywords: [
    "rendez-vous ishes",
    "entretien gratuit institut islamique",
    "devis formation ishes",
  ],
});

export default function RendezVousPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-blue selection:text-white pt-24 pb-12">
      {/* BG decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-ishes-blue/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-ishes-blue transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Entretien gratuit — 15 minutes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Posez vos questions sur l&apos;Institut ISHES, les cours enfants ou adultes, le présentiel à Toulouse
            ou le distanciel. Choisissez un créneau Zoom : l&apos;échange est gratuit et sans engagement.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Début de widget en ligne Calendly */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/ishes-contact/15-min-meeting-zoom" 
            style={{ minWidth: "320px", height: "700px" }}
          ></div>
          <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
          {/* Fin de widget en ligne Calendly */}
        </div>
      </div>
    </div>
  );
}
