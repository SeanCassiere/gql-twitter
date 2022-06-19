import { gql } from "@apollo/client";

export const NewPostSubscription = gql`
	subscription NewPostSubscription {
		newPost {
			id
			body
			createdAt
			user {
				id
				username
				fullName
			}
		}
	}
`;
