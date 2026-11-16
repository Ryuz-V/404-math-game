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
  grade?: 10 | 11 | 12;
  topicId?: string;
  topicTitle?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// KELAS 10: 5 MODUL MATEMATIKA KURIKULUM LENGKAP
// ============================================================================
export const MATERI_KELAS_10: MathTopic[] = [
  {
    "id": "grade-10-exponents",
    "grade": 10,
    "title": "Eksponen, Bentuk Akar & Logaritma",
    "category": "Algebra & Matrices",
    "icon": "",
    "color": "#fef3c7",
    "accentColor": "#d97706",
    "readTime": "15 min belajar",
    "difficulty": "Easy",
    "summary": "Memahami operasi bilangan berpangkat bulat dan pecahan, merasionalkan bentuk akar kuadrat sekawan, serta sifat-sifat operasi logaritma dan penerapannya dalam menghitung peluruhan dan pertumbuhan eksponensial.",
    "detailedOverview": "Eksponen dan Logaritma merupakan materi pondasi utama aljabar pada Fase E Kelas 10 SMA. Konsep eksponen diawali dari perkalian berulang suatu bilangan riil dengan dirinya sendiri sebanyak n kali. Perkembangan materi ini mencakup pangkat bulat positif, nol, negatif, dan pangkat pecahan yang menjembatani konsep bentuk akar. Sementara itu, logaritma hadir sebagai operasi invers (kebalikan) dari perpangkatan. Pemahaman mendalam pada materi ini sangat krusial karena sering diaplikasikan dalam pemodelan sains nyata seperti pertumbuhan populasi mikroba, waktu paruh zat radioaktif, tingkat keasaman (pH) larutan kimia, hingga skala Richter untuk kekuatan gempa bumi.",
    "coreConcepts": [
      {
        "title": "Sifat-Sifat Dasar Bilangan Berpangkat (Eksponen)",
        "points": [
          "Perkalian bilangan berpangkat dengan basis sama: aᵐ · aⁿ = aᵐ⁺ⁿ.",
          "Pembagian bilangan berpangkat dengan basis sama: aᵐ : aⁿ = aᵐ⁻ⁿ (dengan a ≠ 0).",
          "Pemangkatan bilangan berpangkat: (aᵐ)ⁿ = aᵐⁿ.",
          "Perpangkatan perkalian dan pembagian dua bilangan: (a · b)ⁿ = aⁿ · bⁿ dan (a / b)ⁿ = aⁿ / bⁿ (b ≠ 0).",
          "Definisi pangkat nol dan negatif: a⁰ = 1 (untuk a ≠ 0) dan a⁻ⁿ = 1 / aⁿ."
        ]
      },
      {
        "title": "Bentuk Akar dan Merasionalkan Penyebut",
        "points": [
          "Hubungan pangkat pecahan dan akar: a^(m/n) = ⁿ√(aᵐ) dengan syarat n ≥ 2 dan n bilangan asli.",
          "Sifat perkalian & pembagian bentuk akar: √(a · b) = √a · √b dan √(a / b) = √a / √b (a ≥ 0, b > 0).",
          "Merasionalkan bentuk c / √a: Kalikan pembilang dan penyebut dengan √a sehingga diperoleh (c / a)√a.",
          "Merasionalkan bentuk c / (√a ± √b): Gunakan perkalian bentuk sekawan (conjugate) c / (√a ± √b) · (√a ∓ √b) / (√a ∓ √b) = c(√a ∓ √b) / (a - b)."
        ]
      },
      {
        "title": "Logaritma dan Sifat-Sifat Esensialnya",
        "points": [
          "Definisi dasar: ᵃlog b = c jika dan hanya jika aᶜ = b (syarat basis a > 0, a ≠ 1, dan numerus b > 0).",
          "Sifat penjumlahan dan pengurangan: ᵃlog (x · y) = ᵃlog x + ᵃlog y dan ᵃlog (x / y) = ᵃlog x - ᵃlog y.",
          "Sifat perpangkatan numerus dan basis: ᵃlog (bⁿ) = n · ᵃlog b dan ᵃᵐlog (bⁿ) = (n / m) · ᵃlog b.",
          "Sifat pergantian basis: ᵃlog b = (ᶜlog b) / (ᶜlog a) = 1 / (ᵇlog a).",
          "Sifat perkalian berantai: ᵃlog b · ᵇlog c · ᶜlog d = ᵃlog d."
        ]
      },
      {
        "title": "Aplikasi Pemodelan Eksponensial",
        "points": [
          "Pertumbuhan Eksponensial (Bakteri, Tabungan Bunga Majemuk): Mₜ = M₀(1 + r)ᵗ.",
          "Peluruhan Eksponensial (Radioaktif, Penyusutan Nilai Aset): Mₜ = M₀(1 - r)ᵗ atau Mₜ = M₀ · (1/2)^(t / T_setengah).",
          "Menentukan variabel waktu t seringkali memerlukan bantuan logaritma natural atau logaritma basis 10."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Sifat Operasi Eksponen",
        "formula": "aᵐ · aⁿ = aᵐ⁺ⁿ  |  aᵐ / aⁿ = aᵐ⁻ⁿ  |  (aᵐ)ⁿ = aᵐⁿ",
        "desc": "Rumus dasar penyederhanaan pangkat aljabar dengan basis yang sama.",
        "note": "Pastikan basis sudah disamakan terlebih dahulu sebelum menjumlahkan eksponen."
      },
      {
        "name": "Pangkat Pecahan & Bentuk Akar",
        "formula": "a^(m/n) = ⁿ√(aᵐ)  dan  a⁻ⁿ = 1 / aⁿ",
        "desc": "Konversi antara notasi eksponen rasional dan bentuk radikal akar.",
        "note": "Pangkat pecahan penyebut menunjukkan derajat akar, pembilang menunjukkan pangkat numerus."
      },
      {
        "name": "Merasionalkan Penyebut Sekawan",
        "formula": "c / (√a + √b) = c(√a - √b) / (a - b)",
        "desc": "Trik mengeliminasi bentuk akar pada penyebut pecahan menggunakan perkalian sekawan.",
        "note": "Perhatikan perubahan tanda tambah menjadi kurang atau sebaliknya."
      },
      {
        "name": "Sifat Penjumlahan & Pengurangan Logaritma",
        "formula": "ᵃlog(x · y) = ᵃlog x + ᵃlog y  |  ᵃlog(x / y) = ᵃlog x - ᵃlog y",
        "desc": "Menggabungkan atau memecah logaritma dengan basis yang identik.",
        "note": "Basis logaritma harus bernilai sama persis untuk menerapkan penggabungan."
      },
      {
        "name": "Sifat Pangkat & Rantai Logaritma",
        "formula": "ᵃᵐlog(bⁿ) = (n / m) · ᵃlog b  |  ᵃlog b · ᵇlog c = ᵃlog c",
        "desc": "Mempermudah kalkulasi logaritma bertingkat dan perkalian logaritma silang.",
        "note": "Sangat efektif untuk menyelesaikan soal UTBK dan Ujian Sekolah tanpa kalkulator."
      }
    ],
    "examples": [
      {
        "question": "Sederhanakan bentuk eksponen berikut: (2³ · 3⁻² · 5) / (2⁻¹ · 3 · 5⁻²).",
        "level": "Basic",
        "steps": [
          "Kelompokkan setiap faktor berdasarkan bilangan basis yang sama: 2, 3, dan 5.",
          "Terapkan aturan pembagian eksponen aᵐ / aⁿ = aᵐ⁻ⁿ: untuk basis 2: 2^(3 - (-1)) = 2⁴ = 16.",
          "Untuk basis 3: 3^(-2 - 1) = 3⁻³ = 1 / 27.",
          "Untuk basis 5: 5^(1 - (-2)) = 5³ = 125.",
          "Kalikan hasil seluruh basis: (16 · 125) / 27 = 2000 / 27."
        ],
        "answer": "2000 / 27",
        "tips": "Kurangkan pangkat pembilang dengan pangkat penyebut secara teliti saat membagi basis yang sama."
      },
      {
        "question": "Rasionalkan bentuk penyebut dari pecahan: 6 / (√5 - √2).",
        "level": "Intermediate",
        "steps": [
          "Identifikasi bentuk sekawan dari penyebut (√5 - √2), yaitu (√5 + √2).",
          "Kalikan pembilang dan penyebut dengan sekawannya: [6 / (√5 - √2)] · [(√5 + √2) / (√5 + √2)].",
          "Hitung penyebut menggunakan selisih kuadrat (a - b)(a + b) = a² - b²: (√5)² - (√2)² = 5 - 2 = 3.",
          "Bagi pembilang 6 dengan penyebut 3: (6 / 3) · (√5 + √2) = 2(√5 + √2).",
          "Jabarkan hasil perkalian: 2√5 + 2√2."
        ],
        "answer": "2√5 + 2√2",
        "tips": "Jangan buru-buru mendistribusikan pembilang sebelum melihat apakah bisa disederhanakan dengan hasil pengurangan penyebut."
      },
      {
        "question": "Jika ²log 3 = a dan ³log 5 = b, nyatakan ⁶log 15 dalam variabel a dan b!",
        "level": "Advanced",
        "steps": [
          "Gunakan sifat pergantian basis logaritma: ⁶log 15 = (²log 15) / (²log 6).",
          "Faktorkan 15 dan 6 menjadi perkalian faktor prima: 15 = 3 · 5 dan 6 = 2 · 3.",
          "Ubah menjadi penjumlahan logaritma: ⁶log 15 = (²log 3 + ²log 5) / (²log 2 + ²log 3).",
          "Diketahui ²log 3 = a dan ²log 2 = 1. Cari ²log 5 menggunakan sifat rantai: ²log 5 = ²log 3 · ³log 5 = a · b.",
          "Substitusikan seluruh nilai: ⁶log 15 = (a + ab) / (1 + a) = a(1 + b) / (1 + a)."
        ],
        "answer": "a(1 + b) / (1 + a)",
        "tips": "Pilihlah basis pembantu yang paling sering muncul pada variabel yang diketahui (dalam soal ini basis 2)."
      }
    ],
    "quickQuiz": [
      {
        "question": "Berapakah nilai x yang memenuhi persamaan eksponen: 3^(2x - 1) = 81?",
        "options": [
          "x = 2.5",
          "x = 2",
          "x = 3",
          "x = 1.5"
        ],
        "correctIndex": 0,
        "explanation": "81 dapat dituliskan sebagai 3⁴. Maka persamaan menjadi 3^(2x - 1) = 3⁴. Karena basis sama, 2x - 1 = 4 ⟹ 2x = 5 ⟹ x = 2.5."
      },
      {
        "question": "Hasil penyederhanaan dari ³log 54 + ³log 18 - ³log 12 adalah...",
        "options": [
          "4",
          "3",
          "5",
          "6"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan sifat penggabungan logaritma: ³log [(54 · 18) / 12] = ³log [972 / 12] = ³log 81. Karena 3⁴ = 81, maka ³log 81 = 4."
      },
      {
        "question": "Bentuk sederhana dari (√7 + √3)(√7 - √3) adalah...",
        "options": [
          "4",
          "10",
          "2√7",
          "√21"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan sifat aljabar perkalian selisih kuadrat: (a + b)(a - b) = a² - b². Maka (√7)² - (√3)² = 7 - 3 = 4."
      }
    ],
    "example": {
      "question": "Tentukan nilai dari ²log 48 - ²log 3.",
      "steps": [
        "Gunakan sifat pengurangan logaritma: ᵃlog b - ᵃlog c = ᵃlog(b / c).",
        "Hitung ²log (48 / 3) = ²log 16.",
        "Karena 16 = 2⁴, maka ²log 2⁴ = 4 · ²log 2 = 4."
      ],
      "answer": "4"
    }
  },
  {
    "id": "grade-10-quadratics",
    "grade": 10,
    "title": "Persamaan & Fungsi Kuadrat",
    "category": "Algebra & Matrices",
    "icon": "",
    "color": "#fef2f2",
    "accentColor": "#ef4444",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Menentukan akar-akar persamaan kuadrat ax² + bx + c = 0, menganalisis karakteristik kurva parabola, rumus Diskriminan D = b² - 4ac, sumbu simetri, titik puncak optimum, dan menyusun fungsi kuadrat baru.",
    "detailedOverview": "Persamaan dan Fungsi Kuadrat merupakan pilar utama geometri analitis dan aljabar SMA. Fungsi kuadrat memiliki bentuk umum f(x) = ax² + bx + c dengan a ≠ 0, yang grafiknya membentuk kurva mulus simetris bernama parabola. Karakteristik parabola sangat ditentukan oleh koefisien-koefisiennya: tanda koefisien a menentukan keterbukaan parabola (cekung ke atas jika a > 0 atau cekung ke bawah jika a < 0), konstanta c menentukan perpotongan dengan sumbu vertikal Y di titik (0, c), dan nilai Diskriminan D = b² - 4ac menentukan banyaknya titik potong terhadap sumbu horizontal X. Materi ini memiliki aplikasi langsung dalam fisika gerak parabola (trajektori proyektil) serta optimasi keuntungan maksimum dan biaya minimum dalam ekonomi.",
    "coreConcepts": [
      {
        "title": "Metode Menemukan Akar Persamaan Kuadrat",
        "points": [
          "Pemfaktoran: Mengubah ax² + bx + c = 0 menjadi (px + q)(rx + s) = 0.",
          "Melengkapkan Kuadrat Sempurna: Mengubah bentuk persamaan menjadi (x + p)² = q.",
          "Rumus Kuadratik abc: x₁,₂ = (-b ± √(b² - 4ac)) / (2a). Berlaku untuk semua jenis bilangan riil maupun imajiner.",
          "Teorema Vieta (Hubungan Akar): x₁ + x₂ = -b / a, dan x₁ · x₂ = c / a, serta |x₁ - x₂| = √D / |a|."
        ]
      },
      {
        "title": "Peran Nilai Diskriminan (D = b² - 4ac)",
        "points": [
          "D > 0: Persamaan kuadrat memiliki 2 akar riil yang berbeda; grafik parabola memotong sumbu X di dua titik berlainan.",
          "D = 0: Persamaan memiliki 2 akar kembar (1 akar riil); grafik parabola menyinggung sumbu X di tepat satu titik puncak.",
          "D < 0: Persamaan tidak memiliki akar riil (akar imajiner); grafik parabola melayang (tidak pernah memotong atau menyinggung sumbu X).",
          "Kondisi Definit: Definit Positif (selalu bernilai positif di atas sumbu X) jika a > 0 dan D < 0. Definit Negatif (selalu di bawah sumbu X) jika a < 0 dan D < 0."
        ]
      },
      {
        "title": "Sumbu Simetri dan Titik Puncak Parabola",
        "points": [
          "Sumbu simetri merupakan garis vertikal pembagi parabola menjadi dua bagian kongruen: x_p = -b / (2a).",
          "Nilai optimum (ekstrim) fungsional adalah ordinat titik balik: y_p = -D / (4a) = -(b² - 4ac) / (4a).",
          "Koordinat Titik Puncak (Titik Balik): (x_p, y_p) = (-b / (2a), -D / (4a)).",
          "Jika a > 0, titik balik merupakan titik minimum; jika a < 0, titik balik merupakan titik maksimum."
        ]
      },
      {
        "title": "Menyusun Persamaan dan Fungsi Kuadrat",
        "points": [
          "Jika diketahui akar-akarnya x₁ dan x₂: y = a(x - x₁)(x - x₂).",
          "Jika diketahui titik puncak (x_p, y_p) dan satu titik lain: y = a(x - x_p)² + y_p.",
          "Jika diketahui 3 titik sembarang: Substitusikan ke bentuk umum y = ax² + bx + c dan selesaikan SPLTV."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Rumus Kuadratik abc",
        "formula": "x₁,₂ = (-b ± √(b² - 4ac)) / (2a)",
        "desc": "Menemukan akar-akar penyelesaian persamaan kuadrat ax² + bx + c = 0.",
        "note": "Pastikan tanda koefisien b dan c diikutsertakan dengan benar (jangan lupa tanda minus)."
      },
      {
        "name": "Diskriminan Parabola",
        "formula": "D = b² - 4ac",
        "desc": "Menguji jenis akar dan kedudukan grafik parabola terhadap sumbu X.",
        "note": "D > 0 memotong 2 titik, D = 0 menyinggung 1 titik, D < 0 tidak memotong."
      },
      {
        "name": "Teorema Vieta (Jumlah & Hasil Kali Akar)",
        "formula": "x₁ + x₂ = -b / a   dan   x₁ · x₂ = c / a",
        "desc": "Mencari operasi akar tanpa perlu mencari nilai akar satu per satu.",
        "note": "Rumus selisih akar: |x₁ - x₂| = √D / |a|."
      },
      {
        "name": "Koordinat Titik Puncak / Balik",
        "formula": "(x_p, y_p) = (-b / (2a), -D / (4a))",
        "desc": "Menentukan sumbu simetri x_p dan nilai maksimum/minimum y_p dari kurva parabola.",
        "note": "Nilai y_p juga dapat dicari langsung dengan mensubstitusikan nilai x_p ke dalam fungsi f(x_p)."
      },
      {
        "name": "Menyusun Persamaan dari Titik Puncak",
        "formula": "y = a(x - x_p)² + y_p",
        "desc": "Formula vertex form untuk menyusun fungsi kuadrat jika koordinat puncak diketahui.",
        "note": "Cari nilai a dengan mensubstitusikan satu titik lain yang dilalui grafik parabola."
      }
    ],
    "examples": [
      {
        "question": "Tentukan sumbu simetri dan koordinat titik puncak dari fungsi kuadrat: f(x) = 2x² - 8x + 6.",
        "level": "Basic",
        "steps": [
          "Identifikasi koefisien fungsi: a = 2, b = -8, dan c = 6.",
          "Hitung sumbu simetri: x_p = -b / (2a) = -(-8) / (2 · 2) = 8 / 4 = 2.",
          "Hitung nilai optimum y_p dengan substitusi langsung x = 2 ke f(x): f(2) = 2(2)² - 8(2) + 6 = 2(4) - 16 + 6 = 8 - 16 + 6 = -2.",
          "Verifikasi dengan rumus y_p = -D / (4a): D = (-8)² - 4(2)(6) = 64 - 48 = 16. Maka y_p = -16 / (4 · 2) = -16 / 8 = -2.",
          "Jadi, sumbu simetrinya x = 2 dan koordinat titik puncaknya adalah (2, -2)."
        ],
        "answer": "Sumbu simetri x = 2, Titik puncak (2, -2)",
        "tips": "Substitusi langsung x_p ke f(x) seringkali jauh lebih cepat dan minim kesalahan hitung daripada menghitung D terlebih dahulu."
      },
      {
        "question": "Sebuah peluru ditembakkan ke atas dengan persamaan ketinggian h(t) = 40t - 5t² (h dalam meter, t dalam detik). Berapakah tinggi maksimum yang dapat dicapai peluru tersebut?",
        "level": "Intermediate",
        "steps": [
          "Persamaan merupakan fungsi kuadrat terhadap waktu t dengan a = -5, b = 40, dan c = 0.",
          "Tinggi maksimum tercapai pada saat t mencapai sumbu simetri: t_puncak = -b / (2a) = -40 / (2 · (-5)) = -40 / (-10) = 4 detik.",
          "Substitusikan t = 4 ke persamaan ketinggian: h(4) = 40(4) - 5(4)² = 160 - 5(16) = 160 - 80 = 80 meter.",
          "Alternatif memakai rumus Diskriminan: D = 40² - 4(-5)(0) = 1600. h_maks = -D / (4a) = -1600 / (4 · (-5)) = -1600 / (-20) = 80 meter."
        ],
        "answer": "80 meter (tercapai pada detik ke-4)",
        "tips": "Soal gerak proyektil selalu menanyakan nilai y_puncak untuk tinggi maksimum atau x_puncak untuk waktu mencapainya."
      },
      {
        "question": "Jika akar-akar persamaan kuadrat 2x² - 6x + 1 = 0 adalah α dan β, tentukan nilai dari (α / β) + (β / α)!",
        "level": "Advanced",
        "steps": [
          "Dari persamaan 2x² - 6x + 1 = 0, diperoleh a = 2, b = -6, c = 1.",
          "Berdasarkan Teorema Vieta: α + β = -b / a = -(-6) / 2 = 3, dan α · β = c / a = 1 / 2.",
          "Samakan penyebut bentuk yang ditanyakan: (α / β) + (β / α) = (α² + β²) / (α · β).",
          "Ubah pembilang menggunakan manipulasi aljabar kuadrat: α² + β² = (α + β)² - 2αβ = (3)² - 2(1/2) = 9 - 1 = 8.",
          "Bagi dengan penyebut: 8 / (1/2) = 8 · 2 = 16."
        ],
        "answer": "16",
        "tips": "Ingat selalu identitas aljabar: α² + β² = (α + β)² - 2αβ dan (α - β)² = (α + β)² - 4αβ."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jika persamaan kuadrat x² - 6x + k = 0 memiliki dua akar kembar (D = 0), berapakah nilai k?",
        "options": [
          "k = 9",
          "k = -9",
          "k = 36",
          "k = 6"
        ],
        "correctIndex": 0,
        "explanation": "Syarat akar kembar adalah D = 0. D = b² - 4ac = (-6)² - 4(1)(k) = 36 - 4k = 0 ⟹ 4k = 36 ⟹ k = 9."
      },
      {
        "question": "Fungsi kuadrat f(x) = x² - 4x - 5 memotong sumbu X pada titik...",
        "options": [
          "(5, 0) dan (-1, 0)",
          "(-5, 0) dan (1, 0)",
          "(4, 0) dan (-1, 0)",
          "(5, 0) dan (1, 0)"
        ],
        "correctIndex": 0,
        "explanation": "Titik potong sumbu X terjadi saat f(x) = 0. Faktorkan x² - 4x - 5 = 0 menjadi (x - 5)(x + 1) = 0. Diperoleh x = 5 atau x = -1."
      },
      {
        "question": "Grafik fungsi kuadrat f(x) = -x² + 4x - 7 memiliki sifat...",
        "options": [
          "Membuka ke bawah dan tidak memotong sumbu X (Definit Negatif)",
          "Membuka ke atas dan memotong sumbu X di 2 titik",
          "Membuka ke bawah dan menyinggung sumbu X",
          "Membuka ke atas dan berada di atas sumbu X (Definit Positif)"
        ],
        "correctIndex": 0,
        "explanation": "a = -1 < 0 (membuka ke bawah). Nilai D = 4² - 4(-1)(-7) = 16 - 28 = -12 < 0. Karena a < 0 dan D < 0, fungsi ini definit negatif."
      }
    ],
    "example": {
      "question": "Tentukan titik potong fungsi f(x) = x² - 5x + 6 terhadap sumbu X.",
      "steps": [
        "Faktorkan persamaan kuadrat x² - 5x + 6 = 0.",
        "Cari dua angka yang dijumlahkan menghasilkan -5 dan dikalikan menghasilkan 6, yaitu -2 dan -3.",
        "(x - 2)(x - 3) = 0 ⟹ x₁ = 2 atau x₂ = 3."
      ],
      "answer": "(2, 0) dan (3, 0)"
    }
  },
  {
    "id": "grade-10-spltv",
    "grade": 10,
    "title": "Sistem Persamaan Linear Tiga Variabel (SPLTV)",
    "category": "Algebra & Matrices",
    "icon": "",
    "color": "#ecfdf5",
    "accentColor": "#10b981",
    "readTime": "14 min belajar",
    "difficulty": "Medium",
    "summary": "Menyelesaikan sistem persamaan dengan 3 variabel x, y, z menggunakan metode substitusi murni, eliminasi bertingkat, metode campuran, determinan Sarrus (Aturan Cramer), serta pemodelan cerita kontekstual.",
    "detailedOverview": "Sistem Persamaan Linear Tiga Variabel (SPLTV) merupakan pengembangan dari SPLDV di SMP. Secara geometris, persamaan linear tiga variabel a₁x + b₁y + c₁z = d₁ merepresentasikan persamaan suatu bidang datar di dalam ruang tiga dimensi (3D). Titik penyelesaian (x, y, z) adalah titik potong persekutuan dari ketiga bidang tersebut. Terdapat tiga kemungkinan penyelesaian SPLTV: memiliki tepat satu penyelesaian (ketiga bidang berpotongan di satu titik), memiliki banyak penyelesaian tak hingga (bidang berpotongan di sepanjang satu garis lurus atau saling berimpit), atau tidak memiliki penyelesaian sama sekali (bidang saling sejajar atau inkonsisten). Kemahiran menyelesaikan SPLTV sangat esensial dalam memecahkan masalah multivariabel di bidang kimia (penyetaraan reaksi), fisika (hukum Kirchhoff arus rangkaian), dan akuntansi keuangan.",
    "coreConcepts": [
      {
        "title": "Bentuk Umum dan Interpretasi Geometris SPLTV",
        "points": [
          "Bentuk umum: a₁x + b₁y + c₁z = d₁ ; a₂x + b₂y + c₂z = d₂ ; a₃x + b₃y + c₃z = d₃ dengan koefisien bilangan riil.",
          "Himpunan penyelesaian dituliskan dalam bentuk pasangan berurut tripel: HP = {(x, y, z)}.",
          "Representasi visual berupa perpotongan 3 bidang datar di ruang koordinat kartesius 3D.",
          "Sistem dikatakan konsisten jika memiliki minimal satu solusi, dan inkonsisten jika tidak ada solusi yang memenuhi secara serempak."
        ]
      },
      {
        "title": "Metode Campuran (Eliminasi - Substitusi)",
        "points": [
          "Langkah 1: Pilih salah satu variabel yang koefisiennya paling sederhana untuk dieliminasi terlebih dahulu.",
          "Langkah 2: Pasangkan persamaan (1) & (2) lalu eliminasi variabel tersebut untuk mendapatkan Persamaan Linear Dua Variabel baru (Persamaan 4).",
          "Langkah 3: Pasangkan persamaan (1) & (3) atau (2) & (3), eliminasi variabel yang sama untuk menghasilkan Persamaan 5.",
          "Langkah 4: Selesaikan sistem SPLDV (Persamaan 4 & 5) untuk mendapatkan nilai dua variabel pertama.",
          "Langkah 5: Lakukan substitusi balik nilai kedua variabel ke salah satu persamaan awal untuk menemukan nilai variabel ketiga."
        ]
      },
      {
        "title": "Metode Determinan Cramer (Aturan Sarrus)",
        "points": [
          "Hitung Determinan Utama D yang dibentuk dari koefisien variabel x, y, z.",
          "Hitung D_x dengan mengganti kolom koefisien x menggunakan kolom konstanta hasil (d₁, d₂, d₃).",
          "Hitung D_y dengan mengganti kolom y, dan D_z dengan mengganti kolom z menggunakan konstanta hasil.",
          "Nilai variabel dihitung dengan rasio: x = D_x / D, y = D_y / D, dan z = D_z / D dengan syarat D ≠ 0."
        ]
      },
      {
        "title": "Strategi Pemodelan Soal Cerita Kontekstual",
        "points": [
          "Tetapkan variabel pemisalan secara eksplisit: misal x = harga 1 kg beras, y = harga 1 kg gula, z = harga 1 liter minyak.",
          "Terjemahkan setiap kalimat narasi transaksi belanja menjadi satu persamaan matematika mandiri.",
          "Pastikan jumlah persamaan independen tepat sama dengan jumlah variabel yang dicari (3 persamaan untuk 3 variabel)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Bentuk Umum SPLTV",
        "formula": "a₁x + b₁y + c₁z = d₁  |  a₂x + b₂y + c₂z = d₂  |  a₃x + b₃y + c₃z = d₃",
        "desc": "Representasi standar sistem 3 persamaan dengan 3 variabel aljabar riil.",
        "note": "Urutkan posisi suku x, y, dan z sejajar ke bawah sebelum memulai eliminasi."
      },
      {
        "name": "Determinan Sarrus 3x3",
        "formula": "D = (aei + bfg + cdh) - (ceg + afh + bdi)",
        "desc": "Menghitung nilai determinan matriks ordo 3x3 dengan menambahkan 2 kolom pertama di sebelah kanan.",
        "note": "Diagonal miring ke kanan bernilai positif (+), diagonal miring ke kiri bernilai negatif (-)."
      },
      {
        "name": "Aturan Cramer SPLTV",
        "formula": "x = D_x / D   |   y = D_y / D   |   z = D_z / D",
        "desc": "Mencari nilai tripel solusi x, y, z secara langsung menggunakan determinan.",
        "note": "Berlaku hanya jika determinan utama D ≠ 0."
      },
      {
        "name": "Kriteria Jenis Solusi SPLTV",
        "formula": "D ≠ 0 (Solusi Tunggal)  |  D = D_x = D_y = D_z = 0 (Banyak Solusi)",
        "desc": "Menguji apakah sistem memiliki satu solusi, banyak solusi, atau tidak ada penyelesaian.",
        "note": "Jika D = 0 namun salah satu D_x, D_y, atau D_z ≠ 0, maka sistem tidak memiliki solusi."
      }
    ],
    "examples": [
      {
        "question": "Selesaikan SPLTV berikut: (1) x + y + z = 6 ; (2) 2x - y + z = 3 ; (3) x + 2y - z = 2. Tentukan nilai x, y, dan z!",
        "level": "Basic",
        "steps": [
          "Eliminasi z dengan menjumlahkan persamaan (1) dan (3): (x + y + z) + (x + 2y - z) = 6 + 2 ⟹ 2x + 3y = 8 ... (Persamaan 4).",
          "Eliminasi z dari persamaan (1) dan (2) dengan mengurangkan (2) - (1): (2x - y + z) - (x + y + z) = 3 - 6 ⟹ x - 2y = -3 ⟹ x = 2y - 3 ... (Persamaan 5).",
          "Substitusikan Persamaan 5 ke Persamaan 4: 2(2y - 3) + 3y = 8 ⟹ 4y - 6 + 3y = 8 ⟹ 7y = 14 ⟹ y = 2.",
          "Cari nilai x dengan memasukkan y = 2 ke Persamaan 5: x = 2(2) - 3 = 4 - 3 = 1.",
          "Cari nilai z dengan memasukkan x = 1 dan y = 2 ke persamaan (1): 1 + 2 + z = 6 ⟹ 3 + z = 6 ⟹ z = 3."
        ],
        "answer": "x = 1, y = 2, z = 3 atau HP = {(1, 2, 3)}",
        "tips": "Perhatikan variabel yang memiliki koefisien sama atau berlawanan tanda (+z dan -z) agar mudah dieliminasi dengan satu operasi penjumlahan."
      },
      {
        "question": "Ali, Budi, dan Cici membeli alat tulis di toko yang sama. Ali membeli 2 buku, 1 pulpen, dan 1 penggaris seharga Rp17.000. Budi membeli 1 buku, 2 pulpen, dan 1 penggaris seharga Rp16.000. Cici membeli 3 buku, 2 pulpen, dan 1 penggaris seharga Rp25.000. Berapakah harga masing-masing 1 buku, 1 pulpen, dan 1 penggaris?",
        "level": "Intermediate",
        "steps": [
          "Misalkan: x = harga 1 buku, y = harga 1 pulpen, z = harga 1 penggaris.",
          "Susun model matematika: (1) 2x + y + z = 17.000 ; (2) x + 2y + z = 16.000 ; (3) 3x + 2y + z = 25.000.",
          "Eliminasi z dengan mengurangkan (3) - (2): (3x + 2y + z) - (x + 2y + z) = 25.000 - 16.000 ⟹ 2x = 9.000 ⟹ x = 4.500 (Harga 1 buku).",
          "Kurangkan persamaan (1) - (2): (2x + y + z) - (x + 2y + z) = 17.000 - 16.000 ⟹ x - y = 1.000 ⟹ 4.500 - y = 1.000 ⟹ y = 3.500 (Harga 1 pulpen).",
          "Substitusikan x = 4.500 dan y = 3.500 ke persamaan (1): 2(4.500) + 3.500 + z = 17.000 ⟹ 9.000 + 3.500 + z = 17.000 ⟹ 12.500 + z = 17.000 ⟹ z = 4.500 (Harga 1 penggaris)."
        ],
        "answer": "Buku = Rp4.500, Pulpen = Rp3.500, Penggaris = Rp4.500",
        "tips": "Mengurangkan persamaan yang memiliki koefisien 2 variabel identik (seperti 2y + z pada persamaan 2 dan 3) langsung memberikan nilai satu variabel tanpa perlu langkah eliminasi tambahan."
      },
      {
        "question": "Diberikan SPLTV: x + y + z = 3 ; x + 2y + 3z = 4 ; x + 4y + 9z = 6. Hitunglah nilai variabel z menggunakan metode determinan Cramer!",
        "level": "Advanced",
        "steps": [
          "Bentuk matriks koefisien utama: baris 1 = [1, 1, 1], baris 2 = [1, 2, 3], baris 3 = [1, 4, 9]. Matriks konstanta hasil = [3, 4, 6]ᵀ.",
          "Hitung determinan D dengan Aturan Sarrus: D = [(1·2·9) + (1·3·1) + (1·1·4)] - [(1·2·1) + (1·3·4) + (1·1·9)] = (18 + 3 + 4) - (2 + 12 + 9) = 25 - 23 = 2.",
          "Bentuk matriks D_z dengan mengganti kolom ketiga dengan konstanta: baris 1 = [1, 1, 3], baris 2 = [1, 2, 4], baris 3 = [1, 4, 6].",
          "Hitung D_z: D_z = [(1·2·6) + (1·4·1) + (3·1·4)] - [(3·2·1) + (1·4·4) + (1·1·6)] = (12 + 4 + 12) - (6 + 16 + 6) = 28 - 28 = 0.",
          "Hitung nilai z dengan aturan Cramer: z = D_z / D = 0 / 2 = 0."
        ],
        "answer": "z = 0",
        "tips": "Determinan matriks Vandermonde ini memiliki pola khusus. Selalu hitung diagonal utama positif dan diagonal sekunder negatif secara terpisah agar tidak keliru tanda."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jika diketahui SPLTV dengan x + y = 5, y + z = 7, dan x + z = 6, berapakah nilai dari x + y + z?",
        "options": [
          "9",
          "18",
          "8",
          "12"
        ],
        "correctIndex": 0,
        "explanation": "Jumlahkan ketiga persamaan sekaligus: (x + y) + (y + z) + (x + z) = 5 + 7 + 6 ⟹ 2x + 2y + 2z = 18 ⟹ 2(x + y + z) = 18 ⟹ x + y + z = 9."
      },
      {
        "question": "Jika dalam penyelesaian aturan Cramer diperoleh D = 0 dan D_x = 5, maka sistem persamaan linear tersebut...",
        "options": [
          "Tidak memiliki himpunan penyelesaian (inkonsisten)",
          "Memiliki tepat satu himpunan penyelesaian",
          "Memiliki tak terhingga banyak penyelesaian",
          "Memiliki nilai x = 0"
        ],
        "correctIndex": 0,
        "explanation": "Pembagian x = D_x / D = 5 / 0 tidak terdefinisi (menghasilkan inkonsistensi matematis). Artinya ketiga bidang tidak berpotongan di satu titik persekutuan sehingga tidak memiliki solusi."
      },
      {
        "question": "Dari sistem: x + y + z = 12, y + z = 7, dan z = 3, berapakah nilai dari perkalian x · y · z?",
        "options": [
          "60",
          "45",
          "36",
          "84"
        ],
        "correctIndex": 0,
        "explanation": "x + (y + z) = 12 ⟹ x + 7 = 12 ⟹ x = 5. Karena z = 3 dan y + z = 7 ⟹ y + 3 = 7 ⟹ y = 4. Maka x · y · z = 5 · 4 · 3 = 60."
      }
    ],
    "example": {
      "question": "Tentukan nilai x dari sistem: x + y + z = 10, y + z = 6.",
      "steps": [
        "Substitusikan (y + z) = 6 ke dalam persamaan pertama.",
        "x + 6 = 10.",
        "x = 10 - 6 = 4."
      ],
      "answer": "x = 4"
    }
  },
  {
    "id": "grade-10-trigonometry",
    "grade": 10,
    "title": "Trigonometri Dasar & Aturan Segitiga",
    "category": "Trigonometry",
    "icon": "",
    "color": "#eff6ff",
    "accentColor": "#3b82f6",
    "readTime": "16 min belajar",
    "difficulty": "Medium",
    "summary": "Perbandingan trigonometri segitiga siku-siku (sin, cos, tan, csc, sec, cot), nilai sudut istimewa, aturan kuadran sudut berelasi, Aturan Sinus, Aturan Kosinus, dan rumus luas segitiga sembarang.",
    "detailedOverview": "Trigonometri merupakan cabang matematika yang mempelajari hubungan antara sudut dan panjang sisi-sisi segitiga. Bermula dari perbandingan sisi pada segitiga siku-siku (Sindemi, Cossami, Tandesa), trigonometri diperluas ke sistem lingkaran satuan (unit circle) untuk mendefinisikan nilai trigonometri sudut berapapun di keempat kuadran Cartesius. Pada segitiga sembarang (bukan siku-siku), hukum trigonometri diwujudkan dalam Aturan Sinus (digunakan saat diketahui pasangan sisi-sudut bersesuaian) dan Aturan Kosinus (digunakan saat diketahui dua sisi dan sudut apit atau ketiga sisinya). Materi ini diaplikasikan secara luas dalam teknik navigasi kapal, pengukuran ketinggian gedung/gunung (teodolit), astronomi, dan grafik komputer 3D.",
    "coreConcepts": [
      {
        "title": "Perbandingan Trigonometri Segitiga Siku-Siku",
        "points": [
          "Sinus (sin α) = sisi depan / sisi miring (Sindemi).",
          "Cosinus (cos α) = sisi samping / sisi miring (Cossami).",
          "Tangen (tan α) = sisi depan / sisi samping (Tandesa) = sin α / cos α.",
          "Kebalikan Trigonometri: Cosecan (csc α = 1 / sin α), Secan (sec α = 1 / cos α), Cotangen (cot α = 1 / tan α).",
          "Identitas Dasar Pythagoras: sin² α + cos² α = 1, 1 + tan² α = sec² α, 1 + cot² α = csc² α."
        ]
      },
      {
        "title": "Sudut Istimewa dan Sudut Berelasi di 4 Kuadran",
        "points": [
          "Sudut istimewa wajib hafal: 0°, 30°, 45°, 60°, 90°.",
          "Aturan Kuadran (ASTC - All Sin Tan Cos): Kuadran I (0°-90°) semua positif; Kuadran II (90°-180°) hanya sin & csc positif; Kuadran III (180°-270°) hanya tan & cot positif; Kuadran IV (270°-360°) hanya cos & sec positif.",
          "Relasi sudut (180° ± α) dan (360° - α) mempertahankan nama fungsi trigonometri (sin tetap sin, cos tetap cos).",
          "Relasi sudut (90° ± α) dan (270° ± α) membalik fungsi menjadi kofungsinya (sin menjadi cos, cos menjadi sin, tan menjadi cot)."
        ]
      },
      {
        "title": "Aturan Sinus dan Aturan Kosinus",
        "points": [
          "Aturan Sinus: a / sin A = b / sin B = c / sin C = 2R (R = jari-jari lingkaran luar segitiga). Digunakan jika diketahui minimal satu pasang sisi dan sudut yang berhadapan.",
          "Aturan Kosinus: a² = b² + c² - 2bc cos A ; b² = a² + c² - 2ac cos B ; c² = a² + b² - 2ab cos C.",
          "Aturan kosinus digunakan jika diketahui: (1) Dua sisi dan satu sudut yang diapitnya (SAS), atau (2) Ketiga sisi segitiga diketahui (SSS) untuk mencari besar sudut: cos A = (b² + c² - a²) / (2bc)."
        ]
      },
      {
        "title": "Luas Segitiga Berdasarkan Trigonometri",
        "points": [
          "Luas dengan dua sisi dan satu sudut apit: L = 1/2 · a · b · sin C = 1/2 · a · c · sin B = 1/2 · b · c · sin A.",
          "Luas jika diketahui ketiga sisi (Rumus Heron): L = √(s(s - a)(s - b)(s - c)) dengan semiperimeter s = (a + b + c) / 2."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Perbandingan Sisi Siku-Siku",
        "formula": "sin α = y / r  |  cos α = x / r  |  tan α = y / x",
        "desc": "Definisi perbandingan segitiga siku-siku dengan koordinat Cartesius (r = √(x² + y²)).",
        "note": "Hafalkan jembatan keledai: Sindemi (depan/miring), Cossami (samping/miring), Tandesa (depan/samping)."
      },
      {
        "name": "Identitas Pythagoras Trigonometri",
        "formula": "sin² α + cos² α = 1   |   1 + tan² α = sec² α",
        "desc": "Identitas fundamental untuk mengkonversi nilai fungsi trigonometri satu ke lainnya.",
        "note": "Dapat diturunkan langsung dari teorema Pythagoras x² + y² = r² dengan membagi r²."
      },
      {
        "name": "Aturan Sinus Segitiga",
        "formula": "a / sin A = b / sin B = c / sin C",
        "desc": "Perbandingan panjang sisi dengan nilai sinus sudut di hadapannya bernilai sama.",
        "note": "Sangat efektif untuk menghitung panjang sisi ketika dua sudut dan satu sisi diketahui."
      },
      {
        "name": "Aturan Kosinus Segitiga",
        "formula": "a² = b² + c² - 2bc cos A   |   cos A = (b² + c² - a²) / (2bc)",
        "desc": "Generalisasi teorema Pythagoras untuk segitiga sembarang.",
        "note": "Perhatikan bahwa jika sudut A tumpul (A > 90°), maka nilai cos A bernilai negatif."
      },
      {
        "name": "Luas Segitiga Sembarang",
        "formula": "L = 1/2 · a · b · sin C   |   L = √(s(s - a)(s - b)(s - c))",
        "desc": "Menghitung luas daerah segitiga tanpa memerlukan panjang garis tinggi.",
        "note": "Pada rumus Heron, s adalah setengah keliling segitiga: s = (a + b + c) / 2."
      }
    ],
    "examples": [
      {
        "question": "Diketahui sin α = 3/5 dan sudut α berada di kuadran II (90° < α < 180°). Tentukan nilai dari cos α dan tan α!",
        "level": "Basic",
        "steps": [
          "Dari definisi sin α = y / r = 3 / 5, diperoleh sisi depan y = 3 dan sisi miring r = 5.",
          "Gunakan teorema Pythagoras untuk mencari sisi samping x: x = √(r² - y²) = √(5² - 3²) = √(25 - 9) = √16 = 4.",
          "Analisis tanda di Kuadran II: nilai cosinus bertanda negatif (-) dan tangen bertanda negatif (-).",
          "Hitung nilai cosinus: cos α = -x / r = -4 / 5.",
          "Hitung nilai tangen: tan α = y / (-x) = 3 / (-4) = -3/4."
        ],
        "answer": "cos α = -4/5, tan α = -3/4",
        "tips": "Selalu periksa kuadran sudut! Di Kuadran II, hanya sinus dan cosecan yang bernilai positif."
      },
      {
        "question": "Pada segitiga ABC, panjang sisi b = 8 cm, sisi c = 6 cm, dan besar sudut A = 60°. Tentukan panjang sisi a!",
        "level": "Intermediate",
        "steps": [
          "Diketahui dua sisi dan satu sudut apit (b, c, dan sudut A). Gunakan Aturan Kosinus: a² = b² + c² - 2bc cos A.",
          "Substitusikan nilai yang diketahui: a² = 8² + 6² - 2(8)(6) cos 60°.",
          "Hitung kuadrat dan nilai cos 60° = 1/2: a² = 64 + 36 - 96(1/2).",
          "Sederhanakan: a² = 100 - 48 = 52.",
          "Tarik akar kuadrat: a = √52 = √(4 · 13) = 2√13 cm."
        ],
        "answer": "2√13 cm",
        "tips": "Sudut istimewa 60° memiliki cosinus tepat 0.5 (1/2), sehingga perkalian 2bc cos A dapat disederhanakan dengan cepat."
      },
      {
        "question": "Sebuah segitiga memiliki panjang sisi masing-masing 5 cm, 6 cm, dan 7 cm. Hitunglah luas segitiga tersebut menggunakan rumus Heron!",
        "level": "Advanced",
        "steps": [
          "Tentukan semiperimeter (setengah keliling) s: s = (a + b + c) / 2 = (5 + 6 + 7) / 2 = 18 / 2 = 9 cm.",
          "Hitung masing-masing selisih (s - a), (s - b), dan (s - c): (s - a) = 9 - 5 = 4 ; (s - b) = 9 - 6 = 3 ; (s - c) = 9 - 7 = 2.",
          "Masukkan ke dalam rumus Heron: L = √(s(s - a)(s - b)(s - c)) = √(9 · 4 · 3 · 2).",
          "Keluarkan bilangan kuadrat sempurna dari dalam tanda akar: √9 = 3 dan √4 = 2. Maka L = 3 · 2 · √(3 · 2) = 6√6 cm²."
        ],
        "answer": "6√6 cm²",
        "tips": "Jangan mengalikan semua angka di dalam akar menjadi angka besar (√(216)), faktorkan menjadi kuadrat sempurna agar langsung bisa ditarik akar."
      }
    ],
    "quickQuiz": [
      {
        "question": "Nilai dari cos 150° adalah...",
        "options": [
          "-1/2 √3",
          "1/2 √3",
          "-1/2",
          "1/2"
        ],
        "correctIndex": 0,
        "explanation": "Sudut 150° berada di Kuadran II. cos 150° = cos (180° - 30°) = -cos 30° = -1/2 √3."
      },
      {
        "question": "Pada segitiga PQR, sisi p = 10 cm, sudut P = 30°, dan sudut Q = 45°. Berapakah panjang sisi q?",
        "options": [
          "10√2 cm",
          "5√2 cm",
          "10√3 cm",
          "20 cm"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan Aturan Sinus: p / sin P = q / sin Q ⟹ 10 / sin 30° = q / sin 45° ⟹ 10 / (1/2) = q / (1/2 √2) ⟹ 20 = q / (1/2 √2) ⟹ q = 20 · (1/2 √2) = 10√2 cm."
      },
      {
        "question": "Luas segitiga dengan panjang dua sisi 8 cm dan 10 cm serta sudut apit 30° adalah...",
        "options": [
          "20 cm²",
          "40 cm²",
          "20√3 cm²",
          "40√3 cm²"
        ],
        "correctIndex": 0,
        "explanation": "L = 1/2 · a · b · sin θ = 1/2 · 8 · 10 · sin 30° = 40 · (1/2) = 20 cm²."
      }
    ],
    "example": {
      "question": "Hitunglah nilai dari sin 30° · cos 60° + cos 30° · sin 60°.",
      "steps": [
        "Masukkan nilai sudut istimewa: sin 30° = 1/2, cos 60° = 1/2, cos 30° = 1/2 √3, sin 60° = 1/2 √3.",
        "(1/2 · 1/2) + (1/2 √3 · 1/2 √3) = 1/4 + 3/4 = 4/4 = 1.",
        "Alternatif identitas sin(A + B) = sin(30° + 60°) = sin 90° = 1."
      ],
      "answer": "1"
    }
  },
  {
    "id": "grade-10-sequences",
    "grade": 10,
    "title": "Barisan & Deret: Aritmatika & Geometri",
    "category": "Sequences & Series",
    "icon": "",
    "color": "#fffbeb",
    "accentColor": "#f59e0b",
    "readTime": "15 min belajar",
    "difficulty": "Easy",
    "summary": "Memahami pola keteraturan barisan aritmatika (beda konstan) dan geometri (rasio konstan), rumus suku ke-n, jumlah deret hingga Sn, deret geometri tak hingga konvergen, dan pemodelan pantulan bola.",
    "detailedOverview": "Barisan dan deret merupakan cabang matematika yang mempelajari susunan bilangan terurut dengan pola keteraturan tertentu. Pada barisan aritmatika, selisih antara dua suku berurutan selalu bernilai tetap yang disebut beda (b). Sementara pada barisan geometri, hasil bagi antara dua suku berurutan bernilai tetap yang disebut rasio (r). Perkembangan materi mencakup penjumlahan berurutan suku-suku barisan (deret), suku tengah, sisipan suku, serta deret geometri tak hingga konvergen (|r| < 1) yang jumlahnya mendekati limit berhingga. Materi ini menjadi fondasi penting dalam matematika keuangan (perhitungan bunga majemuk, anuitas cicilan, penyusutan aset) dan fenomena fisika pemantulan bola elastis.",
    "coreConcepts": [
      {
        "title": "Barisan dan Deret Aritmatika",
        "points": [
          "Ciri khas: Selisih antara suku berurutan konstan, yaitu beda b = Uₙ - Uₙ₋₁.",
          "Rumus suku ke-n: Uₙ = a + (n - 1)b (dengan a = suku pertama U₁).",
          "Rumus jumlah n suku pertama (Deret): Sₙ = n/2 · (a + Uₙ) = n/2 · [2a + (n - 1)b].",
          "Hubungan esensial antara Uₙ dan Sₙ: Uₙ = Sₙ - Sₙ₋₁ (untuk n ≥ 2).",
          "Suku tengah (untuk n ganjil): U_t = (a + Uₙ) / 2 pada urutan t = (n + 1) / 2."
        ]
      },
      {
        "title": "Barisan dan Deret Geometri",
        "points": [
          "Ciri khas: Perbandingan antara suku berurutan konstan, yaitu rasio r = Uₙ / Uₙ₋₁.",
          "Rumus suku ke-n: Uₙ = a · r^(n - 1).",
          "Rumus jumlah n suku pertama: Sₙ = a(rⁿ - 1) / (r - 1) untuk r > 1, atau Sₙ = a(1 - rⁿ) / (1 - r) untuk r < 1.",
          "Suku tengah geometri (untuk n ganjil): U_t = √(a · Uₙ)."
        ]
      },
      {
        "title": "Deret Geometri Tak Hingga Konvergen",
        "points": [
          "Deret geometri dengan banyak suku mendekati tak terhingga (n → ∞).",
          "Syarat Konvergen: Nilai rasio berada pada rentang -1 < r < 1 (|r| < 1). Suku-sukunya semakin lama semakin mendekati nol.",
          "Rumus jumlah tak hingga: S_∞ = a / (1 - r).",
          "Jika rasio |r| ≥ 1, deret bersifat divergen dan jumlahnya menuju ±∞ (tidak dapat ditentukan nilai limitnya)."
        ]
      },
      {
        "title": "Aplikasi Nyata: Lintasan Pantulan Bola",
        "points": [
          "Sebuah bola dijatuhkan dari ketinggian h dan memantul kembali setinggi a/b dari ketinggian sebelumnya.",
          "Lintasan terdiri dari lintasan turun pertama (h) ditambah dua kali lintasan pantulan naik-turun berikutnya.",
          "Rumus Cepat Panjang Seluruh Lintasan: S_total = h · (b + a) / (b - a)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Suku ke-n Aritmatika & Geometri",
        "formula": "Uₙ = a + (n - 1)b   |   Uₙ = a · r^(n - 1)",
        "desc": "Formula mencari nilai suku ke-n pada posisi tertentu.",
        "note": "a adalah suku pertama, b adalah beda aritmatika, r adalah rasio geometri."
      },
      {
        "name": "Jumlah Deret Hingga (Sₙ)",
        "formula": "Sₙ = n/2 [2a + (n - 1)b]   |   Sₙ = a(rⁿ - 1) / (r - 1)",
        "desc": "Menghitung akumulasi penjumlahan n suku pertama.",
        "note": "Gunakan formula aritmatika jika beda tetap, gunakan formula geometri jika rasio tetap."
      },
      {
        "name": "Deret Geometri Tak Hingga Konvergen",
        "formula": "S_∞ = a / (1 - r)   dengan syarat -1 < r < 1",
        "desc": "Jumlah limit tak berhingga dari deret geometri dengan rasio pecahan mengecil.",
        "note": "Disebut konvergen karena memiliki limit jumlah tertentu yang pasti."
      },
      {
        "name": "Trik Lintasan Bola Memantul",
        "formula": "S_lintasan = h · (b + a) / (b - a)",
        "desc": "Menghitung total panjang lintasan bola dari awal jatuh hingga berhenti memantul.",
        "note": "h = tinggi awal, a/b = rasio pantulan bola (contoh: memantul 3/4 kali tinggi semula)."
      },
      {
        "name": "Hubungan Suku dan Jumlah",
        "formula": "Uₙ = Sₙ - Sₙ₋₁",
        "desc": "Menemukan rumus suku ke-n jika rumus jumlah deret Sₙ diketahui.",
        "note": "Sangat sering diujikan pada UTBK SBMPTN/SNBT dan Penilaian Akhir Semester."
      }
    ],
    "examples": [
      {
        "question": "Diketahui barisan aritmatika: 3, 7, 11, 15, ... Tentukan suku ke-20 dan jumlah 20 suku pertama (S₂₀)!",
        "level": "Basic",
        "steps": [
          "Identifikasi suku pertama a = 3 dan beda b = 7 - 3 = 4.",
          "Hitung suku ke-20 menggunakan rumus Uₙ = a + (n - 1)b: U₂₀ = 3 + (20 - 1) · 4 = 3 + 19 · 4 = 3 + 76 = 79.",
          "Hitung jumlah 20 suku pertama dengan rumus Sₙ = n/2 · (a + Uₙ): S₂₀ = 20/2 · (3 + 79) = 10 · 82 = 820.",
          "Alternatif dengan Sₙ = n/2 [2a + (n - 1)b]: S₂₀ = 10 · [2(3) + 19(4)] = 10 · [6 + 76] = 10 · 82 = 820."
        ],
        "answer": "U₂₀ = 79 dan S₂₀ = 820",
        "tips": "Jika suku terakhir Uₙ sudah dihitung, gunakan rumus Sₙ = n/2 (a + Uₙ) karena jauh lebih ringkas."
      },
      {
        "question": "Dari suatu barisan geometri diketahui suku ke-3 adalah 18 dan suku ke-6 adalah 486. Tentukan suku pertama (a) dan rasio (r) barisan tersebut!",
        "level": "Intermediate",
        "steps": [
          "Tuliskan rumus suku geometri: U₃ = a · r² = 18 ... (Persamaan 1) dan U₆ = a · r⁵ = 486 ... (Persamaan 2).",
          "Bagi persamaan (2) dengan persamaan (1): (a · r⁵) / (a · r²) = 486 / 18.",
          "Sederhanakan variabel: r³ = 27 ⟹ r = ∛27 = 3 (Rasio r = 3).",
          "Substitusikan nilai r = 3 ke persamaan (1): a · (3)² = 18 ⟹ a · 9 = 18 ⟹ a = 2 (Suku pertama a = 2).",
          "Verifikasi: Barisan tersebut adalah 2, 6, 18, 54, 162, 486 (Terbukti benar)."
        ],
        "answer": "a = 2 dan r = 3",
        "tips": "Untuk barisan geometri, lakukan eliminasi dengan membagi persamaan satu terhadap persamaan lainnya untuk mencoret variabel a."
      },
      {
        "question": "Sebuah bola dijatuhkan dari ketinggian 12 meter ke lantai. Setiap kali memantul, bola mencapai ketinggian 3/4 dari tinggi pantulan sebelumnya. Hitunglah total panjang lintasan yang ditempuh bola hingga berhenti!",
        "level": "Advanced",
        "steps": [
          "Tinggi awal h = 12 meter. Rasio pantulan r = 3/4 (maka a = 3 dan b = 4).",
          "Gunakan Rumus Cepat Lintasan Pantulan Bola: S_total = h · (b + a) / (b - a).",
          "Substitusikan nilai h = 12, a = 3, b = 4: S_total = 12 · (4 + 3) / (4 - 3).",
          "Sederhanakan pecahan: S_total = 12 · (7 / 1) = 84 meter.",
          "Verifikasi cara konvensional: Lintasan turun pertama = 12 m. Lintasan naik-turun berikutnya membentuk deret geometri tak hingga dengan suku pertama naik a_naik = 12 · 3/4 = 9 m. S_∞ = a / (1 - r) = 9 / (1 - 3/4) = 9 / (1/4) = 36 m. Total = 12 + 2 · (36) = 12 + 72 = 84 meter."
        ],
        "answer": "84 meter",
        "tips": "Rumus cepat h · (b + a) / (b - a) menghemat banyak waktu saat ujian dan menghindari kesalahan hitung deret dua kali."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jumlah deret geometri tak hingga 16 + 8 + 4 + 2 + ... adalah...",
        "options": [
          "32",
          "24",
          "48",
          "64"
        ],
        "correctIndex": 0,
        "explanation": "Suku pertama a = 16, rasio r = 8/16 = 1/2. Karena |r| < 1, gunakan S_∞ = a / (1 - r) = 16 / (1 - 1/2) = 16 / (1/2) = 32."
      },
      {
        "question": "Jika rumus jumlah n suku pertama deret aritmatika adalah Sₙ = 3n² - 2n, berapakah nilai suku ke-5 (U₅)?",
        "options": [
          "25",
          "27",
          "29",
          "23"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan hubungan Uₙ = Sₙ - Sₙ₋₁. S₅ = 3(5)² - 2(5) = 75 - 10 = 65. S₄ = 3(4)² - 2(4) = 48 - 8 = 40. Maka U₅ = 65 - 40 = 25."
      },
      {
        "question": "Di antara angka 2 dan 18 disisipkan 3 bilangan sehingga membentuk barisan aritmatika baru. Beda barisan baru tersebut adalah...",
        "options": [
          "4",
          "3",
          "5",
          "2"
        ],
        "correctIndex": 0,
        "explanation": "Rumus sisipan beda baru: b' = (y - x) / (k + 1) dengan x = 2, y = 18, dan k = 3. Maka b' = (18 - 2) / (3 + 1) = 16 / 4 = 4. Barisannya adalah: 2, 6, 10, 14, 18."
      }
    ],
    "example": {
      "question": "Tentukan suku ke-10 barisan aritmatika: 4, 9, 14, 19, ...",
      "steps": [
        "a = 4, b = 9 - 4 = 5.",
        "U₁₀ = a + (10 - 1)b = 4 + 9(5) = 4 + 45 = 49."
      ],
      "answer": "49"
    }
  }
];

// ============================================================================
// KELAS 11: 5 MODUL MATEMATIKA KURIKULUM LENGKAP
// ============================================================================
export const MATERI_KELAS_11: MathTopic[] = [
  {
    "id": "grade-11-functions",
    "grade": 11,
    "title": "Fungsi Komposisi & Invers",
    "category": "Algebra & Matrices",
    "icon": "",
    "color": "#f3e8ff",
    "accentColor": "#9333ea",
    "readTime": "16 min belajar",
    "difficulty": "Medium",
    "summary": "Operasi aljabar fungsi, konsep penggabungan fungsi komposisi (f ∘ g)(x), sifat non-komutatif & asosiatif, fungsi invers f⁻¹(x), syarat fungsi bijektif, rumus cepat invers pecahan linear (ax+b)/(cx+d), dan invers komposisi.",
    "detailedOverview": "Materi Fungsi Komposisi dan Fungsi Invers merupakan materi fundamental kalkulus dan aljabar analitis kelas 11 SMA. Komposisi fungsi menggabungkan dua atau lebih fungsi matematis secara berurutan, di mana luaran (range) dari fungsi pertama menjadi masukan (domain) bagi fungsi kedua: (f ∘ g)(x) = f(g(x)). Operasi ini mensyaratkan adanya irisan antara daerah hasil fungsi awal dengan daerah asal fungsi lanjutan. Sementara itu, fungsi invers f⁻¹(x) merupakan operasi pembalikan arah relasi yang memetakan kembali kodomain menuju domain asalnya. Invers suatu fungsi HANYA akan menghasilkan fungsi invers sejati jika fungsi tersebut bersifat bijektif (korespondensi satu-satu). Materi ini memodelkan proses bertahap pada industri manufaktur (seperti pemrosesan bahan kayu gelondongan menjadi perabot mebel finishing, atau penggilingan gabah menjadi beras super).",
    "coreConcepts": [
      {
        "title": "Konsep Dasar dan Syarat Komposisi Fungsi",
        "points": [
          "Definisi: (f ∘ g)(x) = f(g(x)), artinya fungsi g dikerjakan lebih dahulu, lalu hasilnya dimasukkan ke dalam fungsi f.",
          "Syarat Komposisi: Komposisi (f ∘ g) terdefinisi jika dan hanya jika irisan daerah hasil g dengan daerah asal f tidak kosong: R_g ∩ D_f ≠ ∅.",
          "Menentukan fungsi komponen pembentuk: Jika diketahui (f ∘ g)(x) dan f(x), fungsi g(x) dapat dicari melalui pemisalan aljabar atau manipulasi ruas.",
          "Penerapan bertahap: Proses bertahap seperti mesin I mengubah bahan mentah menjadi barang setengah jadi f(x), lalu mesin II mengubahnya menjadi barang jadi g(f(x))."
        ]
      },
      {
        "title": "Sifat-Sifat Komposisi Fungsi",
        "points": [
          "Tidak Komutatif: Pada umumnya (f ∘ g)(x) ≠ (g ∘ f)(x). Urutan pengoperasian fungsi sangat mempengaruhi hasil akhir.",
          "Asosiatif: Pada komposisi tiga fungsi berlaku ((f ∘ g) ∘ h)(x) = (f ∘ (g ∘ h))(x).",
          "Fungsi Identitas I(x) = x: Memenuhi sifat identitas (f ∘ I)(x) = (I ∘ f)(x) = f(x)."
        ]
      },
      {
        "title": "Fungsi Invers dan Syarat Bijektif",
        "points": [
          "Definisi: Jika f memetakan A ke B (y = f(x)), maka f⁻¹ memetakan B kembali ke A (x = f⁻¹(y)).",
          "Syarat Eksistensi: Fungsi f memiliki fungsi invers jika dan hanya jika f adalah fungsi bijektif (injektif/satu-satu sekaligus surjektif/pada).",
          "Fungsi kuadrat f(x) = ax² + bx + c tidak bijektif pada domain bilangan riil R, sehingga domainnya harus dibatasi (misal x ≥ -b/(2a)) agar memiliki fungsi invers.",
          "Langkah mencari invers: (1) Misalkan f(x) = y, (2) Nyatakan variabel x dalam variabel y, (3) Ganti x menjadi f⁻¹(x) dan ganti variabel y menjadi x."
        ]
      },
      {
        "title": "Invers Fungsi Komposisi",
        "points": [
          "Urutan pembalikan terbalik: (f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x).",
          "Begitu pula sebaliknya: (g ∘ f)⁻¹(x) = (f⁻¹ ∘ g⁻¹)(x).",
          "Sifat pembatalan (involusi): (f⁻¹)⁻¹(x) = f(x) dan (f ∘ f⁻¹)(x) = (f⁻¹ ∘ f)(x) = x."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Definisi Komposisi Fungsi",
        "formula": "(f ∘ g)(x) = f(g(x))   dan   (g ∘ f)(x) = g(f(x))",
        "desc": "Menggabungkan dua fungsi secara berurutan.",
        "note": "Perhatikan bahwa fungsi yang berada di kanan selalu diproses lebih dahulu."
      },
      {
        "name": "Trik Cepat Invers Pecahan Linear",
        "formula": "f(x) = (ax + b) / (cx + d)  ⟹  f⁻¹(x) = (-dx + b) / (cx - a)",
        "desc": "Trik cepat mencari invers fungsi rasional dengan menukar posisi koefisien a dan d serta membalik tandanya.",
        "note": "Koefisien b dan c tetap berada di posisinya tanpa perubahan tanda."
      },
      {
        "name": "Invers Fungsi Linear Sederhana",
        "formula": "f(x) = ax + b  ⟹  f⁻¹(x) = (x - b) / a",
        "desc": "Formula kilat invers fungsi berderajat satu.",
        "note": "Dapat langsung digunakan tanpa langkah pemisalan aljabar panjang."
      },
      {
        "name": "Invers Fungsi Komposisi",
        "formula": "(f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x)",
        "desc": "Invers dari komposisi fungsi setara dengan mengkomposisikan masing-masing fungsi invers dalam urutan terbalik.",
        "note": "Bisa dihitung dengan mencari komposisinya terlebih dahulu lalu diinverskan, atau sebaliknya."
      },
      {
        "name": "Invers Fungsi Bentuk Akar",
        "formula": "f(x) = ⁿ√(ax + b)  ⟹  f⁻¹(x) = (xⁿ - b) / a",
        "desc": "Invers fungsi radikal akar ke pangkat aljabar.",
        "note": "Pastikan domain dibatasi sesuai batas daerah hasil fungsi akar."
      }
    ],
    "examples": [
      {
        "question": "Diketahui f(x) = 2x² + 1 dan g(x) = x + 3. Tentukan rumus dari (f ∘ g)(x) dan (g ∘ f)(x)!",
        "level": "Basic",
        "steps": [
          "Mencari (f ∘ g)(x): Substitusikan g(x) ke dalam f(x): (f ∘ g)(x) = f(g(x)) = f(x + 3).",
          "Gantikan setiap x pada f(x) dengan (x + 3): f(x + 3) = 2(x + 3)² + 1.",
          "Jabarkan bentuk kuadrat: 2(x² + 6x + 9) + 1 = 2x² + 12x + 18 + 1 = 2x² + 12x + 19.",
          "Mencari (g ∘ f)(x): Substitusikan f(x) ke dalam g(x): (g ∘ f)(x) = g(f(x)) = g(2x² + 1).",
          "Gantikan x pada g(x) dengan (2x² + 1): (2x² + 1) + 3 = 2x² + 4.",
          "Terlihat bahwa (f ∘ g)(x) ≠ (g ∘ f)(x) (Membuktikan sifat tidak komutatif)."
        ],
        "answer": "(f ∘ g)(x) = 2x² + 12x + 19 dan (g ∘ f)(x) = 2x² + 4",
        "tips": "Selalu kerjakan tanda kurung kuadrat (x + 3)² = x² + 6x + 9 terlebih dahulu sebelum dikalikan dengan koefisien luar 2."
      },
      {
        "question": "Tentukan rumus fungsi invers dari f(x) = (2x + 1) / (x - 4) untuk x ≠ 4, dan hitunglah nilai dari f⁻¹(5)!",
        "level": "Intermediate",
        "steps": [
          "Gunakan trik cepat pecahan linear f(x) = (ax + b) / (cx + d) ⟹ f⁻¹(x) = (-dx + b) / (cx - a).",
          "Identifikasi koefisien: a = 2, b = 1, c = 1, d = -4.",
          "Tukar posisi a dan d dengan membalik tanda: a = 2 menjadi -a = -2 di penyebut, dan d = -4 menjadi -d = 4 di pembilang.",
          "Diperoleh rumus invers langsung: f⁻¹(x) = (4x + 1) / (x - 2) dengan syarat penyebut x ≠ 2.",
          "Hitung nilai f⁻¹(5) dengan memasukkan x = 5: f⁻¹(5) = (4(5) + 1) / (5 - 2) = (20 + 1) / 3 = 21 / 3 = 7."
        ],
        "answer": "f⁻¹(x) = (4x + 1) / (x - 2) dan f⁻¹(5) = 7",
        "tips": "Trik tukar posisi silang a dan d sangat menghemat waktu saat Ujian Sekolah dan UTBK SNBT!"
      },
      {
        "question": "Diketahui fungsi komposisi (f ∘ g)(x) = 6x² + 9x + 4 dan fungsi f(x) = 3x + 1. Tentukan rumus fungsi g(x)!",
        "level": "Advanced",
        "steps": [
          "Tuliskan definisi komposisi: (f ∘ g)(x) = f(g(x)) = 6x² + 9x + 4.",
          "Karena f(x) = 3x + 1, maka f(g(x)) = 3 · g(x) + 1.",
          "Samakan kedua ruas persamaan: 3 · g(x) + 1 = 6x² + 9x + 4.",
          "Pindahkan konstanta 1 ke ruas kanan: 3 · g(x) = 6x² + 9x + 4 - 1 ⟹ 3 · g(x) = 6x² + 9x + 3.",
          "Bagi kedua ruas dengan 3: g(x) = (6x² + 9x + 3) / 3 = 2x² + 3x + 1."
        ],
        "answer": "g(x) = 2x² + 3x + 1",
        "tips": "Jika fungsi terluar f(x) yang diketahui, langsung substitusikan g(x) ke rumus f(x) lalu lakukan isolasi variabel secara aljabar."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jika f(x) = 2x - 5, maka nilai fungsi invers f⁻¹(7) adalah...",
        "options": [
          "6",
          "1",
          "9",
          "4"
        ],
        "correctIndex": 0,
        "explanation": "f⁻¹(x) = (x + 5) / 2. Maka f⁻¹(7) = (7 + 5) / 2 = 12 / 2 = 6. (Atau setarakan 2x - 5 = 7 ⟹ 2x = 12 ⟹ x = 6)."
      },
      {
        "question": "Diketahui f(x) = 3x - 1 dan g(x) = 2x + 4. Nilai dari (g ∘ f)(2) adalah...",
        "options": [
          "14",
          "13",
          "16",
          "10"
        ],
        "correctIndex": 0,
        "explanation": "Hitung fungsi dalam terlebih dahulu: f(2) = 3(2) - 1 = 6 - 1 = 5. Masukkan ke fungsi luar g(5): g(5) = 2(5) + 4 = 10 + 4 = 14."
      },
      {
        "question": "Manakah di antara fungsi-fungsi berikut yang TIDAK memiliki fungsi invers pada domain bilangan riil R?",
        "options": [
          "f(x) = x² + 4 (Fungsi Kuadrat tanpa pembatasan domain)",
          "f(x) = 3x - 7 (Fungsi Linear)",
          "f(x) = x³ (Fungsi Kubik)",
          "f(x) = (2x + 1) / (x - 3) (Fungsi Pecahan Linear)"
        ],
        "correctIndex": 0,
        "explanation": "Fungsi f(x) = x² + 4 bukan fungsi bijektif (tidak injektif/satu-satu) karena untuk nilai x = 2 dan x = -2 menghasilkan bayangan yang sama yaitu y = 8. Maka inversnya bukan berupa fungsi."
      }
    ],
    "example": {
      "question": "Tentukan invers dari f(x) = 4x - 8.",
      "steps": [
        "Misalkan y = 4x - 8.",
        "Pindahkan konstanta: 4x = y + 8 ⟹ x = (y + 8) / 4.",
        "f⁻¹(x) = (x + 8) / 4 = 1/4 x + 2."
      ],
      "answer": "f⁻¹(x) = 1/4 x + 2"
    }
  },
  {
    "id": "grade-11-circles",
    "grade": 11,
    "title": "Persamaan Lingkaran & Garis Singgung",
    "category": "Geometry",
    "icon": "",
    "color": "#f0fdf4",
    "accentColor": "#16a34a",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Persamaan lingkaran berpusat di O(0,0) dan P(a,b), bentuk umum x² + y² + Ax + By + C = 0, kedudukan titik/garis terhadap lingkaran, persamaan garis singgung melalui titik pada kurva, dan garis singgung dengan gradien m.",
    "detailedOverview": "Geometri analitik lingkaran merupakan materi esensial kelas 11 SMA. Lingkaran didefinisikan sebagai himpunan semua titik pada bidang datar yang berjarak sama (jari-jari r) terhadap suatu titik tertentu yang disebut pusat lingkaran. Berakar dari rumus jarak Euclidean dan teorema Pythagoras, persamaan lingkaran berkembang dari bentuk baku pusat O(0,0) dan P(a,b) hingga bentuk umum aljabar x² + y² + Ax + By + C = 0. Pembahasan lanjutan meliputi penentuan kedudukan garis terhadap lingkaran serta penyusunan persamaan garis singgung (tangent lines) menggunakan metode bagi adil atau formula gradien m. Materi ini menjadi dasar rancang bangun lensa optik, gear transmisi mekanik, dan orbit satelit.",
    "coreConcepts": [
      {
        "title": "Bentuk Baku dan Bentuk Umum Persamaan Lingkaran",
        "points": [
          "Pusat O(0,0) dan jari-jari r: x² + y² = r².",
          "Pusat P(a,b) dan jari-jari r: (x - a)² + (y - b)² = r².",
          "Bentuk Umum Aljabar: x² + y² + Ax + By + C = 0.",
          "Menentukan Pusat dan Jari-jari dari Bentuk Umum: Titik Pusat P(-A/2, -B/2) dan Jari-jari r = √(A²/4 + B²/4 - C)."
        ]
      },
      {
        "title": "Kedudukan Titik dan Garis Terhadap Lingkaran",
        "points": [
          "Kedudukan Titik (x₁, y₁): Substitusikan ke bentuk baku K = (x₁ - a)² + (y₁ - b)². Jika K < r² (di dalam lingkaran), K = r² (tepat pada lingkaran), K > r² (di luar lingkaran).",
          "Kedudukan Garis y = mx + n: Substitusikan persamaan garis ke persamaan lingkaran hingga terbentuk persamaan kuadrat satu variabel ax² + bx + c = 0, lalu uji nilai Diskriminan D = b² - 4ac.",
          "D > 0: Garis memotong lingkaran di 2 titik berbeda.",
          "D = 0: Garis menyinggung lingkaran di tepat 1 titik.",
          "D < 0: Garis tidak memotong maupun menyinggung lingkaran (di luar lingkaran)."
        ]
      },
      {
        "title": "Persamaan Garis Singgung Lingkaran (PGSL)",
        "points": [
          "Garis Singgung Melalui Titik Pada Lingkaran (Metode Bagi Adil): Pada pusat O(0,0): x₁x + y₁y = r². Pada pusat P(a,b): (x₁ - a)(x - a) + (y₁ - b)(y - b) = r².",
          "Garis Singgung dengan Gradien Tertentu (m): y - b = m(x - a) ± r√(1 + m²). Menghasilkan dua garis singgung yang saling sejajar.",
          "Garis Singgung Melalui Titik di Luar Lingkaran: Menggunakan bantuan garis kutub (polar) atau sistem persamaan jarak titik ke garis."
        ]
      },
      {
        "title": "Hubungan Jarak Titik ke Garis Sebagai Jari-Jari",
        "points": [
          "Jika suatu lingkaran menyinggung garis Ax + By + C = 0, maka panjang jari-jari r setara dengan jarak titik pusat P(x₀, y₀) ke garis tersebut.",
          "Rumus Jarak Titik Pusat ke Garis Singgung: r = |A·x₀ + B·y₀ + C| / √(A² + B²)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Bentuk Baku Lingkaran Pusat P(a,b)",
        "formula": "(x - a)² + (y - b)² = r²",
        "desc": "Persamaan lingkaran dengan koordinat pusat (a,b) dan jari-jari r.",
        "note": "Perhatikan tanda minus pada (x - a) dan (y - b)."
      },
      {
        "name": "Pusat & Jari-jari Bentuk Umum",
        "formula": "Pusat = (-A/2, -B/2)   |   r = √(A²/4 + B²/4 - C)",
        "desc": "Ekstraksi pusat dan jari-jari dari bentuk umum x² + y² + Ax + By + C = 0.",
        "note": "Nilai di dalam akar harus bernilai positif agar lingkaran berwujud riil."
      },
      {
        "name": "Garis Singgung Titik Pada Kurva (Bagi Adil)",
        "formula": "(x₁ - a)(x - a) + (y₁ - b)(y - b) = r²",
        "desc": "Menyusun persamaan garis singgung di titik (x₁, y₁) yang terletak pada lingkaran.",
        "note": "Jika pusat di (0,0), rumus menjadi x₁x + y₁y = r²."
      },
      {
        "name": "Garis Singgung Gradien m",
        "formula": "y - b = m(x - a) ± r√(1 + m²)",
        "desc": "Menentukan garis singgung yang memiliki kemiringan gradien m (sejajar atau tegak lurus suatu garis).",
        "note": "Tanda ± menunjukkan adanya sepasang garis singgung sejajar di sisi berlawanan."
      },
      {
        "name": "Jarak Titik ke Garis",
        "formula": "r = |A·x₁ + B·y₁ + C| / √(A² + B²)",
        "desc": "Menghitung jari-jari lingkaran yang menyinggung garis Ax + By + C = 0.",
        "note": "Gunakan nilai mutlak karena panjang jari-jari selalu bernilai positif."
      }
    ],
    "examples": [
      {
        "question": "Tentukan koordinat titik pusat dan panjang jari-jari dari persamaan lingkaran: x² + y² - 6x + 8y - 11 = 0!",
        "level": "Basic",
        "steps": [
          "Identifikasi koefisien dari bentuk umum: A = -6, B = 8, dan C = -11.",
          "Hitung koordinat titik pusat P(-A/2, -B/2): a = -(-6)/2 = 3 dan b = -8/2 = -4. Titik Pusat = (3, -4).",
          "Hitung jari-jari r menggunakan rumus: r = √(a² + b² - C).",
          "Substitusikan nilai a = 3, b = -4, dan C = -11: r = √(3² + (-4)² - (-11)) = √(9 + 16 + 11) = √36 = 6.",
          "Jadi, lingkaran berpusat di P(3, -4) dengan jari-jari r = 6."
        ],
        "answer": "Pusat (3, -4) dan Jari-jari r = 6",
        "tips": "Ingat bahwa C pada rumus jari-jari dikurangkan (- C), sehingga jika C bernilai negatif (-11), maka -(-11) menjadi +11."
      },
      {
        "question": "Tentukan persamaan garis singgung lingkaran (x - 2)² + (y + 1)² = 25 di titik (6, 2)!",
        "level": "Intermediate",
        "steps": [
          "Uji kedudukan titik (6, 2): (6 - 2)² + (2 + 1)² = 4² + 3² = 16 + 9 = 25. Karena sama dengan r², titik (6, 2) terletak tepat PADA lingkaran.",
          "Gunakan metode bagi adil: (x₁ - a)(x - a) + (y₁ - b)(y - b) = r² dengan x₁ = 6, y₁ = 2, a = 2, b = -1, dan r² = 25.",
          "Substitusikan nilai ke rumus: (6 - 2)(x - 2) + (2 - (-1))(y - (-1)) = 25.",
          "Sederhanakan koefisien: 4(x - 2) + 3(y + 1) = 25.",
          "Jabarkan perkalian aljabar: 4x - 8 + 3y + 3 = 25 ⟹ 4x + 3y - 5 = 25 ⟹ 4x + 3y - 30 = 0."
        ],
        "answer": "4x + 3y - 30 = 0",
        "tips": "Pastikan selalu menguji apakah titik terletak PADA lingkaran atau DI LUAR lingkaran sebelum menerapkan rumus bagi adil."
      },
      {
        "question": "Tentukan persamaan garis singgung lingkaran x² + y² = 20 yang tegak lurus terhadap garis 2x + y - 4 = 0!",
        "level": "Advanced",
        "steps": [
          "Tentukan gradien garis yang diketahui 2x + y - 4 = 0 ⟹ y = -2x + 4, maka m₁ = -2.",
          "Karena garis singgung tegak lurus, maka m · m₁ = -1 ⟹ m · (-2) = -1 ⟹ m = 1/2.",
          "Lingkaran x² + y² = 20 memiliki pusat (0,0) dan r = √20 = 2√5.",
          "Gunakan rumus garis singgung dengan gradien m: y = mx ± r√(1 + m²).",
          "Substitusikan m = 1/2 dan r = √20: y = 1/2 x ± √20 · √(1 + (1/2)²) = 1/2 x ± √20 · √(1 + 1/4) = 1/2 x ± √20 · √(5/4).",
          "Hitung perkalian akar: √20 · √(5/4) = √(100 / 4) = √25 = 5.",
          "Maka diperoleh dua persamaan garis singgung: y = 1/2 x ± 5 atau dikali 2 menjadi x - 2y ± 10 = 0."
        ],
        "answer": "x - 2y + 10 = 0 dan x - 2y - 10 = 0",
        "tips": "Ingat hubungan dua gradien: Jika sejajar m = m₁, jika tegak lurus m = -1/m₁."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jari-jari lingkaran dengan persamaan (x + 3)² + (y - 5)² = 49 adalah...",
        "options": [
          "7",
          "49",
          "14",
          "24.5"
        ],
        "correctIndex": 0,
        "explanation": "Persamaan baku adalah (x - a)² + (y - b)² = r². Maka r² = 49 ⟹ r = √49 = 7."
      },
      {
        "question": "Kedudukan titik (3, 4) terhadap lingkaran x² + y² = 25 adalah...",
        "options": [
          "Terletak tepat pada lingkaran",
          "Terletak di dalam lingkaran",
          "Terletak di luar lingkaran",
          "Sebagai titik pusat lingkaran"
        ],
        "correctIndex": 0,
        "explanation": "Substitusikan titik (3, 4) ke ruas kiri persamaan: 3² + 4² = 9 + 16 = 25. Karena hasilnya sama dengan r² (25 = 25), titik terletak tepat pada lingkaran."
      },
      {
        "question": "Persamaan garis singgung lingkaran x² + y² = 25 yang melalui titik (3, -4) adalah...",
        "options": [
          "3x - 4y = 25",
          "3x + 4y = 25",
          "4x - 3y = 25",
          "4x + 3y = 25"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan rumus bagi adil untuk pusat (0,0): x₁x + y₁y = r². Dengan x₁ = 3, y₁ = -4, dan r² = 25, diperoleh 3x + (-4)y = 25 ⟹ 3x - 4y = 25."
      }
    ],
    "example": {
      "question": "Tentukan pusat dan jari-jari dari (x - 4)² + (y + 2)² = 16.",
      "steps": [
        "Persamaan standar: (x - a)² + (y - b)² = r².",
        "Maka a = 4 dan b = -2 ⟹ Pusat = (4, -2).",
        "r² = 16 ⟹ r = 4."
      ],
      "answer": "Pusat (4, -2), r = 4"
    }
  },
  {
    "id": "grade-11-matrices",
    "grade": 11,
    "title": "Matriks & Sistem Persamaan Linear",
    "category": "Algebra & Matrices",
    "icon": "",
    "color": "#f1f5f9",
    "accentColor": "#475569",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Operasi matriks (penjumlahan, perkalian skalar, perkalian dua matriks), transpose matriks, determinan ordo 2x2 dan 3x3 (Aturan Sarrus), matriks invers A⁻¹, sifat-sifat determinan, dan aplikasi penyelesaian persamaan AX = B.",
    "detailedOverview": "Matriks merupakan susunan skalar bilangan dalam bentuk baris dan kolom yang diapit oleh tanda kurung siku atau kurung biasa. Teori matriks memegang peranan krusial dalam pemrosesan data modern, komputasi grafik komputer, kecerdasan buatan (transformasi tensor pada deep learning), dan kriptografi. Pembahasan matriks kelas 11 berpusat pada pemahaman ordo matriks, operasi aljabar (penjumlahan yang mensyaratkan kesamaan ordo, serta perkalian antar-matriks yang mensyaratkan jumlah kolom matriks pertama sama dengan baris matriks kedua), perhitungan determinan menggunakan metode Sarrus, penentuan matriks balikan (invers), serta pemanfaatan persamaan matriks AX = B ⟹ X = A⁻¹B untuk menyelesaikan sistem persamaan linear secara simultan.",
    "coreConcepts": [
      {
        "title": "Ordo dan Operasi Aljabar Matriks",
        "points": [
          "Ordo m x n menyatakan matriks memiliki m baris dan n kolom.",
          "Penjumlahan & Pengurangan: Hanya dapat dilakukan pada dua matriks yang berordo sama persis dengan menjumlahkan elemen-elemen yang seletak.",
          "Perkalian Skalar k · A: Mengalikan seluruh elemen matriks A dengan bilangan real k.",
          "Perkalian Dua Matriks (A_m x k · B_k x n = C_m x n): Menghitung jumlah hasil kali elemen-elemen baris pada matriks pertama dengan elemen-elemen kolom pada matriks kedua (konsep 'Baris kali Kolom').",
          "PENTING: Perkalian matriks TIDAK bersifat komutatif: A · B ≠ B · A."
        ]
      },
      {
        "title": "Transpose Matriks (Aᵀ) dan Matriks Khusus",
        "points": [
          "Transpose diperoleh dengan menukar elemen baris menjadi kolom dan elemen kolom menjadi baris.",
          "Sifat Transpose: (Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ, (k·A)ᵀ = k·Aᵀ, dan (A · B)ᵀ = Bᵀ · Aᵀ (urutan berbalik!).",
          "Matriks Simetris jika Aᵀ = A, dan Matriks Antisimetris jika Aᵀ = -A."
        ]
      },
      {
        "title": "Determinan Matriks (Ordo 2x2 dan 3x3)",
        "points": [
          "Determinan matriks 2x2: det(A) = |A| = ad - bc.",
          "Determinan matriks 3x3: Dihitung menggunakan Aturan Sarrus (menambahkan 2 kolom pertama di sebelah kanan) atau ekspansi kofaktor.",
          "Matriks Singular: Matriks yang determinannya bernilai nol (|A| = 0). Matriks singular TIDAK memiliki invers.",
          "Sifat Determinan: det(A · B) = det(A) · det(B), det(A⁻¹) = 1 / det(A), det(Aᵀ) = det(A), dan det(k·A) = kⁿ · det(A) untuk matriks ordo n x n."
        ]
      },
      {
        "title": "Invers Matriks dan Persamaan Matriks",
        "points": [
          "Rumus Invers 2x2: A⁻¹ = (1 / det(A)) · adj(A) = 1/(ad - bc) · [[d, -b], [-c, a]].",
          "Sifat Invers: A · A⁻¹ = A⁻¹ · A = I (Matriks Identitas), dan (A⁻¹)⁻¹ = A, serta (A · B)⁻¹ = B⁻¹ · A⁻¹.",
          "Penyelesaian Persamaan Matriks: Jika A · X = B, maka X = A⁻¹ · B (A⁻¹ dikali dari kiri). Jika X · A = B, maka X = B · A⁻¹ (A⁻¹ dikali dari kanan)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Determinan Matriks 2x2",
        "formula": "det(A) = |A| = ad - bc",
        "desc": "Selisih perkalian elemen diagonal utama dengan diagonal sekunder.",
        "note": "Jika det(A) = 0, matriks disebut singular dan tidak memiliki invers."
      },
      {
        "name": "Invers Matriks 2x2",
        "formula": "A⁻¹ = 1/(ad - bc) · [[d, -b], [-c, a]]",
        "desc": "Matriks balikan ordo 2x2 dengan menukar elemen diagonal utama dan mengubah tanda diagonal sekunder.",
        "note": "Pastikan membagi dengan determinan (ad - bc) bukan menjumlahkannya."
      },
      {
        "name": "Sifat Determinan Perkalian",
        "formula": "det(A · B) = det(A) · det(B)   dan   det(A⁻¹) = 1 / det(A)",
        "desc": "Determinan perkalian matriks sama dengan perkalian masing-masing determinannya.",
        "note": "Sangat menghemat waktu karena kita tidak perlu mengalikan matriksnya terlebih dahulu."
      },
      {
        "name": "Penyelesaian Persamaan Matriks",
        "formula": "A · X = B ⟹ X = A⁻¹ · B   |   X · A = B ⟹ X = B · A⁻¹",
        "desc": "Solusi mencari matriks variabel X yang belum diketahui.",
        "note": "Jangan tertukar posisi perkalian karena perkalian matriks tidak komutatif."
      },
      {
        "name": "Determinan Skalar Matriks",
        "formula": "det(k · A) = kⁿ · det(A)",
        "desc": "Determinan matriks yang dikalikan konstanta skalar k untuk matriks persegi berordo n.",
        "note": "Untuk matriks 2x2 menjadi k² det(A), untuk 3x3 menjadi k³ det(A)."
      }
    ],
    "examples": [
      {
        "question": "Diketahui matriks A = [[2, 3], [1, 4]] dan B = [[1, -2], [3, 0]]. Tentukan hasil perkalian matriks A · B!",
        "level": "Basic",
        "steps": [
          "Periksa ordo: A berordo 2x2 dan B berordo 2x2, maka hasil kali C = A · B juga berordo 2x2.",
          "Elemen baris 1 kolom 1: c₁₁ = (baris 1 A) · (kolom 1 B) = (2 · 1) + (3 · 3) = 2 + 9 = 11.",
          "Elemen baris 1 kolom 2: c₁₂ = (baris 1 A) · (kolom 2 B) = (2 · (-2)) + (3 · 0) = -4 + 0 = -4.",
          "Elemen baris 2 kolom 1: c₂₁ = (baris 2 A) · (kolom 1 B) = (1 · 1) + (4 · 3) = 1 + 12 = 13.",
          "Elemen baris 2 kolom 2: c₂₂ = (baris 2 A) · (kolom 2 B) = (1 · (-2)) + (4 · 0) = -2 + 0 = -2.",
          "Susun matriks hasil akhir: A · B = [[11, -4], [13, -2]]."
        ],
        "answer": "[[11, -4], [13, -2]]",
        "tips": "Selalu ingat pola gerakan: Tangan kiri bergerak mendatar sepanjang baris matriks A, tangan kanan bergerak menurun sepanjang kolom matriks B."
      },
      {
        "question": "Tentukan invers dari matriks P = [[4, 7], [1, 2]]!",
        "level": "Intermediate",
        "steps": [
          "Identifikasi elemen: a = 4, b = 7, c = 1, d = 2.",
          "Hitung determinan |P| = ad - bc = (4 · 2) - (7 · 1) = 8 - 7 = 1.",
          "Bentuk matriks adjoin adj(P) = [[d, -b], [-c, a]] = [[2, -7], [-1, 4]].",
          "Hitung P⁻¹ = (1 / det(P)) · adj(P) = (1 / 1) · [[2, -7], [-1, 4]].",
          "Maka P⁻¹ = [[2, -7], [-1, 4]]."
        ],
        "answer": "[[2, -7], [-1, 4]]",
        "tips": "Karena determinannya bernilai 1, matriks invers sama persis dengan matriks adjoinnya."
      },
      {
        "question": "Selesaikan sistem persamaan linear berikut menggunakan metode invers matriks: 2x + 3y = 8 dan x + 2y = 5!",
        "level": "Advanced",
        "steps": [
          "Ubah SPLDV ke bentuk persamaan matriks AX = B: [[2, 3], [1, 2]] · [[x], [y]] = [[8], [5]].",
          "Cari invers matriks koefisien A = [[2, 3], [1, 2]]: det(A) = (2 · 2) - (3 · 1) = 4 - 3 = 1.",
          "Maka A⁻¹ = [[2, -3], [-1, 2]].",
          "Gunakan rumus X = A⁻¹ · B: [[x], [y]] = [[2, -3], [-1, 2]] · [[8], [5]].",
          "Hitung perkalian baris kali kolom: x = (2 · 8) + (-3 · 5) = 16 - 15 = 1 ; y = (-1 · 8) + (2 · 5) = -8 + 10 = 2.",
          "Diperoleh penyelesaian x = 1 dan y = 2."
        ],
        "answer": "x = 1 dan y = 2",
        "tips": "Metode invers matriks sangat praktis dan terstruktur ketika koefisien determinan bernilai 1 atau pecahan sederhana."
      }
    ],
    "quickQuiz": [
      {
        "question": "Berapakah determinan dari matriks M = [[5, 2], [3, 4]]?",
        "options": [
          "14",
          "26",
          "20",
          "6"
        ],
        "correctIndex": 0,
        "explanation": "det(M) = (5 · 4) - (2 · 3) = 20 - 6 = 14."
      },
      {
        "question": "Jika matriks K = [[x, 6], [2, 3]] adalah matriks singular, berapakah nilai x?",
        "options": [
          "4",
          "9",
          "6",
          "1"
        ],
        "correctIndex": 0,
        "explanation": "Matriks singular memiliki determinan sama dengan nol: det(K) = (x · 3) - (6 · 2) = 0 ⟹ 3x - 12 = 0 ⟹ 3x = 12 ⟹ x = 4."
      },
      {
        "question": "Jika det(A) = 3 dan det(B) = 4, maka det(2 · A · B) untuk matriks ordo 2x2 adalah...",
        "options": [
          "48",
          "24",
          "12",
          "96"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan sifat determinan untuk ordo 2x2: det(k · M) = k² · det(M). Di sini det(2 · A · B) = 2² · det(A) · det(B) = 4 · 3 · 4 = 48."
      }
    ],
    "example": {
      "question": "Tentukan determinan matriks A = [[3, 1], [4, 2]].",
      "steps": [
        "det(A) = (3 · 2) - (1 · 4).",
        "det(A) = 6 - 4 = 2."
      ],
      "answer": "2"
    }
  },
  {
    "id": "grade-11-transformations",
    "grade": 11,
    "title": "Transformasi Geometri",
    "category": "Geometry",
    "icon": "",
    "color": "#e0f2fe",
    "accentColor": "#0284c7",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Translasi (pergeseran vektor), Refleksi (pencerminan sumbu koordinat dan garis), Rotasi (perputaran sudut θ), Dilatasi (perbesaran skala k), serta komposisi matriks transformasi ganda.",
    "detailedOverview": "Transformasi Geometri mempelajari perubahan posisi, orientasi, atau ukuran suatu objek geometri (titik, kurva garis, maupun bangun datar) pada bidang Cartesius. Terdapat empat transformasi dasar: Translasi (pergeseran sejajar tanpa mengubah ukuran dan orientasi), Refleksi (pencerminan terhadap sumbu simetri yang menghasilkan bayangan kongruen berorientasi terbalik), Rotasi (perputaran terhadap titik pusat sejauh sudut tertentu), dan Dilatasi (perubahan skala ukuran yang mempertahankan kesebangunan bentuk). Dalam representasi analitis, setiap transformasi dinyatakan dalam bentuk matriks 2x2. Ketika beberapa transformasi diterapkan berturut-turut (komposisi transformasi), matriks gabungannya dihitung melalui perkalian matriks dengan urutan pengerjaan dari kanan ke kiri (M_total = M₂ · M₁). Konsep ini merupakan dasar teknologi animasi CGI, pemrosesan citra digital, dan robotika industri.",
    "coreConcepts": [
      {
        "title": "Translasi (Pergeseran Vektor)",
        "points": [
          "Menggeser setiap titik (x, y) sejauh vektor T(a, b): x' = x + a dan y' = y + b.",
          "Bentuk matriks: [[x'], [y']] = [[x], [y]] + [[a], [b]].",
          "Translasi merupakan satu-satunya transformasi geometri yang operasinya menggunakan penjumlahan vektor, bukan perkalian matriks.",
          "Translasi mempertahankan bentuk, ukuran, dan orientasi bangun (bersifat isometri)."
        ]
      },
      {
        "title": "Refleksi (Pencerminan)",
        "points": [
          "Pencerminan sumbu X: (x, -y) dengan matriks [[1, 0], [0, -1]].",
          "Pencerminan sumbu Y: (-x, y) dengan matriks [[-1, 0], [0, 1]].",
          "Pencerminan garis y = x: (y, x) dengan matriks [[0, 1], [1, 0]].",
          "Pencerminan garis y = -x: (-y, -x) dengan matriks [[0, -1], [-1, 0]].",
          "Pencerminan garis vertikal x = h: (2h - x, y). Pencerminan garis horizontal y = k: (x, 2k - y)."
        ]
      },
      {
        "title": "Rotasi (Perputaran Sudut θ)",
        "points": [
          "Rotasi terhadap pusat O(0,0) sejauh sudut θ (berlawanan jarum jam jika θ positif): Matriks R_θ = [[cos θ, -sin θ], [sin θ, cos θ]].",
          "Rotasi 90° berlawanan arah jarum jam: (x, y) ⟹ (-y, x).",
          "Rotasi 180°: (x, y) ⟹ (-x, -y).",
          "Rotasi 270° (atau 90° searah jarum jam): (x, y) ⟹ (y, -x).",
          "Rotasi terhadap pusat P(a,b): [[x' - a], [y' - b]] = R_θ · [[x - a], [y - b]]."
        ]
      },
      {
        "title": "Dilatasi dan Komposisi Transformasi",
        "points": [
          "Dilatasi pusat O(0,0) faktor skala k: (x', y') = (kx, ky) dengan matriks [[k, 0], [0, k]].",
          "Perubahan luas bangun datar oleh transformasi: Luas Bayangan = |det(M)| · Luas Asal. Khusus dilatasi: Luas Bayangan = k² · Luas Asal.",
          "Komposisi Transformasi: Jika transformasi T₁ dilanjutkan dengan T₂, matriks transformasi gabungannya adalah M = M₂ · M₁ (ingat perkalian dikerjakan terbalik dari kanan ke kiri)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Matriks Rotasi Sudut θ Pusat (0,0)",
        "formula": "R_θ = [[cos θ, -sin θ], [sin θ, cos θ]]",
        "desc": "Memutar titik atau kurva sebesar sudut θ berlawanan arah jarum jam.",
        "note": "Sudut searah jarum jam bernilai negatif: gunakan cos(-θ) = cos θ dan sin(-θ) = -sin θ."
      },
      {
        "name": "Matriks Refleksi y = x dan y = -x",
        "formula": "M_(y=x) = [[0, 1], [1, 0]]   |   M_(y=-x) = [[0, -1], [-1, 0]]",
        "desc": "Pencerminan garis diagonal bidang koordinat Cartesius.",
        "note": "Pencerminan y = x menukar x dengan y; pencerminan y = -x menukar dan membalik tanda."
      },
      {
        "name": "Komposisi Matriks Transformasi",
        "formula": "M_total = M₂ · M₁",
        "desc": "Matriks gabungan transformasi T₁ yang dilanjutkan oleh transformasi T₂.",
        "note": "Perkalian matriks tidak komutatif, urutan penulisan harus dari kanan (T₁ dahulu, lalu T₂)."
      },
      {
        "name": "Luas Bangun Hasil Transformasi",
        "formula": "Luas' = |det(M)| · Luas_awal",
        "desc": "Menghitung luas daerah setelah dikenakan matriks transformasi M.",
        "note": "Untuk transformasi isometri (translasi, rotasi, refleksi), |det(M)| = 1 sehingga luas tetap."
      },
      {
        "name": "Refleksi Garis x = h dan y = k",
        "formula": "x' = 2h - x (untuk x = h)   |   y' = 2k - y (untuk y = k)",
        "desc": "Pencerminan terhadap garis sejajar sumbu koordinat.",
        "note": "Hanya koordinat yang tegak lurus terhadap cermin yang mengalami perubahan nilai."
      }
    ],
    "examples": [
      {
        "question": "Titik A(3, -2) ditranslasikan oleh T(-1, 4), kemudian dilanjutkan pencerminan terhadap sumbu X. Tentukan koordinat bayangan akhir titik A!",
        "level": "Basic",
        "steps": [
          "Langkah 1: Lakukan translasi oleh T(-1, 4): x' = 3 + (-1) = 2 dan y' = -2 + 4 = 2. Bayangan pertama A'(2, 2).",
          "Langkah 2: Lakukan refleksi terhadap sumbu X pada titik A'(2, 2).",
          "Aturan refleksi sumbu X: (x'', y'') = (x', -y').",
          "Diperoleh x'' = 2 dan y'' = -2.",
          "Jadi, koordinat bayangan akhir adalah A''(2, -2)."
        ],
        "answer": "A''(2, -2)",
        "tips": "Kerjakan langkah demi langkah secara berurutan sesuai urutan peristiwa transformasi yang disebutkan."
      },
      {
        "question": "Tentukan persamaan bayangan garis 2x - 3y + 6 = 0 oleh rotasi 90° berlawanan arah jarum jam dengan pusat O(0,0)!",
        "level": "Intermediate",
        "steps": [
          "Matriks rotasi 90°: R₉₀ = [[cos 90°, -sin 90°], [sin 90°, cos 90°]] = [[0, -1], [1, 0]].",
          "Hubungan koordinat: [[x'], [y']] = [[0, -1], [1, 0]] · [[x], [y]] ⟹ x' = -y dan y' = x.",
          "Nyatakan variabel awal x dan y dalam bentuk bayangan x' dan y': x = y' dan y = -x'.",
          "Substitusikan x = y' dan y = -x' ke persamaan garis awal 2x - 3y + 6 = 0.",
          "Diperoleh: 2(y') - 3(-x') + 6 = 0 ⟹ 2y' + 3x' + 6 = 0.",
          "Tuliskan dalam bentuk standar tanpa tanda aksen: 3x + 2y + 6 = 0."
        ],
        "answer": "3x + 2y + 6 = 0",
        "tips": "Untuk mentransformasikan persamaan kurva/garis, nyatakan selalu variabel lama (x, y) dalam bentuk variabel baru (x', y') lalu substitusikan."
      },
      {
        "question": "Sebuah segitiga ABC memiliki luas 15 cm². Segitiga tersebut ditransformasikan oleh matriks M = [[3, 1], [2, 4]], kemudian didilatasikan dengan faktor skala k = 2 terhadap titik asal. Tentukan luas bayangan akhir segitiga tersebut!",
        "level": "Advanced",
        "steps": [
          "Hitung determinan matriks transformasi pertama M: det(M) = (3 · 4) - (1 · 2) = 12 - 2 = 10.",
          "Luas segitiga setelah transformasi matriks M: Luas₁ = |det(M)| · Luas awal = 10 · 15 = 150 cm².",
          "Matriks dilatasi dengan faktor skala k = 2 memiliki determinan: det(D) = k² = 2² = 4.",
          "Luas akhir setelah dilatasi: Luas_akhir = det(D) · Luas₁ = 4 · 150 = 600 cm².",
          "Alternatif langsung: Luas_akhir = |det(M₂ · M₁)| · Luas awal = (4 · 10) · 15 = 40 · 15 = 600 cm²."
        ],
        "answer": "600 cm²",
        "tips": "Mengalikan determinan masing-masing transformasi langsung memberikan faktor pengali luas keseluruhan (|det(M)| · k²)."
      }
    ],
    "quickQuiz": [
      {
        "question": "Bayangan titik P(5, -3) oleh pencerminan terhadap garis y = x adalah...",
        "options": [
          "(-3, 5)",
          "(3, -5)",
          "(-5, 3)",
          "(5, 3)"
        ],
        "correctIndex": 0,
        "explanation": "Pencerminan terhadap garis y = x menukar absis dan ordinat: (x, y) ⟹ (y, x). Maka P(5, -3) menjadi P'(-3, 5)."
      },
      {
        "question": "Titik Q(-2, 7) dirotasikan 180° terhadap titik pusat (0,0). Koordinat bayangannya adalah...",
        "options": [
          "(2, -7)",
          "(-2, -7)",
          "(7, -2)",
          "(-7, 2)"
        ],
        "correctIndex": 0,
        "explanation": "Rotasi 180° membalik tanda kedua koordinat: (x, y) ⟹ (-x, -y). Maka (-2, 7) menjadi (2, -7)."
      },
      {
        "question": "Sebuah lingkaran dengan jari-jari r = 4 cm didilatasikan dengan faktor skala k = 3. Luas bayangan lingkaran tersebut adalah...",
        "options": [
          "144π cm²",
          "48π cm²",
          "36π cm²",
          "16π cm²"
        ],
        "correctIndex": 0,
        "explanation": "Luas lingkaran awal = π · r² = π · 4² = 16π cm². Dilatasi faktor skala k = 3 melipatgandakan luas sebesar k² = 3² = 9 kali. Maka Luas' = 9 · 16π = 144π cm²."
      }
    ],
    "example": {
      "question": "Tentukan bayangan titik (4, -1) oleh rotasi 90° berlawanan arah jarum jam terhadap (0,0).",
      "steps": [
        "Rotasi 90° berlawanan arah jarum jam: (x, y) ⟹ (-y, x).",
        "x = 4 dan y = -1.",
        "Bayangan = (-(-1), 4) = (1, 4)."
      ],
      "answer": "(1, 4)"
    }
  },
  {
    "id": "grade-11-limit",
    "grade": 11,
    "title": "Limit Fungsi Aljabar",
    "category": "Calculus",
    "icon": "",
    "color": "#fef2f2",
    "accentColor": "#b91c1c",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Konsep limit pendekatan f(x) menuju c, membedakan bentuk tentu vs bentuk tak tentu (0/0), teknik pemfaktoran aljabar, perkalian bentuk akar sekawan, Teorema L'Hopital, serta trik cepat limit tak hingga (x → ∞).",
    "detailedOverview": "Limit fungsi aljabar merupakan gerbang utama menuju cabang kalkulus diferensial dan integral. Secara konseptual, limit mempelajari perilaku nilai suatu fungsi f(x) ketika variabel x bergerak mendekati suatu bilangan tertentu c dari arah kiri dan kanan, tanpa harus tepat sama dengan titik c tersebut. Tantangan utama limit muncul saat substitusi langsung menghasilkan bentuk tak tentu seperti 0/0 atau ∞/∞. Untuk menyelesaikannya, siswa dilatih menggunakan berbagai strategi aljabar seperti pemfaktoran selisih kuadrat, perkalian sekawan untuk bentuk akar, hingga Teorema L'Hopital (turunan pembilang dibagi turunan penyebut). Selain itu, limit menuju tak hingga (x → ∞) memodelkan kondisi kestabilan jangka panjang pada laju reaksi kimia dan kapasitas maksimum populasi (carrying capacity).",
    "coreConcepts": [
      {
        "title": "Definisi Intuitif dan Bentuk Tentu vs Tak Tentu",
        "points": [
          "Definisi: lim(x→c) f(x) = L berarti jika x sangat dekat ke c (tetapi x ≠ c), maka nilai f(x) sangat dekat ke L.",
          "Limit ada jika dan hanya jika limit kiri sama dengan limit kanan: lim(x→c⁻) f(x) = lim(x→c⁺) f(x) = L.",
          "Bentuk Tentu: Jika substitusi langsung x = c menghasilkan bilangan riil (misal 5, 0, -3/2), nilai tersebut langsung menjadi solusi limit.",
          "Bentuk Tak Tentu: Jika substitusi menghasilkan 0/0, ∞/∞, atau ∞ - ∞, maka harus dilakukan manipulasi aljabar untuk menghilangkan pembuat nol (x - c)."
        ]
      },
      {
        "title": "Metode Pemfaktoran dan Perkalian Akar Sekawan",
        "points": [
          "Metode Pemfaktoran: Faktorkan pembilang dan penyebut sehingga faktor pembuat nol (x - c) dapat dicoret (disederhanakan), lalu substitusikan kembali nilai x = c.",
          "Metode Perkalian Sekawan: Digunakan saat fungsi memuat bentuk radikal akar (√f(x) - √g(x)). Kalikan pembilang dan penyebut dengan sekawannya (√f(x) + √g(x)) menggunakan rumus selisih kuadrat (a - b)(a + b) = a² - b²."
        ]
      },
      {
        "title": "Teorema L'Hopital (Diferensial)",
        "points": [
          "Jika bentuk limit adalah 0/0 atau ∞/∞, maka berlaku Teorema L'Hopital: lim(x→c) [f(x) / g(x)] = lim(x→c) [f'(x) / g'(x)].",
          "Turunkan pembilang secara mandiri dan penyebut secara mandiri (BUKAN menggunakan aturan pembagian turunan u/v).",
          "Jika setelah diturunkan sekali masih menghasilkan 0/0, Teorema L'Hopital dapat diulang untuk kedua kalinya."
        ]
      },
      {
        "title": "Limit Fungsi Menuju Tak Hingga (x → ∞)",
        "points": [
          "Limit Pecahan Polinomial lim(x→∞) [a·xᵐ + ...] / [b·xⁿ + ...]: Jika m = n hasilnya a/b ; jika m < n hasilnya 0 ; jika m > n hasilnya ∞.",
          "Trik Cepat Selisih Bentuk Akar Kuadrat: lim(x→∞) [√(ax² + bx + c) - √(ax² + px + q)] = (b - p) / (2√a) dengan syarat koefisien a sama besar.",
          "Jika koefisien a > p (pada √(ax²) - √(px²)), hasilnya +∞; jika a < p hasilnya -∞."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Teorema L'Hopital",
        "formula": "lim(x→c) [f(x) / g(x)] = lim(x→c) [f'(x) / g'(x)]  (untuk bentuk 0/0)",
        "desc": "Menyelesaikan limit tak tentu dengan menurunkan pembilang dan penyebut secara terpisah.",
        "note": "Pastikan menguji substitusi awal menghasilkan 0/0 sebelum menerapkan L'Hopital."
      },
      {
        "name": "Trik Selisih Akar Tak Hingga",
        "formula": "lim(x→∞) [√(ax² + bx + c) - √(ax² + px + q)] = (b - p) / (2√a)",
        "desc": "Formula kilat menyelesaikan selisih dua bentuk akar kuadrat polinomial menuju tak hingga.",
        "note": "Berlaku hanya jika koefisien x² pada kedua akar bernilai sama persis (a)."
      },
      {
        "name": "Limit Rasional Tak Hingga Derajat Sama",
        "formula": "lim(x→∞) (a·xⁿ + ...) / (b·xⁿ + ...) = a / b",
        "desc": "Nilai limit pecahan polinomial jika pangkat tertinggi pembilang dan penyebut sama.",
        "note": "Cukup lihat perbandingan koefisien dari variabel dengan pangkat tertinggi."
      },
      {
        "name": "Pemfaktoran Selisih Kuadrat",
        "formula": "x² - a² = (x - a)(x + a)   |   x³ - a³ = (x - a)(x² + ax + a²)",
        "desc": "Faktorisasi aljabar untuk mencoret faktor pembuat nol (x - a).",
        "note": "Sangat sering digunakan pada limit pecahan aljabar kelas 11."
      }
    ],
    "examples": [
      {
        "question": "Hitunglah nilai dari lim(x→3) [(x² - 2x - 3) / (x - 3)]!",
        "level": "Basic",
        "steps": [
          "Uji substitusi langsung x = 3: (3² - 2(3) - 3) / (3 - 3) = (9 - 6 - 3) / 0 = 0/0 (Bentuk Tak Tentu).",
          "Faktorkan pembilang x² - 2x - 3: cari dua bilangan yang hasil kalinya -3 dan jumlahnya -2, yaitu -3 dan +1 ⟹ (x - 3)(x + 1).",
          "Sederhanakan pecahan dengan mencoret faktor pembuat nol (x - 3): lim(x→3) [(x - 3)(x + 1) / (x - 3)] = lim(x→3) (x + 1).",
          "Substitusikan nilai x = 3 ke bentuk yang telah disederhanakan: 3 + 1 = 4.",
          "Alternatif dengan L'Hopital: Turunan pembilang = 2x - 2, turunan penyebut = 1. lim(x→3) (2x - 2) / 1 = 2(3) - 2 = 4."
        ],
        "answer": "4",
        "tips": "Faktor pembuat nol pada limit x → c selalu berupa (x - c). Dalam soal ini (x - 3) pasti dapat dicoret."
      },
      {
        "question": "Hitunglah nilai dari lim(x→4) [(x - 4) / (√x - 2)]!",
        "level": "Intermediate",
        "steps": [
          "Substitusi langsung x = 4: (4 - 4) / (√4 - 2) = 0 / (2 - 2) = 0/0 (Bentuk Tak Tentu).",
          "Metode 1 (Perkalian Sekawan): Kalikan pembilang dan penyebut dengan sekawan dari (√x - 2), yaitu (√x + 2).",
          "Penyebut menjadi (√x - 2)(√x + 2) = (√x)² - 2² = x - 4.",
          "Pecahan menjadi: lim(x→4) [(x - 4)(√x + 2) / (x - 4)].",
          "Coret faktor (x - 4): lim(x→4) (√x + 2).",
          "Substitusikan x = 4: √4 + 2 = 2 + 2 = 4."
        ],
        "answer": "4",
        "tips": "Metode alternatif: Faktorkan pembilang (x - 4) sebagai selisih kuadrat bentuk akar: (√x - 2)(√x + 2), lalu langsung coret dengan penyebut."
      },
      {
        "question": "Tentukan nilai dari lim(x→∞) [√(4x² + 6x - 1) - √(4x² - 2x + 5)]!",
        "level": "Advanced",
        "steps": [
          "Identifikasi bentuk selisih akar: lim(x→∞) [√(ax² + bx + c) - √(ax² + px + q)].",
          "Periksa koefisien: a = 4, b = 6, c = -1, p = -2, q = 5.",
          "Karena koefisien x² pada kedua akar sama (a = 4), kita dapat langsung menerapkan rumus cepat: L = (b - p) / (2√a).",
          "Substitusikan nilai koefisien: b - p = 6 - (-2) = 6 + 2 = 8.",
          "Penyebut: 2√a = 2√4 = 2 · 2 = 4.",
          "Hitung hasil akhir: L = 8 / 4 = 2."
        ],
        "answer": "2",
        "tips": "Rumus cepat (b - p) / (2√a) menyelesaikan soal akar tak hingga dalam waktu kurang dari 10 detik tanpa perlu perkalian sekawan panjang."
      }
    ],
    "quickQuiz": [
      {
        "question": "Nilai dari lim(x→2) [(x² - 4) / (x - 2)] adalah...",
        "options": [
          "4",
          "2",
          "0",
          "Tak terdefinisi"
        ],
        "correctIndex": 0,
        "explanation": "Faktorkan pembilang x² - 4 = (x - 2)(x + 2). Coret faktor (x - 2), tersisa (x + 2). Substitusikan x = 2: 2 + 2 = 4."
      },
      {
        "question": "Nilai dari lim(x→∞) [(6x³ - 2x + 1) / (2x³ + 5x² - 4)] adalah...",
        "options": [
          "3",
          "0",
          "∞",
          "6"
        ],
        "correctIndex": 0,
        "explanation": "Derajat tertinggi pembilang dan penyebut sama, yaitu x³. Nilai limit cukup membagi koefisien pangkat tertingginya: 6 / 2 = 3."
      },
      {
        "question": "Bila f(x) = (x² - 9)/(x - 3), berapakah turunan pertama f'(x) untuk mencari limit dengan Teorema L'Hopital?",
        "options": [
          "Turunan pembilang = 2x, penyebut = 1",
          "Turunan pembilang = x, penyebut = 1",
          "Turunan pembilang = 2x, penyebut = 0",
          "Turunan pembilang = 2x - 9, penyebut = 1"
        ],
        "correctIndex": 0,
        "explanation": "Menurut L'Hopital, turunkan pembilang f(x) = x² - 9 menjadi 2x, dan turunkan penyebut g(x) = x - 3 menjadi 1. Maka limitnya lim(x→3) 2x / 1 = 6."
      }
    ],
    "example": {
      "question": "Tentukan nilai dari lim(x→5) [(x² - 25) / (x - 5)].",
      "steps": [
        "Faktorkan pembilang: (x - 5)(x + 5).",
        "Bagi dengan penyebut: tersisa (x + 5).",
        "Substitusikan x = 5: 5 + 5 = 10."
      ],
      "answer": "10"
    }
  }
];

// ============================================================================
// KELAS 12: 7 MODUL MATEMATIKA KURIKULUM LENGKAP
// ============================================================================
export const MATERI_KELAS_12: MathTopic[] = [
  {
    "id": "dimensi-tiga",
    "grade": 12,
    "title": "Geometri Ruang (Dimensi Tiga)",
    "category": "Geometry",
    "icon": "",
    "color": "#eff6ff",
    "accentColor": "#2563eb",
    "readTime": "16 min belajar",
    "difficulty": "Hard",
    "summary": "Kedudukan titik, garis, dan bidang pada bangun ruang kubus dan limas, diagonal bidang s√2 & diagonal ruang s√3, jarak titik ke garis melalui proyeksi tegak lurus, jarak titik ke bidang, dan sudut antar bidang.",
    "detailedOverview": "Geometri Ruang Dimensi Tiga merupakan materi inti matematika wajib kelas 12 yang melatih daya spasial dan visualisasi tiga dimensi. Fokus pembelajaran adalah kubus ABCD.EFGH, balok, dan limas beraturan T.ABCD. Pembahasan mencakup penentuan posisi relatif (sejajar, berpotongan, bersilangan), jarak titik ke titik (teorema Pythagoras spasial), jarak titik ke garis (menggunakan proyeksi tegak lurus dan kesamaan luas segitiga), serta jarak titik ke bidang menggunakan bidang bantu orthogonal. Pemahaman materi ini sangat krusial karena selalu muncul sebagai soal berbobot tinggi pada Ujian Sekolah dan Penalaran Matematika UTBK SNBT.",
    "coreConcepts": [
      {
        "title": "Unsur Geometri dan Dimensi Kubus ABCD.EFGH",
        "points": [
          "Kubus dengan panjang rusuk s memiliki 8 titik sudut, 12 rusuk sama panjang, dan 6 sisi persegi kongruen.",
          "Panjang diagonal sisi (12 buah, misal AC, BD, AF, HF): d_s = s√2.",
          "Panjang diagonal ruang (4 buah, yaitu AG, BH, CE, DF): d_r = s√3.",
          "Bidang diagonal (6 buah, misal ACGE, BDHF): Berbentuk persegi panjang dengan luas L = s²√2.",
          "Garis bersilangan: Dua garis dikatakan bersilangan jika keduanya tidak sejajar dan tidak pernah berpotongan karena terletak pada bidang yang berbeda."
        ]
      },
      {
        "title": "Jarak Titik ke Garis",
        "points": [
          "Jarak dari titik P ke garis g adalah panjang ruas garis yang ditarik dari P dan tegak lurus (orthogonal) terhadap garis g.",
          "Metode Perbandingan Luas Segitiga: Jika titik P membentuk segitiga PAB dengan garis AB, gunakan Luas = 1/2 · AB · t = 1/2 · PA · t_PA untuk mengisolasi nilai t.",
          "Jika segitiga yang terbentuk adalah segitiga sama kaki atau sama sisi, garis tinggi tepat membagi garis alas menjadi dua segmen sama panjang."
        ]
      },
      {
        "title": "Jarak Titik ke Bidang",
        "points": [
          "Jarak titik P ke bidang α adalah panjang ruas garis proyeksi tegak lurus dari P ke bidang α.",
          "Gunakan bidang perantara (bidang potong tegak lurus) yang memuat titik P dan tegak lurus bidang tujuan.",
          "Trik Cepat Kubus: Jarak satu titik sudut ke bidang diagonal perwakilan di seberangnya bernilai 1/3 · s√3 (jarak dekat) atau 2/3 · s√3 (jarak jauh)."
        ]
      },
      {
        "title": "Sudut Antara Dua Bidang",
        "points": [
          "Sudut antara bidang α dan bidang β ditentukan dengan mencari garis potong persekutuan k = α ∩ β.",
          "Tarik garis g pada bidang α yang tegak lurus garis potong k, dan garis h pada bidang β yang tegak lurus garis potong k di titik potong yang sama.",
          "Sudut antara bidang α dan β adalah sudut antara garis g dan garis h: dihitung menggunakan aturan kosinus pada segitiga."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Diagonal Sisi & Ruang Kubus",
        "formula": "d_s = s√2   dan   d_r = s√3",
        "desc": "Panjang diagonal bidang muka dan diagonal ruang kubus berusuk s.",
        "note": "Ditranslasikan langsung dari teorema Pythagoras pada bidang datar dan ruang."
      },
      {
        "name": "Jarak Titik ke Garis (Metode Luas)",
        "formula": "t = (alas₁ · tinggi₁) / alas₂",
        "desc": "Menentukan jarak titik puncak segitiga ke alas menggunakan kesamaan rumus luas segitiga.",
        "note": "Paling sering diaplikasikan pada segitiga siku-siku di dalam kubus."
      },
      {
        "name": "Trik Jarak Sudut Kubus ke Bidang Diagonal",
        "formula": "d = 1/3 · s√3   atau   d = 2/3 · s√3",
        "desc": "Panjang ruas diagonal ruang yang dipotong tegak lurus oleh bidang frontal diagonal.",
        "note": "Gunakan 1/3 s√3 jika titik sudut dekat dengan bidang, gunakan 2/3 s√3 jika melintasi ruang."
      },
      {
        "name": "Jarak Antara Dua Titik Ruang 3D",
        "formula": "d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²)",
        "desc": "Formula jarak Euclidean tiga dimensi dalam sistem koordinat Cartesius.",
        "note": "Sangat berguna jika soal kubus diselesaikan menggunakan sistem koordinat analitik."
      }
    ],
    "examples": [
      {
        "question": "Pada kubus ABCD.EFGH dengan panjang rusuk 6 cm, tentukan jarak dari titik C ke garis diagonal sisi BD!",
        "level": "Basic",
        "steps": [
          "Perhatikan bidang alas ABCD yang berbentuk persegi dengan sisi 6 cm.",
          "BD adalah diagonal bidang persegi ABCD, dengan panjang BD = s√2 = 6√2 cm.",
          "Jarak dari titik C ke garis BD adalah ruas garis CO, di mana O adalah titik perpotongan diagonal AC dan BD.",
          "Karena diagonal persegi berpotongan tegak lurus dan saling membagi dua sama panjang, maka CO tegak lurus BD di titik tengah O.",
          "Panjang CO = 1/2 · AC = 1/2 · (6√2) = 3√2 cm."
        ],
        "answer": "3√2 cm",
        "tips": "Pada bangun persegi, jarak dari titik sudut ke diagonal sisi di depannya selalu sama dengan setengah panjang diagonal sisi (1/2 s√2)."
      },
      {
        "question": "Kubus ABCD.EFGH memiliki rusuk 8 cm. Tentukan jarak dari titik E ke garis diagonal ruang AG!",
        "level": "Intermediate",
        "steps": [
          "Perhatikan segitiga AEG di dalam kubus. AE adalah rusuk tegak (AE = 8 cm), EG adalah diagonal sisi atas (EG = 8√2 cm), dan AG adalah diagonal ruang (AG = 8√3 cm).",
          "Karena rusuk AE tegak lurus bidang atas EFGH, maka segitiga AEG adalah segitiga siku-siku di titik E.",
          "Jarak dari titik E ke diagonal ruang AG dimisalkan ruas garis t = EP yang ditarik tegak lurus ke AG.",
          "Gunakan kesamaan rumus luas segitiga AEG: 1/2 · AE · EG = 1/2 · AG · EP.",
          "Substitusikan nilai: 8 · 8√2 = 8√3 · EP ⟹ EP = (8 · 8√2) / (8√3) = (8√2) / √3.",
          "Rasionalkan penyebut: EP = (8√2 / √3) · (√3 / √3) = (8/3)√6 cm."
        ],
        "answer": "(8/3)√6 cm",
        "tips": "Segitiga siku-siku diagonal ruang AEG selalu memiliki perbandingan sisi 1 : √2 : √3. Jarak siku-sikunya selalu (s/3)√6."
      },
      {
        "question": "Diberikan kubus ABCD.EFGH dengan panjang rusuk 12 cm. Tentukan jarak dari titik C ke bidang diagonal AFH!",
        "level": "Advanced",
        "steps": [
          "Diagonal ruang CE berpotongan tegak lurus dengan bidang AFH dan bidang BDG.",
          "Bidang AFH dan bidang BDG membagi diagonal ruang CE menjadi 3 bagian yang sama panjang.",
          "Ruas CE memiliki panjang diagonal ruang = s√3 = 12√3 cm.",
          "Titik C berada di seberang bidang AFH dan harus melintasi bidang BDG terlebih dahulu, sehingga jarak titik C ke bidang AFH adalah 2/3 dari panjang diagonal ruang CE.",
          "Jarak = 2/3 · (s√3) = 2/3 · (12√3) = 8√3 cm.",
          "(Sementara jarak titik E ke bidang AFH adalah 1/3 · s√3 = 4√3 cm)."
        ],
        "answer": "8√3 cm",
        "tips": "Gunakan trik pembagian diagonal ruang 1/3 dan 2/3 untuk menyelesaikan soal jarak titik sudut ke bidang AFH/BDE/BDG tanpa perlu melukis segitiga proyeksi yang rumit."
      }
    ],
    "quickQuiz": [
      {
        "question": "Panjang diagonal ruang sebuah kubus dengan panjang rusuk 10 cm adalah...",
        "options": [
          "10√3 cm",
          "10√2 cm",
          "20 cm",
          "15 cm"
        ],
        "correctIndex": 0,
        "explanation": "Diagonal ruang kubus dengan rusuk s dirumuskan d_r = s√3. Untuk s = 10 cm, panjangnya adalah 10√3 cm."
      },
      {
        "question": "Pada kubus ABCD.EFGH, kedudukan garis AB dan garis CG adalah...",
        "options": [
          "Bersilangan tegak lurus",
          "Sejajar",
          "Berpotongan di satu titik",
          "Berimpit"
        ],
        "correctIndex": 0,
        "explanation": "Garis AB terletak pada bidang alas dan berarah horizontal, sedangkan garis CG adalah rusuk tegak vertikal di bagian belakang. Keduanya tidak sejajar dan tidak berpotongan karena tidak sebidang, sehingga berstatus bersilangan tegak lurus."
      },
      {
        "question": "Jarak dari titik A ke bidang BDE pada kubus dengan rusuk 6 cm adalah...",
        "options": [
          "2√3 cm",
          "3√3 cm",
          "4√3 cm",
          "2√2 cm"
        ],
        "correctIndex": 0,
        "explanation": "Jarak dari titik sudut terdekat A ke bidang BDE adalah 1/3 · s√3. Untuk s = 6 cm, Jarak = 1/3 · 6√3 = 2√3 cm."
      }
    ],
    "example": {
      "question": "Tentukan panjang diagonal bidang kubus dengan rusuk 5 cm.",
      "steps": [
        "Diagonal bidang kubus = s√2.",
        "Dengan s = 5 cm, maka diagonal bidang = 5√2 cm."
      ],
      "answer": "5√2 cm"
    }
  },
  {
    "id": "statistika",
    "grade": 12,
    "title": "Statistika Data Berkelompok",
    "category": "Statistics",
    "icon": "",
    "color": "#fef3c7",
    "accentColor": "#d97706",
    "readTime": "16 min belajar",
    "difficulty": "Medium",
    "summary": "Tabel distribusi frekuensi, penentuan tepi kelas & panjang interval, Mean data kelompok (titik tengah & rata-rata sementara/koding), Median (kuartil tengah), Modus (frekuensi puncak), kuartil data kelompok, dan simpangan baku.",
    "detailedOverview": "Statistika data berkelompok merupakan kompetensi utama analisis data kelas 12 SMA. Ketika volume data mentah berukuran besar, data dikelompokkan ke dalam kelas-kelas interval menggunakan tabel distribusi frekuensi atau diagram histogram dan poligon. Pembelajaran berfokus pada dua pilar analisis: Ukuran Pemusatan Data (Mean yang dihitung menggunakan titik tengah xᵢ atau rata-rata sementara uᵢ, Median melalui interpolasi frekuensi kumulatif, dan Modus menggunakan selisih frekuensi puncak d₁ dan d₂), serta Ukuran Penyebaran Data (Kuartil Q₁, Q₂, Q₃, Jangkauan Interkuartil IQR, Varians/Ragam, dan Simpangan Baku). Pemahaman materi ini menjadi bekal langsung untuk penelitian ilmiah, survei statistik, dan data science.",
    "coreConcepts": [
      {
        "title": "Struktur Tabel Distribusi Frekuensi",
        "points": [
          "Batas Bawah (BB) dan Batas Atas (BA) kelas interval.",
          "Tepi Bawah: T_b = BB - 0,5 dan Tepi Atas: T_a = BA + 0,5 (untuk ketelitian data bulat).",
          "Panjang Kelas (p atau c): p = T_a - T_b = (BA - BB) + 1.",
          "Titik Tengah Kelas (xᵢ): xᵢ = (BB + BA) / 2."
        ]
      },
      {
        "title": "Rata-Rata (Mean) Data Berkelompok",
        "points": [
          "Metode Titik Tengah Biasa: x̄ = (∑ fᵢ · xᵢ) / (∑ fᵢ).",
          "Metode Rata-Rata Sementara (Koding): x̄ = x_s + p · [(∑ fᵢ · uᵢ) / (∑ fᵢ)], di mana x_s adalah titik tengah kelas dengan frekuensi terbesar dan uᵢ adalah bilangan bulat ..., -2, -1, 0, 1, 2, ...",
          "Metode koding sangat efektif mereduksi angka perkalian yang besar menjadi aritmatika bilangan bulat kecil."
        ]
      },
      {
        "title": "Median dan Modus Data Berkelompok",
        "points": [
          "Median (Me): Terletak pada data ke- 1/2 · N. Rumus interpolasi: Me = T_b + p · [((1/2 · N) - ∑f_k) / f_me].",
          "∑f_k adalah frekuensi kumulatif tepat sebelum kelas median, dan f_me adalah frekuensi kelas median.",
          "Modus (Mo): Terletak pada kelas dengan frekuensi absolut terbesar. Rumus: Mo = T_b + p · [d₁ / (d₁ + d₂)].",
          "d₁ = f_modus - f_sebelumnya, dan d₂ = f_modus - f_sesudahnya."
        ]
      },
      {
        "title": "Ukuran Penyebaran (Kuartil & Simpangan Baku)",
        "points": [
          "Kuartil ke-i (Qᵢ): Qᵢ = T_b + p · [((i/4 · N) - ∑f_k) / f_Qᵢ] untuk i = 1 (Kuartil Bawah) dan i = 3 (Kuartil Atas).",
          "Jangkauan Semi Interkuartil (Simpangan Kuartil): Q_d = 1/2 · (Q₃ - Q₁).",
          "Simpangan Baku (S): S = √[∑ fᵢ(xᵢ - x̄)² / N]."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Mean Data Kelompok (Metode Koding)",
        "formula": "x̄ = x_s + p · (∑ fᵢuᵢ / ∑ fᵢ)",
        "desc": "Menghitung rata-rata dengan titik tengah acuan x_s dan kode bulat uᵢ.",
        "note": "Pilih x_s pada kelas frekuensi terbesar agar angka perkalian seminimal mungkin."
      },
      {
        "name": "Median Data Kelompok",
        "formula": "Me = T_b + p · [((1/2 · N) - ∑f_k) / f_me]",
        "desc": "Menentukan nilai tengah yang membagi 50% data di bawah dan di atasnya.",
        "note": "T_b adalah tepi bawah kelas yang memuat datum ke- N/2."
      },
      {
        "name": "Modus Data Kelompok",
        "formula": "Mo = T_b + p · [d₁ / (d₁ + d₂)]",
        "desc": "Nilai yang paling sering muncul pada data berkelompok.",
        "note": "d₁ selisih frekuensi kelas modus dengan kelas sebelumnya, d₂ dengan kelas sesudahnya."
      },
      {
        "name": "Kuartil ke-i Data Kelompok",
        "formula": "Qᵢ = T_b + p · [((i/4 · N) - ∑f_k) / f_Qᵢ]",
        "desc": "Membagi urutan data menjadi 4 bagian sama besar (i = 1, 2, 3).",
        "note": "Q₂ identik dengan nilai Median data."
      },
      {
        "name": "Simpangan Baku (Standar Deviasi)",
        "formula": "S = √[∑ fᵢ(xᵢ - x̄)² / ∑ fᵢ]",
        "desc": "Ukuran dispersi yang mengukur seberapa jauh data tersebar dari nilai rata-ratanya.",
        "note": "Kuadrat dari simpangan baku S² disebut sebagai Varians atau Ragam."
      }
    ],
    "examples": [
      {
        "question": "Data nilai ujian matematika disajikan sebagai berikut: Kelas 40-49 (frekuensi 4), 50-59 (6), 60-69 (10), 70-79 (14), 80-89 (4), 90-99 (2). Total N = 40. Hitunglah nilai Mean data tersebut!",
        "level": "Basic",
        "steps": [
          "Tentukan titik tengah (xᵢ) masing-masing kelas: 44.5, 54.5, 64.5, 74.5, 84.5, 94.5. Panjang kelas p = 10.",
          "Gunakan metode koding: pilih kelas 70-79 sebagai rata-rata sementara karena memiliki frekuensi terbesar (f = 14), maka x_s = 74.5.",
          "Tetapkan nilai kode uᵢ: untuk kelas 70-79 u = 0 ; kelas 60-69 u = -1 ; kelas 50-59 u = -2 ; kelas 40-49 u = -3 ; kelas 80-89 u = 1 ; kelas 90-99 u = 2.",
          "Hitung perkalian fᵢ · uᵢ: (4 · -3) + (6 · -2) + (10 · -1) + (14 · 0) + (4 · 1) + (2 · 2) = -12 - 12 - 10 + 0 + 4 + 4 = -26.",
          "Hitung rata-rata: x̄ = x_s + p · (∑fᵢuᵢ / N) = 74.5 + 10 · (-26 / 40) = 74.5 + 10 · (-0.65) = 74.5 - 6.5 = 68.0."
        ],
        "answer": "68.0",
        "tips": "Metode koding menghindari perkalian ratusan dan pecahan rumit. Cukup menjumlahkan angka-angka bulat kecil."
      },
      {
        "question": "Dari tabel distribusi frekuensi: Kelas 21-25 (f = 3), 26-30 (f = 5), 31-35 (f = 10), 36-40 (f = 6), 41-45 (f = 4). Tentukan Modus dari data tersebut!",
        "level": "Intermediate",
        "steps": [
          "Identifikasi kelas modus, yaitu kelas dengan frekuensi terbesar: f = 10 pada kelas interval 31 - 35.",
          "Tentukan tepi bawah kelas modus: T_b = 31 - 0.5 = 30.5.",
          "Tentukan panjang kelas: p = (35 - 31) + 1 = 5.",
          "Hitung selisih frekuensi d₁ terhadap kelas sebelumnya: d₁ = 10 - 5 = 5.",
          "Hitung selisih frekuensi d₂ terhadap kelas sesudahnya: d₂ = 10 - 6 = 4.",
          "Masukkan ke rumus Modus: Mo = T_b + p · [d₁ / (d₁ + d₂)] = 30.5 + 5 · [5 / (5 + 4)] = 30.5 + (25 / 9) = 30.5 + 2.78 = 33.28."
        ],
        "answer": "33.28",
        "tips": "Pastikan nilai hasil akhir modus selalu berada di dalam rentang kelas modusnya (33.28 berada di dalam rentang 31 - 35)."
      },
      {
        "question": "Tentukan nilai Median dari data pada tabel frekuensi berikut: 11-15 (f = 2), 16-20 (f = 7), 21-25 (f = 12), 26-30 (f = 11), 31-35 (f = 8). Total frekuensi N = 40!",
        "level": "Advanced",
        "steps": [
          "Cari letak posisi median: Datum ke- 1/2 · N = 1/2 · 40 = datum ke-20.",
          "Hitung frekuensi kumulatif (f_k): kelas 1 = 2 ; kelas 2 = 9 ; kelas 3 = 21. Datum ke-20 berada pada kelas interval ke-3 (21 - 25).",
          "Tentukan parameter kelas median: Tepi bawah T_b = 21 - 0.5 = 20.5 ; Panjang kelas p = 5.",
          "Frekuensi kumulatif sebelum kelas median: ∑f_k = 2 + 7 = 9.",
          "Frekuensi kelas median: f_me = 12.",
          "Substitusikan ke rumus Median: Me = T_b + p · [((N/2) - ∑f_k) / f_me] = 20.5 + 5 · [(20 - 9) / 12] = 20.5 + 5 · (11 / 12) = 20.5 + (55 / 12) = 20.5 + 4.58 = 25.08."
        ],
        "answer": "25.08",
        "tips": "Jangan tertukar antara frekuensi kumulatif sebelum kelas median (∑f_k = 9) dengan frekuensi absolut kelas median itu sendiri (f_me = 12)."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jika panjang kelas interval adalah p = 6, tepi bawah T_b = 49.5, d₁ = 4, dan d₂ = 2, berapakah nilai Modusnya?",
        "options": [
          "53.5",
          "52.5",
          "51.5",
          "54.0"
        ],
        "correctIndex": 0,
        "explanation": "Mo = T_b + p · [d₁ / (d₁ + d₂)] = 49.5 + 6 · [4 / (4 + 2)] = 49.5 + 6 · (4 / 6) = 49.5 + 4 = 53.5."
      },
      {
        "question": "Titik tengah dari kelas interval 50 - 58 adalah...",
        "options": [
          "54",
          "53.5",
          "54.5",
          "55"
        ],
        "correctIndex": 0,
        "explanation": "xᵢ = (BB + BA) / 2 = (50 + 58) / 2 = 108 / 2 = 54."
      },
      {
        "question": "Rumus untuk menentukan letak kuartil atas (Q₃) pada data berkelompok dengan total frekuensi N adalah...",
        "options": [
          "Datum ke- 3/4 · N",
          "Datum ke- 1/4 · N",
          "Datum ke- 1/2 · N",
          "Datum ke- 3/4 · (N + 1)"
        ],
        "correctIndex": 0,
        "explanation": "Kuartil atas Q₃ membagi 75% data di bawahnya, sehingga posisinya terletak pada datum ke- 3/4 · N."
      }
    ],
    "example": {
      "question": "Tentukan panjang kelas dari interval 21 - 25.",
      "steps": [
        "Tepi Bawah = 21 - 0.5 = 20.5.",
        "Tepi Atas = 25 + 0.5 = 25.5.",
        "Panjang kelas p = 25.5 - 20.5 = 5 (atau 25 - 21 + 1 = 5)."
      ],
      "answer": "5"
    }
  },
  {
    "id": "kaidah-pencacahan",
    "grade": 12,
    "title": "Kaidah Pencacahan (Permutasi & Kombinasi)",
    "category": "Combinatorics & Probability",
    "icon": "",
    "color": "#ecfdf5",
    "accentColor": "#059669",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Aturan penjumlahan & aturan perkalian (Filling Slots), notasi faktorial n!, permutasi unsur berbeda (nPr), permutasi dengan unsur yang sama, permutasi melingkar siklis ((n-1)!), dan kombinasi nCr.",
    "detailedOverview": "Kaidah Pencacahan merupakan cabang kombinatorika matematika yang mempelajari metode sistematis untuk menghitung banyaknya kemungkinan susunan, pilihan, atau cara terjadinya suatu peristiwa tanpa harus mendaftarkan anggotanya satu per satu. Pembahasan diawali dengan Aturan Penjumlahan (untuk opsi pilihan yang saling lepas/kejadian 'ATAU') dan Aturan Perkalian (untuk rangkaian tahapan berurutan/kejadian 'DAN'). Selanjutnya, siswa mempelajari Permutasi (di mana urutan sangat diperhatikan, seperti pemilihan jabatan ketua-sekretaris-bendahara, nomor antrean, atau plat kendaraan) dan Kombinasi (di mana urutan diabaikan, seperti memilih delegasi tim, jabat tangan, atau mengambil kelereng dari kotak). Penguasaan konsep ini menjadi dasar utama teori peluang modern dan pemrograman algoritma kombinatorial.",
    "coreConcepts": [
      {
        "title": "Aturan Dasar: Penjumlahan dan Perkalian (Filling Slots)",
        "points": [
          "Aturan Penjumlahan: Jika peristiwa A dapat terjadi dengan m cara dan peristiwa B dapat terjadi dengan n cara (keduanya saling lepas/tidak dapat terjadi bersamaan), maka peristiwa A ATAU B dapat terjadi dengan (m + n) cara.",
          "Aturan Perkalian (Pengisian Tempat/Filling Slots): Jika suatu prosedur terdiri dari k tahap berurutan di mana tahap 1 ada n₁ cara, tahap 2 ada n₂ cara, ..., maka seluruh prosedur dapat terjadi dengan n₁ × n₂ × ... × n_k cara.",
          "Sering digunakan untuk menghitung banyaknya bilangan dengan syarat tertentu (angka ganjil/genap, lebih besar dari nilai tertentu, angka boleh berulang atau tidak boleh berulang)."
        ]
      },
      {
        "title": "Notasi Faktorial dan Permutasi",
        "points": [
          "Definisi Faktorial: n! = n × (n - 1) × (n - 2) × ... × 2 × 1. Definisi penting: 0! = 1 dan 1! = 1.",
          "Permutasi Unsur Berbeda (Urutan Diperhatikan): Banyaknya cara menyusun r unsur dari n unsur berbeda: nPr = n! / (n - r)!.",
          "Ciri khas soal permutasi: Ada penugasan jabatan struktural (Juara 1, 2, 3), susunan baris berurutan, atau pembentukan kata sandi kode unik."
        ]
      },
      {
        "title": "Permutasi Khusus (Unsur Sama & Permutasi Siklis)",
        "points": [
          "Permutasi Unsur yang Sama: Menyusun n unsur di mana terdapat kelompok unsur yang identik sebanyak k₁, k₂, ...: P = n! / (k₁! · k₂! · ...). Contoh: Menghitung susunan huruf dari kata 'MATEMATIKA'.",
          "Permutasi Siklis (Susunan Melingkar): Banyaknya cara menyusun n objek berbeda mengelilingi meja bundar: P_siklis = (n - 1)!.",
          "Jika ada objek tertentu yang harus selalu berdampingan/duduk bersama, satukan objek-objek tersebut dan anggap sebagai 1 unsur tunggal."
        ]
      },
      {
        "title": "Kombinasi (Urutan Tidak Diperhatikan)",
        "points": [
          "Definisi Kombinasi: Banyaknya cara memilih r unsur dari n unsur tanpa memperhatikan urutan susunannya: nCr = n! / [r! · (n - r)!].",
          "Ciri khas soal kombinasi: Memilih anggota panitia, mengambil beberapa bola secara acak dari kantong, memilih soal ujian yang akan dikerjakan, dan jabat tangan antar-orang.",
          "Sifat simetri kombinasi: nCr = nC_(n-r). Contoh: ₁₀C₈ = ₁₀C₂ = (10 · 9) / (2 · 1) = 45."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Permutasi Unsur Berbeda (nPr)",
        "formula": "nPr = n! / (n - r)!",
        "desc": "Menyusun r objek dari n objek yang ada dengan memperhatikan urutan.",
        "note": "Contoh: ₅P₂ = 5! / 3! = 5 · 4 = 20."
      },
      {
        "name": "Kombinasi Unsur (nCr)",
        "formula": "nCr = n! / [r! · (n - r)!]",
        "desc": "Memilih r objek dari n objek yang ada tanpa memperhatikan urutan susunan.",
        "note": "Contoh: ₅C₂ = 5! / (2! · 3!) = (5 · 4) / 2 = 10."
      },
      {
        "name": "Permutasi dengan Unsur Sama",
        "formula": "P = n! / (p! · q! · r!)",
        "desc": "Menyusun kata atau kode ketika ada huruf/angka yang berulang.",
        "note": "p, q, r adalah banyaknya masing-masing unsur yang sama."
      },
      {
        "name": "Permutasi Siklis (Melingkar)",
        "formula": "P_siklis = (n - 1)!",
        "desc": "Banyaknya cara duduk melingkar mengelilingi meja bundar.",
        "note": "Kunci satu posisi sebagai titik acuan, lalu permutasikan sisa (n - 1) unsur."
      },
      {
        "name": "Trik Jabat Tangan",
        "formula": "Total Salaman = nC₂ = n(n - 1) / 2",
        "desc": "Banyaknya jabat tangan yang terjadi antara n orang jika setiap orang saling bersalaman satu kali.",
        "note": "Setiap jabat tangan melibatkan tepat 2 orang tanpa urutan."
      }
    ],
    "examples": [
      {
        "question": "Berapa banyak bilangan bulat yang terdiri dari 3 angka berlainan yang dapat disusun dari angka-angka 1, 2, 3, 4, 5, 6, 7 jika bilangan tersebut harus bernilai ganjil?",
        "level": "Basic",
        "steps": [
          "Gunakan metode pengisian tempat (Filling Slots) 3 kotak: [Ratusan] [Puluhan] [Satuan].",
          "Kondisi khusus: Bilangan harus ganjil, maka tentukan isi kotak Satuan terlebih dahulu.",
          "Angka ganjil yang tersedia dari himpunan {1, 2, 3, 4, 5, 6, 7} ada 4 angka: {1, 3, 5, 7}. Maka kotak Satuan = 4 cara.",
          "Angka tidak boleh berulang (berlainan). Dari total 7 angka, 1 angka telah digunakan di kotak satuan, tersisa 6 angka untuk kotak Ratusan = 6 cara.",
          "Dua angka telah digunakan, tersisa 5 angka untuk kotak Puluhan = 5 cara.",
          "Hitung total kemungkinan susunan bilangan: 6 × 5 × 4 = 120 bilangan."
        ],
        "answer": "120 bilangan",
        "tips": "Selalu isi kotak yang memiliki syarat khusus (dalam kasus ini kotak satuan untuk bilangan ganjil) terlebih dahulu."
      },
      {
        "question": "Tentukan banyaknya susunan kata berbeda yang dapat dibentuk dari seluruh huruf penyusun kata 'MATEMATIKA'!",
        "level": "Intermediate",
        "steps": [
          "Hitung total banyaknya huruf n: M-A-T-E-M-A-T-I-K-A memiliki total n = 10 huruf.",
          "Identifikasi frekuensi huruf-huruf yang berulang: Huruf M ada 2 ; Huruf A ada 3 ; Huruf T ada 2 ; Huruf E ada 1 ; Huruf I ada 1 ; Huruf K ada 1.",
          "Gunakan rumus permutasi dengan unsur yang sama: P = n! / (k_M! · k_A! · k_T!).",
          "Substitusikan nilai faktorial: P = 10! / (2! · 3! · 2!).",
          "Hitung penjabaran faktorial: 10! / 3! = 10 · 9 · 8 · 7 · 6 · 5 · 4 = 604.800.",
          "Bagi dengan (2! · 2!) = (2 · 2) = 4: P = 604.800 / 4 = 151.200 susunan kata."
        ],
        "answer": "151.200 susunan kata",
        "tips": "Coret faktorial terbesar terlebih dahulu (dalam soal ini coret 3!) untuk meminimalisir angka pembagian."
      },
      {
        "question": "Dari sebuah kelompok yang terdiri dari 6 pria dan 5 wanita, akan dipilih 4 orang delegasi perwakilan. Berapa banyak cara memilih jika delegasi tersebut harus memuat minimal 2 orang wanita?",
        "level": "Advanced",
        "steps": [
          "Syarat 'minimal 2 wanita' dari total 4 orang delegasi menghasilkan 3 kemungkinan kasus kombinasi:",
          "Kasus 1 (2 Wanita dan 2 Pria): ₅C₂ × ₆C₂ = [(5 · 4)/2] × [(6 · 5)/2] = 10 × 15 = 150 cara.",
          "Kasus 2 (3 Wanita dan 1 Pria): ₅C₃ × ₆C₁ = ₅C₂ × 6 = 10 × 6 = 60 cara.",
          "Kasus 3 (4 Wanita dan 0 Pria): ₅C₄ × ₆C₀ = 5 × 1 = 5 cara.",
          "Karena ketiga kasus tersebut saling meniadakan (kejadian ATAU), jumlahkan seluruh hasil kemungkinan: 150 + 60 + 5 = 215 cara."
        ],
        "answer": "215 cara",
        "tips": "Pecah syarat 'minimal' atau 'paling sedikit' menjadi kasus-kasus yang saling lepas, hitung masing-masing kombinasi lalu jumlahkan."
      }
    ],
    "quickQuiz": [
      {
        "question": "Nilai dari ₈C₃ (Kombinasi 3 dari 8) adalah...",
        "options": [
          "56",
          "336",
          "24",
          "112"
        ],
        "correctIndex": 0,
        "explanation": "₈C₃ = (8 · 7 · 6) / (3 · 2 · 1) = 336 / 6 = 56."
      },
      {
        "question": "Enam orang sahabat sedang makan malam bersama mengelilingi meja bundar. Banyaknya cara mereka dapat duduk melingkar adalah...",
        "options": [
          "120 cara",
          "720 cara",
          "24 cara",
          "60 cara"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan rumus permutasi siklis: P_siklis = (n - 1)! = (6 - 1)! = 5! = 5 · 4 · 3 · 2 · 1 = 120 cara."
      },
      {
        "question": "Dalam suatu pertemuan yang dihadiri oleh 10 orang, setiap orang saling bersalaman satu kali dengan orang lainnya. Total jabat tangan yang terjadi adalah...",
        "options": [
          "45 salaman",
          "90 salaman",
          "100 salaman",
          "20 salaman"
        ],
        "correctIndex": 0,
        "explanation": "Banyak jabat tangan = ₁₀C₂ = (10 · 9) / (2 · 1) = 90 / 2 = 45 salaman."
      }
    ],
    "example": {
      "question": "Hitunglah nilai dari ₅P₂.",
      "steps": [
        "₅P₂ = 5! / (5 - 2)! = 5! / 3!.",
        "5! / 3! = (5 · 4 · 3!) / 3! = 5 · 4 = 20."
      ],
      "answer": "20"
    }
  },
  {
    "id": "peluang-majemuk",
    "grade": 12,
    "title": "Peluang Majemuk & Bersyarat",
    "category": "Combinatorics & Probability",
    "icon": "",
    "color": "#fef2f2",
    "accentColor": "#e11d48",
    "readTime": "15 min belajar",
    "difficulty": "Medium",
    "summary": "Ruang sampel n(S), komplemen kejadian P(A') = 1 - P(A), frekuensi harapan, peluang kejadian saling lepas P(A ∪ B), peluang kejadian saling bebas P(A ∩ B), dan peluang bersyarat P(A|B).",
    "detailedOverview": "Teori Peluang mempelajari pengukuran derajat kepastian atau kemungkinan terjadinya suatu peristiwa acak. Berangkat dari peluang empirik dan teoritik kejadian tunggal P(A) = n(A) / n(S), materi peluang kelas 12 memperluas kajian ke Peluang Kejadian Majemuk yang menggabungkan dua atau lebih peristiwa acak. Siswa mendalami perbedaan mendasar antara Kejadian Saling Lepas (dua peristiwa yang mustahil terjadi bersamaan, kata hubung 'ATAU', P(A ∪ B) = P(A) + P(B)) dan Kejadian Saling Bebas (terjadinya peristiwa A tidak mempengaruhi kemungkinan terjadinya peristiwa B, kata hubung 'DAN', P(A ∩ B) = P(A) · P(B)). Lebih lanjut, Peluang Bersyarat P(A|B) memodelkan probabilitas kejadian yang dipengaruhi oleh riwayat kejadian sebelumnya (seperti pengambilan kartu atau kelereng tanpa pengembalian). Materi ini menjadi fondasi statistika inferensial, pemodelan resiko finansial, dan kecerdasan buatan Naive Bayes.",
    "coreConcepts": [
      {
        "title": "Ruang Sampel, Titik Sampel, dan Komplemen",
        "points": [
          "Ruang Sampel (S) adalah himpunan seluruh hasil yang mungkin dari suatu percobaan acak. Banyaknya anggota ruang sampel dinotasikan n(S).",
          "Peluang Klasik: P(A) = n(A) / n(S), dengan rentang nilai pasti 0 ≤ P(A) ≤ 1 (0 = kemustahilan, 1 = kepastian mutlak).",
          "Komplemen Suatu Kejadian (A'): Kejadian bukan A. Berlaku P(A') = 1 - P(A). Sangat berguna menyelesaikan soal dengan kata 'minimal satu'.",
          "Frekuensi Harapan: F_h(A) = N · P(A), di mana N adalah banyaknya pengulangan percobaan."
        ]
      },
      {
        "title": "Kejadian Saling Lepas vs Tidak Saling Lepas",
        "points": [
          "Kejadian Saling Lepas (Mutually Exclusive): Dua kejadian A dan B tidak mungkin terjadi secara bersamaan (irisan kosong A ∩ B = ∅). Rumus: P(A ∪ B) = P(A) + P(B).",
          "Kejadian Tidak Saling Lepas: Ada elemen persekutuan yang memenuhi kejadian A sekaligus kejadian B (A ∩ B ≠ ∅). Rumus: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).",
          "Contoh tidak saling lepas: Peluang terambil kartu bernomor genap ATAU kartu bergambar hati dari satu set kartu bridge."
        ]
      },
      {
        "title": "Kejadian Saling Bebas (Independent Events)",
        "points": [
          "Dua kejadian A dan B dikatakan saling bebas jika kepastian terjadinya kejadian A sama sekali tidak mempengaruhi peluang terjadinya kejadian B.",
          "Rumus Perkalian Kejadian Saling Bebas: P(A ∩ B) = P(A) · P(B).",
          "Contoh klasik: Pelemparan dua buah dadu secara serentak, pelemparan uang koin berulang kali, atau dua orang penembak membidik sasaran secara mandiri."
        ]
      },
      {
        "title": "Peluang Bersyarat (Conditional Probability)",
        "points": [
          "Peluang terjadinya peristiwa A dengan syarat peristiwa B telah terjadi lebih dahulu: P(A|B) = P(A ∩ B) / P(B) dengan syarat P(B) > 0.",
          "Dari rumus ini diperoleh aturan perkalian peluang bersyarat: P(A ∩ B) = P(B) · P(A|B).",
          "Aplikasi paling umum adalah pengambilan bertahap TANPA PENGEMBALIAN, di mana ruang sampel pada pengambilan kedua berkurang (n(S) - 1)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Peluang Klasik & Komplemen",
        "formula": "P(A) = n(A) / n(S)   |   P(A') = 1 - P(A)",
        "desc": "Definisi peluang teoretik dan sifat peluang kejadian komplemen (kebalikan).",
        "note": "Gunakan trik komplemen untuk soal yang memuat kata 'paling sedikit satu'."
      },
      {
        "name": "Peluang Gabungan Tidak Saling Lepas",
        "formula": "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
        "desc": "Peluang terjadinya A atau B jika kedua peristiwa dapat terjadi secara serempak.",
        "note": "Kurangkan irisan P(A ∩ B) agar anggota yang berada di perpotongan tidak dihitung ganda."
      },
      {
        "name": "Kejadian Saling Bebas",
        "formula": "P(A ∩ B) = P(A) · P(B)",
        "desc": "Peluang terjadinya peristiwa A dan peristiwa B secara serentak jika keduanya saling independen.",
        "note": "Ditandai dengan kata hubung 'DAN' pada dua percobaan terpisah."
      },
      {
        "name": "Peluang Bersyarat P(A|B)",
        "formula": "P(A|B) = P(A ∩ B) / P(B)",
        "desc": "Peluang kejadian A terjadi jika diketahui bahwa kejadian B sudah terjadi sebelumnya.",
        "note": "P(B) bertindak sebagai ruang sampel baru yang diperkecil."
      },
      {
        "name": "Frekuensi Harapan",
        "formula": "F_h(A) = N · P(A)",
        "desc": "Ekspektasi berapa kali suatu peristiwa diharapkan muncul dalam N kali percobaan.",
        "note": "N menyatakan banyaknya percobaan yang dilakukan."
      }
    ],
    "examples": [
      {
        "question": "Dua buah dadu bermata enam dilempar bersamaan satu kali. Tentukan peluang munculnya jumlah mata dadu sama dengan 7 ATAU jumlah mata dadu sama dengan 10!",
        "level": "Basic",
        "steps": [
          "Banyaknya ruang sampel pelemparan 2 dadu adalah n(S) = 6 × 6 = 36.",
          "Misalkan A = kejadian jumlah mata dadu 7: titik sampelnya {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)} ⟹ n(A) = 6. Maka P(A) = 6/36.",
          "Misalkan B = kejadian jumlah mata dadu 10: titik sampelnya {(4,6), (5,5), (6,4)} ⟹ n(B) = 3. Maka P(B) = 3/36.",
          "Kejadian A dan B adalah kejadian saling lepas karena jumlah mata dadu tidak mungkin 7 sekaligus 10 pada satu lemparan yang sama (A ∩ B = ∅).",
          "Gunakan rumus kejadian saling lepas: P(A ∪ B) = P(A) + P(B) = 6/36 + 3/36 = 9/36 = 1/4."
        ],
        "answer": "1/4",
        "tips": "Identifikasi apakah kedua peristiwa bisa terjadi bersamaan. Jika mustahil, langsung jumlahkan peluang masing-masing."
      },
      {
        "question": "Dalam sebuah kotak terdapat 5 bola merah dan 3 bola biru. Diambil dua bola satu per satu secara acak TANPA PENGEMBALIAN. Tentukan peluang terambilnya bola pertama merah DAN bola kedua biru!",
        "level": "Intermediate",
        "steps": [
          "Total bola mula-mula dalam kotak: 5 + 3 = 8 bola.",
          "Peluang terambil bola pertama Merah (P(M₁)): Terdapat 5 bola merah dari 8 bola total ⟹ P(M₁) = 5/8.",
          "Karena bola pertama tidak dikembalikan, maka sisa bola dalam kotak sekarang berkurang menjadi 7 bola (4 merah dan 3 biru).",
          "Peluang terambil bola kedua Biru dengan syarat bola pertama merah (P(B₂|M₁)): Terdapat 3 bola biru dari 7 bola tersisa ⟹ P(B₂|M₁) = 3/7.",
          "Gunakan aturan perkalian peluang bersyarat: P(M₁ ∩ B₂) = P(M₁) · P(B₂|M₁) = (5/8) · (3/7) = 15 / 56."
        ],
        "answer": "15 / 56",
        "tips": "Perhatikan frasa 'tanpa pengembalian'! Ruang sampel pada pengambilan berikutnya harus dikurangi 1."
      },
      {
        "question": "Peluang seorang penembak A mengenai sasaran adalah 0.7 dan peluang penembak B mengenai sasaran adalah 0.8. Keduanya menembak sasaran yang sama secara independen satu kali. Tentukan peluang bahwa sasaran tersebut tertembak oleh PALING SEDIKIT SATU penembak!",
        "level": "Advanced",
        "steps": [
          "Peluang A tepat sasaran: P(A) = 0.7 ⟹ Peluang A meleset (komplemen): P(A') = 1 - 0.7 = 0.3.",
          "Peluang B tepat sasaran: P(B) = 0.8 ⟹ Peluang B meleset (komplemen): P(B') = 1 - 0.8 = 0.2.",
          "Peristiwa 'sasaran tertembak oleh paling sedikit satu penembak' merupakan komplemen dari peristiwa 'KEDUA penembak sama-sama meleset'.",
          "Karena kedua penembak menembak secara independen (saling bebas), peluang keduanya meleset adalah: P(A' ∩ B') = P(A') · P(B') = 0.3 · 0.2 = 0.06.",
          "Gunakan trik komplemen: P(Paling sedikit 1 kena) = 1 - P(Kedua penembak meleset) = 1 - 0.06 = 0.94."
        ],
        "answer": "0.94",
        "tips": "Trik komplemen 1 - P(Semua gagal) jauh lebih cepat daripada menjumlahkan 3 kasus (A kena saja + B kena saja + keduanya kena)."
      }
    ],
    "quickQuiz": [
      {
        "question": "Sebuah dadu dilempar satu kali. Peluang munculnya mata dadu bilangan prima ATAU genap adalah...",
        "options": [
          "5/6",
          "1/2",
          "2/3",
          "1"
        ],
        "correctIndex": 0,
        "explanation": "Ruang sampel S = {1, 2, 3, 4, 5, 6} (n = 6). Prima A = {2, 3, 5} (n = 3). Genap B = {2, 4, 6} (n = 3). Irisan A ∩ B = {2} (n = 1). P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 3/6 + 3/6 - 1/6 = 5/6."
      },
      {
        "question": "Tiga keping uang logam dilempar bersamaan sebanyak 80 kali. Frekuensi harapan munculnya paling sedikit dua sisi Gambar adalah...",
        "options": [
          "40 kali",
          "30 kali",
          "50 kali",
          "20 kali"
        ],
        "correctIndex": 0,
        "explanation": "Ruang sampel 3 koin n(S) = 2³ = 8. Paling sedikit 2 Gambar: GGE, GEG, EGG, GGG ada 4 titik sampel. Peluang P = 4/8 = 1/2. Frekuensi Harapan = N · P = 80 · 1/2 = 40 kali."
      },
      {
        "question": "Peluang seorang siswa lulus ujian matematika adalah 0.85. Berapakah peluang siswa tersebut TIDAK lulus ujian matematika?",
        "options": [
          "0.15",
          "0.25",
          "0.85",
          "0.05"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan peluang komplemen: P(Tidak Lulus) = 1 - P(Lulus) = 1 - 0.85 = 0.15."
      }
    ],
    "example": {
      "question": "Dua dadu dilempar sekali. Tentukan peluang jumlah mata dadu bernilai 8.",
      "steps": [
        "n(S) = 36.",
        "Pasangan mata dadu berjumlah 8: (2,6), (3,5), (4,4), (5,3), (6,2) ⟹ ada 5 titik sampel.",
        "Peluang = 5 / 36."
      ],
      "answer": "5/36"
    }
  },
  {
    "id": "kalkulus-lanjut",
    "grade": 12,
    "title": "Limit & Turunan Trigonometri",
    "category": "Calculus",
    "icon": "",
    "color": "#fff7ed",
    "accentColor": "#ea580c",
    "readTime": "16 min belajar",
    "difficulty": "Hard",
    "summary": "Teorema limit trigonometri lim(x→0) sin(ax)/bx = a/b, trik identitas sudut rangkap cosinus 1 - cos(kx), turunan dasar sin, cos, tan, aturan perkalian & pembagian u/v, dan aturan rantai (Chain Rule).",
    "detailedOverview": "Limit dan Turunan Fungsi Trigonometri merupakan materi kalkulus tingkat lanjut pada matematika peminatan/lanjutan kelas 12 SMA. Pada limit trigonometri, teorema dasar menyatakan bahwa untuk nilai x yang mendekati nol, kurva sinus dan tangen mendekati garis lurus identitas y = x, sehingga lim(x→0) sin(ax)/(bx) = a/b dan lim(x→0) tan(ax)/(bx) = a/b. Penanganan khusus diterapkan pada bentuk cosinus melalui identitas sudut rangkap 1 - cos(kx) = 2 sin²(kx/2). Sementara itu, turunan trigonometri diturunkan dari definisi limit laju perubahan, menghasilkan aturan baku turunan sinus adalah cosinus, dan turunan cosinus adalah minus sinus. Materi ini diaplikasikan secara mendalam pada analisis getaran osilasi harmonik fisika, pemrosesan gelombang elektromagnetik, dan rekayasa kelistrikan AC.",
    "coreConcepts": [
      {
        "title": "Teorema Dasar Limit Trigonometri Menuju Nol",
        "points": [
          "Teorema Inti: lim(x→0) [sin(ax) / bx] = a/b dan lim(x→0) [ax / sin(bx)] = a/b.",
          "Teorema Tangen: lim(x→0) [tan(ax) / bx] = a/b dan lim(x→0) [tan(ax) / sin(bx)] = a/b.",
          "Aturan Praktis (Pencoretan): Hanya fungsi SINUS dan TANGEN yang dapat langsung disederhanakan koefisiennya saat x → 0.",
          "PENTING: Fungsi COSINUS TIDAK BISA langsung dicoret! Jika ada cos(0), nilainya adalah 1. Jika ada bentuk (1 - cos ax), harus diubah menggunakan rumus sudut rangkap."
        ]
      },
      {
        "title": "Trik Cepat Menghilangkan Cosinus pada Limit",
        "points": [
          "Identitas sudut rangkap: cos(2θ) = 1 - 2 sin² θ ⟹ 1 - cos(2θ) = 2 sin² θ.",
          "Bentuk umum: 1 - cos(kx) = 2 sin²(k/2 · x).",
          "Trik Cepat Pendekatan Taylor: Untuk x → 0, berlaku (1 - cos kx) ≈ 1/2 · (kx)² = (k² / 2) · x².",
          "Contoh: 1 - cos(4x) ≈ 1/2 · (4x)² = 8x²."
        ]
      },
      {
        "title": "Turunan Dasar Fungsi Trigonometri",
        "points": [
          "Turunan Sinus: d/dx [sin(ax)] = a · cos(ax).",
          "Turunan Cosinus: d/dx [cos(ax)] = -a · sin(ax) (perhatikan tanda MINUS!).",
          "Turunan Tangen: d/dx [tan(ax)] = a · sec²(ax).",
          "Turunan Kofungsi: d/dx [cot(ax)] = -a · csc²(ax) ; d/dx [sec(ax)] = a · sec(ax) tan(ax) ; d/dx [csc(ax)] = -a · csc(ax) cot(ax)."
        ]
      },
      {
        "title": "Aturan Rantai (Chain Rule) Pangkat Trigonometri",
        "points": [
          "Jika y = [u(x)]ⁿ di mana u(x) adalah fungsi trigonometri: y' = n · [u(x)]ⁿ⁻¹ · u'(x).",
          "Rumus Turunan Pangkat Trigonometri: d/dx [sinⁿ(u)] = n · sinⁿ⁻¹(u) · cos(u) · u'.",
          "Aplikasi Turunan: Menentukan gradien garis singgung m = f'(x₁) dan titik stasioner kurva f'(x) = 0."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Limit Trigonometri Dasar",
        "formula": "lim(x→0) sin(ax) / bx = a / b   |   lim(x→0) tan(ax) / bx = a / b",
        "desc": "Teorema fundamental limit trigonometri saat x mendekati nol.",
        "note": "Berlaku juga untuk bentuk timbal balik pembilang dan penyebut."
      },
      {
        "name": "Trik Sudut Rangkap 1 - cos(kx)",
        "formula": "1 - cos(kx) = 2 sin²(kx / 2)   atau   ≈ 1/2 · k² x²",
        "desc": "Trik mereduksi bentuk tak tentu yang memuat cosinus menjadi perkalian sinus.",
        "note": "Mengubah bentuk 0/0 menjadi bentuk limit sinus yang dapat langsung dicoret."
      },
      {
        "name": "Turunan Sinus, Cosinus, dan Tangen",
        "formula": "(sin ax)' = a cos ax  |  (cos ax)' = -a sin ax  |  (tan ax)' = a sec² ax",
        "desc": "Aturan diferensial dasar untuk fungsi trigonometri berderajat satu.",
        "note": "Ingat bahwa turunan fungsi yang berawalan huruf 'C' (cos, cot, csc) selalu bertanda minus (-)."
      },
      {
        "name": "Aturan Rantai Pangkat Trigonometri",
        "formula": "y = sinⁿ(u)  ⟹  y' = n · sinⁿ⁻¹(u) · cos(u) · u'",
        "desc": "Menurunkan fungsi trigonometri berpangkat n.",
        "note": "Turunkan pangkatnya terlebih dahulu, lalu kalikan dengan turunan fungsi dalamnya."
      },
      {
        "name": "Gradien Garis Singgung Kurva",
        "formula": "m = f'(x₁)",
        "desc": "Kemiringan garis singgung kurva trigonometri di titik absis x₁.",
        "note": "Gunakan persamaan garis singgung standar: y - y₁ = m(x - x₁)."
      }
    ],
    "examples": [
      {
        "question": "Hitunglah nilai dari lim(x→0) [sin(6x) / (tan(2x))]!",
        "level": "Basic",
        "steps": [
          "Bentuk limit ini menghasilkan 0/0 saat disubstitusikan x = 0.",
          "Gunakan teorema dasar limit trigonometri: lim(x→0) [sin(ax) / tan(bx)] = a / b.",
          "Identifikasi koefisien: a = 6 dan b = 2.",
          "Hitung rasio koefisien: 6 / 2 = 3.",
          "Verifikasi dengan membagi pembilang dan penyebut dengan x: lim(x→0) [(sin 6x / x) / (tan 2x / x)] = 6 / 2 = 3."
        ],
        "answer": "3",
        "tips": "Untuk limit pecahan yang hanya terdiri dari sinus dan tangen menuju nol, langsung bagi koefisien variabelnya."
      },
      {
        "question": "Hitunglah nilai dari lim(x→0) [(1 - cos(4x)) / (x · sin(2x))]!",
        "level": "Intermediate",
        "steps": [
          "Substitusi x = 0: (1 - cos 0) / (0 · 0) = (1 - 1) / 0 = 0/0 (Bentuk Tak Tentu).",
          "Ubah (1 - cos 4x) menggunakan rumus identitas sudut rangkap: 1 - cos(4x) = 2 sin²(2x) = 2 · sin(2x) · sin(2x).",
          "Tuliskan kembali limitnya: lim(x→0) [2 · sin(2x) · sin(2x) / (x · sin(2x))].",
          "Coret satu faktor sin(2x) pada pembilang dan penyebut: lim(x→0) [2 · sin(2x) / x].",
          "Hitung sisa limit: 2 · lim(x→0) [sin(2x) / x] = 2 · 2 = 4.",
          "(Alternatif trik cepat: 1 - cos 4x ≈ 1/2 · (4x)² = 8x². Maka 8x² / (x · 2x) = 8x² / 2x² = 4)."
        ],
        "answer": "4",
        "tips": "Trik pendekatan (1 - cos kx) ≈ 1/2 k² x² sangat ampuh menyelesaikan soal limit cosinus hanya dalam 1 baris."
      },
      {
        "question": "Tentukan turunan pertama dari fungsi f(x) = sin³(4x) dan hitunglah nilai f'(π/8)!",
        "level": "Advanced",
        "steps": [
          "Fungsi f(x) = [sin(4x)]³ memiliki bentuk pangkat uⁿ dengan u = sin(4x) dan n = 3.",
          "Terapkan Aturan Rantai: f'(x) = n · uⁿ⁻¹ · u'.",
          "Turunan dari u = sin(4x) adalah u' = 4 · cos(4x).",
          "Maka f'(x) = 3 · [sin(4x)]² · [4 cos(4x)] = 12 · sin²(4x) · cos(4x).",
          "Hitung nilai pada x = π/8: 4x = 4(π/8) = π/2 = 90°.",
          "Substitusikan sudut 90°: sin(90°) = 1 dan cos(90°) = 0.",
          "Diperoleh f'(π/8) = 12 · (1)² · (0) = 0."
        ],
        "answer": "f'(x) = 12 sin²(4x) cos(4x) dan f'(π/8) = 0",
        "tips": "Ingat bahwa nilai cosinus pada sudut siku-siku 90° bernilai tepat 0, sehingga seluruh perkalian bernilai nol."
      }
    ],
    "quickQuiz": [
      {
        "question": "Nilai dari lim(x→0) [tan(3x) / (6x)] adalah...",
        "options": [
          "1/2",
          "2",
          "3",
          "0"
        ],
        "correctIndex": 0,
        "explanation": "Gunakan teorema limit trigonometri: lim(x→0) [tan(ax) / bx] = a/b = 3/6 = 1/2."
      },
      {
        "question": "Turunan pertama dari f(x) = cos(5x - 2) adalah...",
        "options": [
          "-5 sin(5x - 2)",
          "5 sin(5x - 2)",
          "-sin(5x - 2)",
          "5 cos(5x - 2)"
        ],
        "correctIndex": 0,
        "explanation": "Turunan cos(u) adalah -sin(u) · u'. Dengan u = 5x - 2 dan u' = 5, turunannya adalah -5 sin(5x - 2)."
      },
      {
        "question": "Nilai dari lim(x→0) [(1 - cos(2x)) / x²] adalah...",
        "options": [
          "2",
          "1",
          "1/2",
          "4"
        ],
        "correctIndex": 0,
        "explanation": "Ubah 1 - cos(2x) = 2 sin²(x). Maka lim(x→0) [2 sin²(x) / x²] = 2 · (1)² = 2. (Atau trik cepat: 1/2 · (2x)² / x² = 2x² / x² = 2)."
      }
    ],
    "example": {
      "question": "Hitunglah nilai dari lim(x→0) [sin(8x) / (4x)].",
      "steps": [
        "Gunakan sifat lim(x→0) sin(ax) / bx = a/b.",
        "Maka 8 / 4 = 2."
      ],
      "answer": "2"
    }
  },
  {
    "id": "integral-kalkulus",
    "grade": 12,
    "title": "Integral Tentu & Luas Daerah",
    "category": "Calculus",
    "icon": "",
    "color": "#f5f3ff",
    "accentColor": "#7c3aed",
    "readTime": "16 min belajar",
    "difficulty": "Hard",
    "summary": "Teorema Dasar Kalkulus ∫ [a ke b] f(x) dx = F(b) - F(a), sifat-sifat kelinearan integral tentu, menentukan luas daerah di bawah kurva terhadap sumbu X, luas daerah antara dua kurva, dan rumus cepat Diskriminan D√D / (6a²).",
    "detailedOverview": "Integral Tentu merupakan mahakarya kalkulus yang menjembatani antiturunan analitis dengan pengukuran luas daerah bidang datar yang memiliki batas melengkung tak beraturan. Berdasarkan Teorema Dasar Kalkulus, akumulasi jumlahan luas partisi berhingga Riemann saat batas partisi mendekati tak hingga dapat dihitung secara eksak melalui selisih nilai antiturunan pada batas atas dan batas bawah: ∫ₐᵇ f(x) dx = F(b) - F(a). Dalam geometri analitik, integral tentu digunakan untuk menghitung luas daerah di bawah kurva dan luas daerah tertutup di antara dua kurva berpotongan (y_atas - y_bawah). Trik khusus pada kurva parabola dan garis lurus menggunakan rumus diskriminan D√D / (6a²) memungkinkan perhitungan luas selesai dalam hitungan detik. Materi ini menjadi fondasi ilmu fisika (menghitung usaha W = ∫ F dx, pusat massa) dan analisis ekonomi (surplus konsumen dan produsen).",
    "coreConcepts": [
      {
        "title": "Teorema Dasar Kalkulus dan Sifat Integral Tentu",
        "points": [
          "Definisi: Jika f(x) kontinu pada interval tertutup [a, b] dan F'(x) = f(x), maka ∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) - F(a).",
          "Konstanta integrasi C saling meniadakan pada integral tentu karena C - C = 0.",
          "Sifat Pembalikan Batas: ∫ₐᵇ f(x) dx = - ∫_b^a f(x) dx dan ∫ₐᵃ f(x) dx = 0.",
          "Sifat Penjumlahan Interval: ∫ₐᶜ f(x) dx = ∫ₐᵇ f(x) dx + ∫_b^c f(x) dx (dengan a < b < c).",
          "Sifat Simetri Fungsi Ganjil/Genap: Jika f(x) adalah fungsi ganjil (f(-x) = -f(x)), maka ∫₋ₐᵃ f(x) dx = 0."
        ]
      },
      {
        "title": "Luas Daerah di Bawah Kurva Terhadap Sumbu X",
        "points": [
          "Jika kurva f(x) berada di atas sumbu X (f(x) ≥ 0) pada interval [a, b]: Luas = ∫ₐᵇ f(x) dx.",
          "Jika kurva berada di bawah sumbu X (f(x) ≤ 0): Nilai hasil integral tentu akan bertanda negatif, sehingga luas mutlaknya adalah: Luas = - ∫ₐᵇ f(x) dx = |∫ₐᵇ f(x) dx|.",
          "Jika kurva memotong sumbu X di dalam interval [a, b], daerah harus dipecah menjadi dua integral terpisah di titik potong tersebut agar luas tidak saling mengurangi."
        ]
      },
      {
        "title": "Luas Daerah Antara Dua Kurva",
        "points": [
          "Diberikan dua kurva y₁ = f(x) dan y₂ = g(x) pada interval [a, b] dengan f(x) ≥ g(x): Luas = ∫ₐᵇ [f(x) - g(x)] dx = ∫ₐᵇ [y_atas - y_bawah] dx.",
          "Batas integrasi a dan b dicari dengan menyamakan kedua persamaan kurva (y₁ = y₂) untuk menemukan absis titik potong persekutuan."
        ]
      },
      {
        "title": "Rumus Cepat Diskriminan Luas Parabola",
        "points": [
          "Berlaku khusus untuk daerah tertutup yang dibatasi oleh sebuah parabola dan sebuah garis lurus, atau dua buah kurva parabola.",
          "Samakan kedua persamaan: y₁ - y₂ = ax² + bx + c = 0.",
          "Hitung nilai Diskriminan: D = b² - 4ac.",
          "Rumus Cepat Luas: L = (D · √D) / (6a²). Sangat efektif menghemat waktu tanpa perlu mencari batas integrasi dan antiturunan pecahan."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Teorema Dasar Kalkulus",
        "formula": "∫ₐᵇ f(x) dx = F(b) - F(a)",
        "desc": "Menghitung nilai integral tentu dengan mensubstitusikan batas atas b dikurangi batas bawah a.",
        "note": "F(x) adalah hasil antiturunan dari f(x)."
      },
      {
        "name": "Luas Antara Dua Kurva",
        "formula": "Luas = ∫ₐᵇ (y_atas - y_bawah) dx",
        "desc": "Menghitung luas daerah tertutup yang dibatasi kurva bagian atas dan bawah.",
        "note": "Pastikan mengidentifikasi dengan benar kurva mana yang berada di atas kurva lainnya."
      },
      {
        "name": "Rumus Cepat Diskriminan Luas",
        "formula": "Luas = (D · √D) / (6a²)",
        "desc": "Trik cepat mencari luas daerah antara parabola dan garis tanpa integral.",
        "note": "D = b² - 4ac diperoleh dari persamaan kuadrat sekutu (y₁ - y₂ = 0)."
      },
      {
        "name": "Aturan Antiturunan Polinomial",
        "formula": "∫ xⁿ dx = (1 / (n + 1)) · xⁿ⁺¹ + C  (n ≠ -1)",
        "desc": "Rumus dasar antiturunan aljabar.",
        "note": "Pangkat bertambah 1, koefisien dibagi dengan pangkat baru."
      }
    ],
    "examples": [
      {
        "question": "Hitunglah nilai dari integral tentu: ∫ [1 ke 3] (3x² - 4x + 2) dx!",
        "level": "Basic",
        "steps": [
          "Tentukan fungsi antiturunan F(x) dari (3x² - 4x + 2): F(x) = (3/3)x³ - (4/2)x² + 2x = x³ - 2x² + 2x.",
          "Terapkan Teorema Dasar Kalkulus dengan batas [1 ke 3]: [x³ - 2x² + 2x]₁³ = F(3) - F(1).",
          "Hitung F(3): (3)³ - 2(3)² + 2(3) = 27 - 2(9) + 6 = 27 - 18 + 6 = 15.",
          "Hitung F(1): (1)³ - 2(1)² + 2(1) = 1 - 2 + 2 = 1.",
          "Kurangkan hasil batas atas dan batas bawah: F(3) - F(1) = 15 - 1 = 14."
        ],
        "answer": "14",
        "tips": "Hitung nilai F(b) dan F(a) secara terpisah di dalam kurung agar tidak terjadi kesalahan tanda minus."
      },
      {
        "question": "Tentukan luas daerah yang dibatasi oleh kurva y = 4 - x² dan sumbu X!",
        "level": "Intermediate",
        "steps": [
          "Cari titik potong kurva dengan sumbu X (y = 0): 4 - x² = 0 ⟹ x² = 4 ⟹ x = -2 atau x = 2. Batas integrasi adalah a = -2 dan b = 2.",
          "Karena kurva parabola y = 4 - x² membuka ke bawah dengan puncak di (0,4), kurva berada di atas sumbu X pada interval [-2, 2].",
          "Rumus Luas: L = ∫₋₂² (4 - x²) dx.",
          "Antiturunan: F(x) = 4x - (1/3)x³.",
          "Hitung nilai: [4x - 1/3 x³]₋₂² = [4(2) - 1/3(8)] - [4(-2) - 1/3(-8)] = [8 - 8/3] - [-8 + 8/3] = (16/3) - (-16/3) = 32/3 = 10 2/3 satuan luas.",
          "(Verifikasi rumus cepat: a = -1, b = 0, c = 4. D = 0² - 4(-1)(4) = 16. Luas = D√D / (6a²) = (16 · √16) / (6 · 1²) = (16 · 4) / 6 = 64/6 = 32/3)."
        ],
        "answer": "32/3 atau 10 2/3 satuan luas",
        "tips": "Karena fungsi y = 4 - x² genap simetris terhadap sumbu Y, kita juga dapat menghitung 2 · ∫₀² (4 - x²) dx = 2 · (16/3) = 32/3."
      },
      {
        "question": "Tentukan luas daerah yang dibatasi oleh kurva parabola y = x² dan garis lurus y = 2x + 3!",
        "level": "Advanced",
        "steps": [
          "Samakan kedua persamaan untuk mencari titik potong: x² = 2x + 3 ⟹ x² - 2x - 3 = 0.",
          "Faktorkan persamaan kuadrat: (x - 3)(x + 1) = 0 ⟹ x = -1 (batas bawah) dan x = 3 (batas atas).",
          "Pada interval [-1, 3], garis y = 2x + 3 berada di atas kurva parabola y = x².",
          "Metode Integral: L = ∫₋₁³ [(2x + 3) - x²] dx = [x² + 3x - 1/3 x³]₋₁³.",
          "Batas atas x = 3: (3)² + 3(3) - 1/3(27) = 9 + 9 - 9 = 9.",
          "Batas bawah x = -1: (-1)² + 3(-1) - 1/3(-1) = 1 - 3 + 1/3 = -5/3.",
          "Luas = 9 - (-5/3) = 9 + 5/3 = 32/3 satuan luas.",
          "Verifikasi Rumus Cepat D√D / (6a²): Dari x² - 2x - 3 = 0 didapat a = 1, b = -2, c = -3. Nilai D = (-2)² - 4(1)(-3) = 4 + 12 = 16. Maka L = (16 · √16) / (6 · 1²) = (16 · 4) / 6 = 64 / 6 = 32/3 satuan luas!"
        ],
        "answer": "32/3 atau 10 2/3 satuan luas",
        "tips": "Rumus cepat D√D / 6a² menghasilkan jawaban yang sama persis hanya dalam 2 baris tanpa perlu mencari antiturunan."
      }
    ],
    "quickQuiz": [
      {
        "question": "Nilai dari ∫ [0 ke 2] (3x² + 2x) dx adalah...",
        "options": [
          "12",
          "10",
          "14",
          "16"
        ],
        "correctIndex": 0,
        "explanation": "Antiturunan F(x) = x³ + x². Masukkan batas: F(2) - F(0) = (2³ + 2²) - 0 = (8 + 4) = 12."
      },
      {
        "question": "Luas daerah tertutup yang dibatasi kurva parabola y = x² dan garis y = 4 adalah...",
        "options": [
          "32/3 satuan luas",
          "16/3 satuan luas",
          "64/3 satuan luas",
          "8 satuan luas"
        ],
        "correctIndex": 0,
        "explanation": "Persamaan sekutu: x² - 4 = 0 (a = 1, b = 0, c = -4). D = 0 - 4(1)(-4) = 16. Rumus cepat L = D√D / (6a²) = (16 · 4) / (6 · 1) = 64/6 = 32/3 satuan luas."
      },
      {
        "question": "Sifat integral tentu ∫ [a ke b] f(x) dx + ∫ [b ke c] f(x) dx setara dengan...",
        "options": [
          "∫ [a ke c] f(x) dx",
          "∫ [a ke b] f(x) dx",
          "0",
          "2 · ∫ [a ke b] f(x) dx"
        ],
        "correctIndex": 0,
        "explanation": "Berdasarkan sifat penjumlahan interval kalkulus, dua integral bersebelahan dapat digabungkan menjadi satu integral dari batas paling bawah a menuju batas paling atas c: ∫ₐᶜ f(x) dx."
      }
    ],
    "example": {
      "question": "Hitunglah nilai dari ∫ [0 ke 1] 4x³ dx.",
      "steps": [
        "Antiturunan dari 4x³ adalah x⁴.",
        "Masukkan batas atas dan bawah: [x⁴]₀¹ = 1⁴ - 0⁴ = 1."
      ],
      "answer": "1"
    }
  },
  {
    "id": "distribusi-binomial",
    "grade": 12,
    "title": "Distribusi Peluang Binomial & Normal",
    "category": "Statistics",
    "icon": "",
    "color": "#ecfeff",
    "accentColor": "#0891b2",
    "readTime": "16 min belajar",
    "difficulty": "Medium",
    "summary": "Variabel acak diskrit vs kontinu, karakteristik percobaan Bernoulli, formula fungsi peluang binomial nCx · pˣ · qⁿ⁻ˣ, rata-rata μ = np, simpangan baku σ = √(npq), kurva lonceng distribusi normal Gauss, dan transformasi z-score.",
    "detailedOverview": "Distribusi Peluang Binomial dan Normal merupakan puncak materi statistika inferensial dan probabilitas kelas 12 SMA. Pembahasan diawali dengan pembedaan variabel acak diskrit (hasil mencacah/membilang, berupa bilangan bulat) dan variabel acak kontinu (hasil pengukuran fisik kontinu). Distribusi Binomial memodelkan percobaan Bernoulli n kali berulang yang bersifat independen dengan tepat dua luaran: Sukses (probabilitas p) atau Gagal (probabilitas q = 1 - p). Ketika jumlah percobaan n sangat besar, distribusi binomial bertransisi mendekati Distribusi Normal (kurva lonceng simetris Gauss). Untuk menentukan probabilitas pada kurva normal standar, dilakukan standarisasi nilai acak X menuju skor baku Z = (X - μ) / σ. Materi ini diaplikasikan secara luas dalam kendali mutu (quality control) industri manufaktur, riset farmasi uji klinis obat, dan standarisasi skor UTBK SNBT.",
    "coreConcepts": [
      {
        "title": "Variabel Acak Diskrit dan Kontinu",
        "points": [
          "Variabel Acak Diskrit: Nilainya berupa bilangan cacah terpisah yang diperoleh dari hasil membilang (misal: banyaknya sisi gambar pada lemparan koin, jumlah barang cacat dalam kardus).",
          "Variabel Acak Kontinu: Nilainya berupa interval bilangan riil tak terhitung yang diperoleh dari hasil pengukuran fisik (misal: tinggi badan, berat badan, waktu tunggu, suhu ruangan).",
          "Fungsi Distribusi Probabilitas Diskrit: Syarat sah f(x) ≥ 0 untuk semua x, dan total jumlah peluang seluruh kemungkinan adalah ∑ P(X = x) = 1."
        ]
      },
      {
        "title": "Ciri Percobaan Bernoulli dan Rumus Binomial",
        "points": [
          "Percobaan diulang sebanyak n kali secara identik dan independen.",
          "Setiap percobaan HANYA menghasilkan 2 kemungkinan: Sukses atau Gagal.",
          "Peluang sukses (p) selalu bernilai konstan pada setiap percobaan, dan peluang gagal bernilai q = 1 - p.",
          "Rumus Peluang Binomial: P(X = x) = b(x; n, p) = nCx · pˣ · qⁿ⁻ˣ.",
          "Rata-rata (Nilai Harapan) Binomial: μ = E(X) = n · p. Varians: σ² = n · p · q. Simpangan Baku: σ = √(n · p · q)."
        ]
      },
      {
        "title": "Karakteristik Kurva Distribusi Normal",
        "points": [
          "Kurva berbentuk lonceng mulus yang simetris sempurna terhadap nilai rata-rata (μ).",
          "Nilai Mean, Median, dan Modus berada tepat di satu titik tengah kurva (puncak distribusi).",
          "Kedua ujung kurva (ekor lonceng) bersifat asimtotik mendekati sumbu horizontal X tanpa pernah menyentuhnya.",
          "Luas total seluruh daerah di bawah kurva normal sama dengan 1 (100%). Luas di sebelah kiri μ adalah 0.5 dan di sebelah kanan μ adalah 0.5."
        ]
      },
      {
        "title": "Distribusi Normal Baku dan Transformasi z-Score",
        "points": [
          "Distribusi normal umum X ~ N(μ, σ²) ditransformasikan ke distribusi normal standar Z ~ N(0, 1) dengan rata-rata 0 dan simpangan baku 1.",
          "Rumus Transformasi Skor Baku (z-score): Z = (X - μ) / σ.",
          "z-score mengukur berapa simpangan baku suatu nilai datum berjarak dari nilai rata-rata populasinya.",
          "Peluang P(X ≤ x) dihitung dengan membaca nilai luas area kurva P(Z ≤ z) pada Tabel Distribusi Normal Baku (Tabel Z)."
        ]
      }
    ],
    "keyFormulas": [
      {
        "name": "Fungsi Peluang Binomial",
        "formula": "P(X = x) = nCx · pˣ · qⁿ⁻ˣ   (dengan q = 1 - p)",
        "desc": "Peluang memperoleh tepat x keberhasilan dari n percobaan Bernoulli.",
        "note": "nCx adalah kombinasi n! / [x!(n - x)!]."
      },
      {
        "name": "Parameter Distribusi Binomial",
        "formula": "μ = n · p   dan   σ = √(n · p · q)",
        "desc": "Rata-rata (nilai harapan) dan simpangan baku variabel binomial.",
        "note": "Jika p = 0.5 (seimbang), kurva binomial simetris sempurna."
      },
      {
        "name": "Transformasi z-Score Normal",
        "formula": "Z = (X - μ) / σ",
        "desc": "Standarisasi nilai variabel kontinu X menuju skor baku Z berdistribusi normal baku.",
        "note": "Nilai Z positif jika di atas rata-rata, bernilai negatif jika di bawah rata-rata."
      },
      {
        "name": "Sifat Simetri Luas Normal Baku",
        "formula": "P(Z ≤ 0) = 0.5   |   P(Z ≥ z) = 1 - P(Z ≤ z)",
        "desc": "Menghitung probabilitas ekor kurva normal standar.",
        "note": "Karena simetri: P(Z ≤ -z) = P(Z ≥ z) = 1 - P(Z ≤ z)."
      }
    ],
    "examples": [
      {
        "question": "Sebuah koin seimbang dilempar sebanyak 5 kali. Tentukan peluang munculnya tepat 3 kali sisi Gambar!",
        "level": "Basic",
        "steps": [
          "Percobaan binomial dengan n = 5 kali lemparan.",
          "Peluang sukses (muncul sisi Gambar): p = 1/2. Peluang gagal: q = 1 - 1/2 = 1/2.",
          "Banyaknya sukses yang diinginkan: x = 3 kali.",
          "Gunakan rumus peluang binomial: P(X = 3) = ₅C₃ · (1/2)³ · (1/2)⁵⁻³.",
          "Hitung kombinasi ₅C₃: ₅C₃ = (5 · 4 · 3) / (3 · 2 · 1) = 10.",
          "Hitung perpangkatan: (1/2)³ · (1/2)² = (1/2)⁵ = 1 / 32.",
          "Kalikan hasil: P(X = 3) = 10 · (1 / 32) = 10 / 32 = 5 / 16 = 0.3125."
        ],
        "answer": "10/32 atau 5/16 (0.3125)",
        "tips": "Karena koin seimbang (p = q = 1/2), perpangkatan selalu bernilai (1/2)ⁿ = (1/2)⁵ = 1/32."
      },
      {
        "question": "Peluang seorang penembak mengenai sasaran adalah 0.8. Jika penembak tersebut melepaskan 4 kali tembakan secara independen, berapakah peluang ia mengenai sasaran PALING SEDIKIT 3 kali?",
        "level": "Intermediate",
        "steps": [
          "Banyaknya tembakan n = 4. Peluang sukses p = 0.8. Peluang gagal q = 1 - 0.8 = 0.2.",
          "Kondisi 'paling sedikit 3 kali kena' berarti x = 3 atau x = 4 kena. Maka P(X ≥ 3) = P(X = 3) + P(X = 4).",
          "Hitung P(X = 3): ₄C₃ · (0.8)³ · (0.2)¹ = 4 · 0.512 · 0.2 = 0.4096.",
          "Hitung P(X = 4): ₄C₄ · (0.8)⁴ · (0.2)⁰ = 1 · 0.4096 · 1 = 0.4096.",
          "Jumlahkan kedua peluang: P(X ≥ 3) = 0.4096 + 0.4096 = 0.8192 (atau 81.92%)."
        ],
        "answer": "0.8192 (81.92%)",
        "tips": "Untuk kata 'paling sedikit k kali', jumlahkan peluang untuk x = k sampai x = n."
      },
      {
        "question": "Nilai ujian masuk perguruan tinggi 10.000 peserta berdistribusi normal dengan rata-rata μ = 70 dan simpangan baku σ = 10. Jika seorang peserta memperoleh nilai X = 85, berapakah nilai z-score anak tersebut dan berapa persentase peserta yang nilainya di bawah anak tersebut (diketahui P(Z ≤ 1.5) = 0.9332)?",
        "level": "Advanced",
        "steps": [
          "Identifikasi parameter distribusi normal: μ = 70, σ = 10, dan nilai datum X = 85.",
          "Hitung nilai z-score standar: Z = (X - μ) / σ = (85 - 70) / 10 = 15 / 10 = 1.5.",
          "Nilai Z = +1.5 berarti nilai anak tersebut berjarak 1.5 simpangan baku di atas rata-rata populasi.",
          "Cari peluang kumulatif P(X ≤ 85) = P(Z ≤ 1.5). Dari tabel Z diketahui P(Z ≤ 1.5) = 0.9332.",
          "Ubah menjadi persentase: 0.9332 × 100% = 93.32% peserta ujian berada di bawah nilai anak tersebut (anak tersebut berada di peringkat 6.68% teratas)."
        ],
        "answer": "z-score = +1.5 dan persentase di bawahnya = 93.32%",
        "tips": "Z-score bernilai positif menandakan posisi nilai datum berada di atas rata-rata (sebelah kanan puncak lonceng)."
      }
    ],
    "quickQuiz": [
      {
        "question": "Jika peluang sukses adalah p = 0.35, berapakah nilai peluang gagal q pada percobaan Bernoulli?",
        "options": [
          "0.65",
          "0.35",
          "0.70",
          "0.50"
        ],
        "correctIndex": 0,
        "explanation": "q = 1 - p = 1 - 0.35 = 0.65."
      },
      {
        "question": "Suatu variabel acak binomial memiliki n = 100 percobaan dan peluang sukses p = 0.16. Nilai rata-rata (μ) dan simpangan baku (σ) distribusi tersebut berturut-turut adalah...",
        "options": [
          "μ = 16 dan σ = 3.67",
          "μ = 16 dan σ = 13.44",
          "μ = 16 dan σ = 4",
          "μ = 84 dan σ = 3.67"
        ],
        "correctIndex": 0,
        "explanation": "Rata-rata μ = n · p = 100 · 0.16 = 16. Peluang gagal q = 1 - 0.16 = 0.84. Simpangan baku σ = √(n · p · q) = √(100 · 0.16 · 0.84) = √13.44 ≈ 3.67."
      },
      {
        "question": "Luas total area di bawah kurva distribusi normal standar adalah...",
        "options": [
          "1 (atau 100%)",
          "0.5",
          "2",
          "Tak terhingga"
        ],
        "correctIndex": 0,
        "explanation": "Sebagai syarat sah fungsi kepekatan peluang (probability density function), integral seluruh area di bawah kurva normal dari -∞ sampai +∞ tepat sama dengan 1 (100%)."
      }
    ],
    "example": {
      "question": "Tentukan z-score untuk X = 80 jika rata-rata μ = 60 dan simpangan baku σ = 10.",
      "steps": [
        "Z = (X - μ) / σ.",
        "Z = (80 - 60) / 10 = 20 / 10 = 2.0."
      ],
      "answer": "Z = 2.0"
    }
  }
];

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
// QUESTION BANK FOR TIME ATTACK & QUIZ MODES
// ============================================================================
export const MATH_QUESTIONS: Question[] = [
  // --- GRADE 10 QUESTIONS ---
  {
    id: 101,
    grade: 10,
    topicId: 'grade-10-exponents',
    topicTitle: 'Eksponen & Logaritma',
    question: 'Tentukan himpunan penyelesaian dari 2^(3x - 1) = 32.',
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
    question: 'Nilai dari ²log 48 - ²log 3 adalah...',
    options: ['4', '16', '3', '8'],
    correctIndex: 0,
    explanation: '²log (48 : 3) = ²log 16 = 4 (karena 2⁴ = 16).',
    difficulty: 'easy'
  },
  {
    id: 103,
    grade: 10,
    topicId: 'grade-10-quadratics',
    topicTitle: 'Fungsi Kuadrat',
    question: 'Titik potong grafik f(x) = 3x² - 6x - 9 terhadap sumbu Y adalah...',
    options: ['(0, -9)', '(0, 9)', '(-9, 0)', '(0, 3)'],
    correctIndex: 0,
    explanation: 'Titik potong sumbu Y adalah (0, c) = (0, -9).',
    difficulty: 'easy'
  },
  {
    id: 104,
    grade: 10,
    topicId: 'grade-10-spltv',
    topicTitle: 'SPLTV',
    question: 'Jika x + y + z = 12, y + z = 7, dan z = 3, maka nilai x adalah...',
    options: ['5', '4', '3', '7'],
    correctIndex: 0,
    explanation: 'x + (y + z) = 12 ⟹ x + 7 = 12 ⟹ x = 5.',
    difficulty: 'easy'
  },
  {
    id: 105,
    grade: 10,
    topicId: 'grade-10-trigonometry',
    topicTitle: 'Trigonometri Dasar',
    question: 'Nilai dari sin 30° + cos 60° adalah...',
    options: ['1', '0.5', '√3', '0'],
    correctIndex: 0,
    explanation: 'sin 30° = 1/2 dan cos 60° = 1/2. 1/2 + 1/2 = 1.',
    difficulty: 'easy'
  },
  {
    id: 106,
    grade: 10,
    topicId: 'grade-10-sequences',
    topicTitle: 'Barisan & Deret',
    question: 'Suku ke-10 dari barisan aritmatika 5, 8, 11, 14, ... adalah...',
    options: ['32', '35', '38', '29'],
    correctIndex: 0,
    explanation: 'a = 5, b = 3. U₁₀ = 5 + 9(3) = 5 + 27 = 32.',
    difficulty: 'easy'
  },

  // --- GRADE 11 QUESTIONS ---
  {
    id: 201,
    grade: 11,
    topicId: 'grade-11-functions',
    topicTitle: 'Fungsi Komposisi',
    question: 'Jika f(x) = 2x + 1 dan g(x) = x² - 3, berapakah nilai (f ∘ g)(3)?',
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
    question: 'Jari-jari lingkaran (x - 2)² + (y + 5)² = 36 adalah...',
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
    topicId: 'grade-11-transformations',
    topicTitle: 'Transformasi Geometri',
    question: 'Bayangan titik P(4, -1) dirotasikan 90° berlawanan jarum jam terhadap (0,0) adalah...',
    options: ['(1, 4)', '(-1, -4)', '(-4, 1)', '(4, 1)'],
    correctIndex: 0,
    explanation: '(x, y) ⟹ (-y, x). Maka (4, -1) ⟹ (1, 4).',
    difficulty: 'medium'
  },
  {
    id: 205,
    grade: 11,
    topicId: 'grade-11-limit',
    topicTitle: 'Limit Aljabar',
    question: 'Nilai dari lim (x→3) [(x² - 9) / (x - 3)] adalah...',
    options: ['6', '3', '0', '9'],
    correctIndex: 0,
    explanation: '(x - 3)(x + 3)/(x - 3) = x + 3. Pada x = 3 nilainya 6.',
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
    topicTitle: 'Statistika Kelompok',
    question: 'Jika panjang kelas c = 5, tepi bawah L = 20.5, d₁ = 3, dan d₂ = 2, berapakah Modusnya?',
    options: ['23.5', '22.5', '24.5', '25.0'],
    correctIndex: 0,
    explanation: 'Mo = L + [d₁ / (d₁ + d₂)] · c = 20.5 + [3 / 5] · 5 = 23.5.',
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
    explanation: '₇C₂ = (7 × 6) : (2 × 1) = 42 : 2 = 21.',
    difficulty: 'easy'
  },
  {
    id: 304,
    grade: 12,
    topicId: 'peluang-majemuk',
    topicTitle: 'Peluang Majemuk',
    question: 'Dua dadu dilempar sekali. Berapa peluang jumlah mata dadu sama dengan 8?',
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
    question: 'Nilai dari ∫ [0 ke 2] (3x² + 2x) dx adalah...',
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
    question: 'Jika peluang sukses adalah p = 0.35, maka peluang gagal q adalah...',
    options: ['0.65', '0.35', '0.70', '0.50'],
    correctIndex: 0,
    explanation: 'q = 1 - p = 1 - 0.35 = 0.65.',
    difficulty: 'easy'
  }
];
