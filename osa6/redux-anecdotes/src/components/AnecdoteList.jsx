import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
              dispatch(updateAnecdote(anecdote))
              dispatch(setNotification(`you voted: ${anecdote.content}`, 5000))
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList