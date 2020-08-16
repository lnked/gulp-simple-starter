// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  cacheDirectory: "<rootDir>/.cache",

  testEnvironment: 'node',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src/scripts"
  ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx|ts)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/*.(spec|test).[tj]s?(x)"
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    }
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
