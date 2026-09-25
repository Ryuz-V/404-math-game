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

export default function MateriSection({ onStartSoloWithTopic, initialTopicId }: MateriSectionProps) {
  const [activeModalTopic, setActiveModalTopic] = useState<MathTopic | null>(null);
  const [activeTab, setActiveTab] = useState<'konsep' | 'rumus' | 'contoh' | 'kuis'>('konsep');

  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const filteredData = ALL_MATERI;

  const handleOpenTopic = (topic: MathTopic) => {
    setActiveModalTopic(topic);
    setActiveTab('konsep');
    setQuizAnswers({});
  };

  useEffect(() => {
    if (initialTopicId) {
      const search = initialTopicId.toLowerCase();
      const topic = ALL_MATERI.find(m =>
        m.id === initialTopicId ||
        m.title.toLowerCase().includes(search) ||
        m.category.toLowerCase().includes(search)
      );
      if (topic) {
        handleOpenTopic(topic);
      }
    }
  }, [initialTopicId]);

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
                  onClick={() => handleOpenTopic(materi)} 
                  style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease', fontFamily: 'sans-serif' }}
                >
                  {/* Fikri Studio Banner */}
                  <div style={{ height: '140px', margin: '8px', borderRadius: '16px 16px 4px 4px', backgroundColor: materi.color || '#fcd34d', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(49, 46, 129, 0.8)', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                      {stats.enrolled} Enrolled
                    </div>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, position: 'relative' }}>
                       <div style={{ position: 'absolute', fontWeight: 900, fontSize: '60px', color: 'rgba(49, 46, 129, 0.1)', transform: 'rotate(-12deg)', left: '32px' }}>Aa</div>
                    </div>
                  </div>

                  {/* Card Body dengan Padding/Margin 20px Kiri-Kanan */}
                  <div style={{ padding: '16px 20px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '16px', lineHeight: 1.4, color: '#111827', marginBottom: '12px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {materi.title}
                    </h3>
                    
                    {/* Deskripsi Materi */}
                    <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: 500, lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                      {materi.summary}
                    </p>

                    {/* Fikri Studio Circle Charts */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <CircleChart percentage={stats.accuracy} color={stats.accuracy === 100 ? "#10b981" : stats.accuracy === 0 ? "#e5e7eb" : "#10b981"} />
                        <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Accuracy</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{stats.accuracy}%</span>
                          <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 'bold' }}>(i)</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <CircleChart percentage={stats.completion} color="#10b981" />
                        <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Completion Rate</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{stats.completion}%</span>
                          <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 'bold' }}>(i)</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <span style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {materi.category}
                      </span>
                      <span style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        Grade {materi.grade}
                      </span>
                      <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }}>👤</div>
                    </div>
                    
                    {/* Tombol Take Quiz */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (onStartSoloWithTopic) onStartSoloWithTopic(materi.id); 
                      }}
                      style={{ backgroundColor: '#ffdc00', color: 'black', fontSize: '11px', fontWeight: 800, padding: '8px', borderRadius: '8px', border: '1.5px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'background-color 0.2s', width: '100%', marginTop: 'auto' }}
                    >
                      <span>🎯</span> Take Quiz
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activeModalTopic && (
        <div className="reader-modal-overlay" onClick={() => setActiveModalTopic(null)}>
          <div className="reader-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="reader-modal-header">
              <div className="reader-modal-title-box">
                <span className="reader-modal-icon">{activeModalTopic.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="reader-modal-tag" style={{ background: '#000', color: '#fff' }}>Grade {activeModalTopic.grade}</span>
                    <span className="reader-modal-tag" style={{ background: '#ffdc00' }}>{activeModalTopic.category}</span>
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: '#000', letterSpacing: '-0.5px' }}>
                    {activeModalTopic.title}
                  </h2>
                </div>
              </div>
              <button onClick={() => setActiveModalTopic(null)} className="reader-modal-close-btn" title="Close">✕</button>
            </div>

            <div className="reader-modal-tabs">
              <button onClick={() => setActiveTab('konsep')} className={`reader-tab-btn ${activeTab === 'konsep' ? 'active' : ''}`}>📘 Concepts & Theory</button>
              <button onClick={() => setActiveTab('rumus')} className={`reader-tab-btn ${activeTab === 'rumus' ? 'active' : ''}`}>⚡ Key Formulas ({activeModalTopic.keyFormulas.length})</button>
              <button onClick={() => setActiveTab('contoh')} className={`reader-tab-btn ${activeTab === 'contoh' ? 'active' : ''}`}>💡 Worked Examples ({activeModalTopic.examples.length})</button>
              {activeModalTopic.quickQuiz && activeModalTopic.quickQuiz.length > 0 && (
                <button onClick={() => setActiveTab('kuis')} className={`reader-tab-btn ${activeTab === 'kuis' ? 'active' : ''}`}>🧠 Mini Quiz</button>
              )}
            </div>

            <div className="reader-modal-body" style={{ overflowY: 'auto', overflowX: 'hidden', flex: '1 1 0%', minHeight: 0, maxHeight: '100%', WebkitOverflowScrolling: 'touch' }}>
              {activeTab === 'konsep' && (
                <div>
                  <div style={{ background: '#fff', border: '2.5px solid #000', borderRadius: '16px', padding: '1.4rem', marginBottom: '1.8rem', boxShadow: '4px 4px 0 #000' }}>
                    <div style={{ display: 'inline-block', background: '#ffdc00', border: '1.5px solid #000', borderRadius: '6px', padding: '0.2rem 0.6rem', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.75rem' }}>💡 Module Overview & Learning Outcomes</div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, margin: 0, color: '#222', fontWeight: 500 }}>{activeModalTopic.detailedOverview}</p>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1rem', color: '#000' }}>Key Curriculum Points</h3>
                  {activeModalTopic.coreConcepts.map((section, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '2.5px solid #000', borderRadius: '16px', padding: '1.4rem', marginBottom: '1.2rem', boxShadow: '4px 4px 0 #000' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#000', marginBottom: '0.85rem' }}>{section.title}</h4>
                      <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                        {section.points.map((pt, pIdx) => (
                          <li key={pIdx} style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#222', marginBottom: '0.5rem', fontWeight: 500 }}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rumus' && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.25rem' }}>Use the following formula cheat-sheet cards as a fast reference for homework, exam preparation, and competitions:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                    {activeModalTopic.keyFormulas.map((f, idx) => (
                      <div key={idx} className="formula-item-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{f.name}</span>
                          <button onClick={() => handleCopyFormula(f.formula, f.name)} style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 700, background: '#fff', border: '1.5px solid #000', borderRadius: '6px', cursor: 'pointer' }}>
                            {copiedFormula === f.name ? '✓ Copied!' : '📋 Copy'}
                          </button>
                        </div>
                        <div className="formula-display">{f.formula}</div>
                        <p style={{ fontSize: '0.8rem', color: '#444', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>{f.desc}</p>
                        {f.note && (
                          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '6px', padding: '0.4rem 0.6rem', fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>💡 Note: {f.note}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contoh' && (
                <div>
                  {activeModalTopic.examples.map((ex, idx) => (
                    <div key={idx} className="example-item-card">
                      <div className="example-card-head">
                        <span>Worked Example {idx + 1}</span>
                        {ex.level && <span style={{ background: '#fff', border: '1px solid #000', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Level: {ex.level}</span>}
                      </div>
                      <div className="example-card-body">
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>{ex.question}</p>
                        <div className="example-steps-box">
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#555', marginBottom: '0.4rem' }}>Step-by-Step Solution:</span>
                          {ex.steps.map((step, sIdx) => (
                            <div key={sIdx} style={{ fontSize: '0.85rem', color: '#222', lineHeight: 1.5, marginBottom: '0.35rem' }}><strong>{sIdx + 1}.</strong> {step}</div>
                          ))}
                        </div>
                        <div className="example-answer-box">
                          <span>Final Answer:</span>
                          <span style={{ fontFamily: 'monospace', fontSize: '1rem' }}>{ex.answer}</span>
                        </div>
                        {ex.tips && (
                          <div style={{ marginTop: '0.75rem', background: '#e0f2fe', border: '1.5px solid #0284c7', borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#0369a1', fontWeight: 600 }}>💡 <strong>Exam Strategy & Tips:</strong> {ex.tips}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'kuis' && activeModalTopic.quickQuiz && (
                <div>
                  <div style={{ background: '#fef9c3', border: '2px solid #ca8a04', borderRadius: '10px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#854d0e', fontWeight: 700, marginBottom: '1.25rem' }}>🎯 Test your understanding! Select an option below to receive instant validation and detailed explanations.</div>
                  {activeModalTopic.quickQuiz.map((q, qIdx) => {
                    const answered = quizAnswers[qIdx] !== undefined;
                    const selected = quizAnswers[qIdx];
                    const isCorrect = selected === q.correctIndex;
                    return (
                      <div key={qIdx} style={{ background: '#f8fafc', border: '2px solid #000', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '3px 3px 0 #000' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem' }}>{qIdx + 1}. {q.question}</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                          {q.options.map((opt, optIdx) => {
                            let btnClass = 'quiz-opt-btn';
                            if (answered) {
                              if (optIdx === q.correctIndex) btnClass += ' correct';
                              else if (optIdx === selected) btnClass += ' wrong';
                            }
                            return <button key={optIdx} disabled={answered} onClick={() => handleAnswerQuiz(qIdx, optIdx)} className={btnClass}>{opt}</button>;
                          })}
                        </div>
                        {answered && (
                          <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '2px solid #000', background: isCorrect ? '#dcfce7' : '#fee2e2', color: isCorrect ? '#166534' : '#991b1b', fontSize: '0.85rem' }}>
                            <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>{isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect'}</div>
                            <div>{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="reader-modal-footer">
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={handlePrevTopic} className="btn-study-action" style={{ padding: '0.65rem 1.2rem', fontSize: '0.9rem' }}>← Previous</button>
                <button onClick={handleNextTopic} className="btn-study-action" style={{ padding: '0.65rem 1.2rem', fontSize: '0.9rem' }}>Next →</button>
              </div>
              <button onClick={() => {
                const topicId = activeModalTopic.id;
                setActiveModalTopic(null);
                if (onStartSoloWithTopic) onStartSoloWithTopic(topicId);
              }} className="btn-quiz-action" style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}>🚀 Practice Quiz in Solo Game</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}