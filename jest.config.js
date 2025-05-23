module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-dnd|dnd-core|react-dnd-html5-backend|react-dnd-test-backend|@testing-library)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
