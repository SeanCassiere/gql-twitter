import { Title, Box } from "@mantine/core";
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
			<Box className='pl-5 pt-4' sx={{ maxWidth: 450 }}>
				<Title>Login</Title>
				<h2 className='mt-2'>
					Have an account? Don&#39;t waste your time! Sign in to <code>gql-twitter</code> now.
				</h2>
				<div className='mt-1 pt-1'>
					<LoginForm onSuccess={handleLoginSuccess} />
				</div>
			</Box>
		</>
	);
};

export default Login;
