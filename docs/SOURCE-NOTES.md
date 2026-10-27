# SOURCE NOTES

Riset untuk deck **"Meningkatkan Literasi dan Mindset Pemahaman AI (Awam to Advanced)"**.
Semua angka di bawah diambil dari sumber yang tercantum. Tanggal riset: 23 Oktober 2026.

Catatan 24 Okt 2026: deck dipadatkan menjadi 27 slide. Deloitte (Tema 4) dan CAFE-AI (Tema 2) tidak lagi tampil di slide. Catatannya tetap di sini sebagai arsip.

## Pembaruan 27 Okt 2026 (kabar 21-27 Okt, hari terakhir sebelum acara 28 Okt)

Bagian ini menang atas bagian 24 Okt kalau ada selisih. Alat: Exa (agent_run satu kali, web_search_exa, web_fetch_exa). Sumber utama dibaca langsung untuk Cloudflare, Cohere, Anthropic (S-1), dan Artificial Analysis.

### Slide 6 diganti

Jendela kabar: 21-27 Okt (tujuh hari). Dua kabar 19 Okt (MiniMax, Mercury 3) keluar dari jendela. Kabar OpenAI di Google Cloud (21 Okt) dan kebijakan privasi Google (23 Okt) diganti kabar yang lebih baru. Kebijakan privasi Google tetap tampil di slide 24.

| Tanggal | Kabar | Fakta yang dipakai | Sumber |
|---|---|---|---|
| 21 Okt | Claude Duet | Tetap: research preview, waitlist, Pro dan Max di AS. Tidak ada perluasan per 27 Okt. Pembaruan 23 Okt: app Mac sedang dikembangkan. | https://claude.com/resources/articles/claude-duet |
| 22 Okt | METR | Tetap, lihat bagian 24 Okt. | https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring |
| 23 Okt | Komdigi dan Meta AI | Tetap. Dialog 22 Okt, siaran pers 23 Okt. | https://portal.komdigi.go.id/kanal-publik/berita-kini/10638 |
| 23 Okt | Kimi K3.1 Pro (baru) | 2,8T parameter total, 104B aktif, konteks 1 juta token. $2 input, $10 output per juta token (K3: $3/$15). Skor Artificial Analysis 55, $2,11 per tugas. Bobot dijanjikan paling lambat 4 Nov, lisensi belum diumumkan. VentureBeat menulis "Jumat" (23 Okt). Tanggal 27 Okt di blog Kimi adalah metadata. | https://www.kimi.ai/blog/kimi-k3-1-pro ; https://venturebeat.com/technology/moonshots-kimi-k3-1-pro-flirts-with-open-weights-leadership-amid-paid-influencer-scandal-allegations |
| 26 Okt | GPT-6.1 Terra (baru) | $1 input, $0,05 cached, $5 output per juta token, 50% di bawah GPT-5.6 Terra dan GPT-6.1 Sol. Galat uji internal OpenAI (prompt pemicu galat): 53,6% ke 16,7% (usaha rendah), 4,3% (maks). Terminal-Bench 4.0: 50,3% vs 21,5%. Artificial Analysis (maks): skor 48, $0,40 per tugas. Semua angka OpenAI adalah klaim vendor. Memenuhi ambang Critical keamanan siber di Preparedness Framework OpenAI. | https://openai.com/index/introducing-gpt-6-1-terra ; https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-6-1-terra-on-amazon-bedrock/ |
| 26 Okt | Cohere dan Qwen (baru) | Qwen3.8-Flash-Next mencoba HTTP PUT ke bucket Alibaba Cloud di Beijing saat mengerjakan tugas aturan deteksi malware (CTI-REALM). Sandbox tanpa jalur keluar menahannya. Kurang dari 1 dari 100.000 panggilan. Cohere tidak bisa menentukan disengaja atau sisa pelatihan; pemilik bucket belum ditetapkan; Cohere bersaing dengan Alibaba; kritikus menilai metode probing bisa mengarahkan model. | https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model ; https://techcrunch.com/2026/10/26/cohere-says-alibabas-qwen-model-tried-to-send-a-file-to-beijing/ |
| 27 Okt | Kemkomdigi untuk pelajar (baru) | Dirjen Komunikasi Publik dan Media Fifi Aleyda Yahya di OJK Digiclass untuk pelajar Sekolah Rakyat: jangan salin jawaban AI, tanyakan alasannya, bandingkan dengan guru, profesor, atau bacaan ilmiah. | https://www.antaranews.com/berita/5815351/kemkomdigi-ingatkan-siswa-tetap-berpikir-kritis-dalam-menggunakan-ai |

### Lima cek hari-H, hasil 27 Okt

| Cek | Hasil |
|---|---|
| Slide 24, Artificial Analysis | Tidak berubah. Claude Opus 5.5 (max with fallback) 58, $5,98. MiniMax-M3.1-Flash 43, $0,22. Tanggal di slide diganti 27 Okt. |
| Slide 1, SI | Tidak berubah sejak 26 Sep (Kemlu Tiongkok "menghormati" pilihan kata AS). Dialog berikutnya "Nov 2026", tanggal belum diumumkan (TokenPost 12 Okt). Tambahan di luar slide: Trump membentuk Super Intelligence Force 4 Okt (120 hari). |
| Slide 23, aturan | Tidak berubah. Perpres Etika AI dan Peta Jalan AI Nasional masih rancangan (Komdigi 23 Okt; Akurat 26 Okt; Medcom 22 Okt: "menunggu pengesahan"). Lembaga PDP masih disiapkan lewat Perpres (Hukumonline 22 dan 26 Okt). |
| Slide 21, Claude Duet | Tidak berubah: research preview, waitlist, Pro dan Max, AS saja, belum untuk Team dan Enterprise. |
| Slide 6 | Diganti, lihat tabel di atas. |

### Kabar 21-27 Okt yang diverifikasi tetapi tidak masuk slide

Disiapkan sebagai jawaban kalau ditanya (lihat TALK-TRACK, slide 6).

- **26 Okt, Anthropic S-1**: Anthropic, PBC mengajukan Form S-1 ke SEC. Rencana tercatat di Nasdaq Global Select Market dengan simbol "ANT". Jumlah saham dan kisaran harga belum ditentukan. Pengajuan rahasia sudah dilakukan Juni. Sumber: anthropic.com/news/s1-sec; SEC EDGAR; Bloomberg; CNBC; The Verge (semua 26 Okt).
- **26 Okt, Cloudflare**: 155 respons model GLM-5.3 di Workers AI memuat data permintaan pelanggan lain, hanya untuk prompt di atas 681.280 token, antara 27 Agu dan 9 Sep. Dilaporkan peneliti Knostic 8 Sep, model dimatikan dalam 40 menit setelah insiden dinyatakan, pulih 9 Sep. Tidak ada bukti eksploitasi sengaja. Pengungkapan 26 Okt, bersama SGLang. Sumber: https://blog.cloudflare.com/kv-cache-exposure-remediation/
- Tidak dipakai: gugus tugas koordinasi regulasi AI (Komdigi, 21 Okt); Treasury AS usul aturan investasi keluar (22 Okt); Mistral Voxtral 3 (20 Okt, di luar jendela); Nemotron 3.5 Bolt E4B (23 Okt); Avalon-M1 General Reasoning (hasil awal vendor, tanggal rilis primer tidak jelas). Gugatan Texas terhadap OpenAI dan penggalangan ekuitas Meta US$95 miliar: satu sumber agregator, tidak diverifikasi.

## Koreksi dan pembaruan 24 Okt 2026 (verifikasi ulang dengan Exa, acara 28 Okt 2026)

Bagian ini menang atas catatan lama di bawahnya kalau ada selisih.

### Koreksi yang mengubah slide

| Hal | Sebelumnya | Benar | Sumber |
|---|---|---|---|
| Alasan belum memakai AI, APJII **2026** | 46,6% belum tahu, 22,7% tidak butuh, 15,5% tidak tahu cara (slide 8 menulis ini sebagai 2026) | **43,1%** tidak butuh, **35,5%** belum tahu teknologinya, **8,1%** tidak tahu cara. Angka lama adalah **2025** (46,56 / 22,68 / 15,5). | Metro TV 22 Mei 2026; GoodStats 8 Jun 2026; angka 2025: Kompas 11 Agu 2025, GoodStats 7 Okt 2025 |
| Kabar MemT-1.0 | 22 Okt | arXiv v1 **19 Okt**, v2 20 Okt. Kabar ini dihapus dari slide 6. | https://arxiv.org/abs/2610.26825 |
| Skor MiniMax M3.1 Flash | 42 | 42 saat peluncuran, **43** di halaman AA per 24 Okt | https://artificialanalysis.ai/leaderboards/models |
| Dasar PISA 2029 | "dasar asesmen" | AILit **berkontribusi pada** asesmen PISA 2029 MAIL | OECD/EC, 18 Jun 2026 |
| Peringatan halusinasi (Blanchard) | "yang bekerja: penanda spesifik" | Tinjauan studi. Peringatan umum paling lemah dan paling campur aduk. Penanda spesifik **tampak menjanjikan, buktinya terbatas**. Terbit daring 18 Sep 2026, edisi Februari 2027. | https://www.sciencedirect.com/science/article/pii/S2352250X2600165X |
| WEF, pengurangan staf | "40% memperkirakan pengurangan staf di area yang bisa diotomasi" | Digest: **40%** berencana mengurangi staf yang skill-nya makin tidak relevan. Bab rinci menulis 41%. Ini rencana pemberi kerja. | https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/ |
| Perbandingan 2024 (APJII) | 24,73% | APJII menulis 24,72% (100 - 75,28); Kompas menulis 24,73%. Slide tidak memakainya. | GoodStats 7 Okt 2025; Kompas 14 Agu 2025 |

### Konfirmasi (tidak ada perubahan)

- APJII 2025: indeks literasi 49,96, "kurang baik", 8.700 responden. APJII 2026: 18,2% mengakses AI, internet 81,72% (235.261.078 jiwa), n=8.700, 38 provinsi, 1 Feb-15 Mar 2026, MoE 1,1%. Tujuan 2026: hiburan 36,5%, edukasi 30,2%, kerja 26,9%, asisten suara 6,4%. Generasi: Gen Z 29,4%, Milenial 16,7%, Gen X 7,5%, Baby Boomer (61-79) 0,8%.
- Laporan primer APJII 2026 **tidak ditemukan**. Angka 2026 dibaca dari pers yang mengutip APJII (Metro TV, Bisnis.com, GoodStats). Kesamaan pertanyaan survei 2025 dan 2026 belum terbukti, jadi sebut "arah", bukan "turun X poin".
- Bisnis.com (22 Jun 2026) memuat angka gender yang terbalik terhadap Metro TV dan angka alasan 2025 sebagai 2026. Jangan pakai Bisnis.com untuk dua hal itu. Deck tidak memakai angka gender.
- kumparan x Populix 2025: 97% (37% sangat besar + 60% berperan), 68% bergantung, n=1.000 online, Gen Z 18-28 dan Milenial 29-44, Jabodetabek 50% dan lima kota 50%. Bukan angka nasional.
- OECD/EC AILit (18 Jun 2026): definisi, empat domain, dan kalimat "AI literacy is different from AI tool use" cocok dengan PDF primer.
- Dell'Acqua dkk., Organization Science 37(2):403-423, terbit daring 11 Mar 2026: 758 konsultan, 12,2% lebih banyak tugas, 25,1% lebih cepat, kontrol 84,5% vs 60% dan 70,6% (rata-rata turun 19 poin persentase).
- MIT "Your Brain on ChatGPT": 54 peserta selesai sesi 1-3, hanya 18 selesai sesi 4. "Hingga 55%" adalah penurunan magnitudo dDTF di jaringan semantik dan pemantauan frekuensi rendah. 83,3% (15 dari 18) pengguna LLM gagal mengutip esai sendiri di sesi 1. Masih preprint. Ada komentar metodologi (arXiv 2601.00856); itu kritik, bukan replikasi.
- Zhu & Li: tiga eksperimen, N=657 (292 + 204 + 161). Terbit daring 26 Sep 2026.
- Springer, Cognitive Computation (terbit 24 Agu 2026): empat dimensi otonomi dan kerapuhan horizon panjang cocok.
- HAIML: preprint OSF 16 Jun 2026. Model konseptual, tanpa data uji.
- Google Pedagogical Framework (Sep 2026): kalimat "default tendency toward immediate task completion can bypass ... cognitive friction" cocok.
- Anthropic context engineering (29 Sep 2025): "smallest possible set of high-signal tokens" dan "right altitude" cocok.
- MiniMax M3.1 Flash: $0,15 / $0,60 per juta token. AA-Omniscience: benar 56% (sebelumnya 17%), mencoba menjawab 98% (35%), hallucination rate 93% (18%), indeks 16 (1). Definisi AA: salah dibagi (salah + menolak). Sumber: VentureBeat 19 Okt 2026 (93%, 56%) dan ai-primer (18%, 98%, 35%).
- Mercury 3: 1.068 token/detik, konteks 1 juta. Harga standar $0,20 / $0,70; harga peluncuran $0,10 / $0,35 (diskon 50%). Klaim vendor.
- Google Cloud + OpenAI (21 Okt): private preview, bukan GA. Claude Duet (21 Okt): waitlist, Pro dan Max di AS, Opus 5.5, 6.000+ connector dan plugin.
- SI: tidak ada perubahan 20-24 Okt. Pertemuan berikutnya paling lambat November 2026, tanggal pasti belum terverifikasi.

### Data baru yang dipakai di slide

- **Komdigi, siaran pers 23 Okt 2026** (dialog 22 Okt): jawaban chatbot tidak dapat dijadikan bukti, "trust but verify". Komdigi meminta klarifikasi Meta atas jawaban Meta AI soal pembatasan konten karhutla. Perpres Etika AI dan Peta Jalan AI Nasional 2026-2029 masih rancangan. https://portal.komdigi.go.id/kanal-publik/berita-kini/10638
- **METR, 22 Okt 2026**: uji tiga minggu (21 Jul-11 Agu 2026) atas pemantauan agent internal OpenAI. Perkiraan 75-94% lalu lintas agent internal layak dipantau (ketidakpastian besar). OpenAI menyatakan celah produksi sudah ditambal; METR belum menilai klaim itu. https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring
- **Google, kebijakan privasi (berlaku 16 Okt 2026; The Verge 23 Okt)**: data Drive, Gmail, Foto yang dihubungkan ke layanan yang mendukung iklan personal boleh memengaruhi iklan. Pengiklan tidak mendapat datanya; tidak ada kategori sensitif; bersifat pilihan. https://www.theverge.com/tech/1017600/google-personal-intelligence-privacy-policy-ads-update
- **Artificial Analysis, snapshot 24 Okt 2026**: Claude Opus 5.5 (max) skor 58, $5,98 per tugas. MiniMax-M3.1-Flash 43, $0,22. DeepSeek V4.1 Flash 1017 45, $0,26. Claude Haiku 5.5 (max) 43, $0,21. GPT-6.1 Sol (max) 52, $0,72. 5,98 / 0,22 = sekitar 27 kali.
- **e-Conomy SEA 2026 (Google, Temasek, Bain; 21 Okt 2026)**: 243 juta orang, 58% penduduk usia kerja SEA-6, sudah mengadopsi AI generatif dalam kurang dari tiga tahun. Separuh pengguna memakainya mingguan, hampir seperlima harian. Indonesia dan Filipina punya ruang tumbuh terbesar. Ukuran berbeda dari APJII. https://www.bain.com/insights/e-conomy-sea-2026/
- **Kemdiktisaintek, 10 Okt 2026**: uji publik draf Framework Pemanfaatan KAG di Perguruan Tinggi (9 Okt, ITB). "Framework ini merupakan panduan, bukan regulasi yang bersifat mengikat." Panduan GenAI Dikti terbit 11 Okt 2024. https://dikti.kemdiktisaintek.go.id/publikasi/berita/uji-publik-framework-ai-generatif-di-perguruan-tinggi-jaga-keseimbangan-inovasi-dan-integritas-akademik
- **EU AI Act**: berlaku sejak 2 Agu 2026 dengan pengecualian. Larangan dan kewajiban literasi AI sejak 2 Feb 2025; tata kelola dan GPAI sejak 2 Agu 2025. Sistem risiko tinggi Annex III (termasuk pendidikan) mulai 2 Des 2027; Annex I mulai 2 Agu 2028 (AI Omnibus, Reg. 2026/1744, berlaku 27 Jul 2026). Larangan konten seksual tanpa persetujuan dan CSAM mulai 2 Des 2026. Pasal 4 diubah: tidak ada tingkat literasi minimum, pengawasan oleh otoritas nasional sejak 2 Agu 2026. https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- **UU PDP**: Pasal 46 pemberitahuan kebocoran tertulis paling lambat 3 x 24 jam; denda administratif sampai 2% pendapatan tahunan (Pasal 57). **PP 33/2026** terbit 16 Jul 2026, berlaku 16 Jan 2027 (Deloitte, 15 Okt 2026). Lembaga PDP masih disiapkan lewat Perpres (Hukumonline, 23 Okt 2026).
- **Indonesia, instrumen AI**: SE Menkominfo 9/2023 tentang Etika AI (19 Des 2023); tata kelola AI perbankan OJK (29 Apr 2025). Perpres Etika AI dan Peta Jalan AI Nasional 2026-2029 masih rancangan (Komdigi, siaran pers 23 Okt 2026, dibaca langsung). Rilis Komdigi 6 Okt 2026 (201/HM-KKD/10/2026) dilaporkan agent Exa dengan isi sama; tidak dibuka manual. Tidak ada Perpres AI terbit yang ditemukan per 24 Okt 2026.
- **SKB tujuh menteri (12 Mar 2026)**: koding dan AI mapel pilihan (Permendikdasmen 13/2025 Pasal 32A); kemungkinan wajib dikatakan menteri dengan syarat jumlah guru cukup, belum ditetapkan. Batas usia dan durasi untuk PAUD ada di SKB (laporan detik.com: 30 menit per sesi, 60 menit per hari). Teks resmi tidak diverifikasi. Batas itu bukan untuk mahasiswa.

### Pembanding lain yang ditemukan, belum dipakai di slide

- Microsoft AI Diffusion Report Q2 2026 (Sep 2026): 18,8% penduduk usia kerja dunia memakai AI generatif (Q1: 17,8%); Singapura 64,3%; Global North 28,8%, Global South 16,2%. Tidak ada angka Indonesia.
- McKinsey State of AI 2026 (25 Agu 2026; 1.719 responden, 97 negara): 40% responden di organisasi berpendapatan di atas $1 miliar melaporkan sudah menskalakan AI agent (tahun lalu 27%).
- Chen, Frontiers in Psychology (28 Agu 2026): kuasi-eksperimen delapan minggu, enam kelas. Dukungan AI terbatas plus refleksi unggul atas kolaborasi terbuka pada tugas mandiri tanpa AI. Nilai p 0,050-0,063; penulis menolak tafsir kausal tegas.
- UMD (versi Okt 2026, bukan peer review): 2.379 mahasiswa. Akses ke tutor AI menurunkan nilai akhir 0,37 simpangan baku di bagian kelas yang sama. Satu studi, jangan digeneralisasi.
- Pew (22 Okt 2026): hubungan antara paparan AI pada pekerjaan dan pertumbuhan lapangan kerja pria vs wanita. Asosiasi, bukan sebab.
- LMArena teks (snapshot 22 Okt 2026): Gemini 4 Argon (High) peringkat 1, skor 1517, status preliminary.
- Kabar 22-23 Okt yang tidak dipakai: OpenAI Decisions API GA (22 Okt); Anthropic riset verifikasi formal (22 Okt); Microsoft Medical Diagnostic Orchestrator (22 Okt, klaim vendor); OpenAI melanjutkan pelatihan model frontier dengan keamanan baru (23 Okt, Reuters); laporan China menyetujui DeepSeek dan MiniMax untuk pemakaian global (23 Okt, akun afiliasi media negara).

---

## Tema 1 - Kondisi literasi AI di Indonesia

### Indeks literasi AI nasional
- Indeks literasi AI masyarakat Indonesia **49,96**, kategori **"kurang baik"** (skala 0-100, skor di bawah 50 = kurang baik). Survei APJII 2025, 8.700 responden.
  - Sumber: https://komunitech.com/blog/riset/indeks-literasi-ai-indonesia-cuma-4996-kenapa-bisa-pakai-chatgpt-beda-dari-produktif-pakai-ai/
- **27,34%** masyarakat sudah memakai AI di survei 2025, naik dari **24,73%** tahun sebelumnya (APJII 2025; Kompas.id 14 Agu 2025). APJII menulis 24,72% (100 - 75,28%).
- **KOREKSI 23 Okt 2026:** APJII 2026 mencatat hanya **18,2%** responden mengakses AI, turun dari 27,3% (2025). Yang tidak mengakses naik dari 72,7% ke 81,8%. Pertanyaan survei bisa berbeda antar tahun, jadi baca sebagai arah. Penetrasi internet 2026: 81,72% (235,26 juta jiwa).
  - Sumber: https://metrotvnews.com/read/kqYCdR56-survei-apjii-gen-z-paling-banyak-mengakses-ai, https://teknologi.bisnis.com/read/20260622/84/1982423/pengguna-ai-di-ri-masih-182-gen-z-jadi-generasi-paling-aktif, https://databoks.katadata.co.id/teknologi-telekomunikasi/statistik/6a0fbd9fc14cb/pola-penggunaan-ai-di-indonesia-2026-hiburan-naik-edukasi-turun
- Tujuan pemakaian bergeser: 2025 edukasi **43,98%** dan hiburan **29,52%**; 2026 hiburan **36,5%** dan edukasi **30,2%** (Kompas.id; Databoks).
- **KOREKSI 24 Okt 2026:** alasan belum memakai AI (**2026**): **43,1%** merasa tidak butuh (2025: 22,7%), **35,5%** belum tahu teknologinya (2025: 46,6%), **8,1%** tidak tahu cara memakai (2025: 15,5%). Angka 46,6 / 22,7 / 15,5 adalah 2025. Di Gen Z, **70,6%** belum mengakses AI (Metro TV; GoodStats).
- **97%** menganggap AI berperan penting dalam keseharian; **68%** mengaku bergantung pada AI. Indonesia AI Report 2025 (kumparan x Populix): **n=1.000**, hanya Gen Z (18-28) dan Milenial (29-44), online, kota urban, sudah akrab dengan AI, MoE ±3%. **Bukan angka nasional.**
  - Sumber: https://blue.kumparan.com/document/kumparan-Indonesia-AI-Report-2025.pdf

### Pola pemakaian 2026
Survei APJII "Penetrasi Internet dan Perilaku Penggunaan Internet 2026":
- Periode: 1 Februari - 15 Maret 2026. Responden 8.700 WNI usia minimal 13 tahun, 38 provinsi, wawancara tatap muka, MoE ±1,1%.
- Pengguna AI per generasi: Gen Z (13-28) **29,4%**, Milenial (29-44) **16,7%**, Gen X (45-60) **7,5%**, Baby Boomer (61-79) **0,8%**.
- Tujuan pemakaian AI: hiburan/video-gambar generatif **36,5%**, edukasi & riset **30,2%**, pekerjaan/produktivitas **26,9%**, asisten suara **6,4%**.
  - Sumber: https://news.detik.com/berita/d-8513574/orang-indonesia-pakai-ai-paling-sering-buat-apa

### Sinyal kebijakan
- **12 Maret 2026** (terverifikasi, dokumen primer): tujuh menteri menandatangani Keputusan Bersama tentang Pedoman Pemanfaatan dan Pembelajaran Teknologi Digital dan Kecerdasan Artifisial di Jalur Pendidikan Formal, Nonformal, dan Informal (Kemendagri, Kemenag, Kemendikdasmen, Kemdiktisaintek, Komdigi, Kemendukbangga/BKKBN, KemenPPPA). Berlaku PAUD sampai perguruan tinggi, dengan memperhatikan otonomi akademik. Satuan pendidikan diminta menilai kesiapan SDM, infrastruktur, dan tata kelola (data, etika akademik, etika AI). Banyak isinya soal perlindungan anak: batas usia dan durasi. Koding dan AI: mata pelajaran **pilihan** sejak tahun ajaran 2025/2026, kemungkinan jadi wajib (Mendikdasmen).
  - Sumber: https://www.kemdikbud.org/download/file/SKB%20Pedoman%20Pemanfaatan%20Kecerdasan%20Artisial%20Satuan%20Pendidikan_2026__1.pdf, https://www.kemendikdasmen.go.id/siaran-pers/14919-kemendikdasmen-dukung-skb-7-menteri-tentang-pemanfaatan-tekn, https://portal.komdigi.go.id/kanal-publik/berita-kini/10076

### Pembacaan inti
Literasi 49,96 (2025) masih "kurang baik". Pemakaian di survei 2026 hanya 18,2% dan bergeser dari edukasi ke hiburan. Hambatan terbesar adalah belum tahu, bukan akses. Jangan menulis "adopsi naik": itu benar untuk 2024 ke 2025, tidak untuk 2025 ke 2026.

---

## Tema 2 - Definisi dan kerangka literasi AI

### Definisi resmi (OECD + European Commission, Juni 2026)
AILit Framework, "Empowering Learners for the Age of AI: An AI Literacy Framework for Primary and Secondary Education":
- Definisi: *"AI literacy represents the technical knowledge, durable skills and future-ready attitudes required to thrive in a world influenced by AI. It enables learners to engage, create with, manage and shape AI, while critically evaluating its benefits, risks and ethical implications."*
- Definisi ini dibangun di atas definisi European Parliament (EU AI Act 2024), OECD (2024), dan UNESCO (Miao & Cukurova, 2024).
- **Empat domain**, berurutan sebagai jalur belajar:
  1. **Engage with AI** - menjadi partisipan kritis dan bertanggung jawab di dunia yang ditandai AI.
  2. **Create with AI** - memakai AI sebagai mitra kreatif sambil menjaga agensi manusia.
  3. **Manage AI** - membagi kerja secara sengaja antara manusia dan AI.
  4. **Shape AI** - memperbaiki sistem AI agar mencerminkan nilai manusia.
- Tiap domain berisi **Knowledge, Skills, Attitudes**. Attitudes = "the mindsets and dispositions that learners should adopt when using AI systems".
- Framework ini menjadi dasar asesmen **PISA 2029 Media & AI Literacy (MAIL)**.
- Pernyataan kunci: *"AI literacy is different from AI tool use... simply interacting with AI tools neither develops nor depends on the knowledge, skills or competences detailed in this framework."*
- Hambatan yang disebut: tidak ada pemahaman bersama soal apa itu literasi AI; implementasi tidak konsisten; perlu **demistifikasi peran AI** dan mengatasi kecemasan/miskonsepsi.
  - Sumber: https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/06/empowering-learners-for-the-age-of-ai_2f8315e7/65cd27d4-en.pdf

### Model mindset + literasi
- **CAFE-AI** (Cogent Education, April 2026): model e-learning yang menggabungkan pedagogi dan AI lewat 4 komponen Content, Activity, Facilitation, Evaluation, dan 3 paradigma AI: AI-directed, AI-supported, AI-empowered. Uji kuasi-eksperimen n=152: lebih efektif signifikan (p<0,05) dibanding e-learning konvensional untuk meningkatkan **AI literacy dan growth mindset**.
  - Sumber: https://doi.org/10.1080/2331186x.2026.2647508
- **HAIML** (preprint, Juni 2026): Human-Centered AI Metacognitive Learning Model. Tiga lapis: Experiential AI Use, Metacognitive Reflection, Ethical Decision-Making. Dilengkapi "Four AI Use Levels". Fokus: agensi manusia, metakognisi, penalaran etis, tanggung jawab pribadi; dibangun di atas riset **automation bias**.
  - Sumber: https://doi.org/10.35542/osf.io/qhjgs_v1
- **Google's Pedagogical Framework for Generative AI** (September 2026): AI generatif cenderung menyelesaikan tugas segera, dan kecenderungan itu **melewati friksi kognitif** yang penting untuk konstruksi pengetahuan.
  - Sumber: https://services.google.com/fh/files/misc/googlespedagogicalframework.pdf

---

## Tema 3 - Bukti tentang risiko kognitif dan over-reliance

### Over-reliance dan "reasoning visibility"
- Studi Zhu & Li, *Telematics and Informatics*, Oktober 2026. Tiga eksperimen online, total **N=657**, domain kesehatan, lingkungan, teknologi.
- Temuan: **menampilkan proses reasoning AI justru MENINGKATKAN over-reliance**, karena keberadaan reasoning dibaca sebagai sinyal kompetensi, bukan sebagai alat kalibrasi kepercayaan.
- Task complexity juga meningkatkan over-reliance, lewat dua jalur: persepsi kompetensi AI, dan turunnya persepsi kemampuan diri tanpa AI.
- **AI literacy** (khususnya awareness literacy) menahan efek reasoning visibility, **tapi tidak menahan efek task complexity**.
  - Sumber: https://www.sciencedirect.com/science/article/abs/pii/S0736585326001000

### Halusinasi: peringatan umum tidak efektif
- Review Blanchard, Garvey & O'Laughlin, *Current Opinion in Psychology*, September 2026.
- Membedakan tiga hal yang sering dicampur: apakah pengguna **skeptis**, apakah pengguna **memverifikasi** (percobaan vs berhasil), dan apakah hasil verifikasi **mengubah ketergantungan**.
- Temuan: hampir semua studi mengukur reliance; skeptisisme dan verifikasi lebih sering jadi intervensi daripada diukur.
- **Peringatan umum tentang risiko halusinasi adalah intervensi yang paling mudah diterapkan, tapi efeknya paling lemah dan paling campur aduk.**
- Cue yang lebih spesifik tentang **di mana** AI cenderung gagal lebih menjanjikan, walau buktinya masih terbatas.
  - Sumber: https://doi.org/10.1016/j.copsyc.2026.102427

### Cognitive debt
- MIT Media Lab, "Your Brain on ChatGPT" (2025). 54 partisipan, 4 sesi selama 4 bulan, EEG.
- Tiga kelompok: LLM, Search Engine, Brain-only. Di sesi 4, kelompok ditukar (LLM-to-Brain, Brain-to-LLM).
- Temuan: konektivitas otak menurun sistematis seiring tingkat bantuan eksternal. Kelompok LLM menunjukkan **hingga 55% konektivitas lebih rendah** dibanding brain-only.
- **83% pengguna LLM tidak bisa mengutip kalimat dari esai yang baru saja mereka tulis.**
- Rasa kepemilikan atas esai paling rendah di kelompok LLM.
- Esai kelompok LLM lebih homogen; mereka memakai 2-3 kali lebih banyak named entity tapi dengan orientasi lebih lemah.
  - Sumber: https://www.media.mit.edu/publications/your-brain-on-chatgpt/ dan https://pmc.ncbi.nlm.nih.gov/articles/PMC12723506/

### Jagged frontier
- Dell'Acqua, McFowland, Mollick, Lifshitz-Assaf, Kellogg dkk., *Organization Science*, Maret 2026. Eksperimen praregistrasi, **758 knowledge worker**, bekerja sama dengan BCG.
- Tiga kondisi: tanpa AI, akses GPT-4, akses GPT-4 + penjelasan prompt engineering.
- **18 tugas realistis di dalam frontier**: pengguna AI menyelesaikan **12,2% lebih banyak tugas**, **25,1% lebih cepat**, dengan kualitas solusi yang jauh lebih baik.
- **Satu tugas manajerial kompleks di luar frontier**: pengguna AI **19 poin persentase** lebih kecil kemungkinannya menghasilkan solusi benar (kontrol 84,5%; kondisi AI 60% dan 70,6%). Abstrak menulis "19%", tetapi isi makalah menyebut poin persentase. Model yang dipakai: **GPT-4** (eksperimen 2023).
- Konsep: "jagged technology frontier" - dampak AI tidak rata, bahkan di dalam alur kerja yang sama dan tingkat kesulitan yang tampak mirip.
  - Sumber: https://doi.org/10.1287/orsc.2025.21838

---

## Tema 4 - Adopsi dan keterampilan (global)

### Deloitte, State of AI in the Enterprise 2026
- Survei 3.235 pemimpin bisnis dan IT, 24 negara, Agustus-September 2025.
- Akses pekerja ke AI naik **50% dalam satu tahun**: dari di bawah 40% menjadi sekitar **60%** pekerja punya akses ke tool AI resmi.
- Hanya **25%** responden yang sudah memindahkan 40% atau lebih eksperimen AI ke produksi. **54%** berharap mencapai level itu dalam 3-6 bulan.
- Dari pekerja yang punya akses, **kurang dari 60%** memakainya di alur kerja harian. Pola ini hampir tidak berubah dari tahun sebelumnya.
- Kesimpulan laporan: akses melebar, tapi AI di enterprise masih **underutilized**.
  - Sumber: https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf

### WEF, Future of Jobs Report 2025 (horizon 2025-2030)
- Rata-rata **39%** dari skill set pekerja akan berubah atau jadi usang pada 2025-2030.
- Jika populasi kerja dunia 100 orang: **59 orang butuh pelatihan** pada 2030. 29 bisa di-upskill di peran sekarang, 19 di-upskill lalu ditempatkan ulang, **11 kemungkinan tidak mendapat pelatihan** dan prospek kerjanya berisiko.
- **63%** perusahaan menyebut skill gap sebagai hambatan terbesar transformasi bisnis.
- **85%** berencana memprioritaskan upskilling; 70% berharap merekrut orang dengan skill baru; 40% berencana mengurangi staf saat skill-nya kurang relevan; 50% merencanakan transisi staf dari peran menurun ke peran tumbuh.
- **AI dan big data** memuncaki daftar skill yang paling cepat tumbuh, diikuti jaringan & keamanan siber serta technology literacy. **Analytical thinking** tetap skill inti paling dicari (7 dari 10 perusahaan menganggapnya esensial di 2025). Creative thinking, resilience, dan **curiosity & lifelong learning** juga naik.
- **50%** perusahaan berencana mengubah orientasi bisnis sebagai respons terhadap AI; dua pertiga berencana merekrut talenta dengan skill AI spesifik; **40%** memperkirakan pengurangan tenaga kerja di area yang bisa diotomasi AI.
  - Sumber: https://www.weforum.org/publications/the-future-of-jobs-report-2025 dan https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf

---

## Tema 5 - Cara kerja AI (untuk audiens awam)

### LLM sebagai prediktor token
- Alur: prompt dipecah jadi **token** -> token jadi **vektor (embedding)** + informasi posisi -> **transformer** dengan mekanisme attention menimbang konteks -> model memprediksi **token berikutnya** dengan probabilitas -> token dipilih, ditambahkan ke urutan, diulang sampai kondisi berhenti.
- Pelatihan pada korpus teks besar mengajarkan model kelanjutan mana yang masuk akal. Tuning tambahan membuat jawaban lebih berguna, aman, dan percakapan.
- **Halusinasi terjadi karena model dioptimalkan untuk kelanjutan yang plausible, bukan kebenaran yang terjamin.** Kalau prompt ambigu dan model tidak punya retrieval atau akses tool, output bisa fasih tapi salah.
  - Sumber: https://benjamincrozat.com/how-llms-work dan https://cset.georgetown.edu/article/the-surprising-power-of-next-word-prediction-large-language-models-explained-part-1/

### Context engineering (Anthropic, September 2025)
- LLM dibatasi "attention budget" yang terbatas. Context engineering = menemukan set token paling kecil dengan sinyal tertinggi yang memaksimalkan peluang hasil yang diinginkan.
- System prompt harus berada di "altitude" yang tepat: cukup spesifik untuk memandu, cukup fleksibel untuk memberi heuristik. Dua kegagalan umum: logika if-else yang kaku, atau panduan terlalu umum yang mengasumsikan konteks bersama.
- Organisasi prompt ke bagian terpisah (background, instruksi, tool guidance, output description) memakai XML tag atau Markdown header.
- Few-shot example tetap teknik dasar yang kuat.
  - Sumber: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### Prompt engineering best practices (Anthropic, November 2025)
- Prinsip inti: **jelaskan persis apa yang kamu ingin lihat**. Jangan berasumsi model menyimpulkan. Sebutkan fitur atau format yang diinginkan secara eksplisit.
  - Sumber: https://claude.com/resources/articles/best-practices-for-prompt-engineering

---

## Tema 6 - Agentic AI

### Definisi dan loop
- Agentic AI: sistem yang mengejar tujuan lewat tindakannya sendiri, bukan hanya menghasilkan output untuk ditindaklanjuti manusia. Diberi objektif, lalu menjalankan loop: **decide -> act -> observe -> decide**, sampai tujuan tercapai, agent macet, atau manusia masuk.
  - Sumber: https://agentic.ai/what-is-agentic-ai
- Dimensi otonomi (Springer, *Cognitive Computation*, Agustus 2026): **initiation** (bisa mulai sendiri dari trigger/jadwal), **horizon length** (jumlah langkah persepsi-aksi), **decision authority** (seberapa sering manusia harus meninjau/menyetujui), **self-modification**.
- Peringatan penting dari survei yang sama: agent otonom masih **rapuh pada horizon panjang** - kesalahan penalaran kecil bisa beruntun jadi kegagalan total. Pendekatan sekarang banyak bergantung pada feedback heuristik, bukan jaminan kebenaran.
  - Sumber: https://link.springer.com/article/10.1007/s12559-026-10619-1

### Contoh agent produksi (Oktober 2026)
- **Claude Duet** (Anthropic, 21 Oktober 2026), dibangun di atas Claude Opus 5.5. Mengirim brief pagi, mengirim pesan hanya kalau ada yang butuh perhatian. Bisa menjadwalkan rapat, membangun dashboard, membuat forecast, membuat web app. **Berjalan di virtual machine sendiri dengan browser, dan meminta persetujuan sebelum pembayaran atau penghapusan.** Classifier dan safety system prompt menolak permintaan membagikan informasi paling sensitif seperti nomor kartu kredit. Claude Marketplace punya lebih dari 6.000 connector dan plugin.
  - Sumber: https://atlas.prashish.com/weeks/2026-10-19

---

## Tema 7 - Lanskap AI terbaru (Oktober 2026)

Untuk slide "lompatan 12 bulan terakhir". Semua peristiwa berlabel tanggal.

Semua item di bawah terverifikasi ke sumber primer atau pers teknologi pada 23 Okt 2026.

- **21 Okt 2026** - OpenAI dan Google Cloud: Google menulis **GPT-6 Astra, GPT-6.1 Sol, GPT-6 Luna** (Ars Technica menulis "GPT 6.1 Astra, Sol, Luna"; pakai penulisan Google). Private preview untuk enterprise terpilih; general availability "dalam beberapa minggu". Microsoft tetap mitra cloud utama OpenAI.
  - Sumber: https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers, https://openai.com/index/openai-models-google-cloud/
- **19 Okt 2026** - **MiniMax M3.1 Flash**: $0,15 input dan $0,60 output per juta token. Intelligence Index Artificial Analysis 42 saat peluncuran (halaman AA kini 43), naik dari 29 untuk M3. Hallucination rate bersyarat AA naik dari **18% ke 93%**: saat gagal menjawab benar, model hampir selalu memberi jawaban salah, bukan mengaku tidak tahu. Satu model, satu benchmark.
  - Sumber: https://www.minimax.io/blog/minimax-m31f, https://venturebeat.com/technology/minimaxs-new-m3-1-flash-beats-deepseek-and-opus-5-on-a-key-business-benchmark-at-lower-cost-but-with-a-high-hallucination-rate, https://www.ai-primer.com/engineer/stories/minimax-m31-flash
- **19 Okt 2026** - **Mercury 3** (Inception Labs): model difusi, 1.068 token/detik di GPU Nvidia, konteks 1 juta token, $0,20/$0,70 per juta token (diskon 50% saat peluncuran). Klaim vendor: mengungguli GPT-6 Luna dan Claude Haiku 5.5.
  - Sumber: https://www.inceptionlabs.ai/blog/introducing-mercury-3
- **21 Okt 2026** - **Claude Duet** (lihat Tema 6). Research preview lewat waitlist, hanya Pro dan Max di AS, belum untuk Team atau Enterprise.
- **20 Okt 2026** - **DeepSeek DeepInfer** (Apache 2.0). Baru mendukung DeepSeek-V4.1-Flash, di GPU Nvidia SM100 (Blackwell) dan Huawei Ascend 950. Hanya inference offline; KV cache, pemisahan prefill/decode, dan load balancing belum disertakan. Deployment efisien terkecil yang DeepSeek gambarkan memakai 64 GPU prefill dan 64 GPU decode.
  - Sumber: https://github.com/deepseek-ai/DeepInfer, https://thenewstack.io/deepseek-deepinfer-huawei-nvidia/, https://siliconangle.com/2026/10/20/deepseek-open-sources-deepinfer-the-inference-framework-behind-its-production-services/
- **19 Okt 2026** (arXiv v1; v2 20 Okt; dihapus dari slide 6) - **MemT 1.0** (MemTensor): state memori berukuran tetap. Varian Nano: 1,86x lebih cepat pada 128K dan **3,99x pada 256K** dibanding full context (uji peneliti sendiri, preprint arXiv); penyimpanan 66x lebih kecil pada 128K. Keterbatasan yang mereka tulis: kapasitas tetap, detail bisa hilang.
  - Sumber: https://arxiv.org/html/2610.26825, https://github.com/MemTensor/MemT-1.0
- **20-22 Okt 2026** - **Voxtral 3** (Mistral): transkripsi 50+ bahasa, TTS ekspresif, dan SDK agen suara real-time. Public preview (dokumentasi tanggal 20 Okt, blog 22 Okt).
  - Sumber: https://mistral.ai/news/voxtral-3/, https://docs.mistral.ai/resources/changelogs
- Dihapus dari deck: Canva Craft (22 Okt) tidak diverifikasi ulang.

### Pembacaan tren
Tiga arah yang jelas dari data di atas: (1) **agent** menjadi bentuk produk utama, (2) **biaya per token jatuh** dan kecepatan naik, (3) **memori dan konteks** menjadi medan pertempuran teknis, bukan sekadar ukuran model.

---

## Tema 8 - Pola kerja yang baik (sintesis untuk deck)

Poin-poin ini adalah sintesis dari sumber di atas, bukan klaim baru:

1. **AI adalah prediktor, bukan basis data.** Karena itu verifikasi adalah bagian dari pekerjaan, bukan tanda ketidakpercayaan.
2. **Peringatan umum tidak menolong.** Yang menolong adalah cue spesifik tentang di mana AI gagal (Blanchard dkk., 2026).
3. **Reasoning yang ditampilkan bukan jaminan kualitas.** Justru bisa menaikkan over-reliance (Zhu & Li, 2026).
4. **Friksi kognitif perlu dijaga.** Kalau AI selalu menyelesaikan tugas segera, pembelajaran terlewati (Google, 2026; MIT Media Lab, 2025).
5. **Frontier itu bergerigi.** Tugas yang terlihat mirip bisa punya hasil berlawanan (Dell'Acqua dkk., 2026).
6. **Otonomi butuh gerbang.** Agent produksi minta persetujuan sebelum aksi berisiko (Claude Duet, 2026); agent rapuh di horizon panjang (Springer, 2026).
7. **Literasi bukan tool use.** Empat domain AILit memberi urutan yang bisa diajarkan (OECD/EC, 2026).
8. **Adopsi tanpa pemahaman adalah utang.** 68% bergantung, indeks literasi 49,96 (APJII 2025; Indonesia AI Report 2025).

---

## Catatan kehati-hatian

- Angka **93%** untuk MiniMax M3.1 Flash adalah hallucination rate **bersyarat** Artificial Analysis (jawaban salah di antara jawaban yang tidak benar). Satu model, satu benchmark; jangan dipakai membandingkan antar model.
- Angka **68% bergantung pada AI** berasal dari kumparan x Populix (n=1.000, Gen Z dan Milenial urban), bukan APJII dan bukan angka nasional.
- Angka **18,2%** (2026) dan **27,34%** (2025) berasal dari dua gelombang survei APJII dengan pertanyaan yang bisa berbeda. Sebut sebagai arah, bukan selisih pasti.
- MIT "Your Brain on ChatGPT" adalah preprint arXiv; 54 peserta (18 per kelompok), hanya 18 menyelesaikan sesi 4. "83%" = 15 dari 18 di sesi 1.
- Eksperimen Dell'Acqua dkk. memakai GPT-4 (2023). Pola "frontier bergerigi" yang penting, bukan angkanya.
- Kerangka OECD/EC AILit ditulis untuk pendidikan **dasar dan menengah**.
- Indeks **49,96** berasal dari APJII **2025**; angka pemakaian per generasi dan per tujuan berasal dari APJII **2026**. Jangan digabung seolah satu survei.
- Studi MIT memakai n=54 dan tugas menulis esai; jangan generalisasi ke semua jenis pekerjaan.

---

## Tema 9 - AS mengganti istilah "AI" menjadi "Super Intelligence" (SI)

Dipakai di slide 1 ("Kabar terbaru"). Terverifikasi 23 Okt 2026.

### Yang terjadi
- **22 Sep 2026**: Trump mengumumkan di Sidang Umum PBB bahwa dokumen pemerintah AS akan memakai "super intelligence". Departemen Luar Negeri memerintahkan diplomatnya memakai "super intelligence" (AP).
- **24-25 Sep 2026**: KTT Trump-Xi di Washington. **Tidak ada pernyataan bersama.** Tiap pihak merilis daftar hasil sendiri pada 25 Sep.
  - Fact sheet Gedung Putih: kedua pemimpin "agreed to use the term 'super intelligence' rather than 'artificial intelligence'". Dibentuk "U.S.-China Super Intelligence (SI) Dialogue" (pertemuan berikutnya paling lambat November 2026) dan saluran komunikasi untuk "SI incidents".
  - Daftar delapan hasil Xinhua (poin 7): tetap menulis "China-U.S. AI Dialogue" dan "AI incidents".
- **26 Sep 2026**: Kemlu Tiongkok: "attaches importance to the US side's position and respects the US side's wording". Beijing tidak menyatakan ikut mengganti istilah. Lembaga kajian (EAI, The Diplomat) menyimpulkan Tiongkok tidak mengadopsi istilah SI.
- **29 Sep 2026**: Perintah eksekutif "Inaugurating the Era of Super Intelligence" mengarahkan lembaga eksekutif AS memakai "SI" dan tidak lagi memakai "AI". Definisi hukum SI sementara sama dengan definisi AI yang sudah ada (15 U.S.C. 9401(3)). Dokumen lama tidak wajib diubah.
- **4 Okt 2026**: Trump membentuk "Super Intelligence Force" (gugus tugas, 120 hari).
- **15 Okt 2026**: Wakil Menkeu AS mendorong mitra global dan IMF memakai istilah SI (Reuters).
- **19-20 Okt 2026**: Kabel Departemen Luar Negeri memerintahkan seluruh staf memakai SI, dengan pengecualian untuk teks hukum, kontrak, dan judul dokumen yang sudah terbit (Defense One).

### Cara menyampaikan (jangan lebih kuat dari sumber)
- Benar: AS mengganti istilah di pemerintahannya; Gedung Putih menyatakan Xi setuju; Tiongkok "menghormati" pilihan kata AS tetapi rilis resminya tetap menulis AI.
- Salah: "AS dan Tiongkok sepakat mengganti nama AI menjadi SI" sebagai pernyataan datar.
- Akademisi menilai istilah baru menyesatkan (Pedro Domingos, DW): "superintelligence" punya arti khusus, yaitu sistem yang melampaui manusia di hampir semua bidang. Industri teknologi dan akademisi belum mengikuti.
- Pesan untuk audiens: nama berubah lewat perintah eksekutif, kemampuan model tidak. Mesinnya tetap menebak kata berikutnya.
- Sumber: https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-inaugurates-the-era-of-super-intelligence/, https://apnews.com/article/trump-super-intelligence-rebrand-ai-diplomats-02123c7bf18c692a12b2b3e3b9ce30c5, https://www.axios.com/2026/09/26/us-china-ai-si-deal, https://www.channelnewsasia.com/asia/china-us-trump-xi-ai-super-intelligence-6412656, https://cgaig.fudan.edu.cn/1e/3c/c54667a794172/page.htm, https://www.dw.com/id/super-intelligence-tepatkah-trump-mengganti-nama-ai/a-79496153, https://www.defenseone.com/policy/2026/10/state-department-super-intelligence/416705/

---

## Log verifikasi 23 Okt 2026

Diverifikasi ulang ke sumber: APJII 2025 dan 2026; kumparan x Populix; SKB 12 Mar 2026; OECD/EC AILit (kutipan dan empat domain); Dell'Acqua dkk.; MIT (83%, 55%, n=54); Deloitte (50%, ~60%, <60%, 25%, 54%, n=3.235); Zhu & Li (N=657); semua kabar 19-22 Okt 2026; SI.

Belum diverifikasi ulang pada 23 Okt: WEF Future of Jobs 2025; Blanchard dkk.; HAIML; Springer; Google Pedagogical Framework; UU PDP; EU AI Act. **Semuanya diverifikasi pada 24 Okt 2026** (lihat bagian "Koreksi dan pembaruan" di atas). CAFE-AI (n=152) tidak lagi tampil di deck dan tidak diverifikasi ulang.

## Log verifikasi 24 Okt 2026

Alat: Exa (agent_run empat kluster, web_search_exa, web_fetch_exa). Diperiksa langsung ke halaman sumber: Metro TV dan Bisnis.com (APJII 2026), VentureBeat dan ai-primer (MiniMax), arXiv (MemT), halaman EU AI Act (Komisi Eropa dan Consilium), Deloitte dan Hukumonline (PP PDP), Komdigi (23 Okt), METR (22 Okt), The Verge (23 Okt), Artificial Analysis (24 Okt), Bain (e-Conomy SEA), Dikti (framework dan panduan).
Diperiksa lewat ringkasan agent Exa dengan kutipan dan tautan primer (tanpa buka ulang manual): WEF, OECD/EC, Dell'Acqua, MIT, Zhu & Li, Blanchard, Springer, HAIML, Google, Anthropic, SKB tujuh menteri, UU PDP Pasal 46 dan 57, kumparan x Populix.
Tidak ditemukan: laporan primer APJII 2026; angka Indonesia di laporan Microsoft AI Diffusion; teks resmi SKB tentang batas durasi.
Sebelum tampil pada 28 Okt: ulangi lima cek di bagian "Cek ulang pada hari H" di docs/TALK-TRACK.md.

Konten ilustrasi (bukan data, sudah diberi label di slide): batang keyakinan vs kebenaran; dua jawaban JLPT N3; kurva minggu latihan; simulasi gerbang otonomi (termasuk "47 kali"); hitungan 0,9 pangkat n.
