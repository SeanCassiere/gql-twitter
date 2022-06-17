import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { getCookie, setCookies } from "cookies-next";
import { MantineProvider, ColorScheme, ColorSchemeProvider, Container, Paper } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/authContext";
import apolloClient from "../shared/apolloClient";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(nextColorScheme);
		setCookies("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
	};

	return (
		<>
			<ApolloProvider client={apolloClient}>
				<Head>
					<title>Mantine next example</title>
					<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
					<link rel='shortcut icon' href='/vercel.svg' />
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<AuthProvider>
					<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
						<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
							<NotificationsProvider>
								<main>
									<Container size='lg' sx={{ padding: 0 }} className='flex flex-row h-screen'>
										<Paper className='flex flex-col justify-between items-center flex-none w-60'>
											<Navbar />
										</Paper>
										<Paper className='flex-1 pt-5'>
											<Component {...pageProps} />
										</Paper>
									</Container>
								</main>
							</NotificationsProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</AuthProvider>
			</ApolloProvider>
		</>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
