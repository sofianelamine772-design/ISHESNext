require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function recreateClasses() {
  console.log("Recreating presentiel classes for 2026-2027...");

  // 1. Get the formation
  let { data: formation } = await supabaseAdmin
    .from('formations')
    .select('id')
    .eq('slug', 'presentiel-global')
    .single();

  if (!formation) {
    console.log("Formation presentiel-global not found, creating it...");
    const { data: newF } = await supabaseAdmin.from('formations').insert({
      title: 'Scolarité Présentiel',
      slug: 'presentiel-global',
      description: 'Accès global aux cursus enfants et adultes en présentiel',
      price: 150,
      duration: 'Annuel',
      type: 'presentiel'
    }).select().single();
    formation = newF;
  }

  const formation_id = formation.id;
  const academic_year = '2026-2027';

  const classesToInsert = [
    { external_id: 1, name: 'Prépa 1 – Mercredi', day_of_week: 'Mercredi', periode: 'après-midi', niveau: 'Préparatoire 1ère année', age_condition: '4-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_1', capacity_limit: 23 },
    { external_id: 2, name: 'Prépa 1 – Samedi Matin', day_of_week: 'Samedi', periode: 'matin', niveau: 'Préparatoire 1ère année', age_condition: '4-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_1', capacity_limit: 23 },
    { external_id: 3, name: 'Prépa 1 – Samedi A-M', day_of_week: 'Samedi', periode: 'après-midi', niveau: 'Préparatoire 1ère année', age_condition: '4-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_1', capacity_limit: 23 },
    { external_id: 4, name: 'Prépa 1 – Dimanche Matin', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Préparatoire 1ère année', age_condition: '4-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_1', capacity_limit: 23 },
    { external_id: 5, name: 'Prépa 2 – Mercredi', day_of_week: 'Mercredi', periode: 'après-midi', niveau: 'Préparatoire 2ème année', age_condition: '5-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_2', capacity_limit: 23 },
    { external_id: 6, name: 'Prépa 2 – Samedi Matin', day_of_week: 'Samedi', periode: 'matin', niveau: 'Préparatoire 2ème année', age_condition: '5-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_2', capacity_limit: 23 },
    { external_id: 7, name: 'Prépa 2 – Dimanche Matin', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Préparatoire 2ème année', age_condition: '5-6 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'maternel_2', capacity_limit: 23 },
    { external_id: 8, name: 'Élémentaire Déb.1 – Mercredi', day_of_week: 'Mercredi', periode: 'après-midi', niveau: 'Élémentaire Débutant 1', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1', capacity_limit: 23 },
    { external_id: 9, name: 'Élémentaire Déb.1 – Samedi Matin', day_of_week: 'Samedi', periode: 'matin', niveau: 'Élémentaire Débutant 1', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1', capacity_limit: 23 },
    { external_id: 10, name: 'Élémentaire Déb.1 – Samedi A-M', day_of_week: 'Samedi', periode: 'après-midi', niveau: 'Élémentaire Débutant 1', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1', capacity_limit: 23 },
    { external_id: 11, name: 'Élémentaire Déb.1 – Dimanche Matin', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Élémentaire Débutant 1', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1', capacity_limit: 23 },
    { external_id: 12, name: 'Élémentaire Déb.1 – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire Débutant 1', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1', capacity_limit: 23 },
    { external_id: 13, name: 'Élémentaire 1+ – Mercredi', day_of_week: 'Mercredi', periode: 'après-midi', niveau: 'Élémentaire 1+', age_condition: 'NON débutant', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1_plus', capacity_limit: 23 },
    { external_id: 14, name: 'Élémentaire 1+ – Samedi Matin', day_of_week: 'Samedi', periode: 'matin', niveau: 'Élémentaire 1+', age_condition: 'NON débutant', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1_plus', capacity_limit: 23 },
    { external_id: 15, name: 'Élémentaire 1+ – Samedi A-M', day_of_week: 'Samedi', periode: 'après-midi', niveau: 'Élémentaire 1+', age_condition: 'NON débutant', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1_plus', capacity_limit: 23 },
    { external_id: 16, name: 'Élémentaire 1+ – Dimanche Matin', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Élémentaire 1+', age_condition: 'NON débutant', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1_plus', capacity_limit: 23 },
    { external_id: 17, name: 'Élémentaire 1+ – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire 1+', age_condition: 'NON débutant', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_1_plus', capacity_limit: 23 },
    { external_id: 18, name: 'Élémentaire 2 et 2+ – Mercredi', day_of_week: 'Mercredi', periode: 'après-midi', niveau: 'Élémentaire 2 et 2+', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_2', capacity_limit: 23 },
    { external_id: 19, name: 'Élémentaire 2 – Dimanche Matin', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Élémentaire 2', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_2', capacity_limit: 23 },
    { external_id: 20, name: 'Élémentaire 2 – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire 2', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_2', capacity_limit: 23 },
    { external_id: 21, name: 'Élémentaire 2+ – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire 2+', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_2_plus', capacity_limit: 23 },
    { external_id: 22, name: 'Élémentaire 3 – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire 3', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_3', capacity_limit: 23 },
    { external_id: 23, name: 'Élémentaire 3 et 3+ – Mercredi', day_of_week: 'Mercredi', periode: 'après-midi', niveau: 'Élémentaire 3 et 3+', age_condition: '7-12 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_3', capacity_limit: 23 },
    { external_id: 24, name: 'Élémentaire 4 – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire 4', age_condition: '7-14 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_4', capacity_limit: 23 },
    { external_id: 25, name: 'Élémentaire 5 – Dimanche A-M', day_of_week: 'Dimanche', periode: 'après-midi', niveau: 'Élémentaire 5', age_condition: '7-15 ans', audience: 'enfant', classe_type: 'mixte', niveau_key: 'elementaire_5', capacity_limit: 23 },
    { external_id: 26, name: 'Femme Débutante – Arabe + Tajwid', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Femme débutante ARABE + TAJWID', age_condition: 'Femme', audience: 'adulte', classe_type: 'femme', niveau_key: 'femme_debutante', capacity_limit: 23 },
    { external_id: 27, name: 'Femme Débutante – Tajwid Seul', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Femme débutante TAJWID SEUL', age_condition: 'Femme', audience: 'adulte', classe_type: 'femme', niveau_key: 'femme_debutante', capacity_limit: 23 },
    { external_id: 28, name: 'Femme Débutante – Arabe Seul', day_of_week: 'Dimanche', periode: 'matin', niveau: 'Femme débutante ARABE SEUL', age_condition: 'Femme', audience: 'adulte', classe_type: 'femme', niveau_key: 'femme_debutante', capacity_limit: 23 },
    { external_id: 29, name: 'Femme Intermédiaire – Arabe', day_of_week: 'Samedi', periode: 'matin', niveau: 'Femme intermédiaire ARABE', age_condition: 'Femme', audience: 'adulte', classe_type: 'femme', niveau_key: 'femme_intermediaire', capacity_limit: 23 },
    { external_id: 30, name: 'Femme Intermédiaire – Tajwid', day_of_week: 'Samedi', periode: 'matin', niveau: 'Femme intermédiaire TAJWID', age_condition: 'Femme', audience: 'adulte', classe_type: 'femme', niveau_key: 'femme_intermediaire', capacity_limit: 23 },
    { external_id: 31, name: 'Femme Intermédiaire – Arabe + Taj.', day_of_week: 'Samedi', periode: 'après-midi', niveau: 'Femme intermédiaire ARABE + TAJ', age_condition: 'Femme', audience: 'adulte', classe_type: 'femme', niveau_key: 'femme_intermediaire', capacity_limit: 23 }
  ].map(c => ({
    ...c,
    formation_id: formation_id,
    type: 'presentiel',
    is_active: true,
    academic_year: academic_year
  }));

  const { error } = await supabaseAdmin.from('classes').upsert(classesToInsert, { onConflict: 'external_id' });
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Successfully recreated 31 classes for 2026-2027!");
  }
}

recreateClasses();
