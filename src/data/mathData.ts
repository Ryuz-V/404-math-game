export interface MathTopic {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  summary: string;
  keyFormulas: { name: string; formula: string; desc: string }[];
  example: {
    question: string;
    steps: string[];
    answer: string;
  };
}

export interface Question {
  id: number;
  topicId: string;
  topicTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const MATERI_KELAS_12: MathTopic[] = [
  {
    id: 'dimensi-tiga',
    title: 'Dimensi Tiga (Geometri Ruang)',
    category: 'Geometri',
    icon: '📐',
    color: '#ffdc00',
    summary: 'Mempelajari kedudukan titik, garis, dan bidang dalam bangun ruang tiga dimensi, serta perhitungan jarak dan besar sudut.',
    keyFormulas: [
      {
        name: 'Diagonal Sisi Kubus',
        formula: 'd_s = s√2',
        desc: 'Jarak antara dua sudut yang berhadapan pada satu bidang sisi kubus dengan rusuk s.'
      },
      {
        name: 'Diagonal Ruang Kubus',
        formula: 'd_r = s√3',
        desc: 'Jarak antara dua titik sudut terjauh yang melintasi bagian dalam kubus.'
      },
      {
        name: 'Jarak Titik ke Titik Tengah Bidang Berhadapan',
        formula: 'r = ½ s√6',
        desc: 'Jarak titik sudut ke garis atau titik pusat bidang alas/atas pada posisi ortogonal.'
      },
      {
        name: 'Teorema Proyeksi & Pythagoras Ruang',
        formula: 'c² = a² + b²',
        desc: 'Gunakan segitiga siku-siku penolong untuk mencari jarak terpendek titik ke garis.'
      }
    ],
    example: {
      question: 'Diketahui kubus ABCD.EFGH dengan panjang rusuk 6 cm. Tentukan jarak titik A ke titik G (diagonal ruang)!',
      steps: [
        'Diagonal bidang AC = √(AB² + BC²) = √(6² + 6²) = 6√2 cm.',
        'Segitiga ACG adalah segitiga siku-siku di C dengan alas AC = 6√2 cm dan tinggi CG = 6 cm.',
        'Panjang diagonal ruang AG = √(AC² + CG²) = √((6√2)² + 6²) = √(72 + 36) = √108 = 6√3 cm.'
      ],
      answer: '6√3 cm'
    }
  },
  {
    id: 'statistika',
    title: 'Statistika Data Berkelompok',
    category: 'Statistika',
    icon: '📊',
    color: '#82fed6',
    summary: 'Pengolahan dan interpretasi data frekuensi berkelompok: mean (rata-rata), median, modus, kuartil, desil, dan simpangan baku.',
    keyFormulas: [
      {
        name: 'Mean (Rata-rata Hitung)',
        formula: 'x̄ = Σ(fi · xi) / Σfi',
        desc: 'fi = frekuensi kelas ke-i, xi = nilai tengah kelas ke-i.'
      },
      {
        name: 'Modus Data Kelompok',
        formula: 'Mo = Tb + (d₁ / (d₁ + d₂)) · p',
        desc: 'Tb = tepi bawah kelas modus, d₁ = selisih frekuensi dengan kelas sebelumnya, d₂ = selisih dengan kelas sesudahnya, p = panjang kelas.'
      },
      {
        name: 'Median Data Kelompok',
        formula: 'Me = Tb + ((½N - Fk) / f_me) · p',
        desc: 'N = total frekuensi, Fk = frekuensi kumulatif sebelum kelas median, f_me = frekuensi kelas median.'
      },
      {
        name: 'Simpangan Baku (Deviasi Standar)',
        formula: 'S = √( Σ fi(xi - x̄)² / N )',
        desc: 'Ukuran persebaran data terhadap nilai rata-ratanya.'
      }
    ],
    example: {
      question: 'Tentukan modus jika kelas modus memiliki Tb = 49.5, d₁ = 4, d₂ = 2, dan panjang kelas p = 6!',
      steps: [
        'Gunakan rumus Mo = Tb + [d₁ / (d₁ + d₂)] · p',
        'Mo = 49.5 + [4 / (4 + 2)] · 6',
        'Mo = 49.5 + [4 / 6] · 6 = 49.5 + 4 = 53.5'
      ],
      answer: '53.5'
    }
  },
  {
    id: 'kaidah-pencacahan',
    title: 'Kaidah Pencacahan & Peluang',
    category: 'Kombinatorika',
    icon: '🎲',
    color: '#ffb17a',
    summary: 'Aturan perkalian, aturan penjumlahan, permutasi unsur berbeda/sama/siklis, kombinasi, dan peluang kejadian bersyarat.',
    keyFormulas: [
      {
        name: 'Permutasi (Urutan Diperhatikan)',
        formula: 'nPr = n! / (n - r)!',
        desc: 'Menyusun r objek dari n objek yang tersedia (contoh: nomor antrian, juara 1-2-3).'
      },
      {
        name: 'Kombinasi (Urutan Tidak Diperhatikan)',
        formula: 'nCr = n! / (r! · (n - r)!)',
        desc: 'Memilih r objek dari n objek tanpa peduli urutan (contoh: memilih tim, jabat tangan).'
      },
      {
        name: 'Permutasi Siklis (Melingkar)',
        formula: 'P_siklis = (n - 1)!',
        desc: 'Banyak cara susunan melingkar untuk n objek.'
      },
      {
        name: 'Peluang Komplemen Kejadian',
        formula: 'P(Aᶜ) = 1 - P(A)',
        desc: 'Peluang suatu kejadian TIDAK terjadi.'
      }
    ],
    example: {
      question: 'Dari 8 orang calon pengurus, akan dipilih 3 orang sebagai delegasi. Berapa banyak cara pemilihan tersebut?',
      steps: [
        'Karena posisi dalam delegasi tidak berjenjang (urutan tidak penting), gunakan Kombinasi ₈C₃.',
        '₈C₃ = 8! / (3! · (8 - 3)!) = (8 · 7 · 6) / (3 · 2 · 1)',
        '₈C₃ = 336 / 6 = 56 cara.'
      ],
      answer: '56 cara'
    }
  },
  {
    id: 'kalkulus-lanjut',
    title: 'Limit, Turunan & Integral',
    category: 'Kalkulus',
    icon: '📈',
    color: '#00d0ff',
    summary: 'Limit fungsi aljabar & trigonometri, aturan rantai turunan, aplikasi gradien garis singgung, dan integral tentu.',
    keyFormulas: [
      {
        name: 'Turunan Fungsi Aljabar',
        formula: 'f(x) = axⁿ → f\'(x) = a·n·xⁿ⁻¹',
        desc: 'Aturan pangkat dasar untuk turunan fungsi polinomial.'
      },
      {
        name: 'Limit Trigonometri Dasar',
        formula: 'lim(x→0) [sin(ax) / bx] = a/b',
        desc: 'Berlaku juga untuk tan(ax)/bx dan ax/sin(bx).'
      },
      {
        name: 'Gradien Garis Singgung Kurva',
        formula: 'm = f\'(x₁)',
        desc: 'Gradien garis singgung kurva y = f(x) pada titik dengan absis x₁.'
      },
      {
        name: 'Integral Tentu',
        formula: '∫ [a sampai b] f(x) dx = F(b) - F(a)',
        desc: 'Teorema Fundamental Kalkulus untuk menghitung luas daerah di bawah kurva.'
      }
    ],
    example: {
      question: 'Tentukan gradien garis singgung kurva y = 2x³ - 5x + 4 pada titik dengan absis x = 2!',
      steps: [
        'Cari turunan pertama f\'(x): f\'(x) = d/dx (2x³ - 5x + 4) = 6x² - 5.',
        'Substitusikan x = 2 ke dalam turunan pertama: m = f\'(2) = 6(2)² - 5.',
        'm = 6(4) - 5 = 24 - 5 = 19.'
      ],
      answer: '19'
    }
  }
];

export const MATH_QUESTIONS: Question[] = [
  {
    id: 1,
    topicId: 'dimensi-tiga',
    topicTitle: 'Dimensi Tiga',
    question: 'Kubus ABCD.EFGH memiliki panjang rusuk 8 cm. Berapakah panjang diagonal ruang AG?',
    options: ['8√2 cm', '8√3 cm', '16 cm', '4√6 cm'],
    correctIndex: 1,
    explanation: 'Rumus diagonal ruang kubus adalah d = s√3. Dengan s = 8 cm, maka AG = 8√3 cm.'
  },
  {
    id: 2,
    topicId: 'dimensi-tiga',
    topicTitle: 'Dimensi Tiga',
    question: 'Pada kubus ABCD.EFGH dengan rusuk 6 cm, titik P berada di tengah rusuk CG. Jarak titik A ke titik P adalah...',
    options: ['9 cm', '3√5 cm', '6√2 cm', '3√6 cm'],
    correctIndex: 0,
    explanation: 'AC = 6√2 cm. Jarak AP = √(AC² + CP²) = √((6√2)² + 3²) = √(72 + 9) = √81 = 9 cm.'
  },
  {
    id: 3,
    topicId: 'dimensi-tiga',
    topicTitle: 'Dimensi Tiga',
    question: 'Besar sudut antara garis diagonal bidang AF dan diagonal bidang AC pada kubus ABCD.EFGH adalah...',
    options: ['30°', '45°', '60°', '90°'],
    correctIndex: 2,
    explanation: 'Hubungkan titik F ke C. Segitiga AFC adalah segitiga sama sisi karena AF = FC = AC = s√2. Maka sudutnya 60°.'
  },
  {
    id: 4,
    topicId: 'dimensi-tiga',
    topicTitle: 'Dimensi Tiga',
    question: 'Panjang rusuk kubus ABCD.EFGH adalah 10 cm. Jarak antara bidang ABCD dan bidang EFGH adalah...',
    options: ['5 cm', '10 cm', '10√2 cm', '10√3 cm'],
    correctIndex: 1,
    explanation: 'Jarak antara dua bidang sisi kubus yang sejajar sama dengan panjang rusuk tegaknya, yaitu 10 cm.'
  },
  {
    id: 5,
    topicId: 'statistika',
    topicTitle: 'Statistika',
    question: 'Rata-rata nilai matematika 39 siswa adalah 70. Jika nilai Ani digabungkan, rata-ratanya menjadi 70.5. Berapa nilai Ani?',
    options: ['85', '88', '90', '92'],
    correctIndex: 2,
    explanation: 'Total nilai awal = 39 × 70 = 2730. Total setelah Ani = 40 × 70.5 = 2820. Nilai Ani = 2820 - 2730 = 90.'
  },
  {
    id: 6,
    topicId: 'statistika',
    topicTitle: 'Statistika',
    question: 'Diketahui data tunggal: 3, 5, 7, 7, 8, 9, 10. Berapakah kuartil bawah (Q₁) dari data tersebut?',
    options: ['3', '5', '7', '8'],
    correctIndex: 1,
    explanation: 'Data terurut ada n=7. Median (Q₂) = 7. Bagian bawah adalah 3, 5, 7 sehingga nilai tengahnya Q₁ = 5.'
  },
  {
    id: 7,
    topicId: 'statistika',
    topicTitle: 'Statistika',
    question: 'Simpangan baku dari data: 4, 6, 8, 10 adalah...',
    options: ['√5', '2√2', '√6', '5'],
    correctIndex: 0,
    explanation: 'Rata-rata x̄ = (4+6+8+10)/4 = 7. Ragam = [(-3)² + (-1)² + 1² + 3²]/4 = (9+1+1+9)/4 = 20/4 = 5. Simpangan baku S = √5.'
  },
  {
    id: 8,
    topicId: 'statistika',
    topicTitle: 'Statistika',
    question: 'Jika panjang kelas p = 5, Tb = 20.5, d₁ = 3, dan d₂ = 2, berapakah nilai Modusnya?',
    options: ['22.5', '23.5', '24.5', '25.0'],
    correctIndex: 1,
    explanation: 'Mo = Tb + (d₁ / (d₁ + d₂)) · p = 20.5 + (3 / 5) · 5 = 20.5 + 3 = 23.5.'
  },
  {
    id: 9,
    topicId: 'kaidah-pencacahan',
    topicTitle: 'Pencacahan & Peluang',
    question: 'Berapa banyak susunan 3 huruf berbeda yang dapat dibentuk dari kata "MATEMATIKA"? (huruf unik: M, A, T, E, I, K)',
    options: ['60', '120', '216', '720'],
    correctIndex: 1,
    explanation: 'Huruf unik yang tersedia ada 6 (M, A, T, E, I, K). Banyak susunan 3 huruf berbeda = ₆P₃ = 6 × 5 × 4 = 120.'
  },
  {
    id: 10,
    topicId: 'kaidah-pencacahan',
    topicTitle: 'Pencacahan & Peluang',
    question: 'Banyak cara 6 orang duduk melingkar mengelilingi meja bundar adalah...',
    options: ['720 cara', '120 cara', '24 cara', '60 cara'],
    correctIndex: 1,
    explanation: 'Permutasi siklis = (n - 1)! = (6 - 1)! = 5! = 5 × 4 × 3 × 2 × 1 = 120 cara.'
  },
  {
    id: 11,
    topicId: 'kaidah-pencacahan',
    topicTitle: 'Pencacahan & Peluang',
    question: 'Dua buah dadu dilempar bersamaan sekali. Peluang munculnya jumlah kedua mata dadu sama dengan 8 adalah...',
    options: ['4/36', '5/36', '6/36', '7/36'],
    correctIndex: 1,
    explanation: 'Pasangan jumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) -> ada 5 kejadian dari total 36 ruang sampel. Peluang = 5/36.'
  },
  {
    id: 12,
    topicId: 'kaidah-pencacahan',
    topicTitle: 'Pencacahan & Peluang',
    question: 'Nilai dari ₇C₂ (Kombinasi 2 dari 7) adalah...',
    options: ['14', '21', '42', '35'],
    correctIndex: 1,
    explanation: '₇C₂ = (7 × 6) / (2 × 1) = 42 / 2 = 21.'
  },
  {
    id: 13,
    topicId: 'kalkulus-lanjut',
    topicTitle: 'Kalkulus',
    question: 'Nilai dari lim (x→0) [sin(6x) / (2x)] adalah...',
    options: ['0', '1', '3', '6'],
    correctIndex: 2,
    explanation: 'Berdasarkan sifat limit trigonometri lim (x→0) [sin(ax) / bx] = a/b = 6/2 = 3.'
  },
  {
    id: 14,
    topicId: 'kalkulus-lanjut',
    topicTitle: 'Kalkulus',
    question: 'Turunan pertama dari f(x) = 4x³ - 5x² + 7x - 9 pada x = 1 adalah...',
    options: ['9', '11', '13', '15'],
    correctIndex: 0,
    explanation: 'f\'(x) = 12x² - 10x + 7. Untuk x = 1: f\'(1) = 12(1)² - 10(1) + 7 = 12 - 10 + 7 = 9.'
  },
  {
    id: 15,
    topicId: 'kalkulus-lanjut',
    topicTitle: 'Kalkulus',
    question: 'Gradien garis singgung kurva y = x² - 4x + 3 di titik (3, 0) adalah...',
    options: ['-2', '0', '2', '4'],
    correctIndex: 2,
    explanation: 'y\' = 2x - 4. Pada absis x = 3, m = y\'(3) = 2(3) - 4 = 6 - 4 = 2.'
  },
  {
    id: 16,
    topicId: 'kalkulus-lanjut',
    topicTitle: 'Kalkulus',
    question: 'Nilai dari ∫ [0 sampai 2] (3x² + 2x) dx adalah...',
    options: ['10', '12', '14', '16'],
    correctIndex: 1,
    explanation: 'Anti turunan F(x) = x³ + x². F(2) - F(0) = (2³ + 2²) - 0 = (8 + 4) = 12.'
  }
];
