import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { execute, GraphQLSchema, subscribe } from "graphql";
import { buildSchema } from "type-graphql";

import DataLoader from "dataloader";

import env from "./env";
import bearerAuthChecker from "./bearerAuthChecker";

import { FollowUser, User } from "#root/modules/user/user.dto";
import UserResolver from "#root/modules/user/user.resolver";
import PostResolver from "#root/modules/post/post.resolver";

import { userBatchLoader } from "./dataLoaderBatchers";

const app = fastify();

app.register(fastifyCors, {
	credentials: true,
	origin: (origin, cb) => {
		if (!origin || [...env.FRONTEND_HOSTS, "https://studio.apollographql.com"].includes(origin)) {
			return cb(null, true);
		}

		return cb(new Error(`Origin of ${origin} is not allowed`), false);
		// return cb(null, true);
	},
});

app.register(fastifyCookie, {
	secret: env.COOKIE_SECRET,
	parseOptions: {
		signed: true,
		secure: env.IS_PRODUCTION,
	},
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "token",
		signed: true,
	},
	jwtDecode: true,
});

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
	return {
		async serverWillStart() {
			return {
				async drainServer() {
					await app.close();
				},
			};
		},
	};
}

export type CtxUser = Omit<User, "password">;

const userLoader = new DataLoader<string, FollowUser>(userBatchLoader);

const loaders = {
	userLoader,
};

async function buildContext({
	request,
	reply,
	connectionParams,
}: {
	request?: FastifyRequest;
	reply?: FastifyReply;
	connectionParams?: {
		Authorization: string;
	};
}) {
	const { jwt } = app;

	if (connectionParams || !request) {
		try {
			const isBearer = connectionParams?.Authorization?.startsWith("Bearer ");
			const token = isBearer ? connectionParams?.Authorization.substring(7) : connectionParams?.Authorization;
			return {
				request,
				reply,
				user: jwt.verify<CtxUser>(token || ""),
				jwt,
				...loaders,
			};
		} catch (e) {
			return { request, reply, user: null, jwt, ...loaders };
		}
	}

	try {
		const user = await request.jwtVerify<CtxUser>();

		return { request, reply, user: user ?? null, jwt, ...loaders };
	} catch (e) {
		return { request, reply, user: null, jwt, ...loaders };
	}
}

export type GqlContext = Awaited<ReturnType<typeof buildContext>>;

export async function createServer() {
	const schema = await buildSchema({
		resolvers: [UserResolver, PostResolver],
		authChecker: bearerAuthChecker,
	});

	const apolloServerPlugins = [fastifyAppClosePlugin(app)];
	if (env.USE_APOLLO_PLAYGROUND) {
		apolloServerPlugins.push(ApolloServerPluginLandingPageGraphQLPlayground());
	}
	apolloServerPlugins.push(ApolloServerPluginDrainHttpServer({ httpServer: app.server }));

	const server = new ApolloServer({
		schema,
		plugins: apolloServerPlugins,
		context: buildContext,
		introspection: true,
		csrfPrevention: true,
	});

	subscriptionServer({ schema, server: app.server });

	return { app: app, server };
}

const subscriptionServer = ({ schema, server }: { schema: GraphQLSchema; server: typeof app.server }) => {
	return SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
			async onConnect(connectionParams: { Authorization: string }) {
				return buildContext({ connectionParams });
			},
		},
		{
			server,
			path: "/graphql",
		}
	);
};
