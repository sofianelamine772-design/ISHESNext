"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col items-start gap-1 mb-4">
              <span className="text-2xl font-black tracking-tight text-[#101828] leading-none">
                ISHES
              </span>
              <span className="text-xs font-bold text-[#008953] tracking-widest uppercase">Institut</span>
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
              L'excellence de la langue arabe à votre portée. Pédagogie certifiée CECRL.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#008953] hover:text-white transition-colors">
                <span className="font-bold text-[10px]">FB</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#008953] hover:text-white transition-colors">
                <span className="font-bold text-[10px]">IG</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#008953] hover:text-white transition-colors">
                <span className="font-bold text-[10px]">X</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 mt-2">Formations</h4>
            <ul className="space-y-3">
              <li><Link href="/program" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Présentiel</Link></li>
              <li><Link href="/program" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Distanciel</Link></li>
              <li><Link href="/program" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Junior (6-15 ans)</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Formation Enseignant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 mt-2">Liens Utiles</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">L'Institut</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Le Campus</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Boutique</Link></li>
              <li><Link href="/app/admin" className="text-sm text-gray-500 font-medium hover:text-[#008953] transition-colors">Espace Membre</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 mt-2">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#008953] shrink-0" />
                <span className="text-sm text-gray-500 font-medium">123 Rue de la République<br/>31000 Toulouse</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-[#008953]" />
                <span className="text-sm text-gray-500 font-medium">06 12 34 56 78</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-[#008953]" />
                <span className="text-sm text-gray-500 font-medium">contact@isheecole.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} ISHES Institut. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">Mentions Légales</Link>
            <Link href="#" className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">CGV</Link>
            <Link href="#" className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
