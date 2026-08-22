import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { PROGRAMS_DATA } from '@/lib/programs-data';
import { CLASS_ID_TO_UUID } from '@/lib/presentiel-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws as any,
  }
});

describe('Vérification globale des Formations et Classes (End-to-End)', () => {
  let dbFormations: any[] = [];

  beforeAll(async () => {
    const { data, error } = await supabase.from('formations').select('id, slug, price, title');
    if (error) {
      throw new Error("Impossible de récupérer les formations depuis Supabase : " + error.message);
    }
    dbFormations = data || [];
  });

  describe('Cohérence des prix des formations (Frontend vs DB)', () => {
    // Dynamic extraction of test cases
    const formationsTestCases = Object.entries(PROGRAMS_DATA).map(([slug, data]: [string, any]) => {
      const priceMatch = String(data.price).replace(/[^\d]/g, '');
      const expectedPrice = priceMatch ? parseInt(priceMatch, 10) : null;
      return { slug, expectedPrice };
    }).filter(f => f.expectedPrice !== null);

    test.each(formationsTestCases)(
      'La formation "$slug" doit exister en DB avec le prix de $expectedPrice€',
      ({ slug, expectedPrice }) => {
        const dbRow = dbFormations.find((f: any) => f.slug === slug);
        expect(dbRow).toBeDefined();
        if (dbRow) {
          expect(dbRow.price).toBe(expectedPrice);
        }
      }
    );
  });

  describe('Cohérence des UUID de classes présentiel (Frontend vs DB)', () => {
    const classCases = Object.entries(CLASS_ID_TO_UUID).map(([classId, uuid]) => ({
      classId,
      uuid
    }));

    test.each(classCases)(
      'La classe (ID frontend: $classId) doit pointer vers un UUID valide',
      async ({ classId, uuid }) => {
        const { data: classRow, error } = await supabase
          .from('classes')
          .select('id, name')
          .eq('id', uuid)
          .maybeSingle();

        expect(error).toBeNull();
        expect(classRow).toBeDefined();
        expect(classRow).not.toBeNull();
      }
    );
  });

  afterAll(async () => {
    // Nettoyer la connexion WebSocket Supabase pour éviter que Jest ne pende (hang)
    await supabase.removeAllChannels();
  });
});
