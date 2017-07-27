#!/bin/bash

./build.sh

rsync -avz ./dist/ vpsx:/var/docker/django/wecanlive-front/dist/
