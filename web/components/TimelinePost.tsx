import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@apollo/client";

import { DeletePostMutation, DeletePostMutationVariables, UserTimelinePostsQuery } from "../graphql/schema.generated";
import { PostDeleteMutation } from "../graphql/mutations";
import { UserTimePostsQuery } from "../graphql/queries";

interface Props {
	post: UserTimelinePostsQuery["postsForTimeline"][0];
}

const TimelinePost: React.FC<Props> = (props) => {
	const { post } = props;

	const [deletePost] = useMutation<DeletePostMutation, DeletePostMutationVariables>(PostDeleteMutation, {
		fetchPolicy: "network-only",
		refetchQueries: [{ query: UserTimePostsQuery }],
	});

	return (
		<div className='flex flex-row px-4 py-4 border border-l-0 border-r-0 border-t-0 border-gray-200 dark:border-gray-800'>
			<div className='flex-none flex w-12'>
				<div className='w-8 h-8 overflow-hidden rounded-full flex items-center justify-center relative'>
					<Link href={`/@${post.user?.username}`}>
						<a>
							<Image
								src='https://icon-library.com/images/black-facebook-icon-png/black-facebook-icon-png-2.jpg'
								alt=''
								className='w-14 h-14 object-cover'
								layout='fill'
							/>
						</a>
					</Link>
				</div>
			</div>
			<div className='flex flex-col space-y-1 w-full'>
				<div className='flex flex-row justify-between'>
					<Link className='flex-1' href={`/@${post.user?.username}`}>
						<a>
							<span className='text-gray-600 dark:text-gray-200 text-md font-semibold'>{post.user?.fullName}</span>
							<span className='text-gray-400 dark:text-gray-500 text-sm'>
								&nbsp;&#x2022;&nbsp;@{post.user?.username}
							</span>
						</a>
					</Link>
					<div className='flex-none'>
						<button
							onClick={() => {
								deletePost({
									variables: {
										params: {
											postId: props.post.id,
										},
									},
								}).catch((e) => {
									console.log(e);
									if (e?.message && e.message.includes("not authorized")) {
										alert(e?.message);
									}
								});
							}}
							className='bg-slate-800 text-slate-100 p-1'
						>
							Delete
						</button>
					</div>
				</div>
				<div>
					<p className='break-all dark:text-slate-300 text-sm'>{post.body}</p>
				</div>
			</div>
		</div>
	);
};

export default TimelinePost;
