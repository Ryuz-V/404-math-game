"use client";
import React, { useState } from 'react';
import { login } from '../app/actions/auth';

interface LoginProps {
  onClose?: () => void;
  onSwitchToSignup?: () => void;
  onLoginSuccess?: (name: string, avatar: string) => void;
}

export default function Login({ onClose, onSwitchToSignup, onLoginSuccess }: LoginProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.user) {
      if (onLoginSuccess) {
        onLoginSuccess(result.user.name || 'User', result.user.avatar || '👑');
      }
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      display: 'flex',
      flexDirection: 'column',
      color: '#000000',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px'
      }}>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#52656d',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <button 
          onClick={onSwitchToSignup}
          style={{
          backgroundColor: '#fff',
          border: '2.5px solid #000',
          color: '#000',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: 800,
          fontSize: '14px',
          letterSpacing: '0.8px',
          cursor: 'pointer',
          boxShadow: '3px 3px 0px 0px #000',
          transition: 'all 0.1s ease',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = '1px 1px 0px 0px #000';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translate(0)';
          e.currentTarget.style.boxShadow = '3px 3px 0px 0px #000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0)';
          e.currentTarget.style.boxShadow = '3px 3px 0px 0px #000';
        }}>
          SIGN UP
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px 120px 24px'
      }}>
        
        {/* The Card */}
        <div style={{
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'translate(5px, -16px)'
        }}>
          {/* Header Text */}
          <h2 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#000',
            alignSelf: 'center',
            margin: '0 0 24px 0',
            letterSpacing: '-0.5px'
          }}>
            Login
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {error && (
              <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 800, fontSize: '14px', color: '#000' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your Email" 
                  className="modal-input"
                  style={{ boxSizing: 'border-box', width: '100%' }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontWeight: 800, fontSize: '14px', color: '#000' }}>Password</label>
                <button type="button" style={{
                  background: 'none',
                  border: 'none',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password" 
                  className="modal-input"
                  style={{ boxSizing: 'border-box', width: '100%', paddingRight: '48px' }}
                />
              </div>
            </div>

            {/* Login Button */}
            <button type="submit" disabled={loading} style={{
              width: '100%',
              backgroundColor: '#fff',
              color: '#000',
              border: '3px solid #000',
              borderRadius: '12px',
              padding: '14px 0',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '4px 4px 0px 0px #000',
              marginTop: '12px',
              transition: 'all 0.1s ease',
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000';
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translate(0)';
                e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translate(0)';
                e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000';
              }
            }}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginBottom: '24px'
          }}>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#e5e7eb' }}></div>
            <span style={{ margin: '0 16px', color: '#9ca3af', fontWeight: 800, fontSize: '13px' }}>
              OR
            </span>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#e5e7eb' }}></div>
          </div>

          {/* Social Buttons */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: '#fff',
              border: '2.5px solid #000',
              borderRadius: '12px',
              padding: '12px 0',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '3px 3px 0px 0px #000',
              transition: 'all 0.1s ease',
            }}
            >
              <svg style={{ position: 'absolute', left: '20px' }} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span style={{ color: '#000', fontWeight: 800, fontSize: '14px' }}>Continue with Google</span>
            </button>
          </div>
          <div style={{ marginTop: '32px', textAlign: 'center', width: '100%', padding: '0 8px' }}>
            <p style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, lineHeight: 1.5 }}>
              Protected by reCAPTCHA Enterprise. Google&apos;s <span style={{ fontWeight: 800, color: '#000' }}>Privacy Policy</span> and <span style={{ fontWeight: 800, color: '#000' }}>Terms of Service</span> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
