import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

// Reducers
import { initialize as initUsers } from './reducers/users'
import { initialize as initBlogs } from './reducers/blog'

// Components
import BlogDetail from './components/BlogDetail'
import Notification from './components/Notification'
import Status from './components/Status'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Home from './components/Home'

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
      <Notification />
      <Status />
      <LoginForm />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
