import {
  PROMO_CAMPAIGN,
  getActivePromoCampaign,
  isPromoCampaignActive,
  shouldShowPromoPopupOnPath,
} from '@/lib/promo-campaign';

describe('promo-campaign', () => {
  const campaign = {
    ...PROMO_CAMPAIGN,
    startsAt: '2026-11-20T00:00:00+01:00',
    endsAt: '2026-12-01T00:00:00+01:00',
  };

  it('la campagne réelle « Rentrée 2026 » : −100 € distanciel, active dès le 18 novembre 2026 (Paris)', () => {
    expect(PROMO_CAMPAIGN.discountEuros).toBe(100);
    expect(PROMO_CAMPAIGN.code).toBe(PROMO_CAMPAIGN.code.toUpperCase());
    expect(PROMO_CAMPAIGN.badge).toBe('Rentrée 2026');
    expect(PROMO_CAMPAIGN.headline).toMatch(/à distance/i);
    expect(PROMO_CAMPAIGN.ctaHref).toBe('/fr/cours-a-distance');
    expect(isPromoCampaignActive(PROMO_CAMPAIGN, new Date('2026-11-17T22:59:59Z'))).toBe(false);
    expect(isPromoCampaignActive(PROMO_CAMPAIGN, new Date('2026-11-17T23:00:00Z'))).toBe(true);
  });

  it('inactive avant le début, active pendant, inactive après la fin', () => {
    expect(isPromoCampaignActive(campaign, new Date('2026-11-17T12:00:00Z'))).toBe(false);
    expect(isPromoCampaignActive(campaign, new Date('2026-11-20T12:00:00Z'))).toBe(true);
    expect(isPromoCampaignActive(campaign, new Date('2026-11-30T22:59:59Z'))).toBe(true);
    expect(isPromoCampaignActive(campaign, new Date('2026-11-30T23:00:00Z'))).toBe(false);
  });

  it('sans date de fin, reste active indéfiniment après le début', () => {
    expect(isPromoCampaignActive({ ...campaign, endsAt: null }, new Date('2030-01-01T00:00:00Z'))).toBe(true);
  });

  it('getActivePromoCampaign renvoie null hors période', () => {
    expect(getActivePromoCampaign(new Date('2026-11-01T00:00:00Z'))).toBeNull();
    expect(getActivePromoCampaign(new Date('2026-11-21T10:00:00Z'))?.code).toBe(PROMO_CAMPAIGN.code);
  });

  it("le pop-up s'affiche sur l'accueil et les pages générales (vitrine et /fr)", () => {
    expect(shouldShowPromoPopupOnPath('/')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/program')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/institut')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/contact')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/sciences-islamiques')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/cours-a-distance')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/cours-en-presentiel')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/pack-accompagnement')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/civilisation-arabo-musulmane/savants/ibn-khaldoun')).toBe(true);
  });

  it("le pop-up ne s'affiche pas sur les fiches formation détaillées", () => {
    expect(shouldShowPromoPopupOnPath('/program/fiqh_malikite')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/cours-fiqh-malikite')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/cours-fiqh-malikite/ibn-ashir')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/cours-arabe-enfant/')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/formation-enseignant-tajwid')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/les-cles-du-coran')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/correction-fatiha')).toBe(false);
  });

  it("le pop-up ne s'affiche pas dans le tunnel de paiement, l'espace élève ni les pages légales", () => {
    expect(shouldShowPromoPopupOnPath('/inscription')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/inscription?plan=fiqh_malikite')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/app/eleve')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/sign-in')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/cgv')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/mentions-legales')).toBe(false);
  });
});
