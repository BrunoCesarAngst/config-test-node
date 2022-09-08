module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  clearMocks: true,
}
