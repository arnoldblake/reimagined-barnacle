import { createSlice } from '@reduxjs/toolkit'

// Reducers
import { setNotification } from './notification'

// Services
import blogService from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
  },
})

export const { setLogin } = loginSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }
}

export const handleLogin = (login) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(login)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLogin(user))
    } catch {
      dispatch(setNotification('Invalid login', 5))
    }
  }
}

export const handleLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLogin(null))
  }
}

export default loginSlice.reducer
