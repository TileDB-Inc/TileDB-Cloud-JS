module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  setupFiles: ["<rootDir>/setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(capnp-ts)/)',
  ],
};
