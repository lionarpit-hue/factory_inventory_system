# Railway Deployment Guide - Factory Inventory System

## Quick Start

Your Factory Inventory System is ready to deploy on Railway!

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (recommended)
3. Click "New Project"

### Step 2: Deploy from GitHub
1. Click "Deploy from GitHub repo"
2. Select: `lionarpit-hue/factory_inventory_system`
3. Click "Deploy"

### Step 3: Add Environment Variables
After deployment starts, go to **Variables** tab and add:

```
# Database (Keep your existing TiDB connection)
DATABASE_URL=mysql://2mvhi45sksFw6EC.eb277ffd3936:qmaAXmnw6Hu172dH3B3R@gateway03.us-east-1.prod.aws.tidbcloud.com:4000/aPRYPMekQYZBeMtHmbFzH2?ssl={"rejectUnauthorized":true}

# OAuth
VITE_APP_ID=aPRYPMekQYZBeMtHmbFzH2
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im

# API Keys
JWT_SECRET=GBKZtc8H8Wg6hez45ar2hE
BUILT_IN_FORGE_API_KEY=HYpc8AgPsnSv3hxWMABwwD
BUILT_IN_FORGE_API_URL=https://forge.manus.ai
VITE_FRONTEND_FORGE_API_KEY=oYpdzimgbDu5kjq3TjQE23
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.ai

# Analytics
VITE_ANALYTICS_ENDPOINT=https://manus-analytics.com
VITE_ANALYTICS_WEBSITE_ID=16d7863f-e6e7-42a0-9331-ffc7a92bc391

# App Config
VITE_APP_TITLE=Factory Store Inventory Management System
OWNER_NAME=arpit agrawal
OWNER_OPEN_ID=7eVTUkcRZqC7W4zwPwDjcs
```

### Step 4: Configure Build Settings
Railway should auto-detect Node.js. If not:
- **Build Command:** `pnpm build`
- **Start Command:** `pnpm start`
- **Port:** 3000

### Step 5: Get Your Live URL
Once deployment completes:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Copy the public URL (e.g., `https://factory-inventory-xxxxx.railway.app`)
4. **That's your live URL!** 🎉

---

## Troubleshooting

### Build Fails
- Check build logs in Railway dashboard
- Ensure all environment variables are set
- Verify database connection string

### Database Connection Issues
- Confirm DATABASE_URL is correct
- Check TiDB Cloud firewall settings
- Add Railway IP to TiDB whitelist if needed

### App Won't Start
- Check application logs in Railway
- Verify PORT environment variable (should be 3000)
- Ensure all required env vars are set

---

## Features Available After Deployment

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

---

## Support

If you encounter any issues:
1. Check Railway deployment logs
2. Verify environment variables
3. Check database connectivity
4. Review application logs

Your app is production-ready! 🚀
