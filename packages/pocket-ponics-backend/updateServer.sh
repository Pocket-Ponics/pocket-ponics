#!/bin/bash
PATH="/usr/local/bin:/usr/bin:/bin"
forever stopall
cd pocket-ponics/packages/pocket-ponics-backend 
git checkout backend
git pull
npm install
forever start -c "npm start" ./
