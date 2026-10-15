# ESPECIFICACIÓN TÉCNICA Y PLAN DE IMPLEMENTACIÓN — FASE B (BUMAND)

**Documento:** Plan de Implementación de Seguridad JWT, Evaluación 360° y Token Pastoral F-03  
**Fecha:** 15 de Octubre de 2026  
**Ecosistema:** NestJS (Backend), Next.js 16 (Frontend Web), PostgreSQL / TypeORM  
**Estado:** Aprobado para ejecución tras Fase A  

---

## 1. MÓDULO DE SEGURIDAD Y TOKENS JWT

### 1.1. Diagnóstico Actual
- El token JWT emitido en `AutenticacionServicio` posee una vigencia estática prolongada (30 días).
- `JwtStrategy` solo valida la firma matemática del JWT sin consultar si el usuario fue dado de baja lógica (`estado === EstadoUsuario.INACTIVO`).

### 1.2. Especificación de Cambios
1. **Configuración de Tiempos:**
   - `JWT_EXPIRATION_TIME`: Reducido a `15m` (15 minutos).
   - Generación de `refresh_token` criptográfico opaco o firmado con vigencia de 7 días (`7d`).
2. **Entidad `RefreshToken` (`bumand-backend/src/modulos/autenticacion/entidades/refresh-token.entidad.ts`):**
   - `id`: PrimaryGeneratedColumn()
   - `usuario_id`: FK hacia `usuarios.id` (ON DELETE CASCADE)
   - `token_hash`: Hash bcrypt o SHA-256 del refresh token
   - `revocado`: boolean (default false)
   - `expira_en`: Date
   - `ip_creacion`: string (opcional)
   - `created_at`: Date
3. **Endpoints de Autenticación:**
   - `POST /autenticacion/iniciar-sesion`: Retorna `{ access_token, refresh_token, usuario }`.
   - `POST /autenticacion/refrescar`: Recibe `{ refresh_token }`, verifica firma, hash y vigencia en BD, genera nuevo `access_token` y rota el `refresh_token`.
   - `POST /autenticacion/cerrar-sesion`: Marca el refresh token como `revocado = true`.
4. **Verificación Estricta de Estado Activo:**
   - Modificar `JwtStrategy.validate(payload)`:
     ```typescript
     const usuario = await this.usuariosServicio.obtenerPorIdConRelaciones(payload.sub);
     if (!usuario || usuario.estado !== EstadoUsuario.ACTIVO) {
       throw new UnauthorizedException('Usuario inactivo o suspendido institucionalmente');
     }
     return usuario;
     ```

---

## 2. EVALUACIÓN 360° Y ACCESO PASTORAL EXTERNO (MAGIC LINK / QR F-03)

### 2.1. Diagnóstico Actual
- En la vista del becario existe un botón indebido para "Llenar Formulario Pastoral F-03", permitiendo que el propio evaluado complete las preguntas de su pastor.
- Los pastores no deben crearse cuentas ni autenticarse en el sistema con credenciales de usuario.

### 2.2. Especificación de Cambios
1. **Mecanismo de Token Temporal Firmado:**
   - Uso de un secreto independiente `JWT_MAGIC_LINK_SECRET` con expiración de 7 a 14 días.
   - Payload: `{ evaluacion_id: number, becario_id: number, iglesia_id: number, tipo: 'f03_pastor' }`.
2. **Endpoints en Backend (`EvaluacionesControlador`):**
   - `POST /evaluaciones/:id/generar-token-pastor`: Protegido por JWT (Supervisor, Administrador o Becario). Retorna `{ url_magic_link: string, expira_en: string, token: string }`.
   - `GET /evaluaciones/f03/acceso/:token`: **Público**. Valida el token y retorna datos informativos (nombre del becario, carrera, universidad, nombre de la iglesia).
   - `POST /evaluaciones/f03/completar/:token`: **Público**. Recibe respuestas del F-03 (`campos_formulario`), nombre del pastor, C.I., observaciones y firma digitalizada (DataURL base64). Persiste en `evaluaciones_pastor` y actualiza la evaluación a `completada`.
3. **Ruta Frontend Pública en Next.js:**
   - `/src/app/evaluaciones/pastor/[token]/page.tsx`:
     - Pantalla sin sidebar administrativo, optimizada para teléfonos móviles (Mobile First).
     - Componente de formulario F-03 con preguntas pastorales obligatorias.
     - Canvas interactivo para firma táctil en pantalla (`<canvas>` con captura de eventos táctiles y exportación a base64).
4. **Corrección de la Vista del Becario:**
   - Remover el botón "Llenar Formulario F-03".
   - Incorporar el diálogo interactivo "Compartir Formulario F-03 a mi Pastor" con:
     - Generador de código QR para escaneo presencial en la iglesia.
     - Botón de "Copiar enlace de acceso único".
     - Botón "Compartir por WhatsApp": `https://wa.me/?text=Estimado+Pastor...`.

---

## 3. SEPARACIÓN DE PERMISOS RBAC EN `POST /evaluaciones`

### 3.1. Matriz de Autorización Formal por Módulo

| Módulo | Nombre del Módulo | Peso | Rol / Actor Autorizado | Mecanismo |
|---|---|:---:|---|---|
| **M1** | Liderazgo en la Iglesia (F-03) | 25% | **Pastor de la Iglesia Local** | Magic Link / Token Externo (`POST /evaluaciones/f03/completar/:token`) |
| **M2** | Autoevaluación Académica | 20% | **Becario** | `POST /evaluaciones` (restringido únicamente a `modulo_id = 2`) |
| **M3** | Evaluación del Mentor | 25% | **Supervisor / Tutor** | `POST /evaluaciones` (roles `SUPERVISOR`, `ADMINISTRADOR`) |
| **M4** | Escuela de Líderes | 15% | **Facilitador / Supervisor** | `POST /evaluaciones` (roles `SUPERVISOR`, `ADMINISTRADOR`) |
| **M5** | Evaluación Socioeconómica | 15% | **Trabajador Social / Admin** | `POST /evaluaciones` (rol `ADMINISTRADOR`) |

### 3.2. Validación en `EvaluacionesServicio.crear()`
```typescript
if (usuario.rol === Rol.BECARIO) {
  if (crear_dto.modulo_id !== 2) {
    throw new ForbiddenException('El becario únicamente está autorizado a enviar su Autoevaluación Académica (Módulo 2).');
  }
  if (becario.id !== crear_dto.becario_id) {
    throw new ForbiddenException('No puedes registrar evaluaciones para otro becario.');
  }
}
```

---

## 4. FASES Y SPRINT BREAKDOWN DE FASE B

1. **Sprint B1 (Tokens & Seguridad):** Entidad `RefreshToken`, acortar TTL JWT a 15m, rotación de tokens y guard inactivo.
2. **Sprint B2 (RBAC Evaluaciones):** Restricción de `POST /evaluaciones` por `modulo_id` y rol.
3. **Sprint B3 (Backend Magic Link F-03):** Endpoints de token, acceso y compleción pública con firma.
4. **Sprint B4 (Frontend Pastoral Móvil):** Página `/evaluaciones/pastor/[token]` con firma táctil en pantalla.
5. **Sprint B5 (UI Becario):** Diálogo de QR y WhatsApp para compartir el F-03 pastoral al pastor.
