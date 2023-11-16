import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers
import { initialize as initializeBlog } from './reducers/blog'
import { initialize as initializeUser } from './reducers/user'

// Components
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Status from './components/Status'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeBlog())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      <Status />
      <h2>Blogs</h2>
      <Notification />
      {user === null ? <LoginForm /> : <BlogForm />}
      <BlogList />
    </div>
  )
}

export default App
