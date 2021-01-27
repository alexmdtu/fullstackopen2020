import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      published
      author
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $publishedInt,
      genres: $genres
    ) {
      title
      authos
      published
      genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $bornInt: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $bornInt
    ) {
      name
      born
      bookCount
    }
  }
`