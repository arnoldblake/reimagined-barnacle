import { configureStore } from '@reduxjs/toolkit'

// Reducers
import { notification } from './reducers/notification'

const store = configureStore({
  reducer: {
    notification: notification,
  },
})

export default store
