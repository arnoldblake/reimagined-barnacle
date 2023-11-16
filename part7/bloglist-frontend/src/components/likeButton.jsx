const LikeButton = ({ handleLike, blog }) => {
  const onClick = () => {
    blog.likes += 1
    handleLike(blog)
  }

  return <button onClick={onClick}>Like</button>
}
export default LikeButton
