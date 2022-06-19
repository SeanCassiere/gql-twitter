import React from "react";
import { useQuery } from "@apollo/client";

import TimelinePost from "./TimelinePost";

import { UserTimePostsQuery } from "../graphql/queries";
import { UserTimelinePostsQuery } from "../graphql/schema.generated";
import EmptyPost from "./EmptyPost";

interface Props {}

const UserTImeline: React.FC<Props> = () => {
	const { data } = useQuery<UserTimelinePostsQuery>(UserTimePostsQuery);
	return (
		<>
			{data?.postsForTimeline?.map((item) => (
				<TimelinePost post={item} key={item.id} />
			))}
			<EmptyPost />
		</>
	);
};

export default UserTImeline;
