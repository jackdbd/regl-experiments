const config = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["react-app-polyfill/jsdom", "<rootDir>/src/setupEnzymeTests.ts"],
  setupTestFrameworkScriptFile: "<rootDir>/src/setupJest.js",
  /* regl prints many errors with `console.error` when a WebGL rendering context
   * is not available. This occurs even if the React component that uses a WebGL
   * context is wrapped in an `<ErrorBoundary>`. With `silent: true` we get rid
   * of this output. */
  silent: true,
  testEnvironment: "jsdom",
  testRegex: "/__tests__/.*\\.(jsx?|tsx?)$",
  // testRegex: "/__tests__/(?!visual_regressions).*\\.(jsx?|tsx?)$",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

module.exports = config;
