#!/bin/bash

# Doctor Appointment System - Deployment Setup Script
# This script helps prepare your project for deployment

echo "🚀 Doctor Appointment System - Deployment Setup"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Doctor Appointment System"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "📝 Next Steps for Deployment:"
echo ""
echo "1️⃣  CREATE GitHub Repository:"
echo "   - Go to https://github.com/new"
echo "   - Create a new repository named 'doctor-appointment-system'"
echo "   - Copy the repository URL"
echo ""
echo "2️⃣  PUSH to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/doctor-appointment-system.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  SET UP PostgreSQL Database:"
echo "   Option A: Railway (https://railway.app) - RECOMMENDED"
echo "   Option B: Render (https://render.com)"
echo "   Option C: ElephantSQL (https://www.elephantsql.com/)"
echo "   ➜ Copy the DATABASE_URL connection string"
echo ""
echo "4️⃣  DEPLOY Backend to Railway (https://railway.app):"
echo "   - Connect your GitHub account"
echo "   - Import this repository"
echo "   - Add PostgreSQL service"
echo "   - Set environment variables:"
echo "     DATABASE_URL=<your-postgres-url>"
echo "     NODE_ENV=production"
echo "   - Deploy!"
echo ""
echo "5️⃣  DEPLOY Frontend to Vercel (https://vercel.com):"
echo "   - Connect your GitHub account"
echo "   - Import repository"
echo "   - Framework: Vite"
echo "   - Root Directory: frontend"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Add environment variable:"
echo "     VITE_API_BASE=https://your-railway-url/api"
echo "   - Deploy!"
echo ""
echo "6️⃣  SEED Database:"
echo "   Once deployed, run in Railway terminal:"
echo "   node scripts/seed.js"
echo ""
echo "📚 Full guide: See DEPLOYMENT.md"
echo ""
echo "Happy deploying! 🎉"
