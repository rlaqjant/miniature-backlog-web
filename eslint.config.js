import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks 규칙
      ...reactHooks.configs.recommended.rules,
      // React Refresh 규칙
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 사용하지 않는 변수 경고 (언더스코어로 시작하는 변수는 허용)
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      // any 타입 사용 시 경고 (점진적 마이그레이션을 위해 warn으로 설정)
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)
