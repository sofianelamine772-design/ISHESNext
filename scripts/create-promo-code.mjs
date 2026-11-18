/**
 * Crée (ou retrouve) le code promo de la campagne dans Stripe — compte DISTANCIEL.
 *
 * Usage (depuis la racine du projet) :
 *   STRIPE_SECRET_KEY=sk_live_… node scripts/create-promo-code.mjs
 *
 * Options :
 *   --code=ISHES2026       code (défaut : ISHES2026)
 *   --amount=100           remise en euros (défaut : 100)
 *   --expires=2026-12-01   date d'expiration du code (optionnel, heure de Paris)
 *   --allow-test           autorise une clé sk_test_ (sinon refusé)
 *
 * Idempotent : si le code existe déjà, il est affiché et rien n'est créé.
 */
import Stripe from 'stripe';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  }),
);

const code = String(args.code || 'ISHES2026').trim().toUpperCase();
const amountEuros = Number(args.amount || 100);
const key = process.env.STRIPE_SECRET_KEY || '';

if (!key) {
  console.error('❌ STRIPE_SECRET_KEY manquante (clé du compte distanciel).');
  process.exit(1);
}
if (key.startsWith('sk_test_') && !args['allow-test']) {
  console.error('❌ Clé de TEST détectée. Utilise la clé live, ou ajoute --allow-test pour un essai.');
  process.exit(1);
}
if (!(amountEuros > 0)) {
  console.error('❌ Montant invalide.');
  process.exit(1);
}

const stripe = new Stripe(key);

const existing = await stripe.promotionCodes.list({ code, limit: 1 });
if (existing.data[0]) {
  const p = existing.data[0];
  console.log(`ℹ️  Le code ${code} existe déjà (${p.id}, actif=${p.active}). Rien à faire.`);
  process.exit(0);
}

const coupon = await stripe.coupons.create({
  name: `${code} −${amountEuros} €`,
  amount_off: Math.round(amountEuros * 100),
  currency: 'eur',
  duration: 'once',
});

// API Stripe récente : le coupon se passe sous `promotion` (cf. src/lib/stripe-promo.ts).
const promoParams = { promotion: { type: 'coupon', coupon: coupon.id }, code, active: true };
if (args.expires) {
  const ts = Math.floor(new Date(`${args.expires}T00:00:00+01:00`).getTime() / 1000);
  if (!Number.isFinite(ts)) {
    await stripe.coupons.del(coupon.id);
    console.error('❌ --expires invalide (format AAAA-MM-JJ).');
    process.exit(1);
  }
  promoParams.expires_at = ts;
}

let promo;
try {
  promo = await stripe.promotionCodes.create(promoParams);
} catch (err) {
  await stripe.coupons.del(coupon.id).catch(() => {});
  console.error('❌ Création du code impossible :', err?.message || err);
  process.exit(1);
}
console.log(`✅ Code ${promo.code} créé : −${amountEuros} € (coupon ${coupon.id}, promo ${promo.id})`);
console.log('   Vérifie dans Stripe → Produits → Coupons que le compte est bien le DISTANCIEL.');
