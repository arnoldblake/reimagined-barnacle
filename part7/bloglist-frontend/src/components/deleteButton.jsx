const DeleteButton = ({ handleDelete, blog }) => {
  const onClick = () => {
    if (
      window.confirm(
        `Are you sure you would like to delete ${blog.title} with ${blog.likes} likes?`,
      )
    )
      handleDelete(blog)
  }

  return <button onClick={onClick}>Delete</button>
}
export default DeleteButton
