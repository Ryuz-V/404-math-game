"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function Home() {
  const container = useRef(null);
  
  useGSAP(() => {
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
    .from('.btn-subscribe', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    gsap.from('.feature', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5
    });

    gsap.from('.image-wrapper', {
      scale: 0,
      rotation: (i) => (i % 2 === 0 ? -10 : 10),
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.5)',
      delay: 0.2
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

    // Scroll Animations
    gsap.from('.topics-section .section-header', {
      scrollTrigger: {
        trigger: '.topics-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.topic-card', {
      scrollTrigger: {
        trigger: '.topics-grid',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });

    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.cta-section h2, .cta-section p, .cta-section .btn-subscribe', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

  }, { scope: container });

  const StarIcon = () => (
    <div className="star-icon">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path fill="#ffdc00" d="M50,5 L58,30 L83,17 L70,42 L95,50 L70,58 L83,83 L58,70 L50,95 L42,70 L17,83 L30,58 L5,50 L30,42 L17,17 L42,30 Z"/>
      </svg>
    </div>
  );

  return (
    <div ref={container}>
      <header className="header">
        <div className="logo">Math101</div>
        <nav className="nav">
          <Link href="#">Topics</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Lecturers</Link>
          <Link href="#">Lecturers</Link>
        </nav>
        <div className="auth-buttons">
          <Link href="#" className="btn btn-login">Log in</Link>
          <Link href="#" className="btn btn-signup">Sign up</Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
        <section className="left-section">
          <div className="hero-content">
            <h1>Daily Mathematics<br/>Exercises and Solutions<br/>for Versity Students</h1>
            <p>Mathematics exercises for all levels with solutions, curated to help you understand various disciplines in Mathematics</p>
            <button className="btn-subscribe">Subscribe</button>
          </div>
          
          <div className="bottom-bar">
            <div className="feature"><StarIcon /> Peers</div>
            <div className="feature"><StarIcon /> Leaderboards</div>
            <div className="feature"><StarIcon /> Schools</div>
          </div>
        </section>
        
        <section className="right-section">
          {/* Decorations */}
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

          {/* Images */}
          <div className="image-wrapper img-1">
            <img src="/assets/woman_laptop.png" alt="Woman on laptop" />
          </div>
          <div className="image-wrapper img-2">
            <img src="/assets/man_headphones.png" alt="Man with headphones" />
          </div>
          <div className="image-wrapper img-3">
            <img src="/assets/woman_pencil.png" alt="Woman with pencil" />
          </div>
          <div className="image-wrapper img-4">
            <img src="/assets/men_chalkboard.png" alt="Men at chalkboard" />
          </div>
        </section>
        </section>

        <section className="topics-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explore Topics</h2>
              <p className="section-subtitle">Master mathematics step-by-step with our comprehensive, curriculum-aligned topic breakdowns.</p>
            </div>
            <Link href="#" className="btn-view-all">View All Topics</Link>
          </div>
          
          <div className="topics-grid">
            <div className="topic-card card-bg-yellow">
              <div className="topic-icon">🔢</div>
              <h3>Algebra</h3>
              <p>Master equations, inequalities, and functions to build a strong mathematical foundation.</p>
            </div>
            <div className="topic-card card-bg-pink">
              <div className="topic-icon">📐</div>
              <h3>Geometry</h3>
              <p>Explore shapes, sizes, properties of space, and visual reasoning.</p>
            </div>
            <div className="topic-card card-bg-blue">
              <div className="topic-icon">📈</div>
              <h3>Calculus</h3>
              <p>Understand limits, derivatives, integrals, and the mathematics of continuous change.</p>
            </div>
            <div className="topic-card card-bg-green">
              <div className="topic-icon">📊</div>
              <h3>Statistics</h3>
              <p>Learn to collect, analyze, interpret, and present data effectively.</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1,200+</div>
            <div className="stat-label">Exercises</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to master math?</h2>
          <p>Join thousands of students who are already improving their grades and understanding of complex mathematical concepts.</p>
          <button className="btn-subscribe">Get Started Now</button>
          
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
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="#" className="logo">Math101</Link>
            <p>Empowering students to conquer mathematics through interactive exercises, peer collaboration, and expert solutions.</p>
          </div>
          
          <div className="footer-links-group">
            <h4>Learn</h4>
            <ul>
              <li><Link href="#">Algebra</Link></li>
              <li><Link href="#">Geometry</Link></li>
              <li><Link href="#">Calculus</Link></li>
              <li><Link href="#">Statistics</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Contact</Link></li>
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
          <p>&copy; {new Date().getFullYear()} Math101. All rights reserved.</p>
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
