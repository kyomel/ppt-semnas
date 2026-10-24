# Meningkatkan Literasi dan Mindset Pemahaman AI

Deck presentasi web untuk **SEMNAS AMIKOM 2026** (Yogyakarta), 60 menit, 27 slide.
Deck dibuat untuk penyaji, bukan untuk peserta: pesan utama tiap slide tampil tanpa klik. Simpul 3D dan tombol lapisan hanya alat bantu penyaji. Jadwal bicara ada di `docs/TALK-TRACK.md`.
Dibangun dengan Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, dan React Three Fiber.
Bahasa materi: Bahasa Indonesia.

## Prasyarat

- [Bun](https://bun.sh) 1.4 atau lebih baru
- Node.js 20 atau lebih baru (untuk tooling)
- Desktop browser modern (Chrome, Edge, Safari, Firefox). Deck ini didesain untuk layar desktop minimal 1024px.

## Menjalankan

```bash
bun install
bun dev
```

Buka `http://localhost:3000`. Deck langsung tampil di slide pertama.

Build produksi:

```bash
bun run build
bun start
```

Lint dan typecheck:

```bash
bun run lint
bunx tsc --noEmit
```

## Navigasi

| Aksi | Tombol |
|---|---|
| Slide berikutnya | `→` `↓` `Space` `PageDown` |
| Slide sebelumnya | `←` `↑` `PageUp` |
| Slide pertama / terakhir | `Home` / `End` |
| Lompat ke slide N | ketik angka, lalu `Enter` |
| Layar penuh | `F` |
| Ikhtisar slide | `Esc` (buka/tutup) |
| Ganti tema | `T` |
| Panel bantuan | `?` |

Mouse: tombol `‹` `›` di kanan bawah, tombol `▦` untuk ikhtisar, dan klik kartu di ikhtisar untuk lompat.
Deep link: `#/slide/12` membuka slide 12 langsung.

## Struktur proyek

```
src/
  app/
    layout.tsx          font, metadata, robots noindex, provider tema
    page.tsx            merender SlideDeck
    globals.css         token warna, tipografi, gaya range input, grain
    robots.ts           disallow semua crawler
  components/
    deck/
      slide-deck.tsx        orkestrasi slide, keyboard, fullscreen, hash
      slide-shell.tsx       kerangka slide: eyebrow, judul, lead, catatan sumber
      navigation-bar.tsx    counter, progress, tombol
      thumbnail-overview.tsx
      help-overlay.tsx
      theme-toggle.tsx
    motion/
      text.tsx              SplitText, CharFade
      containers.tsx        Reveal, Stagger, DrawLine
      interactive.tsx       Counter, TiltCard, Magnetic, PointerGlow
    three/
      scene-host.tsx        batas dynamic import (ssr: false)
      scene-runtime.tsx     Canvas + pemilihan scene
      primitives.tsx        Rig, Spin, usePalette
      scenes/               ambient, structures, graphs
  slides/
    act-0-opening.tsx       01-02
    act-1-foundations.tsx   03-06
    act-2-reality.tsx       07-10
    act-3-mental-models.tsx 11-13
    act-4-mindset.tsx       14-18
    act-5-skill.tsx         19-22
    act-6-action.tsx        23-25
    act-7-closing.tsx       26-27
    index.tsx               daftar slide berurutan
  config/
    deck.ts             judul, pembicara, event, daftar bagian
    theme.ts            easing, spring, palet untuk three.js
  lib/
    cn.ts
    use-deck-nav.ts     state indeks + sinkronisasi hash
docs/
  PLAN.md               rencana awal 33 slide dan konsep animasi
  TALK-TRACK.md         jadwal bicara 60 menit dan poin per slide
  SOURCE-NOTES.md       semua angka dan sumbernya
```

## Cara mengubah isi

### Ganti identitas acara

Edit `src/config/deck.ts`:

```ts
export const deck = {
  title: "Meningkatkan Literasi dan Mindset Pemahaman AI",
  speaker: "Michael Stevan Lapandio",
  event: "SEMNAS AMIKOM 2026",
  dateLabel: "28 Oktober 2026",
  // ...
};
```

Nilai ini dipakai di slide intro, slide Q&A, dan metadata halaman.

### Menambah atau menghapus slide

1. Tambahkan komponen di file `act-*.tsx` yang sesuai.
2. Daftarkan di `src/slides/index.tsx` pada posisi yang diinginkan.
3. Perbarui `sections` di `src/config/deck.ts` kalau jumlah slide per bagian berubah.

Nomor slide, counter, progress bar, dan deep link mengikuti panjang array `slides` secara otomatis.

### Menyesuaikan tema

Semua warna ada di `src/app/globals.css` sebagai CSS variable, dengan varian light dan dark.
Palet untuk scene 3D ada di `src/config/theme.ts` (`scenePalette`). Kalau mengubah warna CSS, ubah juga palet 3D agar tetap selaras.

### Menyesuaikan gerak

`src/config/theme.ts` menyimpan `ease`, `spring`, dan `staggerStep`. Ubah di satu tempat; semua slide mengikuti.

## Arsitektur singkat

```text
page.tsx
  -> SlideDeck (client)
       -> useDeckNav            state indeks + hash #/slide/N
       -> AnimatePresence       transisi masuk/keluar per slide
       -> slides[i].Component   satu slide aktif pada satu waktu
            -> SlideShell       kerangka + animasi judul
            -> SceneCanvas      dynamic import, hanya scene slide aktif
       -> NavigationBar         counter, progress, tombol
       -> ThumbnailOverview     grid kartu semua slide, tanpa memasang canvas
       -> HelpOverlay
```

Hanya slide aktif yang me-mount canvas 3D. Saat berpindah slide, canvas lama dilepas, jadi memori GPU tidak menumpuk.

## Catatan teknis

- **Kamera 3D**: scene memakai kamera perspektif dengan `fov` 42 dan posisi yang diatur per slide. Semua geometri prosedural, tanpa file model atau aset gambar.
- **Tema 3D**: komponen scene membaca kelas `dark` dari `<html>` lewat `MutationObserver`, karena React Three Fiber merender di root terpisah sehingga context `next-themes` tidak menembus ke dalamnya.
- **`prefers-reduced-motion`**: durasi dan jarak animasi dikurangi, bukan dimatikan. Transisi slide berubah menjadi fade sederhana.
- **Pencarian mesin**: `robots.txt` menolak semua user agent, dan metadata memuat `noindex, nofollow`.
- **Tanpa test suite**: sesuai cakupan proyek, tidak ada test otomatis. Verifikasi dilakukan manual di browser.

## Sumber data

Semua angka di deck punya rujukan di `docs/SOURCE-NOTES.md`, dan setiap slide menampilkan catatan sumber di bagian bawah.
Angka utama: APJII 2025 dan 2026, OECD/EC AILit Framework 2026, Deloitte State of AI in the Enterprise 2026, WEF Future of Jobs 2025, MIT Media Lab 2025, Zhu & Li 2026, Blanchard dkk. 2026, Dell'Acqua dkk. 2026, dan Atlas AI minggu 19-25 Oktober 2026.
