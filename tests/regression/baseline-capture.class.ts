import { execSync } from 'child_process'
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'
import { createHash } from 'crypto'

interface BaselineResult {
  command: string
  args: string[]
  exitCode: number
  stdout: string
  stderr: string
  timestamp: string
  hash: string
  duration: number
}

interface BaselineSuite {
  version: string
  timestamp: string
  node_version: string
  npm_version: string
  platform: string
  results: BaselineResult[]
}

export class BaselineCapture {
  private baselineDir: string
  private yalcPath: string

  constructor(baselineDir: string = './tests/regression/baselines') {
    this.baselineDir = resolve(baselineDir)
    this.yalcPath = resolve('./dist/yalc.js')

    if (!existsSync(this.baselineDir)) {
      mkdirSync(this.baselineDir, { recursive: true })
    }
  }

  /**
   * Capture baseline for all critical YALC commands
   */
  async captureAllBaselines(): Promise<BaselineSuite> {
    console.log('🎯 Capturing YALC baseline commands...')

    const commands = [
      // Basic commands
      ['--help'],
      ['--version'],
      ['dir'],

      // Install commands (safe to run)
      ['installations', 'show'],

      // Check commands (read-only)
      ['check', '--help'],
    ]

    const results: BaselineResult[] = []

    for (const args of commands) {
      try {
        const result = await this.captureCommand('yalc', args)
        results.push(result)
        console.log(`✅ Captured: yalc ${args.join(' ')}`)
      } catch (error) {
        console.warn(`⚠️  Failed to capture: yalc ${args.join(' ')}`, error)
      }
    }

    const suite: BaselineSuite = {
      version: this.getYalcVersion(),
      timestamp: new Date().toISOString(),
      node_version: process.version,
      npm_version: this.getNpmVersion(),
      platform: process.platform,
      results,
    }

    return suite
  }

  /**
   * Capture a single command execution
   */
  private async captureCommand(
    command: string,
    args: string[],
  ): Promise<BaselineResult> {
    const startTime = Date.now()

    try {
      // Use node to run the yalc script directly
      const fullCommand = `node ${this.yalcPath} ${args.join(' ')}`
      const stdout = execSync(fullCommand, {
        encoding: 'utf8',
        cwd: process.cwd(),
        timeout: 30000,
      })

      const duration = Date.now() - startTime
      const result: BaselineResult = {
        command,
        args,
        exitCode: 0,
        stdout: stdout.toString(),
        stderr: '',
        timestamp: new Date().toISOString(),
        hash: this.createHash(stdout.toString()),
        duration,
      }

      return result
    } catch (error: any) {
      const duration = Date.now() - startTime
      const result: BaselineResult = {
        command,
        args,
        exitCode: error.status || 1,
        stdout: error.stdout?.toString() || '',
        stderr: error.stderr?.toString() || error.message,
        timestamp: new Date().toISOString(),
        hash: this.createHash(
          (error.stdout || '') + (error.stderr || error.message),
        ),
        duration,
      }

      return result
    }
  }

  /**
   * Save baseline suite to file
   */
  saveBaseline(
    suite: BaselineSuite,
    filename: string = 'baseline.json',
  ): string {
    const filepath = join(this.baselineDir, filename)
    writeFileSync(filepath, JSON.stringify(suite, null, 2))
    console.log(`💾 Saved baseline to: ${filepath}`)
    return filepath
  }

  /**
   * Load existing baseline
   */
  loadBaseline(filename: string = 'baseline.json'): BaselineSuite | null {
    const filepath = join(this.baselineDir, filename)
    if (!existsSync(filepath)) {
      return null
    }

    try {
      const content = readFileSync(filepath, 'utf8')
      return JSON.parse(content) as BaselineSuite
    } catch (error) {
      console.error(`Failed to load baseline from ${filepath}:`, error)
      return null
    }
  }

  /**
   * Compare two baseline suites
   */
  compareBaselines(
    baseline: BaselineSuite,
    current: BaselineSuite,
  ): ComparisonResult {
    const differences: CommandDifference[] = []

    for (const baselineResult of baseline.results) {
      const currentResult = current.results.find(
        (r) =>
          r.command === baselineResult.command &&
          JSON.stringify(r.args) === JSON.stringify(baselineResult.args),
      )

      if (!currentResult) {
        differences.push({
          command: `${baselineResult.command} ${baselineResult.args.join(' ')}`,
          type: 'missing',
          baseline: baselineResult,
          current: null,
        })
        continue
      }

      if (baselineResult.hash !== currentResult.hash) {
        differences.push({
          command: `${baselineResult.command} ${baselineResult.args.join(' ')}`,
          type: 'output_changed',
          baseline: baselineResult,
          current: currentResult,
        })
      }

      if (baselineResult.exitCode !== currentResult.exitCode) {
        differences.push({
          command: `${baselineResult.command} ${baselineResult.args.join(' ')}`,
          type: 'exit_code_changed',
          baseline: baselineResult,
          current: currentResult,
        })
      }
    }

    return {
      identical: differences.length === 0,
      differences,
      baseline_version: baseline.version,
      current_version: current.version,
    }
  }

  private createHash(content: string): string {
    return createHash('sha256').update(content).digest('hex').substring(0, 16)
  }

  private getYalcVersion(): string {
    try {
      const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))
      return packageJson.version
    } catch {
      return 'unknown'
    }
  }

  private getNpmVersion(): string {
    try {
      return execSync('npm --version', { encoding: 'utf8' }).trim()
    } catch {
      return 'unknown'
    }
  }
}

interface CommandDifference {
  command: string
  type: 'missing' | 'output_changed' | 'exit_code_changed'
  baseline: BaselineResult | null
  current: BaselineResult | null
}

interface ComparisonResult {
  identical: boolean
  differences: CommandDifference[]
  baseline_version: string
  current_version: string
}
