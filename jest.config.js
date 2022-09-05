module.export = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}'
    ],
    coverageDirectory: 'covarage',
    testEvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}
