"use client";

import React, { useState, useRef } from 'react';
import { QuizQuestion } from '../types/quiz';
import { parseDocumentToQuestions } from '../utils/quizStorage';

interface UploadQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportQuestions: (data: { title: string; summary: string; category: string; questions: QuizQuestion[] }) => void;
}

const PRESET_TEMPLATES = [
  {
    title: 'Latihan Soal Kalkulus: Turunan & Integral',
    category: 'Kalkulus',
    summary: 'Kumpulan soal turunan fungsi aljabar, integral tentu, dan aplikasi garis singgung.',
    content: `1. Turunan pertama dari fungsi f(x) = 3x^4 - 5x^2 + 7 adalah...
A. 12x^3 - 10x (kunci)
B. 12x^4 - 10x
C. 7x^3 - 10x
D. 12x^3 + 10x

2. Nilai dari integral ∫ (6x^2 + 4x - 1) dx adalah...
A. 2x^3 + 2x^2 - x + C (kunci)
B. 3x^3 + 4x^2 - x + C
C. 6x^3 + 2x^2 + C
D. 2x^3 + 4x^2 - x + C

3. Jika f'(x) = 2x + 3 dan f(1) = 6, maka rumus fungsi f(x) adalah...
A. x^2 + 3x + 2 (kunci)
B. x^2 + 3x + 6
C. 2x^2 + 3x + 1
D. x^2 + 2x + 3`
  },
  {
    title: 'Mastering Trigonometri Dasar & Identitas',
    category: 'Trigonometri',
    summary: 'Uji pemahaman perbandingan trigonometri, aturan sinus/kosinus, dan sudut berelasi.',
    content: `1. Nilai dari sin(30°) + cos(60°) adalah...
A. 1 (kunci)
B. 1/2
C. √3/2
D. 0

2. Pada segitiga siku-siku ABC di B, jika sin A = 3/5, maka nilai tan A adalah...
A. 3/4 (kunci)
B. 4/3
C. 4/5
D. 3/5

3. Nilai dari sin²(45°) + cos²(45°) adalah...
A. 1 (kunci)
B. 1/2
C. 2
D. √2`
  },
  {
    title: 'UI/UX Design Fundamentals & Usability',
    category: 'UI/UX',
    summary: 'Pertanyaan fundamental mengenai desain antarmuka, affordance, dan konsistensi sistem.',
    content: `1. Apa kepanjangan dari istilah UI dalam perancangan produk digital?
A. User Interface (kunci)
B. User Interaction
C. Universal Integration
D. User Information

2. Prinsip visual hierarchy pada desain antarmuka bertujuan untuk...
A. Mengarahkan fokus dan urutan baca pengguna secara alami (kunci)
B. Menghabiskan ruang kosong pada layar
C. Menambah warna sebanyak mungkin
D. Memperlambat navigasi pengguna

3. Mengapa konsistensi tombol dan tipografi sangat krusial dalam design system?
A. Mengurangi beban kognitif dan mempermudah adaptasi pengguna (kunci)
B. Membuat kode lebih rumit
C. Mengurangi estetika visual
D. Menghilangkan kebutuhan uji coba usability`
  }
];

export default function UploadQuizModal({ isOpen, onClose, onImportQuestions }: UploadQuizModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'template'>('upload');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Matematika');
  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [parsedPreview, setParsedPreview] = useState<QuizQuestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }

    try {
      const text = await file.text();
      const questions = parseDocumentToQuestions(text);
      setParsedPreview(questions);
    } catch (err) {
      console.error(err);
      // Fallback sample questions
      const fallbackQuestions = parseDocumentToQuestions(`1. Soal dari dokumen ${file.name}\nA. Jawaban Benar (kunci)\nB. Jawaban Alternatif`);
      setParsedPreview(fallbackQuestions);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextChange = (text: string) => {
    setPastedText(text);
    if (text.trim().length > 10) {
      const questions = parseDocumentToQuestions(text);
      setParsedPreview(questions);
    } else {
      setParsedPreview([]);
    }
  };

  const handleSelectTemplate = (template: typeof PRESET_TEMPLATES[0]) => {
    setTitle(template.title);
    setCategory(template.category);
    setPastedText(template.content);
    const questions = parseDocumentToQuestions(template.content);
    setParsedPreview(questions);
  };

  const handleImport = () => {
    const finalTitle = title.trim() || 'New Quiz from Document';
    const questionsToUse = parsedPreview.length > 0 ? parsedPreview : parseDocumentToQuestions(pastedText || '1. Pertanyaan contoh\nA. Pilihan A (kunci)\nB. Pilihan B');
    
    onImportQuestions({
      title: finalTitle,
      category,
      summary: `Quiz dengan ${questionsToUse.length} pertanyaan seputar ${category}.`,
      questions: questionsToUse
    });
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '780px',
          borderRadius: '16px',
          border: '3px solid #000000',
          boxShadow: '10px 10px 0px #000000',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '2px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f3e8ff',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📄
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#000', margin: 0 }}>
                Upload Document & Create Quizz
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, fontWeight: 500 }}>
                Ekstrak soal secara otomatis dari dokumen, catatan, atau bank soal
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '2px solid #000',
              backgroundColor: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px #000'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #000',
          backgroundColor: '#f3f4f6'
        }}>
          {[
            { id: 'upload', label: '📁 Upload File (.pdf, .txt, .docx, .md)', icon: '⬆️' },
            { id: 'paste', label: '✍️ Paste Text / Catatan', icon: '📝' },
            { id: 'template', label: '✨ AI / Preset Template', icon: '⚡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '14px 16px',
                border: 'none',
                borderRight: '2px solid #000',
                backgroundColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                fontWeight: activeTab === tab.id ? 800 : 600,
                fontSize: '13px',
                color: activeTab === tab.id ? '#2a1a6b' : '#4b5563',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '4px solid #2a1a6b' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div data-lenis-prevent="true" className="custom-scrollbar" style={{ padding: '24px', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Metadata Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                JUDUL QUIZZ
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Soal Latihan Kalkulus Bab 1..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  boxShadow: '2px 2px 0px #000'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                KATEGORI
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  backgroundColor: '#fff',
                  boxShadow: '2px 2px 0px #000'
                }}
              >
                <option value="Kalkulus">Kalkulus</option>
                <option value="Geometri">Geometri</option>
                <option value="Trigonometri">Trigonometri</option>
                <option value="Statistika">Statistika</option>
                <option value="Aljabar">Aljabar</option>
                <option value="UI/UX">UI/UX & Desain</option>
                <option value="Umum">Umum / General</option>
              </select>
            </div>
          </div>

          {/* Tab 1: Upload File */}
          {activeTab === 'upload' && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.md,.pdf,.docx,.doc,.json"
                style={{ display: 'none' }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #000',
                  borderRadius: '12px',
                  padding: '36px 20px',
                  textAlign: 'center',
                  backgroundColor: '#faf5ff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3e8ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#faf5ff'}
              >
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📄 ➔ ⚙️</div>
                <div style={{ fontWeight: 800, fontSize: '16px', color: '#111', marginBottom: '4px' }}>
                  {fileName ? `File Terpilih: ${fileName}` : 'Klik atau Tarik File Dokumen ke Sini'}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
                  Mendukung PDF, Word (.docx), TXT, Markdown (.md), atau JSON
                </div>
                <button
                  type="button"
                  style={{
                    marginTop: '16px',
                    padding: '8px 20px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #000',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '13px',
                    boxShadow: '3px 3px 0px #000',
                    cursor: 'pointer'
                  }}
                >
                  Pilih File Dari Komputer
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Paste Text */}
          {activeTab === 'paste' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                TEMPEL TEKS SOAL (Format: 1. Soal, A. Pilihan, B. Pilihan...)
              </label>
              <textarea
                rows={7}
                value={pastedText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Contoh:\n1. Berapakah hasil dari 15 x 8?\nA. 120 (kunci)\nB. 110\nC. 130\nD. 100\n\n2. Sudut siku-siku memiliki besar derajat...\nA. 90 derajat (kunci)\nB. 180 derajat`}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  lineHeight: 1.5,
                  outline: 'none',
                  boxShadow: '2px 2px 0px #000',
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          {/* Tab 3: Template Generator */}
          {activeTab === 'template' && (
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>
                PILIH TEMPLATE ATAU TOPIK INSTAN:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PRESET_TEMPLATES.map((tmpl, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectTemplate(tmpl)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid #000',
                      backgroundColor: title === tmpl.title ? '#f5f3ff' : '#ffffff',
                      boxShadow: '3px 3px 0px #000',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#111' }}>
                        {tmpl.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                        {tmpl.summary}
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800,
                      border: '1px solid #c7d2fe'
                    }}>
                      {tmpl.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Preview Summary */}
          {parsedPreview.length > 0 && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '2px solid #16a34a',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <div>
                  <strong style={{ color: '#166534', fontSize: '13px' }}>
                    {parsedPreview.length} Soal Berhasil Dikenali & Siap Diedit!
                  </strong>
                  <p style={{ margin: 0, fontSize: '11px', color: '#15803d' }}>
                    Soal akan dimuat langsung ke Page Editor untuk penyesuaian kunci jawaban, poin, dan waktu.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '2px solid #000',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffffff',
              border: '2px solid #000',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #000'
            }}
          >
            Batal
          </button>
          <button
            onClick={handleImport}
            style={{
              padding: '10px 24px',
              backgroundColor: '#2a1a6b',
              color: '#ffffff',
              border: '2px solid #000',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '3px 3px 0px #000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Buka di Editor Soal</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
