/**
 * Configuration options for yalc
 */
export interface YalcConfig {
  /**
   * Whether to resolve workspace: protocol dependencies to actual versions
   * @default true
   */
  'workspace-resolve'?: boolean

  /**
   * Whether to generate package integrity signatures (yalc.sig files)
   * @default false
   */
  sig?: boolean

  /**
   * Whether to include devDependencies in published packages
   * @default true
   */
  'dev-mod'?: boolean

  /**
   * Whether to run npm lifecycle scripts during publish
   * @default true
   */
  scripts?: boolean

  /**
   * Whether to suppress console output (errors still shown)
   * @default false
   */
  quiet?: boolean

  /**
   * Whether to use package.json files field to determine what to publish
   * @default false
   */
  files?: boolean
}

/**
 * Complete configuration with defaults applied
 */
export type YalcConfigResolved = Required<YalcConfig>

/**
 * Valid configuration option keys
 */
export const VALID_CONFIG_KEYS: Array<keyof YalcConfig> = [
  'workspace-resolve',
  'sig',
  'dev-mod',
  'scripts',
  'quiet',
  'files',
]

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: YalcConfigResolved = {
  'workspace-resolve': true,
  sig: false,
  'dev-mod': true,
  scripts: true,
  quiet: false,
  files: false,
}

/**
 * Configuration validation result
 */
export interface ConfigValidationResult {
  valid: boolean
  errors: string[]
  unknownKeys: string[]
  config: YalcConfig
}
