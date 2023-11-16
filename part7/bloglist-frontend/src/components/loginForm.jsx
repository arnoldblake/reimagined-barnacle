import { useState } from 'react'
import { useDispatch } from 'react-redux'

// Reducers
import { handleLogin } from '../reducers/user'

// Components
import Togglable from './Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(handleLogin({ username: username, password: password }))

    setUsername('')
    setPassword('')
  }

  return (
    <Togglable buttonLabel="Login" alternateButtonLabel="Cancel">
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </Togglable>
  )
}

export default LoginForm
