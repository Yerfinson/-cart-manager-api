module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: { 'ts-jest': { tsconfig: 'tsconfig.spec.json' } },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/**/index.ts',
    '!src/infrastructure/services/product.routes.ts',
    '!src/**/*.enum.ts',
  ],
  coverageThreshold: {
    global: { lines: 90, functions: 90, branches: 90, statements: 90 },
  },
};
