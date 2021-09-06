module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  setupFiles: ["<rootDir>/setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
