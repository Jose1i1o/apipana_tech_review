import express from "express";
import { tasksRoutes } from "./routes";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// Seguridad y utilidades
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 req/15min

app.use("/api", tasksRoutes);

export default app;
