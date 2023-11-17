import { useSelector } from 'react-redux'

// Components
import Togglable from './Togglable'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'

const Blog = ({ blog }) => {
  const login = useSelector(({ login }) => login)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDeleteButton = () => {
    if (login !== null && login.username === blog.user.username) {
      return <DeleteButton blog={blog} />
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
    </div>
  )
}

export default Blog
