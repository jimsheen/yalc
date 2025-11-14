import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as fs from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'
import {
  readInstallationsFile,
  saveInstallationsFile,
  addInstallations,
  removeInstallations,
  type PackageName,
  type PackageInstallation,
  type InstallationsFile,
} from '../installations'
import { yalcGlobal } from '../../../core/config/index'

describe('Package Installation Tracking', () => {
  let tempDir: string
  let originalYalcStoreMainDir: string | undefined

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    tempDir = await fs.mkdtemp(join(tmpdir(), 'yalc-test-installations-'))

    // Save original store directory and set temporary one
    originalYalcStoreMainDir = yalcGlobal.yalcStoreMainDir
    yalcGlobal.yalcStoreMainDir = tempDir
  })

  afterEach(async () => {
    // Restore original store directory
    if (originalYalcStoreMainDir) {
      yalcGlobal.yalcStoreMainDir = originalYalcStoreMainDir
    } else {
      yalcGlobal.yalcStoreMainDir = undefined as any
    }

    // Clean up temporary directory
    await fs.remove(tempDir)
  })

  describe('readInstallationsFile', () => {
    it('should return empty object when installations file does not exist', () => {
      const result = readInstallationsFile()
      expect(result).toEqual({})
    })

    it('should read existing installations file', async () => {
      const installationsData: InstallationsFile = {
        lodash: ['/project1', '/project2'],
        react: ['/project1'],
      }

      const installationsPath = join(tempDir, 'installations.json')
      await fs.writeFile(installationsPath, JSON.stringify(installationsData))

      const result = readInstallationsFile()

      expect(result).toEqual(installationsData)
    })

    it('should handle malformed JSON gracefully', async () => {
      const installationsPath = join(tempDir, 'installations.json')
      await fs.writeFile(installationsPath, 'invalid json content')

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const result = readInstallationsFile()

      expect(result).toEqual({})
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading installations file',
        installationsPath,
        expect.any(Error),
      )

      consoleSpy.mockRestore()
    })
  })

  describe('saveInstallationsFile', () => {
    it('should create installations file with data', async () => {
      const installationsData: InstallationsFile = {
        lodash: ['/project1', '/project2'],
        react: ['/project1'],
      }

      await saveInstallationsFile(installationsData)

      const installationsPath = join(tempDir, 'installations.json')
      const written = await fs.readFile(installationsPath, 'utf-8')
      const parsed = JSON.parse(written)

      expect(parsed).toEqual(installationsData)
    })

    it('should overwrite existing installations file', async () => {
      const installationsPath = join(tempDir, 'installations.json')

      // Create initial file
      const initialData = { 'old-package': ['/old/path'] }
      await fs.writeFile(installationsPath, JSON.stringify(initialData))

      // Write new data
      const newData = { 'new-package': ['/new/path'] }
      await saveInstallationsFile(newData)

      const written = await fs.readFile(installationsPath, 'utf-8')
      const parsed = JSON.parse(written)

      expect(parsed).toEqual(newData)
      expect(parsed).not.toEqual(initialData)
    })
  })

  describe('addInstallations', () => {
    it('should add first installation for a package', async () => {
      const packageName = 'lodash' as PackageName
      const installationPath = '/project/path'
      const installation: PackageInstallation = {
        name: packageName,
        path: installationPath,
      }

      await addInstallations([installation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual([installationPath])
    })

    it('should add installation to existing package', async () => {
      const packageName = 'lodash' as PackageName

      // Set up initial installation
      const initialInstallations = {
        [packageName]: ['/project1'],
      }
      await saveInstallationsFile(initialInstallations)

      // Add second installation
      const newInstallation: PackageInstallation = {
        name: packageName,
        path: '/project2',
      }
      await addInstallations([newInstallation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual(['/project1', '/project2'])
    })

    it('should not duplicate existing installation paths', async () => {
      const packageName = 'lodash' as PackageName
      const installationPath = '/project/path'

      // Set up initial installation
      const initialInstallations = {
        [packageName]: [installationPath],
      }
      await saveInstallationsFile(initialInstallations)

      // Try to add same path again
      const duplicateInstallation: PackageInstallation = {
        name: packageName,
        path: installationPath,
      }
      await addInstallations([duplicateInstallation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual([installationPath])
      expect(installations[packageName]).toHaveLength(1)
    })

    it('should preserve other packages when adding installation', async () => {
      const initialInstallations = {
        react: ['/react-project'],
        vue: ['/vue-project'],
      }
      await saveInstallationsFile(initialInstallations)

      const newInstallation: PackageInstallation = {
        name: 'lodash' as PackageName,
        path: '/lodash-project',
      }
      await addInstallations([newInstallation])

      const installations = readInstallationsFile()
      expect(installations['react']).toEqual(['/react-project'])
      expect(installations['vue']).toEqual(['/vue-project'])
      expect(installations['lodash']).toEqual(['/lodash-project'])
    })
  })

  describe('removeInstallations', () => {
    it('should remove specific installation path for a package', async () => {
      const packageName = 'lodash' as PackageName
      const initialInstallations = {
        [packageName]: ['/project1', '/project2', '/project3'],
      }
      await saveInstallationsFile(initialInstallations)

      const installationToRemove: PackageInstallation = {
        name: packageName,
        path: '/project2',
      }
      await removeInstallations([installationToRemove])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual(['/project1', '/project3'])
    })

    it('should remove all installations for a package when all paths are specified', async () => {
      const packageName = 'lodash' as PackageName
      const initialInstallations = {
        [packageName]: ['/project1', '/project2'],
        react: ['/react-project'],
      }
      await saveInstallationsFile(initialInstallations)

      const installationsToRemove: PackageInstallation[] = [
        { name: packageName, path: '/project1' },
        { name: packageName, path: '/project2' },
      ]
      await removeInstallations(installationsToRemove)

      const installations = readInstallationsFile()
      expect(installations[packageName]).toBeUndefined()
      expect(installations['react']).toEqual(['/react-project'])
    })

    it('should handle removal of non-existent package gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      const nonExistentInstallation: PackageInstallation = {
        name: 'non-existent' as PackageName,
        path: '/non-existent-path',
      }
      await removeInstallations([nonExistentInstallation])

      // Should not throw
      const installations = readInstallationsFile()
      expect(installations).toEqual({})

      consoleSpy.mockRestore()
    })

    it('should remove empty package entry when last installation is removed', async () => {
      const packageName = 'lodash' as PackageName
      const initialInstallations = {
        [packageName]: ['/only-project'],
        react: ['/react-project'],
      }
      await saveInstallationsFile(initialInstallations)

      const installationToRemove: PackageInstallation = {
        name: packageName,
        path: '/only-project',
      }
      await removeInstallations([installationToRemove])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toBeUndefined()
      expect(installations['react']).toEqual(['/react-project'])
    })

    it('should handle removal of non-existent installation path', async () => {
      const packageName = 'lodash' as PackageName
      const initialInstallations = {
        [packageName]: ['/project1', '/project2'],
      }
      await saveInstallationsFile(initialInstallations)

      const nonExistentInstallation: PackageInstallation = {
        name: packageName,
        path: '/non-existent-path',
      }
      await removeInstallations([nonExistentInstallation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual(['/project1', '/project2'])
    })
  })

  describe('edge cases', () => {
    it('should handle packages with special characters in names', async () => {
      const packageName = '@types/node' as PackageName
      const installationPath = '/project/@types-test'

      const installation: PackageInstallation = {
        name: packageName,
        path: installationPath,
      }
      await addInstallations([installation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual([installationPath])
    })

    it('should handle installation paths with spaces and special characters', async () => {
      const packageName = 'lodash' as PackageName
      const installationPath = '/path with spaces/project-name'

      const installation: PackageInstallation = {
        name: packageName,
        path: installationPath,
      }
      await addInstallations([installation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual([installationPath])
    })

    it('should handle very long installation paths', async () => {
      const packageName = 'test-package' as PackageName
      const longPath =
        '/very/long/path/that/goes/on/for/many/directories/and/subdirectories/to/test/path/handling'

      const installation: PackageInstallation = {
        name: packageName,
        path: longPath,
      }
      await addInstallations([installation])

      const installations = readInstallationsFile()
      expect(installations[packageName]).toEqual([longPath])
    })
  })
})
