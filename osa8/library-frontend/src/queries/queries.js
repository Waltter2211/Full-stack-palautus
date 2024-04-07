import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query AllBooks {
    allBooks {
      author {
      name
      born
    }
      published
      title
      genres
    }
  }
`

export const ADD_BOOK = gql`
mutation Mutation(
    $title: String!, 
    $published: Int!, 
    $author: String!, 
    $genres: [String!]) {
    addBook(
      title: $title, 
      published: $published, 
      author: $author, 
      genres: $genres) {
      author {
        name
      }
      published
      title
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor(
    $name: String!, 
    $setBornTo: Int) {
    editAuthor(
      name: $name, 
      setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`