#!/bin/bash
set -e
echo "Cleaning previous installation..."
rm -rf node_modules package-lock.json
echo "Clearing npm cache..."
npm cache clean --force
echo "Installing dependencies..."
npm install --legacy-peer-deps --force --no-audit
echo "Building the application..."
npm run build 