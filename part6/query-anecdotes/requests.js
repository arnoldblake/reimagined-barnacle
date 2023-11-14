import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteAnecdote = async (object) => {
  const id = object.anecdote.id
  const newAnecdote = { ...object.anecdote, votes: object.anecdote.votes + 1  }
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}