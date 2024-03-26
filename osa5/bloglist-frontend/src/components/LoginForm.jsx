import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

function LoginForm({ message, setMessage, setUser }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
  return (
    <div>
      <h2>Log in to application</h2>
      {message.text !== ''? <p className={message.type}>{message.text}</p>:<p></p>}
      <form onSubmit={handleLogin}>
          <label>username <input type='text' name='username' onChange={({ target }) => setUsername(target.value)} /></label>
          <label>password <input type='password' name='password' onChange={({ target }) => setPassword(target.value)} /></label>
        <button>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  message: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoginForm