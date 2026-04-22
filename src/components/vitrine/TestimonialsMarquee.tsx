"use client";

import { motion } from "framer-motion";

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

export function TestimonialsMarquee() {
  return (
    <section className="bg-[#fafafa] border-t border-gray-100 py-20 md:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-ishes-green/10 text-ishes-green text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-6">
            Approuvé par la communauté
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-ishes-dark leading-tight">
            Ce que nos <span className="text-ishes-green italic">étudiants</span> pensent.
          </h2>
        </motion.div>
      </div>

      {/* Scrolling rows */}
      <div className="flex flex-col gap-5">
        {/* Row 1 — scroll left */}
        <div className="flex gap-5 w-max animate-[marquee_80s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
          {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Row 2 — scroll right */}
        <div className="flex gap-5 w-max animate-[marquee-reverse_100s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
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
    <div className="w-[300px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex gap-1 text-[#f5b82e] text-sm">{"★★★★★"}</div>
      <p className="text-gray-500 text-[13px] leading-[1.75] flex-1">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-ishes-green flex items-center justify-center text-white text-[13px] font-black shrink-0">
          {testimonial.name[0]}
        </div>
        <div className="text-left">
          <p className="text-[13px] font-bold text-ishes-dark leading-none mb-0.5">{testimonial.name}</p>
          <p className="text-[10px] font-bold tracking-[0.15em] text-ishes-green uppercase">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
