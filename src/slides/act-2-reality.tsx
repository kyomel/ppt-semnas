"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Clapperboard, GraduationCap, Mic, TrendingUp } from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/containers";
import { Counter } from "@/components/motion/interactive";
import { Segmented } from "@/components/ui/controls";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

const INDONESIA_STATS = [
  {
    value: 49.96,
    decimals: 2,
    suffix: "",
    label: "Indeks literasi AI nasional",
    note: "Kategori “kurang baik”. Skala 0-100, di bawah 50 masuk kategori kurang. Skor tahun 2025.",
    source: "APJII 2025 · 8.700 responden",
  },
  {
    value: 18.2,
    decimals: 1,
    suffix: "%",
    label: "Responden yang mengakses AI (2026)",
    note: "Survei 2025 mencatat 27,34%. Pertanyaan bisa berbeda, jadi baca arahnya: pemakaian belum melonjak.",
    source: "APJII 2026 · 8.700 responden",
  },
  {
    value: 68,
    decimals: 0,
    suffix: "%",
    label: "Gen Z dan Milenial urban yang mengaku bergantung pada AI",
    note: "Sampel 1.000 orang yang sudah akrab dengan AI. Bukan angka nasional.",
    source: "Indonesia AI Report 2025 (kumparan × Populix)",
  },
] as const;

export function IndonesiaSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Indonesia: literasi belum cukup, pemakaian belum merata"
      lead="Skor literasi AI masih “kurang baik”, dan pengguna AI di survei terbaru hanya 18,2%."
      source="Sumber: APJII 2025 (indeks 49,96); APJII 2026 (18,2%; 27,34% pada 2025); Indonesia AI Report 2025 kumparan × Populix (68%; n=1.000, Gen Z dan Milenial urban). Tiga survei berbeda, jangan digabung."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <Stagger className="flex flex-col justify-center gap-2">
          <StaggerItem>
            <p className="mb-1 font-mono text-[0.54rem] tracking-[0.2em] text-ink-faint uppercase">
              Tiga angka yang menjelaskan posisi kita
            </p>
          </StaggerItem>
          {INDONESIA_STATS.map((stat, i) => {
            const isActive = i === active;
            return (
              <StaggerItem key={stat.label}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-lg border-l-2 py-3 pr-3 pl-4 text-left transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent-soft/40"
                      : "border-transparent hover:border-line-strong hover:bg-ink/[0.03]",
                  )}
                >
                  <span
                    className={cn(
                      "min-w-[5.4rem] font-display text-[clamp(1.7rem,2.5vw,2.5rem)] leading-none tabular transition-colors",
                      isActive ? "text-accent" : "text-ink",
                    )}
                  >
                    <Counter
                      to={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      duration={1.5}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.86rem] font-medium">{stat.label}</span>
                    <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-soft">
                      {stat.note}
                    </span>
                    <span className="mt-1 block font-mono text-[0.52rem] tracking-[0.12em] text-ink-faint uppercase">
                      {stat.source}
                    </span>
                  </span>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="relative min-h-0">
          <SceneCanvas kind="gauge" active={active} camera={[0, 0, 4.6]} />
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
            <p className="font-mono text-[0.54rem] tracking-[0.16em] text-ink-faint uppercase">
              klik angka untuk menyorot cincin
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const PURPOSE = [
  { label: "Hiburan (video & gambar generatif)", value: 36.5, icon: Clapperboard },
  { label: "Edukasi dan riset", value: 30.2, icon: GraduationCap },
  { label: "Pekerjaan dan produktivitas", value: 26.9, icon: Briefcase },
  { label: "Asisten suara", value: 6.4, icon: Mic },
] as const;

const GENERATION = [
  { label: "Gen Z (13-28 tahun)", value: 29.4, icon: Clapperboard },
  { label: "Milenial (29-44 tahun)", value: 16.7, icon: Briefcase },
  { label: "Gen X (45-60 tahun)", value: 7.5, icon: GraduationCap },
  { label: "Baby Boomer (61-79 tahun)", value: 0.8, icon: Mic },
] as const;

export function UsageSlide({ index }: { index: number }) {
  const [mode, setMode] = useState<"purpose" | "generation">("purpose");
  const [hovered, setHovered] = useState<number | null>(null);
  const data = mode === "purpose" ? PURPOSE : GENERATION;
  const max = Math.max(...data.map((d) => d.value));

  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Untuk apa kita benar-benar memakai AI"
      lead="Setahun lalu edukasi memimpin. Sekarang hiburan, dan produktivitas ada di urutan ketiga."
      source="Sumber: APJII 2026 (n=8.700, 38 provinsi, 1 Feb-15 Mar 2026, MoE ±1,1%) lewat detik.com dan Bisnis.com; pembanding 2025 dari Kompas.id dan Databoks."
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <Reveal delay={0.15} className="shrink-0">
          <Segmented
            value={mode}
            onChange={setMode}
            options={[
              { value: "purpose", label: "Menurut tujuan" },
              { value: "generation", label: "Menurut generasi" },
            ]}
          />
        </Reveal>

        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          {data.map((item, i) => {
            const Icon = item.icon;
            const isHovered = hovered === i;
            const dim = hovered !== null && !isHovered;
            return (
              <motion.div
                key={`${mode}-${item.label}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: dim ? 0.35 : 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                className="group flex flex-1 items-center gap-3"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ink/5 text-ink-soft">
                  <Icon size={13} />
                </span>
                <span className="w-[16.5rem] shrink-0 text-[0.84rem] leading-tight">
                  {item.label}
                </span>
                <span className="relative h-9 flex-1 overflow-hidden rounded-sm bg-ink/[0.04]">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-sm bg-accent/85"
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / max) * 100}%` }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
                  />
                </span>
                <span className="w-16 shrink-0 text-right font-mono text-[0.84rem] text-ink tabular">
                  {item.value.toFixed(1).replace(".", ",")}%
                </span>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.5} className="mt-3 shrink-0">
          <div className="flex items-center gap-3 rounded-lg bg-bg-soft/60 px-4 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
            <Badge tone="accent">
              <TrendingUp size={10} /> catatan
            </Badge>
            <p className="text-[0.78rem] leading-snug text-ink-soft">
              {mode === "purpose"
                ? "Pada 2025 edukasi memimpin (43,98%), hiburan 29,5%. Pada 2026 berbalik. Hanya 26,9% ke pekerjaan."
                : "Semakin muda, semakin tinggi. Dari yang belum memakai AI, 46,6% belum tahu teknologinya dan 15,5% tidak tahu cara memakainya."}
            </p>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}

const FUNNEL = [
  {
    value: 60,
    label: "Punya akses resmi ke tool AI",
    note: "Naik 50% dalam satu tahun, dari di bawah 40%.",
  },
  {
    value: 60,
    label: "Dari mereka, memakainya tiap hari",
    note: "Kurang dari 60% dari yang punya akses. Pola ini tidak berubah dari tahun lalu.",
  },
  {
    value: 25,
    label: "Organisasi dengan 40%+ eksperimen di produksi",
    note: "54% berharap mencapainya dalam 3-6 bulan.",
  },
] as const;

export function AccessGapSlide({ index }: { index: number }) {
  const [active, setActive] = useState(0);

  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Jurang akses: ~60% punya, kurang dari 60% pakai"
      lead="Akses tumbuh lebih cepat daripada kebiasaan. Tool ada di tangan, belum masuk ke cara kerja."
      source="Sumber: Deloitte, State of AI in the Enterprise 2026. Survei 3.235 pemimpin bisnis dan IT di 24 negara, Agustus-September 2025."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center gap-2">
          {FUNNEL.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "group w-full rounded-lg border-l-2 py-3 pr-3 pl-4 text-left transition-all duration-300",
                  isActive
                    ? "border-accent bg-accent-soft/40"
                    : "border-transparent hover:border-line-strong hover:bg-ink/[0.03]",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      "min-w-[4.6rem] font-display text-[clamp(1.6rem,2.3vw,2.3rem)] leading-none tabular transition-colors",
                      isActive ? "text-accent" : "text-ink",
                    )}
                  >
                    {i === 0 ? "~60%" : i === 1 ? "<60%" : "25%"}
                  </span>
                  <span className="text-[0.86rem] leading-tight font-medium">
                    {item.label}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-1 text-[0.76rem] leading-snug transition-colors",
                    isActive ? "text-ink-soft" : "text-ink-faint",
                  )}
                >
                  {item.note}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-xl bg-bg-soft/60 p-5 shadow-[inset_0_0_0_1px_var(--line)]">
            <p className="font-mono text-[0.55rem] tracking-[0.2em] text-ink-faint uppercase">
              Kesimpulan laporan
            </p>
            <p className="mt-2 font-display text-[clamp(1.15rem,1.6vw,1.6rem)] leading-tight">
              Akses melebar, tapi AI di perusahaan masih{" "}
              <span className="italic text-accent">underutilized</span>.
            </p>
            <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-soft">
              Ini bukan masalah model. Ini masalah orang yang belum tahu harus
              dipakai untuk apa, dan belum punya kebiasaan untuk memakainya.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
              <div>
                <p className="font-display text-[1.5rem] leading-none text-accent">
                  <Counter to={50} suffix="%" duration={1.3} />
                </p>
                <p className="mt-1 text-[0.68rem] leading-snug text-ink-faint">
                  kenaikan akses dalam satu tahun
                </p>
              </div>
              <div>
                <p className="font-display text-[1.5rem] leading-none text-accent-2">
                  <Counter to={54} suffix="%" duration={1.3} />
                </p>
                <p className="mt-1 text-[0.68rem] leading-snug text-ink-faint">
                  berharap naik ke produksi dalam 3-6 bulan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const TRAINING_GROUPS = [
  { label: "Bisa di-upskill di peran sekarang", value: 29, tone: "accent" },
  { label: "Di-upskill lalu ditempatkan ulang", value: 19, tone: "accent2" },
  { label: "Kemungkinan tidak dapat pelatihan", value: 11, tone: "accent3" },
] as const;

export function SkillsSlide({ index }: { index: number }) {
  const [split, setSplit] = useState(false);

  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Skill 2030: 39% berubah, 59 dari 100 butuh pelatihan"
      lead="Dari 100 pekerja dunia, 59 butuh pelatihan pada 2030. Sebelas mungkin tidak mendapatkannya."
      source="Sumber: World Economic Forum, Future of Jobs Report 2025. Horizon 2025-2030. Angka pelatihan adalah proyeksi employer, bukan hasil pengukuran."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[clamp(2.6rem,4vw,4rem)] leading-none text-accent">
              <Counter to={39} suffix="%" duration={1.4} />
            </span>
            <p className="max-w-[24ch] text-[0.78rem] leading-snug text-ink-soft">
              skill set pekerja akan berubah atau jadi usang pada 2025-2030
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSplit((v) => !v)}
            className="mt-4 grid w-full max-w-[21rem] grid-cols-10 gap-[3px]"
            aria-label="Lihat pembagian kelompok pelatihan"
          >
            {Array.from({ length: 100 }, (_, i) => {
              const shuffled = (i * 37) % 100;
              const isNeeded = shuffled < 59;
              const group = shuffled < 29 ? 0 : shuffled < 48 ? 1 : 2;
              const tone =
                group === 0
                  ? "bg-accent"
                  : group === 1
                    ? "bg-accent-2"
                    : "bg-accent-3";
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.004, ease }}
                  className={cn(
                    "aspect-square rounded-[2px]",
                    isNeeded ? (split ? tone : "bg-accent") : "bg-ink/10",
                  )}
                />
              );
            })}
          </button>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {TRAINING_GROUPS.map((group) => (
              <span key={group.label} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "h-2 w-2 rounded-[2px]",
                    group.tone === "accent"
                      ? "bg-accent"
                      : group.tone === "accent2"
                        ? "bg-accent-2"
                        : "bg-accent-3",
                  )}
                />
                <span className="text-[0.68rem] text-ink-soft">
                  {group.value} · {group.label}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-2 font-mono text-[0.54rem] tracking-[0.14em] text-ink-faint uppercase">
            klik kotak untuk memisahkan 29 / 19 / 11
          </p>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {[
            {
              label: "Skill paling cepat tumbuh",
              value: "AI dan big data",
              detail: "Diikuti jaringan & keamanan siber, lalu technology literacy.",
            },
            {
              label: "Skill inti paling dicari",
              value: "Analytical thinking",
              detail: "7 dari 10 perusahaan menganggapnya esensial pada 2025.",
            },
            {
              label: "Hambatan terbesar",
              value: "Skill gap",
              detail: "63% perusahaan menyebutnya hambatan utama transformasi.",
            },
            {
              label: "Respons perusahaan",
              value: "85% upskilling",
              detail: "Dua pertiga berencana merekrut talenta dengan skill AI spesifik.",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={0.2 + i * 0.08} y={12}>
              <div className="rounded-lg bg-bg-soft/50 px-3.5 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
                <p className="font-mono text-[0.52rem] tracking-[0.18em] text-ink-faint uppercase">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[0.86rem] font-medium">{item.value}</p>
                <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-soft">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

export function LiteracyDefinitionSlide({ index }: { index: number }) {
  const [showSource, setShowSource] = useState(false);

  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Literasi AI bukan sekadar bisa memakai tool"
      lead="Definisi OECD dan Komisi Eropa (2026). Perhatikan empat kata kerjanya."
      source="Sumber: OECD & European Commission, “Empowering Learners for the Age of AI: An AI Literacy Framework for Primary and Secondary Education” (Juni 2026). Dasar asesmen PISA 2029 Media & AI Literacy."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(1.8rem,3.4vw,3.6rem)]">
        <div className="flex flex-col justify-center">
          <button
            type="button"
            onClick={() => setShowSource((v) => !v)}
            className="group relative text-left"
          >
            <span className="absolute -top-7 -left-1 font-display text-[4rem] leading-none text-accent/25 select-none">
              “
            </span>
            <blockquote className="font-display text-[clamp(1.5rem,2.45vw,2.45rem)] leading-[1.2] text-balance">
              AI literacy is{" "}
              <span className="italic text-accent">different from AI tool use</span>.
              Simply interacting with AI tools neither develops nor depends on the
              knowledge, skills or competences.
            </blockquote>
            <p className="mt-3 font-mono text-[0.56rem] tracking-[0.14em] text-ink-faint uppercase">
              {showSource ? "OECD & European Commission, 2026" : "klik untuk sitasi lengkap"}
            </p>
          </button>
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <Reveal delay={0.15}>
            <p className="font-mono text-[0.55rem] tracking-[0.2em] text-ink-faint uppercase">
              Definisi lengkap
            </p>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-soft">
              Pengetahuan teknis, keterampilan yang tahan lama, dan sikap siap masa
              depan yang dibutuhkan untuk berkembang di dunia yang dipengaruhi AI.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Engage", "Ikut serta secara kritis"],
                ["Create", "Berkarya dengan agensi manusia"],
                ["Manage", "Membagi kerja manusia dan AI"],
                ["Shape", "Memperbaiki sistem AI"],
              ].map(([term, meaning]) => (
                <div
                  key={term}
                  className="rounded-lg bg-bg-soft/60 px-3 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]"
                >
                  <p className="text-[0.82rem] font-medium">{term}</p>
                  <p className="mt-0.5 text-[0.7rem] leading-snug text-ink-faint">
                    {meaning}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex items-start gap-2.5 rounded-lg border border-line px-3.5 py-2.5">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <p className="text-[0.76rem] leading-snug text-ink-soft">
                Kerangka ini ditulis untuk pendidikan dasar dan menengah, dan menjadi
                dasar asesmen PISA 2029. Prinsipnya berlaku juga untuk kita.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.5} className="mt-3 shrink-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="font-mono text-[0.55rem] tracking-[0.2em] text-accent uppercase">
            Hambatan yang disebut framework
          </span>
          {[
            "Pemahaman bersama belum ada",
            "Implementasi tidak konsisten",
            "AI masih terasa mistis",
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
