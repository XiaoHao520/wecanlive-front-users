#!/usr/bin/env bash

npm run build
rm $(find dist | grep \.map$)
mkdir -p dist/assets/css/assets
cp -r dist/assets/img dist/assets/css/assets/img
cordova-hcp build dist

