# Herramientas Del Proyecto

## Performance

`r3f-perf` queda activo solo en desarrollo. Al correr `npm run dev`, veras un panel arriba a la derecha con FPS, draw calls, memoria y tiempo de render.

## Conversion De Modelos

Usa `gltfjsx` para convertir modelos `.glb` o `.gltf` a componentes React Three Fiber.

Ejemplo:

```powershell
npm run gltfjsx -- public/models/halloween-pumpkin-tim-burton-style/source/model.glb --transform --types --shadows --output src/game/assets/Pumpkin.tsx
```

Para FBX, primero conviene convertir a `.glb` desde Blender y despues usar `gltfjsx`.

## Animaciones

Instalado:

- `gsap`: animaciones programaticas simples para portales, camara, UI y props.
- `@theatre/core` y `@theatre/studio`: cinemáticas y motion design mas fino.

## VFX

Instalado:

- `wawa-vfx`: referencia/paquete para efectos magicos, particulas y visuales de energia.

## Arquitectura De Referencia

Instalado:

- `viber3d`: starter kit de referencia para arquitectura de juegos 3D con React Three Fiber.

Repo de referencia: `https://github.com/instructa/viber3d`
