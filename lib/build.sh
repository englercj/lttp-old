#!/usr/bin/env bash

cd ../grapefruit &&
grunt build &&
cp build/gf.js ../lttp-webgl/lib/gf.js