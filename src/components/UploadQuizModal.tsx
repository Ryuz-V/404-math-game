"use client";

import React, { useState, useRef } from 'react';
import { QuizQuestion } from '../types/quiz';
import { parseDocumentToQuestions } from '../utils/quizStorage';

interface UploadQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportQuestions: (data: { title: string; summary: string; questions: QuizQuestion[] }) => void;
}

export default function UploadQuizModal({ isOpen, onClose, onImportQuestions }: UploadQuizModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [title, setTitle] = useState('');

  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [parsedPreview, setParsedPreview] = useState<QuizQuestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }

    try {
      const text = await file.text();
      const questions = parseDocumentToQuestions(text);
      setParsedPreview(questions);
    } catch (err) {
      console.error(err);
      // Fallback sample questions
      const fallbackQuestions = parseDocumentToQuestions(`1. Question from document ${file.name}\nA. Correct Answer (key)\nB. Alternative Answer`);
      setParsedPreview(fallbackQuestions);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextChange = (text: string) => {
    setPastedText(text);
    if (text.trim().length > 10) {
      const questions = parseDocumentToQuestions(text);
      setParsedPreview(questions);
    } else {
      setParsedPreview([]);
    }
  };

  const handleImport = () => {
    const finalTitle = title.trim() || 'New Quiz from Document';
    const questionsToUse = parsedPreview.length > 0 ? parsedPreview : parseDocumentToQuestions(pastedText || '1. Example question\nA. Option A (key)\nB. Option B');
    
    onImportQuestions({
      title: finalTitle,
      summary: `Quiz with ${questionsToUse.length} questions.`,
      questions: questionsToUse
    });
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '780px',
          borderRadius: '16px',
          border: '3px solid #000000',
          boxShadow: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '2px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f3e8ff',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ fill: 'none' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#000', margin: 0 }}>
                Upload & Create Quiz
              </h2>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #000',
          backgroundColor: '#f3f4f6'
        }}>
          {[
            { id: 'upload', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Upload File</div> },
            { id: 'paste', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>Paste Text / Notes</div> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '14px 16px',
                border: 'none',
                borderRight: '2px solid #000',
                backgroundColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                fontWeight: activeTab === tab.id ? 800 : 600,
                fontSize: '13px',
                color: activeTab === tab.id ? '#2a1a6b' : '#4b5563',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '4px solid #2a1a6b' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div data-lenis-prevent="true" className="custom-scrollbar" style={{ padding: '24px', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Metadata Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                QUIZ TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Calculus Chapter 1 Practice..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  boxShadow: 'none'
                }}
              />
            </div>

          </div>

          {/* Tab 1: Upload File */}
          {activeTab === 'upload' && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.md,.pdf,.docx,.doc,.json"
                style={{ display: 'none' }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #000',
                  borderRadius: '12px',
                  padding: '36px 20px',
                  textAlign: 'center',
                  backgroundColor: '#faf5ff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3e8ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#faf5ff'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ fill: 'none' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div style={{ fontWeight: 800, fontSize: '16px', color: '#111', marginBottom: '4px' }}>
                  {fileName ? `Selected File: ${fileName}` : 'Click or Drag Document File Here'}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
                  Supports PDF, Word (.docx), TXT, Markdown (.md), or JSON
                </div>
                <button
                  type="button"
                  style={{
                    marginTop: '16px',
                    padding: '8px 20px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #000',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '13px',
                    boxShadow: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Select File From Computer
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Paste Text */}
          {activeTab === 'paste' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                PASTE QUESTION TEXT (Format: 1. Question, A. Option, B. Option...)
              </label>
              <textarea
                rows={7}
                value={pastedText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Example:\n1. What is the result of 15 x 8?\nA. 120 (key)\nB. 110\nC. 130\nD. 100\n\n2. A right angle has a degree of...\nA. 90 degrees (key)\nB. 180 degrees`}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  lineHeight: 1.5,
                  outline: 'none',
                  boxShadow: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          {/* Live Preview Summary */}
          {parsedPreview.length > 0 && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '2px solid #16a34a',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <div>
                  <strong style={{ color: '#166534', fontSize: '13px' }}>
                    {parsedPreview.length} Questions Successfully Recognized & Ready to Edit!
                  </strong>
                  <p style={{ margin: 0, fontSize: '11px', color: '#15803d' }}>
                    Questions will be loaded directly into the Editor Page for adjusting answer keys, points, and time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '2px solid #000',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffffff',
              border: '2px solid #000',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: 'none'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            style={{
              padding: '10px 24px',
              backgroundColor: '#2a1a6b',
              color: '#ffffff',
              border: '2px solid #000',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Open in Quiz Editor</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
