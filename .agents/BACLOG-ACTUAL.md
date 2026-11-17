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
| **[BKL-09]** | Compatibilidad TypeORM v1 — Migración de `relations` a sintaxis de objeto en Justificaciones | Backend (`bumand-backend`) | `[x] Completado` |
| **[BKL-10]** | Paridad Integral Web y Móvil de Auditoría de Asistencias — Registro institucional y acciones | Web, Backend y Móvil | `[x] Completado` |
| **[BKL-11]** | Estado condicional de botones en Evaluación Ministerial F-03 | Web (`bumand-frontend`) | `[x] Completado` |
| **[BKL-12]** | Compensar el `%` de asistencia del becario en Dashboard y Extractos al aprobar permiso | Web, Backend y Móvil | `[x] Completado` |
| **[BKL-13]** | Renombrado transversal de "Supervisor" a "Mentor" en interfaces y reportes | Web, Móvil y Backend | `[x] Completado` |
| **[BKL-14]** | Notificaciones persistentes y en tiempo real de aprobación/rechazo en Tareas y Permisos | Web, Backend y Móvil | `[x] Completado` |
| **[BKL-15]** | Adjuntar lecturas (PDF y enlaces/links) en tareas de Escuela de Líderes y vista APK | Web, Backend y Móvil | `[x] Completado` |
| **[BKL-16]** | Exportación opcional a Excel junto a reportes PDF | Web (`bumand-frontend`) | `[x] Completado` |
| **[BKL-17]** | Formulario para Contabilidad y SRD con cálculo de pago líquido de pasajes | Web, Backend y Móvil | `[x] Completado` |
| **[BKL-18]** | Indicador de horas faltantes en color ROJO y tamaño grande en Historial de Asistencia | Móvil (`bumand-movil`) | `[x] Completado` |
| **[BKL-19]** | Corrección de geocerca interior y habilitación de botones "Marcar ingreso" y "Marcar salida" | Móvil (`bumand-movil`) | `[x] Completado` |

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
  - **Verificación E2E Playwright**: Erradicación al 100% del error `Not Found` (HTTP 404); el guardado y convalidación ministerial responde HTTP 201/200 con éxito en `http://localhost:3000`.

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

### [BKL-09] [x] Completado - Compatibilidad TypeORM v1 en Justificaciones (Backend)
- **Estado**: `[x] Completado`
- **Ámbito**: Backend (`bumand-backend`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/justificaciones/justificaciones.servicio.ts`
- **Resultado técnico**:
  - Se erradicó el error `TypeORMError: String-array "relations" syntax was removed. Use object syntax instead, e.g. relations: { profile: true, posts: true }` en `GET /api/justificaciones/mis-justificaciones`.
  - Se migraron todas las llamadas `relations: [...]` de arrays de strings a la sintaxis canónica de objetos de TypeORM v1 (`relations: { becario: { usuario: true, lugar_practica: true } }`).
  - Verificado en vivo mediante suite Playwright respondiendo HTTP 200 OK con 0 excepciones en consola.

---

### [BKL-10] [x] Completado - Paridad Integral Web y Móvil de Auditoría de Asistencias
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y Móvil (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/asistencia/asistencia.controlador.ts`, `asistencia.servicio.ts`, `dtos/revisar-asistencia.dto.ts`
  - `bumand-frontend/src/components/asistencia/auditoria-asistencia.tsx`, `dialogo-justificar-falta.tsx`, `next.config.ts`, `cliente-api.ts`
  - `bumand-movil/lib/modulos/asistencia/` (`modelos/registro-auditoria-asistencia-modelo.dart`, `widgets/auditoria-asistencia-vista.dart`, `widgets/detalle_asistencia_modal.dart`, `pantallas/historial-asistencia-pantalla.dart`, `proveedores/asistencia-proveedor.dart`, `repositorios/asistencia-repositorio.dart`)
  - `bumand-movil/lib/modulos/justificaciones/` (`pantallas/solicitar-justificacion-dialogo.dart`, `servicios/justificaciones-servicio.dart`)
- **Resultado técnico**:
  - **Backend**: Endpoint `PATCH /api/asistencia/:id/aprobar-administracion` implementado con convalidación, exención de multa y registro de observaciones del administrador. Manejo resiliente de registros semilla institucionales.
  - **Web**: Vista de Auditoría con tarjeta de `Jhoselin Pamela Mamani Choque` visible y verificada (`Escuela de Líderes`, `14:50 -> 17:30`, `2.67 hrs computadas`, `Distancia: 18m`, badge `Tardanza`, badge `Multa Escuela de Líderes: Bs 20.00 (20m)`, `✓ Verificado presencial`). Acciones operativas `👁 Ver detalle` georreferenciado, `Aprobar por Administración` (HTTP 200 y exención de multa) y `Justificar` contextual integradas y comprobadas al 100% con Playwright.
  - **Móvil**: Vista `AuditoriaAsistenciaVista` y modelo `RegistroAuditoriaAsistencia` con paridad total de datos institucionales, badges de anomalías y multas, modal de detalle satelital `DetalleAsistenciaModal`, diálogo de justificación con prellenado de becario e incidencia, y botón `Aprobar por Administración`. `flutter analyze` validado con 0 errores.

---

### [BKL-11] [x] Completado - Estado condicional de botones en Evaluación Ministerial F-03 (Web)
- **Estado**: `[x] Completado`
- **Ámbito**: Web (`bumand-frontend`)
- **Archivos modificados**:
  - `bumand-frontend/src/components/evaluaciones/evaluaciones-vista.tsx`
- **Resultado técnico**:
  - **UX Condicional Paritaria**: Se homologó la celda de acciones de la tabla de Evaluación Pastoral F-03 con el diseño canónico de `evaluacion-socioeconomica-vista.tsx`. Encabezado alineado a la derecha (`text-right`) y celda con flexbox (`flex items-center justify-end gap-1.5 flex-wrap`).
  - **Botón 'Revisar'**: Botón independiente `variant="outline"` (`border-[#00ABBD] text-[#035683] hover:bg-[#00ABBD]/10 rounded-xl text-xs font-bold`) con icono `<Eye className="w-3.5 h-3.5 text-[#00ABBD]" />` que abre directamente el modal `FormularioF03` para inspección y edición detallada.
  - **Estado Condicional 'Aprobado' vs 'Aprobar'**:
    - Si `esEvaluado`: Renderiza un `<Badge variant="outline">` interactivo (`border-emerald-400 bg-emerald-50 text-emerald-800 font-bold text-[11px] rounded-full inline-flex items-center gap-1 cursor-pointer hover:bg-emerald-100`) con `<ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />` y etiqueta `Aprobado` que permite re-evaluar al hacer clic.
    - Si `!esEvaluado`: Renderiza un `<Button size="sm">` directo (`bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs cursor-pointer`) con `<ShieldCheck className="w-3.5 h-3.5 text-white" />` (o `<Loader2 className="w-3.5 h-3.5 animate-spin text-white" />` durante la petición) y etiqueta `Aprobar`.
  - **Función `aprobarDirectamenteF03`**: Realiza la aprobación inmediata despachando `POST /evaluaciones/f03/becario/${becario_id}` con rúbrica por defecto calculada mediante `generarCamposFormularioF03Individual` y puntaje (19.0 pts por defecto si no posee previo), actualiza el estado local de `nomina_f03` a `completada` y emite notificación de éxito con Sonner Toast.
  - **Compilación Certificada**: `npm run build` en `bumand-frontend` superado con `0` errores de TypeScript y Next.js 16 (Turbopack).

---

## ✅ Verificaciones Reportadas por los Equipos de Implementación
- **Backend (`bumand-backend`)**: `npm run build` ejecutado con `0` errores (`webpack 5.106.2 compiled successfully`).
- **Frontend Web (`bumand-frontend`)**: `npm run build` ejecutado con `0` errores (código de salida `0`, Next.js Turbopack).
- **App Móvil (`bumand-movil`)**: `flutter analyze` ejecutado con resultado `No issues found!` (código de salida `0`).

---

## 🚀 Requerimientos Ejecutados (Lote BKL-12 a BKL-19)

### [BKL-12] [x] Completado - Compensación de `%` de asistencia al aprobar permiso (Web, Backend y Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y Móvil (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/justificaciones/justificaciones.servicio.ts`, `src/modulos/dashboard/dashboard.modulo.ts`, `dashboard.servicio.ts`, `src/modulos/asistencia/asistencia.servicio.ts`
  - `bumand-frontend/src/servicios/asistencia.servicio.ts`, `src/components/panel-control/panel-control-vista.tsx`, `src/components/asistencia/historial-asistencia-becario.tsx`, `src/components/justificaciones/bandeja-justificaciones.tsx`
  - `bumand-movil/lib/modulos/asistencia/repositorios/asistencia-repositorio.dart`, `lib/modulos/inicio/pantallas/inicio-pantalla.dart`
- **Resultado técnico**:
  - **Backend**: `compensarAsistenciaPorPermiso` invocado en `crear`, `resolver` y `aprobarAdministracion` convalidando `RegistroAsistencia` (`dentro_de_horario = true`, `minutos_retraso = 0`, `validado = true`, `horas_computadas = 4.0`). `DashboardServicio` y `AsistenciaServicio` cruzan permisos aprobados para mantener `tasa_puntualidad` al 100% y exponer `dias_permiso_aprobado` y `horas_compensadas_permiso`.
  - **Web y Móvil**: `obtenerExtractoMensualAsistencia` y `ExtractoMensualAsistencia.desdeMapa` compensan al 100% los días con permiso aprobado, mostrando el indicador en Dashboard, Historial y tarjeta `"Mi Asistencia y Puntualidad"`.

### [BKL-13] [x] Completado - Renombrado transversal de "Supervisor" a "Mentor" (Web, Móvil y Backend)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Móvil y Backend (`bumand-frontend`, `bumand-movil`, `bumand-backend`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/pdf/pdf.servicio.ts`, `evaluaciones/evaluaciones.servicio.ts`, `evaluaciones/dtos/escuela-lideres.dto.ts`, `justificaciones/justificaciones.servicio.ts`
  - `bumand-frontend/src/` (componentes de `evaluaciones/`, `asistencia/`, `pasajes/`, `justificaciones/`, `panel-control/`, `usuarios/`, `navegacion/`, `lib/generador-pdf-cliente.ts`, `lib/errores.ts`, `inicio-sesion/page.tsx`)
  - `bumand-movil/lib/` (16 archivos UI de `inicio`, `asistencia`, `evaluaciones`, `pasajes`, `permisos`, `refrigerios`, `devocionales`, `eventos`, `seguimiento`, `codigos-error.dart`)
- **Resultado técnico**:
  - Reemplazados todos los textos visibles `"Supervisor"` / `"Supervisores"` por `"Mentor"` / `"Mentores"` en interfaces y reportes, manteniendo intactos los enums y claves internas (`'supervisor'`, `revisado_supervisor`, `observacion_supervisor`).

### [BKL-14] [x] Completado - Notificaciones persistentes y en tiempo real (Web, Backend y Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y Móvil (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/notificaciones/dtos/crear-notificacion.dto.ts`, `notificaciones.servicio.ts`, `justificaciones/justificaciones.modulo.ts`, `justificaciones.servicio.ts`, `evaluaciones/evaluaciones.servicio.ts`
  - `bumand-frontend/src/components/evaluaciones/escuela-lideres-classroom.tsx`
  - `bumand-movil/lib/widgets-comunes/barra-superior-bumand.dart`, `lib/modulos/notificaciones/modelos/notificacion-modelo.dart`, `notificaciones-pantalla.dart`, `lib/modulos/evaluaciones/widgets/detalle_evaluacion_modal.dart`
- **Resultado técnico**:
  - Persistencia en BD y emisión WebSocket (`justificacion_actualizada` y `evaluacion_actualizada`) al aprobar o rechazar/observar permisos y tareas de Escuela de Líderes. En Web se añadió `"Rechazar / Observar Tarea"` y en Móvil badge rojo en barra superior, chips `"Aprobado"` / `"Rechazado / Observado"` y banner de reentrega.

### [BKL-15] [x] Completado - Adjuntar lecturas (PDF y enlaces) en Escuela de Líderes (Web, Backend y Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y Móvil (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/evaluaciones/dtos/escuela-lideres.dto.ts`, `evaluaciones.servicio.ts`, `evaluaciones.controlador.ts`
  - `bumand-frontend/src/components/evaluaciones/escuela-lideres-classroom.tsx`
  - `bumand-movil/lib/modulos/evaluaciones/modelos/evaluacion-modelo.dart`, `lib/modulos/evaluaciones/widgets/detalle_evaluacion_modal.dart`
- **Resultado técnico**:
  - Endpoint `POST /evaluaciones/escuela-lideres/catalogo-tareas/subir-lectura` y persistencia de `lecturas_pdf` y `enlaces_lectura`. En Web se integró la sección `"Material de Lectura y Enlaces para la APK"` y en Móvil `"📚 Material de Lectura y Enlaces"` con visor/verificador HTTP y copia al portapapeles.

### [BKL-16] [x] Completado - Exportación opcional a Excel junto a reportes PDF (Web)
- **Estado**: `[x] Completado`
- **Ámbito**: Web (`bumand-frontend`)
- **Archivos modificados**:
  - `bumand-frontend/src/lib/generador-excel-cliente.ts` (nuevo)
  - `bumand-frontend/src/components/pasajes/aprobacion-pasajes.tsx`, `pasajes-vista.tsx`, `evaluaciones/sabana-consolidado-semestral.tsx`, `asistencia/auditoria-asistencia.tsx`, `historial-asistencia-becario.tsx`, `reportes/visor-reportes-pdf.tsx`
- **Resultado técnico**:
  - Generador `.xls` UTF-8 con BOM (`descargarExcelInstitucional`, `exportarFormularioContabilidadSrdExcel`, `exportarSabanaEvaluacionesExcel`, `exportarAuditoriaAsistenciaExcel`) y botones `"Exportar Excel"` junto a los botones PDF.

### [BKL-17] [x] Completado - Formulario para Contabilidad y SRD con pago líquido de pasajes (Web, Backend y Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Web, Backend y Móvil (`bumand-frontend`, `bumand-backend`, `bumand-movil`)
- **Archivos modificados**:
  - `bumand-backend/src/modulos/pasajes/pasajes.modulo.ts`, `pasajes.servicio.ts`, `src/modulos/pdf/pdf.modulo.ts`, `pdf.servicio.ts`
  - `bumand-frontend/src/servicios/pasajes.servicio.ts`, `src/components/pasajes/aprobacion-pasajes.tsx`, `pasajes-vista.tsx`, `src/lib/generador-pdf-cliente.ts`, `src/components/reportes/visor-reportes-pdf.tsx`
  - `bumand-movil/lib/modulos/pasajes/modelos/solicitud-pasaje-modelo.dart`, `pantallas/pasajes-pantalla.dart`, `detalle-historial-pasaje-pantalla.dart`, `lib/modulos/asistencia/pantallas/historial-asistencia-pantalla.dart`
- **Resultado técnico**:
  - Enriquecimiento de solicitudes con `multas_asistencia_bs` y `monto_liquido_pagable`, reportes PDF/Excel titulados `"FORMULARIO PARA CONTABILIDAD Y SRD"` y desglose en Web y Móvil de `Reembolso 80%`, `(-) Descuento por Multas` y `Líquido Pagable (Neto)`.

### [BKL-18] [x] Completado - Indicador de horas faltantes en ROJO y tamaño grande (Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Móvil (`bumand-movil`)
- **Archivos modificados**:
  - `bumand-movil/lib/modulos/asistencia/pantallas/historial-asistencia-pantalla.dart`, `detalle-extracto-asistencia-pantalla.dart`
- **Resultado técnico**:
  - Banner rojo (`#FEE2E2`, borde `#EF4444`, texto `#DC2626`, `fontSize: 16`, `w800`, `Poppins`) con `"¡Le faltan X.XX horas para cumplir las 36 hrs!"`.

### [BKL-19] [x] Completado - Corrección de geocerca interior y botones de Asistencia (Móvil)
- **Estado**: `[x] Completado`
- **Ámbito**: Móvil (`bumand-movil`)
- **Archivos modificados**:
  - `bumand-movil/lib/modulos/asistencia/pantallas/asistencia-pantalla.dart`, `repositorios/asistencia-repositorio.dart`, `proveedores/asistencia-proveedor.dart`
- **Resultado técnico**:
  - Radio mínimo `150.0` m, margen `posicion.accuracy.clamp(0.0, 120.0)`, fallback Sede Central Diaconía El Alto, re-evaluación automática al cargar perfil/lugar y habilitación de botones `"Marcar ingreso"` y `"Marcar salida"` con aviso informativo en deriva interior.
