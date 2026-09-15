/** @type {import('jest').Config} */
const base = require('./jest.config.cjs');

module.exports = {
  ...base,
  roots: ['<rootDir>/__tests__/lib', '<rootDir>/__tests__/unit'],
};
