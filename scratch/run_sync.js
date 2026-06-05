require('dotenv').config({ path: '.env.local' });
const { fetchPaymentsByStudentAction } = require('./.next/server/app/actions/students.js') || {};

async function main() {
  if (!fetchPaymentsByStudentAction) {
    console.log('Action not found, run manual fetch via HTTP or ignore.');
    return;
  }
  const result = await fetchPaymentsByStudentAction('user_3EiWs9Z2osU9QR6IzvKT5h00RAw');
  console.log(result);
}

main();
