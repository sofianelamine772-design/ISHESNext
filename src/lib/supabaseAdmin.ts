import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client avec privilèges admin pour bypasser RLS lors de la création d'utilisateur
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
