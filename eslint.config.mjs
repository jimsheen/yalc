import js from '@eslint/js'
import typescript from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default typescript.config(
  // Base JavaScript recommendations
  js.configs.recommended,

  // TypeScript configurations
  ...typescript.configs.recommended,
  ...typescript.configs.strictTypeChecked,

  // Prettier integration (disable conflicting rules)
  prettier,

  // Project-specific configuration
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    files: ['src/**/*.ts', 'src/**/*.tsx'],

    rules: {
      // Equivalent to old tslint rules
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',

      // Additional modern TypeScript rules (relaxed for migration)
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off', // Too strict for current codebase

      // Code quality rules
      'no-console': 'off', // Allow console.log for CLI tool
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // Import/export rules
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // Disable rules that conflict with our current codebase structure
      '@typescript-eslint/no-require-imports': 'off', // npm-packlist uses require
      '@typescript-eslint/no-var-requires': 'off', // Some legacy require usage
      '@typescript-eslint/restrict-plus-operands': 'warn', // Allow string + any concatenation
      '@typescript-eslint/no-dynamic-delete': 'warn', // Allow delete of computed properties
      '@typescript-eslint/consistent-type-imports': 'off', // Don't force type imports for now
    },
  },

  // Configuration for test files
  {
    files: ['test/**/*.ts', 'test/**/*.js', '**/*.test.ts'],
    rules: {
      // Relax some rules for tests
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Ignore patterns
  {
    ignores: [
      'lib/**',
      'dist/**',
      'node_modules/**',
      '**/*.js.map',
      '**/*.d.ts',
      'src/**/*.js', // Compiled JS files
      'test/tmp/**',
      'test/fixture/**',
    ],
  },
)
