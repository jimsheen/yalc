#!/bin/bash

# GitHub Actions Workflow Testing Script using act
# Tests CI/CD workflows locally before pushing to GitHub

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE} $1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if act is installed
check_dependencies() {
    print_header "Checking Dependencies"

    if ! command -v act &> /dev/null; then
        print_error "act is not installed. Please install it:"
        echo "  brew install act"
        echo "  or visit: https://github.com/nektos/act#installation"
        exit 1
    fi

    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed or running. act requires Docker."
        echo "  Please install Docker Desktop or start Docker daemon"
        exit 1
    fi

    print_success "act is installed: $(act --version)"
    print_success "Docker is available: $(docker --version | head -1)"
}

# Test CI workflow
test_ci_workflow() {
    print_header "Testing CI Workflow"

    print_info "Running CI workflow with act..."

    # Run CI workflow on push event (simulating push to main)
    if act push -W .github/workflows/ci.yml \
        --eventpath <(echo '{"ref": "refs/heads/main"}') \
        --artifact-server-path /tmp/artifacts; then
        print_success "CI workflow completed successfully"
    else
        print_error "CI workflow failed"
        return 1
    fi
}

# Test release workflow (dry run)
test_release_workflow_dry_run() {
    print_header "Testing Release Workflow (Dry Run)"

    print_info "Running release workflow in dry-run mode..."

    # Create workflow_dispatch event with dry_run=true
    local event_payload=$(cat <<EOF
{
  "inputs": {
    "dry_run": "true"
  },
  "ref": "refs/heads/main",
  "repository": {
    "full_name": "jimsheen/yalc"
  }
}
EOF
)

    if echo "$event_payload" | act workflow_dispatch \
        -W .github/workflows/release.yml \
        --eventpath /dev/stdin \
        --artifact-server-path /tmp/artifacts; then
        print_success "Release workflow (dry run) completed successfully"
    else
        print_error "Release workflow (dry run) failed"
        return 1
    fi
}

# Test specific job
test_specific_job() {
    local workflow="$1"
    local job="$2"

    print_header "Testing Specific Job: $job in $workflow"

    if act push -W ".github/workflows/$workflow" -j "$job" \
        --artifact-server-path /tmp/artifacts; then
        print_success "Job '$job' completed successfully"
    else
        print_error "Job '$job' failed"
        return 1
    fi
}

# List available workflows and jobs
list_workflows() {
    print_header "Available Workflows and Jobs"

    print_info "CI Workflow (.github/workflows/ci.yml):"
    act -W .github/workflows/ci.yml --list 2>/dev/null || print_warning "Could not list CI workflow jobs"

    print_info "Release Workflow (.github/workflows/release.yml):"
    act -W .github/workflows/release.yml --list 2>/dev/null || print_warning "Could not list release workflow jobs"
}

# Validate workflow syntax
validate_workflows() {
    print_header "Validating Workflow Syntax"

    local workflows=(".github/workflows/ci.yml" ".github/workflows/release.yml")

    for workflow in "${workflows[@]}"; do
        print_info "Validating $workflow..."

        # Check if workflow file exists and is valid YAML
        if command -v js-yaml >/dev/null 2>&1; then
            if js-yaml "$workflow" >/dev/null 2>&1; then
                print_success "$workflow has valid YAML syntax"
            else
                print_error "Invalid YAML syntax in $workflow"
                return 1
            fi
        elif python3 -c "import yaml" >/dev/null 2>&1; then
            if python3 -c "import yaml; yaml.safe_load(open('$workflow'))" >/dev/null 2>&1; then
                print_success "$workflow has valid YAML syntax"
            else
                print_error "Invalid YAML syntax in $workflow"
                return 1
            fi
        else
            print_warning "No YAML validator available. Skipping syntax validation for $workflow"
        fi
    done
}

# Performance test
performance_test() {
    print_header "Performance Testing"

    print_info "Running performance test of CI workflow..."

    local start_time=$(date +%s)

    if act push -W .github/workflows/ci.yml \
        --eventpath <(echo '{"ref": "refs/heads/main"}') \
        --quiet \
        --artifact-server-path /tmp/artifacts; then

        local end_time=$(date +%s)
        local duration=$((end_time - start_time))

        print_success "CI workflow completed in ${duration} seconds"

        if [ "$duration" -lt 300 ]; then
            print_success "Performance: GOOD (under 5 minutes)"
        elif [ "$duration" -lt 600 ]; then
            print_warning "Performance: ACCEPTABLE (5-10 minutes)"
        else
            print_warning "Performance: SLOW (over 10 minutes)"
        fi
    else
        print_error "Performance test failed"
        return 1
    fi
}

# Cleanup function
cleanup() {
    print_info "Cleaning up temporary files..."
    rm -rf /tmp/artifacts/* 2>/dev/null || true
    docker container prune -f >/dev/null 2>&1 || true
}

# Main script logic
main() {
    print_header "YALC GitHub Actions Workflow Testing"

    # Parse command line arguments
    case "${1:-all}" in
        "deps"|"dependencies")
            check_dependencies
            ;;
        "ci")
            check_dependencies
            test_ci_workflow
            ;;
        "release")
            check_dependencies
            test_release_workflow_dry_run
            ;;
        "job")
            if [[ -z "$2" || -z "$3" ]]; then
                print_error "Usage: $0 job <workflow.yml> <job-name>"
                exit 1
            fi
            check_dependencies
            test_specific_job "$2" "$3"
            ;;
        "list")
            list_workflows
            ;;
        "validate")
            validate_workflows
            ;;
        "perf"|"performance")
            check_dependencies
            performance_test
            ;;
        "all"|"")
            check_dependencies
            validate_workflows
            test_ci_workflow
            test_release_workflow_dry_run
            performance_test
            ;;
        "help"|"-h"|"--help")
            cat <<EOF
YALC Workflow Testing Script

Usage: $0 [command]

Commands:
  all          Run all tests (default)
  deps         Check dependencies only
  ci           Test CI workflow only
  release      Test release workflow (dry run) only
  job <workflow> <job>  Test specific job
  list         List available workflows and jobs
  validate     Validate workflow YAML syntax only
  perf         Run performance test only
  help         Show this help message

Examples:
  $0 all                    # Run complete test suite
  $0 ci                     # Test CI workflow only
  $0 release                # Test release workflow in dry-run mode
  $0 job ci.yml test        # Test specific job 'test' in ci.yml
  $0 validate               # Check workflow syntax only
  $0 perf                   # Performance test only

EOF
            exit 0
            ;;
        *)
            print_error "Unknown command: $1"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac

    # Cleanup on exit
    trap cleanup EXIT

    print_success "All requested tests completed! 🚀"
}

# Run main function
main "$@"