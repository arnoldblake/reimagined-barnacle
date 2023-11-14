import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from '../requests'

import { useReducer } from "react"
import MessageContext, { messageReducer } from './messageContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const [message, messageDispatch] = useReducer(messageReducer, '')

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({ 
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote)
    messageDispatch({
      payload: anecdote.content,
      type: 'VOTE'
    })
    voteAnecdoteMutation.mutate({ anecdote })
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isLoading) {
    return <div>loading data...</div>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <MessageContext.Provider value={[message, messageDispatch]}>
        
        <Notification />
        <AnecdoteForm type='NEW'/>
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </MessageContext.Provider>  
    </div>
  )
}

export default App
