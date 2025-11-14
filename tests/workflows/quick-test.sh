#!/bin/bash

# Quick test script for CI workflow
echo "🧪 Running quick CI validation test..."

# Test YAML syntax validation
if command -v js-yaml >/dev/null 2>&1; then
    if js-yaml .github/workflows/ci.yml >/dev/null 2>&1; then
        echo "✅ CI workflow YAML syntax is valid"
    else
        echo "❌ CI workflow YAML syntax is invalid!"
        exit 1
    fi
else
    echo "⚠️  No YAML validator available, skipping syntax validation"
fi

# Test workflow structure
if grep -q "name: CI" .github/workflows/ci.yml && \
   grep -q "runs-on: ubuntu-latest" .github/workflows/ci.yml && \
   grep -q "node-version:" .github/workflows/ci.yml; then
    echo "✅ CI workflow structure is valid"
else
    echo "❌ CI workflow structure is invalid!"
    exit 1
fi

echo "✅ Quick validation test passed!"
echo "ℹ️  Note: Full act testing requires Docker and internet connectivity"
