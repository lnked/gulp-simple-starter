const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'node',

  cacheDirectory: '<rootDir>/.cache',

  roots: ['<rootDir>/src/scripts'],

  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/*.(spec|test).[tj]s?(x)'],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  verbose: true,
};
