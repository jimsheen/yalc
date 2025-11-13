import { ExecSyncOptions } from 'child_process'

interface PublishPackageOptions {
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
declare const publishPackage: (options: PublishPackageOptions) => Promise<void>

type PackageName = string & {
  __packageName: true
}
type PackageInstallation = {
  name: PackageName
  path: string
}

interface UpdatePackagesOptions$1 {
  workingDir: string
  noInstallationsRemove?: boolean
  replace?: boolean
  update?: boolean
  restore?: boolean
}
declare const updatePackages: (
  packages: string[],
  options: UpdatePackagesOptions$1
) => Promise<PackageInstallation[]>

type CheckOptions = {
  workingDir: string
  all?: boolean
  commit?: boolean
}
declare function checkManifest(options: CheckOptions): void

interface RemovePackagesOptions {
  all?: boolean
  retreat?: boolean
  workingDir: string
}
declare const removePackages: (
  packages: string[],
  options: RemovePackagesOptions
) => Promise<void>

interface AddPackagesOptions {
  dev?: boolean
  link?: boolean
  linkDep?: boolean
  replace?: boolean
  update?: boolean
  safe?: boolean
  pure?: boolean
  restore?: boolean
  workspace?: boolean
  workingDir: string
}
declare const addPackages: (
  packages: string[],
  options: AddPackagesOptions
) => Promise<void>

type PackageScripts = Partial<{
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
interface PackageManifest {
  name: string
  version: string
  yalcSig?: string
  private?: boolean
  bin?:
    | string
    | {
        [name: string]: string
      }
  dependencies?: {
    [name: string]: string
  }
  devDependencies?: {
    [name: string]: string
  }
  peerDependencies?: {
    [name: string]: string
  }
  yalc: Partial<{
    sig: boolean
    signature: boolean
    noSig: boolean
  }>
  workspaces?: string[]
  scripts?: PackageScripts
  __Indent?: string
}
declare const parsePackageName: (packageName: string) => {
  name: PackageName
  version: string
}
declare function readPackageManifest(workingDir: string): PackageManifest | null
declare function writePackageManifest(
  workingDir: string,
  pkg: PackageManifest
): void

type PackageMangerName = 'yarn' | 'npm' | 'pnpm'
declare const pmMarkFiles: {
  [P in PackageMangerName]: string[]
}
declare const pmInstallCmd: {
  [P in PackageMangerName]: string
}
declare const pmUpdateCmd: {
  [P in PackageMangerName]: string
}
declare const pmRunScriptCmd: {
  [P in PackageMangerName]: string
}
declare const getPackageManager: (cwd: string) => PackageMangerName
declare const getRunScriptCmd: (cwd: string) => string
declare const getPackageManagerInstallCmd: (cwd: string) => string
declare const getPackageManagerUpdateCmd: (cwd: string) => string
declare const isYarn: (cwd: string) => boolean
declare const runPmUpdate: (workingDir: string, packages: string[]) => void

declare const values: {
  myNameIs: string
  ignoreFileName: string
  myNameIsCapitalized: string
  lockfileName: string
  yalcPackagesFolder: string
  prescript: string
  postscript: string
  installationsFile: string
}
interface UpdatePackagesOptions {
  safe?: boolean
  workingDir: string
}

interface YalcGlobal {
  yalcStoreMainDir: string
}
declare const yalcGlobal: YalcGlobal
declare function getStoreMainDir(): string
declare function getStorePackagesDir(): string
declare const getPackageStoreDir: (
  packageName: string,
  version?: string
) => string
declare const execLoudOptions: ExecSyncOptions
declare const readSignatureFile: (workingDir: string) => string
declare const readIgnoreFile: (workingDir: string) => string
declare const writeSignatureFile: (
  workingDir: string,
  signature: string
) => void

export {
  type PackageManifest,
  type PackageScripts,
  type UpdatePackagesOptions,
  type YalcGlobal,
  addPackages,
  checkManifest,
  execLoudOptions,
  getPackageManager,
  getPackageManagerInstallCmd,
  getPackageManagerUpdateCmd,
  getPackageStoreDir,
  getRunScriptCmd,
  getStoreMainDir,
  getStorePackagesDir,
  isYarn,
  parsePackageName,
  pmInstallCmd,
  pmMarkFiles,
  pmRunScriptCmd,
  pmUpdateCmd,
  publishPackage,
  readIgnoreFile,
  readPackageManifest,
  readSignatureFile,
  removePackages,
  runPmUpdate,
  updatePackages,
  values,
  writePackageManifest,
  writeSignatureFile,
  yalcGlobal,
}
