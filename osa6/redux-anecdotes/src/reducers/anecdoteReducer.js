import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes.js'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = state.find(a => a.id === action.payload)
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return (
        state.map((anecdote) => anecdote.id !== updatedAnecdote.id 
        ? anecdote 
        : updatedAnecdote).sort((stateA, stateB) => stateB.votes - stateA.votes)
      )
    },
    appendAnecdote(state, action) {
      return state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer