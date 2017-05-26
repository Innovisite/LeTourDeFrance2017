#!/bin/sh

mkdir -p dist
mkdir -p build
mkdir -p build/etapes
mkdir -p build/etapes_heights

# retrieve routes
echo '============== COMPUTE ROUTES'
nodejs generateEtapes.js

# retrieve heigths
echo '============== COMPUTE HEIGHTS'
nodejs generateHeights.js

# generate czml
echo '============== COMPUTE CZML'
nodejs processEtapes.js > dist/TourDeFrance2017.czml
