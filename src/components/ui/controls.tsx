"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";

export function FlipCard({
  front,
  back,
  className,
  height = "h-[13.5rem]",
  onFlip,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  height?: string;
  onFlip?: (flipped: boolean) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() => {
        const next = !flipped;
        setFlipped(next);
        onFlip?.(next);
      }}
      aria-pressed={flipped}
      className={cn("group block w-full text-left [perspective:1400px]", className)}
    >
      <motion.div
        className={cn("relative w-full", height)}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0.18 : 0.62, ease }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-xl bg-bg-soft/60 p-4 shadow-[inset_0_0_0_1px_var(--line)] transition-shadow group-hover:shadow-[inset_0_0_0_1px_var(--line-strong)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-xl bg-bg-deep/70 p-4 shadow-[inset_0_0_0_1px_var(--accent)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </button>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full bg-ink/5 p-0.5",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-full px-3 py-1 font-mono text-[0.58rem] tracking-[0.14em] uppercase transition-colors",
              active ? "text-bg" : "text-ink-faint hover:text-ink",
            )}
          >
            {active ? (
              <motion.span
                layoutId="segmented-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ duration: 0.34, ease }}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
