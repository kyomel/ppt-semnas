"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Brain,
  Check,
  Compass,
  LineChart,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
} from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { Reveal } from "@/components/motion/containers";
import { Counter, TiltCard, useParallax } from "@/components/motion/interactive";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

export function ApprenticeSlide({ index }: { index: number }) {
  const parallax = useParallax(8);

  return (
    <SlideShell
      index={index}
      eyebrow="Mindset · 1 dari 6"
      title="Rekan magang, bukan oracle"
      lead="AI cepat, tapi tidak tahu apa yang kamu tahu tentang pekerjaanmu. Kamu yang menetapkan standar."
      source="Sumber: kerangka sikap pada AILit Framework (OECD/EC, 2026); pembagian kerja manusia-AI pada HAIML (2026)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(1.2rem,2.6vw,2.6rem)]">
        <motion.div className="h-full" style={{ x: parallax.x, y: parallax.y }}>
          <TiltCard strength={5} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-xl bg-bg-soft/50 p-5 shadow-[inset_0_0_0_1px_var(--line)]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.54rem] tracking-[0.2em] text-ink-faint uppercase">
                    pola lama
                  </span>
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.14em] text-ink-faint uppercase">
                    oracle
                  </span>
                </div>
                <p className="mt-4 font-display text-[clamp(1.35rem,1.95vw,1.95rem)] leading-tight text-ink-faint">
                  “AI bilang begitu, jadi pasti begitu.”
                </p>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Kamu berhenti memeriksa karena jawabannya rapi.",
                  "Kesalahan masuk ke pekerjaanmu tanpa terdeteksi.",
                  "Kamu kehilangan kemampuan menilai, bukan hanya waktu.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X size={12} className="mt-0.5 shrink-0 text-ink-faint" />
                    <span className="text-[0.8rem] leading-snug text-ink-faint">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line pt-3">
                <p className="font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
                  hasilnya
                </p>
                <p className="mt-1 text-[0.8rem] leading-snug text-ink-faint">
                  Kamu menjadi operator yang sibuk, bukan pengarah yang tenang.
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div className="h-full" style={{ x: parallax.y, y: parallax.x }}>
          <TiltCard strength={5} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-xl bg-accent-soft/50 p-5 shadow-[inset_0_0_0_1.5px_var(--accent)]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.54rem] tracking-[0.2em] text-accent uppercase">
                    pola baru
                  </span>
                  <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.14em] text-bg uppercase">
                    rekan magang
                  </span>
                </div>
                <p className="mt-4 font-display text-[clamp(1.35rem,1.95vw,1.95rem)] leading-tight">
                  “Ini draf pertama. Saya yang tahu mana yang benar.”
                </p>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Kamu memberi konteks yang tidak dimiliki AI.",
                  "Kamu memeriksa titik-titik yang memang rawan salah.",
                  "Kamu tetap bisa mengerjakan tugas itu tanpa AI.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={12} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-[0.8rem] leading-snug text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line pt-3">
                <p className="font-mono text-[0.5rem] tracking-[0.16em] text-accent uppercase">
                  hasilnya
                </p>
                <p className="mt-1 text-[0.8rem] leading-snug text-ink-soft">
                  Kamu menjadi pengarah yang memegang standar, bukan tombol
                  persetujuan.
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <Reveal delay={0.4} className="mt-3 shrink-0">
        <div className="flex items-center gap-3 border-t border-line pt-3">
          <Sparkles size={13} className="shrink-0 text-accent" />
          <p className="text-[0.78rem] text-ink-soft">
            Ujian sederhananya: kalau AI hilang besok, apakah kamu masih bisa
            menjelaskan keputusan yang kamu ambil hari ini?
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
}

const ANSWERS = [
  {
    id: "a",
    tag: "Jawaban A",
    text: "Tergantung bahasa ibumu dan cara belajarmu. Lembaga resmi hanya memberi perkiraan kasar, jadi cek silabus dan sumbernya sebelum membuat jadwal.",
    reasoning: false,
    verdict: "Lebih jujur",
    note: "Mengaku ada variasi dan mengarahkan ke verifikasi.",
  },
  {
    id: "b",
    tag: "Jawaban B",
    text: "Untuk mencapai N3 dibutuhkan tepat 1.200 jam. Pertama, kanji dasar menyerap 300 jam. Kedua, tata bahasa 250 jam. Ketiga, latihan mendengar 200 jam. Keempat, percakapan 200 jam. Kelima, ujian 250 jam. Total 1.200 jam.",
    reasoning: true,
    verdict: "Terlihat meyakinkan",
    note: "Angka presisi dan langkah rapi terasa seperti bukti. Padahal tidak ada sumbernya.",
  },
] as const;

export function VerificationSlide({ index }: { index: number }) {
  const [picked, setPicked] = useState<string | null>(null);
  const chosen = ANSWERS.find((answer) => answer.id === picked);

  return (
    <SlideShell
      index={index}
      eyebrow="Mindset · 2 dari 6"
      title="Verifikasi adalah bagian dari pekerjaan"
      lead="Penalaran yang ditampilkan membuat jawaban terasa benar. Riset 2026: itu menaikkan ketergantungan."
      source="Sumber: Zhu & Li, Telematics and Informatics (Okt 2026), tiga eksperimen, N=657; Blanchard, Garvey & O’Laughlin, Current Opinion in Psychology (Sep 2026). Dua jawaban di kiri disusun untuk ilustrasi."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center gap-2">
          <Reveal delay={0.1}>
            <p className="font-mono text-[0.56rem] tracking-[0.16em] text-ink-faint uppercase">
              “Berapa jam belajar untuk lulus JLPT N3?” Dua jawaban. Mana yang kamu percaya?
            </p>
          </Reveal>

          {ANSWERS.map((answer, i) => {
            const isPicked = picked === answer.id;
            const dim = picked !== null && !isPicked;
            return (
              <motion.button
                key={answer.id}
                type="button"
                onClick={() => setPicked(answer.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: dim ? 0.42 : 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease }}
                className={cn(
                  "rounded-xl p-3.5 text-left transition-colors duration-300",
                  isPicked
                    ? "bg-bg-soft/80 shadow-[inset_0_0_0_1.5px_var(--accent)]"
                    : "bg-bg-soft/50 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-bg-soft/70",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                    {answer.tag}
                  </span>
                  {answer.reasoning ? (
                    <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[0.48rem] tracking-[0.12em] text-ink-faint uppercase">
                      dengan penalaran
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-soft">
                  {answer.text}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <motion.div
            key={picked ?? "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className={cn(
              "rounded-xl p-4",
              chosen
                ? "bg-accent-soft/60 shadow-[inset_0_0_0_1.5px_var(--accent)]"
                : "bg-bg-soft/50 shadow-[inset_0_0_0_1px_var(--line)]",
            )}
          >
            <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
              {chosen ? chosen.verdict : "pilih satu"}
            </p>
            <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-soft">
              {chosen
                ? chosen.note
                : "Klik salah satu jawaban untuk melihat pembacaan risetnya."}
            </p>
          </motion.div>

          <div className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-accent" />
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                temuan utama
              </p>
            </div>
            <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-soft">
              Menampilkan penalaran <span className="font-medium text-ink">menaikkan</span>{" "}
              ketergantungan, karena dibaca sebagai sinyal kompetensi, bukan sebagai
              alat kalibrasi. Literasi AI menahan efek ini untuk penalaran, tapi{" "}
              <span className="font-medium text-ink">tidak</span> untuk tugas yang
              kompleks.
            </p>
            <p className="mt-2 border-t border-line pt-2 text-[0.72rem] leading-relaxed text-ink-faint">
              Peringatan umum “hati-hati halusinasi” efeknya paling lemah. Yang
              bekerja: penanda spesifik tentang di mana AI biasanya gagal.
            </p>
          </div>
        </div>
      </div>

      <Reveal delay={0.45} className="mt-3 shrink-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="font-mono text-[0.55rem] tracking-[0.2em] text-accent uppercase">
            Verifikasi 2 menit
          </span>
          {[
            "Buka sumber pertama",
            "Cek satu angka",
            "Minta AI menandai ketidakpastian",
            "Simpan hasil cek",
          ].map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-1.5 rounded-full bg-ink/[0.04] px-2.5 py-1 text-[0.7rem] text-ink-soft"
            >
              <span className="font-mono text-[0.5rem] text-accent tabular">
                0{i + 1}
              </span>
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </SlideShell>
  );
}

const CONNECTIVITY = [
  { label: "Menulis tanpa tool", value: 100, display: "acuan", tone: "accent2", note: "Jaringan otak paling kuat dan paling tersebar." },
  { label: "Dengan LLM", value: 45, display: "hingga 55% lebih rendah", tone: "accent", note: "Konektivitas paling lemah. Pengguna search engine ada di tengah, tanpa persentase di ringkasan." },
] as const;

export function FrictionSlide({ index }: { index: number }) {
  const [active, setActive] = useState(1);

  return (
    <SlideShell
      index={index}
      eyebrow="Mindset · 3 dari 6"
      title="Friksi kognitif itu fitur, bukan bug"
      lead="AI yang langsung menyelesaikan tugas terasa efisien, tapi melewati bagian tempat kamu belajar."
      source="Sumber: MIT Media Lab, “Your Brain on ChatGPT” (arXiv, 2025): 54 peserta, 18 per kelompok, 4 sesi, 4 bulan, preprint; Google, Pedagogical Framework for Generative AI (Sep 2026). Panjang batang LLM mengikuti angka “hingga 55% lebih rendah”."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[clamp(2.4rem,3.6vw,3.6rem)] leading-none text-accent">
              <Counter to={83} suffix="%" duration={1.4} />
            </span>
            <p className="max-w-[30ch] text-[0.8rem] leading-snug text-ink-soft">
              pengguna LLM (15 dari 18) tidak bisa mengutip kalimat dari esai yang
              baru mereka tulis, sesi pertama
            </p>
          </div>

          <div className="mt-5 space-y-2.5">
            {CONNECTIVITY.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left transition-colors",
                    isActive ? "bg-bg-soft/70" : "hover:bg-ink/[0.03]",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.78rem]">{item.label}</span>
                    <span
                      className={cn(
                        "font-mono text-[0.72rem] tabular",
                        isActive ? "text-ink" : "text-ink-faint",
                      )}
                    >
                      {item.display}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        item.tone === "accent"
                          ? "bg-accent"
                          : item.tone === "accent2"
                            ? "bg-accent-2"
                            : "bg-accent-3",
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease }}
                    />
                  </div>
                  {isActive ? (
                    <p className="mt-1.5 text-[0.7rem] leading-snug text-ink-faint">
                      {item.note}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-mono text-[0.52rem] tracking-[0.12em] text-ink-faint uppercase">
            klik batang untuk keterangan · n=54, preprint, tugas menulis esai
          </p>
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <Reveal delay={0.2}>
            <div className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
              <div className="flex items-center gap-2">
                <Brain size={13} className="text-accent" />
                <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                  yang hilang
                </p>
              </div>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
                Rasa memiliki atas tulisan paling rendah di kelompok LLM. Mereka juga
                memakai lebih banyak nama dan angka, tapi dengan orientasi yang lebih
                lemah terhadap isinya.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-accent-2" />
                <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                  kata Google, Sep 2026
                </p>
              </div>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
                AI generatif cenderung menyelesaikan tugas segera. Kecenderungan itu
                melewati friksi kognitif yang justru penting untuk membangun
                pengetahuan.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="rounded-lg bg-accent-soft/50 px-3.5 py-2.5">
              <p className="text-[0.74rem] leading-snug text-ink-soft">
                <span className="font-medium text-ink">Aturan praktis:</span> tulis
                dugaanmu dulu, baru tanya AI. Selisih antara keduanya adalah tempat
                kamu belajar.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}

function Curve({ growth, delay }: { growth: boolean; delay: number }) {
  const points = 22;
  return (
    <div className="relative flex h-[6.5rem] items-end gap-[3px]">
      {Array.from({ length: points }, (_, i) => {
        const t = i / (points - 1);
        const height = growth
          ? 8 + Math.pow(t, 2.1) * 92
          : 26 + Math.sin(t * 2.4) * 8;
        return (
          <motion.span
            key={i}
            className={cn(
              "flex-1 rounded-[1px]",
              growth ? "bg-accent" : "bg-ink/20",
            )}
            style={{ height: `${height}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + i * 0.028, ease }}
          />
        );
      })}
    </div>
  );
}

export function GrowthMindsetSlide({ index }: { index: number }) {
  const [week, setWeek] = useState(8);

  return (
    <SlideShell
      index={index}
      eyebrow="Mindset · 4 dari 6"
      title="Growth mindset, bukan bakat"
      lead="Memakai AI dengan baik bisa dilatih. Satu studi 2026: literasi AI dan growth mindset naik bersama."
      source="Sumber: CAFE-AI, Cogent Education (Apr 2026), kuasi-eksperimen n=152, p<0,05; WEF Future of Jobs 2025 (curiosity & lifelong learning)."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[0.52rem] tracking-[0.16em] text-ink-faint uppercase">
                mindset tetap
              </p>
              <Curve growth={false} delay={0.2} />
              <p className="mt-1.5 text-[0.7rem] leading-snug text-ink-faint">
                Mencoba sekali, gagal, menyimpulkan “bukan untuk saya”.
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.52rem] tracking-[0.16em] text-accent uppercase">
                mindset tumbuh
              </p>
              <Curve growth delay={0.35} />
              <p className="mt-1.5 text-[0.7rem] leading-snug text-ink-soft">
                Mengubah satu variabel tiap percobaan. Kemampuan menumpuk.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[0.54rem] tracking-[0.16em] text-ink-faint uppercase">
                minggu latihan (ilustrasi, bukan data)
              </span>
              <span className="font-mono text-[0.72rem] text-accent tabular">
                {week}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={week}
              onChange={(event) => setWeek(Number(event.target.value))}
              aria-label="Minggu latihan"
              className="mt-2 w-full"
            />
            <p className="mt-2 text-[0.74rem] leading-snug text-ink-soft">
              {week < 4
                ? "Empat minggu pertama terasa lambat. Ini fase membangun kosakata dan kebiasaan."
                : week < 8
                  ? "Minggu 4-8 biasanya titik di mana template mulai terasa berguna."
                  : "Setelah minggu 8, kenaikan datang dari sistem, bukan dari usaha yang lebih keras."}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <Reveal delay={0.2}>
            <div className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
              <div className="flex items-center gap-2">
                <LineChart size={13} className="text-accent" />
                <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                  bukti
                </p>
              </div>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
                Model CAFE-AI yang menggabungkan pedagogi dan AI lebih efektif secara
                signifikan dibanding e-learning konvensional, untuk{" "}
                <span className="font-medium text-ink">literasi AI dan growth mindset</span>{" "}
                sekaligus.
              </p>
              <div className="mt-3 flex items-baseline gap-2 border-t border-line pt-2">
                <span className="font-display text-[1.6rem] leading-none text-accent">
                  n=152
                </span>
                <span className="text-[0.68rem] text-ink-faint">
                  kuasi-eksperimen, p&lt;0,05
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="rounded-xl border border-line p-4">
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                sinyal pasar kerja
              </p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
                WEF menempatkan{" "}
                <span className="font-medium text-ink">curiosity dan lifelong learning</span>{" "}
                sebagai skill yang naik kepentingannya sampai 2030, bersama creative
                thinking dan resilience.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <p className="text-[0.72rem] leading-snug text-ink-faint">
              Yang dilatih bukan “cara pakai tool A”. Yang dilatih adalah kebiasaan
              mengubah satu variabel lalu mengamati hasilnya.
            </p>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}

const LAYERS = [
  {
    name: "Experiential AI use",
    line: "Pakai AI pada tugas nyata, bukan demo.",
    detail: "Tanpa pengalaman langsung, penilaianmu hanya opini. Mulai dari satu tugas yang kamu kerjakan tiap minggu.",
  },
  {
    name: "Metacognitive reflection",
    line: "Amati bagaimana AI mengubah cara kamu berpikir.",
    detail: "Setelah memakai AI, tanya: bagian mana yang tadi saya serahkan? Apakah saya masih bisa mengerjakannya sendiri?",
  },
  {
    name: "Ethical decision-making",
    line: "Putuskan apa yang boleh dan tidak boleh didelegasikan.",
    detail: "Bukan hanya soal benar-salah. Soal siapa yang menanggung akibat kalau hasilnya salah.",
  },
] as const;

export function AgencySlide({ index }: { index: number }) {
  const [open, setOpen] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Mindset · 5 dari 6"
      title="Kamu yang memutuskan, bukan modelnya"
      lead="Automation bias: kita cenderung menerima saran mesin begitu saja. Lawan dengan prosedur, bukan niat baik."
      source="Sumber: HAIML, Human-Centered AI Metacognitive Learning Model (preprint, Jun 2026); riset automation bias yang dirujuknya."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center gap-2">
          {LAYERS.map((layer, i) => {
            const isOpen = open === i;
            return (
              <button
                key={layer.name}
                type="button"
                onClick={() => setOpen(i)}
                className={cn(
                  "rounded-lg px-3.5 py-3 text-left transition-all duration-300",
                  isOpen
                    ? "bg-bg-soft/80 shadow-[inset_0_0_0_1.5px_var(--accent)]"
                    : "bg-bg-soft/40 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-bg-soft/60",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full font-mono text-[0.5rem]",
                        isOpen ? "bg-accent text-bg" : "bg-ink/8 text-ink-faint",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[0.84rem] font-medium">{layer.name}</span>
                  </span>
                  <ArrowRight
                    size={12}
                    className={cn(
                      "shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-90 text-accent" : "text-ink-faint",
                    )}
                  />
                </div>
                <p className="mt-1 pl-7 text-[0.74rem] leading-snug text-ink-soft">
                  {layer.line}
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.34, ease }}
                  className="overflow-hidden"
                >
                  <p className="mt-1.5 border-t border-line pt-1.5 pl-7 text-[0.72rem] leading-snug text-ink-faint">
                    {layer.detail}
                  </p>
                </motion.div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]">
            <div className="flex items-center gap-2">
              <Scale size={13} className="text-accent" />
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                empat pertanyaan sebelum menerima
              </p>
            </div>
            <ol className="mt-3 space-y-2.5">
              {[
                "Kalau jawaban ini salah, apa akibatnya?",
                "Siapa yang menanggung akibat itu?",
                "Bukti apa yang bisa saya periksa dalam 2 menit?",
                "Apakah saya masih bisa mengerjakan ini tanpa AI?",
              ].map((question, i) => (
                <li key={question} className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-mono text-[0.55rem] text-accent tabular">
                    0{i + 1}
                  </span>
                  <span className="text-[0.78rem] leading-snug text-ink-soft">
                    {question}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex items-start gap-2 border-t border-line pt-3">
              <UserRoundCheck size={13} className="mt-0.5 shrink-0 text-accent-2" />
              <p className="text-[0.72rem] leading-snug text-ink-faint">
                Kalau satu pertanyaan tidak bisa kamu jawab, jangan tanda tangani
                hasilnya. Itu bukan penolakan terhadap AI, itu definisi pekerjaan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const TASKS = [
  { id: "ringkas", label: "Merangkum 40 halaman dokumen", inside: true, x: 16, y: 26, why: "Pola teks padat, hasil mudah diperiksa terhadap sumber." },
  { id: "draf", label: "Menulis draf pertama pengumuman", inside: true, x: 38, y: 16, why: "Tugas generatif dengan format jelas. Kamu tetap menyunting." },
  { id: "ubah", label: "Mengubah nada tulisan", inside: true, x: 30, y: 46, why: "Transformasi gaya bahasa, bisa dibandingkan langsung." },
  { id: "kode", label: "Menulis fungsi kecil yang jelas", inside: true, x: 55, y: 28, why: "Spesifikasi sempit, hasil bisa diuji dengan cepat." },
  { id: "strategi", label: "Menetapkan strategi organisasi", inside: false, x: 68, y: 74, why: "Butuh konteks, kepemilikan, dan tanggung jawab yang tidak dimiliki model." },
  { id: "negosiasi", label: "Negosiasi dengan mitra sulit", inside: false, x: 46, y: 82, why: "Butuh membaca ruangan dan menanggung risiko hubungan jangka panjang." },
] as const;

export function JaggedFrontierSlide({ index }: { index: number }) {
  const [active, setActive] = useState<string>("strategi");
  const task = TASKS.find((item) => item.id === active) ?? TASKS[0];

  return (
    <SlideShell
      index={index}
      eyebrow="Mindset · 6 dari 6"
      title="Frontier bergerigi: AI tidak rata"
      lead="Di satu alur kerja, AI bisa menaikkan hasil satu tugas dan menurunkan tugas lain yang tampak mirip."
      source="Sumber: Dell’Acqua, McFowland, Mollick, Lifshitz-Assaf, Kellogg dkk., Organization Science (Mar 2026). Eksperimen praregistrasi, 758 konsultan BCG, memakai GPT-4 (model 2023). Yang penting polanya, bukan angkanya."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="relative min-h-0 overflow-hidden rounded-xl bg-bg-soft/40 shadow-[inset_0_0_0_1px_var(--line)]">
          <div
            className="absolute inset-x-0 top-1/2 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--line-strong) 0 6px, transparent 6px 12px)",
            }}
          />
          <span className="absolute top-2.5 left-3 font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
            di dalam frontier
          </span>
          <span className="absolute bottom-2.5 left-3 font-mono text-[0.5rem] tracking-[0.16em] text-ink-faint uppercase">
            di luar frontier
          </span>

          {TASKS.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className={cn(
                  "absolute max-w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1.5 text-[0.66rem] leading-tight transition-all duration-300",
                  isActive
                    ? item.inside
                      ? "bg-accent text-bg shadow-lg"
                      : "bg-ink text-bg shadow-lg"
                    : item.inside
                      ? "bg-accent-soft text-accent hover:bg-accent/20"
                      : "bg-ink/8 text-ink-soft hover:bg-ink/15",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease }}
            className="rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)]"
          >
            <div className="flex items-center gap-2">
              <Badge tone={task.inside ? "accent2" : "accent3"}>
                {task.inside ? "di dalam frontier" : "di luar frontier"}
              </Badge>
            </div>
            <p className="mt-2 text-[0.86rem] font-medium">{task.label}</p>
            <p className="mt-1 text-[0.76rem] leading-relaxed text-ink-soft">
              {task.why}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-accent-2-soft/60 px-3 py-2.5">
              <p className="font-display text-[1.4rem] leading-none text-accent-2">
                +12,2%
              </p>
              <p className="mt-1 text-[0.66rem] leading-snug text-ink-soft">
                lebih banyak tugas selesai, dan 25,1% lebih cepat
              </p>
            </div>
            <div className="rounded-lg bg-accent-3-soft/70 px-3 py-2.5">
              <p className="font-display text-[1.4rem] leading-none text-accent-3">
                −19 poin
              </p>
              <p className="mt-1 text-[0.66rem] leading-snug text-ink-soft">
                peluang jawaban benar di luar frontier: 84,5% tanpa AI, sekitar 65% dengan AI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-line px-3 py-2.5">
            <Compass size={12} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-[0.72rem] leading-snug text-ink-soft">
              18 tugas di dalam frontier: semua terbantu. Satu tugas manajerial di
              luar frontier: hasilnya memburuk. Bedanya tidak terlihat dari luar.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
