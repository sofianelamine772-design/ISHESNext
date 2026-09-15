/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  forceExit: true,
  testTimeout: 20000,
  watchman: false,
  prettierPath: null,
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFiles: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.tsx?$': '<rootDir>/scripts/jest-ts-transformer.cjs',
  },
  testPathIgnorePatterns: [
    '/scratch/',
    '/\\.next/',
    '/node_modules/',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '\\.(pdf|numbers|png|jpe?g|gif|webp|mp4|zip|DS_Store)$',
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/\\.next/',
    '\\.(pdf|numbers|png|jpe?g|gif|webp|mp4|zip)$',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
