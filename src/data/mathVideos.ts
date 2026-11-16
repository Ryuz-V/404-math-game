export interface MathVideo {
  topicId: string;
  title: string;
  channel: 'm4th-lab' | 'Ruangguru' | 'BIG Course' | 'Zenius';
  youtubeId: string;
  embedUrl: string;
  watchUrl: string;
  searchUrl: string;
  description: string;
  duration?: string;
  keyPoints: string[];
}

export const MATH_VIDEOS: Record<string, MathVideo> = {
  // === KELAS 10 (5 TOPIK) ===
  'grade-10-exponents': {
    topicId: 'grade-10-exponents',
    title: 'Eksponen & Logaritma: Definisi dan Sifat-sifat Eksponen (Kurikulum Merdeka)',
    channel: 'm4th-lab',
    youtubeId: 'lScgN1qnirY',
    embedUrl: 'https://www.youtube-nocookie.com/embed/lScgN1qnirY',
    watchUrl: 'https://www.youtube.com/watch?v=lScgN1qnirY',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+eksponen+dan+logaritma',
    description: 'Berdasarkan Buku Kemendikbud Bab 1: Penjelasan konsep bilangan berpangkat, sifat perkalian & pembagian eksponen, bentuk akar, dan sifat-sifat logaritma.',
    duration: '24:18',
    keyPoints: [
      'Konsep dasar eksponen sebagai perkalian berulang aⁿ',
      'Sifat perkalian, pembagian, dan pemangkatan eksponen',
      'Pangkat pecahan dan hubungannya dengan bentuk akar',
      'Logaritma sebagai invers perpangkatan dan sifat rantai'
    ]
  },
  'grade-10-quadratics': {
    topicId: 'grade-10-quadratics',
    title: 'Fungsi Kuadrat: Konsep Dasar, Karakteristik Parabola & Diskriminan',
    channel: 'm4th-lab',
    youtubeId: 'P-j5_yoNGOw',
    embedUrl: 'https://www.youtube-nocookie.com/embed/P-j5_yoNGOw',
    watchUrl: 'https://www.youtube.com/watch?v=P-j5_yoNGOw',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+fungsi+kuadrat',
    description: 'Berdasarkan Buku Guru Kemendikbud Bab 6: Peran nilai koefisien a menentukan keterbukaan parabola, konstanta c memotong sumbu Y di (0,c), dan Diskriminan D = b² - 4ac.',
    duration: '21:30',
    keyPoints: [
      'Pengaruh nilai koefisien a dan konstanta c terhadap bentuk kurva parabola',
      'Makna nilai Diskriminan D > 0, D = 0, dan D < 0 pada titik potong sumbu X',
      'Menentukan sumbu simetri x = -b/(2a) dan titik optimum y = -D/(4a)',
      'Aplikasi ketinggian maksimum dan pemodelan lintasan parabola'
    ]
  },
  'grade-10-spltv': {
    topicId: 'grade-10-spltv',
    title: 'Sistem Persamaan Linear Tiga Variabel (SPLTV): Eliminasi & Substitusi',
    channel: 'm4th-lab',
    youtubeId: 'JVANLCfV70w',
    embedUrl: 'https://www.youtube-nocookie.com/embed/JVANLCfV70w',
    watchUrl: 'https://www.youtube.com/watch?v=JVANLCfV70w',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+spltv',
    description: 'Berdasarkan Buku Siswa Matematika Kelas X: Metode eliminasi bertingkat, substitusi balik, strategi pemisahan variabel pecahan 1/x, 1/y, 1/z, dan pemodelan kontekstual.',
    duration: '28:45',
    keyPoints: [
      'Bentuk umum SPLTV ax + by + cz = d',
      'Langkah sistematis eliminasi bertingkat 3 variabel menjadi 2 variabel',
      'Metode substitusi untuk menentukan himpunan penyelesaian HP = {(x, y, z)}',
      'Teknik permisalan pecahan 1/x = p, 1/y = q, 1/z = r'
    ]
  },
  'grade-10-trigonometry': {
    topicId: 'grade-10-trigonometry',
    title: 'Trigonometri Dasar: Perbandingan Sisi Siku-Siku & Aturan Segitiga',
    channel: 'm4th-lab',
    youtubeId: '2iTbfPEMCeo',
    embedUrl: 'https://www.youtube-nocookie.com/embed/2iTbfPEMCeo',
    watchUrl: 'https://www.youtube.com/watch?v=2iTbfPEMCeo',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+trigonometri+dasar',
    description: 'Definisi sinus (de/mi), kosinus (sa/mi), tangen (de/sa), nilai sudut istimewa kuadran I-IV, Aturan Sinus a/sin A = 2R, Aturan Kosinus, dan luas segitiga sembarang.',
    duration: '32:10',
    keyPoints: [
      'Perbandingan trigonometri pada segitiga siku-siku (demi, sami, desa)',
      'Nilai eksak sudut istimewa (0°, 30°, 45°, 60°, 90°)',
      'Relasi sudut antar kuadran I, II, III, dan IV',
      'Aturan Sinus dan Kosinus untuk segitiga sembarang tanpa sudut siku-siku'
    ]
  },
  'grade-10-sequences': {
    topicId: 'grade-10-sequences',
    title: 'Barisan & Deret: Aritmatika, Geometri & Deret Tak Hingga',
    channel: 'm4th-lab',
    youtubeId: 'r-4fG7LB6Hw',
    embedUrl: 'https://www.youtube-nocookie.com/embed/r-4fG7LB6Hw',
    watchUrl: 'https://www.youtube.com/watch?v=r-4fG7LB6Hw',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+barisan+dan+deret',
    description: 'Menganalisis pola beda konstan Un = a + (n-1)b dan rasio konstan Un = a · rⁿ⁻¹, jumlah n suku pertama Sn, serta konvergensi deret geometri tak hingga S∞ = a/(1-r).',
    duration: '26:50',
    keyPoints: [
      'Perbedaan mendasar pola aritmatika (selisih tetap) dan geometri (rasio tetap)',
      'Penurunan rumus suku ke-n Un dan jumlah suku deret Sn',
      'Rumus praktis hubungan Un = Sn - S_{n-1}',
      'Syarat deret konvergen |r| < 1 dan perhitungan pantulan bola'
    ]
  },

  // === KELAS 11 (5 TOPIK) ===
  'grade-11-functions': {
    topicId: 'grade-11-functions',
    title: 'Fungsi Komposisi & Invers: Operasi Aljabar, (f o g)(x) dan Sifat Invers',
    channel: 'm4th-lab',
    youtubeId: 'cHsQqTJO9x0',
    embedUrl: 'https://www.youtube-nocookie.com/embed/cHsQqTJO9x0',
    watchUrl: 'https://www.youtube.com/watch?v=cHsQqTJO9x0',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+fungsi+komposisi',
    description: 'Penggabungan dua fungsi (f ∘ g)(x) = f(g(x)), sifat non-komutatif, syarat fungsi bijektif (satu-satu dan pada), serta rumus cepat invers pecahan linear f⁻¹(x).',
    duration: '25:40',
    keyPoints: [
      'Domain dan range fungsi gabungan komposisi',
      'Sifat asosiatif dan non-komutatif fungsi komposisi',
      'Syarat fungsi memiliki invers: harus berkorespondensi satu-satu (bijektif)',
      'Trik cepat mencari invers pecahan linear f(x) = (ax + b)/(cx + d)'
    ]
  },
  'grade-11-circles': {
    topicId: 'grade-11-circles',
    title: 'Persamaan Lingkaran: Titik Pusat (a,b), Kedudukan Garis & Garis Singgung',
    channel: 'm4th-lab',
    youtubeId: 'A1EVg6s0NDg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/A1EVg6s0NDg',
    watchUrl: 'https://www.youtube.com/watch?v=A1EVg6s0NDg',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+persamaan+lingkaran',
    description: 'Persamaan lingkaran standar (x - a)² + (y - b)² = r², bentuk umum x² + y² + Ax + By + C = 0, kedudukan garis terhadap lingkaran, dan rumus garis singgung gradien m.',
    duration: '30:15',
    keyPoints: [
      'Menentukan pusat P(a, b) dan jari-jari r dari bentuk umum',
      'Posisi titik terhadap lingkaran (di dalam, tepat pada kurva, di luar)',
      'Persamaan garis singgung melalui titik pada lingkaran (metode bagi adil)',
      'Persamaan garis singgung dengan gradien tertentu y - b = m(x - a) ± r√(1 + m²)'
    ]
  },
  'grade-11-matrices': {
    topicId: 'grade-11-matrices',
    title: 'Matriks & Sistem Persamaan Linear: Perkalian, Determinan & Invers',
    channel: 'm4th-lab',
    youtubeId: '0Ipy1aKNZa8',
    embedUrl: 'https://www.youtube-nocookie.com/embed/0Ipy1aKNZa8',
    watchUrl: 'https://www.youtube.com/watch?v=0Ipy1aKNZa8',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+determinan+invers+matriks',
    description: 'Syarat perkalian matriks baris × kolom, determinan ordo 2×2 dan 3×3 (aturan Sarrus), matriks non-singular (|A| ≠ 0), invers A⁻¹ = (1/det) · Adj(A), dan Aturan Cramer.',
    duration: '28:10',
    keyPoints: [
      'Aturan perkalian ordo (m × k) · (k × n) = (m × n)',
      'Menghitung determinan 3×3 dengan diagonal Sarrus',
      'Sifat determinan |A · B| = |A| · |B| dan |A⁻¹| = 1/|A|',
      'Menyelesaikan SPLDV dan SPLTV menggunakan matriks invers & Aturan Cramer'
    ]
  },
  'grade-11-transformations': {
    topicId: 'grade-11-transformations',
    title: 'Transformasi Geometri: Translasi, Refleksi, Rotasi & Dilatasi Matriks',
    channel: 'm4th-lab',
    youtubeId: 'qT9pr1C_SDY',
    embedUrl: 'https://www.youtube-nocookie.com/embed/qT9pr1C_SDY',
    watchUrl: 'https://www.youtube.com/watch?v=qT9pr1C_SDY',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+transformasi+geometri',
    description: 'Pemetaan titik dan kurva: translasi T(a, b), refleksi sumbu X, Y, y=x, rotasi pusat (0,0) sudut θ, dilatasi faktor skala k, serta matriks transformasi komposisi T2 ∘ T1.',
    duration: '31:25',
    keyPoints: [
      'Translasi sebagai penjumlahan vektor pergeseran',
      'Matriks transformasi refleksi terhadap berbagai garis acuan',
      'Matriks rotasi [cos θ, -sin θ; sin θ, cos θ] berlawanan jarum jam',
      'Komposisi dua transformasi dengan perkalian matriks urutan terbalik M2 · M1'
    ]
  },
  'grade-11-limit': {
    topicId: 'grade-11-limit',
    title: 'Limit Fungsi Aljabar: Bentuk Tentu, Tak Tentu (0/0), Pemfaktoran & Akar Sekawan',
    channel: 'm4th-lab',
    youtubeId: 'TE1BqPXXX7E',
    embedUrl: 'https://www.youtube-nocookie.com/embed/TE1BqPXXX7E',
    watchUrl: 'https://www.youtube.com/watch?v=TE1BqPXXX7E',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+limit+fungsi+aljabar',
    description: 'Konsep limit mendekati titik x → c, pemfaktoran aljabar untuk menghilangkan pembuat nol (x - c), perkalian akar sekawan, dan limit fungsi mendekati tak hingga x → ∞.',
    duration: '22:40',
    keyPoints: [
      'Substitusi langsung sebagai langkah awal evaluasi limit',
      'Identifikasi bentuk tak tentu 0/0 yang memerlukan manipulasi aljabar',
      'Metode pemfaktoran dan pembagian suku polinomial',
      'Perkalian bentuk akar sekawan (a - b)(a + b) = a² - b²'
    ]
  },

  // === KELAS 12 (7 TOPIK) ===
  'dimensi-tiga': {
    topicId: 'dimensi-tiga',
    title: 'Dimensi Tiga: Jarak Titik ke Titik, Garis, dan Bidang pada Kubus',
    channel: 'm4th-lab',
    youtubeId: 'IOxRkDZ04xM',
    embedUrl: 'https://www.youtube-nocookie.com/embed/IOxRkDZ04xM',
    watchUrl: 'https://www.youtube.com/watch?v=IOxRkDZ04xM',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+dimensi+tiga+jarak+titik+ke+garis',
    description: 'Analisis geometri bangun ruang kubus dan limas: diagonal bidang s√2, diagonal ruang s√3, proyeksi ortogonal tegak lurus, dan teorema Pythagoras pada segitiga bantu.',
    duration: '29:15',
    keyPoints: [
      'Identifikasi kedudukan titik, garis, dan bidang pada bangun ruang',
      'Diagonal bidang s√2 dan diagonal ruang s√3 pada kubus rusuk s',
      'Menentukan jarak titik ke garis menggunakan segitiga bantu dan perbandingan luas',
      'Proyeksi tegak lurus titik ke bidang datar'
    ]
  },
  'statistika': {
    topicId: 'statistika',
    title: 'Statistika Data Kelompok: Rata-rata (Mean), Median, Modus & Kuartil',
    channel: 'm4th-lab',
    youtubeId: 'XQ8UJAMJcUQ',
    embedUrl: 'https://www.youtube-nocookie.com/embed/XQ8UJAMJcUQ',
    watchUrl: 'https://www.youtube.com/watch?v=XQ8UJAMJcUQ',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+statistika+data+kelompok',
    description: 'Pengolahan tabel distribusi frekuensi: titik tengah xi, rata-rata metode koding (rata-rata sementara), median dengan frekuensi kumulatif fk, dan modus tepi bawah Tb.',
    duration: '34:20',
    keyPoints: [
      'Penyusunan tabel distribusi frekuensi dari data mentah',
      'Perhitungan mean data kelompok dengan rumus Σ(fi · xi) / Σfi',
      'Menentukan letak dan nilai median data kelompok Me = Tb + [(n/2 - fk)/fme] · p',
      'Rumus modus data kelompok Mo = Tb + [d1 / (d1 + d2)] · p'
    ]
  },
  'kaidah-pencacahan': {
    topicId: 'kaidah-pencacahan',
    title: 'Kaidah Pencacahan: Aturan Penjumlahan, Perkalian, Permutasi & Kombinasi',
    channel: 'm4th-lab',
    youtubeId: 'P6kH3U2fsOQ',
    embedUrl: 'https://www.youtube-nocookie.com/embed/P6kH3U2fsOQ',
    watchUrl: 'https://www.youtube.com/watch?v=P6kH3U2fsOQ',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+kaidah+pencacahan',
    description: 'Aturan perkalian (slot filling), notasi faktorial n!, perbedaan fundamental permutasi (urutan diperhatikan nPr) vs kombinasi (urutan bebas nCr), dan permutasi siklis.',
    duration: '26:30',
    keyPoints: [
      'Prinsip aturan pengisian tempat (filling slots method)',
      'Definisi dan operasi faktorial n! = n · (n-1) · ... · 1',
      'Permutasi susunan berurutan: P(n, r) = n! / (n - r)!',
      'Kombinasi pemilihan acak: C(n, r) = n! / [r! · (n - r)!]'
    ]
  },
  'peluang-majemuk': {
    topicId: 'peluang-majemuk',
    title: 'Peluang Kejadian Majemuk: Saling Lepas, Saling Bebas & Peluang Bersyarat',
    channel: 'm4th-lab',
    youtubeId: 'GUV4D1hJKrA',
    embedUrl: 'https://www.youtube-nocookie.com/embed/GUV4D1hJKrA',
    watchUrl: 'https://www.youtube.com/watch?v=GUV4D1hJKrA',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+peluang+kejadian+majemuk',
    description: 'Ruang sampel S dan titik sampel, peluang kejadian tunggal P(A) = n(A)/n(S), komplemen P(A\') = 1 - P(A), kejadian saling lepas (penjumlahan), dan kejadian saling bebas (perkalian).',
    duration: '28:10',
    keyPoints: [
      'Konsep ruang sampel dan frekuensi relatif kejadian',
      'Peluang gabungan kejadian saling lepas P(A ∪ B) = P(A) + P(B)',
      'Peluang irisan dua kejadian saling bebas P(A ∩ B) = P(A) · P(B)',
      'Peluang bersyarat P(A|B) = P(A ∩ B) / P(B)'
    ]
  },
  'kalkulus-lanjut': {
    topicId: 'kalkulus-lanjut',
    title: 'Limit & Turunan Fungsi Trigonometri: Teorema Dasar & Aturan Rantai',
    channel: 'm4th-lab',
    youtubeId: 'R9oZ0qg1V7w',
    embedUrl: 'https://www.youtube-nocookie.com/embed/R9oZ0qg1V7w',
    watchUrl: 'https://www.youtube.com/watch?v=R9oZ0qg1V7w',
    searchUrl: 'https://www.youtube.com/results?search_query=m4th+lab+limit+fungsi+trigonometri',
    description: 'Teorema limit trigonometri lim(x→0) sin(ax)/(bx) = a/b, turunan fungsi sin x, cos x, tan x, aturan perkalian u · v, pembagian u/v, dan aplikasi aturan rantai kalkulus.',
    duration: '31:40',
    keyPoints: [
      'Teorema limit utama lim(x→0) sin(x)/x = 1 dan lim(x→0) tan(x)/x = 1',
      'Turunan dasar trigonometri: d/dx(sin x) = cos x, d/dx(cos x) = -sin x',
      'Aturan rantai untuk fungsi komposisi trigonometri d/dx [f(g(x))]',
      'Gradien garis singgung kurva fungsi trigonometri m = f\'(x₁)'
    ]
  }
};

export const getMathVideoForTopic = (topicId: string, topicTitle?: string): MathVideo => {
  if (MATH_VIDEOS[topicId]) {
    return MATH_VIDEOS[topicId];
  }
  const cleanTitle = (topicTitle || topicId).replace(/[^a-zA-Z0-9\s]/g, ' ');
  return {
    topicId,
    title: `Video Pembahasan: ${topicTitle || topicId}`,
    channel: 'm4th-lab',
    youtubeId: 'P-j5_yoNGOw',
    embedUrl: 'https://www.youtube-nocookie.com/embed/P-j5_yoNGOw',
    watchUrl: `https://www.youtube.com/results?search_query=m4th+lab+matematika+${encodeURIComponent(cleanTitle)}`,
    searchUrl: `https://www.youtube.com/results?search_query=m4th+lab+matematika+${encodeURIComponent(cleanTitle)}`,
    description: `Materi video edukatif dan pembahasan komprehensif mengenai ${topicTitle || topicId} dari kanal m4th-lab.`,
    duration: '20:00',
    keyPoints: [
      'Pemahaman konsep dasar dan penurunan rumus esensial',
      'Contoh soal bertingkat dari mudah hingga level ujian',
      'Trik cepat eliminasi dan analisis matematis'
    ]
  };
};
