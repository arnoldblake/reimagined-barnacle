import { useSelector, useDispatch } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    if (filter === 'ALL') {
      return anecdotes
    }
    return anecdotes.filter(a => {
      return a.content.includes(filter)
    })
    

  })

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
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