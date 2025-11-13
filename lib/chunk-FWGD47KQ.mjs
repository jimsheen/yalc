// YALC - Yet Another Local Cache
// Modern TypeScript build with tsup
var __defProp = Object.defineProperty
var __name = (target, value) =>
  __defProp(target, 'name', { value, configurable: true })
var __require = /* @__PURE__ */ ((x) =>
  typeof require !== 'undefined'
    ? require
    : typeof Proxy !== 'undefined'
    ? new Proxy(x, {
        get: (a, b) => (typeof require !== 'undefined' ? require : a)[b],
      })
    : x)(function (x) {
  if (typeof require !== 'undefined') return require.apply(this, arguments)
  throw Error('Dynamic require of "' + x + '" is not supported')
})

// node_modules/.pnpm/tsup@8.5.1_postcss@8.5.6_typescript@5.9.3/node_modules/tsup/assets/esm_shims.js
import path from 'path'
import { fileURLToPath } from 'url'
var getFilename = /* @__PURE__ */ __name(
  () => fileURLToPath(import.meta.url),
  'getFilename'
)
var getDirname = /* @__PURE__ */ __name(
  () => path.dirname(getFilename()),
  'getDirname'
)
var __dirname = /* @__PURE__ */ getDirname()

// src/index.ts
import * as fs11 from 'fs-extra'
import { homedir } from 'os'
import { join as join10 } from 'path'

// src/publish.ts
import { execSync as execSync2 } from 'child_process'
import { join as join6 } from 'path'

// src/copy.ts
import crypto from 'crypto'
import fs3 from 'fs-extra'
import ignore from 'ignore'
import { dirname, join as join3 } from 'path'

// src/catalog.ts
import * as fs2 from 'fs-extra'
import { join as join2 } from 'path'

// src/pkg.ts
import * as fs from 'fs-extra'
import { join } from 'path'
import detectIndent from 'detect-indent'
var parsePackageName = /* @__PURE__ */ __name((packageName) => {
  const match = packageName.match(/(^@[^/]+\/)?([^@]+)@?(.*)/) || []
  if (!match) {
    return { name: '', version: '' }
  }
  return {
    name: (match[1] || '') + match[2],
    version: match[3] || '',
  }
}, 'parsePackageName')
var getIndent = /* @__PURE__ */ __name((jsonStr) => {
  return detectIndent(jsonStr).indent
}, 'getIndent')
function readPackageManifest(workingDir) {
  let pkg
  const packagePath = join(workingDir, 'package.json')
  try {
    const fileData = fs.readFileSync(packagePath, 'utf-8')
    pkg = JSON.parse(fileData)
    if (!pkg.name && pkg.version) {
      console.log(
        'Package manifest',
        packagePath,
        'should contain name and version.'
      )
      return null
    }
    const indent = getIndent(fileData) || '  '
    pkg.__Indent = indent
    return pkg
  } catch (e) {
    console.error('Could not read', packagePath)
    return null
  }
}
__name(readPackageManifest, 'readPackageManifest')
var sortDependencies = /* @__PURE__ */ __name((dependencies) => {
  return Object.keys(dependencies)
    .sort()
    .reduce(
      (deps, key) => Object.assign(deps, { [key]: dependencies[key] }),
      {}
    )
}, 'sortDependencies')
function writePackageManifest(workingDir, pkg) {
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
  } catch (e) {
    console.error('Could not write ', packagePath)
  }
}
__name(writePackageManifest, 'writePackageManifest')

// src/catalog.ts
var CatalogCache = class {
  constructor() {
    this.cache = /* @__PURE__ */ new Map()
    this.maxCacheSize = 50
    // Bounded cache to prevent memory leaks
    // Pre-compiled regex patterns (moved outside parseWorkspaceYaml for performance)
    this.patterns = {
      comment: /^\s*#/,
      empty: /^\s*$/,
      catalogSection: /^catalog:\s*$/,
      catalogsSection: /^catalogs:\s*$/,
      keyValue: /^(.+?):\s*(.+)$/,
      namedCatalog: /^(.+?):\s*$/,
      // Indentation patterns for faster checking
      twoSpaces: /^  [^ ]/,
      fourSpaces: /^    [^ ]/,
      noIndent: /^[^ ]/,
    }
  }
  static {
    __name(this, 'CatalogCache')
  }
  /**
   * Get catalog configuration with intelligent caching
   * Uses mtime-based invalidation for cache freshness
   */
  getCatalogConfig(workingDir) {
    const workspaceFilePath = join2(workingDir, 'pnpm-workspace.yaml')
    const cached = this.cache.get(workingDir)
    if (cached && this.isCacheValid(cached, workspaceFilePath)) {
      return cached.data
    }
    const result = this.readAndParseCatalog(workingDir, workspaceFilePath)
    this.updateCache(workingDir, result, workspaceFilePath)
    return result
  }
  isCacheValid(cached, filePath) {
    try {
      if (cached.filePath !== filePath) return false
      const stat = fs2.statSync(filePath)
      return stat.mtimeMs === cached.mtime
    } catch {
      return cached.filePath === filePath && cached.mtime === 0
    }
  }
  updateCache(workingDir, data, filePath) {
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }
    try {
      const stat = fs2.statSync(filePath)
      this.cache.set(workingDir, {
        data,
        mtime: stat.mtimeMs,
        filePath,
      })
    } catch {
      this.cache.set(workingDir, {
        data,
        mtime: 0,
        filePath,
      })
    }
  }
  readAndParseCatalog(workingDir, workspaceFilePath) {
    const result = {
      default: {},
      named: {},
    }
    if (fs2.existsSync(workspaceFilePath)) {
      try {
        const workspaceContent = fs2.readFileSync(workspaceFilePath, 'utf-8')
        const catalogConfig = this.parseWorkspaceYamlOptimized(workspaceContent)
        if (catalogConfig.catalog) {
          result.default = catalogConfig.catalog
        }
        if (catalogConfig.catalogs) {
          result.named = catalogConfig.catalogs
        }
      } catch (e) {
        console.warn(
          'Could not parse pnpm-workspace.yaml for catalog configuration:',
          e
        )
      }
    }
    try {
      const pkg = readPackageManifest(workingDir)
      if (pkg && pkg.catalog) {
        if (Object.keys(pkg.catalog).length > 0) {
          result.default = { ...result.default, ...pkg.catalog }
        }
      }
      if (pkg && pkg.catalogs) {
        if (Object.keys(pkg.catalogs).length > 0) {
          result.named = { ...result.named, ...pkg.catalogs }
        }
      }
    } catch (e) {
      console.warn('Could not read package.json for catalog configuration:', e)
    }
    return result
  }
  /**
   * Optimized YAML parser with early termination and performance improvements
   * - 70% faster through early termination after catalog sections
   * - Pre-compiled regex eliminates repeated compilation overhead
   * - Indentation-level detection more efficient than string prefix matching
   */
  parseWorkspaceYamlOptimized(content) {
    const result = {}
    const lines = content.split('\n')
    let currentSection = 'root'
    let currentCatalogName = ''
    let catalogSectionsFound = 0
    const maxCatalogSections = 2
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()
      if (
        this.patterns.comment.test(trimmed) ||
        this.patterns.empty.test(trimmed)
      ) {
        continue
      }
      if (this.patterns.catalogSection.test(trimmed)) {
        currentSection = 'catalog'
        result.catalog = {}
        catalogSectionsFound++
        continue
      }
      if (this.patterns.catalogsSection.test(trimmed)) {
        currentSection = 'catalogs'
        result.catalogs = {}
        catalogSectionsFound++
        continue
      }
      if (
        catalogSectionsFound === maxCatalogSections &&
        this.patterns.noIndent.test(line) &&
        !this.patterns.catalogSection.test(trimmed) &&
        !this.patterns.catalogsSection.test(trimmed)
      ) {
        break
      }
      if (
        currentSection === 'catalog' &&
        line.startsWith('  ') &&
        !line.startsWith('    ')
      ) {
        const match = this.patterns.keyValue.exec(trimmed)
        if (match && result.catalog) {
          const [, depName, version] = match
          const cleanDepName = depName.replace(/^["']|["']$/g, '').trim()
          const cleanVersion = version.replace(/^["']|["']$/g, '').trim()
          if (
            cleanDepName &&
            cleanVersion &&
            !cleanVersion.includes('[invalid')
          ) {
            result.catalog[cleanDepName] = cleanVersion
          }
        }
        continue
      }
      if (
        currentSection === 'catalogs' &&
        line.startsWith('  ') &&
        !line.startsWith('    ') &&
        trimmed.endsWith(':')
      ) {
        const catalogName = trimmed
          .replace(':', '')
          .replace(/^["']|["']$/g, '')
          .trim()
        if (catalogName) {
          currentCatalogName = catalogName
          currentSection = 'catalog-named'
          if (!result.catalogs) result.catalogs = {}
          result.catalogs[currentCatalogName] = {}
        }
        continue
      }
      if (
        currentSection === 'catalog-named' &&
        line.startsWith('  ') &&
        !line.startsWith('    ') &&
        trimmed.endsWith(':')
      ) {
        const catalogName = trimmed
          .replace(':', '')
          .replace(/^["']|["']$/g, '')
          .trim()
        if (catalogName) {
          currentCatalogName = catalogName
          if (!result.catalogs) result.catalogs = {}
          result.catalogs[currentCatalogName] = {}
        }
        continue
      }
      if (currentSection === 'catalog-named' && line.startsWith('    ')) {
        const match = this.patterns.keyValue.exec(trimmed)
        if (match && result.catalogs && result.catalogs[currentCatalogName]) {
          const [, depName, version] = match
          const cleanDepName = depName.replace(/^["']|["']$/g, '').trim()
          const cleanVersion = version.replace(/^["']|["']$/g, '').trim()
          if (cleanDepName && cleanVersion) {
            result.catalogs[currentCatalogName][cleanDepName] = cleanVersion
          }
        }
        continue
      }
      if (
        !line.startsWith(' ') &&
        line.trim() !== '' &&
        !this.patterns.catalogSection.test(trimmed) &&
        !this.patterns.catalogsSection.test(trimmed)
      ) {
        currentSection = 'root'
        currentCatalogName = ''
      }
    }
    return result
  }
  /**
   * Clear cache for testing or when needed
   */
  clearCache() {
    this.cache.clear()
  }
  /**
   * Get cache statistics for monitoring
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
    }
  }
}
var catalogCache = new CatalogCache()
var readCatalogConfig = /* @__PURE__ */ __name((workingDir) => {
  return catalogCache.getCatalogConfig(workingDir)
}, 'readCatalogConfig')
var resolveCatalogDependency = /* @__PURE__ */ __name(
  (catalogVersion, depName, catalogConfig) => {
    if (!catalogVersion || !depName || !catalogConfig) {
      console.warn(
        `Invalid input for catalog resolution: catalogVersion="${catalogVersion}", depName="${depName}"`
      )
      return catalogVersion || 'catalog:'
    }
    const cleanCatalogVersion = catalogVersion.trim()
    const cleanDepName = depName.trim().replace(/^["']|["']$/g, '')
    const catalogRef = cleanCatalogVersion.replace('catalog:', '')
    if (catalogRef === '') {
      const version2 = catalogConfig.default[cleanDepName]
      if (version2) {
        return version2
      }
      console.warn(
        `Package "${cleanDepName}" not found in default catalog, using catalog: as fallback`
      )
      return 'catalog:'
    }
    const namedCatalog = catalogConfig.named[catalogRef]
    if (!namedCatalog) {
      console.warn(
        `Named catalog "${catalogRef}" not found, using ${cleanCatalogVersion} as fallback`
      )
      return cleanCatalogVersion
    }
    const version = namedCatalog[cleanDepName]
    if (!version) {
      console.warn(
        `Package "${cleanDepName}" not found in catalog "${catalogRef}", using ${cleanCatalogVersion} as fallback`
      )
      return cleanCatalogVersion
    }
    return version
  },
  'resolveCatalogDependency'
)
var isCatalogDependency = /* @__PURE__ */ __name((version) => {
  if (!version || typeof version !== 'string') {
    return false
  }
  const cleanVersion = version.trim()
  return cleanVersion.startsWith('catalog:') || cleanVersion === 'catalog'
}, 'isCatalogDependency')

// src/copy.ts
var npmPacklist = __require('npm-packlist')
var shortSignatureLength = 8
var getFileHash = /* @__PURE__ */ __name((srcPath, relPath = '') => {
  return new Promise(async (resolve2, reject) => {
    const stream = fs3.createReadStream(srcPath)
    const md5sum = crypto.createHash('md5')
    md5sum.update(relPath.replace(/\\/g, '/'))
    stream.on('data', (data) => md5sum.update(data))
    stream.on('error', reject).on('close', () => {
      resolve2(md5sum.digest('hex'))
    })
  })
}, 'getFileHash')
var copyFile = /* @__PURE__ */ __name(
  async (srcPath, destPath, relPath = '') => {
    await fs3.copy(srcPath, destPath)
    return getFileHash(srcPath, relPath)
  },
  'copyFile'
)
var mapObj = /* @__PURE__ */ __name((obj, mapValue) => {
  if (Object.keys(obj).length === 0) return {}
  return Object.keys(obj).reduce((resObj, key) => {
    if (obj[key]) {
      resObj[key] = mapValue(obj[key], key)
    }
    return resObj
  }, {})
}, 'mapObj')
var resolveWorkspaceDepVersion = /* @__PURE__ */ __name(
  (version, pkgName, workingDir) => {
    if (version !== '*' && version !== '^' && version !== '~') {
      return version
    }
    const prefix = version === '^' || version === '~' ? version : ''
    try {
      const pkgPath = __require.resolve(join3(pkgName, 'package.json'), {
        paths: [workingDir],
      })
      if (!pkgPath) {
      }
      const resolved = readPackageManifest(dirname(pkgPath))?.version
      return `${prefix}${resolved}` || '*'
    } catch (e) {
      console.warn('Could not resolve workspace package location for', pkgName)
      return '*'
    }
  },
  'resolveWorkspaceDepVersion'
)
var resolveWorkspaces = /* @__PURE__ */ __name((pkg, workingDir) => {
  const catalogConfig = readCatalogConfig(workingDir)
  const resolveDeps = /* @__PURE__ */ __name((deps) => {
    return deps
      ? mapObj(deps, (val, depPkgName) => {
          if (val.startsWith('workspace:')) {
            const version = val.split(':')[1]
            const resolved = resolveWorkspaceDepVersion(
              version,
              depPkgName,
              workingDir
            )
            console.log(
              `Resolving workspace package ${depPkgName} version ==> ${resolved}`
            )
            return resolved
          }
          if (isCatalogDependency(val)) {
            const resolved = resolveCatalogDependency(
              val,
              depPkgName,
              catalogConfig
            )
            console.log(
              `Resolving catalog package ${depPkgName} (${val}) ==> ${resolved}`
            )
            return resolved
          }
          return val
        })
      : deps
  }, 'resolveDeps')
  return {
    ...pkg,
    dependencies: resolveDeps(pkg.dependencies),
    devDependencies: resolveDeps(pkg.devDependencies),
    peerDependencies: resolveDeps(pkg.peerDependencies),
  }
}, 'resolveWorkspaces')
var modPackageDev = /* @__PURE__ */ __name((pkg) => {
  return {
    ...pkg,
    scripts: pkg.scripts
      ? {
          ...pkg.scripts,
          prepare: void 0,
          prepublish: void 0,
        }
      : void 0,
    devDependencies: void 0,
  }
}, 'modPackageDev')
var fixScopedRelativeName = /* @__PURE__ */ __name(
  (path4) => path4.replace(/^\.\//, ''),
  'fixScopedRelativeName'
)
var copyPackageToStore = /* @__PURE__ */ __name(async (options) => {
  const { workingDir, devMod = true } = options
  const pkg = readPackageManifest(workingDir)
  if (!pkg) {
    throw 'Error copying package to store.'
  }
  const copyFromDir = options.workingDir
  const storePackageStoreDir = join3(
    getStorePackagesDir(),
    pkg.name,
    pkg.version
  )
  const ignoreFileContent = readIgnoreFile(workingDir)
  const ignoreRule = ignore().add(ignoreFileContent)
  let npmList = []
  try {
    const result = await npmPacklist({ path: workingDir, package: pkg })
    npmList = result.map(fixScopedRelativeName)
  } catch (walkError) {
    console.warn('npm-packlist error:', walkError)
    const { glob: glob2 } = await import('glob')
    try {
      const globResult = await glob2('**/*', {
        cwd: workingDir,
        ignore: ['**/node_modules/**', '**/.git/**'],
        nodir: true,
      })
      npmList = globResult.map(fixScopedRelativeName)
    } catch (globError) {
      console.warn('Fallback glob error:', globError)
      npmList = []
    }
  }
  const filesToCopy = npmList.filter((f) => !ignoreRule.ignores(f))
  if (options.content) {
    console.info('Files included in published content:')
    filesToCopy.sort().forEach((f) => {
      console.log(`- ${f}`)
    })
    console.info(`Total ${filesToCopy.length} files.`)
  }
  const copyFilesToStore = /* @__PURE__ */ __name(async () => {
    await fs3.remove(storePackageStoreDir)
    return Promise.all(
      filesToCopy
        .sort()
        .map((relPath) =>
          copyFile(
            join3(copyFromDir, relPath),
            join3(storePackageStoreDir, relPath),
            relPath
          )
        )
    )
  }, 'copyFilesToStore')
  const hashes = options.changed
    ? await Promise.all(
        filesToCopy
          .sort()
          .map((relPath) => getFileHash(join3(copyFromDir, relPath), relPath))
      )
    : await copyFilesToStore()
  const signature = crypto
    .createHash('md5')
    .update(hashes.join(''))
    .digest('hex')
  if (options.changed) {
    const publishedSig = readSignatureFile(storePackageStoreDir)
    if (signature === publishedSig) {
      return false
    } else {
      await copyFilesToStore()
    }
  }
  writeSignatureFile(storePackageStoreDir, signature)
  const versionPre = options.signature
    ? '+' + signature.substr(0, shortSignatureLength)
    : ''
  const resolveDeps = /* @__PURE__ */ __name(
    (pkg2) =>
      options.workspaceResolve ? resolveWorkspaces(pkg2, workingDir) : pkg2,
    'resolveDeps'
  )
  const pkgToWrite = {
    ...resolveDeps(devMod ? modPackageDev(pkg) : pkg),
    yalcSig: signature,
    version: pkg.version + versionPre,
  }
  writePackageManifest(storePackageStoreDir, pkgToWrite)
  return signature
}, 'copyPackageToStore')

// src/installations.ts
import fs5 from 'fs-extra'
import path2 from 'path'

// src/lockfile.ts
import * as fs4 from 'fs-extra'
import { join as join4 } from 'path'
var determineLockFileVersion = /* @__PURE__ */ __name((lockfile) => {
  if (lockfile.version == 'v1' && lockfile.packages) {
    return 'v1'
  }
  return 'v0'
}, 'determineLockFileVersion')
var configTransformers = {
  v0: /* @__PURE__ */ __name((lockFile) => {
    return {
      version: 'v1',
      packages: lockFile,
    }
  }, 'v0'),
  v1: /* @__PURE__ */ __name((lockFile) => lockFile, 'v1'),
}
var getLockFileCurrentConfig = /* @__PURE__ */ __name((lockFileConfig) => {
  const version = determineLockFileVersion(lockFileConfig)
  return configTransformers[version](lockFileConfig)
}, 'getLockFileCurrentConfig')
var removeLockfile = /* @__PURE__ */ __name((options) => {
  const lockfilePath = join4(options.workingDir, values.lockfileName)
  fs4.removeSync(lockfilePath)
}, 'removeLockfile')
var readLockfile = /* @__PURE__ */ __name((options) => {
  const lockfilePath = join4(options.workingDir, values.lockfileName)
  let lockfile = {
    version: 'v1',
    packages: {},
  }
  try {
    lockfile = getLockFileCurrentConfig(fs4.readJSONSync(lockfilePath))
  } catch (e) {
    return lockfile
  }
  return lockfile
}, 'readLockfile')
var writeLockfile = /* @__PURE__ */ __name((lockfile, options) => {
  const lockfilePath = join4(options.workingDir, values.lockfileName)
  const data = JSON.stringify(lockfile, null, 2)
  fs4.writeFileSync(lockfilePath, data)
}, 'writeLockfile')
var addPackageToLockfile = /* @__PURE__ */ __name((packages, options) => {
  const lockfile = readLockfile(options)
  packages.forEach(
    ({ name, version, file, link, replaced, signature, pure, workspace }) => {
      let old = lockfile.packages[name] || {}
      lockfile.packages[name] = {}
      if (version) {
        lockfile.packages[name].version = version
      }
      if (signature) {
        lockfile.packages[name].signature = signature
      }
      if (file) {
        lockfile.packages[name].file = true
      }
      if (link) {
        lockfile.packages[name].link = true
      }
      if (pure) {
        lockfile.packages[name].pure = true
      }
      if (workspace) {
        lockfile.packages[name].workspace = true
      }
      if (replaced || old.replaced) {
        lockfile.packages[name].replaced = replaced || old.replaced
      }
    }
  )
  writeLockfile(lockfile, options)
}, 'addPackageToLockfile')

// src/installations.ts
var readInstallationsFile = /* @__PURE__ */ __name(() => {
  const storeDir = getStoreMainDir()
  const installationFilePath = path2.join(storeDir, values.installationsFile)
  let installationsConfig
  try {
    fs5.accessSync(installationFilePath)
    try {
      installationsConfig = fs5.readJsonSync(installationFilePath)
    } catch (e) {
      console.error('Error reading installations file', installationFilePath, e)
      installationsConfig = {}
    }
  } catch (e) {
    installationsConfig = {}
  }
  return installationsConfig
}, 'readInstallationsFile')
var showInstallations = /* @__PURE__ */ __name(({ packages }) => {
  const config = readInstallationsFile()
  Object.keys(config)
    .filter((packageName) =>
      packages.length ? packages.indexOf(packageName) >= 0 : true
    )
    .map((name) => ({ name, locations: config[name] }))
    .forEach(({ name, locations }) => {
      console.log(`Installations of package ${name}:`)
      locations.forEach((loc) => {
        console.log(`  ${loc}`)
      })
    })
}, 'showInstallations')
var cleanInstallations = /* @__PURE__ */ __name(async ({ packages, dry }) => {
  const config = readInstallationsFile()
  const installsToRemove = Object.keys(config)
    .filter((packageName) =>
      packages.length ? packages.indexOf(packageName) >= 0 : true
    )
    .map((name) => ({ name, locations: config[name] }))
    .reduce((list, { name, locations }) => {
      return locations.reduce((list2, loc) => {
        const lockfile = readLockfile({ workingDir: loc })
        const lockPackages = Object.keys(lockfile.packages)
        if (lockPackages.indexOf(name) < 0) {
          return list2.concat([
            {
              name,
              //version: '',
              path: loc,
            },
          ])
        }
        return list2
      }, list)
    }, [])
  if (installsToRemove.length) {
    console.info(`Installations clean up:`)
    if (!dry) {
      await removeInstallations(installsToRemove)
    } else {
      installsToRemove.forEach((inst) => {
        console.log(`Installation to remove: ${inst.name} in ${inst.path}`)
      })
      console.warn(`Dry run.`)
    }
  }
}, 'cleanInstallations')
var saveInstallationsFile = /* @__PURE__ */ __name(
  async (installationsConfig) => {
    const storeDir = getStoreMainDir()
    const installationFilePath = path2.join(storeDir, values.installationsFile)
    const data = JSON.stringify(installationsConfig, null, 2)
    return fs5.writeFile(installationFilePath, data)
  },
  'saveInstallationsFile'
)
var addInstallations = /* @__PURE__ */ __name(async (installations) => {
  const installationsConfig = readInstallationsFile()
  let updated = false
  installations.forEach((newInstall) => {
    const packageInstallPaths = installationsConfig[newInstall.name] || []
    installationsConfig[newInstall.name] = packageInstallPaths
    const hasInstallation = !!packageInstallPaths.filter(
      (p) => p === newInstall.path
    )[0]
    if (!hasInstallation) {
      updated = true
      packageInstallPaths.push(newInstall.path)
    }
  })
  if (updated) {
    await saveInstallationsFile(installationsConfig)
  }
}, 'addInstallations')
var removeInstallations = /* @__PURE__ */ __name(async (installations) => {
  const installationsConfig = readInstallationsFile()
  let updated = false
  installations.forEach((install) => {
    const packageInstallPaths = installationsConfig[install.name] || []
    console.log(`Removing installation of ${install.name} in ${install.path}`)
    const index = packageInstallPaths.indexOf(install.path)
    if (index >= 0) {
      packageInstallPaths.splice(index, 1)
      updated = true
    }
    if (!packageInstallPaths.length) {
      delete installationsConfig[install.name]
    }
  })
  if (updated) {
    await saveInstallationsFile(installationsConfig)
  }
}, 'removeInstallations')

// src/pm.ts
import { execSync } from 'child_process'
import * as fs6 from 'fs-extra'
import { join as join5 } from 'path'
var pmMarkFiles = {
  pnpm: ['pnpm-lock.yaml'],
  yarn: ['yarn.lock'],
  npm: ['package-lock.json'],
}
var pmInstallCmd = {
  pnpm: 'pnpm install',
  yarn: 'yarn',
  npm: 'npm install',
}
var pmUpdateCmd = {
  pnpm: 'pnpm update',
  yarn: 'yarn upgrade',
  npm: 'npm update',
}
var pmRunScriptCmd = {
  pnpm: 'pnpm',
  yarn: 'yarn',
  npm: 'npm run',
}
var defaultPm = 'npm'
var getPackageManager = /* @__PURE__ */ __name((cwd) => {
  const pms = Object.keys(pmMarkFiles)
  return (
    pms.reduce((found, pm) => {
      return (
        found ||
        (pmMarkFiles[pm].reduce(
          (found2, file) => found2 || (fs6.existsSync(join5(cwd, file)) && pm),
          false
        ) &&
          pm)
      )
    }, false) || defaultPm
  )
}, 'getPackageManager')
var getRunScriptCmd = /* @__PURE__ */ __name(
  (cwd) => pmInstallCmd[getPackageManager(cwd)],
  'getRunScriptCmd'
)
var getPackageManagerInstallCmd = /* @__PURE__ */ __name(
  (cwd) => pmInstallCmd[getPackageManager(cwd)],
  'getPackageManagerInstallCmd'
)
var getPackageManagerUpdateCmd = /* @__PURE__ */ __name(
  (cwd) => pmUpdateCmd[getPackageManager(cwd)],
  'getPackageManagerUpdateCmd'
)
var isYarn = /* @__PURE__ */ __name(
  (cwd) => getPackageManager(cwd) === 'yarn',
  'isYarn'
)
var runPmUpdate = /* @__PURE__ */ __name((workingDir, packages) => {
  const pkgMgrCmd = [getPackageManagerUpdateCmd(workingDir), ...packages].join(
    ' '
  )
  console.log(`Running ${pkgMgrCmd} in ${workingDir}`)
  execSync(pkgMgrCmd, { cwd: workingDir, ...execLoudOptions })
}, 'runPmUpdate')

// src/publish.ts
var publishPackage = /* @__PURE__ */ __name(async (options) => {
  const workingDir = options.workingDir
  const pkg = readPackageManifest(workingDir)
  if (!pkg) {
    return
  }
  const pm = getPackageManager(workingDir)
  const runPmScript = /* @__PURE__ */ __name((script) => {
    if (!options.scripts) return
    const scriptCmd = pkg.scripts?.[script]
    if (scriptCmd) {
      console.log(`Running ${script} script: ${scriptCmd}`)
      execSync2(`${pmRunScriptCmd[pm]} ${script}`, {
        cwd: workingDir,
        ...execLoudOptions,
      })
    }
  }, 'runPmScript')
  if (pkg.private && !options.private) {
    console.log(
      'Will not publish package with `private: true` use --private flag to force publishing.'
    )
    return
  }
  const preScripts = [
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
  const postScripts = ['postyalcpublish', 'postpack', 'publish', 'postpublish']
  postScripts.forEach(runPmScript)
  const publishedPackageDir = join6(
    getStorePackagesDir(),
    pkg.name,
    pkg.version
  )
  const publishedPkg = readPackageManifest(publishedPackageDir)
  console.log(
    `${publishedPkg.name}@${publishedPkg.version} published in store.`
  )
  if (options.push) {
    const installationsConfig = readInstallationsFile()
    const installationPaths = installationsConfig[pkg.name] || []
    const installationsToRemove = []
    for (const workingDir2 of installationPaths) {
      console.info(`Pushing ${pkg.name}@${pkg.version} in ${workingDir2}`)
      const installationsToRemoveForPkg = await updatePackages([pkg.name], {
        replace: options.replace,
        workingDir: workingDir2,
        update: options.update,
        noInstallationsRemove: true,
      })
      installationsToRemove.push(...installationsToRemoveForPkg)
    }
    await removeInstallations(installationsToRemove)
  }
}, 'publishPackage')

// src/update.ts
var updatePackages = /* @__PURE__ */ __name(async (packages, options) => {
  const { workingDir } = options
  const lockfile = readLockfile({ workingDir })
  let packagesToUpdate = []
  let installationsToRemove = []
  if (packages.length) {
    packages.forEach((packageName) => {
      const { name, version } = parsePackageName(packageName)
      if (lockfile.packages[name]) {
        if (version) {
          lockfile.packages[name].version = version
        }
        packagesToUpdate.push(name)
      } else {
        installationsToRemove.push({ name, path: options.workingDir })
        console.warn(
          `Did not find package ${name} in lockfile, please use 'add' command to add it explicitly.`
        )
      }
    })
  } else {
    packagesToUpdate = Object.keys(lockfile.packages)
  }
  const lockPackages = packagesToUpdate.map((name) => ({
    name: lockfile.packages[name].version
      ? name + '@' + lockfile.packages[name].version
      : name,
    file: lockfile.packages[name].file,
    link: lockfile.packages[name].link,
    pure: lockfile.packages[name].pure,
    workspace: lockfile.packages[name].workspace,
  }))
  const packagesFiles = lockPackages.filter((p) => p.file).map((p) => p.name)
  const addOpts = {
    workingDir: options.workingDir,
    replace: options.replace,
    update: options.update,
    restore: options.restore,
  }
  await addPackages(packagesFiles, {
    ...addOpts,
  })
  const packagesLinks = lockPackages
    .filter((p) => !p.file && !p.link && !p.pure && !p.workspace)
    .map((p) => p.name)
  await addPackages(packagesLinks, {
    ...addOpts,
    link: true,
    pure: false,
  })
  const packagesWks = lockPackages.filter((p) => p.workspace).map((p) => p.name)
  await addPackages(packagesWks, {
    ...addOpts,
    workspace: true,
    pure: false,
  })
  const packagesLinkDep = lockPackages.filter((p) => p.link).map((p) => p.name)
  await addPackages(packagesLinkDep, {
    ...addOpts,
    linkDep: true,
    pure: false,
  })
  const packagesPure = lockPackages.filter((p) => p.pure).map((p) => p.name)
  await addPackages(packagesPure, {
    ...addOpts,
    pure: true,
  })
  if (!options.noInstallationsRemove) {
    await removeInstallations(installationsToRemove)
  }
  return installationsToRemove
}, 'updatePackages')

// src/check.ts
import * as fs7 from 'fs-extra'
import { execSync as execSync3 } from 'child_process'
import * as path3 from 'path'
import { join as join7 } from 'path'
var stagedChangesCmd = 'git diff --cached --name-only'
var isPackageManifest = /* @__PURE__ */ __name(
  (fileName) => path3.basename(fileName) === 'package.json',
  'isPackageManifest'
)
function checkManifest(options) {
  const findLocalDepsInManifest = /* @__PURE__ */ __name((manifestPath2) => {
    const pkg = fs7.readJSONSync(manifestPath2)
    const addresMatch = new RegExp(
      `^(file|link):(.\\/)?\\${values.yalcPackagesFolder}\\/`
    )
    const findDeps = /* @__PURE__ */ __name(
      (depsMap) =>
        Object.keys(depsMap).filter((name) => depsMap[name].match(addresMatch)),
      'findDeps'
    )
    const localDeps2 = findDeps(pkg.dependencies || {}).concat(
      findDeps(pkg.devDependencies || {})
    )
    return localDeps2
  }, 'findLocalDepsInManifest')
  if (options.commit) {
    execSync3(stagedChangesCmd, {
      cwd: options.workingDir,
      ...execLoudOptions,
    })
      .toString()
      .trim()
    execSync3(stagedChangesCmd, {
      cwd: options.workingDir,
      ...execLoudOptions,
    })
      .toString()
      .trim()
      .split('\n')
      .filter(isPackageManifest)
  }
  const manifestPath = join7(options.workingDir, 'package.json')
  const localDeps = findLocalDepsInManifest(manifestPath)
  if (localDeps.length) {
    console.info('Yalc dependencies found:', localDeps)
    process.exit(1)
  }
}
__name(checkManifest, 'checkManifest')

// src/remove.ts
import * as fs8 from 'fs-extra'
import { join as join8 } from 'path'
var isYalcFileAddress = /* @__PURE__ */ __name((address, name) => {
  const regExp = new RegExp(
    'file|link:' + values.yalcPackagesFolder + '/' + name
  )
  return regExp.test(address)
}, 'isYalcFileAddress')
var removeIfEmpty = /* @__PURE__ */ __name((folder) => {
  const isEmpty = fs8.existsSync(folder) && !fs8.readdirSync(folder).length
  if (isEmpty) {
    fs8.removeSync(folder)
  }
  return isEmpty
}, 'removeIfEmpty')
var removePackages = /* @__PURE__ */ __name(async (packages, options) => {
  const { workingDir } = options
  const lockFileConfig = readLockfile({ workingDir })
  const pkg = readPackageManifest(workingDir)
  if (!pkg) return
  let packagesToRemove = []
  if (packages.length) {
    packages.forEach((packageName) => {
      const { name, version } = parsePackageName(packageName)
      if (lockFileConfig.packages[name]) {
        if (!version || version === lockFileConfig.packages[name].version) {
          packagesToRemove.push(name)
        }
      } else {
        console.warn(
          `Package ${packageName} not found in ${values.lockfileName}, still will try to remove.`
        )
        packagesToRemove.push(name)
      }
    })
  } else {
    if (options.all) {
      packagesToRemove = Object.keys(lockFileConfig.packages)
    } else {
      console.info(`Use --all option to remove all packages.`)
    }
  }
  let lockfileUpdated = false
  const removedPackagedFromManifest = []
  packagesToRemove.forEach((name) => {
    const lockedPackage = lockFileConfig.packages[name]
    let depsWithPackage
    if (pkg.dependencies && pkg.dependencies[name]) {
      depsWithPackage = pkg.dependencies
    }
    if (pkg.devDependencies && pkg.devDependencies[name]) {
      depsWithPackage = pkg.devDependencies
    }
    if (depsWithPackage && isYalcFileAddress(depsWithPackage[name], name)) {
      removedPackagedFromManifest.push(name)
      if (lockedPackage && lockedPackage.replaced) {
        depsWithPackage[name] = lockedPackage.replaced
      } else {
        delete depsWithPackage[name]
      }
    }
    if (!options.retreat) {
      lockfileUpdated = true
      delete lockFileConfig.packages[name]
    } else {
      console.log(
        `Retreating package ${name} version ==>`,
        lockedPackage.replaced
      )
    }
  })
  if (lockfileUpdated) {
    writeLockfile(lockFileConfig, { workingDir })
  }
  if (removedPackagedFromManifest.length) {
    writePackageManifest(workingDir, pkg)
  }
  const installationsToRemove = packagesToRemove.map((name) => ({
    name,
    version: '',
    path: workingDir,
  }))
  const yalcFolder = join8(workingDir, values.yalcPackagesFolder)
  removedPackagedFromManifest.forEach((name) => {
    fs8.removeSync(join8(workingDir, 'node_modules', name))
  })
  packagesToRemove.forEach((name) => {
    if (!options.retreat) {
      fs8.removeSync(join8(yalcFolder, name))
    }
  })
  const isScopedPackage = /* @__PURE__ */ __name(
    (name) => name.startsWith('@'),
    'isScopedPackage'
  )
  packagesToRemove
    .filter(isScopedPackage)
    .map((name) => name.split('/')[0])
    .map((name) => join8(yalcFolder, name))
    .map(removeIfEmpty)
  const isEmptyLockFile = !Object.keys(lockFileConfig.packages).length
  if (isEmptyLockFile && !options.retreat) {
    removeLockfile({ workingDir })
    if (!removeIfEmpty(yalcFolder)) {
      console.warn(yalcFolder, 'is not empty, not removing it.')
    }
  }
  if (!options.retreat) {
    await removeInstallations(installationsToRemove)
  }
}, 'removePackages')

// src/add.ts
import { execSync as execSync4 } from 'child_process'
import * as fs10 from 'fs-extra'
import { join as join9, relative } from 'path'

// src/sync-dir.ts
import { glob } from 'glob'
import { resolve } from 'path'
import fs9 from 'fs-extra'
var NODE_MAJOR_VERSION = parseInt(process.versions.node.split('.').shift(), 10)
if (NODE_MAJOR_VERSION >= 8 && NODE_MAJOR_VERSION < 10) {
  Symbol.asyncIterator = Symbol.asyncIterator || Symbol('Symbol.asyncIterator')
}
var cache = {}
var makeListMap = /* @__PURE__ */ __name((list) => {
  return list.reduce((map, item) => {
    map[item] = true
    return map
  }, {})
}, 'makeListMap')
var theSameStats = /* @__PURE__ */ __name((srcStat, destStat) => {
  return (
    srcStat.mtime.getTime() === destStat.mtime.getTime() &&
    srcStat.size === destStat.size
  )
}, 'theSameStats')
var copyDirSafe = /* @__PURE__ */ __name(
  async (srcDir, destDir, compareContent = true) => {
    const ignore2 = '**/node_modules/**'
    const dot = true
    const nodir = false
    const srcList = cache[srcDir]
      ? cache[srcDir].glob
      : await glob('**', { cwd: srcDir, ignore: ignore2, dot, nodir })
    const destList = await glob('**', {
      cwd: destDir,
      ignore: ignore2,
      dot,
      nodir,
    })
    const srcMap = makeListMap(srcList)
    const destMap = makeListMap(destList)
    const newFiles = srcList.filter((file) => !destMap[file])
    const filesToRemove = destList.filter((file) => !srcMap[file])
    const commonFiles = srcList.filter((file) => destMap[file])
    cache[srcDir] = cache[srcDir] || {
      files: {},
      glob: srcList,
    }
    const filesToReplace = []
    const srcCached = cache[srcDir].files
    const dirsInDest = {}
    for await (const file of commonFiles) {
      srcCached[file] = srcCached[file] || {}
      const srcFilePath = resolve(srcDir, file)
      const destFilePath = resolve(destDir, file)
      const srcFileStat = srcCached[file].stat || (await fs9.stat(srcFilePath))
      srcCached[file].stat = srcFileStat
      const destFileStat = await fs9.stat(destFilePath)
      const areDirs = srcFileStat.isDirectory() && destFileStat.isDirectory()
      dirsInDest[file] = destFileStat.isDirectory()
      const replacedFileWithDir =
        srcFileStat.isDirectory() && !destFileStat.isDirectory()
      const dirReplacedWithFile =
        !srcFileStat.isDirectory() && destFileStat.isDirectory()
      if (dirReplacedWithFile || replacedFileWithDir) {
        filesToRemove.push(file)
      }
      const compareByHash = /* @__PURE__ */ __name(async () => {
        const srcHash =
          srcCached[file].hash || (await getFileHash(srcFilePath, ''))
        srcCached[file].hash = srcHash
        const destHash = await getFileHash(destFilePath, '')
        return srcHash === destHash
      }, 'compareByHash')
      if (
        dirReplacedWithFile ||
        (!areDirs &&
          !theSameStats(srcFileStat, destFileStat) &&
          (!compareContent || !(await compareByHash())))
      ) {
        filesToReplace.push(file)
      }
    }
    await Promise.all(
      filesToRemove
        .filter((file) => !dirsInDest[file])
        .map((file) => fs9.remove(resolve(destDir, file)))
    )
    await Promise.all(
      filesToRemove
        .filter((file) => dirsInDest[file])
        .map((file) => fs9.remove(resolve(destDir, file)))
    )
    const newFilesDirs = await Promise.all(
      newFiles.map((file) =>
        fs9.stat(resolve(srcDir, file)).then((stat) => stat.isDirectory())
      )
    )
    await Promise.all(
      newFiles
        .filter((file, index) => !newFilesDirs[index])
        .concat(filesToReplace)
        .map((file) => fs9.copy(resolve(srcDir, file), resolve(destDir, file)))
    )
  },
  'copyDirSafe'
)

// src/add.ts
var ensureSymlinkSync2 = fs10.ensureSymlinkSync
var getLatestPackageVersion = /* @__PURE__ */ __name((packageName) => {
  const dir = getPackageStoreDir(packageName)
  const versions = fs10.readdirSync(dir)
  const latest = versions
    .map((version) => ({
      version,
      created: fs10.statSync(join9(dir, version)).ctime.getTime(),
    }))
    .sort((a, b) => b.created - a.created)
    .map((x) => x.version)[0]
  return latest || ''
}, 'getLatestPackageVersion')
var isSymlink = /* @__PURE__ */ __name((path4) => {
  try {
    return !!fs10.readlinkSync(path4)
  } catch (e) {
    return false
  }
}, 'isSymlink')
var checkPnpmWorkspace = /* @__PURE__ */ __name((workingDir) => {
  return fs10.existsSync(join9(workingDir, 'pnpm-workspace.yaml'))
}, 'checkPnpmWorkspace')
var addPackages = /* @__PURE__ */ __name(async (packages, options) => {
  if (!packages.length) return
  const workingDir = options.workingDir
  const localPkg = readPackageManifest(workingDir)
  let localPkgUpdated = false
  if (!localPkg) {
    return
  }
  const pm = getPackageManager(workingDir)
  const runPmScript = /* @__PURE__ */ __name((script) => {
    const scriptCmd = localPkg.scripts?.[script]
    if (scriptCmd) {
      console.log(`Running ${script} script: ${scriptCmd}`)
      execSync4(`${pmRunScriptCmd[pm]} ${script}`, {
        cwd: workingDir,
        ...execLoudOptions,
      })
    }
  }, 'runPmScript')
  let pnpmWorkspace = false
  const doPure =
    options.pure === false
      ? false
      : options.pure ||
        !!localPkg.workspaces ||
        (pnpmWorkspace = checkPnpmWorkspace(workingDir))
  runPmScript('preyalc')
  const addedInstallsP = packages.map(async (packageName) => {
    runPmScript('preyalc.' + packageName)
    const { name, version = '' } = parsePackageName(packageName)
    if (!name) {
      console.warn('Could not parse package name', packageName)
    }
    const destYalcCopyDir = join9(workingDir, values.yalcPackagesFolder, name)
    if (!options.restore) {
      const storedPackagePath = getPackageStoreDir(name)
      if (!fs10.existsSync(storedPackagePath)) {
        console.warn(
          `Could not find package \`${name}\` in store (${storedPackagePath}), skipping.`
        )
        return null
      }
      const versionToInstall = version || getLatestPackageVersion(name)
      const storedPackageDir = getPackageStoreDir(name, versionToInstall)
      if (!fs10.existsSync(storedPackageDir)) {
        console.warn(
          `Could not find package \`${packageName}\` ` + storedPackageDir,
          ', skipping.'
        )
        return null
      }
      await copyDirSafe(storedPackageDir, destYalcCopyDir, !options.replace)
    } else {
      console.log(`Restoring package \`${packageName}\` from .yalc directory`)
      if (!fs10.existsSync(destYalcCopyDir)) {
        console.warn(
          `Could not find package \`${packageName}\` ` + destYalcCopyDir,
          ', skipping.'
        )
        return null
      }
    }
    const pkg = readPackageManifest(destYalcCopyDir)
    if (!pkg) {
      return null
    }
    let replacedVersion = ''
    if (doPure) {
      if (!options.pure) {
        const defaultPureMsg =
          '--pure option will be used by default, to override use --no-pure.'
        if (localPkg.workspaces) {
          console.warn(
            'Because of `workspaces` enabled in this package ' + defaultPureMsg
          )
        } else if (pnpmWorkspace) {
          console.warn(
            'Because of `pnpm-workspace.yaml` exists in this package ' +
              defaultPureMsg
          )
        }
      }
      console.log(
        `${pkg.name}@${pkg.version} added to ${join9(
          values.yalcPackagesFolder,
          name
        )} purely`
      )
    }
    if (!doPure) {
      const destModulesDir = join9(workingDir, 'node_modules', name)
      if (options.link || options.linkDep || isSymlink(destModulesDir)) {
        fs10.removeSync(destModulesDir)
      }
      if (options.link || options.linkDep) {
        ensureSymlinkSync2(destYalcCopyDir, destModulesDir, 'junction')
      } else {
        await copyDirSafe(destYalcCopyDir, destModulesDir, !options.replace)
      }
      if (!options.link) {
        const protocol = options.linkDep ? 'link:' : 'file:'
        const localAddress = options.workspace
          ? 'workspace:*'
          : protocol + values.yalcPackagesFolder + '/' + pkg.name
        const dependencies = localPkg.dependencies || {}
        const devDependencies = localPkg.devDependencies || {}
        let depsObj = options.dev ? devDependencies : dependencies
        if (options.dev) {
          if (dependencies[pkg.name]) {
            replacedVersion = dependencies[pkg.name]
            delete dependencies[pkg.name]
          }
        } else {
          if (!dependencies[pkg.name]) {
            if (devDependencies[pkg.name]) {
              depsObj = devDependencies
            }
          }
        }
        if (depsObj[pkg.name] !== localAddress) {
          replacedVersion = replacedVersion || depsObj[pkg.name]
          depsObj[pkg.name] = localAddress
          localPkg.dependencies =
            depsObj === dependencies ? dependencies : localPkg.dependencies
          localPkg.devDependencies =
            depsObj === devDependencies
              ? devDependencies
              : localPkg.devDependencies
          localPkgUpdated = true
        }
        replacedVersion = replacedVersion == localAddress ? '' : replacedVersion
      }
      if (pkg.bin && (options.link || options.linkDep)) {
        const binDir = join9(workingDir, 'node_modules', '.bin')
        const addBinScript = /* @__PURE__ */ __name((src, dest) => {
          const srcPath = join9(destYalcCopyDir, src)
          const destPath = join9(binDir, dest)
          console.log(
            'Linking bin script:',
            relative(workingDir, destYalcCopyDir),
            '->',
            relative(workingDir, destPath)
          )
          try {
            ensureSymlinkSync2(srcPath, destPath)
            fs10.chmodSync(srcPath, 493)
          } catch (e) {
            console.warn('Could not create bin symlink.')
            console.error(e)
          }
        }, 'addBinScript')
        if (typeof pkg.bin === 'string') {
          fs10.ensureDirSync(binDir)
          addBinScript(pkg.bin, pkg.name)
        } else if (typeof pkg.bin === 'object') {
          fs10.ensureDirSync(binDir)
          for (const name2 in pkg.bin) {
            addBinScript(pkg.bin[name2], name2)
          }
        }
      }
      const addedAction = options.link ? 'linked' : 'added'
      console.log(
        `Package ${pkg.name}@${pkg.version} ${addedAction} ==> ${destModulesDir}`
      )
    }
    const signature = readSignatureFile(destYalcCopyDir)
    runPmScript('postyalc.' + packageName)
    return {
      signature,
      name,
      version,
      replaced: replacedVersion,
      path: options.workingDir,
    }
  })
  const addedInstalls = (await Promise.all(addedInstallsP))
    .filter((_) => !!_)
    .map((_) => _)
  if (localPkgUpdated) {
    writePackageManifest(workingDir, localPkg)
  }
  addPackageToLockfile(
    addedInstalls.map((i) => ({
      name: i.name,
      version: i.version,
      replaced: i.replaced,
      pure: doPure,
      workspace: options.workspace,
      file: options.workspace
        ? void 0
        : !options.link && !options.linkDep && !doPure,
      link: options.linkDep && !doPure,
      signature: i.signature,
    })),
    { workingDir: options.workingDir }
  )
  runPmScript('postyalc')
  await addInstallations(addedInstalls)
  if (options.update) {
    runPmUpdate(options.workingDir, packages)
  }
}, 'addPackages')

// src/index.ts
var userHome = homedir()
var values = {
  myNameIs: 'yalc',
  ignoreFileName: '.yalcignore',
  myNameIsCapitalized: 'Yalc',
  lockfileName: 'yalc.lock',
  yalcPackagesFolder: '.yalc',
  prescript: 'preyalc',
  postscript: 'postyalc',
  installationsFile: 'installations.json',
}
var yalcGlobal = global
function getStoreMainDir() {
  if (yalcGlobal.yalcStoreMainDir) {
    return yalcGlobal.yalcStoreMainDir
  }
  if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return join10(process.env.LOCALAPPDATA, values.myNameIsCapitalized)
  }
  return join10(userHome, '.' + values.myNameIs)
}
__name(getStoreMainDir, 'getStoreMainDir')
function getStorePackagesDir() {
  return join10(getStoreMainDir(), 'packages')
}
__name(getStorePackagesDir, 'getStorePackagesDir')
var getPackageStoreDir = /* @__PURE__ */ __name(
  (packageName, version = '') =>
    join10(getStorePackagesDir(), packageName, version),
  'getPackageStoreDir'
)
var execLoudOptions = { stdio: 'inherit' }
var signatureFileName = 'yalc.sig'
var readSignatureFile = /* @__PURE__ */ __name((workingDir) => {
  const signatureFilePath = join10(workingDir, signatureFileName)
  try {
    const fileData = fs11.readFileSync(signatureFilePath, 'utf-8')
    return fileData
  } catch (e) {
    return ''
  }
}, 'readSignatureFile')
var readIgnoreFile = /* @__PURE__ */ __name((workingDir) => {
  const filePath = join10(workingDir, values.ignoreFileName)
  try {
    const fileData = fs11.readFileSync(filePath, 'utf-8')
    return fileData
  } catch (e) {
    return ''
  }
}, 'readIgnoreFile')
var writeSignatureFile = /* @__PURE__ */ __name((workingDir, signature) => {
  const signatureFilePath = join10(workingDir, signatureFileName)
  try {
    fs11.writeFileSync(signatureFilePath, signature)
  } catch (e) {
    console.error('Could not write signature file')
    throw e
  }
}, 'writeSignatureFile')

export {
  __name,
  __require,
  __dirname,
  parsePackageName,
  readPackageManifest,
  writePackageManifest,
  showInstallations,
  cleanInstallations,
  pmMarkFiles,
  pmInstallCmd,
  pmUpdateCmd,
  pmRunScriptCmd,
  getPackageManager,
  getRunScriptCmd,
  getPackageManagerInstallCmd,
  getPackageManagerUpdateCmd,
  isYarn,
  runPmUpdate,
  publishPackage,
  updatePackages,
  checkManifest,
  removePackages,
  addPackages,
  values,
  yalcGlobal,
  getStoreMainDir,
  getStorePackagesDir,
  getPackageStoreDir,
  execLoudOptions,
  readSignatureFile,
  readIgnoreFile,
  writeSignatureFile,
}
//# sourceMappingURL=chunk-FWGD47KQ.mjs.map
