"use client";

import { useState, useEffect, useRef } from "react";
import { GraduationCap, ArrowRight, Smartphone, Share, PlusSquare, FileText, Download, Loader2, X, AlertCircle, BookOpen, Users, Calendar, MonitorDown, CreditCard, CheckCircle, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchStudentCertificateDataAction, fetchStudentBillingDataAction } from "@/app/actions/students";
import { Button } from "@/components/ui/button";
import { ArabicBackground } from "@/components/ArabicBackground";
import { motion } from "framer-motion";

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
    if (t.includes("intensif") || t.includes("présentiel") || t.includes("presentiel") || t.includes("femme")) return 649;
    if (t.includes("junior")) return 480;
    if (t.includes("spiritualité") || t.includes("spiritualite") || t.includes("sciences du coran") || t.includes("hadith")) return 399;
    if (t.includes("arabe") && t.includes("tajwid") && (t.includes("débutant") || t.includes("intermédiaire"))) return 480;
    if (t.includes("tarbiya")) return 249;
    if (t.includes("sirah")) return 250;
    if (t.includes("aqida")) return 250;
    if (t.includes("civilisation")) return 199;
    if (t.includes("accompagnement")) return 49;
    return 349;
  };

  const getInstallmentDetails = () => {
    const paidPayments = payments.filter(p => p.status === 'succeeded' || p.status === 'paid');
    if (paidPayments.length === 0 || familyInscriptions.length === 0) return null;

    const totalExpectedRaw = familyInscriptions.reduce((sum, ins) => {
      return sum + (typeof ins.expectedAmount === 'number' ? ins.expectedAmount : getCoursePrice(ins.formationTitle));
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
      } else if (Math.abs(ratio - 10) < 0.3) {
        installmentsCount = 10;
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
    <div className="min-h-screen bg-gray-50/30 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-ishes-blue/[0.03] to-transparent pointer-events-none"></div>
      <ArabicBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-10 space-y-10">
        
        {/* ─── PREMIUM HERO SECTION ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-ishes-gold opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-ishes-blue opacity-20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Assalamou alaykoum, <span className="text-ishes-gold">{user?.firstName}</span>
              </h2>
              <p className="text-gray-300 font-medium text-lg max-w-2xl">
                Bienvenue dans votre espace d'apprentissage. Retrouvez ici le suivi de vos formations et vos informations personnelles.
              </p>
            </div>
            {childrenData.length > 1 && (
              <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-white/10">
                {childrenData.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setActiveChildId(child.id)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeChildId === child.id ? 'bg-white text-[#0F172A] shadow-md' : 'text-white hover:bg-white/10'}`}
                  >
                    {child.firstName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── NAVIGATION TABS ─── */}
        <div className="flex items-center justify-center">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "dashboard" ? 'bg-ishes-blue text-white shadow-md' : 'text-gray-500 hover:text-ishes-blue hover:bg-gray-50'}`}
            >
              <BookOpen className="w-4 h-4" />
              Mon Parcours
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "billing" ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-500 hover:text-[#0F172A] hover:bg-gray-50'}`}
            >
              <CreditCard className="w-4 h-4" />
              Mes Paiements
            </button>
          </div>
        </div>

        {loadingCert ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-ishes-blue animate-spin" />
            <p className="text-gray-400 font-semibold uppercase tracking-widest text-xs">Chargement de votre espace...</p>
          </div>
        ) : certError ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100 shadow-sm max-w-xl mx-auto">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-bold text-lg">{certError}</p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            
            {activeTab === "dashboard" && certData && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <Link
                  href="/program"
                  className="block bg-gradient-to-r from-ishes-gold via-[#d4a017] to-[#b8860b] rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-ishes-gold/25 relative overflow-hidden group"
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 mb-1">Nouvelle inscription</p>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight">Choisir une autre formation</h3>
                        <p className="text-white/85 text-sm font-medium mt-2 max-w-xl">
                          Vous êtes déjà inscrit(e). Ajoutez un nouveau cursus pour vous ou un autre enfant — le catalogue est à un clic.
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center justify-center gap-2 bg-white text-yellow-800 hover:bg-yellow-50 font-black py-4 px-7 rounded-2xl text-sm uppercase tracking-wider transition-all shrink-0 shadow-lg">
                      Voir les formations <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Course Card */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                    
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1.5 h-6 bg-ishes-gold rounded-full"></div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Formation Actuelle</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1 space-y-6">
                        <div>
                          <h4 className="text-3xl font-black text-gray-900 leading-tight">
                            {certData.formationTitle}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 mt-4">
                            <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                              {certData.classType === 'presentiel' ? <Users className="w-3.5 h-3.5" /> : <MonitorDown className="w-3.5 h-3.5" />}
                              {certData.className}
                            </span>
                            {certData.status === 'actif' || certData.status === 'valide' ? (
                              <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-emerald-100">
                                <CheckCircle className="w-3.5 h-3.5" /> Inscription Validée
                              </span>
                            ) : (
                              <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-orange-100">
                                <Clock className="w-3.5 h-3.5" /> En attente
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
                          <p className="text-sm text-gray-500 font-medium mb-4">Actions rapides :</p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            {certData.whatsappLink ? (
                              <a
                                href={certData.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-[#25D366] text-white hover:bg-[#20ba56] transition-all rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 font-bold text-sm shadow-sm shadow-[#25D366]/20"
                              >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.382 9.802-9.77.001-2.61-1.01-5.063-2.848-6.903C16.388 2.093 13.937.086 11.99.086c-5.412 0-9.808 4.385-9.81 9.774-.001 1.94.512 3.826 1.492 5.518L2.6 21.43l6.047-1.586z" />
                                </svg>
                                Rejoindre le groupe WhatsApp
                              </a>
                            ) : (
                              <button disabled className="flex-1 bg-gray-100 text-gray-400 rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 font-bold text-sm cursor-not-allowed">
                                <Clock className="w-5 h-5" /> En attente de classe
                              </button>
                            )}
                            <button
                              onClick={() => setShowPreviewModal(true)}
                              className="flex-1 bg-white border-2 border-gray-100 text-gray-700 hover:border-ishes-blue hover:text-ishes-blue transition-all rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 font-bold text-sm"
                            >
                              <FileText className="w-5 h-5" />
                              Voir le Certificat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* Etudiant Info Card */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-[#0F172A] rounded-full"></div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Profil Élève</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-[#0F172A] rounded-2xl flex items-center justify-center font-black text-lg">
                          {certData.firstName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{certData.firstName} {certData.lastName}</p>
                          <p className="text-xs text-gray-500 font-medium">Inscrit le {new Date(certData.inscriptionDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/program"
                    className="block bg-[#0F172A] rounded-[2.5rem] p-8 text-white shadow-md relative overflow-hidden group hover:shadow-lg transition-all"
                  >
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                      <GraduationCap className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ishes-gold mb-2">Catalogue ISHES</p>
                      <h3 className="font-black text-xl mb-2">Choisir une autre formation</h3>
                      <p className="text-white/70 text-sm font-medium mb-6">
                        Présentiel, distanciel, adulte ou enfant : inscrivez-vous à un nouveau cursus.
                      </p>
                      <span className="inline-flex items-center gap-2 bg-ishes-gold text-[#0F172A] hover:brightness-110 font-black py-2.5 px-6 rounded-full text-sm transition-all">
                        Choisir maintenant <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              </motion.div>
            )}

            {activeTab === "billing" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Financial Summary */}
                {installmentDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-100 transition-colors">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Réglé</p>
                        <p className="text-4xl font-black text-emerald-600">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(installmentDetails.totalPaid)}
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between group hover:border-gray-200 transition-colors">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Reste à payer</p>
                        <p className="text-4xl font-black text-gray-900">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(installmentDetails.totalRemaining)}
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                        <CreditCard className="w-7 h-7" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payments Timeline & History */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-6 bg-[#0F172A] rounded-full"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Historique des Règlements</h3>
                  </div>

                  {loadingPayments ? (
                    <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-[#0F172A] animate-spin" /></div>
                  ) : payments.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium">Aucun règlement enregistré.</div>
                  ) : (
                    <div className="space-y-4">
                      {payments.map((payment: any) => {
                        const pDate = new Date(payment.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        });
                        return (
                          <div key={payment.id} className="border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                                <CreditCard className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">Paiement Scolarité</p>
                                <p className="text-xs text-gray-500 font-medium">Reçu le {pDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                              <span className="text-xl font-black text-gray-900">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: payment.currency || 'EUR' }).format(payment.amount)}
                              </span>
                              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                Réussi
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        )}
      </div>

      {/* ─── CERTIFICATE MODAL ─── */}
      {showPreviewModal && certData && (
        <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Typographie CSS */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
            .font-amiri { font-family: 'Amiri', serif; }
            .font-cinzel { font-family: 'Cinzel', serif; }
            .font-playfair { font-family: 'Playfair Display', serif; }
            `
          }} />
          
          <div className="relative w-full max-w-4xl flex flex-col items-center">
            {/* Action Bar */}
            <div className="w-full flex items-center justify-between bg-white/10 backdrop-blur-xl rounded-full px-6 py-4 mb-6 border border-white/20 shadow-xl">
              <span className="text-white font-bold text-sm uppercase tracking-widest">Prévisualisation</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className="bg-ishes-gold hover:bg-yellow-600 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  PDF
                </button>
                <button
                  onClick={handlePrint}
                  disabled={isGeneratingPdf}
                  className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all"
                >
                  Imprimer
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="bg-white/10 hover:bg-red-500 hover:text-white text-white p-2.5 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificat */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden overflow-x-auto w-full max-w-[800px] flex justify-center scale-95 md:scale-100 origin-top">
              <div
                id="print-certificate-wrapper"
                className="relative bg-white shrink-0"
                style={{ width: "210mm", height: "297mm", padding: 0, margin: 0, overflow: "hidden" }}
              >
                {/* Bordure Décorative */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-[3px] border-ishes-gold/40 rounded-sm"></div>
                  <div className="absolute inset-5 border border-ishes-gold/20 rounded-sm"></div>
                </div>
                {/* Filigranes */}
                <div className="absolute top-10 left-10 opacity-[0.03] rotate-[-15deg] pointer-events-none">
                  <span className="font-amiri text-[150px] text-ishes-gold">عِلْم</span>
                </div>
                <div className="absolute bottom-20 right-10 opacity-[0.03] rotate-[10deg] pointer-events-none">
                  <span className="font-amiri text-[150px] text-ishes-gold">نُور</span>
                </div>

                <div className="relative z-10 flex flex-col h-full pt-16 pb-20 px-16">
                  {/* Header */}
                  <div className="flex justify-between items-start w-full mb-12">
                    <div className="w-32">
                      <img src="/logo.png" alt="ISHES Logo" className="w-full h-auto" />
                    </div>
                    <div className="text-right">
                      <h2 className="font-amiri text-2xl text-ishes-blue font-bold">معهد إيشس</h2>
                      <p className="font-playfair text-gray-500 text-sm italic mt-1">Institut des Sciences Humaines<br />et d'Enseignement Supérieur</p>
                    </div>
                  </div>

                  {/* Titre */}
                  <div className="text-center mb-16 space-y-4">
                    <h1 className="font-cinzel text-5xl font-black text-ishes-blue tracking-widest uppercase">
                      Certificat
                    </h1>
                    <div className="font-cinzel text-xl text-ishes-gold tracking-[0.3em] uppercase">
                      de Scolarité
                    </div>
                    <div className="w-24 h-1 bg-ishes-gold mx-auto mt-6 rounded-full opacity-50"></div>
                  </div>

                  {/* Corps du texte */}
                  <div className="flex-grow flex flex-col justify-center space-y-10">
                    <div className="text-center">
                      <p className="font-playfair text-gray-500 text-lg italic mb-2">Nous soussignés, la Direction de l'Institut ISHES, attestons que</p>
                    </div>
                    <div className="text-center bg-gray-50/50 py-8 px-10 rounded-2xl border border-gray-100/50">
                      <span className="block font-cinzel text-3xl font-bold text-gray-900 mb-2 tracking-wide">
                        {certData.firstName} {certData.lastName}
                      </span>
                    </div>
                    <div className="text-center space-y-6">
                      <p className="font-playfair text-gray-600 text-lg">
                        est régulièrement inscrit(e) au sein de notre établissement pour l'année académique <span className="font-bold text-ishes-blue">{academicYear}</span>, dans la formation :
                      </p>
                      <div className="inline-block border-b-2 border-ishes-gold/30 pb-2">
                        <span className="font-cinzel font-bold text-xl text-ishes-blue tracking-wide">
                          {certData.formationTitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer & Signature */}
                  <div className="mt-auto pt-16 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 font-medium">Fait à Toulouse, le {new Date().toLocaleDateString('fr-FR')}</p>
                      <p className="text-[10px] text-gray-300">Réf: ISHES-{new Date().getFullYear()}-{certData.id.substring(0, 6).toUpperCase()}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-cinzel text-sm font-bold text-ishes-blue mb-4">La Direction</p>
                      <img src="/cachet.png" alt="Cachet et Signature" className="h-24 mx-auto opacity-90" style={{ filter: "contrast(1.2)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
