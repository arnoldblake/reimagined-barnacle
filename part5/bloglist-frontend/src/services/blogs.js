import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}`}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}

const deleteBlog = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  await axios.delete(`${baseUrl}/${newObject.id}`, config)
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }