"use client";

import { useState } from "react";
import {
  ClipboardX,
  Compass,
  Crown,
  EyeOff,
  FlaskConical,
  Footprints,
  Hammer,
  MessageSquareOff,
  MousePointerClick,
  Palette,
  Shapes,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { SlideShell } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal } from "@/components/motion/containers";
import { cn } from "@/lib/cn";

const DOMAINS = [
  {
    name: "Engage",
    full: "Engage with AI",
    icon: Compass,
    line: "Paham peran AI di hidupmu, dan menilai informasinya secara kritis.",
    example: "Kamu tahu sebuah berita mungkin dibuat dengan AI, dan memeriksa sumbernya.",
  },
  {
    name: "Create",
    full: "Create with AI",
    icon: Palette,
    line: "Memakai AI sebagai mitra kreatif tanpa menyerahkan suara dan penilaianmu.",
    example: "Kamu memakai AI untuk draf, tapi argumen dan pilihan kata akhir tetap milikmu.",
  },
  {
    name: "Manage",
    full: "Manage AI",
    icon: SlidersHorizontal,
    line: "Membagi kerja antara manusia dan AI secara sengaja, bukan karena kebiasaan.",
    example: "Kamu tahu tugas mana yang diserahkan penuh, mana yang harus kamu kerjakan sendiri.",
  },
  {
    name: "Shape",
    full: "Shape AI",
    icon: Shapes,
    line: "Ikut memperbaiki sistem AI agar mencerminkan nilai manusia.",
    example: "Kamu menulis aturan pemakaian AI di timmu, atau membangun tool kecil untuk kebutuhan sendiri.",
  },
] as const;

export function DomainsSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Model mental"
      title="Empat domain literasi AI"
      lead="Literasi itu jalur, bukan daftar: Engage dulu, Create dan Manage sejajar, Shape terakhir."
      source="Sumber: OECD & European Commission, AILit Framework (Juni 2026). Setiap domain berisi Knowledge, Skills, dan Attitudes."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0">
          <SceneCanvas kind="orbit" active={active} onPick={setActive} camera={[0, 0, 8.2]} />
        </div>

        <div className="flex flex-col justify-center gap-2">
          {DOMAINS.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-start gap-3 rounded-lg border-l-2 py-2.5 pr-3 pl-3.5 text-left transition-all duration-300",
                  isActive
                    ? "border-accent bg-accent-soft/40"
                    : "border-transparent hover:border-line-strong hover:bg-ink/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors",
                    isActive ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                  )}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.55rem] tracking-[0.16em] text-ink-faint">
                      0{i + 1}
                    </span>
                    <span className="text-[0.88rem] font-medium">{item.full}</span>
                  </span>
                  <span className="mt-0.5 block text-[0.76rem] leading-snug text-ink-soft">
                    {item.line}
                  </span>
                  <span className="mt-1 block text-[0.72rem] leading-snug text-ink-faint">
                    <span className="mr-1.5 font-mono text-[0.5rem] tracking-[0.16em] text-accent uppercase">
                      contoh
                    </span>
                    {item.example}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

const LEVELS = [
  {
    name: "Penonton",
    icon: Footprints,
    behavior: "Belum memakai, atau mencoba sekali lalu berhenti. Ragu karena takut salah.",
    skill: "Satu tugas nyata",
    proof: "Menyelesaikan satu tugas kecil dengan AI dan bisa menjelaskan hasilnya.",
  },
  {
    name: "Operator",
    icon: MousePointerClick,
    behavior: "Memakai chat untuk tugas tunggal. Hasil dipakai apa adanya, jarang dicek.",
    skill: "Memberi konteks",
    proof: "Bisa menyebutkan konteks, batasan, dan format yang kamu minta.",
  },
  {
    name: "Power user",
    icon: Zap,
    behavior: "Punya alur berulang, memverifikasi klaim, menyimpan yang bekerja.",
    skill: "Pola yang bisa diulang",
    proof: "Punya 3 template yang dipakai rutin dan hasilnya konsisten.",
  },
  {
    name: "Builder",
    icon: Hammer,
    behavior: "Menyusun sistem: template, tool, agent dengan gerbang izin dan biaya.",
    skill: "Merancang alur",
    proof: "Satu alur berjalan tanpa kamu sentuh tiap hari, dengan log dan batas biaya.",
  },
  {
    name: "Shaper",
    icon: Crown,
    behavior: "Mengubah cara tim bekerja, menulis aturan, mengajar orang lain.",
    skill: "Mengubah sistem",
    proof: "Ada orang lain yang naik level karena sistem yang kamu buat.",
  },
] as const;

export function LadderSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Model mental"
      title="Tangga lima level: awam ke advanced"
      lead="Level bukan jumlah tool yang kamu tahu, tapi seberapa jauh kamu bisa mempercayakan kerja tanpa kehilangan kendali."
      source="Sumber: sintesis dari AILit Framework (2026), HAIML (2026), dan dimensi otonomi agent (Springer, 2026). Bukan skala resmi."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0">
          <SceneCanvas kind="stairs" active={active} onPick={setActive} camera={[0, 0.2, 8]} />
        </div>

        <div className="flex min-h-0 flex-col justify-center">
          {LEVELS.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-start gap-3 border-t border-line py-2.5 text-left transition-colors last:border-b",
                  isActive ? "border-line-strong bg-accent-soft/30" : "hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 ml-1 grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors",
                    isActive ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                  )}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0 pr-2">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-mono text-[0.55rem] tracking-[0.16em] text-ink-faint">
                      L{i + 1}
                    </span>
                    <span className="text-[0.9rem] font-medium">{item.name}</span>
                    <span className="text-[0.7rem] text-accent">· {item.skill}</span>
                  </span>
                  <span className="mt-0.5 block text-[0.76rem] leading-snug text-ink-soft">
                    {item.behavior}
                  </span>
                  <span className="mt-1 block text-[0.72rem] leading-snug text-ink-faint">
                    <span className="mr-1.5 font-mono text-[0.5rem] tracking-[0.16em] text-accent uppercase">
                      bukti naik level
                    </span>
                    {item.proof}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Reveal delay={0.4} className="mt-3 shrink-0">
        <div className="flex items-center gap-3 border-t border-line pt-3">
          <span className="shrink-0 font-mono text-[0.55rem] tracking-[0.2em] text-accent uppercase">
            cek posisimu
          </span>
          <p className="text-[0.8rem] leading-snug text-ink-soft">
            Baca kolom bukti, lalu jawab dalam hati: anak tangga mana yang sudah kamu
            pegang? Ini bukan penilaian, hanya titik mulai.
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
}

const TRAPS = [
  {
    icon: EyeOff,
    title: "Menganggap AI oracle",
    symptom: "Kalau AI bilang begitu, berarti begitu.",
    cure: "Perlakukan sebagai rekan magang yang cepat tapi belum tahu konteksmu.",
    example: "Mengutip angka dari chatbot di rapat tanpa mengecek asalnya.",
  },
  {
    icon: FlaskConical,
    title: "Menilai dari satu percobaan",
    symptom: "Sudah coba sekali, hasilnya jelek, berarti AI tidak berguna.",
    cure: "Ubah satu variabel tiap percobaan: konteks, format, atau contoh.",
    example: "Mencoba sekali, hasilnya kaku, lalu menyimpulkan AI tidak bisa menulis.",
  },
  {
    icon: ClipboardX,
    title: "Menyerahkan tanpa membaca",
    symptom: "Copy, paste, kirim. Tidak ada yang membaca di antaranya.",
    cure: "Tetapkan satu titik pemeriksaan sebelum hasil keluar dari tanganmu.",
    example: "Laporan terkirim ke klien dengan nama yang salah.",
  },
  {
    icon: MessageSquareOff,
    title: "Berhenti di kotak chat",
    symptom: "Tiga tahun pakai AI, tapi tidak pernah punya satu alur yang berjalan sendiri.",
    cure: "Ambil satu tugas berulang, jadikan template, lalu jadikan sistem.",
    example: "Punya 40 riwayat chat, tapi tidak satu pun yang dipakai ulang.",
  },
] as const;

export function TrapsSlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Model mental"
      title="Empat jebakan yang menahan orang di level awam"
      lead="Semua orang pernah terjebak. Bedanya: jebakannya disadari atau tidak."
      source="Sumber: disusun dari temuan over-reliance (Zhu & Li, 2026), riset cognitive debt (MIT Media Lab, 2025), dan AILit Framework (2026)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-4 items-center gap-2.5">
        {TRAPS.map((trap, i) => {
          const Icon = trap.icon;
          return (
            <div
              key={trap.title}
              className="flex flex-col rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-bg">
                  <Icon size={15} />
                </span>
                <span className="font-mono text-[0.5rem] text-ink-faint tabular">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-3 text-[0.95rem] leading-tight font-medium">
                {trap.title}
              </p>
              <p className="mt-1.5 text-[0.78rem] leading-snug text-ink-faint">
                “{trap.symptom}”
              </p>

              <div className="mt-3 border-t border-line pt-2.5">
                <p className="font-mono text-[0.5rem] tracking-[0.16em] text-accent uppercase">
                  obat
                </p>
                <p className="mt-1 text-[0.8rem] leading-snug text-ink-soft">
                  {trap.cure}
                </p>
              </div>

              <div className="mt-3 rounded-md bg-ink/[0.04] px-2 py-1.5">
                <p className="text-[0.68rem] leading-snug text-ink-faint">
                  {trap.example}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Reveal delay={0.4} className="mt-3 shrink-0">
        <div className="flex items-center gap-3 border-t border-line pt-3">
          <span className="shrink-0 font-mono text-[0.55rem] tracking-[0.2em] text-accent uppercase">
            akar bersama
          </span>
          <p className="text-[0.8rem] leading-snug text-ink-soft">
            Keempatnya berakhir sama: kamu berhenti bertanya, lalu mulai menerima.
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
}

