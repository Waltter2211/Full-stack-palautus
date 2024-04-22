import { gql } from "@apollo/client";

export const SIGNIN = gql`
    mutation Authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
        accessToken
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation Mutation($review: CreateReviewInput) {
        createReview(review: $review) {
        id
        userId
        repositoryId
        }
    }
`;

export const CREATE_USER = gql`
    mutation Mutation($user: CreateUserInput) {
        createUser(user: $user) {
        id
        username
        createdAt
        reviewCount
        }
    }
`;