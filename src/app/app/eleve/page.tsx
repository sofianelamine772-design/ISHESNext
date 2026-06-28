"use client";

import { useState, useEffect, useRef } from "react";
import { GraduationCap, ArrowRight, Smartphone, Share, PlusSquare, FileText, Download, Loader2, X, AlertCircle, BookOpen, Users, Calendar, MonitorDown, CreditCard, CheckCircle, Clock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchStudentCertificateDataAction, fetchStudentBillingDataAction } from "@/app/actions/students";
import { Button } from "@/components/ui/button";

// The getCertificateHtml function has been removed as we now use html-to-image directly on the DOM element.

export default function EleveDashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [childrenData, setChildrenData] = useState<any[]>([]);
  const [activeChildId, setActiveChildId] = useState<string | null>(null);
  const [loadingCert, setLoadingCert] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "billing">("dashboard");
  const [payments, setPayments] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [familyInscriptions, setFamilyInscriptions] = useState<any[]>([]);

  // PWA Install
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

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
          if (res.success && res.data && res.data.length > 0) {
            setChildrenData(res.data);
            setActiveChildId(res.data[0]?.id || null);

            // Load billing data in background
            try {
              setLoadingPayments(true);
              const payRes = await fetchStudentBillingDataAction(res.data[0]?.id || "");
              if (payRes.success && payRes.data) {
                setPayments(payRes.data.payments);
                setFamilyInscriptions(payRes.data.inscriptions);
              }
            } catch (payErr) {
              console.error("Error loading payments:", payErr);
            } finally {
              setLoadingPayments(false);
            }
          } else {
            setCertError(res.error || "Aucune inscription active trouvée.");
            router.push("/unauthorized");
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
  }, [user, router]);

  // Capture the PWA install prompt event
  useEffect(() => {
    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // Check if already installed as standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setIsInstalled(true));
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  };

  const certData = childrenData.find(c => c.id === activeChildId);

  const handleDownloadPDF = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const element = document.getElementById("print-certificate-wrapper");
      if (!element) {
        throw new Error("Certificate element not found");
      }

      // Convert the specific DOM element to an image
      // Using pixelRatio > 1 for high-res PDF rendering
      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2 });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
      pdf.save(`Certificat_Scolarite_${certData?.firstName || "Eleve"}_${certData?.lastName || ""}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF. Veuillez vérifier votre connexion ou utiliser l'option d'impression.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const { toPng } = await import('html-to-image');
      const element = document.getElementById("print-certificate-wrapper");
      if (!element) return;

      // Convert to image for perfect print fidelity (bypasses CSS print quirks)
      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2 });

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; background: white; }
              img { width: 210mm; height: 297mm; }
              @page { size: A4 portrait; margin: 0; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" />
          </body>
        </html>
      `);
      doc.close();

      // Give the image a moment to render in the iframe
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 2000);
      }, 500);
    } catch (error) {
      console.error("Error during printing:", error);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const getCoursePrice = (title: string): number => {
    const t = (title || "").toLowerCase();
    if (t.includes("intensif")) return 649;
    if (t.includes("junior") || t.includes("présentiel") || t.includes("presentiel") || t.includes("femme")) return 480;
    if (t.includes("spiritualité") || t.includes("spiritualite") || t.includes("sciences du coran") || t.includes("hadith")) return 399;
    if (t.includes("arabe") && t.includes("tajwid") && (t.includes("débutant") || t.includes("intermédiaire"))) return 480;
    if (t.includes("tarbiya")) return 249;
    if (t.includes("sirah")) return 250;
    if (t.includes("aqida")) return 250;
    if (t.includes("accompagnement")) return 49;
    return 349;
  };

  const getInstallmentDetails = () => {
    const paidPayments = payments.filter(p => p.status === 'succeeded' || p.status === 'paid');
    if (paidPayments.length === 0 || familyInscriptions.length === 0) return null;

    const totalExpectedRaw = familyInscriptions.reduce((sum, ins) => {
      return sum + getCoursePrice(ins.formationTitle);
    }, 0);

    const totalPaid = paidPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalExpected = Math.max(totalExpectedRaw, totalPaid);
    const firstPayment = [...paidPayments].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0];
    const firstAmount = firstPayment?.amount || 0;

    let installmentsCount = 1;
    if (totalExpected > 0 && firstAmount > 0) {
      const ratio = totalExpected / firstAmount;
      if (Math.abs(ratio - 3) < 0.3) {
        installmentsCount = 3;
      } else if (Math.abs(ratio - 5) < 0.3) {
        installmentsCount = 5;
      }
    }

    const isInstallments = installmentsCount > 1;

    const schedule = [];
    if (isInstallments && firstPayment) {
      const startDate = new Date(firstPayment.created_at);
      for (let i = 0; i < installmentsCount; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(startDate.getMonth() + i);

        const actualPayment = paidPayments.find(p => {
          const pDate = new Date(p.created_at);
          const diffMonths = (pDate.getFullYear() - startDate.getFullYear()) * 12 + (pDate.getMonth() - startDate.getMonth());
          return diffMonths === i && Math.abs(p.amount - firstAmount) < 5;
        });

        schedule.push({
          index: i + 1,
          date: dueDate,
          amount: firstAmount,
          status: actualPayment ? 'paid' : (dueDate.getTime() < Date.now() ? 'failed' : 'scheduled'),
          transactionId: actualPayment?.stripe_session_id || null
        });
      }
    } else {
      schedule.push({
        index: 1,
        date: new Date(firstPayment?.created_at || Date.now()),
        amount: firstAmount || totalExpected,
        status: 'paid',
        transactionId: firstPayment?.stripe_session_id || null
      });
    }

    return {
      totalExpected,
      totalPaid,
      totalRemaining: Math.max(0, totalExpected - totalPaid),
      isInstallments,
      installmentsCount,
      amountPerInstallment: isInstallments ? firstAmount : totalExpected,
      schedule
    };
  };

  const installmentDetails = getInstallmentDetails();

  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* ─── SIMPLIFIED WELCOME ─── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Assalamou alaykoum, <span className="text-[#086b51] italic">{user?.firstName} {user?.lastName}</span>
          </h2>
          <p className="text-gray-400 font-medium mt-4 text-lg">
            Heureux de vous retrouver pour votre apprentissage.
          </p>
        </div>
      </div>

      {/* ─── TABS NAVIGATION ─── */}
      <div className="flex border-b border-gray-100 gap-6">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === "dashboard"
              ? "text-[#086b51] border-b-2 border-[#086b51]"
              : "text-gray-400 hover:text-gray-600"
            }`}
        >
          Mon Cursus & Documents
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === "billing"
              ? "text-[#086b51] border-b-2 border-[#086b51]"
              : "text-gray-400 hover:text-gray-600"
            }`}
        >
          Facturation & Règlements
        </button>
      </div>

      {activeTab === "dashboard" ? (
        <>
          {/* ─── RÉCAPITULATIF DES CURSUS ─── */}
          {childrenData.length > 0 && (
            <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#086b51] rounded-full"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#086b51]">
                  {childrenData.length > 1 ? "Mes Enfants & Cursus Inscrits" : "Mon Cursus Actif"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {childrenData.map((child) => (
                  <div
                    key={child.id}
                    className={`border rounded-[2rem] p-6 md:p-8 flex flex-col justify-between gap-6 hover:shadow-lg transition-all relative overflow-hidden ${activeChildId === child.id
                      ? "border-[#086b51] bg-[#086b51]/5"
                      : "border-gray-100 bg-white"
                      }`}
                  >
                    {activeChildId === child.id && (
                      <div className="absolute top-0 right-0 bg-[#086b51] text-white text-[8px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-bl-2xl">
                        Sélectionné
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${activeChildId === child.id ? "bg-[#086b51] text-white" : "bg-gray-100 text-[#086b51]"
                          }`}>
                          {child.firstName?.[0] || ""}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 text-lg">
                            {child.firstName} {child.lastName}
                          </h4>
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            Élève Inscrit
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 font-medium">Cursus :</span>
                          <span className="font-bold text-gray-800 text-right max-w-[70%] truncate" title={child.formationTitle}>
                            {child.formationTitle}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 font-medium">Classe :</span>
                          <span className="font-bold text-gray-800">{child.className}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 font-medium">Mode :</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${child.classType === 'presentiel'
                            ? 'bg-[#086b51]/10 text-[#086b51]'
                            : 'bg-blue-50 text-blue-600'
                            }`}>
                            {child.classType === 'presentiel' ? 'Présentiel (Salle ISHES)' : 'Distanciel (Zoom)'}
                          </span>
                        </div>
                        {child.inscriptionDate && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 font-medium">Inscrit le :</span>
                            <span className="font-bold text-gray-500">
                              {new Date(child.inscriptionDate).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setActiveChildId(child.id)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${activeChildId === child.id
                          ? "bg-[#086b51] text-white hover:bg-[#075943]"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                        Sélectionner pour documents
                      </button>
                      {child.whatsappLink && (
                        <a
                          href={child.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#25D366] text-white hover:bg-[#20ba56] text-center flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.382 9.802-9.77.001-2.61-1.01-5.063-2.848-6.903C16.388 2.093 13.937.086 11.99.086c-5.412 0-9.808 4.385-9.81 9.774-.001 1.94.512 3.826 1.492 5.518L2.6 21.43l6.047-1.586z" />
                          </svg>
                          Rejoindre WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CHILDREN SELECTOR (FRATRIE) ─── */}
          {childrenData.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {childrenData.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setActiveChildId(child.id)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${activeChildId === child.id
                    ? "bg-[#086b51] text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${activeChildId === child.id ? "bg-white/20" : "bg-gray-100 text-gray-400"
                    }`}>
                    {child.firstName?.[0] || ""}
                  </div>
                  {child.firstName}
                </button>
              ))}
            </div>
          )}

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

            <div className="grid grid-cols-1 gap-6">
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
                ) : certData?.status === 'en_attente' ? (
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold shrink-0 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 text-amber-500" /> En attente de paiement ou de validation administrative.
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
            </div>
          </div>

          {/* ─── INSTALL APP SECTION ─── */}
          <div className="bg-white border border-gray-100 rounded-[3.5rem] overflow-hidden shadow-sm relative">
            {/* Background decorative icon */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[#086b51] pointer-events-none">
              <Smartphone className="w-64 h-64" strokeWidth={1} />
            </div>

            <div className="p-12 md:p-20 space-y-10 relative z-10">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-ishes-green"></div>
                  <span className="text-ishes-green text-[10px] font-black uppercase tracking-[0.3em]">Application Mobile</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tight">
                  Installez l'application<br />
                  <span className="text-ishes-green italic font-amiri capitalize">sur votre appareil.</span>
                </h3>
                <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                  Accédez à vos cours en un clic, directement depuis votre écran d'accueil — sans passer par le navigateur.
                </p>
              </div>

              {/* Install button or status */}
              {isInstalled ? (
                <div className="inline-flex items-center gap-3 bg-ishes-green/10 border border-ishes-green/20 text-[#086b51] px-8 py-4 rounded-[1.5rem] font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Application déjà installée ✓
                </div>
              ) : installPrompt ? (
                // Android / Chrome / Edge: native install prompt available
                <div className="space-y-4">
                  <button
                    onClick={handleInstallApp}
                    className="inline-flex items-center gap-3 bg-ishes-green hover:bg-[#075943] text-white px-8 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-ishes-green/20 cursor-pointer"
                  >
                    <MonitorDown className="w-5 h-5" />
                    Installer l'application
                  </button>
                  <p className="text-gray-400 text-xs font-semibold">Compatible Windows, macOS, Android et ChromeOS.</p>
                </div>
              ) : (
                // Guides for each OS when native browser prompt is not active
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider">
                    <Smartphone className="w-4 h-4" />
                    Guide d'installation pour vos appareils
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    {/* iOS */}
                    <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-6 space-y-4 hover:border-ishes-green/30 hover:bg-white transition-all shadow-sm">
                      <div className="flex items-center gap-2 text-ishes-green font-black text-xs uppercase tracking-wider">
                        <span className="text-lg">🍎</span> iPhone / iPad (iOS)
                      </div>
                      <ol className="text-gray-600 text-xs space-y-2 list-decimal list-inside font-semibold leading-relaxed">
                        <li>Ouvrez ce site dans le navigateur <strong className="text-ishes-dark">Safari</strong>.</li>
                        <li>Appuyez sur l'icône de partage <strong className="text-ishes-dark">↑</strong> en bas de l'écran.</li>
                        <li>Faites défiler et choisissez <strong className="text-ishes-dark">« Sur l'écran d'accueil »</strong>.</li>
                        <li>Appuyez sur <strong className="text-ishes-dark">« Ajouter »</strong> en haut à droite.</li>
                      </ol>
                    </div>

                    {/* macOS (Safari) */}
                    <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-6 space-y-4 hover:border-ishes-green/30 hover:bg-white transition-all shadow-sm">
                      <div className="flex items-center gap-2 text-ishes-green font-black text-xs uppercase tracking-wider">
                        <span className="text-lg">💻</span> Mac (Safari)
                      </div>
                      <ol className="text-gray-600 text-xs space-y-2 list-decimal list-inside font-semibold leading-relaxed">
                        <li>Ouvrez ce site dans le navigateur <strong className="text-ishes-dark">Safari</strong>.</li>
                        <li>Allez dans le menu <strong className="text-ishes-dark">Fichier</strong> en haut de votre écran.</li>
                        <li>Cliquez sur <strong className="text-ishes-dark">« Ajouter au Dock »</strong>.</li>
                        <li>Validez en cliquant sur <strong className="text-ishes-dark">« Ajouter »</strong>.</li>
                      </ol>
                    </div>

                    {/* Android (Chrome) */}
                    <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-6 space-y-4 hover:border-ishes-green/30 hover:bg-white transition-all shadow-sm">
                      <div className="flex items-center gap-2 text-ishes-green font-black text-xs uppercase tracking-wider">
                        <span className="text-lg">🤖</span> Android (Chrome / Edge)
                      </div>
                      <ol className="text-gray-600 text-xs space-y-2 list-decimal list-inside font-semibold leading-relaxed">
                        <li>Ouvrez dans <strong className="text-ishes-dark">Chrome</strong> ou <strong className="text-ishes-dark">Edge</strong>.</li>
                        <li>Appuyez sur les <strong className="text-ishes-dark">3 points ⋮</strong> en haut à droite.</li>
                        <li>Choisissez <strong className="text-ishes-dark">« Installer l'application »</strong> (ou « Ajouter à l'écran d'accueil »).</li>
                      </ol>
                    </div>

                    {/* Windows / Mac / Linux (Chrome / Edge Desktop) */}
                    <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-6 space-y-4 hover:border-ishes-green/30 hover:bg-white transition-all shadow-sm">
                      <div className="flex items-center gap-2 text-ishes-green font-black text-xs uppercase tracking-wider">
                        <span className="text-lg">🖥️</span> Windows / Mac (Chrome / Edge)
                      </div>
                      <ol className="text-gray-600 text-xs space-y-2 list-decimal list-inside font-semibold leading-relaxed">
                        <li>Regardez à droite de la <strong className="text-ishes-dark">barre d'adresse (URL)</strong>.</li>
                        <li>Cliquez sur l'icône de raccourci <strong className="text-ishes-dark">⊕</strong> (Ordinateur avec une flèche).</li>
                        <li>Cliquez sur le bouton <strong className="text-ishes-dark">« Installer »</strong> dans la fenêtre.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* ─── BILLING TAB SECTION ─── */
        <div className="space-y-10 animate-in fade-in duration-300">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Total scolarité */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Scolarité</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-gray-900 leading-none">
                  {installmentDetails ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(installmentDetails.totalExpected) : "—"}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-semibold mt-2">
                Coût global pour l'année scolaire {academicYear}
              </p>
            </div>

            {/* Card 2: Déjà réglé */}
            <div className="bg-[#086b51]/5 p-8 rounded-[2.5rem] border border-[#086b51]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#086b51]">Déjà Réglé</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-[#086b51] leading-none">
                  {installmentDetails ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(installmentDetails.totalPaid) : "—"}
                </span>
              </div>
              <p className="text-xs text-[#086b51]/75 font-semibold mt-2 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Paiements encaissés avec succès
              </p>
            </div>

            {/* Card 3: Reste à régler */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reste à Régler</span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className={`text-3xl md:text-4xl font-black leading-none ${installmentDetails && installmentDetails.totalRemaining > 0 ? "text-amber-600" : "text-gray-900"}`}>
                  {installmentDetails ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(installmentDetails.totalRemaining) : "—"}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-semibold mt-2">
                {installmentDetails && installmentDetails.totalRemaining > 0
                  ? "Sera prélevé selon votre échéancier"
                  : "Votre scolarité est entièrement réglée ✓"}
              </p>
            </div>

          </div>

          {/* Installment Plan Schedule */}
          {installmentDetails && installmentDetails.isInstallments && (
            <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#086b51] rounded-full"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#086b51]">
                  Échéancier de paiement (Paiement en {installmentDetails.installmentsCount}x)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {installmentDetails.schedule.map((item) => {
                  const itemDate = new Date(item.date).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  });
                  return (
                    <div
                      key={item.index}
                      className={`border rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all ${item.status === 'paid'
                          ? 'bg-[#086b51]/5 border-[#086b51]/10'
                          : 'bg-white border-gray-100'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                          Mensualité #{item.index}
                        </span>
                        {item.status === 'paid' ? (
                          <span className="bg-[#086b51]/10 text-[#086b51] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                            Payé
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                            Planifié
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-lg font-black text-gray-800">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.amount)}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {item.status === 'paid' ? 'Prévelé le' : 'Prélèvement le'}
                        </div>
                        <div className="text-xs font-black text-gray-700">
                          {itemDate}
                        </div>
                      </div>

                      <div className="text-[9px] text-gray-400 font-semibold italic">
                        {item.status === 'paid' ? '✓ Transaction validée' : '⏳ Automatique'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100/50 text-xs text-gray-500 font-semibold leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-700 mb-1">Informations sur les prélèvements :</p>
                  Les prélèvements mensuels sont automatisés par notre partenaire bancaire Stripe. Ils sont effectués chaque mois à la date anniversaire de votre premier versement sur la même carte bancaire. Si vous devez mettre à jour votre carte bancaire ou signaler un problème, contactez le secrétariat.
                </div>
              </div>
            </div>
          )}

          {/* Past Payments List */}
          <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-[#086b51] rounded-full"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#086b51]">
                Historique complet de vos règlements
              </h3>
            </div>

            {loadingPayments ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 text-[#086b51] animate-spin mr-2" />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Chargement de l'historique...</span>
              </div>
            ) : payments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-[2rem] text-gray-400 text-xs font-semibold">
                Aucun règlement enregistré dans notre base de données.
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment: any) => {
                  const pDate = new Date(payment.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  });
                  return (
                    <div
                      key={payment.id}
                      className="border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30 hover:bg-white transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#086b51] flex items-center justify-center border border-emerald-100/50 shadow-inner">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-gray-800 uppercase tracking-tight">
                            Paiement Scolarité ISHES
                          </div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                            Reçu le {pDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                        <div className="text-right">
                          <span className="text-base font-black text-gray-900">
                            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: payment.currency || 'EUR' }).format(payment.amount)}
                          </span>
                        </div>
                        <span className="bg-[#086b51]/10 text-[#086b51] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                          Réussi
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ─── CERTIFICATE MODAL ─── */}
      {showPreviewModal && certData && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Print & Web Typography specific CSS override injected directly */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
            
            .font-amiri {
              font-family: 'Amiri', serif;
            }
            .font-cinzel {
              font-family: 'Cinzel', serif;
            }
            .font-playfair {
              font-family: 'Playfair Display', serif;
            }

            @media print {
              body > * {
                display: none !important;
              }
              html, body {
                height: 100% !important;
                overflow: hidden !important;
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              #print-certificate-wrapper {
                display: block !important;
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                z-index: 99999999 !important;
                background: #FAF8F5 !important;
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
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className="bg-[#086b51] hover:bg-[#075943] text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#086b51]/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Génération...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" /> Télécharger PDF
                    </>
                  )}
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Imprimer
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Preview Area */}
            <div className="flex-1 bg-gray-100 p-8 overflow-y-auto max-h-[70vh] flex justify-center">
              {/* Printable Wrapper */}
              <div id="print-certificate-wrapper" className="bg-[#FAF8F5] w-[210mm] h-[297mm] p-[20mm] border border-gray-300 shadow-lg relative flex flex-col justify-between select-none shrink-0 text-[#1c2e28] overflow-hidden" style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>

                {/* Translucent Background Watermark Logo & Arabic Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-between py-28 pointer-events-none select-none z-0">
                  {/* Top Arabic Text Watermark */}
                  <div className="text-center font-amiri text-[42px] text-[#086b51] opacity-[0.02] rotate-[-10deg] tracking-wider font-bold select-none w-full whitespace-nowrap">
                    مَعْهَدُ الْعُلُومِ الْإِنْسَانِيَّةِ وَالرُّوحِيَّةِ
                  </div>
                  {/* Center Medallion Watermark */}
                  <div className="flex items-center justify-center opacity-[0.025] my-auto">
                    <svg className="w-[110mm] h-[110mm] text-[#086b51]" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.8" fill="none" />
                      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.4" fill="none" strokeDasharray="1,1" />
                      {/* 8-pointed Islamic Star */}
                      <path d="M50,4 L64,36 L96,50 L64,64 L50,96 L36,64 L4,50 L36,36 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      <path d="M50,15 L59,41 L85,50 L59,59 L50,85 L41,59 L15,50 L41,41 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
                      {/* Center Arabic calligraphic representation "العلم" */}
                      <text x="50" y="55" fontSize="16" fontFamily="'Amiri', serif" fontWeight="bold" textAnchor="middle" fill="currentColor">العلم</text>
                    </svg>
                  </div>
                  {/* Bottom Arabic Text Watermark */}
                  <div className="text-center font-amiri text-[56px] text-[#086b51] opacity-[0.02] rotate-[10deg] tracking-wider font-bold select-none w-full whitespace-nowrap">
                    وَقُلْ رَبِّ زِدْنِي عِلْمًا
                  </div>
                </div>

                {/* Double Border Frame */}
                {/* Outer emerald border */}
                <div className="absolute inset-4 border-[8px] border-[#086b51] pointer-events-none rounded-sm"></div>
                {/* Inner gold border */}
                <div className="absolute inset-6 border-[2px] border-[#c8a96e] pointer-events-none"></div>

                {/* Corner Ornaments */}
                {/* Top Left */}
                <div className="absolute top-7 left-7 text-[#c8a96e] w-8 h-8 pointer-events-none opacity-80">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M0,0 L100,0 L100,10 L30,10 C20,10 10,20 10,30 L10,100 L0,100 Z" />
                    <circle cx="20" cy="20" r="8" />
                  </svg>
                </div>
                {/* Top Right */}
                <div className="absolute top-7 right-7 text-[#c8a96e] w-8 h-8 pointer-events-none opacity-80 rotate-90">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M0,0 L100,0 L100,10 L30,10 C20,10 10,20 10,30 L10,100 L0,100 Z" />
                    <circle cx="20" cy="20" r="8" />
                  </svg>
                </div>
                {/* Bottom Left */}
                <div className="absolute bottom-7 left-7 text-[#c8a96e] w-8 h-8 pointer-events-none opacity-80 -rotate-90">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M0,0 L100,0 L100,10 L30,10 C20,10 10,20 10,30 L10,100 L0,100 Z" />
                    <circle cx="20" cy="20" r="8" />
                  </svg>
                </div>
                {/* Bottom Right */}
                <div className="absolute bottom-7 right-7 text-[#c8a96e] w-8 h-8 pointer-events-none opacity-80 rotate-180">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M0,0 L100,0 L100,10 L30,10 C20,10 10,20 10,30 L10,100 L0,100 Z" />
                    <circle cx="20" cy="20" r="8" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  {/* Certificate Header */}
                  <div className="text-center space-y-4">
                    {/* Logo ISHES */}
                    <div className="flex justify-center select-none pt-2">
                      <img
                        src="/logo-ishes-institut-arabe.png"
                        alt="Logo ISHES"
                        className="h-20 w-auto object-contain"
                      />
                    </div>

                    <div className="space-y-1">
                      <h1 className="text-[16px] font-bold tracking-[0.25em] font-cinzel text-gray-900 uppercase">
                        Institut des Sciences Humaines & Spirituelles
                      </h1>
                      <p className="text-[12px] font-amiri font-bold text-[#c8a96e] tracking-wide">
                        مَعْهَدُ الْعُلُومِ الْإِنْسَانِيَّةِ وَالرُّوحِيَّةِ
                      </p>
                      <p className="text-[8px] font-sans font-bold tracking-widest text-gray-400 uppercase mt-0.5">
                        Établissement d'Enseignement Privé
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 my-2 select-none">
                      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c8a96e]"></div>
                      <div className="text-[#c8a96e] text-xs">◆</div>
                      <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c8a96e]"></div>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-[30px] font-bold tracking-[0.18em] text-[#086b51] uppercase font-cinzel">
                        Certificat de Scolarité
                      </h2>
                      <p className="text-[11px] font-playfair italic font-medium text-gray-500 tracking-wider">
                        Attestation officielle d'inscription pour l'année académique {academicYear.replace('-', ' - ')}
                      </p>
                    </div>
                  </div>

                  {/* Certificate Body */}
                  <div className="my-6 space-y-6 px-8 text-center leading-relaxed">
                    <p className="font-playfair italic text-gray-600 text-[14px]">
                      Le Secrétariat Académique de l'Institut des Sciences Humaines et Spirituelles (ISHES) certifie par la présente que :
                    </p>

                    <div className="space-y-1 py-2">
                      <p className="text-gray-400 font-sans text-[10px] font-black uppercase tracking-[0.25em]">Élève inscrit(e)</p>
                      <h3 className="text-3xl font-bold text-gray-900 tracking-wide font-playfair capitalize">
                        {certData.firstName} {certData.lastName}
                      </h3>
                      <p className="text-[10px] font-sans text-gray-400 font-semibold tracking-wider lowercase mt-0.5">{certData.email}</p>
                    </div>

                    <p className="font-playfair text-gray-600 text-[14px] leading-relaxed">
                      est inscrit(e) et suit régulièrement les enseignements théoriques et pratiques dispensés au sein de notre établissement pour le cursus d'excellence :
                    </p>

                    <div className="bg-[#FAF8F5]/80 backdrop-blur-sm border border-[#c8a96e]/30 rounded-2xl p-6 mx-auto max-w-xl shadow-sm space-y-2 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#086b51] text-[#FAF8F5] text-[8px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                        Cursus Validé
                      </div>
                      <h4 className="text-lg font-bold text-[#086b51] tracking-wide font-cinzel pt-1">
                        {certData.formationTitle}
                      </h4>
                      <div className="flex items-center justify-center gap-4 text-[10px] font-sans font-black text-gray-500 uppercase tracking-widest pt-1">
                        <span>Groupe : {certData.className}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]"></span>
                        <span>Mode : {certData.classType}</span>
                      </div>
                    </div>

                    <p className="font-playfair italic text-gray-500 text-[11px] pt-1">
                      Ce certificat est délivré pour servir et valoir ce que de droit.
                    </p>
                  </div>

                  {/* Certificate Footer */}
                  <div className="flex items-end justify-between border-t border-[#c8a96e]/20 pt-5 select-none">
                    {/* Official Seal / Stamp */}
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-20 h-20 text-[#c8a96e] opacity-90 relative flex items-center justify-center">
                        {/* Elegant stamp SVG representation */}
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
                          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" fill="none" />
                          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          {/* Inner star emblem */}
                          <path d="M50,38 L54,46 L62,46 L56,52 L58,60 L50,55 L42,60 L44,52 L38,46 L46,46 Z" fill="currentColor" opacity="0.3" />
                          {/* Circular seal text */}
                          <path id="seal-text-path" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                          <text fontSize="5.2" fontWeight="bold" fill="currentColor" letterSpacing="0.8">
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
                      <span className="text-[10px] font-playfair font-bold text-gray-700 italic">
                        Fait à Toulouse, le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="text-[8px] font-sans font-bold font-mono text-[#c8a96e] uppercase tracking-wider bg-[#FAF8F5] border border-[#c8a96e]/20 px-3 py-1 rounded-md">
                        N° CERT-ISHES-2026-{certData.inscriptionId?.slice(-8).toUpperCase()}
                      </span>
                    </div>

                    {/* Signature */}
                    <div className="text-center flex flex-col items-center space-y-1">
                      <span className="text-[9px] font-sans font-black text-gray-400 tracking-widest uppercase">Pour le Secrétariat Académique</span>
                      <div className="h-10 w-24 relative flex items-center justify-center">
                        {/* A beautiful calligraphic vector path representing the director signature */}
                        <svg className="w-full h-full text-[#086b51] opacity-80" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10,25 C25,25 35,5 45,25 C55,45 65,15 75,25 C80,30 90,30 95,20 M20,15 C35,15 45,15 50,30" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-playfair font-bold text-gray-800 italic">Direction de l'Enseignement</span>
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
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="bg-[#086b51] hover:bg-[#075943] text-white rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#086b51]/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Génération PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" /> Télécharger PDF
                  </>
                )}
              </button>
              <button
                onClick={handlePrint}
                className="bg-[#c8a96e] hover:bg-[#b2935b] text-white rounded-xl px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c8a96e]/10 flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> Imprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
