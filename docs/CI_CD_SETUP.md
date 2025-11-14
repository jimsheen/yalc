# CI/CD Setup - Modern 2025 Standards

**Status:** ✅ Implemented
**Last Updated:** November 14, 2025
**Compliance:** 2025 Best Practices, SLSA Level 2+, NPM Provenance

---

## 🚀 Overview

This project implements cutting-edge CI/CD automation following 2025 best practices:

- **Automated Testing:** Multi-Node.js version matrix testing
- **Semantic Release:** Automatic versioning based on conventional commits
- **NPM Provenance:** Supply chain security with cryptographic attestations
- **Quality Gates:** TypeScript + ESLint + Tests must pass
- **Security Scanning:** Dependency vulnerability checks

---

## 📋 Workflow Structure

### **CI Workflow** (`.github/workflows/ci.yml`)

**Triggers:**

- Push to main/master/develop
- Pull requests to main/master

**Jobs:**

1. **Test Matrix:** Node.js 18, 20, 22 compatibility
2. **Security Audit:** Vulnerability scanning
3. **Quality Gates:** TypeScript + ESLint + Build validation

### **Release Workflow** (`.github/workflows/release.yml`)

**Triggers:**

- Push to main/master (releases only)

**Jobs:**

1. **Quality Validation:** Full CI pipeline
2. **Semantic Release:** Automated version bump + changelog
3. **NPM Publish:** With provenance attestations
4. **Local Testing:** act-based GitHub Actions testing (see [Workflow Testing Guide](../tests/workflows/README.md))

---

## 🎯 Conventional Commits

Use conventional commit format for automated versioning:

### **Commit Types:**

```bash
feat: add new feature           # minor version bump
fix: fix bug                   # patch version bump
perf: performance improvement   # patch version bump
docs: update documentation     # patch version bump
refactor: code refactoring     # patch version bump

# No version bump:
style: formatting changes
test: add tests
build: build system changes
ci: CI/CD changes
chore: maintenance
```

### **Breaking Changes:**

```bash
feat!: breaking API change     # major version bump
fix!: breaking bug fix         # major version bump

# Or use footer:
feat: add new feature

BREAKING CHANGE: API signature changed
```

### **Examples:**

```bash
✅ GOOD:
feat: add workspace protocol support
fix: resolve dependency resolution issue
docs: update README with new commands
perf: optimize catalog parsing performance

❌ BAD:
Updated stuff
Fixed bug
Added feature
```

---

## 🔧 Local Development

### **Required Scripts:**

```bash
# Quality checks (must pass for CI)
npm run typecheck    # TypeScript validation
npm run lint:check   # ESLint validation
npm test            # Full test suite
npm run build       # Build verification

# Release testing (local)
npm run semantic-release --dry-run  # Test release without publishing
```

### **Pre-commit Hooks:**

The project uses Husky for pre-commit validation:

- Code formatting (Prettier)
- YALC integrity check
- Staged file validation

---

## 🔒 Security & Compliance

### **NPM Provenance (2025 Standard)**

**What it provides:**

- Cryptographic proof of package authenticity
- Build environment attestation
- Supply chain transparency
- SLSA Level 2+ compliance

**How it works:**

- GitHub Actions automatically generates attestations
- Published packages include provenance metadata
- Users can verify with `npm audit signatures`

### **Trusted Publishing**

**Setup:**

1. Package uses OIDC (OpenID Connect) instead of long-lived tokens
2. GitHub Actions has `id-token: write` permission
3. NPM automatically verifies GitHub identity

**Benefits:**

- No stored NPM_TOKEN secrets
- Automatic provenance generation
- Enhanced security posture

---

## 📦 Release Process

### **Automatic Release Process:**

1. **Developer commits** with conventional commit message
2. **CI runs** and validates quality gates
3. **Semantic-release analyzes** commit messages
4. **Version is determined** based on commit types
5. **Changelog is generated** automatically
6. **Package is published** to NPM with provenance
7. **GitHub release** is created with notes

### **Release Types Generated:**

- **Patch (1.0.x):** Bug fixes, docs, performance improvements
- **Minor (1.x.0):** New features, refactoring
- **Major (x.0.0):** Breaking changes

### **Manual Release Override:**

```bash
# Test release locally (dry run)
npm run semantic-release -- --dry-run

# Force release type (use sparingly)
npm run semantic-release -- --debug
```

---

## 🛠️ Configuration Files

### **Semantic Release** (`.releaserc.json`)

- Conventional commits analysis
- Changelog generation with emojis
- NPM publishing with provenance
- GitHub release creation
- Git commit automation

### **GitHub Actions:**

- **CI:** `.github/workflows/ci.yml` - Quality gates
- **Release:** `.github/workflows/release.yml` - Publishing

---

## 📊 Quality Gates

### **CI Requirements (Must Pass):**

| Check          | Command                       | Requirement            |
| -------------- | ----------------------------- | ---------------------- |
| **TypeScript** | `npm run typecheck`           | 0 errors               |
| **Linting**    | `npm run lint:check`          | 0 errors, 0 warnings   |
| **Tests**      | `npm test`                    | 100% pass rate         |
| **Build**      | `npm run build`               | Successful compilation |
| **CLI**        | `node dist/yalc.js --version` | Working binary         |

### **Security Checks:**

| Check               | Command                | Requirement             |
| ------------------- | ---------------------- | ----------------------- |
| **Vulnerabilities** | `npm audit`            | No high/critical issues |
| **Signatures**      | `npm audit signatures` | Valid provenance        |
| **Dependencies**    | Automated scanning     | Up-to-date packages     |

---

## 🚨 Emergency Procedures

### **Release Rollback:**

```bash
# Revert Git release commit
git revert <release-commit-hash>
git push origin main

# Deprecate NPM version (if necessary)
npm deprecate @jimsheen/yalc@<version> "Rolled back due to critical issue"

# Publish fix immediately
git commit -m "fix: critical issue resolution"
git push origin main  # Triggers automatic release
```

### **CI/CD Issues:**

```bash
# Skip CI for urgent commits
git commit -m "docs: emergency documentation fix [skip ci]"

# Force release (bypass semantic-release rules)
# NOT RECOMMENDED - use only in emergencies
npm version patch
npm publish
```

---

## 📈 Monitoring & Analytics

### **Release Metrics:**

- Automatic version progression tracking
- Changelog quality and completeness
- Release frequency and patterns
- Security compliance status

### **Quality Metrics:**

- Test coverage trends
- TypeScript error rates
- Lint compliance scores
- Build time optimization

---

## 🎯 Next Steps

### **Phase 4 Enhancements (Optional):**

- Advanced security scanning (Snyk, CodeQL)
- Performance regression testing
- Multi-platform testing (Windows, macOS)
- Docker container publishing
- IDE extension publishing

### **Enterprise Features:**

- Private registry support
- SAML/SSO integration
- Advanced compliance reporting
- Custom approval workflows

---

**This CI/CD setup positions YALC as a cutting-edge, secure, and reliable tool meeting all 2025 software engineering standards.** 🚀
