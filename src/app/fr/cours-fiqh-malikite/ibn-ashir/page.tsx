import Link from 'next/link';
import { ArrowLeft, BookOpen, MapPin, Star, CheckCircle2, ArrowRight, UserCheck, Heart, Users, HelpCircle } from 'lucide-react';
import { buildPageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildPageMetadata({
  title: "Ibn Âchir — Biographie et Al-Murshid al-Mu'în | Fiqh Mâlikite",
  description:
    "Imam Abd al-Wahid Ibn Âchir (Fès, 1582–1631), auteur d'Al-Murshid al-Mu'în, texte de référence du Fiqh mâlikite. Biographie, œuvre et cours ISHES en ligne.",
  path: "/fr/cours-fiqh-malikite/ibn-ashir",
  keywords: [
    "ibn ashir",
    "ibn achir",
    "ibn âchir",
    "al murshid al muin",
    "al murshid al mu'in",
    "matn ibn ashir",
    "fiqh malikite",
    "savant malikite fès",
    "abd al-wahid ibn ashir",
    "cours fiqh malikite",
  ],
  type: "article",
});

export default function IbnAshirBiographyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-ishes-gold selection:text-white pb-0 pt-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Cours de Fiqh Mâlikite", path: "/fr/cours-fiqh-malikite" },
          { name: "Ibn Âchir", path: "/fr/cours-fiqh-malikite/ibn-ashir" },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          headline: "Ibn Âchir, auteur d'Al-Murshid al-Mu'în et maître du Fiqh mâlikite",
          description:
            "Biographie de l'imam Ibn Âchir de Fès et présentation d'Al-Murshid al-Mu'în, matn de référence pour étudier le Fiqh mâlikite.",
          path: "/fr/cours-fiqh-malikite/ibn-ashir",
          keywords: ["ibn ashir", "al murshid al muin", "fiqh malikite"],
          about: ["Ibn Âchir", "Fiqh mâlikite", "Al-Murshid al-Mu'în"],
        })}
      />
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-ishes-blue -z-10" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[url('/images/patterns/islamic-pattern.svg')] opacity-10 -z-10" />

      <div className="max-w-6xl mx-auto px-6 mb-20">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/fr/cours-fiqh-malikite" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au cours de Fiqh Mâlikite
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ishes-gold/5 rounded-bl-full -z-10" />
          
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-ishes-blue/10 text-ishes-blue rounded-full text-xs font-black tracking-widest uppercase">
              Figure Historique
            </span>
            <span className="px-4 py-1.5 bg-ishes-gold/10 text-ishes-gold rounded-full text-xs font-black tracking-widest uppercase">
              Savant Mâlikite
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-ishes-blue leading-[1.1] mb-6">
            Biographie de l'Imam Ibn 'Âshir : <br />
            <span className="text-ishes-gold">Le Maître du Fiqh Mâlikite</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl">
            Auteur du célèbre poème <em>Al-Murshid al-Mu'în</em> étudié dans le monde entier, l'Imam Abd al-Wahid Ibn 'Âshir (1582-1631) est l'une des figures les plus marquantes de l'école juridique mâlikite et de l'enseignement islamique au Maghreb. Découvrez sa vie, son héritage et son immense apport à l'Islam.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-16">
            
            {/* Section 1 */}
            <section id="origines" className="scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 flex items-center gap-4">
                <MapPin className="w-10 h-10 text-ishes-gold" />
                Origines et Naissance à Fès
              </h2>
              <div className="prose prose-lg md:prose-xl text-gray-700 max-w-none space-y-6 leading-relaxed">
                <p>
                  De son nom complet <strong>Abû Muhammad 'Abd al-Wahid ibn Ahmad ibn 'Ali Ibn 'Âshir al-Ansârî</strong>, ce grand érudit est né en l'an 990 de l'Hégire (ce qui correspond à 1582 ap. J.-C.) dans la prestigieuse ville de Fès, au Maroc.
                </p>
                <p>
                  Issu d'une famille andalouse de la lignée des Ansârs (les célèbres alliés médinois du Prophète ﷺ) ayant fui l'Espagne musulmane (Al-Andalus) lors de la Reconquista pour échapper aux persécutions, il a grandi dans un environnement où la préservation de l'héritage intellectuel et spirituel islamique était une question de survie et d'honneur.
                </p>
                <p>
                  À cette époque, Fès n'était pas seulement la capitale intellectuelle du Maroc, mais l'un des plus grands carrefours du savoir islamique au monde. C'est dans ce terreau fertile, imprégné par l'université Al-Qarawiyyin, que le jeune Abd al-Wahid Ibn 'Âshir commença sa quête d'excellence religieuse.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="parcours" className="scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 flex items-center gap-4">
                <Star className="w-10 h-10 text-ishes-gold" />
                Un Savant Pluridisciplinaire
              </h2>
              <div className="prose prose-lg md:prose-xl text-gray-700 max-w-none space-y-6 leading-relaxed">
                <p>
                  Contrairement à certains spécialistes cantonnés à un seul domaine, l'Imam Ibn 'Âshir était un "érudit total". Il ne se contenta pas d'une seule science, mais excella dans de nombreuses disciplines fondamentales et profanes :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li><strong>Le Saint Coran (Qira'at) :</strong> Il maîtrisait les différentes lectures coraniques.</li>
                  <li><strong>Le Fiqh Mâlikite :</strong> Le droit et la jurisprudence islamique, domaine dans lequel il excella particulièrement.</li>
                  <li><strong>La 'Aqida (Théologie) :</strong> La croyance islamique basée sur l'école Ash'arite.</li>
                  <li><strong>La Langue Arabe :</strong> La grammaire (Nahw) et la rhétorique (Balagha).</li>
                  <li><strong>Les Mathématiques et l'Astronomie :</strong> Des sciences qu'il utilisa notamment pour calculer avec précision les horaires de prière et la détermination de la Qibla.</li>
                </ul>
                <p>
                  Pour forger son savoir, l'Imam Ibn 'Âshir s'est instruit auprès des plus grands maîtres de son époque. Parmi ses professeurs, on compte de grandes pointures comme <em>Abul Qasim Ibn Abi An-Na'im</em> ou encore le célèbre cheikh <em>Ibn Qadhi</em>. Plus tard, lors de son voyage pour le pèlerinage (Hajj) à La Mecque, il rencontra d'illustres savants d'Égypte et du Hejaz avec qui il échangea son savoir.
                </p>
                <div className="bg-ishes-gold/10 p-6 rounded-2xl border-l-4 border-ishes-gold italic text-gray-800 font-medium">
                  "L'Imam Ibn 'Âshir était connu pour mettre la science en pratique. Il ne se limitait pas à la théorie. Il partageait son temps entre l'enseignement, l'adoration nocturne, et même la défense physique des côtes marocaines contre les invasions."
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="oeuvre" className="scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 flex items-center gap-4">
                <BookOpen className="w-10 h-10 text-ishes-gold" />
                Son Œuvre Maîtresse : Al-Murshid al-Mu'în
              </h2>
              <div className="prose prose-lg md:prose-xl text-gray-700 max-w-none space-y-6 leading-relaxed">
                <p>
                  Bien que l'Imam ait rédigé plusieurs ouvrages (notamment sur la calligraphie coranique et le droit), l'œuvre qui l'a rendu immortel est son poème didactique intitulé :
                </p>
                <div className="text-center bg-gray-50 py-6 rounded-xl border border-gray-200 shadow-sm my-8">
                  <h3 className="text-xl md:text-2xl font-black text-ishes-blue m-0">
                    « Al-Murshid al-Mu'în 'alâ ad-Darûrî min 'Ulûm ad-Dîn »
                  </h3>
                  <p className="text-gray-500 font-medium mt-2 m-0">
                    (Le Guide Utile sur l'Indispensable des Sciences de la Religion)
                  </p>
                </div>
                <p>
                  Ce texte de <strong>314 vers</strong>, composé lors de son voyage vers la Mecque, résume avec une incroyable précision les bases absolues que chaque musulman a l'obligation de connaître pour pratiquer sa religion correctement.
                </p>
                <p>
                  La structure de ce livre magistral repose sur le célèbre <strong>Hadith de Jibril</strong> (l'Ange Gabriel) qui définit la religion en trois degrés (Al-Islam, Al-Iman, Al-Ihsan). Ainsi, le poème est divisé en trois parties indissociables :
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-ishes-blue text-white rounded-full flex items-center justify-center font-black text-lg">1</div>
                    <h4 className="font-black text-ishes-blue text-lg mb-3 mt-2">La 'Aqida (Le Dogme)</h4>
                    <p className="text-sm text-gray-600 leading-snug">Basé sur l'école théologique Ash'arite, expliquant les attributs d'Allah, ce qui Lui est impossible, et la croyance envers Ses messagers.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-ishes-gold text-white rounded-full flex items-center justify-center font-black text-lg">2</div>
                    <h4 className="font-black text-ishes-blue text-lg mb-3 mt-2">Le Fiqh Mâlikite</h4>
                    <p className="text-sm text-gray-600 leading-snug">Détaille les règles de la purification (Wudu, Ghusl, Tayammum), de la Prière, de la Zakat, du Jeûne et du Pèlerinage (Hajj).</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-ishes-dark text-white rounded-full flex items-center justify-center font-black text-lg">3</div>
                    <h4 className="font-black text-ishes-blue text-lg mb-3 mt-2">Le Tasawwuf (Spiritualité)</h4>
                    <p className="text-sm text-gray-600 leading-snug">Basé sur l'enseignement de l'Imam Al-Junayd, traitant de la purification du cœur, du repentir et des maladies de l'âme.</p>
                  </div>
                </div>
                
                <p>
                  <strong>Un succès historique :</strong> Ce poème, facile à mémoriser grâce à sa structure rythmée (Rajaz), est devenu LE manuel de base étudié dans presque toutes les mosquées, écoles coraniques et universités d'Afrique du Nord (Maroc, Algérie, Tunisie) et d'Afrique de l'Ouest (Sénégal, Mauritanie, Mali) jusqu'à aujourd'hui.
                </p>
              </div>
            </section>

            {/* Section FAQ SEO */}
            <section className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-200 mt-12">
              <h2 className="text-2xl font-black text-ishes-blue mb-8">Questions Fréquentes sur l'Imam Ibn 'Âshir (FAQ)</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                    À quelle école juridique appartenait Ibn 'Âshir ?
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-7">
                    Il appartenait à l'école juridique Mâlikite (fondée par l'Imam Malik ibn Anas). En matière de dogme (croyance), il suivait l'école Ash'arite, et en matière de spiritualité, il suivait la voie de l'Imam Al-Junayd.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                    Quand et où est-il décédé ?
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-7">
                    L'Imam Ibn 'Âshir est décédé le jeudi 3 du mois de Dhul-Hijjah de l'an 1040 de l'Hégire (ce qui correspond à l'été 1631) à Fès, au Maroc. Il a été enterré près de la prière de l'Andalousie.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-ishes-gold shrink-0 mt-0.5" />
                    Pourquoi étudier Al-Murshid Al-Mu'in aujourd'hui ?
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-7">
                    Bien que rédigé il y a plus de 400 ans, cet ouvrage reste la meilleure introduction au Fiqh Mâlikite pour un débutant. Il résume l'essentiel des obligations religieuses de manière structurée. C'est pourquoi nous l'avons choisi comme texte de base pour notre formation Fiqh Malikite à l'ISHES.
                  </p>
                </div>
              </div>
            </section>

          </div>
          
          <div className="lg:col-span-1 relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sticky top-32">
              <h3 className="text-2xl font-black text-ishes-blue mb-8 border-b border-gray-100 pb-4">
                Fiche d'identité
              </h3>
              
              <ul className="space-y-6">
                <li>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nom Complet</span>
                  <span className="font-bold text-gray-900 text-lg">'Abd al-Wahid ibn Ahmad ibn 'Ali Ibn 'Âshir</span>
                </li>
                <li>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Naissance</span>
                  <span className="font-bold text-gray-900 text-lg">990 H / 1582</span>
                  <span className="block text-sm text-gray-500 font-medium">Fès, Maroc</span>
                </li>
                <li>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Décès</span>
                  <span className="font-bold text-gray-900 text-lg">1040 H / 1631</span>
                  <span className="block text-sm text-gray-500 font-medium">Fès, Maroc (âgé de ~50 ans)</span>
                </li>
                <li>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">École de Fiqh</span>
                  <span className="font-bold text-gray-900 text-lg">Mâlikite</span>
                </li>
                <li>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">École de Dogme</span>
                  <span className="font-bold text-gray-900 text-lg">Ash'arite</span>
                </li>
                <li>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ouvrage Célèbre</span>
                  <span className="font-bold text-gray-900 text-lg italic">Al-Murshid al-Mu'în</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ─── MASSIVE CTA FOR FIQH COURSE ─── */}
      <section className="py-24 px-6 bg-gradient-to-br from-ishes-blue to-[#112521] relative overflow-hidden border-t-8 border-ishes-gold mt-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ishes-gold/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-full h-48 opacity-10 pointer-events-none bg-[url('/images/formations/mosque-silhouette.svg')] bg-repeat-x bg-bottom bg-contain" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-ishes-gold/20 border border-ishes-gold/30 text-ishes-gold rounded-full text-xs font-black tracking-widest uppercase mb-6">
            Passez à la pratique
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            Étudiez le livre d'Ibn 'Âshir avec un véritable enseignant.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            La lecture seule ne suffit pas. Rejoins notre <strong>formation de Fiqh Mâlikite en ligne</strong> (4 mois) pour comprendre tes adorations de A à Z en te basant sur le célèbre poème <em>Al-Murshid Al-Mu'in</em>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/fr/cours-fiqh-malikite" 
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-ishes-gold to-[#B29255] hover:from-[#C6A874] hover:to-ishes-gold text-white px-10 py-5 rounded-2xl text-lg md:text-xl font-black transition-all shadow-[0_0_40px_-10px_rgba(198,168,116,0.6)] hover:shadow-[0_0_60px_-10px_rgba(198,168,116,0.8)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shine_1.5s_ease-out] pointer-events-none" />
              DÉCOUVRIR LE PROGRAMME <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-ishes-gold" />
              1 cours par semaine en direct
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-ishes-gold" />
              Plus de 30 supports PDF offerts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-ishes-gold" />
              Replays illimités
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
