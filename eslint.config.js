import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ignores: [
      'node_modules',
      'dist',
      'lib',
      'src/**/*.test.ts',
      'coverage',
      '**/*.d.ts',
      'src/v1',
      'src/v2',
      'src/v3',
      'src/v4',
      'src/commons',
      'tests',
      'babel.config.js'
    ]
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier
]);
