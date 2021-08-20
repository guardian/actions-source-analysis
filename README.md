# Source Analysis Action

**🚨 This repository is still under development and is not yet ready for consumption 🚨**

This repository provides a GitHub action which is used to analyse the usage of Source in a project.

## Tasks

-   [Measure component usage](#component-usage)
-   [Package usage](#package-usage)
-   [TODO] Warn if packages not the same version
-   [TODO] Check if the project has any local components that share names with Source components

## Use

To use this action, add a workflow file to your project which references the action in a `uses` statement. Following that step, you should also use the `actions/upload-artifact` action to upload the contents of the `.source/output` directory. For example:

```yaml
// .gitub/workflows/source.yaml

name: Source Analysis
on:
  push:
    branches:
      - main
jobs:
  source:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: guardian/actions-setup-node@main
      - uses: guardian/actions-source-analysis@main
      - uses: actions/upload-artifact@v2
        with:
          name: source-analysis
          path: .source/output/

```

For a working example, see the [test-source-project](https://github.com/guardian/test-source-project) repository.

## Component Usage

This part of the action uses [react-scanner](https://github.com/moroshko/react-scanner) to discover which Source components have been used, how many times and what props are utilised. The results are written out to the `.source/output/component-usage.json` file. The following represents an example output:

```json
{
    "@guardian/src-radio/Radio": {
        "instances": 3,
        "props": {
            "label": 3,
            "supporting": 3,
            "value": 3,
            "defaultChecked": 1
        }
    },
    "@guardian/src-layout/Container": {
        "instances": 2,
        "props": {}
    }
}
```

## Package Usage

This part of the action compares the packages found by [react-scanner](https://github.com/moroshko/react-scanner) when discovering component use with the ones defined in the `dependencies` section of the `package.json`. It outputs:

-   A list of the packages used in the project
-   A list of the unused packages (from comparing the used list to everything in the `package.json`)
-   A object mapping the installed packages to the version string defined in the `package.json`

This output is written to `.source/outputs/package.json`. The following represents an example output:

```json
{
    "usedPackages": [
        "@guardian/src-radio",
        "@guardian/src-layout",
        "@guardian/src-brand",
        "@guardian/src-footer",
        "@guardian/src-link"
    ],
    "unusedPackages": [
        "@guardian/src-button",
        "@guardian/src-icons",
        "@guardian/src-user-feedback"
    ],
    "packageVersions": {
        "@guardian/src-brand": "^3.8.0",
        "@guardian/src-button": "^3.8.0",
        "@guardian/src-footer": "^3.8.0",
        "@guardian/src-foundations": "^3.8.0",
        "@guardian/src-icons": "^3.8.0",
        "@guardian/src-layout": "^3.4.0",
        "@guardian/src-link": "^3.8.0",
        "@guardian/src-radio": "^3.8.0",
        "@guardian/src-user-feedback": "^3.8.0"
    }
}
```
