import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

type KenneyModelProps = {
  path: string;
  position: readonly [number, number, number];
  rotation?: readonly [number, number, number];
  scale?: number | [number, number, number];
};

export function KenneyModel({ path, position, rotation = [0, 0, 0], scale = 1 }: KenneyModelProps) {
  const { scene } = useGLTF(path);
  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh & { isMesh?: boolean };
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          material.side = THREE.DoubleSide;
        });
      } else if (mesh.material) {
        mesh.material.side = THREE.DoubleSide;
      }
    });

    return clone;
  }, [scene]);

  return <primitive object={model} position={position} rotation={rotation} scale={scale} />;
}

useGLTF.preload('/models/kenney/graveyard/crypt.glb');
useGLTF.preload('/models/kenney/graveyard/crypt-small.glb');
useGLTF.preload('/models/kenney/graveyard/gravestone-cross.glb');
useGLTF.preload('/models/kenney/graveyard/gravestone-broken.glb');
useGLTF.preload('/models/kenney/graveyard/candle.glb');
useGLTF.preload('/models/kenney/space/crater.glb');
useGLTF.preload('/models/kenney/space/meteor.glb');
useGLTF.preload('/models/kenney/space/meteor_detailed.glb');
useGLTF.preload('/models/kenney/space/rocks_smallA.glb');
