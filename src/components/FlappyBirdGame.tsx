"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface FlappyBirdGameProps {
  onBackToMenu: () => void;
  onAddScore?: (pts: number) => void;
}

// Sound Synthesizer using Web Audio API
class FlappySound {
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

  playFlap() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playScore() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.07);
    osc.frequency.setValueAtTime(783.99, now + 0.14);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playHit() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.18);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playCoin() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playHeal() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playGameOver() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [440, 392, 349, 293];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }
}

const sounds = new FlappySound();

export type MathOperator = 'all' | 'add' | 'sub' | 'mul' | 'div';

export interface MathQuizQuestion {
  prompt: string;
  correct: number;
  options: number[]; // 4 choices (A, B, C, D)
  correctIndex: number;
  topicName: string;
}

// ============================================================================
// GENERATOR SOAL HITUNG CEPAT MUDAH DENGAN 4 PILIHAN (+, -, ×, ÷)
// ============================================================================
function generateEasyQuizQuestion(op: MathOperator): MathQuizQuestion {
  let activeOp = op;
  if (activeOp === 'all') {
    const list: MathOperator[] = ['add', 'sub', 'mul', 'div'];
    activeOp = list[Math.floor(Math.random() * list.length)];
  }

  let prompt = '';
  let correct = 0;
  let topicName = '';

  if (activeOp === 'add') {
    topicName = 'Penjumlahan (+)';
    const a = Math.floor(Math.random() * 45) + 6;
    const b = Math.floor(Math.random() * 45) + 6;
    correct = a + b;
    prompt = `${a} + ${b} = ?`;
  } else if (activeOp === 'sub') {
    topicName = 'Pengurangan (-)';
    const a = Math.floor(Math.random() * 50) + 20;
    const b = Math.floor(Math.random() * (a - 8)) + 4;
    correct = a - b;
    prompt = `${a} - ${b} = ?`;
  } else if (activeOp === 'mul') {
    topicName = 'Perkalian (×)';
    const a = Math.floor(Math.random() * 11) + 2;
    const b = Math.floor(Math.random() * 11) + 2;
    correct = a * b;
    prompt = `${a} × ${b} = ?`;
  } else {
    topicName = 'Pembagian (÷)';
    const b = Math.floor(Math.random() * 10) + 2;
    const ans = Math.floor(Math.random() * 12) + 2;
    const a = b * ans;
    correct = ans;
    prompt = `${a} ÷ ${b} = ?`;
  }

  // Generate 4 distinct options
  const set = new Set<number>([correct]);
  while (set.size < 4) {
    const delta = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = correct + delta;
    if (fake >= 0) set.add(fake);
  }
  const opts = Array.from(set).sort(() => Math.random() - 0.5);
  const correctIdx = opts.indexOf(correct);

  return {
    prompt,
    correct,
    options: opts,
    correctIndex: correctIdx,
    topicName
  };
}

interface MysteryGate {
  x: number;
  width: number;
  passed: boolean;
  question: MathQuizQuestion;
}

interface PickupItem {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'coin';
  radius: number;
  collected: boolean;
  floatAngle: number;
}

export default function FlappyBirdGame({ onBackToMenu, onAddScore }: FlappyBirdGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Selected Math Operator (Default to mixed +, -, ×, ÷)
  const [selectedOp] = useState<MathOperator>('all');

  // Game UI States
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [activeQuiz, setActiveQuiz] = useState<MathQuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('math_flappy_highscore_v3');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Lives supported with half-hearts (e.g. 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0)
  const [lives, setLives] = useState<number>(3);
  const [combo, setCombo] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);

  // Floating notifications
  const [floatText, setFloatText] = useState<{ text: string; id: number } | null>(null);

  // Slot Openings Definition:
  const TOP_SLOT_TOP = 50;
  const TOP_SLOT_BOTTOM = 210;
  const BOTTOM_SLOT_TOP = 270;
  const BOTTOM_SLOT_BOTTOM = 430;

  // Internal Game Engine Refs for 60fps loop
  const engineRef = useRef({
    birdX: 140,
    birdY: 235,
    birdVelocity: 0,
    gravity: 0.36,
    jumpStrength: -7.2,
    birdRadius: 18,
    birdRotation: 0,
    invincibleFrames: 0,
    gate: null as MysteryGate | null,
    items: [] as PickupItem[],
    gateSpeed: 2.8,
    spawnTimer: 0,
    scoreCount: 0,
    coinsCount: 0,
    livesCount: 3.0,
    op: 'all' as MathOperator,
    timeRemaining: 15.0,
    comboCount: 0,
    isPlaying: false,
    isPausedForQuiz: false,
    cloudOffset: 0,
    treeOffset: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; color: string; life: number; size: number }[]
  });

  const triggerJump = useCallback(() => {
    const eng = engineRef.current;
    if (!eng.isPlaying || eng.isPausedForQuiz) return;
    eng.birdVelocity = eng.jumpStrength;
    sounds.playFlap();

    eng.particles.push({
      x: eng.birdX - 10,
      y: eng.birdY + 10,
      vx: -1.5,
      vy: 1,
      color: 'rgba(255, 255, 255, 0.8)',
      life: 15,
      size: 6
    });
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    engineRef.current.isPlaying = false;
    engineRef.current.isPausedForQuiz = false;
    setActiveQuiz(null);
    sounds.playGameOver();
    setGameState('gameover');
    if (onAddScore) onAddScore(finalScore);

    setHighScore((prev) => {
      const nextHigh = Math.max(prev, finalScore);
      if (typeof window !== 'undefined') {
        localStorage.setItem('math_flappy_highscore_v3', nextHigh.toString());
      }
      return nextHigh;
    });
  }, [onAddScore]);

  const startGame = useCallback(() => {
    const firstQ = generateEasyQuizQuestion(selectedOp);
    engineRef.current = {
      birdX: 140,
      birdY: 235,
      birdVelocity: 0,
      gravity: 0.36,
      jumpStrength: -7.2,
      birdRadius: 18,
      birdRotation: 0,
      invincibleFrames: 0,
      gate: {
        x: 680,
        width: 100,
        passed: false,
        question: firstQ
      },
      items: [
        {
          id: 1,
          x: 380,
          y: 235,
          type: 'coin',
          radius: 14,
          collected: false,
          floatAngle: 0
        }
      ],
      gateSpeed: 2.8,
      spawnTimer: 0,
      scoreCount: 0,
      coinsCount: 0,
      livesCount: 3.0,
      op: selectedOp,
      timeRemaining: 15.0,
      comboCount: 0,
      isPlaying: true,
      isPausedForQuiz: false,
      cloudOffset: 0,
      treeOffset: 0,
      particles: []
    };

    setScore(0);
    setCoins(0);
    setLives(3.0);
    setCombo(0);
    setTimerSeconds(15);
    setActiveQuiz(null);
    setSelectedAnswerIdx(null);
    setGameState('playing');
  }, [selectedOp]);

  // Player answers the 4-choice quiz modal
  const handleAnswerQuiz = useCallback((chosenIdx: number) => {
    const eng = engineRef.current;
    if (!eng.isPlaying || !eng.isPausedForQuiz || !activeQuiz) return;

    setSelectedAnswerIdx(chosenIdx);
    const isCorrect = chosenIdx === activeQuiz.correctIndex;

    if (isCorrect) {
      sounds.playScore();
      const earned = 100 + eng.comboCount * 25;
      eng.scoreCount += earned;
      eng.comboCount += 1;
      setScore(eng.scoreCount);
      setCombo(eng.comboCount);
      setFloatText({ text: `🎉 BENAR! +${earned}`, id: Date.now() });

      for (let p = 0; p < 24; p++) {
        eng.particles.push({
          x: eng.birdX + 30,
          y: eng.birdY,
          vx: (Math.random() - 0.5) * 9,
          vy: (Math.random() - 0.5) * 9,
          color: '#82fed6',
          life: 30,
          size: 6
        });
      }
    } else {
      sounds.playHit();
      eng.livesCount = Math.max(0, eng.livesCount - 0.5);
      eng.invincibleFrames = 40;
      eng.comboCount = 0;
      setLives(eng.livesCount);
      setCombo(0);
      setFloatText({ text: '❌ SALAH! -½ ❤️', id: Date.now() });

      for (let p = 0; p < 18; p++) {
        eng.particles.push({
          x: eng.birdX + 30,
          y: eng.birdY,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          color: '#ef4444',
          life: 25,
          size: 5
        });
      }

      if (eng.livesCount <= 0) {
        setTimeout(() => handleGameOver(eng.scoreCount), 350);
        return;
      }
    }

    // Resume game flight forward!
    setTimeout(() => {
      eng.isPausedForQuiz = false;
      if (eng.gate) {
        eng.gate.passed = true;
      }
      eng.birdVelocity = -3;
      setActiveQuiz(null);
      setSelectedAnswerIdx(null);
    }, 350);
  }, [activeQuiz, handleGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.code === 'Space' || key === 'w') {
        e.preventDefault();
        if (gameState === 'idle') {
          startGame();
        } else if (gameState === 'playing') {
          triggerJump();
        }
      } else if (gameState === 'playing' && activeQuiz) {
        if (key === 'a' || key === '1') {
          e.preventDefault();
          handleAnswerQuiz(0);
        } else if (key === 'b' || key === '2') {
          e.preventDefault();
          handleAnswerQuiz(1);
        } else if (key === 'c' || key === '3') {
          e.preventDefault();
          handleAnswerQuiz(2);
        } else if (key === 'd' || key === '4') {
          e.preventDefault();
          handleAnswerQuiz(3);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, activeQuiz, triggerJump, startGame, handleAnswerQuiz]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastFrameTime = performance.now();

    const render = (nowTime: number) => {
      const deltaSec = Math.min(0.1, (nowTime - lastFrameTime) / 1000);
      lastFrameTime = nowTime;

      const eng = engineRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // ==========================================
      // 1. ENVIRONMENT: CLASSIC ICONIC FLAPPY BIRD SKY & CITY HILLS
      // ==========================================
      // ==========================================
      // 1. ENVIRONMENT: BEAUTIFUL DETAILED FLAPPY BIRD SKY & CITY
      // ==========================================
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#3ba9b8'); // Rich vibrant sky blue
      skyGrad.addColorStop(0.55, '#62c6d4');
      skyGrad.addColorStop(0.85, '#9ee5ec');
      skyGrad.addColorStop(1, '#d8f6f8');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Warm Golden Retro Sun with Soft Ambient Rays & Glow
      const sunX = width - 110;
      const sunY = 75;
      
      // Outer subtle radial aura
      const sunHalo = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 70);
      sunHalo.addColorStop(0, 'rgba(255, 245, 180, 0.55)');
      sunHalo.addColorStop(0.5, 'rgba(255, 230, 140, 0.2)');
      sunHalo.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunHalo;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 70, 0, Math.PI * 2);
      ctx.fill();

      // Sun Body
      const sunGrad = ctx.createRadialGradient(sunX - 6, sunY - 6, 2, sunX, sunY, 28);
      sunGrad.addColorStop(0, '#fffbe6');
      sunGrad.addColorStop(0.6, '#ffd54f');
      sunGrad.addColorStop(1, '#ffb300');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 200, 50, 0.6)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Distant Flying Birds Silhouettes (V-shape flock)
      const flockX = ((nowTime * 0.02) % (width + 200)) - 100;
      ctx.strokeStyle = 'rgba(50, 110, 130, 0.45)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      const birdFlock = [
        { x: flockX, y: 55, s: 7 },
        { x: flockX - 22, y: 64, s: 6 },
        { x: flockX - 44, y: 72, s: 5 },
        { x: flockX - 18, y: 46, s: 5.5 },
      ];
      birdFlock.forEach((b) => {
        const wingFlap = Math.sin(nowTime * 0.01 + b.x) * 3;
        ctx.beginPath();
        ctx.moveTo(b.x - b.s, b.y + wingFlap);
        ctx.quadraticCurveTo(b.x - b.s / 2, b.y - b.s / 2 + wingFlap, b.x, b.y);
        ctx.quadraticCurveTo(b.x + b.s / 2, b.y - b.s / 2 + wingFlap, b.x + b.s, b.y + wingFlap);
        ctx.stroke();
      });

      // Layer 1: Distant Slow High Clouds (Soft Puffy White)
      if (!eng.isPausedForQuiz) {
        eng.cloudOffset = (eng.cloudOffset + 0.3) % (width + 300);
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      for (let i = 0; i < 4; i++) {
        const cx = (i * 240 - eng.cloudOffset + width * 3) % (width + 240) - 80;
        const cy = 95 + (i % 2) * 25;
        
        // Puffy Cloud Bubbles
        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.arc(cx + 22, cy - 10, 36, 0, Math.PI * 2);
        ctx.arc(cx + 52, cy - 4, 30, 0, Math.PI * 2);
        ctx.arc(cx + 74, cy + 2, 22, 0, Math.PI * 2);
        ctx.fill();

        // Cloud Flat Bottom
        ctx.beginPath();
        ctx.roundRect(cx - 8, cy + 6, 92, 18, 9);
        ctx.fill();
      }

      // Layer 2: Lower Foreground Fluffy Floating Clouds (faster parallax)
      const lowCloudOffset = (eng.cloudOffset * 1.6) % (width + 360);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      for (let i = 0; i < 3; i++) {
        const cx = (i * 320 - lowCloudOffset + width * 3) % (width + 300) - 100;
        const cy = 190 + (i % 2) * 40;
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.arc(cx + 18, cy - 8, 26, 0, Math.PI * 2);
        ctx.arc(cx + 42, cy, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Distant Classic City Silhouette & Green Hills (Y: height - 120)
      if (!eng.isPausedForQuiz) {
        eng.treeOffset = (eng.treeOffset + 0.8) % 360;
      }

      // Distant Retro City Buildings
      ctx.fillStyle = '#6ec578';
      for (let bx = -60 - (eng.treeOffset * 0.4); bx < width + 80; bx += 70) {
        const bH = 50 + Math.abs(Math.sin(bx * 0.05)) * 45;
        ctx.fillRect(bx, height - 52 - bH, 50, bH);
        
        // Small Building Windows
        ctx.fillStyle = '#4ea658';
        for (let wy = height - 52 - bH + 8; wy < height - 60; wy += 14) {
          ctx.fillRect(bx + 8, wy, 8, 8);
          ctx.fillRect(bx + 22, wy, 8, 8);
          ctx.fillRect(bx + 36, wy, 8, 8);
        }
        ctx.fillStyle = '#6ec578';
      }

      // Classic Rolling Green Trees & Bush Hills
      ctx.fillStyle = '#58a020';
      for (let hx = -60 - (eng.treeOffset * 0.8); hx < width + 80; hx += 80) {
        ctx.beginPath();
        ctx.arc(hx + 40, height - 52, 45, 0, Math.PI, true);
        ctx.fill();
      }

      ctx.fillStyle = '#73bf2e';
      for (let hx = -30 - (eng.treeOffset * 0.8); hx < width + 80; hx += 80) {
        ctx.beginPath();
        ctx.arc(hx + 40, height - 52, 35, 0, Math.PI, true);
        ctx.fill();
      }

      // ==========================================
      // CLASSIC SCROLLING GROUND FLOOR (TURF & DIRT)
      // ==========================================
      const GROUND_Y = height - 52;
      const groundScroll = !eng.isPausedForQuiz ? (nowTime * 0.12) % 24 : 0;

      // Sandy / Tan Soil Base
      ctx.fillStyle = '#ded895';
      ctx.fillRect(0, GROUND_Y, width, 52);

      // Slanted Retro Soil Stripes
      ctx.strokeStyle = '#c8be74';
      ctx.lineWidth = 3;
      for (let sx = -30 - groundScroll; sx < width + 40; sx += 18) {
        ctx.beginPath();
        ctx.moveTo(sx, GROUND_Y + 14);
        ctx.lineTo(sx - 16, height);
        ctx.stroke();
      }

      // Top Green Grass Turf
      ctx.fillStyle = '#73bf2e';
      ctx.fillRect(0, GROUND_Y, width, 14);

      // Dark Green Turf Shadow Line
      ctx.fillStyle = '#58a020';
      ctx.fillRect(0, GROUND_Y + 11, width, 3);

      // Retro Black Border on Ground Surface
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(width, GROUND_Y);
      ctx.stroke();

      // ==========================================
      // 2. PHYSICS, TIMERS, SPAWNING & COLLISION
      // ==========================================
      if (eng.isPlaying) {
        // If in quiz pause mode: count down 15s timer
        if (eng.isPausedForQuiz) {
          eng.timeRemaining -= deltaSec;
          const currentSecInt = Math.max(0, Math.ceil(eng.timeRemaining));
          setTimerSeconds(currentSecInt);

          // If timeout: -0.5 life and resume
          if (eng.timeRemaining <= 0) {
            sounds.playHit();
            eng.livesCount = Math.max(0, eng.livesCount - 0.5);
            eng.comboCount = 0;
            setLives(eng.livesCount);
            setCombo(0);
            setFloatText({ text: '⏱️ WAKTU HABIS! -½ ❤️', id: Date.now() });

            if (eng.livesCount <= 0) {
              handleGameOver(eng.scoreCount);
            } else {
              eng.isPausedForQuiz = false;
              if (eng.gate) eng.gate.passed = true;
              setActiveQuiz(null);
            }
          }
        } else {
          // Normal Flying physics
          if (eng.invincibleFrames > 0) {
            eng.invincibleFrames--;
          }

          eng.birdVelocity += eng.gravity;
          eng.birdY += eng.birdVelocity;
          eng.birdRotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (eng.birdVelocity * 3.5 * Math.PI) / 180));

          if (eng.birdY - eng.birdRadius <= 5) {
            eng.birdY = eng.birdRadius + 5;
            eng.birdVelocity = 0;
          }

          // Ground Collision
          if (eng.birdY + eng.birdRadius >= GROUND_Y) {
            eng.birdY = GROUND_Y - eng.birdRadius;
            eng.birdVelocity = -7;

            // Dust Particles on ground hit
            for (let s = 0; s < 10; s++) {
              eng.particles.push({
                x: eng.birdX + (Math.random() - 0.5) * 20,
                y: GROUND_Y,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 5 - 1,
                color: '#ded895',
                life: 18,
                size: Math.random() * 4 + 2
              });
            }

            if (eng.invincibleFrames <= 0) {
              sounds.playHit();
              eng.livesCount = Math.max(0, eng.livesCount - 0.5);
              eng.invincibleFrames = 45;
              eng.comboCount = 0;
              setLives(eng.livesCount);
              setCombo(0);
              setFloatText({ text: '💥 Menabrak Tanah! -½ ❤️', id: Date.now() });

              if (eng.livesCount <= 0) {
                handleGameOver(eng.scoreCount);
              }
            }
          }

          // Items Update
          for (let i = eng.items.length - 1; i >= 0; i--) {
            const item = eng.items[i];
            item.x -= eng.gateSpeed;
            item.floatAngle += 0.08;
            const bobY = item.y + Math.sin(item.floatAngle) * 6;

            const dx = eng.birdX - item.x;
            const dy = eng.birdY - bobY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (!item.collected && dist <= eng.birdRadius + item.radius) {
              item.collected = true;

              if (item.type === 'coin') {
                sounds.playCoin();
                eng.coinsCount += 1;
                eng.scoreCount += 50;
                setCoins(eng.coinsCount);
                setScore(eng.scoreCount);
                setFloatText({ text: '+50 KOIN! 🪙', id: Date.now() });
              } else if (item.type === 'heart') {
                sounds.playHeal();
                eng.livesCount = Math.min(3.0, eng.livesCount + 1.0);
                setLives(eng.livesCount);
                setFloatText({ text: '+1 NYAWA PULIH! ❤️', id: Date.now() });
              }
            }

            if (item.x < -50 || item.collected) {
              eng.items.splice(i, 1);
            }
          }

          // Gate Movement & Collision
          if (eng.gate) {
            eng.gate.x -= eng.gateSpeed;

            // When bird reaches / touches the gate checkpoint
            if (!eng.gate.passed && eng.gate.x <= eng.birdX + 70) {
              // STOP EVERYTHING! PAUSE FOR QUIZ MODAL!
              eng.isPausedForQuiz = true;
              eng.timeRemaining = 15.0;
              setTimerSeconds(15);
              setActiveQuiz(eng.gate.question);
            }

            // If gate scrolls past screen
            if (eng.gate.x + eng.gate.width < -100) {
              // Spawn next mystery gate!
              const nextQ = generateEasyQuizQuestion(eng.op);
              eng.gate = {
                x: width + 100,
                width: 100,
                passed: false,
                question: nextQ
              };

              // Also spawn occasional coin/heart
              if (Math.random() < 0.6) {
                const isHeart = eng.livesCount < 2.5 && Math.random() < 0.4;
                eng.items.push({
                  id: Date.now(),
                  x: width + 30,
                  y: Math.random() > 0.5 ? 130 : 350,
                  type: isHeart ? 'heart' : 'coin',
                  radius: isHeart ? 16 : 14,
                  collected: false,
                  floatAngle: 0
                });
              }
            }
          }
        }
      }

      // ==========================================
      // 3. DRAW CLASSIC ICONIC RETRO GREEN PIPES
      // ==========================================
      if (eng.gate) {
        const g = eng.gate;

        // Draw Classic Retro Green Pipe with Collar Rim
        const drawClassicPipe = (y: number, h: number, hasTopCap = false, hasBottomCap = false) => {
          if (h <= 0) return;

          ctx.save();

          // Main Pipe Body Gradient (Retro Green with Highlight & Shadow)
          const pipeGrad = ctx.createLinearGradient(g.x, 0, g.x + g.width, 0);
          pipeGrad.addColorStop(0, '#58a020'); // Dark Green Shadow Left
          pipeGrad.addColorStop(0.12, '#9de64e'); // Light Green Highlight Stripe
          pipeGrad.addColorStop(0.3, '#73bf2e'); // Main Classic Green
          pipeGrad.addColorStop(0.85, '#73bf2e');
          pipeGrad.addColorStop(1, '#58a020'); // Dark Green Shadow Right

          ctx.fillStyle = pipeGrad;
          ctx.fillRect(g.x, y, g.width, h);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3.5;
          ctx.strokeRect(g.x, y, g.width, h);

          // Top Pipe Collar Lip
          if (hasTopCap) {
            const capH = 26;
            const capX = g.x - 5;
            const capW = g.width + 10;
            const capY = y;

            ctx.fillStyle = pipeGrad;
            ctx.fillRect(capX, capY, capW, capH);
            ctx.strokeRect(capX, capY, capW, capH);
          }

          // Bottom Pipe Collar Lip
          if (hasBottomCap) {
            const capH = 26;
            const capX = g.x - 5;
            const capW = g.width + 10;
            const capY = y + h - capH;

            ctx.fillStyle = pipeGrad;
            ctx.fillRect(capX, capY, capW, capH);
            ctx.strokeRect(capX, capY, capW, capH);
          }

          ctx.restore();
        };

        // Draw 3 Pipe Segments
        drawClassicPipe(0, TOP_SLOT_TOP, false, true);
        drawClassicPipe(TOP_SLOT_BOTTOM, BOTTOM_SLOT_TOP - TOP_SLOT_BOTTOM, true, true);
        drawClassicPipe(BOTTOM_SLOT_BOTTOM, GROUND_Y - BOTTOM_SLOT_BOTTOM, true, false);

        // ==========================================
        // CLEAN MYSTERY GATE GAP AURA (TANPA TEKS BANNER)
        // ==========================================

        // Path A (Top Opening)
        const gateAHeight = TOP_SLOT_BOTTOM - TOP_SLOT_TOP;
        const gateAY = TOP_SLOT_TOP;

        ctx.save();
        // Subtle soft portal glow in gap
        const glowAGrad = ctx.createRadialGradient(
          g.x + g.width / 2, gateAY + gateAHeight / 2, 10,
          g.x + g.width / 2, gateAY + gateAHeight / 2, g.width / 1.5
        );
        glowAGrad.addColorStop(0, g.passed ? 'rgba(52, 211, 153, 0.4)' : 'rgba(56, 189, 248, 0.35)');
        glowAGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glowAGrad;
        ctx.fillRect(g.x, gateAY, g.width, gateAHeight);

        // Center Floating Glowing Question Mark
        const bobA = Math.sin(nowTime * 0.005) * 5;
        ctx.font = '900 32px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(g.passed ? '✨' : '❓', g.x + g.width / 2, gateAY + gateAHeight / 2 + bobA);
        ctx.restore();

        // Path B (Bottom Opening)
        const gateBHeight = BOTTOM_SLOT_BOTTOM - BOTTOM_SLOT_TOP;
        const gateBY = BOTTOM_SLOT_TOP;

        ctx.save();
        // Subtle soft portal glow in gap
        const glowBGrad = ctx.createRadialGradient(
          g.x + g.width / 2, gateBY + gateBHeight / 2, 10,
          g.x + g.width / 2, gateBY + gateBHeight / 2, g.width / 1.5
        );
        glowBGrad.addColorStop(0, g.passed ? 'rgba(52, 211, 153, 0.4)' : 'rgba(251, 146, 60, 0.35)');
        glowBGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glowBGrad;
        ctx.fillRect(g.x, gateBY, g.width, gateBHeight);

        // Center Floating Glowing Question Mark
        const bobB = Math.sin(nowTime * 0.005 + 1.5) * 5;
        ctx.font = '900 32px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(g.passed ? '✨' : '❓', g.x + g.width / 2, gateBY + gateBHeight / 2 + bobB);
        ctx.restore();
      }

      // ==========================================
      // 4. DRAW PICKUP ITEMS
      // ==========================================
      eng.items.forEach((item) => {
        const bobY = item.y + Math.sin(item.floatAngle) * 6;

        if (item.type === 'coin') {
          ctx.save();
          ctx.translate(item.x, bobY);
          const scaleX = Math.abs(Math.cos(item.floatAngle * 1.5)) * 0.6 + 0.4;
          ctx.scale(scaleX, 1);

          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(0, 0, item.radius - 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (item.type === 'heart') {
          ctx.save();
          ctx.translate(item.x, bobY);
          ctx.font = '22px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText('❤️', 0, 8);
          ctx.restore();
        }
      });

      // ==========================================
      // 5. DRAW PARTICLES
      // ==========================================
      for (let i = eng.particles.length - 1; i >= 0; i--) {
        const p = eng.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) eng.particles.splice(i, 1);
      }

      // ==========================================
      // 6. DRAW FLAPPY BIRD
      // ==========================================
      ctx.save();
      ctx.translate(eng.birdX, eng.birdY);
      ctx.rotate(eng.birdRotation);

      if (eng.invincibleFrames > 0 && Math.floor(eng.invincibleFrames / 4) % 2 === 0) {
        ctx.globalAlpha = 0.4;
      }

      // Bird Body
      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(0, 0, eng.birdRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Wing
      ctx.fillStyle = '#f4a261';
      ctx.beginPath();
      ctx.ellipse(-6, 2, 9, 6, -Math.PI / 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(7, -5, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(9, -5, 3, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#e76f51';
      ctx.beginPath();
      ctx.moveTo(14, -2);
      ctx.lineTo(24, 2);
      ctx.lineTo(14, 7);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [handleGameOver]);

  const formatLivesText = (val: number) => {
    if (val <= 0) return '0';
    const whole = Math.floor(val);
    const hasHalf = val % 1 !== 0;
    if (hasHalf) {
      return whole > 0 ? `${whole}½` : '½';
    }
    return `${whole}`;
  };

  return (
    <div className="flappy-game-container">
      {/* Top Navigation Bar */}
      <div className="flappy-nav">
        <button className="flappy-btn-back" onClick={onBackToMenu}>
          &larr; Back to Games Hub
        </button>

        <div className="flappy-title-badge">
          <span>🐦</span> FLAPPY MATH (HITUNG CEPAT)
        </div>

        {/* Dynamic Health with Half-Hearts, Coins, Timer & Stats */}
        <div className="flappy-stats-bar">
          <div className="heart-container" title={`${formatLivesText(lives)} / 3 Nyawa Tersisa`}>
            {[1, 2, 3].map((slot) => {
              const isFull = lives >= slot;
              const isHalf = lives === slot - 0.5;
              return (
                <span
                  key={slot}
                  className={`heart-icon ${isFull ? 'alive' : isHalf ? 'half' : 'dead'}`}
                >
                  {isFull ? '❤️' : isHalf ? '💔' : '🖤'}
                </span>
              );
            })}
            <span className="heart-label">{formatLivesText(lives)}/3</span>
          </div>

          <div className={`stat-pill timer-pill ${timerSeconds <= 5 ? 'warning-timer' : ''}`} title="Waktu Jawab Soal">
            <span className="pill-icon">⏱️</span>
            <span className="pill-val">{timerSeconds}s</span>
          </div>

          <div className="stat-pill coin-pill" title="Total Koin">
            <span className="pill-icon">🪙</span>
            <span className="pill-val">{coins}</span>
          </div>

          <div className="stat-pill score-pill" title="Skor Game">
            <span className="pill-icon">⭐</span>
            <span className="pill-val">{score}</span>
          </div>

          {combo > 1 && (
            <div className="stat-pill combo-pill">
              <span>🔥 x{combo}</span>
            </div>
          )}

          <div className="stat-pill high-pill" title="Rekor Tertinggi">
            <span className="pill-icon">🏆</span>
            <span className="pill-val">{highScore}</span>
          </div>
        </div>
      </div>

      {/* GAME CANVAS ARENA */}
      <div className="flappy-canvas-wrapper" onClick={gameState === 'playing' ? triggerJump : startGame}>
        <canvas ref={canvasRef} width={840} height={480} className="flappy-canvas" />

        {/* Floating Notification Popup */}
        {floatText && <div className="flappy-float-text">{floatText.text}</div>}

        {/* OVERLAY: MODAL SOAL (4 PILIHAN JAWABAN) - MUNCUL SAAT MENABRAK GERBANG & GAME BERHENTI */}
        {gameState === 'playing' && activeQuiz && (
          <div className="flappy-overlay quiz-modal-overlay">
            <div className="flappy-quiz-card">
              <div className="quiz-card-header">
                <span className="quiz-badge">📚 {activeQuiz.topicName}</span>
                <span className={`quiz-timer ${timerSeconds <= 5 ? 'danger' : ''}`}>
                  ⏱️ {timerSeconds}s
                </span>
              </div>

              <div className="quiz-prompt-text">{activeQuiz.prompt}</div>
              <p className="quiz-subtitle">Pilih 1 dari 4 jawaban yang benar di bawah ini:</p>

              <div className="quiz-options-grid">
                {activeQuiz.options.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedAnswerIdx === idx;
                  const isCorrect = isSelected && idx === activeQuiz.correctIndex;
                  const isWrong = isSelected && idx !== activeQuiz.correctIndex;

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`quiz-option-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswerQuiz(idx);
                      }}
                      disabled={selectedAnswerIdx !== null}
                    >
                      <span className="opt-letter">{letters[idx]}</span>
                      <span className="opt-number">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="quiz-footer-hint">
                Tekan tombol [A], [B], [C], [D] atau klik opsi di atas. (Salah jawab: -½ ❤️ & langsung lanjut!)
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY: IDLE / START SCREEN WITH DIRECT PLAY GAME BUTTON */}
        {gameState === 'idle' && (
          <div className="flappy-overlay start-overlay">
            <div className="flappy-start-card">
              <div className="start-hero-icon">🐦 ⚡</div>
              <h1 className="start-hero-title">FLAPPY MATH</h1>
              <p className="start-hero-subtitle">Hitung Cepat (+, -, ×, ÷)</p>

              <button
                type="button"
                className="btn-play-game"
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
              >
                <span className="play-icon">▶</span> PLAY GAME
              </button>

              <div className="start-click-hint">
                Tekan <strong>[Spasi]</strong> atau klik tombol di atas untuk mulai terbang!
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY: GAME OVER */}
        {gameState === 'gameover' && (
          <div className="flappy-overlay">
            <div className="flappy-modal-card gameover">
              <div className="modal-icon">💀 💥</div>
              <h2 className="modal-title">GAME OVER!</h2>
              <p className="modal-desc">
                Burungmu kehabisan nyawa! Inilah perolehan skormu:
              </p>

              <div className="flappy-result-stats">
                <div className="stat-box">
                  <span className="label">SKOR AKHIR</span>
                  <span className="val">{score}</span>
                </div>
                <div className="stat-box">
                  <span className="label">KOIN DIDAPAT</span>
                  <span className="val" style={{ color: '#f59e0b' }}>🪙 {coins}</span>
                </div>
                <div className="stat-box full-width">
                  <span className="label">REKOR TERTINGGI</span>
                  <span className="val" style={{ color: '#10b981' }}>🏆 {Math.max(score, highScore)}</span>
                </div>
              </div>

              <div className="flappy-modal-actions">
                <button
                  type="button"
                  className="btn-retry"
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                >
                  🔄 Main Lagi
                </button>
                <button
                  type="button"
                  className="btn-hub"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBackToMenu();
                  }}
                >
                  🏠 Menu Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls Hint footer */}
      <div className="flappy-hint-bar">
        💡 <strong>Cara Main:</strong> Kepakkan sayap dengan <strong>Spasi / Klik Layar / W</strong> untuk melewati rintangan. Saat mencapai gerbang, burung berhenti dan jawab 1 dari 4 pilihan yang benar!
      </div>

      {/* Flappy Bird Styles */}
      <style jsx>{`
        .flappy-game-container {
          min-height: calc(100vh - 80px);
          background: #0f172a;
          color: #fff;
          padding: 1.2rem 1.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          user-select: none;
        }

        .flappy-nav {
          width: 100%;
          max-width: 840px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #1e293b;
          border: 3px solid #000;
          border-radius: 16px;
          padding: 0.6rem 1.2rem;
          box-shadow: 4px 4px 0 #000;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .flappy-btn-back {
          background: #ffdc00;
          color: #000;
          border: 2px solid #000;
          border-radius: 8px;
          font-weight: 900;
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          box-shadow: 2px 2px 0 #000;
          transition: transform 0.1s;
        }
        .flappy-btn-back:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4px 4px 0 #000;
        }

        .flappy-title-badge {
          font-size: 1.05rem;
          font-weight: 900;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .flappy-stats-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .heart-container {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #0f172a;
          border: 2px solid #000;
          padding: 0.25rem 0.6rem;
          border-radius: 16px;
          font-size: 1rem;
        }

        .heart-label {
          font-size: 0.85rem;
          font-weight: 900;
          color: #f43f5e;
          margin-left: 2px;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #0f172a;
          border: 2px solid #000;
          padding: 0.25rem 0.6rem;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .timer-pill {
          background: #334155;
          color: #82fed6;
          border-color: #82fed6;
        }
        .timer-pill.warning-timer {
          background: #ef4444;
          color: #fff;
          border-color: #000;
          animation: blinkTimer 0.5s infinite alternate;
        }
        @keyframes blinkTimer {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        .coin-pill {
          background: #f59e0b;
          color: #000;
        }

        .score-pill {
          background: #0284c7;
          color: #fff;
        }

        .combo-pill {
          background: #ff4757;
          color: #fff;
          font-weight: 900;
        }

        .high-pill {
          background: #10b981;
          color: #fff;
        }

        /* CANVAS WRAPPER */
        .flappy-canvas-wrapper {
          position: relative;
          border: 4px solid #000;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 8px 8px 0 #000;
          cursor: pointer;
        }

        .flappy-canvas {
          display: block;
          background: #38bdf8;
        }

        /* FLOATING TEXT */
        .flappy-float-text {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          font-weight: 900;
          color: #ffdc00;
          text-shadow: 3px 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
          animation: floatUp 0.75s ease-out forwards;
          pointer-events: none;
          z-index: 15;
        }
        @keyframes floatUp {
          0% { transform: translate(-50%, 0) scale(0.7); opacity: 0; }
          40% { transform: translate(-50%, -20px) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -50px) scale(1); opacity: 0; }
        }

        /* OVERLAYS */
        .flappy-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.2rem;
          z-index: 20;
        }

        /* QUIZ CARD (4 CHOICES MODAL) */
        .flappy-quiz-card {
          background: #fff;
          color: #000;
          border: 4px solid #000;
          border-radius: 18px;
          padding: 1.3rem 1.6rem;
          box-shadow: 8px 8px 0 #000;
          max-width: 500px;
          width: 100%;
          text-align: center;
          animation: popQuiz 0.25s cubic-bezier(0.2, 0.8, 0.4, 1);
        }
        @keyframes popQuiz {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .quiz-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .quiz-badge {
          font-size: 0.8rem;
          font-weight: 800;
          background: #e0f2fe;
          color: #0369a1;
          border: 1.5px solid #0284c7;
          padding: 2px 10px;
          border-radius: 6px;
        }

        .quiz-timer {
          font-size: 0.85rem;
          font-weight: 900;
          background: #f1f5f9;
          border: 1.5px solid #000;
          padding: 2px 10px;
          border-radius: 6px;
        }
        .quiz-timer.danger {
          background: #fee2e2;
          border-color: #ef4444;
          color: #b91c1c;
        }

        .quiz-prompt-text {
          font-size: 2.2rem;
          font-weight: 900;
          color: #0284c7;
          margin: 0.2rem 0;
          letter-spacing: -0.01em;
        }

        .quiz-subtitle {
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 700;
          margin-bottom: 0.9rem;
        }

        .quiz-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
          margin-bottom: 0.8rem;
        }

        .quiz-option-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 2.5px solid #000;
          border-radius: 10px;
          padding: 0.7rem 1rem;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.12s;
        }
        .quiz-option-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0 #000;
          background: #ffdc00;
        }
        .quiz-option-btn.correct {
          background: #82fed6 !important;
          border-color: #059669;
          box-shadow: 4px 4px 0 #059669;
        }
        .quiz-option-btn.wrong {
          background: #fee2e2 !important;
          border-color: #dc2626;
          box-shadow: 4px 4px 0 #dc2626;
        }

        .opt-letter {
          font-size: 0.85rem;
          font-weight: 900;
          background: #000;
          color: #fff;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .opt-number {
          font-size: 1.4rem;
          font-weight: 900;
          color: #0f172a;
        }

        .quiz-footer-hint {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
        }

        /* START MODAL & GAMEOVER MODAL */
        .flappy-modal-card {
          background: #ffffff;
          color: #000000;
          border: 4px solid #000000;
          border-radius: 20px;
          padding: 1.5rem 2rem;
          box-shadow: 8px 8px 0 #000000;
          max-width: 480px;
          width: 90%;
          text-align: center;
        }

        /* START OVERLAY & CARD */
        .start-overlay {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
        }

        .flappy-start-card {
          background: #ffffff;
          color: #000000;
          border: 4px solid #000000;
          border-radius: 24px;
          padding: 2.2rem 2.6rem;
          box-shadow: 8px 8px 0 #000000;
          max-width: 440px;
          width: 90%;
          text-align: center;
          animation: popStart 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }
        @keyframes popStart {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        .start-hero-icon {
          font-size: 3.5rem;
          line-height: 1;
          filter: drop-shadow(3px 3px 0 #000);
          animation: bounceBird 1.2s infinite ease-in-out alternate;
        }
        @keyframes bounceBird {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }

        .start-hero-title {
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0;
          line-height: 1.1;
        }

        .start-hero-subtitle {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0284c7;
          background: #e0f2fe;
          border: 2px solid #0284c7;
          border-radius: 20px;
          padding: 0.3rem 1.1rem;
          margin: 0;
        }

        .btn-play-game {
          width: 100%;
          background: #82fed6;
          color: #000000;
          border: 3.5px solid #000000;
          border-radius: 16px;
          padding: 1.1rem 1.8rem;
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.03em;
          cursor: pointer;
          box-shadow: 6px 6px 0 #000000;
          transition: all 0.12s cubic-bezier(0.2, 0.8, 0.4, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          margin-top: 0.4rem;
        }
        .btn-play-game:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #000000;
          background: #a7f3d0;
        }
        .btn-play-game:active {
          transform: translate(3px, 3px);
          box-shadow: 2px 2px 0 #000000;
        }
        .btn-play-game .play-icon {
          font-size: 1.5rem;
          color: #059669;
          filter: drop-shadow(1px 1px 0 #000);
        }

        .start-click-hint {
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 600;
        }
        .start-click-hint strong {
          color: #0f172a;
        }

        /* GAMEOVER MODAL */
        .flappy-modal-card {
          background: #fff;
          color: #000;
          border: 4px solid #000;
          border-radius: 18px;
          padding: 1.4rem 1.8rem;
          box-shadow: 8px 8px 0 #000;
          max-width: 460px;
          width: 100%;
          text-align: center;
        }

        .modal-icon {
          font-size: 2.4rem;
          margin-bottom: 0.2rem;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .modal-desc {
          color: #4b5563;
          font-size: 0.85rem;
          line-height: 1.4;
          margin-bottom: 0.9rem;
        }

        .flappy-result-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .stat-box {
          background: #f8fafc;
          border: 2px solid #000;
          border-radius: 10px;
          padding: 0.6rem 0.5rem;
        }
        .stat-box.full-width {
          grid-column: span 2;
        }
        .stat-box .label {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          color: #64748b;
        }
        .stat-box .val {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0284c7;
        }

        .flappy-modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .btn-retry {
          background: #82fed6;
          color: #000;
          border: 2.5px solid #000;
          border-radius: 10px;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 3px 3px 0 #000;
          transition: transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-retry:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
        }

        .btn-hub {
          background: #ffd166;
          color: #000;
          border: 2.5px solid #000;
          border-radius: 10px;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 3px 3px 0 #000;
          transition: transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-hub:hover {
          background: #ffc233;
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
        }

        .flappy-hint-bar {
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          color: #cbd5e1;
          text-align: center;
          max-width: 840px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
