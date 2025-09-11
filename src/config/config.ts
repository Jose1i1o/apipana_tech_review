import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "production" | "test";

interface AppConfig {
	port: number;
	databaseUrl: string;
	nodeEnv: NodeEnv;
}

const config: AppConfig = {
	port: Number(process.env.PORT) || 3000,
	databaseUrl: process.env.DATABASE_URL || "",
	nodeEnv: (process.env.NODE_ENV as NodeEnv) || "development",
};

export default config;
