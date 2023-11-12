import { useSelector, useDispatch } from 'react-redux'
import { voteById, orderByVotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/anecdoteForm'

const App = () => {
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
    <div>
      <h2>Anecdotes</h2>
      {displayAnecdotes(anecdotes)}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App