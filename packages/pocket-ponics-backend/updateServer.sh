#!/bin/bash
PATH="/usr/local/bin:/usr/bin:/bin"
forever stopall
cd pocket-ponics/packages/pocket-ponics-backend 
git checkout b/rev
git reset --hard
git pull
npm install
forever start -c "npm start" ./
