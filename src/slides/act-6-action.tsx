"use client";

import { Check, Globe, Landmark, Shield } from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { Reveal } from "@/components/motion/containers";

const RULES = [
  {
    icon: Landmark,
    name: "SKB Tujuh Menteri",
    scope: "Indonesia · 12 Mar 2026",
    line: "Pedoman nasional AI dan teknologi digital di pendidikan, dari PAUD sampai perguruan tinggi.",
    points: [
      "Berlaku PAUD sampai perguruan tinggi, menghormati otonomi akademik. Koding dan AI: mapel pilihan, belum wajib.",
      "Panduan GenAI kampus (Dikti, 2024): integritas, privasi data, transparansi. Framework baru (uji publik 9 Okt 2026): aturan pakai jelas, hasil AI diverifikasi, asesmen tahan GenAI. Panduan, bukan regulasi mengikat.",
    ],
    impact: "Kalau kamu di kampus: kampus menilai kesiapan dan menyusun tata kelola AI sendiri. Tanyakan aturannya sebelum memakai AI untuk tugas.",
  },
  {
    icon: Shield,
    name: "UU PDP",
    scope: "Indonesia · UU 27/2022",
    line: "Batas untuk data pribadi, termasuk yang kamu tempel ke tool AI.",
    points: [
      "Data pribadi butuh dasar pemrosesan yang sah.",
      "Subjek data punya hak akses, koreksi, dan penghapusan.",
      "Kebocoran wajib diberitahukan tertulis dalam 3 x 24 jam (Pasal 46).",
      "PP 33/2026 terbit 16 Jul 2026, berlaku 16 Jan 2027. Lembaga PDP masih disiapkan (23 Okt 2026).",
    ],
    impact: "Kalau kamu memakai AI: jangan masukkan data pelanggan ke tool tanpa perjanjian.",
  },
  {
    icon: Globe,
    name: "EU AI Act",
    scope: "Uni Eropa · Reg. 2024/1689",
    line: "Rujukan klasifikasi risiko. Relevan kalau produkmu dipakai di pasar EU.",
    points: [
      "Empat tingkat risiko: terlarang, tinggi, transparansi, minimal.",
      "Kewajiban literasi AI bagi penyedia dan pengguna sistem AI berlaku sejak 2 Feb 2025.",
      "AI di lembaga pendidikan yang menentukan akses atau jalur belajar (misalnya menilai ujian) berisiko tinggi. Kewajibannya berlaku 2 Des 2027 setelah AI Omnibus.",
    ],
    impact: "Kalau kamu membangun produk: klasifikasikan risikonya sebelum menulis kode.",
  },
] as const;

export function RulesSlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Aksi"
      title="Aturan main: tiga lapis yang perlu kamu tahu"
      lead="Kamu tidak perlu menghafal pasal. Cukup tahu lapis mana yang menyentuh pekerjaanmu. Perpres etika AI dan peta jalan AI nasional masih rancangan (Komdigi, 23 Okt 2026)."
      source="Sumber: Keputusan Bersama Tujuh Menteri tentang Pedoman Pemanfaatan dan Pembelajaran Teknologi Digital dan Kecerdasan Artifisial (12 Mar 2026; Kemendikdasmen, Komdigi); Komdigi, siaran pers 23 Okt 2026; UU 27/2022 tentang Pelindungan Data Pribadi; UU 27/2022 dan PP 33/2026 tentang PDP; panduan GenAI Dikti (2024) dan uji publik framework (9 Okt 2026); EU AI Act (Reg. 2024/1689, diubah Reg. 2026/1744; Komisi Eropa, 19 Okt 2026). Ringkasan, bukan nasihat hukum."
    >
      <div className="grid min-h-0 flex-1 grid-cols-3 items-center gap-[clamp(1rem,2.2vw,2.2rem)]">
        {RULES.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.name}
              className="flex flex-col gap-3 rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-bg">
                    <Icon size={15} />
                  </span>
                  <span className="font-mono text-[0.5rem] tracking-[0.12em] text-ink-faint uppercase">
                    {rule.scope}
                  </span>
                </div>
                <p className="mt-3 font-display text-[clamp(1.05rem,1.4vw,1.4rem)] leading-tight">
                  {rule.name}
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-soft">
                  {rule.line}
                </p>

                <ul className="mt-3 space-y-1.5 border-t border-line pt-2.5">
                  {rule.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check size={11} className="mt-0.5 shrink-0 text-accent" />
                      <span className="text-[0.7rem] leading-snug text-ink-soft">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-ink/[0.03] px-2.5 py-2">
                <p className="text-[0.68rem] leading-snug text-ink-faint">
                  {rule.impact}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Reveal delay={0.4} className="mt-3 shrink-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="shrink-0 font-mono text-[0.55rem] tracking-[0.2em] text-accent uppercase">
            Tiga pertanyaan yang harus kamu ajukan
          </span>
          {[
            "Data apa yang masuk ke sistem ini?",
            "Siapa yang menanggung akibatnya?",
            "Bisakah keputusannya dijelaskan?",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-ink/[0.04] px-2.5 py-1 text-[0.7rem] text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

const MYTHS = [
  {
    myth: "AI akan menggantikan semua pekerjaan.",
    fact: "Survei WEF: 40% pemberi kerja berencana mengurangi staf yang skill-nya makin tidak relevan, tapi 85% memprioritaskan upskilling dan 70% akan merekrut skill baru. Itu rencana pemberi kerja, bukan hasil yang sudah terjadi.",
    source: "WEF, 2025",
  },
  {
    myth: "Prompt lebih panjang selalu lebih baik.",
    fact: "Yang penting sinyal, bukan panjang. Cari set informasi terkecil yang mengubah jawaban.",
    source: "Anthropic, 2025",
  },
  {
    myth: "Model lebih besar dan lebih mahal selalu lebih baik.",
    fact: "Artificial Analysis, 24 Okt 2026: Claude Opus 5.5 memimpin (skor 58, $5,98 per tugas uji). MiniMax M3.1 Flash skor 43 dengan $0,22 per tugas. Selisih 15 poin, selisih biaya sekitar 27 kali. Pilih model sesuai tugas.",
    source: "Artificial Analysis, 24 Okt 2026",
  },
  {
    myth: "Kalau gratis, berarti aman.",
    fact: "Layanan gratis sering memakai data untuk perbaikan layanan. Contoh: kebijakan privasi Google (berlaku 16 Okt 2026) membolehkan data Gmail, Drive, dan Foto yang kamu sambungkan ke fitur AI memengaruhi iklan. Baca pengaturan data.",
    source: "The Verge, 23 Okt 2026 · praktik umum, bergantung layanan",
  },
] as const;

export function MythsSlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Aksi"
      title="Empat mitos yang masih beredar"
      lead="Mitos di atas, fakta di bawah, masing-masing dengan sumbernya."
      source="Sumber: WEF Future of Jobs 2025; Anthropic 2025; Artificial Analysis (24 Okt 2026); The Verge (23 Okt 2026). Klaim praktik umum ditandai."
    >
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2.5">
        {MYTHS.map((item, i) => (
          <div
            key={item.myth}
            className="flex flex-col justify-between rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge tone="accent3">mitos</Badge>
                <span className="font-mono text-[0.5rem] text-ink-faint tabular">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-2 font-display text-[clamp(1.1rem,1.55vw,1.55rem)] leading-tight">
                “{item.myth}”
              </p>
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <Badge tone="accent2">fakta</Badge>
              <p className="mt-2 text-[0.8rem] leading-snug text-ink">{item.fact}</p>
              <p className="mt-2 font-mono text-[0.5rem] tracking-[0.12em] text-ink-faint uppercase">
                {item.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

const PLAN = [
  {
    week: "Minggu 1",
    title: "Pahami",
    action: "Baca ulang satu slide per hari. Pilih tiga istilah yang masih kabur.",
    proof: "Bisa menjelaskan cara kerja LLM dalam tiga kalimat tanpa jargon.",
    items: ["Tulis definisi LLM dengan kata sendiri", "Sebutkan tiga pemicu halusinasi", "Catat satu tugas yang paling sering kamu ulang"],
  },
  {
    week: "Minggu 2",
    title: "Pakai harian",
    action: "Pakai AI untuk satu tugas kecil setiap hari, selalu dengan konteks.",
    proof: "Punya catatan lima percobaan, termasuk yang gagal.",
    items: ["Tulis konteks sebelum bertanya", "Uji satu format keluaran", "Simpan satu prompt yang berhasil"],
  },
  {
    week: "Minggu 3",
    title: "Bangun satu alur",
    action: "Ambil tugas paling sering, ubah jadi template, uji lima kasus.",
    proof: "Satu template yang dipakai minimal tiga kali dengan hasil konsisten.",
    items: ["Tulis template empat lapis", "Uji dengan satu input jelek", "Catat dua perbaikan"],
  },
  {
    week: "Minggu 4",
    title: "Pasang gerbang dan ukur",
    action: "Tambahkan satu titik pemeriksaan, satu batas biaya, dan satu log.",
    proof: "Alur berjalan tanpa kamu sentuh, dan kamu tahu hasilnya.",
    items: ["Tetapkan siapa yang menyetujui", "Tentukan batas biaya per tugas", "Baca log sekali seminggu"],
  },
] as const;

export function PlanSlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Aksi"
      title="Rencana 30 hari"
      lead="Empat minggu, satu aksi per minggu, satu bukti per minggu."
      source="Sumber: sintesis dari AILit Framework (2026), praktik context engineering (Anthropic, 2025), dan lima gerbang pada slide otonomi."
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-4 items-center gap-2.5">
          {PLAN.map((week, w) => (
            <div
              key={week.week}
              className="flex flex-col rounded-xl bg-bg-soft/50 p-3.5 shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.5rem] tracking-[0.18em] text-accent uppercase">
                  {week.week}
                </span>
                <span className="font-mono text-[0.5rem] text-ink-faint tabular">
                  0{w + 1}
                </span>
              </div>
              <p className="mt-1 font-display text-[1.15rem] leading-none">
                {week.title}
              </p>
              <p className="mt-1.5 text-[0.7rem] leading-snug text-ink-soft">
                {week.action}
              </p>

              <ul className="mt-2.5 space-y-1.5">
                {week.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-[0.68rem] leading-snug text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-2 border-t border-line pt-2">
                <p className="font-mono text-[0.46rem] tracking-[0.14em] text-ink-faint uppercase">
                  bukti
                </p>
                <p className="mt-0.5 text-[0.66rem] leading-snug text-ink-faint">
                  {week.proof}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex shrink-0 items-center gap-3 border-t border-line pt-3">
          <span className="font-mono text-[0.52rem] tracking-[0.16em] text-accent uppercase">
            mulai
          </span>
          <p className="text-[0.78rem] leading-snug text-ink-soft">
            Pilih satu item untuk besok. Jangan berhenti di minggu ketiga. Setelah
            empat minggu, ajari satu orang lain.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
