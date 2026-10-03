"use client";

import React from 'react';

interface AboutSectionProps {
  onStartMenu: () => void;
  onStartMateri: () => void;
}

export default function AboutSection({ onStartMenu, onStartMateri }: AboutSectionProps) {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111827' }}>
      <div style={{ padding: '40px 4.8rem' }}>
        
        {/* Title */}
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '24px', lineHeight: 1 }}>
          MATH404 ESSENTIALS
        </h1>

        {/* Hero Image Replacement */}
        <div style={{ width: '100%', height: '600px', backgroundColor: '#10b981', backgroundImage: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', textAlign: 'center', maxWidth: '900px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', lineHeight: 1.1 }}>
            PLATFORM BELAJAR & GAME MATEMATIKA INTERAKTIF
          </h2>
        </div>

        {/* Product Category (Core Features) */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>Core Features</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {[
              { title: 'Misi Kami', desc: 'Pemahaman lewat gamifikasi', color: '#fef08a' },
              { title: '1 vs 1 Battle', desc: 'Duel split-screen', color: '#a7f3d0' },
              { title: 'Fokus Kelas 12', desc: 'Sesuai silabus terbaru', color: '#fecaca' },
              { title: 'Akses Instan', desc: 'Tanpa perlu install', color: '#fed7aa' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', backgroundColor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                  {['🎯', '⚔️', '📐', '🚀'][i]}
                </div>
                <div style={{ padding: '12px 0' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.7rem', color: '#4b5563', textTransform: 'uppercase' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Seller (Dark Section) -> Our Games */}
        <div style={{ backgroundColor: '#064e3b', padding: '60px 4.8rem', marginBottom: '60px', color: 'white', margin: '0 -4.8rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>Popular Modes</h3>
              <span style={{ fontSize: '0.6rem', padding: '4px 8px', backgroundColor: 'white', color: '#064e3b', fontWeight: 800 }}>NEW</span>
              <span style={{ fontSize: '0.6rem', padding: '4px 8px', border: '1px solid white', color: 'white', fontWeight: 800 }}>IN STOCK</span>
            </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { name: 'Time Attack', img: '#e0e7ff', icon: '⏱️' },
              { name: 'Versus Mode', img: '#fce7f3', icon: '🥊' },
              { name: 'Quiz Library', img: '#fef3c7', icon: '📚' },
              { name: 'Leaderboard', img: '#dcfce3', icon: '🏆' }
            ].map((game, i) => (
              <div key={i}>
                <div style={{ height: '220px', backgroundColor: game.img, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <span style={{ color: '#064e3b', fontSize: '10px' }}>+</span>
                  </div>
                  {game.icon}
                </div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                   <div style={{ width: '6px', height: '6px', backgroundColor: '#fbbf24', borderRadius: '50%' }}></div>
                   <div style={{ width: '6px', height: '6px', backgroundColor: '#34d399', borderRadius: '50%' }}></div>
                   <div style={{ width: '6px', height: '6px', backgroundColor: '#60a5fa', borderRadius: '50%' }}></div>
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '2px' }}>{game.name}</h4>
                <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>FREE TO PLAY</div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Two Highlights (Controls) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '60px' }}>
          <div>
            <div style={{ height: '320px', backgroundColor: '#f1f5f9', marginBottom: '12px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontWeight: 600, width: '100%', maxWidth: '200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>W</kbd> <span>Option 1</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>A</kbd> <span>Option 2</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>S</kbd> <span>Option 3</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>D</kbd> <span>Option 4</span></div>
              </div>
            </div>
            <h4 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '8px' }}>PLAYER 1 CONTROLS</h4>
            <button style={{ fontSize: '0.65rem', padding: '4px 12px', backgroundColor: '#d1fae5', color: '#064e3b', fontWeight: 800, border: 'none', cursor: 'pointer' }}>LEARN MORE</button>
          </div>
          <div>
            <div style={{ height: '320px', backgroundColor: '#ffedd5', marginBottom: '12px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontWeight: 600, width: '100%', maxWidth: '200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>↑</kbd> <span>Option 1</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>←</kbd> <span>Option 2</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>↓</kbd> <span>Option 3</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><kbd style={{ background: 'white', padding: '6px 12px', border: '1px solid #ccc', fontWeight: 800 }}>→</kbd> <span>Option 4</span></div>
              </div>
            </div>
            <h4 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '8px' }}>PLAYER 2 CONTROLS</h4>
            <button style={{ fontSize: '0.65rem', padding: '4px 12px', backgroundColor: '#d1fae5', color: '#064e3b', fontWeight: 800, border: 'none', cursor: 'pointer' }}>LEARN MORE</button>
          </div>
        </div>

        {/* Testimonials (FAQ) */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>TRUSTED BY STUDENTS</h3>
            <div style={{ display: 'flex', gap: '4px' }}>
               <div style={{ width: '24px', height: '24px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#94a3b8' }}>←</div>
               <div style={{ width: '24px', height: '24px', backgroundColor: '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white' }}>→</div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', backgroundColor: '#f8fafc', height: '250px' }}>
              <div style={{ width: '45%', backgroundColor: '#fcd34d', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                 <div style={{ fontSize: '6rem', lineHeight: 1 }}>👤</div>
              </div>
              <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: '#064e3b', marginBottom: '12px', fontSize: '0.8rem', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.6, textTransform: 'uppercase' }}>
                  "TIDAK PERLU KONEKSI INTERNET GANDA, CUKUP 1 LAYAR UNTUK MABAR BARENG TEMEN. SANGAT SERU!"
                </p>
                <p style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  FAQS
                </p>
                <p style={{ fontSize: '0.6rem', color: '#64748b' }}>STUDENT QUESTION</p>
              </div>
            </div>
            <div style={{ display: 'flex', backgroundColor: '#f8fafc', height: '250px' }}>
              <div style={{ width: '45%', backgroundColor: '#a7f3d0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                 <div style={{ fontSize: '6rem', lineHeight: 1 }}>🎓</div>
              </div>
              <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: '#064e3b', marginBottom: '12px', fontSize: '0.8rem', letterSpacing: '2px' }}>★★★★★</div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.6, textTransform: 'uppercase' }}>
                  "MATERI DAN SOAL SUDAH DISESUAIKAN DENGAN SILABUS KELAS 12, SANGAT MEMBANTU UNTUK UJIAN."
                </p>
                <p style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  FAQS
                </p>
                <p style={{ fontSize: '0.6rem', color: '#64748b' }}>CURRICULUM QUESTION</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero / CTA */}
        <div style={{ backgroundColor: '#10b981', backgroundImage: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', padding: '60px 4.8rem', margin: '0 -4.8rem -40px -4.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '500px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', width: '320px', boxShadow: '10px 10px 0 rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '24px', lineHeight: 1.1, color: '#111827' }}>
                EXPERIENCE BETTER LEARNING WITH MATH404
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={onStartMenu}
                  style={{ backgroundColor: '#064e3b', color: 'white', padding: '14px', fontWeight: 800, border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', width: '100%' }}
                >
                  PLAY GAMES NOW
                </button>
                <button 
                  onClick={onStartMateri}
                  style={{ backgroundColor: 'white', color: '#064e3b', padding: '14px', fontWeight: 800, border: '2px solid #064e3b', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', width: '100%' }}
                >
                  LEARN MATERI
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
