"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import type { SceneProps } from "@/components/three/scene-runtime";

export type { SceneKind, SceneProps } from "@/components/three/scene-runtime";

const SceneRuntime = dynamic(() => import("@/components/three/scene-runtime"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent-soft),transparent_70%)] opacity-40" />
  ),
});

export function SceneCanvas({ className, ...props }: SceneProps & { className?: string }) {
  return (
    <div className={cn("pointer-events-auto absolute inset-0", className)}>
      <SceneRuntime {...props} />
    </div>
  );
}
