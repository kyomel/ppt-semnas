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

export function TokenCubes({
  active = 0,
  onPick,
}: {
  active?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const group = useRef<THREE.Group>(null);
  const total = 7;

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
  });

  return (
    <Rig strength={0.26}>
      <group ref={group}>
        {Array.from({ length: total }, (_, i) => {
          const x = (i - (total - 1) / 2) * 0.92;
          const isActive = i === active;
          const isNext = i === active + 1;
          return (
            <Cube
              key={i}
              position={[x, 0, 0]}
              active={isActive}
              next={isNext}
              color={isActive ? palette.accent : palette.ink}
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
  active,
  next,
  color,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  next: boolean;
  color: string;
  onClick: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const base = active ? 1.2 : next ? 1.02 : 0.86;
    const target = hovered ? base * 1.08 : base;
    const scale = THREE.MathUtils.damp(mesh.current.scale.x, target, 7, delta);
    mesh.current.scale.setScalar(scale);
    mesh.current.rotation.y += delta * (active ? 0.9 : 0.18);
    mesh.current.position.y =
      Math.sin(time * 1.4 + position[0]) * (active ? 0.12 : 0.05);
    const material = mesh.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = THREE.MathUtils.damp(
      material.emissiveIntensity,
      active ? 0.85 : hovered ? 0.4 : 0.06,
      6,
      delta,
    );
  });

  return (
    <mesh
      ref={mesh}
      position={position}
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
      <boxGeometry args={[0.54, 0.54, 0.54]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.06}
        roughness={0.32}
        metalness={0.42}
        transparent
        opacity={active ? 1 : 0.82}
      />
    </mesh>
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
