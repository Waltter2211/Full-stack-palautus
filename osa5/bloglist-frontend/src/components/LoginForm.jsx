import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
          username <input type='text' name='username' onChange={({ target }) => setUsername(target.value)} />
          password <input type='password' name='password' onChange={({ target }) => setPassword(target.value)} />
          <button>login</button>
        </form>
      </div>
  )
}

export default LoginForm