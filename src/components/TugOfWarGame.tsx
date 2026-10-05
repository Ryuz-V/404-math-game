"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface TugOfWarGameProps {
  onBackToMenu: () => void;
  onAddScore?: (pts: number) => void;
}

// Sound Synthesizer using Web Audio API
class TugSound {
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

  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.25);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playPull() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playWhistle() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.linearRampToValueAtTime(2400, now + 0.1);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.35);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }
}

const sounds = new TugSound();

type GameMode = 'vs-bot' | '2p-local';
type BotDifficulty = 'easy' | 'medium' | 'hard' | 'extreme';

interface QuickMathQ {
  question: string;
  options: string[];
  correctIndex: number;
}

// ============================================================================
// GENERATOR SOAL HITUNG CEPAT RAPID-FIRE (+, -, ×, ÷)
// ============================================================================
function generateGrade12TugQuestion(): QuickMathQ {
  const types = ['add', 'sub', 'mul', 'div'];
  const t = types[Math.floor(Math.random() * types.length)];

  let question = '';
  let ans = 0;

  if (t === 'add') {
    const a = Math.floor(Math.random() * 60) + 8;
    const b = Math.floor(Math.random() * 60) + 8;
    ans = a + b;
    question = `${a} + ${b} = ?`;
  } else if (t === 'sub') {
    const a = Math.floor(Math.random() * 70) + 20;
    const b = Math.floor(Math.random() * (a - 10)) + 5;
    ans = a - b;
    question = `${a} - ${b} = ?`;
  } else if (t === 'mul') {
    const a = Math.floor(Math.random() * 11) + 2;
    const b = Math.floor(Math.random() * 11) + 2;
    ans = a * b;
    question = `${a} × ${b} = ?`;
  } else {
    const b = Math.floor(Math.random() * 10) + 2;
    const res = Math.floor(Math.random() * 12) + 2;
    const a = b * res;
    ans = res;
    question = `${a} : ${b} = ?`;
  }

  // Generate 4 unique options
  const set = new Set<number>([ans]);
  while (set.size < 4) {
    const delta = (Math.floor(Math.random() * 6) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = ans + delta;
    if (fake >= 0) set.add(fake);
  }
  const opts = Array.from(set).sort(() => Math.random() - 0.5);
  const correctIdx = opts.indexOf(ans);

  return {
    question,
    options: opts.map(String),
    correctIndex: correctIdx
  };
}

// ============================================================================
// REAL TUG OF WAR CANVAS 2D RENDERER (STADIUM, JUTE ROPE, & ATHLETES)
// ============================================================================
function drawTugStadium(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number
) {
  // 1. Sky & Floodlights
  const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
  skyGrad.addColorStop(0, '#0f172a');
  skyGrad.addColorStop(0.5, '#1e293b');
  skyGrad.addColorStop(1, '#334155');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, groundY);

  // Stadium Floodlight Cones
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.moveTo(90, 0);
  ctx.lineTo(0, groundY);
  ctx.lineTo(280, groundY);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(width - 90, 0);
  ctx.lineTo(width - 280, groundY);
  ctx.lineTo(width, groundY);
  ctx.closePath();
  ctx.fill();

  // Cheering Crowd in Background Stands
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, groundY - 48, width, 48);

  for (let cx = 18; cx < width - 18; cx += 28) {
    const crowdColor = cx < width / 2 ? '#3b82f6' : '#ef4444';
    ctx.fillStyle = crowdColor;
    ctx.beginPath();
    ctx.arc(cx, groundY - 30, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(cx - 4, groundY - 24, 8, 14);
  }

  // 2. Green Tournament Turf Grass
  const grassGrad = ctx.createLinearGradient(0, groundY - 8, 0, height);
  grassGrad.addColorStop(0, '#15803d');
  grassGrad.addColorStop(1, '#14532d');
  ctx.fillStyle = grassGrad;
  ctx.fillRect(0, groundY - 8, width, height - (groundY - 8));

  // Mowed Lawn Vertical Stripes
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  for (let sx = 0; sx < width; sx += 60) {
    ctx.fillRect(sx, groundY - 8, 30, height - (groundY - 8));
  }

  // 3. Center Worn Dirt/Mud Path
  const mudGrad = ctx.createRadialGradient(width / 2, groundY + 22, 10, width / 2, groundY + 22, 280);
  mudGrad.addColorStop(0, '#78350f');
  mudGrad.addColorStop(0.6, '#92400e');
  mudGrad.addColorStop(1, 'rgba(21, 128, 61, 0)');
  ctx.fillStyle = mudGrad;
  ctx.beginPath();
  ctx.ellipse(width / 2, groundY + 20, 320, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. White Chalk Center Line (0m)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(width / 2, groundY - 25);
  ctx.lineTo(width / 2, groundY + 45);
  ctx.stroke();

  // Center Circle on Turf
  ctx.beginPath();
  ctx.ellipse(width / 2, groundY + 12, 34, 12, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Center Mark Label
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 11px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText('0m', width / 2, groundY - 30);

  // 5. Team Blue Win Limit Line (Left: 16% of width)
  const leftLimitX = width * 0.16;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(leftLimitX, groundY - 25);
  ctx.lineTo(leftLimitX, groundY + 45);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = '900 10px system-ui';
  ctx.fillText('🏁 MENANG BIRU', leftLimitX, groundY - 30);

  // 6. Team Red Win Limit Line (Right: 84% of width)
  const rightLimitX = width * 0.84;
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rightLimitX, groundY - 25);
  ctx.lineTo(rightLimitX, groundY + 45);
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = '900 10px system-ui';
  ctx.fillText('MENANG MERAH 🏁', rightLimitX, groundY - 30);
}

function drawTugRopeAndRibbon(
  ctx: CanvasRenderingContext2D,
  startX: number,
  endX: number,
  ropeY: number,
  centerRibbonX: number,
  isPulling: boolean,
  time: number
) {
  ctx.save();

  // Subtle tension vibration
  const vibY = isPulling ? Math.sin(time * 0.05) * 2.5 : Math.sin(time * 0.005) * 0.8;
  const currentY = ropeY + vibY;

  // 1. Thick Base Rope Shadow on Grass
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(startX, currentY + 38);
  ctx.lineTo(endX, currentY + 38);
  ctx.stroke();

  // 2. Thick Braided Jute Rope Body
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(startX, currentY);
  ctx.lineTo(endX, currentY);
  ctx.stroke();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 3. Realistic Twisted Rope Coils / Braid pattern
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  for (let rx = startX + 6; rx < endX - 6; rx += 14) {
    ctx.beginPath();
    ctx.moveTo(rx, currentY - 5);
    ctx.lineTo(rx + 8, currentY + 5);
    ctx.stroke();
  }

  // 4. Center Red Ribbon / Flag Tied on the Rope
  const ribX = centerRibbonX;
  const wave = Math.sin(time * 0.008) * 8;

  // Gold Clasp
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(ribX, currentY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Red Center Flag Ribbon (Fluttering downwards towards ground)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(ribX - 6, currentY);
  ctx.lineTo(ribX - 14 + wave, currentY + 45);
  ctx.lineTo(ribX + 4 + wave, currentY + 38);
  ctx.lineTo(ribX + 16 + wave, currentY + 46);
  ctx.lineTo(ribX + 6, currentY);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Ribbon Center Gold Star / Dot
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('0', ribX, currentY + 3);

  ctx.restore();
}

function drawTugAthlete(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  team: 'blue' | 'red',
  role: 'anchor' | 'mid' | 'captain',
  leanAngle: number,
  isPulling: boolean,
  _isStumbling: boolean,
  isBot: boolean,
  _time: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(leanAngle);

  const primaryCol = team === 'blue' ? '#2563eb' : '#dc2626';
  const secondaryCol = team === 'blue' ? '#38bdf8' : '#f87171';
  const darkCol = team === 'blue' ? '#1e3a8a' : '#991b1b';

  // Boots / Sneakers digging into grass
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(-14, -8, 28, 10, 4);
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.fillRect(-12, 0, 24, 3); // Sole

  // Legs / Athletic Track Pants
  ctx.fillStyle = darkCol;
  ctx.beginPath();
  ctx.roundRect(-10, -42, 20, 36, 5);
  ctx.fill();
  ctx.stroke();
  // Team Stripe on pants
  ctx.fillStyle = secondaryCol;
  ctx.fillRect(-8, -40, 4, 32);

  // Torso / Team Jersey
  ctx.fillStyle = primaryCol;
  ctx.beginPath();
  ctx.roundRect(-16, -78, 32, 38, 7);
  ctx.fill();
  ctx.stroke();

  // Jersey Number / Badge
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(role === 'captain' ? 'C' : role === 'mid' ? '2' : '1', 0, -54);

  // Arms and Hands Clamping the Rope
  ctx.fillStyle = primaryCol;
  ctx.beginPath();
  const armReachX = team === 'blue' ? 14 : -14;
  ctx.roundRect(armReachX > 0 ? 0 : -22, -68, 22, 12, 5);
  ctx.fill();
  ctx.stroke();

  // Hands (Gloved hands holding rope tightly!)
  ctx.fillStyle = '#fde047'; // Grip gloves
  ctx.beginPath();
  ctx.arc(armReachX, -62, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Head & Face
  if (isBot) {
    // Cybernetic AI Robot Head! 🤖
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.roundRect(-14, -104, 28, 24, 6);
    ctx.fill();
    ctx.stroke();

    // Glowing Red Visor
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-10, -96, 20, 7);
  } else {
    // Human Athlete Head
    ctx.fillStyle = '#fed7aa'; // Skin tone
    ctx.beginPath();
    ctx.arc(0, -92, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Athletic Headband
    ctx.fillStyle = secondaryCol;
    ctx.fillRect(-13, -99, 26, 6);
    ctx.strokeRect(-13, -99, 26, 6);

    // Hair / Tuft
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(0, -103, 10, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eyes (Determined Grit)
    ctx.fillStyle = '#0f172a';
    const eyeDir = team === 'blue' ? -2 : 2;
    ctx.fillRect(eyeDir - 4, -94, 3, 4);
    ctx.fillRect(eyeDir + 2, -94, 3, 4);

    // Gritted Teeth / Shouting Mouth
    ctx.fillStyle = isPulling ? '#b91c1c' : '#ffffff';
    ctx.fillRect(-4, -85, 8, isPulling ? 5 : 3);
    ctx.strokeRect(-4, -85, 8, isPulling ? 5 : 3);
  }

  // Sweat Drop if pulling
  if (isPulling) {
    ctx.fillStyle = '#38bdf8';
    ctx.font = '12px system-ui';
    ctx.fillText('💦', team === 'blue' ? -18 : 18, -100);
  }

  ctx.restore();
}

export default function TugOfWarGame({ onBackToMenu, onAddScore }: TugOfWarGameProps) {
  const [gameMode, setGameMode] = useState<GameMode>('vs-bot');
  const [botDiff, setBotDiff] = useState<BotDifficulty>('medium');
  const [gameState, setGameState] = useState<'lobby' | 'countdown' | 'playing' | 'gameover'>('lobby');
  const [countdown, setCountdown] = useState(3);

  // Rope Position: 0 = center, -100 = Team 1 (Left) Wins, +100 = Team 2 (Right) Wins
  const [ropePosition, setRopePosition] = useState(0);
  const [p1Streak, setP1Streak] = useState(0);
  const [p2Streak, setP2Streak] = useState(0);
  const [p1PowerActive, setP1PowerActive] = useState(false);
  const [p2PowerActive, setP2PowerActive] = useState(false);
  const [p1PullEffect, setP1PullEffect] = useState(false);
  const [p2PullEffect, setP2PullEffect] = useState(false);

  // Stats
  const [p1CorrectCount, setP1CorrectCount] = useState(0);
  const [p2CorrectCount, setP2CorrectCount] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(60);
  const [winner, setWinner] = useState<'Team 1' | 'Team 2' | 'Draw' | null>(null);

  // Question streams
  const [p1Question, setP1Question] = useState<QuickMathQ>(generateGrade12TugQuestion());
  const [p2Question, setP2Question] = useState<QuickMathQ>(generateGrade12TugQuestion());
  const [p1Selected, setP1Selected] = useState<number | null>(null);
  const [p2Selected, setP2Selected] = useState<number | null>(null);

  // Canvas & Arena Animation State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const arenaRef = useRef({
    currentRopeX: 0,
    p1PullTimer: 0,
    p2PullTimer: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; color: string; life: number; size: number }[],
    floatTexts: [] as { x: number; y: number; text: string; color: string; life: number; vy: number }[]
  });

  // Bot timer ref
  const botIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const WIN_LIMIT = 85; // Distance to edge to win

  const startGame = () => {
    setRopePosition(0);
    arenaRef.current.currentRopeX = 0;
    arenaRef.current.particles = [];
    arenaRef.current.floatTexts = [];
    setP1Streak(0);
    setP2Streak(0);
    setP1CorrectCount(0);
    setP2CorrectCount(0);
    setP1PowerActive(false);
    setP2PowerActive(false);
    setTimerRemaining(60);
    setWinner(null);
    setP1Question(generateGrade12TugQuestion());
    setP2Question(generateGrade12TugQuestion());
    setP1Selected(null);
    setP2Selected(null);
    setCountdown(3);
    setGameState('countdown');
  };

  // Countdown timer
  useEffect(() => {
    if (gameState === 'countdown') {
      sounds.playWhistle();
      const interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            setGameState('playing');
            sounds.playWhistle();
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  // Main match timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimerRemaining((t) => {
        if (t <= 1) {
          clearInterval(interval);
          // Determine winner by rope position
          setRopePosition((currRope) => {
            if (currRope < -10) {
              setWinner('Team 1');
              sounds.playVictory();
              if (onAddScore) onAddScore(250);
            } else if (currRope > 10) {
              setWinner('Team 2');
              sounds.playVictory();
            } else {
              setWinner('Draw');
            }
            return currRope;
          });
          setGameState('gameover');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, onAddScore]);

  // Check victory condition on rope movement
  const checkVictory = useCallback((newPos: number) => {
    if (newPos <= -WIN_LIMIT) {
      setWinner('Team 1');
      setGameState('gameover');
      sounds.playVictory();
      if (onAddScore) onAddScore(300);
      return true;
    }
    if (newPos >= WIN_LIMIT) {
      setWinner('Team 2');
      setGameState('gameover');
      sounds.playVictory();
      return true;
    }
    return false;
  }, [onAddScore]);

  // Handle Player 1 Pull
  const handleP1Answer = (optIndex: number) => {
    if (gameState !== 'playing' || p1Selected !== null) return;
    setP1Selected(optIndex);

    if (optIndex === p1Question.correctIndex) {
      sounds.playCorrect();
      sounds.playPull();
      const multiplier = p1PowerActive ? 2.5 : p1Streak >= 3 ? 1.6 : 1.0;
      const pullForce = 12 * multiplier;
      
      setP1CorrectCount((c) => c + 1);
      setP1Streak((s) => s + 1);
      setP1PullEffect(true);
      setTimeout(() => setP1PullEffect(false), 400);

      // Trigger Canvas Pull Animation and Particles
      arenaRef.current.p1PullTimer = 0.5;
      const currentCenterX = 460 + arenaRef.current.currentRopeX;
      for (let i = 0; i < 18; i++) {
        arenaRef.current.particles.push({
          x: currentCenterX - 180 + (Math.random() - 0.5) * 80,
          y: 185,
          vx: -Math.random() * 5 - 2,
          vy: -Math.random() * 3,
          color: Math.random() < 0.5 ? '#92400e' : '#38bdf8',
          life: 25,
          size: Math.random() * 5 + 3
        });
      }
      arenaRef.current.floatTexts.push({
        x: currentCenterX - 150,
        y: 80,
        text: p1PowerActive ? '💥 SUPER PULL! ⚡' : p1Streak >= 3 ? '🔥 COMBO PULL!' : '💥 HAAAP!',
        color: '#38bdf8',
        life: 30,
        vy: -1.5
      });

      setRopePosition((prev) => {
        const nextPos = Math.max(-100, prev - pullForce);
        checkVictory(nextPos);
        return nextPos;
      });

      if (p1PowerActive) setP1PowerActive(false);
    } else {
      sounds.playWrong();
      setP1Streak(0);
      setP1PowerActive(false);
    }

    setTimeout(() => {
      setP1Selected(null);
      setP1Question(generateGrade12TugQuestion());
    }, 350);
  };

  // Handle Player 2 Pull
  const handleP2Answer = (optIndex: number) => {
    if (gameState !== 'playing' || p2Selected !== null) return;
    setP2Selected(optIndex);

    if (optIndex === p2Question.correctIndex) {
      sounds.playCorrect();
      sounds.playPull();
      const multiplier = p2PowerActive ? 2.5 : p2Streak >= 3 ? 1.6 : 1.0;
      const pullForce = 12 * multiplier;

      setP2CorrectCount((c) => c + 1);
      setP2Streak((s) => s + 1);
      setP2PullEffect(true);
      setTimeout(() => setP2PullEffect(false), 400);

      // Trigger Canvas Pull Animation and Particles
      arenaRef.current.p2PullTimer = 0.5;
      const currentCenterX = 460 + arenaRef.current.currentRopeX;
      for (let i = 0; i < 18; i++) {
        arenaRef.current.particles.push({
          x: currentCenterX + 180 + (Math.random() - 0.5) * 80,
          y: 185,
          vx: Math.random() * 5 + 2,
          vy: -Math.random() * 3,
          color: Math.random() < 0.5 ? '#92400e' : '#f87171',
          life: 25,
          size: Math.random() * 5 + 3
        });
      }
      arenaRef.current.floatTexts.push({
        x: currentCenterX + 150,
        y: 80,
        text: p2PowerActive ? '💥 SUPER PULL! ⚡' : p2Streak >= 3 ? '🔥 COMBO PULL!' : '💥 TARIK!',
        color: '#f87171',
        life: 30,
        vy: -1.5
      });

      setRopePosition((prev) => {
        const nextPos = Math.min(100, prev + pullForce);
        checkVictory(nextPos);
        return nextPos;
      });

      if (p2PowerActive) setP2PowerActive(false);
    } else {
      sounds.playWrong();
      setP2Streak(0);
      setP2PowerActive(false);
    }

    setTimeout(() => {
      setP2Selected(null);
      setP2Question(generateGrade12TugQuestion());
    }, 350);
  };

  // Canvas Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const render = (nowTime: number) => {
      const dt = Math.min(0.1, (nowTime - lastTime) / 1000);
      lastTime = nowTime;

      const width = canvas.width;
      const height = canvas.height;
      const groundY = 175;

      // Smoothly lerp currentRopeX towards ropePosition * 3.4
      const targetX = ropePosition * 3.4;
      arenaRef.current.currentRopeX += (targetX - arenaRef.current.currentRopeX) * 0.15;
      const ropeX = arenaRef.current.currentRopeX;

      // Decrement pull timers
      if (arenaRef.current.p1PullTimer > 0) arenaRef.current.p1PullTimer -= dt;
      if (arenaRef.current.p2PullTimer > 0) arenaRef.current.p2PullTimer -= dt;

      const isP1Pulling = arenaRef.current.p1PullTimer > 0;
      const isP2Pulling = arenaRef.current.p2PullTimer > 0;

      // 1. Draw Stadium & Pitch
      drawTugStadium(ctx, width, height, groundY);

      // 2. Draw Dust & Sweat Particles
      for (let i = arenaRef.current.particles.length - 1; i >= 0; i--) {
        const p = arenaRef.current.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) arenaRef.current.particles.splice(i, 1);
      }

      // 3. Draw The Rope & Center Ribbon
      const centerRibbonX = width / 2 + ropeX;
      const startX = centerRibbonX - 300;
      const endX = centerRibbonX + 300;
      const ropeY = groundY - 55;

      drawTugRopeAndRibbon(ctx, startX, endX, ropeY, centerRibbonX, isP1Pulling || isP2Pulling, nowTime);

      // 4. Draw Team Blue Athletes (Left side)
      const p1AnchorLean = isP1Pulling ? -0.75 : isP2Pulling ? -0.2 : -0.45;
      drawTugAthlete(ctx, centerRibbonX - 250, groundY + 8, 'blue', 'anchor', p1AnchorLean, isP1Pulling, isP2Pulling, false, nowTime);

      const p1MidLean = isP1Pulling ? -0.7 : isP2Pulling ? -0.22 : -0.42;
      drawTugAthlete(ctx, centerRibbonX - 180, groundY + 8, 'blue', 'mid', p1MidLean, isP1Pulling, isP2Pulling, false, nowTime);

      const p1CapLean = isP1Pulling ? -0.65 : isP2Pulling ? -0.25 : -0.38;
      drawTugAthlete(ctx, centerRibbonX - 110, groundY + 8, 'blue', 'captain', p1CapLean, isP1Pulling, isP2Pulling, false, nowTime);

      // 5. Draw Team Red Athletes (Right side)
      const p2CapLean = isP2Pulling ? 0.65 : isP1Pulling ? 0.25 : 0.38;
      drawTugAthlete(ctx, centerRibbonX + 110, groundY + 8, 'red', 'captain', p2CapLean, isP2Pulling, isP1Pulling, false, nowTime);

      const p2MidLean = isP2Pulling ? 0.7 : isP1Pulling ? 0.22 : 0.42;
      drawTugAthlete(ctx, centerRibbonX + 180, groundY + 8, 'red', 'mid', p2MidLean, isP2Pulling, isP1Pulling, false, nowTime);

      const p2AnchorLean = isP2Pulling ? 0.75 : isP1Pulling ? 0.2 : 0.45;
      drawTugAthlete(ctx, centerRibbonX + 250, groundY + 8, 'red', 'anchor', p2AnchorLean, isP2Pulling, isP1Pulling, gameMode === 'vs-bot', nowTime);

      // 6. Draw Floating Comic Text Shouts
      for (let i = arenaRef.current.floatTexts.length - 1; i >= 0; i--) {
        const ft = arenaRef.current.floatTexts[i];
        ft.y += ft.vy;
        ft.life--;

        ctx.save();
        ctx.fillStyle = ft.color;
        ctx.font = '900 14px system-ui';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3.5;
        ctx.strokeText(ft.text, ft.x, ft.y);
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.life <= 0) arenaRef.current.floatTexts.splice(i, 1);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [ropePosition, gameMode]);

  // Trigger Power Pull
  const activateP1Power = () => {
    if (p1Streak >= 3 && !p1PowerActive) {
      setP1PowerActive(true);
      sounds.playWhistle();
    }
  };

  const activateP2Power = () => {
    if (p2Streak >= 3 && !p2PowerActive) {
      setP2PowerActive(true);
      sounds.playWhistle();
    }
  };

  // Bot AI behavior in vs-bot mode
  useEffect(() => {
    if (gameState !== 'playing' || gameMode !== 'vs-bot') {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
      return;
    }

    const intervals: Record<BotDifficulty, { min: number; max: number; acc: number; force: number }> = {
      easy: { min: 2800, max: 4500, acc: 0.65, force: 7 },
      medium: { min: 2000, max: 3200, acc: 0.8, force: 9 },
      hard: { min: 1400, max: 2400, acc: 0.9, force: 12 },
      extreme: { min: 900, max: 1600, acc: 0.98, force: 15 }
    };

    const config = intervals[botDiff];

    const botTick = () => {
      const isCorrect = Math.random() < config.acc;
      if (isCorrect) {
        sounds.playPull();
        setP2CorrectCount((c) => c + 1);
        setP2Streak((s) => s + 1);
        setP2PullEffect(true);
        setTimeout(() => setP2PullEffect(false), 400);

        setRopePosition((prev) => {
          const nextPos = Math.min(100, prev + config.force);
          checkVictory(nextPos);
          return nextPos;
        });
      } else {
        setP2Streak(0);
      }

      // Next bot pull
      const nextDelay = Math.floor(Math.random() * (config.max - config.min)) + config.min;
      botIntervalRef.current = setTimeout(botTick, nextDelay);
    };

    const initialDelay = Math.floor(Math.random() * (config.max - config.min)) + config.min;
    botIntervalRef.current = setTimeout(botTick, initialDelay);

    return () => {
      if (botIntervalRef.current) clearTimeout(botIntervalRef.current);
    };
  }, [gameState, gameMode, botDiff, checkVictory]);

  // Keyboard controls for 2-Player mode
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // P1 Keys: A (0), S (1), D (2), F (3), Space (Power)
      if (key === 'a') handleP1Answer(0);
      else if (key === 's') handleP1Answer(1);
      else if (key === 'd') handleP1Answer(2);
      else if (key === 'f') handleP1Answer(3);
      else if (key === ' ') activateP1Power();

      // P2 Keys (in 2P mode): H (0), J (1), K (2), L (3), Enter (Power)
      if (gameMode === '2p-local') {
        if (key === 'h') handleP2Answer(0);
        else if (key === 'j') handleP2Answer(1);
        else if (key === 'k') handleP2Answer(2);
        else if (key === 'l') handleP2Answer(3);
        else if (key === 'enter') activateP2Power();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="tug-container">
      {/* Top Bar Header */}
      <div className="tug-nav">
        <button className="tug-btn-back" onClick={onBackToMenu}>
          &larr; Back to Games Hub
        </button>
        <div className="tug-title-badge">
          <span>🚩</span> TARIK TAMBANG MATEMATIKA (KELAS 12 SMA / UTBK)
        </div>
        <div className="tug-score-badge">
          <span>⏱️</span> {timerRemaining}s
        </div>
      </div>

      {/* VIEW: LOBBY */}
      {gameState === 'lobby' && (
        <div className="tug-lobby">
          <div className="tug-lobby-card">
            <div className="tug-lobby-icon">🏆</div>
            <h1 className="tug-lobby-title">Tarik Tambang Matematika (Kelas 12)</h1>
            <p className="tug-lobby-desc">
              Adu cepat menyelesaikan soal <strong>Matematika SMA Kelas 12 & UTBK SNBT</strong> (Kaidah Pencacahan, Matriks, Kalkulus Limit/Turunan/Integral, Vektor, Statistika, Dimensi Tiga) untuk menarik tambang ke arah timmu!
            </p>

            {/* Mode Picker */}
            <div className="tug-mode-selector">
              <button
                className={`tug-mode-btn ${gameMode === 'vs-bot' ? 'active' : ''}`}
                onClick={() => setGameMode('vs-bot')}
              >
                <span className="icon">🤖</span>
                <div>
                  <strong>1P vs AI Bot</strong>
                  <p>Tarik tambang melawan komputer pintar</p>
                </div>
              </button>

              <button
                className={`tug-mode-btn ${gameMode === '2p-local' ? 'active' : ''}`}
                onClick={() => setGameMode('2p-local')}
              >
                <span className="icon">👥</span>
                <div>
                  <strong>2P Duel (1 Keyboard)</strong>
                  <p>P1 (A/S/D/F) vs P2 (H/J/K/L)</p>
                </div>
              </button>
            </div>

            {/* Bot Difficulty (if vs-bot) */}
            {gameMode === 'vs-bot' && (
              <div className="tug-diff-box">
                <label>Pilih Tingkat Kesulitan Bot:</label>
                <div className="tug-diff-buttons">
                  {(['easy', 'medium', 'hard', 'extreme'] as BotDifficulty[]).map((d) => (
                    <button
                      key={d}
                      className={`tug-diff-btn ${botDiff === d ? 'active' : ''} ${d}`}
                      onClick={() => setBotDiff(d)}
                    >
                      {d === 'easy' && '🟢 Santai'}
                      {d === 'medium' && '🟡 Normal'}
                      {d === 'hard' && '🔴 Cepat'}
                      {d === 'extreme' && '🔥 Monster Bot'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="tug-btn-start" onClick={startGame}>
              MULAI PERTANDINGAN 🚩
            </button>
          </div>
        </div>
      )}

      {/* VIEW: COUNTDOWN */}
      {gameState === 'countdown' && (
        <div className="tug-countdown-overlay">
          <div className="tug-countdown-box">
            <div className="tug-countdown-number">{countdown}</div>
            <p>SIAPKAN JARI DAN OTAKMU!</p>
          </div>
        </div>
      )}

      {/* VIEW: PLAYING & ARENA */}
      {(gameState === 'playing' || gameState === 'gameover') && (
        <div className="tug-arena">
          {/* TUG ROPE BATTLEFIELD ANIMATION */}
          <div className="tug-battlefield">
            {/* REAL ANIMATED TUG OF WAR CANVAS ARENA */}
            <div className="tug-canvas-wrapper">
              <canvas ref={canvasRef} width={920} height={230} className="tug-canvas" />
            </div>

            {/* Tension / Distance Bar */}
            <div className="tug-tension-gauge">
              <div className="tension-label left">
                🔵 TIM BIRU (KIRI) {ropePosition < 0 ? `+${Math.abs(Math.round(ropePosition))}% (Menarik ke Kiri)` : ''}
              </div>
              <div className="tension-track">
                <div className="tension-marker-center"></div>
                <div
                  className="tension-fill"
                  style={{
                    left: ropePosition < 0 ? `${50 + ropePosition * 0.45}%` : '50%',
                    width: `${Math.abs(ropePosition) * 0.45}%`,
                    backgroundColor: ropePosition < 0 ? '#00e5ff' : '#ff4757'
                  }}
                ></div>
                <div
                  className="tension-flag-indicator"
                  style={{ left: `calc(${50 + ropePosition * 0.45}% - 12px)` }}
                >
                  🚩
                </div>
              </div>
              <div className="tension-label right">
                🔴 {gameMode === 'vs-bot' ? `BOT (${botDiff.toUpperCase()})` : 'TIM MERAH (KANAN)'}{' '}
                {ropePosition > 0 ? `+${Math.round(ropePosition)}% (Menarik ke Kanan)` : ''}
              </div>
            </div>
          </div>

          {/* PLAYER CONTROLS / QUESTION PANELS */}
          <div className="tug-controls-grid">
            {/* Panel Player 1 (Blue Team) */}
            <div className={`tug-panel panel-left ${p1PowerActive ? 'super-power-glow' : ''}`}>
              <div className="panel-header">
                <div className="panel-title">
                  <span className="badge-team blue">P1 / TIM BIRU</span>
                  {p1Streak >= 3 && <span className="streak-badge">🔥 {p1Streak} Streak!</span>}
                </div>
                <div className="panel-stats">
                  <span>Skor Tarikan: <strong>{p1CorrectCount}</strong></span>
                </div>
              </div>

              {/* Question Box */}
              <div className="tug-q-box">
                <div className="q-label">Hitung Cepat:</div>
                <div className="q-text">{p1Question.question}</div>
              </div>

              {/* Answers Grid */}
              <div className="tug-options-grid">
                {p1Question.options.map((opt, idx) => {
                  const keyLetters = ['A', 'S', 'D', 'F'];
                  const isSelected = p1Selected === idx;
                  const isCorrect = isSelected && idx === p1Question.correctIndex;
                  const isWrong = isSelected && idx !== p1Question.correctIndex;

                  return (
                    <button
                      key={idx}
                      className={`tug-opt-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                      onClick={() => handleP1Answer(idx)}
                      disabled={p1Selected !== null || gameState !== 'playing'}
                    >
                      <span className="opt-key-hint">{keyLetters[idx]}</span>
                      <span className="opt-val">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Super Power Button */}
              {p1Streak >= 3 && (
                <button
                  className={`tug-power-btn ${p1PowerActive ? 'active' : ''}`}
                  onClick={activateP1Power}
                >
                  💥 TEKAN SPACE: SUPER PULL (2.5x FORCE)!
                </button>
              )}
            </div>

            {/* Panel Player 2 (or Bot Status) */}
            <div className={`tug-panel panel-right ${p2PowerActive ? 'super-power-glow' : ''}`}>
              <div className="panel-header">
                <div className="panel-title">
                  <span className="badge-team red">
                    {gameMode === 'vs-bot' ? `BOT [${botDiff.toUpperCase()}]` : 'P2 / TIM MERAH'}
                  </span>
                  {p2Streak >= 3 && <span className="streak-badge">🔥 {p2Streak} Streak!</span>}
                </div>
                <div className="panel-stats">
                  <span>Skor Tarikan: <strong>{p2CorrectCount}</strong></span>
                </div>
              </div>

              {gameMode === '2p-local' ? (
                <>
                  <div className="tug-q-box">
                    <div className="q-label">Hitung Cepat:</div>
                    <div className="q-text">{p2Question.question}</div>
                  </div>

                  <div className="tug-options-grid">
                    {p2Question.options.map((opt, idx) => {
                      const keyLetters = ['H', 'J', 'K', 'L'];
                      const isSelected = p2Selected === idx;
                      const isCorrect = isSelected && idx === p2Question.correctIndex;
                      const isWrong = isSelected && idx !== p2Question.correctIndex;

                      return (
                        <button
                          key={idx}
                          className={`tug-opt-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                          onClick={() => handleP2Answer(idx)}
                          disabled={p2Selected !== null || gameState !== 'playing'}
                        >
                          <span className="opt-key-hint">{keyLetters[idx]}</span>
                          <span className="opt-val">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {p2Streak >= 3 && (
                    <button
                      className={`tug-power-btn ${p2PowerActive ? 'active' : ''}`}
                      onClick={activateP2Power}
                    >
                      💥 TEKAN ENTER: SUPER PULL (2.5x FORCE)!
                    </button>
                  )}
                </>
              ) : (
                /* Bot Status Display */
                <div className="bot-status-view">
                  <div className="bot-avatar">🤖</div>
                  <h3>AI Math Engine Active</h3>
                  <p>Bot menghitung solusi kalkulasi secara real-time dengan akurasi level {botDiff}!</p>
                  <div className="bot-power-indicator">
                    <div className="bot-pulse-ring"></div>
                    <span>Bot sedang menarik tambang...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GAMEOVER MODAL */}
      {gameState === 'gameover' && (
        <div className="tug-gameover-overlay">
          <div className="tug-gameover-card">
            <div className="gameover-trophy">
              {winner === 'Team 1' ? '🏆 🔵' : winner === 'Team 2' ? '🏆 🔴' : '🤝'}
            </div>
            <h2 className="gameover-title">
              {winner === 'Team 1'
                ? 'TIM BIRU MENANG!'
                : winner === 'Team 2'
                ? gameMode === 'vs-bot'
                  ? 'BOT MENANG!'
                  : 'TIM MERAH MENANG!'
                : 'HASIL SERI / DRAW!'}
            </h2>
            <p className="gameover-subtitle">
              Pertandingan sengit telah berakhir! Kekuatan matematika membuktikan siapa penarik tambang tertangguh.
            </p>

            <div className="gameover-stats-grid">
              <div className="stat-item">
                <span className="label">Soal Tim Biru</span>
                <span className="val">{p1CorrectCount} Benar</span>
              </div>
              <div className="stat-item">
                <span className="label">Posisi Akhir</span>
                <span className="val">
                  {ropePosition < 0 ? `Kiri ${Math.abs(Math.round(ropePosition))}%` : `Kanan ${Math.round(ropePosition)}%`}
                </span>
              </div>
              <div className="stat-item">
                <span className="label">Soal Tim Lawan</span>
                <span className="val">{p2CorrectCount} Benar</span>
              </div>
            </div>

            <div className="gameover-actions">
              <button className="btn-replay" onClick={startGame}>
                🔄 Main Lagi
              </button>
              <button className="btn-lobby" onClick={() => setGameState('lobby')}>
                ⚙️ Ganti Mode
              </button>
              <button className="btn-menu" onClick={onBackToMenu}>
                🏠 Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Styles for Tug of War */}
      <style jsx>{`
        .tug-container {
          min-height: calc(100vh - 80px);
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
          color: #fff;
          font-family: inherit;
          padding: 1rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          user-select: none;
          box-sizing: border-box;
        }

        .tug-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 0.8rem 1.5rem;
        }

        .tug-btn-back {
          background: #ffdc00;
          color: #000;
          border: 2px solid #000;
          font-weight: 800;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 3px 3px 0 #000;
          transition: transform 0.1s;
        }
        .tug-btn-back:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
        }

        .tug-title-badge {
          font-size: 1.15rem;
          font-weight: 900;
          letter-spacing: 0.5px;
          color: #82fed6;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tug-score-badge {
          background: #ff4757;
          color: #fff;
          font-weight: 900;
          font-size: 1.1rem;
          padding: 0.4rem 1.2rem;
          border-radius: 30px;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #000;
        }

        /* LOBBY */
        .tug-lobby {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 0;
        }

        .tug-lobby-card {
          background: #ffffff;
          color: #000;
          border: 4px solid #000;
          border-radius: 24px;
          box-shadow: 10px 10px 0px #000;
          max-width: 680px;
          width: 100%;
          padding: 3rem 2.5rem;
          text-align: center;
        }

        .tug-lobby-icon {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
        }

        .tug-lobby-title {
          font-size: 2.3rem;
          font-weight: 900;
          margin-bottom: 0.8rem;
          line-height: 1.2;
        }

        .tug-lobby-desc {
          color: #4b5563;
          font-size: 1.05rem;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .tug-mode-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.8rem;
        }

        .tug-mode-btn {
          border: 3px solid #000;
          border-radius: 14px;
          padding: 1.2rem 1rem;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f3f4f6;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }
        .tug-mode-btn.active {
          background: #82fed6;
          box-shadow: 4px 4px 0 #000;
          transform: translate(-2px, -2px);
        }
        .tug-mode-btn .icon {
          font-size: 2rem;
        }
        .tug-mode-btn strong {
          display: block;
          font-size: 1.05rem;
          color: #000;
        }
        .tug-mode-btn p {
          font-size: 0.8rem;
          color: #4b5563;
          margin-top: 2px;
        }

        .tug-diff-box {
          background: #f9fafb;
          border: 2px dashed #000;
          border-radius: 14px;
          padding: 1.2rem;
          margin-bottom: 2rem;
          text-align: left;
        }
        .tug-diff-box label {
          display: block;
          font-weight: 800;
          font-size: 0.9rem;
          margin-bottom: 0.6rem;
          color: #111;
        }
        .tug-diff-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }
        .tug-diff-btn {
          border: 2px solid #000;
          border-radius: 8px;
          padding: 0.6rem 0.4rem;
          font-weight: 800;
          font-size: 0.85rem;
          background: #fff;
          cursor: pointer;
        }
        .tug-diff-btn.active {
          background: #000;
          color: #fff;
          box-shadow: 2px 2px 0 #000;
        }

        .tug-btn-start {
          width: 100%;
          background: #ffdc00;
          color: #000;
          border: 3.5px solid #000;
          border-radius: 14px;
          padding: 1.1rem;
          font-size: 1.3rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 6px 6px 0 #000;
          transition: transform 0.15s;
        }
        .tug-btn-start:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #000;
        }

        /* COUNTDOWN OVERLAY */
        .tug-countdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .tug-countdown-box {
          text-align: center;
          color: #ffdc00;
        }
        .tug-countdown-number {
          font-size: 8rem;
          font-weight: 900;
          animation: pulseNum 0.9s infinite alternate;
        }
        @keyframes pulseNum {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        /* BATTLEFIELD */
        .tug-arena {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .tug-battlefield {
          background: #1e293b;
          border: 3.5px solid #000;
          border-radius: 20px;
          padding: 1.2rem 1.4rem 1rem;
          box-shadow: 6px 6px 0px #000;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tug-canvas-wrapper {
          position: relative;
          border: 3.5px solid #000;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 4px 4px 0 #000;
          max-width: 920px;
          width: 100%;
          aspect-ratio: 920 / 230;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tug-canvas {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* TENSION GAUGE */
        .tug-tension-gauge {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .tension-track {
          height: 22px;
          background: #0f172a;
          border: 2.5px solid #000;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }
        .tension-marker-center {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #fff;
          z-index: 3;
        }
        .tension-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          transition: all 0.2s;
        }
        .tension-flag-indicator {
          position: absolute;
          top: -3px;
          font-size: 1.1rem;
          z-index: 4;
          transition: left 0.2s;
        }
        .tension-label {
          font-size: 0.85rem;
          font-weight: 800;
        }
        .tension-label.left { color: #00e5ff; }
        .tension-label.right { color: #ff4757; text-align: right; }

        /* CONTROLS & QUESTION PANELS */
        .tug-controls-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .tug-panel {
          background: #ffffff;
          color: #000;
          border: 3.5px solid #000;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 6px 6px 0 #000;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .panel-left { border-top: 8px solid #00e5ff; }
        .panel-right { border-top: 8px solid #ff4757; }

        .super-power-glow {
          box-shadow: 0 0 25px #ffdc00, 6px 6px 0 #000 !important;
          animation: glowPulse 0.8s infinite alternate;
        }
        @keyframes glowPulse {
          0% { border-color: #ffdc00; }
          100% { border-color: #ff4757; }
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .badge-team {
          font-weight: 900;
          font-size: 0.85rem;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          border: 2px solid #000;
        }
        .badge-team.blue { background: #00e5ff; color: #000; }
        .badge-team.red { background: #ff4757; color: #fff; }

        .streak-badge {
          background: #ffdc00;
          border: 2px solid #000;
          font-weight: 800;
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          margin-left: 6px;
          animation: bounce 0.5s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }

        .tug-q-box {
          background: #f8fafc;
          border: 2.5px solid #000;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        .q-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
        }
        .q-text {
          font-size: 2rem;
          font-weight: 900;
          color: #0f172a;
          margin-top: 0.2rem;
        }

        .tug-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
        }

        .tug-opt-btn {
          border: 2.5px solid #000;
          border-radius: 10px;
          padding: 0.9rem;
          background: #ffffff;
          font-size: 1.3rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 3px 3px 0 #000;
          transition: all 0.1s;
        }
        .tug-opt-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
          background: #f1f5f9;
        }
        .tug-opt-btn:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 #000;
        }
        .tug-opt-btn.correct {
          background: #82fed6 !important;
          border-color: #000;
        }
        .tug-opt-btn.wrong {
          background: #ffb8b8 !important;
          border-color: #000;
        }

        .opt-key-hint {
          background: #000;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 900;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .tug-power-btn {
          background: #ffdc00;
          color: #000;
          border: 3px solid #000;
          border-radius: 10px;
          padding: 0.8rem;
          font-weight: 900;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 4px 4px 0 #000;
          animation: pulsePower 0.6s infinite alternate;
        }
        @keyframes pulsePower {
          0% { transform: scale(0.98); }
          100% { transform: scale(1.02); }
        }

        .bot-status-view {
          padding: 2rem 1rem;
          text-align: center;
        }
        .bot-avatar {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }
        .bot-status-view h3 {
          font-size: 1.3rem;
          font-weight: 900;
          margin-bottom: 0.4rem;
        }
        .bot-status-view p {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .bot-power-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fee2e2;
          color: #991b1b;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.85rem;
          border: 1.5px solid #ef4444;
        }
        .bot-pulse-ring {
          width: 10px;
          height: 10px;
          background: #ef4444;
          border-radius: 50%;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* GAMEOVER MODAL */
        .tug-gameover-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 1.5rem;
        }
        .tug-gameover-card {
          background: #fff;
          color: #000;
          border: 4px solid #000;
          border-radius: 24px;
          box-shadow: 12px 12px 0 #000;
          max-width: 520px;
          width: 100%;
          padding: 2.5rem 2rem;
          text-align: center;
          animation: dropIn 0.3s ease-out;
        }
        @keyframes dropIn {
          0% { transform: scale(0.8) translateY(-30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .gameover-trophy {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }
        .gameover-title {
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 0.6rem;
        }
        .gameover-subtitle {
          color: #4b5563;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.8rem;
        }
        .gameover-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.8rem;
          background: #f8fafc;
          border: 2px solid #000;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        .stat-item .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
        }
        .stat-item .val {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0f172a;
        }
        .gameover-actions {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .btn-replay {
          background: #82fed6;
          color: #000;
          border: 3px solid #000;
          border-radius: 10px;
          padding: 0.9rem;
          font-size: 1.1rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 4px 4px 0 #000;
        }
        .btn-lobby {
          background: #ffdc00;
          color: #000;
          border: 3px solid #000;
          border-radius: 10px;
          padding: 0.8rem;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 4px 4px 0 #000;
        }
        .btn-menu {
          background: #f3f4f6;
          color: #000;
          border: 2px solid #000;
          border-radius: 10px;
          padding: 0.7rem;
          font-weight: 800;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
