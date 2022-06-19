import type { NextPage } from "next";
import Head from "next/head";

import { useAuthContext } from "../context/authContext";

import CreatePost from "../components/CreatePost";
import LoginForm from "../components/LoginForm";
import UserTImeline from "../components/UserTImeline";

const Home: NextPage = () => {
	const { getToken, isAuth } = useAuthContext();
	return (
		<>
			<Head>
				<title>Twitter</title>
				<meta name='description' content='Homepage for GQL Twitter' />
			</Head>

			{!isAuth && (
				<div className='pl-5 pt-4' style={{ maxWidth: 450 }}>
					<h1>Login</h1>
					<div className='mt-1 pt-1'>
						<LoginForm />
					</div>
				</div>
			)}
			{isAuth && (
				<div className='flex flex-row h-full'>
					<div className='flex-1 flex flex-col overflow-y-auto relative pt-4 border border-r border-l-0 border-t-0 border-b-0 border-gray-200 dark:border-gray-800'>
						<div className='px-4 sticky top-0'>
							<div className='mb-2 rounded-lg border bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-800'>
								<CreatePost />
							</div>
						</div>
						<div>
							<UserTImeline />
						</div>
					</div>
					<div className='flex-none w-80 bg-gray-50 dark:bg-slate-800'>
						<div className='w-full pt-4 px-2'>
							<p>You are totally signed in</p>
							<p>
								Your current <code>access_token</code>
							</p>
							<p className='break-all'>{JSON.stringify(getToken())}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
