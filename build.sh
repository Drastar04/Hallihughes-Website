#!/bin/bash
set -e
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps --force
npm run build 