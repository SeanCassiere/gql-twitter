// THIS IS A GENERATED FILE, use `yarn codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FollowUser = {
  __typename?: 'FollowUser';
  description: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type LoginToken = {
  __typename?: 'LoginToken';
  accessToken: Scalars['String'];
};

export type LoginUserInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postCreate: Post;
  postDelete: Post;
  postUpdate: Post;
  userCreate?: Maybe<User>;
  userFollow: User;
  userLogin: LoginToken;
  userLogout: Scalars['Boolean'];
  userUnfollow: User;
  userUpdate: User;
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  params: PostDeleteParamInput;
};


export type MutationPostUpdateArgs = {
  input: PostUpdateInput;
  params: PostDeleteParamInput;
};


export type MutationUserCreateArgs = {
  input: RegisterUserInput;
};


export type MutationUserFollowArgs = {
  input: UserFollowInput;
};


export type MutationUserLoginArgs = {
  input: LoginUserInput;
};


export type MutationUserUnfollowArgs = {
  input: UserFollowInput;
};


export type MutationUserUpdateArgs = {
  input: UpdateUserInput;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  user?: Maybe<FollowUser>;
};

export type PostCreateInput = {
  body: Scalars['String'];
};

export type PostDeleteParamInput = {
  postId: Scalars['String'];
};

export type PostUpdateInput = {
  body: Scalars['String'];
};

export type PostsByUserParamsInput = {
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  postsByUser: Array<Post>;
  postsForTimeline: Array<Post>;
  userToken?: Maybe<LoginToken>;
};


export type QueryPostsByUserArgs = {
  params: PostsByUserParamsInput;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newPost: Post;
};

export type UpdateUserInput = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  followers: UserFollowers;
  following: UserFollowers;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserFollowInput = {
  username: Scalars['String'];
};

export type UserFollowers = {
  __typename?: 'UserFollowers';
  count: Scalars['Float'];
  items: Array<User>;
};

export type CreatePostFormMutationVariables = Exact<{
  input: PostCreateInput;
}>;


export type CreatePostFormMutation = { __typename?: 'Mutation', postCreate: { __typename?: 'Post', id: string, body: string, user?: { __typename?: 'FollowUser', username: string } | null } };

export type LoginFromFormMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginFromFormMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'LoginToken', accessToken: string } };

export type RegisterFromFormMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterFromFormMutation = { __typename?: 'Mutation', userCreate?: { __typename?: 'User', id: string, username: string } | null };

export type UserTimelinePostsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTimelinePostsQuery = { __typename?: 'Query', postsForTimeline: Array<{ __typename?: 'Post', id: string, body: string, createdAt: string, user?: { __typename?: 'FollowUser', id: string, username: string } | null }> };

export type MeQueryContextQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryContextQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };

export type RefreshTokenContextQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenContextQuery = { __typename?: 'Query', userToken?: { __typename?: 'LoginToken', accessToken: string } | null };

export type LogoutContextMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutContextMutation = { __typename?: 'Mutation', userLogout: boolean };

export type SearchPageMeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchPageMeQueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, fullName: string } | null };


export const CreatePostFormDocument = gql`
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
export type CreatePostFormMutationFn = Apollo.MutationFunction<CreatePostFormMutation, CreatePostFormMutationVariables>;

/**
 * __useCreatePostFormMutation__
 *
 * To run a mutation, you first call `useCreatePostFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostFormMutation, { data, loading, error }] = useCreatePostFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostFormMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostFormMutation, CreatePostFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostFormMutation, CreatePostFormMutationVariables>(CreatePostFormDocument, options);
      }
export type CreatePostFormMutationHookResult = ReturnType<typeof useCreatePostFormMutation>;
export type CreatePostFormMutationResult = Apollo.MutationResult<CreatePostFormMutation>;
export type CreatePostFormMutationOptions = Apollo.BaseMutationOptions<CreatePostFormMutation, CreatePostFormMutationVariables>;
export const LoginFromFormDocument = gql`
    mutation LoginFromForm($input: LoginUserInput!) {
  userLogin(input: $input) {
    accessToken
  }
}
    `;
export type LoginFromFormMutationFn = Apollo.MutationFunction<LoginFromFormMutation, LoginFromFormMutationVariables>;

/**
 * __useLoginFromFormMutation__
 *
 * To run a mutation, you first call `useLoginFromFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFromFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFromFormMutation, { data, loading, error }] = useLoginFromFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginFromFormMutation(baseOptions?: Apollo.MutationHookOptions<LoginFromFormMutation, LoginFromFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginFromFormMutation, LoginFromFormMutationVariables>(LoginFromFormDocument, options);
      }
export type LoginFromFormMutationHookResult = ReturnType<typeof useLoginFromFormMutation>;
export type LoginFromFormMutationResult = Apollo.MutationResult<LoginFromFormMutation>;
export type LoginFromFormMutationOptions = Apollo.BaseMutationOptions<LoginFromFormMutation, LoginFromFormMutationVariables>;
export const RegisterFromFormDocument = gql`
    mutation RegisterFromForm($input: RegisterUserInput!) {
  userCreate(input: $input) {
    id
    username
  }
}
    `;
export type RegisterFromFormMutationFn = Apollo.MutationFunction<RegisterFromFormMutation, RegisterFromFormMutationVariables>;

/**
 * __useRegisterFromFormMutation__
 *
 * To run a mutation, you first call `useRegisterFromFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterFromFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerFromFormMutation, { data, loading, error }] = useRegisterFromFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterFromFormMutation(baseOptions?: Apollo.MutationHookOptions<RegisterFromFormMutation, RegisterFromFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterFromFormMutation, RegisterFromFormMutationVariables>(RegisterFromFormDocument, options);
      }
export type RegisterFromFormMutationHookResult = ReturnType<typeof useRegisterFromFormMutation>;
export type RegisterFromFormMutationResult = Apollo.MutationResult<RegisterFromFormMutation>;
export type RegisterFromFormMutationOptions = Apollo.BaseMutationOptions<RegisterFromFormMutation, RegisterFromFormMutationVariables>;
export const UserTimelinePostsDocument = gql`
    query UserTimelinePosts {
  postsForTimeline {
    id
    body
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useUserTimelinePostsQuery__
 *
 * To run a query within a React component, call `useUserTimelinePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTimelinePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTimelinePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTimelinePostsQuery(baseOptions?: Apollo.QueryHookOptions<UserTimelinePostsQuery, UserTimelinePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTimelinePostsQuery, UserTimelinePostsQueryVariables>(UserTimelinePostsDocument, options);
      }
export function useUserTimelinePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTimelinePostsQuery, UserTimelinePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTimelinePostsQuery, UserTimelinePostsQueryVariables>(UserTimelinePostsDocument, options);
        }
export type UserTimelinePostsQueryHookResult = ReturnType<typeof useUserTimelinePostsQuery>;
export type UserTimelinePostsLazyQueryHookResult = ReturnType<typeof useUserTimelinePostsLazyQuery>;
export type UserTimelinePostsQueryResult = Apollo.QueryResult<UserTimelinePostsQuery, UserTimelinePostsQueryVariables>;
export const MeQueryContextDocument = gql`
    query MeQueryContext {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQueryContextQuery__
 *
 * To run a query within a React component, call `useMeQueryContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryContextQuery(baseOptions?: Apollo.QueryHookOptions<MeQueryContextQuery, MeQueryContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQueryContextQuery, MeQueryContextQueryVariables>(MeQueryContextDocument, options);
      }
export function useMeQueryContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQueryContextQuery, MeQueryContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQueryContextQuery, MeQueryContextQueryVariables>(MeQueryContextDocument, options);
        }
export type MeQueryContextQueryHookResult = ReturnType<typeof useMeQueryContextQuery>;
export type MeQueryContextLazyQueryHookResult = ReturnType<typeof useMeQueryContextLazyQuery>;
export type MeQueryContextQueryResult = Apollo.QueryResult<MeQueryContextQuery, MeQueryContextQueryVariables>;
export const RefreshTokenContextDocument = gql`
    query RefreshTokenContext {
  userToken {
    accessToken
  }
}
    `;

/**
 * __useRefreshTokenContextQuery__
 *
 * To run a query within a React component, call `useRefreshTokenContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshTokenContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenContextQuery(baseOptions?: Apollo.QueryHookOptions<RefreshTokenContextQuery, RefreshTokenContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshTokenContextQuery, RefreshTokenContextQueryVariables>(RefreshTokenContextDocument, options);
      }
export function useRefreshTokenContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshTokenContextQuery, RefreshTokenContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshTokenContextQuery, RefreshTokenContextQueryVariables>(RefreshTokenContextDocument, options);
        }
export type RefreshTokenContextQueryHookResult = ReturnType<typeof useRefreshTokenContextQuery>;
export type RefreshTokenContextLazyQueryHookResult = ReturnType<typeof useRefreshTokenContextLazyQuery>;
export type RefreshTokenContextQueryResult = Apollo.QueryResult<RefreshTokenContextQuery, RefreshTokenContextQueryVariables>;
export const LogoutContextDocument = gql`
    mutation LogoutContext {
  userLogout
}
    `;
export type LogoutContextMutationFn = Apollo.MutationFunction<LogoutContextMutation, LogoutContextMutationVariables>;

/**
 * __useLogoutContextMutation__
 *
 * To run a mutation, you first call `useLogoutContextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutContextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutContextMutation, { data, loading, error }] = useLogoutContextMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutContextMutation(baseOptions?: Apollo.MutationHookOptions<LogoutContextMutation, LogoutContextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutContextMutation, LogoutContextMutationVariables>(LogoutContextDocument, options);
      }
export type LogoutContextMutationHookResult = ReturnType<typeof useLogoutContextMutation>;
export type LogoutContextMutationResult = Apollo.MutationResult<LogoutContextMutation>;
export type LogoutContextMutationOptions = Apollo.BaseMutationOptions<LogoutContextMutation, LogoutContextMutationVariables>;
export const SearchPageMeQueryDocument = gql`
    query SearchPageMeQuery {
  me {
    id
    username
    fullName
  }
}
    `;

/**
 * __useSearchPageMeQueryQuery__
 *
 * To run a query within a React component, call `useSearchPageMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPageMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPageMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchPageMeQueryQuery(baseOptions?: Apollo.QueryHookOptions<SearchPageMeQueryQuery, SearchPageMeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPageMeQueryQuery, SearchPageMeQueryQueryVariables>(SearchPageMeQueryDocument, options);
      }
export function useSearchPageMeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPageMeQueryQuery, SearchPageMeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPageMeQueryQuery, SearchPageMeQueryQueryVariables>(SearchPageMeQueryDocument, options);
        }
export type SearchPageMeQueryQueryHookResult = ReturnType<typeof useSearchPageMeQueryQuery>;
export type SearchPageMeQueryLazyQueryHookResult = ReturnType<typeof useSearchPageMeQueryLazyQuery>;
export type SearchPageMeQueryQueryResult = Apollo.QueryResult<SearchPageMeQueryQuery, SearchPageMeQueryQueryVariables>;