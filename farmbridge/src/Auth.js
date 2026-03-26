import React, { useState } from 'react';
import './Auth.css';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [farmerName, setFarmerName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyFarmerName = async (nameToCheck) => {
    if (isLogin || !nameToCheck.trim()) {
      setNameError('');
      return;
    }
    
    setIsVerifying(true);
    try {
      const response = await fetch(`http://localhost:5000/api/verify-user?farmerName=${encodeURIComponent(nameToCheck)}`);
      const data = await response.json();
      
      if (!data.isAvailable) {
        setNameError('This Farmer Name is already taken.');
      } else {
        setNameError('');
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFarmerName(val);
  };

  // Optional: Verify on blur instead of every keystroke for better performance
  const handleNameBlur = () => {
    verifyFarmerName(farmerName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!farmerName.trim() || !password.trim()) {
      alert("Please enter both Farmer Name and Password");
      return;
    }
    
    if (!isLogin && nameError) {
      alert("Please choose an available Farmer Name.");
      return;
    }

    try {
      const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ farmerName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user || { name: farmerName });
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Error connecting to the server. Please check your connection.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">FB</div>
          <h2>FarmBridge</h2>
          <p>Empowering Indian Farmers</p>
        </div>
        
        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="farmerName">Farmer Name</label>
            <input 
              type="text" 
              id="farmerName"
              placeholder="Enter your name"
              value={farmerName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              required
              className={nameError ? 'error-input' : ''}
            />
            {!isLogin && isVerifying && <span className="helper-text verifying">Verifying availability...</span>}
            {!isLogin && nameError && <span className="helper-text error">{nameError}</span>}
            {!isLogin && !nameError && farmerName.trim() && !isVerifying && <span className="helper-text success">Name available!</span>}
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Sign In to FarmBridge' : 'Create FarmBridge Account'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>New to FarmBridge? <span className="auth-link" onClick={() => setIsLogin(false)}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span className="auth-link" onClick={() => setIsLogin(true)}>Sign In</span></p>
          )}
        </div>
      </div>
    </div>
  );
}
