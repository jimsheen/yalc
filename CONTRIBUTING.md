# Contributing to YALC

Thank you for your interest in contributing to YALC! This guide will help you get started with our modern development workflow.

## 🚀 Quick Start

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/yalc.git
cd yalc

# Install dependencies
npm install

# Run tests to verify setup
npm test

# Start development
npm run dev
```

## 📋 Development Workflow

### **1. Setup Your Environment**

**Requirements:**

- Node.js 18+ (LTS recommended)
- npm 8+ (comes with Node.js)
- Git with conventional commit setup

**IDE Setup:**

```bash
# Configure Git commit template
git config commit.template .gitmessage

# Recommended VS Code extensions:
# - ESLint
# - Prettier
# - TypeScript and JavaScript Language Features
```

### **2. Development Commands**

```bash
# Development
npm run dev              # Watch mode with auto-rebuild
npm run build           # Production build
npm run clean           # Clean build artifacts

# Quality Checks (required before commits)
npm run typecheck       # TypeScript validation
npm run lint            # ESLint check and fix
npm run lint:check      # ESLint check only
npm test               # Full test suite

# Testing
npm run test:watch      # Interactive test mode
npm run test:coverage   # Coverage report
npm run test:unit       # Unit tests only
npm run test:integration # Integration tests
npm run test:regression # Regression tests
```

## ✅ Code Quality Standards

### **Zero-Tolerance Policy**

All code must meet these requirements:

- ✅ **TypeScript:** 0 compilation errors
- ✅ **ESLint:** 0 errors, 0 warnings
- ✅ **Tests:** 100% pass rate
- ✅ **Build:** Successful compilation
- ✅ **CLI:** Working binary output

**Validation Command:**

```bash
npm run ci  # Runs all quality checks
```

### **Code Style**

- **TypeScript strict mode:** All code must compile with strict settings
- **ESLint enforcement:** Automated via pre-commit hooks
- **Prettier formatting:** Automatic formatting on save
- **No `any` types:** Use proper TypeScript typing
- **No `@ts-ignore`:** Fix type issues properly

## 📝 Commit Guidelines

### **Conventional Commits (Required)**

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning and changelog generation.

**Format:**

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat:` New feature (minor version)
- `fix:` Bug fix (patch version)
- `perf:` Performance improvement (patch)
- `docs:` Documentation changes (patch)
- `refactor:` Code refactoring (patch)
- `test:` Adding tests (no version bump)
- `build:` Build system changes (no version bump)
- `ci:` CI/CD changes (no version bump)
- `chore:` Maintenance (no version bump)

**Examples:**

```bash
✅ GOOD:
feat: add workspace protocol support
fix(catalog): resolve PNPM parsing issue
docs: update README with new API
perf: optimize dependency resolution
feat!: breaking API change

❌ BAD:
Updated stuff
Fixed bug
Added feature
WIP commit
```

**Breaking Changes:**

```bash
feat!: breaking API change
# OR
feat: add new feature

BREAKING CHANGE: API signature changed from X to Y
```

## 🧪 Testing Guidelines

### **Test Structure**

```
src/
├── module/
│   ├── __tests__/
│   │   └── module.test.ts     # Unit tests
│   └── module.ts
tests/
├── integration/               # Integration tests
├── regression/               # Regression tests
└── fixtures/                 # Test data
```

### **Testing Requirements**

**Unit Tests:**

- Test each function and class
- Use real components (minimal mocking)
- Cover error conditions
- Aim for >95% coverage

**Integration Tests:**

- Test module interactions
- Use realistic scenarios
- Test CLI workflows
- Verify file operations

**Regression Tests:**

- Capture CLI output baselines
- Verify backward compatibility
- Test upgrade scenarios

**Example Test:**

```typescript
import { describe, it, expect } from 'vitest'
import { publishPackage } from '../publish'

describe('publishPackage', () => {
  it('should publish package with workspace resolution', async () => {
    const result = await publishPackage({
      workingDir: '/test/path',
      workspaceResolve: true,
    })

    expect(result).toBeDefined()
    expect(result.signature).toBeTruthy()
  })
})
```

## 🔄 Pull Request Process

### **Before Opening a PR**

1. **Create Feature Branch:**

```bash
git checkout -b feat/your-feature-name
```

2. **Make Changes:**

```bash
# Make your changes
git add .
git commit -m "feat: add your feature description"
```

3. **Run Quality Checks:**

```bash
npm run ci  # Must pass 100%
```

4. **Update Tests:**

- Add tests for new features
- Update existing tests if needed
- Ensure 100% test pass rate

5. **Update Documentation:**

- Update README if API changes
- Add JSDoc comments
- Update relevant docs in `docs/`

### **PR Template**

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (patch)
- [ ] New feature (minor)
- [ ] Breaking change (major)
- [ ] Documentation update
- [ ] Performance improvement

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] CI passes

## Quality Checklist

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All tests pass
- [ ] Build succeeds
- [ ] CLI functionality verified
```

## 🤝 Code Review Standards

### **Review Criteria**

**Functionality:**

- Does the code solve the intended problem?
- Are edge cases handled?
- Is error handling comprehensive?

**Quality:**

- Is the code readable and maintainable?
- Are TypeScript types properly defined?
- Are tests comprehensive?

**Performance:**

- Are there any performance implications?
- Is the implementation efficient?
- Are there unnecessary dependencies?

**Security:**

- Are there security vulnerabilities?
- Is user input properly validated?
- Are secrets handled securely?

## 🚀 Release Process

### **Automatic Releases**

Releases are fully automated via GitHub Actions:

1. **Merge to main** triggers release workflow
2. **Semantic-release** analyzes commit messages
3. **Version is bumped** automatically
4. **Changelog is generated** with conventional commits
5. **Package is published** to NPM with provenance
6. **GitHub release** is created

### **Release Types**

- **Patch (1.0.x):** `fix:`, `docs:`, `perf:` commits
- **Minor (1.x.0):** `feat:` commits
- **Major (x.0.0):** `feat!:` or `BREAKING CHANGE:` commits

### **Emergency Releases**

For critical fixes:

```bash
# Use conventional commit for automatic release
git commit -m "fix: critical security vulnerability"
git push origin main  # Triggers immediate release
```

## 📚 Documentation

### **Required Documentation**

**Code Documentation:**

- JSDoc comments for public APIs
- README updates for new features
- Type definitions for all functions

**User Documentation:**

- CLI help text updates
- Usage examples
- Migration guides for breaking changes

**Developer Documentation:**

- Architecture decisions
- Performance considerations
- Security implications

## 🛠️ Development Tips

### **Local Testing**

```bash
# Test CLI locally
npm run build
node dist/yalc.js --help

# Test publishing workflow (dry run)
npm run semantic-release -- --dry-run

# Test specific modules
npm run test src/catalog
npm run test tests/integration
```

### **Debugging**

```bash
# TypeScript compilation with detailed errors
npm run typecheck -- --verbose

# ESLint with detailed output
npm run lint:check -- --debug

# Vitest with debugging
npm run test:watch -- --reporter=verbose
```

### **Performance Profiling**

```bash
# Build performance
npm run build -- --analyze

# Test performance
npm run test -- --reporter=verbose

# Memory usage
node --inspect dist/yalc.js
```

## 🚨 Security Guidelines

### **Dependency Management**

- Keep dependencies up to date
- Run `npm audit` before commits
- Use exact versions for critical dependencies
- Review new dependency additions

### **Code Security**

- Validate all user inputs
- Never commit secrets or credentials
- Use secure file operations
- Follow OWASP guidelines

### **Supply Chain Security**

- Verify package integrity
- Use npm provenance
- Monitor for vulnerabilities
- Follow SLSA guidelines

## ❓ Getting Help

### **Resources**

- **Documentation:** `/docs` directory
- **Architecture:** `/docs/MODERNIZATION_PLAN.md`
- **Best Practices:** `/docs/MODERN_BEST_PRACTICES_RESEARCH.md`
- **CI/CD:** `/docs/CI_CD_SETUP.md`

### **Communication**

- **Issues:** GitHub Issues for bugs and features
- **Discussions:** GitHub Discussions for questions
- **Security:** Email maintainers for security issues

### **Development Environment Issues**

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install

# Reset Git hooks
rm -rf .git/hooks
npx husky install

# Clear caches
npm cache clean --force
```

---

**Thank you for contributing to YALC! Your efforts help make local package development better for everyone.** 🎉

## 📄 License

By contributing to YALC, you agree that your contributions will be licensed under the same license as the project (MIT).
