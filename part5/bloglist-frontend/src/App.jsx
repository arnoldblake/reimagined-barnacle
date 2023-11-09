import { useState, useEffect, useRef } from 'react'
import Blog from './components/blog'
import Notification from './components/notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState('success')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (newObject) => {
    try {
      const user = await loginService.login(newObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setMessage(`Invalid login`)
      setClassName('error')

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlog = async (newObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.createBlog(newObject)
    setBlogs(blogs.concat(newBlog))

    setMessage(`A new blog: ${title} by ${author} was created`)
    setClassName('success')

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel='Create blog' alternateButtonLabel='Cancel' ref={blogFormRef}>
      <BlogForm createBlog={handleBlog}/>
    </Togglable>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>Logout</button>
  )

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login' alternateButtonLabel='Cancel'>
          <LoginForm handleLogin={handleLogin}/>
      </Togglable>
    )
  }

  return (
    <div>
      {user && <div>
        <p>
          {user.name} logged in {user !== null && logoutButton() }
        </p>
        </div>}
      <h2>Blogs</h2>
      <Notification message={message} className={className} />
      {user === null ? loginForm() : blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App