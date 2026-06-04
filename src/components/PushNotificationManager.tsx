"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

// Utilitaire pour convertir la clé publique VAPID
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const { user, isLoaded } = useUser();
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    if (isSupported && isLoaded && user) {
      checkSubscription();
    }
  }, [isSupported, isLoaded, user]);

  const registerServiceWorker = async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  };

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      
      // Si on a déjà une souscription, on s'assure qu'elle est bien en base
      if (sub && user) {
        await saveSubscriptionToDatabase(sub);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
    }
  };

  const saveSubscriptionToDatabase = async (sub: PushSubscription) => {
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      });
    } catch (err) {
      console.error('Failed to save subscription:', err);
    }
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        console.error("VAPID public key not found");
        return;
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });
      
      setSubscription(sub);
      await saveSubscriptionToDatabase(sub);
      alert("Notifications activées avec succès !");
    } catch (err: any) {
      if (Notification.permission === 'denied') {
        alert("Les notifications sont bloquées. Veuillez les autoriser dans les paramètres de votre navigateur.");
      } else {
        console.error('Subscription failed:', err);
      }
    }
  };

  if (!isSupported || !user || subscription) {
    return null; // Déjà abonné ou non supporté ou non connecté
  }

  // Afficher une petite bannière pour demander l'activation
  return (
    <div className="bg-[#086b51] text-white p-3 px-4 md:px-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3">
        <span className="text-xl">🔔</span>
        <div>
          <h4 className="font-bold text-sm">Activez les notifications</h4>
          <p className="text-xs text-[#086b51]/20 text-white/80">Recevez un avertissement lors d'un nouveau message ou d'une annonce.</p>
        </div>
      </div>
      <button 
        onClick={subscribeToPush}
        className="whitespace-nowrap bg-white text-[#086b51] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
      >
        Activer
      </button>
    </div>
  );
}
