"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  Clapperboard,
  GraduationCap,
  Mic,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SlideShell, Badge } from "@/components/deck/slide-shell";
import { SceneCanvas } from "@/components/three/scene-host";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/containers";
import { Counter } from "@/components/motion/interactive";
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
      source="Sumber: APJII 2025 (indeks 49,96); APJII 2026 (18,2%; 27,34% pada 2025); Indonesia AI Report 2025 kumparan × Populix (68%; n=1.000, Gen Z dan Milenial urban). Tiga survei berbeda, jangan digabung. Pembanding: e-Conomy SEA 2026 (Google, Temasek, Bain; 21 Okt 2026) mengukur enam negara, bukan Indonesia saja."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-[clamp(1.5rem,3vw,3rem)]">
        <Stagger className="flex flex-col justify-center gap-2">
          <StaggerItem>
            <p className="mb-1 font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint uppercase">
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
                    <span className="mt-1 block font-mono text-[0.62rem] tracking-[0.12em] text-ink-faint uppercase">
                      {stat.source}
                    </span>
                  </span>
                </button>
              </StaggerItem>
            );
          })}
          <StaggerItem>
            <div className="mt-1 flex items-start gap-2.5 rounded-lg border border-line px-3.5 py-2.5">
              <span className="mt-0.5 shrink-0 font-mono text-[0.62rem] tracking-[0.16em] text-accent uppercase">
                pembanding
              </span>
              <p className="text-[0.72rem] leading-snug text-ink-soft">
                e-Conomy SEA 2026 (21 Okt): 58% penduduk usia kerja di enam negara
                Asia Tenggara sudah mengadopsi AI generatif. Ukurannya berbeda dari
                APJII, jadi jangan dikurangkan. Indonesia dan Filipina disebut punya
                ruang tumbuh terbesar.
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        <div className="relative min-h-0">
          <SceneCanvas kind="gauge" active={active} camera={[0, 0, 4.6]} />
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

function UsageBars({
  title,
  data,
  note,
}: {
  title: string;
  data: readonly { label: string; value: number; icon: LucideIcon }[];
  note: string;
}) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex min-h-0 flex-col">
      <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint uppercase">
        {title}
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        {data.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex flex-1 items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ink/5 text-ink-soft">
                <Icon size={13} />
              </span>
              <span className="w-[8.5rem] shrink-0 text-[0.8rem] leading-tight">
                {item.label}
              </span>
              <span className="relative h-8 flex-1 overflow-hidden rounded-sm bg-ink/[0.04]">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-sm bg-accent/85"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / max) * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
                />
              </span>
              <span className="w-14 shrink-0 text-right font-mono text-[0.84rem] text-ink tabular">
                {item.value.toFixed(1).replace(".", ",")}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-start gap-3 rounded-lg bg-bg-soft/60 px-4 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
        <Badge tone="accent">
          <TrendingUp size={10} /> catatan
        </Badge>
        <p className="text-[0.76rem] leading-snug text-ink-soft">{note}</p>
      </div>
    </div>
  );
}

export function UsageSlide({ index }: { index: number }) {
  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Untuk apa kita benar-benar memakai AI"
      lead="Setahun lalu edukasi memimpin. Sekarang hiburan, dan produktivitas ada di urutan ketiga."
      source="Sumber: APJII 2026 (n=8.700, 38 provinsi, 1 Feb-15 Mar 2026, MoE ±1,1%) lewat Metro TV, GoodStats, detik.com, dan Bisnis.com; pembanding 2025 dari Kompas dan Databoks. Alasan belum memakai dibaca dari bagan APJII oleh Metro TV dan GoodStats; sejumlah media menulis angka 2025 sebagai angka 2026."
    >
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(1.5rem,3vw,3rem)]">
        <UsageBars
          title="Menurut tujuan"
          data={PURPOSE}
          note="Pada 2025 edukasi memimpin (43,98%), hiburan 29,5%. Pada 2026 berbalik. Hanya 26,9% ke pekerjaan."
        />
        <UsageBars
          title="Menurut generasi"
          data={GENERATION}
          note="Semakin muda, semakin tinggi. Yang belum memakai AI, 2026: 43,1% merasa tidak butuh (2025: 22,7%), 35,5% belum tahu teknologinya (2025: 46,6%), 8,1% tidak tahu cara memakai (2025: 15,5%)."
        />
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

          <div className="mt-3 grid w-full max-w-[15rem] grid-cols-10 gap-[3px]">
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
                    isNeeded ? tone : "bg-ink/10",
                  )}
                />
              );
            })}
          </div>

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
                <p className="font-mono text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
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
  return (
    <SlideShell
      index={index}
      eyebrow="Realita"
      title="Literasi AI bukan sekadar bisa memakai tool"
      lead="Definisi OECD dan Komisi Eropa (2026). Empat kata kerjanya kita bahas di slide berikutnya."
      source="Sumber: OECD & European Commission, “Empowering Learners for the Age of AI: An AI Literacy Framework for Primary and Secondary Education” (Juni 2026). Berkontribusi pada asesmen PISA 2029 Media & AI Literacy."
    >
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-[clamp(1.8rem,3.4vw,3.6rem)]">
        <div className="flex flex-col justify-center">
          <div className="relative text-left">
            <span className="absolute -top-7 -left-1 font-display text-[4rem] leading-none text-accent/25 select-none">
              “
            </span>
            <blockquote className="font-display text-[clamp(1.5rem,2.45vw,2.45rem)] leading-[1.2] text-balance">
              AI literacy is{" "}
              <span className="italic text-accent">different from AI tool use</span>.
              Simply interacting with AI tools neither develops nor depends on the
              knowledge, skills or competences.
            </blockquote>
            <p className="mt-3 font-mono text-[0.62rem] tracking-[0.14em] text-ink-faint uppercase">
              OECD & European Commission, 2026
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <Reveal delay={0.15}>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint uppercase">
              Definisi lengkap
            </p>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">
              Pengetahuan teknis, keterampilan yang tahan lama, dan sikap siap masa
              depan yang dibutuhkan untuk berkembang di dunia yang dipengaruhi AI.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="flex items-start gap-2.5 rounded-lg border border-line px-3.5 py-2.5">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <p className="text-[0.78rem] leading-snug text-ink-soft">
                Kerangka ini ditulis untuk pendidikan dasar dan menengah, dan
                berkontribusi pada asesmen PISA 2029. Prinsipnya berlaku juga untuk
                kita.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.4} className="mt-3 shrink-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
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
