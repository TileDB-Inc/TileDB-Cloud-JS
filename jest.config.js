module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  setupFiles: ["<rootDir>/setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(capnp-ts)/)"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};
