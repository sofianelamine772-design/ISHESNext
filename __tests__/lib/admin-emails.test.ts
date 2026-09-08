import { getAdminNotificationEmails } from '@/lib/mail';

describe('getAdminNotificationEmails', () => {
  test('inclut toujours ishes.contact@gmail.com', () => {
    const emails = getAdminNotificationEmails();
    expect(emails).toContain('ishes.contact@gmail.com');
    expect(emails).toContain('sofianelamine772@gmail.com');
  });
});
