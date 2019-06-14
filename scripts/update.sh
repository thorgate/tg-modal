#!/bin/bash

# ensure paths exists
mkdir -p ./node_modules
mkdir -p ./node_modules/tg-modal

# Remove ./node_modules/tg-modal
rm -rf ./node_modules/tg-modal

# Install latest available tg-modal
npm install tg-modal@latest --no-save > /dev/null 2>&1

# Get version of installed tg-modal
version=`npm list tg-modal --json  | jq '.dependencies["tg-modal"].version' -r`
echo "Found $version"

# Make temporary directory
rm -rf .tmp
mkdir -p .tmp

# Copy ~/dist/examples dir from installed package
cp ./node_modules/tg-modal/dist/examples/* .tmp/

# move .tmp to ../$version
mkdir -p ../$version
mv .tmp/* ../$version

# Remove previous link
rm -f ../latest

# Create a symlink from ../$version to ../latest
cd ..
ln -s $version latest
