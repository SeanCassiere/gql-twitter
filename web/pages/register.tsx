import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import RegisterForm from "../components/RegisterForm";
import { useAuthContext } from "../context/authContext";

const Register: NextPage = () => {
	const { isAuth } = useAuthContext();
	const router = useRouter();

	if (isAuth) {
		router.push("/");
	}

	const handleRegisterSuccess = () => {
		router.push("/login");
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
			<div className='pl-5 pt-4' style={{ maxWidth: 450 }}>
				<h1 className='text-3xl font-bold'>Sign Up</h1>
				<h2 className='mt-2'>
					Get yourself signed up on the <code>gql-twitter</code> platform immediately.
				</h2>
				<div className='mt-1 pt-2'>
					<RegisterForm onSuccess={handleRegisterSuccess} />
				</div>
			</div>
		</>
	);
};

export default Register;
