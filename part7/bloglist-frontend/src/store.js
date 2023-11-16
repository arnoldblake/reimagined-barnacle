import { configureStore } from '@reduxjs/toolkit'

// Reducers
import notification from './reducers/notification'
import blog from './reducers/blog'

const store = configureStore({
  reducer: {
    notification: notification,
    blog: blog,
  },
})

export default store
