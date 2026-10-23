"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
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
  RotateCcw,
  Shapes,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal } from "@/components/motion/containers";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

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
  const domain = DOMAINS[active];

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
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center">
            <p className="font-mono text-[0.54rem] tracking-[0.16em] text-ink-faint uppercase">
              klik simpul untuk memilih domain
            </p>
          </div>
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
                </span>
              </button>
            );
          })}

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease }}
            className="mt-1 flex items-start gap-2.5 rounded-lg bg-bg-soft/60 px-3.5 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <Badge tone="accent">contoh</Badge>
            <p className="text-[0.76rem] leading-snug text-ink-soft">{domain.example}</p>
          </motion.div>
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
  const [active, setActive] = useState(1);
  const level = LEVELS[active];
  const Icon = level.icon;

  return (
    <SlideShell
      index={index}
      eyebrow="Model mental"
      title="Tangga lima level: awam ke advanced"
      lead="Level bukan jumlah tool yang kamu tahu, tapi seberapa jauh kamu bisa mempercayakan kerja tanpa kehilangan kendali."
      source="Sumber: sintesis dari AILit Framework (2026), HAIML (2026), dan dimensi otonomi agent (Springer, 2026). Bukan skala resmi."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0">
          <SceneCanvas kind="stairs" active={active} onPick={setActive} camera={[0, 0.2, 5.2]} />
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center">
            <p className="font-mono text-[0.54rem] tracking-[0.16em] text-ink-faint uppercase">
              klik blok untuk naik level
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-col justify-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {LEVELS.map((item, i) => {
              const LevelIcon = item.icon;
              const isActive = i === active;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.68rem] transition-all duration-300",
                    isActive
                      ? "bg-ink text-bg"
                      : "bg-ink/5 text-ink-soft hover:bg-ink/10",
                  )}
                >
                  <LevelIcon size={11} />
                  {item.name}
                </button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-bg">
                <Icon size={16} />
              </span>
              <div>
                <p className="font-mono text-[0.54rem] tracking-[0.18em] text-ink-faint uppercase">
                  Level {active + 1}
                </p>
                <p className="font-display text-[1.35rem] leading-none">{level.name}</p>
              </div>
            </div>

            <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-soft">
              {level.behavior}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3">
              <div>
                <p className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
                  Keterampilan kunci
                </p>
                <p className="mt-0.5 text-[0.76rem] leading-snug">{level.skill}</p>
              </div>
              <div>
                <p className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
                  Bukti naik level
                </p>
                <p className="mt-0.5 text-[0.76rem] leading-snug">{level.proof}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-2.5 rounded-lg border border-line px-3.5 py-2.5">
            <span className="shrink-0 font-mono text-[0.5rem] tracking-[0.16em] text-accent uppercase">
              berikutnya
            </span>
            <p className="text-[0.74rem] leading-snug text-ink-soft">
              {active < LEVELS.length - 1
                ? `${LEVELS[active + 1].name}: ${LEVELS[active + 1].skill}.`
                : "Kamu di puncak tangga. Sekarang tugasmu mengajar orang lain."}
            </p>
          </div>
        </div>
      </div>
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
  const [open, setOpen] = useState<number | null>(0);

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
          const isOpen = open === i;
          return (
            <button
              key={trap.title}
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl p-4 text-left transition-colors duration-300",
                isOpen
                  ? "bg-bg-soft/80 shadow-[inset_0_0_0_1.5px_var(--accent)]"
                  : "bg-bg-soft/50 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-bg-soft/70",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-md transition-colors",
                    isOpen ? "bg-accent text-bg" : "bg-ink/5 text-ink-soft",
                  )}
                >
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

              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.36, ease }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-md bg-ink/[0.04] px-2 py-1.5">
                  <p className="text-[0.68rem] leading-snug text-ink-faint">
                    {trap.example}
                  </p>
                </div>
              </motion.div>

              <span className="mt-auto pt-2 font-mono text-[0.48rem] tracking-[0.14em] text-ink-faint uppercase">
                {isOpen ? "contoh terbuka" : "klik untuk contoh"}
              </span>
            </button>
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

const CHECKS = [
  {
    q: "Saya punya satu tugas rutin yang saya serahkan ke AI, bukan hanya saya coba sekali.",
    weights: [0, 1, 2],
  },
  {
    q: "Saya bisa menyebutkan konteks, batasan, dan format sebelum AI menjawab.",
    weights: [0, 1, 2],
  },
  {
    q: "Saya memeriksa klaim penting dari AI sebelum memakainya.",
    weights: [0, 1, 2],
  },
  {
    q: "Saya punya template atau alur yang saya pakai berulang dengan hasil konsisten.",
    weights: [0, 1, 2],
  },
  {
    q: "Ada orang lain yang memakai sistem AI yang saya susun atau saya ajarkan.",
    weights: [0, 1, 2],
  },
] as const;

export function SelfCheckSlide({ index }: { index: number }) {
  const [answers, setAnswers] = useState<Array<number | null>>([null, null, null, null, null]);
  const answered = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
  const done = answered === CHECKS.length;
  const levelIndex = Math.min(4, Math.floor(score / 2.4));
  const level = LEVELS[levelIndex];
  const LevelIcon = level.icon;

  return (
    <SlideShell
      index={index}
      eyebrow="Model mental"
      title="Di level mana kamu sekarang?"
      lead="Jawab lima pertanyaan ini dengan jujur. Hasilnya bukan penilaian, tapi titik mulai."
      source="Sumber: indikator disusun dari tangga lima level pada slide sebelumnya. Bukan instrumen tervalidasi."
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-[clamp(1.5rem,3vw,3rem)]">
          <div className="flex flex-col justify-center">
            {CHECKS.map((check, i) => (
              <Reveal key={check.q} delay={0.1 + i * 0.05} y={10}>
                <div className="flex items-center gap-3 border-b border-line py-3 first:border-t">
                  <span className="font-mono text-[0.55rem] text-ink-faint tabular">
                    0{i + 1}
                  </span>
                  <p className="flex-1 text-[0.84rem] leading-snug text-ink-soft">
                    {check.q}
                  </p>
                  <div className="flex shrink-0 gap-1">
                    {["Belum", "Kadang", "Sudah"].map((label, value) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          const next = [...answers];
                          next[i] = value;
                          setAnswers(next);
                        }}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[0.64rem] transition-colors",
                          answers[i] === value
                            ? "bg-ink text-bg"
                            : "bg-ink/5 text-ink-faint hover:bg-ink/10 hover:text-ink-soft",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div
              className={cn(
                "rounded-xl p-4 transition-colors duration-500",
                done
                  ? "bg-accent-soft shadow-[inset_0_0_0_1.5px_var(--accent)]"
                  : "bg-bg-soft/50 shadow-[inset_0_0_0_1px_var(--line)]",
              )}
            >
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-bg">
                      <LevelIcon size={16} />
                    </span>
                    <div>
                      <p className="font-mono text-[0.52rem] tracking-[0.18em] text-accent uppercase">
                        Level {levelIndex + 1}
                      </p>
                      <p className="font-display text-[1.3rem] leading-none">{level.name}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[0.78rem] leading-snug text-ink-soft">
                    Langkah berikutnya:{" "}
                    <span className="font-medium text-ink">{level.skill}</span>.
                  </p>
                  <p className="mt-1.5 text-[0.72rem] leading-snug text-ink-faint">
                    {level.proof}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAnswers([null, null, null, null, null])}
                    className="mt-3 flex items-center gap-1.5 font-mono text-[0.54rem] tracking-[0.14em] text-ink-faint uppercase transition-colors hover:text-ink"
                  >
                    <RotateCcw size={11} /> ulangi
                  </button>
                </motion.div>
              ) : (
                <div>
                  <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                    progres
                  </p>
                  <p className="mt-1 font-display text-[2rem] leading-none">
                    {answered}
                    <span className="text-ink-faint">/5</span>
                  </p>
                  <div className="mt-2 flex gap-1">
                    {CHECKS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          answers[i] !== null ? "bg-accent" : "bg-ink/10",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[0.72rem] leading-snug text-ink-faint">
                    Jawab semua untuk melihat levelmu
                    <ArrowRight size={11} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 rounded-lg bg-bg-soft/50 px-4 py-3 shadow-[inset_0_0_0_1px_var(--line)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.5rem] tracking-[0.18em] text-ink-faint uppercase">
              skala level
            </span>
            <span className="font-mono text-[0.5rem] tracking-[0.14em] text-ink-faint uppercase">
              {done ? `posisimu: ${level.name}` : "jawab untuk melihat posisi"}
            </span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {LEVELS.map((item, i) => (
              <div key={item.name} className="flex-1">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-colors duration-500",
                    done && i === levelIndex
                      ? "bg-accent"
                      : done && i < levelIndex
                        ? "bg-accent/35"
                        : "bg-ink/10",
                  )}
                />
                <p
                  className={cn(
                    "mt-1 text-[0.62rem] leading-tight transition-colors",
                    done && i === levelIndex
                      ? "font-medium text-ink"
                      : "text-ink-faint",
                  )}
                >
                  {i + 1}. {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
