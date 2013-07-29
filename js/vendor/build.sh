#!/usr/bin/env bash

cd ../grapefruit &&
grunt build --force &&
cp build/gf.js ../lttp-webgl/js/vendor/gf.js