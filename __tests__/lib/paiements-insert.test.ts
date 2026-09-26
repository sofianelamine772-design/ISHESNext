/**
 * Insert paiement dual Stripe — fallback si colonne stripe_account absente.
 * Pas d'import ES du SUT : le transformer TS n'hoiste pas jest.mock.
 */

const insertMock = jest.fn();
const selectMock = jest.fn();
const maybeSingleMock = jest.fn();

jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: () => ({
      insert: (...args: unknown[]) => {
        insertMock(...args);
        return {
          select: (...sArgs: unknown[]) => {
            selectMock(...sArgs);
            return { maybeSingle: () => maybeSingleMock() };
          },
        };
      },
    }),
  },
}));

const { insertPaiementWithStripeAccount } = require('@/lib/paiements-insert') as typeof import('@/lib/paiements-insert');

describe('insertPaiementWithStripeAccount', () => {
  beforeEach(() => {
    insertMock.mockReset();
    selectMock.mockReset();
    maybeSingleMock.mockReset();
  });

  it('insère avec stripe_account présentiel quand la colonne existe', async () => {
    maybeSingleMock.mockResolvedValueOnce({ data: { id: 'pay_1' }, error: null });

    const result = await insertPaiementWithStripeAccount({
      etudiant_id: 'stu_1',
      amount: 480,
      status: 'succeeded',
      stripe_session_id: 'cs_test_abc',
      stripe_account: 'presentiel',
    });

    expect(result.error).toBeNull();
    expect(result.data).toEqual({ id: 'pay_1' });
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock.mock.calls[0][0]).toMatchObject({
      stripe_account: 'presentiel',
      amount: 480,
    });
  });

  it('réessaie sans stripe_account si la colonne est absente (PGRST204)', async () => {
    maybeSingleMock
      .mockResolvedValueOnce({
        data: null,
        error: { message: "Could not find the 'stripe_account' column", code: 'PGRST204' },
      })
      .mockResolvedValueOnce({ data: { id: 'pay_fallback' }, error: null });

    const result = await insertPaiementWithStripeAccount({
      etudiant_id: 'stu_1',
      amount: 399,
      status: 'succeeded',
      stripe_session_id: 'cs_test_dist',
      stripe_account: 'distanciel',
    });

    expect(result.error).toBeNull();
    expect(result.data).toEqual({ id: 'pay_fallback' });
    expect(insertMock).toHaveBeenCalledTimes(2);
    expect(insertMock.mock.calls[0][0]).toHaveProperty('stripe_account', 'distanciel');
    expect(insertMock.mock.calls[1][0]).not.toHaveProperty('stripe_account');
  });

  it('ne masque pas une vraie erreur DB', async () => {
    maybeSingleMock.mockResolvedValueOnce({
      data: null,
      error: { message: 'duplicate key', code: '23505' },
    });

    const result = await insertPaiementWithStripeAccount({
      amount: 100,
      status: 'succeeded',
      stripe_account: 'presentiel',
    });

    expect(result.data).toBeNull();
    expect(result.error).toMatchObject({ code: '23505' });
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
});
