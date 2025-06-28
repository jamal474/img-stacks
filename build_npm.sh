#!/bin/bash

echo "Building Npm package"
npm run build-all

echo -e "\n\nUpdating to npm-build Repo"
cp -r ./npm/. ./npm-build

P_HASH=$(git log --pretty=format:"%h" -n 1)

cd npm-build
if git status --porcelain | grep -q .; then

    echo -e "\n\nMaking Commit for npm-build Repo"
    git add .
    git commit -m "build of commit-${P_HASH}"

    echo -e "\n\nPushing to Main"
    git push origin main

else 

    echo -e "\n\nNo Changes in the npm-build"

fi