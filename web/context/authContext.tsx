import { createContext, useContext, FC, useState, useCallback, useEffect } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

import { fromBase64 } from "../shared/utils";
import {
	MeQueryContextQuery,
	MeQueryContextQueryVariables,
	RefreshTokenContextQuery,
	RefreshTokenContextQueryVariables,
	LogoutContextMutation,
} from "../graphql/schema.generated";

export const ACCESS_TOKEN_KEY = "gql-twitter-auth-token";

type AuthState = {
	isAuth: boolean;
	getToken: () => string | null;
	signIn: (token: string) => void;
	signOut: () => void;
};

const initialAuthState: AuthState = {
	isAuth: false,
	getToken: () => null,
	signIn: () => {},
	signOut: () => {},
};

const AuthContext = createContext<AuthState>(initialAuthState);

const MeQueryContext = gql`
	query MeQueryContext {
		me {
			id
			username
		}
	}
`;

const RefreshTokenQuery = gql`
	query RefreshTokenContext {
		userToken {
			accessToken
		}
	}
`;

const LogoutMutation = gql`
	mutation LogoutContext {
		userLogout
	}
`;

export const AuthProvider: FC<{ children: any }> = (props) => {
	const [userToken, setUserToken] = useState<string | null>(null);

	const [fetchMeQuery] = useLazyQuery<MeQueryContextQuery, MeQueryContextQueryVariables>(MeQueryContext, {
		fetchPolicy: "network-only",
		onCompleted: () => {
			const token = localStorage.getItem(ACCESS_TOKEN_KEY);
			if (token) {
				signIn(token);
			}
		},
	});
	const signIn = useCallback((token: string) => {
		setUserToken(token);
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
	}, []);

	const [refreshTokenQuery] = useLazyQuery<RefreshTokenContextQuery, RefreshTokenContextQueryVariables>(
		RefreshTokenQuery,
		{ fetchPolicy: "network-only" }
	);

	const [logout] = useMutation<LogoutContextMutation>(LogoutMutation, { fetchPolicy: "network-only" });
	const signOut = useCallback(() => {
		logout().then(() => {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			setUserToken(null);
		});
	}, [logout]);

	const getToken = useCallback(() => {
		return userToken;
	}, [userToken]);

	// init the token
	useEffect(() => {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);

		const refreshSearch = () => {
			refreshTokenQuery()
				.then((res) => {
					if (res.data && res.data.userToken && res.data.userToken.accessToken) {
						setUserToken(res.data.userToken.accessToken);
						localStorage.setItem(ACCESS_TOKEN_KEY, res.data.userToken.accessToken);
					} else {
						signOut();
					}
				})
				.catch((e) => {
					console.log(e);
				});
		};

		if (token) {
			setUserToken(token);
			fetchMeQuery()
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					refreshSearch();
				});
		} else {
			refreshSearch();
		}
	}, [fetchMeQuery, refreshTokenQuery, signOut]);

	// automated token refresh
	useEffect(() => {
		if (!userToken) return;

		const [_, payloadRaw] = userToken.split(".");
		const base64 = fromBase64(payloadRaw);
		const { exp } = JSON.parse(base64) as { exp: number };

		const expiryTime = exp - Math.round(Date.now() / 1000);

		const refreshInterval = setInterval(() => {
			refreshTokenQuery()
				.then((res) => {
					if (res.data && res.data.userToken && res.data.userToken.accessToken) {
						setUserToken(res.data.userToken.accessToken);
						localStorage.setItem(ACCESS_TOKEN_KEY, res.data.userToken.accessToken);
					} else {
						signOut();
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}, expiryTime * 1000 - 300);

		return () => {
			clearInterval(refreshInterval);
		};
	}, [refreshTokenQuery, signOut, userToken]);

	return (
		<AuthContext.Provider
			value={{
				isAuth: Boolean(userToken),
				getToken,
				signIn,
				signOut,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const values = useContext(AuthContext);
	return { ...values };
};
