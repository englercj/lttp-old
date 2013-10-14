#!/usr/bin/env bash

cd ../grapefruit &&
grunt urequire:dev &&
cp build/gf.js ../lttp-webgl/js/vendor/gf.js