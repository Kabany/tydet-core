# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.0] 2025-04-07
### Updated
* App lifecycle has been updated, now the flow is `beforeMount`, `onMount`, `afterMount`, `beforeRestart`, `onRestart`, `afterRestart`, `beforeEject`, `onEject`, `afterEject`.
* `beforeUnmount` and `onUnmount`are deprecated. These methods are still called on `beforeEject` and `onEject` respectivelly only if the methods are defined. By default the methods are undefined.

## [v1.1.0] 2025-04-02
### Updated
* CoreError prototype is updated, so when catching an error you can compare the error type using the `instanceof` operator.
* Update 'babel' and 'typescript' packages.
### Fixed
* Context error messages

## [v1.0.4] 2024-10-04
* Update 'typescript' repository.

## [v1.0.3] 2024-03-19
### Fix
* Set ErrorCore name explicitly.

## [v1.0.2] 2024-03-11
### Fix
* Set the logger as the last service to unmount.

## [v1.0.1] 2024-02-13
### Fix
* Remove the context argument from the service constructor to the `beforeMount()` method.

## [v1.0.0] 2024-02-09
### Added
* Context and Service as Core Components.