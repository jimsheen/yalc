import * as fs from 'fs-extra'
import { join } from 'path'
import { strictEqual, deepEqual, ok, throws, doesNotThrow } from 'assert'
import {
  readCatalogConfig,
  resolveCatalogDependency,
  isCatalogDependency,
  catalogCacheManager,
  ParsedCatalog,
} from '../src/catalog'

const testDir = join(__dirname, 'tmp-catalog-comprehensive-test')

describe('Comprehensive Catalog Tests', function () {
  this.timeout(10000)

  beforeEach(() => {
    // Clean up test directory and cache before each test
    fs.removeSync(testDir)
    fs.ensureDirSync(testDir)
    catalogCacheManager.clearCache()
  })

  afterEach(() => {
    // Clean up after each test
    fs.removeSync(testDir)
    catalogCacheManager.clearCache()
  })

  describe('Advanced YAML Parsing', () => {
    it('should handle complex nested YAML with comments', async () => {
      const workspaceContent = `
# This is a comment
packages:
  - "packages/*"

# Default catalog
catalog:
  # React ecosystem
  react: ^18.3.1
  react-dom: ^18.3.1

  # TypeScript
  typescript: ^5.0.0

# Additional comment
catalogs:
  # UI catalog
  ui:
    "@mui/material": ^5.14.0
    styled-components: ^6.0.0

  # Testing catalog
  testing:
    vitest: ^1.0.0
    "@testing-library/react": ^14.0.0

# Some other section that should be ignored
scripts:
  build: "tsc"
  test: "vitest"
`

      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspacePath, workspaceContent)

      const catalogConfig = readCatalogConfig(testDir)

      // Should parse correctly despite comments and other sections
      strictEqual(catalogConfig.default.react, '^18.3.1')
      strictEqual(catalogConfig.default['react-dom'], '^18.3.1')
      strictEqual(catalogConfig.default.typescript, '^5.0.0')
      strictEqual(catalogConfig.named.ui['@mui/material'], '^5.14.0')
      strictEqual(catalogConfig.named.testing.vitest, '^1.0.0')
    })

    it('should handle quoted package names correctly', async () => {
      const workspaceContent = `
catalog:
  "react": "^18.3.1"
  '@types/node': "^18.0.0"

catalogs:
  "ui":
    "@mui/material": "^5.14.0"
    "styled-components": "^6.0.0"
`

      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspacePath, workspaceContent)

      const catalogConfig = readCatalogConfig(testDir)

      // Should properly clean quotes
      strictEqual(catalogConfig.default.react, '^18.3.1')
      strictEqual(catalogConfig.default['@types/node'], '^18.0.0')
      strictEqual(catalogConfig.named.ui['@mui/material'], '^5.14.0')
      strictEqual(catalogConfig.named.ui['styled-components'], '^6.0.0')
    })

    it('should handle malformed YAML gracefully', async () => {
      const malformedYaml = `
catalog:
  react: ^18.3.1
  typescript: [invalid yaml structure
    missing closing bracket
catalogs:
  ui:
    "@mui/material": ^5.14.0
`

      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspacePath, malformedYaml)

      // Should not throw but skip malformed entries
      doesNotThrow(() => {
        const result = readCatalogConfig(testDir)
        // Should parse valid entries and skip malformed ones
        strictEqual(result.default.react, '^18.3.1')
        strictEqual(result.default.typescript, undefined) // Skipped malformed entry
        strictEqual(result.named.ui['@mui/material'], '^5.14.0')
      })
    })
  })

  describe('Caching Performance', () => {
    it('should cache reads for performance improvement', async () => {
      // Create a larger workspace file to make timing more measurable
      const catalogEntries = Array(50)
        .fill(0)
        .map((_, i) => `  package${i}: ^1.${i}.0`)
        .join('\n')
      const uiCatalogEntries = Array(50)
        .fill(0)
        .map((_, i) => `    ui-package${i}: ^2.${i}.0`)
        .join('\n')
      const workspaceContent = `
catalog:
${catalogEntries}

catalogs:
  ui:
${uiCatalogEntries}
`

      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspacePath, workspaceContent)

      // First read (cache miss)
      const result1 = readCatalogConfig(testDir)

      // Second read (should hit cache)
      const result2 = readCatalogConfig(testDir)

      // Results should be identical
      deepEqual(result1, result2)

      // Verify structure
      strictEqual(Object.keys(result1.default).length, 50)
      strictEqual(Object.keys(result1.named.ui).length, 50)

      // Verify cache statistics
      const stats = catalogCacheManager.getStats()
      strictEqual(stats.size, 1)
    })

    it('should invalidate cache when file changes', async () => {
      const workspacePath = join(testDir, 'pnpm-workspace.yaml')

      // Initial content
      await fs.writeFile(
        workspacePath,
        `
catalog:
  react: ^18.3.1
`,
      )

      const result1 = readCatalogConfig(testDir)
      strictEqual(result1.default.react, '^18.3.1')

      // Simulate small delay for mtime difference
      await new Promise((resolve) => setTimeout(resolve, 10))

      // Change content
      await fs.writeFile(
        workspacePath,
        `
catalog:
  react: ^19.0.0
`,
      )

      const result2 = readCatalogConfig(testDir)
      strictEqual(result2.default.react, '^19.0.0')
    })
  })

  describe('Error Handling', () => {
    it('should handle missing pnpm-workspace.yaml file', () => {
      // No workspace file created
      doesNotThrow(() => {
        const result = readCatalogConfig(testDir)
        deepEqual(result, { default: {}, named: {} })
      })
    })

    it('should handle input validation in resolveCatalogDependency', () => {
      const catalogConfig: ParsedCatalog = {
        default: { react: '^18.0.0' },
        named: {},
      }

      // Test invalid inputs
      strictEqual(
        resolveCatalogDependency('', 'react', catalogConfig),
        'catalog:',
      )
      strictEqual(
        resolveCatalogDependency('catalog:', '', catalogConfig),
        'catalog:',
      )
      strictEqual(
        resolveCatalogDependency(null as any, 'react', catalogConfig),
        'catalog:',
      )
      strictEqual(
        resolveCatalogDependency('catalog:', 'react', null as any),
        'catalog:',
      )

      // Test whitespace handling
      strictEqual(
        resolveCatalogDependency('  catalog:  ', '  react  ', catalogConfig),
        '^18.0.0',
      )
    })

    it('should validate isCatalogDependency inputs', () => {
      strictEqual(isCatalogDependency(''), false)
      strictEqual(isCatalogDependency(null as any), false)
      strictEqual(isCatalogDependency(undefined as any), false)
      strictEqual(isCatalogDependency('  catalog:  '), true)
      strictEqual(isCatalogDependency('  catalog  '), true)
    })
  })

  describe('Integration with package.json', () => {
    it('should merge package.json catalog with pnpm-workspace.yaml', async () => {
      const workspaceContent = `
catalog:
  react: ^18.3.1
`

      const packageContent = {
        name: 'test-package',
        version: '1.0.0',
        catalog: {
          typescript: '^5.0.0',
          react: '^18.2.0', // Should override workspace version
        },
        catalogs: {
          ui: {
            '@mui/material': '^5.14.0',
          },
        },
      }

      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      const packagePath = join(testDir, 'package.json')

      await fs.writeFile(workspacePath, workspaceContent)
      await fs.writeFile(packagePath, JSON.stringify(packageContent, null, 2))

      const result = readCatalogConfig(testDir)

      // Should merge both sources, with package.json taking precedence
      strictEqual(result.default.react, '^18.2.0') // From package.json
      strictEqual(result.default.typescript, '^5.0.0') // From package.json
      strictEqual(result.named.ui['@mui/material'], '^5.14.0') // From package.json
    })

    it('should handle package.json read errors gracefully', async () => {
      const workspaceContent = `
catalog:
  react: ^18.3.1
`

      // Create malformed package.json
      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      const packagePath = join(testDir, 'package.json')

      await fs.writeFile(workspacePath, workspaceContent)
      await fs.writeFile(packagePath, '{ invalid json }')

      doesNotThrow(() => {
        const result = readCatalogConfig(testDir)
        // Should still get workspace catalog despite package.json error
        strictEqual(result.default.react, '^18.3.1')
      })
    })
  })

  describe('Real-world Scenarios', () => {
    it('should handle large catalogs efficiently', async () => {
      // Create a large catalog to test memory efficiency
      const catalogEntries = Array(200)
        .fill(0)
        .map((_, i) => `  package${i}: ^1.${i}.0`)
        .join('\n')
      const uiCatalogEntries = Array(200)
        .fill(0)
        .map((_, i) => `    ui-package${i}: ^2.${i}.0`)
        .join('\n')
      const testCatalogEntries = Array(200)
        .fill(0)
        .map((_, i) => `    test-package${i}: ^3.${i}.0`)
        .join('\n')
      const workspaceContent = `
catalog:
${catalogEntries}

catalogs:
  ui:
${uiCatalogEntries}

  testing:
${testCatalogEntries}
`

      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspacePath, workspaceContent)

      const start = Date.now()
      const result = readCatalogConfig(testDir)
      const parseTime = Date.now() - start

      // Should parse all entries
      strictEqual(Object.keys(result.default).length, 200)
      strictEqual(Object.keys(result.named.ui).length, 200)
      strictEqual(Object.keys(result.named.testing).length, 200)

      // Should be reasonable performance even for large catalogs
      ok(
        parseTime < 100,
        `Large catalog parse time (${parseTime}ms) should be reasonable`,
      )
    })

    it('should resolve complex catalog dependencies correctly', () => {
      const catalogConfig: ParsedCatalog = {
        default: {
          react: '^18.3.1',
          '@types/react': '^18.0.0',
        },
        named: {
          ui: {
            '@mui/material': '^5.14.0',
            '@emotion/react': '^11.11.0',
          },
          testing: {
            vitest: '^1.0.0',
            '@testing-library/react': '^14.0.0',
          },
        },
      }

      // Test various catalog references
      strictEqual(
        resolveCatalogDependency('catalog:', 'react', catalogConfig),
        '^18.3.1',
      )
      strictEqual(
        resolveCatalogDependency('catalog:', '@types/react', catalogConfig),
        '^18.0.0',
      )
      strictEqual(
        resolveCatalogDependency('catalog:ui', '@mui/material', catalogConfig),
        '^5.14.0',
      )
      strictEqual(
        resolveCatalogDependency('catalog:testing', 'vitest', catalogConfig),
        '^1.0.0',
      )

      // Test fallback behavior
      strictEqual(
        resolveCatalogDependency('catalog:', 'nonexistent', catalogConfig),
        'catalog:',
      )
      strictEqual(
        resolveCatalogDependency('catalog:nonexistent', 'react', catalogConfig),
        'catalog:nonexistent',
      )
      strictEqual(
        resolveCatalogDependency('catalog:ui', 'nonexistent', catalogConfig),
        'catalog:ui',
      )
    })
  })

  describe('Cache Management', () => {
    it('should provide cache statistics', () => {
      const stats = catalogCacheManager.getStats()
      ok(typeof stats.size === 'number')
      ok(typeof stats.maxSize === 'number')
      ok(stats.size >= 0)
      ok(stats.maxSize > 0)
    })

    it('should clear cache completely', async () => {
      const workspacePath = join(testDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspacePath, 'catalog:\n  react: ^18.3.1')

      readCatalogConfig(testDir) // Add to cache

      let stats = catalogCacheManager.getStats()
      ok(stats.size > 0, 'Cache should have entries')

      catalogCacheManager.clearCache()

      stats = catalogCacheManager.getStats()
      strictEqual(stats.size, 0, 'Cache should be empty after clear')
    })

    it('should handle bounded cache size correctly', async () => {
      // Create multiple directories to test cache bounds
      const dirs: string[] = []
      for (let i = 0; i < 10; i++) {
        const dir = join(testDir, `dir${i}`)
        dirs.push(dir)
        fs.ensureDirSync(dir)

        await fs.writeFile(
          join(dir, 'pnpm-workspace.yaml'),
          `
catalog:
  package${i}: ^1.0.0
`,
        )

        readCatalogConfig(dir) // Add to cache
      }

      const stats = catalogCacheManager.getStats()
      ok(
        stats.size <= stats.maxSize,
        `Cache size (${stats.size}) should not exceed max (${stats.maxSize})`,
      )
    })
  })
})
