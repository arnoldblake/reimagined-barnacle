import Togglable from './togglable'
import DeleteButton from './deleteButton'

const Blog = ({ children, handleDelete, blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      Title: {blog.title} Author: {blog.author}
      <Togglable buttonLabel='View' alternateButtonLabel='Hide' title={blog.title}>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes} {children}</p>
        <p>User: {blog.user.name}</p>
        <DeleteButton handleDelete={handleDelete} blog={blog}/>
      </Togglable>
    </div>
  )
}

export default Blog