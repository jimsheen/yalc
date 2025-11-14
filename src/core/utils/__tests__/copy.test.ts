import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import * as fs from 'fs-extra'
import { join } from 'path'
import { tmpdir } from 'os'
import { getFileHash } from '../copy'

describe('File Copy Operations', () => {
  let tempDir: string

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    tempDir = await fs.mkdtemp(join(tmpdir(), 'yalc-test-copy-'))
  })

  afterEach(async () => {
    // Clean up temporary directory
    await fs.remove(tempDir)
  })

  describe('getFileHash', () => {
    it('should generate consistent hash for same file content', async () => {
      const testFile = join(tempDir, 'test.txt')
      const content = 'Hello, Yalc!'

      await fs.writeFile(testFile, content)

      const hash1 = await getFileHash(testFile)
      const hash2 = await getFileHash(testFile)

      expect(hash1).toBe(hash2)
      expect(hash1).toHaveLength(32) // MD5 hash length
    })

    it('should generate different hashes for different content', async () => {
      const testFile1 = join(tempDir, 'test1.txt')
      const testFile2 = join(tempDir, 'test2.txt')

      await fs.writeFile(testFile1, 'Content 1')
      await fs.writeFile(testFile2, 'Content 2')

      const hash1 = await getFileHash(testFile1)
      const hash2 = await getFileHash(testFile2)

      expect(hash1).not.toBe(hash2)
    })

    it('should incorporate relative path into hash', async () => {
      const testFile = join(tempDir, 'test.txt')
      const content = 'Same content'

      await fs.writeFile(testFile, content)

      const hashWithoutRelPath = await getFileHash(testFile)
      const hashWithRelPath = await getFileHash(testFile, 'relative/path')

      expect(hashWithoutRelPath).not.toBe(hashWithRelPath)
    })

    it('should handle Windows backslashes in relative paths', async () => {
      const testFile = join(tempDir, 'test.txt')
      await fs.writeFile(testFile, 'test content')

      const hashUnix = await getFileHash(testFile, 'path/to/file')
      const hashWindows = await getFileHash(testFile, 'path\\to\\file')

      // Should produce same hash since backslashes are normalized to forward slashes
      expect(hashUnix).toBe(hashWindows)
    })

    it('should handle file read errors gracefully', async () => {
      const nonExistentFile = join(tempDir, 'does-not-exist.txt')

      await expect(getFileHash(nonExistentFile)).rejects.toThrow()
    })

    it('should handle empty files', async () => {
      const emptyFile = join(tempDir, 'empty.txt')
      await fs.writeFile(emptyFile, '')

      const hash = await getFileHash(emptyFile)

      expect(hash).toHaveLength(32)
      expect(typeof hash).toBe('string')
    })

    it('should handle binary files', async () => {
      const binaryFile = join(tempDir, 'binary.bin')
      const binaryData = Buffer.from([0x00, 0x01, 0x02, 0xff, 0xfe])

      await fs.writeFile(binaryFile, binaryData)

      const hash = await getFileHash(binaryFile)

      expect(hash).toHaveLength(32)
      expect(typeof hash).toBe('string')
    })

    it('should produce deterministic hashes for same content and path', async () => {
      const testFile = join(tempDir, 'deterministic.txt')
      const content = 'This content should produce the same hash every time'
      const relPath = 'lib/utils/helper.js'

      await fs.writeFile(testFile, content)

      const hashes = await Promise.all([
        getFileHash(testFile, relPath),
        getFileHash(testFile, relPath),
        getFileHash(testFile, relPath),
      ])

      expect(hashes[0]).toBe(hashes[1])
      expect(hashes[1]).toBe(hashes[2])
    })
  })
})
