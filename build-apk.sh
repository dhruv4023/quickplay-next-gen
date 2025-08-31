#!/bin/bash

echo "Set the Android Studio path if needed. Cmd: export CAPACITOR_ANDROID_STUDIO_PATH=/home/dhruv4023/android-studio/bin/studio.sh"
# set android studio path
export CAPACITOR_ANDROID_STUDIO_PATH=/home/dhruv4023/android-studio/bin/studio.sh

# Stop execution if any command fails
set -e

echo "🚀 Starting Android app build process with Capacitor..."

# 1️⃣ Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2️⃣ Build the Vite app
echo "🛠️ Building the Vite app..."
npm run build

# 3️⃣ Initialize Capacitor (if not already initialized)
if [ ! -f "capacitor.config.ts" ] && [ ! -f "capacitor.config.json" ]; then
    echo "⚡ Initializing Capacitor..."
    npm install @capacitor/core @capacitor/cli @capacitor/android
    npx cap init my-vite-app com.example.myviteapp --web-dir=dist
fi

# 4️⃣ Copy the build output to the Capacitor Android project
echo "📂 Copying files to Capacitor..."
npx cap copy

# 5️⃣Add Android platform if not already added
if [ ! -d "android" ]; then
    echo "📡 Adding Android platform..."
    npx cap add android
fi

# 6️⃣ Sync changes with Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android


# # 7️⃣ open the Android studio
npx cap open android
