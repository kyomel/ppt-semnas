"use client";

import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LayoutGrid,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";
import { ThemeToggle } from "@/components/deck/theme-toggle";

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md text-ink-soft transition-colors",
        "hover:bg-ink/5 hover:text-ink",
        disabled && "pointer-events-none opacity-25",
      )}
    >
      {children}
    </button>
  );
}

export function NavigationBar({
  index,
  total,
  sectionLabel,
  progress,
  isFullscreen,
  onPrev,
  onNext,
  onOverview,
  onHelp,
  onFullscreen,
}: {
  index: number;
  total: number;
  sectionLabel: string;
  progress: number;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOverview: () => void;
  onHelp: () => void;
  onFullscreen: () => void;
}) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
      <div className="pointer-events-auto relative flex h-[clamp(2.6rem,4.4vh,3.4rem)] items-center justify-between gap-6 border-t border-line bg-bg/72 px-[clamp(1.1rem,2vw,2rem)] backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink tabular">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.68rem] text-ink-faint">/</span>
          <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-faint tabular">
            {String(total).padStart(2, "0")}
          </span>
          <span className="mx-1 hidden h-3 w-px bg-line md:block" />
          <motion.span
            key={sectionLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="hidden truncate font-mono text-[0.6rem] tracking-[0.22em] text-ink-faint uppercase md:block"
          >
            {sectionLabel}
          </motion.span>
        </div>

        <div className="flex items-center gap-0.5">
          <IconButton label="Slide sebelumnya" onClick={onPrev} disabled={index === 0}>
            <ChevronLeft size={16} />
          </IconButton>
          <IconButton
            label="Slide berikutnya"
            onClick={onNext}
            disabled={index === total - 1}
          >
            <ChevronRight size={16} />
          </IconButton>
          <span className="mx-1.5 h-3.5 w-px bg-line" />
          <IconButton label="Ikhtisar slide (Esc)" onClick={onOverview}>
            <LayoutGrid size={15} />
          </IconButton>
          <ThemeToggle />
          <IconButton
            label={isFullscreen ? "Keluar layar penuh" : "Layar penuh (F)"}
            onClick={onFullscreen}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </IconButton>
          <IconButton label="Pintasan keyboard (?)" onClick={onHelp}>
            <CircleHelp size={15} />
          </IconButton>
        </div>
      </div>

      <div className="h-[2px] w-full bg-line/60">
        <motion.div
          className="h-full origin-left bg-accent"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.55, ease }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </footer>
  );
}
