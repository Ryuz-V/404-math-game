"use client";

import React, { useState, useEffect } from 'react';
import { MATH_QUESTIONS, Question } from '../data/mathData';

interface QuizViewerProps {
  initialTopicId?: string;
  onBackToMenu: () => void;
  onAddScore?: (points: number) => void;
}

export default function QuizViewer({ initialTopicId, onBackToMenu, onAddScore }: QuizViewerProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let pool = MATH_QUESTIONS;
    if (initialTopicId && initialTopicId !== 'all') {
      pool = MATH_QUESTIONS.filter(q => q.topicId === initialTopicId);
    }
    let selectedQuestions = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    if (selectedQuestions.length === 0) {
      // Fallback if the topic ID has no questions in the mock data
      selectedQuestions = [...MATH_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    }
    setQuestions(selectedQuestions);
  }, [initialTopicId]);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onAddScore && finalScore > 0) {
      onAddScore(finalScore * 10); // arbitrary point conversion
    }
  };

  if (questions.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>Loading...</div>;
  }

  const currentQ = questions[currentIndex];

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#111827', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onBackToMenu}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', color: '#374151' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280' }}>
            Quiz: {initialTopicId === 'all' || !initialTopicId ? 'Mixed Topics' : questions[0]?.topicTitle}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isSubmitted && (
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280' }}>
              {Object.keys(answers).length} / {questions.length} Answered
            </span>
          )}
          <button
            onClick={isSubmitted ? onBackToMenu : handleSubmit}
            style={{ 
              padding: '8px 24px', 
              backgroundColor: '#312e81', 
              color: 'white', 
              border: '2px solid #000000', 
              borderRadius: '6px', 
              fontWeight: 700, 
              fontSize: '14px', 
              cursor: 'pointer', 
              boxShadow: '4px 4px 0px #000000', 
              transition: 'all 0.1s ease-in-out' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)';
              e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
            }}
          >
            {isSubmitted ? 'Done' : 'Submit Quiz'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{ width: '300px', backgroundColor: '#f9fafb', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#4b5563', letterSpacing: '0.05em' }}>QUESTION ({questions.length})</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {questions.map((q, idx) => {
              const isSelected = currentIndex === idx;
              const isAnswered = answers[q.id] !== undefined;
              let indicatorColor = '#d1d5db'; // default gray
              if (isSubmitted) {
                indicatorColor = answers[q.id] === q.correctIndex ? '#10b981' : '#ef4444'; // green if correct, red if wrong
              } else if (isAnswered) {
                indicatorColor = '#6366f1'; // purple if answered
              }

              return (
                <div
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    backgroundColor: isSelected ? '#ffffff' : 'transparent',
                    border: '1px solid',
                    borderColor: isSelected ? '#e5e7eb' : 'transparent',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    position: 'relative'
                  }}
                >
                  {isSelected && (
                    <div style={{ position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)', width: '3px', height: '24px', backgroundColor: '#6366f1', borderRadius: '0 4px 4px 0' }}></div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ backgroundColor: '#f3f4f6', color: '#374151', fontSize: '12px', fontWeight: 600, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: isSelected ? '#111827' : '#4b5563', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {q.question}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '36px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: indicatorColor }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Multiple choice</span>
                  </div>
                </div>
              );
            })}

            {isSubmitted && (
              <div
                onClick={() => setCurrentIndex(-1)} // -1 for result screen
                style={{
                  backgroundColor: currentIndex === -1 ? '#ffffff' : 'transparent',
                  border: '1px solid',
                  borderColor: currentIndex === -1 ? '#e5e7eb' : 'transparent',
                  boxShadow: currentIndex === -1 ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative'
                }}
              >
                {currentIndex === -1 && (
                  <div style={{ position: 'absolute', left: '-1px', top: '50%', transform: 'translateY(-50%)', width: '3px', height: '24px', backgroundColor: '#6366f1', borderRadius: '0 4px 4px 0' }}></div>
                )}
                <div style={{ backgroundColor: '#f3f4f6', color: '#374151', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: currentIndex === -1 ? '#111827' : '#4b5563' }}>
                  Result Screen
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>

          {currentIndex === -1 && isSubmitted ? (
            <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: score >= 70 ? '#d1fae5' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span style={{ fontSize: '32px' }}>{score >= 70 ? '🎉' : '📚'}</span>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                {score >= 70 ? 'Great Job!' : 'Keep Practicing!'}
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
                You scored {score}% on this quiz.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, marginBottom: '4px' }}>CORRECT ANSWERS</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>{questions.filter(q => answers[q.id] === q.correctIndex).length} / {questions.length}</div>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, marginBottom: '4px' }}>POINTS EARNED</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#6366f1' }}>+{score * 10}</div>
                </div>
              </div>

              <button
                onClick={onBackToMenu}
                style={{ padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
              >
                Return to Menu
              </button>
            </div>
          ) : currentQ && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #e5e7eb' }}>

                {/* Simulated Builder Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f9fafb', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4b5563' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Multiple choice</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9ca3af', marginLeft: '4px' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563' }}>Required</span>
                    <div style={{ width: '36px', height: '20px', backgroundColor: '#10b981', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                    </div>
                    <span style={{ color: '#d1d5db', margin: '0 8px' }}>|</span>
                    <button style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: '#111827', color: 'white', fontSize: '11px', fontWeight: 700, width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                    ?
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Question {currentIndex + 1} *</h3>
                </div>

                <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '32px', minHeight: '100px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', lineHeight: 1.5, margin: 0 }}>
                    {currentQ.question}
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Choices <span style={{ color: '#ef4444' }}>*</span></span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQ.options.map((option, idx) => {
                    const isSelected = answers[currentQ.id] === idx;
                    const isCorrect = isSubmitted && currentQ.correctIndex === idx;
                    const isWrongSelected = isSubmitted && isSelected && currentQ.correctIndex !== idx;

                    let borderColor = '#e5e7eb';
                    let bgColor = 'white';
                    let iconColor = '#d1d5db';

                    if (isSubmitted) {
                      if (isCorrect) {
                        borderColor = '#10b981';
                        bgColor = '#ecfdf5';
                        iconColor = '#10b981';
                      } else if (isWrongSelected) {
                        borderColor = '#ef4444';
                        bgColor = '#fef2f2';
                        iconColor = '#ef4444';
                      } else {
                        borderColor = '#e5e7eb';
                        bgColor = '#f9fafb';
                        iconColor = '#d1d5db';
                      }
                    } else if (isSelected) {
                      borderColor = '#6366f1';
                      bgColor = '#f5f3ff';
                      iconColor = '#6366f1';
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px 20px',
                          borderRadius: '8px',
                          border: `1px solid ${borderColor}`,
                          backgroundColor: bgColor,
                          cursor: isSubmitted ? 'default' : 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: `2px solid ${iconColor}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isSelected || (isSubmitted && isCorrect) ? iconColor : 'transparent'
                          }}>
                            {(isSelected || (isSubmitted && isCorrect)) && (
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }}></div>
                            )}
                          </div>
                          <span style={{ fontSize: '15px', color: '#111827', fontWeight: 500 }}>
                            {option}
                          </span>
                        </div>

                        {!isSubmitted && (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ background: 'none', border: 'none', color: '#d1d5db', cursor: 'pointer', padding: '4px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                              </svg>
                            </button>
                          </div>
                        )}
                        {isSubmitted && isCorrect && (
                          <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                        )}
                        {isSubmitted && isWrongSelected && (
                          <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e40af', margin: '0 0 8px 0' }}>Explanation</h4>
                    <p style={{ fontSize: '14px', color: '#1e3a8a', margin: 0, lineHeight: 1.5 }}>{currentQ.explanation}</p>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
