# Ecosistema BUMAND - Repositorio Principal

Bienvenido al repositorio unificado del **Sistema de Control de Asistencia y Seguimiento del Desempeño de Becarios (BUMAND)**.

---

## 🔗 Repositorios del Ecosistema

Este proyecto está organizado mediante una arquitectura modular de submódulos Git:

| Componente | Repositorio GitHub | Descripción |
| :--- | :--- | :--- |
| **Repositorio Principal (Monorepo)** | [ddavalos12/bumand-n](https://github.com/ddavalos12/bumand-n) | Repositorio raíz que orquesta los submódulos y agentes |
| **Backend API** | [ddavalos12/bummand-backend](https://github.com/ddavalos12/bummand-backend) | API REST en NestJS, TypeScript, TypeORM y PostgreSQL |
| **Frontend Web** | [ddavalos12/bummand-frontend](https://github.com/ddavalos12/bummand-frontend) | Panel de control en Next.js 14+, React y Shadcn UI |
| **Aplicación Móvil** | [ddavalos12/bummand-movil](https://github.com/ddavalos12/bummand-movil) | App nativa en Flutter (Clean Architecture + Riverpod) |

### 📥 Clonar Todo el Proyecto (con submódulos)

Para clonar el ecosistema completo junto con todos sus submódulos en una sola instrucción:

```bash
git clone --recursive https://github.com/ddavalos12/bumand-n.git
```

> **Nota:** Si ya habías clonado el proyecto sin la bandera `--recursive`, ejecuta dentro de la carpeta del proyecto:
> ```bash
> git submodule update --init --recursive
> ```

---

## 🏗️ Arquitectura del Sistema

Este repositorio sigue una estructura monorepo dividida lógicamente en tres proyectos independientes para mantener autonomía tecnológica, tipado estricto y separación limpia de responsabilidades:

```text
new-bumand/
├── bumand-backend/       # API REST (NestJS, TypeScript, TypeORM, PostgreSQL)
├── bumand-frontend/      # Panel Administrativo Web (Next.js 14+, React, Shadcn UI)
├── bumand-movil/         # Aplicación Móvil para Becarios (Flutter, Clean Architecture, Riverpod)
└── .agents/              # Configuraciones de agentes y reglas de código
```

### 1. Backend API (`bumand-backend`)
- **Tecnología:** Node.js, NestJS, TypeScript, TypeORM, PostgreSQL.
- **Responsabilidad:** Autenticación JWT, registro de asistencia, lógica aritmética de devolución del 80% de pasajes, evaluación cualitativa F-03 y exportación de reportes.
- **Convención:** Controladores y entidades en español, rutas REST en `kebab-case` (ej. `@Controller('autenticacion')`, `@Post('inicio-sesion')`), atributos en `snake_case`.

### 2. Frontend Web (`bumand-frontend`)
- **Tecnología:** Next.js (App Router, Turbopack), React, Tailwind CSS, Shadcn UI.
- **Responsabilidad:** Panel de control para coordinadores y supervisores, indicadores KPI, visualización de módulos F-03, firma digital de aprobación y registro de recorridos.
- **Convención:** Componentes en español y archivos `kebab-case.tsx`, variables de estado en `snake_case`, funciones en `camelCase`.

### 3. Aplicación Móvil (`bumand-movil`)
- **Tecnología:** Flutter (Dart), Clean Architecture (`lib/nucleo/`, `lib/modulos/`, `lib/widgets-comunes/`), Riverpod.
- **Responsabilidad:** Interfaz nativa para el becario: marcación de asistencia con geocercas universitarias, declaración de recorridos de ida/vuelta y consulta de evaluaciones.
- **Convención:** 100% en español, archivos en `kebab-case.dart`, atributos en `snake_case`, Widgets en `PascalCase`.

---

## 📐 Estándar Global de Nombrado y Código

Todo el código fuente en los tres proyectos se rige por:

- **`snake_case`:** Variables y atributos (modelos, DTOs, entidades, estados).
- **`camelCase`:** Métodos y funciones lógicas.
- **`PascalCase`:** Clases, Interfaces, DTOs, Entidades, Componentes React y Widgets Flutter.
- **`UPPER_SNAKE_CASE`:** Constantes.
- **`kebab-case`:** Archivos, carpetas y rutas de red REST.
- **Español Absoluto:** Cero terminología en inglés innecesaria en nombres de variables, métodos o carpetas.

---

## 🚀 Comandos para Compilar y Encender los Proyectos

### A. Backend (`bumand-backend`)
Ubicación: `new-bumand/bumand-backend`

```bash
# Instalar dependencias
npm install

# Compilar proyecto (Webpack)
npm run compilar

# Encender en modo desarrollo (recarga en caliente / watch)
npm run iniciar:desarrollo

# Encender en modo producción
npm run iniciar:produccion
```

---

### B. Frontend Administrativo (`bumand-frontend`)
Ubicación: `new-bumand/bumand-frontend`

```bash
# Instalar dependencias
npm install

# Compilar proyecto para producción (Turbopack + TypeScript)
npm run compilar

# Encender en modo desarrollo (puerto 3000 por defecto)
npm run iniciar:desarrollo

# Encender en modo producción
npm run iniciar:produccion
```

---

### C. Aplicación Móvil (`bumand-movil`)
Ubicación: `new-bumand/bumand-movil`

```bash
# Obtener paquetes
flutter pub get

# Verificación de análisis estático (0 advertencias requeridas)
flutter analyze

# Ejecución de pruebas unitarias
flutter test

# Encender en emulador o dispositivo móvil conectado
flutter run

# Encender en navegador web (Google Chrome)
flutter run -d chrome

# Encender como aplicación nativa de escritorio Windows
flutter run -d windows
```

---

## 📑 Documentación Técnica en PDF

- **Documentación General:** [`documentacion_bumand.pdf`](file:///c:/Users/yang_/Desktop/Bumands-Proyecto/documentacion_bumand.pdf)
- **Documentación de Aplicación Móvil:** [`documentacion_movil.pdf`](file:///c:/Users/yang_/Desktop/Bumands-Proyecto/new-bumand/bumand-movil/documentacion_movil.pdf)
