"use client";

import React, { useState, useEffect } from 'react';
import { UserQuiz } from '../types/quiz';
import { getUserQuizzes, deleteUserQuiz, saveUserQuiz } from '../utils/quizStorage';

interface QuizLibraryProps {
  onSelectQuiz: (topicId: string, customQuiz?: UserQuiz) => void;
  onOpenEditor?: (quiz?: UserQuiz) => void;
  onOpenUpload?: () => void;
}

export default function QuizLibrary({ onSelectQuiz, onOpenEditor, onOpenUpload }: QuizLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [userQuizzes, setUserQuizzes] = useState<UserQuiz[]>([]);
  const [publicQuizzes, setPublicQuizzes] = useState<UserQuiz[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNewQuizModalOpen, setIsNewQuizModalOpen] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch public quizzes from database
    import('../app/actions/quizzes').then(({ getPublicQuizzesFromDb, getUserQuizzesFromDb }) => {
      getPublicQuizzesFromDb().then(setPublicQuizzes).catch(console.error);
      getUserQuizzesFromDb().then((res) => {
        setIsLoggedIn(!!res?.loggedIn);
        if (res && res.loggedIn) {
          // If logged in, ONLY use DB quizzes for strict account separation
          setUserQuizzes(res.quizzes || []);
        } else {
          // If not logged in, stick with empty quizzes
          setUserQuizzes([]);
        }
      }).catch(console.error);
    });
  }, []);

  const handleDelete = (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this quiz?')) {
      const updated = deleteUserQuiz(quizId);
      setUserQuizzes(updated);
      setActiveDropdown(null);
    }
  };

  const handleEdit = (e: React.MouseEvent, quiz: UserQuiz) => {
    e.stopPropagation();
    setActiveDropdown(null);
    if (onOpenEditor) {
      onOpenEditor(quiz);
    }
  };


  const CircleChart = ({ percentage, color }: { percentage: number, color: string }) => (
    <svg width="28" height="28" viewBox="0 0 36 36" style={{ marginBottom: '4px' }}>
      <path style={{ color: '#e5e7eb' }} stroke="currentColor" strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path style={{ stroke: color }} strokeDasharray={`${percentage}, 100`} strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
    </svg>
  );

  return (
    <div style={{ backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', color: '#111', minHeight: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '32px 32px 120px 32px' }}>
          
          {/* Controls Bar: Grid/List Toggle & Action Buttons (Matching Photo 1) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px', borderBottom: '2px solid #000', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', border: '2px solid #000', borderRadius: '6px', boxShadow: '4px 4px 0px #000', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: 'white' }}
                >
                  <div 
                    onClick={() => setViewMode('grid')}
                    style={{ padding: '8px 16px', backgroundColor: viewMode === 'grid' ? '#2a1a6b' : 'transparent', color: viewMode === 'grid' ? 'white' : '#000', fontWeight: 'bold', fontSize: '14px', borderRight: '2px solid #000', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Grid
                  </div>
                  <div 
                    onClick={() => setViewMode('list')}
                    style={{ padding: '8px 16px', backgroundColor: viewMode === 'list' ? '#2a1a6b' : 'transparent', color: viewMode === 'list' ? 'white' : '#000', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    List
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Upload Document Button */}
                <button 
                  onClick={() => onOpenUpload && onOpenUpload()}
                  style={{ padding: '8px 18px', backgroundColor: 'white', border: '2px solid #000', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#000', cursor: 'pointer', boxShadow: '4px 4px 0px #000', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0px, 0px)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span>Upload</span>
                </button>

                {/* + New Content Button */}
                <button 
                  onClick={() => {
                    setNewQuizTitle('');
                    setIsNewQuizModalOpen(true);
                  }}
                  style={{ padding: '8px 20px', backgroundColor: '#2a1a6b', color: 'white', border: '2px solid #000', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '4px 4px 0px #000', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0px, 0px)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  <span>New Content</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* SECTION 1: RECOMMENDATION (Photo 1) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#000', margin: 0, letterSpacing: '-0.02em' }}>
              Recomendation
            </h1>
            <a href="#" style={{ fontSize: '16px', fontWeight: 600, color: '#000', textDecoration: 'underline', textUnderlineOffset: '4px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              See All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '24px' }}>
            {publicQuizzes.slice(0, 3).map((card) => (
              <div 
                key={card.id} 
                onClick={() => onSelectQuiz(card.id, card)} 
                style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '140px', margin: '8px', borderRadius: '8px 8px 4px 4px', backgroundColor: card.bannerColor || '#d8b4fe', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, position: 'relative' }}>
                     <div style={{ position: 'absolute', fontWeight: 900, fontSize: '60px', color: 'rgba(49, 46, 129, 0.1)', transform: 'rotate(-12deg)', left: '32px' }}>Aa</div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '16px', lineHeight: 1.4, color: '#111827', marginBottom: '12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: 500, lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                    {card.summary}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CircleChart percentage={card.accuracy} color={card.accuracy === 100 ? "#10b981" : card.accuracy === 0 ? "#e5e7eb" : "#10b981"} />
                      <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Accuracy</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{card.accuracy === 0 ? "-" : `${card.accuracy}%`}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CircleChart percentage={card.completion} color="#10b981" />
                      <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Completion Rate</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{card.completion === 0 ? "-" : `${card.completion}%`}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {card.tags?.map((tag, idx) => (
                      <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {tag}
                      </span>
                    ))}
                    <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6' }}></div>
                </div>
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', fontWeight: 800, backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Edited {card.editedTimeAgo}</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                      <span>💬 {card.questions?.length || 0} Question</span>
                    </div>
                  </div>
                  <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#374151', background: 'none', border: 'none', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer' }}>...</button>
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 2: COMMUNITY (Photo 2) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '48px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#000', margin: 0, letterSpacing: '-0.02em' }}>
              Most People Like It
            </h1>
            <a href="#" style={{ fontSize: '16px', fontWeight: 600, color: '#000', textDecoration: 'underline', textUnderlineOffset: '4px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              See All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '24px' }}>
            {publicQuizzes.map((card) => (
              <div 
                key={card.id} 
                onClick={() => onSelectQuiz(card.id, card)} 
                style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '140px', margin: '8px', borderRadius: '8px 8px 4px 4px', backgroundColor: card.bannerColor || '#d8b4fe', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, position: 'relative' }}>
                     <div style={{ position: 'absolute', fontWeight: 900, fontSize: '60px', color: 'rgba(49, 46, 129, 0.1)', transform: 'rotate(-12deg)', left: '32px' }}>Aa</div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '16px', lineHeight: 1.4, color: '#111827', marginBottom: '12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: 500, lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                    {card.summary}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CircleChart percentage={card.accuracy} color={card.accuracy === 100 ? "#10b981" : card.accuracy === 0 ? "#e5e7eb" : "#10b981"} />
                      <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Accuracy</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{card.accuracy === 0 ? "-" : `${card.accuracy}%`}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CircleChart percentage={card.completion} color="#10b981" />
                      <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Completion Rate</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{card.completion === 0 ? "-" : `${card.completion}%`}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {card.tags?.map((tag, idx) => (
                      <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {tag}
                      </span>
                    ))}
                    <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6' }}></div>
                </div>
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', fontWeight: 800, backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Edited {card.editedTimeAgo}</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                      <span>💬 {card.questions?.length || 0} Question</span>
                    </div>
                  </div>
                  <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#374151', background: 'none', border: 'none', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer' }}>...</button>
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 3: YOUR QUIZZ (Requested by User!) */}
          {isLoggedIn && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '48px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#000', margin: 0, letterSpacing: '-0.02em' }}>
                Your Quizz
              </h1>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: '#f3e8ff',
                color: '#6b21a8',
                fontWeight: 800,
                fontSize: '12px',
                border: '1.5px solid #d8b4fe'
              }}>
                {userQuizzes.length} Quizzes
              </span>
            </div>
            
            <button 
              onClick={() => {
                setNewQuizTitle('');
                setIsNewQuizModalOpen(true);
              }}
              style={{ fontSize: '14px', fontWeight: 700, color: '#2a1a6b', background: 'none', border: 'none', textDecoration: 'underline', textUnderlineOffset: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              + Create New Quizz
            </button>
          </div>

          {userQuizzes.length === 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '2px dashed #d1d5db',
              padding: '48px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '8px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', margin: 0 }}>No quizzes created yet</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, maxWidth: '400px' }}>
                Start creating your first quiz or upload a document to turn your notes into interactive practice questions!
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={() => onOpenUpload && onOpenUpload()}
                  style={{ padding: '8px 18px', backgroundColor: '#fff', border: '2px solid #000', borderRadius: '6px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '3px 3px 0px #000' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    Upload Document
                  </div>
                </button>
                <button
                  onClick={() => {
                    setNewQuizTitle('');
                    setIsNewQuizModalOpen(true);
                  }}
                  style={{ padding: '8px 20px', backgroundColor: '#2a1a6b', color: '#fff', border: '2px solid #000', borderRadius: '6px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '3px 3px 0px #000' }}
                >
                  + Create New Quiz
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '24px' }}>
              {userQuizzes.map((quiz) => (
                <div 
                  key={quiz.id} 
                  onClick={() => onOpenEditor && onOpenEditor(quiz)} 
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid #f3f4f6',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {/* Top Banner with Aa */}
                  <div style={{
                    height: '140px',
                    margin: '8px',
                    borderRadius: '8px 8px 4px 4px',
                    backgroundColor: quiz.bannerColor || '#d8b4fe',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {quiz.isDraft ? (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#374151', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', backgroundColor: '#9ca3af', borderRadius: '50%' }}></span>
                        Draft
                      </div>
                    ) : (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#2a1a6b', color: '#ffffff', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          <span>Published</span>
                        </div>
                      </div>
                    )}
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, position: 'relative' }}>
                       <div style={{ position: 'absolute', fontWeight: 900, fontSize: '60px', color: 'rgba(49, 46, 129, 0.1)', transform: 'rotate(-12deg)', left: '32px' }}>Aa</div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '16px 20px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '16px', lineHeight: 1.4, color: '#111827', marginBottom: '12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {quiz.title}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: 500, lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                      {quiz.summary}
                    </p>

                    {/* Stats Circle Rings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <CircleChart percentage={quiz.accuracy} color={quiz.accuracy === 100 ? "#10b981" : quiz.accuracy === 0 ? "#e5e7eb" : "#10b981"} />
                        <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Accuracy</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{quiz.accuracy === 0 ? "-" : `${quiz.accuracy}%`}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <CircleChart percentage={quiz.completion} color="#10b981" />
                        <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Completion Rate</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{quiz.completion === 0 ? "-" : `${quiz.completion}%`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      {quiz.tags?.map((tag, idx) => (
                        <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                          {tag}
                        </span>
                      ))}
                      <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }} title="Created by you">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '0 20px' }}>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6' }}></div>
                  </div>

                  {/* Footer with time and actions */}
                  <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', fontWeight: 800, backgroundColor: 'white', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Edited {quiz.editedTimeAgo || 'Just now'}</span>
                      <span style={{ color: '#d1d5db' }}>•</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                        <span>💬 {quiz.questions?.length || 0} Question</span>
                      </div>
                    </div>

                    {/* Three-dots menu button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === quiz.id ? null : quiz.id);
                      }}
                      style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#374151', background: 'none', border: 'none', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer' }}
                    >
                      ...
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === quiz.id && (
                      <div 
                        style={{
                          position: 'absolute',
                          right: '20px',
                          bottom: '44px',
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                          border: '2px solid #000',
                          padding: '6px',
                          zIndex: 100,
                          minWidth: '140px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => handleEdit(e, quiz)}
                          style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#111',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </span>
                          <span>Edit Quiz</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            onSelectQuiz(quiz.id, quiz);
                          }}
                          style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#111',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          </span>
                          <span>Play Quiz</span>
                        </button>
                        <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '2px 0' }}></div>
                        <button
                          onClick={(e) => handleDelete(e, quiz.id)}
                          style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#dc2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </span>
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          </>
        )}

        </div>
      </div>

      {/* NEW QUIZ MODAL */}
      {isNewQuizModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '2px solid #000',
            boxShadow: '8px 8px 0px #000',
            padding: '32px',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#111' }}>New Quiz Name</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Please enter a title for your new quiz.</p>
            
            <input
              type="text"
              value={newQuizTitle}
              onChange={(e) => setNewQuizTitle(e.target.value)}
              placeholder="e.g., Basic Math Quiz"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #000',
                fontSize: '14px',
                fontWeight: 600,
                outline: 'none',
                boxSizing: 'border-box'
              }}
              autoFocus
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={() => setIsNewQuizModalOpen(false)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '2px solid #000',
                  backgroundColor: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onOpenEditor) {
                    const newQuiz: UserQuiz = {
                      id: `user-quiz-${Date.now()}`,
                      title: newQuizTitle.trim() || 'Untitled Quiz',
                      summary: 'A collection of practice questions to test your comprehensive understanding of the material.',
                      category: 'Math',
                      tags: ['Draft'],
                      bannerColor: '#d8b4fe',
                      accuracy: 0,
                      completion: 0,
                      isDraft: true,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      editedTimeAgo: 'Just now',
                      authorName: 'You',
                      passingScore: 70,
                      resultPassedMessage: 'Congratulations! You passed the quiz with flying colors!',
                      resultFailedMessage: 'Don\'t be discouraged! Review the material and try again.',
                      questions: [
                        {
                          id: 'q1',
                          questionText: '',
                          type: 'multiple_choice',
                          required: true,
                          image: '',
                          choices: [
                            { id: 'c1', text: 'Choice A', isCorrect: true },
                            { id: 'c2', text: 'Choice B', isCorrect: false },
                            { id: 'c3', text: 'Choice C', isCorrect: false },
                            { id: 'c4', text: 'Choice D', isCorrect: false }
                          ],
                          randomizeOrder: false,
                          estimationTimeMins: 2,
                          points: 1
                        }
                      ]
                    };
                    saveUserQuiz(newQuiz);
                    onOpenEditor(newQuiz);
                  }
                  setIsNewQuizModalOpen(false);
                }}
                style={{
                  padding: '10px 24px',
                  borderRadius: '6px',
                  border: '2px solid #000',
                  backgroundColor: '#2a1a6b',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0px #000'
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}