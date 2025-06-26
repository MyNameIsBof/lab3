// Test Cases for CodeAnt AI Demo
// This file demonstrates various security vulnerabilities and code quality issues

// ❌ TEST CASE 1: SQL Injection Vulnerability
export const vulnerableUserQuery = (userId) => {
  // Vulnerable to SQL injection
  return `SELECT * FROM users WHERE id = '${userId}'`;
  // Should be: prepared statement with parameterized query
};

// ❌ TEST CASE 2: XSS Vulnerability
export const vulnerableHtmlRender = (userInput) => {
  document.getElementById('content').innerHTML = userInput;
  // Should be: DOMPurify.sanitize(userInput) or use React state
};

// ❌ TEST CASE 3: Insecure Random Number Generation
export const insecureToken = () => {
  return Math.random().toString(36).substring(7);
  // Should be: crypto.getRandomValues() or crypto.randomUUID()
};

// ❌ TEST CASE 4: Hardcoded Credentials
export const apiConfig = {
  apiKey: 'sk-1234567890abcdef', // Hardcoded secret
  database: 'mongodb://admin:password123@localhost:27017/db',
  jwt_secret: 'my-super-secret-key'
  // Should be: process.env.API_KEY, etc.
};

// ❌ TEST CASE 5: Weak Password Validation
export const weakPasswordCheck = (password) => {
  return password.length > 6; // Too weak
  // Should be: complex validation with multiple criteria
};

// ❌ TEST CASE 6: Unvalidated Redirects
export const unsafeRedirect = (url) => {
  window.location.href = url; // Open redirect vulnerability
  // Should be: validate against whitelist of allowed domains
};

// ❌ TEST CASE 7: Insecure File Upload
export const handleFileUpload = (file) => {
  // No validation of file type or size
  const formData = new FormData();
  formData.append('file', file);
  return fetch('/upload', { method: 'POST', body: formData });
  // Should be: validate file type, size, scan for malware
};

// ❌ TEST CASE 8: Race Condition
let counter = 0;
export const incrementCounter = () => {
  // Race condition - not thread safe
  const temp = counter;
  setTimeout(() => {
    counter = temp + 1;
  }, 1);
  // Should be: use atomic operations or locks
};

// ❌ TEST CASE 9: Memory Leak
export const memoryLeakExample = () => {
  const data = new Array(1000000).fill('memory leak');
  setInterval(() => {
    console.log('Still running...', data.length);
  }, 1000);
  // No cleanup - memory leak
  // Should be: clear interval and cleanup references
};

// ❌ TEST CASE 10: Insecure Deserialization
export const unsafeDeserialize = (jsonString) => {
  return eval(`(${jsonString})`); // Never use eval!
  // Should be: JSON.parse() with proper validation
};

// ❌ TEST CASE 11: CSRF Vulnerability
export const vulnerableFormSubmit = (data) => {
  // No CSRF protection
  return fetch('/api/transfer-money', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  // Should be: include CSRF token and validate origin
};

// ❌ TEST CASE 12: Information Disclosure
export const verboseErrorHandler = (error) => {
  console.log('Database connection string:', process.env.DB_CONNECTION);
  console.log('Full error stack:', error.stack);
  alert(`Error: ${error.message}\nStack: ${error.stack}`);
  // Should be: log securely, show generic error to user
};

// ❌ TEST CASE 13: Insufficient Access Control
export const deleteUser = (userId, currentUser) => {
  // No authorization check
  return fetch(`/api/users/${userId}`, { method: 'DELETE' });
  // Should be: verify currentUser has permission to delete userId
};

// ❌ TEST CASE 14: Unencrypted Data Storage
export const storeUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData)); // Plain text storage
  // Should be: encrypt sensitive data before storage
};

// ❌ TEST CASE 15: Timing Attack Vulnerability
export const vulnerablePasswordCheck = (inputPassword, correctPassword) => {
  return inputPassword === correctPassword; // Timing attack possible
  // Should be: use constant-time comparison
};

export default {
  vulnerableUserQuery,
  vulnerableHtmlRender,
  insecureToken,
  apiConfig,
  weakPasswordCheck,
  unsafeRedirect,
  handleFileUpload,
  incrementCounter,
  memoryLeakExample,
  unsafeDeserialize,
  vulnerableFormSubmit,
  verboseErrorHandler,
  deleteUser,
  storeUserData,
  vulnerablePasswordCheck
};
