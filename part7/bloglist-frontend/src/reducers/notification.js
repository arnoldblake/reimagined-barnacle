import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return action.payload
    },
  },
})

export const { notification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(notification(message))
    setTimeout(() => dispatch(clearNotification('')), timeout * 1000)
  }
}
