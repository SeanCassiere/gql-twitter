import React from "react";
import type { NextPage, GetServerSideProps } from "next";

const ProfilePage: NextPage = (props) => {
	return <div>{JSON.stringify(props)}</div>;
};

export default ProfilePage;

export async function getServerSideProps(context: GetServerSideProps) {
	console.log(context);
	return {
		props: {
			username: "SeanCassiere",
		},
	};
}
