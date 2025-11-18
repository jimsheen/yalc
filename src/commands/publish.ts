import { execSync } from 'child_process'
import { join } from 'path'

import {
  execLoudOptions,
  getStorePackagesDir,
  updatePackages,
} from '../core/config/index'
import { PackageScripts, readPackageManifest } from '../package/manifest/pkg'
import { getPackageManager, pmRunScriptCmd } from '../package/manager/pm'
import { copyPackageToStore } from '../core/utils/copy'
import {
  PackageInstallation,
  readInstallationsFile,
  removeInstallations,
} from '../package/installations/installations'

export interface PublishPackageOptions {
  workingDir: string
  signature?: boolean
  changed?: boolean
  push?: boolean
  update?: boolean
  replace?: boolean
  npm?: boolean
  content?: boolean
  private?: boolean
  scripts?: boolean
  devMod?: boolean
  workspaceResolve?: boolean
}

export const publishPackage = async (options: PublishPackageOptions) => {
  const workingDir = options.workingDir
  const pkg = readPackageManifest(workingDir)
  if (!pkg) {
    console.error('❌ Cannot publish: Invalid or missing package.json')
    throw new Error('Package validation failed')
  }

  // ✅ ADDITIONAL VALIDATION: Double-check critical fields
  if (!pkg.name || !pkg.version) {
    console.error(`❌ Cannot publish: Package missing required fields`)
    console.error(`   name: ${pkg.name || 'MISSING'}`)
    console.error(`   version: ${pkg.version || 'MISSING'}`)
    throw new Error('Package validation failed')
  }

  console.log(`📦 Publishing ${pkg.name}@${pkg.version}...`)

  const pm = getPackageManager(workingDir)

  const runPmScript = (script: keyof PackageScripts) => {
    if (!options.scripts) return
    const scriptCmd = pkg.scripts?.[script]
    if (scriptCmd) {
      console.log(`Running ${script} script: ${scriptCmd}`)
      execSync(`${pmRunScriptCmd[pm]} ${script}`, {
        cwd: workingDir,
        ...execLoudOptions,
      })
    }
  }

  if (pkg.private && !options.private) {
    console.log(
      'Will not publish package with `private: true`' +
        ' use --private flag to force publishing.',
    )
    return
  }

  const preScripts: (keyof PackageScripts)[] = [
    'prepublish',
    'prepare',
    'prepublishOnly',
    'prepack',
    'preyalcpublish',
  ]
  preScripts.forEach(runPmScript)

  const copyRes = await copyPackageToStore(options)

  if (options.changed && !copyRes) {
    console.warn('Package content has not changed, skipping publishing.')
    return
  }

  const postScripts: (keyof PackageScripts)[] = [
    'postyalcpublish',
    'postpack',
    'publish',
    'postpublish',
  ]
  postScripts.forEach(runPmScript)

  const publishedPackageDir = join(getStorePackagesDir(), pkg.name, pkg.version)
  const publishedPkg = readPackageManifest(publishedPackageDir)
  if (publishedPkg) {
    console.log(
      `${publishedPkg.name}@${publishedPkg.version} published in store.`,
    )
  }

  if (options.push) {
    const installationsConfig = readInstallationsFile()
    const installationPaths = installationsConfig[pkg.name] || []
    const installationsToRemove: PackageInstallation[] = []
    for (const workingDir of installationPaths) {
      console.info(`Pushing ${pkg.name}@${pkg.version} in ${workingDir}`)
      const installationsToRemoveForPkg = await updatePackages([pkg.name], {
        replace: options.replace,
        workingDir,
        update: options.update,
        noInstallationsRemove: true,
      })
      installationsToRemove.push(...installationsToRemoveForPkg)
    }
    await removeInstallations(installationsToRemove)
  }
}
