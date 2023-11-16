// Components
import Togglable from './Togglable'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'

const Blog = ({ children, user, blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDeleteButton = (user) => {
    if ((user && user.username) === blog.user.username)
      return <DeleteButton blog={blog} />
  }

  return (
    <div style={blogStyle} className="blog">
      Title: {blog.title} Author: {blog.author}
      <Togglable
        buttonLabel="View"
        alternateButtonLabel="Hide"
        title={blog.title}
      >
        <p>URL: {blog.url}</p>
        <p>
          Likes: {blog.likes} <LikeButton blog={blog} />
        </p>
        <p>User: {blog.user.name}</p>
        {showDeleteButton(user)}
      </Togglable>
    </div>
  )
}

export default Blog
