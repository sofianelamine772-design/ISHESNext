"use client";

import { Suspense, useState, useEffect, type MouseEvent, type ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ArrowRight, User, Mail, Phone, BookOpen, GraduationCap, Users, Plus, Trash2, ArrowLeft, Monitor, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { registerStudentAction } from "@/app/actions/students";
import { ArabicBackground } from "@/components/ArabicBackground";
import { PRESENTIEL_CLASSES, FEMME_DEBUTANTE_CLASS_ID, FEMME_INTERMEDIAIRE_CLASS_ID, resolvePresentielCheckoutSlug, type PresentielClass } from "@/lib/presentiel-data";
import { PROGRAMS_DATA } from "@/lib/programs-data";
import { getFamilyCheckoutTotal, getNamedChildren, getSiblingDiscount } from "@/lib/pricing";
import { areClassesAllFull, isClassFull, type SlotStatusRow } from "@/lib/class-availability";
import { PresentielChoicePicker, PresentielHorairePicker } from "@/components/vitrine/PresentielHorairePicker";
import { cn } from "@/lib/utils";

function isPossiblePhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

// Form Component wrapped in Suspense so useSearchParams doesn't break static generation
function InscriptionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams?.get("plan");
  const slot = searchParams?.get("slot");
  const level = searchParams?.get("level");
  const classIdParam = searchParams?.get("classId");
  const selectedClass = classIdParam ? PRESENTIEL_CLASSES.find(c => c.id === parseInt(classIdParam)) : null;
  const audienceParam = searchParams?.get("audience");

  // Redirection if no plan selected
  useEffect(() => {
    if (!planId) {
      router.replace("/program");
    }
  }, [planId, router]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    niveau: "",
    slot: "",
    horaire: "",
    classId: "",
    parentPrenom: "",
    parentNom: ""
  });

  const [registrationType, setRegistrationType] = useState<"self" | "child">("self");
  const [childrenList, setChildrenList] = useState([{ prenom: "", nom: "", niveau: "", slot: "", horaire: "", classId: "" }]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [slotsStatus, setSlotsStatus] = useState<SlotStatusRow[]>([]);

  const [showChildHoraireError, setShowChildHoraireError] = useState<{ [key: number]: boolean }>({});
  const [showAdultHoraireError, setShowAdultHoraireError] = useState(false);
  const [showChildNiveauError, setShowChildNiveauError] = useState<{ [key: number]: boolean }>({});
  const [showAdultNiveauError, setShowAdultNiveauError] = useState(false);
  const [showDisabledSlotWarning, setShowDisabledSlotWarning] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/classes/status');
        const data = await res.json();
        if (Array.isArray(data)) setSlotsStatus(data);
      } catch (err) {
        console.error("Failed to fetch slots status", err);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    if (!slotsStatus.length) return;
    setChildrenList((prev) => prev.map((child) => {
      const id = parseInt(child.classId, 10);
      if (id && isClassFull(slotsStatus, id)) {
        return { ...child, classId: "", horaire: "" };
      }
      return child;
    }));
    setFormData((prev) => {
      const id = parseInt(prev.classId, 10);
      if (id && isClassFull(slotsStatus, id)) {
        return { ...prev, classId: "", horaire: "" };
      }
      return prev;
    });
  }, [slotsStatus]);

  const isLevelAvailableOnDay = (niveauKey: string, audience: "enfant" | "adulte", type?: "femme") => {
    if (planId !== 'presentiel-global' || !slot) return true;
    return PRESENTIEL_CLASSES.some(c =>
      c.planId === 'presentiel-global' &&
      c.audience === audience &&
      (type ? c.type === type : true) &&
      c.niveauKey === niveauKey &&
      c.slotKey?.toLowerCase() === slot.toLowerCase()
    );
  };

  const getBasePriceOfPlan = (plan: string | null): number => {
    if (!plan) return 349;
    const normalized = plan.toLowerCase().replace(/-/g, '_');

    // 1. Lire depuis la source de vérité PROGRAMS_DATA
    const program = PROGRAMS_DATA[normalized];
    if (program && program.price) {
      const parsedPrice = parseInt(program.price.replace(/\D/g, ''));
      if (!isNaN(parsedPrice) && parsedPrice > 0) return parsedPrice;
    }

    // 2. Si c'est presentiel-global ou si le slot correspond à un cours présentiel, le prix est de 480 €
    const currentSlot = (formData?.slot || slot || "").toLowerCase();
    const isChildSlot = (childrenList?.[0]?.slot || "").toLowerCase();
    
    if (normalized === 'femme_debutante_presentiel' || normalized === 'femme_intermediaire_presentiel') return 649;
    const selectedClassId = parseInt(String(formData?.classId || classIdParam || ''), 10);
    if (selectedClassId === FEMME_DEBUTANTE_CLASS_ID || selectedClassId === FEMME_INTERMEDIAIRE_CLASS_ID) return 649;

    if (
      normalized === 'presentiel_global' || 
      normalized.includes('presentiel') || 
      normalized === 'arabe_coran_junior' ||
      currentSlot === 'samedi' || 
      currentSlot === 'dimanche' || 
      currentSlot === 'mardi-vendredi' || 
      currentSlot === 'mercredi-dimanche' || 
      currentSlot === 'mercredi-dimanche-hifdh' || 
      currentSlot === 'samedi-sirah' ||
      isChildSlot === 'mercredi' ||
      isChildSlot === 'samedi' ||
      isChildSlot === 'dimanche'
    ) {
      return 480;
    }

    // Fallbacks
    if (normalized === 'tarbiya_islamiya') return 249;
    if (normalized === 'tajwid_intensif') return 799;
    if (normalized === 'sciences_du_coran') return 399;
    if (normalized === 'spiritualite_islam') return 399;
    if (normalized === 'al_aqida') return 250;
    if (normalized === 'as_sirah') return 649;
    if (normalized === 'pack_accompagnement') return 49;
    if (normalized === 'correction_fatiha') return 0;
    if (normalized === 'cours_particuliers') return 0;

    return 349; // Tarif par défaut
  };

  const namedChildren = registrationType === 'child' ? getNamedChildren(childrenList) : [];

  const getPrice = () => {
    const basePrice = getBasePriceOfPlan(planId);
    if (registrationType === 'child') {
      return getFamilyCheckoutTotal(basePrice, namedChildren.length);
    }
    return basePrice;
  };

  const getSubtotal = () => {
    const basePrice = getBasePriceOfPlan(planId);
    if (registrationType === 'child') {
      return basePrice * namedChildren.length;
    }
    return basePrice;
  };

  const siblingDiscount = getSiblingDiscount(namedChildren.length);

  const [selectedInstallments, setSelectedInstallments] = useState<1 | 3 | 5 | 10>(1);

  useEffect(() => {
    if (getPrice() < 100) {
      setSelectedInstallments(1);
    }
  }, [childrenList.length, registrationType, planId]);

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      console.log("Starting checkout process...");
      const totalPrice = getPrice();
      console.log("Total price:", totalPrice);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          planId: resolvePresentielCheckoutSlug(
            planId || "formation_generale",
            (registrationType === 'child'
              ? namedChildren.map((c) => parseInt(String(c.classId), 10))
              : [parseInt(String(formData.classId || ''), 10)]
            ).filter((id) => !Number.isNaN(id)),
          ),
          title: planName || "Formation ISHES",
          price: totalPrice + " €",
          mode: (planId === 'tajwid_standard' || planId === 'presentiel-global') ? "presentiel" : "distanciel",
          slot: (registrationType === 'child' ? childrenList[0]?.slot : formData.slot) || slot || "",
          classId: formData.classId || "",
          classIds: registrationType === 'child' ? childrenList.map(c => c.classId) : [formData.classId],
          email: formData.email,
          telephone: formData.telephone,
          registrationType: registrationType,
          installments: selectedInstallments,
          prenom: formData.prenom,
          nom: formData.nom,
          niveau: formData.niveau,
          parentPrenom: formData.parentPrenom,
          parentNom: formData.parentNom,
          childrenList: registrationType === 'child' ? namedChildren.map(c => ({
            prenom: c.prenom,
            nom: c.nom,
            classId: c.classId,
            niveau: c.niveau
          })) : []
        }),
      });

      const data = await response.json();
      console.log("Response from API:", data);

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      if (data.url) {
        console.log("Redirecting to:", data.url);
        window.location.href = data.url;
      } else {
        throw new Error("Pas d'URL de redirection reçue");
      }
    } catch (error: any) {
      console.error("DEBUG CHECKOUT ERROR:", error);
      alert("ERREUR DÉTAILLÉE : " + (error.stack || error.message || error));
    } finally {
      setLoadingCheckout(false);
    }
  };

  const handleChildInputChange = (index: number, field: string, value: string) => {
    setChildrenList(prev => {
      const updated = [...prev];
      const child = { ...updated[index], [field]: value };

      if (planId === 'presentiel-global') {
        const slotVal = child.slot || (slot ? slot.toLowerCase() : "");
        if (field === 'slot') {
          child.niveau = "";
          child.horaire = "";
          child.classId = "";
        } else if (field === 'niveau') {
          child.horaire = "";
          child.classId = "";

          if (slotVal && child.niveau) {
            const matchingClasses = PRESENTIEL_CLASSES.filter(c =>
              c.planId === 'presentiel-global' &&
              c.audience === 'enfant' &&
              c.slotKey === slotVal.toLowerCase() &&
              c.niveauKey === child.niveau
            );
            const openClasses = matchingClasses.filter((c) => !isClassFull(slotsStatus, c.id));
            if (openClasses.length === 1) {
              child.classId = openClasses[0].id.toString();
              child.horaire = openClasses[0].horaire;
            } else {
              child.classId = "";
              child.horaire = "";
            }
          }
        } else if (field === 'classId') {
          if (value) {
            const matchingClass = PRESENTIEL_CLASSES.find(c => c.id === parseInt(value));
            if (matchingClass) {
              child.classId = value;
              child.horaire = matchingClass.horaire;
            } else {
              child.classId = "";
              child.horaire = "";
            }
          } else {
            child.classId = "";
            child.horaire = "";
          }
        }
      }

      updated[index] = child;
      return updated;
    });
  };

  const childFormations = [
    'arabe_coran_junior',
    'arabe-coran-junior',
    'tarbiya_islamiya',
    'tajwid_enfant',
    'presentiel-enfant'
  ];

  const isForcedChild =
    childFormations.includes(planId || "") ||
    audienceParam === "enfant" ||
    (selectedClass && selectedClass.audience === 'enfant') ||
    (planId === 'presentiel-global' && slot && slot.toLowerCase() === 'mercredi') ||
    (planId === 'tajwid_standard' && audienceParam === 'enfant');

  const isForcedSelf =
    audienceParam === "adulte" ||
    (selectedClass && selectedClass.audience === 'adulte') ||
    (planId === 'presentiel-global' && slot && ['lundi', 'mardi'].includes(slot.toLowerCase())) ||
    (planId === 'tajwid_standard' && audienceParam === 'adulte');

  useEffect(() => {
    if (planId) {
      if (isForcedChild) {
        setRegistrationType("child");
      } else if (isForcedSelf) {
        setRegistrationType("self");
      } else {
        setRegistrationType("self");
      }
    }
  }, [planId, slot, audienceParam, isForcedChild, isForcedSelf]);

  useEffect(() => {
    if (selectedClass) {
      setFormData(prev => ({ ...prev, niveau: selectedClass.niveauKey, slot: selectedClass.slotKey, horaire: selectedClass.horaire, classId: selectedClass.id.toString() }));
      setChildrenList(prev => prev.map(c => ({ ...c, niveau: selectedClass.niveauKey, slot: selectedClass.slotKey, horaire: selectedClass.horaire, classId: selectedClass.id.toString() })));
    } else {
      let initSlot = slot ? slot.toLowerCase() : "";
      let initNiveau = level || "";
      let initHoraire = "";
      let initClassId = "";

      if (planId === 'femme_intermediaire_presentiel' || planId === 'femme-intermediaire-presentiel') {
        initClassId = String(FEMME_INTERMEDIAIRE_CLASS_ID);
        initSlot = initSlot || "samedi";
        initNiveau = initNiveau || "femme_intermediaire";
        initHoraire = PRESENTIEL_CLASSES.find(c => c.id === FEMME_INTERMEDIAIRE_CLASS_ID)?.horaire || "";
      } else if (planId === 'femme_debutante_presentiel' || planId === 'femme-debutante-presentiel') {
        initClassId = String(FEMME_DEBUTANTE_CLASS_ID);
        initSlot = initSlot || "dimanche";
        initNiveau = initNiveau || "femme_debutante";
        initHoraire = PRESENTIEL_CLASSES.find(c => c.id === FEMME_DEBUTANTE_CLASS_ID)?.horaire || "";
      } else if (planId === 'presentiel-global' && initSlot && initNiveau) {
        const aud = registrationType === 'child' ? 'enfant' : 'adulte';
        const matchingClasses = PRESENTIEL_CLASSES.filter(c =>
          c.planId === 'presentiel-global' &&
          c.audience === aud &&
          c.slotKey === initSlot &&
          c.niveauKey === initNiveau
        );
        if (matchingClasses.length === 1) {
          initHoraire = matchingClasses[0].horaire;
          initClassId = matchingClasses[0].id.toString();
        }
      }

      setFormData(prev => ({
        ...prev,
        niveau: initNiveau,
        slot: initSlot,
        horaire: initHoraire,
        classId: initClassId
      }));
      setChildrenList(prev => prev.map(c => ({
        ...c,
        niveau: initNiveau,
        slot: initSlot,
        horaire: initHoraire,
        classId: initClassId
      })));
    }
  }, [selectedClass, level, slot, registrationType, planId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      if (planId === 'presentiel-global') {
        const slotVal = updated.slot || (slot ? slot.toLowerCase() : "");
        if (name === 'slot') {
          updated.niveau = "";
          updated.horaire = "";
          updated.classId = "";
        } else if (name === 'niveau') {
          updated.horaire = "";
          updated.classId = "";

          if (slotVal && updated.niveau) {
            const matchingClasses = PRESENTIEL_CLASSES.filter(c =>
              c.planId === 'presentiel-global' &&
              c.audience === 'adulte' &&
              c.type === 'femme' &&
              c.slotKey === slotVal.toLowerCase() &&
              c.niveauKey === updated.niveau
            );
            const openClasses = matchingClasses.filter((c) => !isClassFull(slotsStatus, c.id));
            if (openClasses.length === 1) {
              updated.classId = openClasses[0].id.toString();
              updated.horaire = openClasses[0].horaire;
            } else {
              updated.classId = "";
              updated.horaire = "";
            }
          }
        } else if (name === 'classId') {
          if (value) {
            const matchingClass = PRESENTIEL_CLASSES.find(c => c.id === parseInt(value));
            if (matchingClass) {
              updated.classId = value;
              updated.horaire = matchingClass.horaire;
            } else {
              updated.classId = "";
              updated.horaire = "";
            }
          } else {
            updated.classId = "";
            updated.horaire = "";
          }
        }
      }
      return updated;
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const saveToSupabase = async () => {
    try {
      const { registerStudentAction } = await import("@/app/actions/students");

      if (registrationType === 'child') {
        for (let i = 0; i < childrenList.length; i++) {
          const child = childrenList[i];
          const result = await registerStudentAction({
            prenom: child.prenom,
            nom: child.nom,
            email: formData.email,
            telephone: formData.telephone,
            niveau: child.niveau,
            planId: planId || 'arabe_coran_junior',
            parentPrenom: formData.parentPrenom,
            parentNom: formData.parentNom,
            classId: child.classId
          });
          if (!result.success) {
            console.error("Error saving student:", result.error);
          }
        }
      } else {
        const result = await registerStudentAction({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          niveau: formData.niveau,
          planId: planId || 'formation_generale',
          parentPrenom: formData.parentPrenom,
          parentNom: formData.parentNom,
          classId: formData.classId
        });
        if (!result.success) {
          console.error("Error saving student:", result.error);
        }
      }
    } catch (err) {
      console.error("Action import error:", err);
    }
  };

  const handleNextWithSave = async () => {
    if (step === 3) {
      await saveToSupabase();
    }
    nextStep();
  };

  // Derived Title
  const getPlanName = (id: string | null) => {
    switch (id) {
      case "presentiel-global": return "Cours en Présentiel";
      case "tajwid_intensif": return "Tajwid Intensif (Distanciel)";
      case "sciences_islamiques": return "Sciences Islamiques (Distanciel)";
      case "arabe_coran_junior": return "Arabe & Coran Junior";
      case "pack_accompagnement": return "Pack Accompagnement";
      case "tajwid_standard": return "Tajwid Standard (Présentiel)";
      case "sciences_du_coran": return "Sciences du Coran (Distanciel)";
      case "sciences_hadith": return "Sciences du Hadith (Distanciel)";
      case "memoriser_coran": return "Mémorisation du Coran (Distanciel)";
      case "as_sirah": return "Sîrah An-Nabawiyya (Distanciel)";
      case "al_aqida": return "Al-Aqîda (Distanciel)";
      case "fiqh_malikite": return "Fiqh Mâlikite (Distanciel)";
      case "arabe_adulte": return "Arabe Littéraire (Adulte) (Distanciel)";
      case "tarbiya_islamiya": return "Tarbiya Islamiya (Distanciel)";
      case "spiritualite_islam": return "Spiritualité Musulmane (Distanciel)";
      case "correction_fatiha": return "Correction al Fatiha (Distanciel)";
      case "cours_particuliers": return "Cours Particuliers (Distanciel)";
      // Nouveaux plans
      case "enfant-mercredi-presentiel":
      case "enfant-samedi-presentiel":
      case "enfant-dimanche-presentiel": return "Arabe & Coran Enfant";
      case "femme-debutante-presentiel": return "Arabe & Tajwid Femme Débutante (Présentiel)";
      case "femme-intermediaire-presentiel": return "Arabe & Tajwid Femme Intermédiaire (Présentiel)";
      case "tajwid_enfant_distance": return "Tajwid Enfant (Distanciel)";
      case "arabe_enfant_distance": return "Arabe Enfant (Distanciel)";
      case "formation_enseignante_tajwid": return "Formation Enseignant Tajwid";
      case "formation_enseignante_tarbya": return "Formation Enseignant Tarbya";
      default: return "";
    }
  };

  const getLevelLabel = (lvl: string | null) => {
    if (!lvl) return "";
    switch (lvl.toLowerCase()) {
      case "maternel_1": return "Préparatoire 1ère année";
      case "maternel_2": return "Préparatoire 2ème année";
      case "elementaire_1": return "Élémentaire Débutant 1";
      case "elementaire_1_plus": return "Élémentaire 1+";
      case "elementaire_2": return "Élémentaire 2";
      case "elementaire_2_plus": return "Élémentaire 2+";
      case "elementaire_3": return "Élémentaire 3 et 3+";
      case "elementaire_4": return "Élémentaire 4";
      case "femme_debutante": return "🧕 Femme Débutante";
      case "femme_intermediaire": return "🧕 Femme Intermédiaire";
      default: return lvl;
    }
  };

  const levelLabel = selectedClass ? selectedClass.niveau : getLevelLabel(level);
  const planName = (levelLabel ? levelLabel : getPlanName(planId)) + (slot ? ` (${slot.charAt(0).toUpperCase() + slot.slice(1)})` : "");

  // --- LOGIQUE DE FERMETURE DES INSCRIPTIONS PRÉSENTIELLES ---
  const today = new Date();
  const currentMonth = today.getMonth(); // 0 = Janvier, 11 = Décembre
  const currentDay = today.getDate();

  let isPresentielBlocked = false;
  // Fermé du 30 Novembre au 30 Avril
  if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1 || currentMonth === 2) {
    isPresentielBlocked = true; // Dec, Jan, Feb, Mar
  } else if (currentMonth === 10 && currentDay >= 30) {
    isPresentielBlocked = true; // A partir du 30 Novembre
  } else if (currentMonth === 3 && currentDay < 30) {
    isPresentielBlocked = true; // Jusqu'au 29 Avril
  }

  const isPlanPresentiel = planId?.toLowerCase().includes('presentiel') || audienceParam?.toLowerCase().includes('presentiel');

  if (isPlanPresentiel && isPresentielBlocked) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-4xl font-black text-[#101828] mb-10 tracking-tight">
          Rejoignez l'institut.
        </h1>
        <div className="relative z-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-16 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Les inscriptions en présentiel sont actuellement fermées.</h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-lg">
            La prochaine campagne d'inscription débutera le <span className="font-bold text-ishes-blue">30 avril</span>. <br/><br/>
            En attendant, nos formations en <span className="font-bold">distanciel</span> restent ouvertes toute l'année !
          </p>
          <div className="mt-8">
            <button 
              onClick={() => router.push('/program')}
              className="bg-ishes-blue text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-ishes-blue/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Découvrir nos cours en distanciel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-center text-4xl font-black text-[#101828] mb-10 tracking-tight">
        Rejoignez l'institut.
      </h1>

      {/* Main Container */}
      <div className="relative z-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-100 -z-10"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => setStep(1)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all ${step >= 1 ? "bg-ishes-blue text-white" : "bg-gray-100 text-gray-400"
              }`}>
              1
            </div>
            <span className={`text-[10px] font-black tracking-widest uppercase transition-all ${step >= 1 ? "text-ishes-blue" : "text-gray-400"
              }`}>Infos</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => { if (step > 2) setStep(2) }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? "bg-ishes-blue text-white shadow-md" : "bg-gray-100 text-gray-400"
              }`}>
              2
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-all ${step >= 2 ? "text-ishes-blue" : "text-gray-400"
              }`}>Cours</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2 cursor-pointer" onClick={() => { if (step > 3) setStep(3) }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 3 ? "bg-ishes-blue text-white shadow-md" : "bg-gray-100 text-gray-400"
              }`}>
              3
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-all ${step >= 3 ? "text-ishes-blue" : "text-gray-400"
              }`}>Important</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 4 ? "bg-ishes-blue text-white shadow-md" : "bg-gray-100 text-gray-400"
              }`}>
              4
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-all ${step >= 4 ? "text-ishes-blue" : "text-gray-400"
              }`}>Paiement</span>
          </div>
        </div>

        {/* Selected Plan Banner (if a plan was passed via URL) */}
        {planName && (
          <div className="mb-10 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-green-600 font-bold uppercase text-[10px] tracking-wider block mb-1">Formation sélectionnée</span>
              <span className="text-gray-900 font-black">{planName}</span>
            </div>
            <Link href="/program" className="text-xs font-bold text-green-700 hover:text-green-800 underline">Modifier</Link>
          </div>
        )}

        {/* Form Content */}
        <div>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-black text-[#101828] mb-8">Vos informations</h2>

              {/* Registration Type Selection - Only show if not already forced */}
              {!(isForcedChild || isForcedSelf) && (
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => setRegistrationType("self")}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-3 ${registrationType === "self"
                      ? "border-ishes-blue bg-ishes-blue/5 text-ishes-blue"
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                      }`}
                  >
                    <span className="text-xl">🙋‍♂️</span> Je souhaite m'inscrire
                  </button>
                  <button
                    onClick={() => setRegistrationType("child")}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-3 ${registrationType === "child"
                      ? "border-ishes-blue bg-ishes-blue/5 text-ishes-blue"
                      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                      }`}
                  >
                    <span className="text-xl">👶</span> Inscrire mon enfant
                  </button>
                </div>
              )}

              {/* Force Child title if forced */}
              {isForcedChild && (
                <div className="mb-8 p-4 bg-green-50 rounded-2xl border border-green-100">
                  <h3 className="text-sm font-black text-green-700 uppercase tracking-widest flex items-center gap-2">
                    <span>👶</span> INSCRIPTION ENFANT (SCOLARITÉ)
                  </h3>
                </div>
              )}

              <div className="space-y-6">
                {registrationType === 'child' ? (
                  <div className="space-y-8">
                    {/* Information Box for multiple courses */}
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3 text-sm text-blue-900 shadow-sm">
                      <span className="text-xl shrink-0 mt-0.5">ℹ️</span>
                      <p className="leading-relaxed">
                        <strong>Note :</strong> Vous inscrivez actuellement vos enfants à la formation <strong className="text-ishes-blue">{planName}</strong>. 
                        Pour inscrire un enfant à une <strong>autre formation</strong>, finalisez cette inscription puis faites-en une nouvelle. 
                        En utilisant le même e-mail parent, tous vos enfants seront regroupés sur votre compte.
                      </p>
                    </div>

                    {childrenList.map((child, index) => (
                      <div key={index} className="p-6 bg-gray-50 border border-gray-100 rounded-3xl space-y-6 relative">
                        {childrenList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setChildrenList(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-6 right-6 text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm transition-all hover:border-red-200 hover:bg-red-50/50"
                          >
                            Supprimer
                          </button>
                        )}
                        <h3 className="text-xs font-black text-ishes-blue uppercase tracking-widest flex items-center gap-2">
                          <span>👶</span> ENFANT N°{index + 1}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Prenom */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                              Prénom de l'enfant *
                            </label>
                            <input
                              type="text"
                              value={child.prenom}
                              onChange={(e) => handleChildInputChange(index, 'prenom', e.target.value)}
                              placeholder="Prénom"
                              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                              required
                            />
                          </div>

                          {/* Nom */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                              Nom de l'enfant *
                            </label>
                            <input
                              type="text"
                              value={child.nom}
                              onChange={(e) => handleChildInputChange(index, 'nom', e.target.value)}
                              placeholder="Nom"
                              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                              required
                            />
                          </div>
                        </div>

                        {/* Niveau / Créneau */}
                        {planId === 'presentiel-global' && (() => {
                          const slotVal = child.slot || (slot ? slot.toLowerCase() : "");
                          const childHoraires = PRESENTIEL_CLASSES.filter((c) =>
                            c.planId === 'presentiel-global' &&
                            c.audience === 'enfant' &&
                            c.slotKey === slotVal.toLowerCase() &&
                            c.niveauKey === child.niveau
                          );
                          const idsForChildDay = (day: string) => PRESENTIEL_CLASSES
                            .filter((c) =>
                              c.planId === 'presentiel-global' &&
                              c.audience === 'enfant' &&
                              c.slotKey === day
                            )
                            .map((c) => c.id);
                          const childDayFull = Boolean(slotVal) && areClassesAllFull(slotsStatus, idsForChildDay(slotVal.toLowerCase()));
                          const uniqueChildLevels: PresentielClass[] = [];
                          const seenChildLevels = new Set<string>();
                          if (slotVal) {
                            PRESENTIEL_CLASSES.filter((c) =>
                              c.planId === 'presentiel-global' &&
                              c.audience === 'enfant' &&
                              c.slotKey === slotVal.toLowerCase()
                            ).forEach((c) => {
                              if (!seenChildLevels.has(c.niveauKey)) {
                                seenChildLevels.add(c.niveauKey);
                                uniqueChildLevels.push(c);
                              }
                            });
                          }
                          return (
                            <div className="flex flex-col gap-6 md:col-span-2">
                              {/* Jour select */}
                              <div className="space-y-2 relative" onClickCapture={() => { if (!!slot) setShowDisabledSlotWarning(true); }}>
                                <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                                  <span>📅</span> Jour souhaité *
                                </label>
                                {slot ? (
                                  <div className={cn(
                                    "w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold",
                                    childDayFull
                                      ? "bg-red-50 border-2 border-red-500 text-red-950"
                                      : "bg-gray-50 border border-gray-200 text-gray-500",
                                  )}>
                                    <span className="capitalize">{slotVal || slot}</span>
                                    {childDayFull && (
                                      <span className="shrink-0 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                                        Complet
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <PresentielChoicePicker
                                    layout="inline"
                                    options={[
                                      { value: "mercredi", label: "Mercredi", full: areClassesAllFull(slotsStatus, idsForChildDay("mercredi")) },
                                      { value: "samedi", label: "Samedi", full: areClassesAllFull(slotsStatus, idsForChildDay("samedi")) },
                                      { value: "dimanche", label: "Dimanche", full: areClassesAllFull(slotsStatus, idsForChildDay("dimanche")) },
                                    ]}
                                    value={slotVal}
                                    onChange={(day) => handleChildInputChange(index, "slot", day)}
                                    lockedPlaceholder="— Choisir un jour —"
                                  />
                                )}
                                {!!slot && showDisabledSlotWarning && (
                                  <p className="text-red-500 text-[10px] mt-1 font-bold animate-pulse">
                                    Veuillez revenir à la page précédente pour sélectionner un autre jour.
                                  </p>
                                )}
                              </div>

                              {/* Niveau select */}
                              <div className="space-y-2 relative">
                                <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                                  <span className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[7px]">📖</span>
                                  Niveau de l'élève *
                                </label>
                                <div className="relative">
                                  <PresentielChoicePicker
                                    options={uniqueChildLevels.map((c) => {
                                      const ids = PRESENTIEL_CLASSES
                                        .filter((x) =>
                                          x.planId === 'presentiel-global' &&
                                          x.audience === 'enfant' &&
                                          x.slotKey === slotVal.toLowerCase() &&
                                          x.niveauKey === c.niveauKey
                                        )
                                        .map((x) => x.id);
                                      return {
                                        value: c.niveauKey,
                                        label: `${c.niveau} (${c.ageCondition})`,
                                        full: areClassesAllFull(slotsStatus, ids),
                                      };
                                    })}
                                    value={child.niveau}
                                    onChange={(niveau) => handleChildInputChange(index, "niveau", niveau)}
                                    disabled={!slotVal}
                                    lockedPlaceholder="— Choisir d'abord le jour —"
                                    emptyPlaceholder="— Choisir un niveau —"
                                  />
                                  {!slotVal && (
                                    <div
                                      className="absolute inset-0 z-10 cursor-not-allowed"
                                      onClick={() => setShowChildNiveauError(prev => ({ ...prev, [index]: true }))}
                                    />
                                  )}
                                </div>
                                {showChildNiveauError[index] && !slotVal && (
                                  <p className="text-red-500 text-[10px] mt-1 animate-pulse font-medium">Veuillez d'abord sélectionner le jour souhaité.</p>
                                )}
                              </div>

                              {/* Horaire select */}
                              <div className="space-y-2 relative">
                                <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                                  <span>⏰</span> Horaire disponible *
                                </label>
                                <div className="relative">
                                  <PresentielHorairePicker
                                    options={childHoraires.map((c) => ({ id: c.id, label: c.horaire }))}
                                    slotsStatus={slotsStatus}
                                    value={child.classId}
                                    onChange={(classId) => handleChildInputChange(index, 'classId', classId)}
                                    disabled={!child.niveau}
                                    lockedPlaceholder="— Choisir d'abord le niveau —"
                                  />
                                  {!child.niveau && (
                                    <div
                                      className="absolute inset-0 z-10 cursor-not-allowed"
                                      onClick={() => setShowChildHoraireError(prev => ({ ...prev, [index]: true }))}
                                    />
                                  )}
                                </div>
                                {showChildHoraireError[index] && !child.niveau && (
                                  <p className="text-red-500 text-[10px] mt-1 animate-pulse font-medium">Veuillez d'abord sélectionner le niveau de l'élève.</p>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => setChildrenList([...childrenList, { prenom: "", nom: "", niveau: "", slot: "", horaire: "", classId: "" }])}
                      className="w-full py-4 px-6 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-black text-ishes-blue hover:border-ishes-blue hover:bg-ishes-blue/5 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"
                    >
                      <span>➕</span> Inscrire un autre enfant (−50 €)
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Prenom */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                        <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="Mohamed"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Nom */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                        <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">👤</span>
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Dubair"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Niveau / Créneau */}
                    {planId === 'presentiel-global' && (() => {
                      const slotVal = formData.slot || (slot ? slot.toLowerCase() : "");
                      const adultHoraires = PRESENTIEL_CLASSES.filter((c) =>
                        c.planId === 'presentiel-global' &&
                        c.audience === 'adulte' &&
                        c.type === 'femme' &&
                        c.slotKey === slotVal.toLowerCase() &&
                        c.niveauKey === formData.niveau
                      );
                      const idsForAdultDay = (day: string) => PRESENTIEL_CLASSES
                        .filter((c) =>
                          c.planId === 'presentiel-global' &&
                          c.audience === 'adulte' &&
                          c.type === 'femme' &&
                          c.slotKey === day
                        )
                        .map((c) => c.id);
                      const adultDayFull = Boolean(slotVal) && areClassesAllFull(slotsStatus, idsForAdultDay(slotVal.toLowerCase()));
                      const uniqueAdultLevels: PresentielClass[] = [];
                      const seenAdultLevels = new Set<string>();
                      if (slotVal) {
                        PRESENTIEL_CLASSES.filter((c) =>
                          c.planId === 'presentiel-global' &&
                          c.audience === 'adulte' &&
                          c.type === 'femme' &&
                          c.slotKey === slotVal.toLowerCase()
                        ).forEach((c) => {
                          if (!seenAdultLevels.has(c.niveauKey)) {
                            seenAdultLevels.add(c.niveauKey);
                            uniqueAdultLevels.push(c);
                          }
                        });
                      }
                      return (
                        <div className="flex flex-col gap-6 md:col-span-2">
                          {/* Jour select */}
                          <div className="space-y-2 relative" onClickCapture={() => { if (!!slot) setShowDisabledSlotWarning(true); }}>
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span>📅</span> Jour souhaité *
                            </label>
                            {slot ? (
                              <div className={cn(
                                "w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold",
                                adultDayFull
                                  ? "bg-red-50 border-2 border-red-500 text-red-950"
                                  : "bg-gray-50 border border-gray-200 text-gray-500",
                              )}>
                                <span className="capitalize">{slotVal || slot}</span>
                                {adultDayFull && (
                                  <span className="shrink-0 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                                    Complet
                                  </span>
                                )}
                              </div>
                            ) : (
                              <PresentielChoicePicker
                                layout="inline"
                                options={[
                                  { value: "samedi", label: "Samedi", full: areClassesAllFull(slotsStatus, idsForAdultDay("samedi")) },
                                  { value: "dimanche", label: "Dimanche", full: areClassesAllFull(slotsStatus, idsForAdultDay("dimanche")) },
                                ]}
                                value={slotVal}
                                onChange={(day) => handleInputChange({
                                  target: { name: "slot", value: day },
                                } as ChangeEvent<HTMLSelectElement>)}
                                lockedPlaceholder="— Choisir un jour —"
                              />
                            )}
                            {!!slot && showDisabledSlotWarning && (
                              <p className="text-red-500 text-[10px] mt-1 font-bold animate-pulse">
                                Veuillez revenir à la page précédente pour sélectionner un autre jour.
                              </p>
                            )}
                          </div>

                          {/* Niveau select */}
                          <div className="space-y-2 relative">
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[7px]">📖</span>
                              Niveau Actuel *
                            </label>
                            <div className="relative">
                              <PresentielChoicePicker
                                options={uniqueAdultLevels.map((c) => ({
                                  value: c.niveauKey,
                                  label: c.niveauKey === "femme_debutante" ? "Femme Débutante" : "Femme Intermédiaire",
                                  full: isClassFull(slotsStatus, c.id),
                                }))}
                                value={formData.niveau}
                                onChange={(niveau) => handleInputChange({
                                  target: { name: "niveau", value: niveau },
                                } as ChangeEvent<HTMLSelectElement>)}
                                disabled={!slotVal}
                                lockedPlaceholder="— Choisir d'abord le jour —"
                                emptyPlaceholder="— Choisir un niveau —"
                              />
                              {!slotVal && (
                                <div
                                  className="absolute inset-0 z-10 cursor-not-allowed"
                                  onClick={() => setShowAdultNiveauError(true)}
                                />
                              )}
                            </div>
                            {showAdultNiveauError && !slotVal && (
                              <p className="text-red-500 text-[10px] mt-1 animate-pulse font-medium">Veuillez d'abord sélectionner le jour souhaité.</p>
                            )}
                          </div>

                          {/* Option / Horaire select */}
                          <div className="space-y-2 relative">
                            <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                              <span>⏰</span> Horaire disponible *
                            </label>
                            <div className="relative">
                              <PresentielHorairePicker
                                options={adultHoraires.map((c) => ({
                                  id: c.id,
                                  label: `${c.niveau.replace("Femme débutante ", "").replace("Femme intermédiaire ", "")} (${c.horaire})`,
                                }))}
                                slotsStatus={slotsStatus}
                                value={formData.classId}
                                onChange={(classId) => handleInputChange({
                                  target: { name: 'classId', value: classId },
                                } as ChangeEvent<HTMLSelectElement>)}
                                disabled={!formData.niveau}
                                lockedPlaceholder="— Choisir d'abord le niveau —"
                              />
                              {!formData.niveau && (
                                <div
                                  className="absolute inset-0 z-10 cursor-not-allowed"
                                  onClick={() => setShowAdultHoraireError(true)}
                                />
                              )}
                            </div>
                            {showAdultHoraireError && !formData.niveau && (
                              <p className="text-red-500 text-[10px] mt-1 animate-pulse font-medium">Veuillez d'abord sélectionner le niveau.</p>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
                {/* Informations du parent / représentant (SI ENFANT) */}
                {registrationType === 'child' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div className="md:col-span-2">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Informations du parent / représentant</h3>
                    </div>
                    {/* Prenom Représentant */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        Prénom du représentant *
                      </label>
                      <input
                        type="text"
                        name="parentPrenom"
                        value={formData.parentPrenom}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                        required
                      />
                    </div>
                    {/* Nom Représentant */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        Nom du représentant *
                      </label>
                      <input
                        type="text"
                        name="parentNom"
                        value={formData.parentNom}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                    <span className="w-3 h-3 border border-gray-400 rounded flex items-center justify-center text-[7px]">✉️</span>
                    {registrationType === 'self' ? 'Adresse Email *' : 'Email du responsable *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="vous@exemple.fr"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                    required
                  />
                </div>

                {/* Telephone */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-widest text-gray-500 flex items-center gap-2 uppercase">
                    <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[7px]">📞</span>
                    {registrationType === 'self' ? 'Téléphone *' : 'Téléphone du responsable *'}
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="06 XX XX XX XX"
                    value={formData.telephone}
                    onChange={(event) => {
                      let val = event.target.value;
                      if (val.startsWith("+33") && val.length > 12) {
                        val = val.slice(0, 12);
                      }
                      setFormData(prev => ({ ...prev, telephone: val }));
                    }}
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008953]/20 focus:border-ishes-blue transition-all text-sm font-medium"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={nextStep}
                  disabled={
                    !formData.email ||
                    (registrationType === 'child'
                      ? (
                        !formData.parentPrenom ||
                        !formData.parentNom ||
                        childrenList.some(c =>
                          !c.prenom ||
                          !c.nom ||
                          (planId === 'presentiel-global'
                            ? !c.classId
                            : !c.niveau)
                        )
                      )
                      : (
                        !formData.prenom ||
                        !formData.nom ||
                        (planId === 'presentiel-global'
                          ? !formData.classId
                          : !formData.niveau)
                      )
                    ) ||
                    !formData.telephone ||
                    !isPossiblePhoneNumber(formData.telephone)
                  }
                  className="w-full bg-ishes-blue hover:bg-[#007044] disabled:bg-gray-200 text-white font-bold text-lg py-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Continuer <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
              <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
                {/* Mascot Image */}
                <div className="w-full max-w-[320px] relative">
                  <img
                    src="/images/mascotte-ishes-toulouse.png"
                    alt="Mascotte ISHES"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </div>

                {/* Message Bubble Container */}
                <div className="flex-1">
                  <div className="bg-[#007044] text-white p-8 md:p-10 rounded-[3rem] shadow-2xl relative">
                    {/* Speech Bubble Tail (CSS triangle) */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#007044] rotate-45 -translate-y-1/2 hidden lg:block" />

                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquareText className="w-6 h-6 text-white/80" />
                      <h3 className="text-xl font-black tracking-tight underline decoration-ishes-blue decoration-4 underline-offset-4">Message de la ville</h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xl md:text-2xl font-bold leading-relaxed">
                        "Une fois payé, utilisez votre mail <span className="text-white underline decoration-2">{formData.email || 'votre email'}</span> pour vous inscrire sur <span className="underline decoration-2">ISHEECOLE</span> !"
                      </p>
                      <div className="pt-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Activation Automatique
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col md:flex-row gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-white border-2 border-gray-100 text-gray-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-gray-300 transition-all"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNextWithSave}
                  className="flex-[2] bg-ishes-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#007044] transition-all flex items-center justify-center gap-3 shadow-xl shadow-ishes-blue/20"
                >
                  J'AI COMPRIS, PAYER <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6">
              <h2 className="text-2xl font-black text-[#101828] text-center mb-8">Récapitulatif de votre programme</h2>

              {/* Recap Card */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 max-w-xl mx-auto mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    {planId === 'tajwid_intensif' ? '🚀' :
                      planId === 'tajwid_standard' ? '🕌' :
                        planId === 'sciences_islamiques' ? '📖' :
                          planId === 'arabe_coran_junior' ? '👶' : '✨'}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#101828]">
                      {((planId === 'presentiel-global' && planName?.toLowerCase().includes('débutant') && planName?.toLowerCase().includes('arabe') && planName?.toLowerCase().includes('tajwid')) || planId === 'femme_debutante_presentiel' || planId === 'debutante_presentiel') ? 'Arabe & Tajwid débutant' 
                      : ((planId === 'presentiel-global' && planName?.toLowerCase().includes('interm') && planName?.toLowerCase().includes('arabe') && planName?.toLowerCase().includes('tajwid')) || planId === 'femme_intermediaire_presentiel' || planId === 'intermediaire_presentiel') ? 'Arabe & Tajwid 2eme année'
                      : (planName || "Votre Formation")}
                    </h3>
                    <p className="text-xs font-bold text-ishes-blue uppercase tracking-widest mt-1">
                      Durée : {PROGRAMS_DATA[planId || ""]?.duration || "Selon programme"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200/50 pt-6 mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Ce qui est inclus dans votre formation :</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(planId === 'tajwid_intensif'
                      ? ["Méthode intensive", "Lecture rapide", "Autonomie totale", "Coaching audio"]
                      : planId === 'tajwid_standard'
                        ? ["Cours en présentiel", "Suivi personnalisé", "Pédagogie structurée", "Manuel inclus"]
                        : planId === 'sciences_islamiques'
                          ? ["Fiqh Malikite", "Piliers de l'Islam", "Éthique & Spiritualité", "Cours interactifs"]
                          : (planId === 'presentiel-global' && registrationType === 'child')
                            ? ["Enseignement Arabe", "Hifz Coran", "Enseignement Tajwid", "Activités ludiques"]
                          : ((planId === 'presentiel-global' && planName?.toLowerCase().includes('débutant') && planName?.toLowerCase().includes('arabe') && planName?.toLowerCase().includes('tajwid')) || planId === 'femme_debutante_presentiel' || planId === 'debutante_presentiel')
                            ? ["Bases de l'Arabe", "Bases du Tajwid (Coran)", "Théorie & pratique", "Diplôme final"]
                          : ((planId === 'presentiel-global' && planName?.toLowerCase().includes('interm') && planName?.toLowerCase().includes('arabe') && planName?.toLowerCase().includes('tajwid')) || planId === 'femme_intermediaire_presentiel' || planId === 'intermediaire_presentiel')
                            ? ["Perfectionnement Arabe", "Maîtrise des règles de Tajwid", "Théorie & pratique", "Diplôme final"]
                            : ["Pédagogie certifiée CECRL", "Suivi individuel", "Supports modernes", "Excellence ISHES"]
                    ).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-ishes-blue shrink-0" />
                        <span className="text-xs text-gray-700 font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {registrationType === 'child' && (
                  <div className="border-t border-gray-200/50 pt-4 text-center">
                    <p className="text-xs font-bold text-gray-400">
                      Nombre d'élèves inscrits : <span className="text-[#101828] font-black">{childrenList.length} enfant(s)</span>
                    </p>
                    {siblingDiscount > 0 && (
                      <p className="text-xs font-bold text-ishes-blue mt-2">
                        Réduction fratrie : −{siblingDiscount} €
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-white border-2 border-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-gray-300 transition-all"
                >
                  ← Retour
                </button>
                <button
                  onClick={nextStep}
                  className="flex-[2] bg-ishes-blue text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#007044] transition-all flex items-center justify-center gap-3 shadow-xl shadow-ishes-blue/20"
                >
                  Continuer <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="mb-10">
                <div className="w-24 h-24 bg-green-50 text-ishes-blue rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-ishes-blue mb-4 tracking-tight">Dernière étape !</h2>
                <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                  Votre inscription pour <span className="text-ishes-dark font-bold">{planName}</span> est presque terminée.
                  Utilisez votre email <span className="text-ishes-blue font-bold">{formData.email}</span> pour finaliser la création de votre compte.
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10 max-w-md mx-auto">
                {siblingDiscount > 0 && (
                  <div className="space-y-2 mb-4 text-sm font-bold text-gray-500">
                    <div className="flex justify-between items-center">
                      <span className="uppercase tracking-widest text-[11px]">Sous-total ({childrenList.length} × {getBasePriceOfPlan(planId)} €)</span>
                      <span className="text-gray-400 line-through">{getSubtotal()},00 €</span>
                    </div>
                    <div className="flex justify-between items-center text-ishes-blue">
                      <span className="uppercase tracking-widest text-[11px]">Réduction fratrie</span>
                      <span>−{siblingDiscount},00 €</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
                  <span>Total à régler</span>
                  <span className="text-ishes-dark">
                    {getPrice()},00 €
                  </span>
                </div>
                <div className="h-[1px] bg-gray-200 mb-6" />

                {/* Sélecteur interactive de mensualités */}
                {getPrice() > 0 && (
                  <div className="mb-6 text-left">
                    <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-3">
                      Option de paiement
                    </label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {/* Option 1x */}
                      <button
                        type="button"
                        onClick={() => setSelectedInstallments(1)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedInstallments === 1
                            ? "border-ishes-blue bg-ishes-blue/5 text-[#101828]"
                            : "border-gray-100 bg-white hover:border-gray-200 text-gray-600"
                          }`}
                      >
                        <div>
                          <span className="font-bold text-sm block">En 1 fois</span>
                          <span className="text-[10px] text-gray-400 font-medium">Règlement unique sans frais</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm text-ishes-blue">{getPrice()},00 €</span>
                        </div>
                      </button>

                      {/* Option 3x */}
                      {getPrice() >= 100 && (
                        <button
                          type="button"
                          onClick={() => setSelectedInstallments(3)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedInstallments === 3
                              ? "border-ishes-blue bg-ishes-blue/5 text-[#101828]"
                              : "border-gray-100 bg-white hover:border-gray-200 text-gray-600"
                            }`}
                        >
                          <div>
                            <span className="font-bold text-sm block">En 3 fois</span>
                            <span className="text-[10px] text-gray-400 font-medium">3 mensualités</span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="font-bold text-sm text-ishes-blue">{(getPrice() / 3).toFixed(2)} €</span>
                            <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">/ mois</span>
                          </div>
                        </button>
                      )}

                      {/* Option 5x */}
                      {getPrice() >= 100 && (
                        <button
                          type="button"
                          onClick={() => setSelectedInstallments(5)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedInstallments === 5
                              ? "border-ishes-blue bg-ishes-blue/5 text-[#101828]"
                              : "border-gray-100 bg-white hover:border-gray-200 text-gray-600"
                            }`}
                        >
                          <div>
                            <span className="font-bold text-sm block">En 5 fois</span>
                            <span className="text-[10px] text-gray-400 font-medium">5 mensualités</span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="font-bold text-sm text-ishes-blue">{(getPrice() / 5).toFixed(2)} €</span>
                            <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">/ mois</span>
                          </div>
                        </button>
                      )}

                      {/* Option 10x (Seulement Présentiel) */}
                      {getPrice() >= 100 && (planId === 'tajwid_standard' || planId === 'presentiel-global' || planId?.includes('presentiel')) && (
                        <button
                          type="button"
                          onClick={() => setSelectedInstallments(10)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedInstallments === 10
                              ? "border-ishes-blue bg-ishes-blue/5 text-[#101828]"
                              : "border-gray-100 bg-white hover:border-gray-200 text-gray-600"
                            }`}
                        >
                          <div>
                            <span className="font-bold text-sm block">En 10 fois</span>
                            <span className="text-[10px] text-gray-400 font-medium">10 mensualités (Spécial Présentiel)</span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="font-bold text-sm text-ishes-blue">{(getPrice() / 10).toFixed(2)} €</span>
                            <span className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">/ mois</span>
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="h-[1px] bg-gray-200 mt-6 mb-6" />
                  </div>
                )}

                {registrationType === 'child' && childrenList.length > 1 && (
                  <div className="text-left text-xs font-bold text-gray-500 mb-6 bg-green-50/50 border border-green-100/50 p-4 rounded-xl">
                    <span className="text-ishes-blue">Multi-inscription ({childrenList.length} enfants) :</span>
                    <ul className="mt-2 space-y-1 text-gray-600 font-medium list-disc list-inside">
                      {childrenList.map((c, i) => (
                        <li key={i}>{c.prenom} {c.nom}{i > 0 ? ' (−50 €)' : ''}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-ishes-blue font-black">Économie : {siblingDiscount} €</p>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 text-left">
                  <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5" /> Accès au logiciel ISHEECOLE
                  </h4>
                  <p className="text-xs text-blue-900 font-medium leading-relaxed">
                    Dès la validation de votre paiement, vous recevrez un email pour créer votre mot de passe. Votre espace vous permettra de suivre votre scolarité.
                  </p>
                </div>

                <div className="flex items-start gap-3 mb-8 text-left group cursor-pointer" onClick={() => setAcceptedTerms(!acceptedTerms)}>
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${acceptedTerms ? 'bg-ishes-blue border-ishes-blue' : 'border-gray-300 bg-white group-hover:border-ishes-blue'}`}>
                    {acceptedTerms && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                    J'accepte les <Link href="/cgv" className="text-ishes-blue underline" onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}>Conditions Générales de Vente</Link> et je reconnais mon droit de rétractation et de remboursement de 14 jours conformément à la loi.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loadingCheckout || !acceptedTerms}
                  className="w-full bg-ishes-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-ishes-dark/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingCheckout ? "Redirection..." : "Payer & Créer mon compte"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setStep(3)}
                className="text-gray-400 font-bold text-xs hover:text-gray-600 underline uppercase tracking-widest"
              >
                Modifier mes informations
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-32 pt-32 lg:pt-40 px-4 relative">
      <ArabicBackground />
      <Suspense fallback={
        <div className="max-w-4xl mx-auto text-center py-20 text-gray-500 font-bold">
          Chargement du formulaire d'inscription...
        </div>
      }>
        <InscriptionForm />
      </Suspense>
    </div>
  );
}
