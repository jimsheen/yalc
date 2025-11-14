import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as fs from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'
import {
  values,
  getStoreMainDir,
  getStorePackagesDir,
  getPackageStoreDir,
  readSignatureFile,
  readIgnoreFile,
  writeSignatureFile,
  yalcGlobal,
} from '../config/index'

describe('Core Configuration and Utilities', () => {
  let tempDir: string
  let originalYalcStoreMainDir: string | undefined
  let originalPlatform: NodeJS.Platform
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    tempDir = await fs.mkdtemp(join(tmpdir(), 'yalc-test-index-'))

    // Save original values
    originalYalcStoreMainDir = yalcGlobal.yalcStoreMainDir
    originalPlatform = process.platform
    originalEnv = { ...process.env }

    // Reset global state
    yalcGlobal.yalcStoreMainDir = undefined as any
  })

  afterEach(async () => {
    // Restore original values
    if (originalYalcStoreMainDir) {
      yalcGlobal.yalcStoreMainDir = originalYalcStoreMainDir
    } else {
      yalcGlobal.yalcStoreMainDir = undefined as any
    }

    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
      writable: false,
    })

    process.env = originalEnv

    // Clean up temporary directory
    await fs.remove(tempDir)
  })

  describe('values configuration', () => {
    it('should have correct default values', () => {
      expect(values.myNameIs).toBe('yalc')
      expect(values.myNameIsCapitalized).toBe('Yalc')
      expect(values.ignoreFileName).toBe('.yalcignore')
      expect(values.lockfileName).toBe('yalc.lock')
      expect(values.yalcPackagesFolder).toBe('.yalc')
      expect(values.installationsFile).toBe('installations.json')
      expect(values.prescript).toBe('preyalc')
      expect(values.postscript).toBe('postyalc')
    })
  })

  describe('getStoreMainDir', () => {
    it('should return global yalcStoreMainDir when set', () => {
      const testDir = '/custom/yalc/store'
      yalcGlobal.yalcStoreMainDir = testDir

      const result = getStoreMainDir()

      expect(result).toBe(testDir)
    })

    it('should return Windows AppData path when on Windows with LOCALAPPDATA', () => {
      // Mock Windows platform
      Object.defineProperty(process, 'platform', {
        value: 'win32',
        writable: false,
      })

      process.env.LOCALAPPDATA = 'C:\\Users\\TestUser\\AppData\\Local'

      const result = getStoreMainDir()

      // Windows path uses forward slashes in Node.js join() result
      expect(result).toBe('C:\\Users\\TestUser\\AppData\\Local/Yalc')
    })

    it('should return home directory path on non-Windows platforms', () => {
      // Mock Unix platform
      Object.defineProperty(process, 'platform', {
        value: 'linux',
        writable: false,
      })

      const result = getStoreMainDir()

      // Should use user home directory + .yalc
      expect(result).toContain('.yalc')
      expect(result).not.toContain('AppData')
    })

    it('should return home directory path on Windows without LOCALAPPDATA', () => {
      // Mock Windows platform without LOCALAPPDATA
      Object.defineProperty(process, 'platform', {
        value: 'win32',
        writable: false,
      })

      delete process.env.LOCALAPPDATA

      const result = getStoreMainDir()

      // Should fall back to home directory
      expect(result).toContain('.yalc')
      expect(result).not.toContain('AppData')
    })
  })

  describe('getStorePackagesDir', () => {
    it('should return packages subdirectory of store main dir', () => {
      const testDir = '/custom/yalc/store'
      yalcGlobal.yalcStoreMainDir = testDir

      const result = getStorePackagesDir()

      expect(result).toBe('/custom/yalc/store/packages')
    })
  })

  describe('getPackageStoreDir', () => {
    it('should return package directory without version', () => {
      const testDir = '/custom/yalc/store'
      yalcGlobal.yalcStoreMainDir = testDir

      const result = getPackageStoreDir('lodash')

      expect(result).toBe('/custom/yalc/store/packages/lodash')
    })

    it('should return package directory with version', () => {
      const testDir = '/custom/yalc/store'
      yalcGlobal.yalcStoreMainDir = testDir

      const result = getPackageStoreDir('lodash', '4.17.21')

      expect(result).toBe('/custom/yalc/store/packages/lodash/4.17.21')
    })

    it('should handle scoped packages', () => {
      const testDir = '/custom/yalc/store'
      yalcGlobal.yalcStoreMainDir = testDir

      const result = getPackageStoreDir('@types/node', '18.0.0')

      expect(result).toBe('/custom/yalc/store/packages/@types/node/18.0.0')
    })
  })

  describe('readSignatureFile', () => {
    it('should read signature file when it exists', async () => {
      const signatureContent = 'abc123def456'
      const sigFilePath = join(tempDir, 'yalc.sig')

      await fs.writeFile(sigFilePath, signatureContent)

      const result = readSignatureFile(tempDir)

      expect(result).toBe(signatureContent)
    })

    it('should return empty string when signature file does not exist', () => {
      const result = readSignatureFile(tempDir)

      expect(result).toBe('')
    })

    it('should return empty string when signature file is unreadable', () => {
      // Instead of mocking, we can test with a directory that doesn't have the signature file
      // or create a file that has permission issues on the path level
      const nonExistentDir = join(tempDir, 'non-existent')

      const result = readSignatureFile(nonExistentDir)

      expect(result).toBe('')
    })
  })

  describe('readIgnoreFile', () => {
    it('should read yalc ignore file when it exists', async () => {
      const ignoreContent = 'node_modules\\n*.log\\n.env'
      const ignoreFilePath = join(tempDir, '.yalcignore')

      await fs.writeFile(ignoreFilePath, ignoreContent)

      const result = readIgnoreFile(tempDir)

      expect(result).toBe(ignoreContent)
    })

    it('should return empty string when ignore file does not exist', () => {
      const result = readIgnoreFile(tempDir)

      expect(result).toBe('')
    })

    it('should return empty string when ignore file is unreadable', () => {
      // Test with a directory that doesn't exist
      const nonExistentDir = join(tempDir, 'non-existent')

      const result = readIgnoreFile(nonExistentDir)

      expect(result).toBe('')
    })
  })

  describe('writeSignatureFile', () => {
    it('should write signature file successfully', async () => {
      const signatureContent = 'abc123def456'

      writeSignatureFile(tempDir, signatureContent)

      const sigFilePath = join(tempDir, 'yalc.sig')
      const written = await fs.readFile(sigFilePath, 'utf-8')

      expect(written).toBe(signatureContent)
    })

    it('should throw error when write fails', () => {
      const signatureContent = 'abc123def456'

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      try {
        // Try to write to a non-existent directory to trigger error
        expect(() => {
          writeSignatureFile('/non-existent-dir', signatureContent)
        }).toThrow()
        expect(consoleSpy).toHaveBeenCalledWith(
          'Could not write signature file',
        )
      } finally {
        consoleSpy.mockRestore()
      }
    })
  })
})
