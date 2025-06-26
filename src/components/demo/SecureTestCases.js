// Solutions for CodeAnt AI Demo Test Cases
// This file shows the corrected, secure versions of the vulnerable code

import DOMPurify from 'dompurify';
import CryptoJS from 'crypto-js';

// ✅ SOLUTION 1: Secure Database Query (Parameterized)
export const secureUserQuery = (userId) => {
  // Use parameterized queries to prevent SQL injection
  return {
    query: 'SELECT * FROM users WHERE id = ?',
    params: [userId]
  };
  // In practice: db.query('SELECT * FROM users WHERE id = ?', [userId])
};

// ✅ SOLUTION 2: XSS Prevention
export const secureHtmlRender = (userInput) => {
  // Sanitize input to prevent XSS attacks
  const sanitizedInput = DOMPurify.sanitize(userInput);
  const element = document.getElementById('content');
  if (element) {
    element.textContent = sanitizedInput; // Use textContent instead of innerHTML
  }
  // Better: Use React state and proper rendering
};

// ✅ SOLUTION 3: Cryptographically Secure Random Generation
export const secureToken = () => {
  // Use crypto API for secure random generation
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// ✅ SOLUTION 4: Environment-based Configuration
export const secureApiConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  database: import.meta.env.VITE_DATABASE_URL,
  jwtSecret: import.meta.env.VITE_JWT_SECRET,
  // Validate that required env vars are present
  validate() {
    const required = ['VITE_API_KEY', 'VITE_DATABASE_URL', 'VITE_JWT_SECRET'];
    const missing = required.filter(key => !import.meta.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
};

// ✅ SOLUTION 5: Strong Password Validation
export const strongPasswordCheck = (password) => {
  if (!password || typeof password !== 'string') return false;
  
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const noCommonPatterns = !/^(password|123456|qwerty)/i.test(password);
  
  return {
    isValid: password.length >= minLength && 
             hasUpperCase && 
             hasLowerCase && 
             hasNumbers && 
             hasSpecialChar && 
             noCommonPatterns,
    criteria: {
      length: password.length >= minLength,
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      numbers: hasNumbers,
      special: hasSpecialChar,
      secure: noCommonPatterns
    }
  };
};

// ✅ SOLUTION 6: Validated Redirects
export const safeRedirect = (url) => {
  // Whitelist of allowed domains
  const allowedDomains = [
    'example.com',
    'app.example.com',
    'secure.example.com'
  ];
  
  try {
    const urlObj = new URL(url);
    const isAllowed = allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
    
    if (isAllowed) {
      window.location.href = url;
    } else {
      console.warn('Redirect blocked: unauthorized domain');
      // Redirect to safe default
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Invalid URL provided for redirect');
    window.location.href = '/';
  }
};

// ✅ SOLUTION 7: Secure File Upload
export const secureFileUpload = async (file) => {
  // File validation
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed');
  }
  
  if (file.size > maxSize) {
    throw new Error('File size too large');
  }
  
  // Additional security checks
  const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, ''); // Sanitize filename
  
  const formData = new FormData();
  formData.append('file', file, fileName);
  formData.append('checksum', await calculateFileChecksum(file));
  
  return fetch('/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'X-CSRF-Token': getCsrfToken()
    }
  });
};

// Helper function for file checksum
const calculateFileChecksum = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// ✅ SOLUTION 8: Thread-safe Counter
class SafeCounter {
  constructor() {
    this.counter = 0;
    this.lock = false;
  }
  
  async increment() {
    // Simple lock mechanism for demonstration
    while (this.lock) {
      await new Promise(resolve => setTimeout(resolve, 1));
    }
    
    this.lock = true;
    const temp = this.counter;
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1));
    this.counter = temp + 1;
    this.lock = false;
    
    return this.counter;
  }
  
  getValue() {
    return this.counter;
  }
}

export const safeCounter = new SafeCounter();

// ✅ SOLUTION 9: Memory Management
export const memoryManagedExample = () => {
  const data = new Array(1000).fill('managed memory'); // Smaller array
  
  const intervalId = setInterval(() => {
    console.log('Running with cleanup...', data.length);
  }, 5000); // Less frequent
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    data.length = 0; // Clear array
    console.log('Memory cleaned up');
  };
};

// ✅ SOLUTION 10: Secure Deserialization
export const safeDeserialize = (jsonString) => {
  try {
    // Validate JSON string before parsing
    if (typeof jsonString !== 'string' || jsonString.trim() === '') {
      throw new Error('Invalid JSON string');
    }
    
    const parsed = JSON.parse(jsonString);
    
    // Additional validation of the parsed object
    return validateParsedObject(parsed);
  } catch (error) {
    console.error('Deserialization failed:', error.message);
    return null;
  }
};

const validateParsedObject = (obj) => {
  // Implement object validation logic based on expected schema
  if (obj && typeof obj === 'object') {
    // Remove potentially dangerous properties
    delete obj.__proto__;
    delete obj.constructor;
    return obj;
  }
  throw new Error('Invalid object structure');
};

// ✅ SOLUTION 11: CSRF Protection
export const secureFormSubmit = async (data) => {
  const csrfToken = getCsrfToken();
  
  return fetch('/api/transfer-money', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      ...data,
      _token: csrfToken
    }),
    credentials: 'same-origin'
  });
};

const getCsrfToken = () => {
  const tokenMeta = document.querySelector('meta[name="csrf-token"]');
  return tokenMeta ? tokenMeta.getAttribute('content') : '';
};

// ✅ SOLUTION 12: Secure Error Handling
export const secureErrorHandler = (error) => {
  // Log detailed error securely (server-side only)
  if (import.meta.env.DEV) {
    console.error('Development error:', {
      message: error.message,
      stack: error.stack
    });
  }
  
  // Send error to monitoring service (without sensitive data)
  sendErrorToMonitoring({
    message: error.message,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  });
  
  // Show generic error to user
  alert('An error occurred. Please try again or contact support.');
};

const sendErrorToMonitoring = (errorInfo) => {
  // Send to error monitoring service like Sentry
  console.log('Error sent to monitoring:', errorInfo);
};

// ✅ SOLUTION 13: Proper Access Control
export const secureDeleteUser = async (userId, currentUser) => {
  // Check authorization
  if (!currentUser || !currentUser.permissions) {
    throw new Error('Unauthorized: No permissions');
  }
  
  const canDeleteUser = currentUser.permissions.includes('delete_user') ||
                       currentUser.role === 'admin' ||
                       currentUser.id === userId; // Can delete own account
  
  if (!canDeleteUser) {
    throw new Error('Unauthorized: Insufficient permissions');
  }
  
  // Additional checks for admin accounts
  if (currentUser.role === 'admin' && userId !== currentUser.id) {
    const targetUser = await fetchUserById(userId);
    if (targetUser.role === 'super_admin') {
      throw new Error('Cannot delete super admin accounts');
    }
  }
  
  return fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'X-CSRF-Token': getCsrfToken()
    }
  });
};

// ✅ SOLUTION 14: Encrypted Data Storage
export const secureStoreUserData = (userData) => {
  const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key';
  
  // Separate sensitive and non-sensitive data
  const { password, ssn, creditCard, ...nonSensitiveData } = userData;
  
  // Encrypt sensitive data
  const sensitiveData = { password, ssn, creditCard };
  const encryptedSensitive = CryptoJS.AES.encrypt(
    JSON.stringify(sensitiveData),
    encryptionKey
  ).toString();
  
  // Store non-sensitive data normally
  localStorage.setItem('user', JSON.stringify(nonSensitiveData));
  
  // Store encrypted sensitive data separately with expiration
  const sensitiveWithExpiry = {
    data: encryptedSensitive,
    expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  localStorage.setItem('user_sensitive', JSON.stringify(sensitiveWithExpiry));
};

// ✅ SOLUTION 15: Constant-time Password Comparison
export const securePasswordCheck = (inputPassword, correctPassword) => {
  if (typeof inputPassword !== 'string' || typeof correctPassword !== 'string') {
    return false;
  }
  
  // Ensure both strings are the same length for constant-time comparison
  const maxLength = Math.max(inputPassword.length, correctPassword.length);
  const paddedInput = inputPassword.padEnd(maxLength, '\0');
  const paddedCorrect = correctPassword.padEnd(maxLength, '\0');
  
  let result = 0;
  for (let i = 0; i < maxLength; i++) {
    result |= paddedInput.charCodeAt(i) ^ paddedCorrect.charCodeAt(i);
  }
  
  return result === 0 && inputPassword.length === correctPassword.length;
};

// Helper functions
const fetchUserById = async (userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    headers: { 'Authorization': `Bearer ${getAuthToken()}` }
  });
  return response.json();
};

const getAuthToken = () => {
  return localStorage.getItem('auth_token') || '';
};

export default {
  secureUserQuery,
  secureHtmlRender,
  secureToken,
  secureApiConfig,
  strongPasswordCheck,
  safeRedirect,
  secureFileUpload,
  safeCounter,
  memoryManagedExample,
  safeDeserialize,
  secureFormSubmit,
  secureErrorHandler,
  secureDeleteUser,
  secureStoreUserData,
  securePasswordCheck
};
