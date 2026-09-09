/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  forceExit: true,
  testTimeout: 20000,
  watchman: false,
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFiles: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          isolatedModules: true,
          jsx: 'react-jsx',
          module: 'commonjs',
          moduleResolution: 'node',
          skipLibCheck: true,
          strict: false,
          paths: { '@/*': ['./src/*'] },
        },
      },
    ],
  },
  testPathIgnorePatterns: [
    '/scratch/',
    '/\\.next/',
    '/node_modules/',
    '/__tests__/integration/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
