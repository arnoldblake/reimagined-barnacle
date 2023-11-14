import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../../requests"
import { useContext } from "react"
import MessageContext from "../messageContext"

const AnecdoteForm = ({ type }) => {
  const [message, dispatch] = useContext(MessageContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({
        payload: 'Failed POST request',
        type: 'ERROR'
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    dispatch({
      payload: content,
      type: type
    })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
