import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { useGame } from '../game';

export function CinematicEffects() {
  const scene = useGame((state) => state.scene);
  const isCosmos = scene === 'cosmos';

  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      <Bloom
        intensity={isCosmos ? 1.95 : 0.82}
        luminanceThreshold={isCosmos ? 0.12 : 0.28}
        luminanceSmoothing={isCosmos ? 0.58 : 0.72}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={isCosmos ? 0.018 : 0.026}
        focalLength={isCosmos ? 0.036 : 0.024}
        bokehScale={isCosmos ? 2.25 : 1.15}
        height={480}
      />
      <Noise opacity={isCosmos ? 0.035 : 0.02} />
      <Vignette offset={isCosmos ? 0.18 : 0.26} darkness={isCosmos ? 0.82 : 0.95} eskil={false} />
    </EffectComposer>
  );
}
