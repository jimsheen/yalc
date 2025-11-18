module.exports = {
  branches: [
    'main',
    {
      name: 'develop',
      prerelease: 'beta',
    },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'style', release: false },
          { type: 'refactor', release: 'patch' },
          { type: 'test', release: false },
          { type: 'build', release: false },
          { type: 'ci', release: false },
          { type: 'chore', release: false },
          { type: 'breaking', release: 'major' },
          { breaking: true, release: 'major' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        writerOpts: {
          transform: (commit, context) => {
            // Handle invalid dates gracefully
            if (
              commit.committerDate &&
              !isNaN(new Date(commit.committerDate).getTime())
            ) {
              commit.committerDate = new Date(commit.committerDate)
                .toISOString()
                .split('T')[0]
            } else {
              commit.committerDate = new Date().toISOString().split('T')[0]
            }
            return commit
          },
        },
        presetConfig: {
          types: [
            { type: 'feat', section: '✨ Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'perf', section: '⚡ Performance' },
            { type: 'revert', section: '⏪ Reverts' },
            { type: 'docs', section: '📚 Documentation' },
            { type: 'style', section: '🎨 Styling', hidden: true },
            { type: 'refactor', section: '♻️ Code Refactoring' },
            { type: 'test', section: '✅ Tests', hidden: true },
            { type: 'build', section: '🔧 Build System', hidden: true },
            { type: 'ci', section: '🔄 CI', hidden: true },
            { type: 'chore', section: '🧹 Chores', hidden: true },
          ],
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle:
          'Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n<!-- semantic-release -->',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'dist',
        pkgRoot: '.',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/*.tgz',
            label: 'Distribution package',
          },
        ],
        addReleases: 'bottom',
        successComment: false,
        failComment: false,
        releasedLabels: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
