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
import QuizLibrary from '../components/QuizLibrary';
import { MATERI_KELAS_12, MATH_QUESTIONS } from '../data/mathData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'materi' | 'solo' | 'versus' | 'leaderboard' | 'about' | 'quiz-library'>('home');
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

    // Stacking features showcase
    const featureRows = gsap.utils.toArray('.feature-row');
    featureRows.forEach((row: any, i) => {
      if (i < featureRows.length - 1) {
        ScrollTrigger.create({
          trigger: row,
          start: "top 15%",
          endTrigger: featureRows[featureRows.length - 1] as Element,
          end: "top 15%",
          pin: true,
          pinSpacing: false,
        });
      }
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
            style={{ fontWeight: currentView === 'quiz-library' || currentView === 'solo' ? 800 : 600 }}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('quiz-library');
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
                      <div className="search-item-cat">{item.category} • {item.type === 'materi' ? 'Theory Module' : 'Practice'}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-no-result">
                  No results found for &quot;{searchQuery}&quot;
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
                title="Click to edit profile"
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
                <img src="/assets/done.png" alt="done" style={{ position: 'absolute', zIndex: 2, width: '1000px', top: '3%', right: '-3%' }} />

              </section>
            </section>

            {/* FEATURES SHOWCASE SECTION */}
            <section className="features-showcase">
              <div className="feature-row" style={{ backgroundColor: '#fff', position: 'relative', zIndex: 1, padding: '2rem 0' }}>
                <div className="feature-text">
                  <h2 style={{ color: '#000000', fontSize: '48px' }}>Learning is Fun with Friends</h2>
                  <p>Learning Math404 with friends is more fun and exciting! Explore various math materials, test your skills through quizzes, and face daily challenges.</p>
                </div>
                <div className="feature-image">
                  <img src="/assets/3.png" alt="Feature 1" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>

              <div className="feature-row reverse" style={{ backgroundColor: '#fff', position: 'relative', zIndex: 2, padding: '2rem 0' }}>
                <div className="feature-text">
                  <h2 style={{ color: '#000000', fontSize: '48px' }}>Comprehensive Materials</h2>
                  <p>Learn mathematics completely and structurally, from basic concepts to more challenging materials. Find easy-to-understand explanations, examples, and practice questions to improve your skills.</p>
                </div>
                <div className="feature-image">
                  <img src="/assets/gokil.png" alt="Feature 2" style={{ width: '85%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>

              <div className="feature-row" style={{ backgroundColor: '#fff', position: 'relative', zIndex: 3, padding: '2rem 0' }}>
                <div className="feature-text">
                  <h2 style={{ color: '#000000' }}>Exciting and Fun Challenges</h2>
                  <p>Ready to test your skills? Face various math challenges, solve problems, earn scores, and prove how far you can go!</p>
                </div>
                <div className="feature-image">
                  <img src="/assets/together.png" alt="Feature 3" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>
            </section>

            {/* TOPICS SECTION (Matching Screenshot 2 & 3) */}
            <section className="topics-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Explore All Topics</h2>
                  <p className="section-subtitle">
                    Explore exciting math topics, master new concepts, <br />
                    and challenge yourself with problems designed to make learning more fun and interactive.
                  </p>
                </div>
              </div>

              <div className="topics-filter">
                <button className="filter-btn active">Learning</button>
                <button className="filter-btn">Quiz</button>
                <button className="filter-btn">Games</button>
              </div>

              <div className="topics-grid">
                <div className="topic-card" onClick={() => handleStartSoloWithTopic('kaidah-pencacahan')}>
                  <div className="topic-card-top card-bg-yellow">
                    <div className="topic-icon">🔢</div>
                  </div>
                  <div className="topic-card-bottom">
                    <h3>Algebra</h3>
                    <p>Master equations, inequalities, and functions to build a strong mathematical foundation.</p>
                    <div className="topic-card-footer">
                      <span>📄 List</span>
                    </div>
                  </div>
                </div>

                <div className="topic-card" onClick={() => handleStartSoloWithTopic('dimensi-tiga')}>
                  <div className="topic-card-top card-bg-pink">
                    <div className="topic-icon">📐</div>
                  </div>
                  <div className="topic-card-bottom">
                    <h3>Geometry</h3>
                    <p>Explore shapes, sizes, properties of space, and visual reasoning.</p>
                    <div className="topic-card-footer">
                      <span>📄 List</span>
                    </div>
                  </div>
                </div>

                <div className="topic-card" onClick={() => handleStartSoloWithTopic('kalkulus-lanjut')}>
                  <div className="topic-card-top card-bg-blue">
                    <div className="topic-icon">📈</div>
                  </div>
                  <div className="topic-card-bottom">
                    <h3>Calculus</h3>
                    <p>Understand limits, derivatives, integrals, and the mathematics of continuous change.</p>
                    <div className="topic-card-footer">
                      <span>📄 List</span>
                    </div>
                  </div>
                </div>

                <div className="topic-card" onClick={() => handleStartSoloWithTopic('statistika')}>
                  <div className="topic-card-top card-bg-green">
                    <div className="topic-icon">📊</div>
                  </div>
                  <div className="topic-card-bottom">
                    <h3>Statistics</h3>
                    <p>Learn to collect, analyze, interpret, and present data effectively.</p>
                    <div className="topic-card-footer">
                      <span>📄 List</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="see-more-container">
                <a href="#" className="btn-view-all">
                  See more topics
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
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
          <>
            <div className="games-hero-section">
              <div className="games-hero-content">
                <h1 className="games-hero-title">PLAYGROUND</h1>
                <p className="games-hero-subtitle">Play that gets every student learning</p>
                
                <div className="games-hero-buttons">
                  <button className="games-btn-primary">
                    Try Playground &rarr;
                  </button>
                  <button className="games-btn-secondary">
                    See the game modes
                  </button>
                </div>
              </div>
              <div className="games-hero-image">
                <img src="/assets/arcade_machine.png" alt="Arcade Game Machine" />
              </div>
            </div>

            <div className="menu-hub-container" style={{ minHeight: 'auto', paddingTop: '4rem' }}>
              <div className="menu-cards-grid">
                {/* Menu Card 1: Materi Kelas 12 */}
              <div
                className="menu-card-item menu-card-materi"
                onClick={() => setCurrentView('materi')}
              >
                <div className="card-item-top">
                  <div className="card-item-icon-box">📚</div>
                  <span className="card-item-tag">High School Curriculum</span>
                  <h3 className="card-item-title">Grade 12 Math Materials</h3>
                  <p className="card-item-desc">
                    Learn formula summaries, key concepts of 3D Geometry, Grouped Statistics, Counting Principles, and Calculus along with practice problems.
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Open Materials Module</strong>
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
                  <span className="card-item-tag">1P Practice Mode</span>
                  <h3 className="card-item-title">Solo Quiz & Practice</h3>
                  <p className="card-item-desc">
                    Test your math understanding with timed quizzes, score streaks, helper calculators, and step-by-step explanations.
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Start Solo Quiz</strong>
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
                  <span className="card-item-tag">2P Duel Mode (1 Keyboard)</span>
                  <h3 className="card-item-title">1 vs 1 Duel (Against Friends)</h3>
                  <p className="card-item-desc">
                    Challenge your friend in a split-screen duel! Player 1 (A/S/D/F) vs Player 2 (H/J/K/L) compete for speed & accuracy.
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>Start 1 vs 1 Duel</strong>
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
                  <span className="card-item-tag">Rankings & Scores</span>
                  <h3 className="card-item-title">Leaderboard</h3>
                  <p className="card-item-desc">
                    See top-ranked players with the highest scores and defend your championship position on the podium of honor!
                  </p>
                </div>
                <div className="card-item-action">
                  <strong>View Leaderboard</strong>
                  <span>➡️</span>
                </div>
              </div>
            </div>
          </div>
          </>
        )}

        {/* VIEW 3: MATERI KELAS 12 (Resources) */}
        {currentView === 'materi' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Back to Home
              </button>
              <button className="btn-back-main" style={{ background: '#ffdc00' }} onClick={() => setCurrentView('menu')}>
                🎮 Open Game Menu
              </button>
            </div>
            <MateriSection
              onStartSoloWithTopic={handleStartSoloWithTopic}
              onStartVersus={() => setCurrentView('versus')}
            />
          </div>
        )}

        {/* VIEW: QUIZ LIBRARY */}
        {currentView === 'quiz-library' && (
          <QuizLibrary 
            onSelectQuiz={(topicId) => {
              setSelectedTopicId(topicId === 'all' ? undefined : topicId);
              setCurrentView('solo');
            }} 
          />
        )}

        {/* VIEW 4: GAME SOLO (1P / Quiz) */}
        {currentView === 'solo' && (
          <div>
            <div style={{ padding: '1rem 5%', background: '#fff', borderBottom: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-back-main" onClick={() => setCurrentView('home')}>
                ⬅️ Back to Home
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
                ⬅️ Back to Home
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
                ⬅️ Back to Home
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
                ⬅️ Back to Home
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
