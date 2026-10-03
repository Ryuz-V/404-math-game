"use client";

import React, { useState, useEffect } from 'react';
import { UserQuiz } from '../types/quiz';
import { getUserQuizzes, deleteUserQuiz } from '../utils/quizStorage';

interface QuizLibraryProps {
  onSelectQuiz: (topicId: string, customQuiz?: UserQuiz) => void;
  onOpenEditor?: (quiz?: UserQuiz) => void;
  onOpenUpload?: () => void;
}

export default function QuizLibrary({ onSelectQuiz, onOpenEditor, onOpenUpload }: QuizLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [userQuizzes, setUserQuizzes] = useState<UserQuiz[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setUserQuizzes(getUserQuizzes());
  }, []);

  const handleDelete = (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    if (confirm('Apakah Anda yakin ingin menghapus kuis ini?')) {
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

  const mockCards = [
    { id: 'dimensi-tiga', title: 'Soal-Soal Geometri', summary: 'Kumpulan latihan soal geometri datar dan geometri ruang beserta pembahasannya secara lengkap.', accuracy: 40, completion: 60, tags: ['UI/UX', 'Not Urgent'], edited: '2h ago', questions: 10, bannerColor: '#fcd34d' },
    { id: 'kalkulus-lanjut', title: 'Soal-Soal Trigonometri', summary: 'Latihan soal trigonometri dasar, identitas trigonometri, hingga aturan sinus dan kosinus.', accuracy: 20, completion: 80, tags: ['Instructional Design', 'Not Urgent'], edited: '8h ago', questions: 15, bannerColor: '#bae6fd' },
    { id: 'integral-kalkulus', title: 'Soal-Soal Kalkulus', summary: 'Kumpulan soal limit, turunan, dan integral fungsi aljabar maupun trigonometri.', accuracy: 100, completion: 100, tags: ['Experience Design', 'Urgent'], edited: '23h ago', questions: 25, bannerColor: '#d8b4fe' },
    { id: 'statistika', title: 'Creating Engaging Learning Journeys: UI/UX Best Practices', summary: 'Panduan praktik terbaik merancang antarmuka yang menarik, ramah pengguna, dan efektif.', accuracy: 20, completion: 100, tags: ['UI/UX', 'Urgent'], edited: '5d ago', questions: 30, bannerColor: '#93c5fd' },
    { id: 'kaidah-pencacahan', title: 'Designing Intuitive User Interfaces', summary: 'Pelajari cara membuat antarmuka pengguna yang intuitif dan mudah dipahami oleh semua kalangan.', accuracy: 80, completion: 80, tags: ['User Interface (UI)', 'Not Urgent'], edited: '2d ago', questions: 15, bannerColor: '#fde047' },
    { id: 'peluang-majemuk', title: 'Optimizing User Experience in Educational Platforms', summary: 'Strategi optimalisasi pengalaman pengguna pada platform edukasi digital secara menyeluruh.', accuracy: 0, completion: 0, tags: ['User Experience', 'Urgent'], edited: '4d ago', questions: 25, bannerColor: '#e9d5ff', isDraft: true },
  ];

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
                  <span>📄</span>
                  <span>Upload</span>
                </button>

                {/* + New Content Button */}
                <button 
                  onClick={() => onOpenEditor && onOpenEditor()}
                  style={{ padding: '8px 20px', backgroundColor: '#2a1a6b', color: 'white', border: '2px solid #000', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '4px 4px 0px #000', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(0px, 0px)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
                >
                  <span>+</span>
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
            {mockCards.slice(0, 3).map((card) => (
              <div 
                key={card.id} 
                onClick={() => onSelectQuiz(card.id)} 
                style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '140px', margin: '8px', borderRadius: '8px 8px 4px 4px', backgroundColor: card.bannerColor, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {card.tags.map((tag, idx) => (
                      <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {tag}
                      </span>
                    ))}
                    <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }}>👤</div>
                  </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6' }}></div>
                </div>
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', fontWeight: 800, backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Edited {card.edited}</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                      <span>💬 {card.questions} Question</span>
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
              Community
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
            {mockCards.slice(3).map((card) => (
              <div 
                key={card.id} 
                onClick={() => onSelectQuiz(card.id)} 
                style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '140px', margin: '8px', borderRadius: '8px 8px 4px 4px', backgroundColor: card.bannerColor, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {card.isDraft && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#374151', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#9ca3af', borderRadius: '50%' }}></span>
                      Draft
                    </div>
                  )}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {card.tags.map((tag, idx) => (
                      <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {tag}
                      </span>
                    ))}
                    <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }}>👤</div>
                  </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6' }}></div>
                </div>
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', fontWeight: 800, backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Edited {card.edited}</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                      <span>💬 {card.questions} Question</span>
                    </div>
                  </div>
                  <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#374151', background: 'none', border: 'none', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer' }}>...</button>
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 3: YOUR QUIZZ (Requested by User!) */}
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
              onClick={() => onOpenEditor && onOpenEditor()}
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
              <span style={{ fontSize: '48px' }}>📝</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', margin: 0 }}>Belum ada kuis yang dibuat</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, maxWidth: '400px' }}>
                Mulai buat kuis pertamamu atau upload dokumen untuk mengubah catatan menjadi soal latihan interaktif!
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={() => onOpenUpload && onOpenUpload()}
                  style={{ padding: '8px 18px', backgroundColor: '#fff', border: '2px solid #000', borderRadius: '6px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '3px 3px 0px #000' }}
                >
                  📄 Upload Dokumen
                </button>
                <button
                  onClick={() => onOpenEditor && onOpenEditor()}
                  style={{ padding: '8px 20px', backgroundColor: '#2a1a6b', color: '#fff', border: '2px solid #000', borderRadius: '6px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '3px 3px 0px #000' }}
                >
                  + Buat Kuis Baru
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '24px' }}>
              {userQuizzes.map((quiz) => (
                <div 
                  key={quiz.id} 
                  onClick={() => onSelectQuiz(quiz.id, quiz)} 
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
                        <span>✨ Published</span>
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
                      <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }} title="Dibuat oleh Anda">
                        👤
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
                          <span>✏️</span>
                          <span>Edit Soal</span>
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
                          <span>▶️</span>
                          <span>Mainkan Kuis</span>
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
                          <span>🗑️</span>
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}