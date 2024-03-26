import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import './App.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    type: '',
    text: ''
  })
  const blogFormRef = useRef()

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
      /* blogFormRef.toggleVisibility() */
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
      /* setMessage({
        type: 'error',
        text: exception.response.data.error
      }) */
      setTimeout(() => {
        setMessage({
          type: '',
          text: ''
        })
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((blogsA, blogsB) => blogsB.likes - blogsA.likes)
      setBlogs( blogs )
    })
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogUpdate = async () => {
    await blogService.update(blog)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  if (user === null) {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm message={message} setMessage={setMessage} setUser={setUser} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message.text !== ''? <p className={message.type}>{message.text}</p>:<p></p>}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='add new' ref={blogFormRef}>
        <BlogForm setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} message={message} blogs={blogs} user={user} setBlogs={setBlogs} setMessage={setMessage} handleBlogPost={handleBlogPost} title={title} author={author} url={url} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleBlogUpdate={handleBlogUpdate} />
      )}
    </div>
  )
}

export default App