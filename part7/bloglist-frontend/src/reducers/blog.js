import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const result = []
      action.payload.forEach((blog) => result.push(blog))
      return result
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload.id
      return state.map((b) => (b.id !== id ? b : action.payload))
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, like, deleteBlog } = blogSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(like(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const removedBlog = await blogService.deleteBlog(blog)
    dispatch(deleteBlog(blog))
  }
}

export default blogSlice.reducer
