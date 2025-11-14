/**
 * Show detailed package information
 */

import {
  listStorePackages,
  formatSize,
  formatRelativeTime,
} from '../core/store/manager.js'

/**
 * Show detailed information about a package
 */
export function showPackageInfo(packageName: string): void {
  const packages = listStorePackages()
  const pkg = packages.find((p) => p.name === packageName)

  if (!pkg) {
    console.log(`❌ Package '${packageName}' not found in store`)
    console.log('')
    console.log('Available packages:')
    packages.forEach((p) => {
      console.log(`  📦 ${p.name}@${p.version}`)
    })
    return
  }

  console.log(`📦 ${pkg.name}@${pkg.version}`)
  console.log('')
  console.log(`💾 Size: ${formatSize(pkg.size)}`)
  console.log(
    `📅 Published: ${formatRelativeTime(pkg.publishedAt)} (${pkg.publishedAt.toLocaleString()})`,
  )
  console.log(`📂 Store path: ${pkg.storePath}`)
  console.log('')

  if (pkg.usedInProjects.length > 0) {
    console.log(`🔗 Used in ${pkg.usedInProjects.length} projects:`)
    pkg.usedInProjects.forEach((project) => {
      console.log(`  📂 ${project}`)
    })
  } else {
    console.log('⚠️  Not used in any projects')
    console.log('💡 Run `yalc clean` to remove unused packages')
  }

  console.log('')

  // Show package.json details if available
  if (pkg.manifest) {
    console.log('📋 Package manifest:')

    if (pkg.manifest.description) {
      console.log(`   Description: ${pkg.manifest.description}`)
    }

    if (pkg.manifest.main) {
      console.log(`   Main: ${pkg.manifest.main}`)
    }

    if (
      pkg.manifest.dependencies &&
      Object.keys(pkg.manifest.dependencies).length > 0
    ) {
      const depCount = Object.keys(pkg.manifest.dependencies).length
      console.log(`   Dependencies: ${depCount} packages`)
    }

    if (
      pkg.manifest.devDependencies &&
      Object.keys(pkg.manifest.devDependencies).length > 0
    ) {
      const devDepCount = Object.keys(pkg.manifest.devDependencies).length
      console.log(`   Dev dependencies: ${devDepCount} packages`)
    }

    if (pkg.manifest.scripts && Object.keys(pkg.manifest.scripts).length > 0) {
      const scriptCount = Object.keys(pkg.manifest.scripts).length
      console.log(`   Scripts: ${scriptCount} available`)
    }
  }
}
