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
  const [selectedCard, setSelectedCard] = useState<'learning' | 'quizz' | 'games'>('learning');

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

    // Continuous floating and rotating animation for math symbols
    gsap.to('.math-symbol', {
      y: '-=30',
      rotation: '+=15',
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: {
        amount: 2,
        from: 'random'
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
        
        {/* Settings Button */}
        <div className="auth-buttons">
          <button 
            className="settings-btn"
            title="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
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
              <div className="feature-row" style={{ backgroundColor: '#fff', padding: '2rem 0' }}>
                <div className="feature-text">
                  <h2 style={{ color: '#000000', fontSize: '48px' }}>Learning is Fun with Friends</h2>
                  <p>Learning Math404 with friends is more fun and exciting! Explore various math materials, test your skills through quizzes, and face daily challenges.</p>
                </div>
                <div className="feature-image">
                  <img src="/assets/3.png" alt="Feature 1" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>

              <div className="feature-row reverse" style={{ backgroundColor: '#fff', padding: '2rem 0' }}>
                <div className="feature-text">
                  <h2 style={{ color: '#000000', fontSize: '48px' }}>Comprehensive Materials</h2>
                  <p>Learn mathematics completely and structurally, from basic concepts to more challenging materials. Find easy-to-understand explanations, examples, and practice questions to improve your skills.</p>
                </div>
                <div className="feature-image">
                  <img src="/assets/gokil.png" alt="Feature 2" style={{ width: '85%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>

              <div className="feature-row" style={{ backgroundColor: '#fff', padding: '2rem 0' }}>
                <div className="feature-text">
                  <h2 style={{ color: '#000000' }}>Exciting and Fun Challenges</h2>
                  <p>Ready to test your skills? Face various math challenges, solve problems, earn scores, and prove how far you can go!</p>
                </div>
                <div className="feature-image">
                  <img src="/assets/together.png" alt="Feature 3" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>
            </section>

            {/* TOPICS SECTION */}
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

              <div className="topics-grid">
                {/* Learning Card */}
                <div className={`new-topic-card card-blue ${selectedCard === 'learning' ? 'active' : ''}`} onClick={() => setSelectedCard('learning')}>
                  <div className="new-topic-badge badge-blue">
                    <div className="badge-icon-box" style={{ background: '#023c3d', borderRadius: '4px', color: '#fff' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <h3>Learning</h3>
                  <p>Explore various math materials structurally, from basic concepts to more challenging materials.</p>
                </div>

                {/* Quizz Card */}
                <div className={`new-topic-card card-purple ${selectedCard === 'quizz' ? 'active' : ''}`} onClick={() => setSelectedCard('quizz')}>
                  <div className="new-topic-badge badge-purple">
                    <div className="badge-icon-box" style={{ background: 'transparent', color: '#2a1228' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </div>
                  </div>
                  <h3>Quizz</h3>
                  <p>Test your math understanding with timed quizzes, score streaks, and step-by-step explanations.</p>
                </div>

                {/* Games Card */}
                <div className={`new-topic-card card-yellow ${selectedCard === 'games' ? 'active' : ''}`} onClick={() => setSelectedCard('games')}>
                  <div className="new-topic-badge badge-yellow">
                    <div className="badge-icon-box" style={{ background: 'transparent', color: '#2a1228' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="12" x2="16" y2="12"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                  <h3>Games</h3>
                  <p>Challenge your friends in a split-screen duel or enjoy interactive math arcade games.</p>
                </div>
              </div>

              {/* Topics Details Section */}
              <div className="topic-details-container">
                {selectedCard === 'learning' && (
                  <div className="topic-details-list">
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>1</span></div>
                      <div className="detail-text-content">
                        <h4>Comprehensive Curriculum</h4>
                        <p>Learn mathematics completely and structurally, from basic concepts to more challenging materials.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>2</span></div>
                      <div className="detail-text-content">
                        <h4>Step-by-step explanations</h4>
                        <p>Find easy-to-understand explanations, examples, and practice questions to improve your skills.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>3</span></div>
                      <div className="detail-text-content">
                        <h4>Interactive examples</h4>
                        <p>Engage with interactive examples designed around common student misconceptions to solidify understanding.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>4</span></div>
                      <div className="detail-text-content">
                        <h4>Visual Learning</h4>
                        <p>Utilize diagrams and visual aids to grasp complex mathematical concepts easily and effectively.</p>
                      </div>
                    </div>
                    <div className="topic-details-cta">
                      <button className="btn-subscribe" onClick={() => setCurrentView('materi')}>See More!</button>
                    </div>
                  </div>
                )}
                {selectedCard === 'quizz' && (
                  <div className="topic-details-list">
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>1</span></div>
                      <div className="detail-text-content">
                        <h4>Timed Challenges</h4>
                        <p>Test your skills under pressure with our timed quizzes to improve your speed and accuracy.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>2</span></div>
                      <div className="detail-text-content">
                        <h4>Score Streaks</h4>
                        <p>Earn multipliers and special badges by answering questions correctly in a continuous row.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>3</span></div>
                      <div className="detail-text-content">
                        <h4>Detailed Analytics</h4>
                        <p>Review your mistakes and learn from them with our comprehensive post-quiz analytics dashboard.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>4</span></div>
                      <div className="detail-text-content">
                        <h4>Adaptive Difficulty</h4>
                        <p>Questions automatically get harder as you improve, ensuring you are always appropriately challenged.</p>
                      </div>
                    </div>
                    <div className="topic-details-cta">
                      <button className="btn-subscribe" onClick={() => setCurrentView('quiz-library')}>Start Quizz Now</button>
                    </div>
                  </div>
                )}
                {selectedCard === 'games' && (
                  <div className="topic-details-list">
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>1</span></div>
                      <div className="detail-text-content">
                        <h4>1 vs 1 Duel Mode</h4>
                        <p>Challenge your friends on the same keyboard. Player 1 (A/S/D/F) vs Player 2 (H/J/K/L) compete for speed & accuracy.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>2</span></div>
                      <div className="detail-text-content">
                        <h4>Arcade Mode</h4>
                        <p>Play solo and climb the leaderboard. Survive as long as you can in endless mathematical challenges.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>3</span></div>
                      <div className="detail-text-content">
                        <h4>Earn Achievements</h4>
                        <p>Unlock special badges, avatars, and titles as you play and conquer various game modes.</p>
                      </div>
                    </div>
                    <div className="topic-detail-item">
                      <div className="detail-number-box"><span>4</span></div>
                      <div className="detail-text-content">
                        <h4>Fun Power-ups</h4>
                        <p>Use exciting power-ups to gain an advantage or disrupt your opponents in intense multiplayer modes.</p>
                      </div>
                    </div>
                    <div className="topic-details-cta">
                      <button className="btn-subscribe" onClick={() => setCurrentView('menu')}>See More!</button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* CTA SECTION  */}
            <section className="cta-section">
              <h2>Ready to master math?</h2>
              <p>Join thousands of fun and challenging games with your friends. Explore various math challenges, solve puzzles, and test your skills in a fun learning environment.</p>
              <button className="btn-subscribe" onClick={() => setCurrentView('menu')}>Get Started Now</button>
              <div className="decoration math-symbol" style={{ top: '15%', right: '18%', color: '#ff6b6b', fontSize: '10rem', transform: 'rotate(25deg)' }}>+</div>
              <div className="decoration math-symbol" style={{ bottom: '15%', left: '12%', color: '#00d0ff', fontSize: '12rem', transform: 'rotate(-15deg)' }}>×</div>
              <div className="decoration math-symbol" style={{ top: '25%', left: '15%', color: '#ffd166', fontSize: '9rem', transform: 'rotate(-30deg)' }}>÷</div>
              <div className="decoration math-symbol" style={{ bottom: '25%', right: '22%', color: '#06d6a0', fontSize: '8rem', transform: 'rotate(10deg)' }}>%</div>
              <div className="decoration math-symbol" style={{ top: '65%', left: '8%', color: '#ef476f', fontSize: '10rem', transform: 'rotate(45deg)' }}>=</div>
              <div className="decoration math-symbol" style={{ top: '50%', right: '8%', color: '#118ab2', fontSize: '9rem', transform: 'rotate(-20deg)' }}>−</div>
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
