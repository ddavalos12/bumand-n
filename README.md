# Proyecto BUMAND - Monorepo

Bienvenido al repositorio unificado del **Sistema Web de Control de Asistencia y Seguimiento del Desempeño de Becarios (BUMAND)**.

## 🏗️ Arquitectura del Sistema

Este repositorio sigue una estructura de monorepo dividida lógicamente en tres proyectos principales para mantener la independencia tecnológica y el tipado estricto en cada capa:

```text
new-bumanss/
├── bumand-frontend/      # Panel Administrativo (Next.js, React, Tailwind, Shadcn UI)
├── bumand-backend/       # API REST (Nest.js, TypeScript, Prisma ORM, Puppeteer-Core)
├── bumand-movil/         # Aplicación Móvil (Flutter, Dart puro)
├── .agents/              # Configuraciones de agentes AI y reglas de código
├── BACKLOG_GENERAL.md    # Lista de Sprints y tareas históricas/pendientes
└── BACKLOG_TEMPORAL.md   # Tareas activas de la iteración en curso
```

### 1. Panel Administrativo (`bumand-frontend`)
Construido sobre **Next.js (App Router)** para máxima flexibilidad de rutas y SEO corporativo, junto a **TypeScript**. Usa **Tailwind CSS** y **Shadcn UI** para garantizar componentes reactivos, modernos y accesibles sin necesidad de escribir CSS puro desde cero. 
- **Estándar:** Componentes funcionales en español (`paginas/`, `componentes/`, `hooks/`), y cero comentarios obvios.

### 2. Capa de Servicios y API (`bumand-backend`)
Desarrollada sobre **Node.js/Express (vía Nest.js o similar)** 100% en **TypeScript**.
- **Base de Datos:** PostgreSQL administrado a través de **Prisma ORM** para aprovechar su seguridad de tipos estricta y descartar el sobrecosto de TypeORM.
- **Motor de Reportes:** Utiliza **Puppeteer-Core** para generar PDFs oficiales directamente desde el servidor (Sprint 8).
- **Estándar:** Módulos separados en español, DTOs validados con `class-validator`, inyección de dependencias.

### 3. Aplicación Móvil (`bumand-movil`)
Conserva el desarrollo nativo en **Flutter (Dart)** para garantizar compatibilidad con dispositivos Android económicos y un rendimiento óptimo en la captura de geolocalización (fórmula matemática de Haversine) y notificaciones Push (Firebase Cloud Messaging).
- **Nota de Arquitectura:** Se ha descartado deliberadamente la inclusión de Rust o Tauri Mobile para evitar sobreingeniería y penalizaciones en la latencia de memoria por el puente FFI.

## 📝 Reglas y Flujos de Trabajo
Toda aportación al proyecto debe regirse por las normativas establecidas en la carpeta `.agents/rules/`:
1. Uso exclusivo de **Commits Convencionales en Español** (ej. `feat:`, `fix:`, `docs:`).
2. Nomenclatura en **kebab-case** para rutas y directorios, y **PascalCase** para clases y componentes React, todo estrictamente en **ESPAÑOL**.
3. Mantener limpios los directorios eliminando archivos residuales (`.log`, `.tex` compilados) post-iteración.
