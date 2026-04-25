"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Main grid : logo + 4 colonnes de liens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Logo + réseaux */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block transition-transform hover:scale-105 active:scale-95">
              <img src="/logo.png" alt="ISHES Logo" className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
              L'excellence de la langue arabe et des sciences islamiques à votre portée.
            </p>
            <div className="flex gap-3">
              <a href="https://www.youtube.com/@institutishes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.instagram.com/institutishes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-600 transition-all border border-gray-100">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.6.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/people/Institut-des-Sciences-Humaines-et-Spirituelles/100064820028202/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-[#1877F2] transition-all border border-gray-100">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Coran & Langues */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[13px] uppercase tracking-widest">Coran & Langues</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/fr/cours-lecture-tajwid" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Cours de Tajwid</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Distance & Présentiel</span>
              </li>
              <li>
                <Link href="/fr/cours-tajwid-intensif" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Tajwid Intensif</Link>
                <span className="text-[9px] text-[#008953] font-black uppercase tracking-tighter">Accéléré (3 mois)</span>
              </li>
              <li>
                <Link href="/fr/cours-memoriser-coran" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Mémorisation (Hifz)</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Suivi à distance</span>
              </li>
              <li>
                <Link href="/fr/cours-arabe-adulte" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Arabe Adulte</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Distance & Présentiel</span>
              </li>
              <li>
                <Link href="/fr/correction-fatiha" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Correction al Fatiha</Link>
                <span className="text-[9px] text-ishes-green font-black uppercase tracking-tighter">Gratuit</span>
              </li>
            </ul>
          </div>

          {/* Sciences Islamiques */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[13px] uppercase tracking-widest">Sciences</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/fr/cours-al-aqida" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Al-'Aqîda (Tahawiya)</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Disponible à distance</span>
              </li>
              <li>
                <Link href="/fr/cours-as-sirah" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Sîrah An-Nabawiyya</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Disponible à distance</span>
              </li>
              <li>
                <Link href="/fr/cours-fiqh-malikite" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Fiqh Mâlikite</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Distance (Matn Ibn Achir)</span>
              </li>
              <li>
                <Link href="/fr/cours-sciences-coran" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Sciences du Coran</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Disponible à distance</span>
              </li>
              <li>
                <Link href="/fr/cours-sciences-hadith" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Sciences du Hadith</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Disponible à distance</span>
              </li>
            </ul>
          </div>

          {/* Junior & Autres */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[13px] uppercase tracking-widest">Cursus Spéciaux</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/fr/cours-arabe-enfant" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Junior (4-15 ans)</Link>
                <span className="text-[9px] text-ishes-green font-black uppercase tracking-tighter">Distance & Présentiel</span>
              </li>
              <li>
                <Link href="/fr/formation-tarbya-islamya" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Tarbiya Islamiya</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Éveil spirituel enfant</span>
              </li>
              <li>
                <Link href="/fr/spiritualite-islam" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Spiritualité Musulmane</Link>
                <span className="text-[9px] text-ishes-green font-black uppercase tracking-tighter">Gratuit</span>
              </li>
              <li>
                <Link href="/fr/cours-particuliers" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Cours Particuliers</Link>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Sur devis (Coran/Arabe)</span>
              </li>
              <li>
                <Link href="/formation-enseignant" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors block">Formation Enseignant</Link>
                <span className="text-[9px] text-ishes-green font-black uppercase tracking-tighter">Nouveau</span>
              </li>
            </ul>
          </div>

          {/* Institut & Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[13px] uppercase tracking-widest">L'Institut</h4>
            <ul className="space-y-4 mb-8">
              <li><Link href="/institut" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors">À propos</Link></li>
              <li><Link href="/boutique" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors">Boutique</Link></li>
              <li><Link href="/app/admin" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors">Espace Membre</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 font-bold hover:text-[#008953] transition-colors">Contact</Link></li>
            </ul>
            <h4 className="font-bold text-gray-900 mb-4 text-[11px] uppercase tracking-widest">Nous Trouver</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-[#008953] shrink-0" />
                <span className="text-[12px] text-gray-500 font-medium">31000 Toulouse</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-[#008953] shrink-0" />
                <span className="text-[12px] text-gray-500 font-medium">06 12 34 56 78</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO links */}
        <div className="mt-10 pt-10 border-t border-gray-100">
          <h4 className="text-ishes-green font-black text-xs uppercase tracking-[0.3em] mb-6">Enseignements &amp; Formations</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {[
              ["Accueil ISHES", "/fr/"],["Boutique", "/fr/boutique"],["Civilisation Arabo-Musulmane", "/fr/civilisation-arabo-musulmane"],
              ["Contact", "/fr/contact"],["Correction Fatiha", "/fr/correction-fatiha"],["Cours à distance", "/fr/cours-a-distance"],
              ["Cours Al Aqida", "/fr/cours-al-aqida"],["Cours Anglais", "/fr/cours-anglais"],["Cours Arabe Adulte", "/fr/cours-arabe-adulte"],
              ["Cours Arabe Enfant", "/fr/cours-arabe-enfant"],["Cours As Sirah", "/fr/cours-as-sirah"],["Éducation Islamique", "/fr/cours-education-islamique"],
              ["Cours en Présentiel", "/fr/cours-en-presentiel"],["Cours Fiqh Malikite", "/fr/cours-fiqh-malikite"],["Cours Lecture Tajwid", "/fr/cours-lecture-tajwid"],
              ["Mémorisation Coran", "/fr/cours-memoriser-coran"],["Cours Particuliers Coran", "/fr/cours-particuliers-coran"],["Sciences du Coran", "/fr/cours-sciences-coran"],
              ["Sciences du Hadith", "/fr/cours-sciences-hadith"],["Tajwid Enfant", "/fr/cours-tajwid-enfant"],["Tajwid Intensif", "/fr/cours-tajwid-intensif"],
              ["Formation Nour Al Bayane", "/fr/formation-nour-al-bayane"],["Formation Tarbya Islamya", "/fr/formation-tarbya-islamya"],
              ["Plateforme Inscription", "/fr/plateforme-inscription"],["Questions Spiritualité", "/conseil-spiritualite"],["Spiritualité Islam", "/fr/spiritualite-islam"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-gray-500 hover:text-[#008953] transition-colors leading-tight">{label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} ISHES Institut. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/mentions-legales" className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">Mentions Légales</Link>
            <Link href="#" className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">CGV</Link>
            <Link href="#" className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
