import { useState } from "react"
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE, FIND_BY_GENRE } from "../queries/queries"
import { useQuery } from '@apollo/client'

const BookByGenre = ({ books, booksByGenre, onClose }) => {

  if (!books) {
    return <div>loading data</div>
  }

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
  const result = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { booksByGenre },
    skip: !booksByGenre,
    pollInterval: 6000
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading</div>
  }
  
  const books = [...props.books]

  const foundGenres = books.map(({genres}) => {
    return genres
  })
  const flattedArr = foundGenres.flat()
  const removed = flattedArr.filter((value, index) => flattedArr.indexOf(value) === index)

  if (booksByGenre && result) {
    
    return (
      <BookByGenre books={result.data.allBooks} booksByGenre={booksByGenre} onClose={() => setBooksByGenre(null)} />
    )
  }

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
