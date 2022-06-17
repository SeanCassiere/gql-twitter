import "reflect-metadata";
import { createServer } from "./utils/createServer";
import env from "./utils/env";

async function main() {
	const { app, server } = await createServer();

	app.get("/healthcheck", async () => "OK");

	await server.start();

	app.register(
		server.createHandler({
			cors: false,
		})
	);

	await app.listen({
		port: env.PORT,
	});

	console.log(`Server ready at http://localhost:${env.PORT}${server.graphqlPath}`);
}

main().catch(console.error);
