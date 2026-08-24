"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';

// Register useGSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function Home() {
  const container = useRef(null);
  
  useGSAP(() => {
    // Left side animations
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

    // Bottom bar stagger
    gsap.from('.feature', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5
    });

    // Right side animations - Images pop in
    gsap.from('.image-wrapper', {
      scale: 0,
      rotation: (i) => (i % 2 === 0 ? -10 : 10),
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.5)',
      delay: 0.2
    });

    // Decorations float/rotate
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

      <main className="main-content">
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
      </main>
    </div>
  );
}
