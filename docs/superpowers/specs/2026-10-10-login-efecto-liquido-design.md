# Especificación de Diseño: Simulación Líquida Institucional ("Manantial Diaconal") para Inicio de Sesión

**Fecha:** 2026-10-10  
**Proyecto:** BUMAND (Becas Universitarias con Misión y Acción Diaconal) - Fundación Diaconía FRIF-IFD  
**Referencia de Inspiración:** Skipper UI `skiper12` (Vercel Liquid Simulation)  
**Estatus:** Aprobado para Implementación (Enfoque 1)  

---

## 1. Visión y Propósito

El objetivo de esta mejora es incorporar un efecto interactivo de simulación líquida de vanguardia en la pantalla de inicio de sesión (`/inicio-sesion`), inspirado en el componente `skiper12` de Skipper UI, pero contextualizado plenamente a la identidad, colores y misión de **BUMAND** y **Fundación Diaconía FRIF-IFD**.

### Metáfora Conceptual: "Aguas Sagradas / Agua Bendita / Manantial Diaconal"
El fondo del login representa un estanque sagrado de aguas puras y luminosas con fondo semi-blanco y velo celeste etéreo:
- **Base Semi-Blanca Luminosa (`#F8FAFC` - `#F0F8FF`):** Pureza, santidad, claridad y paz institucional.
- **Celeste Celestial / Agua Bendita (`#38BDF8` / `#0284C7`):** Renovación espiritual, mayordomía eclesiástica y vocación de servicio.
- **Destello Solar y Divino (`#F8C766`):** Reflejos dorados en las cáusticas y crestas de las ondas.
- **Cero fondos oscuros:** Toda la escena mantiene una luminosidad mínima de 80%, garantizando un ambiente celestial, acogedor y diáfano.

---

## 2. Arquitectura Técnica y Decisiones de Ingeniería

### 2.1 Cero Dependencias Externas (Pure WebGL / GLSL)
En lugar de añadir Three.js (~600 KB en el bundle de producción), el componente `FondoOndasLiquidas` se implementará utilizando directamente la API nativa de **WebGL** del navegador:
- Renderizado de un cuadrilátero a pantalla completa (*full-screen quad*).
- Fragment Shader GLSL personalizado que calcula la refracción líquida, ondas continuas ambientales (*ambient flow*) y ondas reactivas al cursor del ratón (*pointer ripples*).
- Control de rendimiento: Limitación de `devicePixelRatio` a máximo 2.0, pausa automática en `visibilitychange` o cuando el componente se desmonta, y tasa fluida de 60 FPS garantizada.
- *Fallback* elegante: Degradado CSS ambiental animado si WebGL no está disponible o está deshabilitado en el cliente.

### 2.2 Protección de Legibilidad y Ergonomía Visual (WCAG AA/AAA)
Para evitar que el dinamismo del líquido compita con los campos de correo y contraseña:
- La tarjeta central `TarjetaSpotlight` conservará su reflector y borde luminoso.
- Se aplicará una viñeta elíptica radial y una capa difusa semi-translúcida (`backdrop-blur-md`) directamente detrás de la tarjeta, garantizando contraste absoluto en el texto y controles de inicio de sesión.
- Las ondas del cursor reaccionarán en todo el lienzo, amortiguándose elásticamente al aproximarse al centro.

---

## 3. Especificación de Componentes y Archivos

### 3.1 Nuevo Componente: `FondoOndasLiquidas`
- **Ubicación:** `bumand-frontend/src/components/animaciones/fondo-ondas-liquidas.tsx`
- **Exportación:** Exportado en `src/components/animaciones/index.ts`
- **Parámetros (`PropiedadesFondoOndasLiquidas`):**
  - `color_base?: string` (por defecto `'#063A6B'`)
  - `color_onda?: string` (por defecto `'#17B4C4'`)
  - `color_destello?: string` (por defecto `'#F8C766'`)
  - `intensidad?: number` (por defecto `1.0`)
  - `velocidad?: number` (por defecto `0.6`)
  - `opacidad?: number` (por defecto `0.85`)
  - `className?: string`

### 3.2 Actualización de Pantalla de Inicio de Sesión
- **Ubicación:** `bumand-frontend/src/app/inicio-sesion/page.tsx`
- Integrar `FondoOndasLiquidas` en la capa de fondo fija (`fixed inset-0 pointer-events-auto z-0`).
- Colocar la tarjeta de login dentro de un contenedor en plano superior (`relative z-10`).
- Mantener la funcionalidad RBAC existente (cuentas institucionales semilla, validación JWT, redirección).

---

## 4. Criterios de Aceptación y Verificación

1. **Rendimiento:** 60 FPS constantes en escritorio y móvil, consumo mínimo de CPU/GPU.
2. **Interactividad:** Ondulaciones fluidas y orgánicas que siguen la posición del cursor o gestos táctiles.
3. **Consistencia Visual:** Armonía absoluta con la paleta de colores de BUMAND y Diaconía.
4. **Legibilidad:** Formulario 100% legible, contraste nítido en inputs y accesos rápidos RBAC.
5. **Estándares de Código:**
   - Español absoluto en nombres de variables (`snake_case`), métodos (`camelCase`) y componentes (`PascalCase`).
   - Sin errores TypeScript al ejecutar `npm run compilar` en `bumand-frontend`.
