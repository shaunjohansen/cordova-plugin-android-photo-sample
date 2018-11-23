#!/bin/bash -e

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $__dirname/..

REACT_APP_IS_CORDOVA=true npm run build

# copy build output to the `www` folder, where cordova expects it to be
rm -rf www
cp -rf build www
rm www/static/js/*.map
