/// <reference types="jest" />
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { PROGRAMS_DATA } from '@/lib/programs-data';
import { CLASS_ID_TO_UUID, PRESENTIEL_CLASSES } from '@/lib/presentiel-data';
import { DISTANCE_CLASS_ID_TO_UUID } from '@/lib/distance-data';

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
    const formationsTestCases = Object.entries(PROGRAMS_DATA).map(([key, data]: [string, any]) => {
      const priceMatch = String(data.price).replace(/[^\d]/g, '');
      const expectedPrice = priceMatch ? parseInt(priceMatch, 10) : null;
      // Le frontend utilise les tirets pour les femmes en présentiel dans le checkout
      let slug = data.id || key;
      if (slug === 'femme_debutante_presentiel') slug = 'femme-debutante-presentiel';
      if (slug === 'femme_intermediaire_presentiel') slug = 'femme-intermediaire-presentiel';
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

    it('Tajwid Intensif est à 799 € en base (source de vérité checkout)', () => {
      const row = dbFormations.find((f: any) => f.slug === 'tajwid_intensif');
      expect(row).toBeDefined();
      expect(row.price).toBe(799);
    });
  });

  describe('Cohérence des UUID de classes présentiel et distanciel (Frontend vs DB)', () => {
    const classCases = [
      ...Object.entries(CLASS_ID_TO_UUID),
      ...Object.entries(DISTANCE_CLASS_ID_TO_UUID)
    ].map(([classId, uuid]) => ({
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

  describe('Correspondance des ID frontend (external_id / UUID) dans la base', () => {
    const externalIdCases = PRESENTIEL_CLASSES.map(c => ({ externalId: c.id, name: `${c.jour} - ${c.niveau}` }));

    test.each(externalIdCases)(
      'La classe $name (external_id: $externalId) doit exister dans la base',
      async ({ externalId }) => {
        const { data: classRow, error } = await supabase
          .from('classes')
          .select('id, external_id')
          .eq('external_id', externalId)
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

describe('Catalogue présentiel live (déploiement)', () => {
  let presentielClasses: any[] = [];

  beforeAll(async () => {
    const { data, error } = await supabase
      .from('classes')
      .select('id, external_id, is_active, type, name')
      .eq('type', 'presentiel');
    if (error) {
      throw new Error("Impossible de récupérer les classes présentiel : " + error.message);
    }
    presentielClasses = data || [];
  });

  it('a exactement 25 classes officielles actives (1–25), sans doublon', () => {
    const official = presentielClasses.filter(
      (c) => typeof c.external_id === 'number' && c.external_id >= 1 && c.external_id <= 25
    );
    const active = official.filter((c) => c.is_active);
    expect(active).toHaveLength(25);
    expect(new Set(active.map((c) => c.external_id)).size).toBe(25);
  });

  it('les classes hors catalogue (1024+, session fantôme) sont inactives', () => {
    const leftovers = presentielClasses.filter(
      (c) => !(typeof c.external_id === 'number' && c.external_id >= 1 && c.external_id <= 25)
    );
    expect(leftovers.length).toBeGreaterThan(0);
    expect(leftovers.every((c) => c.is_active === false)).toBe(true);
  });

  it('les UUID checkout du site correspondent à des classes actives en base', () => {
    for (const c of PRESENTIEL_CLASSES) {
      const uuid = CLASS_ID_TO_UUID[c.id];
      const row = presentielClasses.find((x) => x.id === uuid);
      expect(row).toBeDefined();
      expect(row?.external_id).toBe(c.id);
      expect(row?.is_active).toBe(true);
    }
  });

  afterAll(async () => {
    await supabase.removeAllChannels();
  });
});
