# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 🚨 For Critical Security Issues

If you find a critical security vulnerability that could compromise user data or system integrity:

1. **DO NOT** create a public issue
2. Send an email to: **vitor.pouza@gmail.com**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if known)

### 📋 For Non-Critical Issues

For less critical security concerns, you can:

1. Create a [Security Advisory](../../security/advisories) on GitHub
2. Follow our standard issue template
3. Label the issue with `security`

## Security Measures

### 🛡️ Application Security

- **Content Security Policy (CSP)**: Strict CSP headers prevent XSS attacks
- **CORS Protection**: Controlled cross-origin resource sharing
- **Rate Limiting**: API endpoints protected against abuse
- **Input Validation**: All user inputs are validated and sanitized
- **Secure Headers**: Security headers including HSTS, X-Frame-Options, etc.

### 🔒 Infrastructure Security

- **HTTPS Only**: All communications encrypted in transit
- **Environment Variables**: Sensitive data stored in environment variables
- **Container Security**: Docker images scanned for vulnerabilities
- **Dependency Scanning**: Automated security audits of npm packages

### 🔍 Automated Security Scanning

Our CI/CD pipeline includes:

- **npm audit**: Regular dependency vulnerability scanning
- **CodeQL**: Static code analysis for security issues
- **Trivy**: Container and filesystem vulnerability scanning
- **Dependabot**: Automated dependency updates

### 🚦 Security Workflows

#### GitHub Actions Security

- Secrets are stored using GitHub encrypted secrets
- Workflows use principle of least privilege
- Actions are pinned to specific versions with hash verification
- No sensitive data in logs or artifacts

#### Deployment Security

- Production deployments require review
- Environment-specific configurations
- Automated rollback on security issues
- Zero-downtime deployments

## Security Best Practices

### For Contributors

1. **Never commit secrets**: Use `.env.example` for environment variables
2. **Validate inputs**: Always sanitize and validate user inputs
3. **Use HTTPS**: Ensure all external API calls use HTTPS
4. **Update dependencies**: Keep packages updated and audit regularly
5. **Follow OWASP**: Apply OWASP security guidelines

### For Deployments

1. **Environment separation**: Use different environments for dev/staging/prod
2. **Access controls**: Limit access to production systems
3. **Monitoring**: Set up security monitoring and alerts
4. **Backups**: Regular backups with encryption
5. **Incident response**: Have a security incident response plan

## Security Headers

The application implements the following security headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://assets.coingecko.com; font-src 'self' data:; connect-src 'self' https://api.coingecko.com; frame-ancestors 'none';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Third-Party Services

### CoinGecko API

- **Data Source**: Cryptocurrency data from CoinGecko API
- **Rate Limiting**: Respects API rate limits
- **Data Validation**: All API responses validated
- **Error Handling**: Graceful handling of API failures

### Vercel Deployment

- **Platform Security**: Leverages Vercel's security features
- **Edge Functions**: Serverless functions with automatic scaling
- **DDoS Protection**: Built-in DDoS mitigation
- **SSL/TLS**: Automatic SSL certificate management

## Compliance

### Data Privacy

- **No Personal Data**: Application doesn't collect personal information
- **No Cookies**: Minimal cookie usage for theme preferences only
- **Local Storage**: Theme preferences stored locally only
- **No Tracking**: No user tracking or analytics by default

### Security Standards

- **OWASP**: Following OWASP security guidelines
- **CSP Level 3**: Implementing Content Security Policy Level 3
- **Secure Development**: Secure coding practices throughout

## Security Monitoring

### Automated Alerts

- **Vulnerability Alerts**: GitHub security alerts enabled
- **Dependency Updates**: Dependabot configured for security updates
- **Build Failures**: CI/CD pipeline failures trigger alerts
- **Security Scans**: Weekly automated security scans

### Manual Reviews

- **Code Reviews**: All changes require security-focused code review
- **Penetration Testing**: Regular security assessments
- **Audit Trail**: All deployments and changes logged
- **Access Reviews**: Regular review of access permissions

## Response Timeline

| Severity | Response Time | Resolution Time |
|----------|---------------|-----------------|
| Critical | 4 hours | 48 hours |
| High | 24 hours | 1 week |
| Medium | 3 days | 2 weeks |
| Low | 1 week | 1 month |

## Security Contacts

- **Security Issues**: vitor.pouza@gmail.com
- **General Questions**: [Create an issue](../../issues/new)
- **Security Advisories**: [GitHub Security Tab](../../security)

---

*This security policy is reviewed and updated regularly. Last updated: January 2025*