// Services
import blogService from '../services/blogs'

const handleLike = async (newObject) => {
  const updatedBlog = await blogService.updateBlog(newObject)
}

const LikeButton = ({ blog }) => {
  const onClick = () => {
    blog.likes += 1
    handleLike(blog)
  }

  return <button onClick={onClick}>Like</button>
}
export default LikeButton
