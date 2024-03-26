import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  /* const [like, setLike] = useState(blog.likes) */
  const [visible, setVisible] = useState(false)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogUpdate = async () => {
    await blogService.update(blog)
  }

  const handleBlogDelete = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog)
    }
  }

  return (
    <div>
      {visible? <div style={style}>
        <p className='blog'>{blog.title}<button onClick={() => setVisible(!visible)}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}<button onClick={() => {
          handleBlogUpdate()
        /* setLike(like + 1) */
        }}>like</button></p>
        <p>{blog.author}</p>
        {user.name === blog.user.name && <button onClick={handleBlogDelete}>remove</button>}
      </div>:<div style={style}>{blog.title}<button onClick={() => setVisible(!visible)}>view</button></div>}
    </div>
  )

}

export default Blog