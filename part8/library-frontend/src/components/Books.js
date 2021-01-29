import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Book = ({ book, genreFilter }) => {
  if (!book.genres.includes(genreFilter) && genreFilter !== '') {
    return null
  }

  return (
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
}

const Books = ({ show }) => {
  const [genreFilter, setGenreFilter] = useState('')

  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  // get array of unique genres for filter buttons
  var genres = new Set()
  books.map(book => book.genres.map(g => genres.add(g)))
  const genreArray = Array.from(genres)

  return (
    <div>
      <h2>books</h2>

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
          {books.map(b => <Book key={b.title} book={b} genreFilter={genreFilter} />)}
        </tbody>
      </table>
      {genreArray.map(g =>
        <button key={g} onClick={() => setGenreFilter(g)}>{g}</button>
      )}
      <button onClick={() => setGenreFilter('')}>all genres</button>
    </div>
  )
}

export default Books