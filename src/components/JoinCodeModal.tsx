"use client";

import React, { useState, useEffect, useRef } from 'react';

interface JoinCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export default function JoinCodeModal({ isOpen, onClose, onJoin }: JoinCodeModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim();
    if (!clean) {
      setError('Silakan ketik kode kuis terlebih dahulu!');
      return;
    }
    if (clean.length < 3) {
      setError('Kode kuis minimal 3 karakter!');
      return;
    }
    onJoin(clean);
  };

  const handleQuickCode = (sampleCode: string) => {
    setCode(sampleCode);
    setError('');
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          border: '3px solid #000000',
          borderRadius: '14px',
          boxShadow: '6px 6px 0px #000000',
          overflow: 'hidden',
          animation: 'modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '2.5px solid #000000',
            backgroundColor: '#fffdf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🎮</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111' }}>
                Enter The Code
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#666', fontWeight: 500 }}>
                Join game or quiz directly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              background: 'none',
              border: '2px solid #000',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '1rem',
              backgroundColor: '#fff',
              boxShadow: '2px 2px 0px #000',
              transition: 'transform 0.1s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-1px, -1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}
          >
            Game Code / Game PIN:
          </label>

          <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (error) setError('');
              }}
              placeholder="EXAMPLE: 849201"
              maxLength={12}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                fontSize: '1.4rem',
                fontWeight: 800,
                textAlign: 'center',
                letterSpacing: '3px',
                border: '2.5px solid #000000',
                borderRadius: '10px',
                outline: 'none',
                boxShadow: '3px 3px 0px #000000',
                fontFamily: 'monospace, sans-serif',
                textTransform: 'uppercase',
                backgroundColor: '#ffffff'
              }}
            />
          </div>

          {error && (
            <div
              style={{
                fontSize: '0.82rem',
                color: '#dc2626',
                fontWeight: 700,
                marginBottom: '1rem',
                backgroundColor: '#fee2e2',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                border: '1.5px solid #ef4444'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.75rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                border: '2px solid #000',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#000000',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000',
                transition: 'all 0.15s ease'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                border: '2px solid #000',
                borderRadius: '8px',
                backgroundColor: '#000000',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #000',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333333';
                e.currentTarget.style.transform = 'translate(-1px, -1px)';
                e.currentTarget.style.boxShadow = '4px 4px 0px #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0px #000';
              }}
            >
              Join Quiz 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
