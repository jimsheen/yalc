import type { ExecSyncOptions } from 'child_process'
import * as fs from 'fs-extra'
import { homedir } from 'os'
import { join } from 'path'

const userHome = homedir()

export const values = {
  myNameIs: 'yalc',
  ignoreFileName: '.yalcignore',
  myNameIsCapitalized: 'Yalc',
  lockfileName: 'yalc.lock',
  yalcPackagesFolder: '.yalc',
  prescript: 'preyalc',
  postscript: 'postyalc',
  installationsFile: 'installations.json',
}

export interface UpdatePackagesOptions {
  safe?: boolean
  workingDir: string
}

export { publishPackage } from '../../commands/publish'
export { updatePackages } from '../../commands/update'
export { checkManifest } from '../../commands/check'
export { removePackages } from '../../commands/remove'
export { addPackages } from '../../commands/add'
export * from '../../package/manifest/pkg'
export * from '../../package/manager/pm'

export interface YalcGlobal {
  yalcStoreMainDir: string
}
/* 
  Not using Node.Global because in this case 
  <reference types="mocha" /> is aded in built d.ts file  
*/
export const yalcGlobal: YalcGlobal = global as any

export function getStoreMainDir(): string {
  if (yalcGlobal.yalcStoreMainDir) {
    return yalcGlobal.yalcStoreMainDir
  }
  if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return join(process.env.LOCALAPPDATA, values.myNameIsCapitalized)
  }
  return join(userHome, '.' + values.myNameIs)
}

export function getStorePackagesDir(): string {
  return join(getStoreMainDir(), 'packages')
}

export const getPackageStoreDir = (packageName: string, version = '') =>
  join(getStorePackagesDir(), packageName, version)

export const execLoudOptions = { stdio: 'inherit' } as ExecSyncOptions

const signatureFileName = 'yalc.sig'

export const readSignatureFile = (workingDir: string) => {
  const signatureFilePath = join(workingDir, signatureFileName)
  try {
    const fileData = fs.readFileSync(signatureFilePath, 'utf-8')
    return fileData
  } catch {
    return ''
  }
}

export const readIgnoreFile = (workingDir: string) => {
  const filePath = join(workingDir, values.ignoreFileName)
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8')
    return fileData
  } catch {
    return ''
  }
}

export const writeSignatureFile = (workingDir: string, signature: string) => {
  const signatureFilePath = join(workingDir, signatureFileName)
  try {
    fs.writeFileSync(signatureFilePath, signature)
  } catch (error) {
    console.error('Could not write signature file')
    throw error
  }
}
