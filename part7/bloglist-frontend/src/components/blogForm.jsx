import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

// Reducers
import { createBlog } from '../reducers/blog'
import { setNotification } from '../reducers/notification'

// Components
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()

    const newObject = { title: title, author: author, url: url }

    dispatch(createBlog(newObject))
    dispatch(
      setNotification(
        `A new blog: ${newObject.title} by ${newObject.author} was created`,
        5,
      ),
    )

    blogFormRef.current.toggleVisibility()

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <Togglable
        buttonLabel="Create blog"
        alternateButtonLabel="Cancel"
        ref={blogFormRef}
      >
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            <label>
              title{' '}
              <input
                id="title"
                type="text"
                value={title}
                name="Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author{' '}
              <input
                id="author"
                type="text"
                value={author}
                name="Author"
                onChange={(event) => setAuthor(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url{' '}
              <input
                id="url"
                type="url"
                value={url}
                name="URL"
                onChange={(event) => setUrl(event.target.value)}
              />
            </label>
          </div>
          <button id="create-button" type="submit">
            Create
          </button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm
