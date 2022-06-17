import { IsEmail, Length, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class FollowUser {
	@Field(() => ID, { nullable: false })
	id: string;

	@Field(() => String, { nullable: false })
	username: string;

	@Field(() => String, { nullable: false })
	fullName: string;

	@Field(() => String, { nullable: false })
	description: string;
}

@ObjectType()
export class User extends FollowUser {
	@Field(() => String, { nullable: false })
	email: string;

	password: string;

	@Field(() => String, { nullable: false })
	createdAt: String;

	@Field(() => String, { nullable: false })
	updatedAt: String;
}

@ObjectType()
export class LoginToken {
	@Field(() => String, { nullable: false })
	accessToken: string;
}

@InputType()
export class RegisterUserInput {
	@Field({ nullable: false })
	username: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@Length(2, 80)
	fullName: string;

	@Field()
	@Length(3, 56)
	password: string;
}

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	fullName?: string;

	@Field({ nullable: true })
	@IsEmail()
	email?: string;

	@Field({ nullable: true })
	@Length(0, 280)
	description?: string;
}

@InputType()
export class LoginUserInput {
	@Field({
		nullable: false,
	})
	identifier: string;

	@Field()
	@Length(3, 56)
	password: string;
}

@InputType()
export class UserFollowInput {
	@Field({
		nullable: false,
	})
	@MinLength(1)
	username: string;
}

@ObjectType()
export class UserFollowers {
	@Field()
	count: number;

	@Field(() => [User])
	items: User[];
}
