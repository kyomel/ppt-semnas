"use client";

import { cn } from "@/lib/cn";
import { SplitText } from "@/components/motion/text";
import { Reveal } from "@/components/motion/containers";

export function SlideShell({
  index,
  eyebrow,
  title,
  lead,
  source,
  children,
  variant = "default",
  className,
  contentClassName,
  titleClassName,
}: {
  index: number;
  eyebrow: string;
  title?: string;
  lead?: string;
  source?: string;
  children?: React.ReactNode;
  variant?: "default" | "center" | "bare";
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
}) {
  if (variant === "bare") {
    return (
      <section
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden bg-bg text-ink",
          className,
        )}
      >
        {children}
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden bg-bg text-ink",
        className,
      )}
    >
      <div className="grain" aria-hidden />

      <header className="flex shrink-0 items-center justify-between gap-4 px-[clamp(2rem,4.4vw,4.75rem)] pt-[clamp(1.4rem,2.6vh,2rem)]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.62rem] tracking-[0.28em] text-accent uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-faint tabular">
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </header>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col px-[clamp(2rem,4.4vw,4.75rem)] pt-[clamp(1rem,2.4vh,1.9rem)]",
          variant === "center" && "justify-center",
          contentClassName,
        )}
      >
        {title ? (
          <h2
            className={cn(
              "max-w-[40ch] font-display text-[clamp(1.9rem,3.15vw,3.15rem)] leading-[1.06] text-balance",
              titleClassName,
            )}
          >
            <SplitText text={title} />
          </h2>
        ) : null}

        {lead ? (
          <Reveal delay={0.18}>
            <p className="mt-[clamp(0.7rem,1.6vh,1.1rem)] max-w-[72ch] text-[clamp(1.05rem,1.7vw,1.7rem)] leading-snug text-ink-soft">
              {lead}
            </p>
          </Reveal>
        ) : null}

        {children ? (
          <div className="mt-[clamp(1.1rem,3vh,2.2rem)] flex min-h-0 flex-1 flex-col">
            {children}
          </div>
        ) : null}
      </div>

      {source ? (
        <div className="shrink-0 px-[clamp(2rem,4.4vw,4.75rem)] pt-1.5">
          <Reveal delay={0.4} y={4} blur={false}>
            <p className="max-w-[130ch] font-mono text-[0.62rem] leading-relaxed tracking-[0.03em] text-ink-faint">
              {source}
            </p>
          </Reveal>
        </div>
      ) : null}

      <div className="h-[clamp(3.5rem,6.8vh,4.3rem)] shrink-0" />
    </section>
  );
}

export function Panel({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "relative rounded-xl bg-bg-soft/70 shadow-[inset_0_0_0_1px_var(--line)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "accent2" | "accent3";
  className?: string;
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink-soft",
    accent: "bg-accent-soft text-accent",
    accent2: "bg-accent-2-soft text-accent-2",
    accent3: "bg-accent-3-soft text-accent-3",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[0.62rem] tracking-[0.24em] text-ink-faint uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
