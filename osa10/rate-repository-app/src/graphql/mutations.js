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