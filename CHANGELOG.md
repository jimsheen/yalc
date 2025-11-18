Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- semantic-release -->

## <small>1.0.1 (2025-11-18)</small>

* fix: disable semantic-release GitHub issue commenting ([2c243bd69a472d373ab8464b003ee2a76f92a19d](https://github.com/jimsheen/yalc/commit/2c243bd69a472d373ab8464b003ee2a76f92a19d))

## 1.0.0 (2025-11-18)

* fix: `readPackageManifest` can detect indent correctly ([9622adb419fb639290844aa7d8128868bb14b8ad](https://github.com/jimsheen/yalc/commit/9622adb419fb639290844aa7d8128868bb14b8ad))
* fix: add publishConfig to make scoped package public ([3011707b789f516167672b6d872d937fdfef23ee](https://github.com/jimsheen/yalc/commit/3011707b789f516167672b6d872d937fdfef23ee))
* fix: add tslint hanging promise detection and fix errors ([b88cb96fbb57a959970478b1ce7077c29c1ebeea](https://github.com/jimsheen/yalc/commit/b88cb96fbb57a959970478b1ce7077c29c1ebeea))
* fix: correct CI workflow order - build before tests ([7df0a75f0c80a8ab7d9c1d4adb43c5e883f46e12](https://github.com/jimsheen/yalc/commit/7df0a75f0c80a8ab7d9c1d4adb43c5e883f46e12))
* fix: disable prepublishOnly script in CI to prevent release workflow failures ([4721e9c2ec19c0fe141467f30b00d424b383b428](https://github.com/jimsheen/yalc/commit/4721e9c2ec19c0fe141467f30b00d424b383b428))
* fix: drop Node.js 18 support due to vitest compatibility ([919d6261478d68ed6f8e0304cff2f71337cd90bd](https://github.com/jimsheen/yalc/commit/919d6261478d68ed6f8e0304cff2f71337cd90bd))
* fix: improve version resolution for published package ([803d26548d772489b2b8749b017977acfbb62d0e](https://github.com/jimsheen/yalc/commit/803d26548d772489b2b8749b017977acfbb62d0e))
* fix: include test fixture dist/file.txt in git ([14827a039d258b3b4d030314ba299a1218791200](https://github.com/jimsheen/yalc/commit/14827a039d258b3b4d030314ba299a1218791200))
* fix: include workspace packages in git for CI test fixtures ([cedb22a48f95fa2d89513c4633b17d28b79aa795](https://github.com/jimsheen/yalc/commit/cedb22a48f95fa2d89513c4633b17d28b79aa795))
* fix: release workflow should wait for CI to complete ([c7b16d6929bf2b1c7ffd60559cedb353c9dc0b59](https://github.com/jimsheen/yalc/commit/c7b16d6929bf2b1c7ffd60559cedb353c9dc0b59))
* fix: remove .releaserc.json configuration file ([17fb1b06e2b9b9244ec31a8beffbbb6e4967b211](https://github.com/jimsheen/yalc/commit/17fb1b06e2b9b9244ec31a8beffbbb6e4967b211))
* fix: remove package dir from node_modules only if needed ([3a73ce7328b626ac2725be79b5b6af8008ba1691](https://github.com/jimsheen/yalc/commit/3a73ce7328b626ac2725be79b5b6af8008ba1691))
* fix: replace pnpm with npm in CI scripts ([bd0d7677b4cb3f81e0f9c95c0148482e39a063d6](https://github.com/jimsheen/yalc/commit/bd0d7677b4cb3f81e0f9c95c0148482e39a063d6))
* fix: replace yarn.lock artifactory urls with public url ([2325c6068d8e6db9de970840df4866a9664658fe](https://github.com/jimsheen/yalc/commit/2325c6068d8e6db9de970840df4866a9664658fe))
* fix: reset semantic-release to clean state ([c69c9255c9f192981d7a271052b479266683ae43](https://github.com/jimsheen/yalc/commit/c69c9255c9f192981d7a271052b479266683ae43))
* fix: resolve CI failures and security vulnerabilities ([dfbfbcc8c88e08f5ea70f52ddc39ff390d4806a9](https://github.com/jimsheen/yalc/commit/dfbfbcc8c88e08f5ea70f52ddc39ff390d4806a9))
* fix: resolve semantic-release Invalid date error with robust date handling ([7a341fd3f3729b9b2e598f2f97350fb582fb2c92](https://github.com/jimsheen/yalc/commit/7a341fd3f3729b9b2e598f2f97350fb582fb2c92))
* fix: revert to simple, working CI/Release workflows ([d5e58e9cb985ef0306844c2e1cd4b36b64e38ce1](https://github.com/jimsheen/yalc/commit/d5e58e9cb985ef0306844c2e1cd4b36b64e38ce1))
* fix: update dependencies and baseline timestamps for regression tests ([c9f0299fd7ff3c6ad5b43f88f90146da41503a7a](https://github.com/jimsheen/yalc/commit/c9f0299fd7ff3c6ad5b43f88f90146da41503a7a))
* fix: update Release workflow to use Node.js 20 ([83491a869af4343bf6faea315b92fbca23711f3e](https://github.com/jimsheen/yalc/commit/83491a869af4343bf6faea315b92fbca23711f3e))
* fix(publish): adds quotes around workingDir ([73628f1318bc43739469154f205dd22097aca8f6](https://github.com/jimsheen/yalc/commit/73628f1318bc43739469154f205dd22097aca8f6))
* chore: configure semantic-release to only publish from main branch ([01f41ec74bd546a612ca44b206abf11deb51b21b](https://github.com/jimsheen/yalc/commit/01f41ec74bd546a612ca44b206abf11deb51b21b))
* chore: distribute changelog release dates to appear more natural ([de05a602fcf5f68659099061904292d650137b11](https://github.com/jimsheen/yalc/commit/de05a602fcf5f68659099061904292d650137b11))
* chore: remove test-results from git tracking ([828b9d1a3dbac7c4f4eb7c5be0249711ea4928bc](https://github.com/jimsheen/yalc/commit/828b9d1a3dbac7c4f4eb7c5be0249711ea4928bc))
* chore: remove unused dev dependency ([75d7b6a1626536de5a51c651a26b8b6cb6d56743](https://github.com/jimsheen/yalc/commit/75d7b6a1626536de5a51c651a26b8b6cb6d56743))
* chore: replace `user-home` for built-in ([6623fd44a0c1cafefb228eb1dcdb468c1c96c1ae](https://github.com/jimsheen/yalc/commit/6623fd44a0c1cafefb228eb1dcdb468c1c96c1ae))
* chore: run prettier ([055ffdc6363e2247d359551a10ebdfdd597d7790](https://github.com/jimsheen/yalc/commit/055ffdc6363e2247d359551a10ebdfdd597d7790))
* chore(release): 1.0.0 [skip ci] ([f7a73b9d1d02f86c6e5ef63b1bb4febd6d6e75e1](https://github.com/jimsheen/yalc/commit/f7a73b9d1d02f86c6e5ef63b1bb4febd6d6e75e1)), closes [#7](https://github.com/jimsheen/yalc/issues/7) [#109](https://github.com/jimsheen/yalc/issues/109) [#109](https://github.com/jimsheen/yalc/issues/109) [#36](https://github.com/jimsheen/yalc/issues/36) [#36](https://github.com/jimsheen/yalc/issues/36) [#146](https://github.com/jimsheen/yalc/issues/146) [#146](https://github.com/jimsheen/yalc/issues/146) [#2](https://github.com/jimsheen/yalc/issues/2) [#2](https://github.com/jimsheen/yalc/issues/2) [#26](https://github.com/jimsheen/yalc/issues/26) [#26](https://github.com/jimsheen/yalc/issues/26) [#3](https://github.com/jimsheen/yalc/issues/3) [#3](https://github.com/jimsheen/yalc/issues/3) [#85](https://github.com/jimsheen/yalc/issues/85) [#156](https://github.com/jimsheen/yalc/issues/156) [#10](https://github.com/jimsheen/yalc/issues/10) [#11](https://github.com/jimsheen/yalc/issues/11) [#119](https://github.com/jimsheen/yalc/issues/119) [#12](https://github.com/jimsheen/yalc/issues/12) [#124](https://github.com/jimsheen/yalc/issues/124) [#126](https://github.com/jimsheen/yalc/issues/126) [#130](https://github.com/jimsheen/yalc/issues/130) [#139](https://github.com/jimsheen/yalc/issues/139) [#14](https://github.com/jimsheen/yalc/issues/14) [#141](https://github.com/jimsheen/yalc/issues/141) [#147](https://github.com/jimsheen/yalc/issues/147) [#150](https://github.com/jimsheen/yalc/issues/150) [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162) [#218](https://github.com/jimsheen/yalc/issues/218) [#30](https://github.com/jimsheen/yalc/issues/30) [#31](https://github.com/jimsheen/yalc/issues/31) [#33](https://github.com/jimsheen/yalc/issues/33) [#40](https://github.com/jimsheen/yalc/issues/40) [#41](https://github.com/jimsheen/yalc/issues/41) [#42](https://github.com/jimsheen/yalc/issues/42) [#43](https://github.com/jimsheen/yalc/issues/43) [#44](https://github.com/jimsheen/yalc/issues/44) [#57](https://github.com/jimsheen/yalc/issues/57) [#6](https://github.com/jimsheen/yalc/issues/6) [#61](https://github.com/jimsheen/yalc/issues/61) [#71](https://github.com/jimsheen/yalc/issues/71) [#82](https://github.com/jimsheen/yalc/issues/82) [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85) [#93](https://github.com/jimsheen/yalc/issues/93) [#129](https://github.com/jimsheen/yalc/issues/129) [#157](https://github.com/jimsheen/yalc/issues/157) [#151](https://github.com/jimsheen/yalc/issues/151) [#151](https://github.com/jimsheen/yalc/issues/151) [#142](https://github.com/jimsheen/yalc/issues/142) [#142](https://github.com/jimsheen/yalc/issues/142) [#162](https://github.com/jimsheen/yalc/issues/162) [#7](https://github.com/jimsheen/yalc/issues/7) [#109](https://github.com/jimsheen/yalc/issues/109) [#109](https://github.com/jimsheen/yalc/issues/109) [#36](https://github.com/jimsheen/yalc/issues/36) [#36](https://github.com/jimsheen/yalc/issues/36) [#146](https://github.com/jimsheen/yalc/issues/146) [#146](https://github.com/jimsheen/yalc/issues/146) [#2](https://github.com/jimsheen/yalc/issues/2) [#2](https://github.com/jimsheen/yalc/issues/2) [#26](https://github.com/jimsheen/yalc/issues/26) [#26](https://github.com/jimsheen/yalc/issues/26) [#3](https://github.com/jimsheen/yalc/issues/3) [#3](https://github.com/jimsheen/yalc/issues/3) [#85](https://github.com/jimsheen/yalc/issues/85) [#156](https://github.com/jimsheen/yalc/issues/156) [#10](https://github.com/jimsheen/yalc/issues/10) [#11](https://github.com/jimsheen/yalc/issues/11) [#119](https://github.com/jimsheen/yalc/issues/119) [#12](https://github.com/jimsheen/yalc/issues/12) [#124](https://github.com/jimsheen/yalc/issues/124) [#126](https://github.com/jimsheen/yalc/issues/126) [#130](https://github.com/jimsheen/yalc/issues/130) [#139](https://github.com/jimsheen/yalc/issues/139) [#14](https://github.com/jimsheen/yalc/issues/14) [#141](https://github.com/jimsheen/yalc/issues/141) [#147](https://github.com/jimsheen/yalc/issues/147) [#150](https://github.com/jimsheen/yalc/issues/150) [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162) [#218](https://github.com/jimsheen/yalc/issues/218) [#30](https://github.com/jimsheen/yalc/issues/30) [#31](https://github.com/jimsheen/yalc/issues/31) [#33](https://github.com/jimsheen/yalc/issues/33) [#40](https://github.com/jimsheen/yalc/issues/40) [#41](https://github.com/jimsheen/yalc/issues/41) [#42](https://github.com/jimsheen/yalc/issues/42) [#43](https://github.com/jimsheen/yalc/issues/43) [#44](https://github.com/jimsheen/yalc/issues/44) [#57](https://github.com/jimsheen/yalc/issues/57) [#6](https://github.com/jimsheen/yalc/issues/6) [#61](https://github.com/jimsheen/yalc/issues/61) [#71](https://github.com/jimsheen/yalc/issues/71) [#82](https://github.com/jimsheen/yalc/issues/82) [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85) [#93](https://github.com/jimsheen/yalc/issues/93) [#129](https://github.com/jimsheen/yalc/issues/129) [#157](https://github.com/jimsheen/yalc/issues/157) [#151](https://github.com/jimsheen/yalc/issues/151) [#151](https://github.com/jimsheen/yalc/issues/151) [#142](https://github.com/jimsheen/yalc/issues/142) [#142](https://github.com/jimsheen/yalc/issues/142) [#162](https://github.com/jimsheen/yalc/issues/162)
* chore(release): 1.0.0 [skip ci] ([5f8ca287c45a78b309aac6987d3ed02a6ef6cef2](https://github.com/jimsheen/yalc/commit/5f8ca287c45a78b309aac6987d3ed02a6ef6cef2)), closes [#7](https://github.com/jimsheen/yalc/issues/7) [#109](https://github.com/jimsheen/yalc/issues/109) [#109](https://github.com/jimsheen/yalc/issues/109) [#36](https://github.com/jimsheen/yalc/issues/36) [#36](https://github.com/jimsheen/yalc/issues/36) [#146](https://github.com/jimsheen/yalc/issues/146) [#146](https://github.com/jimsheen/yalc/issues/146) [#2](https://github.com/jimsheen/yalc/issues/2) [#2](https://github.com/jimsheen/yalc/issues/2) [#26](https://github.com/jimsheen/yalc/issues/26) [#26](https://github.com/jimsheen/yalc/issues/26) [#3](https://github.com/jimsheen/yalc/issues/3) [#3](https://github.com/jimsheen/yalc/issues/3) [#85](https://github.com/jimsheen/yalc/issues/85) [#156](https://github.com/jimsheen/yalc/issues/156) [#10](https://github.com/jimsheen/yalc/issues/10) [#11](https://github.com/jimsheen/yalc/issues/11) [#119](https://github.com/jimsheen/yalc/issues/119) [#12](https://github.com/jimsheen/yalc/issues/12) [#124](https://github.com/jimsheen/yalc/issues/124) [#126](https://github.com/jimsheen/yalc/issues/126) [#130](https://github.com/jimsheen/yalc/issues/130) [#139](https://github.com/jimsheen/yalc/issues/139) [#14](https://github.com/jimsheen/yalc/issues/14) [#141](https://github.com/jimsheen/yalc/issues/141) [#147](https://github.com/jimsheen/yalc/issues/147) [#150](https://github.com/jimsheen/yalc/issues/150) [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162) [#218](https://github.com/jimsheen/yalc/issues/218) [#30](https://github.com/jimsheen/yalc/issues/30) [#31](https://github.com/jimsheen/yalc/issues/31) [#33](https://github.com/jimsheen/yalc/issues/33) [#40](https://github.com/jimsheen/yalc/issues/40) [#41](https://github.com/jimsheen/yalc/issues/41) [#42](https://github.com/jimsheen/yalc/issues/42) [#43](https://github.com/jimsheen/yalc/issues/43) [#44](https://github.com/jimsheen/yalc/issues/44) [#57](https://github.com/jimsheen/yalc/issues/57) [#6](https://github.com/jimsheen/yalc/issues/6) [#61](https://github.com/jimsheen/yalc/issues/61) [#71](https://github.com/jimsheen/yalc/issues/71) [#82](https://github.com/jimsheen/yalc/issues/82) [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85) [#93](https://github.com/jimsheen/yalc/issues/93) [#129](https://github.com/jimsheen/yalc/issues/129) [#157](https://github.com/jimsheen/yalc/issues/157) [#151](https://github.com/jimsheen/yalc/issues/151) [#151](https://github.com/jimsheen/yalc/issues/151) [#142](https://github.com/jimsheen/yalc/issues/142) [#142](https://github.com/jimsheen/yalc/issues/142) [#162](https://github.com/jimsheen/yalc/issues/162)
* chore(release): 2.0.0 [skip ci] ([4d725e4e6588b7b528cf15ad03a75f9d8d072d1e](https://github.com/jimsheen/yalc/commit/4d725e4e6588b7b528cf15ad03a75f9d8d072d1e))
* chore(release): 2.0.1 [skip ci] ([0416fe5325b67811cb2d4872cce4111f6170afd9](https://github.com/jimsheen/yalc/commit/0416fe5325b67811cb2d4872cce4111f6170afd9))
* chore(release): 2.0.2 [skip ci] ([4242891cb2e1147b70667741dcde26363dcd2b8d](https://github.com/jimsheen/yalc/commit/4242891cb2e1147b70667741dcde26363dcd2b8d))
* chore(release): 2.0.3 [skip ci] ([b9f3cb96306afef2fb30408c06ba9850d9081c71](https://github.com/jimsheen/yalc/commit/b9f3cb96306afef2fb30408c06ba9850d9081c71))
* feat: add comprehensive catalog tests and improve caching mechanism ([ee90eba0310750ce29490906979adf3e98319dfd](https://github.com/jimsheen/yalc/commit/ee90eba0310750ce29490906979adf3e98319dfd))
* feat: consolidate CI and Release workflows for improved efficiency ([748c62f98474e2ac77f275bb4f1b35d89037dfc3](https://github.com/jimsheen/yalc/commit/748c62f98474e2ac77f275bb4f1b35d89037dfc3))
* feat: improved yarn support ([a27d57d1d6521f2f240ae43f88a77771d62aab62](https://github.com/jimsheen/yalc/commit/a27d57d1d6521f2f240ae43f88a77771d62aab62))
* feat: Introduce @jimsheen/yalc - a modernized fork of yalc with enhanced performance and features ([66486b6f006ca9097a6491c88babcd325fda000f](https://github.com/jimsheen/yalc/commit/66486b6f006ca9097a6491c88babcd325fda000f))
* feat: update node_modules/.bin ([ce058d0e5c5c6d1ff110a9152ac2e0511053fae7](https://github.com/jimsheen/yalc/commit/ce058d0e5c5c6d1ff110a9152ac2e0511053fae7))
* --pure --changed, ws support ([07076b4a41aabaff982f0ce069d02cb876cb235f](https://github.com/jimsheen/yalc/commit/07076b4a41aabaff982f0ce069d02cb876cb235f))
* A few more spelling and grammar edits ([6bfd9416a9a7b6dbcf9c868a41acedef89877653](https://github.com/jimsheen/yalc/commit/6bfd9416a9a7b6dbcf9c868a41acedef89877653))
* ad check ([1a3ba89d8454386720718d059fcc7bd5ccf52f59](https://github.com/jimsheen/yalc/commit/1a3ba89d8454386720718d059fcc7bd5ccf52f59))
* add --link option and readme update ([b13048db9d10c152f0fc4467452f0a2e3d6ef3d5](https://github.com/jimsheen/yalc/commit/b13048db9d10c152f0fc4467452f0a2e3d6ef3d5))
* add --private ([ac5e823b7ae22a3bd86102f15f5943ed9a2306eb](https://github.com/jimsheen/yalc/commit/ac5e823b7ae22a3bd86102f15f5943ed9a2306eb))
* add --replace flag ([22738875f33e3e1628f2d23216702e4e3c63e8a6](https://github.com/jimsheen/yalc/commit/22738875f33e3e1628f2d23216702e4e3c63e8a6))
* add --save-dev and --dev to docs ([be8eb86a3386be6efe3a67c03580fc1b726593dc](https://github.com/jimsheen/yalc/commit/be8eb86a3386be6efe3a67c03580fc1b726593dc))
* add --store-folder option ([44688ce5181950b0b4d06defada57ba4ee83be80](https://github.com/jimsheen/yalc/commit/44688ce5181950b0b4d06defada57ba4ee83be80))
* add --update option ([94ed3a8a1d23e6acc7c0b658ff6c3439178303d3](https://github.com/jimsheen/yalc/commit/94ed3a8a1d23e6acc7c0b658ff6c3439178303d3))
* add --version flag ([965704b2c331072b84175e98d548d732a021bf89](https://github.com/jimsheen/yalc/commit/965704b2c331072b84175e98d548d732a021bf89))
* add -W and no-scripts arg ([02426630fb50a8225ff17e250dca20d74b29b1dd](https://github.com/jimsheen/yalc/commit/02426630fb50a8225ff17e250dca20d74b29b1dd))
* add -W flag ([19b65a286209f53bf8ef21ee9c048ce2b2fafde2](https://github.com/jimsheen/yalc/commit/19b65a286209f53bf8ef21ee9c048ce2b2fafde2))
* add bin ensureSymlinkSync to try catch ([0a29d68924114df80d762b2aa5482ee20f688d9a](https://github.com/jimsheen/yalc/commit/0a29d68924114df80d762b2aa5482ee20f688d9a))
* add check command ([9e80110be6ff02bd3aa35b0db648e177d0a0ab2d](https://github.com/jimsheen/yalc/commit/9e80110be6ff02bd3aa35b0db648e177d0a0ab2d))
* add CRLF warning ([4409984c32eed939a0d5614f5a1dac03438a259f](https://github.com/jimsheen/yalc/commit/4409984c32eed939a0d5614f5a1dac03438a259f))
* add dev-mod (removing of devDeps) ([e7a00090bf6d4c07546072fa24f6352d0ad897ef](https://github.com/jimsheen/yalc/commit/e7a00090bf6d4c07546072fa24f6352d0ad897ef))
* add files option ([0fced17b7fb33e0159c530248ad935474b1cd5ae](https://github.com/jimsheen/yalc/commit/0fced17b7fb33e0159c530248ad935474b1cd5ae))
* add husky ([4f895a4b4fff4f6276c611c01073abf0db0b167a](https://github.com/jimsheen/yalc/commit/4f895a4b4fff4f6276c611c01073abf0db0b167a))
* add installations clean/show ([a6e8b50c5cba2867b65b6338e1a815c3eee5980c](https://github.com/jimsheen/yalc/commit/a6e8b50c5cba2867b65b6338e1a815c3eee5980c))
* add MIT licence text ([e94f911a14928dfd8fe28a46be8b9752c9cb886a](https://github.com/jimsheen/yalc/commit/e94f911a14928dfd8fe28a46be8b9752c9cb886a))
* add nested .yalc issue in docs ([1fcd3bdf59821c73de5d4bdabb71bbfcbc0cacc3](https://github.com/jimsheen/yalc/commit/1fcd3bdf59821c73de5d4bdabb71bbfcbc0cacc3))
* add new line at the end of package.json ([2b1682eff6306f3ac6d072c2ff28af584022d8ec](https://github.com/jimsheen/yalc/commit/2b1682eff6306f3ac6d072c2ff28af584022d8ec))
* add prepare scirpt ([3fee41fda281c3fcf5f455fde6098d4ed69270a0](https://github.com/jimsheen/yalc/commit/3fee41fda281c3fcf5f455fde6098d4ed69270a0))
* add publish date ([d83f5f0e290086bb85f5cd7f81e57ece0b4abd0b](https://github.com/jimsheen/yalc/commit/d83f5f0e290086bb85f5cd7f81e57ece0b4abd0b))
* add remove and retreat ([16a87f11e89318a9d5339dc0091dd2d47e09b41c](https://github.com/jimsheen/yalc/commit/16a87f11e89318a9d5339dc0091dd2d47e09b41c))
* add repository link to package.json ([cbef2f31248eeeb0202a9aaab614f451dfc14098](https://github.com/jimsheen/yalc/commit/cbef2f31248eeeb0202a9aaab614f451dfc14098))
* add restore command ([ea074efba27eab0fb80316810a6e72117dac17af](https://github.com/jimsheen/yalc/commit/ea074efba27eab0fb80316810a6e72117dac17af))
* add safe copy dir ([62f4ee27e6ffe2ad767be736d749899939bfa05b](https://github.com/jimsheen/yalc/commit/62f4ee27e6ffe2ad767be736d749899939bfa05b))
* add signature (`yalcSig` key) to published package.json ([f1cb7179b244b8562e044761c829fa97a11aa7da](https://github.com/jimsheen/yalc/commit/f1cb7179b244b8562e044761c829fa97a11aa7da))
* add store path in not found message ([ee8921d0d39b0f563434a49fd8b16543e56bb752](https://github.com/jimsheen/yalc/commit/ee8921d0d39b0f563434a49fd8b16543e56bb752))
* add test file.txt to git ([3648b52ca69014f42285e9691faa092d9ac5ec89](https://github.com/jimsheen/yalc/commit/3648b52ca69014f42285e9691faa092d9ac5ec89))
* add test for workspace protocol resolution ([41056b68b3d60191d090addf750f3ce8dc3ad9c9](https://github.com/jimsheen/yalc/commit/41056b68b3d60191d090addf750f3ce8dc3ad9c9))
* add tests ([cb638c32ef5f39e4f091b0b8ce960e038cea0fdb](https://github.com/jimsheen/yalc/commit/cb638c32ef5f39e4f091b0b8ce960e038cea0fdb))
* add tests for remove ([5115521daef8e23fb3d4e7eaf17146306a3d7dd7](https://github.com/jimsheen/yalc/commit/5115521daef8e23fb3d4e7eaf17146306a3d7dd7))
* add trash-cli, publish ([e63b2dd6b0a56b61b5cc10318d4b4b191a6e8297](https://github.com/jimsheen/yalc/commit/e63b2dd6b0a56b61b5cc10318d4b4b191a6e8297))
* add travis ([346854a5c63b365370e38f47a08d8545a6259bc7](https://github.com/jimsheen/yalc/commit/346854a5c63b365370e38f47a08d8545a6259bc7))
* add travis badge ([d3a5c91db7a406517189c970ee70883013b9840c](https://github.com/jimsheen/yalc/commit/d3a5c91db7a406517189c970ee70883013b9840c))
* add try catch when modefiying permissions ([bf19b5e53437a2c5c250305148314b171a0a933e](https://github.com/jimsheen/yalc/commit/bf19b5e53437a2c5c250305148314b171a0a933e))
* add ts-tslint-plugin ([c2083f81dac260f8f24d0dbac8b01522f0b0db06](https://github.com/jimsheen/yalc/commit/c2083f81dac260f8f24d0dbac8b01522f0b0db06))
* Add unpublish (yalc installations) instructions ([f620c096f328e744a40fa9f542d4c16cf1840714](https://github.com/jimsheen/yalc/commit/f620c096f328e744a40fa9f542d4c16cf1840714))
* add workspace protocol resolution ([e42ab7ded000a1d95dd3b983a665d2913ab06d3a](https://github.com/jimsheen/yalc/commit/e42ab7ded000a1d95dd3b983a665d2913ab06d3a))
* added hash signature ([9194e47a0295c27498cc78a506af222faa1178a0](https://github.com/jimsheen/yalc/commit/9194e47a0295c27498cc78a506af222faa1178a0))
* allow --pure without worspaces ([10082688f08e0200774538e294aa38ae8cedddd1](https://github.com/jimsheen/yalc/commit/10082688f08e0200774538e294aa38ae8cedddd1))
* better non-code files filtering ([14b7cc7e25105ee61e2bb33de01253f461059355](https://github.com/jimsheen/yalc/commit/14b7cc7e25105ee61e2bb33de01253f461059355))
* bump ([c13b2a7081000bfb0458e32c6a62ad93e5112278](https://github.com/jimsheen/yalc/commit/c13b2a7081000bfb0458e32c6a62ad93e5112278))
* bump version ([07ab0b0ab5cc0a2476f9de559c64ae485db6e9bb](https://github.com/jimsheen/yalc/commit/07ab0b0ab5cc0a2476f9de559c64ae485db6e9bb))
* bump version ([7b8ccf647329ac859d452e59b4054a58dff4e93a](https://github.com/jimsheen/yalc/commit/7b8ccf647329ac859d452e59b4054a58dff4e93a))
* bump version ([ee053f958c3e2b0bc9675722a4512275000afc03](https://github.com/jimsheen/yalc/commit/ee053f958c3e2b0bc9675722a4512275000afc03))
* bump version ([d8ddfe7c4acfdb0c10f735b0de641c172b36e8e7](https://github.com/jimsheen/yalc/commit/d8ddfe7c4acfdb0c10f735b0de641c172b36e8e7))
* bump version ([2d4879dc240da153f43eb38d4e19ddd20a65d413](https://github.com/jimsheen/yalc/commit/2d4879dc240da153f43eb38d4e19ddd20a65d413))
* bump version ([0b3fd07b47f697450d368499194efbaff0c196b6](https://github.com/jimsheen/yalc/commit/0b3fd07b47f697450d368499194efbaff0c196b6))
* bump version ([0ffa688c4f554457c4bf3596180c8da9d46e6a30](https://github.com/jimsheen/yalc/commit/0ffa688c4f554457c4bf3596180c8da9d46e6a30))
* bump version ([c40a8b8be34366298711c1c1a444d3736ef472a7](https://github.com/jimsheen/yalc/commit/c40a8b8be34366298711c1c1a444d3736ef472a7))
* change name to yaloc ([710cb500ff8acb952ed984506e265416c20e106c](https://github.com/jimsheen/yalc/commit/710cb500ff8acb952ed984506e265416c20e106c))
* check for travis ([a4100d4cdd4d6db28b55d5dc61f12959e517666b](https://github.com/jimsheen/yalc/commit/a4100d4cdd4d6db28b55d5dc61f12959e517666b))
* check for travis fail ([3c2aefb4686dc4f57720c61fd373e2660810ba47](https://github.com/jimsheen/yalc/commit/3c2aefb4686dc4f57720c61fd373e2660810ba47))
* check if symlink and remove folder #7 ([1eede443f0581e7bbf2c1d56b77e25efdca027de](https://github.com/jimsheen/yalc/commit/1eede443f0581e7bbf2c1d56b77e25efdca027de)), closes [#7](https://github.com/jimsheen/yalc/issues/7)
* copy to dest package dir not removing inner `node_modules` ([241359b4f03de3a99f1dc2b997169276c75b8c56](https://github.com/jimsheen/yalc/commit/241359b4f03de3a99f1dc2b997169276c75b8c56))
* Correct spelling, grammar, and typography issues ([b3195e63410178195a3a89ed45a7f5883b3ca2e0](https://github.com/jimsheen/yalc/commit/b3195e63410178195a3a89ed45a7f5883b3ca2e0))
* do not ignore subdirectories such as 'history' ([4c8a8377bdee03f901a66417858db243cfdfff43](https://github.com/jimsheen/yalc/commit/4c8a8377bdee03f901a66417858db243cfdfff43))
* empty dir including dot folders ([8f8339276c8679500eb27dcda2da369d0454091d](https://github.com/jimsheen/yalc/commit/8f8339276c8679500eb27dcda2da369d0454091d))
* first commit ([fda54cf32b2a72aa20f24f663b2457836dfe52f3](https://github.com/jimsheen/yalc/commit/fda54cf32b2a72aa20f24f663b2457836dfe52f3))
* fix --pure flag ([8f20ae19d792b3fbbb0e67ac68856d35cee03b4a](https://github.com/jimsheen/yalc/commit/8f20ae19d792b3fbbb0e67ac68856d35cee03b4a))
* fix --pure with workspaces ([6ce877507620abf6fe42dff67f85f5a5f6320550](https://github.com/jimsheen/yalc/commit/6ce877507620abf6fe42dff67f85f5a5f6320550))
* fix --quiet, remove incorrect ([401488bb09d72fc4479dc0771ac89144857244b7](https://github.com/jimsheen/yalc/commit/401488bb09d72fc4479dc0771ac89144857244b7))
* fix --scripts flag ([e5676a8704c62dd105ce7fde697832619991e67a](https://github.com/jimsheen/yalc/commit/e5676a8704c62dd105ce7fde697832619991e67a))
* Fix 'link' command and make 'update' consistent with the rest ([64c685eac50ab747591fc8c28d1a9dbe2e3b133b](https://github.com/jimsheen/yalc/commit/64c685eac50ab747591fc8c28d1a9dbe2e3b133b))
* Fix "quiet" command line argument typo. ([aeda0588cd3fb1214f05f464997c7746c65092e7](https://github.com/jimsheen/yalc/commit/aeda0588cd3fb1214f05f464997c7746c65092e7))
* fix @scoped names publish bug #109 ([33c1fa491003eee6ec404ab8930b80b2b87c2524](https://github.com/jimsheen/yalc/commit/33c1fa491003eee6ec404ab8930b80b2b87c2524)), closes [#109](https://github.com/jimsheen/yalc/issues/109)
* Fix `--sig` documentation in readme ([4425d978919affd4b72cd10cbc53d3c6bb4de74f](https://github.com/jimsheen/yalc/commit/4425d978919affd4b72cd10cbc53d3c6bb4de74f))
* fix add --link ([9b3028d626fb263fafcd5f0df63fc44a56125dee](https://github.com/jimsheen/yalc/commit/9b3028d626fb263fafcd5f0df63fc44a56125dee))
* Fix broken link ([275fd9430ee8ff2469e61bc546b9008d490cb053](https://github.com/jimsheen/yalc/commit/275fd9430ee8ff2469e61bc546b9008d490cb053))
* fix bugs, LF, update version ([83f8795baec6faff5ef8dfc3e13cb6b8eb48d439](https://github.com/jimsheen/yalc/commit/83f8795baec6faff5ef8dfc3e13cb6b8eb48d439))
* fix ci script ([159aa824fcdf0424369489e97f18fa8d4db6de4e](https://github.com/jimsheen/yalc/commit/159aa824fcdf0424369489e97f18fa8d4db6de4e))
* fix copy file permissions ([6ad590e209e8146e712f16bf92cc5832296eea96](https://github.com/jimsheen/yalc/commit/6ad590e209e8146e712f16bf92cc5832296eea96))
* fix copy if no `files` in manifest defined ([4953e3acdc1a5e479197582f489260ddec4ebed4](https://github.com/jimsheen/yalc/commit/4953e3acdc1a5e479197582f489260ddec4ebed4))
* fix default pure add in workspaces ([1ffd065a28336d310576e39ea80a4f305341fd66](https://github.com/jimsheen/yalc/commit/1ffd065a28336d310576e39ea80a4f305341fd66))
* fix for #36 ([1cab15b95dde395351ff994aee28cf9e3414badd](https://github.com/jimsheen/yalc/commit/1cab15b95dde395351ff994aee28cf9e3414badd)), closes [#36](https://github.com/jimsheen/yalc/issues/36)
* fix formatting ([05c03b712d4c39a1bcfd1c4629ddfeaa46be0f30](https://github.com/jimsheen/yalc/commit/05c03b712d4c39a1bcfd1c4629ddfeaa46be0f30))
* fix hash rel path slashes ([9b946db5357430ec4ed34e2dd9d7f3a1c847852b](https://github.com/jimsheen/yalc/commit/9b946db5357430ec4ed34e2dd9d7f3a1c847852b))
* fix include rule folder/file ([d16f2caf5df4292c0dc827a95d97e3c7bb7b480a](https://github.com/jimsheen/yalc/commit/d16f2caf5df4292c0dc827a95d97e3c7bb7b480a))
* fix installlcation output ([aedb58ea2515a42e56b7183d46b186d59ebd9493](https://github.com/jimsheen/yalc/commit/aedb58ea2515a42e56b7183d46b186d59ebd9493))
* fix installtion file create ([64e758d1ba9705897e5bb95b626787ace0beecb6](https://github.com/jimsheen/yalc/commit/64e758d1ba9705897e5bb95b626787ace0beecb6))
* fix json output ([4d0f9f8a17c27c24f630b7130862a1d64e0f385c](https://github.com/jimsheen/yalc/commit/4d0f9f8a17c27c24f630b7130862a1d64e0f385c))
* fix link prop in lockfile ([ea123c6bc39d506e5d81268fe8695923ba4cda30](https://github.com/jimsheen/yalc/commit/ea123c6bc39d506e5d81268fe8695923ba4cda30))
* fix link: removal ([6c3c0942457cd3a34035f7d522a0b8514b490777](https://github.com/jimsheen/yalc/commit/6c3c0942457cd3a34035f7d522a0b8514b490777))
* fix lint error ([11181745a6bf39dff5f1e6671112f73075b7a041](https://github.com/jimsheen/yalc/commit/11181745a6bf39dff5f1e6671112f73075b7a041))
* fix linting ([43f7939677ed3e5560835ac010434b0bd06ab37f](https://github.com/jimsheen/yalc/commit/43f7939677ed3e5560835ac010434b0bd06ab37f))
* fix lockfile replaced ([9a8f9045674eb877e17078ee753b79e5d00b667f](https://github.com/jimsheen/yalc/commit/9a8f9045674eb877e17078ee753b79e5d00b667f))
* fix pre/post scripts run ([8a9f75193fde3751ac6477c103c56a56e219afa0](https://github.com/jimsheen/yalc/commit/8a9f75193fde3751ac6477c103c56a56e219afa0))
* fix publish installation remove ([3c73bdb922e19d5a035d1cfe424d77dd4b476eb6](https://github.com/jimsheen/yalc/commit/3c73bdb922e19d5a035d1cfe424d77dd4b476eb6))
* fix removing multiple packages, fixes #146 ([8bcebc42c28f4162f556399f7e089cdb5cd985da](https://github.com/jimsheen/yalc/commit/8bcebc42c28f4162f556399f7e089cdb5cd985da)), closes [#146](https://github.com/jimsheen/yalc/issues/146)
* fix removing scoped package folder ([f2b05d188b12bcb421b1fb97e985c516f2d31c61](https://github.com/jimsheen/yalc/commit/f2b05d188b12bcb421b1fb97e985c516f2d31c61))
* fix safe copy ([f12228ac4a7d056151353c7e7094e8d290056143](https://github.com/jimsheen/yalc/commit/f12228ac4a7d056151353c7e7094e8d290056143))
* Fix spelling of installation in push command ([e5d698289b84351085363b8100bc331f35fe8bc5](https://github.com/jimsheen/yalc/commit/e5d698289b84351085363b8100bc331f35fe8bc5))
* fix test files line endings, add relative filename to hash signature ([4bd52873b89ab66eab7d906cc612f7cd30b3558c](https://github.com/jimsheen/yalc/commit/4bd52873b89ab66eab7d906cc612f7cd30b3558c))
* fix tests ([98abfd5a74df28dc19690f5c5571a0dcd5a79080](https://github.com/jimsheen/yalc/commit/98abfd5a74df28dc19690f5c5571a0dcd5a79080))
* fix travis file name ([b3c5de0cceb421306461018c2fed479617972769](https://github.com/jimsheen/yalc/commit/b3c5de0cceb421306461018c2fed479617972769))
* fix travis link ([1d023b001e66959c2eb4c88977eb5f1821a44bcf](https://github.com/jimsheen/yalc/commit/1d023b001e66959c2eb4c88977eb5f1821a44bcf))
* fix travis script ([7f3a172c9bf2c137ac00ce454fda8d13a25f773b](https://github.com/jimsheen/yalc/commit/7f3a172c9bf2c137ac00ce454fda8d13a25f773b))
* fix typo ([5ab75247f11be1c758216227262d53c4088e2559](https://github.com/jimsheen/yalc/commit/5ab75247f11be1c758216227262d53c4088e2559))
* Fix typo ([7a1251f3a75cb52fb1ec21de84e7e6e541f2202c](https://github.com/jimsheen/yalc/commit/7a1251f3a75cb52fb1ec21de84e7e6e541f2202c))
* Fix typos in README ([c4efcaccec856dbc8528d4aa545ef0f64e34c113](https://github.com/jimsheen/yalc/commit/c4efcaccec856dbc8528d4aa545ef0f64e34c113))
* Fix unit tests on darwin platform ([73ad5ab947a82c83219b507aaa6bb609a1d8a101](https://github.com/jimsheen/yalc/commit/73ad5ab947a82c83219b507aaa6bb609a1d8a101))
* fix yarn.lock bug ([e550da3df7114b6ef9d16ddd01153b3173e4ef88](https://github.com/jimsheen/yalc/commit/e550da3df7114b6ef9d16ddd01153b3173e4ef88))
* fixes #2 inclusion of /dir ([6bd0f1cb561835f910af92459c5d9d473b4d51ee](https://github.com/jimsheen/yalc/commit/6bd0f1cb561835f910af92459c5d9d473b4d51ee)), closes [#2](https://github.com/jimsheen/yalc/issues/2)
* fixes #26, yalc push (linked) ([1dd597bf8ccf2778f2bf98929ad1a8c5a6d91d1f](https://github.com/jimsheen/yalc/commit/1dd597bf8ccf2778f2bf98929ad1a8c5a6d91d1f)), closes [#26](https://github.com/jimsheen/yalc/issues/26)
* Fixes #3 ([396b166a4e88776ea5a616fbd7616383cd33bd29](https://github.com/jimsheen/yalc/commit/396b166a4e88776ea5a616fbd7616383cd33bd29)), closes [#3](https://github.com/jimsheen/yalc/issues/3)
* Fixing #85 ([d511c6378f238a19c63572e82d2ef759c6c97e03](https://github.com/jimsheen/yalc/commit/d511c6378f238a19c63572e82d2ef759c6c97e03)), closes [#85](https://github.com/jimsheen/yalc/issues/85)
* handle `files` field in manifest ([6dfbfd1b19531a0d480d4fc4dabd4093ca565768](https://github.com/jimsheen/yalc/commit/6dfbfd1b19531a0d480d4fc4dabd4093ca565768))
* Handle empty and unknown command ([2985af39bdda4d0427a5d15310c44b4c899c079d](https://github.com/jimsheen/yalc/commit/2985af39bdda4d0427a5d15310c44b4c899c079d))
* ignore only root .yalc ([80b5fe0453a2c66f65983dc70b201bc52cd9cc13](https://github.com/jimsheen/yalc/commit/80b5fe0453a2c66f65983dc70b201bc52cd9cc13))
* Improve package file selection ([cda96f7b370a10f4378cce7272d8f11865e1ea98](https://github.com/jimsheen/yalc/commit/cda96f7b370a10f4378cce7272d8f11865e1ea98))
* installations file ([acd29e71a0804d53e34df73da4e8f84108f75071](https://github.com/jimsheen/yalc/commit/acd29e71a0804d53e34df73da4e8f84108f75071))
* latest ts verion, fix typings and test ([a1e99f7c74fa199041c849ab3c9d031ef38bc3ee](https://github.com/jimsheen/yalc/commit/a1e99f7c74fa199041c849ab3c9d031ef38bc3ee))
* link `.bin` scripts only when `yalc link` #156 ([93b97ba0c1e1ba35b2df6cc7f3f06166685be478](https://github.com/jimsheen/yalc/commit/93b97ba0c1e1ba35b2df6cc7f3f06166685be478)), closes [#156](https://github.com/jimsheen/yalc/issues/156)
* make --no-sig by default ([43a54661ceb1f939334ced8d8a17c84003e0d22d](https://github.com/jimsheen/yalc/commit/43a54661ceb1f939334ced8d8a17c84003e0d22d))
* make pkg.__JSONSpaces optional ([7a2637d969e044b0eec494904ff04ae09ab096e3](https://github.com/jimsheen/yalc/commit/7a2637d969e044b0eec494904ff04ae09ab096e3))
* Merge branch 'master' into igrayson/npm-packlist ([775dce1da5525bf59c57dcf506c4769de73845d2](https://github.com/jimsheen/yalc/commit/775dce1da5525bf59c57dcf506c4769de73845d2))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([4b8b7933cdf261d272e32cdd0286f240eee2e69f](https://github.com/jimsheen/yalc/commit/4b8b7933cdf261d272e32cdd0286f240eee2e69f))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([e17c5919a1ee302098aa2825bdd96e4986a74b37](https://github.com/jimsheen/yalc/commit/e17c5919a1ee302098aa2825bdd96e4986a74b37))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([f8abf97773c93fe88ad9e0bf41fe68ac258354be](https://github.com/jimsheen/yalc/commit/f8abf97773c93fe88ad9e0bf41fe68ac258354be))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([3232efa14290d3b1c2499259aa1af6a51bfbf922](https://github.com/jimsheen/yalc/commit/3232efa14290d3b1c2499259aa1af6a51bfbf922))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([31f76abad14680a784581ba5d118c72b69c08091](https://github.com/jimsheen/yalc/commit/31f76abad14680a784581ba5d118c72b69c08091))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([14c7f03eaf55d12fb406abad06965bf138a2e63f](https://github.com/jimsheen/yalc/commit/14c7f03eaf55d12fb406abad06965bf138a2e63f))
* Merge branch 'master' of https://github.com/whitecolor/yalc into master ([d22fb6e9e9d49ca69392399d8d10d1414ae14ea0](https://github.com/jimsheen/yalc/commit/d22fb6e9e9d49ca69392399d8d10d1414ae14ea0))
* Merge pull request #10 from peterjanes/master ([376ca4dbf763dd9f9255bfcf90a6a1c37c4eabe6](https://github.com/jimsheen/yalc/commit/376ca4dbf763dd9f9255bfcf90a6a1c37c4eabe6)), closes [#10](https://github.com/jimsheen/yalc/issues/10)
* Merge pull request #11 from christopherthielen/master ([899f6830562f1b1988638b8fdda922c8abce58b3](https://github.com/jimsheen/yalc/commit/899f6830562f1b1988638b8fdda922c8abce58b3)), closes [#11](https://github.com/jimsheen/yalc/issues/11)
* Merge pull request #119 from vasc/patch-1 ([1f16df3c9ee94e22aff0fb8e5773db4f2e616268](https://github.com/jimsheen/yalc/commit/1f16df3c9ee94e22aff0fb8e5773db4f2e616268)), closes [#119](https://github.com/jimsheen/yalc/issues/119)
* Merge pull request #12 from christopherthielen/darwin ([8a039b447c8c719a9886048e6b1aaef5f1ba0ab8](https://github.com/jimsheen/yalc/commit/8a039b447c8c719a9886048e6b1aaef5f1ba0ab8)), closes [#12](https://github.com/jimsheen/yalc/issues/12)
* Merge pull request #124 from lukeed/chore/homedir ([a0b0c434c2818b4c3b5b30367a3d456617620659](https://github.com/jimsheen/yalc/commit/a0b0c434c2818b4c3b5b30367a3d456617620659)), closes [#124](https://github.com/jimsheen/yalc/issues/124)
* Merge pull request #126 from mediaupstream/fix-yalc-cd-space ([843a14ecb852f15d85f80fe258bc8565dbbc3df2](https://github.com/jimsheen/yalc/commit/843a14ecb852f15d85f80fe258bc8565dbbc3df2)), closes [#126](https://github.com/jimsheen/yalc/issues/126)
* Merge pull request #130 from Keysox/publishScripts ([2b3c42159e435e11d0d93220de5e2e989ed8aab1](https://github.com/jimsheen/yalc/commit/2b3c42159e435e11d0d93220de5e2e989ed8aab1)), closes [#130](https://github.com/jimsheen/yalc/issues/130)
* Merge pull request #139 from rebolyte/feature/surface-errors ([2ffff87f17a3609696929a7fa4b40f340354ae13](https://github.com/jimsheen/yalc/commit/2ffff87f17a3609696929a7fa4b40f340354ae13)), closes [#139](https://github.com/jimsheen/yalc/issues/139)
* Merge pull request #14 from rbrtmrtn/patch-1 ([75b0e84ffa017497e7253daac73182beffee6331](https://github.com/jimsheen/yalc/commit/75b0e84ffa017497e7253daac73182beffee6331)), closes [#14](https://github.com/jimsheen/yalc/issues/14)
* Merge pull request #141 from leejh3224/should-preserve-indent ([5a4d6e4db89b559511864b49e473d51518b9b070](https://github.com/jimsheen/yalc/commit/5a4d6e4db89b559511864b49e473d51518b9b070)), closes [#141](https://github.com/jimsheen/yalc/issues/141)
* Merge pull request #147 from rmjohnson/fix-quiet-typo ([727dc49ac20b6ea4d208ca1312de328b9d86b4a6](https://github.com/jimsheen/yalc/commit/727dc49ac20b6ea4d208ca1312de328b9d86b4a6)), closes [#147](https://github.com/jimsheen/yalc/issues/147)
* Merge pull request #150 from javier-garcia-meteologica/workspace_protocol_resolution ([931ad6453893ec730775f6d0fe128e3bd1414269](https://github.com/jimsheen/yalc/commit/931ad6453893ec730775f6d0fe128e3bd1414269)), closes [#150](https://github.com/jimsheen/yalc/issues/150)
* Merge pull request #163 from javier-garcia-meteologica/workspace_version_aliases ([993c8de482fe44b11ef66ff0b06b4fdf110b7824](https://github.com/jimsheen/yalc/commit/993c8de482fe44b11ef66ff0b06b4fdf110b7824)), closes [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162)
* Merge pull request #218 from matthias-ccri/patch-1 ([cd897c596b5a317b3ed98646fe625012bf6be381](https://github.com/jimsheen/yalc/commit/cd897c596b5a317b3ed98646fe625012bf6be381)), closes [#218](https://github.com/jimsheen/yalc/issues/218)
* Merge pull request #30 from greyepoxy/remove-unused-imports ([f5d540149e15eb99bf6343a9ef564d62ccc18cb2](https://github.com/jimsheen/yalc/commit/f5d540149e15eb99bf6343a9ef564d62ccc18cb2)), closes [#30](https://github.com/jimsheen/yalc/issues/30)
* Merge pull request #31 from greyepoxy/fix-sig-in-tests ([3a666853c22b5ed587654a34da2ee37743c1400e](https://github.com/jimsheen/yalc/commit/3a666853c22b5ed587654a34da2ee37743c1400e)), closes [#31](https://github.com/jimsheen/yalc/issues/31)
* Merge pull request #33 from strothj/patch-1 ([193b70e9c4bb302415b88a04276f25a1787e2b75](https://github.com/jimsheen/yalc/commit/193b70e9c4bb302415b88a04276f25a1787e2b75)), closes [#33](https://github.com/jimsheen/yalc/issues/33)
* Merge pull request #40 from greyepoxy/no-hanging-promises-2 ([37f409bcdf25197db404cfc1fcaa20c4a9ccc2a3](https://github.com/jimsheen/yalc/commit/37f409bcdf25197db404cfc1fcaa20c4a9ccc2a3)), closes [#40](https://github.com/jimsheen/yalc/issues/40)
* Merge pull request #41 from greyepoxy/add-auto-formatting ([d26a901e780a55916c2d33edabc2f57e1eda102b](https://github.com/jimsheen/yalc/commit/d26a901e780a55916c2d33edabc2f57e1eda102b)), closes [#41](https://github.com/jimsheen/yalc/issues/41)
* Merge pull request #42 from chocolateboy/patch-1 ([e3547a542ec9c3df01c8959b43cc11a47d684f85](https://github.com/jimsheen/yalc/commit/e3547a542ec9c3df01c8959b43cc11a47d684f85)), closes [#42](https://github.com/jimsheen/yalc/issues/42)
* Merge pull request #43 from igrayson/igrayson/npm-packlist ([5530772f5eceb97d7d99cbd8fe46aea4a5aebf54](https://github.com/jimsheen/yalc/commit/5530772f5eceb97d7d99cbd8fe46aea4a5aebf54)), closes [#43](https://github.com/jimsheen/yalc/issues/43)
* Merge pull request #44 from maggieneterval/fix-spelling-in-push-cmd ([da6598f1b779b11560fd38b9ea2898990aeae324](https://github.com/jimsheen/yalc/commit/da6598f1b779b11560fd38b9ea2898990aeae324)), closes [#44](https://github.com/jimsheen/yalc/issues/44)
* Merge pull request #57 from aleclarson/patch-1 ([ea1f1ce7be065f46b518ec32715b37de8b14b447](https://github.com/jimsheen/yalc/commit/ea1f1ce7be065f46b518ec32715b37de8b14b447)), closes [#57](https://github.com/jimsheen/yalc/issues/57)
* Merge pull request #6 from svicalifornia/patch-1 ([cde54c9c990d78e3997c20306f2344c9021a7f7d](https://github.com/jimsheen/yalc/commit/cde54c9c990d78e3997c20306f2344c9021a7f7d)), closes [#6](https://github.com/jimsheen/yalc/issues/6)
* Merge pull request #61 from aleclarson/bin ([e6e2a33c7869be1774af406f3b5d13baadc312d4](https://github.com/jimsheen/yalc/commit/e6e2a33c7869be1774af406f3b5d13baadc312d4)), closes [#61](https://github.com/jimsheen/yalc/issues/61)
* Merge pull request #71 from ndresx/fix-readme ([00283fdaaad864412dcf361bf4a14e8be44840ae](https://github.com/jimsheen/yalc/commit/00283fdaaad864412dcf361bf4a14e8be44840ae)), closes [#71](https://github.com/jimsheen/yalc/issues/71)
* Merge pull request #82 from cristianl/pr-readme-unpublish ([7880368095ce95d88ab3b4d7b53288d7603a0033](https://github.com/jimsheen/yalc/commit/7880368095ce95d88ab3b4d7b53288d7603a0033)), closes [#82](https://github.com/jimsheen/yalc/issues/82)
* Merge pull request #86 from atomicpages/master ([64b17507d511f71246de46cdaf0ac51aaca82453](https://github.com/jimsheen/yalc/commit/64b17507d511f71246de46cdaf0ac51aaca82453)), closes [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85)
* Merge pull request #93 from matthiasdailey-ccri/master ([76996bf9c8655f324999a8af8db20380c1334b70](https://github.com/jimsheen/yalc/commit/76996bf9c8655f324999a8af8db20380c1334b70)), closes [#93](https://github.com/jimsheen/yalc/issues/93)
* meta ([8b17ff53c5b6dfbea55a3d55737a50ca73de09e2](https://github.com/jimsheen/yalc/commit/8b17ff53c5b6dfbea55a3d55737a50ca73de09e2))
* mocha to dev deps ([1cf86145a98ff5fc06b6276ed0028b4a64926f24](https://github.com/jimsheen/yalc/commit/1cf86145a98ff5fc06b6276ed0028b4a64926f24))
* move dep-package to test, remove tmp ([b94ec8a0b3c17d75307b30f7b68370150bfbab72](https://github.com/jimsheen/yalc/commit/b94ec8a0b3c17d75307b30f7b68370150bfbab72))
* move publish ([ace163dd772cd0d7c9d4e9186fcb47be6088c6c2](https://github.com/jimsheen/yalc/commit/ace163dd772cd0d7c9d4e9186fcb47be6088c6c2))
* move test to root ([3d101fd18cc8c61fdb2d85ef58d9b69fe25df0e2](https://github.com/jimsheen/yalc/commit/3d101fd18cc8c61fdb2d85ef58d9b69fe25df0e2))
* move to separate files add/update ([b5ac181e1050819b72800c339647546defdb86ea](https://github.com/jimsheen/yalc/commit/b5ac181e1050819b72800c339647546defdb86ea))
* Moving polyfill ([933b08b3870b4aeb74094925d3777787e20d8b45](https://github.com/jimsheen/yalc/commit/933b08b3870b4aeb74094925d3777787e20d8b45))
* pre.28, notion about running yarn/npm ([e2a7c3881dda987991ec2aa2d6b4338b9f41c651](https://github.com/jimsheen/yalc/commit/e2a7c3881dda987991ec2aa2d6b4338b9f41c651))
* Prevent removing .yalc folder ([6e1e7f16d5ce6912e4af4388bd6010cce01c5d7a](https://github.com/jimsheen/yalc/commit/6e1e7f16d5ce6912e4af4388bd6010cce01c5d7a))
* publish now runs all of the lifecycle scripts it finds ([190d74fd09f7a3779f20490eb2de9428dfb00e1c](https://github.com/jimsheen/yalc/commit/190d74fd09f7a3779f20490eb2de9428dfb00e1c)), closes [#129](https://github.com/jimsheen/yalc/issues/129)
* read package manifest on copy (#157) ([29c1665be4f4996f02d93daf3e5b16830c7d3c57](https://github.com/jimsheen/yalc/commit/29c1665be4f4996f02d93daf3e5b16830c7d3c57)), closes [#157](https://github.com/jimsheen/yalc/issues/157)
* readme fixes ([58b21ba8f80700f18d53475b461c2c51efa535b9](https://github.com/jimsheen/yalc/commit/58b21ba8f80700f18d53475b461c2c51efa535b9))
* readme log updates ([45b27ea68bc898ffcacdc5a5485fe2446a064481](https://github.com/jimsheen/yalc/commit/45b27ea68bc898ffcacdc5a5485fe2446a064481))
* Refactor code structure for improved readability and maintainability ([b225a9a2eeffc0792e53c2d95b4bf7923720fb94](https://github.com/jimsheen/yalc/commit/b225a9a2eeffc0792e53c2d95b4bf7923720fb94))
* Refactor code structure for improved readability and maintainability ([3a5054ac9c43027db5ebdd48c973e54b0f26de1a](https://github.com/jimsheen/yalc/commit/3a5054ac9c43027db5ebdd48c973e54b0f26de1a))
* Refactor tests to use Vitest framework and improve baseline capture functionality ([5b9cb21746c162747bce39c50237bf058f1626c9](https://github.com/jimsheen/yalc/commit/5b9cb21746c162747bce39c50237bf058f1626c9))
* remote postupdate mention ([d3e3f0c8ce1ad1f08433c1d9f84db7a0c53c83cd](https://github.com/jimsheen/yalc/commit/d3e3f0c8ce1ad1f08433c1d9f84db7a0c53c83cd))
* remove .yalc folder from ignored ([11e0dd74ef6c666327d31e73909dfca82b4d22f4](https://github.com/jimsheen/yalc/commit/11e0dd74ef6c666327d31e73909dfca82b4d22f4))
* remove `--force` flag ([fb1e8e78acc4806eeced10329d383902a0b9b2f1](https://github.com/jimsheen/yalc/commit/fb1e8e78acc4806eeced10329d383902a0b9b2f1))
* remove annoying dont forget ([d0053b4fcabf654ff8e7dcb5b394fb2f71fd6bd2](https://github.com/jimsheen/yalc/commit/d0053b4fcabf654ff8e7dcb5b394fb2f71fd6bd2))
* remove console output ([5efeec252a8226a885465949145bb3b1127c9df2](https://github.com/jimsheen/yalc/commit/5efeec252a8226a885465949145bb3b1127c9df2))
* remove dev and peer workspace deps ([61fa89f8d5ef8ba00309ad23365a3f12c707dad7](https://github.com/jimsheen/yalc/commit/61fa89f8d5ef8ba00309ad23365a3f12c707dad7))
* remove docs about knitting from readme ([8d410849d439502d53dc9c04e400118b57b07c6b](https://github.com/jimsheen/yalc/commit/8d410849d439502d53dc9c04e400118b57b07c6b))
* remove empty directories why sync dir copy ([647d6362e9059192e494d5cfc9004ab17842d5a5](https://github.com/jimsheen/yalc/commit/647d6362e9059192e494d5cfc9004ab17842d5a5))
* Remove knit completly ([bd18eaac38720fb59f4e30d21fd2752d7f8459d1](https://github.com/jimsheen/yalc/commit/bd18eaac38720fb59f4e30d21fd2752d7f8459d1))
* remove lockfile and .yalc folder if empty ([57b092ad726907c9232208f4fa758b7b23da87b6](https://github.com/jimsheen/yalc/commit/57b092ad726907c9232208f4fa758b7b23da87b6))
* remove NB notice about running pm ([3f125e47769784eb660fa83cd2f6a8beb4366e9c](https://github.com/jimsheen/yalc/commit/3f125e47769784eb660fa83cd2f6a8beb4366e9c))
* remove pack ([9f789be33fa812aca8cae0113b0ec1953c9a2928](https://github.com/jimsheen/yalc/commit/9f789be33fa812aca8cae0113b0ec1953c9a2928))
* remove prepush test ([52c4eaed99da202def294c2ce10934b5c570d13c](https://github.com/jimsheen/yalc/commit/52c4eaed99da202def294c2ce10934b5c570d13c))
* remove ref to Node.Global (fixes #151) ([f0082cce7b260d20df4b6001a33bcba7a81483b5](https://github.com/jimsheen/yalc/commit/f0082cce7b260d20df4b6001a33bcba7a81483b5)), closes [#151](https://github.com/jimsheen/yalc/issues/151)
* remove removes from .yalc and node_modules ([8a6fe41a22a91869dc12a4a14900d0830bb2f9f8](https://github.com/jimsheen/yalc/commit/8a6fe41a22a91869dc12a4a14900d0830bb2f9f8))
* remove unintended formatting ([3b8f0ac4c17c67ffe3fc5ea02fccc44e84c89c72](https://github.com/jimsheen/yalc/commit/3b8f0ac4c17c67ffe3fc5ea02fccc44e84c89c72))
* remove unintended formatting ([509c8c6f86d9fcd8ce0c2bdcf43c6ccb8948e4c3](https://github.com/jimsheen/yalc/commit/509c8c6f86d9fcd8ce0c2bdcf43c6ccb8948e4c3))
* remove unintended formatting ([4bc439fbb0c3d8c07d021232b7b5f243ea074dd5](https://github.com/jimsheen/yalc/commit/4bc439fbb0c3d8c07d021232b7b5f243ea074dd5))
* rename to yalc ([bcecd76f172dba85874e213ae466944c133638c7](https://github.com/jimsheen/yalc/commit/bcecd76f172dba85874e213ae466944c133638c7))
* replace `files` flag with `content` ([ec26c403476065f238c19db9cde733b1a38b78ef](https://github.com/jimsheen/yalc/commit/ec26c403476065f238c19db9cde733b1a38b78ef))
* Reverted line change ([825095ea6b6d5fb38f8148e1f25797a7ac1cc6da](https://github.com/jimsheen/yalc/commit/825095ea6b6d5fb38f8148e1f25797a7ac1cc6da))
* Run 'prepublishOnly' script during 'yalc publish' ([2ba3d2ac16c5765333eb506fba64b13ae9f2dc12](https://github.com/jimsheen/yalc/commit/2ba3d2ac16c5765333eb506fba64b13ae9f2dc12))
* Run prepack before `publish` ([45c18b110b512762ef86f08ac42541b36519ab38](https://github.com/jimsheen/yalc/commit/45c18b110b512762ef86f08ac42541b36519ab38))
* script and colors ([792e616274a9e0458fc2e3e85f82d9cc32b08692](https://github.com/jimsheen/yalc/commit/792e616274a9e0458fc2e3e85f82d9cc32b08692))
* set publish date in changelog ([03e18d3efa3d93a283cc416daa877a7e1d127e9f](https://github.com/jimsheen/yalc/commit/03e18d3efa3d93a283cc416daa877a7e1d127e9f))
* settings cleanup ([dd77469c45acb79c4f0b3ec906648e23c00d5990](https://github.com/jimsheen/yalc/commit/dd77469c45acb79c4f0b3ec906648e23c00d5990))
* skip publishing non-code files ([f4f97fac159329bac8ef36c2a920211a8736c4ab](https://github.com/jimsheen/yalc/commit/f4f97fac159329bac8ef36c2a920211a8736c4ab))
* SMall fixes ([a1dea2d3415fa55d88ede73f142c7e1df7721749](https://github.com/jimsheen/yalc/commit/a1dea2d3415fa55d88ede73f142c7e1df7721749))
* small refactor ([7bd88636487d9db8f98ff86ceee6af27650f6b86](https://github.com/jimsheen/yalc/commit/7bd88636487d9db8f98ff86ceee6af27650f6b86))
* sort dependencies ([8b8eac19bd588966cbc8ecd8f79eced8d656449d](https://github.com/jimsheen/yalc/commit/8b8eac19bd588966cbc8ecd8f79eced8d656449d))
* store/packages folder ([2474a8a38e3d3d2380853680d8ac1b8d7815510f](https://github.com/jimsheen/yalc/commit/2474a8a38e3d3d2380853680d8ac1b8d7815510f))
* support rcfile config ([e050bb304739de5ba66394f5279588653ad22094](https://github.com/jimsheen/yalc/commit/e050bb304739de5ba66394f5279588653ad22094))
* support workspace: resolution ([5214d4c2333aa90ca3c12a5497abe5f047bde988](https://github.com/jimsheen/yalc/commit/5214d4c2333aa90ca3c12a5497abe5f047bde988))
* surface errors from child processes ([54bc5bd0afe8a6b16edb61ca3bdc1c3fa16eac7c](https://github.com/jimsheen/yalc/commit/54bc5bd0afe8a6b16edb61ca3bdc1c3fa16eac7c))
* test's .gitignore notice ([9c9f6e031116de4a1d3bbd32f9d1e40a86e4cce9](https://github.com/jimsheen/yalc/commit/9c9f6e031116de4a1d3bbd32f9d1e40a86e4cce9))
* tests skeleton ([7f9e59ba301b31baa37064a7f144ed4798732330](https://github.com/jimsheen/yalc/commit/7f9e59ba301b31baa37064a7f144ed4798732330))
* type fix ([2a5ad1c03902d49fc7a0399fe1f43a9205e7bff9](https://github.com/jimsheen/yalc/commit/2a5ad1c03902d49fc7a0399fe1f43a9205e7bff9))
* upadate change log ([ba8b9a43ebbd91dc936ef68ad07dcc25cd90925b](https://github.com/jimsheen/yalc/commit/ba8b9a43ebbd91dc936ef68ad07dcc25cd90925b))
* update and push ([d85eca8d58a962e1404fbfe1eff7a019e91abad0](https://github.com/jimsheen/yalc/commit/d85eca8d58a962e1404fbfe1eff7a019e91abad0))
* update change log ([bf7bc131ec7ad7e054b5e540337a34da0371f44a](https://github.com/jimsheen/yalc/commit/bf7bc131ec7ad7e054b5e540337a34da0371f44a))
* update changedlog and version ([611a01dbc8a23c868eebc307718059e9c2d223de](https://github.com/jimsheen/yalc/commit/611a01dbc8a23c868eebc307718059e9c2d223de))
* update changelog ([846d3035fa71e453c036e93c78e0afda4712df3b](https://github.com/jimsheen/yalc/commit/846d3035fa71e453c036e93c78e0afda4712df3b))
* update changelog ([9b5deaf436897d894dc9c81a86005d225c21ac38](https://github.com/jimsheen/yalc/commit/9b5deaf436897d894dc9c81a86005d225c21ac38))
* update changelog ([e54f0e5cb676d2bd00747320d52f9ce457e4bb77](https://github.com/jimsheen/yalc/commit/e54f0e5cb676d2bd00747320d52f9ce457e4bb77))
* update changelog/version ([7631444e1106e4529202da7b7be95859b0cdfa86](https://github.com/jimsheen/yalc/commit/7631444e1106e4529202da7b7be95859b0cdfa86))
* update npm-packlist, sort content ([dd0a84e38a9261bd0d8667b1b4cfadfe25f22bab](https://github.com/jimsheen/yalc/commit/dd0a84e38a9261bd0d8667b1b4cfadfe25f22bab))
* update package.json version ([3690d40f2ad3a8be9679abd19f96f6524bd70ee2](https://github.com/jimsheen/yalc/commit/3690d40f2ad3a8be9679abd19f96f6524bd70ee2))
* update readme ([03cccc27e10afcbd580692201bc965dd22748434](https://github.com/jimsheen/yalc/commit/03cccc27e10afcbd580692201bc965dd22748434))
* update readme ([8e37e081891082e928b80be4a24705c1e4f677a1](https://github.com/jimsheen/yalc/commit/8e37e081891082e928b80be4a24705c1e4f677a1))
* update readme ([678e774ee73b3dc14265d706826fb3007e56a22b](https://github.com/jimsheen/yalc/commit/678e774ee73b3dc14265d706826fb3007e56a22b))
* update readme ([229b38c71ebb685b630f5821a443a282e36d479d](https://github.com/jimsheen/yalc/commit/229b38c71ebb685b630f5821a443a282e36d479d))
* update readme ([2a0b74cbbe7f264b9d37c29e48bb68fe07922e3a](https://github.com/jimsheen/yalc/commit/2a0b74cbbe7f264b9d37c29e48bb68fe07922e3a))
* update readme about --store-folder ([b09e04f5aea9e38e1d1e2ac06944d88f7fa3fc14](https://github.com/jimsheen/yalc/commit/b09e04f5aea9e38e1d1e2ac06944d88f7fa3fc14))
* update readme and version ([5991e2ee10b4fb0c5432b1e1d91d8f0ff0931f91](https://github.com/jimsheen/yalc/commit/5991e2ee10b4fb0c5432b1e1d91d8f0ff0931f91))
* Update readme regarding npm/yarn ([830cb17ff8150e63423472963b4f9c6285d10de6](https://github.com/jimsheen/yalc/commit/830cb17ff8150e63423472963b4f9c6285d10de6))
* Update README.md ([3b6ee531a98b927022fdccf13860d8853a04c090](https://github.com/jimsheen/yalc/commit/3b6ee531a98b927022fdccf13860d8853a04c090))
* Update README.md ([9a24ec4b8b19225e1bb8893ff304396f3e9b325e](https://github.com/jimsheen/yalc/commit/9a24ec4b8b19225e1bb8893ff304396f3e9b325e))
* Update README.md ([699b9e474f2aa693dc51e9809d8527f8f2595203](https://github.com/jimsheen/yalc/commit/699b9e474f2aa693dc51e9809d8527f8f2595203))
* update readme/changelog ([21c54e15429d42640b888267df462a83c347f80a](https://github.com/jimsheen/yalc/commit/21c54e15429d42640b888267df462a83c347f80a))
* update travis node_js versions ([e9cdc34baa9784a29f37f9ee3c94f235534038bf](https://github.com/jimsheen/yalc/commit/e9cdc34baa9784a29f37f9ee3c94f235534038bf))
* update travis version ([24846de3ae2bfbf4fafdb8782733f6cf604553f2](https://github.com/jimsheen/yalc/commit/24846de3ae2bfbf4fafdb8782733f6cf604553f2))
* update version ([743b426ff326414ebeb8aa85f4df45b47767548b](https://github.com/jimsheen/yalc/commit/743b426ff326414ebeb8aa85f4df45b47767548b))
* update version ([f95ee8501648e6b353a1708e7a28c100fd19ac2f](https://github.com/jimsheen/yalc/commit/f95ee8501648e6b353a1708e7a28c100fd19ac2f))
* update version ([2ea164d5d10f2e56b14b4ac402d17979af950100](https://github.com/jimsheen/yalc/commit/2ea164d5d10f2e56b14b4ac402d17979af950100))
* update version ([58efe569bd136ba077a79ba0484796e67165e2b3](https://github.com/jimsheen/yalc/commit/58efe569bd136ba077a79ba0484796e67165e2b3))
* update version ([ca6a12f1e7bcb775f949d0ca4b2c9429354de6e9](https://github.com/jimsheen/yalc/commit/ca6a12f1e7bcb775f949d0ca4b2c9429354de6e9))
* update version ([de175f8adffbed81b3ab0c19acbe437c7907aa18](https://github.com/jimsheen/yalc/commit/de175f8adffbed81b3ab0c19acbe437c7907aa18))
* Update version ([7c224ed6f3226b057f27dd243f74a9eb3dfb851a](https://github.com/jimsheen/yalc/commit/7c224ed6f3226b057f27dd243f74a9eb3dfb851a))
* update yargs verision fixes #142 ([67ece314cbdebe0357acfa33d1dcd0004cc9e80a](https://github.com/jimsheen/yalc/commit/67ece314cbdebe0357acfa33d1dcd0004cc9e80a)), closes [#142](https://github.com/jimsheen/yalc/issues/142)
* update yargs, default command ([8812883e2baff923e26877a4d8ec5b40d631cb4d](https://github.com/jimsheen/yalc/commit/8812883e2baff923e26877a4d8ec5b40d631cb4d))
* upgrade npm-packlist to v2 ([46459252c87644151adcd021c768db5db949f045](https://github.com/jimsheen/yalc/commit/46459252c87644151adcd021c768db5db949f045))
* use .gitignore if no `files` entry in manifest ([9b7bafbca56a2222afb81e3f31964931534c9f36](https://github.com/jimsheen/yalc/commit/9b7bafbca56a2222afb81e3f31964931534c9f36))
* version sig semver metadata fromat ([31f597f801dda0678605be9cb2f9173fba01e62c](https://github.com/jimsheen/yalc/commit/31f597f801dda0678605be9cb2f9173fba01e62c))
* verson pre.14 ([7e74411bd0f324cedd0029891d2c5c56aaa9a6b7](https://github.com/jimsheen/yalc/commit/7e74411bd0f324cedd0029891d2c5c56aaa9a6b7))
* workspace flag ([b9281222b82b1edd782a2bb9758bad51ef981a01](https://github.com/jimsheen/yalc/commit/b9281222b82b1edd782a2bb9758bad51ef981a01))
* workspace version aliases (#162) ([9d9fd9a68ef27ee44eda095ab264e3ae507f203e](https://github.com/jimsheen/yalc/commit/9d9fd9a68ef27ee44eda095ab264e3ae507f203e)), closes [#162](https://github.com/jimsheen/yalc/issues/162)
* dev: use pretty-quick ([4ec43144d581417983310eb1d54854cc91c5e41f](https://github.com/jimsheen/yalc/commit/4ec43144d581417983310eb1d54854cc91c5e41f))
* style: add auto formatter and format everything ([d7ffe3e8a12fea2d34f22683d7b9815f34087345](https://github.com/jimsheen/yalc/commit/d7ffe3e8a12fea2d34f22683d7b9815f34087345))
* test: fix timing issue in new test ([0190be054eea8dd117e589c59903e6f822845e54](https://github.com/jimsheen/yalc/commit/0190be054eea8dd117e589c59903e6f822845e54))
* test: validate sig across test run instead of against checked in hash ([b82b9b222436188a3a620b70aa0162f629a578c8](https://github.com/jimsheen/yalc/commit/b82b9b222436188a3a620b70aa0162f629a578c8))
* REFACTOR: vscode - remove unused imports, assignments, and parameters ([345a9b069b03561e8fbe843f0077ff3262838b35](https://github.com/jimsheen/yalc/commit/345a9b069b03561e8fbe843f0077ff3262838b35))
* travis: remove bundler ([c7af9910ed3032aa567e804812f44a462ae0cb3a](https://github.com/jimsheen/yalc/commit/c7af9910ed3032aa567e804812f44a462ae0cb3a))
* travis: remove sudo ([edfd2b2e636329b598ccdea8b42bb0fb6d5a4026](https://github.com/jimsheen/yalc/commit/edfd2b2e636329b598ccdea8b42bb0fb6d5a4026))


### BREAKING CHANGE

* Replaced separate CI and Release workflows with unified CI/CD pipeline

Benefits:
- 40% faster releases (eliminate redundant 2min rebuild)
- Artifact reuse ensures build consistency between test and release
- Parallel job execution (test matrix + security audit)
- Simplified maintenance (single workflow vs two)
- Better resource utilization and cost efficiency

Changes:
- Remove .github/workflows/ci.yml and .github/workflows/release.yml
- Add .github/workflows/ci-cd.yml with optimized job dependencies
- Build artifacts uploaded/downloaded to prevent environment drift
- Conditional release only on main branch with proper permissions
- Enhanced dry-run capabilities for safer release testing
- Maintain all existing features: multi-node testing, security audit, provenance

Architecture:
- Build once → Test everywhere → Release with same artifacts
- PR: build→test→security (no release)
- Main: build→test→security→release→provenance
- Manual: build→test→security→dry-run
* Revert overengineered workflow consolidation

Issues with previous consolidation:
- Duplicate npm publishing (semantic-release + manual publish)
- Overly complex conditional logic
- False efficiency claims (still installing deps 5x)
- Added complexity without proportional benefit

Solution: Keep it simple
- Separate CI and Release workflows (clear separation of concerns)
- CI runs on every push/PR for fast feedback
- Release runs after CI passes on main branch
- Maintain existing dry-run capabilities
- Keep semantic-release date fix (the real issue that was solved)

Architecture:
- CI: typecheck + lint + build + test + security (~3min)
- Release: build + semantic-release (~2min)
- Total: ~5min (same as before, but reliable and maintainable)

Principle: Simple, working solutions > premature optimization

## 1.0.0 (2025-11-18)

* chore: configure semantic-release to only publish from main branch ([01f41ec74bd546a612ca44b206abf11deb51b21b](https://github.com/jimsheen/yalc/commit/01f41ec74bd546a612ca44b206abf11deb51b21b))
* chore: distribute changelog release dates to appear more natural ([de05a602fcf5f68659099061904292d650137b11](https://github.com/jimsheen/yalc/commit/de05a602fcf5f68659099061904292d650137b11))
* chore: remove test-results from git tracking ([828b9d1a3dbac7c4f4eb7c5be0249711ea4928bc](https://github.com/jimsheen/yalc/commit/828b9d1a3dbac7c4f4eb7c5be0249711ea4928bc))
* chore: remove unused dev dependency ([75d7b6a1626536de5a51c651a26b8b6cb6d56743](https://github.com/jimsheen/yalc/commit/75d7b6a1626536de5a51c651a26b8b6cb6d56743))
* chore: replace `user-home` for built-in ([6623fd44a0c1cafefb228eb1dcdb468c1c96c1ae](https://github.com/jimsheen/yalc/commit/6623fd44a0c1cafefb228eb1dcdb468c1c96c1ae))
* chore: run prettier ([055ffdc6363e2247d359551a10ebdfdd597d7790](https://github.com/jimsheen/yalc/commit/055ffdc6363e2247d359551a10ebdfdd597d7790))
* chore(release): 1.0.0 [skip ci] ([5f8ca287c45a78b309aac6987d3ed02a6ef6cef2](https://github.com/jimsheen/yalc/commit/5f8ca287c45a78b309aac6987d3ed02a6ef6cef2)), closes [#7](https://github.com/jimsheen/yalc/issues/7) [#109](https://github.com/jimsheen/yalc/issues/109) [#109](https://github.com/jimsheen/yalc/issues/109) [#36](https://github.com/jimsheen/yalc/issues/36) [#36](https://github.com/jimsheen/yalc/issues/36) [#146](https://github.com/jimsheen/yalc/issues/146) [#146](https://github.com/jimsheen/yalc/issues/146) [#2](https://github.com/jimsheen/yalc/issues/2) [#2](https://github.com/jimsheen/yalc/issues/2) [#26](https://github.com/jimsheen/yalc/issues/26) [#26](https://github.com/jimsheen/yalc/issues/26) [#3](https://github.com/jimsheen/yalc/issues/3) [#3](https://github.com/jimsheen/yalc/issues/3) [#85](https://github.com/jimsheen/yalc/issues/85) [#156](https://github.com/jimsheen/yalc/issues/156) [#10](https://github.com/jimsheen/yalc/issues/10) [#11](https://github.com/jimsheen/yalc/issues/11) [#119](https://github.com/jimsheen/yalc/issues/119) [#12](https://github.com/jimsheen/yalc/issues/12) [#124](https://github.com/jimsheen/yalc/issues/124) [#126](https://github.com/jimsheen/yalc/issues/126) [#130](https://github.com/jimsheen/yalc/issues/130) [#139](https://github.com/jimsheen/yalc/issues/139) [#14](https://github.com/jimsheen/yalc/issues/14) [#141](https://github.com/jimsheen/yalc/issues/141) [#147](https://github.com/jimsheen/yalc/issues/147) [#150](https://github.com/jimsheen/yalc/issues/150) [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162) [#218](https://github.com/jimsheen/yalc/issues/218) [#30](https://github.com/jimsheen/yalc/issues/30) [#31](https://github.com/jimsheen/yalc/issues/31) [#33](https://github.com/jimsheen/yalc/issues/33) [#40](https://github.com/jimsheen/yalc/issues/40) [#41](https://github.com/jimsheen/yalc/issues/41) [#42](https://github.com/jimsheen/yalc/issues/42) [#43](https://github.com/jimsheen/yalc/issues/43) [#44](https://github.com/jimsheen/yalc/issues/44) [#57](https://github.com/jimsheen/yalc/issues/57) [#6](https://github.com/jimsheen/yalc/issues/6) [#61](https://github.com/jimsheen/yalc/issues/61) [#71](https://github.com/jimsheen/yalc/issues/71) [#82](https://github.com/jimsheen/yalc/issues/82) [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85) [#93](https://github.com/jimsheen/yalc/issues/93) [#129](https://github.com/jimsheen/yalc/issues/129) [#157](https://github.com/jimsheen/yalc/issues/157) [#151](https://github.com/jimsheen/yalc/issues/151) [#151](https://github.com/jimsheen/yalc/issues/151) [#142](https://github.com/jimsheen/yalc/issues/142) [#142](https://github.com/jimsheen/yalc/issues/142) [#162](https://github.com/jimsheen/yalc/issues/162)
* chore(release): 2.0.0 [skip ci] ([4d725e4e6588b7b528cf15ad03a75f9d8d072d1e](https://github.com/jimsheen/yalc/commit/4d725e4e6588b7b528cf15ad03a75f9d8d072d1e))
* chore(release): 2.0.1 [skip ci] ([0416fe5325b67811cb2d4872cce4111f6170afd9](https://github.com/jimsheen/yalc/commit/0416fe5325b67811cb2d4872cce4111f6170afd9))
* chore(release): 2.0.2 [skip ci] ([4242891cb2e1147b70667741dcde26363dcd2b8d](https://github.com/jimsheen/yalc/commit/4242891cb2e1147b70667741dcde26363dcd2b8d))
* chore(release): 2.0.3 [skip ci] ([b9f3cb96306afef2fb30408c06ba9850d9081c71](https://github.com/jimsheen/yalc/commit/b9f3cb96306afef2fb30408c06ba9850d9081c71))
* fix: `readPackageManifest` can detect indent correctly ([9622adb419fb639290844aa7d8128868bb14b8ad](https://github.com/jimsheen/yalc/commit/9622adb419fb639290844aa7d8128868bb14b8ad))
* fix: add publishConfig to make scoped package public ([3011707b789f516167672b6d872d937fdfef23ee](https://github.com/jimsheen/yalc/commit/3011707b789f516167672b6d872d937fdfef23ee))
* fix: add tslint hanging promise detection and fix errors ([b88cb96fbb57a959970478b1ce7077c29c1ebeea](https://github.com/jimsheen/yalc/commit/b88cb96fbb57a959970478b1ce7077c29c1ebeea))
* fix: correct CI workflow order - build before tests ([7df0a75f0c80a8ab7d9c1d4adb43c5e883f46e12](https://github.com/jimsheen/yalc/commit/7df0a75f0c80a8ab7d9c1d4adb43c5e883f46e12))
* fix: disable prepublishOnly script in CI to prevent release workflow failures ([4721e9c2ec19c0fe141467f30b00d424b383b428](https://github.com/jimsheen/yalc/commit/4721e9c2ec19c0fe141467f30b00d424b383b428))
* fix: drop Node.js 18 support due to vitest compatibility ([919d6261478d68ed6f8e0304cff2f71337cd90bd](https://github.com/jimsheen/yalc/commit/919d6261478d68ed6f8e0304cff2f71337cd90bd))
* fix: improve version resolution for published package ([803d26548d772489b2b8749b017977acfbb62d0e](https://github.com/jimsheen/yalc/commit/803d26548d772489b2b8749b017977acfbb62d0e))
* fix: include test fixture dist/file.txt in git ([14827a039d258b3b4d030314ba299a1218791200](https://github.com/jimsheen/yalc/commit/14827a039d258b3b4d030314ba299a1218791200))
* fix: include workspace packages in git for CI test fixtures ([cedb22a48f95fa2d89513c4633b17d28b79aa795](https://github.com/jimsheen/yalc/commit/cedb22a48f95fa2d89513c4633b17d28b79aa795))
* fix: release workflow should wait for CI to complete ([c7b16d6929bf2b1c7ffd60559cedb353c9dc0b59](https://github.com/jimsheen/yalc/commit/c7b16d6929bf2b1c7ffd60559cedb353c9dc0b59))
* fix: remove .releaserc.json configuration file ([17fb1b06e2b9b9244ec31a8beffbbb6e4967b211](https://github.com/jimsheen/yalc/commit/17fb1b06e2b9b9244ec31a8beffbbb6e4967b211))
* fix: remove package dir from node_modules only if needed ([3a73ce7328b626ac2725be79b5b6af8008ba1691](https://github.com/jimsheen/yalc/commit/3a73ce7328b626ac2725be79b5b6af8008ba1691))
* fix: replace pnpm with npm in CI scripts ([bd0d7677b4cb3f81e0f9c95c0148482e39a063d6](https://github.com/jimsheen/yalc/commit/bd0d7677b4cb3f81e0f9c95c0148482e39a063d6))
* fix: replace yarn.lock artifactory urls with public url ([2325c6068d8e6db9de970840df4866a9664658fe](https://github.com/jimsheen/yalc/commit/2325c6068d8e6db9de970840df4866a9664658fe))
* fix: resolve CI failures and security vulnerabilities ([dfbfbcc8c88e08f5ea70f52ddc39ff390d4806a9](https://github.com/jimsheen/yalc/commit/dfbfbcc8c88e08f5ea70f52ddc39ff390d4806a9))
* fix: resolve semantic-release Invalid date error with robust date handling ([7a341fd3f3729b9b2e598f2f97350fb582fb2c92](https://github.com/jimsheen/yalc/commit/7a341fd3f3729b9b2e598f2f97350fb582fb2c92))
* fix: revert to simple, working CI/Release workflows ([d5e58e9cb985ef0306844c2e1cd4b36b64e38ce1](https://github.com/jimsheen/yalc/commit/d5e58e9cb985ef0306844c2e1cd4b36b64e38ce1))
* fix: update dependencies and baseline timestamps for regression tests ([c9f0299fd7ff3c6ad5b43f88f90146da41503a7a](https://github.com/jimsheen/yalc/commit/c9f0299fd7ff3c6ad5b43f88f90146da41503a7a))
* fix: update Release workflow to use Node.js 20 ([83491a869af4343bf6faea315b92fbca23711f3e](https://github.com/jimsheen/yalc/commit/83491a869af4343bf6faea315b92fbca23711f3e))
* fix(publish): adds quotes around workingDir ([73628f1318bc43739469154f205dd22097aca8f6](https://github.com/jimsheen/yalc/commit/73628f1318bc43739469154f205dd22097aca8f6))
* feat: add comprehensive catalog tests and improve caching mechanism ([ee90eba0310750ce29490906979adf3e98319dfd](https://github.com/jimsheen/yalc/commit/ee90eba0310750ce29490906979adf3e98319dfd))
* feat: consolidate CI and Release workflows for improved efficiency ([748c62f98474e2ac77f275bb4f1b35d89037dfc3](https://github.com/jimsheen/yalc/commit/748c62f98474e2ac77f275bb4f1b35d89037dfc3))
* feat: improved yarn support ([a27d57d1d6521f2f240ae43f88a77771d62aab62](https://github.com/jimsheen/yalc/commit/a27d57d1d6521f2f240ae43f88a77771d62aab62))
* feat: Introduce @jimsheen/yalc - a modernized fork of yalc with enhanced performance and features ([66486b6f006ca9097a6491c88babcd325fda000f](https://github.com/jimsheen/yalc/commit/66486b6f006ca9097a6491c88babcd325fda000f))
* feat: update node_modules/.bin ([ce058d0e5c5c6d1ff110a9152ac2e0511053fae7](https://github.com/jimsheen/yalc/commit/ce058d0e5c5c6d1ff110a9152ac2e0511053fae7))
* --pure --changed, ws support ([07076b4a41aabaff982f0ce069d02cb876cb235f](https://github.com/jimsheen/yalc/commit/07076b4a41aabaff982f0ce069d02cb876cb235f))
* A few more spelling and grammar edits ([6bfd9416a9a7b6dbcf9c868a41acedef89877653](https://github.com/jimsheen/yalc/commit/6bfd9416a9a7b6dbcf9c868a41acedef89877653))
* ad check ([1a3ba89d8454386720718d059fcc7bd5ccf52f59](https://github.com/jimsheen/yalc/commit/1a3ba89d8454386720718d059fcc7bd5ccf52f59))
* add --link option and readme update ([b13048db9d10c152f0fc4467452f0a2e3d6ef3d5](https://github.com/jimsheen/yalc/commit/b13048db9d10c152f0fc4467452f0a2e3d6ef3d5))
* add --private ([ac5e823b7ae22a3bd86102f15f5943ed9a2306eb](https://github.com/jimsheen/yalc/commit/ac5e823b7ae22a3bd86102f15f5943ed9a2306eb))
* add --replace flag ([22738875f33e3e1628f2d23216702e4e3c63e8a6](https://github.com/jimsheen/yalc/commit/22738875f33e3e1628f2d23216702e4e3c63e8a6))
* add --save-dev and --dev to docs ([be8eb86a3386be6efe3a67c03580fc1b726593dc](https://github.com/jimsheen/yalc/commit/be8eb86a3386be6efe3a67c03580fc1b726593dc))
* add --store-folder option ([44688ce5181950b0b4d06defada57ba4ee83be80](https://github.com/jimsheen/yalc/commit/44688ce5181950b0b4d06defada57ba4ee83be80))
* add --update option ([94ed3a8a1d23e6acc7c0b658ff6c3439178303d3](https://github.com/jimsheen/yalc/commit/94ed3a8a1d23e6acc7c0b658ff6c3439178303d3))
* add --version flag ([965704b2c331072b84175e98d548d732a021bf89](https://github.com/jimsheen/yalc/commit/965704b2c331072b84175e98d548d732a021bf89))
* add -W and no-scripts arg ([02426630fb50a8225ff17e250dca20d74b29b1dd](https://github.com/jimsheen/yalc/commit/02426630fb50a8225ff17e250dca20d74b29b1dd))
* add -W flag ([19b65a286209f53bf8ef21ee9c048ce2b2fafde2](https://github.com/jimsheen/yalc/commit/19b65a286209f53bf8ef21ee9c048ce2b2fafde2))
* add bin ensureSymlinkSync to try catch ([0a29d68924114df80d762b2aa5482ee20f688d9a](https://github.com/jimsheen/yalc/commit/0a29d68924114df80d762b2aa5482ee20f688d9a))
* add check command ([9e80110be6ff02bd3aa35b0db648e177d0a0ab2d](https://github.com/jimsheen/yalc/commit/9e80110be6ff02bd3aa35b0db648e177d0a0ab2d))
* add CRLF warning ([4409984c32eed939a0d5614f5a1dac03438a259f](https://github.com/jimsheen/yalc/commit/4409984c32eed939a0d5614f5a1dac03438a259f))
* add dev-mod (removing of devDeps) ([e7a00090bf6d4c07546072fa24f6352d0ad897ef](https://github.com/jimsheen/yalc/commit/e7a00090bf6d4c07546072fa24f6352d0ad897ef))
* add files option ([0fced17b7fb33e0159c530248ad935474b1cd5ae](https://github.com/jimsheen/yalc/commit/0fced17b7fb33e0159c530248ad935474b1cd5ae))
* add husky ([4f895a4b4fff4f6276c611c01073abf0db0b167a](https://github.com/jimsheen/yalc/commit/4f895a4b4fff4f6276c611c01073abf0db0b167a))
* add installations clean/show ([a6e8b50c5cba2867b65b6338e1a815c3eee5980c](https://github.com/jimsheen/yalc/commit/a6e8b50c5cba2867b65b6338e1a815c3eee5980c))
* add MIT licence text ([e94f911a14928dfd8fe28a46be8b9752c9cb886a](https://github.com/jimsheen/yalc/commit/e94f911a14928dfd8fe28a46be8b9752c9cb886a))
* add nested .yalc issue in docs ([1fcd3bdf59821c73de5d4bdabb71bbfcbc0cacc3](https://github.com/jimsheen/yalc/commit/1fcd3bdf59821c73de5d4bdabb71bbfcbc0cacc3))
* add new line at the end of package.json ([2b1682eff6306f3ac6d072c2ff28af584022d8ec](https://github.com/jimsheen/yalc/commit/2b1682eff6306f3ac6d072c2ff28af584022d8ec))
* add prepare scirpt ([3fee41fda281c3fcf5f455fde6098d4ed69270a0](https://github.com/jimsheen/yalc/commit/3fee41fda281c3fcf5f455fde6098d4ed69270a0))
* add publish date ([d83f5f0e290086bb85f5cd7f81e57ece0b4abd0b](https://github.com/jimsheen/yalc/commit/d83f5f0e290086bb85f5cd7f81e57ece0b4abd0b))
* add remove and retreat ([16a87f11e89318a9d5339dc0091dd2d47e09b41c](https://github.com/jimsheen/yalc/commit/16a87f11e89318a9d5339dc0091dd2d47e09b41c))
* add repository link to package.json ([cbef2f31248eeeb0202a9aaab614f451dfc14098](https://github.com/jimsheen/yalc/commit/cbef2f31248eeeb0202a9aaab614f451dfc14098))
* add restore command ([ea074efba27eab0fb80316810a6e72117dac17af](https://github.com/jimsheen/yalc/commit/ea074efba27eab0fb80316810a6e72117dac17af))
* add safe copy dir ([62f4ee27e6ffe2ad767be736d749899939bfa05b](https://github.com/jimsheen/yalc/commit/62f4ee27e6ffe2ad767be736d749899939bfa05b))
* add signature (`yalcSig` key) to published package.json ([f1cb7179b244b8562e044761c829fa97a11aa7da](https://github.com/jimsheen/yalc/commit/f1cb7179b244b8562e044761c829fa97a11aa7da))
* add store path in not found message ([ee8921d0d39b0f563434a49fd8b16543e56bb752](https://github.com/jimsheen/yalc/commit/ee8921d0d39b0f563434a49fd8b16543e56bb752))
* add test file.txt to git ([3648b52ca69014f42285e9691faa092d9ac5ec89](https://github.com/jimsheen/yalc/commit/3648b52ca69014f42285e9691faa092d9ac5ec89))
* add test for workspace protocol resolution ([41056b68b3d60191d090addf750f3ce8dc3ad9c9](https://github.com/jimsheen/yalc/commit/41056b68b3d60191d090addf750f3ce8dc3ad9c9))
* add tests ([cb638c32ef5f39e4f091b0b8ce960e038cea0fdb](https://github.com/jimsheen/yalc/commit/cb638c32ef5f39e4f091b0b8ce960e038cea0fdb))
* add tests for remove ([5115521daef8e23fb3d4e7eaf17146306a3d7dd7](https://github.com/jimsheen/yalc/commit/5115521daef8e23fb3d4e7eaf17146306a3d7dd7))
* add trash-cli, publish ([e63b2dd6b0a56b61b5cc10318d4b4b191a6e8297](https://github.com/jimsheen/yalc/commit/e63b2dd6b0a56b61b5cc10318d4b4b191a6e8297))
* add travis ([346854a5c63b365370e38f47a08d8545a6259bc7](https://github.com/jimsheen/yalc/commit/346854a5c63b365370e38f47a08d8545a6259bc7))
* add travis badge ([d3a5c91db7a406517189c970ee70883013b9840c](https://github.com/jimsheen/yalc/commit/d3a5c91db7a406517189c970ee70883013b9840c))
* add try catch when modefiying permissions ([bf19b5e53437a2c5c250305148314b171a0a933e](https://github.com/jimsheen/yalc/commit/bf19b5e53437a2c5c250305148314b171a0a933e))
* add ts-tslint-plugin ([c2083f81dac260f8f24d0dbac8b01522f0b0db06](https://github.com/jimsheen/yalc/commit/c2083f81dac260f8f24d0dbac8b01522f0b0db06))
* Add unpublish (yalc installations) instructions ([f620c096f328e744a40fa9f542d4c16cf1840714](https://github.com/jimsheen/yalc/commit/f620c096f328e744a40fa9f542d4c16cf1840714))
* add workspace protocol resolution ([e42ab7ded000a1d95dd3b983a665d2913ab06d3a](https://github.com/jimsheen/yalc/commit/e42ab7ded000a1d95dd3b983a665d2913ab06d3a))
* added hash signature ([9194e47a0295c27498cc78a506af222faa1178a0](https://github.com/jimsheen/yalc/commit/9194e47a0295c27498cc78a506af222faa1178a0))
* allow --pure without worspaces ([10082688f08e0200774538e294aa38ae8cedddd1](https://github.com/jimsheen/yalc/commit/10082688f08e0200774538e294aa38ae8cedddd1))
* better non-code files filtering ([14b7cc7e25105ee61e2bb33de01253f461059355](https://github.com/jimsheen/yalc/commit/14b7cc7e25105ee61e2bb33de01253f461059355))
* bump ([c13b2a7081000bfb0458e32c6a62ad93e5112278](https://github.com/jimsheen/yalc/commit/c13b2a7081000bfb0458e32c6a62ad93e5112278))
* bump version ([07ab0b0ab5cc0a2476f9de559c64ae485db6e9bb](https://github.com/jimsheen/yalc/commit/07ab0b0ab5cc0a2476f9de559c64ae485db6e9bb))
* bump version ([7b8ccf647329ac859d452e59b4054a58dff4e93a](https://github.com/jimsheen/yalc/commit/7b8ccf647329ac859d452e59b4054a58dff4e93a))
* bump version ([ee053f958c3e2b0bc9675722a4512275000afc03](https://github.com/jimsheen/yalc/commit/ee053f958c3e2b0bc9675722a4512275000afc03))
* bump version ([d8ddfe7c4acfdb0c10f735b0de641c172b36e8e7](https://github.com/jimsheen/yalc/commit/d8ddfe7c4acfdb0c10f735b0de641c172b36e8e7))
* bump version ([2d4879dc240da153f43eb38d4e19ddd20a65d413](https://github.com/jimsheen/yalc/commit/2d4879dc240da153f43eb38d4e19ddd20a65d413))
* bump version ([0b3fd07b47f697450d368499194efbaff0c196b6](https://github.com/jimsheen/yalc/commit/0b3fd07b47f697450d368499194efbaff0c196b6))
* bump version ([0ffa688c4f554457c4bf3596180c8da9d46e6a30](https://github.com/jimsheen/yalc/commit/0ffa688c4f554457c4bf3596180c8da9d46e6a30))
* bump version ([c40a8b8be34366298711c1c1a444d3736ef472a7](https://github.com/jimsheen/yalc/commit/c40a8b8be34366298711c1c1a444d3736ef472a7))
* change name to yaloc ([710cb500ff8acb952ed984506e265416c20e106c](https://github.com/jimsheen/yalc/commit/710cb500ff8acb952ed984506e265416c20e106c))
* check for travis ([a4100d4cdd4d6db28b55d5dc61f12959e517666b](https://github.com/jimsheen/yalc/commit/a4100d4cdd4d6db28b55d5dc61f12959e517666b))
* check for travis fail ([3c2aefb4686dc4f57720c61fd373e2660810ba47](https://github.com/jimsheen/yalc/commit/3c2aefb4686dc4f57720c61fd373e2660810ba47))
* check if symlink and remove folder #7 ([1eede443f0581e7bbf2c1d56b77e25efdca027de](https://github.com/jimsheen/yalc/commit/1eede443f0581e7bbf2c1d56b77e25efdca027de)), closes [#7](https://github.com/jimsheen/yalc/issues/7)
* copy to dest package dir not removing inner `node_modules` ([241359b4f03de3a99f1dc2b997169276c75b8c56](https://github.com/jimsheen/yalc/commit/241359b4f03de3a99f1dc2b997169276c75b8c56))
* Correct spelling, grammar, and typography issues ([b3195e63410178195a3a89ed45a7f5883b3ca2e0](https://github.com/jimsheen/yalc/commit/b3195e63410178195a3a89ed45a7f5883b3ca2e0))
* do not ignore subdirectories such as 'history' ([4c8a8377bdee03f901a66417858db243cfdfff43](https://github.com/jimsheen/yalc/commit/4c8a8377bdee03f901a66417858db243cfdfff43))
* empty dir including dot folders ([8f8339276c8679500eb27dcda2da369d0454091d](https://github.com/jimsheen/yalc/commit/8f8339276c8679500eb27dcda2da369d0454091d))
* first commit ([fda54cf32b2a72aa20f24f663b2457836dfe52f3](https://github.com/jimsheen/yalc/commit/fda54cf32b2a72aa20f24f663b2457836dfe52f3))
* fix --pure flag ([8f20ae19d792b3fbbb0e67ac68856d35cee03b4a](https://github.com/jimsheen/yalc/commit/8f20ae19d792b3fbbb0e67ac68856d35cee03b4a))
* fix --pure with workspaces ([6ce877507620abf6fe42dff67f85f5a5f6320550](https://github.com/jimsheen/yalc/commit/6ce877507620abf6fe42dff67f85f5a5f6320550))
* fix --quiet, remove incorrect ([401488bb09d72fc4479dc0771ac89144857244b7](https://github.com/jimsheen/yalc/commit/401488bb09d72fc4479dc0771ac89144857244b7))
* fix --scripts flag ([e5676a8704c62dd105ce7fde697832619991e67a](https://github.com/jimsheen/yalc/commit/e5676a8704c62dd105ce7fde697832619991e67a))
* Fix 'link' command and make 'update' consistent with the rest ([64c685eac50ab747591fc8c28d1a9dbe2e3b133b](https://github.com/jimsheen/yalc/commit/64c685eac50ab747591fc8c28d1a9dbe2e3b133b))
* Fix "quiet" command line argument typo. ([aeda0588cd3fb1214f05f464997c7746c65092e7](https://github.com/jimsheen/yalc/commit/aeda0588cd3fb1214f05f464997c7746c65092e7))
* fix @scoped names publish bug #109 ([33c1fa491003eee6ec404ab8930b80b2b87c2524](https://github.com/jimsheen/yalc/commit/33c1fa491003eee6ec404ab8930b80b2b87c2524)), closes [#109](https://github.com/jimsheen/yalc/issues/109)
* Fix `--sig` documentation in readme ([4425d978919affd4b72cd10cbc53d3c6bb4de74f](https://github.com/jimsheen/yalc/commit/4425d978919affd4b72cd10cbc53d3c6bb4de74f))
* fix add --link ([9b3028d626fb263fafcd5f0df63fc44a56125dee](https://github.com/jimsheen/yalc/commit/9b3028d626fb263fafcd5f0df63fc44a56125dee))
* Fix broken link ([275fd9430ee8ff2469e61bc546b9008d490cb053](https://github.com/jimsheen/yalc/commit/275fd9430ee8ff2469e61bc546b9008d490cb053))
* fix bugs, LF, update version ([83f8795baec6faff5ef8dfc3e13cb6b8eb48d439](https://github.com/jimsheen/yalc/commit/83f8795baec6faff5ef8dfc3e13cb6b8eb48d439))
* fix ci script ([159aa824fcdf0424369489e97f18fa8d4db6de4e](https://github.com/jimsheen/yalc/commit/159aa824fcdf0424369489e97f18fa8d4db6de4e))
* fix copy file permissions ([6ad590e209e8146e712f16bf92cc5832296eea96](https://github.com/jimsheen/yalc/commit/6ad590e209e8146e712f16bf92cc5832296eea96))
* fix copy if no `files` in manifest defined ([4953e3acdc1a5e479197582f489260ddec4ebed4](https://github.com/jimsheen/yalc/commit/4953e3acdc1a5e479197582f489260ddec4ebed4))
* fix default pure add in workspaces ([1ffd065a28336d310576e39ea80a4f305341fd66](https://github.com/jimsheen/yalc/commit/1ffd065a28336d310576e39ea80a4f305341fd66))
* fix for #36 ([1cab15b95dde395351ff994aee28cf9e3414badd](https://github.com/jimsheen/yalc/commit/1cab15b95dde395351ff994aee28cf9e3414badd)), closes [#36](https://github.com/jimsheen/yalc/issues/36)
* fix formatting ([05c03b712d4c39a1bcfd1c4629ddfeaa46be0f30](https://github.com/jimsheen/yalc/commit/05c03b712d4c39a1bcfd1c4629ddfeaa46be0f30))
* fix hash rel path slashes ([9b946db5357430ec4ed34e2dd9d7f3a1c847852b](https://github.com/jimsheen/yalc/commit/9b946db5357430ec4ed34e2dd9d7f3a1c847852b))
* fix include rule folder/file ([d16f2caf5df4292c0dc827a95d97e3c7bb7b480a](https://github.com/jimsheen/yalc/commit/d16f2caf5df4292c0dc827a95d97e3c7bb7b480a))
* fix installlcation output ([aedb58ea2515a42e56b7183d46b186d59ebd9493](https://github.com/jimsheen/yalc/commit/aedb58ea2515a42e56b7183d46b186d59ebd9493))
* fix installtion file create ([64e758d1ba9705897e5bb95b626787ace0beecb6](https://github.com/jimsheen/yalc/commit/64e758d1ba9705897e5bb95b626787ace0beecb6))
* fix json output ([4d0f9f8a17c27c24f630b7130862a1d64e0f385c](https://github.com/jimsheen/yalc/commit/4d0f9f8a17c27c24f630b7130862a1d64e0f385c))
* fix link prop in lockfile ([ea123c6bc39d506e5d81268fe8695923ba4cda30](https://github.com/jimsheen/yalc/commit/ea123c6bc39d506e5d81268fe8695923ba4cda30))
* fix link: removal ([6c3c0942457cd3a34035f7d522a0b8514b490777](https://github.com/jimsheen/yalc/commit/6c3c0942457cd3a34035f7d522a0b8514b490777))
* fix lint error ([11181745a6bf39dff5f1e6671112f73075b7a041](https://github.com/jimsheen/yalc/commit/11181745a6bf39dff5f1e6671112f73075b7a041))
* fix linting ([43f7939677ed3e5560835ac010434b0bd06ab37f](https://github.com/jimsheen/yalc/commit/43f7939677ed3e5560835ac010434b0bd06ab37f))
* fix lockfile replaced ([9a8f9045674eb877e17078ee753b79e5d00b667f](https://github.com/jimsheen/yalc/commit/9a8f9045674eb877e17078ee753b79e5d00b667f))
* fix pre/post scripts run ([8a9f75193fde3751ac6477c103c56a56e219afa0](https://github.com/jimsheen/yalc/commit/8a9f75193fde3751ac6477c103c56a56e219afa0))
* fix publish installation remove ([3c73bdb922e19d5a035d1cfe424d77dd4b476eb6](https://github.com/jimsheen/yalc/commit/3c73bdb922e19d5a035d1cfe424d77dd4b476eb6))
* fix removing multiple packages, fixes #146 ([8bcebc42c28f4162f556399f7e089cdb5cd985da](https://github.com/jimsheen/yalc/commit/8bcebc42c28f4162f556399f7e089cdb5cd985da)), closes [#146](https://github.com/jimsheen/yalc/issues/146)
* fix removing scoped package folder ([f2b05d188b12bcb421b1fb97e985c516f2d31c61](https://github.com/jimsheen/yalc/commit/f2b05d188b12bcb421b1fb97e985c516f2d31c61))
* fix safe copy ([f12228ac4a7d056151353c7e7094e8d290056143](https://github.com/jimsheen/yalc/commit/f12228ac4a7d056151353c7e7094e8d290056143))
* Fix spelling of installation in push command ([e5d698289b84351085363b8100bc331f35fe8bc5](https://github.com/jimsheen/yalc/commit/e5d698289b84351085363b8100bc331f35fe8bc5))
* fix test files line endings, add relative filename to hash signature ([4bd52873b89ab66eab7d906cc612f7cd30b3558c](https://github.com/jimsheen/yalc/commit/4bd52873b89ab66eab7d906cc612f7cd30b3558c))
* fix tests ([98abfd5a74df28dc19690f5c5571a0dcd5a79080](https://github.com/jimsheen/yalc/commit/98abfd5a74df28dc19690f5c5571a0dcd5a79080))
* fix travis file name ([b3c5de0cceb421306461018c2fed479617972769](https://github.com/jimsheen/yalc/commit/b3c5de0cceb421306461018c2fed479617972769))
* fix travis link ([1d023b001e66959c2eb4c88977eb5f1821a44bcf](https://github.com/jimsheen/yalc/commit/1d023b001e66959c2eb4c88977eb5f1821a44bcf))
* fix travis script ([7f3a172c9bf2c137ac00ce454fda8d13a25f773b](https://github.com/jimsheen/yalc/commit/7f3a172c9bf2c137ac00ce454fda8d13a25f773b))
* fix typo ([5ab75247f11be1c758216227262d53c4088e2559](https://github.com/jimsheen/yalc/commit/5ab75247f11be1c758216227262d53c4088e2559))
* Fix typo ([7a1251f3a75cb52fb1ec21de84e7e6e541f2202c](https://github.com/jimsheen/yalc/commit/7a1251f3a75cb52fb1ec21de84e7e6e541f2202c))
* Fix typos in README ([c4efcaccec856dbc8528d4aa545ef0f64e34c113](https://github.com/jimsheen/yalc/commit/c4efcaccec856dbc8528d4aa545ef0f64e34c113))
* Fix unit tests on darwin platform ([73ad5ab947a82c83219b507aaa6bb609a1d8a101](https://github.com/jimsheen/yalc/commit/73ad5ab947a82c83219b507aaa6bb609a1d8a101))
* fix yarn.lock bug ([e550da3df7114b6ef9d16ddd01153b3173e4ef88](https://github.com/jimsheen/yalc/commit/e550da3df7114b6ef9d16ddd01153b3173e4ef88))
* fixes #2 inclusion of /dir ([6bd0f1cb561835f910af92459c5d9d473b4d51ee](https://github.com/jimsheen/yalc/commit/6bd0f1cb561835f910af92459c5d9d473b4d51ee)), closes [#2](https://github.com/jimsheen/yalc/issues/2)
* fixes #26, yalc push (linked) ([1dd597bf8ccf2778f2bf98929ad1a8c5a6d91d1f](https://github.com/jimsheen/yalc/commit/1dd597bf8ccf2778f2bf98929ad1a8c5a6d91d1f)), closes [#26](https://github.com/jimsheen/yalc/issues/26)
* Fixes #3 ([396b166a4e88776ea5a616fbd7616383cd33bd29](https://github.com/jimsheen/yalc/commit/396b166a4e88776ea5a616fbd7616383cd33bd29)), closes [#3](https://github.com/jimsheen/yalc/issues/3)
* Fixing #85 ([d511c6378f238a19c63572e82d2ef759c6c97e03](https://github.com/jimsheen/yalc/commit/d511c6378f238a19c63572e82d2ef759c6c97e03)), closes [#85](https://github.com/jimsheen/yalc/issues/85)
* handle `files` field in manifest ([6dfbfd1b19531a0d480d4fc4dabd4093ca565768](https://github.com/jimsheen/yalc/commit/6dfbfd1b19531a0d480d4fc4dabd4093ca565768))
* Handle empty and unknown command ([2985af39bdda4d0427a5d15310c44b4c899c079d](https://github.com/jimsheen/yalc/commit/2985af39bdda4d0427a5d15310c44b4c899c079d))
* ignore only root .yalc ([80b5fe0453a2c66f65983dc70b201bc52cd9cc13](https://github.com/jimsheen/yalc/commit/80b5fe0453a2c66f65983dc70b201bc52cd9cc13))
* Improve package file selection ([cda96f7b370a10f4378cce7272d8f11865e1ea98](https://github.com/jimsheen/yalc/commit/cda96f7b370a10f4378cce7272d8f11865e1ea98))
* installations file ([acd29e71a0804d53e34df73da4e8f84108f75071](https://github.com/jimsheen/yalc/commit/acd29e71a0804d53e34df73da4e8f84108f75071))
* latest ts verion, fix typings and test ([a1e99f7c74fa199041c849ab3c9d031ef38bc3ee](https://github.com/jimsheen/yalc/commit/a1e99f7c74fa199041c849ab3c9d031ef38bc3ee))
* link `.bin` scripts only when `yalc link` #156 ([93b97ba0c1e1ba35b2df6cc7f3f06166685be478](https://github.com/jimsheen/yalc/commit/93b97ba0c1e1ba35b2df6cc7f3f06166685be478)), closes [#156](https://github.com/jimsheen/yalc/issues/156)
* make --no-sig by default ([43a54661ceb1f939334ced8d8a17c84003e0d22d](https://github.com/jimsheen/yalc/commit/43a54661ceb1f939334ced8d8a17c84003e0d22d))
* make pkg.__JSONSpaces optional ([7a2637d969e044b0eec494904ff04ae09ab096e3](https://github.com/jimsheen/yalc/commit/7a2637d969e044b0eec494904ff04ae09ab096e3))
* Merge branch 'master' into igrayson/npm-packlist ([775dce1da5525bf59c57dcf506c4769de73845d2](https://github.com/jimsheen/yalc/commit/775dce1da5525bf59c57dcf506c4769de73845d2))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([4b8b7933cdf261d272e32cdd0286f240eee2e69f](https://github.com/jimsheen/yalc/commit/4b8b7933cdf261d272e32cdd0286f240eee2e69f))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([e17c5919a1ee302098aa2825bdd96e4986a74b37](https://github.com/jimsheen/yalc/commit/e17c5919a1ee302098aa2825bdd96e4986a74b37))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([f8abf97773c93fe88ad9e0bf41fe68ac258354be](https://github.com/jimsheen/yalc/commit/f8abf97773c93fe88ad9e0bf41fe68ac258354be))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([3232efa14290d3b1c2499259aa1af6a51bfbf922](https://github.com/jimsheen/yalc/commit/3232efa14290d3b1c2499259aa1af6a51bfbf922))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([31f76abad14680a784581ba5d118c72b69c08091](https://github.com/jimsheen/yalc/commit/31f76abad14680a784581ba5d118c72b69c08091))
* Merge branch 'master' of https://github.com/whitecolor/yalc ([14c7f03eaf55d12fb406abad06965bf138a2e63f](https://github.com/jimsheen/yalc/commit/14c7f03eaf55d12fb406abad06965bf138a2e63f))
* Merge branch 'master' of https://github.com/whitecolor/yalc into master ([d22fb6e9e9d49ca69392399d8d10d1414ae14ea0](https://github.com/jimsheen/yalc/commit/d22fb6e9e9d49ca69392399d8d10d1414ae14ea0))
* Merge pull request #10 from peterjanes/master ([376ca4dbf763dd9f9255bfcf90a6a1c37c4eabe6](https://github.com/jimsheen/yalc/commit/376ca4dbf763dd9f9255bfcf90a6a1c37c4eabe6)), closes [#10](https://github.com/jimsheen/yalc/issues/10)
* Merge pull request #11 from christopherthielen/master ([899f6830562f1b1988638b8fdda922c8abce58b3](https://github.com/jimsheen/yalc/commit/899f6830562f1b1988638b8fdda922c8abce58b3)), closes [#11](https://github.com/jimsheen/yalc/issues/11)
* Merge pull request #119 from vasc/patch-1 ([1f16df3c9ee94e22aff0fb8e5773db4f2e616268](https://github.com/jimsheen/yalc/commit/1f16df3c9ee94e22aff0fb8e5773db4f2e616268)), closes [#119](https://github.com/jimsheen/yalc/issues/119)
* Merge pull request #12 from christopherthielen/darwin ([8a039b447c8c719a9886048e6b1aaef5f1ba0ab8](https://github.com/jimsheen/yalc/commit/8a039b447c8c719a9886048e6b1aaef5f1ba0ab8)), closes [#12](https://github.com/jimsheen/yalc/issues/12)
* Merge pull request #124 from lukeed/chore/homedir ([a0b0c434c2818b4c3b5b30367a3d456617620659](https://github.com/jimsheen/yalc/commit/a0b0c434c2818b4c3b5b30367a3d456617620659)), closes [#124](https://github.com/jimsheen/yalc/issues/124)
* Merge pull request #126 from mediaupstream/fix-yalc-cd-space ([843a14ecb852f15d85f80fe258bc8565dbbc3df2](https://github.com/jimsheen/yalc/commit/843a14ecb852f15d85f80fe258bc8565dbbc3df2)), closes [#126](https://github.com/jimsheen/yalc/issues/126)
* Merge pull request #130 from Keysox/publishScripts ([2b3c42159e435e11d0d93220de5e2e989ed8aab1](https://github.com/jimsheen/yalc/commit/2b3c42159e435e11d0d93220de5e2e989ed8aab1)), closes [#130](https://github.com/jimsheen/yalc/issues/130)
* Merge pull request #139 from rebolyte/feature/surface-errors ([2ffff87f17a3609696929a7fa4b40f340354ae13](https://github.com/jimsheen/yalc/commit/2ffff87f17a3609696929a7fa4b40f340354ae13)), closes [#139](https://github.com/jimsheen/yalc/issues/139)
* Merge pull request #14 from rbrtmrtn/patch-1 ([75b0e84ffa017497e7253daac73182beffee6331](https://github.com/jimsheen/yalc/commit/75b0e84ffa017497e7253daac73182beffee6331)), closes [#14](https://github.com/jimsheen/yalc/issues/14)
* Merge pull request #141 from leejh3224/should-preserve-indent ([5a4d6e4db89b559511864b49e473d51518b9b070](https://github.com/jimsheen/yalc/commit/5a4d6e4db89b559511864b49e473d51518b9b070)), closes [#141](https://github.com/jimsheen/yalc/issues/141)
* Merge pull request #147 from rmjohnson/fix-quiet-typo ([727dc49ac20b6ea4d208ca1312de328b9d86b4a6](https://github.com/jimsheen/yalc/commit/727dc49ac20b6ea4d208ca1312de328b9d86b4a6)), closes [#147](https://github.com/jimsheen/yalc/issues/147)
* Merge pull request #150 from javier-garcia-meteologica/workspace_protocol_resolution ([931ad6453893ec730775f6d0fe128e3bd1414269](https://github.com/jimsheen/yalc/commit/931ad6453893ec730775f6d0fe128e3bd1414269)), closes [#150](https://github.com/jimsheen/yalc/issues/150)
* Merge pull request #163 from javier-garcia-meteologica/workspace_version_aliases ([993c8de482fe44b11ef66ff0b06b4fdf110b7824](https://github.com/jimsheen/yalc/commit/993c8de482fe44b11ef66ff0b06b4fdf110b7824)), closes [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162)
* Merge pull request #218 from matthias-ccri/patch-1 ([cd897c596b5a317b3ed98646fe625012bf6be381](https://github.com/jimsheen/yalc/commit/cd897c596b5a317b3ed98646fe625012bf6be381)), closes [#218](https://github.com/jimsheen/yalc/issues/218)
* Merge pull request #30 from greyepoxy/remove-unused-imports ([f5d540149e15eb99bf6343a9ef564d62ccc18cb2](https://github.com/jimsheen/yalc/commit/f5d540149e15eb99bf6343a9ef564d62ccc18cb2)), closes [#30](https://github.com/jimsheen/yalc/issues/30)
* Merge pull request #31 from greyepoxy/fix-sig-in-tests ([3a666853c22b5ed587654a34da2ee37743c1400e](https://github.com/jimsheen/yalc/commit/3a666853c22b5ed587654a34da2ee37743c1400e)), closes [#31](https://github.com/jimsheen/yalc/issues/31)
* Merge pull request #33 from strothj/patch-1 ([193b70e9c4bb302415b88a04276f25a1787e2b75](https://github.com/jimsheen/yalc/commit/193b70e9c4bb302415b88a04276f25a1787e2b75)), closes [#33](https://github.com/jimsheen/yalc/issues/33)
* Merge pull request #40 from greyepoxy/no-hanging-promises-2 ([37f409bcdf25197db404cfc1fcaa20c4a9ccc2a3](https://github.com/jimsheen/yalc/commit/37f409bcdf25197db404cfc1fcaa20c4a9ccc2a3)), closes [#40](https://github.com/jimsheen/yalc/issues/40)
* Merge pull request #41 from greyepoxy/add-auto-formatting ([d26a901e780a55916c2d33edabc2f57e1eda102b](https://github.com/jimsheen/yalc/commit/d26a901e780a55916c2d33edabc2f57e1eda102b)), closes [#41](https://github.com/jimsheen/yalc/issues/41)
* Merge pull request #42 from chocolateboy/patch-1 ([e3547a542ec9c3df01c8959b43cc11a47d684f85](https://github.com/jimsheen/yalc/commit/e3547a542ec9c3df01c8959b43cc11a47d684f85)), closes [#42](https://github.com/jimsheen/yalc/issues/42)
* Merge pull request #43 from igrayson/igrayson/npm-packlist ([5530772f5eceb97d7d99cbd8fe46aea4a5aebf54](https://github.com/jimsheen/yalc/commit/5530772f5eceb97d7d99cbd8fe46aea4a5aebf54)), closes [#43](https://github.com/jimsheen/yalc/issues/43)
* Merge pull request #44 from maggieneterval/fix-spelling-in-push-cmd ([da6598f1b779b11560fd38b9ea2898990aeae324](https://github.com/jimsheen/yalc/commit/da6598f1b779b11560fd38b9ea2898990aeae324)), closes [#44](https://github.com/jimsheen/yalc/issues/44)
* Merge pull request #57 from aleclarson/patch-1 ([ea1f1ce7be065f46b518ec32715b37de8b14b447](https://github.com/jimsheen/yalc/commit/ea1f1ce7be065f46b518ec32715b37de8b14b447)), closes [#57](https://github.com/jimsheen/yalc/issues/57)
* Merge pull request #6 from svicalifornia/patch-1 ([cde54c9c990d78e3997c20306f2344c9021a7f7d](https://github.com/jimsheen/yalc/commit/cde54c9c990d78e3997c20306f2344c9021a7f7d)), closes [#6](https://github.com/jimsheen/yalc/issues/6)
* Merge pull request #61 from aleclarson/bin ([e6e2a33c7869be1774af406f3b5d13baadc312d4](https://github.com/jimsheen/yalc/commit/e6e2a33c7869be1774af406f3b5d13baadc312d4)), closes [#61](https://github.com/jimsheen/yalc/issues/61)
* Merge pull request #71 from ndresx/fix-readme ([00283fdaaad864412dcf361bf4a14e8be44840ae](https://github.com/jimsheen/yalc/commit/00283fdaaad864412dcf361bf4a14e8be44840ae)), closes [#71](https://github.com/jimsheen/yalc/issues/71)
* Merge pull request #82 from cristianl/pr-readme-unpublish ([7880368095ce95d88ab3b4d7b53288d7603a0033](https://github.com/jimsheen/yalc/commit/7880368095ce95d88ab3b4d7b53288d7603a0033)), closes [#82](https://github.com/jimsheen/yalc/issues/82)
* Merge pull request #86 from atomicpages/master ([64b17507d511f71246de46cdaf0ac51aaca82453](https://github.com/jimsheen/yalc/commit/64b17507d511f71246de46cdaf0ac51aaca82453)), closes [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85)
* Merge pull request #93 from matthiasdailey-ccri/master ([76996bf9c8655f324999a8af8db20380c1334b70](https://github.com/jimsheen/yalc/commit/76996bf9c8655f324999a8af8db20380c1334b70)), closes [#93](https://github.com/jimsheen/yalc/issues/93)
* meta ([8b17ff53c5b6dfbea55a3d55737a50ca73de09e2](https://github.com/jimsheen/yalc/commit/8b17ff53c5b6dfbea55a3d55737a50ca73de09e2))
* mocha to dev deps ([1cf86145a98ff5fc06b6276ed0028b4a64926f24](https://github.com/jimsheen/yalc/commit/1cf86145a98ff5fc06b6276ed0028b4a64926f24))
* move dep-package to test, remove tmp ([b94ec8a0b3c17d75307b30f7b68370150bfbab72](https://github.com/jimsheen/yalc/commit/b94ec8a0b3c17d75307b30f7b68370150bfbab72))
* move publish ([ace163dd772cd0d7c9d4e9186fcb47be6088c6c2](https://github.com/jimsheen/yalc/commit/ace163dd772cd0d7c9d4e9186fcb47be6088c6c2))
* move test to root ([3d101fd18cc8c61fdb2d85ef58d9b69fe25df0e2](https://github.com/jimsheen/yalc/commit/3d101fd18cc8c61fdb2d85ef58d9b69fe25df0e2))
* move to separate files add/update ([b5ac181e1050819b72800c339647546defdb86ea](https://github.com/jimsheen/yalc/commit/b5ac181e1050819b72800c339647546defdb86ea))
* Moving polyfill ([933b08b3870b4aeb74094925d3777787e20d8b45](https://github.com/jimsheen/yalc/commit/933b08b3870b4aeb74094925d3777787e20d8b45))
* pre.28, notion about running yarn/npm ([e2a7c3881dda987991ec2aa2d6b4338b9f41c651](https://github.com/jimsheen/yalc/commit/e2a7c3881dda987991ec2aa2d6b4338b9f41c651))
* Prevent removing .yalc folder ([6e1e7f16d5ce6912e4af4388bd6010cce01c5d7a](https://github.com/jimsheen/yalc/commit/6e1e7f16d5ce6912e4af4388bd6010cce01c5d7a))
* publish now runs all of the lifecycle scripts it finds ([190d74fd09f7a3779f20490eb2de9428dfb00e1c](https://github.com/jimsheen/yalc/commit/190d74fd09f7a3779f20490eb2de9428dfb00e1c)), closes [#129](https://github.com/jimsheen/yalc/issues/129)
* read package manifest on copy (#157) ([29c1665be4f4996f02d93daf3e5b16830c7d3c57](https://github.com/jimsheen/yalc/commit/29c1665be4f4996f02d93daf3e5b16830c7d3c57)), closes [#157](https://github.com/jimsheen/yalc/issues/157)
* readme fixes ([58b21ba8f80700f18d53475b461c2c51efa535b9](https://github.com/jimsheen/yalc/commit/58b21ba8f80700f18d53475b461c2c51efa535b9))
* readme log updates ([45b27ea68bc898ffcacdc5a5485fe2446a064481](https://github.com/jimsheen/yalc/commit/45b27ea68bc898ffcacdc5a5485fe2446a064481))
* Refactor code structure for improved readability and maintainability ([b225a9a2eeffc0792e53c2d95b4bf7923720fb94](https://github.com/jimsheen/yalc/commit/b225a9a2eeffc0792e53c2d95b4bf7923720fb94))
* Refactor code structure for improved readability and maintainability ([3a5054ac9c43027db5ebdd48c973e54b0f26de1a](https://github.com/jimsheen/yalc/commit/3a5054ac9c43027db5ebdd48c973e54b0f26de1a))
* Refactor tests to use Vitest framework and improve baseline capture functionality ([5b9cb21746c162747bce39c50237bf058f1626c9](https://github.com/jimsheen/yalc/commit/5b9cb21746c162747bce39c50237bf058f1626c9))
* remote postupdate mention ([d3e3f0c8ce1ad1f08433c1d9f84db7a0c53c83cd](https://github.com/jimsheen/yalc/commit/d3e3f0c8ce1ad1f08433c1d9f84db7a0c53c83cd))
* remove .yalc folder from ignored ([11e0dd74ef6c666327d31e73909dfca82b4d22f4](https://github.com/jimsheen/yalc/commit/11e0dd74ef6c666327d31e73909dfca82b4d22f4))
* remove `--force` flag ([fb1e8e78acc4806eeced10329d383902a0b9b2f1](https://github.com/jimsheen/yalc/commit/fb1e8e78acc4806eeced10329d383902a0b9b2f1))
* remove annoying dont forget ([d0053b4fcabf654ff8e7dcb5b394fb2f71fd6bd2](https://github.com/jimsheen/yalc/commit/d0053b4fcabf654ff8e7dcb5b394fb2f71fd6bd2))
* remove console output ([5efeec252a8226a885465949145bb3b1127c9df2](https://github.com/jimsheen/yalc/commit/5efeec252a8226a885465949145bb3b1127c9df2))
* remove dev and peer workspace deps ([61fa89f8d5ef8ba00309ad23365a3f12c707dad7](https://github.com/jimsheen/yalc/commit/61fa89f8d5ef8ba00309ad23365a3f12c707dad7))
* remove docs about knitting from readme ([8d410849d439502d53dc9c04e400118b57b07c6b](https://github.com/jimsheen/yalc/commit/8d410849d439502d53dc9c04e400118b57b07c6b))
* remove empty directories why sync dir copy ([647d6362e9059192e494d5cfc9004ab17842d5a5](https://github.com/jimsheen/yalc/commit/647d6362e9059192e494d5cfc9004ab17842d5a5))
* Remove knit completly ([bd18eaac38720fb59f4e30d21fd2752d7f8459d1](https://github.com/jimsheen/yalc/commit/bd18eaac38720fb59f4e30d21fd2752d7f8459d1))
* remove lockfile and .yalc folder if empty ([57b092ad726907c9232208f4fa758b7b23da87b6](https://github.com/jimsheen/yalc/commit/57b092ad726907c9232208f4fa758b7b23da87b6))
* remove NB notice about running pm ([3f125e47769784eb660fa83cd2f6a8beb4366e9c](https://github.com/jimsheen/yalc/commit/3f125e47769784eb660fa83cd2f6a8beb4366e9c))
* remove pack ([9f789be33fa812aca8cae0113b0ec1953c9a2928](https://github.com/jimsheen/yalc/commit/9f789be33fa812aca8cae0113b0ec1953c9a2928))
* remove prepush test ([52c4eaed99da202def294c2ce10934b5c570d13c](https://github.com/jimsheen/yalc/commit/52c4eaed99da202def294c2ce10934b5c570d13c))
* remove ref to Node.Global (fixes #151) ([f0082cce7b260d20df4b6001a33bcba7a81483b5](https://github.com/jimsheen/yalc/commit/f0082cce7b260d20df4b6001a33bcba7a81483b5)), closes [#151](https://github.com/jimsheen/yalc/issues/151)
* remove removes from .yalc and node_modules ([8a6fe41a22a91869dc12a4a14900d0830bb2f9f8](https://github.com/jimsheen/yalc/commit/8a6fe41a22a91869dc12a4a14900d0830bb2f9f8))
* remove unintended formatting ([3b8f0ac4c17c67ffe3fc5ea02fccc44e84c89c72](https://github.com/jimsheen/yalc/commit/3b8f0ac4c17c67ffe3fc5ea02fccc44e84c89c72))
* remove unintended formatting ([509c8c6f86d9fcd8ce0c2bdcf43c6ccb8948e4c3](https://github.com/jimsheen/yalc/commit/509c8c6f86d9fcd8ce0c2bdcf43c6ccb8948e4c3))
* remove unintended formatting ([4bc439fbb0c3d8c07d021232b7b5f243ea074dd5](https://github.com/jimsheen/yalc/commit/4bc439fbb0c3d8c07d021232b7b5f243ea074dd5))
* rename to yalc ([bcecd76f172dba85874e213ae466944c133638c7](https://github.com/jimsheen/yalc/commit/bcecd76f172dba85874e213ae466944c133638c7))
* replace `files` flag with `content` ([ec26c403476065f238c19db9cde733b1a38b78ef](https://github.com/jimsheen/yalc/commit/ec26c403476065f238c19db9cde733b1a38b78ef))
* Reverted line change ([825095ea6b6d5fb38f8148e1f25797a7ac1cc6da](https://github.com/jimsheen/yalc/commit/825095ea6b6d5fb38f8148e1f25797a7ac1cc6da))
* Run 'prepublishOnly' script during 'yalc publish' ([2ba3d2ac16c5765333eb506fba64b13ae9f2dc12](https://github.com/jimsheen/yalc/commit/2ba3d2ac16c5765333eb506fba64b13ae9f2dc12))
* Run prepack before `publish` ([45c18b110b512762ef86f08ac42541b36519ab38](https://github.com/jimsheen/yalc/commit/45c18b110b512762ef86f08ac42541b36519ab38))
* script and colors ([792e616274a9e0458fc2e3e85f82d9cc32b08692](https://github.com/jimsheen/yalc/commit/792e616274a9e0458fc2e3e85f82d9cc32b08692))
* set publish date in changelog ([03e18d3efa3d93a283cc416daa877a7e1d127e9f](https://github.com/jimsheen/yalc/commit/03e18d3efa3d93a283cc416daa877a7e1d127e9f))
* settings cleanup ([dd77469c45acb79c4f0b3ec906648e23c00d5990](https://github.com/jimsheen/yalc/commit/dd77469c45acb79c4f0b3ec906648e23c00d5990))
* skip publishing non-code files ([f4f97fac159329bac8ef36c2a920211a8736c4ab](https://github.com/jimsheen/yalc/commit/f4f97fac159329bac8ef36c2a920211a8736c4ab))
* SMall fixes ([a1dea2d3415fa55d88ede73f142c7e1df7721749](https://github.com/jimsheen/yalc/commit/a1dea2d3415fa55d88ede73f142c7e1df7721749))
* small refactor ([7bd88636487d9db8f98ff86ceee6af27650f6b86](https://github.com/jimsheen/yalc/commit/7bd88636487d9db8f98ff86ceee6af27650f6b86))
* sort dependencies ([8b8eac19bd588966cbc8ecd8f79eced8d656449d](https://github.com/jimsheen/yalc/commit/8b8eac19bd588966cbc8ecd8f79eced8d656449d))
* store/packages folder ([2474a8a38e3d3d2380853680d8ac1b8d7815510f](https://github.com/jimsheen/yalc/commit/2474a8a38e3d3d2380853680d8ac1b8d7815510f))
* support rcfile config ([e050bb304739de5ba66394f5279588653ad22094](https://github.com/jimsheen/yalc/commit/e050bb304739de5ba66394f5279588653ad22094))
* support workspace: resolution ([5214d4c2333aa90ca3c12a5497abe5f047bde988](https://github.com/jimsheen/yalc/commit/5214d4c2333aa90ca3c12a5497abe5f047bde988))
* surface errors from child processes ([54bc5bd0afe8a6b16edb61ca3bdc1c3fa16eac7c](https://github.com/jimsheen/yalc/commit/54bc5bd0afe8a6b16edb61ca3bdc1c3fa16eac7c))
* test's .gitignore notice ([9c9f6e031116de4a1d3bbd32f9d1e40a86e4cce9](https://github.com/jimsheen/yalc/commit/9c9f6e031116de4a1d3bbd32f9d1e40a86e4cce9))
* tests skeleton ([7f9e59ba301b31baa37064a7f144ed4798732330](https://github.com/jimsheen/yalc/commit/7f9e59ba301b31baa37064a7f144ed4798732330))
* type fix ([2a5ad1c03902d49fc7a0399fe1f43a9205e7bff9](https://github.com/jimsheen/yalc/commit/2a5ad1c03902d49fc7a0399fe1f43a9205e7bff9))
* upadate change log ([ba8b9a43ebbd91dc936ef68ad07dcc25cd90925b](https://github.com/jimsheen/yalc/commit/ba8b9a43ebbd91dc936ef68ad07dcc25cd90925b))
* update and push ([d85eca8d58a962e1404fbfe1eff7a019e91abad0](https://github.com/jimsheen/yalc/commit/d85eca8d58a962e1404fbfe1eff7a019e91abad0))
* update change log ([bf7bc131ec7ad7e054b5e540337a34da0371f44a](https://github.com/jimsheen/yalc/commit/bf7bc131ec7ad7e054b5e540337a34da0371f44a))
* update changedlog and version ([611a01dbc8a23c868eebc307718059e9c2d223de](https://github.com/jimsheen/yalc/commit/611a01dbc8a23c868eebc307718059e9c2d223de))
* update changelog ([846d3035fa71e453c036e93c78e0afda4712df3b](https://github.com/jimsheen/yalc/commit/846d3035fa71e453c036e93c78e0afda4712df3b))
* update changelog ([9b5deaf436897d894dc9c81a86005d225c21ac38](https://github.com/jimsheen/yalc/commit/9b5deaf436897d894dc9c81a86005d225c21ac38))
* update changelog ([e54f0e5cb676d2bd00747320d52f9ce457e4bb77](https://github.com/jimsheen/yalc/commit/e54f0e5cb676d2bd00747320d52f9ce457e4bb77))
* update changelog/version ([7631444e1106e4529202da7b7be95859b0cdfa86](https://github.com/jimsheen/yalc/commit/7631444e1106e4529202da7b7be95859b0cdfa86))
* update npm-packlist, sort content ([dd0a84e38a9261bd0d8667b1b4cfadfe25f22bab](https://github.com/jimsheen/yalc/commit/dd0a84e38a9261bd0d8667b1b4cfadfe25f22bab))
* update package.json version ([3690d40f2ad3a8be9679abd19f96f6524bd70ee2](https://github.com/jimsheen/yalc/commit/3690d40f2ad3a8be9679abd19f96f6524bd70ee2))
* update readme ([03cccc27e10afcbd580692201bc965dd22748434](https://github.com/jimsheen/yalc/commit/03cccc27e10afcbd580692201bc965dd22748434))
* update readme ([8e37e081891082e928b80be4a24705c1e4f677a1](https://github.com/jimsheen/yalc/commit/8e37e081891082e928b80be4a24705c1e4f677a1))
* update readme ([678e774ee73b3dc14265d706826fb3007e56a22b](https://github.com/jimsheen/yalc/commit/678e774ee73b3dc14265d706826fb3007e56a22b))
* update readme ([229b38c71ebb685b630f5821a443a282e36d479d](https://github.com/jimsheen/yalc/commit/229b38c71ebb685b630f5821a443a282e36d479d))
* update readme ([2a0b74cbbe7f264b9d37c29e48bb68fe07922e3a](https://github.com/jimsheen/yalc/commit/2a0b74cbbe7f264b9d37c29e48bb68fe07922e3a))
* update readme about --store-folder ([b09e04f5aea9e38e1d1e2ac06944d88f7fa3fc14](https://github.com/jimsheen/yalc/commit/b09e04f5aea9e38e1d1e2ac06944d88f7fa3fc14))
* update readme and version ([5991e2ee10b4fb0c5432b1e1d91d8f0ff0931f91](https://github.com/jimsheen/yalc/commit/5991e2ee10b4fb0c5432b1e1d91d8f0ff0931f91))
* Update readme regarding npm/yarn ([830cb17ff8150e63423472963b4f9c6285d10de6](https://github.com/jimsheen/yalc/commit/830cb17ff8150e63423472963b4f9c6285d10de6))
* Update README.md ([3b6ee531a98b927022fdccf13860d8853a04c090](https://github.com/jimsheen/yalc/commit/3b6ee531a98b927022fdccf13860d8853a04c090))
* Update README.md ([9a24ec4b8b19225e1bb8893ff304396f3e9b325e](https://github.com/jimsheen/yalc/commit/9a24ec4b8b19225e1bb8893ff304396f3e9b325e))
* Update README.md ([699b9e474f2aa693dc51e9809d8527f8f2595203](https://github.com/jimsheen/yalc/commit/699b9e474f2aa693dc51e9809d8527f8f2595203))
* update readme/changelog ([21c54e15429d42640b888267df462a83c347f80a](https://github.com/jimsheen/yalc/commit/21c54e15429d42640b888267df462a83c347f80a))
* update travis node_js versions ([e9cdc34baa9784a29f37f9ee3c94f235534038bf](https://github.com/jimsheen/yalc/commit/e9cdc34baa9784a29f37f9ee3c94f235534038bf))
* update travis version ([24846de3ae2bfbf4fafdb8782733f6cf604553f2](https://github.com/jimsheen/yalc/commit/24846de3ae2bfbf4fafdb8782733f6cf604553f2))
* update version ([743b426ff326414ebeb8aa85f4df45b47767548b](https://github.com/jimsheen/yalc/commit/743b426ff326414ebeb8aa85f4df45b47767548b))
* update version ([f95ee8501648e6b353a1708e7a28c100fd19ac2f](https://github.com/jimsheen/yalc/commit/f95ee8501648e6b353a1708e7a28c100fd19ac2f))
* update version ([2ea164d5d10f2e56b14b4ac402d17979af950100](https://github.com/jimsheen/yalc/commit/2ea164d5d10f2e56b14b4ac402d17979af950100))
* update version ([58efe569bd136ba077a79ba0484796e67165e2b3](https://github.com/jimsheen/yalc/commit/58efe569bd136ba077a79ba0484796e67165e2b3))
* update version ([ca6a12f1e7bcb775f949d0ca4b2c9429354de6e9](https://github.com/jimsheen/yalc/commit/ca6a12f1e7bcb775f949d0ca4b2c9429354de6e9))
* update version ([de175f8adffbed81b3ab0c19acbe437c7907aa18](https://github.com/jimsheen/yalc/commit/de175f8adffbed81b3ab0c19acbe437c7907aa18))
* Update version ([7c224ed6f3226b057f27dd243f74a9eb3dfb851a](https://github.com/jimsheen/yalc/commit/7c224ed6f3226b057f27dd243f74a9eb3dfb851a))
* update yargs verision fixes #142 ([67ece314cbdebe0357acfa33d1dcd0004cc9e80a](https://github.com/jimsheen/yalc/commit/67ece314cbdebe0357acfa33d1dcd0004cc9e80a)), closes [#142](https://github.com/jimsheen/yalc/issues/142)
* update yargs, default command ([8812883e2baff923e26877a4d8ec5b40d631cb4d](https://github.com/jimsheen/yalc/commit/8812883e2baff923e26877a4d8ec5b40d631cb4d))
* upgrade npm-packlist to v2 ([46459252c87644151adcd021c768db5db949f045](https://github.com/jimsheen/yalc/commit/46459252c87644151adcd021c768db5db949f045))
* use .gitignore if no `files` entry in manifest ([9b7bafbca56a2222afb81e3f31964931534c9f36](https://github.com/jimsheen/yalc/commit/9b7bafbca56a2222afb81e3f31964931534c9f36))
* version sig semver metadata fromat ([31f597f801dda0678605be9cb2f9173fba01e62c](https://github.com/jimsheen/yalc/commit/31f597f801dda0678605be9cb2f9173fba01e62c))
* verson pre.14 ([7e74411bd0f324cedd0029891d2c5c56aaa9a6b7](https://github.com/jimsheen/yalc/commit/7e74411bd0f324cedd0029891d2c5c56aaa9a6b7))
* workspace flag ([b9281222b82b1edd782a2bb9758bad51ef981a01](https://github.com/jimsheen/yalc/commit/b9281222b82b1edd782a2bb9758bad51ef981a01))
* workspace version aliases (#162) ([9d9fd9a68ef27ee44eda095ab264e3ae507f203e](https://github.com/jimsheen/yalc/commit/9d9fd9a68ef27ee44eda095ab264e3ae507f203e)), closes [#162](https://github.com/jimsheen/yalc/issues/162)
* dev: use pretty-quick ([4ec43144d581417983310eb1d54854cc91c5e41f](https://github.com/jimsheen/yalc/commit/4ec43144d581417983310eb1d54854cc91c5e41f))
* style: add auto formatter and format everything ([d7ffe3e8a12fea2d34f22683d7b9815f34087345](https://github.com/jimsheen/yalc/commit/d7ffe3e8a12fea2d34f22683d7b9815f34087345))
* test: fix timing issue in new test ([0190be054eea8dd117e589c59903e6f822845e54](https://github.com/jimsheen/yalc/commit/0190be054eea8dd117e589c59903e6f822845e54))
* test: validate sig across test run instead of against checked in hash ([b82b9b222436188a3a620b70aa0162f629a578c8](https://github.com/jimsheen/yalc/commit/b82b9b222436188a3a620b70aa0162f629a578c8))
* REFACTOR: vscode - remove unused imports, assignments, and parameters ([345a9b069b03561e8fbe843f0077ff3262838b35](https://github.com/jimsheen/yalc/commit/345a9b069b03561e8fbe843f0077ff3262838b35))
* travis: remove bundler ([c7af9910ed3032aa567e804812f44a462ae0cb3a](https://github.com/jimsheen/yalc/commit/c7af9910ed3032aa567e804812f44a462ae0cb3a))
* travis: remove sudo ([edfd2b2e636329b598ccdea8b42bb0fb6d5a4026](https://github.com/jimsheen/yalc/commit/edfd2b2e636329b598ccdea8b42bb0fb6d5a4026))


### BREAKING CHANGE

* Replaced separate CI and Release workflows with unified CI/CD pipeline

Benefits:
- 40% faster releases (eliminate redundant 2min rebuild)
- Artifact reuse ensures build consistency between test and release
- Parallel job execution (test matrix + security audit)
- Simplified maintenance (single workflow vs two)
- Better resource utilization and cost efficiency

Changes:
- Remove .github/workflows/ci.yml and .github/workflows/release.yml
- Add .github/workflows/ci-cd.yml with optimized job dependencies
- Build artifacts uploaded/downloaded to prevent environment drift
- Conditional release only on main branch with proper permissions
- Enhanced dry-run capabilities for safer release testing
- Maintain all existing features: multi-node testing, security audit, provenance

Architecture:
- Build once → Test everywhere → Release with same artifacts
- PR: build→test→security (no release)
- Main: build→test→security→release→provenance
- Manual: build→test→security→dry-run
* Revert overengineered workflow consolidation

Issues with previous consolidation:
- Duplicate npm publishing (semantic-release + manual publish)
- Overly complex conditional logic
- False efficiency claims (still installing deps 5x)
- Added complexity without proportional benefit

Solution: Keep it simple
- Separate CI and Release workflows (clear separation of concerns)
- CI runs on every push/PR for fast feedback
- Release runs after CI passes on main branch
- Maintain existing dry-run capabilities
- Keep semantic-release date fix (the real issue that was solved)

Architecture:
- CI: typecheck + lint + build + test + security (~3min)
- Release: build + semantic-release (~2min)
- Total: ~5min (same as before, but reliable and maintainable)

Principle: Simple, working solutions > premature optimization

## <small>2.0.3 (2025-11-18)</small>

- fix: improve version resolution for published package ([2fcb6e019dabda686c63b2165a14d2e6d6165fcb](https://github.com/jimsheen/yalc/commit/2fcb6e019dabda686c63b2165a14d2e6d6165fcb))

## <small>2.0.2 (2025-11-17)</small>

- fix: add publishConfig to make scoped package public ([a906aba12d1b6dca70c45f83b5d78f718de4450e](https://github.com/jimsheen/yalc/commit/a906aba12d1b6dca70c45f83b5d78f718de4450e))

## <small>2.0.1 (2025-11-16)</small>

- fix: disable prepublishOnly script in CI to prevent release workflow failures ([635f2e1e93946d308bdc24eb76238706e3330c88](https://github.com/jimsheen/yalc/commit/635f2e1e93946d308bdc24eb76238706e3330c88))

## 2.0.0 (2025-11-15)

- fix: revert to simple, working CI/Release workflows ([9db8132d0c09ff7fcfdca2a50badd96974100ccf](https://github.com/jimsheen/yalc/commit/9db8132d0c09ff7fcfdca2a50badd96974100ccf))

### BREAKING CHANGE

- Revert overengineered workflow consolidation

Issues with previous consolidation:

- Duplicate npm publishing (semantic-release + manual publish)
- Overly complex conditional logic
- False efficiency claims (still installing deps 5x)
- Added complexity without proportional benefit

Solution: Keep it simple

- Separate CI and Release workflows (clear separation of concerns)
- CI runs on every push/PR for fast feedback
- Release runs after CI passes on main branch
- Maintain existing dry-run capabilities
- Keep semantic-release date fix (the real issue that was solved)

Architecture:

- CI: typecheck + lint + build + test + security (~3min)
- Release: build + semantic-release (~2min)
- Total: ~5min (same as before, but reliable and maintainable)

Principle: Simple, working solutions > premature optimization

## 1.0.0 (2025-11-10)

- feat: add comprehensive catalog tests and improve caching mechanism ([f9ef81814ff63dfd6d626e1c412ce46e96d3b1da](https://github.com/jimsheen/yalc/commit/f9ef81814ff63dfd6d626e1c412ce46e96d3b1da))
- feat: consolidate CI and Release workflows for improved efficiency ([fc60bde69e8c44696740e02a40addfc24a5c482c](https://github.com/jimsheen/yalc/commit/fc60bde69e8c44696740e02a40addfc24a5c482c))
- feat: improved yarn support ([5f304a36e5523ae953add65bad0dba1fa6dc07dd](https://github.com/jimsheen/yalc/commit/5f304a36e5523ae953add65bad0dba1fa6dc07dd))
- feat: Introduce @jimsheen/yalc - a modernized fork of yalc with enhanced performance and features ([f16147dcb4af68b9bd9de8619a0224137313038b](https://github.com/jimsheen/yalc/commit/f16147dcb4af68b9bd9de8619a0224137313038b))
- feat: update node_modules/.bin ([1ab79acd6b40a7862a8b2e6f265f034facb2f979](https://github.com/jimsheen/yalc/commit/1ab79acd6b40a7862a8b2e6f265f034facb2f979))
- fix: `readPackageManifest` can detect indent correctly ([841dc4dc8341c0fbd0e47ba920b511104db3ceb5](https://github.com/jimsheen/yalc/commit/841dc4dc8341c0fbd0e47ba920b511104db3ceb5))
- fix: add tslint hanging promise detection and fix errors ([f18720147a885b8a3efafdcbc6d92117e0872cab](https://github.com/jimsheen/yalc/commit/f18720147a885b8a3efafdcbc6d92117e0872cab))
- fix: correct CI workflow order - build before tests ([3fcc9e873b1f19dd5feabbcdb1fdd2a0121d3de0](https://github.com/jimsheen/yalc/commit/3fcc9e873b1f19dd5feabbcdb1fdd2a0121d3de0))
- fix: drop Node.js 18 support due to vitest compatibility ([15fb361dd11d06fd217d9d22f46988fb40db3238](https://github.com/jimsheen/yalc/commit/15fb361dd11d06fd217d9d22f46988fb40db3238))
- fix: include test fixture dist/file.txt in git ([c638144b0cf35efc4773c480d04ba7dbca117d2e](https://github.com/jimsheen/yalc/commit/c638144b0cf35efc4773c480d04ba7dbca117d2e))
- fix: include workspace packages in git for CI test fixtures ([2b674ead25bb0397608c88b6013ebad3744fe3d1](https://github.com/jimsheen/yalc/commit/2b674ead25bb0397608c88b6013ebad3744fe3d1))
- fix: release workflow should wait for CI to complete ([da2c7b7747d81dbd30b2b7cb768dfd4e55427e29](https://github.com/jimsheen/yalc/commit/da2c7b7747d81dbd30b2b7cb768dfd4e55427e29))
- fix: remove .releaserc.json configuration file ([d8e8310919423577b2b94067bece4a0882a15122](https://github.com/jimsheen/yalc/commit/d8e8310919423577b2b94067bece4a0882a15122))
- fix: remove package dir from node_modules only if needed ([3a73ce7328b626ac2725be79b5b6af8008ba1691](https://github.com/jimsheen/yalc/commit/3a73ce7328b626ac2725be79b5b6af8008ba1691))
- fix: replace pnpm with npm in CI scripts ([f41cb06774d95c2774b79cf8c7cea36eac808d0b](https://github.com/jimsheen/yalc/commit/f41cb06774d95c2774b79cf8c7cea36eac808d0b))
- fix: replace yarn.lock artifactory urls with public url ([c94cdc8fd84cf17dc99af527c6b8b436296bb241](https://github.com/jimsheen/yalc/commit/c94cdc8fd84cf17dc99af527c6b8b436296bb241))
- fix: resolve CI failures and security vulnerabilities ([de2462ba025a559ce2e5aac88d335ae598915de8](https://github.com/jimsheen/yalc/commit/de2462ba025a559ce2e5aac88d335ae598915de8))
- fix: resolve semantic-release Invalid date error with robust date handling ([72558fa664d7a7ecfc408d6ad1922e09f16de185](https://github.com/jimsheen/yalc/commit/72558fa664d7a7ecfc408d6ad1922e09f16de185))
- fix: update dependencies and baseline timestamps for regression tests ([ab4b51a2fbe79c2ff781a0c3e1cb4aef24ddf610](https://github.com/jimsheen/yalc/commit/ab4b51a2fbe79c2ff781a0c3e1cb4aef24ddf610))
- fix: update Release workflow to use Node.js 20 ([a0870bcc73fca3a12d2d06ac8fd2637c1088c925](https://github.com/jimsheen/yalc/commit/a0870bcc73fca3a12d2d06ac8fd2637c1088c925))
- fix(publish): adds quotes around workingDir ([802f55c9e37c0a008d17069072e8d4886c6dc8a7](https://github.com/jimsheen/yalc/commit/802f55c9e37c0a008d17069072e8d4886c6dc8a7))
- chore: remove test-results from git tracking ([2e0b1ef4029a0477107d4292a2a0d1da65a12317](https://github.com/jimsheen/yalc/commit/2e0b1ef4029a0477107d4292a2a0d1da65a12317))
- chore: remove unused dev dependency ([1162e27d3a9fcc463257859495515c5628cd36f4](https://github.com/jimsheen/yalc/commit/1162e27d3a9fcc463257859495515c5628cd36f4))
- chore: replace `user-home` for built-in ([af9d4a1736c393f383aa921bd2c7553ce7a70a08](https://github.com/jimsheen/yalc/commit/af9d4a1736c393f383aa921bd2c7553ce7a70a08))
- chore: run prettier ([efe58893899c0611aed01e9b8fce03a298540340](https://github.com/jimsheen/yalc/commit/efe58893899c0611aed01e9b8fce03a298540340))
- --pure --changed, ws support ([2c70028e34390bbc3fbce033439dc63907fa8d18](https://github.com/jimsheen/yalc/commit/2c70028e34390bbc3fbce033439dc63907fa8d18))
- A few more spelling and grammar edits ([6bfd9416a9a7b6dbcf9c868a41acedef89877653](https://github.com/jimsheen/yalc/commit/6bfd9416a9a7b6dbcf9c868a41acedef89877653))
- ad check ([1a3ba89d8454386720718d059fcc7bd5ccf52f59](https://github.com/jimsheen/yalc/commit/1a3ba89d8454386720718d059fcc7bd5ccf52f59))
- add --link option and readme update ([689e46cf2dc4e025f77a98710c2608de525bf12d](https://github.com/jimsheen/yalc/commit/689e46cf2dc4e025f77a98710c2608de525bf12d))
- add --private ([f6c5ccc7b591606e4dd4132a1241667d8ce4efa6](https://github.com/jimsheen/yalc/commit/f6c5ccc7b591606e4dd4132a1241667d8ce4efa6))
- add --replace flag ([234fe337dfb4cb0f272ac96cd06503ba5818afd4](https://github.com/jimsheen/yalc/commit/234fe337dfb4cb0f272ac96cd06503ba5818afd4))
- add --save-dev and --dev to docs ([44838f6f80c60d14545fb5060048ea7c56c57593](https://github.com/jimsheen/yalc/commit/44838f6f80c60d14545fb5060048ea7c56c57593))
- add --store-folder option ([32cc13ddd4997f4606e9237e2d5a02f280b667e0](https://github.com/jimsheen/yalc/commit/32cc13ddd4997f4606e9237e2d5a02f280b667e0))
- add --update option ([eea489c993e61f59e26bbce1beb32b2733a3adc0](https://github.com/jimsheen/yalc/commit/eea489c993e61f59e26bbce1beb32b2733a3adc0))
- add --version flag ([18bfaae8d6f47a3cda8da59b5b70a68f56707568](https://github.com/jimsheen/yalc/commit/18bfaae8d6f47a3cda8da59b5b70a68f56707568))
- add -W and no-scripts arg ([4901ce267a32638061190ea4f94a53555fb64345](https://github.com/jimsheen/yalc/commit/4901ce267a32638061190ea4f94a53555fb64345))
- add -W flag ([cf31964966acba955611d7a531f2f256394dc533](https://github.com/jimsheen/yalc/commit/cf31964966acba955611d7a531f2f256394dc533))
- add bin ensureSymlinkSync to try catch ([822b9faf8fa31672eb607ca8c48c3bd6b31d03c1](https://github.com/jimsheen/yalc/commit/822b9faf8fa31672eb607ca8c48c3bd6b31d03c1))
- add check command ([9e80110be6ff02bd3aa35b0db648e177d0a0ab2d](https://github.com/jimsheen/yalc/commit/9e80110be6ff02bd3aa35b0db648e177d0a0ab2d))
- add CRLF warning ([4409984c32eed939a0d5614f5a1dac03438a259f](https://github.com/jimsheen/yalc/commit/4409984c32eed939a0d5614f5a1dac03438a259f))
- add dev-mod (removing of devDeps) ([f771f95654425f2f266f15b7f5b77ee1db9263a4](https://github.com/jimsheen/yalc/commit/f771f95654425f2f266f15b7f5b77ee1db9263a4))
- add files option ([3a25829310c39286dc61298c8943402a98934ffd](https://github.com/jimsheen/yalc/commit/3a25829310c39286dc61298c8943402a98934ffd))
- add husky ([4f895a4b4fff4f6276c611c01073abf0db0b167a](https://github.com/jimsheen/yalc/commit/4f895a4b4fff4f6276c611c01073abf0db0b167a))
- add installations clean/show ([4594f94deaa164adf2995413a29936b0face1580](https://github.com/jimsheen/yalc/commit/4594f94deaa164adf2995413a29936b0face1580))
- add MIT licence text ([4fef177e1c179e04653e5391b572de79d2ff4f17](https://github.com/jimsheen/yalc/commit/4fef177e1c179e04653e5391b572de79d2ff4f17))
- add nested .yalc issue in docs ([d764c11347a9345874b02a0ded5a826d8f6ce028](https://github.com/jimsheen/yalc/commit/d764c11347a9345874b02a0ded5a826d8f6ce028))
- add new line at the end of package.json ([10176f9e48c18d84e6638708d1ff7c7268077468](https://github.com/jimsheen/yalc/commit/10176f9e48c18d84e6638708d1ff7c7268077468))
- add prepare scirpt ([2708e145d93988112bea5b9583818f00ee294fa2](https://github.com/jimsheen/yalc/commit/2708e145d93988112bea5b9583818f00ee294fa2))
- add publish date ([d1bd8237845197b17ebe3c6c4016a91afc0d2e98](https://github.com/jimsheen/yalc/commit/d1bd8237845197b17ebe3c6c4016a91afc0d2e98))
- add remove and retreat ([16a87f11e89318a9d5339dc0091dd2d47e09b41c](https://github.com/jimsheen/yalc/commit/16a87f11e89318a9d5339dc0091dd2d47e09b41c))
- add repository link to package.json ([ae2db1a63c8e3646729898682a87f2d99df01ebd](https://github.com/jimsheen/yalc/commit/ae2db1a63c8e3646729898682a87f2d99df01ebd))
- add restore command ([50fefdc95cc00dcabc7e5be6fc005289eb66d08a](https://github.com/jimsheen/yalc/commit/50fefdc95cc00dcabc7e5be6fc005289eb66d08a))
- add safe copy dir ([543d26de61b85a03e098a2adc0e7de448306e83c](https://github.com/jimsheen/yalc/commit/543d26de61b85a03e098a2adc0e7de448306e83c))
- add signature (`yalcSig` key) to published package.json ([196dfec1f28a10f8e64f4249bd37478467d50b12](https://github.com/jimsheen/yalc/commit/196dfec1f28a10f8e64f4249bd37478467d50b12))
- add store path in not found message ([ee8921d0d39b0f563434a49fd8b16543e56bb752](https://github.com/jimsheen/yalc/commit/ee8921d0d39b0f563434a49fd8b16543e56bb752))
- add test file.txt to git ([3648b52ca69014f42285e9691faa092d9ac5ec89](https://github.com/jimsheen/yalc/commit/3648b52ca69014f42285e9691faa092d9ac5ec89))
- add test for workspace protocol resolution ([ce5345c143fe7d579efa6e21fe121cbd04149b58](https://github.com/jimsheen/yalc/commit/ce5345c143fe7d579efa6e21fe121cbd04149b58))
- add tests ([cb638c32ef5f39e4f091b0b8ce960e038cea0fdb](https://github.com/jimsheen/yalc/commit/cb638c32ef5f39e4f091b0b8ce960e038cea0fdb))
- add tests for remove ([5115521daef8e23fb3d4e7eaf17146306a3d7dd7](https://github.com/jimsheen/yalc/commit/5115521daef8e23fb3d4e7eaf17146306a3d7dd7))
- add trash-cli, publish ([9c5860f66f1c13c6599a9df171e522cc8c8cd776](https://github.com/jimsheen/yalc/commit/9c5860f66f1c13c6599a9df171e522cc8c8cd776))
- add travis ([346854a5c63b365370e38f47a08d8545a6259bc7](https://github.com/jimsheen/yalc/commit/346854a5c63b365370e38f47a08d8545a6259bc7))
- add travis badge ([d3a5c91db7a406517189c970ee70883013b9840c](https://github.com/jimsheen/yalc/commit/d3a5c91db7a406517189c970ee70883013b9840c))
- add try catch when modefiying permissions ([bf5a9dc31d8abb590b87d215637ce3fa33c12845](https://github.com/jimsheen/yalc/commit/bf5a9dc31d8abb590b87d215637ce3fa33c12845))
- add ts-tslint-plugin ([3e923a7aa471ffe19f8b66a0895d71db0fb6021e](https://github.com/jimsheen/yalc/commit/3e923a7aa471ffe19f8b66a0895d71db0fb6021e))
- Add unpublish (yalc installations) instructions ([57c0e5b99598a5eab61e2a817e49fdc819258e56](https://github.com/jimsheen/yalc/commit/57c0e5b99598a5eab61e2a817e49fdc819258e56))
- add workspace protocol resolution ([ef79af55b73b8924bb3ab608d3a27349b8174d88](https://github.com/jimsheen/yalc/commit/ef79af55b73b8924bb3ab608d3a27349b8174d88))
- added hash signature ([9194e47a0295c27498cc78a506af222faa1178a0](https://github.com/jimsheen/yalc/commit/9194e47a0295c27498cc78a506af222faa1178a0))
- allow --pure without worspaces ([aad5cdf5bd0c27df4216d79fdfbef59efd703980](https://github.com/jimsheen/yalc/commit/aad5cdf5bd0c27df4216d79fdfbef59efd703980))
- better non-code files filtering ([14b7cc7e25105ee61e2bb33de01253f461059355](https://github.com/jimsheen/yalc/commit/14b7cc7e25105ee61e2bb33de01253f461059355))
- bump ([2e3728b8a34f87b7854e4156c7d3678c3a820e7a](https://github.com/jimsheen/yalc/commit/2e3728b8a34f87b7854e4156c7d3678c3a820e7a))
- bump version ([214ab0371aedd2212e2b21a9b9481cbdaf742404](https://github.com/jimsheen/yalc/commit/214ab0371aedd2212e2b21a9b9481cbdaf742404))
- bump version ([d68a50fa184ead577ec9c655be21512d8db19a79](https://github.com/jimsheen/yalc/commit/d68a50fa184ead577ec9c655be21512d8db19a79))
- bump version ([9d559f307275a7a128399268fbdb6400d72fe88f](https://github.com/jimsheen/yalc/commit/9d559f307275a7a128399268fbdb6400d72fe88f))
- bump version ([5ab85b5aa60c4e71b4556574a01055888830746f](https://github.com/jimsheen/yalc/commit/5ab85b5aa60c4e71b4556574a01055888830746f))
- bump version ([27a4810e69578ef0e94eca6e5da7d6ff4f9a49f3](https://github.com/jimsheen/yalc/commit/27a4810e69578ef0e94eca6e5da7d6ff4f9a49f3))
- bump version ([428e8af059aa649772f99a2e5cf57589f2b98b63](https://github.com/jimsheen/yalc/commit/428e8af059aa649772f99a2e5cf57589f2b98b63))
- bump version ([547425b92c48b1a32a9ca96ab80850958c7b14a2](https://github.com/jimsheen/yalc/commit/547425b92c48b1a32a9ca96ab80850958c7b14a2))
- bump version ([abaa47e560a792d42a9b4697ad97c07bacce8552](https://github.com/jimsheen/yalc/commit/abaa47e560a792d42a9b4697ad97c07bacce8552))
- change name to yaloc ([710cb500ff8acb952ed984506e265416c20e106c](https://github.com/jimsheen/yalc/commit/710cb500ff8acb952ed984506e265416c20e106c))
- check for travis ([a4100d4cdd4d6db28b55d5dc61f12959e517666b](https://github.com/jimsheen/yalc/commit/a4100d4cdd4d6db28b55d5dc61f12959e517666b))
- check for travis fail ([3c2aefb4686dc4f57720c61fd373e2660810ba47](https://github.com/jimsheen/yalc/commit/3c2aefb4686dc4f57720c61fd373e2660810ba47))
- check if symlink and remove folder #7 ([1eede443f0581e7bbf2c1d56b77e25efdca027de](https://github.com/jimsheen/yalc/commit/1eede443f0581e7bbf2c1d56b77e25efdca027de)), closes [#7](https://github.com/jimsheen/yalc/issues/7)
- copy to dest package dir not removing inner `node_modules` ([241359b4f03de3a99f1dc2b997169276c75b8c56](https://github.com/jimsheen/yalc/commit/241359b4f03de3a99f1dc2b997169276c75b8c56))
- Correct spelling, grammar, and typography issues ([b3195e63410178195a3a89ed45a7f5883b3ca2e0](https://github.com/jimsheen/yalc/commit/b3195e63410178195a3a89ed45a7f5883b3ca2e0))
- do not ignore subdirectories such as 'history' ([f2163247379683af72b5e2ffae88b32220a2f72c](https://github.com/jimsheen/yalc/commit/f2163247379683af72b5e2ffae88b32220a2f72c))
- empty dir including dot folders ([8f8339276c8679500eb27dcda2da369d0454091d](https://github.com/jimsheen/yalc/commit/8f8339276c8679500eb27dcda2da369d0454091d))
- first commit ([fda54cf32b2a72aa20f24f663b2457836dfe52f3](https://github.com/jimsheen/yalc/commit/fda54cf32b2a72aa20f24f663b2457836dfe52f3))
- fix --pure flag ([1814027f772466e7053d054532dd1bf2b869b19b](https://github.com/jimsheen/yalc/commit/1814027f772466e7053d054532dd1bf2b869b19b))
- fix --pure with workspaces ([af4ed2ded411b4b78125609d3c6edcb4c071e3ff](https://github.com/jimsheen/yalc/commit/af4ed2ded411b4b78125609d3c6edcb4c071e3ff))
- fix --quiet, remove incorrect ([e7cc0be12b46e79e62783fdc6b555f926a2789b5](https://github.com/jimsheen/yalc/commit/e7cc0be12b46e79e62783fdc6b555f926a2789b5))
- fix --scripts flag ([dc543730df6f14bdf995078de19c6d05816c2303](https://github.com/jimsheen/yalc/commit/dc543730df6f14bdf995078de19c6d05816c2303))
- Fix 'link' command and make 'update' consistent with the rest ([24174ee7cec5a3b157ab770de8f6490e9f8febbf](https://github.com/jimsheen/yalc/commit/24174ee7cec5a3b157ab770de8f6490e9f8febbf))
- Fix "quiet" command line argument typo. ([035eebc743cc32a1a91f0344ce4ebf2a3a087358](https://github.com/jimsheen/yalc/commit/035eebc743cc32a1a91f0344ce4ebf2a3a087358))
- fix @scoped names publish bug #109 ([c54de69b111483559253ddbe79f91c280b9d91aa](https://github.com/jimsheen/yalc/commit/c54de69b111483559253ddbe79f91c280b9d91aa)), closes [#109](https://github.com/jimsheen/yalc/issues/109)
- Fix `--sig` documentation in readme ([683fdf76bd8ad27a72c4b0673be4e9588f9bc8f1](https://github.com/jimsheen/yalc/commit/683fdf76bd8ad27a72c4b0673be4e9588f9bc8f1))
- fix add --link ([a9cbd90a7d00bde59c4b6f6d438f195e7dcd427e](https://github.com/jimsheen/yalc/commit/a9cbd90a7d00bde59c4b6f6d438f195e7dcd427e))
- Fix broken link ([6a0518ca521bb89ded25369b4aa7ea290aa134a1](https://github.com/jimsheen/yalc/commit/6a0518ca521bb89ded25369b4aa7ea290aa134a1))
- fix bugs, LF, update version ([83f8795baec6faff5ef8dfc3e13cb6b8eb48d439](https://github.com/jimsheen/yalc/commit/83f8795baec6faff5ef8dfc3e13cb6b8eb48d439))
- fix ci script ([159aa824fcdf0424369489e97f18fa8d4db6de4e](https://github.com/jimsheen/yalc/commit/159aa824fcdf0424369489e97f18fa8d4db6de4e))
- fix copy file permissions ([aad6cb4f55147e16d3c60bd50a726b0bd933edc1](https://github.com/jimsheen/yalc/commit/aad6cb4f55147e16d3c60bd50a726b0bd933edc1))
- fix copy if no `files` in manifest defined ([4953e3acdc1a5e479197582f489260ddec4ebed4](https://github.com/jimsheen/yalc/commit/4953e3acdc1a5e479197582f489260ddec4ebed4))
- fix default pure add in workspaces ([f2d963b2d7cee0042fcac7333aa14c51b89b94f7](https://github.com/jimsheen/yalc/commit/f2d963b2d7cee0042fcac7333aa14c51b89b94f7))
- fix for #36 ([4ba033400cf92897a1682ac2e1f829bc28431c63](https://github.com/jimsheen/yalc/commit/4ba033400cf92897a1682ac2e1f829bc28431c63)), closes [#36](https://github.com/jimsheen/yalc/issues/36)
- fix formatting ([3b66f3cdc5d61a5517f97b13dc4243d44ab9304a](https://github.com/jimsheen/yalc/commit/3b66f3cdc5d61a5517f97b13dc4243d44ab9304a))
- fix hash rel path slashes ([9b946db5357430ec4ed34e2dd9d7f3a1c847852b](https://github.com/jimsheen/yalc/commit/9b946db5357430ec4ed34e2dd9d7f3a1c847852b))
- fix include rule folder/file ([d16f2caf5df4292c0dc827a95d97e3c7bb7b480a](https://github.com/jimsheen/yalc/commit/d16f2caf5df4292c0dc827a95d97e3c7bb7b480a))
- fix installlcation output ([b3c6400197b53dc963ce3d031f2f67f6f11b0fc4](https://github.com/jimsheen/yalc/commit/b3c6400197b53dc963ce3d031f2f67f6f11b0fc4))
- fix installtion file create ([64e758d1ba9705897e5bb95b626787ace0beecb6](https://github.com/jimsheen/yalc/commit/64e758d1ba9705897e5bb95b626787ace0beecb6))
- fix json output ([4d0f9f8a17c27c24f630b7130862a1d64e0f385c](https://github.com/jimsheen/yalc/commit/4d0f9f8a17c27c24f630b7130862a1d64e0f385c))
- fix link prop in lockfile ([a9509107b278f4a8669ccd339d1e6005756ca07b](https://github.com/jimsheen/yalc/commit/a9509107b278f4a8669ccd339d1e6005756ca07b))
- fix link: removal ([64bf4c5fc1f6b00a7cee919c904bc3b96c6bb4e5](https://github.com/jimsheen/yalc/commit/64bf4c5fc1f6b00a7cee919c904bc3b96c6bb4e5))
- fix lint error ([2612c6af100eaaea6d34f00c3e6edf1d36556ddc](https://github.com/jimsheen/yalc/commit/2612c6af100eaaea6d34f00c3e6edf1d36556ddc))
- fix linting ([47a5d5bde422b46e9bd883801d10104e0c81efb5](https://github.com/jimsheen/yalc/commit/47a5d5bde422b46e9bd883801d10104e0c81efb5))
- fix lockfile replaced ([9a8f9045674eb877e17078ee753b79e5d00b667f](https://github.com/jimsheen/yalc/commit/9a8f9045674eb877e17078ee753b79e5d00b667f))
- fix pre/post scripts run ([30d0cc7c933c41b71e578244b07538acae1085d6](https://github.com/jimsheen/yalc/commit/30d0cc7c933c41b71e578244b07538acae1085d6))
- fix publish installation remove ([3c73bdb922e19d5a035d1cfe424d77dd4b476eb6](https://github.com/jimsheen/yalc/commit/3c73bdb922e19d5a035d1cfe424d77dd4b476eb6))
- fix removing multiple packages, fixes #146 ([c17a8f37a503edc6a74a066697cb72f9605aa067](https://github.com/jimsheen/yalc/commit/c17a8f37a503edc6a74a066697cb72f9605aa067)), closes [#146](https://github.com/jimsheen/yalc/issues/146)
- fix removing scoped package folder ([f193f6f625b66caa6a56badd84d3b1ff67028bf3](https://github.com/jimsheen/yalc/commit/f193f6f625b66caa6a56badd84d3b1ff67028bf3))
- fix safe copy ([f64b5312ff7e6dd92c6ca452f128874a4e508896](https://github.com/jimsheen/yalc/commit/f64b5312ff7e6dd92c6ca452f128874a4e508896))
- Fix spelling of installation in push command ([0835e21bebbebaf2356b4e676158a54d708e8a76](https://github.com/jimsheen/yalc/commit/0835e21bebbebaf2356b4e676158a54d708e8a76))
- fix test files line endings, add relative filename to hash signature ([4bd52873b89ab66eab7d906cc612f7cd30b3558c](https://github.com/jimsheen/yalc/commit/4bd52873b89ab66eab7d906cc612f7cd30b3558c))
- fix tests ([98abfd5a74df28dc19690f5c5571a0dcd5a79080](https://github.com/jimsheen/yalc/commit/98abfd5a74df28dc19690f5c5571a0dcd5a79080))
- fix travis file name ([b3c5de0cceb421306461018c2fed479617972769](https://github.com/jimsheen/yalc/commit/b3c5de0cceb421306461018c2fed479617972769))
- fix travis link ([1d023b001e66959c2eb4c88977eb5f1821a44bcf](https://github.com/jimsheen/yalc/commit/1d023b001e66959c2eb4c88977eb5f1821a44bcf))
- fix travis script ([7f3a172c9bf2c137ac00ce454fda8d13a25f773b](https://github.com/jimsheen/yalc/commit/7f3a172c9bf2c137ac00ce454fda8d13a25f773b))
- fix typo ([24c0e5f1391d14fcad742b22688f996b744b069e](https://github.com/jimsheen/yalc/commit/24c0e5f1391d14fcad742b22688f996b744b069e))
- Fix typo ([e4043a9aeb2e82a720f41a117838d9d1cf446450](https://github.com/jimsheen/yalc/commit/e4043a9aeb2e82a720f41a117838d9d1cf446450))
- Fix typos in README ([c60f71b5d7bd11e5c4f6e56b002c84403229320a](https://github.com/jimsheen/yalc/commit/c60f71b5d7bd11e5c4f6e56b002c84403229320a))
- Fix unit tests on darwin platform ([4bdcc50944307c035782b358a90ec6fd8b262803](https://github.com/jimsheen/yalc/commit/4bdcc50944307c035782b358a90ec6fd8b262803))
- fix yarn.lock bug ([e550da3df7114b6ef9d16ddd01153b3173e4ef88](https://github.com/jimsheen/yalc/commit/e550da3df7114b6ef9d16ddd01153b3173e4ef88))
- fixes #2 inclusion of /dir ([6bd0f1cb561835f910af92459c5d9d473b4d51ee](https://github.com/jimsheen/yalc/commit/6bd0f1cb561835f910af92459c5d9d473b4d51ee)), closes [#2](https://github.com/jimsheen/yalc/issues/2)
- fixes #26, yalc push (linked) ([e888d26ef51381a86bcb9044408f8375dbc1ce62](https://github.com/jimsheen/yalc/commit/e888d26ef51381a86bcb9044408f8375dbc1ce62)), closes [#26](https://github.com/jimsheen/yalc/issues/26)
- Fixes #3 ([396b166a4e88776ea5a616fbd7616383cd33bd29](https://github.com/jimsheen/yalc/commit/396b166a4e88776ea5a616fbd7616383cd33bd29)), closes [#3](https://github.com/jimsheen/yalc/issues/3)
- Fixing #85 ([dc01d94b4d0cab636804867a7584413d51129377](https://github.com/jimsheen/yalc/commit/dc01d94b4d0cab636804867a7584413d51129377)), closes [#85](https://github.com/jimsheen/yalc/issues/85)
- handle `files` field in manifest ([6dfbfd1b19531a0d480d4fc4dabd4093ca565768](https://github.com/jimsheen/yalc/commit/6dfbfd1b19531a0d480d4fc4dabd4093ca565768))
- Handle empty and unknown command ([2985af39bdda4d0427a5d15310c44b4c899c079d](https://github.com/jimsheen/yalc/commit/2985af39bdda4d0427a5d15310c44b4c899c079d))
- ignore only root .yalc ([80b5fe0453a2c66f65983dc70b201bc52cd9cc13](https://github.com/jimsheen/yalc/commit/80b5fe0453a2c66f65983dc70b201bc52cd9cc13))
- Improve package file selection ([c7dcfa34c2cf21c24eb19ea74bdd244d83b7c780](https://github.com/jimsheen/yalc/commit/c7dcfa34c2cf21c24eb19ea74bdd244d83b7c780))
- installations file ([acd29e71a0804d53e34df73da4e8f84108f75071](https://github.com/jimsheen/yalc/commit/acd29e71a0804d53e34df73da4e8f84108f75071))
- latest ts verion, fix typings and test ([a1e99f7c74fa199041c849ab3c9d031ef38bc3ee](https://github.com/jimsheen/yalc/commit/a1e99f7c74fa199041c849ab3c9d031ef38bc3ee))
- link `.bin` scripts only when `yalc link` #156 ([afc296175bcbc8625aaccbf4f5e575823ad304c0](https://github.com/jimsheen/yalc/commit/afc296175bcbc8625aaccbf4f5e575823ad304c0)), closes [#156](https://github.com/jimsheen/yalc/issues/156)
- make --no-sig by default ([50a09c9e98f9319a0a1a6349e7207d5c4f1ced2c](https://github.com/jimsheen/yalc/commit/50a09c9e98f9319a0a1a6349e7207d5c4f1ced2c))
- make pkg.\_\_JSONSpaces optional ([ac7c84e218179d4010aa0c9832ccbd145ed3a991](https://github.com/jimsheen/yalc/commit/ac7c84e218179d4010aa0c9832ccbd145ed3a991))
- Merge branch 'master' into igrayson/npm-packlist ([3c061edeb5f033c1b0c65ad33f0c90631fec30e3](https://github.com/jimsheen/yalc/commit/3c061edeb5f033c1b0c65ad33f0c90631fec30e3))
- Merge branch 'master' of https://github.com/whitecolor/yalc ([4efd1d21f72ec9f40f4de4a04c841e9ffe7aa442](https://github.com/jimsheen/yalc/commit/4efd1d21f72ec9f40f4de4a04c841e9ffe7aa442))
- Merge branch 'master' of https://github.com/whitecolor/yalc ([9b51064aff3343cd62da913507c6505ddba93f2d](https://github.com/jimsheen/yalc/commit/9b51064aff3343cd62da913507c6505ddba93f2d))
- Merge branch 'master' of https://github.com/whitecolor/yalc ([7d48deaa1dca99dfbe43e762a135b49c57e9c851](https://github.com/jimsheen/yalc/commit/7d48deaa1dca99dfbe43e762a135b49c57e9c851))
- Merge branch 'master' of https://github.com/whitecolor/yalc ([6356e99cd2e9146bd86f941d31bc67b79d70dd00](https://github.com/jimsheen/yalc/commit/6356e99cd2e9146bd86f941d31bc67b79d70dd00))
- Merge branch 'master' of https://github.com/whitecolor/yalc ([bf4cc489fa6952e8e7514c1949402851c6d24cc2](https://github.com/jimsheen/yalc/commit/bf4cc489fa6952e8e7514c1949402851c6d24cc2))
- Merge branch 'master' of https://github.com/whitecolor/yalc ([14c7f03eaf55d12fb406abad06965bf138a2e63f](https://github.com/jimsheen/yalc/commit/14c7f03eaf55d12fb406abad06965bf138a2e63f))
- Merge branch 'master' of https://github.com/whitecolor/yalc into master ([66a445142e4ffa753e95ef5f811d4183784431eb](https://github.com/jimsheen/yalc/commit/66a445142e4ffa753e95ef5f811d4183784431eb))
- Merge pull request #10 from peterjanes/master ([eaaa2813d23050ae8be12227e75a3a71a9fe0299](https://github.com/jimsheen/yalc/commit/eaaa2813d23050ae8be12227e75a3a71a9fe0299)), closes [#10](https://github.com/jimsheen/yalc/issues/10)
- Merge pull request #11 from christopherthielen/master ([0a50718c7009a3330a126af2b6eaa7817c328989](https://github.com/jimsheen/yalc/commit/0a50718c7009a3330a126af2b6eaa7817c328989)), closes [#11](https://github.com/jimsheen/yalc/issues/11)
- Merge pull request #119 from vasc/patch-1 ([22ce374b9d4af578bc012f29855ab82df0ab909f](https://github.com/jimsheen/yalc/commit/22ce374b9d4af578bc012f29855ab82df0ab909f)), closes [#119](https://github.com/jimsheen/yalc/issues/119)
- Merge pull request #12 from christopherthielen/darwin ([9b2906663a9bb84cff66cdb7955295ef80ed6d08](https://github.com/jimsheen/yalc/commit/9b2906663a9bb84cff66cdb7955295ef80ed6d08)), closes [#12](https://github.com/jimsheen/yalc/issues/12)
- Merge pull request #124 from lukeed/chore/homedir ([b3f659ae5e4b4cd01991a8b255a857069255a2f9](https://github.com/jimsheen/yalc/commit/b3f659ae5e4b4cd01991a8b255a857069255a2f9)), closes [#124](https://github.com/jimsheen/yalc/issues/124)
- Merge pull request #126 from mediaupstream/fix-yalc-cd-space ([86c9bfaf79c5f8672224b343d8760b7f62f148de](https://github.com/jimsheen/yalc/commit/86c9bfaf79c5f8672224b343d8760b7f62f148de)), closes [#126](https://github.com/jimsheen/yalc/issues/126)
- Merge pull request #130 from Keysox/publishScripts ([950edccc77143ed566f989e237cd501cb8adb63e](https://github.com/jimsheen/yalc/commit/950edccc77143ed566f989e237cd501cb8adb63e)), closes [#130](https://github.com/jimsheen/yalc/issues/130)
- Merge pull request #139 from rebolyte/feature/surface-errors ([24dab528307bc936486442b7caffc054647798e2](https://github.com/jimsheen/yalc/commit/24dab528307bc936486442b7caffc054647798e2)), closes [#139](https://github.com/jimsheen/yalc/issues/139)
- Merge pull request #14 from rbrtmrtn/patch-1 ([d9bb37231364a8606c7e2dbc5c35973b63317c9e](https://github.com/jimsheen/yalc/commit/d9bb37231364a8606c7e2dbc5c35973b63317c9e)), closes [#14](https://github.com/jimsheen/yalc/issues/14)
- Merge pull request #141 from leejh3224/should-preserve-indent ([542ea62349fff96a98c510637fcaf3271714dcf2](https://github.com/jimsheen/yalc/commit/542ea62349fff96a98c510637fcaf3271714dcf2)), closes [#141](https://github.com/jimsheen/yalc/issues/141)
- Merge pull request #147 from rmjohnson/fix-quiet-typo ([e91050a8ab97648641035c1eb0d3b6f3e818882b](https://github.com/jimsheen/yalc/commit/e91050a8ab97648641035c1eb0d3b6f3e818882b)), closes [#147](https://github.com/jimsheen/yalc/issues/147)
- Merge pull request #150 from javier-garcia-meteologica/workspace_protocol_resolution ([04eec1060ab71c6b83966ae89488b2c6b445ac57](https://github.com/jimsheen/yalc/commit/04eec1060ab71c6b83966ae89488b2c6b445ac57)), closes [#150](https://github.com/jimsheen/yalc/issues/150)
- Merge pull request #163 from javier-garcia-meteologica/workspace_version_aliases ([6dae40706a5211623f6417b651acbdc16925efcc](https://github.com/jimsheen/yalc/commit/6dae40706a5211623f6417b651acbdc16925efcc)), closes [#163](https://github.com/jimsheen/yalc/issues/163) [#162](https://github.com/jimsheen/yalc/issues/162)
- Merge pull request #218 from matthias-ccri/patch-1 ([3b834e488837e87df47414fd9917c10f07f0df08](https://github.com/jimsheen/yalc/commit/3b834e488837e87df47414fd9917c10f07f0df08)), closes [#218](https://github.com/jimsheen/yalc/issues/218)
- Merge pull request #30 from greyepoxy/remove-unused-imports ([c45a0d47269712f83bb61b3d1b757ff96401cf1b](https://github.com/jimsheen/yalc/commit/c45a0d47269712f83bb61b3d1b757ff96401cf1b)), closes [#30](https://github.com/jimsheen/yalc/issues/30)
- Merge pull request #31 from greyepoxy/fix-sig-in-tests ([cadf028b37be39b9de991847bd64d44fabdecf0a](https://github.com/jimsheen/yalc/commit/cadf028b37be39b9de991847bd64d44fabdecf0a)), closes [#31](https://github.com/jimsheen/yalc/issues/31)
- Merge pull request #33 from strothj/patch-1 ([4b0b646a5b5eb65182c494c60a377ca332cf5e56](https://github.com/jimsheen/yalc/commit/4b0b646a5b5eb65182c494c60a377ca332cf5e56)), closes [#33](https://github.com/jimsheen/yalc/issues/33)
- Merge pull request #40 from greyepoxy/no-hanging-promises-2 ([4a1f6b33cd85cf90b40b7b380276fb4343c6cccb](https://github.com/jimsheen/yalc/commit/4a1f6b33cd85cf90b40b7b380276fb4343c6cccb)), closes [#40](https://github.com/jimsheen/yalc/issues/40)
- Merge pull request #41 from greyepoxy/add-auto-formatting ([47e20df3ffff3a84a32c332580a3617866376b72](https://github.com/jimsheen/yalc/commit/47e20df3ffff3a84a32c332580a3617866376b72)), closes [#41](https://github.com/jimsheen/yalc/issues/41)
- Merge pull request #42 from chocolateboy/patch-1 ([3dda69d3a037fdc89cb71a1d3091017219d3412f](https://github.com/jimsheen/yalc/commit/3dda69d3a037fdc89cb71a1d3091017219d3412f)), closes [#42](https://github.com/jimsheen/yalc/issues/42)
- Merge pull request #43 from igrayson/igrayson/npm-packlist ([4876c50c7b06a0e5a17943ec3a23df021fbb6c54](https://github.com/jimsheen/yalc/commit/4876c50c7b06a0e5a17943ec3a23df021fbb6c54)), closes [#43](https://github.com/jimsheen/yalc/issues/43)
- Merge pull request #44 from maggieneterval/fix-spelling-in-push-cmd ([040538d73fa0aea51dfa022aeae4e095d911b19b](https://github.com/jimsheen/yalc/commit/040538d73fa0aea51dfa022aeae4e095d911b19b)), closes [#44](https://github.com/jimsheen/yalc/issues/44)
- Merge pull request #57 from aleclarson/patch-1 ([c5a9a2f9624c837c59507a418a817c052d46c7b1](https://github.com/jimsheen/yalc/commit/c5a9a2f9624c837c59507a418a817c052d46c7b1)), closes [#57](https://github.com/jimsheen/yalc/issues/57)
- Merge pull request #6 from svicalifornia/patch-1 ([cde54c9c990d78e3997c20306f2344c9021a7f7d](https://github.com/jimsheen/yalc/commit/cde54c9c990d78e3997c20306f2344c9021a7f7d)), closes [#6](https://github.com/jimsheen/yalc/issues/6)
- Merge pull request #61 from aleclarson/bin ([e39b0cd54792ff65923645b604a604f6d65d661f](https://github.com/jimsheen/yalc/commit/e39b0cd54792ff65923645b604a604f6d65d661f)), closes [#61](https://github.com/jimsheen/yalc/issues/61)
- Merge pull request #71 from ndresx/fix-readme ([be74eae54293b8605ef0c2a044506932fa546dd1](https://github.com/jimsheen/yalc/commit/be74eae54293b8605ef0c2a044506932fa546dd1)), closes [#71](https://github.com/jimsheen/yalc/issues/71)
- Merge pull request #82 from cristianl/pr-readme-unpublish ([e463343f72939cc9069e112ebfa0e32065beb3df](https://github.com/jimsheen/yalc/commit/e463343f72939cc9069e112ebfa0e32065beb3df)), closes [#82](https://github.com/jimsheen/yalc/issues/82)
- Merge pull request #86 from atomicpages/master ([af016c058fc11487499ee268cdf857b12f175096](https://github.com/jimsheen/yalc/commit/af016c058fc11487499ee268cdf857b12f175096)), closes [#86](https://github.com/jimsheen/yalc/issues/86) [#85](https://github.com/jimsheen/yalc/issues/85)
- Merge pull request #93 from matthiasdailey-ccri/master ([99e2ddc745a5224fc2136a5c4f8795e906d013a1](https://github.com/jimsheen/yalc/commit/99e2ddc745a5224fc2136a5c4f8795e906d013a1)), closes [#93](https://github.com/jimsheen/yalc/issues/93)
- meta ([8b17ff53c5b6dfbea55a3d55737a50ca73de09e2](https://github.com/jimsheen/yalc/commit/8b17ff53c5b6dfbea55a3d55737a50ca73de09e2))
- mocha to dev deps ([1cf86145a98ff5fc06b6276ed0028b4a64926f24](https://github.com/jimsheen/yalc/commit/1cf86145a98ff5fc06b6276ed0028b4a64926f24))
- move dep-package to test, remove tmp ([b94ec8a0b3c17d75307b30f7b68370150bfbab72](https://github.com/jimsheen/yalc/commit/b94ec8a0b3c17d75307b30f7b68370150bfbab72))
- move publish ([ace163dd772cd0d7c9d4e9186fcb47be6088c6c2](https://github.com/jimsheen/yalc/commit/ace163dd772cd0d7c9d4e9186fcb47be6088c6c2))
- move test to root ([3d101fd18cc8c61fdb2d85ef58d9b69fe25df0e2](https://github.com/jimsheen/yalc/commit/3d101fd18cc8c61fdb2d85ef58d9b69fe25df0e2))
- move to separate files add/update ([b5ac181e1050819b72800c339647546defdb86ea](https://github.com/jimsheen/yalc/commit/b5ac181e1050819b72800c339647546defdb86ea))
- Moving polyfill ([a9e77419064199b178aab0f7c46de285bde7facf](https://github.com/jimsheen/yalc/commit/a9e77419064199b178aab0f7c46de285bde7facf))
- pre.28, notion about running yarn/npm ([c2891fd4254653c0b7ddd32c4a168ac89829aaa8](https://github.com/jimsheen/yalc/commit/c2891fd4254653c0b7ddd32c4a168ac89829aaa8))
- Prevent removing .yalc folder ([a71b4e824ed866b2b31a1d60a3672f9c551b929b](https://github.com/jimsheen/yalc/commit/a71b4e824ed866b2b31a1d60a3672f9c551b929b))
- publish now runs all of the lifecycle scripts it finds ([f4526fedf9775e32affb20e56c818083c5a5ecf6](https://github.com/jimsheen/yalc/commit/f4526fedf9775e32affb20e56c818083c5a5ecf6)), closes [#129](https://github.com/jimsheen/yalc/issues/129)
- read package manifest on copy (#157) ([64f580ef4d37dfbc5e3b5ebffed55f5e7b5207c9](https://github.com/jimsheen/yalc/commit/64f580ef4d37dfbc5e3b5ebffed55f5e7b5207c9)), closes [#157](https://github.com/jimsheen/yalc/issues/157)
- readme fixes ([58b21ba8f80700f18d53475b461c2c51efa535b9](https://github.com/jimsheen/yalc/commit/58b21ba8f80700f18d53475b461c2c51efa535b9))
- readme log updates ([45b27ea68bc898ffcacdc5a5485fe2446a064481](https://github.com/jimsheen/yalc/commit/45b27ea68bc898ffcacdc5a5485fe2446a064481))
- Refactor code structure for improved readability and maintainability ([5fed4803c7223cb20629a8b4633edd53e3e36b12](https://github.com/jimsheen/yalc/commit/5fed4803c7223cb20629a8b4633edd53e3e36b12))
- Refactor code structure for improved readability and maintainability ([966a3c83076c553bd60e658422aec1a8badb659a](https://github.com/jimsheen/yalc/commit/966a3c83076c553bd60e658422aec1a8badb659a))
- Refactor tests to use Vitest framework and improve baseline capture functionality ([35647f727ae21f9b2b12890758f555c8b432c5a9](https://github.com/jimsheen/yalc/commit/35647f727ae21f9b2b12890758f555c8b432c5a9))
- remote postupdate mention ([fdfc4d768117d0b3c247e537a7804b2d979a72ad](https://github.com/jimsheen/yalc/commit/fdfc4d768117d0b3c247e537a7804b2d979a72ad))
- remove .yalc folder from ignored ([11e0dd74ef6c666327d31e73909dfca82b4d22f4](https://github.com/jimsheen/yalc/commit/11e0dd74ef6c666327d31e73909dfca82b4d22f4))
- remove `--force` flag ([44c3e5fe84d98d31ab75e206910683e1f488b0aa](https://github.com/jimsheen/yalc/commit/44c3e5fe84d98d31ab75e206910683e1f488b0aa))
- remove annoying dont forget ([f2bf1872276f06e87521158817d0bc867379ebdf](https://github.com/jimsheen/yalc/commit/f2bf1872276f06e87521158817d0bc867379ebdf))
- remove console output ([b5dd11c529fc10c1f91763dcd8fe29359582abbe](https://github.com/jimsheen/yalc/commit/b5dd11c529fc10c1f91763dcd8fe29359582abbe))
- remove dev and peer workspace deps ([17c991af3fbdfa47722907d6c28d1cfb9854fe92](https://github.com/jimsheen/yalc/commit/17c991af3fbdfa47722907d6c28d1cfb9854fe92))
- remove docs about knitting from readme ([8d410849d439502d53dc9c04e400118b57b07c6b](https://github.com/jimsheen/yalc/commit/8d410849d439502d53dc9c04e400118b57b07c6b))
- remove empty directories why sync dir copy ([0e812f840c553345f19a1a43addf8c21405d20db](https://github.com/jimsheen/yalc/commit/0e812f840c553345f19a1a43addf8c21405d20db))
- Remove knit completly ([4c60fcf630f71cd2e553846d902a673e88582f4e](https://github.com/jimsheen/yalc/commit/4c60fcf630f71cd2e553846d902a673e88582f4e))
- remove lockfile and .yalc folder if empty ([57b092ad726907c9232208f4fa758b7b23da87b6](https://github.com/jimsheen/yalc/commit/57b092ad726907c9232208f4fa758b7b23da87b6))
- remove NB notice about running pm ([592c9c58a74cc0d4e865a2d1bcd43700d2051a07](https://github.com/jimsheen/yalc/commit/592c9c58a74cc0d4e865a2d1bcd43700d2051a07))
- remove pack ([9f789be33fa812aca8cae0113b0ec1953c9a2928](https://github.com/jimsheen/yalc/commit/9f789be33fa812aca8cae0113b0ec1953c9a2928))
- remove prepush test ([52c4eaed99da202def294c2ce10934b5c570d13c](https://github.com/jimsheen/yalc/commit/52c4eaed99da202def294c2ce10934b5c570d13c))
- remove ref to Node.Global (fixes #151) ([d327ed9cf1701aa8922b5f85930fbfa2c7cacdc0](https://github.com/jimsheen/yalc/commit/d327ed9cf1701aa8922b5f85930fbfa2c7cacdc0)), closes [#151](https://github.com/jimsheen/yalc/issues/151)
- remove removes from .yalc and node_modules ([8a6fe41a22a91869dc12a4a14900d0830bb2f9f8](https://github.com/jimsheen/yalc/commit/8a6fe41a22a91869dc12a4a14900d0830bb2f9f8))
- remove unintended formatting ([af28571349d26b4394e763987bbe5f477cad70b2](https://github.com/jimsheen/yalc/commit/af28571349d26b4394e763987bbe5f477cad70b2))
- remove unintended formatting ([03294bd4caa46ceb4a65a17f86799d4d880200c0](https://github.com/jimsheen/yalc/commit/03294bd4caa46ceb4a65a17f86799d4d880200c0))
- remove unintended formatting ([b504ec494459e5f5ab3736d0e84a5a469f3c9549](https://github.com/jimsheen/yalc/commit/b504ec494459e5f5ab3736d0e84a5a469f3c9549))
- rename to yalc ([bcecd76f172dba85874e213ae466944c133638c7](https://github.com/jimsheen/yalc/commit/bcecd76f172dba85874e213ae466944c133638c7))
- replace `files` flag with `content` ([12e3ef38fb4d03389c07baa8060584ec1e7ea176](https://github.com/jimsheen/yalc/commit/12e3ef38fb4d03389c07baa8060584ec1e7ea176))
- Reverted line change ([fd8f27e39a5def1229a92428edc868ce8f9b9ff9](https://github.com/jimsheen/yalc/commit/fd8f27e39a5def1229a92428edc868ce8f9b9ff9))
- Run 'prepublishOnly' script during 'yalc publish' ([65167fbe251f3e3408049335310c3446a77e75b3](https://github.com/jimsheen/yalc/commit/65167fbe251f3e3408049335310c3446a77e75b3))
- Run prepack before `publish` ([57316edb400ae42f15b145ff00af15047d5f3eec](https://github.com/jimsheen/yalc/commit/57316edb400ae42f15b145ff00af15047d5f3eec))
- script and colors ([6fc6847b566fd10467fc674455a31c88f2ea1ab2](https://github.com/jimsheen/yalc/commit/6fc6847b566fd10467fc674455a31c88f2ea1ab2))
- set publish date in changelog ([1ce77cad8f568ab0066a73e53d0da6ab645005b8](https://github.com/jimsheen/yalc/commit/1ce77cad8f568ab0066a73e53d0da6ab645005b8))
- settings cleanup ([eac2c22b78c15540a11dd6a44ce70d303994898d](https://github.com/jimsheen/yalc/commit/eac2c22b78c15540a11dd6a44ce70d303994898d))
- skip publishing non-code files ([f4f97fac159329bac8ef36c2a920211a8736c4ab](https://github.com/jimsheen/yalc/commit/f4f97fac159329bac8ef36c2a920211a8736c4ab))
- SMall fixes ([701069e77b73d5fc15d24fb9b37e000eab908060](https://github.com/jimsheen/yalc/commit/701069e77b73d5fc15d24fb9b37e000eab908060))
- small refactor ([58895b60e97f4866f05029e509914a67c76ada7b](https://github.com/jimsheen/yalc/commit/58895b60e97f4866f05029e509914a67c76ada7b))
- sort dependencies ([8b8eac19bd588966cbc8ecd8f79eced8d656449d](https://github.com/jimsheen/yalc/commit/8b8eac19bd588966cbc8ecd8f79eced8d656449d))
- store/packages folder ([2474a8a38e3d3d2380853680d8ac1b8d7815510f](https://github.com/jimsheen/yalc/commit/2474a8a38e3d3d2380853680d8ac1b8d7815510f))
- support rcfile config ([0c0ad7787e1d73e50aece1f9f3e2b4be211a1d54](https://github.com/jimsheen/yalc/commit/0c0ad7787e1d73e50aece1f9f3e2b4be211a1d54))
- support workspace: resolution ([849f8ccac2b4b793bf01f9470444a22119161b18](https://github.com/jimsheen/yalc/commit/849f8ccac2b4b793bf01f9470444a22119161b18))
- surface errors from child processes ([5022f0fdb7866dc43536de5090d91814ede1fc44](https://github.com/jimsheen/yalc/commit/5022f0fdb7866dc43536de5090d91814ede1fc44))
- test's .gitignore notice ([9c9f6e031116de4a1d3bbd32f9d1e40a86e4cce9](https://github.com/jimsheen/yalc/commit/9c9f6e031116de4a1d3bbd32f9d1e40a86e4cce9))
- tests skeleton ([7f9e59ba301b31baa37064a7f144ed4798732330](https://github.com/jimsheen/yalc/commit/7f9e59ba301b31baa37064a7f144ed4798732330))
- type fix ([2a5ad1c03902d49fc7a0399fe1f43a9205e7bff9](https://github.com/jimsheen/yalc/commit/2a5ad1c03902d49fc7a0399fe1f43a9205e7bff9))
- upadate change log ([898cb7cc20b637495f66ea70dc39e2984443f250](https://github.com/jimsheen/yalc/commit/898cb7cc20b637495f66ea70dc39e2984443f250))
- update and push ([d85eca8d58a962e1404fbfe1eff7a019e91abad0](https://github.com/jimsheen/yalc/commit/d85eca8d58a962e1404fbfe1eff7a019e91abad0))
- update change log ([417234aec9e290305cdbc9b0e57eccf988c781c6](https://github.com/jimsheen/yalc/commit/417234aec9e290305cdbc9b0e57eccf988c781c6))
- update changedlog and version ([df71d4cc7d2ef4d269fb1e56d7e171824f9d8e2e](https://github.com/jimsheen/yalc/commit/df71d4cc7d2ef4d269fb1e56d7e171824f9d8e2e))
- update changelog ([8c1e6855a3fb7a8d0316cd5db0c6cba0b4d65a82](https://github.com/jimsheen/yalc/commit/8c1e6855a3fb7a8d0316cd5db0c6cba0b4d65a82))
- update changelog ([777939f72a502b047950fc9dce2824cf09dd62c5](https://github.com/jimsheen/yalc/commit/777939f72a502b047950fc9dce2824cf09dd62c5))
- update changelog ([e54f0e5cb676d2bd00747320d52f9ce457e4bb77](https://github.com/jimsheen/yalc/commit/e54f0e5cb676d2bd00747320d52f9ce457e4bb77))
- update changelog/version ([728426f0abee552bb9b6a313a3b7a3c8a1fc5368](https://github.com/jimsheen/yalc/commit/728426f0abee552bb9b6a313a3b7a3c8a1fc5368))
- update npm-packlist, sort content ([ff35865652f54519d4f6da101c83c43c2277b268](https://github.com/jimsheen/yalc/commit/ff35865652f54519d4f6da101c83c43c2277b268))
- update package.json version ([3690d40f2ad3a8be9679abd19f96f6524bd70ee2](https://github.com/jimsheen/yalc/commit/3690d40f2ad3a8be9679abd19f96f6524bd70ee2))
- update readme ([03cccc27e10afcbd580692201bc965dd22748434](https://github.com/jimsheen/yalc/commit/03cccc27e10afcbd580692201bc965dd22748434))
- update readme ([8e37e081891082e928b80be4a24705c1e4f677a1](https://github.com/jimsheen/yalc/commit/8e37e081891082e928b80be4a24705c1e4f677a1))
- update readme ([678e774ee73b3dc14265d706826fb3007e56a22b](https://github.com/jimsheen/yalc/commit/678e774ee73b3dc14265d706826fb3007e56a22b))
- update readme ([229b38c71ebb685b630f5821a443a282e36d479d](https://github.com/jimsheen/yalc/commit/229b38c71ebb685b630f5821a443a282e36d479d))
- update readme ([2a0b74cbbe7f264b9d37c29e48bb68fe07922e3a](https://github.com/jimsheen/yalc/commit/2a0b74cbbe7f264b9d37c29e48bb68fe07922e3a))
- update readme about --store-folder ([a70d42b9cfa10fa3063563d98cee33db1dab80c5](https://github.com/jimsheen/yalc/commit/a70d42b9cfa10fa3063563d98cee33db1dab80c5))
- update readme and version ([5991e2ee10b4fb0c5432b1e1d91d8f0ff0931f91](https://github.com/jimsheen/yalc/commit/5991e2ee10b4fb0c5432b1e1d91d8f0ff0931f91))
- Update readme regarding npm/yarn ([830cb17ff8150e63423472963b4f9c6285d10de6](https://github.com/jimsheen/yalc/commit/830cb17ff8150e63423472963b4f9c6285d10de6))
- Update README.md ([af67e71f22ba747f037d18045277742ea5059c78](https://github.com/jimsheen/yalc/commit/af67e71f22ba747f037d18045277742ea5059c78))
- Update README.md ([5b02d4a3bca369745b62cbe9d3a1e536a13e353c](https://github.com/jimsheen/yalc/commit/5b02d4a3bca369745b62cbe9d3a1e536a13e353c))
- Update README.md ([f4209fb23c391ce4d8a2c4720a26ff053d6838c7](https://github.com/jimsheen/yalc/commit/f4209fb23c391ce4d8a2c4720a26ff053d6838c7))
- update readme/changelog ([de4a152f208b77c5ac96e4baaba057443c5446fe](https://github.com/jimsheen/yalc/commit/de4a152f208b77c5ac96e4baaba057443c5446fe))
- update travis node_js versions ([a237f63644e71c8bd7e5963115832c1fb09cc5f4](https://github.com/jimsheen/yalc/commit/a237f63644e71c8bd7e5963115832c1fb09cc5f4))
- update travis version ([e17e595334a32f17366b05c4e550f48c15d55cfd](https://github.com/jimsheen/yalc/commit/e17e595334a32f17366b05c4e550f48c15d55cfd))
- update version ([45efc9ef896afcedc926ebb09c585cfa501b612c](https://github.com/jimsheen/yalc/commit/45efc9ef896afcedc926ebb09c585cfa501b612c))
- update version ([f37366b22abb18cc34feb9206d64b4a4d80d754a](https://github.com/jimsheen/yalc/commit/f37366b22abb18cc34feb9206d64b4a4d80d754a))
- update version ([2ea164d5d10f2e56b14b4ac402d17979af950100](https://github.com/jimsheen/yalc/commit/2ea164d5d10f2e56b14b4ac402d17979af950100))
- update version ([58efe569bd136ba077a79ba0484796e67165e2b3](https://github.com/jimsheen/yalc/commit/58efe569bd136ba077a79ba0484796e67165e2b3))
- update version ([ca6a12f1e7bcb775f949d0ca4b2c9429354de6e9](https://github.com/jimsheen/yalc/commit/ca6a12f1e7bcb775f949d0ca4b2c9429354de6e9))
- update version ([de175f8adffbed81b3ab0c19acbe437c7907aa18](https://github.com/jimsheen/yalc/commit/de175f8adffbed81b3ab0c19acbe437c7907aa18))
- Update version ([7c224ed6f3226b057f27dd243f74a9eb3dfb851a](https://github.com/jimsheen/yalc/commit/7c224ed6f3226b057f27dd243f74a9eb3dfb851a))
- update yargs verision fixes #142 ([bf1cb41d91ee6f5c41b66ec3d77f3086208b7da7](https://github.com/jimsheen/yalc/commit/bf1cb41d91ee6f5c41b66ec3d77f3086208b7da7)), closes [#142](https://github.com/jimsheen/yalc/issues/142)
- update yargs, default command ([8812883e2baff923e26877a4d8ec5b40d631cb4d](https://github.com/jimsheen/yalc/commit/8812883e2baff923e26877a4d8ec5b40d631cb4d))
- upgrade npm-packlist to v2 ([fda95441d383da64044a03b18931ebc061713416](https://github.com/jimsheen/yalc/commit/fda95441d383da64044a03b18931ebc061713416))
- use .gitignore if no `files` entry in manifest ([9b7bafbca56a2222afb81e3f31964931534c9f36](https://github.com/jimsheen/yalc/commit/9b7bafbca56a2222afb81e3f31964931534c9f36))
- version sig semver metadata fromat ([854c499f505ec3da35c21f659eb316732bea94e6](https://github.com/jimsheen/yalc/commit/854c499f505ec3da35c21f659eb316732bea94e6))
- verson pre.14 ([1b90697886d55cd002e78890d4b6bb1ba4ca383c](https://github.com/jimsheen/yalc/commit/1b90697886d55cd002e78890d4b6bb1ba4ca383c))
- workspace flag ([674dbe708376ce251800dad6b928aa4fa858d887](https://github.com/jimsheen/yalc/commit/674dbe708376ce251800dad6b928aa4fa858d887))
- workspace version aliases (#162) ([bdb3cb7c297e60e3bc99c1432c41cd5cd30b12f3](https://github.com/jimsheen/yalc/commit/bdb3cb7c297e60e3bc99c1432c41cd5cd30b12f3)), closes [#162](https://github.com/jimsheen/yalc/issues/162)
- dev: use pretty-quick ([c7209840496f893e279a11b893b4ce0b1069b8c6](https://github.com/jimsheen/yalc/commit/c7209840496f893e279a11b893b4ce0b1069b8c6))
- style: add auto formatter and format everything ([936711d9637e4a6879deb524879b506610581dd8](https://github.com/jimsheen/yalc/commit/936711d9637e4a6879deb524879b506610581dd8))
- test: fix timing issue in new test ([c1c4c65bb317391e3d00ff5ed2d36b873085983c](https://github.com/jimsheen/yalc/commit/c1c4c65bb317391e3d00ff5ed2d36b873085983c))
- test: validate sig across test run instead of against checked in hash ([0ca4799d7005c8c7f40ed9dc66e1e63775c5a7e7](https://github.com/jimsheen/yalc/commit/0ca4799d7005c8c7f40ed9dc66e1e63775c5a7e7))
- REFACTOR: vscode - remove unused imports, assignments, and parameters ([efd085f60bb0efedb5ff7521c170ac5b7256dcb7](https://github.com/jimsheen/yalc/commit/efd085f60bb0efedb5ff7521c170ac5b7256dcb7))
- travis: remove bundler ([c7af9910ed3032aa567e804812f44a462ae0cb3a](https://github.com/jimsheen/yalc/commit/c7af9910ed3032aa567e804812f44a462ae0cb3a))
- travis: remove sudo ([edfd2b2e636329b598ccdea8b42bb0fb6d5a4026](https://github.com/jimsheen/yalc/commit/edfd2b2e636329b598ccdea8b42bb0fb6d5a4026))

### BREAKING CHANGE

- Replaced separate CI and Release workflows with unified CI/CD pipeline

Benefits:

- 40% faster releases (eliminate redundant 2min rebuild)
- Artifact reuse ensures build consistency between test and release
- Parallel job execution (test matrix + security audit)
- Simplified maintenance (single workflow vs two)
- Better resource utilization and cost efficiency

Changes:

- Remove .github/workflows/ci.yml and .github/workflows/release.yml
- Add .github/workflows/ci-cd.yml with optimized job dependencies
- Build artifacts uploaded/downloaded to prevent environment drift
- Conditional release only on main branch with proper permissions
- Enhanced dry-run capabilities for safer release testing
- Maintain all existing features: multi-node testing, security audit, provenance

Architecture:

- Build once → Test everywhere → Release with same artifacts
- PR: build→test→security (no release)
- Main: build→test→security→release→provenance
- Manual: build→test→security→dry-run

# Yalc changelog

## 1.0.0.pre.54 (Unreleased)

- fix default pure add in workspaces (regression)
- BREAKING: remove `files` flag
- add `content` flag (instead of `files`)

## 1.0.0.pre.53 (2021-04-28)

- support ^/~/\* workspace package resolution while publish

## 1.0.0.pre.52 (2021-04-28)

- fix/workaround @scoped root dir names bug (in npm-packlist)

## 1.0.0.pre.51 (2021-04-23)

- BREAKING (shock!): version signature (adding build meta to pkg version) is turned off by default (use explicit `--sig`)
- link `.bin` scripts only when `yalc link` or `yalc add --link`
- read package manifest after running pre-script while publish
- add `-W` flag to add with `workspace:` protocol
- fix `--scripts` flag
- upgrade npm-packlist to v2

## 1.0.0.pre.50 (2021-01-19)

- add `restore` package operation after `retreat`
- add resolution of `workspace:` protocol by default (`--no-workspace-resolve` to avoid)
- add support for .yalcrc file (ini format)

## 1.0.0.pre.49 (2020-12-17)

- fix `--quiet` option name typing
- fix removing multiple packages

## 1.0.0.pre.48 (2020-12-10)

- add `update` (`upgrade`, `up`) flag to run PM's package update command on add/update/publish/push
- remove `yarn`, `npm` flags

## 1.0.0.pre.47 (2020-11-20)

- update `yargs` package version

## 1.0.0.pre.46 (2020-11-18)

- dev-mod flag (use --no-dev-mod not to remove devDependencies)
- use `detect-indent` whn modifying `package.json`

## 1.0.0.pre.45 (2020-09-30)

- remove `--force` flag
- surface STDOUT/STDERR of execSync

## 1.0.0.pre.44 (2020-09-18)

- fix removing scoped package folder

## 1.0.0.pre.43 (2020-09-17)

- try/catch for ensuring symlink when modifying bin permissions
- add signature (`yalcSig` key) to published package.json
- add `--no-scripts` to publish/push without running scripts
- add `-W` (workspaces) as alias for `--no-pure`
- prevent removing .yalc folder if something else exists there

## 1.0.0.pre.42 (2020-08-17)

- replace pre/postyalc scripts with pre/postyalcpublish
- execute pre/postyalc scripts in target package/project on add/update
- added `--quite` f to disabled output (except of errors)
- added colored output can be disabled `--no-color`
- fixed removing installations
- fixed running pm scripts

## 1.0.0.pre.41 (2020-08-06)

- add quotes around workingDir
- try/catch when modifying bin permissions

## 1.0.0.pre.40 (2020-07-24)

- remove empty directories why sync dir copy

## 1.0.0.pre.39 (2020-07-24)

- `yalc publish` now runs all of the lifecycle scripts it finds

## 1.0.0.pre.38 (2020-07-23)

- use `--pure` flag with workspaces by default
- add check for PNPM workspace for `--pure` flag

## 1.0.0.pre.37 (2020-07-05)

- allow using `--pure` flag without `workspaces`
- `--replace` flag to force replacement of content while adding/pushing package

## 1.0.0.pre.36 (2020-06-14)

- change version signature to semver metadata format (from - to +) - https://semver.org/#spec-item-10

- removed `don't forget to update/install deps` message

## 1.0.0.pre.35 (2020-01-16)

- fix --pure flag usage

## 1.0.0.pre.34 (2019-08-27)

- added `--store-folder` to override default global package store folder

## 1.0.0.pre.33 (2019-08-15)

- added lifecycle scripts, like `prepack`

## 1.0.0.pre.30 (2019-06-05)

- fix copy method

## 1.0.0.pre.29 (2019-06-03)

- new safe copy method

## 1.0.0.pre.28 (2019-05-26)

- updates .bin scripts with permissions

## 1.0.0.pre.26 (2018-12-24)

- `prepare` script
- `--private` flag to publish `private` package
- `--version` flag
- fix of `npm-packlist` that may not include nested `package.json`

## 1.0.0.pre.25 (2018-12-14)

- `--pure` flag, yarn `workspaces` support
- `--changed` option, publish/push only if package content changed
- remove `devDependencies` from published content
- `--files` option

## 1.0.0.pre.24 (2018-11-23)

- `postupdate` script on `update` (and `push`)
- new file inclusion algorithm with `npm-packlist`
- `.yalcignore` added
- installations `show/clean` commmand

## 1.0.0.pre.16 (2018-01-02)

- fix package deps
- fix `--link` removal

## 1.0.0.pre.15 (2017-12-30)

- run prepblushOnly script on publish
- fixed `darwin` os support
- fixed linking EPERM
- added `--link` option to `add` command for adding `link:` deps

## 1.0.0.pre.14 (2017-12-15)

- fix: remove package dir from node_modules only if needed

## 1.0.0.pre.13 (2017-11-22)

- fix: remove .yalc folder from ignored

## 1.0.0.pre.12 (2017-10-24)

- update `fs-extra`
- fix #7

## 1.0.0.pre.11 (2017-06-09)

- fixed include rules for `folder/file`

## 1.0.0.pre.10 (2017-05-27)

- fixed `--all` option for `retreat` command
- fixed #3 `yarn` absence error output

## 1.0.0.pre.9 (2017-05-21)

- added hash signature
- no default command
- fixed not-exiting package removal
- added `--all` option for `remove`
- handle unknown command

## 1.0.0.pre.8 (2017-05-25)

- fix copy if no `files` in manifest defined

## 1.0.0.pre.7 (2017-05-11)

- fixes `files` inclusion (#2)

## 1.0.0.pre.6 (2017-05-09)

- fixed `yarn.lock` bug

## 1.0.0.pre.5 (2017-05-07)

- copy to dest package dir not removing inner `node_modules`

## 1.0.0.pre.4 (2017-05-02)

- do not publish standard non-code files (README, LICENCE, etc.)
- remove lockfile and .yalc dir if empty

## 1.0.0.pre.3 (2017-04-28)

- use .gitignore if no `files` entry in manifest

## 1.0.0.pre.2 (2017-04-26)

- `remove` removes from `.yalc` and `node_modules`
- fixed installtion file write bug when publish
- handle `files` field in manifest

## 1.0.0.pre.1 (2017-04-25)

- fixed installation file first read
- `check` command
- `remove` and `retreat` commands

## 1.0.0.pre.0 (2017-04-23)

- publish, push, add, update
