#!/usr/bin/env bash

# Test if we are running on a push build (not a PR)
if [ -n "$TRAVIS_BRANCH" ]; then
  # If so, prepare thigns so taht its possible to push to the branch
  git checkout "$TRAVIS_BRANCH";
  test $(git rev-list HEAD --max-count=1) == "$TRAVIS_COMMIT"
  openssl aes-256-cbc -K $encrypted_64b59bdd3d91_key -iv$encrypted_64b59bdd3d91_iv -in github_deploy_key.enc -out github_deploy_key-d
  chmod 600 github_deploy_key
  eval $(ssh-agent -s)
  ssh-add github_deploy_key
  git remote set-url origin "git@github.com:${TRAVIS_REPO_SLUG}.git"
fi;
