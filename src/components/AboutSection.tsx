"use client";

interface AboutSectionProps {
  onStartMenu: () => void;
  onStartMateri: () => void;
}

export default function AboutSection({ onStartMenu, onStartMateri }: AboutSectionProps) {
  return (
    <div className="about-container">
      <div className="about-header">
        <div className="game-badge">⚡ Tentang Math101</div>
        <h1 className="about-title">Platform Belajar & Game Matematika Interaktif</h1>
        <p className="about-subtitle">
          Math101 dirancang untuk mengubah paradigma belajar matematika menjadi pengalaman yang kompetitif, menyenangkan, dan mudah dipahami oleh siswa SMA Kelas 12.
        </p>
      </div>

      <div className="about-grid">
        {/* Card 1: Visi & Misi */}
        <div className="about-card card-yellow">
          <div className="about-card-icon">🎯</div>
          <h3>Misi Kami</h3>
          <p>
            Membantu siswa memahami konsep inti matematika secara mendalam lewat kombinasi rangkuman visual, contoh soal terstruktur, serta gamifikasi kompetisi real-time.
          </p>
        </div>

        {/* Card 2: Dual Split Screen Engine */}
        <div className="about-card card-mint">
          <div className="about-card-icon">⚔️</div>
          <h3>1 vs 1 Local Battle Engine</h3>
          <p>
            Fitur duel split-screen pertama yang memungkinkan 2 pemain bertanding di 1 laptop/komputer dengan keyboard independen tanpa perlu install aplikasi tambahan.
          </p>
        </div>

        {/* Card 3: Kurikulum Terpadu */}
        <div className="about-card card-coral">
          <div className="about-card-icon">📐</div>
          <h3>Fokus Kurikulum Kelas 12</h3>
          <p>
            Mencakup materi esensial ujian sekolah dan UTBK/SNBT: Geometri Dimensi Tiga, Statistika Data Kelompok, Kaidah Pencacahan & Peluang, serta Kalkulus Diferensial/Integral.
          </p>
        </div>
      </div>

      {/* Keyboard Controls Guide */}
      <div className="controls-guide-card">
        <h2>🎮 Panduan Kontrol Tombol Keyboard</h2>
        <p>Gunakan tombol keyboard berikut saat memainkan mode permainan:</p>

        <div className="controls-guide-grid">
          <div className="control-box p1-control-box">
            <h4>🎮 Player 1 (Sisi Kiri)</h4>
            <div className="keys-display">
              <div className="key-item"><kbd>W</kbd> <span>Pilihan Jawaban 1 (Atas)</span></div>
              <div className="key-item"><kbd>A</kbd> <span>Pilihan Jawaban 2 (Kiri)</span></div>
              <div className="key-item"><kbd>S</kbd> <span>Pilihan Jawaban 3 (Bawah)</span></div>
              <div className="key-item"><kbd>D</kbd> <span>Pilihan Jawaban 4 (Kanan)</span></div>
            </div>
          </div>

          <div className="control-box p2-control-box">
            <h4>🕹️ Player 2 (Sisi Kanan)</h4>
            <div className="keys-display">
              <div className="key-item"><kbd>↑</kbd> <span>Pilihan Jawaban 1 (Atas)</span></div>
              <div className="key-item"><kbd>←</kbd> <span>Pilihan Jawaban 2 (Kiri)</span></div>
              <div className="key-item"><kbd>↓</kbd> <span>Pilihan Jawaban 3 (Bawah)</span></div>
              <div className="key-item"><kbd>→</kbd> <span>Pilihan Jawaban 4 (Kanan)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ & CTA */}
      <div className="about-faq-box">
        <h3>Pertanyaan yang Sering Diajukan (FAQ)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <strong>Q: Apakah game 1 vs 1 membutuhkan koneksi internet ganda?</strong>
            <p>Tidak, mode 1 vs 1 berjalan secara lokal di 1 layar menggunakan 1 keyboard bersama teman di sampingmu.</p>
          </div>
          <div className="faq-item">
            <strong>Q: Apakah rumus dan materi sudah sesuai kurikulum terbaru?</strong>
            <p>Ya, seluruh rumus dan contoh soal disesuaikan dengan silabus Matematika Wajib & Minat SMA Kelas 12.</p>
          </div>
        </div>

        <div className="about-actions-bottom">
          <button className="btn-about-action btn-menu" onClick={onStartMenu}>
            🚀 Buka Menu Game
          </button>
          <button className="btn-about-action btn-materi" onClick={onStartMateri}>
            📚 Pelajari Materi Kelas 12
          </button>
        </div>
      </div>
    </div>
  );
}
