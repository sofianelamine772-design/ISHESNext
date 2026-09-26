/** @type {import('jest').Config} */
const base = require('./jest.config.cjs');

/**
 * Suite bloquante avant push / déploiement.
 * Inclut lib + unit + garde-fou checkout double Stripe.
 */
module.exports = {
  ...base,
  roots: ['<rootDir>/__tests__'],
  testMatch: [
    '**/__tests__/lib/**/*.test.ts',
    '**/__tests__/unit/**/*.test.ts',
    '**/__tests__/api/checkout/dual-stripe.test.ts',
  ],
};
