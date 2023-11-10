import { useState, useEffect, useRef } from 'react'
import Blog from './components/blog'
import Notification from './components/notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import LikeButton from './components/likeButton'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState('success')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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
      setMessage('Invalid login')
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
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)

    setMessage(`A new blog: ${newObject.title} by ${newObject.author} was created`)
    setClassName('success')

    blogs.sort((a,b) => {
      a.likes > b.likes ? false : true
    })

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

  const handleLike = async (newObject) => {
    const updatedBlog = await blogService.updateBlog(newObject)
    setBlogs(blogs.map(b => b.id !== updatedBlog ? b : updatedBlog))
  }

  const handleDelete = async (newObject) => {
    await blogService.deleteBlog(newObject)
    setBlogs(blogs.filter(b => b.id !== newObject.id))
  }

  const showBlogs = () => {
    blogs.sort((a,b) => a.likes > b.likes ? false : true )
    return (blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleDelete={handleDelete}>
        <LikeButton handleLike={handleLike} blog={blog}/>
      </Blog>
    ))
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
      {showBlogs()}
    </div>
  )
}

export default App