import { Routes, Route } from 'react-router-dom'

// Components
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Status from './components/Status'
import Users from './components/Users'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Status />
      <LoginForm />
      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
