const ws = require('ws');
global.WebSocket = global.WebSocket || ws;

// Secrets factices pour les tests : jamais de vraies clés, aucun appel réseau.
process.env.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_jest';
process.env.STRIPE_SECRET_KEY = 'sk_test_jest_placeholder';
delete process.env.STRIPE_PRESENTIEL_SECRET_KEY;
