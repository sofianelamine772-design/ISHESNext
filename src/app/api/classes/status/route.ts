import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { filterVisiblePresentielSlots } from "@/lib/class-availability";
import { getPresentielCapacityLimit } from "@/lib/presentiel-data";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [{ data, error }, { data: activeClasses, error: activeError }] = await Promise.all([
      supabaseAdmin.from('vue_etat_creneaux').select('*'),
      supabaseAdmin
        .from('classes')
        .select('external_id')
        .eq('type', 'presentiel')
        .eq('is_active', true),
    ]);

    if (error) throw error;
    if (activeError) throw activeError;

    const visible = filterVisiblePresentielSlots(
      data || [],
      (activeClasses || []).map((c) => c.external_id),
    ).map((row: any) => {
      const official = getPresentielCapacityLimit(row.classe_numero);
      if (official == null) return row;
      const inscrits = Number(row.inscrits_count) || 0;
      return {
        ...row,
        capacity_limit: official,
        places_restantes: Math.max(0, official - inscrits),
        est_plein: inscrits >= official,
      };
    });

    return NextResponse.json(visible);
  } catch (error) {
    console.error("[CLASSES_STATUS_ERROR]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des créneaux" }, { status: 500 });
  }
}
