export interface KeyFormula {
  name: string;
  formula: string;
  desc: string;
  note?: string;
}

export interface ExampleProblem {
  question: string;
  level?: 'Basic' | 'Intermediate' | 'Advanced';
  steps: string[];
  answer: string;
  tips?: string;
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MathTopic {
  id: string;
  grade: 10 | 11 | 12;
  title: string;
  category: 'Geometry' | 'Statistics' | 'Combinatorics & Probability' | 'Calculus' | 'Algebra & Matrices' | 'Sequences & Series' | 'Trigonometry' | 'Financial & Logic';
  icon: string;
  color: string;
  accentColor: string;
  readTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  detailedOverview: string;
  coreConcepts: {
    title: string;
    points: string[];
  }[];
  keyFormulas: KeyFormula[];
  examples: ExampleProblem[];
  quickQuiz: PracticeQuestion[];
  example?: {
    question: string;
    steps: string[];
    answer: string;
  };
}

export interface Question {
  id: number;
  grade: 10 | 11 | 12;
  topicId: string;
  topicTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// KELAS 10 (SMA / MA FASE E - KURIKULUM MERDEKA & K13)
// ============================================================================
export const MATERI_KELAS_10: MathTopic[] = [
  {
    id: 'grade-10-exponents',
    grade: 10,
    title: 'Eksponen & Logaritma',
    category: 'Algebra & Matrices',
    icon: '⚡',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '14 Mins',
    difficulty: 'Easy',
    summary: 'Sifat-sifat eksponen rasional, persamaan & pertidaksamaan eksponensial, sifat logaritma, dan aplikasi pertumbuhan/peluruhan.',
    detailedOverview: 'Eksponen dan logaritma merupakan operasi invers yang sangat mendasar dalam kurikulum Indonesia. Konsep ini digunakan luas dalam pemodelan peluruhan zat radioaktif, pertumbuhan bakteri, perhitungan bunga majemuk, serta skala desibel dan gempa bumi (Richter).',
    coreConcepts: [
      {
        title: '1. Sifat-Sifat Pangkat & Eksponen',
        points: [
          'Perkalian basis sama: aᵐ · aⁿ = aᵐ⁺ⁿ.',
          'Pembagian basis sama: aᵐ / aⁿ = aᵐ⁻ⁿ (dengan a ≠ 0).',
          'Pangkat dipangkatkan: (aᵐ)ⁿ = aᵐⁿ.',
          'Pangkat perkalian: (a · b)ⁿ = aⁿ · bⁿ.',
          'Pangkat negatif & pecahan: a⁻ⁿ = 1 / aⁿ dan a^(m/n) = ⁿ√(aᵐ).'
        ]
      },
      {
        title: '2. Definisi & Sifat Logaritma',
        points: [
          'Definisi dasar: ᵃlog b = c ⟺ aᶜ = b (syarat basis a > 0, a ≠ 1 dan numerus b > 0).',
          'Penjumlahan: ᵃlog x + ᵃlog y = ᵃlog(x · y).',
          'Pengurangan: ᵃlog x - ᵃlog y = ᵃlog(x / y).',
          'Pangkat numerus: ᵃlog(xⁿ) = n · ᵃlog x.',
          'Perubahan basis: ᵃlog b = (ᶜlog b) / (ᶜlog a) = 1 / (ᵇlog a).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Sifat Perkalian & Pembagian Eksponen',
        formula: 'aᵐ · aⁿ = aᵐ⁺ⁿ  |  aᵐ / aⁿ = aᵐ⁻ⁿ',
        desc: 'Sederhanakan eksponen dengan menjumlahkan/mengurangkan pangkat pada basis yang sama.'
      },
      {
        name: 'Definisi Logaritma',
        formula: 'ᵃlog b = c  ⟺  aᶜ = b',
        desc: 'Menghubungkan bentuk eksponen dan logaritma.'
      },
      {
        name: 'Sifat Logaritma Basis Berantai',
        formula: 'ᵃlog b · ᵇlog c = ᵃlog c',
        desc: 'Menyederhanakan perkalian antar-logaritma dengan basis berantai.'
      }
    ],
    examples: [
      {
        question: 'Tentukan himpunan penyelesaian dari persamaan eksponen 3^(2x - 1) = 81.',
        level: 'Basic',
        steps: [
          'Ubah ruas kanan ke basis 3: 81 = 3⁴.',
          'Samakan pangkat eksponen: 2x - 1 = 4.',
          'Selesaikan aljabar: 2x = 5 ⟹ x = 5/2 = 2.5.'
        ],
        answer: 'x = 5/2',
        tips: 'Selalu ubah kedua ruas persamaan ke bilangan berpangkat dengan basis yang sama.'
      }
    ],
    quickQuiz: [
      {
        question: 'Nilai dari ²log 48 - ²log 3 adalah...',
        options: ['4', '16', '3', '8'],
        correctIndex: 0,
        explanation: '²log (48 / 3) = ²log 16 = 4 (karena 2⁴ = 16).'
      }
    ]
  },
  {
    id: 'grade-10-quadratics',
    grade: 10,
    title: 'Persamaan & Fungsi Kuadrat',
    category: 'Algebra & Matrices',
    icon: '📈',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '15 Mins',
    difficulty: 'Easy',
    summary: 'Pemfaktoran, rumus abc kuadratik, diskriminan (D = b² - 4ac), titik puncak parabola, dan sifat akar-akar Vieta.',
    detailedOverview: 'Fungsi kuadrat berbentuk f(x) = ax² + bx + c dengan grafik berupa kurva parabola. Nilai a menentukan arah bukaan kurva (a > 0 terbuka ke atas, a < 0 terbuka ke bawah), sedangkan Diskriminan (D) menentukan jumlah titik potong sumbu-x.',
    coreConcepts: [
      {
        title: '1. Diskriminan & Jenis Akar',
        points: [
          'D = b² - 4ac.',
          'D > 0: Memiliki dua akar real berlainan (grafik memotong sumbu-x di 2 titik).',
          'D = 0: Memiliki akar real kembar (grafik menyinggung sumbu-x di 1 titik).',
          'D < 0: Tidak memiliki akar real / imajiner (grafik tidak memotong sumbu-x / definit).'
        ]
      },
      {
        title: '2. Titik Puncak Parabola & Rumus Vieta',
        points: [
          'Sumbu Simetri: x_p = -b / (2a).',
          'Nilai Optimum / Puncak: y_p = -D / (4a) = f(x_p).',
          'Jumlah Akar: x₁ + x₂ = -b / a.',
          'Hasil Kali Akar: x₁ · x₂ = c / a.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Rumus Kuadratik (Rumus ABC)',
        formula: 'x₁,₂ = [-b ± √(b² - 4ac)] / 2a',
        desc: 'Mencari akar-akar penyelesaian persamaan kuadrat apa pun.'
      },
      {
        name: 'Koordinat Titik Puncak Parabola',
        formula: 'P = (-b / 2a, -D / 4a)',
        desc: 'Titik balik maksimum atau minimum dari grafik fungsi kuadrat.'
      }
    ],
    examples: [
      {
        question: 'Tentukan titik balik maksimum/minimum dari fungsi kuadrat f(x) = x² - 6x + 5.',
        level: 'Basic',
        steps: [
          'Identifikasi nilai koefisien: a = 1, b = -6, c = 5.',
          'Cari sumbu simetri: x_p = -(-6) / (2 · 1) = 6 / 2 = 3.',
          'Substitusikan x_p ke f(x): y_p = (3)² - 6(3) + 5 = 9 - 18 + 5 = -4.',
          'Karena a = 1 > 0, kurva terbuka ke atas sehingga titik baliknya adalah titik minimum (3, -4).'
        ],
        answer: 'Titik Minimum (3, -4)',
        tips: 'Jika a positif kurva memiliki titik minimum; jika a negatif kurva memiliki titik maksimum.'
      }
    ],
    quickQuiz: [
      {
        question: 'Akar-akar dari persamaan x² - 5x + 6 = 0 adalah...',
        options: ['x = 2 atau x = 3', 'x = -2 atau x = -3', 'x = 1 atau x = 6', 'x = -1 atau x = -6'],
        correctIndex: 0,
        explanation: 'Faktorkan menjadi (x - 2)(x - 3) = 0 ⟹ x = 2 atau x = 3.'
      }
    ]
  },
  {
    id: 'grade-10-spltv',
    grade: 10,
    title: 'Sistem Persamaan Linear Tiga Variabel (SPLTV)',
    category: 'Algebra & Matrices',
    icon: '📐',
    color: '#ffb17a',
    accentColor: '#ea580c',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Metode eliminasi, substitusi, eliminasi-substitusi gabungan (campuran), dan pemodelan masalah kontekstual dunia nyata.',
    detailedOverview: 'SPLTV terdiri atas tiga persamaan linear dengan tiga variabel yang tidak diketahui (biasanya x, y, z). Penyelesaiannya merepresentasikan titik potong tiga bidang datar di ruang dimensi 3.',
    coreConcepts: [
      {
        title: '1. Metode Gabungan (Eliminasi-Substitusi)',
        points: [
          'Langkah 1: Pilih dua pasang persamaan untuk mengeliminasi salah satu variabel yang sama, menghasilkan SPLDV (2 variabel).',
          'Langkah 2: Selesaikan SPLDV tersebut untuk mendapatkan nilai dua variabel pertama.',
          'Langkah 3: Substitusikan kedua nilai variabel yang ditemukan ke salah satu persamaan awal untuk menemukan variabel ketiga.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Bentuk Umum SPLTV',
        formula: 'a₁x + b₁y + c₁z = d₁',
        desc: 'Format standar sistem tiga variabel linear.'
      }
    ],
    examples: [
      {
        question: 'Diketahui: x + y + z = 6, 2y + z = 7, dan z = 3. Tentukan nilai x.',
        level: 'Basic',
        steps: [
          'Dari persamaan ketiga, sudah diketahui z = 3.',
          'Substitusi z = 3 ke 2y + z = 7: 2y + 3 = 7 ⟹ 2y = 4 ⟹ y = 2.',
          'Substitusi y = 2 dan z = 3 ke x + y + z = 6: x + 2 + 3 = 6 ⟹ x + 5 = 6 ⟹ x = 1.'
        ],
        answer: 'x = 1',
        tips: 'Manfaatkan persamaan yang memiliki variabel paling sedikit terlebih dahulu.'
      }
    ],
    quickQuiz: [
      {
        question: 'Jika x + y = 5 dan x - y = 1, berapakah nilai x dan y?',
        options: ['x = 3, y = 2', 'x = 4, y = 1', 'x = 2, y = 3', 'x = 5, y = 0'],
        correctIndex: 0,
        explanation: 'Jumlahkan kedua persamaan: 2x = 6 ⟹ x = 3. Maka y = 5 - 3 = 2.'
      }
    ]
  },
  {
    id: 'grade-10-trigonometry',
    grade: 10,
    title: 'Trigonometri Dasar & Aturan Segitiga',
    category: 'Trigonometry',
    icon: '📐',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Perbandingan trigonometri siku-siku (Demi, Sami, Desa), sudut istimewa 0°-90°, sudut berelasi di 4 kuadran, Aturan Sinus & Cosinus.',
    detailedOverview: 'Trigonometri mempelajari hubungan antara besar sudut dan panjang sisi-sisi segitiga. Konsep ini adalah fondasi kalkulus, fisika gelombang, astronomi, dan navigasi arsitektur.',
    coreConcepts: [
      {
        title: '1. Perbandingan Sisi Siku-Siku',
        points: [
          'Sinus (sin θ) = Depan / Miring (De/Mi).',
          'Cosinus (cos θ) = Samping / Miring (Sa/Mi).',
          'Tangen (tan θ) = Depan / Samping (De/Sa) = sin θ / cos θ.',
          'Identitas Pythagoras: sin² θ + cos² θ = 1.'
        ]
      },
      {
        title: '2. Sudut Berelasi di 4 Kuadran',
        points: [
          'Kuadran I (0°-90°): Semua positif (All Positif).',
          'Kuadran II (90°-180°): Hanya Sinus & Cosecan yang positif (sin(180°-θ) = sin θ).',
          'Kuadran III (180°-270°): Hanya Tangen & Cotangen yang positif (tan(180°+θ) = tan θ).',
          'Kuadran IV (270°-360°): Hanya Cosinus & Secan yang positif (cos(360°-θ) = cos θ).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Aturan Sinus',
        formula: 'a / sin A = b / sin B = c / sin C',
        desc: 'Digunakan jika diketahui kombinasi sisi dan sudut di hadapannya.'
      },
      {
        name: 'Aturan Cosinus',
        formula: 'a² = b² + c² - 2bc · cos A',
        desc: 'Mencari panjang sisi ketiga jika diketahui 2 sisi dan 1 sudut apit.'
      },
      {
        name: 'Luas Segitiga Trigonometri',
        formula: 'Luas = 1/2 · a · b · sin C',
        desc: 'Menghitung luas segitiga sembarang dengan 2 sisi dan sudut apit.'
      }
    ],
    examples: [
      {
        question: 'Pada segitiga ABC, panjang b = 6 cm, c = 8 cm, dan sudut A = 60°. Tentukan panjang sisi a.',
        level: 'Intermediate',
        steps: [
          'Gunakan Aturan Cosinus: a² = b² + c² - 2bc cos A.',
          'a² = 6² + 8² - 2(6)(8) cos 60°.',
          'a² = 36 + 64 - 96(0.5) = 100 - 48 = 52.',
          'a = √52 = √(4 × 13) = 2√13 cm.'
        ],
        answer: 'a = 2√13 cm',
        tips: 'Ingat nilai sudut istimewa cos 60° = 1/2.'
      }
    ],
    quickQuiz: [
      {
        question: 'Pada segitiga siku-siku, panjang sisi depan = 3 dan sisi miring = 5. Berapakah nilai cos θ?',
        options: ['4/5', '3/5', '3/4', '5/4'],
        correctIndex: 0,
        explanation: 'Sisi samping = √(5² - 3²) = √16 = 4. Maka cos θ = Samping / Miring = 4/5.'
      }
    ]
  },
  {
    id: 'grade-10-sequences',
    grade: 10,
    title: 'Barisan & Deret: Aritmatika & Geometri',
    category: 'Sequences & Series',
    icon: '🔢',
    color: '#a855f7',
    accentColor: '#7e22ce',
    readTime: '15 Mins',
    difficulty: 'Easy',
    summary: 'Pola bilangan, rumus suku ke-n (Un) dan jumlah n suku pertama (Sn) barisan aritmatika & geometri, serta deret geometri tak hingga.',
    detailedOverview: 'Barisan aritmatika memiliki beda (b) yang konstan melalui penjumlahan, sedangkan barisan geometri memiliki rasio (r) yang konstan melalui perkalian. Materi ini sangat sering muncul pada tes UTBK Penalaran Matematika.',
    coreConcepts: [
      {
        title: '1. Barisan & Deret Aritmatika',
        points: [
          'Suku ke-n: Uₙ = a + (n - 1)b.',
          'Beda: b = Uₙ - Uₙ₋₁.',
          'Jumlah n suku: Sₙ = n/2 · (2a + (n - 1)b) = n/2 · (a + Uₙ).'
        ]
      },
      {
        title: '2. Barisan & Deret Geometri',
        points: [
          'Suku ke-n: Uₙ = a · rⁿ⁻¹.',
          'Rasio: r = Uₙ / Uₙ₋₁.',
          'Jumlah n suku: Sₙ = a(rⁿ - 1) / (r - 1) untuk r > 1.',
          'Deret Geometri Tak Hingga Konvergen (-1 < r < 1): S_∞ = a / (1 - r).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Suku ke-n Aritmatika & Geometri',
        formula: 'Uₙ = a + (n-1)b  |  Uₙ = a · rⁿ⁻¹',
        desc: 'Rumus mencari nilai suku pada indeks ke-n.'
      },
      {
        name: 'Deret Geometri Tak Hingga',
        formula: 'S_∞ = a / (1 - r)',
        desc: 'Menghitung jumlah tak terhingga jika nilai mutlak rasio |r| < 1.'
      }
    ],
    examples: [
      {
        question: 'Sebuah bola dijatuhkan dari ketinggian 12 meter dan memantul kembali dengan ketinggian 2/3 dari tinggi sebelumnya hingga berhenti. Tentukan total panjang lintasan bola.',
        level: 'Intermediate',
        steps: [
          'Bola turun pertama kali: h₀ = 12 m.',
          'Pantulan naik dan turun berulang dengan rasio r = 2/3.',
          'Gunakan rumus cepat pantulan bola: Panjang Lintasan = h₀ · (b + a) / (b - a) dimana r = a/b = 2/3.',
          'Lintasan = 12 · (3 + 2) / (3 - 2) = 12 · 5 / 1 = 60 meter.'
        ],
        answer: '60 meter',
        tips: 'Rumus cepat lintasan bola memantul: h · (penyebut + pembilang) / (penyebut - pembilang).'
      }
    ],
    quickQuiz: [
      {
        question: 'Jumlah deret geometri tak hingga 18 + 6 + 2 + ... adalah...',
        options: ['27', '24', '36', '54'],
        correctIndex: 0,
        explanation: 'a = 18, r = 6/18 = 1/3. S_∞ = 18 / (1 - 1/3) = 18 / (2/3) = 27.'
      }
    ]
  },
  {
    id: 'grade-10-vectors',
    grade: 10,
    title: 'Vektor pada Bidang & Ruang',
    category: 'Geometry',
    icon: '↗️',
    color: '#ec4899',
    accentColor: '#db2777',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Operasi vektor aljabar, panjang vektor, perkalian titik (dot product), sudut antara dua vektor, dan proyeksi vektor ortogonal.',
    detailedOverview: 'Vektor memiliki besar dan arah. Perkalian dot product menentukan apakah dua vektor saling tegak lurus (dot product = 0), sejajar, atau membentuk sudut lancip/tumpul.',
    coreConcepts: [
      {
        title: '1. Panjang Vektor & Operasi Komponen',
        points: [
          'Panjang vektor v = (x, y, z): |v| = √(x² + y² + z²).',
          'Vektor satuan: u = v / |v|.',
          'Penjumlahan & perkalian skalar dilakukan komponen per komponen.'
        ]
      },
      {
        title: '2. Dot Product & Sudut Dua Vektor',
        points: [
          'Dot product aljabar: u · v = u₁v₁ + u₂v₂ + u₃v₃.',
          'Dot product geometri: u · v = |u| |v| cos θ.',
          'Syarat tegak lurus (ortogonal): u · v = 0.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Kosinus Sudut Dua Vektor',
        formula: 'cos θ = (u · v) / (|u| · |v|)',
        desc: 'Mencari besar sudut antara vektor u dan v.'
      },
      {
        name: 'Proyeksi Skalar Ortogonal',
        formula: '|c| = (u · v) / |v|',
        desc: 'Panjang proyeksi vektor u pada vektor v.'
      }
    ],
    examples: [
      {
        question: 'Diketahui vektor u = (2, -1, 2) dan v = (4, 4, -2). Tentukan nilai cosinus sudut antara u dan v.',
        level: 'Intermediate',
        steps: [
          'Hitung u · v = (2)(4) + (-1)(4) + (2)(-2) = 8 - 4 - 4 = 0.',
          'Karena u · v = 0, maka cos θ = 0 ⟹ θ = 90° (saling tegak lurus).'
        ],
        answer: '0 (tegak lurus 90°)',
        tips: 'Jika dot product sama dengan nol, kedua vektor dipastikan saling tegak lurus.'
      }
    ],
    quickQuiz: [
      {
        question: 'Panjang dari vektor a = (3, 4) adalah...',
        options: ['5', '7', '25', '1'],
        correctIndex: 0,
        explanation: '|a| = √(3² + 4²) = √(9 + 16) = √25 = 5.'
      }
    ]
  },
  {
    id: 'grade-10-keuangan',
    grade: 10,
    title: 'Matematika Keuangan: Bunga & Anuitas',
    category: 'Financial & Logic',
    icon: '💰',
    color: '#10b981',
    accentColor: '#047857',
    readTime: '13 Mins',
    difficulty: 'Easy',
    summary: 'Bunga tunggal, bunga majemuk, diskonto, penyusutan aset, dan anuitas kredit / pinjaman bank.',
    detailedOverview: 'Matematika keuangan adalah bagian kurikulum Fase E & F yang membekali pemahaman literasi finansial. Menghitung akumulasi modal dengan bunga majemuk Mn = M0(1 + i)ⁿ dan cicilan anuitas periodik.',
    coreConcepts: [
      {
        title: '1. Bunga Tunggal vs Bunga Majemuk',
        points: [
          'Bunga Tunggal: B = M₀ · i · n (Bunga hanya dihitung dari modal awal).',
          'Modal Akhir Bunga Tunggal: Mₙ = M₀(1 + i · n).',
          'Modal Akhir Bunga Majemuk: Mₙ = M₀(1 + i)ⁿ (Bunga berbunga pada tiap periode).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Rumus Bunga Majemuk',
        formula: 'Mₙ = M₀ · (1 + i)ⁿ',
        desc: 'M₀ = modal awal, i = persentase suku bunga per periode, n = banyak periode.'
      }
    ],
    examples: [
      {
        question: 'Modal sebesar Rp 10.000.000 disimpan di bank dengan bunga majemuk 10% per tahun. Berapakah jumlah uang tersebut setelah 2 tahun?',
        level: 'Basic',
        steps: [
          'M₀ = 10.000.000, i = 0.10, n = 2.',
          'M₂ = 10.000.000 × (1 + 0.10)² = 10.000.000 × (1.10)².',
          'M₂ = 10.000.000 × 1.21 = Rp 12.100.000.'
        ],
        answer: 'Rp 12.100.000',
        tips: 'Pada bunga majemuk, bunga tahun pertama ikut menghasilkan bunga di tahun kedua.'
      }
    ],
    quickQuiz: [
      {
        question: 'Jika modal Rp 5.000.000 ditabung dengan bunga tunggal 8% per tahun selama 3 tahun, total bunganya adalah...',
        options: ['Rp 1.200.000', 'Rp 1.500.000', 'Rp 800.000', 'Rp 1.000.000'],
        correctIndex: 0,
        explanation: 'Bunga = 5.000.000 × 0.08 × 3 = Rp 1.200.000.'
      }
    ]
  },
  {
    id: 'grade-10-statistika-dasar',
    grade: 10,
    title: 'Statistika Data Tunggal & Boxplot',
    category: 'Statistics',
    icon: '📊',
    color: '#3b82f6',
    accentColor: '#1d4ed8',
    readTime: '12 Mins',
    difficulty: 'Easy',
    summary: 'Penyajian data, mean, median, modus data tunggal, jangkauan antarkuartil (IQR), dan diagram garis/boxplot.',
    detailedOverview: 'Menganalisis ukuran pemusatan dan sebaran data tunggal. Diagram kotak garis (boxplot) memvisualisasikan nilai minimum, kuartil bawah Q1, median Q2, kuartil atas Q3, nilai maksimum, dan pencilan data (outlier).',
    coreConcepts: [
      {
        title: '1. Kuartil & Jangkauan Antarkuartil',
        points: [
          'Jangkauan (Range): R = X_maks - X_min.',
          'Jangkauan Antarkuartil: IQR = Q₃ - Q₁.',
          'Simpangan Kuartil (Jangkauan Semi Antarkuartil): Qd = 1/2 · (Q₃ - Q₁).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Jangkauan Antarkuartil (IQR)',
        formula: 'IQR = Q₃ - Q₁',
        desc: 'Ukuran variabilitas data yang tahan terhadap nilai ekstrem (outlier).'
      }
    ],
    examples: [
      {
        question: 'Diketahui data terurut: 3, 5, 7, 8, 9, 11, 13. Tentukan nilai Median (Q2), Q1, dan Q3.',
        level: 'Basic',
        steps: [
          'Banyak data n = 7 (ganjil).',
          'Median Q₂ = data ke-4 = 8.',
          'Bagian bawah (3, 5, 7) memiliki nilai tengah Q₁ = 5.',
          'Bagian atas (9, 11, 13) memiliki nilai tengah Q₃ = 11.'
        ],
        answer: 'Q1 = 5, Q2 = 8, Q3 = 11',
        tips: 'Pastikan data sudah diurutkan dari yang terkecil ke terbesar sebelum menentukan kuartil.'
      }
    ],
    quickQuiz: [
      {
        question: 'Jangkauan antarkuartil (IQR) dari data dengan Q1 = 12 dan Q3 = 28 adalah...',
        options: ['16', '20', '8', '14'],
        correctIndex: 0,
        explanation: 'IQR = Q3 - Q1 = 28 - 12 = 16.'
      }
    ]
  }
];

// ============================================================================
// KELAS 11 (SMA / MA FASE F - TINGKAT LANJUT)
// ============================================================================
export const MATERI_KELAS_11: MathTopic[] = [
  {
    id: 'grade-11-functions',
    grade: 11,
    title: 'Fungsi Komposisi & Fungsi Invers',
    category: 'Algebra & Matrices',
    icon: '🔄',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Operasi aljabar fungsi, komposisi (f ∘ g)(x), sifat asosiatif/identitas, dan cara cepat mencari invers f⁻¹(x).',
    detailedOverview: 'Fungsi komposisi menggabungkan output fungsi g menjadi input fungsi f. Fungsi invers mengembalikan hasil pemetaan ke elemen domain asalnya, dengan syarat fungsi tersebut bijektif (satu-satu dan pada).',
    coreConcepts: [
      {
        title: '1. Aturan Komposisi Fungsi',
        points: [
          '(f ∘ g)(x) = f(g(x)) ⟹ Masukkan fungsi g(x) ke dalam variabel x pada fungsi f.',
          'Secara umum TIDAK komutatif: (f ∘ g)(x) ≠ (g ∘ f)(x).',
          'Invers komposisi: (f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x).'
        ]
      },
      {
        title: '2. Trik Cepat Invers Fungsi Pecahan Linear',
        points: [
          'Jika f(x) = (ax + b) / (cx + d), maka inversnya adalah: f⁻¹(x) = (-dx + b) / (cx - a).',
          'Tukar posisi koefisien a dan d lalu ubah tandanya (dikalikan -1).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Invers Pecahan Linear Cepat',
        formula: 'f(x) = (ax+b)/(cx+d)  ⟹  f⁻¹(x) = (-dx+b)/(cx-a)',
        desc: 'Rumus kilat mencari fungsi invers bentuk pecahan linear.'
      }
    ],
    examples: [
      {
        question: 'Jika f(x) = 2x + 1 dan g(x) = x² - 3, tentukan nilai (f ∘ g)(3).',
        level: 'Basic',
        steps: [
          'Hitung nilai g(3) terlebih dahulu: g(3) = 3² - 3 = 9 - 3 = 6.',
          'Substitusikan hasil ke f(x): f(6) = 2(6) + 1 = 12 + 1 = 13.'
        ],
        answer: '13',
        tips: 'Kerjakan dari fungsi yang berada di urutan paling dalam.'
      }
    ],
    quickQuiz: [
      {
        question: 'Invers dari f(x) = 3x - 6 adalah...',
        options: ['(x + 6) / 3', '(x - 6) / 3', '3x + 6', 'x / 3 - 6'],
        correctIndex: 0,
        explanation: 'y = 3x - 6 ⟹ y + 6 = 3x ⟹ x = (y + 6) / 3. Maka f⁻¹(x) = (x + 6) / 3.'
      }
    ]
  },
  {
    id: 'grade-11-circles',
    grade: 11,
    title: 'Persamaan Lingkaran & Garis Singgung',
    category: 'Geometry',
    icon: '⭕',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Persamaan lingkaran pusat (0,0) & (a,b), bentuk umum x² + y² + Ax + By + C = 0, kedudukan titik/garis, dan persamaan garis singgung (PGS).',
    detailedOverview: 'Lingkaran adalah himpunan semua titik yang berjarak sama (jari-jari r) dari sebuah titik pusat. Persamaan garis singgung dapat dicari melalui titik pada lingkaran, gradien tertentu m, atau titik di luar lingkaran.',
    coreConcepts: [
      {
        title: '1. Persamaan Baku Lingkaran',
        points: [
          'Pusat (0,0) dan jari-jari r: x² + y² = r².',
          'Pusat (a,b) dan jari-jari r: (x - a)² + (y - b)² = r².',
          'Bentuk Umum: x² + y² + Ax + By + C = 0 dengan Pusat = (-A/2, -B/2) dan r = √(a² + b² - C).'
        ]
      },
      {
        title: '2. Garis Singgung dengan Gradien m',
        points: [
          'Pada lingkaran (x - a)² + (y - b)² = r²: y - b = m(x - a) ± r√(1 + m²).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'PGS Lingkaran Bergradien m',
        formula: 'y - b = m(x - a) ± r√(1 + m²)',
        desc: 'Menghasilkan 2 garis singgung yang saling sejajar dengan kemiringan m.'
      },
      {
        name: 'PGS Melalui Titik Singgung (x₁, y₁)',
        formula: '(x₁ - a)(x - a) + (y₁ - b)(y - b) = r²',
        desc: 'Rumus bagi adil untuk titik yang tepat berada pada lingkaran.'
      }
    ],
    examples: [
      {
        question: 'Tentukan titik pusat dan panjang jari-jari lingkaran dengan persamaan x² + y² - 4x + 6y - 12 = 0.',
        level: 'Intermediate',
        steps: [
          'Koefisien: A = -4, B = 6, C = -12.',
          'Pusat P = (-A/2, -B/2) = (-(-4)/2, -6/2) = (2, -3).',
          'Jari-jari r = √(2² + (-3)² - (-12)) = √(4 + 9 + 12) = √25 = 5.'
        ],
        answer: 'Pusat (2, -3) dan Jari-jari r = 5',
        tips: 'Ingat bahwa nilai C dikurangkan di dalam tanda akar.'
      }
    ],
    quickQuiz: [
      {
        question: 'Jari-jari dari persamaan lingkaran (x - 2)² + (y + 5)² = 36 adalah...',
        options: ['6', '36', '12', '18'],
        correctIndex: 0,
        explanation: 'r² = 36 ⟹ r = √36 = 6.'
      }
    ]
  },
  {
    id: 'grade-11-matrices',
    grade: 11,
    title: 'Matriks & Sistem Persamaan Linear',
    category: 'Algebra & Matrices',
    icon: '📊',
    color: '#ffb17a',
    accentColor: '#ea580c',
    readTime: '18 Mins',
    difficulty: 'Medium',
    summary: 'Ordo matriks, operasi penjumlahan/perkalian baris × kolom, determinan 2×2 dan 3×3 (Metode Sarrus), matriks invers, dan aturan Cramer.',
    detailedOverview: 'Matriks adalah susunan skalar dalam baris dan kolom. Invers matriks (A⁻¹) hanya ada jika determinan det(A) ≠ 0 (matriks nonsingular). Sangat penting dalam aljabar linear dan grafik komputer.',
    coreConcepts: [
      {
        title: '1. Perkalian Matriks (Baris × Kolom)',
        points: [
          'Matriks A (ordo m × k) dapat dikalikan dengan B (ordo k × n) menghasilkan C (ordo m × n).',
          'Perkalian matriks TIDAK komutatif: A · B ≠ B · A.'
        ]
      },
      {
        title: '2. Determinan & Invers Matriks 2×2',
        points: [
          'Jika A = [[a, b], [c, d]], maka det(A) = |A| = ad - bc.',
          'Invers A⁻¹ = (1 / det(A)) · [[d, -b], [-c, a]].'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Invers Matriks Ordo 2×2',
        formula: 'A⁻¹ = (1 / (ad - bc)) · [[d, -b], [-c, a]]',
        desc: 'Syarat ada invers: det(A) = ad - bc ≠ 0.'
      }
    ],
    examples: [
      {
        question: 'Diketahui matriks A = [[3, 2], [1, 4]]. Tentukan determinan dan invers dari matriks A.',
        level: 'Intermediate',
        steps: [
          'Hitung determinan: det(A) = (3)(4) - (2)(1) = 12 - 2 = 10.',
          'Tukar diagonal utama (3 dan 4) dan kali negatif diagonal samping (2 dan 1): Adjoin = [[4, -2], [-1, 3]].',
          'Invers A⁻¹ = 1/10 · [[4, -2], [-1, 3]] = [[0.4, -0.2], [-0.1, 0.3]].'
        ],
        answer: 'det(A) = 10, A⁻¹ = 1/10 [[4, -2], [-1, 3]]',
        tips: 'Pastikan determinan tidak nol sebelum menghitung adjoin invers.'
      }
    ],
    quickQuiz: [
      {
        question: 'Determinan dari matriks [[5, 3], [2, 4]] adalah...',
        options: ['14', '26', '10', '16'],
        correctIndex: 0,
        explanation: 'det = (5 × 4) - (3 × 2) = 20 - 6 = 14.'
      }
    ]
  },
  {
    id: 'grade-11-transformations',
    grade: 11,
    title: 'Transformasi Geometri & Matriks Transformasi',
    category: 'Geometry',
    icon: '✨',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Translasi (pergeseran), Refleksi (pencerminan sumbu-x, y, y=x, titik asal), Rotasi sudut θ pusat (0,0) & (a,b), serta Dilatasi faktor skala k.',
    detailedOverview: 'Transformasi geometri memetakan setiap titik pada bidang ke posisi baru. Menggunakan representasi matriks mempermudah perhitungan transformasi majemuk berurutan (T₂ ∘ T₁).',
    coreConcepts: [
      {
        title: '1. Jenis Transformasi Dasar',
        points: [
          'Translasi T(a, b): (x\', y\') = (x + a, y + b).',
          'Refleksi sumbu-x: (x, -y); Refleksi sumbu-y: (-x, y); Refleksi garis y = x: (y, x).',
          'Rotasi 90° berlawanan arah jarum jam pusat (0,0): (x\', y\') = (-y, x).',
          'Dilatasi pusat (0,0) faktor k: (x\', y\') = (kx, ky).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Matriks Rotasi Pusat (0,0) Sudut θ',
        formula: 'R(θ) = [[cos θ, -sin θ], [sin θ, cos θ]]',
        desc: 'Rotasi berlawanan jarum jam bernilai θ positif.'
      }
    ],
    examples: [
      {
        question: 'Tentukan bayangan titik A(3, -2) jika dirotasikan sebesar 90° berlawanan arah jarum jam dengan pusat (0,0).',
        level: 'Basic',
        steps: [
          'Gunakan rumus rotasi 90°: (x\', y\') = (-y, x).',
          'x\' = -(-2) = 2.',
          'y\' = 3.',
          'Maka bayangan titiknya adalah A\'(2, 3).'
        ],
        answer: 'A\'(2, 3)',
        tips: 'Rotasi 90° berlawanan arah jarum jam memetakan (x, y) ⟹ (-y, x).'
      }
    ],
    quickQuiz: [
      {
        question: 'Bayangan titik P(4, 1) setelah ditranslasikan oleh T(-2, 5) adalah...',
        options: ['(2, 6)', '(6, 6)', '(2, -4)', '(6, -4)'],
        correctIndex: 0,
        explanation: 'P\' = (4 + (-2), 1 + 5) = (2, 6).'
      }
    ]
  },
  {
    id: 'grade-11-limit',
    grade: 11,
    title: 'Limit Fungsi Aljabar',
    category: 'Calculus',
    icon: '🎯',
    color: '#a855f7',
    accentColor: '#7e22ce',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Bentuk tentu dan tak tentu (0/0, ∞/∞, ∞ - ∞), metode substitusi langsung, pemfaktoran, perkalian sekawan akar, dan Teorema L\'Hôpital.',
    detailedOverview: 'Limit menggambarkan perilaku suatu fungsi saat nilai input mendekati titik tertentu. Jika substitusi langsung menghasilkan 0/0, lakukan penyederhanaan aljabar atau turunkan pembilang dan penyebut (L\'Hôpital).',
    coreConcepts: [
      {
        title: '1. Penyelesaian Bentuk Tak Tentu 0/0',
        points: [
          'Substitusi Langsung: Jika hasilnya bilangan riil L, maka limit = L.',
          'Metode Pemfaktoran: Faktorkan pembilang dan penyebut untuk mencoret pembuat nol (x - c).',
          'Metode Kali Sekawan: Jika terdapat bentuk akar, kalikan dengan sekawannya √(a) + √(b).',
          'Dalil L\'Hôpital: lim [f(x) / g(x)] = lim [f\'(x) / g\'(x)].'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Dalil L\'Hôpital (Turunan)',
        formula: 'lim (x→c) [f(x) / g(x)] = lim (x→c) [f\'(x) / g\'(x)]',
        desc: 'Hanya boleh dipakai jika bentuk awalnya 0/0 atau ∞/∞.'
      }
    ],
    examples: [
      {
        question: 'Hitung nilai dari lim (x→2) [(x² - 4) / (x - 2)].',
        level: 'Basic',
        steps: [
          'Substitusi x = 2 menghasilkan (4 - 4)/(2 - 2) = 0/0 (tak tentu).',
          'Faktorkan pembilang: x² - 4 = (x - 2)(x + 2).',
          'Coret faktor persekutuan (x - 2): lim (x→2) (x + 2).',
          'Substitusi kembali: 2 + 2 = 4.'
        ],
        answer: '4',
        tips: 'Pembuat nol (x - 2) saling membagi habis.'
      }
    ],
    quickQuiz: [
      {
        question: 'Nilai dari lim (x→3) [(x² - 9) / (x - 3)] adalah...',
        options: ['6', '3', '0', '9'],
        correctIndex: 0,
        explanation: 'Faktorkan: (x - 3)(x + 3)/(x - 3) = x + 3. Pada x = 3 ⟹ 3 + 3 = 6.'
      }
    ]
  },
  {
    id: 'grade-11-calculus-diff',
    grade: 11,
    title: 'Turunan Fungsi Aljabar (Diferensial)',
    category: 'Calculus',
    icon: '⚡',
    color: '#ec4899',
    accentColor: '#db2777',
    readTime: '18 Mins',
    difficulty: 'Medium',
    summary: 'Aturan pangkat d/dx (xⁿ) = n·xⁿ⁻¹, aturan perkalian u·v dan pembagian u/v, gradien garis singgung m = f\'(x₁), titik stasioner maksimum/minimum.',
    detailedOverview: 'Turunan mengukur laju perubahan sesaat fungsi. Aplikasi penting mencakup penentuan fungsi naik/turun (f\'(x) > 0 atau f\'(x) < 0), titik balik optimum, dan persoalan fisika kecepatan v(t) = s\'(t) serta percepatan a(t) = v\'(t).',
    coreConcepts: [
      {
        title: '1. Aturan Turunan Baku',
        points: [
          'Konstanta: d/dx (c) = 0.',
          'Pangkat: d/dx (a · xⁿ) = a · n · xⁿ⁻¹.',
          'Perkalian: (u · v)\' = u\'v + uv\'.',
          'Pembagian: (u / v)\' = (u\'v - uv\') / v².',
          'Aturan Rantai: d/dx [f(g(x))] = f\'(g(x)) · g\'(x).'
        ]
      },
      {
        title: '2. Nilai Stasioner & Garis Singgung Kurva',
        points: [
          'Gradien garis singgung kurva di titik (x₁, y₁): m = f\'(x₁).',
          'Persamaan garis singgung: y - y₁ = m(x - x₁).',
          'Syarat titik stasioner (puncak/belok): f\'(x) = 0.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Turunan Perkalian & Pembagian',
        formula: '(u · v)\' = u\'v + uv\'  |  (u/v)\' = (u\'v - uv\') / v²',
        desc: 'Aturan wajib untuk fungsi perkalian dan pembagian aljabar.'
      }
    ],
    examples: [
      {
        question: 'Tentukan gradien garis singgung kurva y = x³ - 2x² + 4 pada titik dengan absis x = 2.',
        level: 'Intermediate',
        steps: [
          'Cari turunan pertama fungsi: y\' = f\'(x) = 3x² - 4x.',
          'Substitusikan absis x = 2 ke turunan: m = f\'(2) = 3(2)² - 4(2) = 3(4) - 8 = 12 - 8 = 4.'
        ],
        answer: 'm = 4',
        tips: 'Gradien garis singgung adalah nilai turunan pertama di titik yang ditinjau.'
      }
    ],
    quickQuiz: [
      {
        question: 'Turunan pertama dari f(x) = 4x³ - 5x² + 7x - 2 adalah...',
        options: ['12x² - 10x + 7', '12x² - 10x', '4x² - 5x + 7', '12x³ - 10x² + 7'],
        correctIndex: 0,
        explanation: 'f\'(x) = (4×3)x² - (5×2)x¹ + 7 = 12x² - 10x + 7.'
      }
    ]
  },
  {
    id: 'grade-11-integral-tak-tentu',
    grade: 11,
    title: 'Integral Tak Tentu Fungsi Aljabar',
    category: 'Calculus',
    icon: '∫',
    color: '#10b981',
    accentColor: '#047857',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Anti-turunan ∫ xⁿ dx = (1/(n+1)) xⁿ⁺¹ + C, sifat linearitas integral, teknik substitusi aljabar, dan menentukan persamaan kurva f(x).',
    detailedOverview: 'Integral tak tentu adalah proses invers dari diferensiasi (anti-turunan). Nilai konstanta integrasi C dapat ditentukan secara pasti jika diketahui satu titik koordinat (x, y) yang dilalui kurva.',
    coreConcepts: [
      {
        title: '1. Rumus Dasar Integral Aljabar',
        points: [
          '∫ k dx = kx + C.',
          '∫ a xⁿ dx = [a / (n + 1)] xⁿ⁺¹ + C (syarat n ≠ -1).',
          'Sifat penjumlahan: ∫ [f(x) ± g(x)] dx = ∫ f(x) dx ± ∫ g(x) dx.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Integral Tak Tentu Aljabar',
        formula: '∫ a xⁿ dx = [a / (n + 1)] · xⁿ⁺¹ + C',
        desc: 'Pangkat bertambah 1 dan dibagi dengan pangkat baru tersebut.'
      }
    ],
    examples: [
      {
        question: 'Tentukan hasil dari ∫ (6x² - 4x + 3) dx.',
        level: 'Basic',
        steps: [
          'Integralkan suku demi suku:',
          '∫ 6x² dx = (6/3) x³ = 2x³.',
          '∫ -4x dx = (-4/2) x² = -2x².',
          '∫ 3 dx = 3x.',
          'Gabungkan dan tambahkan konstanta C: 2x³ - 2x² + 3x + C.'
        ],
        answer: '2x³ - 2x² + 3x + C',
        tips: 'Jangan lupa selalu menyertakan konstanta + C pada integral tak tentu.'
      }
    ],
    quickQuiz: [
      {
        question: 'Hasil dari ∫ 3x² dx adalah...',
        options: ['x³ + C', '3x³ + C', '6x + C', 'x² + C'],
        correctIndex: 0,
        explanation: '∫ 3x² dx = (3 / 3) x³ + C = x³ + C.'
      }
    ]
  },
  {
    id: 'grade-11-polynomials',
    grade: 11,
    title: 'Polinomial / Suku Banyak',
    category: 'Algebra & Matrices',
    icon: '🧩',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Derajat suku banyak, operasi Horner, Teorema Sisa (S = f(k)), Teorema Faktor, dan persamaan akar-akar polinomial Vieta tingkat tinggi.',
    detailedOverview: 'Suku banyak P(x) = aₙxⁿ + ... + a₀. Pembagian Horner memberikan cara efisien untuk mencari hasil bagi H(x) dan sisa pembagian S(x) tanpa pembagian bersusun panjang.',
    coreConcepts: [
      {
        title: '1. Teorema Sisa & Teorema Faktor',
        points: [
          'Jika P(x) dibagi oleh (x - k), maka sisa pembagiannya adalah S = P(k).',
          'Jika P(x) dibagi oleh (ax - b), maka sisa pembagiannya adalah S = P(b/a).',
          'Teorema Faktor: (x - k) adalah faktor dari P(x) jika dan hanya jika sisa P(k) = 0.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Persamaan Dasar Pembagian Polinomial',
        formula: 'P(x) = Pembagi · H(x) + Sisa',
        desc: 'Derajat sisa pembagian selalu lebih kecil dari derajat pembagi.'
      }
    ],
    examples: [
      {
        question: 'Tentukan sisa pembagian suku banyak P(x) = 2x³ - 5x² + 4x + 7 oleh (x - 2).',
        level: 'Basic',
        steps: [
          'Gunakan Teorema Sisa: Sisa = P(2).',
          'P(2) = 2(2)³ - 5(2)² + 4(2) + 7.',
          'P(2) = 2(8) - 5(4) + 8 + 7 = 16 - 20 + 8 + 7 = 11.'
        ],
        answer: '11',
        tips: 'Cukup masukkan nilai pembuat nol dari pembagi (x = 2) langsung ke P(x).'
      }
    ],
    quickQuiz: [
      {
        question: 'Jika P(x) = x³ - 2x + 5 dibagi oleh (x - 1), sisanya adalah...',
        options: ['4', '6', '5', '2'],
        correctIndex: 0,
        explanation: 'P(1) = 1³ - 2(1) + 5 = 1 - 2 + 5 = 4.'
      }
    ]
  },
  {
    id: 'grade-11-program-linear',
    grade: 11,
    title: 'Program Linear & Nilai Optimum',
    category: 'Financial & Logic',
    icon: '📊',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '15 Mins',
    difficulty: 'Medium',
    summary: 'Daerah Penyelesaian (DHP) pertidaksamaan linear, model matematika optimasi keuntungan/biaya, dan metode uji titik pojok (ekstrem).',
    detailedOverview: 'Program linear memodelkan masalah alokasi sumber daya terbatas untuk memaksimalkan keuntungan atau meminimalkan biaya pengeluaran. Titik optimum selalu berada pada titik pojok/sudut dari daerah himpunan penyelesaian.',
    coreConcepts: [
      {
        title: '1. Metode Uji Titik Pojok',
        points: [
          'Langkah 1: Gambar garis batas pertidaksamaan pada bidang Cartesius dan tentukan DHP.',
          'Langkah 2: Cari koordinat semua titik potong/sudut yang membatasi DHP.',
          'Langkah 3: Substitusikan tiap titik pojok (x, y) ke fungsi tujuan Z = ax + by untuk mencari nilai maksimum atau minimum.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Fungsi Objektif / Sasaran',
        formula: 'Z = ax + by',
        desc: 'Fungsi yang akan dimaksimalkan atau diminimalkan nilainya.'
      }
    ],
    examples: [
      {
        question: 'Tentukan nilai maksimum dari f(x, y) = 5x + 4y pada titik pojok A(0,0), B(4,0), C(3,2), dan D(0,5).',
        level: 'Basic',
        steps: [
          'Uji titik A(0,0) ⟹ 5(0) + 4(0) = 0.',
          'Uji titik B(4,0) ⟹ 5(4) + 4(0) = 20.',
          'Uji titik C(3,2) ⟹ 5(3) + 4(2) = 15 + 8 = 23.',
          'Uji titik D(0,5) ⟹ 5(0) + 4(5) = 20.',
          'Nilai terbesar adalah 23 pada titik C(3,2).'
        ],
        answer: 'Nilai Maksimum = 23',
        tips: 'Evaluasi semua titik sudut daerah penyelesaian untuk memastikan nilai optimum tertinggi.'
      }
    ],
    quickQuiz: [
      {
        question: 'Nilai dari fungsi sasaran Z = 3x + 2y di titik (4, 5) adalah...',
        options: ['22', '20', '26', '17'],
        correctIndex: 0,
        explanation: 'Z = 3(4) + 2(5) = 12 + 10 = 22.'
      }
    ]
  }
];

// ============================================================================
// KELAS 12 (SMA / MA FASE F+ / UTBK - SNBT & PERSIAPAN KULIAH)
// ============================================================================
export const MATERI_KELAS_12: MathTopic[] = [
  {
    id: 'dimensi-tiga',
    grade: 12,
    title: 'Dimensi Tiga (Geometri Ruang)',
    category: 'Geometry',
    icon: '🧊',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '20 Mins',
    difficulty: 'Hard',
    summary: 'Kedudukan titik, garis, dan bidang pada kubus & limas, diagonal ruang s√3, proyeksi ortogonal, dan jarak titik ke garis/bidang.',
    detailedOverview: 'Geometri ruang mengkaji hubungan spasial pada bangun tiga dimensi. Menghitung jarak titik ke garis seringkali memanfaatkan kesamaan luas segitiga penolong (1/2 alas × tinggi) atau aturan cosinus.',
    coreConcepts: [
      {
        title: '1. Unsur Kubus dengan Panjang Rusuk s',
        points: [
          'Diagonal sisi/bidang (misal AC, AF): d = s√2.',
          'Diagonal ruang (misal AG, BH): d = s√3.',
          'Luas bidang diagonal: L = s²√2.'
        ]
      },
      {
        title: '2. Jarak Titik ke Garis Menggunakan Luas Segitiga',
        points: [
          'Buat segitiga yang menghubungkan titik dengan kedua ujung ruas garis.',
          'Jika segitiga siku-siku di titik sudut tersebut: d = (alas × tinggi) / sisi miring.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Diagonal Sisi & Ruang Kubus',
        formula: 'd_sisi = s√2  |  d_ruang = s√3',
        desc: 'Panjang diagonal pada kubus dengan panjang rusuk s.'
      },
      {
        name: 'Garis Tinggi Segitiga Siku-Siku',
        formula: 't = (a · b) / c',
        desc: 'Jarak dari titik sudut siku-siku ke sisi miring hipotenusa c.'
      }
    ],
    examples: [
      {
        question: 'Pada kubus ABCD.EFGH dengan panjang rusuk 6 cm, tentukan jarak titik A ke diagonal ruang BH.',
        level: 'Intermediate',
        steps: [
          'Perhatikan segitiga ABH yang siku-siku di A (karena rusuk AB tegak lurus bidang samping ADHE).',
          'Panjang AB = 6 cm, diagonal sisi AH = 6√2 cm, diagonal ruang BH = 6√3 cm.',
          'Gunakan rumus kesamaan luas segitiga ABH: 1/2 · AB · AH = 1/2 · BH · d.',
          'd = (AB · AH) / BH = (6 · 6√2) / (6√3) = (6√2) / √3 = 2√6 cm.'
        ],
        answer: '2√6 cm',
        tips: 'Gunakan segitiga penolong siku-siku untuk menyederhanakan perhitungan jarak spasial.'
      }
    ],
    quickQuiz: [
      {
        question: 'Kubus dengan panjang rusuk 8 cm memiliki panjang diagonal ruang sebesar...',
        options: ['8√3 cm', '8√2 cm', '16 cm', '4√6 cm'],
        correctIndex: 0,
        explanation: 'Diagonal ruang kubus = s√3 = 8√3 cm.'
      }
    ]
  },
  {
    id: 'statistika',
    grade: 12,
    title: 'Statistika Data Kelompok & Ukuran Penyebaran',
    category: 'Statistics',
    icon: '📊',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '18 Mins',
    difficulty: 'Medium',
    summary: 'Tabel distribusi frekuensi, mean (metode coding/rataan sementara), median, modus data kelompok, kuartil, dan simpangan baku.',
    detailedOverview: 'Statistika data kelompok menyajikan data kontinu dalam interval kelas. Ukuran pemusatan (Mean, Median, Modus) dan ukuran penyebaran (Simpangan Baku / Standar Deviasi) menjadi materi wajib ujian sekolah dan UTBK-SNBT.',
    coreConcepts: [
      {
        title: '1. Modus Data Kelompok',
        points: [
          'Mo = Tb + (d₁ / (d₁ + d₂)) · p.',
          'Tb = Tepi bawah kelas modus (frekuensi terbesar).',
          'd₁ = selisih frekuensi kelas modus dengan kelas sebelumnya.',
          'd₂ = selisih frekuensi kelas modus dengan kelas sesudahnya.',
          'p = panjang kelas interval.'
        ]
      },
      {
        title: '2. Median & Kuartil Data Kelompok',
        points: [
          'Qᵢ = Tb + ((i/4 · N - Fk) / f_Q) · p (untuk kuartil ke-i = 1, 2, 3).',
          'N = total seluruh frekuensi, Fk = frekuensi kumulatif sebelum kelas kuartil, f_Q = frekuensi kelas kuartil.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Modus Data Kelompok',
        formula: 'Mo = Tb + [d₁ / (d₁ + d₂)] · p',
        desc: 'Menghitung nilai modus dari tabel distribusi frekuensi.'
      },
      {
        name: 'Median Data Kelompok',
        formula: 'Me = Tb + [(1/2 N - Fk) / f_me] · p',
        desc: 'Menghitung nilai tengah data berkelompok.'
      }
    ],
    examples: [
      {
        question: 'Jika panjang kelas p = 5, Tb = 20.5, d₁ = 3, dan d₂ = 2, berapakah nilai Modusnya?',
        level: 'Basic',
        steps: [
          'Gunakan rumus: Mo = Tb + (d₁ / (d₁ + d₂)) · p.',
          'Mo = 20.5 + (3 / (3 + 2)) · 5 = 20.5 + (3/5) · 5 = 20.5 + 3 = 23.5.'
        ],
        answer: '23.5',
        tips: 'Perhatikan bahwa nilai pecahan d₁/(d₁+d₂) dikalikan panjang interval p terlebih dahulu.'
      }
    ],
    quickQuiz: [
      {
        question: 'Rata-rata data tunggal 4, 6, 8, 10, 12 adalah...',
        options: ['8', '7', '9', '10'],
        correctIndex: 0,
        explanation: 'Mean = (4 + 6 + 8 + 10 + 12) / 5 = 40 / 5 = 8.'
      }
    ]
  },
  {
    id: 'kaidah-pencacahan',
    grade: 12,
    title: 'Kaidah Pencacahan: Permutasi & Kombinasi',
    category: 'Combinatorics & Probability',
    icon: '🧮',
    color: '#ffb17a',
    accentColor: '#ea580c',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Aturan perkalian & penjumlahan, faktorial, permutasi unsur berbeda, permutasi unsur sama, permutasi siklis, dan kombinasi.',
    detailedOverview: 'Kaidah pencacahan menentukan banyaknya kemungkinan susunan kejadian tanpa harus mendaftar satu per satu. Kunci pembeda: Permutasi memperhatikan urutan (posisi jabatan/ranking), sedangkan Kombinasi tidak memperhatikan urutan (tim/kelompok).',
    coreConcepts: [
      {
        title: '1. Permutasi (Urutan Diperhatikan: AB ≠ BA)',
        points: [
          'Permutasi r dari n objek: ₙPᵣ = n! / (n - r)!.',
          'Permutasi unsur yang sama: P = n! / (k₁! · k₂! ...).',
          'Permutasi siklis (melingkar): P_siklis = (n - 1)!.'
        ]
      },
      {
        title: '2. Kombinasi (Urutan Diabaikan: AB = BA)',
        points: [
          'Kombinasi r dari n objek: ₙCᵣ = n! / (r! · (n - r)!).',
          'Digunakan saat memilih anggota tim, jabat tangan antar-orang, atau mengambil bola sekaligus.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Rumus Kombinasi',
        formula: 'ₙCᵣ = n! / [r! · (n - r)!]',
        desc: 'Banyak cara memilih r objek dari n objek tanpa memperhatikan urutan.'
      },
      {
        name: 'Permutasi Siklis',
        formula: 'P_siklis = (n - 1)!',
        desc: 'Banyak susunan melingkar untuk n objek berbeda.'
      }
    ],
    examples: [
      {
        question: 'Dari 8 orang calon pengurus kelas, akan dipilih 3 orang sebagai delegasi lomba. Berapa banyak cara pemilihan yang mungkin?',
        level: 'Basic',
        steps: [
          'Karena tidak ada jabatan bertingkat (urutan diabaikan), gunakan kombinasi ₈C₃.',
          '₈C₃ = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56 cara.'
        ],
        answer: '56 cara',
        tips: 'Bagi pembilang dengan penyebut faktorial untuk menyederhanakan perhitungan cepat.'
      }
    ],
    quickQuiz: [
      {
        question: 'Banyak cara 5 orang duduk mengelilingi meja bundar adalah...',
        options: ['24 cara', '120 cara', '60 cara', '12 cara'],
        correctIndex: 0,
        explanation: 'P_siklis = (5 - 1)! = 4! = 4 × 3 × 2 × 1 = 24 cara.'
      }
    ]
  },
  {
    id: 'peluang-majemuk',
    grade: 12,
    title: 'Peluang Kejadian Majemuk & Bersyarat',
    category: 'Combinatorics & Probability',
    icon: '🎲',
    color: '#00d0ff',
    accentColor: '#0284c7',
    readTime: '16 Mins',
    difficulty: 'Medium',
    summary: 'Ruang sampel n(S), peluang komplemen P(A\'), kejadian saling lepas, saling bebas, peluang bersyarat P(A|B), dan frekuensi harapan.',
    detailedOverview: 'Peluang mengukur kemungkinan terjadinya suatu peristiwa (0 ≤ P(A) ≤ 1). Kejadian saling lepas menggunakan operasi penjumlahan P(A ∪ B) = P(A) + P(B), sedangkan kejadian saling bebas menggunakan operasi perkalian P(A ∩ B) = P(A) · P(B).',
    coreConcepts: [
      {
        title: '1. Peluang Teoretis & Komplemen',
        points: [
          'P(A) = n(A) / n(S), dengan 0 ≤ P(A) ≤ 1.',
          'Peluang komplemen: P(A\') = 1 - P(A).'
        ]
      },
      {
        title: '2. Kejadian Saling Lepas & Saling Bebas',
        points: [
          'Saling Lepas (tidak beririsan): P(A ∪ B) = P(A) + P(B).',
          'Saling Bebas (tidak saling mempengaruhi): P(A ∩ B) = P(A) · P(B).',
          'Frekuensi Harapan: F_h(A) = N · P(A).'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Peluang Gabungan Dua Kejadian',
        formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
        desc: 'Rumus umum peluang gabungan (jika saling lepas, P(A ∩ B) = 0).'
      }
    ],
    examples: [
      {
        question: 'Dua buah dadu dilempar bersamaan satu kali. Tentukan peluang muncul jumlah kedua mata dadu sama dengan 8.',
        level: 'Basic',
        steps: [
          'Total ruang sampel n(S) = 6 × 6 = 36.',
          'Pasangan mata dadu berjumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) ⟹ ada 5 pasangan.',
          'P(jumlah 8) = 5 / 36.'
        ],
        answer: '5/36',
        tips: 'Urutkan pasangan angka secara teratur dari dadu pertama terkecil.'
      }
    ],
    quickQuiz: [
      {
        question: 'Sebuah koin dilempar 100 kali. Frekuensi harapan munculnya sisi gambar adalah...',
        options: ['50 kali', '25 kali', '100 kali', '75 kali'],
        correctIndex: 0,
        explanation: 'P(Gambar) = 1/2. F_h = 100 × (1/2) = 50 kali.'
      }
    ]
  },
  {
    id: 'kalkulus-lanjut',
    grade: 12,
    title: 'Limit & Turunan Fungsi Trigonometri',
    category: 'Calculus',
    icon: '📈',
    color: '#a855f7',
    accentColor: '#7e22ce',
    readTime: '19 Mins',
    difficulty: 'Hard',
    summary: 'Teorema limit trigonometri lim(x→0) sin(ax)/bx = a/b, turunan fungsi sin/cos/tan, aturan rantai, dan garis singgung kurva trigonometri.',
    detailedOverview: 'Kalkulus tingkat lanjut memperluas konsep turunan dan limit ke fungsi periodik trigonometri. Materi ini menjadi salah satu bab paling sering muncul dalam Tes Skolastik Penalaran Matematika UTBK/SNBT.',
    coreConcepts: [
      {
        title: '1. Sifat Limit Trigonometri x Mendekati 0',
        points: [
          'lim(x→0) [sin(ax) / bx] = a / b.',
          'lim(x→0) [tan(ax) / bx] = a / b.',
          'Identitas pengubah cosinus: 1 - cos(ax) = 2 sin²(ax/2).'
        ]
      },
      {
        title: '2. Turunan Fungsi Trigonometri',
        points: [
          'd/dx (sin x) = cos x.',
          'd/dx (cos x) = -sin x.',
          'd/dx (tan x) = sec² x.',
          'Aturan Rantai: d/dx [sin(u)] = cos(u) · u\'.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Teorema Limit Trigonometri Dasar',
        formula: 'lim (x→0) [sin(ax) / bx] = a / b',
        desc: 'Menghitung nilai limit bentuk tak tentu 0/0 pada perbandingan sinus/tangen.'
      }
    ],
    examples: [
      {
        question: 'Tentukan nilai dari lim (x→0) [sin(6x) / (2x)].',
        level: 'Basic',
        steps: [
          'Gunakan rumus teorema dasar: lim (x→0) [sin(ax) / bx] = a / b.',
          'Substitusikan a = 6 dan b = 2: 6 / 2 = 3.'
        ],
        answer: '3',
        tips: 'Berlaku jika koefisien sinus dan pembagi bernilai linear menuju 0.'
      }
    ],
    quickQuiz: [
      {
        question: 'Turunan pertama dari y = sin(3x) adalah...',
        options: ['3 cos(3x)', 'cos(3x)', '-3 cos(3x)', '3 sin(3x)'],
        correctIndex: 0,
        explanation: 'Berdasarkan aturan rantai: y\' = cos(3x) · 3 = 3 cos(3x).'
      }
    ]
  },
  {
    id: 'integral-kalkulus',
    grade: 12,
    title: 'Integral Tentu & Luas Daerah Kurva',
    category: 'Calculus',
    icon: '∫',
    color: '#ec4899',
    accentColor: '#db2777',
    readTime: '18 Mins',
    difficulty: 'Hard',
    summary: 'Teorema Fundamental Kalkulus ∫[a ke b] f(x) dx = F(b) - F(a), menghitung luas daerah di bawah kurva, dan luas antara dua kurva.',
    detailedOverview: 'Integral tentu menghitung akumulasi kuantitas kontinu dengan batas tertentu. Aplikasi utamanya adalah menghitung luas bidang tak beraturan di bawah kurva atau bidang di antara dua kurva f(x) dan g(x).',
    coreConcepts: [
      {
        title: '1. Teorema Fundamental Kalkulus',
        points: [
          '∫ [a ke b] f(x) dx = [F(x)]_a^b = F(b) - F(a).',
          'Sifat batas terbalik: ∫ [a ke b] f(x) dx = - ∫ [b ke a] f(x) dx.',
          'Sifat titik tengah: ∫ [a ke c] f(x) dx = ∫ [a ke b] f(x) dx + ∫ [b ke c] f(x) dx.'
        ]
      },
      {
        title: '2. Luas Daerah Antara Dua Kurva',
        points: [
          'Luas = ∫ [a ke b] (Kurva Atas - Kurva Bawah) dx = ∫ [a ke b] (f(x) - g(x)) dx.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Teorema Fundamental Kalkulus',
        formula: '∫ [a ke b] f(x) dx = F(b) - F(a)',
        desc: 'Substitusi batas atas F(b) dikurangi batas bawah F(a).'
      }
    ],
    examples: [
      {
        question: 'Hitung nilai dari ∫ [0 ke 2] (3x² + 2x) dx.',
        level: 'Basic',
        steps: [
          'Cari anti-turunan F(x): ∫ (3x² + 2x) dx = x³ + x².',
          'Evaluasi batas atas F(2) = 2³ + 2² = 8 + 4 = 12.',
          'Evaluasi batas bawah F(0) = 0³ + 0² = 0.',
          'Hasil = F(2) - F(0) = 12 - 0 = 12.'
        ],
        answer: '12',
        tips: 'Integralkan terlebih dahulu secara aljabar baru masukkan batas atas dan bawah.'
      }
    ],
    quickQuiz: [
      {
        question: 'Nilai dari ∫ [1 ke 3] 2x dx adalah...',
        options: ['8', '9', '6', '4'],
        correctIndex: 0,
        explanation: 'F(x) = x². F(3) - F(1) = 3² - 1² = 9 - 1 = 8.'
      }
    ]
  },
  {
    id: 'distribusi-binomial',
    grade: 12,
    title: 'Distribusi Peluang Binomial & Normal',
    category: 'Statistics',
    icon: '🔔',
    color: '#ffdc00',
    accentColor: '#d97706',
    readTime: '16 Mins',
    difficulty: 'Hard',
    summary: 'Percobaan Bernoulli, variabel acak diskrit/kontinu, fungsi peluang binomial P(X=x) = ₙCₓ · pˣ · qⁿ⁻ˣ, dan skor-z kurva normal baku.',
    detailedOverview: 'Distribusi binomial memodelkan percobaan dengan dua kemungkinan hasil: sukses (p) atau gagal (q = 1 - p). Sementara distribusi normal berbentuk kurva lonceng simetris yang menjadi acuan statistik inferensial.',
    coreConcepts: [
      {
        title: '1. Syarat Distribusi Binomial',
        points: [
          'Percobaan diulang sebanyak n kali yang saling bebas (independen).',
          'Setiap percobaan hanya memiliki 2 kemungkinan hasil (Sukses atau Gagal).',
          'Peluang sukses (p) selalu bernilai tetap pada setiap percobaan.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Fungsi Peluang Binomial',
        formula: 'P(X = x) = ₙCₓ · pˣ · (1 - p)ⁿ⁻ˣ',
        desc: 'Peluang memperoleh tepat x kali sukses dari n percobaan.'
      },
      {
        name: 'Transformasi Skor Z Normal',
        formula: 'Z = (X - μ) / σ',
        desc: 'Menstandarkan variabel acak X ke distribusi normal baku Z ~ N(0, 1).'
      }
    ],
    examples: [
      {
        question: 'Sebuah koin seimbang dilempar 4 kali. Tentukan peluang muncul tepat 3 kali sisi gambar.',
        level: 'Intermediate',
        steps: [
          'n = 4, x = 3, p = 1/2, q = 1 - 1/2 = 1/2.',
          'P(X = 3) = ₄C₃ · (1/2)³ · (1/2)¹.',
          '₄C₃ = 4.',
          'P(X = 3) = 4 · (1/8) · (1/2) = 4/16 = 1/4 = 0.25.'
        ],
        answer: '1/4 (0.25)',
        tips: 'Hitung kombinasi nCx terlebih dahulu sebelum mengalikan pecahan peluang.'
      }
    ],
    quickQuiz: [
      {
        question: 'Jika peluang sukses p = 0.4, maka peluang gagal q adalah...',
        options: ['0.6', '0.4', '0.5', '1.0'],
        correctIndex: 0,
        explanation: 'q = 1 - p = 1 - 0.4 = 0.6.'
      }
    ]
  },
  {
    id: 'utbk-penalaran-matematika',
    grade: 12,
    title: 'Penalaran Matematika & Kuantitatif SNBT / UTBK',
    category: 'Financial & Logic',
    icon: '💡',
    color: '#82fed6',
    accentColor: '#059669',
    readTime: '17 Mins',
    difficulty: 'Medium',
    summary: 'Trik cepat penalaran matematika UTBK, pola bilangan, operasi aljabar simbolik (# & *), kecukupan data (1) & (2), serta perbandingan kuantitas P vs Q.',
    detailedOverview: 'Penalaran Matematika dalam SNBT menguji kemampuan analisis logis terhadap konteks bacaan cerita dunia nyata. Penguasaan trik estimasi, perbandingan nilai P dan Q, serta kecukupan data memangkas waktu pengerjaan secara drastis.',
    coreConcepts: [
      {
        title: '1. Tipe Soal Perbandingan Kuantitas P vs Q',
        points: [
          'Opsi A: Kuantitas P lebih besar daripada Q.',
          'Opsi B: Kuantitas Q lebih besar daripada P.',
          'Opsi C: Kuantitas P sama dengan Q.',
          'Opsi D: Informasi yang diberikan tidak cukup untuk memutuskan hubungan P dan Q.'
        ]
      }
    ],
    keyFormulas: [
      {
        name: 'Trik Kecepatan Rata-Rata Pulang Pergi',
        formula: 'v_rata = (2 · v₁ · v₂) / (v₁ + v₂)',
        desc: 'Kecepatan rata-rata perjalanan bolak-balik dengan jarak tempuh yang sama.'
      }
    ],
    examples: [
      {
        question: 'Jika didefinisikan operasi a ⊗ b = (2a + b) / (a - 1), tentukan nilai dari 4 ⊗ 6.',
        level: 'Basic',
        steps: [
          'Substitusi nilai a = 4 dan b = 6 ke rumus operasi.',
          '4 ⊗ 6 = (2(4) + 6) / (4 - 1).',
          '4 ⊗ 6 = (8 + 6) / 3 = 14 / 3.'
        ],
        answer: '14/3',
        tips: 'Ikuti persis pola substitusi simbol baru yang didefinisikan pada soal.'
      }
    ],
    quickQuiz: [
      {
        question: 'Jika a ★ b = a² - 3b, berapakah nilai dari 5 ★ 4?',
        options: ['13', '17', '25', '12'],
        correctIndex: 0,
        explanation: '5 ★ 4 = 5² - 3(4) = 25 - 12 = 13.'
      }
    ]
  }
];

// Semua materi gabungan kurikulum Indonesia lengkap
export const ALL_MATERI: MathTopic[] = [
  ...MATERI_KELAS_10,
  ...MATERI_KELAS_11,
  ...MATERI_KELAS_12
];

export const getMateriByGrade = (grade: 10 | 11 | 12): MathTopic[] => {
  if (grade === 10) return MATERI_KELAS_10;
  if (grade === 11) return MATERI_KELAS_11;
  return MATERI_KELAS_12;
};

// ============================================================================
// QUESTION BANK (GRADES 10, 11, 12) FOR ARCADE & QUIZ
// ============================================================================
export const MATH_QUESTIONS: Question[] = [
  // --- GRADE 10 QUESTIONS ---
  {
    id: 101,
    grade: 10,
    topicId: 'grade-10-exponents',
    topicTitle: 'Eksponen & Logaritma',
    question: 'Tentukan penyelesaian dari 2^(3x - 1) = 32.',
    options: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
    correctIndex: 0,
    explanation: '32 = 2⁵. Maka 3x - 1 = 5 ⟹ 3x = 6 ⟹ x = 2.',
    difficulty: 'easy'
  },
  {
    id: 102,
    grade: 10,
    topicId: 'grade-10-exponents',
    topicTitle: 'Eksponen & Logaritma',
    question: 'Berapakah nilai dari ²log 48 - ²log 3?',
    options: ['4', '16', '3', '8'],
    correctIndex: 0,
    explanation: '²log (48 / 3) = ²log 16 = 4 (karena 2⁴ = 16).',
    difficulty: 'easy'
  },
  {
    id: 103,
    grade: 10,
    topicId: 'grade-10-sequences',
    topicTitle: 'Barisan & Deret',
    question: 'Suku ke-10 dari barisan aritmatika 5, 8, 11, 14, ... adalah...',
    options: ['32', '35', '38', '29'],
    correctIndex: 0,
    explanation: 'a = 5, b = 3. U₁₀ = 5 + 9(3) = 5 + 27 = 32.',
    difficulty: 'easy'
  },
  {
    id: 104,
    grade: 10,
    topicId: 'grade-10-sequences',
    topicTitle: 'Barisan & Deret',
    question: 'Jumlah deret geometri tak hingga 18 + 6 + 2 + ... adalah...',
    options: ['27', '24', '36', '54'],
    correctIndex: 0,
    explanation: 'a = 18, r = 1/3. S_∞ = 18 / (1 - 1/3) = 18 / (2/3) = 27.',
    difficulty: 'medium'
  },
  {
    id: 105,
    grade: 10,
    topicId: 'grade-10-trigonometry',
    topicTitle: 'Trigonometri Dasar',
    question: 'Pada segitiga siku-siku, sisi depan = 3 dan sisi miring = 5. Berapakah cos θ?',
    options: ['4/5', '3/5', '3/4', '5/4'],
    correctIndex: 0,
    explanation: 'Samping = √(5² - 3²) = √(25 - 9) = 4. cos θ = Samping / Miring = 4/5.',
    difficulty: 'easy'
  },
  {
    id: 106,
    grade: 10,
    topicId: 'grade-10-quadratics',
    topicTitle: 'Fungsi Kuadrat',
    question: 'Akar-akar dari persamaan x² - 5x + 6 = 0 adalah...',
    options: ['x = 2 atau x = 3', 'x = -2 atau x = -3', 'x = 1 atau x = 6', 'x = -1 atau x = -6'],
    correctIndex: 0,
    explanation: '(x - 2)(x - 3) = 0 ⟹ x = 2 atau x = 3.',
    difficulty: 'easy'
  },
  {
    id: 107,
    grade: 10,
    topicId: 'grade-10-vectors',
    topicTitle: 'Vektor',
    question: 'Panjang dari vektor a = (3, 4) adalah...',
    options: ['5', '7', '25', '1'],
    correctIndex: 0,
    explanation: '|a| = √(3² + 4²) = √25 = 5.',
    difficulty: 'easy'
  },
  {
    id: 108,
    grade: 10,
    topicId: 'grade-10-keuangan',
    topicTitle: 'Matematika Keuangan',
    question: 'Jika modal Rp 5.000.000 dibungakan dengan bunga tunggal 8% per tahun selama 3 tahun, total bunganya adalah...',
    options: ['Rp 1.200.000', 'Rp 1.500.000', 'Rp 800.000', 'Rp 1.000.000'],
    correctIndex: 0,
    explanation: 'Bunga = 5.000.000 × 0.08 × 3 = Rp 1.200.000.',
    difficulty: 'easy'
  },

  // --- GRADE 11 QUESTIONS ---
  {
    id: 201,
    grade: 11,
    topicId: 'grade-11-functions',
    topicTitle: 'Fungsi Komposisi',
    question: 'Jika f(x) = 2x + 1 dan g(x) = x² - 3, berapakah (f ∘ g)(3)?',
    options: ['13', '15', '46', '7'],
    correctIndex: 0,
    explanation: 'g(3) = 3² - 3 = 6. f(6) = 2(6) + 1 = 13.',
    difficulty: 'easy'
  },
  {
    id: 202,
    grade: 11,
    topicId: 'grade-11-circles',
    topicTitle: 'Persamaan Lingkaran',
    question: 'Jari-jari dari lingkaran (x - 2)² + (y + 5)² = 36 adalah...',
    options: ['6', '36', '12', '18'],
    correctIndex: 0,
    explanation: 'r² = 36 ⟹ r = 6.',
    difficulty: 'easy'
  },
  {
    id: 203,
    grade: 11,
    topicId: 'grade-11-matrices',
    topicTitle: 'Matriks',
    question: 'Determinan matriks A = [[3, 1], [4, 2]] adalah...',
    options: ['2', '10', '-2', '6'],
    correctIndex: 0,
    explanation: 'det(A) = (3 × 2) - (1 × 4) = 6 - 4 = 2.',
    difficulty: 'easy'
  },
  {
    id: 204,
    grade: 11,
    topicId: 'grade-11-calculus-diff',
    topicTitle: 'Turunan Aljabar',
    question: 'Turunan pertama dari f(x) = 3x³ - 4x² + 5x - 1 pada x = 1 adalah...',
    options: ['6', '8', '14', '10'],
    correctIndex: 0,
    explanation: 'f\'(x) = 9x² - 8x + 5. f\'(1) = 9(1) - 8(1) + 5 = 6.',
    difficulty: 'medium'
  },
  {
    id: 205,
    grade: 11,
    topicId: 'grade-11-transformations',
    topicTitle: 'Transformasi Geometri',
    question: 'Bayangan titik P(4, -1) oleh rotasi 90° berlawanan arah jarum jam pusat (0,0) adalah...',
    options: ['(1, 4)', '(-1, -4)', '(-4, 1)', '(4, 1)'],
    correctIndex: 0,
    explanation: '(x, y) ⟹ (-y, x). Maka (4, -1) ⟹ (1, 4).',
    difficulty: 'medium'
  },
  {
    id: 206,
    grade: 11,
    topicId: 'grade-11-limit',
    topicTitle: 'Limit Fungsi Aljabar',
    question: 'Nilai dari lim (x→3) [(x² - 9) / (x - 3)] adalah...',
    options: ['6', '3', '0', '9'],
    correctIndex: 0,
    explanation: '(x - 3)(x + 3)/(x - 3) = x + 3. Pada x = 3 ⟹ 6.',
    difficulty: 'easy'
  },
  {
    id: 207,
    grade: 11,
    topicId: 'grade-11-integral-tak-tentu',
    topicTitle: 'Integral Aljabar',
    question: 'Hasil dari ∫ 3x² dx adalah...',
    options: ['x³ + C', '3x³ + C', '6x + C', 'x² + C'],
    correctIndex: 0,
    explanation: '∫ 3x² dx = (3/3)x³ + C = x³ + C.',
    difficulty: 'easy'
  },

  // --- GRADE 12 QUESTIONS ---
  {
    id: 301,
    grade: 12,
    topicId: 'dimensi-tiga',
    topicTitle: 'Dimensi Tiga',
    question: 'Kubus ABCD.EFGH memiliki rusuk 8 cm. Panjang diagonal ruang AG adalah...',
    options: ['8√3 cm', '8√2 cm', '16 cm', '4√6 cm'],
    correctIndex: 0,
    explanation: 'Diagonal ruang kubus = s√3 = 8√3 cm.',
    difficulty: 'easy'
  },
  {
    id: 302,
    grade: 12,
    topicId: 'statistika',
    topicTitle: 'Statistika Data Kelompok',
    question: 'Jika panjang kelas p = 5, Tb = 20.5, d₁ = 3, dan d₂ = 2, berapakah Modus?',
    options: ['23.5', '22.5', '24.5', '25.0'],
    correctIndex: 0,
    explanation: 'Mo = Tb + [d₁ / (d₁ + d₂)] · p = 20.5 + [3 / 5] · 5 = 23.5.',
    difficulty: 'easy'
  },
  {
    id: 303,
    grade: 12,
    topicId: 'kaidah-pencacahan',
    topicTitle: 'Permutasi & Kombinasi',
    question: 'Nilai dari ₇C₂ (Kombinasi 2 dari 7) adalah...',
    options: ['21', '14', '42', '35'],
    correctIndex: 0,
    explanation: '₇C₂ = (7 × 6) / (2 × 1) = 42 / 2 = 21.',
    difficulty: 'easy'
  },
  {
    id: 304,
    grade: 12,
    topicId: 'peluang-majemuk',
    topicTitle: 'Peluang Majemuk',
    question: 'Dua dadu dilempar sekali. Peluang jumlah mata dadu sama dengan 8 adalah...',
    options: ['5/36', '4/36', '6/36', '7/36'],
    correctIndex: 0,
    explanation: 'Pasangan jumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) ⟹ 5 dari 36.',
    difficulty: 'easy'
  },
  {
    id: 305,
    grade: 12,
    topicId: 'kalkulus-lanjut',
    topicTitle: 'Limit Trigonometri',
    question: 'Nilai dari lim (x→0) [sin(6x) / (2x)] adalah...',
    options: ['3', '0', '1', '6'],
    correctIndex: 0,
    explanation: 'lim (x→0) [sin(ax) / bx] = a/b = 6/2 = 3.',
    difficulty: 'easy'
  },
  {
    id: 306,
    grade: 12,
    topicId: 'integral-kalkulus',
    topicTitle: 'Integral Tentu',
    question: 'Nilai dari ∫ [0 sampai 2] (3x² + 2x) dx adalah...',
    options: ['12', '10', '14', '16'],
    correctIndex: 0,
    explanation: 'F(x) = x³ + x². F(2) - F(0) = (8 + 4) - 0 = 12.',
    difficulty: 'medium'
  },
  {
    id: 307,
    grade: 12,
    topicId: 'distribusi-binomial',
    topicTitle: 'Distribusi Binomial',
    question: 'Jika peluang sukses suatu peristiwa p = 0.35, maka peluang gagal q adalah...',
    options: ['0.65', '0.35', '0.70', '0.50'],
    correctIndex: 0,
    explanation: 'q = 1 - p = 1 - 0.35 = 0.65.',
    difficulty: 'easy'
  },
  {
    id: 308,
    grade: 12,
    topicId: 'utbk-penalaran-matematika',
    topicTitle: 'Penalaran Matematika UTBK',
    question: 'Jika didefinisikan a # b = a² - 2b, berapakah nilai dari 6 # 5?',
    options: ['26', '21', '31', '16'],
    correctIndex: 0,
    explanation: '6 # 5 = 6² - 2(5) = 36 - 10 = 26.',
    difficulty: 'easy'
  }
];
