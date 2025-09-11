import { Request, Response, NextFunction } from "express";
import { prisma, redis } from "../db";

export interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
}

// GET /api/tasks
async function getTasks(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const cacheKey = "tasks:all";
		const cached = await redis.get(cacheKey);
		if (cached) {
			res.status(200).json(JSON.parse(cached));
			return;
		}
		const tasks = await prisma.task.findMany({
			orderBy: { createdAt: "desc" },
		});
		await redis.set(cacheKey, JSON.stringify(tasks), { EX: 60 }); // 60 segundos de caché
		res.status(200).json(tasks);
	} catch (error) {
		next(error);
	}
}

// POST /api/tasks
async function createNewTask(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { title, description } = req.body as {
			title?: string;
			description?: string;
		};
		if (!title || typeof title !== "string" || title.trim().length < 1) {
			res.status(400).json({
				error: "ValidationError",
				message: "El título es requerido y debe ser un string no vacío.",
			});
			return;
		}
		if (
			!description ||
			typeof description !== "string" ||
			description.trim().length < 1
		) {
			res.status(400).json({
				error: "ValidationError",
				message: "La descripción es requerida y debe ser un string no vacío.",
			});
			return;
		}
		const newTask = await prisma.task.create({
			data: {
				title: title.trim(),
				description: description.trim(),
				completed: false,
			},
		});
		await redis.del("tasks:all");
		res.status(201).json(newTask);
	} catch (error) {
		next(error);
	}
}

// PUT /api/tasks/:id
async function updateTask(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { id } = req.params;
		if (!id || typeof id !== "string") {
			res
				.status(400)
				.json({ error: "ValidationError", message: "ID inválido." });
			return;
		}
		const { title, description, completed } = req.body as {
			title?: string;
			description?: string;
			completed?: boolean;
		};
		// Validaciones
		if (
			title !== undefined &&
			(typeof title !== "string" || title.trim().length < 1)
		) {
			res.status(400).json({
				error: "ValidationError",
				message: "El título debe ser un string no vacío.",
			});
			return;
		}
		if (
			description !== undefined &&
			(typeof description !== "string" || description.trim().length < 1)
		) {
			res.status(400).json({
				error: "ValidationError",
				message: "La descripción debe ser un string no vacío.",
			});
			return;
		}
		if (completed !== undefined && typeof completed !== "boolean") {
			res.status(400).json({
				error: "ValidationError",
				message: "El campo completed debe ser booleano.",
			});
			return;
		}
		const updated = await prisma.task
			.update({
				where: { id },
				data: {
					...(title !== undefined ? { title: title.trim() } : {}),
					...(description !== undefined
						? { description: description.trim() }
						: {}),
					...(completed !== undefined ? { completed } : {}),
				},
			})
			.catch(() => null);
		if (!updated) {
			res
				.status(404)
				.json({ error: "NotFound", message: "Tarea no encontrada." });
			return;
		}
		await redis.del("tasks:all");
		res.status(200).json(updated);
	} catch (error) {
		next(error);
	}
}

// DELETE /api/tasks/:id
async function deleteTask(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { id } = req.params;
		if (!id || typeof id !== "string") {
			res
				.status(400)
				.json({ error: "ValidationError", message: "ID inválido." });
			return;
		}
		const deleted = await prisma.task
			.delete({ where: { id } })
			.catch(() => null);
		if (!deleted) {
			res
				.status(404)
				.json({ error: "NotFound", message: "Tarea no encontrada." });
			return;
		}
		await redis.del("tasks:all");
		res.status(200).json({ message: "Tarea eliminada correctamente." });
	} catch (error) {
		next(error);
	}
}

export { getTasks, createNewTask, updateTask, deleteTask };
