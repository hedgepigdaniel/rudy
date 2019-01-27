#!/usr/bin/env bash

# Test if we are running on a push build (not a PR) and prepare for a release
if [ -z "$TRAVIS_PULL_REQUEST_BRANCH" ]; then

  # By default travis uses deteached HEAD - switch to the branch itself
  git checkout "$TRAVIS_BRANCH";

  # Assert that the branch HEAD is the intended commit for this job
  test $(git rev-list HEAD --max-count=1) == "$TRAVIS_COMMIT"

  # Decrypt the github deploy key and set it as the default key
  openssl aes-256-cbc -K $encrypted_64b59bdd3d91_key -iv $encrypted_64b59bdd3d91_iv -in github_deploy_key.enc -out github_deploy_key -d
  chmod 600 github_deploy_key
  eval $(ssh-agent -s)
  ssh-add github_deploy_key

  # Set the git remtoe url to use SSH so that the deploy key is usable
  git remote set-url origin "git@github.com:${TRAVIS_REPO_SLUG}.git"

  # Put the NPM token in .npmrc so that it is usable
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
fi;
