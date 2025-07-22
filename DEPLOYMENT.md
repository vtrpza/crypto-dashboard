# 🚀 Deployment Guide

Complete guide for deploying the Crypto Dashboard with CI/CD pipelines using GitHub Actions, Vercel, and Docker.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [GitHub Repository Setup](#github-repository-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [Docker Deployment](#docker-deployment)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Security Configuration](#security-configuration)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Troubleshooting](#troubleshooting)

---

## 📖 Overview

This deployment guide covers multiple deployment strategies:

- **🌐 Vercel** (Recommended): Serverless deployment with automatic scaling
- **🐳 Docker**: Containerized deployment for any platform
- **⚡ Self-hosted**: Traditional server deployment

The CI/CD pipeline includes:
- ✅ **Automated Testing**: Unit tests, E2E tests, TypeScript checks
- 🔒 **Security Scanning**: Dependency audits, code analysis
- 🚀 **Deployment**: Automatic deployment to production
- 📊 **Performance Monitoring**: Lighthouse CI integration
- 🔄 **Dependency Updates**: Automated dependency management

---

## 🔧 Prerequisites

### Required Tools

- **Node.js**: 18.0.0+ (LTS recommended)
- **npm**: 9.0.0+ (or yarn/pnpm)
- **Git**: Latest version
- **GitHub Account**: For repository hosting and CI/CD
- **Vercel Account**: For deployment (free tier available)
- **Docker**: For containerized deployment (optional)

### Required Accounts

1. **GitHub**: Repository hosting and CI/CD
2. **Vercel**: Primary deployment platform
3. **Docker Hub**: Container registry (optional)
4. **CoinGecko API**: Higher rate limits (optional)

---

## 🌍 Environment Setup

### 1. Environment Variables

Copy the environment template:
```bash
cp .env.example .env.local
```

### 2. Configure Required Variables

Edit `.env.local` with your values:

```bash
# API Configuration
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here

# Vercel (Required for CI/CD)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Docker Hub (Optional)
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_token

# Security & Monitoring (Optional)
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### 3. Get API Keys

#### CoinGecko API Key (Optional)
1. Visit [CoinGecko API](https://www.coingecko.com/api/pricing)
2. Choose a plan (Demo is free with limited rate limits)
3. Generate API key
4. Add to `NEXT_PUBLIC_COINGECKO_API_KEY`

#### Vercel Tokens (Required)
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Generate new token
3. Copy token to `VERCEL_TOKEN`

#### Vercel Project Information
```bash
# Install Vercel CLI
npm i -g vercel

# Link your project (run in project directory)
vercel link

# Get project information
vercel env ls
```

---

## 🐙 GitHub Repository Setup

### 1. Create Repository

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Add GitHub remote
git remote add origin https://github.com/your-username/crypto-dashboard.git
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `VERCEL_TOKEN` | Vercel deployment token | ✅ |
| `VERCEL_ORG_ID` | Vercel organization ID | ✅ |
| `VERCEL_PROJECT_ID` | Vercel project ID | ✅ |
| `DOCKER_USERNAME` | Docker Hub username | ⚠️ |
| `DOCKER_PASSWORD` | Docker Hub token/password | ⚠️ |
| `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI token | 📊 |

**Legend**: ✅ Required | ⚠️ Optional (Docker) | 📊 Optional (Analytics)

### 3. Branch Protection Rules

Configure branch protection for `main`:

1. Go to Settings → Branches
2. Add rule for `main`
3. Configure:
   - ✅ Require pull request reviews
   - ✅ Require status checks (select CI workflow)
   - ✅ Require up-to-date branches
   - ✅ Include administrators

---

## 🌐 Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. **Connect Repository**:
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub
   - Select your crypto-dashboard repository

2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm ci`

3. **Environment Variables**:
   Add in Vercel dashboard under Settings → Environment Variables:
   ```
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key
   ```

4. **Deploy**:
   - Vercel automatically deploys on push to `main`
   - Preview deployments for pull requests

### Option 2: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### Custom Domains

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatic

---

## 🐳 Docker Deployment

### Local Docker Build

```bash
# Build image
docker build -t crypto-dashboard .

# Run container
docker run -p 3000:3000 crypto-dashboard

# With environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_COINGECKO_API_KEY=your_key \
  crypto-dashboard
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_COINGECKO_API_KEY=${NEXT_PUBLIC_COINGECKO_API_KEY}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

```bash
# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Docker Deployment

```bash
# Build multi-platform image
docker buildx build --platform linux/amd64,linux/arm64 \
  -t your-registry/crypto-dashboard:latest \
  --push .

# Deploy to production server
docker pull your-registry/crypto-dashboard:latest
docker run -d --name crypto-dashboard \
  -p 80:3000 \
  --restart unless-stopped \
  your-registry/crypto-dashboard:latest
```

---

## ⚡ CI/CD Pipeline

### Workflow Overview

The CI/CD pipeline consists of 3 main workflows:

#### 1. **CI Workflow** (`.github/workflows/ci.yml`)
**Triggers**: Push to `main`/`develop`, Pull Requests

**Jobs**:
- 🧪 **Test**: Multi-node testing (Node 18, 20)
  - Dependency caching
  - ESLint & TypeScript checks
  - Unit tests & E2E tests
  - Build verification
  - Lighthouse performance testing
- 🐳 **Build**: Docker image build with caching
- 🔍 **Lighthouse**: Performance monitoring

#### 2. **CD Workflow** (`.github/workflows/cd.yml`)
**Triggers**: Push to `main`, Manual dispatch

**Jobs**:
- 🚀 **Deploy**: Vercel deployment
  - Production & preview environments
  - Deployment status tracking
  - Concurrency controls
- 📦 **Docker**: Multi-platform image publishing
- 📢 **Notify**: Deployment status notifications

#### 3. **Security Workflow** (`.github/workflows/security.yml`)
**Triggers**: Weekly schedule, Push to `main`, Pull Requests

**Jobs**:
- 🔒 **Security Audit**: npm audit, vulnerability scanning
- 🔍 **Dependency Check**: Trivy filesystem scanning
- 🐳 **Docker Security**: Container vulnerability scanning
- 📝 **CodeQL**: Static code analysis

### Pipeline Features

- **🚀 Fast Builds**: Intelligent dependency caching
- **🔄 Parallel Execution**: Jobs run concurrently when possible
- **🛡️ Security First**: Comprehensive security scanning
- **📊 Performance Monitoring**: Lighthouse CI integration
- **🔁 Auto-retry**: Automatic retry on transient failures
- **📈 Deployment Tracking**: Full deployment lifecycle tracking

---

## 🔒 Security Configuration

### GitHub Security Features

1. **Dependabot**: Automated dependency updates
   - Configured in `.github/dependabot.yml`
   - Weekly npm package updates
   - Monthly Docker base image updates

2. **Security Advisories**: Vulnerability disclosure
   - Private reporting via `.github/SECURITY.md`
   - Coordinated disclosure process

3. **Code Scanning**: Automated security analysis
   - CodeQL for JavaScript/TypeScript
   - Trivy for dependencies and containers
   - SARIF upload to GitHub Security tab

### Application Security

1. **Security Headers**: Configured in `vercel.json`
   ```json
   {
     "X-Content-Type-Options": "nosniff",
     "X-Frame-Options": "DENY",
     "X-XSS-Protection": "1; mode=block",
     "Content-Security-Policy": "default-src 'self'; ..."
   }
   ```

2. **API Security**: Rate limiting and validation
3. **Container Security**: Minimal attack surface, non-root user
4. **Environment Security**: Secrets management, no hardcoded credentials

---

## 📊 Monitoring & Analytics

### Performance Monitoring

1. **Lighthouse CI**: Automated performance testing
   - Configured in `lighthouserc.js`
   - Performance budgets enforced
   - Accessibility compliance checking

2. **Core Web Vitals**: Real user metrics
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

### Error Monitoring (Optional)

1. **Sentry Integration**:
   ```javascript
   // Add to next.config.js
   const { withSentryConfig } = require('@sentry/nextjs');
   
   module.exports = withSentryConfig(nextConfig, {
     org: "your-org",
     project: "crypto-dashboard",
   });
   ```

2. **Environment Variables**:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

### Analytics (Optional)

1. **Google Analytics 4**:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Vercel Analytics**: Built-in analytics
   - Enable in Vercel dashboard
   - No additional configuration required

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **Build Failures**

**Symptom**: CI builds failing
```bash
Error: Cannot resolve module './components/...'
```

**Solution**: Check import paths and case sensitivity
```bash
# Fix import paths
npm run lint --fix
```

#### 2. **Deployment Failures**

**Symptom**: Vercel deployment fails
```
Error: Missing required environment variables
```

**Solutions**:
1. Verify environment variables in Vercel dashboard
2. Check GitHub secrets configuration
3. Validate `.env.example` template

#### 3. **Docker Build Issues**

**Symptom**: Docker image build fails
```
Error: ENOENT: no such file or directory
```

**Solutions**:
1. Check `.dockerignore` configuration
2. Verify file permissions
3. Use multi-stage build optimization

#### 4. **E2E Test Failures**

**Symptom**: Playwright tests failing in CI
```
Error: Test timeout 30000ms exceeded
```

**Solutions**:
1. Increase test timeout in `playwright.config.ts`
2. Add wait conditions for dynamic content
3. Check test environment setup

### Debug Commands

```bash
# Local development debugging
npm run dev -- --debug

# Build debugging
npm run build -- --debug

# Test debugging
npm test -- --verbose

# E2E test debugging
npm run test:e2e -- --debug --ui

# Docker debugging
docker build --progress=plain --no-cache -t crypto-dashboard .
```

### Performance Debugging

```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck

# Audit security vulnerabilities
npm audit

# Check for outdated packages
npm outdated
```

---

## 📞 Support

### Getting Help

1. **Documentation**: Check this deployment guide first
2. **Issues**: [Create a GitHub issue](../../issues/new)
3. **Security**: Follow `.github/SECURITY.md` for security issues
4. **Community**: Join discussions in GitHub Discussions

### Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

*Last updated: January 2025*

Made with ❤️ by Vitor Pouza using Next.js, TypeScript, and Tailwind CSS