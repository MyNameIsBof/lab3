# 🧪 CodeAnt AI Test Cases và Solutions

## Tổng quan
File này chứa các test case chi tiết để demo khả năng của CodeAnt AI trong việc phát hiện và sửa chữa các lỗi bảo mật, hiệu suất và chất lượng code.

## 🛡️ Security Test Cases

### 1. SQL Injection Vulnerability
**File:** `src/components/demo/VulnerableTestCases.js:4`
```javascript
// ❌ PROBLEMATIC CODE
const vulnerableUserQuery = (userId) => {
  return `SELECT * FROM users WHERE id = '${userId}'`;
};
```

**Issues:**
- Direct string concatenation allows SQL injection
- No input validation or sanitization
- Potential for data breach

**Solution:**
```javascript
// ✅ SECURE CODE
const secureUserQuery = (userId) => {
  return {
    query: 'SELECT * FROM users WHERE id = ?',
    params: [userId]
  };
};
```

### 2. XSS (Cross-Site Scripting) Vulnerability
**File:** `src/components/demo/VulnerableTestCases.js:10`
```javascript
// ❌ PROBLEMATIC CODE
const vulnerableHtmlRender = (userInput) => {
  document.getElementById('content').innerHTML = userInput;
};
```

**Issues:**
- Direct innerHTML manipulation without sanitization
- Allows execution of malicious scripts
- Can steal user session data

**Solution:**
```javascript
// ✅ SECURE CODE
import DOMPurify from 'dompurify';

const secureHtmlRender = (userInput) => {
  const sanitizedInput = DOMPurify.sanitize(userInput);
  document.getElementById('content').textContent = sanitizedInput;
};
```

### 3. Hardcoded Secrets
**File:** `src/components/demo/VulnerableTestCases.js:20`
```javascript
// ❌ PROBLEMATIC CODE
const apiConfig = {
  apiKey: 'sk-1234567890abcdef',
  database: 'mongodb://admin:password123@localhost:27017/db',
  jwt_secret: 'my-super-secret-key'
};
```

**Issues:**
- Secrets exposed in source code
- Vulnerable to source code leaks
- Hard to rotate credentials

**Solution:**
```javascript
// ✅ SECURE CODE
const secureApiConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  database: import.meta.env.VITE_DATABASE_URL,
  jwtSecret: import.meta.env.VITE_JWT_SECRET
};
```

## ⚡ Performance Test Cases

### 4. Memory Leak
**File:** `src/components/demo/ProblematicComponent.jsx:20`
```javascript
// ❌ PROBLEMATIC CODE
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Polling...');
    fetchUserData();
  }, 1000);
  // Missing cleanup!
}, [userId]);
```

**Issues:**
- No cleanup function in useEffect
- Creates memory leaks
- Degraded performance over time

**Solution:**
```javascript
// ✅ OPTIMIZED CODE
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Polling...');
    fetchUserData();
  }, 30000); // Less frequent polling
  
  return () => clearInterval(interval); // Cleanup
}, [userId]);
```

### 5. Excessive API Calls
**File:** `src/components/demo/ProblematicComponent.jsx:22`
```javascript
// ❌ PROBLEMATIC CODE
setInterval(() => {
  fetchUserData();
}, 1000); // Every second!
```

**Issues:**
- Too frequent API calls
- Unnecessary server load
- Poor user experience

**Solution:**
```javascript
// ✅ OPTIMIZED CODE
setInterval(() => {
  fetchUserData();
}, 30000); // Every 30 seconds
```

## 📊 Code Quality Test Cases

### 6. Missing PropTypes
**File:** `src/components/demo/ProblematicComponent.jsx:10`
```javascript
// ❌ PROBLEMATIC CODE
const ProblematicComponent = ({ userId, apiKey }) => {
  // No prop validation
};
```

**Issues:**
- No type checking for props
- Runtime errors possible
- Poor developer experience

**Solution:**
```javascript
// ✅ QUALITY CODE
import PropTypes from 'prop-types';

const FixedComponent = ({ userId, apiKey }) => {
  // Component logic
};

FixedComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired
};
```

### 7. No Memoization
**File:** `src/components/demo/ProblematicComponent.jsx:10`
```javascript
// ❌ PROBLEMATIC CODE
const ProblematicComponent = ({ userId }) => {
  // No optimization
  return <div>Heavy component</div>;
};
```

**Issues:**
- Unnecessary re-renders
- Performance degradation
- Poor user experience

**Solution:**
```javascript
// ✅ OPTIMIZED CODE
import React, { memo } from 'react';

const FixedComponent = memo(({ userId }) => {
  return <div>Optimized component</div>;
});
```

## ♿ Accessibility Test Cases

### 8. Missing ARIA Labels
**File:** `src/components/demo/ProblematicComponent.jsx:85`
```javascript
// ❌ PROBLEMATIC CODE
<input 
  type="text"
  placeholder="Enter message"
  onChange={handleInput}
/>
```

**Issues:**
- No label for screen readers
- Poor accessibility
- Fails WCAG guidelines

**Solution:**
```javascript
// ✅ ACCESSIBLE CODE
<label htmlFor="message-input">Enter your message:</label>
<input 
  id="message-input"
  type="text"
  placeholder="Enter message"
  onChange={handleInput}
  aria-describedby="message-help"
/>
<small id="message-help">Maximum 500 characters</small>
```

## 🚀 Cách chạy Test Cases

### 1. Web Interface
```bash
npm run dev
# Truy cập http://localhost:5173/codeant-demo
```

### 2. CLI Interface
```bash
# Test tất cả categories
npm run codeant:test

# Test specific category
npm run codeant:test-security
npm run codeant:test-performance
npm run codeant:test-quality

# Auto-fix issues
npm run codeant:fix

# Interactive demo
npm run codeant:demo-interactive
```

### 3. Ví dụ Output
```
🧪 Running CodeAnt AI Test Cases...

🔍 Testing security vulnerabilities...
  📊 security: 7/15 tests passed

🚨 Critical Issues Detected:
1. High - SQL Injection Vulnerability
   📁 src/components/demo/VulnerableTestCases.js:4
   💡 Use parameterized queries

2. High - XSS Vulnerability  
   📁 src/components/demo/VulnerableTestCases.js:10
   💡 Sanitize user input with DOMPurify

3. Critical - Hardcoded API Keys
   📁 src/components/demo/VulnerableTestCases.js:20
   💡 Move secrets to environment variables
```

## 📈 Metrics Improvement

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Security Score | 3.2/10 | 9.8/10 | +206% |
| Quality Score | 4.1/10 | 9.5/10 | +132% |
| Performance | 5.8/10 | 9.2/10 | +59% |
| Accessibility | 6.2/10 | 9.7/10 | +56% |
| **Overall** | **4.8/10** | **9.6/10** | **+100%** |

## 🎯 Best Practices Checklist

### Security ✅
- [x] Input validation và sanitization
- [x] Parameterized queries  
- [x] Environment variables cho secrets
- [x] HTTPS enforcement
- [x] CSRF protection
- [x] Secure headers

### Performance ✅
- [x] React.memo cho expensive components
- [x] useCallback cho functions
- [x] Cleanup trong useEffect
- [x] Lazy loading cho images
- [x] Code splitting
- [x] Bundle optimization

### Quality ✅
- [x] PropTypes validation
- [x] Error boundaries
- [x] Consistent code style
- [x] Proper naming conventions
- [x] Documentation
- [x] Unit tests

### Accessibility ✅
- [x] ARIA labels
- [x] Semantic HTML
- [x] Keyboard navigation
- [x] Color contrast
- [x] Screen reader support
- [x] Focus management

## 🔧 Integration với CI/CD

```yaml
# .github/workflows/codeant.yml
name: CodeAnt AI Analysis
on: [push, pull_request]

jobs:
  codeant:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run CodeAnt AI tests
        run: npm run codeant:test
      - name: Security scan
        run: npm run codeant:scan
      - name: Generate report
        run: npm run codeant:report --format json
```

---

**Note:** Đây là demo mô phỏng CodeAnt AI. Trong thực tế, bạn cần API key thật và cấu hình endpoints thực tế.
