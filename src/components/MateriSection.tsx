"use client";

import { useState } from 'react';
import { MATERI_KELAS_12, MathTopic } from '../data/mathData';

interface MateriSectionProps {
  onStartSoloWithTopic?: (topicId: string) => void;
  onStartVersus?: () => void;
}

export default function MateriSection({ onStartSoloWithTopic, onStartVersus }: MateriSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<MathTopic>(MATERI_KELAS_12[0]);
  const [activeTab, setActiveTab] = useState<'rumus' | 'contoh'>('rumus');

  return (
    <div className="materi-container">
      <div className="materi-header-box">
        <div className="materi-badge">📚 High School Math Curriculum</div>
        <h1 className="materi-title">Grade 12 Math Materials</h1>
        <p className="materi-subtitle">
          Summary of important materials, key concepts, practical formulas, and practice questions for university entrance / school exams.
        </p>
      </div>

      <div className="materi-layout">
        {/* Sidebar Topics */}
        <div className="materi-sidebar">
          <h3>Select Material Topic:</h3>
          <div className="topic-list">
            {MATERI_KELAS_12.map((topic) => (
              <button
                key={topic.id}
                className={`topic-select-btn ${selectedTopic.id === topic.id ? 'active' : ''}`}
                style={{
                  borderLeftColor: selectedTopic.id === topic.id ? topic.color : '#000',
                  backgroundColor: selectedTopic.id === topic.id ? '#f4f4f5' : '#fff'
                }}
                onClick={() => {
                  setSelectedTopic(topic);
                  setActiveTab('rumus');
                }}
              >
                <span className="topic-select-icon">{topic.icon}</span>
                <div className="topic-select-info">
                  <span className="topic-select-cat">{topic.category}</span>
                  <span className="topic-select-title">{topic.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="materi-cta-box">
            <h4>Ready to test your understanding?</h4>
            <p>Challenge yourself in Solo Mode or compete 1 vs 1 with a friend!</p>
            <div className="materi-cta-actions">
              <button
                className="btn-game-play solo"
                onClick={() => onStartSoloWithTopic && onStartSoloWithTopic(selectedTopic.id)}
              >
                🎯 Quiz This Topic (Solo)
              </button>
              {onStartVersus && (
                <button
                  className="btn-game-play versus"
                  onClick={onStartVersus}
                >
                  ⚔️ Play 1 vs 1 (Duo)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="materi-content-card">
          <div className="content-card-top" style={{ backgroundColor: selectedTopic.color }}>
            <div className="top-title-row">
              <span className="content-icon">{selectedTopic.icon}</span>
              <div>
                <span className="content-badge">{selectedTopic.category} - Grade 12</span>
                <h2>{selectedTopic.title}</h2>
              </div>
            </div>
            <p className="content-summary">{selectedTopic.summary}</p>
          </div>

          <div className="content-tabs">
            <button
              className={`content-tab-btn ${activeTab === 'rumus' ? 'active' : ''}`}
              onClick={() => setActiveTab('rumus')}
            >
              📐 Formulas & Key Concepts
            </button>
            <button
              className={`content-tab-btn ${activeTab === 'contoh' ? 'active' : ''}`}
              onClick={() => setActiveTab('contoh')}
            >
              📝 Practice Questions & Discussion
            </button>
          </div>

          <div className="content-body">
            {activeTab === 'rumus' ? (
              <div className="formulas-grid">
                {selectedTopic.keyFormulas.map((formula, idx) => (
                  <div key={idx} className="formula-card">
                    <div className="formula-name">{formula.name}</div>
                    <div className="formula-code">{formula.formula}</div>
                    <div className="formula-desc">{formula.desc}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="example-box">
                <div className="example-badge">Application Practice Question</div>
                <h4 className="example-question">{selectedTopic.example.question}</h4>
                <div className="example-steps">
                  <div className="steps-title">Solution Steps:</div>
                  <ol>
                    {selectedTopic.example.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="example-answer">
                  Final Answer: <span>{selectedTopic.example.answer}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
