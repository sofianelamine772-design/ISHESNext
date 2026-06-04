async function main() {
  const res = await fetch('http://localhost:3000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender_id: 'user_123',
      receiver_id: 'admin_system',
      content: 'test from student script',
      type: 'private'
    })
  });
  console.log(res.status, await res.text());
}
main();
