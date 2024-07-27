#!/bin/bash

# Pull the latest changes from the git repository
# git reset --hard
# git clean -df
git pull origin main

npm install

npm run build