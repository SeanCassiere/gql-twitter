import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { FollowUser } from "../user/user.dto";

@ObjectType()
export class Post {
	@Field(() => ID, { nullable: false })
	id: string;

	@Field(() => String, { nullable: false })
	body: string;

	@Field(() => String, { nullable: false })
	createdAt: String;

	@Field(() => String, { nullable: false })
	updatedAt: String;

	userId: string;
}

@InputType()
export class PostCreateInput {
	@Field({ nullable: false })
	@Length(1, 280)
	body: string;
}

@InputType()
export class PostsByUserParamsInput {
	@Field({ nullable: false })
	@Length(1)
	userId: string;
}

@InputType()
export class PostDeleteParamInput {
	@Field({ nullable: false })
	@Length(1)
	postId: string;
}

@InputType()
export class PostUpdateInput {
	@Field({ nullable: false })
	@Length(1, 280)
	body: string;
}
