"use client";
import React, { useState } from 'react';
interface QuizLibraryProps {
  onSelectQuiz: (topicId: string) => void;
}
export default function QuizLibrary({ onSelectQuiz }: QuizLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const mockCards = [
    { id: '1', enrolled: 10, title: 'Mastering UI Design for Impactful Solutions', accuracy: 40, completion: 60, tags: ['UI/UX', 'Not Urgent'], edited: '2h ago', questions: 10, bannerColor: '#fcd34d' },
    { id: '2', enrolled: 21, title: 'A Symphony of Colors in UI Design', accuracy: 20, completion: 80, tags: ['Instructional Design', 'Not Urgent'], edited: '8h ago', questions: 15, bannerColor: '#bae6fd' },
    { id: '3', enrolled: 18, title: 'Bridging Users and UI in Design Harmony', accuracy: 100, completion: 100, tags: ['Experience Design', 'Urgent'], edited: '23h ago', questions: 25, bannerColor: '#d8b4fe' },
    { id: '4', enrolled: 9, title: 'Creating Engaging Learning Journeys: UI/UX Best Practices', accuracy: 20, completion: 100, tags: ['UI/UX', 'Urgent'], edited: '5d ago', questions: 30, bannerColor: '#93c5fd' },
    { id: '5', enrolled: 12, title: 'Designing Intuitive User Interfaces', accuracy: 80, completion: 80, tags: ['User Interface (UI)', 'Not Urgent'], edited: '2d ago', questions: 15, bannerColor: '#fde047' },
    { id: '6', enrolled: 7, title: 'Optimizing User Experience in Educational Platforms', accuracy: 0, completion: 0, tags: ['User Experience', 'Urgent'], edited: '4d ago', questions: 25, bannerColor: '#e9d5ff', isDraft: true },
  ];
  const CircleChart = ({ percentage, color }: { percentage: number, color: string }) => (
    <svg width="28" height="28" viewBox="0 0 36 36" style={{ marginBottom: '4px' }}>
      <path style={{ color: '#e5e7eb' }} stroke="currentColor" strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path style={{ stroke: color }} strokeDasharray={`${percentage}, 100`} strokeWidth="5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
    </svg>
  );
  return (
    <div style={{ backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', color: '#111', height: '100vh', overflow: 'hidden' }}>
      <div style={{ backgroundColor: 'white', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#ec4899', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>FS</div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px', margin: 0 }}>Fikri Studio</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#facc15', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', zIndex: 30, marginLeft: '-8px' }}>RF</div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', zIndex: 20, marginLeft: '-8px' }}>👤</div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', zIndex: 10, marginLeft: '-8px' }}>👤</div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '14px', cursor: 'pointer', marginLeft: '-8px' }}>+</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Upload</button>
          <button style={{ padding: '8px 16px', backgroundColor: '#2a1a6b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>+ New Content</button>
        </div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '12px 32px 0 32px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '32px', fontSize: '13px', fontWeight: 'bold', color: '#6b7280', flexShrink: 0 }}>
        <div style={{ paddingBottom: '12px', cursor: 'pointer' }}>Folder</div>
        <div style={{ paddingBottom: '12px', cursor: 'pointer' }}>Page</div>
        <div style={{ paddingBottom: '12px', cursor: 'pointer' }}>Course</div>
        <div style={{ paddingBottom: '12px', cursor: 'pointer', color: '#111827', borderBottom: '2px solid #2a1a6b' }}>Quiz</div>
        <div style={{ paddingBottom: '12px', cursor: 'pointer' }}>Assignment</div>
        <div style={{ paddingBottom: '12px', cursor: 'pointer' }}>Learning Path</div>
        <div style={{ paddingBottom: '12px', cursor: 'pointer' }}>Wiki</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '32px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#eef2ff', color: '#4338ca', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #e0e7ff' }}>
                  Total Question: 5 or more 
                  <span style={{ marginLeft: '4px', cursor: 'pointer' }}>x</span>
                </div>
                <button style={{ color: '#4f46e5', fontSize: '12px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px' }}>Reset</button>
                <div style={{ width: '1px', height: '20px', backgroundColor: '#d1d5db', margin: '0 4px' }}></div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontSize: '12px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>Add Filter</button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontSize: '12px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>Date Created</button>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
                  <div style={{ padding: '6px 12px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', cursor: 'pointer', color: '#1f2937', fontWeight: 'bold', fontSize: '12px' }}>Grid</div>
                  <div style={{ padding: '6px 12px', color: '#6b7280', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>List</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '13px', color: '#111827' }}>100 content</span>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: '6px 16px', fontSize: '14px', border: 'none', backgroundColor: 'transparent', outline: 'none', color: '#374151', fontWeight: 'bold', width: '256px' }} 
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {mockCards.map((card) => (
              <div key={card.id} onClick={() => onSelectQuiz(card.id)} style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}>
                
                <div style={{ height: '140px', margin: '8px', borderRadius: '16px 16px 4px 4px', backgroundColor: card.bannerColor, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(49, 46, 129, 0.8)', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    {card.enrolled} Enrolled
                  </div>
                  {card.isDraft && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#374151', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#9ca3af', borderRadius: '50%' }}></span>
                      Draft
                    </div>
                  )}
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, position: 'relative' }}>
                     <div style={{ position: 'absolute', fontWeight: 900, fontSize: '60px', color: 'rgba(49, 46, 129, 0.1)', transform: 'rotate(-12deg)', left: '32px' }}>Aa</div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px 8px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '16px', lineHeight: 1.4, color: '#111827', marginBottom: '20px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {card.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CircleChart percentage={card.accuracy} color={card.accuracy === 100 ? "#10b981" : card.accuracy === 0 ? "#e5e7eb" : "#10b981"} />
                      <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Accuracy</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{card.accuracy === 0 ? "-" : `${card.accuracy}%`}</span>
                        <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 'bold' }}>(i)</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <CircleChart percentage={card.completion} color="#10b981" />
                      <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 800, marginBottom: '2px', marginTop: '4px' }}>Completion Rate</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', color: '#111827' }}>{card.completion === 0 ? "-" : `${card.completion}%`}</span>
                        <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 'bold' }}>(i)</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {card.tags.map((tag, idx) => (
                      <span key={idx} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '10px', borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {tag}
                      </span>
                    ))}
                    <div style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: '12px' }}>👤</div>
                  </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6' }}></div>
                </div>
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', fontWeight: 800, backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Edited {card.edited}</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#374151' }}>
                      <span>💬 {card.questions} Question</span>
                    </div>
                  </div>
                  <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#374151', background: 'none', border: 'none', fontWeight: 'bold', letterSpacing: '2px', paddingBottom: '4px', cursor: 'pointer' }}>...</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}