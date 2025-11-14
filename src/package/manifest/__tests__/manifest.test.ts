import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as fs from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'
import {
  parsePackageName,
  readPackageManifest,
  writePackageManifest,
  PackageManifest,
} from '../pkg'

describe('Package Manifest Operations', () => {
  let tempDir: string
  let packagePath: string

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    tempDir = await fs.mkdtemp(join(tmpdir(), 'yalc-test-pkg-'))
    packagePath = join(tempDir, 'package.json')
  })

  afterEach(async () => {
    // Clean up temporary directory
    await fs.remove(tempDir)
  })

  describe('parsePackageName', () => {
    it('should parse simple package name without version', () => {
      const result = parsePackageName('lodash')
      expect(result).toEqual({
        name: 'lodash',
        version: '',
      })
    })

    it('should parse simple package name with version', () => {
      const result = parsePackageName('lodash@4.17.21')
      expect(result).toEqual({
        name: 'lodash',
        version: '4.17.21',
      })
    })

    it('should parse scoped package name without version', () => {
      const result = parsePackageName('@types/node')
      expect(result).toEqual({
        name: '@types/node',
        version: '',
      })
    })

    it('should parse scoped package name with version', () => {
      const result = parsePackageName('@types/node@18.0.0')
      expect(result).toEqual({
        name: '@types/node',
        version: '18.0.0',
      })
    })

    it('should parse package name with complex version specifier', () => {
      const result = parsePackageName('react@^18.0.0')
      expect(result).toEqual({
        name: 'react',
        version: '^18.0.0',
      })
    })

    it('should handle empty or invalid input', () => {
      const result = parsePackageName('')
      expect(result).toEqual({
        name: 'undefined',
        version: '',
      })
    })

    it('should handle package name with multiple @ symbols', () => {
      const result = parsePackageName('@babel/core@7.20.0@beta')
      expect(result).toEqual({
        name: '@babel/core',
        version: '7.20.0@beta',
      })
    })
  })

  describe('readPackageManifest', () => {
    it('should read and parse a valid package.json file', async () => {
      const testPackage: PackageManifest = {
        name: 'test-package',
        version: '1.0.0',
        dependencies: {
          lodash: '^4.17.21',
        },
        yalc: {},
      }

      await fs.writeFile(packagePath, JSON.stringify(testPackage, null, 2))

      const result = readPackageManifest(tempDir)

      expect(result).toMatchObject({
        name: 'test-package',
        version: '1.0.0',
        dependencies: {
          lodash: '^4.17.21',
        },
        __Indent: '  ',
      })
    })

    it('should detect custom indentation', async () => {
      const testPackage = {
        name: 'test-package',
        version: '1.0.0',
      }

      // Write with 4-space indentation
      await fs.writeFile(packagePath, JSON.stringify(testPackage, null, 4))

      const result = readPackageManifest(tempDir)

      expect(result?.__Indent).toBe('    ')
    })

    it('should return null for non-existent package.json', () => {
      const result = readPackageManifest(tempDir)
      expect(result).toBeNull()
    })

    it('should return null for invalid JSON', async () => {
      await fs.writeFile(packagePath, 'invalid json content')

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      try {
        const result = readPackageManifest(tempDir)
        expect(result).toBeNull()
        expect(consoleSpy).toHaveBeenCalled()
      } finally {
        consoleSpy.mockRestore()
      }
    })

    it('should return null for package.json without name but with version', async () => {
      const testPackage = {
        version: '1.0.0',
        description: 'A package with version but no name',
      }

      await fs.writeFile(packagePath, JSON.stringify(testPackage, null, 2))

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const result = readPackageManifest(tempDir)

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Package manifest'),
        packagePath,
        expect.stringContaining('should contain name and version'),
      )

      consoleSpy.mockRestore()
    })

    it('should return package for package.json without name and version', async () => {
      const testPackage = {
        description: 'A package without name and version',
      }

      await fs.writeFile(packagePath, JSON.stringify(testPackage, null, 2))

      const result = readPackageManifest(tempDir)

      // Should still return the package if neither name nor version (condition is !name && version)
      expect(result).not.toBeNull()
      expect((result as any)?.description).toBe(
        'A package without name and version',
      )
    })
  })

  describe('writePackageManifest', () => {
    it('should write package.json with proper formatting', async () => {
      const testPackage: PackageManifest = {
        name: 'test-package',
        version: '1.0.0',
        dependencies: {
          'z-last': '1.0.0',
          'a-first': '1.0.0',
          lodash: '^4.17.21',
        },
        devDependencies: {
          typescript: '^5.0.0',
          '@types/node': '^18.0.0',
        },
        __Indent: '  ',
        yalc: {},
      }

      writePackageManifest(tempDir, testPackage)

      const written = await fs.readFile(packagePath, 'utf-8')
      const parsed = JSON.parse(written)

      // Should sort dependencies
      expect(
        Object.keys(parsed.dependencies as Record<string, string>),
      ).toEqual(['a-first', 'lodash', 'z-last'])
      expect(
        Object.keys(parsed.devDependencies as Record<string, string>),
      ).toEqual(['@types/node', 'typescript'])

      // Should not include __Indent in written file
      expect(parsed.__Indent).toBeUndefined()

      // Should maintain proper formatting
      expect(written).toContain('  "name": "test-package"')
      expect(written.endsWith('\n')).toBe(true)
    })

    it('should preserve custom indentation', async () => {
      const testPackage: PackageManifest = {
        name: 'test-package',
        version: '1.0.0',
        __Indent: '    ', // 4 spaces
        yalc: {},
      }

      writePackageManifest(tempDir, testPackage)

      const written = await fs.readFile(packagePath, 'utf-8')

      // Should use 4-space indentation
      expect(written).toContain('    "name": "test-package"')
      expect(written).toContain('    "version": "1.0.0"')
    })

    it('should handle missing dependencies gracefully', () => {
      const testPackage: PackageManifest = {
        name: 'test-package',
        version: '1.0.0',
        __Indent: '  ',
        yalc: {},
      }

      expect(() => {
        writePackageManifest(tempDir, testPackage)
      }).not.toThrow()
    })

    it('should handle write errors gracefully', () => {
      const testPackage: PackageManifest = {
        name: 'test-package',
        version: '1.0.0',
        yalc: {},
      }

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      // Try to write to a non-existent directory
      writePackageManifest('/non-existent-dir', testPackage)

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Could not write'),
        expect.stringContaining('/non-existent-dir/package.json'),
      )

      consoleSpy.mockRestore()
    })

    it('should not mutate the original package object', () => {
      const testPackage: PackageManifest = {
        name: 'test-package',
        version: '1.0.0',
        dependencies: {
          'z-last': '1.0.0',
          'a-first': '1.0.0',
        },
        __Indent: '  ',
        yalc: {},
      }

      const originalDepsKeys = Object.keys(testPackage.dependencies ?? {})

      writePackageManifest(tempDir, testPackage)

      // Original object should not be mutated
      expect(Object.keys(testPackage.dependencies ?? {})).toEqual(
        originalDepsKeys,
      )
      expect(testPackage.__Indent).toBe('  ')
    })
  })
})
