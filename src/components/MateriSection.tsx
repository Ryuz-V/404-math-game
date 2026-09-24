"use client";

import { useState, useEffect } from 'react';
import { ALL_MATERI, MathTopic } from '../data/mathData';

interface MateriSectionProps {
  onStartSoloWithTopic?: (topicId: string) => void;
  onStartVersus?: () => void;
  initialTopicId?: string;
}

export default function MateriSection({ onStartSoloWithTopic, initialTopicId }: MateriSectionProps) {
  const [activeModalTopic, setActiveModalTopic] = useState<MathTopic | null>(null);
  const [activeTab, setActiveTab] = useState<'konsep' | 'rumus' | 'contoh' | 'kuis'>('konsep');
  
  // Interactive Mini-Quiz state inside modal
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
      {/* Main Content Area */}
      <div className="resources-main-content">
        
        {/* Section Header */}
        <div className="resources-section-header">
          <h2 className="resources-section-title">
            <span>Learning Modules</span>
            <span className="resources-count-tag">{filteredData.length} Topics Available</span>
          </h2>
        </div>

        {/* Cards Grid */}
        {filteredData.length === 0 ? (
          <div style={{
            background: '#fff',
            border: '2.5px solid #000',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '4px 4px 0 #000'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Materials Found</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0' }}>
              No learning modules currently available.
            </p>
          </div>
        ) : (
          <div className="resources-grid">
            {filteredData.map((materi) => (
              <div
                key={materi.id}
                onClick={() => handleOpenTopic(materi)}
                className="resource-card"
              >
                {/* Card Banner */}
                <div 
                  className="resource-card-banner"
                  style={{
                    backgroundColor: `${materi.color}33`,
                    background: `linear-gradient(135deg, ${materi.color}55 0%, #ffffff 100%)`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '0.45rem' }}>
                      <span className="resource-card-tag" style={{ background: '#000', color: '#fff' }}>
                        Grade {materi.grade}
                      </span>
                      <span className="resource-card-tag">{materi.category}</span>
                    </div>
                  </div>
                  <div className="resource-card-icon">
                    {materi.icon}
                  </div>
                </div>

                {/* Card Body */}
                <div className="resource-card-body">
                  <h3 className="resource-card-title">{materi.title}</h3>
                  <p className="resource-card-desc">{materi.summary}</p>

                  <div className="resource-card-stats">
                    <span>⚡ {materi.keyFormulas.length} Key Formulas</span>
                    <span>💡 {materi.examples.length} Worked Examples</span>
                  </div>

                  <div className="resource-card-actions">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTopic(materi);
                      }}
                      className="btn-study-action"
                    >
                      📖 Study Material
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onStartSoloWithTopic) onStartSoloWithTopic(materi.id);
                      }}
                      className="btn-quiz-action"
                    >
                      🎯 Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          INTERACTIVE LEARNING READER MODAL (IN ENGLISH)
          ========================================================================= */}
      {activeModalTopic && (
        <div className="reader-modal-overlay" onClick={() => setActiveModalTopic(null)}>
          <div 
            className="reader-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="reader-modal-header">
              <div className="reader-modal-title-box">
                <span className="reader-modal-icon">
                  {activeModalTopic.icon}
                </span>
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

              <button
                onClick={() => setActiveModalTopic(null)}
                className="reader-modal-close-btn"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="reader-modal-tabs">
              <button
                onClick={() => setActiveTab('konsep')}
                className={`reader-tab-btn ${activeTab === 'konsep' ? 'active' : ''}`}
              >
                📘 Concepts & Theory
              </button>
              <button
                onClick={() => setActiveTab('rumus')}
                className={`reader-tab-btn ${activeTab === 'rumus' ? 'active' : ''}`}
              >
                ⚡ Key Formulas ({activeModalTopic.keyFormulas.length})
              </button>
              <button
                onClick={() => setActiveTab('contoh')}
                className={`reader-tab-btn ${activeTab === 'contoh' ? 'active' : ''}`}
              >
                💡 Worked Examples ({activeModalTopic.examples.length})
              </button>
              {activeModalTopic.quickQuiz && activeModalTopic.quickQuiz.length > 0 && (
                <button
                  onClick={() => setActiveTab('kuis')}
                  className={`reader-tab-btn ${activeTab === 'kuis' ? 'active' : ''}`}
                >
                  🧠 Mini Quiz
                </button>
              )}
            </div>

            {/* Modal Body with guaranteed scrolling */}
            <div 
              className="reader-modal-body"
              style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                flex: '1 1 0%',
                minHeight: 0,
                maxHeight: '100%',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              
              {/* TAB 1: CONCEPTS & THEORY */}
              {activeTab === 'konsep' && (
                <div>
                  {/* Overview box */}
                  <div style={{
                    background: '#fff',
                    border: '2.5px solid #000',
                    borderRadius: '16px',
                    padding: '1.4rem',
                    marginBottom: '1.8rem',
                    boxShadow: '4px 4px 0 #000'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: '#ffdc00',
                      border: '1.5px solid #000',
                      borderRadius: '6px',
                      padding: '0.2rem 0.6rem',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      marginBottom: '0.75rem'
                    }}>
                      💡 Module Overview & Learning Outcomes
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, margin: 0, color: '#222', fontWeight: 500 }}>
                      {activeModalTopic.detailedOverview}
                    </p>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1rem', color: '#000' }}>
                    Key Curriculum Points
                  </h3>

                  {activeModalTopic.coreConcepts.map((section, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        background: '#f8fafc',
                        border: '2.5px solid #000',
                        borderRadius: '16px',
                        padding: '1.4rem',
                        marginBottom: '1.2rem',
                        boxShadow: '4px 4px 0 #000'
                      }}
                    >
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#000', marginBottom: '0.85rem' }}>
                        {section.title}
                      </h4>
                      <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                        {section.points.map((pt, pIdx) => (
                          <li key={pIdx} style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#222', marginBottom: '0.5rem', fontWeight: 500 }}>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: KEY FORMULAS */}
              {activeTab === 'rumus' && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.25rem' }}>
                    Use the following formula cheat-sheet cards as a fast reference for homework, exam preparation, and competitions:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                    {activeModalTopic.keyFormulas.map((f, idx) => (
                      <div key={idx} className="formula-item-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{f.name}</span>
                          <button
                            onClick={() => handleCopyFormula(f.formula, f.name)}
                            style={{
                              padding: '0.25rem 0.6rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: '#fff',
                              border: '1.5px solid #000',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            {copiedFormula === f.name ? '✓ Copied!' : '📋 Copy'}
                          </button>
                        </div>

                        <div className="formula-display">
                          {f.formula}
                        </div>

                        <p style={{ fontSize: '0.8rem', color: '#444', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                          {f.desc}
                        </p>

                        {f.note && (
                          <div style={{
                            background: '#fef3c7',
                            border: '1px solid #f59e0b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.6rem',
                            fontSize: '0.75rem',
                            color: '#92400e',
                            fontWeight: 600
                          }}>
                            💡 Note: {f.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WORKED EXAMPLES */}
              {activeTab === 'contoh' && (
                <div>
                  {activeModalTopic.examples.map((ex, idx) => (
                    <div key={idx} className="example-item-card">
                      <div className="example-card-head">
                        <span>Worked Example {idx + 1}</span>
                        {ex.level && (
                          <span style={{
                            background: '#fff',
                            border: '1px solid #000',
                            padding: '0.1rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem'
                          }}>
                            Level: {ex.level}
                          </span>
                        )}
                      </div>

                      <div className="example-card-body">
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                          {ex.question}
                        </p>

                        <div className="example-steps-box">
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#555', marginBottom: '0.4rem' }}>
                            Step-by-Step Solution:
                          </span>
                          {ex.steps.map((step, sIdx) => (
                            <div key={sIdx} style={{ fontSize: '0.85rem', color: '#222', lineHeight: 1.5, marginBottom: '0.35rem' }}>
                              <strong>{sIdx + 1}.</strong> {step}
                            </div>
                          ))}
                        </div>

                        <div className="example-answer-box">
                          <span>Final Answer:</span>
                          <span style={{ fontFamily: 'monospace', fontSize: '1rem' }}>{ex.answer}</span>
                        </div>

                        {ex.tips && (
                          <div style={{
                            marginTop: '0.75rem',
                            background: '#e0f2fe',
                            border: '1.5px solid #0284c7',
                            borderRadius: '8px',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            color: '#0369a1',
                            fontWeight: 600
                          }}>
                            💡 <strong>Exam Strategy & Tips:</strong> {ex.tips}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: MINI QUIZ */}
              {activeTab === 'kuis' && activeModalTopic.quickQuiz && (
                <div>
                  <div style={{
                    background: '#fef9c3',
                    border: '2px solid #ca8a04',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.85rem',
                    color: '#854d0e',
                    fontWeight: 700,
                    marginBottom: '1.25rem'
                  }}>
                    🎯 Test your understanding! Select an option below to receive instant validation and detailed explanations.
                  </div>

                  {activeModalTopic.quickQuiz.map((q, qIdx) => {
                    const answered = quizAnswers[qIdx] !== undefined;
                    const selected = quizAnswers[qIdx];
                    const isCorrect = selected === q.correctIndex;

                    return (
                      <div 
                        key={qIdx}
                        style={{
                          background: '#f8fafc',
                          border: '2px solid #000',
                          borderRadius: '12px',
                          padding: '1.25rem',
                          marginBottom: '1rem',
                          boxShadow: '3px 3px 0 #000'
                        }}
                      >
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                          {qIdx + 1}. {q.question}
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                          {q.options.map((opt, optIdx) => {
                            let btnClass = 'quiz-opt-btn';
                            if (answered) {
                              if (optIdx === q.correctIndex) btnClass += ' correct';
                              else if (optIdx === selected) btnClass += ' wrong';
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={answered}
                                onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                                className={btnClass}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {answered && (
                          <div style={{
                            marginTop: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '2px solid #000',
                            background: isCorrect ? '#dcfce7' : '#fee2e2',
                            color: isCorrect ? '#166534' : '#991b1b',
                            fontSize: '0.85rem'
                          }}>
                            <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>
                              {isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect'}
                            </div>
                            <div>{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="reader-modal-footer">
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={handlePrevTopic} className="btn-study-action" style={{ padding: '0.65rem 1.2rem', fontSize: '0.9rem' }}>
                  ← Previous
                </button>
                <button onClick={handleNextTopic} className="btn-study-action" style={{ padding: '0.65rem 1.2rem', fontSize: '0.9rem' }}>
                  Next →
                </button>
              </div>

              <button
                onClick={() => {
                  const topicId = activeModalTopic.id;
                  setActiveModalTopic(null);
                  if (onStartSoloWithTopic) onStartSoloWithTopic(topicId);
                }}
                className="btn-quiz-action"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
              >
                🚀 Practice Quiz in Solo Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}