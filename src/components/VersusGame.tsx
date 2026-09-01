"use client";

import { useState, useEffect, useCallback } from 'react';
import { MATH_QUESTIONS, Question } from '../data/mathData';

interface VersusGameProps {
  onBackToMenu: () => void;
  onSwitchToSolo: () => void;
}

const TARGET_SCORE = 500; // First to 500 wins

export default function VersusGame({ onBackToMenu, onSwitchToSolo }: VersusGameProps) {
  const [gameState, setGameState] = useState<'lobby' | 'countdown' | 'playing' | 'round_result' | 'gameover'>('lobby');
  const [countdown, setCountdown] = useState(3);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Player 1 state
  const [p1Name, setP1Name] = useState('Player 1 (Left)');
  const [p1Score, setP1Score] = useState(0);
  const [p1Selected, setP1Selected] = useState<number | null>(null);
  const [p1Locked, setP1Locked] = useState(false);

  // Player 2 state
  const [p2Name, setP2Name] = useState('Player 2 (Right)');
  const [p2Score, setP2Score] = useState(0);
  const [p2Selected, setP2Selected] = useState<number | null>(null);
  const [p2Locked, setP2Locked] = useState(false);

  // Round Winner message
  const [roundWinner, setRoundWinner] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const startVersusGame = () => {
    const shuffled = [...MATH_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setP1Score(0);
    setP2Score(0);
    setP1Selected(null);
    setP2Selected(null);
    setP1Locked(false);
    setP2Locked(false);
    setRoundWinner(null);
    setWinner(null);
    setCountdown(3);
    setGameState('countdown');
  };

  // Countdown timer before battle starts
  useEffect(() => {
    if (gameState === 'countdown') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('playing');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const currentQ = questions[currentIndex];

  // Handle Player 1 Answer
  const handleP1Answer = useCallback((optionIndex: number) => {
    if (gameState !== 'playing' || p1Locked || !currentQ) return;

    setP1Selected(optionIndex);

    if (optionIndex === currentQ.correctIndex) {
      // P1 Got it right!
      const newScore = p1Score + 100;
      setP1Score(newScore);
      setRoundWinner(`${p1Name} Correct! (+100)`);
      setP1Locked(true);
      setP2Locked(true);

      if (newScore >= TARGET_SCORE) {
        setWinner(p1Name);
        setGameState('gameover');
      } else {
        setGameState('round_result');
      }
    } else {
      // P1 Wrong answer penalty
      setP1Score(prev => Math.max(0, prev - 50));
      setP1Locked(true); // Locked out for this round
      if (p2Locked) {
        // Both locked out
        setRoundWinner('Both Wrong! No points.');
        setGameState('round_result');
      }
    }
  }, [gameState, p1Locked, currentQ, p1Score, p1Name, p2Locked]);

  // Handle Player 2 Answer
  const handleP2Answer = useCallback((optionIndex: number) => {
    if (gameState !== 'playing' || p2Locked || !currentQ) return;

    setP2Selected(optionIndex);

    if (optionIndex === currentQ.correctIndex) {
      // P2 Got it right!
      const newScore = p2Score + 100;
      setP2Score(newScore);
      setRoundWinner(`${p2Name} Correct! (+100)`);
      setP1Locked(true);
      setP2Locked(true);

      if (newScore >= TARGET_SCORE) {
        setWinner(p2Name);
        setGameState('gameover');
      } else {
        setGameState('round_result');
      }
    } else {
      // P2 Wrong answer penalty
      setP2Score(prev => Math.max(0, prev - 50));
      setP2Locked(true); // Locked out for this round
      if (p1Locked) {
        // Both locked out
        setRoundWinner('Both Wrong! No points.');
        setGameState('round_result');
      }
    }
  }, [gameState, p2Locked, currentQ, p2Score, p2Name, p1Locked]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const key = e.key.toUpperCase();
      const code = e.key; // For Arrow keys: ArrowUp, ArrowLeft, ArrowDown, ArrowRight

      // Player 1 Keys: W (Option 0), A (Option 1), S (Option 2), D (Option 3)
      if (key === 'W') handleP1Answer(0);
      else if (key === 'A') handleP1Answer(1);
      else if (key === 'S') handleP1Answer(2);
      else if (key === 'D') handleP1Answer(3);

      // Player 2 Keys: ArrowUp (0), ArrowLeft (1), ArrowDown (2), ArrowRight (3)
      if (code === 'ArrowUp') {
        e.preventDefault();
        handleP2Answer(0);
      } else if (code === 'ArrowLeft') {
        e.preventDefault();
        handleP2Answer(1);
      } else if (code === 'ArrowDown') {
        e.preventDefault();
        handleP2Answer(2);
      } else if (code === 'ArrowRight') {
        e.preventDefault();
        handleP2Answer(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleP1Answer, handleP2Answer]);

  // Auto transition to next round after round_result
  useEffect(() => {
    if (gameState === 'round_result') {
      const timer = setTimeout(() => {
        setP1Selected(null);
        setP2Selected(null);
        setP1Locked(false);
        setP2Locked(false);
        setRoundWinner(null);

        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(prev => prev + 1);
          setGameState('playing');
        } else {
          // Shuffle loop
          setQuestions([...MATH_QUESTIONS].sort(() => Math.random() - 0.5));
          setCurrentIndex(0);
          setGameState('playing');
        }
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [gameState, currentIndex, questions.length]);

  return (
    <div className="versus-container">
      {gameState === 'lobby' && (
        <div className="versus-card versus-lobby">
          <div className="game-badge">⚔️ 1 vs 1 Split Screen Battle</div>
          <h2 className="game-title">Grade 12 Math Battle</h2>
          <p className="game-desc">
            Compete for speed and accuracy in answering questions with a friend on 1 screen! The first player to reach <strong>{TARGET_SCORE} Points</strong> wins.
          </p>

          <div className="versus-player-setup">
            <div className="player-setup-box p1-box">
              <div className="p-header">🎮 Player 1 (Left Side)</div>
              <input
                type="text"
                value={p1Name}
                onChange={e => setP1Name(e.target.value)}
                className="p-name-input"
                placeholder="P1 Name"
              />
              <div className="key-guide">
                <span>Keyboard Keys:</span>
                <div className="keys-row">
                  <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>
                </div>
                <small>(W=Option 1, A=Option 2, S=Option 3, D=Option 4)</small>
              </div>
            </div>

            <div className="versus-vs-badge">VS</div>

            <div className="player-setup-box p2-box">
              <div className="p-header">🕹️ Player 2 (Right Side)</div>
              <input
                type="text"
                value={p2Name}
                onChange={e => setP2Name(e.target.value)}
                className="p-name-input"
                placeholder="P2 Name"
              />
              <div className="key-guide">
                <span>Keyboard Keys:</span>
                <div className="keys-row">
                  <kbd>↑</kbd> <kbd>←</kbd> <kbd>↓</kbd> <kbd>→</kbd>
                </div>
                <small>(↑=Option 1, ←=Option 2, ↓=Option 3, →=Option 4)</small>
              </div>
            </div>
          </div>

          <div className="rules-ribbon">
            💡 <strong>Battle Rules:</strong> Correct = <strong>+100 Points</strong> | Wrong = <strong>-50 Points & Locked This Round</strong>.
          </div>

          <div className="lobby-actions">
            <button className="btn-main-action btn-versus-play" onClick={startVersusGame}>
              🔥 Start 1 vs 1 Battle!
            </button>
            <div className="lobby-sub-actions">
              <button className="btn-sub-action" onClick={onSwitchToSolo}>
                🎯 Solo Mode (1 Player)
              </button>
              <button className="btn-sub-action" onClick={onBackToMenu}>
                🏠 Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'countdown' && (
        <div className="versus-countdown-box">
          <div className="countdown-text">Battle Starts In:</div>
          <div className="countdown-number">{countdown}</div>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round_result') && currentQ && (
        <div className="versus-arena">
          {/* Top Battle Bar */}
          <div className="versus-top-bar">
            <div className="p1-score-tag">
              <span className="p-tag-name">{p1Name}</span>
              <span className="p-tag-score">{p1Score} Points</span>
            </div>

            <div className="battle-target-info">
              <span>Target: {TARGET_SCORE} Points</span>
              <div className="score-progress-bar">
                <div className="bar-p1" style={{ width: `${Math.min(50, (p1Score / TARGET_SCORE) * 50)}%` }}></div>
                <div className="bar-p2" style={{ width: `${Math.min(50, (p2Score / TARGET_SCORE) * 50)}%` }}></div>
              </div>
            </div>

            <div className="p2-score-tag">
              <span className="p-tag-score">{p2Score} Points</span>
              <span className="p-tag-name">{p2Name}</span>
            </div>
          </div>

          {/* Central Question Display */}
          <div className="versus-question-hub">
            <div className="q-topic-tag">{currentQ.topicTitle}</div>
            <h3 className="versus-q-text">{currentQ.question}</h3>
            {roundWinner && (
              <div className="round-winner-banner">
                {roundWinner}
              </div>
            )}
          </div>

          {/* Dual Split Screen Controls */}
          <div className="split-screen-grid">
            {/* Player 1 Side */}
            <div className={`p-arena-panel p1-panel ${p1Locked ? 'locked' : ''}`}>
              <div className="panel-header">
                <h4>{p1Name}</h4>
                <span className="key-hint">Keys [W, A, S, D]</span>
              </div>

              <div className="panel-options">
                {currentQ.options.map((opt, idx) => {
                  const keyLetters = ['W', 'A', 'S', 'D'];
                  let optClass = 'p-opt-btn p1-opt';
                  if (p1Selected === idx) {
                    optClass += idx === currentQ.correctIndex ? ' correct' : ' wrong';
                  }

                  return (
                    <button
                      key={idx}
                      className={optClass}
                      onClick={() => handleP1Answer(idx)}
                      disabled={p1Locked || gameState === 'round_result'}
                    >
                      <span className="key-bubble">{keyLetters[idx]}</span>
                      <span className="p-opt-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Player 2 Side */}
            <div className={`p-arena-panel p2-panel ${p2Locked ? 'locked' : ''}`}>
              <div className="panel-header">
                <h4>{p2Name}</h4>
                <span className="key-hint">Keys [↑, ←, ↓, →]</span>
              </div>

              <div className="panel-options">
                {currentQ.options.map((opt, idx) => {
                  const arrowSymbols = ['↑', '←', '↓', '→'];
                  let optClass = 'p-opt-btn p2-opt';
                  if (p2Selected === idx) {
                    optClass += idx === currentQ.correctIndex ? ' correct' : ' wrong';
                  }

                  return (
                    <button
                      key={idx}
                      className={optClass}
                      onClick={() => handleP2Answer(idx)}
                      disabled={p2Locked || gameState === 'round_result'}
                    >
                      <span className="key-bubble">{arrowSymbols[idx]}</span>
                      <span className="p-opt-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="versus-card versus-winner-card">
          <div className="winner-crown">👑</div>
          <h2 className="winner-title">{winner} WINS!</h2>
          <p className="winner-desc">Successfully reached {TARGET_SCORE} points faster in the math duel!</p>

          <div className="final-battle-score">
            <div className={`final-box ${winner === p1Name ? 'champion' : ''}`}>
              <div className="final-name">{p1Name}</div>
              <div className="final-score">{p1Score} Points</div>
            </div>
            <div className="final-vs">VS</div>
            <div className={`final-box ${winner === p2Name ? 'champion' : ''}`}>
              <div className="final-name">{p2Name}</div>
              <div className="final-score">{p2Score} Points</div>
            </div>
          </div>

          <div className="gameover-actions">
            <button className="btn-main-action btn-versus-play" onClick={startVersusGame}>
              🔥 Rematch
            </button>
            <button className="btn-sub-action" onClick={() => setGameState('lobby')}>
              ⚙️ Player Settings
            </button>
            <button className="btn-sub-action" onClick={onSwitchToSolo}>
              🎯 Solo Mode
            </button>
            <button className="btn-sub-action" onClick={onBackToMenu}>
              🏠 Main Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
