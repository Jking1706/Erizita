import { Environment, Float, Sparkles, Stars, Text } from '@react-three/drei';
import { CuboidCollider } from '@react-three/rapier';
import { CosmicPortal, PuzzleDoor } from '../components/Portal';
import { Crystal, PathMarkers } from '../components/Crystal';
import { KenneyModel } from '../components/KenneyModel';
import { Player } from '../components/Player';
import { CRYSTALS, useGame } from '../game';

export function ValleyScene() {
  const activated = useGame((state) => state.activated);
  const solved = Object.values(activated).every(Boolean);

  return (
    <>
      <ambientLight intensity={0.32} />
      <hemisphereLight args={['#7f87ff', '#140b16', 0.92]} />
      <directionalLight castShadow position={[-9, 15, 6]} color="#d9d4ff" intensity={2.05} shadow-mapSize={[2048, 2048]} shadow-camera-left={-22} shadow-camera-right={22} shadow-camera-top={22} shadow-camera-bottom={-22} />
      <spotLight position={[0, 11, 7]} angle={0.48} penumbra={0.72} color="#e6d7ff" intensity={2.1} distance={32} castShadow />
      <pointLight position={[0, 2.8, -15.5]} color="#8d7cff" intensity={solved ? 24 : 8} distance={18} />
      <Environment files="/textures/hdri/blaubeuren_night_1k.hdr" background={false} />
      <Stars radius={58} depth={28} count={1550} factor={3.35} saturation={0.22} fade speed={0.18} />
      <Sparkles count={170} scale={[32, 4.5, 32]} position={[0, 1.2, 0]} size={1.25} speed={0.18} color="#d9ccff" />
      <ValleyGround />
      <Landmarks />
      <KenneyGraveyardDetails />
      <PuzzleDoor solved={solved} />
      {CRYSTALS.map((crystal) => <Crystal key={crystal.id} {...crystal} active={activated[crystal.id]} />)}
      <Player />
      <CosmicPortal />
      <PathMarkers />
    </>
  );
}

function KenneyGraveyardDetails() {
  const graves = [
    ['/models/kenney/graveyard/gravestone-cross.glb', [-10.4, 0.18, -3.25], [0, -0.38, 0], 0.9],
    ['/models/kenney/graveyard/gravestone-broken.glb', [-9.55, 0.15, -4.05], [0, 0.28, 0], 0.86],
    ['/models/kenney/graveyard/gravestone-cross.glb', [9.25, 0.18, 4.35], [0, 0.52, 0], 0.82],
    ['/models/kenney/graveyard/gravestone-broken.glb', [10.28, 0.15, 5.12], [0, -0.18, 0], 0.76],
  ] as const;

  return (
    <group>
      <KenneyModel path="/models/kenney/graveyard/crypt.glb" position={[-11.85, 0.08, -6.0]} rotation={[0, 0.42, 0]} scale={0.82} />
      <KenneyModel path="/models/kenney/graveyard/crypt-small.glb" position={[11.05, 0.08, 6.85]} rotation={[0, -0.72, 0]} scale={0.76} />
      <KenneyModel path="/models/kenney/graveyard/coffin-old.glb" position={[-5.55, 0.1, 9.95]} rotation={[0, 1.18, 0]} scale={0.86} />
      <KenneyModel path="/models/kenney/graveyard/iron-fence-damaged.glb" position={[-13.1, 0.08, -4.25]} rotation={[0, 1.25, 0]} scale={0.9} />
      <KenneyModel path="/models/kenney/graveyard/iron-fence-damaged.glb" position={[12.15, 0.08, 4.8]} rotation={[0, -1.06, 0]} scale={0.9} />
      <Float speed={1.1} floatIntensity={0.045} rotationIntensity={0.035}>
        <KenneyModel path="/models/kenney/graveyard/fire-basket.glb" position={[2.35, 0.12, -4.9]} rotation={[0, -0.2, 0]} scale={0.82} />
        <pointLight position={[2.35, 1.05, -4.9]} color="#ffb05a" intensity={2.8} distance={4.6} />
      </Float>
      <KenneyModel path="/models/kenney/graveyard/candle.glb" position={[-2.05, 0.15, 11.05]} rotation={[0, 0.3, 0]} scale={0.72} />
      <pointLight position={[-2.05, 0.82, 11.05]} color="#ffd166" intensity={1.65} distance={2.6} />
      {graves.map(([path, position, rotation, scale]) => (
        <KenneyModel key={`${path}-${position[0]}-${position[2]}`} path={path} position={position} rotation={rotation} scale={scale} />
      ))}
    </group>
  );
}

function ValleyGround() {
  return (
    <group>
      <CuboidCollider args={[19, 0.18, 19]} position={[0, -0.1, 0]} friction={1.4} restitution={0} />
      <CuboidCollider args={[19, 2, 0.25]} position={[0, 1, -19]} />
      <CuboidCollider args={[19, 2, 0.25]} position={[0, 1, 19]} />
      <CuboidCollider args={[0.25, 2, 19]} position={[-19, 1, 0]} />
      <CuboidCollider args={[0.25, 2, 19]} position={[19, 1, 0]} />
      <CuboidCollider args={[0.55, 1.2, 0.55]} position={[-7.5, 0.9, 4.7]} />
      <CuboidCollider args={[0.55, 1.2, 0.55]} position={[7.7, 0.9, 4.95]} />
      <mesh receiveShadow position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[34, 160]} /><meshStandardMaterial color="#05050c" roughness={1} /></mesh>
      <mesh receiveShadow position={[0, -0.2, 0]}><cylinderGeometry args={[19.8, 17.8, 0.48, 18]} /><meshStandardMaterial color="#132426" roughness={0.98} metalness={0.02} /></mesh>
      <mesh receiveShadow position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[18.2, 144]} /><meshStandardMaterial color="#74747c" roughness={0.98} metalness={0.01} /></mesh>
      {[-9.8, -6.2, 7.6, 11.4, -13.2, 2.8, 14.2, -2.6].map((x, index) => (
        <mesh key={x} receiveShadow position={[x, 0.13, index % 2 ? -11 + index : 8 - index]} rotation={[-Math.PI / 2, 0, index * 0.37]} scale={[1.4, 0.8, 1]}>
          <ringGeometry args={[0.55, 1.2, 42]} /><meshStandardMaterial color={index % 2 ? '#8a8990' : '#696973'} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Landmarks() {
  const lanterns = [[-1.8, 3.8], [1.6, 0.8], [-2.9, -2.6], [2.5, -5.7], [-5.9, -7.4], [6.2, -8.0]] as const;
  const stations = [
    ['Jardin de los Votos', -2.8, 12.4, '#b8f7a1'],
    ['Anfiteatro Lunar', 13.5, -10.6, '#9bf6ff'],
    ['Capilla del Sol Negro', -12.8, -8.2, '#ffd166'],
    ['Plaza de las Promesas', 0, 0, '#c8b6ff'],
  ] as const;

  return (
    <group>
      {lanterns.map(([x, z]) => <Lantern key={`${x}-${z}`} position={[x, 0.1, z]} />)}
      {stations.map(([label, x, z, color]) => (
        <group key={label} position={[x, 0.13, z]}>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.1, 56]} /><meshStandardMaterial color="#2f2c46" roughness={0.95} /></mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[2.22, 2.32, 64]} /><meshBasicMaterial color={color} transparent opacity={0.32} /></mesh>
          <pointLight position={[0, 1.4, 0]} color={color} intensity={2.2} distance={5.8} />
          <Text position={[0, 0.22, -2.65]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.28} color="#f8f3e8" anchorX="center">{label}</Text>
        </group>
      ))}
      <MoonGate />
      <CrookedTree position={[-7.5, 0, 4.7]} scale={1.35} />
      <CrookedTree position={[7.7, 0, 4.95]} scale={1.25} />
    </group>
  );
}

function Lantern({ position }: { position: [number, number, number] }) {
  return <group position={position}><mesh castShadow position={[0, 0.65, 0]}><cylinderGeometry args={[0.045, 0.06, 1.3, 7]} /><meshStandardMaterial color="#14101a" roughness={0.85} /></mesh><mesh castShadow position={[0, 1.38, 0]}><boxGeometry args={[0.34, 0.38, 0.34]} /><meshStandardMaterial color="#ffd166" emissive="#ff8f3d" emissiveIntensity={1.35} roughness={0.4} /></mesh><pointLight position={[0, 1.36, 0]} color="#ffb05a" intensity={2.4} distance={4.2} /></group>;
}

function CrookedTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale} rotation={[0, 0.35, 0.05]}><mesh castShadow position={[0, 0.95, 0]} rotation={[0, 0, 0.18]}><cylinderGeometry args={[0.11, 0.2, 1.9, 7]} /><meshStandardMaterial color="#17101d" roughness={0.92} /></mesh><mesh castShadow position={[0.42, 1.65, 0]} rotation={[0, 0, 0.95]}><cylinderGeometry args={[0.055, 0.11, 1.2, 7]} /><meshStandardMaterial color="#17101d" roughness={0.92} /></mesh><mesh castShadow position={[-0.34, 1.35, 0]} rotation={[0, 0, -0.82]}><cylinderGeometry args={[0.05, 0.1, 1.0, 7]} /><meshStandardMaterial color="#17101d" roughness={0.92} /></mesh></group>;
}

function MoonGate() {
  return <group position={[0, -0.18, -16.0]} scale={1.25}><mesh castShadow position={[-1.35, 1.2, 0]} rotation={[0, 0, -0.08]}><cylinderGeometry args={[0.12, 0.18, 2.6, 9]} /><meshStandardMaterial color="#211934" emissive="#140b2d" emissiveIntensity={0.25} roughness={0.76} /></mesh><mesh castShadow position={[1.35, 1.2, 0]} rotation={[0, 0, 0.08]}><cylinderGeometry args={[0.12, 0.18, 2.6, 9]} /><meshStandardMaterial color="#211934" emissive="#140b2d" emissiveIntensity={0.25} roughness={0.76} /></mesh><mesh position={[0, 2.42, 0]}><torusGeometry args={[1.38, 0.075, 16, 96]} /><meshStandardMaterial color="#f5e6a6" emissive="#8d7cff" emissiveIntensity={1.4} roughness={0.28} /></mesh><Text position={[0, 3.8, 0]} fontSize={0.26} color="#f5e6a6" anchorX="center">Teatro de Sombras</Text></group>;
}
