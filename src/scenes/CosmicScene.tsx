import { Environment, Float, Sparkles, Stars } from '@react-three/drei';
import { CuboidCollider } from '@react-three/rapier';
import { KenneyModel } from '../components/KenneyModel';
import { ReturnPortal } from '../components/Portal';
import { Player } from '../components/Player';
import { SolarSystem, SpiralGalaxy } from '../objects/SolarSystem';

export function CosmicScene() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <hemisphereLight args={['#456dff', '#02030c', 0.62]} />
      <pointLight position={[0, 4.8, 0]} color="#fff1a8" intensity={8} distance={18} />
      <pointLight position={[7, 2.2, -7]} color="#75d7ff" intensity={4.4} distance={12} />
      <Environment files="/textures/hdri/blaubeuren_night_1k.hdr" background={false} />
      <Stars radius={76} depth={44} count={2600} factor={4.3} saturation={0.58} fade speed={0.12} />
      <GalaxyFields />
      <CosmicFloor />
      <CosmicKenneyDebris />
      <SolarSystem />
      <ReturnPortal />
      <Player />
    </>
  );
}

function CosmicKenneyDebris() {
  const meteors = [
    ['/models/kenney/space/meteor.glb', [-6.8, 1.05, -6.2], [0.28, 0.72, -0.18], 0.72],
    ['/models/kenney/space/meteor_detailed.glb', [7.7, 1.3, -5.1], [-0.16, -0.48, 0.22], 0.58],
    ['/models/kenney/space/rocks_smallA.glb', [-8.4, 0.18, 4.4], [0, 0.32, 0], 0.88],
    ['/models/kenney/space/rocks_smallB.glb', [8.1, 0.18, 5.8], [0, -0.62, 0], 0.92],
  ] as const;

  return (
    <group>
      <KenneyModel path="/models/kenney/space/crater.glb" position={[-4.2, -0.215, 2.8]} rotation={[0, 0.35, 0]} scale={1.35} />
      <KenneyModel path="/models/kenney/space/craterLarge.glb" position={[5.4, -0.21, -2.6]} rotation={[0, -0.55, 0]} scale={1.12} />
      <KenneyModel path="/models/kenney/space/rock.glb" position={[2.1, 0.08, 6.9]} rotation={[0, 1.15, 0]} scale={0.72} />
      {meteors.map(([path, position, rotation, scale], index) => (
        <Float key={`${path}-${index}`} speed={0.55 + index * 0.1} floatIntensity={index < 2 ? 0.22 : 0.035} rotationIntensity={0.12}>
          <KenneyModel path={path} position={position} rotation={rotation} scale={scale} />
        </Float>
      ))}
    </group>
  );
}

function GalaxyFields() {
  const galaxies = [
    [-8, 6, -16, 4.8, '#8d7cff', '#ffd166', 0.34],
    [9, 5, -14, 5.4, '#9bf6ff', '#5b5cff', -0.28],
    [-11, 4, 7, 4.2, '#ff8fbd', '#6e44ff', 0.62],
    [10, 7, 9, 4.9, '#ffd166', '#ff6f91', -0.54],
  ] as const;

  return (
    <group>
      {galaxies.map(([x, y, z, scale, innerColor, outerColor, rotation], index) => (
        <Float key={`${x}-${z}`} speed={0.45} floatIntensity={0.18} rotationIntensity={0.08}>
          <group position={[x, y, z]} rotation={[0.85, rotation, 0.15]} scale={scale}>
            <SpiralGalaxy seed={index + 1} innerColor={innerColor} outerColor={outerColor} />
            <Sparkles count={42} scale={[2.2, 0.5, 2.2]} size={1.6} speed={0.16} color={innerColor} />
          </group>
        </Float>
      ))}
    </group>
  );
}

function CosmicFloor() {
  return (
    <group>
      <CuboidCollider args={[12, 0.18, 12]} position={[0, -0.36, 0]} friction={1.4} restitution={0} />
      <CuboidCollider args={[12, 2, 0.25]} position={[0, 1, -12]} />
      <CuboidCollider args={[12, 2, 0.25]} position={[0, 1, 12]} />
      <CuboidCollider args={[0.25, 2, 12]} position={[-12, 1, 0]} />
      <CuboidCollider args={[0.25, 2, 12]} position={[12, 1, 0]} />
      <mesh receiveShadow position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[13.5, 96]} />
        <meshStandardMaterial color="#090b1a" emissive="#101d4c" emissiveIntensity={0.26} roughness={0.86} />
      </mesh>
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[3.2, 3.26, 96]} /><meshBasicMaterial color="#6e44ff" transparent opacity={0.34} /></mesh>
      <mesh position={[0, -0.245, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[7.2, 7.26, 128]} /><meshBasicMaterial color="#9bf6ff" transparent opacity={0.2} /></mesh>
    </group>
  );
}
