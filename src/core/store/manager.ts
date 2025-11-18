/**
 * Store management utilities for listing, analyzing, and managing YALC packages
 */

import { existsSync, statSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { StorePackageInfo, StoreStats, PackageUsageInfo } from './types.js'
import { getStorePackagesDir } from '../config/index.js'
import { readInstallationsFile } from '../../package/installations/installations.js'

/**
 * Get all packages currently in the YALC store
 */
export function listStorePackages(): StorePackageInfo[] {
  const storeDir = getStorePackagesDir()

  if (!existsSync(storeDir)) {
    return []
  }

  const packages: StorePackageInfo[] = []
  const packageDirs = readdirSync(storeDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const packageDir of packageDirs) {
    const packagePath = join(storeDir, packageDir)

    // Handle scoped packages (@scope/package)
    if (packageDir.startsWith('@')) {
      const scopedPackages = readdirSync(packagePath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

      for (const scopedPackage of scopedPackages) {
        const fullPackageName = `${packageDir}/${scopedPackage}`
        const fullPackagePath = join(packagePath, scopedPackage)
        const packageInfo = getPackageInfo(fullPackageName, fullPackagePath)
        if (packageInfo) {
          packages.push(packageInfo)
        }
      }
    } else {
      const packageInfo = getPackageInfo(packageDir, packagePath)
      if (packageInfo) {
        packages.push(packageInfo)
      }
    }
  }

  return packages.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  )
}

/**
 * Get detailed information about all versions of a specific package
 */
function getPackageInfo(
  packageName: string,
  packagePath: string,
): StorePackageInfo | null {
  try {
    // ✅ FIXED: Look for version subdirectories instead of package.json directly
    const versionDirs = readdirSync(packagePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort((a, b) => {
        // Sort versions - try semantic version sort, fallback to string sort
        try {
          const aParts = a.split('.').map(Number)
          const bParts = b.split('.').map(Number)

          for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            const aPart = aParts[i] || 0
            const bPart = bParts[i] || 0
            if (aPart !== bPart) {
              return bPart - aPart // Descending order (newest first)
            }
          }
          return 0
        } catch {
          return b.localeCompare(a) // Fallback to string comparison
        }
      })

    if (versionDirs.length === 0) {
      console.warn(`⚠️ Package ${packageName} has no version directories`)
      return null
    }

    // Get the latest version (first after sorting)
    const latestVersion = versionDirs[0]
    const versionPath = join(packagePath, latestVersion)
    const packageJsonPath = join(versionPath, 'package.json')

    if (!existsSync(packageJsonPath)) {
      console.warn(
        `⚠️ Package ${packageName}@${latestVersion} missing package.json`,
      )
      return null
    }

    const manifest = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const stats = statSync(versionPath)
    const size = getDirectorySize(versionPath)
    const usedInProjects = getPackageUsage(packageName)

    // Validate the manifest has required fields
    if (!manifest.name || !manifest.version) {
      console.warn(
        `⚠️ Package ${packageName}@${latestVersion} has invalid manifest (missing name or version)`,
      )
      return null
    }

    return {
      name: packageName,
      version: manifest.version,
      publishedAt: stats.mtime,
      size,
      usedInProjects,
      storePath: versionPath,
      manifest,
    }
  } catch (error) {
    console.warn(`❌ Failed to read package info for ${packageName}:`, error)
    return null
  }
}

/**
 * Get the total size of a directory in bytes
 */
function getDirectorySize(dirPath: string): number {
  let totalSize = 0

  function calculateSize(currentPath: string) {
    try {
      const stats = statSync(currentPath)

      if (stats.isDirectory()) {
        const files = readdirSync(currentPath)
        for (const file of files) {
          calculateSize(join(currentPath, file))
        }
      } else {
        totalSize += stats.size
      }
    } catch {
      // Ignore files we can't access
    }
  }

  calculateSize(dirPath)
  return totalSize
}

/**
 * Get which projects are currently using a specific package
 */
function getPackageUsage(packageName: string): string[] {
  try {
    const installations = readInstallationsFile()
    const packageInstallations = installations[packageName]

    if (!packageInstallations) {
      return []
    }

    return packageInstallations
  } catch {
    return []
  }
}

/**
 * Get statistics about the entire store
 */
export function getStoreStats(): StoreStats {
  const packages = listStorePackages()

  return {
    totalPackages: packages.length,
    totalSize: packages.reduce((total, pkg) => total + pkg.size, 0),
    unusedPackages: packages.filter((pkg) => pkg.usedInProjects.length === 0)
      .length,
    lastActivity: packages.length > 0 ? packages[0].publishedAt : undefined,
  }
}

/**
 * Get detailed usage information for all packages
 */
export function getPackageUsageInfo(): PackageUsageInfo[] {
  const packages = listStorePackages()
  const installations = readInstallationsFile()

  return packages.map((pkg) => {
    const packageInstallations = installations[pkg.name] || []

    return {
      packageName: pkg.name,
      version: pkg.version,
      projects: packageInstallations.map((path) => ({
        path,
        version: pkg.version,
        isDev: false, // TODO: determine from package.json
        isLink: false, // TODO: determine from installation type
      })),
    }
  })
}

/**
 * Get packages that are not used in any project
 */
export function getUnusedPackages(): StorePackageInfo[] {
  return listStorePackages().filter((pkg) => pkg.usedInProjects.length === 0)
}

/**
 * Format file size in human-readable format
 */
export function formatSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'

  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = bytes / Math.pow(1024, i)

  return `${size.toFixed(1)} ${sizes[i]}`
}

/**
 * Format date in relative format (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return diffMins === 0 ? 'just now' : `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 30) {
    return `${diffDays}d ago`
  } else {
    return date.toLocaleDateString()
  }
}
