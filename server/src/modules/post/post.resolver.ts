import {
	Resolver,
	Query,
	Mutation,
	Subscription,
	Authorized,
	FieldResolver,
	Ctx,
	Arg,
	Root,
	PubSub,
	PubSubEngine,
} from "type-graphql";

import { GqlContext } from "#root/utils/createServer";
import { Post, PostCreateInput, PostDeleteParamInput, PostsByUserParamsInput, PostUpdateInput } from "./post.dto";
import { FollowUser, User } from "../user/user.dto";
import postService from "./post.service";

@Resolver(() => Post)
class PostResolver {
	// field resolvers
	@FieldResolver(() => FollowUser, { nullable: true })
	async user(@Root() root: Post, @Ctx() ctx: GqlContext): Promise<FollowUser | null> {
		return ctx.userLoader?.load(root.userId);
	}

	// queries, mutations and subscriptions
	@Query(() => [Post])
	async postsByUser(@Arg("params") params: PostsByUserParamsInput): Promise<Post[]> {
		try {
			const posts = await postService.getUserPosts(params);
			return posts.map((post) => ({
				...post,
				createdAt: new Date(post.createdAt).toISOString(),
				updatedAt: new Date(post.updatedAt).toISOString(),
			}));
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Query(() => [Post])
	async postsForTimeline(@Ctx() ctx: GqlContext): Promise<Post[]> {
		const userId = ctx.user?.id!;

		try {
			const posts = await postService.getPostsForUserTimeline(userId);
			return posts.map((post) => ({
				...post,
				createdAt: new Date(post.createdAt).toISOString(),
				updatedAt: new Date(post.updatedAt).toISOString(),
			}));
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Mutation(() => Post)
	async postCreate(
		@Ctx() ctx: GqlContext,
		@Arg("input") input: PostCreateInput,
		@PubSub() pubsub: PubSubEngine
	): Promise<Post> {
		try {
			const userId = ctx.user?.id!;
			const post = await postService.createPost({ userId, ...input });

			const postData = {
				...post,
				createdAt: new Date(post.createdAt).toISOString(),
				updatedAt: new Date(post.updatedAt).toISOString(),
			};

			await pubsub.publish("NEW_POST", postData);

			return postData;
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Mutation(() => Post)
	async postUpdate(
		@Ctx() ctx: GqlContext,
		@Arg("input") input: PostUpdateInput,
		@Arg("params") params: PostDeleteParamInput
	): Promise<Post> {
		const postId = params.postId;
		const userId = ctx.user?.id!;

		try {
			const post = await postService.updateUserPost({ userId, postId, ...input });

			const postData = {
				...post,
				createdAt: new Date(post.createdAt).toISOString(),
				updatedAt: new Date(post.updatedAt).toISOString(),
			};

			return postData;
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Mutation(() => Post)
	async postDelete(@Ctx() ctx: GqlContext, @Arg("params") params: PostDeleteParamInput): Promise<Post> {
		try {
			const userId = ctx.user?.id!;
			const post = await postService.deleteUserPost({ userId, ...params });

			const postData = {
				...post,
				createdAt: new Date(post.createdAt).toISOString(),
				updatedAt: new Date(post.updatedAt).toISOString(),
			};

			return postData;
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Subscription(() => Post, {
		topics: ["NEW_POST"],
		filter: ({ context, payload }) =>
			payload.user.followedBy.map((user: User) => user.id).includes(context.user?.id ?? "") ||
			payload.userId === context.user?.id,
	})
	newPost(@Root() post: any): Post {
		return {
			...post,
			createdAt: new Date(post.createdAt as any).toISOString(),
			updatedAt: new Date(post.updatedAt as any).toISOString(),
		};
	}
}

export default PostResolver;
