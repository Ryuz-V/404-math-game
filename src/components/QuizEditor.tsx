"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UserQuiz, QuizQuestion, QuizChoice } from '../types/quiz';
import { saveUserQuiz } from '../utils/quizStorage';

interface QuizEditorProps {
  initialQuiz?: UserQuiz | null;
  onBack: () => void;
  onPublishSuccess: (quiz: UserQuiz) => void;
}

const BANNER_COLORS = [
  { name: 'Purple', value: '#d8b4fe', text: '#581c87' },
  { name: 'Yellow', value: '#fde047', text: '#854d0e' },
  { name: 'Light Blue', value: '#93c5fd', text: '#1e40af' },
  { name: 'Cyan Blue', value: '#bae6fd', text: '#0369a1' },
  { name: 'Green Mint', value: '#86efac', text: '#166534' },
  { name: 'Rose Pink', value: '#fbcfe8', text: '#9d174d' },
];

export default function QuizEditor({ initialQuiz, onBack, onPublishSuccess }: QuizEditorProps) {
  const [title, setTitle] = useState(initialQuiz?.title || 'UI Design Fundamentals & Best Practice');
  const [summary, setSummary] = useState(initialQuiz?.summary || 'Kumpulan soal latihan untuk menguji pemahaman konsep materi secara komprehensif.');
  const [category, setCategory] = useState(initialQuiz?.category || 'UI/UX');
  const [bannerColor, setBannerColor] = useState(initialQuiz?.bannerColor || '#d8b4fe');
  const [passingScore, setPassingScore] = useState(initialQuiz?.passingScore || 70);
  const [resultPassedMsg, setResultPassedMsg] = useState(initialQuiz?.resultPassedMessage || 'Selamat! Kamu berhasil lulus kuis ini dengan sangat baik!');
  const [resultFailedMsg, setResultFailedMsg] = useState(initialQuiz?.resultFailedMessage || 'Jangan berkecil hati! Pelajari kembali materi dan coba lagi.');
  
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuiz?.questions || [
    {
      id: 'q1',
      questionText: 'What does UI stand for in the context of design?',
      type: 'multiple_choice',
      required: true,
      image: '',
      choices: [
        { id: 'c1', text: 'User Integration', isCorrect: false },
        { id: 'c2', text: 'User Interface', isCorrect: true },
        { id: 'c3', text: 'Universal Interaction', isCorrect: false },
        { id: 'c4', text: 'User Involvement', isCorrect: false }
      ],
      randomizeOrder: false,
      estimationTimeMins: 2,
      points: 1
    },
    {
      id: 'q2',
      questionText: 'Which aspect of UI design focuses on the visual hierarchy and contrast?',
      type: 'multiple_choice',
      required: true,
      image: '',
      choices: [
        { id: 'c1', text: 'Visual Layout & Typography', isCorrect: true },
        { id: 'c2', text: 'Server Response Time', isCorrect: false },
        { id: 'c3', text: 'Database Sharding', isCorrect: false },
        { id: 'c4', text: 'Network Bandwidth', isCorrect: false }
      ],
      randomizeOrder: false,
      estimationTimeMins: 2,
      points: 1
    }
  ]);

  const [activeQuestionId, setActiveQuestionId] = useState<string>(questions[0]?.id || 'q1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResultScreenOpen, setIsResultScreenOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, string>>({});
  const [previewSubmitted, setPreviewSubmitted] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Edited Just now');

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll to question when clicking sidebar item
  const scrollToQuestion = (qId: string) => {
    setActiveQuestionId(qId);
    const elem = questionRefs.current[qId];
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAddQuestion = () => {
    const newId = `q-${Date.now()}`;
    const newQuestion: QuizQuestion = {
      id: newId,
      questionText: '',
      type: 'multiple_choice',
      required: true,
      image: '',
      choices: [
        { id: `c-${Date.now()}-1`, text: 'Pilihan Jawaban A', isCorrect: true },
        { id: `c-${Date.now()}-2`, text: 'Pilihan Jawaban B', isCorrect: false },
        { id: `c-${Date.now()}-3`, text: 'Pilihan Jawaban C', isCorrect: false },
        { id: `c-${Date.now()}-4`, text: 'Pilihan Jawaban D', isCorrect: false },
      ],
      randomizeOrder: false,
      estimationTimeMins: 2,
      points: 1
    };

    setQuestions(prev => [...prev, newQuestion]);
    setTimeout(() => scrollToQuestion(newId), 100);
    setSaveStatus('Edited Just now');
  };

  const handleDeleteQuestion = (qId: string) => {
    if (questions.length <= 1) {
      alert('Kuis harus memiliki minimal 1 soal.');
      return;
    }
    setQuestions(prev => prev.filter(q => q.id !== qId));
    setSaveStatus('Edited Just now');
  };

  const handleDuplicateQuestion = (q: QuizQuestion) => {
    const newId = `q-${Date.now()}`;
    const duplicated: QuizQuestion = {
      ...q,
      id: newId,
      choices: q.choices.map((c, i) => ({ ...c, id: `c-${Date.now()}-${i}` }))
    };
    setQuestions(prev => [...prev, duplicated]);
    setTimeout(() => scrollToQuestion(newId), 100);
    setSaveStatus('Edited Just now');
  };

  const handleUpdateQuestion = (qId: string, updates: Partial<QuizQuestion>) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, ...updates } : q));
    setSaveStatus('Edited Just now');
  };

  const handleAddChoice = (qId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          choices: [
            ...q.choices,
            { id: `c-${Date.now()}-${q.choices.length + 1}`, text: `Pilihan Baru ${q.choices.length + 1}`, isCorrect: false }
          ]
        };
      }
      return q;
    }));
    setSaveStatus('Edited Just now');
  };

  const handleUpdateChoice = (qId: string, cId: string, text: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          choices: q.choices.map(c => c.id === cId ? { ...c, text } : c)
        };
      }
      return q;
    }));
  };

  const handleSetCorrectChoice = (qId: string, cId: string, isMultiple = false) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          choices: q.choices.map(c => {
            if (c.id === cId) {
              return { ...c, isCorrect: isMultiple ? !c.isCorrect : true };
            }
            return isMultiple ? c : { ...c, isCorrect: false };
          })
        };
      }
      return q;
    }));
    setSaveStatus('Edited Just now');
  };

  const handleDeleteChoice = (qId: string, cId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        if (q.choices.length <= 2) {
          alert('Soal minimal harus memiliki 2 pilihan jawaban.');
          return q;
        }
        return {
          ...q,
          choices: q.choices.filter(c => c.id !== cId)
        };
      }
      return q;
    }));
  };

  const handleImageUpload = (qId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateQuestion(qId, { image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveOrPublish = (isDraft: boolean) => {
    const finalQuiz: UserQuiz = {
      id: initialQuiz?.id || `user-quiz-${Date.now()}`,
      title: title.trim() || 'Untitled Quizz',
      summary: summary.trim() || `Kumpulan ${questions.length} soal latihan.`,
      category: category || 'Matematika',
      tags: [category, isDraft ? 'Draft' : 'Community'],
      bannerColor,
      accuracy: initialQuiz?.accuracy || 0,
      completion: initialQuiz?.completion || 0,
      isDraft,
      createdAt: initialQuiz?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      editedTimeAgo: 'Just now',
      authorName: 'You',
      passingScore,
      resultPassedMessage: resultPassedMsg,
      resultFailedMessage: resultFailedMsg,
      questions
    };

    saveUserQuiz(finalQuiz);
    onPublishSuccess(finalQuiz);
  };

  const filteredQuestions = questions.filter(q => 
    q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.choices.some(c => c.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: '#f4f5f8', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#111827', fontFamily: 'inherit' }}>
      
      {/* TOP NAVIGATION BAR (Matching Photo 3) */}
      <header style={{
        height: '64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {/* Left Side: Back Arrow + Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onBack}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#374151',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            ❮
          </button>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>
            {saveStatus}
          </span>
        </div>

        {/* Center: Quiz Title with Icon and Cloud Save Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '500px', justifyContent: 'center' }}>
          <span style={{ fontSize: '18px' }}>📄</span>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setSaveStatus('Edited Just now'); }}
            placeholder="Judul Kuis..."
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#111827',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              textAlign: 'center',
              width: '100%',
              maxWidth: '380px',
              borderBottom: '1px dashed #d1d5db',
              padding: '2px 4px'
            }}
          />
          <span style={{ fontSize: '14px', color: '#9ca3af', cursor: 'pointer' }} title="Cloud Auto-save">☁️</span>
          <span style={{ fontSize: '11px', color: '#6b7280' }}>▼</span>
        </div>

        {/* Right Side: Collab Avatars, Settings, Preview, Publish */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Avatar RF + */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#fef08a',
              color: '#854d0e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 800,
              border: '1px solid #fde047'
            }}>
              RF
            </div>
            <button style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px dashed #d1d5db',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#6b7280'
            }}>
              +
            </button>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              cursor: 'pointer',
              color: '#4b5563'
            }}
            title="Pengaturan Kuis"
          >
            ⚙️
          </button>

          {/* Preview Button */}
          <button
            onClick={() => {
              setPreviewAnswers({});
              setPreviewSubmitted(false);
              setIsPreviewOpen(true);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#374151',
              cursor: 'pointer'
            }}
          >
            <span>▷</span>
            <span>Preview</span>
          </button>

          {/* Save Draft */}
          <button
            onClick={() => handleSaveOrPublish(true)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: '#f9fafb',
              fontSize: '13px',
              fontWeight: 700,
              color: '#4b5563',
              cursor: 'pointer'
            }}
          >
            Draft
          </button>

          {/* Publish Button (Purple filled) */}
          <button
            onClick={() => handleSaveOrPublish(false)}
            style={{
              padding: '8px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2a1a6b',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(42, 26, 107, 0.25)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e124d'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a1a6b'}
          >
            Publish
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER (Sidebar + Canvas Editor) */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        
        {/* LEFT SIDEBAR (Question List) */}
        <aside style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          flexShrink: 0
        }}>
          {/* Sidebar Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#374151', letterSpacing: '0.05em' }}>
              QUESTION ({questions.length})
            </span>
            <button
              onClick={handleAddQuestion}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#374151'
              }}
              title="Tambah Soal Baru"
            >
              +
            </button>
          </div>

          {/* Search Box */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '6px 12px',
              border: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '12px',
                  width: '100%',
                  color: '#111827'
                }}
              />
            </div>
          </div>

          {/* Question List Scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredQuestions.map((q, idx) => {
                const isActive = activeQuestionId === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => scrollToQuestion(q.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? '#f5f3ff' : '#ffffff',
                      border: isActive ? '1.5px solid #7c3aed' : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? '#7c3aed' : '#f3f4f6',
                      color: isActive ? '#ffffff' : '#4b5563',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#111827',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {q.questionText || `Untitled Question ${idx + 1}`}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '4px',
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>☑️</span>
                          <span>Multiple choice</span>
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDuplicateQuestion(q); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#9ca3af' }}
                            title="Duplikat"
                          >
                            📑
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteQuestion(q.id); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#ef4444' }}
                            title="Hapus"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Sidebar Item: Result Screen */}
          <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
            <div
              onClick={() => setIsResultScreenOpen(true)}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: '#f3e8ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                🖼️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#111827' }}>Result Screen</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Set your Passed/Failed message</div>
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>➔</span>
            </div>
          </div>
        </aside>

        {/* MAIN CANVAS AREA (Scrollable Question Cards) */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 48px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {questions.map((q, idx) => (
              <div
                key={q.id}
                ref={(el) => { questionRefs.current[q.id] = el; }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: activeQuestionId === q.id ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                  padding: '28px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  transition: 'border-color 0.2s ease'
                }}
                onClick={() => setActiveQuestionId(q.id)}
              >
                {/* Question Card Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#9ca3af', fontSize: '16px', cursor: 'grab' }} title="Drag to reorder">:::</span>
                    
                    {/* Question Type Selector */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1e293b'
                    }}>
                      <span>☑️</span>
                      <select
                        value={q.type}
                        onChange={(e) => handleUpdateQuestion(q.id, { type: e.target.value as any })}
                        style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                      >
                        <option value="multiple_choice">Multiple choice</option>
                        <option value="multiple_answer">Multiple answer</option>
                        <option value="true_false">True / False</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Actions: Required Toggle + Delete */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                      Required
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) => handleUpdateQuestion(q.id, { required: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: '#7c3aed', cursor: 'pointer' }}
                      />
                    </label>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                        color: '#94a3b8'
                      }}
                      title="Hapus Soal"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Question Prompt + Optional Image Area */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
                      ❓ Question {idx + 1}*
                    </label>
                    <textarea
                      rows={3}
                      value={q.questionText}
                      onChange={(e) => handleUpdateQuestion(q.id, { questionText: e.target.value })}
                      placeholder="Masukkan pertanyaan atau rumus soal matematika di sini..."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0f172a',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.5
                      }}
                    />
                  </div>

                  {/* Image Attachment Box (Matching Photo 3) */}
                  <div style={{ width: '180px', flexShrink: 0 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                      Attachment Image
                    </label>
                    {q.image ? (
                      <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <img src={q.image} alt="Question preview" style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '4px', right: '4px', display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => handleUpdateQuestion(q.id, { image: '' })}
                            style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', cursor: 'pointer' }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90px',
                        border: '2px dashed #cbd5e1',
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        fontSize: '11px',
                        textAlign: 'center',
                        padding: '8px'
                      }}>
                        <span style={{ fontSize: '18px', marginBottom: '2px' }}>🖼️</span>
                        <span>Upload Gambar / Diagram</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(q.id, e)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Choices Header Toggles */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>
                    Choices* <span style={{ fontSize: '11px', fontWeight: 500, color: '#64748b' }}>(Centang untuk menandai kunci jawaban benar)</span>
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      Multiple answer
                      <input
                        type="checkbox"
                        checked={q.type === 'multiple_answer'}
                        onChange={(e) => handleUpdateQuestion(q.id, { type: e.target.checked ? 'multiple_answer' : 'multiple_choice' })}
                        style={{ accentColor: '#7c3aed' }}
                      />
                    </label>
                  </div>
                </div>

                {/* Choices List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.choices.map((choice, cIdx) => (
                    <div
                      key={choice.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: choice.isCorrect ? '#f5f3ff' : '#f8fafc',
                        border: choice.isCorrect ? '1.5px solid #7c3aed' : '1px solid #e2e8f0',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Radio / Check Button for marking Correct Answer */}
                      <button
                        type="button"
                        onClick={() => handleSetCorrectChoice(q.id, choice.id, q.type === 'multiple_answer')}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: q.type === 'multiple_answer' ? '4px' : '50%',
                          border: choice.isCorrect ? '2px solid #7c3aed' : '2px solid #cbd5e1',
                          backgroundColor: choice.isCorrect ? '#7c3aed' : '#ffffff',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        title="Pilih sebagai kunci jawaban"
                      >
                        {choice.isCorrect ? '✓' : ''}
                      </button>

                      {/* Choice Text Input */}
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => handleUpdateChoice(q.id, choice.id, e.target.value)}
                        placeholder={`Pilihan ${String.fromCharCode(65 + cIdx)}...`}
                        style={{
                          flex: 1,
                          border: 'none',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '14px',
                          fontWeight: choice.isCorrect ? 700 : 500,
                          color: choice.isCorrect ? '#4c1d95' : '#1e293b'
                        }}
                      />

                      {/* Grip & Delete */}
                      <span style={{ color: '#cbd5e1', fontSize: '14px', cursor: 'grab' }}>:::</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteChoice(q.id, choice.id)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}
                        title="Hapus opsi"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}

                  {/* + Add Answers Button */}
                  <button
                    type="button"
                    onClick={() => handleAddChoice(q.id)}
                    style={{
                      marginTop: '4px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1.5px dashed #cbd5e1',
                      backgroundColor: '#ffffff',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    + Add answers
                  </button>
                </div>

                {/* Bottom Row Settings: Randomize, Estimation Time, Mark Point */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '16px',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  {/* Randomize Order */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                      Randomize Order
                    </label>
                    <select
                      value={q.randomizeOrder ? 'random' : 'current'}
                      onChange={(e) => handleUpdateQuestion(q.id, { randomizeOrder: e.target.value === 'random' })}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="current">Keep choices in current order</option>
                      <option value="random">Randomize choices for each player</option>
                    </select>
                  </div>

                  {/* Estimation Time & Point */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                        Estimation time
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={q.estimationTimeMins}
                          onChange={(e) => handleUpdateQuestion(q.id, { estimationTimeMins: parseInt(e.target.value) || 1 })}
                          style={{
                            width: '54px',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '13px',
                            fontWeight: 700,
                            textAlign: 'center',
                            outline: 'none'
                          }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Mins ⏱️</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                        Mark as point
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={q.points}
                          onChange={(e) => handleUpdateQuestion(q.id, { points: parseInt(e.target.value) || 1 })}
                          style={{
                            width: '54px',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '13px',
                            fontWeight: 700,
                            textAlign: 'center',
                            outline: 'none'
                          }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Points 🔸</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}

            {/* Bottom Add Question Button */}
            <button
              onClick={handleAddQuestion}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '2px dashed #94a3b8',
                backgroundColor: '#ffffff',
                color: '#2a1a6b',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <span>+ Tambah Soal Berikutnya</span>
            </button>
          </div>
        </main>
      </div>

      {/* MODAL: QUIZ SETTINGS ⚙️ */}
      {isSettingsOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px solid #000',
            boxShadow: '8px 8px 0px #000',
            maxWidth: '560px',
            width: '100%',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>⚙️ Pengaturan Kuis</h3>
              <button onClick={() => setIsSettingsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '2px solid #000', outline: 'none', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>Kategori / Mata Pelajaran</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '2px solid #000', backgroundColor: '#fff', fontSize: '13px', fontWeight: 600 }}
                  >
                    <option value="UI/UX">UI/UX & Desain</option>
                    <option value="Kalkulus">Kalkulus</option>
                    <option value="Geometri">Geometri</option>
                    <option value="Trigonometri">Trigonometri</option>
                    <option value="Statistika">Statistika</option>
                    <option value="Aljabar">Aljabar</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>Standar Kelulusan (%)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={passingScore}
                    onChange={(e) => setPassingScore(parseInt(e.target.value) || 70)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '2px solid #000', fontSize: '13px', fontWeight: 700 }}
                  />
                </div>
              </div>

              {/* Banner Color Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>Warna Banner Kartu</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {BANNER_COLORS.map(c => (
                    <div
                      key={c.value}
                      onClick={() => setBannerColor(c.value)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: c.value,
                        border: bannerColor === c.value ? '3px solid #000' : '1px solid #ccc',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: c.text
                      }}
                    >
                      {bannerColor === c.value ? '✓' : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsSettingsOpen(false)}
                style={{ padding: '10px 20px', backgroundColor: '#2a1a6b', color: '#fff', border: '2px solid #000', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', boxShadow: '2px 2px 0px #000' }}
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RESULT SCREEN CONFIGURATION */}
      {isResultScreenOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px solid #000',
            boxShadow: '8px 8px 0px #000',
            maxWidth: '540px',
            width: '100%',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>🖼️ Result Screen Settings</h3>
              <button onClick={() => setIsResultScreenOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>🎉 Pesan Saat Lulus (Passed Message)</label>
                <textarea
                  rows={2}
                  value={resultPassedMsg}
                  onChange={(e) => setResultPassedMsg(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '2px solid #000', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>💡 Pesan Saat Belum Lulus (Failed Message)</label>
                <textarea
                  rows={2}
                  value={resultFailedMsg}
                  onChange={(e) => setResultFailedMsg(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '2px solid #000', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsResultScreenOpen(false)}
                style={{ padding: '10px 20px', backgroundColor: '#2a1a6b', color: '#fff', border: '2px solid #000', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', boxShadow: '2px 2px 0px #000' }}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INTERACTIVE PREVIEW MODE */}
      {isPreviewOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '3px solid #000',
            boxShadow: '10px 10px 0px #000',
            maxWidth: '720px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Preview Header */}
            <div style={{ padding: '16px 20px', borderBottom: '2px solid #000', backgroundColor: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.05em' }}>PREVIEW MODE</span>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#111' }}>{title}</h3>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} style={{ border: '2px solid #000', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            {/* Preview Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {!previewSubmitted ? (
                questions.map((q, idx) => (
                  <div key={q.id} style={{ border: '2px solid #000', borderRadius: '12px', padding: '16px 20px', backgroundColor: '#fff', boxShadow: '4px 4px 0px #f3f4f6' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#111', marginBottom: '12px' }}>
                      {idx + 1}. {q.questionText}
                    </div>
                    {q.image && <img src={q.image} alt="diagram" style={{ maxWidth: '100%', height: '140px', objectFit: 'contain', marginBottom: '12px', borderRadius: '6px' }} />}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.choices.map((c, cIdx) => (
                        <label
                          key={c.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: previewAnswers[q.id] === c.id ? '2px solid #2a1a6b' : '1px solid #e5e7eb',
                            backgroundColor: previewAnswers[q.id] === c.id ? '#f3e8ff' : '#fafafa',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: previewAnswers[q.id] === c.id ? 700 : 500
                          }}
                        >
                          <input
                            type="radio"
                            name={`preview-${q.id}`}
                            checked={previewAnswers[q.id] === c.id}
                            onChange={() => setPreviewAnswers(prev => ({ ...prev, [q.id]: c.id }))}
                            style={{ accentColor: '#2a1a6b' }}
                          />
                          <span>{String.fromCharCode(65 + cIdx)}. {c.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                /* Result Screen in Preview */
                <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                  {(() => {
                    let correctCount = 0;
                    questions.forEach(q => {
                      const correctChoice = q.choices.find(c => c.isCorrect);
                      if (correctChoice && previewAnswers[q.id] === correctChoice.id) {
                        correctCount++;
                      }
                    });
                    const scorePct = Math.round((correctCount / questions.length) * 100);
                    const isPassed = scorePct >= passingScore;

                    return (
                      <div>
                        <div style={{ fontSize: '64px', marginBottom: '12px' }}>{isPassed ? '🏆' : '📚'}</div>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0' }}>
                          {isPassed ? 'Selamat!' : 'Perlu Evaluasi!'}
                        </h2>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: isPassed ? '#16a34a' : '#dc2626', marginBottom: '16px' }}>
                          {scorePct}% Score
                        </div>
                        <p style={{ fontSize: '14px', color: '#4b5563', maxWidth: '400px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
                          {isPassed ? resultPassedMsg : resultFailedMsg}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                          <button
                            onClick={() => { setPreviewSubmitted(false); setPreviewAnswers({}); }}
                            style={{ padding: '10px 20px', backgroundColor: '#2a1a6b', color: '#fff', border: '2px solid #000', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', boxShadow: '3px 3px 0px #000' }}
                          >
                            Coba Ulang Preview
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Preview Footer */}
            {!previewSubmitted && (
              <div style={{ padding: '16px 24px', borderTop: '2px solid #000', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>
                  Terjawab: {Object.keys(previewAnswers).length} dari {questions.length} soal
                </span>
                <button
                  onClick={() => setPreviewSubmitted(true)}
                  style={{ padding: '10px 24px', backgroundColor: '#2a1a6b', color: '#fff', border: '2px solid #000', borderRadius: '8px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '3px 3px 0px #000' }}
                >
                  Submit & Lihat Hasil ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
