#!/usr/bin/env bash

cd ../grapefruit &&
grunt &&
cp build/gf.js ../lttp-webgl/lib/gf.js