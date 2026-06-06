require('dotenv').config({ path: '.env.local' });
const { fetchPaymentsByStudentAction, fetchStudentCertificateDataAction } = require('./.next/server/app/actions/students.js') || {};

async function test() {
  if (!fetchPaymentsByStudentAction) return console.log('Cannot load actions directly.');
  
  try {
    const res1 = await fetchStudentCertificateDataAction({
      clerkUserId: 'user_3EiWs9Z2osU9QR6IzvKT5h00RAw',
      email: 'sofianelamine31@icloud.com',
      firstName: 'Test',
      lastName: 'Test',
      phone: '0000'
    });
    console.log('Cert:', res1);
  } catch (err) {
    console.error('Cert Error:', err);
  }

  try {
    const res2 = await fetchPaymentsByStudentAction('user_3EiWs9Z2osU9QR6IzvKT5h00RAw');
    console.log('Payments:', res2);
  } catch (err) {
    console.error('Payments Error:', err);
  }
}

test();
