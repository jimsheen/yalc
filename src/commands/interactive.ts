/**
 * Interactive CLI mode for YALC
 */

import * as clack from '@clack/prompts'
import {
  listStorePackages,
  getStoreStats,
  formatSize,
  formatRelativeTime,
} from '../core/store/manager.js'
import { StorePackageInfo } from '../core/store/types.js'
import {
  getStoreMainDir,
  publishPackage,
  addPackages,
} from '../core/config/index.js'
import { spawn } from 'child_process'
import { readPackageManifest } from '../core/config/index.js'
import * as fs from 'fs-extra'

/**
 * Main interactive mode entry point
 */
export async function interactiveMode(): Promise<void> {
  clack.intro('📦 YALC Store Manager')

  try {
    let packages = listStorePackages()
    let stats = getStoreStats()

    // Show context information
    showProjectContext()
    showStoreOverview(packages, stats)

    // Main menu loop
    let shouldExit = false
    while (!shouldExit) {
      const action = await mainMenu(packages, stats)

      if (clack.isCancel(action)) {
        shouldExit = true
        continue
      }

      switch (action) {
        case 'publish':
          await interactivePublish()
          packages = listStorePackages()
          stats = getStoreStats()
          break

        case 'add':
          await interactiveAdd(packages)
          break

        case 'clean':
          await cleanUnusedPackages(packages)
          packages = listStorePackages()
          stats = getStoreStats()
          break

        case 'explore':
          await exploreStoreSubmenu(packages)
          break

        case 'manage':
          await manageStoreSubmenu(packages, stats)
          packages = listStorePackages()
          stats = getStoreStats()
          break

        case 'help':
          await helpSubmenu()
          break

        case 'exit':
          shouldExit = true
          break
      }
    }

    clack.outro('👋 Thanks for using YALC!')
  } catch (error) {
    clack.log.error('An error occurred in interactive mode')
    console.error(error)
    process.exit(1)
  }
}

/**
 * Clean unused packages from store
 */
async function cleanUnusedPackages(
  packages: StorePackageInfo[],
): Promise<void> {
  const unusedPackages = packages.filter(
    (pkg) => pkg.usedInProjects.length === 0,
  )

  if (unusedPackages.length === 0) {
    clack.note(
      'All packages in store are currently being used',
      '✅ Clean Store',
    )
    return
  }

  const totalUnusedSize = unusedPackages.reduce(
    (total, pkg) => total + pkg.size,
    0,
  )

  const shouldClean = await clack.confirm({
    message: `Remove ${unusedPackages.length} unused packages? (${formatSize(totalUnusedSize)} will be freed)`,
    initialValue: false,
  })

  if (clack.isCancel(shouldClean) || !shouldClean) {
    clack.note('Cleanup cancelled', '🚫 Cancelled')
    return
  }

  // Show packages to be removed
  const packagesToRemove = unusedPackages
    .map((pkg) => `${pkg.name}@${pkg.version} (${formatSize(pkg.size)})`)
    .join('\n')

  clack.note(
    packagesToRemove,
    `🗑️  Packages to remove (${unusedPackages.length})`,
  )

  // Actual cleanup implementation
  const spinner = clack.spinner()
  spinner.start('🧹 Removing unused packages...')

  try {
    let removedCount = 0
    let freedSize = 0

    for (const pkg of unusedPackages) {
      try {
        await fs.remove(pkg.storePath)
        removedCount++
        freedSize += pkg.size
        clack.log.info(`✅ Removed ${pkg.name}@${pkg.version}`)
      } catch {
        clack.log.warn(`⚠️  Failed to remove ${pkg.name}@${pkg.version}`)
      }
    }

    spinner.stop('✅ Cleanup completed!')
    clack.log.success(
      `🧹 Removed ${removedCount} packages, freed ${formatSize(freedSize)}`,
    )
  } catch (error) {
    spinner.stop('❌ Cleanup failed')
    clack.log.error('Failed to clean unused packages')
    console.error(error)
  }
}

/**
 * Show detailed package information
 */
async function showPackageInfo(packages: StorePackageInfo[]): Promise<void> {
  if (packages.length === 0) {
    clack.note('No packages found in store', '📦 Empty')
    return
  }

  const packageChoice = await clack.select({
    message: 'Select a package for detailed information:',
    options: packages.map((pkg) => ({
      value: pkg.name,
      label: `${pkg.name}@${pkg.version}`,
      hint: `${formatSize(pkg.size)} • ${formatRelativeTime(pkg.publishedAt)}`,
    })),
  })

  if (clack.isCancel(packageChoice)) {
    return
  }

  const selectedPackage = packages.find((pkg) => pkg.name === packageChoice)
  if (!selectedPackage) {
    clack.log.error('Package not found')
    return
  }

  // Format detailed package information
  const details = [
    `📦 Name: ${selectedPackage.name}`,
    `🏷️  Version: ${selectedPackage.version}`,
    `💾 Size: ${formatSize(selectedPackage.size)}`,
    `📅 Published: ${formatRelativeTime(selectedPackage.publishedAt)}`,
    `📂 Store path: ${selectedPackage.storePath}`,
    '',
    selectedPackage.usedInProjects.length > 0
      ? `🔗 Used in ${selectedPackage.usedInProjects.length} projects:\n${selectedPackage.usedInProjects.map((p) => `   • ${p}`).join('\n')}`
      : '⚠️ Not used in any projects',
  ].join('\n')

  clack.note(details, `📋 Package Information`)
}

/**
 * Show where a package is being used
 */
async function showPackageUsage(packages: StorePackageInfo[]): Promise<void> {
  if (packages.length === 0) {
    clack.note('No packages found in store', '📦 Empty')
    return
  }

  const packageChoice = await clack.select({
    message: 'Select a package to see its usage:',
    options: packages.map((pkg) => ({
      value: pkg.name,
      label: `${pkg.name}@${pkg.version}`,
      hint:
        pkg.usedInProjects.length > 0
          ? `🔗 ${pkg.usedInProjects.length} projects`
          : '⚠️ unused',
    })),
  })

  if (clack.isCancel(packageChoice)) {
    return
  }

  const selectedPackage = packages.find((pkg) => pkg.name === packageChoice)
  if (!selectedPackage) {
    clack.log.error('Package not found')
    return
  }

  if (selectedPackage.usedInProjects.length === 0) {
    clack.note(
      `Package ${selectedPackage.name}@${selectedPackage.version} is not used in any projects`,
      '⚠️ Unused Package',
    )
    return
  }

  const usageInfo = selectedPackage.usedInProjects
    .map((project) => `📂 ${project}`)
    .join('\n')

  clack.note(
    usageInfo,
    `📍 ${selectedPackage.name}@${selectedPackage.version} is used in ${selectedPackage.usedInProjects.length} projects`,
  )
}

/**
 * Show help information
 */
function showHelp(): void {
  const helpText = `
📦 YALC Commands:

Publishing:
  yalc publish          Publish package to local store
  yalc push             Publish and push to all installations

Managing packages:
  yalc add <package>    Add package from store to project
  yalc update [package] Update packages from store
  yalc remove <package> Remove packages from project

Store management:
  yalc list             List all packages in store
  yalc clean            Remove unused packages
  yalc info <package>   Show package details
  yalc where <package>  Show package usage

Other:
  yalc interactive      Launch this interactive mode
  yalc check            Check for yalc packages in project
  yalc dir              Show store directory path

For more detailed help on any command, use:
  yalc <command> --help
  `.trim()

  clack.note(helpText, '📖 YALC Help')
}

/**
 * Open store directory in file manager
 */
async function openStoreDirectory(): Promise<void> {
  const storeDir = getStoreMainDir()

  clack.note(`Store location: ${storeDir}`, '📂 Store Directory')

  const shouldOpen = await clack.confirm({
    message: 'Open store directory in file manager?',
    initialValue: true,
  })

  if (clack.isCancel(shouldOpen) || !shouldOpen) {
    return
  }

  try {
    // Cross-platform file manager opening
    const platform = process.platform
    let command: string
    let args: string[]

    if (platform === 'darwin') {
      command = 'open'
      args = [storeDir]
    } else if (platform === 'win32') {
      command = 'explorer'
      args = [storeDir]
    } else {
      command = 'xdg-open'
      args = [storeDir]
    }

    spawn(command, args, { detached: true, stdio: 'ignore' })
    clack.log.success('📂 Opened store directory in file manager')
  } catch {
    clack.log.error('Failed to open store directory')
    clack.note(`Please manually navigate to: ${storeDir}`, '📂 Store Path')
  }
}

/**
 * Interactive publish command
 */
async function interactivePublish(): Promise<void> {
  const workingDir = process.cwd()
  const pkg = readPackageManifest(workingDir)

  if (!pkg) {
    clack.log.error('No package.json found in current directory')
    return
  }

  clack.note(`📦 ${pkg.name}@${pkg.version}`, 'Publishing Package')

  const options = await clack.group(
    {
      sig: () =>
        clack.confirm({
          message: 'Generate integrity signature?',
          initialValue: false,
        }),

      scripts: () =>
        clack.confirm({
          message: 'Run lifecycle scripts?',
          initialValue: true,
        }),

      workspaceResolve: () =>
        clack.confirm({
          message: 'Resolve workspace dependencies?',
          initialValue: true,
        }),

      push: () =>
        clack.confirm({
          message: 'Push to all installations after publish?',
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        clack.cancel('Publish cancelled')
      },
    },
  )

  if (!options) return

  const spinner = clack.spinner()
  spinner.start('📦 Publishing package...')

  try {
    await publishPackage({
      workingDir,
      signature: options.sig,
      scripts: options.scripts,
      workspaceResolve: options.workspaceResolve,
      push: options.push,
    })

    spinner.stop('✅ Package published successfully!')
    clack.log.success(`📦 ${pkg.name}@${pkg.version} is now available in store`)
  } catch (error) {
    spinner.stop('❌ Publish failed')
    clack.log.error('Failed to publish package')
    console.error(error)
  }
}

/**
 * Interactive add command - calls the real add command with interactivity
 */
async function interactiveAdd(packages: StorePackageInfo[]): Promise<void> {
  if (packages.length === 0) {
    clack.note(
      'No packages found in store. Use `yalc publish` to add packages first.',
      '📦 Empty Store',
    )
    return
  }

  const workingDir = process.cwd()
  const pkg = readPackageManifest(workingDir)

  if (!pkg) {
    clack.log.error('No package.json found in current directory')
    clack.note(
      'You need to be in a project directory to add packages',
      '⚠️ Not a Package',
    )
    return
  }

  clack.note(`Adding packages to: ${pkg.name}`, '➕ Add Packages')

  // This will use the existing interactive selection from the add command
  const spinner = clack.spinner()
  spinner.start('🔄 Launching interactive package selector...')

  try {
    // Call the real add command with empty packages array to trigger interactive mode
    await addPackages([], { workingDir })
    spinner.stop('✅ Package addition completed')
  } catch (error) {
    spinner.stop('❌ Add packages failed')
    clack.log.error('Failed to add packages')
    console.error(error)
  }
}

/**
 * Show current project context
 */
function showProjectContext(): void {
  const workingDir = process.cwd()
  const pkg = readPackageManifest(workingDir)

  if (pkg) {
    const contextInfo = `📂 ${pkg.name}@${pkg.version}  •  ${workingDir}`
    clack.note(contextInfo, '🎯 Current Project')
  } else {
    clack.note(`📂 ${workingDir} (not a package)`, '⚠️ Current Directory')
  }
}

/**
 * Show store overview with enhanced context
 */
function showStoreOverview(packages: StorePackageInfo[], stats: any): void {
  if (packages.length === 0) {
    clack.note(
      'No packages found in store. Use `yalc publish` to add packages.',
      '📦 Empty Store',
    )
  } else {
    const storeOverview = [
      `📦 ${stats.totalPackages} packages`,
      `💾 ${formatSize(stats.totalSize)}`,
      stats.unusedPackages > 0 ? `⚠️  ${stats.unusedPackages} unused` : '',
      stats.lastActivity
        ? `🕒 Last activity: ${formatRelativeTime(stats.lastActivity)}`
        : '',
    ]
      .filter(Boolean)
      .join('  •  ')

    clack.note(storeOverview, '📊 Store Overview')
  }
}

/**
 * Main menu with improved hierarchy
 */
async function mainMenu(packages: StorePackageInfo[], stats: any) {
  const workingDir = process.cwd()
  const pkg = readPackageManifest(workingDir)
  const hasProject = !!pkg
  const hasPackages = packages.length > 0
  const hasUnused = stats.unusedPackages > 0

  return await clack.select({
    message: 'What would you like to do?',
    options: [
      // Quick Actions Section
      {
        value: 'publish',
        label: '📦 Publish current project',
        hint: hasProject
          ? `Publish ${pkg.name}@${pkg.version} to store`
          : 'No package.json found',
      },
      {
        value: 'add',
        label: '➕ Add packages to project',
        hint:
          hasProject && hasPackages
            ? `Add packages to ${pkg.name}`
            : !hasProject
              ? 'No project directory'
              : 'No packages available',
      },
      {
        value: 'clean',
        label: '🧹 Clean unused packages',
        hint: hasUnused
          ? `Remove ${stats.unusedPackages} unused packages (${formatSize(stats.totalSize - stats.usedSize || 0)} freed)`
          : 'No unused packages',
      },

      // Exploration Section
      {
        value: 'explore',
        label: '🔍 Explore store',
        hint: hasPackages
          ? `Browse, search, and get info on ${packages.length} packages`
          : 'No packages to explore',
      },

      // Management Section
      {
        value: 'manage',
        label: '🛠️ Manage store',
        hint: 'Store statistics, settings, and directory access',
      },

      // Help Section
      {
        value: 'help',
        label: '📖 Help & info',
        hint: 'Commands, quick start guide, and documentation',
      },

      {
        value: 'exit',
        label: '👋 Exit',
        hint: 'Return to command line',
      },
    ],
  })
}

/**
 * Explore store submenu
 */
async function exploreStoreSubmenu(
  packages: StorePackageInfo[],
): Promise<void> {
  if (packages.length === 0) {
    clack.note(
      'No packages found in store. Use `yalc publish` to add packages first.',
      '📦 Empty Store',
    )
    return
  }

  let shouldReturn = false
  while (!shouldReturn) {
    const action = await clack.select({
      message: '🔍 Explore Store',
      options: [
        {
          value: 'browse',
          label: '📋 Browse all packages',
          hint: `View and select from all ${packages.length} packages`,
        },
        {
          value: 'info',
          label: '🔍 Package details',
          hint: 'Get detailed information about a specific package',
        },
        {
          value: 'where',
          label: '📍 Find package usage',
          hint: 'See which projects use a specific package',
        },
        {
          value: 'back',
          label: '◀️ Back to main menu',
          hint: 'Return to main menu',
        },
      ],
    })

    if (clack.isCancel(action)) {
      shouldReturn = true
      continue
    }

    switch (action) {
      case 'browse':
        await browsePackagesEnhanced(packages)
        break
      case 'info':
        await showPackageInfo(packages)
        break
      case 'where':
        await showPackageUsage(packages)
        break
      case 'back':
        shouldReturn = true
        break
    }
  }
}

/**
 * Manage store submenu
 */
async function manageStoreSubmenu(
  packages: StorePackageInfo[],
  stats: any,
): Promise<void> {
  let shouldReturn = false
  while (!shouldReturn) {
    const action = await clack.select({
      message: '🛠️ Manage Store',
      options: [
        {
          value: 'stats',
          label: '📊 Store statistics',
          hint: 'Detailed breakdown of store contents and usage',
        },
        {
          value: 'directory',
          label: '📂 Open store directory',
          hint: 'Open store folder in file manager',
        },
        {
          value: 'back',
          label: '◀️ Back to main menu',
          hint: 'Return to main menu',
        },
      ],
    })

    if (clack.isCancel(action)) {
      shouldReturn = true
      continue
    }

    switch (action) {
      case 'stats':
        showStoreStatistics(packages, stats)
        break
      case 'directory':
        await openStoreDirectory()
        break
      case 'back':
        shouldReturn = true
        break
    }
  }
}

/**
 * Help submenu
 */
async function helpSubmenu(): Promise<void> {
  let shouldReturn = false
  while (!shouldReturn) {
    const action = await clack.select({
      message: '📖 Help & Info',
      options: [
        {
          value: 'commands',
          label: '📖 Command reference',
          hint: 'Complete list of all YALC commands',
        },
        {
          value: 'quickstart',
          label: '🚀 Quick start guide',
          hint: 'Step-by-step guide for new users',
        },
        {
          value: 'back',
          label: '◀️ Back to main menu',
          hint: 'Return to main menu',
        },
      ],
    })

    if (clack.isCancel(action)) {
      shouldReturn = true
      continue
    }

    switch (action) {
      case 'commands':
        showHelp()
        break
      case 'quickstart':
        showQuickStartGuide()
        break
      case 'back':
        shouldReturn = true
        break
    }
  }
}

/**
 * Enhanced browse packages with actions
 */
async function browsePackagesEnhanced(
  packages: StorePackageInfo[],
): Promise<void> {
  const packageOptions = packages.map((pkg) => ({
    value: pkg.name,
    label: `${pkg.name}@${pkg.version}`,
    hint: `${formatSize(pkg.size)} • ${formatRelativeTime(pkg.publishedAt)} • ${pkg.usedInProjects.length > 0 ? `🔗 ${pkg.usedInProjects.length} projects` : '⚠️ unused'}`,
  }))

  const selectedPackage = await clack.select({
    message: `📋 Select package (${packages.length} total)`,
    options: [
      ...packageOptions,
      {
        value: '__back__',
        label: '◀️ Back',
        hint: 'Return to explore menu',
      },
    ],
  })

  if (clack.isCancel(selectedPackage) || selectedPackage === '__back__') {
    return
  }

  const pkg = packages.find((p) => p.name === selectedPackage)
  if (pkg) {
    await packageActionMenu(pkg)
  }
}

/**
 * Package action menu after selecting a package
 */
async function packageActionMenu(pkg: StorePackageInfo): Promise<void> {
  const workingDir = process.cwd()
  const currentProject = readPackageManifest(workingDir)
  const canAdd = !!currentProject

  const action = await clack.select({
    message: `Actions for ${pkg.name}@${pkg.version}`,
    options: [
      {
        value: 'info',
        label: '🔍 Show details',
        hint: 'View complete package information',
      },
      {
        value: 'add',
        label: '➕ Add to current project',
        hint: canAdd ? `Add to ${currentProject.name}` : 'No project directory',
      },
      {
        value: 'usage',
        label: '📍 Show usage',
        hint:
          pkg.usedInProjects.length > 0
            ? `Used in ${pkg.usedInProjects.length} projects`
            : 'Not used anywhere',
      },
      {
        value: 'back',
        label: '◀️ Back to package list',
        hint: 'Return to package selection',
      },
    ],
  })

  if (clack.isCancel(action) || action === 'back') {
    return
  }

  switch (action) {
    case 'info':
      showPackageDetails(pkg)
      break
    case 'add':
      if (canAdd) {
        await addSinglePackage(pkg.name)
      }
      break
    case 'usage':
      showSinglePackageUsage(pkg)
      break
  }
}

/**
 * Show detailed package information for a single package
 */
function showPackageDetails(pkg: StorePackageInfo): void {
  const details = [
    `📦 Name: ${pkg.name}`,
    `🏷️  Version: ${pkg.version}`,
    `💾 Size: ${formatSize(pkg.size)}`,
    `📅 Published: ${formatRelativeTime(pkg.publishedAt)}`,
    `📂 Store path: ${pkg.storePath}`,
    '',
    pkg.usedInProjects.length > 0
      ? `🔗 Used in ${pkg.usedInProjects.length} projects:\n${pkg.usedInProjects.map((p) => `   • ${p}`).join('\n')}`
      : '⚠️ Not used in any projects',
  ].join('\n')

  clack.note(details, `📋 ${pkg.name}@${pkg.version}`)
}

/**
 * Show usage for a single package
 */
function showSinglePackageUsage(pkg: StorePackageInfo): void {
  if (pkg.usedInProjects.length === 0) {
    clack.note(
      `Package ${pkg.name}@${pkg.version} is not used in any projects`,
      '⚠️ Unused Package',
    )
    return
  }

  const usageInfo = pkg.usedInProjects
    .map((project) => `📂 ${project}`)
    .join('\n')

  clack.note(
    usageInfo,
    `📍 ${pkg.name}@${pkg.version} (${pkg.usedInProjects.length} projects)`,
  )
}

/**
 * Add a single package to current project
 */
async function addSinglePackage(packageName: string): Promise<void> {
  const spinner = clack.spinner()
  spinner.start(`Adding ${packageName}...`)

  try {
    await addPackages([packageName], { workingDir: process.cwd() })
    spinner.stop(`✅ Added ${packageName}`)
  } catch (error) {
    spinner.stop(`❌ Failed to add ${packageName}`)
    clack.log.error('Add failed')
    console.error(error)
  }
}

/**
 * Show store statistics
 */
function showStoreStatistics(packages: StorePackageInfo[], stats: any): void {
  const unusedPackages = packages.filter(
    (pkg) => pkg.usedInProjects.length === 0,
  )
  const usedPackages = packages.filter((pkg) => pkg.usedInProjects.length > 0)

  const statsInfo = [
    `📦 Total packages: ${stats.totalPackages}`,
    `💾 Total size: ${formatSize(stats.totalSize)}`,
    ``,
    `✅ Used packages: ${usedPackages.length}`,
    `⚠️  Unused packages: ${unusedPackages.length}`,
    `📊 Storage efficiency: ${Math.round((usedPackages.length / stats.totalPackages) * 100)}%`,
    ``,
    `📅 Last activity: ${stats.lastActivity ? formatRelativeTime(stats.lastActivity) : 'Never'}`,
    `📂 Store location: ${getStoreMainDir()}`,
  ].join('\n')

  clack.note(statsInfo, '📊 Store Statistics')
}

/**
 * Show quick start guide
 */
function showQuickStartGuide(): void {
  const guide = `
🚀 YALC Quick Start Guide:

1️⃣  Publish a package:
   cd your-package-directory
   yalc publish

2️⃣  Add package to another project:
   cd your-project-directory
   yalc add package-name

3️⃣  Update package after changes:
   cd your-package-directory
   yalc push

4️⃣  Remove package from project:
   cd your-project-directory
   yalc remove package-name

5️⃣  Clean unused packages:
   yalc clean

💡 Tips:
   • Use 'yalc interactive' for guided workflows
   • Use 'yalc list' to see all packages
   • Use 'yalc info <package>' for details
   `.trim()

  clack.note(guide, '🚀 Quick Start Guide')
}
