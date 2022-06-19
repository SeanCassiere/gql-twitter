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
					<div className='flex-1 flex flex-col overflow-y-auto relative border border-r border-l-0 border-t-0 border-b-0 border-gray-200 dark:border-gray-800'>
						<div className='sticky top-0 bg-white dark:bg-slate-800 z-10'>
							<div className='pt-3 border border-l-0 border-r-0 border-t-0 border-gray-200 dark:border-gray-800'>
								<CreatePost />
							</div>
						</div>
						<div>
							<UserTImeline />
						</div>
					</div>
					<div className='flex-none w-80 dark:bg-slate-800'>
						<div className='w-full pt-4 px-2'>
							<div className='w-full h-72 bg-gray-100 dark:bg-gray-700'>&nbsp;</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
