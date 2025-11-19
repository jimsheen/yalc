import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as fs from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'
import {
  readCatalogConfig,
  resolveCatalogDependency,
  isCatalogDependency,
  catalogCacheManager,
} from '../catalog'
import type { ParsedCatalog } from '../catalog'

describe('Catalog Configuration Management', () => {
  let tempDir: string
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    tempDir = await fs.mkdtemp(join(tmpdir(), 'yalc-test-catalog-'))

    // Save original environment
    originalEnv = { ...process.env }

    // Clear cache before each test
    catalogCacheManager.clearCache()
  })

  afterEach(async () => {
    // Restore original environment
    process.env = originalEnv

    // Clean up temporary directory
    await fs.remove(tempDir)

    // Clear cache after each test
    catalogCacheManager.clearCache()
  })

  describe('readCatalogConfig', () => {
    it('should return empty catalogs when no pnpm-workspace.yaml exists', () => {
      const result = readCatalogConfig(tempDir)

      expect(result).toEqual({
        default: {},
        named: {},
      })
    })

    it('should parse default catalog from pnpm-workspace.yaml', async () => {
      const workspaceContent = `
packages:
  - 'packages/*'

catalog:
  react: '^18.0.0'
  typescript: '^5.0.0'
  lodash: '^4.17.21'
`
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, workspaceContent)

      const result = readCatalogConfig(tempDir)

      expect(result.default).toEqual({
        react: '^18.0.0',
        typescript: '^5.0.0',
        lodash: '^4.17.21',
      })
      expect(result.named).toEqual({})
    })

    it('should parse named catalogs from pnpm-workspace.yaml', async () => {
      const workspaceContent = `
packages:
  - 'packages/*'

catalog:
  react: '^18.0.0'
  typescript: '^5.0.0'

catalogs:
  ui:
    '@emotion/react': '^11.0.0'
    '@mui/material': '^5.0.0'
  testing:
    vitest: '^1.0.0'
    '@testing-library/react': '^14.0.0'
`
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, workspaceContent)

      const result = readCatalogConfig(tempDir)

      expect(result.default).toEqual({
        react: '^18.0.0',
        typescript: '^5.0.0',
      })
      expect(result.named).toEqual({
        ui: {
          '@emotion/react': '^11.0.0',
          '@mui/material': '^5.0.0',
        },
        testing: {
          vitest: '^1.0.0',
          '@testing-library/react': '^14.0.0',
        },
      })
    })

    it('should merge catalog from package.json when available', async () => {
      // Create pnpm-workspace.yaml with some catalog entries
      const workspaceContent = `
catalog:
  react: '^18.0.0'
`
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, workspaceContent)

      // Create package.json with additional catalog entries
      const packageJson = {
        name: 'test-package',
        version: '1.0.0',
        catalog: {
          lodash: '^4.17.21',
          typescript: '^5.0.0',
        },
      }
      const packageJsonPath = join(tempDir, 'package.json')
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

      const result = readCatalogConfig(tempDir)

      expect(result.default).toEqual({
        react: '^18.0.0',
        lodash: '^4.17.21',
        typescript: '^5.0.0',
      })
    })

    it('should handle malformed YAML gracefully', async () => {
      const malformedContent = `
packages:
  - 'packages/*'

catalog:
  react: '^18.0.0'
  invalid: [malformed yaml structure
`
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, malformedContent)

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = readCatalogConfig(tempDir)

      // The YAML parser in catalog.ts is actually robust and extracts what it can
      // It tries to parse the malformed line as key: value, so it includes both
      expect(result.default).toEqual({
        react: '^18.0.0',
        invalid: '[malformed yaml structure',
      })
      expect(result.named).toEqual({})

      consoleSpy.mockRestore()
    })

    it('should cache results for performance', async () => {
      const workspaceContent = `
catalog:
  react: '^18.0.0'
`
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, workspaceContent)

      // First call
      const result1 = readCatalogConfig(tempDir)

      // Second call (should use cache)
      const result2 = readCatalogConfig(tempDir)

      expect(result1).toEqual(result2)
      expect(result1.default).toEqual({
        react: '^18.0.0',
      })

      const stats = catalogCacheManager.getStats()
      expect(stats.size).toBeGreaterThan(0)
    })

    it('should invalidate cache when file changes', async () => {
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')

      // Create initial file
      await fs.writeFile(
        workspaceFilePath,
        `
catalog:
  react: '^18.0.0'
`,
      )

      const result1 = readCatalogConfig(tempDir)
      expect(result1.default.react).toBe('^18.0.0')

      // Simulate file change by waiting and modifying
      await new Promise((resolve) => setTimeout(resolve, 10))
      await fs.writeFile(
        workspaceFilePath,
        `
catalog:
  react: '^18.1.0'
  vue: '^3.0.0'
`,
      )

      const result2 = readCatalogConfig(tempDir)
      expect(result2.default.react).toBe('^18.1.0')
      expect(result2.default.vue).toBe('^3.0.0')
    })

    it('should find pnpm-workspace.yaml in monorepo root from nested package', async () => {
      // Create monorepo structure:
      // tempDir/
      //   pnpm-workspace.yaml  <-- catalog is here
      //   packages/
      //     web-components/
      //       package.json       <-- publishing from here

      const workspaceContent = `
packages:
  - 'packages/*'

catalog:
  react: ^18.2.0
  react-dom: ^18.2.0
  zod: ^3.22.0
  styled-components: ^6.1.0
`
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, workspaceContent)

      // Create nested package directory
      const packageDir = join(tempDir, 'packages', 'web-components')
      await fs.mkdirp(packageDir)

      const packageJsonPath = join(packageDir, 'package.json')
      await fs.writeFile(
        packageJsonPath,
        JSON.stringify({
          name: '@fe-toolkit/web-components',
          version: '1.0.0',
          dependencies: {
            react: 'catalog:',
            'react-dom': 'catalog:',
            zod: 'catalog:',
            'styled-components': 'catalog:',
          },
        }),
      )

      // Read catalog from nested package directory
      const result = readCatalogConfig(packageDir)

      // Should find and parse the catalog from monorepo root
      expect(result.default).toEqual({
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        zod: '^3.22.0',
        'styled-components': '^6.1.0',
      })
      expect(result.named).toEqual({})

      // Test catalog resolution
      expect(resolveCatalogDependency('catalog:', 'react', result)).toBe(
        '^18.2.0',
      )
      expect(resolveCatalogDependency('catalog:', 'zod', result)).toBe(
        '^3.22.0',
      )
    })

    it('should handle deeply nested packages in monorepo', async () => {
      // Create deep nesting:
      // tempDir/
      //   pnpm-workspace.yaml
      //   apps/
      //     frontend/
      //       packages/
      //         ui/
      //           package.json  <-- 4 levels deep

      const workspaceContent = `
catalog:
  typescript: ^5.0.0
  vite: ^5.0.0
`
      await fs.writeFile(join(tempDir, 'pnpm-workspace.yaml'), workspaceContent)

      // Create deeply nested structure
      const deepPackageDir = join(tempDir, 'apps', 'frontend', 'packages', 'ui')
      await fs.mkdirp(deepPackageDir)

      const packageJsonPath = join(deepPackageDir, 'package.json')
      await fs.writeFile(
        packageJsonPath,
        JSON.stringify({
          name: '@company/ui',
          version: '1.0.0',
          devDependencies: {
            typescript: 'catalog:',
            vite: 'catalog:',
          },
        }),
      )

      // Should still find the workspace file at the root
      const result = readCatalogConfig(deepPackageDir)

      expect(result.default).toEqual({
        typescript: '^5.0.0',
        vite: '^5.0.0',
      })
    })

    it('should return empty catalog when no pnpm-workspace.yaml in tree', async () => {
      // Create nested directory without pnpm-workspace.yaml
      const nestedDir = join(tempDir, 'some', 'nested', 'directory')
      await fs.mkdirp(nestedDir)

      const result = readCatalogConfig(nestedDir)

      expect(result.default).toEqual({})
      expect(result.named).toEqual({})
    })
  })

  describe('resolveCatalogDependency', () => {
    let mockCatalogConfig: ParsedCatalog

    beforeEach(() => {
      mockCatalogConfig = {
        default: {
          react: '^18.0.0',
          lodash: '^4.17.21',
        },
        named: {
          ui: {
            '@emotion/react': '^11.0.0',
            '@mui/material': '^5.0.0',
          },
          testing: {
            vitest: '^1.0.0',
          },
        },
      }
    })

    it('should resolve default catalog dependency', () => {
      const result = resolveCatalogDependency(
        'catalog:',
        'react',
        mockCatalogConfig,
      )
      expect(result).toBe('^18.0.0')
    })

    it('should resolve named catalog dependency', () => {
      const result = resolveCatalogDependency(
        'catalog:ui',
        '@emotion/react',
        mockCatalogConfig,
      )
      expect(result).toBe('^11.0.0')
    })

    it('should return fallback when package not found in default catalog', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = resolveCatalogDependency(
        'catalog:',
        'nonexistent',
        mockCatalogConfig,
      )

      expect(result).toBe('catalog:')
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Package "nonexistent" not found in default catalog',
        ),
      )

      consoleSpy.mockRestore()
    })

    it('should return fallback when named catalog not found', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = resolveCatalogDependency(
        'catalog:nonexistent',
        'react',
        mockCatalogConfig,
      )

      expect(result).toBe('catalog:nonexistent')
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Named catalog "nonexistent" not found'),
      )

      consoleSpy.mockRestore()
    })

    it('should return fallback when package not found in named catalog', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = resolveCatalogDependency(
        'catalog:ui',
        'react',
        mockCatalogConfig,
      )

      expect(result).toBe('catalog:ui')
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Package "react" not found in catalog "ui"'),
      )

      consoleSpy.mockRestore()
    })

    it('should handle invalid input gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const emptyCatalogConfig: ParsedCatalog = {
        default: {},
        named: {},
      }

      const result1 = resolveCatalogDependency('', 'react', mockCatalogConfig)
      const result2 = resolveCatalogDependency(
        'catalog:',
        '',
        mockCatalogConfig,
      )
      const result3 = resolveCatalogDependency(
        'catalog:',
        'react',
        emptyCatalogConfig,
      )

      expect(result1).toBe('catalog:') // Empty string returns fallback 'catalog:'
      expect(result2).toBe('catalog:')
      expect(result3).toBe('catalog:')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should clean quoted package names', () => {
      const result = resolveCatalogDependency(
        'catalog:',
        '"lodash"',
        mockCatalogConfig,
      )
      expect(result).toBe('^4.17.21')
    })
  })

  describe('isCatalogDependency', () => {
    it('should return true for catalog protocol dependencies', () => {
      expect(isCatalogDependency('catalog:')).toBe(true)
      expect(isCatalogDependency('catalog:ui')).toBe(true)
      expect(isCatalogDependency('catalog')).toBe(true)
    })

    it('should return false for regular dependencies', () => {
      expect(isCatalogDependency('^18.0.0')).toBe(false)
      expect(isCatalogDependency('~4.17.21')).toBe(false)
      expect(isCatalogDependency('1.0.0')).toBe(false)
      expect(isCatalogDependency('latest')).toBe(false)
    })

    it('should handle invalid input gracefully', () => {
      expect(isCatalogDependency('')).toBe(false)
      expect(isCatalogDependency(null as unknown as string)).toBe(false)
      expect(isCatalogDependency(undefined as unknown as string)).toBe(false)
      expect(isCatalogDependency(123 as unknown as string)).toBe(false)
    })

    it('should handle whitespace correctly', () => {
      expect(isCatalogDependency('  catalog:  ')).toBe(true)
      expect(isCatalogDependency('  ^18.0.0  ')).toBe(false)
    })
  })

  describe('catalogCacheManager', () => {
    it('should provide cache statistics', () => {
      const stats = catalogCacheManager.getStats()

      expect(stats).toHaveProperty('size')
      expect(stats).toHaveProperty('maxSize')
      expect(typeof stats.size).toBe('number')
      expect(typeof stats.maxSize).toBe('number')
    })

    it('should clear cache when requested', async () => {
      // Add something to cache
      const workspaceFilePath = join(tempDir, 'pnpm-workspace.yaml')
      await fs.writeFile(workspaceFilePath, 'catalog:\n  react: "^18.0.0"')

      readCatalogConfig(tempDir)

      let stats = catalogCacheManager.getStats()
      expect(stats.size).toBeGreaterThan(0)

      catalogCacheManager.clearCache()

      stats = catalogCacheManager.getStats()
      expect(stats.size).toBe(0)
    })
  })
})
