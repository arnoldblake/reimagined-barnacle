import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/login'

const Status = () => {
  const dispatch = useDispatch()
  const login = useSelector(({ login }) => login)

  if (!login) return null

  return (
    <div>
      <p>
        {login.name} logged in{' '}
        {login !== null && (
          <button onClick={() => dispatch(handleLogout())}>Logout</button>
        )}
      </p>
    </div>
  )
}

export default Status
