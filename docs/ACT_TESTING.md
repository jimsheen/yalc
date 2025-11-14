# Local GitHub Actions Testing with act

This document explains how to test GitHub Actions workflows locally using `act`.

## Setup

Run the setup script to configure everything:

```bash
./scripts/setup-act.sh
```

## Testing Commands

### Quick Tests

```bash
# Quick CI test
npm run test:quick

# Test CI workflow only
npm run test:ci-local

# Test release workflow (dry run)
npm run test:release-local
```

### Comprehensive Testing

```bash
# Run all tests
npm run test:workflows

# Or use the script directly
./scripts/test-workflows.sh all
```

### Manual Testing

```bash
# List available workflows
act --list

# Test specific workflow
act push -W .github/workflows/ci.yml

# Test with specific event
act workflow_dispatch -W .github/workflows/release.yml \
  --eventpath <(echo '{"inputs": {"dry_run": "true"}}')
```

## Configuration Files

- `.actrc` - act configuration
- `.secrets` - Local testing secrets (dummy values)
- `scripts/test-workflows.sh` - Main testing script
- `scripts/quick-test.sh` - Quick CI test

## Troubleshooting

### Docker Issues

```bash
# Check Docker is running
docker info

# Pull required images manually
docker pull catthehacker/ubuntu:act-latest
```

### Permission Issues

```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### act Issues

```bash
# Verbose output for debugging
act --verbose

# Use specific platform
act --container-architecture linux/amd64
```

## What Gets Tested

- **CI Workflow:** TypeScript compilation, ESLint, tests, build
- **Release Workflow:** Semantic release (dry run mode)
- **Quality Gates:** All validation steps
- **Performance:** Workflow execution time

## Limitations

- npm audit signatures is skipped (requires real registry)
- NPM publishing is in dry-run mode only
- Some GitHub-specific features may not work identically
