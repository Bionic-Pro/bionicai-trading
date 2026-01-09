# BionicAI Trading - Deployment Guide

## Overview
This guide covers deploying the BionicAI Trading showcase application to various platforms.

## Prerequisites
- Node.js 18+ installed
- Git repository initialized
- Environment variables configured

## Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Build Application
```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment Options

### Option 1: Netlify (Recommended)

#### Automatic Deployment
1. Push your code to GitHub
2. Connect your Netlify account to GitHub
3. Select the repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Option 2: Vercel

#### Automatic Deployment
1. Push code to GitHub
2. Connect Vercel to GitHub
3. Import the project
4. Vercel will automatically detect it's a Vite project

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 3: Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy
```

#### Firebase Configuration
Update `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{"source": "**", "destination": "/index.html"}],
    "headers": [{"source": "**/*.@(js|css)", "headers": [{"key": "Cache-Control", "value": "max-age=31536000"}]}]
  },
  "functions": {"runtime": "nodejs18"}
}
```

### Option 4: GitHub Pages

#### Setup
1. Create `gh-pages` branch
2. Configure build in `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/bionicai-trading-showcase"
}
```

3. Install and deploy:
```bash
npm install gh-pages --save-dev
npm run deploy
```

## Environment Variables

### Production Environment Variables
Set these in your hosting platform's dashboard:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## PWA Configuration

### Service Worker
The application includes a service worker (`public/sw.js`) for offline functionality.

### Manifest
PWA manifest is configured in `public/manifest.json`.

### Icons
Add icons to `public/icons/` directory:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication (Email/Password and Google)
4. Enable Firestore
5. Enable Storage

### 2. Configure Authentication
- Enable Email/Password sign-in method
- Enable Google sign-in method
- Configure authorized domains

### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /public/{documentId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Blofin API Integration

### 1. Create Firebase Cloud Functions
```bash
firebase init functions
cd functions
npm install
```

### 2. Add Blofin API Proxy
Create `functions/src/index.ts` with Blofin API integration.

### 3. Deploy Functions
```bash
firebase deploy --only functions
```

## Performance Optimization

### Build Optimizations
- Code splitting implemented
- Images optimized
- CSS minified
- JavaScript minified

### Cache Headers
Configure cache headers for static assets:
- CSS/JS: 1 year
- Images: 6 months
- HTML: no cache

## Security Considerations

### HTTPS
All deployments should use HTTPS (automatically enabled on most platforms).

### Environment Variables
Never commit sensitive data to repository.

### Content Security Policy
Add CSP headers in your hosting platform:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https://api.coingecko.com https://*.firebaseio.com;
```

## Monitoring

### Analytics
- Firebase Analytics integrated
- Track page views and user interactions
- Monitor performance metrics

### Error Tracking
- Error boundaries implemented
- Console error logging
- Consider adding Sentry for production error tracking

## Troubleshooting

### Common Issues

#### Build Fails
- Check Node.js version (must be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check environment variables

#### PWA Not Working
- Verify manifest.json is accessible
- Check service worker registration
- Ensure HTTPS is enabled

#### Authentication Issues
- Verify Firebase configuration
- Check authorized domains
- Ensure API keys are correct

#### API Issues
- Check CORS settings
- Verify API endpoints
- Monitor rate limits

### Debug Mode
Run locally in development mode:
```bash
npm run dev
```

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] All pages accessible
- [ ] Authentication working
- [ ] PWA installable
- [ ] Offline functionality working
- [ ] Mobile responsive
- [ ] Forms submitting
- [ ] Charts displaying
- [ ] Links working
- [ ] SEO meta tags correct
- [ ] Analytics tracking
- [ ] Error monitoring active

## Support

For deployment issues:
1. Check browser console for errors
2. Verify network requests
3. Review build logs
4. Test in incognito mode
5. Clear browser cache

## Next Steps

After successful deployment:
1. Monitor performance
2. Set up alerts
3. Configure backups
4. Plan scaling strategy
5. Regular security audits
