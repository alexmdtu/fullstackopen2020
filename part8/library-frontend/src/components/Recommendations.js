import { useQuery } from '@apollo/client'
import React from 'react'
import { ME, ALL_BOOKS } from '../queries'
import Book from './Book'

const Recommendations = ({ show }) => {
  const result = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = result.data.me.favoriteGenre
  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b => <Book key={b.title} book={b} genreFilter={favoriteGenre} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations