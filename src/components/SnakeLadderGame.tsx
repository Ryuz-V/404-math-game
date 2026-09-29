"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface SnakeLadderGameProps {
  onBackToMenu: () => void;
  onAddScore?: (pts: number) => void;
}

// Sound Synthesizer using Web Audio API
class SnakeSoundSynth {
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

  playDiceRoll() {
    const ctx = this.getContext();
    if (!ctx) return;
    for (let i = 0; i < 7; i++) {
      const now = ctx.currentTime + i * 0.04;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 260, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    }
  }

  playStep() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.07);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playLadder() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [392, 440, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    });
  }

  playSnakeHiss() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.45);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.setValueAtTime(4, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.45);
  }

  playSwallowGulp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.45);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  playEscapeCheer() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    });
  }

  playWhooshWinner() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Whoosh wind sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);

    // Fanfare chords
    const chordNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chordNotes.forEach((freq, idx) => {
      const cNow = now + 0.35 + idx * 0.1;
      const cOsc = ctx.createOscillator();
      const cGain = ctx.createGain();
      cOsc.type = 'triangle';
      cOsc.frequency.setValueAtTime(freq, cNow);
      cGain.gain.setValueAtTime(0.35, cNow);
      cGain.gain.exponentialRampToValueAtTime(0.01, cNow + 0.35);
      cOsc.connect(cGain);
      cGain.connect(ctx.destination);
      cOsc.start(cNow);
      cOsc.stop(cNow + 0.35);
    });
  }
}

const sounds = new SnakeSoundSynth();

// Math Quiz Challenge Generator (+, -, ×, ÷)
interface MathQuizQuestion {
  prompt: string;
  correct: number;
  options: number[];
  correctIndex: number;
  topic: string;
}

function generateMathChallenge(): MathQuizQuestion {
  const ops = ['add', 'sub', 'mul', 'div'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let prompt = '';
  let correct = 0;
  let topic = '';

  if (op === 'add') {
    topic = 'Penjumlahan (+)';
    const a = Math.floor(Math.random() * 45) + 8;
    const b = Math.floor(Math.random() * 45) + 8;
    correct = a + b;
    prompt = `${a} + ${b} = ?`;
  } else if (op === 'sub') {
    topic = 'Pengurangan (-)';
    const a = Math.floor(Math.random() * 50) + 25;
    const b = Math.floor(Math.random() * (a - 10)) + 6;
    correct = a - b;
    prompt = `${a} - ${b} = ?`;
  } else if (op === 'mul') {
    topic = 'Perkalian (×)';
    const a = Math.floor(Math.random() * 11) + 2;
    const b = Math.floor(Math.random() * 11) + 2;
    correct = a * b;
    prompt = `${a} × ${b} = ?`;
  } else {
    topic = 'Pembagian (÷)';
    const b = Math.floor(Math.random() * 10) + 2;
    const ans = Math.floor(Math.random() * 12) + 2;
    const a = b * ans;
    correct = ans;
    prompt = `${a} ÷ ${b} = ?`;
  }

  const set = new Set<number>([correct]);
  while (set.size < 4) {
    const delta = (Math.floor(Math.random() * 7) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = correct + delta;
    if (fake >= 0) set.add(fake);
  }
  const options = Array.from(set).sort(() => Math.random() - 0.5);
  const correctIndex = options.indexOf(correct);

  return { prompt, correct, options, correctIndex, topic };
}

// Player Definition (Supports 2, 3, or 4 Players)
interface PlayerData {
  id: number;
  name: string;
  avatar: string;
  color: string;
  bgBadge: string;
  borderColor: string;
  pos: number;
  isBot: boolean;
}

const DEFAULT_PLAYERS: PlayerData[] = [
  { id: 1, name: 'Anak 1 (Merah)', avatar: '🤠', color: '#ef4444', bgBadge: '#fee2e2', borderColor: '#b91c1c', pos: 1, isBot: false },
  { id: 2, name: 'Anak 2 (Biru)', avatar: '🐱', color: '#0284c7', bgBadge: '#e0f2fe', borderColor: '#0369a1', pos: 1, isBot: false },
  { id: 3, name: 'Anak 3 (Kuning)', avatar: '🦊', color: '#f59e0b', bgBadge: '#fef3c7', borderColor: '#b45309', pos: 1, isBot: false },
  { id: 4, name: 'Anak 4 (Hijau)', avatar: '🐸', color: '#10b981', bgBadge: '#d1fae5', borderColor: '#047857', pos: 1, isBot: false }
];

// Classic Snakes and Ladders Configuration
interface SnakeDef {
  head: number;
  tail: number;
  color: string;
  curveDir: 'left' | 'right';
}

interface LadderDef {
  bottom: number;
  top: number;
  color: string;
}

// Clean, well-distributed 10 Snakes (including 1 Giant Long Snake) and 8 Ladders
const SNAKE_LIST: SnakeDef[] = [
  // 1. ULAR NAGA RAKSASA (Giant Long Snake across 7 rows: 99 -> 37)
  { head: 99, tail: 37, color: '#dc2626', curveDir: 'right' },
  // 2. Ular Kobra Merah (Top-Right: 93 -> 74)
  { head: 93, tail: 74, color: '#ea580c', curveDir: 'left' },
  // 3. Ular Belang Ungu (Upper-Left: 88 -> 67)
  { head: 88, tail: 67, color: '#9333ea', curveDir: 'right' },
  // 4. Ular Hijau Zamrud (Upper-Mid: 82 -> 61)
  { head: 82, tail: 61, color: '#16a34a', curveDir: 'left' },
  // 5. Ular Emas Gurun (Mid-Right: 71 -> 52)
  { head: 71, tail: 52, color: '#ca8a04', curveDir: 'right' },
  // 6. Ular Karang Jingga (Mid-Left: 65 -> 44)
  { head: 65, tail: 44, color: '#f97316', curveDir: 'left' },
  // 7. Ular Cokelat Hutan (Center-Low: 55 -> 26)
  { head: 55, tail: 26, color: '#78350f', curveDir: 'right' },
  // 8. Ular Biru Laut (Lower-Right: 49 -> 12)
  { head: 49, tail: 12, color: '#0284c7', curveDir: 'left' },
  // 9. Ular Merah Muda (Lower-Left: 34 -> 16)
  { head: 34, tail: 16, color: '#db2777', curveDir: 'right' },
  // 10. Ular Duri Kecil (Bottom: 23 -> 5)
  { head: 23, tail: 5, color: '#e11d48', curveDir: 'left' }
];

const LADDER_LIST: LadderDef[] = [
  // 1. Tangga Kayu Bawah 1: 4 -> 25
  { bottom: 4, top: 25, color: '#854d0e' },
  // 2. Tangga Panjang Emas: 9 -> 48
  { bottom: 9, top: 48, color: '#d97706' },
  // 3. Tangga Kayu Bawah 2: 18 -> 39
  { bottom: 18, top: 39, color: '#0369a1' },
  // 4. Tangga Kayu Tengah 1: 27 -> 56
  { bottom: 27, top: 56, color: '#7c3aed' },
  // 5. Tangga Kayu Tengah 2: 42 -> 77
  { bottom: 42, top: 77, color: '#b45309' },
  // 6. Tangga Hijau Hutan: 51 -> 72
  { bottom: 51, top: 72, color: '#15803d' },
  // 7. Tangga Biru: 62 -> 81
  { bottom: 62, top: 81, color: '#0284c7' },
  // 8. Tangga Menuju Juara: 75 -> 96
  { bottom: 75, top: 96, color: '#9a3412' }
];

// Quick Maps for Lookup
const SNAKE_MAP = SNAKE_LIST.reduce<Record<number, number>>((acc, s) => {
  acc[s.head] = s.tail;
  return acc;
}, {});

const LADDER_MAP = LADDER_LIST.reduce<Record<number, number>>((acc, l) => {
  acc[l.bottom] = l.top;
  return acc;
}, {});

// Coordinates Helper (0..9 for col & row where tile 1 is at bottom left)
function getTileXYPercent(tileNum: number) {
  const zeroIdx = Math.max(0, Math.min(99, tileNum - 1));
  const rowFromBottom = Math.floor(zeroIdx / 10);
  const colInRow = zeroIdx % 10;
  const col = rowFromBottom % 2 === 0 ? colInRow : 9 - colInRow;
  const row = 9 - rowFromBottom; // row 0 at top, row 9 at bottom

  // Return center coordinates percentage (0..100)
  const x = (col + 0.5) * 10;
  const y = (row + 0.5) * 10;
  return { x, y, col, row, rowFromBottom };
}

export default function SnakeLadderGame({ onBackToMenu, onAddScore }: SnakeLadderGameProps) {
  // Game Setup Configurations
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(4);
  const [diceMode, setDiceMode] = useState<1 | 2>(1); // 1 Dadu or 2 Dadu
  const [isBotMode, setIsBotMode] = useState(false); // Play vs Bots or Local Multiplayer

  // Active Game State
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'gameover'>('setup');
  const [players, setPlayers] = useState<PlayerData[]>(DEFAULT_PLAYERS);
  const [activePlayerIdx, setActivePlayerIdx] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // Dice Display Values
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [lastTotalRoll, setLastTotalRoll] = useState<number | null>(null);

  // Snake Quiz Challenge Overlay
  const [activeQuiz, setActiveQuiz] = useState<{
    quiz: MathQuizQuestion;
    player: PlayerData;
    snakeHead: number;
    snakeTail: number;
  } | null>(null);
  const [quizTimer, setQuizTimer] = useState(20);
  const [selectedAnsIdx, setSelectedAnsIdx] = useState<number | null>(null);

  // Climbing Action Notification Tag
  const [climbingAction, setClimbingAction] = useState<{
    playerIdx: number;
    text: string;
    type: 'ladder' | 'snake';
  } | null>(null);

  // Whoosh Champion Celebration
  const [winnerPlayer, setWinnerPlayer] = useState<PlayerData | null>(null);
  const [showWhooshBanner, setShowWhooshBanner] = useState(false);

  // Toast floating announcement
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMsg(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMsg(null), 3200);
  };

  // Active players subset
  const activePlayers = useMemo(() => {
    return players.slice(0, playerCount).map((p, idx) => ({
      ...p,
      isBot: isBotMode && idx > 0
    }));
  }, [players, playerCount, isBotMode]);

  // Start / Reset Game
  const handleStartGame = () => {
    const initialPlayers = DEFAULT_PLAYERS.slice(0, playerCount).map((p, idx) => ({
      ...p,
      pos: 1,
      isBot: isBotMode && idx > 0
    }));

    setPlayers(initialPlayers);
    setActivePlayerIdx(0);
    setIsRolling(false);
    setIsMoving(false);
    setDice1(1);
    setDice2(1);
    setLastTotalRoll(null);
    setActiveQuiz(null);
    setClimbingAction(null);
    setWinnerPlayer(null);
    setShowWhooshBanner(false);
    setGameState('playing');
    showToast(`🎲 Permainan Dimulai! Giliran ${initialPlayers[0].name}`);
  };

  // Custom Gliding Position State for Pawns (for ladder climbing & snake sliding)
  const [pawnGliding, setPawnGliding] = useState<
    Record<number, { x: number; y: number; isGliding: boolean; type?: 'ladder' | 'snake' }>
  >({});

  // Snake Swallowing & Chomping Animation State
  interface SnakeSwallowState {
    active: boolean;
    snakeHead: number;
    snakeTail: number;
    playerIdx: number;
    phase: 'chomp' | 'swallowing' | 'popped';
    progress: number;
    bulgeX: number;
    bulgeY: number;
    bulgeAngle: number;
  }
  const [swallowAnim, setSwallowAnim] = useState<SnakeSwallowState | null>(null);

  // Glide Pawn Directly Along Ladder (Climbing rung-by-rung directly up the ladder!)
  const glideLadder = useCallback(
    async (playerIndex: number, fromTile: number, toTile: number) => {
      setIsMoving(true);
      sounds.playLadder();

      const startCoord = getTileXYPercent(fromTile);
      const endCoord = getTileXYPercent(toTile);

      setClimbingAction({
        playerIdx: playerIndex,
        text: `🪜 Naik Tangga! (${fromTile} ➔ ${toTile})`,
        type: 'ladder'
      });

      const frames = 26;
      for (let i = 1; i <= frames; i++) {
        const t = i / frames;
        // Smooth easing curve
        const ease = t * t * (3 - 2 * t);
        const baseX = startCoord.x + (endCoord.x - startCoord.x) * ease;
        const baseY = startCoord.y + (endCoord.y - startCoord.y) * ease;
        
        // Rung climbing stepping hop animation
        const hop = Math.sin(t * Math.PI * 6) * 1.6;

        setPawnGliding((prev) => ({
          ...prev,
          [playerIndex]: { x: baseX, y: baseY - Math.abs(hop), isGliding: true, type: 'ladder' }
        }));
        await new Promise((r) => setTimeout(r, 45));
      }

      // Finalize destination square
      setPlayers((prev) =>
        prev.map((p, idx) => (idx === playerIndex ? { ...p, pos: toTile } : p))
      );
      setPawnGliding((prev) => ({
        ...prev,
        [playerIndex]: { x: endCoord.x, y: endCoord.y, isGliding: false }
      }));

      setClimbingAction(null);
      setIsMoving(false);
      return toTile;
    },
    []
  );

  // Slide Pawn Directly Down Snake Body with Animated Chomping & Swallowing Bulge!
  const slideSnake = useCallback(
    async (playerIndex: number, headTile: number, tailTile: number) => {
      setIsMoving(true);

      const snakeDef = SNAKE_LIST.find((s) => s.head === headTile) || {
        head: headTile,
        tail: tailTile,
        color: '#ef4444',
        curveDir: 'right' as const
      };

      const hPos = getTileXYPercent(snakeDef.head);
      const tPos = getTileXYPercent(snakeDef.tail);

      const dx = (tPos.x - hPos.x) * 10;
      const dy = (tPos.y - hPos.y) * 10;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const perpX = ((-dy / dist) * (snakeDef.curveDir === 'left' ? -45 : 45)) / 10;
      const perpY = (((dx / dist) * (snakeDef.curveDir === 'left' ? -45 : 45)) / 10);

      const midX = (hPos.x + tPos.x) / 2 + perpX;
      const midY = (hPos.y + tPos.y) / 2 + perpY;

      // ==========================================
      // PHASE 1: CHOMP / GULP AT SNAKE HEAD 👄
      // ==========================================
      sounds.playSnakeHiss();
      setSwallowAnim({
        active: true,
        snakeHead: headTile,
        snakeTail: tailTile,
        playerIdx: playerIndex,
        phase: 'chomp',
        progress: 0,
        bulgeX: hPos.x,
        bulgeY: hPos.y,
        bulgeAngle: 0
      });

      setClimbingAction({
        playerIdx: playerIndex,
        text: `👄 NYAM! Ditelan Ular di Kotak ${headTile}!`,
        type: 'snake'
      });

      // Show chomping mouth snapping for 450ms
      await new Promise((r) => setTimeout(r, 450));

      // ==========================================
      // PHASE 2: SWALLOWED BULGE TRAVELS DOWN SNAKE BODY 🐍
      // ==========================================
      sounds.playSwallowGulp();

      setClimbingAction({
        playerIdx: playerIndex,
        text: `🐍 GULP! Di Dalam Perut Ular (${headTile} ➔ ${tailTile})`,
        type: 'snake'
      });

      const frames = 32;
      for (let i = 1; i <= frames; i++) {
        const t = i / frames;
        const oneMinusT = 1 - t;
        const curX =
          oneMinusT * oneMinusT * hPos.x +
          2 * oneMinusT * t * midX +
          t * t * tPos.x;
        const curY =
          oneMinusT * oneMinusT * hPos.y +
          2 * oneMinusT * t * midY +
          t * t * tPos.y;

        // Tangent derivative for bulge rotation
        const dX = 2 * (1 - t) * (midX - hPos.x) + 2 * t * (tPos.x - midX);
        const dY = 2 * (1 - t) * (midY - hPos.y) + 2 * t * (tPos.y - midY);
        const angleDeg = (Math.atan2(dY, dX) * 180) / Math.PI;

        setSwallowAnim({
          active: true,
          snakeHead: headTile,
          snakeTail: tailTile,
          playerIdx: playerIndex,
          phase: 'swallowing',
          progress: t,
          bulgeX: curX,
          bulgeY: curY,
          bulgeAngle: angleDeg
        });

        setPawnGliding((prev) => ({
          ...prev,
          [playerIndex]: { x: curX, y: curY, isGliding: true, type: 'snake' }
        }));
        await new Promise((r) => setTimeout(r, 45));
      }

      // ==========================================
      // PHASE 3: POPPED OUT AT TAIL 💨
      // ==========================================
      setSwallowAnim({
        active: true,
        snakeHead: headTile,
        snakeTail: tailTile,
        playerIdx: playerIndex,
        phase: 'popped',
        progress: 1,
        bulgeX: tPos.x,
        bulgeY: tPos.y,
        bulgeAngle: 0
      });

      setClimbingAction({
        playerIdx: playerIndex,
        text: `💨 POOF! Keluar di Kotak ${tailTile}! 😵`,
        type: 'snake'
      });

      await new Promise((r) => setTimeout(r, 500));

      // Finalize destination square
      setPlayers((prev) =>
        prev.map((p, idx) => (idx === playerIndex ? { ...p, pos: tailTile } : p))
      );
      setPawnGliding((prev) => ({
        ...prev,
        [playerIndex]: { x: tPos.x, y: tPos.y, isGliding: false }
      }));

      setSwallowAnim(null);
      setClimbingAction(null);
      setIsMoving(false);
      return tailTile;
    },
    []
  );

  // Move pawn token with bounce back when exceeding tile 100
  const movePawnWithBounce = useCallback(
    async (playerIndex: number, fromTile: number, roll: number) => {
      setIsMoving(true);
      let curr = fromTile;

      if (fromTile + roll <= 100) {
        // Normal forward movement step-by-step
        const target = fromTile + roll;
        while (curr < target) {
          curr += 1;
          sounds.playStep();
          setPlayers((prev) =>
            prev.map((p, idx) => (idx === playerIndex ? { ...p, pos: curr } : p))
          );
          await new Promise((r) => setTimeout(r, 180));
        }
      } else {
        // Exceeds 100: Step forward to 100 first, then bounce backwards!
        const stepsForward = 100 - fromTile;
        const stepsBackward = roll - stepsForward;

        // 1. Walk forward to 100
        while (curr < 100) {
          curr += 1;
          sounds.playStep();
          setPlayers((prev) =>
            prev.map((p, idx) => (idx === playerIndex ? { ...p, pos: curr } : p))
          );
          await new Promise((r) => setTimeout(r, 180));
        }

        // Brief pause at 100 before bouncing back
        await new Promise((r) => setTimeout(r, 240));

        // 2. Bounce backward from 100
        const finalTarget = 100 - stepsBackward;
        while (curr > finalTarget) {
          curr -= 1;
          sounds.playStep();
          setPlayers((prev) =>
            prev.map((p, idx) => (idx === playerIndex ? { ...p, pos: curr } : p))
          );
          await new Promise((r) => setTimeout(r, 200));
        }

        showToast(`🔄 Membal! Lewat ${stepsBackward} langkah dari 100, mundur ke kotak ${finalTarget}!`);
      }

      setIsMoving(false);
      return curr;
    },
    []
  );

  // Switch Turn to Next Player
  const nextTurn = useCallback(() => {
    setActivePlayerIdx((prev) => (prev + 1) % playerCount);
  }, [playerCount]);

  // Evaluate Landing Logic on Square
  const evaluateLanding = useCallback(
    async (playerIndex: number, landedTile: number) => {
      const curPlayer = activePlayers[playerIndex];

      // 1. RECOGNIZED WINNER AT TILE 100!
      if (landedTile >= 100) {
        sounds.playWhooshWinner();
        setWinnerPlayer(curPlayer);
        setShowWhooshBanner(true);
        setGameState('gameover');

        if (onAddScore && !curPlayer.isBot) {
          onAddScore(1000);
        }
        return;
      }

      // 2. LADDER ENCOUNTER (CLIMB DIRECTLY UP THE LADDER!)
      if (LADDER_MAP[landedTile]) {
        const ladderTop = LADDER_MAP[landedTile];
        showToast(`🪜 ${curPlayer.name} MENEMUKAN TANGGA! Naik meluncur dari kotak ${landedTile} ke ${ladderTop}!`);

        await new Promise((r) => setTimeout(r, 350));
        await glideLadder(playerIndex, landedTile, ladderTop);

        // Check if ladder reached 100
        if (ladderTop >= 100) {
          sounds.playWhooshWinner();
          setWinnerPlayer(curPlayer);
          setShowWhooshBanner(true);
          setGameState('gameover');
          return;
        }

        nextTurn();
        return;
      }

      // 3. SNAKE ENCOUNTER (CHALLENGE / SLIDE ON BOARD)
      if (SNAKE_MAP[landedTile]) {
        const snakeTail = SNAKE_MAP[landedTile];
        sounds.playSnakeHiss();

        if (!curPlayer.isBot) {
          // Real Player encounters snake: MUST ANSWER 20-SECOND MATH QUIZ!
          const q = generateMathChallenge();
          setActiveQuiz({
            quiz: q,
            player: curPlayer,
            snakeHead: landedTile,
            snakeTail: snakeTail
          });
          setQuizTimer(20);
          setSelectedAnsIdx(null);
        } else {
          // Bot encounters snake: 50% chance bot escapes
          const botEscapes = Math.random() < 0.5;
          if (botEscapes) {
            sounds.playEscapeCheer();
            showToast(`🛡️ ${curPlayer.name} (Bot) memecahkan soal & selamat dari ular di ${landedTile}!`);
            nextTurn();
          } else {
            showToast(`🐍 ${curPlayer.name} (Bot) digigit ular di kotak ${landedTile} & meluncur turun!`);
            await slideSnake(playerIndex, landedTile, snakeTail);
            nextTurn();
          }
        }
        return;
      }

      // Normal safe square
      nextTurn();
    },
    [activePlayers, glideLadder, slideSnake, nextTurn, onAddScore]
  );

  // Roll Dice Action with Fair Random Generator & 3D Rolling Physics
  const rollDice = useCallback(async () => {
    if (isRolling || isMoving || Boolean(activeQuiz) || gameState !== 'playing') return;

    setIsRolling(true);
    sounds.playDiceRoll();

    let count = 0;
    const interval = setInterval(() => {
      // Dynamic random rolls during animation
      const r1 = Math.floor(Math.random() * 6) + 1;
      const r2 = Math.floor(Math.random() * 6) + 1;
      setDice1(r1);
      setDice2(r2);
      count++;

      if (count > 10) {
        clearInterval(interval);
        // Truly fair random roll on completion
        const finalR1 = Math.floor(Math.random() * 6) + 1;
        const finalR2 = Math.floor(Math.random() * 6) + 1;
        setDice1(finalR1);
        setDice2(finalR2);

        const totalRoll = diceMode === 1 ? finalR1 : finalR1 + finalR2;
        setLastTotalRoll(totalRoll);
        setIsRolling(false);

        const curPlayer = activePlayers[activePlayerIdx];

        movePawnWithBounce(activePlayerIdx, curPlayer.pos, totalRoll).then((finalLanded) => {
          evaluateLanding(activePlayerIdx, finalLanded);
        });
      }
    }, 55);
  }, [isRolling, isMoving, activeQuiz, gameState, diceMode, activePlayers, activePlayerIdx, movePawnWithBounce, evaluateLanding]);

  // Automated Bot Turns
  useEffect(() => {
    if (gameState === 'playing' && !isRolling && !isMoving && !activeQuiz) {
      const curPlayer = activePlayers[activePlayerIdx];
      if (curPlayer && curPlayer.isBot) {
        const botDelay = setTimeout(() => {
          rollDice();
        }, 1200);
        return () => clearTimeout(botDelay);
      }
    }
  }, [gameState, activePlayerIdx, isRolling, isMoving, activeQuiz, activePlayers, rollDice]);

  // Timeout Penalty for Snake Quiz (Slides down directly on the board!)
  const handleQuizTimeout = useCallback(async () => {
    if (!activeQuiz) return;
    const { player, snakeHead, snakeTail } = activeQuiz;
    setActiveQuiz(null);
    sounds.playSwallowGulp();

    showToast(`⏱️ Waktu Habis! ${player.name} digigit ular & meluncur turun ke kotak ${snakeTail}!`);
    await slideSnake(activePlayerIdx, snakeHead, snakeTail);
    nextTurn();
  }, [activeQuiz, activePlayerIdx, slideSnake, nextTurn]);

  // Timer countdown effect for 20s snake quiz
  useEffect(() => {
    if (!activeQuiz) return;

    const timer = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, handleQuizTimeout]);

  // Player answers snake quiz
  const handleAnswerQuiz = async (chosenIdx: number) => {
    if (!activeQuiz || selectedAnsIdx !== null) return;
    setSelectedAnsIdx(chosenIdx);

    const isCorrect = chosenIdx === activeQuiz.quiz.correctIndex;
    const { player, snakeHead, snakeTail } = activeQuiz;

    if (isCorrect) {
      sounds.playEscapeCheer();
      showToast(`🎉 JAWABAN BENAR! ${player.name} selamat dari gigitan ular & tetap di kotak ${snakeHead}!`);

      setTimeout(() => {
        setActiveQuiz(null);
        setSelectedAnsIdx(null);
        nextTurn();
      }, 900);
    } else {
      sounds.playSwallowGulp();

      setTimeout(async () => {
        setActiveQuiz(null);
        setSelectedAnsIdx(null);

        showToast(`❌ Salah jawab! ${player.name} digigit ular di kotak ${snakeHead} & meluncur ke kotak ${snakeTail}!`);
        await slideSnake(activePlayerIdx, snakeHead, snakeTail);
        nextTurn();
      }, 700);
    }
  };

  // 10x10 Serpentine Grid Definition matching real snakes and ladders layout
  const SERPENTINE_TILES = useMemo(() => {
    const list: { tileNum: number; r: number; c: number }[] = [];
    for (let r = 0; r < 10; r++) {
      const rowFromBottom = 9 - r;
      for (let c = 0; c < 10; c++) {
        const tileNum =
          rowFromBottom % 2 === 0
            ? rowFromBottom * 10 + c + 1
            : rowFromBottom * 10 + (9 - c) + 1;
        list.push({ tileNum, r, c });
      }
    }
    return list;
  }, []);

  // Current turn player object
  const currentPlayer = activePlayers[activePlayerIdx] || activePlayers[0];

  return (
    <div className="snake-master-container">
      {/* Top Navigation Bar */}
      <div className="snake-top-navbar">
        <button className="nav-btn-back" onClick={onBackToMenu}>
          &larr; Back to Games Hub
        </button>

        <div className="nav-title-box">
          <span className="title-emoji">🐍🪜</span> ULAR TANGGA MATEMATIKA
        </div>

        <div className="nav-mode-tags">
          <span className="mode-pill">👥 {playerCount} Anak</span>
          <span className="mode-pill">🎲 {diceMode === 1 ? '1 Dadu' : '2 Dadu'}</span>
        </div>
      </div>

      {/* Main Game Content Area */}
      <div className="snake-layout-grid">
        {/* ================================================================= */}
        {/* BOARD ARENA WITH REAL SNAKES & LADDERS SVG OVERLAYS */}
        {/* ================================================================= */}
        <div className="board-outer-frame">
          <div className="board-canvas-container">
            {/* 10x10 Board Grid Cells */}
            <div className="grid-100-tiles">
              {SERPENTINE_TILES.map(({ tileNum, r }) => {
                const isTile100 = tileNum === 100;

                // Alternating bright pastel board colors
                const colorPalette = [
                  '#fed7aa', // orange
                  '#fef08a', // yellow
                  '#bbf7d0', // green
                  '#bae6fd', // blue
                  '#fbcfe8', // pink
                  '#ddd6fe'  // purple
                ];
                const bgTileColor = colorPalette[(tileNum + r * 2) % colorPalette.length];

                return (
                  <div
                    key={tileNum}
                    className={`tile-box ${isTile100 ? 'tile-finish-100' : ''}`}
                    style={{ backgroundColor: bgTileColor }}
                  >
                    <span className="tile-number-tag">{tileNum}</span>

                    {/* Tile 100 Grand Trophy */}
                    {isTile100 && (
                      <div className="trophy-100-badge">
                        <span className="trophy-icon">🏆</span>
                        <strong className="trophy-label">JUARA 1</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PAWNS DYNAMIC GLIDING LAYER (ABOVE GRID & SVG) */}
            <div className="pawns-overlay-layer">
              {activePlayers.map((p, idx) => {
                const isGliding = pawnGliding[idx]?.isGliding;
                const isSwallowed = swallowAnim?.active && swallowAnim.playerIdx === idx;
                const baseCoord = getTileXYPercent(p.pos);
                const x = isGliding ? pawnGliding[idx].x : baseCoord.x;
                const y = isGliding ? pawnGliding[idx].y : baseCoord.y;

                const offsets = [
                  { dx: -7, dy: -7 },
                  { dx: 7, dy: -7 },
                  { dx: -7, dy: 7 },
                  { dx: 7, dy: 7 }
                ];
                const offset = !isGliding ? offsets[idx % 4] : { dx: 0, dy: 0 };

                // Avatar display during swallowing
                let avatarDisplay = p.avatar;
                let swallowClass = '';
                if (isSwallowed) {
                  if (swallowAnim.phase === 'chomp') {
                    avatarDisplay = '😱';
                    swallowClass = 'pawn-being-chomped';
                  } else if (swallowAnim.phase === 'swallowing') {
                    avatarDisplay = '😵';
                    swallowClass = 'pawn-inside-stomach';
                  } else if (swallowAnim.phase === 'popped') {
                    avatarDisplay = '😵💫';
                    swallowClass = 'pawn-popped-tail';
                  }
                }

                return (
                  <div
                    key={p.id}
                    className={`dynamic-pawn-token ${isGliding ? 'pawn-gliding' : ''} ${swallowClass}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(calc(-50% + ${offset.dx}px), calc(-50% + ${offset.dy}px))`,
                      backgroundColor: p.color,
                      borderColor: p.borderColor,
                      boxShadow: isSwallowed ? `0 0 15px #fde047, 0 0 5px #fff` : `0 0 10px ${p.color}, 2px 2px 0 #000`
                    }}
                    title={`${p.name} (Kotak ${p.pos})`}
                  >
                    <span className="pawn-avatar-char">{avatarDisplay}</span>
                    {isSwallowed && swallowAnim.phase === 'swallowing' && (
                      <span className="swallow-sweat-drop">💦</span>
                    )}
                  </div>
                );
              })}

              {/* Floating Dynamic Climbing/Sliding Bubble Above Pawn */}
              {climbingAction && pawnGliding[climbingAction.playerIdx] && (
                <div
                  className={`climbing-action-bubble ${climbingAction.type}`}
                  style={{
                    left: `${pawnGliding[climbingAction.playerIdx].x}%`,
                    top: `${Math.max(4, pawnGliding[climbingAction.playerIdx].y - 7)}%`
                  }}
                >
                  {climbingAction.text}
                </div>
              )}
            </div>

            {/* SVG OVERLAY: REAL ILLUSTRATED SNAKES & 3D LADDERS */}
            <svg className="svg-snakes-ladders-layer" viewBox="0 0 1000 1000">
              <defs>
                {/* Wood Pattern for Ladders */}
                <linearGradient id="ladderWoodGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>

                <filter id="svgDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
                </filter>
              </defs>

              {/* 1. DRAW REAL 3D SOLID WOODEN LADDERS */}
              {LADDER_LIST.map((lad, idx) => {
                const bPos = getTileXYPercent(lad.bottom);
                const tPos = getTileXYPercent(lad.top);

                const bx = bPos.x * 10;
                const by = bPos.y * 10;
                const tx = tPos.x * 10;
                const ty = tPos.y * 10;

                const dx = tx - bx;
                const dy = ty - by;
                const len = Math.sqrt(dx * dx + dy * dy) || 1;
                const nx = (-dy / len) * 15;
                const ny = (dx / len) * 15;

                const rungsCount = Math.max(3, Math.floor(len / 42));

                return (
                  <g key={`lad-${idx}`} filter="url(#svgDropShadow)">
                    {/* Rail 1 (Outer Dark Wood + Inner Warm Grain) */}
                    <line
                      x1={bx - nx}
                      y1={by - ny}
                      x2={tx - nx}
                      y2={ty - ny}
                      stroke="#451a03"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <line
                      x1={bx - nx}
                      y1={by - ny}
                      x2={tx - nx}
                      y2={ty - ny}
                      stroke="#d97706"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Rail 2 (Outer Dark Wood + Inner Warm Grain) */}
                    <line
                      x1={bx + nx}
                      y1={by + ny}
                      x2={tx + nx}
                      y2={ty + ny}
                      stroke="#451a03"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <line
                      x1={bx + nx}
                      y1={by + ny}
                      x2={tx + nx}
                      y2={ty + ny}
                      stroke="#d97706"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Rungs (Golden Wood with Dark Border) */}
                    {Array.from({ length: rungsCount }).map((_, rIdx) => {
                      const t = (rIdx + 1) / (rungsCount + 1);
                      const rx = bx + dx * t;
                      const ry = by + dy * t;
                      return (
                        <g key={rIdx}>
                          <line
                            x1={rx - nx}
                            y1={ry - ny}
                            x2={rx + nx}
                            y2={ry + ny}
                            stroke="#451a03"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <line
                            x1={rx - nx}
                            y1={ry - ny}
                            x2={rx + nx}
                            y2={ry + ny}
                            stroke="#fde047"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                          />
                        </g>
                      );
                    })}

                    {/* Bottom Feet & Top Caps */}
                    <circle cx={bx - nx} cy={by - ny} r="7" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                    <circle cx={bx + nx} cy={by + ny} r="7" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                    <circle cx={tx - nx} cy={ty - ny} r="7" fill="#f59e0b" stroke="#451a03" strokeWidth="2" />
                    <circle cx={tx + nx} cy={ty + ny} r="7" fill="#f59e0b" stroke="#451a03" strokeWidth="2" />
                  </g>
                );
              })}

              {/* 2. DRAW REAL WINDING ANIMATED SNAKES & SWALLOWING BELLY BULGE */}
              {SNAKE_LIST.map((snake, sIdx) => {
                const hPos = getTileXYPercent(snake.head);
                const tPos = getTileXYPercent(snake.tail);

                const hx = hPos.x * 10;
                const hy = hPos.y * 10;
                const tx = tPos.x * 10;
                const ty = tPos.y * 10;

                const dx = tx - hx;
                const dy = ty - hy;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const perpX = (-dy / dist) * (snake.curveDir === 'left' ? -45 : 45);
                const perpY = (dx / dist) * (snake.curveDir === 'left' ? -45 : 45);

                const midX = (hx + tx) / 2 + perpX;
                const midY = (hy + ty) / 2 + perpY;

                const isGiant = snake.head === 99;
                const pathData = `M ${hx} ${hy} Q ${midX} ${midY} ${tx} ${ty}`;

                // Check if this snake is actively swallowing a player!
                const isSwallowingThisSnake = Boolean(
                  swallowAnim?.active && swallowAnim.snakeHead === snake.head
                );

                return (
                  <g key={`snake-${sIdx}`} filter="url(#svgDropShadow)">
                    {/* Snake Outer Shadow */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#000"
                      strokeWidth={isGiant ? '26' : '22'}
                      strokeLinecap="round"
                      opacity="0.25"
                    />

                    {/* Snake Main Colored Body */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={snake.color}
                      strokeWidth={isGiant ? '20' : '16'}
                      strokeLinecap="round"
                    />

                    {/* Snake Scales Striping Pattern */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#fef08a"
                      strokeWidth={isGiant ? '10' : '8'}
                      strokeDasharray="12,12"
                      strokeLinecap="round"
                    />

                    {/* SWALLOWED BELLY BULGE TRAVELING ALONG BODY */}
                    {isSwallowingThisSnake && swallowAnim?.phase === 'swallowing' && (
                      <g transform={`translate(${swallowAnim.bulgeX * 10}, ${swallowAnim.bulgeY * 10}) rotate(${swallowAnim.bulgeAngle})`}>
                        {/* Bulge Shadow */}
                        <ellipse cx="0" cy="0" rx={isGiant ? '36' : '28'} ry={isGiant ? '26' : '20'} fill="#000" opacity="0.35" />
                        {/* Expanded Stomach Body */}
                        <ellipse cx="0" cy="0" rx={isGiant ? '32' : '25'} ry={isGiant ? '22' : '17'} fill={snake.color} stroke="#000" strokeWidth="3.5" />
                        {/* Stomach Yellow Scales Pattern */}
                        <ellipse cx="0" cy="0" rx={isGiant ? '22' : '17'} ry={isGiant ? '14' : '11'} fill="#fef08a" opacity="0.85" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,4" />
                        {/* Digested Sparkles / Bubbles ✨ */}
                        <circle cx="-12" cy="-6" r="3.5" fill="#fff" opacity="0.9" />
                        <circle cx="10" cy="5" r="2.5" fill="#fff" opacity="0.9" />
                        <circle cx="4" cy="-7" r="2" fill="#fff" opacity="0.9" />
                        {/* Pulsing Outline Energy */}
                        <ellipse cx="0" cy="0" rx={isGiant ? '35' : '27'} ry={isGiant ? '25' : '19'} fill="none" stroke="#fde047" strokeWidth="2.5" strokeDasharray="6,4" />
                      </g>
                    )}

                    {/* Snake Head with Eyes and Forked Tongue */}
                    <circle cx={hx} cy={hy} r={isGiant ? '20' : '16'} fill={snake.color} stroke="#000" strokeWidth="2.5" />
                    <circle cx={hx - 4} cy={hy - 3} r={isGiant ? '4.5' : '3.5'} fill="#fff" />
                    <circle cx={hx - 3} cy={hy - 3} r={isGiant ? '2.4' : '1.8'} fill="#000" />
                    <circle cx={hx + 4} cy={hy - 3} r={isGiant ? '4.5' : '3.5'} fill="#fff" />
                    <circle cx={hx + 3} cy={hy - 3} r={isGiant ? '2.4' : '1.8'} fill="#000" />

                    {/* Forked Tongue */}
                    <path
                      d={`M ${hx} ${hy - 12} L ${hx} ${hy - 22} M ${hx} ${hy - 22} L ${hx - 4} ${hy - 28} M ${hx} ${hy - 22} L ${hx + 4} ${hy - 28}`}
                      stroke="#dc2626"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* ANIMATED OPEN CHOMPING JAWS WITH SHARP FANGS 👄 */}
                    {isSwallowingThisSnake && swallowAnim?.phase === 'chomp' && (
                      <g>
                        {/* Red Open Gullet / Throat Cavity */}
                        <ellipse cx={hx} cy={hy + 2} rx={isGiant ? '26' : '21'} ry={isGiant ? '20' : '16'} fill="#7f1d1d" stroke="#000" strokeWidth="3" />
                        <ellipse cx={hx} cy={hy + 2} rx={isGiant ? '18' : '14'} ry={isGiant ? '12' : '9'} fill="#450a0a" />
                        
                        {/* Upper Sharp White Fangs */}
                        <polygon points={`${hx - 9},${hy - 12} ${hx - 5},${hy - 1} ${hx - 1},${hy - 12}`} fill="#fff" stroke="#000" strokeWidth="1" />
                        <polygon points={`${hx + 1},${hy - 12} ${hx + 5},${hy - 1} ${hx + 9},${hy - 12}`} fill="#fff" stroke="#000" strokeWidth="1" />
                        
                        {/* Lower Sharp White Fangs */}
                        <polygon points={`${hx - 8},${hy + 13} ${hx - 4},${hy + 2} ${hx},${hy + 13}`} fill="#fff" stroke="#000" strokeWidth="1" />
                        <polygon points={`${hx + 1},${hy + 13} ${hx + 5},${hy + 2} ${hx + 9},${hy + 13}`} fill="#fff" stroke="#000" strokeWidth="1" />
                        
                        {/* Comic Crunch Text */}
                        <text x={hx} y={hy - 26} fontSize="18" fontWeight="900" fill="#facc15" textAnchor="middle" stroke="#000" strokeWidth="3" paintOrder="stroke fill">
                          CHOMP! 👄
                        </text>
                      </g>
                    )}

                    {/* Snake Tail Tip */}
                    <circle cx={tx} cy={ty} r={isGiant ? '6' : '5'} fill={snake.color} stroke="#000" strokeWidth="1.5" />

                    {/* ANIMATED POOF / SPIT AT TAIL 💨 */}
                    {isSwallowingThisSnake && swallowAnim?.phase === 'popped' && (
                      <g>
                        <text x={tx - 14} y={ty - 12} fontSize="26">💫</text>
                        <text x={tx + 8} y={ty - 6} fontSize="22">💨</text>
                        <circle cx={tx} cy={ty} r="22" fill="none" stroke="#facc15" strokeWidth="3" opacity="0.85" strokeDasharray="5,3" />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating Toast Message */}
          {toastMsg && <div className="floating-toast-alert">{toastMsg}</div>}
        </div>

        {/* ================================================================= */}
        {/* RIGHT SIDEBAR: 4 PLAYERS TURN CARDS & 3D DICE */}
        {/* ================================================================= */}
        <div className="sidebar-control-panel">
          {/* Active Turn Header */}
          <div className="turn-banner-card" style={{ borderColor: currentPlayer.color }}>
            <div className="turn-hero-avatar" style={{ backgroundColor: currentPlayer.color }}>
              {currentPlayer.avatar}
            </div>
            <div className="turn-hero-text">
              <span className="turn-label">GILIRAN SAAT INI:</span>
              <h3 className="turn-player-name" style={{ color: currentPlayer.color }}>
                {currentPlayer.name}
              </h3>
            </div>
            {currentPlayer.isBot && <span className="bot-pill-badge">🤖 BOT</span>}
          </div>

          {/* 4 Player Status Cards */}
          <div className="all-players-list">
            {activePlayers.map((p, pIdx) => {
              const isActive = pIdx === activePlayerIdx;
              return (
                <div
                  key={p.id}
                  className={`player-mini-card ${isActive ? 'active-player-glow' : ''}`}
                  style={{
                    backgroundColor: isActive ? p.bgBadge : '#1e293b',
                    borderColor: isActive ? p.color : '#334155'
                  }}
                >
                  <div className="player-avatar-circle" style={{ backgroundColor: p.color }}>
                    {p.avatar}
                  </div>
                  <div className="player-meta-box">
                    <span className="p-name" style={{ color: isActive ? '#000' : '#fff' }}>
                      {p.name}
                    </span>
                    <span className="p-tile" style={{ color: isActive ? '#334155' : '#94a3b8' }}>
                      Kotak: <strong style={{ color: p.color }}>{p.pos}</strong> / 100
                    </span>
                  </div>
                  {isActive && <span className="active-tag" style={{ backgroundColor: p.color }}>GILIRANMU</span>}
                </div>
              );
            })}
          </div>

          {/* 3D Realistic Tumbling Dice Action Center */}
          <div className="dice-control-box">
            <h4 className="dice-box-title">
              {diceMode === 1 ? '🎲 1 Dadu (1 - 6)' : '🎲 2 Dadu (2 - 12)'}
            </h4>

            <div className="dice-cubes-row">
              {/* Die 1 3D Tumbler */}
              <div className="dice-scene">
                <div className={`dice-cube-3d face-${dice1} ${isRolling ? 'rolling-3d' : ''}`}>
                  <div className="cube-face face-1"><span className="pip pip-center red"></span></div>
                  <div className="cube-face face-2"><span className="pip pip-top-left"></span><span className="pip pip-bot-right"></span></div>
                  <div className="cube-face face-3"><span className="pip pip-top-left"></span><span className="pip pip-center"></span><span className="pip pip-bot-right"></span></div>
                  <div className="cube-face face-4"><span className="pip pip-top-left"></span><span className="pip pip-top-right"></span><span className="pip pip-bot-left"></span><span className="pip pip-bot-right"></span></div>
                  <div className="cube-face face-5"><span className="pip pip-top-left"></span><span className="pip pip-top-right"></span><span className="pip pip-center"></span><span className="pip pip-bot-left"></span><span className="pip pip-bot-right"></span></div>
                  <div className="cube-face face-6"><span className="pip pip-top-left"></span><span className="pip pip-top-right"></span><span className="pip pip-mid-left"></span><span className="pip pip-mid-right"></span><span className="pip pip-bot-left"></span><span className="pip pip-bot-right"></span></div>
                </div>
              </div>

              {/* Die 2 3D Tumbler (If 2 Dadu mode) */}
              {diceMode === 2 && (
                <div className="dice-scene">
                  <div className={`dice-cube-3d face-${dice2} ${isRolling ? 'rolling-3d' : ''}`}>
                    <div className="cube-face face-1"><span className="pip pip-center red"></span></div>
                    <div className="cube-face face-2"><span className="pip pip-top-left"></span><span className="pip pip-bot-right"></span></div>
                    <div className="cube-face face-3"><span className="pip pip-top-left"></span><span className="pip pip-center"></span><span className="pip pip-bot-right"></span></div>
                    <div className="cube-face face-4"><span className="pip pip-top-left"></span><span className="pip pip-top-right"></span><span className="pip pip-bot-left"></span><span className="pip pip-bot-right"></span></div>
                    <div className="cube-face face-5"><span className="pip pip-top-left"></span><span className="pip pip-top-right"></span><span className="pip pip-center"></span><span className="pip pip-bot-left"></span><span className="pip pip-bot-right"></span></div>
                    <div className="cube-face face-6"><span className="pip pip-top-left"></span><span className="pip pip-top-right"></span><span className="pip pip-mid-left"></span><span className="pip pip-mid-right"></span><span className="pip pip-bot-left"></span><span className="pip pip-bot-right"></span></div>
                  </div>
                </div>
              )}
            </div>

            {lastTotalRoll !== null && (
              <div className="last-roll-summary">
                Hasil Dadu: <strong>+{lastTotalRoll} Langkah</strong>
              </div>
            )}

            <button
              type="button"
              className="btn-roll-master"
              onClick={rollDice}
              disabled={isRolling || isMoving || Boolean(activeQuiz) || currentPlayer.isBot || gameState !== 'playing'}
            >
              {isRolling ? '🎲 Mengocok Dadu...' : isMoving ? '🚶 Melangkah...' : '🎲 LEMPAR DADU!'}
            </button>
          </div>

          {/* Quick Info Legend */}
          <div className="quick-rules-card">
            <div className="rule-item">
              <span className="icon">🐍</span>
              <p><strong>Ular:</strong> Soal Matematika (20 Detik). Benar = Selamat! Salah = Ditelan!</p>
            </div>
            <div className="rule-item">
              <span className="icon">🪜</span>
              <p><strong>Tangga:</strong> Otomatis naik meluncur ke puncak tangga!</p>
            </div>
            <div className="rule-item">
              <span className="icon">🏆</span>
              <p><strong>Kotak 100:</strong> Yang pertama sampai dinobatkan Juara 1!</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: SETUP GAME (PLAY GAME, PILIH 2/3/4 ANAK, 1/2 DADU) */}
      {/* ========================================================================= */}
      {gameState === 'setup' && (
        <div className="snake-overlay-backdrop">
          <div className="snake-setup-modal">
            <div className="modal-hero-icon">🐍 🏆 🪜</div>
            <h1 className="modal-hero-title">ULAR TANGGA MATEMATIKA</h1>
            <p className="modal-hero-sub">
              Pilih jumlah anak, tentukan mode dadu, dan bersainglah mencapai kotak 100 Juara 1!
            </p>

            {/* Selection 1: Jumlah Pemain (2, 3, atau 4 Anak) */}
            <div className="setup-config-section">
              <label className="config-label">Pilih Jumlah Pemain:</label>
              <div className="config-button-row">
                {([2, 3, 4] as const).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`config-choice-btn ${playerCount === num ? 'selected' : ''}`}
                    onClick={() => setPlayerCount(num)}
                  >
                    <span>👥</span>
                    <strong>{num} Anak</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Selection 2: Mode Dadu (1 Dadu / 2 Dadu) */}
            <div className="setup-config-section">
              <label className="config-label">Pilih Mode Dadu:</label>
              <div className="config-button-row">
                <button
                  type="button"
                  className={`config-choice-btn ${diceMode === 1 ? 'selected' : ''}`}
                  onClick={() => setDiceMode(1)}
                >
                  <span>🎲</span>
                  <strong>1 Dadu (Klasik)</strong>
                </button>

                <button
                  type="button"
                  className={`config-choice-btn ${diceMode === 2 ? 'selected' : ''}`}
                  onClick={() => setDiceMode(2)}
                >
                  <span>🎲🎲</span>
                  <strong>2 Dadu (Cepat)</strong>
                </button>
              </div>
            </div>

            {/* Selection 3: Mode Lawan (Teman / vs Bot) */}
            <div className="setup-config-section">
              <label className="config-label">Mode Bermain:</label>
              <div className="config-button-row">
                <button
                  type="button"
                  className={`config-choice-btn ${!isBotMode ? 'selected' : ''}`}
                  onClick={() => setIsBotMode(false)}
                >
                  <span>👨‍👩‍👦‍👦</span>
                  <strong>Main Bareng Teman</strong>
                </button>

                <button
                  type="button"
                  className={`config-choice-btn ${isBotMode ? 'selected' : ''}`}
                  onClick={() => setIsBotMode(true)}
                >
                  <span>🤖</span>
                  <strong>Main Lawan Komputer (Bot)</strong>
                </button>
              </div>
            </div>

            {/* START PLAY GAME BUTTON */}
            <button type="button" className="btn-start-gameplay" onClick={handleStartGame}>
              <span className="triangle-icon">▶</span> PLAY GAME
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SNAKE MATH CHALLENGE (20 SECONDS COUNTDOWN) */}
      {/* ========================================================================= */}
      {activeQuiz && (
        <div className="snake-overlay-backdrop">
          <div className="snake-quiz-dialog">
            <div className="quiz-dialog-header">
              <span className="snake-alert-tag">⚠️ KENA ULAR DI KOTAK {activeQuiz.snakeHead}!</span>
              <span className={`quiz-timer-pill ${quizTimer <= 6 ? 'timer-danger' : ''}`}>
                ⏱️ {quizTimer}s
              </span>
            </div>

            <div className="quiz-avatar-scene">🐍 💨</div>
            <div className="quiz-for-player">
              Giliran <strong>{activeQuiz.player.name}</strong> menjawab:
            </div>
            <h2 className="quiz-math-equation">{activeQuiz.quiz.prompt}</h2>
            <p className="quiz-help-text">
              Jawab benar untuk <strong>Selamat dari Gigitan Ular</strong>! Jika salah / waktu habis, kamu akan ditelan dan meluncur turun ke kotak <strong>{activeQuiz.snakeTail}</strong>!
            </p>

            <div className="quiz-choice-grid">
              {activeQuiz.quiz.options.map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedAnsIdx === idx;
                const isCorrect = isSelected && idx === activeQuiz.quiz.correctIndex;
                const isWrong = isSelected && idx !== activeQuiz.quiz.correctIndex;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`quiz-card-btn ${isCorrect ? 'btn-correct' : ''} ${isWrong ? 'btn-wrong' : ''}`}
                    onClick={() => handleAnswerQuiz(idx)}
                    disabled={selectedAnsIdx !== null}
                  >
                    <span className="choice-letter">{letters[idx]}</span>
                    <span className="choice-val">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* MODAL: WHOOOSH JUARA 1 WINNER CELEBRATION (KOTAK 100) */}
      {/* ========================================================================= */}
      {gameState === 'gameover' && winnerPlayer && (
        <div className="snake-overlay-backdrop">
          <div className={`whoosh-winner-modal ${showWhooshBanner ? 'whoosh-in' : ''}`}>
            <div className="whoosh-sparkles">✨ 🌟 🎆 🌟 ✨</div>
            <div className="winner-big-trophy">🏆 🥇 👑</div>
            <h1 className="whoosh-headline">WOOOOOSHHH! JUARA 1!</h1>

            <div className="winner-highlight-card" style={{ borderColor: winnerPlayer.color }}>
              <span className="winner-avatar" style={{ backgroundColor: winnerPlayer.color }}>
                {winnerPlayer.avatar}
              </span>
              <div className="winner-details">
                <span className="winner-badge-title">PEMENANG UTAMA:</span>
                <h2 className="winner-player-title" style={{ color: winnerPlayer.color }}>
                  {winnerPlayer.name}
                </h2>
                <p className="winner-desc">Berhasil mencapai Kotak 100 dengan gemilang!</p>
              </div>
            </div>

            <div className="winner-action-buttons">
              <button type="button" className="btn-replay-game" onClick={handleStartGame}>
                🔄 Main Lagi
              </button>
              <button type="button" className="btn-back-hub" onClick={onBackToMenu}>
                🏠 Menu Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STYLING SYSTEM (NEO-BRUTALIST ARCADE & REAL BOARD DESIGN) */}
      {/* ========================================================================= */}
      <style jsx>{`
        .snake-master-container {
          min-height: calc(100vh - 80px);
          background: #0f172a;
          color: #ffffff;
          padding: 1.2rem 1.8rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          user-select: none;
        }

        /* NAVBAR */
        .snake-top-navbar {
          width: 100%;
          max-width: 1160px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #1e293b;
          border: 3.5px solid #000;
          border-radius: 18px;
          padding: 0.7rem 1.4rem;
          box-shadow: 4px 4px 0 #000;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .nav-btn-back {
          background: #ffdc00;
          color: #000;
          border: 2px solid #000;
          border-radius: 10px;
          font-weight: 900;
          font-size: 0.85rem;
          padding: 0.45rem 0.9rem;
          cursor: pointer;
          box-shadow: 2px 2px 0 #000;
          transition: transform 0.1s;
        }
        .nav-btn-back:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4px 4px 0 #000;
        }

        .nav-title-box {
          font-size: 1.25rem;
          font-weight: 900;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.01em;
        }

        .nav-mode-tags {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .mode-pill {
          background: #0f172a;
          color: #82fed6;
          border: 2px solid #000;
          border-radius: 12px;
          padding: 0.35rem 0.8rem;
          font-size: 0.85rem;
          font-weight: 800;
        }

        /* MAIN LAYOUT GRID */
        .snake-layout-grid {
          width: 100%;
          max-width: 1160px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.6rem;
          align-items: start;
        }
        @media (max-width: 960px) {
          .snake-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        /* BOARD OUTER FRAME */
        .board-outer-frame {
          position: relative;
          background: #ffffff;
          border: 4.5px solid #000000;
          border-radius: 24px;
          padding: 10px;
          box-shadow: 8px 8px 0 #000000;
          overflow: hidden;
        }

        .board-canvas-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border: 3px solid #000;
          border-radius: 16px;
          overflow: hidden;
          background: #f8fafc;
        }

        /* 10x10 TILES GRID */
        .grid-100-tiles {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: repeat(10, 1fr);
          width: 100%;
          height: 100%;
        }

        .tile-box {
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 2px 3px;
          transition: background 0.15s;
        }

        .tile-finish-100 {
          background: linear-gradient(135deg, #fef08a, #fed7aa) !important;
          border: 2.5px solid #d97706 !important;
        }

        .tile-number-tag {
          position: absolute;
          top: 2px;
          left: 3px;
          font-size: 0.68rem;
          font-weight: 900;
          color: #1e293b;
          line-height: 1;
        }

        .trophy-100-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }
        .trophy-icon {
          font-size: 1.4rem;
          line-height: 1;
          filter: drop-shadow(1px 1px 0 #000);
          animation: bounceTrophy 1s infinite alternate ease-in-out;
        }
        @keyframes bounceTrophy {
          0% { transform: scale(1); }
          100% { transform: scale(1.15) translateY(-2px); }
        }
        .trophy-label {
          font-size: 0.55rem;
          background: #d97706;
          color: #fff;
          border: 1px solid #000;
          border-radius: 4px;
          padding: 1px 3px;
          font-weight: 900;
        }

        .mini-snake-head-tag {
          font-size: 0.48rem;
          font-weight: 900;
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #ef4444;
          border-radius: 3px;
          padding: 0 2px;
          margin-top: 12px;
        }

        .mini-tail-tag {
          font-size: 0.48rem;
          font-weight: 800;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
          border-radius: 3px;
          padding: 0 2px;
          margin-top: 12px;
        }

        .mini-ladder-tag {
          font-size: 0.48rem;
          font-weight: 900;
          background: #fef3c7;
          color: #b45309;
          border: 1px solid #f59e0b;
          border-radius: 3px;
          padding: 0 2px;
          margin-top: 12px;
        }

        .mini-ladder-top-tag {
          font-size: 0.48rem;
          font-weight: 900;
          background: #e0f2fe;
          color: #0369a1;
          border: 1px solid #38bdf8;
          border-radius: 3px;
          padding: 0 2px;
          margin-top: 12px;
        }

        /* PAWNS DYNAMIC GLIDING OVERLAY LAYER */
        .pawns-overlay-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 15;
        }

        .dynamic-pawn-token {
          position: absolute;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2.5px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s;
          pointer-events: auto;
        }

        .dynamic-pawn-token.pawn-gliding {
          transform: translate(-50%, -50%) scale(1.35) !important;
          z-index: 30 !important;
          box-shadow: 0 0 20px #ffdc00, 3px 3px 0 #000 !important;
          filter: brightness(1.25);
        }

        .pawn-avatar-char {
          font-size: 0.9rem;
          line-height: 1;
        }

        /* FLOATING CLIMBING/SLIDING ACTION BUBBLE */
        .climbing-action-bubble {
          position: absolute;
          transform: translate(-50%, -100%);
          white-space: nowrap;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 8px;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #000;
          z-index: 40;
          pointer-events: none;
          animation: popBubble 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes popBubble {
          0% { transform: translate(-50%, -80%) scale(0.7); opacity: 0; }
          100% { transform: translate(-50%, -100%) scale(1); opacity: 1; }
        }

        .climbing-action-bubble.ladder {
          background: #fef08a;
          color: #78350f;
          border-color: #b45309;
        }

        .climbing-action-bubble.snake {
          background: #fee2e2;
          color: #dc2626;
          border-color: #ef4444;
        }

        /* SVG SNAKES & LADDERS OVERLAY LAYER */
        .svg-snakes-ladders-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        /* FLOATING TOAST ALERT */
        .floating-toast-alert {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: #ffdc00;
          color: #000;
          border: 3.5px solid #000;
          border-radius: 14px;
          padding: 0.6rem 1.4rem;
          font-size: 0.95rem;
          font-weight: 900;
          box-shadow: 4px 4px 0 #000;
          z-index: 50;
          animation: toastIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          text-align: center;
          max-width: 90%;
        }
        @keyframes toastIn {
          0% { transform: translate(-50%, -20px) scale(0.85); opacity: 0; }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }

        /* RIGHT SIDEBAR PANEL */
        .sidebar-control-panel {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .turn-banner-card {
          background: #1e293b;
          border: 3.5px solid #000;
          border-radius: 18px;
          padding: 0.9rem 1.2rem;
          box-shadow: 6px 6px 0 #000;
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .turn-hero-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2.5px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          box-shadow: 2px 2px 0 #000;
        }

        .turn-hero-text {
          flex: 1;
        }
        .turn-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: #94a3b8;
          display: block;
        }
        .turn-player-name {
          font-size: 1.2rem;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .bot-pill-badge {
          background: #93c5fd;
          color: #000;
          border: 1.5px solid #000;
          border-radius: 6px;
          padding: 2px 6px;
          font-size: 0.75rem;
          font-weight: 900;
        }

        /* ALL PLAYERS STATUS LIST */
        .all-players-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .player-mini-card {
          border: 2.5px solid #000;
          border-radius: 14px;
          padding: 0.55rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.15s;
        }
        .player-mini-card.active-player-glow {
          box-shadow: 4px 4px 0 #000;
          transform: translate(-2px, -2px);
        }

        .player-avatar-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .player-meta-box {
          flex: 1;
        }
        .player-meta-box .p-name {
          font-size: 0.88rem;
          font-weight: 900;
          display: block;
        }
        .player-meta-box .p-tile {
          font-size: 0.75rem;
          display: block;
        }

        .active-tag {
          font-size: 0.65rem;
          font-weight: 900;
          color: #fff;
          border: 1.5px solid #000;
          border-radius: 6px;
          padding: 2px 6px;
        }

        /* 3D DICE CONTROL BOX */
        .dice-control-box {
          background: #1e293b;
          border: 3.5px solid #000;
          border-radius: 18px;
          padding: 1.2rem;
          box-shadow: 6px 6px 0 #000;
          text-align: center;
        }

        .dice-box-title {
          font-size: 0.95rem;
          font-weight: 900;
          color: #f8fafc;
          margin-bottom: 0.8rem;
        }

        .dice-cubes-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
          padding: 10px 0;
        }

        .dice-scene {
          width: 60px;
          height: 60px;
          perspective: 450px;
        }

        .dice-cube-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        /* 3D Dice Orientations based on Value */
        .dice-cube-3d.face-1 { transform: translateZ(-30px) rotateY(0deg); }
        .dice-cube-3d.face-2 { transform: translateZ(-30px) rotateX(-90deg); }
        .dice-cube-3d.face-3 { transform: translateZ(-30px) rotateY(90deg); }
        .dice-cube-3d.face-4 { transform: translateZ(-30px) rotateY(-90deg); }
        .dice-cube-3d.face-5 { transform: translateZ(-30px) rotateX(90deg); }
        .dice-cube-3d.face-6 { transform: translateZ(-30px) rotateX(180deg); }

        /* 3D Tumbling Rolling Animation */
        .dice-cube-3d.rolling-3d {
          animation: diceTumblePhysics 0.6s linear infinite;
        }
        @keyframes diceTumblePhysics {
          0% { transform: translateZ(-30px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.95); }
          25% { transform: translateZ(-30px) rotateX(180deg) rotateY(90deg) rotateZ(45deg) scale(1.1); }
          50% { transform: translateZ(-30px) rotateX(360deg) rotateY(270deg) rotateZ(180deg) scale(1.05); }
          75% { transform: translateZ(-30px) rotateX(540deg) rotateY(450deg) rotateZ(270deg) scale(1.1); }
          100% { transform: translateZ(-30px) rotateX(720deg) rotateY(720deg) rotateZ(360deg) scale(0.95); }
        }

        .cube-face {
          position: absolute;
          width: 60px;
          height: 60px;
          background: #ffffff;
          border: 3px solid #000000;
          border-radius: 12px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          padding: 6px;
          box-sizing: border-box;
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.15);
        }

        /* 3D Cube Face Transforms */
        .cube-face.face-1 { transform: rotateY(0deg) translateZ(30px); }
        .cube-face.face-2 { transform: rotateX(90deg) translateZ(30px); }
        .cube-face.face-3 { transform: rotateY(-90deg) translateZ(30px); }
        .cube-face.face-4 { transform: rotateY(90deg) translateZ(30px); }
        .cube-face.face-5 { transform: rotateX(-90deg) translateZ(30px); }
        .cube-face.face-6 { transform: rotateX(180deg) translateZ(30px); }

        /* Pip Dots Styling */
        .pip {
          width: 10px;
          height: 10px;
          background: #0f172a;
          border-radius: 50%;
          justify-self: center;
          align-self: center;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
        }
        .pip.red {
          width: 14px;
          height: 14px;
          background: #ef4444;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
        }

        .pip-center { grid-column: 2; grid-row: 2; }
        .pip-top-left { grid-column: 1; grid-row: 1; }
        .pip-top-right { grid-column: 3; grid-row: 1; }
        .pip-mid-left { grid-column: 1; grid-row: 2; }
        .pip-mid-right { grid-column: 3; grid-row: 2; }
        .pip-bot-left { grid-column: 1; grid-row: 3; }
        .pip-bot-right { grid-column: 3; grid-row: 3; }

        .last-roll-summary {
          font-size: 0.92rem;
          color: #82fed6;
          font-weight: 800;
          margin-bottom: 0.8rem;
        }

        .btn-roll-master {
          width: 100%;
          background: #82fed6;
          color: #000000;
          border: 3.5px solid #000000;
          border-radius: 14px;
          padding: 0.95rem;
          font-size: 1.15rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 5px 5px 0 #000000;
          transition: all 0.1s;
        }
        .btn-roll-master:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #000000;
          background: #a7f3d0;
        }
        .btn-roll-master:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* QUICK RULES CARD */
        .quick-rules-card {
          background: #1e293b;
          border: 3px solid #000;
          border-radius: 16px;
          padding: 0.9rem 1.1rem;
          box-shadow: 6px 6px 0 #000;
        }
        .rule-item {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
          font-size: 0.78rem;
          line-height: 1.35;
        }
        .rule-item:last-child {
          margin-bottom: 0;
        }
        .rule-item .icon {
          font-size: 1.1rem;
        }

        /* ================================================================= */
        /* MODAL DIALOGS & OVERLAYS */
        /* ================================================================= */
        .snake-overlay-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          z-index: 1000;
        }

        /* SETUP MODAL */
        .snake-setup-modal {
          background: #ffffff;
          color: #000000;
          border: 4.5px solid #000000;
          border-radius: 26px;
          padding: 2.2rem 2.6rem;
          box-shadow: 8px 8px 0 #000000;
          max-width: 520px;
          width: 95%;
          text-align: center;
          animation: popModal 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @keyframes popModal {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-hero-icon {
          font-size: 3.4rem;
          line-height: 1;
        }
        .modal-hero-title {
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.1;
        }
        .modal-hero-sub {
          font-size: 0.9rem;
          color: #475569;
          margin: 0;
          line-height: 1.4;
        }

        .setup-config-section {
          text-align: left;
          background: #f8fafc;
          border: 2px solid #000;
          border-radius: 14px;
          padding: 0.75rem 1rem;
        }
        .config-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 0.4rem;
        }
        .config-button-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .config-choice-btn {
          flex: 1;
          min-width: 100px;
          background: #ffffff;
          border: 2px solid #000;
          border-radius: 10px;
          padding: 0.5rem 0.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.12s;
        }
        .config-choice-btn strong {
          font-size: 0.82rem;
          color: #000;
        }
        .config-choice-btn.selected {
          background: #82fed6;
          box-shadow: 3px 3px 0 #000;
          transform: translate(-1.5px, -1.5px);
        }

        .btn-start-gameplay {
          width: 100%;
          background: #ffdc00;
          color: #000000;
          border: 3.5px solid #000000;
          border-radius: 16px;
          padding: 1.1rem;
          font-size: 1.45rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 6px 6px 0 #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.12s;
          margin-top: 0.4rem;
        }
        .btn-start-gameplay:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 #000000;
          background: #ffe642;
        }

        /* QUIZ DIALOG */
        .snake-quiz-dialog {
          background: #ffffff;
          color: #000000;
          border: 4.5px solid #000000;
          border-radius: 24px;
          padding: 1.8rem 2.2rem;
          box-shadow: 8px 8px 0 #000000;
          max-width: 500px;
          width: 95%;
          text-align: center;
          animation: popModal 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        .quiz-dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }
        .snake-alert-tag {
          background: #fee2e2;
          color: #b91c1c;
          border: 1.5px solid #ef4444;
          font-size: 0.8rem;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 6px;
        }
        .quiz-timer-pill {
          background: #0f172a;
          color: #82fed6;
          border: 1.5px solid #000;
          font-size: 0.95rem;
          font-weight: 900;
          padding: 2px 10px;
          border-radius: 8px;
        }
        .quiz-timer-pill.timer-danger {
          background: #ef4444;
          color: #ffffff;
          animation: blinkDanger 0.5s infinite alternate;
        }
        @keyframes blinkDanger {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        .quiz-avatar-scene {
          font-size: 3.2rem;
          line-height: 1;
          margin: 0.2rem 0;
        }
        .quiz-for-player {
          font-size: 0.9rem;
          color: #475569;
          margin-bottom: 0.2rem;
        }
        .quiz-math-equation {
          font-size: 2.5rem;
          font-weight: 900;
          color: #0284c7;
          margin: 0.2rem 0;
        }
        .quiz-help-text {
          font-size: 0.82rem;
          color: #64748b;
          margin-bottom: 1.2rem;
          line-height: 1.4;
        }

        .quiz-choice-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
        }

        .quiz-card-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
          border: 2.5px solid #000;
          border-radius: 12px;
          padding: 0.8rem 1.1rem;
          cursor: pointer;
          transition: all 0.12s;
        }
        .quiz-card-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0 #000;
          background: #ffdc00;
        }
        .quiz-card-btn.btn-correct {
          background: #82fed6 !important;
          border-color: #059669;
          box-shadow: 4px 4px 0 #059669;
        }
        .quiz-card-btn.btn-wrong {
          background: #fee2e2 !important;
          border-color: #dc2626;
          box-shadow: 4px 4px 0 #dc2626;
        }

        .choice-letter {
          width: 24px;
          height: 24px;
          background: #000;
          color: #fff;
          border-radius: 4px;
          font-weight: 900;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .choice-val {
          font-size: 1.5rem;
          font-weight: 900;
          color: #0f172a;
        }

        /* SWALLOWING & CHOMPING ANIMATION STYLES */
        .pawn-being-chomped {
          animation: chompPawnShake 0.15s infinite alternate !important;
          z-index: 50 !important;
        }
        @keyframes chompPawnShake {
          0% { transform: translate(-50%, -50%) scale(0.65) rotate(-15deg); }
          100% { transform: translate(-50%, -50%) scale(0.75) rotate(15deg); }
        }

        .pawn-inside-stomach {
          animation: insideBellySquish 0.3s infinite ease-in-out alternate !important;
          z-index: 50 !important;
          opacity: 0.95;
        }
        @keyframes insideBellySquish {
          0% { transform: translate(-50%, -50%) scale(0.85, 0.7) rotate(-5deg); }
          100% { transform: translate(-50%, -50%) scale(0.7, 0.85) rotate(5deg); }
        }

        .pawn-popped-tail {
          animation: popOutTail 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) !important;
          z-index: 50 !important;
        }
        @keyframes popOutTail {
          0% { transform: translate(-50%, -50%) scale(0.3) rotate(180deg); }
          70% { transform: translate(-50%, -50%) scale(1.35) rotate(-10deg); }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }

        .swallow-sweat-drop {
          position: absolute;
          top: -12px;
          right: -8px;
          font-size: 0.95rem;
          animation: floatSweat 0.4s infinite alternate;
        }
        @keyframes floatSweat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }

        /* WHOOSH JUARA 1 WINNER MODAL */
        .whoosh-winner-modal {
          background: #ffffff;
          color: #000;
          border: 5px solid #000;
          border-radius: 28px;
          padding: 2.4rem 2.8rem;
          box-shadow: 8px 8px 0 #000;
          max-width: 520px;
          width: 95%;
          text-align: center;
          transform: scale(0.6) rotate(-5deg);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .whoosh-winner-modal.whoosh-in {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }

        .whoosh-sparkles {
          font-size: 1.8rem;
          margin-bottom: 0.2rem;
        }
        .winner-big-trophy {
          font-size: 4.5rem;
          margin-bottom: 0.3rem;
          animation: trophyJump 1.2s infinite ease-in-out alternate;
        }
        @keyframes trophyJump {
          0% { transform: translateY(0) rotate(-4deg); }
          100% { transform: translateY(-12px) rotate(4deg); }
        }

        .whoosh-headline {
          font-size: 2.5rem;
          font-weight: 900;
          color: #d97706;
          text-shadow: 2px 2px 0 #000;
          letter-spacing: -0.02em;
          margin: 0 0 1rem 0;
        }

        .winner-highlight-card {
          background: #f8fafc;
          border: 3.5px solid #000;
          border-radius: 18px;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.4rem;
        }

        .winner-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 3px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          box-shadow: 3px 3px 0 #000;
        }

        .winner-details {
          text-align: left;
          flex: 1;
        }
        .winner-badge-title {
          font-size: 0.72rem;
          font-weight: 800;
          color: #64748b;
        }
        .winner-player-title {
          font-size: 1.45rem;
          font-weight: 900;
          margin: 0.1rem 0;
        }
        .winner-desc {
          font-size: 0.8rem;
          color: #475569;
          margin: 0;
        }

        .winner-action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
        }

        .btn-replay-game {
          background: #82fed6;
          color: #000;
          border: 3px solid #000;
          border-radius: 14px;
          padding: 0.9rem;
          font-size: 1.05rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 4px 4px 0 #000;
          transition: transform 0.1s;
        }
        .btn-replay-game:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000;
        }

        .btn-back-hub {
          background: #ffdc00;
          color: #000;
          border: 3px solid #000;
          border-radius: 14px;
          padding: 0.9rem;
          font-size: 1.05rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 4px 4px 0 #000;
          transition: transform 0.1s;
        }
        .btn-back-hub:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #000;
        }
      `}</style>
    </div>
  );
}
