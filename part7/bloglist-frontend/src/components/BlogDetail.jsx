import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
  const id = useParams().id
  const blog = useSelector(({ blog }) => {
    if (blog.length) {
      return blog.find((b) => b.id === id)
    }
  })

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes}</div>
      <div>{blog.author}</div>
    </div>
  )
}

export default BlogDetail
