const studentInfo = new Map();
const messages = [
  { sender_id: 'admin_system', receiver_id: 'student_1', is_read: true, created_at: '2026-06-04T12:00:00Z' },
  { sender_id: 'student_1', receiver_id: 'admin_system', is_read: false, created_at: '2026-06-04T11:00:00Z' },
  { sender_id: 'student_1', receiver_id: 'admin_system', is_read: false, created_at: '2026-06-04T10:00:00Z' }
];

messages.forEach(m => {
  const studentId = m.sender_id === 'admin_system' ? m.receiver_id : m.sender_id;
  if (!studentId || studentId === 'admin_system') return;
  
  const isUnreadToAdmin = m.sender_id === studentId && m.receiver_id === 'admin_system' && !m.is_read;
  
  if (!studentInfo.has(studentId)) {
    studentInfo.set(studentId, { 
      last_message_at: m.created_at, 
      unread_count: isUnreadToAdmin ? 1 : 0 
    });
  } else {
    if (isUnreadToAdmin) {
      studentInfo.get(studentId).unread_count += 1;
    }
  }
});
console.log(studentInfo);
