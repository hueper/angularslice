#!/bin/bash

# Stop execution on error or on missing variable.
set -o errexit -o nounset

echo "Branch: $TRAVIS_BRANCH PR: $TRAVIS_PULL_REQUEST"

# We abort the deploy when the changes were not made against the master branch
if [[ [[ $TRAVIS_BRANCH = "master" ]] || [[ $TRAVIS_BRANCH = "develop" ]] || [[ $TRAVIS_BRANCH = "website" ]] ]] && [[ $TRAVIS_PULL_REQUEST = false ]]
then
  echo "Deploy conditions didn't pass. No deploy."
  exit 0
fi

git checkout master
masterRevision=$(git rev-parse --short HEAD)

git checkout develop
developRevision=$(git rev-parse --short HEAD)

git checkout website
websiteRevision=$(git rev-parse --short HEAD)

mkdir dist

git checkout master
npm install
npm run build
cp -rf ./dist/ ../dist/app

git chekout develop
npm install
npm run build
cp -rf ./dist/ ../dist/preview

git chekout website
npm install
npm run build
cp -rf ./dist/ ../dist/

cd ../dist

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
