#!/bin/bash

echo "🧹 Cleaning..."
rm -rf npm

echo "🏗️  Building..."
deno run -A _build_npm.ts 0.1.0

echo "📦 Installing dependencies..."
cd test-app
pnpm install

echo "🔗 Linking package..."
pnpm link ../npm

echo "✅ Done!" 
