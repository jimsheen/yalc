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
    const stats = getStoreStats()

    // Show store overview
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

    // Main menu loop
    let shouldExit = false
    while (!shouldExit) {
      const action = await clack.select({
        message: 'What would you like to do?',
        options: [
          {
            value: 'publish',
            label: '📦 Publish package',
            hint: 'Publish current project to local store',
          },
          {
            value: 'add',
            label: '➕ Add packages',
            hint:
              packages.length > 0
                ? `Add packages from store to current project`
                : 'No packages available to add',
          },
          {
            value: 'list',
            label: '📋 Browse packages',
            hint:
              packages.length > 0
                ? `View all ${packages.length} packages in store`
                : 'No packages in store',
          },
          {
            value: 'clean',
            label: '🧹 Clean unused packages',
            hint:
              stats.unusedPackages > 0
                ? `Remove ${stats.unusedPackages} unused packages`
                : 'No unused packages to clean',
          },
          {
            value: 'info',
            label: '🔍 Package details',
            hint:
              packages.length > 0
                ? 'Get detailed information about a package'
                : 'No packages available',
          },
          {
            value: 'where',
            label: '📍 Find package usage',
            hint:
              packages.length > 0
                ? 'See which projects use a package'
                : 'No packages available',
          },
          {
            value: 'help',
            label: '📖 Show help',
            hint: 'View all available yalc commands',
          },
          {
            value: 'store',
            label: '📂 Open store directory',
            hint: 'Open store folder in file manager',
          },
          {
            value: 'exit',
            label: '👋 Exit',
            hint: 'Return to command line',
          },
        ],
      })

      if (clack.isCancel(action)) {
        shouldExit = true
        continue
      }

      switch (action) {
        case 'publish':
          await interactivePublish()
          // Refresh packages after publish
          packages = listStorePackages()
          break

        case 'add':
          await interactiveAdd(packages)
          break

        case 'list':
          await browsePackages(packages)
          break

        case 'clean':
          await cleanUnusedPackages(packages)
          // Refresh packages after cleanup
          packages = listStorePackages()
          break

        case 'info':
          await showPackageInfo(packages)
          break

        case 'where':
          await showPackageUsage(packages)
          break

        case 'help':
          await showHelp()
          break

        case 'store':
          await openStoreDirectory()
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
 * Browse packages in store with pagination
 */
async function browsePackages(packages: StorePackageInfo[]): Promise<void> {
  if (packages.length === 0) {
    clack.note('No packages found in store', '📦 Empty')
    return
  }

  // Format packages for display
  const packageOptions = packages.map((pkg) => ({
    value: pkg.name,
    label: `${pkg.name}@${pkg.version}`,
    hint: `${formatSize(pkg.size)} • ${formatRelativeTime(pkg.publishedAt)} • ${pkg.usedInProjects.length > 0 ? `🔗 ${pkg.usedInProjects.length} projects` : '⚠️ unused'}`,
  }))

  await clack.select({
    message: `📋 Browse packages (${packages.length} total)`,
    options: packageOptions,
  })
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
      } catch (error) {
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
async function showHelp(): Promise<void> {
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
  } catch (error) {
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
