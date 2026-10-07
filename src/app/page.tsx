"use client";

import { useRef, useState, useEffect } from 'react';
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
import Login from '../components/login';
import Signup from '../components/signup';
import QuizLibrary from '../components/QuizLibrary';
import QuizEditor from '../components/QuizEditor';
import UploadQuizModal from '../components/UploadQuizModal';
import TugOfWarGame from '../components/TugOfWarGame';
import FlappyBirdGame from '../components/FlappyBirdGame';
import SnakeLadderGame from '../components/SnakeLadderGame';
import TargetShooterGame from '../components/TargetShooterGame';
import MathSoldierGame from '../components/MathSoldierGame';
import QuizViewer from '../components/QuizViewer';
import { MATERI_KELAS_12, MATH_QUESTIONS } from '../data/mathData';
import { UserQuiz, QuizQuestion } from '../types/quiz';

import { getSession, logout } from './actions/auth';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'materi' | 'solo' | 'versus' | 'leaderboard' | 'about' | 'quiz-library' | 'quiz-editor' | 'quiz-viewer' | 'tug-of-war' | 'flappy-bird' | 'snake-ladder' | 'target-shooter' | 'math-soldier'>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined);
  const [activeCustomQuiz, setActiveCustomQuiz] = useState<UserQuiz | undefined>(undefined);
  const [editingQuiz, setEditingQuiz] = useState<UserQuiz | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
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

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUserProfile(prev => ({
          ...prev,
          name: session.user.name,
          avatar: session.user.avatar || '👑'
        }));
      }
    });
  }, []);

  // Auto scroll to top on any view switch to prevent layout clipping
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  const isGameView = ['flappy-bird', 'snake-ladder', 'tug-of-war', 'target-shooter', 'solo', 'versus', 'quiz-editor', 'quiz-viewer'].includes(currentView);

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

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  return (
    <div ref={container}>
      {/* Header / Navbar Matching Screenshot Exactly */}
      {currentView !== 'quiz-editor' && currentView !== 'quiz-viewer' && (
        <header className="header">
          <div className="logo" onClick={() => setCurrentView('home')}>
            <img src="/assets/logo.png" style={{ height: '42px', width: 'auto' }} />
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
          {/* leaderboard opsional */}
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
        
        {/* Auth Buttons */}
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <button 
                className="btn btn-login" 
                onClick={() => { setAuthMode('login'); setIsAuthOpen(true); }}
              >
                Log in
              </button>
              <button 
                className="btn btn-signup" 
                onClick={() => { setAuthMode('signup'); setIsAuthOpen(true); }}
              >
                Sign up
              </button>
            </>
          ) : (
            <button 
              onClick={handleOpenProfileOrLogin}
              title="Profile"
              style={{ 
                backgroundColor: '#f3f4f6', 
                border: '2px solid #000', 
                boxShadow: 'none',
                cursor: 'pointer',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: 0,
                marginRight: '2.5rem',
                alignSelf: 'center'
              }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{userProfile.avatar}</span>
            </button>
          )}
        </div>
      </header>
      )}

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
                  <h2 style={{ color: '#000000', fontSize: '48px' }}>Comprehensive Materialals</h2>
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
              <div className="section-header" style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem' }}>
                <div>
                  <h2 className="section-title">Explore All Topics</h2>
                  <p className="section-subtitle">
                    Explore exciting math topics, master new concepts, <br />
                    and challenge yourself with problems designed to make learning more fun and interactive.
                  </p>
                </div>
              </div>

              <div className="topics-grid">
                <div className={`new-topic-card card-blue ${selectedCard === 'games' ? 'active' : ''}`} onClick={() => setSelectedCard('games')}>
                  <div className="new-topic-badge badge-blue">
                    <div className="badge-icon-box" style={{ background: '#023c3d', borderRadius: '4px', color: '#fff' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <h3>Games</h3>
                  <p>Come play a wide variety of fun games that will challenge your brain you can play them on your own or with your loved ones, such as friends, family, and others.</p>
                </div>
                <div className={`new-topic-card card-purple ${selectedCard === 'learning' ? 'active' : ''}`} onClick={() => setSelectedCard('learning')}>
                  <div className="new-topic-badge badge-purple">
                    <div className="badge-icon-box" style={{ background: 'transparent', color: '#2a1228' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </div>
                  </div>
                  <h3>Resources</h3>
                  <p>Dozens of Math Lessons That Will Be Useful for You, helping you deepen your understanding of complex mathematical concepts through interactive learning and practical examples.</p>
                </div>
                <div className={`new-topic-card card-yellow ${selectedCard === 'quizz' ? 'active' : ''}`} onClick={() => setSelectedCard('quizz')}>
                  <div className="new-topic-badge badge-yellow">
                    <div className="badge-icon-box" style={{ background: 'transparent', color: '#2a1228' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="12" x2="16" y2="12"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                  <h3>Quizz</h3>
                  <p>Challenge Yourself with Exciting Math Quizzes, designed to test your knowledge, sharpen your problem solving skills, and reinforce what you&apos;ve learned.</p>
                </div>
              </div>

              {/* Topics Details Section agak kebalik yang "Learning jadi games, Resource jadi  quizz, yang quizz jadi games"*/}
              
              <div className="topic-details-container">
                {selectedCard === 'learning' && (
                  <div className="topic-details-list">
                    <div className="topic-detail-item cursor-pointer hover:bg-gray-50/50 transition-all hover:scale-[1.01]" onClick={() => { setSelectedTopicId('kalkulus'); setCurrentView('materi'); }}>
                      <div className="detail-number-box"><span>1</span></div>
                      <div className="detail-text-content">
                        <h4>Calculus</h4>
                        <p>Master the concepts of limits, derivatives, and integrals to solve complex mathematical problems.</p>
                      </div>
                      <div style={{ marginLeft: 'auto', marginRight: '12px', display: 'flex', alignItems: 'center', paddingLeft: '16px', color: '#000000', marginTop: '28px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="topic-detail-item cursor-pointer hover:bg-gray-50/50 transition-all hover:scale-[1.01]" onClick={() => { setSelectedTopicId('geometri'); setCurrentView('materi'); }}>
                      <div className="detail-number-box"><span>2</span></div>
                      <div className="detail-text-content">
                        <h4>Geometry</h4>
                        <p>Explore properties of space, shapes, sizes, and relative positions of figures.</p>
                      </div>
                      <div style={{ marginLeft: 'auto', marginRight: '12px', display: 'flex', alignItems: 'center', paddingLeft: '16px', color: '#000000', marginTop: '28px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="topic-detail-item cursor-pointer hover:bg-gray-50/50 transition-all hover:scale-[1.01]" onClick={() => { setSelectedTopicId('trigonometri'); setCurrentView('materi'); }}>
                      <div className="detail-number-box"><span>3</span></div>
                      <div className="detail-text-content">
                        <h4>Trigonometry</h4>
                        <p>Learn about relationships involving lengths and angles of triangles and their applications.</p>
                      </div>
                      <div style={{ marginLeft: 'auto', marginRight: '12px', display: 'flex', alignItems: 'center', paddingLeft: '16px', color: '#000000', marginTop: '28px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="topic-detail-item cursor-pointer hover:bg-gray-50/50 transition-all hover:scale-[1.01]" onClick={() => { setSelectedTopicId('statistika'); setCurrentView('materi'); }}>
                      <div className="detail-number-box"><span>4</span></div>
                      <div className="detail-text-content">
                        <h4>Statistics</h4>
                        <p>Understand the mechanics of bodies at rest and analyze loads on physical systems.</p>
                      </div>
                      <div style={{ marginLeft: 'auto', marginRight: '12px', display: 'flex', alignItems: 'center', paddingLeft: '16px', color: '#000000', marginTop: '28px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div className="topic-details-cta">
                      <button className="btn-subscribe" onClick={() => setCurrentView('materi')}>View All</button>
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

            <div className="menu-hub-container" style={{ minHeight: 'auto', paddingTop: '3.5rem', paddingBottom: '5rem' }}>
              <div className="modern-games-grid">
                {/* Game Card 1: Snake & Ladders Math */}
                <div
                  className="modern-game-card card-snake-theme group"
                  onClick={() => setCurrentView('snake-ladder')}
                >
                  {/* Top Visual Game Banner with Blurred In-Game Preview */}
                  <div className="game-card-banner banner-snake">
                    <div className="banner-gameplay-bg snake-gameplay-mockup">
                      <div className="mockup-board-grid">
                        <div className="mockup-tile tile-win">100 🏆</div>
                        <div className="mockup-tile">99</div>
                        <div className="mockup-tile tile-snake">98 🐍</div>
                        <div className="mockup-tile">97</div>
                        <div className="mockup-tile tile-ladder">96 🪜</div>
                        <div className="mockup-tile">95</div>
                        <div className="mockup-tile">94</div>
                        <div className="mockup-tile tile-snake">93 🐍</div>
                      </div>
                      <div className="mockup-dice-pill">🎲 Dice: 6</div>
                      <div className="mockup-pawn-dot" />
                    </div>
                    <div className="banner-blur-overlay" />

                    <div className="banner-top-row">
                      <span className="banner-tag-pill tag-green">🎲 BOARD GAME</span>
                      <span className="banner-player-pill">1P vs Bot</span>
                    </div>

                    <div className="banner-hero-art">
                      <div className="banner-icon-bubble">
                        <span className="hero-emoji">🐍</span>
                      </div>
                      <div className="banner-badge-preview">
                        <span>100 TILES</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="game-card-body">
                    <div className="game-title-row">
                      <h3 className="game-card-title">Snake & Ladders Math</h3>
                    </div>

                    <p className="game-card-description">
                      Roll the dice towards tile 100! If you land on a snake, solve the math problem within 20s to escape penalty!
                    </p>

                    <div className="game-feature-tags">
                      <span className="feature-pill">🏁 100 Tiles</span>
                      <span className="feature-pill">⏱️ 20s Speed</span>
                      <span className="feature-pill">🤖 Smart Bot</span>
                    </div>

                    <div className="game-card-cta">
                      <span className="cta-text">Play Snake & Ladders</span>
                      <div className="cta-arrow-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Card 2: Math Tug of War */}
                <div
                  className="modern-game-card card-tug-theme group"
                  onClick={() => setCurrentView('tug-of-war')}
                >
                  {/* Top Visual Game Banner with Blurred In-Game Preview */}
                  <div className="game-card-banner banner-tug">
                    <div className="banner-gameplay-bg tug-gameplay-mockup">
                      <div className="mockup-math-prompt">18 × 4 = ?</div>
                      <div className="mockup-tug-rope">
                        <div className="mockup-rope-line" />
                        <div className="mockup-rope-flag">🚩</div>
                      </div>
                      <div className="mockup-team-indicators">
                        <span className="team-blue">P1: +240 Pull</span>
                        <span className="team-red">BOT: +180 Pull</span>
                      </div>
                    </div>
                    <div className="banner-blur-overlay" />

                    <div className="banner-top-row">
                      <span className="banner-tag-pill tag-purple">💥 BATTLE ARENA</span>
                      <span className="banner-player-pill">1P & 2P Local</span>
                    </div>

                    <div className="banner-hero-art">
                      <div className="banner-icon-bubble">
                        <span className="hero-emoji">🚩</span>
                      </div>
                      <div className="banner-badge-preview">
                        <span>SUPER PULL</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="game-card-body">
                    <div className="game-title-row">
                      <h3 className="game-card-title">Math Tug of War</h3>
                    </div>

                    <p className="game-card-description">
                      Rapidly solve (+, -, ×, :) arithmetic to pull the rope to your side and activate powerful Super Pull momentum!
                    </p>

                    <div className="game-feature-tags">
                      <span className="feature-pill">⚡ Fast Math</span>
                      <span className="feature-pill">👥 1v1 Battle</span>
                      <span className="feature-pill">🔥 Combo Meter</span>
                    </div>

                    <div className="game-card-cta">
                      <span className="cta-text">Play Tug of War</span>
                      <div className="cta-arrow-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Card 3: Flappy Math Bird */}
                <div
                  className="modern-game-card card-flappy-theme group"
                  onClick={() => setCurrentView('flappy-bird')}
                >
                  {/* Top Visual Game Banner with Blurred In-Game Preview */}
                  <div className="game-card-banner banner-flappy">
                    <div className="banner-gameplay-bg flappy-gameplay-mockup">
                      <div className="mockup-score-hud">🪙 1,240 | ❤️❤️❤️</div>
                      <div className="mockup-pipes-row">
                        <div className="mockup-pipe top-pipe">
                          <span>GATE A: 48</span>
                        </div>
                        <div className="mockup-bird-flying">🐦</div>
                        <div className="mockup-pipe bottom-pipe">
                          <span>GATE B: 36</span>
                        </div>
                      </div>
                    </div>
                    <div className="banner-blur-overlay" />

                    <div className="banner-top-row">
                      <span className="banner-tag-pill tag-blue">🕹️ ARCADE REFLEX</span>
                      <span className="banner-player-pill">Endless Run</span>
                    </div>

                    <div className="banner-hero-art">
                      <div className="banner-icon-bubble">
                        <span className="hero-emoji">🐦</span>
                      </div>
                      <div className="banner-badge-preview">
                        <span>GATE A & B</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="game-card-body">
                    <div className="game-title-row">
                      <h3 className="game-card-title">Flappy Math Bird</h3>
                    </div>

                    <p className="game-card-description">
                      Flap through Gate A & Gate B choosing the correct math answers! Collect shiny coins and bonus heart lives!
                    </p>

                    <div className="game-feature-tags">
                      <span className="feature-pill">🪽 Jump Timing</span>
                      <span className="feature-pill">🪙 Coins & Lives</span>
                      <span className="feature-pill">🏆 High Score</span>
                    </div>

                    <div className="game-card-cta">
                      <span className="cta-text">Play Flappy Bird</span>
                      <div className="cta-arrow-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Card 4: Classic 1v1 */}
                <div
                  className="modern-game-card card-versus-theme group"
                  onClick={() => setCurrentView('versus')}
                >
                  {/* Top Visual Game Banner with Blurred In-Game Preview */}
                  <div className="game-card-banner banner-versus">
                    <div className="banner-gameplay-bg versus-gameplay-mockup">
                      <div className="mockup-split-left">
                        <span className="split-p-tag">P1 (A/S/D/F)</span>
                        <span className="split-score">450 pts</span>
                      </div>
                      <div className="mockup-split-divider">
                        <span>VS</span>
                      </div>
                      <div className="mockup-split-right">
                        <span className="split-p-tag">P2 (H/J/K/L)</span>
                        <span className="split-score">420 pts</span>
                      </div>
                    </div>
                    <div className="banner-blur-overlay" />

                    <div className="banner-top-row">
                      <span className="banner-tag-pill tag-orange">🏆 2P SPLIT SCREEN</span>
                      <span className="banner-player-pill">Ranked Duel</span>
                    </div>

                    <div className="banner-hero-art">
                      <div className="banner-icon-bubble">
                        <span className="hero-emoji">⚔️</span>
                      </div>
                      <div className="banner-badge-preview">
                        <span>1 KEYBOARD</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="game-card-body">
                    <div className="game-title-row">
                      <h3 className="game-card-title">Classic Duel 1v1</h3>
                    </div>

                    <div className="game-feature-tags">
                      <span className="feature-pill">⌨️ 1 Keyboard</span>
                      <span className="feature-pill">👑 Crown Match</span>
                      <span className="feature-pill">🎯 Precision</span>
                    </div>

                    <div className="game-card-cta">
                      <span className="cta-text">Start Classic Duel</span>
                      <div className="cta-arrow-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Card 5: Math Target Shooter */}
                <div
                  className="modern-game-card card-tug-theme group"
                  onClick={() => setCurrentView('target-shooter')}
                  style={{ borderColor: '#38bdf8' }}
                >
                  <div className="game-card-banner banner-tug" style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0f172a 100%)' }}>
                    <div className="banner-gameplay-bg">
                      <div className="mockup-math-prompt" style={{ background: 'rgba(15, 23, 42, 0.9)', borderColor: '#facc15' }}>48 : 6 = ?</div>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
                        <span style={{ background: '#ec4899', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>A: 6</span>
                        <span style={{ background: '#22c55e', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>B: 8 🎯</span>
                        <span style={{ background: '#3b82f6', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>C: 12</span>
                      </div>
                    </div>
                    <div className="banner-blur-overlay" />

                    <div className="banner-top-row">
                      <span className="banner-tag-pill tag-blue">💥 SHOOTING ARENA</span>
                      <span className="banner-player-pill">1P & 2P Dual</span>
                    </div>

                    <div className="banner-hero-art">
                      <div className="banner-icon-bubble">
                        <span className="hero-emoji">🎯</span>
                      </div>
                      <div className="banner-badge-preview">
                        <span>+3 POIN</span>
                      </div>
                    </div>
                  </div>

                  <div className="game-card-body">
                    <div className="game-title-row">
                      <h3 className="game-card-title">Target Shooter Showdown</h3>
                    </div>

                    <p className="game-card-description">
                      Tembak 1 dari 5 papan sasaran yang memuat jawaban matematika yang benar! P1 (WASD + Space) vs P2/Bot (Panah + Enter). Peluru max 3 per soal.
                    </p>

                    <div className="game-feature-tags">
                      <span className="feature-pill">🎯 5 Papan Sasaran</span>
                      <span className="feature-pill">🔫 3 Peluru / Question</span>
                      <span className="feature-pill">⚡ +3 Points Hit</span>
                    </div>

                    <div className="game-card-cta">
                      <span className="cta-text">Play Target Shooter</span>
                      <div className="cta-arrow-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Card 6: Math Soldier Zombie Strike */}
                <div
                  className="modern-game-card card-tug-theme group"
                  onClick={() => setCurrentView('math-soldier')}
                  style={{ borderColor: '#ef4444' }}
                >
                  <div className="game-card-banner banner-tug" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #0f172a 100%)' }}>
                    <div className="banner-gameplay-bg">
                      <div className="mockup-math-prompt" style={{ background: 'rgba(15, 23, 42, 0.9)', borderColor: '#ef4444' }}>7 × 8 = ?</div>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
                        <span style={{ background: '#22c55e', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>M4A1 🔫</span>
                        <span style={{ background: '#eab308', color: '#000', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>AWM 🎯</span>
                        <span style={{ background: '#a855f7', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>Raygun 🌌</span>
                      </div>
                    </div>
                    <div className="banner-blur-overlay" />

                    <div className="banner-top-row">
                      <span className="banner-tag-pill" style={{ background: '#dc2626', color: '#fff' }}>🪖 3D SOLDIER FPS</span>
                      <span className="banner-player-pill">Survival Wave</span>
                    </div>

                    <div className="banner-hero-art">
                      <div className="banner-icon-bubble" style={{ background: 'linear-gradient(135deg, #ef4444, #991b1b)' }}>
                        <span className="hero-emoji">🧟</span>
                      </div>
                      <div className="banner-badge-preview" style={{ borderColor: '#ef4444' }}>
                        <span>UPGRADE PERSENJATAAN</span>
                      </div>
                    </div>
                  </div>

                  <div className="game-card-body">
                    <div className="game-title-row">
                      <h3 className="game-card-title">Math Soldier: Zombie Strike</h3>
                    </div>

                    <p className="game-card-description">
                      Menjadi tentara FPS! Bergerak dengan WASD & Space, bidik & tembak (Klik Kiri), Scope (Klik Kanan), dan Reload (R). Basmi zombie dan jawab kuis matematika untuk membeli senjata hebat!
                    </p>

                    <div className="game-feature-tags">
                      <span className="feature-pill">🪖 WASD + Mouse Scope</span>
                      <span className="feature-pill">🔫 6 Jenis Senjata</span>
                      <span className="feature-pill">🧮 Quiz Upgrade Senjata</span>
                    </div>

                    <div className="game-card-cta">
                      <span className="cta-text" style={{ color: '#f87171' }}>Play Soldier FPS</span>
                      <div className="cta-arrow-btn" style={{ background: '#dc2626' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VIEW: MATH SOLDIER ZOMBIE STRIKE */}
        {currentView === 'math-soldier' && (
          <div>
            <MathSoldierGame
              onBackToMenu={() => setCurrentView('menu')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW: ULAR TANGGA MATEMATIKA */}
        {currentView === 'snake-ladder' && (
          <div>
            <SnakeLadderGame
              onBackToMenu={() => setCurrentView('menu')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW: TARIK TAMBANG MATEMATIKA */}
        {currentView === 'tug-of-war' && (
          <div>
            <TugOfWarGame
              onBackToMenu={() => setCurrentView('menu')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW: TARGET SHOOTER SHOWDOWN */}
        {currentView === 'target-shooter' && (
          <div>
            <TargetShooterGame
              onBackToMenu={() => setCurrentView('menu')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW: FLAPPY MATH BIRD */}
        {currentView === 'flappy-bird' && (
          <div>
            <FlappyBirdGame
              onBackToMenu={() => setCurrentView('menu')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW 3: MATERI KELAS 12 (Resources) */}
        {currentView === 'materi' && (
          <div>
            <MateriSection
              onStartSoloWithTopic={handleStartSoloWithTopic}
              onStartVersus={() => setCurrentView('versus')}
              initialTopicId={selectedTopicId}
            />
          </div>
        )}

        {/* VIEW: QUIZ LIBRARY */}
        {currentView === 'quiz-library' && (
          <QuizLibrary 
            onSelectQuiz={(topicId, customQuiz) => {
              setSelectedTopicId(topicId === 'all' ? undefined : topicId);
              setActiveCustomQuiz(customQuiz);
              setCurrentView('quiz-viewer');
            }}
            onOpenEditor={(quiz) => {
              setEditingQuiz(quiz || null);
              setCurrentView('quiz-editor');
            }}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {/* VIEW: QUIZ EDITOR */}
        {currentView === 'quiz-editor' && (
          <QuizEditor
            initialQuiz={editingQuiz}
            onBack={() => {
              setEditingQuiz(null);
              setCurrentView('quiz-library');
            }}
            onPublishSuccess={(savedQuiz) => {
              setEditingQuiz(null);
              setCurrentView('quiz-library');
            }}
          />
        )}

        {/* VIEW: QUIZ VIEWER */}
        {currentView === 'quiz-viewer' && (
          <QuizViewer
            initialTopicId={selectedTopicId}
            customQuiz={activeCustomQuiz}
            onBackToMenu={() => {
              setActiveCustomQuiz(undefined);
              setCurrentView('quiz-library');
            }}
            onAddScore={handleAddScore}
          />
        )}

        {/* VIEW 4: GAME SOLO (1P / Quiz) */}
        {currentView === 'solo' && (
          <div>
            <SoloGame
              initialTopicId={selectedTopicId}
              customQuiz={activeCustomQuiz}
              onBackToMenu={() => {
                setActiveCustomQuiz(undefined);
                setCurrentView('quiz-library');
              }}
              onSwitchToVersus={() => setCurrentView('versus')}
              onAddScore={handleAddScore}
            />
          </div>
        )}

        {/* VIEW 5: GAME 1 VS 1 (DUO) */}
        {currentView === 'versus' && (
          <div>
            <VersusGame
              onBackToMenu={() => setCurrentView('menu')}
              onSwitchToSolo={() => setCurrentView('solo')}
            />
          </div>
        )}

        {/* VIEW 6: LEADERBOARD */}
        {currentView === 'leaderboard' && (
          <div>
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
            <AboutSection
              onStartMenu={() => setCurrentView('menu')}
              onStartMaterial={() => setCurrentView('materi')}
            />
          </div>
        )}
      </main>

      {/* User Profile & Auth Modal */}
      {isAuthOpen && authMode === 'login' ? (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <Login onClose={() => setIsAuthOpen(false)} onSwitchToSignup={() => setAuthMode('signup')} onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : isAuthOpen && authMode === 'signup' ? (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <Signup onClose={() => setIsAuthOpen(false)} onSwitchToLogin={() => setAuthMode('login')} onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
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
      )}

      {/* Upload  & Extract Quiz Modal */}
      <UploadQuizModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onImportQuestions={(data) => {
          const draftQuiz: UserQuiz = {
            id: `user-quiz-${Date.now()}`,
            title: data.title,
            summary: data.summary,
            category: 'General',
            tags: ['General', 'Draft'],
            bannerColor: '#d8b4fe',
            accuracy: 0,
            completion: 0,
            isDraft: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            editedTimeAgo: 'Just now',
            authorName: userProfile.name,
            questions: data.questions
          };
          setEditingQuiz(draftQuiz);
          setCurrentView('quiz-editor');
        }}
      />

      {/* ORIGINAL FOOTER (Hidden in game views so screen stays fixed & never gets cut off) */}
      {!isGameView && (
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <Link href="#" className="logo" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>
                <img src="/assets/logo.png" style={{ height: '60px', width: 'auto' }} />
              </Link>
              <p>Empowering students to conquer mathematics through interactive exercises, peer collaboration, and expert solutions.</p>
              
              <div className="social-links" style={{ marginTop: '1.5rem' }}>
                <a href="#" aria-label="X (Twitter)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" /></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="mailto:info@math404.com" aria-label="Email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>

              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1.5rem' }}>&copy; 2026 Math404</p>
            </div>
            
            <div className="footer-links-group">
              <h4>Quicklink</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('kaidah-pencacahan'); }}>Games</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('dimensi-tiga'); }}>Resource</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('kalkulus-lanjut'); }}>Quiz</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleStartSoloWithTopic('statistika'); }}>About</a></li>
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

            <div className="footer-links-group">
              <h4>Credit</h4>
              <ul>
                <li><Link href="#">@urdhajathniel@gmail.com</Link></li>
                <li><Link href="#">@anonim</Link></li>
              </ul>
            </div>
          </div>
          

          
          <div className="footer-giant-text">MATH404</div>
        </footer>
      )}
    </div>
  );
}
