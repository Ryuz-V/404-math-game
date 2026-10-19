"use client";

import React, { useState } from 'react';

interface WaygroundEcosystemSectionProps {
  onExploreLibrary?: () => void;
  onExploreAssessments?: () => void;
}

export default function WaygroundEcosystemSection({
  onExploreLibrary,
  onExploreAssessments
}: WaygroundEcosystemSectionProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports'>('overview');
  const [selectedAssessmentCard, setSelectedAssessmentCard] = useState<number>(1); // 1 = ELA Grade 6

  return (
    <section
      className="wayground-ecosystem-section"
      style={{
        backgroundColor: '#ffffff',
        padding: '5rem 1.5rem 5.5rem',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1220px', margin: '0 auto' }}>

        {/* SECTION HEADLINE */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)',
              fontWeight: 800,
              color: '#000000ff',
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              margin: 0,
              fontFamily: 'inherit'
            }}
          >
           Take Advantage Of Our Assessment Ecosystem
          </h2>
        </div>
        <style>{`
          .ecosystem-row-1 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.75rem;
            align-items: stretch;
          }
          .ecosystem-row-2 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.75rem;
            align-items: stretch;
          }
          @media (min-width: 1024px) {
            .ecosystem-row-1 {
              grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
            }
            .ecosystem-row-2 {
              grid-template-columns: minmax(0, 1fr) minmax(0, 1.55fr);
            }
          }
        `}</style>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          {/* ===================== ROW 1 ===================== */}
          <div className="ecosystem-row-1">
            {/* CARD 1: PENILAIAN UMUM (Wider Left Card) */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '2.5rem 2.25rem 2.25rem',
                boxShadow: '0 8px 30px -4px rgba(43, 19, 34, 0.04)',
                border: '1px solid #ede7db',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gridColumn: 'span 1'
              }}
            >
              {/* Text Header */}
              <div>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    color: '#44333e',
                    margin: '0 0 0.85rem 0',
                    fontWeight: 500
                  }}
                >
                  Monitor curriculum alignment on a large scale through a {' '}
                  <strong style={{ color: '#2b1322', fontWeight: 800 }}>comprehensive assessment </strong>{' '}
                  that reveals what is working in each class, school, and small group.
                </p>
                <button
                  type="button"
                  onClick={onExploreAssessments || onExploreLibrary}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#000000ff',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>View General Assessment</span>
                  <span className="cta-arr" style={{ fontSize: '1.2rem', display: 'inline-block', transition: 'transform 0.2s ease' }}>
                    &rarr;
                  </span>
                </button>
              </div>

              {/* Graphic Representation: Teacher Classes merging into District Overview */}
              <div
                style={{
                  marginTop: '2.25rem',
                  overflowX: 'auto',
                  paddingBottom: '4px'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(170px, 1fr) 40px minmax(280px, 1.8fr)',
                    alignItems: 'center',
                    minWidth: '500px'
                  }}
                >
                  {/* 3 Teacher Class Cards on Left */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { teacher: "Mr Reynolds' Math 7 Class", count: "157 students" },
                      { teacher: "Ms. Peters' Math 7 Class", count: "145 students" },
                      { teacher: "Ms. Richards' Math 7 Class", count: "152 students" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          boxShadow: '0 4px 14px rgba(42, 18, 40, 0.05)',
                          border: '1px solid #f0eee8',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        {/* Orange Teacher/Podium Icon */}
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            backgroundColor: '#fff4eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#f97316',
                            flexShrink: 0
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h20" />
                            <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                            <path d="m7 21 5-5 5 5" />
                          </svg>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.teacher}
                          </div>
                          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
                            {item.count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SVG Branching Lines merging into the District card */}
                  <div style={{ width: '40px', height: '140px', position: 'relative' }}>
                    <svg width="40" height="140" viewBox="0 0 40 140" fill="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                      <path d="M 0 24 C 22 24, 20 70, 40 70" stroke="#d5cebe" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M 0 70 L 40 70" stroke="#d5cebe" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M 0 116 C 22 116, 20 70, 40 70" stroke="#d5cebe" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>

                  {/* District Overview Card on Right */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      padding: '16px 18px',
                      boxShadow: '0 8px 24px -4px rgba(42, 18, 40, 0.08)',
                      border: '1px solid #eae5db'
                    }}
                  >
                    {/* Top line: District & Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#1e293b' }}>
                        Sun Ridge ISD: CFA Unit 2 Math
                      </div>
                      <span
                        style={{
                          backgroundColor: '#e6f7ec',
                          color: '#16a34a',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        ✓ Completed
                      </span>
                    </div>

                    {/* Subtitle with icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '10.5px', color: '#64748b', marginBottom: '14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 20V10M12 20V4M6 20v-6" />
                        </svg>
                        7th Grade
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                        </svg>
                        Mathematics
                      </span>
                    </div>

                    {/* District overview heading */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M12 3L2 10h20L12 3z" />
                      </svg>
                      District Overview
                    </div>

                    {/* Accuracy stat */}
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>67%</span>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b', marginLeft: '6px' }}>accuracy</span>
                    </div>

                    {/* Multi-segmented color progress bar */}
                    <div
                      style={{
                        width: '100%',
                        height: '20px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        display: 'flex',
                        marginBottom: '10px'
                      }}
                    >
                      <div style={{ width: '18%', backgroundColor: '#f43f5e', color: '#ffffff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        18%
                      </div>
                      <div style={{ width: '25%', backgroundColor: '#f59e0b', color: '#ffffff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        25%
                      </div>
                      <div style={{ width: '45%', backgroundColor: '#10b981', color: '#ffffff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        45%
                      </div>
                      <div style={{ width: '12%', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                    </div>

                    {/* 4 Legend items */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', fontSize: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: '#334155' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f43f5e', display: 'inline-block' }} />
                          30 students
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '9px', paddingLeft: '9px' }}>Does not meet</div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: '#334155' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
                          20 students
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '9px', paddingLeft: '9px' }}>Partially meet</div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: '#334155' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                          50 students
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '9px', paddingLeft: '9px' }}>Meet</div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: '#334155' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0284c7', display: 'inline-block' }} />
                          8 students
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '9px', paddingLeft: '9px' }}>Master</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: PLATFORM GURU (Mint Right Card) */}
            <div
              style={{
                backgroundColor: '#eaf5ee',
                borderRadius: '8px',
                padding: '2.5rem 1.85rem 2.25rem',
                boxShadow: '0 8px 30px -4px rgba(22, 101, 52, 0.04)',
                border: '1px solid #d4ebdc',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gridColumn: 'span 1'
              }}
            >
              {/* Text Header */}
              <div>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    color: '#1f382a',
                    margin: '0 0 0.85rem 0',
                    fontWeight: 500
                  }}
                >
                  <strong style={{ color: '#163322', fontWeight: 800 }}>A platform already used by many people</strong>,{' '}
                  with additional features such as administrative reporting, collaborative assessment, and district wide coordination.
                </p>
                <button
                  type="button"
                  onClick={onExploreAssessments || onExploreLibrary}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#d926a9',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr2') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr2') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Pelajari selengkapnya</span>
                  <span className="cta-arr2" style={{ fontSize: '1.2rem', display: 'inline-block', transition: 'transform 0.2s ease' }}>
                    &rarr;
                  </span>
                </button>
              </div>

              {/* Graphic Representation: Usage Analytics Dashboard Card */}
              <div
                style={{
                  marginTop: '2.25rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '16px 14px',
                  boxShadow: '0 8px 24px -4px rgba(22, 101, 52, 0.08)',
                  border: '1px solid #dfeee4',
                  overflowX: 'auto'
                }}
              >
                <div style={{ minWidth: '320px' }}>
                  {/* Header row with tabs */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', minWidth: 0, lineHeight: 1.3 }}>
                      Usage Analytics <span style={{ color: '#94a3b8', fontWeight: 400 }}>for Springfield District</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', padding: '2px', borderRadius: '8px', flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        style={{
                          padding: '3px 10px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: activeTab === 'overview' ? '#ffffff' : 'transparent',
                          color: activeTab === 'overview' ? '#0f172a' : '#64748b',
                          boxShadow: activeTab === 'overview' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                        }}
                      >
                        Overview
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('reports')}
                        style={{
                          padding: '3px 10px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: activeTab === 'reports' ? '#ffffff' : 'transparent',
                          color: activeTab === 'reports' ? '#0f172a' : '#64748b',
                          boxShadow: activeTab === 'reports' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                        }}
                      >
                        Reports
                      </button>
                    </div>
                  </div>

                  {/* 3 Metric Columns */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {/* Metric 1 */}
                    <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: 700, color: '#0d9488', marginBottom: '4px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M14 10v11M12 3L2 10h20L12 3z" />
                        </svg>
                        Active schools
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        40 <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>/ 50</span>
                      </div>
                      <div
                        style={{
                          marginTop: '12px',
                          backgroundColor: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderRadius: '8px',
                          padding: '6px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <div style={{ fontSize: '9px', color: '#166534', fontWeight: 600, lineHeight: 1.2 }}>
                          Most active:<br />Springfield High School
                        </div>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: 700, color: '#ca8a04', marginBottom: '4px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Active teachers
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        800
                      </div>
                      <div
                        style={{
                          marginTop: '12px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '6px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <span style={{ color: '#0284c7', fontSize: '10px' }}>▶</span>
                        <div style={{ fontSize: '9px', color: '#334155', fontWeight: 600 }}>
                          Total sessions<br /><strong style={{ color: '#0f172a' }}>87.5K</strong>
                        </div>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', fontWeight: 700, color: '#9333ea', marginBottom: '4px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Active students
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        25.5K
                      </div>
                      <div
                        style={{
                          marginTop: '12px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '6px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <span style={{ color: '#0d9488', fontSize: '10px' }}>📄</span>
                        <div style={{ fontSize: '9px', color: '#334155', fontWeight: 600 }}>
                          Responses<br /><strong style={{ color: '#0f172a' }}>8.2M</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ===================== ROW 2 ===================== */}
          <div className="ecosystem-row-2">
            {/* CARD 3: TECH STACK & INTEGRATIONS (Left narrower card) */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '2.5rem 1.85rem 2.25rem',
                boxShadow: '0 8px 30px -4px rgba(43, 19, 34, 0.04)',
                border: '1px solid #ede7db',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gridColumn: 'span 1'
              }}
            >
              {/* Text Header */}
              <div>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    color: '#44333e',
                    margin: '0 0 0.85rem 0',
                    fontWeight: 500
                  }}
                >
                   In accordance with the mathematics curriculum for your{' '}
                  <strong style={{ color: '#2b1322', fontWeight: 800 }}>grade level</strong>
                </p>
                <button
                  type="button"
                  onClick={onExploreAssessments || onExploreLibrary}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#d926a9',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr3') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr3') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Pelajari Selengkapnya</span>
                  <span className="cta-arr3" style={{ fontSize: '1.2rem', display: 'inline-block', transition: 'transform 0.2s ease' }}>
                    &rarr;
                  </span>
                </button>
              </div>

              {/* Graphic Representation: 6 App Tiles (Schoology, Classroom, Canvas, Clever, Teams, ClassLink) */}
              <div
                style={{
                  marginTop: '2.25rem',
                  backgroundColor: '#f5f3ec',
                  borderRadius: '8px',
                  padding: '22px 18px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '14px',
                  justifyItems: 'center',
                  alignItems: 'center',
                  border: '1px solid #eae5db'
                }}
              >
                {/* 1. Schoology */}
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(42, 18, 40, 0.06)',
                    border: '1px solid #ede8de'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '3.5px solid #0099e5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0099e5',
                      fontWeight: 900,
                      fontSize: '21px',
                      fontFamily: 'system-ui, sans-serif'
                    }}
                  >
                    S
                  </div>
                </div>

                {/* 2. Google Classroom */}
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(42, 18, 40, 0.06)',
                    border: '1px solid #ede8de'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '35px',
                      backgroundColor: '#137333',
                      borderRadius: '5px',
                      border: '2.5px solid #f9ab00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>

                {/* 3. Canvas LMS */}
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(42, 18, 40, 0.06)',
                    border: '1px solid #ede8de'
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="#e62629">
                    <circle cx="50" cy="50" r="14" fill="#e62629" />
                    <g transform="translate(50,50)">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <circle key={i} cx="0" cy="-33" r="7.5" transform={`rotate(${angle})`} fill="#e62629" />
                      ))}
                    </g>
                  </svg>
                </div>

                {/* 4. Clever */}
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(42, 18, 40, 0.06)',
                    border: '1px solid #ede8de'
                  }}
                >
                  <span
                    style={{
                      color: '#1a73e8',
                      fontWeight: 900,
                      fontSize: '15px',
                      letterSpacing: '-0.5px',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    Clever
                  </span>
                </div>

                {/* 5. Microsoft Teams */}
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(42, 18, 40, 0.06)',
                    border: '1px solid #ede8de'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#464eb8',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 900,
                      fontSize: '22px'
                    }}
                  >
                    T
                  </div>
                </div>

                {/* 6. ClassLink */}
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(42, 18, 40, 0.06)',
                    border: '1px solid #ede8de'
                  }}
                >
                  <svg width="28" height="20" viewBox="0 0 24 24" fill="#0072ce">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                  <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#0072ce', marginTop: '2px' }}>
                    ClassLink
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 4: PERPUSTAKAAN RESMI (Right wider card) */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '2.5rem 2.25rem 2.25rem',
                boxShadow: '0 8px 30px -4px rgba(43, 19, 34, 0.04)',
                border: '1px solid #ede7db',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gridColumn: 'span 1'
              }}
            >
              {/* Text Header */}
              <div>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    color: '#44333e',
                    margin: '0 0 0.85rem 0',
                    fontWeight: 500
                  }}
                >
                  Asesmen yang sudah jadi dan disesuaikan dengan ruang lingkup dan urutan pembelajaran Anda,
                  dengan tingkat ketelitian dan format yang sama dengan ujian negara bagian.{' '}
                  <strong style={{ color: '#2b1322', fontWeight: 800 }}>Perpustakaan Resmi Wayground</strong>
                </p>
                <button
                  type="button"
                  onClick={onExploreLibrary}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#d926a9',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr4') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector('.cta-arr4') as HTMLElement | null;
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Jelajahi Perpustakaan</span>
                  <span className="cta-arr4" style={{ fontSize: '1.2rem', display: 'inline-block', transition: 'transform 0.2s ease' }}>
                    &rarr;
                  </span>
                </button>
              </div>

              {/* Graphic Representation: Wayground Official Library with Lesson Cards */}
              <div
                style={{
                  marginTop: '2.25rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '20px 22px',
                  boxShadow: '0 8px 24px -4px rgba(42, 18, 40, 0.06)',
                  border: '1px solid #eae5db',
                  overflowX: 'auto'
                }}
              >
                <div style={{ minWidth: '420px' }}>
                  {/* Header with verified badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: '#ec4899',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 900
                      }}
                    >
                      ✓
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                      Wayground Official Library
                    </h3>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', paddingLeft: '30px' }}>
                    Customized for Hill Country School District
                  </div>

                  {/* Horizontal Subjects Assessment Cards */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px'
                    }}
                  >
                    {/* Card 1: Math Grade 6 */}
                    <div
                      onClick={() => setSelectedAssessmentCard(0)}
                      style={{
                        border: selectedAssessmentCard === 0 ? '2px solid #f97316' : '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedAssessmentCard === 0 ? '0 4px 12px rgba(249, 115, 22, 0.15)' : 'none',
                        flex: 1
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Math Grade 6</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>TEKS · enVision Mathematics</div>
                      </div>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          backgroundColor: '#ffedd5',
                          color: '#ea580c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontFamily: 'serif',
                          fontSize: '14px',
                          flexShrink: 0
                        }}
                      >
                        f(x)
                      </div>
                    </div>

                    {/* Card 2: ELA Grade 6 (Default active with border) */}
                    <div
                      onClick={() => setSelectedAssessmentCard(1)}
                      style={{
                        border: selectedAssessmentCard === 1 ? '2px solid #f97316' : '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedAssessmentCard === 1 ? '0 4px 12px rgba(249, 115, 22, 0.15)' : 'none',
                        flex: 1
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>ELA Grade 6</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>TEKS · Into Literature</div>
                      </div>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          backgroundColor: '#fed7aa',
                          color: '#9a3412',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                          <path d="M6 6h10" />
                          <path d="M6 10h10" />
                        </svg>
                      </div>
                    </div>

                    {/* Card 3: Earth Science Grade 6 */}
                    <div
                      onClick={() => setSelectedAssessmentCard(2)}
                      style={{
                        border: selectedAssessmentCard === 2 ? '2px solid #f97316' : '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedAssessmentCard === 2 ? '0 4px 12px rgba(249, 115, 22, 0.15)' : 'none',
                        flex: 1
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Earth Science Grade 6</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>TEKS · Interactive Science</div>
                      </div>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          backgroundColor: '#ffedd5',
                          color: '#ea580c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
