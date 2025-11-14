import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { join } from 'path'
import { mkdirSync, writeFileSync, rmSync } from 'fs'
import {
  readRcConfig,
  validateConfig,
  getConfigSources,
  checkConfigFile,
  checkConfigFileWithError,
} from '../rc-modern.js'
import { DEFAULT_CONFIG } from '../types.js'

describe('Modern RC Configuration', () => {
  const tempDir = join(process.cwd(), 'tmp-rc-test')
  let originalArgv: string[]
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    // Save original state
    originalArgv = [...process.argv]
    originalEnv = { ...process.env }

    // Create temp directory
    try {
      mkdirSync(tempDir, { recursive: true })
    } catch {
      // Directory might already exist
    }

    // Clean environment
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith('YALC_')) {
        delete process.env[key]
      }
    })
  })

  afterEach(() => {
    // Restore original state
    process.argv = originalArgv
    process.env = originalEnv

    // Clean up temp directory
    try {
      rmSync(tempDir, { recursive: true, force: true })
    } catch {
      // Ignore cleanup errors
    }
  })

  describe('readRcConfig', () => {
    it('should return default config when no configuration exists', () => {
      const config = readRcConfig(tempDir)
      expect(config).toEqual(DEFAULT_CONFIG)
    })

    it('should read JSON configuration file', () => {
      const configPath = join(tempDir, '.yalcrc.json')
      const configData = {
        'workspace-resolve': false,
        sig: true,
        'dev-mod': false,
      }

      writeFileSync(configPath, JSON.stringify(configData))

      const config = readRcConfig(tempDir)
      expect(config['workspace-resolve']).toBe(false)
      expect(config.sig).toBe(true)
      expect(config['dev-mod']).toBe(false)
      expect(config.scripts).toBe(DEFAULT_CONFIG.scripts) // unchanged
    })

    it('should read INI configuration file', () => {
      const configPath = join(tempDir, '.yalcrc')
      const configData = `workspace-resolve=false
sig=true
dev-mod=false`

      writeFileSync(configPath, configData)

      const config = readRcConfig(tempDir)
      expect(config['workspace-resolve']).toBe(false)
      expect(config.sig).toBe(true)
      expect(config['dev-mod']).toBe(false)
    })

    it('should handle environment variables', () => {
      process.env.YALC_WORKSPACE_RESOLVE = 'false'
      process.env.YALC_SIG = 'true'

      const config = readRcConfig(tempDir)
      expect(config['workspace-resolve']).toBe(false)
      expect(config.sig).toBe(true)
    })

    it('should handle command line arguments', () => {
      process.argv = [
        ...process.argv,
        '--workspace-resolve=false',
        '--sig=true',
      ]

      const config = readRcConfig(tempDir)
      expect(config['workspace-resolve']).toBe(false)
      expect(config.sig).toBe(true)
    })
  })

  describe('validateConfig', () => {
    it('should validate correct configuration', () => {
      const config = {
        'workspace-resolve': true,
        sig: false,
        'dev-mod': true,
      }

      const result = validateConfig(config)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.unknownKeys).toHaveLength(0)
      expect(result.config).toEqual(config)
    })

    it('should detect unknown keys', () => {
      const config = {
        'workspace-resolve': true,
        'unknown-option': 'value',
        'another-unknown': 123,
      }

      const result = validateConfig(config)
      expect(result.valid).toBe(false)
      expect(result.unknownKeys).toEqual(['unknown-option', 'another-unknown'])
      expect(result.config['workspace-resolve']).toBe(true)
    })

    it('should detect invalid value types', () => {
      const config = {
        'workspace-resolve': 'not-a-boolean',
        sig: 123,
        'dev-mod': true,
      }

      const result = validateConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toEqual([
        'workspace-resolve must be a boolean, got string',
        'sig must be a boolean, got number',
      ])
      expect(result.config['dev-mod']).toBe(true)
    })
  })

  describe('checkConfigFile', () => {
    it('should return true for existing readable files', () => {
      const configPath = join(tempDir, 'test-config')
      writeFileSync(configPath, 'test content')

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(checkConfigFile(configPath)).toBe(true)
    })

    it('should return false for non-existent files', () => {
      const configPath = join(tempDir, 'non-existent-file')
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(checkConfigFile(configPath)).toBe(false)
    })

    it('should return false for empty files', () => {
      const configPath = join(tempDir, 'empty-config')
      writeFileSync(configPath, '')

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(checkConfigFile(configPath)).toBe(false)
    })
  })

  describe('checkConfigFileWithError', () => {
    it('should return success for existing readable files', () => {
      const configPath = join(tempDir, 'test-config')
      writeFileSync(configPath, 'test content')

      const result = checkConfigFileWithError(configPath)
      expect(result.exists).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return false for non-existent files', () => {
      const configPath = join(tempDir, 'non-existent-file')

      const result = checkConfigFileWithError(configPath)
      expect(result.exists).toBe(false)
      expect(result.error).toBeUndefined()
    })

    it('should return error for empty files', () => {
      const configPath = join(tempDir, 'empty-config')
      writeFileSync(configPath, '')

      const result = checkConfigFileWithError(configPath)
      expect(result.exists).toBe(false)
      expect(result.error).toBe('Config file is empty')
    })
  })

  describe('getConfigSources', () => {
    it('should detect existing configuration files', () => {
      const jsonConfig = join(tempDir, '.yalcrc.json')
      const iniConfig = join(tempDir, '.yalcrc')

      writeFileSync(jsonConfig, '{}')
      writeFileSync(iniConfig, 'sig=true')

      const sources = getConfigSources(tempDir)
      expect(sources).toContain(jsonConfig)
      expect(sources).toContain(iniConfig)
    })

    it('should detect environment variables', () => {
      process.env.YALC_SIG = 'true'
      process.env.YALC_QUIET = 'false'

      const sources = getConfigSources(tempDir)
      expect(
        sources.some((source) => source.includes('Environment variables')),
      ).toBe(true)
    })

    it('should detect command line arguments', () => {
      process.argv = [
        ...process.argv,
        '--sig=true',
        '--workspace-resolve=false',
      ]

      const sources = getConfigSources(tempDir)
      expect(sources).toContain('Command line arguments')
    })

    it('should return empty array when no sources exist', () => {
      const sources = getConfigSources(tempDir)
      expect(sources).toHaveLength(0)
    })
  })

  describe('integration', () => {
    it('should handle precedence correctly', () => {
      // Create config file with one value
      const configPath = join(tempDir, '.yalcrc.json')
      writeFileSync(configPath, JSON.stringify({ 'workspace-resolve': false }))

      // Set environment variable with different value
      process.env.YALC_WORKSPACE_RESOLVE = 'true'

      // Command line should have highest precedence
      process.argv = [...process.argv, '--workspace-resolve=false']

      const config = readRcConfig(tempDir)
      expect(config['workspace-resolve']).toBe(false) // Command line wins
    })

    it('should provide helpful error messages for invalid config', () => {
      const consoleWarnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const configPath = join(tempDir, '.yalcrc.json')
      writeFileSync(
        configPath,
        JSON.stringify({
          'workspace-resolve': 'invalid',
          'unknown-option': 'value',
        }),
      )

      readRcConfig(tempDir)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Unknown configuration options: unknown-option',
        ),
      )

      consoleWarnSpy.mockRestore()
    })

    it('should warn about malformed JSON config files', () => {
      const consoleWarnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const configPath = join(tempDir, '.yalcrc.json')
      writeFileSync(configPath, '{ invalid json }')

      readRcConfig(tempDir)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to parse JSON config file'),
      )

      consoleWarnSpy.mockRestore()
    })

    it('should warn about malformed INI config files', () => {
      const consoleWarnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      // Create a file that will cause INI parsing to fail
      const configPath = join(tempDir, '.yalcrc')
      writeFileSync(configPath, '\x00\x01\x02 invalid binary content')

      readRcConfig(tempDir)

      // The INI parser is robust and treats binary as config keys, which then get flagged as unknown options
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown configuration options'),
      )

      consoleWarnSpy.mockRestore()
    })
  })
})
