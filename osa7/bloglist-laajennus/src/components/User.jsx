import React from 'react'
import { useParams } from 'react-router-dom'

function User({ users }) {

    const { id } = useParams()
    const foundUser = users.find((user) => user.id === id)

    if (!foundUser) {
        return null
    }

  return (
    <div>
        <h2>{foundUser.name}</h2>
        <h3>added blogs</h3>
        <ul>
            {foundUser.blogs.map((blog) => {
                return <li key={blog.id}>{blog.title}</li>
            })}
        </ul>
    </div>
  )
}

export default User