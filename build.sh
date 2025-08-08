#!/bin/bash
set -e
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps --force --no-audit
npm run build 