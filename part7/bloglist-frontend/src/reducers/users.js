import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      const result = []
      action.payload.forEach((user) => result.push(user))
      return result
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
