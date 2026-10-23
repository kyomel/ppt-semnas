"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { Rig, usePalette } from "@/components/three/primitives";

const TIMELINE_NODES = [
  { x: -4.3, y: 0.34 },
  { x: -2.87, y: -0.26 },
  { x: -1.43, y: 0.3 },
  { x: 0, y: -0.22 },
  { x: 1.43, y: 0.33 },
  { x: 2.87, y: -0.2 },
  { x: 4.3, y: 0.26 },
];

export function TimelineRail({
  active = 0,
  onPick,
}: {
  active?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const points = TIMELINE_NODES.map(
      (node) => new THREE.Vector3(node.x, node.y, 0),
    );
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const curvePoints = useMemo(() => curve.getPoints(120), [curve]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = -TIMELINE_NODES[active].x * 0.3;
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      targetX,
      3.2,
      delta,
    );
    if (glow.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.12;
      glow.current.scale.setScalar(pulse);
    }
  });

  return (
    <Rig strength={0.18}>
      <group ref={group}>
        <Line
          points={curvePoints}
          color={palette.ink}
          transparent
          opacity={0.22}
          lineWidth={1.2}
        />

        {TIMELINE_NODES.map((node, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <group key={i} position={[node.x, node.y, 0]}>
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
                <sphereGeometry args={[isActive ? 0.1 : 0.062, 20, 20]} />
                <meshBasicMaterial
                  color={isActive ? palette.accent : isPast ? palette.accent2 : palette.ink}
                  transparent
                  opacity={isActive ? 1 : 0.55}
                />
              </mesh>
              {isActive ? (
                <mesh ref={glow}>
                  <ringGeometry args={[0.17, 0.184, 48]} />
                  <meshBasicMaterial
                    color={palette.accent}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              ) : null}
              <mesh position={[0, -0.24, 0]}>
                <boxGeometry args={[0.006, 0.12, 0.006]} />
                <meshBasicMaterial color={palette.ink} transparent opacity={0.18} />
              </mesh>
            </group>
          );
        })}
      </group>
      <ambientLight intensity={1} />
    </Rig>
  );
}

const AGENT_NODES: Array<[number, number, number]> = [
  [0, 1.35, 0],
  [1.3, -0.75, 0],
  [-1.3, -0.75, 0],
];

export function AgentGraph({
  active = 0,
  level = 0.4,
  onPick,
}: {
  active?: number;
  level?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const travelers = useRef<Array<THREE.Mesh | null>>([]);

  const edges = useMemo(
    () => [
      [AGENT_NODES[0], AGENT_NODES[1]],
      [AGENT_NODES[1], AGENT_NODES[2]],
      [AGENT_NODES[2], AGENT_NODES[0]],
    ] as Array<[[number, number, number], [number, number, number]]>,
    [],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    travelers.current.forEach((mesh, i) => {
      if (!mesh) return;
      const [from, to] = edges[i];
      const progress = (time * (0.22 + level * 0.3) + i / 3) % 1;
      mesh.position.set(
        from[0] + (to[0] - from[0]) * progress,
        from[1] + (to[1] - from[1]) * progress,
        0,
      );
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = Math.sin(progress * Math.PI) * (0.7 + level * 0.3);
    });
  });

  return (
    <Rig strength={0.26}>
      <group>
        {edges.map(([from, to], i) => (
          <Line
            key={i}
            points={[from, to]}
            color={palette.ink}
            transparent
            opacity={0.22}
            lineWidth={1}
          />
        ))}

        {edges.map((_, i) => (
          <mesh
            key={`traveler-${i}`}
            ref={(node) => {
              travelers.current[i] = node;
            }}
          >
            <sphereGeometry args={[0.055, 14, 14]} />
            <meshBasicMaterial color={palette.accent} transparent opacity={0.8} />
          </mesh>
        ))}

        {AGENT_NODES.map((position, i) => {
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
                <icosahedronGeometry args={[isActive ? 0.36 : 0.26, 0]} />
                <meshStandardMaterial
                  color={isActive ? palette.accent : palette.ink}
                  emissive={isActive ? palette.accent : palette.ink}
                  emissiveIntensity={isActive ? 0.7 : 0.12}
                  roughness={0.35}
                  metalness={0.4}
                  flatShading
                />
              </mesh>
              <mesh>
                <sphereGeometry args={[isActive ? 0.62 : 0.48, 20, 20]} />
                <meshBasicMaterial
                  color={isActive ? palette.accent : palette.ink}
                  transparent
                  opacity={0.05}
                  depthWrite={false}
                />
              </mesh>
            </group>
          );
        })}
      </group>
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 2.4, 3.4]} intensity={14} color={palette.accent} distance={12} />
    </Rig>
  );
}

const FLOW_NODES: Array<[number, number, number]> = [
  [-3.3, 0.9, 0],
  [-1.2, 1.5, -0.4],
  [1.1, 0.85, 0.3],
  [3.2, 1.35, -0.2],
  [2.4, -1.1, 0.4],
  [-1.6, -1.2, -0.3],
];

export function FlowGraph({
  active = 0,
  onPick,
}: {
  active?: number;
  onPick?: (index: number) => void;
}) {
  const palette = usePalette();
  const dots = useRef<Array<THREE.Mesh | null>>([]);

  const edges = useMemo(
    () =>
      FLOW_NODES.map((node, i) => {
        const next = FLOW_NODES[(i + 1) % FLOW_NODES.length];
        return [node, next] as [[number, number, number], [number, number, number]];
      }),
    [],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    dots.current.forEach((mesh, i) => {
      if (!mesh) return;
      const [from, to] = edges[i];
      const progress = (time * 0.28 + i * 0.16) % 1;
      mesh.position.set(
        from[0] + (to[0] - from[0]) * progress,
        from[1] + (to[1] - from[1]) * progress,
        from[2] + (to[2] - from[2]) * progress,
      );
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = Math.sin(progress * Math.PI) * 0.85;
    });
  });

  return (
    <Rig strength={0.24} idle={0.14}>
      <group>
        {edges.map(([from, to], i) => (
          <Line
            key={i}
            points={[from, to]}
            color={palette.ink}
            transparent
            opacity={0.2}
            lineWidth={1}
          />
        ))}
        {edges.map((_, i) => (
          <mesh
            key={`dot-${i}`}
            ref={(node) => {
              dots.current[i] = node;
            }}
          >
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={palette.accent2} transparent opacity={0.8} />
          </mesh>
        ))}
        {FLOW_NODES.map((position, i) => {
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
                <sphereGeometry args={[isActive ? 0.3 : 0.18, 24, 24]} />
                <meshStandardMaterial
                  color={isActive ? palette.accent : palette.ink}
                  emissive={isActive ? palette.accent : palette.ink}
                  emissiveIntensity={isActive ? 0.9 : 0.18}
                  roughness={0.3}
                  metalness={0.4}
                />
              </mesh>
              <mesh>
                <ringGeometry args={[isActive ? 0.4 : 0.27, isActive ? 0.415 : 0.278, 40]} />
                <meshBasicMaterial
                  color={isActive ? palette.accent : palette.ink}
                  transparent
                  opacity={isActive ? 0.75 : 0.18}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
      <ambientLight intensity={1} />
      <pointLight position={[0, 3, 4]} intensity={12} color={palette.accent} distance={14} />
    </Rig>
  );
}
