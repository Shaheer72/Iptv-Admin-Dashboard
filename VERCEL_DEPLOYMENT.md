# Vercel Deployment Guide

## What Changed

Your application now uses **Next.js API Routes** instead of a separate Express backend server. This is required for Vercel serverless deployment.

### API Routes Created:
- `/api/register` → `src/app/api/register/route.ts`
- `/api/admin/login` → `src/app/api/admin/login/route.ts`
- `/api/admin/users` → `src/app/api/admin/users/route.ts`

### Environment Variables
The `NEXT_PUBLIC_API_URL` is now set to `/api` (relative path), which works on both localhost and Vercel.

## Vercel Deployment Steps

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Convert to Next.js API Routes for Vercel deployment"
   git push
   ```

2. **Go to Vercel Dashboard** → Import your repository

3. **Set Environment Variables** in Vercel Project Settings:
   - `MONGODB_URI` → Your MongoDB connection string (required)
   - `ADMIN_USERNAME` → Admin username (e.g., "Fearless")
   - `ADMIN_PASSWORD` → Admin password

4. **Deploy** - Vercel will automatically build and deploy

## Important Notes

- ✅ The API routes are now serverless functions on Vercel
- ✅ MongoDB connection is reused via Mongoose singleton pattern
- ✅ All API calls use relative paths that work on both dev and production
- ✅ The old `api/server.ts` Express server is no longer needed for Vercel

- ⚠️ There was a legacy `api/` Express server in the project root. To avoid Vercel treating it as standalone Serverless Functions (which conflicted with Next.js API routes), I copied it to `server_legacy/` and added `.vercelignore` to exclude the root `api/` and other build artifacts from deployments. If you need the legacy server for local debugging, run it manually from `server_legacy/`.

## Local Development

```bash
npm run dev
# Server runs at http://localhost:3000
# API routes available at http://localhost:3000/api/*
```

## If Issues Persist

- Clear your browser cache
- Check Vercel build logs for error messages
- Verify MongoDB URI is correct and accessible from Vercel
- Ensure all environment variables are set in Vercel dashboard
