import { createClient } from "redis";

export const redis = createClient({
	url: process.env.REDIS_URL || "redis://localhost:6379",
});

redis.on("error", (err) => {
	console.error("Redis Client Error", err);
});

(async () => {
	if (!redis.isOpen) await redis.connect();
})();
