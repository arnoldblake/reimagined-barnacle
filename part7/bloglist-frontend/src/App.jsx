import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers
import { setNotification } from './reducers/notification'
import { initialize as initializeBlog } from './reducers/blog'
import { setUser, initialize as initializeUser } from './reducers/user'

// Components
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeBlog())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (newObject) => {
    try {
      const user = await loginService.login(newObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification('Invalid login', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const logoutButton = () => <button onClick={handleLogout}>Logout</button>

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login" alternateButtonLabel="Cancel">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    )
  }

  return (
    <div>
      {user && (
        <div>
          <p>
            {user.name} logged in {user !== null && logoutButton()}
          </p>
        </div>
      )}
      <h2>Blogs</h2>
      <Notification />
      {user === null ? loginForm() : <BlogForm />}
      <BlogList />
    </div>
  )
}

export default App
