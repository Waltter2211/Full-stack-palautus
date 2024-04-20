import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query Query {
        repositories {
            edges {
                node {
                    id
                    ownerAvatarUrl
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                }
            }
        }
    }
`;

export const GET_AUTHENTICATED = gql`
    {
        me {
        id
        username
        }
    }
`;

export const GET_SINGLE_REPOSITORY = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
        id
        fullName
        url
        description
        language
        stargazersCount
        forksCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        }
    }
`

export const GET_REVIEWS = gql`
    query ($repositoryId: ID!) {
        repository(id: $repositoryId) {
        id
        fullName
        reviews {
            edges {
            node {
                id
                text
                rating
                createdAt
                user {
                id
                username
                }
            }
            }
        }
        }
    }
`;

