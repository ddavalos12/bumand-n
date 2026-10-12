# Especificación de Diseño: Gestión de Tarifas con Vigencia Temporal, Paradas y Declaración de Pasajes (Móvil y Web)

**Fecha:** 2026-10-11  
**Proyecto:** BUMAND (Becas Universitarias con Misión y Acción Diaconal) - Diaconía FRIF-IFD / UMSA  
**Estatus:** En Revisión (Enfoque A: Tarifario Institucional con Vigencia Temporal)  

---

## 1. Visión y Objetivos

Este diseño formaliza la evolución del módulo de viáticos y pasajes en el ecosistema BUMAND (Backend NestJS, Web Next.js 14+ y Móvil Flutter 3) con base en el prototipo interactivo validado:

1. **Vigencia Temporal y Retroactividad de Tarifas:**
   - Permitir al Administrador definir y actualizar el catálogo oficial de tarifas de transporte público (La Paz - El Alto) asociándoles fechas de vigencia (`vigente_desde` y `vigente_hasta`).
   - Soportar incrementos o ajustes normativos aplicables de forma retroactiva a una fecha pasada sin corromper planillas de meses cerrados.

2. **Declaración Asistida Idéntica al Prototipo:**
   - Flujo en dos etapas guiadas (**1. Ida** y **2. Vuelta**) tanto en la app móvil como en el portal web.
   - Soporte dinámico de múltiples paradas intermedias con fijación de coordenadas GPS y confirmación de asistencia en cada punto.
   - Selección de medios de transporte con tarifas reguladas y soporte para agregar tramos de transbordo.
   - Opción de retorno ágil (**↺ Usar ida en reversa**) para autocompletar la vuelta invirtiendo el orden de paradas y replicando la tarifa.

3. **Gobernanza y Roles Claros:**
   - **Administrador:** Parametriza paradas oficiales y tarifas con sus fechas de inicio/término.
   - **Becario:** Registra sus viajes diarios según las tarifas oficiales vigentes a la fecha del viaje y confirma el apoyo social/pastoral realizado.
   - **Supervisor:** Audita los tramos, valida la concordancia con la sede asignada y dictamina aprobación o rechazo justificado.

---

## 2. Reglas de Negocio y Ciclo de Vida de Tarifas

### 2.1. Estados y Ventanas de Vigencia
Cada tarifa del catálogo posee los siguientes atributos de negocio:
- **Medio de Transporte:** Identificación comercial (ej. Minibús El Alto, Minibús Interciudad, Mi Teleférico, Microbús, Trufi).
- **Costo Oficial (Bs):** Monto en bolivianos regulado por norma.
- **Tipo de Tramo:** Urbano local, Interciudad La Paz - El Alto, o Red de cable.
- **Fecha de Inicio de Vigencia (`vigente_desde`):** Fecha calendario a partir de la cual entra en rigor la tarifa.
- **Fecha de Fin de Vigencia (`vigente_hasta`):** Opcional. Si es nula, indica que la tarifa se encuentra activa por tiempo indefinido. Al promulgarse una nueva tarifa para el mismo medio, la anterior se cierra automáticamente con el día previo.

### 2.2. Regla de Retroactividad y Protección Histórica
1. **Inmutabilidad de lo Aprobado:** Toda solicitud de pasajes en estado `APROBADO` o correspondiente a periodos mensuales pasados queda sellada. El valor monetario de los recorridos aprobados jamás se modifica retroactivamente para resguardar la auditoría contable.
2. **Aplicación Retroactiva en Borradores:** Si un cambio de tarifa rige a partir de una fecha anterior (ej. se registra el día 15 pero aplica desde el día 1 del mes):
   - Al registrar nuevos viajes dentro de ese mes, el sistema cargará automáticamente la nueva tarifa.
   - Para viajes ya guardados en `BORRADOR` entre el día 1 y el día 14, el sistema ofrece una acción explícita: *"Reajustar tarifas al tarifario vigente"*, permitiendo al becario o supervisor actualizar la planilla al nuevo valor antes de su envío el día 24.

### 2.3. Regla del Día 24 y Liquidación al 80%
- El cálculo de reembolso institucional es exactamente el **80% del gasto total declarado**, liquidado internamente en centavos para precisión matemática.
- La planilla mensual solo puede remitirse formalmente a revisión a partir del **día 24 de cada mes**.

---

## 3. Experiencia de Usuario en la Aplicación Móvil (Flutter)

### 3.1. Pantalla de Declaración Diaria
1. **Encabezado Institucional:**
   - Campo *"Apoyo realizado"* con descripción de la actividad pastoral/universitaria.
   - Selector de fecha del viaje (por defecto la fecha actual, con restricción a no permitir fechas futuras y hasta dos meses previos).
2. **Selector de Paso (Pestañas 1 · Ida y 2 · Vuelta):**
   - **Paso 1: Ida:**
     - Lista secuencial de paradas: 1. Origen, 2. Destino y botón `+ Agregar parada`.
     - Cada parada cuenta con botón de PIN GPS y botón de estado *"Confirmar"*.
     - Tarifa de la Ida: Lista de chips de acceso rápido con las tarifas oficiales vigentes a la fecha seleccionada + opción *"Otro (escribir monto)"*.
     - Botón `+ Agregar tramo de tarifa (transbordo)` para añadir transportes sucesivos.
     - Botón *"Guardar ruta ida"* que valida los campos y habilita el avance al siguiente paso.
   - **Paso 2: Vuelta:**
     - Botón destacado: **`↺ Usar la ida en reversa`**, que invierte automáticamente el orden de las paradas de ida y adopta la misma tarifa.
     - Opción de ajustar paradas o transbordos si el trayecto de regreso difirió del de ida.
     - Botón *"Guardar ruta vuelta"*.
3. **Resumen de Liquidación en Vivo:**
   - Tarjeta inferior reactiva mostrando: Total del día (Bs) y Devolución del 80% (Bs).

---

## 4. Experiencia de Usuario en la Aplicación Web (Next.js)

### 4.1. Módulo del Becario: Declaración de Recorridos
- Componente interactivo que reproduce el mismo flujo de dos pasos (Ida y Vuelta) adaptado a teclado y pantalla amplia, con autocompletado de paradas frecuentes y cálculo instantáneo del reembolso.

### 4.2. Módulo del Administrador: Configuración de Tarifas y Paradas
- **Bandeja de Tarifas Institucionales:**
  - Tabla con medios de transporte, montos actuales, fechas de vigencia y etiquetas de estado (*Vigente*, *Programada a futuro*, *Histórica*).
- **Diálogo Modal "Nueva Actualización Tarifaria":**
  - Permite seleccionar el medio de transporte, ingresar el nuevo costo y definir la fecha de inicio de vigencia (permitiendo fechas pasadas para ajustes retroactivos).
  - Al guardar, el sistema archiva la versión anterior y activa la nueva versión con trazabilidad del usuario administrador que efectuó el cambio.
- **Catálogo de Paradas Urbanas:**
  - Administración de paradas oficiales, coordenadas y zonas (El Alto / La Paz).

### 4.3. Módulo del Supervisor: Aprobación y Auditoría
- Vista pormenorizada de cada viaje del becario: mapa de paradas declaradas, medio de transporte y tarifa aplicada.
- Alerta visual en caso de tarifas manuales fuera de norma ("Otro monto") para solicitar justificación previa a la aprobación del 80%.

---

## 5. Fases de Implementación Propuestas

1. **Fase 1: Capa de Datos y Servicios (Backend NestJS)**
   - Ajustar el modelo de datos de tarifas para incorporar `vigente_desde`, `vigente_hasta` y versionado histórico.
   - Endpoint de consulta de tarifas filtrado por fecha de viaje (`GET /api/pasajes/tarifas?fecha=YYYY-MM-DD`).
   - Endpoint administrativo para registrar actualizaciones tarifarias retroactivas o futuras.

2. **Fase 2: Módulo Administrativo y de Supervisión (Web Next.js)**
   - Vista de administración de tarifas con selector de vigencias y archivo histórico.
   - Integración en la pantalla de revisión de pasajes del supervisor.

3. **Fase 3: Flujo de Declaración Guiada (Móvil Flutter y Web Next.js)**
   - Interfaz de dos pasos (Ida y Vuelta) con paradas dinámicas, confirmación GPS, transbordos y botón de reversa.
   - Vinculación del selector de fecha con el catálogo de tarifas vigentes.

4. **Fase 4: Verificación Integral y Pruebas**
   - Validación del cálculo en centavos del 80%.
   - Pruebas de simulación retroactiva (registro de tarifa con fecha anterior y recálculo de planillas en borrador).
   - Verificación de la regla del día 24.
