import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
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
    </div>
  )
}

export default BlogForm
