import { useSelector, useDispatch } from 'react-redux'
import { voteById, addAnecdote, orderByVotes } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteById(id))
  }

  const submitAnecdote = () => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))

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
    <div>
      <h2>Anecdotes</h2>
      {displayAnecdotes(anecdotes)}
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App