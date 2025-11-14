import * as fs from 'fs-extra'
import { describe, it, beforeAll, beforeEach, expect } from 'vitest'
import { join } from 'path'
import { addPackages } from '../../src/commands/add'
import { updatePackages } from '../../src/commands/update'
import { publishPackage } from '../../src/commands/publish'
import { removePackages } from '../../src/commands/remove'
import { yalcGlobal, readPackageManifest } from '../../src/core/config/index'

import { readInstallationsFile } from '../../src/package/installations/installations'

import { readLockfile, LockFileConfigV1 } from '../../src/commands/lockfile'

const values = {
  depPackage: 'dep-package',
  depPackageVersion: '1.0.0',

  depPackage2: 'dep-package2',
  depPackage2Version: '1.0.0',
  storeDir: 'yalc-store',
  project: 'project',

  wksDepPkg: 'ws-package',
  wksResolvedVersion: '1.1.1',

  wksDepQualified: 'ws-package-qualified',
  wksPkgQualifiedVersion: '^1.0.0',

  wksDepMinorAlias: 'ws-package-minor-alias',
  wksMinorAliasVersion: '^1.0.1',

  wksDepPatchAlias: 'ws-package-patch-alias',
  wksPatchAliasVersion: '~1.2.3',

  wksUnresolvedPackage: 'ws-package-unresolvable',
  wksUnresolvedMinorAlias: 'ws-package-unresolvable-minor-alias',
  wksUnresolvedPatchAlias: 'ws-package-unresolvable-patch-alias',
}

const fixtureDir = join(__dirname, 'fixture')
const tmpDir = join(__dirname, 'tmp')

const shortSignatureLength = 8

const storeMainDr = join(tmpDir, values.storeDir)
yalcGlobal.yalcStoreMainDir = storeMainDr

const depPackageDir = join(tmpDir, values.depPackage)
const depPackage2Dir = join(tmpDir, values.depPackage2)
const projectDir = join(tmpDir, values.project)

const publishedPackagePath = join(
  storeMainDr,
  'packages',
  values.depPackage,
  values.depPackageVersion,
)

const publishedPackage2Path = join(
  storeMainDr,
  'packages',
  values.depPackage2,
  values.depPackage2Version,
)

const checkExists = (path: string) => {
  expect(() => fs.accessSync(path)).not.toThrow()
}

const checkNotExists = (path: string) => {
  expect(() => fs.accessSync(path)).toThrow()
}

const extractSignature = (lockfile: LockFileConfigV1, packageName: string) => {
  const packageEntry = lockfile.packages[packageName]
  if (packageEntry === undefined) {
    throw new Error(
      `expected package ${packageName} in lockfile.packages ${JSON.stringify(
        lockfile,
        undefined,
        2,
      )}`,
    )
  }

  const signature = packageEntry.signature
  if (signature === undefined) {
    throw new Error(
      `expected signature property in lockfile.packages.${packageName} ${JSON.stringify(
        lockfile,
        undefined,
        2,
      )}`,
    )
  }

  return signature
}

describe('Yalc package manager', () => {
  beforeAll(() => {
    fs.removeSync(tmpDir)
    fs.copySync(fixtureDir, tmpDir)
  })
  describe('Package publish', () => {
    beforeAll(async () => {
      console.time('Package publish')
      await publishPackage({
        workingDir: depPackageDir,
        signature: true,
        workspaceResolve: true,
      })
      console.timeEnd('Package publish')
    })

    it('publishes package to store', () => {
      checkExists(publishedPackagePath)
    })

    it('copies package.json npm includes', () => {
      checkExists(join(publishedPackagePath, 'package.json'))
    })

    it('ignores standard non-code', () => {
      checkNotExists(join(publishedPackagePath, 'extra-file.txt'))
    })

    it('ignores .gitignore', () => {
      checkNotExists(join(publishedPackagePath, '.gitignore'))
    })

    it('handles "files:" manifest entry correctly', () => {
      checkExists(join(publishedPackagePath, '.yalc/yalc.txt'))
      checkExists(join(publishedPackagePath, '.dot/dot.txt'))
      checkExists(join(publishedPackagePath, 'src'))
      checkExists(join(publishedPackagePath, 'dist/file.txt'))
      checkExists(join(publishedPackagePath, 'root-file.txt'))
      checkExists(join(publishedPackagePath, 'folder/file.txt'))
      checkNotExists(join(publishedPackagePath, 'folder/file2.txt'))
      checkExists(join(publishedPackagePath, 'folder2/nested/file.txt'))
      checkNotExists(join(publishedPackagePath, 'folder2/file.txt'))
      checkNotExists(join(publishedPackagePath, 'folder2/nested/file2.txt'))
      checkNotExists(join(publishedPackagePath, 'test'))
    })

    it('does not respect .npmignore, if package.json "files" present', () => {
      checkExists(join(publishedPackagePath, 'src', 'file-npm-ignored.txt'))
    })

    it('it creates signature file', () => {
      const sigFileName = join(publishedPackagePath, 'yalc.sig')
      checkExists(sigFileName)
      expect(fs.statSync(sigFileName).size).toBe(32)
    })

    it('Adds signature to package.json version', () => {
      const pkg = readPackageManifest(publishedPackagePath)!
      const versionLength =
        values.depPackageVersion.length + shortSignatureLength + 1
      expect(pkg.version.length).toBe(versionLength)
    })

    it('does not respect .gitignore, if .npmignore presents', () => {})

    describe('signature consistency', () => {
      let expectedSignature: string
      beforeAll(() => {
        expectedSignature = fs
          .readFileSync(join(publishedPackagePath, 'yalc.sig'))
          .toString()
      })

      beforeEach(async () => {
        await publishPackage({
          workingDir: depPackageDir,
          signature: true,
          workspaceResolve: true,
        })
      })

      for (let tries = 1; tries <= 5; tries++) {
        it(`should have a consistent signature after every publish (attempt ${tries})`, () => {
          const sigFileName = join(publishedPackagePath, 'yalc.sig')
          const signature = fs.readFileSync(sigFileName).toString()

          expect(signature).toEqual(expectedSignature)
        })
      }
    })

    it('resolves "workspace:*" for dependencies', () => {
      const pkg = readPackageManifest(publishedPackagePath)
      expect(pkg?.dependencies).toBeTruthy()

      const publishedVersion = pkg?.dependencies?.[values.wksDepPkg]

      expect(publishedVersion).toBe(values.wksResolvedVersion)
    })

    it('resolves "workspace:^" for dependencies', () => {
      const pkg = readPackageManifest(publishedPackagePath)
      expect(pkg?.dependencies).toBeTruthy()

      const publishedVersion = pkg?.dependencies?.[values.wksDepMinorAlias]

      expect(publishedVersion).toBe(values.wksMinorAliasVersion)
    })

    it('resolves "workspace:~" for dependencies', () => {
      const pkg = readPackageManifest(publishedPackagePath)
      expect(pkg?.dependencies).toBeTruthy()

      const publishedVersion = pkg?.dependencies?.[values.wksDepPatchAlias]

      expect(publishedVersion).toBe(values.wksPatchAliasVersion)
    })

    it('substitutes workspace version aliases ("*", "^", "~") with "*" if unresolvable', () => {
      const pkg = readPackageManifest(publishedPackagePath)
      expect(pkg).toBeTruthy()
      expect(pkg?.dependencies).toBeTruthy()

      const publishedVersion = pkg?.dependencies?.[values.wksUnresolvedPackage]
      expect(publishedVersion).toBe('*')

      const publishedMinorAliasVersion =
        pkg?.dependencies?.[values.wksUnresolvedMinorAlias]
      expect(publishedMinorAliasVersion).toBe('*')

      const publishedPatchAliasVersion =
        pkg?.dependencies?.[values.wksUnresolvedPatchAlias]
      expect(publishedPatchAliasVersion).toBe('*')
    })

    it('extracts version of workspace dependencies if specified', () => {
      const pkg = readPackageManifest(publishedPackagePath)
      expect(pkg).toBeTruthy()
      expect(pkg?.dependencies).toBeTruthy()

      const publishedVersion = pkg?.dependencies?.[values.wksDepQualified]
      expect(publishedVersion).toBe(values.wksPkgQualifiedVersion)
    })
  })

  describe('Package 2 (without `files` in manifest) publish', () => {
    const publishedFilePath = join(publishedPackage2Path, 'file.txt')

    const originalFilePath = join(depPackage2Dir, 'file.txt')
    beforeAll(async () => {
      console.time('Package2 publish')
      await publishPackage({
        workingDir: depPackage2Dir,
      })
      console.timeEnd('Package2 publish')
    })

    it('publishes package to store', () => {
      checkExists(publishedFilePath)
      checkExists(join(publishedPackage2Path, 'package.json'))
    })
  })

  describe('Add package', () => {
    beforeAll(async () => {
      await addPackages([values.depPackage], {
        workingDir: projectDir,
      })
    })
    it('copies package to .yalc folder', () => {
      checkExists(join(projectDir, '.yalc', values.depPackage))
    })
    it('copies remove package to node_modules', () => {
      checkExists(join(projectDir, 'node_modules', values.depPackage))
    })
    it('creates to yalc.lock', () => {
      checkExists(join(projectDir, 'yalc.lock'))
    })
    it('places yalc.lock correct info about file', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      expect(lockFile.packages).toEqual({
        [values.depPackage]: {
          file: true,
          replaced: '1.0.0',
          signature: extractSignature(lockFile, values.depPackage),
        },
      })
    })
    it('updates package.json', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.dependencies).toEqual({
        [values.depPackage]: 'file:.yalc/' + values.depPackage,
      })
    })
    it('create and updates installations file', () => {
      const installations = readInstallationsFile()
      expect(installations).toEqual({
        [values.depPackage]: [projectDir],
      })
    })
    it('preserves indent after installation', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.__Indent).toBe('  ')
    })
  })

  describe('Update package', () => {
    const innerNodeModulesFile = join(
      projectDir,
      'node_modules',
      values.depPackage,
      'node_modules/file.txt',
    )
    beforeAll(async () => {
      fs.ensureFileSync(innerNodeModulesFile)
      await updatePackages([values.depPackage], {
        workingDir: projectDir,
      })
    })

    it('does not change yalc.lock', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      console.log('lockFile', lockFile)
      expect(lockFile.packages).toEqual({
        [values.depPackage]: {
          file: true,
          replaced: '1.0.0',
          signature: extractSignature(lockFile, values.depPackage),
        },
      })
    })
    it('does not remove inner node_modules', () => {
      checkExists(innerNodeModulesFile)
    })
  })

  describe('Remove not existing package', () => {
    beforeAll(async () => {
      await removePackages(['xxxx'], {
        workingDir: projectDir,
      })
    })
    it('does not updates yalc.lock', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      expect(lockFile.packages).toEqual({
        [values.depPackage]: {
          file: true,
          replaced: '1.0.0',
          signature: extractSignature(lockFile, values.depPackage),
        },
      })
    })
  })

  describe('Retreat package', () => {
    beforeAll(async () => {
      await removePackages([values.depPackage], {
        workingDir: projectDir,
        retreat: true,
      })
    })

    it('does not updates yalc.lock', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      expect(lockFile.packages).toEqual({
        [values.depPackage]: {
          file: true,
          replaced: '1.0.0',
          signature: extractSignature(lockFile, values.depPackage),
        },
      })
    })

    it('updates package.json', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.dependencies).toEqual({
        [values.depPackage]: values.depPackageVersion,
      })
    })

    it('does not update installations file', () => {
      const installtions = readInstallationsFile()
      expect(installtions).toEqual({
        [values.depPackage]: [projectDir],
      })
    })

    it('should not remove package from .yalc', () => {
      checkExists(join(projectDir, '.yalc', values.depPackage))
    })

    it('should remove package from node_modules', () => {
      checkNotExists(join(projectDir, 'node_modules', values.depPackage))
    })
  })

  describe('Update (restore after retreat) package', () => {
    beforeAll(async () => {
      await updatePackages([values.depPackage], {
        workingDir: projectDir,
      })
    })

    it('updates package.json', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.dependencies).toEqual({
        [values.depPackage]: 'file:.yalc/' + values.depPackage,
      })
    })
  })

  describe('Remove package', () => {
    beforeAll(async () => {
      await removePackages([values.depPackage], {
        workingDir: projectDir,
      })
    })

    it('updates yalc.lock', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      expect(lockFile.packages).toEqual({})
    })

    it('updates package.json', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.dependencies).toEqual({
        [values.depPackage]: values.depPackageVersion,
      })
    })

    it('updates installations file', () => {
      const installtions = readInstallationsFile()
      expect(installtions).toEqual({})
    })
    it('should remove package from .yalc', () => {
      checkNotExists(join(projectDir, '.ylc', values.depPackage))
    })

    it('should remove package from node_modules', () => {
      checkNotExists(join(projectDir, 'node_modules', values.depPackage))
    })
  })

  describe('Add package (--link)', () => {
    beforeAll(async () => {
      await addPackages([values.depPackage], {
        workingDir: projectDir,
        linkDep: true,
      })
    })
    it('copies package to .yalc folder', () => {
      checkExists(join(projectDir, '.yalc', values.depPackage))
    })
    it('copies remove package to node_modules', () => {
      checkExists(join(projectDir, 'node_modules', values.depPackage))
    })
    it('creates to yalc.lock', () => {
      checkExists(join(projectDir, 'yalc.lock'))
    })
    it('places yalc.lock correct info about file', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      expect(lockFile.packages).toEqual({
        [values.depPackage]: {
          link: true,
          replaced: '1.0.0',
          signature: extractSignature(lockFile, values.depPackage),
        },
      })
    })
    it('updates package.json', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.dependencies).toEqual({
        [values.depPackage]: 'link:.yalc/' + values.depPackage,
      })
    })
    it('create and updates installations file', () => {
      const installtions = readInstallationsFile()
      expect(installtions).toEqual({
        [values.depPackage]: [projectDir],
      })
    })
  })

  describe('Updated linked (--link) package', () => {
    beforeAll(async () => {
      await updatePackages([values.depPackage], {
        workingDir: projectDir,
      })
    })
    it('places yalc.lock correct info about file', () => {
      const lockFile = readLockfile({ workingDir: projectDir })
      expect(lockFile.packages).toEqual({
        [values.depPackage]: {
          link: true,
          replaced: '1.0.0',
          signature: extractSignature(lockFile, values.depPackage),
        },
      })
    })
    it('updates package.json', () => {
      const pkg = readPackageManifest(projectDir)!
      expect(pkg.dependencies).toEqual({
        [values.depPackage]: 'link:.yalc/' + values.depPackage,
      })
    })
    it('create and updates installations file', () => {
      const installtions = readInstallationsFile()
      expect(installtions).toEqual({
        [values.depPackage]: [projectDir],
      })
    })
  })
})
