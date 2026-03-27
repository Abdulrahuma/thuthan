# Deployment Guide - Thuthan

This guide will help you deploy Thuthan to Vercel (Frontend) and Railway (Backend).

---

## Prerequisites

1. ✅ Code pushed to GitHub (already done!)
2. ✅ Railway account at https://railway.app
3. ✅ Vercel account at https://vercel.com
4. ✅ GNews API key from https://gnews.io

---

## Phase 1: Deploy Backend to Railway

### Step 1.1: Create Railway Project
1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize GitHub and select the `thuthan` repository

### Step 1.2: Configure Backend
1. Railway will auto-detect settings
2. **Root Directory:** `backend`
3. Click **"Configure"** and set:
   - **Build Command:** Leave empty
   - **Start Command:** `node server.js`

### Step 1.3: Add Environment Variable
1. Go to **"Variables"** tab
2. Click **"New Variable"**
3. Add:
   ```
   GNEWS_API_KEY = your_actual_api_key
   ```
   (Get your key from https://gnews.io)

### Step 1.4: Wait for Deployment
1. Railway will build and deploy
2. Copy your backend URL (shown in deployment)
3. It will look like: `https://thuthan-backend.up.railway.app`

---

## Phase 2: Deploy Frontend to Vercel

### Step 2.1: Create Vercel Project
1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Import your `thuthan` GitHub repository
4. Click **"Import"**

### Step 2.2: Configure Frontend
1. **Root Directory:** `frontend`
2. **Framework Preset:** Vite (auto-detected)
3. **Build Command:** `npm run build` (auto-detected)
4. **Output Directory:** `dist` (auto-detected)

### Step 2.3: Add Environment Variable
1. Expand **"Environment Variables"**
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** Your Railway backend URL (e.g., `https://thuthan-backend.up.railway.app`)
3. IMPORTANT: Select all environments (Production, Preview, Development)

### Step 2.4: Deploy
1. Click **"Deploy"**
2. Wait for build and deployment
3. Your site is live! 🎉

---

## Phase 3: Update vercel.json

After getting your Railway URL, update `frontend/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://YOUR-RAILWAY-URL.up.railway.app/api/$1"
    }
  ]
}
```

Replace `YOUR-RAILWAY-URL` with your actual Railway project name.

---

## Your Live URLs

| Component | Platform | URL Example |
|-----------|----------|-------------|
| Frontend | Vercel | `https://thuthan.vercel.app` |
| Backend | Railway | `https://thuthan.up.railway.app` |

---

## Troubleshooting

### Frontend shows "Failed to fetch"
- Check if Railway backend is running
- Verify `VITE_API_URL` is set correctly in Vercel
- Make sure Railway URL doesn't end with `/`

### API returns errors
- Verify `GNEWS_API_KEY` is set in Railway
- Check Railway logs for errors

### Build fails on Vercel
- Make sure `node_modules` is in `.gitignore`
- Verify all dependencies are in `package.json`

---

## Need Help?

If you encounter issues, check:
1. Railway deployment logs
2. Vercel build logs
3. Browser console for errors

---

## Update Your README

After deployment, update your README with your live URLs!
