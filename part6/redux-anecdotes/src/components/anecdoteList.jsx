import { useSelector, useDispatch } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if (filter === 'ALL') {
      return sortedAnecdotes
    }
    return sortedAnecdotes.filter(a => {
      return a.content.includes(filter)
    })
    

  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteById(id))
  }

  return (
    anecdotes.map(anecdote => 
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
  ))
}

export default AnecdoteList