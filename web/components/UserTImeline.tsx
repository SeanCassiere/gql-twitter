import React from "react";
import { useQuery } from "@apollo/client";

import { UserTimePostsQuery } from "../graphql/queries";
import { UserTimelinePostsQuery } from "../graphql/schema.generated";

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
