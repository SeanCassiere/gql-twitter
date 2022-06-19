import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

import { ACCESS_TOKEN_KEY } from "../context/authContext";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "web4000.localhost";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
	uri: `https://${backendDomain}/graphql`,
	credentials: "include",
});

const wsLink =
	typeof window !== "undefined"
		? new WebSocketLink(
				new SubscriptionClient(`wss://${backendDomain}/graphql`, {
					reconnect: true,
					connectionParams: {
						Authorization: localStorage.getItem(ACCESS_TOKEN_KEY)
							? `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
							: "",
					},
				})
		  )
		: null;

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(ACCESS_TOKEN_KEY);

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const link =
	typeof window !== "undefined" && wsLink
		? split(
				({ query }) => {
					const definition = getMainDefinition(query);
					return definition.kind === "OperationDefinition" && definition.operation === "subscription";
				},
				wsLink,
				httpLink
		  )
		: httpLink;

apolloClient = new ApolloClient({
	link: authLink.concat(link),
	cache: new InMemoryCache(),
	credentials: "include",
});

export default apolloClient;
