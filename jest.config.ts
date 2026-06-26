import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Chemin vers l'application Next.js
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  // On utilise l'environnement Node car on teste principalement des Webhooks/API (côté serveur)
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/scratch/', '<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
