# Especificación de Diseño: Ajustes de UI en Asistencia, Evaluaciones y Acciones de Servicio

**Fecha**: 15 de Octubre de 2026  
**Módulos Afectados**: `bumand-frontend` (Next.js) y `bumand-movil` (Flutter)  
**Estado**: Propuesta de Diseño para Aprobación  

---

## 1. Contexto y Problemas a Resolver

A partir de la inspección visual de las capturas compartidas por el usuario y los requerimientos funcionales:
1. **Imagen 1 (Dashboard de Retrasos en Web)**: La tarjeta de "Becarios con Retraso" en el panel administrativo no indica el tipo de asistencia que originó el retraso. El supervisor necesita distinguir de inmediato si la tardanza corresponde a **Prácticas** (en sucursal/agencia) o a **Escuela de Líderes** (o Acciones de Servicio).
2. **Imagen 2 (Título y Breadcrumb en Web)**: La barra de navegación y título superior de la vista de asistencia para supervisores dice *"Auditoría y Control de Asistencia"*. Debe simplificarse a *"Control de Asistencia"* para mayor limpieza y concordancia con la terminología institucional.
3. **Imagen 3 (Evaluaciones en App Móvil)**: En la vista de "Mis Evaluaciones" del becario en Flutter, se muestran los porcentajes de peso ponderado (`Peso 25%`, `Peso 15%`) y el aporte a la nota (`Aporte: +22.5 pts`). El becario no debe ver estas ponderaciones internas para evitar sesgos, quejas sobre pesos relativos o cálculos de notas especulativas.
4. **Módulo de Eventos vs Acciones de Servicio**:
   - En la aplicación móvil (`bumand-movil`), retirar el módulo de "Eventos" de la barra de navegación inferior.
   - En la plataforma web (`bumand-frontend`), renombrar "Eventos" a **"Acciones de Servicio"** en menús, encabezados y breadcrumbs.

---

## 2. Enfoques Analizados

### Requerimiento 1: Tipo de asistencia en retardos
- **Enfoque A**: Añadir un texto simple en la descripción (`Economía · Oficina Central Bloque A · Prácticas`).
  - *Desventaja*: Se confunde visualmente con la sede y carrera.
- **Enfoque B (Recomendado)**: Añadir un `Badge` específico con código de color institucional:
  - `Prácticas`: Color Azul/Celeste (`bg-sky-50 text-sky-700 border-sky-200`).
  - `Escuela de Líderes`: Color Púrpura/Índigo (`bg-purple-50 text-purple-700 border-purple-200`).
  - `Acciones de Servicio`: Color Esmeralda/Verde (`bg-emerald-50 text-emerald-700 border-emerald-200`).
  - *Ventaja*: El supervisor identifica la modalidad al instante sin tener que leer líneas secundarias.

### Requerimiento 2: Renombrado a "Control de Asistencia"
- **Enfoque Único**: Unificar el breadcrumb en `src/app/page.tsx` y las etiquetas de menú en `src/components/navegacion/menu-lateral.tsx` a `"Control de Asistencia"`.

### Requerimiento 3: Ocultar porcentajes en Evaluaciones Móvil
- **Enfoque A**: Ocultar solo el badge `Peso X%`, dejando el puntaje y aporte.
  - *Desventaja*: El usuario solicitó expresamente: *"En la aplicación los porcentajes de evaluación no deben verse"*. Dejar el aporte numérico proporcional delata el porcentaje ponderado.
- **Enfoque B (Recomendado)**: Ocultar tanto el badge de `Peso X%` como la leyenda `Aporte: +XX.X pts`. Mantener únicamente:
  - Nombre del módulo y evaluador.
  - Estado del módulo (`COMPLETADA`, `PENDIENTE`, `EN CURSO`).
  - Calificación cuantitativa directa sobre 100 (`90 / 100`) y barra de progreso.
  - Observaciones cualitativas (retroalimentación pedagógica).

### Requerimiento 4: Eventos en Móvil y Web
- **Móvil**: Limpiar `InicioPantalla` reduciendo de 4 a 3 pestañas principales (`Asistencia`, `Pasajes`, `Notificaciones`).
- **Web**: Renombrar la sección de "Eventos" a `"Acciones de Servicio"` en navegación, tabs y breadcrumb, manteniendo la lógica subyacente intacta.

---

## 3. Plan de Modificación Detallado por Componente

### 3.1. Frontend (`bumand-frontend`)
1. **`src/components/panel-control/panel-control-vista.tsx`**:
   - Actualizar la interfaz `BecarioRetraso`:
     ```ts
     export interface BecarioRetraso {
       id: number;
       nombre: string;
       avatar: string;
       carrera: string;
       fecha: string;
       hora_prevista: string;
       hora_real: string;
       minutos_retraso: number;
       sede: string;
       tipo_asistencia: "Prácticas" | "Escuela de Líderes" | "Acciones de Servicio";
     }
     ```
   - Poblar `tipo_asistencia` en el arreglo institucional `BECARIOS_RETRASO`.
   - Renderizar el `Badge` correspondiente en la tarjeta de cada becario con retraso.
2. **`src/app/page.tsx`**:
   - Modificar caso `"asistencia"`: `titulo: rol === "becario" ? "Marcación de Horas de Práctica" : "Control de Asistencia"`.
   - Modificar caso `"eventos"`: `titulo: "Acciones de Servicio"`.
3. **`src/components/navegacion/menu-lateral.tsx`**:
   - Para rol becario: `"Eventos Convocados"` $\rightarrow$ `"Acciones de Servicio"`.
   - Para rol supervisor/admin: `"Gestión de Eventos"` $\rightarrow$ `"Acciones de Servicio"`.
   - Para rol supervisor/admin: `"Control Asistencia"` $\rightarrow$ `"Control de Asistencia"`.

### 3.2. Móvil (`bumand-movil`)
1. **`lib/modulos/evaluaciones/pantallas/evaluaciones-pantalla.dart`**:
   - Remover el bloque `Container` de `Peso ${mod.peso_porcentaje.toInt()}%`.
   - Remover el texto `Aporte: +${mod.contribucion_ponderada.toStringAsFixed(1)} pts`.
2. **`lib/modulos/inicio/pantallas/inicio-pantalla.dart`**:
   - Quitar `EventosPantalla()` de la lista `_pantallas`.
   - Quitar el `NavigationDestination` de "Eventos" de la barra de navegación inferior.

---

## 4. Verificaciones
- Compilar frontend: `npm run compilar` en `bumand-frontend` (0 errores).
- Análisis estático Dart/Flutter: verificación de sintaxis y referencias no rotas en `bumand-movil`.
