#!/bin/bash
PATH="/usr/local/bin:/usr/bin:/bin"
forever stopall
cd pocket-ponics/packages/pocket-ponics-backend 
git reset --hard origin/b/rev
git checkout b/rev
git pull
npm install
forever start -c "npm start" ./
