import bcrypt from "bcryptjs";

import prisma from "#root/utils/prisma";
import { RegisterUserInput, UpdateUserInput } from "./user.dto";
import { sanitizeUsername } from "#root/utils/sanitize";

class UserService {
	/**
	 * This method is used to create/register a new user
	 * The registration fields are
	 * * username
	 * * email
	 * * password
	 */
	async registerUser(input: RegisterUserInput) {
		const hashedPassword = await bcrypt.hash(input.password, 12);

		return prisma.user.create({
			data: {
				...input,
				email: input.email.toLowerCase().trim(),
				username: sanitizeUsername(input.username.trim()),
				usernameSearch: sanitizeUsername(input.username.toLowerCase().trim()),
				password: hashedPassword,
			},
		});
	}

	/**
	 * This method is used to update fields on the user's profile
	 * The fields updatable are
	 * * username
	 * * email
	 * * description
	 */
	async updateUserProfile({ userId, ...input }: { userId: string } & UpdateUserInput) {
		let updateData = { ...input };

		if (input.username) {
			updateData.username = sanitizeUsername(input.username.trim());
		}

		return prisma.user.update({
			data: {
				...updateData,
			},
			where: {
				id: userId,
			},
		});
	}

	/**
	 * This method is used to find a user's profile based on their identifier
	 * The following are the identifiers
	 * * username
	 * * email
	 */
	async findUserByIdentifier(identifier: string) {
		return prisma.user.findFirst({
			where: {
				OR: [{ usernameSearch: identifier.toLowerCase().trim() }, { email: identifier.toLowerCase().trim() }],
			},
		});
	}

	/**
	 * This method is find a user's profile by their id
	 */
	async findUserById(id: string) {
		return prisma.user.findFirst({
			where: {
				id: id,
			},
		});
	}

	/**
	 * This method is used compare the password of a user with the hashed password in the database
	 */
	async verifyPassword({ password, attemptString }: { password: string; attemptString: string }) {
		return bcrypt.compare(attemptString, password);
	}

	/**
	 * This method is used to follow another user.
	 * The fields required are:
	 * * userId - the current logged-in user
	 * * followUsername - the username of the user to follow
	 */
	async followUser({ userId, followUsername }: { userId: string; followUsername: string }) {
		return prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				following: {
					connect: {
						usernameSearch: followUsername.toLowerCase().trim(),
					},
				},
			},
		});
	}

	/**
	 * This method is used to unfollow another user.
	 * The fields required are:
	 * * userId - the current logged-in user
	 * * unfollowUsername - the username of the user to unfollow
	 */
	async unfollowUser({ userId, unfollowUsername }: { userId: string; unfollowUsername: string }) {
		return prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				following: {
					disconnect: {
						usernameSearch: unfollowUsername.toLowerCase().trim(),
					},
				},
			},
		});
	}

	/**
	 * This method is used to find all the users that the current user is following.
	 * The fields required are:
	 * * userId - the current logged-in user
	 */
	async findUserFollowing(userId: string) {
		return prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				following: true,
			},
		});
	}

	/**
	 * This method is used to find all the users that the follow current user.
	 * The fields required are:
	 * * userId - the current logged-in user
	 */
	async findUserFollowedBy(userId: string) {
		return prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				followedBy: true,
			},
		});
	}
}

export default new UserService();
