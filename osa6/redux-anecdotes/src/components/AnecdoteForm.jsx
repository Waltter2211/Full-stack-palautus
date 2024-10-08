import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, showNotification } from '../reducers/notificationReducer'

function AnecdoteForm() {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`added anecdote: ${content}`))
    setTimeout(() => dispatch(removeNotification('')), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdoteText' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm