import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './contexts/NotificationContext'
import { useContext } from 'react'

const App = () => {

  const notificationContext = useContext(NotificationContext)
  const notificationDispatch = notificationContext[1]

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }), 5)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: true
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not abailable due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              handleVote(anecdote)
              notificationDispatch({type: 'SHOW', payload: anecdote})
              setTimeout(() => {
                notificationDispatch({type: 'HIDE', payload: ''})
              }, 5000)
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
