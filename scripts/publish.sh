#!/usr/bin/env bash

LATEST_GIT_TAG=$(git describe --tags --abbrev=0)
# Git tag is in the form v1.0.0, remove the prepending "v" to get just the version
LATEST_GIT_TAG="${LATEST_GIT_TAG:1}"
# Update package.json's version field
npm version $LATEST_GIT_TAG --no-commit-hooks --no-git-tag-version

echo "Updating package.json with version $LATEST_GIT_TAG"
if [[ $LATEST_GIT_TAG == *"beta"* ]];
then
echo "Publishing beta version $LATEST_GIT_TAG to npm";
yarn publish --new-version $LATEST_GIT_TAG --no-git-tag-version --no-commit-hooks --access public --tag beta
elif [[ $LATEST_GIT_TAG == *"alpha"* ]];
then
echo "Publishing alpha version $LATEST_GIT_TAG to npm";
yarn publish --new-version $LATEST_GIT_TAG --no-git-tag-version --no-commit-hooks --access public --tag alpha
else
echo "Publishing new version $LATEST_GIT_TAG to npm";
yarn publish --new-version $LATEST_GIT_TAG --no-git-tag-version --no-commit-hooks --access public
fi