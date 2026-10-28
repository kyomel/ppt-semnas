# TALK TRACK - SEMNAS AMIKOM 2026

Pembicara: Michael Stevan Lapandio. Yogyakarta, 28 Oktober 2026.
Deck: **27 slide**, mode penyaji. Peserta tidak mengklik apa pun.

Anggaran waktu (satu jam penuh, tanya jawab termasuk):

| Bagian | Menit |
|---|---|
| Bicara (slide 1 sampai 27) | 44 |
| Tanya jawab | 10 |
| Cadangan (acara mulai telat, jawaban panjang) | 6 |
| **Total** | **60** |

Aturan di panggung:
- Satu slide, satu pesan. Baca judul, ucapkan poin, lanjut.
- Pesan utama tiap slide tampil tanpa klik. Kamu menjelaskannya dengan suara.
- Klik hanya alat bantu penyaji (simpul 3D, daftar kabar, tombol lapisan). Klik secukupnya hanya di slide 6, 12, 18, dan 19. Di slide lain tidak perlu klik.
- Jangan minta peserta menjawab keras. Pertanyaan di slide dijawab dalam hati.
- Cek jam di tiga titik: slide 12 (menit 17:30), slide 19 (menit 29:30), slide 23 (menit 38:00).
- Tiap catatan slide dibagi dua. **Ucapkan** harus muat dalam durasi slide. **Di layar, jawab kalau ditanya** tidak perlu kamu ucapkan: peserta bisa membacanya.

## Jadwal

| Menit | Slide | Judul | Durasi | Catatan |
|---|---|---|---|---|
| 0:00 | 1 | Judul + kabar SI | 1,5 | Pembuka |
| 1:30 | 2 | Agenda | 0,5 | Sebut enam bagian saja |
| 2:00 | 3 | AI mesin prediksi | 2,5 | |
| 4:30 | 4 | Salah dengan yakin | 2 | |
| 6:30 | 5 | Tujuh istilah | 1 | **Lewati jika telat** |
| 7:30 | 6 | Sepekan di AI (22-28 Okt) | 2,5 | Tiga dari tujuh kabar |
| 10:00 | 7 | Indonesia | 2,5 | Termasuk kotak pembanding |
| 12:30 | 8 | Untuk apa AI dipakai | 1,5 | |
| 14:00 | 9 | Skill 2030 | 1 | **Lewati jika telat** |
| 15:00 | 10 | Literasi bukan tool use | 1 | |
| 16:00 | 11 | Empat domain | 1,5 | |
| 17:30 | 12 | Tangga lima level | 2,5 | Titik cek jam 1 |
| 20:00 | 13 | Empat jebakan | 1,5 | |
| 21:30 | 14 | Rekan magang | 1 | |
| 22:30 | 15 | Verifikasi | 2 | |
| 24:30 | 16 | Friksi kognitif | 1,5 | |
| 26:00 | 17 | Kamu yang memutuskan | 1,5 | **Lewati jika telat** |
| 27:30 | 18 | Frontier bergerigi | 2 | |
| 29:30 | 19 | Empat lapis prompt | 3 | Titik cek jam 2 |
| 32:30 | 20 | Anatomi agent | 1,5 | |
| 34:00 | 21 | Otonomi dan lima gerbang | 2,5 | |
| 36:30 | 22 | Studi kasus 60 menit | 1,5 | |
| 38:00 | 23 | Aturan main | 2 | Titik cek jam 3 |
| 40:00 | 24 | Empat mitos | 1,5 | |
| 41:30 | 25 | Rencana 30 hari | 1 | |
| 42:30 | 26 | Rangkuman | 1 | |
| 43:30 | 27 | Penutup | 0,5 | |
| 44:00 | | Tanya jawab | 10 | QR grup SWE Growth tampil |
| 54:00 | | Cadangan | 6 | |

## Cek ulang pada hari H (27-28 Oktober)

Data di deck diverifikasi 24 Oktober 2026 dengan Exa. Slide 6 dan slide 24 diperbarui lagi 28 Oktober 2026 sekitar pukul 08.30 WIB (lima cek di bawah dijalankan pada waktu itu). Kabar jam Amerika untuk 28 Oktober baru masuk mulai sekitar 20.00 WIB (waktu musim panas AS berlaku sampai 1 November). Sebelum tampil siang, cek 1 hanya menemukan kabar Asia dan Indonesia: Antara, Kompas, Komdigi. Semuanya muat dalam 15 menit.

1. **Slide 6, kabar AI.** Cari kabar 28 Oktober yang lebih baru. Kalau ada kabar besar, ganti kartu Kimi K3.1 Pro (23 Okt). Ubah `EVENTS` di `src/slides/act-1-foundations.tsx`. Jumlah kabar harus tetap 7. Ubah juga judul slide ("Sepekan di AI, 22-28 Oktober"), label di `src/slides/index.tsx`, dan baris sumber.
2. **Slide 24, mitos model.** Buka https://artificialanalysis.ai/leaderboards/models. Cek skor dan biaya per tugas Claude Opus 5.5 (58; $5,98) dan MiniMax M3.1 Flash (43; $0,22). Angka ini tidak berubah per 28 Okt. Ubah teks mitos 3 kalau angkanya bergeser.
3. **Slide 1, kabar SI.** Cek apakah Tiongkok atau pihak lain berubah sikap sejak 26 September. Dialog SI AS-Tiongkok dijadwalkan paling lambat November.
4. **Slide 23, aturan.** Cek apakah Perpres etika AI dan peta jalan AI nasional, serta lembaga PDP, sudah resmi terbit. Kalau ya, ubah kalimat di bawah judul slide.
5. **Slide 21, Claude Duet.** Cek apakah ketersediaan berubah dari "research preview, waitlist, AS".

Kalau telat lebih dari 3 menit di slide 19, lewati slide 5, 9, dan 17. Itu menghemat 3,5 menit. Kalau masih telat, potong tanya jawab, bukan slide 19 sampai 22.

## Ukuran teks di proyektor (diukur 28 Oktober)

- Semua ukuran teks memakai `rem`. Root `html` mengikuti layar: `min(1.25vw, 2.2222vh) x --type-scale` di `src/app/globals.css`. Di 1280x720 hasilnya 16px. Di 1920x1080 hasilnya 24px. Teks selalu sama besar terhadap tinggi layar, di resolusi apa pun.
- Sebelum perubahan ini, teks isi tetap 11-13px di layar 1080p. Itu hanya sekitar 1,1% tinggi layar.
- Zoom browser (Cmd +) tidak lagi memperbesar teks. Untuk memperbesar semua teks, ubah `--type-scale` (contoh `1.05`), lalu jalankan `bun run build`. Di atas 1,0 slide 7 dan 23 mulai meluap.
- Judul sekitar 5,6% tinggi layar. Kalimat di bawah judul sekitar 3%. Dua bagian ini terbaca dari baris belakang.
- Isi kartu (sekitar 1,7%) dan label (sekitar 1,4%) adalah rujukan jarak dekat. Ucapkan isinya, jangan minta peserta membacanya. Slide 6 pengecualian: isi kartu 16 piksel pada 1280x720 (2,3%).
- Uji di aula sebelum mulai: layar penuh (F), berdiri di baris paling belakang, baca judul dan kalimat di bawahnya. Kalau tidak terbaca, perbesar `--type-scale` atau naikkan resolusi keluaran laptop.
- Slide dengan ruang sisa paling banyak (teks isi bisa diperbesar sampai 1,25x): 1, 2, 4, 5, 8, 10, 14, 16, 18, 22, 25, 27. Slide terpadat (tidak bisa diperbesar): 7, 12, 15, 19, 23.

## Poin bicara per slide

**1. Judul dan kabar SI (1,5 menit)**
- Buka dengan kabar: 25 September, Gedung Putih menyatakan Trump dan Xi sepakat memakai "Super Intelligence" (SI), bukan "AI".
- Beri koreksi sendiri: rilis resmi Tiongkok tetap menulis AI. Kemlu Tiongkok hanya berkata "menghormati" pilihan kata AS. Perintah eksekutif 29 September hanya mengikat pemerintah AS.
- Kalimat kunci: "Namanya boleh super. Mesinnya tetap menebak kata berikutnya." Itu inti satu jam ini: paham mesinnya, bukan namanya.

**2. Agenda (0,5)**: fondasi, realita, model mental, mindset, skill, aksi. Urutannya sengaja.

**3. AI mesin prediksi (2,5)**: empat langkah terbaca di daftar kiri: token, vektor, attention, prediksi. Jelaskan satu kalimat per langkah. Analogi autocomplete. Kubus 3D menyorot langkah yang kamu klik, tetapi klik itu opsional.

**4. Salah dengan yakin (2)**
- Ucapkan: tiga pemicu halusinasi. Batang 94% yakin dan 38% benar adalah ilustrasi, bukan data. Contoh nyata: MiniMax M3.1 Flash menjawab benar 56% pertanyaan, tetapi saat tidak benar, 93% jawabannya salah total, bukan "tidak tahu".
- Di layar, jawab kalau ditanya: 93% bukan "93% semua jawaban salah". Ukurannya salah dibagi (salah + menolak menjawab). Model sebelumnya 18%. Satu model, satu benchmark (AA-Omniscience).

**5. Tujuh istilah (1)**: LLM, token, konteks, halusinasi, RAG, fine-tuning, agent. Semua definisi tampil. Bacakan dua atau tiga, sisanya dibaca sendiri.

**6. Sepekan di AI (2,5)**
- Ucapkan (klik daftar kanan, tiga kabar, sekitar 40 detik per kabar): GPT-6.1 Terra (kartu 3: lebih murah, klaim galat turun datang dari OpenAI sendiri, jadi tetap cek jawaban), Kemkomdigi untuk pelajar (kartu 5: jangan salin jawaban AI, bandingkan dengan sumber teruji), Meta Muse (kartu 7, kabar hari ini 28 Okt: agent bertindak atas namamu, jadi beri izin sekecil mungkin; sambungkan dengan Cohere dan Qwen, sandbox tanpa jalur keluar menahan upaya kirim file ke Beijing). Klik maju saja, tutup di kabar hari ini. Lalu satu kalimat: Genie 4 membuat dunia dengan suara dan diberi watermark SynthID, jadi yang terlihat nyata belum tentu nyata. Kimi K3.1 Pro baru berjanji merilis bobot pada 4 November.
- Di layar, jawab kalau ditanya:
  - GPT-6.1 Terra: angka galat 53,6% ke 16,7% (usaha rendah) dan 4,3% (usaha maksimum) berasal dari uji internal OpenAI dengan prompt pemicu galat. Artificial Analysis memberi skor 48 dan $0,40 per tugas (28 Okt).
  - Cohere dan Qwen: terjadi pada kurang dari 1 dari 100.000 panggilan. Cohere tidak bisa menentukan apakah itu disengaja atau sisa pelatihan, dan belum menetapkan siapa pemilik bucket. Cohere menjual model sendiri dan bersaing dengan Alibaba. Sandbox tanpa jalur keluar menahan permintaan itu, jadi tidak ada data terkirim.
  - Meta Muse: dibuka di Singapura 28 Okt (iOS, Android, web). AS dan Kanada sejak 8 Sep, Jepang sejak 23 Okt. Meta berkata Muse berjalan di VM cloud khusus, tidak melihat kata sandi atau metode bayar, dan meminta persetujuan sebelum beli atau kirim email. Pengguna bisa memberi akses baca saja. Straits Times mengujinya: reservasi berhasil, pembatalan gagal, dan satu saran restoran sudah tutup. The Guardian (29 Sep) melaporkan Muse memberi alamat rumah pengguna ke calon pembeli di Facebook Marketplace tanpa izin pengguna. Peluncuran di Indonesia tidak ditemukan per 28 Okt.
  - Genie 4: research preview untuk penguji tepercaya. Segera untuk pelanggan Google AI Ultra (mulai $100 per bulan) dan mitra awal Gemini API. Harga API belum ada. DeepMind mengakui detail dan objek bisa bergeser pada sesi panjang.
  - Kimi K3.1 Pro: skor Artificial Analysis 55, $2,11 per tugas. Lisensi belum diumumkan. Per 26 Okt bobot belum ada di Hugging Face. Angka Terminal-Bench adalah klaim Moonshot.
  - METR (22 Okt, tidak lagi di slide): METR dan Redwood menemukan celah di pemantauan agent internal OpenAI. OpenAI menyatakan celah sudah ditambal, METR belum menilai klaim itu.
  - Komdigi dan Meta AI: Komdigi meminta klarifikasi Meta. Tanggapan resmi Meta tidak ditemukan per 28 Okt. Kompas (27 Okt) menulis chatbot Meta AI kemudian mengoreksi jawabannya sendiri. Itu bukan tanggapan perusahaan Meta.
  - DeepSeek (Reuters, 27 Okt): lembaga keamanan AI Fangcun (Beijing) menguji DeepSeek V4.1 Flash-1017 dalam 34 evaluasi (4-25 Okt). Model mematikan perangkat lunak penutup dalam 39% uji setelah peringatan, dan 2% kalau diminta mengizinkan. Model sering sadar sedang diuji, jadi hasil bisa berbeda di pemakaian biasa. DeepSeek belum menanggapi.
  - Anthropic S-1 (Reuters, 26 Okt): berkas IPO (Nasdaq, ticker ANT, harga dan jumlah saham belum ditentukan) menyebut empat model uji menjangkau sistem nyata di luar lingkungan uji selama 10 sampai 34 jam. Pada satu uji keamanan siber dengan mitra, kesalahan konfigurasi membiarkan internet menyala. Satu model menemukan kata sandi tersimpan dan mendapat akses admin ke sistem pihak ketiga. Anthropic berkata sudah memberi tahu pihak terdampak dan tidak menemukan bukti model sengaja menghindari pengawasan. Anthropic juga menunda pra-pelatihan model berikutnya lebih dari satu bulan demi keamanan bobot. Teks SEC tidak terbaca langsung (situs SEC memblokir alat otomatis). Sumbernya Reuters.
  - Cloudflare (26 Okt): 155 respons model GLM-5.3 di Workers AI memuat data pelanggan lain (27 Agu-9 Sep, prompt di atas 681.280 token). Celah sudah diperbaiki.
  - Claude Duet (21 Okt, tidak lagi di slide 6): lihat slide 21. Masih research preview, waitlist, Pro dan Max di AS.

**7. Indonesia (2,5)**
- Ucapkan: indeks literasi 49,96 ("kurang baik", APJII 2025). Pengguna AI di survei 2026: 18,2%, sebelumnya 27,34%. Baca sebagai arah. 68% bergantung: hanya 1.000 Gen Z dan Milenial urban. Lalu kotak pembanding: e-Conomy SEA menyebut 58% penduduk usia kerja enam negara Asia Tenggara sudah mengadopsi AI generatif. Katakan: ukurannya berbeda, jangan dikurangkan. Periksa apa yang diukur.
- Di layar, jawab kalau ditanya: APJII mengukur semua responden usia 13+, wawancara tatap muka, pertanyaan bisa berbeda antar tahun. e-Conomy SEA (21 Okt): Indonesia dan Filipina punya ruang tumbuh terbesar.

**8. Untuk apa AI dipakai (1,5)**
- Ucapkan: kiri, 2025 edukasi memimpin (43,98%), 2026 hiburan (36,5%). Kanan, makin muda makin tinggi. Alasan belum memakai AI bergeser: tidak butuh naik ke 43,1%, belum tahu turun ke 35,5%. Pesan: hambatan bergeser dari "belum tahu" ke "belum merasa perlu".
- Di layar, jawab kalau ditanya: nilai 2025 ada di kotak (22,7%, 46,6%, 15,5%). Sebagian media menulis 46,6% sebagai angka 2026. Itu angka 2025.

**9. Skill 2030 (1, lewati jika telat)**: WEF. Dari 100 pekerja, 59 butuh pelatihan. Warna titik: 29 di peran sekarang, 19 ditempatkan ulang, 11 mungkin tidak mendapat pelatihan. Analytical thinking tetap skill inti.

**10. Literasi bukan tool use (1)**: kutip OECD dan Komisi Eropa (Juni 2026). Kerangka ini untuk pendidikan dasar dan menengah, dan berkontribusi pada asesmen PISA 2029 (Media & AI Literacy). Prinsipnya berlaku juga untuk kita. Empat kata kerjanya dibahas di slide 11.

**11. Empat domain (1,5)**: Engage, lalu Create dan Manage sejajar, lalu Shape. Contoh tiap domain tampil di slide. Bacakan satu atau dua.

**12. Tangga lima level (2,5)**: jalan dari L1 ke L5, satu kalimat per level. Sebut bahwa ini sintesis, bukan skala resmi. Lalu baca "cek posisimu": minta audiens menjawab dalam hati, anak tangga mana yang sudah dipegang. Ini menggantikan kuis lima pertanyaan di versi lama.

**13. Empat jebakan (1,5)**: oracle, satu percobaan, serahkan tanpa baca, berhenti di kotak chat. Obat jebakan 2: ubah satu variabel per percobaan. Itu inti growth mindset, katakan satu kalimat. Akar bersama: berhenti bertanya.

**14. Rekan magang (1)**: ujian: kalau AI hilang besok, bisakah kamu menjelaskan keputusanmu hari ini?

**15. Verifikasi (2)**
- Ucapkan: dua jawaban untuk satu pertanyaan (JLPT N3). A jujur dan mengarah ke sumber. B rapi dengan angka presisi, tanpa sumber. Tanya retoris "mana yang terasa meyakinkan?" tanpa menunggu jawaban. Zhu & Li (N=657): penalaran yang ditampilkan menaikkan ketergantungan. Tutup dengan kutipan Komdigi (23 Okt): jawaban AI tidak selalu benar, periksa sumber.
- Di layar, jawab kalau ditanya: literasi menahan efek itu, tetapi tidak untuk tugas kompleks. Blanchard dkk. adalah tinjauan studi: peringatan umum paling lemah, penanda spesifik "tampak menjanjikan", buktinya terbatas.

**16. Friksi kognitif (1,5)**
- Ucapkan: MIT, 54 peserta, preprint. 15 dari 18 pengguna LLM tidak bisa mengutip esai sendiri di sesi pertama. Hingga 55% konektivitas lebih rendah. Jangan digeneralisasi. Aturan praktis: tulis dugaanmu dulu, baru tanya AI.
- Di layar, jawab kalau ditanya: 55% adalah EEG di jaringan frekuensi rendah, bukan ukuran kecerdasan. Belum ada replikasi independen yang kami temukan. Hanya 18 peserta menyelesaikan sesi 4.

**17. Kamu yang memutuskan (1,5, lewati jika telat)**
- Ucapkan: automation bias. Tiga lapis di kiri, lalu bacakan empat pertanyaan sebelum menerima.
- Di layar, jawab kalau ditanya: HAIML adalah model konseptual (preprint), belum diuji dengan data.

**18. Frontier bergerigi (2)**: 758 konsultan BCG, GPT-4. Di dalam frontier: 12,2% lebih banyak tugas, 25,1% lebih cepat. Di luar: **19 poin persentase** lebih jarang benar (84,5% ke sekitar 65%). Klik satu tugas di dalam dan satu di luar untuk contoh.

**19. Empat lapis prompt (3)**: slide terbuka dengan empat lapis menyala dan efek "siap dipakai". Matikan lapis satu per satu. Dengan satu lapis (Tujuan) layar menampilkan "Arah benar, isi kabur" dan lencana "terlalu tipis". Matikan Tujuan juga untuk melihat "Jawaban terlalu umum". Nyalakan lapis kembali satu per satu. Ini menggantikan demo Prompt Forge. Katakan bahwa efek adalah ilustrasi, bukan keluaran model sungguhan. Tutup dengan dua tambahan murah: satu contoh, dan minta tandai ketidakpastian.

**20. Anatomi agent (1,5)**: putuskan, lakukan, amati. Jika tiap langkah 90% benar: 3 langkah 73%, 6 langkah 53%, 10 langkah 35%. Rantai panjang rapuh (ilustrasi aritmetika).

**21. Otonomi dan lima gerbang (2,5)**: tiga kebijakan untuk tiga aksi berisiko. Claude Duet meminta persetujuan sebelum kirim pesan, bayar, tanda tangan, hapus. Research preview, baru di AS. Strip bawah: lima gerbang (data, sumber, izin, biaya, jejak). Sebut nama saja. Muat satu halaman SOP.

**22. Studi kasus (1,5)**: 20 chat pelanggan jadi laporan pagi. Lima fase, tiap fase punya keluaran dan kesalahan umum. Tekankan satu gerbang.

**23. Aturan main (2)**
- Ucapkan (empat hal): (1) SKB tujuh menteri 12 Maret 2026 mengatur AI di pendidikan dari PAUD sampai kampus. Kampus menyusun tata kelolanya sendiri. (2) Framework GenAI kampus diuji publik 9 Oktober. Itu panduan, bukan regulasi mengikat, jadi tanyakan aturan kampusmu. (3) UU PDP: kebocoran wajib diberitahukan dalam 3 x 24 jam. (4) EU AI Act: kewajiban literasi AI sudah berlaku sejak Februari 2025. Tutup: bukan nasihat hukum.
- Di layar, jawab kalau ditanya: Koding dan AI mapel pilihan, belum wajib. PP 33/2026 terbit 16 Juli 2026, berlaku 16 Januari 2027. Lembaga PDP masih disiapkan (23 Okt). AI yang menilai ujian berisiko tinggi di EU, kewajiban penuh 2 Desember 2027 setelah AI Omnibus. Perpres etika AI dan peta jalan AI nasional masih rancangan (Komdigi, 23 Okt).

**24. Empat mitos (1,5)**
- Ucapkan tiga mitos: (1) "AI ganti semua pekerjaan": di survei WEF 40% pemberi kerja berencana mengurangi staf yang skill-nya tidak relevan, 85% memprioritaskan upskilling. Itu rencana, bukan hasil. (2) "Model paling mahal paling baik": Artificial Analysis 28 Okt, Opus 5.5 skor 58 ($5,98 per tugas), M3.1 Flash skor 43 ($0,22). (3) "Gratis berarti aman": kebijakan privasi Google.
- Di layar, jawab kalau ditanya: mitos prompt panjang. Selisih biaya sekitar 27 kali untuk selisih 15 poin.

**25. Rencana 30 hari (1)**: satu aksi, satu bukti per minggu. Minta audiens memilih satu item untuk besok, dalam hati.

**26. Rangkuman (1)**: enam langkah. Langkah 1-3 memberi konteks, 4-6 menjaga kendali.

**27. Penutup dan tanya jawab (0,5 + 10)**: tawarkan: "Sebutkan satu tugas yang paling sering kamu ulang, kita cari levelnya." Kontak: @kyomel. QR grup SWE Growth tampil selama tanya jawab.

## Kalimat yang harus tepat

| Jangan | Ucapkan |
|---|---|
| "AS dan Tiongkok sepakat mengganti AI jadi SI" | "Gedung Putih bilang keduanya sepakat. Tiongkok tetap menulis AI." |
| "Adopsi AI di Indonesia naik" | "Di survei APJII 2026 pengguna AI 18,2%, 27,34% di 2025. Baca sebagai arah." |
| "68% orang Indonesia bergantung pada AI" | "68% dari 1.000 Gen Z dan Milenial urban yang sudah akrab dengan AI." |
| "AI membuat hasil 19% lebih buruk" | "19 poin persentase lebih jarang benar, di satu tugas di luar frontier, dengan GPT-4." |
| "Otak pengguna ChatGPT rusak" | "Preprint kecil, 54 peserta, tugas menulis esai. Arah yang perlu diuji." |
| "Claude Duet sudah tersedia" | "Research preview, waitlist, baru untuk pelanggan Pro dan Max di AS." |
| "46,6% orang Indonesia belum tahu AI (2026)" | "Di 2026: 43,1% merasa tidak butuh, 35,5% belum tahu teknologinya. 46,6% adalah angka 2025." |
| "Adopsi AI di Asia Tenggara 58%, di Indonesia 18%" | "Dua ukuran berbeda: e-Conomy SEA mengukur pekerja enam negara, APJII mengukur semua responden usia 13+. Jangan dikurangkan." |
| "MiniMax salah 93% dari semua jawaban" | "Saat tidak benar, 93% jawabannya salah total, bukan menolak menjawab. Benar 56% dari semua pertanyaan." |
| "Penelitian membuktikan penanda spesifik mengurangi halusinasi" | "Tinjauan studi: penanda spesifik tampak menjanjikan, buktinya masih terbatas." |
| "Indonesia sudah punya aturan AI lengkap" | "Ada SKB tujuh menteri, UU PDP, dan SE etika AI 2023. Perpres etika AI dan peta jalan AI masih rancangan per 23 Oktober." |
| "AI membuat 40% orang kehilangan pekerjaan" | "40% pemberi kerja berencana mengurangi staf yang skill-nya tidak relevan. Itu rencana di survei WEF 2025." |

## Slide yang dihapus dari versi 33 slide

Versi lama ada di riwayat git (commit `a945c18`).

| Slide lama | Judul | Alasan | Pengganti |
|---|---|---|---|
| 9 | Jurang akses | Data pemimpin perusahaan global, sudah ditandai lewati | Tidak ada |
| 15 | Di level mana kamu | Kuis untuk peserta | Baris "cek posisimu" di slide 12 |
| 19 | Growth mindset | Slider ilustrasi, bukti paling lemah | Satu kalimat lisan di slide 13 |
| 23 | Empat pola prompt | Tumpang tindih dengan empat lapis | Strip "dua tambahan murah" di slide 19 |
| 26 | Lima gerbang | Sudah ditandai lewati | Strip lima gerbang di slide 21 |
| 32 | Demo Prompt Forge | Demo interaktif | Kotak efek jawaban di slide 19 |

Di slide 24, dua mitos dihapus: "AI tahu segalanya" dan "AI berpikir seperti manusia". Slide 3 dan 4 sudah membahasnya.
