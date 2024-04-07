import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries/queries'

function Recommendations({ books, show }) {

    const result = useQuery(ME, {
        pollInterval: 6000
    })

    const user = result.data?.me

    if (!show) {
        return null
    }

    if (!user) {
        return <div>loading data</div>
    }

    const favouriteBooks = books.filter(b => b.genres.includes(user.favoriteGenre))

  return (
    <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre {user.favoriteGenre}</p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations