import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

function BlogForm({ setMessage, blogs, setBlogs, blogFormRef }) {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogPost = async (event) => {
    
        event.preventDefault()
        const newObject = {
          title,
          author,
          url
        }
        try {
          blogFormRef.toggleVisibility()
          const blog = await blogService.create(newObject)
          setBlogs(blogs.concat(newObject))
          setTitle('')
          setAuthor('')
          setUrl('')
          setMessage({
            type: 'message',
            text: `a new blog ${blog.title} by ${blog.author} added`
          })
          setTimeout(() => {
            setMessage({
              type: '',
              text: ''
            })
          }, 5000)
          console.log(blog)
        } catch (exception) {
          console.log(exception)
          setMessage({
            type: 'error',
            text: exception.response.data.error
          })
          setTimeout(() => {
            setMessage({
              type: '',
              text: ''
            })
          }, 5000)
        }
    }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        title<input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        author<input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        url<input type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm