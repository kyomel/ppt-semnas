"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { scenePalette, type Palette } from "@/config/theme";

/**
 * R3F renders into its own reconciler root, so next-themes context does not
 * reach scene components. Read the theme class from the document instead.
 */
export function usePalette(): Palette {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark ? scenePalette.dark : scenePalette.light;
}

export function Rig({
  children,
  strength = 0.3,
  idle = 0,
}: {
  children: React.ReactNode;
  strength?: number;
  idle?: number;
}) {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const damp = Math.min(1, delta * 2.6);
    const targetY = state.pointer.x * strength + idle;
    const targetX = -state.pointer.y * strength * 0.55;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * damp;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * damp;
  });

  return <group ref={ref}>{children}</group>;
}

export function Spin({
  children,
  speed = 0.12,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}
