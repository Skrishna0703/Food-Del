# Security Policy

## Reporting Security Vulnerabilities

We take the security of Food-Del seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report a Security Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please email us at: [your-security-email@example.com]

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

## Security Measures Implemented

### Backend Security

1. **Authentication & Authorization**
   - JWT-based authentication with secure token generation
   - Protected routes using authentication middleware
   - Strong password requirements with validation

2. **Input Validation & Sanitization**
   - Express-validator for comprehensive input validation
   - XSS protection through input sanitization
   - SQL injection prevention through parameterized queries

3. **Rate Limiting**
   - Authentication endpoints: 5 attempts per 15 minutes
   - General API endpoints: 100 requests per 15 minutes
   - Prevents brute force and DoS attacks

4. **Security Headers**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy for camera, microphone, geolocation
   - HSTS in production environment

5. **Data Protection**
   - Password hashing using bcrypt with salt rounds
   - Secure environment variable management
   - Database connection string protection

### Environment Security

1. **Environment Variables**
   - Sensitive data stored in environment variables
   - Separate .env.example for documentation
   - No hardcoded credentials in source code

2. **CORS Configuration**
   - Restricted origins based on environment
   - Secure methods and headers configuration
   - Credentials support for authenticated requests

3. **Request Size Limits**
   - JSON payload size limited to 10MB
   - Prevents large payload attacks

## Security Best Practices for Deployment

### Production Environment

1. **Environment Setup**
   ```bash
   # Set NODE_ENV for production security features
   NODE_ENV=production
   
   # Use strong, unique secrets
   JWT_SECRET=your-very-strong-random-secret-here
   
   # Use HTTPS-only database connections
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database?ssl=true
   ```

2. **Server Configuration**
   - Use HTTPS in production
   - Enable firewall rules
   - Regular security updates
   - Log monitoring and alerting

3. **Database Security**
   - Use MongoDB Atlas or secured self-hosted instance
   - Enable authentication and authorization
   - Network access restrictions
   - Regular backups with encryption

### Development Environment

1. **Secure Development**
   - Never commit .env files
   - Use different secrets for development
   - Regular dependency updates
   - Code review for security issues

2. **Testing**
   - Security testing in CI/CD pipeline
   - Regular vulnerability scans
   - Penetration testing for major releases

## Dependencies Security

We regularly monitor our dependencies for known vulnerabilities using:

- npm audit
- GitHub Security Advisories
- Snyk vulnerability database

### Updating Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable vulnerabilities
npm audit fix

# Manual review for major version updates
npm outdated
```

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ |
| < 1.0   | ❌ |

We provide security updates for the latest major version only.

## Security Checklist for Contributors

Before submitting code changes:

- [ ] No hardcoded credentials or sensitive data
- [ ] Input validation for all user inputs
- [ ] Proper error handling without information leakage
- [ ] Authentication/authorization checks for protected routes
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection where applicable
- [ ] Rate limiting considerations
- [ ] Secure headers implementation
- [ ] Dependencies security review

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)

---

For any security-related questions or concerns, please contact us at [your-security-email@example.com]
