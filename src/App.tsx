import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { CameraFollow } from './components/CameraFollow';
import { CinematicEffects } from './components/CinematicEffects';
import { HUD } from './components/HUD';
import { PlayerControls } from './hooks/usePlayerControls';
import { CosmicScene } from './scenes/CosmicScene';
import { ValleyScene } from './scenes/ValleyScene';
import { useGame } from './game';

function App() {
  const showPerf = import.meta.env.DEV && !new URLSearchParams(window.location.search).has('clean');

  return (
    <main className="shell">
      <HUD />
      <Canvas shadows camera={{ position: [0, 6.5, 8.5], fov: 46 }} dpr={[1, 1.8]}>
        {showPerf && <Perf position="top-right" />}
        <color attach="background" args={['#0b1025']} />
        <fog attach="fog" args={['#0b1025', 13, 42]} />
        <Suspense fallback={null}>
          <PlayerControls>
            <CameraFollow />
            <Physics gravity={[0, -11.8, 0]} timeStep={1 / 60} colliders={false}>
              <SceneRouter />
            </Physics>
          </PlayerControls>
        </Suspense>
        <CinematicEffects />
      </Canvas>
    </main>
  );
}

function SceneRouter() {
  const scene = useGame((state) => state.scene);
  return scene === 'cosmos' ? <CosmicScene /> : <ValleyScene />;
}

export { App };
