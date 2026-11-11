# Nuevo Backlog Maestro Vigente - BUMAND (Actualizado al 10 de Noviembre de 2026)

Este documento constituye el **Backlog Maestro Único Vigente** del ecosistema **BUMAND** (`bumand-backend`, `bumand-frontend`, `bumand-movil`). El historial de lotes anteriores ya concluidos fue depurado para concentrar la ejecución en los 8 requerimientos prioritarios de corrección, estabilización e integración en tiempo real.

---

## 📋 Resumen de Estado General

| ID | Título | Ámbito | Estado |
| :--- | :--- | :--- | :--- |
| **[BKL-01]** | Historial de Permisos — Eliminación de botón redundante | Móvil (`bumand-movil`) | `[x] Completado` |
| **[BKL-02]** | Evaluación Ministerial F-03 — Corrección de guardado y convalidación | Web y Backend | `[x] Completado` |
| **[BKL-03]** | Seguridad de Cuenta y Autenticación — Cambio de contraseña y Logout | Web, Móvil y Backend | `[x] Completado` |
| **[BKL-04]** | Tarifario Institucional de Pasajes — Persistencia y montos repetidos sin deduplicación | Web, Backend y APK | `[x] Completado` |
| **[BKL-05]** | Evaluación Socioeconómica (Módulo 5) — Acciones de revisión, calificación y aprobación | Web y Backend | `[x] Completado` |
| **[BKL-06]** | Ponderaciones y Criterios de los 5 Módulos — Edición y persistencia de puntajes | Web y Backend | `[x] Completado` |
| **[BKL-07]** | Escuela de Líderes estilo Classroom — Gestión de tareas y entregas Web ↔ APK | Web, Backend y APK | `[x] Completado` |
| **[BKL-08]** | Sincronización Integral APK → Backend → Web en Tiempo Real | Móvil, Backend y Web | `[x] Completado` |

---

## 🎯 Requerimientos Ejecutados

### [BKL-01] [x] Completado - Historial de Permisos (Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Móvil (`bumand-movil`)
- **Archivos modificados**:
  - `bumand-movil/lib/modulos/asistencia/pantallas/historial-asistencia-pantalla.dart`
- **Resultado técnico**:
  - Se eliminó el botón `OutlinedButton.icon` con el texto `"Radicar Nuevo Permiso / Justificación"` y su `SizedBox` espaciador dentro de `_construirPestanaPermisos()`, además de limpiar el import innecesario de `permisos-pantalla.dart`.

---

### [BKL-02] [x] Completado - Evaluación Ministerial F-03 (Web y Backend)
- **Estado**: `[x] Completado`
- **Ámbito**: Web y Backend (`bumand-frontend`, `bumand-backend`)
- **Archivos modificados**:
  - `bumand-frontend/src/components/evaluaciones/evaluaciones-vista.tsx`
  - `bumand-frontend/src/components/evaluaciones/formulario-f03.tsx`
  - `bumand-backend/src/modulos/evaluaciones/dtos/guardar-formulario-f03.dto.ts`
  - `bumand-backend/src/modulos/evaluaciones/evaluaciones.servicio.ts`
- **Resultado técnico**:
  - **Web**: Se eliminó la sobreescritura estática `const indicesRevision = [1, 4, 7, 10]` en `cargarNominaF03`, se envió `becario_ci` hacia `<FormularioF03 />` y en el cuerpo de `POST /evaluaciones/f03/becario/${becario_id}`, se alinearon los estados `"completado"` / `"completada"`, se truncaron los textos a los límites de columnas en PostgreSQL (`pastor_nombre <= 150`, `pastor_correo <= 150`, `pastor_celular <= 30`, `iglesia_nombre <= 150`, `iglesia_direccion <= 255`) y se mostró el mensaje real de error.
  - **Backend**: Se añadieron como `@IsOptional()` en `GuardarFormularioF03Dto` los campos adicionales enviados por APK y Web (`periodo`, `periodo_id`, `frecuencia`, `compromiso`, `cargo_iglesia`, `cumplimiento`, `opinion_general`, `declaracion_ci`, `fecha_recepcion`, `estado`, `respuestas`, etc.). En `registrarFormularioF03` se corrigió la búsqueda por nombre vacío (`if (!n_bd) return false;`), se resolvió el becario por `id`, `usuario_id`, `ci` (`becario_ci`) o `nombre`, se garantizó la existencia de `PeriodoEvaluacion` y `ModuloEvaluacion` antes de insertar en `evaluaciones`, se aplicó truncado seguro de cadenas y se emitió el evento WebSocket `evaluacion_actualizada`.

---

### [BKL-03] [x] Completado - Seguridad de Cuenta y Autenticación (Web, Móvil y Backend)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Móvil y Backend (`bumand-frontend`, `bumand-movil`, `bumand-backend`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/usuarios/dtos/cambiar-contrasena.dto.ts`
  - `bumand-backend/src/modulos/usuarios/usuarios.servicio.ts` y `usuarios.controlador.ts`
  - `bumand-backend/src/modulos/autenticacion/jwt.estrategia.ts`, `autenticacion.controlador.ts` y `autenticacion.servicio.ts`
  - `bumand-frontend/src/components/usuarios/mi-perfil-cuenta.tsx`
  - `bumand-frontend/src/components/navegacion/menu-lateral.tsx`, `autenticacion-contexto.tsx` y `app/page.tsx`
  - `bumand-movil/lib/widgets-comunes/barra-superior-bumand.dart`
- **Resultado técnico**:
  - **Backend**: Se añadieron `@IsOptional() @IsString() confirmar_contrasena?: string;` y `correo?: string;` en `CambiarContrasenaDto` para evitar rechazos HTTP 400 con `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })`. Se incorporó resolución fallback por `correo` en `cambiarMiContrasena`, `cambiarContrasenaPropia` y `jwt.estrategia.ts`, y se añadieron `@Patch('cambiar-contrasena')`, `@Post('cambiar-contrasena')`, `@Post('cerrar-sesion')` y `@Post('logout')` en `autenticacion.controlador.ts` limpiando `fcm_token`.
  - **Web**: En `mi-perfil-cuenta.tsx` se removió `confirmar_contrasena` del payload enviado a `PATCH /usuarios/mi-perfil/contrasena` (con fallback a `/autenticacion/cambiar-contrasena`) y se mostraron mensajes en español desde `error?.mensaje || error?.message`. En `menu-lateral.tsx`, `autenticacion-contexto.tsx` y `app/page.tsx` se eliminó la condición de carrera en `<AlertDialog>`, se limpiaron todas las claves `bumand_*` de `localStorage`, se invocó `POST /autenticacion/cerrar-sesion` de forma no bloqueante y se redirigió a `/inicio-sesion` evitando pantallas en blanco.
  - **Móvil**: En `barra-superior-bumand.dart` se capturó `Navigator.of(context, rootNavigator: true)` antes de cerrar el BottomSheet, se ejecutó `await notificador.cerrarSesion()` dentro de `try/finally` y se redirigió de inmediato con `pushAndRemoveUntil` hacia `InicioSesionPantalla`.

---

### [BKL-04] [x] Completado - Tarifario Institucional de Pasajes (Web, Backend y APK)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y APK (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/pasajes/pasajes.servicio.ts`
  - `bumand-frontend/src/components/pasajes/gestion-tarifas.tsx` y `pasajes-vista.tsx`
  - `bumand-movil/lib/modulos/pasajes/repositorios/pasajes-repositorio.dart`
  - `bumand-movil/lib/modulos/pasajes/pantallas/declarar-recorrido-pantalla.dart`
- **Resultado técnico**:
  - **Backend**: Se normalizó `costo_bs: Number(t.costo_bs)` en `obtenerTarifas()`, `obtenerTarifasOficiales()` y `listarTodasLasTarifas()`. En `crearTarifa()` solo se cierra una tarifa previa cuando coinciden tanto `medio_transporte` como `descripcion`, permitiendo múltiples tarifas activas con idéntico monto.
  - **Web**: En `gestion-tarifas.tsx` se persistieron tarifas vía `POST /pasajes/tarifas` y `PATCH /pasajes/tarifas/:id`, suscribiéndose al evento WebSocket `pasajes_actualizados` para reflejar en vivo tarifas con montos repetidos (ej. `Bs 3.00`).
  - **Móvil**: En `pasajes-repositorio.dart` (`obtenerTarifas`) se corrigió el parseo de `costo_bs` recibido como `String` (`"3.00"`) mediante `double.tryParse` y desambiguación de nombres repetidos. En `declarar-recorrido-pantalla.dart` (`_cargarTarifas`) se reemplazó la lista con todas las tarifas activas del backend sin deduplicar por monto en `TARIFA DE LA IDA` y `TARIFA DE LA VUELTA`, manteniendo `"Otro (escribir monto)..."` al final y sincronizando `nombre`/`monto` para evitar aserciones en `DropdownButton<String>`.

---

### [BKL-05] [x] Completado - Evaluación Socioeconómica — Módulo 5 (Web y Backend)
- **Estado**: `[x] Completado`
- **Ámbito**: Web y Backend (`bumand-frontend`, `bumand-backend`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/evaluaciones/evaluaciones.controlador.ts`, `evaluaciones.servicio.ts` y `dtos/receptor-socioeconomica.dto.ts`
  - `bumand-frontend/src/components/evaluaciones/evaluacion-socioeconomica-vista.tsx`
- **Resultado técnico**:
  - **Backend**: En `procesarReceptorSocioeconomica` se resolvió el becario por `id` y `usuario_id`, se soportaron claves `"1": "A"` y `"pregunta_1": "A"`, se calculó puntaje real sobre 20 y 100 pts con semáforo y evento WebSocket `evaluacion_actualizada`. Se añadieron los endpoints `GET /evaluaciones/socioeconomica/nomina`, `PATCH|POST /evaluaciones/socioeconomica/:becario_id/revisar` y `PATCH|POST /evaluaciones/socioeconomica/:becario_id/aprobar`.
  - **Web**: En `evaluacion-socioeconomica-vista.tsx` se corrigió el desfase de columnas en `<tbody>` renderizando la 7ma columna (`Semáforo` y estado de revisión) y la 8va columna (`Acciones` con los botones `Revisar` —modal con inspección de las 26 respuestas, ajuste de puntaje sobre 20 pts, semáforo y observaciones— y `Aprobar`), conectado a la API y al WebSocket `evaluacion_actualizada`.

---

### [BKL-06] [x] Completado - Ponderaciones y Criterios de los 5 Módulos (Web y Backend)
- **Estado**: `[x] Completado`
- **Ámbito**: Web y Backend (`bumand-frontend`, `bumand-backend`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/evaluaciones/evaluaciones.controlador.ts` y `evaluaciones.servicio.ts`
  - `bumand-frontend/src/components/evaluaciones/criterios-evaluacion-tabla.tsx` y `evaluaciones-vista.tsx`
- **Resultado técnico**:
  - **Backend**: Se corrigió el cruce entre `peso_practicas` y `peso_mentor` en `evaluaciones.servicio.ts`. Se implementaron `GET /evaluaciones/estructura-calificacion` y `PUT|POST /evaluaciones/estructura-calificacion` persistidos en `configuraciones_institucionales` (`ESTRUCTURA_CALIFICACION_SEMESTRAL`), validando suma = 100 pts y sincronizando los pesos del `PeriodoEvaluacion` activo.
  - **Web**: En `criterios-evaluacion-tabla.tsx` y `evaluaciones-vista.tsx` se habilitó el modo de edición administrativa (`"Editar Puntos y Escalas de Módulos"` / `"Guardar Estructura de Puntos"`) para editar los puntajes de los 5 módulos semestrales (validando suma = `100 pts`) y sus escalas internas (`20 pts`, `15 pts`, `10 pts`, `0 pts`), persistiendo vía `PUT /evaluaciones/estructura-calificacion` y `PUT /evaluaciones/periodos/2`.

---

### [BKL-07] [x] Completado - Escuela de Líderes estilo Classroom (Web, Backend y APK)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y APK (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/evaluaciones/evaluaciones.controlador.ts`, `evaluaciones.servicio.ts` y `dtos/escuela-lideres.dto.ts`
  - `bumand-frontend/src/components/evaluaciones/escuela-lideres-classroom.tsx`
  - `bumand-movil/lib/modulos/evaluaciones/repositorios/evaluaciones-repositorio.dart`, `modelos/evaluacion-modelo.dart` y `detalle_evaluacion_modal.dart`
- **Resultado técnico**:
  - **Backend**: Se creó el catálogo global dinámico persistido en `configuraciones_institucionales` (`CATALOGO_TAREAS_ESCUELA_LIDERES`, inicializado con las 12 tareas canónicas) y los endpoints `GET|POST /evaluaciones/escuela-lideres/catalogo-tareas` y `PUT|POST /evaluaciones/escuela-lideres/catalogo-tareas/:numero`, sincronizando filas en `entregas_tareas_lideres` para todos los becarios y emitiendo `evaluacion_actualizada` por WebSocket. Se alinearon `EntregarTareaLideresDto`, `RevisarEntregaLideresDto` y alias de rutas (`subir-evidencia`, `entregar`, `revisar`).
  - **Web**: En `escuela-lideres-classroom.tsx` se incorporó la barra docente estilo Classroom con `"+ Crear Nueva Tarea (Todos los Becarios)"` (modal de creación/edición global) y el botón `"Enviar Tarea a APK"` / `"Publicar y Enviar Tareas a APK"`, consumiendo los endpoints de catálogo y entregas.
  - **Móvil**: En `evaluaciones-repositorio.dart`, `evaluacion-modelo.dart` y `detalle_evaluacion_modal.dart` se adaptó `obtenerTareasEscuelaLideres` para leer respuestas `Map` y `List` de `GET /api/evaluaciones/escuela-lideres/tareas` con el `becario_id` real, se alinearon `POST /api/evaluaciones/escuela-lideres/tareas/subir-evidencia` y `POST /api/evaluaciones/escuela-lideres/tareas/entregar`, y se eliminaron falsos positivos ante errores HTTP 4xx/5xx.

---

### [BKL-08] [x] Completado - Sincronización Integral APK → Backend → Web (Recepción en Tiempo Real)
- **Estado**: `[x] Completado`
- **Ámbito**: Móvil, Backend y Web (`bumand-movil`, `bumand-backend`, `bumand-frontend`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/pasajes/pasajes.servicio.ts`, `dtos/agregar-recorrido.dto.ts` y `entidades/recorrido.entidad.ts`
  - `bumand-backend/src/modulos/justificaciones/justificaciones.servicio.ts` y `src/modulos/asistencia/asistencia.servicio.ts`
  - `bumand-frontend/src/components/pasajes/pasajes-vista.tsx` y `aprobacion-pasajes.tsx`
  - `bumand-frontend/src/components/justificaciones/bandeja-justificaciones.tsx` y `auditoria-asistencia.tsx`
  - `bumand-frontend/src/components/evaluaciones/bandeja-convalidacion-administracion.tsx`, `sabana-consolidado-semestral.tsx` y `evaluaciones-vista.tsx`
  - `bumand-movil/lib/modulos/justificaciones/servicios/justificaciones-servicio.dart`
  - `bumand-movil/lib/modulos/asistencia/proveedores/asistencia-proveedor.dart`, `repositorios/asistencia-repositorio.dart` y `pantallas/asistencia-pantalla.dart`
  - `bumand-movil/lib/modulos/pasajes/repositorios/pasajes-repositorio.dart` y `pantallas/declarar-recorrido-pantalla.dart`
  - `bumand-movil/lib/modulos/evaluaciones/` (`formulario_f03_dialogo.dart`, `evaluacion-socioeconomica-pantalla.dart`, `detalle_evaluacion_modal.dart`, `evaluaciones-repositorio.dart`)
- **Resultado técnico**:
  - **Backend**: En `pasajes.servicio.ts`, `justificaciones.servicio.ts` y `asistencia.servicio.ts` se priorizó la búsqueda del becario por `{ usuario_id }` antes que `{ id }`, se habilitó la auto-creación de perfil `Becario` si no existe, se incluyeron las relaciones `['becario', 'becario.usuario', 'becario.lugar_practica']` en las consultas administrativas y se amplió a `text` / `@MaxLength(2000)` los campos `apoyo_realizado` y `calles_declaradas` en recorridos.
  - **Web**: Se conectaron `pasajes-vista.tsx`, `aprobacion-pasajes.tsx` (mostrando formularios `borrador` recibidos desde la APK con el badge `"En Curso (APK)"`), `bandeja-justificaciones.tsx`, `auditoria-asistencia.tsx`, `bandeja-convalidacion-administracion.tsx` y `sabana-consolidado-semestral.tsx` a la API y eventos WebSocket en vivo (`pasajes_actualizados`, `justificacion_actualizada`, `asistencia_actualizada`, `evaluacion_actualizada`).
  - **Móvil**: En permisos/justificaciones, `cola_offline` solo se activa por fallo real de red (no ante HTTP 4xx/5xx); en asistencia se envía `lugar_practica_id` evitando `409 Conflict`; en pasajes se envían recorridos de ida y vuelta a `POST /api/pasajes/recorridos` truncando `apoyo_realizado` a 250 caracteres sin ocultar errores HTTP; en evaluaciones F-03 y socioeconómica se empaquetaron campos en `campos_formulario`, se usó el ID real del usuario autenticado y se propagaron errores HTTP reales.

---

## ✅ Verificaciones Reportadas por los Equipos de Implementación
- **Backend (`bumand-backend`)**: `npm run build` ejecutado con `0` errores (`webpack 5.106.2 compiled successfully`).
- **Frontend Web (`bumand-frontend`)**: `npx tsc --noEmit` ejecutado con `0` errores (código de salida `0`).
- **App Móvil (`bumand-movil`)**: `flutter analyze` ejecutado con resultado `No issues found!` (código de salida `0`).
