/** @type {import('jest').Config} */
const base = require('./jest.config.cjs');

/**
 * Suite BLOQUANTE avant push / CI : tous les tests, sauf ceux qui interrogent
 * la vraie base Supabase (réseau) → `npm run test:network`.
 * Couvre : lib, unit, checkout, webhooks Stripe, fulfillment, scénarios d'intégration (mockés).
 */
module.exports = {
  ...base,
  testPathIgnorePatterns: [
    ...base.testPathIgnorePatterns,
    '/__tests__/integration/formations\\.test\\.ts$',
  ],
};
