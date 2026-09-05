const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

const newClasses = [
  // Arabe Enfant
  {
    formation_id: 'arabe_enfant_distance', // Make sure this matches the formations table! Let's check formations table first... wait, formations table might not have this exact slug? I'll use it anyway.
    niveau: 'Niveau 1',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  {
    formation_id: 'arabe_enfant_distance',
    niveau: 'Niveau 2',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  {
    formation_id: 'arabe_enfant_distance',
    niveau: 'Niveau 3',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  // Tajwid Enfant
  {
    formation_id: 'tajwid_enfant_distance',
    niveau: 'Niveau 1',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  {
    formation_id: 'tajwid_enfant_distance',
    niveau: 'Niveau 2',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  {
    formation_id: 'tajwid_enfant_distance',
    niveau: 'Niveau 3',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  // Tarbya Islamya
  {
    formation_id: 'tarbiya_islamiya',
    niveau: '1ère année',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  },
  {
    formation_id: 'tarbiya_islamiya',
    niveau: '2ème année',
    professeur: 'À définir',
    places_totales: 15,
    genre: 'mixte',
    horaire: 'À définir'
  }
];

async function insertClasses() {
  console.log("Checking formations first...");
  const { data: formations, error: formError } = await supabaseAdmin
    .from('formations')
    .select('id, slug')
    .in('slug', ['arabe_enfant_distance', 'tajwid_enfant_distance', 'tarbiya_islamiya']);
    
  if (formError) {
    console.error("Error fetching formations", formError);
    return;
  }
  
  console.log("Found formations:", formations);
  
  // We need to use the actual UUID of the formation, not the slug.
  // Wait, in `classes`, is `formation_id` a UUID or the slug?
  // Let's check by querying one class.
  const { data: sampleClass } = await supabaseAdmin.from('classes').select('*').limit(1);
  console.log("Sample class:", sampleClass);

  const formationMap = formations.reduce((acc, curr) => {
    acc[curr.slug] = curr.id;
    return acc;
  }, {});

  const isSlug = sampleClass && sampleClass.length > 0 && typeof sampleClass[0].formation_id === 'string' && !sampleClass[0].formation_id.includes('-');

  const toInsert = newClasses.map(c => ({
    formation_id: isSlug ? c.formation_id : (formationMap[c.formation_id] || c.formation_id),
    niveau: c.niveau,
    professeur: c.professeur,
    places_totales: c.places_totales,
    genre: c.genre,
    horaire: c.horaire
  }));

  const { data, error } = await supabaseAdmin
    .from('classes')
    .insert(toInsert)
    .select();

  if (error) {
    console.error("Error inserting classes", error);
  } else {
    console.log("Successfully inserted classes:", data);
  }
}

insertClasses();
