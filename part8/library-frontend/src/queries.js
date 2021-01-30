import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      bookCount
    }
    id
    genres
  }
`

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
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const BOOKS_WITH_GENRE = gql`
  query booksWithGenre($genre: String!) {
    allBooks(
      genre: $genre
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $publishedInt,
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`