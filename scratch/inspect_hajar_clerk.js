require('dotenv').config({ path: '.env.local' });
const { clerkClient } = require('@clerk/nextjs/server');

async function inspectClerk() {
  const email = 'hajarbenbakreti@outlook.fr';
  console.log(`=== CLERK USERS FOR ${email} ===`);
  const client = await clerkClient();
  const users = await client.users.getUserList({
    emailAddress: [email]
  });
  console.log('Clerk Users:', JSON.stringify(users.data, null, 2));
}

inspectClerk();
