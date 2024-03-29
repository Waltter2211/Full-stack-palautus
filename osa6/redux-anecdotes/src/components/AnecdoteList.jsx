import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, showNotification } from '../reducers/notificationReducer'

function AnecdoteList() {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        }
        else {
            return state.anecdotes.filter((anecdote) => anecdote.content.includes(state.filter))
        }
    })
    const dispatch = useDispatch()

  return (
    <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(showNotification(`you voted: ${anecdote.content}`))
              setTimeout(() => dispatch(removeNotification('')), 5000)
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList