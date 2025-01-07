#!/bin/bash

echo "🧹 Cleaning..."
rm -rf npm

echo "🏗️  Building..."
deno run -A _build_npm.ts

echo "📦 Installing dependencies..."
cd test-app
pnpm install

echo "🔗 Linking package..."
pnpm link ../npm

echo "✅ Done!" 
