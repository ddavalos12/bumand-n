# PARTE PRELIMINAR: GUÍA OFICIAL DE INSTALACIÓN Y ENCENDIDO

# GUÍA OFICIAL DE INSTALACIÓN, CONFIGURACIÓN Y ENCENDIDO DEL ECOSISTEMA BUMAND

**Fundación Diaconía FRIF-IFD — Plataforma Corporativa de Becarios Universitarios**  
*Gestión Institucional 2026 | Arquitectura Distribuida: NestJS + Next.js + Flutter + PostgreSQL*

---

## 1. Requisitos Previos del Entorno de Desarrollo y Producción

Antes de proceder con la instalación y el encendido de los subsistemas que integran la plataforma **BUMAND**, el servidor o equipo de desarrollo debe contar con las siguientes herramientas y dependencias instaladas en el sistema:

### 1.1. Tabla de Software y Versiones Homologadas

| Componente | Versión Recomendada | Propósito en el Ecosistema | Comando de Verificación |
| :--- | :---: | :--- | :--- |
| **Node.js** | v20.x o v22.x LTS | Entorno de ejecución para Backend NestJS y Frontend Next.js | `node --version` |
| **npm** | v10.x o superior | Gestor de paquetes de dependencias JavaScript/TypeScript | `npm --version` |
| **Flutter SDK** | v3.x (Canal `stable`) | SDK multiplataforma para la aplicación móvil Android/iOS/Web | `flutter --version` |
| **Dart SDK** | v3.x | Lenguaje base del cliente móvil | `dart --version` |
| **PostgreSQL** | v15.x o v16.x | Servidor de base de datos relacional con extensiones geoespaciales | `psql --version` |
| **Microsoft Edge / Google Chrome** | Versión reciente | Navegador cliente y motor Chromium para exportación de PDFs (Puppeteer) | — |
| **Git** | v2.40+ | Control de versiones y trazabilidad de ramas | `git --version` |

---

## 2. Paso a Paso: Instalación, Configuración y Encendido del Backend (`bumand-backend`)

El backend de BUMAND está construido sobre el framework **NestJS**, siguiendo patrones de arquitectura modular, tipado estricto con TypeScript, validación de DTOs con `class-validator`, y control de acceso RBAC.

### 2.1. Navegación al Directorio
Abra una terminal (PowerShell en Windows o Bash en Linux/macOS) y ubíquese en la carpeta del backend:
```bash
cd bumand-backend
```

### 2.2. Instalación de Dependencias
Instale los paquetes de Node.js requeridos por el núcleo y las dependencias de producción:
```bash
npm install
```

### 2.3. Configuración de Variables de Entorno (`.env`)
Verifique o cree el archivo `.env` en la raíz de `bumand-backend/` con las credenciales de conexión y parámetros de seguridad institucional:
```env
# Configuración del Servidor HTTP
PORT=3001
NODE_ENV=development

# Conexión a Base de Datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=bumand_db
DB_SINCRONIZAR=true
DB_LOGGING=false

# Seguridad y Criptografía JWT
JWT_SECRET=bumand_diaconia_frif_ifd_clave_secreta_institucional_2026
JWT_EXPIRACION=86400s

# Parámetros Institucionales Diaconía
DIACONIA_TOLERANCIA_GPS_METROS=100
DIACONIA_PORCENTAJE_DEVOLUCION_PASAJES=0.80
DIACONIA_MULTA_MINUTO_VIERNES_BS=10.00
DIACONIA_HORA_LIMITE_VIERNES=14:35
```

### 2.4. Compilación Limpia del Código TypeScript
Verifique la integridad sintáctica y tipada del backend ejecutando el compilador de producción:
```bash
npm run compilar
```
> **Nota de Control:** Debe retornar compilación limpia en 0 errores.

### 2.5. Ejecución de Pruebas Unitarias y Suites de Integración
Ejecute la batería completa de pruebas automatizadas con Jest:
```bash
npm test
```
> **Resultado Esperado:** **16 de 16 suites aprobadas**, **98 de 98 tests unitarios en verde (100% éxito)**, cubriendo los módulos de autenticación y RBAC, control de asistencia satelital y registro manual por contingencia (`/asistencia/manual`), motor de multas de viernes (Bs 10/min), cálculo exacto del 80% de viáticos con trazabilidad de calles y teleférico, matriz semestral de evaluación 360°, cuestionario de bienestar universitario (26 preguntas), formulario estructurado del mentor (18+3 preguntas) y control de refrigerios institucionales.

### 2.6. Arquitectura, Adición y Ejecución de Semillas de Datos (Seeders Institucionales)

El subsistema de semillas de datos de BUMAND (`bumand-backend/src/datos/`) garantiza la inicialización determinista e idempotente de todo el ecosistema institucional, asegurando que la base de datos PostgreSQL cuente con la nómina real homologada de Diaconía FRIF-IFD.

```
bumand-backend/src/datos/
├── datos.modulo.ts                  # Registro del módulo de datos y exportación de repositorios
├── semilla.servicio.ts              # Lógica de inserción, actualización y depuración de registros
├── semilla-datos.constantes.ts      # Arrays fuertemente tipados con la nómina oficial institucional
└── sembrar.ts                       # Script CLI de arranque independiente (bootstrap)
```

#### 2.6.1. Entidades Pobladas por la Semilla
El servicio de siembra procesa e interconecta las siguientes entidades relacionales:
1. **Administradores Institucionales (2 cuentas):** Acceso total y supervisión técnica (`daniel234.davalos@gmail.com`, `coordinacion@bumand.bo`).
2. **Supervisores y Mentores Diaconía (29 cuentas):** Jefaturas de seguridad física, talento humano, finanzas, captaciones, agencias y consultorio médico. Se registran tanto en `Usuario` (con rol `SUPERVISOR`) como en la tabla `Evaluador` para evaluaciones 360°.
3. **Estudiantes Becarios (30 nóminas oficiales):** Registro completo con C.I., correo corporativo `@bumand.bo`, carrera universitaria, institución de educación superior (UPEA, UMSA, etc.), iglesia asignada y matriz de horarios semanales.
4. **Iglesias Vinculadas (25 congregaciones cristianas):** Datos de pastor, teléfono, dirección y coordenadas GPS para la convalidación del Formulario Pastoral F-03.
5. **Lugares de Práctica y Geocercas (11 sedes/agencias):** Oficina Central Diaconía IFD (El Alto) y 10 agencias provinciales/urbanas (San Pedro, Chasquipampa, Viacha, Senkata, Río Seco, Ciudad Satélite, etc.), cada una con coordenadas WGS-84 y radio de tolerancia métrica ($r \in [50, 60]\text{ metros}$).
6. **Módulos de Evaluación 360°:** 5 módulos formativos oficiales equilibrados al 20% cada uno (Espiritual, Práctico/Laboral, Académico, Liderazgo/Servicio y Desarrollo Personal).
7. **Tarifas y Paradas Oficiales:** Puntos de trasbordo y tarifas del transporte público homologadas para la liquidación del 80% de viáticos.

#### 2.6.2. Cómo Agregar Nuevos Registros a los Seeders
Para incorporar nuevos usuarios, iglesias o sedes sin alterar la integridad referencial:

1. **Editar las constantes tipadas en `src/datos/semilla-datos.constantes.ts`:**
   Ubique el array correspondiente y agregue el nuevo objeto validando que cumpla con la interfaz TypeScript:
   ```typescript
   // Ejemplo: Agregar un nuevo estudiante becario
   export const BECARIOS_SEMILLA: BecarioSemilla[] = [
     // ... becarios existentes ...
     {
       ci: "12345678",
       nombre: "Nombre Completo del Estudiante",
       correo: "nuevo.becario@bumand.bo",
       clave: "Bumand2026!",
       carrera: "Ingeniería de Sistemas",
       universidad: "Universidad Mayor de San Andrés",
       institucion: "UMSA",
       unidad: "Sistemas e Infraestructura",
       ubicacion: "Oficina Central Diaconía IFD - El Alto",
       supervisor_correo: "angel.ali@bumand.bo",
       horario_semanal: {
         lunes: "08:00 - 12:00",
         martes: "08:00 - 12:00",
         miercoles: "08:00 - 12:00",
         jueves: "08:00 - 12:00",
         viernes: "14:35 - 18:35"
       },
       iglesia_nombre: "Iglesia Cristiana Central"
     }
   ];
   ```

2. **Extensión de Lógica de Inserción en `src/datos/semilla.servicio.ts` (si se crea una nueva entidad):**
   - Inyecte el repositorio TypeORM en el constructor (`@InjectRepository(NuevaEntidad)`).
   - En el método `ejecutarSemilla()`, agregue la validación de unicidad mediante `findOne`:
     ```typescript
     let entidad = await this.nueva_entidad_repo.findOne({ where: { codigo: dato.codigo } });
     if (!entidad) {
       entidad = this.nueva_entidad_repo.create(dato);
       await this.nueva_entidad_repo.save(entidad);
       this.logger.log(`Nuevo registro sembrado: ${dato.codigo}`);
     }
     ```

#### 2.6.3. Modos de Ejecución de los Seeders

##### Opción A: Ejecución Manual vía CLI (Recomendada para inicialización o resiembra)
Ejecute el comando npm desde el directorio `bumand-backend/`:
```bash
npm run sembrar
```
Este comando ejecuta el bootstrap de NestJS sin levantar el listener HTTP (`src/datos/sembrar.ts`), inicializa TypeORM, aplica las migraciones y entidades sincronizadas, ejecuta la siembra completa e imprime el resumen en consola:
```
[SemillaServicio] Nómina oficial sembrada con éxito: 30 becarios registrados.
[SemillaServicio] Verificación y siembra institucional completada con éxito: 2 administradores, 29 supervisores, 30 estudiantes/becarios y 25 iglesias.
Siembra manual institucional completada con éxito.
```

##### Opción B: Ejecución Automática al Iniciar el Servidor (`OnModuleInit`)
El servicio `SemillaServicio` implementa la interfaz de ciclo de vida `OnModuleInit` de NestJS. Cada vez que el backend se enciende mediante:
```bash
npm run start:dev   # o npm run start
```
El hook `onModuleInit()` verifica si las cuentas base y las nóminas existen. Si un usuario o registro no existe o ha sido modificado en las constantes, lo sincroniza automáticamente de forma transparente y sin duplicar datos.

#### 2.6.4. Verificación Directa en Base de Datos PostgreSQL
Puede verificar el resultado de la siembra conectándose a PostgreSQL mediante `psql`:
```bash
# Conexión local a la base de datos de BUMAND
psql -h localhost -p 5432 -U postgres -d bumand-db
```
Ejecutar las consultas de auditoría institucional:
```sql
-- Verificar conteo por roles institucionales
SELECT rol, count(*) FROM "usuario" GROUP BY rol;
-- Resultado esperado:
-- ADMINISTRADOR: 2
-- SUPERVISOR: 29
-- BECARIO: 30

-- Verificar lugares de práctica con geocercas calibradas
SELECT nombre, latitud, longitud, radio_tolerancia_m FROM "lugar_practica";

-- Verificar módulos de evaluación 360°
SELECT nombre, ponderacion_porcentaje FROM "modulo_evaluacion";
```

#### 2.6.5. Actualización del Esquema Relacional de Base de Datos PostgreSQL

En conformidad con las resoluciones institucionales y los requerimientos formativos 2026, el modelo relacional de PostgreSQL ha sido ampliado con nuevas tablas y columnas de trazabilidad:

1. **Nueva Tabla: `preguntas_bienestar` (Cuestionario de Bienestar Universitario):**
   - **Propósito:** Almacena de forma dinámica e institucionalmente editable las **26 preguntas oficiales** del Cuestionario de Bienestar Personal, Social y Universitario (basado en `Cuestionario_bienestar_universitario.pdf`).
   - **Estructura de Columnas:**
     - `id` (`int`, PK): Identificador autoincremental de la pregunta.
     - `numero_orden` (`int`): Posición canónica de la pregunta (1 al 26).
     - `titulo` (`varchar(150)`): Dimensión evaluada (ej. *"Estado Emocional General"*, *"Red de Apoyo y Relaciones Interpersonales"*, *"Salud Física y Hábitos de Descanso"*, *"Desempeño y Estrés Académico"*).
     - `enunciado` (`text`): Pregunta orientadora formulada al estudiante.
     - `categoria` (`varchar(100)`): Eje evaluativo (*"Salud Mental y Emocional"*, *"Relaciones Sociales"*, *"Entorno Académico"*, *"Hábitos de Vida"*).
     - `opciones` (`jsonb`): Estructura fuertemente tipada con incisos (`a`, `b`, `c`, `d`, `e`), texto explicativo, puntaje numérico asignado y semáforo institucional (`verde`, `amarillo`, `rojo`).
     - `activa` (`boolean`, default `true`): Permite habilitar o suspender preguntas en cohortes específicas.
     - `updated_at` (`timestamptz`): Registro temporal de última edición institucional.

2. **Nuevas Columnas en la Tabla `becarios`:**
   - `modalidad_carrera` (`varchar(50)`): Régimen curricular del estudiante (`"Semestral"` o `"Anual"`), indispensable para determinar los cortes de convalidación académica.
   - `tipo_beca` (`varchar(50)`): Clasificación institucional del beneficio (`"Beca Completa"`, `"Media Beca"`, `"Beca de Excelencia"`).
   - `comentario_academico` (`text`): Glosa analítica del tutor sobre el rendimiento universitario, materias reprobadas y créditos cursados.
   - `comentario_iglesia` (`text`): Observación cualitativa ministerial del pastor o líder eclesial sobre testimonio, servicio y vida devocional.

3. **Nuevas Columnas en la Tabla `registros_asistencia`:**
   - `es_registro_manual` (`boolean`, default `false`): Bandera de auditoría que identifica si la marcación fue asentada de forma manual por el Administrador General o Supervisor ante contingencias.
   - `motivo_contingencia` (`text`): Fundamentación reglamentaria del registro manual (ej. *"Sin megas de navegación celular en campo"*, *"Olvido involuntario de marcación digital al ingreso"*, *"Falla temporal del sensor GPS del dispositivo móvil"*).

4. **Nuevas Columnas en la Tabla `recorridos`:**
   - `calles_declaradas` (`text`): Itinerario pormenorizado de avenidas, calles y puntos de referencia urbanos transitados por el becario (ej. *"Av. 6 de Marzo -> Ceja El Alto -> Autopista La Paz-El Alto -> Av. Montes -> Pérez Velasco"*).
   - `medio_transporte` (`varchar(100)`): Modalidad de locomoción utilizada (`"Minibús"`, `"Micro / Colectivo"`, `"Teleférico (Línea Roja / Morada / Amarilla)"`, `"Trufi"`, `"A pie / Combinado"`).
   - `detalle_tramos_json` (`jsonb`): Estructura detallada de paradas intermedias, coordenadas satelitales PIN GPS capturadas, costos desagregados de tramos de Ida y Vuelta y porcentaje del 80% liquidable.

```sql
-- Consulta de verificación de las 26 preguntas de bienestar
SELECT numero_orden, titulo, categoria, activa FROM "preguntas_bienestar" ORDER BY numero_orden ASC;

-- Consulta de auditoría de registros de asistencia por contingencia manual
SELECT r.id, b.nombre, r.fecha, r.hora_ingreso, r.hora_salida, r.es_registro_manual, r.motivo_contingencia
FROM "registro_asistencia" r
JOIN "becario" b ON b.id = r.becario_id
WHERE r.es_registro_manual = true;

-- Consulta de trazabilidad de calles y teleférico en recorridos de pasajes
SELECT id, becario_id, fecha, origen, destino, calles_declaradas, medio_transporte, monto_total, monto_reembolso_80
FROM "recorrido"
ORDER BY fecha DESC LIMIT 10;
```

---

### 2.7. Modos de Encendido del Servicio Backend

#### Modo Desarrollo (con Recarga en Caliente - Hot Reload):
```bash
npm run start:dev
```
El servidor escuchará en el puerto configurado: `http://localhost:3002`.

#### Modo Producción (Compilación Optimizada):
```bash
npm run compilar
npm run start:prod
```

#### Explorador de la API REST (Swagger UI):
Una vez encendido el backend, puede auditar y probar todos los endpoints REST interactivos accediendo a:
```
http://localhost:3002/api/docs
```

---

## 3. Paso a Paso: Instalación, Configuración y Encendido del Frontend Web (`bumand-frontend`)

El portal web de BUMAND está desarrollado con **Next.js 14+/16** (App Router), **React 18**, **Tailwind CSS**, **Radix UI / Shadcn**, y bibliotecas de micro-interacción como **Cult UI**, **Watermelon UI** y **Skipper UI**.

### 3.1. Navegación al Directorio
En una nueva terminal, acceda a la carpeta del frontend web:
```bash
cd bumand-frontend
```

### 3.2. Instalación de Dependencias
Instale los paquetes y módulos del cliente web:
```bash
npm install
```

### 3.3. Configuración de Variables de Entorno (`.env.local`)
Cree o configure el archivo `.env.local` en la raíz de `bumand-frontend/`:
```env
# Enlace hacia la API REST de BUMAND NestJS
NEXT_PUBLIC_API_URL=http://localhost:3002

# Identificador de Entorno
NEXT_PUBLIC_ENTORNO=desarrollo
```

### 3.4. Compilación de Producción y Verificación de Tipos
Ejecute la compilación del proyecto con Turbopack:
```bash
npm run compilar
```
> **Resultado Esperado:** Compilación estricta con Next.js y TypeScript completada con 0 errores de tipado o linting.

### 3.5. Encendido del Servidor Web

#### Modo Desarrollo:
```bash
npm run dev
```
La aplicación web se iniciará en `http://localhost:3000`.

#### Modo Producción:
```bash
npm start
```
Servirá la versión precompilada optimizada en `http://localhost:3000`.

#### Acceso a la Plataforma:
Abra su navegador web y diríjase a:
```
http://localhost:3000/inicio-sesion
```

---

## 4. Paso a Paso: Instalación, Configuración y Encendido de la Aplicación Móvil (`bumand-movil`)

El cliente móvil de BUMAND está construido con **Flutter 3.x** y **Dart 3.x**, estructurado bajo **Clean Architecture** y gestionado con **Riverpod 3.x**.

### 4.1. Navegación al Directorio
En una terminal dedicada, ingrese a la carpeta del cliente móvil:
```bash
cd bumand-movil
```

### 4.2. Descarga de Dependencias Flutter
Descargue los paquetes declarados en `pubspec.yaml`:
```bash
flutter pub get
```

### 4.3. Análisis Estático de Código
Verifique la higiene y ausencia de advertencias de código:
```bash
flutter analyze
```
> **Resultado Esperado:** `No issues found! (ran in X.Xs)` — Cero errores y cero advertencias.

### 4.4. Ejecución de la Suite Completa de Pruebas
Valide todos los casos de prueba de dominio, widgets y navegación:
```bash
flutter test
```
> **Resultado Esperado:** **95 de 95 pruebas aprobadas al 100%**, validando el radar geodésico Haversine, detección de bloques edilicios, doble confirmación de viernes, cálculo dinámico de multas (Bs 10/min), liquidación de pasajes al 80% con trazabilidad de calles y teleférico, cuestionario dinámico de bienestar universitario (26 preguntas), formulario estructurado del mentor (18+3 preguntas) y las tres subsecciones desacopladas del historial con soporte para asistencias manuales por contingencia.

### 4.5. Encendido y Ejecución de la Aplicación Móvil

#### Verificación de Dispositivos Conectados:
```bash
flutter devices
```

#### Ejecución en Emulador o Dispositivo Físico Android:
```bash
flutter run -d <id-dispositivo-o-emulador>
```

#### Ejecución en Navegador Chrome (Modo Web Depuración):
```bash
flutter run -d chrome --web-port 8080
```

#### Generación de Paquete de Instalación para Producción (APK):
```bash
flutter build apk --release
```
El archivo ejecutable se generará en: `build/app/outputs/flutter-apk/app-release.apk`.

---

## 5. Cuentas Semilla Institucionales para Pruebas RBAC

Para facilitar la verificación integral de las funcionalidades, la segregación de roles y la auditoría operativa, el sistema cuenta con tres cuentas semilla precargadas en la base de datos:

| Rol de Usuario | Correo Electrónico | Contraseña | Alcance y Permisos Clave en el Ecosistema |
| :--- | :--- | :---: | :--- |
| **Administrador General** | `daniel234.davalos@gmail.com` | `Bumand2026!` | • Acceso total a todas las vistas y configuraciones.<br>• Creación y edición de sedes y sub-bloques edilicios.<br>• Asignación exclusiva de tutores y supervisores a becarios.<br>• Emisión de la orden global de confirmación mensual de datos.<br>• Apertura y cierre de semestres en evaluaciones.<br>• Configuración flexible de la matriz 360° (base 20% adaptable).<br>• Auditoría analítica con filtro de fechas y KPIs de multas.<br>• Gestión y emisión de la Planilla de Reposición de Refrigerios (`REP-REF-0000X`). |
| **Supervisor Institucional** | `angel.ali@bumand.bo` | `Bumand2026!` | • Panel operativo restringido a los becarios bajo su tutela.<br>• Monitoreo presencial y llamada de lista rápida en vivo (viernes).<br>• Aprobación y observación de solicitudes de pasajes al 80%.<br>• Calificación del módulo práctico en evaluación 360° y firma digital.<br>• Dictamen motivado en bandeja de justificaciones de inasistencia.<br>• *Restricción:* No puede modificar sedes ni cambiar universidades. |
| **Estudiante Becaria** | `nilda.churata@bumand.bo` | `Bumand2026!` | • Marcación satelital con radar geodésico y detección de bloque.<br>• Advertencia visual transparente de multa por retraso (Bs 10/min).<br>• Declaración mensual de tramos de pasajes con PIN GPS.<br>• Llenado del formulario pastoral F-03 y autoevaluación.<br>• Lectura del versículo del día y redacción de reflexiones devocionales.<br>• Consulta de Historial estructurado en 3 pestañas (Asistencias, Pasajes, Multas e Incidencias).<br>• *Restricción:* Campos universitarios bloqueados en modo solo lectura. |

---

## 6. Secuencia Recomendada de Encendido Rápido para Demostraciones

Para iniciar todo el ecosistema de manera concurrente en un entorno local:

1. **Terminal 1 (Backend NestJS):**
   ```bash
   cd bumand-backend && npm run start:dev
   ```
   *(Verificar que reporte conexión exitosa y Swagger en el puerto 3002).*

2. **Terminal 2 (Frontend Next.js):**
   ```bash
   cd bumand-frontend && npm run dev
   ```
   *(Abrir `http://localhost:3000/inicio-sesion` en el navegador).*

3. **Terminal 3 (Cliente Móvil Flutter):**
   ```bash
   cd bumand-movil && flutter run -d chrome --web-port 8080
   ```
   *(O ejecutar sobre un emulador Android con `flutter run`).*

---
*Fin de la Guía Oficial de Instalación y Encendido — BUMAND 2026*


<div class="salto-pagina"></div>

# PARTE I: PLATAFORMA WEB POR ROLES


**Sistema de Gestión de Becarios, Viáticos, Asistencia Satelital y Formación Integral**  
*Fundación Diaconía FRIF-IFD — Gestión Institucional 2026*  
*Versión de Producción Homologada con PostgreSQL y API NestJS (Puerto 3002)*

---

## 1. Resumen Ejecutivo y Arquitectura RBAC

La plataforma web de **BUMAND** ha sido desarrollada con tecnología de última generación sobre **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, la biblioteca de componentes **Radix UI / Shadcn**, y primitivas de micro-interacción de alta fidelidad (**Cult UI**, **Watermelon UI** y **Skipper UI**). Su arquitectura técnica responde a un modelo estricto de **Control de Acceso Basado en Roles (RBAC)**, diseñado para garantizar la segregación absoluta de funciones, la seguridad criptográfica de datos eclesiásticos y académicos de los 61 estudiantes becarios, y el estricto cumplimiento normativo en la liquidación de viáticos (80%), control de refrigerios y acreditación de horas de servicio.

En estricto apego al estándar de calidad institucional y a los requerimientos del nuevo backlog (**BKL-01 a BKL-10**), el sistema opera **100% conectado a la base de datos PostgreSQL en vivo** a través del backend NestJS (`http://localhost:3002/api`), habiendo erradicado por completo todo dato simulado, mock o fallback en memoria local (`BKL-10`).

---

### 1.1. Matriz de Roles y Alcance de Navegación

| Módulo / Pestaña | Administrador General (`daniel234.davalos@gmail.com`) | Supervisor Institucional (`angel.ali@bumand.bo`) | Becario Universitario (`nilda.churata@bumand.bo`) |
| :--- | :---: | :---: | :---: |
| **Inicio de Sesión** | Acceso Global con Selector Semilla RBAC | Acceso Global con Selector Semilla RBAC | Acceso Global con Selector Semilla RBAC |
| **Dashboard / Panel Principal** | Analítico Global con KPIs, Gráficos y Multas | Panel Operativo de Tutela de Cohorte | Panel Personal de Avance y Prácticas |
| **Gestión de Usuarios y Claves** | Control Total (61 Cuentas, Reseteo y Edición) | *Sin Acceso (Bloqueo RBAC)* | *Sin Acceso (Bloqueo RBAC)* |
| **Directorio de Becarios** | Gestión Global, Meta 36h, Modalidad Pasajes (`BKL-05`) | Lectura y Seguimiento de Cohorte Asignada | Perfil de Solo Lectura Protegido |
| **Sedes y Geocercas (WGS84)** | Catálogo, Calibración Métrica & Sub-bloques | Catálogo y Consulta de Sedes | Visualización de Sede Asignada |
| **Control de Asistencia** | Auditoría General, Google Maps & Multas Viernes | Monitoreo Asignado + Lista en Vivo | Marcación GPS con Detección de Bloque |
| **Acciones de Servicio y Eventos** | Creación Global & Cambio de Lugar Dinámico | Convocatoria y Control de Actas | Asistencia a Eventos Convocados |
| **Pasajes y Viáticos (80%)** | Auditoría Financiera, Tramos y Tarifas (`BKL-09`) | Aprobación / Observación de Tramos | Declaración con Tarifas Reales (`BKL-09`) |
| **Bandeja de Justificaciones** | Homologación en 2 Pasos & Exención Multa | Dictamen Motivado de Faltas | Formulario Directo y Radicación Real |
| **Control de Refrigerios** | Planilla, Sorteo Duplas, Rendición 100% (`BKL-03`) | Consulta de Turnos de Sorteo | Consulta de Turno, Dupla y Recojo |
| **Evaluaciones 360° Semestral** | Matriz Dinámica, F-03 Read-Only (`BKL-06`), Actas | Calificación Mentor con Validación OTP | Formulario F-03 + Notas Semestrales |
| **Escuela de Líderes (Classroom)**| Calificación de Tareas y Evidencias | Consulta de Módulos | Subida de Enlaces y Documentos |
| **Carga de Notas y Récord** | Revisión y Aprobación de Documentos | Consulta de Calificaciones | Subida de Récord e Historial Semestral |
| **Seguimiento y Citas** | Consulta Global de Citas | Agendamiento de Citas a Supervisados | Mis Citas y Compromisos con Supervisor |
| **Emisión de Reportes PDF** | Generador de Reportes con Rango de Fechas | *Sin Acceso Directo a Plantillas* | *Sin Acceso* |
| **Centro de Notificaciones** | Notificaciones Globales y Filtros | Notificaciones de Cohorte | Alertas Personales de Justificaciones |
| **Mi Perfil y Seguridad** | Acceso Universal (Datos, Correos, Clave) | Acceso Universal (Datos, Correos, Clave) | Acceso Universal (Datos, Correos, Clave) |

---

### 1.2. Guía de Instalación, Configuración y Encendido Web

#### 1. Requisitos Previos:
- **Node.js:** Versión 20.x o superior (`node -v`).
- **NPM:** Versión 10.x o superior (`npm -v`).
- **Servicio Backend:** NestJS ejecutándose en el puerto oficial **`3002`** (`http://localhost:3002/api`).
- **Base de Datos:** PostgreSQL 16 con base de datos `bumand_db` aprovisionada y migrada.

#### 2. Configuración de Variables de Entorno (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXT_PUBLIC_AMBIENTE=produccion
```

#### 3. Comandos de Arranque y Compilación:
```bash
# 1. Navegar al directorio del frontend web
cd bumand-frontend

# 2. Instalar dependencias limpias
npm install

# 3. Modo Desarrollo con recarga rápida (Turbopack):
npm run dev

# 4. Compilación estricta y producción (0 errores de TypeScript):
npm run compilar
npm start
```
> **Acceso a la Plataforma:** Abra su navegador en **`http://localhost:3000`**.

---

## 2. Pantalla de Acceso Global: Inicio de Sesión

### 2.1. Vistas Generales y Capturas de Pantalla

![Pantalla de Inicio de Sesión Web](capturas/web/web_login.png)
![Vista General de Login con Selector de Rol Semilla](capturas/web/admin/01-login/01_login_vista_general.png)
![Visibilidad de Contraseña y Credenciales Semilla RBAC](capturas/web/admin/01-login/02_login_visibilidad_clave_y_semillas.png)

### 2.2. Propósito y Funcionalidad Operativa

La pantalla de **Inicio de Sesión** (`/inicio-sesion`) constituye la esclusa perimetral de seguridad para todos los usuarios del ecosistema BUMAND. Integra validación criptográfica JWT, soporte multicuenta (inicio de sesión mediante correo corporativo `@bumand.bo` o correos alternativos registrados en `correos_usuarios`), conmutador interactivo de visibilidad de contraseña y botones de acceso rápido con credenciales semilla para pruebas de interoperabilidad y auditoría.

#### Elementos presentes:
1. **Identidad Visual Corporativa:** Logotipo de Diaconía BUMAND con tipografía Inter y fondos con gradientes institucionales.
2. **Formulario Reactivo:**
   - Campo **Correo Electrónico Institucional o Alternativo** (`correo`): Compatible con validación RFC 5322 y soporte de alias vinculados a la cuenta.
   - Campo **Contraseña Institucional** (`contraseña`): Con botón interactivo de ojo para alternar visibilidad (**Mostrar / Ocultar Contraseña**) evitando errores tipográficos.
3. **Selector Semilla RBAC:** Tarjeta interactiva con 3 perfiles oficiales precargados para demostración y evaluación inmediata:
   - **Administrador:** `daniel234.davalos@gmail.com` / `Bumand2026!`
   - **Supervisor:** `angel.ali@bumand.bo` / `Bumand2026!`
   - **Becario:** `nilda.churata@bumand.bo` / `Bumand2026!`
4. **Manejo de Errores y Feedback:** Banner accesible con códigos de error estándar (`ERR-1001` para credenciales inválidas, `ERR-1002` para cuenta inactiva).

### 2.3. Análisis Comparativo: Qué Hace vs. Qué NO Hace

| Qué Hace la Pantalla de Inicio de Sesión Web | Qué NO Hace la Pantalla de Inicio de Sesión Web |
| :--- | :--- |
| Valida credenciales contra el endpoint `POST http://localhost:3002/api/autenticacion/iniciar-sesion`. | No almacena contraseñas en texto plano en `localStorage` (solo token JWT seguro). |
| Soporta inicio de sesión tanto con el correo corporativo como con cualquiera de los correos alternativos asociados. | No permite autorregistro de roles privilegiados (Supervisor o Administrador); estos son creados por administración. |
| Permite alternar la visibilidad de la contraseña con un clic para evitar errores de escritura. | No omite el bloqueo por tasa de intentos fallidos (`Rate Limiting` activo en backend). |
| Redirige automáticamente al usuario a su panel correspondiente según su rol verificado en el token. | No expone datos confidenciales de la base de datos si la autenticación falla. |

---

## 3. Rol: Administrador General (`daniel234.davalos@gmail.com`)

El Administrador General ejerce el gobierno técnico, financiero, académico y disciplinario de todo el programa de becas de Diaconía FRIF-IFD.

---

### 3.1. Dashboard General Analítico

#### Capturas de Pantalla
![Dashboard General Analítico Web](capturas/web/admin_dashboard.png)
![Dashboard KPIs y Gráficos Estadísticos](capturas/web/admin/02-dashboard/01_dashboard_kpis_y_graficos.png)
![Dashboard Filtro de Fechas y Alertas Tempranas](capturas/web/admin/02-dashboard/02_dashboard_filtro_fechas_y_alertas.png)

#### Propósito y Componentes
El **Dashboard Analítico** centraliza las métricas operativas clave en tiempo real:
- **Tarjetas KPI Consolidadas:** Total de becarios activos (61), becarios con prácticas al día (meta de 36 horas), solicitudes de pasajes pendientes de auditoría financiera, y total acumulado de multas de viernes.
- **Gráficos Estadísticos Dinámicos:** Desglose de cumplimiento de horas de práctica por facultad/sede, índice de puntualidad de viernes y evolución de viáticos desembolsados.
- **Selector de Rango de Fechas:** Permite auditar periodos históricos específicos con recálculo automático de métricas.
- **Alertas Tempranas:** Alerta de becarios en riesgo de incumplimiento semestral o con multas acumuladas superiores a Bs 50.

---

### 3.2. Gestión de Cuentas Institucionales y Contraseñas

#### Capturas de Pantalla
![Gestión de Usuarios y Contraseñas](capturas/web/admin_usuarios_contrasenas.png)
![Directorio General de Usuarios](capturas/web/admin/03-usuarios/01_directorio_usuarios.png)
![Modal Restablecer Contraseña Institucional](capturas/web/admin/03-usuarios/02_modal_restablecer_contrasena.png)
![Modal Editar Datos y Correos de Usuario](capturas/web/admin/03-usuarios/03_modal_editar_usuario_y_correos.png)

#### Propósito y Componentes
Este módulo otorga al Administrador General el control maestro sobre las **61 cuentas de usuario** del ecosistema BUMAND:
1. **Directorio de Cuentas:** Tabla interactiva con búsqueda por nombre, CI o correo, filtros por rol (`Administrador`, `Supervisor`, `Becario`), estado activo/inactivo con switch reactivo instantáneo y conteo de correos alternativos.
2. **Modal de Restablecimiento de Contraseña:**
   - Generador automático de contraseñas de alta seguridad institucional (alfanumérico con mayúsculas, minúsculas, dígitos y símbolos especiales).
   - Indicador visual dinámico de fortaleza de contraseña (Muy Débil, Débil, Media, Fuerte, Óptima).
   - Botón de copia al portapapeles con confirmación visual tipo toast.
3. **Modal de Edición de Datos y Correos:**
   - Modificación de nombres, apellidos, teléfono y congregación.
   - Gestión integral de **correos de acceso alternativos** (`correos_usuarios`): adición de correos Gmail, Hotmail o institucionales, marcación de correo principal y eliminación de alias obsoletos.

---

### 3.3. Directorio General de Becarios, Gobernanza de Supervisores y Modalidad de Pasajes (`BKL-05`)

#### Capturas de Pantalla
![Directorio General de Becarios Web](capturas/web/admin_becarios.png)
![Directorio de Becarios y Seguimiento de Meta 36h](capturas/web/admin/04-becarios/01_directorio_becarios_36h.png)
![Modal de Configuración de Modalidad de Pasajes](capturas/web/admin/04-becarios/02_modal_configuracion_modalidad_pasajes.png)
![Confirmación de Guardado Exitoso en Base de Datos](capturas/web/admin/04-becarios/03_modalidad_pasajes_guardado_exitoso.png)
![Modal Editar Expediente con Catálogo Completo de 29 Supervisores](capturas/web/admin/02-becarios/06_modal_editar_expediente_29_supervisores.png)
![Modal Cambiar Supervisor Institucional con Supervisor Actual y Buscador](capturas/web/admin/02-becarios/07_modal_cambiar_supervisor_institucional.png)
![Vista Supervisores con Becarios Designados y Métricas de Cobertura](capturas/web/admin/02-becarios/08_vista_supervisores_con_becarios_designados.png)

#### Detalle Exhaustivo de Gobernanza de Supervisores y Requerimiento BKL-05
La gestión de becarios y tutores institucionales ha sido elevada al estándar empresarial definitivo mediante tres innovaciones operativas:

1. **Catálogo Integral y Dinámico de 29 Supervisores de Diaconía FRIF-IFD:**
   - Se erradicó la lista estática reducida de 4 supervisores. El componente `GestionBecarios` sincroniza en vivo con el backend NestJS mediante `GET /usuarios?rol=supervisor` alimentado directamente por la tabla `usuarios` de PostgreSQL.
   - Cuenta con una base homologada de los 29 supervisores activos (Adams Callejas, Alberto León, Alejandra Romay, Anai Paye, Angel Javier Alí Paz, Brian Siles, Carlos Alanoca, Cheryl Zegarra, Claudia Consuelo Cabrera Delgado, Elsa Quinteros, Max Reynoso, Rodrigo Solorzano San Martín, Walter Laime, entre otros) con sus correos oficiales `@diaconia.bo` / `@bumand.bo` y sedes asignadas.
   - Tanto en el modal **"Editar Expediente de Becario"** como en el modal **"Cambiar Supervisor Institucional"**, los selectores exponen un buscador interactivo para filtrar en milisegundos entre los 29 supervisores, mostrando el nombre completo, correo institucional y el badge con la cantidad de becarios asignados en tiempo real.

2. **Flujo de Asignación y Cambio Inmediato de Supervisor:**
   - La tabla operativa del **Directorio General de Becarios** incorpora la columna explícita **Supervisor / Tutor Asignado**, desplegando el nombre y correo del tutor actual junto a un botón directo **"Cambiar"** (`RefreshCw`).
   - Al pulsar el botón, el modal **"Cambiar Supervisor Institucional"** destaca un recuadro informativo con el **Supervisor Actual Asignado** y el selector del **Nuevo Supervisor Responsable**.
   - Al confirmar la operación, el frontend despacha una mutación HTTP `PUT /becarios/:id/asignar-supervisor` con payload `{ supervisor_id: number }`, persistiendo la relación en la base de datos PostgreSQL y refrescando reactivamente la nómina.

3. **Nueva Vista Especializada: "Supervisores con Becarios Designados":**
   - Incorpora un selector de sub-vistas tipo pill: **"📋 Directorio General de Becarios"** y **"👥 Supervisores con Becarios Designados (29)"**.
   - **Métricas KPI Superiores:** Resumen dinámico que reporta *Total Supervisores (29)*, *Supervisores con Becarios Designados*, *Supervisores Disponibles* y *Total Becarios Supervisados (100% Cobertura)*.
   - **Filtros Avanzados:** Buscador universal (por supervisor, correo o becario) y filtros segmentados (`Todos`, `Con Becarios`, `Disponibles`).
   - **Tarjetas Expandidas por Supervisor:** Muestra la ficha institucional de cada supervisor, su sede, y el desglose de los estudiantes asignados con su CI, carrera, universidad y sede de práctica, permitiendo reasignaciones individuales directas mediante el botón **"Cambiar"** o vincular nuevos estudiantes con el botón **"+ Designar Becario"**.

4. **Configuración de Modalidad de Pasajes (BKL-05):**
   - Permite al Administrador calibrar la asignación de viáticos de transporte entre **Solo Ida** e **Ida y Vuelta** por cada actividad programática (Prácticas, Escuela de Líderes y Acciones de Servicio), persistiendo vía `PATCH /api/becarios/:id/configuracion-pasajes` y garantizando que la App Móvil aplique las restricciones de retorno en tiempo real.

---

### 3.4. Catálogo de Sedes y Geocercas Institucionales (WGS84)

#### Capturas de Pantalla
![Catálogo de Sedes y Geocercas Institucionales](capturas/web/admin_sedes.png)
![Catálogo de Sedes y Radios Geodésicos](capturas/web/admin/05-sedes/01_catalogo_sedes_geocercas.png)
![Detalle de Sub-bloques Edilicios de Sede](capturas/web/admin/05-sedes/02_detalle_subbloques_sede.png)

#### Propósito y Componentes
Administra las 11 agencias y oficinas metropolitanas autorizadas para prácticas de servicio (Oficina Central La Paz, Regional El Alto, Villa Fátima, Sopocachi, etc.):
- **Definición de Polígonos y Radios WGS84:** Coordenadas latitud/longitud de precisión con radio de cobertura en metros (50m a 200m).
- **Sub-bloques Edilicios:** Configuración de pisos, anexos y áreas permitidas para el cómputo de asistencia satelital con algoritmo Haversine.

---

### 3.5. Auditoría y Control de Asistencia Satelital y Extracto Bancario

#### Capturas de Pantalla
![Auditoría de Asistencia Web](capturas/web/admin_asistencia.png)
![Control de Asistencia General y Marcaciones Satelitales](capturas/web/admin/06-asistencia/01_control_asistencia_general.png)
![Modal de Asistencia Manual por Contingencia](capturas/web/admin/06-asistencia/02_modal_asistencia_manual_contingencia.png)
![Extracto Mensual de Asistencia Formato Bancario](capturas/web/admin/06-asistencia/03_extracto_mensual_asistencia_bancario.png)

#### Propósito y Componentes
Audita en tiempo real los registros de entrada y salida de prácticas de servicio y eventos de los viernes:
1. **Trazabilidad Satelital:** Exposición de coordenadas capturadas, distancia a la geocerca oficial, precisión en metros y verificación anti-spoofing.
2. **Modal de Asistencia Manual por Contingencia:** Permite asentar asistencias excepcionales cuando el becario justificó falla técnica comprobada en campo (sin batería, sensor GPS dañado, etc.), dejando registro de auditoría con `es_registro_manual = true` y `motivo_contingencia`.
3. **Extracto Mensual Tipo Extracto Bancario:** Vista ejecutiva que detalla fecha, día, hora de ingreso, hora de salida, minutos acumulados, sede, bloque y saldo acumulado respecto a la meta de 36 horas.

---

### 3.6. Acciones de Servicio y Eventos con Cambio Dinámico de Lugar

#### Capturas de Pantalla
![Modal de Cambio Dinámico de Lugar de Evento](capturas/web/admin_eventos_cambiar_lugar.png)
![Acciones de Servicio y Eventos Institucionales](capturas/web/admin/07-eventos/01_acciones_servicio_y_eventos.png)
![Modal de Cambio de Lugar de Evento con Justificación](capturas/web/admin/07-eventos/02_modal_cambiar_lugar_evento.png)

#### Propósito y Trazabilidad
1. **Cambio Dinámico de Sede de Evento:** Permite al Administrador General modificar la sede o punto de encuentro de una reunión de viernes en tiempo real (ej. traslado de Oficina Central a Auditorio Regional El Alto por mantenimiento).
2. **Campos de Trazabilidad:** Almacena en la base de datos `lugar_cambiado_manualmente = true` y el `motivo_cambio_lugar` detallado para auditoría institucional.
3. **Actualización Satelital Instantánea:** Al cambiar el lugar, el radio de la geocerca se actualiza automáticamente para todos los becarios y supervisores conectados.

---

### 3.7. Auditoría de Pasajes y Gestión Oficial de Tarifas (`BKL-09`)

#### Capturas de Pantalla
![Auditoría de Pasajes Web](capturas/web/admin_pasajes.png)
![Auditoría Financiera de Pasajes al 80%](capturas/web/admin/08-pasajes/01_auditoria_pasajes_80.png)
![Detalle de Calles, Avenidas y Tramos](capturas/web/admin/08-pasajes/02_detalle_calles_y_tramos.png)
![Módulo de Gestión Oficial de Tarifas de Transporte](capturas/web/admin/08-pasajes/03_gestion_tarifas_oficiales.png)

#### Detalle Exhaustivo del Requerimiento BKL-09
El requerimiento **BKL-09** implementó la gestión centralizada y sincronización en tiempo real de tarifas oficiales de transporte:
1. **Endpoints de Tarifas en Backend NestJS:**
   - `GET /api/pasajes/tarifas`: Consulta el catálogo oficial activo ordenado por tipo de transporte.
   - `POST /api/pasajes/tarifas`: Creación de nueva tarifa oficial autorizada.
   - `PUT /api/pasajes/tarifas/:id`: Actualización de costo en Bolivianos (Bs) y descripción de tramo.
   - `DELETE /api/pasajes/tarifas/:id`: Desactivación lógica de tarifas obsoletas.
2. **Sincronización Bidireccional Web ↔ Móvil:**
   - Se eliminaron las constantes estáticas `TARIFAS_PREDEFINIDAS` en móvil y `OPCIONES_TARIFAS_LOCALES` / `TARIFAS_FALLBACK` en web.
   - Cuando el Administrador actualiza una tarifa en este módulo (por ejemplo, Minibús Interciudad de Bs 2.60 a Bs 3.00), tanto la pantalla de declaración web como el selector dinámico en la app móvil reflejan el nuevo precio inmediatamente.
3. **Cálculo Determinista del 80%:**
   - Cada tramo declarado multiplica la tarifa oficial por el 80% reglamentario en centavos exactos (`monto_solicitado * 0.80`), garantizando que la Fundación desembolse la proporción exacta estipulada por el reglamento.

---

### 3.8. Bandeja Centralizada de Justificaciones con Flujo de 2 Pasos

#### Capturas de Pantalla
![Bandeja de Justificaciones con Flujo de 2 Pasos](capturas/web/admin_justificaciones_flujo_2_pasos.png)
![Bandeja Centralizada de Justificaciones en 2 Pasos](capturas/web/admin/09-justificaciones/01_bandeja_justificaciones_2_pasos.png)
![Modal de Registro de Permiso Institucional Web](capturas/web/admin/09-justificaciones/02_modal_registrar_permiso_web.png)

#### Propósito y Componentes
Bandeja de resolución disciplinaria de permisos y ausencias:
1. **Flujo Institucional de 2 Pasos:**
   - **Paso 1:** Evaluación y dictamen preliminar motivado por el Supervisor Institucional (`PENDIENTE_ADMINISTRACION`).
   - **Paso 2:** Resolución y homologación definitiva por el Administrador General (`APROBADA` o `RECHAZADA`).
2. **Exención Automática de Multas de Viernes:** Al homologar una justificación de inasistencia o retraso de viernes como aprobada, el sistema exime automáticamente la multa asociada de Bs 10/min (`multa_eximida = true`, `monto_cobrado = 0.00`), garantizando justicia administrativa.

---

### 3.9. Control de Refrigerios, Sorteo de Duplas y Rendición (`BKL-03`)

#### Capturas de Pantalla
![Control de Refrigerios Web](capturas/web/admin_refrigerios.png)
![Modal de Sorteo de Dupla de Refrigerios](capturas/web/admin_refrigerios_sorteo_dupla.png)
![Tabla Oficial de Control de Refrigerios de Viernes](capturas/web/admin/10-refrigerios/01_control_refrigerios_tabla.png)
![Modal de Registro de Raciones de Refrigerio Homologado](capturas/web/admin/10-refrigerios/02_modal_registrar_raciones_refrigerio.png)

#### Detalle Exhaustivo del Requerimiento BKL-03
El requerimiento **BKL-03** rediseñó la logística y contabilidad de refrigerios de las reuniones de viernes:
1. **Sorteo de Duplas Equitativo:**
   - Se asignan aleatoriamente 2 becarios encargados por cada viernes formativo (`becario_encargado_1_id` y `becario_encargado_2_id`), garantizando que toda la nómina participe en el servicio comunitario.
2. **Cálculo de Raciones y Presupuesto Oficial:**
   - Cuota fija oficial de **Bs 5.00 por persona**.
   - Para una asistencia promedio de 23 becarios: `23 raciones × Bs 5.00 = Bs 115.00`.
   - El modal de registro de raciones calcula automáticamente el presupuesto recíproco al variar la cantidad de raciones o el costo unitario.
3. **Rendición del 100% y Registro de Receptor Único:**
   - Tras la jornada, la dupla presenta sus notas de compra y boletas.
   - El sistema registra la rendición del 100% de los fondos y asienta de manera unívoca a cuál de los dos becarios de la dupla se le entregó el reembolso (`becario_receptor_devolucion_id`).
4. **Firmas y Confirmación de Recojo Individual:**
   - Cada becario que recibe su refrigerio confirma el recojo en su app móvil o firma la planilla, quedando registrado en la base de datos `recojo_confirmado = true` con su marca temporal.

---

### 3.10. Matriz de Evaluación 360°, Tabla Operativa F-03 de Solo Lectura y Classroom (`BKL-06`)

#### Capturas de Pantalla
![Matriz General de Evaluaciones Semestrales](capturas/web/admin_evaluaciones.png)
![Matriz General de Evaluaciones 360](capturas/web/admin/11-evaluaciones/01_matriz_evaluaciones_360.png)
![Tabla Operativa F-03 y Modal Solo Lectura Becario 1](capturas/web/admin/11-evaluaciones/02_tabla_operativa_f03_y_modal_solo_lectura_becario1.png)
![Modal F-03 Solo Lectura Becario 2 con Respuestas Distintas](capturas/web/admin/11-evaluaciones/03_modal_f03_solo_lectura_becario2_respuestas_distintas.png)
![Classroom de Escuela de Líderes Módulo 4](capturas/web/admin/11-evaluaciones/04_classroom_escuela_lideres.png)
![Cuestionario de Bienestar Universitario 26 Preguntas](capturas/web/admin/11-evaluaciones/05_cuestionario_bienestar_26p.png)
![Sábana Consolidada Semestral y Generador de Actas](capturas/web/admin/11-evaluaciones/06_sabana_consolidado_semestral.png)

#### Detalle Exhaustivo del Requerimiento BKL-06
El requerimiento **BKL-06** resolvió la visualización individualizada y la protección del **Formulario Pastoral F-03**:
1. **Tabla Operativa de Evaluación Ministerial F-03 por Becario:**
   - Lista a los becarios con su estado pastoral: `Pendiente`, `En Evaluación` o `Evaluado`.
   - Botón interactivo `"Evaluar / Ver F-03"`.
2. **Modo de Solo Lectura (`solo_lectura={true}`):**
   - Cuando el formulario se abre para un becario cuyo dictamen ya fue registrado (`Evaluado`), todos los 13 campos quedan bloqueados con estilo disabled accesible y el botón de guardado se oculta por completo, impidiendo alteraciones post-dictamen.
3. **13 Preguntas Oficializadas con Respuestas Reales por Becario:**
   - El sistema carga mediante `GET /api/evaluaciones/f03/:becario_id` las respuestas eclesiásticas almacenadas en PostgreSQL para el estudiante específico.
   - Se verifica rigurosamente que las respuestas del **Becario 1** (ej. Nilda Churata) difieran de las del **Becario 2** (ej. David Mamani), demostrando que no existen respuestas hardcodeadas ni compartidas.
4. **Ponderación de los 5 Módulos en Matriz 360°:**
   - **Módulo 1 (20%):** Formulario Pastoral F-03 con las 13 dimensiones eclesiásticas.
   - **Módulo 2 (20%):** Cuestionario de Bienestar de 26 preguntas con semaforización clínica.
   - **Módulo 3 (20%):** Evaluación de prácticas por el supervisor validada con **Código OTP de 6 dígitos**.
   - **Módulo 4 (20%):** Escuela de Líderes en formato Classroom con control de evidencias.
   - **Módulo 5 (20%):** Rendimiento universitario con carga de Récord e Historial Académico.
5. **Flujo de Revisión y Convalidación Administrativa del Formulario F-03:**
   - **Fase 1 (Llenado y Envío Pastoral):** El Becario y/o su Pastor local completan las 13 dimensiones eclesiásticas (incluyendo preguntas cerradas con selector y preguntas abiertas de testimonio y liderazgo comunitario) y envían el formulario. El registro ingresa al sistema con estado **`"En Revisión (Por Convalidar)"`**.
   - **Fase 2 (Apertura en Modo Revisión Administrativa):** El Administrador o Supervisor abre el modal mediante el botón interactivo de la tabla, activando el **`"Modo Revisión Administrativa · Respuestas del Becario Protegidas"`** (`modo_revision_admin={true}`).
   - **Fase 3 (Inmutabilidad de Respuestas del Becario):** Las 13 respuestas cuantitativas y cualitativas permanecen **100% bloqueadas e inmutables** con estilos de solo lectura accesibles para evitar alteraciones en lo declarado por el pastor o becario.
   - **Fase 4 (Asignación de Calificación y Convalidación):** El Administrador examina las respuestas abiertas, asigna o ajusta el puntaje oficial en el campo **`Calificación Pastoral Asignada (Módulo 1)` (`/ 20 pts`)**, y presiona el botón **`"Convalidar y Guardar Calificación F-03"`** (disponible junto a `"Exportar PDF"`). Tras la confirmación, el estado del becario se actualiza automáticamente a **`"Convalidado / Evaluado"`**, consolidando la nota en la Matriz Semestral 360°.
6. **Sábana Consolidada Semestral:**
   - Generación de Actas Oficiales en PDF de 2 páginas con dictamen automático (*Aprobado con Excelencia*, *Aprobado*, *Condicional*, *Suspendido*).

---

### 3.11. Reportes Oficiales PDF, Centro de Notificaciones y Perfil de Administrador

#### Capturas de Pantalla
![Visor de Reportes Oficiales en PDF](capturas/web/admin_reportes.png)
![Visor de Reportes Oficiales PDF con Rango de Fechas](capturas/web/admin/12-reportes-notificaciones-perfil/01_visor_reportes_pdf.png)
![Centro Corporativo de Notificaciones](capturas/web/admin/12-reportes-notificaciones-perfil/02_centro_notificaciones.png)
![Mi Perfil - Datos Personales del Administrador](capturas/web/admin/12-reportes-notificaciones-perfil/03_mi_perfil_datos.png)
![Mi Perfil - Gestión de Correos de Acceso](capturas/web/admin/12-reportes-notificaciones-perfil/04_mi_perfil_correos.png)
![Mi Perfil - Seguridad y Cambio de Contraseña](capturas/web/admin/12-reportes-notificaciones-perfil/05_mi_perfil_seguridad_w_full.png)
![Página Oficial Acerca de Nosotros Diaconía](capturas/web/admin/12-reportes-notificaciones-perfil/06_acerca_de_nosotros_web.png)
![Acerca de Nosotros con Logos Oficiales en Alto Contraste](capturas/web/admin/12-reportes-notificaciones-perfil/04_acerca_de_nosotros_logos_visibles.png)

#### Propósito y Componentes
1. **Visor de Reportes PDF:** Emisión de planillas oficiales con selector de rango de fechas de corte (`GET /api/reportes/liquidaciones/pdf`).
2. **Centro de Notificaciones:** Notificaciones categorizadas por justificaciones, multas y alertas operativas.
3. **Mi Perfil Completo:** Autogestión de datos, correos secundarios y seguridad de credenciales institucionales.
4. **Acerca de Nosotros con Logos Oficiales en Alto Contraste:** Reseña histórica, misión, visión y principios diaconales de la Fundación Diaconía FRIF-IFD. Incorpora renderizado optimizado de los emblemas institucionales (`LOGO-BUMAND-2_2023.svg` sobre contenedor en degradado azul Diaconía y `logo-diaconia-color.svg` sobre cápsula blanca con sombra e iluminación perimetral), asegurando máxima nitidez, contraste y jerarquía de marca.

---

## 4. Rol: Supervisor Institucional (`angel.ali@bumand.bo`)

El Supervisor Institucional ejerce la tutela de su cohorte asignada, acompañando pastoralmente a los estudiantes y fiscalizando sus prácticas preprofesionales.

---

### 4.1. Panel de Supervisión Operativo

#### Capturas de Pantalla
![Panel Operativo del Supervisor Web](capturas/web/supervisor_panel.png)
![Panel de Supervisión con Métricas de Cohorte](capturas/web/supervisor/01-panel/01_supervisor_panel_operativo.png)

#### Propósito y Métricas Visibles
El **Panel del Supervisor** expone las métricas exclusivas de los becarios bajo su tutela:
- Total de becarios asignados a su supervisión directa.
- Becarios con meta de 36 horas de práctica completada.
- Tramos de pasajes pendientes de revisión de cohorte.
- Citas de seguimiento pastoral y académico programadas para la semana.

---

### 4.2. Directorio de Becarios Asignados a Supervisión

#### Capturas de Pantalla
![Directorio de Becarios Asignados al Supervisor](capturas/web/supervisor_becarios.png)
![Directorio de Cohorte de Becarios Asignados](capturas/web/supervisor/02-becarios/01_supervisor_directorio_cohorte.png)

#### Propósito y Blindaje RBAC
Permite consultar las fichas de los estudiantes bajo su cohorte, visualizar sus horarios de apoyo y verificar su progreso hacia la meta mensual de 36 horas. El supervisor tiene restringida la reasignación de universidades o congregaciones (bloqueo RBAC).

---

### 4.3. Supervisión, Aprobación y Observación de Pasajes (80%)

#### Capturas de Pantalla
![Supervisión y Aprobación de Pasajes](capturas/web/supervisor_pasajes_aprobacion.png)
![Auditoría de Pasajes de Supervisados al 80%](capturas/web/supervisor/03-pasajes/01_supervisor_aprobacion_pasajes_80.png)

#### Auditoría Técnica del Reembolso Exacto al 80%
El supervisor audita el itinerario declarado por cada becario asignado, revisa las avenidas transitadas y dictamina su aprobación formal o solicita rectificación de tramos.

---

### 4.4. Matriz de Evaluación 360° Semestral con Validación OTP de 6 Dígitos en Módulo 3

#### Capturas de Pantalla
![Evaluación del Supervisor en Matriz 360](capturas/web/supervisor_evaluaciones.png)
![Modal de Validación OTP en Módulo 3](capturas/web/supervisor_evaluacion_modulo3_otp.png)
![Matriz de Calificaciones Semestrales del Supervisor](capturas/web/supervisor/04-evaluaciones/01_supervisor_matriz_evaluaciones.png)
![Modal de Convalidación con Código OTP de 6 Dígitos](capturas/web/supervisor/04-evaluaciones/02_supervisor_modulo3_validacion_otp.png)

#### Flujo Institucional OTP
1. **Calificación del Módulo 3 (Desempeño y Prácticas):** El supervisor evalúa el compromiso, puntualidad, ética cristiana y liderazgo del estudiante sobre una ponderación máxima del 20%.
2. **Erradicación de Firma Digital Canvas:** Se eliminó por completo el componente obsoleto de dibujo manual con puntero en HTML5 Canvas.
3. **Validación Mediante Código OTP Institucional:** Para sellar formalmente la calificación, el supervisor ingresa un **código OTP de 6 dígitos** de confirmación segura, el cual valida su identidad institucional y estampa un sello de convalidación inmutable en la base de datos.

---

### 4.5. Seguimiento y Citas a Supervisados

#### Capturas de Pantalla
![Página de Seguimiento y Citas del Supervisor](capturas/web/supervisor_seguimiento_citas.png)
![Modal Dar Cita a Supervisado](capturas/web/supervisor_modal_dar_cita.png)
![Bandeja de Citas y Mentoría Pastoral del Supervisor](capturas/web/supervisor/05-seguimiento-citas/01_supervisor_seguimiento_citas.png)
![Modal de Programación de Cita con Becario](capturas/web/supervisor/05-seguimiento-citas/02_supervisor_modal_dar_cita.png)

#### Propósito y Componentes
Módulo exclusivo de mentoría personalizada entre supervisor y becario:
1. **Cohorte de Supervisados:** Lista de becarios tutelados con botón directo **"Dar Cita"**.
2. **Modal Dar Cita a Supervisado:**
   - Selección de fecha, hora y modalidad de la sesión (Presencial en Oficina Diaconía o Virtual).
   - Definición del objetivo de la cita: *Seguimiento Académico*, *Acompañamiento Espiritual / Pastoral*, *Revisión de Prácticas y Horas* o *Situación Personal*.
   - Espacio para glosa y notas preparatorias.
3. **Registro de Acuerdos y Compromisos:** Permite registrar los acuerdos alcanzados durante la sesión de mentoría y calificar el nivel de cumplimiento del becario.

---

### 4.6. Matriz de Capacidades vs. Restricciones Estrictas de Rol

| Módulo / Acción | Capacidades Permitidas al Supervisor | Restricciones Estrictas (Bloqueo RBAC) |
| :--- | :--- | :--- |
| **Directorio** | Consultar datos de contacto y avance de sus becarios. | **PROHIBIDO:** No puede modificar carreras, sedes ni reasignar tutores. |
| **Pasajes (80%)** | Aprobar u observar tramos de recorridos de sus supervisados. | **PROHIBIDO:** No puede autorizar desembolsos financieros finales. |
| **Evaluaciones** | Calificar Módulo 3 con convalidación OTP de 6 dígitos. | **PROHIBIDO:** No puede abrir nuevos semestres ni alterar ponderaciones de módulos. |
| **Citas y Seguimiento**| Agendar citas, convocar sesiones y registrar compromisos. | **PROHIBIDO:** No puede agendar citas a becarios que pertenezcan a otros supervisores. |
| **Usuarios y Claves** | Gestionar su propia cuenta en Mi Perfil. | **PROHIBIDO:** No puede ver ni restablecer contraseñas de otros usuarios. |

---

## 5. Rol: Becario Universitario (`nilda.churata@bumand.bo`)

El Becario Universitario es el beneficiario activo del programa formativo de la Fundación Diaconía FRIF-IFD.

---

### 5.1. Mi Panel Operativo & Radar de Geocerca

#### Capturas de Pantalla
![Panel Operativo y Radar de Geocerca del Becario](capturas/web/becario_radar_geocerca.png)
![Radar de Geocerca Satelital del Becario](capturas/web/becario/01-panel-radar/01_becario_radar_geocerca.png)

#### Propósito y Componentes
- **Visualizador Satelital:** Radar interactivo que calcula la distancia euclidiana y geodésica a la sede de práctica asignada mediante Haversine.
- **Estado de Geocerca:** Indicador en tiempo real (*Dentro del radio de práctica* en verde esmeralda / *Fuera del perímetro* en rojo ámbar).
- **Contador de Horas Acumuladas:** Progreso respecto a la meta oficial de 36 horas mensuales.

---

### 5.2. Marcación de Horas de Práctica y Extracto Mensual

#### Capturas de Pantalla
![Marcación de Asistencia del Becario](capturas/web/becario_marcacion_asistencia.png)
![Marcación de Asistencia con Detección de Bloque](capturas/web/becario/02-asistencia/01_becario_marcacion_asistencia.png)
![Extracto Mensual Bancario del Becario](capturas/web/becario/02-asistencia/02_becario_extracto_mensual.png)

#### Propósito y Reglas
- Botón satelital de **Marcar Ingreso** y **Marcar Salida** con detección de bloque edilicio.
- Extracto mensual en formato bancario donde el estudiante audita sus marcaciones y saldo de horas.

---

### 5.3. Declaración de Recorrido de Pasajes con Tarifas Reales (`BKL-09`)

#### Capturas de Pantalla
![Declaración de Recorridos de Pasajes del Becario](capturas/web/becario_declaracion_pasajes.png)
![Declaración de Pasajes del Becario con Tarifas Dinámicas](capturas/web/becario/03-pasajes/01_becario_declaracion_pasajes_tarifas_reales.png)

#### Propósito y Modalidad Dinámica
- El becario selecciona su punto de origen y destino, eligiendo tramos de transporte cuyas tarifas se leen en tiempo real de `GET /api/pasajes/tarifas`.
- Respeta la modalidad asignada administrativamente (**Solo Ida** o **Ida y Vuelta** según `BKL-05`).
- El cálculo del 80% reglamentario se realiza en el cliente y se valida estrictamente en el backend.

---

### 5.4. Formulario Pastoral F-03, Carga de Notas y Cuestionario de Bienestar

#### Capturas de Pantalla
![Formulario Pastoral F-03 del Becario](capturas/web/becario_formulario_f03.png)
![Formulario F-03 Eclesiástico del Becario](capturas/web/becario/04-evaluaciones/01_becario_formulario_f03.png)
![Carga de Notas e Historial Semestral](capturas/web/becario_evaluacion_academica_semestral.png)
![Carga de Notas, Récord e Historial Académico](capturas/web/becario/04-evaluaciones/02_becario_carga_notas_record_historial.png)
![Evaluación Socioeconómica del Becario](capturas/web/becario_pagina_socioeconomica_26p.png)
![Cuestionario de Bienestar Universitario 26 Preguntas](capturas/web/becario/04-evaluaciones/03_becario_evaluacion_socioeconomica_26p.png)

#### Módulos de Evaluación del Becario:
1. **Formulario Pastoral F-03:** Diligenciamiento de las 13 dimensiones eclesiásticas (testimonio, servicio ministerial, diezmos/ofrendas, vida devocional y recomendación pastoral).
2. **Carga de Notas y Certificados:** Registro de notas semestrales y subida de archivos de Récord Académico e Historial Académico en formato PDF/imagen.
3. **Cuestionario de 26 Preguntas:** Evaluación multidimensional de bienestar socioeconómico.

---

### 5.5. Mis Citas, Mis Refrigerios y Mis Justificaciones

#### Capturas de Pantalla
![Mis Citas de Seguimiento](capturas/web/becario_seguimiento_mis_citas.png)
![Mis Citas de Mentoría con el Supervisor](capturas/web/becario/05-citas-refrigerios-permisos/01_becario_seguimiento_mis_citas.png)
![Mis Refrigerios y Confirmación de Recojo](capturas/web/becario/05-citas-refrigerios-permisos/02_becario_mis_refrigerios.png)
![Mis Justificaciones y Estado del Trámite en 2 Pasos](capturas/web/becario/05-citas-refrigerios-permisos/03_becario_mis_justificaciones.png)

#### Propósito Operativo:
- **Mis Citas:** Calendario de citas concertadas con el tutor y registro de compromisos.
- **Mis Refrigerios:** Información de la dupla responsable del viernes y botón de confirmación de recojo de ración.
- **Mis Justificaciones:** Historial de solicitudes presentadas con visibilidad de dictamen del supervisor y homologación final del administrador.

---

## 6. Erradicación Total de Datos Simulados y Conexión 100% a PostgreSQL (`BKL-10`)

En cumplimiento inflexible del requerimiento **BKL-10**, se realizó una auditoría y refactorización integral del código fuente para garantizar que la plataforma web no contenga datos ficticios:

1. **Backend NestJS en Puerto 3002:**
   - Todas las llamadas `fetch` y `axios` apuntan a `http://localhost:3002/api`.
   - Se erradicaron generadores estáticos (`generarMovimientosDeterministicos`, arrays locales y timeouts simulados).
2. **Frontend Web Next.js:**
   - Se removieron `REGISTROS_REFRIGERIOS_INICIALES`, `JUSTIFICACIONES_MOCK` y `OPCIONES_TARIFAS_LOCALES`.
   - Toda tabla o selector consume los endpoints REST canónicos (`/api/becarios`, `/api/pasajes/tarifas`, `/api/refrigerios`, `/api/justificaciones`, `/api/evaluaciones`).
3. **Persistencia Garantizada:**
   - Cualquier cambio realizado en la web (creación de tarifas, cambio de modalidad de pasajes, evaluación F-03, registro de raciones) impacta directamente en las tablas correspondientes de PostgreSQL (`tarifas_transporte`, `becarios`, `evaluaciones_f03`, `refrigerios`, `justificaciones`).

---

## 7. Suite de Micro-Animaciones y Componentes Cult UI / Watermelon UI / Skipper UI

La plataforma web implementa componentes de diseño de vanguardia (**High-Craft UI**) adaptados a la paleta institucional de Diaconía:
1. **`BotonRebote` (Watermelon UI):** Botones con física elástica de resorte (`spring`) y feedback visual en acciones principales.
2. **`ContadorAnimado` (Watermelon UI):** Transición fluida de cifras numéricas para horas acumuladas, multas acumuladas y liquidación de viáticos.
3. **`BordeBrillante` (Cult UI):** Tarjetas con resplandor cinemático sutil para destacar la meta de 36 horas cumplida y becarios sorteados en refrigerios.
4. **`DialogoConfirmacion` (Skipper UI):** Diálogos modales con difuminado de fondo (`backdrop-blur`) y transiciones físicas de apertura y cierre.

---

## 8. Arquitectura de Diálogos de Confirmación y Erradicación de `alert()` / `confirm()` Nativos

### 8.1. Directriz Inflexible: Cero Diálogos Nativos de Navegador

Queda estrictamente prohibido el uso de `window.alert()`, `window.confirm()` o `window.prompt()`. Todas las interacciones críticas de confirmación se canalizan mediante diálogos institucionales accesibles:

#### Capturas de Pantalla
![Diálogo de Confirmación de Cierre sin Guardar](capturas/web/admin_dialogo_confirmacion_cierre.png)
![Diálogo de Confirmación de Eliminación](capturas/web/admin_dialogo_confirmacion_eliminar.png)

### 8.2. Hooks Estandarizados:
- **`useFormularioValidado`:** Controla el estado del formulario, la validación con Zod y detecta si existen cambios pendientes de guardar (`hay_cambios`), activando el diálogo de confirmación antes de permitir el cierre del modal.
- **`useConfirmacionDialogo`:** Expone métodos declarativos (`confirmarCierreSinCompletar`, `confirmarEliminacionRegistro`, `confirmarAccionInstitucional`) garantizando consistencia visual y accesibilidad en toda la plataforma.

---

## 9. Resumen de Seguridad, Validaciones Técnicas y Cumplimiento

1. **Tokens Criptográficos JWT:** Transmisión de credenciales mediante cabeceras `Authorization: Bearer <token>` con expiración determinista y firma asimétrica en el backend.
2. **Validación Satelital Anti-Spoofing:** Comprobación estricta de velocidad de desplazamiento, precisión geométrica del sensor GPS y algoritmo Haversine.
3. **Validación OTP Institucional:** Sustitución definitiva de firmas canvas por códigos OTP verificables de 6 dígitos para la convalidación de actas y calificaciones.
4. **Inmutabilidad de Registros:** Planillas de pasajes y calificaciones cerradas no pueden ser alteradas unilateralmente.

---
*Fin de la Documentación Técnica de la Plataforma Web BUMAND 2026*


<div class="salto-pagina"></div>

# PARTE II: APLICACIÓN MÓVIL POR PANTALLAS

# Documentación Técnica Exhaustiva de la Aplicación Móvil BUMAND por Pantallas

**Sistema Móvil para el Becario Universitario: Asistencia Satelital, Viáticos, Refrigerios y Formación Integral**  
*Fundación Diaconía FRIF-IFD — Gestión Institucional 2026*  
*Versión de Producción Homologada con PostgreSQL y API NestJS (Puerto 3002)*

---

## 1. Resumen Ejecutivo y Arquitectura del Sistema Móvil

La aplicación móvil de **BUMAND** (`bumand-movil`) ha sido concebida y construida como el instrumento tecnológico de campo para los **61 becarios universitarios** de la **Fundación Diaconía FRIF-IFD**. Implementada bajo el framework **Flutter 3.x** y el lenguaje de programación **Dart 3.x**, su arquitectura interna adopta estrictamente los principios de **Arquitectura Limpia (Clean Architecture)** complementada con el patrón de inyección de dependencias y gestión reactiva de estado **Riverpod 2.x**.

El sistema móvil ha superado las más rigurosas auditorías de calidad técnica y robustez empresarial, alcanzando **0 issues** en el análisis estático (`flutter analyze`) y certificando el **100% de éxito en sus 138 pruebas automatizadas** (`flutter test`), abarcando pruebas de dominio, modelos, repositorios, controladores y widgets.

En estricta correspondencia con los requerimientos **BKL-01 a BKL-10**, la aplicación móvil está **100% conectada a la base de datos PostgreSQL** a través del backend NestJS oficial (`http://localhost:3002/api`), habiéndose erradicado totalmente todo dato simulado o fallback estático en memoria (`BKL-10`).

---

### 1.1. Matriz Integral de Pantallas y Subcarpetas de Documentación

| Subcarpeta Documental | Pantalla / Widget Canónico | Archivo Fuente Canónico | Requerimiento BKL Clave | Propósito Operativo Principal |
| :--- | :--- | :--- | :---: | :--- |
| **`01-autenticacion`** | `InicioSesionPantalla` | `lib/modulos/autenticacion/pantallas/inicio-sesion-pantalla.dart` | `BKL-10` | Inicio de sesión seguro con JWT, selector de correos alternativos y conmutador de visibilidad de clave. |
| **`01-autenticacion`** | `RegistroPantalla` | `lib/modulos/autenticacion/pantallas/registro-pantalla.dart` | `BKL-10` | Registro de nuevos postulantes con validación de CI y congregación. |
| **`01-autenticacion`** | `ConfirmarDatosPantalla` | `lib/modulos/asistencia/pantallas/confirmar-datos-pantalla.dart` | `BKL-10` | Ficha del becario protegida con ciclo automático mensual y candado en datos académicos. |
| **`02-menu-principal-y-perfil-modal`** | `PantallaInicio` / `InicioPantalla` | `lib/modulos/inicio/pantallas/inicio-pantalla.dart` | `BKL-02`, `BKL-04` | Menú principal limpio y unificación de perfil en BottomSheet superior derecho. |
| **`03-asistencia`** | `AsistenciaPantalla` | `lib/modulos/asistencia/pantallas/asistencia-pantalla.dart` | `BKL-10` | Radar de geocerca Haversine, meta de 36 horas mensuales y marcación en 11 sedes autorizadas. |
| **`04-pasajes`** | `PasajesPantalla` | `lib/modulos/pasajes/pantallas/pasajes-pantalla.dart` | `BKL-09` | Resumen mensual de transporte, regla del día 24 y cómputo determinista del 80%. |
| **`04-pasajes`** | `DeclararRecorridoPantalla` | `lib/modulos/pasajes/pantallas/declarar-recorrido-pantalla.dart` | `BKL-01`, `BKL-09`, `BKL-12` | Selector segmentado de 3 actividades (Prácticas, Escuela de Líderes, Acciones de Servicio), tarifas dinámicas PostgreSQL y acceso directo a Refrigerios. |
| **`05-evaluaciones`** | `EvaluacionesPantalla` | `lib/modulos/evaluaciones/pantallas/evaluaciones-pantalla.dart` | `BKL-06` | Avance de los 5 módulos semestrales y Formulario F-03 en modo solo lectura con respuestas reales. |
| **`06-historial`** | `HistorialAsistenciaPantalla` | `lib/modulos/asistencia/pantallas/historial-asistencia-pantalla.dart` | `BKL-07` | Historial unificado en 4 pestañas: Asistencias (extracto bancario), Permisos, Pasajes y Multas. |
| **`07-permisos-justificaciones`** | `PermisosPantalla` | `lib/modulos/justificaciones/pantallas/permisos-pantalla.dart` | `BKL-08` | Formulario directo de radicación de permisos con FilePicker real (JPG, PNG, WEBP, PDF). |
| **`08-refrigerios`** | `RefrigeriosPantalla` | `lib/modulos/refrigerios/pantallas/refrigerios-pantalla.dart` | `BKL-03` | Mis Refrigerios con confirmación de recojo y modal completo de registro de raciones en APK. |
| **`09-seguimiento-y-notificaciones`**| `SeguimientoCitasPantalla` / `NotificacionesPantalla` | `lib/modulos/seguimiento/...` | `BKL-10` | Citas de mentoría pastoral y bandeja de notificaciones institucionales. |
| **`10-perfil-y-acerca-de`** | `MiPerfilSeguridadPantalla` / `AcercaDeNosotros` | `lib/modulos/perfil/...` | `BKL-04` | Gestión de contactos, correos alternativos, cambio de contraseña e identidad Diaconía. |

---

### 1.2. Guía de Instalación, Configuración y Encendido Móvil

#### 1. Requisitos Previos:
- **Flutter SDK:** 3.19.x o superior (`flutter --version`).
- **Android SDK:** API 34 (Android 14) o superior con Android Studio instalado.
- **Backend BUMAND:** NestJS operativo en el puerto oficial **`3002`** (`http://localhost:3002/api`).

#### 2. Configuración y Compilación:
```bash
# 1. Navegar al directorio móvil
cd bumand-movil

# 2. Descargar dependencias
flutter pub get

# 3. Auditoría de código limpio (0 issues garantizado)
flutter analyze

# 4. Ejecución de la suite completa de pruebas
flutter test

# 5. Generar paquete instalable APK para producción
flutter build apk --release
```

---

## 2. Módulo 01: Autenticación, Registro y Ficha Universitaria (`01-autenticacion`)

### 2.1. Pantalla 1: Inicio de Sesión (`InicioSesionPantalla`)

#### Capturas de Pantalla
![Inicio de Sesión Móvil Raíz](capturas/movil/01-inicio-sesion.png)
![Inicio de Sesión Móvil Detalle](capturas/movil/01-autenticacion/01_inicio_sesion.png)

#### Arquitectura y Funcionalidad:
1. **Identidad Institucional:** Logotipo oficial de Diaconía y contenedor reactivo con `SingleChildScrollView` que previene desbordamientos de teclado.
2. **Soporte Multicuenta y Correos Alternativos:** Permite autenticarse mediante el correo corporativo `@bumand.bo` o cualquier correo alternativo registrado (`correos_usuarios`).
3. **Conmutador de Visibilidad de Contraseña:** Botón interactivo de ojo (`Icons.visibility` / `Icons.visibility_off`) para alternar `obscureText`.
4. **Almacenamiento Seguro:** Persistencia criptográfica del token JWT en `FlutterSecureStorage`.

---

### 2.2. Pantalla 2: Registro de Cuenta de Becario (`RegistroPantalla`)

#### Capturas de Pantalla
![Registro de Cuenta Móvil Raíz](capturas/movil/02-registro.png)
![Registro de Cuenta Formulario de Alta](capturas/movil/01-autenticacion/02_registro_cuenta.png)

#### Arquitectura y Validaciones:
- Formulario de solicitud de admisión con validación sintáctica de Cédula de Identidad (CI), selección de iglesia evangélica de procedencia, número telefónico y contraseña con indicador de fortaleza.

---

### 2.3. Pantalla 5: Ficha Universitaria y Confirmación Mensual de Datos (`ConfirmarDatosPantalla`)

#### Capturas de Pantalla
![Confirmación de Datos Raíz](capturas/movil/05-confirmar-datos.png)
![Ficha Universitaria Post-Login](capturas/movil/01-autenticacion/03_confirmar_datos_post_login.png)

#### Ciclo Automático Mensual:
1. **Erradicación del Botón Manual:** Al iniciar un nuevo mes (`YYYY-MM`), la aplicación solicita al estudiante confirmar sus datos de contacto una sola vez, actualizando `ultimo_mes_datos_confirmados`.
2. **Candado Académico:** Los campos de Universidad y Carrera permanecen bloqueados para prevenir alteraciones unilaterales.

---

## 3. Módulo 02: Menú Principal Limpio y BottomSheet de Perfil (`02-menu-principal-y-perfil-modal`) (`BKL-02`, `BKL-04`)

### 3.1. Capturas de Pantalla

![Pantalla Principal Móvil Raíz](capturas/movil/03-pantalla-inicio.png)
![Menú Principal Limpio - Parte Superior](capturas/movil/02-menu-principal-y-perfil-modal/01_menu_principal_limpio.png)
![Menú Principal Limpio - Parte Inferior](capturas/movil/02-menu-principal-y-perfil-modal/02_menu_principal_parte_inferior_limpia.png)
![BottomSheet de Perfil Unificado Superior Derecho](capturas/movil/02-menu-principal-y-perfil-modal/03_bottomsheet_perfil_unificado.png)
![Modal de Versículo Bíblico Diario al Azar](capturas/movil/02-menu-principal-y-perfil-modal/04_modal_versiculo_diario_azar.png)

### 3.2. Detalle Exhaustivo del Requerimiento BKL-02: Retirada de Tarjeta Redundante
- **Problema previo:** En el Menú Principal existía una tarjeta de acceso directo a la `"Evaluación Socioeconómica (Cuestionario de Bienestar · 26 preguntas)"`, duplicando la navegación hacia las evaluaciones.
- **Solución implementada:** Se retiró dicha tarjeta de `inicio-pantalla.dart`. La evaluación socioeconómica ahora reside exclusivamente dentro del módulo estructurado de **"Evaluaciones" (Módulo 5)**, eliminando ruido visual en la pantalla inicial.

### 3.3. Detalle Exhaustivo del Requerimiento BKL-04: BottomSheet de Perfil Unificado
- **Problema previo:** El final del Menú Principal contenía tarjetas redundantes de `"Mi Perfil y Seguridad de Cuenta"`, `"Acerca de Nosotros"` y una tarjeta flotante inferior del usuario.
- **Solución implementada:**
  1. Se eliminaron todas esas tarjetas redundantes del cuerpo inferior del Menú Principal en `inicio-pantalla.dart`.
  2. Se centralizaron todas las acciones de cuenta dentro del **BottomSheet de Perfil** desplegable al tocar el avatar o botón de perfil en la esquina superior derecha (`_mostrarDialogoPerfil` en `barra-superior-bumand.dart`):
     - **Mi Perfil y Seguridad de Cuenta:** Modificación de datos y contraseña.
     - **Correos de Inicio de Sesión:** Gestión de correos alternativos vinculados.
     - **Acerca de Nosotros:** Misión, visión e historia de Diaconía.
     - **Cerrar sesión corporativa:** Cierre seguro de sesión con purga de credenciales en `FlutterSecureStorage`.
  3. Se retiró la opción redundante de "Mis Evaluaciones (360°)" del BottomSheet, ya que pertenece al menú de navegación principal.

---

## 4. Módulo 03: Asistencia Satelital y Tipos de Eventos (`03-asistencia`)

### 4.1. Capturas de Pantalla

![Pantalla de Asistencia Satelital Raíz](capturas/movil/04-asistencia.png)
![Asistencia a Prácticas Preprofesionales con Radar](capturas/movil/03-asistencia/01_asistencia_practicas_radar.png)
![Asistencia a Escuela de Líderes de los Viernes](capturas/movil/03-asistencia/02_asistencia_escuela_lideres_viernes.png)
![Asistencia a Acciones Comunitarias de Servicio](capturas/movil/03-asistencia/03_asistencia_acciones_servicio.png)

### 4.2. Geocercas, Meta de 36 Horas y Categorías de Asistencia
1. **Radar Geodésico Haversine:** Mapeo de precisión sobre las 11 agencias de Diaconía con detección de sub-bloques edilicios.
2. **Meta Oficial de 36 Horas Mensuales:** Barra de progreso calibrada a 36 horas (9 horas semanales flexibles), con indicador visual de horas cumplidas y soporte para horas superadas (`> 36 h`).
3. **Soporte de Tres Modalidades de Marcación:**
   - **Prácticas Preprofesionales:** Marcación en agencias autorizadas con control de entrada y salida.
   - **Escuela de Líderes (Viernes):** Eventos formativos de asistencia obligatoria con cálculo de puntualidad.
   - **Acciones de Servicio:** Jornadas de apoyo pastoral y comunitario.

---

## 5. Módulo 04: Pasajes y Viáticos (80%) y Tarifas Dinámicas (`04-pasajes`) (`BKL-01`, `BKL-09`)

### 5.1. Capturas de Pantalla

![Pantalla de Resumen de Pasajes Raíz](capturas/movil/06-pasajes.png)
![Pantalla de Declaración de Recorrido Raíz](capturas/movil/07-declarar-recorrido.png)
![Declaración de Recorrido Escuela de Líderes - Tramo Ida](capturas/movil/04-pasajes/01_declarar_recorrido_escuela_lideres_ida.png)
![Selector de Tarifas Dinámicas desde Backend PostgreSQL](capturas/movil/04-pasajes/02_selector_tarifas_dinamicas_backend.png)
![Declaración de Tramo Vuelta y Cómputo del 80%](capturas/movil/04-pasajes/03_declarar_recorrido_vuelta_y_calculo_80.png)

### 5.2. Detalle Exhaustivo del Requerimiento BKL-01 y BKL-12: Selector de 3 Actividades, Botón Directo a Refrigerios y Menú Limpio
- **Problema previo:** En `declarar-recorrido-pantalla.dart` existía un botón secundario redundante `"Ver historial mensual de pasajes"` debajo del botón principal `"Guardar recorrido de hoy"`, y no existía selector ágil de actividades ni vínculo directo con el módulo de refrigerios formativos.
- **Solución implementada:**
  1. Se eliminó de raíz el botón redundante de historial tanto en `declarar-recorrido-pantalla.dart` como en `asistencia-pantalla.dart`. El historial se consulta exclusivamente desde el módulo centralizado de historiales.
  2. Se incorporó un selector horizontal segmentado interactivo de 3 botones (`Prácticas` | `Escuela de Líderes` | `Acciones de Servicio`) en cápsula blanca con bordes redondeados, adaptando la modalidad reglamentaria (Solo Ida / Ida y Vuelta).
  3. Se añadió al pie de la pantalla, condicional a la actividad `"Escuela de Líderes"`, el botón de acceso directo `"Refrigerios de Escuela de Líderes (Confirmar recojo / Rendir)"` para agilizar la rendición y confirmación de raciones de la dupla encargada.

### 5.3. Detalle Exhaustivo del Requerimiento BKL-09: Tarifas Dinámicas desde PostgreSQL
- **Problema previo:** La app móvil contenía un listado hardcodeado `TARIFAS_PREDEFINIDAS` que impedía reflejar cambios tarifarios decretados por el transporte público.
- **Solución implementada:**
  1. Se eliminó completamente la constante estática `TARIFAS_PREDEFINIDAS`.
  2. La app móvil consume en tiempo real el endpoint `GET http://localhost:3002/api/pasajes/tarifas` mediante `PasajesRepositorio` y Riverpod.
  3. El dropdown de medios de transporte (Minibús Corto Bs 1.50, Tramo Largo Bs 2.00, Interciudad Bs 2.60, Teleférico Bs 3.00, Trufi Bs 3.50) se puebla dinámicamente con los registros vivos de la tabla `tarifas_transporte`.
  4. La modalidad asignada administrativamente (**Solo Ida** o **Ida y Vuelta** según `BKL-05`) habilita o bloquea el tramo de retorno de manera instantánea.
  5. El cómputo del reembolso se calcula al **80% reglamentario en centavos exactos**.

---

## 6. Módulo 05: Evaluaciones 360°, Formulario F-03 Read-Only y Classroom (`05-evaluaciones`) (`BKL-06`)

### 6.1. Capturas de Pantalla

![Pantalla de Evaluaciones Raíz](capturas/movil/08-evaluaciones-socioeconomica.png)
![Cuestionario Socioeconómico 26 Preguntas Raíz](capturas/movil/10-evaluacion-socioeconomica-26p.png)
![Cuestionario de Bienestar Socioeconómico](capturas/movil/10-evaluacion-socioeconomica.png)
![Classroom Escuela de Líderes Raíz](capturas/movil/15-escuela-lideres-classroom.png)
![Matriz Móvil de los 5 Módulos de Evaluación 360](capturas/movil/05-evaluaciones/01_evaluaciones_5_modulos.png)
![Módulo 1: Formulario F-03 Pastoral en Modo Solo Lectura](capturas/movil/05-evaluaciones/02_modulo1_formulario_f03_pastoral.png)
![Módulo 2: Carga y Subida de Récord Académico Oficial](capturas/movil/05-evaluaciones/03_modulo2_subida_record_academico.png)
![Módulo 3: Código QR para Evaluación Institucional del Mentor](capturas/movil/05-evaluaciones/04_modulo3_qr_evaluacion_mentor.png)
![Módulo 5: Cuestionario de Bienestar Universitario de 26 Preguntas](capturas/movil/05-evaluaciones/05_modulo5_evaluacion_socioeconomica_26p.png)

### 6.2. Detalle Exhaustivo del Requerimiento BKL-06: Formulario F-03 en Modo Solo Lectura
- **Problema previo:** En versiones anteriores se mostraban formularios de evaluación con datos vacíos o con posibilidad de modificar respuestas una vez evaluado el becario.
- **Solución implementada:**
  1. En el **Módulo 1 (Evaluación Pastoral F-03)**, cuando el becario ya cuenta con su evaluación pastoral registrada en el backend, la pantalla se abre en **modo solo lectura inmutable (`solo_lectura = true`)**.
  2. Se cargan desde PostgreSQL las **13 preguntas oficializadas** con las respuestas reales e individuales del becario en sesión (`GET /api/evaluaciones/f03/:becario_id`), quedando deshabilitado cualquier control de edición y oculto el botón de guardar.
- **Los 5 Módulos Semestrales Integrados:**
  - **Módulo 1 (20%):** Formulario Pastoral F-03 eclesiástico.
  - **Módulo 2 (20%):** Subida de Récord e Historial Académico verificado.
  - **Módulo 3 (20%):** Evaluación del supervisor/mentor validada mediante código QR / OTP.
  - **Módulo 4 (20%):** Escuela de Líderes en formato Classroom (evidencias y enlaces).
  - **Módulo 5 (20%):** Cuestionario de Bienestar Universitario de 26 preguntas con semáforo diagnóstico.

---

## 7. Módulo 06: Historial Integral Unificado con Pestaña Permisos (`06-historial`) (`BKL-07`)

### 7.1. Capturas de Pantalla

![Pantalla de Historial Móvil Raíz](capturas/movil/09-historial-asistencia.png)
![Pestaña 1: Historial de Asistencias - Extracto Bancario](capturas/movil/06-historial/01_historial_tab_asistencias_extracto_bancario.png)
![Pestaña 2: Historial de Permisos y Justificaciones](capturas/movil/06-historial/02_historial_tab_permisos.png)
![Pestaña 3: Historial de Pasajes y Tramos Declarados](capturas/movil/06-historial/03_historial_tab_pasajes.png)
![Pestaña 4: Historial de Multas de Viernes e Incidencias](capturas/movil/06-historial/04_historial_tab_multas.png)

### 7.2. Detalle Exhaustivo del Requerimiento BKL-07: Integración de Permisos en Historial
- **Problema previo:** En `HistorialAsistenciaPantalla` existía una pestaña incoherente de `"Evaluaciones"`, mientras que el historial de permisos y justificaciones se encontraba disperso.
- **Solución implementada:**
  1. Se reemplazó la pestaña `"Evaluaciones"` por la pestaña **`"Permisos"`**.
  2. La pantalla de Historial consolida ahora 4 subsecciones altamente especializadas:
     - **Tab 1 (Asistencias):** Extracto mensual en formato bancario con desglose de fecha, día, hora de ingreso, hora de salida, sede, bloque y saldo acumulado hacia la meta de 36 horas.
     - **Tab 2 (Permisos):** Listado cronológico de solicitudes de permisos y justificaciones radicadas, con chips de estado (`Todos`, `1. Pendientes`, `2. Revisados`, `Aprobados`), fecha, motivo y resolución de exención de multa.
     - **Tab 3 (Pasajes):** Auditoría de tramos urbanos declarados, detalle de calles, costo y estado de desembolso al 80%.
     - **Tab 4 (Multas e Incidencias):** Relación de multas de viernes (Bs 10/minuto de retraso posterior a las 16:00) y confirmación de multas eximidas por justificación aprobada.

---

## 8. Módulo 07: Formulario Directo de Permisos con FilePicker Real (`07-permisos-justificaciones`) (`BKL-08`)

### 8.1. Capturas de Pantalla

![Pantalla de Permisos y Justificaciones Raíz](capturas/movil/11-permisos-justificaciones.png)
![Formulario Registrar Permiso - Campos Superiores](capturas/movil/07-permisos-justificaciones/01_formulario_registrar_permiso_parte_superior.png)
![Formulario Registrar Permiso - Adjunto Real y Botón Único](capturas/movil/07-permisos-justificaciones/02_formulario_registrar_permiso_adjunto_y_boton.png)

### 8.2. Detalle Exhaustivo del Requerimiento BKL-08: Formulario Directo y Carga de Archivos
- **Problema previo:** La pantalla de permisos abría una lista intermedia con un botón flotante (FAB) redundante, los tipos de prueba eran chips ficticios que no subían archivos y el botón de radicar requería múltiples confirmaciones confusas.
- **Solución implementada:**
  1. `PermisosPantalla` despliega directamente el formulario limpio y homologado con la versión web institucional:
     - **Becario Solicitante:** Identificación unívoca del estudiante con su sede y cohorte.
     - **Tipo de Incidencia:** Inasistencia a prácticas, inasistencia a viernes formativo, retraso justificado o fuerza mayor.
     - **Fecha de Incidencia:** Selector de fecha con validación de rango no mayor a 48 horas post-evento.
     - **Motivo Resumido:** Campo de texto libre para el título de la solicitud.
     - **Descripción Detallada:** Exposición pormenorizada de los hechos motivantes.
  2. **Selector Real de Archivos con `FilePicker`:**
     - Se eliminaron los chips ficticios `TIPOS_PRUEBA`.
     - Se integró un selector nativo de archivos compatible con formatos válidos: **JPG, PNG, WEBP y PDF** hasta un peso máximo de 10 MB.
     - El archivo seleccionado se previsualiza con su nombre, tamaño y opción de descarte.
  3. **Botón Único de Acción:**
     - Se implementó el botón único `"Radicar Permiso / Justificación"`, el cual envía la petición multipart directamente a `POST /api/justificaciones` en PostgreSQL.

---

## 9. Módulo 08: Mis Refrigerios, Modal de Raciones y Confirmación de Recojo (`08-refrigerios`) (`BKL-03`)

### 9.1. Capturas de Pantalla

![Pantalla de Refrigerios Móvil Raíz](capturas/movil/12-refrigerios-encargado-dupla.png)
![Mis Refrigerios - Vista Principal y Confirmación de Recojo](capturas/movil/08-refrigerios/01_mis_refrigerios_vista_principal_y_recojo.png)
![Modal Registrar Raciones de Refrigerio en APK - Parte 1](capturas/movil/08-refrigerios/02_modal_registrar_raciones_refrigerio_apk_1.png)
![Modal Registrar Raciones de Refrigerio en APK - Parte 2](capturas/movil/08-refrigerios/03_modal_registrar_raciones_refrigerio_apk_2.png)
![Diálogo Modal de Confirmación de Recojo de Ración](capturas/movil/08-refrigerios/04_dialogo_confirmar_recojo_refrigerio.png)

### 9.2. Detalle Exhaustivo del Requerimiento BKL-03: Homologación Completa en APK y Recojo
- **Problema previo:** En la app móvil no existía el formulario completo de registro de refrigerios que poseía la web y el recojo de ración era un booleano local simulado en `REFRIGERIOS_HISTORIAL_BECARIO`.
- **Solución implementada:**
  1. **Formulario "Registrar Raciones de Refrigerio" en la APK:**
     - Se implementó en Flutter el modal idéntico al de Frontend Web:
       - Selección de **Fecha de Viernes Formativo**.
       - **Cálculo Automático Recíproco:** 23 raciones × Bs 5.00 = **Bs 115.00 de presupuesto oficial**.
       - Selección de **Dupla Responsable** (Becario Encargado 1 y Becario Encargado 2).
       - Selección de **Sede, Sub-bloque y Supervisor Responsable**.
       - Campo de **Observaciones y Menú Programado**.
     - Envía la transacción a `POST http://localhost:3002/api/refrigerios`.
  2. **Confirmación Persistente de Recojo de Refrigerio:**
     - La vista principal presenta la tarjeta interactiva de recojo con el botón `"Confirmar Recojo de Refrigerio"`.
     - Al presionar, se abre el diálogo de confirmación y tras la aceptación se ejecuta `PATCH /api/refrigerios/:id/confirmar-recojo`, persistiendo en PostgreSQL la confirmación individual con fecha y hora exacta.
  3. **Rendición de Fondos al 100%:**
     - La dupla puede registrar las notas de compra mediante `PATCH /api/refrigerios/:id/rendir`, registrando el monto devuelto y el becario receptor del reembolso.

---

## 10. Módulo 09: Seguimiento, Citas y Notificaciones (`09-seguimiento-y-notificaciones`)

### 10.1. Capturas de Pantalla

![Pantalla de Seguimiento y Citas Raíz](capturas/movil/13-seguimiento-citas.png)
![Pantalla de Notificaciones Raíz](capturas/movil/08-notificaciones.png)
![Seguimiento y Retroalimentación con Supervisor](capturas/movil/09-seguimiento-y-notificaciones/01_seguimiento_y_retroalimentacion.png)
![Centro de Notificaciones Móvil](capturas/movil/09-seguimiento-y-notificaciones/02_notificaciones.png)

### 10.2. Funcionalidad Operativa:
1. **Seguimiento y Citas de Mentoría:** Muestra las citas convocadas por el supervisor institucional con fecha, hora, modalidad (presencial/virtual) y el listado de compromisos asumidos.
2. **Notificaciones Institucionales:** Alertas en tiempo real sobre aprobación de justificaciones, asignación de dupla de refrigerio y recordatorios de cierre mensual de horas.

---

## 11. Módulo 10: Mi Perfil, Seguridad y Acerca de Nosotros (`10-perfil-y-acerca-de`)

### 11.1. Capturas de Pantalla

![Pantalla de Mi Perfil y Seguridad Raíz](capturas/movil/14-mi-perfil-seguridad.png)
![Mi Perfil - Datos Personales y Correos](capturas/movil/10-perfil-y-acerca-de/01_mi_perfil_datos_y_correos.png)
![Mi Perfil - Seguridad y Cambio de Contraseña](capturas/movil/10-perfil-y-acerca-de/02_mi_perfil_seguridad_contrasena.png)
![Página Oficial Acerca de Nosotros Diaconía](capturas/movil/10-perfil-y-acerca-de/03_acerca_de_nosotros_diaconia.png)

### 11.2. Funcionalidad de Autogestión:
1. **Datos de Contacto:** Actualización de teléfonos de contacto y teléfono de emergencia.
2. **Gestión de Correos Alternativos:** Visualización y registro de correos alternativos para inicio de sesión seguro.
3. **Seguridad de Contraseña:** Formulario con indicador visual de fortaleza y botón para alternar visibilidad.
4. **Acerca de Nosotros:** Pantalla institucional que expone la trayectoria, misión y valores de la Fundación Diaconía FRIF-IFD.

---

## 12. Erradicación Absoluta de Datos Mockeados y Conexión en Vivo a PostgreSQL (`BKL-10`)

En concordancia con el requerimiento **BKL-10**, se eliminaron de raíz todos los datos de prueba y arrays locales de la app móvil:

| Archivo Fuente Móvil | Código Mock Purgado / Eliminado | Integración Real a Backend NestJS (Puerto 3002) |
| :--- | :--- | :--- |
| `asistencia-repositorio.dart` | `generarExtractosLocales` | `GET /api/asistencia/extracto-mensual` conectado a PostgreSQL. |
| `historial-asistencia-pantalla.dart` | `multas_ejemplo` | `GET /api/asistencia/multas` con liquidación determinista real. |
| `pasajes-repositorio.dart` | `TARIFAS_PREDEFINIDAS` | `GET /api/pasajes/tarifas` dinámico sincronizado con Web. |
| `permisos-pantalla.dart` | `_justificacionesEjemplo` y `TIPOS_PRUEBA` | `POST /api/justificaciones` con subida multipart (`FilePicker`). |
| `refrigerios-proveedor.dart` | `REFRIGERIOS_HISTORIAL_BECARIO` | `GET /api/refrigerios`, `POST` y `PATCH .../confirmar-recojo`. |
| `evaluaciones-repositorio.dart` | `modeloEjemplo()` | `GET /api/evaluaciones/f03/:id` y `GET /api/evaluaciones/avance`. |
| `devocionales-repositorio.dart` | `SEMILLAS_DEVOCIONALES` | `GET /api/devocionales/hoy` con persistencia offline en SharedPreferences. |

---

## 13. Infraestructura Offline, Esqueletos y Catálogo Unificado de Errores

1. **`ColaOfflineServicio`:** Persistencia estructurada en `SharedPreferences` de transacciones diferidas con timestamps y sincronización automática al recuperar conectividad.
2. **`BannerConexion`:** Banner interactivo que alerta la pérdida de señal y cuenta las operaciones encoladas pendientes.
3. **Catálogo de Errores Unificado (`ERR-1001` a `ERR-9002`):** Tipado fuerte en Dart que mapea exactamente los códigos emitidos por el backend NestJS.
4. **`CargandoSkeleton`:** Placeholders visuales animados con gradiente que sustituyen spinners genéricos, ofreciendo una experiencia visual de alta calidad.

---

## 14. Conclusiones y Certificación de Calidad Técnica

1. **Rendimiento Nativo a 60 FPS:** Pintado eficiente con `CustomPainter` en el radar geodésico y uso de `IndexedStack` en el menú principal.
2. **Suite Completa de 138 Pruebas Automatizadas:** 138 de 138 pruebas aprobadas al 100% y 0 advertencias en `flutter analyze`.
3. **Nomenclatura Corporativa Diaconía:** Estricto apego a `snake_case` en variables, `camelCase` en métodos, `PascalCase` en widgets y `kebab-case` en nombres de archivos.
4. **Seguridad y Precisión Institucional:** Geocercas anti-spoofing, cómputo del 80% en centavos exactos, meta de 36 horas mensuales y sincronización en tiempo real con PostgreSQL.

---
*Fin de la Documentación Técnica de la Aplicación Móvil BUMAND 2026*
