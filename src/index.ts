// YALC - Yet Another Local Cache
// Main library exports

// Export command functions
export { addPackages } from './commands/add'
export { publishPackage } from './commands/publish'
export { removePackages } from './commands/remove'
export { updatePackages } from './commands/update'
export { checkManifest } from './commands/check'

// Export core configuration and utilities
export {
  execLoudOptions,
  getPackageStoreDir,
  getStoreMainDir,
  getStorePackagesDir,
  parsePackageName,
  readIgnoreFile,
  readPackageManifest,
  readSignatureFile,
  runPmUpdate,
  values,
  writePackageManifest,
  writeSignatureFile,
  yalcGlobal,
} from './core/config/index'

// Export package manager utilities
export {
  getPackageManager,
  getPackageManagerInstallCmd,
  getPackageManagerUpdateCmd,
  getRunScriptCmd,
  isYarn,
  pmInstallCmd,
  pmMarkFiles,
  pmRunScriptCmd,
  pmUpdateCmd,
} from './package/manager/pm'

// Export types
export type { PackageManifest, PackageScripts } from './package/manifest/pkg'

export type { UpdatePackagesOptions } from './commands/update'
export type { YalcGlobal } from './core/config/index'
