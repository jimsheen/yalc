# Using YALC Configuration with TypeScript

The configuration types are now exported and can be imported in both TypeScript and JavaScript (ESM) files.

## TypeScript Configuration File (.yalcrc.ts)

```typescript
import type { YalcConfig } from '@jimsheen/yalc'

const config: YalcConfig = {
  'workspace-resolve': false,
  sig: true,
  'dev-mod': false,
  scripts: true,
  quiet: false,
  files: true,
}

export default config
```

## JavaScript ESM Configuration File (.yalcrc.mjs)

```javascript
/** @type {import('@jimsheen/yalc').YalcConfig} */
const config = {
  'workspace-resolve': false,
  sig: true,
  'dev-mod': false,
  scripts: true,
  quiet: false,
  files: true,
}

export default config
```

## Import Options

### Import from main package

```typescript
import type {
  YalcConfig,
  YalcConfigResolved,
  ConfigValidationResult,
} from '@jimsheen/yalc'
```

### Import from dedicated config submodule

```typescript
import type {
  YalcConfig,
  YalcConfigResolved,
  ConfigValidationResult,
} from '@jimsheen/yalc/config'
```

## Available Types

- `YalcConfig` - Configuration interface with all options as optional
- `YalcConfigResolved` - Complete configuration with all defaults applied (all required)
- `ConfigValidationResult` - Result of configuration validation including errors and unknown keys

## Configuration Options

All configuration options are documented with JSDoc comments in the TypeScript definitions:

- `workspace-resolve?: boolean` - Whether to resolve workspace: protocol dependencies (default: true)
- `sig?: boolean` - Whether to generate package integrity signatures (default: false)
- `dev-mod?: boolean` - Whether to include devDependencies in published packages (default: true)
- `scripts?: boolean` - Whether to run npm lifecycle scripts during publish (default: true)
- `quiet?: boolean` - Whether to suppress console output (default: false)
- `files?: boolean` - Whether to use package.json files field to determine what to publish (default: false)
