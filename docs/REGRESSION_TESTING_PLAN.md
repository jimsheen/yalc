# Regression Testing Plan for YALC Modernization

**Purpose:** Ensure 100% functional parity during technology stack modernization
**Scope:** All YALC functionality, CLI commands, APIs, and file formats
**Approach:** Comprehensive verification at every migration step

---

## Testing Philosophy: Zero Tolerance for Regressions

**Golden Rule:** Every single existing feature must work **exactly** as before, with **identical behavior**.

**Verification Strategy:**

1. **Snapshot Testing** - Capture current behavior as baseline
2. **Differential Testing** - Compare before/after for every change
3. **End-to-End Validation** - Real-world workflow testing
4. **Automated Regression Detection** - Continuous verification

---

## 1. Test Environment Setup

### Baseline Capture (Before Any Changes)

```bash
#!/bin/bash
# scripts/capture-baseline.sh

echo "Capturing YALC baseline behavior..."

# 1. Create test workspace
mkdir -p test-workspace/{package-a,package-b,consumer}

# 2. Setup test packages
cd test-workspace/package-a
npm init -y
echo "export const version = '1.0.0'" > index.js

cd ../package-b
npm init -y
echo "export const name = 'package-b'" > index.js

cd ../consumer
npm init -y

# 3. Capture all yalc operations
cd ../package-a
yalc publish > ../../baselines/publish-output.txt 2>&1
yalc installations show > ../../baselines/installations-before.txt 2>&1

cd ../consumer
yalc add package-a > ../../baselines/add-output.txt 2>&1
yalc list > ../../baselines/list-output.txt 2>&1
yalc update > ../../baselines/update-output.txt 2>&1
yalc remove package-a > ../../baselines/remove-output.txt 2>&1

# 4. Capture file system state
find ~/.yalc -type f | sort > ../../baselines/yalc-store-files.txt
find . -name "yalc.lock" -exec cat {} \; > ../../baselines/lockfiles.txt
find . -name "package.json" -exec cat {} \; > ../../baselines/package-jsons.txt

echo "Baseline captured in ./baselines/"
```

### Regression Test Suite Creation

```bash
#!/bin/bash
# scripts/test-regression.sh

BASELINE_DIR="./baselines"
CURRENT_DIR="./current-test"

function run_regression_test() {
    local test_name="$1"
    echo "Running regression test: $test_name"

    # Clean slate
    rm -rf $CURRENT_DIR
    mkdir -p $CURRENT_DIR

    # Run the same operations
    source scripts/capture-baseline.sh

    # Compare outputs
    for baseline_file in $BASELINE_DIR/*.txt; do
        filename=$(basename "$baseline_file")
        current_file="$CURRENT_DIR/$filename"

        if ! diff -u "$baseline_file" "$current_file"; then
            echo "❌ REGRESSION DETECTED in $filename"
            echo "Expected:"
            cat "$baseline_file"
            echo -e "\nActual:"
            cat "$current_file"
            return 1
        fi
    done

    echo "✅ $test_name: No regressions detected"
    return 0
}
```

---

## 2. Command-Level Testing

### CLI Command Compatibility Matrix

**Test every command variation with exact output matching:**

```typescript
// test/cli-compatibility.test.ts

const CLI_COMMANDS = [
  // Basic commands
  { cmd: 'yalc --version', expectedPattern: /^2\.0\.0-alpha\.1$/ },
  { cmd: 'yalc --help', expectedPattern: /Local package development tool/ },

  // Publish variations
  { cmd: 'yalc publish', context: 'valid-package' },
  { cmd: 'yalc publish --sig', context: 'valid-package' },
  { cmd: 'yalc publish --workspace', context: 'workspace-package' },
  { cmd: 'yalc publish --scripts', context: 'package-with-scripts' },
  { cmd: 'yalc publish --dev-mod', context: 'valid-package' },

  // Add variations
  { cmd: 'yalc add test-package', context: 'consumer' },
  { cmd: 'yalc add test-package --dev', context: 'consumer' },
  { cmd: 'yalc add test-package --link', context: 'consumer' },
  { cmd: 'yalc add test-package --pure', context: 'consumer' },
  { cmd: 'yalc add test-package --workspace', context: 'workspace-consumer' },

  // Update variations
  { cmd: 'yalc update', context: 'consumer-with-packages' },
  { cmd: 'yalc update test-package', context: 'consumer-with-packages' },
  { cmd: 'yalc update --replace', context: 'consumer-with-packages' },

  // Remove variations
  { cmd: 'yalc remove test-package', context: 'consumer-with-packages' },
  { cmd: 'yalc remove --all', context: 'consumer-with-packages' },
  { cmd: 'yalc retreat test-package', context: 'consumer-with-packages' },

  // Utility commands
  { cmd: 'yalc check', context: 'consumer-with-packages' },
  { cmd: 'yalc installations show', context: 'any' },
  { cmd: 'yalc installations clean', context: 'any' },
  { cmd: 'yalc dir', context: 'any' },
]

describe('CLI Command Compatibility', () => {
  CLI_COMMANDS.forEach(({ cmd, expectedPattern, context }) => {
    it(`should preserve exact behavior for: ${cmd}`, async () => {
      const baseline = await getBaselineOutput(cmd, context)
      const current = await execCommand(cmd, context)

      // Exact string comparison for deterministic output
      if (baseline.deterministic) {
        expect(current.stdout).toBe(baseline.stdout)
        expect(current.stderr).toBe(baseline.stderr)
        expect(current.exitCode).toBe(baseline.exitCode)
      }

      // Pattern matching for version numbers, timestamps, etc.
      if (expectedPattern) {
        expect(current.stdout).toMatch(expectedPattern)
      }

      // Functional verification - file system state
      const baselineFiles = await getFileSystemState(context)
      const currentFiles = await getFileSystemState(context)
      expect(currentFiles).toEqual(baselineFiles)
    })
  })
})
```

---

## 3. API Compatibility Testing

### Programmatic API Verification

```typescript
// test/api-compatibility.test.ts

describe('Programmatic API Compatibility', () => {
  // Test all exported functions maintain exact signatures
  it('should preserve all function signatures', () => {
    const yalc = require('../src/index')

    const expectedExports = {
      publishPackage: { arity: 1, returns: 'Promise' },
      addPackages: { arity: 2, returns: 'Promise' },
      updatePackages: { arity: 2, returns: 'Promise' },
      removePackages: { arity: 2, returns: 'Promise' },
      readPackageManifest: { arity: 1, returns: 'object' },
      writePackageManifest: { arity: 2, returns: 'void' },
      // ... complete API surface
    }

    Object.entries(expectedExports).forEach(([name, spec]) => {
      expect(yalc[name]).toBeTypeOf('function')
      expect(yalc[name].length).toBe(spec.arity)
    })
  })

  // Test identical behavior for all functions
  it('should produce identical results for publishPackage', async () => {
    const options = {
      workingDir: './test/fixtures/simple-package',
      signature: true,
    }

    const baseline = await getBaselineResult('publishPackage', options)
    const current = await yalc.publishPackage(options)

    expect(current).toEqual(baseline)
  })
})
```

### File Format Compatibility

```typescript
// test/file-format-compatibility.test.ts

describe('File Format Compatibility', () => {
  it('should generate identical yalc.lock format', async () => {
    await setupTestScenario('workspace-with-dependencies')

    const baselineLock = await readFile('./baseline/yalc.lock', 'utf8')
    await yalc.addPackages(['test-package'], { workingDir: './test-workspace' })
    const currentLock = await readFile('./test-workspace/yalc.lock', 'utf8')

    // Parse and compare structure (ignore timestamps)
    const baselineParsed = JSON.parse(baselineLock)
    const currentParsed = JSON.parse(currentLock)

    delete baselineParsed.timestamp
    delete currentParsed.timestamp

    expect(currentParsed).toEqual(baselineParsed)
  })

  it('should modify package.json identically', async () => {
    const baselinePackage = await getBaselinePackageJson()

    await yalc.addPackages(['test-package'], { workingDir: './test-workspace' })
    const currentPackage = await readPackageJson('./test-workspace')

    // Verify identical dependency additions
    expect(currentPackage.dependencies).toEqual(baselinePackage.dependencies)
    expect(currentPackage.devDependencies).toEqual(
      baselinePackage.devDependencies
    )
  })
})
```

---

## 4. Performance Regression Testing

### Performance Baseline Capture

```typescript
// test/performance-regression.test.ts

describe('Performance Regression', () => {
  const PERFORMANCE_THRESHOLDS = {
    'yalc publish': { maxTime: 2000, baseline: null },
    'yalc add': { maxTime: 1000, baseline: null },
    'yalc update': { maxTime: 1500, baseline: null },
    'catalog resolution': { maxTime: 500, baseline: null },
  }

  beforeAll(async () => {
    // Capture baseline performance
    for (const [operation, threshold] of Object.entries(
      PERFORMANCE_THRESHOLDS
    )) {
      const startTime = performance.now()
      await runOperation(operation)
      const endTime = performance.now()
      threshold.baseline = endTime - startTime
    }
  })

  Object.entries(PERFORMANCE_THRESHOLDS).forEach(([operation, threshold]) => {
    it(`should not regress performance for ${operation}`, async () => {
      const startTime = performance.now()
      await runOperation(operation)
      const endTime = performance.now()
      const duration = endTime - startTime

      // Should be within 10% of baseline or absolute threshold
      const allowedTime = Math.max(threshold.baseline * 1.1, threshold.maxTime)

      expect(duration).toBeLessThan(allowedTime)
    })
  })
})
```

---

## 5. Integration Testing Scenarios

### Real-World Workflow Testing

```typescript
// test/integration-workflows.test.ts

describe('Real-World Workflow Integration', () => {
  const WORKFLOW_SCENARIOS = [
    'simple-publish-and-consume',
    'workspace-with-catalog',
    'monorepo-with-multiple-packages',
    'package-with-peer-dependencies',
    'linked-development-workflow',
    'retreat-and-restore-cycle',
  ]

  WORKFLOW_SCENARIOS.forEach((scenario) => {
    it(`should handle ${scenario} workflow identically`, async () => {
      // Load scenario definition
      const workflow = await loadWorkflowScenario(scenario)

      // Execute baseline workflow
      const baselineState = await executeWorkflow(workflow, 'baseline')

      // Execute current implementation
      const currentState = await executeWorkflow(workflow, 'current')

      // Compare all aspects
      expect(currentState.fileSystem).toEqual(baselineState.fileSystem)
      expect(currentState.packageJsons).toEqual(baselineState.packageJsons)
      expect(currentState.lockFiles).toEqual(baselineState.lockFiles)
      expect(currentState.yalcStore).toEqual(baselineState.yalcStore)
      expect(currentState.outputs).toEqual(baselineState.outputs)
    })
  })
})
```

---

## 6. Migration Testing Strategy

### Phase-by-Phase Verification

```bash
#!/bin/bash
# scripts/test-migration-phase.sh

function test_migration_phase() {
    local phase="$1"
    echo "Testing migration phase: $phase"

    # 1. Run full regression suite before change
    npm run test:regression:baseline

    # 2. Apply migration phase
    case $phase in
        "typescript-upgrade")
            npm install typescript@latest @types/node@latest --save-dev
            ;;
        "tsup-integration")
            npm install tsup --save-dev
            # Configure tsup.config.ts
            ;;
        "pnpm-migration")
            pnpm install --frozen-lockfile
            ;;
        *)
            echo "Unknown phase: $phase"
            exit 1
            ;;
    esac

    # 3. Build with new configuration
    npm run build

    # 4. Run full regression suite after change
    npm run test:regression:current

    # 5. Compare results
    if ! diff -r ./baselines ./current-results; then
        echo "❌ REGRESSION DETECTED in $phase"
        echo "Rolling back changes..."
        git reset --hard HEAD
        return 1
    fi

    echo "✅ $phase: Migration successful, no regressions"
    return 0
}

# Test each phase individually
test_migration_phase "typescript-upgrade"
test_migration_phase "tsup-integration"
test_migration_phase "pnpm-migration"
```

---

## 7. Continuous Regression Monitoring

### Automated Regression Detection

```json
{
  "scripts": {
    "test:regression": "npm run test:regression:cli && npm run test:regression:api && npm run test:regression:integration",
    "test:regression:cli": "jest test/cli-compatibility.test.ts",
    "test:regression:api": "jest test/api-compatibility.test.ts",
    "test:regression:integration": "jest test/integration-workflows.test.ts",
    "test:regression:performance": "jest test/performance-regression.test.ts",

    "precommit": "npm run test:regression",
    "prepublish": "npm run test:regression:full"
  }
}
```

### Git Hooks Integration

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running regression tests before commit..."

if ! npm run test:regression; then
    echo "❌ Regression tests failed. Commit blocked."
    echo "Please fix regressions before committing."
    exit 1
fi

echo "✅ All regression tests passed. Proceeding with commit."
```

---

## 8. Test Data Management

### Fixture Management

```
test/fixtures/
├── simple-package/              # Basic package for testing
├── workspace-with-catalog/      # pnpm workspace with catalog
├── monorepo-complex/           # Multi-package monorepo
├── package-with-scripts/      # Package with pre/post scripts
├── linked-packages/           # Symlinked development setup
└── baselines/                # Captured baseline behavior
    ├── cli-outputs/          # All CLI command outputs
    ├── file-states/          # File system snapshots
    ├── api-results/          # Programmatic API results
    └── performance/          # Performance benchmarks
```

### Dynamic Test Environment

```typescript
// test/utils/test-environment.ts

export class TestEnvironment {
  private tempDir: string

  async setup(scenario: string) {
    this.tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'yalc-test-'))
    await fs.copy(`./test/fixtures/${scenario}`, this.tempDir)
    process.chdir(this.tempDir)
  }

  async teardown() {
    process.chdir(process.cwd())
    await fs.remove(this.tempDir)
  }

  async captureState(): Promise<TestState> {
    return {
      fileSystem: await this.getFileSystemSnapshot(),
      packageJsons: await this.getAllPackageJsons(),
      lockFiles: await this.getAllLockFiles(),
      yalcStore: await this.getYalcStoreState(),
    }
  }
}
```

---

## 9. Success Criteria

### Zero Regression Requirements

**All tests must pass with 100% compatibility:**

1. ✅ **CLI Command Compatibility** - Every command produces identical output
2. ✅ **API Compatibility** - All functions return identical results
3. ✅ **File Format Compatibility** - All generated files maintain format
4. ✅ **Performance Compatibility** - No performance regressions >10%
5. ✅ **Integration Compatibility** - All real-world workflows unchanged

### Automated Quality Gates

```bash
# All must pass for each migration step
npm run test:regression:full
npm run test:performance
npm run test:compatibility
npm run lint
npm run build
```

---

## 10. Rollback Procedures

### Immediate Rollback Capability

```bash
#!/bin/bash
# scripts/rollback.sh

function rollback_migration() {
    echo "🚨 Rolling back YALC modernization..."

    # 1. Restore package manager
    if [ -f "yarn.lock.backup" ]; then
        rm -f pnpm-lock.yaml
        mv yarn.lock.backup yarn.lock
        yarn install
    fi

    # 2. Restore build system
    git checkout package.json
    rm -f tsup.config.ts

    # 3. Restore dependencies
    npm install

    # 4. Verify rollback
    npm run test:regression:baseline

    echo "✅ Rollback complete. System restored to baseline."
}
```

---

## Implementation Instructions

### Phase 1: Setup Regression Testing (Day 1)

```bash
# 1. Capture current baseline
npm run capture:baseline

# 2. Create test suite
npm install --save-dev jest @types/jest

# 3. Run baseline tests
npm run test:regression

# 4. Verify 100% pass rate
echo "Baseline established ✅"
```

### Phase 2: Migration with Continuous Testing

```bash
# For each migration step:
npm run test:regression:before
# Apply change
npm run test:regression:after
# Compare and verify
```

**This regression testing plan ensures that YALC modernization maintains 100% functional compatibility while gaining the benefits of modern tooling.**

---

_Zero regressions. Zero compromises. Zero risk._
