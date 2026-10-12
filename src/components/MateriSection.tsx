"use client";

import { useState, useEffect } from 'react';
import { ALL_MATERI, MathTopic } from '../data/mathData';

interface MateriSectionProps {
  onStartSoloWithTopic?: (topicId: string) => void;
  onStartVersus?: () => void;
  initialTopicId?: string;
}

const getDeterministicStats = (id: string) => {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return {
    enrolled: (sum % 50) + 10,
    accuracy: (sum % 60) + 40,
    completion: (sum % 40) + 60,
    timeAgo: (sum % 24) + 1
  };
};

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
  const [activeTab, setActiveTab] = useState<'konsep' | 'rumus' | 'contoh' | 'kuis'>('konsep');

  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const filteredData = ALL_MATERI;

  const handleOpenTopic = (topic: MathTopic) => {
    setActiveModalTopic(topic);
    setActiveTab('konsep');
    setQuizAnswers({});
  };

  const handleCopyFormula = (formula: string, name: string) => {
    navigator.clipboard.writeText(`${name}: ${formula}`);
    setCopiedFormula(name);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const handleAnswerQuiz = (qIdx: number, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleNextTopic = () => {
    if (!activeModalTopic) return;
    const currIdx = filteredData.findIndex(m => m.id === activeModalTopic.id);
    const nextIdx = (currIdx + 1) % filteredData.length;
    setActiveModalTopic(filteredData[nextIdx]);
    setQuizAnswers({});
  };

  const handlePrevTopic = () => {
    if (!activeModalTopic) return;
    const currIdx = filteredData.findIndex(m => m.id === activeModalTopic.id);
    const prevIdx = (currIdx - 1 + filteredData.length) % filteredData.length;
    setActiveModalTopic(filteredData[prevIdx]);
    setQuizAnswers({});
  };

  if (activeModalTopic) {
    return (
      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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

          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase' }}>Overview & Concepts</h2>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e7ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                📘
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 8px 0' }}>Theory & Learning Outcomes</h3>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {activeModalTopic.detailedOverview}
                </p>
              </div>
            </div>

            {activeModalTopic.coreConcepts.map((section, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx === activeModalTopic.coreConcepts.length - 1 ? 0 : '16px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  💡
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 8px 0' }}>{section.title}</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#4b5563', fontSize: '14px', lineHeight: 1.6 }}>
                    {section.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ marginBottom: '4px' }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {activeModalTopic.keyFormulas.length > 0 && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase' }}>Key Formulas</h2>
              {activeModalTopic.keyFormulas.map((f, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx === activeModalTopic.keyFormulas.length - 1 ? 0 : '16px', borderBottom: idx === activeModalTopic.keyFormulas.length - 1 ? 'none' : '1px solid #f3f4f6', paddingBottom: idx === activeModalTopic.keyFormulas.length - 1 ? 0 : '16px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    ⚡
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>{f.name}</h3>
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

          {activeModalTopic.examples.length > 0 && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase' }}>Worked Examples</h2>
              {activeModalTopic.examples.map((ex, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx === activeModalTopic.examples.length - 1 ? 0 : '24px', borderBottom: idx === activeModalTopic.examples.length - 1 ? 'none' : '1px solid #f3f4f6', paddingBottom: idx === activeModalTopic.examples.length - 1 ? 0 : '24px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    📝
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.5 }}>{ex.question}</h3>
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
    );
  }

  return (
    <div className="resources-page-wrapper">
      <div className="resources-main-content">
        <div className="resources-section-header">
          <h2 className="resources-section-title">
            <span>Learning Modules</span>
            <span className="resources-count-tag">{filteredData.length} Topics Available</span>
          </h2>
        </div>

        {filteredData.length === 0 ? (
          <div style={{ background: '#fff', border: '2.5px solid #000', borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '4px 4px 0 #000' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Materials Found</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0' }}>No learning modules currently available.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', padding: '12px 0' }}>
            {filteredData.map((materi) => {
              const stats = getDeterministicStats(materi.id);

              const CircleChart = ({ percentage, color }: { percentage: number, color: string }) => (
                <svg width="28" height="28" viewBox="0 0 36 36" style={{ marginBottom: '4px' }}>
                  <path style={{ color: '#e5e7eb' }} stroke="currentColor" strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path style={{ stroke: color }} strokeDasharray={`${percentage}, 100`} strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              );

              return (
                <div 
                  key={materi.id} 
                  style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                >
                  {/* Banner Image (Edge to Edge like Image 1) */}
                  <div style={{ height: '160px', backgroundColor: materi.color || '#fcd34d', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, position: 'relative' }}>
                       <div style={{ position: 'absolute', fontWeight: 900, fontSize: '60px', color: 'rgba(49, 46, 129, 0.1)', transform: 'rotate(-12deg)', left: '32px' }}>Aa</div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    


                    {/* Title (Kept from Image 2) */}
                    <h3 style={{ fontWeight: 800, fontSize: '18px', lineHeight: 1.4, color: '#111827', marginBottom: '16px' }}>
                      {materi.title}
                    </h3>

                    {/* Deskripsi Material (Exception, Kept from Image 2) */}
                    <p style={{ color: '#6b7280', fontSize: '12px', fontWeight: 500, lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {materi.summary}
                    </p>
                    
                    {/* Tombol Open */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleOpenTopic(materi);
                      }}
                      style={{ backgroundColor: '#ffffff', color: '#000000', fontSize: '16px', fontWeight: 800, padding: '12px', borderRadius: '6px', border: '3px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.1s ease-in-out', width: '100%', marginTop: 'auto', boxShadow: '5px 5px 0px #000000' }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = '3px 3px 0px #000000'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '5px 5px 0px #000000'; }}
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