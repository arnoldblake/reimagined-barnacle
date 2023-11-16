import Blog from './Blog'
import LikeButton from './LikeButton'

const BlogList = ({ blogs, user, handleDelete, handleLike }) => {
  blogs.sort((a, b) => (a.likes > b.likes ? false : true))
  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete}>
      <LikeButton handleLike={handleLike} blog={blog} />
    </Blog>
  ))
}

export default BlogList
