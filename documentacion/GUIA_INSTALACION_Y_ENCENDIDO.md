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
> **Resultado Esperado:** **15 de 15 suites aprobadas**, **75 de 75 tests unitarios en verde (100% éxito)**, cubriendo los módulos de autenticación, control de asistencia, motor de multas de viernes, cálculo del 80% de viáticos, matriz dinámica del 20% en evaluaciones y refrigerios institucionales.

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
> **Resultado Esperado:** **82 de 82 pruebas aprobadas al 100%**, validando el radar geodésico Haversine, detección de bloques, doble confirmación de viernes, cálculo dinámico de multas (Bs 10/min), liquidación de pasajes al 80% y las tres subsecciones del historial.

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
