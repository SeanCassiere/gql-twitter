import prisma from "#root/utils/prisma";
import { ApolloError, ValidationError } from "apollo-server-core";
import { PostCreateInput, PostDeleteParamInput, PostsByUserParamsInput, PostUpdateInput } from "./post.dto";

class PostService {
	private async findPostById(postId: string) {
		return prisma.post.findFirst({
			where: {
				id: postId,
			},
		});
	}

	private async deletePostById(postId: string) {
		return prisma.post.delete({
			where: {
				id: postId,
			},
		});
	}

	async createPost({ userId, body }: { userId: string } & PostCreateInput) {
		return prisma.post.create({
			data: {
				body: body,
				user: {
					connect: {
						id: userId,
					},
				},
			},
			include: {
				user: {
					include: {
						followedBy: true,
						following: true,
					},
				},
			},
		});
	}

	async getUserPosts({ userId }: {} & PostsByUserParamsInput) {
		return prisma.post.findMany({
			where: {
				user: {
					id: userId,
				},
			},
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	}

	async deleteUserPost({ userId, postId }: { userId: string } & PostDeleteParamInput) {
		const post = await this.findPostById(postId);
		if (!post) {
			throw new ApolloError("Post not found");
		}

		if (post.userId !== userId) {
			throw new ApolloError("You are not authorized to delete this post");
		}

		return await this.deletePostById(postId);
	}

	async updateUserPost({ userId, postId, ...input }: { userId: string; postId: string } & PostUpdateInput) {
		const post = await this.findPostById(postId);

		if (!post || post.userId !== userId) {
			throw new ValidationError("You are not authorized to update this post");
		}

		return prisma.post.update({
			data: {
				...input,
			},
			where: {
				id: postId,
			},
		});
	}

	async getPostsForUserTimeline(userId: string) {
		const user = await prisma.user.findFirst({
			where: { id: userId },
			include: {
				following: true,
			},
		});

		if (!user) {
			throw new ApolloError("User not found to find posts for");
		}

		const followingIds = user.following.map((following) => following.id);

		const userIds = [userId, ...followingIds];

		return prisma.post.findMany({
			where: {
				userId: {
					in: userIds,
				},
			},
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	}
}

export default new PostService();
