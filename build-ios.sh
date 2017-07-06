#!/bin/bash

npm run build
rm $(find dist | grep \.map$)
mkdir -p dist/assets/css/assets
cd dist/assets/css/assets
ln -s ../../img
ln -s ../../fonts
cd -
rm -r ../fabiaoba-cordova/www/*
cp -r dist/* ../fabiaoba-cordova/www
cd ../fabiaoba-cordova
cordova build ios
