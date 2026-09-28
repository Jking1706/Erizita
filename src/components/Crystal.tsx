import { Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { CRYSTALS, type CrystalId, useGame } from '../game';

export function Crystal({ id, label, color, position, active }: { id: CrystalId; label: string; color: string; position: [number, number, number]; active: boolean }) {
  const playerPosition = useGame((state) => state.playerPosition);
  const distance = playerPosition.distanceTo(new THREE.Vector3(...position));
  const canInteract = distance < 1.05 && !active;

  return (
    <group position={position}>
      <Float speed={1.4} floatIntensity={0.18} rotationIntensity={0.45}>
        <mesh castShadow rotation={[0.2, 0.6, 0.2]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color={active ? color : '#8b8fa3'} emissive={color} emissiveIntensity={active ? 2.8 : 0.45} roughness={0.22} metalness={0.16} />
        </mesh>
      </Float>
      <pointLight color={color} intensity={active ? 7 : 1.2} distance={3.5} />
      <mesh receiveShadow position={[0, -0.48, 0]}>
        <cylinderGeometry args={[0.6, 0.72, 0.18, 7]} />
        <meshStandardMaterial color="#263752" roughness={0.8} />
      </mesh>
      <Text position={[0, 0.98, 0]} fontSize={0.22} color={active ? color : '#ccd4ff'} anchorX="center" anchorY="middle">
        {active ? `${label} activo` : label}
      </Text>
      {canInteract && (
        <Html position={[0, 1.35, 0]} center>
          <div className="prompt">Presiona E</div>
        </Html>
      )}
      <mesh visible={active} position={[0, -0.37, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.78, 0.86, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function PathMarkers() {
  return (
    <group>
      {CRYSTALS.map((crystal) => (
        <mesh key={crystal.id} position={[crystal.position[0] * 0.35, 0.14, crystal.position[2] * 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.11, 18]} />
          <meshBasicMaterial color={crystal.color} transparent opacity={0.85} />
        </mesh>
      ))}
      <mesh position={[0, 0.145, -5.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.39, 32]} />
        <meshBasicMaterial color="#c8b6ff" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}
