# Task Manager Challenge

Este es un challenge para la **Academia ForIT 2025**, donde se desarrolla una aplicación de lista de tareas utilizando **NestJS** para el backend y **Next.js** para el frontend, estructurado como un **monorepo** con `pnpm`.
## 📁 Estructura del Proyecto

```
.
├── backend/   # Backend con Express
├── frontend/  # Frontend con React y Vite
└── README.md  # Documentación
```

---

# 🖥 Backend

## 🚀 Instalación y Configuración

1. Ve al directorio del backend:
   ```sh
   cd backend
   ```
2. Instala las dependencias:
   ```sh
   pnpm install
   ```
3. Crea un archivo `.env` con la configuración necesaria:
   ```env
   PORT=4000
   DATABASE_URL=postgresql://user:password@localhost:5432/tasks_db
   ```
4. Ejecuta las migraciones de Prisma:
   ```sh
   pnpm prisma migrate dev
   ```
5. Inicia el servidor:
   ```sh
   pnpm dev
   ```

## 📌 Endpoints

- `GET /tasks` → Obtiene todas las tareas.
- `POST /tasks` → Crea una nueva tarea.
- `PATCH /tasks/:id` → Actualiza una tarea.
- `DELETE /tasks/:id` → Elimina una tarea.

---

# 🎨 Frontend

## 🚀 Instalación y Ejecución

1. Ve al directorio del frontend:
   ```sh
   cd frontend
   ```
2. Instala las dependencias:
   ```sh
   pnpm install
   ```
3. Crea un archivo `.env` con la URL del backend:
   ```env
   VITE_API_URL=http://localhost:4000
   ```
4. Inicia la aplicación:
   ```sh
   pnpm dev
   ```

## 📌 Funcionalidades

✅ Agregar, editar y eliminar tareas.  
✅ Marcar tareas como completadas.  
✅ Animaciones con Framer Motion.  
✅ Estilos con Tailwind CSS.  

---

# 📜 Licencia

Este proyecto está bajo la licencia MIT.

