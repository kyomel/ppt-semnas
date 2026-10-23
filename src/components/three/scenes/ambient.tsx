"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus } from "@react-three/drei";
import type { Group, Points } from "three";
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

export function ForgeCore({ level = 0 }: { level?: number }) {
  const palette = usePalette();
  const core = useRef<Group>(null);
  const shell = useRef<Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y += delta * (0.18 + level * 0.42);
      core.current.rotation.x = Math.sin(time * 0.4) * 0.12;
      const scale = 0.92 + level * 0.2;
      core.current.scale.setScalar(
        scale + Math.sin(time * 1.6) * 0.012 * (1 + level),
      );
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.09;
      shell.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <Rig strength={0.34}>
      <group ref={core}>
        <Icosahedron args={[0.8, 2]}>
          <meshStandardMaterial
            color={palette.accent}
            emissive={palette.accent}
            emissiveIntensity={0.14 + level * 0.62}
            roughness={0.42}
            metalness={0.35}
            flatShading
          />
        </Icosahedron>
        <Icosahedron args={[0.95, 1]}>
          <meshBasicMaterial
            color={palette.ink}
            wireframe
            transparent
            opacity={0.22 + level * 0.2}
          />
        </Icosahedron>
      </group>

      <group ref={shell}>
        {[1.05, 1.2, 1.35].map((radius, i) => (
          <Torus
            key={radius}
            args={[radius, 0.003, 8, 140]}
            rotation={[
              Math.PI / 2 + i * 0.35,
              i * 0.5,
              i * 0.28,
            ]}
          >
            <meshBasicMaterial
              color={i === 0 ? palette.accent2 : palette.ink}
              transparent
              opacity={0.42 - i * 0.09}
            />
          </Torus>
        ))}
      </group>

      <pointLight
        position={[2.4, 2.6, 3.4]}
        intensity={16 + level * 34}
        color={palette.accent}
        distance={12}
      />
      <directionalLight position={[-3, 4, 2]} intensity={2.2} color={palette.ink} />
      <pointLight
        position={[-3, -1.6, 2]}
        intensity={8}
        color={palette.accent2}
        distance={12}
      />
      <ambientLight intensity={0.5} />
    </Rig>
  );
}
