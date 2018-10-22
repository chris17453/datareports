#!/bin/bash
echo "Attempting to build NPM and PyPi packages"

echo "Remove old images"
cd dist
rm *.gz -f
cd ..

echo "Bumping Python patch version"
bump -p

echo "Build the package"
python setup.py sdist

echo "Upload the package"
twine upload  dist/*

cd npm
echo "Bumping NPM patch version"
npm version patch
echo "Publishing NPM"
npm publish

cd ..

echo "Done.."