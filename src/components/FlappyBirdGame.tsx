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
    topicName = 'Pembagian (:)';
    const b = Math.floor(Math.random() * 10) + 2;
    const ans = Math.floor(Math.random() * 12) + 2;
    const a = b * ans;
    correct = ans;
    prompt = `${a} : ${b} = ?`;
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

interface PipeObstacle {
  id: number;
  x: number;
  width: number;
  topPipeHeight: number;
  gapHeight: number;
  bottomPipeY: number;
  passed: boolean;
  hasQuiz: boolean;
  question?: MathQuizQuestion;
  quizTriggered?: boolean;
}

function createPipeObstacle(id: number, x: number, op: MathOperator, forceQuiz?: boolean): PipeObstacle {
  // Undulating height types: 'high' (naik), 'low' (turun), 'mid' (tengah)
  const heightMode = Math.random() < 0.35 ? 'high' : Math.random() < 0.5 ? 'low' : 'mid';
  const gapHeight = Math.floor(Math.random() * 16) + 140; // 140px to 156px gap for smooth dodging
  let topPipeHeight = 140;

  if (heightMode === 'high') {
    topPipeHeight = Math.floor(Math.random() * 35) + 60; // 60px - 95px (high gap, bird flies high)
  } else if (heightMode === 'low') {
    topPipeHeight = Math.floor(Math.random() * 35) + 205; // 205px - 240px (low gap, bird flies low)
  } else {
    topPipeHeight = Math.floor(Math.random() * 40) + 130; // 130px - 170px (mid gap, bird flies through center)
  }

  const bottomPipeY = topPipeHeight + gapHeight;
  const hasQuiz = forceQuiz !== undefined ? forceQuiz : (Math.random() < 0.45);
  const question = hasQuiz ? generateEasyQuizQuestion(op) : undefined;

  return {
    id,
    x,
    width: 82,
    topPipeHeight,
    gapHeight,
    bottomPipeY,
    passed: false,
    hasQuiz,
    question,
    quizTriggered: false
  };
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

export type TimeOfDay = 'pagi' | 'menjelang-sore' | 'sore' | 'menjelang-malam' | 'malam' | 'fajar';

function getTimeLabel(t: TimeOfDay): string {
  switch (t) {
    case 'pagi': return 'PAGI';
    case 'menjelang-sore': return 'SIANG/SORE';
    case 'sore': return 'SENJA';
    case 'menjelang-malam': return 'PETANG';
    case 'malam': return 'MALAM';
    case 'fajar': return 'FAJAR';
    default: return 'PAGI';
  }
}

function getTimeIcon(t: TimeOfDay): string {
  switch (t) {
    case 'pagi': return '🌅';
    case 'menjelang-sore': return '☀️';
    case 'sore': return '🌇';
    case 'menjelang-malam': return '🌆';
    case 'malam': return '🌙';
    case 'fajar': return '🌄';
    default: return '🌅';
  }
}

// Smooth Color Lerp Helper
function lerpColor(c1: string, c2: string, t: number): string {
  const parse = (c: string) => {
    if (c.startsWith('#')) {
      const hex = c.slice(1);
      const num = parseInt(hex.length === 3 ? hex.split('').map(x => x + x).join('') : hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
    const match = c.match(/\d+/g);
    if (match) return [Number(match[0]), Number(match[1]), Number(match[2])];
    return [0, 0, 0];
  };

  const [r1, g1, b1] = parse(c1);
  const [r2, g2, b2] = parse(c2);
  const factor = Math.max(0, Math.min(1, t));

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

// 6 Keyframe Day-Night Cycles (Pagi -> Menjelang Sore -> Sore -> Menjelang Malam -> Malam -> Fajar)
interface SkyKeyframe {
  pos: number;
  top: string;
  mid: string;
  bottom: string;
  sunAlpha: number;
  moonAlpha: number;
  starAlpha: number;
  cityColor: string;
  windowLightColor: string;
  cloudColor: string;
  groundGrass: string;
  groundPath: string;
  timePhase: TimeOfDay;
}

const SKY_KEYFRAMES: SkyKeyframe[] = [
  {
    pos: 0.05, // 🌅 PAGI
    top: '#0284c7',
    mid: '#38bdf8',
    bottom: '#bae6fd',
    sunAlpha: 1.0,
    moonAlpha: 0.0,
    starAlpha: 0.0,
    cityColor: '#6ec578',
    windowLightColor: '#4ea658',
    cloudColor: 'rgba(255, 255, 255, 0.92)',
    groundGrass: '#73bf2e',
    groundPath: '#ded895',
    timePhase: 'pagi'
  },
  {
    pos: 0.28, // ☀️ MENJELANG SORE (SIANG CERAH)
    top: '#1d4ed8',
    mid: '#f59e0b',
    bottom: '#fef08a',
    sunAlpha: 1.0,
    moonAlpha: 0.0,
    starAlpha: 0.0,
    cityColor: '#059669',
    windowLightColor: '#fde047',
    cloudColor: 'rgba(254, 215, 170, 0.9)',
    groundGrass: '#65a30d',
    groundPath: '#d6c67a',
    timePhase: 'menjelang-sore'
  },
  {
    pos: 0.48, // 🌇 SORE / SENJA (CRIMSON SUNSET)
    top: '#4c0519',
    mid: '#e11d48',
    bottom: '#fed7aa',
    sunAlpha: 0.9,
    moonAlpha: 0.25,
    starAlpha: 0.15,
    cityColor: '#4c1d95',
    windowLightColor: '#f43f5e',
    cloudColor: 'rgba(254, 205, 211, 0.85)',
    groundGrass: '#4d7c0f',
    groundPath: '#ca8a04',
    timePhase: 'sore'
  },
  {
    pos: 0.68, // 🌆 MENJELANG MALAM (PETANG / DUSK)
    top: '#1e1b4b',
    mid: '#4338ca',
    bottom: '#831843',
    sunAlpha: 0.0,
    moonAlpha: 0.85,
    starAlpha: 0.7,
    cityColor: '#1e1b4b',
    windowLightColor: '#fef08a',
    cloudColor: 'rgba(199, 210, 254, 0.55)',
    groundGrass: '#15803d',
    groundPath: '#64748b',
    timePhase: 'menjelang-malam'
  },
  {
    pos: 0.82, // 🌙 MALAM (DEEP STARRY MIDNIGHT)
    top: '#020617',
    mid: '#0f172a',
    bottom: '#1e1b4b',
    sunAlpha: 0.0,
    moonAlpha: 1.0,
    starAlpha: 1.0,
    cityColor: '#0f172a',
    windowLightColor: '#fef08a',
    cloudColor: 'rgba(148, 163, 184, 0.35)',
    groundGrass: '#0f766e',
    groundPath: '#334155',
    timePhase: 'malam'
  },
  {
    pos: 0.95, // 🌄 MENJELANG PAGI (FAJAR / DAWN)
    top: '#1e1b4b',
    mid: '#0284c7',
    bottom: '#fed7aa',
    sunAlpha: 0.6,
    moonAlpha: 0.3,
    starAlpha: 0.25,
    cityColor: '#334155',
    windowLightColor: '#fbbf24',
    cloudColor: 'rgba(254, 215, 170, 0.75)',
    groundGrass: '#4d7c0f',
    groundPath: '#bfae68',
    timePhase: 'fajar'
  }
];

function getAtmosphere(progress: number) {
  const n = SKY_KEYFRAMES.length;
  let idx1 = n - 1;
  let idx2 = 0;

  for (let i = 0; i < n; i++) {
    const nextIdx = (i + 1) % n;
    const p1 = SKY_KEYFRAMES[i].pos;
    const p2 = SKY_KEYFRAMES[nextIdx].pos;

    if (p1 <= p2) {
      if (progress >= p1 && progress <= p2) {
        idx1 = i;
        idx2 = nextIdx;
        break;
      }
    } else {
      if (progress >= p1 || progress <= p2) {
        idx1 = i;
        idx2 = nextIdx;
        break;
      }
    }
  }

  const k1 = SKY_KEYFRAMES[idx1];
  const k2 = SKY_KEYFRAMES[idx2];

  let range = k2.pos - k1.pos;
  let currentOffset = progress - k1.pos;
  if (range <= 0) range += 1.0;
  if (currentOffset < 0) currentOffset += 1.0;

  const t = Math.max(0, Math.min(1, currentOffset / range));

  return {
    top: lerpColor(k1.top, k2.top, t),
    mid: lerpColor(k1.mid, k2.mid, t),
    bottom: lerpColor(k1.bottom, k2.bottom, t),
    sunAlpha: k1.sunAlpha + (k2.sunAlpha - k1.sunAlpha) * t,
    moonAlpha: k1.moonAlpha + (k2.moonAlpha - k1.moonAlpha) * t,
    starAlpha: k1.starAlpha + (k2.starAlpha - k1.starAlpha) * t,
    cityColor: lerpColor(k1.cityColor, k2.cityColor, t),
    windowLightColor: lerpColor(k1.windowLightColor, k2.windowLightColor, t),
    cloudColor: k2.cloudColor,
    groundGrass: lerpColor(k1.groundGrass, k2.groundGrass, t),
    groundPath: lerpColor(k1.groundPath, k2.groundPath, t),
    timePhase: t < 0.5 ? k1.timePhase : k2.timePhase
  };
}

// ============================================================================
// RETRO SUPER MARIO END-LEVEL FLAGPOLE & CASTLE RENDERER
// ============================================================================
function drawClassicFlagpoleAndCastle(
  ctx: CanvasRenderingContext2D,
  flagpoleX: number,
  flagY: number,
  castleX: number,
  groundY: number
) {
  ctx.save();

  // --- 1. CLASSIC RETRO BRICK CASTLE ---
  const cX = castleX;
  const cY = groundY;

  // Castle main body
  ctx.fillStyle = '#b45309'; // Brick orange-brown
  ctx.fillRect(cX, cY - 145, 160, 145);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(cX, cY - 145, 160, 145);

  // Brick horizontal & vertical mortar lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.lineWidth = 2;
  for (let by = cY - 130; by < cY; by += 20) {
    ctx.beginPath();
    ctx.moveTo(cX, by);
    ctx.lineTo(cX + 160, by);
    ctx.stroke();
  }

  // Castle Central Tower
  ctx.fillStyle = '#b45309';
  ctx.fillRect(cX + 48, cY - 195, 64, 52);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(cX + 48, cY - 195, 64, 52);

  // Crenellations / Battlements
  const bW = 20;
  const bH = 18;
  ctx.fillStyle = '#d97706';
  // Left wall battlements
  ctx.fillRect(cX, cY - 163, bW, bH);
  ctx.strokeRect(cX, cY - 163, bW, bH);
  ctx.fillRect(cX + 25, cY - 163, bW, bH);
  ctx.strokeRect(cX + 25, cY - 163, bW, bH);
  // Center tower battlements
  ctx.fillRect(cX + 48, cY - 213, bW, bH);
  ctx.strokeRect(cX + 48, cY - 213, bW, bH);
  ctx.fillRect(cX + 92, cY - 213, bW, bH);
  ctx.strokeRect(cX + 92, cY - 213, bW, bH);
  // Right wall battlements
  ctx.fillRect(cX + 115, cY - 163, bW, bH);
  ctx.strokeRect(cX + 115, cY - 163, bW, bH);
  ctx.fillRect(cX + 140, cY - 163, bW, bH);
  ctx.strokeRect(cX + 140, cY - 163, bW, bH);

  // Castle Door (Arched black doorway)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(cX + 60, cY - 70, 40, 70, [20, 20, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Little Castle Top Pennant Flag
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cX + 78, cY - 232, 4, 20);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(cX + 82, cY - 232);
  ctx.lineTo(cX + 104, cY - 222);
  ctx.lineTo(cX + 82, cY - 212);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // --- 2. FLAGPOLE BASE (BRICK STAIRS) ---
  const bX = flagpoleX;
  ctx.fillStyle = '#92400e';
  // Step 1
  ctx.fillRect(bX - 24, cY - 16, 56, 16);
  ctx.strokeRect(bX - 24, cY - 16, 56, 16);
  // Step 2
  ctx.fillRect(bX - 16, cY - 32, 40, 16);
  ctx.strokeRect(bX - 16, cY - 32, 40, 16);
  // Step 3 (Top pedestal block)
  ctx.fillStyle = '#b45309';
  ctx.fillRect(bX - 8, cY - 48, 24, 16);
  ctx.strokeRect(bX - 8, cY - 48, 24, 16);

  // --- 3. THE FLAGPOLE & GOLDEN SPHERE ---
  const poleTopY = cY - 265;
  const poleBottomY = cY - 48;

  // Green metallic pole
  const poleGrad = ctx.createLinearGradient(bX + 2, 0, bX + 6, 0);
  poleGrad.addColorStop(0, '#22c55e');
  poleGrad.addColorStop(0.5, '#86efac');
  poleGrad.addColorStop(1, '#15803d');
  ctx.fillStyle = poleGrad;
  ctx.fillRect(bX + 2, poleTopY, 5, poleBottomY - poleTopY);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bX + 2, poleTopY, 5, poleBottomY - poleTopY);

  // Golden Orb on Pole Top
  const orbGrad = ctx.createRadialGradient(bX + 4.5, poleTopY - 2, 2, bX + 4.5, poleTopY, 9);
  orbGrad.addColorStop(0, '#fef08a');
  orbGrad.addColorStop(0.6, '#eab308');
  orbGrad.addColorStop(1, '#854d0e');
  ctx.fillStyle = orbGrad;
  ctx.beginPath();
  ctx.arc(bX + 4.5, poleTopY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // --- 4. THE GOAL FLAG (SLIDING DOWN) ---
  const flagCurrentY = Math.min(poleBottomY - 26, Math.max(poleTopY + 8, flagY));
  ctx.save();
  ctx.translate(bX + 7, flagCurrentY);
  // White Flag fabric
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(34, 13);
  ctx.lineTo(0, 26);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Red Mario emblem on flag
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(10, 13, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 7px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText('M', 10, 15.5);
  ctx.restore();

  ctx.restore();
}

// ============================================================================
// RETRO SUPER MARIO DYNAMIC CHARACTER RENDERER
// ============================================================================
function drawRetroMario(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  state: 'run' | 'jump' | 'catch' | 'victory',
  nowTime: number,
  _caughtBird: boolean
) {
  ctx.save();
  ctx.translate(x, y);

  if (state === 'run') {
    // RUNNING ANIMATION (FACING LEFT TOWARDS THE BIRD)
    const runCycle = Math.sin(nowTime * 0.02);
    const legOffset = runCycle * 10;
    const armOffset = -runCycle * 8;

    // Running Dust clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.arc(22, 38, 5 + Math.abs(runCycle) * 3, 0, Math.PI * 2);
    ctx.arc(32, 40, 3 + Math.abs(runCycle) * 2, 0, Math.PI * 2);
    ctx.fill();

    // Back Shoe (Brown)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(12 - legOffset, 42, 10, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Overalls Pants (Blue)
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(-12, 18, 26, 20);
    ctx.strokeRect(-12, 18, 26, 20);

    // Front Shoe (Brown)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(-10 + legOffset, 42, 10, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Red Shirt Body
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-16, 4, 34, 18, 5);
    ctx.fill();
    ctx.stroke();

    // Blue Overalls Straps & Yellow Buttons
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(-12, 10, 8, 14);
    ctx.fillRect(4, 10, 8, 14);
    ctx.strokeRect(-12, 10, 8, 14);
    ctx.strokeRect(4, 10, 8, 14);

    // Yellow Buttons
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(-8, 16, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 16, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pumping White Gloves (Arms in sprint motion)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-18 - armOffset, 12, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(18 + armOffset, 12, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    drawMarioHead(ctx, -2, -12, 'forward');

  } else if (state === 'jump') {
    // SUPER MARIO LEAP JUMP POSE (CLASSIC JUMP FIST UP 👊)
    // Speedlines / Jump Arc energy
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(25, 30);
    ctx.lineTo(40, 48);
    ctx.moveTo(15, 35);
    ctx.lineTo(25, 52);
    ctx.stroke();

    // Bent Shoes in air
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(-8, 30, 9, 6, -0.3, 0, Math.PI * 2);
    ctx.ellipse(12, 34, 9, 6, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Blue Overalls Body
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.roundRect(-14, 12, 28, 20, 6);
    ctx.fill();
    ctx.stroke();

    // Red Shirt
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-16, 0, 32, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Yellow Buttons
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(-6, 16, 2.5, 0, Math.PI * 2);
    ctx.arc(6, 16, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Super Jump Raised Left Fist Punching Sky! 👊
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-24, -20, 10, 24, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-19, -24, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Right Hand Back
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 14, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    drawMarioHead(ctx, 0, -8, 'jump');

  } else if (state === 'catch') {
    // CATCHING POSE (BOTH HANDS FIRMLY HOLDING BIRD IN AIR!)
    // Impact Shockwave
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.stroke();

    // Shoes
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(-10, 38, 9, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(10, 38, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Overalls & Shirt
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.roundRect(-14, 14, 28, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-16, 2, 32, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Yellow Buttons
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(-6, 18, 2.5, 0, Math.PI * 2);
    ctx.arc(6, 18, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Both Outstretched Catching Arms & White Gloves
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-30, 2, 22, 10, 4);
    ctx.roundRect(-30, 14, 22, 10, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-26, 4, 8, 0, Math.PI * 2);
    ctx.arc(-26, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    drawMarioHead(ctx, 4, -8, 'happy');

    // Comic Catch Impact Text
    ctx.fillStyle = '#facc15';
    ctx.font = '900 16px system-ui';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeText('💥 GOTCHA!', -30, -32);
    ctx.fillText('💥 GOTCHA!', -30, -32);

  } else if (state === 'victory') {
    // VICTORY POSE (PEACE SIGN ✌️, CELEBRATION, HOLDING BIRD)
    const sparkle = (Math.sin(nowTime * 0.01) + 1) * 0.5;

    ctx.fillStyle = '#facc15';
    ctx.font = '16px system-ui';
    ctx.fillText('✨', -28, -36 + sparkle * 4);
    ctx.fillText('⭐', 28, -40 - sparkle * 4);

    // Shoes firmly on ground
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(-12, 40, 11, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(12, 40, 11, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Overalls & Shirt
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.roundRect(-14, 14, 28, 26, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-16, 4, 32, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Yellow Buttons
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(-6, 18, 2.5, 0, Math.PI * 2);
    ctx.arc(6, 18, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Left Arm Holding Bird firmly
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(-24, 10, 14, 10, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-22, 14, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Right Arm Raised High with V-Sign / Peace Sign ✌️
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(14, -14, 10, 20, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(19, -18, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // V-Sign Fingers
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, -28, 3, 10);
    ctx.fillRect(21, -28, 3, 10);
    ctx.strokeRect(16, -28, 3, 10);
    ctx.strokeRect(21, -28, 3, 10);

    drawMarioHead(ctx, 0, -8, 'victory');

    // Victory Speech Banner
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-125, -78, 250, 36, 10);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pointster
    ctx.beginPath();
    ctx.moveTo(-5, -42);
    ctx.lineTo(0, -32);
    ctx.lineTo(10, -42);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = '900 11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('🍄 MAMMA MIA! LEVEL 25 CLEAR! 🚩', 0, -62);
    ctx.font = '700 9px system-ui';
    ctx.fillText('Burung tertangkap! Menghitung Score Akhir...', 0, -48);
  }

  ctx.restore();
}

function drawMarioHead(
  ctx: CanvasRenderingContext2D,
  hx: number,
  hy: number,
  _mood: 'forward' | 'jump' | 'happy' | 'victory'
) {
  ctx.save();
  ctx.translate(hx, hy);

  // Face (Skin tone)
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Ear
  ctx.beginPath();
  ctx.arc(10, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Big Mario Nose (facing left)
  ctx.beginPath();
  ctx.arc(-10, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Black Bushy Mustache
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(-7, 4, 9, 4, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Eyes (Blue & Black)
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(-4, -4, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(-5, -4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Hair (Brown sideburns/back)
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.arc(10, -5, 5, 0, Math.PI * 2);
  ctx.fill();

  // Red Mario Cap
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.ellipse(0, -10, 16, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Cap Visor (Pointing left)
  ctx.beginPath();
  ctx.roundRect(-16, -11, 16, 6, 3);
  ctx.fill();
  ctx.stroke();

  // White "M" Emblem Circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-1, -12, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 8px Arial';
  ctx.fillStyle = '#dc2626';
  ctx.textAlign = 'center';
  ctx.fillText('M', -1, -9.5);

  ctx.restore();
}

export default function FlappyBirdGame({ onBackToMenu, onAddScore }: FlappyBirdGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Selected Math Operator (Default to mixed +, -, ×, ÷)
  const [selectedOp] = useState<MathOperator>('all');

  // Game UI States
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'boss_ending'>('idle');
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

  // Day 1 to 25 and Time of Day (Pagi, Sore, Malam)
  const [day, setDay] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('pagi');

  // Detailed Stats Tracker
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizPointsEarned, setQuizPointsEarned] = useState(0);
  const [coinPointsEarned, setCoinPointsEarned] = useState(0);

  // Lives supported with half-hearts (e.g. 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0)
  const [lives, setLives] = useState<number>(3);
  const [combo, setCombo] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);

  // Floating notifications
  const [floatText, setFloatText] = useState<{ text: string; id: number } | null>(null);

  // Default pipe gap opening height
  const DEFAULT_GAP_HEIGHT = 150;

  // Internal Game Engine Refs for 60fps loop
  const isAnsweringRef = useRef(false);
  const engineRef = useRef({
    birdX: 140,
    birdY: 235,
    birdVelocity: 0,
    gravity: 0.36,
    jumpStrength: -7.2,
    birdRadius: 18,
    birdRotation: 0,
    invincibleFrames: 0,
    pipes: [] as PipeObstacle[],
    pipesClearedCount: 0,
    nextPipeId: 1,
    items: [] as PickupItem[],
    gateSpeed: 2.8,
    spawnTimer: 0,
    scoreCount: 0,
    coinsCount: 0,
    livesCount: 3.0,
    currentDay: 1,
    cycleProgress: 0.05,
    timeOfDay: 'pagi' as TimeOfDay,
    correctAnswersCount: 0,
    quizPointsEarned: 0,
    coinPointsEarned: 0,
    isBossDay25: false,
    marioBossState: {
      active: false,
      state: 'run' as 'run' | 'jump' | 'catch' | 'victory',
      timer: 0,
      flagpoleX: 740,
      flagY: 120,
      castleX: 860,
      marioX: 680,
      marioY: 420,
      marioVx: -3.2,
      marioVy: 0,
      caughtBird: false,
      speech: '',
      triggeredEnd: false,
      fireworks: [] as { x: number; y: number; vx: number; vy: number; color: string; life: number; size: number }[]
    },
    op: 'all' as MathOperator,
    timeRemaining: 15.0,
    comboCount: 0,
    isPlaying: false,
    isPausedForQuiz: false,
    cloudOffset: 0,
    treeOffset: 0,
    stars: Array.from({ length: 35 }, () => ({
      x: Math.random() * 840,
      y: Math.random() * 260,
      size: Math.random() * 2 + 1,
      blinkPhase: Math.random() * Math.PI * 2
    })),
    particles: [] as { x: number; y: number; vx: number; vy: number; color: string; life: number; size: number }[]
  });

  const triggerJump = useCallback(() => {
    const eng = engineRef.current;
    if (!eng.isPlaying || eng.isPausedForQuiz || activeQuiz || isAnsweringRef.current || eng.marioBossState.triggeredEnd) return;
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
  }, [activeQuiz]);

  const handleGameOver = useCallback((finalScore: number) => {
    isAnsweringRef.current = false;
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

  // Day 25 Mario Final Boss Ending Sequence
  const triggerMarioEnding = useCallback(() => {
    const eng = engineRef.current;
    eng.isPlaying = false;
    eng.isPausedForQuiz = false;
    setActiveQuiz(null);
    sounds.playHit();

    // Dramatic confetti explosion
    for (let p = 0; p < 45; p++) {
      eng.particles.push({
        x: eng.birdX + 20,
        y: eng.birdY,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        color: ['#ff4757', '#ffd32a', '#2ed573', '#1e90ff', '#ffffff'][Math.floor(Math.random() * 5)],
        life: 60,
        size: Math.random() * 6 + 3
      });
    }

    setTimeout(() => {
      setGameState('boss_ending');
      if (onAddScore) onAddScore(eng.scoreCount + 2500);
      setHighScore((prev) => {
        const nextHigh = Math.max(prev, eng.scoreCount + 2500);
        if (typeof window !== 'undefined') {
          localStorage.setItem('math_flappy_highscore_v3', nextHigh.toString());
        }
        return nextHigh;
      });
    }, 1800);
  }, [onAddScore]);

  const startGame = useCallback(() => {
    isAnsweringRef.current = false;
    const p1 = createPipeObstacle(1, 480, selectedOp, false);
    const p2 = createPipeObstacle(2, 740, selectedOp, true);
    const p3 = createPipeObstacle(3, 1000, selectedOp, false);

    const initialCoins: PickupItem[] = [
      { id: 1, x: 330, y: 220, type: 'coin', radius: 14, collected: false, floatAngle: 0 },
      { id: 2, x: 610, y: (p1.topPipeHeight + p1.bottomPipeY) / 2, type: 'coin', radius: 14, collected: false, floatAngle: 1.5 },
      { id: 3, x: 870, y: (p2.topPipeHeight + p2.bottomPipeY) / 2, type: 'coin', radius: 14, collected: false, floatAngle: 3.0 },
    ];

    engineRef.current = {
      birdX: 140,
      birdY: 235,
      birdVelocity: 0,
      gravity: 0.36,
      jumpStrength: -7.2,
      birdRadius: 18,
      birdRotation: 0,
      invincibleFrames: 0,
      pipes: [p1, p2, p3],
      pipesClearedCount: 0,
      nextPipeId: 4,
      items: initialCoins,
      gateSpeed: 2.8,
      spawnTimer: 0,
      scoreCount: 0,
      coinsCount: 0,
      livesCount: 3.0,
      currentDay: 1,
      cycleProgress: 0.05,
      timeOfDay: 'pagi',
      correctAnswersCount: 0,
      quizPointsEarned: 0,
      coinPointsEarned: 0,
      isBossDay25: false,
      marioBossState: {
        active: false,
        state: 'run' as 'run' | 'jump' | 'catch' | 'victory',
        timer: 0,
        flagpoleX: 740,
        flagY: 120,
        castleX: 860,
        marioX: 680,
        marioY: 420,
        marioVx: -3.2,
        marioVy: 0,
        caughtBird: false,
        speech: '',
        triggeredEnd: false,
        fireworks: []
      },
      op: selectedOp,
      timeRemaining: 15.0,
      comboCount: 0,
      isPlaying: true,
      isPausedForQuiz: false,
      cloudOffset: 0,
      treeOffset: 0,
      stars: Array.from({ length: 35 }, () => ({
        x: Math.random() * 840,
        y: Math.random() * 260,
        size: Math.random() * 2 + 1,
        blinkPhase: Math.random() * Math.PI * 2
      })),
      particles: []
    };

    setScore(0);
    setCoins(0);
    setLives(3.0);
    setCombo(0);
    setDay(1);
    setTimeOfDay('pagi');
    setCorrectAnswersCount(0);
    setQuizPointsEarned(0);
    setCoinPointsEarned(0);
    setTimerSeconds(15);
    setActiveQuiz(null);
    setSelectedAnswerIdx(null);
    setGameState('playing');
  }, [selectedOp]);

  // Player answers the 4-choice quiz modal
  const handleAnswerQuiz = useCallback((chosenIdx: number) => {
    const eng = engineRef.current;
    if (isAnsweringRef.current || !eng.isPlaying || !eng.isPausedForQuiz || !activeQuiz) return;
    isAnsweringRef.current = true;

    setSelectedAnswerIdx(chosenIdx);
    const isCorrect = chosenIdx === activeQuiz.correctIndex;

    if (isCorrect) {
      sounds.playScore();
      const earned = 100 + eng.comboCount * 25;
      eng.scoreCount += earned;
      eng.correctAnswersCount += 1;
      eng.quizPointsEarned += earned;
      eng.comboCount += 1;
      setScore(eng.scoreCount);
      setCorrectAnswersCount(eng.correctAnswersCount);
      setQuizPointsEarned(eng.quizPointsEarned);
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
      eng.invincibleFrames = 90; // Generous immunity on mistake
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

    // Resume game flight forward with immunity protection & advance Day count!
    setTimeout(() => {
      eng.isPausedForQuiz = false;
      const activePipe = eng.pipes.find(p => p.quizTriggered && !p.passed);
      if (activePipe) {
        activePipe.passed = true;
        eng.pipesClearedCount += 1;
        const nextDay = Math.min(25, Math.floor(eng.pipesClearedCount / 2) + 1);
        if (nextDay !== eng.currentDay) {
          eng.currentDay = nextDay;
          setDay(eng.currentDay);
          setFloatText({ text: `🌅 DAY ${eng.currentDay}/25!`, id: Date.now() });
        }
      }
      eng.invincibleFrames = 90; // Immunity against accidental post-answer double hits
      eng.birdVelocity = -3;
      setActiveQuiz(null);
      setSelectedAnswerIdx(null);
      isAnsweringRef.current = false;
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
        } else if (gameState === 'playing' && !activeQuiz && !engineRef.current.isPausedForQuiz && !isAnsweringRef.current) {
          triggerJump();
        }
      } else if (gameState === 'playing' && activeQuiz && !isAnsweringRef.current) {
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

      // 1. DYNAMIC CONTINUOUS JOURNEY CYCLE (PAGI -> MENJELANG SORE -> SORE -> MENJELANG MALAM -> MALAM -> FAJAR)
      if (eng.isPlaying && !eng.isPausedForQuiz) {
        eng.cycleProgress = (eng.cycleProgress + deltaSec * 0.018) % 1.0;
      }

      const atm = getAtmosphere(eng.cycleProgress);
      if (eng.timeOfDay !== atm.timePhase) {
        eng.timeOfDay = atm.timePhase;
        setTimeOfDay(atm.timePhase);
      }

      // Draw Smooth Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, atm.top);
      skyGrad.addColorStop(0.55, atm.mid);
      skyGrad.addColorStop(1, atm.bottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Twinkling Night Stars (Fade in at Dusk, Night, & Dawn)
      if (atm.starAlpha > 0.02) {
        ctx.save();
        ctx.fillStyle = '#ffffff';
        eng.stars.forEach((s) => {
          const blink = (Math.sin(nowTime * 0.005 + s.blinkPhase) + 1) * 0.5;
          ctx.globalAlpha = atm.starAlpha * (0.35 + blink * 0.65);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // Dynamic Orbital Sun ☀️ (Rises at Dawn, peaks at Midday, descends at Sunset)
      if (atm.sunAlpha > 0.02) {
        ctx.save();
        ctx.globalAlpha = atm.sunAlpha;

        const sunAngle = (eng.cycleProgress + 0.08) * Math.PI * 2;
        const sunX = width * 0.15 + (Math.cos(sunAngle - Math.PI) * 0.5 + 0.5) * (width * 0.72);
        const sunY = 65 + Math.abs(Math.sin(sunAngle)) * 130;

        const isSunset = eng.cycleProgress > 0.35 && eng.cycleProgress < 0.65;
        const haloColor1 = isSunset ? 'rgba(251, 146, 60, 0.65)' : 'rgba(255, 245, 180, 0.6)';
        const haloColor2 = isSunset ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 230, 140, 0.2)';

        const sunHalo = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 80);
        sunHalo.addColorStop(0, haloColor1);
        sunHalo.addColorStop(0.5, haloColor2);
        sunHalo.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sunHalo;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 80, 0, Math.PI * 2);
        ctx.fill();

        const sunCore = ctx.createRadialGradient(sunX - 6, sunY - 6, 2, sunX, sunY, 30);
        if (isSunset) {
          sunCore.addColorStop(0, '#ffedd5');
          sunCore.addColorStop(0.4, '#fb923c');
          sunCore.addColorStop(1, '#e11d48');
        } else {
          sunCore.addColorStop(0, '#fffbe6');
          sunCore.addColorStop(0.55, '#ffd54f');
          sunCore.addColorStop(1, '#f59e0b');
        }
        ctx.fillStyle = sunCore;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Dynamic Orbital Crescent Moon 🌙 (Rises at Sunset/Dusk, peaks at Midnight, sets at Dawn)
      if (atm.moonAlpha > 0.02) {
        ctx.save();
        ctx.globalAlpha = atm.moonAlpha;

        const moonAngle = (eng.cycleProgress - 0.42) * Math.PI * 2;
        const moonX = width * 0.85 - (Math.cos(moonAngle - Math.PI) * 0.5 + 0.5) * (width * 0.68);
        const moonY = 65 + Math.abs(Math.sin(moonAngle)) * 130;

        const moonHalo = ctx.createRadialGradient(moonX, moonY, 15, moonX, moonY, 70);
        moonHalo.addColorStop(0, 'rgba(199, 210, 254, 0.5)');
        moonHalo.addColorStop(0.5, 'rgba(129, 140, 248, 0.18)');
        moonHalo.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = moonHalo;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 70, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#e0e7ff';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = atm.top;
        ctx.beginPath();
        ctx.arc(moonX - 8, moonY - 4, 23, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Layer 1: Drifting Clouds
      if (!eng.isPausedForQuiz) {
        eng.cloudOffset = (eng.cloudOffset + 0.35) % (width + 300);
      }
      ctx.fillStyle = atm.cloudColor;
      for (let i = 0; i < 4; i++) {
        const cx = (i * 240 - eng.cloudOffset + width * 3) % (width + 240) - 80;
        const cy = 95 + (i % 2) * 25;
        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.arc(cx + 22, cy - 10, 36, 0, Math.PI * 2);
        ctx.arc(cx + 52, cy - 4, 30, 0, Math.PI * 2);
        ctx.arc(cx + 74, cy + 2, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(cx - 8, cy + 6, 92, 18, 9);
        ctx.fill();
      }

      // Distant City Skyline with Night Windows
      if (!eng.isPausedForQuiz) {
        eng.treeOffset = (eng.treeOffset + 0.8) % 360;
      }

      ctx.fillStyle = atm.cityColor;
      for (let bx = -60 - (eng.treeOffset * 0.4); bx < width + 80; bx += 70) {
        const bH = 50 + Math.abs(Math.sin(bx * 0.05)) * 45;
        ctx.fillRect(bx, height - 52 - bH, 50, bH);
        
        ctx.fillStyle = atm.windowLightColor;
        for (let wy = height - 52 - bH + 8; wy < height - 60; wy += 14) {
          ctx.fillRect(bx + 8, wy, 8, 8);
          ctx.fillRect(bx + 22, wy, 8, 8);
          ctx.fillRect(bx + 36, wy, 8, 8);
        }
        ctx.fillStyle = atm.cityColor;
      }

      // Smooth Rolling Green Hills
      ctx.fillStyle = atm.groundGrass;
      for (let hx = -60 - (eng.treeOffset * 0.8); hx < width + 80; hx += 80) {
        ctx.beginPath();
        ctx.arc(hx + 40, height - 52, 45, 0, Math.PI, true);
        ctx.fill();
      }

      // ==========================================
      // CLASSIC SCROLLING GROUND FLOOR
      // ==========================================
      const GROUND_Y = height - 52;
      const groundScroll = !eng.isPausedForQuiz ? (nowTime * 0.12) % 24 : 0;

      ctx.fillStyle = atm.groundPath;
      ctx.fillRect(0, GROUND_Y, width, 52);

      ctx.strokeStyle = atm.cityColor;
      ctx.lineWidth = 2.5;
      for (let sx = -30 - groundScroll; sx < width + 40; sx += 18) {
        ctx.beginPath();
        ctx.moveTo(sx, GROUND_Y + 14);
        ctx.lineTo(sx - 16, height);
        ctx.stroke();
      }

      ctx.fillStyle = atm.groundGrass;
      ctx.fillRect(0, GROUND_Y, width, 14);
      ctx.fillStyle = atm.cityColor;
      ctx.fillRect(0, GROUND_Y + 11, width, 3);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(width, GROUND_Y);
      ctx.stroke();

      // ==========================================
      // 2. PHYSICS, SPAWNING, COLLISION & DAY 25 BOSS
      // ==========================================
      if (eng.isPlaying) {
        if (eng.isPausedForQuiz) {
          eng.timeRemaining -= deltaSec;
          const currentSecInt = Math.max(0, Math.ceil(eng.timeRemaining));
          setTimerSeconds(currentSecInt);

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
              const activePipe = eng.pipes.find(p => p.quizTriggered && !p.passed);
              if (activePipe) activePipe.passed = true;
              setActiveQuiz(null);
            }
          }
        } else {
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
            eng.birdVelocity = -6.5;

            for (let s = 0; s < 8; s++) {
              eng.particles.push({
                x: eng.birdX + (Math.random() - 0.5) * 18,
                y: GROUND_Y,
                vx: (Math.random() - 0.5) * 5,
                vy: -Math.random() * 4 - 1,
                color: '#ded895',
                life: 16,
                size: Math.random() * 3 + 2
              });
            }

            if (eng.invincibleFrames <= 0) {
              sounds.playHit();
              eng.livesCount = Math.max(0, eng.livesCount - 0.5);
              eng.invincibleFrames = 80;
              eng.comboCount = 0;
              setLives(eng.livesCount);
              setCombo(0);
              setFloatText({ text: '💥 Menabrak Tanah! -½ ❤️', id: Date.now() });

              if (eng.livesCount <= 0) {
                handleGameOver(eng.scoreCount);
              }
            }
          }

          // Items Update & Frequent Coin Spawning
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
                eng.coinPointsEarned += 50;
                eng.scoreCount += 50;
                setCoins(eng.coinsCount);
                setCoinPointsEarned(eng.coinPointsEarned);
                setScore(eng.scoreCount);
                setFloatText({ text: '+50 KOIN! 🪙', id: Date.now() });

                for (let cp = 0; cp < 8; cp++) {
                  eng.particles.push({
                    x: item.x,
                    y: bobY,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    color: '#facc15',
                    life: 18,
                    size: 4
                  });
                }
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

          // DAY 25 MARIO FINAL BOSS CUTSCENE LOGIC
          if (eng.currentDay >= 25 && eng.marioBossState.active) {
            const mb = eng.marioBossState;
            mb.timer += deltaSec;

            // Scroll Flagpole and Castle into the scene
            if (mb.flagpoleX > 540) {
              mb.flagpoleX -= eng.gateSpeed;
              mb.castleX -= eng.gateSpeed;
              mb.marioX -= eng.gateSpeed;
            }

            // Phase 1: Mario Running towards the bird
            if (mb.state === 'run') {
              mb.marioX += mb.marioVx;
              if (mb.marioX <= eng.birdX + 150) {
                mb.state = 'jump';
                mb.marioVy = -8.5;
                sounds.playFlap();
              }
            } else if (mb.state === 'jump') {
              mb.marioX -= 2.2;
              mb.marioVy += 0.36;
              mb.marioY += mb.marioVy;

              const dist = Math.hypot(mb.marioX - eng.birdX, mb.marioY - eng.birdY);
              if (dist < 46 || mb.marioY >= GROUND_Y - 48) {
                mb.state = 'catch';
                mb.caughtBird = true;
                sounds.playHit();
                sounds.playCoin();
                mb.speech = "💥 GOTCHA! MAMMA MIA!";

                for (let s = 0; s < 35; s++) {
                  eng.particles.push({
                    x: eng.birdX,
                    y: eng.birdY,
                    vx: (Math.random() - 0.5) * 11,
                    vy: (Math.random() - 0.5) * 11,
                    color: ['#facc15', '#f43f5e', '#38bdf8', '#ffffff', '#22c55e'][Math.floor(Math.random() * 5)],
                    life: 35,
                    size: Math.random() * 5 + 3
                  });
                }
              }
            } else if (mb.state === 'catch') {
              if (mb.marioY < GROUND_Y - 44) {
                mb.marioY += 3.2;
              } else {
                mb.marioY = GROUND_Y - 44;
                mb.state = 'victory';
                sounds.playScore();
              }
              eng.birdX = mb.marioX - 18;
              eng.birdY = mb.marioY - 8;
            } else if (mb.state === 'victory') {
              const flagBottomY = GROUND_Y - 70;
              if (mb.flagY < flagBottomY) {
                mb.flagY += 3.0;
              }

              eng.birdX = mb.marioX - 18;
              eng.birdY = mb.marioY - 8;

              if (Math.random() < 0.14) {
                const fX = Math.random() * width * 0.65 + 80;
                const fY = Math.random() * 160 + 40;
                const fCol = ['#f43f5e', '#38bdf8', '#facc15', '#10b981', '#a855f7'][Math.floor(Math.random() * 5)];
                for (let f = 0; f < 14; f++) {
                  mb.fireworks.push({
                    x: fX,
                    y: fY,
                    vx: Math.cos((f * Math.PI) / 7) * (Math.random() * 3.5 + 2),
                    vy: Math.sin((f * Math.PI) / 7) * (Math.random() * 3.5 + 2),
                    color: fCol,
                    life: 30,
                    size: 4
                  });
                }
              }

              if (mb.timer > 3.6 && !eng.marioBossState.triggeredEnd) {
                eng.marioBossState.triggeredEnd = true;
                triggerMarioEnding();
              }
            }

            for (let i = mb.fireworks.length - 1; i >= 0; i--) {
              const fw = mb.fireworks[i];
              fw.x += fw.vx;
              fw.y += fw.vy;
              fw.life--;
              if (fw.life <= 0) mb.fireworks.splice(i, 1);
            }
          }

          // ==========================================
          // MULTI-PIPE OBSTACLES: SPAWNING & UNDULATING HEIGHTS (Naik, Turun, Tengah)
          // ==========================================
          if (!eng.marioBossState.active && eng.currentDay < 25) {
            let rightmostX = 0;
            for (const p of eng.pipes) {
              if (p.x > rightmostX) rightmostX = p.x;
            }

            if (rightmostX < width + 100) {
              eng.nextPipeId += 1;
              const newX = Math.max(width + 80, rightmostX + 260);
              const newPipe = createPipeObstacle(eng.nextPipeId, newX, eng.op);
              eng.pipes.push(newPipe);

              // Spawn coins in gap or between pipes
              const gapCenter = (newPipe.topPipeHeight + newPipe.bottomPipeY) / 2;
              if (!newPipe.hasQuiz) {
                eng.items.push({
                  id: Date.now() + Math.random(),
                  x: newPipe.x + newPipe.width / 2,
                  y: gapCenter,
                  type: 'coin',
                  radius: 14,
                  collected: false,
                  floatAngle: Math.random() * Math.PI
                });
              }

              // Also spawn coins/hearts in open airspace between pipes
              const midAirX = newX - 130;
              const isHeart = eng.livesCount < 2.5 && Math.random() < 0.25;
              eng.items.push({
                id: Date.now() + Math.random() + 1,
                x: midAirX,
                y: Math.floor(Math.random() * 180) + 120,
                type: isHeart ? 'heart' : 'coin',
                radius: isHeart ? 16 : 14,
                collected: false,
                floatAngle: Math.random() * Math.PI
              });
            }
          }

          // Check Day 25 Mario Boss transition when player passes all obstacles
          if (eng.currentDay >= 25 && eng.pipes.length === 0 && !eng.marioBossState.active) {
            eng.marioBossState.active = true;
            eng.marioBossState.state = 'run';
            eng.marioBossState.timer = 0;
            eng.marioBossState.flagpoleX = width + 120;
            eng.marioBossState.flagY = 120;
            eng.marioBossState.castleX = width + 240;
            eng.marioBossState.marioX = width + 60;
            eng.marioBossState.marioY = GROUND_Y - 44;
            eng.marioBossState.marioVx = -3.2;
            eng.marioBossState.marioVy = 0;
            eng.marioBossState.caughtBird = false;
            eng.marioBossState.speech = '🏃 MARIO MENGEJAR BURUNG!';
            eng.marioBossState.triggeredEnd = false;
            eng.marioBossState.fireworks = [];
          }

          // Update each active pipe and handle physics collision
          const birdCoreR = 13;
          const birdLeft = eng.birdX - birdCoreR;
          const birdRight = eng.birdX + birdCoreR;
          let isBlockedByPipe = false;

          for (let i = eng.pipes.length - 1; i >= 0; i--) {
            const p = eng.pipes[i];
            p.x -= eng.gateSpeed;

            const pipeLeft = p.x - 4;
            const pipeRight = p.x + p.width + 4;
            const inTopSolid = (eng.birdY - birdCoreR) < p.topPipeHeight;
            const inBottomSolid = (eng.birdY + birdCoreR) > p.bottomPipeY;
            const inSolidObstacle = inTopSolid || inBottomSolid;

            // 1. FRONT-FACE COLLISION (Burung tertahan oleh pipa dan terdorong ke kiri)
            if (!p.passed && inSolidObstacle && birdRight >= pipeLeft && birdLeft < pipeLeft + 16) {
              eng.birdX = pipeLeft - birdCoreR;
              isBlockedByPipe = true;

              if (Math.random() < 0.35) {
                eng.particles.push({
                  x: eng.birdX + birdCoreR,
                  y: eng.birdY + (Math.random() - 0.5) * 12,
                  vx: -Math.random() * 2.5 - 1,
                  vy: (Math.random() - 0.5) * 3,
                  color: '#fbbf24',
                  life: 10,
                  size: 3
                });
              }

              if (eng.birdX <= birdCoreR + 4) {
                eng.birdX = birdCoreR + 4;
                if (eng.invincibleFrames <= 0) {
                  sounds.playHit();
                  eng.livesCount = Math.max(0, eng.livesCount - 0.5);
                  eng.invincibleFrames = 90;
                  eng.comboCount = 0;
                  setLives(eng.livesCount);
                  setCombo(0);
                  setFloatText({ text: '⚠️ Tertahan Pipa! -½ ❤️', id: Date.now() });

                  if (eng.livesCount <= 0) {
                    handleGameOver(eng.scoreCount);
                  }
                }
              }
            }

            // 2. INSIDE-GAP VERTICAL DEFLECTION (Bibir celah atas & bawah)
            if (birdLeft >= pipeLeft && birdRight <= pipeRight + 16) {
              if (eng.birdY - birdCoreR < p.topPipeHeight) {
                eng.birdY = p.topPipeHeight + birdCoreR;
                eng.birdVelocity = Math.max(0, eng.birdVelocity);
              }
              if (eng.birdY + birdCoreR > p.bottomPipeY) {
                eng.birdY = p.bottomPipeY - birdCoreR;
                eng.birdVelocity = Math.min(0, eng.birdVelocity);
              }
            }

            // 3. Question Trigger inside open gap (HANYA JIKA PIPA MEMILIKI SOAL ACAK)
            if (p.hasQuiz && p.question && !p.passed && !p.quizTriggered) {
              if (birdRight >= pipeLeft + 15 && birdLeft <= pipeRight) {
                if (eng.birdY >= p.topPipeHeight - 15 && eng.birdY <= p.bottomPipeY + 15) {
                  p.quizTriggered = true;
                  eng.isPausedForQuiz = true;
                  eng.timeRemaining = 15.0;
                  setTimerSeconds(15);
                  setActiveQuiz(p.question);
                }
              }
            }

            // 4. Passing the pipe: scores + advances Day progression!
            if (!p.passed && pipeRight < birdLeft) {
              p.passed = true;
              if (!p.quizTriggered) {
                sounds.playScore();
                eng.scoreCount += 50;
                setScore(eng.scoreCount);
                setFloatText({ text: '🚀 Lolos Pipa! +50', id: Date.now() });
              }

              // Advance Day progression (Setiap 2 pipa lolos = +1 Day)
              eng.pipesClearedCount += 1;
              const nextDay = Math.min(25, Math.floor(eng.pipesClearedCount / 2) + 1);
              if (nextDay !== eng.currentDay) {
                eng.currentDay = nextDay;
                setDay(eng.currentDay);
                setFloatText({ text: `🌅 DAY ${eng.currentDay}/25!`, id: Date.now() });
              }
            }

            // 5. Remove off-screen pipes
            if (p.x + p.width < -100) {
              eng.pipes.splice(i, 1);
            }
          }

          // Pulihkan posisi X burung maju jika tidak sedang tertahan pipa
          if (!isBlockedByPipe && eng.birdX < 140) {
            eng.birdX = Math.min(140, eng.birdX + 2.5);
          }
        }
      }

      // ==========================================
      // 3. DRAW AUTHENTIC DYNAMIC OPPOSING PIPES (NAIK, TURUN, TENGAH)
      // ==========================================
      eng.pipes.forEach((g) => {
        const drawClassicPipeSection = (y: number, h: number, isTopPipe: boolean) => {
          if (h <= 0) return;
          ctx.save();
          const pipeGrad = ctx.createLinearGradient(g.x, 0, g.x + g.width, 0);
          pipeGrad.addColorStop(0, '#4d8e1c');
          pipeGrad.addColorStop(0.12, '#9de64e');
          pipeGrad.addColorStop(0.3, '#73bf2e');
          pipeGrad.addColorStop(0.82, '#73bf2e');
          pipeGrad.addColorStop(1, '#4d8e1c');

          const capH = 26;
          const capExtra = 10;
          const capX = g.x - capExtra / 2;
          const capW = g.width + capExtra;

          if (isTopPipe) {
            const bodyH = Math.max(0, h - capH);
            ctx.fillStyle = pipeGrad;
            ctx.fillRect(g.x, y, g.width, bodyH);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3.5;
            ctx.strokeRect(g.x, y, g.width, bodyH);

            ctx.fillStyle = pipeGrad;
            ctx.fillRect(capX, y + bodyH, capW, capH);
            ctx.strokeRect(capX, y + bodyH, capW, capH);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.fillRect(capX + 4, y + bodyH + 3, capW - 8, 3);
          } else {
            ctx.fillStyle = pipeGrad;
            ctx.fillRect(capX, y, capW, capH);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3.5;
            ctx.strokeRect(capX, y, capW, capH);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.fillRect(capX + 4, y + 3, capW - 8, 3);

            const bodyY = y + capH;
            const bodyH = Math.max(0, h - capH);
            ctx.fillStyle = pipeGrad;
            ctx.fillRect(g.x, bodyY, g.width, bodyH);
            ctx.strokeRect(g.x, bodyY, g.width, bodyH);
          }
          ctx.restore();
        };

        // 1. Draw Top Pipe
        drawClassicPipeSection(0, g.topPipeHeight, true);

        // 2. Draw Bottom Pipe
        drawClassicPipeSection(g.bottomPipeY, GROUND_Y - g.bottomPipeY, false);

        // 3. Draw Floating Golden Mystery Question Box in the open gap (ONLY IF PIPE HAS QUIZ)
        if (g.hasQuiz && !g.quizTriggered && !g.passed) {
          const gapCenterY = (g.topPipeHeight + g.bottomPipeY) / 2;
          const boxSize = 36;
          const boxX = g.x + g.width / 2 - boxSize / 2;
          const boxY = gapCenterY - boxSize / 2 + Math.sin(nowTime * 0.006) * 4;

          ctx.save();
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 14;

          const blockGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxSize);
          blockGrad.addColorStop(0, '#fbbf24');
          blockGrad.addColorStop(1, '#d97706');
          ctx.fillStyle = blockGrad;
          ctx.fillRect(boxX, boxY, boxSize, boxSize);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3;
          ctx.strokeRect(boxX, boxY, boxSize, boxSize);

          ctx.fillStyle = '#78350f';
          ctx.fillRect(boxX + 3, boxY + 3, 3, 3);
          ctx.fillRect(boxX + boxSize - 6, boxY + 3, 3, 3);
          ctx.fillRect(boxX + 3, boxY + boxSize - 6, 3, 3);
          ctx.fillRect(boxX + boxSize - 6, boxY + boxSize - 6, 3, 3);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 22px "Outfit", system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowBlur = 0;
          ctx.fillText('?', boxX + boxSize / 2, boxY + boxSize / 2 + 1);

          ctx.restore();
        }
      });

      // ==========================================
      // DAY 25: DRAW SUPER MARIO FLAGPOLE, CASTLE & ANIMATED BOSS
      // ==========================================
      if (eng.marioBossState.active) {
        const mb = eng.marioBossState;

        // 1. Classic Mario Flagpole and Brick Castle
        drawClassicFlagpoleAndCastle(ctx, mb.flagpoleX, mb.flagY, mb.castleX, GROUND_Y);

        // 2. Sky Fireworks Particles
        mb.fireworks.forEach((fw) => {
          ctx.fillStyle = fw.color;
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // 3. Dynamic Animated Mario (Runs, Leaps, Catches & Victory Poses independently!)
        drawRetroMario(ctx, mb.marioX, mb.marioY, mb.state, nowTime, mb.caughtBird);
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
      if (eng.marioBossState.active && eng.marioBossState.caughtBird) {
        // Dizzy spiral / crossed eyes when caught by Mario
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('@_@', 8, -2);
      } else {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(7, -5, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(9, -5, 3, 0, Math.PI * 2);
        ctx.fill();
      }

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

      // Dizzy spinning stars around bird's head when caught
      if (eng.marioBossState.active && eng.marioBossState.caughtBird) {
        const spinA = nowTime * 0.008;
        ctx.fillStyle = '#facc15';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('💫', Math.cos(spinA) * 16, Math.sin(spinA) * 10 - 22);
        ctx.fillText('⭐', Math.cos(spinA + Math.PI) * 16, Math.sin(spinA + Math.PI) * 10 - 22);
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [handleGameOver, triggerMarioEnding]);

  const formatLivesText = (val: number) => {
    if (val <= 0) return '0';
    const whole = Math.floor(val);
    const hasHalf = val % 1 !== 0;
    if (hasHalf) {
      return whole > 0 ? `${whole}½` : '½';
    }
    return `${whole}`;
  };

  const getTimeIcon = (t: TimeOfDay) => {
    if (t === 'pagi') return '🌅';
    if (t === 'sore') return '🌇';
    return '🌙';
  };

  const getTimeLabel = (t: TimeOfDay) => {
    if (t === 'pagi') return 'PAGI';
    if (t === 'sore') return 'SORE';
    return 'MALAM';
  };

  return (
    <div className="flappy-game-container">
      {/* Top Navigation Bar */}
      <div className="flappy-nav">
        <button className="flappy-btn-back" onClick={onBackToMenu}>
          &larr; Back to Games Hub
        </button>

        <div className="flappy-title-badge">
          <span>🐦</span> FLAPPY MATH
        </div>

        {/* Dynamic Day, Time of Day, Lives, Coins, Score */}
        <div className="flappy-stats-bar">
          {/* Day & Time of Day Badge */}
          <div className={`stat-pill day-pill ${timeOfDay}`} title="Progres Hari & Time">
            <span className="pill-icon">{getTimeIcon(timeOfDay)}</span>
            <span className="pill-val">DAY {day}/25 ({getTimeLabel(timeOfDay)})</span>
          </div>

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

          <div className={`stat-pill timer-pill ${timerSeconds <= 5 ? 'warning-timer' : ''}`} title="Time Jawab Question">
            <span className="pill-icon">⏱️</span>
            <span className="pill-val">{timerSeconds}s</span>
          </div>

          <div className="stat-pill coin-pill" title="Total Koin">
            <span className="pill-icon">🪙</span>
            <span className="pill-val">{coins}</span>
          </div>

          <div className="stat-pill score-pill" title="Score Game">
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

        {/* OVERLAY: MODAL SOAL (4 PILIHAN JAWABAN) */}
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
              <p className="quiz-subtitle">Select 1 dari 4 jawaban yang benar di bawah ini:</p>

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
                      onKeyDown={(e) => {
                        if (e.code === 'Space') {
                          e.preventDefault();
                          e.stopPropagation();
                        }
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
                Tekan tombol [A], [B], [C], [D] atau klik opsi di atas. (Wrong jawab: -½ ❤️ & langsung lanjut!)
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY: IDLE / START SCREEN */}
        {gameState === 'idle' && (
          <div className="flappy-overlay start-overlay">
            <div className="flappy-start-card">
              <div className="start-hero-icon">🐦 ⚡ 👑</div>
              <h1 className="start-hero-title">FLAPPY MATH ADVENTURE</h1>
              <p className="start-hero-subtitle">Jelajahi Day 1 - 25 (Pagi, Sore, Malam) Menuju Final Boss Mario!</p>

              <button
                type="button"
                className="btn-play-game"
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
              >
                <span className="play-icon">▶</span> START ADVENTURE
              </button>

              <div className="start-click-hint">
                Tekan <strong>[Spasi]</strong> atau klik tombol di atas untuk mulai terbang!
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY: DAY 25 SUPER MARIO FINAL BOSS ENDING SCREEN */}
        {gameState === 'boss_ending' && (
          <div className="flappy-overlay" data-lenis-prevent="true">
            <div className="flappy-modal-card boss-win-card">
              <div className="modal-icon">👑 🍄 ⭐</div>
              <h2 className="modal-title boss-title">DAY 25: PERJALANAN SELESAI!</h2>
              <p className="modal-desc">
                Hebat! Burung Matematika berhasil menempuh perjalanan dari <strong>Day 1 hingga Day 25 (Pagi, Sore, Malam)</strong> dan akhirnya dihentikan oleh <strong>Super Mario</strong> sang Penjaga Kastil Gorong-Gorong!
              </p>

              {/* DETAILED SCORE BREAKDOWN */}
              <div className="flappy-score-breakdown">
                <div className="breakdown-row">
                  <span className="b-label">📚 Question Terjawab Correct ({correctAnswersCount} Soal):</span>
                  <span className="b-val">+{quizPointsEarned} Pts</span>
                </div>
                <div className="breakdown-row">
                  <span className="b-label">🪙 Koin Terkumpul ({coins} Koin):</span>
                  <span className="b-val">+{coinPointsEarned} Pts</span>
                </div>
                <div className="breakdown-row highlight">
                  <span className="b-label">🏆 Bonus Capaian Day 25:</span>
                  <span className="b-val">+2,500 Pts</span>
                </div>
                <div className="breakdown-total">
                  <span className="total-label">TOTAL SKOR AKHIR</span>
                  <span className="total-num">⭐ {score + 2500}</span>
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
                  🔄 Ulang Petualangan (Day 1)
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

        {/* OVERLAY: GAME OVER WITH SCORE BREAKDOWN */}
        {gameState === 'gameover' && (
          <div className="flappy-overlay" data-lenis-prevent="true">
            <div className="flappy-modal-card gameover">
              <div className="modal-icon">💀 💥</div>
              <h2 className="modal-title">GAME OVER!</h2>
              <p className="modal-desc">
                Burungmu kehabisan nyawa di <strong>Day {day} ({getTimeLabel(timeOfDay)})</strong>! Inilah rincian skormu:
              </p>

              {/* DETAILED SCORE BREAKDOWN */}
              <div className="flappy-score-breakdown">
                <div className="breakdown-row">
                  <span className="b-label">📚 Question Terjawab Correct ({correctAnswersCount} Soal):</span>
                  <span className="b-val">+{quizPointsEarned} Pts</span>
                </div>
                <div className="breakdown-row">
                  <span className="b-label">🪙 Koin Terkumpul ({coins} Koin):</span>
                  <span className="b-val">+{coinPointsEarned} Pts</span>
                </div>
                <div className="breakdown-row highlight">
                  <span className="b-label">📅 Bonus Hari (Day {day}):</span>
                  <span className="b-val">+{day * 100} Pts</span>
                </div>
                <div className="breakdown-total">
                  <span className="total-label">TOTAL SKOR AKHIR</span>
                  <span className="total-num">⭐ {score + day * 100}</span>
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
                  🔄 Play Again
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
        💡 <strong>Tujuan Game:</strong> Bertahan dari <strong>Day 1 sampai Day 25 (Pagi, Sore, Malam)</strong>. Setiap jawaban benar & koin akan dijumlahkan menjadi total skor akhir di hadapan <strong>Super Mario</strong>!
      </div>

      {/* Flappy Bird Styles */}
      <style jsx>{`
        .flappy-game-container {
          height: calc(100vh - 80px);
          max-height: calc(100vh - 80px);
          background: #0f172a;
          color: #fff;
          padding: 0.8rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          user-select: none;
          overflow: hidden;
          box-sizing: border-box;
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

        .day-pill {
          background: #3b82f6;
          color: #fff;
          font-weight: 900;
          transition: background 0.4s ease;
        }
        .day-pill.pagi {
          background: #0284c7;
        }
        .day-pill.menjelang-sore {
          background: #d97706;
        }
        .day-pill.sore {
          background: #e11d48;
        }
        .day-pill.menjelang-malam {
          background: #7c3aed;
        }
        .day-pill.malam {
          background: #312e81;
        }
        .day-pill.fajar {
          background: #0d9488;
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
          box-shadow: 6px 6px 0 #000;
          cursor: pointer;
          max-width: 840px;
          width: 100%;
          aspect-ratio: 840 / 480;
          max-height: calc(100vh - 180px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #38bdf8;
        }

        .flappy-canvas {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* SCORE BREAKDOWN IN MODALS */
        .flappy-score-breakdown {
          width: 100%;
          background: rgba(15, 23, 42, 0.7);
          border: 2px solid #334155;
          border-radius: 14px;
          padding: 0.6rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin: 0.5rem 0;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.84rem;
          font-weight: 700;
          color: #cbd5e1;
        }
        .breakdown-row.highlight {
          color: #fbbf24;
          font-weight: 800;
        }
        .b-val {
          color: #10b981;
          font-weight: 900;
        }

        .breakdown-total {
          border-top: 2px dashed #475569;
          padding-top: 0.4rem;
          margin-top: 0.15rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .total-label {
          font-size: 0.9rem;
          font-weight: 900;
          color: #f8fafc;
        }
        .total-num {
          font-size: 1.2rem;
          font-weight: 900;
          color: #38bdf8;
        }

        .boss-win-card {
          border-color: #f59e0b !important;
          box-shadow: 8px 8px 0 #f59e0b, 0 0 40px rgba(245, 158, 11, 0.4) !important;
        }
        .boss-title {
          color: #f59e0b !important;
        }

        .flappy-modal-card {
          background: #1e293b;
          border: 4px solid #000;
          border-radius: 20px;
          padding: 1.2rem 1.8rem;
          max-width: 480px;
          width: 90%;
          text-align: center;
          box-shadow: 8px 8px 0 #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto 0;
          box-sizing: border-box;
        }

        .modal-icon {
          font-size: 2.4rem;
          margin-bottom: 0.2rem;
        }

        .modal-title {
          font-size: 1.4rem;
          font-weight: 900;
          margin-bottom: 0.2rem;
        }

        .modal-desc {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.35;
          margin-bottom: 0.3rem;
        }

        .flappy-modal-actions {
          display: flex;
          gap: 0.8rem;
          width: 100%;
          margin-top: 0.4rem;
        }

        .btn-retry, .btn-hub {
          flex: 1;
          padding: 0.65rem 0.9rem;
          border-radius: 12px;
          font-weight: 900;
          font-size: 0.9rem;
          cursor: pointer;
          border: 2.5px solid #000;
          box-shadow: 3px 3px 0 #000;
          transition: transform 0.1s;
        }
        .btn-retry {
          background: #10b981;
          color: #fff;
        }
        .btn-hub {
          background: #64748b;
          color: #fff;
        }
        .btn-retry:hover, .btn-hub:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
        }

        /* OVERLAYS */
        .flappy-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.82);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 50;
          padding: 1.2rem 0.8rem 2.5rem;
          box-sizing: border-box;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        .flappy-start-card {
          background: #1e293b;
          border: 4px solid #000;
          border-radius: 20px;
          padding: 1.8rem;
          text-align: center;
          box-shadow: 8px 8px 0 #000;
          max-width: 440px;
          width: 90%;
          margin: auto 0;
          box-sizing: border-box;
        }

        .start-hero-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .start-hero-title {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: #38bdf8;
          margin-bottom: 0.2rem;
        }

        .start-hero-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 1.5rem;
        }

        .btn-play-game {
          background: #22c55e;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 900;
          padding: 0.85rem 2.2rem;
          border: 3px solid #000;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 4px 4px 0 #000;
          transition: transform 0.1s;
        }
        .btn-play-game:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000;
        }

        .start-click-hint {
          margin-top: 1.2rem;
          font-size: 0.85rem;
          color: #64748b;
        }

        /* QUIZ MODAL */
        .flappy-quiz-card {
          background: #1e293b;
          border: 4px solid #000;
          border-radius: 20px;
          padding: 1.6rem 2rem;
          width: 92%;
          max-width: 520px;
          box-shadow: 8px 8px 0 #000;
          text-align: center;
        }

        .quiz-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }

        .quiz-badge {
          background: #0284c7;
          color: #fff;
          font-weight: 900;
          font-size: 0.85rem;
          padding: 0.3rem 0.8rem;
          border: 2px solid #000;
          border-radius: 12px;
        }

        .quiz-timer {
          background: #334155;
          color: #82fed6;
          font-weight: 900;
          font-size: 0.95rem;
          padding: 0.3rem 0.8rem;
          border: 2px solid #000;
          border-radius: 12px;
        }
        .quiz-timer.danger {
          background: #ef4444;
          color: #fff;
          animation: blinkTimer 0.5s infinite alternate;
        }

        .quiz-prompt-text {
          font-size: 2.2rem;
          font-weight: 900;
          color: #facc15;
          margin: 0.6rem 0;
          letter-spacing: 1px;
        }

        .quiz-subtitle {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }

        .quiz-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .quiz-option-btn {
          background: #334155;
          color: #fff;
          border: 3px solid #000;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          font-size: 1.2rem;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 3px 3px 0 #000;
          transition: transform 0.1s;
        }
        .quiz-option-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
          background: #475569;
        }
        .quiz-option-btn.correct {
          background: #22c55e !important;
          color: #fff;
        }
        .quiz-option-btn.wrong {
          background: #ef4444 !important;
          color: #fff;
        }

        .opt-letter {
          background: #0f172a;
          color: #38bdf8;
          border-radius: 6px;
          padding: 0.1rem 0.45rem;
          font-size: 0.9rem;
        }

        .quiz-footer-hint {
          font-size: 0.8rem;
          color: #64748b;
        }

        .flappy-float-text {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(15, 23, 42, 0.9);
          border: 3px solid #facc15;
          color: #facc15;
          font-weight: 900;
          font-size: 1.3rem;
          padding: 0.6rem 1.4rem;
          border-radius: 20px;
          box-shadow: 4px 4px 0 #000;
          animation: floatFade 1.2s forwards;
          z-index: 40;
          pointer-events: none;
        }
        @keyframes floatFade {
          0% { opacity: 0; transform: translate(-50%, 0) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -15px) scale(1.05); }
          80% { opacity: 1; transform: translate(-50%, -25px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -45px) scale(0.9); }
        }

        .flappy-hint-bar {
          background: #1e293b;
          border: 2px solid #000;
          border-radius: 12px;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          color: #94a3b8;
          max-width: 840px;
          width: 100%;
          text-align: center;
          box-shadow: 3px 3px 0 #000;
        }
      `}</style>
    </div>
  );
}
