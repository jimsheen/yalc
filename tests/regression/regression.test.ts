import { describe, it, expect, beforeAll } from 'vitest'
import { BaselineCapture } from './baseline-capture.class'
import { existsSync } from 'fs'

describe('YALC Regression Tests', () => {
  let capture: BaselineCapture

  beforeAll(() => {
    capture = new BaselineCapture()
  })

  describe('Baseline Capture', () => {
    it('should capture baseline commands successfully', async () => {
      const suite = await capture.captureAllBaselines()

      expect(suite).toBeDefined()
      expect(suite.version).toBeDefined()
      expect(suite.results.length).toBeGreaterThan(0)

      // Verify all critical commands captured
      const commands = suite.results.map(
        (r) => `${r.command} ${r.args.join(' ')}`,
      )
      expect(commands).toContain('yalc --help')
      expect(commands).toContain('yalc --version')
      expect(commands).toContain('yalc dir')
    }, 60000)

    it('should save and load baselines correctly', async () => {
      const suite = await capture.captureAllBaselines()
      const filename = 'test-baseline.json'

      const savedPath = capture.saveBaseline(suite, filename)
      expect(existsSync(savedPath)).toBe(true)

      const loaded = capture.loadBaseline(filename)
      expect(loaded).toEqual(suite)
    })
  })

  describe('Command Output Validation', () => {
    it('should have consistent help output', async () => {
      const suite = await capture.captureAllBaselines()
      const helpResult = suite.results.find(
        (r) => r.command === 'yalc' && r.args.includes('--help'),
      )

      expect(helpResult).toBeDefined()
      expect(helpResult!.exitCode).toBe(0)
      expect(helpResult!.stdout).toContain('yalc [command]')
      expect(helpResult!.stdout).toContain('publish')
      expect(helpResult!.stdout).toContain('add')
    })

    it('should have consistent version output', async () => {
      const suite = await capture.captureAllBaselines()
      const versionResult = suite.results.find(
        (r) => r.command === 'yalc' && r.args.includes('--version'),
      )

      expect(versionResult).toBeDefined()
      expect(versionResult!.exitCode).toBe(0)
      expect(versionResult!.stdout).toMatch(/^\d+\.\d+\.\d+/)
    })

    it('should have consistent directory output', async () => {
      const suite = await capture.captureAllBaselines()
      const dirResult = suite.results.find(
        (r) => r.command === 'yalc' && r.args.includes('dir'),
      )

      expect(dirResult).toBeDefined()
      expect(dirResult!.exitCode).toBe(0)
      expect(dirResult!.stdout).toContain('/.yalc')
    })
  })

  describe('Regression Detection', () => {
    it('should detect no regressions when comparing identical baselines', async () => {
      const suite1 = await capture.captureAllBaselines()
      const suite2 = await capture.captureAllBaselines()

      const comparison = capture.compareBaselines(suite1, suite2)

      expect(comparison.identical).toBe(true)
      expect(comparison.differences).toHaveLength(0)
    })

    it('should create baseline file for future comparisons', async () => {
      const suite = await capture.captureAllBaselines()
      const baselinePath = capture.saveBaseline(suite, 'master-baseline.json')

      expect(existsSync(baselinePath)).toBe(true)

      console.log(`\n✅ Master baseline created at: ${baselinePath}`)
      console.log(`📊 Captured ${suite.results.length} commands`)
      console.log(`🏷️  Version: ${suite.version}`)
      console.log(`📅 Timestamp: ${suite.timestamp}`)
    })
  })
})
