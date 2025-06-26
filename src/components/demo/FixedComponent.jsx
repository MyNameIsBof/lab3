// SOLUTION: Fixed Component with Best Practices
// This component demonstrates how CodeAnt AI suggestions would improve the code

import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DOMPurify from 'dompurify';

// ✅ SOLUTION: Added PropTypes validation
// ✅ SOLUTION: Used React.memo for performance optimization
const FixedComponent = memo(({ userId, onError }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ SOLUTION: Memoized fetch function to prevent unnecessary re-renders
  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // ✅ SOLUTION: API key sent in headers, not URL
      const response = await axios.get(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000 // ✅ SOLUTION: Added timeout
      });
      
      setUserData(response.data);
    } catch (err) {
      // ✅ SOLUTION: Safe error handling without exposing sensitive data
      const userFriendlyMessage = err.response?.status === 404 
        ? 'User not found' 
        : 'Failed to load user data';
      
      setError(userFriendlyMessage);
      
      // ✅ SOLUTION: Safe error logging for development
      if (import.meta.env.DEV) {
        console.error('User fetch error:', {
          status: err.response?.status,
          message: err.message
        });
      }
      
      // ✅ SOLUTION: Notify parent component of errors
      onError?.(userFriendlyMessage);
    } finally {
      setIsLoading(true);
    }
  }, [userId, onError]);

  // ✅ SOLUTION: Proper useEffect with cleanup and reasonable polling interval
  useEffect(() => {
    fetchUserData();
    
    // ✅ SOLUTION: Reasonable polling interval (30 seconds instead of 1 second)
    const interval = setInterval(fetchUserData, 30000);
    
    // ✅ SOLUTION: Cleanup function to prevent memory leaks
    return () => {
      clearInterval(interval);
    };
  }, [fetchUserData]);

  // ✅ SOLUTION: Safe input handling with sanitization
  const handleUserInput = useCallback((input) => {
    // ✅ SOLUTION: Input validation
    if (!input || typeof input !== 'string') return;
    
    // ✅ SOLUTION: Sanitize input to prevent XSS
    const sanitizedInput = DOMPurify.sanitize(input);
    
    // ✅ SOLUTION: Use React state instead of direct DOM manipulation
    setUserData(prev => ({
      ...prev,
      userMessage: sanitizedInput
    }));
  }, []);

  // ✅ SOLUTION: Proper search function with encoding
  const searchUsers = useCallback(async (query) => {
    if (!query?.trim()) return [];
    
    try {
      // ✅ SOLUTION: Proper URL encoding to prevent injection
      const encodedQuery = encodeURIComponent(query.trim());
      const response = await fetch(`/api/search?q=${encodedQuery}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
      });
      
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }, []);

  // ✅ SOLUTION: Strong password validation
  const validatePassword = useCallback((password) => {
    if (!password || typeof password !== 'string') return false;
    
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
  }, []);

  // ✅ SOLUTION: Proper delete handler with confirmation
  const handleDeleteUser = useCallback(async () => {
    if (!userData?.permissions?.canDelete) {
      setError('You do not have permission to delete this user');
      return;
    }

    // ✅ SOLUTION: Use modern confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) throw new Error('Delete failed');
      
      // ✅ SOLUTION: Notify parent component
      onError?.('User deleted successfully');
    } catch (error) {
      setError('Failed to delete user');
      console.error('Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userData, userId, onError]);

  // ✅ SOLUTION: Proper loading component
  if (isLoading) {
    return (
      <div className="loading-container" role="status" aria-label="Loading user data">
        <div className="spinner" aria-hidden="true"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      {/* ✅ SOLUTION: Proper semantic HTML with accessibility */}
      <header>
        <h2 id="dashboard-title">User Dashboard</h2>
      </header>
      
      <main aria-labelledby="dashboard-title">
        {/* ✅ SOLUTION: Safe rendering of user data */}
        {userData && (
          <section className="user-info" aria-label="User information">
            <h3>{userData.name}</h3>
            <p>Email: <span className="email">{userData.email}</span></p>
            {userData.userMessage && (
              <div className="user-message">
                Message: {userData.userMessage}
              </div>
            )}
          </section>
        )}

        {/* ✅ SOLUTION: Accessible error display */}
        {error && (
          <div 
            className="error-message" 
            role="alert" 
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* ✅ SOLUTION: Proper form with validation */}
        <section className="user-input" aria-label="User message input">
          <label htmlFor="message-input" className="input-label">
            Enter your message:
          </label>
          <input 
            id="message-input"
            type="text"
            className="message-input"
            placeholder="Type your message here"
            maxLength={500}
            onChange={(e) => handleUserInput(e.target.value)}
            aria-describedby="message-help"
          />
          <small id="message-help" className="help-text">
            Maximum 500 characters
          </small>
        </section>

        {/* ✅ SOLUTION: Proper list rendering with keys and lazy loading */}
        {userData?.friends?.length > 0 && (
          <section className="friends-list" aria-label="Friends list">
            <h3>Friends</h3>
            <ul className="friends-grid">
              {userData.friends.map((friend) => (
                <li key={friend.id} className="friend-item">
                  <img 
                    src={friend.avatar} 
                    alt={`${friend.name}'s avatar`}
                    className="friend-avatar"
                    loading="lazy" // ✅ SOLUTION: Lazy loading
                    onError={(e) => {
                      e.target.src = '/default-avatar.png'; // ✅ SOLUTION: Fallback image
                    }}
                  />
                  <span className="friend-name">{friend.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ✅ SOLUTION: Proper button with accessibility and styling */}
        {userData?.permissions?.canDelete && (
          <section className="danger-zone">
            <h3>Danger Zone</h3>
            <button 
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteUser}
              disabled={isLoading}
              aria-describedby="delete-warning"
            >
              {isLoading ? 'Deleting...' : 'Delete User'}
            </button>
            <p id="delete-warning" className="warning-text">
              This action cannot be undone
            </p>
          </section>
        )}
      </main>
    </div>
  );
});

// ✅ SOLUTION: Proper display name for debugging
FixedComponent.displayName = 'FixedComponent';

// ✅ SOLUTION: PropTypes validation
FixedComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  onError: PropTypes.func
};

// ✅ SOLUTION: Default props
FixedComponent.defaultProps = {
  onError: null
};

export default FixedComponent;
