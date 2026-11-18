import { Metadata } from 'next';
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitrineFaq } from "@/components/vitrine/VitrineFaq";
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Calendar, UserRound, Award,
  BookOpen, MessageCircle, Sparkles, CheckCircle2,
  Lock, Users, Sun, SunMedium, ShieldCheck, CreditCard
} from 'lucide-react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PRESENTIEL_ENFANT_FAQS = [
  {
    question: "À quel âge inscrire son enfant à l’école d’arabe et de Coran ISHES à Toulouse ?",
    answer:
      "Les cours enfants en présentiel de l’Institut ISHES à Toulouse accueillent les enfants de 4 à 15 ans. Les groupes sont constitués selon l’âge et le niveau, des plus petits aux collégiens, pour que chacun progresse à son rythme. Les plus jeunes découvrent l’arabe et le Coran par des méthodes ludiques ; les plus grands approfondissent la lecture avec Tajwid, l’écriture et la compréhension des sourates.",
  },
  {
    question: "Mercredi, samedi ou dimanche : quels créneaux pour les cours enfants à Toulouse ?",
    answer:
      "Cinq créneaux sont proposés : le mercredi après-midi (13h30-16h30), le samedi matin (9h00-12h00), le samedi après-midi (13h30-16h30), le dimanche matin (9h00-12h00) et le dimanche après-midi (13h30-16h30). Vous choisissez un seul créneau à l’inscription et votre enfant vient une seule fois par semaine, dans les locaux de l’institut, 41 boulevard de Thibaud à Toulouse. Quel que soit le jour, il suit l’ensemble du programme.",
  },
  {
    question: "Qu’apprend un enfant en cours d’arabe et de Coran à Toulouse chez ISHES ?",
    answer:
      "Trois matières, chaque semaine, dans la même demi-journée. En Coran : lecture avec Tajwid, mémorisation et compréhension des sourates. En arabe : lecture, écriture, vocabulaire et expression pour comprendre et s’exprimer avec confiance. En éducation islamique : les valeurs de l’islam, les histoires des Prophètes, l’éthique musulmane et les bonnes manières au quotidien. L’ensemble est porté par une pédagogie active et bienveillante.",
  },
  {
    question: "Combien coûte l’école arabe et Coran pour enfants à Toulouse ?",
    answer:
      "Le tarif est de 480 € par an pour l’ensemble du programme (arabe, Coran et éducation islamique), soit une demi-journée hebdomadaire pendant toute l’année. Le paiement peut se faire en 1, 3, 5 ou 10 fois, en ligne et de façon sécurisée. Pour toute question avant d’inscrire votre enfant, l’équipe de l’Institut ISHES répond sur WhatsApp.",
  },
  {
    question: "Comment inscrire mon enfant aux cours en présentiel à Toulouse ?",
    answer:
      "L’inscription se fait en ligne depuis le bouton « Inscrire mon enfant » : vous renseignez l’enfant, choisissez le créneau (mercredi, samedi ou dimanche, matin ou après-midi) et la formule de paiement. Les groupes sont ensuite ajustés selon l’âge et le niveau de chaque enfant. Si vous hésitez entre deux créneaux ou deux niveaux, un échange sur WhatsApp permet de poser vos questions avant de valider.",
  },
  {
    question: "Les groupes d’enfants sont-ils mélangés ou constitués par niveau ?",
    answer:
      "Par âge et par niveau. Les groupes sont à effectifs réduits pour permettre un suivi personnalisé : un enfant qui débute n’est pas placé avec des élèves qui lisent déjà le Coran, et un enfant plus avancé n’attend pas les autres. Des enseignants qualifiés accompagnent chacun avec attention, dans un environnement sain, motivant et sécurisant, où les valeurs islamiques sont vécues au quotidien.",
  },
  {
    question: "Un enfant reçoit-il une attestation à la fin de l’année scolaire ?",
    answer:
      "Oui. Une attestation de suivi est remise en fin d’année, inch’Allah, aux enfants ayant suivi le programme. Elle témoigne de leur assiduité et de leur progression en arabe, en Coran et en éducation islamique. Au-delà du document, l’objectif de l’Institut ISHES est que l’enfant termine l’année avec des acquis solides et l’envie de continuer.",
  },
  {
    question: "Une demi-journée par semaine suffit-elle pour progresser en arabe et en Coran ?",
    answer:
      "Oui, si elle est régulière. Les trois heures hebdomadaires regroupent arabe, Coran et éducation islamique, avec des méthodes ludiques et interactives qui maintiennent l’attention des enfants. La régularité d’une séance par semaine, sur toute l’année, construit des acquis durables, surtout quand les parents encouragent quelques minutes de révision à la maison. Les petits groupes permettent à l’enseignant de vérifier que chaque enfant suit.",
  },
  {
    question: "Y a-t-il des cours de Coran pour enfants le dimanche à Toulouse ?",
    answer:
      "Oui. L’Institut ISHES propose deux créneaux le dimanche : le matin de 9h00 à 12h00 et l’après-midi de 13h30 à 16h30, en plus du mercredi après-midi et du samedi. Chaque créneau couvre le programme complet : Coran avec Tajwid, arabe et éducation islamique. Le dimanche permet aux familles dont les enfants ont déjà des activités le mercredi ou le samedi de garder ce rendez-vous hebdomadaire.",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fr/cours-presentiel-enfant") },
  openGraph: {
    url: absoluteUrl("/fr/cours-presentiel-enfant"),
    siteName: "Institut ISHES",
    locale: "fr_FR",
    type: "website",
  },
  title: "Cours Enfants Présentiel | Arabe, Coran & Éducation Islamique | ISHES",
  description: "Un programme complet et bienveillant pour accompagner les enfants de 4 à 15 ans dans l'apprentissage de leur religion à Toulouse.",
  keywords: "cours arabe enfant toulouse, coran enfant toulouse, éducation islamique enfant, ishes"
};

export default function CoursPresentielEnfantPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-[#C69C6D] selection:text-white pb-10">
      <JsonLd data={faqJsonLd(PRESENTIEL_ENFANT_FAQS)} />
      <Navbar />

      {/* Hero Section */}
      <div className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#C69C6D] bg-[#C69C6D]/10 px-4 py-2 rounded-full uppercase tracking-widest mb-6 border border-[#C69C6D]/20">
              <MapPin className="w-4 h-4" />
              PRÉSENTIEL À TOULOUSE
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black text-ishes-blue leading-[1.1] tracking-tight mb-2">
              Cours Enfants
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] text-[#C69C6D] mb-8 leading-tight">
              Arabe, Coran &<br/>Éducation Islamique
            </h2>
            
            <p className="text-gray-600 font-medium leading-relaxed mb-10 max-w-lg text-lg">
              Un programme complet et bienveillant pour accompagner les enfants de 4 à 15 ans dans l'apprentissage de leur religion et le développement de leur personnalité.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/inscription?plan=presentiel-global&audience=enfant" 
                className="w-full sm:w-auto bg-[#C69C6D] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#b0885c] transition-all shadow-xl shadow-[#C69C6D]/20 hover:-translate-y-1 text-[15px]"
              >
                Inscrire mon enfant
              </Link>
              <a 
                href="https://wa.me/33600000000" 
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-white text-[#0a192f] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-[15px]"
              >
                Nous contacter <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] border-[6px] border-white bg-white">
              <Image src="/images/formations/presentiel-enfants-1.png" alt="Cours en présentiel pour enfants à Toulouse — Institut ISHES" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Un programme complet */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl md:text-3xl font-black text-center text-ishes-blue mb-12">
          Un programme complet et équilibré
          <div className="w-12 h-1 bg-[#C69C6D] mx-auto mt-4 rounded-full"></div>
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <BookOpen className="w-8 h-8 text-[#C69C6D]"/>, title: "Cours de Coran", desc: "Apprentissage de la lecture du Coran avec Tajwid, mémorisation et compréhension des sourates." },
            { icon: <span className="text-3xl font-black text-[#C69C6D] leading-none mb-1">خ</span>, title: "Cours d'Arabe", desc: "Apprentissage de la langue arabe : lecture, écriture, vocabulaire et expression pour comprendre et s'exprimer avec confiance." },
            { icon: <div className="w-8 h-8 relative flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-[#C69C6D]">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>, title: "Éducation Islamique", desc: "Découverte des valeurs islamiques, des histoires des Prophètes, de l'éthique musulmane et des bonnes manières au quotidien." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-10 text-center flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-[#0a192f] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#0a192f]/20">
                {item.icon}
              </div>
              <h4 className="font-black text-ishes-blue text-[17px] mb-4">{item.title}</h4>
              <p className="text-gray-600 font-medium text-[15px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Organisation des cours */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl md:text-3xl font-black text-center text-ishes-blue mb-12">
          Organisation des cours
          <div className="w-12 h-1 bg-[#C69C6D] mx-auto mt-4 rounded-full"></div>
        </h3>
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
            {[
              { icon: <Calendar className="w-8 h-8 text-[#C69C6D] mb-5"/>, title: "1 seule fois\npar semaine", desc: "Tous les cours (Arabe, Coran et Éducation Islamique) se déroulent une seule fois par semaine." },
              { icon: <Users className="w-8 h-8 text-[#C69C6D] mb-5"/>, title: "Pour les enfants\nde 4 à 15 ans", desc: "Des groupes adaptés à l'âge et au niveau de chaque enfant." },
              { icon: <UserRound className="w-8 h-8 text-[#C69C6D] mb-5"/>, title: "Pédagogie active\net bienveillante", desc: "Des enseignants qualifiés qui accompagnent chaque enfant avec attention." },
              { icon: <Award className="w-8 h-8 text-[#C69C6D] mb-5"/>, title: "Certifié\n", desc: "Une attestation de suivi est remise en fin d'année Inch'Allah." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center pt-8 sm:pt-0 lg:px-6 first:pt-0">
                {item.icon}
                <h4 className="font-black text-ishes-blue text-[15px] mb-3 whitespace-pre-line leading-snug">{item.title}</h4>
                <p className="text-gray-500 font-medium text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Créneaux */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-ishes-blue mb-6">
            Choisissez le créneau qui vous convient
            <div className="w-12 h-1 bg-[#C69C6D] mx-auto mt-6 rounded-full"></div>
          </h3>
          <p className="text-gray-600 font-medium text-[15px] md:text-[17px] max-w-3xl mx-auto leading-relaxed">
            Lors de l'inscription, vous choisissez le créneau qui vous convient le mieux.<br/>
            Votre enfant viendra une seule fois par semaine, selon le créneau sélectionné.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10">
          {[
            { icon: <Calendar className="w-8 h-8 text-amber-700"/>, title: "Mercredi\naprès-midi", time: "13h30 - 16h30", bg: "bg-amber-50", border: "border-amber-100" },
            { icon: <Sun className="w-8 h-8 text-emerald-700"/>, title: "Samedi\nmatin", time: "9h00 - 12h00", bg: "bg-emerald-50", border: "border-emerald-100" },
            { icon: <SunMedium className="w-8 h-8 text-sky-700"/>, title: "Samedi\naprès-midi", time: "13h30 - 16h30", bg: "bg-sky-50", border: "border-sky-100" },
            { icon: <Sun className="w-8 h-8 text-purple-700"/>, title: "Dimanche\nmatin", time: "9h00 - 12h00", bg: "bg-purple-50", border: "border-purple-100" },
            { icon: <SunMedium className="w-8 h-8 text-orange-700"/>, title: "Dimanche\naprès-midi", time: "13h30 - 16h30", bg: "bg-orange-50", border: "border-orange-100" }
          ].map((item, idx) => (
            <div key={idx} className={`${item.bg} ${item.border} border rounded-[1.5rem] p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-default`}>
              <div className="mb-4">{item.icon}</div>
              <h4 className="font-black text-ishes-blue text-[15px] mb-3 whitespace-pre-line leading-tight">{item.title}</h4>
              <span className="bg-white/60 px-4 py-1.5 rounded-full text-xs font-black text-[#0a192f] shadow-sm">{item.time}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-amber-50/50 border border-amber-100 rounded-[1.5rem] p-6 flex items-start gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="w-10 h-10 rounded-full border-2 border-amber-500 bg-white flex items-center justify-center text-amber-500 shrink-0 font-bold text-lg">i</div>
          <div className="pt-1">
            <h4 className="font-black text-amber-900 mb-1.5 text-[15px]">Un seul créneau choisi = Une seule fois par semaine</h4>
            <p className="text-amber-800/80 text-[14px] font-medium leading-relaxed">
              Quel que soit le jour ou l'horaire choisi, votre enfant suivra l'ensemble des cours (Arabe, Coran et Éducation Islamique) une seule fois par semaine.
            </p>
          </div>
        </div>
      </div>

      {/* Points forts & Tarif */}
      <div className="max-w-6xl mx-auto px-6 py-12 mb-12">
        <div className="grid md:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          
          <div>
            <h3 className="text-2xl font-black text-ishes-blue mb-8">
              Les points forts de notre programme
            </h3>
            <div className="space-y-5">
              {[
                "Enseignement de qualité : Arabe, Coran (avec Tajwid) et éducation islamique.",
                "Groupes à effectifs réduits pour un suivi personnalisé.",
                "Méthodes ludiques et interactives adaptées aux enfants.",
                "Un environnement sain, motivant et sécurisant.",
                "Des valeurs islamiques ancrées au quotidien."
              ].map((text, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full border-[3px] border-[#C69C6D] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C69C6D]" strokeWidth={3} />
                  </div>
                  <p className="text-[#0a192f] font-bold text-[15px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#0a192f] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            
            <span className="text-gray-400 font-bold text-[15px]">Tarif</span>
            <div className="flex items-baseline gap-2 mb-4 mt-1">
              <h3 className="text-6xl font-black text-[#C69C6D]">480 €</h3>
              <span className="font-bold text-white text-lg">/ l'année</span>
            </div>
            
            <div className="flex items-center gap-3 mb-5 text-[15px] font-medium text-gray-300">
              <CreditCard className="w-5 h-5 text-[#C69C6D]" />
              Paiement possible en 1x, 3x, 5x ou 10x
            </div>
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg text-[13px] font-bold mb-10 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" /> Paiement en 10x disponible
            </div>
            
            <div className="flex flex-col gap-4">
              <a href="#programme" className="w-full bg-white text-[#0a192f] px-6 py-4 rounded-xl font-black text-center hover:bg-gray-100 transition-colors text-[15px]">
                En savoir plus
              </a>
              <Link href="/inscription?plan=presentiel-global&audience=enfant" className="w-full bg-[#C69C6D] text-white px-6 py-4 rounded-xl font-black text-center hover:bg-[#b0885c] transition-colors shadow-lg shadow-[#C69C6D]/20 text-[15px]">
                Inscrire mon enfant
              </Link>
            </div>
          </div>
          
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-12 text-gray-400 text-xs font-black uppercase tracking-[0.15em]">
          <ShieldCheck className="w-4 h-4 text-[#C69C6D]" /> Paiement 100% sécurisé
        </div>
      </div>

      <VitrineFaq
        eyebrow="FAQ Cours enfants Toulouse"
        title="Questions fréquentes sur l’école d’arabe et de Coran pour enfants à Toulouse"
        intro="Âge, créneaux du mercredi au dimanche, programme et tarif : tout savoir avant d’inscrire votre enfant en présentiel."
        items={PRESENTIEL_ENFANT_FAQS}
      />

      {/* WhatsApp Contact */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30">
              <MessageCircle className="w-7 h-7 text-white fill-white" />
            </div>
            <div>
              <h4 className="font-black text-ishes-blue text-lg leading-tight mb-1">Une question ?</h4>
              <p className="text-gray-500 font-medium text-[15px]">Contactez-nous sur WhatsApp</p>
            </div>
          </div>
          <a href="https://wa.me/33600000000" target="_blank" rel="noreferrer" className="w-full md:w-auto bg-[#0a192f] text-white px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 hover:bg-[#0f2547] transition-all whitespace-nowrap">
            Contactez-nous sur WhatsApp
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
