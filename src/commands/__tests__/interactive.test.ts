/**
 * Interactive CLI Tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as fs from 'fs-extra'

// Mock clack to simulate user interactions
const mockClack = {
  intro: vi.fn(),
  outro: vi.fn(),
  note: vi.fn(),
  select: vi.fn(),
  multiselect: vi.fn(),
  confirm: vi.fn(),
  spinner: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  log: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  },
  isCancel: vi.fn(),
}

vi.mock('@clack/prompts', () => mockClack)

// Mock fs-extra
vi.mock('fs-extra', () => ({
  remove: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
}))

// Mock store manager
const mockStorePackages = [
  {
    name: 'test-package-1',
    version: '1.0.0',
    size: 1000,
    storePath: '/mock/store/test-package-1/1.0.0',
    usedInProjects: [],
    publishedAt: new Date(),
    manifest: { name: 'test-package-1', version: '1.0.0' },
  },
  {
    name: 'test-package-2',
    version: '2.0.0',
    size: 2000,
    storePath: '/mock/store/test-package-2/2.0.0',
    usedInProjects: ['/project1'],
    publishedAt: new Date(),
    manifest: { name: 'test-package-2', version: '2.0.0' },
  },
]

vi.mock('../../core/store/manager.js', () => ({
  listStorePackages: vi.fn(() => mockStorePackages),
  getStoreStats: vi.fn(() => ({
    totalPackages: 2,
    totalSize: 3000,
    unusedPackages: 1,
    lastActivity: new Date(),
  })),
  formatSize: vi.fn((bytes) => `${bytes} B`),
  formatRelativeTime: vi.fn(() => '5m ago'),
}))

vi.mock('../../core/config/index.js', () => ({
  getStoreMainDir: vi.fn(() => '/mock/store'),
  readPackageManifest: vi.fn(() => ({
    name: 'test-project',
    version: '1.0.0',
  })),
  publishPackage: vi.fn(),
  addPackages: vi.fn(),
}))

// Import the module after mocking
import { interactiveMode } from '../interactive'

describe('Interactive CLI - Package Removal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.stdin.isTTY = true
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('removeSpecificPackages', () => {
    it('should handle empty store gracefully', async () => {
      // Mock empty store
      const { listStorePackages } = await import('../../core/store/manager.js')
      vi.mocked(listStorePackages).mockReturnValue([])

      // Mock user choosing remove from main menu
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('exit') // exit

      await interactiveMode()

      expect(mockClack.note).toHaveBeenCalledWith(
        'No packages found in store to remove.',
        '📦 Empty Store',
      )
    })

    it('should allow selecting specific packages for removal', async () => {
      // Mock user interactions
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('select') // select specific packages
        .mockResolvedValueOnce('exit') // exit

      mockClack.multiselect.mockResolvedValueOnce(['test-package-1'])
      mockClack.confirm.mockResolvedValueOnce(true)

      vi.mocked(fs.remove).mockResolvedValue()

      await interactiveMode()

      expect(mockClack.multiselect).toHaveBeenCalledWith({
        message: 'Select packages to remove:',
        options: expect.arrayContaining([
          {
            value: 'test-package-1',
            label: 'test-package-1@1.0.0',
            hint: '1000 B',
          },
          {
            value: 'test-package-2',
            label: 'test-package-2@2.0.0',
            hint: '2000 B',
          },
        ]),
        required: false,
      })

      expect(mockClack.confirm).toHaveBeenCalledWith({
        message: 'Remove 1 packages? (1000 B will be freed)',
        initialValue: false,
      })

      expect(fs.remove).toHaveBeenCalledWith('/mock/store/test-package-1/1.0.0')
      expect(mockClack.log.success).toHaveBeenCalledWith('Removed 1 packages')
    })

    it('should allow removing all packages', async () => {
      // Mock user interactions
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('all') // remove all packages
        .mockResolvedValueOnce('exit') // exit

      mockClack.confirm.mockResolvedValueOnce(true)

      vi.mocked(fs.remove).mockResolvedValue()

      await interactiveMode()

      expect(mockClack.confirm).toHaveBeenCalledWith({
        message: 'Remove 2 packages? (3000 B will be freed)',
        initialValue: false,
      })

      expect(fs.remove).toHaveBeenCalledWith('/mock/store/test-package-1/1.0.0')
      expect(fs.remove).toHaveBeenCalledWith('/mock/store/test-package-2/2.0.0')
      expect(mockClack.log.success).toHaveBeenCalledWith('Removed 2 packages')
    })

    it('should handle cancellation gracefully', async () => {
      // Mock user interactions - cancel at various points
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('cancel') // cancel removal
        .mockResolvedValueOnce('exit') // exit

      await interactiveMode()

      expect(fs.remove).not.toHaveBeenCalled()
    })

    it('should handle no packages selected', async () => {
      // Mock user interactions
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('select') // select specific packages
        .mockResolvedValueOnce('exit') // exit

      mockClack.multiselect.mockResolvedValueOnce([]) // select no packages

      await interactiveMode()

      expect(mockClack.note).toHaveBeenCalledWith(
        'No packages selected',
        '🚫 Cancelled',
      )
      expect(fs.remove).not.toHaveBeenCalled()
    })

    it('should handle confirmation rejection', async () => {
      // Mock user interactions
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('select') // select specific packages
        .mockResolvedValueOnce('exit') // exit

      mockClack.multiselect.mockResolvedValueOnce(['test-package-1'])
      mockClack.confirm.mockResolvedValueOnce(false) // reject confirmation

      await interactiveMode()

      expect(mockClack.note).toHaveBeenCalledWith(
        'Removal cancelled',
        '🚫 Cancelled',
      )
      expect(fs.remove).not.toHaveBeenCalled()
    })

    it('should handle file removal errors gracefully', async () => {
      // Mock user interactions
      mockClack.select
        .mockResolvedValueOnce('remove') // main menu
        .mockResolvedValueOnce('select') // select specific packages
        .mockResolvedValueOnce('exit') // exit

      mockClack.multiselect.mockResolvedValueOnce([
        'test-package-1',
        'test-package-2',
      ])
      mockClack.confirm.mockResolvedValueOnce(true)

      // Mock one success, one failure
      vi.mocked(fs.remove)
        .mockResolvedValueOnce() // success for package 1
        .mockRejectedValueOnce(new Error('Permission denied')) // failure for package 2

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await interactiveMode()

      expect(fs.remove).toHaveBeenCalledTimes(2)
      expect(mockClack.log.success).toHaveBeenCalledWith('Removed 1 packages')
      expect(mockClack.log.warn).toHaveBeenCalledWith(
        'Failed to remove 1 packages',
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to remove test-package-2@2.0.0:',
        expect.any(Error),
      )

      consoleSpy.mockRestore()
    })

    it('should handle clack cancellation', async () => {
      // Mock user interactions
      mockClack.select.mockResolvedValueOnce('remove') // main menu

      mockClack.isCancel.mockReturnValue(true)

      mockClack.select.mockResolvedValueOnce('exit') // exit

      await interactiveMode()

      expect(fs.remove).not.toHaveBeenCalled()
    })
  })
})
