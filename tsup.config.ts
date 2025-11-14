import { defineConfig } from 'tsup'

export default defineConfig({
  // Entry points
  entry: ['src/index.ts', 'src/yalc.ts'],

  // Output formats - dual ESM/CJS for 2025 compatibility
  format: ['cjs', 'esm'],

  // Generate TypeScript declarations
  dts: true,

  // Output directory
  outDir: 'dist',

  // Clean output directory before build
  clean: true,

  // Generate source maps
  sourcemap: true,

  // Minification (disabled for library distribution)
  minify: false,

  // Split chunks for better tree shaking
  splitting: true,

  // Target environment
  target: 'node18',

  // Platform
  platform: 'node',

  // External dependencies (don't bundle these)
  external: [
    'fs-extra',
    'chalk',
    'yargs',
    'glob',
    'ignore',
    'ini',
    'npm-packlist',
    'detect-indent',
  ],

  // Bundle configuration
  bundle: true,

  // Keep names for better debugging
  keepNames: true,

  // Shims for CommonJS compatibility
  shims: true,

  // Define environment
  define: {
    __DEV__: 'false',
  },

  // Banner for built files
  banner: {
    js: '// YALC - Yet Another Local Cache\n// Modern TypeScript build with tsup',
  },

  // Esbuild options
  esbuildOptions(options) {
    options.conditions = ['node']
    options.mainFields = ['module', 'main']
  },

  // Output file naming
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    }
  },

  // Only log errors and warnings, not info
  silent: false,

  // Skip node_modules bundling
  noExternal: [],

  // Preserve dynamic imports
  // splitting: true (already set above)
})
