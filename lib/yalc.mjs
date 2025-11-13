#!/usr/bin/env node
// YALC - Yet Another Local Cache
// Modern TypeScript build with tsup
import {
  __dirname,
  __name,
  __require,
  addPackages,
  checkManifest,
  cleanInstallations,
  getStoreMainDir,
  publishPackage,
  removePackages,
  showInstallations,
  updatePackages,
  values,
  yalcGlobal,
} from './chunk-FWGD47KQ.mjs'

// src/yalc.ts
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { join, resolve } from 'path'

// src/console.ts
import chalk from 'chalk'
var overloadConsole = /* @__PURE__ */ __name(({ output, methods }) => {
  const oldMethods = {}
  methods.forEach((m) => {
    const method = m
    if (typeof console[method] !== 'function') return
    oldMethods[method] = console[method]
    console[method] = (...args) => {
      output({ method, args, oldMethods })
    }
  })
}, 'overloadConsole')
var disabledConsoleOutput = /* @__PURE__ */ __name(() => {
  overloadConsole({
    methods: ['log', 'warn', 'info'],
    output: /* @__PURE__ */ __name(() => {}, 'output'),
  })
}, 'disabledConsoleOutput')
var makeConsoleColored = /* @__PURE__ */ __name(() => {
  overloadConsole({
    methods: ['log', 'warn', 'error', 'info'],
    output: /* @__PURE__ */ __name(({ method, args, oldMethods }) => {
      const fns = {
        warn: chalk.yellowBright,
        info: chalk.blueBright,
        error: chalk.redBright,
      }
      const fn = fns[method] || ((arg) => arg)
      oldMethods[method](
        ...args.map((arg) => (typeof arg === 'string' ? fn(arg) : arg))
      )
    }, 'output'),
  })
}, 'makeConsoleColored')

// src/rc.ts
import fs from 'fs'
var ini = __require('ini')
var validFlags = [
  'sig',
  'workspace-resolve',
  'dev-mod',
  'scripts',
  'quiet',
  'files',
]
var fileName = '.yalcrc'
var readFile = /* @__PURE__ */ __name(() => {
  if (fs.existsSync(fileName)) {
    return ini.parse(fs.readFileSync(fileName, 'utf-8'))
  }
  return null
}, 'readFile')
var readRcConfig = /* @__PURE__ */ __name(() => {
  const rcOptions = readFile()
  if (!rcOptions) return {}
  const unknown = Object.keys(rcOptions).filter(
    (key) => !validFlags.includes(key)
  )
  if (unknown.length) {
    console.warn(`Unknown option in ${fileName}: ${unknown[0]}`)
    process.exit()
  }
  return Object.keys(rcOptions).reduce((prev, flag) => {
    return validFlags.includes(flag)
      ? { ...prev, [flag]: rcOptions[flag] }
      : prev
  }, {})
}, 'readRcConfig')

// src/yalc.ts
function getStringArray(arr) {
  return arr.filter((item) => typeof item === 'string')
}
__name(getStringArray, 'getStringArray')
var updateFlags = ['update', 'upgrade', 'up']
var publishFlags = [
  'scripts',
  'sig',
  'dev-mod',
  'changed',
  'files',
  ...updateFlags,
]
var cliCommand = values.myNameIs
var getVersionMessage = /* @__PURE__ */ __name(() => {
  const pkg = __require(__dirname + '/../package.json')
  return pkg.version
}, 'getVersionMessage')
makeConsoleColored()
var rcArgs = readRcConfig()
if (process.argv.includes('--quiet') || rcArgs.quiet) {
  disabledConsoleOutput()
}
var getPublishOptions = /* @__PURE__ */ __name((argv, override = {}) => {
  const folder = argv._[1]
  return {
    workingDir: join(process.cwd(), folder || ''),
    push: argv.push,
    replace: argv.replace,
    signature: argv.sig,
    changed: argv.changed,
    content: argv.content,
    private: argv.private,
    scripts: argv.scripts,
    update: argv.update || argv.upgrade,
    workspaceResolve: argv.workspaceResolve,
    devMod: argv.devMod,
    ...override,
  }
}, 'getPublishOptions')
yargs(hideBin(process.argv))
  .usage(cliCommand + ' [command] [options] [package1 [package2...]]')
  .coerce('store-folder', function (folder) {
    if (!yalcGlobal.yalcStoreMainDir) {
      yalcGlobal.yalcStoreMainDir = resolve(folder)
      console.log('Package store folder used:', yalcGlobal.yalcStoreMainDir)
    }
  })
  .command({
    command: '*',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2.boolean(['version'])
    }, 'builder'),
    handler: /* @__PURE__ */ __name((argv) => {
      let msg = 'Use `yalc help` to see available commands.'
      if (argv._[0]) {
        msg = 'Unknown command `' + argv._[0] + '`. ' + msg
      } else {
        if (argv.version) {
          msg = getVersionMessage()
        }
      }
      console.log(msg)
    }, 'handler'),
  })
  .command({
    command: 'publish',
    describe: 'Publish package in yalc local repo',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2
        .default('sig', false)
        .default('scripts', true)
        .default('dev-mod', true)
        .default('workspace-resolve', true)
        .default(rcArgs)
        .alias('script', 'scripts')
        .boolean(['push'].concat(publishFlags))
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await publishPackage(getPublishOptions(argv))
    }, 'handler'),
  })
  .command({
    command: 'push',
    describe:
      'Publish package in yalc local repo and push to all installations',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2
        .default('sig', false)
        .default('scripts', false)
        .default('dev-mod', true)
        .default('workspace-resolve', true)
        .default(rcArgs)
        .alias('script', 'scripts')
        .boolean(['safe'].concat(publishFlags))
        .option('replace', { describe: 'Force package content replacement' })
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await publishPackage(getPublishOptions(argv, { push: true }))
    }, 'handler'),
  })
  .command({
    command: 'installations',
    describe: 'Work with installations file: show/clean',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2.boolean(['dry'])
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      const action = argv._[1]
      const packages = getStringArray(argv._.slice(2))
      switch (action) {
        case 'show':
          showInstallations({ packages })
          break
        case 'clean':
          await cleanInstallations({ packages, dry: argv.dry ?? false })
          break
        default:
          console.info('Need installation action: show | clean')
      }
    }, 'handler'),
  })
  .command({
    command: 'add',
    describe: 'Add package from yalc repo to the project',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2
        .boolean(['file', 'dev', 'link', ...updateFlags])
        .alias('D', 'dev')
        .boolean('workspace')
        .alias('save-dev', 'dev')
        .alias('workspace', 'W')
        .default(rcArgs)
        .help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await addPackages(getStringArray(argv._.slice(1)), {
        dev: argv.dev,
        linkDep: argv.link,
        restore: argv.restore,
        pure: argv.pure,
        workspace: argv.workspace,
        update: argv.update || argv.upgrade,
        workingDir: process.cwd(),
      })
    }, 'handler'),
  })
  .command({
    command: 'link',
    describe: 'Link package from yalc repo to the project',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2.default(rcArgs).help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await addPackages(getStringArray(argv._.slice(1)), {
        link: true,
        pure: argv.pure,
        workingDir: process.cwd(),
      })
    }, 'handler'),
  })
  .command({
    command: 'update',
    describe: 'Update packages from yalc repo',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2
        .boolean([...updateFlags])
        .default(rcArgs)
        .help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await updatePackages(getStringArray(argv._.slice(1)), {
        update: argv.update || argv.upgrade,
        restore: argv.restore,
        workingDir: process.cwd(),
      })
    }, 'handler'),
  })
  .command({
    command: 'restore',
    describe: 'Restore retreated packages',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2
        .boolean([...updateFlags])
        .default(rcArgs)
        .help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await updatePackages(getStringArray(argv._.slice(1)), {
        update: argv.update || argv.upgrade,
        restore: true,
        workingDir: process.cwd(),
      })
    }, 'handler'),
  })
  .command({
    command: 'remove',
    describe: 'Remove packages from the project',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2.boolean(['retreat', 'all']).default(rcArgs).help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await removePackages(getStringArray(argv._.slice(1)), {
        retreat: argv.retreat,
        workingDir: process.cwd(),
        all: argv.all,
      })
    }, 'handler'),
  })
  .command({
    command: 'retreat',
    describe:
      'Remove packages from project, but leave in lock file (to be restored later)',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2.boolean(['all']).help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name(async (argv) => {
      await removePackages(getStringArray(argv._.slice(1)), {
        all: argv.all,
        retreat: true,
        workingDir: process.cwd(),
      })
    }, 'handler'),
  })
  .command({
    command: 'check',
    describe: 'Check package.json for yalc packages',
    builder: /* @__PURE__ */ __name((yargs2) => {
      return yargs2.boolean(['commit']).usage('check usage here').help(true)
    }, 'builder'),
    handler: /* @__PURE__ */ __name((argv) => {
      const gitParams = process.env.GIT_PARAMS
      if (argv.commit) {
        console.log('gitParams', gitParams)
      }
      checkManifest({
        commit: argv.commit ?? false,
        all: argv.all ?? false,
        workingDir: process.cwd(),
      })
    }, 'handler'),
  })
  .command({
    command: 'dir',
    describe: 'Show yalc system directory',
    handler: /* @__PURE__ */ __name(() => {
      console.log(getStoreMainDir())
    }, 'handler'),
  })
  .help('help').argv
//# sourceMappingURL=yalc.mjs.map
