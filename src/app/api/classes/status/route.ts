import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('vue_etat_creneaux').select('*');
    
    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("[CLASSES_STATUS_ERROR]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des créneaux" }, { status: 500 });
  }
}
