# Manual Oficial de Sembradores y Limpieza de Base de Datos (Seeders) - BUMAND

**Proyecto:** Becas Universitarias con Misión y Acción Diaconal (BUMAND)  
**Institución:** Diaconía FRIF-IFD / Universidad Mayor de San Andrés (UMSA)  
**Tecnología:** NestJS 11+, TypeORM, PostgreSQL 16 Portable  
**Última Actualización:** 2026-10-22  

---

## 1. Visión General

El sistema de sembrado (*seeders*) de BUMAND permite poblar, sincronizar, resetear y depurar la base de datos relacional de PostgreSQL garantizando la máxima integridad referencial.

Para atender tanto despliegues limpios desde cero como pruebas institucionales controladas, se implementó una **arquitectura de limpieza dual** junto con la **creación dinámica del Administrador Primario** a partir de variables de entorno y un **motor de cuestionarios y evaluaciones configurables**.

---

## 2. Variables de Entorno Requeridas (`.env`)

### 2.1 Backend (`bumand-backend/.env`)

Antes de ejecutar cualquier seeder, configure las credenciales del **Administrador Primario del Sistema**:

```env
# Configuración de Base de Datos
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_CONTRASENA=4a74ab3f9c4d1cbfc7309c945094afc3
DB_DATABASE=bumand-db
SSL_ENABLED=false
SINCRONIZAR_DB=true
PORT=3002
JWT_SECRET="gSS51FnWdvH3gG4j4E7gwR7P6gY7klqnCvRlwVpglU88uBKT/9WT+fehzxRksKn/WhqvrnIhm1o0l30AXzF9FA=="
JWT_EXPIRATION_TIME=30d

# =====================================================================
# Administrador Primario del Sistema BUMAND
# =====================================================================
ADMIN_PRIMARIO_NOMBRE="Administrador Primario BUMAND"
ADMIN_PRIMARIO_CORREO=admin@bumand.bo
ADMIN_PRIMARIO_CONTRASENA=Admin2026!
```

> [!IMPORTANT]
> - `ADMIN_PRIMARIO_NOMBRE`: Debe ingresarse entre comillas dobles si contiene espacios.
> - Al ejecutar una limpieza total o iniciar con la base de datos en blanco, este usuario se creará automáticamente con rol `ADMINISTRADOR`, estado `ACTIVO`, `correo_confirmado = true` y contraseña hasheada con algoritmo seguro `bcrypt`.

### 2.2 Frontend (`bumand-frontend/.env`)

El frontend debe contar con su archivo `.env` configurado (copia de `.env.local` documentada en `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyATBRIFrcepo-r3Iv7KJ1hjCyBfvPBfwJA
```

---

## 3. Catálogo Completo de Comandos de Sembrado

Todos los comandos se ejecutan dentro del directorio `bumand-backend/`:

```powershell
cd bumand-backend
```

### 3.1 Limpieza Total (Enfoque B - Hoja en Blanco)

```powershell
npm run sembrar:limpiar-todo
```

* **Propósito:** Restablece completamente la base de datos a un estado de **hoja en blanco** e inicializa al Administrador Primario.
* **Acción ejecutada:**
  1. Trunca y vacía absolutamente todas las tablas operativas, transaccionales, de usuarios, becarios, supervisores, eventos y catálogos mediante `TRUNCATE TABLE ... RESTART IDENTITY CASCADE`.
  2. Lee las credenciales de `ADMIN_PRIMARIO_*` del archivo `.env`.
  3. Crea al **Administrador Primario** como único usuario en el sistema.
* **Resultado:** La base de datos queda 100% limpia de datos residuales y lista para que el Administrador configure iglesias, sedes de práctica, periodos, tarifas y cuestionarios directamente desde el panel web o utilizando los sembradores modulares.

---

### 3.2 Limpieza de Datos Operativos (Tipo 1 - Preserva Usuarios y Catálogos)

```powershell
npm run sembrar:limpiar-datos
```

* **Propósito:** Depurar todas las transacciones, operaciones diarias y declaraciones acumuladas, **manteniendo intactos a todos los usuarios** (administradores, supervisores y estudiantes becarios) y las entidades maestras (iglesias, agencias, horarios, tarifas y periodos).
* **Tablas que elimina:**
  - Declaraciones mensuales de pasajes (`solicitudes_pasajes`) y tramos declarados (`recorridos`).
  - Marcaciones de asistencia (`registros_asistencia`) y multas generadas (`multas`).
  - Justificaciones e incidencias (`justificaciones`).
  - Evaluaciones completadas (`evaluaciones`), formularios pastorales (`evaluaciones_pastor`) y expedientes de seguimiento (`casos_seguimiento_pastoral`).
  - Registros de refrigerios (`refrigerios`) y asistencias a eventos (`asistencias_eventos`).
  - Notificaciones del sistema (`notificaciones`) y reportes PDF emitidos (`reportes_generados`).
  - Aprobaciones de prácticas (`aprobaciones_practicas`).
* **Tablas que preserva:**
  - `usuarios`, `becarios`, `evaluadores`.
  - `iglesias`, `lugares_practica`.
  - `modulos_evaluacion`, `periodos_evaluaciones`.
  - `tarifas_transporte`, `paradas_transporte`.
  - `cuestionarios`, `preguntas_cuestionario`, `preguntas_bienestar`.
  - `horarios_apoyo`, `asignaciones_practica`, `configuraciones_institucionales`.

---

### 3.3 Siembra Específica de Catálogos Institucionales

```powershell
npm run sembrar:catalogos
```

* **Propósito:** Poblar o actualizar únicamente los catálogos base indispensables para la operación del sistema, sin crear usuarios ni tocar datos operativos:
  - **Módulos de evaluación:** Los 5 pilares normativos de BUMAND (1. Liderazgo F-03, 2. Autoevaluación Académica, 3. Mentor Prácticas, 4. Escuela de Líderes, 5. Evaluación Socioeconómica).
  - **Periodos evaluativos:** Semestre I - 2026 (cerrado) y Semestre II - 2026 (abierto).
  - **Lugares de práctica:** Oficina Central El Alto y las 10 agencias de Diaconía IFD con geocercas satelitales WGS84.
  - **Iglesias:** Congregaciones locales asociadas y evaluadores pastorales.
  - **Tarifario de transporte:** Tarifas oficiales de transporte urbano e interciudad (Micro, Minibús, Teleférico, Trufi).
  - **Paradas oficiales:** Nodos principales de La Paz y El Alto.

---

### 3.4 Siembra Específica de Cuestionarios y Preguntas

```powershell
npm run sembrar:cuestionarios
```

* **Propósito:** Sembrar o restaurar los instrumentos evaluativos y cuestionarios estructurados:
  - Cuestionario de Bienestar Universitario con sus **26 preguntas canónicas** y opciones Likert.
  - Formulario F-03 Pastoral con criterios de testimonio, vida eclesial y liderazgo.
  - Rúbrica de Prácticas Preprofesionales del Mentor con criterios técnicos y de puntualidad.

---

### 3.5 Siembra Completa Institucional (Estándar BUMAND)

```powershell
npm run sembrar
```

* **Propósito:** Ejecuta el sembrado integral y exhaustivo de demostración y producción:
  1. Asegura el Administrador Primario del `.env`.
  2. Sincroniza los administradores institucionales de Diaconía.
  3. Siembra todos los catálogos base y cuestionarios.
  4. Da de alta a los supervisores institucionales (tutores y mentores).
  5. Registra la **nómina oficial de 23 estudiantes becarios** con sus perfiles académicos completos, asignaciones de sede y horarios de apoyo formalizados.
  6. Crea el evento semilla institucional.
  7. **Higiene estricta de pasajes:** Garantiza que no existan declaraciones simuladas de pasajes del pasado (`recorridos` y `solicitudes_pasajes` quedan en 0 para que los becarios inicien con bandejas limpias).

---

## 4. Matriz Comparativa de Tablas por Comando

| Tabla en PostgreSQL | `sembrar:limpiar-todo` | `sembrar:limpiar-datos` | `sembrar:catalogos` | `sembrar:cuestionarios` | `sembrar` (Completo) |
|---|:---:|:---:|:---:|:---:|:---:|
| `usuarios` | Solo Admin Primario | Preservado | Intacto | Intacto | Sincronizado |
| `becarios` | Vaciada (0) | Preservado | Intacto | Intacto | 23 Becarios |
| `horarios_apoyo` | Vaciada (0) | Preservado | Intacto | Intacto | Sembrados |
| `asignaciones_practica` | Vaciada (0) | Preservado | Intacto | Intacto | Sembradas |
| `iglesias` | Vaciada (0) | Preservada | Sembradas | Intacto | Sembradas |
| `lugares_practica` | Vaciada (0) | Preservada | Sembradas | Intacto | Sembradas |
| `modulos_evaluacion` | Vaciada (0) | Preservada | 5 Módulos | Intacto | 5 Módulos |
| `periodos_evaluaciones` | Vaciada (0) | Preservada | Sembrados | Intacto | Sembrados |
| `tarifas_transporte` | Vaciada (0) | Preservada | Sembradas | Intacto | Sembradas |
| `paradas_transporte` | Vaciada (0) | Preservada | Sembradas | Intacto | Sembradas |
| `cuestionarios` | Vaciada (0) | Preservada | Intacto | Sembrados | Sembrados |
| `preguntas_cuestionario` | Vaciada (0) | Preservada | Intacto | Sembradas | Sembradas |
| `preguntas_bienestar` | Vaciada (0) | Preservada | Intacto | 26 Preguntas | 26 Preguntas |
| `solicitudes_pasajes` | **0 (Limpia)** | **0 (Limpia)** | Intacto | Intacto | **0 (Limpia)** |
| `recorridos` | **0 (Limpia)** | **0 (Limpia)** | Intacto | Intacto | **0 (Limpia)** |
| `registros_asistencia` | 0 (Limpia) | 0 (Limpia) | Intacto | Intacto | Intacto |
| `justificaciones` | 0 (Limpia) | 0 (Limpia) | Intacto | Intacto | Intacto |
| `evaluaciones` | 0 (Limpia) | 0 (Limpia) | Intacto | Intacto | Intacto |
| `notificaciones` | 0 (Limpia) | 0 (Limpia) | Intacto | Intacto | Intacto |

---

## 5. Higiene de Datos de Pasajes y Recorridos

En versiones anteriores de desarrollo, existían declaraciones de pasajes simuladas precargadas que aparecían tanto en la web como en la aplicación móvil.

Con la implementación actual:
1. **En Backend:** Tanto el seeder completo (`sembrar`) como la limpieza de datos (`sembrar:limpiar-datos`) y la limpieza total (`sembrar:limpiar-todo`) truncan incondicionalmente las tablas `recorridos` y `solicitudes_pasajes`.
2. **En Frontend:** Los arreglos de prueba en memoria (`SOLICITUDES_INICIALES` y `RECORRIDOS_INICIALES`) han sido vaciados permanentemente. Cuando un becario o supervisor ingresa al módulo de pasajes, el sistema consulta directamente a la base de datos y muestra estados vacíos limpios en lugar de registros simulados ficticios.

---

## 6. Gestión de Cuestionarios desde la Interfaz Web

Para el Administrador que ejecuta una limpieza total (Enfoque B) o que desea añadir nuevos instrumentos de evaluación:

1. Ingrese a la plataforma web con la cuenta del Administrador Primario.
2. Diríjase a **"Evaluaciones"**.
3. En la barra superior de pestañas, el Administrador tiene acceso a la pestaña **"Cuestionarios Dinámicos"** (`<SlidersHorizontal />`).
4. Desde esta vista podrá:
   - Registrar nuevos cuestionarios con código único, título, descripción y evaluador objetivo (Becario, Pastor, Supervisor, Trabajo Social).
   - Agregar reactivos y preguntas individuales definiendo orden correlativo, sección temática, enunciado y peso en puntos.
   - Eliminar cuestionarios obsoletos o reactivos individuales.
   - Pulsar el botón **"Sembrar Base"** para restablecer en un solo clic los cuestionarios normativos de BUMAND.

---

## 7. Procedimiento de Ejecución Paso a Paso

### Paso 1: Iniciar la Instancia PostgreSQL del Proyecto

Verifique que el motor PostgreSQL portable de BUMAND esté encendido:

```bat
c:\Users\yang_\Desktop\ZBumands\Bumands-Proyecto\new-bumand\documentacion\iniciar_bd.bat
```

### Paso 2: Ejecutar el Seeder Deseado

Desde una terminal en `bumand-backend`:

```powershell
# Opción A: Reinicio total a hoja en blanco (solo Administrador Primario de .env)
npm run sembrar:limpiar-todo

# Opción B: Limpiar operaciones preservando usuarios
npm run sembrar:limpiar-datos

# Opción C: Siembra completa institucional
npm run sembrar
```

### Paso 3: Iniciar el Servidor Backend

```powershell
npm run start:dev
```

### Paso 4: Iniciar el Frontend y Acceder

En otra terminal:

```powershell
cd bumand-frontend
npm run dev
```

Abra su navegador en `http://localhost:3000/inicio-sesion` e inicie sesión con las credenciales del Administrador Primario:
- **Correo:** `admin@bumand.bo` (o el configurado en su `.env`)
- **Contraseña:** `Admin2026!` (o la configurada en su `.env`)
