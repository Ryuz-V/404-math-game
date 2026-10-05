"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface MathSoldierGameProps {
  onBackToMenu: () => void;
  onAddScore?: (pts: number) => void;
}

export type EnemyFaction = 'zombies' | 'soldiers';
export type MathOp = 'all' | 'add' | 'sub' | 'mul' | 'div';
export type GameDifficulty = 'easy' | 'normal' | 'hard' | 'nightmare';

// ============================================================================
// AUDIO SYNTHESIZER FOR SOLDIER FPS
// ============================================================================
class SoldierAudioSynth {
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

  playPistol() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playKnifeSlash() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playRifle() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playShotgun() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.25);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playSniper() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(980, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playPlasma() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1350, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.22);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playMinigun() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.07);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playBFG() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  playExplosion() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.6);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  playMissileSiren() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
    osc.frequency.linearRampToValueAtTime(800, now + 0.6);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  playEnemyGunfireMiss() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playReload() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  playReloadFinish() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playHeal() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.18);
    });
  }

  playHitHeadshot() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.3, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.15);
    });
  }

  playPlayerHurt() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(45, now + 0.22);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playUpgradeSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
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
}

const soldierSounds = new SoldierAudioSynth();

// ============================================================================
// WEAPONS DEFINITION
// ============================================================================
export interface WeaponDef {
  id: string;
  slotKey: string;
  name: string;
  icon: string;
  damage: number;
  maxAmmo: number;
  fireRateDelay: number;
  reloadDuration: number;
  pointCost: number;
  bulletSpread: number;
  zoomFactor: number;
  color: string;
  description: string;
  isMelee?: boolean;
}

const WEAPONS_CATALOG: WeaponDef[] = [
  {
    id: 'pistol',
    slotKey: '1',
    name: 'Tactical Pistol (9mm)',
    icon: '🔫',
    damage: 75,
    maxAmmo: 16,
    fireRateDelay: 180,
    reloadDuration: 1.2,
    pointCost: 0,
    bulletSpread: 0.015,
    zoomFactor: 1.25,
    color: '#94a3b8',
    description: 'Pistol dinas militer. 1-Hit Kill kepala zombie normal!'
  },
  {
    id: 'knife',
    slotKey: '2',
    name: 'Pisau Komando Taktis (Combat Knife)',
    icon: '🗡️',
    damage: 250,
    maxAmmo: 999,
    fireRateDelay: 160,
    reloadDuration: 0,
    pointCost: 0,
    bulletSpread: 0,
    zoomFactor: 1.0,
    color: '#e2e8f0',
    description: 'Tebasan pisau instan super mematikan tanpa perlu reload peluru!',
    isMelee: true
  },
  {
    id: 'smg',
    slotKey: '3',
    name: 'MP5 Tactical Submachine',
    icon: '⚡',
    damage: 48,
    maxAmmo: 40,
    fireRateDelay: 90,
    reloadDuration: 1.6,
    pointCost: 100,
    bulletSpread: 0.035,
    zoomFactor: 1.35,
    color: '#38bdf8',
    description: 'Laju tembak super cepat untuk melibas serbuan massal.'
  },
  {
    id: 'shotgun',
    slotKey: '4',
    name: 'SPAS-12 Combat Shotgun',
    icon: '💥',
    damage: 220,
    maxAmmo: 10,
    fireRateDelay: 480,
    reloadDuration: 2.0,
    pointCost: 220,
    bulletSpread: 0.09,
    zoomFactor: 1.15,
    color: '#f59e0b',
    description: 'Semburan peluru gotri dengan daya hancur luar biasa.'
  },
  {
    id: 'rifle',
    slotKey: '5',
    name: 'M4A1 SOPMOD Assault Rifle',
    icon: '🎖️',
    damage: 110,
    maxAmmo: 35,
    fireRateDelay: 110,
    reloadDuration: 1.8,
    pointCost: 450,
    bulletSpread: 0.015,
    zoomFactor: 1.85,
    color: '#10b981',
    description: 'Senapan serbu militer standar pasukan khusus berakurasi tinggi.'
  },
  {
    id: 'sniper',
    slotKey: '6',
    name: 'AWM .50 Cal Heavy Sniper',
    icon: '🎯',
    damage: 600,
    maxAmmo: 6,
    fireRateDelay: 800,
    reloadDuration: 2.4,
    pointCost: 800,
    bulletSpread: 0.001,
    zoomFactor: 3.2,
    color: '#ec4899',
    description: '1-Shot 1-Kill dengan Scope Pembidik Jarak Jauh ekstrim.'
  },
  {
    id: 'plasma',
    slotKey: '7',
    name: 'Raygun Plasma Cannon',
    icon: '🌌',
    damage: 350,
    maxAmmo: 45,
    fireRateDelay: 140,
    reloadDuration: 2.2,
    pointCost: 1200,
    bulletSpread: 0.01,
    zoomFactor: 2.0,
    color: '#a855f7',
    description: 'Senjata laser futuristik penembus armor tank & bos mutan.'
  },
  {
    id: 'minigun',
    slotKey: '8',
    name: 'M134 Vulcan Minigun (Gatling)',
    icon: '🌪️',
    damage: 120,
    maxAmmo: 150,
    fireRateDelay: 50,
    reloadDuration: 2.8,
    pointCost: 1600,
    bulletSpread: 0.03,
    zoomFactor: 1.4,
    color: '#f59e0b',
    description: 'Senapan putar 6-laras 6000 RPM untuk meratakan seluruh gerombolan musuh!'
  },
  {
    id: 'bfg',
    slotKey: '9',
    name: 'BFG-9000 Doom Cannon (OP Superweapon)',
    icon: '☣️',
    damage: 2000,
    maxAmmo: 8,
    fireRateDelay: 1000,
    reloadDuration: 2.8,
    pointCost: 2400,
    bulletSpread: 0.005,
    zoomFactor: 2.2,
    color: '#22c55e',
    description: 'Super-Weapon legendaris dengan ledakan gelombang plasma hijau nuklir pemusnah masal!'
  }
];

// ============================================================================
// MATH QUIZ GENERATOR
// ============================================================================
interface SoldierMathQuiz {
  prompt: string;
  correctAnswer: number;
  options: number[];
  correctIndex: number;
  rewardType: 'weapon' | 'medkit' | 'grenade' | 'airstrike' | 'fence_repair' | 'fence_upgrade';
  targetWeapon?: WeaponDef;
}

function generateSoldierQuiz(op: MathOp, rewardType: 'weapon' | 'medkit' | 'grenade' | 'airstrike' | 'fence_repair' | 'fence_upgrade', targetWeapon?: WeaponDef): SoldierMathQuiz {
  let activeOp = op;
  if (activeOp === 'all') {
    const list: MathOp[] = ['add', 'sub', 'mul', 'div'];
    activeOp = list[Math.floor(Math.random() * list.length)];
  }

  let prompt = '';
  let correct = 0;

  if (activeOp === 'add') {
    const a = Math.floor(Math.random() * 50) + 12;
    const b = Math.floor(Math.random() * 50) + 12;
    correct = a + b;
    prompt = `${a} + ${b} = ?`;
  } else if (activeOp === 'sub') {
    const a = Math.floor(Math.random() * 75) + 30;
    const b = Math.floor(Math.random() * (a - 15)) + 10;
    correct = a - b;
    prompt = `${a} - ${b} = ?`;
  } else if (activeOp === 'mul') {
    const a = Math.floor(Math.random() * 12) + 3;
    const b = Math.floor(Math.random() * 12) + 3;
    correct = a * b;
    prompt = `${a} × ${b} = ?`;
  } else {
    const b = Math.floor(Math.random() * 11) + 2;
    const res = Math.floor(Math.random() * 12) + 2;
    const a = b * res;
    correct = res;
    prompt = `${a} : ${b} = ?`;
  }

  const set = new Set<number>([correct]);
  while (set.size < 4) {
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
    correctIndex,
    rewardType,
    targetWeapon
  };
}

// ============================================================================
// ENEMY ENTITY & PARTICLES
// ============================================================================
interface EnemyEntity {
  id: number;
  x: number;
  z: number;
  y: number;
  faction: EnemyFaction;
  type: 'walker' | 'runner' | 'toxic' | 'goliath' | 'boss' | 'tank' | 'soldier_rifle' | 'soldier_sniper' | 'soldier_heavy';
  maxHp: number;
  hp: number;
  speed: number;
  damage: number;
  size: number;
  color: string;
  pointsReward: number;
  walkCycle: number;
  hitFlash: number;
  shootCooldown: number;
  isShooting: boolean;
  attackCooldown: number;
}

interface ParticleFX {
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

interface DroppedItem {
  id: number;
  type: 'medkit' | 'ammo' | 'grenade';
  x: number;
  y: number;
  z: number;
  life: number;
}

interface ActiveGrenade {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  arcHeight: number;
}

interface ActiveAirstrike {
  targetX: number;
  targetY: number;
  timer: number;
  missileY: number;
  exploded: boolean;
}

interface EnemyBulletTracer {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  isHitPlayer: boolean;
}

export default function MathSoldierGame({ onBackToMenu, onAddScore }: MathSoldierGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game Configuration & States
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'day_clear' | 'game_over' | 'victory'>('lobby');
  const [selectedFaction, setSelectedFaction] = useState<EnemyFaction>('zombies');
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>('normal');
  const [selectedOp] = useState<MathOp>('all');
  const [day, setDay] = useState(1);
  const [dayEnemiesRemaining, setDayEnemiesRemaining] = useState(6);
  const [totalDayEnemies, setTotalDayEnemies] = useState(6);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(120);
  const [enemiesKilled, setEnemiesKilled] = useState(0);

  // Pause State
  const [isPaused, setIsPaused] = useState(false);

  // Soldier Stats
  const [playerHp, setPlayerHp] = useState(100);
  const [medkitCount, setMedkitCount] = useState(2);
  const [equippedWeaponId, setEquippedWeaponId] = useState<string>('pistol');
  const [unlockedWeapons, setUnlockedWeapons] = useState<string[]>(['pistol', 'knife']);
  const [currentAmmo, setCurrentAmmo] = useState(14);
  const [isReloading, setIsReloading] = useState(false);
  const [isScoped, setIsScoped] = useState(false);

  // Front Perimeter Barbed Wire Defense Fence System
  const [fenceHp, setFenceHp] = useState(350);
  const [fenceMaxHp, setFenceMaxHp] = useState(350);
  const [fenceLevel, setFenceLevel] = useState(1);
  const fenceHpRef = useRef(350);
  fenceHpRef.current = fenceHp;

  // Tactical Skills (Grenade & Missile Airstrike with 15s cooldown)
  const [grenadeCount, setGrenadeCount] = useState(3);
  const [airstrikeCooldown, setAirstrikeCooldown] = useState(0); // 15s countdown
  const [activeSkillAim, setActiveSkillAim] = useState<'none' | 'grenade' | 'airstrike'>('none');

  // Shop & Math Quiz Modal
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<SoldierMathQuiz | null>(null);
  const [quizAnswerFeedback, setQuizAnswerFeedback] = useState<number | null>(null);

  // Notifications
  const [floatNotice, setFloatNotice] = useState<{ text: string; id: number; color?: string } | null>(null);

  // Engine Refs
  const currentWeapon = WEAPONS_CATALOG.find(w => w.id === equippedWeaponId) || WEAPONS_CATALOG[0];
  const weaponRef = useRef<WeaponDef>(currentWeapon);
  weaponRef.current = currentWeapon;

  const playerPosRef = useRef({ x: 0, z: 0, vx: 0, vz: 0, isJumping: false, jumpY: 0, jumpVy: 0 });
  const walkBobRef = useRef(0);

  const mouseAimRef = useRef({ x: 500, y: 300 });
  const isScopedRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const lastShotTimeRef = useRef(0);
  const reloadTimerRef = useRef(0);
  const meleeSlashTimerRef = useRef(0);
  const keysPressed = useRef<{ [k: string]: boolean }>({});

  const enemiesRef = useRef<EnemyEntity[]>([]);
  const particlesRef = useRef<ParticleFX[]>([]);
  const droppedItemsRef = useRef<DroppedItem[]>([]);
  const grenadesRef = useRef<ActiveGrenade[]>([]);
  const airstrikesRef = useRef<ActiveAirstrike[]>([]);
  const enemyBulletsRef = useRef<EnemyBulletTracer[]>([]);

  const screenShakeRef = useRef(0);
  const gunRecoilRef = useRef({ x: 0, y: 0 });
  const muzzleFlashTimerRef = useRef(0);
  const nextEnemyId = useRef(1);

  // Day Enemy Spawner Manager
  const dayEnemiesToSpawnRef = useRef(6);
  const dayEnemiesSpawnedRef = useRef(0);
  const daySpawnIntervalRef = useRef(2000);
  const lastSpawnTime = useRef(0);

  // Calculate day enemies with smooth, fun progression
  const getEnemiesForDay = (d: number, diff: GameDifficulty) => {
    const mult = diff === 'easy' ? 0.75 : diff === 'hard' ? 1.25 : diff === 'nightmare' ? 1.5 : 1.0;
    if (d === 1) return Math.round(5 * mult);
    if (d === 2) return Math.round(7 * mult);
    if (d === 3) return Math.round(9 * mult);
    if (d === 4) return Math.round(12 * mult);
    if (d === 5) return Math.round(15 * mult); // Miniboss
    if (d === 6) return Math.round(18 * mult);
    if (d === 7) return Math.round(22 * mult);
    if (d === 8) return Math.round(26 * mult);
    if (d === 9) return Math.round(30 * mult);
    if (d === 10) return Math.round(38 * mult); // Final Boss
    return Math.round((5 + d * 3.2) * mult);
  };

  // --------------------------------------------------------------------------
  // SPAWN ENEMY
  // --------------------------------------------------------------------------
  const spawnEnemy = useCallback((currentDay: number, faction: EnemyFaction, diff: GameDifficulty) => {
    const id = nextEnemyId.current++;
    const isBossDay = currentDay === 10 || currentDay === 5;
    const isBossSpawn = isBossDay && dayEnemiesSpawnedRef.current === dayEnemiesToSpawnRef.current - 1;

    // Difficulty multipliers
    const hpMult = diff === 'easy' ? 0.7 : diff === 'hard' ? 1.25 : diff === 'nightmare' ? 1.5 : 1.0;
    const spdMult = diff === 'easy' ? 0.75 : diff === 'hard' ? 1.15 : diff === 'nightmare' ? 1.3 : 1.0;
    const dmgMult = diff === 'easy' ? 0.6 : diff === 'hard' ? 1.2 : diff === 'nightmare' ? 1.5 : 1.0;

    let type: EnemyEntity['type'] = 'walker';
    let maxHp = Math.round((28 + currentDay * 3) * hpMult);
    let speed = (20 + Math.random() * 8) * spdMult;
    let damage = Math.round(6 * dmgMult);
    let size = 34;
    let color = '#22c55e';
    let pointsReward = 35;
    let shootCooldown = 0;

    if (faction === 'zombies') {
      // PURE ZOMBIE ROSTER (SIMPLE & FUN ZOMBIE POPPING!)
      if (isBossSpawn) {
        type = 'boss'; // Mutant Titan Zombie Boss (Day 10)
        maxHp = Math.round((420 + currentDay * 30) * hpMult);
        speed = 16 * spdMult;
        damage = Math.round(22 * dmgMult);
        size = 68;
        color = '#ef4444';
        pointsReward = 500;
      } else if (currentDay >= 6 && Math.random() < 0.2) {
        type = 'goliath'; // Giant Big Zombie (Appears only starting Day 6)
        maxHp = Math.round((160 + currentDay * 15) * hpMult);
        speed = 14 * spdMult;
        damage = Math.round(15 * dmgMult);
        size = 56;
        color = '#15803d';
        pointsReward = 180;
      } else if (Math.random() < 0.2 && currentDay >= 4) {
        type = 'runner'; // Fast runner (fragile)
        maxHp = Math.round((18 + currentDay * 2) * hpMult);
        speed = (45 + Math.random() * 10) * spdMult;
        damage = Math.round(5 * dmgMult);
        size = 28;
        color = '#eab308';
        pointsReward = 45;
      } else if (Math.random() < 0.25 && currentDay >= 5) {
        type = 'toxic';
        maxHp = Math.round((50 + currentDay * 5) * hpMult);
        speed = 22 * spdMult;
        damage = Math.round(10 * dmgMult);
        size = 38;
        color = '#a855f7';
        pointsReward = 55;
      }
    } else {
      // Enemy Soldiers Faction (Warzone with Tanks)
      const isTankDay = currentDay >= 6 && Math.random() < 0.25;
      if (isBossSpawn) {
        type = 'soldier_heavy';
        maxHp = Math.round((450 + currentDay * 40) * hpMult);
        speed = 22 * spdMult;
        damage = Math.round(20 * dmgMult);
        size = 48;
        color = '#dc2626';
        pointsReward = 380;
        shootCooldown = 1800;
      } else if (isTankDay) {
        type = 'tank';
        maxHp = Math.round((380 + currentDay * 35) * hpMult);
        speed = 16 * spdMult;
        damage = Math.round(22 * dmgMult);
        size = 56;
        color = '#451a03';
        pointsReward = 250;
        shootCooldown = 2500;
      } else if (Math.random() < 0.3 && currentDay >= 2) {
        type = 'soldier_sniper';
        maxHp = Math.round((45 + currentDay * 5) * hpMult);
        speed = 24 * spdMult;
        damage = Math.round(18 * dmgMult);
        size = 32;
        color = '#ec4899';
        pointsReward = 60;
        shootCooldown = 2600;
      } else {
        type = 'soldier_rifle';
        maxHp = Math.round((50 + currentDay * 6) * hpMult);
        speed = 32 * spdMult;
        damage = Math.round(8 * dmgMult);
        size = 34;
        color = '#f59e0b';
        pointsReward = 45;
        shootCooldown = 1500 + Math.random() * 800;
      }
    }

    // Spawn X clamped tightly within visible screen field
    const spawnX = (Math.random() - 0.5) * 360;
    const spawnZ = 850 + Math.random() * 150;

    enemiesRef.current.push({
      id,
      x: spawnX,
      z: spawnZ,
      y: 0,
      faction,
      type,
      maxHp,
      hp: maxHp,
      speed,
      damage,
      size,
      color,
      pointsReward,
      walkCycle: Math.random() * Math.PI * 2,
      hitFlash: 0,
      shootCooldown,
      isShooting: false,
      attackCooldown: 0
    });
  }, []);

  // --------------------------------------------------------------------------
  // START GAME & INITIALIZE
  // --------------------------------------------------------------------------
  const startGame = (faction: EnemyFaction, diff: GameDifficulty = selectedDifficulty) => {
    setSelectedFaction(faction);
    setSelectedDifficulty(diff);
    setGameState('playing');
    setIsPaused(false);
    setPlayerHp(100);
    setScore(0);
    setPoints(200); // 200 starting points
    setDay(1);
    setMedkitCount(3);

    // Initialize Barbed Wire Defense Fence (Solid 500 HP)
    setFenceHp(500);
    setFenceMaxHp(500);
    setFenceLevel(1);
    fenceHpRef.current = 500;

    const firstDayCount = getEnemiesForDay(1, diff);
    setTotalDayEnemies(firstDayCount);
    setDayEnemiesRemaining(firstDayCount);

    setEnemiesKilled(0);
    setEquippedWeaponId('pistol');
    setUnlockedWeapons(['pistol', 'knife']);
    setCurrentAmmo(16);
    setIsReloading(false);
    setIsScoped(false);
    setGrenadeCount(3);
    setAirstrikeCooldown(0);
    setActiveSkillAim('none');
    isScopedRef.current = false;
    reloadTimerRef.current = 0;
    meleeSlashTimerRef.current = 0;

    playerPosRef.current = { x: 0, z: 0, vx: 0, vz: 0, isJumping: false, jumpY: 0, jumpVy: 0 };
    enemiesRef.current = [];
    particlesRef.current = [];
    droppedItemsRef.current = [];
    grenadesRef.current = [];
    airstrikesRef.current = [];
    enemyBulletsRef.current = [];
    nextEnemyId.current = 1;

    dayEnemiesToSpawnRef.current = firstDayCount;
    dayEnemiesSpawnedRef.current = 0;
    daySpawnIntervalRef.current = 1750;
    lastSpawnTime.current = performance.now();
    setFloatNotice({
      text: `🎖️ DAY 1 MEMULAI MISI (${diff.toUpperCase()}) - BASMI ${firstDayCount} MUSUH!`,
      id: Date.now(),
      color: '#facc15'
    });
  };

  // Advance to next day
  const startNextDay = useCallback((nextD: number) => {
    if (nextD > 10) {
      setGameState('victory');
      if (onAddScore) onAddScore(score + 1000);
      return;
    }
    setDay(nextD);
    setGameState('playing');
    setIsPaused(false);

    // Day bonus & repair fence +150 HP
    setPlayerHp(h => Math.min(100, h + 40));
    setFenceHp(h => {
      const nextHp = Math.min(fenceMaxHp, h + 150);
      fenceHpRef.current = nextHp;
      return nextHp;
    });
    setPoints(p => p + 200);

    const count = getEnemiesForDay(nextD, selectedDifficulty);
    setTotalDayEnemies(count);
    setDayEnemiesRemaining(count);

    dayEnemiesToSpawnRef.current = count;
    dayEnemiesSpawnedRef.current = 0;
    daySpawnIntervalRef.current = Math.max(1300, 2300 - nextD * 80);
    lastSpawnTime.current = performance.now();

    enemiesRef.current = [];
    grenadesRef.current = [];
    airstrikesRef.current = [];
    enemyBulletsRef.current = [];

    const isBoss = nextD === 10 ? '👑 FINAL BOSS WAR' : nextD === 7 ? '🛡️ HEAVY ASSAULT' : nextD === 5 ? '⚠️ MINIBOSS ENCOUNTER' : `DAY ${nextD}`;
    setFloatNotice({
      text: `☀️ ${isBoss} DIMULAI! BASMI ${count} TARGET!`,
      id: Date.now(),
      color: '#38bdf8'
    });
  }, [score, selectedDifficulty, fenceMaxHp, onAddScore]);

  // --------------------------------------------------------------------------
  // HEAL WITH MEDKIT (HOTKEY 'H')
  // --------------------------------------------------------------------------
  const triggerUseMedkit = useCallback(() => {
    if (medkitCount <= 0) {
      setFloatNotice({ text: '❌ Medkit habis! Beli di Toko (B).', id: Date.now(), color: '#ef4444' });
      return;
    }
    if (playerHp >= 100) {
      setFloatNotice({ text: '❤️ HP Anda sudah penuh (100 HP)!', id: Date.now(), color: '#38bdf8' });
      return;
    }
    setMedkitCount(m => m - 1);
    setPlayerHp(h => Math.min(100, h + 50));
    soldierSounds.playHeal();
    setFloatNotice({ text: '💚 +50 HP PULIH DENGAN MEDKIT!', id: Date.now(), color: '#4ade80' });

    // Green healing particles
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push({
        x: 500 + (Math.random() - 0.5) * 200,
        y: 400 + (Math.random() - 0.5) * 150,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 4 - 2,
        color: '#4ade80',
        size: Math.random() * 6 + 3,
        alpha: 1,
        life: 0,
        maxLife: 30
      });
    }
  }, [medkitCount, playerHp]);

  // --------------------------------------------------------------------------
  // RELOAD WEAPON
  // --------------------------------------------------------------------------
  const triggerReload = useCallback(() => {
    const w = weaponRef.current;
    if (w.isMelee) return;
    if (reloadTimerRef.current > 0 || currentAmmo === w.maxAmmo) return;

    reloadTimerRef.current = w.reloadDuration;
    setIsReloading(true);
    soldierSounds.playReload();
    setFloatNotice({ text: `🔄 RELOAD ${w.name}... (${w.reloadDuration}s)`, id: Date.now() });
  }, [currentAmmo]);

  // --------------------------------------------------------------------------
  // TACTICAL SKILLS (GRENADE & 15S COOLDOWN AIRSTRIKE)
  // --------------------------------------------------------------------------
  const triggerGrenadeThrow = useCallback(() => {
    if (grenadeCount <= 0 || gameState !== 'playing' || isPaused) {
      setFloatNotice({ text: '❌ Granat habis! Beli di Toko (B).', id: Date.now(), color: '#ef4444' });
      return;
    }
    setGrenadeCount(g => g - 1);
    soldierSounds.playReload();

    const targetX = mouseAimRef.current.x;
    const targetY = mouseAimRef.current.y;

    grenadesRef.current.push({
      x: 500,
      y: 560,
      targetX,
      targetY,
      progress: 0,
      arcHeight: 120
    });

    setFloatNotice({ text: '💣 GRANAT DILEMPAR! (EXPLOSIVE 650 DMG)', id: Date.now(), color: '#f59e0b' });
  }, [grenadeCount, gameState, isPaused]);

  const triggerAirstrikeCall = useCallback(() => {
    if (airstrikeCooldown > 0 || gameState !== 'playing' || isPaused) {
      setFloatNotice({ text: `⏳ Misil Udara Cooldown (${Math.ceil(airstrikeCooldown)}s)!`, id: Date.now(), color: '#ef4444' });
      return;
    }
    setAirstrikeCooldown(15.0); // 15s cooldown
    soldierSounds.playMissileSiren();

    const targetX = mouseAimRef.current.x;
    const targetY = mouseAimRef.current.y;

    airstrikesRef.current.push({
      targetX,
      targetY,
      timer: 1.5,
      missileY: -100,
      exploded: false
    });

    setFloatNotice({ text: '🚨 CRUISE MISSILE DILUNCURKAN! (MEGA 2500 DMG)', id: Date.now(), color: '#ef4444' });
  }, [airstrikeCooldown, gameState, isPaused]);

  // --------------------------------------------------------------------------
  // SHOOT WEAPON OR MELEE SLASH
  // --------------------------------------------------------------------------
  const triggerShoot = useCallback(() => {
    if (gameState !== 'playing' || isPaused || isShopOpen || activeQuiz) return;

    if (activeSkillAim === 'grenade') {
      triggerGrenadeThrow();
      setActiveSkillAim('none');
      return;
    } else if (activeSkillAim === 'airstrike') {
      triggerAirstrikeCall();
      setActiveSkillAim('none');
      return;
    }

    const now = performance.now();
    const w = weaponRef.current;

    // MELEE KNIFE SLASH ATTACK
    if (w.isMelee) {
      if (now - lastShotTimeRef.current < w.fireRateDelay) return;
      lastShotTimeRef.current = now;
      meleeSlashTimerRef.current = 10;
      soldierSounds.playKnifeSlash();
      screenShakeRef.current = 6;

      const aimX = mouseAimRef.current.x;
      const aimY = mouseAimRef.current.y;
      const p = playerPosRef.current;

      // Close combat knife slash hit check on enemies
      enemiesRef.current.forEach((e) => {
        const fov = 400;
        const relZ = e.z - p.z;
        if (relZ <= 20 || relZ > 450) return;

        const screenX = 500 + (e.x - p.x) * (fov / relZ);
        const screenY = 320 + (e.y - p.jumpY) * (fov / relZ);
        const screenRadius = (e.size * 260) / relZ;

        if (Math.hypot(aimX - screenX, aimY - screenY) < screenRadius * 1.6) {
          e.hp -= w.damage;
          e.hitFlash = 8;
          soldierSounds.playExplosion();

          for (let pt = 0; pt < 15; pt++) {
            particlesRef.current.push({
              x: screenX,
              y: screenY,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8 - 2,
              color: '#f87171',
              size: Math.random() * 5 + 3,
              alpha: 1,
              life: 0,
              maxLife: 20
            });
          }

          if (e.hp <= 0) {
            setScore(s => s + e.pointsReward);
            setPoints(pts => pts + e.pointsReward);
            setEnemiesKilled(k => k + 1);
            setDayEnemiesRemaining(r => Math.max(0, r - 1));
            enemiesRef.current = enemiesRef.current.filter(item => item.id !== e.id);
          }
        }
      });
      return;
    }

    // FIREARM BULLET SHOOTING
    if (reloadTimerRef.current > 0) {
      soldierSounds.playEnemyGunfireMiss();
      return;
    }

    if (currentAmmo <= 0) {
      triggerReload();
      return;
    }

    if (now - lastShotTimeRef.current < w.fireRateDelay) return;
    lastShotTimeRef.current = now;

    // Deduct ammo
    const newAmmo = currentAmmo - 1;
    setCurrentAmmo(newAmmo);
    if (newAmmo <= 0) {
      triggerReload();
    }

    // Audio by weapon type
    if (w.id === 'pistol') soldierSounds.playPistol();
    else if (w.id === 'smg' || w.id === 'rifle') soldierSounds.playRifle();
    else if (w.id === 'shotgun') soldierSounds.playShotgun();
    else if (w.id === 'sniper') soldierSounds.playSniper();
    else if (w.id === 'plasma') soldierSounds.playPlasma();
    else if (w.id === 'minigun') soldierSounds.playMinigun();
    else if (w.id === 'bfg_cannon') soldierSounds.playBFG();

    // Muzzle flash & recoil
    muzzleFlashTimerRef.current = 6;
    screenShakeRef.current = w.id === 'bfg_cannon' ? 22 : w.id === 'shotgun' || w.id === 'sniper' ? 12 : 5;
    gunRecoilRef.current = {
      x: (Math.random() - 0.5) * 8,
      y: w.id === 'bfg_cannon' ? -30 : w.id === 'sniper' ? -24 : -14
    };

    const aimX = mouseAimRef.current.x;
    const aimY = mouseAimRef.current.y;
    const p = playerPosRef.current;

    const sortedEnemies = [...enemiesRef.current].sort((a, b) => a.z - b.z);
    let hitCount = 0;
    const maxHits = w.id === 'bfg_cannon' ? 8 : w.id === 'shotgun' ? 3 : w.id === 'plasma' ? 4 : w.id === 'minigun' ? 2 : 1;

    for (const e of sortedEnemies) {
      const fov = 400;
      const relZ = e.z - p.z;
      if (relZ <= 30 || relZ > 1100) continue;

      const screenX = 500 + (e.x - p.x) * (fov / relZ);
      const screenY = 320 + (e.y - p.jumpY) * (fov / relZ) - (e.size * 250 / relZ) / 2;
      const screenRadius = (e.size * 260) / relZ;

      const dist = Math.hypot(aimX - screenX, aimY - screenY);

      if (dist < screenRadius * (isScopedRef.current ? 1.4 : w.id === 'bfg_cannon' ? 2.5 : 1.1)) {
        hitCount++;

        const isHeadshot = (aimY - screenY) < -screenRadius * 0.3 && e.type !== 'tank';
        const finalDmg = isHeadshot ? Math.round(w.damage * 2.5) : w.damage;

        e.hp -= finalDmg;
        e.hitFlash = 6;

        if (isHeadshot) {
          soldierSounds.playHitHeadshot();
          setFloatNotice({ text: '💥 CRITICAL HEADSHOT! (2.5x DMG)', id: Date.now(), color: '#facc15' });
        } else {
          soldierSounds.playEnemyGunfireMiss();
        }

        if (w.id === 'bfg_cannon') {
          soldierSounds.playExplosion();
        }

        for (let pt = 0; pt < (isHeadshot ? 18 : w.id === 'bfg_cannon' ? 24 : 10); pt++) {
          particlesRef.current.push({
            x: screenX,
            y: screenY,
            vx: (Math.random() - 0.5) * (w.id === 'bfg_cannon' ? 14 : 9),
            vy: (Math.random() - 0.5) * 9 - 3,
            color: w.id === 'bfg_cannon' ? (pt % 2 === 0 ? '#22c55e' : '#a855f7') : e.type === 'tank' ? '#94a3b8' : e.faction === 'zombies' ? (e.type === 'toxic' ? '#a855f7' : '#ef4444') : '#f59e0b',
            size: Math.random() * 6 + 3,
            alpha: 1,
            life: 0,
            maxLife: 25
          });
        }

        if (e.hp <= 0) {
          soldierSounds.playExplosion();
          const bonusPts = isHeadshot ? e.pointsReward * 2 : e.pointsReward;
          setScore(s => s + bonusPts);
          setPoints(pts => pts + bonusPts);
          setEnemiesKilled(k => k + 1);
          setDayEnemiesRemaining(r => Math.max(0, r - 1));

          // Drop Medkit chance (25% or 100% on Tank/Boss/Goliath)
          if (Math.random() < 0.25 || e.type === 'tank' || e.type === 'boss' || e.type === 'goliath') {
            droppedItemsRef.current.push({
              id: Date.now() + Math.random(),
              type: 'medkit',
              x: e.x,
              y: e.y,
              z: e.z,
              life: 15
            });
            setFloatNotice({ text: '💊 MEDKIT JATUH DARI MUSUH! (+50 HP)', id: Date.now(), color: '#4ade80' });
            setMedkitCount(m => m + 1);
          }

          for (let pt = 0; pt < 25; pt++) {
            particlesRef.current.push({
              x: screenX,
              y: screenY,
              vx: (Math.random() - 0.5) * 12,
              vy: (Math.random() - 0.5) * 12 - 4,
              color: isHeadshot ? '#facc15' : e.type === 'tank' ? '#f97316' : '#ef4444',
              size: Math.random() * 6 + 4,
              alpha: 1,
              life: 0,
              maxLife: 30
            });
          }

          enemiesRef.current = enemiesRef.current.filter(item => item.id !== e.id);
        }

        if (hitCount >= maxHits) break;
      }
    }
  }, [gameState, isPaused, isShopOpen, activeQuiz, activeSkillAim, currentAmmo, triggerGrenadeThrow, triggerAirstrikeCall, triggerReload]);

  // --------------------------------------------------------------------------
  // WEAPON UPGRADE & SHOP MATH QUIZ HANDLERS
  // --------------------------------------------------------------------------
  const handleOpenWeaponQuiz = (targetW: WeaponDef) => {
    if (points < targetW.pointCost) {
      setFloatNotice({ text: `❌ Poin tidak cukup! Butuh ${targetW.pointCost} Poin.`, id: Date.now(), color: '#ef4444' });
      return;
    }
    const quiz = generateSoldierQuiz(selectedOp, 'weapon', targetW);
    setActiveQuiz(quiz);
    setQuizAnswerFeedback(null);
  };

  const handleOpenSkillQuiz = (type: 'medkit' | 'grenade' | 'airstrike' | 'fence_repair' | 'fence_upgrade') => {
    const cost = type === 'medkit' ? 80 : type === 'grenade' ? 100 : type === 'airstrike' ? 200 : type === 'fence_repair' ? 120 : 250;
    if (points < cost) {
      setFloatNotice({ text: `❌ Poin tidak cukup! Butuh ${cost} Poin.`, id: Date.now(), color: '#ef4444' });
      return;
    }
    const quiz = generateSoldierQuiz(selectedOp, type);
    setActiveQuiz(quiz);
    setQuizAnswerFeedback(null);
  };

  const handleAnswerQuiz = (chosenIdx: number) => {
    if (!activeQuiz) return;
    setQuizAnswerFeedback(chosenIdx);

    const isCorrect = chosenIdx === activeQuiz.correctIndex;

    if (isCorrect) {
      soldierSounds.playUpgradeSuccess();

      if (activeQuiz.rewardType === 'weapon' && activeQuiz.targetWeapon) {
        const targetW = activeQuiz.targetWeapon;
        setPoints(p => p - targetW.pointCost);
        setUnlockedWeapons(prev => [...new Set([...prev, targetW.id])]);
        setEquippedWeaponId(targetW.id);
        setCurrentAmmo(targetW.maxAmmo);
        setFloatNotice({ text: `🎉 SENJATA BARU: ${targetW.name}!`, id: Date.now(), color: '#4ade80' });
      } else if (activeQuiz.rewardType === 'medkit') {
        setPoints(p => p - 80);
        setMedkitCount(m => m + 1);
        setFloatNotice({ text: '💊 +1 MEDKIT DIPEROLEH (Tekan [H] untuk Heal)!', id: Date.now(), color: '#4ade80' });
      } else if (activeQuiz.rewardType === 'grenade') {
        setPoints(p => p - 100);
        setGrenadeCount(g => g + 3);
        setFloatNotice({ text: '💣 +3 GRANAT MILITER DIPEROLEH!', id: Date.now(), color: '#4ade80' });
      } else if (activeQuiz.rewardType === 'airstrike') {
        setPoints(p => p - 200);
        setAirstrikeCooldown(0); // Instantly ready
        setFloatNotice({ text: '🚨 MISIL UDARA SIAP TEMBAK!', id: Date.now(), color: '#4ade80' });
      } else if (activeQuiz.rewardType === 'fence_repair') {
        setPoints(p => p - 120);
        setFenceHp(h => {
          const nextVal = Math.min(fenceMaxHp, h + 250);
          fenceHpRef.current = nextVal;
          return nextVal;
        });
        setFloatNotice({ text: '🛡️ PAGAR BERHASIL DIPERBAIKI (+250 HP)!', id: Date.now(), color: '#4ade80' });
      } else if (activeQuiz.rewardType === 'fence_upgrade') {
        setPoints(p => p - 250);
        setFenceLevel(lvl => lvl + 1);
        setFenceMaxHp(max => max + 300);
        setFenceHp(h => {
          const nextVal = h + 300;
          fenceHpRef.current = nextVal;
          return nextVal;
        });
        setFloatNotice({ text: '⚡ PAGAR UPGRADE: LISTRIK TEGANGAN TINGGI & +300 HP!', id: Date.now(), color: '#38bdf8' });
      }

      setTimeout(() => {
        setActiveQuiz(null);
        setQuizAnswerFeedback(null);
        setIsShopOpen(false);
      }, 600);
    } else {
      soldierSounds.playPlayerHurt();
      setFloatNotice({ text: '❌ JAWABAN SALAH! Coba hitung lagi.', id: Date.now(), color: '#ef4444' });
      setTimeout(() => {
        setQuizAnswerFeedback(null);
      }, 700);
    }
  };

  // --------------------------------------------------------------------------
  // KEYBOARD & MOUSE CONTROLS (WASD, SPACE, CLICK, R, G, F, H, P, B, 1-9)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;
      keysPressed.current[e.code] = true;

      // Pause Game with 'P' or 'Escape'
      if (key === 'p' || e.code === 'Escape') {
        if (gameState === 'playing' && !activeQuiz && !isShopOpen) {
          setIsPaused(prev => !prev);
        }
      }

      // Quick Switch Weapons with '1' - '9'
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        const targetW = WEAPONS_CATALOG.find(w => w.slotKey === e.key);
        if (targetW && unlockedWeapons.includes(targetW.id)) {
          setEquippedWeaponId(targetW.id);
          if (targetW.isMelee) {
            setIsScoped(false);
            isScopedRef.current = false;
          }
          setCurrentAmmo(targetW.maxAmmo);
          soldierSounds.playReload();
          setFloatNotice({ text: `Equipped [${targetW.slotKey}]: ${targetW.name}`, id: Date.now() });
        }
      }

      if (e.code === 'Space') {
        e.preventDefault();
        const p = playerPosRef.current;
        if (!p.isJumping) {
          p.isJumping = true;
          p.jumpVy = 460;
        }
      }

      if (key === 'r') {
        e.preventDefault();
        triggerReload();
      }

      if (key === 'h') {
        e.preventDefault();
        triggerUseMedkit();
      }

      if (key === 'g') {
        e.preventDefault();
        triggerGrenadeThrow();
      }

      if (key === 'f') {
        e.preventDefault();
        triggerAirstrikeCall();
      }

      if (key === 'b' || key === 'e') {
        e.preventDefault();
        if (gameState === 'playing' && !activeQuiz) {
          setIsShopOpen(prev => {
            const nextVal = !prev;
            if (nextVal) {
              setFloatNotice({ text: '🛒 Toko Persenjataan & Pertahanan Dibuka! (Game Dijeda)', id: Date.now(), color: '#facc15' });
            }
            return nextVal;
          });
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = false;
      keysPressed.current[e.code] = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isMouseDownRef.current = true;
        triggerShoot();
      } else if (e.button === 2) {
        e.preventDefault();
        const w = weaponRef.current;
        if (w.isMelee) {
          setFloatNotice({ text: '🗡️ Pisau tidak memiliki Scope ADS!', id: Date.now(), color: '#f59e0b' });
          setIsScoped(false);
          isScopedRef.current = false;
          return;
        }
        if (activeSkillAim === 'grenade') {
          setFloatNotice({ text: '💣 Granat tidak menggunakan Scope!', id: Date.now(), color: '#f59e0b' });
          setIsScoped(false);
          isScopedRef.current = false;
          return;
        }
        isScopedRef.current = !isScopedRef.current;
        setIsScoped(isScopedRef.current);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        isMouseDownRef.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const rawX = (e.clientX - rect.left) * scaleX;
      const rawY = (e.clientY - rect.top) * scaleY;
      mouseAimRef.current.x = Math.max(10, Math.min(990, rawX));
      mouseAimRef.current.y = Math.max(10, Math.min(580, rawY));
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [gameState, isPaused, activeQuiz, isShopOpen, unlockedWeapons, triggerReload, triggerUseMedkit, triggerGrenadeThrow, triggerAirstrikeCall, triggerShoot]);

  // --------------------------------------------------------------------------
  // MAIN 60FPS FPS BATTLEFIELD RENDER LOOP
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
      const p = playerPosRef.current;
      const w = weaponRef.current;

      // STRICT PAUSE: Pause game if player pauses, or when Shop Modal / Math Quiz is opened!
      if (isPaused || gameState !== 'playing' || isShopOpen || activeQuiz !== null) {
        // Paused state - freeze all battlefield physics
      } else {
        if (airstrikeCooldown > 0) {
          setAirstrikeCooldown(c => Math.max(0, c - dt));
        }

        const moveSpeed = 180;
        let dx = 0;
        let dz = 0;
        if (keysPressed.current['a'] || keysPressed.current['keya'] || keysPressed.current['arrowleft']) dx -= 1;
        if (keysPressed.current['d'] || keysPressed.current['keyd'] || keysPressed.current['arrowright']) dx += 1;
        if (keysPressed.current['w'] || keysPressed.current['keyw'] || keysPressed.current['arrowup']) dz += 1;
        if (keysPressed.current['s'] || keysPressed.current['keys'] || keysPressed.current['arrowdown']) dz -= 1;

        p.x = Math.max(-320, Math.min(320, p.x + dx * moveSpeed * dt));
        p.z = Math.max(-180, Math.min(35, p.z + dz * moveSpeed * dt));

        if (dx !== 0 || dz !== 0) {
          walkBobRef.current += dt * 11;
        } else {
          walkBobRef.current *= 0.85;
        }

        if (p.isJumping) {
          p.jumpY += p.jumpVy * dt;
          p.jumpVy -= 1100 * dt;
          if (p.jumpY <= 0) {
            p.jumpY = 0;
            p.jumpVy = 0;
            p.isJumping = false;
            screenShakeRef.current = Math.max(screenShakeRef.current, 6);
          }
        }

        if (isMouseDownRef.current && (w.id === 'smg' || w.id === 'rifle' || w.id === 'plasma' || w.id === 'minigun')) {
          triggerShoot();
        }

        if (reloadTimerRef.current > 0) {
          reloadTimerRef.current -= dt;
          if (reloadTimerRef.current <= 0) {
            reloadTimerRef.current = 0;
            setIsReloading(false);
            setCurrentAmmo(w.maxAmmo);
            soldierSounds.playReloadFinish();
            setFloatNotice({ text: `✅ ${w.name} SIAP TEMBAK (${w.maxAmmo}/${w.maxAmmo})!`, id: Date.now(), color: '#4ade80' });
          }
        }

        if (meleeSlashTimerRef.current > 0) {
          meleeSlashTimerRef.current -= 1;
        }

        if (screenShakeRef.current > 0) screenShakeRef.current *= 0.88;
        gunRecoilRef.current.x *= 0.82;
        gunRecoilRef.current.y *= 0.82;
        if (muzzleFlashTimerRef.current > 0) muzzleFlashTimerRef.current -= 1;

        if (dayEnemiesSpawnedRef.current < dayEnemiesToSpawnRef.current && now - lastSpawnTime.current > daySpawnIntervalRef.current) {
          spawnEnemy(day, selectedFaction, selectedDifficulty);
          dayEnemiesSpawnedRef.current++;
          lastSpawnTime.current = now;
        }

        if (dayEnemiesSpawnedRef.current >= dayEnemiesToSpawnRef.current && enemiesRef.current.length === 0) {
          if (day >= 10) {
            setGameState('victory');
            if (onAddScore) onAddScore(score + 1500);
          } else {
            setGameState('day_clear');
          }
        }

        const remainingLivingEnemies: EnemyEntity[] = [];

        enemiesRef.current.forEach((e) => {
          e.walkCycle += dt * 5;
          if (e.hitFlash > 0) e.hitFlash--;
          if (e.attackCooldown > 0) e.attackCooldown -= dt;

          e.z -= e.speed * dt * 4;
          // Smoothly guide enemies toward the player's visible view field
          e.x += (p.x * 0.35 - e.x) * dt * 0.45;
          e.x = Math.max(-260, Math.min(260, e.x));

          const relZ = e.z - p.z;
          const fov = 400;
          const enemyScreenX = relZ > 0 ? 500 + (e.x - p.x) * (fov / relZ) : 500;
          const enemyScreenY = relZ > 0 ? 320 + (e.y - p.jumpY) * (fov / relZ) : 320;

          // 1. FRONT BARBED WIRE DEFENSE FENCE SYSTEM (PERMANENT FIXED WORLD POSITION Z = 75)
          const FENCE_WORLD_Z = 75;
          const hasFence = fenceHpRef.current > 0;

          if (hasFence) {
            // Enemies cannot walk past the stationary camp defense fence at world Z = 75
            if (e.z < FENCE_WORLD_Z) {
              e.z = FENCE_WORLD_Z;
            }

            // Enemies attack the stationary fence barrier directly instead of the player!
            if (e.z <= FENCE_WORLD_Z + 15 && e.attackCooldown <= 0 && enemyScreenX >= -40 && enemyScreenX <= 1040) {
              e.attackCooldown = 1.25;
              const dmg = e.damage;
              setFenceHp(h => {
                const nextVal = Math.max(0, h - dmg);
                fenceHpRef.current = nextVal;
                if (nextVal <= 0) {
                  soldierSounds.playExplosion();
                  screenShakeRef.current = 22;
                  setFloatNotice({ text: '🚨 PAGAR BARIKADE HANCUR! ZOMBIE MERANGSEK MASUK!', id: Date.now(), color: '#ef4444' });
                }
                return nextVal;
              });
              soldierSounds.playKnifeSlash();
              screenShakeRef.current = 6;

              // Spark particles on the stationary metal wire
              for (let sp = 0; sp < 10; sp++) {
                particlesRef.current.push({
                  x: enemyScreenX,
                  y: enemyScreenY + 20 + (Math.random() - 0.5) * 20,
                  vx: (Math.random() - 0.5) * 10,
                  vy: -Math.random() * 6 - 2,
                  color: '#facc15',
                  size: Math.random() * 4 + 2,
                  alpha: 1,
                  life: 0,
                  maxLife: 16
                });
              }
              setFloatNotice({ text: `🛡️ Pagar Barikade Diserang (-${dmg} HP Pagar)!`, id: Date.now(), color: '#f59e0b' });
            }
          } else {
            // Fence is destroyed: enemies can enter camp directly to the player!
            if (relZ <= 45 || enemyScreenY >= 570 || enemyScreenX < -80 || enemyScreenX > 1080) {
              // Deal a single contact breach damage and eliminate enemy
              setPlayerHp(h => {
                const newHp = Math.max(0, h - e.damage);
                if (newHp <= 0) {
                  setIsShopOpen(false);
                  setActiveQuiz(null);
                  setIsPaused(false);
                  setGameState('game_over');
                  soldierSounds.playPlayerHurt();
                  if (onAddScore) onAddScore(score);
                }
                return newHp;
              });
              screenShakeRef.current = 16;
              soldierSounds.playExplosion();
              soldierSounds.playPlayerHurt();
              setFloatNotice({ text: `💥 MUSUH MENEMBUS PERTAHANAN (-${e.damage} HP)!`, id: Date.now(), color: '#ef4444' });

              // Impact particles
              for (let pt = 0; pt < 22; pt++) {
                particlesRef.current.push({
                  x: Math.max(60, Math.min(940, enemyScreenX)),
                  y: Math.min(540, enemyScreenY),
                  vx: (Math.random() - 0.5) * 12,
                  vy: -Math.random() * 8 - 3,
                  color: e.faction === 'zombies' ? '#ef4444' : '#f59e0b',
                  size: Math.random() * 6 + 3,
                  alpha: 1,
                  life: 0,
                  maxLife: 25
                });
              }

              // Advance count and eliminate immediately
              setDayEnemiesRemaining(r => Math.max(0, r - 1));
              setEnemiesKilled(k => k + 1);
              return;
            }

            // Direct melee attack to player when close and fence is broken
            if (relZ <= 80 && e.attackCooldown <= 0 && enemyScreenX >= 60 && enemyScreenX <= 940) {
              e.attackCooldown = 1.35;
              setPlayerHp(h => {
                const newHp = Math.max(0, h - e.damage);
                if (newHp <= 0) {
                  setIsShopOpen(false);
                  setActiveQuiz(null);
                  setIsPaused(false);
                  setGameState('game_over');
                  soldierSounds.playPlayerHurt();
                  if (onAddScore) onAddScore(score);
                }
                return newHp;
              });
              screenShakeRef.current = 14;
              soldierSounds.playPlayerHurt();
              setFloatNotice({ text: `⚠️ DISERANG MUSUH (-${e.damage} HP)!`, id: Date.now(), color: '#ef4444' });
            }
          }

          // 2. RANGED ATTACK FOR SOLDIERS & TANK (ONLY WHEN CLEARLY VISIBLE IN FRONT)
          if ((e.type.startsWith('soldier_') || e.type === 'tank') && relZ >= 70 && relZ <= 850 && enemyScreenX >= 60 && enemyScreenX <= 940) {
            e.shootCooldown -= dt * 1000;
            if (e.shootCooldown <= 0) {
              e.shootCooldown = e.type === 'tank' ? 2600 : e.type === 'soldier_sniper' ? 2400 : 1600;
              e.isShooting = true;

              const willHit = Math.random() < (selectedDifficulty === 'nightmare' ? 0.35 : 0.22);
              const targetX = willHit ? 500 : 500 + (Math.random() - 0.5) * 500;
              const targetY = willHit ? 480 : 480 + (Math.random() - 0.5) * 300;

              enemyBulletsRef.current.push({
                startX: enemyScreenX,
                startY: enemyScreenY,
                endX: targetX,
                endY: targetY,
                progress: 0,
                isHitPlayer: willHit
              });

              soldierSounds.playEnemyGunfireMiss();

              if (willHit) {
                setPlayerHp(h => {
                  const newHp = Math.max(0, h - e.damage);
                  if (newHp <= 0) {
                    setIsShopOpen(false);
                    setActiveQuiz(null);
                    setIsPaused(false);
                    setGameState('game_over');
                    soldierSounds.playPlayerHurt();
                    if (onAddScore) onAddScore(score);
                  }
                  return newHp;
                });
                screenShakeRef.current = 10;
              }
            }
          }

          remainingLivingEnemies.push(e);
        });

        enemiesRef.current = remainingLivingEnemies;

        grenadesRef.current.forEach((gr, idx) => {
          gr.progress += dt * 1.6;
          if (gr.progress >= 1) {
            soldierSounds.playExplosion();
            screenShakeRef.current = 18;

            enemiesRef.current.forEach((e) => {
              const fov = 400;
              const enemyScreenX = 500 + (e.x - p.x) * (fov / e.z);
              const enemyScreenY = 320 + (e.y - p.jumpY) * (fov / e.z);

              if (Math.hypot(enemyScreenX - gr.targetX, enemyScreenY - gr.targetY) < 180) {
                e.hp -= 650;
                e.hitFlash = 12;
                if (e.hp <= 0) {
                  setScore(s => s + e.pointsReward * 1.5);
                  setPoints(pts => pts + e.pointsReward * 1.5);
                  setEnemiesKilled(k => k + 1);
                  setDayEnemiesRemaining(r => Math.max(0, r - 1));
                }
              }
            });
            enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);

            for (let i = 0; i < 40; i++) {
              particlesRef.current.push({
                x: gr.targetX,
                y: gr.targetY,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 16 - 4,
                color: i % 2 === 0 ? '#f59e0b' : '#ef4444',
                size: Math.random() * 8 + 4,
                alpha: 1,
                life: 0,
                maxLife: 35
              });
            }

            grenadesRef.current.splice(idx, 1);
          }
        });

        airstrikesRef.current.forEach((as, idx) => {
          as.timer -= dt;
          as.missileY += dt * 700;
          if (as.timer <= 0 && !as.exploded) {
            as.exploded = true;
            soldierSounds.playExplosion();
            screenShakeRef.current = 30;

            enemiesRef.current.forEach((e) => {
              const fov = 400;
              const enemyScreenX = 500 + (e.x - p.x) * (fov / e.z);
              const enemyScreenY = 320 + (e.y - p.jumpY) * (fov / e.z);

              if (Math.hypot(enemyScreenX - as.targetX, enemyScreenY - as.targetY) < 320) {
                e.hp -= 2500;
                e.hitFlash = 15;
                if (e.hp <= 0) {
                  setScore(s => s + e.pointsReward * 2);
                  setPoints(pts => pts + e.pointsReward * 2);
                  setEnemiesKilled(k => k + 1);
                  setDayEnemiesRemaining(r => Math.max(0, r - 1));
                }
              }
            });
            enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);

            for (let i = 0; i < 75; i++) {
              particlesRef.current.push({
                x: as.targetX + (Math.random() - 0.5) * 60,
                y: as.targetY + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 22,
                vy: (Math.random() - 0.5) * 22 - 6,
                color: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f59e0b' : '#ffffff',
                size: Math.random() * 12 + 6,
                alpha: 1,
                life: 0,
                maxLife: 45
              });
            }

            airstrikesRef.current.splice(idx, 1);
          }
        });

        enemyBulletsRef.current.forEach((b, idx) => {
          b.progress += dt * 3.5;
          if (b.progress >= 1) {
            enemyBulletsRef.current.splice(idx, 1);
          }
        });

        particlesRef.current.forEach((pt, idx) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vy += 0.25;
          pt.life++;
          pt.alpha = 1 - pt.life / pt.maxLife;
          if (pt.life >= pt.maxLife) {
            particlesRef.current.splice(idx, 1);
          }
        });
      }

      // ======================================================================
      // CANVAS DRAWING (FIRST-PERSON 3D BATTLEFIELD)
      // ======================================================================
      ctx.clearRect(0, 0, 1000, 600);

      ctx.save();
      if (screenShakeRef.current > 0.5) {
        const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(shakeX, shakeY);
      }

      // 1. SKY & HORIZON
      const headBob = (keysPressed.current['w'] || keysPressed.current['s'] || keysPressed.current['a'] || keysPressed.current['d']) ? Math.sin(walkBobRef.current) * 3.5 : 0;
      // In first-person view, when the soldier jumps UP (p.jumpY > 0), the horizon line moves DOWN relative to eyes:
      const horizonY = 320 + p.jumpY * 0.75 + headBob;

      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      if (day >= 8) {
        skyGrad.addColorStop(0, '#1c1917');
        skyGrad.addColorStop(1, '#450a0a');
      } else if (day >= 4) {
        skyGrad.addColorStop(0, '#0f172a');
        skyGrad.addColorStop(1, '#1e293b');
      } else {
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(1, '#090d16');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 1000, horizonY);

      ctx.fillStyle = '#090d16';
      for (let b = 0; b < 16; b++) {
        const bx = b * 65 + 10;
        const bh = 50 + (b % 4) * 35;
        ctx.fillRect(bx, horizonY - bh, 55, bh);
      }

      // 2. 3D PERSP GRID GROUND WITH FORWARD/BACKWARD MOTION
      const groundGrad = ctx.createLinearGradient(0, horizonY, 0, 600);
      groundGrad.addColorStop(0, '#0f172a');
      groundGrad.addColorStop(1, '#020617');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, horizonY, 1000, Math.max(0, 600 - horizonY));

      const fov = 400;

      // Perspective vertical rays
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = -800; x <= 800; x += 120) {
        const p1x = 500 + (x - p.x * 0.4) * 0.15;
        const p2x = 500 + (x - p.x) * 2.2;
        ctx.beginPath();
        ctx.moveTo(p1x, horizonY);
        ctx.lineTo(p2x, 600);
        ctx.stroke();
      }

      // Horizontal depth lines
      for (let d = 0; d < 8; d++) {
        const lineZ = 80 + d * 100 - (p.z % 100);
        if (lineZ > 30) {
          const ly = horizonY + (180 / lineZ) * 60;
          if (ly >= horizonY && ly <= 590) {
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(1000, ly);
            ctx.stroke();
          }
        }
      }


      // 3A. DRAW MILITARY CAMP LEFT DEFENSE FORTIFICATIONS (SANDBAGS, BARBED WIRE & CRATES)
      ctx.save();
      const cScreenLX = Math.max(20, 160 + (-p.x * 0.4) + (p.z * 0.15));
      const cScreenLY = horizonY + 25 + (p.z * 0.2);
      const cScaleL = Math.max(0.65, Math.min(1.2, 0.95 + (p.z * 0.002)));

      ctx.translate(cScreenLX, cScreenLY);
      ctx.scale(cScaleL, cScaleL);

      // Fortified Sandbag Bunker
      ctx.fillStyle = '#78716c';
      ctx.strokeStyle = '#44403c';
      ctx.lineWidth = 2;
      for (let row = 0; row < 3; row++) {
        const rowY = 10 + row * 18;
        const cols = row % 2 === 0 ? 4 : 3;
        const startX = row % 2 === 0 ? -60 : -45;
        for (let col = 0; col < cols; col++) {
          ctx.beginPath();
          ctx.roundRect(startX + col * 32, rowY, 30, 16, 5);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Barbed Wire Steel X-Barriers
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-90, 60); ctx.lineTo(-70, 0);
      ctx.moveTo(-70, 60); ctx.lineTo(-90, 0);
      ctx.moveTo(-70, 60); ctx.lineTo(-50, 0);
      ctx.moveTo(-50, 60); ctx.lineTo(-70, 0);
      ctx.stroke();

      // Barbed Wire Coils
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      for (let coil = -90; coil <= -50; coil += 8) {
        ctx.beginPath();
        ctx.arc(coil, 30, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Camouflage Netting Canopy
      ctx.fillStyle = '#14532d';
      ctx.beginPath();
      ctx.moveTo(-80, -35);
      ctx.lineTo(60, -45);
      ctx.lineTo(75, -5);
      ctx.lineTo(-70, 5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Military Supply Crates (Olive Drab)
      ctx.fillStyle = '#1e3a1e';
      ctx.fillRect(-25, -5, 38, 28);
      ctx.strokeStyle = '#14532d';
      ctx.strokeRect(-25, -5, 38, 28);
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText('AMMO', -20, 12);

      ctx.restore();

      // 3B. DRAW MILITARY CAMP RIGHT DEFENSE LINE (WATCHTOWER & RADIO ARRAY)
      ctx.save();
      const cScreenRX = Math.min(980, 840 + (-p.x * 0.4) - (p.z * 0.15));
      const cScreenRY = horizonY + 25 + (p.z * 0.2);
      const cScaleR = Math.max(0.65, Math.min(1.2, 0.95 + (p.z * 0.002)));

      ctx.translate(cScreenRX, cScreenRY);
      ctx.scale(cScaleR, cScaleR);

      // Steel Guard Watchtower Legs
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-35, 65); ctx.lineTo(-18, -40);
      ctx.moveTo(35, 65); ctx.lineTo(18, -40);
      ctx.moveTo(-30, 25); ctx.lineTo(30, 25);
      ctx.moveTo(-25, -10); ctx.lineTo(25, -10);
      ctx.stroke();

      // Tower Guard Cabin
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(-30, -75, 60, 35, 4);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Searchlight Spotlight
      const sweepAngle = Math.sin(Date.now() * 0.002) * 0.35;
      ctx.fillStyle = 'rgba(250, 204, 21, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.lineTo(-70 + sweepAngle * 100, 70);
      ctx.lineTo(70 + sweepAngle * 100, 70);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, -60, 6, 0, Math.PI * 2);
      ctx.fill();

      // Radio Communications Mast
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -75);
      ctx.lineTo(0, -115);
      ctx.stroke();

      // Blinking Red Warning Beacon
      const beaconOn = Math.sin(Date.now() * 0.006) > 0;
      if (beaconOn) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, -116, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Stacks of Reinforced Sandbags at base
      ctx.fillStyle = '#78716c';
      ctx.beginPath();
      ctx.roundRect(-45, 45, 90, 22, 5);
      ctx.fill();

      ctx.restore();

      // 3C. DRAW 3D PROJECTED ENEMIES
      const sortedEnemiesForRender = [...enemiesRef.current].sort((a, b) => b.z - a.z);

      sortedEnemiesForRender.forEach((e) => {
        const relZ = e.z - p.z;
        if (relZ <= 30 || relZ > 1200) return;

        const screenX = 500 + (e.x - p.x) * (fov / relZ);
        const screenY = horizonY + (e.y) * (fov / relZ);
        const screenRadius = (e.size * 260) / relZ;

        if (relZ > 30 && relZ < 1200) {
          ctx.save();

          if (e.hitFlash > 0) {
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 18;
          }

          if (e.type === 'tank') {
            // ==================== ARMORED COMBAT TANK ====================
            const tankW = screenRadius * 2.8;
            const tankH = screenRadius * 1.5;

            // Caterpillar Tracks
            ctx.fillStyle = '#18181b';
            ctx.fillRect(screenX - tankW / 2, screenY + tankH * 0.15, tankW, tankH * 0.45);
            ctx.strokeStyle = '#3f3f46';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(screenX - tankW / 2, screenY + tankH * 0.15, tankW, tankH * 0.45);

            // Rotating Track Wheels / Sprockets
            for (let w = -tankW * 0.4; w <= tankW * 0.4; w += tankW * 0.18) {
              ctx.fillStyle = '#27272a';
              ctx.beginPath();
              ctx.arc(screenX + w, screenY + tankH * 0.38, tankH * 0.14, 0, Math.PI * 2);
              ctx.fill();
              ctx.strokeStyle = '#52525b';
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }

            // Heavy Sloped Hull
            ctx.fillStyle = e.faction === 'zombies' ? '#7c2d12' : '#334155';
            ctx.beginPath();
            ctx.roundRect(screenX - tankW * 0.45, screenY - tankH * 0.35, tankW * 0.9, tankH * 0.55, 6);
            ctx.fill();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Armor Reactive Panels
            ctx.fillStyle = e.faction === 'zombies' ? '#9a3412' : '#475569';
            ctx.fillRect(screenX - tankW * 0.4, screenY - tankH * 0.28, tankW * 0.22, tankH * 0.25);
            ctx.fillRect(screenX + tankW * 0.18, screenY - tankH * 0.28, tankW * 0.22, tankH * 0.25);

            // Turret Base & Cannon Barrel
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.roundRect(screenX - tankW * 0.28, screenY - tankH * 0.7, tankW * 0.56, tankH * 0.42, 6);
            ctx.fill();
            ctx.stroke();

            // Cannon Barrel pointing directly at player
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(screenX - tankW * 0.08, screenY - tankH * 0.58, tankW * 0.16, tankH * 0.95);
            ctx.fillStyle = '#ef4444'; // Muzzle laser bore
            ctx.beginPath();
            ctx.arc(screenX, screenY + tankH * 0.32, 4, 0, Math.PI * 2);
            ctx.fill();

            // Headlights
            ctx.fillStyle = '#facc15';
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(screenX - tankW * 0.36, screenY - tankH * 0.1, 5, 0, Math.PI * 2);
            ctx.arc(screenX + tankW * 0.36, screenY - tankH * 0.1, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (e.faction === 'zombies') {
            // ==================== REALISTIC UNDEAD ZOMBIES (GOLIATH, TITAN BOSS, TOXIC, WALKER, RUNNER) ====================
            const limp = Math.sin(e.walkCycle) * (screenRadius * 0.12);
            const sway = Math.cos(e.walkCycle * 0.8) * 0.08;
            const armReachingL = Math.sin(e.walkCycle * 2) * (screenRadius * 0.15);
            const armReachingR = Math.cos(e.walkCycle * 2) * (screenRadius * 0.15);

            ctx.translate(screenX, screenY + limp);
            ctx.rotate(sway);

            const R = screenRadius;
            const isGoliath = e.type === 'goliath';
            const isBoss = e.type === 'boss';
            const skinBase = isBoss ? '#450a0a' : isGoliath ? '#14532d' : e.type === 'toxic' ? '#581c87' : '#1e3a1e';
            const skinDecay = isBoss ? '#991b1b' : isGoliath ? '#166534' : e.type === 'toxic' ? '#9333ea' : '#3f6212';
            const shirtColor = isBoss ? '#1c1917' : isGoliath ? '#292524' : e.type === 'toxic' ? '#3b0764' : '#1e293b';

            // Boss / Goliath Aura
            if (isBoss || isGoliath) {
              ctx.shadowColor = isBoss ? '#ef4444' : '#22c55e';
              ctx.shadowBlur = isBoss ? 24 : 14;
            }

            // 1. Legs with tattered pants
            const legSwing = Math.sin(e.walkCycle) * (R * 0.18);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(-R * 0.38, R * 0.3, R * (isGoliath || isBoss ? 0.36 : 0.28), R * 0.65 + legSwing);
            ctx.fillRect(R * 0.08, R * 0.3, R * (isGoliath || isBoss ? 0.36 : 0.28), R * 0.65 - legSwing);

            // Exposed decaying knees / bone
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(-R * 0.25, R * 0.55 + legSwing, R * 0.1, R * 0.08);

            // 2. Torso with torn rotten shirt & blood stains
            ctx.fillStyle = shirtColor;
            ctx.beginPath();
            ctx.roundRect(-R * (isGoliath || isBoss ? 0.65 : 0.5), -R * 0.45, R * (isGoliath || isBoss ? 1.3 : 1.0), R * 0.8, 6);
            ctx.fill();

            // Mutated Shoulder Spikes for Boss
            if (isBoss) {
              ctx.fillStyle = '#7f1d1d';
              ctx.beginPath();
              ctx.moveTo(-R * 0.7, -R * 0.35); ctx.lineTo(-R * 1.0, -R * 0.8); ctx.lineTo(-R * 0.5, -R * 0.5);
              ctx.moveTo(R * 0.7, -R * 0.35); ctx.lineTo(R * 1.0, -R * 0.8); ctx.lineTo(R * 0.5, -R * 0.5);
              ctx.fill();
            }

            // Blood stains & decaying rips
            ctx.fillStyle = '#7f1d1d';
            ctx.beginPath();
            ctx.arc(-R * 0.1, -R * 0.1, R * 0.18, 0, Math.PI * 2);
            ctx.arc(R * 0.2, R * 0.1, R * 0.12, 0, Math.PI * 2);
            ctx.fill();

            // Exposed rib bones
            ctx.fillStyle = skinDecay;
            ctx.fillRect(-R * 0.25, -R * 0.2, R * 0.35, R * 0.3);
            ctx.strokeStyle = '#f8fafc';
            ctx.lineWidth = 1.5;
            for (let rib = -0.15; rib <= 0.05; rib += 0.08) {
              ctx.beginPath();
              ctx.moveTo(-R * 0.25, rib * R);
              ctx.lineTo(R * 0.05, rib * R);
              ctx.stroke();
            }

            // 3. Outstretched Zombie Arms Reaching Forward Towards Player
            const armScale = isGoliath || isBoss ? 1.35 : 1.0;
            // Left Reaching Arm
            ctx.fillStyle = skinBase;
            ctx.beginPath();
            ctx.roundRect(-R * 0.85 * armScale, -R * 0.35 + armReachingL, R * 0.45 * armScale, R * 0.32 * armScale, 4);
            ctx.fill();
            ctx.fillStyle = skinDecay;
            ctx.beginPath();
            ctx.roundRect(-R * 0.98 * armScale, -R * 0.25 + armReachingL, R * 0.38 * armScale, R * 0.26 * armScale, 4);
            ctx.fill();
            ctx.fillStyle = isBoss ? '#ef4444' : '#fef08a'; // Sharp deadly claws
            for (let f = 0; f < 4; f++) {
              ctx.fillRect(-R * 1.05 * armScale - f * 3, -R * 0.22 + f * 4 + armReachingL, 5, 4);
            }

            // Right Reaching Arm
            ctx.fillStyle = skinBase;
            ctx.beginPath();
            ctx.roundRect(R * 0.45, -R * 0.35 + armReachingR, R * 0.45 * armScale, R * 0.32 * armScale, 4);
            ctx.fill();
            ctx.fillStyle = skinDecay;
            ctx.beginPath();
            ctx.roundRect(R * 0.65, -R * 0.25 + armReachingR, R * 0.38 * armScale, R * 0.26 * armScale, 4);
            ctx.fill();
            ctx.fillStyle = isBoss ? '#ef4444' : '#fef08a';
            for (let f = 0; f < 4; f++) {
              ctx.fillRect(R * 0.95 * armScale + f * 3, -R * 0.22 + f * 4 + armReachingR, 5, 4);
            }

            // 4. Zombie Decayed Head & Face
            ctx.fillStyle = skinBase;
            ctx.beginPath();
            ctx.arc(0, -R * 0.8, R * (isBoss ? 0.52 : isGoliath ? 0.48 : 0.45), 0, Math.PI * 2);
            ctx.fill();

            // Patchy Rotten Hair / Bone Crest
            ctx.fillStyle = isBoss ? '#000000' : '#1c1917';
            ctx.beginPath();
            ctx.arc(0, -R * 0.95, R * 0.4, Math.PI, Math.PI * 2);
            ctx.fill();

            // Skull fracture crack
            ctx.strokeStyle = '#7f1d1d';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-R * 0.1, -R * 1.15);
            ctx.lineTo(R * 0.05, -R * 0.95);
            ctx.lineTo(-R * 0.02, -R * 0.85);
            ctx.stroke();

            // Sunken Dark Eye Sockets
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(-R * 0.18, -R * 0.85, R * 0.14, 0, Math.PI * 2);
            ctx.arc(R * 0.18, -R * 0.85, R * 0.14, 0, Math.PI * 2);
            ctx.fill();

            // Glowing Sinister Undead Eyes
            ctx.fillStyle = isBoss ? '#ef4444' : isGoliath ? '#f59e0b' : e.type === 'toxic' ? '#c084fc' : '#22c55e';
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(-R * 0.18, -R * 0.85, R * 0.08, 0, Math.PI * 2);
            ctx.arc(R * 0.18, -R * 0.85, R * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Rotting Open Mouth with Crooked Teeth
            ctx.fillStyle = '#450a0a';
            ctx.beginPath();
            ctx.roundRect(-R * 0.24, -R * 0.65, R * 0.48, R * 0.22, 4);
            ctx.fill();
            ctx.fillStyle = '#fef08a';
            for (let t = -0.18; t <= 0.16; t += 0.08) {
              ctx.fillRect(t * R, -R * 0.65, 3, 5);
              ctx.fillRect((t + 0.04) * R, -R * 0.52, 3, 5);
            }

            // Toxic Boils
            if (e.type === 'toxic') {
              ctx.fillStyle = '#a855f7';
              ctx.shadowColor = '#c084fc';
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.arc(-R * 0.35, -R * 0.6, R * 0.15, 0, Math.PI * 2);
              ctx.arc(R * 0.3, -R * 0.4, R * 0.12, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          } else {
            // ==================== REALISTIC ENEMY SOLDIER ====================
            const bob = Math.sin(e.walkCycle) * (screenRadius * 0.08);
            ctx.translate(screenX, screenY + bob);

            const R = screenRadius;
            const camoColor = e.type === 'soldier_heavy' ? '#7f1d1d' : e.type === 'soldier_sniper' ? '#1e1b4b' : '#334155';
            const vestColor = '#1e293b';

            // 1. Combat Legs & Boots
            const legSwing = Math.sin(e.walkCycle) * (R * 0.18);
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(-R * 0.35, R * 0.35, R * 0.28, R * 0.6 + legSwing);
            ctx.fillRect(R * 0.07, R * 0.35, R * 0.28, R * 0.6 - legSwing);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(-R * 0.4, R * 0.85 + legSwing, R * 0.35, R * 0.15);
            ctx.fillRect(R * 0.05, R * 0.85 - legSwing, R * 0.35, R * 0.15);

            // 2. Tactical BDU Body & Plate Carrier
            ctx.fillStyle = camoColor;
            ctx.beginPath();
            ctx.roundRect(-R * 0.45, -R * 0.4, R * 0.9, R * 0.8, 6);
            ctx.fill();

            // Heavy Ballistic Vest
            ctx.fillStyle = vestColor;
            ctx.beginPath();
            ctx.roundRect(-R * 0.38, -R * 0.35, R * 0.76, R * 0.65, 4);
            ctx.fill();

            // Ammo Magazine Pouches
            ctx.fillStyle = '#475569';
            ctx.fillRect(-R * 0.28, -R * 0.05, R * 0.16, R * 0.28);
            ctx.fillRect(-R * 0.08, -R * 0.05, R * 0.16, R * 0.28);
            ctx.fillRect(R * 0.12, -R * 0.05, R * 0.16, R * 0.28);

            // Radio Antenna
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(R * 0.3, -R * 0.35);
            ctx.lineTo(R * 0.35, -R * 0.8);
            ctx.stroke();

            // 3. Tactical Rifle in Firing Stance
            ctx.fillStyle = camoColor;
            ctx.beginPath();
            ctx.roundRect(-R * 0.65, -R * 0.25, R * 0.3, R * 0.4, 4);
            ctx.roundRect(R * 0.35, -R * 0.25, R * 0.3, R * 0.4, 4);
            ctx.fill();

            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.roundRect(-R * 0.55, -R * 0.12, R * 1.1, R * 0.18, 3);
            ctx.fill();
            ctx.fillStyle = '#334155';
            ctx.fillRect(-R * 0.1, -R * 0.22, R * 0.28, R * 0.1);

            // Muzzle Flash
            if (e.isShooting) {
              ctx.fillStyle = '#facc15';
              ctx.shadowColor = '#ef4444';
              ctx.shadowBlur = 14;
              ctx.beginPath();
              ctx.arc(R * 0.65, -R * 0.03, R * 0.25, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }

            // 4. Kevlar Combat Helmet & Goggles
            ctx.fillStyle = '#fbcfe8';
            ctx.beginPath();
            ctx.arc(0, -R * 0.7, R * 0.35, 0, Math.PI * 2);
            ctx.fill();

            // Balaclava
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(0, -R * 0.65, R * 0.32, 0, Math.PI);
            ctx.fill();

            // Helmet
            ctx.fillStyle = camoColor;
            ctx.beginPath();
            ctx.arc(0, -R * 0.78, R * 0.4, Math.PI, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(-R * 0.4, -R * 0.8, R * 0.8, R * 0.12);

            // Night Vision / Tactical Goggles
            ctx.fillStyle = e.type === 'soldier_sniper' ? '#ec4899' : '#38bdf8';
            ctx.shadowColor = e.type === 'soldier_sniper' ? '#ec4899' : '#38bdf8';
            ctx.shadowBlur = 8;
            ctx.fillRect(-R * 0.26, -R * 0.76, R * 0.22, R * 0.12);
            ctx.fillRect(R * 0.04, -R * 0.76, R * 0.22, R * 0.12);
            ctx.shadowBlur = 0;
          }

          const hpBarW = screenRadius * 1.8;
          const hpBarH = 6;
          const hpPercent = Math.max(0, e.hp / e.maxHp);

          ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
          ctx.fillRect(screenX - hpBarW / 2, screenY - screenRadius * 1.4, hpBarW, hpBarH);

          ctx.fillStyle = e.type === 'boss' ? '#ef4444' : e.type === 'goliath' ? '#15803d' : e.type === 'tank' ? '#f59e0b' : '#22c55e';
          ctx.fillRect(screenX - hpBarW / 2, screenY - screenRadius * 1.4, hpBarW * hpPercent, hpBarH);

          ctx.restore();
        }
      });

      // 3D. DRAW FRONT PERIMETER BARBED-WIRE DEFENSE FENCE (FIXED 3D WORLD STRUCTURE)
      ctx.save();
      const FENCE_WORLD_Z = 75;
      const relFenceZ = Math.max(30, FENCE_WORLD_Z - p.z);
      const isFenceAlive = fenceHpRef.current > 0;

      // Vertical 3D perspective calculation for ground and top of fence
      const fenceGroundY = horizonY + (105) * (fov / relFenceZ);
      const fenceTopY = horizonY + (15) * (fov / relFenceZ);
      const fenceHeight = fenceGroundY - fenceTopY;
      const postScale = fov / relFenceZ;

      // Fixed stationary world posts across camp front perimeter
      const worldPostsX = [-480, -400, -320, -240, -160, -80, 0, 80, 160, 240, 320, 400, 480];

      if (isFenceAlive) {
        // 1. Draw Reinforced Concrete Base & Steel Posts in true 3D
        worldPostsX.forEach(postWorldX => {
          const postScreenX = 500 + (postWorldX - p.x) * (fov / relFenceZ);
          if (postScreenX < -60 || postScreenX > 1060) return;

          const postWidth = Math.max(8, 14 * (postScale / 5));
          const baseWidth = postWidth * 2.2;
          const baseHeight = Math.max(10, 18 * (postScale / 5));

          // Concrete Foundation block in ground
          ctx.fillStyle = '#44403c';
          ctx.beginPath();
          ctx.roundRect(postScreenX - baseWidth / 2, fenceGroundY - baseHeight * 0.2, baseWidth, baseHeight, 3);
          ctx.fill();
          ctx.strokeStyle = '#292524';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Steel I-Beam Post
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(postScreenX - postWidth / 2, fenceTopY, postWidth, fenceHeight);
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = Math.max(1, 2 * (postScale / 5));
          ctx.strokeRect(postScreenX - postWidth / 2, fenceTopY, postWidth, fenceHeight);

          // Diagonal structural steel truss braces
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = Math.max(1, 1.5 * (postScale / 5));
          ctx.beginPath();
          ctx.moveTo(postScreenX - postWidth, fenceGroundY);
          ctx.lineTo(postScreenX, fenceTopY + fenceHeight * 0.4);
          ctx.moveTo(postScreenX + postWidth, fenceGroundY);
          ctx.lineTo(postScreenX, fenceTopY + fenceHeight * 0.4);
          ctx.stroke();

          // Warning / Electric Beacon at post cap
          if (fenceLevel >= 2) {
            const beaconPulse = Math.sin(Date.now() * 0.006 + postWorldX * 0.01) > 0;
            ctx.fillStyle = beaconPulse ? '#38bdf8' : '#0369a1';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(postScreenX, fenceTopY - 4, Math.max(3, 5 * (postScale / 5)), 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        // 2. Horizontal High-Tensile Steel Tension Cables
        const cableLeftX = 500 + (-520 - p.x) * (fov / relFenceZ);
        const cableRightX = 500 + (520 - p.x) * (fov / relFenceZ);

        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = Math.max(1.5, 3 * (postScale / 5));

        const cableRatios = [0.15, 0.4, 0.65, 0.9];
        cableRatios.forEach(ratio => {
          const cy = fenceTopY + fenceHeight * ratio;
          ctx.beginPath();
          ctx.moveTo(cableLeftX, cy);
          ctx.lineTo(cableRightX, cy);
          ctx.stroke();
        });

        // 3. Dense Razor Barbed-Wire Coils
        const coilRadius = Math.max(6, 12 * (postScale / 5));
        cableRatios.forEach((ratio, rIdx) => {
          const cy = fenceTopY + fenceHeight * ratio;
          ctx.strokeStyle = rIdx % 2 === 0 ? '#94a3b8' : '#cbd5e1';
          ctx.lineWidth = Math.max(1, 1.8 * (postScale / 5));
          ctx.beginPath();
          for (let wx = -500; wx <= 500; wx += 20) {
            const cx = 500 + (wx - p.x) * (fov / relFenceZ);
            if (cx >= -40 && cx <= 1040) {
              ctx.arc(cx, cy, coilRadius, 0, Math.PI * 2);
            }
          }
          ctx.stroke();
        });

        // 4. Electric Arcs for Upgraded Defense Fence (Lv >= 2)
        if (fenceLevel >= 2) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.lineWidth = Math.max(1.5, 2.5 * (postScale / 5));
          ctx.beginPath();
          for (let wx = -480; wx < 480; wx += 80) {
            const x1 = 500 + (wx - p.x) * (fov / relFenceZ);
            const x2 = 500 + (wx + 40 - p.x) * (fov / relFenceZ);
            const x3 = 500 + (wx + 80 - p.x) * (fov / relFenceZ);
            const arcY = fenceTopY + fenceHeight * 0.35 + (Math.random() - 0.5) * (16 * (postScale / 5));
            ctx.moveTo(x1, fenceTopY + fenceHeight * 0.35);
            ctx.lineTo(x2, arcY);
            ctx.lineTo(x3, fenceTopY + fenceHeight * 0.35);
          }
          ctx.stroke();
        }

        // 5. Stationary Bottom Durability Plaque (Positioned at bottom of screen canvas, never blocking crosshair!)
        const barW = 280;
        const barH = 12;
        const barX = 500 - barW / 2;
        const barY = 568;
        const fRatio = Math.max(0, fenceHpRef.current / fenceMaxHp);

        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(barX - 8, barY - 15, barW + 16, barH + 20, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`🛡️ KETAHANAN PAGAR DURI (LVL ${fenceLevel}): ${fenceHpRef.current} / ${fenceMaxHp} HP`, 500, barY - 3);

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(barX, barY + 1, barW, barH);

        ctx.fillStyle = fRatio > 0.5 ? '#22c55e' : fRatio > 0.25 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, barY + 1, barW * fRatio, barH);
      } else {
        // Destroyed / Fallen Fence Rubble in 3D
        worldPostsX.forEach(postWorldX => {
          const postScreenX = 500 + (postWorldX - p.x) * (fov / relFenceZ);
          if (postScreenX < -60 || postScreenX > 1060) return;
          ctx.fillStyle = '#44403c';
          ctx.fillRect(postScreenX - 8, fenceGroundY, 16, 12);
        });

        const cableLeftX = 500 + (-520 - p.x) * (fov / relFenceZ);
        const cableRightX = 500 + (520 - p.x) * (fov / relFenceZ);
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cableLeftX, fenceGroundY + 8);
        ctx.lineTo(cableRightX, fenceGroundY + 12);
        ctx.stroke();

        const centerFenceScreenX = 500 + (0 - p.x) * (fov / relFenceZ);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.92)';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚠️ PAGAR BARIKADE HANCUR! MUSUH MERANGSEK! (PERBAIKI DI TOKO [B])', centerFenceScreenX, fenceGroundY - 24);
      }

      ctx.restore();

      // 4. DRAW ENEMY BULLET TRACERS
      enemyBulletsRef.current.forEach((b) => {
        const curX = b.startX + (b.endX - b.startX) * b.progress;
        const curY = b.startY + (b.endY - b.startY) * b.progress;
        ctx.save();
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(b.startX, b.startY);
        ctx.lineTo(curX, curY);
        ctx.stroke();
        ctx.restore();
      });

      // 5. DRAW ACTIVE GRENADES
      grenadesRef.current.forEach((gr) => {
        const curX = gr.x + (gr.targetX - gr.x) * gr.progress;
        const curY = gr.y + (gr.targetY - gr.y) * gr.progress - Math.sin(gr.progress * Math.PI) * gr.arcHeight;
        ctx.save();
        ctx.fillStyle = '#15803d';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(curX, curY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // 6. DRAW ACTIVE AIRSTRIKES
      airstrikesRef.current.forEach((as) => {
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(as.targetX, as.targetY, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(as.targetX - 60, as.targetY);
        ctx.lineTo(as.targetX + 60, as.targetY);
        ctx.moveTo(as.targetX, as.targetY - 60);
        ctx.lineTo(as.targetX, as.targetY + 60);
        ctx.stroke();
        ctx.restore();
      });

      // 7. DRAW PARTICLES
      particlesRef.current.forEach((pt) => {
        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 8. DRAW FIRST-PERSON WEAPON FACING CURSOR
      if (!isScoped) {
        ctx.save();
        const p = playerPosRef.current;
        const aimX = mouseAimRef.current.x;
        const aimY = mouseAimRef.current.y;

        // Weapon position anchored at bottom right with strafe and recoil offset
        const originX = 660 + (p.x * 0.12) + gunRecoilRef.current.x;
        const originY = 590 - (p.jumpY * 0.22) + gunRecoilRef.current.y;

        // Angle pointing directly towards crosshair
        const angle = Math.atan2(aimY - originY, aimX - originX);

        ctx.translate(originX, originY);
        ctx.rotate(angle);

        // --- SOLDIER TACTICAL COMBAT GLOVES & SLEEVE ---
        // Forearm / Camo sleeve
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(-70, 10, 80, 45, 8);
        ctx.fill();

        // Main Hand Tactical Glove (gripping the receiver)
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.roundRect(-25, 6, 42, 28, 6);
        ctx.fill();
        ctx.fillStyle = '#0f172a'; // Carbon knuckle pad
        ctx.beginPath();
        ctx.roundRect(-18, 9, 26, 16, 4);
        ctx.fill();

        // Support Hand (for rifles, smg, shotgun, sniper, plasma)
        if (w.id !== 'knife' && w.id !== 'pistol') {
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.roundRect(50, 4, 32, 22, 5);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.roundRect(54, 7, 22, 14, 3);
          ctx.fill();
        }

        let muzzleTipX = 140;
        let muzzleTipY = 0;

        if (w.id === 'knife') {
          // ==================== COMBAT KNIFE ====================
          const isSlashing = meleeSlashTimerRef.current > 0;
          if (isSlashing) {
            ctx.rotate(-0.3 + (meleeSlashTimerRef.current / 8) * 0.6);
          }

          // Handle (OD Green Grip + Rubber Ribs)
          ctx.fillStyle = '#15803d';
          ctx.beginPath();
          ctx.roundRect(-15, -6, 50, 14, 3);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          for (let rx = -5; rx <= 25; rx += 8) {
            ctx.fillRect(rx, -6, 3, 14);
          }

          // Steel Crossguard
          ctx.fillStyle = '#475569';
          ctx.fillRect(35, -14, 8, 28);

          // Tanto Combat Blade
          ctx.fillStyle = '#94a3b8';
          ctx.beginPath();
          ctx.moveTo(43, -7);
          ctx.lineTo(130, -7);
          ctx.lineTo(165, 0);
          ctx.lineTo(43, 7);
          ctx.closePath();
          ctx.fill();

          // Polished Razor Edge (Bottom Bevel)
          ctx.fillStyle = '#f8fafc';
          ctx.beginPath();
          ctx.moveTo(43, 0);
          ctx.lineTo(130, -2);
          ctx.lineTo(165, 0);
          ctx.lineTo(43, 7);
          ctx.closePath();
          ctx.fill();

          // Blade Blood Groove / Fuller
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(55, -2);
          ctx.lineTo(120, -2);
          ctx.stroke();

          // Serrations on top spine
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 1.5;
          for (let sx = 50; sx <= 95; sx += 8) {
            ctx.beginPath();
            ctx.moveTo(sx, -7);
            ctx.lineTo(sx + 3, -3);
            ctx.stroke();
          }

          if (isSlashing) {
            // White-Cyan Crescent Melee Slash FX
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(80, 0, 110, -Math.PI * 0.35, Math.PI * 0.25);
            ctx.stroke();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(80, 0, 110, -Math.PI * 0.3, Math.PI * 0.2);
            ctx.stroke();
          }
        } else if (w.id === 'pistol') {
          // ==================== TACTICAL PISTOL 9MM ====================
          muzzleTipX = 135;
          muzzleTipY = -3;

          // Slide & Frame
          const pGrad = ctx.createLinearGradient(0, -10, 0, 10);
          pGrad.addColorStop(0, '#475569');
          pGrad.addColorStop(0.5, '#1e293b');
          pGrad.addColorStop(1, '#0f172a');

          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.roundRect(-20, -10, 155, 18, 4);
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Barrel Ejection Port
          ctx.fillStyle = '#64748b';
          ctx.fillRect(20, -10, 30, 6);

          // Tritium Night Sights (Green Glow)
          ctx.fillStyle = '#22c55e';
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 6;
          ctx.fillRect(128, -13, 3, 3);
          ctx.fillRect(-16, -13, 3, 3);
          ctx.shadowBlur = 0;

          // Slide Grip Serrations
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          for (let gx = -12; gx <= 6; gx += 4) {
            ctx.beginPath();
            ctx.moveTo(gx, -9);
            ctx.lineTo(gx, 4);
            ctx.stroke();
          }

          // Tactical Laser Sight Line (Subtle Guide)
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(135, 4);
          ctx.lineTo(350, 4);
          ctx.stroke();
        } else if (w.id === 'smg') {
          // ==================== MP5 SUBMACHINE GUN ====================
          muzzleTipX = 180;
          muzzleTipY = -2;

          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.roundRect(-30, -11, 205, 18, 4);
          ctx.fill();

          // Curved 30-round magazine
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.moveTo(35, 7);
          ctx.lineTo(48, 28);
          ctx.lineTo(60, 26);
          ctx.lineTo(48, 7);
          ctx.closePath();
          ctx.fill();

          // Polymer Ribbed Handguard
          ctx.fillStyle = '#334155';
          ctx.fillRect(55, -8, 75, 14);

          // Reflex Holographic Optic Sight
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(10, -22, 38, 11);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.fillRect(16, -20, 24, 7);
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(28, -16.5, 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Tri-lug Muzzle Flash Hider
          ctx.fillStyle = '#475569';
          ctx.fillRect(175, -8, 12, 12);
        } else if (w.id === 'shotgun') {
          // ==================== SPAS-12 COMBAT SHOTGUN ====================
          muzzleTipX = 210;
          muzzleTipY = -3;

          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.roundRect(-35, -12, 240, 20, 4);
          ctx.fill();

          // Heat Shield with Vent Holes
          ctx.fillStyle = '#334155';
          ctx.fillRect(30, -13, 125, 6);
          ctx.fillStyle = '#0f172a';
          for (let vx = 40; vx <= 145; vx += 12) {
            ctx.fillRect(vx, -12, 6, 4);
          }

          // Ribbed Pump-Action Foregrip
          ctx.fillStyle = '#78350f';
          ctx.fillRect(50, 4, 65, 14);
          ctx.fillStyle = '#000';
          for (let px = 55; px <= 105; px += 10) {
            ctx.fillRect(px, 4, 3, 14);
          }

          // Heavy Duty Muzzle Breacher
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(200, -8, 12, 12);
        } else if (w.id === 'rifle') {
          // ==================== M4A1 CARBINE RIFLE ====================
          muzzleTipX = 225;
          muzzleTipY = -3;

          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.roundRect(-40, -13, 260, 20, 4);
          ctx.fill();

          // Curved STANAG Mag
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.moveTo(25, 7);
          ctx.lineTo(38, 30);
          ctx.lineTo(52, 28);
          ctx.lineTo(42, 7);
          ctx.closePath();
          ctx.fill();

          // Quad Rail Handguard
          ctx.fillStyle = '#78716c';
          ctx.fillRect(65, -9, 85, 14);

          // ACOG Combat Optic
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, -25, 45, 12);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(38, -23, 5, 8);

          // Birdcage Flash Hider
          ctx.fillStyle = '#475569';
          ctx.fillRect(215, -8, 14, 10);
        } else if (w.id === 'sniper') {
          // ==================== AWM HEAVY SNIPER ====================
          muzzleTipX = 280;
          muzzleTipY = -2;

          ctx.fillStyle = '#166534';
          ctx.beginPath();
          ctx.roundRect(-50, -11, 230, 18, 4);
          ctx.fill();

          // Long Fluted Free-Float Barrel
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(170, -7, 105, 10);

          // High-Magnification Scope
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-15, -28, 65, 15);
          ctx.fillStyle = '#a855f7';
          ctx.fillRect(44, -26, 6, 11);

          // Massive Dual-Port Muzzle Brake
          ctx.fillStyle = '#475569';
          ctx.fillRect(270, -10, 16, 16);
        } else if (w.id === 'plasma') {
          // ==================== PLASMA CANNON ====================
          muzzleTipX = 205;
          muzzleTipY = -2;

          ctx.fillStyle = '#1e1b4b';
          ctx.beginPath();
          ctx.roundRect(-35, -14, 235, 24, 6);
          ctx.fill();
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // 3 Glowing Energy Induction Coils
          const pGlow = Math.sin(Date.now() * 0.008) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(192, 132, 252, ${pGlow})`;
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = 12;
          ctx.fillRect(30, -9, 14, 16);
          ctx.fillRect(70, -9, 14, 16);
          ctx.fillRect(110, -9, 14, 16);
          ctx.shadowBlur = 0;

          // Quad Emitter Prongs
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(195, -10, 14, 18);
        } else if (w.id === 'minigun') {
          // ==================== M134 VULCAN MINIGUN (GATLING) ====================
          muzzleTipX = 250;
          muzzleTipY = -2;

          // Heavy Titanium Receiver Housing
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.roundRect(-45, -16, 175, 32, 6);
          ctx.fill();
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Top Ergonomic Carry Handle
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.roundRect(-10, -28, 80, 12, 4);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(5, -24, 50, 8);

          // Ammo Feeder Chute & Linked Brass Rounds
          ctx.fillStyle = '#f59e0b';
          for (let b = -30; b <= 10; b += 8) {
            ctx.beginPath();
            ctx.roundRect(b, 14, 6, 14, 2);
            ctx.fill();
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(b + 1, 14, 4, 4);
            ctx.fillStyle = '#f59e0b';
          }

          // Rotating 6-Barrel Gatling Cluster with Spin Animation
          const isFiring = isMouseDownRef.current && currentAmmo > 0;
          const barrelSpin = isFiring ? Date.now() * 0.06 : 0;

          // Front Circular Rotor Clamp Rings
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(130, -18, 16, 36);
          ctx.fillRect(235, -18, 14, 36);
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(130, -18, 16, 36);
          ctx.strokeRect(235, -18, 14, 36);

          // 6 Heavy Steel Barrels
          for (let bar = 0; bar < 6; bar++) {
            const angle = barrelSpin + (bar * Math.PI) / 3;
            const barOffsetY = Math.sin(angle) * 12;
            const barThickness = 3.5 + Math.cos(angle) * 1.2;
            const barColor = Math.cos(angle) > 0 ? '#475569' : '#1e293b';

            ctx.fillStyle = barColor;
            ctx.fillRect(125, barOffsetY - barThickness / 2, 120, barThickness);
          }

          // Center Drive Shaft
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(125, -3, 125, 6);
        } else if (w.id === 'bfg') {
          // ==================== BFG-9000 DOOM CANNON ====================
          muzzleTipX = 265;
          muzzleTipY = -2;

          // Massive Heavy Sci-Fi Chassis
          const bfgGrad = ctx.createLinearGradient(0, -22, 0, 22);
          bfgGrad.addColorStop(0, '#1c1917');
          bfgGrad.addColorStop(0.5, '#052e16');
          bfgGrad.addColorStop(1, '#022c22');
          ctx.fillStyle = bfgGrad;
          ctx.beginPath();
          ctx.roundRect(-50, -22, 230, 44, 8);
          ctx.fill();
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Green Radioactive Reactor Core (Pulsing Plasma Chamber)
          const coreGlow = Math.sin(Date.now() * 0.01) * 0.35 + 0.65;
          ctx.fillStyle = `rgba(34, 197, 94, ${coreGlow})`;
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.roundRect(10, -14, 75, 28, 6);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Reactor Protective Slits
          ctx.fillStyle = '#0f172a';
          for (let sx = 22; sx <= 70; sx += 14) {
            ctx.fillRect(sx, -14, 5, 28);
          }

          // Top Status HUD & Warning Decals
          ctx.fillStyle = '#4ade80';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('BFG-9000 // 100% READY', -35, -10);

          // Giant Magnetic Acceleration Barrel Rails (Top & Bottom)
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(170, -24, 85, 14);
          ctx.fillRect(170, 10, 85, 14);
          ctx.strokeStyle = '#4ade80';
          ctx.lineWidth = 2;
          ctx.strokeRect(170, -24, 85, 14);
          ctx.strokeRect(170, 10, 85, 14);

          // Green Lightning Arcs between rails
          ctx.strokeStyle = 'rgba(74, 222, 128, 0.85)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(185, -10);
          ctx.lineTo(205, (Math.random() - 0.5) * 14);
          ctx.lineTo(225, (Math.random() - 0.5) * 14);
          ctx.lineTo(245, 10);
          ctx.stroke();
        }

        // --- MUZZLE FLASH BLAST ---
        if (muzzleFlashTimerRef.current > 0 && !w.isMelee) {
          const flashSize = w.id === 'bfg' ? 75 : w.id === 'minigun' ? 55 : 45;
          const flashGrad = ctx.createRadialGradient(muzzleTipX, muzzleTipY, 2, muzzleTipX, muzzleTipY, flashSize);
          flashGrad.addColorStop(0, '#ffffff');
          flashGrad.addColorStop(0.3, w.id === 'bfg' ? '#4ade80' : w.id === 'plasma' ? '#c084fc' : '#facc15');
          flashGrad.addColorStop(0.7, w.id === 'bfg' ? '#15803d' : w.id === 'plasma' ? '#a855f7' : '#ef4444');
          flashGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
          ctx.fillStyle = flashGrad;
          ctx.beginPath();
          ctx.arc(muzzleTipX, muzzleTipY, flashSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 9. DRAW SCOPE ADS OR CROSSHAIR
      if (isScoped) {
        ctx.save();
        const aimX = mouseAimRef.current.x;
        const aimY = mouseAimRef.current.y;
        const scopeRadius = 180 * (w.zoomFactor || 1.5);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
        ctx.beginPath();
        ctx.rect(0, 0, 1000, 600);
        ctx.arc(aimX, aimY, Math.min(270, scopeRadius), 0, Math.PI * 2, true);
        ctx.fill();

        ctx.strokeStyle = w.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(aimX, aimY, Math.min(270, scopeRadius), 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(aimX - 240, aimY);
        ctx.lineTo(aimX + 240, aimY);
        ctx.moveTo(aimX, aimY - 240);
        ctx.lineTo(aimX, aimY + 240);
        ctx.stroke();
        ctx.restore();
      } else {
        const aimX = mouseAimRef.current.x;
        const aimY = mouseAimRef.current.y;
        ctx.save();
        ctx.strokeStyle = isReloading ? '#f59e0b' : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(aimX, aimY, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(aimX - 22, aimY);
        ctx.lineTo(aimX - 8, aimY);
        ctx.moveTo(aimX + 22, aimY);
        ctx.lineTo(aimX + 8, aimY);
        ctx.moveTo(aimX, aimY - 22);
        ctx.lineTo(aimX - 8, aimY);
        ctx.moveTo(aimX, aimY + 22);
        ctx.lineTo(aimX + 8, aimY);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(aimX, aimY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 10. RADAR MINIMAP
      ctx.save();
      ctx.translate(910, 75);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, 38, 3.5, 0, Math.PI * 2);
      ctx.fill();

      enemiesRef.current.forEach((e) => {
        const blipX = (e.x / 400) * 40;
        const blipY = 38 - ((1000 - e.z) / 1000) * 75;
        if (Math.hypot(blipX, blipY) < 45) {
          ctx.fillStyle = e.type === 'boss' || e.type === 'tank' || e.type === 'soldier_heavy' ? '#ef4444' : '#facc15';
          ctx.beginPath();
          ctx.arc(blipX, blipY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gameState, isPaused, day, selectedFaction, selectedDifficulty, isShopOpen, activeQuiz, isScoped, isReloading, airstrikeCooldown, triggerShoot, spawnEnemy, onAddScore, score]);

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', padding: '1rem', userSelect: 'none' }}>
      {/* Top Navbar */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
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
          ← Kembali ke Games Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 700 }}>
            📅 <strong>DAY {day} / 10</strong>
          </span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 700 }}>
            🎯 Target Sisa: <strong style={{ color: '#4ade80' }}>{dayEnemiesRemaining}</strong>
          </span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 700 }}>
            💰 Poin: <strong style={{ color: '#facc15' }}>{points} Pts</strong>
          </span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 700 }}>
            ⭐ Skor: <strong style={{ color: '#38bdf8' }}>{score}</strong>
          </span>

          {gameState === 'playing' && (
            <button
              onClick={() => setIsPaused(prev => !prev)}
              style={{
                background: isPaused ? '#22c55e' : '#334155',
                color: '#fff',
                border: '1.5px solid #475569',
                borderRadius: '8px',
                padding: '6px 12px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {isPaused ? '▶ Resume' : '⏸️ Pause (P)'}
            </button>
          )}
        </div>
      </div>

      {/* Main Game Container */}
      <div style={{ maxWidth: '1050px', margin: '0 auto', background: '#0f172a', border: '3px solid #334155', borderRadius: '16px', padding: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)' }}>
        {/* HUD Top Bar: Health, Fence Durability, Tactical Skills & Weapon Card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr auto 1.4fr', gap: '10px', alignItems: 'center', marginBottom: '0.75rem' }}>
          {/* Health Bar + Medkit Button */}
          <div style={{ background: '#1e293b', border: '2px solid #334155', borderRadius: '12px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '4px' }}>
                <span>❤️ HP TENTARA</span>
                <span style={{ color: playerHp > 40 ? '#4ade80' : '#ef4444' }}>{playerHp} / 100 HP</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${playerHp}%`,
                    background: playerHp > 40 ? 'linear-gradient(90deg, #16a34a, #4ade80)' : 'linear-gradient(90deg, #dc2626, #ef4444)',
                    transition: 'width 0.2s ease'
                  }}
                />
              </div>
            </div>

            <button
              onClick={triggerUseMedkit}
              disabled={medkitCount <= 0 || playerHp >= 100}
              style={{
                background: medkitCount > 0 && playerHp < 100 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#334155',
                color: '#fff',
                border: '1.5px solid #10b981',
                borderRadius: '8px',
                padding: '5px 8px',
                fontWeight: 900,
                fontSize: '0.7rem',
                cursor: medkitCount > 0 && playerHp < 100 ? 'pointer' : 'not-allowed',
                boxShadow: medkitCount > 0 ? '0 2px 8px rgba(16, 185, 129, 0.4)' : 'none',
                whiteSpace: 'nowrap'
              }}
              title="Gunakan Medkit (+50 HP)"
            >
              💊 Heal: {medkitCount}
            </button>
          </div>

          {/* Barbed Wire Fence Durability Bar */}
          <div style={{ background: '#1e293b', border: '2px solid #475569', borderRadius: '12px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', marginBottom: '4px' }}>
                <span style={{ color: fenceLevel >= 2 ? '#38bdf8' : '#cbd5e1' }}>
                  🛡️ PAGAR DURI {fenceLevel > 1 ? `(Lv.${fenceLevel})` : ''}
                </span>
                <span style={{ color: fenceHp > 0 ? (fenceHp / fenceMaxHp > 0.3 ? '#38bdf8' : '#f59e0b') : '#ef4444' }}>
                  {fenceHp > 0 ? `${fenceHp} / ${fenceMaxHp}` : 'HANCUR!'}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.max(0, Math.min(100, (fenceHp / fenceMaxHp) * 100))}%`,
                    background: fenceHp / fenceMaxHp > 0.4 ? (fenceLevel >= 2 ? 'linear-gradient(90deg, #0284c7, #38bdf8)' : 'linear-gradient(90deg, #64748b, #94a3b8)') : 'linear-gradient(90deg, #b91c1c, #ef4444)',
                    transition: 'width 0.2s ease'
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setIsShopOpen(true)}
              style={{
                background: '#334155',
                color: '#facc15',
                border: '1px solid #eab308',
                borderRadius: '6px',
                padding: '4px 6px',
                fontSize: '0.68rem',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              title="Upgrade atau Perbaiki Pagar di Toko"
            >
              🛠️ Up
            </button>
          </div>

          {/* Tactical Skills Buttons */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onClick={triggerGrenadeThrow}
              disabled={grenadeCount <= 0}
              style={{
                background: grenadeCount > 0 ? 'linear-gradient(135deg, #15803d 0%, #166534 100%)' : '#334155',
                color: '#fff',
                border: '1.5px solid #22c55e',
                borderRadius: '8px',
                padding: '5px 8px',
                fontWeight: 900,
                fontSize: '0.75rem',
                cursor: grenadeCount > 0 ? 'pointer' : 'not-allowed',
                boxShadow: grenadeCount > 0 ? '0 2px 8px rgba(34, 197, 94, 0.4)' : 'none'
              }}
            >
              💣 Granat: {grenadeCount}
            </button>

            <button
              onClick={triggerAirstrikeCall}
              disabled={airstrikeCooldown > 0}
              style={{
                background: airstrikeCooldown <= 0 ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' : '#334155',
                color: '#fff',
                border: '1.5px solid #ef4444',
                borderRadius: '8px',
                padding: '5px 8px',
                fontWeight: 900,
                fontSize: '0.75rem',
                cursor: airstrikeCooldown <= 0 ? 'pointer' : 'not-allowed',
                boxShadow: airstrikeCooldown <= 0 ? '0 2px 8px rgba(239, 68, 68, 0.4)' : 'none'
              }}
            >
              🚨 Misil: {airstrikeCooldown > 0 ? `${Math.ceil(airstrikeCooldown)}s` : 'READY'}
            </button>

            <button
              onClick={() => setIsShopOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                padding: '5px 8px',
                fontWeight: 900,
                fontSize: '0.75rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)'
              }}
            >
              🛒 Toko (B)
            </button>
          </div>

          {/* Weapon Card & Ammo Status */}
          <div style={{ background: '#0284c71a', border: '2px solid #0284c7', borderRadius: '12px', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 800 }}>SENJATA [{currentWeapon.slotKey}]</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: currentWeapon.color }}>
                {currentWeapon.icon} {currentWeapon.name}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: isReloading ? '#f59e0b' : currentWeapon.isMelee ? '#10b981' : currentAmmo <= 3 ? '#ef4444' : '#fff' }}>
                {currentWeapon.isMelee ? 'MELEE 🗡️' : isReloading ? 'RELOAD...' : `${currentAmmo} / ${currentWeapon.maxAmmo}`}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>
                {currentWeapon.isMelee ? 'Tanpa Peluru' : '[R] Reload'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Weapon Slots Toolbar (Keys 1 - 7) */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem', overflowX: 'auto', paddingBottom: '2px' }}>
          {WEAPONS_CATALOG.map((wpn) => {
            const isUnlocked = unlockedWeapons.includes(wpn.id);
            const isEquipped = equippedWeaponId === wpn.id;

            return (
              <button
                key={wpn.id}
                onClick={() => {
                  if (isUnlocked) {
                    setEquippedWeaponId(wpn.id);
                    setCurrentAmmo(wpn.maxAmmo);
                    soldierSounds.playReload();
                  } else {
                    setIsShopOpen(true);
                  }
                }}
                style={{
                  flex: 1,
                  background: isEquipped ? '#0284c733' : isUnlocked ? '#1e293b' : '#0f172a',
                  border: isEquipped ? '2px solid #38bdf8' : isUnlocked ? '1.5px solid #475569' : '1px dashed #334155',
                  borderRadius: '8px',
                  padding: '4px 6px',
                  color: isEquipped ? '#38bdf8' : isUnlocked ? '#fff' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  opacity: isUnlocked ? 1 : 0.6
                }}
                title={isUnlocked ? `Pilih ${wpn.name} (Tekan ${wpn.slotKey})` : `Terkunci: Beli di Toko (${wpn.pointCost} Pts)`}
              >
                <kbd style={{ background: '#334155', padding: '1px 4px', borderRadius: '4px', fontSize: '0.65rem', color: '#facc15' }}>{wpn.slotKey}</kbd>
                <span>{wpn.icon} {wpn.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Canvas Screen */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px', border: '2px solid #1e293b' }}>
          <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            style={{ width: '100%', height: 'auto', display: 'block', background: '#020617', cursor: 'crosshair' }}
          />

          {/* Floating Notice Banner */}
          {floatNotice && (
            <div
              key={floatNotice.id}
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(15, 23, 42, 0.92)',
                border: `2px solid ${floatNotice.color || '#38bdf8'}`,
                color: floatNotice.color || '#fff',
                padding: '8px 20px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                zIndex: 25
              }}
            >
              {floatNotice.text}
            </div>
          )}

          {/* Lobby / Start Screen (Mode Choice & Difficulty) */}
          {gameState === 'lobby' && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
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
                zIndex: 40
              }}
            >
              <div style={{ maxWidth: '680px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>🪖 💣 🛡️ 🎯</div>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.25rem', background: 'linear-gradient(to right, #38bdf8, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  SPECIAL FORCES: WARZONE & ZOMBIE STRIKE
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Bertahan dari <strong>Day 1 sampai Day 10 (Final Boss)</strong>! Hadapi musuh pejalan, sniper, monster toxic, hingga <strong>Armored Combat Tank</strong>!
                </p>

                {/* Difficulty Selector */}
                <div style={{ background: '#1e293b', border: '1.5px solid #334155', borderRadius: '12px', padding: '10px 14px', width: '100%', marginBottom: '1rem', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#facc15', marginBottom: '6px' }}>
                    ⚙️ PILIH TINGKAT KESULITAN MUSUH:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {[
                      { id: 'easy', label: '🟢 Mudah', desc: 'Santai & HP musuh rendah' },
                      { id: 'normal', label: '🟡 Standar', desc: 'Seimbang & seru' },
                      { id: 'hard', label: '🔴 Sulit', desc: 'Cepat & agresif' },
                      { id: 'nightmare', label: '💀 Super Sulit', desc: 'Musuh brutal & tank elit' }
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDifficulty(d.id as GameDifficulty)}
                        style={{
                          padding: '8px 4px',
                          borderRadius: '8px',
                          border: selectedDifficulty === d.id ? '2px solid #facc15' : '1px solid #475569',
                          background: selectedDifficulty === d.id ? '#ca8a0433' : '#0f172a',
                          color: selectedDifficulty === d.id ? '#facc15' : '#cbd5e1',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Selection Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
                  <button
                    onClick={() => startGame('zombies')}
                    style={{
                      background: 'linear-gradient(135deg, #166534 0%, #0f172a 100%)',
                      border: '2px solid #22c55e',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      color: '#fff',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    <div style={{ fontSize: '2.4rem', marginBottom: '4px' }}>🧟 💥</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#4ade80', marginBottom: '4px' }}>
                      MODE 1: ZOMBIE APOCALYPSE
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                      Basmi zombie pejalan, mutan pelari, zombie beracun, goliath tank, hingga Titan Boss!
                    </p>
                  </button>

                  <button
                    onClick={() => startGame('soldiers')}
                    style={{
                      background: 'linear-gradient(135deg, #991b1b 0%, #0f172a 100%)',
                      border: '2px solid #ef4444',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      color: '#fff',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    <div style={{ fontSize: '2.4rem', marginBottom: '4px' }}>🪖 🔫 🛡️</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f87171', marginBottom: '4px' }}>
                      MODE 2: SOLDIERS WARZONE & TANK
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                      Baku tembak dengan pasukan tentara, sniper, dan Armored Battle Tank (tembakan musuh ada yang miss!).
                    </p>
                  </button>
                </div>

                {/* Controls Cheatsheet */}
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '12px 18px', width: '100%', textAlign: 'left', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 800, color: '#facc15', marginBottom: '6px' }}>🎮 KONTROL TAKTIS, SENJATA OP & BARRICADE CAMP:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '6px' }}>
                    <div>• Gerak Wasd: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>W / A / S / D</kbd></div>
                    <div>• Loncat Taktis: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>SPACE</kbd></div>
                    <div>• Tembak / Tebas: <strong>KLIK KIRI</strong></div>
                    <div>• Reload Peluru: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>R</kbd></div>
                    <div>• Scope ADS: <strong>KLIK KANAN</strong> <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>(Senjata Api)</span></div>
                    <div>• Ganti Senjata: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>1 - 9</kbd> <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>(8 Minigun, 9 BFG)</span></div>
                    <div>• Buka Toko (Auto Pause): <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>B</kbd></div>
                    <div>• Barikade Kawat Duri: <strong>Menahan Zombie</strong> <span style={{ fontSize: '0.7rem', color: '#facc15' }}>(Bisa di-upgrade/repair)</span></div>
                    <div>• Heal Medkit (+50): <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>H</kbd></div>
                    <div>• Lempar Granat: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>G</kbd></div>
                    <div>• Target Misil: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>F</kbd> + Klik</div>
                    <div>• Jeda / Pause: <kbd style={{ background: '#334155', padding: '1px 5px', borderRadius: '4px' }}>P / ESC</kbd></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tactical Pause Modal */}
          {isPaused && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
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
                zIndex: 50
              }}
            >
              <div style={{ maxWidth: '440px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>⏸️ 🛡️</div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#facc15', marginBottom: '0.5rem' }}>
                  GAME PAUSED (TACTICAL BREAK)
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Pertempuran dihentikan sementara. Atur strategi persenjataanmu!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  <button
                    onClick={() => setIsPaused(false)}
                    style={{
                      padding: '12px',
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
                    ▶ Lanjutkan Pertempuran (Resume)
                  </button>

                  <button
                    onClick={() => {
                      setIsShopOpen(true);
                      setIsPaused(false);
                    }}
                    style={{
                      padding: '12px',
                      background: '#0284c7',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    🛒 Buka Toko Arsenal & Kuis
                  </button>

                  <button
                    onClick={() => startGame(selectedFaction)}
                    style={{
                      padding: '12px',
                      background: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Restart Day 1
                  </button>

                  <button
                    onClick={() => setGameState('lobby')}
                    style={{
                      padding: '12px',
                      background: '#475569',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    🏠 Kembali ke Menu Utama
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Day Clear Screen */}
          {gameState === 'day_clear' && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
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
                zIndex: 40
              }}
            >
              <div style={{ maxWidth: '480px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.25rem' }}>🎉 🏆 🎖️</div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4ade80', marginBottom: '0.25rem' }}>
                  DAY {day} COMPLETED!
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Semua musuh di Day {day} telah disapu bersih! Bonus: <strong>+40 HP & +200 Poin</strong>!
                </p>

                <div style={{ background: '#1e293b', border: '2px solid #334155', borderRadius: '12px', padding: '1rem 1.5rem', width: '100%', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Total Skor:</span>
                    <strong style={{ color: '#38bdf8' }}>⭐ {score} Pts</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Poin Arsenal:</span>
                    <strong style={{ color: '#facc15' }}>💰 {points} Pts</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Misi Selanjutnya:</span>
                    <strong style={{ color: '#4ade80' }}>Day {day + 1} ({getEnemiesForDay(day + 1, selectedDifficulty)} Musuh)</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                  <button
                    onClick={() => startNextDay(day + 1)}
                    style={{
                      flex: 1.2,
                      padding: '12px',
                      background: '#22c55e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 900,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)'
                    }}
                  >
                    ▶ Lanjut ke Day {day + 1}
                  </button>
                  <button
                    onClick={() => setIsShopOpen(true)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#f59e0b',
                      color: '#000',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    🛒 Toko Senjata
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Victory Screen (Day 10 Final Boss Defeated) */}
          {gameState === 'victory' && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
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
                zIndex: 40
              }}
            >
              <div style={{ maxWidth: '480px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.25rem' }}>👑 🥇 🏆 🎆</div>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#facc15', marginBottom: '0.25rem' }}>
                  VICTORY! FINAL BOSS DEFEATED!
                </h2>
                <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Selamat, Prajurit! Anda berhasil bertahan hingga <strong>Day 10</strong> dan memusnahkan Final Boss!
                </p>

                <div style={{ background: '#1e293b', border: '2px solid #facc15', borderRadius: '12px', padding: '1rem 1.5rem', width: '100%', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Total Skor Akhir:</span>
                    <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>⭐ {score + 1500} Pts</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Total Musuh Dieliminasi:</span>
                    <strong style={{ color: '#4ade80' }}>{enemiesKilled} Musuh</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Tingkat Kesulitan:</span>
                    <strong style={{ color: '#facc15' }}>{selectedDifficulty.toUpperCase()}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                  <button
                    onClick={() => startGame(selectedFaction)}
                    style={{
                      flex: 1,
                      padding: '12px',
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
                    🔄 Main Lagi
                  </button>
                  <button
                    onClick={() => setGameState('lobby')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ganti Mode
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'game_over' && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
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
                zIndex: 40
              }}
            >
              <div style={{ maxWidth: '440px', width: '100%', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>💀 🪦 💥</div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ef4444', marginBottom: '0.5rem' }}>
                  SOLDIER DOWN! (GAME OVER)
                </h2>
                <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                  Gugur dalam pertempuran di <strong>Day {day}</strong> dengan <strong>{enemiesKilled} Musuh Dieliminasi</strong>!
                </p>

                <div style={{ background: '#1e293b', border: '2px solid #334155', borderRadius: '12px', padding: '1rem 1.5rem', width: '100%', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Total Skor:</span>
                    <strong style={{ color: '#38bdf8' }}>⭐ {score} Pts</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Musuh Dieliminasi:</span>
                    <strong style={{ color: '#4ade80' }}>{enemiesKilled} Musuh</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Senjata Terbuka:</span>
                    <strong style={{ color: '#facc15' }}>{unlockedWeapons.length} / {WEAPONS_CATALOG.length}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                  <button
                    onClick={() => startGame(selectedFaction)}
                    style={{
                      flex: 1,
                      padding: '12px',
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
                    🔄 Coba Lagi
                  </button>
                  <button
                    onClick={() => setGameState('lobby')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ganti Mode
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ARSENAL & WEAPON UPGRADE MODAL */}
          {isShopOpen && !activeQuiz && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '1.25rem 1rem 3.5rem',
                zIndex: 50,
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y'
              }}
            >
              <div
                style={{
                  background: '#0f172a',
                  border: '3px solid #f59e0b',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  maxWidth: '820px',
                  width: '100%',
                  margin: 'auto 0',
                  boxShadow: '0 10px 35px rgba(0,0,0,0.8)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#facc15', margin: 0 }}>
                      🛒 ARSENAL & PERSENJATAAN TAKTIS
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0' }}>
                      Beli senjata / amunisi bantuan + selesaikan <strong>1 Kuis Matematika</strong> untuk membukanya!
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>POIN ANDA:</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#facc15' }}>💰 {points} Pts</div>
                    </div>
                    <button
                      onClick={() => setIsShopOpen(false)}
                      style={{
                        background: '#334155',
                        color: '#cbd5e1',
                        border: 'none',
                        borderRadius: '8px',
                        width: '36px',
                        height: '36px',
                        fontWeight: 900,
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Tutup Toko"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Weapons List Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginBottom: '1rem' }}>
                  {WEAPONS_CATALOG.map((wpn) => {
                    const isUnlocked = unlockedWeapons.includes(wpn.id);
                    const isEquipped = equippedWeaponId === wpn.id;
                    const canAfford = points >= wpn.pointCost;

                    return (
                      <div
                        key={wpn.id}
                        style={{
                          background: isEquipped ? '#0284c722' : '#1e293b',
                          border: isEquipped ? '2px solid #38bdf8' : isUnlocked ? '1.5px solid #10b981' : '1px solid #334155',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: wpn.color }}>
                              {wpn.icon} [{wpn.slotKey}] {wpn.name}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isUnlocked ? '#4ade80' : '#facc15' }}>
                              {isUnlocked ? 'TERBUKA' : `💰 ${wpn.pointCost} Pts`}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 8px' }}>{wpn.description}</p>
                          <div style={{ fontSize: '0.7rem', color: '#cbd5e1', display: 'flex', gap: '12px' }}>
                            <span>💥 Dmg: {wpn.damage}</span>
                            <span>📦 Mag: {wpn.isMelee ? '∞' : wpn.maxAmmo}</span>
                            <span>⏱️ Reload: {wpn.isMelee ? 'Instant' : `${wpn.reloadDuration}s`}</span>
                          </div>
                        </div>

                        <div style={{ marginTop: '10px' }}>
                          {isEquipped ? (
                            <button disabled style={{ width: '100%', padding: '6px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem', cursor: 'default' }}>
                              ✅ Sedang Digunakan (Slot {wpn.slotKey})
                            </button>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => {
                                setEquippedWeaponId(wpn.id);
                                setCurrentAmmo(wpn.maxAmmo);
                                setIsShopOpen(false);
                                setFloatNotice({ text: `Equipped: ${wpn.name}`, id: Date.now() });
                              }}
                              style={{ width: '100%', padding: '6px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                              Gunakan Senjata Ini (Slot {wpn.slotKey})
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenWeaponQuiz(wpn)}
                              disabled={!canAfford}
                              style={{
                                width: '100%',
                                padding: '6px',
                                background: canAfford ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#334155',
                                color: canAfford ? '#000' : '#94a3b8',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: 900,
                                fontSize: '0.8rem',
                                cursor: canAfford ? 'pointer' : 'not-allowed'
                              }}
                            >
                              {canAfford ? '🧮 Beli (Jawab Kuis)' : 'Poin Kurang'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tactical Supplies Purchases (Granat, Misil & Medkit) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '0.75rem' }}>
                  <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '10px', padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#4ade80', fontSize: '0.85rem' }}>💊 +1 Medkit (+50 HP)</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 6px' }}>Biaya: 80 Pts</div>
                    <button
                      onClick={() => handleOpenSkillQuiz('medkit')}
                      disabled={points < 80}
                      style={{ width: '100%', padding: '6px', background: points >= 80 ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: points >= 80 ? 'pointer' : 'not-allowed' }}
                    >
                      Beli Medkit + Kuis
                    </button>
                  </div>

                  <div style={{ background: '#1e293b', border: '1px solid #22c55e', borderRadius: '10px', padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#22c55e', fontSize: '0.85rem' }}>💣 +3 Granat Tangan</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 6px' }}>Biaya: 100 Pts</div>
                    <button
                      onClick={() => handleOpenSkillQuiz('grenade')}
                      disabled={points < 100}
                      style={{ width: '100%', padding: '6px', background: points >= 100 ? '#15803d' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: points >= 100 ? 'pointer' : 'not-allowed' }}
                    >
                      Beli Granat + Kuis
                    </button>
                  </div>

                  <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '10px', padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.85rem' }}>🚨 Reset Cooldown Misil</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 6px' }}>Biaya: 200 Pts</div>
                    <button
                      onClick={() => handleOpenSkillQuiz('airstrike')}
                      disabled={points < 200}
                      style={{ width: '100%', padding: '6px', background: points >= 200 ? '#dc2626' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: points >= 200 ? 'pointer' : 'not-allowed' }}
                    >
                      Reset Misil + Kuis
                    </button>
                  </div>
                </div>

                {/* Defense Barbed Wire Fence Upgrades & Repairs */}
                <div style={{ background: '#0284c715', border: '1.5px solid #0284c7', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.85rem' }}>
                      🛡️ PERTAHANAN PAGAR KAWAT BERDURI MILITER (LVL {fenceLevel})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: fenceHp > 0 ? '#4ade80' : '#ef4444', fontWeight: 800 }}>
                      Durabilitas: {fenceHp} / {fenceMaxHp} HP {fenceHp <= 0 ? '(JEBOL!)' : ''}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenSkillQuiz('fence_repair')}
                      disabled={points < 120 || fenceHp >= fenceMaxHp}
                      style={{
                        padding: '8px',
                        background: points >= 120 && fenceHp < fenceMaxHp ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#334155',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        cursor: points >= 120 && fenceHp < fenceMaxHp ? 'pointer' : 'not-allowed'
                      }}
                    >
                      🔧 Perbaiki Pagar (+250 HP) [💰 120 Pts + Kuis]
                    </button>

                    <button
                      onClick={() => handleOpenSkillQuiz('fence_upgrade')}
                      disabled={points < 250}
                      style={{
                        padding: '8px',
                        background: points >= 250 ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : '#334155',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        cursor: points >= 250 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      ⚡ Upgrade Pagar Listrik (+300 Max HP) [💰 250 Pts + Kuis]
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsShopOpen(false)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#334155',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Tutup Arsenal (Kembali Bertarung)
                </button>
              </div>
            </div>
          )}

          {/* TACTICAL MATH QUIZ MODAL */}
          {activeQuiz && (
            <div
              data-lenis-prevent="true"
              className="custom-scrollbar"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.95)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '1.5rem 1rem 3rem',
                zIndex: 60,
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div style={{ background: '#0f172a', border: '3px solid #38bdf8', borderRadius: '16px', padding: '1.75rem', maxWidth: '540px', width: '100%', margin: 'auto 0', textAlign: 'center', boxShadow: '0 10px 35px rgba(0,0,0,0.8)' }}>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 900, marginBottom: '6px' }}>
                  🪖 MILITARY TACTICAL CALCULATION
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '0 0 8px' }}>
                  {activeQuiz.rewardType === 'weapon' && activeQuiz.targetWeapon ? `Buka ${activeQuiz.targetWeapon.name}` : `Konfirmasi Pembelian ${activeQuiz.rewardType.toUpperCase()}`}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Jawab soal matematika berikut untuk mengonfirmasi amunisi & persenjataan:
                </p>

                <div style={{ background: '#1e293b', border: '2px solid #facc15', borderRadius: '12px', padding: '1rem', fontSize: '2rem', fontWeight: 900, color: '#facc15', letterSpacing: '2px', marginBottom: '1.25rem' }}>
                  {activeQuiz.prompt}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                  {activeQuiz.options.map((opt, idx) => {
                    const isSelected = quizAnswerFeedback === idx;
                    const isCorrect = isSelected && idx === activeQuiz.correctIndex;
                    const isWrong = isSelected && idx !== activeQuiz.correctIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuiz(idx)}
                        disabled={quizAnswerFeedback !== null}
                        style={{
                          padding: '12px',
                          background: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#1e293b',
                          color: '#fff',
                          border: isCorrect ? '2px solid #4ade80' : isWrong ? '2px solid #ef4444' : '2px solid #334155',
                          borderRadius: '10px',
                          fontWeight: 800,
                          fontSize: '1.2rem',
                          cursor: quizAnswerFeedback === null ? 'pointer' : 'default',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveQuiz(null)}
                  style={{
                    background: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Batalkan Upgrade
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
