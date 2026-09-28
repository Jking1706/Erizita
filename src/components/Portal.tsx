import { Float, Html, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';
import { COSMIC_PORTAL_POSITION, useGame } from '../game';

export function CosmicPortal() {
  const playerPosition = useGame((state) => state.playerPosition);
  const canEnter = playerPosition.distanceTo(COSMIC_PORTAL_POSITION) < 1.75;

  return (
    <group position={[0, 0.35, -15.55]}>
      <Float speed={1.3} floatIntensity={0.1} rotationIntensity={0.12}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.35, 0.055, 18, 100]} />
          <meshStandardMaterial color="#dff8ff" emissive="#7c5cff" emissiveIntensity={2.2} roughness={0.22} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.88, 0.025, 12, 76]} />
          <meshBasicMaterial color="#9bf6ff" transparent opacity={0.55} />
        </mesh>
      </Float>
      <Sparkles count={45} scale={[2.4, 2.4, 0.4]} position={[0, 0.4, 0.12]} size={1.8} speed={0.32} color="#9bf6ff" />
      <pointLight position={[0, 1.25, 0]} color="#9bf6ff" intensity={5.8} distance={6.5} />
      <Text position={[0, 2.35, 0]} fontSize={0.24} color="#dff8ff" anchorX="center">Umbral Astral</Text>
      {canEnter && (
        <Html position={[0, 1.56, 0]} center>
          <div className="prompt">E: ver galaxias</div>
        </Html>
      )}
    </group>
  );
}

export function ReturnPortal() {
  const playerPosition = useGame((state) => state.playerPosition);
  const canReturn = playerPosition.distanceTo(new THREE.Vector3(0, 0.45, 9.4)) < 1.55;

  return (
    <group position={[0, 0.35, 9.4]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.05, 16, 84]} />
        <meshStandardMaterial color="#ffd166" emissive="#8d4bff" emissiveIntensity={1.8} roughness={0.24} />
      </mesh>
      <pointLight position={[0, 1.1, 0]} color="#ffd166" intensity={4.2} distance={5.5} />
      <Text position={[0, 1.82, 0]} fontSize={0.22} color="#fff1a8" anchorX="center">Volver al valle</Text>
      {canReturn && (
        <Html position={[0, 1.28, 0]} center>
          <div className="prompt">E: regresar</div>
        </Html>
      )}
    </group>
  );
}

export function PuzzleDoor({ solved }: { solved: boolean }) {
  return (
    <group position={[0, 0.25, -15.55]} scale={1.18}>
      <mesh castShadow position={[-0.95, 0.92, 0]}><boxGeometry args={[0.35, 1.85, 0.4]} /><meshStandardMaterial color="#5b4a86" roughness={0.55} /></mesh>
      <mesh castShadow position={[0.95, 0.92, 0]}><boxGeometry args={[0.35, 1.85, 0.4]} /><meshStandardMaterial color="#5b4a86" roughness={0.55} /></mesh>
      <mesh castShadow position={[0, 1.82, 0]}><boxGeometry args={[2.3, 0.3, 0.42]} /><meshStandardMaterial color="#5b4a86" roughness={0.55} /></mesh>
      <Float speed={solved ? 2.4 : 0.8} floatIntensity={solved ? 0.22 : 0.04} rotationIntensity={solved ? 0.35 : 0.03}>
        <mesh position={[0, 0.98, 0.03]} scale={solved ? [1, 1.35, 1] : [0.72, 0.9, 1]}>
          <torusGeometry args={[0.58, 0.045, 16, 96]} />
          <meshStandardMaterial color={solved ? '#c8b6ff' : '#33394f'} emissive={solved ? '#8d7cff' : '#10131f'} emissiveIntensity={solved ? 3.8 : 0.35} />
        </mesh>
      </Float>
      <Text position={[0, 2.32, 0]} fontSize={0.22} color={solved ? '#f7e8a4' : '#9ba3c7'} anchorX="center">{solved ? 'Portal abierto' : 'Activa los 3 cristales'}</Text>
    </group>
  );
}
