import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers
import { setNotification } from './reducers/notification'
import { initialize, createBlog } from './reducers/blog'

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
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const blogs = useSelector(({ blog }) => {
    return blog
  })

  useEffect(() => {
    dispatch(initialize())
  }, [])

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
      dispatch(setNotification('Invalid login', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlog = async (newObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newObject))

    dispatch(
      setNotification(
        `A new blog: ${newObject.title} by ${newObject.author} was created`,
        5,
      ),
    )

    blogs.sort((a, b) => {
      a.likes > b.likes ? false : true
    })
  }

  const blogForm = () => (
    <Togglable
      buttonLabel="Create blog"
      alternateButtonLabel="Cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={handleBlog} />
    </Togglable>
  )

  const logoutButton = () => <button onClick={handleLogout}>Logout</button>

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login" alternateButtonLabel="Cancel">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    )
  }

  const handleLike = async (newObject) => {
    const updatedBlog = await blogService.updateBlog(newObject)
    //setBlogs(blogs.map((b) => (b.id !== updatedBlog ? b : updatedBlog)))
  }

  const handleDelete = async (newObject) => {
    await blogService.deleteBlog(newObject)
    //setBlogs(blogs.filter((b) => b.id !== newObject.id))
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
      {user === null ? loginForm() : blogForm()}
      <BlogList
        user={user}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </div>
  )
}

export default App
