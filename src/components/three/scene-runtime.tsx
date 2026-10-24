"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleVeil } from "./scenes/ambient";
import {
  DomainOrbit,
  GaugeCluster,
  StairBlocks,
  TokenCubes,
} from "./scenes/structures";
import { AgentGraph, FlowGraph, TimelineRail } from "./scenes/graphs";

export type SceneKind =
  | "veil"
  | "tokens"
  | "timeline"
  | "gauge"
  | "orbit"
  | "stairs"
  | "agent"
  | "flow";

export type SceneProps = {
  kind: SceneKind;
  active?: number;
  level?: number;
  count?: number;
  onPick?: (index: number) => void;
  camera?: [number, number, number];
  fov?: number;
};

function Scene({ kind, active = 0, level = 0.4, count, onPick }: SceneProps) {
  switch (kind) {
    case "veil":
      return <ParticleVeil />
    case "tokens":
      return <TokenCubes active={active} count={count} onPick={onPick} />;
    case "timeline":
      return <TimelineRail active={active} onPick={onPick} />;
    case "gauge":
      return <GaugeCluster active={active} />;
    case "orbit":
      return <DomainOrbit active={active} onPick={onPick} />;
    case "stairs":
      return <StairBlocks active={active} onPick={onPick} />;
    case "agent":
      return <AgentGraph active={active} level={level} onPick={onPick} />;
    case "flow":
      return <FlowGraph active={active} onPick={onPick} />;
    default:
      return null;
  }
}

export default function SceneRuntime({
  kind,
  active,
  level,
  count,
  onPick,
  camera = [0, 0, 6.2],
  fov = 42,
}: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: camera, fov }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
      }}
    >
      <Suspense fallback={null}>
        <Scene kind={kind} active={active} level={level} count={count} onPick={onPick} />
      </Suspense>
    </Canvas>
  );
}
