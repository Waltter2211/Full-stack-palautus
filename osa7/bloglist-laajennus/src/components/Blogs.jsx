import React from 'react'
import { Link } from 'react-router-dom'

function Blogs({ blogs }) {
  return (
    <div>
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className="blog">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          )
        })}
    </div>
  )
}

export default Blogs