"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { MATH_QUESTIONS, MATERI_KELAS_12, Question } from '../data/mathData';

interface SoloGameProps {
  initialTopicId?: string;
  onBackToMenu: () => void;
  onSwitchToVersus: () => void;
  onAddScore?: (points: number) => void;
}

export default function SoloGame({ initialTopicId, onBackToMenu, onSwitchToVersus, onAddScore }: SoloGameProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopicId || 'all');
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameover'>('lobby');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter and shuffle questions
  const startGame = () => {
    let pool = MATH_QUESTIONS;
    if (selectedTopic !== 'all') {
      pool = MATH_QUESTIONS.filter(q => q.topicId === selectedTopic);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(60);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setStats({ correct: 0, wrong: 0 });
    setGameState('playing');
  };

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setGameState('gameover');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Sync points when gameover
  useEffect(() => {
    if (gameState === 'gameover' && score > 0 && onAddScore) {
      onAddScore(score);
    }
  }, [gameState, score, onAddScore]);

  const handleSelectAnswer = useCallback((index: number) => {
    if (isAnswered || gameState !== 'playing') return;

    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = filteredQuestions[currentIndex];
    if (!currentQ) return;
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      const multiplier = Math.min(3, 1 + streak * 0.5);
      const points = Math.round(100 * multiplier);
      setScore(prev => prev + points);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStreak(0);
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
  }, [isAnswered, gameState, filteredQuestions, currentIndex, streak, maxStreak]);

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);

    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Loop or reshuffle
      const reshuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
      setFilteredQuestions(reshuffled);
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredQuestions]);

  // Keyboard shortcut listener for Solo Game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const key = e.key.toUpperCase();
      const code = e.key;

      if (!isAnswered) {
        // Options A (0), B (1), C (2), D (3)
        // Supported: W / ArrowUp / 1 -> 0
        // A / ArrowLeft / 2 -> 1
        // S / ArrowDown / 3 -> 2
        // D / ArrowRight / 4 -> 3
        if (key === 'W' || code === 'ArrowUp' || key === '1') {
          e.preventDefault();
          handleSelectAnswer(0);
        } else if (key === 'A' || code === 'ArrowLeft' || key === '2') {
          e.preventDefault();
          handleSelectAnswer(1);
        } else if (key === 'S' || code === 'ArrowDown' || key === '3') {
          e.preventDefault();
          handleSelectAnswer(2);
        } else if (key === 'D' || code === 'ArrowRight' || key === '4') {
          e.preventDefault();
          handleSelectAnswer(3);
        }
      } else {
        // When answered, press Enter or Space to go to next question
        if (code === 'Enter' || code === ' ' || key === 'N') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAnswered, handleSelectAnswer, handleNextQuestion]);

  const currentQ = filteredQuestions[currentIndex];

  const getRank = () => {
    if (score >= 800) return { rank: 'S', title: 'Grandmaster Matematika', color: '#ffdc00' };
    if (score >= 500) return { rank: 'A', title: 'Master Kalkulasi', color: '#82fed6' };
    if (score >= 300) return { rank: 'B', title: 'Pejuang Rumus', color: '#00d0ff' };
    return { rank: 'C', title: 'Terus Berlatih!', color: '#ffb17a' };
  };

  return (
    <div className="game-container">
      {gameState === 'lobby' && (
        <div className="game-card game-lobby">
          <div className="game-badge">🕹️ 1 Player Solo Challenge</div>
          <h2 className="game-title">Time Attack: Kuis Matematika Kelas 12</h2>
          <p className="game-desc">
            Jawab soal sebanyak-banyaknya dalam 60 detik! Dapatkan bonus combo streak untuk melipatgandakan poinmu.
          </p>

          <div className="topic-picker">
            <label className="picker-label">Pilih Kategori Materi:</label>
            <div className="picker-grid">
              <button
                className={`picker-btn ${selectedTopic === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedTopic('all')}
              >
                🎯 Semua Topik Campuran
              </button>
              {MATERI_KELAS_12.map(m => (
                <button
                  key={m.id}
                  className={`picker-btn ${selectedTopic === m.id ? 'active' : ''}`}
                  onClick={() => setSelectedTopic(m.id)}
                >
                  {m.icon} {m.title}
                </button>
              ))}
            </div>
          </div>

          <div className="lobby-actions">
            <button className="btn-main-action btn-play" onClick={startGame}>
              🚀 Mulai Permainan (60 Detik)
            </button>
            <div className="lobby-sub-actions">
              <button className="btn-sub-action" onClick={onSwitchToVersus}>
                ⚔️ Coba Mode 1 vs 1 (Duo)
              </button>
              <button className="btn-sub-action" onClick={onBackToMenu}>
                🏠 Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'playing' && currentQ && (
        <div className="game-card game-active">
          {/* Game HUD */}
          <div className="game-hud">
            <div className="hud-box hud-timer">
              <span className="hud-label">Waktu:</span>
              <span className={`hud-val ${timeLeft <= 10 ? 'hud-danger' : ''}`}>{timeLeft}s</span>
            </div>
            <div className="hud-box hud-score">
              <span className="hud-label">Skor:</span>
              <span className="hud-val">{score}</span>
            </div>
            <div className="hud-box hud-streak">
              <span className="hud-label">Combo:</span>
              <span className="hud-val">{streak}x 🔥</span>
            </div>
          </div>

          {/* Question Box */}
          <div className="question-box">
            <div className="q-topic-tag">{currentQ.topicTitle}</div>
            <h3 className="q-text">{currentQ.question}</h3>
          </div>

          {/* Option Buttons */}
          <div className="options-grid">
            {currentQ.options.map((option, idx) => {
              let btnClass = 'option-btn';
              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnClass += ' correct';
                } else if (idx === selectedOption) {
                  btnClass += ' wrong';
                } else {
                  btnClass += ' disabled';
                }
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswered}
                >
                  <span className="opt-letter">{['W', 'A', 'S', 'D'][idx]}</span>
                  <span className="opt-text">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Action after Answer */}
          {isAnswered && (
            <div className="answer-feedback-box">
              <div className="feedback-status">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-correct">🎉 Benar! +{Math.round(100 * Math.min(3, 1 + (streak - 1) * 0.5))} Poin</span>
                ) : (
                  <span className="text-wrong">❌ Kurang Tepat! Jawaban benar: {currentQ.options[currentQ.correctIndex]}</span>
                )}
              </div>

              <div className="feedback-buttons">
                <button
                  className="btn-explain"
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  💡 {showExplanation ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}
                </button>
                <button className="btn-next-q" onClick={handleNextQuestion}>
                  Soal Berikutnya ➡️
                </button>
              </div>

              {showExplanation && (
                <div className="explanation-drawer">
                  <strong>Pembahasan:</strong>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="game-card game-over-card">
          <div className="game-badge">🏁 Waktu Habis!</div>
          <h2 className="gameover-title">Hasil Permainan Solo</h2>

          <div className="rank-badge-box" style={{ backgroundColor: getRank().color }}>
            <div className="rank-letter">{getRank().rank}</div>
            <div className="rank-title">{getRank().title}</div>
          </div>

          <div className="score-summary-grid">
            <div className="summary-stat">
              <span className="stat-label">Total Skor</span>
              <span className="stat-number">{score}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Jawaban Benar</span>
              <span className="stat-number">{stats.correct}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Jawaban Salah</span>
              <span className="stat-number">{stats.wrong}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Max Streak</span>
              <span className="stat-number">{maxStreak}x 🔥</span>
            </div>
          </div>

          <div className="gameover-actions">
            <button className="btn-main-action btn-play" onClick={startGame}>
              🔄 Main Lagi
            </button>
            <button className="btn-sub-action" onClick={() => setGameState('lobby')}>
              ⚙️ Ganti Topik
            </button>
            <button className="btn-sub-action" onClick={onSwitchToVersus}>
              ⚔️ Tantang Teman (1 vs 1)
            </button>
            <button className="btn-sub-action" onClick={onBackToMenu}>
              🏠 Menu Utama
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
