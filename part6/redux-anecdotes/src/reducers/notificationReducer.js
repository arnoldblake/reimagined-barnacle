import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Initial State'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return action.payload
    }
  }
})

export const { notification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(notification(message))
    setTimeout(() => dispatch(removeNotification('')), timeout * 1000)
  }
}

export default notificationSlice.reducer