# Doctor Appointment System - Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
- GitHub account
- Railway account (railway.app)
- Vercel account (vercel.com)
- PostgreSQL database (ElephantSQL, Render, or Railway PostgreSQL)

---

## 📦 Step 1: Push Project to GitHub

```bash
cd "c:\Users\imthi\Desktop\doctor appointment system"

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Doctor Appointment System"

# Create new repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/doctor-appointment-system.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Set Up PostgreSQL Database

### Option A: Using Railway (Recommended)
1. Go to https://railway.app
2. Sign up / Log in
3. Click "New Project"
4. Select "PostgreSQL"
5. Copy the Database URL
6. Save it for backend environment variables

### Option B: Using Render.com
1. Go to https://render.com
2. Sign up / Log in
3. Create new PostgreSQL database
4. Copy connection string
5. Format: `postgresql://user:password@host:5432/database`

### Option C: Using ElephantSQL
1. Go to https://www.elephantsql.com/
2. Create account
3. Create new instance (Free tier available)
4. Copy connection URL

---

## 🔧 Step 3: Deploy Backend to Railway

1. **Connect GitHub**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your doctor-appointment-system repo

2. **Add PostgreSQL Service**
   - Click "Add Service" → "PostgreSQL"
   - Railway will create a database for you
   - Get the DATABASE_URL from service variables

3. **Configure Environment Variables**
   - Go to your backend service settings
   - Add environment variables:
     ```
     DATABASE_URL=postgresql://...
     NODE_ENV=production
     PORT=4000
     ```

4. **Deploy**
   - Railway auto-deploys on git push
   - Your backend URL will be something like:
     `https://doctor-appointment-backend-prod.railway.app`

---

## 🎨 Step 4: Deploy Frontend to Vercel

1. **Connect GitHub**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework: Vite
   - Build Command: `npm run build` (in frontend folder)
   - Output Directory: `dist`
   - Root Directory: `frontend`

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_BASE=https://your-railway-backend-url/api
     ```
   - Replace with your actual Railway backend URL

4. **Deploy**
   - Click "Deploy"
   - Your frontend URL will be something like:
     `https://doctor-appointment-system.vercel.app`

---

## 🔗 Step 5: Connect Backend and Frontend

1. **Update Backend Database**
   - Backend will use Railway PostgreSQL automatically
   - Migration will run on first deploy

2. **Update Frontend API URL**
   - In Vercel, update VITE_API_BASE to your Railway URL
   - Redeploy frontend

3. **Seed Database**
   - Run seed script in Railway terminal:
     ```bash
     node scripts/seed.js
     ```
   - Or use Railway's CLI to execute commands

---

## ✅ Testing Deployment

1. Visit your Vercel frontend URL
2. Use the app to:
   - Search for doctors
   - View hospital details
   - Book appointments
3. Check backend logs in Railway dashboard

---

## 🔐 Security Checklist

- [ ] Database URL is private (use environment variables)
- [ ] .env files are in .gitignore
- [ ] No credentials in git commits
- [ ] Use HTTPS for all connections
- [ ] Enable CORS properly in backend

---

## 📊 Useful Commands

### View Railway Logs
```bash
railway logs
```

### Run Migration on Railway
```bash
railway run node sql/migrate_add_doctor_fields.sql
```

### Seed Database on Railway
```bash
railway run node scripts/seed.js
```

### View Vercel Logs
- Check in Vercel dashboard → Function Logs or Build Logs

---

## 🆘 Troubleshooting

### "Database connection failed"
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check network access rules

### "CORS error"
- Update backend CORS configuration
- Allow Vercel domain in backend

### "Frontend can't reach backend"
- Verify VITE_API_BASE is correct
- Check backend is running
- Check network tab in browser console

### "Build fails on Vercel"
- Check root directory is set to `frontend`
- Verify all dependencies are in package.json
- Check build logs for errors

---

## 📝 Post-Deployment

1. **Monitor Performance**
   - Check Railway dashboard for errors
   - Monitor Vercel analytics

2. **Regular Backups**
   - Set up database backups
   - Export important data

3. **Updates**
   - Push code changes to GitHub
   - Railway/Vercel auto-deploy on push

---

## Quick Links
- Railway Dashboard: https://railway.app/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub: https://github.com
- PostgreSQL Options: Render, ElephantSQL, Railway, Supabase

