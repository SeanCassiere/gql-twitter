import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "@apollo/client";

import { MeDataContextQuery } from "../graphql/queries";
import { MeDataContextQueryQuery } from "../graphql/schema.generated";

const Search: NextPage = () => {
	const { data, error } = useQuery<MeDataContextQueryQuery>(MeDataContextQuery);
	return (
		<>
			<Head>
				<title>Search</title>
			</Head>
			<div className='pl-5 pt-4'>
				<h1>Search</h1>
				<h2 className='mt-2'>This is a search page. I&#39;m not quite sure what to do here yet.</h2>
				{!error && <pre>{JSON.stringify(data, null, 2)}</pre>}
			</div>
		</>
	);
};

export default Search;
