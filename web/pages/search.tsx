import type { NextPage } from "next";
import Head from "next/head";
import { Box, Title } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";

const SearchPageMeQuery = gql`
	query SearchPageMeQuery {
		me {
			id
			username
			fullName
		}
	}
`;

const Search: NextPage = () => {
	const { data, error } = useQuery(SearchPageMeQuery);
	return (
		<>
			<Head>
				<title>Search</title>
			</Head>
			<Box className='pl-5'>
				<Title>Search</Title>
				<h2 className='mt-2'>This is a search page. I&#39;m not quite sure what to do here yet.</h2>
				{!error && <pre>{JSON.stringify(data, null, 2)}</pre>}
			</Box>
		</>
	);
};

export default Search;
