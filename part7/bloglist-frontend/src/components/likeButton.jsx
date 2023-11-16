import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blog'

const LikeButton = ({ blog }) => {
  const dispatch = useDispatch()
  return <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
}

export default LikeButton
