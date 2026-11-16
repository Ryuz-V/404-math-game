import { UserQuiz } from '../types/quiz';

export const DEFAULT_FEATURED_QUIZZES: UserQuiz[] = [
  // =========================================================================
  // QUIZ 1: UTBK SNBT 2025: PENALARAN MATEMATIKA INTENSIF (10 QUESTIONS)
  // =========================================================================
  {
    id: 'utbk-snbt-2025',
    title: 'UTBK SNBT 2025: Penalaran Matematika Intensif',
    summary: '10 Soal prediktif Penalaran Matematika UTBK SNBT mencakup SPLTV, Matriks, Dimensi Tiga, Peluang Bersyarat, dan Turunan.',
    category: 'UTBK & SNBT',
    tags: ['UTBK 2025', 'HOTS', '10 Soal', 'Campuran SMA'],
    bannerColor: '#6366f1',
    accuracy: 88,
    completion: 94,
    isDraft: false,
    createdAt: '2026-11-16T10:00:00.000Z',
    updatedAt: '2026-11-16T10:00:00.000Z',
    editedTimeAgo: 'Just now',
    authorName: 'Tim Matematika 404',
    passingScore: 70,
    resultPassedMessage: 'Luar biasa! Skor Anda sangat kompetitif untuk lolos PTN impian!',
    resultFailedMessage: 'Tetap semangat! Pelajari kembali pembahasan di bawah untuk memperdalam konsep HOTS.',
    questions: [
      {
        id: 'utbk-q1',
        questionText: 'Diketahui SPLTV: 2x + y - z = 7, x - y + z = 2, dan 3x + 2y + z = 13. Berapakah nilai dari (x + y + z)?',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Jumlahkan pers (1) dan (2): (2x + y - z) + (x - y + z) = 7 + 2 => 3x = 9 => x = 3. Substitusi x = 3: y - z = 1 dan 2y + z = 4. Jumlahkan: 3y = 5 => y = 2, z = 1. Jadi x + y + z = 3 + 2 + 1 = 6.',
        choices: [
          { id: 'c1', text: '5', isCorrect: false },
          { id: 'c2', text: '6', isCorrect: true },
          { id: 'c3', text: '7', isCorrect: false },
          { id: 'c4', text: '8', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q2',
        questionText: 'Persamaan garis singgung lingkaran x² + y² = 25 di titik (3, -4) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rumus garis singgung lingkaran x² + y² = r² pada titik (x₁, y₁) adalah x₁x + y₁y = r². Maka: 3x + (-4)y = 25 => 3x - 4y = 25.',
        choices: [
          { id: 'c1', text: '3x - 4y = 25', isCorrect: true },
          { id: 'c2', text: '3x + 4y = 25', isCorrect: false },
          { id: 'c3', text: '4x - 3y = 25', isCorrect: false },
          { id: 'c4', text: '-3x + 4y = 25', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q3',
        questionText: 'Pada kubus ABCD.EFGH dengan panjang rusuk 6 cm, jarak titik C ke bidang diagonal BDHF adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Proyeksi titik C ke bidang BDHF jatuh pada titik potong diagonal AC dan BD (sebut titik O). Jarak C ke BDHF = CO = 1/2 * diagonal sisi AC = 1/2 * 6√2 = 3√2 cm.',
        choices: [
          { id: 'c1', text: '3 cm', isCorrect: false },
          { id: 'c2', text: '3√2 cm', isCorrect: true },
          { id: 'c3', text: '3√3 cm', isCorrect: false },
          { id: 'c4', text: '6√2 cm', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q4',
        questionText: 'Nilai dari lim (x->0) [(1 - cos 4x) / (2x · sin 2x)] adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Gunakan identitas 1 - cos 4x = 2 sin²(2x). Maka limit menjadi lim 2 sin²(2x) / (2x · sin 2x) = lim sin(2x) / x = 2.',
        choices: [
          { id: 'c1', text: '1', isCorrect: false },
          { id: 'c2', text: '2', isCorrect: true },
          { id: 'c3', text: '4', isCorrect: false },
          { id: 'c4', text: '8', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q5',
        questionText: 'Sebuah kotak berisi 5 bola merah dan 3 bola biru. Diambil 2 bola satu per satu tanpa pengembalian. Peluang terambil kedua bola berwarna merah adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'P(M₁ dan M₂) = P(M₁) · P(M₂|M₁) = (5/8) · (4/7) = 20/56 = 5/14.',
        choices: [
          { id: 'c1', text: '5/14', isCorrect: true },
          { id: 'c2', text: '15/56', isCorrect: false },
          { id: 'c3', text: '10/28', isCorrect: false },
          { id: 'c4', text: '25/64', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q6',
        questionText: 'Jika matriks A = [[2, 1], [4, 3]], maka nilai determinan dari (A² - 2A) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'det(A) = 2(3) - 1(4) = 6 - 4 = 2. A² - 2A = A(A - 2I). A - 2I = [[0, 1], [4, 1]], det(A - 2I) = 0 - 4 = -4. det(A² - 2A) = det(A) · det(A - 2I) = 2 · (-4) = -8.',
        choices: [
          { id: 'c1', text: '-8', isCorrect: true },
          { id: 'c2', text: '4', isCorrect: false },
          { id: 'c3', text: '8', isCorrect: false },
          { id: 'c4', text: '-4', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q7',
        questionText: 'Titik A(2, -5) ditransformasikan oleh rotasi R(O, 90°) kemudian dilanjutkan dengan refleksi terhadap sumbu X. Bayangan titik A adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Rotasi R(O, 90°): (x, y) -> (-y, x). Titik (2, -5) menjadi (5, 2). Refleksi terhadap sumbu X: (x, y) -> (x, -y). Titik (5, 2) menjadi (5, -2).',
        choices: [
          { id: 'c1', text: '(5, -2)', isCorrect: true },
          { id: 'c2', text: '(-5, 2)', isCorrect: false },
          { id: 'c3', text: '(2, 5)', isCorrect: false },
          { id: 'c4', text: '(-2, -5)', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q8',
        questionText: 'Dari 8 orang pengurus OSIS akan dipilih 3 orang untuk menjadi Ketua, Sekretaris, dan Bendahara. Banyaknya susunan pengurus yang mungkin adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Karena jabatan memperhatikan urutan (posisi berbeda), gunakan permutasi: P(8, 3) = 8! / (8-3)! = 8 × 7 × 6 = 336 cara.',
        choices: [
          { id: 'c1', text: '56', isCorrect: false },
          { id: 'c2', text: '336', isCorrect: true },
          { id: 'c3', text: '512', isCorrect: false },
          { id: 'c4', text: '120', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q9',
        questionText: 'Diketahui f(x) = (2x + 1) / (x - 3), x ≠ 3. Rumus fungsi invers f⁻¹(x) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rumus cepat invers f(x) = (ax + b) / (cx + d) adalah f⁻¹(x) = (-dx + b) / (cx - a). Di sini a = 2, b = 1, c = 1, d = -3. Maka f⁻¹(x) = (3x + 1) / (x - 2), x ≠ 2.',
        choices: [
          { id: 'c1', text: '(3x + 1) / (x - 2)', isCorrect: true },
          { id: 'c2', text: '(3x - 1) / (x + 2)', isCorrect: false },
          { id: 'c3', text: '(2x + 3) / (x - 1)', isCorrect: false },
          { id: 'c4', text: '(x - 3) / (2x + 1)', isCorrect: false }
        ]
      },
      {
        id: 'utbk-q10',
        questionText: 'Jumlah deret geometri tak hingga adalah 18. Jika suku pertamanya adalah 12, maka rasio deret tersebut adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'S_∞ = a / (1 - r) => 18 = 12 / (1 - r) => 1 - r = 12/18 = 2/3 => r = 1 - 2/3 = 1/3.',
        choices: [
          { id: 'c1', text: '1/3', isCorrect: true },
          { id: 'c2', text: '1/2', isCorrect: false },
          { id: 'c3', text: '2/3', isCorrect: false },
          { id: 'c4', text: '3/4', isCorrect: false }
        ]
      }
    ]
  },

  // =========================================================================
  // QUIZ 2: KALKULUS & TURUNAN TRIGONOMETRI MASTER CLASS (10 QUESTIONS)
  // =========================================================================
  {
    id: 'kalkulus-trigonometri',
    title: 'Kalkulus & Turunan Trigonometri Master Class',
    summary: '10 Soal pemantapan kalkulus diferensial: limit trigonometri, aturan rantai turunan, garis singgung kurva, dan nilai optimum.',
    category: 'Kalkulus',
    tags: ['Kelas 12', 'Limit', 'Diferensial', '10 Soal'],
    bannerColor: '#0ea5e9',
    accuracy: 82,
    completion: 90,
    isDraft: false,
    createdAt: '2026-11-16T11:00:00.000Z',
    updatedAt: '2026-11-16T11:00:00.000Z',
    editedTimeAgo: '1 hour ago',
    authorName: 'Tim Matematika 404',
    passingScore: 70,
    resultPassedMessage: 'Hebat! Anda menguasai konsep kalkulus tingkat lanjut dengan sangat baik.',
    resultFailedMessage: 'Pelajari kembali identitas sudut rangkap dan aturan rantai turunan f(g(x)).',
    questions: [
      {
        id: 'kal-q1',
        questionText: 'Nilai dari lim (x->0) [sin 6x / tan 2x] adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Sesuai sifat limit dasar trigonometri: lim (x->0) sin(ax) / tan(bx) = a / b. Di sini a = 6, b = 2, sehingga 6 / 2 = 3.',
        choices: [
          { id: 'c1', text: '2', isCorrect: false },
          { id: 'c2', text: '3', isCorrect: true },
          { id: 'c3', text: '4', isCorrect: false },
          { id: 'c4', text: '6', isCorrect: false }
        ]
      },
      {
        id: 'kal-q2',
        questionText: 'Turunan pertama dari f(x) = sin³(2x + 1) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Gunakan aturan rantai: f\'(x) = 3 sin²(2x + 1) · cos(2x + 1) · 2 = 6 sin²(2x + 1) cos(2x + 1). Atau 3 sin(2x+1) sin(4x+2).',
        choices: [
          { id: 'c1', text: '6 sin²(2x + 1) cos(2x + 1)', isCorrect: true },
          { id: 'c2', text: '3 sin²(2x + 1) cos(2x + 1)', isCorrect: false },
          { id: 'c3', text: '6 sin³(2x + 1)', isCorrect: false },
          { id: 'c4', text: '2 cos³(2x + 1)', isCorrect: false }
        ]
      },
      {
        id: 'kal-q3',
        questionText: 'Nilai dari lim (x->0) [(x · tan 3x) / (1 - cos 2x)] adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: '1 - cos 2x = 2 sin²(x). Maka limit = lim [x · tan 3x] / [2 sin² x] = (1/2) · (x/sin x) · (tan 3x/sin x) = (1/2) · 1 · 3 = 3/2.',
        choices: [
          { id: 'c1', text: '1/2', isCorrect: false },
          { id: 'c2', text: '3/2', isCorrect: true },
          { id: 'c3', text: '3', isCorrect: false },
          { id: 'c4', text: '6', isCorrect: false }
        ]
      },
      {
        id: 'kal-q4',
        questionText: 'Persamaan garis singgung kurva y = sin x + cos x di titik absis x = 0 adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Saat x = 0, y = sin(0) + cos(0) = 1. Titik singgung (0, 1). Gradien m = y\' = cos x - sin x. Pada x = 0, m = cos(0) - sin(0) = 1. Persamaan: y - 1 = 1(x - 0) => y = x + 1.',
        choices: [
          { id: 'c1', text: 'y = x + 1', isCorrect: true },
          { id: 'c2', text: 'y = x - 1', isCorrect: false },
          { id: 'c3', text: 'y = -x + 1', isCorrect: false },
          { id: 'c4', text: 'y = 2x + 1', isCorrect: false }
        ]
      },
      {
        id: 'kal-q5',
        questionText: 'Turunan pertama dari f(x) = (sin x) / (1 + cos x) dapat disederhanakan menjadi...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'u = sin x, v = 1 + cos x. f\'(x) = [cos x(1 + cos x) - sin x(-sin x)] / (1 + cos x)² = [cos x + cos² x + sin² x] / (1 + cos x)² = [cos x + 1] / (1 + cos x)² = 1 / (1 + cos x).',
        choices: [
          { id: 'c1', text: '1 / (1 + cos x)', isCorrect: true },
          { id: 'c2', text: '1 / (1 - cos x)', isCorrect: false },
          { id: 'c3', text: 'cos x / (1 + sin x)', isCorrect: false },
          { id: 'c4', text: 'sin x / (1 + cos x)', isCorrect: false }
        ]
      },
      {
        id: 'kal-q6',
        questionText: 'Nilai dari lim (x->∞) [√(9x² + 12x + 5) - (3x - 1)] adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Bentuk lim √(ax² + bx + c) - (px + q). Ubah (3x - 1) menjadi √(9x² - 6x + 1). Rumus cepat: (b - q\') / (2√a) = [12 - (-6)] / (2√9) = 18 / (2 · 3) = 18 / 6 = 3.',
        choices: [
          { id: 'c1', text: '1', isCorrect: false },
          { id: 'c2', text: '2', isCorrect: false },
          { id: 'c3', text: '3', isCorrect: true },
          { id: 'c4', text: '4', isCorrect: false }
        ]
      },
      {
        id: 'kal-q7',
        questionText: 'Nilai maksimum dari fungsi f(x) = 3 sin x + 4 cos x + 5 adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Bentuk a sin x + b cos x memiliki nilai maksimum √(a² + b²) = √(3² + 4²) = 5. Nilai maksimum f(x) = 5 + 5 = 10.',
        choices: [
          { id: 'c1', text: '8', isCorrect: false },
          { id: 'c2', text: '10', isCorrect: true },
          { id: 'c3', text: '12', isCorrect: false },
          { id: 'c4', text: '14', isCorrect: false }
        ]
      },
      {
        id: 'kal-q8',
        questionText: 'Jika f(x) = x² · sin(2x), maka nilai f\'(0) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'f\'(x) = 2x · sin(2x) + x² · 2cos(2x). Saat x = 0: f\'(0) = 2(0) · sin(0) + (0)² · 2cos(0) = 0 + 0 = 0.',
        choices: [
          { id: 'c1', text: '0', isCorrect: true },
          { id: 'c2', text: '1', isCorrect: false },
          { id: 'c3', text: '2', isCorrect: false },
          { id: 'c4', text: '4', isCorrect: false }
        ]
      },
      {
        id: 'kal-q9',
        questionText: 'Titik stasioner fungsi f(x) = sin 2x pada interval 0 ≤ x ≤ π terjadi saat x bernilai...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'f\'(x) = 2 cos 2x = 0 => cos 2x = 0 => 2x = π/2 atau 2x = 3π/2 => x = π/4 atau x = 3π/4.',
        choices: [
          { id: 'c1', text: 'π/4 dan 3π/4', isCorrect: true },
          { id: 'c2', text: 'π/6 dan 5π/6', isCorrect: false },
          { id: 'c3', text: 'π/3 dan 2π/3', isCorrect: false },
          { id: 'c4', text: 'π/2 saja', isCorrect: false }
        ]
      },
      {
        id: 'kal-q10',
        questionText: 'Laju perubahan volume bola V = (4/3)π r³ terhadap jari-jarinya r ketika r = 3 cm adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'dV/dr = 4π r². Untuk r = 3: dV/dr = 4π (3)² = 36π cm³/cm.',
        choices: [
          { id: 'c1', text: '12π', isCorrect: false },
          { id: 'c2', text: '24π', isCorrect: false },
          { id: 'c3', text: '36π', isCorrect: true },
          { id: 'c4', text: '48π', isCorrect: false }
        ]
      }
    ]
  },

  // =========================================================================
  // QUIZ 3: GEOMETRI RUANG (DIMENSI TIGA) & JARAK SPASIAL (10 QUESTIONS)
  // =========================================================================
  {
    id: 'dimensi-tiga-spasial',
    title: 'Geometri Ruang (Dimensi Tiga) & Jarak Spasial',
    summary: '10 Soal jarak titik ke garis, titik ke bidang, dan sudut ruang pada kubus dan limas beraturan berdasarkan e-Modul Kemendikbud.',
    category: 'Geometri Ruang',
    tags: ['Kelas 12', 'Dimensi 3', 'Kubus', '10 Soal'],
    bannerColor: '#a855f7',
    accuracy: 79,
    completion: 86,
    isDraft: false,
    createdAt: '2026-11-16T12:00:00.000Z',
    updatedAt: '2026-11-16T12:00:00.000Z',
    editedTimeAgo: '2 hours ago',
    authorName: 'Tim Matematika 404',
    passingScore: 70,
    resultPassedMessage: 'Kemampuan visualisasi 3 dimensi Anda sangat tajam!',
    resultFailedMessage: 'Gunakan segitiga bantuan orthogonal dan rumus cepat jarak sudut ke bidang diagonal.',
    questions: [
      {
        id: 'd3-q1',
        questionText: 'Pada kubus ABCD.EFGH dengan panjang rusuk 8 cm, panjang diagonal ruang AG adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rumus diagonal ruang kubus dengan rusuk s adalah d_r = s√3. Karena s = 8 cm, maka AG = 8√3 cm.',
        choices: [
          { id: 'c1', text: '8√2 cm', isCorrect: false },
          { id: 'c2', text: '8√3 cm', isCorrect: true },
          { id: 'c3', text: '12 cm', isCorrect: false },
          { id: 'c4', text: '16 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q2',
        questionText: 'Pada kubus ABCD.EFGH dengan panjang rusuk 6 cm, jarak titik E ke garis diagonal ruang AG adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Segitiga AEG siku-siku di E dengan AE = 6, EG = 6√2, AG = 6√3. Jarak E ke AG = (AE · EG) / AG = (6 · 6√2) / (6√3) = 6√2 / √3 = 2√6 cm.',
        choices: [
          { id: 'c1', text: '2√3 cm', isCorrect: false },
          { id: 'c2', text: '2√6 cm', isCorrect: true },
          { id: 'c3', text: '3√2 cm', isCorrect: false },
          { id: 'c4', text: '3√6 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q3',
        questionText: 'Pada kubus ABCD.EFGH dengan rusuk 12 cm, jarak titik sudut C ke bidang diagonal AFH adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Bidang AFH dan BDG membagi diagonal ruang CE menjadi 3 segmen sama panjang berjarak 1/3 · s√3. Jarak C ke bidang AFH adalah segmen jauh = 2/3 · s√3 = 2/3 · 12√3 = 8√3 cm.',
        choices: [
          { id: 'c1', text: '4√3 cm', isCorrect: false },
          { id: 'c2', text: '6√3 cm', isCorrect: false },
          { id: 'c3', text: '8√3 cm', isCorrect: true },
          { id: 'c4', text: '10√3 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q4',
        questionText: 'Kubus ABCD.EFGH memiliki rusuk 10 cm. Jika titik P merupakan titik perpotongan diagonal EG dan FH, jarak titik A ke titik P adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Segitiga AEP siku-siku di E. AE = 10 cm, EP = 1/2 · EG = 1/2 · 10√2 = 5√2 cm. AP = √(AE² + EP²) = √(100 + 50) = √150 = 5√6 cm.',
        choices: [
          { id: 'c1', text: '5√3 cm', isCorrect: false },
          { id: 'c2', text: '5√5 cm', isCorrect: false },
          { id: 'c3', text: '5√6 cm', isCorrect: true },
          { id: 'c4', text: '10√2 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q5',
        questionText: 'Pada limas beraturan T.ABCD dengan rusuk alas AB = 6 cm dan rusuk tegak TA = 3√6 cm, tinggi limas adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Titik O adalah pusat persegi ABCD. AC = 6√2 cm, AO = 3√2 cm. Tinggi TO = √(TA² - AO²) = √((3√6)² - (3√2)²) = √(54 - 18) = √36 = 6 cm.',
        choices: [
          { id: 'c1', text: '4 cm', isCorrect: false },
          { id: 'c2', text: '5 cm', isCorrect: false },
          { id: 'c3', text: '6 cm', isCorrect: true },
          { id: 'c4', text: '3√3 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q6',
        questionText: 'Balok ABCD.EFGH memiliki ukuran AB = 8 cm, BC = 6 cm, dan CG = 24 cm. Panjang diagonal ruang AG adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'AG = √(p² + l² + t²) = √(8² + 6² + 24²) = √(64 + 36 + 576) = √(100 + 576) = √676 = 26 cm.',
        choices: [
          { id: 'c1', text: '24 cm', isCorrect: false },
          { id: 'c2', text: '25 cm', isCorrect: false },
          { id: 'c3', text: '26 cm', isCorrect: true },
          { id: 'c4', text: '28 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q7',
        questionText: 'Besar sudut antara garis AH dan garis CH pada kubus ABCD.EFGH adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Hubungkan titik A, C, dan H. Terbentuk segitiga ACH dengan sisi-sisi AH = CH = AC = s√2 (semuanya diagonal sisi kubus). Karena segitiga sama sisi, sudut AHC = 60°.',
        choices: [
          { id: 'c1', text: '45°', isCorrect: false },
          { id: 'c2', text: '60°', isCorrect: true },
          { id: 'c3', text: '90°', isCorrect: false },
          { id: 'c4', text: '120°', isCorrect: false }
        ]
      },
      {
        id: 'd3-q8',
        questionText: 'Pada kubus ABCD.EFGH dengan rusuk 6 cm, jarak titik sudut A ke bidang BDE adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'BDE adalah bidang diagonal dekat dari titik A. Jarak titik sudut ke bidang dekat = 1/3 · s√3 = 1/3 · 6√3 = 2√3 cm.',
        choices: [
          { id: 'c1', text: '2√3 cm', isCorrect: true },
          { id: 'c2', text: '3√3 cm', isCorrect: false },
          { id: 'c3', text: '4√3 cm', isCorrect: false },
          { id: 'c4', text: '2√2 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q9',
        questionText: 'Limas segiempat beraturan T.ABCD mempunyai rusuk alas 8 cm dan tinggi 4√2 cm. Jarak puncak T ke rusuk BC adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Tarik garis dari T ke tengah rusuk BC (sebut titik E). Jarak O ke E = 1/2 · AB = 4 cm. Jarak TE = √(TO² + OE²) = √((4√2)² + 4²) = √(32 + 16) = √48 = 4√3 cm.',
        choices: [
          { id: 'c1', text: '4√2 cm', isCorrect: false },
          { id: 'c2', text: '4√3 cm', isCorrect: true },
          { id: 'c3', text: '6 cm', isCorrect: false },
          { id: 'c4', text: '8 cm', isCorrect: false }
        ]
      },
      {
        id: 'd3-q10',
        questionText: 'Pada kubus ABCD.EFGH dengan rusuk 4 cm, titik M adalah titik tengah rusuk BC. Jarak titik M ke garis EG adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Proyeksi garis EG ke bidang alas adalah garis AC. Karena EG sejajar AC, jarak M ke EG sama dengan jarak M ke garis AC pada segitiga siku-siku ABC, digabung dengan tinggi kubus t = 4. Jarak M ke AC = MB · sin(45°) = 2 · (1/2√2) = √2. Jarak total = √(4² + (√2)²) = √(16 + 2) = √18 = 3√2 cm.',
        choices: [
          { id: 'c1', text: '2√2 cm', isCorrect: false },
          { id: 'c2', text: '3√2 cm', isCorrect: true },
          { id: 'c3', text: '2√6 cm', isCorrect: false },
          { id: 'c4', text: '4√2 cm', isCorrect: false }
        ]
      }
    ]
  },

  // =========================================================================
  // QUIZ 4: STATISTIKA DATA BERKELOMPOK & PELUANG MAJEMUK (10 QUESTIONS)
  // =========================================================================
  {
    id: 'statistika-peluang',
    title: 'Statistika Data Berkelompok & Peluang Majemuk',
    summary: '10 Soal ukuran pemusatan, ukuran penyebaran, simpangan baku, peluang saling lepas, dan peluang bersyarat sesuai e-Modul Kemendikbud.',
    category: 'Statistika & Peluang',
    tags: ['Kelas 12', 'Statistika', 'Peluang', '10 Soal'],
    bannerColor: '#10b981',
    accuracy: 85,
    completion: 92,
    isDraft: false,
    createdAt: '2026-11-16T13:00:00.000Z',
    updatedAt: '2026-11-16T13:00:00.000Z',
    editedTimeAgo: '3 hours ago',
    authorName: 'Tim Matematika 404',
    passingScore: 70,
    resultPassedMessage: 'Mantap! Pemahaman statistika dan kalkulasi probabilitas Anda sangat akurat.',
    resultFailedMessage: 'Perhatikan batas bawah Tb, panjang kelas p, dan selisih frekuensi modus d1 dan d2.',
    questions: [
      {
        id: 'stat-q1',
        questionText: 'Diberikan data nilai: 4, 6, 8, 5, 7. Simpangan rata-rata (SR) dari data tersebut adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rata-rata x̄ = (4 + 6 + 8 + 5 + 7) / 5 = 30 / 5 = 6. Selisih mutlak |xi - x̄|: |4-6|=2, |6-6|=0, |8-6|=2, |5-6|=1, |7-6|=1. Jumlah selisih = 2 + 0 + 2 + 1 + 1 = 6. SR = 6 / 5 = 1,2.',
        choices: [
          { id: 'c1', text: '1,0', isCorrect: false },
          { id: 'c2', text: '1,2', isCorrect: true },
          { id: 'c3', text: '1,5', isCorrect: false },
          { id: 'c4', text: '2,0', isCorrect: false }
        ]
      },
      {
        id: 'stat-q2',
        questionText: 'Kelas modus suatu data memiliki Tepi Bawah Tb = 49,5, panjang kelas p = 10, selisih frekuensi dengan kelas sebelumnya d₁ = 4, dan dengan sesudahnya d₂ = 6. Nilai modus adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rumus Modus Mo = Tb + [d₁ / (d₁ + d₂)] · p = 49,5 + [4 / (4 + 6)] · 10 = 49,5 + (4/10 · 10) = 49,5 + 4 = 53,5.',
        choices: [
          { id: 'c1', text: '51,5', isCorrect: false },
          { id: 'c2', text: '53,5', isCorrect: true },
          { id: 'c3', text: '54,0', isCorrect: false },
          { id: 'c4', text: '55,5', isCorrect: false }
        ]
      },
      {
        id: 'stat-q3',
        questionText: 'Simpangan baku dari data 3, 4, 5, 6, 7 adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rata-rata x̄ = 5. Kuadrat deviasi (xi - x̄)²: (-2)² = 4, (-1)² = 1, 0² = 0, 1² = 1, 2² = 4. Jumlah kuadrat = 10. Ragam S² = 10 / 5 = 2. Simpangan baku S = √2.',
        choices: [
          { id: 'c1', text: '√2', isCorrect: true },
          { id: 'c2', text: '2', isCorrect: false },
          { id: 'c3', text: '√5', isCorrect: false },
          { id: 'c4', text: '2√2', isCorrect: false }
        ]
      },
      {
        id: 'stat-q4',
        questionText: 'Dua buah dadu bermata 6 dilempar bersamaan satu kali. Peluang muncul jumlah kedua mata dadu 7 atau 10 adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Ruang sampel n(S) = 36. Jumlah 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) => 6 titik. Jumlah 10: (4,6),(5,5),(6,4) => 3 titik. Keduanya saling lepas. P(7 atau 10) = (6 + 3) / 36 = 9 / 36 = 1/4.',
        choices: [
          { id: 'c1', text: '1/6', isCorrect: false },
          { id: 'c2', text: '1/4', isCorrect: true },
          { id: 'c3', text: '1/3', isCorrect: false },
          { id: 'c4', text: '5/18', isCorrect: false }
        ]
      },
      {
        id: 'stat-q5',
        questionText: 'Peluang A lulus ujian adalah 0,8 dan peluang B lulus ujian adalah 0,7. Jika keduanya saling bebas, peluang A lulus dan B TIDAK lulus adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'P(A) = 0,8. P(B tidak lulus) = 1 - 0,7 = 0,3. Karena saling bebas: P(A ∩ B\') = P(A) · P(B\') = 0,8 · 0,3 = 0,24.',
        choices: [
          { id: 'c1', text: '0,24', isCorrect: true },
          { id: 'c2', text: '0,56', isCorrect: false },
          { id: 'c3', text: '0,14', isCorrect: false },
          { id: 'c4', text: '0,06', isCorrect: false }
        ]
      },
      {
        id: 'stat-q6',
        questionText: 'Kotak I berisi 3 kelereng merah dan 2 putih. Kotak II berisi 4 merah dan 4 putih. Dari masing-masing kotak diambil 1 kelereng. Peluang terambil kedua kelereng berwarna sama adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Warna sama = (Merah, Merah) atau (Putih, Putih). P(M, M) = (3/5) · (4/8) = 12/40. P(P, P) = (2/5) · (4/8) = 8/40. Total peluang = 12/40 + 8/40 = 20/40 = 1/2.',
        choices: [
          { id: 'c1', text: '1/4', isCorrect: false },
          { id: 'c2', text: '2/5', isCorrect: false },
          { id: 'c3', text: '1/2', isCorrect: true },
          { id: 'c4', text: '3/5', isCorrect: false }
        ]
      },
      {
        id: 'stat-q7',
        questionText: 'Sebuah koin dilemparkan 300 kali. Frekuensi harapan munculnya paling sedikit satu sisi angka (A) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Pada 1 pelemparan (1 koin), ruang sampel {A, G}. P(minimal 1 A) = 1/2. Frekuensi harapan Fh = n · P = 300 · (1/2) = 150 kali.',
        choices: [
          { id: 'c1', text: '100', isCorrect: false },
          { id: 'c2', text: '150', isCorrect: true },
          { id: 'c3', text: '200', isCorrect: false },
          { id: 'c4', text: '250', isCorrect: false }
        ]
      },
      {
        id: 'stat-q8',
        questionText: 'Jika rata-rata data kelompok dihitung dengan metode rata-rata sementara xs = 65, panjang kelas p = 10, jumlah fi = 50, dan jumlah fi·ui = -15, maka rata-rata x̄ adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Rumus koding: x̄ = xs + p · [(∑ fi · ui) / ∑ fi] = 65 + 10 · (-15 / 50) = 65 + 10 · (-0,3) = 65 - 3 = 62.',
        choices: [
          { id: 'c1', text: '62', isCorrect: true },
          { id: 'c2', text: '63,5', isCorrect: false },
          { id: 'c3', text: '66,5', isCorrect: false },
          { id: 'c4', text: '68', isCorrect: false }
        ]
      },
      {
        id: 'stat-q9',
        questionText: 'Dari 10 calon pengurus yang terdiri atas 6 pria dan 4 wanita, akan dipilih 3 orang. Peluang terpilih sekurang-kurangnya 2 wanita adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'n(S) = C(10, 3) = 120. Kasus 1 (2 W, 1 P): C(4, 2) · C(6, 1) = 6 · 6 = 36. Kasus 2 (3 W, 0 P): C(4, 3) · C(6, 0) = 4 · 1 = 4. Total n(A) = 36 + 4 = 40. P = 40 / 120 = 1/3.',
        choices: [
          { id: 'c1', text: '1/6', isCorrect: false },
          { id: 'c2', text: '1/4', isCorrect: false },
          { id: 'c3', text: '1/3', isCorrect: true },
          { id: 'c4', text: '1/2', isCorrect: false }
        ]
      },
      {
        id: 'stat-q10',
        questionText: 'Diketahui P(A) = 0,6, P(B) = 0,5, dan P(A ∪ B) = 0,8. Nilai dari peluang bersyarat P(A|B) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'P(A ∩ B) = P(A) + P(B) - P(A ∪ B) = 0,6 + 0,5 - 0,8 = 0,3. Maka P(A|B) = P(A ∩ B) / P(B) = 0,3 / 0,5 = 3/5 = 0,6.',
        choices: [
          { id: 'c1', text: '0,3', isCorrect: false },
          { id: 'c2', text: '0,5', isCorrect: false },
          { id: 'c3', text: '0,6', isCorrect: true },
          { id: 'c4', text: '0,75', isCorrect: false }
        ]
      }
    ]
  },

  // =========================================================================
  // QUIZ 5: ALJABAR, MATRIKS & SISTEM PERSAMAAN LINEAR (10 QUESTIONS)
  // =========================================================================
  {
    id: 'aljabar-matriks',
    title: 'Aljabar, Matriks & Sistem Persamaan Linear',
    summary: '10 Soal determinan Sarrus, invers matriks, sistem persamaan linear tiga variabel, eksponen, dan transformasi matriks.',
    category: 'Aljabar & Matriks',
    tags: ['Kelas 10-11', 'SPLTV', 'Matriks', '10 Soal'],
    bannerColor: '#f59e0b',
    accuracy: 89,
    completion: 95,
    isDraft: false,
    createdAt: '2026-11-16T14:00:00.000Z',
    updatedAt: '2026-11-16T14:00:00.000Z',
    editedTimeAgo: '4 hours ago',
    authorName: 'Tim Matematika 404',
    passingScore: 70,
    resultPassedMessage: 'Kemampuan aljabar linear dan matriks Anda luar biasa!',
    resultFailedMessage: 'Periksa kembali perhitungan tanda minus pada kofaktor dan determinan.',
    questions: [
      {
        id: 'alj-q1',
        questionText: 'Diketahui matriks A = [[3, -2], [4, -1]]. Nilai determinan dari invers matriks A, det(A⁻¹), adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'det(A) = 3(-1) - (-2)(4) = -3 + 8 = 5. Sesuai sifat determinan: det(A⁻¹) = 1 / det(A) = 1/5.',
        choices: [
          { id: 'c1', text: '-5', isCorrect: false },
          { id: 'c2', text: '-1/5', isCorrect: false },
          { id: 'c3', text: '1/5', isCorrect: true },
          { id: 'c4', text: '5', isCorrect: false }
        ]
      },
      {
        id: 'alj-q2',
        questionText: 'Jika matriks M = [[k, 2], [8, k]] adalah matriks singular, maka nilai k yang memenuhi adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Matriks singular memiliki determinan = 0. det(M) = k² - 16 = 0 => k² = 16 => k = ±4.',
        choices: [
          { id: 'c1', text: 'k = ±2', isCorrect: false },
          { id: 'c2', text: 'k = ±4', isCorrect: true },
          { id: 'c3', text: 'k = ±8', isCorrect: false },
          { id: 'c4', text: 'k = ±16', isCorrect: false }
        ]
      },
      {
        id: 'alj-q3',
        questionText: 'Nilai x yang memenuhi persamaan eksponen 3^(2x - 1) = 27^(x - 2) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: '3^(2x - 1) = (3³)^(x - 2) = 3^(3x - 6). Karena basis sama: 2x - 1 = 3x - 6 => 3x - 2x = 6 - 1 => x = 5.',
        choices: [
          { id: 'c1', text: '3', isCorrect: false },
          { id: 'c2', text: '4', isCorrect: false },
          { id: 'c3', text: '5', isCorrect: true },
          { id: 'c4', text: '7', isCorrect: false }
        ]
      },
      {
        id: 'alj-q4',
        questionText: 'Jika ²log 3 = a dan ²log 5 = b, maka nilai ²log 45 adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: '45 = 9 × 5 = 3² × 5. ²log 45 = ²log(3² × 5) = 2 · ²log 3 + ²log 5 = 2a + b.',
        choices: [
          { id: 'c1', text: 'a + 2b', isCorrect: false },
          { id: 'c2', text: '2a + b', isCorrect: true },
          { id: 'c3', text: 'a² + b', isCorrect: false },
          { id: 'c4', text: '2ab', isCorrect: false }
        ]
      },
      {
        id: 'alj-q5',
        questionText: 'Hasil kali matriks [[1, 2], [3, 4]] dengan [[2, 0], [1, 3]] adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Baris 1: [1(2)+2(1), 1(0)+2(3)] = [4, 6]. Baris 2: [3(2)+4(1), 3(0)+4(3)] = [10, 12]. Hasil = [[4, 6], [10, 12]].',
        choices: [
          { id: 'c1', text: '[[4, 6], [10, 12]]', isCorrect: true },
          { id: 'c2', text: '[[2, 6], [8, 12]]', isCorrect: false },
          { id: 'c3', text: '[[4, 0], [3, 12]]', isCorrect: false },
          { id: 'c4', text: '[[5, 6], [7, 12]]', isCorrect: false }
        ]
      },
      {
        id: 'alj-q6',
        questionText: 'Diketahui f(x) = 2x - 3 dan g(x) = x² + 2x - 1. Nilai (g ∘ f)(2) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'f(2) = 2(2) - 3 = 1. Maka (g ∘ f)(2) = g(f(2)) = g(1) = 1² + 2(1) - 1 = 1 + 2 - 1 = 2.',
        choices: [
          { id: 'c1', text: '1', isCorrect: false },
          { id: 'c2', text: '2', isCorrect: true },
          { id: 'c3', text: '3', isCorrect: false },
          { id: 'c4', text: '4', isCorrect: false }
        ]
      },
      {
        id: 'alj-q7',
        questionText: 'Akar-akar persamaan kuadrat 2x² - 6x + 1 = 0 adalah α dan β. Nilai dari (1/α + 1/β) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'α + β = -b/a = -(-6)/2 = 3. α · β = c/a = 1/2. 1/α + 1/β = (α + β) / (α · β) = 3 / (1/2) = 6.',
        choices: [
          { id: 'c1', text: '3', isCorrect: false },
          { id: 'c2', text: '4', isCorrect: false },
          { id: 'c3', text: '6', isCorrect: true },
          { id: 'c4', text: '12', isCorrect: false }
        ]
      },
      {
        id: 'alj-q8',
        questionText: 'Bentuk sederhana dari rasionalisasi penyebut 6 / (√5 - √2) adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Kalikan sekawan (√5 + √2): 6(√5 + √2) / (5 - 2) = 6(√5 + √2) / 3 = 2(√5 + √2) = 2√5 + 2√2.',
        choices: [
          { id: 'c1', text: '2√5 + 2√2', isCorrect: true },
          { id: 'c2', text: '2√5 - 2√2', isCorrect: false },
          { id: 'c3', text: '3√5 + 3√2', isCorrect: false },
          { id: 'c4', text: '√5 + √2', isCorrect: false }
        ]
      },
      {
        id: 'alj-q9',
        questionText: 'Transpos dari matriks A = [[1, 4, 7], [2, 5, 8]] adalah matriks berordo...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Matriks A berordo 2 × 3 (2 baris, 3 kolom). Transposnya Aᵀ mengubah baris menjadi kolom sehingga berordo 3 × 2.',
        choices: [
          { id: 'c1', text: '2 × 2', isCorrect: false },
          { id: 'c2', text: '2 × 3', isCorrect: false },
          { id: 'c3', text: '3 × 2', isCorrect: true },
          { id: 'c4', text: '3 × 3', isCorrect: false }
        ]
      },
      {
        id: 'alj-q10',
        questionText: 'Suku ke-7 dari barisan geometri 3, 6, 12, 24, ... adalah...',
        type: 'multiple_choice',
        required: true,
        estimationTimeMins: 1,
        points: 10,
        explanation: 'Suku pertama a = 3, rasio r = 6/3 = 2. U₇ = a · r^(7-1) = 3 · 2⁶ = 3 · 64 = 192.',
        choices: [
          { id: 'c1', text: '96', isCorrect: false },
          { id: 'c2', text: '128', isCorrect: false },
          { id: 'c3', text: '192', isCorrect: true },
          { id: 'c4', text: '384', isCorrect: false }
        ]
      }
    ]
  }
];
