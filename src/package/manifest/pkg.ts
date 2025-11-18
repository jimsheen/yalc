import * as fs from 'fs-extra'
import { join } from 'path'
import { PackageName } from '../installations/installations'
import detectIndent from 'detect-indent'

export type PackageScripts = Partial<{
  preinstall: string
  prepack: string
  postpack: string
  prepare: string
  install: string
  prepublish: string
  prepublishOnly: string
  publish: string
  postpublish: string
  preyalcpublish: string
  preyalc: string
  postyalcpublish: string
  postyalc: string
}>

export interface PackageManifest {
  name: string
  version: string
  yalcSig?: string
  private?: boolean
  bin?: string | { [name: string]: string }
  dependencies?: { [name: string]: string }
  devDependencies?: { [name: string]: string }
  peerDependencies?: { [name: string]: string }
  yalc: Partial<{
    sig: boolean
    signature: boolean
    noSig: boolean
  }>
  workspaces?: string[]
  scripts?: PackageScripts
  __Indent?: string
}

export const parsePackageName = (packageName: string) => {
  const match = packageName.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
  if (!match) {
    return { name: '' as PackageName, version: '' }
  }
  return {
    name: ((match[1] || '') + match[2]) as PackageName,
    version: match[3] || '',
  }
}

const getIndent = (jsonStr: string) => {
  return detectIndent(jsonStr).indent
}

export function readPackageManifest(workingDir: string) {
  let pkg: PackageManifest
  const packagePath = join(workingDir, 'package.json')
  try {
    const fileData = fs.readFileSync(packagePath, 'utf-8')
    pkg = JSON.parse(fileData) as PackageManifest

    // ✅ FIXED: Validate that BOTH name AND version are present and non-empty
    if (
      !pkg.name ||
      !pkg.version ||
      typeof pkg.name !== 'string' ||
      typeof pkg.version !== 'string'
    ) {
      console.error(
        `❌ Invalid package manifest at ${packagePath}:`,
        `Missing or invalid name (${pkg.name}) or version (${pkg.version})`,
      )
      console.error(
        '   Package must have both "name" and "version" fields as non-empty strings',
      )
      return null
    }

    const indent = getIndent(fileData) || '  '
    pkg.__Indent = indent
    return pkg
  } catch (error) {
    console.error(
      `❌ Could not read ${packagePath}:`,
      error instanceof Error ? error.message : error,
    )
    return null
  }
}

const sortDependencies = (dependencies: { [name: string]: string }) => {
  return Object.keys(dependencies)
    .sort()
    .reduce(
      (deps, key) => Object.assign(deps, { [key]: dependencies[key] }),
      {},
    )
}

export function writePackageManifest(workingDir: string, pkg: PackageManifest) {
  pkg = Object.assign({}, pkg)
  if (pkg.dependencies) {
    pkg.dependencies = sortDependencies(pkg.dependencies)
  }
  if (pkg.devDependencies) {
    pkg.devDependencies = sortDependencies(pkg.devDependencies)
  }
  const indent = pkg.__Indent
  delete pkg.__Indent
  const packagePath = join(workingDir, 'package.json')
  try {
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, indent) + '\n')
  } catch {
    console.error('Could not write ', packagePath)
  }
}
