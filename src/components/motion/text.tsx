"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { ease, revealDuration, staggerStep } from "@/config/theme";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div";
};

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = staggerStep,
  as = "span",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Wrapper = as === "div" ? motion.div : motion.span;

  return (
    <Wrapper className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block" aria-hidden>
            <motion.span
              className="inline-block will-change-transform"
              initial={{
                y: reduce ? 0 : "0.55em",
                opacity: 0,
                filter: reduce ? "blur(0px)" : "blur(8px)",
              }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: reduce ? 0.18 : revealDuration,
                delay: delay + i * (reduce ? stagger * 0.2 : stagger),
                ease,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Wrapper>
  );
}

export function CharFade({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: reduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: delay + i * 0.018, ease }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
