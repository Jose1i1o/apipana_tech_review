# Apipana Tech Review

## Descripción

API RESTful para gestión de tareas (Task Management) construida con Node.js, Express, TypeScript, Prisma y PostgreSQL. Incluye almacenamiento en caché con Redis y buenas prácticas de seguridad.

## Características

- CRUD completo de tareas (`/api/tasks`)
- Validación de datos (campos requeridos, longitud mínima y máxima)
- Almacenamiento en PostgreSQL usando Prisma ORM
- Seeder automático de tareas de ejemplo
- Caché de tareas con Redis para mejorar el rendimiento
- Seguridad: Helmet, CORS, rate limiting
- Configuración por variables de entorno (`.env`)
- Código tipado con TypeScript

## Endpoints principales

- `GET    /api/tasks` — Lista todas las tareas (con caché)
- `POST   /api/tasks` — Crea una nueva tarea
- `PUT    /api/tasks/:id` — Actualiza una tarea existente
- `DELETE /api/tasks/:id` — Elimina una tarea

## Validaciones

- `title`: requerido, mínimo 3, máximo 100 caracteres
- `description`: requerido, mínimo 10, máximo 500 caracteres
- `completed`: booleano (opcional en creación)

## Seguridad

- [helmet](https://www.npmjs.com/package/helmet): cabeceras seguras
- [cors](https://www.npmjs.com/package/cors): CORS habilitado
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit): límite de peticiones

## Configuración

Variables en `.env`:

```
PORT=3000
DATABASE_URL=postgresql://...
NODE_ENV=development
REDIS_URL=redis://localhost:6379
```

## Scripts útiles

- `pnpm dev` — Desarrollo
- `pnpm build` — Compilar TypeScript
- `pnpm start` — Producción
- `npx prisma migrate dev` — Migraciones
- `npx prisma studio` — Administra la base de datos

## Inicialización

1. Instala dependencias: `pnpm install`
2. Configura `.env` con tus datos
3. Ejecuta migraciones: `npx prisma migrate dev`
4. Inicia el servidor: `pnpm dev`

---

Desarrollado para evaluación técnica. Incluye buenas prácticas de arquitectura, seguridad y rendimiento.
