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
        <div className="materi-badge">📚 Kurikulum Matematika SMA</div>
        <h1 className="materi-title">Materi Matematika Kelas 12</h1>
        <p className="materi-subtitle">
          Rangkuman materi penting, konsep kunci, formula praktis, dan contoh soal persiapan UTBK / Ujian Sekolah.
        </p>
      </div>

      <div className="materi-layout">
        {/* Sidebar Topics */}
        <div className="materi-sidebar">
          <h3>Pilih Topik Materi:</h3>
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
            <h4>Siap menguji pemahaman?</h4>
            <p>Tantang dirimu dalam Solo Mode atau tanding 1 vs 1 bersama teman!</p>
            <div className="materi-cta-actions">
              <button
                className="btn-game-play solo"
                onClick={() => onStartSoloWithTopic && onStartSoloWithTopic(selectedTopic.id)}
              >
                🎯 Kuis Topik Ini (Solo)
              </button>
              {onStartVersus && (
                <button
                  className="btn-game-play versus"
                  onClick={onStartVersus}
                >
                  ⚔️ Main 1 vs 1 (Duo)
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
                <span className="content-badge">{selectedTopic.category} - Kelas 12</span>
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
              📐 Rumus & Konsep Kunci
            </button>
            <button
              className={`content-tab-btn ${activeTab === 'contoh' ? 'active' : ''}`}
              onClick={() => setActiveTab('contoh')}
            >
              📝 Contoh Soal & Pembahasan
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
                <div className="example-badge">Contoh Soal Penerapan</div>
                <h4 className="example-question">{selectedTopic.example.question}</h4>
                <div className="example-steps">
                  <div className="steps-title">Langkah Penyelesaian:</div>
                  <ol>
                    {selectedTopic.example.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="example-answer">
                  Jawaban Akhir: <span>{selectedTopic.example.answer}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
