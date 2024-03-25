import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({
    type: '',
    text: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        type: 'message',
        text: `logged in as ${username}`
      })
      setTimeout(() => {
        setMessage({
          type: '',
          text: ''
        })
      }, 5000)
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

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    const newObject = {
      title,
      author,
      url
    }
    try {
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message.text !== ''? <p className={message.type}>{message.text}</p>:<p></p>}
        <form onSubmit={handleLogin}>
          username <input type='text' name='username' onChange={({ target }) => setUsername(target.value)} />
          password <input type='password' name='password' onChange={({ target }) => setPassword(target.value)} />
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message.text !== ''? <p className={message.type}>{message.text}</p>:<p></p>}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        title<input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        author<input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        url<input type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        <button>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App