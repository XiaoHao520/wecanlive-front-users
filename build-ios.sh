#!/bin/bash

npm run build
rm $(find dist | grep \.map$)
mkdir -p dist/assets/css/assets
cd dist/assets/css/assets
ln -s ../../img
ln -s ../../fonts
cd -
rm -r ../wecanlive-cordova/www/*
cp -r dist/* ../wecanlive-cordova/www
cd ../wecanlive-cordova
cordova build ios
