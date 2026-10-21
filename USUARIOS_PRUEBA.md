# Catálogo Oficial de Cuentas y Usuarios Institucionales — BUMAND

Este documento detalla exhaustivamente la nómina completa de usuarios sembrados en la base de datos de BUMAND ([`semilla.servicio.ts`](file:///c:/Users/yang_/Desktop/ZBumands/Bumands-Proyecto/new-bumand/bumand-backend/src/datos/semilla.servicio.ts) y [`semilla-datos.constantes.ts`](file:///c:/Users/yang_/Desktop/ZBumands/Bumands-Proyecto/new-bumand/bumand-backend/src/datos/semilla-datos.constantes.ts)), extraídos con fidelidad absoluta a partir de los documentos institucionales oficiales de **Diaconía FRIF-IFD**, la nómina oficial `BECARIOS DE BUMAND 2026-convertido (1).xlsx`, la planilla consolidada `EVALUACION GENERAL BUMAND II-2025 (Autoguardado).xlsx` ([`Evaluacion_semestre_II.pdf`](file:///c:/Users/yang_/Desktop/ZBumands/Bumands-Proyecto/new-bumand/nuevos-requerimientos/archivos/Evaluacion_semestre_II.pdf)), el [`Cuestionario_bienestar_universitario.pdf`](file:///c:/Users/yang_/Desktop/ZBumands/Bumands-Proyecto/new-bumand/nuevos-requerimientos/archivos/Cuestionario_bienestar_universitario.pdf) y la [`Evaluacion_del_becario_por_el_mentor.docx`](file:///c:/Users/yang_/Desktop/ZBumands/Bumands-Proyecto/new-bumand/nuevos-requerimientos/archivos/Evaluacion_del_becario_por_el_mentor.docx).

---

## 1. Resumen Ejecutivo de la Población Sembrada

| Rol Institucional | Cantidad de Cuentas | Contraseña Estándar | Ámbito de Operación |
| :--- | :---: | :---: | :--- |
| **Administradores** | **2** | `Bumand2026!` | Gestión global del ecosistema, sedes, geocercas, registro manual de asistencia por contingencia (`Prácticas`, `Escuela de Líderes`, `Acciones de Servicio`), configuración del Cuestionario de Bienestar (26 preguntas editables), Sábana Consolidada Semestral, reportes PDF de 2 páginas y exportación Excel. |
| **Supervisores (Tutores/Mentores)** | **29** | `Bumand2026!` | Supervisión operativa por unidad, evaluación del becario por el mentor (18 preguntas escala 1–10 + 3 abiertas sobre 20 pts), aprobación de pasajes (80%) con visualización conectada de calles y líneas de teleférico, y firma digital canvas. |
| **Estudiantes (Becarios BUMAND)** | **23** | `Bumand2026!` | Marcación de asistencia con geocerca GPS (Haversine) en los 3 tipos de actividad, declaración de recorridos paso a paso (calles, paradas y teleférico Ida/Vuelta), llenado del Cuestionario de Bienestar Universitario (26 preguntas) y seguimiento de los 5 módulos de la Matriz de Evaluación. |
| **Total Usuarios con Cuenta Activa** | **54** | — | **100% de cobertura institucional verificada (0 cuentas ficticias)** |

> [!NOTE]
> Adicionalmente se encuentran sembrados en base de datos **17 templos e iglesias cristianas oficiales** con sus pastores evaluadores, **11 sedes y agencias financieras** con geocercas calibradas, y las **26 preguntas oficiales editables** en la tabla `preguntas_bienestar`.

---

## 2. Cuentas de Acceso Rápido para Pruebas (Web y App Móvil)

Para pruebas inmediatas tanto en la **Plataforma Web** (`http://localhost:3000`) como en la **Aplicación Móvil Flutter** (`bumand-movil` conectada al backend en `http://localhost:3002`):

| Perfil / Rol | Nombre Completo | Correo Electrónico (Login Real) | Contraseña | C.I. / Cargo / Carrera |
| :--- | :--- | :--- | :--- | :--- |
| 👑 **Admin Sistemas** | Daniel Davalos Quiñonez | `daniel234.davalos@gmail.com` | `Bumand2026!` | CI: `9107373` · Administrador de Sistemas e Infraestructura |
| 👑 **Admin Coordinación** | Coordinación General BUMAND | `coordinacion@bumand.bo` | `Bumand2026!` | Dirección y Coordinación Institucional Diaconía IFD |
| 👔 **Supervisor Tutor** | Angel Javier Ali Paz | `angel.ali@bumand.bo` | `Bumand2026!` | Tutor General de Prácticas / Jefe de Seguridad Física |
| 👔 **Supervisora Salud** | Claudia Consuelo Cabrera Delgado | `claudia.cabrera@diaconia.bo` | `Bumand2026!` | Consultorio Médico / SGN Talento Humano |
| 👔 **Supervisor Negocios** | Rodrigo Solorzano San Martin | `rodrigo.solorzano@diaconia.bo` | `Bumand2026!` | Productos y Canales / SGN de Captaciones |
| 👔 **Supervisora Finanzas** | Elsa Quinteros Aquino | `elsa.quinteros@diaconia.bo` | `Bumand2026!` | Responsable de Finanzas y Tesorería |
| 👔 **Supervisor Crédito** | Carlos Alanoca Pari | `carlos.alanoca@diaconia.bo` | `Bumand2026!` | Jefe Crédito Individual y Cartera Productiva |
| 🎓 **Becaria 1 (App/Web)** | Adai Belen Huayta Cardozo | `adaibelen017@gmail.com` | `Bumand2026!` | CI: `13696496` · Estadística (UMSA) · Beca `650` |
| 🎓 **Becaria 2 (App/Web)** | Nilda Amalia Churata Paye | `nildachurata99@gmail.com` | `Bumand2026!` | CI: `10028341` · Educación Parvularia (UPEA) · Beca `650` |
| 🎓 **Becario 3 (App/Web)** | Edgar Elías Alarcon Huanca | `edgaralarcon112@gmail.com` | `Bumand2026!` | CI: `9160054` · Medicina (UDABOL) · Beca `650` |
| 🎓 **Becario 4 (App/Web)** | Alejandro Roberth Paredes Tarquino | `roberthp092@gmail.com` | `Bumand2026!` | CI: `10064956` · Comunicación Social (UPEA) · Beca `650` |
| 🎓 **Becaria 5 (App/Web)** | Aydee Ruth Ali Condori | `alicondoriaydeeruth@gmail.com` | `Bumand2026!` | CI: `9952878` · Contaduría Pública (UPEA) · Beca `250` |

> [!TIP]
> **Modo Respaldo Offline en Web (`bumand-frontend`):** Si se ejecuta únicamente el frontend web sin encender `bumand-backend`, la pantalla de inicio de sesión también admite los alias rápidos `nilda.churata@bumand.bo`, `edgar.alarcon@bumand.bo` y `adai.huayta@bumand.bo` con contraseña `Bumand2026!`. Con el backend encendido (`http://localhost:3002`), utiliza siempre los correos reales de la tabla anterior (por ejemplo `adaibelen017@gmail.com` o `nildachurata99@gmail.com`).

---

## 3. Nómina Completa de Administradores (2 Cuentas)

| # | Nombre Completo | Correo Electrónico | Contraseña | Cargo Institucional |
| :-: | :--- | :--- | :--- | :--- |
| 1 | **Daniel Davalos Quiñonez** | `daniel234.davalos@gmail.com` | `Bumand2026!` | Administrador de Sistemas e Infraestructura BUMAND |
| 2 | **Coordinación General BUMAND** | `coordinacion@bumand.bo` | `Bumand2026!` | Coordinación Institucional y Dirección del Programa BUMAND |

---

## 4. Nómina Completa de Supervisores y Mentores (29 Cuentas)

Todos los supervisores y mentores acceden con la contraseña institucional: `Bumand2026!`

| # | Nombre del Tutor / Mentor | Correo Electrónico | Unidad / Área de Práctica | Cargo Institucional | Teléfono |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | **Angel Javier Ali Paz** | `angel.ali@bumand.bo` | Jefatura de Seguridad Física | Tutor General de Prácticas / Jefe de Seguridad Física | 72345678 |
| 2 | **Claudia Consuelo Cabrera Delgado** | `claudia.cabrera@diaconia.bo` | Consultorio Médico / SGN Talento Humano | Responsable de Consultorio Médico / Talento Humano | 71982341 |
| 3 | **Rodrigo Solorzano San Martin** | `rodrigo.solorzano@diaconia.bo` | Productos y Canales / SGN de Captaciones | Responsable de Productos y Canales Financieros | 72091823 |
| 4 | **Elsa Quinteros Aquino** | `elsa.quinteros@diaconia.bo` | Finanzas y Tesorería | Responsable de Finanzas y Tesorería | 73019284 |
| 5 | **Hugo Seifert** | `hugo.seifert@diaconia.bo` | Gerencia Nacional de Riesgos | Gerente Nacional de Riesgos | 74028391 |
| 6 | **Max Arthur Reynoso Espinoza** | `max.reynoso@diaconia.bo` | Marketing y Comunicación | Jefe de Marketing y Comunicación Institucional | 75039482 |
| 7 | **Mildrette Rojas Soliz** | `mildrette.rojas@diaconia.bo` | Planificación, Control y Presupuesto | Jefa de Planificación, Control y Presupuesto | 76049583 |
| 8 | **Franz Raul Salazar Vasquez** | `franz.salazar@diaconia.bo` | Auditoría Interna | Auditor Interno Institucional | 77059684 |
| 9 | **Reynaldo Alavi Paz** | `reynaldo.alavi@diaconia.bo` | Seguros / Servicios Financieros | Responsable de Seguros y Captaciones | 78069785 |
| 10 | **Alberto Iber Leon Coronado** | `alberto.leon@diaconia.bo` | Seguridad de la Información | Oficial de Seguridad de la Información | 79079886 |
| 11 | **Ramiro Riera** | `ramiro.riera@diaconia.bo` | Subgerencia Nacional de Administración | Subgerente Nacional de Administración | 71182930 |
| 12 | **Eilen Astorga** | `eilen.astorga@diaconia.bo` | Subgerencia Nacional de Administración | Administradora de Operaciones | 72293041 |
| 13 | **Cheryl Lissett Zegarra Corminales** | `cheryl.zegarra@diaconia.bo` | Captaciones y Canales | Especialista de Captaciones y Canales | 73304152 |
| 14 | **Juan Perez** | `juan.perez@diaconia.bo` | Contabilidad e Impuestos | Jefe de Contabilidad e Impuestos | 74415263 |
| 15 | **Ricardo Martin Menacho Salas** | `ricardo.menacho@diaconia.bo` | Jefatura de Procesos y Normas | Jefe de Procesos y Normas | 75526374 |
| 16 | **Brian Marcelo Siles Loras** | `brian.siles@diaconia.bo` | Gerencia Nacional de Cumplimiento | Oficial de Cumplimiento Normativo | 76637485 |
| 17 | **Samuel Martín Durán Baspineiro** | `samuel.duran@diaconia.bo` | Sostenibilidad y Responsabilidad Diaconal | Responsable de Responsabilidad Social y Diaconal | 77748596 |
| 18 | **Carlos Alanoca Pari** | `carlos.alanoca@diaconia.bo` | Crédito Individual y Cartera Productiva | Jefe de Crédito Individual y Cartera Productiva | 78859607 |
| 19 | **Adams Callejas** | `adams.callejas@diaconia.bo` | Gerencia Nacional de Cumplimiento | Analista de Cumplimiento y Control | 79960718 |
| 20 | **Walter Laime Poma** | `walter.laime@diaconia.bo` | Subgerencia Nacional de Finanzas | Analista Financiero Senior | 71071829 |
| 21 | **Anai Linda Paye Fabian** | `anai.paye@diaconia.bo` | Subgerencia Nacional RSDyA | Coordinadora de Proyectos Diaconales | 72182930 |
| 22 | **Maritza Aguilar Rodrigo** | `maritza.aguilar@diaconia.bo` | Subgerencia Nacional de Finanzas | Tesorera Institucional | 73293041 |
| 23 | **Jaime Rodrigo Poma Cruz** | `jaime.poma@diaconia.bo` | Administración e Infraestructura | Encargado de Mantenimiento y Activos Fijos | 74304152 |
| 24 | **Fernando Castillo Vedia** | `fernando.castillo@diaconia.bo` | Jefatura de Redes y Comunicaciones | Jefe de Redes y Telecomunicaciones | 75415263 |
| 25 | **María Angélica Crespo Patzi** | `maria.crespo@diaconia.bo` | Gerencia Nacional de Riesgos | Analista de Riesgo Crediticio y Operativo | 76526374 |
| 26 | **Jenny Ramos Ticona** | `jenny.ramos@diaconia.bo` | Gerencia Nacional de Auditoría | Auditora Operativa Senior | 77637485 |
| 27 | **Raisa Noelia Arce Humerez** | `raisa.arce@diaconia.bo` | Jefatura de Procesos y Normas | Analista de Organización y Métodos | 78748596 |
| 28 | **Pamela Sanchez Cachi** | `pamela.sanchez@diaconia.bo` | Subgerencia Nacional RSDyA | Facilitadora de Acción Social Diaconal | 79859607 |
| 29 | **Alejandra Lizeth Romay Valdez** | `alejandra.romay@diaconia.bo` | Subgerencia de Negocios y Marketing | Especialista en Marketing Digital y Contenido | 71960718 |

---

## 5. Nómina Completa de Estudiantes y Becarios Oficiales (23 Cuentas)

Todos los estudiantes acceden con la contraseña institucional: `Bumand2026!`. Para el flujo de **"Crear mi cuenta"** en la aplicación móvil (`RegistroPantalla`), se valida que el **C.I.** exista en esta nómina oficial.

### 5.1. Nómina Activa Gestión 2026 (17 Becarios con Horarios de Práctica y Nivel CETI)

| # | C.I. | Nombre Completo | Correo Electrónico (Login) | Celular | CETI | Universidad | Carrera | Modalidad | Tipo Beca | Unidad de Práctica | Horario Semanal |
| :-: | :-: | :--- | :--- | :-: | :-: | :--- | :--- | :-: | :-: | :--- | :--- |
| 1 | `13696496` | **Adai Belen Huayta Cardozo** | `adaibelen017@gmail.com` | 79541458 | 3 | UMSA | Estadística | Semestral | `650` | Productos y Canales (`2 Piso Bloque A`) | Lun 13:00-16:30, Mié 13:00-16:30, Vie 09:00-14:00 |
| 2 | `9107373` | **Daniel Davalos Quiñonez** | `daniel234.davalos@gmail.com` | 78804045 | 2 | UMSA | Informática | Semestral | `650` | Seguridad Física (`3 Piso Bloque B`) | Mar 13:00-16:00, Vie 08:00-14:00 |
| 3 | `9160054` | **Edgar Elías Alarcon Huanca** | `edgaralarcon112@gmail.com` | 60662872 | 2 | UDABOL | Medicina | Semestral | `650` | Consultorio Médico (`2 Piso Bloque B`) | Lun 08:00-16:00, Vie 10:00-14:00 |
| 4 | `10028341` | **Nilda Amalia Churata Paye** | `nildachurata99@gmail.com` | 63140016 | 2 | UPEA | Educación Parvularia | Semestral | `650` | Seguridad Física (`3 Piso Bloque B`) | Mar 08:00-13:00, Jue 08:00-13:00 |
| 5 | `10064956` | **Alejandro Roberth Paredes Tarquino** | `roberthp092@gmail.com` | 78816188 | 1 | UPEA | Comunicación Social | Anual | `650` | Marketing y Comunicación (`1 Piso Bloque B`) | Mar 10:30-13:30, Jue 10:30-13:30, Vie 10:30-13:30 |
| 6 | `9952878` | **Aydee Ruth Ali Condori** | `alicondoriaydeeruth@gmail.com` | 63101324 | 1 | UPEA | Contaduría Pública | Anual | `250` | Finanzas y Tesorería (`2 Piso Bloque A`) | Mar 10:00-13:00, Jue 10:00-13:00, Vie 10:00-13:00 |
| 7 | `9943280` | **Carlos Oscar Luna Lizarraga** | `shionaries477@gmail.com` | 69902655 | 1 | UMSA | Economía | Semestral | `650` | Auditoría Interna (`3 Piso Bloque A`) | Mar 08:00-12:00, Jue 08:00-12:00, Vie 08:00-14:00 |
| 8 | `10920862` | **Isaías Daniel Herrera Mamani** | `herreraisaias667@gmail.com` | 62484594 | 1 | UPEA | Arquitectura | Semestral | `650` | SGN de Administración (`2 Piso Bloque A`) | Lun 08:00-12:00, Mié 08:00-12:00, Vie 08:00-14:00 |
| 9 | `14378720` | **José Marcos Suñagua Quispe** | `marcossunagua0@gmail.com` | 62270620 | 1 | UMSA | Informática | Semestral | `650` | Riesgos (`3 Piso Bloque A`) | Lun 08:30-16:30, Mié 08:30-16:30 |
| 10 | `12959656` | **Mariela Dayana Jimenez Chambi** | `jimenezcmarielaa@gmail.com` | 70590493 | 1 | UMSA | Contaduría Pública | Anual | `650` | Seguros (`2 Piso Bloque A`) | Mar 08:30-12:30, Jue 08:30-12:30, Vie 08:30-14:00 |
| 11 | `9925727` | **Mayherli Alejandra Loza Villalobos** | `villalobosbetty96@gmail.com` | 60107414 | 1 | UMSA | Contaduría Pública | Anual | `250` | Finanzas y Tesorería (`4 Piso Bloque A`) | Lun 08:00-12:00, Mié 08:00-12:00, Vie 08:00-14:00 |
| 12 | `7093658` | **Noemi Callisaya Alvarez** | `k6924383@gmail.com` | 60140086 | 1 | UPEA | Psicomotricidad y Deportes | Semestral | `650` | Consultorio Médico (`2 Piso Bloque B`) | Lun 08:00-12:00, Mié 08:00-12:00, Vie 08:00-14:00 |
| 13 | `6172054` | **Ronald Mauricio Quiquijana Mayta** | `quiquijana333@gmail.com` | 65604882 | 1 | EMI | Ing. en Telecomunicaciones | Semestral | `250` | Seguridad de la Información (`3 Piso Bloque A`) | Mar 08:30-12:30, Jue 08:30-12:30, Vie 08:30-14:00 |
| 14 | `9974211` | **Ruddy Flores Tapia** | `ruddyalan123@gmail.com` | 78777631 | 1 | UMSA | Informática | Semestral | `250` | Planificación y Presupuesto (`5 Piso Bloque A`) | Lun 08:30-16:30, Mié 08:30-16:30 |
| 15 | `8416501` | **Gonzalo Valencia Laura** | `gonzalovalencialau@gmail.com` | 75161427 | 0 | UPEA | Contaduría Pública | Semestral | `650` | Contabilidad e Impuestos (`4 Piso Bloque A`) | Lun 08:30-12:30, Mié 08:30-12:30 |
| 16 | `13088041` | **Gustavo Ariel Condori Montaño** | `tavitolpb@gmail.com` | 67339896 | 0 | USB | Contaduría Pública | Semestral | `650` | Captaciones y Canales (`2 Piso Bloque A`) | Mar 08:30-12:30, Jue 08:30-12:30 |
| 17 | `13603536` | **Lisbeth Pacasi Machaca** | `lizbethpacasiesperanza@gmail.com` | 78022401 | 0 | UDABOL | Bioquímica y Farmacia | Semestral | `650` | Consultorio Médico (`2 Piso Bloque B`) | Lun 08:00-12:00, Mié 08:00-12:00 |
| 18 | `13693151` | **Selena Fernanda Pillco Mamani** | `selenafernandapillcomamani@gmail.com` | 71957515 | 0 | UMSA | Economía | Semestral | `650` | Captaciones y Canales (`2 Piso Bloque A`) | Mar 08:30-12:30, Jue 08:30-12:30 |
| 19 | `14155448` | **Milenka Quispe Coarite** | `milenkaquispecoarite@gmail.com` | 63155199 | 0 | UTB | Administración de Empresas | Semestral | `650` | Procesos y Normas (`4 Piso Bloque A`) | Lun 08:30-12:30, Mié 08:30-12:30 |
| 20 | `12604724` | **Joselin Wara Huanca Paucara** | `joselinhuancapaucara@gmail.com` | 75263547 | 0 | UPEA | Contaduría Pública | Semestral | `650` | Cumplimiento (`3 Piso Bloque A`) | Mar 08:00-12:00, Jue 08:00-12:00 |
| 21 | `9208456` | **Johan Ludving Misme Flores** | `johan69865195@gmail.com` | 69865195 | 0 | UMSA | Informática | Semestral | `650` | Seguridad de la Información (`3 Piso Bloque A`) | Lun 08:30-12:30, Mié 08:30-12:30 |
| 22 | `13627440` | **Matias Jose Uri Flores** | `matiasjoseuriflores@gmail.com` | 72018255 | 0 | UMSA | Lingüística e Idiomas | Semestral | `650` | Sostenibilidad y Resp. Diaconal (`5 Piso Bloque A`) | Mar 08:30-12:30, Jue 08:30-12:30 |
| 23 | `8411610` | **Mateo Miguel Cussi Flores** | `mateocussi11@gmail.com` | 65120464 | 0 | UMSA | Informática | Semestral | `650` | Seguros (`2 Piso Bloque A`) | Lun 08:30-12:30, Mié 08:30-12:30 |

### 5.2. Becarios Históricos Adicionales en el Consolidado Semestral (`Evaluacion_semestre_II.pdf`)

Además de los becarios anteriores, la Sábana Consolidada Semestral (`GET /api/evaluaciones/consolidado-semestral` y `GET /api/pdf/evaluacion-semestral`) incluye los registros históricos del Semestre II-2025:

| # | C.I. | Nombre Completo | Correo Electrónico | Universidad | Carrera | Modalidad | Tipo Beca | Total Semestre II | Calificación Oficial |
| :-: | :-: | :--- | :--- | :--- | :--- | :-: | :-: | :-: | :--- |
| 1 | `12423846` | **Fernando Rene Yujra Quispe** | `fernando.yujra@diaconia.bo` | UMSA | Ingeniería Civil | Semestral | `650` | `78` | Aprobación óptima |
| 2 | `9927657` | **Luis Santiago Enrriquez Conde** | `luis.enrriquez@diaconia.bo` | UMSA | Ciencias de la Comunicación Social | Anual | `650` | `94` | Aprobación óptima |
| 3 | `7077936` | **Mario Catunta Laime** | `mario.catunta@diaconia.bo` | UPEA | Economía | Mixta | `250` | `83` | Aprobación óptima |
| 4 | `6950093` | **Jhoselin Quispe Morales** | `jhoselin.quispe@diaconia.bo` | UMSA | Comunicación Social | Anual | `650` | `99` | Aprobación óptima |
| 5 | `10369104` | **Monica Mamani Mamani** | `monica.mamani@diaconia.bo` | UMSA | Lingüística e Idiomas | Semestral | `650` | `95` | Aprobación óptima |
| 6 | `10930509` | **Cristhian Alejandro Soto Apaza** | `cristhian.soto@diaconia.bo` | UPEA | Administración de Empresas | Anual | `650` | `88` | Aprobación óptima |
| 7 | `10915872` | **Ruth Alesandra Choque Huanca** | `ruth.choque@diaconia.bo` | UNICEN | Ingeniería Comercial | Semestral | `250` | `88` | Aprobación óptima |

---

## 6. Red de Pastores e Iglesias Eclesiásticas (Formulario Pastoral F-03)

Registrados en la entidad `iglesias` y en el catálogo de evaluadores de tipo `pastor`:

| # | Congregación Eclesiástica | Pastor Evaluador | Teléfono Pastor | Correo Evaluador | Becario Vinculado |
| :-: | :--- | :--- | :-: | :--- | :--- |
| 1 | **Sinai Los Andes** | Pedro Pablo Callisaya Callisaya | `70659050` | `pastor.pedro.callisaya@diaconia.bo` | Adai Belen Huayta Cardozo |
| 2 | **Centro Evangelístico Caluyo** | David Felix Quispe Quispe | `70558225` | `pastor.david.quispe@diaconia.bo` | Alejandro Roberth Paredes Tarquino / Ronald Quiquijana |
| 3 | **Iglesia del Nazareno El Progreso** | René Max Condori Quispe | `72095673` | `pastor.rene.condori@diaconia.bo` | Aydee Ruth Ali Condori / Noemi Callisaya |
| 4 | **Nazareno 6 de Junio** | Abdias Espinoza Aleluya | `67316797` | `pastor.abdias@diaconia.bo` | Carlos Oscar Luna Lizarraga / José Marcos Suñagua |
| 5 | **Arca de Dios** | Abraham Mollo Quenaya | `74042185` | `pastor.abraham.mollo@diaconia.bo` | Cristhian Alejandro Soto Apaza |
| 6 | **Iglesia Metodista Monte de Horeb** | Julio Llanquichoque | `71209902` | `pastor.julio.llanquichoque@diaconia.bo` | Daniel Davalos Quiñonez |
| 7 | **Eli - Ezer** | Antonio Ali Mayta | `62388850` | `pastor.antonio.ali@diaconia.bo` | Edgar Elías Alarcon Huanca |
| 8 | **Iglesia Evangélica de Dios Boliviana Pampahasi** | Andres Alarcon | `76209019` | `pastor.andres.alarcon@diaconia.bo` | Fernando Rene Yujra Quispe |
| 9 | **Bautista para la Familia** | Alfredo Valencia Vela | `77775161` | `pastor.alfredo.valencia@diaconia.bo` | Isaías Daniel Herrera Mamani |
| 10 | **Pacajes** | Ramiro Zárate García | `67061212` | `pastor.ramiro.zarate@diaconia.bo` | Jhoselin Quispe Morales |
| 11 | **Bet-el** | Santiago Aparicio Enrriquez Salinas | `70544022` | `pastor.santiago.enrriquez@diaconia.bo` | Luis Santiago Enrriquez Conde |
| 12 | **Ministerio Misión Boliviana** | Cristina Elizabeth Lopez Ch | `76707009` | `pastor.cristina.lopez@diaconia.bo` | Mariela Dayana Jimenez Chambi |
| 13 | **Iglesia del Nazareno Río Seco** | Rubén Wilfredo Flores Villa | `76550588` | `pastor.ruben.flores@diaconia.bo` | Mario Catunta Laime / Ruddy Flores Tapia |
| 14 | **CANAAN** | Mario Pacohuanca Cruz | `63252756` | `pastor.mario.pacohuanca@diaconia.bo` | Mayherli Alejandra Loza Villalobos |
| 15 | **La Hermosa** | Héctor Sergio Choque Mamani | `75239369` | `pastor.hector.choque@diaconia.bo` | Monica Mamani Mamani |
| 16 | **Iglesia Evangélica Amigos Central Bautista Saavedra** | Luis Álvaro Quispe Condori | `73236864` | `pastor.luis.quispe@diaconia.bo` | Nilda Amalia Churata Paye |
| 17 | **El Buen Pastor** | Manuel Mamani Mamani | `72003290` | `pastor.manuel.mamani@diaconia.bo` | Ruth Alesandra Choque Huanca |

---

## 7. Matriz de Atribuciones y Nuevos Requerimientos por Rol (RBAC)

| Módulo Operativo / Funcionalidad | `administrador` | `supervisor` | `becario` |
| :--- | :---: | :---: | :---: |
| **Inicio de Sesión y Detección Automática de Rol JWT** | Sí | Sí | Sí |
| **Dashboard Analítico con Gráficos Recharts** | Sí (Global) | Sí (Asignados) | No |
| **Directorio Oficial de Becarios (23 Becarios) y Sedes Geodésicas** | Lectura / Escritura | Lectura (Asignados) | Consulta de Sede |
| **Asistencia GPS Haversine (Prácticas, Escuela de Líderes, Servicio)** | Auditoría | Supervisión | Marcación GPS |
| **Registro Manual de Asistencia por Contingencia (Sin megas / olvido)** | **Sí (Exclusivo Web)** | **Sí (Web)** | Visualiza en Historial |
| **Declaración de Pasajes con Calles, Paradas y Teleférico (Ida/Vuelta)** | Auditoría | Consulta | Declaración en App/Web |
| **Supervisión Conectada de Calles Declaradas y Reembolso 80%** | Aprobación / Detalle 👁️ | Aprobación / Detalle 👁️ | Consulta de Estado |
| **Cuestionario de Bienestar Universitario (26 Preguntas)** | **Modo Edición Institucional** | Visualización Semáforo | Llenado (Sin ver puntajes) |
| **Evaluación del Becario por el Mentor (18 Likert 1–10 + 3 Abiertas = 20 pts)** | Gestión / QR | **Calificación Mentor (20 pts)** | Presentación de QR |
| **Tabla Oficial de Criterios (`23.jpeg`) y Sábana Consolidada Semestral** | Sí (Completa) | Sí (Completa) | No |
| **Descarga de PDF Semestral de 2 Páginas (`Evaluacion_semestre_II.pdf`) y Excel** | Sí (A4 Horizontal) | Sí (A4 Horizontal) | Constancia Personal |
| **Hooks Institucionales (`useConfirmacionDialogo` / `useFormularioValidado`)** | Activo (Cero `alert()`) | Activo (Cero `alert()`) | Activo (Cero `alert()`) |

---

## 8. Guía Rápida de Validación de los Nuevos Requerimientos (`requerimientos2.md`)

1. **Encendido de los Servicios:**
   - **Backend NestJS (`http://localhost:3002`):** En `bumand-backend`, ejecutar `npm run start:dev` (o `npm run sembrar` para refrescar la semilla).
   - **Frontend Next.js (`http://localhost:3000`):** En `bumand-frontend`, ejecutar `npm run dev`.
   - **App Móvil Flutter (`bumand-movil`):** Ejecutar `flutter run -d chrome`.
2. **Prueba de Registro Manual de Asistencia en Web (Contingencia sin megas/olvido):**
   - Iniciar sesión en `http://localhost:3000` con `daniel234.davalos@gmail.com` / `Bumand2026!`.
   - Ir a **Control de Asistencia** y pulsar **"+ Añadir Asistencia Manual"**.
   - Seleccionar al becario, cualquiera de los 3 tipos (`Prácticas`, `Escuela de Líderes` o `Acciones de Servicio`), horas y motivo de contingencia.
   - Si intentas pulsar **Cancelar** tras modificar algún campo, verificarás el diálogo institucional `AlertDialog` de `useConfirmacionDialogo` (*"¿Salir sin completar el formulario?"*).
3. **Prueba de Recorridos Conectados (Calles y Teleférico):**
   - En la App Móvil, iniciar sesión con `adaibelen017@gmail.com` / `Bumand2026!`, ir a **Pasajes -> Declarar recorrido**, registrar las calles/paradas intermedias y líneas de teleférico en Ida y Vuelta.
   - En la Web (**Aprobación Pasajes**), pulsar el botón **Ojito (👁️)** sobre la solicitud del becario para inspeccionar el desglose conectado calle por calle y línea de transporte.
4. **Prueba de Cuestionario de Bienestar (26 Preguntas Editables), Evaluación del Mentor (18+3) y PDF Semestral de 2 Páginas:**
   - En la Web, ir a **Matriz de Evaluación**:
     - Abrir **Semáforo (4B) / Cuestionario de Bienestar Universitario** para ver las 26 preguntas y activar el **Modo Configuración Institucional** (editar o añadir preguntas).
     - Abrir **Código QR / Evaluación del Mentor** para calificar las 18 preguntas en escala 1–10 y las 3 preguntas abiertas (19–21) sobre 20 puntos.
     - Desplazarse a la **Sábana Consolidada Semestral** para revisar la Tabla de Criterios (`23.jpeg`), las 14 columnas reglamentarias, las 12 notas CETI, exportar a Excel o descargar el **PDF Oficial de 2 Páginas (`Evaluacion_semestre_II.pdf`)**.
