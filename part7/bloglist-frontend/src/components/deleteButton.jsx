import { useDispatch } from 'react-redux'

// Reducers
import { removeBlog } from '../reducers/blog'

const DeleteButton = ({ blog }) => {
  const dispatch = useDispatch()
  const onClick = () => {
    if (
      window.confirm(
        `Are you sure you would like to delete ${blog.title} with ${blog.likes} likes?`,
      )
    )
      dispatch(removeBlog(blog))
  }

  return <button onClick={onClick}>Delete</button>
}
export default DeleteButton
