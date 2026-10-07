"use client";

import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup' | 'edit_profile';
  isLoggedIn: boolean;
  currentUsername: string;
  currentAvatar: string;
  onLoginSuccess: (name: string, avatar: string) => void;
  onLogout: () => void;
}

const AVATARS = ['⚡', '🧠', '👑', '🔥', '🎯', '🚀', '⭐', '📐', '🎲', '📊'];

export default function AuthModal({
  isOpen,
  onClose,
  mode: initialMode,
  isLoggedIn,
  currentUsername,
  currentAvatar,
  onLoginSuccess,
  onLogout
}: AuthModalProps) {
  const [modalMode, setModalMode] = useState<'login' | 'signup' | 'edit_profile'>(initialMode);
  const [username, setUsername] = useState(currentUsername || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(currentAvatar || '⚡');
  const [grade, setGrade] = useState('12th Grade - Science');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter a username / nickname!');
      return;
    }

    if (modalMode === 'login') {
      if (!password) {
        setErrorMessage('Please enter a password!');
        return;
      }
      onLoginSuccess(username.trim(), avatar);
      setSuccessText(`Successfully logged in! Welcome, ${username.trim()}!`);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onClose();
      }, 1400);
    } else if (modalMode === 'signup') {
      if (password.length < 3) {
        setErrorMessage('Password must be at least 3 characters!');
        return;
      }
      onLoginSuccess(username.trim(), avatar);
      setSuccessText(`Account successfully created! Welcome to Math101, ${username.trim()}!`);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onClose();
      }, 1400);
    } else if (modalMode === 'edit_profile') {
      if (!isLoggedIn) {
        setErrorMessage('You must login first to edit your profile!');
        setModalMode('login');
        return;
      }
      onLoginSuccess(username.trim(), avatar);
      setSuccessText('Profile and avatar successfully updated!');
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1400);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" data-lenis-prevent="true" onClick={handleBackdropClick}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-start' }}>
          <button 
            type="button" 
            onClick={onClose} 
            aria-label="Back"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: 'none'
            }}
          >
            ←
          </button>
          {modalMode === 'edit_profile' ? (
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>
              Player Profile Settings
            </div>
          ) : (
            <div className="game-badge">
              {modalMode === 'login' && '🔑 Login to Account'}
              {modalMode === 'signup' && '✨ Create New Student Account'}
            </div>
          )}
        </div>

        {isSuccess ? (
          <div className="modal-success-box">
            <div className="success-icon">🎉</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.8rem' }}>{successText}</h3>
            <div className="user-preview-pill">
              <span>{avatar}</span>
              <strong>{username}</strong>
            </div>
            <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>
              Preparing learning session and game...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {modalMode !== 'edit_profile' && (
              <h2 className="modal-title">
                {modalMode === 'login' && 'Login to Math101 Account'}
                {modalMode === 'signup' && 'Register New Account'}
              </h2>
            )}
            {modalMode !== 'edit_profile' && (
              <p className="modal-subtitle">
                {modalMode === 'login' && 'Login to save your quiz score records and play on the leaderboard.'}
                {modalMode === 'signup' && 'Choose your favorite avatar, create a nickname, and start your math adventure!'}
              </p>
            )}

            {errorMessage && (
              <div className="auth-error-banner">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Username Input */}
            <div className="form-group">
              <label className="form-label">Username / Nickname:</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Example: Arya_MathAce"
                className="modal-input"
                autoComplete="username"
                required
              />
            </div>

            {(modalMode === 'signup' || modalMode === 'edit_profile') && (
              <div className="form-group">
                <label className="form-label">Choose Character Avatar:</label>
                <div className="avatar-grid">
                  {AVATARS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`avatar-btn ${avatar === item ? 'active' : ''}`}
                      onClick={() => setAvatar(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Password Input (Login & Signup only) */}
            {modalMode !== 'edit_profile' && (
              <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="modal-input"
                  autoComplete={modalMode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
              </div>
            )}

            {/* Grade Selection */}
            {modalMode === 'signup' && (
              <div className="form-group">
                <label className="form-label">Education Level:</label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="modal-select"
                >
                  <option value="12th Grade - Science">12th Grade - Science</option>
                  <option value="12th Grade - Social">12th Grade - Social</option>
                  <option value="UTBK / SNBT Prep">UTBK / SNBT Prep</option>
                  <option value="General">General / Math Enthusiast</option>
                </select>
              </div>
            )}

            {/* Modal Switchers */}
            <div className="auth-mode-switch">
              {modalMode === 'login' && (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setModalMode('signup');
                      setErrorMessage('');
                    }}
                  >
                    Register here
                  </button>
                </p>
              )}
              {modalMode === 'signup' && (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setModalMode('login');
                      setErrorMessage('');
                    }}
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>

            <div className="modal-actions" style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button type="submit" className="btn-modal-submit" style={{ flex: 1 }}>
                {modalMode === 'login' && '🚀 Login Now'}
                {modalMode === 'signup' && '✨ Create Account & Login'}
                {modalMode === 'edit_profile' && '💾 Save'}
              </button>

              {modalMode === 'edit_profile' && isLoggedIn && (
                <button
                  type="button"
                  className="btn-modal-logout"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  style={{ flex: 1 }}
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
