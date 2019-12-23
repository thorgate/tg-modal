# Contributing

Following the guidelines detailed here help you communicate that you respect the time of the core developers managing and developing this project. In return, they will reciprocate that respect in the form of addressing your issue, reviewing changes, and helping you finalize your pull requests.

How to contribute:

- Create issues
- Add new features with PRs

## Using the issue tracker

The issue tracker is the preferred channel for bug reports, feature requests and submitting pull requests, but please respect the following restrictions:

Please do not derail or troll issues. Keep the discussion on topic and respect the opinions of others.

## Bug reports

A bug is a demonstrable problem that is caused by the code in the repository. Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. Use the GitHub issue search — check if the issue has already been reported.
2. Check if the issue has been fixed — try to reproduce it using the latest master or next branch in the repository.
3. Include your environment information — please answer the following:
   - What browser are you using and what version?
   - What version of tg-modal are you using?
4. Include the replication steps/code — what steps/code reproduces the issue. What do you expect to happen instead? Include a screenshot if the issue is visual.

## Feature requests

If you find yourself wishing for a feature that doesn't exist in tg-modal then feel free to create an issue about it in the issue tracker. The issue should describe the feature you need, why you need it and how it should work. Once you have created an issue wait for a sign-off from one of the maintainers before starting work on it. This makes sure your changes align with the future of the project.

## Contributing code changes

All new features an changes to existing features should be covered by tests.

## Common tasks

### Releasing a new version

1. Make sure that the `version` field under `package.json` is updated
2. Create a new git tag with the same version and push it to repository
   - Alternatively you can also create the tag via [Github](https://github.com/thorgate/tg-modal/releases/new)
3. Travis will now automatically build and publish the new version to npm
4. Make sure to add release notes under [Github releases](https://github.com/thorgate/tg-modal/releases)
