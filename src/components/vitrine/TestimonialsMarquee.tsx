"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonialsRow1 = [
  { name: "Fanny Vincent", role: "Parent d'élève", text: "Pédagogie excellente, explications simples. Les enfants adorent les cours à distance." },
  { name: "Abdoullah M.", role: "Étudiant", text: "Efficace, sérieux et très professionnel. Je recommande vivement pour progresser vite." },
  { name: "Sarah L.", role: "Étudiante", text: "La méthode Nour Al Bayan est incroyable. On apprend à lire très rapidement !" },
  { name: "Fatmaa Elbechir", role: "Étudiante", text: "Un institut d'exception. Une référence pour l'apprentissage. Professeurs bienveillants et qualifiés." },
  { name: "Karim B.", role: "Étudiant", text: "Les cours de Fiqh malikite sont très bien structurés. J'apprends énormément chaque semaine." },
  { name: "Nadia S.", role: "Étudiante", text: "Je suis bluffée par la qualité des enseignants. La Spiritualité musulmane est enseignée avec profondeur." },
  { name: "Youssef A.", role: "Parent d'élève", text: "Mes enfants progressent vraiment vite en arabe. L'équipe est toujours disponible et à l'écoute." },
  { name: "Amira T.", role: "Étudiante", text: "La formation à distance est très bien pensée. Le contenu est riche et très bien présenté." },
];

const testimonialsRow2 = [
  { name: "Imane R.", role: "Étudiante", text: "Le cours de Sîrah du Prophète ﷺ m'a vraiment touchée. Enseigné avec passion et rigueur." },
  { name: "Hassan D.", role: "Étudiant", text: "Grâce à ISHES, j'ai enfin compris les bases du Tajwid. Méthode claire et progressive." },
  { name: "Leila M.", role: "Étudiante", text: "Je recommande à 100%. Les enseignants sont compétents et très pédagogues." },
  { name: "Omar K.", role: "Parent d'élève", text: "Mon fils a fait d'énormes progrès en lecture du Coran. Merci à toute l'équipe ISHES !" },
  { name: "Soraya H.", role: "Étudiante", text: "La Tarbya Islamya m'a aidée à retrouver un équilibre spirituel dans ma vie quotidienne." },
  { name: "Bilal N.", role: "Étudiant", text: "Cours sérieux, contenu enrichissant. On sent que les fondateurs ont mis le cœur à l'ouvrage." },
  { name: "Zineb F.", role: "Étudiante", text: "ISHES est une vraie perle. Des connaissances profondes transmises avec bienveillance." },
  { name: "Rachid O.", role: "Parent d'élève", text: "Mes filles adorent leurs cours. La progression est rapide et bien encadrée." },
];

const getGoogleColor = (char: string) => {
  const colors = [
    'bg-[#EA4335]', // Red
    'bg-[#4285F4]', // Blue
    'bg-[#FBBC05]', // Yellow
    'bg-[#34A853]', // Green
    'bg-[#9C27B0]', // Purple
    'bg-[#009688]', // Teal
    'bg-[#FF9800]', // Orange
    'bg-[#E91E63]', // Pink
  ];
  const index = char.toUpperCase().charCodeAt(0) % colors.length;
  return colors[index];
};

export function TestimonialsMarquee() {
  return (
    <section className="bg-gradient-to-b from-[#fafafa] to-white border-t border-gray-100 py-20 md:py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ishes-green/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-ishes-green/10 text-ishes-green text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6">
            Approuvé par la communauté
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight flex items-center justify-center gap-3 flex-wrap">
            Ce que nos <span className="text-ishes-green italic">étudiants</span> pensent.
          </h2>
        </motion.div>
      </div>

      {/* Scrolling rows */}
      <div className="flex flex-col gap-6 relative z-10">
        {/* Row 1 — scroll left */}
        <div className="flex gap-6 w-max animate-[marquee_80s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
          {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Row 2 — scroll right */}
        <div className="flex gap-6 w-max animate-[marquee-reverse_100s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
          {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="w-[340px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 hover:scale-[1.02] hover:border-gray-200 transition-all duration-300 p-7 flex flex-col gap-5 relative group overflow-hidden cursor-default">
      
      {/* Background Quote Icon */}
      <div className="absolute -top-2 right-4 text-[100px] font-serif leading-none text-gray-50 group-hover:text-blue-500/[0.03] transition-colors duration-500 select-none pointer-events-none">
        "
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-10 h-10 rounded-full ${getGoogleColor(testimonial.name[0])} flex items-center justify-center text-white text-[16px] font-medium shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {testimonial.name[0]}
        </div>
        <div className="text-left flex-1">
          <p className="text-[14px] font-bold text-gray-900 leading-none mb-1">{testimonial.name}</p>
          <div className="flex gap-0.5 text-[#FBBC05] text-[15px]">{"★★★★★"}</div>
        </div>
        
        {/* Fake Google Logo Icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
      
      <p className="text-[#3c4043] group-hover:text-black transition-colors text-[14px] leading-[1.6] flex-1 relative z-10">"{testimonial.text}"</p>
      
      <div className="text-[11px] font-medium tracking-wide text-gray-400 uppercase pt-2 border-t border-gray-50 relative z-10">
        {testimonial.role}
      </div>
    </div>
  );
}
