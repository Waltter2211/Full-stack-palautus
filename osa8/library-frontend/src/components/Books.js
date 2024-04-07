import { useState } from "react"
import { ALL_BOOKS, FIND_BY_GENRE } from "../queries/queries"
import { useQuery } from '@apollo/client'

const BookByGenre = ({ books, booksByGenre, onClose }) => {

  const filteredBooks = books.filter((book) => book.genres.includes(booksByGenre))

  return (
    <div>
      <p>in genre {booksByGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const Books = (props) => {
  const [booksByGenre, setBooksByGenre] = useState(null)
  if (!props.show) {
    return null
  }

  const books = [...props.books]

  if (booksByGenre && books) {
    
    return (
      <BookByGenre books={books} booksByGenre={booksByGenre} onClose={() => setBooksByGenre(null)} />
    )
  }

  const foundGenres = books.map(({genres}) => {
    return genres
  })

  const flattedArr = foundGenres.flat()

  const removed = flattedArr.filter((value, index) => flattedArr.indexOf(value) === index)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {removed.map((g, i) => <button onClick={() => setBooksByGenre(g)} key={i}>{g}</button>)}
    </div>
  )
}

export default Books
