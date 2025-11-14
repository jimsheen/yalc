#!/usr/bin/env node
import yargs, { ArgumentsCamelCase } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { join, resolve } from 'path'

interface AddCommandArguments {
  dev?: boolean
  link?: boolean
  restore?: boolean
  pure?: boolean
  workspace?: boolean
  update?: boolean
  upgrade?: boolean
  all?: boolean
  retreat?: boolean
}

interface InstallationsCommandArguments {
  dry?: boolean
}

interface CheckCommandArguments {
  commit?: boolean
  all?: boolean
}

function getStringArray(arr: (string | number)[]): string[] {
  return arr.filter((item): item is string => typeof item === 'string')
}

import {
  publishPackage,
  addPackages,
  updatePackages,
  removePackages,
  getStoreMainDir,
  yalcGlobal,
} from './core/config/index'

import {
  showInstallations,
  cleanInstallations,
} from './package/installations/installations'

import { checkManifest } from './commands/check'
import { makeConsoleColored, disabledConsoleOutput } from './core/utils/console'
import { PublishPackageOptions } from './commands/publish'
import { readRcConfig } from './core/config/rc-modern'
import { interactiveMode } from './commands/interactive'
import { listPackages } from './commands/list'
import { showPackageInfo } from './commands/info'
import { showPackageUsage } from './commands/where'
import { cleanPackages } from './commands/clean'

const updateFlags = ['update', 'upgrade', 'up']

const publishFlags = [
  'scripts',
  'sig',
  'dev-mod',
  'changed',
  'files',
  ...updateFlags,
]

const getVersionMessage = () => {
  const pkg = require(__dirname + '/../package.json')
  return pkg.version
}

makeConsoleColored()

const rcArgs = readRcConfig()

if (process.argv.includes('--quiet') || rcArgs.quiet) {
  disabledConsoleOutput()
}

const getPublishOptions = (
  argv: any,
  override: Partial<PublishPackageOptions> = {},
): PublishPackageOptions => {
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
}

/* tslint:disable-next-line */
yargs(hideBin(process.argv))
  .scriptName('yalc')
  .usage('yalc [command] [options] [package1 [package2...]]')
  .coerce('store-folder', function (folder: string) {
    if (!yalcGlobal.yalcStoreMainDir) {
      yalcGlobal.yalcStoreMainDir = resolve(folder)
      console.log('Package store folder used:', yalcGlobal.yalcStoreMainDir)
    }
  })
  .command({
    command: '*',
    builder: (yargs) => {
      return yargs.boolean(['version'])
    },
    handler: async (argv) => {
      if (argv._[0]) {
        // Unknown command
        console.log(
          'Unknown command `' +
            argv._[0] +
            '`. Use `yalc --help` to see available commands.',
        )
      } else if (argv.version) {
        // Show version
        console.log(getVersionMessage())
      } else {
        // No command provided - smart default behavior
        if (process.stdout.isTTY && process.stdin.isTTY) {
          // Interactive environment - launch interactive mode
          await interactiveMode()
        } else {
          // Non-interactive environment (scripts, CI) - show help
          console.log('yalc [command] [options] [package1 [package2...]]')
          console.log('')
          console.log('Use `yalc --help` to see available commands.')
          console.log('Use `yalc interactive` to launch interactive mode.')
        }
      }
    },
  })
  .command({
    command: 'interactive',
    aliases: ['i'],
    describe: 'Launch interactive mode with menu-driven interface',
    handler: async () => {
      await interactiveMode()
    },
  })
  .command({
    command: 'publish',
    describe: 'Publish package in yalc local repo',
    builder: (yargs) => {
      return yargs
        .default('sig', false)
        .default('scripts', true)
        .default('dev-mod', true)
        .default('workspace-resolve', true)
        .default(rcArgs)
        .alias('script', 'scripts')
        .boolean(['push'].concat(publishFlags))
    },
    handler: async (argv) => {
      await publishPackage(getPublishOptions(argv))
    },
  })
  .command({
    command: 'push',
    describe:
      'Publish package in yalc local repo and push to all installations',
    builder: (yargs) => {
      return yargs
        .default('sig', false)
        .default('scripts', false)
        .default('dev-mod', true)
        .default('workspace-resolve', true)
        .default(rcArgs)
        .alias('script', 'scripts')
        .boolean(['safe'].concat(publishFlags))
        .option('replace', { describe: 'Force package content replacement' })
    },
    handler: async (argv) => {
      await publishPackage(getPublishOptions(argv, { push: true }))
    },
  })
  .command({
    command: 'installations',
    describe: 'Work with installations file: show/clean',
    builder: (yargs) => {
      return yargs.boolean(['dry'])
    },
    handler: async (
      argv: ArgumentsCamelCase<InstallationsCommandArguments>,
    ) => {
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
    },
  })
  .command({
    command: 'add',
    describe: 'Add package from yalc repo to the project',
    builder: (yargs) => {
      return yargs
        .boolean(['file', 'dev', 'link', ...updateFlags])
        .alias('D', 'dev')
        .boolean('workspace')
        .alias('save-dev', 'dev')
        .alias('workspace', 'W')
        .default(rcArgs)
        .help(true)
    },
    handler: async (argv: ArgumentsCamelCase<AddCommandArguments>) => {
      await addPackages(getStringArray(argv._.slice(1)), {
        dev: argv.dev,
        linkDep: argv.link,
        restore: argv.restore,
        pure: argv.pure,
        workspace: argv.workspace,
        update: argv.update || argv.upgrade,
        workingDir: process.cwd(),
      })
    },
  })
  .command({
    command: 'link',
    describe: 'Link package from yalc repo to the project',
    builder: (yargs) => {
      return yargs.default(rcArgs).help(true)
    },
    handler: async (argv: ArgumentsCamelCase<AddCommandArguments>) => {
      await addPackages(getStringArray(argv._.slice(1)), {
        link: true,
        pure: argv.pure,
        workingDir: process.cwd(),
      })
    },
  })
  .command({
    command: 'update',
    describe: 'Update packages from yalc repo',
    builder: (yargs) => {
      return yargs
        .boolean([...updateFlags])
        .default(rcArgs)
        .help(true)
    },
    handler: async (argv: ArgumentsCamelCase<AddCommandArguments>) => {
      await updatePackages(getStringArray(argv._.slice(1)), {
        update: argv.update || argv.upgrade,
        restore: argv.restore,
        workingDir: process.cwd(),
      })
    },
  })
  .command({
    command: 'restore',
    describe: 'Restore retreated packages',
    builder: (yargs) => {
      return yargs
        .boolean([...updateFlags])
        .default(rcArgs)
        .help(true)
    },
    handler: async (argv: ArgumentsCamelCase<AddCommandArguments>) => {
      await updatePackages(getStringArray(argv._.slice(1)), {
        update: argv.update || argv.upgrade,
        restore: true,
        workingDir: process.cwd(),
      })
    },
  })
  .command({
    command: 'remove',
    describe: 'Remove packages from the project',
    builder: (yargs) => {
      return yargs.boolean(['retreat', 'all']).default(rcArgs).help(true)
    },
    handler: async (argv: ArgumentsCamelCase<AddCommandArguments>) => {
      await removePackages(getStringArray(argv._.slice(1)), {
        retreat: argv.retreat,
        workingDir: process.cwd(),
        all: argv.all,
      })
    },
  })
  .command({
    command: 'retreat',
    describe:
      'Remove packages from project, but leave in lock file (to be restored later)',
    builder: (yargs) => {
      return yargs.boolean(['all']).help(true)
    },
    handler: async (argv: ArgumentsCamelCase<AddCommandArguments>) => {
      await removePackages(getStringArray(argv._.slice(1)), {
        all: argv.all,
        retreat: true,
        workingDir: process.cwd(),
      })
    },
  })
  .command({
    command: 'check',
    describe: 'Check package.json for yalc packages',
    builder: (yargs) => {
      return yargs.boolean(['commit']).usage('check usage here').help(true)
    },
    handler: (argv: ArgumentsCamelCase<CheckCommandArguments>) => {
      const gitParams = process.env.GIT_PARAMS
      if (argv.commit) {
        console.log('gitParams', gitParams)
      }
      checkManifest({
        commit: argv.commit ?? false,
        all: argv.all ?? false,
        workingDir: process.cwd(),
      })
    },
  })
  .command({
    command: 'list',
    describe: 'List packages in yalc store',
    builder: (yargs) => {
      return yargs
        .boolean(['detailed', 'unused', 'json'])
        .describe('detailed', 'Show detailed package information')
        .describe('unused', 'Show only unused packages')
        .describe('json', 'Output in JSON format')
    },
    handler: (argv) => {
      listPackages({
        detailed: argv.detailed,
        unused: argv.unused,
        json: argv.json,
      })
    },
  })
  .command({
    command: 'info <package>',
    describe: 'Show detailed information about a package',
    builder: (yargs) => {
      return yargs.positional('package', {
        describe: 'Package name to show information for',
        type: 'string',
        demandOption: true,
      })
    },
    handler: (argv) => {
      showPackageInfo(argv.package)
    },
  })
  .command({
    command: 'where <package>',
    describe: 'Show which projects use a package',
    builder: (yargs) => {
      return yargs.positional('package', {
        describe: 'Package name to find usage for',
        type: 'string',
        demandOption: true,
      })
    },
    handler: (argv) => {
      showPackageUsage(argv.package)
    },
  })
  .command({
    command: 'clean',
    describe: 'Clean unused packages from store',
    builder: (yargs) => {
      return yargs
        .boolean(['unused', 'old', 'dry-run'])
        .describe('unused', 'Remove unused packages (default)')
        .describe('old', 'Remove old package versions')
        .describe('dry-run', 'Show what would be removed without removing')
        .default('unused', true)
    },
    handler: (argv) => {
      cleanPackages({
        unused: argv.unused,
        old: argv.old,
        dryRun: argv.dryRun,
      })
    },
  })
  .command({
    command: 'dir',
    describe: 'Show yalc system directory',
    handler: () => {
      console.log(getStoreMainDir())
    },
  })
  .help('help')
  .parseAsync()
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
