# 🇹🇭 Bangkok & Pattaya Bro Trip 2026

A **live-synced** trip planner — edits by any bro update everyone's screen instantly via Firebase Firestore.

## 🔥 Firebase Setup (5 minutes)

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)**
2. Click **Add project** → name it `bro-trip-2026` → Continue
3. Disable Google Analytics (not needed) → **Create project**
4. Click **Project settings** (gear icon) → **Your apps** → **Web** (</> icon)
5. Register app name `bro-trip` → copy the `firebaseConfig` object
6. Open `app.js` in this repo and **replace the placeholder values** in the `firebaseConfig` block at the top
7. Back in Firebase Console:
   - Go to **Build → Firestore Database** → **Create database**
   - Choose **Start in test mode** → pick any region → Enable
8. Commit the updated `app.js` → done!

## 🌐 Deploy on GitHub Pages

1. Go to repo **Settings → Pages**
2. Source: Deploy from branch → `main` → `/ (root)` → **Save**
3. Live at: `https://JhonTimid.github.io/bro-trip-thailand`

## ✏️ How to use

- Click **"Edit Trip"** on the hero to update dates, crew names, tagline
- Click **"Edit"** on any hotel/flight card to fill in booking details
- Click **"Edit"** on any day card to change activities — updates live for everyone
- All changes sync to Firestore and appear on every device in real time

## 💰 Cost

Firebase Spark (free tier) supports:
- **1 GB** Firestore storage
- **50,000 reads/day**, **20,000 writes/day**

For a 7-person bro trip site, you'll **never leave the free tier**.
