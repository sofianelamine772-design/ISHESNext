import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { filterVisiblePresentielSlots } from "@/lib/class-availability";

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
    );

    return NextResponse.json(visible);
  } catch (error) {
    console.error("[CLASSES_STATUS_ERROR]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des créneaux" }, { status: 500 });
  }
}
