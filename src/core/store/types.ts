/**
 * Types for store management and package information
 */

export interface StorePackageInfo {
  /** Package name */
  name: string
  /** Package version */
  version: string
  /** When the package was published to the store */
  publishedAt: Date
  /** Package size in bytes */
  size: number
  /** Projects that currently use this package */
  usedInProjects: string[]
  /** Full path to package in store */
  storePath: string
  /** Package manifest data */
  manifest?: any
}

export interface StoreStats {
  /** Total number of packages in store */
  totalPackages: number
  /** Total size of all packages in bytes */
  totalSize: number
  /** Number of packages that are not used in any project */
  unusedPackages: number
  /** Last activity timestamp */
  lastActivity?: Date
}

export interface PackageUsageInfo {
  /** Package name */
  packageName: string
  /** Version currently in store */
  version: string
  /** List of projects using this package */
  projects: Array<{
    path: string
    version: string
    isDev: boolean
    isLink: boolean
  }>
}
