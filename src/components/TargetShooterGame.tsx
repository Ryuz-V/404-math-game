"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface TargetShooterGameProps {
  onBackToMenu: () => void;
  onAddScore?: (pts: number) => void;
}

type MathOp = 'all' | 'add' | 'sub' | 'mul' | 'div';
type GameMode = 'pvp' | 'vs_ai';
type AiDifficulty = 'easy' | 'medium' | 'hard';

// ============================================================================
// SOUND SYNTHESIZER (WEB AUDIO API)
// ============================================================================
class ShooterSoundSynth {
  private ctx: AudioContext | null = null;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playShoot(player: 1 | 2) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = player === 1 ? 'sawtooth' : 'square';
    const startFreq = player === 1 ? 880 : 720;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playHitCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    });
  }

  playHitWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.2);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playReload() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playReloadFinish() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.setValueAtTime(880, now + 0.06);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chord.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    });
  }
}

const sounds = new ShooterSoundSynth();

// ============================================================================
// QUESTION GENERATOR (+, -, ×, :)
// ============================================================================
interface ShooterQuestion {
  prompt: string;
  correctAnswer: number;
  options: number[]; // 5 distinct options
  correctIndex: number; // 0 to 4
}

function generateShooterQuestion(operator: MathOp = 'all'): ShooterQuestion {
  let activeOp = operator;
  if (activeOp === 'all') {
    const ops: MathOp[] = ['add', 'sub', 'mul', 'div'];
    activeOp = ops[Math.floor(Math.random() * ops.length)];
  }

  let prompt = '';
  let correct = 0;

  if (activeOp === 'add') {
    const a = Math.floor(Math.random() * 48) + 7;
    const b = Math.floor(Math.random() * 48) + 7;
    correct = a + b;
    prompt = `${a} + ${b} = ?`;
  } else if (activeOp === 'sub') {
    const a = Math.floor(Math.random() * 60) + 25;
    const b = Math.floor(Math.random() * (a - 10)) + 6;
    correct = a - b;
    prompt = `${a} - ${b} = ?`;
  } else if (activeOp === 'mul') {
    const a = Math.floor(Math.random() * 12) + 2;
    const b = Math.floor(Math.random() * 12) + 2;
    correct = a * b;
    prompt = `${a} × ${b} = ?`;
  } else {
    // Division with colon ":"
    const b = Math.floor(Math.random() * 10) + 2;
    const res = Math.floor(Math.random() * 12) + 2;
    const a = b * res;
    correct = res;
    prompt = `${a} : ${b} = ?`;
  }

  // Generate 5 distinct target answers (1 correct + 4 realistic distractors)
  const set = new Set<number>([correct]);
  while (set.size < 5) {
    const delta = (Math.floor(Math.random() * 8) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = correct + delta;
    if (fake >= 0) set.add(fake);
  }

  const options = Array.from(set).sort(() => Math.random() - 0.5);
  const correctIndex = options.indexOf(correct);

  return {
    prompt,
    correctAnswer: correct,
    options,
    correctIndex
  };
}

// ============================================================================
// TARGET BOARD DATA & GEOMETRY (5 FIXED/FLOATING LOCATIONS)
// ============================================================================
interface TargetBoard {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  value: number;
  isCorrect: boolean;
  isHit: boolean;
  hitBy: 1 | 2 | null;
  shakeTime: number;
  swingAngle: number;
  swingSpeed: number;
  color: string;
}

// 5 Board Anchor Positions (Canvas 1000 x 600)
const BOARD_ANCHORS = [
  { x: 180, y: 150, color: '#ec4899' }, // Top-Left
  { x: 820, y: 150, color: '#3b82f6' }, // Top-Right
  { x: 500, y: 110, color: '#8b5cf6' }, // Center-Top
  { x: 240, y: 440, color: '#10b981' }, // Bottom-Left
  { x: 760, y: 440, color: '#f59e0b' }  // Bottom-Right
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface BulletLaser {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  color: string;
  player: 1 | 2;
}

const RELOAD_TIME_SECONDS = 4.0; // 4 seconds reload time

export default function TargetShooterGame({ onBackToMenu, onAddScore }: TargetShooterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game Configuration & Settings
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'round_over' | 'game_over'>('lobby');
  const [gameMode, setGameMode] = useState<GameMode>('vs_ai');
  const [aiDifficulty, setAiDifficulty] = useState<AiDifficulty>('medium');
  const [totalQuestions, setTotalQuestions] = useState<number>(20); // Selectable: 10, 15, 20, 25
  const [selectedOp, setSelectedOp] = useState<MathOp>('all');

  // Match State & Scores
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [p1CorrectCount, setP1CorrectCount] = useState(0);
  const [p2CorrectCount, setP2CorrectCount] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [winner, setWinner] = useState<1 | 2 | 'draw' | null>(null);

  // Ammo & 4-Second Reload States
  const [p1Ammo, setP1Ammo] = useState(3);
  const [p2Ammo, setP2Ammo] = useState(3);
  const [p1ReloadTime, setP1ReloadTime] = useState<number>(0);
  const [p2ReloadTime, setP2ReloadTime] = useState<number>(0);

  // Refs for animation loop reload tracking
  const p1ReloadTimerRef = useRef<number>(0);
  const p2ReloadTimerRef = useRef<number>(0);

  // Current Question & Countdown Timer
  const [currentQuestion, setCurrentQuestion] = useState<ShooterQuestion | null>(null);
  const [roundTimeLeft, setRoundTimeLeft] = useState(15.0);
  const roundTimeRef = useRef<number>(15.0);
  const isQuestionTransitioning = useRef<boolean>(false);

  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('math_target_shooter_highscore');
      return s ? parseInt(s, 10) : 0;
    }
    return 0;
  });

  // Crosshair Positions (Player 1 = Blue WASD, Player 2 = Red Arrows)
  const p1Crosshair = useRef<{ x: number; y: number; vx: number; vy: number }>({ x: 300, y: 300, vx: 0, vy: 0 });
  const p2Crosshair = useRef<{ x: number; y: number; vx: number; vy: number }>({ x: 700, y: 300, vx: 0, vy: 0 });

  // Key tracking
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Boards and FX Refs
  const boardsRef = useRef<TargetBoard[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lasersRef = useRef<BulletLaser[]>([]);
  const screenShakeRef = useRef(0);
  const floatTextRef = useRef<{ text: string; x: number; y: number; color: string; alpha: number }[]>([]);

  // AI Aiming Behavior
  const aiAimTimer = useRef<number>(0);
  const aiShootDelay = useRef<number>(0);

  // --------------------------------------------------------------------------
  // SPAWN QUESTION & REBUILD TARGET BOARDS
  // --------------------------------------------------------------------------
  const spawnNewQuestion = useCallback(() => {
    isQuestionTransitioning.current = false;
    const q = generateShooterQuestion(selectedOp);
    setCurrentQuestion(q);
    roundTimeRef.current = 15.0;
    setRoundTimeLeft(15.0);

    // If player is not currently in a reload, refill bullets
    if (p1ReloadTimerRef.current <= 0) {
      setP1Ammo(3);
    }
    if (p2ReloadTimerRef.current <= 0) {
      setP2Ammo(3);
    }

    // Build 5 target boards
    const newBoards: TargetBoard[] = BOARD_ANCHORS.map((anchor, idx) => ({
      id: idx,
      x: anchor.x,
      y: anchor.y,
      baseX: anchor.x,
      baseY: anchor.y,
      width: 140,
      height: 90,
      value: q.options[idx],
      isCorrect: idx === q.correctIndex,
      isHit: false,
      hitBy: null,
      shakeTime: 0,
      swingAngle: Math.random() * 0.1 - 0.05,
      swingSpeed: 0.02 + Math.random() * 0.02,
      color: anchor.color
    }));

    boardsRef.current = newBoards;
    sounds.playReload();

    // Reset AI shooting target
    aiShootDelay.current = aiDifficulty === 'easy' ? 4200 + Math.random() * 1800 : aiDifficulty === 'medium' ? 2400 + Math.random() * 1200 : 1400 + Math.random() * 800;
    aiAimTimer.current = 0;
  }, [selectedOp, aiDifficulty]);

  // --------------------------------------------------------------------------
  // RELOAD FUNCTION WITH 4 SECONDS TIMER
  // --------------------------------------------------------------------------
  const startReload = useCallback((player: 1 | 2) => {
    if (player === 1) {
      if (p1ReloadTimerRef.current > 0 || p1Ammo === 3) return;
      p1ReloadTimerRef.current = RELOAD_TIME_SECONDS;
      setP1ReloadTime(RELOAD_TIME_SECONDS);
      sounds.playReload();
      floatTextRef.current.push({
        text: `🔄 P1 RELOAD (4s)...`,
        x: p1Crosshair.current.x,
        y: p1Crosshair.current.y - 30,
        color: '#38bdf8',
        alpha: 1
      });
    } else {
      if (p2ReloadTimerRef.current > 0 || p2Ammo === 3) return;
      p2ReloadTimerRef.current = RELOAD_TIME_SECONDS;
      setP2ReloadTime(RELOAD_TIME_SECONDS);
      sounds.playReload();
      floatTextRef.current.push({
        text: `🔄 P2 RELOAD (4s)...`,
        x: p2Crosshair.current.x,
        y: p2Crosshair.current.y - 30,
        color: '#f87171',
        alpha: 1
      });
    }
  }, [p1Ammo, p2Ammo]);

  // --------------------------------------------------------------------------
  // FINISH MATCH
  // --------------------------------------------------------------------------
  const finishMatch = useCallback((finalP1: number, finalP2: number) => {
    setGameState('game_over');
    sounds.playVictory();

    let matchWinner: 1 | 2 | 'draw' = 'draw';
    if (finalP1 > finalP2) matchWinner = 1;
    else if (finalP2 > finalP1) matchWinner = 2;
    setWinner(matchWinner);

    const highest = Math.max(finalP1, finalP2);
    if (onAddScore) onAddScore(highest);

    setHighScore(prev => {
      const nextH = Math.max(prev, finalP1);
      if (typeof window !== 'undefined') {
        localStorage.setItem('math_target_shooter_highscore', nextH.toString());
      }
      return nextH;
    });
  }, [onAddScore]);

  // --------------------------------------------------------------------------
  // START / RESTART GAME
  // --------------------------------------------------------------------------
  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setP1Score(0);
    setP2Score(0);
    setP1CorrectCount(0);
    setP2CorrectCount(0);
    setRoundNumber(1);
    setWinner(null);
    setP1Ammo(3);
    setP2Ammo(3);
    p1ReloadTimerRef.current = 0;
    p2ReloadTimerRef.current = 0;
    setP1ReloadTime(0);
    setP2ReloadTime(0);
    p1Crosshair.current = { x: 300, y: 300, vx: 0, vy: 0 };
    p2Crosshair.current = { x: 700, y: 300, vx: 0, vy: 0 };
    particlesRef.current = [];
    lasersRef.current = [];
    floatTextRef.current = [];
    isQuestionTransitioning.current = false;
    setGameState('playing');
    spawnNewQuestion();
  };

  // --------------------------------------------------------------------------
  // ADVANCE OR END MATCH
  // --------------------------------------------------------------------------
  const handleNextRound = useCallback(() => {
    if (roundNumber >= totalQuestions) {
      finishMatch(p1Score, p2Score);
    } else {
      setRoundNumber(r => r + 1);
      spawnNewQuestion();
    }
  }, [roundNumber, totalQuestions, p1Score, p2Score, finishMatch, spawnNewQuestion]);

  // --------------------------------------------------------------------------
  // SPAWN EXPLOSION PARTICLES
  // --------------------------------------------------------------------------
  const spawnExplosion = (x: number, y: number, color: string, isCorrect: boolean) => {
    const count = isCorrect ? 35 : 15;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: isCorrect ? ['#facc15', '#38bdf8', '#4ade80', '#ffffff', color][Math.floor(Math.random() * 5)] : '#ef4444',
        size: Math.random() * 6 + 3,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 25 + 20
      });
    }
  };

  // --------------------------------------------------------------------------
  // SHOOTING LOGIC (PLAYER 1 / PLAYER 2 / AI)
  // --------------------------------------------------------------------------
  const handleShoot = useCallback((player: 1 | 2) => {
    if (gameState !== 'playing' || !currentQuestion || isQuestionTransitioning.current) return;

    // Check if reloading or out of ammo
    if (player === 1) {
      if (p1ReloadTimerRef.current > 0) {
        sounds.playHitWrong();
        floatTextRef.current.push({
          text: `⏳ Sedang Reload... (${p1ReloadTimerRef.current.toFixed(1)}s)`,
          x: p1Crosshair.current.x,
          y: p1Crosshair.current.y - 25,
          color: '#38bdf8',
          alpha: 1
        });
        return;
      }
      if (p1Ammo <= 0) {
        startReload(1);
        return;
      }
    } else {
      if (p2ReloadTimerRef.current > 0) {
        sounds.playHitWrong();
        floatTextRef.current.push({
          text: `⏳ Sedang Reload... (${p2ReloadTimerRef.current.toFixed(1)}s)`,
          x: p2Crosshair.current.x,
          y: p2Crosshair.current.y - 25,
          color: '#f87171',
          alpha: 1
        });
        return;
      }
      if (p2Ammo <= 0) {
        startReload(2);
        return;
      }
    }

    // Deduct 1 ammo and check if 0 -> triggers 4-second reload
    if (player === 1) {
      const nextAmmo = p1Ammo - 1;
      setP1Ammo(nextAmmo);
      if (nextAmmo <= 0) {
        startReload(1);
      }
    } else {
      const nextAmmo = p2Ammo - 1;
      setP2Ammo(nextAmmo);
      if (nextAmmo <= 0) {
        startReload(2);
      }
    }

    const crosshair = player === 1 ? p1Crosshair.current : p2Crosshair.current;
    const startX = player === 1 ? 250 : 750;
    const startY = 580;

    // Add laser beam tracer
    lasersRef.current.push({
      startX,
      startY,
      targetX: crosshair.x,
      targetY: crosshair.y,
      progress: 0,
      color: player === 1 ? '#38bdf8' : '#f87171',
      player
    });

    sounds.playShoot(player);

    // Check hit collision with 5 boards
    let hitBoard: TargetBoard | null = null;
    for (const b of boardsRef.current) {
      const halfW = b.width / 2;
      const halfH = b.height / 2;
      if (
        crosshair.x >= b.x - halfW &&
        crosshair.x <= b.x + halfW &&
        crosshair.y >= b.y - halfH &&
        crosshair.y <= b.y + halfH
      ) {
        hitBoard = b;
        break;
      }
    }

    if (hitBoard) {
      screenShakeRef.current = 8;
      hitBoard.shakeTime = 12;

      if (hitBoard.isCorrect && !hitBoard.isHit) {
        // CORRECT HIT! +3 POINTS
        hitBoard.isHit = true;
        hitBoard.hitBy = player;
        sounds.playHitCorrect();
        spawnExplosion(hitBoard.x, hitBoard.y, hitBoard.color, true);

        const earned = 3;
        floatTextRef.current.push({
          text: `🎉 BENAR! +${earned} POIN!`,
          x: hitBoard.x,
          y: hitBoard.y - 20,
          color: player === 1 ? '#38bdf8' : '#f87171',
          alpha: 1
        });

        let updatedP1 = p1Score;
        let updatedP2 = p2Score;

        if (player === 1) {
          updatedP1 += earned;
          setP1Score(updatedP1);
          setP1CorrectCount(c => c + 1);
        } else {
          updatedP2 += earned;
          setP2Score(updatedP2);
          setP2CorrectCount(c => c + 1);
        }

        // Advance question after short pause or finish match if round limit reached
        isQuestionTransitioning.current = true;
        setTimeout(() => {
          if (roundNumber >= totalQuestions) {
            finishMatch(updatedP1, updatedP2);
          } else {
            setRoundNumber(r => r + 1);
            spawnNewQuestion();
          }
        }, 900);
      } else {
        // WRONG HIT! 0 POINTS
        sounds.playHitWrong();
        spawnExplosion(hitBoard.x, hitBoard.y, '#ef4444', false);
        floatTextRef.current.push({
          text: `❌ SALAH! (0)`,
          x: hitBoard.x,
          y: hitBoard.y - 20,
          color: '#ef4444',
          alpha: 1
        });
      }
    } else {
      // MISSED BOARD COMPLETELY
      spawnExplosion(crosshair.x, crosshair.y, '#94a3b8', false);
    }
  }, [gameState, currentQuestion, p1Ammo, p2Ammo, p1Score, p2Score, roundNumber, totalQuestions, startReload, finishMatch, spawnNewQuestion]);

  // --------------------------------------------------------------------------
  // KEYBOARD EVENT LISTENERS (WASD + ARROWS + SPACE / ENTER + R KEY)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      keysPressed.current[e.code] = true;

      // P1 Shoot (Space or F)
      if (e.code === 'Space' || e.code === 'KeyF') {
        handleShoot(1);
      }

      // P1 Manual Reload (R)
      if (e.code === 'KeyR') {
        startReload(1);
      }

      // P2 Shoot (Enter)
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        if (gameMode === 'pvp') {
          handleShoot(2);
        }
      }

      // P2 Manual Reload (ShiftRight or Slash)
      if (e.code === 'ShiftRight' || e.code === 'Slash') {
        if (gameMode === 'pvp') {
          startReload(2);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleShoot, startReload, gameMode]);

  // --------------------------------------------------------------------------
  // MAIN GAME TICK & CANVAS RENDER LOOP (60 FPS)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // 1. UPDATE QUESTION TIMER (15s Countdown)
      if (gameState === 'playing' && !isQuestionTransitioning.current) {
        roundTimeRef.current -= dt;
        const curTime = Math.max(0, roundTimeRef.current);
        setRoundTimeLeft(curTime);

        // Warning tick on low time
        if (curTime <= 4.0 && curTime > 0 && Math.floor(curTime * 2) !== Math.floor((curTime + dt) * 2)) {
          sounds.playTick();
        }

        // Question expired at 0s
        if (roundTimeRef.current <= 0) {
          isQuestionTransitioning.current = true;
          sounds.playHitWrong();
          floatTextRef.current.push({
            text: `⏱️ WAKTU HABIS!`,
            x: 500,
            y: 275,
            color: '#f59e0b',
            alpha: 1
          });

          setTimeout(() => {
            handleNextRound();
          }, 1100);
        }
      }

      // 2. UPDATE 4-SECOND RELOAD TIMERS
      if (p1ReloadTimerRef.current > 0) {
        p1ReloadTimerRef.current = Math.max(0, p1ReloadTimerRef.current - dt);
        setP1ReloadTime(p1ReloadTimerRef.current);

        if (p1ReloadTimerRef.current <= 0) {
          setP1Ammo(3);
          sounds.playReloadFinish();
          floatTextRef.current.push({
            text: `✅ P1 PELURU SIAP (3/3)!`,
            x: p1Crosshair.current.x,
            y: p1Crosshair.current.y - 30,
            color: '#38bdf8',
            alpha: 1
          });
        }
      }

      if (p2ReloadTimerRef.current > 0) {
        p2ReloadTimerRef.current = Math.max(0, p2ReloadTimerRef.current - dt);
        setP2ReloadTime(p2ReloadTimerRef.current);

        if (p2ReloadTimerRef.current <= 0) {
          setP2Ammo(3);
          sounds.playReloadFinish();
          floatTextRef.current.push({
            text: `✅ P2 PELURU SIAP (3/3)!`,
            x: p2Crosshair.current.x,
            y: p2Crosshair.current.y - 30,
            color: '#f87171',
            alpha: 1
          });
        }
      }

      // 3. UPDATE CROSSHAIR POSITIONS
      const moveSpeed = 480; // px/sec

      // Player 1 (WASD)
      let p1dx = 0;
      let p1dy = 0;
      if (keysPressed.current['KeyW']) p1dy -= 1;
      if (keysPressed.current['KeyS']) p1dy += 1;
      if (keysPressed.current['KeyA']) p1dx -= 1;
      if (keysPressed.current['KeyD']) p1dx += 1;

      if (p1dx !== 0 && p1dy !== 0) {
        p1dx *= 0.7071;
        p1dy *= 0.7071;
      }
      p1Crosshair.current.x = Math.max(40, Math.min(960, p1Crosshair.current.x + p1dx * moveSpeed * dt));
      p1Crosshair.current.y = Math.max(40, Math.min(560, p1Crosshair.current.y + p1dy * moveSpeed * dt));

      // Player 2 / AI (Arrow Keys or AI Tracking)
      if (gameMode === 'pvp') {
        let p2dx = 0;
        let p2dy = 0;
        if (keysPressed.current['ArrowUp']) p2dy -= 1;
        if (keysPressed.current['ArrowDown']) p2dy += 1;
        if (keysPressed.current['ArrowLeft']) p2dx -= 1;
        if (keysPressed.current['ArrowRight']) p2dx += 1;

        if (p2dx !== 0 && p2dy !== 0) {
          p2dx *= 0.7071;
          p2dy *= 0.7071;
        }
        p2Crosshair.current.x = Math.max(40, Math.min(960, p2Crosshair.current.x + p2dx * moveSpeed * dt));
        p2Crosshair.current.y = Math.max(40, Math.min(560, p2Crosshair.current.y + p2dy * moveSpeed * dt));
      } else if (gameState === 'playing' && currentQuestion && !isQuestionTransitioning.current) {
        // AI BOT SIMULATION & RELOAD
        if (p2Ammo <= 0 && p2ReloadTimerRef.current <= 0) {
          startReload(2);
        }

        aiAimTimer.current += dt * 1000;
        const correctBoard = boardsRef.current.find(b => b.isCorrect);

        if (correctBoard) {
          const targetX = correctBoard.x;
          const targetY = correctBoard.y;
          const diffX = targetX - p2Crosshair.current.x;
          const diffY = targetY - p2Crosshair.current.y;
          const aiSpeed = aiDifficulty === 'easy' ? 220 : aiDifficulty === 'medium' ? 380 : 540;

          p2Crosshair.current.x += Math.sign(diffX) * Math.min(Math.abs(diffX), aiSpeed * dt);
          p2Crosshair.current.y += Math.sign(diffY) * Math.min(Math.abs(diffY), aiSpeed * dt);

          // AI Shoot when on target and delay is reached
          if (aiAimTimer.current >= aiShootDelay.current && Math.hypot(diffX, diffY) < 35 && p2Ammo > 0 && p2ReloadTimerRef.current <= 0) {
            aiAimTimer.current = 0;
            aiShootDelay.current = 2000 + Math.random() * 1500;
            handleShoot(2);
          }
        }
      }

      // 4. UPDATE BOARDS (BOBBING & SWING)
      boardsRef.current.forEach((b) => {
        b.swingAngle += b.swingSpeed;
        b.x = b.baseX + Math.sin(b.swingAngle) * 8;
        b.y = b.baseY + Math.cos(b.swingAngle * 1.5) * 4;

        if (b.shakeTime > 0) {
          b.shakeTime -= 1;
          b.x += (Math.random() - 0.5) * 6;
          b.y += (Math.random() - 0.5) * 6;
        }
      });

      // 5. UPDATE LASERS
      for (let i = lasersRef.current.length - 1; i >= 0; i--) {
        const l = lasersRef.current[i];
        l.progress += dt * 5;
        if (l.progress >= 1) {
          lasersRef.current.splice(i, 1);
        }
      }

      // 6. UPDATE PARTICLES
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.life += 1;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);
        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 7. UPDATE FLOAT TEXT
      for (let i = floatTextRef.current.length - 1; i >= 0; i--) {
        const ft = floatTextRef.current[i];
        ft.y -= dt * 40;
        ft.alpha -= dt * 0.9;
        if (ft.alpha <= 0) {
          floatTextRef.current.splice(i, 1);
        }
      }

      // ----------------------------------------------------------------------
      // DRAW CANVAS SCENE
      // ----------------------------------------------------------------------
      ctx.save();

      // Screen Shake
      if (screenShakeRef.current > 0) {
        screenShakeRef.current -= 0.5;
        ctx.translate((Math.random() - 0.5) * screenShakeRef.current * 4, (Math.random() - 0.5) * screenShakeRef.current * 4);
      }

      // Background - High-Tech Neon Arcade Shooting Gallery
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 600);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.5, '#1e1b4b');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1000, 600);

      // Grid Floor Perspective Lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= 1000; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 600);
        ctx.stroke();
      }
      for (let y = 0; y <= 600; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1000, y);
        ctx.stroke();
      }

      // Hanging Chains from ceiling to Boards
      boardsRef.current.forEach((b) => {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(b.baseX - 35, 0);
        ctx.lineTo(b.x - 35, b.y - b.height / 2);
        ctx.moveTo(b.baseX + 35, 0);
        ctx.lineTo(b.x + 35, b.y - b.height / 2);
        ctx.stroke();
      });

      // DRAW 5 TARGET BOARDS
      boardsRef.current.forEach((b, idx) => {
        ctx.save();
        ctx.translate(b.x, b.y);

        const halfW = b.width / 2;
        const halfH = b.height / 2;

        // Board Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.roundRect(-halfW + 6, -halfH + 6, b.width, b.height, 12);
        ctx.fill();

        // Outer Board Body
        ctx.fillStyle = b.isHit && b.isCorrect ? '#22c55e' : '#1e293b';
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, b.width, b.height, 12);
        ctx.fill();
        ctx.stroke();

        // Inner Bullseye Target Rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Target Tag Letter [A, B, C, D, E]
        const tagLetters = ['A', 'B', 'C', 'D', 'E'];
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(-halfW + 16, -halfH + 16, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tagLetters[idx], -halfW + 16, -halfH + 16);

        // Value / Answer Text (Bold, High Contrast)
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 28px "Outfit", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${b.value}`, 0, 2);

        // Hit Badge
        if (b.isHit) {
          ctx.fillStyle = b.hitBy === 1 ? '#38bdf8' : '#f87171';
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(`HIT P${b.hitBy}!`, 0, halfH - 12);
        }

        ctx.restore();
      });

      // DRAW CENTER MATH QUESTION BILLBOARD
      if (currentQuestion) {
        ctx.save();
        ctx.translate(500, 275);

        // Holographic Glowing Frame
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.roundRect(-165, -58, 330, 116, 16);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Header Pill
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.roundRect(-85, -58, 170, 22, 6);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = '800 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`🎯 SOAL ${roundNumber} / ${totalQuestions}`, 0, -43);

        // Math Equation Text (Large & Center)
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 36px "Outfit", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentQuestion.prompt, 0, 6);

        // Dynamic 15s Timer Bar in Center Billboard
        const timerFraction = Math.max(0, Math.min(1, roundTimeRef.current / 15.0));
        const timerBarW = 290 * timerFraction;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(-145, 38, 290, 8);
        ctx.fillStyle = roundTimeRef.current > 5 ? '#4ade80' : roundTimeRef.current > 2.5 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(-145, 38, timerBarW, 8);

        // Numeric Timer Label
        ctx.fillStyle = roundTimeRef.current > 5 ? '#94a3b8' : '#ef4444';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText(`⏱️ Sisa Waktu: ${Math.ceil(roundTimeRef.current)}s`, 0, 52);

        ctx.restore();
      }

      // DRAW LASER BEAM TRACERS
      lasersRef.current.forEach((l) => {
        ctx.save();
        ctx.strokeStyle = l.color;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(l.startX, l.startY);
        ctx.lineTo(l.targetX, l.targetY);
        ctx.stroke();

        // Muzzle Flash Spark
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(l.targetX, l.targetY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // DRAW PARTICLES
      particlesRef.current.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // DRAW FLOATING TEXT NOTIFICATIONS
      floatTextRef.current.forEach((ft) => {
        ctx.save();
        ctx.globalAlpha = ft.alpha;
        ctx.fillStyle = ft.color;
        ctx.font = '900 20px "Outfit", system-ui, sans-serif';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3.5;
        ctx.textAlign = 'center';
        ctx.strokeText(ft.text, ft.x, ft.y);
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });

      // DRAW CROSSHAIRS & RELOAD PROGRESS RINGS
      const drawCrosshair = (
        x: number,
        y: number,
        color: string,
        label: string,
        ammoCount: number,
        reloadTime: number
      ) => {
        ctx.save();
        ctx.translate(x, y);

        // Reload Circular Progress Ring
        if (reloadTime > 0) {
          const progress = 1 - (reloadTime / RELOAD_TIME_SECONDS);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 32, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = color;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 32, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
          ctx.stroke();

          // Reload text over crosshair
          ctx.fillStyle = color;
          ctx.font = 'bold 11px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(`🔄 ${reloadTime.toFixed(1)}s`, 0, -38);
        }

        // Outer Rotating Glow Ring
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Reticle Ticks
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(0, -12);
        ctx.moveTo(0, 28);
        ctx.lineTo(0, 12);
        ctx.moveTo(-28, 0);
        ctx.lineTo(-12, 0);
        ctx.moveTo(28, 0);
        ctx.lineTo(12, 0);
        ctx.stroke();

        // Center Point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Player Tag & Ammo Indicator
        ctx.fillStyle = color;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 0;
        ctx.fillText(`${label} [${ammoCount}/3]`, 0, 36);

        ctx.restore();
      };

      // Player 1 Crosshair (Blue)
      drawCrosshair(p1Crosshair.current.x, p1Crosshair.current.y, '#38bdf8', 'P1', p1Ammo, p1ReloadTimerRef.current);

      // Player 2 / AI Crosshair (Red)
      const p2Label = gameMode === 'vs_ai' ? 'BOT' : 'P2';
      drawCrosshair(p2Crosshair.current.x, p2Crosshair.current.y, '#f87171', p2Label, p2Ammo, p2ReloadTimerRef.current);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gameState, currentQuestion, gameMode, aiDifficulty, roundNumber, totalQuestions, p1Ammo, p2Ammo, handleNextRound, handleShoot, startReload]);

  // --------------------------------------------------------------------------
  // RENDER UI
  // --------------------------------------------------------------------------
  return (
    <div style={{ minHeight: '100vh', background: '#0b0f19', color: '#fff', padding: '1rem' }}>
      {/* Top Navbar Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBackToMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#1e293b',
            color: '#fff',
            border: '2px solid #334155',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ← Kembali ke Menu
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 700 }}>
            🏆 High Score: <strong style={{ color: '#facc15' }}>{highScore} pts</strong>
          </span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 700 }}>
            Match Progress: <strong style={{ color: '#38bdf8' }}>Soal {roundNumber} / {totalQuestions}</strong>
          </span>
        </div>
      </div>

      {/* Main Game Container */}
      <div style={{ maxWidth: '1050px', margin: '0 auto', background: '#0f172a', border: '3px solid #334155', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        {/* HUD Top Bar: Scores & 4-Second Reload Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr auto 1.2fr', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          {/* Player 1 HUD (Blue) */}
          <div style={{ background: '#0284c71a', border: '2px solid #0284c7', borderRadius: '12px', padding: '10px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>PLAYER 1 (WASD + SPACE)</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{p1Score} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>pts ({p1CorrectCount} Benar)</span></div>
              </div>

              {/* Ammo Display (3 Bullets) */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
                  {p1ReloadTime > 0 ? `RELOAD: ${p1ReloadTime.toFixed(1)}s` : `PELURU (${p1Ammo}/3)`}
                </div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px', justifyContent: 'flex-end' }}>
                  {[1, 2, 3].map((b) => (
                    <span
                      key={b}
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '24px',
                        borderRadius: '4px',
                        background: p1ReloadTime > 0 ? '#334155' : b <= p1Ammo ? '#38bdf8' : '#1e293b',
                        border: '1.5px solid #0284c7',
                        boxShadow: (b <= p1Ammo && p1ReloadTime <= 0) ? '0 0 8px #38bdf8' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* P1 4-Second Reload Progress Bar */}
            {p1ReloadTime > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, marginBottom: '2px' }}>
                  <span>🔄 RELOADING PELURU (4 DETIK)...</span>
                  <span>{p1ReloadTime.toFixed(1)}s</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${((RELOAD_TIME_SECONDS - p1ReloadTime) / RELOAD_TIME_SECONDS) * 100}%`,
                      background: 'linear-gradient(90deg, #0284c7, #38bdf8)',
                      transition: 'width 0.1s linear'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Center Target & Match Question Counter */}
          <div style={{ textAlign: 'center', padding: '0 10px' }}>
            <span style={{ display: 'inline-block', background: '#f59e0b', color: '#000', fontWeight: 900, fontSize: '0.8rem', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px' }}>
              🎯 SOAL {roundNumber} / {totalQuestions} (+3 / SOAL)
            </span>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px' }}>
              Waktu Soal: <strong style={{ color: roundTimeLeft <= 4 ? '#ef4444' : '#4ade80', fontSize: '1rem' }}>{Math.ceil(roundTimeLeft)}s</strong>
            </div>
          </div>

          {/* Player 2 HUD (Red) */}
          <div style={{ background: '#dc26261a', border: '2px solid #dc2626', borderRadius: '12px', padding: '10px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Ammo Display (3 Bullets) */}
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
                  {p2ReloadTime > 0 ? `RELOAD: ${p2ReloadTime.toFixed(1)}s` : `PELURU (${p2Ammo}/3)`}
                </div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                  {[1, 2, 3].map((b) => (
                    <span
                      key={b}
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '24px',
                        borderRadius: '4px',
                        background: p2ReloadTime > 0 ? '#334155' : b <= p2Ammo ? '#f87171' : '#1e293b',
                        border: '1.5px solid #dc2626',
                        boxShadow: (b <= p2Ammo && p2ReloadTime <= 0) ? '0 0 8px #f87171' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f87171' }}>
                  {gameMode === 'vs_ai' ? '🤖 AI BOT' : 'PLAYER 2 (ARROWS + ENTER)'}
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{p2Score} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>pts ({p2CorrectCount} Benar)</span></div>
              </div>
            </div>

            {/* P2 4-Second Reload Progress Bar */}
            {p2ReloadTime > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#f87171', fontWeight: 700, marginBottom: '2px' }}>
                  <span>🔄 RELOADING PELURU (4 DETIK)...</span>
                  <span>{p2ReloadTime.toFixed(1)}s</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${((RELOAD_TIME_SECONDS - p2ReloadTime) / RELOAD_TIME_SECONDS) * 100}%`,
                      background: 'linear-gradient(90deg, #dc2626, #f87171)',
                      transition: 'width 0.1s linear'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Screen */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px', border: '2px solid #1e293b' }}>
          <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            style={{ width: '100%', height: 'auto', display: 'block', background: '#020617' }}
          />

          {/* Lobby & Settings Overlay */}
          {gameState === 'lobby' && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(11, 15, 25, 0.94)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '1.5rem 1rem 3rem',
                textAlign: 'center',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                zIndex: 30
              }}
            >
              <div style={{ maxWidth: '680px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🎯💥</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', background: 'linear-gradient(to right, #38bdf8, #facc15, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  MATH TARGET SHOOTER SHOWDOWN
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Tembak 1 dari 5 papan jawaban yang benar untuk soal di tengah! Benar = <strong style={{ color: '#4ade80' }}>+3 Poin</strong>. Peluru <strong style={{ color: '#38bdf8' }}>3 butir</strong> dengan waktu <strong>Reload 4 Detik</strong>.
                </p>

                {/* Match Settings Panel */}
                <div style={{ background: '#1e293b', border: '2px solid #334155', borderRadius: '14px', padding: '1rem 1.5rem', width: '100%', marginBottom: '1.25rem', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#facc15', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ⚙️ PENGATURAN MATCH SEBELUM MAIN:
                  </div>

                  {/* Question Count Selector (10, 15, 20, 25) */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                      🎯 Jumlah Soal Pertandingan:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[10, 15, 20, 25].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTotalQuestions(num)}
                          style={{
                            padding: '8px',
                            borderRadius: '8px',
                            border: totalQuestions === num ? '2px solid #facc15' : '1px solid #475569',
                            background: totalQuestions === num ? '#ca8a0433' : '#0f172a',
                            color: totalQuestions === num ? '#facc15' : '#e2e8f0',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          {num} Soal {num === 20 ? '⭐' : num === 25 ? '👑' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Math Operator Selector */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                      🧮 Tipe Operasi Matematika:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '6px' }}>
                      {[
                        { id: 'all', label: 'Campur (+-×:)' },
                        { id: 'add', label: 'Tambah (+)' },
                        { id: 'sub', label: 'Kurang (-)' },
                        { id: 'mul', label: 'Kali (×)' },
                        { id: 'div', label: 'Bagi (:)' }
                      ].map((op) => (
                        <button
                          key={op.id}
                          type="button"
                          onClick={() => setSelectedOp(op.id as MathOp)}
                          style={{
                            padding: '6px 4px',
                            borderRadius: '6px',
                            border: selectedOp === op.id ? '2px solid #38bdf8' : '1px solid #475569',
                            background: selectedOp === op.id ? '#0284c733' : '#0f172a',
                            color: selectedOp === op.id ? '#38bdf8' : '#cbd5e1',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Difficulty Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                      🤖 Tingkat Kesulitan Bot AI (Jika Solo):
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {[
                        { id: 'easy', label: '🟢 Santai (Easy)' },
                        { id: 'medium', label: '🟡 Standar (Medium)' },
                        { id: 'hard', label: '🔴 Cepat (Hard)' }
                      ].map((diff) => (
                        <button
                          key={diff.id}
                          type="button"
                          onClick={() => setAiDifficulty(diff.id as AiDifficulty)}
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            border: aiDifficulty === diff.id ? '2px solid #a855f7' : '1px solid #475569',
                            background: aiDifficulty === diff.id ? '#7e22ce33' : '#0f172a',
                            color: aiDifficulty === diff.id ? '#c084fc' : '#cbd5e1',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {diff.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start Mode Selection Buttons */}
                <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
                  <button
                    onClick={() => startGame('vs_ai')}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: '#0284c7',
                      color: '#fff',
                      border: '2px solid #38bdf8',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                    }}
                  >
                    🤖 Mulai: Solo vs AI ({totalQuestions} Soal)
                  </button>
                  <button
                    onClick={() => startGame('pvp')}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: '#dc2626',
                      color: '#fff',
                      border: '2px solid #f87171',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)'
                    }}
                  >
                    👥 Mulai: 2 Player Local ({totalQuestions} Soal)
                  </button>
                </div>

                {/* Controls Cheatsheet */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', background: '#0f172a', padding: '10px 14px', borderRadius: '10px', border: '1px solid #334155', textAlign: 'left', fontSize: '0.8rem' }}>
                  <div>
                    <strong style={{ color: '#38bdf8' }}>🎮 P1 Controls:</strong><br />
                    Arahkan: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>W</kbd> <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>A</kbd> <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>S</kbd> <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>D</kbd><br />
                    Tembak: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>SPACE</kbd> | Reload: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>R</kbd>
                  </div>
                  <div>
                    <strong style={{ color: '#f87171' }}>🎮 P2 Controls:</strong><br />
                    Arahkan: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>↑</kbd> <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>↓</kbd> <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>←</kbd> <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>→</kbd><br />
                    Tembak: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>ENTER</kbd> | Reload: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>SHIFT</kbd>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Match Over Screen with Detailed Statistics */}
          {gameState === 'game_over' && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(11, 15, 25, 0.95)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '2rem 1rem 3rem',
                textAlign: 'center',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                zIndex: 30
              }}
            >
              <div style={{ maxWidth: '480px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.25rem' }}>
                  {winner === 1 ? '👑 🥇 🏆' : winner === 2 ? '🤖 🏆 💥' : '🤝 ⭐ 🎯'}
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: winner === 1 ? '#38bdf8' : winner === 2 ? '#f87171' : '#facc15', marginBottom: '0.25rem' }}>
                  {winner === 1 ? 'PLAYER 1 JUARA MATCH!' : winner === 2 ? (gameMode === 'vs_ai' ? 'BOT AI MENANG!' : 'PLAYER 2 JUARA MATCH!') : 'HASIL SERI / DRAW!'}
                </h2>
                <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                Pertandingan {totalQuestions} Soal Selesai!
              </p>

              {/* Match Stats Card */}
              <div style={{ background: '#1e293b', border: '2px solid #334155', borderRadius: '12px', padding: '1rem 1.5rem', maxWidth: '420px', width: '100%', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>PLAYER 1</span>
                  <span style={{ color: '#f87171', fontWeight: 800 }}>{gameMode === 'vs_ai' ? 'BOT AI' : 'PLAYER 2'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 900, marginBottom: '8px' }}>
                  <span style={{ color: '#38bdf8' }}>{p1Score} pts ({p1CorrectCount} Soal)</span>
                  <span style={{ color: '#f87171' }}>{p2Score} pts ({p2CorrectCount} Soal)</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center' }}>
                  Akurasi: P1 {Math.round((p1CorrectCount / totalQuestions) * 100)}% | P2 {Math.round((p2CorrectCount / totalQuestions) * 100)}%
                </div>
              </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => startGame(gameMode)}
                    style={{
                      padding: '12px 28px',
                      background: '#22c55e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)'
                    }}
                  >
                    🔄 Main Lagi ({totalQuestions} Soal)
                  </button>
                  <button
                    onClick={() => setGameState('lobby')}
                    style={{
                      padding: '12px 28px',
                      background: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    ⚙️ Ganti Pengaturan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Interactive Shooting & Reload Controls Bar */}
          {gameState === 'playing' && (
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
              <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
                <button
                  onClick={() => handleShoot(1)}
                  disabled={p1Ammo <= 0 || p1ReloadTime > 0}
                  style={{
                    background: (p1Ammo > 0 && p1ReloadTime <= 0) ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : '#334155',
                    color: '#fff',
                    border: '2px solid #38bdf8',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    cursor: (p1Ammo > 0 && p1ReloadTime <= 0) ? 'pointer' : 'not-allowed',
                    boxShadow: (p1Ammo > 0 && p1ReloadTime <= 0) ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>💥 TEMBAK P1</span>
                  <kbd style={{ background: '#082f49', border: '1px solid #38bdf8', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>SPACE</kbd>
                </button>

                <button
                  onClick={() => startReload(1)}
                  disabled={p1ReloadTime > 0 || p1Ammo === 3}
                  style={{
                    background: '#1e293b',
                    color: '#38bdf8',
                    border: '1.5px solid #0284c7',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: (p1ReloadTime <= 0 && p1Ammo < 3) ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>🔄 Reload (R)</span>
                </button>
              </div>

              {gameMode === 'pvp' && (
                <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
                  <button
                    onClick={() => startReload(2)}
                    disabled={p2ReloadTime > 0 || p2Ammo === 3}
                    style={{
                      background: '#1e293b',
                      color: '#f87171',
                      border: '1.5px solid #dc2626',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: (p2ReloadTime <= 0 && p2Ammo < 3) ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>🔄 Reload (SHIFT)</span>
                  </button>

                  <button
                    onClick={() => handleShoot(2)}
                    disabled={p2Ammo <= 0 || p2ReloadTime > 0}
                    style={{
                      background: (p2Ammo > 0 && p2ReloadTime <= 0) ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' : '#334155',
                      color: '#fff',
                      border: '2px solid #f87171',
                      borderRadius: '12px',
                      padding: '10px 20px',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      cursor: (p2Ammo > 0 && p2ReloadTime <= 0) ? 'pointer' : 'not-allowed',
                      boxShadow: (p2Ammo > 0 && p2ReloadTime <= 0) ? '0 0 16px rgba(248, 113, 113, 0.4)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>💥 TEMBAK P2</span>
                    <kbd style={{ background: '#450a0a', border: '1px solid #f87171', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>ENTER</kbd>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
