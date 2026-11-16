// ============================================================================
// GAME MATH QUESTIONS REPOSITORY
// High School (SMA / UTBK) Curriculum: Kalkulus, Trigonometri, Statistika, Geometri
// Designed for fast-paced math gameplay across all 4 games
// ============================================================================

export type MathCurriculumTopic = 'kalkulus' | 'trigonometri' | 'statistika' | 'geometri';

export interface GameMathQuestion {
  id: string;
  topic: MathCurriculumTopic;
  topicLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ----------------------------------------------------------------------------
// CURATED QUESTIONS POOL (60 Questions: 15 per topic)
// ----------------------------------------------------------------------------
export const GAME_MATH_QUESTIONS: GameMathQuestion[] = [
  // ==========================================================================
  // 1. KALKULUS (Turunan, Limit, Integral)
  // ==========================================================================
  {
    id: 'kal-1',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Jika f(x) = 3x² - 5x + 2, maka nilai f\'(2) = ?',
    options: ['7', '5', '8', '11'],
    correctIndex: 0,
    explanation: 'f\'(x) = 6x - 5. Maka f\'(2) = 6(2) - 5 = 12 - 5 = 7.'
  },
  {
    id: 'kal-2',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Jika f(x) = x³ - 4x, maka nilai f\'(3) = ?',
    options: ['23', '21', '25', '19'],
    correctIndex: 0,
    explanation: 'f\'(x) = 3x² - 4. Maka f\'(3) = 3(9) - 4 = 27 - 4 = 23.'
  },
  {
    id: 'kal-3',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Turunan pertama dari f(x) = 5x⁴ adalah...?',
    options: ['20x³', '20x⁴', '15x³', '5x³'],
    correctIndex: 0,
    explanation: 'd/dx (5x⁴) = 5 × 4x³ = 20x³.'
  },
  {
    id: 'kal-4',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai dari lim (x→0) [sin(6x) / (2x)] = ?',
    options: ['3', '6', '2', '0'],
    correctIndex: 0,
    explanation: 'lim (x→0) [sin(ax) / (bx)] = a/b = 6/2 = 3.'
  },
  {
    id: 'kal-5',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai dari lim (x→0) [tan(8x) / (4x)] = ?',
    options: ['2', '4', '8', '1/2'],
    correctIndex: 0,
    explanation: 'lim (x→0) [tan(ax) / (bx)] = a/b = 8/4 = 2.'
  },
  {
    id: 'kal-6',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai dari lim (x→2) [(x² - 4) / (x - 2)] = ?',
    options: ['4', '2', '0', '6'],
    correctIndex: 0,
    explanation: '(x - 2)(x + 2) / (x - 2) = x + 2. Pada x = 2 ⟹ 2 + 2 = 4.'
  },
  {
    id: 'kal-7',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai dari lim (x→3) [(x² - 9) / (x - 3)] = ?',
    options: ['6', '3', '9', '0'],
    correctIndex: 0,
    explanation: '(x - 3)(x + 3) / (x - 3) = x + 3. Pada x = 3 ⟹ 3 + 3 = 6.'
  },
  {
    id: 'kal-8',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Hasil dari ∫ 6x² dx adalah...?',
    options: ['2x³ + C', '3x³ + C', '6x³ + C', '12x + C'],
    correctIndex: 0,
    explanation: '∫ 6x² dx = (6/3)x³ + C = 2x³ + C.'
  },
  {
    id: 'kal-9',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Hasil dari ∫ (4x + 3) dx adalah...?',
    options: ['2x² + 3x + C', '4x² + 3x + C', '2x² + C', '4x² + C'],
    correctIndex: 0,
    explanation: '∫ (4x + 3) dx = 2x² + 3x + C.'
  },
  {
    id: 'kal-10',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai integral tentu dari ∫₀² 3x² dx = ?',
    options: ['8', '6', '12', '4'],
    correctIndex: 0,
    explanation: 'F(x) = x³. F(2) - F(0) = 2³ - 0 = 8.'
  },
  {
    id: 'kal-11',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai integral tentu dari ∫₀¹ (2x + 1) dx = ?',
    options: ['2', '1', '3', '4'],
    correctIndex: 0,
    explanation: 'F(x) = x² + x. F(1) - F(0) = (1 + 1) - 0 = 2.'
  },
  {
    id: 'kal-12',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Turunan pertama dari f(x) = sin x adalah...?',
    options: ['cos x', '-cos x', 'tan x', '-sin x'],
    correctIndex: 0,
    explanation: 'd/dx (sin x) = cos x.'
  },
  {
    id: 'kal-13',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Turunan pertama dari f(x) = cos x adalah...?',
    options: ['-sin x', 'sin x', '-cos x', 'tan x'],
    correctIndex: 0,
    explanation: 'd/dx (cos x) = -sin x.'
  },
  {
    id: 'kal-14',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Titik stasioner f\'(x) = 0 pada f(x) = 2x³ - 6x terjadi saat x² = ?',
    options: ['1', '2', '3', '0'],
    correctIndex: 0,
    explanation: 'f\'(x) = 6x² - 6 = 0 ⟹ 6x² = 6 ⟹ x² = 1.'
  },
  {
    id: 'kal-15',
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: 'Nilai dari lim (x→∞) [(4x² + 3) / (2x² - 5)] = ?',
    options: ['2', '4', '∞', '0'],
    correctIndex: 0,
    explanation: 'Koefisien pangkat tertinggi = 4 / 2 = 2.'
  },

  // ==========================================================================
  // 2. TRIGONOMETRI (Sudut Istimewa, Identitas, Segitiga)
  // ==========================================================================
  {
    id: 'trig-1',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari sin 30° adalah...?',
    options: ['1/2', '√3/2', '1', '0'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: sin 30° = 1/2.'
  },
  {
    id: 'trig-2',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari cos 60° adalah...?',
    options: ['1/2', '√3/2', '√2/2', '0'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: cos 60° = 1/2.'
  },
  {
    id: 'trig-3',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari tan 45° adalah...?',
    options: ['1', '0', '√3', '1/2'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: tan 45° = sin 45° / cos 45° = 1.'
  },
  {
    id: 'trig-4',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari sin 90° adalah...?',
    options: ['1', '0', '1/2', '-1'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: sin 90° = 1.'
  },
  {
    id: 'trig-5',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari cos 0° adalah...?',
    options: ['1', '0', '-1', '1/2'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: cos 0° = 1.'
  },
  {
    id: 'trig-6',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari sin 150° adalah...?',
    options: ['1/2', '-1/2', '√3/2', '-√3/2'],
    correctIndex: 0,
    explanation: 'sin 150° = sin(180° - 30°) = sin 30° = 1/2 (Kuadran II bernilai positif).'
  },
  {
    id: 'trig-7',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari cos 120° adalah...?',
    options: ['-1/2', '1/2', '-√3/2', '√3/2'],
    correctIndex: 0,
    explanation: 'cos 120° = cos(180° - 60°) = -cos 60° = -1/2.'
  },
  {
    id: 'trig-8',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Identitas trigonometri dasar: sin² x + cos² x = ?',
    options: ['1', '0', '2', 'tan² x'],
    correctIndex: 0,
    explanation: 'Identitas Pythagoras trigonometri: sin² x + cos² x = 1.'
  },
  {
    id: 'trig-9',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari tan 60° adalah...?',
    options: ['√3', '1/√3', '1', '√2'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: tan 60° = √3.'
  },
  {
    id: 'trig-10',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Segitiga siku-siku dengan depan = 3, miring = 5. Nilai sin θ = ?',
    options: ['3/5', '4/5', '3/4', '5/3'],
    correctIndex: 0,
    explanation: 'sin θ = sisi depan / sisi miring = 3/5.'
  },
  {
    id: 'trig-11',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Segitiga siku-siku dengan depan = 3, miring = 5. Nilai cos θ = ?',
    options: ['4/5', '3/5', '3/4', '4/3'],
    correctIndex: 0,
    explanation: 'Sisi samping = √(5² - 3²) = 4. cos θ = samping / miring = 4/5.'
  },
  {
    id: 'trig-12',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Segitiga siku-siku dengan depan = 6, samping = 8. Nilai tan θ = ?',
    options: ['3/4', '4/3', '3/5', '4/5'],
    correctIndex: 0,
    explanation: 'tan θ = sisi depan / sisi samping = 6/8 = 3/4.'
  },
  {
    id: 'trig-13',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Berapakah nilai dari 2 · sin 30° · cos 30°?',
    options: ['√3/2', '1/2', '1', '√2/2'],
    correctIndex: 0,
    explanation: 'Rumus sudut rangkap sin(2A) = sin 60° = √3/2.'
  },
  {
    id: 'trig-14',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Nilai dari cos 90° adalah...?',
    options: ['0', '1', '-1', '1/2'],
    correctIndex: 0,
    explanation: 'Sudut istimewa: cos 90° = 0.'
  },
  {
    id: 'trig-15',
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: 'Identitas trigonometri: 1 + tan² x sama dengan...?',
    options: ['sec² x', 'csc² x', 'cot² x', 'cos² x'],
    correctIndex: 0,
    explanation: '1 + tan² x = sec² x.'
  },

  // ==========================================================================
  // 3. STATISTIKA (Mean, Median, Modus, Peluang, Kombinatorika)
  // ==========================================================================
  {
    id: 'stat-1',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Rata-rata (mean) dari data: 4, 6, 8, 10, 12 adalah...?',
    options: ['8', '7', '9', '10'],
    correctIndex: 0,
    explanation: 'Jumlah data = 40. n = 5. Mean = 40 / 5 = 8.'
  },
  {
    id: 'stat-2',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Rata-rata (mean) dari data: 5, 7, 8, 10, 15 adalah...?',
    options: ['9', '8', '10', '8.5'],
    correctIndex: 0,
    explanation: 'Jumlah data = 45. n = 5. Mean = 45 / 5 = 9.'
  },
  {
    id: 'stat-3',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Median dari kumpulan data ganjil: 3, 5, 7, 9, 11 adalah...?',
    options: ['7', '5', '8', '9'],
    correctIndex: 0,
    explanation: 'Nilai tengah (urutan ke-3) adalah 7.'
  },
  {
    id: 'stat-4',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Median dari data terurut: 4, 6, 8, 12 adalah...?',
    options: ['7', '6', '8', '7.5'],
    correctIndex: 0,
    explanation: 'Median = (6 + 8) / 2 = 14 / 2 = 7.'
  },
  {
    id: 'stat-5',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Modus dari data: 2, 3, 3, 5, 7, 7, 7, 8 adalah...?',
    options: ['7', '3', '5', '8'],
    correctIndex: 0,
    explanation: 'Angka 7 muncul paling banyak (3 kali).'
  },
  {
    id: 'stat-6',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Jangkauan (Range) dari data: 5, 8, 12, 15, 23 adalah...?',
    options: ['18', '15', '20', '12'],
    correctIndex: 0,
    explanation: 'Jangkauan = Nilai Terbesar - Nilai Terkecil = 23 - 5 = 18.'
  },
  {
    id: 'stat-7',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Sebuah dadu dilempar 1x. Peluang muncul angka genap (2, 4, 6) = ?',
    options: ['1/2', '1/3', '1/6', '2/3'],
    correctIndex: 0,
    explanation: 'Titik sampel = 3 (yaitu 2,4,6). Ruang sampel = 6. Peluang = 3/6 = 1/2.'
  },
  {
    id: 'stat-8',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Sebuah dadu dilempar 1x. Peluang muncul bilangan prima (2, 3, 5) = ?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    correctIndex: 0,
    explanation: 'Bilangan prima pada dadu: 2, 3, 5 (ada 3). Peluang = 3/6 = 1/2.'
  },
  {
    id: 'stat-9',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Dua koin dilempar bersama. Peluang keduanya Gambar (GG) adalah...?',
    options: ['1/4', '1/2', '3/4', '1/8'],
    correctIndex: 0,
    explanation: 'Ruang sampel: {AA, AG, GA, GG} (ada 4). Peluang GG = 1/4.'
  },
  {
    id: 'stat-10',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Nilai dari ₅P₂ (Permutasi 2 dari 5 unsur) adalah...?',
    options: ['20', '10', '25', '15'],
    correctIndex: 0,
    explanation: '₅P₂ = 5 × 4 = 20.'
  },
  {
    id: 'stat-11',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Nilai dari ₅C₂ (Kombinasi 2 dari 5 unsur) adalah...?',
    options: ['10', '20', '15', '5'],
    correctIndex: 0,
    explanation: '₅C₂ = (5 × 4) / (2 × 1) = 20 / 2 = 10.'
  },
  {
    id: 'stat-12',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Nilai dari ₄C₂ (Kombinasi 2 dari 4 unsur) adalah...?',
    options: ['6', '8', '12', '4'],
    correctIndex: 0,
    explanation: '₄C₂ = (4 × 3) / (2 × 1) = 12 / 2 = 6.'
  },
  {
    id: 'stat-13',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Jika rata-rata 4 bilangan adalah 15, maka jumlah seluruh bilangan = ?',
    options: ['60', '45', '75', '50'],
    correctIndex: 0,
    explanation: 'Jumlah data = 4 × 15 = 60.'
  },
  {
    id: 'stat-14',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Kuartil tengah (Q₂) dari suatu kumpulan data setara dengan...?',
    options: ['Median', 'Mean', 'Modus', 'Jangkauan'],
    correctIndex: 0,
    explanation: 'Q₂ membagi data menjadi dua bagian yang sama (Median).'
  },
  {
    id: 'stat-15',
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: 'Jika peluang suatu peristiwa adalah p = 0.35, maka peluang komplemennya = ?',
    options: ['0.65', '0.35', '0.70', '0.50'],
    correctIndex: 0,
    explanation: 'P(A\') = 1 - P(A) = 1 - 0.35 = 0.65.'
  },

  // ==========================================================================
  // 4. GEOMETRI (Pythagoras, Sudut, Bangun Datar, Dimensi Tiga)
  // ==========================================================================
  {
    id: 'geo-1',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Segitiga siku-siku dengan alas 6 cm dan tinggi 8 cm. Sisi miringnya = ...?',
    options: ['10 cm', '12 cm', '14 cm', '9 cm'],
    correctIndex: 0,
    explanation: 'c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.'
  },
  {
    id: 'geo-2',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Segitiga siku-siku dengan sisi tegak 5 cm dan 12 cm. Sisi miringnya = ...?',
    options: ['13 cm', '15 cm', '17 cm', '14 cm'],
    correctIndex: 0,
    explanation: 'c = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.'
  },
  {
    id: 'geo-3',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Kubus dengan panjang rusuk 6 cm. Panjang diagonal ruangnya (s√3) = ...?',
    options: ['6√3 cm', '6√2 cm', '12 cm', '18 cm'],
    correctIndex: 0,
    explanation: 'Diagonal ruang kubus = s√3 = 6√3 cm.'
  },
  {
    id: 'geo-4',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Kubus dengan panjang rusuk 8 cm. Panjang diagonal bidang/sisinya (s√2) = ...?',
    options: ['8√2 cm', '8√3 cm', '16 cm', '4√2 cm'],
    correctIndex: 0,
    explanation: 'Diagonal sisi kubus = s√2 = 8√2 cm.'
  },
  {
    id: 'geo-5',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Jumlah besar seluruh sudut dalam sebuah segitiga adalah...?',
    options: ['180°', '360°', '90°', '270°'],
    correctIndex: 0,
    explanation: 'Total sudut dalam setiap segitiga adalah 180°.'
  },
  {
    id: 'geo-6',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Dua sudut saling berpelurus. Jika sudut A = 70°, maka sudut B = ...?',
    options: ['110°', '20°', '90°', '120°'],
    correctIndex: 0,
    explanation: 'Sudut berpelurus berjumlah 180°. Sudut B = 180° - 70° = 110°.'
  },
  {
    id: 'geo-7',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Dua sudut saling berpenyiku. Jika sudut A = 35°, maka sudut B = ...?',
    options: ['55°', '145°', '65°', '45°'],
    correctIndex: 0,
    explanation: 'Sudut berpenyiku berjumlah 90°. Sudut B = 90° - 35° = 55°.'
  },
  {
    id: 'geo-8',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Luas persegi dengan keliling 36 cm adalah...?',
    options: ['81 cm²', '72 cm²', '64 cm²', '100 cm²'],
    correctIndex: 0,
    explanation: 'Sisi s = 36 / 4 = 9 cm. Luas = 9² = 81 cm².'
  },
  {
    id: 'geo-9',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Keliling persegi yang luasnya 64 cm² adalah...?',
    options: ['32 cm', '16 cm', '24 cm', '64 cm'],
    correctIndex: 0,
    explanation: 'Sisi s = √64 = 8 cm. Keliling = 4 × 8 = 32 cm.'
  },
  {
    id: 'geo-10',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Volume kubus dengan panjang rusuk 5 cm adalah...?',
    options: ['125 cm³', '150 cm³', '100 cm³', '25 cm³'],
    correctIndex: 0,
    explanation: 'Volume = s³ = 5³ = 125 cm³.'
  },
  {
    id: 'geo-11',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Luas lingkaran dengan jari-jari r = 7 cm (π = 22/7) adalah...?',
    options: ['154 cm²', '44 cm²', '144 cm²', '88 cm²'],
    correctIndex: 0,
    explanation: 'Luas = π × r² = (22/7) × 7 × 7 = 154 cm².'
  },
  {
    id: 'geo-12',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Keliling lingkaran dengan jari-jari r = 7 cm (π = 22/7) adalah...?',
    options: ['44 cm', '88 cm', '154 cm', '22 cm'],
    correctIndex: 0,
    explanation: 'Keliling = 2 × π × r = 2 × (22/7) × 7 = 44 cm.'
  },
  {
    id: 'geo-13',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Banyaknya rusuk pada sebuah kubus atau balok adalah...?',
    options: ['12', '8', '6', '16'],
    correctIndex: 0,
    explanation: 'Kubus dan balok memiliki 12 rusuk, 6 sisi, dan 8 titik sudut.'
  },
  {
    id: 'geo-14',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Banyaknya titik sudut pada sebuah kubus adalah...?',
    options: ['8', '6', '12', '10'],
    correctIndex: 0,
    explanation: 'Kubus memiliki 8 titik sudut.'
  },
  {
    id: 'geo-15',
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: 'Luas segitiga dengan alas 10 cm dan tinggi 12 cm adalah...?',
    options: ['60 cm²', '120 cm²', '50 cm²', '72 cm²'],
    correctIndex: 0,
    explanation: 'Luas = 1/2 × alas × tinggi = 1/2 × 10 × 12 = 60 cm².'
  }
];

// ----------------------------------------------------------------------------
// DYNAMIC GENERATOR: DYNAMICALLY CREATES FRESH QUESTIONS FOR ENDLESS GAMEPLAY
// ----------------------------------------------------------------------------
function generateDynamicCalculus(): GameMathQuestion {
  const types = ['deriv_poly', 'limit_poly', 'integral_power', 'trig_limit'];
  const t = types[Math.floor(Math.random() * types.length)];
  const id = `dyn-kal-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (t === 'deriv_poly') {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 7) + 1;
    const xVal = Math.floor(Math.random() * 4) + 1;
    // f(x) = a*x^2 + b*x => f'(x) = 2ax + b
    const ans = 2 * a * xVal + b;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'kalkulus',
      topicLabel: 'Kalkulus',
      question: `Jika f(x) = ${a}x² + ${b}x, nilai f'(${xVal}) = ?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `f'(x) = ${2 * a}x + ${b}. Pada x = ${xVal} ⟹ f'(${xVal}) = ${ans}.`
    };
  }

  if (t === 'limit_poly') {
    const c = Math.floor(Math.random() * 6) + 2;
    const c2 = c * c;
    // lim x->c (x^2 - c^2)/(x - c) = 2c
    const ans = 2 * c;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'kalkulus',
      topicLabel: 'Kalkulus',
      question: `Nilai dari lim (x→${c}) [(x² - ${c2}) / (x - ${c})] = ?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Faktorkan pembilang: (x - ${c})(x + ${c}) / (x - ${c}) = x + ${c}. Substitusi x = ${c} ⟹ ${ans}.`
    };
  }

  if (t === 'integral_power') {
    const n = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const upper = Math.floor(Math.random() * 3) + 1; // 1, 2, 3
    // int_0^upper (n * x^(n-1)) dx = upper^n
    const coeff = n;
    const power = n - 1 === 1 ? 'x' : `x^${n - 1}`;
    const ans = Math.pow(upper, n);
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'kalkulus',
      topicLabel: 'Kalkulus',
      question: `Nilai integral tentu dari ∫₀^${upper} (${coeff}${power}) dx = ?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `F(x) = x^${n}. F(${upper}) - F(0) = ${upper}^${n} = ${ans}.`
    };
  }

  // trig limit
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 3) + 1;
  const ansNum = a;
  const ansDenom = b;
  const ansStr = ansNum % ansDenom === 0 ? String(ansNum / ansDenom) : `${ansNum}/${ansDenom}`;
  const fakeOpts = [ansStr, `${ansNum + 1}`, `${Math.max(1, ansNum - 1)}`, '0'];
  const shuffled = shuffleWithIndex(fakeOpts, 0);
  return {
    id,
    topic: 'kalkulus',
    topicLabel: 'Kalkulus',
    question: `Nilai dari lim (x→0) [sin(${a}x) / (${b}x)] = ?`,
    options: shuffled.options,
    correctIndex: shuffled.correctIndex,
    explanation: `lim (x→0) [sin(ax) / (bx)] = a/b = ${ansStr}.`
  };
}

function generateDynamicTrig(): GameMathQuestion {
  const trigItems = [
    { q: 'Nilai dari sin 30° adalah...?', a: '1/2', fakes: ['√3/2', '1', '0'] },
    { q: 'Nilai dari cos 60° adalah...?', a: '1/2', fakes: ['√3/2', '√2/2', '0'] },
    { q: 'Nilai dari tan 45° adalah...?', a: '1', fakes: ['0', '√3', '1/2'] },
    { q: 'Nilai dari sin 90° adalah...?', a: '1', fakes: ['0', '-1', '1/2'] },
    { q: 'Nilai dari cos 0° adalah...?', a: '1', fakes: ['0', '-1', '1/2'] },
    { q: 'Nilai dari tan 60° adalah...?', a: '√3', fakes: ['1/√3', '1', '2'] },
    { q: 'Nilai dari sin 45° adalah...?', a: '√2/2', fakes: ['1/2', '√3/2', '1'] },
    { q: 'Nilai dari cos 45° adalah...?', a: '√2/2', fakes: ['1/2', '√3/2', '1'] },
    { q: 'Nilai dari sin 150° adalah...?', a: '1/2', fakes: ['-1/2', '√3/2', '-√3/2'] },
    { q: 'Nilai dari cos 120° adalah...?', a: '-1/2', fakes: ['1/2', '-√3/2', '√3/2'] },
    { q: 'Identitas Pythagoras: sin² θ + cos² θ = ?', a: '1', fakes: ['0', '2', 'tan² θ'] },
    { q: 'Nilai dari cos 90° adalah...?', a: '0', fakes: ['1', '-1', '1/2'] },
    { q: 'Nilai dari sin 0° adalah...?', a: '0', fakes: ['1', '-1', '1/2'] },
    { q: 'Segitiga siku-siku (depan=4, miring=5), maka sin θ = ?', a: '4/5', fakes: ['3/5', '4/3', '3/4'] },
    { q: 'Segitiga siku-siku (depan=4, miring=5), maka cos θ = ?', a: '3/5', fakes: ['4/5', '4/3', '3/4'] }
  ];
  const item = trigItems[Math.floor(Math.random() * trigItems.length)];
  const shuffled = shuffleWithIndex([item.a, ...item.fakes], 0);
  return {
    id: `dyn-trig-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    topic: 'trigonometri',
    topicLabel: 'Trigonometri',
    question: item.q,
    options: shuffled.options,
    correctIndex: shuffled.correctIndex,
    explanation: `Jawaban benar: ${item.a}.`
  };
}

function generateDynamicStats(): GameMathQuestion {
  const types = ['mean', 'range', 'combo'];
  const t = types[Math.floor(Math.random() * types.length)];
  const id = `dyn-stat-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (t === 'mean') {
    const base = Math.floor(Math.random() * 10) + 4;
    const diff = Math.floor(Math.random() * 4) + 1;
    // 5 consecutive numbers with step diff
    const nums = [base - 2 * diff, base - diff, base, base + diff, base + 2 * diff];
    const ans = base;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'statistika',
      topicLabel: 'Statistika',
      question: `Rata-rata (mean) dari data: ${nums.join(', ')} adalah...?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Total = ${nums.reduce((a, b) => a + b, 0)}. Dibagi 5 = ${ans}.`
    };
  }

  if (t === 'range') {
    const minVal = Math.floor(Math.random() * 10) + 2;
    const maxVal = minVal + Math.floor(Math.random() * 20) + 8;
    const mid1 = minVal + Math.floor(Math.random() * 5) + 1;
    const mid2 = minVal + Math.floor(Math.random() * 5) + 6;
    const ans = maxVal - minVal;
    const opts = makeDistinctOptions(ans, 4);
    return {
      id,
      topic: 'statistika',
      topicLabel: 'Statistika',
      question: `Jangkauan (Range) dari data: ${minVal}, ${mid1}, ${mid2}, ${maxVal} adalah...?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Jangkauan = Max - Min = ${maxVal} - ${minVal} = ${ans}.`
    };
  }

  // combination nC2
  const n = Math.floor(Math.random() * 5) + 4; // 4, 5, 6, 7, 8
  const ans = (n * (n - 1)) / 2;
  const opts = makeDistinctOptions(ans, 4);
  return {
    id,
    topic: 'statistika',
    topicLabel: 'Statistika',
    question: `Nilai dari Kombinasi ₂C_${n} (memilih 2 dari ${n} objek) = ?`,
    options: opts.options,
    correctIndex: opts.correctIndex,
    explanation: `${n}C₂ = (${n} × ${n - 1}) / 2 = ${ans}.`
  };
}

function generateDynamicGeometry(): GameMathQuestion {
  const pythagorasTriples = [
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 8, c: 10 },
    { a: 5, b: 12, c: 13 },
    { a: 9, b: 12, c: 15 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 }
  ];

  const types = ['pythagoras', 'cube_diag', 'angles', 'rect_area'];
  const t = types[Math.floor(Math.random() * types.length)];
  const id = `dyn-geo-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (t === 'pythagoras') {
    const trip = pythagorasTriples[Math.floor(Math.random() * pythagorasTriples.length)];
    const opts = makeDistinctOptions(trip.c, 4, ' cm');
    return {
      id,
      topic: 'geometri',
      topicLabel: 'Geometri',
      question: `Segitiga siku-siku memiliki sisi tegak ${trip.a} cm dan ${trip.b} cm. Sisi miringnya = ...?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `c = √(${trip.a}² + ${trip.b}²) = √(${trip.a * trip.a + trip.b * trip.b}) = ${trip.c} cm.`
    };
  }

  if (t === 'cube_diag') {
    const s = Math.floor(Math.random() * 8) + 3;
    const ans = `${s}√3 cm`;
    const fakes = [`${s}√2 cm`, `${s * 2} cm`, `${s + 3} cm`];
    const shuffled = shuffleWithIndex([ans, ...fakes], 0);
    return {
      id,
      topic: 'geometri',
      topicLabel: 'Geometri',
      question: `Kubus memiliki rusuk ${s} cm. Panjang diagonal ruangnya adalah...?`,
      options: shuffled.options,
      correctIndex: shuffled.correctIndex,
      explanation: `Diagonal ruang kubus = s√3 = ${s}√3 cm.`
    };
  }

  if (t === 'angles') {
    const ang = Math.floor(Math.random() * 50) + 25; // 25..75
    const ans = 180 - ang;
    const opts = makeDistinctOptions(ans, 4, '°');
    return {
      id,
      topic: 'geometri',
      topicLabel: 'Geometri',
      question: `Dua sudut saling berpelurus. Jika sudut A = ${ang}°, maka sudut B = ...?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      explanation: `Sudut berpelurus berjumlah 180°. Sudut B = 180° - ${ang}° = ${ans}°.`
    };
  }

  // rect area
  const p = Math.floor(Math.random() * 10) + 5;
  const l = Math.floor(Math.random() * 6) + 3;
  const ans = p * l;
  const opts = makeDistinctOptions(ans, 4, ' cm²');
  return {
    id,
    topic: 'geometri',
    topicLabel: 'Geometri',
    question: `Luas persegi panjang berukuran panjang ${p} cm dan lebar ${l} cm adalah...?`,
    options: opts.options,
    correctIndex: opts.correctIndex,
    explanation: `Luas = panjang × lebar = ${p} × ${l} = ${ans} cm².`
  };
}

// Helper: Make 4 unique options from a correct numeric answer
function makeDistinctOptions(correct: number, count: number = 4, suffix: string = ''): { options: string[]; correctIndex: number } {
  const set = new Set<number>([correct]);
  while (set.size < count) {
    const delta = (Math.floor(Math.random() * 6) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const fake = correct + delta;
    if (fake >= 0) set.add(fake);
  }
  const nums = Array.from(set).sort(() => Math.random() - 0.5);
  const correctIndex = nums.indexOf(correct);
  return {
    options: nums.map(n => `${n}${suffix}`),
    correctIndex
  };
}

// Helper: Shuffle array and return new correctIndex
function shuffleWithIndex(arr: string[], correctOriginalIdx: number = 0): { options: string[]; correctIndex: number } {
  const correctVal = arr[correctOriginalIdx];
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correctVal)
  };
}

// ----------------------------------------------------------------------------
// MAIN EXPORTED RANDOM GETTER
// ----------------------------------------------------------------------------
export function getRandomGameQuestion(filterTopic?: MathCurriculumTopic): GameMathQuestion {
  const topics: MathCurriculumTopic[] = ['kalkulus', 'trigonometri', 'statistika', 'geometri'];
  const chosenTopic: MathCurriculumTopic = filterTopic && topics.includes(filterTopic)
    ? filterTopic
    : topics[Math.floor(Math.random() * topics.length)];

  // 60% chance to pick from rich curated pool, 40% chance to generate fresh dynamic question
  const useCurated = Math.random() < 0.6;

  if (useCurated) {
    const curatedFiltered = GAME_MATH_QUESTIONS.filter(q => q.topic === chosenTopic);
    if (curatedFiltered.length > 0) {
      const q = curatedFiltered[Math.floor(Math.random() * curatedFiltered.length)];
      // Shuffle options to ensure randomness each time it is served
      const shuffled = shuffleWithIndex(q.options, q.correctIndex);
      return {
        ...q,
        options: shuffled.options,
        correctIndex: shuffled.correctIndex
      };
    }
  }

  // Fallback / Dynamic generators
  switch (chosenTopic) {
    case 'kalkulus':
      return generateDynamicCalculus();
    case 'trigonometri':
      return generateDynamicTrig();
    case 'statistika':
      return generateDynamicStats();
    case 'geometri':
      return generateDynamicGeometry();
    default:
      return generateDynamicCalculus();
  }
}

