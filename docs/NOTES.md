# Goal

modern yalc package with enhancements for better developer experience and usability.

- pnpm support for monorepos using pnpm catalog
- improved CLI with additional commands and options
- better handling of dependencies and peer dependencies
- enhanced documentation and examples
- github actions for automated publishing and testing
- Typescript
- improved error handling
- improved unit tests and coverage
- conventional commits and automated changelog generation

## Guidelines

- every function should have a comment explaining its purpose and usage JSDOC style
- every unit should have a test in a colocated **tests** folder with {file}.test.ts naming convention
- every function should have it's own file (unless it's a collection of related functions)
- avoid monolithic files
- use async/await for asynchronous operations
- use ES6+ features and syntax
- follow consistent code style and formatting (prettier, eslint)
- write clear and concise commit messages
- use meaningful variable and function names
- document any non-obvious decisions or trade-offs in the code comments or documentation

## Ideas

- add a `yalc link-all` command to link all packages in a monorepo
- add a `yalc unlink-all` command to unlink all packages in a monorepo
- add a `yalc status` command to show the status of all linked packages
- add a `yalc outdated` command to check for outdated packages in the yalc store
- add a `yalc clean` command to remove unused packages from the yalc store
- add a `yalc info <package>` command to show detailed information about a package in the yalc store
- add support for custom hooks to run scripts before/after certain yalc commands
- add a `yalc publish --watch` option to automatically republish on file changes
- improve the handling of peer dependencies when linking packages
- add a `yalc doctor` command to check for common issues and suggest fixes
- improve the performance of yalc operations for large monorepos
- add a `yalc config` command to manage yalc configuration options
- add a `yalc login` and `yalc logout` command for managing access to private registries
- add a `yalc search <query>` command to search for packages in the yalc store
- add a `yalc diff <package>` command to show differences between the local and yalc store versions of a package
- add a `yalc rollback <package>` command to revert to a previous version of a package in the yalc store
- improve the logging and output of yalc commands for better clarity
- add a `yalc help <command>` command to show detailed help for a specific command
- add a `yalc version` command to show the current version of yalc
- add a `yalc changelog` command to generate a changelog for packages in the yalc store
- add a `yalc test <package>` command to run tests for a

I like the idea of when you type `yalc` without args it will either show help or give you options for commands to run. or if you do `yalc add` it will show you options for adding packages from the yalc store. (e.g. multiple selection, search, etc)
