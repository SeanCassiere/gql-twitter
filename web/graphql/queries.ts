import { gql } from "@apollo/client";

export const UserTimePostsQuery = gql`
	query UserTimelinePosts {
		postsForTimeline {
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

export const RefreshTokenQuery = gql`
	query RefreshTokenContext {
		userToken {
			accessToken
		}
	}
`;

export const MeDataContextQuery = gql`
	query MeDataContextQuery {
		me {
			id
			username
			fullName
		}
	}
`;
