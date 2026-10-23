"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";
import { ease, springSoft } from "@/config/theme";

export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 1.5,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(
    value,
    (v) => `${prefix}${v.toFixed(decimals).replace(".", ",")}${suffix}`,
  );

  useEffect(() => {
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration, ease });
    return () => controls.stop();
  }, [to, duration, value, reduce]);

  return <motion.span className={cn("tabular", className)}>{text}</motion.span>;
}

export function TiltCard({
  children,
  className,
  strength = 9,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, springSoft);
  const sry = useSpring(ry, springSoft);

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{
        rotateX: reduce ? 0 : srx,
        rotateY: reduce ? 0 : sry,
        transformPerspective: 1000,
      }}
      onPointerMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * strength);
        rx.set(-py * strength);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 24 });
  const sy = useSpring(y, { stiffness: 300, damping: 24 });

  return (
    <motion.div
      className={className}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
      onPointerMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function PointerGlow({
  className,
  size = 640,
  color = "var(--accent-soft)",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mx}% ${my}%, ${color}, transparent 68%)`;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ background: reduce ? undefined : background }}
      onPointerMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set(((event.clientX - rect.left) / rect.width) * 100);
        my.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
    />
  );
}

export function useParallax(strength = 12) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: PointerEvent) => {
      x.set((event.clientX / window.innerWidth - 0.5) * strength);
      y.set((event.clientY / window.innerHeight - 0.5) * strength);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, strength, x, y]);

  return { x: reduce ? 0 : sx, y: reduce ? 0 : sy };
}

export function useHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    bind: {
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
    },
  };
}
