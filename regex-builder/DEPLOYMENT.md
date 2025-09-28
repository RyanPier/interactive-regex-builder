# Deployment Guide

This guide covers how to deploy the Interactive Regex Builder to various platforms.

## 🚀 GitHub Pages (Recommended)

GitHub Pages provides free hosting for static sites directly from your repository.

### Prerequisites
- GitHub account
- Git installed locally
- Node.js 18+ installed

### Step-by-Step Deployment

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub named 'interactive-regex-builder'
   # Then clone it locally or push your existing code
   git remote add origin https://github.com/yourusername/interactive-regex-builder.git
   ```

2. **Update Configuration**
   - Open `vite.config.js`
   - Update the `base` path to match your repository name:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/interactive-regex-builder/' : '/',
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Build and Deploy**
   ```bash
   npm run deploy
   # or
   pnpm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Click Save

6. **Access Your Site**
   Your site will be available at: `https://yourusername.github.io/interactive-regex-builder/`

### Automatic Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🌐 Vercel

Vercel offers excellent performance and automatic deployments.

### Quick Deploy

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Your site will be live at a Vercel URL

### Custom Domain

1. Go to your project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## 🎯 Netlify

Netlify provides continuous deployment and excellent developer experience.

### Deploy from Git

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**
   - Click "Deploy site"
   - Your site will be live at a Netlify URL

### Drag and Drop Deploy

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Visit [netlify.com/drop](https://netlify.com/drop)
   - Drag the `dist` folder to the deploy area

## 🐳 Docker Deployment

For containerized deployment:

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Build and Run

```bash
docker build -t regex-builder .
docker run -p 8080:80 regex-builder
```

## 🔧 Environment Variables

For different deployment environments, you can use environment variables:

### .env.production

```env
VITE_APP_TITLE=Interactive Regex Builder
VITE_APP_DESCRIPTION=A modern regex testing tool
VITE_BASE_URL=https://yourdomain.com
```

### Usage in Code

```javascript
const title = import.meta.env.VITE_APP_TITLE || 'Regex Builder';
```

## 📊 Performance Optimization

### Build Optimization

1. **Bundle Analysis**
   ```bash
   npm run analyze
   ```

2. **Optimize Images**
   - Use WebP format for images
   - Compress images before adding to public folder
   - Consider lazy loading for large images

3. **Code Splitting**
   - Already configured in `vite.config.js`
   - Vendor chunks are separated automatically

### CDN Configuration

For better performance, consider using a CDN:

1. **Cloudflare**
   - Add your domain to Cloudflare
   - Enable caching and minification
   - Use Cloudflare Pages for deployment

2. **AWS CloudFront**
   - Create a CloudFront distribution
   - Point to your S3 bucket or origin server
   - Configure caching rules

## 🔍 Monitoring and Analytics

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring

Consider adding error monitoring with:
- Sentry
- LogRocket
- Bugsnag

## 🚨 Troubleshooting

### Common Issues

1. **404 on Refresh**
   - Ensure your server is configured for SPA routing
   - Check nginx configuration for `try_files`

2. **Assets Not Loading**
   - Verify the `base` path in `vite.config.js`
   - Check if assets are in the correct directory

3. **Build Failures**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### Debug Commands

```bash
# Check build output
npm run build && ls -la dist/

# Test production build locally
npm run preview

# Check for linting errors
npm run lint

# Format code
npm run format
```

## 📝 Deployment Checklist

- [ ] Update repository URLs in package.json
- [ ] Configure base path in vite.config.js
- [ ] Test build locally with `npm run build`
- [ ] Test preview with `npm run preview`
- [ ] Update README with correct URLs
- [ ] Add custom domain (if applicable)
- [ ] Set up monitoring and analytics
- [ ] Configure error tracking
- [ ] Test on multiple devices and browsers
- [ ] Set up automatic deployments
- [ ] Configure caching headers
- [ ] Add security headers
- [ ] Test performance with Lighthouse

---

**Need help?** Open an issue on GitHub or check the main README for more information.
