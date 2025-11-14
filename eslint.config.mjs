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
      '@typescript-eslint/no-explicit-any': 'off', // Too many to fix right now
      '@typescript-eslint/no-unsafe-assignment': 'off', // Too many to fix right now
      '@typescript-eslint/no-unsafe-call': 'off', // Too many to fix right now
      '@typescript-eslint/no-unsafe-member-access': 'off', // Too many to fix right now
      '@typescript-eslint/no-unsafe-return': 'off', // Too many to fix right now
      '@typescript-eslint/no-unsafe-argument': 'off', // Too many to fix right now
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Preference, not critical
      '@typescript-eslint/prefer-optional-chain': 'off', // Preference, not critical
      '@typescript-eslint/strict-boolean-expressions': 'off', // Too strict for current codebase
      '@typescript-eslint/no-unnecessary-condition': 'off', // Too many false positives with strict TypeScript

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
      '@typescript-eslint/restrict-plus-operands': 'off', // Allow string + any concatenation
      '@typescript-eslint/no-dynamic-delete': 'off', // Allow delete of computed properties
      '@typescript-eslint/consistent-type-imports': 'off', // Don't force type imports for now
      '@typescript-eslint/restrict-template-expressions': 'off', // Allow flexible template expressions
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
