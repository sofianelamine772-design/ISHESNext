const adminEnv = process.env.ADMIN_EMAIL || '';
export const ADMIN_EMAILS = adminEnv.split(',').map(email => email.trim()).filter(Boolean);

export const isAdminEmail = (email: string | null | undefined) => {
  if (!email) return false;
  return ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === email.toLowerCase());
};
