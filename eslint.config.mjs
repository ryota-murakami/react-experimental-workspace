import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores([
    '**/.vscode',
    '**/node_modules',
    '**/build',
    '**/dist',
    '**/.github',
    '**/.idea',
    'public/mockServiceWorker.js',
  ]),
  {
    extends: compat.extends('ts-prefixer', 'plugin:jsx-a11y/recommended'),

    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      'jsx-a11y': jsxA11Y,
    },

    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
      },
    },

    settings: {},

    rules: {
      'react-hooks/rules-of-hooks': 'error',
    },
  },
])
