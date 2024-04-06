import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries/queries'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('user-token', token)
        }
    }, [result.data])

    const handleLogin = (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type='text' onChange={({target}) => setUsername(target.value)} value={username} />
            <input type='password' onChange={({target}) => setPassword(target.value)} value={password} />
            <button type='submit'>login</button>
        </form>
    </div>
  )
}

export default Login