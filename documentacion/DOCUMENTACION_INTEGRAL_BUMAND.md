# PARTE PRELIMINAR: GUÍA OFICIAL DE INSTALACIÓN Y ENCENDIDO


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

### 2.6. Modos de Encendido del Servicio Backend

#### Modo Desarrollo (con Recarga en Caliente - Hot Reload):
```bash
npm run start:dev
```
El servidor escuchará en el puerto configurado: `http://localhost:3001` (o `http://localhost:3000`).

#### Modo Producción (Compilación Optimizada):
```bash
npm run compilar
npm run start:prod
```

#### Explorador de la API REST (Swagger UI):
Una vez encendido el backend, puede auditar y probar todos los endpoints REST interactivos accediendo a:
```
http://localhost:3001/api/docs
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
NEXT_PUBLIC_API_URL=http://localhost:3001/api

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
   *(Verificar que reporte conexión exitosa y Swagger en el puerto 3001).*

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


**Sistema de Gestión de Becarios, Viáticos y Prácticas Preprofesionales**  
*Fundación Diaconía FRIF-IFD — Gestión Institucional 2026*

---

## 1. Resumen Ejecutivo y Arquitectura RBAC

La plataforma web de **BUMAND** ha sido desarrollada sobre **Next.js 14+ (App Router)**, **React 18**, **Tailwind CSS**, la biblioteca de componentes **Radix UI / Shadcn**, y primitivas de micro-interacción **Cult UI / Watermelon UI / Skipper UI**. Su arquitectura responde a un modelo estricto de **Control de Acceso Basado en Roles (RBAC)**, diseñado para garantizar la segregación de funciones, la seguridad e integridad de los datos de los estudiantes becarios, y el cumplimiento normativo en la liquidación de viáticos y acreditación de horas prácticas.

### 1.1. Matriz de Roles y Alcance de Navegación

| Módulo / Pestaña | Administrador (`daniel234.davalos@gmail.com`) | Supervisor (`angel.ali@bumand.bo`) | Becario (`nilda.churata@bumand.bo`) |
| :--- | :---: | :---: | :---: |
| **Inicio de Sesión** | Acceso Global | Acceso Global | Acceso Global |
| **Dashboard / Panel Principal** | Analítico Global con Rango de Fechas & KPIs Multas | Panel Operativo de Supervisión | Panel Personal Operativo |
| **Directorio de Becarios** | Gestión Global + Asignación de Tutor + Orden Verificación | Lectura y Seguimiento Asignados | Perfil de Solo Lectura (Campos Protegidos) |
| **Sedes y Geocercas (WGS84)** | Catálogo, Calibración Métrica & Sub-bloques (Admin) | Catálogo y Consulta de Sedes | Visualización de Sede Asignada |
| **Control de Asistencia** | Auditoría General, Google Maps & Multas Viernes | Monitoreo Asignado + Llamada de Lista en Vivo | Marcación GPS con Detección de Bloque |
| **Pasajes y Viáticos (80%)** | Auditoría y Aprobación Financiera | Aprobación / Observación de Tramos | Declaración de Recorridos (Ida/Vuelta) |
| **Devocionales y Vida Espiritual** | Supervisión General de Cohortes | Acompañamiento y Consejo Pastoral | Registro Personal y Lectura Diaria |
| **Gestión de Eventos y Actas** | Creación Global, Google Maps & Geocercas | Convocatoria y Control de Actas | Asistencia a Eventos Convocados |
| **Bandeja de Justificaciones** | Resolución Final y Auditoría | Dictamen Motivado de Faltas | Declaración de Inasistencias / Retrasos |
| **Evaluaciones 360° y F-03** | Matriz Dinámica (Base 20%), Semestres & Cita Bíblica | Calificación Mentor + Firma Digital | Formulario F-03 + Autoevaluación |
| **Refrigerios Institucionales** | Control Global, Raciones & Planilla de Reposición | Registro de Entrega y Firmas de Asistencia | Constancia de Ración Recibida |
| **Emisión de Reportes PDF** | Generación y Descarga Oficial | Generación y Descarga Supervisada | Sin acceso |
| **Centro y Globo de Notificaciones** | Notificaciones Globales | Alertas de Becarios a Cargo | Avisos de Marcación, Multas y Aprobación |

### 1.2. Guía de Instalación, Configuración y Encendido Web

Para poner en marcha la plataforma web de BUMAND junto con su backend NestJS:

#### 1. Requisitos Previos:
- **Node.js:** v20.x o v22.x LTS (`node -v`)
- **Gestor npm:** v10.x+ (`npm -v`)
- **Backend NestJS Activo:** Corriendo en `http://localhost:3001` (o puerto configurado)

#### 2. Configuración y Arranque del Backend:
```bash
cd bumand-backend
npm install
npm run compilar   # Compilación estricta TypeScript (0 errores)
npm test           # 15/15 suites en verde, 75/75 pruebas unitarias
npm run start:dev  # Inicia en http://localhost:3001 (Swagger en /api/docs)
```

#### 3. Configuración y Arranque del Frontend Web:
```bash
cd bumand-frontend
npm install
# Verificar .env.local: NEXT_PUBLIC_API_URL=http://localhost:3001/api
npm run compilar   # Next.js build con Turbopack (0 errores)
npm run dev        # Inicia en http://localhost:3000
# Para producción: npm start (sirve compilación en http://localhost:3000)
```

#### 4. Credenciales Semilla RBAC de Prueba:
- **Administrador:** `daniel234.davalos@gmail.com` | Clave: `Bumand2026!` (Acceso total, sedes/bloques, asignación tutores, apertura semestres, matriz 20%, refrigerios).
- **Supervisor:** `angel.ali@bumand.bo` | Clave: `Bumand2026!` (Llamada lista en vivo, aprobación pasajes 80%, evaluación prácticas).
- **Becaria:** `nilda.churata@bumand.bo` | Clave: `Bumand2026!` (Marcación GPS con bloque, radar, viáticos 80%, F-03, devocionales).

---

## 2. Pantalla de Acceso Global: Inicio de Sesión

### 2.1. Vista General y Captura de Pantalla

![Pantalla de Inicio de Sesión Institucional](capturas/web/web_login.png)

### 2.2. Propósito y Funcionalidad Operativa
La pantalla de inicio de sesión (`/inicio-sesion`) es el punto de entrada único y seguro a la plataforma web corporativa. Dispone de un formulario reactivo con validación estricta de credenciales, autenticación desacoplada con el backend NestJS vía JSON Web Tokens (JWT) y un mecanismo de contingencia para pruebas locales basado en cuentas semilla corporativas.

#### Elementos presentes:
1. **Identidad Institucional Dual:** Despliegue de los logotipos vectoriales de **BUMAND** y de la **Fundación Diaconía FRIF-IFD**.
2. **Formulario de Credenciales:** Campos validados para correo electrónico corporativo (`@bumand.bo` o `@wscrt.com`) y contraseña encriptada.
3. **Manejo de Errores Reactivo:** Notificaciones contextuales en color coral institucional (`#E2694B`) y toasts con **Sonner** en caso de credenciales inválidas (`ERR-1001`) o cuenta inhabilitada (`ERR-1004`).
4. **Selector Rápido de Cuentas Semilla RBAC:** Tres accesos directos con un solo clic para alternar rápidamente entre los roles de Administrador General, Supervisor Institucional y Becario Activo.
5. **Animaciones de Alta Factura (High-Craft):** Contenedor envuelto en `TarjetaSpotlight` con proyector perimetral, `BordeLuminoso` dinámico y botón `BotonConEstado` con feedback táctil.
6. **Disparador del Versículo Diario:** Activa la variable `bumand_mostrar_versiculo_inicio` en `sessionStorage` para mostrar el diálogo modal de edificación espiritual una vez autenticado exitosamente.

### 2.3. Análisis Comparativo: Qué Hace vs. Qué NO Hace

| Funcionalidad | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Autenticación** | Valida el usuario contra el endpoint `/autenticacion/inicio-sesion` o utiliza la semilla local de contingencia si el servicio está en reposo. | No almacena contraseñas en texto claro en `localStorage`; solo guarda el token JWT firmado y los datos del perfil activo. |
| **Enrutamiento RBAC** | Redirige al Administrador y Supervisor a la pestaña de administración general, y al Becario a su panel personal operativo. | No permite ingresar a rutas internas protegidas sin una sesión activa (redirección automática hacia `/inicio-sesion`). |
| **Recuperación de Clave** | Muestra el estado del sistema corporativo y notificaciones de acceso guiadas. | No incluye un mecanismo de autoservicio de restablecimiento de contraseña por correo público para evitar vectores de ataque externos; las claves son gestionadas por Diaconía IFD. |
| **Tolerancia a Fallos** | Captura estados de red y proporciona retroalimentación visual amigable con códigos `ERR-NNNN`. | No interrumpe la experiencia de usuario si el backend está reiniciando; se apoya en el modo de contingencia institucional. |

---

## 3. Rol: Administrador General (`daniel234.davalos@gmail.com`)

El Administrador General cuenta con el nivel de privilegios más alto dentro del ecosistema, con potestad para auditar, dar de alta sedes, registrar becarios, convocar eventos y convalidar reportes oficiales.

---

### 3.1. Dashboard General Analítico

#### Captura de Pantalla
![Dashboard General Analítico de Administrador](capturas/web/admin_dashboard.png)

#### Propósito y Componentes
El panel de control ejecutivo consolida en tiempo real los indicadores clave de desempeño (KPIs) de toda la fundación, incorporando analítica temporal flexible:
- **Selector Interactivo de Rango de Fechas:** Filtro conmutable de fechas (`fecha_inicio` y `fecha_fin`) con 4 preajustes inmediatos:
  - *"Este Mes":* Filtra los últimos 30 días de operación.
  - *"Último Trimestre":* Vista consolidada de los últimos 90 días.
  - *"Semestre Actual":* Ciclo formativo y académico en curso.
  - *"Personalizado":* Selección libre de fechas con calendario reactivo Shadcn UI.
- **Alerta de Cierre Normativo:** Banner superior informativo con el estado del periodo de liquidación activo y la vigencia del proceso de validación geodésica.
- **Tarjetas de KPIs Ejecutivos con `ContadorRodilloAnimado` y `TarjetaSpotlight`:**
  - *Becarios Activos:* Total de estudiantes en programa (25 activos, 100% de retención).
  - *Horas Acumuladas:* Registro agregado de horas prácticas efectivas frente a la meta (1,040 h registradas, superando la meta planificada).
  - *Evaluaciones 360°:* Módulos consolidados completados (4 de 5 completados).
  - *Presupuesto del 80% en Pasajes:* Monto total liquidado en bolivianos (Bs 5,240.00 sobre un presupuesto límite de Bs 10,000.00).
  - *Multas Institucionales Recaudadas:* Tarjeta focalizada en penalidades disciplinarias por retrasos en viernes (Escuela de Líderes), desplegando el total retenido en Bs (a razón de Bs 10/min) y el número de infracciones en el rango seleccionado, fondos que quedan como retención institucional para la empresa.
- **Gráfico de Tendencia de Horas:** Gráfico de área interactivo con selector conmutable entre vista semestral y anual, con degradado turquesa institucional (`#17B4C4`).
- **Gráfico de Ejecución Presupuestaria (Donut):** Desglose del presupuesto en montos reembolsados, pendientes de aprobación y saldos disponibles.
- **Distribución por Unidad Operativa:** Barras de progreso de horas acreditadas en Seguridad Física, Consultorio Médico, Canales y Agencias.
- **Auditoría Reciente:** Historial de eventos y transacciones en tiempo real con avatares, descripción del evento y marcas de tiempo relativas.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Permite filtrar dinámicamente toda la analítica institucional por rangos de fecha personalizados o predefinidos.
  - Computa y transparenta las multas por retrasos de viernes aplicadas a partir de la vigencia normativa.
  - Calcula visualmente las metas de horas académicas en relación con las horas efectivas registradas con geolocalización.
  - Despliega en centavos exactos los saldos de viáticos para control financiero.
- **Qué NO Hace:**
  - No permite aplicar multas de forma retroactiva a reuniones o viernes previos a la entrada en vigencia del cambio.
  - No permite manipular o alterar manualmente los registros históricos de auditoría desde este panel.
  - No permite sobrepasar el techo presupuestario configurado sin una convalidación contable expresa.

---

### 3.2. Directorio General de Becarios

#### Captura de Pantalla
![Directorio General de Becarios](capturas/web/admin_becarios.png)

#### Propósito y Componentes
Espacio centralizado para la administración de expedientes académicos de los becarios:
- **Buscador en Tiempo Real:** Filtro rápido por nombre del becario, cédula de identidad o carrera universitaria.
- **Asignación Exclusiva de Supervisores:** Acción y modal restringido estrictamente al Administrador para vincular becarios a su tutor/supervisor responsable, suprimiendo cualquier autoasignación arbitraria.
- **Disparador de Verificación Mensual de Datos:** Switch institucional en cabecera ("Solicitar Verificación Mensual de Datos") que emite la orden de confirmación periódica a las aplicaciones móviles de los becarios.
- **Protección de Atributos Académicos:** Bloqueo estricto de campos sensibles (`Universidad`, `Carrera`, `Iglesia`, `Sede`); estos datos permanecen en modo de solo lectura protegida para el becario y solo pueden ser alterados por el Administrador General.
- **Modal de Registro de Nuevo Becario:** Formulario modal para ingresar nombre completo, C.I., universidad de procedencia (UMSA, UPEA, UCB, UNIVALLE, EMI, Franz Tamayo), carrera y asignación inicial de sede.
- **Tabla Institucional de Expedientes:** Detalle de becario, documento de identidad, universidad, lugar de práctica asignado, tutor supervisor responsable y estado de vigencia (`Activo`, `Pendiente Validación`, `Inactivo`).

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Garantiza que únicamente el Administrador General pueda asignar o reasignar supervisores a los becarios.
  - Bloquea la edición de Universidad o Carrera por parte del estudiante, previniendo alteraciones no autorizadas en convenios.
  - Habilita la orden mensual de confirmación de datos de contacto bajo demanda administrativa.
  - Normaliza la nomenclatura de universidades del sistema educativo boliviano.
- **Qué NO Hace:**
  - No permite que un supervisor se autoasigne becarios.
  - No permite al becario modificar su universidad o facultad desde su perfil.
  - No elimina físicamente registros históricos para preservar la integridad referencial y las auditorías de periodos previos.

---

### 3.3. Catálogo de Sedes y Geocercas Institucionales

#### Captura de Pantalla
![Catálogo de Sedes y Geocercas](capturas/web/admin_sedes.png)

#### Propósito y Componentes
Módulo geodésico encargado de registrar y calibrar los puntos físicos donde se autoriza la marcación de horas:
- **Gobernanza de Sedes Exclusiva:** La creación, modificación perimétrica y baja de sedes institucionales queda reservada de manera exclusiva al Administrador General.
- **Soporte de Edificios por Bloques:** Estructuración de sub-ubicaciones edilicias (ej. *Oficina Central - Bloque A Administrativo*, *Bloque B Capacitación / Aulas*) con identificación geodésica para validar la presencia en recintos específicos.
- **Visualizador Cartográfico Digital:** Representación espacial de las sedes institucionales con radios perimétricos y marcadores de tolerancia.
- **Listado de Sedes Registradas:** Oficina Central Bloque A, Bloque B, Agencia Juan Pablo II, Agencia La Paz Central, etc., con sus coordenadas WGS84 (Latitud/Longitud) y cantidad de becarios vinculados.
- **Configuración de Tolerancia Métrica con `Slider` Shadcn:** Ajuste continuo del radio de geocerca (60 a 100 metros) basado en la fórmula geodésica de Haversine.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Reserva la creación de nuevas sedes institucionales únicamente al Administrador General.
  - Permite configurar y etiquetar bloques independientes dentro de un mismo predio institucional.
  - Define las coordenadas GPS oficiales contra las cuales se validarán los registros móviles y web de los becarios.
- **Qué NO Hace:**
  - No permite que supervisores o becarios creen o alteren sedes o radios de tolerancia.
  - No admite radios de tolerancia menores a 30 metros ni mayores a 300 metros, previniendo falsos positivos o accesos fraudulentos fuera de las instalaciones.

---

### 3.4. Auditoría y Control de Asistencia

#### Captura de Pantalla
![Control y Registro de Horas de Asistencia](capturas/web/admin_asistencia.png)

#### Propósito y Componentes
Herramienta de control temporal, georreferenciado y disciplinario para registrar y auditar jornadas de prácticas:
- **Visualizador Satelital Google Maps Embebido:** Despliegue interactivo del mapa geográfico mostrando las coordenadas de la sede/bloque y el punto GPS exacto de la marcación del becario.
- **Doble Confirmación y Llamada de Lista en Vivo:** Modal interactivo para que el supervisor u organizador presencial llame lista en eventos de viernes (Escuela de Líderes), conmutando los registros de `pendiente_confirmacion_organizador` a `confirmado` en un solo toque.
- **Motor Transparente de Multas de Viernes:** Detección de tardanzas en Escuela de Líderes (ingreso oficial 14:30 con tolerancia hasta las 14:35). A partir de las 14:36, computa automáticamente Bs 10 por cada minuto de retraso sobre la hora prevista; el monto queda registrado como retención institucional para la empresa y se transparenta en la ficha del estudiante.
- **Selectores de Fecha y Hora (`SeleccionadorFechaHora` Shadcn):** Entrada y salida con control de precisión horaria y validación cruzada.
- **Indicador de Geolocalización Activa:** Verificación visual de adjunción de coordenadas GPS a la constancia de asistencia.
- **Confirmación Reactiva con `BotonConEstado`:** Transición fluida de estados (reposo, cargando, éxito con confeti) tras completar la transacción.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Acredita jornadas laborales de prácticas preprofesionales con fecha, hora formal y bloque específico.
  - Permite al organizador del evento realizar la llamada de lista presencial que valida la asistencia satelital del becario.
  - Calcula y notifica multas transparentes de Bs 10/minuto en días viernes aplicables desde la entrada en vigencia del cambio.
  - Despliega mapas satelitales interactivos con Google Maps para auditoría perimétrica.
- **Qué NO Hace:**
  - No permite computar horas como válidas en eventos de viernes si falta la confirmación de lista del organizador.
  - No aplica multas retroactivas a asistencias pasadas.
  - No autoriza registros sin confirmación de coordenadas espaciales.

---

### 3.5. Supervisión y Aprobación de Pasajes (80%)

#### Captura de Pantalla
![Supervisión y Aprobación de Pasajes](capturas/web/admin_pasajes.png)

#### Propósito y Componentes
Módulo financiero para la verificación y liquidación de viáticos mensuales:
- **Regla Normativa del Día 24:** Panel que detalla la política de activación de solicitudes a partir del 24 de cada mes.
- **Cálculo de Devolución en Centavos Enteros:** Desglose del total erogado y del 80% exacto a reembolsar (evitando discrepancias de redondeo).
- **Tarjetas de Solicitudes Pendientes:** Información de estudiante, carrera, periodo, fecha de envío, desglose de tramos urbanos (ida/vuelta), verificación GPS por tramo y actividad desarrollada.
- **Acciones Resolutivas:** Botones para **Aprobar** con `BotonConEstado` y confeti, u **Observar** con diálogo modal accesible `AlertDialog` y justificación obligatoria en `Textarea`.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Liquida los montos aplicando estrictamente la tasa del 80% sobre los gastos de transporte declarados.
  - Exige una justificación textual explicativa si el supervisor u administrador decide observar la solicitud.
- **Qué NO Hace:**
  - No permite aprobar solicitudes con justificaciones vacías al momento de observar.
  - No admite la declaración de viáticos fuera del calendario reglamentario habilitado.

---

### 3.6. Matriz de Evaluación 360° y Convalidación

#### Captura de Pantalla
![Matriz de Evaluación 360° Institucional](capturas/web/admin_evaluaciones.png)

#### Propósito y Componentes
Instrumento integral de medición formativa en las 5 dimensiones diaconales con acompañamiento bíblico y flexibilidad administrativa:
- **Cabecera Devocional Inspiradora:** Cita bíblica destacada desde el inicio de la navegación con **Colosenses 3:23-24**: *"Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres; sabiendo que del Señor recibiréis la recompensa de la herencia, porque a Cristo el Señor servís"*.
- **Matriz de Ponderación Dinámica (Base 20%):** Esquema inicial donde los 5 módulos formativos parten con una base equitativa del 20% cada uno (100% total):
  1. *Liderazgo en la Iglesia (Formulario F-03):* Base 20% (Evaluador: Pastor).
  2. *Autoevaluación Académica:* Base 20% (Evaluador: Becario).
  3. *Evaluación del Mentor / Prácticas:* Base 20% (Evaluador: Supervisor).
  4. *Evaluación Escuela de Líderes:* Base 20% (Evaluador: Facilitador Pastoral).
  5. *Evaluación Socioeconómica:* Base 20% (Evaluador: Trabajador Social).
- **Panel Administrativo de Ajuste Ponderado:** Sliders e inputs numéricos exclusivos para el Administrador para ajustar las ponderaciones semestrales, con validación reactiva que exige suma exactamente igual al 100% para habilitar el guardado.
- **Habilitación de Nuevo Semestre:** Modal exclusivo para Administrador para dar de alta nuevos períodos evaluativos (ej. *2026-II*), definiendo vigencias y congelando notas de períodos cerrados.
- **Resumen Ponderado Superior:** Puntuación global calculada automáticamente (escala 0 a 100 y vigesimal 0 a 20) y categoría de rendimiento (Sobresaliente / Muy Bueno / En Observación).
- **Firma Digital Canvas:** Botón modal que despliega un lienzo de captura gráfica para estampar la rúbrica manuscrita del administrador o supervisor con sello de tiempo criptográfico.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Expone la cita bíblica directriz en la cabecera fija de la vista desde el primer acceso.
  - Permite al Administrador redistribuir libremente las ponderaciones porcentuales partiendo de la base del 20%.
  - Habilita la apertura y clausura de semestres académicos de forma centralizada.
  - Aplica la fórmula dinámica ponderada: **Nota Total = ∑ (Puntaje<sub>i</sub> × Peso<sub>i</sub>) / 100**.
  - Captura y vectoriza firmas digitales en Base64 para adjuntarlas a las actas oficiales.
- **Qué NO Hace:**
  - No permite que la suma de las ponderaciones de los 5 módulos sea diferente al 100%.
  - No permite alterar notas ni registrar evaluaciones en semestres cerrados.
  - No permite calificaciones fuera del rango numérico válido [0, 100].

---

### 3.7. Emisión y Descarga de Reportes PDF Oficiales

#### Captura de Pantalla
![Visor y Generador de Reportes PDF](capturas/web/admin_reportes.png)

#### Propósito y Componentes
Centro de emisión de documentos oficiales en formato imprimible:
- **Botones de Emisión Inmediata:** Generación rápida de informe mensual de horas, planilla de pasajes, evaluación pastoral F-03 y certificado 360°.
- **Tabla de Documentos Emitidos:** Registro de títulos, tipos de informe, periodo fiscal, fecha/hora de generación, estudiante asociado, peso del archivo en KB y estado de emisión.
- **Descarga Directa:** Descarga de archivos PDF certificados listos para impresión institucional.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Genera documentos formalizados con logotipos institucionales, tablas de auditoría y casillas de firma reglamentarias.
  - Registra el historial de documentos descargados y generados por usuario.
- **Qué NO Hace:**
  - No genera documentos con datos incongruentes o sin periodo académico asignado.

---

### 3.8. Centro Corporativo y Globo de Notificaciones

#### Captura de Pantalla
![Centro Corporativo de Notificaciones](capturas/web/admin_notificaciones.png)

#### Propósito y Componentes
Bandeja reactiva unificada para alertas y avisos del sistema:
- **Globo de Notificaciones Flotante (`GloboNotificaciones`):** Mini diálogo interactivo anclado a la campana del header universal, visible en toda la navegación.
- **Contador de Notificaciones Pendientes:** Badge visual `InsigniaPulsoVivo` con onda viva continua que alerta sobre elementos sin leer.
- **Filtrado y Marcación Global:** Botón `BotonConEstado` para marcar todos los avisos como leídos con micro-latencia de confirmación.
- **Integración WebSocket:** Actualizaciones en tiempo real ante eventos de ingreso/salida, aprobación de pasajes y resoluciones de justificaciones.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Centraliza las comunicaciones transaccionales emitidas por el backend y la app móvil.
  - Mantiene persistencia del estado leído/no leído por cuenta institucional.
- **Qué NO Hace:**
  - No satura al usuario con correos spam externos; opera como una bandeja in-app orientada a la gobernanza operativa.

---

### 3.9. Gestión de Eventos Geolocalizados y Actas Oficiales

#### Propósito y Componentes
Módulo integral para la convocatoria y auditoría de eventos institucionales de la fundación:
- **Alta de Convocatorias con Geocerca:** Definición de nombre del evento, fecha, lugar físico, coordenadas geodésicas WGS84 y radio de tolerancia en metros.
- **Nómina de Asistentes y Distancia Calculada:** Listado de becarios con cálculo de distancia métrica en tiempo real respecto al epicentro del evento.
- **Generación de Actas PDF:** Exportación inmediata de actas certificadas con firma digital de los asistentes.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Calcula la distancia de los asistentes mediante la fórmula de Haversine.
  - Asigna estado `PRESENTE` si está dentro del perímetro o `FUERA_DE_RADIO` si supera el margen asignado.
- **Qué NO Hace:**
  - No permite modificar los datos del evento una vez que ha concluido o ha sido cancelado formalmente.

---

### 3.10. Bandeja Centralizada de Justificaciones

#### Propósito y Componentes
Flujo de apelación y descargo ante inasistencias o retrasos de becarios:
- **Bandeja de Casos Pendientes:** Clasificación por tipo de incidencia (médica, académica, fuerza mayor, transporte).
- **Dictamen Motivado del Supervisor / Administrador:** Diálogo de resolución donde es mandatario fundamentar por escrito la aprobación o el rechazo de la solicitud.
- **Sincronización Automática con Asistencia:** Al aprobar una justificación vinculada a un evento o jornada de práctica, el sistema actualiza automáticamente el registro de asistencia a estado `JUSTIFICADO`.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Exige fundamentación escrita en cada dictamen emitido.
  - Conmuta de forma inmediata el estado en las actas de asistencia y reportes PDF.
- **Qué NO Hace:**
  - No permite aprobar justificaciones sin motivo o con dictámenes vacíos (`ERR-4004`).

---

### 3.11. Control de Refrigerios Institucionales y Planilla de Reposición

#### Captura de Pantalla
![Control y Reposición de Refrigerios Institucionales](capturas/web/admin_refrigerios.png)

#### Propósito y Componentes
Módulo administrativo independiente para el control logístico, contable y de reposición de refrigerios provistos por la Fundación Diaconía FRIF-IFD en jornadas de capacitación, Escuela de Líderes y prácticas:
- **Registro Logístico de Raciones:** Formulario para registrar fecha, sede o evento convocante, cantidad exacta de raciones entregadas, costo unitario en bolivianos (ej. Bs 12.00) y costo total devengado.
- **Financiamiento Cruzado Institucional:** Panel que visualiza el saldo de fondos requeridos y el porcentaje compensado mediante el fondo de multas recaudadas por retrasos.
- **Firmas de Conformidad y Asistencia:** Registro digital (`jsonb`) de los becarios que recibieron el beneficio con estado de recepción conforme.
- **Generador de Planilla Oficial de Reposición (Código `REP-REF-0000X`):** Emisión y visor HTML imprimible del documento contable oficial con membrete de Diaconía FRIF-IFD, detalle de raciones, cálculo de desembolso y casillas de firma del Supervisor de Sede y el Administrador General para el reembolso formal por caja chica.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Registra y audita la entrega de raciones de refrigerio por evento institucional.
  - Genera la planilla oficial contable lista para impresión y trámite de desembolso institucional.
  - Asocia de forma transparente los gastos de refrigerio con los eventos de asistencia.
- **Qué NO Hace:**
  - No permite emitir planillas de reposición con costos unitarios negativos o raciones vacías.
  - No transfiere fondos de forma unilateral sin la convalidación de firma del Administrador General.

---

## 4. Rol: Supervisor Institucional (`angel.ali@bumand.bo`)

El Supervisor representa el eslabón de acompañamiento y tutoría presencial de los estudiantes. Su entorno web está acotado a los becarios que tiene formalmente asignados bajo su tutela.

---

### 4.1. Panel de Supervisión

#### Captura de Pantalla
![Panel de Supervisión Operativo](capturas/web/supervisor_panel.png)

#### Propósito y Funcionalidad
Ofrece al supervisor una visión focalizada de sus responsabilidades tutoriales:
- Monitoreo del total de horas registradas por su grupo asignado.
- Vigilancia del cumplimiento de la meta horaria mensual.
- Control de las solicitudes de viáticos que aguardan su revisión técnica antes del pase a contabilidad.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Facilita la toma de decisiones inmediata sobre la asistencia y rendimiento de los becarios asignados.
  - Alerta sobre retrasos en la entrega de evaluaciones de facilitadores o pastores.
- **Qué NO Hace:**
  - No expone las partidas presupuestarias globales de sedes fuera de su jurisdicción tutorial.

---

### 4.2. Becarios Asignados a Supervisión

#### Captura de Pantalla
![Becarios Asignados a Supervisión](capturas/web/supervisor_becarios.png)

#### Propósito y Funcionalidad
Lista exhaustiva de los expedientes bajo supervisión directa (por ejemplo, tutorías de Angel Javier Ali Paz):
- Visualización de la carrera, universidad y sede de práctica del estudiante.
- Acceso directo a los datos de contacto y avance académico.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Permite verificar de forma personalizada el cumplimiento de los planes de práctica por becario.
- **Qué NO Hace:**
  - No permite que un supervisor transfiera becarios a otros tutores sin autorización del Administrador General.

---

### 4.3. Aprobación y Observación de Pasajes

#### Captura de Pantalla
![Aprobación de Pasajes por Supervisor](capturas/web/supervisor_pasajes_aprobacion.png)

#### Propósito y Funcionalidad
El supervisor audita cada tramo declarado por los becarios asignados:
- Verifica que el origen y destino correspondan a la ruta entre el domicilio del becario y la sede o iglesia asignada.
- Corrobora que la tarifa declarada se ajuste al régimen del transporte público local.
- Aprueba con el 80% reglamentario o rechaza con motivo fundado.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Resuelve las solicitudes en primera instancia para permitir la posterior liquidación en tesorería.
  - Exige una retroalimentación detallada en caso de observación para que el becario pueda subsanar.
- **Qué NO Hace:**
  - No puede modificar arbitrariamente los montos declarados por el becario; debe aprobarlos o devolverlos observados para su corrección.

---

### 4.4. Matriz 360° y Calificación del Mentor

#### Captura de Pantalla
![Evaluación 360° del Supervisor](capturas/web/supervisor_evaluaciones.png)

#### Propósito y Funcionalidad
El tutor califica el módulo **"Evaluación del Mentor / Prácticas"** (25% de la nota total) y revisa la calificación pastoral antes de cerrar el acta con su firma digitalizada en pantalla.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Asigna la puntuación de desempeño práctico basada en evidencias y asistencia.
  - Firma digitalmente la constancia semestral de prácticas.
- **Qué NO Hace:**
  - No puede alterar la calificación de autoevaluación llenada por el estudiante ni la evaluación pastoral emitida por el ministro eclesiástico.

---

## 5. Rol: Becario (`nilda.churata@bumand.bo`)

El Becario es el usuario operativo del sistema. Su interfaz web está diseñada para ser ágil, intuitiva y plenamente reactiva para el registro de sus obligaciones cotidianas, formación espiritual y justificaciones.

---

### 5.1. Mi Panel Operativo & Radar de Geocerca

#### Captura de Pantalla
![Panel Operativo y Radar de Geocerca del Becario](capturas/web/becario_radar_geocerca.png)

#### Propósito y Componentes
Página de bienvenida personal del estudiante becario:
- **Métricas Personales Inmediatas:**
  - *Pasajes Liquidados (Mes Actual):* Monto acumulado a favor (ej. Bs 276.00 correspondiente al 80% de Bs 345.00).
  - *Horas Acreditadas:* Avance del mes (ej. 64.5 hrs) y porcentaje de puntualidad (96%).
  - *Sede Asignada:* Dirección física y denominación oficial de su lugar de práctica.
- **Radar de Geocerca Satelital:** Componente visual con animación de ondas concéntricas que simula la fijación de coordenadas GPS y valida si el estudiante se encuentra dentro del radio permitido (150 m) para habilitar los botones de **Marcar Llegada** y **Marcar Salida**.
- **Acciones Operativas Principales:** Botones destacados para abrir los diálogos modales de **Declarar Recorrido (Ida / Vuelta)**, **Llenar Formulario Pastoral F-03** y **Consultar Versículo del Día**.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Muestra en tiempo real el saldo acumulado por viáticos y el progreso hacia la meta horaria reglamentaria.
  - Impide la marcación si el sensor GPS detecta que el usuario está fuera de la geocerca permitida.
- **Qué NO Hace:**
  - No permite al becario modificar su sede asignada ni alterar su porcentaje de tolerancia geodésica.

---

### 5.2. Marcación de Horas de Práctica

#### Captura de Pantalla
![Marcación de Asistencia del Becario](capturas/web/becario_marcacion_asistencia.png)

#### Propósito y Componentes
Formulario reactivo para la acreditación diaria de prácticas preprofesionales:
- Selección de fecha y hora exacta de ingreso con `SeleccionadorFechaHora`.
- Selección de fecha y hora estimada o efectiva de salida.
- Indicador de respaldo de geolocalización satelital WGS84.
- Envío directo a la base de datos central con `BotonConEstado` y confeti celebratorio.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Registra las horas en la cuenta del estudiante y notifica a su supervisor asignado vía WebSocket.
- **Qué NO Hace:**
  - No permite registrar asistencias de días futuros.
  - No autoriza horas si la fecha de entrada es posterior a la de salida.

---

### 5.3. Declaración de Recorrido y Pasajes (80%)

#### Captura de Pantalla
![Modal de Declaración de Recorridos](capturas/web/becario_declaracion_pasajes.png)

#### Propósito y Componentes
Diálogo modal con flujo guiado de dos etapas para declarar viajes urbanos:
- **Etapa 1 (Ida):** Fecha del viaje, punto de partida (domicilio/universidad), punto de llegada (sede/iglesia) y tarifa en bolivianos.
- **Transición Automática:** Al presionar "Continuar con Vuelta", el destino del tramo de ida se convierte automáticamente en el punto de partida del tramo de retorno.
- **Etapa 2 (Vuelta):** Ingreso de tarifa de retorno y cálculo automático del gasto global y del **80% exacto de devolución**.
- **Envío Protegido:** Envío respaldado con token JWT a la tabla de recorridos del mes.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Calcula automáticamente en vivo: **Devolución = (Tarifa<sub>ida</sub> + Tarifa<sub>vuelta</sub>) × 0.80**.
  - Encadena los tramos geográficos para evitar saltos ilógicos de ubicación.
- **Qué NO Hace:**
  - No permite ingresar montos negativos o nulos.
  - No permite enviar la solicitud antes del día 24 del mes en curso según el reglamento normativo.

---

### 5.4. Formulario Pastoral F-03 Digitalizado

#### Captura de Pantalla
![Formulario Pastoral F-03](capturas/web/becario_formulario_f03.png)

#### Propósito y Componentes
Digitalización del Formulario Pastoral F-03 para la evaluación del compromiso eclesiástico y diaconal:
- **Checklist de Competencias:** Cuestionario estandarizado con preguntas evaluativas:
  - *Puntualidad en asignaciones.*
  - *Responsabilidad en tareas delegadas.*
  - *Actitud de servicio y disposición cristiana.*
  - *Trabajo en equipo y compañerismo.*
- **Pastillas de Selección Rápida (Pills):** Opciones de selección única en formato botón: `Siempre`, `Casi Siempre`, `A veces`, `Nunca`.
- **Área Cualitativa:** Cuadro de texto para observaciones pastorales, testimonios y recomendaciones formativas.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Recolecta las apreciaciones del pastor o del becario para alimentar el 25% de la Matriz 360°.
  - Valida que todas las preguntas del checklist cuenten con una opción seleccionada.
- **Qué NO Hace:**
  - No permite enviar formularios incompletos sin respuestas en los 4 criterios fundamentales.

---

### 5.5. Vida Devocional y Versículo del Día (RVR60)

#### Propósito y Componentes
Módulo de acompañamiento espiritual y formación del carácter diaconal:
- **Modal de Versículo Diario (`ModalVersiculoDiario`):** Diálogo interactivo emergente con cita bíblica, texto Reina-Valera 1960 (RVR60), tema formativo y reflexión de servicio diaconal.
- **Auto-Llenado Inteligente ("Usar para mi Devocional"):** Botón de acción rápida que transfiere la cita y el texto bíblico directamente al formulario de nuevo devocional.
- **Registro de Reflexión y Petición de Oración:** Formulario validado con `useFormularioValidado` para plasmar la meditación personal y necesidades de oración.
- **Respuesta y Retroalimentación Pastoral:** Visor de comentarios emitidos por el mentor o pastor de la congregación con señalización eclesiástica verde.

#### Qué Hace vs. Qué NO Hace
- **Qué Hace:**
  - Conecta con el backend en `/biblia/versiculo-diario` con respaldo de contingencia garantizado.
  - Premia el registro con confeti animado (`RafagaCelebracion`).
- **Qué NO Hace:**
  - No es una biblia interactiva completa; provee las lecturas y citas asignadas a la formación diaria.

---

## 6. Suite de Micro-Animaciones y Componentes Cult UI / Watermelon UI

La plataforma web incorpora primitivas de interacción de alta factura visual para transformar la experiencia administrativa en un entorno fluido y agradable:

1. **`BotonConEstado`:** Botón inteligente de 4 fases (`reposo`, `cargando`, `exito`, `error`) con halo radial reactivo al puntero, compresión táctil y ráfaga de confeti.
2. **`BotonHalo`:** Proyector de luz de fondo concéntrica que sigue el movimiento del ratón con precisión milimétrica.
3. **`InsigniaPulsoVivo`:** Badge semántico con onda concéntrica continua en 5 variantes cromáticas (azul, turquesa, esmeralda, ámbar, coral).
4. **`IslaDinamica`:** Banner flotante superior adaptable con física de resorte (`spring`) para notificaciones contextuales y avisos del sistema.
5. **`TarjetaSpotlight`:** Contenedor de tarjeta con iluminación focalizada perimetral.
6. **`BordeLuminoso`:** Efecto Border Beam canónico que recorre el contorno de tarjetas clave con degradado continuo.
7. **`ContadorRodilloAnimado`:** Number ticker numérico que rueda con suavidad hasta alcanzar el valor numérico exacto de KPIs.
8. **`TextoRevelado`:** Efecto cinematográfico de revelación letra por letra para títulos y migas de pan.

---

## 7. Resumen de Seguridad, Validaciones Técnicas y Cumplimiento

1. **Anti-Spoofing y Geocercas:** La plataforma integra validaciones geodésicas en el frontend y backend mediante la fórmula de Haversine sobre el elipsoide WGS84, contrastando la posición declarada con las coordenadas registradas de las sedes de Diaconía con un radio de tolerancia de 60 a 100 metros.
2. **Cálculo Financiero Exacto:** Todos los cálculos del 80% de viáticos se gestionan internamente en centavos enteros (`INTEGER`) para evitar imprecisiones de coma flotante en bases de datos financieras y auditorías bancarias.
3. **Firmas y Trazabilidad:** Las actas de evaluación se convalidan mediante firmas manuscritas digitalizadas en formato Canvas HTML5, codificadas en Base64 e inmutables una vez archivadas.
4. **Catálogo Unificado de Errores `ERR-NNNN`:** Mensajes amigables y remediación orientada al usuario en 6 dominios de fallo (Autenticación, Asistencia, Pasajes, Eventos, Red y Sistema).
5. **Comunicación Reactiva WebSocket:** Canal en tiempo real con Socket.IO para sincronizar asistencias, pasajes, justificaciones y notificaciones sin recargas de página.
6. **Respeto a las Normas de Código:** Toda la plataforma se encuentra programada en español riguroso, observando la convención de nomenclatura corporativa (`snake_case` para variables y atributos, `camelCase` para métodos, `PascalCase` para componentes y clases, y `kebab-case` para archivos del proyecto).

---
*Fin del Documento Técnico — Ecosistema BUMAND 2026*


<div class="salto-pagina"></div>

# PARTE II: APLICACIÓN MÓVIL POR PANTALLAS


**Sistema de Gestión Móvil de Becarios, Asistencia Satelital y Viáticos**  
*Fundación Diaconía FRIF-IFD — Versión Móvil Flutter 3.x / Dart 3.x*

---

## 1. Resumen Ejecutivo y Arquitectura del Sistema Móvil

La aplicación móvil **BUMAND** (`bumand-movil`) ha sido desarrollada como un cliente nativo multiplataforma (Android, iOS y Web) utilizando el SDK de **Flutter** y el lenguaje **Dart**, bajo los principios de **Clean Architecture**, modularización por dominios de negocio y gestión reactiva del estado mediante **Flutter Riverpod (v3.x)**.

El sistema está concebido específicamente para el acompañamiento diario de los estudiantes becarios incorporados al programa de prácticas profesionales de la **Fundación Diaconía FRIF-IFD**, resolviendo cuatro desafíos operativos críticos:
1. **Control perimetral de asistencia por geolocalización**: Verificación rigurosa de presencia física en las 11 agencias autorizadas mediante la fórmula de Haversine y control activo anti-suplantación (*anti-spoofing*).
2. **Declaración mensual y liquidación de viáticos**: Registro de tramos urbanos (ida y vuelta) con captura de puntos de control GPS, liquidación exacta del 80% en centavos enteros, paradas frecuentes y cumplimiento de la regla institucional del día 24.
3. **Formación espiritual y acompañamiento devocional**: Sincronización diaria del versículo del día (RVR60), cola bíblica con resiliencia de 4 niveles, redacción de reflexiones y retroalimentación pastoral visible.
4. **Resiliencia offline y eventos geolocalizados**: Soporte de cola fuera de línea (`ColaOfflineServicio`), banner reactivo de sincronización, justificaciones formales y catálogo de errores estandarizado `ERR-NNNN`.

### 1.1. Matriz de Pantallas y Componentes del Ecosistema Móvil

| # | Identificador de Pantalla / Widget | Archivo Fuente (`lib/`) | Módulo / Dominio | Propósito Operativo Principal |
| :-: | :--- | :--- | :--- | :--- |
| **1** | `InicioSesionPantalla` | `modulos/autenticacion/pantallas/inicio-sesion-pantalla.dart` | Autenticación | Acceso perimetral seguro mediante credenciales corporativas, emisión de JWT y bienvenida devocional. |
| **2** | `RegistroPantalla` | `modulos/autenticacion/pantallas/registro-pantalla.dart` | Autenticación | Alta de cuenta para becarios pre-registrados en padrón con protección anti-pegado y validación de C.I. |
| **3** | `InicioPantalla` (`PantallaInicio`) | `modulos/inicio/pantallas/inicio-pantalla.dart` | Contenedor Raíz | Menú inferior Material 3 `NavigationBar`, `IndexedStack` (5 pestañas), `BannerConexion` y banner bloqueante de verificación mensual. |
| **4** | `AsistenciaPantalla` | `modulos/asistencia/pantallas/asistencia-pantalla.dart` | Asistencia GPS | Radar a 60 fps, detección de bloques, doble confirmación de viernes, cálculo de multas en tiempo real y llamada de lista rápida. |
| **5** | `ConfirmarDatosPantalla` | `modulos/asistencia/pantallas/confirmar-datos-pantalla.dart` | Asistencia / Viáticos | Ficha académica protegida con candado (universidad no editable por becario), editable solo datos de contacto ante orden mensual. |
| **6** | `PasajesPantalla` | `modulos/pasajes/pantallas/pasajes-pantalla.dart` | Viáticos (80%) | Histórico de formularios mensuales, regla del día 24, parseo numérico robusto y liquidación en centavos. |
| **7** | `DeclararRecorridoPantalla` | `modulos/pasajes/pantallas/declarar-recorrido-pantalla.dart` | Viáticos (80%) | Formulario de tramos, captura de PIN GPS satelital, selector de paradas rápidas y retorno automático. |
| **8** | `DevocionalesPantalla` | `modulos/devocionales/pantallas/devocionales-pantalla.dart` | Vida Espiritual | Feed de devocionales con cita bíblica destacada desde el inicio, transición Hero y retroalimentación pastoral. |
| **9** | `DialogoVersiculoDiario` | `modulos/devocionales/widgets/dialogo-versiculo-diario.dart` | Devocionales / Biblia | Modal con gradiente Diaconía, cita destacada, texto RVR60, reflexión de servicio y botón para redactar. |
| **10** | `ColaDescargaBibliaServicio` | `modulos/devocionales/servicios/cola-descarga-biblia-servicio.dart` | Biblia Offline | Resiliencia bíblica en 4 niveles (API -> Caché SharedPreferences -> Último versículo -> Catálogo de 8). |
| **11** | `EventosPantalla` | `modulos/eventos/pantallas/eventos-pantalla.dart` | Eventos Diaconía | Lista de convocatorias, marcación presencial satelital con Haversine y justificación directa. |
| **12** | `SolicitarJustificacionDialogo` | `modulos/justificaciones/widgets/solicitar-justificacion-dialogo.dart` | Justificaciones | Modal BottomSheet para justificar inasistencias por salud, academia o transporte con cola offline. |
| **13** | `NotificacionesPantalla` | `modulos/notificaciones/pantallas/notificaciones-pantalla.dart` | Alertas | Bandeja filtrable por categorías (salida, pasajes, avisos, multas transparentes y confirmación de organizador). |
| **14** | `HistorialAsistenciaPantalla` | `modulos/asistencia/pantallas/historial-asistencia-pantalla.dart` | Historial Unificado | Pantalla dividida en 3 subsecciones tabuladas: *Asistencias* (horas y bloques), *Pasajes* (80%) y *Multas e Incidencias* (retención institucional). |
| **15** | `MapaGeocercaBloquesWidget` | `modulos/asistencia/widgets/mapa-geocerca-bloques-widget.dart` | Geocercas | Radar geodésico interactivo con detección de bloques edilicios y alerta de penalidad por retraso. |

### 1.2. Guía de Instalación, Configuración y Encendido Móvil

Para ejecutar y probar la aplicación móvil de BUMAND en Flutter junto con su entorno:

#### 1. Requisitos Previos:
- **Flutter SDK:** v3.x (Canal `stable`) (`flutter --version`)
- **Dart SDK:** v3.x (`dart --version`)
- **Dispositivo o Emulador:** Android Studio Emulator, dispositivo físico USB con depuración habilitada, o Google Chrome (para depuración Web).
- **Backend NestJS Activo:** Corriendo en `http://localhost:3001` (o IP local de red para emuladores/dispositivos físicos).

#### 2. Preparación y Validación del Proyecto Móvil:
```bash
cd bumand-movil
flutter pub get    # Descarga e instala paquetes Dart
flutter analyze    # Análisis estático riguroso (0 errores, 0 advertencias)
flutter test       # Ejecución de 82/82 pruebas unitarias y de widgets (100% éxito)
```

#### 3. Modos de Ejecución y Encendido:
```bash
# Ver dispositivos disponibles
flutter devices

# Ejecutar en Emulador Android / Dispositivo físico
flutter run -d <id-dispositivo>

# Ejecutar en Modo Web de Depuración
flutter run -d chrome --web-port 8080

# Generar instalador APK para producción
flutter build apk --release
```

#### 4. Credenciales Semilla RBAC para Pruebas Móviles:
- **Estudiante Becaria (Acceso Predeterminado):** `nilda.churata@bumand.bo` | Clave: `Bumand2026!`
- **Supervisor Institucional:** `angel.ali@bumand.bo` | Clave: `Bumand2026!`
- **Administrador General:** `daniel234.davalos@gmail.com` | Clave: `Bumand2026!`

---

## 2. Pantalla 1: Inicio de Sesión (`InicioSesionPantalla`)

### 2.1. Vista General y Captura de Pantalla

![Pantalla de Inicio de Sesión Móvil](capturas/movil/01-inicio-sesion.png)

### 2.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado gestionado en `_InicioSesionPantallaState`.
- **Inyección de Estado:** Conectado a `autenticacion_proveedor` (`StateNotifierProvider<AutenticacionNotificador, EstadoAutenticacion>`).
- **Controladores y Recursos:**
  - `_correo_controlador` (`TextEditingController`): Captura y normalización del correo (`.trim()`).
  - `_contrasena_controlador` (`TextEditingController`): Captura de credencial sensible.
  - `_ocultar_contrasena` (`bool`): Conmutador de ofuscación de texto con ícono dinámico de visibilidad.
  - `dispose()`: Limpieza explícita de controladores de texto para evitar fugas de memoria en el árbol de widgets.
- **Flujo de Navegación y Disparo Espiritual:**
  - Al autenticar con éxito (`exito == true`), se ejecuta:
    `Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (_) => const PantallaInicio(mostrar_versiculo_inicio: true)), (_) => false)`.
    Esto purga la pila de navegación para impedir el retroceso al login y solicita automáticamente la apertura del diálogo de versículo diario de bienvenida.

### 2.3. Explicación Minuciosa de Funcionalidades

1. **Cabecera Institucional Inmersiva:**
   - Contenedor decorativo con degradado lineal institucional que combina **Azul Diaconía** (`#067CC1`) y **Turquesa Diaconía** (`#1EB5C4`), con terminación en radio curvo de 36 px.
   - Despliegue del logotipo vectorial oficial de BUMAND en blanco (`logo-bumand-blanco.svg`) acompañado de la cápsula de alta visibilidad de la **Fundación Diaconía FRIF-IFD** (`logo-diaconia.svg`) y la leyenda corporativa *"PROGRAMA CORPORATIVO DE BECARIOS"*.
2. **Tarjeta Flotante de Acceso:**
   - Tarjeta en color blanco puro (`#FFFFFF`) con elevación suave de 24 px (`BoxShadow` con dispersión de 8 px y opacidad de 6%), garantizando contraste sobre el fondo perimetral (`#EFF3F8`).
3. **Campos de Entrada Estilizados (`_construirCampoTexto`):**
   - Inputs encapsulados con esquinas redondeadas de 30 px y borde sutil (`#E3E9F2`).
   - Icono prefijo encapsulado en un contenedor tintado al 10% del color azul Diaconía.
   - Visibilidad alternable de la contraseña mediante `IconButton` sufijo.
4. **Validación Previa Local y Manejo de Errores Reactivo:**
   - Verificación de campos obligatorios en el cliente antes de disparar la petición HTTP, previniendo tráfico innecesario.
   - Si el backend rechaza las credenciales, se renderiza un contenedor de advertencia en tono carmesí suave (`Colors.red.shade50`) con borde, código `ERR-1001` e ícono de advertencia.
5. **Botón de Ingreso con Indicador de Progreso:**
   - Botón elevado con estado de carga integrado (`CircularProgressIndicator` en color blanco de 22 px) que deshabilita los eventos de toque mientras la promesa HTTP está pendiente.
6. **Enlace Directo a Registro:**
   - Acceso inferior *"¿No tienes una cuenta? Regístrate"* que limpia errores residuales en el proveedor y navega hacia `RegistroPantalla`.

### 2.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Autenticación** | Envía petición `POST /autenticacion/inicio-sesion` con correo institucional y contraseña. Deserializa el modelo `UsuarioModelo` y persiste `token`, `usuario_id`, `usuario_nombre`, `usuario_correo` y `usuario_rol` en `SharedPreferences`. | No almacena contraseñas en texto claro en el dispositivo; únicamente conserva el token JWT criptográfico emitido por el servidor. |
| **Navegación** | Redirige de forma atómica a `PantallaInicio` destruyendo el historial previo para asegurar la sesión. | No permite acceder a rutas internas de la aplicación sin un token JWT válido o una sesión activa comprobada. |
| **Recuperación** | Muestra avisos de error devueltos por el servidor cuando las credenciales no coinciden con códigos `ERR-1001`. | No cuenta con autorecuperación de clave por SMS o correo no corporativo; los restablecimientos deben solicitarse formalmente a la administración de Diaconía FRIF-IFD. |
| **Conectividad** | Captura excepciones de red y muestra mensajes legibles en caso de tiempo de espera agotado. | No permite inicio de sesión en modo offline o fuera de línea (requiere validación perimetral con el backend). |

---

## 3. Pantalla 2: Registro de Cuenta de Becario (`RegistroPantalla`)

### 3.1. Vista General y Captura de Pantalla

![Pantalla de Registro de Becario Móvil](capturas/movil/02-registro.png)

### 3.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado `_RegistroPantallaState`.
- **Inyección de Estado:** Conectado a `autenticacion_proveedor.notifier` mediante el método `registrar(ci, correo, contrasena)`.
- **Controladores y Ciclo de Vida:**
  - `_ci_controlador`: Cédula de identidad (restringida a teclado numérico).
  - `_correo_controlador`: Correo institucional.
  - `_confirmar_correo_controlador`: Confirmación de correo (con control de selección interactiva).
  - `_contrasena_controlador` y `_confirmar_controlador`: Contraseña y su verificación.
  - **Método `dispose()`:** Cierre y desasignación rigurosa de los 5 controladores al destruir la vista.

### 3.3. Explicación Minuciosa de Funcionalidades

1. **Validación Estricta de Cédula de Identidad:**
   - Expresión regular: `r'^\d{5,10}$'`.
   - Obliga al becario a ingresar únicamente los dígitos de su C.I. sin adición de extensiones departamentales (por ejemplo, `10028341` es aceptado; `10028341-LP` es rechazado con el mensaje *"Escribe tu CI solo con números, sin la extensión"*).
2. **Protección Anti-Pegado (*Anti-Paste*) en Confirmación de Correo:**
   - La propiedad `enableInteractiveSelection: false` (`deshabilitar_pegar: true`) deshabilita los menús contextuales de cortar, copiar y pegar del sistema operativo.
   - **Razón institucional:** Exige la digitación manual y consciente del correo electrónico para evitar que el becario copie y pegue un correo mal escrito en ambos campos, lo cual dejaría la cuenta irrecuperable.
3. **Validación Sintáctica de Correo Electrónico:**
   - Verificación de formato estándar RFC con `r'^[^\s@]+@[^\s@]+\.[^\s@]+$'` y comparación insensible a mayúsculas/minúsculas entre ambos campos.
4. **Política de Robustez de Contraseña:**
   - Exigencia de longitud mínima de 6 caracteres y coincidencia exacta con el campo de confirmación.
5. **Condición de Alta Vinculada al Padrón Institucional:**
   - Banner orientativo superior que aclara que el registro solo prosperará si el C.I. ya ha sido cargado previamente por el Administrador General en el padrón de becarios activos de Diaconía FRIF-IFD.

### 3.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Alta de Usuario** | Consume el endpoint `POST /autenticacion/registro`. Si el CI existe en el padrón y no tiene usuario asociado, vincula la cuenta, emite el JWT y entra automáticamente a la app. | No permite el auto-registro libre de personas ajenas a la institución; si el C.I. no figura en la base de datos de becarios aprobados, el servidor rechaza la solicitud. |
| **Entrada de Datos** | Bloquea el pegado de texto en el campo de confirmación de correo electrónico. | No permite caracteres alfanuméricos, guiones ni espacios en el documento de identidad. |
| **Seguridad de Datos** | Transmite la contraseña cifrada sobre canal seguro HTTPS/TLS y la coteja mediante hashing seguro (Bcrypt en backend). | No almacena respuestas de formulario incompletas ni envía datos si la validación sintáctica falla en el cliente. |

---

## 4. Pantalla 3: Menú Principal y Contenedor Raíz (`PantallaInicio` / `InicioPantalla`)

### 4.1. Vista General y Captura de Pantalla

![Pantalla Principal con Contenedor de Navegación](capturas/movil/03-pantalla-inicio.png)

### 4.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado `_InicioPantallaState`.
- **Patrón de Preservación de Estado:** Uso de `IndexedStack` sobre la lista ampliada de 5 pantallas canónicas:
  ```dart
  static const _pantallas = [
    AsistenciaPantalla(),
    PasajesPantalla(),
    DevocionalesPantalla(),
    EventosPantalla(),
    NotificacionesPantalla(),
  ];
  ```
- **Importancia Arquitectónica del `IndexedStack`:**
  A diferencia de un `PageView` o una navegación por reemplazo de rutas, `IndexedStack` mantiene vivos en el árbol de elementos los estados internos de las cinco pantallas. Esto impide que el estado del radar GPS de asistencia, los borradores de pasajes o los textos devocionales se destruyan al alternar de pestaña, ahorrando reconexiones satelitales y lecturas redundantes a la API.
- **`BannerConexion` Global Superior:**
  Widget dinámico colocado en la parte superior que detecta el estado de la red, notifica cuántas peticiones se encuentran pendientes en `ColaOfflineServicio` (`N en cola`) y permite forzar su sincronización manual con un toque.
- **Sincronización Silenciosa Bíblica:**
  Al iniciar la vista, ejecuta en segundo plano `ColaDescargaBibliaServicio.sincronizarColaDescarga()` para garantizar la disponibilidad offline del devocional.

### 4.3. Explicación Minuciosa de Funcionalidades

1. **Barra de Navegación Material 3 (`NavigationBar`):**
   - Implementa la especificación moderna de Material Design 3 con fondo blanco (`BumandColores.BLANCO`) y cápsula indicadora translúcida con tono azul Diaconía al 20%.
   - Cinco destinos conmutables:
     - **Pestaña 0 — Asistencia:** Ícono de huella digital (`Icons.fingerprint`).
     - **Pestaña 1 — Pasajes:** Ícono de transporte público (`Icons.directions_bus`).
     - **Pestaña 2 — Devocionales:** Ícono de libro abierto / biblia (`Icons.auto_stories`).
     - **Pestaña 3 — Eventos:** Ícono de calendario de encuentros (`Icons.event_available`).
     - **Pestaña 4 — Notificaciones:** Ícono de campana (`Icons.notifications`) con badge dinámico de no leídas.
2. **Parametrización de Índice Inicial:**
   - La propiedad `indice_inicial` permite arrancar directamente en una pestaña específica durante flujos de navegación profunda o previsualización.

### 4.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Ciclo de Vida** | Mantiene en memoria el estado y posición de desplazamiento (*scroll*) de las 5 pantallas hijas mediante `IndexedStack`. | No destruye los widgets inactivos para reconstruirlos cada vez que el usuario pulsa una pestaña. |
| **Badge Reactivo** | Refleja en tiempo real las notificaciones no leídas y actualiza el contador cuando el becario las abre. | No muestra badges numéricos en pestañas que no poseen eventos pendientes. |
| **Banner Offline** | Visualiza de inmediato si el móvil está sin conexión y cuántas solicitudes están encoladas. | No bloquea la navegación si no hay internet; permite operar localmente y encolar transacciones. |

---

## 5. Pantalla 4: Registro de Asistencia Satelital (`AsistenciaPantalla`)

### 5.1. Vista General y Captura de Pantalla

![Pantalla de Marcación de Asistencia con Radar GPS](capturas/movil/04-asistencia.png)

### 5.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con `SingleTickerProviderStateMixin` para el manejo de animaciones continuas.
- **Controlador de Animación:**
  - `_controlador_pulso`: `AnimationController(duration: const Duration(milliseconds: 2200), vsync: this)..repeat()`.
  - Genera un ciclo infinito de 2.2 segundos que alimenta a `_RadarPintor` (`CustomPainter`) a 60 fotogramas por segundo (fps).
- **Inyección de Proveedores Riverpod:**
  - `perfil_proveedor`: Obtiene la sede asignada al becario con sus coordenadas geodésicas (`latitud`, `longitud`) y el radio métrico de tolerancia.
  - `historial_asistencia_proveedor`: Consulta la lista cronológica de marcaciones previas (fecha, hora de ingreso, hora de salida y tipo de jornada).
  - `asistencia_notificador_proveedor`: Ejecuta las acciones de marcación (`registrarIngreso`, `registrarSalida`) y gestiona los estados de carga asíncrona (`AsyncLoading`).

### 5.3. Explicación Minuciosa de Funcionalidades

1. **Radar de Geocerca Animado a 60 fps con Detección de Bloques (`MapaGeocercaBloquesWidget`):**
   - El lienzo `CustomPaint` dibuja tres ondas circulares concéntricas que se expanden armónicamente desde el centro (radio base de 26 px hasta el borde exterior).
   - **Detección Dinámica de Bloques:** Evalúa la ubicación perimétrica identificando sub-bloques del edificio institucional (ej. *Bloque Norte - Auditorio*, *Bloque Central - Aulas*, *Bloque Sur - Biblioteca*), etiquetando la marcación con el recinto exacto.
   - Codificación cromática de estados:
     - **Azul Diaconía (`#067CC1`):** Estado de escaneo activo y adquisición de satélites GPS.
     - **Verde Esmeralda (`#10B981`):** Becario ubicado dentro de la geocerca autorizada. El centro exhibe el ícono `Icons.check_circle_rounded`. Dispara `HapticFeedback.lightImpact()`.
     - **Rojo Carmín (`#EF4444`):** Becario fuera de rango. El centro exhibe `Icons.location_off_rounded`.
2. **Cálculo Geodésico Haversine y Radio Elástico:**
   - La distancia métrica se calcula mediante `Geolocator.distanceBetween(lat1, lon1, lat2, lon2)` sobre el elipsoide WGS84.
   - Fórmula de tolerancia elástica:
     > **Condición Geodésica:** **Distancia Efectiva ≤ Radio de Sede + Margen de Precisión**
     
     Donde el margen se obtiene ajustando la precisión del sensor (`posicion.accuracy.clamp(0.0, 10.0)`). Esto evita que un becario físicamente presente en la puerta de la sede sea rechazado debido a la fluctuación natural de la señal satelital en cañones urbanos o días nublados.
3. **Doble Confirmación en Viernes y Alertas de Multa:**
   - Para Escuela de Líderes (Viernes 14:30), si la marcación se efectúa pasadas las 14:35 (5 min de tolerancia), el sistema computa y proyecta en tiempo real la multa de **Bs 10 por cada minuto de retraso**.
   - Tras el registro GPS, el estado conmuta a: *"Marcación GPS registrada. Pendiente de confirmación por llamada de lista del organizador"*.
   - **Modal de Llamada de Lista Rápida:** Si el usuario autenticado es supervisor/organizador en el evento, dispone de un botón flotante para desplegar la lista presencial y convalidar en lote a los becarios que se encuentran en sala.
4. **Catálogo de las 11 Agencias de Diaconía:**
   - Reconoce la presencia del becario en cualquiera de las sedes oficiales (Oficina Central El Alto, La Paz San Pedro, Chasquipampa, Viacha, Laguna San Pedro, Puente Seco, Franz Tamayo, Villa Dolores, Senkata, Río Seco, Ciudad Satélite).
5. **Mecanismo Anti-Suplantación (*Anti-Spoofing*):**
   - `if (posicion.isMocked) return false;`
   - Si el sistema operativo Android o iOS reporta que las coordenadas provienen de una aplicación de ubicación simulada (*Fake GPS* o modo desarrollador), el radar se bloquea automáticamente, la marcación es invalidada y se remite el indicador `"simulada": true`.
6. **Celebración y Ráfaga de Confeti:**
   - Al marcar asistencia con éxito, se dispara una ráfaga de confeti animada (`RafagaCelebracion`) y vibración táctil de confirmación.
7. **Respaldo Fuera de Línea:**
   - Si el becario no cuenta con cobertura celular al marcar en la agencia, la asistencia se almacena automáticamente en `ColaOfflineServicio` para su emisión diferida.

### 5.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Geovalidación** | Evalúa la distancia esférica y detecta el bloque de edificio específico. | No permite la marcación si el becario se encuentra a una distancia superior al radio configurado. |
| **Doble Confirmación** | Requiere el paso de lista presencial del organizador para validar la presencia en eventos de viernes. | No acredita horas completas de Escuela de Líderes sin el visto bueno de lista del supervisor. |
| **Cómputo de Multas** | Transparenta en vivo la penalidad de Bs 10/minuto pasadas las 14:35 de los viernes hacia adelante. | No aplica sanciones retroactivas a eventos o viernes anteriores a la fecha del cambio. |
| **Integridad Satelital** | Identifica coordenadas simuladas mediante `posicion.isMocked` y las rechaza en el acto. | No admite el uso de emuladores con *mock locations* ni herramientas de suplantación de GPS en el dispositivo. |
| **Persistencia** | Envía latitud, longitud, precisión, bloque y tipo al endpoint `/asistencia/ingreso` con sellado de tiempo de servidor. | No permite alterar manualmente la hora de entrada o salida; el timestamp es estampado de manera soberana por el servidor central. |

---

## 6. Pantalla 5: Confirmación de Ficha Universitaria (`ConfirmarDatosPantalla`)

### 6.1. Vista General y Captura de Pantalla

![Pantalla de Confirmación de Datos del Becario](capturas/movil/05-confirmar-datos.png)

### 6.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado `_ConfirmarDatosPantallaState`.
- **Inyección de Proveedores:**
  - `perfil_proveedor`: Suministra los datos de expediente académico del estudiante.
  - `asistencia_notificador_proveedor.notifier`: Ejecuta la confirmación oficial del periodo (`confirmarDatosPasajes`) y actualización de contacto.

### 6.3. Explicación Minuciosa de Funcionalidades

1. **Bloqueo Institucional de Atributos Académicos (Candado de Seguridad):**
   - Los campos de trayectoria institucional y eclesiástica se presentan con indicador visual de candado y permanecen estrictamente deshabilitados para el becario:
     - *Estudiante:* Nombre y apellidos inmutables.
     - *C.I.:* Documento de identidad no modificable.
     - *Universidad y Carrera:* Casa de estudios superiores protegida contra edición para evitar alteraciones en convenios de Diaconía. Únicamente el Administrador General puede modificarlos desde la web.
     - *Lugar de prácticas e Iglesia:* Sede y congregación oficiales fijadas por administración.
2. **Campos Editables por el Becario:**
   - El estudiante únicamente tiene habilitada la edición de sus canales de contacto personal:
     - Teléfono celular y WhatsApp.
     - Dirección domiciliaria.
     - Contacto de emergencia y parentesco.
3. **Flujo de Verificación Mensual Obligatorio ("Por órdenes"):**
   - Cuando la administración emite la orden periódica de actualización de datos, se activa un banner modal bloqueante que exige al becario revisar sus datos de contacto y presionar *"Confirmar datos"* para renovar la vigencia mensual.
4. **Confirmación del Periodo de Viáticos:**
   - Al pulsar *"Confirmar datos"*, se despacha `POST /pasajes/confirmar-datos` vinculando el periodo mensual (`AAAA-MM`), requisito previo para la declaración y cobro de viáticos.

### 6.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Edición Académica** | Bloquea la edición de Universidad, Carrera y Sede con candado de solo lectura. | No permite que el becario altere su universidad ni cambie de carrera desde la app móvil. |
| **Datos de Contacto** | Permite actualizar teléfono, dirección y contactos de emergencia del becario. | No permite dejar campos de contacto obligatorios vacíos o con números inválidos. |
| **Vínculo con Pasajes** | Habilita el periodo mensual correspondiente tras confirmar datos para declarar transporte. | No aprueba el desembolso financiero; únicamente certifica la vigencia de los datos del becario para ese mes. |

---

## 7. Pantalla 6: Gestión y Declaración de Pasajes (`PasajesPantalla`)

### 7.1. Vista General y Captura de Pantalla

![Pantalla de Historial de Pasajes y Viáticos del 80%](capturas/movil/06-pasajes.png)

### 7.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado `_PasajesPantallaState`.
- **Inyección de Proveedor:**
  - `solicitudes_pasajes_proveedor`: `AsyncNotifierProvider` que gestiona la lista `List<SolicitudPasajeModelo>`.
  - Métodos asociados: `cargarSolicitudes()`, `eliminarRecorrido(id)` y `enviarSolicitud(id)`.
- **Parseo Numérico Tolerante:**
  - `recorrido-modelo.dart` y `solicitud-pasaje-modelo.dart` incorporan `_parsearDouble` y `_parsearMonto`, garantizando inmunidad ante columnas de Postgres que retornen montos como strings.
- **Ciclo de Refresco:**
  - `RefreshIndicator` integrado para recargar los datos mediante gesto de deslizamiento vertical.
  - Al retornar de la pantalla de creación (`DeclararRecorridoPantalla`), si se guardó un nuevo tramo (`guardado == true`), se dispara una recarga automática del estado.

### 7.3. Explicación Minuciosa de Funcionalidades

1. **Regla Institucional Inflexible del Día 24:**
   - La Fundación Diaconía FRIF-IFD establece que ningún becario puede despachar su formulario mensual de viáticos antes del día 24 de cada mes, garantizando que los traslados de las últimas semanas queden incluidos.
   - En `FormatoPasajes.puedeEnviar(periodo)` se evalúa la fecha del calendario:
     ```dart
     static bool puedeEnviar(String periodo_str) {
       final hoy = DateTime.now();
       return !DateTime(hoy.year, hoy.month, hoy.day).isBefore(fechaHabilitada(periodo_str));
     }
     ```
   - Si la fecha actual es anterior al día 24, el botón *"Enviar formulario mensual"* aparece deshabilitado y se despliega la advertencia: *"Se habilita el 24/MM/AAAA para el envío del formulario."*.
2. **Liquidación Exacta del 80% en Centavos Enteros:**
   - La pantalla muestra el total bruto declarado y el monto neto reembolsable (80% reglamentario):
     - *Ejemplo en preparación:* Total declarado: Bs 7.00 → Devolución (80%): Bs 5.60 (verde institucional).
     - *Ejemplo aprobado:* Total declarado: Bs 420.00 → Devolución (80%): Bs 336.00.
   - Se procesa en centavos exactos para evitar discrepancias contables en auditorías bancarias.
3. **Flujo de Estados de Solicitud:**
   - *Borrador / "En preparación" (Gris):* El becario puede agregar o eliminar tramos individuales libremente.
   - *Pendiente / "En revisión" (Naranja):* Formulario enviado al supervisor. Los tramos quedan bloqueados contra edición.
   - *Aprobado / "Aprobado" (Verde):* Formulario firmado y convalidado para desembolso financiero.
   - *Rechazado / "Con observaciones" (Rojo):* Devuelto por el supervisor con una nota explicativa visible. Se reabre la edición para subsanar los tramos cuestionados.
4. **Desglose Desplegable de Tramos (`ExpansionTile`):**
   - Lista expandible que detalla cada trayecto con flecha orientativa (naranja para Ida, azul para Vuelta), origen, destino, fecha, monto en bolivianos y el indicador 📍 con ubicación si se capturó con coordenadas satelitales.
   - Botón de eliminación directa (`Icons.delete_outline`) activo exclusivamente en estado borrador.
5. **Botón Flotante de Declaración de Recorrido:**
   - Botón de acción flotante extendido (`FloatingActionButton.extended`) en color crema suave que redirige al formulario de tramos.

### 7.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Cumplimiento Día 24** | Bloquea de manera absoluta el envío del formulario al mentor hasta que el reloj del sistema alcance el día 24 del mes. | No permite saltarse la fecha límite ni adelantar la liquidación mensual antes del día 24. |
| **Cálculo del 80%** | Calcula automáticamente la devolución al 80% en centavos sobre el total acumulado de pasajes. | No permite solicitar el 100% del costo del pasaje (el 20% es contraparte formativa del becario). |
| **Edición de Tramos** | Permite registrar y borrar tramos de transporte mientras la solicitud permanezca en borrador o rechazada. | No permite alterar ni borrar tramos una vez que el formulario ha sido remitido o aprobado por el supervisor. |
| **Auditoría de Rechazos** | Muestra en un recuadro destacado la observación enviada por el mentor en caso de rechazo del formulario. | No permite reenviar un formulario rechazado sin haber corregido previamente los tramos observados. |

---

## 8. Pantalla 7: Declaración de Tramos de Recorrido (`DeclararRecorridoPantalla`)

### 8.1. Vista General y Captura de Pantalla

![Pantalla de Declaración de Tramos con PIN GPS](capturas/movil/07-declarar-recorrido.png)

### 8.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado `_DeclararRecorridoPantallaState`.
- **Gestión de Formularios:** `GlobalKey<FormState>` con validación sincronizada de campos de texto y tarifas.
- **Selector de Paradas Rápidas (`_SelectorParadasRapidas`):** Chips de autocompletado para paradas emblemáticas de La Paz y El Alto (Oficina Central Diaconía, Ceja El Alto, Pérez Velasco, Villa Adela, Senkata, Sopocachi, Obrajes).
- **Memoria Operativa Local con SharedPreferences:**
  - Persiste el último origen (`_CLAVE_ORIGEN`), último destino (`_CLAVE_DESTINO`) y tarifas habituales (`_CLAVE_TARIFA_IDA`, `_CLAVE_TARIFA_VUELTA`).
  - Al abrir la pantalla, se recuperan automáticamente los trayectos previos mediante `_cargarUltimoRecorrido()`, ahorrando tiempo al becario en sus rutas cotidianas de práctica.
- **Ciclo de Vida:** Registro de escuchadores (`addListener`) sobre los controladores para recalcular el 80% en tiempo real, con desecho metódico en `dispose()`.

### 8.3. Explicación Minuciosa de Funcionalidades

1. **Captura Satelital con Botón PIN GPS (📍):**
   - Dispone de botones dedicados para fijar las coordenadas exactas de la parada:
     - *"📍 Fijar PIN GPS de origen actual"*
     - *"📍 Fijar PIN GPS de destino actual"*
   - Al presionarlo, el sensor satelital se activa, valida que la ubicación no sea simulada (`!posicion.isMocked`) y graba la latitud y longitud con 5 decimales de precisión (ej. `-16.52000, -68.18000`) junto con el error métrico estimado (±5 m).
   - El estado visual conmuta a una cápsula verde con botón de remoción rápida (ícono `Icons.close`).
2. **Conmutador de Retorno Automático ("2. Vuelta"):**
   - Selector `SwitchListTile` activado por defecto que invierte automáticamente el trayecto (`Destino → Origen`).
   - Al pulsar *"Guardar ida y vuelta"*, la aplicación registra dos registros de base de datos encadenados en una única operación atómica, duplicando la agilidad del registro diario.
3. **Selector Nativo de Fecha de Recorrido:**
   - Componente `SeleccionadorFecha` que restringe el calendario a los últimos 60 días (dos meses hacia atrás) y bloquea fechas futuras.
4. **Calculadora Dinámica del 80% (`_ResumenDevolucion`):**
   - Suma en tiempo real la tarifa de ida y de vuelta, y calcula inmediatamente la devolución del 80% visible en una tarjeta verde antes de presionar guardar.
5. **Validación de Límites de Tarifa y Texto:**
   - La tarifa máxima admitida es de Bs 50.00 por tramo, protegiendo al sistema contra equivocaciones numéricas involuntarias (ej. digitar 250 en lugar de 2.50).
   - El campo *"Apoyo realizado"* exige un mínimo de 3 caracteres y un máximo de 255 caracteres para describir las tareas ejecutadas (ej. *"Control de carpetas CAEDEC"*, *"Envío de reportes"*).

### 8.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Georreferenciación** | Registra las coordenadas GPS exactas (latitud y longitud) en las paradas de transporte público. | No requiere obligatoriamente el PIN GPS si el becario declara el tramo desde su domicilio o aula sin conexión satelital (es opcional pero otorga prioridad de auditoría). |
| **Control Tarifario** | Valida que la tarifa sea mayor a cero y no sobrepase el techo institucional de Bs 50.00 por tramo. | No admite tarifas negativas ni cobros comerciales no regulados que excedan el límite de transporte urbano. |
| **Fechas de Declaración** | Permite declarar traslados efectuados en el mes en curso y hasta dos meses anteriores. | No permite declarar recorridos en fechas futuras (el calendario bloquea días posteriores al actual). |
| **Automatización** | Guarda en memoria la ruta habitual para evitar tipear el mismo origen y destino todos los días. | No guarda información si el formulario presenta errores de validación en cualquiera de los tramos. |

---

## 9. Pantalla 8: Vida Devocional y Versículo Diario (`DevocionalesPantalla` & `DialogoVersiculoDiario`)

### 9.1. Propósito y Componentes

Módulo formativo centrado en la edificación espiritual y el servicio diaconal del becario:
- **`DevocionalesPantalla`:** Feed de devocionales registrados, estilizado con tarjetas interactivas de efecto foco (`TarjetaSpotlight`).
- **Transición Hero y Acompañamiento Pastoral:** Al pulsar sobre una tarjeta, se expande con animación morfológica Hero revelando la reflexión completa, motivo de oración y la respuesta pastoral oficial (`comentario_pastoral`) destacada en verde eclesiástico.
- **Creación Asistida con Confeti:** Diálogo modal inferior para registrar fecha, cita bíblica, título, meditación y petición. Al pulsar guardar, dispara una ráfaga de confeti (`RafagaCelebracion`) y retroalimentación háptica.
- **`DialogoVersiculoDiario`:** Modal emergente automático post-login con gradiente institucional Diaconía (`#0A3055` a `#17B4C4`), cita destacada, texto bíblico en cursiva RVR60 y reflexión de servicio diaconal con botón directo para redactar devocional.

### 9.2. Servicio de Cola Bíblica Offline en 4 Niveles (`ColaDescargaBibliaServicio`)

Garantiza la disponibilidad inmediata del versículo del día sin importar las condiciones de conectividad:
1. **Nivel 1 (API REST):** Consulta en línea al endpoint `/biblia/versiculo-diario`.
2. **Nivel 2 (Caché Offline):** Recupera el paquete completo de 15 versículos descargado en `SharedPreferences` (`/biblia/paquete-offline`).
3. **Nivel 3 (Último Persistido):** Muestra el último versículo visualizado exitosamente en el dispositivo.
4. **Nivel 4 (Catálogo Diaconal Inmutable):** 8 pasajes bíblicos canónicos precargados en memoria (Filipenses 4:13, Proverbios 3:5-6, Colosenses 3:23-24, Josué 1:9, Gálatas 6:9, Isaías 40:31, Miqueas 6:8, Salmos 119:105).

### 9.3. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Edificación Espiritual** | Provee lectura bíblica diaria contextualizada al servicio diaconal y ético. | No descarga biblias completas de 66 libros en el almacenamiento del teléfono. |
| **Interacción Pastoral** | Permite leer las retroalimentaciones y consejos espirituales del pastor asignado. | No funciona como chat bidireccional; es un canal de orientación espiritual formativa. |
| **Resiliencia** | Funciona de manera autónoma sin señal gracias a la resiliencia en 4 niveles. | No interrumpe la navegación del usuario si el servidor bíblico externo presenta latencia. |

---

## 10. Pantalla 9: Eventos Geolocalizados y Justificaciones (`EventosPantalla` & `SolicitarJustificacionDialogo`)

### 10.1. Propósito y Componentes

Módulo de asistencia a encuentros y gestión formal de incidencias:
- **`EventosPantalla`:** Convocatorias institucionales a talleres, retiros y asambleas.
- **Marcación Presencial con Geocerca:** Compara la posición del becario contra las coordenadas del evento usando Haversine. Si está dentro, marca `PRESENTE`; si está fuera, asigna `FUERA_DE_RADIO` para posterior auditoría.
- **`SolicitarJustificacionDialogo`:** Hoja modal inferior (`ModalBottomSheet`) para justificar inasistencias o tardanzas en prácticas o eventos:
  - Selector de motivo institucional: *Corte de ruta / Paro*, *Emergencia médica*, *Trámite académico*, *Otro*.
  - Justificación escrita obligatoria (mínimo 10 caracteres).
  - Encolamiento fuera de línea en `ColaOfflineServicio` si no hay internet.

### 10.2. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Eventos** | Valida asistencia satelital y calcula la distancia métrica al evento. | No permite a los becarios crear ni cancelar convocatorias desde el móvil. |
| **Justificaciones** | Formaliza descargos que alimentan la bandeja administrativa para dictamen del supervisor. | No permite adjuntar fotografías o certificados médicos en esta versión. |

---

## 11. Pantalla 10: Centro de Notificaciones y Alertas (`NotificacionesPantalla`)

### 11.1. Vista General y Captura de Pantalla

![Pantalla de Notificaciones y Alertas](capturas/movil/08-notificaciones.png)

### 11.2. Arquitectura de Componentes, Riverpod y Ciclo de Vida

- **Tipo de Widget:** `ConsumerStatefulWidget` con estado `_NotificacionesPantallaState`.
- **Inyección de Proveedores Riverpod:**
  - `notificaciones_notificador_proveedor`: `AsyncNotifierProvider` que gestiona `List<NotificacionModelo>`, encargado de recargar la lista y marcar notificaciones como leídas mediante `marcarComoLeida(id)`.
  - `notificaciones_conteo_proveedor`: Mantiene sincronizado el número de avisos no leídos en el badge del menú inferior.
- **Filtrado Reactivo en Cliente:**
  - La propiedad `_filtro_actual` conmuta entre `"todas"`, `"salida"`, `"pasajes"` y `"evaluacion"`, procesando la lista en memoria sin latencia de red.

### 11.3. Explicación Minuciosa de Funcionalidades

1. **Barra Superior Institucional con Acciones:**
   - Despliegue de los logotipos institucionales y botón de actualización manual (`Icons.refresh`) en la barra superior.
2. **Chips de Filtrado Horizontal (`ChoiceChip`):**
   - *Todas:* Consolida el feed completo de eventos.
   - *Recordatorios:* Avisos de marcación de salida al concluir las horas de práctica.
   - *Pasajes:* Novedades sobre aprobación, observación o liquidación del 80% de viáticos.
   - *Multas e Incidencias:* Notificaciones automáticas ante penalizaciones de Bs 10/minuto por retrasos en viernes, detallando minutos y valor retenido.
   - *Evaluaciones y Avisos:* Convalidaciones de notas semestrales y confirmaciones de llamada de lista de organizador.
3. **Diseño Visual de Tarjetas con Señalización de Estado (`_TarjetaNotificacion`):**
   - Cada tarjeta posee una configuración semántica según su categoría:
     - *Recordatorio de salida:* Fondo azul claro (`#E0F2FE`), ícono de reloj alarma (`Icons.alarm_on_rounded`) y etiqueta azul.
     - *Pasajes observados / aprobados:* Fondo ámbar suave (`#FEF3C7`), ícono de advertencia (`Icons.warning_amber_rounded`) y etiqueta naranja.
     - *Multas de Viernes:* Fondo rojo salmón suave (`#FEE2E2`), ícono de penalidad y etiqueta roja institucional con detalle en Bs.
     - *Evaluación:* Fondo lavanda (`#F3E8FF`), ícono de revisión de calificaciones (`Icons.rate_review_outlined`) y etiqueta violeta.
     - *Aviso institucional:* Fondo gris pizarra (`#F1F5F9`) con campana.
4. **Indicador de Lectura y Desvanecimiento Visual:**
   - Las notificaciones no leídas presentan un borde destacado con el color de su categoría y un punto circular (*dot*) en la esquina superior derecha.
   - Al pulsar la tarjeta, se ejecuta `marcarComoLeida(id)`, la tarjeta adopta fondo blanco neutro y el badge del menú inferior descuenta el ítem en tiempo real.
5. **Vista Vacía Contextual (`_VistaVacia`):**
   - Si no existen notificaciones en la categoría seleccionada, se muestra una ilustración vectorial con el texto *"No hay notificaciones pendientes"*, orientando al usuario de acuerdo al filtro activo.

### 11.4. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Categorización** | Clasifica los mensajes según su tipología de negocio (asistencia, viáticos, multas, avisos de organizador). | No mezcla eventos administrativos globales que corresponden exclusivamente a administradores o supervisores. |
| **Estado de Lectura** | Sincroniza con el backend `PUT /notificaciones/:id/leida` para actualizar el contador en todos los dispositivos del becario. | No borra permanentemente las alertas del servidor; permanecen en el historial para auditoría del estudiante. |
| **Interacción** | Permite filtrar instantáneamente y refrescar mediante deslizamiento vertical (*pull-to-refresh*). | No envía notificaciones de chat persona a persona (es un canal unidireccional de alertas institucionales). |

---

## 12. Pantalla 11: Historial Unificado en Tres Subsecciones Tabuladas (`HistorialAsistenciaPantalla`)

### 12.1. Vista General y Captura de Pantalla

![Pantalla de Historial Unificado en Tres Subsecciones](capturas/movil/09-historial-asistencia.png)

### 12.2. Propósito y Componentes
Pantalla integral de auditoría personal del becario estructurada en **tres subsecciones tabuladas independientes** mediante un selector segmentado `TabBar`, eliminando la mezcla confusa con evaluaciones académicas:

1. **Pestaña 1 — Asistencias:**
   - Lista cronológica detallada de jornadas laborales y de servicio.
   - Tarjetas informativas con fecha, hora de entrada, hora de salida y cálculo de horas prácticas acreditadas.
   - Identificación del bloque edilicio detectado (*Bloque Norte*, *Bloque Central*, *Bloque Sur*).
   - Distintivo visual (badge) especial para días viernes indicando si la asistencia ya cuenta con la **doble confirmación presencial del organizador** (`confirmado_organizador`).
2. **Pestaña 2 — Pasajes y Viáticos:**
   - Historial consolidado mensual de solicitudes de viáticos.
   - Desglose del total erogado declarado por el estudiante y la liquidación del **80% de devolución reglamentaria** en bolivianos (`Bs`).
   - Chips semánticos de estado institucional: `APROBADO`, `EN REVISIÓN`, `OBSERVADO` o `PAGADO`.
3. **Pestaña 3 — Multas e Incidencias:**
   - Banner superior informativo y transparente aclarando que las penalidades constituyen retenciones disciplinarias que quedan para la institución.
   - Indicadores KPI con total acumulado retenido en Bs y cantidad de minutos de tardanza.
   - Desglose por evento de viernes (Escuela de Líderes), hora exacta de llegada y cómputo de Bs 10 por minuto pasadas las 14:35.

### 12.2. Desacoplamiento de Evaluaciones
Las evaluaciones semestrales fueron completamente extraídas del historial general para residir en su módulo independiente (`EvaluacionesPantalla`), donde se despliega la calificación 360°, la ponderación dinámica y el seguimiento pastoral.

### 12.3. Análisis Riguroso: Qué Hace vs. Qué NO Hace

| Dimensión | Qué Hace | Qué NO Hace |
| :--- | :--- | :--- |
| **Subsecciones** | Segmenta en tres vistas nítidas: Asistencias, Pasajes y Multas disciplinarias. | No mezcla evaluaciones académicas dentro del registro operativo diario. |
| **Transparencia** | Desglosa minuto a minuto cómo se computó cada multa aplicada en días viernes. | No oculta cargos ni deducciones; el becario audita sus cifras con total claridad. |
| **Doble Marcado** | Exhibe claramente si la asistencia satelital del viernes fue convalidada por el organizador. | No permite alterar el estado de validación desde el dispositivo del becario. |

---

## 13. Infraestructura Offline, Esqueletos y Catálogo de Errores `ERR-NNNN`

La aplicación móvil incorpora un robusto cinturón de resiliencia ante contingencias de conectividad en campo:

1. **`ColaOfflineServicio`:** Persistencia estructurada en `SharedPreferences` de transacciones diferidas (asistencias, tramos de pasajes, justificaciones y devocionales) con serialización JSON, timestamps y reintentos automatizados.
2. **`BannerConexion`:** Banner interactivo de alta visibilidad que notifica pérdida de señal, conteo de operaciones pendientes y sincronización manual al recuperar la red.
3. **Catálogo Unificado `ERR-NNNN`:** Mapeo estricto de códigos entre backend y móvil (`ERR-1001` a `ERR-9002`) con tipado fuerte en `CodigosError` y la clase `ErrorBumand`.
4. **`ErrorWidgetPersonalizado`:** Componente de interfaz que presenta el badge de error institucional, diagnóstico comprensible, sugerencia de acción y botón de reintento.
5. **`CargandoSkeleton`:** Placeholders visuales animados con gradiente suave que reemplazan a los spinners convencionales durante la carga de listas y tarjetas.

---

## 14. Conclusiones y Cumplimiento de Estándares Empresariales

La aplicación móvil de **BUMAND** materializa un estándar de ingeniería móvil de alta fidelidad, adaptado a las directrices corporativas de la **Fundación Diaconía FRIF-IFD**:

1. **Rendimiento Nativo y Fluidez Visual:** Todas las vistas han sido optimizadas para sostener **60 fotogramas por segundo**, destacando el renderizado matemático del radar con `CustomPainter` y la preservación de memoria con `IndexedStack`.
2. **Suite Completa de Pruebas Automatizadas:** **82 de 82 pruebas unitarias y de widgets** pasando exitosamente (`flutter test`), cubriendo autenticación, radar Haversine con bloques, pasajes, devocionales, notificaciones y las 3 subsecciones del historial.
3. **Nomenclatura y Español Absoluto:** La totalidad de las pantallas, widgets, modelos, repositorios, métodos y variables cumplen las convenciones de nomenclatura obligatorias (`snake_case` para variables, `camelCase` para métodos, `PascalCase` para widgets y clases, y `kebab-case` para archivos y carpetas en español).
4. **Seguridad y Rigor Institucional:** La combinación de geocercas satelitales con anti-spoofing en 11 agencias y bloques edilicios, el cálculo del 80% en centavos exactos, la regla del día 24, el motor transparente de multas y la resiliencia bíblica en 4 niveles garantizan la total integridad de los recursos y la transparencia en la gestión de becarios.

---
*Fin del Documento Técnico — Ecosistema BUMAND 2026*
