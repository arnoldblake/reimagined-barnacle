import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// Components
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const BlogDetail = () => {
  const login = useSelector(({ login }) => login)
  const id = useParams().id
  const blog = useSelector(({ blog }) => {
    if (blog.length) {
      return blog.find((b) => b.id === id)
    }
  })

  if (!blog) return null



  const showDeleteButton = () => {
    if (login !== null && login.username === blog.user.username) {
      return <DeleteButton blog={blog} />
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>URL: {blog.url}</p>
      <p>
        Likes: {blog.likes} <LikeButton blog={blog} />
      </p>
      <p>User: {blog.user.name}</p>
      {showDeleteButton()}
    </div>
  )
}

export default BlogDetail
