import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  const body = {
    sender_id: 'admin_system',
    content: 'Test Class message',
    type: 'class',
    target_class_id: '11111111-1111-1111-1111-111111111111' // fake uuid
  };

  const insertData = {
    sender_id: body.sender_id,
    content: body.content,
    type: body.type,
    target_class_id: body.target_class_id
  };

  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert(insertData)
    .select('id, sender_id, receiver_id, content, created_at');

  console.log("Insert result:", { data, error });
}

test();
