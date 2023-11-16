import { configureStore } from '@reduxjs/toolkit'

// Reducers
import notification from './reducers/notification'
import blog from './reducers/blog'
import user from './reducers/user'

const store = configureStore({
  reducer: {
    notification: notification,
    blog: blog,
    user: user,
  },
})

export default store
