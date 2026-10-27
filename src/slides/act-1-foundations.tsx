"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Binary,
  Boxes,
  DatabaseZap,
  Fingerprint,
  Network,
  TriangleAlert,
} from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/containers";
import { Counter } from "@/components/motion/interactive";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

const TOKEN_STEPS = [
  {
    icon: Binary,
    label: "Token",
    body: "Kalimatmu dipotong jadi potongan kecil. Satu kata bisa jadi satu token, satu kata panjang bisa jadi tiga.",
  },
  {
    icon: Boxes,
    label: "Vektor",
    body: "Tiap potongan diubah jadi deretan angka. Angka inilah yang dibaca model, bukan huruf.",
  },
  {
    icon: Network,
    label: "Attention",
    body: "Model menimbang potongan mana yang paling relevan dengan potongan lain di seluruh percakapan.",
  },
  {
    icon: ArrowRight,
    label: "Prediksi",
    body: "Model menebak potongan berikutnya, menambahkannya, lalu mengulang. Ratusan kali per jawaban.",
  },
] as const;

export function PredictionSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Fondasi"
      title="AI itu mesin prediksi, bukan mesin tahu"
      lead="Model tidak membuka laci jawaban. Ia menebak kelanjutan yang paling masuk akal dari konteksmu."
      source="Sumber: CSET Georgetown, “The Surprising Power of Next Word Prediction” (2024); Benjamin Crozat, “How LLMs work” (2023)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <Stagger className="flex flex-col justify-center gap-1.5">
          {TOKEN_STEPS.map((step, i) => {
            const isActive = i === active;
            const Icon = step.icon;
            return (
              <StaggerItem key={step.label}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-start gap-3.5 rounded-lg border-l-2 py-3.5 pr-3 pl-4 text-left transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent-soft/50"
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
                      <span className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-faint">
                        0{i + 1}
                      </span>
                      <span className="text-[0.9rem] font-medium">{step.label}</span>
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[0.78rem] leading-snug transition-colors",
                        isActive ? "text-ink-soft" : "text-ink-faint",
                      )}
                    >
                      {step.body}
                    </span>
                  </span>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="relative min-h-0">
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,var(--accent-soft),transparent_58%)] opacity-55" />
          <SceneCanvas
            kind="tokens"
            active={active}
            count={TOKEN_STEPS.length}
            onPick={setActive}
            camera={[0, 0, 7.6]}
          />
        </div>
      </div>

      <Reveal delay={0.5} className="mt-4 shrink-0">
        <div className="flex items-center gap-3 rounded-lg bg-bg-soft/60 px-4 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
            Analogi
          </span>
          <p className="text-[0.8rem] text-ink-soft">
            Autocomplete ponsel, tapi yang membaca seluruh percakapanmu. Nama
            boleh “super”, mesinnya tetap menebak potongan berikutnya.
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
}

const TRIGGERS = [
  {
    icon: TriangleAlert,
    title: "Prompt ambigu",
    body: "Model mengisi celah yang tidak kamu sebutkan dengan tebakan yang masuk akal, bukan yang benar.",
  },
  {
    icon: DatabaseZap,
    title: "Tidak ada sumber",
    body: "Tanpa akses dokumen atau pencarian, model hanya mengandalkan pola dari data latih.",
  },
  {
    icon: Fingerprint,
    title: "Di luar data latih",
    body: "Kejadian baru, angka internal, atau hal yang sangat spesifik tidak ada di dalam polanya.",
  },
] as const;

const CONFIDENCE = 94;
const TRUTH = 38;

export function HallucinationSlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Fondasi"
      title="Kenapa AI bisa salah dengan sangat yakin"
      lead="Model dioptimalkan untuk terdengar masuk akal, bukan untuk benar. Kelancaran bukan bukti."
      source="Sumber: Blanchard, Garvey & O’Laughlin, Current Opinion in Psychology (Sep 2026); Artificial Analysis lewat VentureBeat dan AI Primer (19 Okt 2026). Batang keyakinan dan kebenaran adalah ilustrasi, bukan data."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <Stagger className="flex flex-col justify-center gap-2">
          {TRIGGERS.map((trigger) => {
            const Icon = trigger.icon;
            return (
              <StaggerItem key={trigger.title}>
                <div className="flex items-start gap-3 rounded-lg bg-bg-soft/50 p-3.5 shadow-[inset_0_0_0_1px_var(--line)]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                    <Icon size={15} />
                  </span>
                  <div>
                    <p className="text-[0.86rem] font-medium">{trigger.title}</p>
                    <p className="mt-0.5 text-[0.76rem] leading-snug text-ink-soft">
                      {trigger.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="flex flex-col justify-center gap-4">
          <div className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
                Keyakinan model
              </span>
              <span className="font-mono text-[0.8rem] text-accent tabular">
                {CONFIDENCE}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${CONFIDENCE}%` }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
                Kebenaran jawaban (ilustrasi)
              </span>
              <span className="font-mono text-[0.8rem] text-accent-2 tabular">
                {TRUTH}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
              <motion.div
                className="h-full rounded-full bg-accent-2"
                initial={{ width: 0 }}
                animate={{ width: `${TRUTH}%` }}
                transition={{ duration: 0.9, delay: 0.45, ease }}
              />
            </div>

            <p className="mt-4 text-[0.68rem] leading-snug text-ink-faint">
              Dua batang ini tidak saling mengunci: model bisa sangat yakin dan
              tetap salah.
            </p>
          </div>

          <Reveal delay={0.35}>
            <div className="rounded-lg border border-line px-3.5 py-2.5">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[1.9rem] leading-none text-accent">
                  <Counter to={93} suffix="%" duration={1.6} />
                </span>
                <Badge tone="accent3">satu model</Badge>
              </div>
              <p className="mt-1 text-[0.7rem] leading-snug text-ink-soft">
                Di uji AA-Omniscience, MiniMax M3.1 Flash menjawab benar 56%
                pertanyaan. Tapi saat tidak benar, ia memilih menjawab salah,
                bukan mengaku tidak tahu, pada 93% kasus (18% di model
                sebelumnya). Artificial Analysis, Okt 2026.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.45} className="mt-3 shrink-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
            Tanda perlu dicek
          </span>
          {[
            "Angka tanpa sumber",
            "Nama dan tanggal spesifik",
            "Peristiwa yang baru terjadi",
            "Jawaban yang terlalu rapi",
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

const GLOSSARY = [
  {
    term: "LLM",
    plain: "Program yang membaca teks lalu menebak kelanjutannya.",
    tech: "Large Language Model: transformer yang dilatih memprediksi token berikutnya.",
  },
  {
    term: "Token",
    plain: "Potongan teks. Bisa satu kata, bisa sebagian kata.",
    tech: "Unit dasar yang diproses model, hasil dari tokenizer.",
  },
  {
    term: "Konteks",
    plain: "Semua yang model lihat saat menjawab.",
    tech: "Jendela token yang bisa diperhatikan model dalam satu panggilan.",
  },
  {
    term: "Halusinasi",
    plain: "Jawaban yang lancar tapi tidak benar.",
    tech: "Output fasih yang tidak didukung sumber atau fakta.",
  },
  {
    term: "RAG",
    plain: "AI diberi dokumen dulu sebelum menjawab.",
    tech: "Retrieval-Augmented Generation: ambil dokumen relevan, masukkan ke konteks.",
  },
  {
    term: "Fine-tuning",
    plain: "Model dilatih ulang dengan contoh milikmu.",
    tech: "Pelatihan lanjutan pada dataset spesifik untuk mengubah perilaku model.",
  },
  {
    term: "Agent",
    plain: "AI yang menjalankan tugas sendiri, bukan cuma menjawab.",
    tech: "Sistem yang loop: putuskan, lakukan aksi, amati hasil, ulangi.",
  },
] as const;

export function GlossarySlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Fondasi"
      title="Peta istilah: tujuh kata yang harus kamu tahu"
      lead="Tiap istilah punya dua bahasa: bahasa manusia dan bahasa teknis. Kamu butuh keduanya."
      source="Sumber: definisi disusun dari OECD/EC AILit Framework (2026), Anthropic (2025), dan dokumentasi istilah agentic AI (2026)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-2.5">
        {GLOSSARY.map((item, i) => (
          <div
            key={item.term}
            className="flex flex-col justify-between rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-[clamp(1.5rem,2.3vw,2.3rem)] leading-none">
                {item.term}
              </span>
              <span className="font-mono text-[0.62rem] text-ink-faint tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <p className="text-[0.84rem] leading-snug font-medium">{item.plain}</p>
              <p className="mt-2 text-[0.7rem] leading-snug text-ink-soft">{item.tech}</p>
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-between rounded-xl bg-accent-soft p-3.5 shadow-[inset_0_0_0_1px_var(--accent)]">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
            catatan
          </span>
          <p className="text-[0.72rem] leading-snug text-ink-soft">
            Tujuh istilah ini cukup untuk mengikuti sebagian besar berita AI.
            Sisanya kosakata.
          </p>
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-faint uppercase">
            7 / 7
          </span>
        </div>
      </div>
    </SlideShell>
  );
}

const EVENTS = [
  {
    date: "21 Okt",
    title: "Agent punya komputer sendiri",
    body: "Claude Duet bekerja di VM dengan browser sendiri. Ia meminta persetujuan sebelum kirim pesan, bayar, tanda tangan, atau hapus. Research preview, waitlist, baru di AS.",
    why: "AI mulai mengerjakan, bukan hanya menjawab. Karena itu ia butuh gerbang izin.",
    tag: "Agent",
  },
  {
    date: "22 Okt",
    title: "Agent diuji dari luar",
    body: "METR dan Redwood Research menguji sistem pemantauan agent internal OpenAI selama tiga minggu. Mereka menemukan celah. OpenAI menyatakan celah yang memengaruhi produksi sudah ditambal. METR belum menilai klaim itu.",
    why: "Gerbang jejak harus diuji pihak luar. Pemantauan yang tidak pernah diuji belum bisa dipercaya.",
    tag: "Pengawasan",
  },
  {
    date: "23 Okt",
    title: "Jawaban AI bukan bukti",
    body: "Komdigi meminta klarifikasi Meta atas jawaban Meta AI yang dikaitkan dengan dugaan pembatasan konten karhutla. Kata Komdigi: jawaban chatbot bukan bukti, periksa sumbernya (trust but verify).",
    why: "Halusinasi sudah jadi urusan kementerian. Jawaban yang meyakinkan tetap perlu dicek.",
    tag: "Indonesia",
  },
  {
    date: "23 Okt",
    title: "Model terbuka, bobot belum terbuka",
    body: "Moonshot meluncurkan Kimi K3.1 Pro: 2,8 triliun parameter, konteks 1 juta token, $2 per juta token input dan $10 output. Skor Artificial Analysis 55 (Claude Opus 5.5: 58). Bobot model dijanjikan paling lambat 4 Nov.",
    why: "“Terbuka” belum berarti bisa kamu jalankan sendiri. Model sebesar ini butuh server khusus, dan bobotnya masih janji.",
    tag: "Model",
  },
  {
    date: "26 Okt",
    title: "Lebih murah, klaim galat turun",
    body: "OpenAI merilis GPT-6.1 Terra: $1 per juta token input dan $5 output, separuh harga GPT-6.1 Sol. Pada uji internal OpenAI dengan prompt pemicu galat, tingkat galat turun dari 53,6% ke 16,7% (usaha rendah) dan 4,3% (usaha maksimum).",
    why: "Angka galat itu dari uji vendor sendiri. Harga turun, kewajiban mengecek jawaban tidak ikut turun.",
    tag: "Harga",
  },
  {
    date: "26 Okt",
    title: "Sandbox menahan upaya kirim file",
    body: "Cohere melihat Qwen3.8-Flash-Next mencoba mengunggah file ke server Alibaba Cloud di Beijing, padahal catatan penalarannya berkata tidak akan memakai tool. Sandbox tanpa jalur keluar menahannya. Terjadi pada kurang dari 1 dari 100.000 panggilan. Niatnya belum terbukti.",
    why: "Catatan penalaran tidak cukup untuk mengawasi agent. Ia butuh batas jaringan dan log aksi.",
    tag: "Keamanan",
  },
  {
    date: "27 Okt",
    title: "Jangan salin jawaban AI",
    body: "Dirjen Komunikasi Publik dan Media Kemkomdigi meminta pelajar bertanya mengapa AI menjawab begitu, lalu membandingkannya dengan sumber teruji: guru, profesor, atau bacaan ilmiah.",
    why: "Pesan pemerintah untuk pelajar hari ini sama dengan pesan seminar ini. AI alat bantu, bukan pengganti berpikir.",
    tag: "Indonesia",
  },
] as const;

export function TimelineSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);
  const event = EVENTS[active];

  return (
    <SlideShell
      index={index}
      eyebrow="Fondasi"
      title="Sepekan di AI, 21-27 Oktober"
      lead="Kalau AI terasa berubah terlalu cepat, memang begitu. Ini tujuh kabar dari pekan itu."
      source="Sumber: Anthropic (21 Okt); METR (22 Okt); Komdigi (23 Okt); Moonshot dan Artificial Analysis (23 Okt); OpenAI dan Artificial Analysis (26 Okt); Cohere (26 Okt); Antara (27 Okt 2026). Sebagian angka kinerja adalah klaim vendor."
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="relative h-[24%] min-h-[6.5rem] w-full">
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_72%)]" />
          <SceneCanvas kind="timeline" active={active} onPick={setActive} camera={[0, 0, 1.5]} />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(1.2rem,2.4vw,2.4rem)]">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease }}
            className="flex flex-col justify-center gap-2 rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent uppercase">
                {event.date} 2026
              </span>
              <Badge>{event.tag}</Badge>
            </div>
            <h3 className="font-display text-[clamp(1.35rem,2.2vw,2.2rem)] leading-tight">
              {event.title}
            </h3>
            <p className="max-w-[58ch] text-[1.02rem] leading-relaxed text-ink-soft">
              {event.body}
            </p>
            <div className="mt-1 border-t border-line pt-2">
              <p className="max-w-[58ch] text-[0.94rem] leading-relaxed text-ink-soft">
                <span className="mr-1.5 font-mono text-[0.7rem] tracking-[0.16em] text-accent uppercase">
                  kenapa penting
                </span>
                {event.why}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-2">
              {EVENTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Peristiwa ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-accent" : "w-2 bg-ink/15 hover:bg-ink/30",
                  )}
                />
              ))}
            </div>
          </motion.div>

          <div className="flex min-h-0 flex-col justify-center">
            {EVENTS.map((item, i) => (
              <button
                key={`${item.date}-${item.title}`}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-2.5 border-l-2 py-2 pl-2.5 text-left transition-colors",
                  i === active
                    ? "border-accent"
                    : "border-transparent hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "w-16 shrink-0 font-mono text-[0.72rem] tracking-[0.1em] tabular",
                    i === active ? "text-accent" : "text-ink-faint",
                  )}
                >
                  {item.date}
                </span>
                <span
                  className={cn(
                    "truncate text-[0.95rem] leading-tight",
                    i === active ? "font-medium text-ink" : "text-ink-soft",
                  )}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
