#!/bin/bash

# Setup script for act local testing environment
# Configures act for testing YALC GitHub Actions workflows

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE} $1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Create .secrets file if it doesn't exist
setup_secrets() {
    print_header "Setting up Local Testing Secrets"

    if [[ ! -f .secrets ]]; then
        print_info "Creating .secrets file for act..."
        cat > .secrets <<EOF
# Local testing secrets (DO NOT COMMIT REAL SECRETS)
# These are dummy values for testing workflows locally
GITHUB_TOKEN=dummy_github_token_for_testing
NPM_TOKEN=dummy_npm_token_for_testing
NODE_AUTH_TOKEN=dummy_node_auth_token_for_testing
EOF
        print_success "Created .secrets file"
    else
        print_info ".secrets file already exists"
    fi

    # Ensure .secrets is in .gitignore
    if ! grep -q "^.secrets$" .gitignore 2>/dev/null; then
        echo ".secrets" >> .gitignore
        print_success "Added .secrets to .gitignore"
    fi
}

# Create act configuration
setup_act_config() {
    print_header "Setting up act Configuration"

    if [[ ! -f .actrc ]]; then
        print_info "Creating .actrc configuration..."
        cat > .actrc <<EOF
# act configuration for YALC workflow testing
--container-architecture linux/amd64
-P ubuntu-latest=catthehacker/ubuntu:act-latest

# Use local secrets file
--secret-file .secrets

# Environment variables
--env GITHUB_REPOSITORY=jimsheen/yalc
--env CI=true
--env GITHUB_ACTIONS=true
--env ACT=true

# Logging
--verbose
EOF
        print_success "Created .actrc configuration"
    else
        print_info ".actrc already exists"
    fi
}

# Pull required Docker images
setup_docker_images() {
    print_header "Setting up Docker Images"

    print_info "Pulling required Docker images for act..."

    # Pull the main runner image
    if docker pull catthehacker/ubuntu:act-latest; then
        print_success "Pulled catthehacker/ubuntu:act-latest"
    else
        print_warning "Failed to pull Docker image. Will download on first run."
    fi
}

# Create quick test script
create_quick_test() {
    print_header "Creating Quick Test Script"

    cat > scripts/quick-test.sh <<'EOF'
#!/bin/bash

# Quick test script for CI workflow
echo "🧪 Running quick CI test..."

if act push -W .github/workflows/ci.yml \
    --eventpath <(echo '{"ref": "refs/heads/main"}') \
    --job test \
    --artifact-server-path /tmp/artifacts; then
    echo "✅ Quick test passed!"
else
    echo "❌ Quick test failed!"
    exit 1
fi
EOF

    chmod +x scripts/quick-test.sh
    print_success "Created scripts/quick-test.sh"
}

# Create npm scripts
setup_npm_scripts() {
    print_header "Adding npm Scripts"

    # Add act testing scripts to package.json
    npm pkg set scripts.test:workflows="./scripts/test-workflows.sh all"
    npm pkg set scripts.test:ci-local="./scripts/test-workflows.sh ci"
    npm pkg set scripts.test:release-local="./scripts/test-workflows.sh release"
    npm pkg set scripts.test:quick="./scripts/quick-test.sh"

    print_success "Added workflow testing scripts to package.json:"
    echo "  npm run test:workflows      - Run all workflow tests"
    echo "  npm run test:ci-local       - Test CI workflow only"
    echo "  npm run test:release-local  - Test release workflow (dry run)"
    echo "  npm run test:quick          - Quick CI test"
}

# Validate setup
validate_setup() {
    print_header "Validating Setup"

    # Check act is installed
    if command -v act &> /dev/null; then
        print_success "act is installed: $(act --version)"
    else
        print_warning "act is not installed. Install with: brew install act"
        return 1
    fi

    # Check Docker is running
    if docker info &> /dev/null; then
        print_success "Docker is running"
    else
        print_warning "Docker is not running. Please start Docker."
        return 1
    fi

    # Check configuration files
    if [[ -f .actrc && -f .secrets ]]; then
        print_success "Configuration files created"
    else
        print_warning "Missing configuration files"
        return 1
    fi

    print_success "Setup validation complete!"
}

# Create documentation
create_docs() {
    print_header "Creating Documentation"

    cat > docs/ACT_TESTING.md <<'EOF'
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
EOF

    print_success "Created docs/ACT_TESTING.md"
}

# Main setup function
main() {
    print_header "YALC act Testing Setup"

    setup_secrets
    setup_act_config
    setup_docker_images
    create_quick_test
    setup_npm_scripts
    create_docs
    validate_setup

    print_header "Setup Complete! 🚀"
    echo ""
    print_info "Next steps:"
    echo "  1. Run a quick test: npm run test:quick"
    echo "  2. Test all workflows: npm run test:workflows"
    echo "  3. Read documentation: docs/ACT_TESTING.md"
    echo ""
    print_info "For help: ./scripts/test-workflows.sh help"
}

# Run setup
main "$@"