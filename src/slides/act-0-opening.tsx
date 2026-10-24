"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SceneCanvas } from "@/components/three/scene-host";
import { SplitText } from "@/components/motion/text";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/containers";
import { PointerGlow } from "@/components/motion/interactive";
import { deck, sections } from "@/config/deck";
import { ease } from "@/config/theme";

export function IntroSlide() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-bg text-ink">
      <div className="grain" aria-hidden />

      <div className="absolute inset-y-0 right-[-6%] w-[64%] [mask-image:radial-gradient(ellipse_at_58%_50%,black_28%,transparent_74%)]">
        <SceneCanvas kind="veil" className="opacity-95" />
      </div>

      <PointerGlow className="z-0 opacity-70" size={760} />

      <div className="relative z-10 flex h-full flex-col justify-between px-[clamp(2rem,4.4vw,4.75rem)] pb-[clamp(4.5rem,9vh,6rem)] pt-[clamp(1.6rem,3vh,2.4rem)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[0.62rem] tracking-[0.28em] text-ink-soft uppercase">
              {deck.event}
            </span>
          </div>
          <div className="text-right">
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint uppercase">
              {deck.dateLabel}
            </p>
            <p className="mt-1 font-mono text-[0.58rem] tracking-[0.18em] text-ink-faint uppercase">
              {deck.durationMinutes} menit · {deck.location}
            </p>
          </div>
        </div>

        <div className="max-w-[46rem]">
          <motion.p
            className="mb-5 font-mono text-[0.62rem] tracking-[0.3em] text-accent uppercase"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            Awam ke Advanced
          </motion.p>

          <h1 className="font-display text-[clamp(2.1rem,4.15vw,4.35rem)] leading-[1.02] tracking-[-0.025em]">
            <span className="block">
              <SplitText text="Meningkatkan Literasi" delay={0.16} />
            </span>
            <span className="block">
              <SplitText text="dan Mindset" delay={0.34} />{" "}
              <span className="italic text-accent">
                <SplitText text="Pemahaman AI" delay={0.46} />
              </span>
            </span>
          </h1>

          <Reveal delay={0.72} y={14}>
            <p className="mt-6 max-w-[46ch] text-[clamp(0.94rem,1.15vw,1.14rem)] leading-relaxed text-ink-soft">
              Satu jam untuk pindah dari “bisa pakai” ke “paham”. Bukan daftar
              tool baru, tapi cara berpikir yang membuat AI berguna dan aman.
            </p>
          </Reveal>

          <Reveal delay={0.82} y={12}>
            <div className="mt-5 flex max-w-[50ch] items-start gap-3 border-l-2 border-accent pl-3.5">
              <span className="shrink-0 pt-0.5 font-mono text-[0.56rem] tracking-[0.18em] text-accent uppercase">
                Kabar terbaru
              </span>
              <div>
                <p className="text-[0.8rem] leading-snug text-ink-soft">
                  Gedung Putih (25 Sep 2026): Trump dan Xi sepakat memakai “Super
                  Intelligence” (SI) menggantikan “AI”. Rilis resmi Tiongkok tetap
                  menulis AI. Namanya baru, mesinnya sama.
                </p>
                <p className="mt-1 font-mono text-[0.5rem] tracking-[0.12em] text-ink-faint uppercase">
                  White House 25 dan 29 Sep · Kemlu Tiongkok 26 Sep 2026
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex items-end justify-between gap-8">
          <Reveal delay={0.9} y={10}>
            <div className="flex items-center gap-3.5">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-ink text-bg">
                <span className="font-display text-[0.95rem] leading-none">
                  {deck.speaker.slice(0, 1).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[0.86rem] leading-tight font-medium">
                  {deck.speaker}
                </p>
                <p className="font-mono text-[0.56rem] tracking-[0.16em] text-ink-faint uppercase">
                  {deck.speakerRole}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} y={10}>
            <a
              href="#/slide/2"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-[0.72rem] font-medium tracking-[0.02em] text-bg transition-transform hover:-translate-y-0.5"
            >
              Mulai
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-[calc(clamp(2.6rem,4.4vh,3.4rem)+0.9rem)] left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease }}
      >
        <p className="flex items-center gap-2 font-mono text-[0.54rem] tracking-[0.22em] text-ink-faint uppercase">
          <kbd className="rounded border border-line px-1 py-0.5">←</kbd>
          <kbd className="rounded border border-line px-1 py-0.5">→</kbd>
          navigasi
          <span className="mx-1 opacity-40">·</span>
          <kbd className="rounded border border-line px-1 py-0.5">esc</kbd>
          ikhtisar
        </p>
      </motion.div>
    </section>
  );
}

const contentSlides = sections.reduce((sum, section) => sum + section.slides, 0);

export function OverviewSlide({ index }: { index: number }) {
  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-bg text-ink">
      <div className="grain" aria-hidden />
      <div className="flex shrink-0 items-center justify-between px-[clamp(2rem,4.4vw,4.75rem)] pt-[clamp(1.4rem,2.6vh,2rem)]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.62rem] tracking-[0.28em] text-accent uppercase">
            Agenda
          </span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint tabular">
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <p className="font-mono text-[0.58rem] tracking-[0.18em] text-ink-faint uppercase">
          Enam bagian · {contentSlides} slide konten
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2rem,4.4vw,4.75rem)] pb-[clamp(4.5rem,9vh,6rem)] pt-[clamp(1.2rem,3vh,2.2rem)]">
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-[clamp(2rem,3.3vw,3.3rem)] leading-[1.04]">
            <SplitText text="Apa yang kita" />
            <br />
            <SplitText text="lewati hari ini" delay={0.16} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-[34ch] text-[clamp(0.9rem,1.05vw,1.05rem)] leading-relaxed text-ink-soft">
              Urutannya sengaja: paham dulu cara kerjanya, lihat datanya, baru
              ubah cara berpikir, lalu latih keterampilannya.
            </p>
          </Reveal>
        </div>

        <Stagger className="flex flex-col justify-center" delay={0.2}>
          {sections.map((section, i) => (
            <StaggerItem key={section.id}>
              <a
                href={`#/slide/${section.firstSlide}`}
                className="group relative flex items-center gap-5 border-t border-line py-[clamp(0.7rem,1.5vh,1.05rem)] transition-colors last:border-b hover:border-line-strong"
              >
                <span className="font-mono text-[0.62rem] tracking-[0.1em] text-ink-faint tabular transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="w-[8.5rem] shrink-0 font-display text-[clamp(1.1rem,1.5vw,1.5rem)] leading-none transition-transform duration-500 group-hover:translate-x-1">
                  {section.label}
                </span>

                <span className="relative flex-1">
                  <span className="block text-[0.78rem] leading-snug text-ink-faint transition-colors duration-500 group-hover:text-ink-soft">
                    {section.blurb}
                  </span>
                </span>

                <span className="shrink-0 font-mono text-[0.55rem] tracking-[0.14em] text-ink-faint tabular">
                  {String(section.firstSlide).padStart(2, "0")}–
                  {String(section.firstSlide + section.slides - 1).padStart(2, "0")}
                </span>

                <ArrowRight
                  size={14}
                  className="-translate-x-2 text-accent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
