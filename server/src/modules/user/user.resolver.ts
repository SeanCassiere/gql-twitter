import { ApolloError } from "apollo-server-core";
import { Resolver, Query, Arg, Mutation, Ctx, Authorized, FieldResolver, Root } from "type-graphql";

import { CtxUser, GqlContext } from "#root/utils/createServer";
import userService from "./user.service";
import {
	UserFollowInput,
	LoginToken,
	LoginUserInput,
	RegisterUserInput,
	UpdateUserInput,
	User,
	UserFollowers,
} from "./user.dto";
import env from "#root/utils/env";
import { CookieSerializeOptions } from "@fastify/cookie";

@Resolver(() => User)
class UserResolver {
	// field resolvers
	@FieldResolver(() => UserFollowers)
	async followers(@Root() user: User) {
		const data = await userService.findUserFollowedBy(user.id);

		return {
			count: data?.followedBy.length,
			items: data?.followedBy,
		};
	}

	@FieldResolver(() => UserFollowers)
	async following(@Root() user: User) {
		const data = await userService.findUserFollowing(user.id);

		return {
			count: data?.following.length,
			items: data?.following,
		};
	}

	// queries, mutations and subscriptions
	@Authorized()
	@Query(() => User, { nullable: true })
	async me(@Ctx() ctx: GqlContext) {
		if (!ctx.user) {
			return null;
		}

		const id = ctx.user.id;
		const user = await userService.findUserById(id);
		if (!user) {
			return null;
		}

		return {
			...user,
			updatedAt: new Date(user.updatedAt).toISOString(),
			createdAt: new Date(user.updatedAt).toISOString(),
		};
	}

	@Mutation(() => User, { nullable: true })
	async userCreate(@Arg("input") input: RegisterUserInput) {
		try {
			const user = await userService.registerUser(input);
			return user;
		} catch (error) {
			throw error;
		}
	}

	@Mutation(() => LoginToken)
	async userLogin(@Arg("input") input: LoginUserInput, @Ctx() ctx: GqlContext) {
		const user = await userService.findUserByIdentifier(input.identifier);

		if (!user) {
			throw new ApolloError("Invalid credentials");
		}

		const isValid = await userService.verifyPassword({ password: user.password, attemptString: input.password });

		if (!isValid) {
			throw new ApolloError("Invalid credentials");
		}

		const accessToken = await ctx.reply?.jwtSign(
			{ id: user.id, email: user.email },
			{
				sign: {
					sub: user.id,
					expiresIn: 60 * 60 * 60,
				},
			}
		);

		const refreshToken = await ctx.reply?.jwtSign(
			{ id: user.id, email: user.email },
			{
				sign: {
					sub: user.id,
				},
			}
		);

		if (!accessToken || !refreshToken) {
			throw new ApolloError("Error signing access token");
		}

		const cookieOptions: CookieSerializeOptions = {
			sameSite: "none",
			secure: true,
			httpOnly: true,
			signed: true,
		};
		ctx.reply
			?.setCookie("token", accessToken, {
				...cookieOptions,
			})
			?.setCookie("refreshToken", refreshToken, {
				...cookieOptions,
				expires: new Date(new Date().setMinutes(new Date().getMinutes() + 60)),
			});

		return {
			accessToken: accessToken,
		};
	}

	@Query(() => LoginToken, { nullable: true })
	async userToken(@Ctx() ctx: GqlContext): Promise<LoginToken | null> {
		const refreshToken = ctx.request?.cookies?.refreshToken;

		if (!refreshToken) {
			return null;
		}

		const decode = ctx.request?.unsignCookie(refreshToken);

		if (!decode || decode.valid === false) {
			return null;
		}

		try {
			const tokenData = ctx.jwt.verify<CtxUser>(decode?.value ?? "");

			const user = await userService.findUserById(tokenData.id);

			if (!user) {
				return null;
			}

			const accessToken = await ctx.reply?.jwtSign(
				{ id: user.id, email: user.email },
				{
					sign: {
						sub: user.id,
						expiresIn: 60 * 60 * 60,
					},
				}
			);

			if (!accessToken) {
				return null;
			}

			const cookieOptions: CookieSerializeOptions = {
				sameSite: "none",
				secure: true,
				httpOnly: true,
				signed: true,
			};
			ctx.reply?.setCookie("token", accessToken, {
				...cookieOptions,
			});

			return {
				accessToken,
			};
		} catch (error) {
			console.log("error", error);
			return null;
		}
	}

	@Mutation(() => Boolean)
	async userLogout(@Ctx() ctx: GqlContext): Promise<boolean> {
		const logoutOptions: CookieSerializeOptions = {
			sameSite: "none",
			secure: true,
			httpOnly: true,
			expires: new Date(Date.now() - 60 * 60 * 24 * 365),
			signed: true,
		};
		ctx.reply
			?.setCookie("token", "null", {
				...logoutOptions,
			})
			.setCookie("refreshToken", "null", {
				...logoutOptions,
			});
		return true;
	}

	@Authorized()
	@Mutation(() => User)
	async userUpdate(@Ctx() ctx: GqlContext, @Arg("input") input: UpdateUserInput): Promise<User> {
		const userId = ctx.user?.id!;
		try {
			const user = await userService.updateUserProfile({ userId, ...input });
			return {
				...user,
				createdAt: new Date(user.createdAt).toISOString(),
				updatedAt: new Date(user.updatedAt).toISOString(),
			};
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Mutation(() => User)
	async userFollow(@Arg("input") input: UserFollowInput, @Ctx() ctx: GqlContext) {
		try {
			const result = await userService.followUser({ userId: ctx.user?.id!, followUsername: input.username });
			return result;
		} catch (e: any) {
			throw new ApolloError(e);
		}
	}

	@Authorized()
	@Mutation(() => User)
	async userUnfollow(@Arg("input") input: UserFollowInput, @Ctx() ctx: GqlContext) {
		try {
			const result = await userService.unfollowUser({ userId: ctx.user?.id!, unfollowUsername: input.username });
			return result;
		} catch (e: any) {
			throw new ApolloError(e);
		}
	}
}

export default UserResolver;
