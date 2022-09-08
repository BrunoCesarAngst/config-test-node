module.exports = {
  collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest',
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  clearMocks: true
}
