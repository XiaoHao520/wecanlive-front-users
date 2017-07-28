#!/usr/bin/env bash

./build.sh

rm -r ../wecanlive-cordova/www/*
cp -r dist/* ../wecanlive-cordova/www
cd ../wecanlive-cordova

./build-ios.sh
