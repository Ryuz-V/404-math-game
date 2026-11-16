"use client";

import { useState } from 'react';
import { ALL_MATERI, MathTopic } from '../data/mathData';
import { getMathVideoForTopic } from '../data/mathVideos';

export const TOPIC_PDF_MAP: Record<string, string> = {
  'grade-10-exponents': 'Exponents & Logarithms.pdf',
  'grade-10-quadratics': 'Quadratic Equations & Functions.pdf',
  'grade-10-spltv': 'Sistem Persamaan Linear Tiga Variabel.pdf',
  'grade-10-trigonometry': 'Basic Trigonometry & Triangle Rules .pdf',
  'grade-10-sequences': 'Barisan dan Deret Geometri.pdf',
  'grade-11-functions': 'Composite & Inverse Functions.pdf',
  'grade-11-circles': 'Equations of Circles & Tangent Lines.pdf',
  'grade-11-matrices': 'Matrices & Linear Systems.pdf',
  'grade-11-transformations': 'Geometric Transformations.pdf',
  'grade-11-limit': 'Limits of Algebraic Functions.pdf',
  'dimensi-tiga': '3D Geometry.pdf',
  'statistika': 'Statistika.pdf',
  'kaidah-pencacahan': 'Counting Principles.pdf',
  'peluang-majemuk': 'Compound Probability.pdf',
  'kalkulus-lanjut': 'Limits & Derivatives of Trigonometric Functions.pdf'
};

interface MateriSectionProps {
  onStartSoloWithTopic?: (topicId: string) => void;
  onStartVersus?: () => void;
  initialTopicId?: string;
}

type TabType = 'all' | 'konsep' | 'rumus' | 'contoh' | 'video' | 'kuis';

export default function MaterialSection({ onStartSoloWithTopic, initialTopicId }: MateriSectionProps) {
  const [activeModalTopic, setActiveModalTopic] = useState<MathTopic | null>(() => {
    if (initialTopicId) {
      const search = initialTopicId.toLowerCase();
      return ALL_MATERI.find(m =>
        m.id === initialTopicId ||
        m.title.toLowerCase().includes(search) ||
        m.category.toLowerCase().includes(search)
      ) || null;
    }
    return null;
  });
  
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // List view filters
  const [gradeFilter, setGradeFilter] = useState<'all' | 10 | 11 | 12>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = ALL_MATERI.filter(m => {
    const matchesGrade = gradeFilter === 'all' || m.grade === gradeFilter;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const handleOpenTopic = (topic: MathTopic) => {
    setActiveModalTopic(topic);
    setActiveTab('all');
    setQuizAnswers({});
    setIsPlayingVideo(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyFormula = (formula: string, name: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${name}: ${formula}`);
      setCopiedFormula(name);
      setTimeout(() => setCopiedFormula(null), 2000);
    }
  };

  const handleAnswerQuiz = (qIdx: number, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
  };

  const handleNextTopic = () => {
    if (!activeModalTopic) return;
    const currIdx = ALL_MATERI.findIndex(m => m.id === activeModalTopic.id);
    const nextIdx = (currIdx + 1) % ALL_MATERI.length;
    setActiveModalTopic(ALL_MATERI[nextIdx]);
    setActiveTab('all');
    setQuizAnswers({});
    setIsPlayingVideo(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevTopic = () => {
    if (!activeModalTopic) return;
    const currIdx = ALL_MATERI.findIndex(m => m.id === activeModalTopic.id);
    const prevIdx = (currIdx - 1 + ALL_MATERI.length) % ALL_MATERI.length;
    setActiveModalTopic(ALL_MATERI[prevIdx]);
    setActiveTab('all');
    setQuizAnswers({});
    setIsPlayingVideo(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // =========================================================================
  // TOPIC DETAIL VIEW
  // =========================================================================
  if (activeModalTopic) {
    const videoData = getMathVideoForTopic(activeModalTopic.id, activeModalTopic.title);
    
    const tabs: { id: TabType; label: string; count?: number }[] = [
      { id: 'all', label: 'Semua Materi' },
      { id: 'konsep', label: 'Teori & Konsep' },
      { id: 'rumus', label: 'Rumus Penting', count: activeModalTopic.keyFormulas.length },
      { id: 'contoh', label: 'Contoh Soal', count: activeModalTopic.examples.length },
      { id: 'video', label: 'Video YouTube' },
      { id: 'kuis', label: 'Kuis Latihan', count: activeModalTopic.quickQuiz?.length || 0 }
    ];

    // Calculate Quiz Score
    const totalQuestions = activeModalTopic.quickQuiz?.length || 0;
    const answeredCount = Object.keys(quizAnswers).length;
    let correctCount = 0;
    if (activeModalTopic.quickQuiz) {
      activeModalTopic.quickQuiz.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correctIndex) correctCount++;
      });
    }

    const difficultyConfig = {
      Easy: { label: 'Mudah', bg: '#dcfce7', text: '#15803d' },
      Medium: { label: 'Sedang', bg: '#fef3c7', text: '#b45309' },
      Hard: { label: 'Tantangan', bg: '#fee2e2', text: '#b91c1c' }
    }[activeModalTopic.difficulty || 'Medium'];

    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '2rem 1.25rem 4rem 1.25rem', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ maxWidth: '1160px', width: '100%', margin: '0 auto' }}>
          
          {/* TOP HERO HEADER CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #e2e8f0',
            padding: '24px 28px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)'
          }}>
            {/* Top Navigation & Breadcrumb */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <button
                onClick={() => setActiveModalTopic(null)}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '6px 16px',
                  cursor: 'pointer',
                  color: '#334155',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                ← Kembali ke Daftar Materi
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                  Kelas {activeModalTopic.grade} SMA
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                  {activeModalTopic.category}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '9999px', backgroundColor: difficultyConfig.bg, color: difficultyConfig.text }}>
                  Level: {difficultyConfig.label}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                  {activeModalTopic.readTime}
                </span>
              </div>
            </div>

            {/* Title & Action Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0f172a', margin: '0 0 10px 0', lineHeight: 1.25 }}>
                  {activeModalTopic.title}
                </h1>
                
                {/* Clean Enclosed Summary Callout Box */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderLeft: '4px solid #6366f1',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  maxWidth: '900px'
                }}>
                  <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                    {activeModalTopic.summary}
                  </p>
                </div>
              </div>

              {onStartSoloWithTopic && (
                <button
                  onClick={() => onStartSoloWithTopic(activeModalTopic.id)}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '14px',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    border: '2px solid #047857',
                    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Latihan di Time Attack →</span>
                </button>
              )}
            </div>

            {/* Quick Content Highlights Bar */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                <span>{activeModalTopic.keyFormulas.length} Rumus Penting</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                <span>•</span>
                <span>{activeModalTopic.examples.length} Contoh Soal Bertahap</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                <span>•</span>
                <span>{activeModalTopic.quickQuiz?.length || 0} Kuis Pemahaman</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                <span>•</span>
                <span>Video Pembahasan ({videoData.channel})</span>
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION (MODERN SEGMENTED CONTROL) */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '6px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            marginBottom: '24px',
            boxShadow: '0 2px 6px -1px rgba(0,0,0,0.03)'
          }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    backgroundColor: isActive ? '#0f172a' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#334155' : '#f1f5f9',
                      color: isActive ? '#f8fafc' : '#475569',
                      fontWeight: 700
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* SECTION 1: TEORI & KONSEP PEMBELAJARAN */}
          {/* =============================================================== */}
          {(activeTab === 'all' || activeTab === 'konsep') && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              border: '1.5px solid #e2e8f0',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Teori & Capaian Pembelajaran
                </h2>
              </div>

              {/* PDF Module Action Card */}
              {TOPIC_PDF_MAP[activeModalTopic.id] && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #fecaca',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '14px',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '14px'
                    }}>
                      PDF
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0' }}>
                        Modul Kurikulum Resmi Kemendikbud
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        {TOPIC_PDF_MAP[activeModalTopic.id]} • Buku Referensi Standar SMA
                      </p>
                    </div>
                  </div>

                  <a
                    href={`/assets/file%20materi/${encodeURIComponent(TOPIC_PDF_MAP[activeModalTopic.id])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      padding: '9px 18px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>Buka Modul PDF</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              )}
              
              {/* Detailed Overview Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '18px 22px',
                marginBottom: '24px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
                  Penjelasan Umum & Relevansi Kurikulum
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                  {activeModalTopic.detailedOverview}
                </p>
              </div>

              {/* Core Concepts Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeModalTopic.coreConcepts.map((section, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '18px 22px'
                  }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#64748b', fontWeight: 800 }}>{idx + 1}.</span>
                      <span>{section.title}</span>
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '22px', color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>
                      {section.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: '6px' }}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* SECTION 2: RUMUS-RUMUS PENTING */}
          {/* =============================================================== */}
          {(activeTab === 'all' || activeTab === 'rumus') && activeModalTopic.keyFormulas.length > 0 && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              border: '1.5px solid #e2e8f0',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Rumus Penting ({activeModalTopic.keyFormulas.length})
                  </h2>
                </div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Klik tombol salin untuk menyimpan rumus
                </span>
              </div>

              {/* Grid 2 Columns on Desktop */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
                {activeModalTopic.keyFormulas.map((f, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          {f.name}
                        </h3>
                        <button
                          onClick={() => handleCopyFormula(f.formula, f.name)}
                          style={{
                            backgroundColor: copiedFormula === f.name ? '#f1f5f9' : '#ffffff',
                            border: '1px solid #cbd5e1',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: copiedFormula === f.name ? '#0f172a' : '#475569',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {copiedFormula === f.name ? 'Tersalin' : 'Salin'}
                        </button>
                      </div>

                      {/* Plain Math Formula Card (Standard Academic Math Display) */}
                      <div style={{
                        backgroundColor: '#f8fafc',
                        color: '#0f172a',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        fontWeight: 700,
                        marginBottom: '12px',
                        lineHeight: 1.6,
                        overflowX: 'auto',
                        letterSpacing: '0.01em'
                      }}>
                        {f.formula}
                      </div>

                      <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                        {f.desc}
                      </p>
                    </div>

                    {f.note && (
                      <div style={{
                        marginTop: 'auto',
                        fontSize: '12px',
                        color: '#475569',
                        backgroundColor: '#f8fafc',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        lineHeight: 1.5
                      }}>
                        <strong style={{ color: '#0f172a' }}>Catatan:</strong> {f.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* SECTION 3: CONTOH SOAL & PEMBAHASAN */}
          {/* =============================================================== */}
          {(activeTab === 'all' || activeTab === 'contoh') && activeModalTopic.examples.length > 0 && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              border: '1.5px solid #e2e8f0',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Contoh Soal & Pembahasan Bertahap ({activeModalTopic.examples.length} Soal)
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeModalTopic.examples.map((ex, idx) => {
                  const levelBadge = {
                    Basic: { text: 'Tingkat Dasar (Pemahaman Konsep)', bg: '#dcfce7', color: '#15803d' },
                    Intermediate: { text: 'Tingkat Sedang (Ujian Sekolah / PTS)', bg: '#fef3c7', color: '#b45309' },
                    Advanced: { text: 'Tingkat Lanjut (HOTS / UTBK SNBT)', bg: '#fee2e2', color: '#b91c1c' }
                  }[ex.level || 'Intermediate'];

                  return (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '22px 24px'
                    }}>
                      {/* Problem Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', backgroundColor: levelBadge.bg, color: levelBadge.color }}>
                          {levelBadge.text}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>
                          Contoh #{idx + 1}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                        {ex.question}
                      </h3>

                      {/* Steps Container */}
                      <div style={{ backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: '10px', marginBottom: '14px', border: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
                          Langkah-Langkah Penyelesaian:
                        </div>
                        {ex.steps.map((step, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '14px', color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.6 }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              backgroundColor: '#e2e8f0',
                              color: '#1e293b',
                              fontSize: '12px',
                              fontWeight: 800,
                              flexShrink: 0,
                              marginTop: '2px'
                            }}>
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      {/* Final Answer Banner */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', marginBottom: ex.tips ? '12px' : 0, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>Jawaban Akhir:</span>
                        <span style={{
                          fontFamily: 'inherit',
                          fontWeight: 700,
                          color: '#0f172a',
                          backgroundColor: '#f1f5f9',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1'
                        }}>
                          {ex.answer}
                        </span>
                      </div>

                      {/* Exam Strategy Tip */}
                      {ex.tips && (
                        <div style={{
                          fontSize: '13px',
                          color: '#475569',
                          backgroundColor: '#f8fafc',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          lineHeight: 1.5
                        }}>
                          <strong style={{ color: '#0f172a' }}>Strategi:</strong> {ex.tips}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* SECTION 4: VIDEO PEMBELAJARAN YOUTUBE */}
          {/* =============================================================== */}
          {(activeTab === 'all' || activeTab === 'video') && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              border: '1.5px solid #e2e8f0',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Video Pembelajaran YouTube ({videoData.channel})
                    </h2>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Disusun dan dibahas lengkap oleh kanal edukasi {videoData.channel}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={videoData.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '7px 14px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Buka di YouTube
                  </a>
                  <a
                    href={videoData.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '7px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    Cari Video Lain
                  </a>
                </div>
              </div>

              {/* Responsive Video Embed Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                height: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                marginBottom: '12px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
              }}>
                {isPlayingVideo ? (
                  <>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoData.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                      title={videoData.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 10,
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => setIsPlayingVideo(false)}
                        style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Tutup Pemutar ✕
                      </button>
                      <a
                        href={videoData.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        Buka di YouTube ↗
                      </a>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => setIsPlayingVideo(true)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#0f172a'
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${videoData.youtubeId}/hqdefault.jpg`}
                      alt={videoData.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoData.youtubeId}/0.jpg`;
                      }}
                    />
                    {/* Dark gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.45)',
                      transition: 'background-color 0.2s ease'
                    }} />

                    {/* Centered YouTube Play Button */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '68px',
                      height: '48px',
                      backgroundColor: '#ff0000',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(255, 0, 0, 0.4)',
                      transition: 'transform 0.15s ease'
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: '18px solid #ffffff',
                        marginLeft: '4px'
                      }} />
                    </div>

                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      marginTop: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 700,
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      Klik untuk Putar Video ({videoData.duration ? `~${videoData.duration}` : 'YouTube'})
                    </div>
                  </div>
                )}
              </div>

              {/* Playback Assistance Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 14px',
                marginBottom: '16px',
                fontSize: '12px',
                color: '#64748b',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <span>Jika video tidak dapat diputar langsung di peramban Anda, silakan tonton melalui aplikasi atau web YouTube.</span>
                <a
                  href={videoData.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#dc2626', fontWeight: 700, textDecoration: 'none' }}
                >
                  Tonton di YouTube →
                </a>
              </div>

              {/* Video Meta Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '4px', backgroundColor: '#dcfce7', color: '#15803d' }}>
                  Kanal: {videoData.channel}
                </span>
                {videoData.duration && (
                  <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                    Durasi: ~{videoData.duration}
                  </span>
                )}
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                  {videoData.title}
                </span>
              </div>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                {videoData.description}
              </p>

              {/* Key Takeaways Grid */}
              <div style={{ backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
                  Poin Penting yang Dipelajari di Video Ini:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {videoData.keyPoints.map((kp, kIdx) => (
                    <div key={kIdx} style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#64748b' }}>•</span>
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* SECTION 5: KUIS LATIHAN CEPAT */}
          {/* =============================================================== */}
          {(activeTab === 'all' || activeTab === 'kuis') && activeModalTopic.quickQuiz && activeModalTopic.quickQuiz.length > 0 && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              border: '1.5px solid #e2e8f0',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              {/* Quiz Header & Score Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Kuis Latihan Pemahaman ({totalQuestions} Soal)
                    </h2>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Uji penguasaan konsep kamu langsung dengan feedback interaktif
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    backgroundColor: answeredCount === totalQuestions ? '#ecfdf5' : '#f1f5f9',
                    border: `1px solid ${answeredCount === totalQuestions ? '#a7f3d0' : '#e2e8f0'}`,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: answeredCount === totalQuestions ? '#065f46' : '#334155'
                  }}>
                    Dijawab: {answeredCount}/{totalQuestions} | Skor: {correctCount}/{totalQuestions}
                  </div>
                  {answeredCount > 0 && (
                    <button
                      onClick={handleResetQuiz}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: '#64748b'
                      }}
                    >
                      Ulangi Kuis
                    </button>
                  )}
                </div>
              </div>

              {/* Completion Banner */}
              {answeredCount === totalQuestions && (
                <div style={{
                  backgroundColor: correctCount === totalQuestions ? '#f0fdf4' : '#eff6ff',
                  border: `1.5px solid ${correctCount === totalQuestions ? '#86efac' : '#93c5fd'}`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: correctCount === totalQuestions ? '#166534' : '#1e40af', marginBottom: '4px' }}>
                    {correctCount === totalQuestions ? 'Sempurna! Kamu Menguasai Seluruh Materi Ini!' : `Kuis Selesai! Kamu menjawab benar ${correctCount} dari ${totalQuestions} soal.`}
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569' }}>
                    Pelajari pembahasan di setiap soal di bawah ini untuk memperdalam pemahaman konsep.
                  </div>
                </div>
              )}

              {/* Quiz Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {activeModalTopic.quickQuiz.map((q, qIdx) => {
                  const selectedOption = quizAnswers[qIdx];
                  const isAnswered = selectedOption !== undefined;
                  const isCorrect = isAnswered && selectedOption === q.correctIndex;

                  return (
                    <div key={qIdx} style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '20px 22px'
                    }}>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', lineHeight: 1.5 }}>
                        <span style={{ color: '#2563eb', marginRight: '8px' }}>Soal #{qIdx + 1}:</span>
                        {q.question}
                      </div>

                      {/* Options Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                        {q.options.map((opt, optIdx) => {
                          let btnBg = '#f8fafc';
                          let btnBorder = '#e2e8f0';
                          let btnColor = '#1e293b';

                          if (isAnswered) {
                            if (optIdx === q.correctIndex) {
                              btnBg = '#dcfce7';
                              btnBorder = '#22c55e';
                              btnColor = '#15803d';
                            } else if (optIdx === selectedOption) {
                              btnBg = '#fee2e2';
                              btnBorder = '#ef4444';
                              btnColor = '#b91c1c';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                              style={{
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: `2px solid ${btnBorder}`,
                                backgroundColor: btnBg,
                                color: btnColor,
                                fontSize: '14px',
                                fontWeight: 700,
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <span style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: isAnswered && optIdx === q.correctIndex ? '#15803d' : '#e2e8f0',
                                color: isAnswered && optIdx === q.correctIndex ? '#ffffff' : '#334155',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 800,
                                marginRight: '10px',
                                flexShrink: 0
                              }}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback Box */}
                      {isAnswered && (
                        <div style={{
                          padding: '14px 18px',
                          borderRadius: '10px',
                          backgroundColor: isCorrect ? '#f0fdf4' : '#fff7ed',
                          border: `1px solid ${isCorrect ? '#86efac' : '#fed7aa'}`,
                          fontSize: '13px',
                          lineHeight: 1.6
                        }}>
                          <div style={{ fontWeight: 800, color: isCorrect ? '#166534' : '#9a3412', marginBottom: '4px' }}>
                            {isCorrect ? 'Jawaban Benar!' : `Jawaban Kurang Tepat (Kunci: Opsi ${String.fromCharCode(65 + q.correctIndex)})`}
                          </div>
                          <div style={{ color: '#334155' }}>
                            <strong>Pembahasan Lengkap:</strong> {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* BOTTOM PAGINATION NAVIGATION */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '32px',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <button
              onClick={handlePrevTopic}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#334155',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
              }}
            >
              ← Topik Sebelumnya
            </button>
            <button
              onClick={handleNextTopic}
              style={{
                backgroundColor: '#0f172a',
                border: '1.5px solid #0f172a',
                color: '#ffffff',
                padding: '10px 22px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.2)'
              }}
            >
              Topik Selanjutnya →
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Vibrant Banner Colors matching Image 2 mockup
  const VIBRANT_BANNER_COLORS = [
    '#FFD21E', // Yellow (Card 1)
    '#6EE7B7', // Mint Teal (Card 2)
    '#FDBA74', // Peach Orange (Card 3)
    '#38BDF8', // Cyan Blue (Card 4)
    '#C084FC', // Violet Purple (Card 5)
    '#FB7185', // Rose Pink (Card 6)
    '#4ADE80', // Emerald Green (Card 7)
    '#818CF8', // Indigo (Card 8)
    '#F472B6'  // Hot Pink (Card 9)
  ];

  // =========================================================================
  // TOPIC LISTING PAGE (RESOURCES VIEW)
  // =========================================================================
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '2.5rem 1.25rem', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        {/* Top Header Matching Image 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#000000', margin: 0, letterSpacing: '-0.02em' }}>
            Learning Modules
          </h1>
          <span style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 800,
            padding: '4px 14px',
            borderRadius: '9999px'
          }}>
            {filteredData.length} Topics Available
          </span>
        </div>

        {/* Filter Controls Bar (No Box Wrapper) */}
        <div style={{
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          {/* Grade Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {[
              { id: 'all', label: 'Semua Kelas', count: ALL_MATERI.length },
              { id: 10, label: 'Kelas 10', count: ALL_MATERI.filter(m => m.grade === 10).length },
              { id: 11, label: 'Kelas 11', count: ALL_MATERI.filter(m => m.grade === 11).length },
              { id: 12, label: 'Kelas 12', count: ALL_MATERI.filter(m => m.grade === 12).length }
            ].map((g) => {
              const isSelected = gradeFilter === g.id;
              return (
                <button
                  key={String(g.id)}
                  onClick={() => setGradeFilter(g.id as any)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: isSelected ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                    backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{g.label}</span>
                  <span style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#334155' : '#f1f5f9',
                    color: isSelected ? '#f8fafc' : '#64748b'
                  }}>
                    {g.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <input
              type="text"
              placeholder="Cari materi, rumus, konsep..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 36px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <svg
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94a3b8' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* TOPICS GRID MATCHING IMAGE 2 */}
        {filteredData.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px dashed #cbd5e1',
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: '#94a3b8' }}>
              <svg width="36" height="36" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Tidak ada materi ditemukan</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Coba ubah filter kelas atau kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '22px' }}>
            {filteredData.map((materi, index) => {
              const bannerColor = VIBRANT_BANNER_COLORS[index % VIBRANT_BANNER_COLORS.length];

              return (
                <div 
                  key={materi.id} 
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Banner Image with subtle Aa watermark exactly like Image 2 */}
                  <div style={{
                    height: '140px',
                    backgroundColor: bannerColor,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '20px',
                      top: '24px',
                      fontWeight: 900,
                      fontSize: '56px',
                      color: '#000000',
                      opacity: 0.14,
                      transform: 'rotate(-8deg)',
                      userSelect: 'none',
                      lineHeight: 1
                    }}>
                      Aa
                    </div>
                  </div>

                  {/* Clean Card Body Matching Image 2 */}
                  <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{
                        fontWeight: 800,
                        fontSize: '18px',
                        lineHeight: 1.35,
                        color: '#000000',
                        margin: '0 0 10px 0'
                      }}>
                        {materi.title}
                      </h3>

                      <p style={{
                        color: '#64748b',
                        fontSize: '13px',
                        lineHeight: 1.55,
                        margin: '0 0 20px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {materi.summary}
                      </p>
                    </div>

                    {/* Open Button Matching Image 2 */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleOpenTopic(materi);
                      }}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 800,
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: '2px solid #000000',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: 'auto',
                        boxShadow: '3px 3px 0px #000000',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translate(1px, 1px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
