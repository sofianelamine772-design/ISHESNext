// Composant de fond avec calligraphie arabe dispersée sur toute la page
// Utiliser dans chaque page vitrine

export function ArabicBackground() {
  const texts = [
    { text: "ﷻ", size: "text-[380px]", top: "top-[5%]", left: "left-[2%]", rotate: "rotate-[-12deg]", opacity: "opacity-[0.06]" },
    { text: "علم", size: "text-[260px]", top: "top-[15%]", left: "left-[60%]", rotate: "rotate-[8deg]", opacity: "opacity-[0.05]" },
    { text: "الإسلام", size: "text-[180px]", top: "top-[35%]", left: "left-[-2%]", rotate: "rotate-[-5deg]", opacity: "opacity-[0.045]" },
    { text: "نور", size: "text-[320px]", top: "top-[50%]", left: "left-[55%]", rotate: "rotate-[15deg]", opacity: "opacity-[0.06]" },
    { text: "حكمة", size: "text-[200px]", top: "top-[65%]", left: "left-[10%]", rotate: "rotate-[-8deg]", opacity: "opacity-[0.045]" },
    { text: "صبر", size: "text-[280px]", top: "top-[78%]", left: "left-[40%]", rotate: "rotate-[6deg]", opacity: "opacity-[0.05]" },
    { text: "بسم الله", size: "text-[140px]", top: "top-[88%]", left: "left-[70%]", rotate: "rotate-[-10deg]", opacity: "opacity-[0.05]" },
    { text: "الحمد لله", size: "text-[170px]", top: "top-[25%]", left: "left-[30%]", rotate: "rotate-[4deg]", opacity: "opacity-[0.04]" },
    { text: "الله", size: "text-[420px]", top: "top-[60%]", left: "left-[-5%]", rotate: "rotate-[-6deg]", opacity: "opacity-[0.035]" },
    { text: "تعليم", size: "text-[150px]", top: "top-[42%]", left: "left-[75%]", rotate: "rotate-[11deg]", opacity: "opacity-[0.04]" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {texts.map((t, i) => (
        <span
          key={i}
          className={`absolute ${t.size} leading-none font-serif font-bold text-ishes-dark ${t.top} ${t.left} ${t.rotate} ${t.opacity} transition-none`}
          style={{ fontFamily: "serif" }}
        >
          {t.text}
        </span>
      ))}
    </div>
  );
}
