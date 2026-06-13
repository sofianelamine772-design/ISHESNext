"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArabicBackground } from "@/components/ArabicBackground";
import { CheckCircle2, ChevronRight, ArrowLeft, BookOpen, GraduationCap, MessageCircle, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

type Option = "oui" | "un-peu" | "non";

interface Question {
  id: number;
  text: string;
  example?: string;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  questions: Question[];
}

const ARABE_QUESTIONS: Category[] = [
  {
    id: "lettres",
    title: "Partie 1 — Les Lettres",
    subtitle: "Évaluation de la reconnaissance alphabétique",
    icon: <BookOpen className="w-5 h-5" />,
    questions: [
      { id: 1, text: "Votre enfant connaît-il les lettres de l’alphabet arabe ?" },
      { id: 2, text: "Votre enfant reconnaît-il les lettres dans le désordre ?", example: "Par exemple : si on lui montre une lettre au hasard, peut-il la nommer ?" },
      { id: 3, text: "Votre enfant connaît-il les différentes formes des lettres ?", example: "Forme isolée, début, milieu et fin de mot" },
    ]
  },
  {
    id: "lecture",
    title: "Partie 2 — La Lecture",
    subtitle: "Évaluation de la fluidité et du déchiffrage",
    icon: <GraduationCap className="w-5 h-5" />,
    questions: [
      { id: 4, text: "Votre enfant connaît-il les voyelles : Fatha ( ـَ ), Kasra ( ـِ ), Damma ( ـُ ) ?" },
      { id: 5, text: "Votre enfant sait-il lire des syllabes simples ?", example: "Exemple : بَ / تُ / مِ" },
      { id: 6, text: "Votre enfant sait-il lire des mots simples ?", example: "Exemple : بَاب / كِتَاب / مُسْلِم" },
      { id: 7, text: "Votre enfant sait-il déchiffrer des phrases simples ?" },
    ]
  }
];

const TAJWID_QUESTIONS: Category[] = [
  {
    id: "bases",
    title: "Partie 1 — Les Bases",
    subtitle: "Évaluation du parcours antérieur",
    icon: <BookOpen className="w-5 h-5" />,
    questions: [
      { id: 1, text: "Votre enfant a-t-il déjà suivi des cours de Tajwid ?" },
      { id: 2, text: "Votre enfant a-t-il appris les makharij al-huruf ?", example: "Les points de sortie des lettres" },
      { id: 3, text: "Les makharij ont-ils été corrigés par un enseignant de Tajwid ?" },
    ]
  },
  {
    id: "prononciation",
    title: "Partie 2 — Prononciation & Règles",
    subtitle: "Évaluation de la pratique",
    icon: <GraduationCap className="w-5 h-5" />,
    questions: [
      { id: 4, text: "Votre enfant connaît-il les lettres lourdes (emphatiques) et légères ?" },
      { id: 5, text: "Votre enfant sait-il lire avec les voyelles correctement ?", example: "Fatha, Kasra, Damma" },
      { id: 6, text: "Votre enfant a-t-il appris les prolongations (Moudoud) ?" },
      { id: 7, text: "Votre enfant applique-t-il certaines règles de Tajwid pendant la lecture ?" },
      { id: 8, text: "Votre enfant lit-il le Coran avec fluidité ?" },
    ]
  }
];

export default function TestPositionnement() {
  const [testType, setTestType] = useState<"arabe" | "tajwid" | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [isFinished, setIsFinished] = useState(false);

  const categories = testType === "arabe" ? ARABE_QUESTIONS : TAJWID_QUESTIONS;
  const allQuestions = categories.flatMap(c => c.questions);
  const currentQuestion = allQuestions[step];
  const progress = ((step) / allQuestions.length) * 100;

  const handleAnswer = (option: Option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
    if (step < allQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const getResult = () => {
    const values = Object.values(answers);
    const nonCount = values.filter(v => v === "non").length;
    const unPeuCount = values.filter(v => v === "un-peu").length;
    const ouiCount = values.filter(v => v === "oui").length;

    // Logique Arabe & Tajwid (similaire dans votre demande)
    if (nonCount >= 2 || unPeuCount >= 2) {
      return "debutant";
    }
    if (ouiCount >= allQuestions.length - 1) {
      return "niveau1plus";
    }
    return "superieur";
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6 relative overflow-hidden">
        <ArabicBackground />

        <div className="max-w-3xl mx-auto relative z-10">
          {!testType ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="inline-block bg-[#c8a96e]/10 text-[#c8a96e] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                Orientation Enfants
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-ishes-dark mb-6 uppercase leading-tight">
                Test de <br /><span className="text-[#c8a96e] italic">Niveau.</span>
              </h1>
              <p className="text-gray-500 font-medium mb-12 max-w-xl mx-auto">
                Ce test rapide nous permet d'orienter au mieux votre enfant pour qu'il progresse sereinement bi idhniLLAH.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setTestType("arabe")}
                  className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all text-left flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-ishes-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-[#c8a96e]" />
                  </div>
                  <h3 className="text-xl font-black text-ishes-dark mb-2 uppercase">Langue Arabe</h3>
                  <p className="text-xs text-gray-400 font-bold mb-6">Évaluez le niveau de lecture et d'écriture.</p>
                  <div className="mt-auto flex items-center gap-2 text-[#c8a96e] font-black text-[10px] uppercase tracking-widest">
                    Commencer <ChevronRight className="w-3 h-3" />
                  </div>
                </button>

                <button
                  onClick={() => setTestType("tajwid")}
                  className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all text-left flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#c8a96e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-ishes-dark mb-2 uppercase">Tajwid</h3>
                  <p className="text-xs text-gray-400 font-bold mb-6">Évaluez la maîtrise des règles de récitation.</p>
                  <div className="mt-auto flex items-center gap-2 text-[#c8a96e] font-black text-[10px] uppercase tracking-widest">
                    Commencer <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </motion.div>
          ) : !isFinished ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-50 relative overflow-hidden"
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#c8a96e]"
                />
              </div>

              <button
                onClick={() => step === 0 ? setTestType(null) : setStep(step - 1)}
                className="mb-10 flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-ishes-dark transition-colors"
              >
                <ArrowLeft className="w-3 h-3" /> Retour
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#c8a96e]/10 flex items-center justify-center text-[#c8a96e]">
                      {categories.find(c => c.questions.includes(currentQuestion))?.icon}
                    </div>
                    <span className="text-[10px] font-black text-[#c8a96e] uppercase tracking-widest">
                      {categories.find(c => c.questions.includes(currentQuestion))?.title}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-ishes-dark mb-4 leading-tight">
                    {currentQuestion.text}
                  </h2>

                  {currentQuestion.example && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-10 italic text-sm text-gray-500 font-medium">
                      {currentQuestion.example}
                    </div>
                  )}

                  <div className="space-y-4">
                    {(["oui", "un-peu", "non"] as Option[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="w-full p-6 rounded-2xl border-2 border-gray-50 bg-gray-50 hover:border-[#c8a96e] hover:bg-white transition-all text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-ishes-dark uppercase tracking-widest text-sm">
                            {option === "oui" ? "Oui" : option === "un-peu" ? "Un peu" : "Non"}
                          </span>
                          <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#c8a96e] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#c8a96e] scale-0 group-hover:scale-100 transition-transform" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
                <span>Question {step + 1} / {allQuestions.length}</span>
                <span>{Math.round(progress)}% complété</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-50 text-center"
            >
              <div className="w-20 h-20 bg-ishes-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-10 h-10 text-ishes-green" />
              </div>

              <h2 className="text-3xl font-black text-ishes-dark mb-4 uppercase">Test Terminé !</h2>
              <p className="text-gray-500 font-medium mb-10">Voici l'orientation recommandée pour votre enfant :</p>

              {result === "debutant" ? (
                <div className="bg-blue-50 border border-blue-100 rounded-[2.5rem] p-10 mb-10">
                  <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                    Niveau Débutant
                  </span>
                  <p className="text-blue-900 font-bold text-lg mb-8 leading-relaxed">
                    Nous conseillons le niveau débutant afin de construire des bases solides et progresser sereinement.
                  </p>
                  <Link 
                    href="/inscription?plan=presentiel-global"
                    className="inline-flex items-center gap-3 bg-[#c8a96e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#b0935b] transition-all shadow-lg shadow-[#c8a96e]/20"
                  >
                    Inscrire mon enfant <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : result === "niveau1plus" ? (
                <div className="bg-green-50 border border-green-100 rounded-[2.5rem] p-10 mb-10">
                  <span className="inline-block bg-green-100 text-ishes-green px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                    Niveau 1+
                  </span>
                  <p className="text-green-900 font-bold text-lg mb-8 leading-relaxed">
                    Félicitations ! Votre enfant peut probablement intégrer le niveau 1+.
                  </p>
                  <Link 
                    href="/inscription?plan=presentiel-global"
                    className="inline-flex items-center gap-3 bg-[#c8a96e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#b0935b] transition-all shadow-lg shadow-[#c8a96e]/20"
                  >
                    Inscrire mon enfant <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="bg-[#c8a96e]/5 border border-[#c8a96e]/10 rounded-[2.5rem] p-10 mb-10">
                  <span className="inline-block bg-[#c8a96e]/10 text-[#c8a96e] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                    Niveau Avancé
                  </span>
                  <p className="text-[#c8a96e] font-bold text-lg mb-8 leading-relaxed">
                    Votre enfant semble maîtriser ces compétences. Un test oral est nécessaire pour un niveau plus avancé.
                  </p>
                  <a
                    href="https://wa.me/33600000000"
                    target="_blank"
                    className="inline-flex items-center gap-3 bg-[#c8a96e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#b0935b] transition-all"
                  >
                    Contacter via WhatsApp <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              )}

              <button
                onClick={() => { setStep(0); setAnswers({}); setIsFinished(false); setTestType(null); }}
                className="text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-ishes-dark transition-colors"
              >
                Recommencer le test
              </button>
            </motion.div>
          )}

          {/* Disclaimer Footer */}
          <div className="mt-12 flex items-start gap-4 p-6 bg-[#c8a96e]/10 border border-[#c8a96e]/20 text-gray-700 rounded-3xl text-xs font-semibold leading-relaxed">
            <AlertCircle className="w-5 h-5 text-[#c8a96e] shrink-0 mt-0.5" />
            <p>
              Ce test vous permet de choisir le niveau le plus adapté à votre enfant en cas d’hésitation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
