# Vercel Deployment Guide - Factory Inventory System

## Quick Deploy to Vercel

Your Factory Inventory System is ready to deploy on Vercel!

### Step 1: Go to Vercel
1. Open https://vercel.com
2. Sign in with GitHub (or create account)
3. Click "Add New..." → "Project"

### Step 2: Import Your Repository
1. Click "Import Git Repository"
2. Paste: `https://github.com/lionarpit-hue/factory_inventory_system`
3. Click "Continue"

### Step 3: Configure Project
1. **Framework Preset:** Select "Other" or "Node.js"
2. **Root Directory:** Leave as default
3. **Build Command:** `pnpm build`
4. **Output Directory:** `dist`
5. **Install Command:** `pnpm install`

### Step 4: Add Environment Variables
Click "Environment Variables" and add these:

```
DATABASE_URL=mysql://2mvhi45sksFw6EC.eb277ffd3936:qmaAXmnw6Hu172dH3B3R@gateway03.us-east-1.prod.aws.tidbcloud.com:4000/aPRYPMekQYZBeMtHmbFzH2?ssl={"rejectUnauthorized":true}
VITE_APP_ID=aPRYPMekQYZBeMtHmbFzH2
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im
JWT_SECRET=GBKZtc8H8Wg6hez45ar2hE
BUILT_IN_FORGE_API_KEY=HYpc8AgPsnSv3hxWMABwwD
BUILT_IN_FORGE_API_URL=https://forge.manus.ai
VITE_FRONTEND_FORGE_API_KEY=oYpdzimgbDu5kjq3TjQE23
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.ai
VITE_ANALYTICS_ENDPOINT=https://manus-analytics.com
VITE_ANALYTICS_WEBSITE_ID=16d7863f-e6e7-42a0-9331-ffc7a92bc391
VITE_APP_TITLE=Factory Store Inventory Management System
OWNER_NAME=arpit agrawal
OWNER_OPEN_ID=7eVTUkcRZqC7W4zwPwDjcs
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. You'll get a live URL! 🎉

---

## Your Live URL
After deployment, you'll get a URL like:
```
https://factory-inventory-system-xxxxx.vercel.app
```

**That's your live app!** 📱

---

## Features Available
✅ All 10 modules fully functional
✅ Master Data Management
✅ Indent Creation & Workflow
✅ Purchase Orders
✅ Goods Received Notes (GRN)
✅ Goods Issue Notes (GIN)
✅ Direct Purchase
✅ Automatic Stock Management
✅ Dashboard with Metrics
✅ Reports (Purchase & Consumables)
✅ **NO LOGIN REQUIRED** - Public access!

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify database connection string

### App Won't Start
- Check deployment logs
- Verify all env vars are present
- Check database connectivity

### Features Not Working
- Refresh the page (Ctrl+R)
- Check browser console for errors
- Verify database is accessible

---

## Support
If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check database connectivity
4. Review application logs

**Your app is production-ready!** 🚀
