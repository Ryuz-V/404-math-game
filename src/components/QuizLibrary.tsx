"use client";

import React, { useState } from 'react';

interface QuizLibraryProps {
  onSelectQuiz: (topicId: string) => void;
}

export default function QuizLibrary({ onSelectQuiz }: QuizLibraryProps) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');

  const curriculumResources = [
    { id: 'kaidah-pencacahan', title: 'Algebra & Combinatorics', subtitle: 'Grade 12', icon: '🧮', color: '#ffdc00' },
    { id: 'dimensi-tiga', title: '3D Geometry', subtitle: 'Grade 12', icon: '🧊', color: '#82fed6' },
    { id: 'kalkulus-lanjut', title: 'Advanced Calculus', subtitle: 'Grade 12', icon: '📈', color: '#ff6b6b' },
    { id: 'statistika', title: 'Statistics & Probability', subtitle: 'Grade 12', icon: '📊', color: '#00d0ff' },
  ];

  const standardsResources = [
    { id: 'all', title: 'National Exam Prep', subtitle: 'Mixed Topics', icon: '📝', color: '#ffdc00' },
    { id: 'all', title: 'University Entrance', subtitle: 'Advanced', icon: '🎓', color: '#82fed6' },
    { id: 'all', title: 'Basic Foundation', subtitle: 'Review', icon: '🧱', color: '#ffb17a' },
  ];

  return (
    <div className="ql-page-wrapper">
      {/* Top Header Gradient Section */}
      <div className="ql-top-gradient">
        <div className="ql-container ql-container-top">
          <div className="ql-greeting">
            <h2>Good evening, there 👋 Let's get started.</h2>
          </div>

          {/* Tabs */}
          <div className="ql-tabs-wrapper">
            <div className="ql-tabs">
              <button 
                className={`ql-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => setActiveTab('create')}
              >
                <div className="ql-tab-icon-wrapper">
                  <div className="ql-tab-icon">✏️</div>
                </div>
                <div className="ql-tab-text">
                  <strong>Create</strong>
                  <span>a resource</span>
                </div>
              </button>
              
              <button 
                className={`ql-tab-btn ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => setActiveTab('search')}
              >
                <div className="ql-tab-icon-wrapper">
                  <div className="ql-tab-icon">🔍</div>
                </div>
                <div className="ql-tab-text">
                  <strong>Search</strong>
                  <span>for resources</span>
                </div>
                {activeTab === 'search' && <div className="ql-tab-arrow"></div>}
              </button>
              
              <button 
                className={`ql-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                <div className="ql-tab-icon-wrapper">
                  <div className="ql-tab-icon">📤</div>
                </div>
                <div className="ql-tab-text">
                  <strong>Upload</strong>
                  <span>& enhance your content</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ql-container">

      {/* Filters */}
      <div className="ql-filters">
        <span className="ql-filter-label">Browse resources for</span>
        <div className="ql-filter-dropdown">
          Mathematics <span className="caret">▼</span>
        </div>
        <div className="ql-filter-dropdown">
          Grade 12 <span className="caret">▼</span>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="ql-resources-section">
        {/* Category 1 */}
        <div className="ql-category">
          <div className="ql-category-header">
            <h3>Curriculum-aligned mathematics resources</h3>
            <div className="ql-cat-actions">
              <button className="ql-see-all">See all ➡️</button>
            </div>
          </div>
          
          <div className="ql-cards-grid">
            {curriculumResources.map((res, index) => (
              <div 
                key={res.id + index} 
                className="ql-resource-card"
                onClick={() => onSelectQuiz(res.id)}
              >
                <div className="ql-card-content">
                  <h4>{res.title}</h4>
                  <span className="ql-card-subtitle">{res.subtitle}</span>
                </div>
                <div className="ql-card-image" style={{ backgroundColor: res.color }}>
                  {res.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2 */}
        <div className="ql-category">
          <div className="ql-category-header">
            <h3>Standards-aligned mathematics resources</h3>
            <div className="ql-cat-actions">
              <button className="ql-see-all">See all ➡️</button>
            </div>
          </div>
          
          <div className="ql-cards-grid">
            {standardsResources.map((res, index) => (
              <div 
                key={res.id + index} 
                className="ql-resource-card"
                onClick={() => onSelectQuiz(res.id)}
              >
                <div className="ql-card-content">
                  <h4>{res.title}</h4>
                  <span className="ql-card-subtitle">{res.subtitle}</span>
                </div>
                <div className="ql-card-image" style={{ backgroundColor: res.color }}>
                  {res.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
