# Source Analysis Action

This repository provides a GitHub action which is used to analyse the usage of Source in a project.

## Tasks

-   [Measure component usage](#component-usage)
-   [TODO] Check installed packages
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

## Component Usage

This part of the action uses [react-scanner](https://github.com/moroshko/react-scanner) to discover which Source components have been used, how many times and what props are utilised. The results are written out to the `.source/output/component-usage.json` file.
