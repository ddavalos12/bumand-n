# Especificación de Diseño: Eventos Geolocalizados, Paradas de Transporte La Paz, Reportes Puppeteer, Justificaciones y Cola Offline

**Fecha:** 2026-10-09  
**Proyecto:** BUMAND (Becas Universitarias con Misión y Acción Diaconal) - Diaconía FRIF-IFD / UMSA  
**Estatus:** Aprobado para Implementación  

---

## 1. Visión y Objetivos

Esta especificación formaliza las nuevas capacidades requeridas para el ecosistema BUMAND (Backend NestJS, Web Next.js 14+ y Móvil Flutter 3):

1. **Módulo de Eventos y Encuentros Geolocalizados:**
   - Permitir a usuarios con rol `ADMINISTRADOR` o `SUPERVISOR` crear convocatorias/eventos temporales con coordenadas WGS84, radio de tolerancia en metros y rango horario.
   - Permitir a los becarios convocados verificar su cercanía y registrar asistencia mediante GPS en la app móvil.
   - Visualización y monitoreo en tiempo real del acta de asistencia en el panel web.

2. **Catálogo Fijo de Rutas, Paradas y Precios de Minibuses/Microbuses (La Paz - El Alto):**
   - Definir catálogo de paradas clave y tramos frecuentes de transporte urbano (Ceja, Pérez Velasco, San Francisco, Cruce Viacha, San Pedro, Sopocachi, Miraflores, etc.).
   - Autocompletar origen, destino y tarifa regulada en el flujo de declaración de pasajes en web y móvil.

3. **Reportes Detallados Oficiales en PDF con Puppeteer:**
   - Reporte de acta oficial de asistencia a eventos y convocatorias con firmas, porcentajes y listas de convocados/presentes.
   - Reporte consolidado de rendición de viáticos y paradas de transporte.

4. **Módulo de Justificaciones e Incidencias:**
   - Posibilidad de que un becario reporte y justifique una inasistencia o marcación observada por motivos de fuerza mayor (bloqueos, paros, emergencias).
   - Panel de evaluación, aprobación o rechazo motivado para supervisores.

5. **Estrategia de Cola Asíncrona y Modo Fuera de Línea (Offline Queue):**
   - Cola local persistente en la app móvil para encolar marcaciones sin conectividad y sincronizar en segundo plano.
   - Arquitectura de colas asíncronas para reportes pesados y notificaciones.

6. **Integración Estética y Funcional de las 5 Librerías en Web y Móvil:**
   - `catalogo-shadcn`: Modales, hojas laterales, calendarios, tablas de datos y badges de estado.
   - `cult-ui`: Tarjetas con reflector de cursor (`TarjetaSpotlight`), bordes luminosos (`BordeLuminoso`).
   - `motion-primitives`: Pestañas fluidas (`PestanasAnimadas`), contenedores escalonados (`ContenedorEscalonado`), texto revelado.
   - `skipper-ui`: Base de comandos flotante (`BarraComandosFlotante`), físicas táctiles elásticas.
   - `watermelon-ui`: Contadores numéricos elásticos (`ContadorRodilloAnimado`), ráfagas de confeti (`RafagaCelebracion`), botones jugosos (`BotonJuicy`).

---

## 2. Modelo de Datos Relacional (PostgreSQL / TypeORM)

### 2.1 Tabla `eventos`
- `id` (PK, SERIAL)
- `creador_id` (FK `usuarios.id`, NOT NULL)
- `titulo` (VARCHAR(150), NOT NULL)
- `descripcion` (TEXT, NULL)
- `tipo_evento` (ENUM: `'taller'`, `'retiro'`, `'servicio_diaconal'`, `'reunion'`, `'escuela_lideres_especial'`)
- `fecha` (DATE, NOT NULL)
- `hora_inicio` (TIME, NOT NULL)
- `hora_fin` (TIME, NOT NULL)
- `latitud` (DECIMAL(9,6), NOT NULL)
- `longitud` (DECIMAL(9,6), NOT NULL)
- `radio_tolerancia_m` (INTEGER, DEFAULT 100)
- `direccion_referencia` (VARCHAR(255), NOT NULL)
- `estado` (ENUM: `'programado'`, `'en_curso'`, `'finalizado'`, `'cancelado'`, DEFAULT `'programado'`)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 2.2 Tabla `asistencias_eventos`
- `id` (PK, SERIAL)
- `evento_id` (FK `eventos.id`, NOT NULL)
- `becario_id` (FK `becarios.id`, NOT NULL)
- `hora_marcacion` (TIME, NOT NULL)
- `latitud` (DECIMAL(9,6), NOT NULL)
- `longitud` (DECIMAL(9,6), NOT NULL)
- `distancia_m` (INTEGER, NOT NULL)
- `dentro_de_radio` (BOOLEAN, DEFAULT FALSE)
- `estado` (ENUM: `'presente'`, `'retraso'`, `'ausente'`, `'justificado'`, DEFAULT `'presente'`)
- `observaciones` (VARCHAR(255), NULL)
- `created_at` (TIMESTAMP)

### 2.3 Tabla `paradas_transporte`
- `id` (PK, SERIAL)
- `nombre` (VARCHAR(100), NOT NULL)
- `zona` (VARCHAR(100), NOT NULL)
- `ciudad` (ENUM: `'La Paz'`, `'El Alto'`)
- `latitud` (DECIMAL(9,6), NOT NULL)
- `longitud` (DECIMAL(9,6), NOT NULL)
- `tipo_transporte` (VARCHAR(50), DEFAULT 'Minibús')
- `es_nodo_principal` (BOOLEAN, DEFAULT TRUE)

### 2.4 Tabla `justificaciones`
- `id` (PK, SERIAL)
- `becario_id` (FK `becarios.id`, NOT NULL)
- `tipo_incidencia` (ENUM: `'asistencia_practicas'`, `'asistencia_evento'`, `'escuela_lideres'`, `'otro'`)
- `referencia_id` (INTEGER, NULL)
- `fecha_incidencia` (DATE, NOT NULL)
- `motivo` (VARCHAR(150), NOT NULL)
- `descripcion` (TEXT, NOT NULL)
- `estado` (ENUM: `'pendiente'`, `'aprobada'`, `'rechazada'`, DEFAULT `'pendiente'`)
- `supervisor_id` (FK `usuarios.id`, NULL)
- `observacion_supervisor` (TEXT, NULL)
- `fecha_resolucion` (TIMESTAMP, NULL)
- `created_at` (TIMESTAMP)

---

## 3. Endpoints RESTful (Español Estricto y RBAC)

### 3.1 Eventos y Asistencia a Eventos (`/api/eventos`)
- `POST /api/eventos` — Crear nuevo evento (`ADMINISTRADOR`, `SUPERVISOR`)
- `GET /api/eventos` — Listar eventos vigentes e históricos (`ADMINISTRADOR`, `SUPERVISOR`, `BECARIO`)
- `GET /api/eventos/:id` — Obtener detalle de evento y lista de asistentes
- `PUT /api/eventos/:id` — Actualizar parámetros del evento (`ADMINISTRADOR`, `SUPERVISOR`)
- `POST /api/eventos/:id/asistencia` — Marcar presencia GPS en el evento (`BECARIO`)
- `GET /api/eventos/:id/reporte-pdf` — Emitir acta de asistencia en PDF con Puppeteer

### 3.2 Paradas de Transporte Urbano (`/api/pasajes/paradas`)
- `GET /api/pasajes/paradas` — Catálogo de paradas y nodos oficiales de La Paz y El Alto
- `POST /api/pasajes/paradas` — Registrar nueva parada recurrente (`ADMINISTRADOR`)

### 3.3 Justificaciones (`/api/justificaciones`)
- `POST /api/justificaciones` — Enviar solicitud de justificación (`BECARIO`)
- `GET /api/justificaciones` — Listar justificaciones (con filtro por becario o supervisor)
- `PATCH /api/justificaciones/:id/resolver` — Aprobar o rechazar justificación (`ADMINISTRADOR`, `SUPERVISOR`)

---

## 4. Arquitectura de Interfaces (Web y Móvil)

### 4.1 Web Administrativa (Next.js 14+)
- **Módulo de Eventos (`src/components/eventos/`):**
  - `GestionEventos`: Panel principal con filtros de estado y métricas.
  - `FormularioEvento`: Modal accesible para crear eventos con geocerca y selector de nómina.
  - `ActaAsistenciaEvento`: Tabla en tiempo real con avatares de becarios, horas y badges de asistencia.
- **Módulo de Justificaciones (`src/components/justificaciones/`):**
  - `BandejaJustificaciones`: Lista de incidencias con acciones de aprobación y retroalimentación motivada.
- **Micro-interacciones:**
  - `TarjetaSpotlight` y `BordeLuminoso` en eventos activos.
  - `ContadorRodilloAnimado` en porcentaje de concurrencia y KPIs.
  - `BarraComandosFlotante` para conmutar entre Asistencias, Eventos y Justificaciones.

### 4.2 App Móvil (Flutter 3 / Clean Architecture)
- **Pantalla de Convocatorias y Eventos:**
  - `EventosPantalla`: Lista de eventos programados para el becario.
  - `RadarEventoPantalla`: Radar dinámico que calcula la distancia al punto de encuentro en tiempo real.
  - Al estar a menos del radio de tolerancia durante la hora del evento, botón reactivo con `RafagaCelebracion` y `BordeLuminoso`.
- **Selector de Paradas de Transporte:**
  - Selector de paradas de La Paz - El Alto en `declarar-recorrido-pantalla.dart` para origen y destino.
- **Diálogo de Justificación Rápida:**
  - Si el becario está fuera de rango o con alerta de horario, botón "Enviar Justificación" que abre una hoja inferior modal con física elástica de resorte.

---

## 5. Garantía de Calidad y Verificación
- Pruebas unitarias de servicios en backend.
- Compilación `npm run compilar` en backend (0 errores).
- Compilación `npm run compilar` en frontend Next.js (0 errores).
- Verificación en móvil con `flutter analyze` y `flutter test`.
