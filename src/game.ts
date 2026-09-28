import { create } from 'zustand';
import * as THREE from 'three';

export type CrystalId = 'sun' | 'moon' | 'root';
export type SceneId = 'valley' | 'cosmos';

type GameState = {
  activated: Record<CrystalId, boolean>;
  playerPosition: THREE.Vector3;
  playerRotation: number;
  scene: SceneId;
  activateCrystal: (id: CrystalId) => void;
  setPlayerPosition: (position: THREE.Vector3) => void;
  setPlayerRotation: (rotation: number) => void;
  setScene: (scene: SceneId) => void;
};

export const CRYSTALS: Array<{ id: CrystalId; label: string; color: string; position: [number, number, number] }> = [
  { id: 'sun', label: 'Sol marchito', color: '#ffd166', position: [-12.8, 0.7, -8.2] },
  { id: 'moon', label: 'Luna rota', color: '#9bf6ff', position: [13.5, 0.7, -10.6] },
  { id: 'root', label: 'Raiz antigua', color: '#b8f7a1', position: [-2.8, 0.7, 12.4] },
];

export const COSMIC_PORTAL_POSITION = new THREE.Vector3(0, 0.45, -15.55);
export const VALLEY_SPAWN = new THREE.Vector3(0, 0.45, 3.7);
export const COSMIC_SPAWN = new THREE.Vector3(0, 0.45, 7.2);

export const useGame = create<GameState>((set) => ({
  activated: { sun: false, moon: false, root: false },
  playerPosition: VALLEY_SPAWN.clone(),
  playerRotation: 0,
  scene: 'valley',
  activateCrystal: (id) =>
    set((state) => ({
      activated: { ...state.activated, [id]: true },
    })),
  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  setPlayerRotation: (playerRotation) => set({ playerRotation }),
  setScene: (scene) =>
    set({
      scene,
      playerPosition: scene === 'cosmos' ? COSMIC_SPAWN.clone() : VALLEY_SPAWN.clone(),
      playerRotation: scene === 'cosmos' ? Math.PI : 0,
    }),
}));
