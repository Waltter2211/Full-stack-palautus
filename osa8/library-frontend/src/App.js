import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries/queries'
import EditBook from './components/EditBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED } from './queries/queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 6000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 6000
  })
  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.addBook
      window.alert(`${addedBook.title} added`)
    }
  })

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <Login
          setToken={setToken}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} books={books.data.allBooks} />
      
      <EditBook authors={authors.data.allAuthors} />
    </div>
  )
}

export default App
