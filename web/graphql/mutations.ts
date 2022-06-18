import { gql } from "@apollo/client";

export const LogoutMutation = gql`
	mutation LogoutContext {
		userLogout
	}
`;

export const CreatePostMutation = gql`
	mutation CreatePostForm($input: PostCreateInput!) {
		postCreate(input: $input) {
			id
			body
			user {
				username
			}
		}
	}
`;

export const LoginMutation = gql`
	mutation LoginFromForm($input: LoginUserInput!) {
		userLogin(input: $input) {
			accessToken
		}
	}
`;

export const RegisterMutation = gql`
	mutation RegisterFromForm($input: RegisterUserInput!) {
		userCreate(input: $input) {
			id
			username
		}
	}
`;
