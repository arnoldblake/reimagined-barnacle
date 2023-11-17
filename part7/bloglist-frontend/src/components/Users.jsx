import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Reducers
import { initialize } from '../reducers/users'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)
  useEffect(() => {
    dispatch(initialize())
  }, [])

  return (
    <div>
      <table>
        <tr>
          <th>User</th>
          <th>Blogs</th>
        </tr>
        {users.map((user, i) => (
          <tr key={i}>
            <td>{user.name}</td>
            <td>{user.blogs.reduce((p) => p + 1, 0)}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Users
