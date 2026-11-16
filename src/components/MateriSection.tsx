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

  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // List view filters
  const [gradeFilter, setGradeFilter] = useState<'all' | 10 | 11 | 12>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Data berdasarkan Kelas dan Pencarian
  const filteredData = ALL_MATERI.filter(m => {
    const matchesGrade = gradeFilter === 'all' || m.grade === gradeFilter;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const gradeTabs = [
    { id: 'all', label: 'All Grades', count: ALL_MATERI.length },
    { id: 10, label: 'Grade 10', count: ALL_MATERI.filter(m => m.grade === 10).length },
    { id: 11, label: 'Grade 11', count: ALL_MATERI.filter(m => m.grade === 11).length },
    { id: 12, label: 'Grade 12', count: ALL_MATERI.filter(m => m.grade === 12).length }
  ];

  const handleOpenTopic = (topic: MathTopic) => {
    setActiveModalTopic(topic);
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

  // =========================================================================
  // DETAIL TOPIK (MODAL / FULL VIEW SEPERTI SEBELUMNYA)
  // =========================================================================
  if (activeModalTopic) {
    const pdfFilename = TOPIC_PDF_MAP[activeModalTopic.id] || null;
    const topicVideo = getMathVideoForTopic(activeModalTopic.id, activeModalTopic.title);

    return (
      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '2rem 1.25rem', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => setActiveModalTopic(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4b5563',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '12px',
                padding: '4px 0'
              }}
            >
              ← Back to Learning Modules
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: 0, textTransform: 'uppercase' }}>
              {activeModalTopic.title}
            </h1>
          </div>

          {/* Section 1: Overview & Concepts (PDF Module & Video Pembahasan Langsung) */}
          {(pdfFilename || (topicVideo && topicVideo.embedUrl)) && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '20px', textTransform: 'uppercase' }}>
                Overview & Concepts
              </h2>

              {/* 1. Tempat Membuka File PDF (Tampilan Seperti Sebelumnya, Bersih Tanpa Box Abu-abu) */}
              {pdfFilename && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  marginBottom: topicVideo && topicVideo.embedUrl ? '24px' : '0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '240px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      flexShrink: 0
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>
                          Curriculum PDF Module
                        </h3>
                        <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#dc2626', color: '#ffffff', padding: '2px 6px', borderRadius: '4px' }}>
                          PDF
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`/assets/file%20materi/${encodeURIComponent(pdfFilename)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 4px rgba(220, 38, 38, 0.25)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>Open PDF File</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              )}

              {/* 2. Video Player Terpasang Langsung (Nonton Langsung Tanpa Kotak Merah & Abu-abu) */}
              {topicVideo && topicVideo.embedUrl && (
                <div style={{
                  width: '100%',
                  maxWidth: '920px',
                  margin: '0 auto',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  backgroundColor: '#000000',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}>
                  <iframe
                    src={topicVideo.embedUrl}
                    title={topicVideo.title}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          {/* Section 2: Key Formulas & Worked Examples (Rumus & Contoh Soal Minimal 2 dengan Jawabannya) */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '20px', textTransform: 'uppercase' }}>
              Key Formulas & Worked Examples
            </h2>

            {/* Sub-section A: Essential Formulas */}
            {activeModalTopic.keyFormulas && activeModalTopic.keyFormulas.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚡</span>
                  <span>Formula Reference</span>
                </h3>
                {activeModalTopic.keyFormulas.map((f, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx === activeModalTopic.keyFormulas.length - 1 ? 0 : '16px', borderBottom: idx === activeModalTopic.keyFormulas.length - 1 ? 'none' : '1px solid #f3f4f6', paddingBottom: idx === activeModalTopic.keyFormulas.length - 1 ? 0 : '16px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                      ⚡
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>{f.name}</h4>
                        <button onClick={() => handleCopyFormula(f.formula, f.name)} style={{ background: 'none', border: '1px solid #e5e7eb', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', color: '#4b5563' }}>
                          {copiedFormula === f.name ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '16px', color: '#0f172a', marginBottom: '8px', overflowX: 'auto' }}>
                        {f.formula}
                      </div>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{f.desc}</p>
                      {f.note && (
                        <div style={{ marginTop: '8px', fontSize: '13px', color: '#b45309', backgroundColor: '#fef3c7', padding: '6px 12px', borderRadius: '4px', display: 'inline-block' }}>
                          Note: {f.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-section B: Worked Examples (Minimal 2 Contoh Soal dengan Pembahasan & Jawaban) */}
            {activeModalTopic.examples && activeModalTopic.examples.length > 0 && (
              <div style={{ borderTop: activeModalTopic.keyFormulas && activeModalTopic.keyFormulas.length > 0 ? '2px solid #f3f4f6' : 'none', paddingTop: activeModalTopic.keyFormulas && activeModalTopic.keyFormulas.length > 0 ? '24px' : 0 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📝</span>
                  <span>Worked Examples & Solutions ({activeModalTopic.examples.length} Problems)</span>
                </h3>
                {activeModalTopic.examples.map((ex, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx === activeModalTopic.examples.length - 1 ? 0 : '24px', borderBottom: idx === activeModalTopic.examples.length - 1 ? 'none' : '1px solid #f3f4f6', paddingBottom: idx === activeModalTopic.examples.length - 1 ? 0 : '24px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                      📝
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.5 }}>
                          Example {idx + 1}: {ex.question}
                        </h4>
                        {ex.level && (
                          <span style={{ fontSize: '12px', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '2px 8px', borderRadius: '9999px', fontWeight: 600, marginLeft: '12px', flexShrink: 0 }}>
                            {ex.level}
                          </span>
                        )}
                      </div>
                      <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Step-by-Step Solution:</div>
                        {ex.steps.map((step, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '14px', color: '#334155', marginBottom: '6px' }}>
                            <span style={{ fontWeight: 600, marginRight: '8px' }}>{sIdx + 1}.</span> {step}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', marginBottom: ex.tips ? '12px' : 0 }}>
                        <span style={{ fontWeight: 600, color: '#111827' }}>Final Answer:</span>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>{ex.answer}</span>
                      </div>
                      {ex.tips && (
                        <div style={{ marginTop: '12px', fontSize: '13px', color: '#0369a1', backgroundColor: '#e0f2fe', padding: '8px 12px', borderRadius: '6px' }}>
                          <strong>Exam Strategy:</strong> {ex.tips}
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

  // =========================================================================
  // LISTING TOPIK (RESOURCE PAGE DENGAN FILTER & SEARCH BERGAYA NEO-BRUTALIST)
  // =========================================================================
  return (
    <div className="resources-page-wrapper">
      <div className="resources-main-content">
        {/* Header Section */}
        <div className="resources-section-header">
          <h2 className="resources-section-title">
            <span>Learning Modules</span>
          </h2>
        </div>

        {/* Toolbar: Category/Grade Buttons & Search Bar (Sesuai gaya UI Resource) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Category/Grade Filter Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {gradeTabs.map((g) => {
              const isSelected = gradeFilter === g.id;
              return (
                <button
                  key={String(g.id)}
                  onClick={() => setGradeFilter(g.id as any)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '2.5px solid #000000',
                    backgroundColor: isSelected ? '#ffdc00' : '#ffffff',
                    color: '#000000',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? '3px 3px 0px #000000' : '3px 3px 0px #000000',
                    transition: 'all 0.15s ease',
                    transform: isSelected ? 'translate(1px, 1px)' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translate(1px, 1px)';
                      e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
                    }
                  }}
                >
                  <span>{g.label}</span>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#000000' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#000000',
                    border: isSelected ? '1px solid #000000' : '1px solid #000000',
                    fontWeight: 800
                  }}>
                    {g.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar Input (Neo-Brutalist Border & Shadow) */}
          <div style={{ position: 'relative', minWidth: '260px', flex: '1 1 260px', maxWidth: '420px' }}>
            <input
              type="text"
              placeholder="Search topics, formulas, concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 36px 9px 38px',
                borderRadius: '8px',
                border: '2.5px solid #000000',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                color: '#000000',
                outline: 'none',
                boxShadow: '3px 3px 0px #000000',
                fontFamily: 'inherit',
                transition: 'box-shadow 0.15s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }}
            />
            {/* Search Icon */}
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: '#000000',
                  padding: '2px 6px'
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Card Grid / Empty State */}
        {filteredData.length === 0 ? (
          <div style={{ background: '#fff', border: '2.5px solid #000', borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '4px 4px 0 #000' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Materials Found</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0' }}>
              No learning materials match your search &quot;{searchQuery}&quot;. Try another keyword or select a different grade.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', padding: '12px 0' }}>
            {filteredData.map((materi) => {
              return (
                <div 
                  key={materi.id} 
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Banner Image (Edge to Edge dengan Watermark Aa) */}
                  <div style={{
                    height: '160px',
                    backgroundColor: materi.color || '#fcd34d',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.7,
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        fontWeight: 900,
                        fontSize: '60px',
                        color: 'rgba(49, 46, 129, 0.1)',
                        transform: 'rotate(-12deg)',
                        left: '32px'
                      }}>
                        Aa
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Title */}
                    <h3 style={{
                      fontWeight: 800,
                      fontSize: '18px',
                      lineHeight: 1.4,
                      color: '#111827',
                      marginBottom: '16px'
                    }}>
                      {materi.title}
                    </h3>

                    {/* Deskripsi Material */}
                    <p style={{
                      color: '#6b7280',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {materi.summary}
                    </p>
                    
                    {/* Tombol Open Neo-brutalist dengan 3D drop shadow */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleOpenTopic(materi);
                      }}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '16px',
                        fontWeight: 800,
                        padding: '12px',
                        borderRadius: '6px',
                        border: '3px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.1s ease-in-out',
                        width: '100%',
                        marginTop: 'auto',
                        boxShadow: '5px 5px 0px #000000'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                        e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
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
