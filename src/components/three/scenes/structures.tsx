"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { Rig, usePalette } from "@/components/three/primitives";

function useGrow(target: number, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const STEP_SPACING = 1.8;
const CUBE_SIZE = 0.68;
const CUBE_Y = 0.32;
const RAIL_Y = -0.52;
const ATTENTION_STEP = 2;

type StepState = "done" | "active" | "next" | "pending";

function stepX(index: number, total: number) {
  return (index - (total - 1) / 2) * STEP_SPACING;
}

export function TokenCubes({
  active = 0,
  count = 4,
  onPick,
}: {
  active?: number;
  count?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const group = useRef<THREE.Group>(null);
  const fill = useRef<THREE.Group>(null);
  const link = useRef<THREE.MeshBasicMaterial>(null);
  const total = Math.max(2, count);
  const current = Math.min(Math.max(active, 0), total - 1);
  const rowWidth = (total - 1) * STEP_SPACING + CUBE_SIZE;

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.07;
    }
    if (fill.current) {
      const target = (stepX(current, total) + rowWidth / 2) / rowWidth;
      fill.current.scale.x = THREE.MathUtils.damp(
        fill.current.scale.x,
        target,
        6,
        delta,
      );
    }
    if (link.current) {
      const target = current === ATTENTION_STEP ? 0.6 : 0.04;
      link.current.opacity = THREE.MathUtils.damp(
        link.current.opacity,
        target,
        5,
        delta,
      );
    }
  });

  return (
    <Rig strength={0.26}>
      <group ref={group}>
        <mesh position={[0, RAIL_Y, 0]}>
          <boxGeometry args={[rowWidth, 0.035, 0.035]} />
          <meshBasicMaterial color={palette.ink} transparent opacity={0.3} />
        </mesh>
        <group ref={fill} position={[-rowWidth / 2, RAIL_Y, 0]} scale={[0.001, 1, 1]}>
          <mesh position={[rowWidth / 2, 0, 0]}>
            <boxGeometry args={[rowWidth, 0.055, 0.055]} />
            <meshBasicMaterial color={palette.accent} transparent opacity={0.95} />
          </mesh>
        </group>
        <mesh position={[0, 0, -0.62]}>
          <boxGeometry args={[rowWidth, 0.045, 0.045]} />
          <meshBasicMaterial
            ref={link}
            color={palette.accent}
            transparent
            opacity={0.04}
          />
        </mesh>

        {Array.from({ length: total }, (_, i) => {
          const state: StepState =
            i === current
              ? "active"
              : i < current
                ? "done"
                : i === current + 1
                  ? "next"
                  : "pending";
          return (
            <Cube
              key={i}
              position={[stepX(i, total), CUBE_Y, 0]}
              state={state}
              color={state === "active" ? palette.accent : palette.ink}
              accent={palette.accent}
              onClick={() => onPick?.(i)}
            />
          );
        })}
      </group>
      <pointLight position={[0, 3, 4]} intensity={14} color={palette.accent} distance={14} />
      <ambientLight intensity={0.7} />
    </Rig>
  );
}

function Cube({
  position,
  state,
  color,
  accent,
  onClick,
}: {
  position: [number, number, number];
  state: StepState;
  color: string;
  accent: string;
  onClick: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const pulseMat = useRef<THREE.MeshBasicMaterial>(null);
  const phase = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((frame, delta) => {
    if (!mesh.current) return;
    const time = frame.clock.elapsedTime;
    const base =
      state === "active" ? 1.24 : state === "next" ? 1.06 : state === "done" ? 0.94 : 0.82;
    const target = hovered ? base * 1.07 : base;
    const scale = THREE.MathUtils.damp(mesh.current.scale.x, target, 7, delta);
    mesh.current.scale.setScalar(scale);
    mesh.current.rotation.y += delta * (state === "active" ? 0.8 : 0.16);
    mesh.current.position.y =
      Math.sin(time * 1.3 + position[0]) * (state === "active" ? 0.1 : 0.02);
    const material = mesh.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = THREE.MathUtils.damp(
      material.emissiveIntensity,
      state === "active" ? 0.9 : hovered ? 0.45 : state === "next" ? 0.16 : 0.05,
      6,
      delta,
    );
    material.opacity = THREE.MathUtils.damp(
      material.opacity,
      state === "active" ? 1 : state === "done" ? 0.7 : state === "next" ? 0.5 : 0.3,
      6,
      delta,
    );

    if (pulse.current && pulseMat.current) {
      phase.current =
        state === "active" ? (phase.current + delta / 1.5) % 1 : 0;
      const t = phase.current;
      pulse.current.scale.setScalar(0.9 + t * 1.3);
      pulseMat.current.opacity = state === "active" ? (1 - t) * 0.6 : 0;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        rotation={[0.36, 0.42, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.06}
          roughness={0.32}
          metalness={0.42}
          transparent
          opacity={0.22}
        />
      </mesh>
      <mesh ref={pulse} position={[0, 0, 0]}>
        <ringGeometry args={[0.52, 0.58, 64]} />
        <meshBasicMaterial
          ref={pulseMat}
          color={accent}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

const GAUGES = [
  { value: 49.96, radius: 1.55, accent: true },
  { value: 18.2, radius: 1.08, accent: false },
  { value: 68, radius: 0.62, accent: false },
];

export function GaugeCluster({ active = 0 }: { active?: number }) {
  const palette = usePalette();
  const grow = useGrow(1, 1400);

  return (
    <Rig strength={0.2}>
      <group>
        {GAUGES.map((gauge, i) => {
          const arc = ((gauge.value / 100) * Math.PI * 2 * grow) / 1;
          const color = gauge.accent
            ? palette.accent
            : i === 1
              ? palette.accent2
              : palette.accent3;
          const dim = active !== 0 && active !== i;
          return (
            <group key={gauge.radius}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[gauge.radius, 0.006, 8, 128]} />
                <meshBasicMaterial color={palette.ink} transparent opacity={0.16} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry
                  args={[
                    gauge.radius,
                    dim ? 0.018 : 0.034,
                    12,
                    200,
                    Math.max(arc, 0.0001),
                  ]}
                />
                <meshBasicMaterial color={color} transparent opacity={dim ? 0.35 : 1} />
              </mesh>
            </group>
          );
        })}
        {/* threshold tick at the 50% mark */}
        <mesh position={[0, -1.72, 0]}>
          <boxGeometry args={[0.16, 0.008, 0.008]} />
          <meshBasicMaterial color={palette.ink} transparent opacity={0.55} />
        </mesh>
      </group>
      <ambientLight intensity={1} />
    </Rig>
  );
}

const STAIR_LEVELS = [0, 1, 2, 3, 4];

export function StairBlocks({
  active = 0,
  onPick,
}: {
  active?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const grow = useGrow(1, 1200);

  return (
    <Rig strength={0.24} idle={0.42}>
      <group position={[0, -1.35, 0]}>
        {STAIR_LEVELS.map((level) => {
          const height = 0.34 + level * 0.42;
          const isActive = level === active;
          const x = (level - 2) * 0.92;
          return (
            <group key={level} position={[x, 0, 0]}>
              <mesh
                position={[0, (height * grow) / 2, 0]}
                onClick={(event) => {
                  event.stopPropagation();
                  onPick?.(level);
                }}
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "";
                }}
              >
                <boxGeometry args={[0.74, height * grow, 0.74]} />
                <meshStandardMaterial
                  color={isActive ? palette.accent : palette.ink}
                  emissive={isActive ? palette.accent : palette.ink}
                  emissiveIntensity={isActive ? 0.55 : 0.06}
                  roughness={0.4}
                  metalness={0.3}
                  transparent
                  opacity={isActive ? 1 : 0.36}
                />
              </mesh>
              {isActive ? (
                <pointLight
                  position={[0, height + 0.4, 0.4]}
                  intensity={8}
                  color={palette.accent}
                  distance={4}
                />
              ) : null}
            </group>
          );
        })}
      </group>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 4, 3]} intensity={10} color={palette.ink} distance={14} />
    </Rig>
  );
}

const DOMAIN_POSITIONS: Array<[number, number, number]> = [
  [-1.7, -1.1, 0.2],
  [-0.55, 0.9, -0.5],
  [0.7, -0.55, 0.7],
  [1.85, 0.95, -0.2],
];

export function DomainOrbit({
  active = 0,
  onPick,
}: {
  active?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const colors = [palette.accent, palette.accent2, palette.accent3, palette.ink];

  const connections = useMemo(
    () =>
      DOMAIN_POSITIONS.map((position, i) => {
        const next = DOMAIN_POSITIONS[(i + 1) % DOMAIN_POSITIONS.length];
        return { from: position, to: next, i };
      }),
    [],
  );

  return (
    <Rig strength={0.3} idle={0.2}>
      <group>
        {connections.map(({ from, to, i }) => (
          <Line
            key={i}
            points={[from, to]}
            color={palette.ink}
            transparent
            opacity={0.2}
            lineWidth={1}
          />
        ))}
        {DOMAIN_POSITIONS.map((position, i) => {
          const isActive = i === active;
          return (
            <group key={i} position={position}>
              <mesh
                onClick={(event) => {
                  event.stopPropagation();
                  onPick?.(i);
                }}
                onPointerOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "";
                }}
              >
                <icosahedronGeometry args={[isActive ? 0.34 : 0.24, 1]} />
                <meshStandardMaterial
                  color={colors[i]}
                  emissive={colors[i]}
                  emissiveIntensity={isActive ? 0.8 : 0.22}
                  roughness={0.3}
                  metalness={0.45}
                  flatShading
                />
              </mesh>
              <mesh>
                <sphereGeometry args={[isActive ? 0.5 : 0.36, 24, 24]} />
                <meshBasicMaterial
                  color={colors[i]}
                  transparent
                  opacity={isActive ? 0.09 : 0.04}
                  depthWrite={false}
                />
              </mesh>
              <Line
                points={[
                  [0, 0, 0],
                  [-position[0] * 0.9, -position[1] * 0.9, -position[2] * 0.9],
                ]}
                color={colors[i]}
                transparent
                opacity={isActive ? 0.5 : 0.12}
                lineWidth={1}
              />
            </group>
          );
        })}
      </group>
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 2, 4]} intensity={16} color={palette.accent} distance={14} />
      <pointLight position={[-3, -2, 3]} intensity={10} color={palette.accent2} distance={14} />
    </Rig>
  );
}
