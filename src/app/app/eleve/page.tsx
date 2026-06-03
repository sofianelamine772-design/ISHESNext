"use client";

import { useState, useEffect } from "react";
import { GraduationCap, ArrowRight, Smartphone, Share, PlusSquare, BookOpen, ShieldCheck, FileText, Download, Loader2, X, AlertCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { fetchStudentCertificateDataAction } from "@/app/actions/students";
import { Button } from "@/components/ui/button";

export default function EleveDashboard() {
  const { user } = useUser();
  const [certData, setCertData] = useState<any | null>(null);
  const [loadingCert, setLoadingCert] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const academicYear = new Date().getMonth() >= 7 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

  useEffect(() => {
    if (user?.id) {
      const loadCertData = async () => {
        setLoadingCert(true);
        setCertError(null);
        try {
          const res = await fetchStudentCertificateDataAction({
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.primaryPhoneNumber?.phoneNumber || ""
          });
          if (res.success && res.data) {
            setCertData(res.data);
          } else {
            setCertError(res.error || "Aucune inscription active trouvée.");
          }
        } catch (err) {
          console.error("Error loading certificate:", err);
          setCertError("Erreur lors du chargement du certificat.");
        } finally {
          setLoadingCert(false);
        }
      };
      loadCertData();
    }
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* ─── SIMPLIFIED WELCOME ─── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Assalamou alaykoum,<br />
            <span className="text-[#086b51] italic">
              {user?.firstName} {user?.lastName}
            </span>
          </h2>
          <p className="text-gray-400 font-medium mt-4 text-lg">
            Heureux de vous retrouver pour votre apprentissage.
          </p>
        </div>
        <Link 
          href="/app/eleve/reinscription"
          className="bg-[#086b51] text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#086b51]/20"
        >
          Finaliser ma réinscription <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ─── QUICK STATUS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-8 shadow-sm">
            <div className="w-20 h-20 bg-emerald-50 text-[#086b51] rounded-[2rem] flex items-center justify-center shrink-0">
               <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
               <div className="text-4xl font-black text-gray-900">Validé</div>
               <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Statut du dossier</div>
            </div>
         </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-8 shadow-sm">
             <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-[2rem] flex items-center justify-center shrink-0">
                <PlusSquare className="w-10 h-10" />
             </div>
             <div>
                <div className="text-4xl font-black text-gray-900">{academicYear}</div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Année académique</div>
             </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-8 shadow-sm">
             <div className="w-20 h-20 bg-emerald-50/50 text-[#086b51] rounded-[2rem] flex items-center justify-center shrink-0">
                <GraduationCap className="w-10 h-10" />
             </div>
             <div className="min-w-0">
                <div className="text-xl font-black text-gray-900 truncate" title={loadingCert ? "Chargement..." : certData?.formationTitle || "Aucune classe"}>
                  {loadingCert ? "..." : certData?.formationTitle || "Non Inscrit"}
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1 truncate" title={loadingCert ? "..." : certData?.className || ""}>
                  {loadingCert ? "..." : certData?.className || "Aucun groupe"}
                </div>
             </div>
          </div>
      </div>

      {/* ─── WHATSAPP GROUP LINK ─── */}
      {certData?.whatsappLink && (
        <div className="bg-[#086b51]/5 border border-[#086b51]/10 p-8 md:p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-[2rem] flex items-center justify-center shrink-0">
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.382 9.802-9.77.001-2.61-1.01-5.063-2.848-6.903C16.388 2.093 13.937.086 11.99.086c-5.412 0-9.808 4.385-9.81 9.774-.001 1.94.512 3.826 1.492 5.518L2.6 21.43l6.047-1.586z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Rejoindre le WhatsApp de la classe</h3>
              <p className="text-gray-400 text-xs font-semibold mt-1">Accédez aux dernières annonces et restez en contact avec votre classe : <span className="text-[#086b51] font-bold">{certData.className}</span></p>
            </div>
          </div>
          <a
            href={certData.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba56] text-white px-8 py-4 rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20 cursor-pointer text-center md:self-center shrink-0"
          >
            Rejoindre le Groupe
          </a>
        </div>
      )}


      {/* ─── DOCUMENTS SECTION ─── */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#086b51] rounded-full"></div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#086b51]">
            Mes Documents Administratifs
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-gray-100 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:shadow-black/5 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-50 text-[#086b51] rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-base md:text-lg">Certificat de Scolarité</h4>
                <p className="text-gray-400 text-xs font-medium mt-1">Attestation officielle d'inscription pour l'année en cours.</p>
              </div>
            </div>

            {loadingCert ? (
              <Button disabled className="bg-gray-100 text-gray-400 rounded-2xl px-6 py-4 font-black text-[10px] uppercase tracking-widest shrink-0 h-12 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Chargement...
              </Button>
            ) : certError ? (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-bold shrink-0">
                <AlertCircle className="w-4 h-4 shrink-0" /> {certError}
              </div>
            ) : (
              <button
                onClick={() => setShowPreviewModal(true)}
                className="bg-[#086b51] hover:bg-[#075943] text-white rounded-2xl px-6 py-4 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#086b51]/10 shrink-0 h-12 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Générer / Imprimer
              </button>
            )}
          </div>

          <div className="border border-gray-100 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-60 bg-gray-50/50">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-gray-600 text-base md:text-lg">Fiches d'Évaluation</h4>
                <p className="text-gray-400 text-xs font-medium mt-1">Relevés de notes et bulletins semestriels.</p>
              </div>
            </div>
            <button disabled className="bg-gray-200 text-gray-400 rounded-2xl px-6 py-4 font-black text-[10px] uppercase tracking-widest shrink-0 h-12 cursor-not-allowed">
              Non disponible
            </button>
          </div>
        </div>
      </div>

      {/* ─── IPHONE TUTORIAL SECTION ─── */}
      <div className="bg-ishes-dark rounded-[3.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-white pointer-events-none">
          <Smartphone className="w-64 h-64" strokeWidth={1} />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 p-12 md:p-20 items-center">
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-ishes-green"></div>
              <span className="text-ishes-green text-[10px] font-black uppercase tracking-[0.3em]">Astuce Mobile</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              Installez l'application<br />
              <span className="text-ishes-green italic">sur votre iPhone.</span>
            </h3>
            
            <p className="text-white/60 font-medium text-lg leading-relaxed">
              Accédez à vos cours en un clic, directement depuis votre écran d'accueil, sans passer par Safari.
            </p>

            <div className="space-y-6 pt-4">
              {[
                { step: "01", text: "Ouvrez Safari et appuyez sur l'icône de partage (en bas).", icon: Share },
                { step: "02", text: "Faites défiler et choisissez 'Sur l'écran d'accueil'.", icon: PlusSquare },
                { step: "03", text: "Appuyez sur 'Ajouter' en haut à droite.", icon: ArrowRight },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ishes-green font-black text-sm transition-all group-hover:bg-ishes-green group-hover:text-white group-hover:scale-110">
                    {item.step}
                  </div>
                  <p className="text-white/80 font-bold text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-inner border border-white/5">
            <Image 
              src="/images/tutoriel-installation-application-ishes.png"
              alt="Tutoriel iPhone PWA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* ─── CERTIFICATE MODAL ─── */}
      {showPreviewModal && certData && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Print specific CSS override injected directly */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body > * {
                display: none !important;
              }
              html, body {
                height: 100% !important;
                overflow: hidden !important;
                background: white !important;
              }
              #print-certificate-wrapper {
                display: block !important;
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                z-index: 99999999 !important;
                background: white !important;
                box-sizing: border-box !important;
              }
              @page {
                size: portrait;
                margin: 0;
              }
            }
          `}} />

          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col my-8">
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#086b51]" /> Prévisualisation du Certificat Officiel
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Format officiel A4 prêt pour impression ou export PDF</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="bg-[#086b51] hover:bg-[#075943] text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#086b51]/10 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Imprimer / Enregistrer PDF
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Preview Area */}
            <div className="flex-1 bg-gray-100 p-8 overflow-y-auto max-h-[70vh] flex justify-center">
              {/* Printable Wrapper */}
              <div id="print-certificate-wrapper" className="bg-white w-[210mm] h-[297mm] p-[20mm] border border-gray-300 shadow-lg relative flex flex-col justify-between select-none shrink-0 font-serif text-[#1c2e28] overflow-hidden">
                
                {/* Translucent Background Watermark Logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                  <svg className="w-[120mm] h-[120mm]" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
                    <path d="M50,15 L60,40 L85,40 L65,55 L75,80 L50,65 L25,80 L35,55 L15,40 L40,40 Z" />
                  </svg>
                </div>

                {/* Double Border Frame */}
                {/* Outer emerald border */}
                <div className="absolute inset-4 border-[8px] border-[#086b51] pointer-events-none rounded-sm"></div>
                {/* Inner gold border */}
                <div className="absolute inset-6 border-[2px] border-[#c8a96e] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  {/* Certificate Header */}
                  <div className="text-center space-y-4">
                    {/* Emblem */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-[#086b51] p-[2px] flex items-center justify-center bg-white shadow-sm">
                        <div className="w-full h-full bg-[#086b51] rounded-full flex items-center justify-center text-white font-black italic text-sm">
                          I
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h1 className="text-[15px] font-bold tracking-[0.2em] font-sans text-gray-900 uppercase">
                        Institut des Sciences Humaines & Spirituelles
                      </h1>
                      <p className="text-[9px] font-sans font-bold tracking-widest text-[#c8a96e] uppercase">
                        Établissement d'Enseignement Privé
                      </p>
                    </div>

                    <div className="w-24 h-[1px] bg-[#c8a96e] mx-auto my-3"></div>

                    <div className="space-y-1">
                      <h2 className="text-[28px] font-black tracking-widest text-[#086b51] uppercase font-sans">
                        Certificat de Scolarité
                      </h2>
                      <p className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-widest">
                        Année Académique {academicYear.replace('-', ' - ')}
                      </p>
                    </div>
                  </div>

                  {/* Certificate Body */}
                  <div className="my-10 space-y-8 px-6 text-center text-[13px] leading-relaxed">
                    <p className="italic text-gray-600">
                      Le Secrétariat Académique de l'Institut des Sciences Humaines et Spirituelles (ISHES) certifie par la présente que :
                    </p>

                    <div className="space-y-1 py-4">
                      <p className="text-gray-400 font-sans text-[10px] font-black uppercase tracking-[0.25em]">Élève inscrit(e)</p>
                      <h3 className="text-3xl font-black text-gray-900 tracking-wide font-serif capitalize">
                        M. / Mme {certData.firstName} {certData.lastName}
                      </h3>
                      <p className="text-[10px] font-sans text-gray-400 font-bold font-mono tracking-wider lowercase mt-1">{certData.email}</p>
                    </div>

                    <p className="text-gray-600 leading-loose">
                      est inscrit(e) et suit régulièrement les enseignements théoriques et pratiques dispensés au sein de notre établissement pour la formation d'excellence :
                    </p>

                    <div className="bg-[#086b51]/5 border border-[#086b51]/10 rounded-2xl p-6 mx-auto max-w-lg space-y-2">
                      <span className="text-[9px] font-sans font-black text-[#086b51] uppercase tracking-widest">Cursus Validé</span>
                      <h4 className="text-lg font-black text-gray-900 tracking-wide font-serif uppercase text-[#086b51]">
                        {certData.formationTitle}
                      </h4>
                      <div className="flex items-center justify-center gap-4 text-[10px] font-sans font-black text-gray-500 uppercase tracking-widest pt-1">
                        <span>Groupe : {certData.className}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]"></span>
                        <span>Mode : {certData.classType}</span>
                      </div>
                    </div>

                    <p className="italic text-gray-500 text-[11px]">
                      Ce certificat est délivré pour servir et valoir ce que de droit.
                    </p>
                  </div>

                  {/* Certificate Footer */}
                  <div className="flex items-end justify-between border-t border-gray-100 pt-6">
                    {/* Official Seal / Stamp */}
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-20 h-20 text-[#c8a96e] opacity-90 relative flex items-center justify-center">
                        {/* Elegant stamp SVG representation */}
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" fill="none" />
                          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          {/* Inner star emblem */}
                          <path d="M50,38 L54,46 L62,46 L56,52 L58,60 L50,55 L42,60 L44,52 L38,46 L46,46 Z" fill="currentColor" opacity="0.3" />
                          {/* Circular seal text */}
                          <path id="seal-text-path" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                          <text fontSize="5.5" fontWeight="bold" fill="currentColor" letterSpacing="1">
                            <textPath href="#seal-text-path" startOffset="0%">
                              • INSTITUT ISHES TOULOUSE • SCELLÉ DE L'ADMINISTRATION
                            </textPath>
                          </text>
                        </svg>
                      </div>
                      <span className="text-[8px] font-sans font-black text-gray-400 tracking-widest uppercase">Sceau de l'Institut</span>
                    </div>

                    {/* Authenticity Identifier */}
                    <div className="text-center space-y-1 flex flex-col items-center">
                      <span className="text-[10px] font-sans font-bold text-gray-700 italic">
                        Fait à Toulouse, le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="text-[8px] font-sans font-bold font-mono text-[#c8a96e] uppercase tracking-wider bg-gray-50 border border-gray-100 px-3 py-1 rounded-md">
                        N° CERT-ISHES-2026-{certData.inscriptionId?.slice(-8).toUpperCase()}
                      </span>
                    </div>

                    {/* Signature */}
                    <div className="text-center flex flex-col items-center space-y-2">
                      <span className="text-[9px] font-sans font-black text-gray-400 tracking-widest uppercase">Pour le Secrétariat Académique</span>
                      <div className="h-10 w-24 relative flex items-center justify-center">
                        {/* A beautiful calligraphic vector path representing the director signature */}
                        <svg className="w-full h-full text-[#086b51] opacity-80" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10,25 C25,25 35,5 45,25 C55,45 65,15 75,25 C80,30 90,30 95,20 M20,15 C35,15 45,15 50,30" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-serif font-black text-gray-800 italic">Direction de l'Enseignement</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={handlePrint}
                className="bg-[#086b51] hover:bg-[#075943] text-white rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#086b51]/10 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Imprimer / PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
