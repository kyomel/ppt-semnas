"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Globe, Landmark, Shield } from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { Reveal } from "@/components/motion/containers";
import { FlipCard } from "@/components/ui/controls";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

const RULES = [
  {
    icon: Landmark,
    name: "SKB Tujuh Menteri",
    scope: "Indonesia · 12 Mar 2026",
    line: "Pedoman nasional AI dan teknologi digital di pendidikan, dari PAUD sampai perguruan tinggi.",
    points: [
      "Berlaku di jalur formal, nonformal, dan informal, dengan menghormati otonomi akademik.",
      "Satuan pendidikan menilai kesiapan SDM, infrastruktur, dan tata kelola: data, etika akademik, etika AI.",
      "Koding dan AI: mata pelajaran pilihan sejak 2025/2026, bisa jadi wajib nanti.",
    ],
    impact: "Kalau kamu di kampus: kampus diminta menilai kesiapan dan menyusun tata kelola AI sendiri. Cek aturan di mata kuliahmu.",
  },
  {
    icon: Shield,
    name: "UU PDP",
    scope: "Indonesia · UU 27/2022",
    line: "Batas untuk data pribadi, termasuk yang kamu tempel ke tool AI.",
    points: [
      "Data pribadi butuh dasar pemrosesan yang sah.",
      "Subjek data punya hak akses, koreksi, dan penghapusan.",
      "Kebocoran wajib dilaporkan dalam batas waktu.",
    ],
    impact: "Kalau kamu memakai AI: jangan masukkan data pelanggan ke tool tanpa perjanjian.",
  },
  {
    icon: Globe,
    name: "EU AI Act",
    scope: "Uni Eropa · 2024",
    line: "Rujukan klasifikasi risiko. Relevan kalau produkmu dipakai di pasar EU.",
    points: [
      "Praktik terlarang, risiko tinggi, risiko terbatas, risiko minimal.",
      "Kewajiban transparansi berbeda per tingkat risiko.",
      "Dokumentasi dan pengawasan manusia untuk sistem berisiko tinggi.",
    ],
    impact: "Kalau kamu membangun produk: klasifikasikan risikonya sebelum menulis kode.",
  },
] as const;

export function RulesSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Aksi"
      title="Aturan main: tiga lapis yang perlu kamu tahu"
      lead="Kamu tidak perlu menghafal pasal. Cukup tahu lapis mana yang menyentuh pekerjaanmu."
      source="Sumber: Keputusan Bersama Tujuh Menteri tentang Pedoman Pemanfaatan dan Pembelajaran Teknologi Digital dan Kecerdasan Artifisial (12 Mar 2026; Kemendikdasmen, Komdigi); UU 27/2022 tentang Pelindungan Data Pribadi; EU AI Act (2024). Ringkasan, bukan nasihat hukum."
    >
      <div className="grid min-h-0 flex-1 grid-cols-3 items-center gap-[clamp(1rem,2.2vw,2.2rem)]">
        {RULES.map((rule, i) => {
          const Icon = rule.icon;
          const isActive = i === active;
          return (
            <button
              key={rule.name}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "flex flex-col gap-3 rounded-xl p-4 text-left transition-all duration-300",
                isActive
                  ? "bg-bg-soft/80 shadow-[inset_0_0_0_1.5px_var(--accent)]"
                  : "bg-bg-soft/40 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-bg-soft/60",
              )}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-md transition-colors",
                      isActive ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                    )}
                  >
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

                <motion.ul
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.45 }}
                  className="mt-3 space-y-1.5 border-t border-line pt-2.5"
                >
                  {rule.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check
                        size={11}
                        className={cn(
                          "mt-0.5 shrink-0",
                          isActive ? "text-accent" : "text-ink-faint",
                        )}
                      />
                      <span className="text-[0.7rem] leading-snug text-ink-soft">
                        {point}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </div>

              <div className="mt-3 rounded-lg bg-ink/[0.03] px-2.5 py-2">
                <p className="text-[0.68rem] leading-snug text-ink-faint">
                  {rule.impact}
                </p>
              </div>
            </button>
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
    myth: "AI tahu segalanya.",
    fact: "AI memprediksi kelanjutan teks. Ia tidak punya basis data fakta yang terjamin.",
    source: "CSET, 2024",
  },
  {
    myth: "AI akan menggantikan semua pekerjaan.",
    fact: "40% perusahaan memperkirakan pengurangan staf di area yang bisa diotomasi, tapi 85% memprioritaskan upskilling dan 70% merekrut skill baru.",
    source: "WEF, 2025",
  },
  {
    myth: "Prompt lebih panjang selalu lebih baik.",
    fact: "Yang penting sinyal, bukan panjang. Cari set informasi terkecil yang mengubah jawaban.",
    source: "Anthropic, 2025",
  },
  {
    myth: "AI berpikir seperti manusia.",
    fact: "Tidak ada niat, pengalaman, atau pemahaman. Ada pola, probabilitas, dan konteks.",
    source: "CSET, 2024",
  },
  {
    myth: "Model lebih besar selalu lebih baik.",
    fact: "Pekan 19-22 Okt 2026: model murah dan cepat bersaing. M3.1 Flash $0,15 per juta token; Mercury 3 mengklaim 1.068 token per detik dan menyaingi model cepat kelas atas.",
    source: "MiniMax, Inception Labs, 2026",
  },
  {
    myth: "Kalau gratis, berarti aman.",
    fact: "Layanan gratis sering memakai data untuk perbaikan layanan. Baca pengaturan data, dan matikan opsi pelatihan kalau ada.",
    source: "Praktik umum, bergantung layanan",
  },
] as const;

export function MythsSlide({ index }: { index: number }) {
  const [flipped, setFlipped] = useState<number[]>([]);

  return (
    <SlideShell
      index={index}
      eyebrow="Aksi"
      title="Enam mitos yang masih beredar"
      lead="Klik kartu untuk melihat faktanya."
      source="Sumber: WEF Future of Jobs 2025; CSET Georgetown 2024; Anthropic 2025; MiniMax dan Inception Labs Okt 2026. Klaim praktik umum ditandai."
    >
      <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2.5">
        {MYTHS.map((item, i) => (
          <div key={item.myth} className="relative">
            <FlipCard
              height="h-full"
              onFlip={(isFlipped) =>
                setFlipped((prev) =>
                  isFlipped ? [...new Set([...prev, i])] : prev.filter((v) => v !== i),
                )
              }
              front={
                <>
                  <div className="flex items-center justify-between">
                    <Badge tone="accent3">mitos</Badge>
                    <span className="font-mono text-[0.5rem] text-ink-faint tabular">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="font-display text-[clamp(1rem,1.35vw,1.35rem)] leading-tight">
                    “{item.myth}”
                  </p>
                  <span className="font-mono text-[0.5rem] tracking-[0.14em] text-ink-faint uppercase">
                    klik untuk fakta
                  </span>
                </>
              }
              back={
                <>
                  <div>
                    <Badge tone="accent2">fakta</Badge>
                    <p className="mt-2 text-[0.76rem] leading-snug text-ink">
                      {item.fact}
                    </p>
                  </div>
                  <span className="font-mono text-[0.5rem] tracking-[0.12em] text-ink-faint uppercase">
                    {item.source}
                  </span>
                </>
              }
            />
          </div>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-2 shrink-0">
        <p className="font-mono text-[0.54rem] tracking-[0.12em] text-ink-faint uppercase">
          {flipped.length} dari 6 dibuka
        </p>
      </Reveal>
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
  const [done, setDone] = useState<string[]>([]);
  const totalItems = PLAN.reduce((sum, week) => sum + week.items.length, 0);
  const progress = done.length / totalItems;

  const toggle = (key: string) =>
    setDone((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );

  return (
    <SlideShell
      index={index}
      eyebrow="Aksi"
      title="Rencana 30 hari"
      lead="Empat minggu, satu aksi per minggu, satu bukti per minggu. Centang yang sudah kamu kerjakan."
      source="Sumber: sintesis dari AILit Framework (2026), praktik context engineering (Anthropic, 2025), dan pola gerbang pada slide sebelumnya."
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

              <div className="mt-2.5 space-y-1">
                {week.items.map((item) => {
                  const key = `${w}-${item}`;
                  const checked = done.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggle(key)}
                      className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left transition-colors hover:bg-ink/[0.04]"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border transition-colors",
                          checked
                            ? "border-accent bg-accent text-bg"
                            : "border-line-strong",
                        )}
                      >
                        {checked ? <Check size={9} strokeWidth={3} /> : null}
                      </span>
                      <span
                        className={cn(
                          "text-[0.68rem] leading-snug transition-colors",
                          checked ? "text-ink-faint line-through" : "text-ink-soft",
                        )}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>

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

        <div className="mt-2.5 flex shrink-0 items-center gap-3">
          <span className="font-mono text-[0.52rem] tracking-[0.16em] text-ink-faint uppercase">
            progres
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.45, ease }}
            />
          </div>
          <span className="font-mono text-[0.62rem] text-ink tabular">
            {done.length}/{totalItems}
          </span>
          <span className="text-[0.7rem] text-ink-faint">
            {progress === 1
              ? "Selesai. Sekarang ajari satu orang lain."
              : progress > 0.5
                ? "Lebih dari separuh. Jangan berhenti di minggu ketiga."
                : "Mulai dari satu item hari ini."}
          </span>
        </div>
      </div>
    </SlideShell>
  );
}
