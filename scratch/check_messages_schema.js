import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert({
      sender_id: 'user_123',
      receiver_id: 'admin_system',
      content: 'test',
      type: 'private'
    })
    .select('id');
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert success:', data);
    await supabaseAdmin.from('messages').delete().eq('id', data[0].id);
  }
}

main();
