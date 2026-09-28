import { Sparkles, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Planet = { name: string; radius: number; size: number; color: string; speed: number; pluto?: boolean };

const PLANETS: Planet[] = [
  { name: 'Mercurio', radius: 1.25, size: 0.08, color: '#c4b7a6', speed: 0.58 },
  { name: 'Venus', radius: 1.85, size: 0.13, color: '#e8bd78', speed: 0.44 },
  { name: 'Tierra', radius: 2.55, size: 0.14, color: '#5bc7ff', speed: 0.34 },
  { name: 'Marte', radius: 3.22, size: 0.11, color: '#c5664a', speed: 0.28 },
  { name: 'Jupiter', radius: 4.35, size: 0.36, color: '#d8b184', speed: 0.2 },
  { name: 'Saturno', radius: 5.45, size: 0.29, color: '#d6c28a', speed: 0.16 },
  { name: 'Urano', radius: 6.35, size: 0.2, color: '#9ee8ff', speed: 0.12 },
  { name: 'Neptuno', radius: 7.18, size: 0.2, color: '#466dff', speed: 0.1 },
  { name: 'Pluton', radius: 8.12, size: 0.16, color: '#dff8ff', speed: 0.075, pluto: true },
];

export function SolarSystem() {
  return (
    <group position={[0, 1.05, -1.8]} scale={0.78}>
      <mesh>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial color="#fff1a8" emissive="#ffb347" emissiveIntensity={2.8} roughness={0.18} />
      </mesh>
      <pointLight color="#ffd166" intensity={6.5} distance={10} />
      {PLANETS.map((planet, index) => <PlanetOrbit key={planet.name} {...planet} index={index} />)}
      <Text position={[0, 2.25, 0]} fontSize={0.22} color="#fff1a8" anchorX="center">Sistema Solar</Text>
    </group>
  );
}

function PlanetOrbit({ name, radius, size, color, speed, index, pluto = false }: Planet & { index: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * speed + index * 0.72;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 128]} />
        <meshBasicMaterial color={pluto ? '#dff8ff' : '#566088'} transparent opacity={pluto ? 0.52 : 0.18} />
      </mesh>
      <group ref={ref}>
        <group position={[radius, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[size, 24, 24]} />
            <meshStandardMaterial color={color} emissive={pluto ? '#75d7ff' : color} emissiveIntensity={pluto ? 1.8 : 0.2} roughness={0.48} />
          </mesh>
          {name === 'Saturno' && (
            <mesh rotation={[Math.PI / 2.4, 0, 0]}>
              <ringGeometry args={[size * 1.45, size * 2.08, 48]} />
              <meshBasicMaterial color="#f4df9e" transparent opacity={0.48} side={THREE.DoubleSide} />
            </mesh>
          )}
          {pluto && (
            <>
              <pointLight color="#9bf6ff" intensity={4.8} distance={3.6} />
              <Sparkles count={28} scale={[1.2, 1.2, 1.2]} size={1.7} speed={0.22} color="#dff8ff" />
              <Text position={[0, 0.48, 0]} fontSize={0.16} color="#dff8ff" anchorX="center">Pluton</Text>
            </>
          )}
        </group>
      </group>
    </group>
  );
}

export function SpiralGalaxy({ seed, innerColor, outerColor }: { seed: number; innerColor: string; outerColor: string }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const inside = new THREE.Color(innerColor);
    const outside = new THREE.Color(outerColor);
    const mixed = new THREE.Color();

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 0.72) * 1.55;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;
      const spinAngle = radius * 4.2 + seed * 0.7;
      const randomness = Math.pow(1 - Math.random(), 3) * 0.42;
      const randomSign = Math.random() < 0.5 ? -1 : 1;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomness * randomSign;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.16;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomness * randomSign;
      mixed.copy(inside).lerp(outside, radius / 1.55);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, [innerColor, outerColor, seed]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.045 * seed;
    points.current.rotation.z = Math.sin(clock.elapsedTime * 0.18 + seed) * 0.05;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.86} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
