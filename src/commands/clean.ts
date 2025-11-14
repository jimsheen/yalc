/**
 * Clean unused packages from YALC store
 */

import { rmSync } from 'fs'
import { getUnusedPackages, formatSize } from '../core/store/manager.js'

export interface CleanCommandOptions {
  unused?: boolean
  old?: boolean
  dryRun?: boolean
}

/**
 * Clean packages from store
 */
export function cleanPackages(options: CleanCommandOptions = {}): void {
  if (options.old) {
    // TODO: Implement cleaning old versions
    console.log('🚧 Cleaning old versions not yet implemented')
    return
  }

  // Default to cleaning unused packages
  if (!options.unused) {
    options.unused = true
  }

  if (options.unused) {
    cleanUnusedPackages(options.dryRun || false)
  }
}

/**
 * Clean unused packages from store
 */
function cleanUnusedPackages(dryRun: boolean): void {
  const unusedPackages = getUnusedPackages()

  if (unusedPackages.length === 0) {
    console.log('✅ No unused packages found in store')
    return
  }

  const totalSize = unusedPackages.reduce((sum, pkg) => sum + pkg.size, 0)

  console.log(
    `🗑️  Found ${unusedPackages.length} unused packages (${formatSize(totalSize)})`,
  )
  console.log('')

  unusedPackages.forEach((pkg) => {
    console.log(`  📦 ${pkg.name}@${pkg.version} (${formatSize(pkg.size)})`)
  })

  console.log('')

  if (dryRun) {
    console.log('🔍 Dry run - no packages were removed')
    console.log(`💡 Run 'yalc clean' to actually remove these packages`)
    return
  }

  // Remove unused packages
  let removedCount = 0
  let removedSize = 0

  for (const pkg of unusedPackages) {
    try {
      rmSync(pkg.storePath, { recursive: true, force: true })
      removedCount++
      removedSize += pkg.size
      console.log(`✅ Removed ${pkg.name}@${pkg.version}`)
    } catch (error) {
      console.log(`❌ Failed to remove ${pkg.name}@${pkg.version}: ${error}`)
    }
  }

  console.log('')
  console.log(
    `🎉 Cleaned ${removedCount} packages, freed ${formatSize(removedSize)}`,
  )

  if (removedCount < unusedPackages.length) {
    const failed = unusedPackages.length - removedCount
    console.log(`⚠️  ${failed} packages could not be removed`)
  }
}
