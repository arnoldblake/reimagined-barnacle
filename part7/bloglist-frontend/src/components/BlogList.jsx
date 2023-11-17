import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Reducers
import { initialize } from '../reducers/blog'

// Components
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blog }) => {
    return [...blog].sort((a, b) => (a.likes > b.likes ? false : true))
  })

  useEffect(() => {
    dispatch(initialize())
  }, [])

  return blogs.map((blog) => <Blog key={blog.id} blog={blog}></Blog>)
}

export default BlogList
