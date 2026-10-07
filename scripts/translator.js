const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

const translationMap = {
  "Permainan Dimulai": "Game Started",
  "Giliran": "Turn",
  "JAWABAN BENAR": "CORRECT ANSWER",
  "JAWABAN SALAH": "WRONG ANSWER",
  "BENAR": "CORRECT",
  "SALAH": "WRONG",
  "Jumlah Pemain": "Number of Players",
  "Mode Bermain": "Play Mode",
  "PENGATURAN MATCH SEBELUM MAIN": "MATCH SETTINGS BEFORE PLAYING",
  "Main Menu": "Main Menu",
  "Bermain": "Playing",
  "Tim": "Team",
  "Permainan": "Game",
  "Tembak": "Shoot",
  "Papan Jawaban": "Answer Board",
  "soal di tengah": "center question",
  "Peluru": "Ammo",
  "butir": "bullets",
  "dengan waktu": "with time",
  "Detik": "Seconds",
  "Pilih": "Choose",
  "Jawaban": "Answer",
  "Menyerah": "Give Up",
  "Berhasil": "Success",
  "Gagal": "Failed",
  "Lanjutkan": "Continue",
  "Ulangi": "Retry",
  "Kembali": "Back",
  "Keluar": "Exit",
  "Batal": "Cancel",
  "Tutup": "Close",
  "Skor": "Score",
  "Menang": "Win",
  "Kalah": "Lose",
  "Seri": "Draw",
  "Pilihan": "Choice",
  "Pilihan Jawaban": "Answer Choice",
  "Tingkat Kesulitan": "Difficulty Level",
  "Pilih Tingkat Kesulitan": "Choose Difficulty Level",
  "Materi": "Material",
  "Bab": "Chapter",
  "Topik": "Topic",
  "Peringkat": "Leaderboard",
  "Daftar": "Register",
  "Masuk": "Log In",
  "Tentang": "About",
  "Kuis": "Quiz",
  "Soal": "Question",
  "Buka": "Open",
  "Toko": "Shop",
  "Senjata": "Weapon",
  "Beli": "Buy",
  "Taktis": "Tactical",
  "Pertahanan": "Defense",
  "Perbaiki": "Repair",
  "Gunakan": "Use",
  "Pagar": "Fence",
  "Listrik": "Electric",
  "Biaya": "Cost",
  "Gugur": "Fallen",
  "Musuh": "Enemy",
  "Dieliminasi": "Eliminated",
  "Terbuka": "Unlocked",
  "Kembali Bertarung": "Return to Battle",
  "Konfirmasi": "Confirm",
  "Pembelian": "Purchase",
  "Batalkan": "Cancel",
  "Menang": "Win",
  "Kalah": "Lose",
  "Seri": "Draw",
  "Memuat": "Loading",
  "Sedang Memuat": "Loading",
  "Tidak ditemukan": "Not found",
  "Unggah": "Upload",
  "Unduh": "Download",
  "Simpan": "Save",
  "Hapus": "Delete",
  "Tambah": "Add",
  "Ubah": "Edit",
  "Pemain": "Player",
  "Anak": "Child",
  "Papan": "Board",
  "Dadu": "Dice",
  "Lempar": "Throw",
  "Putar": "Spin",
  "Tarik": "Pull",
  "Tambang": "Rope",
  "Opsi": "Option",
  "Pilih Jawaban": "Choose Answer",
};

// Function to recursively find all files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const files = getAllFiles(srcDir);

let changedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  for (const [id, en] of Object.entries(translationMap)) {
    // Only replace inside tags or quotes (e.g. >Teks< or 'Teks')
    const tagRegex = new RegExp(`>\\s*${id}\\s*<`, 'g');
    content = content.replace(tagRegex, `>${en}<`);

    const tagPuncRegex = new RegExp(`>\\s*${id}\\s*!*\\?*\\:*<`, 'g');
    content = content.replace(tagPuncRegex, (match) => match.replace(id, en));

    // Special case for JSX text with trailing punctuation (like `{player.name} menang!`)
    // We will just do a standard replace for very specific long phrases
    if (id.includes(" ")) {
       const globalRegex = new RegExp(`(?<=[>'"\`\\s])${id}(?=[<'"\`\\s\\!\\?\\:])`, 'g');
       content = content.replace(globalRegex, en);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.basename(file)}`);
    changedFiles++;
  }
}

console.log(`Finished translating. Updated ${changedFiles} files.`);
