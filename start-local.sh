#!/bin/bash
set -e

echo "============================================="
echo "   SmartBiz IMS local environment startup"
echo "============================================="

echo "1. Reminder: Ensure MySQL and Redis are running (e.g., via docker-compose up -d)"
# docker-compose up -d

echo "2. Installing all required dependencies in root, client, and server..."
npm run setup

echo "3. Application starting on localhost!"
npm run dev
