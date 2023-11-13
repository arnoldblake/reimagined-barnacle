import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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


  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote))
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
            vote(anecdote)
            dispatch(setNotification(anecdote.content, 10))
          }}>vote</button>
        </div>
      </div>
  ))
}

export default AnecdoteList