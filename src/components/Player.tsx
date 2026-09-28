import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { COSMIC_PORTAL_POSITION, COSMIC_SPAWN, CRYSTALS, VALLEY_SPAWN, useGame } from '../game';

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<THREE.Group>(null);
  const setPlayerPosition = useGame((state) => state.setPlayerPosition);
  const setPlayerRotation = useGame((state) => state.setPlayerRotation);
  const activateCrystal = useGame((state) => state.activateCrystal);
  const activated = useGame((state) => state.activated);
  const scene = useGame((state) => state.scene);
  const setScene = useGame((state) => state.setScene);
  const [, getKeys] = useKeyboardControls();
  const interactLatch = useRef(false);
  const jumpLatch = useRef(false);

  useEffect(() => {
    const spawn = scene === 'cosmos' ? COSMIC_SPAWN : VALLEY_SPAWN;
    body.current?.setTranslation(spawn, true);
    body.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
    if (visual.current) visual.current.rotation.y = scene === 'cosmos' ? Math.PI : 0;
    setPlayerPosition(spawn.clone());
    setPlayerRotation(scene === 'cosmos' ? Math.PI : 0);
  }, [scene, setPlayerPosition, setPlayerRotation]);

  useFrame(() => {
    if (!body.current || !visual.current) return;

    const keys = getKeys() as Record<string, boolean>;
    const translation = body.current.translation();
    const velocity = body.current.linvel();
    const spawn = scene === 'cosmos' ? COSMIC_SPAWN : VALLEY_SPAWN;

    if (translation.y < -4) {
      body.current.setTranslation(spawn, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      setPlayerPosition(spawn.clone());
      return;
    }
    const direction = new THREE.Vector3(
      Number(keys.right) - Number(keys.left),
      0,
      Number(keys.backward) - Number(keys.forward),
    );

    if (direction.lengthSq() > 0) {
      direction.normalize();
      visual.current.rotation.y = Math.atan2(direction.x, direction.z);
      setPlayerRotation(visual.current.rotation.y);
    }

    const speed = 3.25;
    body.current.setLinvel({ x: direction.x * speed, y: velocity.y, z: direction.z * speed }, true);

    const grounded = translation.y <= 0.52 && Math.abs(velocity.y) < 0.2;
    if (keys.jump && !jumpLatch.current && grounded) {
      body.current.setLinvel({ x: direction.x * speed, y: 4.8, z: direction.z * speed }, true);
    }

    const playerPosition = new THREE.Vector3(translation.x, translation.y, translation.z);
    setPlayerPosition(playerPosition);

    if (keys.interact && !interactLatch.current) {
      if (scene === 'valley') {
        const nearby = CRYSTALS.find((crystal) => playerPosition.distanceTo(new THREE.Vector3(...crystal.position)) < 1.05);
        if (nearby && !activated[nearby.id]) activateCrystal(nearby.id);
        if (playerPosition.distanceTo(COSMIC_PORTAL_POSITION) < 1.75) setScene('cosmos');
      } else if (playerPosition.distanceTo(new THREE.Vector3(0, 0.45, 9.4)) < 1.55) {
        setScene('valley');
      }
    }

    interactLatch.current = Boolean(keys.interact);
    jumpLatch.current = Boolean(keys.jump);
  });

  return (
    <RigidBody ref={body} type="dynamic" colliders={false} enabledRotations={[false, false, false]} linearDamping={8} angularDamping={10} ccd canSleep={false} position={VALLEY_SPAWN}>
      <CapsuleCollider args={[0.55, 0.28]} position={[0, 0.62, 0]} friction={1.2} restitution={0} />
      <group ref={visual}>
        <pointLight position={[0, 1.05, 0]} color="#9bf6ff" intensity={1.9} distance={2.1} />
        <mesh position={[0, -0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.35, 0.58, 42]} /><meshBasicMaterial color="#9bf6ff" transparent opacity={0.22} /></mesh>
        <mesh castShadow position={[0, 0.28, 0]}><coneGeometry args={[0.5, 0.96, 18]} /><meshStandardMaterial color="#d9f7ff" emissive="#284764" emissiveIntensity={0.22} roughness={0.72} /></mesh>
        <mesh castShadow position={[0, 0.78, 0]}><capsuleGeometry args={[0.19, 0.35, 8, 16]} /><meshStandardMaterial color="#d2eff8" roughness={0.62} /></mesh>
        <mesh castShadow position={[0, 1.1, 0]}><sphereGeometry args={[0.22, 24, 24]} /><meshStandardMaterial color="#b7d6e9" emissive="#203a58" emissiveIntensity={0.15} roughness={0.55} /></mesh>
        <mesh castShadow position={[0, 1.18, -0.03]} rotation={[0.15, 0, 0]}><sphereGeometry args={[0.245, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.62]} /><meshStandardMaterial color="#10101a" roughness={0.8} /></mesh>
        <mesh position={[0, 1.03, -0.14]} rotation={[0.18, 0, 0]}><planeGeometry args={[0.82, 1.45]} /><meshStandardMaterial color="#dff8ff" transparent opacity={0.34} side={THREE.DoubleSide} emissive="#5cc8ff" emissiveIntensity={0.12} /></mesh>
        <mesh castShadow position={[-0.27, 0.78, 0.04]} rotation={[0.15, 0, 0.82]}><capsuleGeometry args={[0.055, 0.42, 6, 10]} /><meshStandardMaterial color="#b7d6e9" roughness={0.62} /></mesh>
        <mesh castShadow position={[0.27, 0.78, 0.04]} rotation={[0.15, 0, -0.82]}><capsuleGeometry args={[0.055, 0.42, 6, 10]} /><meshStandardMaterial color="#b7d6e9" roughness={0.62} /></mesh>
        <mesh castShadow position={[0.34, 0.55, 0.18]} rotation={[0.85, 0.25, -0.35]}><coneGeometry args={[0.12, 0.34, 10]} /><meshStandardMaterial color="#7bbf84" roughness={0.7} /></mesh>
        <mesh castShadow position={[0.39, 0.72, 0.26]}><sphereGeometry args={[0.12, 16, 16]} /><meshStandardMaterial color="#7b1028" emissive="#4b0618" emissiveIntensity={0.35} roughness={0.55} /></mesh>
        <mesh position={[-0.075, 1.12, 0.205]}><sphereGeometry args={[0.026, 8, 8]} /><meshBasicMaterial color="#06111a" /></mesh>
        <mesh position={[0.075, 1.12, 0.205]}><sphereGeometry args={[0.026, 8, 8]} /><meshBasicMaterial color="#06111a" /></mesh>
        <mesh position={[0, 1.02, 0.22]} rotation={[0, 0, 0.12]}><boxGeometry args={[0.14, 0.012, 0.012]} /><meshBasicMaterial color="#244054" /></mesh>
        <mesh position={[0, 0.04, 0.02]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.62, 42]} /><meshBasicMaterial color="#dff8ff" transparent opacity={0.16} side={THREE.DoubleSide} /></mesh>
      </group>
    </RigidBody>
  );
}
