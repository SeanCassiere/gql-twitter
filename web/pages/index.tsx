import { Box, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";

import CreatePost from "../components/CreatePost";
import LoginForm from "../components/LoginForm";
import UserTImeline from "../components/UserTImeline";
import { useAuthContext } from "../context/authContext";

const Home: NextPage = () => {
	const { getToken, isAuth } = useAuthContext();
	return (
		<>
			<Head>
				<title>Twitter</title>
				<meta name='description' content='Homepage for GQL Twitter' />
			</Head>

			{!isAuth && (
				<Box className='pl-5 pt-4' sx={{ maxWidth: 450 }}>
					<Title>Login</Title>
					<div className='mt-1 pt-1'>
						<LoginForm />
					</div>
				</Box>
			)}
			{isAuth && (
				<div className='flex flex-row h-full'>
					<div className='flex-1 flex flex-col overflow-y-auto relative pt-4 border border-r border-l-0 border-t-0 border-b-0'>
						<div className='w-full px-4 sticky top-0'>
							<div className='w-full mb-2 rounded-lg border bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
								<CreatePost />
							</div>
						</div>
						<div>
							<UserTImeline />
						</div>
					</div>
					<div className='flex-none w-52 bg-gray-50'>
						<p>You are totally signed in</p>
						<p>
							Your current <code>access_token</code>
						</p>
						<p className='break-all'>{JSON.stringify(getToken())}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
