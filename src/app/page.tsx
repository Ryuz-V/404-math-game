"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import MateriSection from '../components/MateriSection';
import SoloGame from '../components/SoloGame';
import VersusGame from '../components/VersusGame';
import LeaderboardSection from '../components/LeaderboardSection';
import AboutSection from '../components/AboutSection';
import AuthModal from '../components/AuthModal';
import { MATERI_KELAS_12, MATH_QUESTIONS } from '../data/mathData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'materi' | 'solo' | 'versus' | 'leaderboard' | 'about'>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined);

  // Auth & Profile State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'edit_profile'>('login');
  const [userProfile, setUserProfile] = useState<{ name: string; avatar: string; score: number }>({
    name: 'Player 1',
    avatar: '👑',
    score: 0
  });

  const handleAddScore = (pts: number) => {
    setUserProfile(prev => ({
      ...prev,
      score: prev.score + pts
    }));
  };

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Search filter
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...MATERI_KELAS_12.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(m => ({ type: 'materi' as const, id: m.id, title: m.title, category: m.category, icon: m.icon })),
    ...MATH_QUESTIONS.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(q => ({ type: 'question' as const, id: q.topicId, title: q.question, category: q.topicTitle, icon: '❓' }))
  ];

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    if (searchResults.length > 0) {
      handleSelectSearchResult(searchResults[0].type, searchResults[0].id);
    } else {
      setCurrentView('materi');
    }
  };

  useGSAP(() => {
    if (currentView !== 'home') return;

    const tl = gsap.timeline();
    tl.from('.hero-content h1', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-content p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-content .btn-subscribe', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    gsap.from('.feature', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5
    });



    gsap.from('.decoration', {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.6
    });

    // Continuous floating animation for shapes
    gsap.to('.green-triangle', {
      y: '-=15',
      rotation: 15,
      yoyo: true,
      repeat: -1,
      duration: 2.5,
      ease: 'sine.inOut'
    });
    
    gsap.to('.squiggly-arrow', {
      y: '+=10',
      rotation: -5,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut'
    });
    
    gsap.fromTo('.marquee-content', 
      { x: '0%' },
      {
        x: '-50%',
        ease: 'none',
        duration: 25,
        repeat: -1
      }
    );

  }, { scope: container, dependencies: [currentView] });

  const StarIcon = () => (
    <div className="star-icon">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path fill="#ffdc00" d="M50,5 L58,30 L83,17 L70,42 L95,50 L70,58 L83,83 L58,70 L50,95 L42,70 L17,83 L30,58 L5,50 L30,42 L17,17 L42,30 Z"/>
      </svg>
    </div>
  );

  const handleStartSoloWithTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('solo');
  };

  const handleSelectSearchResult = (type: 'materi' | 'question', topicId: string) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (type === 'materi') {
      setSelectedTopicId(topicId);
      setCurrentView('materi');
    } else {
      setSelectedTopicId(topicId);
      setCurrentView('solo');
    }
  };

  const handleOpenProfileOrLogin = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthOpen(true);
    } else {
      setAuthMode('edit_profile');
      setIsAuthOpen(true);
    }
  };

  const handleLoginSuccess = (name: string, avatar: string) => {
    setUserProfile(prev => ({ ...prev, name, avatar }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div ref={container}>
      {/* Header / Navbar Matching Screenshot Exactly */}
      <header className="header">
        <div className="logo" onClick={() => setCurrentView('home')}>
          Math101
        </div>
        <nav className="nav">
          <a
            href="#"
            style={{ fontWeight: currentView === 'menu' || currentView === 'versus' ? 800 : 600 }}
            onClick={(e) => { e.preventDefault(); setCurrentView('menu'); }}
          >
            Games
          </a>
          <a
            href="#"
            style={{ fontWeight: currentView === 'materi' ? 800 : 600 }}
            onClick={(e) => { e.preventDefault(); setCurrentView('materi'); }}
          >
            Resources
          </a>
          <a
            href="#"
            style={{ fontWeight: currentView === 'leaderboard' ? 800 : 600 }}
            onClick={(e) => { e.preventDefault(); setCurrentView('leaderboard'); }}
          >
            Leaderboard
          </a>
          <a
            href="#"
            style={{ fontWeight: currentView === 'solo' ? 800 : 600 }}
            onClick={(e) => {
              e.preventDefault();
              setSelectedTopicId(undefined);
              setCurrentView('solo');
            }}
          >
            Quizz
          </a>
          <a
            href="#"
            style={{ fontWeight: currentView === 'about' ? 800 : 600 }}
            onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}
          >
            About
          </a>
        </nav>

        {/* Header Search Input */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit();
            }}
          />
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          {/* Search Dropdown Results */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="search-item"
                    onClick={() => handleSelectSearchResult(item.type, item.id)}
                  >
                    <span className="search-item-icon">{item.icon}</span>
                    <div>
                      <div className="search-item-title">{item.title}</div>
                      <div className="search-item-cat">{item.category} • {item.type === 'materi' ? 'Modul Teori' : 'Latihan Soal'}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-no-result">
                  Tidak ditemukan hasil untuk &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* User Auth Buttons */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <button
                className="btn btn-login"
                title="Klik untuk ubah profil"
                onClick={handleOpenProfileOrLogin}
              >
                {userProfile.avatar} {userProfile.name}
              </button>
              <button
                className="btn btn-signup"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-login"
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                }}
              >
                Log in
              </button>
              <button
                className="btn btn-signup"
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthOpen(true);
                }}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        {/* VIEW 1: ORIGINAL HOMEPAGE (Matching Screenshot 1-5) */}
        {currentView === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="hero-section">
              <section className="left-section">
                <div className="hero-content">
                  <h1>Master Mathematics<br/>Through Games and Challenges</h1>
                  <p>
                    Explore mathematics through interactive games, exercises, and challenges
                    that help you improve your skills while having fun.
                  </p>
                  
                  <button className="btn-subscribe" onClick={() => setCurrentView('menu')}>
                    Get Started Now
                  </button>
                </div>    
                
                <div className="bottom-bar">
                  <div className="marquee-content">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="marquee-items">
                        <div className="feature"><StarIcon /> Leaderboards</div>
                        <span className="gap-text">{"//"}</span>
                        <div className="feature"><StarIcon /> Learning Resources</div>
                        <span className="gap-text">{"//"}</span>
                        <div className="feature"><StarIcon /> Challenges</div>
                        <span className="gap-text">{"//"}</span>
                        <div className="feature"><StarIcon /> Quizzes</div>
                        <span className="gap-text">{"//"}</span>
                        <div className="feature"><StarIcon /> Games</div>
                        <span className="gap-text">{"//"}</span>
                        <div className="feature"><StarIcon /> Math Exercises</div>
                        <span className="gap-text">{"//"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              <section className="right-section">
                {/* SVG Decorations */}
                <div className="decoration squiggly-arrow">
                  <svg width="80" height="90" viewBox="0 0 80 90" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M50 10 C 20 -10, -10 30, 30 40 C 70 50, 70 80, 40 80 C 30 80, 20 70, 20 70" />
                    <path d="M10 60 L 20 70 L 35 60" />
                  </svg>
                </div>
                <div className="decoration green-triangle">
                  <svg width="40" height="50" viewBox="0 0 40 50">
                    <polygon points="0,0 40,25 0,50" fill="#7bf358" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="decoration wavy-lines">
                  <svg width="70" height="40" viewBox="0 0 70 40" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 5 5 Q 12.5 0, 20 5 T 35 5 T 50 5 T 65 5" />
                    <path d="M 5 15 Q 12.5 10, 20 15 T 35 15 T 50 15 T 65 15" />
                    <path d="M 5 25 Q 12.5 20, 20 25 T 35 25 T 50 25 T 65 25" />
                    <path d="M 5 35 Q 12.5 30, 20 35 T 35 35 T 50 35 T 65 35" />
                  </svg>
                </div>
                <div className="decoration pink-semi-circle">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path d="M 10 10 A 15 15 0 1 0 30 30" fill="none" stroke="#ff6b6b" strokeWidth="7" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="decoration blue-quarter-circle">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <path d="M 0 60 A 60 60 0 0 1 60 0 L 60 60 Z" fill="#00d0ff" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Floating Assets */}
                <Image src="/assets/fireball.png" alt="fireball asset" width={170} height={170} style={{ position: 'absolute', zIndex: 2, width: '170px', height: 'auto', top: '3%', right: '15%' }} priority />
                <Image src="/assets/xray.png" alt="xray asset" width={130} height={130} style={{ position: 'absolute', zIndex: 2, width: '130px', height: 'auto', top: '27.8%', right: '18.4%' }} priority />
                <Image src="/assets/random.png" alt="random asset" width={150} height={150} style={{ position: 'absolute', zIndex: 2, width: '150px', height: 'auto', top: '3%', left: '2%' }} priority />
                <Image src="/assets/yey.png" alt="yey asset" width={250} height={250} style={{ position: 'absolute', zIndex: 2, width: '250px', height: 'auto', top: '30%', right: '15%' }} priority />
                <Image src="/assets/si_paling_mtk.png" alt="si paling mtk asset" width={200} height={200} style={{ position: 'absolute', zIndex: 2, width: '200px', height: 'auto', bottom: '39%', left: '10%' }} priority />
                <Image src="/assets/kue_pun_dihitung.png" alt="kue pun dihitung asset" width={250} height={250} style={{ position: 'absolute', zIndex: 2, width: '250px', height: 'auto', bottom: '-5.8%', right: '1%' }} priority />
                <Image src="/assets/anjay.png" alt="anjay asset" width={180} height={180} style={{ position: 'absolute', zIndex: 2, width: '180px', height: 'auto', bottom: '-0.1%', right: '45%' }} priority />
                <Image src="/assets/gokil.png" alt="gokil asset" width={200} height={200} style={{ position: 'absolute', zIndex: 2, width: '200px', height: 'auto', bottom: '-0.8%', right: '70%' }} priority />
              </section>
            </section>
            {/* FEATURES SECTION (Duolingo Style) */}
            <section className="features-section">
              <div className="feature-row">
                <div className="feature-text">
                  <h2>Gratis. Seru. Efektif.</h2>
                  <p>Belajar matematika di 404_math itu seru dan terbukti efektif! Dengan materi yang interaktif, kamu akan memahami konsep dari dasar hingga mahir dengan mudah.</p>
                </div>
                <div className="feature-image">
                  <Image src="/assets/si_paling_mtk.png" alt="Gratis seru efektif" width={300} height={300} />
                </div>
              </div>

              <div className="feature-row reverse">
                <div className="feature-text">
                  <h2>Didukung Ilmu Pengetahuan</h2>
                  <p>Kami memadukan metode pengajaran berbasis riset dengan konten yang interaktif untuk membantumu memecahkan masalah matematika dengan logika yang tepat.</p>
                </div>
                <div className="feature-image">
                  <Image src="/assets/xray.png" alt="Ilmu pengetahuan" width={300} height={300} />
                </div>
              </div>

              <div className="feature-row">
                <div className="feature-text">
                  <h2>Tetap Termotivasi</h2>
                  <p>Kami membuat belajar matematika menjadi kebiasaan yang menyenangkan dengan tantangan seru, pencapaian, dan sistem belajar yang mirip seperti bermain game.</p>
                </div>
                <div className="feature-image">
                  <Image src="/assets/gokil.png" alt="Termotivasi" width={300} height={300} />
                </div>
              </div>
            </section>

            {/* TOPICS SECTION (Matching Screenshot 2 & 3) */}
            <section className="topics-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Explore Topics</h2>
                  <p className="section-subtitle">Master mathematics step-by-step with our comprehensive, curriculum-aligned topic breakdowns.</p>
                </div>
              </div>
              <div className="topics-grid">
                <div className="topic-card card-bg-yellow" onClick={() => handleStartSoloWithTopic('kaidah-pencacahan')}>
                  <div className="topic-icon">🔢</div>
                  <h3>Algebra</h3>
                  <p>Master equations, inequalities, and functions to build a strong mathematical foundation.</p>
                </div>
                <div className="topic-card card-bg-pink" onClick={() => handleStartSoloWithTopic('dimensi-tiga')}>
                  <div className="topic-icon">📐</div>
                  <h3>Geometry</h3>
                  <p>Explore shapes, sizes, properties of space, and visual reasoning.</p>
                </div>
                <div className="topic-card card-bg-blue" onClick={() => handleStartSoloWithTopic('kalkulus-lanjut')}>
                  <div className="topic-icon">📈</div>
                  <h3>Calculus</h3>
                  <p>Understand limits, derivatives, integrals, and the mathematics of continuous change.</p>
                </div>
                <div className="topic-card card-bg-green" onClick={() => handleStartSoloWithTopic('statistika')}>
                  <div className="topic-icon">📊</div>
                  <h3>Statistics</h3>
                  <p>Learn to collect, analyze, interpret, and present data effectively.</p>
                </div>
              </div>
            </section>

            {/* CTA SECTION (Matching Screenshot 4 & 5) */}
            <section className="cta-section">
              <h2>Ready to master math?</h2>
              <p>Join thousands of students who are already improving their grades and understanding of complex mathematical concepts.</p>
              <button className="btn-subscribe" onClick={() => setCurrentView('menu')}>Get Started Now</button>
              
              <div className="decoration pink-semi-circle" style={{ top: '10%', right: '15%', left: 'auto', bottom: 'auto', transform: 'rotate(45deg)' }}>
                <svg width="60" height="60" viewBox="0 0 40 40">
                  <path d="M 10 10 A 15 15 0 1 0 30 30" fill="none" stroke="#ff6b6b" strokeWidth="7" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="decoration blue-quarter-circle" style={{ bottom: '10%', left: '10%', right: 'auto', top: 'auto', transform: 'rotate(-45deg)' }}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path d="M 0 60 A 60 60 0 0 1 60 0 L 60 60 Z" fill="#00d0ff" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
                </svg>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: GAME & MATERI MENU SELECTION HUB */}
        {currentView === 'menu' && (
          <div className="menu-hub-container">
            <div className="menu-hub-header">
              <div className="menu-hub-badge">🎮 Game & Learning Hub</div>
              <h1 className="menu-hub-title">Pilih Menu Pembelajaran & Permainan</h1>
              <p className="menu-hub-subtitle">
                Pilih salah satu menu di bawah untuk mempelajari materi Matematika Kelas 12 atau bermain game kuis!
              </p>
            </div>

            <div className="menu-cards-grid">
              {/* Menu Card 1: Materi Kelas 12 */}
              <div
                className="menu-card-item menu-card-materi"
                onClick={() => setCurrentView('materi')}
              >
                <div className="card-item-top">
                  <div className="card-item-icon-box">📚</div>
                  <span className="card-item-tag">Kurikulum SMA</span>
                  <h3 className="card-item-title">Materi Matematika Kelas 12</h3>
                  <p className="card-item-desc">
                    Pelajari rangkuman rumus, konsep kunci Dimensi Tiga, Statistika Kelompok, Kaidah Pencacahan, dan Kalkulus beserta contoh soal.
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Buka Modul Materi</strong>
                  <span>➡️</span>
                </div>
              </div>

              {/* Menu Card 2: Solo Quiz */}
              <div
                className="menu-card-item menu-card-solo"
                onClick={() => {
                  setSelectedTopicId(undefined);
                  setCurrentView('solo');
                }}
              >
                <div className="card-item-top">
                  <div className="card-item-icon-box">🎯</div>
                  <span className="card-item-tag">Mode Latihan 1P</span>
                  <h3 className="card-item-title">Quiz Solo & Latihan Soal</h3>
                  <p className="card-item-desc">
                    Uji pemahaman matematikamu dengan kuis bertempo waktu, streak skor, kalkulator bantuan, dan pembahasan langkah demi langkah.
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Mulai Quiz Solo</strong>
                  <span>➡️</span>
                </div>
              </div>

              {/* Menu Card 3: 1 vs 1 Duel */}
              <div
                className="menu-card-item menu-card-versus"
                onClick={() => setCurrentView('versus')}
              >
                <div className="card-item-top">
                  <div className="card-item-icon-box">⚔️</div>
                  <span className="card-item-tag">Mode Duel 2P (1 Keyboard)</span>
                  <h3 className="card-item-title">Duel 1 vs 1 (Lawan Teman)</h3>
                  <p className="card-item-desc">
                    Tantang teman sebangkumu dalam duel split-screen! Player 1 (A/S/D/F) vs Player 2 (H/J/K/L) beradu cepat & tepat.
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Mulai Duel 1 vs 1</strong>
                  <span>➡️</span>
                </div>
              </div>

              {/* Menu Card 4: Leaderboard */}
              <div
                className="menu-card-item menu-card-leaderboard"
                onClick={() => setCurrentView('leaderboard')}
              >
                <div className="card-item-top">
                  <div className="card-item-icon-box">🏆</div>
                  <span className="card-item-tag">Peringkat & Skor</span>
                  <h3 className="card-item-title">Papan Skor Leaderboard</h3>
                  <p className="card-item-desc">
                    Lihat peringkat teratas pemain dengan skor tertinggi dan pertahankan posisi juaramu di podium kehormatan!
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Lihat Leaderboard</strong>
                  <span>➡️</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button
                className="btn-back-main"
                onClick={() => setCurrentView('home')}
              >
                ⬅️ Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: MATERI KELAS 12 (Resources) */}
        {currentView === 'materi' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Kembali ke Beranda (Home)
              </button>
              <button className="btn-back-main" style={{ background: '#ffdc00' }} onClick={() => setCurrentView('menu')}>
                🎮 Buka Menu Game
              </button>
            </div>
            <MateriSection
              onStartSoloWithTopic={handleStartSoloWithTopic}
              onStartVersus={() => setCurrentView('versus')}
            />
          </div>
        )}

        {/* VIEW 4: GAME SOLO (1P / Quiz) */}
        {currentView === 'solo' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Kembali ke Beranda (Home)
              </button>
              <button className="btn-back-main" style={{ background: '#ffdc00' }} onClick={() => setCurrentView('menu')}>
                🎮 Hub Menu
              </button>
            </div>
            <SoloGame
              initialTopicId={selectedTopicId}
              onBackToMenu={() => setCurrentView('menu')}
              onSwitchToVersus={() => setCurrentView('versus')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW 5: GAME 1 VS 1 (DUO) */}
        {currentView === 'versus' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Kembali ke Beranda (Home)
              </button>
              <button className="btn-back-main" style={{ background: '#ffdc00' }} onClick={() => setCurrentView('menu')}>
                🎮 Hub Menu
              </button>
            </div>
            <VersusGame
              onBackToMenu={() => setCurrentView('menu')}
              onSwitchToSolo={() => setCurrentView('solo')}
            />
          </div>
        )}

        {/* VIEW 6: LEADERBOARD */}
        {currentView === 'leaderboard' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Kembali ke Beranda (Home)
              </button>
              <button className="btn-back-main" style={{ background: '#ffdc00' }} onClick={() => setCurrentView('menu')}>
                🎮 Hub Menu
              </button>
            </div>
            <LeaderboardSection
              onStartSolo={() => {
                setSelectedTopicId(undefined);
                setCurrentView('solo');
              }}
              onStartVersus={() => setCurrentView('versus')}
              onOpenLogin={() => {
                setAuthMode('login');
                setIsAuthOpen(true);
              }}
              currentUser={{
                name: userProfile.name,
                avatar: userProfile.avatar,
                isLoggedIn,
                score: userProfile.score
              }}
            />
          </div>
        )}

        {/* VIEW 7: ABOUT */}
        {currentView === 'about' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Kembali ke Beranda (Home)
              </button>
              <button className="btn-back-main" style={{ background: '#ffdc00' }} onClick={() => setCurrentView('menu')}>
                🎮 Hub Menu
              </button>
            </div>
            <AboutSection
              onStartMenu={() => setCurrentView('menu')}
              onStartMateri={() => setCurrentView('materi')}
            />
          </div>
        )}
      </main>

      {/* User Profile & Auth Modal */}
      <AuthModal
        key={`${isAuthOpen ? 'open' : 'closed'}-${authMode}-${userProfile.name}-${userProfile.avatar}`}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={authMode}
        isLoggedIn={isLoggedIn}
        currentUsername={userProfile.name}
        currentAvatar={userProfile.avatar}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* ORIGINAL FOOTER (Matching Screenshot 5) */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="#" className="logo" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>
              Math101
            </Link>
            <p>Empowering students to conquer mathematics through interactive exercises, peer collaboration, and expert solutions.</p>
          </div>
          
          <div className="footer-links-group">
            <h4>Learn</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('kaidah-pencacahan'); }}>Algebra</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('dimensi-tiga'); }}>Geometry</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('kalkulus-lanjut'); }}>Calculus</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('statistika'); }}>Statistics</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}>Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}>Blog</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}>Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Legal</h4>
            <ul>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Math101. All rights reserved.</p>
          <div className="social-links">
            <Link href="#">Twitter</Link>
            <Link href="#">LinkedIn</Link>
            <Link href="#">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
