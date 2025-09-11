import config from "./config/config";
import("../prisma/seed").catch(() => {});

import app from "./server";

const PORT = config.port || 3000;

app.listen(PORT, () =>
	console.log(`Bienvenido Apipana a tu Servidor en el puerto ${PORT}`)
);
