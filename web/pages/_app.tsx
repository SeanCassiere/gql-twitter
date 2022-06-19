import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";

import SideNavigation from "../components/SideNavigation";

import { AuthProvider } from "../context/authContext";
import apolloClient from "../shared/apolloClient";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<ThemeProvider enableSystem attribute='class'>
			<ApolloProvider client={apolloClient}>
				<AuthProvider>
					{/*  */}
					<Head>
						<title>GQL Twitter</title>
						<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
						<link rel='shortcut icon' href='/vercel.svg' />
						<link rel='icon' href='/favicon.ico' />
					</Head>

					<div className='max-w-7xl w-full mx-auto'>
						<div style={{ padding: 0 }} className='flex flex-row h-screen'>
							<header className='flex flex-col justify-between items-center flex-none w-80'>
								<SideNavigation />
							</header>
							<main className='flex-1 border border-l border-r border-t-0 border-b-0 border-gray-200 dark:border-gray-800 rounded-none'>
								<Component {...pageProps} />
							</main>
						</div>
					</div>
					{/*  */}
				</AuthProvider>
			</ApolloProvider>
		</ThemeProvider>
	);
}
