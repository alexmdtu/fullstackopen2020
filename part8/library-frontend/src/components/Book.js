import React from 'react'

const Book = ({ book, genreFilter }) => {
  if (!book.genres.includes(genreFilter) && genreFilter !== '') {
    return null
  }

  return (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
}

export default Book