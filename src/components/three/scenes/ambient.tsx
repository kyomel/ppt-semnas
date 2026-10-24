"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus } from "@react-three/drei";
import type { Points } from "three";
import { Rig, Spin, usePalette } from "@/components/three/primitives";

export function ParticleVeil({ intensity = 1 }: { intensity?: number }) {
  const palette = usePalette();
  const points = useRef<Points>(null);
  const count = 1400;

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    let seed = 0x9e3779b9;
    const random = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < count; i += 1) {
      const radius = 3 + random() * 3.4;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
      array[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.045;
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <>
      <Rig strength={0.22}>
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.024}
            color={palette.ink}
            transparent
            opacity={0.42 * intensity}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.9}>
          <Icosahedron args={[1.5, 1]}>
            <meshBasicMaterial
              color={palette.accent}
              wireframe
              transparent
              opacity={0.5}
            />
          </Icosahedron>
        </Float>

        <Icosahedron args={[0.92, 1]}>
          <meshBasicMaterial
            color={palette.ink}
            wireframe
            transparent
            opacity={0.16}
          />
        </Icosahedron>

        <Spin speed={0.16}>
          <Torus args={[2.35, 0.006, 8, 160]} rotation={[Math.PI / 2.35, 0.3, 0]}>
            <meshBasicMaterial
              color={palette.accent2}
              transparent
              opacity={0.55}
            />
          </Torus>
          <Torus args={[2.75, 0.004, 8, 160]} rotation={[Math.PI / 1.9, -0.5, 0.4]}>
            <meshBasicMaterial
              color={palette.ink}
              transparent
              opacity={0.2}
            />
          </Torus>
        </Spin>
      </Rig>
    </>
  );
}

