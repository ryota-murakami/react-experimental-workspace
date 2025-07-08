import { defineConfig, globalIgnores } from 'eslint/config'
import tsPrefixer from 'eslint-config-ts-prefixer'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'

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
  ...tsPrefixer,
  {
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11Y,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      ...jsxA11Y.configs.recommended.rules,
    },
  },
])
