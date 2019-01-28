# Publishing new versions

Publishing is done with lerna and is done automatically when new code is pushed
to the master branch.

To cut manual releases (e.g. to manually bump the version on a pre release
branch), you can do the following:

```shell
$ yarn run lerna publish
```

There will be a prompt to confirm the new versions of packages to be published.
Changelogs will automatically be generated and new version numbers chosen based
on the [commit history](./commit-messages.md). See the
[lerna docs](https://github.com/lerna/lerna/tree/master/commands/publish#readme)
for more details such as how to use pre releases, dist tags, etc.
