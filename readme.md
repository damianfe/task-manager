# Task Manager Challenge

Este es un challenge para la **Academia ForIT 2025**, donde se desarrolla una aplicación de lista de tareas utilizando **NestJS** para el backend y **Next.js** para el frontend, estructurado como un **monorepo** con `pnpm`.

## 🚀 Tecnologías utilizadas

- **Backend**: NestJS con arquitectura hexagonal
- **Frontend**: Next.js con React y TypeScript
- **Gestor de paquetes**: pnpm workspaces

## 📂 Estructura del proyecto

```
task-manager/
│── packages/
│   ├── backend/    # API con NestJS
│   ├── frontend/   # Aplicación Next.js
│── pnpm-workspace.yaml
│── package.json
│── README.md
│── .gitignore
```

## 🔧 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/task-manager.git
cd task-manager
```

### 2️⃣ Instalar dependencias

```sh
pnpm install
```

### 3️⃣ Ejecutar los servicios

- **Backend**:
  ```sh
  pnpm --filter backend dev
  ```
- **Frontend**:
  ```sh
  pnpm --filter frontend dev
  ```

## 📌 Funcionalidades

-

## 📜 Licencia

Este proyecto se encuentra bajo la licencia MIT.

