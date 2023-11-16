// Reducers
import { useSelector } from 'react-redux'

// Components
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blog }) => {
    return [...blog].sort((a, b) => (a.likes > b.likes ? false : true))
  })

  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} user={user}></Blog>
  ))
}

export default BlogList
