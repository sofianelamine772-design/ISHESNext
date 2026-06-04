import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender_id: 'admin_system',
      receiver_id: 'test_student',
      content: 'test message',
      type: 'private'
    })
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}
test();
