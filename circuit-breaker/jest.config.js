const path = require('path');

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  moduleNameMapper: {
    '\\.(css|less|scss)$': path.resolve(__dirname, './src/__mocks__/styleMock.js'),
  },

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  roots: ['<rootDir>'],

  // The path to a module that runs some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [path.resolve(__dirname, 'src', './setupTests.ts')],

  testEnvironment: 'jsdom',

  testMatch:["<rootDir>/src/*.test.{js,jsx,ts,tsx}"],

  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
};
