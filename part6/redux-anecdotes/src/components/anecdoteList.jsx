import { useSelector, useDispatch } from 'react-redux'
import { voteById, orderByVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteById(id))
  }

  const displayAnecdotes = (anecdotes) => {
    dispatch(orderByVotes(anecdotes))
    return (anecdotes.map(anecdote => 
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

  return (
    <>
      {displayAnecdotes(anecdotes)}
    </>
  )
}

export default AnecdoteList