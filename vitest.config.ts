import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // TypeScript support
    globals: true,
    environment: 'node',

    // Test files
    include: [
      'test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],

    // Exclude files
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/lib/**',
      '**/.{git,cache,output,temp}/**',
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        'lib/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
        '**/vitest.config.*',
        '**/tsconfig.json',
      ],
    },

    // Reporter configuration
    reporter: ['verbose', 'json', 'html'],

    // Output configuration
    outputFile: {
      json: './test-results/vitest-results.json',
      html: './test-results/vitest-report.html',
    },

    // Timeout configuration
    testTimeout: 30000,
    hookTimeout: 30000,

    // Disable watch mode for CI environments
    watch: false,

    // Regression testing support
    logHeapUsage: true,

    // TypeScript specific configuration
    typecheck: {
      tsconfig: './tsconfig.json',
    },
  },

  // TypeScript resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Define constants for testing
  define: {
    __TEST__: true,
  },
})
