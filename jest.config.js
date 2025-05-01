module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jsdom", // Use jsdom for React testing
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use Babel for JavaScript/TypeScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(testing-library)/)", // Transpile @testing-library
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Recognize these file extensions
};
