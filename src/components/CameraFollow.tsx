import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useGame } from '../game';

export function CameraFollow() {
  const { camera } = useThree();
  const playerPosition = useGame((state) => state.playerPosition);
  const playerRotation = useGame((state) => state.playerRotation);
  const scene = useGame((state) => state.scene);
  const target = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());
  const backward = useRef(new THREE.Vector3());

  useFrame(() => {
    const cameraDistance = scene === 'cosmos' ? 6.6 : 7.4;
    const cameraHeight = scene === 'cosmos' ? 3.15 : 3.7;
    backward.current.set(-Math.sin(playerRotation), 0, -Math.cos(playerRotation));
    target.current.set(playerPosition.x, playerPosition.y + 1.0, playerPosition.z);
    desired.current.copy(playerPosition).addScaledVector(backward.current, cameraDistance);
    desired.current.y += cameraHeight;
    camera.position.lerp(desired.current, 0.075);
    camera.lookAt(target.current);
  });

  return null;
}
