/**
 * List packages in YALC store
 */

import {
  listStorePackages,
  getStoreStats,
  formatSize,
  formatRelativeTime,
} from '../core/store/manager.js'

export interface ListCommandOptions {
  detailed?: boolean
  unused?: boolean
  json?: boolean
}

/**
 * List packages command handler
 */
export function listPackages(options: ListCommandOptions = {}): void {
  const packages = listStorePackages()

  if (packages.length === 0) {
    console.log('📦 No packages found in store')
    return
  }

  let filteredPackages = packages

  // Filter for unused packages if requested
  if (options.unused) {
    filteredPackages = packages.filter((pkg) => pkg.usedInProjects.length === 0)

    if (filteredPackages.length === 0) {
      console.log('✅ No unused packages found')
      return
    }
  }

  // JSON output
  if (options.json) {
    console.log(JSON.stringify(filteredPackages, null, 2))
    return
  }

  // Human-readable output
  const stats = getStoreStats()

  if (options.detailed) {
    // Detailed view
    console.log(
      `📦 YALC Store (${stats.totalPackages} packages, ${formatSize(stats.totalSize)})`,
    )
    console.log('')

    for (const pkg of filteredPackages) {
      const usageInfo =
        pkg.usedInProjects.length > 0
          ? `🔗 ${pkg.usedInProjects.length} projects`
          : '⚠️  unused'

      console.log(`📦 ${pkg.name}@${pkg.version}`)
      console.log(
        `   💾 ${formatSize(pkg.size)} • 📅 ${formatRelativeTime(pkg.publishedAt)} • ${usageInfo}`,
      )

      if (pkg.usedInProjects.length > 0) {
        console.log(`   📂 ${pkg.usedInProjects.join(', ')}`)
      }

      console.log('')
    }

    if (stats.unusedPackages > 0) {
      console.log(
        `💡 Tip: Run 'yalc clean' to remove ${stats.unusedPackages} unused packages`,
      )
    }
  } else {
    // Simple list view
    console.log(
      `📦 YALC Store - ${filteredPackages.length}${options.unused ? ' unused' : ''} packages`,
    )
    console.log('')

    for (const pkg of filteredPackages) {
      const usageIcon = pkg.usedInProjects.length > 0 ? '🔗' : '⚠️ '
      const sizeInfo = options.unused ? '' : ` (${formatSize(pkg.size)})`

      console.log(`  ${usageIcon} ${pkg.name}@${pkg.version}${sizeInfo}`)
    }

    if (!options.unused) {
      console.log('')
      console.log(
        `💾 Total: ${formatSize(stats.totalSize)} • ⚠️  ${stats.unusedPackages} unused`,
      )
      console.log(`💡 Use 'yalc list --detailed' for more information`)
    }
  }
}
