"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { ease } from "@/config/theme";
import { useDeckNav } from "@/lib/use-deck-nav";
import { NavigationBar } from "@/components/deck/navigation-bar";
import { ThumbnailOverview } from "@/components/deck/thumbnail-overview";
import { HelpOverlay } from "@/components/deck/help-overlay";
import { slides } from "@/slides";

export function SlideDeck() {
  const total = slides.length;
  const { index, direction, goTo, next, prev, first, last } = useDeckNav(total);
  const [overview, setOverview] = useState(false);
  const [help, setHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffer, setBuffer] = useState("");
  const bufferTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen can be blocked by the browser; the deck still works */
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const jumpToNumber = useCallback(
    (raw: string) => {
      const target = Number.parseInt(raw, 10);
      if (!Number.isNaN(target)) goTo(target - 1);
    },
    [goTo],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) {
        return;
      }

      if (event.key >= "0" && event.key <= "9" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        const nextBuffer = `${buffer}${event.key}`.slice(0, 3);
        setBuffer(nextBuffer);
        if (bufferTimer.current) window.clearTimeout(bufferTimer.current);
        bufferTimer.current = window.setTimeout(() => setBuffer(""), 1800);
        return;
      }

      if (event.key === "Enter" && buffer) {
        event.preventDefault();
        jumpToNumber(buffer);
        setBuffer("");
        return;
      }

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          event.preventDefault();
          setOverview(false);
          setHelp(false);
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          setOverview(false);
          setHelp(false);
          prev();
          break;
        case "Home":
          event.preventDefault();
          first();
          break;
        case "End":
          event.preventDefault();
          last();
          break;
        case "f":
        case "F":
          event.preventDefault();
          void toggleFullscreen();
          break;
        case "t":
        case "T":
          event.preventDefault();
          document.documentElement.classList.toggle("dark");
          break;
        case "?":
          event.preventDefault();
          setHelp((value) => !value);
          break;
        case "Escape":
          event.preventDefault();
          if (document.fullscreenElement) {
            void document.exitFullscreen();
          } else if (help) {
            setHelp(false);
          } else if (overview) {
            setOverview(false);
          } else {
            setOverview(true);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buffer, first, help, overview, jumpToNumber, last, next, prev, toggleFullscreen]);

  const current = slides[index];
  const Current = current.Component;

  const variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          opacity: 0,
          x: dir >= 0 ? 64 : -64,
          scale: 0.988,
        }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (dir: number) => ({
          opacity: 0,
          x: dir >= 0 ? -44 : 44,
          scale: 0.994,
        }),
      };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg text-ink">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current.id}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0.2 : 0.52, ease }}
        >
          <Current index={index + 1} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {buffer ? (
          <motion.div
            className="pointer-events-none absolute bottom-[calc(clamp(2.6rem,4.4vh,3.4rem)+1.4rem)] left-[clamp(1.1rem,2vw,2rem)] z-40 flex items-baseline gap-1.5 rounded-md bg-bg-soft/90 px-3 py-2 shadow-[inset_0_0_0_1px_var(--line)] backdrop-blur"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease }}
          >
            <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint uppercase">
              ke
            </span>
            <span className="font-mono text-base text-accent tabular">{buffer}</span>
            <span className="font-mono text-[0.62rem] tracking-[0.16em] text-ink-faint uppercase">
              enter
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <NavigationBar
        index={index}
        total={total}
        sectionLabel={current.section}
        progress={(index + 1) / total}
        isFullscreen={isFullscreen}
        onPrev={prev}
        onNext={next}
        onOverview={() => setOverview(true)}
        onHelp={() => setHelp(true)}
        onFullscreen={() => void toggleFullscreen()}
      />

      <AnimatePresence>
        {overview ? (
          <ThumbnailOverview
            slides={slides.map(({ id, section, short }) => ({ id, section, short }))}
            index={index}
            onJump={(i) => {
              goTo(i);
              setOverview(false);
            }}
            onClose={() => setOverview(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {help ? <HelpOverlay onClose={() => setHelp(false)} /> : null}
      </AnimatePresence>

      <div className={cn("sr-only")} aria-live="polite">
        {`Slide ${index + 1} dari ${total}: ${current.short}`}
      </div>
    </div>
  );
}
