# Quick Deployment Guide

## 🚀 Deploy to Vercel (Recommended - 2 minutes)

### Option 1: Using Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Add environment variable: `VITE_GROQ_API_KEY`
6. Click "Deploy"
7. Done! ✅

### Option 2: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then deploy to production
vercel --prod
```

## 🌐 Deploy to Netlify (Alternative)

### Using Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_GROQ_API_KEY`
6. Click "Deploy"
7. Done! ✅

### Using Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod
```

## 📋 Environment Variables

Add this to your deployment platform:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## ✅ Post-Deployment Checklist

After deployment, test:
- [ ] Website loads
- [ ] Navigation works
- [ ] 3D scene renders
- [ ] ChatBot works (test a question)
- [ ] Contact form submits
- [ ] All sections visible
- [ ] Mobile responsive
- [ ] Performance is good

## 🎯 Expected Results

- **Load Time**: < 3 seconds
- **Lighthouse Score**: 90+
- **Mobile Friendly**: Yes
- **All Features**: Working

## 🔧 Troubleshooting

### If build fails on platform:
1. Check environment variables are set
2. Ensure Node version is 18+ in platform settings
3. Clear build cache and redeploy

### If ChatBot doesn't work:
- Verify `VITE_GROQ_API_KEY` is set correctly
- Check API key is valid

### If 3D scene doesn't load:
- This is normal on first load, it lazy loads
- Check browser console for errors

## 📊 Monitor Performance

After deployment:
1. Run Lighthouse audit
2. Check Core Web Vitals
3. Test on mobile devices
4. Monitor in Google Analytics (if configured)

---

**Your website is ready to deploy! Choose Vercel or Netlify and go live in minutes!** 🚀
