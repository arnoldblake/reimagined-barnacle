import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

// Reducers
import { initialize as initUsers } from './reducers/users'
import { initialize as initBlogs } from './reducers/blog'

// Components
import BlogDetail from './components/BlogDetail'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Status from './components/Status'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <Status />
      <LoginForm />
      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
