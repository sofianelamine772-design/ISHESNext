"use client";

import { motion } from "framer-motion";

export function SocialSection() {
  return (
    <section className="bg-white border-t border-gray-100 py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold tracking-[0.3em] text-ishes-green uppercase mb-4">Communauté</p>
          <h2 className="text-3xl md:text-4xl font-black text-ishes-dark mb-3">
            Rejoignez-nous sur les réseaux
          </h2>
          <p className="text-gray-400 text-[15px] mb-16">
            Suivez notre actualité, nos cours et nos publications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Institut-des-Sciences-Humaines-et-Spirituelles/100064820028202/"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 w-full sm:w-auto"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[#f0f4ff] group-hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-[#1877F2]/25 group-hover:-translate-y-2">
                <svg className="w-14 h-14 md:w-16 md:h-16 fill-[#1877F2] group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-gray-500 group-hover:text-[#1877F2] transition-colors">Facebook</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/institutishes/"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 w-full sm:w-auto"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[#fff0f5] group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-[#ee2a7b]/25 group-hover:-translate-y-2">
                <svg className="w-14 h-14 md:w-16 md:h-16 fill-[#ee2a7b] group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.6.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-gray-500 group-hover:text-[#ee2a7b] transition-colors">Instagram</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@institutishes"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 w-full sm:w-auto"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gray-50 group-hover:bg-black flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-black/20 group-hover:-translate-y-2">
                <svg className="w-14 h-14 md:w-16 md:h-16 fill-gray-800 group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors">TikTok</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
