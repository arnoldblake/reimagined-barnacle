import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>        
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>        
      </div>        
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
       </div>
      <button type="submit">login</button>
    </form>
  )

  const handleBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.createBlog({ title: title, author: author, url: url })
    setAuthor('')
    setTitle('')
    setUrl('')
    setBlogs(blogs.concat(newBlog))
  }

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <div>title <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/></div>
      <div>author <input type="author" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/></div>
      <div>url <input type="url" value={url} name="URL" onChange={({ target }) => setUrl(target.value)}/></div>
      <button type="submit">create</button>
    </form>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  return (
    <div>
      {user && <div>
        <p>
          {user.name} logged in {user !== null && logoutButton() }
        </p>
        </div>
      }
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        blogForm()
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App