import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../context/authContext";

const Login: NextPage = () => {
	const { isAuth } = useAuthContext();
	const router = useRouter();

	const handleLoginSuccess = () => {
		router.push("/");
	};

	if (isAuth) {
		router.push("/");
	}

	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<div className='pl-5 pt-4' style={{ maxWidth: 450 }}>
				<h1 className='text-3xl font-bold'>Login</h1>
				<h2 className='mt-2'>
					Have an account? Don&#39;t waste your time! Sign in to <code>gql-twitter</code> now.
				</h2>
				<div className='mt-1 pt-2'>
					<LoginForm onSuccess={handleLoginSuccess} />
				</div>
			</div>
		</>
	);
};

export default Login;
