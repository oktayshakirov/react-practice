import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // exercises/ and solutions/ are teaching files, not app code.
    // - unused vars: a blank stub imports useState before you've used it
    // - only-export-components: each file deliberately holds its types,
    //   fake API and components together so it reads top to bottom
    // - set-state-in-effect: React 19's lint prefers you avoid this, but
    //   setLoading(true) inside a fetch effect is exactly the pattern
    //   Days 15-17 are drilling. Read the note in the Day 16 solution.
    files: ['exercises/**/*.tsx', 'solutions/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
