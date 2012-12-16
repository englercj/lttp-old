#!/usr/bin/env bash

cd ~/repos/grapefruit &&
grunt &&
cp build/gf.js ~/repos/lttp-webgl/lib/gf.js &&
cd ~/repos/lttp-webgl