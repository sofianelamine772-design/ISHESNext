require('dotenv').config({ path: '.env.local' });
const { clerkClient } = require('@clerk/nextjs/server');

async function listClerk() {
  console.log("=== LISTING ALL CLERK USERS ===");
  const client = await clerkClient();
  const users = await client.users.getUserList({
    limit: 10
  });
  console.log(users.data.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    emails: u.emailAddresses.map(e => e.emailAddress)
  })));
}

listClerk();
