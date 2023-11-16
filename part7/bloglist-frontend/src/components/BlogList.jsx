import { useSelector } from 'react-redux'

// Reducers

// Components
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(({ blog }) => {
    return [...blog].sort((a, b) => (a.likes > b.likes ? false : true))
  })

  const user = useSelector(({ user }) => user)

  return blogs.map((blog) => <Blog key={blog.id} blog={blog}></Blog>)
}

export default BlogList
