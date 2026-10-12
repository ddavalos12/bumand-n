# Catálogo Canónico de Errores Estandarizados BUMAND (ERR-NNNN)

Este documento define la taxonomía oficial de errores estandarizados del ecosistema **BUMAND** (Fundación Diaconía FRIF-IFD). Todo servicio backend, cliente web (Next.js) y cliente móvil (Flutter) debe apegarse a esta nomenclatura para garantizar trazabilidad, resiliencia y una experiencia de usuario clara y en español.

---

## 1. Estructura Estándar de Respuesta de Error

Todos los errores generados o interceptados por el backend retornan un cuerpo JSON estricto con la siguiente estructura:

```json
{
  "codigo_error": "ERR-XXXX",
  "tipo": "DOMINIO_DEL_ERROR",
  "mensaje": "Mensaje legible en español institucional",
  "detalles": [
    "Detalle específico o validación fallida"
  ],
  "marca_tiempo": "2026-10-10T12:00:00.000Z",
  "ruta": "/api/v1/recurso",
  "metodo": "POST"
}
```

### Campos del Payload:
- `codigo_error` (`string`): Identificador único en formato `ERR-NNNN`.
- `tipo` (`string`): Categoría funcional del error (Dominio de negocio).
- `mensaje` (`string`): Descripción amigable y clara del suceso en español.
- `detalles` (`array`): Lista de motivos, errores de validación de campos DTO o trazas para auditoría.
- `marca_tiempo` (`string`): Timestamp ISO 8601 del momento exacto del incidente.
- `ruta` (`string`): Endpoint invocado que generó la excepción.
- `metodo` (`string`): Verbo HTTP empleado (`GET`, `POST`, `PATCH`, `DELETE`, etc.).

---

## 2. Taxonomía de Dominios

| Rango de Códigos | Dominio Funcional | Descripción |
| :--- | :--- | :--- |
| **ERR-1001 – ERR-1099** | `AUTENTICACION_SEGURIDAD` | Inicio de sesión, validez de tokens JWT, control de roles RBAC y estado de cuentas. |
| **ERR-2001 – ERR-2099** | `ASISTENCIA_GEOCERCA` | Geolocalización satelital WGS84, algoritmo Haversine, ventanas horarias e ingreso/salida. |
| **ERR-3001 – ERR-3099** | `PASAJES_VIATICOS` | Declaración mensual de viáticos, liquidación del 80% en centavos y regla de corte del día 24. |
| **ERR-4001 – ERR-4099** | `DEVOCIONALES_EVENTOS` | Asistencia a eventos especiales, longitud de reflexiones espirituales y justificaciones. |
| **ERR-5001 – ERR-5099** | `CLIENTE_RED_VALIDACION` | Conectividad de red, contratos de validación de campos DTO y soporte offline en cola. |
| **ERR-9001 – ERR-9099** | `SISTEMA` | Fallos no controlados del servidor, estado de base de datos y recursos no encontrados. |

---

## 3. Catálogo Detallado de Errores

### Dominio 1000 — Autenticación y Seguridad

| Código | Estado HTTP | Significado Institucional | Sugerencia para el Usuario |
| :--- | :--- | :--- | :--- |
| **ERR-1001** | `401 Unauthorized` | Credenciales de acceso incorrectas (correo institucional o contraseña errónea). | Verifique sus credenciales e intente nuevamente. Si olvidó su contraseña, contacte a administración. |
| **ERR-1002** | `401 Unauthorized` | El token JWT ha expirado, es inválido o no posee firma criptográfica autorizada. | Su sesión ha expirado por inactividad. Vuelva a iniciar sesión en la plataforma. |
| **ERR-1003** | `403 Forbidden` | La cuenta no posee el rol institucional requerido (RBAC) para el recurso solicitado. | No cuenta con permisos para realizar esta acción. Solicite elevación de privilegios si corresponde. |
| **ERR-1004** | `403 Forbidden` | La cuenta institucional del usuario se encuentra deshabilitada o en estado inactivo. | Cuenta desactivada. Comuníquese con la administración institucional de Diaconía. |

#### Ejemplo de Respuesta `ERR-1002`:
```json
{
  "codigo_error": "ERR-1002",
  "tipo": "AUTENTICACION_SEGURIDAD",
  "mensaje": "Token JWT expirado o inválido",
  "detalles": [],
  "marca_tiempo": "2026-10-10T04:15:22.100Z",
  "ruta": "/api/v1/usuarios/perfil",
  "metodo": "GET"
}
```

---

### Dominio 2000 — Asistencia y Geocercas

| Código | Estado HTTP | Significado Institucional | Sugerencia para el Usuario |
| :--- | :--- | :--- | :--- |
| **ERR-2001** | `400 Bad Request` | Las coordenadas GPS del dispositivo exceden el radio métrico permitido de la geocerca. | Acérquese al punto geográfico autorizado del lugar de práctica o iglesia y active alta precisión GPS. |
| **ERR-2002** | `400 Bad Request` | La marcación de asistencia se efectuó fuera de la ventana horaria permitida para la actividad. | Registre su asistencia únicamente dentro del rango horario asignado a su turno o actividad. |
| **ERR-2003** | `409 Conflict` | Ya existe una marcación de ingreso registrada para la fecha o actividad en curso. | La marcación de ingreso ya fue registrada previamente hoy. Registre su salida al finalizar. |
| **ERR-2004** | `400 Bad Request` | Intento de registrar marcación de salida sin contar con una marcación de ingreso previa. | No se detectó un ingreso previo registrado hoy. Notifique a su supervisor pastoral o tutor. |

#### Ejemplo de Respuesta `ERR-2001`:
```json
{
  "codigo_error": "ERR-2001",
  "tipo": "ASISTENCIA_GEOCERCA",
  "mensaje": "Ubicación GPS fuera del radio de tolerancia de la geocerca",
  "detalles": [
    "Distancia calculada: 185 metros. Tolerancia máxima permitida: 50 metros."
  ],
  "marca_tiempo": "2026-10-10T08:02:11.340Z",
  "ruta": "/api/v1/asistencia/marcar",
  "metodo": "POST"
}
```

---

### Dominio 3000 — Pasajes y Viáticos

| Código | Estado HTTP | Significado Institucional | Sugerencia para el Usuario |
| :--- | :--- | :--- | :--- |
| **ERR-3001** | `400 Bad Request` | Solicitud rechazada: la declaración formal de viáticos está permitida únicamente a partir del día 24 de cada mes. | Conserve los recorridos en estado borrador. Podrá remitir la declaración oficial a partir del día 24. |
| **ERR-3002** | `400 Bad Request` | Cálculo de centavos inválido o la tarifa de pasaje no está homologada en el tarifario institucional. | Verifique que los montos declarados coincidan exactamente con las rutas y tarifas autorizadas. |
| **ERR-3003** | `409 Conflict` | Ya existe una solicitud de viáticos enviada, en revisión o aprobada para el periodo fiscal actual. | Ya cuenta con una solicitud registrada para este mes. Revise el estado en el módulo de pasajes. |
| **ERR-3004** | `400 Bad Request` | El revisor intentó rechazar o devolver una solicitud sin ingresar la observación obligatoria. | Debe fundamentar por escrito el motivo de la observación o rechazo para orientar al becario. |

#### Ejemplo de Respuesta `ERR-3001`:
```json
{
  "codigo_error": "ERR-3001",
  "tipo": "PASAJES_VIATICOS",
  "mensaje": "Solicitud rechazada: declaración permitida únicamente a partir del día 24",
  "detalles": [
    "Fecha de intento: día 15. Apertura de ventanilla: día 24 de cada mes a las 00:00."
  ],
  "marca_tiempo": "2026-10-15T14:30:00.000Z",
  "ruta": "/api/v1/pasajes/solicitudes/12/enviar",
  "metodo": "POST"
}
```

---

### Dominio 4000 — Devocionales, Justificaciones y Eventos

| Código | Estado HTTP | Significado Institucional | Sugerencia para el Usuario |
| :--- | :--- | :--- | :--- |
| **ERR-4001** | `400 Bad Request` / `404 Not Found` | El evento institucional no existe, fue cancelado o ha finalizado su periodo de actividad. | Verifique la agenda institucional. El evento seleccionado ya concluyó o no está disponible. |
| **ERR-4002** | `400 Bad Request` | Marcación presencial en un evento especial fuera del radio geodésico Haversine estipulado. | Sitúese dentro del recinto oficial del evento antes de confirmar su asistencia. |
| **ERR-4003** | `400 Bad Request` | La reflexión devocional enviada está vacía o no alcanza la extensión mínima requerida. | Ingrese una reflexión personal meditada cumpliendo la extensión mínima requerida. |
| **ERR-4004** | `400 Bad Request` | Falta el motivo fundado o la justificación obligatoria requerida para la resolución. | Detalle los motivos de fuerza mayor y adjunte la evidencia o respaldo correspondiente. |

#### Ejemplo de Respuesta `ERR-4004`:
```json
{
  "codigo_error": "ERR-4004",
  "tipo": "DEVOCIONALES_EVENTOS",
  "mensaje": "Motivo y justificación detallada obligatoria",
  "detalles": [
    "El campo 'fundamentacion' debe tener un mínimo de 15 caracteres descriptivos."
  ],
  "marca_tiempo": "2026-10-10T11:45:10.000Z",
  "ruta": "/api/v1/justificaciones/resolver",
  "metodo": "POST"
}
```

---

### Dominio 5000 — Cliente, Red y Validación

| Código | Estado HTTP | Significado Institucional | Sugerencia para el Usuario |
| :--- | :--- | :--- | :--- |
| **ERR-5001** | `0` / Cliente | Falla de conexión a internet o tiempo de espera agotado al comunicar con el servidor. | Compruebe su conexión a internet (Wi-Fi o datos móviles) y vuelva a intentarlo. |
| **ERR-5002** | `400 Bad Request` | Validación fallida de datos: campos obligatorios ausentes, tipos erróneos o formato inválido. | Revise los campos marcados en rojo en el formulario y proporcione información válida. |
| **ERR-5003** | `0` / Cliente | Servidor no disponible temporalmente. La acción ha sido encolada en almacenamiento local offline. | No se preocupe: su acción se guardó y se sincronizará automáticamente al recuperar conexión. |

#### Ejemplo de Respuesta `ERR-5002`:
```json
{
  "codigo_error": "ERR-5002",
  "tipo": "CLIENTE_RED_VALIDACION",
  "mensaje": "Validación fallida: campos obligatorios vacíos o con formato inválido",
  "detalles": [
    "correo institucional debe tener un formato de email válido",
    "contrasena debe contener al menos 8 caracteres"
  ],
  "marca_tiempo": "2026-10-10T16:20:00.000Z",
  "ruta": "/api/v1/autenticacion/iniciar-sesion",
  "metodo": "POST"
}
```

---

### Dominio 9000 — Sistema

| Código | Estado HTTP | Significado Institucional | Sugerencia para el Usuario |
| :--- | :--- | :--- | :--- |
| **ERR-9001** | `500 Internal Server Error` | Excepción interna no controlada en el servidor o caída imprevista de infraestructura. | Ocurrió un error inesperado. Intente nuevamente en unos minutos o reporte el incidente a soporte. |
| **ERR-9002** | `404 Not Found` | La entidad, registro o recurso solicitado no existe en la base de datos de BUMAND. | El recurso solicitado no fue encontrado. Verifique la dirección o actualice el catálogo. |

#### Ejemplo de Respuesta `ERR-9002`:
```json
{
  "codigo_error": "ERR-9002",
  "tipo": "SISTEMA",
  "mensaje": "Entidad o recurso no encontrado en base de datos",
  "detalles": [
    "Solicitud de pasaje con ID 999 no encontrada."
  ],
  "marca_tiempo": "2026-10-10T17:05:30.000Z",
  "ruta": "/api/v1/pasajes/solicitudes/999",
  "metodo": "GET"
}
```

---

## 4. Guía de Integración para Desarrolladores

### Backend (NestJS)
Para emitir un error estandarizado desde cualquier servicio o controlador de NestJS:
```typescript
import { HttpStatus } from '@nestjs/common';
import { ExcepcionBumand, CODIGOS_ERROR } from '@/nucleo/errores';

throw new ExcepcionBumand(
  CODIGOS_ERROR.ERR_3001,
  'Solicitud rechazada: declaración permitida únicamente a partir del día 24',
  HttpStatus.BAD_REQUEST,
  { dia_actual: 15, dia_permitido: 24 }
);
```

### Frontend (Next.js)
El cliente HTTP `clienteApi` y el componente de frontera de error `error.tsx` detectan automáticamente la firma `codigo_error` y ofrecen recuperación guiada con reintento y detalles técnicos desplegables.
