import type { NextPage } from "next";
import Head from "next/head";
import { Box, Title } from "@mantine/core";

const Search: NextPage = () => {
	return (
		<>
			<Head>
				<title>Search</title>
			</Head>
			<Box className='pl-5'>
				<Title>Search</Title>
				<h2 className='mt-2'>This is a search page. I&#39;m not quite sure what to do here yet.</h2>
			</Box>
		</>
	);
};

export default Search;
