import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const count = await prisma.task.count();
	if (count === 0) {
		await prisma.task.createMany({
			data: [
				{
					title: "Primera tarea",
					description: "Ejecutar por Daniel",
					completed: false,
				},
				{
					title: "Segunda tarea",
					description: "Ejecutar por Jaime",
					completed: false,
				},
				{
					title: "Tercera tarea",
					description: "Ejecutar por Eduardo",
					completed: false,
				},
			],
		});
		console.log("Tareas iniciales insertadas");
	} else {
		console.log(
			"La base de datos ya tiene tareas, no se insertan datos iniciales."
		);
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
