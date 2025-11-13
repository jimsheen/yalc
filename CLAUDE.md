# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YALC is a local package development tool that provides a better workflow than `npm link` for package authors. It acts as a simple local repository for locally developed packages, storing them in a global store (`~/.yalc`) and allowing you to share them across your local environment without publishing to a remote registry.

## Development Commands

### Core Commands

```bash
# Build the project (TypeScript compilation)
npm run build
# or
yarn build

# Run tests
npm test
# or
yarn test

# Run linting
npm run lint
# or
yarn lint

# Development mode with file watching
npm run test-dev
# or
yarn test-dev

# Clean build artifacts
npm run clean
# or
yarn clean
```

### Development Workflow

```bash
# Install dependencies
yarn install

# Build and test before committing
yarn ci

# Publish preparation (includes clean, build, and test)
npm run prepublishOnly
```

## Architecture Overview

### Core Module Structure

YALC is built as a modular TypeScript application with 17 core modules organized around specific responsibilities:

**Entry Points:**

- `src/index.ts` - Main library API exports and global configuration
- `src/yalc.ts` - CLI interface using yargs for command handling

**Core Operations Modules:**

- `src/publish.ts` - Package publishing to local store with lifecycle script support
- `src/add.ts` - Adding packages from store to projects (file/link modes)
- `src/update.ts` - Package update orchestration
- `src/remove.ts` - Package removal with retreat/restore functionality
- `src/copy.ts` - File copying operations with workspace protocol resolution

**Advanced Features:**

- `src/catalog.ts` - PNPM catalog support with performance-optimized parsing (5x improvement)
- `src/installations.ts` - Global installation tracking and management
- `src/lockfile.ts` - Lock file management with v0/v1 format migration support

**Utility Modules:**

- `src/pkg.ts` - Package.json manifest reading/writing with type safety
- `src/pm.ts` - Package manager detection (npm/yarn/pnpm) and command abstraction
- `src/sync-dir.ts` - High-performance directory synchronization with caching
- `src/console.ts` - Console output utilities with color support
- `src/check.ts` - Dependency validation for git hooks
- `src/rc.ts` - Configuration file support (.yalcrc)

### Key Architectural Patterns

**Package Manager Agnostic:** The `pm.ts` module abstracts package manager differences, supporting npm, yarn, and pnpm with unified command interfaces.

**Workspace Protocol Support:** Full support for `workspace:*`, `workspace:^`, and `workspace:~` protocols with automatic resolution during publishing.

**Advanced Catalog System:** The `catalog.ts` module implements sophisticated PNPM catalog support with:

- Bounded LRU cache with mtime-based invalidation
- Early termination YAML parsing (70% performance improvement)
- Memory-efficient reference sharing (82% reduction)

**Installation Tracking:** Global registry in `installations.ts` tracks where packages are installed across your local environment, enabling push operations to propagate updates automatically.

**Type Safety:** Comprehensive TypeScript interfaces throughout, with branded types like `PackageName` for domain safety.

## File Organization

### Source Structure

- TypeScript source files are in `src/` with strict type checking enabled
- Both `.ts` source and compiled `.js` artifacts are present (build artifacts should be cleaned up)
- Each module focuses on a single responsibility area

### Configuration

- `tsconfig.json` - TypeScript compilation settings (currently ES5 target, should be modernized)
- `tslint.json` - Linting configuration (deprecated, needs ESLint migration)
- `.yalcrc` - Runtime configuration for default yalc options

### Testing

- `test/index.ts` - Main integration test suite (517 lines) with comprehensive workflow testing
- `test/catalog-comprehensive-test.ts` - Specialized catalog feature tests
- `test/fixture/` - Test fixtures with realistic package scenarios
- Uses Mocha framework with real filesystem operations (not mocked)

## Key Workflows

### Package Publishing Flow

1. `yalc publish` → `publish.ts` → `copy.ts` (with workspace resolution) → global store
2. Lifecycle scripts: `prepublish`, `prepare`, `prepublishOnly`, `prepack`, `preyalcpublish` (before)
3. Post scripts: `postyalcpublish`, `postpack`, `publish`, `postpublish` (after)

### Package Addition Flow

1. `yalc add <package>` → `add.ts` → copy from store to `.yalc/` folder
2. Package.json modification with `file:` or `link:` dependency
3. Lock file update in `lockfile.ts`
4. Installation tracking in `installations.ts`

### Update/Push Propagation

1. `yalc push` → publishes and pushes to all tracked installations
2. Uses installation registry to find all locations where package is used
3. Performs update operations across all installations

## Development Notes

### TypeScript Configuration

- Strict mode enabled with comprehensive type checking
- ES5 target (legacy, should be modernized to ES2018+)
- Source maps and declarations generated
- CommonJS module system (should consider ESM migration)

### Testing Strategy

- Integration-heavy testing with real filesystem operations
- Comprehensive fixtures for realistic scenarios
- Cross-platform compatibility testing needed
- Performance testing in catalog module demonstrates optimization patterns

### Package Manager Support

The `pm.ts` module provides unified interfaces for:

- Command detection: `getPackageManager(cwd)`
- Script execution: `getRunScriptCmd(cwd)`
- Install commands: `getPackageManagerInstallCmd(cwd)`

### Performance Considerations

- Catalog module showcases advanced caching patterns
- Directory sync operations use content-based comparison
- Early termination parsing for large YAML files
- Memory-efficient data structures with reference sharing

## CLI Command Architecture

All CLI commands are defined in `src/yalc.ts` using yargs:

- `publish` - Publish package to store
- `push` - Publish and propagate to installations
- `add` - Add package from store
- `link` - Create symlink from store
- `update` - Update packages
- `remove`/`retreat` - Remove packages (with restore capability)
- `check` - Validate dependencies
- `installations` - Manage installation registry

Each command maps to corresponding functions in the core operation modules.

## Code Style Guidelines

### Type Safety Rules

- **NEVER USE TYPE CASTING**: No `as string`, `as boolean`, `as any`, etc. Use proper TypeScript types and interfaces
- **NEVER USE `any` TYPE**: Always use proper typing - `unknown` if absolutely necessary, but prefer specific types
- **TYPE SAFETY FIRST**: Fix type issues with proper interfaces and type definitions, not suppressions
- **NO COMMENTS**: Do not add code comments unless explicitly requested

### TypeScript Best Practices

- Define proper interfaces for function parameters and return types
- Use union types, optional properties, and type guards instead of casting
- Leverage TypeScript's strict mode capabilities
- Use branded types for domain safety where appropriate
