import Togglable from 's./togglable'
import DeleteButton from './deleteButton'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      Title: {props.blog.title} Author: {props.blog.author}
      <Togglable buttonLabel='View' alternateButtonLabel='Hide'>
        <p>URL: {props.blog.url}</p>
        <p>Likes: {props.blog.likes} {props.children}</p>
        <p>User: {props.blog.user.name}</p>
        <DeleteButton handleDelete={props.handleDelete} blog={props.blog}/>
      </Togglable>
    </div>
  )
}

export default Blog