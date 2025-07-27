# 🚀 Deployment Guide

## Vercel Deployment (Recommended)

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Node.js configuration
3. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: `production`

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and set environment variables
```

## Environment Variables

### Required
- `OPENAI_API_KEY`: Your OpenAI API key from https://platform.openai.com/api-keys

### Optional
- `GA_MEASUREMENT_ID`: Google Analytics measurement ID
- `NODE_ENV`: Set to `production` for production deployments

## Other Deployment Options

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run vercel-build`
3. Set publish directory: `public`
4. Add environment variables

### Heroku
1. Create Heroku app
2. Connect GitHub repository
3. Set environment variables
4. Deploy from main branch

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## Troubleshooting

### 404 Errors
- Ensure `vercel.json` is in the root directory
- Check that `index.js` exports the app correctly
- Verify environment variables are set

### Build Errors
- Check Node.js version (>=14.0.0)
- Ensure all dependencies are in `package.json`
- Verify file paths are correct

### API Errors
- Check OpenAI API key is valid
- Ensure API endpoints are properly configured
- Verify CORS settings for production

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm install
npm start
``` 