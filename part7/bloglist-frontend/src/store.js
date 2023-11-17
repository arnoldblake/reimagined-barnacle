import { configureStore } from '@reduxjs/toolkit'

// Reducers
import notification from './reducers/notification'
import blog from './reducers/blog'
import login from './reducers/login'
import users from './reducers/users'

const store = configureStore({
  reducer: {
    notification: notification,
    blog: blog,
    login: login,
    users: users,
  },
})

export default store
