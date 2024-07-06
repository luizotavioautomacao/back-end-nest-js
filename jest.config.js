module.exports = {
    roots: ['<rootDir>/src/infra'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts', // qualquer arquivo dentro de src vai ter cobertura de testes
        // '!<rootDir>/src/main/**'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testEnvironment: 'node',
    // preset: '@shelf/jest-mongodb',
    transform: {
        '.+\\.ts$': 'ts-jest' // qualquer texto com final .ts usar o ts-jest
    },
    moduleNameMapper: {
        '@/tests/(.*)': '<rootDir>/tests/$1',
        '@/(.*)': '<rootDir>/src/$1'
    }
}
