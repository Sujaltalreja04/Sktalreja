# 🚀 Production Deployment Guide

## Quick Deploy Commands

### 1️⃣ **Build for Production**
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### 2️⃣ **Preview Production Build Locally** (Optional)
```bash
npm run preview
```
Test the production build before deploying.

---

## Deployment Options

### 🟢 **Option 1: Vercel (Recommended - Easiest)**

#### One-Time Setup:
1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

#### Deploy:
```bash
vercel --prod
```

**Or use GitHub Integration:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-deploys on every push!

---

### 🔵 **Option 2: Netlify**

#### One-Time Setup:
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

#### Deploy:
```bash
netlify deploy --prod
```

**Or drag & drop:**
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder

---

### 🟣 **Option 3: GitHub Pages**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Add `base` to `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

---

### 🟠 **Option 4: Render**

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new **Static Site**
4. Connect your GitHub repo
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click **Create Static Site**

---

## ⚡ Pre-Deployment Checklist

- [ ] Test production build locally (`npm run preview`)
- [ ] Check all 3D galleries work (museum3d.html, tech3d.html)
- [ ] Verify all environment variables are set
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify all images load correctly
- [ ] Test all interactive features (chatbot, voice commands, etc.)
- [ ] Ensure sitemap.xml is up to date
- [ ] Check SEO meta tags

---

## 🔄 Continuous Deployment (Auto-deploy on git push)

### Vercel:
```bash
# Link to Vercel project
vercel link

# Now every 'git push' to main branch auto-deploys!
```

### Netlify:
```bash
# Link to Netlify site
netlify link

# Configure auto-deploy in Netlify dashboard
```

---

## 📊 Performance Tips for Production

1. **Lazy Loading**: Already implemented ✅
2. **Code Splitting**: Vite handles this ✅
3. **Image Optimization**: Consider using WebP format
4. **Compression**: Vercel/Netlify handle gzip/brotli ✅

---

## 🌐 Custom Domain Setup

### After deploying to Vercel/Netlify:

1. Go to your project settings
2. Add custom domain
3. Update DNS records at your domain provider:
   - **A Record**: Points to platform IP
   - **CNAME**: Points to platform URL
4. Wait for DNS propagation (5-48 hours)

---

## 🎯 Recommended: Deploy with Vercel

**Fastest method:**
```bash
# 1. Build
npm run build

# 2. Install Vercel CLI (if not installed)
npm install -g vercel

# 3. Deploy to production
vercel --prod
```

**That's it! Your site is live! 🎉**

---

## 📝 Environment Variables

If you have `.env` file with secrets:

**Vercel:**
```bash
vercel env add VARIABLE_NAME production
```

**Netlify:**
```bash
netlify env:set VARIABLE_NAME value
```

Or add via dashboard in both platforms.

---

## 🐛 Troubleshooting

### Build fails:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 on refresh:
Add `vercel.json` or `netlify.toml` for SPA routing (Vite handles this usually).

### Images not loading:
- Ensure all image URLs are absolute or properly imported
- Check CORS settings for external images

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Vite Docs**: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy)
