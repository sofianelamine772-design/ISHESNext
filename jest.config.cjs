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
  // ts-jest en mode transpile seul (rapide, pas de typecheck : `tsc` s'en charge au pre-push).
  // Contrairement à l'ancien transformer maison, il remonte les jest.mock() avant les imports.
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        diagnostics: false,
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node',
          esModuleInterop: true,
          jsx: 'react-jsx',
          target: 'ES2020',
          skipLibCheck: true,
        },
      },
    ],
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
