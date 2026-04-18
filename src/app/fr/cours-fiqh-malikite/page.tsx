import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cours fiqh malikite | ISHES',
  description: 'Page en construction pour Cours fiqh malikite. Retrouvez bientôt tout le contenu.',
};

export default function CoursFiqhMalikitePage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafafa]">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ishes-green/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Very simple minimal header to link back easily */}
      <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-ishes-dark hover:text-ishes-green transition-colors font-semibold">
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-24 text-center">
        <div className="w-full max-w-3xl mx-auto bg-white p-12 md:p-16 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6">
          <div className="w-16 h-16 bg-ishes-green/10 text-ishes-green rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight">
            Cours fiqh malikite
          </h1>
          
          <p className="text-lg text-gray-500 font-medium">
            Cette page (<strong>/fr/cours-fiqh-malikite</strong>) a été conservée pour préserver votre référencement SEO. Elle est actuellement en cours de développement.
          </p>
          
          <div className="pt-8">
            <Link href="/" className="inline-flex items-center gap-2 bg-ishes-green hover:bg-ishes-green-hover text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-ishes-green/20">
              Retourner à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
