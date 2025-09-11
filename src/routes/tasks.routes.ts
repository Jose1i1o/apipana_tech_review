import Router from "express";
import { getTasks, createNewTask, updateTask, deleteTask } from "../controller";

const tasksRoutes = Router();

// GET all tasks
tasksRoutes.get("/tasks", getTasks);
// POST create new task
tasksRoutes.post("/tasks", createNewTask);
// PUT update task
tasksRoutes.put("/tasks/:id", updateTask);
// DELETE task
tasksRoutes.delete("/tasks/:id", deleteTask);

export { tasksRoutes };
