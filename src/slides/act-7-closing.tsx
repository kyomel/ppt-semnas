"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { SceneCanvas } from "@/components/three/scene-host";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SplitText } from "@/components/motion/text";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/containers";
import { PointerGlow } from "@/components/motion/interactive";
import { cn } from "@/lib/cn";
import { deck } from "@/config/deck";
import { ease } from "@/config/theme";

const FLOW = [
  {
    name: "Tentukan tujuan",
    line: "Apa yang harus selesai, untuk siapa, dan bagaimana kamu tahu itu berhasil.",
  },
  {
    name: "Kumpulkan konteks",
    line: "Data, aturan, dan contoh yang tidak dimiliki model.",
  },
  {
    name: "Minta dengan format",
    line: "Bentuk keluaran yang bisa langsung kamu pakai, bukan yang harus kamu rapikan.",
  },
  {
    name: "Verifikasi klaim",
    line: "Buka sumbernya, atau tandai sebagai draf. Jangan pernah keduanya tidak.",
  },
  {
    name: "Simpan yang bekerja",
    line: "Template yang berhasil tiga kali lebih berharga daripada sepuluh percobaan.",
  },
  {
    name: "Otomatiskan yang berulang",
    line: "Dengan gerbang izin, batas biaya, dan log yang kamu baca.",
  },
] as const;

export function RecapSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Rangkuman"
      title="Enam langkah yang bisa kamu ulang besok"
      lead="Ini bukan proses linear. Kamu akan kembali ke langkah dua dan empat berkali-kali. Yang penting urutannya jelas."
      source="Sumber: sintesis seluruh deck, dari AILit Framework (2026), context engineering (Anthropic, 2025), riset over-reliance (2026), dan praktik agent (2026)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0">
          <SceneCanvas kind="flow" active={active} onPick={setActive} camera={[0, 0, 8.4]} />
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center">
            <p className="font-mono text-[0.54rem] tracking-[0.16em] text-ink-faint uppercase">
              klik simpul untuk detail
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Stagger className="flex flex-col">
            {FLOW.map((step, i) => {
              const isActive = i === active;
              return (
                <StaggerItem key={step.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-start gap-3 border-t border-line py-2 text-left transition-colors last:border-b",
                      isActive ? "border-line-strong" : "hover:border-line-strong",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 font-mono text-[0.54rem] tabular transition-colors",
                        isActive ? "text-accent" : "text-ink-faint",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-[0.82rem] transition-colors",
                          isActive ? "font-medium text-ink" : "text-ink-soft",
                        )}
                      >
                        {step.name}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.32, ease }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-0.5 block text-[0.72rem] leading-snug text-ink-faint">
                          {step.line}
                        </span>
                      </motion.span>
                    </span>
                    <ArrowRight
                      size={12}
                      className={cn(
                        "mt-1 shrink-0 transition-all duration-300",
                        isActive
                          ? "translate-x-0 text-accent opacity-100"
                          : "-translate-x-1 text-ink-faint opacity-0",
                      )}
                    />
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-accent-soft/40 px-3.5 py-2.5">
            <Workflow size={12} className="shrink-0 text-accent" />
            <p className="text-[0.72rem] leading-snug text-ink-soft">
              Langkah 1-3 adalah soal memberi konteks. Langkah 4-6 adalah soal
              menjaga kendali. Keduanya sama pentingnya.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const ROLES = ["Analis data", "Editor", "Guru", "Manajer produk"] as const;
const GOALS = [
  "merangkum 20 keluhan pelanggan",
  "menyusun rencana belajar satu bulan",
  "menulis pengumuman perubahan jadwal",
] as const;
const CONTEXTS = [
  "Data mentahnya dari chat pelanggan",
  "Aturan internal melarang menyebut nama",
  "Ada contoh ringkasan yang disukai",
] as const;
const FORMATS = ["Tabel tiga kolom", "Daftar berpoin", "Dua paragraf pendek"] as const;

const OUTPUTS: Record<number, { title: string; body: string; tone: string }> = {
  0: {
    title: "Jawaban terlalu umum",
    body: "Model tidak tahu kamu sedang mengerjakan apa, untuk siapa, dan dalam bentuk apa. Hasilnya berupa saran umum yang harus kamu tulis ulang dari awal.",
    tone: "accent3",
  },
  1: {
    title: "Arah benar, isi kabur",
    body: "Tujuan sudah jelas, tapi model masih menebak konteksnya. Kamu akan menghabiskan lebih banyak waktu menyunting daripada menulis sendiri.",
    tone: "accent3",
  },
  2: {
    title: "Bisa dipakai, perlu disunting",
    body: "Konteks sudah masuk, tapi bentuk keluarannya belum cocok. Sekitar separuh isi bisa dipakai, separuh lagi harus dirapikan.",
    tone: "neutral",
  },
  3: {
    title: "Hampir siap kirim",
    body: "Tujuan, konteks, dan format sudah selaras. Sisa pekerjaanmu: verifikasi dua klaim dan sesuaikan satu nama.",
    tone: "accent2",
  },
  4: {
    title: "Siap dipakai, tetap diverifikasi",
    body: "Model mengembalikan tiga kelompok masalah, jumlah keluhan per kelompok, satu kutipan contoh, dan tingkat keyakinan. Kamu hanya perlu memeriksa sumbernya.",
    tone: "accent2",
  },
};

export function DemoSlide({ index }: { index: number }) {
  const [role, setRole] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [contexts, setContexts] = useState<string[]>([]);
  const [format, setFormat] = useState<string | null>(null);
  const [ran, setRan] = useState(false);

  const score =
    (role ? 1 : 0) + (goal ? 1 : 0) + (contexts.length > 0 ? 1 : 0) + (format ? 1 : 0);
  const output = OUTPUTS[score];

  const prompt = [
    role ? `Kamu ${role.toLowerCase()} yang berpengalaman.` : null,
    goal ? `Tujuan: ${goal}.` : null,
    contexts.length > 0 ? `Konteks: ${contexts.join(". ")}.` : null,
    format ? `Format: ${format.toLowerCase()}.` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const reset = () => {
    setRole(null);
    setGoal(null);
    setContexts([]);
    setFormat(null);
    setRan(false);
  };

  return (
    <SlideShell
      index={index}
      eyebrow="Demo"
      title="Prompt Forge: rakit satu permintaan, lihat bedanya"
      lead="Pilih peran, tujuan, konteks, dan format. Perhatikan bagaimana kualitas keluaran berubah. Inti bercahaya di tengah menandakan berapa lapis yang sudah terisi."
      source="Demo edukatif. Keluaran di kanan adalah simulasi untuk menunjukkan efek kelengkapan konteks, bukan respons model sungguhan."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)_minmax(0,1.02fr)] gap-[clamp(0.8rem,1.6vw,1.6rem)]">
        <div className="scroll-thin flex min-h-0 flex-col gap-2 overflow-y-auto pr-1">
          <Group label="1 · Peran">
            {ROLES.map((item) => (
              <Chip
                key={item}
                active={role === item}
                onClick={() => {
                  setRole(item);
                  setRan(false);
                }}
              >
                {item}
              </Chip>
            ))}
          </Group>

          <Group label="2 · Tujuan">
            {GOALS.map((item) => (
              <Chip
                key={item}
                active={goal === item}
                onClick={() => {
                  setGoal(item);
                  setRan(false);
                }}
              >
                {item}
              </Chip>
            ))}
          </Group>

          <Group label="3 · Konteks (bisa lebih dari satu)">
            {CONTEXTS.map((item) => (
              <Chip
                key={item}
                active={contexts.includes(item)}
                onClick={() => {
                  setContexts((prev) =>
                    prev.includes(item)
                      ? prev.filter((value) => value !== item)
                      : [...prev, item],
                  );
                  setRan(false);
                }}
              >
                {item}
              </Chip>
            ))}
          </Group>

          <Group label="4 · Format">
            {FORMATS.map((item) => (
              <Chip
                key={item}
                active={format === item}
                onClick={() => {
                  setFormat(item);
                  setRan(false);
                }}
              >
                {item}
              </Chip>
            ))}
          </Group>
        </div>

        <div className="relative min-h-0">
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,var(--accent-soft),transparent_62%)] opacity-70" />
          <SceneCanvas kind="forge" level={score / 4} camera={[0, 0, 5.6]} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 w-4 rounded-full transition-colors duration-300",
                    i < score ? "bg-accent" : "bg-ink/12",
                  )}
                />
              ))}
            </div>
            <span className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
              {score}/4 lapis
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              prompt tersusun
            </span>
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1 font-mono text-[0.5rem] tracking-[0.14em] text-ink-faint uppercase transition-colors hover:text-ink"
            >
              <RotateCcw size={10} /> reset
            </button>
          </div>

          <div className="min-h-[6.5rem] rounded-xl bg-bg-soft/60 p-3 shadow-[inset_0_0_0_1px_var(--line)]">
            {prompt ? (
              <p className="font-mono text-[0.68rem] leading-relaxed whitespace-pre-line text-ink-soft">
                {prompt}
              </p>
            ) : (
              <p className="font-mono text-[0.68rem] leading-relaxed text-ink-faint">
                Belum ada isi. Mulai dari peran di kiri.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setRan(true)}
            className="group flex items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-[0.72rem] font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            <Play size={12} />
            Jalankan simulasi
          </button>

          <div className="min-h-0 flex-1">
            {ran ? (
              <motion.div
                key={score}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className={cn(
                  "h-full rounded-xl p-3.5",
                  output.tone === "accent2"
                    ? "bg-accent-2-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-2)]"
                    : output.tone === "accent3"
                      ? "bg-accent-3-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent-3)]"
                      : "bg-bg-soft/70 shadow-[inset_0_0_0_1px_var(--line)]",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-ink-soft" />
                  <p className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
                    keluaran simulasi
                  </p>
                </div>
                <p className="mt-1.5 text-[0.82rem] font-medium">{output.title}</p>
                <p className="mt-1 text-[0.74rem] leading-relaxed text-ink-soft">
                  {output.body}
                </p>
              </motion.div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line">
                <Target size={14} className="text-ink-faint" />
                <p className="max-w-[20ch] text-center text-[0.7rem] leading-snug text-ink-faint">
                  Jalankan untuk melihat perbedaan kualitas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[0.48rem] tracking-[0.16em] text-ink-faint uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 rounded-md px-2 py-1 text-[0.66rem] leading-tight transition-colors",
        active
          ? "bg-accent text-bg"
          : "bg-ink/5 text-ink-soft hover:bg-ink/10 hover:text-ink",
      )}
    >
      {active ? <Check size={9} strokeWidth={3} /> : null}
      {children}
    </button>
  );
}

export function QaSlide() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-bg text-ink">
      <div className="grain" aria-hidden />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_46%,transparent_16%,black_58%)]">
        <SceneCanvas kind="veil" className="opacity-55" />
      </div>
      <PointerGlow className="opacity-40" size={820} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[clamp(2rem,4.4vw,4.75rem)] pb-[clamp(4rem,8vh,5.5rem)] text-center">
        <motion.p
          className="font-mono text-[0.62rem] tracking-[0.3em] text-accent uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Sesi tanya jawab
        </motion.p>

        <h2 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.94]">
          <SplitText text="Pertanyaan?" delay={0.15} stagger={0.05} />
        </h2>

        <Reveal delay={0.5}>
          <p className="mt-5 max-w-[46ch] text-[clamp(0.9rem,1.1vw,1.1rem)] leading-relaxed text-ink-soft">
            Kalau bingung mau mulai dari mana: sebutkan satu tugas yang paling sering
            kamu ulang, dan kita cari levelnya bersama.
          </p>
        </Reveal>

        <Reveal delay={0.65}>
          <div className="mt-8 flex items-center gap-3 rounded-full bg-bg-soft/70 px-5 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-bg">
              <span className="font-display text-[0.8rem] leading-none">
                {deck.speaker.slice(0, 1).toUpperCase()}
              </span>
            </span>
            <span className="text-[0.82rem] font-medium whitespace-nowrap">{deck.speaker}</span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="font-mono text-[0.62rem] tracking-[0.1em] text-ink-faint">
              {deck.handle}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.72}>
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-bg-soft/70 px-4 py-3 shadow-[inset_0_0_0_1px_var(--line)]">
            <Image
              src="/qr-swe-growth.png"
              alt="QR code grup WhatsApp SWE Growth"
              width={112}
              height={112}
              priority
              className="h-28 w-28 rounded-xl bg-white p-1.5"
            />
            <div className="flex flex-col items-start gap-1 text-left">
              <span className="font-mono text-[0.54rem] tracking-[0.18em] text-ink-faint uppercase">
                grup whatsapp
              </span>
              <span className="text-sm font-medium">SWE Growth</span>
              <a
                href="https://chat.whatsapp.com/Gafg6mZXgFaCydmb3bW8W2"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.54rem] tracking-[0.1em] text-accent underline-offset-4 hover:underline"
              >
                chat.whatsapp.com/Gafg6mZXgFaCydmb3bW8W2
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="mt-6 flex items-center gap-2 font-mono text-[0.54rem] tracking-[0.18em] text-ink-faint uppercase">
            <Badge tone="accent">terima kasih</Badge>
            {deck.event} · {deck.dateLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
