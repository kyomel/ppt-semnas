# PLAN - Deck Build

> **Catatan 24 Okt 2026.** Dokumen ini adalah rencana awal 33 slide. Deck sudah dipadatkan menjadi 27 slide untuk mode penyaji tanpa interaksi peserta: slide 9, 15, 19, 23, 26, dan 32 dihapus atau dilipat ke slide lain. Urutan terbaru ada di `src/slides/index.tsx`. Jadwal bicara ada di `docs/TALK-TRACK.md`.

## Konfigurasi

| Field | Nilai |
|---|---|
| `title` | Meningkatkan Literasi dan Mindset Pemahaman AI |
| `subtitle` | Dari Awam ke Advanced |
| `speaker` | Michael Stevan Lapandio |
| `event_name` | SEMNAS AMIKOM 2026 (Yogyakarta) |
| `event_date` | 2026-10-28 |
| `audience_persona` | Campuran: mahasiswa, dosen, praktisi, dan masyarakat umum. Sebagian sudah pakai ChatGPT, sebagian belum. Rentang literasi lebar, jadi deck harus masuk dari nol lalu naik cepat. |
| `subject_focus` | Literasi AI dan mindset memakai AI: apa itu AI, di mana posisi Indonesia, model mental yang benar, dan jalur dari awam ke advanced. |
| `talk_duration_minutes` | 60 |
| `content_slides` | 28 |

### Perhitungan jumlah slide

```
fixed_slide_overhead_minutes = 5
minutes_per_content_slide    = 2
content_slides = round((60 - 5) / 2) = round(27.5) = 28
clamp(28, 8, 30) = 28
total = 28 + 5 fixed = 33 slide
```

33 slide untuk 60 menit = ~1,8 menit per slide. Beberapa slide data dibuat cepat (45-60 detik), slide mindset dan demo dibuat lebih lama (2-3 menit). Angka ini adalah hasil rumus skill, bukan angka bulat yang dipilih manual.

---

## Sistem visual

### Palet - "warm paper + signal"

Terasa seperti deck konferensi editorial, bukan gradien ungu AI generik.

| Token | Light | Dark | Pakai untuk |
|---|---|---|---|
| `bg` | `#F7F3EC` | `#0B0A09` | latar utama |
| `bg-soft` | `#EFE9DE` | `#141210` | kartu, panel |
| `ink` | `#14110E` | `#F4EFE6` | teks utama |
| `ink-soft` | `#57504A` | `#A39A8E` | teks sekunder |
| `line` | `rgba(20,17,14,.12)` | `rgba(244,239,230,.14)` | garis, border |
| `accent` | `#D9481C` | `#FF6A3D` | angka penting, aksi, penekanan |
| `accent-2` | `#146B5A` | `#4FD6B4` | pembanding, status aman |
| `accent-3` | `#B08A1E` | `#E8C559` | peringatan, data netral |

### Tipografi

- Display: **Instrument Serif** (400 + italic) untuk judul dan angka besar. Memberi bobot editorial dan membedakan deck ini dari deck teknologi lain.
- Sans: **Geist** untuk body, label, UI.
- Mono: **Geist Mono** untuk angka, kode, label teknis.

### Motion

- Easing utama: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Spring: `{ stiffness: 260, damping: 30 }`.
- Reveal teks: per kata dengan stagger 18-28ms, blur 6px -> 0.
- `prefers-reduced-motion`: durasi dipotong, jarak diperkecil, blur dihilangkan. Motion tidak dimatikan.

### 3D

Satu wrapper canvas `SceneCanvas` dengan `dpr={[1,2]}`, `gl={{ antialias: true, powerPreference: "high-performance" }}`, tema-aware lighting. Semua scene procedural: titik, garis, torus, kotak. Tidak ada file model atau SVG ilustrasi.

---

## Slide by slide

Legenda: **[3D]** = scene React Three Fiber penuh, **[I]** = interaksi klik/drag/scroll, **[C]** = cursor-reactive.

### 01 - Intro `[3D] [C]`
- Konten: judul, subtitle, speaker, event, tanggal. Satu baris pembuka: "60 menit untuk pindah dari 'bisa pakai' ke 'paham'."
- 3D: bidang partikel 3D yang membentuk formasi cincin, kamera mengikuti pointer dengan parallax halus. Partikel bergeser saat kursor bergerak.
- 2D: judul muncul per kata dari blur. Garis aksen tumbuh.
- Interaksi: pointer menggeser kamera; tombol "Mulai" melompat ke slide 3.

### 02 - Overview `[I] [C]`
- Konten: 6 bagian agenda (Fondasi, Realita, Model Mental, Mindset, Skill, Aksi) dengan 28 slide konten terbagi.
- 2D: daftar agenda dengan index besar bergaya serif; hover menggeser item ke kanan dan menampilkan preview isi.
- Interaksi: klik item melompat ke slide pertama bagian itu. Hover menampilkan garis penghubung animasi.

### 03 - "AI itu mesin prediksi, bukan mesin tahu" `[3D] [I]`
- Konten: alur 4 langkah: token -> vektor -> transformer/attention -> prediksi token berikutnya, diulang. Analogi: autocomplete yang membaca seluruh konteks.
- 3D: deretan kubus token yang menyala satu per satu, lalu satu kubus "dipilih" dan berpindah ke depan. Kamera orbit ringan.
- Interaksi: drag untuk memutar scene; klik salah satu kubus untuk melihat penjelasan langkahnya.

### 04 - "Kenapa AI bisa salah dengan sangat yakin" `[I]`
- Konten: model dioptimalkan untuk kelanjutan yang plausible, bukan kebenaran. Tiga pemicu halusinasi: prompt ambigu, tidak ada akses sumber, data latih tidak mencakup. Data: MiniMax M3.1 Flash terukur 93% hallucination rate di Artificial Analysis (dengan catatan definisi ukurannya tidak dipublikasikan).
- 2D: tiga kartu pemicu dengan ikon; satu "confidence meter" interaktif yang bergerak dari "yakin" ke "benar" dan tidak berkorelasi.
- Interaksi: slider menggeser antara "yakin" dan "benar" untuk menunjukkan keduanya tidak sejalan.

### 05 - "Peta istilah: 7 kata yang harus kamu tahu" `[I]`
- Konten: LLM, token, konteks, halusinasi, RAG, fine-tuning, agent. Masing-masing satu kalimat awam + satu kalimat teknis.
- 2D: kartu flip. Sisi depan istilah, sisi belakang definisi.
- Interaksi: klik untuk membalik; "buka semua" untuk mode cepat.

### 06 - "12 bulan yang mengubah segalanya" `[3D] [I]`
- Konten: timeline Okt 2025 -> Okt 2026: GPT-6.1 masuk Google Cloud (21 Okt 2026), Claude Duet agent dengan VM sendiri (21 Okt 2026), MiniMax M3.1 Flash $0,15/1M token (19 Okt 2026), Mercury 3 diffusion 1.068 tok/s (19 Okt 2026), DeepSeek DeepInfer open source (20 Okt 2026), MemT 1.0 memori 3,99x lebih cepat (22 Okt 2026), Canva Craft (22 Okt 2026).
- 3D: timeline sebagai rel 3D dengan node bercahaya; kamera bergerak sepanjang rel mengikuti pilihan.
- Interaksi: klik node untuk memfokuskan kamera dan membuka detail.

### 07 - "Indonesia: adopsi naik, literasi tertinggal" `[3D] [I]`
- Konten: indeks literasi AI 49,96 ("kurang baik", APJII 2025); 27,34% memakai AI, naik dari 24,73%; 97% menganggap AI penting dan 68% mengaku bergantung (Indonesia AI Report 2025).
- 3D: tiga batang 3D yang tumbuh, dengan garis ambang 50. Klik batang untuk melihat sumber.
- Interaksi: hover mengangkat batang; klik menampilkan catatan sumber dan peringatan bahwa 49,96 dan 27,34% dari APJII 2025.

### 08 - "Untuk apa kita benar-benar memakai AI" `[I]`
- Konten: APJII 2026 (n=8.700, 38 provinsi, MoE ±1,1%): hiburan 36,5%, edukasi & riset 30,2%, kerja/produktivitas 26,9%, asisten suara 6,4%. Pengguna per generasi: Gen Z 29,4%, Milenial 16,7%, Gen X 7,5%, Boomer 0,8%.
- 2D: bar horizontal interaktif dengan dua mode tampilan (tujuan / generasi). Angka menghitung naik saat masuk.
- Interaksi: toggle mode; hover menyorot satu kategori dan meredupkan yang lain.

### 09 - "Jurang akses: 60% punya, kurang dari 60% pakai" `[I]`
- Konten: Deloitte 2026 (n=3.235, 24 negara): akses pekerja naik 50% dalam setahun, dari <40% ke ~60%; hanya 25% sudah memindahkan 40%+ eksperimen ke produksi; dari yang punya akses, <60% memakainya harian.
- 2D: dua cincin progres bersarang. Satu untuk akses, satu untuk pemakaian harian.
- Interaksi: hover pada cincin menampilkan definisi metrik dan tahun survei.

### 10 - "Skill 2030: 39% berubah" `[I]`
- Konten: WEF Future of Jobs 2025: 39% skill set berubah/usang 2025-2030; dari 100 pekerja, 59 butuh pelatihan, 11 kemungkinan tidak dapat; 63% perusahaan menyebut skill gap sebagai hambatan terbesar; AI & big data skill paling cepat tumbuh, analytical thinking paling dicari (7 dari 10).
- 2D: visual "100 orang" - 100 titik kecil, 59 menyala. Angka besar 39% dengan counter.
- Interaksi: hover pada kelompok titik menjelaskan artinya; klik untuk memisahkan 29/19/11.

### 11 - "Literasi AI bukan tool use" `[I]`
- Konten: definisi OECD/EC AILit (Juni 2026): pengetahuan teknis, skill yang tahan lama, dan sikap siap masa depan; kemampuan engage, create, manage, shape AI sambil menilai manfaat, risiko, dan implikasi etis. Kutipan kunci: "AI literacy is different from AI tool use." Framework ini jadi dasar PISA 2029 MAIL.
- 2D: dua kolom kontras "Bisa pakai tool" vs "Literasi AI". Kutipan besar di tengah dengan tanda petik serif.
- Interaksi: hover pada kutipan menampilkan sitasi lengkap.

### 12 - "Empat domain AILit" `[3D] [I]`
- Konten: Engage with AI, Create with AI, Manage AI, Shape AI. Tiap domain: satu kalimat + contoh konkret level awam.
- 3D: empat simpul di ruang 3D, tersusun bertingkat, dengan garis penghubung. Kamera orbit; simpul aktif membesar.
- Interaksi: klik simpul untuk memfokuskan kamera dan membuka panel detail.

### 13 - "Tangga lima level: Awam ke Advanced" `[3D] [I]`
- Konten: L1 Penonton, L2 Operator, L3 Power User, L4 Builder, L5 Shaper. Tiap level: ciri perilaku, satu keterampilan kunci, satu bukti naik level.
- 3D: lima blok tangga 3D. Klik blok untuk menyorot dan menaikkan kamera.
- Interaksi: klik atau panah untuk naik/turun level; panel kanan berubah.

### 14 - "Empat jebakan yang menahan orang di level awam" `[I]`
- Konten: (1) menganggap AI oracle, (2) menilai AI dari satu percobaan, (3) menyerahkan seluruh tugas tanpa membaca, (4) berhenti di chat dan tidak pernah membangun alur.
- 2D: empat kartu dengan ikon dan "gejala" vs "obat". Hover mengangkat kartu dan menampilkan obat.
- Interaksi: klik kartu untuk membuka contoh nyata satu kalimat.

### 15 - "Di level mana kamu sekarang?" `[I]`
- Konten: self-check 5 pertanyaan, masing-masing memetakan ke level. Hasil memberi satu langkah berikutnya.
- 2D: kuis kecil dengan progress dan hasil animasi.
- Interaksi: klik jawaban; hasil muncul dengan rekomendasi level dan aksi.

### 16 - "Mindset 1: Rekan magang, bukan oracle" `[C]`
- Konten: AI itu seperti rekan magang yang sangat cepat membaca tapi belum tahu konteks organisasimu. Kamu tetap yang menetapkan standar dan menandatangani hasil.
- 2D: dua panel "Oracle" vs "Rekan magang" dengan konsekuensi berbeda. Parallax pada lapisan teks.
- Interaksi: hover pada panel menggeser dan mengubah bobot visual.

### 17 - "Mindset 2: Verifikasi adalah pekerjaan" `[I]`
- Konten: Zhu & Li, Telematics and Informatics, Okt 2026, N=657: menampilkan reasoning AI justru MENAIKKAN over-reliance karena dibaca sebagai sinyal kompetensi. AI literacy menahan efek itu untuk reasoning visibility, tapi tidak untuk task complexity. Blanchard dkk., Current Opinion in Psychology, Sep 2026: peringatan umum soal halusinasi efeknya paling lemah; cue spesifik soal di mana AI gagal lebih menjanjikan.
- 2D: eksperimen kecil interaktif: dua jawaban AI, satu dengan "reasoning" panjang. Pengguna memilih yang dipercaya. Setelah memilih, terungkap bahwa reasoning panjang bukan jaminan benar.
- Interaksi: pilih salah satu; hasil dan penjelasan muncul.

### 18 - "Mindset 3: Friksi kognitif itu fitur" `[I]`
- Konten: MIT Media Lab 2025, n=54, 4 bulan: kelompok LLM punya konektivitas otak hingga 55% lebih rendah; 83% tidak bisa mengutip kalimat dari esai yang baru mereka tulis. Google Pedagogical Framework (Sep 2026): AI cenderung menyelesaikan tugas segera dan melewati friksi kognitif yang penting untuk konstruksi pengetahuan.
- 2D: grafik penurunan konektivitas 3 kelompok (brain-only, search, LLM) yang tergambar saat scroll/hover.
- Interaksi: hover pada tiap batang menampilkan metode dan batasan studi (n=54, tugas esai).

### 19 - "Mindset 4: Growth mindset, bukan bakat" `[I]`
- Konten: CAFE-AI (Cogent Education, Apr 2026), kuasi-eksperimen n=152: model yang menggabungkan pedagogi + AI signifikan lebih baik (p<0,05) untuk AI literacy DAN growth mindset dibanding e-learning konvensional. WEF: curiosity & lifelong learning naik kepentingannya.
- 2D: kurva belajar dengan dua jalur, "fixed" dan "growth", yang bisa di-scrub.
- Interaksi: slider tahun/minggu menggeser kedua kurva.

### 20 - "Mindset 5: Kamu yang memutuskan" `[I]`
- Konten: HAIML (2026): tiga lapis - Experiential AI Use, Metacognitive Reflection, Ethical Decision-Making. Automation bias sebagai risiko inti. Empat pertanyaan refleksi sebelum menerima output AI.
- 2D: tiga lapis bertumpuk yang terbuka satu per satu; daftar empat pertanyaan refleksi.
- Interaksi: klik tiap lapis untuk membuka isinya.

### 21 - "Frontier bergerigi: AI tidak rata" `[I]`
- Konten: Dell'Acqua dkk., Organization Science, Mar 2026, 758 knowledge worker: 18 tugas di dalam frontier -> 12,2% lebih banyak tugas selesai, 25,1% lebih cepat, kualitas lebih baik. Satu tugas manajerial di luar frontier -> 19% LEBIH KECIL kemungkinan benar.
- 2D: peta bergerigi interaktif. Area "dalam frontier" dan "luar frontier". Pengguna menjatuhkan 6 jenis tugas ke peta.
- Interaksi: drag kartu tugas ke peta; umpan balik muncul.

### 22 - "Anatomi permintaan yang baik: 4 lapis" `[I]`
- Konten: Tujuan, Konteks, Batasan, Format. Diambil dari praktik context engineering (Anthropic, Sep 2025): cari set token terkecil dengan sinyal tertinggi; prompt harus di altitude yang tepat, tidak kaku dan tidak terlalu umum.
- 2D: empat lapis yang menyusun satu blok prompt secara live.
- Interaksi: toggle tiap lapis on/off; blok prompt dan skor kelengkapan berubah.

### 23 - "Pola prompt yang tahan banting" `[I]`
- Konten: empat pola: (1) nyatakan peran + audiens, (2) beri contoh satu, (3) tetapkan format keluaran, (4) minta AI menandai ketidakpastian. Prinsip Anthropic: jelaskan persis apa yang kamu ingin lihat.
- 2D: tab kode dengan highlight Shiki; tab berganti dengan animasi garis.
- Interaksi: klik tab untuk melihat pola; tombol salin.

### 24 - "Dari chat ke sistem: anatomi agent" `[3D] [I]`
- Konten: loop decide -> act -> observe -> decide; empat dimensi otonomi (initiation, horizon length, decision authority, self-modification); peringatan: agent rapuh di horizon panjang, error kecil beruntun.
- 3D: graf simpul 3D yang berdenyut mengikuti loop; partikel bergerak sepanjang edge.
- Interaksi: klik simpul untuk melihat perannya; slider "horizon" menambah langkah dan memperlihatkan peluang gagal menumpuk.

### 25 - "Otonomi butuh gerbang" `[I]`
- Konten: Claude Duet (21 Okt 2026) berjalan di VM sendiri dengan browser dan meminta persetujuan sebelum pembayaran atau penghapusan; Claude Marketplace 6.000+ connector. Pelajaran: otonomi tinggi hanya aman dengan gerbang eksplisit.
- 2D: simulasi agent dengan tiga aksi berisiko. Pengguna memilih: izinkan semua, izinkan dengan gerbang, atau tolak. Konsekuensi ditampilkan.
- Interaksi: pilih kebijakan; simulasi berjalan dan menampilkan hasil.

### 26 - "Alur kerja aman: 5 gerbang" `[I]`
- Konten: Gerbang data (jangan masukkan rahasia), gerbang sumber (cek klaim), gerbang izin (aksi berisiko butuh approval), gerbang biaya (batas token/waktu), gerbang jejak (log apa yang dilakukan).
- 2D: lima gerbang berurutan dengan status. Satu studi kasus melewati kelima gerbang.
- Interaksi: klik gerbang untuk melihat checklist dan contoh kegagalan.

### 27 - "Studi kasus: 60 menit bikin asisten" `[I]`
- Konten: satu tugas repetitif -> satu asisten. Langkah: pilih tugas, tulis instruksi, uji 5 kasus, tambahkan gerbang, jadwalkan. Contoh: merangkum 20 chat pelanggan jadi laporan harian.
- 2D: timeline 60 menit dengan 5 fase; tiap fase punya output konkret.
- Interaksi: klik fase untuk melihat output dan kesalahan umum.

### 28 - "Aturan main: kebijakan dan etika" `[I]`
- Konten: SKB tujuh menteri 12 Mar 2026 (pedoman AI di pendidikan PAUD-perguruan tinggi, mata pelajaran Koding & AI); UU PDP sebagai batas data pribadi; EU AI Act sebagai rujukan klasifikasi risiko.
- 2D: tiga kolom kebijakan dengan garis waktu dan label yurisdiksi.
- Interaksi: hover pada kolom menampilkan implikasi praktis untuk individu.

### 29 - "Mitos vs fakta" `[I]`
- Konten: 6 pasang. Mitos: "AI tahu segalanya", "AI akan ganti semua pekerjaan", "prompt panjang selalu lebih baik", "AI berpikir seperti manusia", "model lebih besar selalu lebih baik", "kalau gratis berarti aman". Fakta dari sumber.
- 2D: kartu flip 2 kolom.
- Interaksi: klik untuk membalik; skor mitos yang berhasil dibalik.

### 30 - "Rencana 30 hari" `[I]`
- Konten: Minggu 1 pahami, minggu 2 pakai harian, minggu 3 bangun satu alur, minggu 4 pasang gerbang dan ukur. Tiap minggu: satu aksi, satu bukti.
- 2D: checklist interaktif dengan progress yang tersimpan di state.
- Interaksi: centang item; progress bar dan pesan akhir berubah.

### 31 - Recap `[3D] [I]`
- Konten: alur praktik terbaik 6 simpul: Tentukan tujuan -> Kumpulkan konteks -> Minta dengan format -> Verifikasi klaim -> Simpan yang bekerja -> Otomatiskan yang berulang.
- 3D: enam simpul di ruang 3D dengan edge yang menggambar dirinya. Kamera orbit.
- Interaksi: klik simpul untuk fokus; tombol putar ulang animasi edge.

### 32 - Demo: Prompt Forge `[3D] [I] [C]`
- Konten: pembangun prompt interaktif. Pengguna memilih peran, tujuan, konteks, batasan, format. Prompt tersusun real-time. Skor kelengkapan naik. Tombol "Jalankan" menampilkan simulasi keluaran yang berubah sesuai pilihan.
- 3D: inti bercahaya di tengah yang menyala makin terang saat lapisan konteks ditambahkan. Kamera reaktif terhadap pointer.
- Interaksi: pilih opsi, lihat prompt dan skor berubah, jalankan simulasi. Ini puncak visual deck.

### 33 - Q&A `[3D] [C]`
- Konten: "Pertanyaan?" plus handle pembicara dan ajakan kontak. Satu baris penutup.
- 3D: gradien mesh ambient bergerak lambat, partikel halus.
- Interaksi: pointer menggeser lapisan gradien.

---

## Ringkasan cakupan 3D

Slide dengan scene 3D penuh: **01, 03, 06, 07, 12, 13, 24, 31, 32, 33** (10 slide).
Minimum yang diminta skill: 5 (intro, recap, demo + 2 konten). Terpenuhi dengan margin.

## Ikon

Semua dari `lucide-react`. Pemetaan utama:

| Slide | Ikon |
|---|---|
| 03 | `Binary`, `Boxes`, `Network`, `ArrowRight` |
| 04 | `TriangleAlert`, `Fingerprint`, `DatabaseZap` |
| 05 | `BookOpen`, `Layers`, `Wrench`, `Bot` |
| 07 | `ChartNoAxesColumn`, `TrendingUp`, `Gauge` |
| 08 | `Clapperboard`, `GraduationCap`, `Briefcase`, `Mic` |
| 10 | `Users`, `TrendingUp`, `CircleAlert` |
| 12 | `Compass`, `Palette`, `SlidersHorizontal`, `Shapes` |
| 13 | `Footprints`, `MousePointerClick`, `Zap`, `Hammer`, `Crown` |
| 14 | `EyeOff`, `FlaskConical`, `ClipboardX`, `MessageSquareOff` |
| 16 | `UserRoundCheck`, `Sparkles` |
| 17 | `ShieldCheck`, `ScanSearch` |
| 18 | `Brain`, `Activity` |
| 19 | `Sprout`, `LineChart` |
| 20 | `Scale`, `Compass` |
| 21 | `Mountain`, `Map` |
| 22 | `Target`, `Library`, `Ruler`, `LayoutTemplate` |
| 24 | `Workflow`, `Wrench`, `MemoryStick`, `GitBranch` |
| 25 | `ShieldAlert`, `LockKeyhole`, `Wallet` |
| 26 | `DoorOpen`, `Database`, `FileCheck2`, `KeyRound`, `Receipt`, `ScrollText` |
| 28 | `Landmark`, `Shield`, `Globe` |
| 30 | `CalendarCheck`, `CircleCheck` |

## Ilustrasi

Tidak ada ilustrasi pihak ketiga. Visual dibangun dari tipografi, bentuk CSS/Tailwind, ikon lucide, dan geometri prosedural di R3F. Ini memenuhi aturan "no custom illustrative SVG assets" sekaligus menjaga konsistensi gaya.

## Struktur file

```
src/
  app/            layout, page, globals.css, robots.ts
  components/
    deck/         SlideDeck, SlideShell, NavigationBar, ProgressBar,
                  ThumbnailOverview, ThemeToggle, SlideCounter,
                  FullscreenButton, HelpOverlay
    motion/       Reveal, SplitText, Stagger, Counter, TiltCard,
                  Magnetic, CursorGlow
    three/        SceneCanvas, ParticleField, TokenCubes, TimelineRail,
                  Bars3D, DomainOrbit, StairBlocks, AgentGraph, FlowGraph,
                  ForgeCore, AmbientMesh
    ui/           Card, Badge, Stat, CodeBlock, FlipCard, Slider, Toggle
  slides/         act-0-opening.tsx ... act-6-closing.tsx
  config/         deck.ts (metadata + registry), theme.ts (palette, motion)
  lib/            cn.ts, use-slide-nav.ts
docs/             SOURCE-NOTES.md, PLAN.md
```

## Verifikasi

1. `bun run build` bersih.
2. `bun run lint` bersih.
3. Buka tiap slide di browser, tangkap layar light dan dark.
4. Uji keyboard: panah, spasi, Home, End, F, Esc, angka + Enter.
5. Uji deep link `#/slide/12`.
6. Uji thumbnail overview.
7. Uji `prefers-reduced-motion`.
8. Cek console bersih.
