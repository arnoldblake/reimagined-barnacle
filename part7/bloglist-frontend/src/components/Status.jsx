import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/user'

const Status = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  if (!user) return null

  return (
    <div>
      <p>
        {user.name} logged in{' '}
        {user !== null && (
          <button onClick={() => dispatch(handleLogout())}>Logout</button>
        )}
      </p>
    </div>
  )
}

export default Status
