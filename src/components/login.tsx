"use client";
import React from 'react';

interface LoginProps {
  onClose?: () => void;
}

export default function Login({ onClose }: LoginProps) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#131f24',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      color: 'white',
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
        
        <button style={{
          background: 'none',
          border: '2px solid #37464f',
          color: '#1cb0f6',
          padding: '10px 16px',
          borderRadius: '16px',
          fontWeight: 800,
          fontSize: '14px',
          letterSpacing: '0.8px',
          cursor: 'pointer'
        }}>
          DAFTAR
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '32px',
        maxWidth: '400px',
        margin: '0 auto',
        width: '100%',
        padding: '0 24px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          marginBottom: '32px',
          color: 'white'
        }}>
          Masuk
        </h1>

        {/* Form */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {/* Email Input */}
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Email atau nama pengguna" 
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: '2px solid #37464f',
                borderRadius: '16px',
                padding: '14px 16px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                outline: 'none',
                boxSizing: 'border-box'
              }} 
            />
          </div>

          {/* Password Input */}
          <div style={{ position: 'relative' }}>
            <input 
              type="password" 
              placeholder="Kata sandi" 
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: '2px solid #37464f',
                borderRadius: '16px',
                padding: '14px 16px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                outline: 'none',
                boxSizing: 'border-box'
              }} 
            />
            <button style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}>
              LUPA?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button style={{
          width: '100%',
          backgroundColor: '#1cb0f6',
          color: '#131f24',
          border: 'none',
          borderRadius: '16px',
          padding: '14px 0',
          fontSize: '15px',
          fontWeight: 800,
          letterSpacing: '0.8px',
          cursor: 'pointer',
          boxShadow: '0 4px 0 #1899d6',
          marginBottom: '32px',
          transition: 'all 0.1s ease',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(4px)';
          e.currentTarget.style.boxShadow = '0 0px 0 #1899d6';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 0 #1899d6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 0 #1899d6';
        }}
        >
          MASUK
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginBottom: '24px'
        }}>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#37464f' }}></div>
          <span style={{ margin: '0 16px', color: '#52656d', fontWeight: 800, fontSize: '13px', letterSpacing: '1px' }}>
            ATAU
          </span>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#37464f' }}></div>
        </div>

        {/* Social Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            border: '2px solid #37464f',
            borderRadius: '16px',
            padding: '14px 0',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <svg style={{ position: 'absolute', left: '20px' }} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{ color: '#4b5e65', fontWeight: 800, fontSize: '14px', letterSpacing: '0.8px' }}>MASUK DENGAN GOOGLE</span>
          </button>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            border: '2px solid #37464f',
            borderRadius: '16px',
            padding: '14px 0',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <svg style={{ position: 'absolute', left: '20px' }} width="24" height="24" viewBox="0 0 24 24" fill="#3b5998" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
            <span style={{ color: '#4b5e65', fontWeight: 800, fontSize: '14px', letterSpacing: '0.8px' }}>MASUK DENGAN FACEBOOK</span>
          </button>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            border: '2px solid #37464f',
            borderRadius: '16px',
            padding: '14px 0',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <svg style={{ position: 'absolute', left: '20px' }} width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.68 3.14.68.61 0 1.99-.75 3.58-.63 1.35.07 2.58.55 3.48 1.45-2.98 1.62-2.48 5.76.62 6.94-1.2 2.87-3.03 5.41-5.74 5.34zM12.01 7.02c-.22-2.73 2.1-5.08 4.79-5.32.35 3.01-2.44 5.42-4.79 5.32z"/>
            </svg>
            <span style={{ color: '#4b5e65', fontWeight: 800, fontSize: '14px', letterSpacing: '0.8px' }}>MASUK DENGAN APPLE</span>
          </button>
        </div>

        {/* Footer Text */}
        <div style={{ marginTop: '32px', textAlign: 'center', width: '100%', padding: '0 16px' }}>
          <p style={{ color: '#52656d', fontSize: '12px', fontWeight: 500, lineHeight: 1.5, marginBottom: '16px' }}>
            Dengan masuk ke Duolingo, kamu menyetujui <span style={{ fontWeight: 800 }}>Ketentuan</span> dan <span style={{ fontWeight: 800 }}>Kebijakan Privasi</span> kami.
          </p>
          <p style={{ color: '#52656d', fontSize: '12px', fontWeight: 500, lineHeight: 1.5 }}>
            Situs ini dilindungi oleh reCAPTCHA Enterprise, dan <span style={{ fontWeight: 800 }}>Kebijakan Privasi</span> serta <span style={{ fontWeight: 800 }}>Ketentuan Layanan</span> Google berlaku.
          </p>
        </div>
      </div>
    </div>
  );
}
