"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Workflow } from "lucide-react";
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
                        "mt-0.5 font-mono text-[0.62rem] tabular transition-colors",
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
                      <span className="mt-0.5 block text-[0.72rem] leading-snug text-ink-faint">
                        {step.line}
                      </span>
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
              <span className="font-mono text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
                grup whatsapp
              </span>
              <span className="text-sm font-medium">SWE Growth</span>
              <a
                href="https://chat.whatsapp.com/Gafg6mZXgFaCydmb3bW8W2"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.62rem] tracking-[0.1em] text-accent underline-offset-4 hover:underline"
              >
                chat.whatsapp.com/Gafg6mZXgFaCydmb3bW8W2
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="mt-6 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
            <Badge tone="accent">terima kasih</Badge>
            {deck.event} · {deck.dateLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
