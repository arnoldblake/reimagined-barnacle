import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

// Reducers
import { initialize } from './reducers/users'

// Components
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Status from './components/Status'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
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
      </Routes>
    </div>
  )
}

export default App
