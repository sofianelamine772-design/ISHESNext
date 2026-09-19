import { getMessageReplyUrl } from '@/lib/mail';

describe('Liens « Répondre » messagerie → app', () => {
  const prev = process.env.NEXT_PUBLIC_APP_URL;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://www.ishes.fr';
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_APP_URL = prev;
  });

  it('envoie l’élève vers la messagerie privée prête à répondre', () => {
    expect(getMessageReplyUrl('student')).toBe('https://www.ishes.fr/app/eleve/messagerie?reply=1');
  });

  it('envoie l’admin vers la conversation de l’élève', () => {
    expect(getMessageReplyUrl('admin', 'user_abc123')).toBe(
      'https://www.ishes.fr/app/admin/communication?chat=user_abc123',
    );
  });

  it('fallback admin sans chatId', () => {
    expect(getMessageReplyUrl('admin')).toBe('https://www.ishes.fr/app/admin/communication');
  });
});
