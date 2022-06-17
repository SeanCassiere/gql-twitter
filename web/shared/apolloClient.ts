import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ACCESS_TOKEN_KEY } from "../context/authContext";

// const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "http://localhost:4000";
const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || "https://web4000.localhost";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
	uri: `${backendDomain}/graphql`,
	credentials: "include",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(ACCESS_TOKEN_KEY);

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	credentials: "include",
});

export default apolloClient;
