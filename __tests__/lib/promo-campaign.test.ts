import {
  PROMO_CAMPAIGN,
  PROMO_POPUP_STORAGE_KEY,
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

  it('la campagne réelle : Pack Accompagnement offert à tous, sans code, du 25 novembre au 31 décembre 2026 (Paris)', () => {
    expect(PROMO_CAMPAIGN.code).toBeNull();
    expect(PROMO_CAMPAIGN.badge).toBe('Offre exceptionnelle');
    expect(PROMO_CAMPAIGN.headline).toMatch(/Pack Accompagnement/i);
    expect(PROMO_CAMPAIGN.highlight).toBe('OFFERT');
    expect(PROMO_CAMPAIGN.valueLabel).toMatch(/399 €/);
    expect(PROMO_CAMPAIGN.tagline).toMatch(/Ne chemine plus seul/i);
    expect(PROMO_CAMPAIGN.bullets).toHaveLength(4);
    expect(PROMO_CAMPAIGN.deadlineLabel).toMatch(/31 décembre 2026/);
    expect(PROMO_CAMPAIGN.ctaHref).toBe('/inscription?plan=pack_accompagnement&audience=adulte');
    expect(PROMO_CAMPAIGN.footnote).toMatch(/sans code promo/i);
    expect(PROMO_POPUP_STORAGE_KEY).toContain(PROMO_CAMPAIGN.id);
    expect(isPromoCampaignActive(PROMO_CAMPAIGN, new Date('2026-11-24T22:59:59Z'))).toBe(false);
    expect(isPromoCampaignActive(PROMO_CAMPAIGN, new Date('2026-11-24T23:00:00Z'))).toBe(true);
    expect(isPromoCampaignActive(PROMO_CAMPAIGN, new Date('2026-12-31T22:59:59Z'))).toBe(true);
    expect(isPromoCampaignActive(PROMO_CAMPAIGN, new Date('2026-12-31T23:00:00Z'))).toBe(false);
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
    expect(getActivePromoCampaign(new Date('2026-11-26T10:00:00Z'))?.id).toBe(PROMO_CAMPAIGN.id);
  });

  it("le pop-up s'affiche uniquement sur l'accueil et quelques pages d'entrée", () => {
    expect(shouldShowPromoPopupOnPath('/')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/?utm=x')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/program')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/cours-a-distance')).toBe(true);
    expect(shouldShowPromoPopupOnPath('/fr/sciences-islamiques')).toBe(true);
  });

  it("le pop-up ne s'affiche pas sur les autres pages (fiches formation, institut, contact…)", () => {
    expect(shouldShowPromoPopupOnPath('/institut')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/contact')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/cours-en-presentiel')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/pack-accompagnement')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/program/fiqh_malikite')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/cours-fiqh-malikite')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/cours-arabe-enfant/')).toBe(false);
    expect(shouldShowPromoPopupOnPath('/fr/formation-enseignant-tajwid')).toBe(false);
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
