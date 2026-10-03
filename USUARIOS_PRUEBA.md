# Catálogo de Cuentas y Usuarios de Prueba Institucionales — BUMAND

Este documento detalla exhaustivamente los usuarios de prueba sembrados en la base de datos de BUMAND (`bumand-backend/src/datos/semilla.servicio.ts`), organizados según el modelo de **Control de Acceso Basado en Roles (RBAC)** corporativo, sus credenciales de acceso, atribuciones operativas y flujos de trabajo en las plataformas Web, Móvil y API.

---

## 1. Tabla de Credenciales de Acceso Rápido

| Nombre Completo | Correo Electrónico | Contraseña | Rol Institucional | Perfil / Entidad Asociada |
| :--- | :--- | :--- | :--- | :--- |
| **Administrador General** | `admin@wscrt.com` | `admin` | `administrador` | Administrador General BUMAND |
| **Angel Javier Ali Paz** | `angel.ali@bumand.bo` | `Bumand2026!` | `supervisor` | Tutor General de Prácticas (Diaconía FRIF-IFD) |
| **Nilda Amalia Churata Paye** | `nilda.churata@bumand.bo` | `Bumand2026!` | `becario` | Becaria (Educación Parvularia - UMSA) |
| **Edgar Elias Alarcon Huanca** | `edgar.alarcon@bumand.bo` | `Bumand2026!` | `becario` | Becario (Medicina - UMSA) |
| **Adai Belen Huayta Cardozo** | `adai.huayta@bumand.bo` | `Bumand2026!` | `becario` | Becaria (Estadística - UMSA) |
| **Pastor David Mamani** | `pastor.david@diaconia.bo` | *(Evaluador)* | `pastor` | Pastor Evaluador (Iglesia Central El Alto) |

---

## 2. Detalle de Usuarios, Roles y Atribuciones

### 👑 2.1. Administrador General (`admin@wscrt.com`)

- **Identidad:** Administrador General BUMAND
- **Rol en Sistema:** `administrador`
- **Credenciales:**
  - **Correo:** `admin@wscrt.com`
  - **Contraseña:** `admin`
- **Atribuciones y Funcionalidades Activas:**
  1. **Dashboard General Analítico (Sprint 6):**
     - Métricas globales de becarios activos, promedio de horas de práctica acreditadas y solicitudes de viáticos en trámite.
     - Gráficos interactivos de series temporales de horas de práctica por mes (AreaChart con degradados).
     - Gráfico de dona (PieChart Donut) de ejecución presupuestaria del reembolso institucional del 80%.
     - Gráfico de barras comparativo de horas por iglesias y agencias bancarias comunitarias.
  2. **Directorio y Gestión de Becarios (Sprint 2):**
     - Alta institucional de estudiantes, asignación de unidades operativas, carreras, universidades, iglesias y lugares de práctica.
     - Habilitación y deshabilitación de cuentas de usuario (`activo` / `inactivo`).
  3. **Gestión de Sedes y Geocercas (Sprint 2):**
     - Catálogo de 72 sedes de Diaconía FRIF-IFD con georreferenciación (`latitud`, `longitud`) y ajuste del radio geodésico de tolerancia (de 20 a 200 metros).
  4. **Supervisión de Asistencia y Pasajes (Sprints 3 y 4):**
     - Auditoría completa de las marcaciones de asistencia (fórmula de Haversine) y liquidación de viáticos en centavos enteros.
  5. **Generación de Reportes PDF Oficiales (Sprint 7):**
     - Emisión, previsualización e impresión de informes mensuales institucionales y constancias de horas de práctica.
  6. **Centro de Notificaciones Corporativas (Sprint 8):**
     - Monitoreo de alertas globales y eventos del sistema.

---

### 👔 2.2. Supervisor Institucional: Angel Javier Ali Paz (`angel.ali@bumand.bo`)

- **Identidad:** Lic. Angel Javier Ali Paz
- **Rol en Sistema:** `supervisor`
- **Credenciales:**
  - **Correo:** `angel.ali@bumand.bo`
  - **Contraseña:** `Bumand2026!`
- **Contacto Registrado:** Teléfono `72345678`
- **Cargo Institucional:** Tutor General de Prácticas Profesionales BUMAND en Diaconía FRIF-IFD.
- **Becarios Asignados Directamente:**
  - Nilda Amalia Churata Paye (CI: `10028341`, Seguridad Física)
  - Edgar Elias Alarcon Huanca (CI: `9160054`, Consultorio Médico)
  - Adai Belen Huayta Cardozo (CI: `13696496`, Productos y Canales)
- **Atribuciones y Funcionalidades Activas:**
  1. **Panel de Supervisión (Sprint 6):**
     - Seguimiento del cumplimiento de horas y desempeño del grupo de becarios a su cargo.
  2. **Aprobación de Solicitudes de Pasajes (Sprint 4):**
     - Inspección detallada de tramos declarados (ida y vuelta), paradas intermedias, tarifas declaradas y apoyo realizado.
     - Validación del cálculo exacto del 80% en centavos enteros (ejemplo canónico: sobre Bs 345.00 declarados, reembolso exacto de Bs 276.00).
     - Validación de verificación GPS (📍) en las paradas del trayecto.
     - **Rechazo Justificado Obligatorio:** Capacidad de observar o rechazar solicitudes requiriendo un motivo formal documentado que notifica al becario.
  3. **Evaluación 360° y Formulario F-03 (Sprint 5):**
     - Calificación cuantitativa y cualitativa del **Módulo 3 (Evaluación del Mentor)** sobre los 5 módulos canónicos del modelo de evaluación diaconal.
     - Revisión de formularios pastorales F-03 llenados por las iglesias.
  4. **Convalidación con Firma Digital Canvas (Sprint 5):**
     - Firma a mano alzada en lienzo HTML5 Canvas para certificar horas de práctica y evaluaciones mensuales, persistiendo el trazo criptográfico en base de datos.
  5. **Emisión de Reportes PDF de Seguimiento (Sprint 7):**
     - Generación y descarga de informes de convalidación mensual para la dirección del programa.

---

### 🎓 2.3. Becaria 1: Nilda Amalia Churata Paye (`nilda.churata@bumand.bo`)

- **Identidad:** Nilda Amalia Churata Paye
- **Cédula de Identidad (CI):** `10028341`
- **Rol en Sistema:** `becario`
- **Credenciales:**
  - **Correo:** `nilda.churata@bumand.bo`
  - **Contraseña:** `Bumand2026!`
- **ID de Registro:** Becario ID: `1` | Usuario ID: `3`
- **Perfil Académico:**
  - **Carrera:** Educación Parvularia
  - **Universidad:** Universidad Mayor de San Andrés (UMSA)
  - **Institución:** Diaconía FRIF-IFD
  - **Unidad de Asignación:** Seguridad Física
  - **Fecha de Ingreso:** 15 de enero de 2026
- **Asignaciones Territoriales e Institucionales:**
  - **Sede de Práctica:** Oficina Central Diaconía IFD - El Alto (Av. Juan Pablo II esq. Calle Sbtte. Jorge Eulert 125; Coordenadas: `-16.505000, -68.163000`; Radio: 50 metros).
  - **Iglesia Asignada:** Iglesia Central El Alto (Pastor David Mamani).
  - **Supervisor / Tutor:** Angel Javier Ali Paz.
- **Atribuciones y Funcionalidades Activas:**
  1. **Mi Panel Operativo (Sprint 1):**
     - Métricas personales: total de horas acreditadas, porcentaje de puntualidad (96%) y monto de pasajes liquidados (Bs 276.00).
     - **Radar Geofence en Tiempo Real:** Visualización interactiva con anillos concéntricos pulsantes (60 fps), indicador de precisión GPS y estado dentro/fuera de la geocerca de la Oficina Central.
  2. **Marcación de Asistencia (Sprint 3):**
     - Registro de entrada y salida de prácticas con validación geodésica estricta (Haversine). Si la distancia supera los 50 metros de la sede, el sistema bloquea la marcación.
  3. **Declaración de Recorridos y Viáticos (Sprint 4):**
     - Formulario de tramos diarios (Ida y Vuelta) con botón **PIN GPS (📍)** para capturar las coordenadas de paradas de transporte público.
     - Visualización automática del 80% de reembolso en tiempo real.
     - **Cumplimiento de la Regla Institucional del Día 24:** El botón de envío formal se habilita a partir del día 24 de cada mes, impidiendo el despacho prematuro de formularios incompletos.
  4. **Formulario Pastoral F-03 (Sprint 5):**
     - Registro estructurado de áreas de servicio, testimonio y liderazgo eclesiástico para evaluación pastoral.
  5. **Mis Evaluaciones (Sprint 5):**
     - Consulta de calificaciones semestrales ponderadas en la matriz 360° (Liderazgo, Académica, Mentor, Escuela de Líderes, Socioeconómica).
  6. **Notificaciones Push y Alertas (Sprint 8):**
     - Recepción de avisos de marcación, recordatorios de salida, confirmaciones de viáticos aprobados y observaciones.

---

### 🎓 2.4. Becario 2: Edgar Elias Alarcon Huanca (`edgar.alarcon@bumand.bo`)

- **Identidad:** Edgar Elias Alarcon Huanca
- **Cédula de Identidad (CI):** `9160054`
- **Rol en Sistema:** `becario`
- **Credenciales:**
  - **Correo:** `edgar.alarcon@bumand.bo`
  - **Contraseña:** `Bumand2026!`
- **ID de Registro:** Becario ID: `2` | Usuario ID: `4`
- **Perfil Académico:**
  - **Carrera:** Medicina
  - **Universidad:** Universidad Mayor de San Andrés (UMSA)
  - **Unidad de Asignación:** Consultorio Médico
  - **Sede de Práctica:** Oficina Central Diaconía IFD - El Alto
  - **Supervisor / Tutor:** Angel Javier Ali Paz
- **Atribuciones:**
  - Marcación georreferenciada de jornadas en el Consultorio Médico de Diaconía.
  - Registro de traslados y viáticos para brigadas de atención médica comunitaria.
  - Gestión de horas de servicio y autoevaluación semestral.

---

### 🎓 2.5. Becaria 3: Adai Belen Huayta Cardozo (`adai.huayta@bumand.bo`)

- **Identidad:** Adai Belen Huayta Cardozo
- **Cédula de Identidad (CI):** `13696496`
- **Rol en Sistema:** `becario`
- **Credenciales:**
  - **Correo:** `adai.huayta@bumand.bo`
  - **Contraseña:** `Bumand2026!`
- **ID de Registro:** Becario ID: `3` | Usuario ID: `5`
- **Perfil Académico:**
  - **Carrera:** Estadística
  - **Universidad:** Universidad Mayor de San Andrés (UMSA)
  - **Unidad de Asignación:** Productos y Canales
  - **Sede de Práctica:** Oficina Central Diaconía IFD - El Alto
  - **Supervisor / Tutor:** Angel Javier Ali Paz
- **Atribuciones:**
  - Marcación de asistencia para proyectos de analítica y canales financieros en Diaconía.
  - Declaración mensual de viáticos del 80% y cálculo de transporte urbano.
  - Carga de notas semestrales y seguimiento de avance académico.

---

### ⛪ 2.6. Evaluador Pastoral: Pastor David Mamani (`pastor.david@diaconia.bo`)

- **Identidad:** Pastor David Mamani
- **Tipo de Evaluador:** `pastor`
- **Contacto Registrado:** Teléfono `71234567`
- **Congregación:** Iglesia Central El Alto
- **Atribuciones:**
  - Evaluación del **Módulo 1 (Liderazgo en la Iglesia)**.
  - Calificación y emisión del Formulario F-03 con retroalimentación del testimonio, ministerio diaconal y compromiso congregacional de los becarios asignados.

---

## 3. Matriz de Permisos por Rol (RBAC)

| Módulo / Funcionalidad | `administrador` | `supervisor` | `becario` |
| :--- | :---: | :---: | :---: |
| **Inicio de Sesión y Detección Automática de Rol** | Sí | Sí | Sí |
| **Dashboard Analítico con Gráficos Recharts (S6)** | Sí (Global) | Sí (Asignados) | No |
| **Mi Panel con Radar Geofence en Vivo (S1)** | No | No | Sí |
| **Directorio Completo de Becarios (S2)** | Lectura / Escritura | Lectura (Asignados) | No |
| **Configuración de Sedes y Radios Geodésicos (S2)** | Lectura / Edición | Lectura | Consulta de Sede |
| **Marcación de Asistencia Haversine (S3)** | Auditoría | Supervisión | Marcación GPS |
| **Declaración de Tramos con Botón PIN (S4)** | Auditoría | Consulta | Declaración |
| **Aprobación / Rechazo de Pasajes 80% (S4)** | Auditoría | Aprobación / Rechazo | Consulta de Estado |
| **Evaluación 360° (5 Módulos Canónicos) (S5)** | Visualización Global | Calificación de Mentor | Autoevaluación |
| **Firma Digital Canvas (S5)** | Validación | Firma de Aprobación | No |
| **Llenado de Formulario Pastoral F-03 (S5)** | Consulta | Revisión | Registro Inicial |
| **Generación y Descarga de Reportes PDF (S7)** | Sí (Oficial) | Sí (Seguimiento) | Constancia Personal |
| **Centro de Notificaciones Push (S8)** | Global | Por Becario | Personal |

---

## 4. Guía Rápida de Pruebas y Validación

### En la Interfaz Web (`bumand-frontend`)
1. Dirígete a la pantalla de ingreso: `http://localhost:3000/inicio-sesion` (o el puerto configurado).
2. En la sección inferior **"Credenciales de Prueba RBAC"**, haz clic en cualquiera de las tarjetas de acceso rápido:
   - **Administrador General:** Carga `admin@wscrt.com` / `admin`. Permite acceder al panel analítico global con gráficos Recharts.
   - **Supervisor (Angel Ali Paz):** Carga `angel.ali@bumand.bo` / `Bumand2026!`. Permite revisar becarios a cargo, aprobar viáticos con centavos y estampar firma digital canvas.
   - **Becaria (Nilda Churata):** Carga `nilda.churata@bumand.bo` / `Bumand2026!`. Permite interactuar con el radar geocerca, registrar tramos con GPS (PIN) y llenar el formulario F-03.
3. El sistema identifica automáticamente el rol del usuario sin necesidad de conmutadores manuales y ajusta las pestañas y vistas en consecuencia.
4. Para alternar de usuario, utiliza el botón **Cerrar Sesión** en la esquina superior derecha.

### En la Aplicación Móvil (`bumand-movil`)
1. Inicia sesión con `nilda.churata@bumand.bo` y contraseña `Bumand2026!`.
2. Observa el Radar Geofence con pulsos animados a 60 fps evaluando la cercanía a la Oficina Central El Alto.
3. En la pestaña de viáticos, presiona el botón **PIN (📍)** para rellenar la latitud y longitud actuales del tramo.

### En la API REST Backend (`bumand-backend`)
- Documentación interactiva Swagger: `http://localhost:3000/api/docs`.
- Endpoint de Autenticación: `POST /api/autenticacion/inicio-sesion` con `{ "correo": "...", "contrasena": "..." }`.
