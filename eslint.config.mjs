import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021, // Specify the ECMAScript version
      parser: typescriptEslintParser, // Use the imported parser
    },
  },
  {
    ignores: ['dist/'], // Use "ignores" to specify ignored files/directories
  },
  {
    files: ['**/*.ts', '**/*.js'], // Specify the file types this config applies to
    ...pluginJs.configs.recommended, // Spread the recommended configuration
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin, // Use the imported plugin
    },
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
  },
];

export default config;
