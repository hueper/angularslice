#!/bin/bash

# Stop execution on error or on missing variable.
set -o errexit -o nounset

echo "Branch: $TRAVIS_BRANCH PR: $TRAVIS_PULL_REQUEST"

# We abort the deploy when the changes were not made against the master branch
# if [[ $TRAVIS_BRANCH = master ]] || [[ $TRAVIS_BRANCH = develop ]] || [[ $TRAVIS_BRANCH = website ]]
# then
#   echo "Deploy conditions didn't pass. No deploy."
#   exit 0
# fi
#

git clone https://github.com/budacode/angularslice.git

cd angularslice

git config user.name "Budacode Deploy"
git config user.email "opensource@budacode.com"

masterRevision=$(git rev-parse --short HEAD)

git fetch origin develop
git checkout develop
developRevision=$(git rev-parse --short HEAD)

git fetch origin develop
git checkout website
websiteRevision=$(git rev-parse --short HEAD)

mkdir public

git checkout master
npm install
npm run build
cp -rf ./dist/ ./public/app
rm -rf ./dist

git checkout develop
npm install
npm run build
cp -rf ./dist/ ./public/preview
rm -rf ./dist

git checkout website
npm install
npm run build
cp -rf ./dist/. ./public


cd ./public

echo 'ngslice.io' > CNAME

git init
git config user.name "Budacode Deploy"
git config user.email "opensource@budacode.com"

git remote add upstream "https://${DEPLOY_KEY}@github.com/budacode/angularslice.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "Rebuild site at master:${masterRevision}, develop:${developRevision}, website:${websiteRevision}"
git push -q upstream HEAD:gh-pages
