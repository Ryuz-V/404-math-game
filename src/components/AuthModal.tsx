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
  const [grade, setGrade] = useState('Kelas 12 SMA - IPA');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Silakan masukkan nama pengguna / nickname!');
      return;
    }

    if (modalMode === 'login') {
      if (!password) {
        setErrorMessage('Silakan masukkan password!');
        return;
      }
      onLoginSuccess(username.trim(), avatar);
      setSuccessText(`Berhasil masuk! Selamat datang, ${username.trim()}!`);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onClose();
      }, 1400);
    } else if (modalMode === 'signup') {
      if (password.length < 3) {
        setErrorMessage('Password minimal 3 karakter!');
        return;
      }
      onLoginSuccess(username.trim(), avatar);
      setSuccessText(`Akun berhasil dibuat! Selamat datang di Math101, ${username.trim()}!`);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onClose();
      }, 1400);
    } else if (modalMode === 'edit_profile') {
      if (!isLoggedIn) {
        setErrorMessage('Anda harus login terlebih dahulu untuk mengubah profil!');
        setModalMode('login');
        return;
      }
      onLoginSuccess(username.trim(), avatar);
      setSuccessText('Profil dan avatar berhasil diperbarui!');
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
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-start' }}>
          <button 
            type="button" 
            onClick={onClose} 
            aria-label="Kembali"
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
              Pengaturan Profil Pemain
            </div>
          ) : (
            <div className="game-badge">
              {modalMode === 'login' && '🔑 Masuk ke Akun'}
              {modalMode === 'signup' && '✨ Buat Akun Murid Baru'}
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
              Menyiapkan sesi belajar dan permainan...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {modalMode !== 'edit_profile' && (
              <h2 className="modal-title">
                {modalMode === 'login' && 'Login ke Akun Math101'}
                {modalMode === 'signup' && 'Daftar Akun Baru'}
              </h2>
            )}
            {modalMode !== 'edit_profile' && (
              <p className="modal-subtitle">
                {modalMode === 'login' && 'Masuk untuk menyimpan rekor skor kuis dan bermain di papan peringkat.'}
                {modalMode === 'signup' && 'Pilih avatar favoritmu, buat nickname, dan mulai petualangan matematika!'}
              </p>
            )}

            {errorMessage && (
              <div className="auth-error-banner">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Username Input */}
            <div className="form-group">
              <label className="form-label">Username / Nama Panggilan:</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Contoh: Arya_MathAce"
                className="modal-input"
                autoComplete="username"
                required
              />
            </div>

            {(modalMode === 'signup' || modalMode === 'edit_profile') && (
              <div className="form-group">
                <label className="form-label">Pilih Avatar Karakter:</label>
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
                  placeholder="Masukkan kata sandi..."
                  className="modal-input"
                  autoComplete={modalMode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
              </div>
            )}

            {/* Grade Selection */}
            {modalMode === 'signup' && (
              <div className="form-group">
                <label className="form-label">Tingkat Pendidikan:</label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="modal-select"
                >
                  <option value="Kelas 12 SMA - IPA">Kelas 12 SMA - IPA</option>
                  <option value="Kelas 12 SMA - IPS">Kelas 12 SMA - IPS</option>
                  <option value="Persiapan UTBK / SNBT">Persiapan UTBK / SNBT</option>
                  <option value="Umum">Umum / Pecinta Matematika</option>
                </select>
              </div>
            )}

            {/* Modal Switchers */}
            <div className="auth-mode-switch">
              {modalMode === 'login' && (
                <p>
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setModalMode('signup');
                      setErrorMessage('');
                    }}
                  >
                    Daftar di sini
                  </button>
                </p>
              )}
              {modalMode === 'signup' && (
                <p>
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setModalMode('login');
                      setErrorMessage('');
                    }}
                  >
                    Masuk di sini
                  </button>
                </p>
              )}
            </div>

            <div className="modal-actions" style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button type="submit" className="btn-modal-submit" style={{ flex: 1 }}>
                {modalMode === 'login' && '🚀 Masuk Sekarang'}
                {modalMode === 'signup' && '✨ Buat Akun & Masuk'}
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
