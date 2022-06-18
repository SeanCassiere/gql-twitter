import { gql, useQuery } from "@apollo/client";
import React from "react";
import { UserTimelinePostsQuery } from "../graphql/schema.generated";

export const UserTimePostsQuery = gql`
	query UserTimelinePosts {
		postsForTimeline {
			id
			body
			createdAt
			user {
				id
				username
			}
		}
	}
`;

interface Props {}

const UserTImeline: React.FC<Props> = (props) => {
	const { data } = useQuery<UserTimelinePostsQuery>(UserTimePostsQuery);
	return (
		<>
			{data?.postsForTimeline?.map((item) => (
				<div className='text-4xl' key={item.id}>
					<span>{item.user?.username}</span>&nbsp;-&nbsp;
					<span>{item.body}</span>
				</div>
			))}
		</>
	);
};

export default UserTImeline;
