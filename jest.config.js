export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript files
        '^.+\\.jsx?$': 'babel-jest', // Transpile JavaScript files
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat these extensions as ES modules
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
