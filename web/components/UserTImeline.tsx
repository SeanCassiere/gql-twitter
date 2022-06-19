import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import TimelinePost from "./TimelinePost";
import EmptyPost from "./EmptyPost";

import { UserTimePostsQuery } from "../graphql/queries";
import { NewPostSubscriptionSubscription, UserTimelinePostsQuery } from "../graphql/schema.generated";
import { NewPostSubscription } from "../graphql/subscriptions";

interface Props {}

const UserTImeline: React.FC<Props> = () => {
	const { data, subscribeToMore } = useQuery<UserTimelinePostsQuery>(UserTimePostsQuery);

	useEffect(() => {
		subscribeToMore({
			document: NewPostSubscription,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;

				const typedData = subscriptionData.data as unknown as NewPostSubscriptionSubscription;

				return Object.assign({}, prev, {
					postsForTimeline: [typedData.newPost, ...prev.postsForTimeline],
				});
			},
		});
	}, [subscribeToMore]);

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
