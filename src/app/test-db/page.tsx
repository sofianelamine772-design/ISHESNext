import { supabase } from "@/lib/supabase";

export default async function TestDBPage() {
  // Tentative de lecture de la table formations qu'on vient de créer
  const { data, error } = await supabase
    .from('formations')
    .select('count')
    .single();

  const isConnected = !error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-md w-full text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className={`w-10 h-10 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        </div>
        
        <h1 className="text-2xl font-black mb-2">
          {isConnected ? 'Connexion Réussie !' : 'Échec de Connexion'}
        </h1>
        
        <p className="text-gray-500 font-medium mb-8">
          {isConnected 
            ? 'Supabase est correctement configuré et communique avec ton application.' 
            : `Erreur détectée : ${error.message}`
          }
        </p>

        {isConnected && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm font-bold text-gray-600">
               Projet ID : {process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1].split('.')[0]}
            </div>
        )}

        {!isConnected && (
            <div className="text-left bg-red-50 p-4 rounded-xl border border-red-100 text-xs text-red-600 overflow-auto">
               <p className="font-bold mb-1">Pistes de correction :</p>
               <ul className="list-disc ml-4 space-y-1">
                  <li>As-tu bien exécuté le fichier SCHEMA.sql dans Supabase ?</li>
                  <li>Les clés dans .env.local sont-elles correctes ?</li>
                  <li>Le serveur de dev a-t-il été redémarré ?</li>
               </ul>
            </div>
        )}
      </div>
    </div>
  );
}
