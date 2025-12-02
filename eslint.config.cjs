import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-refresh': reactRefresh,
    },
    rules: {
      indent: 'off',
      quotes: 'off',
      'react-refresh/only-export-components': 'warn',
      'jsx-quotes': 'off',
      semi: 'off',
      'object-curly-spacing': 'off',
      'react/jsx-tag-spacing': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/mocks/**'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-proto': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-misused-promises': 'off',

      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  prettierRecommended,
];
