import type { NextPage } from "next";
import Head from "next/head";
import { useAuthContext } from "../context/authContext";

const Home: NextPage = () => {
	const { getToken, signOut, isAuth } = useAuthContext();
	return (
		<>
			<Head>
				<title>Twitter</title>
				<meta name='description' content='Homepage for GQL Twitter' />
			</Head>

			<div>
				<p className='break-all'>{JSON.stringify(getToken())}</p>
				{!isAuth && <div>You are not signed in</div>}
				{isAuth && (
					<div>
						<p>You are totally signed in</p>
						<p>
							<button onClick={signOut}>Sign out</button>
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
