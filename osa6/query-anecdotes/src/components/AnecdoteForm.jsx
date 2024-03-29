import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import NotificationContext from '../contexts/NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {

  const notificationContext = useContext(NotificationContext)
  const notificationDispatch = notificationContext[1]

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({type: 'ADD', payload: content})
    setTimeout(() => {
      notificationDispatch({type: 'HIDE', payload: ''})
    }, 5000)
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
