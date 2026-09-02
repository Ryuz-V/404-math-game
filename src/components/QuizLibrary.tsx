"use client";

import React, { useState, useMemo } from 'react';

interface QuizLibraryProps {
  onSelectQuiz: (topicId: string) => void;
}

export default function QuizLibrary({ onSelectQuiz }: QuizLibraryProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'search' | 'upload'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedGrade, setSelectedGrade] = useState('Grade 12');
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const curriculumResources = [
    {
      id: 'kaidah-pencacahan',
      title: 'Algebra & Combinatorics',
      subtitle: 'Grade 12',
      icon: '🧮',
      color: '#ffdc00',
    },
    {
      id: 'dimensi-tiga',
      title: '3D Geometry',
      subtitle: 'Grade 12',
      icon: '🧊',
      color: '#82fed6',
    },
    {
      id: 'kalkulus-lanjut',
      title: 'Advanced Calculus',
      subtitle: 'Grade 12',
      icon: '📈',
      color: '#ff6b6b',
    },
    {
      id: 'statistika',
      title: 'Statistics & Probability',
      subtitle: 'Grade 12',
      icon: '📊',
      color: '#00d0ff',
    },
  ];

  const standardsResources = [
    {
      id: 'kaidah-pencacahan',
      title: 'National Exam (UTBK / SNBT)',
      subtitle: 'Grade 12 Prep',
      icon: '📝',
      color: '#ffdc00',
    },
    {
      id: 'kalkulus-lanjut',
      title: 'University Entrance Math',
      subtitle: 'Advanced Level',
      icon: '🎓',
      color: '#82fed6',
    },
    {
      id: 'all',
      title: 'Foundation Review',
      subtitle: 'Grade 12 Review',
      icon: '🧱',
      color: '#ffb17a',
    },
  ];

  // Search filter
  const filteredCurriculum = curriculumResources.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStandards = standardsResources.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabClick = (tab: 'create' | 'search' | 'upload') => {
    setActiveTab(tab);
    if (tab === 'create') {
      setIsCreateModalOpen(true);
    } else if (tab === 'upload') {
      setIsUploadModalOpen(true);
    }
  };

  return (
    <div className="ql-page-wrapper">
      {/* Top Header Glow Section */}
      <div className="ql-top-gradient">
        <div className="ql-container ql-container-top">
          {/* Action Tabs with Pixel-Perfect Geometric Shapes */}
          <div className="ql-tabs-wrapper">
            <div className="ql-tabs">
              {/* Create Tab (Right edge slants / matching center card left edge) */}
              <button 
                type="button"
                className={`ql-tab-btn tab-left ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => handleTabClick('create')}
              >
                <svg className="ql-card-shape-svg" viewBox="0 0 162 84" preserveAspectRatio="none">
                  <path 
                    d="M 12 0 L 132 0 Q 144 0 144 12 L 162 72 Q 162 84 150 84 L 12 84 Q 0 84 0 72 L 0 12 Q 0 0 12 0 Z" 
                    fill="#ffffff" 
                    stroke="#e2e8f0" 
                    strokeWidth="1.2" 
                  />
                </svg>
                <div className="ql-tab-inner">
                  <div className={`ql-tab-icon-wrapper ${activeTab === 'create' ? 'active-tab-ring' : ''}`}>
                    <div className="ql-tab-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ql-tab-text">
                    <strong>Create</strong>
                    <span>a resource</span>
                  </div>
                </div>
              </button>
              
              {/* Search Tab (Inverted trapezoid with parallel left / and right \) */}
              <button 
                type="button"
                className={`ql-tab-btn tab-center ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => handleTabClick('search')}
              >
                <svg className="ql-card-shape-svg center-svg" viewBox="0 0 170 92" preserveAspectRatio="none">
                  <path 
                    d="M 22 0 L 148 0 Q 160 0 160 12 L 142 72 Q 142 84 130 84 L 93 84 L 85 92 L 77 84 L 40 84 Q 28 84 28 72 L 10 12 Q 10 0 22 0 Z" 
                    fill="#ffffff" 
                    stroke="#e2e8f0" 
                    strokeWidth="1.2" 
                  />
                </svg>
                <div className="ql-tab-inner">
                  <div className={`ql-tab-icon-wrapper ${activeTab === 'search' ? 'active-tab-ring' : ''}`}>
                    <div className="ql-tab-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'search' ? '#0f172a' : '#475569'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="ql-tab-text">
                    <strong>Search</strong>
                    <span>for resources</span>
                  </div>
                </div>
              </button>
              
              {/* Upload Tab (Left edge slants \ matching center card right edge) */}
              <button 
                type="button"
                className={`ql-tab-btn tab-right ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => handleTabClick('upload')}
              >
                <svg className="ql-card-shape-svg" viewBox="0 0 162 84" preserveAspectRatio="none">
                  <path 
                    d="M 30 0 L 150 0 Q 162 0 162 12 L 162 72 Q 162 84 150 84 L 12 84 Q 0 84 0 72 L 18 12 Q 18 0 30 0 Z" 
                    fill="#ffffff" 
                    stroke="#e2e8f0" 
                    strokeWidth="1.2" 
                  />
                </svg>
                <div className="ql-tab-inner">
                  <div className={`ql-tab-icon-wrapper ${activeTab === 'upload' ? 'active-tab-ring' : ''}`}>
                    <div className="ql-tab-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="ql-tab-text">
                    <strong>Upload</strong>
                    <span>& enhance your content</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ql-container ql-main-body">
        {/* Browse Resources Filter Line */}
        <div className="ql-browse-line">
          <span className="ql-browse-text">Browse resources for</span>
          
          <div className="ql-filter-dropdown-container">
            <button 
              className="ql-filter-select-btn"
              onClick={() => {
                setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
                setIsGradeDropdownOpen(false);
              }}
            >
              <span>{selectedSubject}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isSubjectDropdownOpen && (
              <div className="ql-dropdown-menu">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map(sub => (
                  <div 
                    key={sub} 
                    className="ql-dropdown-item"
                    onClick={() => {
                      setSelectedSubject(sub);
                      setIsSubjectDropdownOpen(false);
                    }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="ql-filter-dropdown-container">
            <button 
              className="ql-filter-select-btn"
              onClick={() => {
                setIsGradeDropdownOpen(!isGradeDropdownOpen);
                setIsSubjectDropdownOpen(false);
              }}
            >
              <span>{selectedGrade}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isGradeDropdownOpen && (
              <div className="ql-dropdown-menu">
                {['Grade 10', 'Grade 11', 'Grade 12', 'All High School'].map(grd => (
                  <div 
                    key={grd} 
                    className="ql-dropdown-item"
                    onClick={() => {
                      setSelectedGrade(grd);
                      setIsGradeDropdownOpen(false);
                    }}
                  >
                    {grd}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 1: Curriculum-aligned mathematics resources */}
        <section className="ql-section">
          <div className="ql-section-header">
            <h3 className="ql-section-title">Curriculum-aligned mathematics resources</h3>
            <div className="ql-section-right">
              <a href="#" className="ql-see-all-link" onClick={(e) => { e.preventDefault(); onSelectQuiz('all'); }}>
                See all <span className="ql-arrow">&rarr;</span>
              </a>
              <span className="ql-badge-early">Early access</span>
            </div>
          </div>

          <div className="ql-grid-3col">
            {filteredCurriculum.map((item, idx) => (
              <div 
                key={idx} 
                className="ql-modern-card"
                onClick={() => onSelectQuiz(item.id)}
              >
                <div className="ql-card-left">
                  <h4 className="ql-card-heading">{item.title}</h4>
                  <span className="ql-card-subtitle">{item.subtitle}</span>
                </div>
                <div className="ql-card-badge-right" style={{ backgroundColor: item.color }}>
                  <span className="ql-badge-icon">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Standards-aligned mathematics resources */}
        <section className="ql-section">
          <div className="ql-section-header">
            <h3 className="ql-section-title">Standards-aligned mathematics resources</h3>
            <div className="ql-section-right">
              <a href="#" className="ql-see-all-link" onClick={(e) => { e.preventDefault(); onSelectQuiz('all'); }}>
                See all <span className="ql-arrow">&rarr;</span>
              </a>
              <span className="ql-badge-early">Early access</span>
            </div>
          </div>

          <div className="ql-grid-3col">
            {filteredStandards.map((item, idx) => (
              <div 
                key={idx} 
                className="ql-modern-card"
                onClick={() => onSelectQuiz(item.id)}
              >
                <div className="ql-card-left">
                  <h4 className="ql-card-heading">{item.title}</h4>
                  <span className="ql-card-subtitle">{item.subtitle}</span>
                </div>
                <div className="ql-card-badge-right" style={{ backgroundColor: item.color }}>
                  <span className="ql-badge-icon">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Help Button (Bottom-Right) */}
      <button 
        className="ql-floating-help-btn"
        title="Help & Support"
        onClick={() => alert("Need help? Choose a Grade 12 mathematics module to start practicing quizzes and exercises!")}
      >
        <span>?</span>
      </button>

      {/* Create Resource Modal */}
      {isCreateModalOpen && (
        <div className="ql-modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
          <div className="ql-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ql-modal-header">
              <h3>Create a Resource</h3>
              <button className="ql-modal-close" onClick={() => setIsCreateModalOpen(false)}>&times;</button>
            </div>
            <div className="ql-modal-body">
              <p>Select what type of resource you want to create:</p>
              <div className="ql-modal-actions-grid">
                <button className="ql-action-box" onClick={() => { setIsCreateModalOpen(false); onSelectQuiz('kaidah-pencacahan'); }}>
                  <div className="ql-box-icon">📝</div>
                  <strong>New Quiz</strong>
                  <span>Create interactive math questions</span>
                </button>
                <button className="ql-action-box" onClick={() => { setIsCreateModalOpen(false); onSelectQuiz('dimensi-tiga'); }}>
                  <div className="ql-box-icon">📖</div>
                  <strong>Study Lesson</strong>
                  <span>Build notes and formula summaries</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="ql-modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="ql-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ql-modal-header">
              <h3>Upload & Enhance Content</h3>
              <button className="ql-modal-close" onClick={() => setIsUploadModalOpen(false)}>&times;</button>
            </div>
            <div className="ql-modal-body">
              <div className="ql-upload-dropzone" onClick={() => { alert("Select a document or PDF to convert into questions"); setIsUploadModalOpen(false); }}>
                <div className="ql-dropzone-icon">📤</div>
                <h4>Drag & drop PDF, Word, or Spreadsheet</h4>
                <p>or click to browse files from your device</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
