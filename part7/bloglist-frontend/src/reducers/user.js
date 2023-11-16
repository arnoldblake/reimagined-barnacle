import { createSlice } from '@reduxjs/toolkit'

// Reducers
import { setNotification } from './notification'

// Services
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    login(state, action) {},
    logout(state, action) {},
  },
})

export const { setUser } = userSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const handleLogin = (login) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(login)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch {
      dispatch(setNotification('Invalid login', 5))
    }
  }
}

export const handleLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
