import { useSelector, useDispatch } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if (filter === 'ALL') {
      return sortedAnecdotes
    }
    return sortedAnecdotes.filter(a => {
      return a.content.includes(filter)
    })
  })


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
          <button onClick={() => {
            vote(anecdote.id)
            dispatch(setNotification(anecdote.content))
            setTimeout(() => dispatch(removeNotification('')), 5000)
          }}>vote</button>
        </div>
      </div>
  ))
}

export default AnecdoteList