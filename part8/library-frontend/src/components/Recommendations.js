import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ME, BOOKS_WITH_GENRE } from '../queries'
import Book from './Book'

const Recommendations = ({ show }) => {
  const result = useQuery(ME)
  const [books, setBooks] = useState(null)
  const [getBooks, filteredResults] = useLazyQuery(BOOKS_WITH_GENRE)

  const showBook = (genre) => {
    console.log('genre used:', genre)
    getBooks({ variables: { genre: genre } })
  }

  useEffect(() => {
    if (filteredResults.data) {
      setBooks(filteredResults.data.allBooks)
      console.log(books)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredResults.data])

  if (!show) {
    return null
  }

  if (result.loading || filteredResults.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = result.data.me.favoriteGenre

  return (
    <div>
      <h2>Recommendations</h2>
      <button onClick={() => showBook(favoriteGenre)}>show recommendations</button>
      {!books ? null :
        <>
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
        </>
      }
    </div>
  )
}

export default Recommendations