/**
 * Show where a package is being used
 */

import { listStorePackages } from '../core/store/manager.js'

/**
 * Show which projects are using a specific package
 */
export function showPackageUsage(packageName: string): void {
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

  if (pkg.usedInProjects.length === 0) {
    console.log('⚠️  This package is not used in any projects')
    console.log('💡 You can safely remove it with `yalc clean`')
    return
  }

  console.log(`🔗 Used in ${pkg.usedInProjects.length} projects:`)
  console.log('')

  pkg.usedInProjects.forEach((project) => {
    console.log(`  📂 ${project}`)
    // TODO: Show more details like version being used, dev/prod dependency
  })

  console.log('')
  console.log(
    '💡 Use `yalc remove <package>` in those projects to stop using this package',
  )
}
