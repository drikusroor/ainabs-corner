---
title: "Where is Gitlab's test coverage parsing setting"
date: "2022-06-23"
categories: 
  - "problems-solutions"
tags: 
  - "gitlab"
  - "regex"
  - "code-coverage"
---

Today, I wanted to set the regular expression for my test coverage results in Gitlab.

According to [Gitlab's documentation](https://docs.gitlab.com/14.10/ee/ci/pipelines/settings.html#add-test-coverage-results-using-project-settings-deprecated), I should be able to do that in the test coverage parsing setting in my project settings, by navigating to `Settings > CI/CD > General pipelines`.

## Problem

However, I could not find the setting there. So where can I set the regular expression for the test coverage parsing setting in Gitlab?

## Solution

Apparently, the test coverage parsing setting has been [deprecated](https://docs.gitlab.com/ee/ci/pipelines/settings.html#add-test-coverage-results-using-project-settings-removed) since Gitlab 14.8 and has been removed since Gitlab 15.0. The setting can therefore no longer be found in `Settings > CI/CD > General pipelines`.

You should now use the coverage setting in your Gitlab CI/CD configuration file and use your regular expression in the setting value:

## Example

```yaml
unit-test:
  stage: test
  coverage: '/coverage: \d+.\d+% of statements/'
  script:
    - go test -cover
```

## See also

[I cannot find Gitlab's test coverage parsing setting in my CI/CD settings (Stackoverflow)](https://stackoverflow.com/q/72735772/4496102)
