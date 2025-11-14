# Mocha to Vitest Migration Plan

## Overview

This document outlines the comprehensive migration from Mocha to Vitest for all integration and regression tests in the YALC project. The goal is to unify the testing ecosystem under Vitest for consistency, performance, and modern testing features.

## Current State

### Test Structure

```
src/
├── core/__tests__/              ✅ Already using Vitest
├── package/__tests__/           ✅ Already using Vitest
└── catalog/__tests__/           ✅ Already using Vitest

tests/
├── integration/
│   ├── index.ts                 ❌ Using Mocha + Node assert
│   └── catalog-comprehensive-test.ts  ❌ Using Mocha + Node assert
└── regression/
    └── regression.test.ts       ✅ Already using Vitest
```

### Dependencies

- **Mocha**: `"mocha": "^8.0.1"` (to be removed)
- **Vitest**: `"vitest": "^4.0.8"` (already present)
- **Node Assert**: Using `assert` module (to be replaced with Vitest expect)

## Migration Strategy

### Phase 1: Setup & Configuration ⏱️ ~30 minutes

#### 1.1 Update Vitest Configuration

Create or update `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      'tests/integration/fixture',
      'tests/integration/tmp',
      'tests/regression/baselines',
    ],
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
    globals: false,
    environment: 'node',
  },
})
```

#### 1.2 Update TypeScript Configuration

Create `tsconfig.test.json` if it doesn't exist:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["vitest/globals", "node"]
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Phase 2: Convert Integration Tests ⏱️ ~2 hours

#### 2.1 API Mapping Reference

| Mocha/Assert               | Vitest                             | Notes             |
| -------------------------- | ---------------------------------- | ----------------- |
| `describe()`               | `describe()`                       | Same API          |
| `it()`                     | `it()` or `test()`                 | Same API          |
| `before()`                 | `beforeAll()`                      | Different name    |
| `beforeEach()`             | `beforeEach()`                     | Same API          |
| `after()`                  | `afterAll()`                       | Different name    |
| `afterEach()`              | `afterEach()`                      | Same API          |
| `strictEqual(a, b)`        | `expect(a).toBe(b)`                | Strict equality   |
| `deepEqual(a, b)`          | `expect(a).toEqual(b)`             | Deep equality     |
| `ok(value)`                | `expect(value).toBeTruthy()`       | Truthy check      |
| `throws(() => fn())`       | `expect(() => fn()).toThrow()`     | Exception testing |
| `doesNotThrow(() => fn())` | `expect(() => fn()).not.toThrow()` | No exception      |

#### 2.2 Convert `tests/integration/index.ts`

**Before:**

```typescript
import { doesNotThrow, throws, deepEqual, ok, strictEqual } from 'assert'

describe('Integration Tests', () => {
  before(() => {
    // setup
  })

  it('should work', () => {
    strictEqual(result, expected)
    deepEqual(obj1, obj2)
    ok(value)
    throws(() => badFunction())
  })
})
```

**After:**

```typescript
import {
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  expect,
} from 'vitest'

describe('Integration Tests', () => {
  beforeAll(() => {
    // setup
  })

  it('should work', () => {
    expect(result).toBe(expected)
    expect(obj1).toEqual(obj2)
    expect(value).toBeTruthy()
    expect(() => badFunction()).toThrow()
  })
})
```

#### 2.3 Convert `tests/integration/catalog-comprehensive-test.ts`

Similar conversion pattern applying the API mapping above.

#### 2.4 File Import Updates

Update import paths where needed:

```typescript
// Before: May need compiled paths
import { something } from '../src/module'

// After: Direct TypeScript imports work with Vitest
import { something } from '../../src/module' // Adjust path as needed
```

### Phase 3: Update Package Scripts ⏱️ ~15 minutes

#### 3.1 Remove Mocha Dependencies

```bash
pnpm remove mocha @types/mocha ts-node-dev
```

#### 3.2 Update package.json Scripts

**Before:**

```json
{
  "scripts": {
    "build:tsc": "tsc -p tsconfig.test.json",
    "test": "pnpm run build:tsc && mocha test && pnpm run lint:check",
    "test:mocha": "pnpm run build:tsc && mocha test",
    "test:all": "pnpm run test:mocha && pnpm run test:vitest",
    "test:full": "pnpm run test:unit && pnpm run test:mocha && pnpm run test:regression",
    "test-dev": "ts-node-dev -T --respawn node_modules/mocha/bin/mocha test/index.ts"
  }
}
```

**After:**

```json
{
  "scripts": {
    "test": "vitest run && pnpm run lint:check",
    "test:unit": "vitest run src",
    "test:integration": "vitest run tests/integration",
    "test:regression": "vitest run tests/regression",
    "test:all": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### Phase 4: Testing & Validation ⏱️ ~30 minutes

#### 4.1 Run Converted Tests

```bash
# Test individual suites
pnpm run test:unit
pnpm run test:integration
pnpm run test:regression

# Test everything
pnpm run test:all

# Verify coverage works
pnpm run test:coverage
```

#### 4.2 Compare Test Results

Ensure all tests that passed with Mocha also pass with Vitest:

1. **Unit Tests**: 107 tests should still pass ✅
2. **Integration Tests**: All existing integration tests should pass
3. **Regression Tests**: All regression tests should pass

#### 4.3 Performance Comparison

Monitor test execution times:

- **Before**: Mocha + compilation step
- **After**: Vitest native TypeScript

Expected improvement: 50-70% faster execution.

### Phase 5: Cleanup ⏱️ ~15 minutes

#### 5.1 Remove Mocha Files

```bash
rm -f tsconfig.test.json  # If no longer needed for other tools
```

#### 5.2 Update Documentation

- Update README.md test instructions
- Update CONTRIBUTING.md if it exists
- Update CI/CD pipeline documentation

#### 5.3 Update CI Configuration

If using GitHub Actions or other CI:

```yaml
# Before
- name: Run Tests
  run: pnpm run build:tsc && pnpm run test:mocha

# After
- name: Run Tests
  run: pnpm run test
```

## Detailed Conversion Examples

### Complex Assertion Patterns

#### Before (Mocha + Assert):

```typescript
import { strictEqual, deepEqual, ok, throws, doesNotThrow } from 'assert'

// Complex object comparison
const expected = { packages: {}, version: 'v1' }
deepEqual(lockFile, expected)

// Array length checks
ok(installations.length > 0)
strictEqual(installations.length, 3)

// Exception with specific message
throws(() => {
  readPackageManifest('/nonexistent')
}, /Could not read/)

// File existence checks
ok(fs.existsSync(packagePath))
```

#### After (Vitest):

```typescript
import { describe, it, expect } from 'vitest'

// Complex object comparison
const expected = { packages: {}, version: 'v1' }
expect(lockFile).toEqual(expected)

// Array length checks
expect(installations.length).toBeGreaterThan(0)
expect(installations).toHaveLength(3)

// Exception with specific message
expect(() => {
  readPackageManifest('/nonexistent')
}).toThrow(/Could not read/)

// File existence checks
expect(fs.existsSync(packagePath)).toBe(true)
```

### Async Test Patterns

#### Before (Mocha):

```typescript
describe('Async Operations', () => {
  it('should handle promises', async () => {
    const result = await publishPackage(options)
    strictEqual(result.success, true)
  })

  it('should handle callbacks', (done) => {
    someAsyncFunction((err, result) => {
      if (err) return done(err)
      strictEqual(result, expected)
      done()
    })
  })
})
```

#### After (Vitest):

```typescript
describe('Async Operations', () => {
  it('should handle promises', async () => {
    const result = await publishPackage(options)
    expect(result.success).toBe(true)
  })

  // Vitest has better async support, callbacks less needed
  it('should handle async operations', async () => {
    const result = await promisify(someAsyncFunction)()
    expect(result).toBe(expected)
  })
})
```

### Setup/Teardown Patterns

#### Before (Mocha):

```typescript
describe('Test Suite', function () {
  this.timeout(10000) // Mocha-specific timeout

  before(() => {
    // Global setup
  })

  beforeEach(() => {
    // Per-test setup
  })

  after(() => {
    // Global cleanup
  })

  afterEach(() => {
    // Per-test cleanup
  })
})
```

#### After (Vitest):

```typescript
describe(
  'Test Suite',
  () => {
    beforeAll(() => {
      // Global setup
    })

    beforeEach(() => {
      // Per-test setup
    })

    afterAll(() => {
      // Global cleanup
    })

    afterEach(() => {
      // Per-test cleanup
    })
  },
  { timeout: 10000 },
) // Vitest timeout syntax
```

## Risk Assessment & Mitigation

### Low Risk Items ✅

- **API Similarity**: Describe/it structure is identical
- **Async Support**: Vitest has excellent async/await support
- **TypeScript**: Native TS support, no compilation needed

### Medium Risk Items ⚠️

- **Assertion Migration**: Need to carefully map all assertion patterns
- **Timeout Configuration**: Different timeout syntax between Mocha/Vitest
- **File Imports**: May need path adjustments

### Mitigation Strategies

1. **Incremental Migration**: Convert one file at a time
2. **Side-by-side Testing**: Keep both test runners until migration complete
3. **Comprehensive Testing**: Run full test suite after each conversion
4. **Rollback Plan**: Keep Mocha scripts until confident in Vitest migration

## Timeline Estimate

| Phase                   | Duration      | Parallel Work                   |
| ----------------------- | ------------- | ------------------------------- |
| Phase 1: Setup          | 30 minutes    | No                              |
| Phase 2: Convert Tests  | 2 hours       | Can split files among team      |
| Phase 3: Update Scripts | 15 minutes    | No                              |
| Phase 4: Testing        | 30 minutes    | No                              |
| Phase 5: Cleanup        | 15 minutes    | No                              |
| **Total**               | **3.5 hours** | **~2 hours with parallel work** |

## Success Criteria

✅ **All existing tests pass with Vitest**
✅ **No Mocha dependencies remaining**
✅ **Faster test execution (50-70% improvement expected)**
✅ **Unified test commands and workflow**
✅ **No compilation step required for tests**
✅ **Better error messages and debugging experience**

## Post-Migration Benefits

1. **Developer Experience**: Single test runner, faster feedback
2. **CI/CD**: Faster builds, no compilation step
3. **Maintainability**: Consistent test patterns across codebase
4. **Modern Features**: Watch mode, UI, better coverage reports
5. **Future-Proof**: Vitest is actively developed and modern

---

## Implementation Checklist

- [ ] Phase 1: Update Vitest config and TypeScript setup
- [ ] Phase 2: Convert `tests/integration/index.ts`
- [ ] Phase 2: Convert `tests/integration/catalog-comprehensive-test.ts`
- [ ] Phase 3: Update package.json scripts
- [ ] Phase 3: Remove Mocha dependencies
- [ ] Phase 4: Validate all tests pass
- [ ] Phase 4: Performance comparison
- [ ] Phase 5: Documentation updates
- [ ] Phase 5: Clean up old configuration files

**Ready to proceed? Start with Phase 1 to set up the foundation.**
