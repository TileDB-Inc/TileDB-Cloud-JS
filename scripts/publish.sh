#!/usr/bin/env bash

LATEST_GIT_TAG=$(git describe --tags --abbrev=0)
# Git tag is in the form v1.0.0, remove the prepending "v" to get just the version
LATEST_GIT_TAG="${latestGitTag:1}"
# Update package.json's version field
npm version $LATEST_GIT_TAG
if [[ $LATEST_GIT_TAG == *"beta"* ]];
then
echo "Publishing beta version $LATEST_GIT_TAG to npm";
yarn publish --new-version $LATEST_GIT_TAG --no-git-tag-version --access public --tag beta
elif [[ $GIT_TAG_VERSION == *"alpha"* ]];
then
echo "Publishing alpha version $LATEST_GIT_TAG to npm";
yarn publish --new-version $LATEST_GIT_TAG --no-git-tag-version --access public --tag alpha
else
echo "Publishing new version $LATEST_GIT_TAG to npm";
yarn publish --new-version $LATEST_GIT_TAG --no-git-tag-version --access public
fi