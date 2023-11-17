import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers
import { handleLogin, initialize } from '../reducers/login'

// Components
import Togglable from './Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initialize())
  }, [])

  const loginFormRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(handleLogin({ username: username, password: password }))
    loginFormRef.current.toggleVisibility()

    setUsername('')
    setPassword('')
  }

  if (user) return null

  return (
    <Togglable
      buttonLabel="Login"
      alternateButtonLabel="Cancel"
      ref={loginFormRef}
    >
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
