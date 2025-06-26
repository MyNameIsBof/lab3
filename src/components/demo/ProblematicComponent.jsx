// DEMO: Problematic Component with Multiple Issues
// This component demonstrates various code quality and security issues
// that CodeAnt AI would detect and provide solutions for

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ❌ ISSUE 1: Missing PropTypes validation
// ❌ ISSUE 2: Unsafe direct DOM manipulation
// ❌ ISSUE 3: Memory leak potential
// ❌ ISSUE 4: Security vulnerability - XSS
// ❌ ISSUE 5: Performance issues
const ProblematicComponent = ({ userId, apiKey }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ❌ ISSUE 6: useEffect without cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Polling user data...');
      fetchUserData();
    }, 1000); // ❌ ISSUE 7: Too frequent polling
    
    // Missing cleanup!
  }, [userId]);

  // ❌ ISSUE 8: Async function without proper error handling
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // ❌ ISSUE 9: API key exposed in URL
      const response = await axios.get(`/api/users/${userId}?apiKey=${apiKey}`);
      setUserData(response.data);
      
      // ❌ ISSUE 10: Dangerous innerHTML usage
      document.getElementById('user-info').innerHTML = `
        <h3>Welcome ${response.data.name}</h3>
        <p>Email: ${response.data.email}</p>
      `;
    } catch (err) {
      // ❌ ISSUE 11: Exposing sensitive error information
      setError(`API Error: ${err.response?.data?.message || err.message}`);
      console.error('Full error object:', err); // ❌ ISSUE 12: Logging sensitive data
    }
    setIsLoading(false);
  };

  // ❌ ISSUE 13: No input validation
  const handleUserInput = (input) => {
    // Direct assignment without sanitization
    document.querySelector('.user-message').innerHTML = input;
  };

  // ❌ ISSUE 14: Hardcoded secrets
  const SECRET_TOKEN = 'sk-1234567890abcdef'; // ❌ Should be in environment variables
  const API_ENDPOINT = 'https://api.example.com/v1/users'; // ❌ Should be configurable

  // ❌ ISSUE 15: SQL injection vulnerability (if this were a backend)
  const searchUsers = (query) => {
    // This would be vulnerable: `SELECT * FROM users WHERE name = '${query}'`
    return fetch(`/search?q=${query}`); // ❌ No encoding
  };

  // ❌ ISSUE 16: Weak password validation
  const validatePassword = (password) => {
    return password.length > 6; // ❌ Too weak validation
  };

  // ❌ ISSUE 17: No loading state handling
  if (isLoading) {
    return <div>Loading...</div>; // ❌ No proper loading component
  }

  return (
    <div className="problematic-component">
      {/* ❌ ISSUE 18: Missing accessibility attributes */}
      <h2>User Dashboard</h2>
      
      {/* ❌ ISSUE 19: Dangerous HTML rendering */}
      <div id="user-info"></div>
      
      {error && (
        // ❌ ISSUE 20: Exposing error details to users
        <div className="error" style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}

      {/* ❌ ISSUE 21: Missing form validation */}
      <input 
        type="text"
        placeholder="Enter message"
        onChange={(e) => handleUserInput(e.target.value)}
      />

      {/* ❌ ISSUE 22: No key prop in list items */}
      {userData?.friends?.map(friend => (
        <div>
          <img src={friend.avatar} alt="avatar" /> {/* ❌ ISSUE 23: No lazy loading */}
          <span>{friend.name}</span>
        </div>
      ))}

      {/* ❌ ISSUE 24: Inline styles instead of CSS classes */}
      <button 
        style={{ 
          backgroundColor: '#ff0000', 
          padding: '10px',
          border: 'none',
          color: 'white'
        }}
        onClick={() => {
          // ❌ ISSUE 25: Complex logic in JSX
          if (userData && userData.permissions && userData.permissions.canDelete) {
            if (confirm('Are you sure?')) { // ❌ ISSUE 26: Using deprecated confirm()
              fetch('/api/delete-user', {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${SECRET_TOKEN}` // ❌ Exposed token
                }
              });
            }
          }
        }}
      >
        Delete User
      </button>
    </div>
  );
};

// ❌ ISSUE 27: No default props
// ❌ ISSUE 28: No memo optimization for expensive component

export default ProblematicComponent;
