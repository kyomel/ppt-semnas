"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

export function ThumbnailOverview({
  slides,
  index,
  onJump,
  onClose,
}: {
  slides: Array<{ id: string; section: string; short: string }>;
  index: number;
  onJump: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-50 bg-bg/96 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease }}
    >
      <div className="flex h-full flex-col px-[clamp(1.5rem,3.4vw,3.5rem)] pb-8 pt-[clamp(1.2rem,2.6vh,2rem)]">
        <div className="mb-4 flex shrink-0 items-end justify-between">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.26em] text-accent uppercase">
              Ikhtisar
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-none">
              Semua slide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup ikhtisar"
            className="grid h-9 w-9 place-items-center rounded-md text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>

        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-7 gap-[clamp(0.4rem,0.7vw,0.7rem)]">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <motion.button
                  key={slide.id}
                  type="button"
                  onClick={() => onJump(i)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.006, 0.24), ease }}
                  whileHover={{ y: -3 }}
                  className={cn(
                    "group relative flex aspect-[16/11] flex-col justify-between rounded-lg p-2 text-left transition-colors",
                    "bg-bg-soft/60 shadow-[inset_0_0_0_1px_var(--line)]",
                    active && "bg-accent-soft shadow-[inset_0_0_0_1.5px_var(--accent)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "font-mono text-[0.52rem] tracking-[0.1em] tabular",
                        active ? "text-accent" : "text-ink-faint",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-mono text-[0.42rem] tracking-[0.12em] text-ink-faint uppercase">
                      {slide.section}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "line-clamp-2 text-[0.6rem] leading-[1.2] font-medium tracking-tight",
                      active ? "text-ink" : "text-ink-soft group-hover:text-ink",
                    )}
                  >
                    {slide.short}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 shrink-0 font-mono text-[0.55rem] tracking-[0.1em] text-ink-faint">
          Klik untuk lompat · Esc untuk kembali
        </p>
      </div>
    </motion.div>
  );
}
