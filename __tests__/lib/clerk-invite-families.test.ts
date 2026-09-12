import { groupStudentsByInviteEmail, resolveProductionAppUrl } from '@/lib/clerk-invite-families';

describe('groupStudentsByInviteEmail', () => {
  it('envoie un seul mail par parent et garde tous les enfants de cette famille', () => {
    const { families } = groupStudentsByInviteEmail([
      { id: '1', first_name: 'Alya', last_name: 'Magnac', email: 'Sara.coradidi@gmail.com' },
      { id: '2', first_name: 'Jude', last_name: 'Magnac', email: 'sara.coradidi@gmail.com' },
      { id: '3', first_name: 'Sami', last_name: 'Vergnes', email: 'karimavergnes05@gmail.com' },
    ]);

    expect(families).toHaveLength(2);
    const magnac = families.find((f) => f.email === 'sara.coradidi@gmail.com');
    expect(magnac?.children.map((c) => c.name)).toEqual(['Alya Magnac', 'Jude Magnac']);
    expect(families.find((f) => f.email === 'karimavergnes05@gmail.com')?.children).toHaveLength(1);
  });

  it('ne mélange jamais deux parents', () => {
    const { families } = groupStudentsByInviteEmail([
      { id: 'a', first_name: 'Enfant', last_name: 'A', email: 'parent.a@test.fr' },
      { id: 'b', first_name: 'Enfant', last_name: 'B', email: 'parent.b@test.fr' },
    ]);

    expect(families[0].email).not.toBe(families[1].email);
    expect(families[0].children[0].id).toBe('a');
    expect(families[1].children[0].id).toBe('b');
  });

  it('ignore les admins', () => {
    const { families, skipped } = groupStudentsByInviteEmail(
      [
        { id: '1', first_name: 'Admin', last_name: 'ISHES', email: 'admin@ishes.fr', role: 'admin' },
        { id: '2', first_name: 'Lina', last_name: 'Abenna', email: 'melhemasmaa@hotmail.fr' },
      ],
      ['admin@ishes.fr'],
    );
    expect(families).toHaveLength(1);
    expect(families[0].email).toBe('melhemasmaa@hotmail.fr');
    expect(skipped.some((s) => s.reason === 'admin')).toBe(true);
  });
});

describe('resolveProductionAppUrl', () => {
  it('refuse localhost', () => {
    expect(resolveProductionAppUrl('http://localhost:3000').ok).toBe(false);
    expect(resolveProductionAppUrl('http://127.0.0.1:3005').ok).toBe(false);
  });

  it('accepte la prod et retombe sur le site en ligne si l’URL est vide', () => {
    const res = resolveProductionAppUrl('https://ishees.vercel.app');
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.url).toBe('https://ishees.vercel.app');
    const fallback = resolveProductionAppUrl('');
    expect(fallback.ok).toBe(true);
    if (fallback.ok) expect(fallback.url).toBe('https://ishees.vercel.app');
  });
});
