import type { CSSProperties } from 'react';
import { CRYSTALS, useGame } from '../game';

export function HUD() {
  const activated = useGame((state) => state.activated);
  const scene = useGame((state) => state.scene);
  const activeCount = Object.values(activated).filter(Boolean).length;
  const solved = activeCount === CRYSTALS.length;
  const isCosmos = scene === 'cosmos';

  return (
    <section className="hud">
      <div className="hud__header">
        <span className="sigil">III</span>
        <div>
          <span className="eyebrow">{isCosmos ? 'Observatorio astral' : 'Cuento gotico interactivo'}</span>
          <h1>{isCosmos ? 'El Umbral de Pluton' : 'La Novia del Valle de Sombras'}</h1>
        </div>
      </div>
      <p>{isCosmos ? 'Camina entre galaxias, observa el sistema solar y encuentra a Pluton brillando en el borde oscuro.' : 'Recorre el valle lunar, sigue los faroles y cruza el portal para mirar el cielo desde otro plano.'}</p>
      <div className="quest-panel">
        <div className="quest-panel__top">
          <span>{isCosmos ? 'Mapa astral' : 'Ritual del portal'}</span>
          <strong>{activeCount}/{CRYSTALS.length}</strong>
        </div>
        <div className="crystal-track" aria-label="Cristales activados">
          {CRYSTALS.map((crystal) => (
            <span
              key={crystal.id}
              className="crystal-dot"
              data-active={activated[crystal.id]}
              style={{ '--crystal-color': crystal.color } as CSSProperties}
            />
          ))}
        </div>
        <span className="quest-state">{isCosmos ? 'Pluton esta destacado en azul helado' : solved ? 'El portal esta abierto' : 'Busca el brillo y presiona E'}</span>
      </div>
      <div className="controls-hint">
        <div className="control-group"><kbd>WASD</kbd><span>moverse</span></div>
        <div className="control-group"><kbd>Flechas</kbd><span>moverse</span></div>
        <div className="control-group"><kbd>Space</kbd><span>saltar</span></div>
        <div className="control-group"><kbd>E</kbd><span>interactuar</span></div>
      </div>
    </section>
  );
}
